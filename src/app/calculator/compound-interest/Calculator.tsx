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
      return { year: yr, yearlyInterest: bal, prevBal, balance: bal };
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">The Mathematics of Wealth Generation</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Often referred to as the "eighth wonder of the world," compound interest is the fundamental mathematical engine driving long-term wealth creation. Our <strong className="text-[#202124]">compound interest calculator</strong> goes beyond simple arithmetic, utilizing the standard exponential formula <code className="bg-[#F1F3F4] px-1 rounded">A = P(1 + r/n)^(nt)</code> to project exactly how an initial principal generates interest, and more importantly, how that generated interest begins to generate its own interest.
              </p>
              <p>
                Whether you are analyzing a high-yield savings account, projecting mutual fund growth, or forecasting the maturity of a fixed-term bond, understanding the <strong className="text-[#202124]">daily compound interest calculator</strong> mechanics is crucial. The tool models how varying compounding frequencies, from annual to daily, impact the effective Annual Percentage Yield (APY) of your investment vehicle.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Key Compounding Variables</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">The Power of 'n' (Frequency):</strong> While the nominal interest rate is important, the frequency at which interest is added to your principal (<strong className="text-[#202124]">monthly compound interest calculator</strong> vs. annual) dictates your true yield. More frequent compounding periods result in a marginally higher total return.</li>
              <li><strong className="text-[#188038]">The Time Horizon (t):</strong> Exponentiation means that time is the most powerful variable in the formula. Due to the exponential curve, the interest generated in year 20 will dwarf the interest generated in year 2, making early capital deployment critical.</li>
              <li><strong className="text-[#D93025]">The Rule of 72:</strong> A popular mental shortcut in finance. Divide the number 72 by your annual interest rate to estimate exactly how many years it will take to double your money. For example, at a 10% rate, your money will double in approximately 7.2 years.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your Initial Investment (Principal). This is the lump sum amount you are starting with.",
          "Input the Annual Rate (%), representing the nominal annual interest rate or expected yearly return.",
          "Specify the Period in Years. This determines how long the capital will remain invested and compound.",
          "Select the Compounding Frequency. Use 'Monthly' for typical savings accounts or 'Quarterly' for most fixed deposits.",
          "Review the 'Total Maturity Value' and examine the 'Yearly Projection' ledger to track your year-over-year exponential growth."
        ]
      }}
      formula={{
        title: "Exponential Compounding Formula",
        description: "The universally accepted formula used by financial institutions to calculate compound returns.",
        raw: "A = P(1 + r/n)^(nt)\n\nWhere:\nA = Total Accrued Amount (Principal + Interest)\nP = Initial Principal Balance\nr = Annual Interest Rate (as a decimal, e.g., 10% = 0.10)\nn = Number of times interest is compounded per year\nt = Number of years the amount is deposited/invested"
      }}
      faqs={[
        {
          question: "What is the difference between simple and compound interest?",
          answer: "Simple interest is calculated only on the original principal amount. Compound interest is calculated on the original principal PLUS all accumulated interest from previous periods. Over time, compounding produces significantly higher returns."
        },
        {
          question: "Which compounding frequency gives the best return?",
          answer: "The more frequent the compounding, the higher your total return. Daily compounding yields slightly more than monthly, which yields more than quarterly, which yields more than annual compounding, assuming the nominal interest rate is identical."
        },
        {
          question: "How do I calculate effective Annual Percentage Yield (APY)?",
          answer: "APY takes the compounding frequency into account to give you the 'true' annual rate. If your nominal rate is 10% compounded monthly, your APY is actually 10.47%. The formula is APY = (1 + r/n)^n - 1."
        },
        {
          question: "What is the Rule of 72?",
          answer: "The Rule of 72 is a quick mental math formula used to estimate how long it takes an investment to double in value. You divide 72 by the annual interest rate. For example, at a 12% return, your money doubles in roughly 6 years (72 / 12 = 6)."
        },
        {
          question: "Can I use this to calculate inflation?",
          answer: "Yes, you can use the compound interest formula in reverse to calculate the degrading power of inflation. If inflation is 5% annually, an item that costs Rs. 100 today will cost Rs. 162 in 10 years, calculated identically to compounding."
        },
        {
          question: "Should I focus on a higher interest rate or a longer time period?",
          answer: "While a higher rate accelerates growth, time is mathematically the most powerful variable due to its position as the exponent (nt) in the formula. Starting 10 years earlier with a moderate rate often beats starting late with a high rate."
        }
      ]}
      sidebar={{
        title: "Finance Toolkit",
        links: [
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
