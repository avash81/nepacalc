import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: "Nepal Income Tax Slab 2083/84 — New IRD Rates & Changes",
  description: "Nepal income tax slab 2083/84: 1% up to Rs. 10 lakh, top rate 29%. Full 2082/83 comparison, key budget changes, SSF exemption and deductions explained.",
  slug: 'income-tax/nepal-income-tax-slab-2083-84',
  canonical: '/income-tax/nepal-income-tax-slab-2083-84/',
  keywords: [
    "nepal income tax slab 2083/84",
    "new tax slab nepal 2083 84",
    "income tax slab 2083/84",
    "tax slab nepal 2082/83",
    "income tax rate nepal 2083/84",
    "finance act 2083"
  ],
  ogImage: 'https://nepacalc.com/images/nepal-income-tax-slab-2083-84.webp'
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Income Tax", "item": "https://nepacalc.com/income-tax/" },
      { "@type": "ListItem", "position": 3, "name": "Nepal Income Tax Slab 2083/84", "item": "https://nepacalc.com/income-tax/nepal-income-tax-slab-2083-84/" }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/income-tax/nepal-income-tax-slab-2083-84/",
    "url": "https://nepacalc.com/income-tax/nepal-income-tax-slab-2083-84/",
    "name": "Nepal Income Tax Slab 2083/84 — New IRD Rates & Changes",
    "description": "Complete guide to Nepal income tax slab 2083/84. New 5-band unified structure, doubled 1% threshold to Rs. 10 lakh, top rate 29%, comparison with 2082/83.",
    "inLanguage": "en-NP",
    "datePublished": "2026-06-15",
    "dateModified": "2026-07-01",
    "isPartOf": { "@type": "WebSite", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".quick-answer", ".slab-table", ".key-changes", ".faq-section"]
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Nepal Income Tax Slab 2083/84 — New IRD Rates & Changes",
    "description": "Complete guide to Nepal income tax slab 2083/84 under Finance Act 2083. New unified 5-band structure, doubled threshold, 29% top rate, 2082/83 comparison.",
    "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": { "@type": "Organization", "name": "NepaCalc", "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" } },
    "datePublished": "2026-06-15",
    "dateModified": "2026-07-01",
    "mainEntityOfPage": "https://nepacalc.com/income-tax/nepal-income-tax-slab-2083-84/",
    "keywords": ["nepal income tax slab 2083/84", "new tax slab nepal 2083 84", "income tax slab 2083/84", "tax slab nepal 2082/83", "income tax rate nepal 2083/84", "finance act 2083"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the new tax slab Nepal 2083/84?",
        "acceptedAnswer": { "@type": "Answer", "text": "The new tax slab Nepal 2083/84 has five unified bands under Finance Act 2083: 1% up to Rs. 10 lakh, 10% on Rs. 10–15 lakh, 20% on Rs. 15–25 lakh, 27% on Rs. 25–40 lakh, and 29% above Rs. 40 lakh. The Finance Act 2083 eliminated separate single and married couple classifications." }
      },
      {
        "@type": "Question",
        "name": "When does the new income tax slab 2083/84 take effect?",
        "acceptedAnswer": { "@type": "Answer", "text": "The new income tax slab 2083/84 takes effect from Shrawan 1, 2083 (mid-July 2026), the start of Nepal's new fiscal year. Salary TDS at the new rates begins from the first payroll in Shrawan 2083." }
      },
      {
        "@type": "Question",
        "name": "What is the income tax slab in Nepal 2082/83?",
        "acceptedAnswer": { "@type": "Answer", "text": "For FY 2082/83, Nepal's income tax slab for single individuals had six bands: 1% up to Rs. 5 lakh, 10% on Rs. 5–7 lakh, 20% on Rs. 7–10 lakh, 30% on Rs. 10–20 lakh, 36% on Rs. 20–50 lakh, and 39% above Rs. 50 lakh. Married couples had a Rs. 6 lakh first-band threshold." }
      },
      {
        "@type": "Question",
        "name": "Is the new income tax slab applicable to married couples in Nepal 2083/84?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Under Finance Act 2083, the separate married couple slab has been eliminated. Both married and unmarried individuals use the same unified 5-slab structure for FY 2083/84. There is no longer a separate married couple income tax threshold in Nepal." }
      },
      {
        "@type": "Question",
        "name": "What is the salary slab rate for FY 2081/82 in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "For FY 2081/82, Nepal's income tax for single individuals was: 1% up to Rs. 5 lakh, 10% on Rs. 5–7 lakh, 20% on Rs. 7–10 lakh, 30% on Rs. 10–20 lakh, 36% on Rs. 20–50 lakh, and 39% above Rs. 50 lakh. Married couples had a Rs. 6 lakh first-band threshold. These rates matched FY 2082/83." }
      },
      {
        "@type": "Question",
        "name": "Is income up to Rs. 10 lakh tax-free in Nepal 2083/84?",
        "acceptedAnswer": { "@type": "Answer", "text": "Income up to Rs. 10 lakh is taxed at 1% (maximum Rs. 10,000) in Nepal 2083/84. SSF contributors are fully exempt from this 1% tax, making the effective rate 0% for Social Security Fund members on the first Rs. 10 lakh." }
      },
      {
        "@type": "Question",
        "name": "What is the income tax rate in Nepal 2080/81?",
        "acceptedAnswer": { "@type": "Answer", "text": "For FY 2080/81, Nepal income tax for single individuals had six bands with 1% up to Rs. 4 lakh and a top rate of 36% above Rs. 20 lakh. The 1% threshold was lower and top rate higher than the current FY 2083/84 rates of Rs. 10 lakh and 29%." }
      }
    ]
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Nepal Income Tax Slabs FY 2083/84 — Comparison with 2082/83 and 2080/81",
    "description": "Progressive income tax slabs for Nepal covering fiscal years 2083/84, 2082/83, and 2080/81 for resident individuals under the Inland Revenue Department (IRD).",
    "creator": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": { "@type": "Organization", "name": "Inland Revenue Department Nepal" },
    "dateModified": "2026-07-01",
    "temporalCoverage": "2023/2027",
    "spatialCoverage": "Nepal"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <div className="bg-[#F1F3F4] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex text-sm text-slate-500 space-x-2">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><span className="mx-2">&gt;</span></li>
              <li><Link href="/income-tax/" className="hover:text-blue-600">Income Tax</Link></li>
              <li><span className="mx-2">&gt;</span></li>
              <li className="text-slate-700 font-semibold" aria-current="page">Nepal Income Tax Slab 2083/84</li>
            </ol>
          </nav>

          <main className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
            
            <h1 className="text-3xl font-black text-slate-900 mb-6">Nepal Income Tax Slab 2083/84 — Complete Guide</h1>

            <div className="bg-slate-50 border-l-4 border-blue-600 p-4 mb-6 not-prose">
              <p className="text-sm text-slate-700 m-0">📅 <strong>Last Updated:</strong> Jestha 2083 (June 2026) — Finance Act 2083</p>
              <p className="text-sm text-slate-700 m-0">✍️ <strong>Reviewed by:</strong> NepaCalc Research Team</p>
              <p className="text-sm text-slate-700 m-0">📍 <strong>Applies to:</strong> All resident individuals in Nepal</p>
            </div>

            <p>Nepal's FY 2083/84 budget introduced the most significant income tax reform in Nepal in years. The new income tax slab 2083/84 doubles the 1% threshold to Rs. 10 lakh and cuts the peak marginal rate from 39% to 29%. This guide covers every change, the full new slab table, the old 2082/83 slab for comparison, and all eligible deductions under Finance Act 2083.</p>
            <p>To calculate your exact tax using these slabs, use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline font-bold">Income Tax Calculator Nepal</Link>.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Nepal Income Tax Slab 2083/84 — Quick Answer</h2>
            
            <div className="quick-answer space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the new income tax slab in Nepal 2083/84?</h3>
                <p>Nepal income tax slab 2083/84 has five progressive bands for all resident individuals: 1% up to Rs. 10 lakh, 10% on Rs. 10–15 lakh, 20% on Rs. 15–25 lakh, 27% on Rs. 25–40 lakh, and 29% above Rs. 40 lakh. This unified structure applies equally to all resident taxpayers regardless of marital status under Finance Act 2083.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the new income tax slab rate in Nepal?</h3>
                <p>The new income tax slab rate in Nepal for FY 2083/84 starts at 1% (Social Security Tax) on income up to Rs. 10 lakh. If you contribute to the Social Security Fund (SSF), this first slab is waived entirely at 0%. The maximum marginal rate is now 29% on income above Rs. 40 lakh, reduced from 39% in FY 2082/83.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Is Rs. 10 lakh tax-free in Nepal 2083/84?</h3>
                <p>Income up to Rs. 10 lakh in Nepal 2083/84 is not completely tax-free. The 1% Social Security Tax applies, meaning a maximum tax of Rs. 10,000 on the first Rs. 10 lakh. However, SSF contributors are fully exempt from this 1% tax — making the effective rate 0% for Social Security Fund members on the first Rs. 10 lakh.</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">New Income Tax Slabs FY 2083/84 — Finance Act 2083</h2>
            <p>The Finance Act 2083 replaced Nepal's previous 6-slab structure with a simplified 5-slab progressive system. Budget announced by Finance Minister Dr. Swarnim Wagle on Jestha 15, 2083 (May 29, 2026). Effective from Shrawan 1, 2083 (mid-July 2026).</p>

            <div className="overflow-x-auto mb-4 not-prose slab-table">
              <table className="min-w-full bg-white border border-slate-200">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left font-bold">Annual Taxable Income (NPR)</th>
                    <th className="py-3 px-4 text-left font-bold">Tax Rate</th>
                    <th className="py-3 px-4 text-left font-bold">Maximum Tax in Band</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-2 px-4 border-b">Up to Rs. 10,00,000</td><td className="py-2 px-4 border-b font-semibold text-green-700">1% — Social Security Tax</td><td className="py-2 px-4 border-b">Rs. 10,000</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 10,00,001 to Rs. 15,00,000</td><td className="py-2 px-4 border-b font-semibold">10%</td><td className="py-2 px-4 border-b">Rs. 50,000</td></tr>
                  <tr><td className="py-2 px-4 border-b">Rs. 15,00,001 to Rs. 25,00,000</td><td className="py-2 px-4 border-b font-semibold">20%</td><td className="py-2 px-4 border-b">Rs. 2,00,000</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 25,00,001 to Rs. 40,00,000</td><td className="py-2 px-4 border-b font-semibold">27%</td><td className="py-2 px-4 border-b">Rs. 4,05,000</td></tr>
                  <tr><td className="py-2 px-4 border-b">Above Rs. 40,00,000</td><td className="py-2 px-4 border-b font-semibold text-red-600">29%</td><td className="py-2 px-4 border-b">Progressive</td></tr>
                </tbody>
              </table>
              <p className="text-sm font-semibold text-slate-700 mt-2">Maximum cumulative tax at Rs. 40 lakh: Rs. 6,65,000</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg text-sm mb-6">
              <p className="font-bold mb-2">Notes on this table:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>SSF:</strong> The 1% rate on Band 1 is waived for Social Security Fund contributors. Effective rate becomes 0%.</li>
                <li><strong>Female rebate:</strong> After calculating total tax across all bands, female employees with only salary income reduce total by 10%.</li>
                <li><strong>Non-residents:</strong> Not covered by this slab. Non-residents pay a flat 25% on Nepal-source income.</li>
                <li><strong>Effective date:</strong> Shrawan 1, 2083 (mid-July 2026), subject to Finance Act 2083 gazette publication.</li>
              </ul>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4 key-changes">Key Changes in Nepal Income Tax Slab 2083/84</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Change 1 — 1% Threshold Doubled</h3>
                <p>The most significant change in the new tax slab Nepal 2083/84 is the doubling of the 1% Social Security Tax threshold. Under FY 2082/83, single filers paid 1% only on income up to Rs. 5 lakh, and married filers up to Rs. 6 lakh. The Finance Act 2083 raises this to Rs. 10 lakh for all individuals, saving up to Rs. 5,000–10,000 per year depending on previous filing status. This change benefits middle-income salaried employees most directly.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Change 2 — Top Marginal Rate Cut from 39% to 29%</h3>
                <p>Nepal's peak income tax rate has been cut by 10 percentage points from 39% to 29% under Finance Act 2083. This is the first time Nepal's top marginal rate has been reduced in over a decade. The change applies to income above Rs. 40 lakh annually. High-income earners, senior executives, and business owners see the largest absolute tax saving from this change.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Change 3 — Single and Married Slabs Unified</h3>
                <p>Previously, Nepal had separate income tax slab structures for single individuals and married couples with different first-band thresholds. The FY 2083/84 tax slab Nepal reform eliminates this distinction entirely. All resident individuals now follow one unified slab regardless of marital status. This simplifies payroll processing and removes the need for marital status declarations in tax calculations.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Change 4 — Number of Slabs Reduced from 6 to 5</h3>
                <p>The six-band structure of previous years has been reduced to five bands under the new tax slab Nepal 2083/84. The compression primarily occurs at the upper end where the 36% and 39% bands have been merged and replaced with a single 29% rate above Rs. 40 lakh.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">SSF Exemption — Unchanged but More Valuable</h3>
                <p>The Social Security Fund exemption on the first slab remains in place for FY 2083/84. Since the first band has now doubled to Rs. 10 lakh, the maximum SSF tax saving has also doubled from Rs. 5,000 (old threshold × 1%) to Rs. 10,000 (new Rs. 10 lakh threshold × 1%).</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Nepal Income Tax Slab Comparison — 2083/84 vs 2082/83 vs 2080/81</h2>
            <p>This is the most-searched comparison in Nepal income tax queries. The table covers three fiscal years for full retroactive reference.</p>

            <div className="overflow-x-auto mb-6 not-prose">
              <table className="min-w-full bg-white border border-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">Feature</th>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">FY 2080/81</th>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">FY 2082/83</th>
                    <th className="py-2 px-3 border-b text-left font-bold text-green-700">FY 2083/84</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-1.5 px-3 border-b">Number of slabs</td><td className="py-1.5 px-3 border-b">6</td><td className="py-1.5 px-3 border-b">6</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">5</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">1% band (single)</td><td className="py-1.5 px-3 border-b">Up to Rs. 4 lakh</td><td className="py-1.5 px-3 border-b">Up to Rs. 5 lakh</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Up to Rs. 10 lakh</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">1% band (married)</td><td className="py-1.5 px-3 border-b">Up to Rs. 4.5 lakh</td><td className="py-1.5 px-3 border-b">Up to Rs. 6 lakh</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Rs. 10 lakh (all)</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">10% band</td><td className="py-1.5 px-3 border-b">Rs. 4–7 lakh</td><td className="py-1.5 px-3 border-b">Rs. 5–7 lakh</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Rs. 10–15 lakh</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">20% band</td><td className="py-1.5 px-3 border-b">Rs. 7–10 lakh</td><td className="py-1.5 px-3 border-b">Rs. 7–10 lakh</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Rs. 15–25 lakh</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">30% band</td><td className="py-1.5 px-3 border-b">Rs. 10–20 lakh</td><td className="py-1.5 px-3 border-b">Rs. 10–20 lakh</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Removed</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">27% band</td><td className="py-1.5 px-3 border-b">Did not exist</td><td className="py-1.5 px-3 border-b">Did not exist</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Rs. 25–40 lakh</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">36% band</td><td className="py-1.5 px-3 border-b">Rs. 20–50 lakh</td><td className="py-1.5 px-3 border-b">Rs. 20–50 lakh</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Removed</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">39% band</td><td className="py-1.5 px-3 border-b">Above Rs. 50 lakh</td><td className="py-1.5 px-3 border-b">Above Rs. 50 lakh</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Removed</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">29% band</td><td className="py-1.5 px-3 border-b">Did not exist</td><td className="py-1.5 px-3 border-b">Did not exist</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Above Rs. 40 lakh</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">Top marginal rate</td><td className="py-1.5 px-3 border-b">36%</td><td className="py-1.5 px-3 border-b">39%</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">29%</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Single/couple distinction</td><td className="py-1.5 px-3 border-b">Yes</td><td className="py-1.5 px-3 border-b">Yes</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">No — unified</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">SSF first-band exemption</td><td className="py-1.5 px-3 border-b">Yes</td><td className="py-1.5 px-3 border-b">Yes</td><td className="py-1.5 px-3 border-b">Yes (now Rs. 10 lakh)</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Female 10% rebate</td><td className="py-1.5 px-3 border-b">Yes</td><td className="py-1.5 px-3 border-b">Yes</td><td className="py-1.5 px-3 border-b">Yes</td></tr>
                </tbody>
              </table>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">FY 2082/83 Full Slab Table (For Retroactive Reference)</h2>
            <p>If you are calculating income tax for the period before Shrawan 1, 2083, use the salary tax calculator Nepal 2082/83 structure below.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6 not-prose">
              <div>
                <p className="font-bold text-slate-800 mb-2 text-sm">FY 2082/83 — Single Individual</p>
                <table className="min-w-full bg-white border border-slate-200 text-sm">
                  <thead className="bg-slate-50"><tr><th className="py-2 px-3 border-b text-left">Annual Taxable Income (NPR)</th><th className="py-2 px-3 border-b text-left">Tax Rate</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1.5 px-3 border-b">Up to Rs. 5,00,000</td><td className="py-1.5 px-3 border-b">1%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Rs. 5,00,001 to Rs. 7,00,000</td><td className="py-1.5 px-3 border-b">10%</td></tr>
                    <tr><td className="py-1.5 px-3 border-b">Rs. 7,00,001 to Rs. 10,00,000</td><td className="py-1.5 px-3 border-b">20%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Rs. 10,00,001 to Rs. 20,00,000</td><td className="py-1.5 px-3 border-b">30%</td></tr>
                    <tr><td className="py-1.5 px-3 border-b">Rs. 20,00,001 to Rs. 50,00,000</td><td className="py-1.5 px-3 border-b">36%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Above Rs. 50,00,000</td><td className="py-1.5 px-3 border-b">39%</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="font-bold text-slate-800 mb-2 text-sm">FY 2082/83 — Married Couple</p>
                <table className="min-w-full bg-white border border-slate-200 text-sm">
                  <thead className="bg-slate-50"><tr><th className="py-2 px-3 border-b text-left">Annual Taxable Income (NPR)</th><th className="py-2 px-3 border-b text-left">Tax Rate</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1.5 px-3 border-b">Up to Rs. 6,00,000</td><td className="py-1.5 px-3 border-b">1%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Rs. 6,00,001 to Rs. 8,00,000</td><td className="py-1.5 px-3 border-b">10%</td></tr>
                    <tr><td className="py-1.5 px-3 border-b">Rs. 8,00,001 to Rs. 11,00,000</td><td className="py-1.5 px-3 border-b">20%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Rs. 11,00,001 to Rs. 21,00,000</td><td className="py-1.5 px-3 border-b">30%</td></tr>
                    <tr><td className="py-1.5 px-3 border-b">Rs. 21,00,001 to Rs. 51,00,000</td><td className="py-1.5 px-3 border-b">36%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Above Rs. 51,00,000</td><td className="py-1.5 px-3 border-b">39%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>Use the <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link> which supports both FY 2082/83 and FY 2083/84 structures for retroactive calculations.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Allowable Deductions — Finance Act 2083</h2>
            <p>Before applying the income tax slab 2083/84 rates, taxpayers must subtract eligible deductions from gross income to find their Net Assessable Income.</p>

            <div className="overflow-x-auto mb-4 not-prose">
              <table className="min-w-full bg-white border border-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">Deduction Type</th>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">Annual Maximum</th>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">Applicable to</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-1.5 px-3 border-b">SSF + EPF + CIT combined</td><td className="py-1.5 px-3 border-b">Lower of Rs. 5,00,000 or 1/3 of gross</td><td className="py-1.5 px-3 border-b">All residents</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Life insurance premium</td><td className="py-1.5 px-3 border-b">Rs. 40,000</td><td className="py-1.5 px-3 border-b">All residents</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">Health/medical insurance</td><td className="py-1.5 px-3 border-b">Rs. 20,000</td><td className="py-1.5 px-3 border-b">All residents</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Female tax rebate</td><td className="py-1.5 px-3 border-b">10% of total tax</td><td className="py-1.5 px-3 border-b">Female employees (salary only)</td></tr>
                </tbody>
              </table>
            </div>

            <p>How to apply deductions: Deductions are subtracted from gross income before slab calculation. The female rebate is different — it is applied after the full slab calculation by reducing total tax by 10%.</p>
            <p>For SSF deduction: The amount contributed to SSF also eliminates the 1% first-slab tax obligation entirely, providing a dual benefit — deduction from gross income plus elimination of the Band 1 tax.</p>
            <p>To plan EPF and CIT contributions alongside salary tax, use the <Link href="/calculator/nepal-provident-fund/" className="text-blue-600 hover:underline font-bold">Nepal Provident Fund Calculator</Link> and the <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link>.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">How Tax Saving Changed Between 2082/83 and 2083/84</h2>
            <p>For a single individual earning Rs. 15 lakh annually with no deductions:</p>

            <div className="bg-slate-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold mb-2">FY 2082/83 tax:</h3>
              <ul className="list-disc pl-5 mb-4 text-sm">
                <li>Rs. 5,00,000 × 1% = Rs. 5,000</li>
                <li>Rs. 2,00,000 × 10% = Rs. 20,000</li>
                <li>Rs. 3,00,000 × 20% = Rs. 60,000</li>
                <li>Rs. 5,00,000 × 30% = Rs. 1,50,000</li>
                <li><strong>Total: Rs. 2,35,000/year</strong></li>
              </ul>
              
              <h3 className="font-bold mb-2">FY 2083/84 tax (same Rs. 15 lakh, same person):</h3>
              <ul className="list-disc pl-5 mb-4 text-sm">
                <li>Rs. 10,00,000 × 1% = Rs. 10,000</li>
                <li>Rs. 5,00,000 × 10% = Rs. 50,000</li>
                <li><strong>Total: Rs. 60,000/year</strong></li>
              </ul>

              <p className="font-bold text-green-700">Annual saving: Rs. 1,75,000 — a reduction of 74.5% in tax liability for this income level.</p>
            </div>

            <p>This dramatic saving is why the Finance Act 2083 is described as the most significant personal income tax reform in Nepal's recent history.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4 faq-section">Nepal Income Tax Slab 2083/84 — FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the new tax slab Nepal 2083 84?</h3>
                <p>The new tax slab Nepal 2083/84 has five unified bands: 1% up to Rs. 10 lakh, 10% on Rs. 10–15 lakh, 20% on Rs. 15–25 lakh, 27% on Rs. 25–40 lakh, and 29% above Rs. 40 lakh. The Finance Act 2083, announced on Jestha 15, 2083, eliminated the separate single and married couple classifications. All resident individuals now use one structure.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">When does the new tax slab nepal 2083 84 take effect?</h3>
                <p>The new income tax slab 2083/84 takes effect from Shrawan 1, 2083 (mid-July 2026) — the start of the new Nepalese fiscal year. Salary TDS deductions at the new rates begin from the first payroll in Shrawan 2083. The new slab structure is effective for the entire FY 2083/84 (2026/27).</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the income tax slab in Nepal 2082/83 for comparison?</h3>
                <p>For FY 2082/83, Nepal's income tax slab for single individuals had six bands: 1% up to Rs. 5 lakh, 10% on Rs. 5–7 lakh, 20% on Rs. 7–10 lakh, 30% on Rs. 10–20 lakh, 36% on Rs. 20–50 lakh, and 39% above Rs. 50 lakh. Married couples had a slightly higher first-band threshold of Rs. 6 lakh.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Is the new income tax slab applicable to married couples in Nepal 2083/84?</h3>
                <p>Yes. Under the Finance Act 2083, the separate married couple slab has been eliminated. Both married and unmarried individuals use the same unified 5-slab structure for FY 2083/84. There is no longer a separate married couple threshold or tax band in Nepal's personal income tax system.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the salary slab rate for FY 2081/82 in Nepal?</h3>
                <p>For FY 2081/82, Nepal's income tax for single individuals followed: 1% up to Rs. 5 lakh, 10% on Rs. 5–7 lakh, 20% on Rs. 7–10 lakh, 30% on Rs. 10–20 lakh, 36% on Rs. 20–50 lakh, and 39% above Rs. 50 lakh. The married couple threshold was Rs. 6 lakh for the 1% band. These rates were the same structure as FY 2082/83.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Can I get a Nepal income tax slab 2083 84 PDF?</h3>
                <p>The official Nepal income tax slab 2083/84 PDF is published by the Inland Revenue Department (IRD) at <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a> and the Finance Ministry. You can also refer to the ICAN Nepal Budget Highlights document for the official Finance Act 2083 slab table. This page provides the same verified slab data in a browser-readable format.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the income tax rate in Nepal 2080/81?</h3>
                <p>For FY 2080/81, Nepal's income tax for single individuals had six bands with 1% up to Rs. 4 lakh and a top rate of 36% above Rs. 20 lakh. The 1% threshold was lower and the top rate higher than the current FY 2083/84 rates. For retroactive calculations, use the <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link>.</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Related Nepal Tax Tools</h2>
            <ul className="list-none pl-0 space-y-2 mb-6">
              <li>👉 <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline font-bold">Income Tax Calculator Nepal</Link> — Calculate your exact annual and monthly tax using these slabs instantly</li>
              <li>👉 <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link> — Full salary breakdown with SSF, EPF, CIT, bonuses and multi-year support</li>
              <li>👉 <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline font-bold">TDS Calculator Nepal</Link> — Monthly TDS on salary and contractor payments</li>
              <li>👉 <Link href="/calculator/nepal-provident-fund/" className="text-blue-600 hover:underline font-bold">Nepal Provident Fund Calculator</Link> — EPF and SSF contribution planning</li>
              <li>👉 <Link href="/income-tax/how-to-calculate-income-tax-nepal/" className="text-blue-600 hover:underline font-bold">How to Calculate Income Tax in Nepal</Link> — Complete step-by-step calculation guide</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Data Sources and Official References</h2>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Inland Revenue Department (IRD) Nepal — <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a></li>
              <li>Finance Act 2083 — Budget FY 2083/84</li>
              <li>Budget Speech: Finance Minister Dr. Swarnim Wagle, Jestha 15, 2083 (May 29, 2026)</li>
              <li>Income Tax Act 2058 BS as amended through 2083</li>
              <li>ICAN Nepal Budget Highlights FY 2083/84</li>
            </ul>
            <p className="text-sm">Last Updated: Jestha 2083 (June 2026)</p>
            <p className="text-sm">These slabs reflect the Finance Act 2083 as announced in the budget speech. Gazette-published final rates should be verified at <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a> before formal filing.</p>

            <div className="sr-only" aria-hidden="true">
              Nepal Income Tax Slab 2083/84. New Tax Slab Nepal 2083 84.
              Income Tax Slab 2083/84. Tax Slab Nepal 2083 84.
              Nepal Income Tax Slab 2082/83. Tax Slab In Nepal 2082/83.
              New Income Tax Slab Nepal. Income Tax Rate Nepal 2083/84.
              Finance Act 2083. Budget 2083/84 Nepal. Inland Revenue Department Nepal.
              Income Tax Act 2058. IRD Nepal. FY 2083/84. FY 2026/27.
              Salary Tax Slab Nepal. SSF Exemption Nepal. Female Tax Rebate Nepal.
              Married Couple Tax Nepal. Single Individual Tax Nepal.
              Income Tax Rate Nepal 2080/81. Salary Slab Rate FY 2081/82.
              Net Assessable Income Nepal. Progressive Tax Nepal.
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
