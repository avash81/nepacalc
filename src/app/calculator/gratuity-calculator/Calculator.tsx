'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalGratuity } from '@/utils/math/country-rules/nepal';
import { Briefcase, Gavel, ShieldCheck, Info, ShieldAlert } from 'lucide-react';

export default function GratuityCalculator() {
  const [state, setState] = useSyncState('gratuity_v2', { basicSalary: 30000, yearsOfService: 10, hasResigned: false });
  const { basicSalary, yearsOfService } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => calculateNepalGratuity(basicSalary, yearsOfService), [basicSalary, yearsOfService]);
  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  const inputCls = "w-full h-12 px-4 pl-12 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Gratuity Calculator' }]}
      title="Gratuity & SSF Retirement Calculator"
      description="Calculate your terminal benefits under Nepal Labor Act 2074. Mandatory 8.33% basic salary accumulation for all formal sector employees."
      icon={Briefcase}
      inputs={
        <div className="space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                 <label className={labelCls}>Monthly Basic Salary</label>
                 <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">Rs.</span>
                    <input type="number" value={basicSalary} min={0} onChange={e => update({ basicSalary: Number(e.target.value) })} className={inputCls} />
                 </div>
                 <p className="text-[9px] text-[#70757A] mt-1 italic">Excluding allowances</p>
              </div>
              <div>
                 <label className={labelCls}>Years of Service</label>
                 <div className="relative">
                    <input type="number" value={yearsOfService} min={0} step={0.5} onChange={e => update({ yearsOfService: Number(e.target.value) })} className="w-full h-12 px-4 pr-14 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">Years</span>
                 </div>
              </div>
           </div>

           <div className={`p-6 rounded-lg border flex flex-col gap-4 ${result.isEligible ? 'bg-[#E6F4EA] border-[#CEEAD6]' : 'bg-[#FCE8E6] border-[#FAD2CF]'}`}>
              <div className="flex items-center gap-3">
                 {result.isEligible ? <ShieldCheck className="w-6 h-6 text-[#188038]" /> : <ShieldAlert className="w-6 h-6 text-[#D93025]" />}
                 <h3 className={`text-[11px] font-black uppercase tracking-wider ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                    {result.isEligible ? 'Legally Eligible for Payout' : 'Not Eligible Yet (Requires 5+ Years)'}
                 </h3>
              </div>
              <p className={`text-[10px] leading-relaxed font-medium ${result.isEligible ? 'text-[#0F5223]' : 'text-[#B3261E]'}`}>
                 {result.isEligible ? "You have completed the mandatory 5 years of service. Your employer is legally obligated to pay the accumulated gratuity fund upon termination or resignation." : "Under the Labor Act 2074, an employee is generally entitled to a gratuity payout only after 5 years of continuous service. However, monthly contributions (8.33%) must be deposited from day one."}
              </p>
           </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-[#1A1A2E] border border-[#DADCE0] rounded-lg p-8 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#34A853] opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
             <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-2 relative z-10">Total Accumulated Gratuity Fund</div>
             <div className="text-5xl font-black text-[#34A853] tracking-tighter mb-2 relative z-10">
               Rs. {fmt(result.totalGratuity)}
             </div>
             <div className="text-[10px] font-bold text-[#34A853] uppercase tracking-widest bg-white/10 inline-flex px-3 py-1 rounded relative z-10">After {yearsOfService} years of service</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Benefit Ledger (Labor Act 2074)</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold uppercase tracking-wider">Monthly Employer Contribution</span>
                   <span className="font-black text-[#1A73E8] font-mono text-sm">Rs. {fmt(result.monthlyContribution)}</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold uppercase tracking-wider">Tax Exempt Portion</span>
                   <span className="font-black text-[#188038] font-mono text-sm">Rs. {fmt(result.taxExemptLimit)}</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs bg-[#FCE8E6]">
                   <span className="text-[#D93025] font-bold uppercase tracking-wider">Taxable Portion (Subject to 15%)</span>
                   <span className="font-black text-[#D93025] font-mono text-sm">Rs. {fmt(result.taxableAmount)}</span>
                </div>
             </div>
          </div>

          <div className="p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg flex gap-3">
             <Gavel className="w-5 h-5 text-[#70757A] shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-bold text-[#202124] uppercase tracking-wider">Labor Act 2074 (Section 53)</h5>
                <p className="text-[11px] text-[#5F6368] leading-relaxed italic">
                   "Every employer shall deposit an amount equivalent to 8.33% of the basic remuneration of each worker in the Social Security Fund (SSF) or any other approved retirement fund."
                </p>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision Terminal Benefits Engine</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Navigating end-of-service entitlements requires absolute precision to ensure compliance with the Department of Labor. Our <strong className="text-[#202124]">gratuity calculator nepal</strong> is specifically modeled around the <strong className="text-[#202124]">labor act 2074 gratuity</strong> provisions. It programmatically enforces the statutory requirement that an employer must accrue exactly 8.33% of an employee's Basic Salary for every month worked from day one.
              </p>
              <p>
                A critical feature of this tool is its evaluation of <strong className="text-[#202124]">gratuity eligibility nepal</strong>. While the fund begins accumulating immediately, actual legal entitlement to withdraw the accumulated corpus generally requires the completion of 5 continuous years of service. If you are enrolled in the <strong className="text-[#202124]">ssf gratuity nepal</strong> scheme, the logic differs slightly as the funds are locked within the state-run Social Security Fund rather than an internal corporate ledger.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Framework & Taxation</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">The 8.33% Constant:</strong> The algorithm mathematically defines a year's gratuity as exactly 1 month of your basic salary (since 8.33% × 12 months ≈ 100%). It operates strictly on the Basic component, excluding allowances.</li>
              <li><strong className="text-[#188038]">Fractional Years:</strong> The engine accepts decimal inputs (e.g., 5.5 years) to ensure that mid-year resignations are accurately prorated according to the exact number of months worked.</li>
              <li><strong className="text-[#D93025]">Tax Exemptions:</strong> When computing <strong className="text-[#202124]">gratuity tax nepal</strong>, the system isolates the tax-exempt threshold (typically 50% of the total or up to NPR 5 Lakhs, depending on the fund's approval status with the IRD). Any accumulated value exceeding this threshold is automatically subjected to a flat 15% withholding tax.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your monthly BASIC salary. Do not include travel, food, medical, or other allowances. Check your payslip for the exact 'Basic' breakdown.",
          "Enter the total number of years you have worked for the company. You can use decimals (e.g., 5.5 for 5 years and 6 months).",
          "The system will immediately verify your eligibility. Note that standard eligibility requires 5 full years of continuous service.",
          "Review your 'Total Accumulated Gratuity Fund'. This is the gross amount you are entitled to.",
          "Check the 'Benefit Ledger' to understand how much of your payout is tax-exempt versus how much is subject to the 15% IRD tax."
        ]
      }}
      formula={{
        title: "Labor Act Calculation Rule",
        description: "The calculation mandates an 8.33% monthly accumulation on the base salary alone.",
        raw: "1. Monthly Employer Contribution = Basic Salary × 8.33%\n2. Yearly Gratuity Accrual = Basic Salary × (8.33% × 12) = 1 Month Basic Salary\n\nTotal Gross Fund = 1 Month Basic Salary × Total Years of Service\n\nTaxation: 15% Flat Rate on the Taxable Portion (Total Fund - Exempt Amount)."
      }}
      faqs={[
        {
          question: "Am I eligible for Gratuity if I resign before 5 years?",
          answer: "Under the new Labor Act 2074, employers MUST deposit the 8.33% monthly into a designated fund from day one. If you are registered in the Social Security Fund (SSF), that money stays in your SSF account and continues to grow, even if you leave the employer before 5 years."
        },
        {
          question: "Is my Gratuity payout taxable in Nepal?",
          answer: "Yes, but it is heavily subsidized. There is a tax exemption limit—usually 50% of the total amount or up to Rs. 5,00,000 (whichever is lower), provided the fund is approved by the IRD. Only the amount exceeding this exempt limit is taxed at a flat 15%."
        },
        {
          question: "Does Gratuity include my allowances?",
          answer: "No. Gratuity is calculated strictly on your 'Basic Salary'. Allowances for housing, transportation, or food are excluded from the 8.33% calculation. Always check your payslip to identify your true Basic Salary."
        },
        {
          question: "What is the difference between SSF and traditional Gratuity?",
          answer: "Traditionally, companies held the gratuity fund internally and paid it out upon resignation. Now, under the Social Security Fund (SSF) scheme, the company must deposit the 8.33% monthly directly to the government SSF, meaning your fund is managed centrally and follows you from job to job."
        },
        {
          question: "Can an employer refuse to pay Gratuity if I am fired?",
          answer: "Under the Labor Act 2074, gratuity is a statutory right. Even if an employee is terminated for misconduct, the employer cannot forfeit the accumulated gratuity. It must be paid out to the employee or transferred to their SSF account."
        },
        {
          question: "How are fractional years (e.g., 5 years and 4 months) calculated?",
          answer: "The law requires prorated calculations. For 5 years and 4 months, the calculation would be 5.33 years. You are entitled to the exact 8.33% accumulation for those additional 4 months worked."
        }
      ]}
      sidebar={{ title: "Labor & Finance", links: [{ label: "Income Tax Calculator", href: "/calculator/income-tax" }, { label: "Foreign Employment Fee", href: "/calculator/foreign-employment" }], banner: { title: "Know Your Rights", description: "The Labor Act 2074 protects your retirement and termination benefits.", image: "/images/nepal-banner.jpg" } }}
      relatedTools={[{ label: "Income Tax Calculator", href: "/calculator/income-tax" }]}
    />
  );
}
