'use client';

import { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';
import { Landmark, Info } from 'lucide-react';

const TOLA_GRAMS = 11.66381;

const METAL_CONTENT = {
  gold: {
    title: 'Live Gold Price Today',
    desc: '24K Hallmark & 22K Tejabi gold rates. Official FENEGOSIDA benchmarks.',
    label: 'Gold',
    filter: 'gold' as const,
  },
  silver: {
    title: 'Live Silver Price Today',
    desc: 'Silver (Chandi) rates per tola/gram. FENEGOSIDA benchmarks.',
    label: 'Silver',
    filter: 'silver' as const,
  }
};

export default function GoldConverter({ 
  initialAssetId, 
  isEmbed = false 
}: { 
  initialAssetId?: string;
  isEmbed?: boolean;
}) {
  const { rates, loading } = useLiveRates();
  
  const isSilverInitial = initialAssetId?.includes('silver');
  const storageKey = isSilverInitial ? 'silver_conv_v1' : 'gold_conv_v1';

  const [state, setState] = useSyncState(storageKey, {
    ratePerTola: 299700,
    quantityTola: 1,
    quantityLal: 0,
    purity: 1.0,
    makingChargeType: 'fixed' as 'fixed' | 'percent',
    makingChargeValue: 2000,
    useLiveMarket: true,
    selectedAssetId: initialAssetId || 'gold_hallmark_tola',
    unitMode: 'tola' as 'tola' | 'gram',
    manualGrams: 10
  }, { persistent: true, debounce: 300, syncToUrl: false });

  const { 
    quantityTola, 
    quantityLal, 
    makingChargeType, 
    makingChargeValue, 
    selectedAssetId = initialAssetId || 'gold_hallmark_tola', 
    unitMode, 
    manualGrams,
    ratePerTola 
  } = state;
  
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const content = isSilverInitial ? METAL_CONTENT.silver : METAL_CONTENT.gold;
  const activeAssetId = isSilverInitial 
    ? (selectedAssetId.includes('silver') ? selectedAssetId : 'silver_tola')
    : (selectedAssetId.includes('gold') ? selectedAssetId : 'gold_hallmark_tola');

  const is10g = activeAssetId?.includes('10g') ?? false;
  const divisor = is10g ? (TOLA_GRAMS / 10) : 1;

  const activeRate = useMemo(() => {
    if (!rates?.gold || !rates?.silver) return ratePerTola;
    
    switch (activeAssetId) {
      case 'gold_hallmark_tola':
      case 'gold_hallmark_10g':
        return Math.round(rates.gold.tolaNPR.current / divisor);
      case 'gold_tejabi_tola':
      case 'gold_tejabi_10g':
        return Math.round((rates.gold.tolaNPR.current * 0.916) / divisor);
      case 'silver_tola':
      case 'silver_10g':
        return Math.round(rates.silver.tolaNPR.current / divisor);
      default:
        return ratePerTola || 0;
    }
  }, [rates, activeAssetId, divisor, ratePerTola]);

  const activeAssetLabel = useMemo(() => {
    if (selectedAssetId?.includes('silver')) return 'Silver';
    if (selectedAssetId?.includes('tejabi')) return 'Tejabi Gold';
    return 'Hallmark Gold';
  }, [selectedAssetId]);

  const result = useMemo(() => {
    const totalGrams = unitMode === 'gram' 
      ? manualGrams 
      : (quantityTola * TOLA_GRAMS) + (quantityLal * (TOLA_GRAMS/100));
    
    const basePrice = (totalGrams / TOLA_GRAMS) * activeRate;
    const makingCharges = makingChargeType === 'fixed' ? makingChargeValue : (basePrice * makingChargeValue) / 100;
    const totalPrice = basePrice + makingCharges;

    return {
      totalGrams: Number(totalGrams.toFixed(4)),
      basePrice: Math.round(basePrice),
      makingCharges: Math.round(makingCharges),
      totalPrice: Math.round(totalPrice)
    };
  }, [activeRate, quantityTola, quantityLal, makingChargeType, makingChargeValue, manualGrams, unitMode]);

  const fmt = (n: number) => n.toLocaleString('en-IN');

  if (!rates?.gold || !rates?.silver || loading) {
     return <div className="p-12 flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Syncing Engine</div>
     </div>;
  }

  const mainContent = (
    <div className="p-5 sm:p-7 space-y-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{content.label} Weight</label>
             <div className="grid grid-cols-2 gap-2">
                <ValidatedInput label="Tola" value={quantityTola} onChange={v => update({ quantityTola: v, unitMode: 'tola' })} min={0} />
                <ValidatedInput label="Lal" value={quantityLal} onChange={v => update({ quantityLal: v, unitMode: 'tola' })} min={0} max={99} />
             </div>
             <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                {['gram', 'tola'].map(mode => (
                   <button 
                      key={mode} 
                      onClick={() => update({ unitMode: mode as any })}
                      className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${unitMode === mode ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                   >
                      {mode}
                   </button>
                ))}
             </div>
             {unitMode === 'gram' && (
                <ValidatedInput label="Grams" value={manualGrams} onChange={v => update({ manualGrams: v })} min={0} />
             )}
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Making Charges</label>
             <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-2">
                {['fixed', 'percent'].map(type => (
                   <button 
                      key={type}
                      onClick={() => update({ makingChargeType: type as any })}
                      className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${makingChargeType === type ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                   >
                      {type}
                   </button>
                ))}
             </div>
             <ValidatedInput label={makingChargeType === 'fixed' ? 'Rs.' : '%'} value={makingChargeValue} onChange={v => update({ makingChargeValue: v })} min={0} />
          </div>
       </div>

       <div className="pt-6 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
             <ResultCard label="Base Price" value={`Rs. ${fmt(result.basePrice)}`} />
             <ResultCard label="Charges" value={`Rs. ${fmt(result.makingCharges)}`} />
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl text-white text-center shadow-lg shadow-blue-900/10">
             <div className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">Estimated Valuation</div>
             <div className="text-xl font-black tracking-tighter mb-1">Rs. {fmt(result.totalPrice)}</div>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{result.totalGrams} Grams • {activeAssetLabel}</p>
          </div>
       </div>

       {isEmbed && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Live Benchmark</div>
            <div className="text-lg font-black text-blue-600">Rs. {fmt(activeRate)}</div>
            <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               Market In-Sync
            </div>
          </div>
       )}
    </div>
  );

  if (isEmbed) return mainContent;

  return (
    <CalculatorLayout
      title={content.title}
      description={content.desc}
      category={{ label: 'Market Rates', href: '/market-rates' }}
      leftPanel={mainContent}
      rightPanel={
        <div className="space-y-6">
           <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-100 mb-4">
                 <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900 mb-2">Live Benchmark</h3>
              <p className="text-[18px] font-black text-blue-600 tracking-tighter mb-2">Rs. {fmt(activeRate)}</p>
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                 Market In-Sync
              </div>
           </div>
           
           <div className="px-6 py-5 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-600 mt-0.5" />
              <p className="text-[10px] text-amber-800 font-medium leading-relaxed italic">
                 Official FENEGOSIDA benchmarks update daily at 10 AM. Calculations include current association margins.
              </p>
           </div>
        </div>
      }
    />
  );
}
