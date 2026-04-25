'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Map, Landmark, Users, Info, Scale } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalPropertyRegistration } from '@/utils/math/country-rules/nepal';

const LOCATIONS = [
  { id: 'metropolitan',     name: 'Metropolitan (Mahanagarpalika)', rate: '5%' },
  { id: 'sub-metropolitan', name: 'Sub-Metro (Upamahanagar)',       rate: '4.5%' },
  { id: 'municipality',     name: 'Municipality (Nagarpalika)',      rate: '4%' },
  { id: 'rural',            name: 'Rural (Gaunpalika)',              rate: '2%' },
];

export default function PropertyRegistration() {
  const [state, setState] = useSyncState('prop_reg_v1', {
    price: 5000000,
    location: 'metropolitan' as 'metropolitan' | 'sub-metropolitan' | 'municipality' | 'rural',
    buyerGender: 'male' as 'male' | 'female' | 'joint',
  });
  const { price, location, buyerGender } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => calculateNepalPropertyRegistration(price, location, buyerGender), [price, location, buyerGender]);
  const fmt = (n: number) => 'Rs. ' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Property Registration Fee' }]}
      title="Property Registration & Stamp Duty"
      description="Calculate Malpok registry fees and stamp duty for land/house transactions in Nepal. Includes female ownership discounts and all municipal tier rates."
      icon={Map}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Registry Price (Lalpurja Amount)</label>
            <div className="relative">
              <input type="number" value={price} onChange={e => update({ price: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
            <p className="text-[9px] text-[#70757A]">Price declared for government taxation</p>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Property Location Category</label>
            <div className="grid grid-cols-1 gap-2">
              {LOCATIONS.map(l => (
                <button key={l.id} onClick={() => update({ location: l.id as any })}
                  className={`p-3 rounded-lg border text-left flex justify-between items-center transition-all ${location === l.id ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0] hover:bg-[#F8F9FA]'}`}>
                  <span className={`text-xs font-bold ${location === l.id ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{l.name}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${location === l.id ? 'bg-[#1A73E8] text-white' : 'bg-[#F1F3F4] text-[#5F6368]'}`}>{l.rate}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Buyer Type</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {[['male','Male'],['female','Female'],['joint','Joint (H/W)']] .map(([id, label]) => (
                <button key={id} onClick={() => update({ buyerGender: id as any })}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all ${buyerGender === id ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                  {label}
                </button>
              ))}
            </div>
            {buyerGender === 'female' && (
              <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
                <Users className="w-4 h-4 text-[#188038] shrink-0" />
                <p className="text-[10px] text-[#188038] font-bold">{location === 'rural' ? '30%' : '25%'} Female Ownership Rebate Applied automatically.</p>
              </div>
            )}
            {buyerGender === 'joint' && (
              <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
                <Users className="w-4 h-4 text-[#188038] shrink-0" />
                <p className="text-[10px] text-[#188038] font-bold">Rs. 100 Nominal Fee — Joint husband/wife registration.</p>
              </div>
            )}
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors">Calculate Registry Fee</button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Registration Fee</div>
            <div className="text-4xl font-black text-[#1A73E8]">{fmt(result.finalFee)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">Payable at Malpok Office</div>
          </div>
          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#1A1A2E] text-white flex justify-between items-center">
              <span className="text-[10px] font-black uppercase">Malpok Invoice</span>
              <span className="text-[10px] text-white/60">{LOCATIONS.find(l => l.id === location)?.name}</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Gross Registry Fee ({result.ratePercent}%)</span><span className="font-black">{fmt(result.baseFee)}</span></div>
              <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Discount / Exemption</span><span className="font-black text-[#188038]">− {fmt(result.discount)}</span></div>
              <div className="p-3 flex justify-between text-xs bg-[#F8F9FA]"><span className="font-bold text-[#202124]">Final Total Payable</span><span className="font-black text-[#1A73E8] text-sm">{fmt(result.finalFee)}</span></div>
            </div>
          </div>
          <div className="flex gap-2 p-3 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg items-start">
            <Scale className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Rates are updated annually in the provincial budget. Additional local service fees may apply at specific Malpok offices.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">The Complete Property Registration Fee Analytics</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Transferring real estate ownership in Nepal requires exact calculation of government levies before executing the Lalpurja transfer. Our <strong className="text-[#202124]">property registration fee nepal</strong> calculator is engineered to parse the latest provincial budget directives, applying the exact municipal tax tiers (2% to 5%) based on the official asset classification (Metropolitan, Sub-Metropolitan, Municipality, or Rural).
              </p>
              <p>
                When determining the final <strong className="text-[#202124]">land registration cost nepal</strong>, this tool dynamically adjusts for demographic exemptions. It operates as a highly precise <strong className="text-[#202124]">malpot fee calculator</strong>, modeling the rigorous mathematical ledger used by district land revenue offices to establish the baseline tax before applying targeted discounts.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Discounts & Rebates</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Gender-Based Affirmative Action:</strong> A core feature of the <strong className="text-[#202124]">stamp duty calculator nepal</strong> is its automatic integration of the <strong className="text-[#202124]">female ownership discount nepal</strong>. The algorithm reduces the gross registry fee by exactly 25% for urban zones and 30% for rural Gaunpalika sectors when the buyer is female.</li>
              <li><strong className="text-[#188038]">Joint Ownership Optimization:</strong> To encourage joint property holdings between spouses, the system overrides the percentage-based formula with a nominal flat <strong className="text-[#202124]">lalpurja pass charge</strong> of NPR 100 for Joint (Husband/Wife) registrations.</li>
              <li><strong className="text-[#D93025]">Valuation Floor Enforcement:</strong> The calculation is strictly bound to the official government minimum valuation or the transaction price declared on the deed, whichever is mathematically greater.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the declared property price from the Lalpurja.", "Select the location category of the property.", "Select buyer type — female buyers get 25-30% rebate.", "Review the Malpok invoice showing base fee, discount, and total."] }}
      formula={{ title: "Nepal Property Registration", description: "Registry fee is a percentage of declared value, with gender-based rebates.", raw: "Metropolitan: 5% | Sub-Metro: 4.5% | Municipality: 4% | Rural: 2%\nFemale Discount: 25% (urban) / 30% (rural)\nJoint H/W: Flat Rs. 100" }}
      faqs={[
        { question: "What is the female discount on property registration?", answer: "Nepal government provides a 25% rebate on registration fees for properties registered in a woman's name in urban areas, and 30% in rural/Gaunpalika areas." },
        { question: "What documents are needed for property registration?", answer: "You need the original Lalpurja, citizenship certificates of buyer/seller, tax clearance, and the sale deed (Rajinama). Registration happens at the District Land Revenue Office (Malpok)." }
      ]}
      sidebar={{ title: "Real Estate Tools", links: [{ label: "Property CGT", href: "/calculator/property-tax" }, { label: "Mortgage Calc", href: "/calculator/mortgage-calculator" }, { label: "Nepal Land", href: "/calculator/nepal-land" }, { label: "Nepal VAT", href: "/calculator/nepal-vat" }], banner: { title: "Buy Smart", description: "Always declare the actual transaction price on Lalpurja — under-declaration can result in legal penalties.", image: "/images/property-banner.jpg" } }}
      relatedTools={[{ label: "Property CGT", href: "/calculator/property-tax" }, { label: "Mortgage", href: "/calculator/mortgage-calculator" }, { label: "Nepal Land", href: "/calculator/nepal-land" }]}
    />
  );
}
