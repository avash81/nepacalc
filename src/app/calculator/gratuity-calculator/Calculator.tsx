'use client';

import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalGratuity } from '@/utils/math/country-rules/nepal';
import { Briefcase, Gavel, ShieldCheck, Info, Wallet } from 'lucide-react';

export default function GratuityCalculator() {
  const [state, setState] = useSyncState('gratuity_v1', {
    basicSalary: 30000,
    yearsOfService: 10,
    hasResigned: false
  });

  const { basicSalary, yearsOfService, hasResigned } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    return calculateNepalGratuity(basicSalary, yearsOfService);
  }, [basicSalary, yearsOfService]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <CalculatorLayout
      title="Gratuity & Retirement Console"
      description="Calculate your terminal benefits under Nepal Labor Act 2074. Mandatory 8.33% basic salary accumulation for all formal sector employees."
      category={{ label: 'Labor & Law', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput 
                label="Monthly Basic Salary" 
                value={basicSalary} 
                onChange={v => update({ basicSalary: v })} 
                prefix="Rs." 
                hint="Excluding allowances"
              />
              <ValidatedInput 
                label="Years of Service" 
                value={yearsOfService} 
                onChange={v => update({ yearsOfService: v })} 
                suffix="Years"
                min={0} 
                step={0.5}
              />
           </div>

           <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Briefcase className="w-24 h-24" />
              </div>
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className={`w-5 h-5 ${result.isEligible ? 'text-emerald-400' : 'text-rose-400'}`} />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Statutory Eligibility Status</h3>
                 </div>
                 
                 <div className="flex items-center gap-4">
                    <div className={`text-2xl font-black ${result.isEligible ? 'text-emerald-400' : 'text-rose-400'}`}>
                       {result.isEligible ? 'LEGALLY ELIGIBLE' : 'NOT ELIGIBLE YET'}
                    </div>
                 </div>

                 <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                   {result.isEligible 
                     ? "You have completed the mandatory 5 years of service. Your employer is legally obligated to pay the accumulated gratuity fund upon termination or resignation."
                     : "Under the Labor Act 2074, an employee is generally entitled to gratuity after 5 years of continuous service. Monthly contributions (8.33%) however, must begin from day one."}
                 </p>
              </div>
           </div>

           <div className="pt-6 border-t border-[var(--border)] flex gap-4 items-start bg-slate-50 p-6 rounded-2xl">
              <Gavel className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                 <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Labor Act 2074 (Section 53)</h4>
                 <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    "Every employer shall deposit an amount equivalent to 8.33% of the basic remuneration of each worker in the Social Security Fund or any other retirement fund."
                 </p>
              </div>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Total Gratuity Fund" 
            value={fmt(result.totalGratuity)} 
            unit=" Rs." 
            color="emerald" 
            title="Accumulated Payout"
            copyValue={`My total accumulated gratuity for ${yearsOfService} years is Rs. ${result.totalGratuity}`}
          />

          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
             <div className="p-4 bg-slate-50 border-b border-[var(--border)] flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-[var(--text-main)]">Benefit Ledger</span>
                <Wallet className="w-4 h-4 text-emerald-600" />
             </div>
             <div className="p-4 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Monthly Contribution</span>
                <span className="text-sm font-black text-slate-900 font-mono">Rs. {fmt(result.monthlyContribution)}</span>
             </div>
             <div className="p-4 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Tax Exempt Portion</span>
                <span className="text-sm font-black text-emerald-600 font-mono">Rs. {fmt(result.taxExemptLimit)}</span>
             </div>
             <div className="p-4 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Taxable Portion</span>
                <span className="text-sm font-black text-rose-600 font-mono">Rs. {fmt(result.taxableAmount)}</span>
             </div>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
             <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
             <p className="text-[11px] text-amber-800 font-medium leading-relaxed italic">
                Note: While legal eligibility for payout is **5 years**, the contribution of **8.33%** is mandatory from the first day of employment. If you are under the **SSF**, this amount is automatically managed.
             </p>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic">Mastering Gratuity in Nepal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-600 mb-2">Statutory Calculation</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">The Labor Act 2074 (Section 53) states that the employer must contribute 8.33% of the **basic remuneration** every month. For calculation, "Basic Remuneration" includes the basic salary and any earned grades/increments, but excludes dearness allowance or other perks unless specified in the contract.</p>
               </div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-600 mb-2">Taxation Rules</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">According to the Income Tax Act, gratuity received from a retirement fund (like SSF or CIT) is subject to different rules. Generally, for a standard resignation, the first **NPR 5,00,000** of the total gratuity payout is tax-exempt, with amounts exceeding that being taxed at a flat 15% (for private sector).</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
