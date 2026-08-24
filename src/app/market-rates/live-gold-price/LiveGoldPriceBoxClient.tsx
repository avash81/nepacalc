'use client';

import React from 'react';
import { useLiveRates } from '@/hooks/useLiveRates';

export default function LiveGoldPriceBoxClient({ initialGold }: { initialGold?: number }) {
  const { rates, loading } = useLiveRates();

  if (loading || !rates?.gold) {
    if (initialGold) {
      const fmtSeed = (n: number) => n.toLocaleString('en-IN');
      return (
        <div className="flex flex-col rounded-2xl p-5 shadow-sm min-w-[280px] bg-white border border-slate-200">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Loading Rate...</span>
            </div>
            <span className="text-xs font-medium text-slate-500">Official 24K Hallmark Rate</span>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <div className="text-sm font-bold text-slate-500 mb-1">Rs.</div>
            <div className="text-4xl font-black text-slate-900 tracking-tight">{fmtSeed(initialGold)}</div>
          </div>
        </div>
      );
    }
    return (
      <div className="min-w-[280px] h-[120px] rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const livePrice = rates.gold.tolaNPR.current;
  const isUp = rates.gold.tolaNPR.change24h > 0;
  const isDown = rates.gold.tolaNPR.change24h < 0;
  const changePct = rates.gold.tolaNPR.changePercent24h || 0;
  const isRetained = rates.gold.rateStatus === 'retained_fallback';
  
  const boxClass = isRetained ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200';
  const badgeClass = isUp ? 'text-emerald-700 bg-emerald-100' : isDown ? 'text-rose-700 bg-rose-100' : 'text-slate-600 bg-slate-100';

  return (
    <div className={`flex flex-col rounded-2xl p-5 shadow-sm min-w-[280px] border ${boxClass}`}>
      <div className="flex flex-col gap-1">
        {isRetained ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-600">Last Verified Rate</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Live Official Rate</span>
          </div>
        )}
        <span className="text-xs font-medium text-slate-500">Official 24K Hallmark Rate</span>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <div className="text-sm font-bold text-slate-500 mb-1">Rs.</div>
        <div className="text-4xl font-black text-slate-900 tracking-tight">{fmt(livePrice)}</div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs font-bold text-slate-500 tracking-wider">24H CHANGE</span>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${badgeClass}`}>
          {isUp ? '+' : isDown ? '' : '+'}{changePct.toFixed(0)}%
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
        <div className="flex justify-between">
          <span>Source</span>
          <span className="text-slate-500">FENEGOSIDA</span>
        </div>
        <div className="flex justify-between">
          <span>Rate date</span>
          <span className="text-slate-500">{new Date(rates.gold.rateDate || rates.gold.dataDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
