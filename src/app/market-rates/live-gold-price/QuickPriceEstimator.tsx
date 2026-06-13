'use client';

import React, { useState, useMemo } from 'react';
import { useLiveRates } from '@/hooks/useLiveRates';
import { Zap, ArrowRight, Calculator } from 'lucide-react';

const TOLA_GRAMS = 11.66381;

function formatNPR(n: number) {
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN');
}

export default function QuickPriceEstimator() {
  const { rates, loading } = useLiveRates();

  const [weightTola, setWeightTola] = useState<string>('');
  const [purityType, setPurityType] = useState<'hallmark' | 'tejabi'>('hallmark');

  const liveRate = useMemo(() => {
    if (!rates?.gold) return 0;
    return purityType === 'hallmark'
      ? rates.gold.tolaNPR.current
      : Math.round(rates.gold.tolaNPR.current * 0.916);
  }, [rates, purityType]);

  const estimatedValue = useMemo(() => {
    const tola = parseFloat(weightTola) || 0;
    return Math.round(tola * liveRate);
  }, [weightTola, liveRate]);

  const hasValue = estimatedValue > 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
        Quick Value Checker
      </div>

      {/* Purity Toggle */}
      <div className="grid grid-cols-2 gap-2">
        {(['hallmark', 'tejabi'] as const).map(type => (
          <button
            key={type}
            onClick={() => setPurityType(type)}
            className={`h-10 rounded-lg border text-[10px] font-black uppercase tracking-wide transition-all ${
              purityType === type
                ? 'border-amber-500 bg-amber-50 text-amber-700'
                : 'border-slate-200 bg-white text-slate-500 hover:border-amber-300'
            }`}
          >
            {type === 'hallmark' ? '24K Hallmark' : '22K Tejabi'}
          </button>
        ))}
      </div>

      {/* Weight Input */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          Weight (Tola)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 2.5"
          value={weightTola}
          onChange={e => setWeightTola(e.target.value)}
          className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
        />
        {weightTola && (
          <div className="text-[10px] text-slate-400 font-medium">
            ≈ {(parseFloat(weightTola) * TOLA_GRAMS).toFixed(4)} grams
            &nbsp;•&nbsp; {(parseFloat(weightTola) * 100).toFixed(0)} Lal
          </div>
        )}
      </div>

      {/* Live Rate Display */}
      {!loading && liveRate > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
          <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
            Today's Rate / Tola
          </span>
          <span className="text-[13px] font-black text-amber-800">{formatNPR(liveRate)}</span>
        </div>
      )}

      {/* Result */}
      {hasValue && (
        <div className="p-5 bg-slate-900 rounded-xl text-center">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Estimated Value
          </div>
          <div className="text-2xl font-black text-white">{formatNPR(estimatedValue)}</div>
          <div className="text-[9px] text-slate-400 mt-1">
            {weightTola} Tola × {formatNPR(liveRate)}
          </div>
        </div>
      )}

      {/* FENEGOSIDA Note */}
      <div className="flex items-start gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
        <Zap className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
          Synced with <strong>FENEGOSIDA</strong> daily benchmarks. For detailed jewelry audits, Lal/Aana breakdowns, and crafting charges —
        </p>
      </div>

      {/* CTA to full converter */}
      <a
        href="/calculator/gold-converter/"
        className="flex items-center justify-between w-full px-4 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors group"
      >
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider">
            🧮 Full Gold Unit Converter
          </div>
          <div className="text-[9px] font-medium opacity-80 mt-0.5">
            Tola ↔ Lal ↔ Aana ↔ Gram + Crafting Cost
          </div>
        </div>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
}
