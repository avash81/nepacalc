'use client';
import { useMemo, useState } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { Landmark, TrendingDown, PieChart, ShieldCheck, Info } from 'lucide-react';

const KTM_BANKS = [
  { name: 'NIC Asia Bank', base: 8.25, premium: '1.5 - 3.5' },
  { name: 'Nabil Bank', base: 7.95, premium: '2.0 - 4.0' },
  { name: 'Global IME', base: 8.40, premium: '1.0 - 3.0' },
  { name: 'Everest Bank', base: 7.80, premium: '2.5 - 5.0' },
  { name: 'Sanima Bank', base: 8.10, premium: '1.5 - 3.0' },
];

export default function NepalHomeLoanCalculator() {
  const [state, setState] = useSyncState('nepal_home_loan_institutional_v1', {
    principal: 5000000,
    baseRate: 8.25,
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

    return { emi, totalPayment, totalInterest };
  }, [principal, effectiveRate, tenureYears]);

  const fmt = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-IN');

  return (
    <CalculatorLayout
      title="Institutional Home Loan Dashboard"
      description="Professional banking calculator for Nepal. Uses the 'Base Rate + Premium' model mandated by NRB for commercial bank loans."
      category="nepal"
      leftPanel={
        <div className="space-y-8">
          
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
             <h3 className="text-[12px] font-black uppercase text-slate-400 tracking-widest mb-8">Loan Parameters</h3>
             <div className="space-y-10">
                <ValidatedInput 
                  label="Loan Principal Amount" 
                  value={principal} 
                  onChange={v => update({ principal: v })} 
                  prefix="Rs." 
                  min={100000} 
                  max={100000000}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <ValidatedInput 
                     label="Bank Base Rate" 
                     value={baseRate} 
                     onChange={v => update({ baseRate: v })} 
                     suffix="%" 
                     step={0.01}
                   />
                   <ValidatedInput 
                     label="Premium over Base" 
                     value={premium} 
                     onChange={v => update({ premium: v })} 
                     suffix="%" 
                     step={0.25}
                   />
                </div>

                <ValidatedInput 
                  label="Repayment Tenure" 
                  value={tenureYears} 
                  onChange={v => update({ tenureYears: v })} 
                  suffix="Years" 
                  min={1} 
                  max={30}
                />
             </div>
          </div>

          {/* Bank Comparison Grid */}
          <div className="bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-10">
             <div className="flex items-center gap-3 mb-8">
                <Landmark className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Interest Rate Benchmarks (2081/82)</h3>
             </div>
             
             <div className="grid grid-cols-1 gap-3">
                {KTM_BANKS.map(bank => (
                  <button 
                    key={bank.name}
                    onClick={() => update({ baseRate: bank.base })}
                    className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl hover:border-blue-500 transition-all group shadow-sm"
                  >
                    <div className="flex flex-col items-start">
                       <span className="text-[12px] font-black text-slate-900">{bank.name}</span>
                       <span className="text-[10px] font-bold text-slate-400">Premium: {bank.premium}%</span>
                    </div>
                    <div className="text-right">
                       <div className="text-sm font-black text-blue-600 font-mono">{bank.base}%</div>
                       <div className="text-[9px] font-bold text-slate-400 uppercase">Base Rate</div>
                    </div>
                  </button>
                ))}
             </div>
             
             <div className="mt-8 p-5 bg-blue-50 border border-blue-100 rounded-3xl flex gap-4">
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic">
                   "Base rates are updated quarterly by banks. Fixed-rate home loans are also available but typically carry a higher premium (up to 12.5%)."
                </p>
             </div>
          </div>

        </div>
      }
      rightPanel={
        <div className="space-y-6">
          
          {/* Main Visualized Result */}
          <div className="p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative group shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-indigo-500/40 transition-all duration-1000" />
            <div className="relative z-10 text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-8">Estimated Monthly Installment</div>
              <div className="text-6xl font-black tracking-tighter mb-4">{Math.round(results.emi).toLocaleString('en-IN')}</div>
              <div className="text-lg font-bold text-slate-400 mb-10">Rupees Per Month</div>
              
              <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/10">
                 <div className="text-left">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Effective Rate</div>
                    <div className="text-xl font-black text-indigo-400">{effectiveRate.toFixed(2)}% <span className="text-xs">p.a</span></div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Savings</div>
                    <div className="text-xl font-black text-emerald-400">---</div>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm italic transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                   <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Interest Exposure</h4>
                   <TrendingDown className="w-4 h-4 text-rose-500" />
                </div>
                <div className="space-y-5">
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-600">Total Interest Payable</span>
                      <span className="text-sm font-black text-rose-600 font-mono">{fmt(results.totalInterest)}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-600">Total Repayment Amount</span>
                      <span className="text-sm font-black text-slate-900 font-mono">{fmt(results.totalPayment)}</span>
                   </div>
                   <div className="pt-4 mt-4 border-t border-slate-50">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                         <span>Principal</span>
                         <span>Interest</span>
                      </div>
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                         <div 
                           className="bg-indigo-600 h-full transition-all duration-1000" 
                           style={{ width: `${(principal/results.totalPayment)*100}%` }} 
                         />
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex gap-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                   <h5 className="text-[11px] font-black text-emerald-900 uppercase tracking-widest mb-1">Tax Benefit Eligibility</h5>
                   <p className="text-[11px] text-emerald-800 font-medium leading-[1.6]">
                      You may be eligible for an annual income tax deduction of up to <strong>Rs. 25,000</strong> on interest paid for your primary residence.
                   </p>
                </div>
             </div>
          </div>

        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'What is the LTV ratio in Nepal?', answer: 'For residential home loans, the Loan-to-Value (LTV) ratio is typically 70% inside Kathmandu Valley and 80% outside.' },
          { question: 'How is the effective rate calculated?', answer: 'Banks use a "Base Rate + Premium" model. The premium remains fixed, while the base rate can change quarterly depending on market conditions.' },
          { question: 'Can I repay my home loan early?', answer: 'Yes, but most banks in Nepal charge a "Pre-payment Fee" ranging from 0.5% to 2% of the settled amount.' },
          { question: 'What documents are required?', answer: 'Standard requirements include Property Lalpurja, Blue Print, Tax Clearance, Salary Certificate/Audit Report, and 4-generation family details.' },
        ]} />
      }
    />
  );
}
