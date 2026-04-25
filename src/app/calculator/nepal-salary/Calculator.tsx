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
      slug="nepal-salary"
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Mastering Salary Architecture and Take-Home Pay in Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In the Nepalese corporate landscape, understanding the mathematical translation from a gross offer to your actual bank credit is vital. A job offer stating a "gross monthly salary" does not directly reflect the cash you will have available for living expenses. Our <strong className="text-[#202124]">Salary Calculator Nepal</strong> is designed to demystify this process, acting as an exact <strong className="text-[#202124]">net salary calculator</strong> that factors in the Labor Act 2074 and the Contribution Based Social Security Act.
              </p>
              <p>
                Whether you are trying to <strong className="text-[#202124]">figure out hourly salary</strong> for a freelance contract, or calculating the exact Cost to Company (CTC) for your business, this tool bridges the gap between gross expectations and net reality. It dynamically accounts for the 60/40 Basic-to-Allowance split, mandatory Social Security Fund (SSF) deductions, voluntary Citizen Investment Trust (CIT) contributions, and progressive income tax slabs.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The Anatomy of a Nepalese Payslip</h3>
            <p className="text-sm text-[#5F6368] mb-4">A standard corporate payslip in Nepal is divided into several mathematical components. Understanding these parts is essential when using a <strong className="text-[#202124]">take home pay calculator</strong>.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#202124]">Basic Salary vs Allowances:</strong> By convention and legal precedent in Nepal, Gross Salary is typically split into 60% Basic Salary and 40% Allowances (which may include Dearness, House Rent, or Transport allowances). This split is crucial because statutory deductions like SSF and Provident Fund are calculated strictly on the Basic component, not the Gross.</li>
              <li><strong className="text-[#202124]">Employee SSF Contribution (11%):</strong> Under the Social Security scheme, an employee is mandated to contribute 11% of their Basic Salary. This amount is mathematically deducted from your gross pay before tax calculation.</li>
              <li><strong className="text-[#202124]">Employer SSF Contribution (20%):</strong> Your employer contributes an additional 20% of your Basic Salary to your SSF account (comprising Provident Fund, Gratuity, and Insurance coverage). While this does not reduce your monthly take-home, it is a critical component of your overall Cost to Company (CTC) and long-term wealth accumulation.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Navigating Deductions and Taxes</h3>
            <p className="text-sm text-[#5F6368] mb-4">Before arriving at your net pay, your gross salary must pass through voluntary deductions and statutory tax gates.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#D93025]">Citizen Investment Trust (CIT):</strong> Employees can opt to channel a portion of their income into a CIT account. This is a highly effective tax-saving strategy, as CIT contributions (up to Rs. 500,000 or 1/3rd of assessable income) are fully deductible from your taxable income base.</li>
              <li><strong className="text-[#D93025]">Progressive Income Tax (TDS):</strong> After deducting SSF and CIT, the remaining amount is your Taxable Income. Employers in Nepal are required to calculate your projected annual tax liability using the progressive slabs (1%, 10%, 20%, 30%, 36%, 39%) and divide it by 12. This monthly Tax Deducted at Source (TDS) is subtracted directly from your paycheck.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Salary Negotiation and "Cost to Company"</h3>
            <p className="text-sm text-[#5F6368] mb-4">When evaluating a job offer, identifying whether the quoted figure is Gross Salary or Cost to Company (CTC) changes the mathematical reality of your negotiation.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#188038]">Gross vs CTC Negotiation:</strong> If an employer offers a CTC of Rs. 100,000, your actual Gross Salary is significantly lower because the CTC includes the employer's 20% SSF contribution. Always negotiate based on Gross Salary to ensure your monthly cash flow meets your expectations.</li>
              <li><strong className="text-[#188038]">Using the Salary Increase Calculator:</strong> If you are offered a 15% raise, your net take-home will likely increase by less than 15%. This occurs because the higher gross salary may push a portion of your income into a higher marginal tax bracket (e.g., from the 10% slab to the 20% slab). Understanding this marginal rate impact is key to effective financial planning.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your agreed-upon Gross Monthly Salary in the primary input field.",
          "Select your Marital Status and Gender, as these determine your annual tax-free thresholds and potential rebates.",
          "Toggle the SSF button if your organization is registered with the Social Security Fund (standard for most modern companies).",
          "If you voluntarily contribute to the Citizen Investment Trust (CIT), toggle the CIT button and input your monthly contribution amount.",
          "Review the Monthly Breakdown card to see the exact flow of funds: from Gross, minus SSF, minus CIT, minus Tax, to your final Net In-Hand."
        ]
      }}
      formula={{
        title: "Nepalese Payroll Mathematics",
        description: "The underlying logic assumes the standard Nepalese corporate structure defined by the Labor Act.",
        raw: "1. Basic Salary = Gross Monthly Salary × 60%\n2. Employee SSF = Basic Salary × 11%\n3. Employer SSF = Basic Salary × 20%\n4. Cost To Company (CTC) = Gross Monthly Salary + Employer SSF\n5. Taxable Base = Gross Monthly - (Employee SSF + CIT Contribution)\n6. Monthly Tax = (Annual Tax on Projected Taxable Base) ÷ 12\n7. Net Take-Home Pay = Gross Monthly Salary - (Employee SSF + CIT Contribution + Monthly Tax)"
      }}
      faqs={[
        {
          question: "What is the difference between Gross Salary and Net Salary in Nepal?",
          answer: "Gross Salary is the total amount you earn before any deductions. Net Salary (or take-home pay) is the actual amount credited to your bank account after mandatory deductions like SSF, CIT, and Income Tax (TDS) have been subtracted."
        },
        {
          question: "How is the 11% SSF contribution calculated?",
          answer: "By standard Nepalese corporate practice, the 11% employee contribution to the Social Security Fund is calculated on your Basic Salary, which is typically fixed at 60% of your total Gross Salary."
        },
        {
          question: "Does the employer's 20% SSF contribution get deducted from my pay?",
          answer: "No. The employer's 20% SSF contribution is paid by the company on top of your Gross Salary. It does not reduce your monthly take-home pay, but it is included in your overall Cost to Company (CTC) package."
        },
        {
          question: "Can I choose not to participate in the SSF?",
          answer: "For organizations registered as formal entities under the Labor Act 2074 and the Contribution Based Social Security Act, participation in the SSF is mandatory for both the employer and the employee. It cannot be legally opted out of."
        },
        {
          question: "How much can I deduct using the Citizen Investment Trust (CIT)?",
          answer: "You can deduct up to Rs. 500,000 annually, or one-third (33.33%) of your total assessable income, whichever is lower. This amount is subtracted before calculating your tax liability, making it a highly effective tax-saving tool."
        },
        {
          question: "How do I calculate my hourly rate from my monthly salary?",
          answer: "Nepal's labor law assumes a standard 48-hour workweek. To find your hourly rate, you can divide your monthly gross salary by 208 (the approximate number of working hours in a month: 48 hours/week × 52 weeks / 12 months)."
        }
      ]}
      sidebar={{
        title: "Career & Finance",
        links: [
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" },
          { label: "TDS Calculator", href: "/calculator/nepal-tds/" },
          { label: "Gratuity Calculator", href: "/calculator/gratuity-calculator/" },
          { label: "Provident Fund", href: "/calculator/nepal-provident-fund/" },
        ],
        banner: {
          title: "Optimize Your Pay",
          description: "Understanding your deductions can help you negotiate better CTC packages with your employer.",
          image: "/images/career-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
        { label: "TDS Calculator", href: "/calculator/nepal-tds/" },
        { label: "EPF Calculator", href: "/calculator/nepal-provident-fund/" }
      ]}
    />
  );
}
