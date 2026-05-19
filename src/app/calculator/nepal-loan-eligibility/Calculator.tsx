'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Wallet, Landmark, TrendingUp, Info, ShieldCheck, ArrowRight, PieChart, History, ChevronRight } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const DEFAULT_STATE = {
  monthlyIncome: 100000,
  existingEmi: 0,
  interestRate: 12.5,
  tenureYears: 15,
  foir: 50 // Fixed Obligation to Income Ratio
};

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function LoanEligibilityCalculator() {
  const [state, setState] = useSyncState('loan_eligibility_v1', DEFAULT_STATE);
  const { monthlyIncome, existingEmi, interestRate, tenureYears, foir } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const maxEmiAllowed = (monthlyIncome * (foir / 100));
    const availableEmi = Math.max(0, maxEmiAllowed - existingEmi);
    
    const r = (interestRate / 100) / 12;
    const n = tenureYears * 12;
    
    // Loan Formula: P = EMI * [1 - (1 + r)^-n] / r
    let eligibleLoan = 0;
    if (r > 0) {
        eligibleLoan = availableEmi * (1 - Math.pow(1 + r, -n)) / r;
    } else {
        eligibleLoan = availableEmi * n;
    }

    return {
      maxEmiAllowed,
      availableEmi,
      eligibleLoan,
      dti: ((existingEmi / monthlyIncome) * 100).toFixed(1)
    };
  }, [monthlyIncome, existingEmi, interestRate, tenureYears, foir]);

  return (
    <ModernCalcLayout
      slug="nepal-loan-eligibility"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Finance', href: '/finance/' }, { label: 'Loan Eligibility' }]}
      title="Nepal Loan Eligibility Calculator 2083/84"
      description="Estimate the maximum loan amount you can borrow from Nepalese banks. Calibrated against NRB debt-to-income limits and typical banking FOIR standards."
      icon={TrendingUp}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Monthly Income (NPR)</label>
               <input type="number" value={monthlyIncome} onChange={(e) => update({ monthlyIncome: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Existing Monthly EMIs (NPR)</label>
               <input type="number" value={existingEmi} onChange={(e) => update({ existingEmi: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Interest Rate (% P.A.)</label>
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => update({ interestRate: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Tenure (Years)</label>
                  <select value={tenureYears} onChange={(e) => update({ tenureYears: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all appearance-none cursor-pointer">
                     {[5, 10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} Years</option>)}
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Bank FOIR Limit (%)</label>
               <div className="grid grid-cols-3 gap-2">
                  {[40, 50, 60].map(val => (
                    <button key={val} onClick={() => update({ foir: val })} className={`h-11 rounded-md border text-[11px] font-black transition-all ${foir === val ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>
                       {val}% {val === 50 ? '(Standard)' : ''}
                    </button>
                  ))}
               </div>
               <p className="text-[9px] text-[#70757A] font-bold uppercase mt-1">FOIR = Fixed Obligation to Income Ratio</p>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Maximum Eligible Loan</div>
             <div className="text-4xl font-black text-[#1A73E8] tracking-tight">{formatNPR(result.eligibleLoan)}</div>
             <div className="flex justify-center mt-2">
                <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0] shadow-sm">
                   Based on {interestRate}% for {tenureYears} Yrs
                </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Max EMI Allowed</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(result.maxEmiAllowed)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">Surplus EMI</div>
                <div className="text-lg font-black text-[#188038]">{formatNPR(result.availableEmi)}</div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-lg p-5 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-[#202124] uppercase">Debt Burden (DTI)</span>
                <span className={`text-sm font-black ${Number(result.dti) > foir ? 'text-[#D93025]' : 'text-[#188038]'}`}>{result.dti}%</span>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className={`h-full ${Number(result.dti) > foir ? 'bg-[#D93025]' : 'bg-[#188038]'}`} style={{ width: `${Math.min(100, (Number(result.dti) / foir) * 100)}%` }} />
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Landmark className="w-24 h-24 text-[#1A73E8]" /></div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Eligibility Logic</h3>
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed relative z-10 mb-6">
                  Banks in Nepal typically limit your total monthly loan installments (EMI) to <strong>50% to 60%</strong> of your gross monthly income. This is known as the FOIR or Debt-to-Income ratio.
                </p>
                <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md">
                   <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-1">NRB Provision</div>
                   <p className="text-[11px] font-bold text-[#5F6368]">Regulatory caps may vary for productive vs. non-productive sectors.</p>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">How to Improve?</h3>
                </div>
                <div className="space-y-4">
                   {[
                     { l: 'Longer Tenure', d: 'Increases eligibility by lowering EMI' },
                     { l: 'Clear Debts', d: 'Closing small loans increases surplus income' },
                     { l: 'Co-Applicant', d: 'Add spouse income to boost overall capacity' }
                   ].map((u, i) => (
                     <div key={i} className="flex items-start gap-3 p-3 bg-[#F8F9FA] rounded-md border border-[#DADCE0]">
                        <div className="w-5 h-5 rounded-full bg-[#E6F4EA] flex items-center justify-center shrink-0 mt-0.5">
                           <TrendingUp className="w-3 h-3 text-[#188038]" />
                        </div>
                        <div>
                           <div className="text-[10px] font-black text-[#202124] uppercase">{u.l}</div>
                           <div className="text-[10px] text-[#5F6368] font-bold">{u.d}</div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your gross monthly salary (before tax and other deductions).",
          "Include all your current monthly EMIs (bike loan, personal loan, etc).",
          "Set the interest rate you expect from the bank (e.g., 12.5%).",
          "Select the loan tenure. Longer tenure = Higher loan eligibility.",
          "Adjust the FOIR limit based on your bank's specific policy (default 50%)."
        ]
      }}
      formula={{
        title: "Eligibility Axiom",
        description: "Standard Banking Multiplier logic used by BFIs in Nepal.",
        raw: "Eligible Loan = (Monthly Surplus EMI × (1 - (1 + r)^-n)) / r",
        variables: [
          "Surplus EMI = (Monthly Income × FOIR%) - Existing EMIs",
          "r = Annual Interest Rate / 12 / 100",
          "n = Tenure in Years × 12"
        ]
      }}
      faqs={[
        { question: "What is FOIR in Nepal banking?", answer: "Fixed Obligation to Income Ratio (FOIR) is the percentage of your monthly income that the bank allows for EMI payments. In Nepal, it is usually 50%, but can go up to 60% for certain professions." },
        { question: "Does my credit score affect eligibility?", answer: "While Nepal doesn't have a numeric 'credit score' like the US, banks check the CICL (Credit Information Bureau) report. Any default in the past can result in immediate rejection." },
        { question: "Can I get a loan if I am self-employed?", answer: "Yes, but you must provide 2 years of audited financial statements and tax clearance certificates. The bank will calculate your eligibility based on average monthly net profit." }
      ]}
      sidebar={{
        title: "Financial Hub",
        links: [
          { label: "Loan EMI Tool", href: "/calculator/loan-emi/", icon: Landmark },
          { label: "Home Loan Calc", href: "/calculator/mortgage-calculator/", icon: Wallet },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: ShieldCheck },
          { label: "Market Rates", href: "/market-rates/", icon: TrendingUp },
        ],
      }}
      relatedTools={[
        { label: "Loan EMI", href: "/calculator/loan-emi/" },
        { label: "Mortgage Calculator", href: "/calculator/mortgage-calculator/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}
