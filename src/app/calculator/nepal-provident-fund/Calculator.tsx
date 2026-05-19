'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Wallet, Landmark, TrendingUp, Info, ShieldCheck, Activity, PieChart, History, ChevronRight } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const DEFAULT_STATE = {
  basicSalary: 40000,
  currentBalance: 0,
  years: 15,
  interestRate: 8.0,
  annualIncrement: 5
};

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function PFCalculator() {
  const [state, setState] = useSyncState('pf_calc_v1', DEFAULT_STATE);
  const { basicSalary, currentBalance, years, interestRate, annualIncrement } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    let balance = currentBalance;
    let salary = basicSalary;
    const history = [];
    
    let totalContribution = 0;
    let totalInterest = 0;

    for (let i = 1; i <= years; i++) {
        const monthlyContribution = salary * 0.20; // 10% + 10%
        const yearlyContribution = monthlyContribution * 12;
        
        // Interest calculation (simplified yearly)
        const interest = (balance + yearlyContribution / 2) * (interestRate / 100);
        
        balance += yearlyContribution + interest;
        totalContribution += yearlyContribution;
        totalInterest += interest;

        history.push({ 
          year: `Year ${i}`, 
          balance: Math.round(balance),
          contribution: Math.round(totalContribution),
          interest: Math.round(totalInterest)
        });

        salary *= (1 + annualIncrement / 100);
    }

    return {
      finalBalance: balance,
      totalContribution,
      totalInterest,
      history
    };
  }, [basicSalary, currentBalance, years, interestRate, annualIncrement]);

  return (
    <ModernCalcLayout
      slug="nepal-provident-fund"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Finance', href: '/finance/' }, { label: 'Provident Fund' }]}
      title="Nepal Provident Fund (EPF) Calculator 2083/84"
      description="Project your retirement savings in Nepal. Calculate EPF/PF growth with statutory 20% contributions, annual salary increments, and compounding interest."
      icon={Landmark}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Basic Monthly Salary (NPR)</label>
               <input type="number" value={basicSalary} onChange={(e) => update({ basicSalary: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
               <p className="text-[9px] text-[#70757A] font-bold uppercase mt-1">Note: PF is calculated on Basic, not Gross.</p>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Current PF Balance (Optional)</label>
               <input type="number" value={currentBalance} onChange={(e) => update({ currentBalance: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Investment Tenure</label>
                  <select value={years} onChange={(e) => update({ years: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all appearance-none cursor-pointer">
                     {[5, 10, 15, 20, 25, 30, 35, 40].map(y => <option key={y} value={y}>{y} Years</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">EPF Interest Rate (%)</label>
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => update({ interestRate: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Expected Annual Salary Increment (%)</label>
               <input type="range" min="0" max="20" step="1" value={annualIncrement} onChange={(e) => update({ annualIncrement: Number(e.target.value) })} className="w-full h-2 bg-[#E8F0FE] rounded-lg appearance-none cursor-pointer accent-[#1A73E8]" />
               <div className="flex justify-between text-[10px] font-bold text-[#5F6368] mt-1">
                  <span>0%</span>
                  <span className="text-[#1A73E8]">{annualIncrement}% Incremental Growth</span>
                  <span>20%</span>
               </div>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E6F4EA] rounded-lg p-10 text-center space-y-2 border border-[#188038]">
             <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider">Estimated Retirement Corpus</div>
             <div className="text-5xl font-black text-[#188038] tracking-tight">{formatNPR(result.finalBalance)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">After {years} Years of Service</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Your Total Contribution</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(result.totalContribution)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Interest Earned</div>
                <div className="text-lg font-black text-[#1A73E8]">{formatNPR(result.totalInterest)}</div>
             </div>
          </div>

          <div className="p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-md flex gap-3">
             <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
             <p className="text-[10px] text-[#202124] font-bold leading-relaxed uppercase">
                Compound Logic: This projection assumes monthly contributions are deposited at the <span className="text-[#1A73E8]">beginning</span> of each period.
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Corpus Growth Chart</h3>
                </div>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.history}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#70757A', fontWeight: 'bold' }} />
                      <YAxis hide />
                      <Tooltip 
                        formatter={(v: number) => formatNPR(v)}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="balance" stroke="#188038" fill="#E6F4EA" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">PF Rules in Nepal</h3>
                </div>
                <div className="space-y-4">
                   {[
                     { l: 'Contribution', d: '10% Employee + 10% Employer' },
                     { l: 'Tax Benefit', d: 'Deductible up to 1/3 of Income or 5L' },
                     { l: 'Withdrawal', d: 'Available upon retirement or after 58 yrs' }
                   ].map((u, i) => (
                     <div key={i} className="flex justify-between items-center p-4 bg-[#F8F9FA] rounded-md border border-[#DADCE0]">
                        <span className="text-[10px] font-black text-[#202124] uppercase">{u.l}</span>
                        <span className="text-[10px] text-[#5F6368] font-bold">{u.d}</span>
                     </div>
                   ))}
                </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your basic monthly salary as per your appointment letter.",
          "Input your current PF balance if you've already started working.",
          "Select the number of years remaining until your retirement.",
          "The tool calculates the compound growth including the 20% statutory contribution.",
          "Review the final retirement pool and total interest earned."
        ]
      }}
      formula={{
        title: "PF Compounding Logic",
        description: "Standard retirement growth formula used by EPF Nepal.",
        raw: "Balance = Current + Σ [ (Monthly × 12) + Yearly Interest ]",
        variables: [
          "Monthly = Basic Salary × 0.20",
          "Interest = Average Balance × Rate %",
          "Salary Growth = Compounded annually"
        ]
      }}
      faqs={[
        { question: "What is the current EPF interest rate in Nepal?", answer: "As of FY 2081/82, the Employees' Provident Fund (Kosh) interest rate is around 8.0%. This rate is reviewed annually by the board." },
        { question: "Can I contribute more than 10%?", answer: "Yes, you can contribute additional amounts voluntarily, but the employer's contribution remains fixed at 10% of your basic salary." },
        { question: "How is PF different from SSF?", answer: "PF (EPF) is a retirement savings pool. SSF (Social Security Fund) is a comprehensive insurance and pension scheme. Many private organizations in Nepal are now migrating from EPF to SSF." }
      ]}
      sidebar={{
        title: "Retirement Hub",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Wallet },
          { label: "Gratuity Calc", href: "/calculator/gratuity-calculator/", icon: History },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: ShieldCheck },
          { label: "SSF vs PF Guide", href: "/blog/ssf-vs-pf-nepal/", icon: Info },
        ],
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "Gratuity Calculator", href: "/calculator/gratuity-calculator/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}
