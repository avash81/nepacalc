'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MetalSpot {
  spotUSD: number;
  change24h: number;
  changePercent24h: number;
  prevClose: number;
  high24h: number;
  low24h: number;
  updatedAt: string;
}

export interface InternationalRates {
  gold: MetalSpot;
  silver: MetalSpot;
  /** USD per troy oz ratios / prices for other metals (derived or static) */
  platinum: MetalSpot;
  palladium: MetalSpot;
  copper: MetalSpot;    // USD per lb
  btcusd: MetalSpot;   // BTC/USD price
  history30d: {
    gold: { date: string; price: number }[];
    silver: { date: string; price: number }[];
  };
  /** AED fixed peg: 3.6725 always */
  aedPerUSD: number;
  /** Live forex rates (units of local currency per 1 USD) */
  forex: {
    INR: number;
    PKR: number;
    BDT: number;
    PHP: number;
    EUR: number;
    GBP: number;
    CAD: number;
    AUD: number;
    JPY: number;
    SGD: number;
    [key: string]: number;
  };
  /** Derived gold-to-silver ratio */
  goldSilverRatio: number;
  source: string;
  updatedAt: string;
  isLive: boolean;
}

// ─── Fallback static values (updated at build time) ──────────────────────────
// These are used when the server JSON is unreachable. Keep close to market prices.
const FALLBACK: InternationalRates = {
  gold: {
    spotUSD: 4075.3,
    change24h: 34.8,
    changePercent24h: 0.86,
    prevClose: 4040.5,
    high24h: 4091.8,
    low24h: 4057.1,
    updatedAt: new Date().toISOString(),
  },
  silver: {
    spotUSD: 52.51,
    change24h: 0.68,
    changePercent24h: 1.31,
    prevClose: 51.83,
    high24h: 53.06,
    low24h: 51.76,
    updatedAt: new Date().toISOString(),
  },
  platinum: {
    spotUSD: 1559.90,
    change24h: -25.05,
    changePercent24h: -1.58,
    prevClose: 1584.95,
    high24h: 1592.00,
    low24h: 1548.50,
    updatedAt: new Date().toISOString(),
  },
  palladium: {
    spotUSD: 1054.35,
    change24h: -5.74,
    changePercent24h: -0.54,
    prevClose: 1060.09,
    high24h: 1072.00,
    low24h: 1045.10,
    updatedAt: new Date().toISOString(),
  },
  copper: {
    spotUSD: 4.85,
    change24h: 0.06,
    changePercent24h: 1.25,
    prevClose: 4.79,
    high24h: 4.92,
    low24h: 4.78,
    updatedAt: new Date().toISOString(),
  },
  btcusd: {
    spotUSD: 91450.0,
    change24h: 1280.0,
    changePercent24h: 1.42,
    prevClose: 90170.0,
    high24h: 92100.0,
    low24h: 89800.0,
    updatedAt: new Date().toISOString(),
  },
  history30d: {
    gold: [
      { date: '10-07', price: 3985.2 },
      { date: '10-11', price: 4035.1 },
      { date: '10-15', price: 4050.2 },
      { date: '10-19', price: 4040.6 },
      { date: '10-23', price: 4045.8 },
      { date: '10-27', price: 4015.2 },
      { date: '10-31', price: 4092.6 },
      { date: '11-04', price: 4105.1 },
      { date: '11-10', price: 4075.3 },
    ],
    silver: [
      { date: '10-07', price: 49.5 },
      { date: '10-11', price: 48.8 },
      { date: '10-15', price: 47.9 },
      { date: '10-19', price: 46.8 },
      { date: '10-23', price: 46.5 },
      { date: '10-27', price: 45.9 },
      { date: '10-31', price: 47.1 },
      { date: '11-04', price: 50.6 },
      { date: '11-10', price: 52.51 },
    ],
  },
  aedPerUSD: 3.6725,
  forex: {
    INR: 86.8,
    PKR: 278.0,
    BDT: 120.0,
    PHP: 58.2,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.38,
    AUD: 1.55,
    JPY: 152.0,
    SGD: 1.32,
  },
  goldSilverRatio: 77.61,
  source: 'COMEX / LBMA Spot Benchmark',
  updatedAt: new Date().toISOString(),
  isLive: false,
};

// ─── Polling intervals ────────────────────────────────────────────────────────
const POLL_MS = 300_000;      // Full re-fetch every 5 min
const VERSION_POLL_MS = 30_000; // Check version.txt every 30 seconds
const FOREX_REFRESH_MS = 3_600_000; // Forex once per hour
const LS_KEY = 'nepacalc_intl_rates_v2';

