'use client';

import React, { useState, useCallback } from 'react';
import { ShieldCheck } from 'lucide-react';

type SilverPurity = '999' | '925';
type SilverUnit  = 'tola' | 'gram' | 'kg';

const PURITY_FACTOR: Record<SilverPurity, number> = { '999': 1, '925': 0.925 };
const GRAM_PER_TOLA = 11.6638;

export default function SilverCalculatorClient({ silverPerTola }: { silverPerTola: number }) {
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
