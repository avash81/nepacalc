'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNEPSEReturn } from '@/utils/math/country-rules/nepal';
import { 
  TrendingUp, BarChart3, ShieldCheck, Target, Zap, Activity, Globe, 
  History, Scale, PieChart, Receipt, ArrowRight, Landmark, Wallet, Table, ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

interface StocksState {
  qty: number;
  buyPrice: number;
  sellPrice: number;
  holdingDays: number;
  investorType: 'individual' | 'institutional';
}

export default function NEPSECalculator() {
  const [state, setState] = useSyncState<StocksState>('nepse_institutional_v5', {
    qty: 100,
    buyPrice: 1500,
    sellPrice: 1800,
    holdingDays: 400,
    investorType: 'individual'
  });

  const qty = state.qty as number;
  const buyPrice = state.buyPrice as number;
  const sellPrice = state.sellPrice as number;
  const { holdingDays, investorType } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const raw = calculateNEPSEReturn(qty, buyPrice, sellPrice, holdingDays, investorType);
    const totalFrictionPercent = 0.008; // Rough friction for BE
    const breakEven = buyPrice * (1 + totalFrictionPercent);
    
    const pieData = [
      { name: 'Net Share Value', value: raw.netSellProceeds },
      { name: 'Broker Commission', value: raw.breakdown.buyComm + raw.breakdown.sellComm },
      { name: 'SEBON & DP Fees', value: raw.breakdown.buySebon + raw.breakdown.sellSebon + 25 },
      { name: 'Capital Gains Tax', value: raw.cgtAmount }
    ];

    return { ...raw, breakEven, pieData };
  }, [qty, buyPrice, sellPrice, holdingDays, investorType]);

  const buyCost = qty * buyPrice;
  const totalCost = result?.totalCost || 0;
  const frictionRaw = buyCost > 0 ? (totalCost - buyCost) / buyCost : 0;
  const frictionPercent = (frictionRaw * 100).toFixed(2);
  const frictionBarWidth = Math.min(100, frictionRaw * 500);

  return (
    <ModernCalcLayout
      slug="nepal-stocks"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'NEPSE Profit' }]}
      title="NEPSE Profit & Broker Commission Calculator 2083/84"
      description="The authoritative trading audit engine for Nepal. Calculate net profit after tiered broker commissions, SEBON fees, and CGT with T+2 settlement precision."
      icon={TrendingUp}
      relatedTools={[
        { label: "WACC Calculator", href: "/calculator/nepse-wacc/" },
        { label: "Bonus Share Tax", href: "/calculator/nepse-bonus-tax/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" }
      ]}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Investor Protocol</label>
               <div className="grid grid-cols-2 gap-3">
                {['individual', 'institutional'].map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => update({ investorType: opt as any })} 
                    className={`h-11 rounded-md border text-[11px] font-black uppercase transition-all ${investorType === opt ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    {opt}
                  </button>
                ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Quantity (Units)</label>
                  <input type="number" value={qty} onChange={e => update({ qty: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Holding Period (Days)</label>
                  <input type="number" value={holdingDays} onChange={e => update({ holdingDays: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Avg Buy Price (NPR)</label>
                  <input type="number" value={buyPrice} onChange={e => update({ buyPrice: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Target Sell Price (NPR)</label>
                  <input type="number" value={sellPrice} onChange={e => update({ sellPrice: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
               </div>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Execute Trading Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className={`rounded-lg p-8 text-center space-y-2 ${(result?.netProfit || 0) >= 0 ? 'bg-[#E6FFFA] text-[#047481]' : 'bg-rose-50 text-rose-600'}`}>
             <div className="text-[10px] font-bold uppercase tracking-wider">Net Realized P/L</div>
             <div className="text-4xl font-black">{formatNPR(result?.netProfit || 0)}</div>
             <div className={`text-[10px] font-bold uppercase tracking-wider ${(result?.netProfit || 0) >= 0 ? 'text-[#38A169]' : 'text-rose-400'}`}>ROI: {result?.roi || 0}%</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Break-Even Price</div>
                <div className="text-lg font-black text-[#1A73E8]">Rs. {(result?.breakEven || 0).toFixed(2)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Net Proceeds</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(result?.netSellProceeds || 0)}</div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Market Friction Density</span>
                <span className="text-[11px] font-black text-[#202124]">{frictionPercent}%</span>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className="h-full bg-[#D93025]" style={{ width: `${frictionBarWidth}%` }} />
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Transaction Distribution</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={result.pieData}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                     >
                       <Cell fill="#188038" />
                       <Cell fill="#1A73E8" />
                       <Cell fill="#fbbf24" />
                       <Cell fill="#D93025" />
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Sales</span>
                    <span className="text-lg font-black text-[#202124]">{formatNPR((qty || 0) * (sellPrice || 0))}</span>
                 </div>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#188038]"></div> Net Profit</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1A73E8]"></div> Broker</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div> Fees</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#D93025]"></div> CGT</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Regulatory Ledger</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Buy Commissions (Total)</span>
                     <span className="text-sm font-black text-[#202124]">{formatNPR((result?.breakdown?.buyComm || 0) + (result?.breakdown?.buySebon || 0))}</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Sell Commissions (Total)</span>
                     <span className="text-sm font-black text-[#202124]">{formatNPR((result?.breakdown?.sellComm || 0) + (result?.breakdown?.sellSebon || 0) + 25)}</span>
                  </div>
                  <div className="p-4 rounded-md bg-rose-50 border border-rose-100 flex justify-between items-center">
                     <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Capital Gains Tax (CGT)</span>
                     <span className="text-sm font-black text-rose-600">{formatNPR(result?.cgtAmount || 0)}</span>
                  </div>
                  <div className="p-6 rounded-md bg-[#E8F0FE] border border-[#1A73E8] text-center">
                     <div className="text-[9px] font-black text-[#1A73E8] uppercase mb-1">Tax Protocol</div>
                     <p className="text-[11px] font-bold text-[#5F6368] leading-tight">
                        Applying {holdingDays >= 365 ? '5.0%' : '7.5%'} CGT for {investorType} based on {holdingDays} days holding.
                     </p>
                  </div>
               </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Investor: Select 'Individual' for 365-day tiered CGT logic or 'Institutional' for corporate rates.",
          "Units: Enter the total number of shares bought/sold in the transaction.",
          "Holding: Input the exact days between purchase and sale to toggle tax slabs.",
          "Pricing: Enter your average buy and sell prices to calculate gross returns.",
          "Audit: Analyze the 'Break-Even Price' to know your minimum profitable exit point."
        ]
      }}
      formula={{
        title: "The NEPSE Trading Calculus",
        description: "Standardized computation for net returns in the Nepal Stock Exchange based on FY 2083/84 standards.",
        raw: "Net Profit = (Qty × SellPrice) - (Qty × BuyPrice) - BuyFees - SellFees - CGT",
        variables: [
          "Broker Commission: Tiered from 0.40% to 0.27% based on volume",
          "SEBON Fee: Mandatory 0.015% regulatory fee on all transactions",
          "CGT: 5% (Long-term > 365 days) or 7.5% (Short-term < 365 days)"
        ]
      }}
      faqs={[
        { question: "What is the Capital Gains Tax (CGT) in Nepal?", answer: "For individual investors, the CGT is 5% if shares are held for more than 365 days and 7.5% if held for a shorter duration." },
        { question: "How much is the SEBON regulatory fee?", answer: "SEBON charges a mandatory 0.015% of the total transaction amount for every buy and sell order executed in NEPSE." },
        { question: "What is the 'Break-Even Price'?", answer: "It is the sell price at which your net profit becomes zero after all broker commissions, SEBON fees, DP charges, and taxes are deducted." },
        { question: "How are broker commissions calculated?", answer: "Commissions are tiered: Rs. 10 flat for trades up to Rs. 2500, 0.40% up to 50k, 0.37% up to 5 Lakh, 0.34% up to 20 Lakh, and 0.27% above 20 Lakh." }
      ]}
      sidebar={{
        title: "NEPSE Intelligence",
        subtitle: "Trading Tools",
        links: [
          { label: "WACC Calculator", href: "/calculator/nepse-wacc/", icon: Target },
          { label: "Bonus Tax Tool", href: "/calculator/nepse-bonus-tax/", icon: Receipt },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "TMS Portal", href: "https://tms.nepse.com.np", icon: Globe },
        ],
      }}
    />
  );
}

