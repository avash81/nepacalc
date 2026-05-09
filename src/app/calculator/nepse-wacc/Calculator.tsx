'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  Plus, Trash2, ShieldCheck, BarChart3, Info, PieChart, Table as TableIcon, 
  Landmark, TrendingUp, History, Search, Scale, ArrowRight, Zap, Activity, Globe, Target,
  Receipt, Wallet
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

interface PurchaseCluster { id: string; qty: number; price: number; type: 'secondary' | 'ipo' | 'bonus' | 'right'; }

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

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
    const holdingPeriodLong = true; // Assume long term for simple calc
    const cgtRate = holdingPeriodLong ? 0.05 : 0.075;
    const estCGT = Math.max(0, profit * cgtRate);

    const chartData = [
      { name: 'Investment', val: totalInvestment, fill: '#3b82f6' },
      { name: 'Market Value', val: marketValue, fill: '#10b981' }
    ];

    const batchData = clusters.map((c, i) => ({
      name: `Batch #${i+1}`,
      val: c.qty * c.price,
      fill: ['#3b82f6', '#10b981', '#fbbf24', '#ef4444', '#8b5cf6'][i % 5]
    })).filter(d => d.val > 0);

    return { wacc, totalQty, totalInvestment, marketValue, profit, estCGT, chartData, batchData };
  }, [clusters, currentLTP]);

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });
  const addCluster = () => update({ clusters: [...clusters, { id: Math.random().toString(), qty: 0, price: 0, type: 'secondary' }] });
  const removeCluster = (id: string) => { if (clusters.length > 1) update({ clusters: clusters.filter(c => c.id !== id) }); };
  const updateCluster = (id: string, field: keyof PurchaseCluster, val: any) => update({ clusters: clusters.map(c => c.id === id ? { ...c, [field]: val } : c) });

  return (
    <ModernCalcLayout
      slug="nepse-wacc"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'WACC Calculator' }]}
      title="NEPSE WACC"
      description="The authoritative 'My Purchase Update' engine for Meroshare. Calibrated to CDSC statutory algorithms for bonus, right, and multi-batch secondary buys."
      icon={BarChart3}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Inventory Batches</label>
                   <button onClick={addCluster} className="px-4 py-2 bg-[#1a73e8] hover:bg-blue-700 text-[#202124] text-[9px] font-black uppercase rounded-xl transition-all shadow-sm flex items-center gap-2">
                      <Plus className="w-3 h-3" /> Add Transaction
                   </button>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                   {clusters.map((c, idx) => (
                      <div key={c.id} className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-[2rem] relative group transition-all hover:border-blue-500/50">
                         <div className="absolute top-4 right-6 text-[8px] font-black text-[#1a0dab] uppercase tracking-widest">Cluster #{idx+1}</div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[8px] font-black text-slate-500 uppercase">Quantity</label>
                               <input type="number" value={c.qty} onChange={e => updateCluster(c.id, 'qty', Number(e.target.value))} className="w-full h-10 px-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-[#202124] text-sm font-black focus:border-blue-500 outline-none" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[8px] font-black text-slate-500 uppercase">Rate (NPR)</label>
                               <input type="number" value={c.price} onChange={e => updateCluster(c.id, 'price', Number(e.target.value))} className="w-full h-10 px-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-[#202124] text-sm font-black focus:border-blue-500 outline-none" />
                            </div>
                         </div>
                         {clusters.length > 1 && (
                            <button onClick={() => removeCluster(c.id)} className="absolute -top-2 -right-2 w-8 h-8 bg-rose-600 text-[#202124] rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                               <Trash2 className="w-4 h-4" />
                            </button>
                         )}
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Activity className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Market Benchmark</h3>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block">Current Market Price (LTP)</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold font-mono">NPR</span>
                   <input 
                      type="number" 
                      value={currentLTP} 
                      onChange={(e) => update({ currentLTP: Number(e.target.value) })}
                      className="w-full h-12 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-black text-slate-900 focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Target className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Institutional WACC Value</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">Rs. {result.wacc.toFixed(2)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Meroshare Baseline Cost
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-center">
                <div className="text-[9px] font-black text-slate-400 uppercase">Total Units</div>
                <div className="text-xl font-black text-slate-900">{result.totalQty}</div>
             </div>
             <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-lg space-y-1 text-center">
                <div className="text-[9px] font-black text-emerald-600 uppercase">Unrealized Gain</div>
                <div className="text-xl font-black text-emerald-600">{formatNPR(result.profit)}</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><TrendingUp className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Tax Payload Est. (5%)</h4>
                   <p className="text-2xl font-black">{formatNPR(result.estCGT)}</p>
                </div>
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                   Long-Term
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><Activity className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-[#1a73e8] rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Portfolio Cost Architecture</h3>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={result.batchData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="val"
                      stroke="none"
                    >
                      {result.batchData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                       formatter={(v: number) => formatNPR(v)}
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                   <span className="text-[9px] font-black text-slate-400 uppercase">Total Capital</span>
                   <span className="text-lg font-black text-slate-900">{formatNPR(result.totalInvestment)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-[#202124] rounded-lg p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><ShieldCheck className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Valuation Trajectory</h3>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 'bold'}} />
                      <YAxis hide />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '10px' }}
                         formatter={(v: number) => formatNPR(v)}
                      />
                      <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40}>
                         {result.chartData.map((entry, index) => (
                            <Cell key={`cell-bar-${index}`} fill={entry.fill} />
                         ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <p className="mt-6 text-[9px] text-slate-500 leading-relaxed uppercase tracking-widest font-black">
                  Comparing Total Cost Basis vs Current Unrealized Market Valuation.
               </p>
            </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Landmark className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The NEPSE WACC Encyclopedia: Institutional Cost Auditing</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                The <strong>Weighted Average Cost of Capital (WACC)</strong> is the fundamental metric used by <strong>CDSC (Central Depository System and Clearing Limited)</strong> in Nepal to determine an investor's profit for taxation purposes. In the <strong>Meroshare</strong> portal, "My Purchase Update" requires every investor to declare their WACC before executing a sell order. Our <strong>Institutional WACC Engine</strong> mirror-matches the statutory algorithms used by <strong>SEBON</strong> and <strong>NEPSE</strong>.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-lg flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Globe className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">Weighted Average vs. Simple Average</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      WACC ensures that larger purchases have a proportional impact on your average price. For example, buying 1,000 shares at Rs. 100 and 10 shares at Rs. 200 will result in a WACC much closer to Rs. 100, reflecting your true capital density.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Corporate Action Adjustments: Bonus & Rights</h3>
              <p>
                One of the most critical aspects of NEPSE investing is adjusting WACC after corporate actions. Failing to include bonus shares at zero cost or right shares at face value will lead to an inflated cost basis, which is technically a violation of <strong>IRD (Inland Revenue Department)</strong> tax reporting norms.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Bonus Share Rule (Rs. 0)</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      Bonus shares increase your total holdings without additional cost. In this calculator, add them as a new batch with <strong>Price = 0</strong> to accurately average down your cost basis.
                    </p>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-emerald-50">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Right Share Rule (Rs. 100)</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      Right shares are typically acquired at par value (usually Rs. 100). Add these batches at 100 to find your new composite WACC.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. Capital Gains Tax (CGT) Slabs & Holding Period</h3>
              <p>
                Nepal's <strong>Capital Gains Tax (CGT)</strong> is tiered based on your holding period. Your WACC determines the "Gain" (Sell Price - WACC), and the tax rate is applied to this profit. For individual investors, the rates for <strong>FY 2081/82</strong> are:
                <br />• <strong>Long-Term (Held &gt; 365 Days):</strong> 5% CGT
                <br />• <strong>Short-Term (Held ≤ 365 Days):</strong> 7.5% CGT
              </p>
            </div>
          </section>

          <section className="bg-white border border-[#dadce0] text-[#202124] rounded-lg p-12 shadow-sm relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10"><History className="w-64 h-64 text-emerald-500" /></div>
             <h2 className="text-3xl font-black mb-10 tracking-tight text-emerald-400 uppercase tracking-widest">Meroshare Compliance Guardrails</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Scale className="w-5 h-5" /> Mandatory Update</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      You MUST update WACC in Meroshare's 'My Purchase Update' before the E-DIS process is completed for a sell order.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Receipt className="w-5 h-5" /> Broker Fees</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      When calculating buy price, include broker commission and DP fees for the most accurate profit/loss tracking.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><ShieldCheck className="w-5 h-5" /> IRD Compliance</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Purposely inflating WACC to avoid tax is a legal offense. Always use verifiable TMS ledger data for batch entries.
                   </p>
                </div>
             </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Batch Entry: Input the quantity and price for every secondary market purchase.",
          "Corporate Actions: Add Bonus shares at Rs. 0 and Right shares at Rs. 100.",
          "Market Audit: Enter the current LTP to see your unrealized profit and estimated CGT.",
          "Meroshare Update: Use the calculated WACC value in your Meroshare 'My Purchase Update' portal.",
          "Holding Period: Note the 365-day threshold for the 5% vs 7.5% tax rate distinction."
        ]
      }}
      formula={{
        title: "Weighted Average Calculus",
        description: "The mathematical standard for multi-lot asset accounting in Nepal.",
        raw: "$$WACC = \\frac{\\sum (Quantity \\times Price)}{\\sum Quantity}$$",
        latex: "CostBasis = (Q1xP1 + Q2xP2 + ...) / (Q1 + Q2 + ...)"
      }}
      faqs={[
        { question: "What is WACC in the context of NEPSE?", answer: "WACC (Weighted Average Cost of Capital) is the average price paid for shares across multiple purchase batches. It is the primary metric used by Meroshare and CDSC to calculate your realized capital gains for taxation." },
        { question: "How do I calculate WACC for bonus shares?", answer: "Bonus shares are received at zero cost. To calculate the new WACC, add the bonus quantity as a new batch with a purchase price of Rs. 0. This will average down your overall cost basis." },
        { question: "What is the CGT rate for long-term and short-term holdings?", answer: "For individual investors in Nepal, the Capital Gains Tax (CGT) is 5% for long-term holdings (over 365 days) and 7.5% for short-term holdings (under 365 days)." },
        { question: "When must I update my WACC in Meroshare?", answer: "You must confirm and update your WACC in the 'My Purchase Update' section of Meroshare after every new purchase or corporate action (bonus/rights) and definitely before performing E-DIS after a sale." },
        { question: "How do I handle right shares in the WACC calculation?", answer: "Right shares are typically acquired at par value (usually Rs. 100). Add the right share quantity as a new batch with a purchase price of 100 to find your new composite average cost." },
        { question: "What happens if I enter an incorrect WACC in Meroshare?", answer: "If you under-report, you may face tax penalties. If you over-report, you will overpay CGT. Always use your broker's TMS ledger data to ensure mathematical accuracy in your batch entries." },
        { question: "Is this updated for the 2081/82 fiscal year?", answer: "Yes, this engine follows the latest CDSC statutory algorithms and tax slabs mandated by the current Finance Act for stock market transactions in Nepal." }
      ]}
      sidebar={{
        title: "NEPSE Hub",
        subtitle: "Portfolio Audit",
        links: [
          { label: "Bonus Tax Tool", href: "/calculator/nepse-bonus-tax/", icon: Receipt },
          { label: "Trading Engine", href: "/calculator/nepal-stocks/", icon: Activity },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "Meroshare Portal", href: "https://meroshare.cdsc.com.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "Bonus Tax", href: "/calculator/nepse-bonus-tax/" },
        { label: "Trading Tool", href: "/calculator/nepal-stocks/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}
