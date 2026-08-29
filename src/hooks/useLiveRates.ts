'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface RateStats {
  current: number;
  high24h: number;
  low24h: number;
  change24h: number;
  changePercent24h: number;
}

export interface LiveRates {
  forex: {
    usd: RateStats;
    inr: RateStats;
    gbp: RateStats;
    eur: RateStats;
    aud: RateStats;
    cad: RateStats;
    jpy: RateStats;
    all: Record<string, number>;
    provider: string;
    date: string;
  };
  gold: {
    tolaNPR: RateStats;
    tejabiTolaNPR: number;
    tolaInternationalNPR: number;
    spotUSD: number;
    provider: string;
    lastUpdated: string;
    /** ISO date string of the actual FENEGOSIDA bulletin (e.g. "2026-08-16") */
    dataDate: string;
    /** ISO date string from FENEGOSIDA API's published_at field */
    rateDate: string;
    /** Source name, e.g. "FENEGOSIDA" */
    sourceName: string;
    /** 'verified' | 'retained_fallback' */
    rateStatus: 'verified' | 'retained_fallback' | string;
    /** true = data is from today's FENEGOSIDA bulletin */
    isFresh: boolean;
  };
  silver: {
    tolaNPR: RateStats;
    tolaInternationalNPR: number;
  };
}

// ─── Fallback values (LAST KNOWN VERIFIED FENEGOSIDA) ────────────────────────
// Primary live data: /data/live-rates.json  written by market-engine.php cron
// API endpoint:      /api/rates.php         reads live-rates.json
// These are ONLY used when the server is totally unreachable.
// IMPORTANT: Update these every time a new build is cut so the static fallback
// stays within ~1% of the current market price.
// Last updated: 2026-08-28 (automated build)
const FALLBACK_GOLD_TOLA   = 318500;  // FENEGOSIDA 2026-08-28
const FALLBACK_TEJABI_TOLA = 317800;  // FENEGOSIDA 2026-08-28
const FALLBACK_SILVER_TOLA = 4965;    // FENEGOSIDA 2026-08-28
const FALLBACK_DATE        = '2026-08-28';
const FALLBACK_USD         = 133.5;

// ─── Polling intervals ───────────────────────────────────────────────────────
const VERSION_POLL_MS  = 10_000;   // Check rates-version.txt every 10 seconds
const FULL_FETCH_MS    = 300_000;  // Full re-fetch every 5 min (safety net)
const FOREX_REFRESH_MS = 3_600_000; // Forex: once per hour

const LS_KEY         = 'nepacalc_verified_rates_v4';  // v4: 2026-08-24 cache bust
const LS_VERSION_KEY = 'nepacalc_rate_version_v4';


// ─── localStorage helpers ────────────────────────────────────────────────────
interface StoredRates {
  gold: number;
  tejabi: number;
  silver: number;
  date: string;
  version: string;
  updatedAt: string;
}

function readStored(): StoredRates | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRates;
    // 12h TTL — FENEGOSIDA publishes once/twice per day; never serve data older than 12h
    const ageHours = (Date.now() - new Date(parsed.updatedAt).getTime()) / 3_600_000;
    if (ageHours > 12) return null;
    return parsed;
  } catch { return null; }
}

function writeStored(gold: number, tejabi: number, silver: number, date: string, version: string) {
  try {
    const payload: StoredRates = { gold, tejabi, silver, date, version, updatedAt: new Date().toISOString() };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
    localStorage.setItem(LS_VERSION_KEY, version);
  } catch { /* ignore */ }
}

function readStoredVersion(): string {
  try { return localStorage.getItem(LS_VERSION_KEY) ?? ''; }
  catch { return ''; }
}

