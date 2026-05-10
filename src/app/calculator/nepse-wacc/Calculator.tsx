'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  Plus, Trash2, ShieldCheck, BarChart3, Info, PieChart, Table as TableIcon, 
  Landmark, TrendingUp, History, Search, Scale, ArrowRight, Zap, Activity, Globe, Target,
  Receipt, Wallet, ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

interface PurchaseCluster { id: string; qty: number; price: number; type: 'secondary' | 'ipo' | 'bonus' | 'right'; }

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function WACCCalculator() {
  const [state, setState] = useSyncState('nepse_wacc_v5', {
    clusters: [ 
      { id: '1', qty: 100, price: 1500, type: 'secondary' }, 
      { id: '2', qty: 100, price: 1200, type: 'secondary' } 
    ] as PurchaseCluster[],
    currentLTP: 1800
  });
  const { clusters, currentLTP } = state;

  const result = useMemo(() => {
    let totalQty = 0; 
    let totalInvestment = 0;
    clusters.forEach(c => { 
      totalQty += c.qty; 
      totalInvestment += c.qty * c.price; 
    });
    const wacc = totalQty > 0 ? totalInvestment / totalQty : 0;
    const marketValue = totalQty * currentLTP;
    const profit = marketValue - totalInvestment;
    const estCGT = Math.max(0, profit * 0.05);

    const pieData = [
      { name: 'Initial Capital', value: totalInvestment },
      { name: 'Unrealized Gain', value: Math.max(0, profit) }
    ];

    const batchData = clusters.map((c, i) => ({
      name: `Batch ${i+1}`,
      value: c.qty * c.price,
      fill: ['#1A73E8', '#188038', '#fbbf24', '#D93025', '#8b5cf6'][i % 5]
    })).filter(d => d.value > 0);

    return { wacc, totalQty, totalInvestment, marketValue, profit, estCGT, pieData, batchData };
  }, [clusters, currentLTP]);

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });
  const addCluster = () => update({ clusters: [...clusters, { id: Math.random().toString(), qty: 0, price: 0, type: 'secondary' }] });
  const removeCluster = (id: string) => { if (clusters.length > 1) update({ clusters: clusters.filter(c => c.id !== id) }); };
  const updateCluster = (id: string, field: keyof PurchaseCluster, val: any) => update({ clusters: clusters.map(c => c.id === id ? { ...c, [field]: val } : c) });

  return (
    <ModernCalcLayout
      slug="nepse-wacc"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'WACC Calculator' }]}
      title="NEPSE WACC"
      description="The authoritative 'My Purchase Update' engine for Nepal. Calibrated to CDSC statutory algorithms for bonus, right, and multi-batch secondary market inventory auditing."
      icon={Target}
      inputs={
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <TableIcon className="w-4 h-4 text-[#5F6368]" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#5F6368]">Purchase Inventory</h3>
             </div>
             <button 
               onClick={addCluster}
               className="h-9 px-4 bg-[#E8F0FE] hover:bg-[#D2E3FC] text-[#1A73E8] text-[10px] font-black uppercase rounded-md transition-all flex items-center gap-2"
             >
                <Plus className="w-3 h-3" /> Add Batch
             </button>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
             {clusters.map((c, idx) => (
                <div key={c.id} className="p-4 bg-white border border-[#DADCE0] rounded-md relative group transition-all hover:border-[#1A73E8]">
                   <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] font-black text-[#1A73E8] uppercase tracking-wider">Batch #{idx+1}</span>
                      {clusters.length > 1 && (
                        <button onClick={() => removeCluster(c.id)} className="p-1 hover:bg-rose-50 rounded text-rose-600 transition-colors">
                           <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                         <label className="text-[8px] font-black text-[#5F6368] uppercase">Quantity</label>
                         <input type="number" value={c.qty} onChange={e => updateCluster(c.id, 'qty', Number(e.target.value))} className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" placeholder="Units" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[8px] font-black text-[#5F6368] uppercase">Purchase Rate</label>
                         <input type="number" value={c.price} onChange={e => updateCluster(c.id, 'price', Number(e.target.value))} className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" placeholder="Price" />
                      </div>
                   </div>
                </div>
             ))}
          </div>

          <div className="pt-6 border-t border-[#DADCE0] space-y-2">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Market Benchmark (LTP)</label>
             <input 
                type="number" 
                value={currentLTP} 
                onChange={(e) => update({ currentLTP: Number(e.target.value) })}
                className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                placeholder="Current Share Price"
             />
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Inventory Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Weighted Avg Cost (WACC)</div>
             <div className="text-4xl font-black text-[#1A73E8]">Rs. {result.wacc.toFixed(2)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Meroshare Statutory Value</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Total Units</div>
                <div className="text-lg font-black text-[#202124]">{result.totalQty}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">Unrealized P/L</div>
                <div className={`text-lg font-black ${result.profit >= 0 ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                   {formatNPR(result.profit)}
                </div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Portfolio Market Depth</span>
                <span className="text-[11px] font-black text-[#202124]">{((result.marketValue / result.totalInvestment) * 100).toFixed(1)}%</span>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className={`h-full ${result.profit >= 0 ? 'bg-[#188038]' : 'bg-[#D93025]'}`} style={{ width: `${Math.min(100, (result.marketValue / result.totalInvestment) * 50)}%` }} />
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
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Capital Architecture</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={result.batchData}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                     >
                       {result.batchData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Net Capital</span>
                    <span className="text-lg font-black text-[#202124]">{formatNPR(result.totalInvestment)}</span>
                 </div>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  {result.batchData.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{backgroundColor: d.fill}}></div> {d.name}</div>
                  ))}
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Inventory Intelligence</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Total Market Value</span>
                     <span className="text-sm font-black text-[#202124]">{formatNPR(result.marketValue)}</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Est. Long-Term CGT (5%)</span>
                     <span className="text-sm font-black text-rose-600">{formatNPR(result.estCGT)}</span>
                  </div>
                  <div className="p-6 rounded-md bg-[#E8F0FE] border border-[#1A73E8] text-center">
                     <div className="text-[9px] font-black text-[#1A73E8] uppercase mb-1">Meroshare Standard</div>
                     <p className="text-[11px] font-bold text-[#5F6368] leading-tight">
                        WACC is mandatory for 'My Purchase Update'. Use the Rs. {result.wacc.toFixed(2)} baseline for accurate tax declarations.
                     </p>
                  </div>
               </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Batches: Add each separate purchase (lot) from your TMS ledger.",
          "Secondary Market: Enter the exact quantity and unit price for secondary buys.",
          "Bonus/Rights: Add bonus shares as Rs. 0 and right shares as Rs. 100 per unit.",
          "WACC Audit: The engine computes the weighted average required for Meroshare.",
          "LTP: Enter the current market price to see your real-time valuation and ROI."
        ]
      }}
      formula={{
        title: "The Weighted Average Calculus",
        description: "Official CDSC statutory standard for calculating the cost-basis of stock holdings.",
        raw: "WACC = Σ(Quantity × Price) / Σ(Total Quantity)",
        variables: [
          "Price: Net purchase price including broker commission for accuracy",
          "Bonus: Cost set to 0 as mandated by Nepal's tax policy",
          "Rights: Cost set to Face Value (usually Rs. 100)"
        ]
      }}
      faqs={[
        { question: "What is WACC in NEPSE?", answer: "WACC (Weighted Average Cost of Capital) is the average price paid for shares across multiple purchase batches. It is used by Meroshare to calculate capital gains tax." },
        { question: "How do I calculate WACC for bonus shares?", answer: "Bonus shares are recieved at zero cost. To calculate the new WACC, add the bonus quantity as a new batch with a purchase price of Rs. 0." },
        { question: "What is the CGT rate in Nepal?", answer: "For individual investors, it is 5% for long-term holdings (over 365 days) and 7.5% for short-term holdings." },
        { question: "Do I need to include broker commissions in WACC?", answer: "Yes, the IRD allows you to include statutory transaction costs (brokerage and SEBON fees) in your cost-basis to lower your tax liability." }
      ]}
      sidebar={{
        title: "Portfolio Hub",
        subtitle: "NEPSE Auditing",
        links: [
          { label: "Trading Engine", href: "/calculator/nepal-stocks/", icon: TrendingUp },
          { label: "Bonus Tax Tool", href: "/calculator/nepse-bonus-tax/", icon: Receipt },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "Meroshare Portal", href: "https://meroshare.cdsc.com.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "NEPSE Trading", href: "/calculator/nepal-stocks/" },
        { label: "Bonus Tax Tool", href: "/calculator/nepse-bonus-tax/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}

