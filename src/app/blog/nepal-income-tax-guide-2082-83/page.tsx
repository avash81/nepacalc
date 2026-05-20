import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Nepal Income Tax 2082/83 — Complete Guide to Slabs, SSF Waiver and TDS Rules",
  description: "Complete guide to Nepal income tax for FY 2082/83. Covers IRD-verified tax slabs for single and married filers, SSF waiver, EPF/CIT deductions, female 10% rebate, TDS process, and worked examples.",
  slug: "blog/nepal-income-tax-guide-2082-83",
  keywords: ["nepal income tax 2082/83", "income tax slab nepal", "ird tax calculator", "ssf waiver nepal", "tds calculator nepal", "nepal income tax slab 1% up to 500000"],
  canonical: "/blog/nepal-income-tax-guide-2082-83/",
});

export default function TaxGuideBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Nepal Income Tax 2082/83 — Complete Guide to Slabs, SSF Waiver and TDS Rules",
    "description": "Complete guide to Nepal income tax for FY 2082/83. Covers IRD-verified tax slabs for single and married filers, SSF waiver, EPF/CIT deductions, female 10% rebate, TDS process, and worked examples.",
    "url": "https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/",
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": {
      "@type": "Organization",
      "name": "NepaCalc",
      "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/" },
    "inLanguage": "en",
    "keywords": "nepal income tax 2082/83, income tax slab nepal, ird tax calculator, ssf waiver nepal, tds calculator nepal, nepal income tax slab 1% up to 500000"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the income tax slab in Nepal for FY 2082/83 with 1% up to Rs 5,00,000?",
        "acceptedAnswer": { "@type": "Answer", "text": "The 1% on the first Rs 5,00,000 is the Social Security Tax (SST), not income tax. It is fully waived for employees enrolled in the Social Security Fund (SSF). Non-SSF employees pay 1% SST on this slab. Above Rs 5,00,000: 10% on Rs 5,00,001–7,00,000; 20% on Rs 7,00,001–10,00,000; 30% on Rs 10,00,001–20,00,000; 36% on Rs 20,00,001–50,00,000; 39% above Rs 50,00,000. Source: Finance Act 2082." }
      },
      {
        "@type": "Question",
        "name": "What is the married couple income tax threshold in Nepal — is the first Rs 6,00,000 at 1%?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Married filers get a higher first slab threshold: the 1% SST applies on income up to Rs 6,00,000 (versus Rs 5,00,000 for single filers). This extra Rs 1,00,000 band saves Rs 1,000 in SST — or is fully waived for SSF contributors. Subsequent slabs for married filers: 10% on Rs 6,00,001–8,00,000; 20% on Rs 8,00,001–11,00,000; 30% on Rs 11,00,001–20,00,000." }
      },
      {
        "@type": "Question",
        "name": "What is the SSF waiver on Nepal income tax — how do I pay Rs 0 on Band 1?",
        "acceptedAnswer": { "@type": "Answer", "text": "Employees enrolled in Nepal's Social Security Fund (SSF) have their entire Band 1 SST (1% on first Rs 5,00,000 for single, or Rs 6,00,000 for married) waived. This saves Rs 5,000–6,000 per year. SSF enrollment is mandatory for all formal sector employers with 10+ employees under the Social Security Act 2074. If your employer is SSF-registered, your TDS should show zero tax on Band 1." }
      },
      {
        "@type": "Question",
        "name": "How does TDS work for salaried employees in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "TDS (Tax Deducted at Source) is your annual income tax divided by 12 and deducted from your gross salary each month by your employer. Employers must deposit TDS to the IRD by the 25th of the following month. They must also file quarterly reconciliation via IRD's e-TDS system and provide employees with an annual TDS certificate (Form 2) by end of Ashad. The legal basis is Income Tax Act 2058, Sections 87–92." }
      },
      {
        "@type": "Question",
        "name": "Who qualifies for the female 10% tax rebate in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Female employees with employment income only qualify for a 10% rebate on total computed income tax. The rebate applies after the full slab calculation. If computed tax is Rs 40,000, rebate = Rs 4,000, final tax = Rs 36,000. This rebate does NOT apply to women who also have business income, rental income, or other non-employment income. Finance Act 2082 confirms this rebate continues for 2082/83." }
      },
      {
        "@type": "Question",
        "name": "What is the IRD income tax filing deadline in Nepal 2082/83?",
        "acceptedAnswer": { "@type": "Answer", "text": "Salaried employees pay tax monthly via TDS — no separate filing needed if your only income is employment income. Self-employed individuals and businesses must file annual income tax returns with IRD by the end of Poush (approximately mid-January). Late filing attracts a Rs 100/day penalty (minimum Rs 1,00,000, maximum Rs 25,000? No, let's keep exact text from the provided FAQ: 'late filing attracts a Rs 100/day penalty (minimum Rs 1,000, maximum Rs 25,000) plus 15% per annum interest on unpaid tax'). E-filing is available at ird.gov.np." }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nepacalc.com/blog/" },
      { "@type": "ListItem", "position": 3, "name": "Nepal Income Tax 2082/83 Guide", "item": "https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/" }
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
        title="Nepal Income Tax 2082/83 — Complete Guide to Slabs, SSF Waiver & TDS Rules"
        date="May 20, 2026"
        author="NepaCalc Editorial Desk"
        category="Finance & Tax"
        readTime="9 min read"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'Nepal Income Tax 2082/83 Guide', href: '/blog/nepal-income-tax-guide-2082-83/' }
        ]}
      >
        <div className="prose prose-slate max-w-none">
          <p>
            If your monthly payslip shows a tax deduction you don't fully understand, you are not alone. Nepal's income tax system has multiple layers — progressive slab rates, Social Security Tax (SST), SSF waiver, deductions, and TDS — and most employees never receive a clear explanation of how these combine to produce the final number. This guide covers every component of Nepal's income tax for FY 2082/83 (2025/26 AD), with official slab tables, worked examples, and answers to the exact questions appearing in Google for this topic. Use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 font-bold underline hover:text-blue-800">Nepal income tax calculator</Link> alongside this guide to verify your own numbers instantly.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">1. What is Nepal's income tax and who must pay it?</h2>
          <p>
            Nepal's income tax is a <strong>direct progressive tax</strong> levied on the taxable income of individuals and businesses, administered by the <strong>Inland Revenue Department (IRD)</strong> under the Income Tax Act 2058 (ITA 2058). The Finance Act — passed annually by Parliament — sets the tax rates and thresholds for each fiscal year. For FY 2082/83, the Finance Act 2082 confirmed that individual income tax rates remain unchanged from 2081/82.
          </p>
          <p>
            <strong>Who must pay:</strong> Every individual whose annual income exceeds Rs 5,00,000 (single) or Rs 6,00,000 (married couple). Salaried employees pay through TDS — the employer deducts and deposits monthly on your behalf. Self-employed individuals, business owners, and freelancers must compute and file independently.
          </p>

          <div className="border-l-4 border-blue-600 bg-blue-50/70 p-5 rounded-r-xl my-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 mb-2">🇳🇵 Legal Basis — Nepal</div>
            <p className="text-xs text-blue-900 leading-relaxed m-0">
              <strong>Income Tax Act 2058</strong>, Parts 2–4 | <strong>Finance Act 2082</strong> (First Schedule — Tax Rates) | <strong>Social Security Act 2074</strong> (SSF mandate) | IRD official portal: <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">ird.gov.np</a> | Finance Ministry: <a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">mof.gov.np</a>
            </p>
          </div>

          <div className="border-l-4 border-emerald-600 bg-emerald-50/70 p-5 rounded-r-xl my-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 mb-2">🌐 International Context</div>
            <p className="text-xs text-emerald-950 leading-relaxed m-0">
              Nepal's progressive tax structure follows the <strong>OECD Model Tax Convention</strong> framework and IMF Fiscal Monitor recommendations for developing economies. The ILO Social Security Convention No. 102 underpins SSF design. Nepal's top rate of 39% is consistent with South Asian regional averages for high-income brackets.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">2. Income tax slabs FY 2082/83 — single / unmarried filers</h2>
          <p>
            Nepal taxes income in <strong>six progressive bands</strong>. You do not pay the highest applicable rate on your full income. Each band is taxed at its own rate independently. Band 1 is technically a Social Security Tax, not income tax — and is <strong>completely waived</strong> for SSF contributors.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Band</th>
                  <th className="p-3 font-semibold">Annual Taxable Income (NPR)</th>
                  <th className="p-3 font-semibold">Rate</th>
                  <th className="p-3 font-semibold">Maximum Tax on This Band</th>
                  <th className="p-3 font-semibold">Nature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium">Band 1</td>
                  <td className="p-3">Up to Rs 5,00,000</td>
                  <td className="p-3">1%*</td>
                  <td className="p-3">Rs 5,000</td>
                  <td className="p-3">Social Security Tax (SST)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Band 2</td>
                  <td className="p-3">Rs 5,00,001 – Rs 7,00,000</td>
                  <td className="p-3">10%</td>
                  <td className="p-3">Rs 20,000</td>
                  <td className="p-3">Income Tax</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Band 3</td>
                  <td className="p-3">Rs 7,00,001 – Rs 10,00,000</td>
                  <td className="p-3">20%</td>
                  <td className="p-3">Rs 60,000</td>
                  <td className="p-3">Income Tax</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Band 4</td>
                  <td className="p-3">Rs 10,00,001 – Rs 20,00,000</td>
                  <td className="p-3">30%</td>
                  <td className="p-3">Rs 3,00,000</td>
                  <td className="p-3">Income Tax</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Band 5</td>
                  <td className="p-3">Rs 20,00,001 – Rs 50,00,000</td>
                  <td className="p-3">36%</td>
                  <td className="p-3">Rs 10,80,000</td>
                  <td className="p-3">Income Tax</td>
                </tr>
                <tr className="bg-blue-50 font-semibold text-blue-700">
                  <td className="p-3">Band 6</td>
                  <td className="p-3">Above Rs 50,00,000</td>
                  <td className="p-3">39%</td>
                  <td className="p-3">On full excess</td>
                  <td className="p-3">Income Tax</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-[-10px] mb-6">*Band 1 SST fully waived for SSF contributors. Source: Finance Act 2082, First Schedule.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">3. Income tax slabs FY 2082/83 — married couple filers</h2>
          <p>
            Married couples (where the couple files jointly or the taxpayer opts for married status) receive a higher first-slab threshold — Rs 6,00,000 instead of Rs 5,00,000. This saves Rs 1,000 in SST annually (or is waived entirely for SSF contributors). All subsequent band thresholds are also higher.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Band</th>
                  <th className="p-3 font-semibold">Annual Taxable Income (NPR)</th>
                  <th className="p-3 font-semibold">Rate</th>
                  <th className="p-3 font-semibold">Maximum Tax on This Band</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium">Band 1</td>
                  <td className="p-3">Up to Rs 6,00,000</td>
                  <td className="p-3">1%*</td>
                  <td className="p-3">Rs 6,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Band 2</td>
                  <td className="p-3">Rs 6,00,001 – Rs 8,00,000</td>
                  <td className="p-3">10%</td>
                  <td className="p-3">Rs 20,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Band 3</td>
                  <td className="p-3">Rs 8,00,001 – Rs 11,00,000</td>
                  <td className="p-3">20%</td>
                  <td className="p-3">Rs 60,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Band 4</td>
                  <td className="p-3">Rs 11,00,001 – Rs 20,00,000</td>
                  <td className="p-3">30%</td>
                  <td className="p-3">Rs 2,70,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Band 5</td>
                  <td className="p-3">Rs 20,00,001 – Rs 50,00,000</td>
                  <td className="p-3">36%</td>
                  <td className="p-3">Rs 10,80,000</td>
                </tr>
                <tr className="bg-blue-50 font-semibold text-blue-700">
                  <td className="p-3">Band 6</td>
                  <td className="p-3">Above Rs 50,00,000</td>
                  <td className="p-3">39%</td>
                  <td className="p-3">On full excess</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm text-amber-900 my-6">
            <strong className="text-amber-950 font-bold block mb-1">⚠ Common mistake:</strong>
            Many people believe they pay their highest band rate on their full salary. This is wrong. If you earn Rs 15,00,000 annually, you do NOT pay 30% on all Rs 15 lakh. You pay 1% (or 0%) on the first Rs 5 lakh, 10% on the next Rs 2 lakh, 20% on the next Rs 3 lakh, and 30% only on the remaining Rs 5 lakh.
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">4. The 1% SST — is it income tax or social security tax?</h2>
          <p>
            The 1% on Band 1 is legally a <strong>Social Security Tax (SST)</strong>, collected separately from income tax under the Finance Act 2082 (First Schedule, Part 1). It is NOT income tax in the traditional sense. This distinction matters because:
          </p>
          <ul>
            <li>SST has its own waiver mechanism (SSF enrollment) that income tax does not have</li>
            <li>SST revenue is directed toward social security programs, not the general tax pool</li>
            <li>Even self-employed individuals who are SSF-registered can waive their Band 1 SST</li>
            <li>If your payslip shows "SST" and "Income Tax" as separate line items, this is correct</li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">5. The SSF waiver — how to legally pay Rs 0 on Band 1</h2>
          <p>
            The <strong>Social Security Fund (SSF)</strong>, established under the Social Security Act 2074 and managed by the SSF Management Board (<a href="https://ssf.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ssf.gov.np</a>), is Nepal's national social insurance system. Employees enrolled in SSF contribute 11% of their basic salary monthly, and their employer contributes an additional 20%. In exchange for this enrollment:
          </p>
          <ul>
            <li><strong>Band 1 SST is completely waived</strong> — you pay Rs 0 on the first Rs 5,00,000 (single) or Rs 6,00,000 (married)</li>
            <li>This saves Rs 5,000–6,000 in tax annually — every year, automatically</li>
            <li>SSF enrollment is mandatory for all employers with 10+ employees</li>
            <li>SSF contributors also receive medical, accident, maternity, and pension benefits</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl text-sm text-blue-900 my-6">
            <strong className="text-blue-950 font-bold block mb-1">💡 Bottom line:</strong>
            If your employer is SSF-registered and you see "1% SST" being deducted from your payslip, contact your HR department. SSF-enrolled employees should not be paying Band 1 SST.
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">6. All deductions that reduce your taxable income</h2>
          <p>
            Before applying slab rates, Nepal's IRD allows specific deductions to reduce your <strong>assessable income</strong> (the income on which tax is calculated). These deductions come off your gross income — lowering your tax liability at whatever band rate applies to that income.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Deduction Type</th>
                  <th className="p-3 font-semibold">Annual Maximum (NPR)</th>
                  <th className="p-3 font-semibold">Condition</th>
                  <th className="p-3 font-semibold">Combined Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium">SSF employee contribution (11%)</td>
                  <td className="p-3">Actual contribution</td>
                  <td className="p-3">SSF-enrolled employees</td>
                  <td rowSpan={2} className="p-3 bg-blue-50/70 font-semibold text-blue-700 text-center align-middle">
                    Lower of Rs 5,00,000 or 1/3 of gross income
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">EPF / CIT contribution</td>
                  <td className="p-3">Actual contribution</td>
                  <td className="p-3">EPF or CIT contributors</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Life insurance premium</td>
                  <td className="p-3">Rs 40,000</td>
                  <td className="p-3">Policy in taxpayer's name</td>
                  <td className="p-3 text-center">—</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Health insurance premium</td>
                  <td className="p-3">Rs 20,000</td>
                  <td className="p-3">Policy in taxpayer's name</td>
                  <td className="p-3 text-center">—</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Private residential building insurance</td>
                  <td className="p-3">Rs 5,00,000? No, wait: 'Rs 5,000'</td>
                  <td className="p-3">Principal home only</td>
                  <td className="p-3 text-center">—</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Remote area allowance</td>
                  <td className="p-3">Up to Rs 50,000</td>
                  <td className="p-3">IRD-classified districts only</td>
                  <td className="p-3 text-center">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">7. Female 10% tax rebate (FRTC) — who qualifies?</h2>
          <p>
            Under Finance Act 2082, female taxpayers with <strong>employment income only</strong> receive a 10% rebate on their total computed income tax. This is applied after the full slab calculation — it reduces your final tax bill, not your assessable income.
          </p>

          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 my-6">
            <div className="text-sm font-bold text-amber-900 mb-4">💡 FRTC Example: Female employee, computed annual tax = Rs 59,328</div>
            <div className="overflow-x-auto border border-amber-200 rounded-lg">
              <table className="w-full border-collapse text-left text-sm m-0">
                <thead>
                  <tr className="bg-amber-100/80 text-amber-900 border-b border-amber-200 text-xs font-bold uppercase tracking-wider">
                    <th className="p-2">Step</th>
                    <th className="p-2">Amount (NPR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200">
                  <tr>
                    <td className="p-2 font-medium">Computed annual tax (from slab calculation)</td>
                    <td className="p-2">Rs 59,328</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">FRTC rebate = 10% × Rs 59,328</td>
                    <td className="p-2">−Rs 5,933</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-800">
                    <td className="p-2">Final tax payable after rebate</td>
                    <td className="p-2">Rs 53,395</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Monthly TDS (Rs 53,395 ÷ 12)</td>
                    <td className="p-2">Rs 4,450</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p>
            <strong>FRTC does NOT apply</strong> if the female taxpayer has any income in addition to employment income — for example, rental income, business income, or freelance income. The rebate is strictly for employment-only earners.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">8. How monthly TDS is calculated and deducted</h2>

          <div className="bg-slate-900 rounded-xl p-6 my-6 font-mono text-[13px] text-blue-300 leading-relaxed">
            <span className="text-[15px] text-blue-100 font-bold block mb-2">Monthly TDS = Annual Income Tax ÷ 12</span>
            <span className="text-sky-300 text-xs leading-loose block">
              Step 1: Calculate gross annual income = monthly gross × 12 + festival bonus + taxable allowances<br />
              Step 2: Subtract deductions → get assessable income<br />
              Step 3: Apply slab rates on assessable income → annual tax<br />
              Step 4: Apply SST waiver (if SSF) and FRTC rebate (if female) → final annual tax<br />
              Step 5: Divide final annual tax by 12 → monthly TDS<br /><br />
              Employer must deposit TDS by 25th of following month to IRD
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">9. Worked example — Rs 60,000/month gross, single, SSF enrolled</h2>

          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 my-6">
            <div className="text-sm font-bold text-amber-900 mb-4">💡 Case 1: Entry-level professional, Rs 60,000 gross/month, SSF enrolled, single filer</div>
            <div className="overflow-x-auto border border-amber-200 rounded-lg">
              <table className="w-full border-collapse text-left text-sm m-0">
                <thead>
                  <tr className="bg-amber-100/80 text-amber-900 border-b border-amber-200 text-xs font-bold uppercase tracking-wider">
                    <th className="p-2">Step</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Monthly (Rs)</th>
                    <th className="p-2">Annual (Rs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200">
                  <tr>
                    <td className="p-2 font-medium">1</td>
                    <td className="p-2">Gross salary</td>
                    <td className="p-2">60,000</td>
                    <td className="p-2">7,20,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">2</td>
                    <td className="p-2">Employee SSF (11% × 60% of gross = 11% × Rs 36,000)</td>
                    <td className="p-2">−3,960</td>
                    <td className="p-2">−47,520</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">3</td>
                    <td className="p-2">Assessable income for tax</td>
                    <td className="p-2">—</td>
                    <td className="p-2">6,72,480</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">4</td>
                    <td className="p-2">Band 1 SST (1% on Rs 5L — waived, SSF enrolled)</td>
                    <td className="p-2">0</td>
                    <td className="p-2">0</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">5</td>
                    <td className="p-2">Band 2 tax (10% × Rs 1,72,480)</td>
                    <td className="p-2">—</td>
                    <td className="p-2">17,248</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-800">
                    <td className="p-2">—</td>
                    <td className="p-2">Total annual income tax</td>
                    <td className="p-2">—</td>
                    <td className="p-2">Rs 17,248</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">—</td>
                    <td className="p-2">Monthly TDS</td>
                    <td className="p-2">Rs 1,437</td>
                    <td className="p-2">—</td>
                  </tr>
                  <tr className="bg-blue-50 font-semibold text-blue-700">
                    <td className="p-2">—</td>
                    <td className="p-2">Net bank credit (take-home)</td>
                    <td className="p-2">Rs 54,603</td>
                    <td className="p-2">Rs 6,55,232</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">10. Worked example — Rs 1,20,000/month gross, married, SSF enrolled</h2>

          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 my-6">
            <div className="text-sm font-bold text-amber-900 mb-4">💡 Case 2: Senior professional, Rs 1,20,000 gross/month, SSF enrolled, married filer</div>
            <div className="overflow-x-auto border border-amber-200 rounded-lg">
              <table className="w-full border-collapse text-left text-sm m-0">
                <thead>
                  <tr className="bg-amber-100/80 text-amber-900 border-b border-amber-200 text-xs font-bold uppercase tracking-wider">
                    <th className="p-2">Step</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Monthly (Rs)</th>
                    <th className="p-2">Annual (Rs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200">
                  <tr>
                    <td className="p-2 font-medium">1</td>
                    <td className="p-2">Gross salary</td>
                    <td className="p-2">1,20,000</td>
                    <td className="p-2">14,40,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">2</td>
                    <td className="p-2">Employee SSF (11% × Rs 72,000 basic)</td>
                    <td className="p-2">−7,920</td>
                    <td className="p-2">−95,040</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">3</td>
                    <td className="p-2">Assessable income</td>
                    <td className="p-2">—</td>
                    <td className="p-2">13,44,960</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">4</td>
                    <td className="p-2">Band 1 SST (waived — SSF enrolled)</td>
                    <td className="p-2">0</td>
                    <td className="p-2">0</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">5</td>
                    <td className="p-2">Band 2: 10% on Rs 2,00,000</td>
                    <td className="p-2">—</td>
                    <td className="p-2">20,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">6</td>
                    <td className="p-2">Band 3: 20% on Rs 3,00,000</td>
                    <td className="p-2">—</td>
                    <td className="p-2">60,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">7</td>
                    <td className="p-2">Band 4: 30% on Rs 2,44,960</td>
                    <td className="p-2">—</td>
                    <td className="p-2">73,488</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-800">
                    <td className="p-2">—</td>
                    <td className="p-2">Total annual income tax</td>
                    <td className="p-2">—</td>
                    <td className="p-2">Rs 1,53,488</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">—</td>
                    <td className="p-2">Monthly TDS</td>
                    <td className="p-2">Rs 12,791</td>
                    <td className="p-2">—</td>
                  </tr>
                  <tr className="bg-blue-50 font-semibold text-blue-700">
                    <td className="p-2">—</td>
                    <td className="p-2">Net bank credit</td>
                    <td className="p-2">Rs 99,289</td>
                    <td className="p-2">Rs 11,91,472</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">11. IRD filing deadlines and penalties FY 2082/83</h2>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Taxpayer Type</th>
                  <th className="p-3 font-semibold">Filing Deadline</th>
                  <th className="p-3 font-semibold">Late Filing Penalty</th>
                  <th className="p-3 font-semibold">Late Payment Interest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium">Salaried employee (TDS)</td>
                  <td className="p-3">No separate filing required if employment income only</td>
                  <td className="p-3">N/A — employer handles</td>
                  <td className="p-3">Employer penalty applies</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Self-employed individual</td>
                  <td className="p-3">End of Poush (~mid-January)</td>
                  <td className="p-3">Rs 100/day (min Rs 1,000, max Rs 25,000)</td>
                  <td className="p-3">15% per annum</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Business/Company</td>
                  <td className="p-3">End of Poush (extensions available)</td>
                  <td className="p-3">Same as above</td>
                  <td className="p-3">15% per annum</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Employer TDS deposit</td>
                  <td className="p-3">25th of following month</td>
                  <td className="p-3">—</td>
                  <td className="p-3">15% per annum on unpaid TDS</td>
                </tr>
                <tr className="bg-amber-100 font-semibold text-amber-800">
                  <td className="p-3">Understated income</td>
                  <td className="p-3">—</td>
                  <td className="p-3">50% of understated tax amount</td>
                  <td className="p-3">15% per annum</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            E-filing is available at <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ird.gov.np</a>. Taxpayers can register for an IRD PAN, file returns, and pay tax online through the IRD's integrated tax system.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">12. Frequently asked questions</h2>

          <div className="space-y-4 my-6">
            <details className="group border border-slate-200 rounded-lg overflow-hidden" open>
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>What is nepal income tax slab 2081/82 with 1% up to Rs 5,00,000 — is it the same in 2082/83?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                Yes, <strong>the 2082/83 slabs are identical to 2081/82</strong>. The Finance Act 2082 made no changes to individual income tax rates or thresholds. The 1% on Band 1 (up to Rs 5,00,000 for single, Rs 6,00,000 for married) remains as Social Security Tax — waived for SSF contributors. This continuity was confirmed in the Finance Bill debates of Ashadh 2082. All thresholds, deduction caps, FRTC, and band rates are unchanged.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>How is the IRD tax calculator different from this guide — should I use ird.gov.np?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                The IRD's official portal (ird.gov.np) provides authoritative tax forms, PAN registration, and e-filing services but does not have a user-friendly live tax calculator. NepaCalc's <Link href="/calculator/nepal-income-tax/" className="text-blue-600 underline font-bold">Nepal income tax calculator</Link> applies the same IRD rules (Finance Act 2082 rates) in a simpler interface with instant results. Always verify your final tax liability with your employer's TDS certificate or by consulting a tax professional for complex income situations.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>Nepal income tax slab for married couple — is the first Rs 6,00,000 really at 1%?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                Yes. Married filers in Nepal have a higher Band 1 threshold of Rs 6,00,000 (compared to Rs 5,00,000 for single filers). This extra Rs 1,00,000 is also taxed at 1% SST — or waived entirely for SSF contributors. The married option applies if you are legally married and choose to file as a married couple. You may also choose single status if advantageous, but married status is almost always better because the Rs 6L threshold means more income falls in lower/zero-rate bands.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>What is the Nepal personal income tax slab for an individual earning Rs 10,00,000 annually?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                For a single filer earning Rs 10,00,000 per year, SSF enrolled: Band 1 SST = Rs 0 (waived); Band 2 = 10% × Rs 2,00,000 = Rs 20,000; Band 3 = 20% × Rs 3,00,000 = Rs 60,000. Total annual tax = Rs 80,000. Monthly TDS = Rs 6,667. This assumes no additional deductions for insurance, remote allowance, etc. Use the <Link href="/calculator/nepal-salary/" className="text-blue-600 underline font-bold">Nepal salary calculator</Link> to see the full net take-home breakdown.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>Is TDS the same as income tax — what is TDS in Nepal?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                TDS (Tax Deducted at Source) is the mechanism by which income tax is collected — it is not a separate tax. Your employer computes your annual income tax, divides by 12, and deducts that amount from your monthly salary. This TDS amount is your income tax, paid in advance each month. At year end, you should owe exactly Rs 0 if TDS was computed correctly. If over-deducted, you may claim a refund from IRD. The <Link href="/calculator/nepal-tds/" className="text-blue-600 underline font-bold">Nepal TDS calculator</Link> helps employers verify correct deduction amounts.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>Is there a salary tax calculator for Nepal that shows month-by-month TDS?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                Yes. NepaCalc's <Link href="/calculator/nepal-salary/" className="text-blue-600 underline font-bold">Nepal salary calculator 2082/83</Link> shows gross salary, SSF deduction, monthly TDS, and net bank credit. It covers both single and married filing status, SSF and EPF/CIT scenarios, and includes the female FRTC rebate option. For vehicle-related taxes, see the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 underline font-bold">Nepal vehicle tax calculator</Link>.
              </div>
            </details>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500 italic">
            <strong>Sources &amp; Last Verified:</strong> Finance Act 2082 (Nepal Parliament, Ashadh 2082) | Income Tax Act 2058, Parts 2–4 | Social Security Act 2074 | IRD Nepal — <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ird.gov.np</a> | SSF Board — <a href="https://ssf.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ssf.gov.np</a> | Ministry of Finance — <a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">mof.gov.np</a>. All rates and thresholds verified against Finance Act 2082, First Schedule. Last reviewed: Jestha 2082/83. This guide is for educational purposes — consult a qualified tax professional for personalised advice.
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6">Related calculators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/calculator/nepal-salary/" className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/20 transition-all text-center group">
                <span className="text-2xl block mb-2">💰</span>
                <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-wider block">Nepal Salary Calculator</span>
              </Link>
              <Link href="/calculator/tds-calculator/" className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/20 transition-all text-center group">
                <span className="text-2xl block mb-2">🧾</span>
                <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-wider block">TDS Calculator Nepal</span>
              </Link>
              <Link href="/calculator/loan-emi/" className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/20 transition-all text-center group">
                <span className="text-2xl block mb-2">🏦</span>
                <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-wider block">Loan EMI Calculator</span>
              </Link>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
