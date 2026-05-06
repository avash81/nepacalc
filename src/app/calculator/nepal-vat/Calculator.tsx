'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Receipt, Landmark, Info, Calculator, FileText, CheckCircle2, Zap, Scale, Activity, Globe, History, ShieldCheck, PieChart, Wallet } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NepalVATCalculator() {
  const [state, setState] = useSyncState('nepal_vat_v5', {
    mode: 'add' as 'add' | 'remove',
    amount: 1000,
    includeServiceCharge: false
  });
  const { mode, amount, includeServiceCharge } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const vatRate = 0.13;
    const scRate = 0.10;
    
    let baseAmount = 0, scAmount = 0, vatAmount = 0, final = 0;

    if (mode === 'add') {
      baseAmount = amount;
      scAmount = includeServiceCharge ? baseAmount * scRate : 0;
      vatAmount = (baseAmount + scAmount) * vatRate;
      final = baseAmount + scAmount + vatAmount;
    } else {
      final = amount;
      const combinedMultiplier = includeServiceCharge ? (1 + scRate) * (1 + vatRate) : (1 + vatRate);
      baseAmount = final / combinedMultiplier;
      scAmount = includeServiceCharge ? baseAmount * scRate : 0;
      vatAmount = final - baseAmount - scAmount;
    }

    return { 
      baseAmount, 
      scAmount, 
      vatAmount, 
      final,
      chartData: [
        { name: 'Base', val: Math.round(baseAmount), fill: '#3b82f6' },
        { name: 'SC (10%)', val: Math.round(scAmount), fill: '#fbbf24' },
        { name: 'VAT (13%)', val: Math.round(vatAmount), fill: '#ef4444' }
      ]
    };
  }, [mode, amount, includeServiceCharge]);

  return (
    <ModernCalcLayout
      slug="nepal-vat"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'VAT Calculator' }]}
      title="Nepal VAT"
      description="The authoritative 13% Value Added Tax (VAT) laboratory for Nepal. bidirectional addition/extraction with cascading 10% Service Charge (SC) auditing."
      icon={Receipt}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Calculation Protocol</label>
                   <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                    {([{id:'add', l:'Add VAT'}, {id:'remove', l:'Extract VAT'}] as const).map(opt => (
                      <button key={opt.id} onClick={() => update({ mode: opt.id })} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${mode === opt.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>{opt.l}</button>
                    ))}
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">{mode === 'add' ? "Base Price (NPR)" : "Total Amount (NPR)"}</label>
                   <input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => update({ amount: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Activity className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Industry Modifiers</h3>
             </div>
             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <input 
                   type="checkbox" 
                   id="sc_check" 
                   checked={includeServiceCharge} 
                   onChange={e => update({ includeServiceCharge: e.target.checked })}
                   className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500" 
                />
                <label htmlFor="sc_check" className="text-[11px] font-black text-slate-700 uppercase leading-none cursor-pointer">Include 10% Service Charge (Hospitality)</label>
             </div>
             <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed italic">
                Cascading Logic: Service Charge is added <span className="text-blue-600 underline">before</span> VAT calculation as per IRD standards.
             </p>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Receipt className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">{mode === 'add' ? 'Total Payable Amount' : 'Base Product Value'}</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{formatNPR(mode === 'add' ? r.final : r.baseAmount)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                {mode === 'add' ? 'Inclusive of Taxes' : 'Exclusive of Taxes'}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">VAT Component (13%)</div>
                <div className="text-xl font-black text-slate-900">{formatNPR(r.vatAmount)}</div>
             </div>
             <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-amber-600 uppercase">S. Charge (10%)</div>
                <div className="text-xl font-black text-amber-600">{formatNPR(r.scAmount)}</div>
             </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Scale className="w-24 h-24 text-emerald-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Tax Payload</h4>
                   <p className="text-2xl font-black">{(( (r.final - r.baseAmount) / r.final ) * 100).toFixed(1)}%</p>
                </div>
                <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${( (r.final - r.baseAmount) / r.final ) * 100}%` }} />
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><Activity className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Price Composition Matrix</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={r.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <YAxis hide />
                    <Tooltip 
                      formatter={(v: number) => formatNPR(v)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="val" radius={[8, 8, 0, 0]} barSize={40}>
                       {r.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><PieChart className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Tax Integrity Audit</h3>
               <div className="h-[240px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={r.chartData.filter(d => d.val > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={10}
                        dataKey="val"
                        stroke="none"
                      >
                        {r.chartData.filter(d => d.val > 0).map((entry, index) => (
                           <Cell key={`pie-cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                         formatter={(v: number) => formatNPR(v)}
                         contentStyle={{ borderRadius: '12px', backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '10px' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-[9px] font-black text-slate-400 uppercase">Effective VAT</span>
                     <span className="text-xl font-black text-emerald-400">13%</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Fiscal Hub",
        subtitle: "Tax Compliance",
        links: [
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "TDS Calculator", href: "/calculator/nepal-tds/", icon: Zap },
          { label: "Salary Tool", href: "/calculator/nepal-salary/", icon: Activity },
          { label: "IRD Website", href: "https://ird.gov.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
        { label: "TDS Calculator", href: "/calculator/nepal-tds/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}
