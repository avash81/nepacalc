'use client';
import { useMemo, useState } from 'react';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { QuickPresets } from '@/components/calculator/QuickPresets';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { safeCalculateEMI } from '@/utils/math/safeCalculations';
import { Target, PieChart, Info, Landmark, Calendar, ChevronRight } from 'lucide-react';

const LOAN_PRESETS: any[] = [
  { name: 'Personal', description: '5 Lakh @ 12%', icon: 'briefcase', values: { principal: 500000, rate: 12, tenure: 3, method: 'reducing' } },
  { name: 'Home Loan', description: '50 Lakh @ 9%', icon: 'home', values: { principal: 5000000, rate: 9, tenure: 15, method: 'reducing' } },
  { name: 'Auto Loan', description: '20 Lakh @ 11%', icon: 'car', values: { principal: 2000000, rate: 11, tenure: 5, method: 'reducing' } },
];

const DEFAULT_STATE = { 
  principal: 1000000, 
  rate: 11.5, 
  tenure: 15, 
  method: 'reducing' as 'reducing' | 'flat', 
  fee: 1, 
  targetEmi: 15000,
  isReverse: false
};

export default function LoanEMICalculator() {
  const [state, setState] = useSyncState('emi_v5', DEFAULT_STATE);
  const { principal, rate, tenure, method, fee, targetEmi, isReverse } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    let activePrincipal = principal;
    const r = rate / 12 / 100;
    const n = tenure * 12;

    if (isReverse) {
      activePrincipal = targetEmi * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
    }

    const baseCalc = safeCalculateEMI(activePrincipal, rate, tenure, method);
    if (!baseCalc.success || !baseCalc.data) return { success: false, error: baseCalc.error };

    const baseEmi = baseCalc.data.emi;
    const totalInterest = baseCalc.data.totalInterest;

    // Amortization (Brief)
    const schedule = [];
    let balance = activePrincipal;
    for (let i = 1; i <= Math.min(60, n); i++) {
        const interest = balance * r;
        const principalPaid = baseEmi - interest;
        balance -= principalPaid;
        schedule.push({ month: i, interest, principal: principalPaid, balance: Math.max(0, balance) });
    }

    return { 
      success: true, 
      activePrincipal: Math.round(activePrincipal),
      baseEmi, 
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(activePrincipal + totalInterest),
      schedule,
      totalMonths: n
    };
  }, [principal, rate, tenure, method, targetEmi, isReverse]);

  const formatNPR = (n: number) => 
    new Intl.NumberFormat('en-NP', { 
      style: 'currency', 
      currency: 'NPR', 
      maximumFractionDigits: 0 
    }).format(n);

  return (
    <CalculatorErrorBoundary calculatorName="Loan EMI">
      <CalculatorLayout
        title={isReverse ? "Reverse Loan Affordability" : "Loan EMI Calculator"}
        description={isReverse 
          ? "Calculate the maximum loan amount you can support based on your monthly budget." 
          : "Professional EMI calculator for reducing balance and flat rate loans in Nepal."
        }
        badge="Pro"
        badgeColor="indigo"
        category={{ label: 'Finance', href: '/calculator/category/finance' }}
        leftPanel={
          <div className="space-y-8">
            <div className="flex bg-slate-900 p-1.5 rounded-2xl shadow-xl">
               <button onClick={() => updateState({ isReverse: false })}
                 className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${!isReverse ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-white'}`}>
                 Direct EMI
               </button>
               <button onClick={() => updateState({ isReverse: true })}
                 className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${isReverse ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : 'text-slate-500 hover:text-white'}`}>
                 <Target className="w-3 h-3 inline mr-1 mb-0.5" /> Affordability
               </button>
            </div>

            <QuickPresets presets={LOAN_PRESETS} onSelect={(p: any) => updateState({ ...p.values, isReverse: false })} />
            
            <div className="space-y-8">
              {isReverse ? (
                <ValidatedInput label="Max Affordable Monthly EMI" value={targetEmi} onChange={(v) => updateState({ targetEmi: v })} min={1000} max={1000000} step={500} required prefix="NPR" withSlider />
              ) : (
                <ValidatedInput label="Loan Principal Amount" value={principal} onChange={(v) => updateState({ principal: v })} min={50000} max={100000000} step={50000} required prefix="NPR" withSlider />
              )}
              
              <div className="grid grid-cols-2 gap-6">
                 <ValidatedInput label="Rate (p.a.)" value={rate} onChange={(v) => updateState({ rate: v })} min={1} max={30} step={0.25} required suffix="%" withSlider />
                 <ValidatedInput label="Tenure" value={tenure} onChange={(v) => updateState({ tenure: v })} min={1} max={30} required suffix="Yrs" withSlider />
              </div>
            </div>

            <div className="flex bg-slate-50 p-1 border border-slate-200 rounded-xl overflow-hidden">
                {['reducing', 'flat'].map((m) => (
                  <button key={m} onClick={() => updateState({ method: m as any })}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${method === m ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                    {m} Balance
                  </button>
                ))}
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-6">
            {result.success && result.activePrincipal ? (
              <>
                <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] text-center shadow-xl shadow-indigo-500/5 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <Landmark className="w-40 h-40" />
                   </div>
                   <div className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">
                     {isReverse ? 'Borrowing Capacity' : 'Monthly Installment'}
                   </div>
                   <div className="text-6xl font-black text-slate-900 tracking-tighter mb-4 font-mono group-hover:scale-105 transition-transform">
                     {isReverse ? formatNPR(result.activePrincipal) : formatNPR(result.baseEmi!)}
                   </div>
                   <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-6 py-1.5 rounded-full inline-block">
                     {isReverse ? `${formatNPR(targetEmi)} / mo` : `${tenure} Years Tenure`}
                   </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                   <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center group">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors shadow-sm"><Info className="w-5 h-5" /></div>
                         <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Total Interest</div>
                      </div>
                      <span className="text-sm font-black text-slate-900">{formatNPR(result.totalInterest!)}</span>
                   </div>
                   
                   <div className="p-6 bg-white border-2 border-slate-50 rounded-3xl flex justify-between items-center group">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300"><PieChart className="w-5 h-5" /></div>
                         <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Repayment Value</div>
                      </div>
                      <span className="text-sm font-black text-slate-900">{formatNPR(result.totalPayment!)}</span>
                   </div>
                </div>

                {/* Amortization Table Snippet */}
                <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
                   <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between">
                      <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Initial Schedule</h4>
                      <Calendar className="w-4 h-4 text-slate-600" />
                   </div>
                   <div className="p-2 overflow-x-auto scrollbar-hide">
                      <table className="w-full text-left">
                         <thead>
                           <tr className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                              <th className="p-4">Month</th>
                              <th className="p-4 text-right">Principal</th>
                              <th className="p-4 text-right">Interest</th>
                              <th className="p-4 text-right">Balance</th>
                           </tr>
                         </thead>
                         <tbody className="text-[10px] font-mono">
                           {result.schedule!.slice(0, 5).map(row => (
                             <tr key={row.month} className="border-b border-white/5 text-slate-400 hover:bg-white/5 transition-colors">
                               <td className="p-4">#{row.month}</td>
                               <td className="p-4 text-right text-emerald-400">{Math.round(row.principal).toLocaleString()}</td>
                               <td className="p-4 text-right text-rose-400">{Math.round(row.interest).toLocaleString()}</td>
                               <td className="p-4 text-right text-white font-black">{Math.round(row.balance).toLocaleString()}</td>
                             </tr>
                           ))}
                         </tbody>
                      </table>
                      <div className="p-4 text-center border-t border-white/5 bg-white/5">
                         <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Showing first 5 of {result.totalMonths} months</p>
                      </div>
                   </div>
                </div>
              </>
            ) : null}
          </div>
        }
        faqSection={<CalcFAQ faqs={[
          { question: "Reducing vs Flat Rate?", answer: "Reducing balance calculates interest on the remaining principal, saving you money. Flat rate calculates interest on the full original principal for the entire duration." },
          { question: "What is Loan Affordability?", answer: "It is a goal-seek calculation that determines exactly how much you can borrow based on your disposable monthly income." }
        ]} />}
      />
    </CalculatorErrorBoundary>
  );
}

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }
