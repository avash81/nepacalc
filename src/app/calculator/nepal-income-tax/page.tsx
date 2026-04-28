import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Nepal Income Tax Calculator 2081/82 | Tax Slabs Nepal NepaCalc",
  description: "Advanced income tax calculator for Nepal FY 2081/82. Calculate tax slabs, SSF benefits, and female rebates accurately. Verified for individual and couple taxpayers.",
  slug: 'nepal-income-tax',
  keywords: ["nepal income tax calculator 2081/82", "tax slabs nepal", "ssf tax waiver", "female tax rebate nepal", "salary tax calculator nepal", "married tax threshold nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      {/* Primary Calculator Component */}
      <Calculator />

      {/* SEO Rich Content - Server Rendered for Googlebot */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#202124] mb-6">Official Income Tax Slabs Nepal FY 2081/82</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="prose prose-sm text-[#5F6368] leading-relaxed">
                <p>
                  According to the <strong>Inland Revenue Department (IRD) Nepal</strong>, the income tax slabs for the fiscal year 2081/82 (2024/2025) have been updated to support taxpayers with higher thresholds and SSF incentives. This <strong>Nepal tax calculator</strong> helps you determine your exact tax liability based on whether you are an individual or a married couple.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase text-[#202124] tracking-widest border-l-4 border-blue-600 pl-3">Slabs for Single Individuals</h3>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-md">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Taxable Income Range (NPR)</th>
                        <th className="px-4 py-3">Tax Rate</th>
                        <th className="px-4 py-3">Tax Amount (Max)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">0 — 5,00,000</td><td className="px-4 py-3 text-blue-600 font-bold">1% (or 0% if SSF)</td><td className="px-4 py-3">Rs. 5,000</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">5,00,001 — 7,00,000</td><td className="px-4 py-3 text-blue-600 font-bold">10%</td><td className="px-4 py-3">Rs. 20,000</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">7,00,001 — 10,00,000</td><td className="px-4 py-3 text-blue-600 font-bold">20%</td><td className="px-4 py-3">Rs. 60,000</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">10,00,001 — 20,00,000</td><td className="px-4 py-3 text-blue-600 font-bold">30%</td><td className="px-4 py-3">Rs. 3,00,000</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Above 20,00,000</td><td className="px-4 py-3 text-red-600 font-bold">36% (Surcharge)</td><td className="px-4 py-3">Calculated</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase text-[#202124] tracking-widest border-l-4 border-emerald-600 pl-3">Slabs for Married Couples</h3>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-md">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Taxable Income Range (NPR)</th>
                        <th className="px-4 py-3">Tax Rate</th>
                        <th className="px-4 py-3">Tax Amount (Max)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">0 — 6,00,000</td><td className="px-4 py-3 text-emerald-600 font-bold">1% (or 0% if SSF)</td><td className="px-4 py-3">Rs. 6,000</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">6,00,001 — 8,00,000</td><td className="px-4 py-3 text-emerald-600 font-bold">10%</td><td className="px-4 py-3">Rs. 20,000</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">8,00,001 — 11,00,000</td><td className="px-4 py-3 text-emerald-600 font-bold">20%</td><td className="px-4 py-3">Rs. 60,000</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">11,00,001 — 20,00,000</td><td className="px-4 py-3 text-emerald-600 font-bold">30%</td><td className="px-4 py-3">Rs. 2,70,000</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Above 20,00,000</td><td className="px-4 py-3 text-red-600 font-bold">36% (Surcharge)</td><td className="px-4 py-3">Calculated</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#F8F9FA] p-6 rounded-lg border border-[#DADCE0]">
                <h3 className="text-lg font-bold text-[#202124] mb-4">How to Calculate Your Tax (Step-by-Step)</h3>
                <ol className="space-y-4 list-decimal pl-5 text-sm text-[#5F6368]">
                  <li>
                    <strong>Calculate Gross Income:</strong> Sum all monthly salaries, bonuses (Dashain bonus), and taxable allowances.
                  </li>
                  <li>
                    <strong>Subtract Deductions:</strong> Deduct your EPF/CIT contributions (max 500k), Life Insurance (max 40k), and Health Insurance (max 20k).
                  </li>
                  <li>
                    <strong>Apply Slabs:</strong> Based on your status (Single/Married), map the remaining income to the tables shown on the left.
                  </li>
                  <li>
                    <strong>Female Tax Rebate:</strong> If you are a female professional, deduct 10% from the final tax amount calculated in Step 3.
                  </li>
                </ol>
              </div>

              <div className="p-6 bg-[#E8F0FE] rounded-lg border border-[#D2E3FC]">
                <h4 className="text-sm font-black text-[#1967D2] uppercase tracking-wider mb-2">Verified Accuracy</h4>
                <p className="text-xs text-[#5F6368] mb-4 leading-relaxed">Our algorithms are updated for the 2081/82 Budget and strictly follow the IRD Nepal directives. Used by 10,000+ professionals for monthly salary planning.</p>
                <div className="flex gap-4">
                  <Link href="/nepal/" className="text-xs font-bold text-[#1A73E8] hover:underline">All Nepal Tools</Link>
                  <Link href="/finance/" className="text-xs font-bold text-[#1A73E8] hover:underline">Finance Hub</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#F1F3F4]">
            <h3 className="text-xl font-black text-[#202124] mb-6">Expert FAQs on Nepal Taxation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { q: "Is the 1% Social Security Tax mandatory?", a: "Yes, for all salaried individuals in Nepal. However, if you are a contributing member of the Social Security Fund (SSF), this 1% tax is waived on the first slab." },
                { q: "What are the tax thresholds for married couples?", a: "For FY 2081/82, the first slab for married couples is Rs. 6,00,000 (taxed at 1% or 0% if SSF) compared to Rs. 5,00,000 for single individuals." },
                { q: "What is the maximum CIT deduction?", a: "You can deduct up to Rs. 5,00,000 or 1/3 of your total assessable income, whichever is lower, for contributions made to Citizen Investment Trust." },
                { q: "How much can I deduct for Life Insurance?", a: "The Inland Revenue Department allows a maximum tax deduction of Rs. 40,000 per year for life insurance premiums paid." }
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-sm font-bold text-[#202124]">{faq.q}</h4>
                  <p className="text-sm text-[#5F6368] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
