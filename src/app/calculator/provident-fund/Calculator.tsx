'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { PiggyBank, Briefcase, TrendingUp, ShieldCheck, Info, Gift } from 'lucide-react';

export default function ProvidentFundCalculator() {
  const [state, setState] = useSyncState('epf_v2', {
    basicSalary: 30000,
    currentBalance: 500000,
    interestRate: 7.5,
    yearsToRetire: 20
  });

  const { basicSalary, currentBalance, interestRate, yearsToRetire } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const results = useMemo(() => {
    const monthlyContribution = basicSalary * 0.10 * 2; // 10% Employee + 10% Employer
    const yearlyContribution = monthlyContribution * 12;
    
    // Retirement Projection using Compound Interest
    let balance = currentBalance;
    const rate = interestRate / 100;
    
    for (let i = 0; i < yearsToRetire; i++) {
        balance = (balance + yearlyContribution) * (1 + rate);
    }
    
    const totalContribution = yearlyContribution * yearsToRetire;
    const interestEarned = balance - currentBalance - totalContribution;

    return { monthlyContribution, totalContribution, projectFinalBalance: balance, interestEarned };
  }, [basicSalary, currentBalance, interestRate, yearsToRetire]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <CalculatorLayout
      title="EPF/Provident Fund Laboratory"
      description="Calculate your retirement corpus growth in Nepal's Employees Provident Fund (Kosh). Implements the mandatory 10/10 contribution logic and statutory interest accumulation."
      category={{ label: 'Retirement', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <ValidatedInput 
             label="Current Monthly Basic Salary" 
             value={basicSalary} 
             onChange={v => update({ basicSalary: v })} 
             prefix="Rs." 
             hint="PF is calculated on basic salary, not gross."
           />

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput 
                label="Current EPF Balance" 
                value={currentBalance} 
                onChange={v => update({ currentBalance: v })} 
                prefix="Rs." 
                hint="Total accumulated amount till date"
              />
              <ValidatedInput 
                label="Annual Interest Rate (%)" 
                value={interestRate} 
                onChange={v => update({ interestRate: v })} 
                suffix="%" 
                hint="Current EPF interest rate"
              />
           </div>

           <ValidatedInput 
             label="Years Remaining for Retirement" 
             value={yearsToRetire} 
             onChange={v => update({ yearsToRetire: v })} 
             suffix="Yrs" 
             max={40}
           />

           <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                 <Briefcase className="w-4 h-4 text-indigo-600" />
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 tracking-[0.2em] italic">Statutory Provision</h3>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium italic underline underline-offset-4 decoration-2 decoration-indigo-200">
                "According to Nepal labor law, both employer and employee must contribute **10%** of the basic salary to the Social Security/Provident Fund."
              </p>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Projected Retirement Corpus" 
            value={fmt(results.projectFinalBalance)} 
            unit=" Rs." 
            color="indigo" 
            title="Final Savings"
            copyValue={`Final EPF Balance: Rs. ${results.projectFinalBalance}`}
          />

          <div className="bg-slate-900 text-white rounded-[2rem] p-8 space-y-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <PiggyBank className="w-24 h-24" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Contribution Summary</div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center pb-3 border-b border-white/10 text-[11px] font-bold">
                      <span className="text-slate-400 italic">Total Monthly Contribution</span>
                      <span className="text-emerald-400 italic font-mono">Rs. {fmt(results.monthlyContribution)}</span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-white/10 text-[11px] font-bold">
                      <span className="text-slate-400 italic">Future Contribution Sum</span>
                      <span className="text-slate-200 italic font-mono">Rs. {fmt(results.totalContribution)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-slate-400 italic text-indigo-400">Net Interest Income</span>
                      <span className="text-indigo-400 italic font-mono">Rs. {fmt(results.interestEarned)}</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-5 bg-white border border-[var(--border)] rounded-2xl flex gap-3 italic">
             <Gift className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-indigo-900 uppercase italic italic">Gratuity Bonus</h5>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic italic">
                   "Remember that Gratuity (8.33%) is a separate benefit. Use the **Gratuity Console** to calculate those additional savings."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter italic">Provident Fund Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2 italic">What is CIT?</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic underline underline-offset-4 decoration-2 decoration-indigo-200">The Citizen Investment Trust (CIT) is an additional voluntary saving scheme alongside the EPF. You can contribute up to 33% (combined with PF) of your salary up to certain limits to save on income tax.</p>
               </div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2 italic underline underline-offset-4 decoration-2 decoration-indigo-200">Withdrawal Rules</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic">You can withdraw up to 90% of your accumulated EPF balance in Nepal for specific purposes like house construction or treating critical illnesses, subject to terms and remaining years of service.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
