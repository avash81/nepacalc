'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Home, Info, DollarSign, Landmark, ShieldCheck, Target, Receipt, Globe, Wallet, Scale, PieChart } from 'lucide-react';
import {
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function MortgageCalculator() {
  const [state, setState] = useSyncState('mortgage_v4', {
    pPrice: 15000000, downPercent: 25, rate: 12.5, years: 15, taxRate: 1.2, insurance: 50000
  });
  const { pPrice, downPercent, rate, years, taxRate, insurance } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const downAmt = pPrice * (downPercent / 100);
    const loan = pPrice - downAmt;
    const i = (rate / 100) / 12, n = years * 12;
    const pAndI = (loan * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const mTax = (pPrice * (taxRate / 100)) / 12;
    const mInsurance = insurance / 12;
    return { loan, downAmt, pAndI, mTax, mInsurance, monthlyTotal: pAndI + mTax + mInsurance, totalPaid: (pAndI * n), totalInterest: (pAndI * n) - loan };
  }, [pPrice, downPercent, rate, years, taxRate, insurance]);

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Mortgage Calculator' }]}
      title="Mortgage Calculator"
      description="Calculate full monthly mortgage payment including Principal & Interest, property tax, and insurance. Based on Nepal bank home loan rates."
      icon={Home}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Home className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Home Price (NPR)</label>
                   <div className="relative">
                      <input type="number" value={pPrice} min={100000} step={100000}
                        onChange={e => update({ pPrice: Number(e.target.value) })} className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">NPR</span>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Down Payment (%)</label>
                      <div className="relative">
                         <input type="number" value={downPercent} min={0} max={100}
                           onChange={e => update({ downPercent: Number(e.target.value) })} className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                         <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">%</span>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Interest Rate (%)</label>
                      <div className="relative">
                         <input type="number" value={rate} min={1} max={30} step={0.1}
                           onChange={e => update({ rate: Number(e.target.value) })} className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                         <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">%</span>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Loan Tenure</label>
                      <select value={years} onChange={e => update({ years: Number(e.target.value) })}
                        className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-sm font-black text-white focus:border-blue-500 outline-none transition-all appearance-none">
                        {[5, 10, 15, 20, 25, 30].map(y => <option key={y} value={y} className="bg-slate-900">{y} Years</option>)}
                      </select>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Annual Tax (%)</label>
                      <div className="relative">
                         <input type="number" value={taxRate} min={0} max={5} step={0.1}
                           onChange={e => update({ taxRate: Number(e.target.value) })} className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                         <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">%</span>
                      </div>
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Annual Insurance (NPR)</label>
                   <input type="number" value={insurance} min={0} step={5000}
                     onChange={e => update({ insurance: Number(e.target.value) })} className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                </div>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Home className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Total Monthly Payment</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{fmt(r.monthlyTotal)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Principal & Interest + Tax + Insurance
             </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
             <div className="px-10 py-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <DollarSign className="w-5 h-5 text-blue-600" />
                   <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Monthly Breakdown</h3>
                </div>
             </div>
             <div className="divide-y divide-slate-100">
                <div className="p-6 flex justify-between items-center text-xs hover:bg-slate-50 transition-colors">
                   <span className="text-slate-500 font-black uppercase tracking-widest">Principal & Interest</span>
                   <span className="font-black text-blue-600 text-sm">{fmt(r.pAndI)}</span>
                </div>
                <div className="p-6 flex justify-between items-center text-xs hover:bg-slate-50 transition-colors">
                   <span className="text-slate-500 font-black uppercase tracking-widest">Property Tax /mo</span>
                   <span className="font-black text-amber-500 text-sm">{fmt(r.mTax)}</span>
                </div>
                <div className="p-6 flex justify-between items-center text-xs hover:bg-slate-50 transition-colors">
                   <span className="text-slate-500 font-black uppercase tracking-widest">Insurance /mo</span>
                   <span className="font-black text-slate-900 text-sm">{fmt(r.mInsurance)}</span>
                </div>
                <div className="p-6 flex justify-between items-center text-xs hover:bg-slate-50 transition-colors">
                   <span className="text-slate-500 font-black uppercase tracking-widest">Loan Amount</span>
                   <span className="font-black text-slate-900 text-sm">{fmt(r.loan)} ({100 - downPercent}%)</span>
                </div>
                <div className="p-6 flex justify-between items-center text-xs hover:bg-slate-50 transition-colors">
                   <span className="text-slate-500 font-black uppercase tracking-widest">Down Payment</span>
                   <span className="font-black text-slate-900 text-sm">{fmt(r.downAmt)} ({downPercent}%)</span>
                </div>
                <div className="p-8 flex justify-between items-center text-xs bg-slate-50 border-t border-slate-200">
                   <span className="font-black text-slate-900 uppercase tracking-widest">Total Interest ({years} yrs)</span>
                   <span className="font-black text-rose-600 text-base">{fmt(r.totalInterest)}</span>
                </div>
             </div>
          </section>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] flex gap-4 items-center text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Info className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex gap-4">
                <div className="p-3 bg-white/10 rounded-xl shrink-0 h-min"><Info className="w-5 h-5 text-amber-400" /></div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                   Nepal home loan rates typically range 11–14% p.a. (floating). Confirm with your BFI before committing.
                </p>
             </div>
          </div>
        </div>
      }      details={
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-[#DADCE0] rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5"><PieChart className="w-20 h-20" /></div>
               <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-[#1A73E8] rounded-full" />
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-[0.2em]">Monthly Outflow Analysis</h3>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={[
                        { name: 'Principal & Interest', value: r.pAndI },
                        { name: 'Property Tax', value: r.mTax },
                        { name: 'Insurance', value: r.mInsurance }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#1A73E8" />
                      <Cell fill="#F29900" />
                      <Cell fill="#D93025" />
                    </Pie>
                    <Tooltip 
                      formatter={(v: number) => fmt(v)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-[10px] font-black text-[#70757A] uppercase tracking-tighter">Total Monthly</span>
                   <span className="text-lg font-black text-[#202124]">{fmt(r.monthlyTotal)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute -bottom-12 -right-12 opacity-10"><DollarSign className="w-64 h-64" /></div>
               <h3 className="text-2xl font-black mb-6 tracking-tight text-emerald-400 uppercase tracking-widest">Lifetime Cost Audit</h3>
               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Repayment</span>
                        <span className="text-2xl font-black text-emerald-400">{fmt(r.totalPaid + r.loan)}</span>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between text-[11px]">
                           <span className="text-slate-400">Principal Loan</span>
                           <span className="font-bold">{fmt(r.loan)}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                           <span className="text-slate-400">Total Interest (Estimate)</span>
                           <span className="font-bold text-red-400">+{fmt(r.totalInterest)}</span>
                        </div>
                     </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                     <h4 className="text-xs font-black text-red-400 uppercase mb-2">Cost Multiplier</h4>
                     <p className="text-[10px] text-slate-300 leading-relaxed">
                        You will pay back <strong>{((r.totalPaid / r.loan)).toFixed(1)}x</strong> of the amount you borrowed. This is typical for long-term home loans in Nepal due to high double-digit interest rates.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "NepaCalc Tools",
        subtitle: "Institutional Resources",
        links: [
          { label: "Loan EMI Tool", href: "/calculator/loan-emi", icon: Landmark },
          { label: "Property Tax", href: "/calculator/property-tax", icon: Receipt },
          { label: "Land Area Calc", href: "/calculator/nepal-land", icon: Home },
          { label: "Income Tax", href: "/calculator/nepal-income-tax", icon: DollarSign },
          { label: "NRB Website", href: "https://www.nrb.org.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "Loan EMI", href: "/calculator/loan-emi" },
        { label: "Property Tax", href: "/calculator/property-tax" },
        { label: "Nepal Land Converter", href: "/calculator/nepal-land" }
      ]}
    />
  );
}
