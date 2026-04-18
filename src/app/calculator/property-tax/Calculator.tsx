'use client';

import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { Home, Gavel, FileCheck, Info } from 'lucide-react';

export default function PropertyTaxCalculator() {
  const [state, setState] = useSyncState('property_tax_v1', {
    sellingPrice: 5000000,
    costPrice: 3500000,
    expenses: 100000,
    holdingPeriod: 'moreThanFive' as 'moreThanFive' | 'lessThanFive',
  });

  const { sellingPrice, costPrice, expenses, holdingPeriod } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const profit = sellingPrice - costPrice - expenses;
    
    // Exemption rules
    if (sellingPrice < 1000000) {
      return { profit: Math.max(0, profit), taxRate: 0, taxAmount: 0, exempt: true };
    }

    if (profit <= 0) {
      return { profit: 0, taxRate: 0, taxAmount: 0, exempt: false };
    }

    const taxRate = holdingPeriod === 'moreThanFive' ? 0.05 : 0.075;
    const taxAmount = profit * taxRate;

    return { profit, taxRate, taxAmount, exempt: false };
  }, [sellingPrice, costPrice, expenses, holdingPeriod]);

  const fmt = (n: number) => n.toLocaleString('en-IN');

  return (
    <CalculatorLayout
      title="Property Capital Gains Tax (CGT)"
      description="Professional real estate tax calculator for Nepal. Calculate 5% or 7.5% CGT based on holding period and the 2081 Budget fiscal mandates."
      category={{ label: 'Nepal Sanchar', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <ValidatedInput 
                   label="Selling Price (NPR)" 
                   value={sellingPrice} 
                   onChange={v => update({ sellingPrice: v })} 
                   prefix="Rs." 
                   hint="The final registry price"
                 />
                 <ValidatedInput 
                   label="Original Purchase Price" 
                   value={costPrice} 
                   onChange={v => update({ costPrice: v })} 
                   prefix="Rs." 
                   hint="Price on your Lalpurja"
                 />
              </div>
              <ValidatedInput 
                label="Deductible Expenses" 
                value={expenses} 
                onChange={v => update({ expenses: v })} 
                prefix="Rs." 
                hint="Taxes, registry fees, improvements"
              />
           </div>

           <div className="pt-6 border-t border-[var(--border)]">
              <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest mb-4 block">How long was the property held?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { id: 'moreThanFive', label: 'More than 5 Years', rate: '5.0%', desc: 'Long-term investment' },
                   { id: 'lessThanFive', label: 'Less than 5 Years', rate: '7.5%', desc: 'Short-term / Speculative' }
                 ].map(m => (
                    <button 
                      key={m.id}
                      onClick={() => update({ holdingPeriod: m.id as any })}
                      className={`p-5 rounded-2xl border text-left transition-all group ${holdingPeriod === m.id ? 'border-primary bg-blue-50/50 shadow-md' : 'border-[var(--border)] hover:border-blue-200 bg-white'}`}
                    >
                       <div className="flex justify-between items-start mb-1">
                          <span className={`text-xs font-black uppercase tracking-wider ${holdingPeriod === m.id ? 'text-primary' : 'text-slate-900'}`}>{m.label}</span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded ${holdingPeriod === m.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>{m.rate} Tax</span>
                       </div>
                       <p className="text-[10px] font-medium text-slate-500">{m.desc}</p>
                    </button>
                 ))}
              </div>
           </div>

           {result.exempt && (
              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 animate-in zoom-in-95">
                 <FileCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
                   <strong>Exemption Applied:</strong> Since the selling price is below <strong>NPR 1,000,000</strong>, this transaction is exempt from Capital Gains Tax under current Nepal law.
                 </p>
              </div>
           )}
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Estimated CGT Amount" 
            value={fmt(result.taxAmount)} 
            unit=" Rs." 
            color="red" 
            title="Registry Tax"
            copyValue={`Gain: ${result.profit}, Tax Payable: Rs. ${result.taxAmount}`}
          />

          <div className="bg-white border border-[var(--border)] divide-y divide-[var(--border)]">
             <div className="p-4 flex justify-between items-center bg-slate-50 border-b border-[var(--border)]">
                <span className="text-[10px] font-black uppercase text-[var(--text-main)]">Calculated Gain Logic</span>
                <Gavel className="w-4 h-4 text-rose-600" />
             </div>
             <div className="p-4 flex justify-between text-[11px] font-bold">
                <span className="text-slate-600">Taxable Profit (Gain)</span>
                <span className="text-slate-900">Rs. {fmt(result.profit)}</span>
             </div>
             <div className="p-4 flex justify-between text-[11px] font-bold">
                <span className="text-slate-600">Applicable Tax Rate</span>
                <span className="text-rose-600">{(result.taxRate * 100).toFixed(1)}%</span>
             </div>
             <div className="p-4 flex justify-between bg-rose-50/20">
                <span className="text-[11px] font-black uppercase text-rose-900">Final CGT Payable</span>
                <span className="text-xl font-black text-rose-600 font-mono">Rs. {fmt(result.taxAmount)}</span>
             </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4">
             <Home className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
             <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic">
                Property transactions in Nepal must be registered with the **Malpok (Land Revenue Office)**. CGT is calculated based on the gain, not the total selling price.
             </p>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none w-full">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-8">Understanding Nepal Property CGT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-rose-600 mb-2">Cost Price Calculation</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed">When calculating profit, you are allowed to subtract the "Cost Price" (original price on your deed) and all documented expenses such as registration fees, brokerage (if invoiced), and structural improvement costs from the selling price.</p>
               </div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-rose-600 mb-2">Holding Period Rule</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed">Tax rates depend on how long you owned the property. If you sell within **5 years** of purchase, it is considered short-term and taxed at **7.5%**. Holding beyond 5 years qualifies as long-term, reducing the rate to **5.0%**.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
