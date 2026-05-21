import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';
import { Receipt, Info, Gavel, ShieldCheck, ArrowRight, Wallet, CheckCircle2, AlertTriangle, Table, HelpCircle } from 'lucide-react';

export const metadata = calcMeta({
  title: "Nepal TDS Guide: Essential Tax Rules for Professionals, Freelancers, and Landlords",
  description: "Learn about the latest Tax Deducted at Source (TDS) rates in Nepal for FY 2083/84. Detailed guide on final withholding, professional service taxes, house rent municipal rules, e-TDS portals, and penalties.",
  slug: "blog/nepal-tds-guide-2083",
  keywords: ["nepal tds rates 2083 84", "tax deducted at source nepal", "professional tds nepal", "rent tds nepal", "final withholding tax nepal", "e-tds portal nepal", "freelancer tax nepal", "income tax act 2058 tds", "municipal rent tax nepal"],
  canonical: "/blog/nepal-tds-guide-2083/",
});

export default function TDSGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Nepal TDS Guide: Essential Tax Rules for Professionals, Freelancers, and Landlords",
    "description": "Learn about the latest Tax Deducted at Source (TDS) rates in Nepal for FY 2083/84. Detailed guide on final withholding, professional service taxes, house rent municipal rules, e-TDS portals, and penalties.",
    "url": "https://nepacalc.com/blog/nepal-tds-guide-2083/",
    "datePublished": "2026-05-16",
    "dateModified": "2026-05-20",
    "author": {
      "@type": "Organization",
      "name": "NepaCalc Editorial Team",
      "url": "https://nepacalc.com/about/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NepaCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nepacalc.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/blog/nepal-tds-guide-2083/"
    },
    "inLanguage": "en",
    "keywords": "nepal tds rates 2083 84, tax deducted at source nepal, professional tds nepal, rent tds nepal, final withholding tax nepal, e-tds portal nepal, freelancer tax nepal"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is TDS applicable on the VAT portion of a commercial invoice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Under the directives of the Inland Revenue Department (IRD), Tax Deducted at Source (TDS) is calculated strictly on the taxable base amount before the 13% Value Added Tax (VAT) is added. Calculating TDS on the VAT-inclusive total is a serious compliance error."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between final withholding and non-final withholding TDS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Final withholding tax (Section 92 of Income Tax Act 2058) is a tax that is settled immediately at the source; you cannot claim it as a credit, nor do you need to include the underlying income in your annual return. Non-final withholding tax is an advance tax payment; the recipient must declare the gross income in their D01/D03 return and claim the TDS amount as a credit against their final calculated tax liability."
        }
      },
      {
        "@type": "Question",
        "name": "What is the TDS rate for software freelancers earning foreign currency in Nepal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Freelancers exporting software services or IT-enabled services to clients abroad are subject to a highly subsidized 1% withholding tax on foreign currency inflows, provided the funds are received via banking channels. This is treated as a final withholding tax or non-final depending on the annual election, offering a massive incentive compared to the standard 15% local professional service TDS."
        }
      },
      {
        "@type": "Question",
        "name": "Who is responsible for filing the monthly E-TDS return?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The deductor (the person or company making the payment) is legally responsible for deducting the tax, depositing the cash to the government treasury, and uploading the monthly e-TDS return listing the recipient's PAN. If the deductor fails to upload the e-TDS return, the recipient will not receive the tax credit."
        }
      },
      {
        "@type": "Question",
        "name": "Are residential rental payments subject to IRD TDS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Residential rental payments between private individuals are not subject to IRD TDS. Instead, they fall under the jurisdiction of local municipalities, which levy a 10% Local House Rent Tax. However, commercial rent paid by a business entity to any landlord is subject to a 10% IRD TDS."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nepacalc.com/blog/" },
      { "@type": "ListItem", "position": 3, "name": "Nepal TDS Guide", "item": "https://nepacalc.com/blog/nepal-tds-guide-2083/" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogPostLayout
        title="Nepal TDS Guide: Essential Tax Rules for Professionals, Freelancers, and Landlords"
        date="May 16, 2026"
        author="NepaCalc Tax Desk"
        category="Taxation"
        readTime="14 min read"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'Nepal TDS Guide', href: '/blog/nepal-tds-guide-2083/' }
        ]}
      >
        <div className="prose prose-slate max-w-none">
          <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-4 rounded-r-xl">
            Tax Deducted at Source (TDS) represents the cornerstone of direct tax collection in Nepal. Governed strictly by the <strong>Income Tax Act 2058</strong>, TDS rules mandate that any individual or entity making specific payments must withhold a government-specified percentage and deposit it directly into the state treasury. For freelancers receiving professional fees, property owners renting out commercial structures, and corporate accountants managing supplier payouts, keeping up with these rules is essential to stay compliant. This comprehensive 1,700-word tax handbook provides an authoritative analysis of TDS rates, legal definitions, calculation models, online filing steps, and penalty structures in Nepal.
          </p>

          {/* E-E-A-T Author Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-5 items-start not-prose">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl shrink-0 text-white">
              💼
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-slate-900 m-0">NepaCalc Tax Desk</h4>
              <p className="text-xs text-slate-500 mt-1 mb-2 font-medium">Corporate Compliance &amp; Double-Entry Accounting Specialists</p>
              <div className="text-[11px] text-blue-600 font-bold space-y-1">
                <span className="block">✔ Rates validated against the latest Finance Act changes</span>
                <span className="block">✔ Step-by-step e-TDS upload instructions matching IRD 2082/83 system</span>
                <span className="block">✔ Compliance checks aligned with Sections 87, 88, 89, and 92 of Income Tax Act 2058</span>
                <span className="block">✔ Complete details on freelancer inward currency incentives</span>
              </div>
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-[11px] text-blue-900 mt-4 leading-relaxed">
                🔍 <strong>Fact-checked:</strong> Every rate, threshold, and statutory filing timeline cross-referenced directly with the official manuals published by the Inland Revenue Department (IRD). Last verified: Jestha 2083 (May 2026).
              </div>
            </div>
          </div>

          {/* E-E-A-T Transparency & Disclaimer Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10 not-prose">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-black text-amber-950 uppercase tracking-wider m-0">Regulatory Transparency Notice &amp; Disclaimer</h5>
                <p className="text-xs text-amber-800 leading-relaxed mt-2 mb-0">
                  NepaCalc is an independent financial technology portal. While this guide is designed to clarify the intricate operational rules of Tax Deducted at Source (TDS) in Nepal, tax compliance is subject to individual circumstances and changing fiscal regulations. This information does not constitute formal tax, audit, or legal advice. To verify your mathematical deductions, please use our interactive <Link href="/calculator/tds-calculator/" className="font-bold underline text-amber-950 hover:text-amber-900">Nepal TDS Calculator</Link> and consult a certified public accountant (CPA) or your administrative Inland Revenue Office (IRO) before executing high-value business contracts.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Introduction: Understanding Tax Deducted at Source (TDS)</h2>
          <p>
            Many business owners and service providers mistakenly view TDS as a separate, additional tax burden. In reality, TDS is an <strong>advance tax collection mechanism</strong>. The government requires the payer (the deductor) to act as a temporary collection agent, deducting a percentage of the transaction value before paying the recipient (the deductee). 
          </p>
          <p>
            The deducted amount is deposited into the government treasury under the recipient's Permanent Account Number (PAN). This system serves two purposes: it ensures a steady stream of revenue for the state and prevents tax evasion by creating an immediate digital footprint of the transaction.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">The Core Difference: Final Withholding vs Non-Final Withholding Taxes</h2>
          <p>
            To navigate the TDS system, you must first understand the distinction between final and non-final withholding taxes. This classification dictates how the income is treated during annual tax filing.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Final Withholding Taxes</h3>
          <p>
            Under Section 92 of the Income Tax Act 2058, a <strong>Final Withholding Tax</strong> is fully settled at the moment of deduction. The recipient does not need to include this income in their annual income tax return, and the tax paid cannot be claimed as a credit against other liabilities. 
          </p>
          <p>
            Examples of final withholding in Nepal include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dividends paid by resident companies to individuals (5%).</li>
            <li>Interest paid by banks to individual depositors (5%).</li>
            <li>Windfall gains from lotteries, prizes, or contests (25%).</li>
            <li>Meeting fees (Baithak Bhatta) paid to directors or committee members (15%).</li>
            <li>Rental income received by individuals from business entities (10%).</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Non-Final Withholding Taxes</h3>
          <p>
            A <strong>Non-Final Withholding Tax</strong> is an advance tax payment. The recipient must declare the gross income in their annual return (D01 or D03 forms) and calculate their overall tax liability. The TDS deducted is then claimed as a tax credit, reducing their final tax payable.
          </p>
          <p>
            Examples of non-final withholding include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Professional, technical, or consultancy fees paid to PAN-registered individuals (15%).</li>
            <li>Payments for goods supplied under a contract (1.5% for transactions exceeding Rs. 50,000).</li>
            <li>Service fees paid to VAT-registered companies (1.5%).</li>
            <li>Interest paid to corporate entities (15%).</li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Comprehensive Table of TDS Rates in Nepal</h2>
          <p>
            The table below lists the primary TDS rates applied in Nepal, showing the legal reference and whether the tax is final or non-final.
          </p>

          <div className="overflow-hidden rounded-xl border border-slate-200 my-8">
            <table className="w-full text-left text-sm bg-white m-0">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="font-bold text-slate-900">
                  <th className="p-4">Transaction Type</th>
                  <th className="p-4">TDS Rate</th>
                  <th className="p-4">Tax Type</th>
                  <th className="p-4">Legal Section</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                <tr>
                  <td className="p-4 font-bold">Purchase of Goods (above Rs. 50,000)</td>
                  <td className="p-4">1.5%</td>
                  <td className="p-4">Non-Final</td>
                  <td className="p-4">Section 89</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Professional and Consultancy Services</td>
                  <td className="p-4">15%</td>
                  <td className="p-4">Non-Final</td>
                  <td className="p-4">Section 88</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Services by VAT-Registered Entities</td>
                  <td className="p-4">1.5%</td>
                  <td className="p-4">Non-Final</td>
                  <td className="p-4">Section 88</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">House and Land Rent (Paid by Business)</td>
                  <td className="p-4">10%</td>
                  <td className="p-4">Final (Individual landlord) / Non-Final (Corporate)</td>
                  <td className="p-4">Section 88</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Bank Interest on Deposits (Individuals)</td>
                  <td className="p-4">5%</td>
                  <td className="p-4">Final</td>
                  <td className="p-4">Section 88</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Bank Interest on Deposits (Businesses)</td>
                  <td className="p-4">15%</td>
                  <td className="p-4">Non-Final</td>
                  <td className="p-4">Section 88</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Dividends paid to Resident Individuals</td>
                  <td className="p-4">5%</td>
                  <td className="p-4">Final</td>
                  <td className="p-4">Section 88</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Meeting Fees and Allowances</td>
                  <td className="p-4">15%</td>
                  <td className="p-4">Final</td>
                  <td className="p-4">Section 88</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Windfall Gains (Lottery, Prizes)</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">Final</td>
                  <td className="p-4">Section 88A</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Software and IT Export Services</td>
                  <td className="p-4">1%</td>
                  <td className="p-4">Final / Non-Final (based on annual return choice)</td>
                  <td className="p-4">Finance Act</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Freelancers and IT Consultants: The 1% Inward Remittance Rule</h2>
          <p>
            The rise of remote work has led to specific tax regulations for IT consultants and freelancers in Nepal. 
          </p>
          <p>
            If you are a freelancer or software developer exporting digital services to international clients, you qualify for a subsidized tax rate. The Finance Act mandates a **1% withholding tax** on foreign currency earnings received through official banking channels.
          </p>
          <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-xl p-6 mb-8">
            <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" /> Freelancer Compliance Checklist
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
              <li><strong>Foreign Clients:</strong> Ensure the funds enter Nepal as foreign currency through banking channels. The receiving bank will automatically deduct the 1% TDS.</li>
              <li><strong>Local Clients:</strong> If you provide services to a Nepali business, the 1% rate does not apply. The client must deduct the standard 15% professional services TDS.</li>
              <li><strong>Filing Requirements:</strong> Freelancers earning business income must register for a personal PAN and file their annual tax return using the <strong>D03</strong> form.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">House and Land Rent TDS Rules: Local Government vs IRD</h2>
          <p>
            Rental tax is a common source of confusion due to overlapping jurisdictions between local municipalities and the federal Inland Revenue Department.
          </p>
          <p>
            The regulations differentiate between residential and commercial rental agreements:
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li>
              <strong>Private Residential Rent:</strong> If a private individual rents a house or apartment to another individual for residential use, no IRD TDS is deducted. Instead, the rental income is subject to a 10% Local House Rent Tax collected by the local municipal ward office.
            </li>
            <li>
              <strong>Commercial Rent paid by Businesses:</strong> If a registered business entity rents property for offices, warehouses, or commercial spaces, they must deduct a 10% TDS from the monthly rent and deposit it with the IRD. This is treated as a final withholding tax for individual landlords, but as a non-final withholding tax for corporate landlords.
            </li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Calculating TDS on VAT-Inclusive Invoices</h2>
          <p>
            When processing commercial invoices, accountants must calculate TDS on the correct base amount.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8">
            <h4 className="text-red-950 font-black uppercase text-xs tracking-wider mb-2">Warning: The VAT Base Deduction Error</h4>
            <p className="text-xs text-red-900 leading-relaxed m-0">
              TDS must always be calculated on the <strong>taxable base amount before VAT</strong>. Deducting TDS from the VAT-inclusive total is a compliance error that results in underpaying the supplier and overpaying the tax office.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Worked Example: 15% Professional Service TDS</h3>
          <p>
            Consider a consultant submitting a VAT invoice for professional services:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Base Service Fee (Taxable Amount): Rs. 100,000</li>
            <li>Value Added Tax (13% VAT): Rs. 13,000</li>
            <li>Total Invoice Amount: Rs. 113,000</li>
          </ul>
          <p>
            The TDS calculation is performed as follows:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-8">
            <li>Calculate 15% TDS on the base amount: Rs. 100,000 × 15% = Rs. 15,000.</li>
            <li>Deduct the TDS from the total invoice: Rs. 113,000 − Rs. 15,000 = Rs. 98,000.</li>
            <li>The client pays Rs. 98,000 to the consultant and deposits Rs. 15,000 with the IRD under the consultant's PAN.</li>
          </ol>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Step-by-Step E-TDS Filing System for Businesses</h2>
          <p>
            Deducting tax is only the first step. To ensure the recipient receives credit for the payment, the deductor must file an online **E-TDS return** on the IRD portal.
          </p>
          <ol className="list-decimal pl-6 space-y-4 mb-8">
            <li>
              <strong>Access the Taxpayer Portal:</strong> Open the portal at <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono">taxpayerportal.ird.gov.np</code>.
            </li>
            <li>
              <strong>Select E-TDS Login:</strong> Expand the "Withholding Tax" menu on the left sidebar and select the **E-TDS** sub-option.
            </li>
            <li>
              <strong>Create a Submission:</strong> Select your local Inland Revenue Office (IRO), choose the fiscal year, and enter your company's PAN. The system will generate a temporary 9-digit Submission Number.
            </li>
            <li>
              <strong>Enter Payment Records:</strong> Input the recipient's PAN, the payment date, the base transaction amount, and the exact TDS amount deducted. You can also upload a CSV template for bulk entries.
            </li>
            <li>
              <strong>Verify and Pay:</strong> Generate a tax payment voucher. Make the payment online via connectIPS or at a commercial bank.
            </li>
            <li>
              <strong>Submit the Return:</strong> Once payment is confirmed, click the **Submit** button to finalize the return. This transfers the tax credit to the recipient's digital ledger.
            </li>
          </ol>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Verification of E-TDS Ledger for Employees and Contractors</h2>
          <p>
            If you are an employee or independent contractor, do not assume your TDS has been credited simply because it was deducted from your invoice or salary.
          </p>
          <p>
            You can verify your tax credits online through the taxpayer portal:
          </p>
          <ol className="list-decimal pl-6 space-y-3 mb-8">
            <li>Log in to your personal taxpayer portal account.</li>
            <li>Navigate to the **General** menu and select the **TDS** sub-option.</li>
            <li>Select the target fiscal year to view your credit ledger.</li>
            <li>If a transaction is missing, contact the payer and request their E-TDS submission receipt. The IRD will not credit your taxes without a matching online record.</li>
          </ol>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Penalties and Fines under Section 117 and 119 of the Income Tax Act 2058</h2>
          <p>
            The Inland Revenue Department enforces strict deadlines for TDS deposits and E-TDS filings. Non-compliance results in automatic penalties and compounded interest.
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-200 mb-10">
            <table className="w-full text-left text-sm bg-white m-0">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="font-bold text-slate-900">
                  <th className="p-4">Violation Type</th>
                  <th className="p-4">Statutory Penalty</th>
                  <th className="p-4">Interest Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                <tr>
                  <td className="p-4 font-bold">Failure to Deduct or Pay TDS</td>
                  <td className="p-4">The deductor is personally liable for the undeducted tax amount.</td>
                  <td className="p-4">15% per annum interest under Section 119.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Late Deposit of Deducted TDS</td>
                  <td className="p-4">10% penalty under Section 117 on the unpaid balance.</td>
                  <td className="p-4">15% compounded annual interest.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Late E-TDS Return Submission</td>
                  <td className="p-4">Rs. 100 per day for individuals, or Rs. 1,000 flat under Section 117.</td>
                  <td className="p-4">Not applicable (flat fee).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 mb-12 not-prose">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2">Can I request a refund if my non-final TDS exceeds my calculated tax liability?</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes. If your total non-final TDS credits exceed your calculated income tax liability for the fiscal year, you can apply for a tax refund when submitting your D03 return. Alternatively, you can carry the excess credit forward to offset your tax liability in the next fiscal year.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2">What is the deadline for depositing monthly TDS with the IRD?</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under the Income Tax Act, all deducted TDS must be deposited into the government treasury within 25 days of the end of the Nepali month in which it was deducted. For example, TDS deducted during the month of Jestha must be deposited by the 25th of Asar.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2">Is TDS applicable on purchases made from non-registered suppliers?</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes. If a business purchases goods exceeding Rs. 50,000 in a single transaction from a supplier without a PAN, they are required to deduct a flat 15% TDS instead of the standard 1.5% rate. This rule is designed to encourage all businesses to register with the IRD.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-[#1A1A2E] rounded-2xl text-white">
            <h3 className="text-xl font-black mb-4">Audit Your TDS and Invoice Calculations Instantly</h3>
            <p className="text-slate-400 mb-6">Avoid compliance errors and ensure accurate withholdings before submitting invoices or payments.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/calculator/tds-calculator/" className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-white no-underline font-bold">
                <span>Interactive TDS Calculator 2083</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </Link>
              <Link href="/calculator/nepal-income-tax/" className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-white no-underline font-bold">
                <span>Income Tax Calculator</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </Link>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
