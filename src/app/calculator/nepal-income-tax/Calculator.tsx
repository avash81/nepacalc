'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Wallet, Receipt, TrendingDown, Info, ShieldCheck, ArrowRightLeft, PieChart } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalIncomeTax } from '@/utils/math/country-rules/nepal';

const DEFAULT_STATE = {
  income: 1200000,
  married: false,
  gender: 'male' as 'male' | 'female',
  isSSFContributor: true,
  lifeInsurance: 40000,
  citDeduction: 0,
  healthInsurance: 0,
  isMonthly: false
};

export default function NepalIncomeTaxCalculator() {
  const [state, setState] = useSyncState('nepal_tax_institutional_v1', DEFAULT_STATE);
  const { income, married, gender, isSSFContributor, lifeInsurance, citDeduction, healthInsurance, isMonthly } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const annualGross = isMonthly ? income * 12 : income;

  const result = useMemo(() => {
    const insDeduction = Math.min(lifeInsurance, 40000);
    const healthInsDeduction = Math.min(healthInsurance, 20000);
    const citMax = Math.min(annualGross / 3, 500000);
    const actualCit = Math.min(citDeduction, citMax);

    const calculation = calculateNepalIncomeTax(
      annualGross - (insDeduction + healthInsDeduction + actualCit), 
      married, 
      isSSFContributor, 
      gender
    );

    return {
      ...calculation,
      totalDeductions: insDeduction + healthInsDeduction + actualCit,
      netAnnual: annualGross - calculation.totalTax,
      netMonthly: (annualGross - calculation.totalTax) / 12
    };
  }, [annualGross, married, isSSFContributor, gender, lifeInsurance, citDeduction, healthInsurance]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  const fmt = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-IN');

  return (
    <ModernCalcLayout
      slug="nepal-income-tax"
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Income Tax Calculator' }]}
      title="Nepal Income Tax Dashboard"
      description="Professional tax laboratory for FY 2081/82. Includes SSF SST-waiver, female rebates, and deduction mapping."
      icon={Wallet}
      inputs={
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className={labelCls}>{isMonthly ? "Monthly Salary" : "Annual Income"}</label>
            <button 
              onClick={() => update({ isMonthly: !isMonthly })}
              className="text-[10px] font-bold text-[#1A73E8] uppercase flex items-center gap-1 hover:underline"
            >
              <ArrowRightLeft className="w-3 h-3" />
              {isMonthly ? 'Annual' : 'Monthly'}
            </button>
          </div>
          <div className="relative">
            <input 
              type="number" 
              value={income} 
              onChange={e => update({ income: Number(e.target.value) })} 
              className={inputCls} 
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
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
               <span className="text-[11px] font-bold text-[#202124] uppercase">Legal Deductions</span>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <div className="space-y-1">
                 <span className="text-[10px] text-[#70757A]">Life Insurance</span>
                 <input type="number" value={lifeInsurance} onChange={e => update({ lifeInsurance: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded text-xs" />
               </div>
               <div className="space-y-1">
                 <span className="text-[10px] text-[#70757A]">CIT Deduction</span>
                 <input type="number" value={citDeduction} onChange={e => update({ citDeduction: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded text-xs" />
               </div>
             </div>
             <div className="flex items-center gap-3 pt-2">
               <input 
                 type="checkbox" 
                 id="ssf" 
                 checked={isSSFContributor} 
                 onChange={e => update({ isSSFContributor: e.target.checked })}
                 className="w-4 h-4 rounded border-[#DADCE0] text-[#1A73E8]"
               />
               <label htmlFor="ssf" className="text-[11px] font-medium text-[#3C4043]">Official SSF Contributor (1% SST Waiver)</label>
             </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Generate Tax Report
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Take-Home (Net)</div>
            <div className="text-3xl font-black text-[#1A73E8]">{fmt(isMonthly ? result.netMonthly : result.netAnnual)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">{isMonthly ? 'Monthly' : 'Annual'} Estimated Pay</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Slab Breakdown</span>
               <TrendingDown className="w-3 h-3 text-[#188038]" />
             </div>
             <div className="divide-y divide-[#DADCE0]">
               {result.breakdown.map((item, idx) => (
                 <div key={idx} className="p-3 flex justify-between items-center hover:bg-[#F8F9FA]">
                   <div>
                     <div className="text-[11px] font-bold text-[#202124]">{item.slabLabel}</div>
                     <div className="text-[9px] text-[#70757A]">{item.rate}% Rate</div>
                   </div>
                   <div className="text-right">
                     <div className="text-xs font-bold text-[#D93025]">{fmt(isMonthly ? item.taxAmount/12 : item.taxAmount)}</div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Tax</div>
               <div className="text-sm font-black text-[#D93025]">{fmt(isMonthly ? result.totalTax/12 : result.totalTax)}</div>
             </div>
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Effective Rate</div>
               <div className="text-sm font-black text-[#1A73E8]">{result.effectiveRate}%</div>
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-start">
            <PieChart className="w-4 h-4 text-[#188038] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Your income is <strong>{100 - result.effectiveRate}% Tax-Free</strong> after legal deductions and rebates.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Understanding Nepal Income Tax (FY 2081/82)</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                The Nepal Income Tax Calculator helps estimate your monthly and annual tax liabilities based on the prevailing tax laws governed by the Inland Revenue Department (IRD) of Nepal. Taxation in Nepal follows a progressive slab system, meaning your income is divided into segments, and higher segments are taxed at progressively higher rates. This tool is designed primarily for resident individuals earning remuneration (salary) and provides a highly accurate <strong className="text-[#202124]">net income calculator</strong> for financial planning.
              </p>
              <p>
                A core principle of the Nepalese tax system is the distinction between gross income and taxable income. By legally utilizing available deductions and understanding the thresholds associated with your marital status, you can optimize your tax burden. The calculator automatically integrates the latest provisions for the fiscal year 2081/82 (2024/2025), including the 1% Social Security Tax (SST) and its corresponding waivers for contributing members.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Core Components of the Tax Calculation</h3>
            <p className="text-sm text-[#5F6368] mb-4">A standard income tax calculation in Nepal involves several key components. Understanding these inputs will help you navigate your payslip and our <strong className="text-[#202124]">tax calculator nepal</strong>.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#202124]">Assessable Income (Gross Salary):</strong> This is the total remuneration earned from your employment before any deductions or taxes are applied. It includes your basic salary, dearness allowance, Dashain bonus, and any other taxable allowances provided by your employer.</li>
              <li><strong className="text-[#202124]">Marital Status Assessment:</strong> Nepal provides different initial tax-free thresholds depending on whether an individual elects to be assessed as "Single" or as a "Couple" (Married). For the current fiscal year, the threshold is Rs. 500,000 for single individuals and Rs. 600,000 for married couples. Married individuals whose spouses also earn income must carefully choose whether joint or separate assessment is mathematically beneficial.</li>
              <li><strong className="text-[#202124]">Social Security Fund (SSF):</strong> The SSF is a government-mandated retirement and welfare fund. Salaried professionals who are formally enrolled and contribute to the SSF are granted a waiver on the baseline 1% Social Security Tax on their first tax slab. This is mathematically applied by dropping the 1% slab rate to 0% for SSF contributors.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Allowable Deductions and Exemptions</h3>
            <p className="text-sm text-[#5F6368] mb-4">Before applying the tax slabs, the IRD allows taxpayers to deduct specific investments and expenses from their gross income, thereby reducing their overall Taxable Income.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Citizen Investment Trust (CIT) & Approved Retirement Funds:</strong> Contributions made to approved retirement funds (like CIT or EPF) are tax-deductible. The maximum allowable deduction is the lowest of three limits: the actual contribution amount, 33% of your assessable income, or a flat ceiling of Rs. 500,000 per annum.</li>
              <li><strong className="text-[#1A73E8]">Life Insurance Premiums:</strong> Taxpayers who have purchased life insurance policies can deduct the premium amounts paid during the fiscal year. The maximum allowable deduction for life insurance is capped at Rs. 40,000 per year.</li>
              <li><strong className="text-[#1A73E8]">Health Insurance Premiums:</strong> Similar to life insurance, premiums paid for health insurance policies are deductible. The maximum allowable deduction under this category is capped at Rs. 20,000 per year.</li>
            </ul>
          </div>
          
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The Progressive Tax Slab System</h3>
            <p className="text-sm text-[#5F6368] mb-4">Once your Taxable Income is determined (Gross Income minus Deductions), it is filtered through progressive tax brackets. Here is how the brackets generally function for a single individual in FY 2081/82:</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#D93025]">First Slab (0 to 5 Lakhs):</strong> Taxed at 1% (Social Security Tax). If you are an SSF contributor, this 1% is waived, making it 0%.</li>
              <li><strong className="text-[#D93025]">Second Slab (Next 2 Lakhs):</strong> The income between 5 Lakhs and 7 Lakhs is taxed at 10%.</li>
              <li><strong className="text-[#D93025]">Third Slab (Next 3 Lakhs):</strong> The income between 7 Lakhs and 10 Lakhs is taxed at 20%.</li>
              <li><strong className="text-[#D93025]">Fourth Slab (Next 10 Lakhs):</strong> The income between 10 Lakhs and 20 Lakhs is taxed at 30%.</li>
              <li><strong className="text-[#D93025]">Additional Surcharges:</strong> Income exceeding 20 Lakhs is subject to an additional 20% surcharge on the standard 30% rate, creating an effective marginal rate of 36%. For extreme incomes exceeding 50 Lakhs, further surcharges apply, pushing the top marginal rate to 39%.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Special Tax Rebates</h3>
            <p className="text-sm text-[#5F6368] mb-4">Certain demographic groups receive final rebates calculated against their total tax liability.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#188038]">Female Tax Rebate:</strong> Under Section 11 of the Income Tax Act, female professionals whose solely sourced income is remuneration are entitled to a 10% rebate on their total calculated tax liability. This acts as a direct discount on the final tax bill.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Toggle between 'Monthly' or 'Annual' to specify your gross salary format.",
          "Enter your Gross Income in the primary input field.",
          "Select your Marital Status (Single or Married) to apply the correct baseline threshold (5L vs 6L).",
          "Select your Gender. If 'Female' is selected, the algorithm automatically applies the 10% Section 11 tax rebate.",
          "Expand the 'Legal Deductions' section. Input any Life Insurance premiums (max 40k), CIT/EPF contributions (max 500k), and check the SSF box if your employer contributes to the Social Security Fund.",
          "Review the generated report, which includes your Net Take-Home Pay, a detailed slab-by-slab breakdown, and your effective tax rate."
        ]
      }}
      formula={{
        title: "Income Tax Calculation Mathematics",
        description: "The core engine runs a piecewise continuous function based on the Inland Revenue Department's progressive brackets.",
        raw: "1. Taxable Income (TI) = Gross Income - (CIT Deduction + Life Insurance Deduction + Health Insurance Deduction)\n\n2. Tax Calculation (Single Assessment Example):\nIf TI ≤ 5,00,000: Tax = TI × 1% (or 0% if SSF)\nIf 5,00,000 < TI ≤ 7,00,000: Tax = (5,00,000 × 1%) + ((TI - 5,00,000) × 10%)\nIf 7,00,000 < TI ≤ 10,00,000: Tax = Base_Previous + ((TI - 7,00,000) × 20%)\nIf 10,00,000 < TI ≤ 20,00,000: Tax = Base_Previous + ((TI - 10,00,000) × 30%)\nIf TI > 20,00,000: Tax = Base_Previous + ((TI - 20,00,000) × 36%)\n\n3. Final Liability = Tax - (Tax × 10% if Female)"
      }}
      faqs={[
        {
          question: "What is the tax-free threshold in Nepal for 2081/82?",
          answer: "For the fiscal year 2081/82, the initial tax slab (often referred to as the tax-free threshold, though it technically carries a 1% SST) is Rs. 500,000 for unmarried individuals and Rs. 600,000 for married couples."
        },
        {
          question: "How does the Social Security Fund (SSF) waiver affect my tax?",
          answer: "If you and your employer contribute to the SSF, the government waives the 1% Social Security Tax on your first income slab (up to 5 Lakhs for single, 6 Lakhs for married). This effectively saves you Rs. 5,000 to Rs. 6,000 per year."
        },
        {
          question: "What is the maximum limit for CIT or EPF deductions?",
          answer: "The maximum allowable deduction for approved retirement funds like CIT (Citizen Investment Trust) and EPF (Employees Provident Fund) is capped at Rs. 500,000 per year, or 33% of your assessable income, whichever is lower."
        },
        {
          question: "Are both husband and wife required to file jointly if they are married?",
          answer: "No. Married individuals have the legal right to elect whether they want to be assessed as a 'Couple' (jointly) or as 'Single' (separately). Usually, if both spouses earn significant incomes, it is mathematically advantageous to be assessed separately to maximize the lower tax brackets."
        },
        {
          question: "How does the 10% rebate for women work?",
          answer: "According to the Income Tax Act, a female resident whose income is derived solely from employment remuneration is eligible for a 10% rebate on her total tax liability. For example, if the calculated tax is Rs. 20,000, she will receive a discount of Rs. 2,000, making her final tax Rs. 18,000."
        },
        {
          question: "Is Dashain bonus fully taxable?",
          answer: "Yes, in Nepal, the Dashain bonus (usually equivalent to one month's basic salary) is considered part of your annual remuneration and is fully taxable. It is added to your gross assessable income before applying the tax slabs."
        }
      ]}
      sidebar={{
        title: "Related Finance Tools",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
          { label: "TDS Calculator", href: "/calculator/nepal-tds/" },
          { label: "VAT Calculator", href: "/calculator/nepal-vat/" },
          { label: "Investment (SIP)", href: "/calculator/sip-calculator/" },
        ],
        banner: {
          title: "Maximize Your Savings",
          description: "Properly declaring your CIT and Insurance can significantly reduce your tax liability in Nepal.",
          image: "/images/finance-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "TDS Calculator", href: "/calculator/nepal-tds/" },
        { label: "VAT Calculator", href: "/calculator/nepal-vat/" }
      ]}
    />
  );
}
