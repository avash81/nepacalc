'use client';
import { useMemo } from 'react';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useSyncState } from '@/hooks/useSyncState';
import { TAX_YEARS } from '@/config/tax-config';
import { Wallet, Landmark, TrendingUp, Info, PieChart, Receipt } from 'lucide-react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { calculateNepalIncomeTax } from '@/utils/math/country-rules/nepal';

const DEFAULT_STATE = {
  fiscalYear: '2082/83' as keyof typeof TAX_YEARS,
  basic: 60000,
  allowance: 15000,
  married: false,
  ssf: true,
  cit: false,
  citAmount: 5000,
};

export default function NepalSalaryCalculator() {
  const [state, setState] = useSyncState('nepal_salary_v2', DEFAULT_STATE);
  const { fiscalYear, basic, allowance, married, ssf, cit, citAmount } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const calculation = useMemo(() => {
    const grossMonthly = basic + allowance;
    const grossAnnual = grossMonthly * 12;

    // Deductions
    const ssfEmployee = ssf ? Math.round(basic * 0.11) : 0;
    const ssfEmployer = ssf ? Math.round(basic * 0.20) : 0;
    
    // CIT Limit: Often restricted to 10% or total (SSF+CIT) restricted to 1/3 of income or 3 lakhs
    const rawCit = cit ? citAmount : 0;
    const maxTotalDeduction = Math.min(grossMonthly / 3, 41666); // 1/3 of monthly or 5L/12
    const finalizedCit = Math.min(rawCit, Math.max(0, maxTotalDeduction - ssfEmployee));
    
    const totalMonthlyDeductions = ssfEmployee + finalizedCit;
    const annualTaxableIncome = (grossMonthly - totalMonthlyDeductions) * 12;

    // Tax Logic (Using centralized rules)
    const taxResult = calculateNepalIncomeTax(annualTaxableIncome, married, ssf);

    const annualTax = taxResult.totalTax;
    const monthlyTax = Math.round(annualTax / 12);
    const netMonthly = grossMonthly - totalMonthlyDeductions - monthlyTax;
    const ctcMonthly = grossMonthly + ssfEmployer;

    return {
      grossMonthly,
      grossAnnual,
      ssfEmployee,
      ssfEmployer,
      citDeduction: finalizedCit,
      monthlyTax,
      annualTax,
      netMonthly,
      ctcMonthly,
      effectiveTaxRate: (annualTax / (grossAnnual || 1)) * 100
    };
  }, [basic, allowance, married, ssf, cit, citAmount]);

  const formatNPR = (n: number) =>
    new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <CalculatorErrorBoundary calculatorName="Nepal Salary">
      <CalculatorLayout
        title="Nepal Take-Home Salary Calculator"
        description="Calculate your exact in-hand income after SSF, CIT, and Income Tax deductions based on the latest 2082/83 budget."
        badge="Payroll"
        badgeColor="emerald"
        category={{ label: 'Nepal Sanchar', href: '/calculator/category/nepal' }}
        leftPanel={
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput label="Monthly Basic Salary" value={basic} onChange={(v) => updateState({ basic: v })} prefix="NPR" step={500} required />
              <ValidatedInput label="Monthly Allowances" value={allowance} onChange={(v) => updateState({ allowance: v })} prefix="NPR" step={500} />
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-6">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Retirement & Savings</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => updateState({ ssf: !ssf })}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${ssf ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                  >
                     <div className="flex items-center gap-3">
                        <Landmark className="w-5 h-5" />
                        <div className="text-left">
                           <div className="text-xs font-black uppercase tracking-tight">SSF</div>
                           <div className="text-[8px] font-bold uppercase tracking-widest">31% Total</div>
                        </div>
                     </div>
                     <div className={`w-8 h-4 rounded-full relative transition-all ${ssf ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${ssf ? 'right-0.5' : 'left-0.5'}`} />
                     </div>
                  </button>

                  <button 
                    onClick={() => updateState({ cit: !cit })}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${cit ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                  >
                     <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5" />
                        <div className="text-left">
                           <div className="text-xs font-black uppercase tracking-tight">CIT</div>
                           <div className="text-[8px] font-bold uppercase tracking-widest">Optional</div>
                        </div>
                     </div>
                     <div className={`w-8 h-4 rounded-full relative transition-all ${cit ? 'bg-blue-600' : 'bg-slate-300'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${cit ? 'right-0.5' : 'left-0.5'}`} />
                     </div>
                  </button>
               </div>

               {cit && (
                 <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
                    <ValidatedInput 
                      label="Monthly CIT Amount" 
                      value={citAmount} 
                      onChange={(v) => updateState({ citAmount: v })}
                      prefix="NPR"
                      hint="Total monthly regular savings"
                    />
                 </div>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Fiscal Year</label>
                  <select 
                    value={fiscalYear}
                    onChange={(e) => updateState({ fiscalYear: e.target.value as any })}
                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-bold outline-none focus:border-emerald-500 transition-all text-sm"
                  >
                     <option value="2082/83">2082/83 (Latest)</option>
                     <option value="2083/84">2083/84 (Projected)</option>
                  </select>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Marital Status</label>
                  <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-200">
                     {[ { v: false, l: 'Single' }, { v: true, l: 'Married' } ].map(opt => (
                       <button
                        key={opt.l}
                        onClick={() => updateState({ married: opt.v })}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${married === opt.v ? 'bg-white text-emerald-600 shadow-sm border border-slate-100' : 'text-slate-400'}`}
                       >
                         {opt.l}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-6">
             <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="p-10 border-b border-slate-50 text-center">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Monthly In-Hand</div>
                   <div className="text-6xl font-black text-slate-900 tracking-tighter">
                     {formatNPR(calculation.netMonthly)}
                   </div>
                </div>
                <div className="p-8 bg-emerald-50 space-y-4">
                   <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-emerald-700 uppercase tracking-wider">Gross Monthly</span>
                      <span className="text-emerald-900">{formatNPR(calculation.grossMonthly)}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-emerald-700 uppercase tracking-wider">Monthly Tax</span>
                      <span className="text-rose-600">-{formatNPR(calculation.monthlyTax)}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-emerald-700 uppercase tracking-wider">Deductions (SSF/CIT)</span>
                      <span className="text-rose-600">-{formatNPR(calculation.ssfEmployee + calculation.citDeduction)}</span>
                   </div>
                </div>
             </div>

             <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                   <TrendingUp className="w-5 h-5 text-blue-400" />
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Employer Cost (CTC)</h3>
                </div>
                <div className="text-4xl font-black tracking-tighter">{formatNPR(calculation.ctcMonthly)}</div>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-wider">
                   Includes Gross Monthly + 20% Employer SSF Contribution.
                </p>
             </div>

             <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4 items-start">
                 <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-slate-600 leading-relaxed">
                   <strong>Retirement Limit:</strong> Per IRD rules, your total combined retirement contribution (SSF + CIT) is capped at 1/3 of your gross income or NPR 500,000 annually for tax deduction purposes.
                 </p>
             </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800">How is SSF calculated on basic salary?</h3>
                <p className="text-sm text-slate-600">According to the Nepal Labor Act, social security contributions are calculated solely on the basic portion of your salary (typically 60% of gross), not including mobile, food, or fuel allowances.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Why use a 1/3rd deduction cap?</h3>
                <p className="text-sm text-slate-600">The Inland Revenue Department allows you to deduct up to one-third of your total income or NPR 300,000 (pooled with CIT/Provident) as tax-exempt savings. Our calculator automatically applies this cap for legal accuracy.</p>
              </div>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
