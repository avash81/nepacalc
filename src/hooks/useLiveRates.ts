'use client';

import { useState, useEffect } from 'react';

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
    /** ISO date string of the actual FENEGOSIDA bulletin (e.g. "2026-07-29") */
    dataDate: string;
    /** true = fetched live from FENEGOSIDA today, false = using last known value */
    isFresh: boolean;
  };
  silver: {
    tolaNPR: RateStats;
    tolaInternationalNPR: number;
  };
}

// ─── Default / Fallback values ───────────────────────────────────────────────
// These are updated by scripts/fetch-rates.js before every build.
// They are also updated here manually whenever FENEGOSIDA publishes a new rate.
const FALLBACK_GOLD_TOLA   = 283200;  // FENEGOSIDA 2026-07-29
const FALLBACK_TEJABI_TOLA = 282500;  // FENEGOSIDA 2026-07-29
const FALLBACK_SILVER_TOLA = 4320;    // FENEGOSIDA 2026-07-29
const FALLBACK_DATE        = '2026-07-29';
const FALLBACK_USD         = 133.5;

const LS_KEY = 'nepacalc_verified_rates_v2';

// ─── LocalStorage helpers ────────────────────────────────────────────────────
interface StoredRates {
  gold: number;
  tejabi: number;
  silver: number;
  date: string;
  updatedAt: string;
}

function readStored(): StoredRates | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRates;
    // Only trust stored value if it's from today or yesterday (not older)
    const stored = new Date(parsed.updatedAt);
    const ageHours = (Date.now() - stored.getTime()) / 3600000;
    if (ageHours > 36) return null; // discard stale localStorage data
    return parsed;
  } catch { return null; }
}

function writeStored(gold: number, tejabi: number, silver: number, date: string) {
  try {
    const payload: StoredRates = { gold, tejabi, silver, date, updatedAt: new Date().toISOString() };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  } catch { /* ignore */ }
}

