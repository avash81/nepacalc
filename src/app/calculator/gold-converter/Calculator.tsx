'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';
import { Landmark, Info, Zap, Scale, Activity, Globe, History, ShieldCheck, PieChart, TrendingUp, Receipt, ChevronRight } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

const TOLA_GRAMS = 11.66381;

const METAL_CONTENT = {
  gold: { title: 'Nepal Gold Encyclopedia & Live Rate Engine', desc: 'The authoritative benchmark for 24K Hallmark & 22K Tejabi gold. Calibrated to daily FENEGOSIDA market standards.', label: 'Gold', filter: 'gold' as const },
  silver: { title: 'Nepal Silver Encyclopedia & Live Rate Engine', desc: 'Professional silver (Chandi) valuation laboratory. Bidirectional Tola/Gram conversion with live FENEGOSIDA sync.', label: 'Silver', filter: 'silver' as const }
};

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

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
    return { 
      totalGrams: Number(totalGrams.toFixed(4)), 
      basePrice: Math.round(basePrice), 
      makingCharges: Math.round(makingCharges), 
      totalPrice: Math.round(basePrice + makingCharges),
      chartData: [
        { name: 'Metal Value', val: Math.round(basePrice), fill: '#fbbf24' },
        { name: 'Crafting Fee', val: Math.round(makingCharges), fill: '#3b82f6' }
      ]
    };
  }, [activeRate, quantityTola, quantityLal, makingChargeType, makingChargeValue, manualGrams, unitMode]);

  const inputBlock = (
    <div className="space-y-8">
      {loading ? (
        <div className="p-12 bg-white border border-[#DADCE0] rounded-lg flex flex-col items-center justify-center gap-6 animate-pulse">
           <div className="w-10 h-10 border-4 border-[#1A73E8] border-t-transparent rounded-full animate-spin"></div>
           <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-widest">Syncing FENEGOSIDA Rates...</div>
        </div>
      ) : (
        <>
          <div className="space-y-4 border border-[#DADCE0] rounded-lg p-6 bg-white shadow-sm">
             <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                   <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Weight Protocol</label>
                   <div className="flex p-1 bg-[#F8F9FA] rounded-md border border-[#DADCE0]">
                    {['gram', 'tola'].map(mode => (
                      <button key={mode} onClick={() => update({ unitMode: mode as any })} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${unitMode === mode ? 'bg-[#1A73E8] text-[#202124] shadow-sm' : 'text-[#5F6368] hover:bg-white'}`}>{mode}</button>
                    ))}
                   </div>
                </div>
                {unitMode === 'gram' ? (
                   <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Weight in Grams</label>
                      <input 
                        type="number" 
                        value={manualGrams} 
                        onChange={(e) => update({ manualGrams: Number(e.target.value) })}
                        className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                      />
                   </div>
                ) : (
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Tola</label>
                         <input type="number" value={quantityTola} onChange={e => update({ quantityTola: Number(e.target.value) })} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Lal (1/100 Tola)</label>
                         <input type="number" value={quantityLal} onChange={e => update({ quantityLal: Number(e.target.value) })} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
                      </div>
                   </div>
                )}
             </div>
          </div>

          <div className="p-6 border border-[#DADCE0] rounded-lg bg-[#F8F9FA] space-y-4 shadow-sm">
             <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Crafting & Jewelry Logistics</h3>
             </div>
             <div className="flex p-1 bg-white border border-[#DADCE0] rounded-md">
                {['fixed', 'percent'].map(type => (
                   <button key={type} onClick={() => update({ makingChargeType: type as any })} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${makingChargeType === type ? 'bg-[#1A73E8] text-[#202124] shadow-sm' : 'text-[#5F6368] hover:bg-[#F8F9FA]'}`}>
                      {type === 'fixed' ? 'Fixed Jyala (Rs)' : 'Wastage (Jarti %)'}
                   </button>
                ))}
             </div>
             <input 
                type="number" 
                value={makingChargeValue} 
                onChange={e => update({ makingChargeValue: Number(e.target.value) })}
                className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
             />
             <p className="text-[10px] text-[#5F6368] font-bold uppercase leading-relaxed italic text-center">
                Standard Jyala in Nepal ranges from <span className="text-[#1A73E8] underline">5% to 12%</span> depending on design complexity.
             </p>
          </div>
        </>
      )}
    </div>
  );

  if (isEmbed) return (
    <div className="space-y-4">
      {inputBlock}
      <div className="p-4 bg-[#E8F0FE] border border-[#DADCE0] rounded-md text-center text-[#202124]">
        <div className="text-[9px] font-bold uppercase text-[#70757A] tracking-widest mb-1">Live Valuation</div>
        <div className="text-2xl font-black text-[#1A73E8]">{formatNPR(result.totalPrice)}</div>
      </div>
    </div>
  );

  return (
    <ModernCalcLayout
      slug="gold-converter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Precious Metals', href: '/precious-metals/' }, { label: content.label }]}
      title={content.title}
      description={content.desc}
      icon={Landmark}
      inputs={inputBlock}
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Landmark className="w-24 h-24 text-amber-600" /></div>
             <div className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em]">Estimated Jewelry Valuation</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{formatNPR(result.totalPrice)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                {result.totalGrams}g • {activeAssetLabel} In-Sync
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-amber-50 border border-amber-100 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-amber-600 uppercase">Live Market Rate</div>
                <div className="text-xl font-black text-amber-600">{formatNPR(activeRate)}</div>
             </div>
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Crafting Cost</div>
                <div className="text-xl font-black text-slate-900">{formatNPR(result.makingCharges)}</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#DADCE0] rounded-lg shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><TrendingUp className="w-24 h-24 text-[#1A73E8]" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#70757A]">Metal Integrity</h4>
                   <p className="text-2xl font-black text-[#202124]">{((result.basePrice / result.totalPrice) * 100).toFixed(1)}%</p>
                </div>
                <div className="h-2 w-32 bg-[#F1F3F4] rounded-full overflow-hidden">
                   <div className="h-full bg-[#188038] rounded-full" style={{ width: `${(result.basePrice / result.totalPrice) * 100}%` }} />
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-16">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Precious Metals Market Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for precision gold and silver valuation. Calibrated with the 
                <strong> FENEGOSIDA</strong> live indices and exact Tola-Gram algorithms, this tool provides a 
                transparent audit of metal purity, intrinsic value, and localized crafting charges (Jyala/Jarti).
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><Activity className="w-20 h-20 text-[#1A73E8]" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-[#1A73E8] rounded-full" />
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest">Valuation Composition</h3>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={result.chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="val"
                      stroke="none"
                    >
                      {result.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#1A73E8' : '#DADCE0'} />
                      ))}
                    </Pie>
                    <Tooltip 
                       formatter={(v: number) => formatNPR(v)}
                       contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                   <span className="text-[9px] font-bold text-[#70757A] uppercase">Gross Weight</span>
                   <span className="text-lg font-black text-[#202124]">{result.totalGrams}g</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-5"><ShieldCheck className="w-64 h-64 text-[#188038]" /></div>
               <h3 className="text-sm font-black mb-8 tracking-widest text-[#202124] uppercase">Market Integrity Audit</h3>
               <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-bold text-[#70757A] uppercase tracking-wider">Purity Rating</span>
                        <span className="text-sm font-black text-[#1A73E8]">{selectedAssetId.includes('tejabi') ? '22K (91.6%)' : '24K (99.9%)'}</span>
                     </div>
                     <div className="w-full h-1.5 bg-[#E8EAED] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1A73E8]" style={{ width: selectedAssetId.includes('tejabi') ? '91.6%' : '99.9%' }} />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                        <div className="text-[9px] text-[#70757A] uppercase font-bold mb-1">Metal Value</div>
                        <div className="text-sm font-black text-[#202124]">{formatNPR(result.basePrice)}</div>
                     </div>
                     <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                        <div className="text-[9px] text-[#70757A] uppercase font-bold mb-1">Buyback Ratio</div>
                        <div className="text-sm font-black text-[#188038]">~95%</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Protocol: Select 'Tola' for traditional units or 'Grams' for international standards.",
          "Weight Entry: Input the metal weight. Use the 'Lal' field for small ornaments.",
          "Live Rate: The engine automatically syncs with the latest FENEGOSIDA benchmarks.",
          "Crafting: Enter the 'Jyala' (Making Charge) as provided by your jeweler.",
          "Audit: Review the 'Metal Integrity' progress bar to see how much of your payment is actual bullion value."
        ]
      }}
      formula={{
        title: "The Precious Metal Valuation Calculus",
        description: "Standard industrial algorithm for Nepalese jewelry markets.",
        raw: "$$Total Value = (Weight_{Tola} \\times Rate_{Live}) + Jyala$$",
        latex: "Value = (Weight / 11.6638) x Rate + Crafting"
      }}
      faqs={[
        { question: "What is the weight of 1 Tola in grams?", answer: "In Nepal, 1 Tola is standardized as 11.66381 grams." },
        { question: "How many Lal are in one Tola?", answer: "There are exactly 100 Lal in one Tola." },
        { question: "What is the difference between Hallmark and Tejabi gold?", answer: "Hallmark is 24K (99.9% pure) while Tejabi is 22K (approx. 91.6% pure), commonly used for intricate jewelry." },
        { question: "How often do gold rates update in Nepal?", answer: "The FENEGOSIDA updates benchmarks every morning (except holidays) around 11:00 AM." },
        { question: "What are typical making charges in Nepal?", answer: "Making charges (Jyala) usually range from 5% to 15% of the raw gold value depending on the design." },
        { question: "Can I bring gold bars from abroad to Nepal?", answer: "No, importing gold bars is strictly restricted to commercial banks. Travelers can only bring gold jewelry within specific duty-free limits." },
        { question: "What is the duty-free limit for gold jewelry for travelers?", answer: "Individual travelers arriving by air can bring up to 50 grams of gold jewelry duty-free." },
        { question: "Is gold a good investment in Nepal?", answer: "Historically, gold has been a strong hedge against inflation and the devaluation of the NPR, delivering a CAGR of 10-12% over long horizons." },
        { question: "What is Jarti in jewelry making?", answer: "Jarti refers to the gold wastage or weight loss that occurs during the crafting process. It is often factored into the making charges." },
        { question: "How do I check if my gold is real?", answer: "Look for the Hallmark seal inside the jewelry and demand a certified receipt from a FENEGOSIDA-registered dealer." },
        { question: "What is the rate of silver per Tola?", answer: "Silver (Chandi) prices also update daily and currently range between NPR 1,500 to 2,000 per Tola depending on market volatility." },
        { question: "Do banks sell gold in Nepal?", answer: "Commercial banks in Nepal import gold bullion but primarily sell to registered jewelry associations, not directly to retail customers." },
        { question: "What is the tax on gold jewelry in Nepal?", answer: "Gold jewelry includes the metal value (after import duty) plus 13% VAT on the making charges (and sometimes the whole value depending on the dealer's registration)." },
        { question: "How do I calculate the price of gold in grams?", answer: "Divide the Tola rate by 11.6638. Our calculator handles this conversion automatically in 'Gram' mode." },
        { question: "Is the gold rate same in all cities of Nepal?", answer: "FENEGOSIDA sets a national benchmark, but local associations in cities like Pokhara, Butwal, or Biratnagar may have slight variations due to transport or local demand." },
        { question: "What is 24 Karat gold?", answer: "It is the purest form of gold (99.9% purity) and is quite soft, making it ideal for bars or simple coins but less ideal for complex jewelry." },
        { question: "What is 22 Karat gold?", answer: "It contains 22 parts gold and 2 parts other metals (like copper or silver), making it durable for daily-wear jewelry." },
        { question: "Can I use this for old gold valuation?", answer: "Yes, use the current market rate to estimate the 'Replacement Value' of your old gold, but remember to account for impurity deductions during buyback." },
        { question: "Who sets the gold rate in the international market?", answer: "The LBMA (London Bullion Market Association) spot price is the global benchmark used by associations like FENEGOSIDA." },
        { question: "Is this calculator accurate for 2081/82?", answer: "Yes, it uses live FENEGOSIDA-standardized rates and traditional Nepalese weight units." }
      ]}
      sidebar={{
        title: "Market Hub",
        subtitle: "Precious Metals",
        links: [
          { label: "Currency Converter", href: "/calculator/currency-converter/", icon: Globe },
          { label: "SIP Calculator", href: "/calculator/sip-calculator/", icon: TrendingUp },
          { label: "FD Calculator", href: "/calculator/fd-calculator/", icon: Landmark },
          { label: "FENEGOSIDA Site", href: "https://www.fenegosida.org.np", icon: History },
        ],
      }}
      relatedTools={[
        { label: "Currency Converter", href: "/calculator/currency-converter/" },
        { label: "SIP Calculator", href: "/calculator/sip-calculator/" },
        { label: "FD Calculator", href: "/calculator/fd-calculator/" }
      ]}
    />
  );
}
