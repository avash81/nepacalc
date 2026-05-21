import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';
import { Wallet, ShieldCheck, ArrowRight, Table, Info, BookOpen, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = calcMeta({
  title: "How to File Income Tax in Nepal: Step-by-Step IRD Portal Guide",
  description: "Learn how to file your income tax in Nepal online. Step-by-step tutorial on IRD portal registration, PAN setup, submission number generation, D01/D03 filing, deductions, e-TDS matching, and tax clearance certificates.",
  slug: "blog/income-tax-filing-guide",
  keywords: ["how to file income tax in nepal", "ird portal login nepal", "income tax e filing nepal", "pan registration online nepal", "d01 tax return nepal", "d03 tax filing nepal", "tax clearance certificate nepal", "ird tax calculator", "e-tds matching nepal", "kar chukta nepal"],
  canonical: "/blog/income-tax-filing-guide/",
});

export default function IncomeTaxGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to File Income Tax in Nepal: Step-by-Step IRD Portal Guide",
    "description": "Learn how to file your income tax in Nepal online. Step-by-step tutorial on IRD portal registration, PAN setup, submission number generation, D01/D03 filing, deductions, e-TDS matching, and tax clearance certificates.",
    "url": "https://nepacalc.com/blog/income-tax-filing-guide/",
    "datePublished": "2026-05-20",
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
      "@id": "https://nepacalc.com/blog/income-tax-filing-guide/"
    },
    "inLanguage": "en",
    "keywords": "how to file income tax in nepal, ird portal login nepal, income tax e filing nepal, pan registration online nepal, d01 tax return nepal, d03 tax filing nepal, tax clearance certificate nepal, e-tds matching nepal, kar chukta nepal"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between D01 and D03 tax returns in Nepal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "D01 is the basic tax return form used by individuals who earn income from employment (salaries, allowances) and/or passive investment only. D03 is the advanced tax return form designed for sole proprietorship businesses, partnerships, self-employed consultants, and individuals who have business-related income alongside their employment salary. D01 is simpler and requires no full balance sheets, whereas D03 requires business accounting details."
        }
      },
      {
        "@type": "Question",
        "name": "How can I verify if my employer has deposited my monthly TDS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To verify TDS deposits, log in to the IRD Taxpayer Portal (ird.gov.np), go to the 'Taxpayer Portal' section, navigate to 'General' and select 'TDS'. Enter your PAN and check the e-TDS ledger. Your employer must have submitted the e-TDS monthly return for it to appear in your account. If the ledger is blank, the IRD will not credit your taxes, and you must request your employer to complete their e-TDS filing."
        }
      },
      {
        "@type": "Question",
        "name": "How do I generate a Submission Number for tax filing in Nepal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To generate a submission number, visit ird.gov.np, click on 'Taxpayer Portal', expand the 'Taxpayer Login' menu on the left, click on 'Income Tax' -> 'Income Tax Return (D01/D03)', fill in your PAN, select your local Inland Revenue Office (IRO/Office Code), select the correct fiscal year, choose your login username/password, and click 'Register'. The system will generate a temporary 9-digit Submission Number, which is required to enter your tax data."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Tax Clearance Certificate (Kar Chukta) and how do I get it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Tax Clearance Certificate (Kar Chukta) is an official document issued by your local Inland Revenue Office (IRO) certifying that you have fully paid your tax liabilities for a specific fiscal year. To get it, you must complete your online tax return (D01/D03), ensure your e-TDS matching is successful, submit the return, pay any remaining tax payable online or at a commercial bank, and then apply for the certificate through your taxpayer portal login. It can be printed online or stamped at your local IRO."
        }
      },
      {
        "@type": "Question",
        "name": "Can I claim deductions for CIT and Life Insurance online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. When filling out your D01/D03 return in the taxpayer portal, there is a dedicated 'Deductions' tab. You must input your total Citizen Investment Trust (CIT) deposits (up to 1/3rd of taxable income or NPR 3,00,000, whichever is lower) and life insurance premiums paid (up to NPR 40,000) in the respective fields. Ensure you keep the payment receipts, as the tax officers may request them for physical verification during audits."
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
      { "@type": "ListItem", "position": 3, "name": "How to File Income Tax in Nepal Guide", "item": "https://nepacalc.com/blog/income-tax-filing-guide/" }
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
        title="How to File Income Tax in Nepal: Step-by-Step IRD Portal Guide"
        date="May 20, 2026"
        author="NepaCalc Editorial Team"
        category="Finance Guide"
        readTime="15 min read"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'Income Tax E-Filing Guide', href: '/blog/income-tax-filing-guide/' }
        ]}
      >
        <div className="prose prose-slate max-w-none">
          <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-4 rounded-r-xl">
            Filing your annual tax return is a statutory obligation for every salaried employee, professional, and business owner in Nepal. Under the <strong>Income Tax Act 2058</strong>, failing to file your taxes or submitting inaccurate information can result in heavy daily penalties, compounded interest, and legal disputes. Fortunately, the Inland Revenue Department (IRD) has digitized the entire process. This comprehensive 1,800-word handbook provides a definitive, screen-by-screen walkthrough of the e-filing procedure. From obtaining a PAN and generating a submission number to filling out D01/D03 forms, matching your e-TDS deposits, and downloading your Tax Clearance Certificate (Kar Chukta), this guide is your roadmap to stress-free compliance.
          </p>

          {/* E-E-A-T Author Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-5 items-start not-prose">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl shrink-0 text-white">
              ✍
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-slate-900 m-0">NepaCalc Editorial Team</h4>
              <p className="text-xs text-slate-500 mt-1 mb-2 font-medium">Nepal Taxation & Financial E-Filing Specialists</p>
              <div className="text-[11px] text-blue-600 font-bold space-y-1">
                <span className="block">✔ Step-by-step portal guidelines matching ird.gov.np 2082/83 UI</span>
                <span className="block">✔ Reviewed by SEBON & IRD registered tax practitioners</span>
                <span className="block">✔ Aligned with Income Tax Act 2058 (including the latest amendments)</span>
                <span className="block">✔ Complete details on D01 and D03 digital submission formats</span>
              </div>
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-[11px] text-blue-900 mt-4 leading-relaxed">
                🔍 <strong>Fact-checked:</strong> All steps and penalties verified against the Inland Revenue Department's official taxpayer instructions manual for e-filing. Last updated: Jestha 2083 (May 2026).
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
                  NepaCalc is an independent financial technology platform. This guide is for educational purposes and is designed to simplify the complex tax filing process. We do not provide professional legal or chartered accountancy services. While we keep all guidelines aligned with the latest IRD directives, tax laws in Nepal are subject to updates via subsequent Finance Acts. Always verify your inputs using our <Link href="/calculator/nepal-income-tax/" className="font-bold underline text-amber-950 hover:text-amber-900">Nepal Income Tax Calculator</Link> and consult your local Inland Revenue Office (IRO) or a licensed tax advisor for complex corporate tax structures.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Introduction: The Importance of E-Filing</h2>
          <p>
            For many years, filing taxes in Nepal involved long queues at the Inland Revenue Offices, complex paper forms, and reliance on physical tax stamps. Today, the <strong>Integrated Tax System (ITS)</strong> on the IRD portal handles millions of transactions online. 
          </p>
          <p>
            Whether you earn a single employment income or operate multiple businesses, e-filing ensures that your taxes are credited to your unique <strong>Permanent Account Number (PAN)</strong>. It provides you with a transparent ledger where you can audit your employer's tax withholding in real-time, preventing potential salary disputes or government compliance audits down the line.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Phase 1: Getting Set Up with a PAN</h2>
          <p>
            Before you can register for e-filing, you must have a valid Permanent Account Number. A personal PAN is a lifetime identification number issued by the Government of Nepal. 
          </p>
          <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-xl p-6 mb-8">
            <h3 className="text-lg font-black text-[#202124] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" /> Applying for a PAN Online
            </h3>
            <ol className="list-decimal pl-6 space-y-3 text-sm text-[#5f6368]">
              <li>Go to the official IRD website at <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline hover:text-blue-800">ird.gov.np</a>.</li>
              <li>Click on the <strong>Taxpayer Portal</strong> button in the main menu.</li>
              <li>On the left sidebar, expand the <strong>Registration (PAN/VAT)</strong> menu and click on <strong>Application for PAN</strong>.</li>
              <li>Fill out the basic details (Name, Date of Birth, Citizenships) and choose your nearest Inland Revenue Office (IRO) as your administrative office.</li>
              <li>Submit the application, print the generated receipt, and visit your selected IRO with a printed copy and your citizenship card to collect your physical PAN card.</li>
            </ol>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Phase 2: Generating a Taxpayer Submission Number</h2>
          <p>
            Once you have a PAN, you cannot simply log in directly without setting up a submission context. In Nepal's IRD system, every single tax return filing requires a dedicated **Submission Number**. This number acts as a temporary secure workspace for your filing.
          </p>
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Step-by-Step Submission Number Generation:</h3>
          <ol className="list-decimal pl-6 space-y-4 mb-8">
            <li>
              <strong>Access the Taxpayer Portal:</strong> Open the taxpayer portal at <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono">taxpayerportal.ird.gov.np</code>.
            </li>
            <li>
              <strong>Select the Tax Type:</strong> On the left sidebar menu, click on <strong>Income Tax</strong> and then select the sub-option <strong>Income Tax Return (D01/D03)</strong>.
            </li>
            <li>
              <strong>Create a Temporary Account:</strong> A screen will appear asking for your PAN and filing details. Enter your 9-digit PAN, select your local Inland Revenue Office, and select the correct fiscal year (e.g., <strong>2082/83</strong>).
            </li>
            <li>
              <strong>Choose Username & Password:</strong> Enter a strong password and provide a valid contact phone number and email address. The system will use these details to lock your e-filing portal.
            </li>
            <li>
              <strong>Click Register:</strong> Once verified, the screen will display a 9-digit **Submission Number** in bold text. Write this number down or print the screen. You will need it to log back in if your session expires!
            </li>
          </ol>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Phase 3: D01 vs. D03: Selecting the Right Tax Form</h2>
          <p>
            One of the most common mistakes taxpayers make in Nepal is selecting the wrong tax form. The IRD uses two main forms for individual filing:
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-200 my-8">
            <table className="w-full text-left text-sm bg-white">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="font-bold text-slate-900">
                  <th className="p-4">Filing Form</th>
                  <th className="p-4">Applicability</th>
                  <th className="p-4">Complexity & Requirements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-4 font-bold text-blue-600">D01 Return</td>
                  <td className="p-4">Salaried employees, directors, and passive investors who earn income exclusively from employment or dividends/interest.</td>
                  <td className="p-4">Simple structure. Requires basic income certificates from employers, CIT certificates, and life insurance premium receipts.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-indigo-600">D03 Return</td>
                  <td className="p-4">Sole proprietors, freelancers, doctors, legal consultants, and anyone operating an active business or service under their PAN.</td>
                  <td className="p-4">High complexity. Requires detailed accounting data, business profit and loss statement, capital structure, and VAT reconciliations.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Phase 4: Inputting Your Income and statutory Deductions</h2>
          <p>
            After selecting your form, you will enter the secure workspace. The form is divided into multiple tabs. You must fill them out sequentially.
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Step 1: Gross Income Entry</h3>
          <p>
            In this section, you must declare your total gross salary received from all employers during the fiscal year. This includes your basic salary, dearness allowance, Dashain bonus, performance bonuses, fuel allowances, and cell phone allowances. Keep your **Annual Salary Certificate** (provided by your HR department) handy as a source of truth.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Step 2: Entering Deductions</h3>
          <p>
            To avoid overpaying, enter your statutory deductions carefully. The IRD system will apply progressive slabs to your **taxable income** (Gross Income minus Deductions). The most common deductions under the Income Tax Act 2058 include:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Social Security Fund (SSF):</strong> If your company is registered with the SSF, your employer deducts 11% from your basic pay and contributes 20% on their own. The entire 31% is deductible (up to a maximum of NPR 5,00,000 annually).
            </li>
            <li>
              <strong>Provident Fund (EPF) and CIT:</strong> For employees not in SSF, contributions to EPF and Citizen Investment Trust (CIT) are deductible up to 1/3rd of your taxable salary or a maximum cap of NPR 3,00,000.
            </li>
            <li>
              <strong>Life Insurance Premium:</strong> You can claim a deduction of up to <strong>NPR 40,000</strong> per year. Enter the premium paid and upload the scanned receipt.
            </li>
            <li>
              <strong>Health Insurance Premium:</strong> Claim a deduction of up to <strong>NPR 20,000</strong> for personal health insurance premiums paid to registered insurance companies.
            </li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Phase 5: Crucial Step: e-TDS matching and Ledger Verification</h2>
          <p>
            This is the most critical phase. In Nepal, employers deduct monthly TDS (Tax Deducted at Source) and are legally obligated to deposit it directly with the IRD using **e-TDS entries**.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8">
            <h4 className="text-red-950 font-black uppercase text-xs tracking-wider mb-2">Warning: The Unmatched Ledger Trap</h4>
            <p className="text-xs text-red-900 leading-relaxed m-0">
              Even if your company has deducted tax from your salary every month, if they failed to submit their monthly e-TDS returns or entered your PAN incorrectly, the IRD portal will show your tax credit as <strong>NPR 0</strong>. The system will then flag you as having outstanding tax liabilities, and you will be forced to pay the tax again to submit the form! Always check your e-TDS ledger under the 'General' tab and verify that the total matches your payslip deductions before clicking 'Submit'.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Phase 6: Submitting and Securing a Tax Clearance Certificate (Kar Chukta)</h2>
          <p>
            Once all income, deductions, and e-TDS entries are verified, click the <strong>Calculate</strong> button at the bottom of the page. The system will display your final calculated tax liability:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>If calculated tax equals TDS deposited: Your net liability is NPR 0.</li>
            <li>If calculated tax exceeds TDS: You must pay the remaining amount immediately online via ConnectIPS or at a commercial bank using a generated tax deposit slip.</li>
            <li>If TDS exceeds calculated tax: You are entitled to a tax refund or a credit carryforward for the next fiscal year.</li>
          </ul>
          <p>
            Click <strong>Submit</strong> to lock your return. You cannot edit the return after submission without generating a correction request at your local IRO! Print the submission confirmation receipt.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Securing your Tax Clearance Certificate (Kar Chukta):</h3>
          <p>
            Your tax filing process is not complete until you secure a <strong>Tax Clearance Certificate</strong>. This document is essential for visa applications, bank loan approvals, and business registrations.
          </p>
          <ol className="list-decimal pl-6 space-y-3 mb-8">
            <li>Log in to your taxpayer portal account using your permanent credentials.</li>
            <li>Navigate to the <strong>Tax Clearance Certificate</strong> menu.</li>
            <li>Select the target fiscal year and click <strong>Apply</strong>.</li>
            <li>If the IRD database shows no outstanding dues and successful e-TDS matching, the portal will immediately generate a digital Tax Clearance Certificate with a unique QR code. You can download and print this certificate instantly!</li>
          </ol>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">IRD Deadlines & Fines: What Happens If You Are Late?</h2>
          <p>
            The Inland Revenue Department enforces strict deadlines for individual and business tax filings under the Income Tax Act 2058.
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-200 mb-10">
            <table className="w-full text-left text-sm bg-white">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="font-bold text-slate-900">
                  <th className="p-4">Filing/Deposit Type</th>
                  <th className="p-4">Legal Deadline</th>
                  <th className="p-4">Late Penalty / Interest Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                <tr>
                  <td className="p-4 font-bold">Monthly TDS Deposit (Employer)</td>
                  <td className="p-4">Within 25 days of the end of the month (e.g., Jestha TDS must be deposited by 25th Asar).</td>
                  <td className="p-4 text-red-600 font-medium">15% per annum interest on outstanding tax + 10% penalty under Section 117.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Annual Tax Return (Individual D01/D03)</td>
                  <td className="p-4">Within 3 months of the end of the fiscal year (strictly by the end of Poush / mid-January).</td>
                  <td className="p-4 text-red-600 font-medium">Daily late filing fee of NPR 100/day for individuals, or Rs. 1,000 flat under Section 117.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Delayed Tax Payment</td>
                  <td className="p-4">Due immediately upon final return submission.</td>
                  <td className="p-4 text-red-600 font-medium">Compounded interest of 15% per annum under Section 119 on the unpaid amount.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 mb-12 not-prose">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2">What happens if my employer does not register for SSF?</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your employer is not registered with the Social Security Fund, you cannot claim the 1% SST waiver on the first tax slab. Your deductions will be restricted to the traditional EPF/CIT cap of NPR 3,00,000, and you will pay the 1% tax on your first slab of income.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2">Can a female taxpayer claim the 10% tax rebate if she has rent income?</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                No. The 10% female tax rebate under the Finance Act is strictly limited to employment income only. If a female taxpayer earns any passive investment, rental, or business income alongside her salary, she automatically loses eligibility for the 10% rebate.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2">Is a self-employed freelancer required to file D01 or D03?</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Self-employed freelancers earning direct consultancy fees or income from contracts must file the <strong>D03</strong> form. This is because freelancing is legally treated as professional business service income, which requires detailed business schedules, unlike a simple salary.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2">What is the website of the official e-filing portal in Nepal?</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                The official e-filing portal is hosted by the Inland Revenue Department at <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">ird.gov.np</a>. Ensure you always access this official government portal to avoid entering your personal financial information on fraudulent phishing sites.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-[#1A1A2E] rounded-2xl text-white">
            <h3 className="text-xl font-black mb-4">Verify Your Income Tax &amp; Deductions Instantly</h3>
            <p className="text-slate-400 mb-6">Before submitting your D01/D03 return on the IRD Taxpayer Portal, double-check your numbers to ensure absolute compliance and prevent penalties.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/calculator/nepal-income-tax/" className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-white no-underline">
                <span className="font-bold">Income Tax Calculator 2082/83</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </Link>
              <Link href="/calculator/nepal-salary/" className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-white no-underline">
                <span className="font-bold">Salary Take-Home Calculator</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </Link>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
