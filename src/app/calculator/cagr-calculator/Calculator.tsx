'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, Info, BarChart2, PieChart, Table as TableIcon, ArrowUpRight, Landmark, Briefcase, GraduationCap, Microscope, ShieldCheck, History, Search, Calculator, Zap } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

const PRESETS = [
  { label: 'NEPSE Average', initial: 100000, final: 250000, years: 5 },
  { label: 'A-Class FD Return', initial: 100000, final: 161000, years: 6 },
  { label: 'Valley Real Estate', initial: 500000, final: 2000000, years: 10 },
];

export default function CAGRCalculator() {
  const [state, setState] = useSyncState('cagr_v5', { initial: 100000, finalV: 250000, years: 5 });
  const { initial, finalV, years } = state;
  const [view, setView] = useState<'chart' | 'table'>('chart');

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const { cagr, data, totalGrowth, netGain } = useMemo(() => {
    if (initial <= 0 || finalV <= 0 || years <= 0) return { cagr: 0, data: [], totalGrowth: 0, netGain: 0 };
    
    const rate = (Math.pow(finalV / initial, 1 / years) - 1);
    const cagrVal = rate * 100;
    
    const chartData = [];
    for (let i = 0; i <= years; i++) {
      chartData.push({
        year: `Year ${i}`,
        value: Math.round(initial * Math.pow(1 + rate, i)),
      });
    }

    return {
      cagr: cagrVal,
      data: chartData,
      totalGrowth: ((finalV - initial) / initial * 100),
      netGain: finalV - initial
    };
  }, [initial, finalV, years]);

  return (
    <ModernCalcLayout
      slug="cagr-calculator"
      crumbs={[{ label: 'Investment Tools', href: '/investment/' }, { label: 'CAGR Calculator' }]}
      title="CAGR Calculator"
      description="Calculate Compound Annual Growth Rate for NEPSE stocks and real estate."
      icon={TrendingUp}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Initial Value (NPR)</label>
                     <input 
                        type="number" 
                        value={initial} 
                        onChange={(e) => update({ initial: Number(e.target.value) })}
                        className="w-full h-12 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-lg font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
                     />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Final Value (NPR)</label>
                     <input 
                        type="number" 
                        value={finalV} 
                        onChange={(e) => update({ finalV: Number(e.target.value) })}
                        className="w-full h-12 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-lg font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
                     />
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Duration</label>
                      <span className="text-[10px] font-black text-[#1a0dab]">{years} YEARS</span>
                   </div>
                   <input 
                      type="range" 
                      min={1} 
                      max={30} 
                      value={years} 
                      onChange={(e) => update({ years: Number(e.target.value) })}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                   />
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Landmark className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Market Benchmarks (Nepal)</h3>
             </div>
             <div className="grid grid-cols-1 gap-3">
                {PRESETS.map(p => (
                  <button 
                    key={p.label} 
                    onClick={() => update({ initial: p.initial, finalV: p.final, years: p.years })}
                    className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-blue-200 transition-all group"
                  >
                    <div className="text-left">
                       <div className="text-[10px] font-black uppercase text-slate-900 group-hover:text-blue-600">{p.label}</div>
                       <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{p.years} Year Horizon</div>
                    </div>
                    <div className="text-right">
                       <div className="text-[11px] font-black text-slate-600">{fmt(p.final)}</div>
                       <div className="text-[9px] font-bold text-emerald-500 uppercase">Target</div>
                    </div>
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><TrendingUp className="w-24 h-24 text-emerald-600" /></div>
             <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Annualized Growth (CAGR)</div>
             <div className="text-6xl font-black tracking-tighter text-slate-900 font-mono uppercase">{cagr.toFixed(2)}%</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Geometric Mean Performance
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Total ROI</div>
                <div className="text-xl font-black text-emerald-600">+{totalGrowth.toFixed(1)}%</div>
             </div>
             <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-blue-600 uppercase">Wealth Created</div>
                <div className="text-xl font-black text-blue-600">Rs. {fmt(netGain)}</div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><TrendingUp className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-[#1a73e8] rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Growth Trajectory</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                      formatter={(v: number) => `Rs. ${fmt(v)}`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-[#202124] rounded-lg p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><Landmark className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Growth Breakdown</h3>
               <div className="overflow-y-auto max-h-[250px] custom-scrollbar pr-4">
                  <table className="w-full text-left">
                     <tbody className="divide-y divide-white/10">
                        {data.map((d, i) => (
                           <tr key={i} className="group">
                              <td className="py-4 text-[10px] font-black uppercase text-slate-400 group-hover:text-[#202124] transition-colors">{d.year}</td>
                              <td className="py-4 text-right text-sm font-black text-[#202124]">{fmt(d.value)}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        </div>
      }
      howToUse={{ 
        steps: [
          "Enter the Initial Value (Purchase Price).", 
          "Enter the Final Value (Current Market Price).", 
          "Set the Investment Duration (Years).", 
          "Analyze the Result against Nepal benchmarks.",
          "Check the growth trajectory in the charts."
        ] 
      }}
      formula={{ 
        title: "The CAGR Protocol", 
        description: "CAGR is the constant rate of return required for an investment to grow from start to end.", 
        raw: "CAGR = [(Final / Initial)^(1/Years)] - 1",
        latex: "CAGR = \\left( \\frac{V_{end}}{V_{start}} \\right)^{\\frac{1}{n}} - 1"
      }}
      relatedTools={[
        { label: "SIP Calculator", href: "/calculator/sip-calculator/" }, 
        { label: "Fixed Deposit Calc", href: "/calculator/fd-calculator/" }
      ]}
    />
  );
}