// ─── Rate builder ─────────────────────────────────────────────────────────────
function buildRates(
  gold: number,
  tejabi: number,
  silver: number,
  nprUsd: number,
  forexAll: Record<string, number>,
  provider: string,
  updatedAt: string,
  dataDate: string,
  isFresh: boolean,
  rateStatus: string = 'verified',
  rateDate: string = dataDate,
  sourceName: string = 'FENEGOSIDA'
): LiveRates {
  const flat = (v: number): RateStats => ({
    current: v, high24h: v, low24h: v, change24h: 0, changePercent24h: 0
  });
  return {
    forex: {
      usd: flat(nprUsd),
      inr: flat(forexAll['NPR'] && forexAll['INR'] ? (forexAll['NPR'] / forexAll['INR']) : nprUsd / 1.6),
      gbp: flat(forexAll['NPR'] && forexAll['GBP'] ? (forexAll['NPR'] / forexAll['GBP']) : nprUsd * 1.25),
      eur: flat(nprUsd * 1.08),
      aud: flat(nprUsd * 0.65),
      cad: flat(nprUsd * 0.73),
      jpy: flat(nprUsd / 150),
      all: forexAll,
      provider: 'ExchangeRate-API',
      date: updatedAt,
    },
    gold: {
      tolaNPR: flat(gold),
      tejabiTolaNPR: tejabi,
      tolaInternationalNPR: Math.round(2350 * 0.375 * nprUsd),
      spotUSD: 2350,
      provider,
      lastUpdated: updatedAt,
      dataDate,
      rateDate,
      rateStatus,
      sourceName,
      isFresh,
    },
    silver: {
      tolaNPR: flat(silver),
      tolaInternationalNPR: Math.round(28.5 * 0.375 * nprUsd),
    },
  };
}

