'use client';
import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNEPSEReturn } from '@/utils/math/country-rules/nepal';
import { 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  Info, 
  ShoppingCart, 
  ChevronRight,
  TrendingDown,
  Target,
  Zap
} from 'lucide-react';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';

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
    
    // Calculate Break-even (approximate)
    // Cost of buying + estimated cost of selling
    const totalFrictionPercent = 0.008; // ~0.8% total friction for round trip
    const breakEven = buyPrice * (1 + totalFrictionPercent);
    
    return { ...raw, breakEven };
  }, [qty, buyPrice, sellPrice, holdingDays, investorType]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <CalculatorLayout
      title="NEPSE Institutional Trading Lab"
      description="Professional-grade trade analysis dashboard for the Nepal Stock Exchange. Includes Jestha 2081 commission tiers, breakout CGT logic, and break-even pricing."
      category="nepal"
      leftPanel={
        <div className="space-y-8">
          
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[12px] font-black uppercase text-slate-400 tracking-widest">Trade Parameters</h3>
                <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                  {['individual', 'institutional'].map(t => (
                    <button 
                      key={t} 
                      onClick={() => update({ investorType: t as any })}
                      className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${investorType === t ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
             </div>
             
             <div className="space-y-10">
                <ValidatedInput 
                  label="Units (Quantity)" 
                  value={qty} 
                  onChange={v => update({ qty: v })} 
                  min={1} 
                  withSlider
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                   <ValidatedInput label="Purchase Price" value={buyPrice} onChange={v => update({ buyPrice: v })} prefix="Rs." min={10} />
                   <ValidatedInput label="Selling Price" value={sellPrice} onChange={v => update({ sellPrice: v })} prefix="Rs." min={10} />
                </div>
             </div>
          </div>

          {/* Holding Logic Dashboard */}
          <div className="bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-8">
             <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Tax Holding Period</h3>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                {[
                  { d: 364, l: 'Short Term', r: '7.5% CGT', desc: '< 1 Year' },
                  { d: 365, l: 'Long Term', r: '5% CGT', desc: '≥ 1 Year' }
                ].map(p => (
                  <button 
                    key={p.l}
                    onClick={() => update({ holdingDays: p.d })}
                    className={`p-6 text-left rounded-3xl border transition-all ${holdingDays >= p.d && p.d === 365 || holdingDays < 365 && p.d === 364 ? 'bg-white border-emerald-500 shadow-xl shadow-emerald-50' : 'bg-white/50 border-slate-200 opacity-60'}`}
                  >
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{p.desc}</div>
                     <div className="text-sm font-black text-slate-900">{p.l}</div>
                     <div className={`text-[12px] font-black mt-4 ${holdingDays >= p.d && p.d === 365 || holdingDays < 365 && p.d === 364 ? 'text-emerald-600' : 'text-slate-400'}`}>{p.r}</div>
                  </button>
                ))}
             </div>
             
             <div className="mt-6 p-5 bg-white border border-slate-200 rounded-3xl flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">Specified Days:</span>
                <input 
                  type="number" 
                  value={holdingDays} 
                  onChange={e => update({ holdingDays: parseInt(e.target.value) || 0 })}
                  className="w-20 text-right bg-transparent border-none text-[12px] font-black text-emerald-600 outline-none"
                />
             </div>
          </div>

        </div>
      }
      rightPanel={
        <div className="space-y-6">
          
          {/* Result Card: The NEPSE Pulse */}
          <div className={`p-10 rounded-[3rem] text-white overflow-hidden relative group shadow-2xl transition-all duration-700 ${result.netProfit >= 0 ? 'bg-slate-900' : 'bg-rose-950'}`}>
             <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] -mr-32 -mt-32 opacity-30 transition-all duration-1000 ${result.netProfit >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
             <div className="relative z-10 text-center">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Net Realized Profit/Loss</div>
                <div className={`text-6xl font-black tracking-tighter mb-4 transition-all ${result.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>Rs. {fmt(result.netProfit)}</div>
                <div className="flex items-center justify-center gap-3 mb-10">
                   <div className="px-5 py-1.5 bg-white/5 rounded-full text-[12px] font-black tracking-widest text-slate-400 italic">ROI: {result.roi}%</div>
                   {result.netProfit > 0 && <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />}
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/10">
                   <div className="text-left">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Tax Amount (CGT)</div>
                      <div className="text-xl font-black text-rose-400">Rs. {fmt(result.cgtAmount)}</div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Buy Efficiency</div>
                      <div className="text-xl font-black text-emerald-400">{Math.round((qty * buyPrice / result.totalCost) * 100)}%</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Break-even & Stats Dashboard */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
             <div className="flex items-center gap-3 mb-8">
                <Target className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Trading Intelligence</h4>
             </div>
             
             <div className="space-y-8">
                <div className="flex justify-between items-end">
                   <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Break-even Price</div>
                      <div className="text-3xl font-black text-slate-900 font-mono">Rs. {fmt(result.breakEven)}</div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Friction Cost</div>
                      <div className="text-lg font-black text-rose-500">~{fmt(result.totalCost - (qty * buyPrice))}</div>
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-50 space-y-4 font-mono italic">
                   <div className="flex justify-between items-center text-[12px] font-bold">
                      <span className="text-slate-400">Total Purchase Cost</span>
                      <span className="text-slate-800">Rs. {fmt(result.totalCost)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[12px] font-bold">
                      <span className="text-slate-400">Net Sell Proceed</span>
                      <span className="text-slate-800">Rs. {fmt(result.netSellProceeds)}</span>
                   </div>
                </div>

                <div className="mt-8 p-6 bg-slate-50 rounded-3xl flex gap-4 transition-all hover:bg-white hover:shadow-lg border border-transparent hover:border-blue-100">
                   <BarChart3 className="w-6 h-6 text-blue-600 shrink-0" />
                   <div>
                      <div className="text-[11px] font-black text-blue-900 uppercase mb-1">Commission Slab Applied</div>
                      <p className="text-[11px] text-blue-600 font-medium leading-relaxed italic">
                        Updated for **Jestha 2081** tiers. Including SEBON fees (0.015%) and DP charge (Rs. 25).
                      </p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: "How is CGT calculated in NEPSE?", answer: "Capital Gains Tax (CGT) is calculated on your net profit. Individuals pay 5% for holdings ≥ 365 days and 7.5% for holdings < 365 days. Institutional investors pay 10% regardless of duration." },
          { question: "What are the latest broker commission rates?", answer: "As of Jestha 2081, broker commissions are tiered: 0.36% for up to 50k, 0.33% up to 5 lakhs, 0.306% up to 20 lakhs, 0.27% up to 1 crore, and 0.243% above 1 crore." },
          { question: "Does this include WACC?", answer: "This calculator uses a direct buy/sell comparison. For accurate tax filing, you should use the WACC (Weighted Average Cost of Capital) maintained in your MeroShare portal." },
          { question: "What is the break-even price?", answer: "The break-even price is the selling price required per share to recover your total purchase cost, broker commissions for both buying and selling, and SEBON fees without making a loss." }
        ]} />
      }
    />
  );
}
