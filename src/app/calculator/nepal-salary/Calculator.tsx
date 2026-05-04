'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Wallet, Landmark, TrendingUp, Info, PieChart, Receipt, Zap, 
  Target, ShieldCheck, Activity, Globe, History, Scale, ArrowRight
} from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalSalary } from '@/utils/math/country-rules/nepal';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const DEFAULT_STATE = {
  grossSalary: 80000,
  married: false,
  ssf: true,
  cit: true,
  citAmount: 10000,
  gender: 'male' as 'male' | 'female',
  isMonthly: true
};

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NepalSalaryCalculator() {
  const [state, setState] = useSyncState('salary_institutional_v5', DEFAULT_STATE);
  const { grossSalary, married, ssf, cit, citAmount, gender } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const allowances = { hra: 0, medical: 0, transport: 0, other: 0 };
    const salary = calculateNepalSalary(grossSalary, ssf, cit, gender, allowances);
    
    const monthlyTax = salary.incomeTax / 12;
    const totalDeductions = salary.deductions.ssf_employee + (cit ? citAmount : 0) + monthlyTax;

    const chartData = [
      { name: 'Take Home', val: salary.netSalary, fill: '#10b981' },
      { name: 'Income Tax', val: monthlyTax, fill: '#ef4444' },
      { name: 'Retirement', val: salary.deductions.ssf_employee + (cit ? citAmount : 0), fill: '#3b82f6' }
    ];

    return {
      ...salary,
      monthlyTax,
      totalDeductions,
      chartData
    };
  }, [grossSalary, ssf, cit, citAmount, gender]);

  return (
    <ModernCalcLayout
      slug="nepal-salary"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'Salary Calculator' }]}
      title="Nepal Salary"
      description="The definitive institutional payroll engine for Nepal. Calculate take-home pay with Labor Act 2074 compliance, SSF statutory pooling, and CIT tax optimization."
      icon={Wallet}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Gross Monthly Salary (NPR)</label>
                   <input 
                      type="number" 
                      value={grossSalary} 
                      onChange={(e) => update({ grossSalary: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Filing Status</label>
                      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                        {[{v: false, l: 'Single'}, {v: true, l: 'Married'}].map(opt => (
                          <button key={opt.l} onClick={() => update({ married: opt.v as any })} className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${married === opt.v ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>{opt.l}</button>
                        ))}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Gender</label>
                      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                        {[{v: 'male', l: 'M'}, {v: 'female', l: 'F'}].map(opt => (
                          <button key={opt.l} onClick={() => update({ gender: opt.v as any })} className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${gender === opt.v ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>{opt.l}</button>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><ShieldCheck className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tax Optimization Shield</h3>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => update({ ssf: !ssf })}
                  className={`p-4 text-left border rounded-2xl transition-all ${ssf ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  <div className="text-[10px] font-black uppercase mb-1">SSF (Statutory)</div>
                  <div className="text-[9px] font-bold opacity-70">31% Pool</div>
                </button>
                <button 
                  onClick={() => update({ cit: !cit })}
                  className={`p-4 text-left border rounded-2xl transition-all ${cit ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  <div className="text-[10px] font-black uppercase mb-1">CIT (Voluntary)</div>
                  <div className="text-[9px] font-bold opacity-70">Tax Savings</div>
                </button>
             </div>
             {cit && (
                <div className="space-y-2 pt-2">
                   <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Monthly CIT Deposit</label>
                   <input type="number" value={citAmount} onChange={(e) => update({ citAmount: Number(e.target.value) })} className="w-full h-12 px-6 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-slate-900 focus:border-blue-500 outline-none transition-all" />
                </div>
             )}
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Wallet className="w-24 h-24 text-emerald-600" /></div>
             <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Monthly Take-Home Pay</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{formatNPR(result.netSalary)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Post-Deduction Credit
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-1 text-center">
                <div className="text-[9px] font-black text-slate-400 uppercase">Gross Salary</div>
                <div className="text-xl font-black text-slate-900">{formatNPR(grossSalary)}</div>
             </div>
             <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl space-y-1 text-center">
                <div className="text-[9px] font-black text-blue-600 uppercase">Monthly Tax</div>
                <div className="text-xl font-black text-blue-600">{formatNPR(result.monthlyTax)}</div>
             </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Target className="w-24 h-24 text-emerald-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Employer CTC</h4>
                   <p className="text-2xl font-black">{formatNPR(result.costToCompany)}</p>
                </div>
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                   Full Package Audit
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><PieChart className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Payroll Composition</h3>
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
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
               <div className="flex items-center gap-2 mb-8">
                 <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Deduction Ledger</h3>
               </div>
               <div className="divide-y divide-slate-100">
                  <div className="py-4 flex justify-between items-center text-xs">
                     <span className="font-bold text-slate-500 uppercase tracking-tighter">SSF Contribution (11%)</span>
                     <span className="font-black text-slate-900">{formatNPR(result.deductions.ssf_employee)}</span>
                  </div>
                  {cit && (
                    <div className="py-4 flex justify-between items-center text-xs">
                       <span className="font-bold text-slate-500 uppercase tracking-tighter">CIT Deposit (Voluntary)</span>
                       <span className="font-black text-slate-900">{formatNPR(citAmount)}</span>
                    </div>
                  )}
                  <div className="py-4 flex justify-between items-center text-xs">
                     <span className="font-bold text-slate-500 uppercase tracking-tighter">Estimated Income Tax</span>
                     <span className="font-black text-red-600">{formatNPR(result.monthlyTax)}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Income Tax", href: "/calculator/nepal-income-tax" },
        { label: "EPF Calculator", href: "/calculator/epf-calculator" },
        { label: "SSF Engine", href: "/calculator/ssf-calculator" }
      ]}
    />
  );
}
