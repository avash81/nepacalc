'use client';

import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { Zap, Info, Receipt, UtilityPole } from 'lucide-react';

const NEA_DOMESTIC_SLABS = [
  { upTo: 20, rate: 0.00, fixed5A: 30, fixed15A: 50, fixed30A: 75, label: '0-20 Units' },
  { upTo: 30, rate: 6.50, fixed5A: 50, fixed15A: 75, fixed30A: 100, label: '21-30 Units' },
  { upTo: 50, rate: 8.00, fixed5A: 75, fixed15A: 100, fixed30A: 125, label: '31-50 Units' },
  { upTo: 150, rate: 9.50, fixed5A: 100, fixed15A: 125, fixed30A: 150, label: '51-150 Units' },
  { upTo: 250, rate: 10.50, fixed5A: 125, fixed15A: 150, fixed30A: 175, label: '151-250 Units' },
  { upTo: 400, rate: 11.50, fixed5A: 150, fixed15A: 175, fixed30A: 200, label: '251-400 Units' },
  { upTo: null, rate: 12.00, fixed5A: 175, fixed15A: 200, fixed30A: 225, label: 'Above 400 Units' }
];

export default function NEABillCalculator() {
  const [state, setState] = useSyncState('nea_bill_v1', {
    units: 150,
    connectionAmps: '5A' as '5A' | '15A' | '30A',
  });

  const { units, connectionAmps } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    let remaining = units;
    let energyCharge = 0;
    const breakdown = [];
    let prevLimit = 0;
    let currentFixed = 0;

    for (const slab of NEA_DOMESTIC_SLABS) {
      const limit = slab.upTo === null ? Infinity : slab.upTo;
      const slabRange = limit - prevLimit;
      const consumedInSlab = Math.max(0, Math.min(remaining, slabRange));

      // Calculate fixed charge based on the highest slab reached
      if (units > prevLimit) {
        currentFixed = slab[`fixed${connectionAmps}` as keyof typeof slab] as number;
      }

      if (consumedInSlab > 0) {
        const slabTax = consumedInSlab * (slab.rate as number);
        energyCharge += slabTax;
        
        breakdown.push({
          label: slab.label,
          units: consumedInSlab,
          rate: slab.rate,
          amount: slabTax
        });
        remaining -= consumedInSlab;
      }
      prevLimit = limit;
      if (remaining <= 0) break;
    }

    const subtotal = energyCharge + currentFixed;
    const vatAmount = subtotal * 0.13;
    const finalTotal = subtotal + vatAmount;

    return { energyCharge, currentFixed, vatAmount, finalTotal, breakdown };
  }, [units, connectionAmps]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <CalculatorLayout
      title="NEA Electricity Bill Calculator"
      description="Professional slab-based bill estimation for Nepal Electricity Authority (NEA) domestic consumers. Updated for latest 2081/82 tariff schedules."
      category={{ label: 'Nepal Tools', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput 
                label="Total Units Consumed" 
                value={units} 
                onChange={v => update({ units: v })} 
                suffix="Units"
                hint="Units = Current - Previous reading"
              />
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Connection Capacity</label>
                 <div className="flex p-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-xl">
                    {(['5A', '15A', '30A'] as const).map(amp => (
                       <button 
                         key={amp} 
                         onClick={() => update({ connectionAmps: amp })}
                        className={`flex-1 py-2 text-[10px] font-black uppercase transition-all rounded-lg ${connectionAmps === amp ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                       >
                         {amp}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="pt-6 border-t border-[var(--border)] space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Receipt className="w-4 h-4 text-blue-600" />
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Progressive Slab Breakdown</h3>
              </div>
              <div className="space-y-4">
                 {result.breakdown.map((b, i) => (
                    <div key={i} className="space-y-1.5">
                       <div className="flex justify-between items-center text-[11px] font-bold">
                          <span className="text-slate-600 font-mono italic">{b.label} <span className="text-[9px] opacity-60">(@ Rs. {b.rate})</span></span>
                          <span className="text-slate-900">Rs. {fmt(b.amount)}</span>
                       </div>
                       <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-1000" 
                            style={{ width: `${(b.amount / (result.energyCharge || 1)) * 100}%` }} 
                          />
                       </div>
                    </div>
                 ))}
                 <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-[11px] font-black uppercase">
                    <span className="text-slate-400">Total Energy Charge</span>
                    <span className="text-blue-700">Rs. {fmt(result.energyCharge)}</span>
                 </div>
              </div>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Estimated Total Bill" 
            value={fmt(result.finalTotal)} 
            unit=" Rs." 
            color="blue" 
            title="Monthly Invoice"
            copyValue={`Total Units: ${units}, Total Bill: Rs. ${result.finalTotal}`}
          />

          <div className="bg-white border border-[var(--border)] divide-y divide-[var(--border)]">
             <div className="p-4 flex justify-between items-center bg-slate-50 border-b border-[var(--border)]">
                <span className="text-[10px] font-black uppercase text-[var(--text-main)] font-mono">Bill Summary</span>
                <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 uppercase rounded">Institutional Rate</span>
             </div>
             <div className="p-4 flex justify-between text-[11px] font-bold">
                <span className="text-slate-600">Fixed/Service Charge</span>
                <span className="text-slate-900">Rs. {fmt(result.currentFixed)}</span>
             </div>
             <div className="p-4 flex justify-between text-[11px] font-bold">
                <span className="text-slate-600">Energy Charge</span>
                <span className="text-slate-900">Rs. {fmt(result.energyCharge)}</span>
             </div>
             <div className="p-4 flex justify-between text-[11px] font-bold">
                <span className="text-slate-600">VAT (13%)</span>
                <span className="text-primary font-black">+ Rs. {fmt(result.vatAmount)}</span>
             </div>
             <div className="p-4 flex justify-between bg-blue-50/20">
                <span className="text-[11px] font-black uppercase text-blue-900">Payable Amount</span>
                <span className="text-xl font-black text-blue-700 font-mono">Rs. {fmt(result.finalTotal)}</span>
             </div>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
             <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
             <p className="text-[11px] text-amber-800 font-medium leading-relaxed italic">
                Note: The <strong>0-20 unit slab</strong> has a Rs. 0 energy charge but requires a mandatory minimum service charge (Rs. 30-75) depending on your connection capacity.
             </p>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="tracking-tighter font-black text-slate-900 mb-8">Mastering Your NEA Electricity Bill</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">Connection Capacity (Amps)</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed">Your fixed monthly charge is determined by the size of your connection. Most residential houses use **5A or 15A**. Larger homes with multiple ACs or water heaters typically use **30A**. The higher the Ampere, the higher the minimum service charge.</p>
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">How Slabs Work</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed">NEA uses a "Marginal Pricing" system. If you consume 150 units, you don't pay one single rate. Your first 20 units are free (exclusive of fixed charge), and the remaining units are taxed in increasing layers. This system is designed to reward energy conservation.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
