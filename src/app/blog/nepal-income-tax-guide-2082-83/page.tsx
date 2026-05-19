/**
 * @fileoverview Blog Post: Nepal Income Tax Guide 2083/84
 * EEAT-Optimized, Expert-Grade Content
 */

import React from 'react';
import type { Metadata } from 'next';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, CheckCircle2, AlertCircle, Calculator } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Nepal Income Tax Guide 2083/84 | Expert Tax Slabs & Deductions",
  description: "Master Nepal's income tax for FY 2083/84. Expert guide on SSF, CIT, female rebates, and married thresholds. Updated for Finance Act 2083 compliance.",
  alternates: {
    canonical: 'https://nepacalc.com/blog/nepal-income-tax-guide-2083-83/',
  },
  openGraph: {
    title: "Nepal Income Tax Guide 2083/84 | Expert Analysis",
    description: "The definitive guide to navigating Nepal's tax landscape in 2026.",
    type: 'article',
    publishedTime: '2026-05-16T00:00:00.000Z',
    authors: ['NepaCalc Editorial'],
  },
};

export default function TaxGuideBlog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar (Visual Only) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
        <div className="h-full bg-blue-600 w-1/3"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        <Link 
          href="/blog/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
              Finance & Tax
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" /> 12 min read
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] mb-8">
            Nepal Income Tax Guide 2083/84: The Definitive Compliance Handbook
          </h1>

          <div className="flex items-center justify-between border-y border-slate-100 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <User className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">NepaCalc Editorial Team</p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> May 16, 2026 • Updated for Finance Act 2083
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <article className="prose prose-slate max-w-none">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-12 shadow-sm not-prose">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <p className="text-amber-900 font-bold mb-1 italic">Executive Summary</p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  The Finance Act 2083 has confirmed that the income tax slabs for individual and married residents remain unchanged for the fiscal year 2083/84. However, strict enforcement of SSF enrollment and digital TDS reporting means employees must be more vigilant than ever about their monthly payslip audits.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">1. Understanding the Dual Threshold: Individual vs. Married</h2>
          <p>
            In Nepal, your tax liability begins with a fundamental choice: filing as an <strong>Individual (Ekla)</strong> or as a <strong>Couple (Dampatti)</strong>. Under Section 50 of the Income Tax Act 2058, married couples have the right to combine their income and benefit from a higher tax-free threshold.
          </p>
          <ul>
            <li><strong>Individual Threshold:</strong> First Rs. 5,00,000 is taxed at 1% (waived if in SSF).</li>
            <li><strong>Married Threshold:</strong> First Rs. 6,00,000 is taxed at 1% (waived if in SSF).</li>
          </ul>
          <p>
            <em>Pro Tip:</em> While the married threshold is higher, if both spouses are high-earners, it is often mathematically superior to file as two separate individuals to prevent their combined income from hitting the 36% or 39% surcharge brackets too quickly. Use our <Link href="/calculator/nepal-income-tax/" className="text-blue-600 underline font-bold">Income Tax Calculator</Link> to simulate both scenarios before your HR finalizes the Poush declaration.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">2. The Social Security Fund (SSF) Waiver Logic</h2>
          <p>
            The 1% Social Security Tax (SST) is often misunderstood. It is not technically an income tax, but a social levy. If you are a contributor to the <strong>Social Security Fund (SSF)</strong>, this 1% is fully waived.
          </p>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 my-8 not-prose">
            <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Statutory Deduction Audit
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="font-bold text-slate-900 mb-1">Employee Contribution</p>
                <p className="text-slate-600">11% of Basic Salary is deducted from your gross pay.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="font-bold text-slate-900 mb-1">Employer Contribution</p>
                <p className="text-slate-600">20% of Basic Salary is added by the company (not part of your net).</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">3. Maximizing Deductions: CIT, EPF, and Insurance</h2>
          <p>
            Your "Assessable Income" is lower than your "Gross Salary". To minimize tax, you must maximize your legal deductions under Section 63 and 64 of the Act.
          </p>
          <table className="w-full border-collapse my-8 text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left">
                <th className="p-4 font-bold">Deduction Type</th>
                <th className="p-4 font-bold">Limit / Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-4 font-medium">Retirement (CIT/EPF/SSF)</td><td className="p-4">Lower of 1/3rd of income OR Rs. 3,00,000 (Rs. 5,00,000 for SSF)</td></tr>
              <tr><td className="p-4 font-medium">Life Insurance</td><td className="p-4">Maximum deduction of Rs. 40,000 per year</td></tr>
              <tr><td className="p-4 font-medium">Health Insurance</td><td className="p-4">Maximum deduction of Rs. 20,000 per year</td></tr>
              <tr><td className="p-4 font-medium">Remote Area Allowance</td><td className="p-4">Up to Rs. 50,000 depending on Grade (A to E)</td></tr>
            </tbody>
          </table>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">4. The 10% Female Rebate</h2>
          <p>
            In a progressive move to encourage female workforce participation, Nepal offers a <strong>10% rebate on total computed tax</strong> for female employees whose only source of income is employment remuneration.
          </p>
          <p>
            <em>Example:</em> If a female professional's calculated annual tax is Rs. 1,00,000, her final payable amount is only Rs. 90,000. This is applied at the very end of the calculation, after all slabs and surcharges.
          </p>

          <div className="bg-blue-600 rounded-[2.5rem] p-10 my-16 text-white relative overflow-hidden not-prose shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Calculator className="w-16 h-16 mb-6 text-blue-200" />
              <h3 className="text-3xl font-black mb-4">Audit Your Payslip Instantly</h3>
              <p className="text-blue-100 mb-8 max-w-xl text-lg">
                Don't wait for your HR's year-end adjustment. Use our real-time engine to verify your monthly TDS deductions against the latest 2083/84 slabs.
              </p>
              <Link 
                href="/calculator/nepal-income-tax/" 
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Launch Tax Calculator
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Conclusion: Compliance in the Digital Age</h2>
          <p>
            With the Inland Revenue Department (IRD) moving toward an integrated Biometric-linked PAN system, income transparency is at an all-time high. Ensuring your salary tax is correctly audited not only prevents legal penalties but also streamlines your path for home loans and foreign visa applications.
          </p>
          <p className="text-sm text-slate-500 italic mt-8 border-t pt-8">
            Disclaimer: This guide is for informational purposes only. While every effort is made to ensure accuracy based on the Finance Act 2083, users should consult with a certified tax professional or the IRD for specific legal advice.
          </p>
        </article>

        {/* Footer Navigation */}
        <div className="mt-20 pt-12 border-t border-slate-100">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Related Financial Tools</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculator/nepal-salary/" className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-300 transition-all group">
                    <p className="text-xs font-bold text-blue-600 mb-1">Calculator</p>
                    <h5 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">Net Salary Tracker &rarr;</h5>
                </Link>
                <Link href="/calculator/nea-bill/" className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-300 transition-all group">
                    <p className="text-xs font-bold text-blue-600 mb-1">Utility</p>
                    <h5 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">NEA Electricity Bill Auditor &rarr;</h5>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
