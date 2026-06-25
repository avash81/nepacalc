import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: "How to Calculate Income Tax in Nepal (2083/84 Guide)",
  description: "Learn how to calculate income tax in Nepal step by step using FY 2083/84 IRD slabs, deductions, SSF exemption and worked salary examples for any income level.",
  slug: 'income-tax/how-to-calculate-income-tax-nepal',
  canonical: '/income-tax/how-to-calculate-income-tax-nepal/',
  keywords: [
    "how to calculate income tax in nepal",
    "income tax calculation nepal",
    "income tax formula nepal",
    "how to calculate salary tax nepal",
    "TDS calculation nepal",
    "nepal income tax 2083/84",
    "IRD tax calculation nepal"
  ],
  ogImage: 'https://nepacalc.com/images/how-to-calculate-income-tax-nepal-2083-84.webp'
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Income Tax", "item": "https://nepacalc.com/income-tax/" },
      { "@type": "ListItem", "position": 3, "name": "How to Calculate Income Tax in Nepal", "item": "https://nepacalc.com/income-tax/how-to-calculate-income-tax-nepal/" }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/income-tax/how-to-calculate-income-tax-nepal/",
    "url": "https://nepacalc.com/income-tax/how-to-calculate-income-tax-nepal/",
    "name": "How to Calculate Income Tax in Nepal (FY 2083/84)",
    "description": "Step-by-step guide to calculating income tax in Nepal for FY 2083/84. IRD progressive slabs, deduction rules, SSF exemption, formula and worked salary examples.",
    "inLanguage": "en-NP",
    "datePublished": "2026-07-01",
    "dateModified": "2026-07-01",
    "isPartOf": { "@type": "WebSite", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".quick-answer", ".formula-block", ".step-guide", ".faq-section"]
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Income Tax in Nepal (FY 2083/84)",
    "description": "Complete step-by-step method for calculating personal income tax in Nepal for fiscal year 2083/84 using official IRD progressive slabs and Finance Act 2083 deduction rules.",
    "totalTime": "PT10M",
    "supply": [
      { "@type": "HowToSupply", "name": "Annual gross salary figure" },
      { "@type": "HowToSupply", "name": "SSF/EPF/CIT contribution amount" },
      { "@type": "HowToSupply", "name": "Insurance premium amounts" }
    ],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Calculate total annual gross income", "text": "Multiply monthly basic salary by 12 and add all allowances and annual bonuses including Dashain bonus." },
      { "@type": "HowToStep", "position": 2, "name": "Calculate retirement contribution deduction", "text": "Sum SSF, EPF, and CIT contributions. Apply cap: deduct the lower of actual contribution, Rs. 5,00,000, or one-third of gross income." },
      { "@type": "HowToStep", "position": 3, "name": "Add insurance deductions", "text": "Add life insurance premium paid up to Rs. 40,000 and health insurance premium paid up to Rs. 20,000." },
      { "@type": "HowToStep", "position": 4, "name": "Calculate Net Assessable Income", "text": "Subtract retirement deduction and insurance deductions from gross annual income. The result is your Net Assessable Income (NAI)." },
      { "@type": "HowToStep", "position": 5, "name": "Check SSF status", "text": "If you contribute to SSF, Band 1 tax is waived (0%). If not, Band 1 applies at 1%." },
      { "@type": "HowToStep", "position": 6, "name": "Apply Band 1 — 1% on first Rs. 10 lakh", "text": "If NAI is below Rs. 10 lakh: NAI × 1%. If NAI exceeds Rs. 10 lakh: Rs. 10,00,000 × 1% = Rs. 10,000. Skip this step if SSF contributor." },
      { "@type": "HowToStep", "position": 7, "name": "Apply Band 2 — 10% on Rs. 10–15 lakh", "text": "Only if NAI exceeds Rs. 10 lakh. Taxable amount = NAI minus Rs. 10 lakh (max Rs. 5 lakh). Band 2 tax = taxable amount × 10%." },
      { "@type": "HowToStep", "position": 8, "name": "Apply Band 3 — 20% on Rs. 15–25 lakh", "text": "Only if NAI exceeds Rs. 15 lakh. Taxable amount = NAI minus Rs. 15 lakh (max Rs. 10 lakh). Band 3 tax = taxable amount × 20%." },
      { "@type": "HowToStep", "position": 9, "name": "Apply Band 4 — 27% on Rs. 25–40 lakh", "text": "Only if NAI exceeds Rs. 25 lakh. Taxable amount = NAI minus Rs. 25 lakh (max Rs. 15 lakh). Band 4 tax = taxable amount × 27%." },
      { "@type": "HowToStep", "position": 10, "name": "Apply Band 5 — 29% above Rs. 40 lakh", "text": "Only if NAI exceeds Rs. 40 lakh. Taxable amount = NAI minus Rs. 40 lakh. Band 5 tax = taxable amount × 29%." },
      { "@type": "HowToStep", "position": 11, "name": "Sum all band results", "text": "Total Annual Tax = Band 1 + Band 2 + Band 3 + Band 4 + Band 5." },
      { "@type": "HowToStep", "position": 12, "name": "Apply female rebate if eligible", "text": "If you are a resident female employee with only salary income, reduce total annual tax by 10%." },
      { "@type": "HowToStep", "position": 13, "name": "Calculate monthly TDS", "text": "Monthly TDS = Annual Tax divided by 12." },
      { "@type": "HowToStep", "position": 14, "name": "Verify with calculator", "text": "Use the Income Tax Calculator Nepal at nepacalc.com/calculator/nepal-income-tax/ to confirm your manual calculation." }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to calculate income tax in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "To calculate income tax in Nepal for FY 2083/84: subtract SSF/EPF/CIT deductions (capped at Rs. 5 lakh or 1/3 of income) and insurance premiums from gross annual income for Net Assessable Income, then apply progressive slab rates — 1% up to Rs. 10 lakh, 10% on Rs. 10–15 lakh, 20% on Rs. 15–25 lakh, 27% on Rs. 25–40 lakh, 29% above Rs. 40 lakh. SSF contributors skip the 1% band. Female salary-only employees reduce final tax by 10%." }
      },
      {
        "@type": "Question",
        "name": "What is the formula to calculate income tax in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Nepal income tax formula for FY 2083/84: NAI = Gross Income minus Deductions. Annual Tax = [NAI up to Rs. 10L × 1%] + [next Rs. 5L × 10%] + [next Rs. 10L × 20%] + [next Rs. 15L × 27%] + [above Rs. 40L × 29%]. Monthly TDS = Annual Tax divided by 12. SSF contributors use 0% for the first band." }
      },
      {
        "@type": "Question",
        "name": "How much tax will I pay if my salary is Rs. 1 lakh per month in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "On Rs. 1 lakh monthly salary (Rs. 12 lakh/year) with no deductions in FY 2083/84: Rs. 10,000 (1% on first Rs. 10 lakh) + Rs. 20,000 (10% on next Rs. 2 lakh) = Rs. 30,000 annual tax (Rs. 2,500/month). SSF contributors pay Rs. 20,000/year (Rs. 1,667/month)." }
      },
      {
        "@type": "Question",
        "name": "How to calculate salary tax in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "To calculate salary tax in Nepal: add monthly basic, allowances, and bonuses for annual gross income. Subtract SSF/EPF/CIT (cap: Rs. 5 lakh or 1/3 of gross) and insurance premiums for Net Assessable Income. Apply FY 2083/84 progressive slabs progressively. Apply 10% female rebate if eligible. Divide by 12 for monthly TDS." }
      },
      {
        "@type": "Question",
        "name": "What is the biggest mistake when calculating income tax in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "The most common mistake is applying the slab rate to total income rather than progressively. Each slab rate applies only to the portion of income falling within that specific band. For example, at Rs. 18 lakh NAI, only the Rs. 15–18 lakh portion is taxed at 20%, not the entire Rs. 18 lakh." }
      },
      {
        "@type": "Question",
        "name": "How is TDS calculated on salary in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "TDS on salary in Nepal is calculated by estimating the employee's annual tax using the FY 2083/84 IRD progressive slabs after all eligible deductions, applying the female rebate if applicable, then dividing by 12 to find the monthly TDS deduction. Employers deposit this amount with the IRD each month." }
      },
      {
        "@type": "Question",
        "name": "How do self-employed individuals calculate income tax in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Self-employed individuals in Nepal use the same FY 2083/84 progressive slab rates as salaried employees but subtract business expenses from gross business income first. They pay advance tax in three installments to the IRD: 40% by end of Poush, 70% by end of Chaitra, and 100% by end of Ashad. IT freelancers earning foreign currency may qualify for a flat 5% rate on income up to Rs. 40 lakh." }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Calculate Income Tax in Nepal (FY 2083/84)",
    "description": "Complete step-by-step guide to calculating personal income tax in Nepal for FY 2083/84. IRD slabs, deductions, SSF exemption, formula and worked examples.",
    "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": { "@type": "Organization", "name": "NepaCalc", "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" } },
    "datePublished": "2026-07-01",
    "dateModified": "2026-07-01",
    "mainEntityOfPage": "https://nepacalc.com/income-tax/how-to-calculate-income-tax-nepal/",
    "keywords": ["how to calculate income tax in nepal", "income tax calculation nepal", "income tax formula nepal", "how to calculate salary tax nepal", "TDS calculation nepal", "nepal income tax 2083/84", "IRD tax calculation nepal"]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="bg-[#F1F3F4] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex text-sm text-slate-500 space-x-2">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><span className="mx-2">&gt;</span></li>
              <li><Link href="/income-tax/" className="hover:text-blue-600">Income Tax</Link></li>
              <li><span className="mx-2">&gt;</span></li>
              <li className="text-slate-700 font-semibold" aria-current="page">How to Calculate Income Tax in Nepal</li>
            </ol>
          </nav>

          <main className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
            
            <h1 className="text-3xl font-black text-slate-900 mb-6">How to Calculate Income Tax in Nepal (FY 2083/84)</h1>

            <div className="bg-slate-50 border-l-4 border-blue-600 p-4 mb-6 not-prose">
              <p className="text-sm text-slate-700 m-0">📅 <strong>Last Updated:</strong> Shrawan 2083 (July 2026) — Finance Act 2083</p>
              <p className="text-sm text-slate-700 m-0">✍️ <strong>Reviewed by:</strong> NepaCalc Research Team</p>
              <p className="text-sm text-slate-700 m-0">📍 <strong>Applies to:</strong> All resident individuals in Nepal, FY 2083/84</p>
            </div>

            <p>Learning how to calculate income tax in Nepal is essential for every salaried employee, self-employed professional, and business owner. Nepal uses a progressive income tax system administered by the Inland Revenue Department (IRD), where different portions of your income are taxed at different rates. The FY 2083/84 Finance Act introduced a completely unified 5-band structure — making the calculation simpler than previous years. This guide walks through every step with formulas, worked examples across multiple salary levels, and common mistakes to avoid.</p>
            
            <p><strong>Skip to calculator:</strong> Use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline font-bold">Income Tax Calculator Nepal</Link> to get your exact result instantly.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">How Income Tax Works in Nepal — Quick Answer</h2>
            
            <div className="quick-answer space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">How is income tax calculated in Nepal?</h3>
                <p>Income tax in Nepal is calculated progressively using the FY 2083/84 IRD slabs. First subtract eligible deductions (SSF/EPF/CIT up to Rs. 5 lakh or 1/3 of income, life insurance up to Rs. 40,000, health insurance up to Rs. 20,000) from gross annual income to find Net Assessable Income, then apply each slab rate only to the portion of income that falls within that band. Sum all slab results for total annual tax.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">What is the formula to calculate income tax in Nepal?</h3>
                <p>The income tax formula for Nepal FY 2083/84 is:</p>
                <div className="bg-slate-100 p-4 rounded-lg my-3 font-mono text-sm not-prose border border-slate-200">
                  <p>Net Assessable Income (NAI) = Gross Annual Income − Eligible Deductions</p>
                  <p className="mt-2">Annual Tax = [NAI up to Rs. 10L × 1%] + [NAI Rs. 10–15L × 10%] + [NAI Rs. 15–25L × 20%] + [NAI Rs. 25–40L × 27%] + [NAI above Rs. 40L × 29%] − Female Rebate (10% if applicable)</p>
                  <p className="mt-2">Monthly TDS = Annual Tax ÷ 12</p>
                </div>
                <p>SSF exception: If you contribute to the Social Security Fund (SSF), the first band [NAI up to Rs. 10L × 1%] becomes zero.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">How much tax will I pay if my salary is Rs. 1 lakh per month?</h3>
                <p>On Rs. 1 lakh monthly salary (Rs. 12 lakh/year) with no deductions: Rs. 10,000 (1% on first Rs. 10 lakh) + Rs. 20,000 (10% on next Rs. 2 lakh) = Rs. 30,000 annual tax (Rs. 2,500/month). If you are an SSF contributor: Rs. 20,000/year (Rs. 1,667/month). See full worked examples below.</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4 step-guide">Complete Step-by-Step Guide to Calculating Nepal Income Tax</h2>
            <p>Follow these 14 steps exactly to calculate your income tax manually for FY 2083/84.</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 1 — Calculate Total Annual Gross Income</h3>
                <p>Add all income components:</p>
                <ul className="list-disc pl-5 mb-2 text-sm">
                  <li>Monthly basic salary × 12</li>
                  <li>All fixed monthly allowances × 12</li>
                  <li>Festival bonuses (Dashain, Tihar — typically one month's basic)</li>
                  <li>Performance bonuses received during the year</li>
                  <li>Any other taxable allowances</li>
                </ul>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong> Monthly basic Rs. 80,000 + allowances Rs. 20,000 = Rs. 1,00,000/month<br/>Annual gross = Rs. 1,00,000 × 12 + Rs. 80,000 Dashain bonus = Rs. 12,80,000</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 2 — Calculate Retirement Contribution Deduction</h3>
                <p>Add your contributions to approved retirement funds:</p>
                <ul className="list-disc pl-5 mb-2 text-sm">
                  <li>Social Security Fund (SSF)</li>
                  <li>Employee Provident Fund (EPF)</li>
                  <li>Citizen Investment Trust (CIT)</li>
                </ul>
                <p>Apply the cap: deduct the LOWER of:<br/>(a) Your actual total retirement contribution<br/>(b) One-third (1/3) of your gross annual income<br/>(c) Rs. 5,00,000 maximum</p>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong> EPF contribution Rs. 96,000/year. One-third of Rs. 12,80,000 = Rs. 4,26,667.<br/>Deduction = Rs. 96,000 (lowest of the three).</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 3 — Calculate Insurance Premium Deductions</h3>
                <p>Add deductible insurance premiums:</p>
                <ul className="list-disc pl-5 mb-2 text-sm">
                  <li>Life insurance premium paid: deduct actual amount up to Rs. 40,000</li>
                  <li>Health/medical insurance premium paid: deduct actual amount up to Rs. 20,000</li>
                </ul>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong> Life insurance Rs. 36,000/year + health insurance Rs. 15,000/year = Rs. 51,000 total.<br/>Deduction = Rs. 51,000 (both within caps so full amount deducted).</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 4 — Calculate Net Assessable Income (NAI)</h3>
                <p>Subtract all deductions from gross:<br/>NAI = Gross Annual Income − Retirement Deduction − Insurance Deductions</p>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong><br/>NAI = Rs. 12,80,000 − Rs. 96,000 − Rs. 51,000 = Rs. 11,33,000</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 5 — Check SSF Status</h3>
                <p>If you or your employer contributes to the Social Security Fund (SSF):<br/>The entire 1% first-band tax is waived. Mark Band 1 as Rs. 0.</p>
                <p>If you do not contribute to SSF:<br/>Band 1 tax = Rs. 10,000 (1% on Rs. 10 lakh, or 1% of NAI if NAI is below Rs. 10 lakh).</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 6 — Apply Band 1 (1% on First Rs. 10 Lakh)</h3>
                <p>If NAI ≤ Rs. 10,00,000: Band 1 tax = NAI × 1%<br/>If NAI &gt; Rs. 10,00,000: Band 1 tax = Rs. 10,00,000 × 1% = Rs. 10,000</p>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong> (NAI = Rs. 11,33,000, non-SSF):<br/>Band 1 tax = Rs. 10,000</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 7 — Apply Band 2 (10% on Rs. 10–15 Lakh)</h3>
                <p>Only applies if NAI exceeds Rs. 10,00,000.<br/>Band 2 taxable amount = NAI − Rs. 10,00,000 (maximum Rs. 5,00,000)<br/>Band 2 tax = Band 2 taxable amount × 10%</p>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong> (NAI = Rs. 11,33,000):<br/>Band 2 taxable = Rs. 11,33,000 − Rs. 10,00,000 = Rs. 1,33,000<br/>Band 2 tax = Rs. 1,33,000 × 10% = Rs. 13,300</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 8 — Apply Band 3 (20% on Rs. 15–25 Lakh)</h3>
                <p>Only applies if NAI exceeds Rs. 15,00,000.<br/>Band 3 taxable amount = NAI − Rs. 15,00,000 (maximum Rs. 10,00,000)<br/>Band 3 tax = Band 3 taxable amount × 20%</p>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong> (NAI = Rs. 11,33,000): NAI does not reach Rs. 15 lakh. Band 3 = Rs. 0.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 9 — Apply Band 4 (27% on Rs. 25–40 Lakh)</h3>
                <p>Only applies if NAI exceeds Rs. 25,00,000.<br/>Band 4 taxable amount = NAI − Rs. 25,00,000 (maximum Rs. 15,00,000)<br/>Band 4 tax = Band 4 taxable amount × 27%</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 10 — Apply Band 5 (29% above Rs. 40 Lakh)</h3>
                <p>Only applies if NAI exceeds Rs. 40,00,000.<br/>Band 5 taxable amount = NAI − Rs. 40,00,000<br/>Band 5 tax = Band 5 taxable amount × 29%</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 11 — Sum All Band Results</h3>
                <p>Total Annual Tax = Band 1 + Band 2 + Band 3 + Band 4 + Band 5</p>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong><br/>Rs. 10,000 + Rs. 13,300 + Rs. 0 + Rs. 0 + Rs. 0 = Rs. 23,300/year</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 12 — Apply Female Rebate if Eligible</h3>
                <p>If you are a resident female employee whose ONLY income source is employment:<br/>Female Adjusted Tax = Total Annual Tax × 90% (i.e., reduce by 10%)</p>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong> (female employee, non-SSF):<br/>Rs. 23,300 × 90% = Rs. 20,970/year</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 13 — Calculate Monthly TDS</h3>
                <p>Monthly TDS = Annual Tax ÷ 12</p>
                <p className="text-sm bg-slate-50 p-2 rounded"><strong>Example:</strong><br/>Rs. 23,300 ÷ 12 = Rs. 1,942/month (non-SSF, non-female)<br/>Rs. 13,300 ÷ 12 = Rs. 1,108/month (SSF contributor, same salary)</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 14 — Verify with the Calculator</h3>
                <p>Use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline font-bold">Income Tax Calculator Nepal</Link> to confirm your manual calculation. Enter gross monthly salary, SSF status, retirement contributions, and insurance premiums for an instant verified result.</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Income Tax Calculation Formula Summary</h2>
            <p>For quick reference, here is the complete Nepal income tax formula for FY 2083/84:</p>

            <div className="formula-block bg-slate-800 text-green-400 p-6 rounded-lg font-mono text-sm shadow-md not-prose mb-6">
              <p className="text-white mb-1">Step A — Net Assessable Income:</p>
              <p className="mb-4">NAI = Gross Annual Income − min(Retirement Contributions, Rs. 5L, 1/3 × Gross) − Life Insurance (max Rs. 40K) − Health Insurance (max Rs. 20K)</p>

              <p className="text-white mb-1">Step B — Progressive Tax:</p>
              <p className="mb-1">Tax = [min(NAI, 10L) × 1%*]</p>
              <p className="ml-8 mb-1">+ [max(0, min(NAI−10L, 5L)) × 10%]</p>
              <p className="ml-8 mb-1">+ [max(0, min(NAI−15L, 10L)) × 20%]</p>
              <p className="ml-8 mb-1">+ [max(0, min(NAI−25L, 15L)) × 27%]</p>
              <p className="ml-8 mb-4">+ [max(0, NAI−40L) × 29%]</p>
              <p className="text-slate-400 mb-4 italic">*Replace 1% with 0% if SSF contributor</p>

              <p className="text-white mb-1">Step C — Female Rebate:</p>
              <p className="mb-4">If female salary-only employee: Final Tax = Tax × 0.90</p>

              <p className="text-white mb-1">Step D — Monthly TDS:</p>
              <p>Monthly TDS = Final Tax ÷ 12</p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Worked Examples — How to Calculate Income Tax for Every Salary Level</h2>
            <p>These examples show how to calculate income tax in Nepal across common salary ranges using FY 2083/84 IRD slabs.</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Example 1 — Rs. 25,000/Month (Rs. 3 Lakh/Year)</h3>
                <p>No deductions. Non-SSF.</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 3,00,000</li>
                  <li>Band 1: Rs. 3,00,000 × 1% = Rs. 3,000/year (Rs. 250/month)</li>
                  <li>SSF contributor: Rs. 0/year</li>
                  <li>Female (non-SSF): Rs. 2,700/year (Rs. 225/month)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Example 2 — Rs. 50,000/Month (Rs. 6 Lakh/Year)</h3>
                <p>No deductions. Non-SSF.</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 6,00,000</li>
                  <li>Band 1: Rs. 6,00,000 × 1% = Rs. 6,000/year (Rs. 500/month)</li>
                  <li>SSF contributor: Rs. 0/year</li>
                  <li>Female (non-SSF): Rs. 5,400/year (Rs. 450/month)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Example 3 — Rs. 1,00,000/Month (Rs. 12 Lakh/Year)</h3>
                <p>EPF contribution: Rs. 72,000/year. Non-SSF.</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 12,00,000 − Rs. 72,000 = Rs. 11,28,000</li>
                  <li>Band 1: Rs. 10,00,000 × 1% = Rs. 10,000</li>
                  <li>Band 2: Rs. 1,28,000 × 10% = Rs. 12,800</li>
                  <li>Total: Rs. 22,800/year (Rs. 1,900/month)</li>
                  <li>SSF contributor (band 1 = 0): Rs. 12,800/year (Rs. 1,067/month)</li>
                  <li>Female non-SSF: Rs. 20,520/year (Rs. 1,710/month)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Example 4 — Rs. 1,50,000/Month (Rs. 18 Lakh/Year)</h3>
                <p>EPF Rs. 1,08,000/year. Non-SSF. Life insurance Rs. 30,000.</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 18,00,000 − Rs. 1,08,000 − Rs. 30,000 = Rs. 16,62,000</li>
                  <li>Band 1: Rs. 10,00,000 × 1% = Rs. 10,000</li>
                  <li>Band 2: Rs. 5,00,000 × 10% = Rs. 50,000</li>
                  <li>Band 3: Rs. 1,62,000 × 20% = Rs. 32,400</li>
                  <li>Total: Rs. 92,400/year (Rs. 7,700/month)</li>
                  <li>SSF contributor: Rs. 82,400/year (Rs. 6,867/month)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Example 5 — Rs. 3,00,000/Month (Rs. 36 Lakh/Year)</h3>
                <p>CIT Rs. 2,16,000/year. Non-SSF.</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 36,00,000 − Rs. 2,16,000 = Rs. 33,84,000</li>
                  <li>Band 1: Rs. 10,000</li>
                  <li>Band 2: Rs. 50,000</li>
                  <li>Band 3: Rs. 2,00,000</li>
                  <li>Band 4: Rs. 8,84,000 × 27% = Rs. 2,38,680</li>
                  <li>Total: Rs. 4,98,680/year (Rs. 41,557/month)</li>
                  <li>SSF contributor: Rs. 4,88,680/year (Rs. 40,723/month)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Example 6 — Rs. 5,00,000/Month (Rs. 60 Lakh/Year)</h3>
                <p>No deductions. Non-SSF.</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>NAI: Rs. 60,00,000</li>
                  <li>Band 1: Rs. 10,000</li>
                  <li>Band 2: Rs. 50,000</li>
                  <li>Band 3: Rs. 2,00,000</li>
                  <li>Band 4: Rs. 4,05,000</li>
                  <li>Band 5: Rs. 20,00,000 × 29% = Rs. 5,80,000</li>
                  <li>Total: Rs. 12,45,000/year (Rs. 1,03,750/month)</li>
                </ul>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Common Mistakes When Calculating Income Tax in Nepal</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Mistake 1 — Applying the Slab Rate to Total Income</h3>
                <p>The most common error. Nepal uses a PROGRESSIVE system — each rate applies ONLY to the income falling within that specific band, not to your full income.</p>
                <p className="text-sm bg-red-50 text-red-700 p-2 rounded mb-1"><strong>WRONG:</strong> Rs. 18 lakh × 20% = Rs. 3,60,000</p>
                <p className="text-sm bg-green-50 text-green-700 p-2 rounded"><strong>CORRECT:</strong> [Rs. 10L × 1%] + [Rs. 5L × 10%] + [Rs. 3L × 20%] = Rs. 10,000 + Rs. 50,000 + Rs. 60,000 = Rs. 1,20,000</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Mistake 2 — Not Subtracting SSF/EPF Before Applying Slabs</h3>
                <p>Retirement contributions reduce your gross income before slabs are applied. Forgetting this step means you calculate tax on a higher NAI than is correct.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Mistake 3 — Using Last Year's Slabs for FY 2083/84</h3>
                <p>The Finance Act 2083 doubled the first-band threshold from Rs. 5–6 lakh to Rs. 10 lakh and cut the top rate from 39% to 29%. Using FY 2082/83 slabs for 2083/84 payroll significantly overstates tax liability.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Mistake 4 — Forgetting the Female Rebate</h3>
                <p>Many payroll departments manually calculate and forget to apply the 10% female rebate. This results in female employees overpaying tax throughout the year.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Mistake 5 — Applying the EPF Deduction Without Checking the Cap</h3>
                <p>EPF deduction is capped at the LOWER of your actual contribution, Rs. 5 lakh, or one-third of gross income. High-income earners often hit the one-third cap before Rs. 5 lakh, making the cap the binding constraint.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Mistake 6 — Treating the 1% Band as Tax-Free for Non-SSF Employees</h3>
                <p>The 1% Social Security Tax applies to non-SSF employees on income up to Rs. 10 lakh. It is often mistakenly described as a "tax-free threshold" — it is a preferential rate, not a full exemption, unless SSF is active.</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">How Income Tax Differs for Self-Employed and Freelancers</h2>
            <p>Self-employed individuals and freelancers in Nepal calculate income tax using the same FY 2083/84 progressive slabs as salaried employees but with key differences:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>No employer deducts TDS — they must pay advance tax themselves</li>
              <li>Business expenses are deductible from gross business income before applying slabs</li>
              <li>IT and software freelancers earning convertible foreign currency may qualify for a flat 5% final withholding tax on up to Rs. 40 lakh</li>
              <li>Three advance tax installments to the Inland Revenue Department (IRD): 40% by end of Poush, 70% by end of Chaitra, 100% by end of Ashad</li>
            </ul>
            <p>For salary-based income tax calculations, use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline font-bold">Income Tax Calculator Nepal</Link>. For TDS on contractor and freelancer payments, use the <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline font-bold">TDS Calculator Nepal</Link>.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4 faq-section">How Income Tax Is Paid — TDS vs Self-Filing</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">TDS (Tax Deducted at Source) — For Salaried Employees</h3>
                <p>Employers deduct TDS from salary monthly using the calculation method described in this guide. The monthly deduction equals Annual Tax ÷ 12. Employers deposit the collected TDS with the IRD on behalf of employees. Salaried employees with a single employer generally do not need to file a separate tax return.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Advance Tax — For Business Owners and Self-Employed</h3>
                <p>Business owners and self-employed professionals must calculate and deposit estimated tax in three mandatory installments to the Inland Revenue Department. Late payment attracts 15% annual interest.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Filing Returns — When Required</h3>
                <p>Tax return filing with the IRD is required for individuals with multiple income sources, business income, rental income, capital gains from NEPSE share transactions, or foreign income. Returns are filed through the official IRD Taxpayer Portal at <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a>.</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Related Nepal Income Tax Tools</h2>
            <ul className="list-none pl-0 space-y-2 mb-6">
              <li>👉 <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline font-bold">Income Tax Calculator Nepal 2083/84</Link> — Calculate your exact annual and monthly tax instantly — no manual steps needed</li>
              <li>👉 <Link href="/income-tax/nepal-income-tax-slab-2083-84/" className="text-blue-600 hover:underline font-bold">Nepal Income Tax Slab 2083/84</Link> — Full slab tables, Finance Act 2083 changes, 2082/83 comparison</li>
              <li>👉 <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Nepal Salary Tax Calculator</Link> — Salary breakdown with SSF toggle, EPF, CIT, bonuses and Dashain inclusion</li>
              <li>👉 <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline font-bold">TDS Calculator Nepal</Link> — Monthly TDS on salary, contractor payments, rent and commissions</li>
              <li>👉 <Link href="/calculator/nepal-provident-fund/" className="text-blue-600 hover:underline font-bold">Nepal Provident Fund Calculator</Link> — EPF and SSF contribution maturity and planning</li>
              <li>👉 <Link href="/calculator/gratuity-calculator/" className="text-blue-600 hover:underline font-bold">Gratuity Calculator Nepal</Link> — Gratuity calculation under Labour Act 2074</li>
              <li>👉 <Link href="/calculator/fd-calculator/" className="text-blue-600 hover:underline font-bold">FD Calculator Nepal</Link> — Fixed deposit maturity and interest for tax-year savings planning</li>
              <li>👉 <Link href="/calculator/nepse-wacc/" className="text-blue-600 hover:underline font-bold">NEPSE WACC Calculator</Link> — Investment cost basis for capital gains planning</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Data Sources and Official References</h2>
            <p>This guide is based on publicly available data from:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Inland Revenue Department (IRD) Nepal — <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a></li>
              <li>Finance Act 2083 — FY 2083/84 Budget</li>
              <li>Budget Speech: Finance Minister Dr. Swarnim Wagle, Jestha 15, 2083 (May 29, 2026)</li>
              <li>Income Tax Act 2058 BS (as amended through 2083)</li>
              <li>IRD Employer TDS Filing Guidelines</li>
            </ul>
            <p className="text-sm">Last Updated: Shrawan 2083 (July 2026)</p>
            <p className="text-sm">Verify final gazette-notified rates at <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">ird.gov.np</a> before formal payroll or filing.</p>

            <div className="sr-only" aria-hidden="true">
              How to Calculate Income Tax in Nepal. Income Tax Calculation Nepal.
              Income Tax Formula Nepal. Tax Calculation Nepal 2083/84.
              How to Calculate Salary Tax Nepal. How to Figure Out IRD.
              How to Calculate Tax Amount Nepal. How is Income Tax Calculated Nepal.
              Nepal Income Tax Calculation Steps. Progressive Tax Calculation Nepal.
              Net Assessable Income Calculation. TDS Calculation Nepal Salary.
              Advance Tax Calculation Nepal. Self-Employed Tax Nepal.
              Freelancer Tax Nepal. Income Tax Nepal 2083/84. FY 2083/84.
              IRD Nepal Tax Calculation. Finance Act 2083. Shrawan 2083.
              SSF Exemption Calculation Nepal. EPF Deduction Nepal Income Tax.
              Female Rebate Calculation Nepal. Monthly TDS Nepal.
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
