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
      howToUse={{
        steps: [
          "Enter your gross income (Monthly or Annual) into the salary field.",
          "Select your marital status and gender to apply the correct tax-free thresholds.",
          "Input your legal deductions like Life Insurance (Max Rs. 40,000) and CIT.",
          "Enable the SSF toggle if you are a contributor to gain the 1% SST waiver.",
          "Review the detailed slab breakdown and effective tax rate in the results panel."
        ]
      }}
      formula={{
        title: "Income Tax Slab Logic",
        description: "Nepal uses a progressive tax slab system. For FY 2081/82, thresholds vary based on marital status.",
        raw: "Taxable Income = Gross Income - Allowable Deductions\nTax = ∑ (Slab Amount × Slab Rate) - Rebates\nFemale Rebate: 10% reduction on total tax liability."
      }}
      faqs={[
        {
          question: "What is the tax-free threshold for 2081/82?",
          answer: "For individuals, the threshold is Rs. 500,000. For married couples, it is Rs. 600,000. These apply to remuneration earners."
        },
        {
          question: "How does the SSF waiver work?",
          answer: "Salaried employees contributing to the SSF are exempt from the 1% Social Security Tax on the first tax slab, saving approximately Rs. 5,000 to Rs. 6,000 annually."
        },
        {
          question: "Can I deduct mortgage interest?",
          answer: "Currently, Nepal's Income Tax Act does not allow deduction of home loan interest for salaried individuals, unlike some other jurisdictions."
        }
      ]}
      sidebar={{
        title: "Related Finance Tools",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary" },
          { label: "TDS Calculator", href: "/calculator/nepal-tds-calculator" },
          { label: "VAT Calculator", href: "/calculator/nepal-vat" },
          { label: "Investment (SIP)", href: "/calculator/sip-calculator" },
        ],
        banner: {
          title: "Maximize Your Savings",
          description: "Properly declaring your CIT and Insurance can significantly reduce your tax liability in Nepal.",
          image: "/images/finance-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/nepal-salary" },
        { label: "TDS Calculator", href: "/calculator/nepal-tds-calculator" },
        { label: "VAT Calculator", href: "/calculator/nepal-vat" }
      ]}
    />
  );
}
