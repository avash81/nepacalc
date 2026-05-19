'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Wallet, Landmark, TrendingUp, Info, PieChart, Receipt, Zap, 
  Target, ShieldCheck, Activity, Globe, History, Scale, ArrowRight,
  ChevronRight, Table
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

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function NepalSalaryCalculator() {
  const [state, setState] = useSyncState('salary_institutional_v6', DEFAULT_STATE);
  const { grossSalary, married, ssf, cit, citAmount, gender } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const allowances = { hra: 0, medical: 0, transport: 0, other: 0 };
    const salary = calculateNepalSalary(grossSalary, ssf, cit, gender, allowances);
    
    const monthlyTax = salary.incomeTax / 12;
    const totalDeductions = salary.deductions.ssf_employee + (cit ? citAmount : 0) + monthlyTax;

    const pieData = [
      { name: 'Net Take Home', value: salary.netSalary },
      { name: 'Income Tax', value: monthlyTax },
      { name: 'Retirement Pool', value: salary.deductions.ssf_employee + (cit ? citAmount : 0) }
    ];

    return {
      ...salary,
      monthlyTax,
      totalDeductions,
      pieData
    };
  }, [grossSalary, ssf, cit, citAmount, gender]);

  return (
    <ModernCalcLayout
      slug="nepal-salary"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Salary Calculator' }]}
      title="Nepal Salary Calculator 2083/84 — Free Online Payroll Calculator"
      description="The definitive institutional payroll auditing engine for Nepal. Calculate take-home pay with Labor Act 2074 compliance, SSF statutory pooling, and CIT tax optimization."
      icon={Wallet}
      relatedTools={[
        { label: "Income Tax Slab Audit", href: "/calculator/nepal-income-tax/" },
        { label: "TDS Calculator", href: "/calculator/nepal-tds/" },
        { label: "Provident Fund", href: "/calculator/nepal-provident-fund/" },
        { label: "Vehicle Tax", href: "/calculator/nepal-vehicle-tax/" }
      ]}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Monthly Salary (NPR)</label>
               <input 
                  type="number" 
                  value={grossSalary} 
                  onChange={(e) => update({ grossSalary: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
               />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Marital Status</label>
                  <select 
                    value={married ? 'married' : 'single'} 
                    onChange={(e) => update({ married: e.target.value === 'married' })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gender</label>
                  <select 
                    value={gender} 
                    onChange={(e) => update({ gender: e.target.value as any })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
               </div>
            </div>

            <div className="pt-2 space-y-4">
               <div className="flex items-center gap-2 border-b border-[#DADCE0] pb-2">
                  <ShieldCheck className="w-4 h-4 text-[#1A73E8]" />
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124]">Statutory Deductions</h3>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <label className={`flex flex-col p-4 border rounded-md cursor-pointer transition-all ${ssf ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] hover:bg-[#F8F9FA]'}`}>
                    <input type="checkbox" checked={ssf} onChange={() => update({ ssf: !ssf })} className="hidden" />
                    <span className={`text-[11px] font-black uppercase ${ssf ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>SSF (31%)</span>
                    <span className="text-[9px] font-bold text-[#5F6368] mt-1">Social Security Pool</span>
                  </label>
                  <label className={`flex flex-col p-4 border rounded-md cursor-pointer transition-all ${cit ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] hover:bg-[#F8F9FA]'}`}>
                    <input type="checkbox" checked={cit} onChange={() => update({ cit: !cit })} className="hidden" />
                    <span className={`text-[11px] font-black uppercase ${cit ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>CIT / PF</span>
                    <span className="text-[9px] font-bold text-[#5F6368] mt-1">Tax Optimization</span>
                  </label>
               </div>
               {cit && (
                 <div className="space-y-2 p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md">
                    <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Monthly CIT/PF Contribution (NPR)</label>
                    <input 
                      type="number" 
                      value={citAmount} 
                      onChange={(e) => update({ citAmount: Number(e.target.value) })} 
                      className="w-full h-11 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
                    />
                 </div>
               )}
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm mt-4">
             Execute Payroll Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Monthly Take-Home Pay</div>
             <div className="text-5xl font-black text-[#1A73E8] tracking-tight">{formatNPR(result.netSalary)}</div>
             <div className="flex justify-center mt-2">
                <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0] shadow-sm">
                   Retention: {((result.netSalary / grossSalary) * 100).toFixed(1)}% of Gross
                </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#FAD2CF] rounded-md p-4 text-center bg-[#FCE8E6]">
                <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Monthly Tax</div>
                <div className="text-xl font-black text-[#D93025]">{formatNPR(result.monthlyTax)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Total Deductions</div>
                <div className="text-xl font-black text-[#202124]">{formatNPR(result.totalDeductions)}</div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-lg p-5 bg-white shadow-sm">
             <div className="flex justify-between items-center mb-3 border-b border-[#F1F3F4] pb-2">
                <span className="text-[10px] font-black text-[#202124] uppercase">Employer Cost (CTC)</span>
                <span className="text-sm font-black text-[#202124]">{formatNPR(result.costToCompany)}</span>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-[#5F6368] uppercase">
                   <span>Net Pay ({((result.netSalary / result.costToCompany) * 100).toFixed(0)}%)</span>
                   <span>Company Cost</span>
                </div>
                <div className="h-2 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
                   <div className="h-full bg-[#188038]" style={{ width: `${(result.netSalary / result.costToCompany) * 100}%` }} />
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Payroll Distribution</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={result.pieData}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                     >
                       <Cell fill="#188038" />
                       <Cell fill="#D93025" />
                       <Cell fill="#1A73E8" />
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Pay</span>
                    <span className="text-lg font-black text-[#202124]">{formatNPR(grossSalary)}</span>
                 </div>
               </div>
               <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0]">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#188038]"></div> Take Home</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#D93025]"></div> Tax</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#1A73E8]"></div> Retirement</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Deduction Ledger</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] hover:border-[#1A73E8] transition-colors">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Employee SSF (11%)</span>
                     <span className="text-sm font-black text-[#202124]">{formatNPR(result.deductions.ssf_employee)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-md bg-[#E6F4EA] border border-[#188038]">
                     <span className="text-[10px] font-bold text-[#188038] uppercase tracking-wider">Employer SSF (20%)</span>
                     <span className="text-sm font-black text-[#188038]">{formatNPR(result.deductions.ssf_employer)}</span>
                  </div>
                  {cit && (
                    <div className="flex justify-between items-center p-4 rounded-md bg-[#E8F0FE] border border-[#1A73E8]">
                       <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">CIT Contribution</span>
                       <span className="text-sm font-black text-[#1A73E8]">{formatNPR(citAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center p-4 rounded-md bg-[#FCE8E6] border border-[#D93025]">
                     <span className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider">Monthly Income Tax</span>
                     <span className="text-sm font-black text-[#D93025]">{formatNPR(result.monthlyTax)}</span>
                  </div>
               </div>
             </div>
           </div>
        </div>
      }
      customSchema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Nepal Salary Calculator 2083/84",
        "url": "https://nepacalc.com/calculator/nepal-salary/",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "description": "Calculate your take-home pay in Nepal for FY 2083/84. Support for SSF (31% contribution), CIT deductions, and automatic income tax calculation.",
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
        title: "Salary Hub Nepal",
        subtitle: "Compliance Tools",
        links: [
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "VAT Calculator", href: "/calculator/nepal-vat/", icon: Receipt },
          { label: "TDS Calculator", href: "/calculator/nepal-tds/", icon: Scale },
          { label: "Labor Act 2074", href: "https://moless.gov.np", icon: Landmark },
        ],
      }}
    />
  );
}

