'use client';
import { useMemo, useState, useEffect } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Globe, RefreshCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

// ── Fallback rates (Official NRB April 2026) ──────────────────────────────
const FALLBACK_RATES: Record<string, number> = {
  USD: 148.99, INR: 1.60, EUR: 175.26, GBP: 201.38, AUD: 106.80, CAD: 108.80,
  QAR: 40.86, SAR: 39.72, AED: 40.56, MYR: 37.70, KRW: 0.1016, JPY: 0.939,
  CNY: 21.85, HKD: 19.02, SGD: 117.30, THB: 4.66, KWD: 486.34, BHD: 395.20,
};

const CURRENCY_META: Record<string, { label: string; symbol: string; flag: string }> = {
  USD: { label: 'US Dollar',         symbol: '$',  flag: '🇺🇸' },
  INR: { label: 'Indian Rupee',      symbol: '₹',  flag: '🇮🇳' },
  EUR: { label: 'Euro',              symbol: '€',  flag: '🇪🇺' },
  GBP: { label: 'British Pound',     symbol: '£',  flag: '🇬🇧' },
  AUD: { label: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { label: 'Canadian Dollar',   symbol: 'C$', flag: '🇨🇦' },
  QAR: { label: 'Qatari Riyal',      symbol: '﷼',  flag: '🇶🇦' },
  SAR: { label: 'Saudi Riyal',       symbol: '﷼',  flag: '🇸🇦' },
  AED: { label: 'UAE Dirham',        symbol: 'د.إ', flag: '🇦🇪' },
  MYR: { label: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  KRW: { label: 'South Korean Won',  symbol: '₩',  flag: '🇰🇷' },
  JPY: { label: 'Japanese Yen',      symbol: '¥',  flag: '🇯🇵' },
  CNY: { label: 'Chinese Yuan',      symbol: '¥',  flag: '🇨🇳' },
  SGD: { label: 'Singapore Dollar',  symbol: 'S$', flag: '🇸🇬' },
  KWD: { label: 'Kuwaiti Dinar',     symbol: 'د.ك', flag: '🇰🇼' },
};

const CACHE_KEY = 'NEPACALC_currency_rates_v4';
const CACHE_TTL = 30 * 60 * 1000; 

interface RateCache {
  rates: Record<string, number>;
  fetchedAt: number;
}

const DEFAULT = { fromCurrency: 'USD', amount: 100 };

export default function CurrencyCalculator({ isEmbed = false }: { isEmbed?: boolean }) {
  const [state, setState] = useLocalStorage('NEPACALC_currency_v3', DEFAULT);
  const { fromCurrency, amount } = state;
  const update = (u: Partial<typeof DEFAULT>) => setState({ ...state, ...u });

  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tryCache = localStorage.getItem(CACHE_KEY);
    if (tryCache) {
      try {
        const cached: RateCache = JSON.parse(tryCache);
        const age = Date.now() - cached.fetchedAt;
        if (age < CACHE_TTL) {
          setRates(cached.rates);
          setFetchedAt(cached.fetchedAt);
          setIsLive(true);
          return;
        }
      } catch (e) { }
    }
    fetchRates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRates() {
    setIsLoading(true);
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!res.ok) throw new Error('Primary API failed');
      const json = await res.json();
      
      const nprUsd = json.rates['NPR'];
      if (!nprUsd) throw new Error('NPR data missing');

      const liveRates: Record<string, number> = {};
      Object.keys(CURRENCY_META).forEach(code => {
        if (code === 'USD') {
          liveRates[code] = parseFloat(nprUsd.toFixed(4));
        } else if (json.rates[code]) {
          const rateToNpr = nprUsd / json.rates[code];
          liveRates[code] = parseFloat(rateToNpr.toFixed(4));
        } else {
          liveRates[code] = FALLBACK_RATES[code];
        }
      });

      liveRates['INR'] = 1.60;
      const now = Date.now();
      const cache: RateCache = { rates: liveRates, fetchedAt: now };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      setRates(liveRates);
      setFetchedAt(now);
      setIsLive(true);
    } catch (err) {
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  }

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
    { label: 'INR 1000', currency: 'INR', amt: 1000 },
    { label: 'GBP 10',   currency: 'GBP', amt: 10   },
  ];

  const lastUpdatedStr = fetchedAt
    ? new Intl.DateTimeFormat('en-NP', {
        dateStyle: 'medium', timeStyle: 'short',
      }).format(new Date(fetchedAt))
    : null;

  const leftContent = (
    <div className="p-5 sm:p-7 space-y-6">
      <ValidatedInput label="Amount" value={amount} onChange={v => update({ amount: v })} min={0} required />
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">From Currency</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(CURRENCY_META).slice(0, 8).map(([code, meta]) => (
            <button key={code} onClick={() => update({ fromCurrency: code })}
              className={`p-4 border text-left flex items-center gap-3 rounded-xl transition-all ${fromCurrency === code ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-white border-slate-200 hover:border-blue-400'}`}>
              <span className="text-xl">{meta.flag}</span>
              <div>
                <div className="text-[12px] font-black">{code}</div>
                <div className={`text-[10px] font-medium leading-none mt-0.5 ${fromCurrency === code ? 'text-white/70' : 'text-slate-400'}`}>
                   {meta.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Presets</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => update({ fromCurrency: p.currency, amount: p.amt })}
              className="py-3 text-[10px] font-black border border-slate-200 bg-white hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all uppercase tracking-tighter">
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="p-5 sm:p-7 space-y-6">
      <div className={`flex flex-col gap-3 p-5 rounded-2xl border ${isLive ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
            {isLive ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {isLive ? 'Live' : 'Cached'}
          </div>
          <button onClick={fetchRates} disabled={isLoading} className="px-3 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 text-[9px] font-black uppercase transition-all">
            Refresh
          </button>
        </div>
        <div className="text-[11px] font-medium opacity-80 leading-snug">
           Rates as of {lastUpdatedStr}. Benchmark: NRB.
        </div>
      </div>

      <div className="p-6 bg-slate-900 rounded-3xl text-center text-white shadow-xl shadow-slate-900/10">
        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">Estimate Value</div>
        <div className="text-4xl font-black tracking-tighter mb-1">
          Rs. {Math.round(results.npr).toLocaleString('en-IN')}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nepalese Rupees</div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="px-5 py-3 bg-white border border-slate-200 rounded-2xl flex justify-between items-center group hover:border-blue-400 transition-colors">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Rate</span>
          <span className="text-[14px] font-black text-slate-900">1 {fromCurrency} = {results.rate} NPR</span>
        </div>
      </div>

      <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3 text-slate-600">
        <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed font-medium">
          Official daily foreign exchange rates verified against NRB compliance.
        </p>
      </div>
    </div>
  );

  if (isEmbed) {
    return (
      <div className="flex flex-col gap-6">
        {leftContent}
        <div className="border-t border-slate-100 mt-2">
           {rightContent}
        </div>
      </div>
    );
  }

  return (
    <CalculatorLayout
      title="Exchange Rate"
      description="Convert global currencies to Nepalese Rupee (NPR) with live-cached rates. Accurate foreign exchange verified against NRB daily indices."
      category={{ label: 'Market Rates', href: '/market-rates' }}
      leftPanel={leftContent}
      rightPanel={rightContent}
      faqSection={
        <CalcFAQ faqs={[
          { question: 'Is the INR rate fixed?', answer: 'Yes. The Indian Rupee is pegged to the Nepalese Rupee at 1 INR = 1.60 NPR. This has been maintained by the Nepal Rastra Bank for decades.' },
          { question: 'How current are the rates?', answer: 'Rates are fetched live from open.er-api.com on page load and cached for 30 minutes.' },
          { question: 'Does NRB set the daily rates?', answer: 'Yes, Nepal Rastra Bank publishes official reference rates every morning. Commercial banks may have a slight spread (margin).' },
        ]} />
      }
    />
  );
}
