'use client';
import { useMemo } from 'react';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useSyncState } from '@/hooks/useSyncState';
import { Wallet, Landmark, TrendingUp, Info, PieChart, Receipt, ChevronRight, Zap, Target, ShieldCheck } from 'lucide-react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { calculateNepalSalary } from '@/utils/math/country-rules/nepal';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';

const DEFAULT_STATE = {
  grossSalary: 80000,
  married: false,
  ssf: true,
  cit: true,
  citAmount: 10000,
  gender: 'male' as 'male' | 'female',
  isMonthly: true
};

export default function NepalSalaryCalculator() {
  const [state, setState] = useSyncState('nepal_salary_institutional_v1', DEFAULT_STATE);
  const { grossSalary, married, ssf, cit, citAmount, gender, isMonthly } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    // Assuming 60% Basic for Nepal standards if not specified
    const allowances = { hra: 0, medical: 0, transport: 0, other: 0 };
    const salary = calculateNepalSalary(grossSalary, ssf, cit, gender, allowances);
    
    return {
      ...salary,
      monthlyTax: salary.incomeTax / 12,
      totalDeductions: salary.deductions.ssf_employee + salary.deductions.cit_employee + (salary.incomeTax / 12),
      inHand: salary.netSalary
    };
  }, [grossSalary, ssf, cit, gender]);

  const fmt = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-IN');

  return (
    <CalculatorErrorBoundary calculatorName="Institutional Salary Dashboard">
      <CalculatorLayout
        title="Institutional Salary Dashboard"
        description="Professional payroll analysis tool for Nepal. Calculate exact take-home pay, SSF/EPF contributions, CIT optimization, and Employer CTC (Cost to Company)."
        category="nepal"
        leftPanel={
          <div className="space-y-8">
            
            {/* 1. Base Pay Input */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[12px] font-black uppercase text-slate-400 tracking-widest px-1">Salary Parameters</h3>
                  <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">FY 2081/82</div>
               </div>
               
               <div className="space-y-8">
                  <ValidatedInput 
                    label="Gross Monthly Salary" 
                    value={grossSalary} 
                    onChange={v => update({ grossSalary: v })} 
                    prefix="Rs." 
                    min={0} 
                    withSlider
                  />
                  
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marital Status</label>
                        <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                          {[{ v: false, l: 'Single' }, { v: true, l: 'Married' }].map(m => (
                            <button key={m.l} onClick={() => update({ married: m.v })} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${married === m.v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>{m.l}</button>
                          ))}
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gender</label>
                        <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                          {[{ v: 'male' as const, l: 'Male' }, { v: 'female' as const, l: 'Female' }].map(g => (
                            <button key={g.l} onClick={() => update({ gender: g.v })} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${gender === g.v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>{g.l}</button>
                          ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* 2. Deductions Dashboard */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-8">
               <div className="flex items-center gap-3 mb-8">
                  <Landmark className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Retirement Mapping</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => update({ ssf: !ssf })}
                    className={`p-6 text-left rounded-3xl border transition-all ${ssf ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-50' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'}`}
                  >
                     <ShieldCheck className={`w-6 h-6 mb-4 ${ssf ? 'text-white' : 'text-blue-500'}`} />
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Formal Sector</div>
                     <div className="text-sm font-bold">Social Security (SSF)</div>
                     <div className={`mt-4 text-[10px] font-black ${ssf ? 'text-blue-100' : 'text-slate-400'}`}>31% Statutory</div>
                  </button>

                  <button 
                    onClick={() => update({ cit: !cit })}
                    className={`p-6 text-left rounded-3xl border transition-all ${cit ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-50' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'}`}
                  >
                     <Target className={`w-6 h-6 mb-4 ${cit ? 'text-white' : 'text-indigo-500'}`} />
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Voluntary Savings</div>
                     <div className="text-sm font-bold">Citizen Investment (CIT)</div>
                     <div className={`mt-4 text-[10px] font-black ${cit ? 'text-indigo-100' : 'text-slate-400'}`}>Tax Exempted</div>
                  </button>
               </div>

               {cit && (
                 <div className="mt-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-2">
                    <ValidatedInput label="Monthly CIT Contribution" value={citAmount} onChange={v => update({ citAmount: v })} prefix="Rs." hint="Direct payroll deduction" />
                 </div>
               )}
            </div>

          </div>
        }
        rightPanel={
          <div className="space-y-6">
            
            {/* Master Take-Home Result */}
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative group shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-1000" />
              <div className="relative z-10 text-center">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-8">Monthly In-Hand (Net)</div>
                 <div className="text-6xl font-black tracking-tighter mb-4 text-emerald-400">{Math.round(result.netSalary).toLocaleString('en-IN')}</div>
                 <div className="text-lg font-bold text-slate-400 mb-10">Rupees Per Month</div>
                 
                 <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/10">
                    <div className="text-left">
                       <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Gross CTC</div>
                       <div className="text-xl font-black text-blue-400">{fmt(result.costToCompany)}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Effort</div>
                       <div className="text-xl font-black text-rose-400">{Math.round((result.totalDeductions / grossSalary) * 100)}% Lost</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Detailed Salary Breakdown */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-slate-400" />
                    <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Monthly Breakdown</h4>
                  </div>
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
               </div>
               
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                     <span className="text-slate-500 uppercase">Gross Salary</span>
                     <span className="text-slate-900 font-mono">{fmt(result.totalGross)}</span>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase text-rose-500">
                        <span>Employee SSF (11%)</span>
                        <span>-{fmt(result.deductions.ssf_employee)}</span>
                     </div>
                     {cit && <div className="flex justify-between items-center text-[10px] font-black uppercase text-rose-500">
                        <span>CIT Contribution</span>
                        <span>-{fmt(result.deductions.cit_employee)}</span>
                     </div>}
                     <div className="flex justify-between items-center text-[10px] font-black uppercase text-rose-500">
                        <span>Income Tax (Monthly)</span>
                        <span>-{fmt(result.monthlyTax)}</span>
                     </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-900/5">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-600">
                        <span>Employer SSF (20%)</span>
                        <span>+{fmt(result.deductions.ssf_employer)}</span>
                     </div>
                     <p className="mt-2 text-[9px] text-slate-400 italic">"Employer share is included in CTC but not in your gross."</p>
                  </div>
               </div>
            </div>

            {/* Regulatory Note */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 transition-all hover:bg-white hover:border-blue-200 group">
               <Info className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
               <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight">
                  Calculated based on the **Labor Act 2074** and **Social Security Act** mandates. SSF contributions are applied only on the basic remuneration (60% of Gross).
               </p>
            </div>

          </div>
        }
        faqSection={
          <CalcFAQ faqs={[
            { question: 'What is CTC vs Gross?', answer: 'Gross salary is the amount agreed upon before deductions. CTC (Cost to Company) includes your gross plus the 20% employer contribution to the Social Security Fund (SSF).' },
            { question: 'Why is SSF only on 60% of salary?', answer: 'In Nepal, employment law typically designates 60% of a gross salary as "Basic Salary" and 40% as "Allowances". Social security contributions are only mandatory on the basic component.' },
            { question: 'How much CIT is tax-exempt?', answer: 'You can contribute as much as you want to CIT, but only up to 1/3 of your gross income or Rs. 500,000 annually (whichever is lower) is allowed as a tax-free deduction.' },
            { question: 'Is the 1% SST still applicable?', answer: 'If you contribute to the SSF, the 1% Social Security Tax on the first tax slab is waived. Our calculator automatically applies this waiver for SSF contributors.' }
          ]} />
        }
      />
    </CalculatorErrorBoundary>
  );
}
