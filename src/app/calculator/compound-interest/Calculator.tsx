'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, LineChart, PieChart, Info, Calendar, Target, Calculator, Table, Activity, Zap, ShieldCheck, Globe, Scale, ArrowRight, Wallet, History, ChevronRight } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

const COMPOUNDING = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-Annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
];

export default function CompoundInterestCalculator() {
  const [state, setState] = useSyncState('compound_interest_v4', {
    principal: 100000,
    rate: 10,
    years: 10,
    compounding: 1
  });
  const { principal, rate, years, compounding } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const r = rate / 100, n = compounding;
    const amount = principal * Math.pow(1 + r / n, n * years);
    const totalInterest = amount - principal;
    const schedule = Array.from({ length: Math.min(years, 50) }, (_, i) => {
      const yr = i + 1;
      const bal = principal * Math.pow(1 + r / n, n * yr);
      const prevBal = principal * Math.pow(1 + r / n, n * (yr - 1));
      return { 
        year: yr, 
        interest: bal - prevBal, 
        balance: bal,
        label: `Year ${yr}`
      };
    });
    return { amount, totalInterest, schedule };
  }, [principal, rate, years, compounding]);

  return (
    <ModernCalcLayout
      slug="compound-interest"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Financial', href: '/financial/' }, { label: 'Compound Interest' }]}
      title="Compound Interest"
      description="The definitive resource for understanding the mechanics of exponential growth. Calculate future wealth with institutional-grade precision for Nepalese financial planning."
      icon={TrendingUp}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Initial Capital (NPR)</label>
                   <input 
                      type="number" 
                      value={principal} 
                      onChange={(e) => update({ principal: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Growth Rate (%)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={rate} 
                        onChange={(e) => update({ rate: Number(e.target.value) })}
                        className="w-full h-12 px-6 bg-white/5 border border-white/10 rounded-xl text-lg font-black text-white focus:border-blue-500 outline-none transition-all" 
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Duration (Years)</label>
                      <input 
                        type="number" 
                        value={years} 
                        onChange={(e) => update({ years: Number(e.target.value) })}
                        className="w-full h-12 px-6 bg-white/5 border border-white/10 rounded-xl text-lg font-black text-white focus:border-blue-500 outline-none transition-all" 
                      />
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Activity className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compounding Frequency</h3>
             </div>
             <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-100 rounded-xl">
                {COMPOUNDING.map(c => (
                  <button 
                    key={c.value} 
                    onClick={() => update({ compounding: c.value })}
                    className={`py-3 text-[10px] font-black uppercase rounded-lg transition-all ${compounding === c.value ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white'}`}
                  >
                    {c.label}
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><TrendingUp className="w-24 h-24 text-emerald-600" /></div>
             <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Future Maturity Valuation</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">Rs. {fmt(result.amount)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Exponential Growth Over {years} Cycles
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Initial Seed</div>
                <div className="text-xl font-black text-slate-900">Rs. {fmt(principal)}</div>
             </div>
             <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-emerald-600 uppercase">Total Interest</div>
                <div className="text-xl font-black text-emerald-600">+Rs. {fmt(result.totalInterest)}</div>
             </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Zap className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Wealth Multiplier</h4>
                   <p className="text-2xl font-black">{(result.amount / principal).toFixed(2)}x</p>
                </div>
                <div className="bg-emerald-400/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                   Capital Appreciation
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
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Exponential Trajectory</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.schedule}>
                    <defs>
                      <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
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
                    <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><ShieldCheck className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Wealth DNA Audit</h3>
               <div className="h-[200px] w-full mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={[
                          { name: 'Initial Principal', value: principal },
                          { name: 'Interest Gained', value: result.totalInterest }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={8}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="rgba(255,255,255,0.1)" />
                        <Cell fill="#10b981" />
                      </Pie>
                      <Tooltip 
                         formatter={(v: number) => fmt(v)}
                         contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '10px', fontWeight: 'bold' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Seed</span>
                     <span className="text-sm font-black text-white">{((principal / result.amount) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Compound Interest</span>
                     <span className="text-sm font-black text-emerald-400">{((result.totalInterest / result.amount) * 100).toFixed(1)}%</span>
                  </div>
               </div>
            </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
             <div className="px-8 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Table className="w-4 h-4" /></div>
                   <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Growth Projection Matrix</h3>
                </div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Institutional Forecast: {years} Cycles</div>
             </div>
             <div className="overflow-x-auto max-h-[450px] custom-scrollbar">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-200">
                         <th className="px-8 py-5">Timeline</th>
                         <th className="px-8 py-5 text-right text-emerald-600">Interest Earned</th>
                         <th className="px-8 py-5 text-right">Cumulative Balance</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {result.schedule.map((row) => (
                         <tr key={row.year} className="text-[11px] hover:bg-slate-50 transition-colors group">
                            <td className="px-8 py-5 font-black text-slate-900 group-hover:text-blue-600 transition-colors">Year {row.year}</td>
                            <td className="px-8 py-5 text-right font-black text-emerald-600">+Rs. {fmt(row.interest)}</td>
                            <td className="px-8 py-5 text-right font-black text-slate-900">Rs. {fmt(row.balance)}</td>
                         </tr>
                      ))}
                   </tbody>
                 </table>
             </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Globe className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Compound Interest Encyclopedia: Exponential Wealth Dynamics</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                Compound interest is the mathematical phenomenon where interest earned on an initial principal also earns interest in subsequent periods. Unlike <strong>Simple Interest</strong>, which only grows linearly on the original seed, compounding creates an <strong>exponential curve</strong>, often described as the "hockey stick" effect in long-term wealth planning.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2.5rem] flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Zap className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">The "Eighth Wonder" Axiom</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      Albert Einstein famously characterized compound interest as the eighth wonder of the world. The core logic is simple: time is a greater multiplier than the interest rate itself. The longer the horizon, the more dominant the compounding effect becomes relative to the initial principal.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Frequency and the Effective Yield</h3>
              <p>
                The frequency of compounding (Monthly, Quarterly, or Annually) significantly impacts the <strong>Effective Annual Yield (EAY)</strong>. The more frequent the compounding interval, the faster interest is reinvested, resulting in a higher total maturity value. In Nepal, most commercial banks utilize <strong>Quarterly Compounding</strong> for Fixed Deposits (Muddati Khata).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Rule of 72</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      A quick mental shortcut to estimate doubling time. Divide 72 by your annual interest rate to find out how many years it takes to double your capital (e.g., at 9%, it takes ~8 years).
                    </p>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-emerald-50">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Negative Compounding</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      Inflation is essentially compound interest working against you. To grow "Real Wealth", your compounding rate must significantly exceed the local <strong>Consumer Price Index (CPI)</strong>.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. The Impact of TDS in Nepal</h3>
              <p>
                While compounding accelerates growth, resident individuals in Nepal must account for the mandatory <strong>5% Tax Deducted at Source (TDS)</strong> on interest earnings. This tax is typically withheld at each compounding interval or upon maturity, slightly dampening the net exponential curve but remaining the gold standard for secure, institutional growth.
              </p>
            </div>
          </section>

          <section className="bg-slate-900 text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10"><History className="w-64 h-64 text-blue-500" /></div>
             <h2 className="text-3xl font-black mb-10 tracking-tight text-blue-400 uppercase tracking-widest">Growth Guardrails</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Scale className="w-5 h-5" /> Linear vs Exponential</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Simple interest grows the same amount every year. Compound interest grows the <strong>rate of growth</strong> every year, creating massive divergence over decades.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><ShieldCheck className="w-5 h-5" /> Reinvestment Risk</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      The compounding engine assumes that all interest earned is immediately reinvested at the same rate. Withdrawing interest breaks the chain of growth.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Wallet className="w-5 h-5" /> Nominal vs Real Rate</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Always distinguish between the bank's quoted rate and your real growth after accounting for the local inflation index in Nepal.
                   </p>
                </div>
             </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Enter Principal: Input your starting investment amount in NPR.",
          "Set Rate: Input the expected annual growth rate (%) or bank FD rate.",
          "Select Duration: Choose the number of years you plan to remain invested.",
          "Choose Frequency: Select how often interest is calculated (Monthly/Quarterly).",
          "Analyze Multiplier: Review the wealth multiplier and exponential trajectory chart."
        ]
      }}
      formula={{
        title: "The Exponential Growth Axiom",
        description: "The mathematical standard for calculating future wealth under compounding.",
        raw: "$$A = P \\left(1 + \\frac{r}{n}\\right)^{nt}$$",
        latex: "A = P(1 + r/n)^{nt}"
      }}
      faqs={[
        { question: "What is the 'Eighth Wonder' of the world?", answer: "Albert Einstein famously referred to compound interest as the eighth wonder, stating: 'He who understands it, earns it... he who doesn't, pays it.'" },
        { question: "Is monthly compounding better than annual?", answer: "Yes. The more frequent the compounding, the higher the effective yield, as interest starts earning its own interest much sooner in the cycle." },
        { question: "What is the 'Rule of 72'?", answer: "It is a mental shortcut to find the doubling time. Divide 72 by the annual interest rate (e.g., a 9% rate doubles your money in exactly 8 years)." },
        { question: "How does inflation impact compounding?", answer: "Inflation acts as 'negative compounding'. Your real wealth only grows if your compounding rate exceeds the Consumer Price Index (CPI) growth." },
        { question: "What is the TDS on interest income in Nepal?", answer: "Interest earnings for resident individuals in Nepal are currently subject to a 5% Tax Deducted at Source (TDS), withheld automatically by banks." },
        { question: "What is 'Effective Annual Yield'?", answer: "It is the true annual return accounting for intra-year compounding. For example, 10% compounded quarterly results in a 10.38% effective yield." },
        { question: "When does compounding become most visible?", answer: "Compounding power is back-loaded. The most significant growth occurs in the final stages of the timeline, known as the 'Exponential Hockey Stick' effect." }
      ]}
      sidebar={{
        title: "Growth Hub",
        subtitle: "Wealth Planning",
        links: [
          { label: "SIP Calculator", href: "/calculator/sip-calculator", icon: TrendingUp },
          { label: "FD Calculator", href: "/calculator/fd-calculator", icon: Target },
          { label: "CAGR Engine", href: "/calculator/cagr-calculator", icon: LineChart },
          { label: "Tax Planner", href: "/calculator/nepal-income-tax", icon: Wallet },
        ],
      }}
      relatedTools={[
        { label: "SIP Calculator", href: "/calculator/sip-calculator" },
        { label: "FD Calculator", href: "/calculator/fd-calculator" },
        { label: "CAGR Calculator", href: "/calculator/cagr-calculator" }
      ]}
    />
  );
}
