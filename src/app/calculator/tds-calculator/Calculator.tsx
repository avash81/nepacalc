'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { ShieldCheck, Receipt, Scale, Info, Landmark } from 'lucide-react';

const TDS_SLABS = [
  { id: 'rent', name: 'House Rent (Commercial)', rate: 10, hint: '10% on house/office rent' },
  { id: 'interest-ind', name: 'Bank Interest (Indiv)', rate: 6, hint: '6% on individual bank deposits' },
  { id: 'service-vat', name: 'Service (VAT Reg)', rate: 1.5, hint: '1.5% for VAT registered providers' },
  { id: 'service-non-vat', name: 'Service (Non-VAT)', rate: 15, hint: '15% for non-VAT providers' },
  { id: 'contract', name: 'Contract (>50k)', rate: 1.5, hint: '1.5% on contract payments' },
  { id: 'commission', name: 'Commission', rate: 15, hint: '15% on agency commission' },
];

export default function TDSCalculator() {
  const [state, setState] = useSyncState('tds_v2', {
    amount: 100000,
    slabId: 'rent'
  });

  const { amount, slabId } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const activeSlab = TDS_SLABS.find(s => s.id === slabId) || TDS_SLABS[0];

  const result = useMemo(() => {
    const tdsAmount = (amount * activeSlab.rate) / 100;
    const netAmount = amount - tdsAmount;
    return { tdsAmount, netAmount };
  }, [amount, activeSlab]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <CalculatorLayout
      title="TDS (Withholding Tax) Laboratory"
      description="Calculate Tax Deducted at Source (TDS) based on Nepal IRD 2081/82 standards. Essential for businesses, landlords, and service providers."
      category={{ label: 'Audit & Tax', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <ValidatedInput 
             label="Gross Payment Amount" 
             value={amount} 
             onChange={v => update({ amount: v })} 
             prefix="Rs." 
             hint="Amount before tax deduction"
           />

           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Select Payment Category</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {TDS_SLABS.map(s => (
                    <button 
                      key={s.id} 
                      onClick={() => update({ slabId: s.id })}
                      className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${slabId === s.id ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-[var(--border)] hover:border-indigo-100'}`}
                    >
                       <div className="text-xs font-black text-slate-900 mb-1">{s.name}</div>
                       <div className={`text-[10px] font-bold ${slabId === s.id ? 'text-indigo-600' : 'text-slate-400'}`}>Rate: {s.rate}%</div>
                       {slabId === s.id && <div className="absolute top-0 right-0 p-2"><ShieldCheck className="w-4 h-4 text-indigo-400" /></div>}
                    </button>
                 ))}
              </div>
           </div>

           <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                 <Scale className="w-4 h-4 text-indigo-600" />
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 tracking-[0.2em] italic">Statutory Notice</h3>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium italic underline underline-offset-4 decoration-2 decoration-indigo-200">
                "{activeSlab.hint}. TDS must be deposited to the Inland Revenue Department (IRD) within 25 days of the following month."
              </p>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="TDS Amount to Deduct" 
            value={fmt(result.tdsAmount)} 
            unit=" Rs." 
            color="rose" 
            title="Withholding Entry"
            copyValue={`TDS: Rs. ${result.tdsAmount}`}
          />

          <div className="bg-white border border-[var(--border)] rounded-[2rem] overflow-hidden shadow-sm italic">
             <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Ledger Summary</div>
                   <div className="text-xl font-black">Net Rs. {fmt(result.netAmount)}</div>
                </div>
                <Receipt className="w-8 h-8 text-indigo-500 opacity-50" />
             </div>
             <div className="p-6 divide-y divide-slate-100 italic">
                <div className="py-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-slate-500 uppercase italic">Gross Bill Amount</span>
                   <span className="text-sm font-black text-slate-900 font-mono italic">Rs. {fmt(amount)}</span>
                </div>
                <div className="py-4 flex justify-between items-center italic">
                   <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-rose-500 uppercase italic">TDS Deduction ({activeSlab.rate}%)</span>
                      <span className="text-[8px] font-bold text-slate-400 italic italic">Payable to IRD</span>
                   </div>
                   <span className="text-sm font-black text-rose-600 font-mono italic">- Rs. {fmt(result.tdsAmount)}</span>
                </div>
                <div className="py-5 bg-slate-50 -mx-6 px-6 italic">
                   <span className="text-[11px] font-black text-slate-900 uppercase italic">Amount Payable to Provider</span>
                   <span className="text-xl font-black text-slate-900 font-mono italic">Rs. {fmt(result.netAmount)}</span>
                </div>
             </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 italic">
             <Landmark className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-blue-900 uppercase italic italic">Bank Interest Note</h5>
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic italic">
                   "Individual interest tax was recently adjusted to **6%** for natural persons. Corporate entities still follow the 15% standard."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter italic">The TDS Compliance Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2 italic">Who Deducts TDS?</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic underline underline-offset-4 decoration-2 decoration-indigo-200">The payer (the one making the payment) is responsible for deducting TDS and depositing it to the IRD. For example, if a company pays rent, the company must deduct 10% and pay only 90% to the landlord.</p>
               </div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2 italic">PAN vs. VAT</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic">Service providers registered in VAT are subject to a lower **1.5%** TDS rate to avoid double taxation. Providers only registered in PAN are subject to the full **15%** service TDS unless specific exemptions apply.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
