'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Wallet, Landmark, TrendingUp, Info, PieChart, Receipt, Zap, Target, ShieldCheck } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalSalary } from '@/utils/math/country-rules/nepal';

const DEFAULT_STATE = {
  grossSalary: 80000,
  married: false,
  ssf: true,
  cit: true,
  citAmount: 10000,
  gender: 'male' as 'male' | 'female',
  isMonthly: true
};

export default function NepalSalaryCalculator() {
  const [state, setState] = useSyncState('nepal_salary_institutional_v1', DEFAULT_STATE);
  const { grossSalary, married, ssf, cit, citAmount, gender } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const allowances = { hra: 0, medical: 0, transport: 0, other: 0 };
    const salary = calculateNepalSalary(grossSalary, ssf, cit, gender, allowances);
    
    return {
      ...salary,
      monthlyTax: salary.incomeTax / 12,
      totalDeductions: salary.deductions.ssf_employee + salary.deductions.cit_employee + (salary.incomeTax / 12),
      inHand: salary.netSalary
    };
  }, [grossSalary, ssf, cit, gender]);

  const fmt = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-IN');

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Salary Calculator' }]}
      title="Nepal Salary Calculator"
      description="Professional payroll analysis tool for Nepal. Calculate exact take-home pay, SSF contributions, CIT optimization, and Employer CTC."
      icon={Wallet}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Gross Monthly Salary</label>
            <div className="relative">
              <input 
                type="number" 
                value={grossSalary} 
                onChange={e => update({ grossSalary: Number(e.target.value) })} 
                className={inputCls} 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Status</label>
              <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
                {[{ v: false, l: 'Single' }, { v: true, l: 'Married' }].map(m => (
                  <button key={m.l} onClick={() => update({ married: m.v })} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${married === m.v ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>{m.l}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Gender</label>
              <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
                {[{ v: 'male' as const, l: 'Male' }, { v: 'female' as const, l: 'Female' }].map(g => (
                  <button key={g.l} onClick={() => update({ gender: g.v })} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${gender === g.v ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>{g.l}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
             <div className="flex items-center gap-2 mb-1">
               <ShieldCheck className="w-4 h-4 text-[#1A73E8]" />
               <span className="text-[11px] font-bold text-[#202124] uppercase">Retirement Mapping</span>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => update({ ssf: !ssf })}
                  className={`p-3 text-left rounded-lg border transition-all ${ssf ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                >
                  <div className="text-[10px] font-bold uppercase">SSF</div>
                  <div className="text-[9px] opacity-70">31% Statutory</div>
                </button>
                <button 
                  onClick={() => update({ cit: !cit })}
                  className={`p-3 text-left rounded-lg border transition-all ${cit ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                >
                  <div className="text-[10px] font-bold uppercase">CIT</div>
                  <div className="text-[9px] opacity-70">Voluntary</div>
                </button>
             </div>
             {cit && (
               <div className="pt-2">
                 <label className="text-[10px] font-bold text-[#70757A] uppercase">Monthly CIT Amount</label>
                 <input type="number" value={citAmount} onChange={e => update({ citAmount: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded text-xs mt-1" />
               </div>
             )}
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Generate Payroll Report
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Monthly Take-Home (Net)</div>
            <div className="text-3xl font-black text-[#1A73E8]">{fmt(result.netSalary)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">Your actual bank-credit amount</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Monthly Breakdown</span>
               <Receipt className="w-3 h-3 text-[#1A73E8]" />
             </div>
             <div className="divide-y divide-[#DADCE0]">
               <div className="p-3 flex justify-between items-center hover:bg-[#F8F9FA]">
                 <span className="text-xs text-[#5F6368]">Gross Monthly</span>
                 <span className="text-xs font-bold text-[#202124]">{fmt(result.totalGross)}</span>
               </div>
               <div className="p-3 flex justify-between items-center hover:bg-[#F8F9FA]">
                 <span className="text-xs text-[#5F6368]">Employee SSF (11%)</span>
                 <span className="text-xs font-bold text-[#D93025]">-{fmt(result.deductions.ssf_employee)}</span>
               </div>
               {cit && (
                 <div className="p-3 flex justify-between items-center hover:bg-[#F8F9FA]">
                   <span className="text-xs text-[#5F6368]">CIT Contribution</span>
                   <span className="text-xs font-bold text-[#D93025]">-{fmt(result.deductions.cit_employee)}</span>
                 </div>
               )}
               <div className="p-3 flex justify-between items-center hover:bg-[#F8F9FA]">
                 <span className="text-xs text-[#5F6368]">Income Tax (Monthly)</span>
                 <span className="text-xs font-bold text-[#D93025]">-{fmt(result.monthlyTax)}</span>
               </div>
               <div className="p-3 flex justify-between items-center bg-[#F8F9FA]">
                 <span className="text-xs font-black text-[#202124] uppercase">Net In-Hand</span>
                 <span className="text-sm font-black text-[#188038]">{fmt(result.netSalary)}</span>
               </div>
             </div>
          </div>

          <div className="p-4 bg-white border border-[#DADCE0] rounded-lg space-y-3">
             <div className="flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Employer Cost (CTC)</span>
               <span className="text-sm font-black text-[#1A73E8]">{fmt(result.costToCompany)}</span>
             </div>
             <div className="h-1.5 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
               <div className="h-full bg-[#1A73E8]" style={{ width: `${(result.netSalary / result.costToCompany) * 100}%` }} />
             </div>
             <p className="text-[9px] text-[#70757A]">Your net pay is <strong>{Math.round((result.netSalary / result.costToCompany) * 100)}%</strong> of the total cost to your employer.</p>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">SSF contributions are calculated on <strong>60% of Gross</strong> (assumed Basic) as per standard Nepal corporate practice.</p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your gross monthly salary as mentioned in your offer letter.",
          "Select your marital status and gender for accurate tax threshold mapping.",
          "Toggle SSF if your company is registered with the Social Security Fund.",
          "Toggle CIT and enter your voluntary contribution if you have a CIT account.",
          "Review the breakdown to see exactly how much goes to tax, SSF, and your bank."
        ]
      }}
      formula={{
        title: "Nepal Payroll Logic",
        description: "Payroll in Nepal follows the Labor Act 2074 and Social Security Act mandates.",
        raw: "Taxable Income = Gross - (Employee SSF + CIT)\nMonthly Tax = Annual Tax Calculation / 12\nNet Pay = Gross - (Employee SSF + CIT + Monthly Tax)"
      }}
      faqs={[
        {
          question: "How is Basic Salary determined in Nepal?",
          answer: "In most private organizations in Nepal, Basic Salary is considered to be 60% of the Gross Salary, with the remaining 40% categorized as Allowances."
        },
        {
          question: "Is SSF mandatory for everyone?",
          answer: "Yes, for the formal sector in Nepal, contribution to the Social Security Fund (SSF) is a legal requirement for both employers and employees."
        },
        {
          question: "What are the tax slabs for 2081/82?",
          answer: "Tax slabs start at 1% (SST) for the first 5 Lakhs (Single) or 6 Lakhs (Married), and progress up to 39% for high earners."
        }
      ]}
      sidebar={{
        title: "Career & Finance",
        links: [
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax" },
          { label: "TDS Calculator", href: "/calculator/nepal-tds-calculator" },
          { label: "Gratuity Calculator", href: "/calculator/nepal-gratuity" },
          { label: "Bonus Calculator", href: "/calculator/nepal-bonus" },
        ],
        banner: {
          title: "Optimize Your Pay",
          description: "Understanding your deductions can help you negotiate better CTC packages with your employer.",
          image: "/images/career-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Income Tax", href: "/calculator/nepal-income-tax" },
        { label: "TDS Calculator", href: "/calculator/nepal-tds-calculator" },
        { label: "VAT Calculator", href: "/calculator/nepal-vat" }
      ]}
    />
  );
}
