'use client';
import { useMemo, useState, useEffect } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Globe, RefreshCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

// ── Fallback rates (used if API is unreachable) ──────────────────────────────
const FALLBACK_RATES: Record<string, number> = {
  USD: 133.50, INR: 1.60, EUR: 144.20, GBP: 168.45, AUD: 88.10, CAD: 98.30,
};

const CURRENCY_META: Record<string, { label: string; symbol: string; flag: string }> = {
  USD: { label: 'US Dollar',         symbol: '$',  flag: '🇺🇸' },
  INR: { label: 'Indian Rupee',      symbol: '₹',  flag: '🇮🇳' },
  EUR: { label: 'Euro',              symbol: '€',  flag: '🇪🇺' },
  GBP: { label: 'British Pound',     symbol: '£',  flag: '🇬🇧' },
  AUD: { label: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { label: 'Canadian Dollar',   symbol: 'C$', flag: '🇨🇦' },
};

const CACHE_KEY = 'equaly_currency_rates_v3';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms

interface RateCache {
  rates: Record<string, number>;
  fetchedAt: number; // Unix ms timestamp
}

const DEFAULT = { fromCurrency: 'USD', amount: 100 };

export default function CurrencyCalculator() {
  const [state, setState] = useLocalStorage('equaly_currency_v2', DEFAULT);
  const { fromCurrency, amount } = state;
  const update = (u: Partial<typeof DEFAULT>) => setState({ ...state, ...u });

  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Fetch / cache logic ────────────────────────────────────────────────────
  useEffect(() => {
    const tryCache = localStorage.getItem(CACHE_KEY);
    if (tryCache) {
      const cached: RateCache = JSON.parse(tryCache);
      const age = Date.now() - cached.fetchedAt;
      if (age < CACHE_TTL) {
        setRates(cached.rates);
        setFetchedAt(cached.fetchedAt);
        setIsLive(true);
        return; // still fresh, no need to re-fetch
      }
    }
    fetchRates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRates() {
    setIsLoading(true);
    try {
      // open.er-api.com is free, no auth required, base = NPR
      const res = await fetch('https://open.er-api.com/v6/latest/NPR', { cache: 'no-store' });
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      if (json.result !== 'success') throw new Error('API error');

      // json.rates gives us "how many X per 1 NPR", we want "how many NPR per 1 X"
      const liveRates: Record<string, number> = {};
      for (const code of Object.keys(CURRENCY_META)) {
        if (json.rates[code]) {
          liveRates[code] = parseFloat((1 / json.rates[code]).toFixed(4));
        }
      }
      // INR is always pegged — override with fixed value regardless of API
      liveRates['INR'] = 1.60;

      const now = Date.now();
      const cache: RateCache = { rates: liveRates, fetchedAt: now };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

      setRates(liveRates);
      setFetchedAt(now);
      setIsLive(true);
    } catch {
      // silently fall back to static rates — already set by default
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  }

  // ── Calculations ───────────────────────────────────────────────────────────
  const results = useMemo(() => {
    const rate = rates[fromCurrency] ?? FALLBACK_RATES[fromCurrency];
    const npr = amount * rate;
    const quickView = Object.entries(CURRENCY_META).map(([code, meta]) => ({
      code,
      flag: meta.flag,
      label: meta.label,
      val: (npr / (rates[code] ?? FALLBACK_RATES[code])).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }),
    }));
    return { npr, quickView, rate };
  }, [fromCurrency, amount, rates]);

  const PRESETS = [
    { label: 'USD 100',  currency: 'USD', amt: 100  },
    { label: 'EUR 50',   currency: 'EUR', amt: 50   },
    { label: 'GBP 10',   currency: 'GBP', amt: 10   },
    { label: 'INR 1000', currency: 'INR', amt: 1000 },
  ];

  const lastUpdatedStr = fetchedAt
    ? new Intl.DateTimeFormat('en-NP', {
        dateStyle: 'medium', timeStyle: 'short',
      }).format(new Date(fetchedAt))
    : null;

  return (
    <CalculatorLayout
      title="Currency Converter (NPR)"
      description="Convert global currencies to Nepalese Rupee (NPR). Rates are fetched live and cached for 1 hour."
      category={{ label: 'Finance', href: '/calculator/category/finance' }}
      leftPanel={
        <div className="space-y-6">
          {/* Live rate status banner */}
          <div className={`flex items-center justify-between p-3 rounded-lg border text-[11px] font-bold ${isLive ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
            <div className="flex items-center gap-2">
              {isLive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              {isLive
                ? `Live rates · Updated ${lastUpdatedStr}`
                : 'Using offline reference rates'}
            </div>
            <button
              onClick={fetchRates}
              disabled={isLoading}
              className="flex items-center gap-1 px-2 py-1 rounded bg-white border hover:bg-gray-50 text-gray-600 transition-all disabled:opacity-50"
            >
              <RefreshCcw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Amount Input */}
          <ValidatedInput label="Amount to Convert" value={amount} onChange={v => update({ amount: v })} min={0} required />

          {/* Currency Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">From Currency</label>
            <div className="space-y-1">
              {Object.entries(CURRENCY_META).map(([code, meta]) => (
                <button key={code} onClick={() => update({ fromCurrency: code })}
                  className={`w-full p-4 border text-left flex items-center gap-3 transition-all ${fromCurrency === code ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white border-[var(--border)] hover:bg-[var(--bg-subtle)]'}`}>
                  <span className="text-xl">{meta.flag}</span>
                  <div>
                    <div className="text-[12px] font-black">{code} — {meta.label}</div>
                    <div className={`text-[10px] font-medium ${fromCurrency === code ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
                      1 {code} = {rates[code] ?? FALLBACK_RATES[code]} NPR
                      {code === 'INR' && <span className="ml-1 opacity-70">(fixed peg)</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Quick Scenarios</label>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map(p => (
                <button key={p.label} onClick={() => update({ fromCurrency: p.currency, amount: p.amt })}
                  className="py-3 text-[11px] font-bold border border-[var(--border)] bg-[var(--bg-surface)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all uppercase">
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          {/* NPR Result Hero */}
          <div className="p-8 bg-white border border-[var(--border)] text-center">
            <div className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">NPR Equivalent</div>
            <div className="text-5xl font-black text-[#006600] tracking-tighter mb-2">
              {Math.round(results.npr).toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-bold text-[var(--text-secondary)] uppercase">Nepalese Rupees</div>
          </div>

          {/* Rate Info */}
          <div className="space-y-3">
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] flex justify-between">
              <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Exchange Rate</span>
              <span className="text-sm font-black text-[var(--text-main)]">1 {fromCurrency} = {results.rate} NPR</span>
            </div>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] flex justify-between">
              <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Inverted Rate</span>
              <span className="text-sm font-black text-[var(--text-main)]">1 NPR = {(1 / results.rate).toFixed(5)} {fromCurrency}</span>
            </div>
          </div>

          {/* Multi-Currency Grid */}
          <div className="bg-white border border-[var(--border)]">
            <div className="px-4 py-3 bg-[var(--bg-surface)] border-b border-[var(--border)]">
              <h3 className="text-[11px] font-bold uppercase text-[var(--text-main)]">Equivalent in Other Currencies</h3>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {results.quickView.map(curr => (
                <div key={curr.code} className="px-4 py-3 flex items-center justify-between hover:bg-[var(--bg-surface)]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{curr.flag}</span>
                    <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">{curr.code}</span>
                  </div>
                  <span className="text-sm font-black text-[var(--primary)] font-mono">{curr.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-[var(--bg-subtle)] border border-[var(--border)] flex gap-3">
            <Globe className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              INR is pegged to NPR at a fixed 1:1.60 rate by Nepal Rastra Bank.
              All other rates are sourced live from open.er-api.com and cached for 1 hour.
              {lastUpdatedStr && <span className="block mt-1 font-bold">Last updated: {lastUpdatedStr}</span>}
            </p>
          </div>
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'Is the INR rate fixed?', answer: 'Yes. The Indian Rupee is pegged to the Nepalese Rupee at 1 INR = 1.60 NPR. This has been maintained by the Nepal Rastra Bank for decades.' },
          { question: 'How current are the rates?', answer: 'Rates are fetched live from open.er-api.com on page load and cached for 1 hour. You can tap "Refresh" to force a live update at any time.' },
          { question: 'Where can I exchange in Nepal?', answer: 'USD, EUR, and GBP are exchangeable at most commercial banks and authorized exchange counters in Kathmandu and Pokhara.' },
        ]} />
      }
    />
  );
}
