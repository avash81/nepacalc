'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Receipt, Landmark, Info, Calculator, FileText, CheckCircle2, Zap, Scale, Activity, Globe, History, ShieldCheck, PieChart, Wallet, ArrowRight } from 'lucide-react';
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
        { name: 'Base', val: Math.round(baseAmount), fill: '#1A73E8' },
        { name: 'SC (10%)', val: Math.round(scAmount), fill: '#F29900' },
        { name: 'VAT (13%)', val: Math.round(vatAmount), fill: '#D93025' }
      ]
    };
  }, [mode, amount, includeServiceCharge]);

  return (
    <ModernCalcLayout
      slug="nepal-vat"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'VAT Calculator' }]}
      title="Nepal VAT"
      description="The authoritative 13% Value Added Tax (VAT) laboratory for Nepal. Bidirectional addition/extraction with cascading 10% Service Charge (SC) auditing."
      icon={Receipt}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Calculation Protocol</label>
               <div className="grid grid-cols-2 gap-3">
                {([{id:'add', l:'Add VAT'}, {id:'remove', l:'Extract VAT'}] as const).map(opt => (
                  <button 
                    key={opt.id} 
                    onClick={() => update({ mode: opt.id })} 
                    className={`h-11 rounded-md border text-[11px] font-black uppercase transition-all ${mode === opt.id ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    {opt.l}
                  </button>
                ))}
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">{mode === 'add' ? "Base Price (NPR)" : "Total Amount (NPR)"}</label>
               <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => update({ amount: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
               />
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Industry Modifiers</label>
               <div 
                  onClick={() => update({ includeServiceCharge: !includeServiceCharge })}
                  className={`cursor-pointer border rounded-md p-4 transition-all flex items-start gap-3 ${includeServiceCharge ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0] hover:border-[#1A73E8]'}`}
               >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${includeServiceCharge ? 'bg-[#1A73E8] border-[#1A73E8]' : 'border-[#DADCE0] bg-white'}`}>
                     {includeServiceCharge && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div>
                     <div className={`text-xs font-bold uppercase tracking-wider ${includeServiceCharge ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>Include 10% Service Charge</div>
                     <div className="text-[10px] text-[#5F6368] mt-1 leading-relaxed">Common in hospitality (Restaurants/Hotels). Service charge is added <span className="underline">before</span> VAT.</div>
                  </div>
               </div>
            </div>

            <div className="p-4 bg-[#FCE8E6] border border-[#D93025] rounded-md flex gap-3">
               <ShieldCheck className="w-5 h-5 text-[#D93025] shrink-0" />
               <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Institutional Standard: VAT rate in Nepal is legally fixed at <span className="text-[#D93025] underline decoration-2">13%</span> under the VAT Act 2052.
               </p>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate VAT Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">{mode === 'add' ? 'Total Payable Amount' : 'Base Product Value'}</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(mode === 'add' ? r.final : r.baseAmount)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                {mode === 'add' ? 'Inclusive of Taxes' : 'Exclusive of Taxes'}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mb-1">VAT Component (13%)</div>
                <div className="text-lg font-black text-[#D93025]">{formatNPR(r.vatAmount)}</div>
             </div>
             <div className={`border rounded-md p-4 text-center transition-colors ${includeServiceCharge ? 'border-[#F29900] bg-[#FFF9E6]' : 'border-[#DADCE0] bg-white opacity-50'}`}>
                <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${includeServiceCharge ? 'text-[#F29900]' : 'text-[#5F6368]'}`}>S. Charge (10%)</div>
                <div className={`text-lg font-black ${includeServiceCharge ? 'text-[#F29900]' : 'text-[#202124]'}`}>{formatNPR(r.scAmount)}</div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Tax Payload Ratio</span>
                <span className="text-[11px] font-black text-[#D93025]">{(( (r.final - r.baseAmount) / r.final ) * 100).toFixed(1)}%</span>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className="h-full bg-[#D93025]" style={{ width: `${( (r.final - r.baseAmount) / r.final ) * 100}%` }} />
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
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Price Composition Matrix</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={r.chartData.filter(d => d.val > 0)}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="val" stroke="none"
                     >
                       {r.chartData.filter(d => d.val > 0).map((entry, index) => (
                          <Cell key={`pie-cell-${index}`} fill={entry.fill} />
                       ))}
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Effective VAT</span>
                    <span className="text-lg font-black text-[#202124]">13%</span>
                 </div>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1A73E8]"></div> Base Value</div>
                  {includeServiceCharge && <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#F29900]"></div> Service Charge</div>}
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#D93025]"></div> VAT Component</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Tax Integrity Audit</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Base (NPR)</span>
                     <span className="text-sm font-black text-[#1A73E8]">{formatNPR(r.baseAmount)}</span>
                  </div>
                  {includeServiceCharge && (
                    <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                       <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Service Charge (NPR)</span>
                       <span className="text-sm font-black text-[#F29900]">{formatNPR(r.scAmount)}</span>
                    </div>
                  )}
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">VAT Payload (NPR)</span>
                     <span className="text-sm font-black text-[#D93025]">{formatNPR(r.vatAmount)}</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#E8F0FE] border border-[#1A73E8] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total (NPR)</span>
                     <span className="text-sm font-black text-[#1A73E8]">{formatNPR(r.final)}</span>
                  </div>
               </div>
             </div>
           </div>
        </div>
      }
      customSchema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Nepal VAT Calculator 13%",
        "url": "https://nepacalc.com/calculator/nepal-vat/",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "description": "Professional 13% VAT calculator for Nepal. Calculate inclusive and exclusive VAT, handle 10% service charge cascading, and reverse VAT extraction. IRD compliant.",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "NPR"
        },
        "publisher": {
          "@type": "Organization",
          "name": "NepaCalc",
          "url": "https://nepacalc.com"
        }
      }}
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

