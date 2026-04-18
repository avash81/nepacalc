'use client';

import { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { MarketRatesBanner } from '@/components/calculator/MarketRatesBanner';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';
import { Coins, Star, Settings2, Info, Activity, RefreshCw, Landmark } from 'lucide-react';

const TOLA_GRAMS = 11.66381; // High-precision Nepal standard
const LAL_GRAMS = 0.1166381; // 100 Lal = 1 Tola

const PURITY_PRESETS = [
  { label: '24K (Fine Gold)', value: 1.0, description: '99.9% Pure Gold' },
  { label: '22K (Hallmarked)', value: 0.916, description: '91.6% Pure Gold' },
  { label: 'Silver (Chandi)', value: 1.0, description: 'Fine Silver' }
];

export default function GoldConverter() {
  const { rates, loading, refresh } = useLiveRates();
  
  const [state, setState] = useSyncState('gold_conv_v1', {
    ratePerTola: 125000,
    quantityTola: 1,
    quantityLal: 0,
    purity: 1.0,
    makingChargeType: 'fixed' as 'fixed' | 'percent',
    makingChargeValue: 2000,
    useLiveMarket: true,
    selectedAssetId: 'gold_hallmark_tola',
    unitMode: 'tola' as 'tola' | 'gram',
    manualGrams: 10
  });

  const { 
    ratePerTola, 
    quantityTola, 
    quantityLal, 
    purity, 
    makingChargeType, 
    makingChargeValue, 
    useLiveMarket, 
    selectedAssetId = 'gold_hallmark_tola', 
    unitMode, 
    manualGrams 
  } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });
  
  // Units/Metrics Logic: Defined at top-level for consistent precision access
  const is10g = selectedAssetId?.includes('10g') ?? false;
  const divisor = is10g ? (TOLA_GRAMS / 10) : 1;

  // Handle Sync Logic
  const activeRate = useMemo(() => {
    if (!rates?.gold || !rates?.silver) return ratePerTola;
    

    switch (selectedAssetId) {
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
  }, [rates, selectedAssetId, divisor, ratePerTola]);

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

  return (
    <CalculatorLayout
      title="Gold & Silver Laboratory"
      description="Professional Tola-to-Gram converter for the Nepal jewelry market. Calculate 24K, 22K (Hallmarked), and Silver prices with custom making charges."
      category={{ label: 'Nepal Specific', href: '/calculator/category/nepal' }}
      topHeaderPanel={
        <MarketRatesBanner 
          rates={rates} 
          selectedId={selectedAssetId} 
          onSelect={(id, rate, p, is10g) => update({ 
             selectedAssetId: id, 
             unitMode: is10g ? 'gram' : 'tola',
             // If we switch to grams, initialize with 10g
             manualGrams: is10g ? 10 : manualGrams
          })}
        />
      }
      leftPanel={
        <div className="space-y-12">
           {/* Purity selector removed as requested - using Board Selection instead */}

           <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-6 shadow-2xl">
               <div className="flex items-center justify-between gap-2 mb-2">
                 <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-400" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/80">
                       {unitMode === 'tola' ? 'Weight In Tola & Lal' : 'Weight In Grams'}
                    </h3>
                 </div>
                 <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                    {unitMode === 'tola' ? 'Standard Tola' : 'Metric Grams'}
                 </div>
               </div>
               
               {unitMode === 'tola' ? (
                 <div className="grid grid-cols-2 gap-6">
                   <ValidatedInput 
                     label="Tola" 
                     value={quantityTola} 
                     onChange={v => update({ quantityTola: v })} 
                     variant="minimal" 
                   />
                   <ValidatedInput 
                     label="Lal (100 Lal = 1 Tola)" 
                     value={quantityLal} 
                     onChange={v => update({ quantityLal: v })} 
                     variant="minimal" 
                   />
                 </div>
               ) : (
                 <div className="w-full">
                   <ValidatedInput 
                     label="Quantity (Grams)" 
                     value={manualGrams} 
                     onChange={v => update({ manualGrams: v })} 
                     variant="minimal" 
                     suffix="g"
                   />
                 </div>
               )}
               <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Total Weight</span>
                  <span className="text-2xl font-black text-amber-400 font-mono tracking-tighter">{result.totalGrams} g</span>
               </div>
           </div>

           <div className="pt-6 border-t border-[var(--border)] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-[var(--primary)]" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]">Making Charges (Jyaala)</h3>
                </div>
                <div className="flex p-1 bg-[var(--bg-subtle)] rounded-lg border border-[var(--border)]">
                   {([{ i: 'fixed', l: 'Fixed' }, { i: 'percent', l: '%' }] as const).map(m => (
                     <button 
                       key={m.i} 
                       onClick={() => update({ makingChargeType: m.i })}
                       className={`px-3 py-1.5 text-[10px] font-black uppercase rounded ${makingChargeType === m.i ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-[var(--text-muted)]'}`}
                     >
                       {m.l}
                     </button>
                   ))}
                </div>
              </div>
              <ValidatedInput 
                label={makingChargeType === 'fixed' ? 'Total Making Charge (Rs.)' : 'Percentage (%)'} 
                value={makingChargeValue} 
                onChange={v => update({ makingChargeValue: v })}
                prefix={makingChargeType === 'fixed' ? 'Rs.' : ''}
                suffix={makingChargeType === 'percent' ? '%' : ''}
              />
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Total Estimate" 
            value={fmt(result.totalPrice)} 
            unit=" Rs." 
            color="amber" 
            title="Final Bill"
            copyValue={`Rs. ${result.totalPrice}`}
          />

          <div className="bg-white border border-[var(--border)] divide-y divide-[var(--border)]">
             <div className="p-4 flex justify-between items-center bg-slate-50 border-b border-[var(--border)]">
                <span className="text-[10px] font-black uppercase text-[var(--text-main)]">Price Breakdown</span>
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
             </div>
             <div className="p-4 flex justify-between text-[11px] font-bold">
                <span className="text-[var(--text-secondary)]">{selectedAssetId.includes('silver') ? 'Silver' : 'Gold'} Base Price</span>
                <span className="text-[var(--text-main)]">Rs. {fmt(result.basePrice)}</span>
             </div>
             <div className="p-4 flex justify-between text-[11px] font-bold">
                <span className="text-amber-700">Making Charges</span>
                <span className="text-amber-700">+ Rs. {fmt(result.makingCharges)}</span>
             </div>
             <div className="p-4 flex justify-between bg-amber-50/30">
                <span className="text-[11px] font-black uppercase text-amber-900">Total Bill Amount</span>
                <span className="text-lg font-black text-amber-600 font-mono">Rs. {fmt(result.totalPrice)}</span>
             </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
             <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
             <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic">
               Note: <strong>1 Tola = {TOLA_GRAMS} Grams</strong>. Most jewelers in Nepal also calculate weight in **Lal (100 Lal = 1 Tola)** for finer stones and lightweight ornaments.
             </p>
          </div>
        </div>
      }
      faqSection={
        <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
           <h2 className="text-2xl font-black text-slate-900 mb-6">How Gold is Priced in Nepal</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                 <h4 className="text-xs font-black uppercase text-amber-600 mb-2 underline underline-offset-4 decoration-2">Units (Tola & Lal)</h4>
                 <p className="text-[12px] text-slate-600 leading-relaxed font-medium">While international markets use grams, Nepal jewelry shops strictly use Tola. Our calculator uses the standard 11.663-11.664g conversion factor. For smaller items, "Lal" is used, where 10 Lal is roughly equal to 1.16 grams.</p>
              </div>
              <div>
                 <h4 className="text-xs font-black uppercase text-amber-600 mb-2 underline underline-offset-4 decoration-2">Purity (24k vs 22k)</h4>
                 <p className="text-[12px] text-slate-600 leading-relaxed font-medium">24K gold is considered "Fine Gold" (99.9% pure) but is too soft for intricate jewelry. Most jewelry in Nepal is "Hallmarked 22K" (91.6% pure), which includes alloys for strength.</p>
              </div>
              <div>
                 <h4 className="text-xs font-black uppercase text-amber-600 mb-2 underline underline-offset-4 decoration-2">Jyaala (Making Charges)</h4>
                 <p className="text-[12px] text-slate-600 leading-relaxed font-medium">The making charge (Jyaala) covers the craftsmanship of the jeweler. This is usually between 5% to 15% for complex designs, or a fixed amount per Tola for simpler items.</p>
              </div>
           </div>
        </div>
      }
    />
  );
}
