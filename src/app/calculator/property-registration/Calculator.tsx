'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Map, Landmark, Users, Info, Scale, ShieldCheck, Activity, Receipt } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalPropertyRegistration } from '@/utils/math/country-rules/nepal';

const LOCATIONS = [
  { id: 'metropolitan',     name: 'Metropolitan (Mahanagarpalika)', rate: '5%' },
  { id: 'sub-metropolitan', name: 'Sub-Metro (Upamahanagar)',       rate: '4.5%' },
  { id: 'municipality',     name: 'Municipality (Nagarpalika)',      rate: '4%' },
  { id: 'rural',            name: 'Rural (Gaunpalika)',              rate: '2%' },
];

export default function PropertyRegistration() {
  const [state, setState] = useSyncState('prop_reg_v2', {
    price: 5000000,
    location: 'metropolitan' as 'metropolitan' | 'sub-metropolitan' | 'municipality' | 'rural',
    buyerGender: 'male' as 'male' | 'female' | 'joint',
  });
  const { price, location, buyerGender } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => calculateNepalPropertyRegistration(price, location, buyerGender), [price, location, buyerGender]);
  const fmt = (n: number) => 'Rs. ' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <ModernCalcLayout
      slug="property-registration"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Property Registration' }]}
      title="Property Registration Fee 2083/84"
      description="Calculate Malpok registry fees and stamp duty for land/house transactions in Nepal. Includes female ownership discounts and all municipal tier rates."
      icon={Map}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Registry Price (Lalpurja Amount)</label>
               <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => update({ price: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
               />
               <p className="text-[9px] text-[#5F6368] uppercase font-bold tracking-wider mt-1">Price declared for government taxation</p>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Property Location Category</label>
               <div className="grid grid-cols-1 gap-2">
                  {LOCATIONS.map(l => (
                    <button 
                      key={l.id} 
                      onClick={() => update({ location: l.id as any })}
                      className={`h-11 px-4 rounded-md border flex items-center justify-between transition-all ${location === l.id ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                    >
                      <span className={`text-[11px] font-black uppercase ${location === l.id ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{l.name}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${location === l.id ? 'bg-[#1A73E8] text-white' : 'bg-[#F8F9FA] text-[#5F6368] border border-[#DADCE0]'}`}>{l.rate}</span>
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Buyer Type (Exemptions)</label>
               <div className="grid grid-cols-3 gap-2">
                {[['male','Male'],['female','Female'],['joint','Joint (H/W)']] .map(([id, label]) => (
                  <button 
                    key={id} 
                    onClick={() => update({ buyerGender: id as any })} 
                    className={`h-10 rounded-md border text-[11px] font-black uppercase transition-all ${buyerGender === id ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    {label}
                  </button>
                ))}
               </div>
            </div>

            {buyerGender === 'female' && (
               <div className="p-4 bg-[#E6F4EA] border border-[#188038] rounded-md flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0" />
                  <p className="text-[10px] text-[#188038] font-bold leading-relaxed uppercase">
                     Rebate Applied: {location === 'rural' ? '30%' : '25%'} Female Ownership Rebate applied automatically.
                  </p>
               </div>
            )}
            
            {buyerGender === 'joint' && (
               <div className="p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-md flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
                  <p className="text-[10px] text-[#1A73E8] font-bold leading-relaxed uppercase">
                     Rebate Applied: Nominal Fee of Rs. 100 for Joint husband/wife registration.
                  </p>
               </div>
            )}
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Malpok Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Registration Fee</div>
             <div className="text-5xl font-black text-[#1A73E8] tracking-tight">{fmt(result.finalFee)}</div>
             <div className="flex justify-center mt-2">
                <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0] shadow-sm">
                   Payable at Malpok Office
                </span>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-lg overflow-hidden bg-white">
             <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-[#202124]">Malpok Ledger</span>
                <span className="text-[9px] font-bold text-[#5F6368] uppercase">{LOCATIONS.find(l => l.id === location)?.name}</span>
             </div>
             <div className="divide-y divide-[#F1F3F4] p-2">
                <div className="p-3 flex justify-between items-center rounded hover:bg-[#F8F9FA] transition-colors">
                   <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Fee ({result.ratePercent}%)</span>
                   <span className="text-sm font-black text-[#202124]">{fmt(result.baseFee)}</span>
                </div>
                {result.discount > 0 && (
                  <div className="p-3 flex justify-between items-center rounded hover:bg-[#F8F9FA] transition-colors">
                     <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Exemption/Rebate</span>
                     <span className="text-sm font-black text-[#188038]">− {fmt(result.discount)}</span>
                  </div>
                )}
                <div className="p-3 flex justify-between items-center rounded bg-[#E8F0FE] border border-[#1A73E8]">
                   <span className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider">Final Payable</span>
                   <span className="text-lg font-black text-[#1A73E8]">{fmt(result.finalFee)}</span>
                </div>
             </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex justify-between items-center">
             <div className="text-[10px] font-bold text-[#5F6368] uppercase">Effective Tax Rate</div>
             <div className="text-[11px] font-black text-[#D93025]">{((result.finalFee / price) * 100).toFixed(2)}%</div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Landmark className="w-24 h-24 text-[#1A73E8]" /></div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Malpok Fee Analytics</h3>
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed relative z-10 mb-6">
                  Transferring real estate ownership in Nepal requires exact calculation of government levies before executing the Lalpurja transfer. Our engine parses the latest provincial budget directives, applying the exact municipal tax tiers (2% to 5%) based on the official asset classification.
                </p>
                <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-center">
                   <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-1">Valuation Rule</div>
                   <p className="text-[11px] font-bold text-[#5F6368]">Fee is calculated on Minimum Gov Valuation or Declared Price (whichever is higher).</p>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Mathematical Rebates</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#E6F4EA] border border-[#188038] flex flex-col gap-2">
                     <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#188038]" />
                        <span className="text-[10px] font-black text-[#188038] uppercase">Female Exemption</span>
                     </div>
                     <p className="text-[10px] font-bold text-[#188038]">
                        Reduces the gross registry fee by exactly 25% for urban zones and 30% for rural Gaunpalika sectors when the buyer is female.
                     </p>
                  </div>
                  <div className="p-4 rounded-md bg-[#E8F0FE] border border-[#1A73E8] flex flex-col gap-2">
                     <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#1A73E8]" />
                        <span className="text-[10px] font-black text-[#1A73E8] uppercase">Joint Registration</span>
                     </div>
                     <p className="text-[10px] font-bold text-[#1A73E8]">
                        Overrides the percentage-based formula with a nominal flat fee of NPR 100 for Joint (Husband/Wife) registrations.
                     </p>
                  </div>
               </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter the declared property price from the Lalpurja or the government minimum valuation (whichever is higher).",
          "Select the location category of the property (Mahanagarpalika down to Gaunpalika).",
          "Select buyer type to automatically apply female or joint ownership rebates.",
          "Review the final Malpok invoice showing the base fee, discount, and total payable."
        ]
      }}
      formula={{
        title: "Nepal Property Registration Fee",
        description: "Registry fee is a percentage of declared value, with gender-based rebates.",
        raw: "Fee = Base Value × Location Rate - Applicable Discount",
        variables: [
          "Location Rates: Metro (5%), Sub-Metro (4.5%), Municipality (4%), Rural (2%)",
          "Female Rebate: 25% discount in urban, 30% discount in rural",
          "Joint Rebate: Flat NPR 100 regardless of property value"
        ]
      }}
      faqs={[
        { question: "What is the female discount on property registration in Nepal?", answer: "The Nepal government provides a 25% rebate on registration fees for properties registered in a woman's sole name in urban areas, and 30% in rural/Gaunpalika areas. This policy promotes female property ownership." },
        { question: "What documents are needed for property registration at Malpok?", answer: "Original Lalpurja, Citizenship certificates, Tax clearance certificate, Sale deed (Rajinama), Relationship certificate (if joint), Municipality building completion certificate (for house), and Passport-size photos." },
        { question: "What is the difference between stamp duty and registration fee in Nepal?", answer: "In Nepal, the 'registration fee' (malpot) itself serves as the primary transfer tax. There is no separate 'stamp duty' percentage." },
        { question: "What is the declared value (Lalpurja amount) for registration purposes?", answer: "The declared value must be the higher of the actual agreed transaction price OR the government minimum valuation (Sarkari Mool) for that land parcel." },
        { question: "Is joint husband-wife property registration always just Rs. 100?", answer: "Yes, when property is being transferred jointly in both the husband's and wife's names, the registration fee is a flat nominal Rs. 100 to encourage joint ownership." }
      ]}
      sidebar={{
        title: "Real Estate Hub",
        subtitle: "Property Calculators",
        links: [
          { label: "Nepal Land Converter", href: "/calculator/nepal-land/", icon: Map },
          { label: "Home Loan Calc", href: "/calculator/nepal-home-loan/", icon: Landmark },
          { label: "VAT Calculator", href: "/calculator/nepal-vat/", icon: Receipt },
          { label: "Property CGT", href: "/calculator/property-tax/", icon: Activity },
        ],
      }}
      relatedTools={[
        { label: "Nepal Land Converter", href: "/calculator/nepal-land/" },
        { label: "Home Loan", href: "/calculator/nepal-home-loan/" },
        { label: "Property Tax", href: "/calculator/property-tax/" }
      ]}
    />
  );
}

