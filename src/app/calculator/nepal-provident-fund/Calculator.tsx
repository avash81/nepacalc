'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { ShieldCheck, Wallet, Landmark, Zap, Target, PieChart, Info, Globe, History, Activity, TrendingUp, Receipt } from 'lucide-react';
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
      { name: 'Provident Fund', val: Math.round(totalPF), fill: '#1A73E8' },
      { name: 'Gratuity', val: Math.round(totalGratuity), fill: '#F29900' }
    ];

    return { monthlyPF, totalPF, totalGratuity, total, chartData };
  }, [basic, years, rate]);

  return (
    <ModernCalcLayout
      slug="nepal-provident-fund"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Provident Fund' }]}
      title="Nepal PF & Gratuity"
      description="The definitive calculator for accumulated Provident Fund (EPF) and Gratuity under Nepal Labor Act 2074. Project your total retirement corpus with compound interest precision."
      icon={ShieldCheck}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Monthly Basic Salary (NPR)</label>
               <input 
                  type="number" 
                  value={basic} 
                  onChange={(e) => update({ basic: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
               />
               <p className="text-[9px] text-[#5F6368] uppercase font-bold tracking-wider mt-1">Note: Statutory PF is calculated only on Basic Salary, excluding allowances.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Service Years</label>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => update({ years: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">EPF Rate (%)</label>
                  <input 
                    type="number" 
                    value={rate} 
                    step="0.1"
                    onChange={(e) => update({ rate: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
                  />
               </div>
            </div>

            <div className="p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-md flex gap-3">
               <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
               <div className="space-y-2 w-full">
                  <p className="text-[10px] text-[#202124] font-black leading-relaxed uppercase">
                     Statutory Rules (Labor Act 2074)
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                     <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#5F6368] font-bold uppercase">Employee Deduct</span>
                        <span className="text-[#1A73E8] font-black">10%</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#5F6368] font-bold uppercase">Employer Match</span>
                        <span className="text-[#1A73E8] font-black">10%</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#5F6368] font-bold uppercase">Gratuity Rate</span>
                        <span className="text-[#F29900] font-black">8.33% Monthly</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Project Retirement Corpus
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Retirement Corpus</div>
             <div className="text-5xl font-black text-[#1A73E8] tracking-tight">{formatNPR(result.total)}</div>
             <div className="flex justify-center mt-2">
                <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0] shadow-sm">
                   Projected after {years} years of service
                </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">EPF Balance</div>
                <div className="text-lg font-black text-[#1A73E8]">{formatNPR(result.totalPF)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#F29900] uppercase tracking-wider mb-1">Gratuity Balance</div>
                <div className="text-lg font-black text-[#F29900]">{formatNPR(result.totalGratuity)}</div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">EPF Interest Yield</span>
                <span className="text-[11px] font-black text-[#188038]">
                   +{((result.totalPF - (result.monthlyPF * 12 * years)) / (result.monthlyPF * 12 * years) * 100).toFixed(1)}% Return
                </span>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className="h-full bg-[#188038]" style={{ width: '100%' }} />
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
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Corpus Composition Matrix</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={result.chartData}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="val" stroke="none"
                     >
                       {result.chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.fill} />
                       ))}
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Total Fund</span>
                    <span className="text-lg font-black text-[#202124]">{formatNPR(result.total)}</span>
                 </div>
               </div>
               <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1A73E8]"></div> Provident Fund</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#F29900]"></div> Gratuity Reserve</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Growth Dynamics Audit</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Monthly PF (20%)</span>
                     <span className="text-sm font-black text-[#1A73E8]">{formatNPR(result.monthlyPF)}</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">PF Principal Paid</span>
                     <span className="text-sm font-black text-[#202124]">{formatNPR(result.monthlyPF * 12 * years)}</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#E8F0FE] border border-[#1A73E8] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Compound Interest Earned</span>
                     <span className="text-sm font-black text-[#1A73E8]">+{formatNPR(result.totalPF - (result.monthlyPF * 12 * years))}</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#FFF9E6] border border-[#F29900] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#F29900] uppercase tracking-wider">Gratuity Accrual (Linear)</span>
                     <span className="text-sm font-black text-[#F29900]">{formatNPR(result.totalGratuity)}</span>
                  </div>
               </div>
             </div>
           </div>
           
           <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] tracking-tight uppercase border-b border-[#F1F3F4] pb-4 mb-6">Retirement Integrity Guardrails</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <h4 className="text-[11px] font-black flex items-center gap-2 text-[#188038] uppercase"><History className="w-4 h-4" /> SSF Transition</h4>
                    <p className="text-[11px] text-[#5F6368] leading-relaxed">
                       Many companies are moving to the Social Security Fund (SSF). The 31% SSF pool includes PF, Gratuity, and Insurance in a unified contribution model.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-[11px] font-black flex items-center gap-2 text-[#D93025] uppercase"><Target className="w-4 h-4" /> Tax Shield</h4>
                    <p className="text-[11px] text-[#5F6368] leading-relaxed">
                       PF contributions provide an income tax deduction. You can deduct up to Rs. 300,000 or 1/3rd of assessable income from your taxable gross.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-[11px] font-black flex items-center gap-2 text-[#1A73E8] uppercase"><Globe className="w-4 h-4" /> PAN Mandate</h4>
                    <p className="text-[11px] text-[#5F6368] leading-relaxed">
                       A Permanent Account Number (PAN) is mandatory to track your PF contributions and ensure legal withdrawal at the end of service.
                    </p>
                 </div>
              </div>
           </div>
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
        raw: "Total = (PF Compound Value) + (Basic × 8.33% × 12 × Years)",
        variables: [
          "PF Contribution: 20% of basic salary (10% employee + 10% employer)",
          "Gratuity Rate: Exactly 8.33% of basic salary per month",
          "Compounding: EPF operates on continuous monthly compounding"
        ]
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

