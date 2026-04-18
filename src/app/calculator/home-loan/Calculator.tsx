'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { Landmark, Calendar, Percent, PieChart, TrendingDown, Info } from 'lucide-react';

export default function BankingEMICalculator() {
  const [state, setState] = useSyncState('home_loan_v2', {
    principal: 5000000,
    baseRate: 7.5,
    premium: 2.5,
    tenureYears: 15
  });

  const { principal, baseRate, premium, tenureYears } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const effectiveRate = baseRate + premium;

  const results = useMemo(() => {
    const r = effectiveRate / 12 / 100;
    const n = tenureYears * 12;
    
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    // Amortization (Brief preview)
    const schedule = [];
    let balance = principal;
    for (let i = 1; i <= Math.min(n, 12); i++) {
        const interest = balance * r;
        const pPart = emi - interest;
        balance -= pPart;
        schedule.push({ month: i, interest, principal: pPart, balance });
    }

    return { emi, totalPayment, totalInterest, schedule, totalMonths: n };
  }, [principal, effectiveRate, tenureYears]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <CalculatorLayout
      title="Banking EMI (Home/Vehicle) Console"
      description="Professional EMI calculator for Nepal's banking sector. Uses the standard 'Base Rate + Premium' model with full amortization insights."
      category={{ label: 'Banking', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <ValidatedInput 
             label="Loan Principal Amount" 
             value={principal} 
             onChange={v => update({ principal: v })} 
             prefix="Rs." 
             hint="Total amount borrowed from the bank"
           />

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput 
                label="Bank Base Rate" 
                value={baseRate} 
                onChange={v => update({ baseRate: v })} 
                suffix="%" 
                hint="Provided by the bank monthly"
              />
              <ValidatedInput 
                label="Premium / Spread" 
                value={premium} 
                onChange={v => update({ premium: v })} 
                suffix="%" 
                hint="Fixed margin over base rate"
              />
           </div>

           <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex justify-between items-center">
              <div className="space-y-1">
                 <div className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Effective Interest Rate</div>
                 <div className="text-2xl font-black text-slate-900">{effectiveRate}% <span className="text-xs font-bold text-slate-400">p.a</span></div>
              </div>
              <Percent className="w-8 h-8 text-indigo-300" />
           </div>

           <ValidatedInput 
             label="Loan Tenure (Years)" 
             value={tenureYears} 
             onChange={v => update({ tenureYears: v })} 
             suffix="Yrs" 
             max={30}
           />
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Equated Monthly Installment (EMI)" 
            value={fmt(results.emi)} 
            unit=" Rs." 
            color="indigo" 
            title="Monthly Payout"
            copyValue={`EMI: Rs. ${results.emi}`}
          />

          <div className="bg-white border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm italic">
             <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Repayment Summary</div>
                   <div className="text-xl font-black">Rs. {fmt(results.totalPayment)}</div>
                </div>
                <PieChart className="w-8 h-8 text-indigo-500 opacity-50" />
             </div>
             <div className="p-6 divide-y divide-slate-100">
                <div className="py-4 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Original Principal</span>
                   </div>
                   <span className="text-sm font-black text-slate-900 font-mono">Rs. {fmt(principal)}</span>
                </div>
                <div className="py-4 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-[11px] font-bold text-indigo-500 uppercase">Total Interest Payable</span>
                   </div>
                   <span className="text-sm font-black text-indigo-600 font-mono">Rs. {fmt(results.totalInterest)}</span>
                </div>
                <div className="py-5 bg-slate-50 -mx-6 px-6">
                   <div className="text-[10px] font-black uppercase mb-3 text-slate-400">First Year Amortization Preview</div>
                   <div className="space-y-2">
                       {results.schedule.map(m => (
                          <div key={m.month} className="flex justify-between text-[10px] font-bold text-slate-600">
                             <span>Month {m.month}</span>
                             <span className="font-mono">Balance: {fmt(m.balance)}</span>
                          </div>
                       ))}
                   </div>
                </div>
             </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
             <TrendingDown className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Base Rate Note</h5>
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic">
                   "Most banks in Nepal update their Base Rate every quarter. Your interest rate may vary if you choose a 'Floating' rate contract."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter italic">The Banking Logic in Nepal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2">Base Rate vs. Fixed Rate</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic underline underline-offset-4 decoration-2 decoration-indigo-200">The Base Rate is the minimum interest rate below which a bank cannot lend. Banks add a 'Premium' (usually 0.5% to 5%) depending on the risk of the loan. While Base Rates move monthly, your premium remains fixed throughout the loan term.</p>
               </div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2 underline underline-offset-4 decoration-2 decoration-indigo-200">Reducing Balance Method</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic">All commercial banks in Nepal use the 'Daily Reducing Balance' method for interest calculation. This means every EMI payment you make reduces the principal, thereby reducing the interest for the subsequent month.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
