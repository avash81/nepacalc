'use client';
import { useMemo, useState } from 'react';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { QuickPresets } from '@/components/calculator/QuickPresets';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSyncState } from '@/hooks/useSyncState';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ResultDisplay } from '@/components/calculator/ResultDisplay';
import { safeCalculateEMI } from '@/utils/math/safeCalculations';
import { Target, RefreshCw } from 'lucide-react';

const LOAN_PRESETS: any[] = [
  { name: 'Personal Loan', description: 'NPR 5 Lakh @ 12%', icon: 'briefcase', values: { principal: 500000, rate: 12, tenure: 3, method: 'reducing', extraMonthly: 0 } },
  { name: 'Home Loan', description: 'NPR 50 Lakh @ 8.5%', icon: 'home', values: { principal: 5000000, rate: 8.5, tenure: 20, method: 'reducing', extraMonthly: 0 } },
  { name: 'Auto Loan', description: 'NPR 25 Lakh @ 10%', icon: 'car', values: { principal: 1500000, rate: 10, tenure: 5, method: 'reducing', extraMonthly: 0 } },
];

const DEFAULT_STATE = { 
  principal: 1000000, 
  rate: 11.5, 
  tenure: 15, 
  method: 'reducing' as 'reducing' | 'flat', 
  fee: 1, 
  extraMonthly: 0,
  targetEmi: 15000,
  isReverse: false // Goal Seek mode
};

export default function LoanEMICalculator() {
  const [state, setState] = useSyncState('emi_v4', DEFAULT_STATE);
  const { principal, rate, tenure, method, fee, extraMonthly, targetEmi, isReverse } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...updates });

  // Calculation Logic (Forward & Reverse)
  const result = useMemo(() => {
    let activePrincipal = principal;

    // Goal Seek Logic
    if (isReverse) {
      const r = rate / 12 / 100;
      const n = tenure * 12;
      // Formula: P = EMI * [((1+r)^n - 1) / (r * (1+r)^n)]
      activePrincipal = targetEmi * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
    }

    const baseCalc = safeCalculateEMI(activePrincipal, rate, tenure, method);
    if (!baseCalc.success || !baseCalc.data) return { success: false, error: baseCalc.error };

    const baseEmi = baseCalc.data.emi;
    const actualMonthlyPayment = baseEmi + extraMonthly;
    const totalInterest = baseCalc.data.totalInterest;
    
    return { 
      success: true, 
      activePrincipal: Math.round(activePrincipal),
      baseEmi, 
      actualMonthlyPayment, 
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(activePrincipal + totalInterest),
    };
  }, [principal, rate, tenure, method, extraMonthly, targetEmi, isReverse]);

  const formatNPR = (n: number) => new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR', maximumFractionDigits: 0 }).format(n);

  return (
    <CalculatorErrorBoundary calculatorName="Loan EMI">
      <CalculatorLayout
        title={isReverse ? "Reverse EMI (Goal Seek)" : "Loan EMI Calculator"}
        description={isReverse 
          ? "Find the maximum loan amount you can afford based on your monthly budget." 
          : "Calculate your monthly EMI and total interest for various loan types in Nepal."
        }
        purpose="Financial Planning"
        category={{ label: 'Finance', href: '/calculator/category/finance' }}
        leftPanel={
          <div className="space-y-8">
            {/* Goal Seek Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl shadow-xl">
               <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isReverse ? 'bg-blue-600' : 'bg-slate-800'}`}>
                     <Target className="w-5 h-5" />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Mode: {isReverse ? 'Goal Seek' : 'Forward'}</div>
                     <div className="text-xs font-bold">{isReverse ? 'Find Max Loan Amount' : 'Find Monthly EMI'}</div>
                  </div>
               </div>
               <button 
                  onClick={() => updateState({ isReverse: !isReverse })}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border border-white/5"
               >
                  Switch Mode
               </button>
            </div>

            <QuickPresets presets={LOAN_PRESETS} onSelect={(p: any) => updateState({ ...p.values, isReverse: false })} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
              {isReverse ? (
                <ValidatedInput label="Affordable EMI (NPR)" value={targetEmi} onChange={(v) => updateState({ targetEmi: v })} min={1000} max={1000000} step={500} required hint="How much can you pay per month?" withSlider />
              ) : (
                <ValidatedInput label="Loan Amount (NPR)" value={principal} onChange={(v) => updateState({ principal: v })} min={50000} max={100000000} step={50000} required withSlider formatter={formatNPR} />
              )}
              <ValidatedInput label="Interest Rate (%)" value={rate} onChange={(v) => updateState({ rate: v })} min={1} max={30} step={0.25} required withSlider suffix="%" />
              <ValidatedInput label="Tenure (Years)" value={tenure} onChange={(v) => updateState({ tenure: v })} min={1} max={50} required withSlider suffix=" Yrs" />
              <ValidatedInput label="Processing Fee (%)" value={fee} onChange={(v) => updateState({ fee: v })} min={0} max={10} step={0.1} withSlider suffix="%" />
            </div>

            <div className="flex p-1 bg-slate-100 rounded-xl">
                {['reducing', 'flat'].map((m) => (
                  <button key={m} onClick={() => updateState({ method: m as 'reducing' | 'flat' })}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${method === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                    {m} Balance
                  </button>
                ))}
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-6">
            {result.success ? (
              <>
                <ResultDisplay 
                  title="Loan Calculation"
                  primaryResult={isReverse ? {
                    label: "Max Loan Possible",
                    value: formatNPR(result.activePrincipal!),
                    description: `At ${rate}% for ${tenure} years`,
                    bgColor: 'bg-slate-900',
                  } : {
                    label: "Monthly EMI",
                    value: formatNPR(result.baseEmi!),
                    description: "Reducing Balance",
                    bgColor: 'bg-[#003366]',
                  }}
                  secondaryResults={[
                    { label: 'Total Interest', value: formatNPR(result.totalInterest!) },
                    { label: 'Total Repayment', value: formatNPR(result.totalPayment!) },
                    { label: 'Processing Fee', value: formatNPR(Math.round((fee/100) * result.activePrincipal!)) },
                  ]}
                  interpretation={isReverse ? {
                    variant: 'success',
                    text: `You can borrow up to ${formatNPR(result.activePrincipal!)} with a monthly budget of ${formatNPR(targetEmi)}.`
                  } : {
                    variant: 'info',
                    text: `Your EMI will be ${formatNPR(result.baseEmi!)} per month for ${tenure * 12} installments.`
                  }}
                />
              </>
            ) : (
              <div className="p-6 bg-rose-50 text-rose-600 font-bold text-xs border border-rose-100 rounded-2xl">
                {result.error}
              </div>
            )}
          </div>
        }
        faqSection={<CalcFAQ faqs={[
          { question: "What is Goal Seek for EMI?", answer: "Goal Seek (or Reverse Calculation) lets you enter your desired monthly payment to find out the maximum loan amount you can qualify for based on current interest rates and tenure." }
        ]} />}
      />
    </CalculatorErrorBoundary>
  );
}

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }
