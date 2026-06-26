'use client';

import { useMemo, useState, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Globe, RefreshCcw, AlertCircle, CheckCircle2, Receipt, Target, Landmark, Zap, ShieldCheck, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function formatNPR(n: number) {
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 2
  }).format(n);
}

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

const CACHE_KEY = 'NepaCalc_currency_rates_v4';
const CACHE_TTL = 30 * 60 * 1000;
interface RateCache { rates: Record<string, number>; fetchedAt: number; }

export default function CurrencyCalculator({ isEmbed = false }: { isEmbed?: boolean }) {
  const [state, setState] = useSyncState('currency_v7', { fromCurrency: 'USD', amount: 100 });
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

  if (isEmbed) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
           <label htmlFor="embed-amount" className="text-[10px] font-black uppercase tracking-wider text-[#5F6368]">Convert {fromCurrency} to NPR</label>
           <input 
             id="embed-amount"
             type="number" 
             value={amount} 
             onChange={e => update({ amount: Number(e.target.value) })} 
             className="w-full h-11 px-4 border border-[#DADCE0] rounded-lg text-sm font-bold bg-[#F8F9FA] focus:bg-white focus:border-[#1A73E8] outline-none transition-all" 
           />
        </div>
        <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl text-center shadow-sm">
           <div className="text-[9px] font-black text-[#1A73E8] uppercase tracking-widest mb-1">Equivalent NPR</div>
           <div className="text-2xl font-black text-[#202124] tracking-tighter uppercase font-mono">{formatNPR(results.npr)}</div>
           <div className="mt-2 text-[8px] font-black text-[#5F6368] uppercase">NRB Benchmark</div>
        </div>
      </div>
    );
  }

  return (
    <ModernCalcLayout
      slug="currency-converter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Currency Converter' }]}
      title="Currency Converter"
      description="The definitive real-time exchange engine for Nepal. Convert global currencies to NPR with mid-market precision, live NRB-benchmarked rates, and INR peg auditing."
      icon={Globe}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Capital Amount</label>
               <div className="relative">
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => update({ amount: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#1A73E8]">{fromCurrency}</span>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Quick Selection</label>
               <div className="grid grid-cols-3 gap-3">
                  {['USD', 'INR', 'EUR', 'GBP', 'AUD', 'QAR'].map(code => (
                    <button 
                      key={code} 
                      onClick={() => update({ fromCurrency: code })}
                      className={`h-16 flex flex-col items-center justify-center rounded-md border transition-all ${fromCurrency === code ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                    >
                      <span className="text-xl leading-none mb-1">{CURRENCY_META[code]?.flag}</span>
                      <span className="text-[10px] font-black uppercase">{code}</span>
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Institutional Catalog</label>
               <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(CURRENCY_META).map(([code, meta]) => (
                    <button 
                      key={code} 
                      onClick={() => update({ fromCurrency: code })}
                      className={`h-14 px-3 border rounded-md text-left flex items-center gap-3 transition-all ${fromCurrency === code ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                    >
                      <span className="text-2xl leading-none">{meta.flag}</span>
                      <div className="overflow-hidden flex flex-col justify-center">
                        <div className={`text-[11px] font-black uppercase leading-tight ${fromCurrency === code ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{code}</div>
                        <div className={`text-[9px] font-bold uppercase truncate ${fromCurrency === code ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{meta.label}</div>
                      </div>
                    </button>
                  ))}
               </div>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Valuation
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Institutional Valuation</div>
             <div className="text-5xl font-black text-[#1A73E8] tracking-tight">{formatNPR(results.npr)}</div>
             <div className="flex justify-center mt-2">
                <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0] shadow-sm">
                   NRB Benchmark Standard
                </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className={`border rounded-md p-4 text-center transition-colors ${isLive ? 'border-[#188038] bg-[#E6F4EA]' : 'border-[#F29900] bg-[#FFF9E6]'}`}>
                <div className="flex justify-between items-center mb-1">
                   <div className={`text-[10px] font-bold uppercase tracking-wider ${isLive ? 'text-[#188038]' : 'text-[#F29900]'}`}>Engine Health</div>
                   <button onClick={fetchRates} disabled={isLoading} className="hover:opacity-70 transition-opacity">
                      <RefreshCcw className={`w-3 h-3 ${isLive ? 'text-[#188038]' : 'text-[#F29900]'} ${isLoading ? 'animate-spin' : ''}`} />
                   </button>
                </div>
                <div className={`text-lg font-black ${isLive ? 'text-[#188038]' : 'text-[#F29900]'}`}>{isLive ? 'Live Sync' : 'Cache Active'}</div>
                <div className="text-[8px] font-bold text-[#5F6368] uppercase mt-1">Updated: {lastUpdatedStr}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Active Rate</div>
                <div className="text-lg font-black text-[#1A73E8]">1:{results.rate}</div>
                <div className="text-[8px] font-bold text-[#5F6368] uppercase mt-1">Unit Conversion</div>
             </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3 items-center">
             <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0" />
             <p className="text-[9px] text-[#5F6368] font-bold leading-relaxed uppercase">
                Compliance Protocol: Forex valuations are mid-market benchmarks. Bank counter rates (Buying/Selling) typically deviate by 1.2% - 2.5% per transaction.
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5"><Activity className="w-24 h-24 text-[#1A73E8]" /></div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Forex Volatility Matrix</h3>
                </div>
                <div className="h-[240px] w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={Object.entries(rates).slice(0, 8).map(([c, r]) => ({ code: c, rate: r }))}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                      <XAxis dataKey="code" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#5F6368' }} />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: '#F8F9FA' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-[#202124] text-white p-3 rounded shadow-sm border border-[#5F6368]">
                                <p className="text-[9px] font-bold uppercase text-[#5F6368] mb-1">{payload[0].payload.code}</p>
                                <p className="text-sm font-black">{payload[0].value} NPR</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                        {Object.entries(rates).slice(0, 8).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry[0] === fromCurrency ? '#1A73E8' : '#DADCE0'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">NRB Peg Audit</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex flex-col gap-2 group hover:border-[#1A73E8] transition-colors">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#5F6368] uppercase">INR Fixed Anchor</span>
                        <span className="text-lg font-black text-[#188038]">1.60</span>
                     </div>
                     <p className="text-[10px] text-[#5F6368] leading-relaxed">
                        Since 1993, the Nepalese Rupee has been anchored to the Indian Rupee, serving as the bedrock of import price stability.
                     </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] text-center">
                        <div className="text-[9px] font-bold text-[#5F6368] uppercase mb-1">USD Base</div>
                        <div className="text-sm font-black text-[#202124]">1:{rates['USD']}</div>
                     </div>
                     <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] text-center">
                        <div className="text-[9px] font-bold text-[#5F6368] uppercase mb-1">QAR Base</div>
                        <div className="text-sm font-black text-[#202124]">1:{rates['QAR']}</div>
                     </div>
                  </div>
               </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Source Input: Enter the capital amount in foreign currency you wish to evaluate.",
          "Quick Select: Use the top grid for major currencies like USD, INR, or EUR.",
          "Deep Catalog: Scroll the institutional catalog for regional units.",
          "Live Health: Verify the Engine Health card to ensure rates are synced.",
          "Regulatory Check: Review the Peg Audit to see how the INR anchor influences your conversion."
        ]
      }}
      formula={{
        title: "Institutional Valuation Protocol",
        description: "Synthetic cross-rate calculation method aligned with NRB benchmarks.",
        raw: "NPR_Value = Amount × Rate_Ref",
        variables: [
          "Mid-market Exchange Rate (Rate_Ref): Real-time aggregated interbank rate",
          "Fixed Peg (INR): 1.60 fixed conversion for NPR to INR",
          "Cross Rates: Determined algorithmically via USD and INR correlations"
        ]
      }}
      faqs={[
        { question: "Why is the bank rate different from this tool?", answer: "Banks include a Spread (profit margin) on their buying and selling rates. This tool provides the precise mid-market institutional reference." },
        { question: "Is the INR-NPR peg permanent?", answer: "The 1.6 peg has been strictly maintained by Nepal Rastra Bank since 1993 to ensure macroeconomic and price stability, given high trade volumes with India." },
        { question: "How often are rates updated?", answer: "Our engine synchronizes with global API endpoints, typically updating cached valuations every 30 minutes to capture live volatility." },
        { question: "Does this include remittance fees?", answer: "No, this is a pure currency conversion. Remittance companies like Western Union or IME will apply their own exchange margins and transfer fees." }
      ]}
      sidebar={{
        title: "Financial Hub",
        subtitle: "Monetary Tools",
        links: [
          { label: "Gold Converter", href: "/calculator/gold-converter/", icon: Target },
          { label: "Remittance Tool", href: "/calculator/remittance-calculator/", icon: Globe },
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Landmark },
          { label: "Nepal Rastra Bank", href: "https://nrb.org.np", icon: ShieldCheck },
        ],
      }}
      relatedTools={[
        { label: "Gold Converter", href: "/calculator/gold-converter/" },
        { label: "Remittance", href: "/calculator/remittance-calculator/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}

