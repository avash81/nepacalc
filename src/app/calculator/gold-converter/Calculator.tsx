'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';
import { 
  Landmark, Info, Zap, Scale, Activity, Globe, History, ShieldCheck, 
  PieChart, TrendingUp, Receipt, ChevronRight, Table, ArrowRight, Wallet
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

const TOLA_GRAMS = 11.66381;

const METAL_CONTENT = {
  gold: { title: 'Nepal Gold Hub', desc: 'The authoritative benchmark for 24K Hallmark & 22K Tejabi gold. Calibrated to daily FENEGOSIDA market standards.', label: 'Gold', filter: 'gold' as const },
  silver: { title: 'Nepal Silver Hub', desc: 'Professional silver (Chandi) valuation laboratory. Bidirectional Tola/Gram conversion with live FENEGOSIDA sync.', label: 'Silver', filter: 'silver' as const }
};

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function GoldConverter({ initialAssetId, isEmbed = false }: { initialAssetId?: string; isEmbed?: boolean; }) {
  const { rates, loading } = useLiveRates();
  
  const isSilverInitial = initialAssetId?.includes('silver');
  const storageKey = isSilverInitial ? 'silver_conv_v5' : 'gold_conv_v5';

  const [state, setState] = useSyncState(storageKey, {
    ratePerTola: 150000, quantityTola: 1, quantityLal: 0, purity: 1.0,
    makingChargeType: 'fixed' as 'fixed' | 'percent', makingChargeValue: 5000,
    useLiveMarket: true, selectedAssetId: initialAssetId || 'gold_hallmark_tola',
    unitMode: 'tola' as 'tola' | 'gram', manualGrams: 10
  });

  const { quantityTola, quantityLal, makingChargeType, makingChargeValue, selectedAssetId = initialAssetId || 'gold_hallmark_tola', unitMode, manualGrams, ratePerTola } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const content = isSilverInitial ? METAL_CONTENT.silver : METAL_CONTENT.gold;
  const activeAssetId = isSilverInitial ? (selectedAssetId.includes('silver') ? selectedAssetId : 'silver_tola') : (selectedAssetId.includes('gold') ? selectedAssetId : 'gold_hallmark_tola');
  const is10g = activeAssetId?.includes('10g') ?? false;
  const divisor = is10g ? (TOLA_GRAMS / 10) : 1;

  const activeRate = useMemo(() => {
    if (!rates?.gold || !rates?.silver) return ratePerTola;
    switch (activeAssetId) {
      case 'gold_hallmark_tola': case 'gold_hallmark_10g': return Math.round(rates.gold.tolaNPR.current / divisor);
      case 'gold_tejabi_tola': case 'gold_tejabi_10g': return Math.round((rates.gold.tolaNPR.current * 0.916) / divisor);
      case 'silver_tola': case 'silver_10g': return Math.round(rates.silver.tolaNPR.current / divisor);
      default: return ratePerTola || 0;
    }
  }, [rates, activeAssetId, divisor, ratePerTola]);

  const activeAssetLabel = useMemo(() => {
    if (selectedAssetId?.includes('silver')) return 'Silver';
    if (selectedAssetId?.includes('tejabi')) return 'Tejabi Gold';
    return 'Hallmark Gold';
  }, [selectedAssetId]);

  const result = useMemo(() => {
    const totalGrams = unitMode === 'gram' ? manualGrams : (quantityTola * TOLA_GRAMS) + (quantityLal * (TOLA_GRAMS/100));
    const basePrice = (totalGrams / TOLA_GRAMS) * activeRate;
    const makingCharges = makingChargeType === 'fixed' ? makingChargeValue : (basePrice * makingChargeValue) / 100;
    
    const pieData = [
      { name: 'Metal Value', value: Math.round(basePrice) },
      { name: 'Crafting Fee', value: Math.round(makingCharges) }
    ];

    return { 
      totalGrams: Number(totalGrams.toFixed(4)), 
      basePrice: Math.round(basePrice), 
      makingCharges: Math.round(makingCharges), 
      totalPrice: Math.round(basePrice + makingCharges),
      pieData
    };
  }, [activeRate, quantityTola, quantityLal, makingChargeType, makingChargeValue, manualGrams, unitMode]);

  const inputsComponent = (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Weight Protocol</label>
               <div className="grid grid-cols-2 gap-3">
                {['tola', 'gram'].map(mode => (
                  <button 
                    key={mode} 
                    onClick={() => update({ unitMode: mode as any })} 
                    className={`h-11 rounded-md border text-[11px] font-black uppercase transition-all ${unitMode === mode ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    {mode}
                  </button>
                ))}
               </div>
            </div>

            {unitMode === 'gram' ? (
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Weight in Grams</label>
                  <input type="number" value={manualGrams} onChange={(e) => update({ manualGrams: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
               </div>
            ) : (
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Tola</label>
                     <input type="number" value={quantityTola} onChange={e => update({ quantityTola: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Lal (1/100 Tola)</label>
                     <input type="number" value={quantityLal} onChange={e => update({ quantityLal: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
                  </div>
               </div>
            )}

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Crafting Charge (Jyala/Jarti)</label>
               <div className="flex gap-3">
                  <select 
                    value={makingChargeType} 
                    onChange={(e) => update({ makingChargeType: e.target.value as any })}
                    className="w-1/3 h-12 px-3 bg-white border border-[#DADCE0] rounded-md text-[10px] font-black uppercase text-[#202124] focus:border-[#1A73E8] outline-none appearance-none"
                  >
                    <option value="fixed">Fixed Rs.</option>
                    <option value="percent">Percent %</option>
                  </select>
                  <input type="number" value={makingChargeValue} onChange={e => update({ makingChargeValue: Number(e.target.value) })} className="w-2/3 h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
               </div>
            </div>

            <div className="p-4 bg-[#FFF9E6] border border-[#F29900] rounded-md flex gap-3">
               <Zap className="w-5 h-5 text-[#F29900] shrink-0" />
               <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Rates are automatically synced with <span className="text-[#F29900] underline decoration-2">FENEGOSIDA</span> daily benchmarks.
               </p>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Metal Audit
          </button>
        </div>
  );

  const resultsComponent = (
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Estimated Jewelry Valuation</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(result.totalPrice)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                {result.totalGrams}g • {activeAssetLabel} In-Sync
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Live Market Rate</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(activeRate)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Crafting Cost</div>
                <div className="text-lg font-black text-[#D93025]">{formatNPR(result.makingCharges)}</div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Metal Retention Efficiency</span>
                <span className="text-[11px] font-black text-[#188038]">{((result.basePrice / result.totalPrice) * 100).toFixed(1)}%</span>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className="h-full bg-[#188038]" style={{ width: `${(result.basePrice / result.totalPrice) * 100}%` }} />
             </div>
          </div>
        </div>
  );

  if (isEmbed) {
    return (
      <div className="space-y-8">
        <div>
          {inputsComponent}
        </div>
        <div className="pt-8 border-t border-[#DADCE0]">
          {resultsComponent}
        </div>
      </div>
    );
  }

  return (
    <ModernCalcLayout
      slug="gold-converter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: content.label }]}
      title={content.title}
      description={content.desc}
      icon={Landmark}
      inputs={inputsComponent}
      results={resultsComponent}
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Valuation Composition</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={result.pieData}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                     >
                       <Cell fill="#1A73E8" />
                       <Cell fill="#DADCE0" />
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Weight</span>
                    <span className="text-lg font-black text-[#202124]">{result.totalGrams}g</span>
                 </div>
               </div>
               <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1A73E8]"></div> Metal Value</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#DADCE0]"></div> Crafting Fee</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Metal Integrity Audit</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Purity Rating</span>
                     <span className="text-sm font-black text-[#1A73E8]">{selectedAssetId.includes('tejabi') ? '22K (91.6%)' : '24K (99.9%)'}</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Intrinsic Bullion Value</span>
                     <span className="text-sm font-black text-[#202124]">{formatNPR(result.basePrice)}</span>
                  </div>
                  <div className="p-6 rounded-md bg-[#E8F0FE] border border-[#1A73E8] text-center">
                     <div className="text-[9px] font-black text-[#1A73E8] uppercase mb-1">Market Strategy</div>
                     <p className="text-[11px] font-bold text-[#5F6368] leading-tight">
                        Jewelry crafting (Jyala) in Nepal typically ranges from 5% to 15% of the total raw metal value.
                     </p>
                  </div>
               </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Units: Select 'Tola' for traditional Nepalese measurements or 'Grams' for metric.",
          "Weight: Enter the quantity in Tola/Lal or Grams from your jeweler's invoice.",
          "Rates: The engine syncs daily with FENEGOSIDA benchmarks for Hallmark and Tejabi gold.",
          "Charges: Enter the making charge (Jyala) as a fixed amount or percentage (Jarti).",
          "Audit: Analyze the 'Metal Efficiency' to see the actual gold value in your ornament."
        ]
      }}
      formula={{
        title: "Precious Metal Valuation Calculus",
        description: "Official industrial algorithm used by jewelry associations in Nepal.",
        raw: "Total Value = (WeightTola × MarketRate) + MakingCharges",
        variables: [
          "Tola: Traditional unit equal to 11.66381 grams",
          "Lal: 1/100th of a Tola, used for small ornament precision",
          "Hallmark: 24 Karat (99.9% pure) gold standard"
        ]
      }}
      faqs={[
        { question: "What is 1 Tola in grams?", answer: "In Nepal, 1 Tola is standardized as exactly 11.66381 grams." },
        { question: "How many Lal are in one Tola?", answer: "There are 100 Lal in 1 Tola. Each Lal is approximately 0.1166 grams." },
        { question: "What is the difference between Hallmark and Tejabi gold?", answer: "Hallmark is 24K (99.9% purity), while Tejabi is 22K (91.6% purity), often preferred for more intricate jewelry designs." },
        { question: "Who sets the gold rates in Nepal?", answer: "The Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) sets the benchmark rates daily based on international market trends." }
      ]}
      sidebar={{
        title: "Market Suite",
        subtitle: "Asset Auditing",
        links: [
          { label: "Currency Converter", href: "/calculator/currency-converter/", icon: Globe },
          { label: "FD Calculator", href: "/calculator/fd-calculator/", icon: Landmark },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "FENEGOSIDA Site", href: "https://www.fenegosida.org.np", icon: History },
        ],
      }}
      relatedTools={[
        { label: "Currency Converter", href: "/calculator/currency-converter/" },
        { label: "FD Calculator", href: "/calculator/fd-calculator/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}

