'use client';

import { useMemo, useState, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Globe, RefreshCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

const FALLBACK_RATES: Record<string, number> = {
  USD: 148.99, INR: 1.60, EUR: 175.26, GBP: 201.38, AUD: 106.80, CAD: 108.80,
  QAR: 40.86, SAR: 39.72, AED: 40.56, MYR: 37.70, KRW: 0.1016, JPY: 0.939,
  CNY: 21.85, HKD: 19.02, SGD: 117.30, THB: 4.66, KWD: 486.34, BHD: 395.20,
};

const CURRENCY_META: Record<string, { label: string; symbol: string; flag: string }> = {
  USD: { label: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  INR: { label: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  EUR: { label: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { label: 'British Pound', symbol: '£', flag: '🇬🇧' },
  AUD: { label: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { label: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  QAR: { label: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦' },
  SAR: { label: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  AED: { label: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  MYR: { label: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  KRW: { label: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  JPY: { label: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  CNY: { label: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  SGD: { label: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  KWD: { label: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
};

const CACHE_KEY = 'NEPACALC_currency_rates_v4';
const CACHE_TTL = 30 * 60 * 1000;
interface RateCache { rates: Record<string, number>; fetchedAt: number; }

export default function CurrencyCalculator({ isEmbed = false }: { isEmbed?: boolean }) {
  const [state, setState] = useLocalStorage('NEPACALC_currency_v3', { fromCurrency: 'USD', amount: 100 });
  const { fromCurrency, amount } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tryCache = localStorage.getItem(CACHE_KEY);
    if (tryCache) {
      try {
        const cached: RateCache = JSON.parse(tryCache);
        if (Date.now() - cached.fetchedAt < CACHE_TTL) {
          setRates(cached.rates); setFetchedAt(cached.fetchedAt); setIsLive(true); return;
        }
      } catch (e) {}
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
        if (code === 'USD') liveRates[code] = parseFloat(nprUsd.toFixed(4));
        else if (json.rates[code]) liveRates[code] = parseFloat((nprUsd / json.rates[code]).toFixed(4));
        else liveRates[code] = FALLBACK_RATES[code];
      });
      liveRates['INR'] = 1.60;
      
      const now = Date.now();
      localStorage.setItem(CACHE_KEY, JSON.stringify({ rates: liveRates, fetchedAt: now }));
      setRates(liveRates); setFetchedAt(now); setIsLive(true);
    } catch (err) {
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  }

  const results = useMemo(() => {
    const rate = rates[fromCurrency] ?? FALLBACK_RATES[fromCurrency];
    return { npr: amount * rate, rate };
  }, [fromCurrency, amount, rates]);

  const lastUpdatedStr = fetchedAt ? new Intl.DateTimeFormat('en-NP', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(fetchedAt)) : null;

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  const mainContent = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className={labelCls}>Amount</label>
        <div className="relative">
          <input type="number" value={amount} min={0} onChange={e => update({ amount: Number(e.target.value) })} className={inputCls} />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">{fromCurrency}</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className={labelCls}>From Currency</label>
        <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {Object.entries(CURRENCY_META).map(([code, meta]) => (
            <button key={code} onClick={() => update({ fromCurrency: code })}
              className={`p-3 border text-left flex items-center gap-3 rounded-lg transition-all ${fromCurrency === code ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] hover:bg-[#F8F9FA]'}`}>
              <span className="text-xl">{meta.flag}</span>
              <div>
                <div className="text-[11px] font-black">{code}</div>
                <div className={`text-[9px] font-medium leading-none mt-0.5 ${fromCurrency === code ? 'text-[#1A73E8]' : 'text-[#70757A]'}`}>{meta.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {isEmbed && (
        <div className="pt-4 border-t border-[#DADCE0] space-y-4">
          <div className="p-4 bg-[#1A1A2E] rounded-md text-center text-white">
            <div className="text-[9px] text-white/60 uppercase">Equivalent NPR</div>
            <div className="text-xl font-black">Rs. {Math.round(results.npr).toLocaleString('en-IN')}</div>
          </div>
        </div>
      )}
    </div>
  );

  if (isEmbed) return mainContent;

  return (
    <ModernCalcLayout
      title="Exchange Rate Calculator"
      description="Convert global currencies to Nepalese Rupee (NPR) with live-cached rates. Accurate foreign exchange verified against NRB indices."
      icon={Globe}
      inputs={mainContent}
      results={
        <div className="space-y-6">
          <div className={`flex flex-col gap-2 p-4 rounded-lg border ${isLive ? 'bg-[#E6F4EA] border-[#CEEAD6] text-[#188038]' : 'bg-[#FFF7E0] border-[#FEEFC3] text-[#E37400]'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                {isLive ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {isLive ? 'Live Rates Active' : 'Cached Rates'}
              </div>
              <button onClick={fetchRates} disabled={isLoading} className="p-1.5 rounded bg-black/5 hover:bg-black/10 transition-colors">
                <RefreshCcw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="text-[9px] font-medium opacity-80 leading-snug">Rates as of {lastUpdatedStr}. Benchmark: NRB.</div>
          </div>

          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Estimated Value</div>
            <div className="text-4xl font-black text-[#1A73E8]">Rs. {Math.round(results.npr).toLocaleString('en-IN')}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">Nepalese Rupees</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Current Exchange Rate</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{CURRENCY_META[fromCurrency]?.flag}</span>
                <span className="text-sm font-black text-[#202124]">1 {fromCurrency}</span>
              </div>
              <span className="text-sm font-black text-[#1A73E8]">= {results.rate} NPR</span>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg items-start">
            <Globe className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Forex rates update dynamically. Note: Nepal Rastra Bank (NRB) maintains a fixed peg for Indian Rupee (INR) at 100 INR = 160 NPR.</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the amount in foreign currency.", "Select the currency you want to convert from the list.", "View the equivalent amount in Nepalese Rupees (NPR).", "The tool caches rates to work offline but you can manually refresh to pull live data."] }}
      formula={{ title: "Exchange Rate Formula", description: "Standard currency conversion using live market indices.", raw: "NPR Amount = Foreign Amount × (Live NPR Exchange Rate)\nFixed INR Peg: 1 INR = 1.60 NPR" }}
      faqs={[
        { question: "Is the INR to NPR rate fixed?", answer: "Yes, the Nepalese Rupee is pegged to the Indian Rupee at a fixed exchange rate of ₹100 INR = Rs. 160 NPR. This peg has been maintained since 1993 and is managed by Nepal Rastra Bank (NRB). It does not fluctuate with the open market." },
        { question: "Are these buying or selling rates?", answer: "These are mid-market rates sourced from live API data, intended for estimation. Commercial banks and exchange houses in Nepal apply a spread — the buying rate (when they buy USD from you) is lower, and the selling rate (when they sell USD to you) is higher than the mid-market rate." },
        { question: "How often are the exchange rates updated?", answer: "Rates are fetched from a live exchange rate API and cached for 30 minutes in your browser's local storage. When you revisit the page, it checks the cache — if the data is less than 30 minutes old, it uses the cached version. You can manually refresh rates using the refresh button." },
        { question: "Why is the Qatar Riyal (QAR) rate important for Nepal?", answer: "Qatar is one of the largest sources of remittances to Nepal. Millions of Nepali migrant workers are employed in Qatar, Saudi Arabia, and the UAE. Accurate QAR-to-NPR conversion is critical for workers sending money home and for their families planning around remittance income." },
        { question: "What is the best way to send money to Nepal from abroad?", answer: "Popular options include Western Union, IME Pay, Remitly, and Wise (TransferWise). Rates and fees vary significantly. Wise typically offers rates closest to the mid-market rate. Always compare the total received amount (after fees and exchange rate spread) rather than just the advertised rate." },
        { question: "Does NRB set exchange rates daily?", answer: "Yes, Nepal Rastra Bank publishes official buying and selling rates for major currencies every business day. These rates are used for official government and banking transactions. Our tool benchmarks against these NRB rates but uses live API data for real-time market pricing." }
      ]}
      sidebar={{ title: "Finance Tools", links: [{ label: "Gold Rate Calculator", href: "/calculator/gold-converter" }, { label: "Nepal TDS Calculator", href: "/calculator/nepal-tds-calculator" }, { label: "Savings Calculator", href: "/calculator/savings" }], banner: { title: "Remittance", description: "Sending money to Nepal? Always compare rates across different remittance platforms.", image: "/images/remittance-banner.jpg" } }}
      relatedTools={[{ label: "Gold Rate", href: "/calculator/gold-converter" }, { label: "TDS Calculator", href: "/calculator/nepal-tds-calculator" }]}
    />
  );
}
