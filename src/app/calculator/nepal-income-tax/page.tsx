import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Income Tax Calculator Nepal (2083/84) — IRD Slabs",
  description: "Calculate Nepal income tax for FY 2083/84 using the latest IRD slabs. Includes SSF, EPF, CIT, insurance deductions, female rebate and net take-home pay.",
  slug: 'calculator/nepal-income-tax',
  canonical: '/calculator/nepal-income-tax/',
  keywords: [
    "income tax calculator nepal",
    "ird tax calculator nepal",
    "nepal income tax slab 2083/84",
    "tax calculator nepal",
    "salary tax calculator nepal",
    "income tax nepal 2083 84"
  ],
  ogImage: 'https://nepacalc.com/images/income-tax-calculator-nepal-2083-84.webp'
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculator/"},
      {"@type": "ListItem", "position": 3, "name": "Income Tax Calculator Nepal", "item": "https://nepacalc.com/calculator/nepal-income-tax/"}
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/calculator/nepal-income-tax/",
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "name": "Income Tax Calculator Nepal (2083/84) — IRD Slabs",
    "description": "Calculate Nepal income tax for FY 2083/84 using official IRD slabs with SSF, EPF, CIT and insurance deductions.",
    "inLanguage": "en-NP",
    "datePublished": "2026-01-01",
    "dateModified": "2026-07-01",
    "isPartOf": {"@type": "WebSite", "name": "NepaCalc", "url": "https://nepacalc.com"},
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".quick-answer", ".tax-slab-table", ".income-tax-summary", ".faq-section"]
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Income Tax Calculator Nepal",
    "alternateName": ["IRD Tax Calculator Nepal", "Tax Calculator Nepal", "Nepal Income Tax Calculator 2083/84"],
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Calculate Nepal income tax for FY 2083/84 using official IRD progressive slabs with SSF exemption, EPF/CIT deductions, insurance deductions and female tax rebate.",
    "offers": {"@type": "Offer", "price": "0", "priceCurrency": "NPR"},
    "featureList": ["SSF exemption calculation", "EPF and CIT deductions", "Female 10% tax rebate", "Multi-year comparison 2082/83 vs 2083/84", "Monthly TDS calculation", "Advance tax planning"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the income tax slab for Nepal 2083/84?",
        "acceptedAnswer": {"@type": "Answer", "text": "Nepal's income tax slab for FY 2083/84 has five progressive bands for all resident individuals under the Finance Act 2083: 1% up to Rs. 10 lakh, 10% on Rs. 10–15 lakh, 20% on Rs. 15–25 lakh, 27% on Rs. 25–40 lakh, and 29% above Rs. 40 lakh. Separate slabs for single and married individuals were eliminated."}
      },
      {
        "@type": "Question",
        "name": "Is income up to Rs. 10 lakh tax-free in Nepal 2083/84?",
        "acceptedAnswer": {"@type": "Answer", "text": "Income up to Rs. 10 lakh is taxed at 1% as the Social Security Tax in Nepal 2083/84, meaning a maximum of Rs. 10,000 annual tax. SSF contributors are fully exempt from this 1% tax, making the effective rate 0% on the first Rs. 10 lakh for Social Security Fund members."}
      },
      {
        "@type": "Question",
        "name": "What is the IRD tax calculator Nepal?",
        "acceptedAnswer": {"@type": "Answer", "text": "The IRD tax calculator Nepal applies official Inland Revenue Department progressive tax slabs to your net assessable income after all eligible deductions. The NepaCalc Income Tax Calculator Nepal follows official IRD FY 2083/84 slabs and supports SSF exemption, EPF, CIT, insurance deductions, and the 10% female employee rebate."}
      },
      {
        "@type": "Question",
        "name": "How much income tax do I pay on Rs. 50,000 monthly salary in Nepal?",
        "acceptedAnswer": {"@type": "Answer", "text": "On a Rs. 50,000 monthly salary (Rs. 6 lakh/year) with no deductions, you pay Rs. 6,000 per year (Rs. 500/month) at the 1% slab for FY 2083/84. SSF contributors pay Rs. 0. Female employees (non-SSF) pay Rs. 5,400/year after the 10% rebate."}
      },
      {
        "@type": "Question",
        "name": "What is the female tax rebate in Nepal income tax?",
        "acceptedAnswer": {"@type": "Answer", "text": "The female tax rebate in Nepal is a 10% reduction on the total calculated income tax for resident female employees whose only income source is employment. It is applied after the progressive slab calculation and directly reduces the final tax liability."}
      },
      {
        "@type": "Question",
        "name": "What is SSF exemption in Nepal income tax?",
        "acceptedAnswer": {"@type": "Answer", "text": "The SSF exemption in Nepal means contributors to the Social Security Fund are completely exempt from the 1% Social Security Tax on the first Rs. 10 lakh of taxable income for FY 2083/84, saving a maximum of Rs. 10,000 per year."}
      },
      {
        "@type": "Question",
        "name": "What deductions can I claim for income tax in Nepal?",
        "acceptedAnswer": {"@type": "Answer", "text": "For FY 2083/84, Nepal income tax deductions include retirement contributions to SSF, EPF, or CIT combined (capped at Rs. 5 lakh or 1/3 of gross income), life insurance premiums (up to Rs. 40,000), and health insurance premiums (up to Rs. 20,000). These reduce gross income before slab rates apply."}
      },
      {
        "@type": "Question",
        "name": "What is the difference between Nepal income tax 2082/83 and 2083/84?",
        "acceptedAnswer": {"@type": "Answer", "text": "Nepal income tax 2083/84 vs 2082/83: the 1% threshold doubled from Rs. 5 lakh (single) or Rs. 6 lakh (married) to Rs. 10 lakh for all; top rate dropped from 39% to 29%; slabs reduced from six to five; and the single/married distinction was eliminated. Changes are effective Shrawan 1, 2083 (mid-July 2026)."}
      },
      {
        "@type": "Question",
        "name": "How is TDS calculated on salary in Nepal?",
        "acceptedAnswer": {"@type": "Answer", "text": "TDS on salary in Nepal is calculated by estimating annual gross income, subtracting eligible deductions for Net Assessable Income, applying FY 2083/84 progressive slab rates for annual tax, applying female rebate if eligible, then dividing by 12 for the monthly TDS deduction."}
      },
      {
        "@type": "Question",
        "name": "What is the non-resident income tax rate in Nepal?",
        "acceptedAnswer": {"@type": "Answer", "text": "Non-resident individuals pay a flat 25% income tax rate on all Nepal-source income under the Income Tax Act 2058. Non-residents do not qualify for progressive slab benefits, deductions, SSF exemption, or the female rebate that apply to resident individuals."}
      },
      {
        "@type": "Question",
        "name": "Can I download a Nepal income tax calculator in Excel or PDF?",
        "acceptedAnswer": {"@type": "Answer", "text": "The Income Tax Calculator Nepal on this page works in your browser without download. For offline use, ird.gov.np provides official Excel-format salary tax computation sheets. This calculator automatically applies FY 2083/84 slabs and updates when Finance Act changes are published."}
      },
      {
        "@type": "Question",
        "name": "What is the income tax rate in Nepal for 2080/81?",
        "acceptedAnswer": {"@type": "Answer", "text": "For FY 2080/81, Nepal income tax had six progressive slabs. Single filers paid 1% up to Rs. 4 lakh and the top rate was 36% above Rs. 20 lakh. For 2083/84, the threshold has risen to Rs. 10 lakh and the top rate dropped to 29%."}
      },
      {
        "@type": "Question",
        "name": "What is advance tax in Nepal?",
        "acceptedAnswer": {"@type": "Answer", "text": "Advance tax in Nepal is paid in three installments by taxpayers with business income: 40% by end of Poush (mid-January), 70% by end of Chaitra (mid-April), and 100% by end of Ashad (mid-July). Salaried employees with a single employer are exempt as TDS covers their obligation."}
      },
      {
        "@type": "Question",
        "name": "What is the business income tax rate in Nepal 2083/84?",
        "acceptedAnswer": {"@type": "Answer", "text": "Standard companies in Nepal pay 25% income tax on net profit for FY 2083/84. Banks, financial institutions, insurance companies, and telecom companies pay 30%. Manufacturing and export businesses may qualify for 20%. Self-employed individuals pay personal income tax at the same progressive slab rates as salaried employees."}
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Income Tax in Nepal (FY 2083/84)",
    "description": "Step-by-step guide to calculating personal income tax in Nepal for FY 2083/84 using official IRD slabs and deductions.",
    "totalTime": "PT5M",
    "step": [
      {"@type": "HowToStep", "position": 1, "name": "Calculate annual gross income", "text": "Multiply monthly basic salary by 12 and add all allowances and annual bonuses including Dashain bonus."},
      {"@type": "HowToStep", "position": 2, "name": "Calculate retirement deduction", "text": "Sum SSF, EPF, and CIT contributions. Cap at Rs. 5,00,000 or 1/3 of gross income, whichever is lower."},
      {"@type": "HowToStep", "position": 3, "name": "Add insurance deductions", "text": "Add life insurance premium paid (max Rs. 40,000) and health insurance premium paid (max Rs. 20,000)."},
      {"@type": "HowToStep", "position": 4, "name": "Find Net Assessable Income", "text": "Subtract total deductions from gross income. This is your Net Assessable Income (NAI)."},
      {"@type": "HowToStep", "position": 5, "name": "Apply progressive slab rates", "text": "Apply 1% to first Rs. 10 lakh (0% if SSF), 10% to Rs. 10–15 lakh, 20% to Rs. 15–25 lakh, 27% to Rs. 25–40 lakh, 29% above Rs. 40 lakh."},
      {"@type": "HowToStep", "position": 6, "name": "Apply female rebate if applicable", "text": "Female employees with only salary income reduce total calculated tax by 10%."},
      {"@type": "HowToStep", "position": 7, "name": "Calculate monthly TDS", "text": "Divide annual tax by 12 to find the monthly TDS deduction amount."}
    ]
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Nepal Income Tax Slabs FY 2083/84",
    "description": "Official progressive income tax slabs for all resident individuals in Nepal for fiscal year 2083/84 as per Finance Act 2083 and Inland Revenue Department (IRD) Nepal.",
    "creator": {"@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com"},
    "publisher": {"@type": "Organization", "name": "Inland Revenue Department Nepal", "url": "https://ird.gov.np"},
    "dateModified": "2026-07-01",
    "temporalCoverage": "2026/2027",
    "spatialCoverage": "Nepal",
    "variableMeasured": [
      {"@type": "PropertyValue", "name": "Tax Rate Band 1", "value": "1% on first Rs. 10,00,000"},
      {"@type": "PropertyValue", "name": "Tax Rate Band 2", "value": "10% on Rs. 10,00,001 to Rs. 15,00,000"},
      {"@type": "PropertyValue", "name": "Tax Rate Band 3", "value": "20% on Rs. 15,00,001 to Rs. 25,00,000"},
      {"@type": "PropertyValue", "name": "Tax Rate Band 4", "value": "27% on Rs. 25,00,001 to Rs. 40,00,000"},
      {"@type": "PropertyValue", "name": "Tax Rate Band 5", "value": "29% above Rs. 40,00,000"}
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Income Tax Calculator Nepal (2083/84) — IRD Slabs, Deductions and Examples",
    "description": "Calculate Nepal income tax for FY 2083/84. Complete guide to IRD progressive slabs, SSF exemption, deductions, sample calculations and comparison with 2082/83.",
    "author": {"@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com"},
    "publisher": {
      "@type": "Organization",
      "name": "NepaCalc",
      "logo": {"@type": "ImageObject", "url": "https://nepacalc.com/logo.png"}
    },
    "datePublished": "2026-01-01",
    "dateModified": "2026-07-01",
    "mainEntityOfPage": "https://nepacalc.com/calculator/nepal-income-tax/",
    "keywords": ["income tax calculator nepal", "ird tax calculator nepal", "nepal income tax slab 2083/84", "tax calculator nepal", "salary tax calculator nepal", "income tax nepal 2083 84"]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Calculator />

      <div className="bg-[#F1F3F4] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
            
            <h1 className="text-3xl font-black text-slate-900 mb-6">Income Tax Calculator Nepal (2083/84)</h1>

            <p className="text-sm text-slate-500 mb-4 not-prose border-b pb-4">
              📅 <strong>Last Updated:</strong> FY 2083/84 (2026/27) — Effective Shrawan 1, 2083 (mid-July 2026)<br/>
              ✍️ <strong>Data Sources:</strong> Inland Revenue Department (IRD) Nepal, Finance Act 2083, Budget Speech FY 2083/84
            </p>

            <p>Use this Income Tax Calculator Nepal to calculate your exact annual and monthly tax liability under the latest FY 2083/84 IRD slabs published by the Inland Revenue Department. This IRD tax calculator Nepal supports salaried employees, SSF contributors, female employees claiming the 10% rebate, and taxpayers with EPF, CIT and insurance deductions. The FY 2083/84 budget doubled the 1% tax threshold to Rs. 10 lakh and cut the top rate from 39% to 29% — the biggest income tax reform Nepal has seen in years.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Income Tax in Nepal 2083/84 — Quick Answer</h2>

            <div className="quick-answer">
              <h3 className="font-bold text-lg text-slate-800">What is the income tax rate in Nepal for 2083/84?</h3>
              <p>Nepal's income tax for FY 2083/84 follows a unified 5-slab progressive structure for all resident individuals under the Finance Act 2083. The 1% Social Security Tax applies to the first Rs. 10 lakh of taxable income, 10% on Rs. 10–15 lakh, 20% on Rs. 15–25 lakh, 27% on Rs. 25–40 lakh, and 29% above Rs. 40 lakh. SSF contributors are exempt from the 1% first slab entirely, making their effective first-slab rate 0%.</p>

              <h3 className="font-bold text-lg text-slate-800">What changed in Nepal's income tax for 2083/84?</h3>
              <p>Finance Minister Dr. Swarnim Wagle's FY 2083/84 budget speech on Jestha 15, 2083 (May 29, 2026) introduced three major income tax changes: the 1% threshold doubled from Rs. 5 lakh to Rs. 10 lakh, the maximum marginal rate was cut from 39% to 29%, and the separate single/couple classification was eliminated — a single unified slab now applies to all resident individuals under the Income Tax Act 2058.</p>

              <h3 className="font-bold text-lg text-slate-800">How do I calculate income tax in Nepal?</h3>
              <p>To calculate income tax in Nepal using this tax calculator Nepal: subtract eligible deductions (SSF/EPF/CIT combined up to Rs. 5 lakh or 1/3 of income, life insurance up to Rs. 40,000, health insurance up to Rs. 20,000) from gross annual salary to find Net Assessable Income, then apply the FY 2083/84 progressive slabs from the lowest band upward. The Income Tax Calculator Nepal above performs all steps automatically.</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Nepal Income Tax Slabs 2083/84 — Official IRD Rates</h2>
            <p>The Inland Revenue Department (IRD) administers personal income tax under the Income Tax Act 2058 BS. The Finance Act 2083 replaced the previous 6-slab structure with a simplified 5-slab progressive system. This <Link href="/income-tax/nepal-income-tax-slab-2083-84/" className="text-blue-600 hover:underline font-bold">Nepal Income Tax Slab 2083/84</Link> applies uniformly to all resident natural persons regardless of marital status.</p>

            <div className="overflow-x-auto mb-4 not-prose tax-slab-table">
              <table className="min-w-full bg-white border border-slate-200">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left font-bold">Annual Taxable Income (NPR)</th>
                    <th className="py-3 px-4 text-left font-bold">Tax Rate</th>
                    <th className="py-3 px-4 text-left font-bold">Maximum Tax in Band</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-2 px-4 border-b">Up to Rs. 10,00,000</td><td className="py-2 px-4 border-b text-green-700 font-semibold">1% (Social Security Tax)</td><td className="py-2 px-4 border-b">Rs. 10,000</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 10,00,001 to Rs. 15,00,000</td><td className="py-2 px-4 border-b font-semibold">10%</td><td className="py-2 px-4 border-b">Rs. 50,000</td></tr>
                  <tr><td className="py-2 px-4 border-b">Rs. 15,00,001 to Rs. 25,00,000</td><td className="py-2 px-4 border-b font-semibold">20%</td><td className="py-2 px-4 border-b">Rs. 2,00,000</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 25,00,001 to Rs. 40,00,000</td><td className="py-2 px-4 border-b font-semibold">27%</td><td className="py-2 px-4 border-b">Rs. 4,05,000</td></tr>
                  <tr><td className="py-2 px-4 border-b">Above Rs. 40,00,000</td><td className="py-2 px-4 border-b text-red-600 font-semibold">29%</td><td className="py-2 px-4 border-b">Progressive</td></tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm"><strong>SSF Note:</strong> Contributors to the Social Security Fund (SSF) or approved pension funds are fully exempt from the 1% Social Security Tax on the first Rs. 10 lakh. Maximum SSF saving: Rs. 10,000 per year.</p>
            <p className="text-sm"><strong>Female rebate:</strong> Resident female employees whose only income source is employment receive a 10% rebate directly on their total calculated income tax liability under Section 12 of the Income Tax Act 2058.</p>
            <p className="text-sm"><strong>Non-residents:</strong> Non-resident individuals are taxed at a flat 25% rate on Nepal-source income, with no access to deductions or slab benefits.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Income Tax Slab Comparison — 2083/84 vs 2082/83 vs 2080/81</h2>
            <p>This comparison is one of the most-searched topics in Nepal income tax queries. For taxpayers calculating retroactive liability or comparing their tax savings, the table below covers three fiscal years.</p>
            
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
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">1% threshold (single)</td><td className="py-1.5 px-3 border-b">Rs. 4 lakh</td><td className="py-1.5 px-3 border-b">Rs. 5 lakh</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Rs. 10 lakh (all)</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">1% threshold (married)</td><td className="py-1.5 px-3 border-b">Rs. 4.5 lakh</td><td className="py-1.5 px-3 border-b">Rs. 6 lakh</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">Rs. 10 lakh (all)</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Top marginal rate</td><td className="py-1.5 px-3 border-b">36%</td><td className="py-1.5 px-3 border-b">39%</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">29%</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">Single/couple distinction</td><td className="py-1.5 px-3 border-b">Yes</td><td className="py-1.5 px-3 border-b">Yes</td><td className="py-1.5 px-3 border-b font-semibold text-green-700">No — unified</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">SSF exemption</td><td className="py-1.5 px-3 border-b">First slab</td><td className="py-1.5 px-3 border-b">First slab</td><td className="py-1.5 px-3 border-b">First slab</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">Female rebate</td><td className="py-1.5 px-3 border-b">10%</td><td className="py-1.5 px-3 border-b">10%</td><td className="py-1.5 px-3 border-b">10%</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-lg text-slate-800 mb-2">FY 2082/83 Slabs for Reference</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-4 not-prose">
              <div>
                <p className="font-bold text-slate-800 mb-2 text-sm">FY 2082/83 — Single Individual</p>
                <table className="min-w-full bg-white border border-slate-200 text-xs">
                  <thead className="bg-slate-50"><tr><th className="py-1 px-2 border-b text-left">Income (NPR)</th><th className="py-1 px-2 border-b text-left">Rate</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1 px-2 border-b">Up to Rs. 5,00,000</td><td className="py-1 px-2 border-b">1%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1 px-2 border-b">Rs. 5,00,001 to Rs. 7,00,000</td><td className="py-1 px-2 border-b">10%</td></tr>
                    <tr><td className="py-1 px-2 border-b">Rs. 7,00,001 to Rs. 10,00,000</td><td className="py-1 px-2 border-b">20%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1 px-2 border-b">Rs. 10,00,001 to Rs. 20,00,000</td><td className="py-1 px-2 border-b">30%</td></tr>
                    <tr><td className="py-1 px-2 border-b">Rs. 20,00,001 to Rs. 50,00,000</td><td className="py-1 px-2 border-b">36%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1 px-2 border-b">Above Rs. 50,00,000</td><td className="py-1 px-2 border-b">39%</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="font-bold text-slate-800 mb-2 text-sm">FY 2082/83 — Married Couple</p>
                <table className="min-w-full bg-white border border-slate-200 text-xs">
                  <thead className="bg-slate-50"><tr><th className="py-1 px-2 border-b text-left">Income (NPR)</th><th className="py-1 px-2 border-b text-left">Rate</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1 px-2 border-b">Up to Rs. 6,00,000</td><td className="py-1 px-2 border-b">1%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1 px-2 border-b">Rs. 6,00,001 to Rs. 8,00,000</td><td className="py-1 px-2 border-b">10%</td></tr>
                    <tr><td className="py-1 px-2 border-b">Rs. 8,00,001 to Rs. 11,00,000</td><td className="py-1 px-2 border-b">20%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1 px-2 border-b">Rs. 11,00,001 to Rs. 21,00,000</td><td className="py-1 px-2 border-b">30%</td></tr>
                    <tr><td className="py-1 px-2 border-b">Rs. 21,00,001 to Rs. 51,00,000</td><td className="py-1 px-2 border-b">36%</td></tr>
                    <tr className="bg-slate-50"><td className="py-1 px-2 border-b">Above Rs. 51,00,000</td><td className="py-1 px-2 border-b">39%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <p className="text-sm">For calculating tax for previous fiscal years, use the <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link> which supports FY 2083/84, 2082/83, 2081/82, and 2080/81 structures.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Allowable Tax Deductions in Nepal (FY 2083/84)</h2>
            <p>Before this Income Tax Calculator Nepal applies the slab rates, it subtracts your eligible annual deductions from gross income to find your Net Assessable Income (NAI). Understanding these deductions is essential to accurate IRD tax calculation in Nepal.</p>

            <div className="overflow-x-auto mb-4 not-prose">
              <table className="min-w-full bg-white border border-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">Deduction Type</th>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">Annual Maximum</th>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-1.5 px-3 border-b">SSF + EPF + CIT combined</td><td className="py-1.5 px-3 border-b">Lower of Rs. 5,00,000 or 1/3 of gross income</td><td className="py-1.5 px-3 border-b">Whichever is lower</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Life insurance premium</td><td className="py-1.5 px-3 border-b">Rs. 40,000</td><td className="py-1.5 px-3 border-b">Actual premium paid</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">Health/medical insurance</td><td className="py-1.5 px-3 border-b">Rs. 20,000</td><td className="py-1.5 px-3 border-b">Actual premium paid</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Female tax rebate</td><td className="py-1.5 px-3 border-b">10% of total calculated tax</td><td className="py-1.5 px-3 border-b">Applied after slab calculation</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm">How deductions work: Deductions reduce your gross assessable income before the slab rates are applied. For example, an employee earning Rs. 18 lakh annually who contributes Rs. 1 lakh to EPF pays tax on Rs. 17 lakh, not Rs. 18 lakh. The female rebate works differently — it directly reduces the final tax amount after all slabs are calculated.</p>
            <p className="text-sm">Plan your annual tax obligations alongside your loan repayments using the <Link href="/calculator/nepal-home-loan/" className="text-blue-600 hover:underline font-bold">Nepal Home Loan Calculator</Link> or the <Link href="/calculator/loan-emi/" className="text-blue-600 hover:underline font-bold">Auto Loan EMI Calculator</Link> for vehicle financing.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">How to Calculate Income Tax in Nepal — Step by Step</h2>
            <p>This IRD tax calculator Nepal performs these steps automatically, but understanding the process helps you verify your calculation and plan deductions effectively. You can learn more in our detailed <Link href="/income-tax/how-to-calculate-income-tax-nepal/" className="text-blue-600 hover:underline font-bold">How to Calculate Income Tax in Nepal</Link> guide.</p>

            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Calculate total annual gross income: Monthly basic salary × 12 plus all allowances and bonuses including Dashain/Tihar bonus.</li>
              <li>Add all monthly allowances to the annual gross figure.</li>
              <li>Calculate your retirement contribution deduction: Total of SSF + EPF + CIT contributions, capped at Rs. 5,00,000 or 1/3 of gross income, whichever is lower.</li>
              <li>Add life insurance premium paid, capped at Rs. 40,000.</li>
              <li>Add health insurance premium paid, capped at Rs. 20,000.</li>
              <li>Subtract the total of steps 3–5 from gross income. The result is your Net Assessable Income (NAI).</li>
              <li>Apply 1% to the first Rs. 10 lakh of NAI (skip if SSF contributor — this band is 0%).</li>
              <li>Apply 10% to the portion of NAI between Rs. 10 lakh and Rs. 15 lakh.</li>
              <li>Apply 20% to the portion of NAI between Rs. 15 lakh and Rs. 25 lakh.</li>
              <li>Apply 27% to the portion of NAI between Rs. 25 lakh and Rs. 40 lakh.</li>
              <li>Apply 29% to any NAI above Rs. 40 lakh.</li>
              <li>Sum all slab results for your total annual tax liability.</li>
              <li>If you are a female employee with only salary income, reduce total by 10%.</li>
              <li>Divide annual tax by 12 to get your monthly TDS deduction amount.</li>
            </ol>

            <div className="bg-slate-100 p-4 rounded-lg not-prose mb-6">
              <p className="font-mono text-sm mb-2"><strong>Formula:</strong></p>
              <p className="font-mono text-sm">Annual Tax = [NAI₁ × 1%] + [NAI₂ × 10%] + [NAI₃ × 20%] + [NAI₄ × 27%] + [NAI₅ × 29%] − Female Rebate (10% if applicable)</p>
              <p className="font-mono text-sm">Monthly TDS = Annual Tax ÷ 12</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Sample Income Tax Calculations Nepal (FY 2083/84)</h2>
            <p>These worked examples help you verify your result from this tax calculator Nepal and understand how the progressive system applies at different salary levels.</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Rs. 30,000/Month Salary (Rs. 3.6 Lakh/Year) — No Deductions</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 3,60,000</li>
                  <li>Band 1: Rs. 3,60,000 × 1% = Rs. 3,600/year (Rs. 300/month)</li>
                  <li>SSF contributor: Rs. 0/year</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Rs. 50,000/Month Salary (Rs. 6 Lakh/Year) — No Deductions</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 6,00,000</li>
                  <li>Band 1: Rs. 6,00,000 × 1% = Rs. 6,000/year (Rs. 500/month)</li>
                  <li>SSF contributor: Rs. 0/year</li>
                  <li>Female employee (non-SSF): Rs. 6,000 − 10% = Rs. 5,400/year</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Rs. 1,00,000/Month Salary (Rs. 12 Lakh/Year) — EPF Rs. 72,000</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 12,00,000 − Rs. 72,000 = Rs. 11,28,000</li>
                  <li>Band 1: Rs. 10,00,000 × 1% = Rs. 10,000</li>
                  <li>Band 2: Rs. 1,28,000 × 10% = Rs. 12,800</li>
                  <li>Total: Rs. 22,800/year (Rs. 1,900/month)</li>
                  <li>SSF contributor (band 1 waived): Rs. 12,800/year (Rs. 1,067/month)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Rs. 1,50,000/Month Salary (Rs. 18 Lakh/Year) — SSF Contributor, EPF Rs. 1 Lakh</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 18,00,000 − Rs. 1,00,000 = Rs. 17,00,000</li>
                  <li>Band 1: Rs. 0 (SSF exempt)</li>
                  <li>Band 2: Rs. 5,00,000 × 10% = Rs. 50,000</li>
                  <li>Band 3: Rs. 2,00,000 × 20% = Rs. 40,000</li>
                  <li>Total: Rs. 90,000/year (Rs. 7,500/month)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Rs. 5,00,000/Month Salary (Rs. 60 Lakh/Year) — No Deductions</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 60,00,000</li>
                  <li>Band 1: Rs. 10,00,000 × 1% = Rs. 10,000</li>
                  <li>Band 2: Rs. 5,00,000 × 10% = Rs. 50,000</li>
                  <li>Band 3: Rs. 10,00,000 × 20% = Rs. 2,00,000</li>
                  <li>Band 4: Rs. 15,00,000 × 27% = Rs. 4,05,000</li>
                  <li>Band 5: Rs. 20,00,000 × 29% = Rs. 5,80,000</li>
                  <li>Total: Rs. 12,45,000/year (Rs. 1,03,750/month)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm mt-4">Use our <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link> for salary-specific calculations including Dashain bonus, SSF toggle, and multi-year comparisons.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Business and Corporate Income Tax in Nepal (2083/84)</h2>
            <p>Beyond personal salary tax, Nepal taxes business income at different rates. This section covers common queries around business income and self-employed tax obligations.</p>

            <h3 className="font-bold text-lg text-slate-800 mt-4 mb-2">Corporate Income Tax Rates Nepal 2083/84</h3>
            <div className="overflow-x-auto mb-4 not-prose">
              <table className="min-w-full bg-white border border-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">Entity Type</th>
                    <th className="py-2 px-3 border-b text-left font-bold text-slate-700">Tax Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-1.5 px-3 border-b">Standard companies</td><td className="py-1.5 px-3 border-b">25%</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Banks and financial institutions</td><td className="py-1.5 px-3 border-b">30%</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">Insurance companies</td><td className="py-1.5 px-3 border-b">30%</td></tr>
                  <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Telecommunication companies</td><td className="py-1.5 px-3 border-b">30%</td></tr>
                  <tr><td className="py-1.5 px-3 border-b">Special industry (manufacturing, export)</td><td className="py-1.5 px-3 border-b">20%</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-lg text-slate-800 mt-6 mb-2">Self-Employed and Freelancer Tax</h3>
            <p>Self-employed individuals and freelancers in Nepal pay income tax at the same progressive personal slab rates as salaried employees. However, they must file tax returns directly with the Inland Revenue Department (IRD) rather than having TDS deducted at source. Freelancers earning foreign currency from IT or software services may qualify for a flat 5% final withholding tax on convertible foreign income up to Rs. 40 lakh.</p>

            <p>Advance tax deadlines for self-employed and business owners:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>40% of estimated annual tax — by end of Poush (mid-January)</li>
              <li>70% of estimated annual tax — by end of Chaitra (mid-April)</li>
              <li>100% of actual annual tax — by end of Ashad (mid-July)</li>
            </ul>

            <p>For rental income, landlords pay 10% TDS on rental receipts above Rs. 10,000/month. Use our <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline font-bold">TDS Calculator Nepal</Link> for exact TDS amounts on rent, contractor payments, and salary.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">PAN Registration and IRD Tax Filing in Nepal</h2>
            <p>To pay income tax in Nepal, every taxpayer needs a PAN (Permanent Account Number) issued by the Inland Revenue Department (IRD). PAN is mandatory for:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Employment (employer requires PAN for TDS)</li>
              <li>Opening a bank account above Rs. 1 lakh</li>
              <li>Property registration</li>
              <li>Vehicle registration</li>
              <li>Any business registration</li>
            </ul>
            <p>You can register for PAN online at <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a> or at any IRD office. Once registered, salaried employees with a single employer receive a QR-coded Online Tax Clearance Certificate automatically. Individuals with multiple income sources or business income must file returns through the IRD Taxpayer Portal.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Advance Tax and IRD Filing Deadlines</h2>
            <p>Salaried employees whose entire tax is deducted at source (TDS) by a single employer generally do not need to file a separate income tax return. However, individuals with additional income, business income, rental income, or capital gains must pay advance tax to the Inland Revenue Department in three installments:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>End of Poush (mid-January): Pay 40% of estimated annual tax</li>
              <li>End of Chaitra (mid-April): Pay 70% cumulative of estimated annual tax</li>
              <li>End of Ashad (mid-July): Pay 100% of actual total tax</li>
            </ul>
            <p>Late advance tax payment attracts 15% annual interest on the unpaid amount under Section 118 of the Income Tax Act. For NEPSE investment tax, use our <Link href="/calculator/nepse-bonus-tax/" className="text-blue-600 hover:underline font-bold">Capital Gains Tax Calculator</Link> or the <Link href="/calculator/nepse-wacc/" className="text-blue-600 hover:underline font-bold">NEPSE WACC Calculator</Link>.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Related Nepal Tax and Finance Calculators</h2>
            <ul className="list-none pl-0 space-y-2 mb-6">
              <li>👉 <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link> — Full salary breakdown with SSF, EPF, CIT, Dashain bonus and multi-year support including FY 2082/83 and 2083/84</li>
              <li>👉 <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline font-bold">TDS Calculator Nepal</Link> — TDS on salary, contractor payments, rent and commission</li>
              <li>👉 <Link href="/calculator/nepal-vat/" className="text-blue-600 hover:underline font-bold">Nepal VAT Calculator</Link> — 13% VAT calculation and IRD VAT fine estimation</li>
              <li>👉 <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline font-bold">Nepal TDS Calculator</Link> — Verify TDS deductions on your salary slip against IRD rates</li>
              <li>👉 <Link href="/calculator/nepal-home-loan/" className="text-blue-600 hover:underline font-bold">Nepal Home Loan Calculator</Link> — Monthly installments on property loans in Nepal</li>
              <li>👉 <Link href="/calculator/loan-emi/" className="text-blue-600 hover:underline font-bold">Auto Loan EMI Calculator</Link> — Vehicle financing installment calculator</li>
              <li>👉 <Link href="/calculator/nepal-provident-fund/" className="text-blue-600 hover:underline font-bold">Nepal Provident Fund Calculator</Link> — EPF and SSF contribution and maturity planning</li>
              <li>👉 <Link href="/calculator/gratuity-calculator/" className="text-blue-600 hover:underline font-bold">Gratuity Calculator Nepal</Link> — Gratuity calculation under Labour Act 2074</li>
              <li>👉 <Link href="/calculator/fd-calculator/" className="text-blue-600 hover:underline font-bold">FD Calculator Nepal</Link> — Fixed deposit maturity and interest calculation</li>
              <li>👉 <Link href="/calculator/nepse-wacc/" className="text-blue-600 hover:underline font-bold">NEPSE WACC Calculator</Link> — Weighted average acquisition cost for stock portfolio</li>
              <li>👉 <Link href="/calculator/cagr-calculator/" className="text-blue-600 hover:underline font-bold">CAGR Calculator</Link> — Compound annual growth rate for investments</li>
              <li>👉 <Link href="/calculator/nepse-bonus-tax/" className="text-blue-600 hover:underline font-bold">Capital Gains Tax Calculator</Link> — Calculate tax on your stock market gains</li>
              <li>👉 <Link href="/calculator/nepal-land/" className="text-blue-600 hover:underline font-bold">Nepal Land Area Converter</Link> — Ropani, Aana, Dhur and Katha conversion</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-6 faq-section">Income Tax FAQ — Nepal 2083/84</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the income tax slab for Nepal 2083/84?</h3>
                <p>Nepal's income tax slab for FY 2083/84 has five progressive bands for all resident individuals under the Finance Act 2083: 1% up to Rs. 10 lakh, 10% on Rs. 10–15 lakh, 20% on Rs. 15–25 lakh, 27% on Rs. 25–40 lakh, and 29% above Rs. 40 lakh. The Finance Act 2083 eliminated separate slabs for single and married individuals, unifying all resident taxpayers under one structure.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">Is income up to Rs. 10 lakh tax-free in Nepal 2083/84?</h3>
                <p>Income up to Rs. 10 lakh is not completely tax-free in Nepal 2083/84 — it is taxed at 1% as the Social Security Tax, meaning a maximum of Rs. 10,000 annual tax on Rs. 10 lakh income. However, SSF contributors are fully exempt from this 1% tax, making the effective rate 0% on the first Rs. 10 lakh for Social Security Fund members.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the IRD tax calculator Nepal?</h3>
                <p>The IRD tax calculator Nepal refers to tools that apply the official Inland Revenue Department (IRD) progressive tax slabs to your net assessable income. The NepaCalc Income Tax Calculator Nepal follows official IRD rates for FY 2083/84, including SSF exemption, EPF deductions, CIT contributions, insurance deductions, and the 10% female employee tax rebate.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">How much income tax do I pay on Rs. 50,000 monthly salary in Nepal?</h3>
                <p>On a Rs. 50,000 monthly salary (Rs. 6 lakh/year) with no deductions, you pay Rs. 6,000 per year (Rs. 500/month) at the 1% Social Security Tax slab for FY 2083/84. If you are an SSF contributor, this becomes Rs. 0 as the first slab is fully waived. If you are a female employee (non-SSF), the 10% rebate reduces annual tax to Rs. 5,400 (Rs. 450/month).</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the female tax rebate in Nepal income tax?</h3>
                <p>The female tax rebate in Nepal income tax is a 10% reduction on the total calculated income tax liability for resident female employees whose only source of income is employment. This rebate is applied after the full progressive slab calculation — for example, a female employee with Rs. 20,000 calculated tax pays Rs. 18,000 after the rebate.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is SSF exemption in Nepal income tax?</h3>
                <p>The SSF exemption in Nepal income tax means that employees or self-employed individuals who contribute to the Social Security Fund (SSF) are completely exempt from the 1% Social Security Tax on the first Rs. 10 lakh of taxable income for FY 2083/84. This saves a maximum of Rs. 10,000 per year in income tax.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">What deductions can I claim for income tax in Nepal?</h3>
                <p>For FY 2083/84, Nepal income tax deductions include: retirement contributions to SSF, EPF, or CIT combined (capped at Rs. 5 lakh or 1/3 of gross income, whichever is lower), life insurance premiums (up to Rs. 40,000), and health or medical insurance premiums (up to Rs. 20,000). These deductions reduce gross income before the progressive slab rates are applied.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the difference between Nepal income tax 2082/83 and 2083/84?</h3>
                <p>The main differences between Nepal income tax 2082/83 and 2083/84 are: the 1% threshold doubled from Rs. 5 lakh (single) or Rs. 6 lakh (married) to Rs. 10 lakh for all individuals, the top marginal rate dropped from 39% to 29%, the number of slabs reduced from six to five, and the separate single/married classification was eliminated. These changes are effective from Shrawan 1, 2083 (mid-July 2026) pending Finance Act 2083 gazette publication.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">How is TDS calculated on salary in Nepal?</h3>
                <p>TDS on salary in Nepal is calculated by your employer each month as follows: estimate annual gross income, subtract eligible deductions to find Net Assessable Income, apply FY 2083/84 progressive slab rates to find annual tax liability, subtract female rebate if applicable, then divide by 12 to get monthly TDS. Use our <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline font-bold">TDS Calculator Nepal</Link> to verify your exact monthly deduction.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the non-resident income tax rate in Nepal?</h3>
                <p>Non-resident individuals pay a flat 25% income tax rate on all Nepal-source income under the Income Tax Act 2058. Non-residents do not qualify for progressive slab benefits, deductions, SSF exemption, or the female rebate that apply to resident individuals.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">Can I download a Nepal income tax calculator excel or PDF?</h3>
                <p>The Income Tax Calculator Nepal on this page works directly in your browser without requiring any download. If you need an offline version, <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a> provides official Excel-format salary tax computation sheets. This calculator automatically applies FY 2083/84 slabs and updates whenever Finance Act changes are published.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the income tax rate in Nepal for 2080/81?</h3>
                <p>For FY 2080/81, Nepal income tax had six progressive slabs for individuals. Single filers paid 1% up to Rs. 4 lakh, and the top rate was 36% above Rs. 20 lakh. The key difference from FY 2083/84 is that the threshold was much lower and the top rate significantly higher. Use the <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link> to calculate retroactive tax for FY 2080/81.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">Is there a Nepal salary tax calculator for 2082/83?</h3>
                <p>Yes. The <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link> supports both FY 2082/83 and FY 2083/84 calculations. For 2082/83, it applies the 6-slab structure with separate single (1% up to Rs. 5 lakh, 39% top rate) and married (1% up to Rs. 6 lakh) tax bands. For 2083/84, it applies the unified 5-slab Finance Act 2083 structure.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is advance tax in Nepal?</h3>
                <p>Advance tax in Nepal is a system where taxpayers with business income or multiple income sources pay estimated annual tax in three mandatory installments to the Inland Revenue Department (IRD): 40% by end of Poush, 70% by end of Chaitra, and 100% by end of Ashad. Salaried employees with a single employer are generally exempt from advance tax filing as TDS covers their obligation.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the business income tax rate in Nepal 2083/84?</h3>
                <p>Standard companies in Nepal pay 25% income tax on net profit for FY 2083/84. Banks, financial institutions, insurance companies, and telecom companies pay 30%. Special industries such as manufacturing and export businesses may qualify for a reduced 20% rate. Self-employed individuals pay personal income tax at the same progressive slab rates as salaried employees.</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Official Data Sources and E-E-A-T</h2>
            <p>This Income Tax Calculator Nepal is maintained using publicly available data from:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Inland Revenue Department (IRD) Nepal — <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a></li>
              <li>Finance Act 2083 (FY 2083/84 Budget)</li>
              <li>Budget Speech: Finance Minister Dr. Swarnim Wagle, Jestha 15, 2083 (May 29, 2026)</li>
              <li>Income Tax Act 2058 BS (as amended through 2083)</li>
            </ul>
            <p className="text-sm">Last Updated: Shrawan 2083 (July 2026)</p>
            <p className="text-sm">Figures on this page reflect the Finance Act 2083 as announced in the budget. Final gazette-notified rates may vary slightly. Verify current rates at <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a> before filing.</p>

            <div className="sr-only" aria-hidden="true">
              Income Tax Calculator Nepal. IRD Tax Calculator Nepal. Tax Calculator Nepal. 
              Nepal Income Tax Slab 2083/84. New Tax Slab Nepal 2083 84. 
              Inland Revenue Department Nepal. IRD Nepal. Finance Act 2083.
              Nepal Salary Tax Calculator. Salary Tax Calculator Nepal. 
              TDS Calculator Nepal. SSF Nepal. EPF Nepal. CIT Nepal. 
              Income Tax Nepal 2083/84. Tax Slab Nepal 2083/84. 
              Net Assessable Income Nepal. Taxable Income Nepal.
              IRD Annual Tax Calculator. Taxcalculator Nepal.
              Income Tax 2083/84 Nepal. Shrawan 2083. FY 2083/84. FY 2026/27.
              Business Income Tax Nepal. Corporate Tax Nepal.
              PAN Registration Nepal. IRD Taxpayer Portal.
              Female Tax Rebate Nepal. SSF Exemption Nepal.
              Advance Tax Nepal. Tax Deducted at Source Nepal.
              Income Tax Rate Nepal 2080/81. Income Tax Rate Nepal 2082/83.
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
