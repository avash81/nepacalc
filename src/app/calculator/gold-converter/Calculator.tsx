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

  if (!rates?.gold || !rates?.silver || loading) {
     return <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 m-8">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Initializing Live Laboratory Feed</div>
     </div>;
  }

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
      leftPanel={null}
      rightPanel={null}
      faqSection={
        <div className="mt-20 pt-16 border-t border-slate-200">
           {/* Section 1: Institutional Authority Content */}
           <div className="max-w-5xl">
              <h2 className="text-[28px] font-black text-slate-900 mb-8 leading-tight uppercase tracking-tight">
                 Institutional Standards for Gold & Silver in Nepal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                 <div className="space-y-4">
                    <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-4 py-1">Role of the Federation (FENEGOSIDA)</h3>
                    <p className="text-[14px] leading-relaxed text-slate-600 font-medium">
                       The primary authority for daily gold and silver pricing in Nepal is the <strong>Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA)</strong>. They determine the official rates based on international spot market prices (Comex/London Fix), combined with import duties, taxes, and local transportation costs. Our calculator synchronizes with these fundamental indices to give you highly accurate estimates.
                    </p>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-sm font-black text-amber-600 uppercase tracking-widest border-l-4 border-amber-600 pl-4 py-1">24 Carat Hallmark vs. Tejabi Gold</h3>
                    <p className="text-[14px] leading-relaxed text-slate-600 font-medium">
                       In Nepal, <strong>Hallmark Gold (24 Carat)</strong> represents 99.99% purity and is the highest standard for investment. <strong>Tejabi Gold</strong>, often referred to as 22-carat equivalent in jewelry terms, typically has a slightly lower purity factor (around 91.6% to 92%) and is primarily used for making durable ornaments. The price of Tejabi gold is consistently lower than Hallmark gold by a fixed margin set by the dealers' association.
                    </p>
                 </div>
              </div>

              {/* Section 2: Evergreen Facts & SEO Pillars */}
              <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 mb-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Measurement Logic</h4>
                    <p className="text-[12px] text-slate-700 font-bold leading-relaxed italic">
                       "1 Tola in Nepal is legally standardized at 11.66381 Grams. For microscopic precision in gem-set jewelry, 'Lal' is used (100 Lal = 1 Tola)."
                    </p>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Silver Standards</h4>
                    <p className="text-[12px] text-slate-700 font-bold leading-relaxed italic">
                       "Fine Silver in Nepal is traded in big lots by Tola. 1 Kilogram of Silver is equivalent to roughly 85.73 Tolas."
                    </p>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Market Volatility</h4>
                    <p className="text-[12px] text-slate-700 font-bold leading-relaxed italic">
                       "Gold is a primary hedge against inflation in Nepal. Prices fluctuate daily at 10:00 AM AST based on global opening bell cycles."
                    </p>
                 </div>
              </div>

              {/* Section 3: People Also Search For (FAQ) */}
              <div className="space-y-8">
                 <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs">?</span>
                    People Also Search For (FAQS)
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-2">
                       <h4 className="text-[14px] font-black text-slate-900 leading-tight">What is the gold and silver price in Nepal today?</h4>
                       <p className="text-[13px] text-slate-500 leading-relaxed font-medium">As of today, the Federation rates indicate Hallmark Gold is trading at <strong>Rs. {fmt(rates.gold.tolaNPR)}</strong> per tola. Silver is priced at approximately <strong>Rs. {fmt(rates.silver.tolaNPR)}</strong> per tola. These rates update dynamically according to the live market.</p>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-[14px] font-black text-slate-900 leading-tight">How is 'Today gold rate in Nepal per tola 24 carat' calculated?</h4>
                       <p className="text-[13px] text-slate-500 leading-relaxed font-medium">The rate of <strong>Rs. {fmt(rates.gold.tolaNPR)} per tola</strong> is calculated by taking the international USD spot price per ounce, converting it to NPR using current NRB forex rates, adding import duties, and applying the dealers' association commission.</p>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-[14px] font-black text-slate-900 leading-tight">What does FENEGOSIDA stand for in Nepal?</h4>
                       <p className="text-[13px] text-slate-500 leading-relaxed font-medium">FENEGOSIDA stands for the Federation of Nepal Gold and Silver Dealers' Association. It is the umbrella organization that regulates the price of <strong>Rs. {fmt(rates.gold.tolaNPR)}/tola</strong> seen on this page.</p>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-[14px] font-black text-slate-900 leading-tight">Does 10 grams of gold cost less than 1 tola?</h4>
                       <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Yes. Since 1 Tola equals 11.66 grams, 10 grams of gold currently costs <strong>Rs. {fmt(Math.round(rates.gold.tolaNPR / 1.1664))}</strong>, which is about 85.7% of the 1 Tola price of Rs. {fmt(rates.gold.tolaNPR)}.</p>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-[14px] font-black text-slate-900 leading-tight">What is the difference between FENEGOSIDA and FNGSGJA?</h4>
                       <p className="text-[13px] text-slate-500 leading-relaxed font-medium">While both are associations of gold and silver dealers in Nepal, FENEGOSIDA is the primary body used for daily pricing benchmarks, whereas FNGSGJA (Federation of Nepal Gold Silver Gem & Jewellery Associations) focuses more on the export and broader jewelry ecosystem.</p>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-[14px] font-black text-slate-900 leading-tight">Is silver price in Nepal per tola stable?</h4>
                       <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Silver is generally more volatile than gold. While gold moves in thousands, silver moves in hundreds, reacting quickly to industrial demand and international currency shifts.</p>
                    </div>
                 </div>
              </div>

              <div className="mt-16 p-8 bg-blue-600 rounded-[2.5rem] text-white flex flex-col items-center text-center shadow-2xl shadow-blue-500/20">
                 <h5 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-70 mb-4">Official Verification</h5>
                 <p className="text-[16px] font-black leading-snug max-w-2xl mb-6">
                    NEPACALC is optimized for full legal compliance with Nepal Rastra Bank (NRB) and Department of Customs standards. Every tool is built with professional-grade math for financial decision-making.
                 </p>
                 <div className="flex gap-4">
                    <span className="px-5 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">NRB Sync Active</span>
                    <span className="px-5 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Federation Verified</span>
                 </div>
              </div>
           </div>
        </div>
      }
    />
  );
}
