'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { ShieldCheck, Wallet, Landmark, Zap, Target, PieChart, Info, Globe, History, Activity } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip 
} from 'recharts';

const DEFAULT_STATE = { 
  basic: 50000, 
  years: 10, 
  rate: 8 
};

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NepalPFCalculator() {
  const [state, setState] = useSyncState('nepal_pf_institutional_v1', DEFAULT_STATE);
  const { basic, years, rate } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const monthlyPF = basic * 0.20;
    const annualGratuity = basic * 0.0833 * 12;
    const monthlyRate = rate / 100 / 12;
    let totalPF = 0;
    for (let i = 0; i < years * 12; i++) { 
      totalPF = (totalPF + monthlyPF) * (1 + monthlyRate); 
    }
    const totalGratuity = annualGratuity * years;
    const total = totalPF + totalGratuity;

    const chartData = [
      { name: 'Provident Fund', val: totalPF, fill: '#3b82f6' },
      { name: 'Gratuity', val: totalGratuity, fill: '#10b981' }
    ];

    return { monthlyPF, totalPF, totalGratuity, total, chartData };
  }, [basic, years, rate]);

  const inputBlock = (
    <div className="space-y-8">
      <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
         <div className="relative z-10 grid grid-cols-1 gap-6">
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Monthly Basic Salary (NPR)</label>
               <input 
                  type="number" 
                  value={basic} 
                  onChange={(e) => update({ basic: Number(e.target.value) })}
                  className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
               />
               <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Note: Statutory PF is calculated only on Basic Salary.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Service Years</label>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => update({ years: Number(e.target.value) })}
                    className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-lg font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Interest Rate (%)</label>
                  <input 
                    type="number" 
                    value={rate} 
                    step="0.1"
                    onChange={(e) => update({ rate: Number(e.target.value) })}
                    className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-lg font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
                  />
               </div>
            </div>
         </div>
      </div>

      <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><ShieldCheck className="w-4 h-4 text-blue-600" /></div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Statutory Rules (Labor Act 2074)</h3>
         </div>
         <div className="divide-y divide-slate-100">
            {[
              ['Employee Contribution', '10% of basic'],
              ['Employer Contribution', '10% of basic'],
              ['Gratuity Rate', '8.33% monthly']
            ].map(([label, val]) => (
              <div key={label} className="py-3 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{label}</span>
                <span className="text-[10px] font-black text-blue-600 uppercase">{val}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  return (
    <ModernCalcLayout
      slug="nepal-provident-fund"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'Provident Fund' }]}
      title="Nepal PF & Gratuity Institutional Engine"
      description="The definitive calculator for accumulated Provident Fund (EPF) and Gratuity under Nepal Labor Act 2074. Project your total retirement corpus with compound interest precision."
      icon={ShieldCheck}
      inputs={inputBlock}
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Landmark className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Total Retirement Corpus</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{formatNPR(result.total)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                After {years} years of service
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-center">
                <div className="text-[9px] font-black text-slate-400 uppercase">Monthly PF</div>
                <div className="text-xl font-black text-slate-900">{formatNPR(result.monthlyPF)}</div>
             </div>
             <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg space-y-1 text-center">
                <div className="text-[9px] font-black text-blue-600 uppercase">PF Interest Rate</div>
                <div className="text-xl font-black text-blue-600">{rate}%</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Target className="w-24 h-24 text-emerald-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">EPF Balance</h4>
                   <p className="text-2xl font-black">{formatNPR(result.totalPF)}</p>
                </div>
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                   Compound Growth
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><PieChart className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-[#1a73e8] rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Corpus Composition</h3>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={result.chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="val"
                      stroke="none"
                    >
                      {result.chartData.map((entry, index) => (
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
                   <span className="text-[9px] font-black text-slate-400 uppercase">Total Fund</span>
                   <span className="text-lg font-black text-slate-900">{formatNPR(result.total)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-[#202124] rounded-lg p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><Activity className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Growth Dynamics</h3>
               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-[#dadce0]">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gratuity Accrual</span>
                        <span className="text-xl font-black text-emerald-400">+{formatNPR(result.totalGratuity)}</span>
                     </div>
                     <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#dadce0]">
                        <div className="text-[9px] text-slate-400 uppercase font-black mb-1">PF Principal</div>
                        <div className="text-sm font-black">{formatNPR(result.monthlyPF * 12 * years)}</div>
                     </div>
                     <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#dadce0]">
                        <div className="text-[9px] text-slate-400 uppercase font-black mb-1">Interest Gain</div>
                        <div className="text-sm font-black text-rose-400">{formatNPR(result.totalPF - (result.monthlyPF * 12 * years))}</div>
                     </div>
                  </div>
               </div>
               <p className="mt-6 text-[9px] text-slate-500 leading-relaxed uppercase tracking-widest font-black">
                  Audit of cumulative retirement benefits and compounding efficiency.
               </p>
            </div>
          </div>

          {/* Retirement Encyclopedia - content body */}
          <section className="bg-white border border-slate-200 rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Landmark className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <History className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Retirement Encyclopedia: Nepal Statutory Framework</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>Building a robust financial foundation in <strong>Nepal</strong> requires accurate long-term forecasting. Our <strong>Institutional PF Engine</strong> is specifically modeled around the statutory requirements established by the <strong>Labor Act 2074</strong> mandates. It calculates the exact monthly accumulation generated by the mandatory 10% employee deduction matched by a mandatory 10% employer contribution, totaling 20% of your Basic Salary injected into your retirement corpus every month.</p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-lg flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Info className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">PF vs. Gratuity Distinction</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      Provident Fund is a mutual contribution model (20% total), while Gratuity is solely an employer liability (8.33%). Both are calculated strictly on your <strong>Basic Salary</strong>, excluding allowances.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Continuous Compounding (EPF)</h3>
              <p>The Employee Provident Fund operates on a monthly compounding basis. The 20% total monthly contribution is deposited into your government-managed account. The interest generated in Month 1 is added to the principal to generate even higher interest in Month 2. Over a 20 to 30-year career, this exponential growth curve means the interest earned often vastly exceeds your actual principal contributions.</p>
              
              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. Linear Accumulation (Gratuity)</h3>
              <p>Under the Labor Act 2074, employers must allocate exactly 8.33% of your monthly basic salary toward gratuity from your first day of employment. Unlike the older Labor Act 2048, which had tiered gratuity based on years served, the new act standardizes this. Our tool computes both streams simultaneously but displays them distinctly in the breakdown to match official HR ledgers.</p>
            </div>
          </section>

          {/* Retirement Integrity Guardrails - content body */}
          <section className="bg-white border border-[#dadce0] text-[#202124] rounded-lg p-12 shadow-sm relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10"><ShieldCheck className="w-64 h-64 text-blue-500" /></div>
             <h2 className="text-3xl font-black mb-10 tracking-tight text-[#1a0dab] uppercase tracking-widest">Retirement Integrity Guardrails</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><History className="w-5 h-5" /> SSF Transition</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Many companies are moving to the Social Security Fund (SSF). The 31% SSF pool includes PF, Gratuity, and Insurance in a unified contribution model.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Target className="w-5 h-5" /> Tax Shield</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      PF contributions provide a massive income tax deduction. You can deduct up to Rs. 300,000 or 1/3rd of assessable income from your taxable gross.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Globe className="w-5 h-5" /> PAN Mandate</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      A Permanent Account Number (PAN) is mandatory to track your PF contributions and ensure legal withdrawal at the end of service.
                   </p>
                </div>
             </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Basic Salary: Enter your monthly basic salary (not gross).",
          "Service Period: Set the total number of years you plan to contribute.",
          "Interest Rate: Use the current EPF rate (usually around 8%).",
          "Breakdown: Review the split between PF balance and Gratuity total.",
          "Projection: Check the final corpus value for long-term retirement planning."
        ]
      }}
      formula={{
        title: "Statutory Retirement Calculus",
        description: "Official formulas based on Labor Act 2074 standards.",
        raw: "$$Total = \sum_{i=1}^{n*12} (MonthlyPF) \cdot (1 + r)^i + (Basic \cdot 8.33\% \cdot 12 \cdot n)$$",
        latex: "Total = \sum_{i=1}^{n*12} (MonthlyPF) \cdot (1 + r)^i + (Basic \cdot 8.33\% \cdot 12 \cdot n)"
      }}
      faqs={[
        { question: "Is PF calculated on gross or basic salary?", answer: "Under the Labor Act 2074, both Provident Fund (10% + 10%) and Gratuity (8.33%) are calculated strictly on your Basic Salary." },
        { question: "What is the difference between EPF and SSF?", answer: "EPF (Sanchaya Kosh) is the traditional fund, while SSF is a unified social security pool (31%) that includes insurance and pension." },
        { question: "Can I withdraw my PF before retirement?", answer: "Yes, you can take 'Special Loans' (up to 80% of your corpus) for medical, housing, or educational needs as per EPF rules." },
        { question: "Is the interest earned on PF taxable?", answer: "No, interest accrued is tax-free while in the fund. However, a 5% tax is levied on the 'gain' at the time of final withdrawal." },
        { question: "Do contract employees get PF and Gratuity?", answer: "Yes, the Labor Act 2074 mandates PF and Gratuity for all workers from the first day of employment, regardless of contract status." },
        { question: "What happens to my PF if I change jobs?", answer: "Your PF account is tied to your identity (KYC). Your new employer simply continues deposits into your existing account number." }
      ]}
      sidebar={{
        title: "Wealth Hub",
        subtitle: "Retirement Tools",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Wallet },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Landmark },
          { label: "Gratuity Tool", href: "/calculator/gratuity-calculator/", icon: History },
          { label: "Labor Act Guide", href: "/blog/nepal-labor-act-guide/", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" },
        { label: "Gratuity Calculator", href: "/calculator/gratuity-calculator/" }
      ]}
    />
  );
}
