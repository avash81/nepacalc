'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNEPSEReturn } from '@/utils/math/country-rules/nepal';
import { TrendingUp, BarChart3, ShieldCheck, Target, Zap } from 'lucide-react';

export default function NEPSECalculator() {
  const [state, setState] = useSyncState('nepse_institutional_v1', {
    qty: 100,
    buyPrice: 1500,
    sellPrice: 1800,
    holdingDays: 400,
    investorType: 'individual' as 'individual' | 'institutional'
  });

  const { qty, buyPrice, sellPrice, holdingDays, investorType } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const raw = calculateNEPSEReturn(qty, buyPrice, sellPrice, holdingDays, investorType);
    const totalFrictionPercent = 0.008;
    const breakEven = buyPrice * (1 + totalFrictionPercent);
    return { ...raw, breakEven };
  }, [qty, buyPrice, sellPrice, holdingDays, investorType]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <ModernCalcLayout
      slug="nepal-stocks"
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'NEPSE Trading Calculator' }]}
      title="NEPSE Share Trading Calculator"
      description="Calculate net profit, broker commission, SEBON fees, and CGT for your stock transactions in the Nepal Stock Exchange."
      icon={TrendingUp}
      inputs={
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-2">
             <h3 className="text-sm font-bold text-slate-800">Trade Parameters</h3>
             <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200">
               {['individual', 'institutional'].map(t => (
                 <button 
                   key={t} 
                   onClick={() => update({ investorType: t as any })}
                   className={`px-3 py-1 text-xs font-bold uppercase rounded-md transition-all ${investorType === t ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
                 >
                   {t}
                 </button>
               ))}
             </div>
          </div>
          
          <div className="space-y-6">
             <ValidatedInput label="Units (Quantity)" value={qty} onChange={v => update({ qty: v })} min={1} withSlider />
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ValidatedInput label="Purchase Price" value={buyPrice} onChange={v => update({ buyPrice: v })} prefix="Rs." min={10} />
                <ValidatedInput label="Selling Price" value={sellPrice} onChange={v => update({ sellPrice: v })} prefix="Rs." min={10} />
             </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
             <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-800">Tax Holding Period</h3>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                {[
                  { d: 364, l: 'Short Term', r: '7.5% CGT', desc: '< 1 Year' },
                  { d: 365, l: 'Long Term', r: '5% CGT', desc: '≥ 1 Year' }
                ].map(p => (
                  <button 
                    key={p.l}
                    onClick={() => update({ holdingDays: p.d })}
                    className={`p-4 text-left rounded-xl border transition-all ${holdingDays >= p.d && p.d === 365 || holdingDays < 365 && p.d === 364 ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}
                  >
                     <div className="text-xs font-medium text-slate-500 mb-1">{p.desc}</div>
                     <div className="text-sm font-bold text-slate-900">{p.l}</div>
                     <div className={`text-xs font-bold mt-2 ${holdingDays >= p.d && p.d === 365 || holdingDays < 365 && p.d === 364 ? 'text-emerald-700' : 'text-slate-500'}`}>{p.r}</div>
                  </button>
                ))}
             </div>
             
             <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Exact Days Held:</span>
                <input 
                  type="number" 
                  value={holdingDays} 
                  onChange={e => update({ holdingDays: parseInt(e.target.value) || 0 })}
                  className="w-24 text-right bg-white border border-slate-200 rounded px-2 py-1 text-sm font-bold text-emerald-700 outline-none"
                />
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl text-white overflow-hidden relative shadow-md transition-colors ${result.netProfit >= 0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
             <div className="relative z-10">
                <div className="text-xs font-medium uppercase tracking-wider text-white/80 mb-2">Net Realized Profit/Loss</div>
                <div className="text-3xl font-black mb-2">Rs. {fmt(result.netProfit)}</div>
                <div className="flex items-center gap-2">
                   <div className="px-2 py-1 bg-white/20 rounded text-xs font-bold">ROI: {result.roi}%</div>
                   {result.netProfit > 0 && <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />}
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-white/20">
                   <div>
                      <div className="text-xs font-medium text-white/80 mb-1">Capital Gains Tax</div>
                      <div className="text-sm font-bold">Rs. {fmt(result.cgtAmount)}</div>
                   </div>
                   <div>
                      <div className="text-xs font-medium text-white/80 mb-1">Total Cost</div>
                      <div className="text-sm font-bold">Rs. {fmt(result.totalCost)}</div>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
             <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-600">Break-even Price</span>
                <span className="text-lg font-bold text-slate-900">Rs. {fmt(result.breakEven)}</span>
             </div>
             <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-600">Net Sell Proceed</span>
                <span className="text-lg font-bold text-slate-900">Rs. {fmt(result.netSellProceeds)}</span>
             </div>
             
             <div className="p-3 bg-blue-50 rounded-lg flex gap-3 text-blue-800 text-xs">
                <BarChart3 className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Calculations use updated Jestha 2081 commission tiers, including SEBON fee (0.015%) and DP charge (Rs. 25).</p>
             </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Finance & Tax",
        links: [
          { label: 'Nepal Income Tax', href: '/calculator/nepal-income-tax' },
          { label: 'SIP Calculator', href: '/calculator/sip-calculator' },
          { label: 'Compound Interest', href: '/calculator/compound-interest' },
          { label: 'EMI Calculator', href: '/calculator/loan-emi' },
        ],
        banner: {
          title: "Optimize Your Trades",
          description: "Understanding your exact break-even point allows you to make smarter, more profitable decisions in the secondary market."
        }
      }}
      howToUse={{
        steps: [
          "Select your investor type (Individual or Institutional).",
          "Enter the quantity of shares you traded.",
          "Input the average purchase price and the selling price.",
          "Select the holding period to determine your Capital Gains Tax (CGT) bracket (5% for >1 year, 7.5% for <1 year).",
          "Review the total friction costs, break-even price, and net profit."
        ]
      }}
      faqs={[
        {
          question: "What is the Capital Gains Tax (CGT) rate in Nepal?",
          answer: "For individual investors, the CGT is 7.5% for short-term trades (held for less than 365 days) and 5% for long-term trades (held for 365 days or more). For institutional investors, the rate is typically 10% regardless of the holding period."
        },
        {
          question: "What are the additional charges when trading on NEPSE?",
          answer: "Besides the broker commission, you also pay a SEBON fee (0.015%), a DP charge (Rs. 25 per transaction), and the Capital Gains Tax on your net profits. These friction costs are deducted automatically from your settlement amount."
        },
        {
          question: "How is the broker commission calculated?",
          answer: "NEPSE uses a tiered brokerage system ranging from 0.40% to 0.27%. The commission decreases as your total transaction volume increases. For example, trades up to Rs. 50,000 incur a 0.40% commission, while trades above Rs. 1 Crore incur only 0.27%."
        },
        {
          question: "How do I calculate the 365-day holding period for CGT?",
          answer: "The holding period is calculated from the date the shares were credited to your DEMAT account (EDIS/Purchase settlement date) to the exact date you execute the sell order on the TMS."
        },
        {
          question: "Do I pay CGT if I sell shares at a loss?",
          answer: "No. Capital Gains Tax is only applied to the Net Profit. If you sell at a loss, or if the profit is so small that the broker commission and SEBON fees negate it, you pay zero CGT. You still pay the broker and SEBON fees."
        },
        {
          question: "Is the DP charge applied per share or per transaction?",
          answer: "The DP (Depository Participant) charge of Rs. 25 is applied per transaction (per stock/scrip) on the sell side, regardless of whether you are selling 10 shares or 10,000 shares of that specific company on that day."
        }
      ]}
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision NEPSE Trading & Share Calculator</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Trading on the Nepal Stock Exchange requires exact cost analysis before executing orders. Our <strong className="text-[#202124]">nepse calculator</strong> is an advanced financial algorithm that evaluates the complete friction cost of trading. Unlike generic tools, this <strong className="text-[#202124]">share calculator nepal</strong> integrates the latest 2081/82 tiered broker commission rates (0.40% to 0.27%), strict SEBON regulatory fees (0.015%), and mandatory DP charges to determine your absolute net profit.
              </p>
              <p>
                A crucial component of equity trading is tax compliance. This engine functions as a definitive <strong className="text-[#202124]">cgt calculator nepal</strong>, applying the piecewise temporal logic of Capital Gains Tax: 7.5% for short-term holds (&lt;365 days) and 5% for long-term investments. By establishing a rigorous <strong className="text-[#202124]">nepal stock exchange return calculator</strong>, traders can pinpoint the exact break-even tick price required to exit a position without realizing a net loss.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Cost Distribution</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Tiered Brokerage:</strong> As a dedicated <strong className="text-[#202124]">broker commission calculator nepal</strong>, the system dynamically shifts its percentage multiplier based on total volume. High-volume trades automatically trigger the lower 0.27% threshold, maximizing net yield.</li>
              <li><strong className="text-[#188038]">WACC Integration:</strong> While serving as a gross transaction model, traders should couple this with a <strong className="text-[#202124]">wacc calculator nepal</strong> to determine the true weighted average cost of accumulated shares across multiple dips.</li>
              <li><strong className="text-[#D93025]">Loss Absorption Logic:</strong> Capital Gains Tax is strictly applied to <span className="italic">Net Realizable Profit</span>. If the total friction cost (buy fees + sell fees) exceeds the gross price difference, the engine mathematically prevents CGT deduction.</li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