// ─── LocalStorage helpers ─────────────────────────────────────────────────────
function readCached(): InternationalRates | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data: InternationalRates; cachedAt: string };
    const ageMin = (Date.now() - new Date(parsed.cachedAt).getTime()) / 60_000;
    if (ageMin > 360) return null; // 6h TTL
    return parsed.data;
  } catch { return null; }
}

function writeCache(data: InternationalRates) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ data, cachedAt: new Date().toISOString() }));
  } catch { /* ignore */ }
}

// ─── Build InternationalRates from raw JSON + forex ──────────────────────────
function buildFromJson(json: any, forexRates: Record<string, number>, history?: any): InternationalRates {
  const gold = json.gold?.spotUSD ?? FALLBACK.gold.spotUSD;
  const silver = json.silver?.spotUSD ?? FALLBACK.silver.spotUSD;
  const ratio = silver > 0 ? +(gold / silver).toFixed(2) : FALLBACK.goldSilverRatio;

  // AED is always fixed peg
  const aedPerUSD = 3.6725;

  // Forex: merge live forex with fallbacks (live from forex-rates.json or exchangerate-api)
  const fx = {
    INR: forexRates['INR'] ?? FALLBACK.forex.INR,
    PKR: forexRates['PKR'] ?? FALLBACK.forex.PKR,
    BDT: forexRates['BDT'] ?? FALLBACK.forex.BDT,
    PHP: forexRates['PHP'] ?? FALLBACK.forex.PHP,
    EUR: forexRates['EUR'] ?? FALLBACK.forex.EUR,
    GBP: forexRates['GBP'] ?? FALLBACK.forex.GBP,
    CAD: forexRates['CAD'] ?? FALLBACK.forex.CAD,
    AUD: forexRates['AUD'] ?? FALLBACK.forex.AUD,
    JPY: forexRates['JPY'] ?? FALLBACK.forex.JPY,
    SGD: forexRates['SGD'] ?? FALLBACK.forex.SGD,
  };

  const hist30d = history ?? {
    gold: json.history30d?.gold ?? FALLBACK.history30d.gold,
    silver: json.history30d?.silver ?? FALLBACK.history30d.silver,
  };

  return {
    gold: {
      spotUSD: gold,
      change24h: json.gold?.change24h ?? FALLBACK.gold.change24h,
      changePercent24h: json.gold?.changePercent24h ?? FALLBACK.gold.changePercent24h,
      prevClose: json.gold?.prevClose ?? gold - (json.gold?.change24h ?? 0),
      high24h: json.gold?.high24h ?? FALLBACK.gold.high24h,
      low24h: json.gold?.low24h ?? FALLBACK.gold.low24h,
      updatedAt: json.gold?.updatedAt ?? json.published_at ?? new Date().toISOString(),
    },
    silver: {
      spotUSD: silver,
      change24h: json.silver?.change24h ?? FALLBACK.silver.change24h,
      changePercent24h: json.silver?.changePercent24h ?? FALLBACK.silver.changePercent24h,
      prevClose: json.silver?.prevClose ?? silver - (json.silver?.change24h ?? 0),
      high24h: json.silver?.high24h ?? FALLBACK.silver.high24h,
      low24h: json.silver?.low24h ?? FALLBACK.silver.low24h,
      updatedAt: json.silver?.updatedAt ?? json.published_at ?? new Date().toISOString(),
    },
    // Platinum, Palladium, Copper, BTC - use market-rates.json if available, else fallbacks
    platinum: json.platinum ?? FALLBACK.platinum,
    palladium: json.palladium ?? FALLBACK.palladium,
    copper: json.copper ?? FALLBACK.copper,
    btcusd: json.btcusd ?? FALLBACK.btcusd,
    history30d: hist30d,
    aedPerUSD,
    forex: fx,
    goldSilverRatio: ratio,
    source: json.source ?? 'COMEX / LBMA Spot Benchmark',
    updatedAt: json.published_at ?? json.updatedAt ?? new Date().toISOString(),
    isLive: true,
  };
}

