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
          answer: "For individual investors, the CGT is 7.5% for short-term trades (held for less than 365 days) and 5% for long-term trades (held for 365 days or more). For institutional investors, the rate differs."
        },
        {
          question: "What are the additional charges when trading on NEPSE?",
          answer: "Besides the broker commission, you also pay a SEBON fee (0.015%), a DP charge (Rs. 25 per transaction), and the Capital Gains Tax on profits."
        }
      ]}
      seoContent={
        <div>
          <h2>Understanding NEPSE Share Trading Costs in Nepal</h2>
          <p>Trading in the Nepal Stock Exchange (NEPSE) involves several transaction costs that can significantly impact your overall return on investment. It is crucial for investors to understand these costs to calculate their exact break-even point and net profit.</p>
          
          <h3>Brokerage Commission</h3>
          <p>The broker commission in Nepal is structured in tiers based on the transaction volume. The rates typically range from 0.40% for smaller trades to as low as 0.27% for very large volumes. This fee is charged on both the buy and sell sides of the transaction.</p>
          
          <h3>SEBON Fee and DP Charge</h3>
          <p>The Securities Board of Nepal (SEBON) levies a regulatory fee of 0.015% on the transaction amount. Additionally, a Depository Participant (DP) charge of NPR 25 is applied every time shares are debited from your demat account (i.e., during a sale).</p>
          
          <h3>Capital Gains Tax (CGT)</h3>
          <p>CGT is charged only on the net profit made from the sale of shares. If you incur a loss, no CGT is applicable. The CGT structure for individual investors was revised to encourage long-term investing:</p>
          <ul>
            <li><strong>Short-Term Capital Gains:</strong> 7.5% tax on profit if shares are held for less than 365 days.</li>
            <li><strong>Long-Term Capital Gains:</strong> 5% tax on profit if shares are held for 365 days or more.</li>
          </ul>
          
          <h3>Why Calculating the Break-Even Price is Important</h3>
          <p>The break-even price is the exact price at which you must sell your shares to cover all costs (purchase cost, broker commissions, SEBON fees, and DP charges) without making a profit or a loss. Knowing this figure allows traders to set realistic target prices and stop-loss levels, improving overall trading strategy and risk management.</p>
        </div>
      }
    />
  );
}
