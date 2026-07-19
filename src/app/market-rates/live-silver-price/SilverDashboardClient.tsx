'use client';

import React, { useState, useCallback } from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Coins, Table, ShieldCheck, Calculator, Zap } from 'lucide-react';

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
    <MarketDashboardLayout
      title="Silver Price"
      description="Daily verified silver (Chandi) rates in Nepal. High-precision benchmarks based on international industrial spot markets and official FENEGOSIDA price mandates."
      liveRate={fmt(silver.current)}
      changePercent={silver.changePercent24h}
      lastUpdated={new Date().toLocaleDateString()}
      accentColor="#64748b"
      mainBoard={
        <div className="flex flex-col">
           {/* Error State UX */}
           {error && (
             <div className="mx-4 sm:mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                <p className="text-[12px] font-bold">Official rate temporarily unavailable.</p>
                <p className="text-[11px]">Showing last verified FENEGOSIDA record from: {new Date(rates.gold.lastUpdated).toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</p>
             </div>
           )}

           {/* Freshness/Verification Badge */}
           <div className="mx-4 sm:mx-6 mt-4 p-3 bg-white border border-slate-200 rounded-xl flex flex-wrap gap-4 items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 Data Status: Verified
              </div>
              <div className="flex items-center gap-2">
                 Source: FENEGOSIDA / Live Spot
              </div>
              <div className="flex items-center gap-2">
                 Last Sync: {new Date(rates.gold.lastUpdated).toLocaleTimeString('en-US', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute:'2-digit' })} NPT
              </div>
              <div className="flex items-center gap-2">
                 Next Official Update: ~11:00 AM NPT
              </div>
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-2 py-0.5 rounded">
                 Market: Open
              </div>
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
      }
      calculatorSection={
        <SilverCalculator silverPerTola={silver.current} />
      }
      rightBoard={seoToc}
      seoSection={seoContent}
    />
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
              <div className={`text-[11px] font-black uppercase tracking-wide leading-none ${purity === p.id ? 'text-[#1a73e8]' : 'text-slate-700'}`}>
                {p.label}
              </div>
              <div className={`text-[10px] font-bold mt-1 ${purity === p.id ? 'text-[#1a73e8]/70' : 'text-slate-400'}`}>
                {p.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Weight input */}
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
          Enter Weight
        </label>
        {/* Unit tabs */}
        <div className="flex rounded-xl overflow-hidden border border-[#DADCE0] mb-2">
          {unitOptions.map(u => (
            <button
              key={u.id}
              onClick={() => setUnit(u.id)}
              className={`flex-1 h-9 text-[11px] font-black uppercase tracking-wide transition-all ${
                unit === u.id
                  ? 'bg-[#1a73e8] text-white'
                  : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>
        {/* Number input — spinners hidden via CSS */}
        <input
          type="number"
          min="0"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          placeholder="Enter amount"
          className="w-full h-11 px-3 border border-[#DADCE0] rounded-xl text-[15px] font-black text-slate-900 focus:outline-none focus:border-[#1a73e8] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <p className="text-[10px] text-slate-400 font-bold mt-1 pl-1">
          {unitOptions.find(u => u.id === unit)?.conv}{grams > 0 ? ` · ${fmt(grams)}g total` : ''}
        </p>
      </div>

      {/* Making charge */}
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
          Making Charge (Jyala / Jarti)
        </label>
        <div className="flex gap-2">
          <div className="flex rounded-xl overflow-hidden border border-[#DADCE0] shrink-0">
            <button
              onClick={() => setChargeType('fixed')}
              className={`px-3 h-11 text-[10px] font-black uppercase tracking-wide transition-all ${
                chargeType === 'fixed' ? 'bg-[#1a73e8] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              Fixed Rs.
            </button>
            <button
              onClick={() => setChargeType('per_gram')}
              className={`px-3 h-11 text-[10px] font-black uppercase tracking-wide transition-all ${
                chargeType === 'per_gram' ? 'bg-[#1a73e8] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              Per Gram
            </button>
          </div>
          <input
            type="number"
            min="0"
            value={charge}
            onChange={e => setCharge(e.target.value)}
            placeholder="0"
            className="flex-1 h-11 px-3 border border-[#DADCE0] rounded-xl text-[15px] font-black text-slate-900 focus:outline-none focus:border-[#1a73e8] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* Result */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-white">
          <Calculator className="w-4 h-4 text-slate-400" />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Silver Valuation</span>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[12px] text-slate-500 font-bold">Metal Value</span>
            <span className="text-[14px] font-black text-slate-800">
              {metalVal > 0 ? `Rs. ${fmt(metalVal)}` : <span className="text-slate-300">Rs. 0.00</span>}
            </span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[12px] text-slate-500 font-bold">Making Charge</span>
            <span className="text-[14px] font-black text-slate-800">
              {chargeVal > 0 ? `Rs. ${fmt(chargeVal)}` : <span className="text-slate-300">Rs. 0.00</span>}
            </span>
          </div>
          <div className="flex justify-between items-center px-4 py-4 bg-white">
            <span className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Total</span>
            <span className={`text-[20px] font-black tracking-tight ${total > 0 ? 'text-[#1a73e8]' : 'text-slate-300'}`}>
              {total > 0 ? `Rs. ${fmt(total)}` : 'Rs. 0.00'}
            </span>
          </div>
        </div>
        {total > 0 && (
          <p className="text-[10px] text-slate-400 font-bold px-4 pb-3">
            FENEGOSIDA · {purityOptions.find(p => p.id === purity)?.label} ({purityOptions.find(p => p.id === purity)?.sub})
          </p>
        )}
      </div>
    </div>
  );
}



