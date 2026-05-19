import { calcMeta } from '@/lib/calcMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';
import { Wallet, ShieldCheck, ArrowRight, Table, Info } from 'lucide-react';

export const metadata = calcMeta({
  title: "How to File Income Tax in Nepal 2083/84 | Step-by-Step Guide",
  description: "Learn how to file your income tax in Nepal for FY 2083/84. Complete guide on IRD registration, PAN, tax slabs, and SSF deductions.",
  slug: 'blog/income-tax-filing-guide',
});

export default function IncomeTaxGuidePage() {
  return (
    <BlogPostLayout
      title="How to File Income Tax in Nepal 2083/84: A Comprehensive Guide"
      date="May 16, 2026"
      author="NepaCalc Editorial"
      category="Finance Guide"
      readTime="12 min read"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: 'Income Tax Guide', href: '/blog/income-tax-filing-guide/' }]}
    >
      <div className="prose prose-slate max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Navigating the tax landscape in Nepal for the new fiscal year 2083/84 requires a clear understanding of IRD regulations, 
          Social Security Fund (SSF) implications, and the latest income tax slabs. This guide provides a step-by-step path 
          for salary earners and professionals to file their returns accurately.
        </p>

        <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-8 mb-10">
           <h2 className="text-xl font-black text-[#202124] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#1A73E8]" /> Key Updates for FY 2083/84
           </h2>
           <ul className="space-y-4 text-sm font-medium text-[#5F6368]">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] mt-1.5 shrink-0"/> 1% SST waiver for SSF contributors continues.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] mt-1.5 shrink-0"/> Life insurance deduction limit maintained at NPR 40,000.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] mt-1.5 shrink-0"/> 10% tax credit for female salary earners is strictly applied on total tax liability.</li>
           </ul>
        </div>

        <h2 className="text-2xl font-black text-[#202124] mt-12 mb-6">Step 1: Obtain your Permanent Account Number (PAN)</h2>
        <p>
          Before filing any tax return, you must have a PAN. You can apply for a personal PAN online via the 
          <strong> Inland Revenue Department (IRD)</strong> portal. For salary earners, your employer typically 
          handles the PAN integration into the payroll system.
        </p>

        <h2 className="text-2xl font-black text-[#202124] mt-12 mb-6">Step 2: Understand the 2083/84 Tax Slabs</h2>
        <p>
          Nepal follows a progressive tax system. For individual taxpayers, the 1% Social Security Tax (SST) is the 
          first slab, followed by higher tiers.
        </p>
        
        <div className="my-8 overflow-hidden border border-[#DADCE0] rounded-lg">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-[#F8F9FA] text-[10px] font-black uppercase text-[#5F6368] border-b">
                    <th className="px-6 py-4">Taxable Income Slab</th>
                    <th className="px-6 py-4">Tax Rate (Single)</th>
                    <th className="px-6 py-4">Tax Rate (Married)</th>
                 </tr>
              </thead>
              <tbody className="divide-y text-sm">
                 <tr><td className="px-6 py-4">Up to Rs. 5,00,000</td><td className="px-6 py-4">1% (SST)</td><td className="px-6 py-4">1% (SST)</td></tr>
                 <tr><td className="px-6 py-4">Next Rs. 2,00,000</td><td className="px-6 py-4">10%</td><td className="px-6 py-4">10%</td></tr>
                 <tr><td className="px-6 py-4">Next Rs. 3,00,000</td><td className="px-6 py-4">20%</td><td className="px-6 py-4">20%</td></tr>
                 <tr><td className="px-6 py-4">Next Rs. 10,00,000</td><td className="px-6 py-4">30%</td><td className="px-6 py-4">30%</td></tr>
                 <tr><td className="px-6 py-4">Above Rs. 20,00,000</td><td className="px-6 py-4">36%</td><td className="px-6 py-4">36%</td></tr>
              </tbody>
           </table>
        </div>

        <div className="bg-[#E8F0FE] p-6 rounded-lg mb-10 flex gap-4">
           <Info className="w-6 h-6 text-[#1A73E8] shrink-0" />
           <p className="text-xs font-bold text-[#1A73E8] uppercase leading-relaxed">
              Pro Tip: If you are an SSF contributor, the 1% SST is waived on the first slab. 
              Use our <Link href="/calculator/nepal-income-tax/" className="underline decoration-2">Income Tax Calculator</Link> to audit your salary slip.
           </p>
        </div>

        <h2 className="text-2xl font-black text-[#202124] mt-12 mb-6">Step 3: Deductible Expenses & Tax Credits</h2>
        <p>
          You can lower your taxable income by utilizing several deductions:
        </p>
        <ul className="list-disc pl-6 space-y-4 mb-8">
           <li><strong>Provident Fund/CIT:</strong> Deduct up to 1/3 of your gross income or NPR 500,000 (whichever is lower).</li>
           <li><strong>Life Insurance:</strong> A flat deduction of up to NPR 40,000 per year.</li>
           <li><strong>Health Insurance:</strong> Deduction of up to NPR 20,000 per year.</li>
           <li><strong>Remote Area Allowance:</strong> Specific deductions based on the category (A, B, C, D) of your work location.</li>
        </ul>

        <h2 className="text-2xl font-black text-[#202124] mt-12 mb-6">Conclusion</h2>
        <p>
          Filing taxes in Nepal is now easier with the IRD's online portal. Ensure you collect your TDS certificates 
          from your employer or clients before the end of the fiscal year to claim credit for taxes already paid.
        </p>

        <div className="mt-12 p-8 bg-[#1A1A2E] rounded-2xl text-white">
           <h3 className="text-xl font-black mb-4">Ready to Calculate?</h3>
           <p className="text-slate-400 mb-6">Use our updated tools to verify your numbers before filing.</p>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/calculator/nepal-income-tax/" className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                 <span className="font-bold">Income Tax Calculator</span>
                 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/calculator/nepal-salary/" className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                 <span className="font-bold">Salary Calculator</span>
                 <ArrowRight className="w-4 h-4" />
              </Link>
           </div>
        </div>
      </div>
    </BlogPostLayout>
  );
}
