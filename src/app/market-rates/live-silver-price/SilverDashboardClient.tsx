'use client';

import React, { useState, useCallback } from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Coins, Table, ShieldCheck, Calculator } from 'lucide-react';

export default function SilverDashboardClient({ 
  seoContent, 
  seoToc 
}: { 
  seoContent?: React.ReactNode; 
  seoToc?: React.ReactNode; 
}) {
  const { rates, loading } = useLiveRates();

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
           {/* Chart Section */}
           <div className="p-8 border-b border-slate-100 bg-slate-50/30">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-slate-500" />
                    <div className="text-[14px] font-black uppercase tracking-widest text-slate-900">Silver Spot Market (XAG/USD)</div>
                 </div>
              </div>
              <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative">
                 <TradingViewWidget 
                    symbol="OANDA:XAGUSD"
                    theme="light"
                    containerId="tv_chart_silver_main"
                 />
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
  const [purity,  setPurity]  = useState<SilverPurity>('999');
  const [unit,    setUnit]    = useState<SilverUnit>('tola');
  const [weight,  setWeight]  = useState('');
  const [charge,  setCharge]  = useState('');
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
  const total    = metalVal + chargeVal;
  const fmt      = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  const purityOptions: { id: SilverPurity; label: string; sub: string }[] = [
    { id: '999', label: 'Fine Silver',    sub: '999 / 99.9%' },
    { id: '925', label: 'Sterling Silver', sub: '925 / 92.5%' },
  ];

  const unitOptions: { id: SilverUnit; label: string; conv: string }[] = [
    { id: 'tola', label: 'Tola (तोला)',   conv: '1 Tola = 11.6638g' },
    { id: 'gram', label: 'Gram (ग्राम)',   conv: '1 g = 0.0857 Tola' },
    { id: 'kg',   label: 'Kilogram (किलो)', conv: '1 Kg = 85.7 Tola' },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
        <p className="text-[11px] leading-relaxed text-slate-600 font-medium italic">
          Official silver valuation based on daily FENEGOSIDA benchmark rates. Enter weight and making charges to calculate total value.
        </p>
      </div>

      {/* Purity selector */}
      <div>
        <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider block mb-2">
          Silver Standard
        </label>
        <div className="grid grid-cols-2 gap-2">
          {purityOptions.map(p => (
            <button
              key={p.id}
              onClick={() => setPurity(p.id)}
              className={`h-14 rounded-xl border text-left px-3 transition-all ${
                purity === p.id
                  ? 'border-slate-500 bg-slate-50 text-slate-800'
                  : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-slate-400'
              }`}
            >
              <div className="text-[11px] font-black uppercase tracking-wide leading-none">{p.label}</div>
              <div className="text-[10px] font-bold text-slate-400 mt-1">{p.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Weight input */}
      <div>
        <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider block mb-2">
          Enter Weight
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="0"
            className="flex-1 h-11 px-3 border border-[#DADCE0] rounded-xl text-[15px] font-black text-slate-900 focus:outline-none focus:border-slate-500"
          />
          <select
            value={unit}
            onChange={e => setUnit(e.target.value as SilverUnit)}
            className="h-11 px-3 border border-[#DADCE0] rounded-xl text-[12px] font-black text-slate-700 bg-white focus:outline-none focus:border-slate-500"
          >
            {unitOptions.map(u => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>
        <p className="text-[10px] text-slate-400 font-bold mt-1 pl-1">
          {unitOptions.find(u => u.id === unit)?.conv} · {grams > 0 ? `${fmt(grams)}g total` : '—'}
        </p>
      </div>

      {/* Making charge */}
      <div>
        <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider block mb-2">
          Making Charge (Jyala / Jarti)
        </label>
        <div className="flex gap-2">
          <div className="flex rounded-xl overflow-hidden border border-[#DADCE0]">
            {(['fixed', 'per_gram'] as const).map(t => (
              <button
                key={t}
                onClick={() => setChargeType(t)}
                className={`px-3 h-11 text-[10px] font-black uppercase tracking-wide transition-all ${
                  chargeType === t ? 'bg-slate-700 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                {t === 'fixed' ? 'Fixed Rs.' : 'Per Gram'}
              </button>
            ))}
          </div>
          <input
            type="number"
            min="0"
            value={charge}
            onChange={e => setCharge(e.target.value)}
            placeholder="0"
            className="flex-1 h-11 px-3 border border-[#DADCE0] rounded-xl text-[15px] font-black text-slate-900 focus:outline-none focus:border-slate-500"
          />
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="w-4 h-4 text-slate-500" />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Silver Valuation</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <span className="text-[12px] text-slate-500 font-bold">Metal Value</span>
          <span className="text-[14px] font-black text-slate-800">Rs. {metalVal > 0 ? fmt(metalVal) : '—'}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <span className="text-[12px] text-slate-500 font-bold">Making Charge</span>
          <span className="text-[14px] font-black text-slate-800">Rs. {chargeVal > 0 ? fmt(chargeVal) : '—'}</span>
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Total</span>
          <span className="text-[20px] font-black text-slate-900 tracking-tight">
            {total > 0 ? `Rs. ${fmt(total)}` : '—'}
          </span>
        </div>
        {total > 0 && (
          <p className="text-[10px] text-slate-400 font-bold pt-1">
            Rate synced with FENEGOSIDA · {purityOptions.find(p => p.id === purity)?.label} ({purityOptions.find(p => p.id === purity)?.sub})
          </p>
        )}
      </div>
    </div>
  );
}

