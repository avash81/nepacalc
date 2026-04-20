'use client';

import { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { MarketRatesBanner } from '@/components/calculator/MarketRatesBanner';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';
import { Coins, Star, Settings2, Info, Activity, RefreshCw, Landmark } from 'lucide-react';

const TOLA_GRAMS = 11.66381;
const LAL_GRAMS = 0.1166381;

const METAL_CONTENT = {
  gold: {
    title: 'Live Gold Price Today',
    desc: '24K Hallmark & 22K Tejabi gold rates. Official FENEGOSIDA benchmarks.',
    label: 'Gold',
    filter: 'gold' as const,
    standards: [
      { title: 'FENEGOSIDA Benchmark', text: 'Daily rates based on international spot markets plus local taxes.' },
      { title: 'Hallmark vs Tejabi', text: 'Hallmark (24K) is 99.9% pure; Tejabi (22K) is for jewelry durability.' }
    ],
    faqs: [
      { q: 'What is the gold price per tola today?', a: 'Hallmark gold is Rs. {RATE}/tola.' },
      { q: 'How is it calculated?', a: 'International spot + customs + margins.' },
      { q: 'Is 24K better than 22K?', a: '24K is for investment (99.9% pure), while 22K is more durable for jewelry ornaments.' }
    ]
  },
  silver: {
    title: 'Live Silver Price Today',
    desc: 'Silver (Chandi) rates per tola/gram. FENEGOSIDA benchmarks.',
    label: 'Silver',
    filter: 'silver' as const,
    standards: [
      { title: 'Silver Standards', text: 'Global spot prices adjusted for local duties.' },
      { title: 'Measurement', text: '1 Tola = 11.66381 grams.' }
    ],
    faqs: [
      { q: 'What is the silver rate per tola?', a: 'Silver is Rs. {RATE}/tola.' },
      { q: 'Why do silver prices change?', a: 'They fluctuate based on global industrial demand and currency shifts.' },
      { q: 'How many grams in 1 tola?', a: 'One Tola of silver is exactly 11.66381 grams.' }
    ]
  }
};

export default function GoldConverter({ initialAssetId }: { initialAssetId?: string }) {
  const { rates, loading, refresh } = useLiveRates();
  
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
    purity, 
    makingChargeType, 
    makingChargeValue, 
    useLiveMarket, 
    selectedAssetId = initialAssetId || 'gold_hallmark_tola', 
    unitMode, 
    manualGrams,
    ratePerTola 
  } = state;
  
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  // Strictly enforce Silver/Gold based on initialAssetId
  const content = isSilverInitial ? METAL_CONTENT.silver : METAL_CONTENT.gold;
  const activeAssetId = isSilverInitial 
    ? (selectedAssetId.includes('silver') ? selectedAssetId : 'silver_tola')
    : (selectedAssetId.includes('gold') ? selectedAssetId : 'gold_hallmark_tola');

  const isSilver = activeAssetId?.includes('silver');
  
  // Units/Metrics Logic: Defined at top-level for consistent precision access
  const is10g = activeAssetId?.includes('10g') ?? false;
  const divisor = is10g ? (TOLA_GRAMS / 10) : 1;

  // Handle Sync Logic
  const activeRate = useMemo(() => {
    if (!rates?.gold || !rates?.silver) return ratePerTola;
    

    switch (activeAssetId) {
      case 'gold_hallmark_tola':
      case 'gold_hallmark_10g':
        return Math.round(rates.gold.tolaNPR / divisor);
      case 'gold_tejabi_tola':
      case 'gold_tejabi_10g':
        return Math.round((rates.gold.tolaNPR * 0.916) / divisor);
      case 'silver_tola':
      case 'silver_10g':
        return Math.round(rates.silver.tolaNPR / divisor);
      default:
        return ratePerTola || 0;
    }
  }, [rates, activeAssetId, divisor, ratePerTola]);

  const activeAssetLabel = useMemo(() => {
    if (selectedAssetId?.includes('silver')) return 'Silver';
    if (selectedAssetId?.includes('tejabi')) return 'Tejabi Gold';
    return 'Hallmark Gold';
  }, [selectedAssetId]);

  // Derive Purity from Selection
  const activePurity = useMemo(() => {
    if (selectedAssetId?.includes('tejabi')) return 0.916;
    return 1.0;
  }, [selectedAssetId]);

  const result = useMemo(() => {
    // Total weight in Grams
    const totalGrams = unitMode === 'gram' 
      ? manualGrams 
      : (quantityTola * TOLA_GRAMS) + (quantityLal * LAL_GRAMS);
    
    // Base Price calculation
    // Note: since the activeRate is already 'per unit selected', we don't multiply by purity again here 
    // because Hallmark/Tejabi logic is baked into the activeRate selection.
    const basePrice = (totalGrams / TOLA_GRAMS) * activeRate;
    
    // Making Charges
    const makingCharges = makingChargeType === 'fixed' 
      ? makingChargeValue 
      : (basePrice * makingChargeValue) / 100;
      
    const totalPrice = basePrice + makingCharges;

    return {
      totalGrams: Number(totalGrams.toFixed(4)),
      basePrice: Math.round(basePrice),
      makingCharges: Math.round(makingCharges),
      totalPrice: Math.round(totalPrice),
      pricePerGram: (activeRate / TOLA_GRAMS).toFixed(2)
    };
  }, [activeRate, quantityTola, quantityLal, makingChargeType, makingChargeValue]);

  const fmt = (n: number) => n.toLocaleString('en-IN');

  if (!rates?.gold || !rates?.silver || loading) {
     return <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 m-8">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Initializing Live Laboratory Feed</div>
     </div>;
  }

  return (
    <CalculatorLayout
      title={content.title}
      description={content.desc}
      category={{ label: 'Market Rates', href: '/market-rates' }}
      topHeaderPanel={null}
      leftPanel={
        <div className="p-6 sm:p-8 space-y-8">
           {/* Calculator Inputs */}
           <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{content.label} Weight</label>
                    <div className="grid grid-cols-2 gap-3">
                       <ValidatedInput 
                          label="Tola" 
                          value={quantityTola} 
                          onChange={v => update({ quantityTola: v, unitMode: 'tola' })} 
                          min={0}
                          
                       />
                       <ValidatedInput 
                          label="Lal" 
                          value={quantityLal} 
                          onChange={v => update({ quantityLal: v, unitMode: 'tola' })} 
                          min={0}
                          max={99}
                          
                       />
                    </div>
                    <div className="pt-2">
                       <div className="flex gap-2">
                          <button 
                             onClick={() => update({ unitMode: 'gram' })}
                             className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl border transition-all ${unitMode === 'gram' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-400'}`}
                          >
                             Gram Mode
                          </button>
                          <button 
                             onClick={() => update({ unitMode: 'tola' })}
                             className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl border transition-all ${unitMode === 'tola' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-400'}`}
                          >
                             Tola Mode
                          </button>
                       </div>
                    </div>
                    {unitMode === 'gram' && (
                       <ValidatedInput 
                          label="Custom Grams" 
                          value={manualGrams} 
                          onChange={v => update({ manualGrams: v })} 
                          min={0}
                       />
                    )}
                 </div>

                 <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Making Charges (Jyaala)</label>
                    <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-3">
                       <button 
                          onClick={() => update({ makingChargeType: 'fixed' })}
                          className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${makingChargeType === 'fixed' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                       >
                          Fixed (Rs)
                       </button>
                       <button 
                          onClick={() => update({ makingChargeType: 'percent' })}
                          className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${makingChargeType === 'percent' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                       >
                          Percent (%)
                       </button>
                    </div>
                    <ValidatedInput 
                       label={makingChargeType === 'fixed' ? 'Fixed Charge (Rs)' : 'Charge Percentage (%)'} 
                       value={makingChargeValue} 
                       onChange={v => update({ makingChargeValue: v })} 
                       min={0}
                    />
                 </div>
              </div>
           </div>

           {/* Results Area */}
           <div className="pt-8 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <ResultCard 
                    label="Metal Base Price" 
                    value={`Rs. ${fmt(result.basePrice)}`}
                    
                    
                 />
                 <ResultCard 
                    label="Estimated Charges" 
                    value={`Rs. ${fmt(result.makingCharges)}`}
                    
                    
                 />
              </div>

              <div className="mt-6 p-8 bg-slate-900 rounded-[2rem] text-white flex flex-col items-center justify-center text-center">
                 <div className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Total Estimated Valuation</div>
                 <div className="text-5xl font-black tracking-tighter mb-2">Rs. {fmt(result.totalPrice)}</div>
                 <div className="flex items-center gap-2 text-[13px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{result.totalGrams} Grams</span>
                    <span className="opacity-30">•</span>
                    <span>{activeAssetLabel}</span>
                 </div>
              </div>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                 <Activity className="w-4 h-4 text-blue-600" />
                 Live Market Feed
              </h3>
              <MarketRatesBanner 
                rates={rates} 
                selectedId={activeAssetId} 
                variant="compact"
                filter={content.filter}
                onSelect={(id, rate, p, is10g) => update({ 
                   selectedAssetId: id, 
                   unitMode: is10g ? 'gram' : 'tola',
                   manualGrams: is10g ? 10 : manualGrams
                })}
              />
           </div>

           <div className="p-5 bg-amber-50 rounded-xl border border-amber-100 italic text-[11px] text-amber-800 font-medium leading-relaxed">
              * Official benchmarks update daily at 10:00 AM. Rates include local customs and association margins.
           </div>
        </div>
      }
      faqSection={
        <div className="mt-8 pt-8 border-t border-slate-200">
           <div className="max-w-4xl">
              <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Official {content.label} Standards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 {content.standards.map((s, i) => (
                    <div key={i} className="space-y-2">
                       <h3 className="text-[13px] font-black text-blue-600 uppercase tracking-widest border-l-3 border-blue-600 pl-3">{s.title}</h3>
                       <p className="text-[13px] leading-relaxed text-slate-600 font-medium">{s.text}</p>
                    </div>
                 ))}
              </div>

              <div className="space-y-6">
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 text-[10px]">?</span>
                    Common Questions
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.faqs.map((f, i) => (
                       <div key={i} className="space-y-1.5">
                          <h4 className="text-[13px] font-black text-slate-900">{f.q}</h4>
                          <p className="text-[12px] text-slate-500 leading-relaxed font-medium">{f.a.replace('{RATE}', fmt(activeRate))}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      }
    />
  );
}
