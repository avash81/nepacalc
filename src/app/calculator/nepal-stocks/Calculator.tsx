'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNEPSEReturn } from '@/utils/math/country-rules/nepal';
import { 
  TrendingUp, BarChart3, ShieldCheck, Target, Zap, Activity, Globe, 
  History, Scale, PieChart, Receipt, ArrowRight, Landmark, Wallet
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NEPSECalculator() {
  const [state, setState] = useSyncState('nepse_institutional_v5', {
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
    
    const chartData = [
      { name: 'Initial Cost', val: raw.totalCost, fill: '#3b82f6' },
      { name: 'Net Profit', val: Math.max(0, raw.netProfit), fill: '#10b981' },
      { name: 'Total Friction', val: raw.totalCost - raw.netProfit + (raw.netProfit > 0 ? raw.netProfit : 0), fill: '#ef4444' }
    ];

    const feeData = [
      { name: 'Broker', val: raw.breakdown.buyComm + raw.breakdown.sellComm, fill: '#3b82f6' },
      { name: 'SEBON', val: raw.breakdown.buySebon + raw.breakdown.sellSebon, fill: '#8b5cf6' },
      { name: 'CGT', val: raw.cgtAmount, fill: '#ef4444' }
    ].filter(d => d.val > 0);

    return { ...raw, breakEven, chartData, feeData };
  }, [qty, buyPrice, sellPrice, holdingDays, investorType]);

  const inputBlock = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Investor Type</label>
            <div className="grid grid-cols-2 gap-2">
             {['individual', 'institutional'].map(opt => (
               <button key={opt} onClick={() => update({ investorType: opt as any })} className={`py-2 text-[10px] font-bold border rounded transition-all ${investorType === opt ? 'bg-[#1A73E8] border-[#1A73E8] text-white shadow-sm' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:border-[#1A73E8]'}`}>{opt}</button>
             ))}
            </div>
         </div>
         <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Quantity (Units)</label>
            <input type="number" value={qty} onChange={e => update({ qty: Number(e.target.value) })} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
         </div>
         <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Buy Price (NPR)</label>
            <input type="number" value={buyPrice} onChange={e => update({ buyPrice: Number(e.target.value) })} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
         </div>
         <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Sell Price (NPR)</label>
            <input type="number" value={sellPrice} onChange={e => update({ sellPrice: Number(e.target.value) })} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
         </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-[#DADCE0] mt-4">
         <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Holding Period (Days)</label>
         <div className="flex gap-4">
            <input type="number" value={holdingDays} onChange={e => update({ holdingDays: Number(e.target.value) })} className="flex-1 h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
            <div className="flex bg-[#F8F9FA] rounded-md p-1 border border-[#DADCE0]">
               <button onClick={() => update({ holdingDays: 364 })} className={`px-4 py-1.5 text-[10px] font-bold rounded ${holdingDays < 365 ? 'bg-white shadow-sm text-[#1A73E8]' : 'text-[#70757A]'}`}>Short</button>
               <button onClick={() => update({ holdingDays: 365 })} className={`px-4 py-1.5 text-[10px] font-bold rounded ${holdingDays >= 365 ? 'bg-white shadow-sm text-[#1A73E8]' : 'text-[#70757A]'}`}>Long</button>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <ModernCalcLayout
      slug="nepal-stocks"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'Trading Calculator' }]}
      title="NEPSE Trading"
      description="The definitive auditing tool for Nepal's stock traders. Calculate net profit, tiered broker commissions, SEBON fees, and CGT with T+2 precision."
      icon={TrendingUp}
      inputs={inputBlock}
      results={
        <div className="space-y-6">
          <div className={`p-8 border rounded-lg text-center space-y-2 ${result.netProfit >= 0 ? 'bg-[#E6FFFA] border-[#B2F5EA]' : 'bg-rose-50 border-rose-100'}`}>
             <div className={`text-[10px] font-bold uppercase tracking-wider ${result.netProfit >= 0 ? 'text-[#047481]' : 'text-rose-600'}`}>Net Realized P/L</div>
             <div className={`text-4xl font-black ${result.netProfit >= 0 ? 'text-[#047481]' : 'text-rose-900'}`}>{formatNPR(result.netProfit)}</div>
             <div className="text-[10px] font-bold text-[#70757A] uppercase tracking-tighter">ROI: {result.roi}%</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 bg-white border border-[#DADCE0] rounded-md text-center space-y-1">
                <div className="text-[9px] font-bold text-[#70757A] uppercase">Break-Even Price</div>
                <div className="text-xl font-black text-[#1A73E8]">Rs. {result.breakEven.toFixed(2)}</div>
             </div>
             <div className="p-5 bg-white border border-[#DADCE0] rounded-md text-center space-y-1">
                <div className="text-[9px] font-bold text-[#70757A] uppercase">Net Proceeds</div>
                <div className="text-xl font-black text-[#202124]">{formatNPR(result.netSellProceeds)}</div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
               <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                  <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Transaction Friction Audit</h3>
               </div>
               <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="h-[200px] w-[200px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie data={result.feeData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="val" stroke="none">
                          {result.feeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                        </Pie>
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-3 w-full">
                     {result.feeData.map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded border border-[#DADCE0]">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.fill }} />
                              <span className="text-[11px] font-bold text-[#5F6368] uppercase">{d.name}</span>
                           </div>
                           <span className="text-[11px] font-black text-[#202124]">{formatNPR(d.val)}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
               <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                  <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Trade Composition</h3>
               </div>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.chartData} barSize={24}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#70757A', fontWeight: 700}} />
                      <YAxis hide />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px' }} formatter={(v: number) => formatNPR(v)} />
                      <Bar dataKey="val" fill="#1A73E8" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Protocol: Select 'Individual' for 365-day tiered CGT logic.",
          "Parameters: Enter the units, purchase price, and target sell price.",
          "Timeline: Input the exact days held to toggle between 5% and 7.5% tax brackets.",
          "Audit: Review the 'Break-Even Price' to identify the minimum exit threshold.",
          "Proceeds: View 'Net Sell Proceed' to know the exact cash amount hitting your bank account."
        ]
      }}
      formula={{
        title: "The NEPSE Trading Calculus",
        description: "Official SEBON-compliant formula for net return calculation.",
        raw: "Net Profit = SellValue - BuyValue - Fees_Total - CGT",
        latex: "Return = (Qty \\times SellP) - (Qty \\times BuyP) - BrokerFee - SEBONFee - CGT"
      }}
      faqs={[
        { question: "What is the broker commission rate in Nepal?", answer: "Broker commission is volume-tiered by SEBON, ranging from 0.40% for trades up to Rs. 50,000 down to 0.27% for transactions above Rs. 20 Lakh." },
        { question: "What are the CGT rates for individual investors?", answer: "Capital Gains Tax (CGT) is 5% for long-term holdings (over 365 days) and 7.5% for short-term holdings (under 365 days)." },
        { question: "What hidden fees are charged on NEPSE trades?", answer: "Besides commission, you pay a flat 0.015% SEBON fee on both buy/sell and a Rs. 25 DP (Depository Participant) fee per scrip during the sale." },
        { question: "How is the 365-day holding period calculated?", answer: "The period is calculated from the date of purchase settlement (T+2) to the date of sell execution." },
        { question: "What is the 'Break-Even Price'?", answer: "It is the price at which your total net proceeds from a sale (after commissions, fees, and tax) exactly match your total purchase cost." }
      ]}
      sidebar={{
        title: "Trading Hub",
        subtitle: "NEPSE Intelligence",
        links: [
          { label: "WACC Calculator", href: "/calculator/nepse-wacc", icon: Target },
          { label: "Bonus Tax Tool", href: "/calculator/nepse-bonus-tax", icon: Receipt },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax", icon: Wallet },
          { label: "TMS Portal", href: "https://tms.nepse.com.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "WACC Calculator", href: "/calculator/nepse-wacc" },
        { label: "Bonus Tax", href: "/calculator/nepse-bonus-tax" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax" }
      ]}
    />
  );
}
