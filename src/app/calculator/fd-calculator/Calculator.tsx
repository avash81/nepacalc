'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Banknote, TrendingUp, Info, Shield, PiggyBank, Activity, Zap, ShieldCheck, Globe, Scale, ArrowRight, Wallet, History, ChevronRight, Table, Landmark } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

function fmt(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

const COMP_OPTIONS = [
  { label: 'Monthly', value: 12 },
  { label: 'Quarterly', value: 4 },
  { label: 'Half-Yearly', value: 2 },
  { label: 'Yearly', value: 1 },
];

export default function FDCalculator() {
  const [state, setState] = useSyncState('fd_v4', { principal: 100000, rate: 10, time: 1, compounding: 4 });
  const { principal, rate, time, compounding } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const amount = principal * Math.pow(1 + rate / 100 / compounding, compounding * time);
    const interest = amount - principal;
    const tds = interest * 0.05; // 5% TDS for individuals in Nepal
    
    const schedule = Array.from({ length: 11 }, (_, i) => {
      const t = (i * time) / 10;
      const amt = principal * Math.pow(1 + rate / 100 / compounding, compounding * t);
      return { 
        year: `${(t).toFixed(1)}y`, 
        balance: Math.round(amt),
        interest: Math.round(amt - principal)
      };
    });

    return { 
      maturity: amount, 
      interest, 
      tds,
      netMaturity: amount - tds,
      pctGrowth: ((interest / principal) * 100).toFixed(1),
      schedule
    };
  }, [principal, rate, time, compounding]);

  return (
    <ModernCalcLayout
      slug="fd-calculator"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Financial', href: '/financial/' }, { label: 'FD Calculator' }]}
      title="Fixed Deposit (FD)"
      description="The definitive engine for term deposits in Nepal. Calculate Muddati Khata returns with Class A bank compounding protocols and 5% TDS auditing."
      icon={Banknote}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Principal Deposit</label>
                   <input 
                      type="number" 
                      value={principal} 
                      onChange={(e) => update({ principal: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Interest Rate (%)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={rate} 
                        onChange={(e) => update({ rate: Number(e.target.value) })}
                        className="w-full h-12 px-6 bg-white/5 border border-white/10 rounded-xl text-lg font-black text-white focus:border-blue-500 outline-none transition-all" 
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Term (Years)</label>
                      <input 
                        type="number" 
                        value={time} 
                        onChange={(e) => update({ time: Number(e.target.value) })}
                        className="w-full h-12 px-6 bg-white/5 border border-white/10 rounded-xl text-lg font-black text-white focus:border-blue-500 outline-none transition-all" 
                      />
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Activity className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compounding Protocol</h3>
             </div>
             <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-xl">
                {COMP_OPTIONS.map(opt => (
                  <button 
                    key={opt.value} 
                    onClick={() => update({ compounding: opt.value })}
                    className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${compounding === opt.value ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white'}`}
                  >
                    {opt.label}
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Banknote className="w-24 h-24 text-emerald-600" /></div>
             <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Gross Maturity Value</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{fmt(r.maturity)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Grows {r.pctGrowth}% over {time} Year{time !== 1 ? 's' : ''}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Gross Interest</div>
                <div className="text-xl font-black text-slate-900">+{fmt(r.interest)}</div>
             </div>
             <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-rose-600 uppercase">TDS (5% Personal)</div>
                <div className="text-xl font-black text-rose-600">-{fmt(r.tds)}</div>
             </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><TrendingUp className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Net Maturity Value</h4>
                   <p className="text-2xl font-black">{fmt(r.netMaturity)}</p>
                </div>
                <div className="bg-emerald-400/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                   Post-Tax Yield
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><TrendingUp className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Maturity Progression</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={r.schedule}>
                    <defs>
                      <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                      formatter={(v: number) => fmt(v)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><ShieldCheck className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Security & Leveraging</h3>
               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DCGF Coverage</span>
                        <span className="text-sm font-black text-emerald-400">{principal <= 500000 ? "100%" : `${((500000/principal)*100).toFixed(0)}%`}</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400" style={{ width: `${Math.min(100, (500000/principal)*100)}%` }} />
                     </div>
                     <p className="mt-3 text-[9px] text-slate-500 leading-relaxed uppercase font-black">
                        Deposits up to NPR 500,000 are guaranteed by sovereign DCGF.
                     </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FD Overdraft Capacity (90%)</span>
                        <span className="text-lg font-black text-blue-400">{fmt(principal * 0.9)}</span>
                     </div>
                     <p className="text-[9px] text-slate-500 leading-relaxed uppercase font-black">
                        Instant liquidity available against this deposit.
                     </p>
                  </div>
               </div>
            </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
             <div className="px-8 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Table className="w-4 h-4" /></div>
                   <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Institutional Maturity Grid</h3>
                </div>
             </div>
             <div className="overflow-x-auto max-h-[450px] custom-scrollbar">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-200">
                         <th className="px-8 py-5">Timeline</th>
                         <th className="px-8 py-5 text-right text-emerald-600">Accrued Interest</th>
                         <th className="px-8 py-5 text-right">Projected Balance</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {r.schedule.map((row, idx) => (
                         <tr key={idx} className="text-[11px] hover:bg-slate-50 transition-colors group">
                            <td className="px-8 py-5 font-black text-slate-900 group-hover:text-blue-600 transition-colors">{row.year}</td>
                            <td className="px-8 py-5 text-right font-black text-emerald-600">+{fmt(row.interest)}</td>
                            <td className="px-8 py-5 text-right font-black text-slate-900">{fmt(row.balance)}</td>
                         </tr>
                      ))}
                   </tbody>
                 </table>
             </div>
          </section>
        </div>
      }
      sidebar={{
        title: "Savings Hub",
        subtitle: "Wealth Planning",
        links: [
          { label: "SIP Calculator", href: "/calculator/sip-calculator/", icon: TrendingUp },
          { label: "Loan EMI tool", href: "/calculator/loan-emi/", icon: Banknote },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "Compound Interest", href: "/calculator/compound-interest/", icon: Activity },
        ],
      }}
      relatedTools={[
        { label: "SIP Calculator", href: "/calculator/sip-calculator/" },
        { label: "Loan EMI", href: "/calculator/loan-emi/" },
        { label: "Compound Interest", href: "/calculator/compound-interest/" }
      ]}
    />
  );
}
