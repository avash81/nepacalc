'use client';

import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateKUKLBill } from '@/utils/math/country-rules/nepal';
import { Droplets, Waves, Receipt, Info, MapPin } from 'lucide-react';

export default function KUKLCalculator() {
  const [state, setState] = useSyncState('kukl_v1', {
    units: 15,
    pipeSize: '0.5' as '0.5' | '0.75'
  });

  const { units, pipeSize } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    return calculateKUKLBill(units, pipeSize);
  }, [units, pipeSize]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <CalculatorLayout
      title="KUKL Water Bill Analyzer"
      description="Estimate your monthly water bill from Kathmandu Upatyaka Khanepani Limited (KUKL). Calculate slab-based charges and the mandatory 50% sewerage tax."
      category={{ label: 'Utility', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput 
                label="Total Consumption" 
                value={units} 
                onChange={v => update({ units: v })} 
                suffix="Units"
                hint="1 Unit = 1,000 Liters"
              />
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Pipe Connection Size</label>
                 <div className="flex p-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-xl">
                    {(['0.5', '0.75'] as const).map(size => (
                       <button 
                         key={size} 
                         onClick={() => update({ pipeSize: size })}
                         className={`flex-1 py-2 text-[10px] font-black uppercase transition-all rounded-lg ${pipeSize === size ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                       >
                         {size}" Inch
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-blue-600" />
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Kathmandu Valley Logic</h3>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                KUKL billing in Kathmandu is based on the meter reading. The minimum monthly charge covers up to <strong>10,000 Liters (10 Units)</strong>. Any consumption above this is charged at a progressive volumetric rate.
              </p>
           </div>

           <div className="pt-6 border-t border-[var(--border)] space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Waves className="w-4 h-4 text-blue-500" />
                 <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Sewerage & Sanitation Tax</h4>
              </div>
              <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4 animate-in fade-in zoom-in-95">
                 <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-blue-800 font-bold leading-relaxed">
                   Note: A standard <strong>50% Sewerage Charge</strong> is added automatically to your total water consumption amount. This covers city-wide drainage and waste management services.
                 </p>
              </div>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Estimated Total Bill" 
            value={fmt(result.totalBill)} 
            unit=" Rs." 
            color="blue" 
            title="Monthly Invoice"
            copyValue={`Rs. ${result.totalBill}`}
          />

          <div className="bg-white border border-[var(--border)] rounded-[2rem] overflow-hidden shadow-sm">
             <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">KUKL Invoice</div>
                   <div className="text-xl font-black">{units} Units ({units * 1000}L)</div>
                </div>
                <Droplets className="w-8 h-8 text-blue-300 opacity-50" />
             </div>
             <div className="p-6 divide-y divide-slate-100">
                <div className="py-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-slate-500 uppercase">Water Consumption Charge</span>
                   <span className="text-sm font-black text-slate-900 font-mono">Rs. {fmt(result.waterCharge)}</span>
                </div>
                <div className="py-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-blue-500 uppercase italic">Sewerage Tax (50%)</span>
                   <span className="text-sm font-black text-blue-600 font-mono italic">+ Rs. {fmt(result.sewerageTax)}</span>
                </div>
                <div className="py-5 flex justify-between items-center border-t-2 border-slate-900/5">
                   <span className="text-[11px] font-black text-slate-900 uppercase">Final Total Bill</span>
                   <span className="text-xl font-black text-blue-600 font-mono">Rs. {fmt(result.totalBill)}</span>
                </div>
             </div>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
             <Receipt className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Billing Logic</h5>
                <p className="text-[11px] text-amber-700 font-medium leading-relaxed italic">
                   "Minimum charge = Rs. 100 (for 10 units/10k Liters). Every unit exceeded is charged at approximately Rs. 32-35 depending on latest WTFC notifications."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter">Water Utility Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-600 mb-2">Reading the Meter</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">To calculate your usage, subtract the "Previous Reading" from the "Current Reading" shown on your water meter. Each 1 unit on the meter represents 1,000 liters. KUKL meter readers usually visit once every two months, but your bill is calculated monthly based on the average.</p>
               </div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-600 mb-2">Sewerage Calculations</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">The sewerage charge is a service fee for the maintenance of drainage systems in the city. It is strictly tied to your water usage (50% of the water charge). This means the more water you use, the higher your sewerage bill will be.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
