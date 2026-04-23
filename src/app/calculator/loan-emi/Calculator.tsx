'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, PieChart, Info, Calendar, Target, Calculator, Table, Activity } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { safeCalculateEMI } from '@/utils/math/safeCalculations';

const DEFAULT_STATE = { 
  principal: 1000000, 
  rate: 11.5, 
  tenure: 15, 
  method: 'reducing' as 'reducing' | 'flat', 
  fee: 1, 
  targetEmi: 15000,
  isReverse: false
};

function formatNPR(n: number) {
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN');
}

export default function LoanEMICalculator() {
  const [state, setState] = useSyncState('emi_v5', DEFAULT_STATE);
  const { principal, rate, tenure, method, targetEmi, isReverse } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    let activePrincipal = principal;
    const r = rate / 12 / 100;
    const n = tenure * 12;

    if (isReverse) {
      activePrincipal = targetEmi * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
    }

    const baseCalc = safeCalculateEMI(activePrincipal, rate, tenure, method);
    if (!baseCalc.success || !baseCalc.data) return { success: false };

    const baseEmi = baseCalc.data.emi;
    const totalInterest = baseCalc.data.totalInterest;

    const schedule = [];
    let balance = activePrincipal;
    for (let i = 1; i <= Math.min(12, n); i++) {
        const interest = balance * r;
        const principalPaid = baseEmi - interest;
        balance -= principalPaid;
        schedule.push({ month: i, interest, principal: principalPaid, balance: Math.max(0, balance) });
    }

    return { 
      success: true, 
      activePrincipal,
      baseEmi, 
      totalInterest,
      totalPayment: activePrincipal + totalInterest,
      schedule,
      totalMonths: n
    };
  }, [principal, rate, tenure, method, targetEmi, isReverse]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Loan EMI Calculator' }]}
      title={isReverse ? "Loan Affordability Calculator" : "Loan EMI Calculator"}
      description={isReverse 
        ? "Calculate the maximum loan amount you can afford based on your monthly repayment budget." 
        : "Professional EMI calculator for Home, Auto, and Personal loans in Nepal with amortization."
      }
      icon={Landmark}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Calculation Type</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              <button 
                onClick={() => updateState({ isReverse: false })}
                className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${!isReverse ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}
              >
                Direct EMI
              </button>
              <button 
                onClick={() => updateState({ isReverse: true })}
                className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${isReverse ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}
              >
                Affordability
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className={labelCls}>{isReverse ? "Monthly Budget (EMI)" : "Loan Amount (Principal)"}</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={isReverse ? targetEmi : principal} 
                  onChange={e => updateState(isReverse ? { targetEmi: Number(e.target.value) } : { principal: Number(e.target.value) })} 
                  className={inputCls} 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={labelCls}>Interest Rate (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={rate} 
                    onChange={e => updateState({ rate: Number(e.target.value) })} 
                    className={inputCls} 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Tenure (Years)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={tenure} 
                    onChange={e => updateState({ tenure: Number(e.target.value) })} 
                    className={inputCls} 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">yrs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Repayment Method</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {['reducing', 'flat'].map((m) => (
                <button 
                  key={m} 
                  onClick={() => updateState({ method: m as any })}
                  className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${method === m ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}
                >
                  {m} balance
                </button>
              ))}
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Repayment
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          {result.success ? (
            <>
              <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">{isReverse ? "Max Borrowing Capacity" : "Monthly Installment (EMI)"}</div>
                <div className="text-3xl font-black text-[#1A73E8]">{isReverse ? formatNPR(result.activePrincipal!) : formatNPR(result.baseEmi!)}</div>
                <div className="text-[9px] text-[#70757A] font-bold uppercase">{isReverse ? `At ${targetEmi}/mo budget` : `${tenure} years of repayment`}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Interest</div>
                   <div className="text-sm font-black text-[#D93025]">{formatNPR(result.totalInterest!)}</div>
                 </div>
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Payable</div>
                   <div className="text-sm font-black text-[#202124]">{formatNPR(result.totalPayment!)}</div>
                 </div>
              </div>

              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
                 <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
                   <span className="text-[10px] font-bold text-[#70757A] uppercase">First 12 Months Schedule</span>
                   <Table className="w-3 h-3 text-[#1A73E8]" />
                 </div>
                 <div className="max-h-48 overflow-y-auto">
                   <table className="w-full text-left">
                     <thead className="sticky top-0 bg-[#F8F9FA] text-[9px] font-bold uppercase text-[#70757A] border-b border-[#DADCE0]">
                       <tr>
                         <th className="px-3 py-2">Month</th>
                         <th className="px-3 py-2 text-right">Principal</th>
                         <th className="px-3 py-2 text-right">Interest</th>
                         <th className="px-3 py-2 text-right">Balance</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-[#DADCE0]">
                       {result.schedule!.map((row) => (
                         <tr key={row.month} className="text-[10px] hover:bg-[#F8F9FA]">
                           <td className="px-3 py-2 font-bold text-[#5F6368]">#{row.month}</td>
                           <td className="px-3 py-2 text-right text-[#188038] font-mono">{Math.round(row.principal).toLocaleString()}</td>
                           <td className="px-3 py-2 text-right text-[#D93025] font-mono">{Math.round(row.interest).toLocaleString()}</td>
                           <td className="px-3 py-2 text-right font-bold font-mono">{Math.round(row.balance).toLocaleString()}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              </div>

              <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
                <PieChart className="w-4 h-4 text-[#188038] shrink-0" />
                <p className="text-[10px] text-[#202124] leading-tight">Interest accounts for <strong>{((result.totalInterest! / result.totalPayment!) * 100).toFixed(1)}%</strong> of your total repayment.</p>
              </div>
            </>
          ) : (
            <div className="text-center py-10 opacity-30">
               <Activity className="w-10 h-10 mx-auto mb-2" />
               <p className="text-sm">Enter loan details to view report</p>
            </div>
          )}
        </div>
      }
      howToUse={{
        steps: [
          "Choose 'Direct EMI' if you know the loan amount you need.",
          "Choose 'Affordability' to find how much you can borrow with your monthly budget.",
          "Enter the annual interest rate (current bank rates in Nepal range from 9% to 14%).",
          "Set the tenure in years (Home loans typically go up to 15-20 years).",
          "Select 'Reducing Balance' for standard bank loans or 'Flat Rate' for some finance companies."
        ]
      }}
      formula={{
        title: "Loan Repayment Logic",
        description: "The EMI is calculated using the standard formula for Reducing Balance Method.",
        raw: "EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]\nWhere P = Principal, r = monthly interest rate, n = total months."
      }}
      faqs={[
        {
          question: "What is the difference between Reducing and Flat rates?",
          answer: "In Reducing Balance, interest is calculated on the remaining loan amount each month. In Flat Rate, interest is calculated on the original principal for the entire tenure, making it much more expensive."
        },
        {
          question: "How do banks in Nepal calculate EMI?",
          answer: "Most commercial banks in Nepal (A-Class) use the Reducing Balance Method with monthly compounding for Home, Auto, and Personal loans."
        }
      ]}
      sidebar={{
        title: "Loan Toolkit",
        links: [
          { label: "Home Loan Nepal", href: "/calculator/nepal-home-loan" },
          { label: "Vehicle Tax Nepal", href: "/calculator/nepal-vehicle-tax" },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax" },
          { label: "SIP Calculator", href: "/calculator/sip-calculator" },
        ],
        banner: {
          title: "Plan Your Finances",
          description: "Always compare EIR (Effective Interest Rate) before choosing a loan provider in Nepal.",
          image: "/images/loan-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Home Loan", href: "/calculator/nepal-home-loan" },
        { label: "Vehicle Tax", href: "/calculator/nepal-vehicle-tax" },
        { label: "SIP Calculator", href: "/calculator/sip-calculator" }
      ]}
    />
  );
}
