'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { PiggyBank, Info, TrendingUp } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function SavingsCalculator() {
  const [state, setState] = useSyncState('savings_v4', { monthly: 5000, rate: 7, years: 10 });
  const { monthly, rate, years } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const fv = r === 0 ? monthly * n : monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = monthly * n;
    const interest = fv - invested;
    return { fv: Math.round(fv), invested: Math.round(invested), interest: Math.round(interest), pctGrowth: ((interest / invested) * 100).toFixed(1) };
  }, [monthly, rate, years]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Savings Goal' }]}
      title="Monthly Savings Calculator"
      description="Calculate how your regular monthly savings grow over time with compound interest. Plan your long-term wealth with Nepal-specific bank rates."
      icon={PiggyBank}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Monthly Savings Amount</label>
            <div className="relative">
              <input type="number" value={monthly} min={100} onChange={e => update({ monthly: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className={labelCls}>Annual Interest Rate</label>
              <span className="text-[11px] font-black text-[#1A73E8]">{rate}%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[4, 7, 10, 14].map(v => (
                <button key={v} onClick={() => update({ rate: v })}
                  className={`py-2 text-xs font-black border rounded-md transition-all ${rate === v ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>
                  {v}%
                </button>
              ))}
            </div>
            <input type="range" min={1} max={20} step={0.5} value={rate} onChange={e => update({ rate: Number(e.target.value) })} className="w-full accent-[#1A73E8]" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className={labelCls}>Investment Period</label>
              <span className="text-[11px] font-black text-[#1A73E8]">{years} years</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map(v => (
                <button key={v} onClick={() => update({ years: v })}
                  className={`py-2 text-xs font-black border rounded-md transition-all ${years === v ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>
                  {v}yr
                </button>
              ))}
            </div>
            <input type="range" min={1} max={40} step={1} value={years} onChange={e => update({ years: Number(e.target.value) })} className="w-full accent-[#1A73E8]" />
          </div>

          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#70757A] uppercase mb-3">Nepal Rate Guide</div>
            {[['Savings Account', '4–6%'], ['Fixed Deposit', '7–10%'], ['Mutual Fund', '10–14% (est.)']].map(([t, r]) => (
              <div key={t} className="flex justify-between text-[11px] py-1.5 border-b border-[#DADCE0] last:border-0">
                <span className="text-[#5F6368]">{t}</span>
                <span className="font-black text-[#1A73E8]">{r}</span>
              </div>
            ))}
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Savings Growth
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <PiggyBank className="w-4 h-4 text-[#1A73E8]" />
              <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total After {years} Years</span>
            </div>
            <div className="text-3xl font-black text-[#188038]">{fmt(result.fv)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">Grows {result.pctGrowth}% on invested amount</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Invested</div>
              <div className="text-sm font-black">{fmt(result.invested)}</div>
            </div>
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Interest Earned</div>
              <div className="text-sm font-black text-[#188038]">+{fmt(result.interest)}</div>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-[10px] font-bold uppercase text-[#70757A]">
              <span>Principal ({((result.invested / result.fv) * 100).toFixed(0)}%)</span>
              <span>Interest ({((result.interest / result.fv) * 100).toFixed(0)}%)</span>
            </div>
            <div className="h-4 flex rounded-full overflow-hidden">
              <div className="bg-[#1A73E8] transition-all duration-700" style={{ width: `${(result.invested / result.fv) * 100}%` }} />
              <div className="bg-[#188038] flex-1" />
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#188038] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Assumes beginning-of-month deposits compounded monthly. For end-of-month deposits, result will be slightly lower.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">The Strategic Power of Consistent Savings in Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In the context of Nepal's inflationary environment, passive saving is rarely enough to build generational wealth. Our <strong className="text-[#202124]">monthly savings calculator</strong> is an institutional-grade projection engine designed to show how regular capital injections grow through the mathematical phenomenon of compound interest. By shifting from a simple savings mindset to a target-oriented investment strategy, users can effectively outpace inflation.
              </p>
              <p>
                This tool utilizes the <strong>Future Value of Annuity Due</strong> model, which assumes deposits are made at the beginning of each period. This is the most accurate way to model habit-based saving. Whether you are planning for a down payment on a property in Kathmandu or building an emergency fund, understanding the mathematical trajectory of your <strong className="text-[#202124]">savings goal</strong> is the first step toward financial sovereignty.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Optimizing Interest Tiers & Tax Impact</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Interest Rate Hierarchy:</strong> In the Nepalese banking sector, 'A' Class commercial banks offer distinct tiers. While a standard savings account might offer 4–6%, shifting those regular savings into a <strong>Recurring Deposit (RD)</strong> or <strong>Fixed Deposit (FD)</strong> can often secure 7–10% yields, drastically altering the 10-year maturity value.</li>
              <li><strong className="text-[#188038]">The 5% WHT Reality:</strong> Investors must remember that the Inland Revenue Department (IRD) mandates a 5% Withholding Tax (WHT) on interest earned by individuals. Our <strong className="text-[#202124]">bank interest calculator</strong> provides the gross projection, but savvy planners should mentally account for this small friction cost during their redemption phase.</li>
              <li><strong className="text-[#D93025]">Compounding Frequency:</strong> While the calculator uses monthly compounding to match standard banking cycles, the frequency of compounding significantly impacts the final result. Consistently hitting your monthly savings target ensures that the "interest on interest" cycle never breaks, maximizing your wealth multiplier.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your planned 'Monthly Savings Amount'. This should be a realistic figure you can commit to depositing every month.",
          "Set the 'Annual Interest Rate'. Use the 'Nepal Rate Guide' to pick an accurate percentage based on your investment vehicle.",
          "Choose your 'Investment Period' (Time Horizon). Note how even an extra 5 years drastically increases the final amount.",
          "Review the 'Total After X Years' to see your projected gross wealth accumulation.",
          "Examine the Principal vs. Interest chart to visually understand how much of the final value is generated by compounding interest rather than your hard work."
        ]
      }}
      formula={{
        title: "Future Value of an Annuity Due Formula",
        description: "Standard formula used by financial institutions assuming deposits are made at the beginning of each month.",
        raw: "FV = PMT × [((1+r)^n − 1) / r] × (1+r)\n\nWhere:\nFV = Future Value (Maturity Amount)\nPMT = Monthly Payment (Savings Amount)\nr = Monthly Interest Rate (Annual Rate / 12)\nn = Total Number of Months"
      }}
      faqs={[
        {
          question: "What interest rate should I use for calculating savings in Nepal?",
          answer: "For standard savings accounts in commercial banks, use 4% to 6%. For Recurring Deposits (RD), use 7% to 9%. For riskier assets like Equity Mutual Funds (SIPs), you can project using 10% to 14%, keeping in mind market volatility."
        },
        {
          question: "Why is time more important than the interest rate?",
          answer: "Because of exponentiation. The longer your money sits, the more your 'interest earns interest'. Depositing Rs. 5,000 for 20 years at 10% yields exponentially more total interest than depositing Rs. 10,000 for 10 years at the same rate."
        },
        {
          question: "What is an Annuity Due vs. Ordinary Annuity?",
          answer: "Annuity Due assumes you deposit the money at the beginning of the month (e.g., right after salary hits), which means that month's deposit immediately starts earning interest. An Ordinary Annuity assumes end-of-month deposits. This calculator uses Annuity Due for maximum accuracy."
        },
        {
          question: "Are my savings returns taxed in Nepal?",
          answer: "Yes, the interest generated on savings accounts, fixed deposits, and recurring deposits is subject to a 5% Tax Deducted at Source (TDS) by the bank before it is credited to your account."
        },
        {
          question: "How does inflation affect my savings?",
          answer: "Inflation erodes the purchasing power of your money. If inflation in Nepal is 6% and your savings account only yields 5%, your 'real return' is negative. You must aim for an interest rate higher than the inflation rate to truly build wealth."
        },
        {
          question: "What is the difference between this and a SIP Calculator?",
          answer: "Mathematically, the core formula is identical. However, SIPs (Systematic Investment Plans) involve equity markets where returns fluctuate daily and capital is at risk. Savings calculations assume a fixed, guaranteed interest rate typical of banking products."
        }
      ]}
      sidebar={{ title: "Wealth Tools", links: [{ label: "SIP Calculator", href: "/calculator/sip-calculator" }, { label: "FD Calculator", href: "/calculator/fd-calculator" }, { label: "Compound Interest", href: "/calculator/compound-interest" }, { label: "CAGR Calculator", href: "/calculator/cagr-calculator" }], banner: { title: "Save Consistently", description: "Rs. 5,000/month at 10% for 20 years becomes Rs. 38 Lakhs. Start today.", image: "/images/save-banner.jpg" } }}
      relatedTools={[{ label: "SIP Calculator", href: "/calculator/sip-calculator" }, { label: "FD Calculator", href: "/calculator/fd-calculator" }, { label: "CAGR Calculator", href: "/calculator/cagr-calculator" }]}
    />
  );
}
