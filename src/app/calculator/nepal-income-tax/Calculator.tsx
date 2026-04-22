'use client';
import { useMemo, useState } from 'react';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { QuickPresets } from '@/components/calculator/QuickPresets';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useSyncState } from '@/hooks/useSyncState';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { 
  Receipt, 
  Wallet, 
  ShieldCheck, 
  TrendingDown, 
  PieChart, 
  Info, 
  ArrowRightLeft,
  ChevronRight,
  Gem
} from 'lucide-react';
import { calculateNepalIncomeTax } from '@/utils/math/country-rules/nepal';

const DEFAULT_STATE = {
  income: 1200000,
  married: false,
  gender: 'male' as 'male' | 'female',
  isSSFContributor: true,
  lifeInsurance: 40000,
  citDeduction: 0,
  healthInsurance: 0,
  isMonthly: false
};

export default function NepalIncomeTaxCalculator() {
  const [state, setState] = useSyncState('nepal_tax_institutional_v1', DEFAULT_STATE);
  const { income, married, gender, isSSFContributor, lifeInsurance, citDeduction, healthInsurance, isMonthly } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  // Normalizing to Annual for calculation
  const annualGross = isMonthly ? income * 12 : income;

  const result = useMemo(() => {
    // 1. Deductions Cap Check (Actual Nepal IRD Standards)
    const insDeduction = Math.min(lifeInsurance, 40000);
    const healthInsDeduction = Math.min(healthInsurance, 20000);
    // CIT + EPF/SSF combined max is 1/3 of income or 500,000
    const citMax = Math.min(annualGross / 3, 500000);
    const actualCit = Math.min(citDeduction, citMax);

    const calculation = calculateNepalIncomeTax(
      annualGross - (insDeduction + healthInsDeduction + actualCit), 
      married, 
      isSSFContributor, 
      gender
    );

    return {
      ...calculation,
      totalDeductions: insDeduction + healthInsDeduction + actualCit + (annualGross - (annualGross - (insDeduction + healthInsDeduction + actualCit))),
      netAnnual: annualGross - calculation.totalTax,
      netMonthly: (annualGross - calculation.totalTax) / 12
    };
  }, [annualGross, married, isSSFContributor, gender, lifeInsurance, citDeduction, healthInsurance]);

  const fmt = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-IN');

  const faqs = [
    { question: 'What is the SST Waiver?', answer: 'If you are an official contributor to the Social Security Fund (SSF), the first 1% Social Security Tax is completely waived as per IRD regulations.' },
    { question: 'How much can I deduct for Insurance?', answer: 'You can deduct up to Rs. 40,000 for Life Insurance premiums and up to Rs. 20,000 for Health Insurance premiums annually.' },
    { question: 'What is the Married Status benefit?', answer: 'The tax-free threshold is higher for individual taxpayers who are registered as Married/Couple (Rs. 6 Lakh vs Rs. 5 Lakh in 2081/82).' },
    { question: 'Is there a rebate for females?', answer: 'Yes, female salaried employees (remuneration earners) are entitled to a 10% rebate on their total calculated tax liability.' },
  ];

  return (
    <CalculatorErrorBoundary calculatorName="Institutional Income Tax">
      <CalculatorLayout
        title="Nepal Income Tax Dashboard"
        description="Institutional-grade tax laboratory for FY 2081/82. Includes SSF SST-waiver logic, female rebates, and comprehensive deduction mapping."
        category={{ label: "Nepal Tools", href: "/calculator/category/nepal" }}
        faqs={faqs}
        leftPanel={
          <div className="space-y-8">
            
            {/* Main Input Block */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[12px] font-black uppercase text-slate-400 tracking-widest">Income Parameters</h3>
                  <button 
                    onClick={() => update({ isMonthly: !isMonthly })}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                    {isMonthly ? 'Switch to Annual' : 'Switch to Monthly'}
                  </button>
               </div>
               
               <ValidatedInput 
                 label={isMonthly ? "Monthly Gross Salary" : "Annual Gross Income"} 
                 value={income} 
                 onChange={v => update({ income: v })} 
                 prefix="Rs." 
                 min={0} 
                 max={100000000}
                 withSlider
               />

               <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Marital Status</label>
                    <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                      {[{ v: false, l: 'Single' }, { v: true, l: 'Married' }].map(m => (
                        <button key={m.l} onClick={() => update({ married: m.v })} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${married === m.v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>{m.l}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gender</label>
                    <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                      {[{ v: 'male' as const, l: 'Male' }, { v: 'female' as const, l: 'Female' }].map(g => (
                        <button key={g.l} onClick={() => update({ gender: g.v })} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${gender === g.v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>{g.l}</button>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* Deductions Block */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-8">
               <div className="flex items-center gap-3 mb-8">
                  <Gem className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Legal Deductions (Annual)</h3>
               </div>
               
               <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <ValidatedInput label="Life Insurance" value={lifeInsurance} onChange={v => update({ lifeInsurance: v })} suffix="Rs." max={40000} hint="Max: 40k" />
                     <ValidatedInput label="Health Insurance" value={healthInsurance} onChange={v => update({ healthInsurance: v })} suffix="Rs." max={20000} hint="Max: 20k" />
                  </div>
                  <ValidatedInput label="CIT / Other Deductibles" value={citDeduction} onChange={v => update({ citDeduction: v })} prefix="Rs." hint="Subject to 1/3 income cap" />
                  
                  <button 
                    onClick={() => update({ isSSFContributor: !isSSFContributor })}
                    className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all ${isSSFContributor ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-200' : 'bg-white border-slate-200 text-slate-500'}`}
                  >
                    <div className="flex items-center gap-4 text-left">
                       <ShieldCheck className={`w-8 h-8 ${isSSFContributor ? 'text-white' : 'text-blue-500'}`} />
                       <div>
                          <div className={`text-[12px] font-black uppercase tracking-widest ${isSSFContributor ? 'text-blue-100' : 'text-slate-400'}`}>Official Contributor</div>
                          <div className="text-sm font-bold">Social Security Fund (SSF)</div>
                       </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 opacity-40 ${isSSFContributor ? 'rotate-90' : ''}`} />
                  </button>
               </div>
            </div>

          </div>
        }
        rightPanel={
          <div className="space-y-6">
            
            {/* Master Result Card */}
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
              <div className="relative z-10 text-center">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-8">Estimated Take-Home (Net)</div>
                 <div className="text-6xl font-black tracking-tighter mb-4">{Math.round(isMonthly ? result.netMonthly : result.netAnnual).toLocaleString('en-IN')}</div>
                 <div className="text-lg font-bold text-slate-400 mb-10">{isMonthly ? 'Per Month' : 'Per Annum'}</div>
                 
                 <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/10">
                    <div className="text-left">
                       <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Effective Rate</div>
                       <div className="text-xl font-black text-blue-400">{result.effectiveRate}%</div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Tax</div>
                       <div className="text-xl font-black text-rose-400">{fmt(isMonthly ? result.totalTax/12 : result.totalTax)}</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Slab Breakdown Dashboard */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-slate-400" />
                    <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Slab Breakdown</h4>
                  </div>
                  <TrendingDown className="w-4 h-4 text-emerald-500" />
               </div>
               
               <div className="space-y-6">
                  {result.breakdown.map((item, idx) => (
                    <div key={idx} className="group">
                       <div className="flex justify-between items-center text-[12px] font-bold text-slate-600 mb-2">
                          <span className="group-hover:text-blue-600 transition-colors">{item.slabLabel} ({item.rate}%)</span>
                          <span className="font-mono text-slate-900">{fmt(isMonthly ? item.taxAmount/12 : item.taxAmount)}</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div 
                            className={`h-full transition-all duration-1000 ${item.taxAmount < 0 ? 'bg-emerald-400' : 'bg-indigo-600'}`}
                            style={{ width: `${Math.abs((item.taxAmount / result.totalTax) * 100)}%` }} 
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Smart Tip */}
            <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2rem] flex gap-4 transition-all hover:scale-[1.02]">
               <Info className="w-6 h-6 text-blue-600 shrink-0" />
               <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                  {isSSFContributor 
                    ? "✓ You are gaining a 1% SST waiver on your first slab by being an SSF contributor. This is an official IRD mandate for FY 2081/82." 
                    : "💡 You could save approximately 1% on your first tax bracket by switching to the Social Security Fund (SSF) contribution model."}
               </p>
            </div>

            {/* Wealth Breakdown Chart Placeholder */}
            <div className="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-3xl">
               <PieChart className="w-10 h-10 text-slate-200" />
               <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax Efficiency</div>
                  <div className="text-sm font-bold text-slate-800">Your Income is {100 - result.effectiveRate}% Tax-Free</div>
               </div>
            </div>

          </div>
        }
        faqSection={<CalcFAQ faqs={faqs} />}
      />
    </CalculatorErrorBoundary>
  );
}
