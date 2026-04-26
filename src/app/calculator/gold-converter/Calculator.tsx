'use client';

import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';
import { Landmark, Info } from 'lucide-react';

const TOLA_GRAMS = 11.66381;

const METAL_CONTENT = {
  gold: { title: 'Live Gold Price Today', desc: '24K Hallmark & 22K Tejabi gold rates. Official FENEGOSIDA benchmarks.', label: 'Gold', filter: 'gold' as const },
  silver: { title: 'Live Silver Price Today', desc: 'Silver (Chandi) rates per tola/gram. FENEGOSIDA benchmarks.', label: 'Silver', filter: 'silver' as const }
};

export default function GoldConverter({ initialAssetId, isEmbed = false }: { initialAssetId?: string; isEmbed?: boolean; }) {
  const { rates, loading } = useLiveRates();
  
  const isSilverInitial = initialAssetId?.includes('silver');
  const storageKey = isSilverInitial ? 'silver_conv_v1' : 'gold_conv_v1';

  const [state, setState] = useSyncState(storageKey, {
    ratePerTola: 299700, quantityTola: 1, quantityLal: 0, purity: 1.0,
    makingChargeType: 'fixed' as 'fixed' | 'percent', makingChargeValue: 2000,
    useLiveMarket: true, selectedAssetId: initialAssetId || 'gold_hallmark_tola',
    unitMode: 'tola' as 'tola' | 'gram', manualGrams: 10
  }, { persistent: true, debounce: 300, syncToUrl: false });

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
    return { totalGrams: Number(totalGrams.toFixed(4)), basePrice: Math.round(basePrice), makingCharges: Math.round(makingCharges), totalPrice: Math.round(basePrice + makingCharges) };
  }, [activeRate, quantityTola, quantityLal, makingChargeType, makingChargeValue, manualGrams, unitMode]);

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  const mainContent = (
    <div className="space-y-6">
      {(!rates?.gold || !rates?.silver || loading) ? (
        <div className="p-12 flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-3xl border border-[#DADCE0]">
          <div className="w-8 h-8 border-4 border-[#1A73E8] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#70757A]">Syncing Engine</div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <label className={labelCls}>{content.label} Weight</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {['gram', 'tola'].map(mode => (
                <button key={mode} onClick={() => update({ unitMode: mode as any })}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all ${unitMode === mode ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                  {mode}
                </button>
              ))}
            </div>
            {unitMode === 'gram' ? (
              <div className="space-y-2">
                <input type="number" value={manualGrams} min={0} onChange={e => update({ manualGrams: Number(e.target.value) })} className={inputCls} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-[10px] text-[#70757A]">Tola</label><input type="number" value={quantityTola} min={0} onChange={e => update({ quantityTola: Number(e.target.value) })} className={inputCls} /></div>
                <div className="space-y-2"><label className="text-[10px] text-[#70757A]">Lal</label><input type="number" value={quantityLal} min={0} max={99} onChange={e => update({ quantityLal: Number(e.target.value) })} className={inputCls} /></div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label className={labelCls}>Making Charges</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {['fixed', 'percent'].map(type => (
                <button key={type} onClick={() => update({ makingChargeType: type as any })}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all ${makingChargeType === type ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                  {type}
                </button>
              ))}
            </div>
            <div className="relative">
              <input type="number" value={makingChargeValue} min={0} onChange={e => update({ makingChargeValue: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">{makingChargeType === 'fixed' ? 'Rs.' : '%'}</span>
            </div>
          </div>
          
          {isEmbed && (
            <div className="pt-6 border-t border-[#DADCE0] space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#F8F9FA] rounded-md text-center"><div className="text-[9px] text-[#70757A] uppercase">Base Price</div><div className="font-bold">Rs. {fmt(result.basePrice)}</div></div>
                <div className="p-3 bg-[#F8F9FA] rounded-md text-center"><div className="text-[9px] text-[#70757A] uppercase">Charges</div><div className="font-bold">Rs. {fmt(result.makingCharges)}</div></div>
              </div>
              <div className="p-4 bg-[#1A1A2E] rounded-md text-center text-white">
                <div className="text-[9px] text-white/60 uppercase">Estimated Valuation</div>
                <div className="text-xl font-black">Rs. {fmt(result.totalPrice)}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  if (isEmbed) return mainContent;

  return (
    <ModernCalcLayout hideH1={false}
      title={content.title}
      description={content.desc}
      icon={Landmark}
      inputs={mainContent}
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1 relative overflow-hidden">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Estimated Valuation</div>
            <div className="text-4xl font-black text-[#1A73E8]">Rs. {fmt(result.totalPrice)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">{result.totalGrams} Grams • {activeAssetLabel}</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Valuation Breakdown</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Live Rate ({is10g ? '10g' : 'Tola'})</span><span className="font-black text-[#1A73E8]">Rs. {fmt(activeRate)}</span></div>
              <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Base Metal Value</span><span className="font-black">Rs. {fmt(result.basePrice)}</span></div>
              <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Making Charges</span><span className="font-black">Rs. {fmt(result.makingCharges)}</span></div>
              <div className="p-3 flex justify-between text-xs bg-[#F8F9FA]"><span className="font-bold text-[#202124]">Total Estimated Cost</span><span className="font-black text-[#1A73E8]">Rs. {fmt(result.totalPrice)}</span></div>
            </div>
          </div>

          <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-center">
            <div className="flex justify-center mb-2"><Landmark className="w-6 h-6 text-[#1A73E8]" /></div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#202124] mb-1">Live Benchmark</h3>
            <p className="text-2xl font-black text-[#1A73E8] mb-2">Rs. {fmt(activeRate)}</p>
            <div className="flex items-center justify-center gap-2 text-[9px] font-black text-[#188038] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#188038] animate-pulse"></span> Market In-Sync
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Official FENEGOSIDA benchmarks update daily. Confirm making charges directly with your jeweler as they vary.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Navigating the Precious Metals Market in Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Investing in precious metals remains a cornerstone of financial security and cultural heritage in Nepal. Our <strong className="text-[#202124]">gold price today nepal</strong> engine is synchronized with the latest benchmarks set by the <strong>Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)</strong>. Understanding the distinction between <strong>Hallmark (Chhapawal)</strong> and <strong>Tejabi</strong> gold is essential for accurate valuation; Hallmark represents 24-karat purity (99.9%), while Tejabi typically refers to 22-karat (91.6%) gold often used in traditional jewelry.
              </p>
              <p>
                For silver investors, the <strong className="text-[#202124]">silver rate nepal</strong> is equally volatile and influenced by international market fluctuations (LBMA) and local import duties. This calculator provides a professional-grade audit of your holdings by converting complex market rates into actionable valuation data, including precise <strong>tola to gram conversion</strong> metrics specific to the Nepalese standard of 11.6638 grams per tola.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Valuation Mechanics: Jyala, Jarti, and Market Logic</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Making Charges (Jyala):</strong> When purchasing jewelry, the total price exceeds the raw metal value. "Jyala" covers the labor and craftsmanship. This calculator allows you to input these charges as a flat fee or a percentage to see the final "all-in" cost.</li>
              <li><strong className="text-[#188038]">Wastage (Jarti) Considerations:</strong> Traditional Nepalese jewelry making often involves "Jarti" (gold lost during the soldering and shaping process). While not explicitly listed as a separate field, you should include any wastage weight in your "Total Weight" or factor its cost into the "Making Charges" percentage for an accurate buy-back or purchase simulation.</li>
              <li><strong className="text-[#D93025]">The Lal Measurement:</strong> Small quantities of gold are measured in "Lal" (1/100th of a Tola). Our engine supports granular Lal-based calculations, which is critical for verifying the weight of smaller ornaments like rings or nose pins against official receipts.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select weight unit (Tola/Lal or Grams).", "Enter the gold or silver weight.", "Enter making charges (Jarti/Jyala) as a flat Rs. amount or percentage.", "View the total estimated valuation including current live rates."] }}
      formula={{ title: "Jewelry Valuation", description: "Standard valuation calculation using current live Nepal market rate.", raw: "Base Value = (Weight in Tola) × (Live Rate per Tola)\nMaking Charge = Fixed or (% of Base Value)\nTotal Value = Base Value + Making Charge" }}
      faqs={[
        { question: "What is the weight of 1 Tola in Nepal?", answer: "1 Tola equals exactly 11.6638 grams in Nepal's standard measurement. 1 Tola consists of 100 Lal (each Lal = 0.116638 grams). This Tola measurement is unique to the South Asian gold market and differs from the British-era Tola (11.66 grams used in India)." },
        { question: "What is the difference between Hallmark and Tejabi gold?", answer: "Hallmark (Chhapawal) gold is 24 Karat — 99.9% pure gold. Tejabi gold is 22 Karat — approximately 91.6% pure gold, with the remaining 8.4% being other metals for durability. Tejabi is commonly used in traditional Nepali jewelry. Tejabi gold is priced at roughly 91.6% of the Hallmark rate." },
        { question: "How does FENEGOSIDA set the daily gold rate in Nepal?", answer: "FENEGOSIDA (Federation of Nepal Gold and Silver Dealers' Association) sets the benchmark buying and selling rates for gold and silver each morning based on international LBMA (London Bullion Market Association) spot prices, converted to NPR at the prevailing USD/NPR exchange rate, then adjusted for import duty and local market conditions." },
        { question: "What are 'making charges' (Jyala) in gold jewelry?", answer: "Making charges (locally called 'Jyala') are the fees charged by jewelers for the labor and craftsmanship involved in converting raw gold into jewelry. They are charged either as a flat fee (Rs. per tola) or as a percentage of the gold value. Jyala varies significantly between jewelers — 5–15% is common in Nepal. Always negotiate and get a receipt showing separate gold weight, rate, and making charges." },
        { question: "Is it a good time to buy gold in Nepal?", answer: "Gold is primarily a store of value and hedge against inflation, not a short-term investment. In Nepal, gold prices track international markets and the USD/NPR rate. Buying during global market dips (often during USD strength or low geopolitical risk periods) typically offers better value. Avoid major festivals (Dashain/Tihar) when local demand spikes prices." },
        { question: "How much gold can I bring into Nepal from abroad?", answer: "As per Nepal Customs regulations, travelers can bring up to 50 grams (approximately 4.28 tolas) of gold jewelry duty-free when arriving by air. Any gold above this limit is subject to customs duty. Bringing gold bars or coins has stricter regulations — always declare at customs to avoid confiscation." }
      ]}
      sidebar={{ title: "Market Rates", links: [{ label: "Nepal Silver Rate", href: "/calculator/gold-converter" }, { label: "Currency Converter", href: "/calculator/currency-converter" }], banner: { title: "Live Market Sync", description: "Our calculators use live FENEGOSIDA gold and silver rates updated daily.", image: "/images/gold-banner.jpg" } }}
      relatedTools={[{ label: "Currency Converter", href: "/calculator/currency-converter" }, { label: "SIP Calculator", href: "/calculator/sip-calculator" }, { label: "FD Calculator", href: "/calculator/fd-calculator" }]}
    />
  );
}