// ─── Parsing ─────────────────────────────────────────────────────────────────
function parseGoldSilver(html: string): { fine: number; tejabi: number; silver: number | null } | null {
  const goldMatches = html.match(/\['\d{8}',([2-3]\d{5}),(\d+)\]/g);
  if (!goldMatches || goldMatches.length === 0) return null;

  const lastGold = goldMatches[goldMatches.length - 1];
  const parts = lastGold.replace(/['\[\]]/g, '').split(',');
  const fine = parseInt(parts[1], 10);
  const tejabi = parseInt(parts[2], 10) || 0;
  if (fine < 200000 || fine > 500000) return null;

  let silver: number | null = null;
  const silverMatches = html.match(/'\d{8}',([3-7]\d{3}),\d+/g);
  if (silverMatches && silverMatches.length > 0) {
    const lastS = silverMatches[silverMatches.length - 1];
    const sParsed = parseInt(lastS.split(',')[1], 10);
    if (sParsed > 3000 && sParsed < 8000) silver = sParsed;
  }
  return { fine, tejabi, silver };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLiveRates() {
  const [rates, setRates] = useState<LiveRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buildRates = (
    goldBase: number,
    tejabiBase: number,
    silverBase: number,
    nprUsd: number,
    forexRates: Record<string, number>,
    provider: string,
    updatedAt: string,
    dataDate: string,
    isFresh: boolean
  ): LiveRates => {
    const flat = (v: number): RateStats => ({
      current: v, high24h: v, low24h: v, change24h: 0, changePercent24h: 0
    });
    return {
      forex: {
        usd: flat(nprUsd),
        inr: flat(nprUsd / 1.6),
        gbp: flat(nprUsd * 1.25),
        eur: flat(nprUsd * 1.08),
        aud: flat(nprUsd * 0.65),
        cad: flat(nprUsd * 0.73),
        jpy: flat(nprUsd / 150),
        all: forexRates,
        provider: 'ExchangeRate-API',
        date: updatedAt,
      },
      gold: {
        tolaNPR: flat(goldBase),
        tejabiTolaNPR: tejabiBase,
        tolaInternationalNPR: Math.round(2350 * 0.375 * nprUsd),
        spotUSD: 2350,
        provider,
        lastUpdated: updatedAt,
        dataDate,
        isFresh,
      },
      silver: {
        tolaNPR: flat(silverBase),
        tolaInternationalNPR: Math.round(28.5 * 0.375 * nprUsd),
      },
    };
  };

  const fetchRates = async () => {
    try {
      setLoading(true);

      // ── Step 1: Read build-time JSON (always available, contains latest build data) ──
      let buildGold = FALLBACK_GOLD_TOLA;
      let buildTejabi = FALLBACK_TEJABI_TOLA;
      let buildSilver = FALLBACK_SILVER_TOLA;
      let buildDate = FALLBACK_DATE;
      let buildVerified = false;

      try {
        const jsonRes = await fetch('/data/market-rates.json', { cache: 'no-store' });
        if (jsonRes.ok) {
          const json = await jsonRes.json();
          if (json.gold?.tolaNPR > 200000) {
            buildGold = json.gold.tolaNPR;
            buildTejabi = json.gold.tejabiTolaNPR ?? 0;
            buildSilver = json.silver?.tolaNPR ?? FALLBACK_SILVER_TOLA;
            buildDate = json.date ?? FALLBACK_DATE;
            buildVerified = json.verified ?? false;
          }
        }
      } catch { /* use hardcoded fallback */ }

      // ── Step 2: Check localStorage for a more recent verified value ──
      const stored = readStored();
      if (stored && stored.date >= buildDate && stored.gold > 200000) {
        buildGold = stored.gold;
        buildTejabi = stored.tejabi;
        buildSilver = stored.silver;
        buildDate = stored.date;
        buildVerified = true;
      }

      // ── Step 3: Set initial state immediately (no blank loading state for users) ──
      let nprUsd = FALLBACK_USD;
      let forexRates: Record<string, number> = {};

      // Forex (non-critical, run concurrently with FENEGOSIDA scrape)
      const forexPromise = fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(r => r.json())
        .then(j => { nprUsd = j.rates?.NPR || FALLBACK_USD; forexRates = j.rates || {}; })
        .catch(() => {});

      setRates(buildRates(buildGold, buildTejabi, buildSilver, nprUsd, forexRates, 'FENEGOSIDA', buildDate, buildDate, buildVerified));
      setLoading(false);

      // ── Step 4: Try live FENEGOSIDA scrape ──────────────────────────────────
      // PRIMARY: PHP proxy on cPanel (server-side, no CORS, always fresh)
      // FALLBACK: CORS proxies (browser-side, may be blocked)

      let liveData: { fine: number; tejabi: number; silver: number | null } | null = null;
      let liveProvider = '';

      // ── Primary: PHP proxy (same-domain, server-side fetch) ──
      try {
        const phpRes = await fetch('/api/rates.php', {
          cache: 'no-store',
          signal: AbortSignal.timeout(12000),
        });
        if (phpRes.ok) {
          const json = await phpRes.json();
          if (json.gold?.tolaNPR > 200000) {
            liveData = {
              fine:   json.gold.tolaNPR,
              tejabi: json.gold.tejabiTolaNPR ?? 0,
              silver: json.silver?.tolaNPR ?? null,
            };
            liveProvider = json.stale
              ? `FENEGOSIDA (cached ${json.date})`
              : `FENEGOSIDA via PHP · ${json.time ?? ''}`;
          }
        }
      } catch { /* PHP proxy failed — try CORS proxies below */ }

      // ── Fallback: CORS proxy chain (browser-side) ──
      if (!liveData) {
        const fenegosidaUrl = 'https://www.fenegosida.org/';
        const proxies = [
          `https://corsproxy.io/?url=${encodeURIComponent(fenegosidaUrl)}`,
          `https://api.allorigins.win/raw?url=${encodeURIComponent(fenegosidaUrl)}`,
          `https://thingproxy.freeboard.io/fetch/${fenegosidaUrl}`,
        ];

        for (const proxy of proxies) {
          try {
            const res = await fetch(proxy, { signal: AbortSignal.timeout(10000) });
            if (res.ok) {
              const html = await res.text();
              const parsed = parseGoldSilver(html);
              if (parsed) {
                liveData = parsed;
                liveProvider = proxy.includes('corsproxy') ? 'FENEGOSIDA via corsproxy.io'
                  : proxy.includes('allorigins') ? 'FENEGOSIDA via allorigins'
                  : 'FENEGOSIDA via thingproxy';
                break;
              }
            }
          } catch { /* try next proxy */ }
        }
      }

      // ── Step 5: Wait for forex, then apply live data if valid ──
      await forexPromise;

      if (liveData) {
        // Sanity check: reject if too far from known value
        const goldDiff = Math.abs(liveData.fine - buildGold);
        if (goldDiff < 15000) {
          const todayNPT = new Date(Date.now() + (5 * 60 + 45) * 60000).toISOString().split('T')[0];
          const finalSilver = (liveData.silver && Math.abs(liveData.silver - buildSilver) < 2000)
            ? liveData.silver
            : buildSilver;

          // Persist to localStorage for next visit
          writeStored(liveData.fine, liveData.tejabi, finalSilver, todayNPT);

          setRates(buildRates(
            liveData.fine, liveData.tejabi, finalSilver,
            nprUsd, forexRates, liveProvider,
            new Date().toISOString(), todayNPT, true
          ));
        }
        // If goldDiff >= 15000 — suspicious value, keep build-time data
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Ensure rates are set even on error
      if (!rates) {
        const mockFlat = (v: number): RateStats => ({ current: v, high24h: v, low24h: v, change24h: 0, changePercent24h: 0 });
        setRates({
          forex: {
            usd: mockFlat(FALLBACK_USD), inr: mockFlat(FALLBACK_USD / 1.6),
            gbp: mockFlat(180), eur: mockFlat(150),
            aud: mockFlat(95), cad: mockFlat(105), jpy: mockFlat(1),
            all: {}, provider: 'Offline Fallback', date: new Date().toISOString()
          },
          gold: {
            tolaNPR: mockFlat(FALLBACK_GOLD_TOLA), tejabiTolaNPR: FALLBACK_TEJABI_TOLA,
            tolaInternationalNPR: 125000, spotUSD: 2350,
            provider: 'FENEGOSIDA Fallback',
            lastUpdated: FALLBACK_DATE,
            dataDate: FALLBACK_DATE,
            isFresh: false,
          },
          silver: { tolaNPR: mockFlat(FALLBACK_SILVER_TOLA), tolaInternationalNPR: 1500 }
        });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchRates();

    // Poll every 30s — combined with 30s PHP cache = within ~1 min of FENEGOSIDA update
    const interval = setInterval(fetchRates, 30000);

    // Refresh immediately when user returns to this tab
    const handleVisibility = () => { if (document.visibilityState === 'visible') fetchRates(); };
    document.addEventListener('visibilitychange', handleVisibility);

    // Refresh when browser reconnects
    const handleOnline = () => fetchRates();
    window.addEventListener('online', handleOnline);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('online', handleOnline);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rates, loading, error, refresh: fetchRates };
}
