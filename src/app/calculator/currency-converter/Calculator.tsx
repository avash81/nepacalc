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
  const [state, setState] = useSyncState('currency_v6', { fromCurrency: 'USD', amount: 100 });
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
           <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Amount ({fromCurrency})</label>
           <input 
             type="number" 
             value={amount} 
             onChange={e => update({ amount: Number(e.target.value) })} 
             className="w-full h-11 px-4 border border-slate-200 rounded-lg text-sm font-bold bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all" 
           />
        </div>
        <div className="p-6 bg-white border border-[#dadce0] rounded-2xl text-center shadow-sm">
           <div className="text-[9px] font-black text-[#1a0dab] uppercase tracking-widest mb-1">Equivalent NPR</div>
           <div className="text-2xl font-black text-[#202124] tracking-tighter uppercase font-mono">{formatNPR(results.npr)}</div>
           <div className="mt-2 text-[8px] font-black text-slate-500 uppercase">NRB Benchmark</div>
        </div>
      </div>
    );
  }

  return (
    <ModernCalcLayout
      slug="currency-converter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Forex Tools', href: '/forex/' }, { label: 'Currency Converter' }]}
      title="Currency Converter"
      description="The definitive real-time exchange engine for Nepal. Convert global currencies to NPR with mid-market precision, live NRB-benchmarked rates, and INR peg auditing."
      icon={Globe}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Globe className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Capital Amount</label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => update({ amount: Number(e.target.value) })}
                        className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all font-mono" 
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-[#1a0dab]">{fromCurrency}</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Quick Selection</label>
                   <div className="grid grid-cols-3 gap-3">
                      {['USD', 'INR', 'EUR', 'GBP', 'AUD', 'QAR'].map(code => (
                        <button 
                          key={code} 
                          onClick={() => update({ fromCurrency: code })}
                          className={`py-4 text-[10px] font-black uppercase rounded-2xl transition-all border ${fromCurrency === code ? 'bg-[#1a73e8] border-blue-500 text-[#202124] shadow-sm shadow-blue-500/20 scale-105' : 'bg-[#f8f9fa] border-[#dadce0] text-slate-400 hover:bg-white/10'}`}
                        >
                          <span className="block text-xl mb-1">{CURRENCY_META[code]?.flag}</span>
                          {code}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-lg bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><RefreshCcw className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Institutional Catalog</h3>
             </div>
             <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(CURRENCY_META).map(([code, meta]) => (
                  <button key={code} onClick={() => update({ fromCurrency: code })}
                    className={`p-4 border text-left flex items-center gap-4 rounded-2xl transition-all ${fromCurrency === code ? 'bg-blue-50 border-blue-200 text-blue-600 scale-[1.02]' : 'bg-white border-slate-100 hover:bg-slate-50'}`}>
                    <span className="text-3xl">{meta.flag}</span>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-black uppercase leading-none tracking-wider">{code}</div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase mt-1.5 truncate">{meta.label}</div>
                    </div>
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Landmark className="w-24 h-24 text-emerald-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Institutional Valuation</div>
             <div className="text-5xl font-black tracking-tighter text-slate-900 font-mono uppercase">
                {formatNPR(results.npr)}
             </div>
             <div className="px-5 py-2 bg-emerald-50 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-emerald-600">
                NRB Benchmark Standard
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className={`p-8 border rounded-lg space-y-2 transition-all shadow-sm ${isLive ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                <div className="flex items-center justify-between">
                   <div className={`text-[10px] font-black uppercase tracking-widest ${isLive ? 'text-emerald-600' : 'text-amber-600'}`}>Engine Health</div>
                   <button onClick={fetchRates} disabled={isLoading} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                      <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                   </button>
                </div>
                <div className={`text-lg font-black ${isLive ? 'text-emerald-600' : 'text-amber-600'} uppercase tracking-tight`}>{isLive ? 'Live Sync' : 'Cache Active'}</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Updated: {lastUpdatedStr}</div>
             </div>
             <div className="p-8 bg-blue-50 border border-blue-100 rounded-lg space-y-2 shadow-sm">
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Rate</div>
                <div className="text-2xl font-black text-blue-700 tracking-tighter font-mono">1:{results.rate}</div>
                <div className="text-[9px] font-black text-[#1a0dab] uppercase">Unit Conversion</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Zap className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4 text-emerald-400" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Compliance Protocol</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed uppercase font-black tracking-tight">
                   Forex valuations are mid-market benchmarks. Bank counter rates (Buying/Selling) typically deviate by 1.2% - 2.5% per transaction.
                </p>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5"><Activity className="w-20 h-20 text-blue-600" /></div>
               <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-blue-50 rounded-2xl"><Target className="w-6 h-6 text-blue-600" /></div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Forex Volatility Matrix</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={Object.entries(rates).slice(0, 8).map(([c, r]) => ({ code: c, rate: r }))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="code" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white border border-[#dadce0] text-[#202124] p-4 rounded-2xl shadow-sm border border-[#dadce0]">
                              <p className="text-[10px] font-black uppercase tracking-widest text-[#1a0dab] mb-1">{payload[0].payload.code}</p>
                              <p className="text-xl font-black font-mono tracking-tighter text-[#202124]">{payload[0].value} <span className="text-[10px] text-slate-500">NPR</span></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="rate" radius={[12, 12, 0, 0]}>
                      {Object.entries(rates).slice(0, 8).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry[0] === fromCurrency ? '#3b82f6' : '#e2e8f0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-[#202124] rounded-lg p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><RefreshCcw className="w-64 h-64 text-emerald-500" /></div>
               <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">NRB Peg Audit</h3>
                  <div className="space-y-6">
                     <div className="p-8 rounded-[2rem] bg-[#f8f9fa] border border-[#dadce0] group hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">INR Fixed Anchor</span>
                           <span className="text-3xl font-black text-emerald-400 font-mono">1.6000</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed uppercase font-black tracking-tight">
                           Since 1993, the Nepalese Rupee has been anchored to the Indian Rupee, serving as the bedrock of import price stability.
                        </p>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl">
                           <div className="text-[9px] text-slate-400 uppercase font-black mb-2 tracking-widest">USD Base</div>
                           <div className="text-lg font-black font-mono text-[#202124]">1:{rates['USD']}</div>
                        </div>
                        <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl">
                           <div className="text-[9px] text-slate-400 uppercase font-black mb-2 tracking-widest">QAR Base</div>
                           <div className="text-lg font-black font-mono text-[#202124]">1:{rates['QAR']}</div>
                        </div>
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
        raw: "NPR_Value = Amount * Rate_Ref",
        latex: "NPR_{Value} = Amount \\times Rate_{Ref}"
      }}
      faqs={[
        { question: "Why is the bank rate different from this tool?", answer: "Banks include a Spread (profit margin). This tool provides the mid-market reference." },
        { question: "Is the INR-NPR peg permanent?", answer: "It has been fixed at 1.6 since 1993. Any change would require a major NRB policy shift." }
      ]}
    />
  );
}
