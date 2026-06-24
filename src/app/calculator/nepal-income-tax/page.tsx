import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Income Tax Calculator Nepal (2083/84) — IRD Slabs",
  description: "Calculate Nepal income tax for FY 2083/84 using the latest IRD slabs. Includes SSF, EPF, CIT, insurance deductions, female rebate and net take-home pay.",
  slug: 'nepal-income-tax',
  keywords: [
    "Income Tax Calculator Nepal",
    "IRD Tax Calculator Nepal",
    "Nepal Income Tax Calculator 2083/84",
    "Income Tax Slab Nepal 2083/84",
    "Salary Tax Calculator Nepal",
    "Nepal Income Tax 2083/84",
    "IRD Calculator Nepal",
    "TDS Calculator Nepal Salary",
    "SSF Nepal Income Tax",
    "Nepal Income Tax Slab 2082/83",
  ],
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculator/" },
      { "@type": "ListItem", "position": 3, "name": "Income Tax Calculator Nepal", "item": "https://nepacalc.com/calculator/nepal-income-tax/" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Income Tax Calculator Nepal",
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Calculate Nepal income tax for FY 2083/84 using official IRD slabs with SSF, EPF, CIT and insurance deductions.",
    "offers": { "@type": "Offer", "price": "0" }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/calculator/nepal-income-tax/",
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "name": "Income Tax Calculator Nepal (2083/84)",
    "description": "Calculate Nepal income tax for FY 2083/84 using official IRD slabs.",
    "inLanguage": "en-NP",
    "dateModified": "2026-07-01",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".quick-answer", ".tax-slab-table", ".income-tax-summary"]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the income tax slab for Nepal 2083/84?", "acceptedAnswer": { "@type": "Answer", "text": "Nepal's income tax slab for FY 2083/84 has five bands for all resident individuals: 1% up to Rs. 10 lakh, 10% on Rs. 10\u201315 lakh, 20% on Rs. 15\u201325 lakh, 27% on Rs. 25\u201340 lakh, and 29% above Rs. 40 lakh. The Finance Act 2083 eliminated separate slabs for single and married individuals." } },
      { "@type": "Question", "name": "Is income up to Rs. 10 lakh tax-free in Nepal 2083/84?", "acceptedAnswer": { "@type": "Answer", "text": "Income up to Rs. 10 lakh is not completely tax-free in Nepal 2083/84. It is taxed at 1% as the Social Security Tax. However, SSF contributors are fully exempt from this 1% tax, effectively making the first Rs. 10 lakh tax-free for Social Security Fund members." } },
      { "@type": "Question", "name": "What is the IRD tax calculator for Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "The IRD (Inland Revenue Department) tax calculator for Nepal applies the official progressive tax slabs to your net assessable income after deductions. The NepaCalc Income Tax Calculator Nepal follows official IRD slabs for FY 2083/84 and supports SSF exemption, EPF deductions, insurance deductions, and the female employee rebate." } },
      { "@type": "Question", "name": "How much income tax do I pay on Rs. 50,000 monthly salary in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "On a Rs. 50,000 monthly salary (Rs. 6 lakh/year) with no deductions, you pay Rs. 6,000 per year or Rs. 500 per month at the 1% slab rate. If you contribute to SSF, this becomes Rs. 0 as the first slab is waived entirely for SSF members." } },
      { "@type": "Question", "name": "What is the female tax rebate in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Female employees in Nepal who earn income only from employment receive a 10% rebate on their total calculated income tax. This rebate is applied after the progressive slab calculation and directly reduces the final tax liability." } },
      { "@type": "Question", "name": "What is SSF exemption in Nepal income tax?", "acceptedAnswer": { "@type": "Answer", "text": "The SSF exemption in Nepal means that individuals or their employers who contribute to the Social Security Fund (SSF) are completely exempt from the 1% Social Security Tax on the first Rs. 10 lakh of taxable income for FY 2083/84. This effectively saves a maximum of Rs. 10,000 in annual tax." } },
      { "@type": "Question", "name": "What deductions can I claim for income tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "For FY 2083/84 in Nepal, you can claim deductions for retirement contributions to SSF, EPF, or CIT (combined cap: Rs. 5 lakh or 1/3 of income), life insurance premiums (up to Rs. 40,000), and health insurance premiums (up to Rs. 20,000). These reduce your gross income before slab calculation." } },
      { "@type": "Question", "name": "What is the difference between Nepal income tax 2082/83 and 2083/84?", "acceptedAnswer": { "@type": "Answer", "text": "The main differences are: the 1% threshold doubled from Rs. 5 lakh to Rs. 10 lakh, the top rate dropped from 39% to 29%, the number of slabs reduced from six to five, and the separate single/couple classification was eliminated. These changes are effective from Shrawan 1, 2083 (mid-July 2026)." } },
      { "@type": "Question", "name": "How is TDS calculated on salary in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "TDS on salary in Nepal is calculated by estimating the employee's annual tax liability under FY 2083/84 IRD slabs after all eligible deductions, then dividing by 12 to get the monthly deduction amount. Employers deduct this each month and deposit it with the IRD." } },
      { "@type": "Question", "name": "What is the non-resident income tax rate in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Non-resident individuals are taxed at a flat rate of 25% on Nepal-source income, regardless of the progressive slab structure that applies to resident individuals." } },
      { "@type": "Question", "name": "What is advance tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Advance tax in Nepal is paid in three installments by taxpayers with business income: 40% by end of Poush (mid-January), 70% by end of Chaitra (mid-April), and 100% by end of Ashad (mid-July)." } },
      { "@type": "Question", "name": "How to file income tax return in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Salaried employees with a single employer generally do not need to file a separate return as TDS is deducted monthly. Individuals with multiple income sources or business income must file returns through the official Inland Revenue Department (IRD) taxpayer portal at ird.gov.np." } }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Income Tax in Nepal",
    "description": "Step-by-step guide to calculating personal income tax in Nepal for FY 2083/84 using IRD slabs.",
    "step": [
      { "@type": "HowToStep", "name": "Calculate annual gross income", "text": "Multiply monthly basic salary by 12 and add all allowances and bonuses." },
      { "@type": "HowToStep", "name": "Subtract retirement contributions", "text": "Deduct SSF, EPF, or CIT contributions up to Rs. 5 lakh or 1/3 of gross income, whichever is lower." },
      { "@type": "HowToStep", "name": "Subtract insurance premiums", "text": "Deduct life insurance up to Rs. 40,000 and health insurance up to Rs. 20,000." },
      { "@type": "HowToStep", "name": "Apply progressive slabs", "text": "Apply 1% to first Rs. 10 lakh, 10% to Rs. 10\u201315 lakh, 20% to Rs. 15\u201325 lakh, 27% to Rs. 25\u201340 lakh, 29% above Rs. 40 lakh." },
      { "@type": "HowToStep", "name": "Apply female rebate if applicable", "text": "Female employees with only salary income reduce total tax by 10%." },
      { "@type": "HowToStep", "name": "Divide by 12 for monthly TDS", "text": "Divide annual tax by 12 to determine monthly TDS deduction." }
    ]
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Nepal Income Tax Slabs FY 2083/84",
    "description": "Official progressive income tax slabs for resident individuals in Nepal for fiscal year 2083/84 as per Finance Act 2083.",
    "creator": { "@type": "Organization", "name": "NepaCalc" },
    "dateModified": "2026-07-01",
    "license": "https://creativecommons.org/licenses/by/4.0/"
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Income Tax Calculator Nepal (2083/84)",
    "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": { "@type": "Organization", "name": "NepaCalc", "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" } },
    "datePublished": "2026-01-01",
    "dateModified": "2026-07-01",
    "mainEntityOfPage": "https://nepacalc.com/calculator/nepal-income-tax/"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="bg-[#F1F3F4]">
        <Calculator />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">

            {/* Last Updated */}
            <p className="text-sm text-slate-500 mb-2">
              <strong>Last Updated:</strong> FY 2083/84 (2026/27) — Effective Shrawan 1, 2083 &nbsp;|&nbsp;
              <strong>Data Sources:</strong> Inland Revenue Department (IRD) Nepal, Finance Act 2083, Budget Speech FY 2083/84
            </p>

            {/* Table of Contents */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 not-prose">
              <p className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Contents</p>
              <ul className="space-y-1 text-sm text-blue-700">
                <li><a href="#quick-answer" className="hover:underline">Income Tax in Nepal 2083/84 — Quick Answer</a></li>
                <li><a href="#slabs" className="hover:underline">Nepal Income Tax Slabs 2083/84 (IRD Rates)</a></li>
                <li><a href="#comparison" className="hover:underline">2083/84 vs 2082/83 Comparison</a></li>
                <li><a href="#deductions" className="hover:underline">Allowable Tax Deductions</a></li>
                <li><a href="#how-to" className="hover:underline">How to Calculate Income Tax (Step-by-Step)</a></li>
                <li><a href="#examples" className="hover:underline">Sample Calculations</a></li>
                <li><a href="#advance-tax" className="hover:underline">Advance Tax & IRD Filing Deadlines</a></li>
                <li><a href="#faq" className="hover:underline">Income Tax FAQ 2083/84</a></li>
              </ul>
            </div>

            {/* Introduction */}
            <div className="income-tax-summary">
              <h1 className="text-3xl font-black text-slate-900 mb-4">Income Tax Calculator Nepal (2083/84)</h1>
              <p className="mb-4">Use this <strong>Income Tax Calculator Nepal</strong> to calculate your exact annual and monthly tax liability under the latest FY 2083/84 IRD slabs. The calculator supports all resident individuals including salaried employees, SSF contributors, female employees (10% rebate), and taxpayers with EPF, CIT and insurance deductions. The FY 2083/84 budget introduced the most significant income tax reform in Nepal in years — doubling the 1% threshold to Rs. 10 lakh and cutting the top rate from 39% to 29%.</p>
              <p className="mb-4">For employees whose salary includes a vehicle allowance or who own a vehicle in Nepal, annual road tax is a separate obligation — use our <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax Calculator Nepal</Link> to estimate your bluebook renewal cost alongside your income tax planning.</p>
            </div>

            {/* Quick Answer */}
            <h2 id="quick-answer" className="text-2xl font-black text-slate-900 mt-10 mb-6">Income Tax in Nepal 2083/84 — Quick Answer</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 quick-answer space-y-4">
              <div>
                <p className="font-bold text-slate-800">What is the income tax rate in Nepal for 2083/84?</p>
                <p className="text-slate-700 mt-1">Nepal&apos;s income tax for FY 2083/84 follows a unified 5-slab progressive structure for all resident individuals. The 1% Social Security Tax applies to the first Rs. 10 lakh of taxable income, 10% on Rs. 10–15 lakh, 20% on Rs. 15–25 lakh, 27% on Rs. 25–40 lakh, and 29% above Rs. 40 lakh. SSF contributors are exempt from the 1% first slab entirely.</p>
              </div>
              <div>
                <p className="font-bold text-slate-800">What changed in Nepal&apos;s income tax for 2083/84?</p>
                <p className="text-slate-700 mt-1">The FY 2083/84 budget announced by Finance Minister Dr. Swarnim Wagle on Jestha 15, 2083 (May 29, 2026) made three major changes: it doubled the 1% tax threshold from Rs. 5 lakh to Rs. 10 lakh, cut the maximum marginal rate from 39% to 29%, and eliminated the separate single/couple classification — applying one unified slab to all resident individuals.</p>
              </div>
              <div>
                <p className="font-bold text-slate-800">How do I calculate income tax in Nepal?</p>
                <p className="text-slate-700 mt-1">To calculate income tax in Nepal, subtract eligible deductions (SSF/EPF/CIT up to Rs. 5 lakh or 1/3 of income, life insurance up to Rs. 40,000, health insurance up to Rs. 20,000) from your gross annual salary to get your taxable income, then apply the FY 2083/84 progressive slabs from the lowest band upward.</p>
              </div>
            </div>

            {/* Slab Table */}
            <h2 id="slabs" className="text-2xl font-black text-slate-900 mt-12 mb-4">Nepal Income Tax Slabs 2083/84 (IRD Official Rates)</h2>
            <p className="mb-4">The <a href="https://www.ird.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Inland Revenue Department (IRD)</a> of Nepal administers personal income tax under the Income Tax Act 2058. The FY 2083/84 Finance Act introduced a unified progressive structure for all resident natural persons, eliminating the previous single/couple distinction.</p>
            <div className="overflow-x-auto mb-4 tax-slab-table">
              <table className="min-w-full bg-white border border-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Annual Taxable Income (NPR)</th>
                    <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Tax Rate</th>
                    <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Maximum Tax in Band</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-2 px-4 border-b">Up to Rs. 10,00,000</td><td className="py-2 px-4 border-b font-semibold text-green-700">1% (Social Security Tax)</td><td className="py-2 px-4 border-b">Rs. 10,000</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 10,00,001 to Rs. 15,00,000</td><td className="py-2 px-4 border-b font-semibold">10%</td><td className="py-2 px-4 border-b">Rs. 50,000</td></tr>
                  <tr><td className="py-2 px-4 border-b">Rs. 15,00,001 to Rs. 25,00,000</td><td className="py-2 px-4 border-b font-semibold">20%</td><td className="py-2 px-4 border-b">Rs. 2,00,000</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 25,00,001 to Rs. 40,00,000</td><td className="py-2 px-4 border-b font-semibold">27%</td><td className="py-2 px-4 border-b">Rs. 4,05,000</td></tr>
                  <tr><td className="py-2 px-4 border-b">Above Rs. 40,00,000</td><td className="py-2 px-4 border-b font-semibold text-red-600">29%</td><td className="py-2 px-4 border-b">Progressive</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 space-y-2 text-sm">
              <p><strong>SSF Note:</strong> If you or your employer contributes to the Social Security Fund (SSF), the 1% Social Security Tax on the first Rs. 10 lakh is completely waived.</p>
              <p><strong>Female rebate:</strong> Resident female employees whose only income source is employment receive a 10% rebate on their total calculated tax liability under the Income Tax Act 2058.</p>
              <p><strong>Non-residents:</strong> Non-resident individuals are taxed at a flat rate of 25% on Nepal-source income regardless of slab.</p>
            </div>

            {/* Comparison Table */}
            <h2 id="comparison" className="text-2xl font-black text-slate-900 mt-12 mb-4">Income Tax 2083/84 vs 2082/83 — Comparison</h2>
            <p className="mb-4">The FY 2083/84 reforms represent the most significant restructuring of Nepal&apos;s personal income tax in recent years. Use this <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Income Tax Calculator Nepal</Link> to see exactly how the changes affect your take-home pay.</p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white border border-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Feature</th>
                    <th className="py-3 px-4 border-b text-left font-bold text-slate-700">FY 2082/83</th>
                    <th className="py-3 px-4 border-b text-left font-bold text-slate-700">FY 2083/84</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-2 px-4 border-b">Number of slabs</td><td className="py-2 px-4 border-b">6</td><td className="py-2 px-4 border-b font-semibold text-green-700">5</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">1% slab threshold</td><td className="py-2 px-4 border-b">Rs. 5 lakh (single) / Rs. 6 lakh (married)</td><td className="py-2 px-4 border-b font-semibold text-green-700">Rs. 10 lakh (all individuals)</td></tr>
                  <tr><td className="py-2 px-4 border-b">Top marginal rate</td><td className="py-2 px-4 border-b text-red-600">39%</td><td className="py-2 px-4 border-b font-semibold text-green-700">29%</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Single/couple distinction</td><td className="py-2 px-4 border-b">Yes — separate slabs</td><td className="py-2 px-4 border-b font-semibold text-green-700">No — unified for all</td></tr>
                  <tr><td className="py-2 px-4 border-b">SSF exemption</td><td className="py-2 px-4 border-b">First slab waived</td><td className="py-2 px-4 border-b">First slab waived</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Female rebate</td><td className="py-2 px-4 border-b">10% on total tax</td><td className="py-2 px-4 border-b">10% on total tax</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mb-6">FY 2083/84 slabs are effective from Shrawan 1, 2083 (mid-July 2026), subject to the Finance Act 2083. If you are calculating tax for the period before Shrawan 1, 2083, use the <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline">Nepal Salary Tax Calculator</Link> which supports both fiscal year structures.</p>

            {/* Deductions */}
            <h2 id="deductions" className="text-2xl font-black text-slate-900 mt-12 mb-4">Allowable Tax Deductions in Nepal (FY 2083/84)</h2>
            <p className="mb-4">Before calculating your tax against the slabs, subtract eligible annual deductions from your gross income to determine your Net Assessable Income (NAI).</p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white border border-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Deduction Type</th>
                    <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Maximum Annual Deduction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-2 px-4 border-b">SSF + EPF + CIT combined</td><td className="py-2 px-4 border-b">Lower of Rs. 5,00,000 or 1/3 of gross income</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Life insurance premium</td><td className="py-2 px-4 border-b">Rs. 40,000</td></tr>
                  <tr><td className="py-2 px-4 border-b">Health/medical insurance premium</td><td className="py-2 px-4 border-b">Rs. 20,000</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Female tax rebate</td><td className="py-2 px-4 border-b">10% of total calculated tax</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mb-4"><strong>How deductions work:</strong> Deductions reduce your gross income before slab calculation, not the tax amount itself (except the female rebate, which directly reduces total tax). A person earning Rs. 18 lakh who contributes Rs. 1 lakh to EPF calculates tax on Rs. 17 lakh, not Rs. 18 lakh.</p>
            <p className="mb-6">If you are planning a vehicle loan alongside your tax planning, use our <Link href="/calculator/loan-emi/" className="text-blue-600 hover:underline">Auto Loan EMI Calculator</Link> to estimate combined monthly obligations. For TDS on salary, use our <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline">TDS Calculator Nepal</Link>.</p>

            {/* How To */}
            <h2 id="how-to" className="text-2xl font-black text-slate-900 mt-12 mb-4">How to Calculate Income Tax in Nepal (Step-by-Step)</h2>
            <ol className="list-decimal pl-6 space-y-3 mb-8 text-slate-700">
              <li>Calculate your total annual gross income — monthly basic × 12, plus allowances and any Dashain bonus.</li>
              <li>Add all regular monthly allowances to the annual figure.</li>
              <li>Subtract retirement contributions (SSF + EPF + CIT), capped at Rs. 5,00,000 or 1/3 of gross income, whichever is lower.</li>
              <li>Subtract life insurance premium paid, up to Rs. 40,000.</li>
              <li>Subtract health insurance premium paid, up to Rs. 20,000.</li>
              <li>The result is your <strong>Net Assessable Income (NAI)</strong>.</li>
              <li>Apply the 1% rate to the first Rs. 10 lakh of NAI (or 0% if SSF contributor).</li>
              <li>Apply 10% to the portion between Rs. 10 lakh and Rs. 15 lakh.</li>
              <li>Apply 20% to the portion between Rs. 15 lakh and Rs. 25 lakh.</li>
              <li>Apply 27% to the portion between Rs. 25 lakh and Rs. 40 lakh.</li>
              <li>Apply 29% to any income above Rs. 40 lakh.</li>
              <li>Sum all slab totals to get your annual tax liability.</li>
              <li>If you are a female employee with only salary income, reduce total by 10%.</li>
              <li>Divide annual tax by 12 for monthly TDS amount.</li>
            </ol>

            {/* Examples */}
            <h2 id="examples" className="text-2xl font-black text-slate-900 mt-12 mb-4">Sample Income Tax Calculations (FY 2083/84)</h2>
            <div className="space-y-6 mb-8">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Example 1 — Rs. 50,000 monthly salary (Rs. 6 lakh/year), non-SSF</h3>
                <p className="text-slate-700 text-sm">Gross: Rs. 6,00,000. No deductions claimed. NAI: Rs. 6,00,000.</p>
                <p className="text-slate-700 text-sm mt-1"><strong>Tax:</strong> Rs. 6,00,000 × 1% = <strong>Rs. 6,000/year (Rs. 500/month)</strong>.</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Example 2 — Rs. 1,50,000 monthly (Rs. 18 lakh/year), SSF contributor, EPF Rs. 1 lakh</h3>
                <p className="text-slate-700 text-sm">Gross: Rs. 18,00,000. Deductions: Rs. 1,00,000 EPF. NAI: Rs. 17,00,000.</p>
                <p className="text-slate-700 text-sm mt-1">Band 1 (SSF): Rs. 10,00,000 × 0% = Rs. 0.</p>
                <p className="text-slate-700 text-sm">Band 2: Rs. 5,00,000 × 10% = Rs. 50,000.</p>
                <p className="text-slate-700 text-sm">Band 3: Rs. 2,00,000 × 20% = Rs. 40,000.</p>
                <p className="text-slate-700 text-sm mt-1"><strong>Total: Rs. 90,000/year (Rs. 7,500/month).</strong></p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Example 3 — Rs. 5,00,000 monthly (Rs. 60 lakh/year), non-SSF</h3>
                <p className="text-slate-700 text-sm">Gross: Rs. 60,00,000.</p>
                <p className="text-slate-700 text-sm">Band 1: Rs. 10,00,000 × 1% = Rs. 10,000.</p>
                <p className="text-slate-700 text-sm">Band 2: Rs. 5,00,000 × 10% = Rs. 50,000.</p>
                <p className="text-slate-700 text-sm">Band 3: Rs. 10,00,000 × 20% = Rs. 2,00,000.</p>
                <p className="text-slate-700 text-sm">Band 4: Rs. 15,00,000 × 27% = Rs. 4,05,000.</p>
                <p className="text-slate-700 text-sm">Band 5: Rs. 20,00,000 × 29% = Rs. 5,80,000.</p>
                <p className="text-slate-700 text-sm mt-1"><strong>Total: Rs. 12,45,000/year (Rs. 1,03,750/month).</strong></p>
              </div>
            </div>
            <p className="mb-6">For precise monthly calculations including your specific deductions, use the calculator above. To understand TDS deductions on contractor payments, use our <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline">TDS Calculator Nepal</Link>.</p>

            {/* Advance Tax */}
            <h2 id="advance-tax" className="text-2xl font-black text-slate-900 mt-12 mb-4">Advance Tax and IRD Filing Deadlines</h2>
            <p className="mb-4">Salaried employees have tax deducted at source (TDS) by their employer each month and do not need to file separately. However, individuals with business income or multiple income sources must pay advance tax to the <a href="https://www.ird.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Inland Revenue Department (IRD)</a> in three installments:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700">
              <li><strong>40%</strong> of estimated annual tax — by end of Poush (mid-January)</li>
              <li><strong>70%</strong> of estimated annual tax — by end of Chaitra (mid-April)</li>
              <li><strong>100%</strong> of actual tax — by end of Ashad (mid-July)</li>
            </ul>
            <p className="mb-8">Late payment attracts interest charges. For VAT-related penalty calculations, see our <Link href="/calculator/nepal-vat/" className="text-blue-600 hover:underline">Nepal VAT Calculator</Link>, or refer directly to ird.gov.np for the official taxpayer portal and QR-coded tax clearance certificates.</p>

            {/* Related Calculators */}
            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-4">Related Nepal Tax and Finance Calculators</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-700">
              <li><Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline">Nepal Salary Tax Calculator</Link> — Full salary breakdown with SSF, EPF, CIT and Dashain bonus</li>
              <li><Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline">TDS Calculator Nepal</Link> — TDS on salary and contractor payments</li>
              <li><Link href="/calculator/nepal-vat/" className="text-blue-600 hover:underline">Nepal VAT Calculator</Link> — 13% VAT calculation and fine estimation</li>
              <li><Link href="/calculator/nepal-home-loan/" className="text-blue-600 hover:underline">Nepal Home Loan Calculator</Link> — Monthly installments on property loans</li>
              <li><Link href="/calculator/loan-emi/" className="text-blue-600 hover:underline">Auto Loan EMI Calculator</Link> — Vehicle financing installment calculator</li>
              <li><Link href="/calculator/nepal-provident-fund/" className="text-blue-600 hover:underline">Nepal Provident Fund Calculator</Link> — EPF and SSF contribution planning</li>
              <li><Link href="/calculator/nepse-wacc/" className="text-blue-600 hover:underline">NEPSE WACC Calculator</Link> — Weighted average acquisition cost for stocks</li>
              <li><Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax Calculator Nepal</Link> — Annual road tax and bluebook renewal</li>
            </ul>

            {/* FAQ */}
            <h2 id="faq" className="text-2xl font-black text-slate-900 mt-16 mb-8 pt-8 border-t">Income Tax FAQ — Nepal 2083/84</h2>
            <div className="space-y-6 mb-12">
              <div><h3 className="font-bold text-lg text-slate-900">What is the income tax slab for Nepal 2083/84?</h3><p className="text-slate-600 mt-1">Nepal&apos;s income tax slab for FY 2083/84 has five bands for all resident individuals: 1% up to Rs. 10 lakh, 10% on Rs. 10–15 lakh, 20% on Rs. 15–25 lakh, 27% on Rs. 25–40 lakh, and 29% above Rs. 40 lakh. The Finance Act 2083 eliminated separate slabs for single and married individuals.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">Is income up to Rs. 10 lakh tax-free in Nepal 2083/84?</h3><p className="text-slate-600 mt-1">Income up to Rs. 10 lakh is not completely tax-free in Nepal 2083/84. It is taxed at 1% as the Social Security Tax. However, SSF contributors are fully exempt from this 1% tax, effectively making the first Rs. 10 lakh tax-free for Social Security Fund members.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">What is the IRD tax calculator for Nepal?</h3><p className="text-slate-600 mt-1">The IRD (Inland Revenue Department) tax calculator for Nepal applies the official progressive tax slabs to your net assessable income after deductions. The NepaCalc Income Tax Calculator Nepal follows official IRD slabs for FY 2083/84 and supports SSF exemption, EPF deductions, insurance deductions, and the female employee rebate.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">How much income tax do I pay on Rs. 50,000 monthly salary in Nepal?</h3><p className="text-slate-600 mt-1">On a Rs. 50,000 monthly salary (Rs. 6 lakh/year) with no deductions, you pay Rs. 6,000 per year or Rs. 500 per month at the 1% slab rate. If you contribute to SSF, this becomes Rs. 0 as the first slab is waived entirely for SSF members.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">What is the female tax rebate in Nepal?</h3><p className="text-slate-600 mt-1">Female employees in Nepal who earn income only from employment receive a 10% rebate on their total calculated income tax. This rebate is applied after the progressive slab calculation and directly reduces the final tax liability.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">What is SSF exemption in Nepal income tax?</h3><p className="text-slate-600 mt-1">The SSF exemption in Nepal means that individuals or their employers who contribute to the Social Security Fund (SSF) are completely exempt from the 1% Social Security Tax on the first Rs. 10 lakh of taxable income for FY 2083/84. This effectively saves a maximum of Rs. 10,000 in annual tax.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">What deductions can I claim for income tax in Nepal?</h3><p className="text-slate-600 mt-1">For FY 2083/84 in Nepal, you can claim deductions for retirement contributions to SSF, EPF, or CIT (combined cap: Rs. 5 lakh or 1/3 of income), life insurance premiums (up to Rs. 40,000), and health insurance premiums (up to Rs. 20,000). These reduce your gross income before slab calculation.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">What is the difference between Nepal income tax 2082/83 and 2083/84?</h3><p className="text-slate-600 mt-1">The main differences are: the 1% threshold doubled from Rs. 5 lakh to Rs. 10 lakh, the top rate dropped from 39% to 29%, the number of slabs reduced from six to five, and the separate single/couple classification was eliminated. These changes are effective from Shrawan 1, 2083 (mid-July 2026).</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">How to file income tax return in Nepal?</h3><p className="text-slate-600 mt-1">Salaried employees whose entire tax is deducted at source (TDS) by a single employer are generally not required to file a separate income tax return. Individuals with multiple income sources, business income, or foreign income must file returns through the official Inland Revenue Department (IRD) taxpayer portal at ird.gov.np.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">What is advance tax in Nepal?</h3><p className="text-slate-600 mt-1">Advance tax in Nepal is a payment mechanism where taxpayers with business income or multiple income sources pay estimated tax in three installments throughout the fiscal year — 40% by end of Poush, 70% by end of Chaitra, and 100% by end of Ashad — rather than paying a lump sum at year end.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">What is the non-resident income tax rate in Nepal?</h3><p className="text-slate-600 mt-1">Non-resident individuals are taxed at a flat rate of 25% on Nepal-source income, regardless of the progressive slab structure that applies to resident individuals.</p></div>
              <div><h3 className="font-bold text-lg text-slate-900">How is TDS calculated on salary in Nepal?</h3><p className="text-slate-600 mt-1">TDS (Tax Deducted at Source) on salary in Nepal is calculated by estimating the employee&apos;s annual tax liability under the current FY 2083/84 IRD slabs after all eligible deductions, then dividing by 12 to get the monthly deduction amount. Employers deduct this amount from salary each month and deposit it with the IRD. Use our <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline">TDS Calculator Nepal</Link> for exact TDS amounts.</p></div>
            </div>

            {/* Official Sources */}
            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-4">Data Sources and Official References</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700">
              <li><a href="https://www.ird.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Inland Revenue Department (IRD) Nepal</a> — official tax authority</li>
              <li>Finance Act 2083 — Budget announced Jestha 15, 2083 (May 29, 2026)</li>
              <li>Finance Minister Dr. Swarnim Wagle&apos;s Budget Speech FY 2083/84</li>
              <li>Income Tax Act 2058 BS (as amended)</li>
            </ul>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-sm text-slate-600 mt-6 mb-4">
              <p className="mb-1">This calculator is maintained and updated using publicly available data from the Inland Revenue Department (IRD) and the Finance Act 2083. Rates are reviewed whenever new fiscal year tax schedules are published.</p>
              <p><strong>Last Updated:</strong> Shrawan 2083 (July 2026)</p>
            </div>

            {/* Entity Reinforcement */}
            <div className="sr-only">
              Income Tax Calculator Nepal. IRD Tax Calculator Nepal. Nepal Income Tax Slab 2083/84.
              Inland Revenue Department Nepal. Finance Act 2083. Nepal Salary Tax Calculator.
              TDS Calculator Nepal. SSF Nepal. EPF Nepal. CIT Nepal.
              Income Tax Nepal 2083/84. Tax Slab Nepal 2083/84.
              IRD Nepal. Taxable Income Nepal. Net Assessable Income Nepal.
              Shrawan 2083. FY 2083/84. FY 2026/27.
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
