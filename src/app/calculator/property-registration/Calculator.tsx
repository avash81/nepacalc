'use client';

import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalPropertyRegistration } from '@/utils/math/country-rules/nepal';
import { Map, Landmark, Users, Info, Scale } from 'lucide-react';

const LOCATIONS = [
  { id: 'metropolitan', name: 'Metropolitan (Mahanagarpalika)', rate: '5%' },
  { id: 'sub-metropolitan', name: 'Sub-Metro (Upamahanagar)', rate: '4.5%' },
  { id: 'municipality', name: 'Municipality (Nagarpalika)', rate: '4%' },
  { id: 'rural', name: 'Rural (Gaunpalika)', rate: '2%' }
];

const GENDERS = [
  { id: 'male', name: 'Male Buyer' },
  { id: 'female', name: 'Female Buyer' },
  { id: 'joint', name: 'Joint (Husb/Wife)' }
];

export default function PropertyRegistration() {
  const [state, setState] = useSyncState('prop_reg_v1', {
    price: 5000000,
    location: 'metropolitan' as 'metropolitan' | 'sub-metropolitan' | 'municipality' | 'rural',
    buyerGender: 'male' as 'male' | 'female' | 'joint'
  });

  const { price, location, buyerGender } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    return calculateNepalPropertyRegistration(price, location, buyerGender);
  }, [price, location, buyerGender]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <CalculatorLayout
      title="Property Registration & Stamp Duty"
      description="Calculate Malpok registry fees and stamp duty for land/house transactions in Nepal. Includes provincial female ownership discounts and metropolitan tiers."
      category={{ label: 'Real Estate', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <ValidatedInput 
             label="Registry Price (Lalpurja Amount)" 
             value={price} 
             onChange={v => update({ price: v })} 
             prefix="Rs." 
             hint="Price declared for government taxation"
           />

           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Property Location Category</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {LOCATIONS.map(l => (
                    <button 
                      key={l.id} 
                      onClick={() => update({ location: l.id as any })}
                      className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${location === l.id ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-[var(--border)] hover:border-indigo-100'}`}
                    >
                       <div className="text-xs font-black text-slate-900 mb-1">{l.name}</div>
                       <div className={`text-[10px] font-bold ${location === l.id ? 'text-indigo-600' : 'text-slate-400'}`}>Official Rate: {l.rate}</div>
                       {location === l.id && <div className="absolute top-0 right-0 p-2"><Landmark className="w-3 h-3 text-indigo-400" /></div>}
                    </button>
                 ))}
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Buyer Identification (Discounts Applied)</label>
              <div className="flex p-1 bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border)]">
                 {GENDERS.map(g => (
                    <button 
                      key={g.id} 
                      onClick={() => update({ buyerGender: g.id as any })}
                      className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${buyerGender === g.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                    >
                       {g.name}
                    </button>
                 ))}
              </div>
              {buyerGender === 'female' && (
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex gap-3 animate-in slide-in-from-top-2">
                   <Users className="w-5 h-5 text-indigo-600 shrink-0" />
                   <p className="text-[10px] text-indigo-800 font-bold leading-tight">
                     ✓ {location === 'rural' ? '30%' : '25%'} Female Ownership Rebate Applied. This is a government initiative to encourage property rights for women.
                   </p>
                </div>
              )}
              {buyerGender === 'joint' && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 animate-in slide-in-from-top-2">
                   <Users className="w-5 h-5 text-emerald-600 shrink-0" />
                   <p className="text-[10px] text-emerald-800 font-bold leading-tight">
                     ✓ Rs. 100 Nominal Fee Applied. Provincial law allows joint registration of husband and wife at a minimal flat registry fee to promote shared assets.
                   </p>
                </div>
              )}
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Total Registration Fee" 
            value={fmt(result.finalFee)} 
            unit=" Rs." 
            color="indigo" 
            title="Registry Payee"
            copyValue={`Rs. ${result.finalFee}`}
          />

          <div className="bg-white border border-[var(--border)] rounded-[2rem] overflow-hidden shadow-sm">
             <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Malpok Invoice</div>
                   <div className="text-xl font-black">{LOCATIONS.find(l => l.id === location)?.name}</div>
                </div>
                <Map className="w-8 h-8 text-indigo-500 opacity-50" />
             </div>
             <div className="p-6 divide-y divide-slate-100">
                <div className="py-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-slate-500 uppercase">Gross Registry Fee ({result.ratePercent}%)</span>
                   <span className="text-sm font-black text-slate-900 font-mono">Rs. {fmt(result.baseFee)}</span>
                </div>
                <div className="py-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-indigo-600 uppercase">Exemption / Discount</span>
                   <span className="text-sm font-black text-indigo-600 font-mono">- Rs. {fmt(result.discount)}</span>
                </div>
                <div className="py-5 flex justify-between items-center">
                   <span className="text-[11px] font-black text-slate-900 uppercase">Final Total Payable</span>
                   <span className="text-xl font-black text-indigo-600 font-mono">Rs. {fmt(result.finalFee)}</span>
                </div>
             </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
             <Scale className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-blue-900 uppercase">Lalpurja Note</h5>
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic">
                   "Property registration is a provincial subject. Rates are updated annually during the provincial budget. Always check for local service fees (Bagmati fund, etc.) at the specific Malpok office."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic">Understanding Land Registry in Nepal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2">Government Valuation vs Market Price</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">In Nepal, the tax is calculated based on the "Registry Price" listed on the Lalpurja. The government assigns a minimum valuation for land in every area. If your actual purchase price is higher than the government valuation, you must still pay tax on at least the government minimum.</p>
               </div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2">The Female Ownership Discount</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">To encourage land ownership among women, the government provides a **25% discount** in Municipalities and a **30% discount** in Rural Municipalities. In some special cases, senior citizens or differently-abled individuals may also qualify for similar concessions.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