// ─── Main Hook ───────────────────────────────────────────────────────────────
export function useInternationalRates(seedData?: InternationalRates) {
  const [rates, setRates] = useState<InternationalRates>(() => {
    // Priority: seed (SSR data) > localStorage > FALLBACK
    if (seedData?.isLive) return seedData;
    if (typeof window !== 'undefined') {
      const cached = readCached();
      if (cached) return { ...cached, isLive: true };
    }
    return seedData ?? FALLBACK;
  });
  const [loading, setLoading] = useState(false);
  const [lastFetchedAt, setLastFetchedAt] = useState<string>(
    seedData?.updatedAt ?? FALLBACK.updatedAt
  );

  const forexRef = useRef<Record<string, number>>({});
  const lastForexFetch = useRef<number>(0);
  const lastVersionRef = useRef<string>('');
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const versionTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch forex from local JSON (written by market-engine.php cron) ──
  const fetchForex = useCallback(async () => {
    const now = Date.now();
    if (now - lastForexFetch.current < FOREX_REFRESH_MS) return;
    try {
      // First try local cron-generated forex-rates.json
      const r = await fetch('/data/forex-rates.json', {
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      });
      if (r.ok) {
        const j = await r.json();
        // forex-rates.json uses nrb_rates array format
        if (Array.isArray(j.nrb_rates)) {
          const fxMap: Record<string, number> = {};
          for (const row of j.nrb_rates) {
            if (row.iso3 && row.mid) {
              // NRB rates are NPR per row.unit of foreign currency
              // We need foreign currency per 1 USD -> invert: mid/unit gives NPR per 1 unit FC
              // USD mid = NPR/USD, so FC/USD = (NPR/USD) / (NPR/unit_FC * 1/unit_FC)
              // Simpler: use USD row to get NPR/USD, then derive others
              fxMap[row.iso3] = row.mid / (row.unit ?? 1);
            }
          }
          // Convert NRB NPR-per-unit format to USD-per-unit:
          // fxMap currently has NPR per 1 FC unit. We need FC per USD.
          // NPR per USD = fxMap['USD']. FC per USD = fxMap['USD'] / fxMap[FC]
          const nprPerUSD = fxMap['USD'] ?? 150.29;
          const usdRates: Record<string, number> = {};
          for (const [iso, nprPerUnit] of Object.entries(fxMap)) {
            // nprPerUnit = NPR per 1 unit of iso currency
            // 1 USD = nprPerUSD NPR => 1 USD = nprPerUSD / nprPerUnit units of iso
            usdRates[iso] = nprPerUSD / nprPerUnit;
          }
          // Special cases
          usdRates['USD'] = 1.0;
          usdRates['AED'] = 3.6725; // fixed peg
          forexRef.current = usdRates;
          lastForexFetch.current = now;
          return;
        }
        // If it's exchangerate-api format
        if (j.rates) {
          forexRef.current = j.rates;
          lastForexFetch.current = now;
          return;
        }
      }
    } catch { /* fall through */ }
    // Fallback: try exchangerate-api (free, no key needed)
    try {
      const r2 = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
        signal: AbortSignal.timeout(6000),
      });
      if (r2.ok) {
        const j2 = await r2.json();
        if (j2.rates) {
          forexRef.current = j2.rates;
          lastForexFetch.current = now;
        }
      }
    } catch { /* non-critical */ }
  }, []);

  // ── Fetch full international-rates.json ──────────────────────────────────
  const fetchRates = useCallback(async (force = false) => {
    try {
      // Check version first unless forced
      if (!force) {
        try {
          const vr = await fetch('/data/rates-version.txt', {
            cache: 'no-store',
            signal: AbortSignal.timeout(4000),
          });
          if (vr.ok) {
            const hash = (await vr.text()).trim().split('\n')[0].trim();
            if (hash && hash === lastVersionRef.current) return; // No change
            lastVersionRef.current = hash;
          }
        } catch { /* non-critical */ }
      }

      await fetchForex();

      const r = await fetch('/data/international-rates.json', {
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) return;
      const json = await r.json();
      if (!json.gold?.spotUSD) return;

      const built = buildFromJson(json, forexRef.current);
      setRates(built);
      setLastFetchedAt(built.updatedAt);
      setLoading(false);
      writeCache(built);
    } catch { /* non-critical - keep existing rates */ }
  }, [fetchForex]);

  // ── Also try market-rates.json for extra metals (platinum, palladium, etc.) ──
  const fetchMarketRates = useCallback(async () => {
    try {
      const r = await fetch('/data/market-rates.json', {
        cache: 'no-store',
        signal: AbortSignal.timeout(6000),
      });
      if (!r.ok) return;
      const json = await r.json();
      setRates(prev => ({
        ...prev,
        platinum: json.platinum ?? prev.platinum,
        palladium: json.palladium ?? prev.palladium,
        copper: json.copper ?? prev.copper,
        btcusd: json.btcusd ?? prev.btcusd,
      }));
    } catch { /* non-critical */ }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchRates(true);
    fetchMarketRates();

    // Version polling (lightweight - 30s)
    versionTimer.current = setInterval(() => fetchRates(false), VERSION_POLL_MS);

    // Full safety net re-fetch (5 min)
    pollTimer.current = setInterval(() => {
      fetchRates(true);
      fetchMarketRates();
    }, POLL_MS);

    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current);
      if (versionTimer.current) clearInterval(versionTimer.current);
    };
  }, [fetchRates, fetchMarketRates]);

  return { rates, loading, lastFetchedAt };
}

export { FALLBACK as INTL_RATES_FALLBACK };
