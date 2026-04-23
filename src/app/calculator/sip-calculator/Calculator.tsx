'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, PieChart, Info, BarChart3, LineChart, Target, Calculator } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const DEFAULT_STATE = { 
  monthly: 5000, 
  rate: 12, 
  years: 10, 
  stepUp: 10 
};

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

export default function SIPCalculator() {
  const [state, setState] = useSyncState('sip_v4', DEFAULT_STATE);
  const { monthly, rate, years, stepUp } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const result = useMemo(() => {
    const r = rate / 12 / 100;
    const s = stepUp / 100;
    let fv = 0, totalInvested = 0, currentMonthly = monthly;
    const schedule: { year: number; invested: number; returns: number; balance: number }[] = [];
    for (let year = 1; year <= years; year++) {
      for (let m = 1; m <= 12; m++) { 
        fv = (fv + currentMonthly) * (1 + r); 
        totalInvested += currentMonthly; 
      }
      schedule.push({ year, invested: totalInvested, returns: fv - totalInvested, balance: fv });
      currentMonthly = currentMonthly * (1 + s);
    }
    return { fv, totalInvested, returns: fv - totalInvested, schedule };
  }, [monthly, rate, years, stepUp]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'SIP Calculator' }]}
      title="SIP Investment Calculator"
      description="Plan your wealth with Systematic Investment Plans (SIP) and annual step-ups for maximum growth in Nepal's markets."
      icon={TrendingUp}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Monthly Investment (NPR)</label>
            <div className="relative">
              <input 
                type="number" 
                value={monthly} 
                onChange={e => updateState({ monthly: Number(e.target.value) })} 
                className={inputCls} 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Return Rate (p.a.)</label>
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
              <label className={labelCls}>Period (Years)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={years} 
                  onChange={e => updateState({ years: Number(e.target.value) })} 
                  className={inputCls} 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">yrs</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Annual Step-Up (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={stepUp} 
                onChange={e => updateState({ stepUp: Number(e.target.value) })} 
                className={inputCls} 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">%</span>
            </div>
            <p className="text-[10px] text-[#70757A]">Increase your monthly investment by this % every year.</p>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Returns
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Estimated Maturity Value</div>
            <div className="text-3xl font-black text-[#1A73E8]">NPR {fmt(result.fv)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">After {years} years of investing</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Invested</div>
               <div className="text-sm font-black text-[#202124]">NPR {fmt(result.totalInvested)}</div>
             </div>
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Gains</div>
               <div className="text-sm font-black text-[#188038]">+ NPR {fmt(result.returns)}</div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Growth Projection</span>
               <LineChart className="w-3 h-3 text-[#1A73E8]" />
             </div>
             <div className="p-4 space-y-4">
               {result.schedule.filter((_, i) => i === 0 || i === Math.floor(years/2) || i === years-1).map((item) => (
                 <div key={item.year} className="space-y-1">
                   <div className="flex justify-between text-[10px] font-bold">
                     <span className="text-[#3C4043]">Year {item.year}</span>
                     <span className="text-[#1A73E8]">NPR {fmt(item.balance)}</span>
                   </div>
                   <div className="h-1.5 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
                     <div className="h-full bg-[#1A73E8]" style={{ width: `${(item.balance / result.fv) * 100}%` }} />
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-center">
            <Target className="w-4 h-4 text-[#F29900] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">Wealth Multiplier: <strong>{(result.fv / (result.totalInvested || 1)).toFixed(2)}x</strong></p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your initial Monthly SIP amount.",
          "Set your expected annual return rate (average for mutual funds is 12-15%).",
          "Choose your investment time horizon in years.",
          "Optional: Set an 'Annual Step-Up %' to reflect yearly salary increments.",
          "Review the maturity value and growth projection for your future wealth."
        ]
      }}
      formula={{
        title: "SIP Calculation Formula",
        description: "The calculator uses the compound interest formula applied monthly with an annual increase in principal.",
        raw: "FV = P × ({[1 + i]^n - 1} / i) × (1 + i)\nWhere i = r/12/100 and n = months."
      }}
      faqs={[
        {
          question: "What is an SIP Step-Up?",
          answer: "Step-up SIP allows you to increase your monthly investment by a fixed percentage every year. This significantly boosts your final corpus due to the power of compounding."
        },
        {
          question: "Are returns from SIP guaranteed?",
          answer: "No, mutual fund and stock market investments are subject to market risks. SIP return rates used here are estimates for planning purposes."
        },
        {
          question: "Is SIP better than Lumpsum?",
          answer: "SIP is often preferred as it averages out the cost of investment (Rupee Cost Averaging) and helps build a disciplined saving habit."
        }
      ]}
      sidebar={{
        title: "Investment Toolkit",
        links: [
          { label: "Lumpsum Calculator", href: "/calculator/lumpsum-calculator" },
          { label: "FD Calculator (Nepal)", href: "/calculator/fd-calculator" },
          { label: "SWP Calculator", href: "/calculator/swp-calculator" },
          { label: "Retirement Planner", href: "/calculator/retirement" },
        ],
        banner: {
          title: "Build Generational Wealth",
          description: "Even small amounts invested consistently via SIP can grow into substantial wealth over 15-20 years.",
          image: "/images/investment-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Lumpsum Calculator", href: "/calculator/lumpsum-calculator" },
        { label: "FD Calculator", href: "/calculator/fd-calculator" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax" }
      ]}
    />
  );
}
