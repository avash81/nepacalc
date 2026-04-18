'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { Bike, Car, Receipt, ShieldCheck, MapPin, Info } from 'lucide-react';

const BIKE_RATES = [
  { min: 0, max: 125, tax: 3000, label: 'Up to 125cc' },
  { min: 126, max: 150, tax: 5000, label: '126cc - 150cc' },
  { min: 151, max: 225, tax: 6500, label: '151cc - 225cc' },
  { min: 226, max: 400, tax: 11000, label: '226cc - 400cc' },
  { min: 401, max: 650, tax: 22000, label: '401cc - 650cc' },
  { min: 651, max: 9999, tax: 35000, label: 'Above 650cc' },
];

const CAR_RATES = [
  { min: 0, max: 1000, tax: 22000, label: 'Up to 1000cc' },
  { min: 1001, max: 1500, tax: 25000, label: '1001cc - 1500cc' },
  { min: 1501, max: 2000, tax: 27000, label: '1501cc - 2000cc' },
  { min: 2001, max: 2500, tax: 37000, label: '2001cc - 2500cc' },
  { min: 2501, max: 2900, tax: 50000, label: '2501cc - 2900cc' },
  { min: 2901, max: 9999, tax: 65000, label: 'Above 2901cc' },
];

export default function VehicleTaxCalculator() {
  const [state, setState] = useSyncState('veh_tax_v2', {
    type: 'bike' as 'bike' | 'car',
    cc: 150,
  });

  const { type, cc } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const rates = type === 'bike' ? BIKE_RATES : CAR_RATES;
    const rate = rates.find(r => cc >= r.min && cc <= r.max) || rates[0];
    const renewalFee = type === 'bike' ? 300 : 500;
    
    return {
      tax: rate.tax,
      renewalFee,
      total: rate.tax + renewalFee,
      label: rate.label
    };
  }, [type, cc]);

  const fmt = (n: number) => n.toLocaleString('en-IN');

  return (
    <CalculatorLayout
      title="Vehicle Tax (Bluebook) Console"
      description="Calculate your annual road tax for Bagmati Pradesh (FY 2081/82). Accurate tiers for motorcycles, scooters, and private cars based on engine capacity (CC)."
      category={{ label: 'Utility', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Select Vehicle Category</label>
              <div className="flex p-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-2xl">
                 <button 
                   onClick={() => update({ type: 'bike', cc: 150 })}
                   className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl transition-all ${type === 'bike' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                 >
                    <Bike className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-tight">Two-Wheeler</span>
                 </button>
                 <button 
                   onClick={() => update({ type: 'car', cc: 1200 })}
                   className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl transition-all ${type === 'car' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                 >
                    <Car className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-tight">Four-Wheeler</span>
                 </button>
              </div>
           </div>

           <ValidatedInput 
             label={`Engine Capacity (CC)`} 
             value={cc} 
             onChange={v => update({ cc: v })} 
             suffix="CC"
             min={0}
             hint="Check your Bluebook for the displacement (CC) value."
           />

           <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <h3 className="text-[10px] font-black uppercase tracking-widest">Bagmati Pradesh Rules</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                "Vehicle tax in Nepal is determined at the provincial level. Bagmati rates are the standard for Kathmandu Valley residents. Rates for Madhesh or Koshi may vary slightly."
              </p>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Total Amount Payable" 
            value={fmt(result.total)} 
            unit=" Rs." 
            color="indigo" 
            title="Standard Renewal"
            copyValue={`Total Bluebook Tax for ${cc}cc is Rs. ${result.total}`}
          />

          <div className="bg-white border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm italic">
             <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Payment Breakdown</div>
                   <div className="text-xl font-black">{result.label}</div>
                </div>
                <Receipt className="w-8 h-8 text-white opacity-40" />
             </div>
             <div className="p-6 divide-y divide-slate-100 italic">
                <div className="py-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-slate-500 uppercase">Annual Road Tax</span>
                   <span className="text-sm font-black text-slate-900 font-mono">Rs. {fmt(result.tax)}</span>
                </div>
                <div className="py-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-slate-500 uppercase">Service/Renewal Fee</span>
                   <span className="text-sm font-black text-slate-900 font-mono">Rs. {fmt(result.renewalFee)}</span>
                </div>
                <div className="py-5 flex justify-between items-center bg-slate-50 -mx-6 px-6">
                   <span className="text-[11px] font-black text-slate-900 uppercase">Grand Total</span>
                   <span className="text-xl font-black text-indigo-600 font-mono">Rs. {fmt(result.total)}</span>
                </div>
             </div>
          </div>

          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3">
             <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">Digital Ready</h5>
                <p className="text-[11px] text-emerald-700 font-medium leading-relaxed italic">
                   "You can pay these amounts directly via eSewa, Khalti, or the Nagarik App once the Transport Office portal updates your status."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter">Bluebook Renewal Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                     <Info className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2">Penalties for Delay</h4>
                    <p className="text-[12px] text-slate-600 leading-relaxed font-medium">In Nepal, you must renew your vehicle tax within 90 days of the fiscal year start or the last renewal date. Failing to do so attracts a penalty starting from 5% up to 32% depending on the duration of delay.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                     <Info className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2">Third-Party Insurance</h4>
                    <p className="text-[12px] text-slate-600 leading-relaxed font-medium">Before you can pay your road tax, you **must** have valid third-party insurance. Most insurance premiums for 150cc bikes are around NPR 2,100 to 2,500. Ensure your insurance is updated first.</p>
                  </div>
               </div>
            </div>
         </div>
      }
    />
  );
}
