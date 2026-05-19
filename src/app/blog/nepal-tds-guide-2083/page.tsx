import { calcMeta } from '@/lib/calcMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';
import { Receipt, Info, Gavel, ShieldCheck, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';

export const metadata = calcMeta({
  title: "Ultimate TDS Guide Nepal 2083/84: Professional & Rental Tax Rules",
  description: "Learn about the latest Tax Deducted at Source (TDS) rates in Nepal for FY 2083/84. Comprehensive guide for freelancers, rent owners, and businesses.",
  slug: 'blog/nepal-tds-guide-2083',
});

export default function TDSGuidePage() {
  return (
    <BlogPostLayout
      title="Nepal TDS Guide 2083/84: Essential Tax Rules for Professionals and Landlords"
      date="May 16, 2026"
      author="NepaCalc Tax Desk"
      category="Taxation"
      readTime="12 min read"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: 'TDS Guide', href: '/blog/nepal-tds-guide-2083/' }]}
    >
      <div className="prose prose-slate max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Tax Deducted at Source (TDS) is often the most confusing part of financial transactions in Nepal. 
          Whether you are a freelancer receiving a consultancy fee or a house owner receiving rent, 
          understanding the exact percentage to deduct is critical for IRD compliance in FY 2083/84.
        </p>

        <div className="bg-[#FFF9E6] border border-[#FFE082] rounded-xl p-8 mb-10">
           <h2 className="text-xl font-black text-[#856404] mb-4 flex items-center gap-2">
              <Info className="w-6 h-6" /> What is TDS?
           </h2>
           <p className="text-sm text-[#856404] leading-relaxed">
              TDS is a <strong>withholding tax</strong> where the person making the payment deducts 
              a specific percentage and deposits it directly into the government's revenue account 
              on behalf of the recipient. It is not an "extra" tax, but a prepayment of your 
              final income tax liability.
           </p>
        </div>

        <h2 className="text-2xl font-black text-[#202124] mt-12 mb-6">Key TDS Rates for FY 2083/84</h2>
        <p>
          The Inland Revenue Department (IRD) has maintained strict guidelines for various service 
          categories. Here are the most common rates you need to know:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
           <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="text-lg font-black text-[#1A73E8] mb-2">15% - Professional Services</h4>
              <p className="text-sm text-slate-500">Applies to consultancy, legal fees, auditing, and technical services provided by PAN-registered individuals.</p>
           </div>
           <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="text-lg font-black text-[#1A73E8] mb-2">10% - House & Land Rent</h4>
              <p className="text-sm text-slate-500">Applicable to all rental payments for commercial or residential property. This is usually paid to the local municipality.</p>
           </div>
           <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="text-lg font-black text-[#1A73E8] mb-2">5% - Bank Interest</h4>
              <p className="text-sm text-slate-500">Automatically deducted by banks on your Savings and Fixed Deposit (FD) interest returns.</p>
           </div>
           <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="text-lg font-black text-[#1A73E8] mb-2">25% - Windfall Gain</h4>
              <p className="text-sm text-slate-500">Applicable on lottery winnings, prizes, and significant awards.</p>
           </div>
        </div>

        <h2 className="text-2xl font-black text-[#202124] mt-12 mb-6">The Importance of E-TDS</h2>
        <p>
          Simply deducting the tax is not enough. The deductor MUST perform an <strong>E-TDS filing</strong> 
          on the IRD portal. Without this, the recipient will not see the credit in their tax ledger 
          and will be forced to pay the tax again during their annual filing.
        </p>

        <div className="my-10 p-8 bg-[#1A1A2E] rounded-2xl text-white">
           <h3 className="text-xl font-black mb-4">Don't Get the Math Wrong</h3>
           <p className="text-slate-400 mb-6">Deducting the wrong amount can lead to penalties from the IRD. Use our professional tool to audit your payments.</p>
           <Link href="/calculator/tds-calculator/" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-lg">
              Open TDS Calculator <ArrowRight className="w-4 h-4" />
           </Link>
        </div>

        <h2 className="text-2xl font-black text-[#202124] mt-12 mb-6">Common FAQs</h2>
        <div className="space-y-6 mb-12">
           <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
              <h5 className="font-black text-slate-900 mb-2">Is TDS applicable on VAT amounts?</h5>
              <p className="text-sm text-slate-600 leading-relaxed">No, TDS is always calculated on the <strong>Base Amount</strong> before VAT. If a bill is Rs. 100 + 13% VAT, the TDS is calculated on the Rs. 100.</p>
           </div>
           <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
              <h5 className="font-black text-slate-900 mb-2">What happens if I don't pay TDS?</h5>
              <p className="text-sm text-slate-600 leading-relaxed">The IRD charges a 15% annual interest on delayed TDS payments, plus additional fines for late filing of E-TDS returns.</p>
           </div>
        </div>

        <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row gap-8 items-center">
           <div className="shrink-0 w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-emerald-600" />
           </div>
           <div>
              <h4 className="text-lg font-black text-slate-900">Stay Compliant</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                 Tax laws in Nepal change every fiscal year. Ensure you are using tools updated for <strong>FY 2083/84</strong> 
                  to avoid audit discrepancies.
              </p>
           </div>
        </div>
      </div>
    </BlogPostLayout>
  );
}
