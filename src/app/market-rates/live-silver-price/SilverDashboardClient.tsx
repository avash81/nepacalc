'use client';

import React, { useState, useCallback } from 'react';
import { useLiveRates } from '@/hooks/useLiveRates';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Coins, Table, ShieldCheck, Zap } from 'lucide-react';

export default function SilverDashboardClient({ 
  seoContent, 
  seoToc 
}: { 
  seoContent?: React.ReactNode; 
  seoToc?: React.ReactNode; 
}) {
  const { rates, loading, error } = useLiveRates();

  if (loading || !rates?.silver) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
     </div>;
  }

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const silver = rates.silver.tolaNPR;

  const tables = [
    { label: 'Fine Silver (Chandi)', np: 'शुद्ध चाँदी (प्रति तोला)', rate: silver.current, unit: '1 Tola' },
    { label: 'Fine Silver (Chandi)', np: 'शुद्ध चाँदी (१० ग्राम)', rate: Math.round(silver.current / 1.1664), unit: '10 Gram' },
  ];

  return (
    <div className="max-w-[1000px] mx-auto pb-12">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 border-b border-slate-200 pb-6">
        <div className="flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <button 
              onClick={() => window.history.length > 2 ? window.history.back() : (window.location.href = '/')}
              className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#5F6368] hover:text-blue-600 transition-all border-r border-[#dadce0] pr-4 py-1"
            >
              <span className="text-xl">←</span> <span>Back</span>
            </button>
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[13px] font-medium text-[#5f6368]">
              <a href="/" className="hover:text-blue-600 hover:underline">Home</a>
              <span className="text-slate-300">/</span>
              <a href="/market-rates/" className="hover:text-blue-600 hover:underline">Market Rates</a>
              <span className="text-slate-300">/</span>
              <span className="text-[#202124] font-bold">Silver Price</span>
            </nav>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight mb-2">
            Silver Price in Nepal Today – Live Chandi Rates
          </h1>
          <p className="text-[#5f6368] text-base font-medium leading-relaxed max-w-xl">
            Daily verified silver (Chandi) rates in Nepal. High-precision benchmarks based on international industrial spot markets and official FENEGOSIDA price mandates.
          </p>
        </div>

        <div className="flex flex-col bg-white border border-slate-200 rounded-2xl p-5 shadow-sm min-w-[280px]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-600">Live Market Feed</span>
            </div>
            <span className="text-xs font-medium text-slate-500">Today's Official Silver Rate<br/>Per Tola (999 Fine)</span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-xl font-bold text-slate-400">Rs.</span>
            <span className="text-4xl font-black tracking-tighter text-slate-900">{fmt(silver.current)}</span>
          </div>
          {silver.changePercent24h !== undefined && (
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">24H Change</span>
              <div className={`px-2 py-0.5 rounded text-xs font-black flex items-center gap-1 ${silver.changePercent24h >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {silver.changePercent24h >= 0 ? '+' : ''}{silver.changePercent24h}%
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 items-start">
        <article className="min-w-0">
          <div className="lg:hidden mb-12">
            <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
              {seoToc}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="flex flex-col">
               {/* Stale data warning */}
               {!rates.gold.isFresh && (
                 <div className="mx-4 sm:mx-6 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                   <span className="text-amber-600 text-lg">⚠️</span>
                   <div>
                     <p className="text-[12px] font-bold text-amber-800">Showing last verified FENEGOSIDA rate</p>
                     <p className="text-[11px] text-amber-700">Official rate as of {rates.gold.dataDate}. Today&apos;s rate will appear once FENEGOSIDA publishes (~11 AM NPT).</p>
                   </div>
                 </div>
               )}
               {/* Error State UX */}
               {error && (
                 <div className="mx-4 sm:mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-800">
                   <p className="text-[12px] font-bold">Live connection unavailable.</p>
                   <p className="text-[11px]">Displaying last verified FENEGOSIDA record from {rates.gold.dataDate}.</p>
                 </div>
               )}

               {/* Freshness/Verification Badge */}
               <div className="mx-4 sm:mx-6 mt-4 p-3 bg-white border border-slate-200 rounded-xl flex flex-wrap gap-4 items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full animate-pulse ${rates.gold.isFresh ? 'bg-green-500' : 'bg-amber-400'}`}></div>
                     {rates.gold.isFresh ? 'Live · Today' : 'Last Verified'}
                  </div>
                  <div className="flex items-center gap-2">
                     Source: FENEGOSIDA
                  </div>
                  <div className="flex items-center gap-2">
                     Updated Today ({new Date(rates.gold.dataDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })})
                  </div>
                  <div className="flex items-center gap-2">
                     Next Update: ~11:00 AM NPT
                  </div>
                  <div className={`flex items-center gap-2 px-2 py-0.5 rounded text-[10px] ${rates.gold.isFresh ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
                     {rates.gold.isFresh ? 'Fresh ✓' : 'Cached'}
                  </div>
               </div>
               <div className="mx-4 sm:mx-6 mt-3 mb-2 text-[11px] text-slate-500 font-medium leading-relaxed">
                 Official Nepal silver rate updated daily from FENEGOSIDA. International spot silver (XAG/USD) is shown for global market reference only.
               </div>

               {/* Chart Section */}
               <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-slate-500" />
                        <div className="text-[13px] font-black uppercase tracking-widest text-slate-900">International Spot Market (XAG/USD)</div>
                     </div>
                     <div className="px-2 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-400 tracking-widest">
                        WORLD SILVER INDEX
                     </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-4">
                     <em>* Nepal's official silver price is fixed once daily by FENEGOSIDA. This live chart tracks the international spot market which drives the daily local price changes.</em>
                  </p>
                  <div className="w-full h-[340px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm relative">
                     <TradingViewWidget 
                        symbol="OANDA:XAGUSD"
                        theme="light"
                        containerId="tv_chart_silver_main"
                        chartStyle="3"
                        interval="D"
                     />
                  </div>
               </div>

               {/* AI Overview Safety Block */}
               <div className="mx-4 sm:mx-6 mt-4 p-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 text-[11px] leading-relaxed font-medium">
                 <strong>Note:</strong> Rates shown on this page track the official benchmark rates published by FENEGOSIDA as closely as possible, including standard import duties. Retail purchase prices may vary slightly due to making charges (jyala), wastage (jarti), VAT, and individual jeweler pricing policies.
               </div>

               {/* Quick Answer Box */}
               <div id="quick-answer" className="quick-answer-block bg-slate-50/50 mt-4 p-6 border-y border-slate-100 flex flex-col md:flex-row gap-6 items-center">
                 <div className="p-3 bg-slate-200 text-slate-600 rounded-full shrink-0">
                   <Zap className="w-6 h-6" />
                 </div>
                 <div className="flex-1">
                   <h2 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today's Rate Summary</h2>
                   <p className="text-sm text-slate-700 font-medium leading-relaxed m-0">
                     The official silver (Chandi) price in Nepal today is <strong>Rs. {fmt(silver.current)}</strong> per Tola and <strong>Rs. {fmt(Math.round(silver.current / 1.1664))}</strong> per 10 Grams. Prices closely reflect FENEGOSIDA benchmarks and include all standard Nepal customs and import duties.
                   </p>
                   <p className="text-sm text-slate-700 font-medium leading-relaxed m-0 mt-3">
                     <strong>Note:</strong> Since import costs dictate the final price, you should also check <a href="/market-rates/exchange-rate-nepal/" className="text-slate-900 underline font-bold hover:text-blue-600">Today's NRB Exchange Rate</a> and <a href="/market-rates/live-gold-price/" className="text-slate-900 underline font-bold hover:text-blue-600">Live Gold Prices</a>.
                   </p>
                 </div>
               </div>

               {/* Table Section */}
               <div className="p-8">
                  <div className="flex items-center gap-2 mb-6">
                     <Table className="w-4 h-4 text-slate-500" />
                     <div className="text-[12px] font-black uppercase tracking-widest text-slate-900">Nepal Benchmark Rates</div>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <th className="pb-4 px-4">Standard</th>
                              <th className="pb-4 px-4">Unit</th>
                              <th className="pb-4 px-4 text-right">Rate (NPR)</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {tables.map((row, i) => (
                              <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                 <td className="py-4 px-4">
                                    <div className="flex flex-col">
                                       <span className="text-[14px] font-black text-slate-800">{row.label}</span>
                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.np}</span>
                                    </div>
                                 </td>
                                 <td className="py-4 px-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">{row.unit}</td>
                                 <td className="py-4 px-4 text-right">
                                    <span className="text-[17px] font-black text-slate-900 tracking-tighter">Rs. {fmt(row.rate)}</span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="text-[13px] font-black uppercase tracking-[.2em] text-slate-800">Quick Valuation Calculator</h3>
            </div>
            <div className="p-6">
              <SilverCalculator silverPerTola={silver.current} />
            </div>
          </div>

          {seoContent}
        </article>
        
        <aside className="hidden lg:block sticky top-24 self-start">
          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
            {seoToc}
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── SILVER CALCULATOR ────────────────────────────────────────────────────────
type SilverPurity = '999' | '925';
type SilverUnit  = 'tola' | 'gram' | 'kg';

const PURITY_FACTOR: Record<SilverPurity, number> = { '999': 1, '925': 0.925 };
const GRAM_PER_TOLA = 11.6638;

function SilverCalculator({ silverPerTola }: { silverPerTola: number }) {
  const [purity,     setPurity]     = useState<SilverPurity>('999');
  const [unit,       setUnit]       = useState<SilverUnit>('tola');
  const [weight,     setWeight]     = useState('');
  const [charge,     setCharge]     = useState('');
  const [chargeType, setChargeType] = useState<'fixed' | 'per_gram'>('fixed');

  const silverPerGram = silverPerTola / GRAM_PER_TOLA;

  const toGrams = useCallback((val: number, u: SilverUnit) => {
    if (u === 'tola') return val * GRAM_PER_TOLA;
    if (u === 'kg')   return val * 1000;
    return val;
  }, []);

  const grams    = weight ? toGrams(parseFloat(weight) || 0, unit) : 0;
  const metalVal = grams * silverPerGram * PURITY_FACTOR[purity];
  const chargeVal = charge
    ? chargeType === 'fixed'
      ? parseFloat(charge) || 0
      : (parseFloat(charge) || 0) * grams
    : 0;
  const total = metalVal + chargeVal;
  const fmt   = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  const purityOptions: { id: SilverPurity; label: string; sub: string }[] = [
    { id: '999', label: 'Fine Silver',     sub: '999 / 99.9%' },
    { id: '925', label: 'Sterling Silver', sub: '925 / 92.5%' },
  ];

  const unitOptions: { id: SilverUnit; label: string; conv: string }[] = [
    { id: 'tola', label: 'Tola',  conv: '1 Tola = 11.664g' },
    { id: 'gram', label: 'Gram',  conv: '1g = 0.0857 Tola' },
    { id: 'kg',   label: 'KG',    conv: '1 Kg = 85.7 Tola' },
  ];

  return (
    <div className="space-y-4">
      {/* Header note */}
      <div className="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
        <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
          Official silver valuation based on daily FENEGOSIDA benchmark rates.
        </p>
      </div>

      {/* Purity selector */}
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
          Silver Standard
        </label>
        <div className="grid grid-cols-2 gap-2">
          {purityOptions.map(p => (
            <button
              key={p.id}
              onClick={() => setPurity(p.id)}
              className={`h-[52px] rounded-xl border text-left px-3 transition-all ${
                purity === p.id
                  ? 'border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8]'
                  : 'border-[#DADCE0] bg-white text-slate-500 hover:border-slate-300'
              }`}
            >
              <div className="text-[12px] font-black text-slate-800">{p.label}</div>
              <div className="text-[10px] font-bold text-slate-400">{p.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Weight Unit */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
            Unit
          </label>
          <div className="relative">
            <select
              value={unit}
              onChange={e => setUnit(e.target.value as SilverUnit)}
              className="w-full h-11 pl-3 pr-8 bg-white border border-[#DADCE0] rounded-xl text-[14px] font-bold text-slate-700 outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] appearance-none"
            >
              {unitOptions.map(u => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="mt-1 text-[10px] text-slate-400 font-medium text-right">
            {unitOptions.find(u => u.id === unit)?.conv}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
            Weight ({unit})
          </label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="0.00"
            className="w-full h-11 px-3 bg-white border border-[#DADCE0] rounded-xl text-[14px] font-bold text-slate-700 outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
          />
        </div>
      </div>

      {/* Extra Charges */}
      <div className="pt-2 border-t border-slate-100">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
          Making Charges / Jyala (Optional)
        </label>
        <div className="flex gap-2">
          <div className="relative w-[120px]">
            <select
              value={chargeType}
              onChange={e => setChargeType(e.target.value as 'fixed' | 'per_gram')}
              className="w-full h-11 pl-3 pr-8 bg-slate-50 border border-[#DADCE0] rounded-xl text-[12px] font-bold text-slate-600 outline-none focus:border-[#1a73e8] appearance-none"
            >
              <option value="fixed">Total Rs.</option>
              <option value="per_gram">Rs. per gram</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <input
            type="number"
            value={charge}
            onChange={e => setCharge(e.target.value)}
            placeholder="0"
            className="flex-1 h-11 px-3 bg-white border border-[#DADCE0] rounded-xl text-[14px] font-bold text-slate-700 outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
          />
        </div>
      </div>

      {/* Total Section */}
      <div className="mt-6 bg-[#1a73e8] rounded-xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-8 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-[11px] font-black uppercase tracking-[.2em] text-blue-100 mb-1">
            Estimated Total Value
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-medium text-blue-200">Rs.</span>
            <span className="text-4xl font-black tracking-tighter">{fmt(total)}</span>
          </div>
          
          <div className="w-full mt-4 pt-4 border-t border-blue-500/30 flex justify-between text-[11px] font-medium text-blue-100">
            <span>Metal: Rs. {fmt(metalVal)}</span>
            {chargeVal > 0 && <span>+ Charges: Rs. {fmt(chargeVal)}</span>}
          </div>
        </div>
      </div>

    </div>
  );
}
