'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, LineChart, PieChart, Info, Calendar, Target, Calculator, Table } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

const COMPOUNDING = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-Annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
];

export default function CompoundInterestCalculator() {
  const [state, setState] = useSyncState('compound_interest_v4', {
    principal: 100000,
    rate: 10,
    years: 10,
    compounding: 1
  });
  const { principal, rate, years, compounding } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const r = rate / 100, n = compounding;
    const amount = principal * Math.pow(1 + r / n, n * years);
    const totalInterest = amount - principal;
    const schedule = Array.from({ length: Math.min(years, 30) }, (_, i) => {
      const yr = i + 1;
      const bal = principal * Math.pow(1 + r / n, n * yr);
      const prevBal = principal * Math.pow(1 + r / n, n * (yr - 1));
      return { year: yr, yearlyInterest: bal - prevBal, balance: bal };
    });
    return { amount, totalInterest, schedule };
  }, [principal, rate, years, compounding]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Compound Interest' }]}
      title="Compound Interest Calculator"
      description="Calculate the power of compounding on your savings and investments. See how frequency impacts your total wealth over time."
      icon={TrendingUp}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Initial Investment (Principal)</label>
            <div className="relative">
              <input 
                type="number" 
                value={principal} 
                onChange={e => update({ principal: Number(e.target.value) })} 
                className={inputCls} 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Annual Rate (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={rate} 
                  onChange={e => update({ rate: Number(e.target.value) })} 
                  className={inputCls} 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Period (Years)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={years} 
                  onChange={e => update({ years: Number(e.target.value) })} 
                  className={inputCls} 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">yrs</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Compounding Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {COMPOUNDING.map(c => (
                <button 
                  key={c.value} 
                  onClick={() => update({ compounding: c.value })}
                  className={`py-2 text-[10px] font-bold uppercase border rounded-md transition-all ${compounding === c.value ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Interest
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Maturity Value</div>
            <div className="text-3xl font-black text-[#1A73E8]">NPR {fmt(result.amount)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">After {years} years of compounding</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Initial Principal</div>
               <div className="text-sm font-black text-[#202124]">NPR {fmt(principal)}</div>
             </div>
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Interest</div>
               <div className="text-sm font-black text-[#188038]">+ NPR {fmt(result.totalInterest)}</div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Yearly Projection</span>
               <Table className="w-3 h-3 text-[#1A73E8]" />
             </div>
             <div className="max-h-48 overflow-y-auto">
               <table className="w-full text-left">
                 <thead className="sticky top-0 bg-[#F8F9FA] text-[9px] font-bold uppercase text-[#70757A] border-b border-[#DADCE0]">
                   <tr>
                     <th className="px-3 py-2">Year</th>
                     <th className="px-3 py-2 text-right">Interest</th>
                     <th className="px-3 py-2 text-right">Balance</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#DADCE0]">
                   {result.schedule.map((row) => (
                     <tr key={row.year} className="text-[11px] hover:bg-[#F8F9FA]">
                       <td className="px-3 py-2 font-bold">{row.year}</td>
                       <td className="px-3 py-2 text-right text-[#188038] font-mono">+{fmt(row.yearlyInterest)}</td>
                       <td className="px-3 py-2 text-right font-bold font-mono">NPR {fmt(row.balance)}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
            <PieChart className="w-4 h-4 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">Your money grows <strong>{((result.totalInterest / principal) * 100).toFixed(1)}%</strong> over the selected period.</p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your initial deposit amount (Principal).",
          "Input the annual interest rate offered by your bank or investment.",
          "Choose the duration (Years) you plan to keep the money invested.",
          "Select the compounding frequency (e.g., Monthly for savings accounts, Quarterly for FDs).",
          "Review the maturity value and the yearly interest accumulation table."
        ]
      }}
      formula={{
        title: "Compound Interest Formula",
        description: "The formula calculates interest on both the initial principal and the accumulated interest from previous periods.",
        raw: "A = P(1 + r/n)^(nt)\nWhere A = Total Amount, P = Principal, r = annual rate, n = compounding frequency, t = years."
      }}
      faqs={[
        {
          question: "How is compounding different from simple interest?",
          answer: "Simple interest is calculated only on the principal, whereas compound interest is calculated on the principal plus any interest that has already been added."
        },
        {
          question: "Does compounding frequency matter?",
          answer: "Yes, the more frequently interest is compounded, the higher the final amount. Monthly compounding yields slightly more than annual compounding for the same rate."
        }
      ]}
      sidebar={{
        title: "Finance Toolkit",
        links: [
          { label: "SIP Calculator", href: "/calculator/sip-calculator" },
          { label: "Lumpsum Plan", href: "/calculator/lumpsum-calculator" },
          { label: "FD Calculator", href: "/calculator/fd-calculator" },
          { label: "Simple Interest", href: "/calculator/simple-interest" },
        ],
        banner: {
          title: "Start Compounding Early",
          description: "The most powerful factor in compounding is time. Starting just a few years earlier can double your results.",
          image: "/images/finance-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "SIP Calculator", href: "/calculator/sip-calculator" },
        { label: "FD Calculator", href: "/calculator/fd-calculator" },
        { label: "Simple Interest", href: "/calculator/simple-interest" }
      ]}
    />
  );
}