// ─── BroadcastChannel (syncs all open tabs instantly) ────────────────────────
const BROADCAST_CHANNEL = 'nepacalc_rates';

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLiveRates() {
  const [rates, setRates]   = useState<LiveRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  // Track last known version hash to avoid unnecessary re-renders
  const lastVersionRef  = useRef<string>(readStoredVersion());
  const nprUsdRef       = useRef<number>(FALLBACK_USD);
  const forexAllRef     = useRef<Record<string, number>>({});
  const lastForexFetch  = useRef<number>(0);

  // ── Broadcast channel: share updates instantly across all tabs ──────────────
  const broadcastRef = useRef<BroadcastChannel | null>(null);
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    broadcastRef.current = new BroadcastChannel(BROADCAST_CHANNEL);
    broadcastRef.current.onmessage = (e) => {
      const msg = e.data;
      if (msg?.type === 'RATES_UPDATED' && msg.gold > 200000) {
        // Another tab got new rates first — apply them immediately
        const updated = buildRates(
          msg.gold, msg.tejabi, msg.silver,
          nprUsdRef.current, forexAllRef.current,
          msg.provider ?? 'FENEGOSIDA',
          msg.updatedAt ?? new Date().toISOString(),
          msg.date ?? new Date().toISOString().split('T')[0],
          true
        );
        setRates(updated);
        lastVersionRef.current = msg.version ?? lastVersionRef.current;
      }
    };
    return () => { broadcastRef.current?.close(); };
  }, []);

  // ── Broadcast helper ────────────────────────────────────────────────────────
  const broadcastUpdate = useCallback((gold: number, tejabi: number, silver: number, date: string, version: string, provider: string) => {
    broadcastRef.current?.postMessage({
      type: 'RATES_UPDATED',
      gold, tejabi, silver, date, version, provider,
      updatedAt: new Date().toISOString(),
    });
  }, []);

  // ── Refresh forex (once per hour) ──────────────────────────────────────────
  const refreshForex = useCallback(async () => {
    const now = Date.now();
    if (now - lastForexFetch.current < FOREX_REFRESH_MS) return;
    try {
      const r = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
        signal: AbortSignal.timeout(8000),
      });
      if (r.ok) {
        const j = await r.json();
        nprUsdRef.current  = j.rates?.NPR || FALLBACK_USD;
        forexAllRef.current = j.rates || {};
        lastForexFetch.current = now;
      }
    } catch { /* non-critical */ }
  }, []);

  // ── Full rates fetch from live-rates.json ──────────────────────────────────
  const fetchFullRates = useCallback(async (trigger: 'init' | 'version_change' | 'scheduled') => {
    try {
      const res = await fetch('/data/live-rates.json', {
        cache: 'no-store',
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) return;
      const json = await res.json();

      const gold   = json.gold?.tolaNPR?.current ?? json.gold?.tolaNPR;
      const tejabi = json.gold?.tejabiTolaNPR ?? (gold - 700);
      const silver = json.silver?.tolaNPR?.current ?? json.silver?.tolaNPR ?? FALLBACK_SILVER_TOLA;
      const date   = json.rate_date ?? json.published_at ?? json.date ?? FALLBACK_DATE;
      const ver    = json._version ?? String(gold);
      const rateStatus  = json.status ?? 'verified';
      const sourceName  = json.source_name ?? json.source ?? 'FENEGOSIDA';
      const rateDate    = json.rate_date ?? date;

      if (!gold || gold < 200000) return;

      // Skip if same version (no change)
      if (trigger !== 'init' && ver === lastVersionRef.current) return;

      lastVersionRef.current = ver;
      await refreshForex();

      // Format provider string: show fallback warning clearly
      const isFallback = rateStatus === 'retained_fallback';
      const provider = isFallback
        ? `${json.source ?? 'FENEGOSIDA'} · Last verified: ${rateDate}`
        : `${json.source ?? 'FENEGOSIDA'} · ${rateDate}`;

      // isFresh: rate_date matches today in NPT
      const todayNPT = new Date(Date.now() + (5 * 60 + 45) * 60000).toISOString().split('T')[0];
      const isFresh = rateDate === todayNPT && !isFallback;

      const updated = buildRates(
        gold, tejabi, silver,
        nprUsdRef.current, forexAllRef.current,
        provider, json.fetched_at ?? new Date().toISOString(),
        date, isFresh,
        rateStatus, rateDate, sourceName
      );

      setRates(updated);
      setLoading(false);
      setError(null);

      // Persist to localStorage
      writeStored(gold, tejabi, silver, date, ver);

      // Broadcast to other tabs
      broadcastUpdate(gold, tejabi, silver, date, ver, provider);

    } catch (e) {
      if (trigger === 'init') {
        setError(e instanceof Error ? e.message : 'Fetch failed');
      }
    }
  }, [refreshForex, broadcastUpdate]);

  // ── Version check: fetch the tiny 50-byte rates-version.txt ─────────────────
  // When hash changes → fetch full live-rates.json
  const checkVersion = useCallback(async () => {
    try {
      const res = await fetch('/data/rates-version.txt', {
        cache: 'no-store',
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return;
      const text = (await res.text()).trim();
      const hash = text.split(' ')[0]; // format: "HASH GOLD SILVER"

      if (hash && hash !== lastVersionRef.current) {
        // Price changed — fetch full data immediately
        lastVersionRef.current = hash;
        await fetchFullRates('version_change');
      }
    } catch { /* rates-version.txt unreachable — silent fail */ }
  }, [fetchFullRates]);

  // ── Initialization ──────────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // 1. Show instantly from localStorage (zero latency for returning users)
      const stored = readStored();
      if (stored && stored.gold > 200000) {
        setRates(buildRates(
          stored.gold, stored.tejabi, stored.silver,
          FALLBACK_USD, {}, 'FENEGOSIDA (cached)',
          stored.updatedAt, stored.date, false
        ));
        setLoading(false);
      }

      // 2. Fetch live-rates.json immediately (gets today's price from cron output)
      await fetchFullRates('init');
      if (mounted) setLoading(false);
    };

    init();

    // 3. Poll rates-version.txt every 10s (50-byte file — near zero server load)
    //    When version hash changes → automatically fetches full live-rates.json
    const versionPoll = setInterval(() => {
      if (mounted) checkVersion();
    }, VERSION_POLL_MS);

    // 4. Full re-fetch every 5 minutes as a safety net (catches any missed version bumps)
    const fullPoll = setInterval(() => {
      if (mounted) fetchFullRates('scheduled');
    }, FULL_FETCH_MS);

    // 5. Instant refresh when user returns to tab (after being away)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && mounted) {
        checkVersion();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 6. Instant refresh when network reconnects
    const handleOnline = () => { if (mounted) fetchFullRates('scheduled'); };
    window.addEventListener('online', handleOnline);

    return () => {
      mounted = false;
      clearInterval(versionPoll);
      clearInterval(fullPoll);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('online', handleOnline);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    rates,
    loading,
    error,
    refresh: () => fetchFullRates('scheduled'),
  };
}
