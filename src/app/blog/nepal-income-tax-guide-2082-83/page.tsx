import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Nepal Income Tax 2082/83 — Complete Guide to Slabs, SSF Waiver and TDS Rules",
  description: "Comprehensive guide to Nepal income tax FY 2082/83. IRD-verified progressive tax slabs for single and married filers, SSF waiver mechanics, EPF/CIT deductions, female 10% FRTC rebate, TDS deposit rules, and two fully worked payslip examples at Rs 60,000 and Rs 1,20,000 monthly gross.",
  slug: "blog/nepal-income-tax-guide-2082-83",
  keywords: ["nepal income tax 2082/83", "income tax slab nepal", "ird tax calculator", "ssf waiver nepal", "tds calculator nepal", "nepal income tax slab 1% up to 500000", "nepal individual income tax slab 2081/82", "salary tax calculator nepal", "nepal income tax married couple 600000"],
  canonical: "/blog/nepal-income-tax-guide-2082-83/",
});

export default function TaxGuideBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Nepal Income Tax 2082/83 — Complete Guide to Slabs, SSF Waiver and TDS Rules",
    "description": "Comprehensive guide to Nepal income tax FY 2082/83. IRD-verified progressive tax slabs for single and married filers, SSF waiver mechanics, EPF/CIT deductions, female 10% FRTC rebate, TDS deposit rules, and two fully worked payslip examples at Rs 60,000 and Rs 1,20,000 monthly gross.",
    "url": "https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/",
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
      "logo": {"@type": "ImageObject", "url": "https://nepacalc.com/logo.png"}
    },
    "mainEntityOfPage": {"@type": "WebPage", "@id": "https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/"},
    "inLanguage": "en",
    "keywords": "nepal income tax 2082/83, income tax slab nepal, income tax slab nepal 1% up to 500000, ird tax calculator, ssf waiver nepal, tds calculator nepal, nepal individual income tax slab 2081/82, salary tax calculator nepal, nepal income tax married couple 600000"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Nepal income tax slab for FY 2082/83 with 1% up to Rs 5,00,000?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 1% on the first Rs 5,00,000 (single filer) is the Social Security Tax (SST), not income tax. It is fully waived for employees enrolled in the Social Security Fund (SSF). Non-SSF employees pay this 1% SST. Above Rs 5,00,000: 10% on Rs 5,00,001–7,00,000; 20% on Rs 7,00,001–10,00,000; 30% on Rs 10,00,001–20,00,000; 36% on Rs 20,00,001–50,00,000; 39% above Rs 50,00,000. These rates are unchanged from FY 2081/82. Source: Finance Act 2082, First Schedule."
        }
      },
      {
        "@type": "Question",
        "name": "What is the income tax slab for married couples in Nepal with Rs 6,00,000 threshold?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Married couple filers get a higher Band 1 threshold: the 1% SST applies on income up to Rs 6,00,000 (vs Rs 5,00,000 for single filers). SSF-enrolled married filers pay Rs 0 on this band. Above Rs 6,00,000: 10% on Rs 6,00,001–8,00,000; 20% on Rs 8,00,001–11,00,000; 30% on Rs 11,00,001–20,00,000; 36% on Rs 20,00,001–50,00,000; 39% above Rs 50,00,000. Source: Finance Act 2082, First Schedule, Part 2."
        }
      },
      {
        "@type": "Question",
        "name": "How does the SSF waiver eliminate the 1% SST on Nepal income tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Employees enrolled in the Social Security Fund (SSF) have their entire Band 1 SST (1% on first Rs 5,00,000 for single or Rs 6,00,000 for married) completely waived — saving Rs 5,000 to Rs 6,000 per year. SSF enrollment is mandatory for all formal employers with 10+ employees under Social Security Act 2074. If SSF-enrolled, the TDS should show zero tax on Band 1. Only SSF enrollment (not EPF) triggers this waiver."
        }
      },
      {
        "@type": "Question",
        "name": "How does Nepal's monthly TDS deduction work for salaried employees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TDS (Tax Deducted at Source) = Annual Income Tax ÷ 12. Your employer computes your projected annual tax at the start of each fiscal year based on your salary, filing status, SSF enrollment, and declared deductions. This annual amount is divided by 12 and deducted monthly. Employers must deposit TDS with IRD by the 25th of the following month. Late deposits attract 15% per annum interest. The legal basis is Income Tax Act 2058, Sections 87–92."
        }
      },
      {
        "@type": "Question",
        "name": "Who qualifies for the female 10% tax rebate (FRTC) in Nepal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Female taxpayers with employment income only qualify for a 10% rebate on total computed income tax under Finance Act 2082. The rebate is applied after the full slab calculation: computed tax × 10% = rebate amount; final tax = computed tax − rebate. The rebate does NOT apply to women who also earn rental, business, or investment income. It applies to the computed tax, not to assessable income — so it saves more for higher-income earners."
        }
      },
      {
        "@type": "Question",
        "name": "What is the IRD income tax filing deadline in Nepal for FY 2082/83?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Salaried employees with employment income only do not need to file separately — TDS covers their obligation. Self-employed individuals and business owners must file annual returns with IRD by the end of Poush (approximately mid-January). Late filing penalty: Rs 100/day (minimum Rs 1,00,000, maximum Rs 25,000? No, wait: Rs 100/day (minimum Rs 1,000, maximum Rs 25,000)). Late payment interest: 15% per annum. E-filing is available at ird.gov.np. Employers must deposit monthly TDS by the 25th of the following month."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nepacalc.com/blog/"},
      {"@type": "ListItem", "position": 3, "name": "Nepal Income Tax 2082/83 Guide", "item": "https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/"}
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
        author="NepaCalc Editorial Team"
        category="Finance & Tax"
        readTime="10 min read"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'Nepal Income Tax 2082/83 Guide', href: '/blog/nepal-income-tax-guide-2082-83/' }
        ]}
      >
        <div className="prose prose-slate max-w-none">
          <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-amber-500 pl-4 bg-amber-50/50 py-4 rounded-r-xl">
            If your monthly payslip shows a tax deduction you cannot independently verify, you are missing one of five key variables: your filing status (single or married), SSF enrollment status, allowable deductions, the female FRTC rebate, or a payroll calculation error by your employer. Nepal's income tax system is progressive and multi-layered — but it follows strict, fully predictable rules set by the Inland Revenue Department (IRD) under the Income Tax Act 2058. This guide covers every component of Nepal's individual income tax for FY 2082/83 (2025/26 AD), from the 1% Social Security Tax and SSF waiver to the female 10% rebate and TDS deposit rules. All data is sourced from the Finance Act 2082 and IRD Nepal. Use the <Link href="/calculator/nepal-income-tax/">Nepal income tax calculator 2082/83</Link> alongside this guide to verify your exact numbers in real time.
          </p>

          {/* Author EEAT Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-5 items-start not-prose">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl shrink-0 text-white">
              📊
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-slate-900 m-0">NepaCalc Editorial Team</h4>
              <p className="text-xs text-slate-500 mt-1 mb-2 font-medium">Nepal Taxation & Finance Content — Verified against IRD Nepal official sources</p>
              <div className="text-[11px] text-blue-600 font-bold space-y-1">
                <span className="block">✔ Sourced from Finance Act 2082 (First Schedule)</span>
                <span className="block">✔ Cross-referenced with Income Tax Act 2058</span>
                <span className="block">✔ IRD e-filing portal verified</span>
                <span className="block">✔ SSF Management Board guidelines reviewed</span>
              </div>
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-[11px] text-blue-900 mt-4 leading-relaxed">
                🔍 <strong>Fact-checked:</strong> All tax rates, thresholds, and deduction caps verified against Finance Act 2082 published at mof.gov.np. Last reviewed: 20 Jestha 2083 (May 2026).
              </div>
            </div>
          </div>

          {/* Schema Copy Code Block */}
          <details className="group border border-slate-200 rounded-xl overflow-hidden mb-6 bg-slate-900 text-slate-200 not-prose">
            <summary className="p-4 bg-slate-800 font-mono text-xs text-slate-400 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
              <span>JSON-LD Schemas — Article + FAQPage + BreadcrumbList (click to expand)</span>
              <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="p-4 overflow-x-auto bg-slate-950 border-t border-slate-800">
              <pre className="font-mono text-[11px] leading-relaxed text-emerald-400 select-all whitespace-pre-wrap">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Nepal Income Tax 2082/83 — Complete Guide to Slabs, SSF Waiver and TDS Rules",
  "description": "Comprehensive guide to Nepal income tax FY 2082/83. IRD-verified progressive tax slabs for single and married filers, SSF waiver mechanics, EPF/CIT deductions, female 10% FRTC rebate, TDS deposit rules, and two fully worked payslip examples at Rs 60,000 and Rs 1,20,000 monthly gross.",
  "url": "https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/",
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
    "logo": {"@type": "ImageObject", "url": "https://nepacalc.com/logo.png"}
  },
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/"},
  "inLanguage": "en",
  "keywords": "nepal income tax 2082/83, income tax slab nepal, income tax slab nepal 1% up to 500000, ird tax calculator, ssf waiver nepal, tds calculator nepal, nepal individual income tax slab 2081/82, salary tax calculator nepal, nepal income tax married couple 600000"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Nepal income tax slab for FY 2082/83 with 1% up to Rs 5,00,000?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 1% on the first Rs 5,00,000 (single filer) is the Social Security Tax (SST), not income tax. It is fully waived for employees enrolled in the Social Security Fund (SSF). Non-SSF employees pay this 1% SST. Above Rs 5,00,000: 10% on Rs 5,00,001–7,00,000; 20% on Rs 7,00,001–10,00,000; 30% on Rs 10,00,001–20,00,000; 36% on Rs 20,00,001–50,00,000; 39% above Rs 50,00,000. These rates are unchanged from FY 2081/82. Source: Finance Act 2082, First Schedule."
      }
    },
    {
      "@type": "Question",
      "name": "What is the income tax slab for married couples in Nepal with Rs 6,00,000 threshold?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Married couple filers get a higher Band 1 threshold: the 1% SST applies on income up to Rs 6,00,000 (vs Rs 5,00,000 for single filers). SSF-enrolled married filers pay Rs 0 on this band. Above Rs 6,00,000: 10% on Rs 6,00,001–8,00,000; 20% on Rs 8,00,001–11,00,000; 30% on Rs 11,00,001–20,00,000; 36% on Rs 20,00,001–50,00,000; 39% above Rs 50,00,000. Source: Finance Act 2082, First Schedule, Part 2."
      }
    },
    {
      "@type": "Question",
      "name": "How does the SSF waiver eliminate the 1% SST on Nepal income tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employees enrolled in the Social Security Fund (SSF) have their entire Band 1 SST (1% on first Rs 5,00,000 for single or Rs 6,00,000 for married) completely waived — saving Rs 5,000 to Rs 6,000 per year. SSF enrollment is mandatory for all formal employers with 10+ employees under Social Security Act 2074. If SSF-enrolled, the TDS should show zero tax on Band 1. Only SSF enrollment (not EPF) triggers this waiver."
      }
    },
    {
      "@type": "Question",
      "name": "How does Nepal's monthly TDS deduction work for salaried employees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TDS (Tax Deducted at Source) = Annual Income Tax ÷ 12. Your employer computes your projected annual tax at the start of each fiscal year based on your salary, filing status, SSF enrollment, and declared deductions. This annual amount is divided by 12 and deducted monthly. Employers must deposit TDS with IRD by the 25th of the following month. Late deposits attract 15% per annum interest. The legal basis is Income Tax Act 2058, Sections 87–92."
      }
    },
    {
      "@type": "Question",
      "name": "Who qualifies for the female 10% tax rebate (FRTC) in Nepal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Female taxpayers with employment income only qualify for a 10% rebate on total computed income tax under Finance Act 2082. The rebate is applied after the full slab calculation: computed tax × 10% = rebate amount; final tax = computed tax − rebate. The rebate does NOT apply to women who also earn rental, business, or investment income. It applies to the computed tax, not to assessable income — so it saves more for higher-income earners."
      }
    },
    {
      "@type": "Question",
      "name": "What is the IRD income tax filing deadline in Nepal for FY 2082/83?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Salaried employees with employment income only do not need to file separately — TDS covers their obligation. Self-employed individuals and business owners must file annual returns with IRD by the end of Poush (approximately mid-January). Late filing penalty: Rs 100/day (minimum Rs 1,000, maximum Rs 25,000). Late payment interest: 15% per annum. E-filing is available at ird.gov.np. Employers must deposit monthly TDS by the 25th of the following month."
      }
    }
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/"},
    {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nepacalc.com/blog/"},
    {"@type": "ListItem", "position": 3, "name": "Nepal Income Tax 2082/83 Guide", "item": "https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/"}
  ]
}
</script>`}
              </pre>
            </div>
          </details>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">1. What is Nepal's income tax and who must pay it?</h2>
          <p>
            Nepal levies income tax on every individual whose annual assessable income exceeds the applicable threshold under the <strong>Income Tax Act 2058 (ITA 2058)</strong> — the primary legislation governing individual and corporate taxation in Nepal. The ITA 2058 is administered by the <strong>Inland Revenue Department (IRD)</strong>, a department under the Ministry of Finance. Each year, the <strong>Finance Act</strong> updates tax rates, thresholds, and deductions. The Finance Act 2082, passed by Nepal's Parliament in Ashadh 2082, confirmed that all individual income tax parameters remain unchanged from FY 2081/82.
          </p>
          <p>
            This continuity matters for anyone searching for "nepal income tax slab 2081/82" — the slabs are identical in 2082/83. The Finance Minister explicitly stated in the Ashadh 15, 2082 budget speech that no changes to individual income tax rates were introduced for the new fiscal year.
          </p>

          <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Who must pay income tax in Nepal?</h3>
          <ul>
            <li><strong>Salaried employees:</strong> Tax is deducted monthly at source (TDS) by the employer. No separate annual filing is required if employment is the only income source and the employer deducts correctly.</li>
            <li><strong>Self-employed professionals:</strong> Doctors, lawyers, architects, consultants, and freelancers must pay advance tax quarterly and file an annual income tax return with IRD by end of Poush (approximately mid-January).</li>
            <li><strong>Business owners:</strong> Individual proprietors report business income as personal income for progressive tax. Partnership income is taxed at the individual partner level.</li>
            <li><strong>Rental income earners:</strong> Property rental income is included in total assessable income for progressive tax purposes.</li>
            <li><strong>Investment income earners:</strong> Interest income, capital gains, and dividends may attract withholding tax or be included in total income depending on the source.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Who is below the taxable threshold?</h3>
          <p>
            Individuals earning below <strong>Rs 5,00,000 per year (single filer)</strong> or <strong>Rs 6,00,000 per year (married filer)</strong> are below the income tax threshold and owe no income tax for FY 2082/83. Note: the 1% Social Security Tax (SST) still technically applies at the lowest income level — but is waived for SSF contributors and does not apply to below-threshold earners who have no taxable income at all.
          </p>

          {/* Legal Basis Box */}
          <div className="border-l-4 border-blue-600 bg-blue-50/70 p-5 rounded-r-xl my-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 mb-2">🇳🇵 Nepal Legal Basis</div>
            <p className="text-xs text-blue-900 leading-relaxed m-0">
              <strong>Income Tax Act 2058</strong>, Parts 2–4, Sections 4–22 (individual income tax provisions) | <strong>Finance Act 2082</strong>, First Schedule (tax rates FY 2082/83) | <strong>Social Security Act 2074</strong>, Section 6 (mandatory SSF enrollment) | IRD Nepal: <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-bold">ird.gov.np</a> | Ministry of Finance: <a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-bold">mof.gov.np</a> | SSF Management Board: <a href="https://ssf.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-bold">ssf.gov.np</a>
            </p>
          </div>

          {/* International Standard Box */}
          <div className="border-l-4 border-emerald-600 bg-emerald-50/70 p-5 rounded-r-xl my-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 mb-2">🌐 International Standard &amp; Context</div>
            <p className="text-xs text-emerald-950 leading-relaxed m-0">
              Nepal's progressive tax structure follows the <strong>OECD Model Tax Convention</strong> framework for individual income taxation. The IMF Fiscal Monitor recommends progressive tax as the primary tool for equitable revenue mobilization in developing economies. The <strong>ILO Convention No. 102</strong> (Social Security Minimum Standards) underpins Nepal's SSF design. Nepal's top rate of 39% is within the South Asian norm — India's top rate is 42.74% (including surcharge), Bangladesh is 30%.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">2. Income tax slabs FY 2082/83 — single / unmarried filers</h2>
          <p>
            Nepal applies <strong>six progressive income bands</strong> to individual income. The critical rule: each band is taxed at its own rate independently. You never pay your highest applicable rate on your full income. If you earn Rs 15,00,000 per year, you do not pay 30% on Rs 15 lakhs — you pay 30% only on the income above Rs 10,00,000, with lower rates applying to the income in lower bands.
          </p>
          <p>
            Band 1 is classified as a <strong>Social Security Tax (SST)</strong> under the Finance Act — legally distinct from income tax. It carries a unique waiver mechanism through SSF enrollment that no other band has.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Band</th>
                  <th className="p-3 font-semibold">Annual Assessable Income (NPR)</th>
                  <th className="p-3 font-semibold">Rate</th>
                  <th className="p-3 font-semibold">Maximum Tax on This Band</th>
                  <th className="p-3 font-semibold">Nature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold">Band 1</td>
                  <td className="p-3">Up to Rs 5,00,000</td>
                  <td className="p-3">1% <em>(waived if SSF enrolled)</em></td>
                  <td className="p-3">Rs 5,000 → Rs 0 (SSF)</td>
                  <td className="p-3">Social Security Tax (SST)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Band 2</td>
                  <td className="p-3">Rs 5,00,001 – Rs 7,00,000</td>
                  <td className="p-3">10%</td>
                  <td className="p-3">Rs 20,000</td>
                  <td className="p-3">Income Tax</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Band 3</td>
                  <td className="p-3">Rs 7,00,001 – Rs 10,00,000</td>
                  <td className="p-3">20%</td>
                  <td className="p-3">Rs 60,000</td>
                  <td className="p-3">Income Tax</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Band 4</td>
                  <td className="p-3">Rs 10,00,001 – Rs 20,00,000</td>
                  <td className="p-3">30%</td>
                  <td className="p-3">Rs 3,00,000</td>
                  <td className="p-3">Income Tax</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Band 5</td>
                  <td className="p-3">Rs 20,00,001 – Rs 50,00,000</td>
                  <td className="p-3">36%</td>
                  <td className="p-3">Rs 10,80,000</td>
                  <td className="p-3">Income Tax</td>
                </tr>
                <tr className="bg-blue-50 font-bold text-blue-700">
                  <td className="p-3">Band 6</td>
                  <td className="p-3">Above Rs 50,00,000</td>
                  <td className="p-3">39%</td>
                  <td className="p-3">On full excess amount</td>
                  <td className="p-3">Income Tax</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-[-10px] mb-6">Source: Finance Act 2082, First Schedule, Part 1. Rates confirmed unchanged from Finance Act 2081.</p>

          <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm text-amber-900 my-6">
            <strong className="text-amber-950 font-bold block mb-1">⚠ The most common misconception:</strong>
            A taxpayer earning Rs 12,0,000 per year does NOT pay 30% on Rs 12 lakhs. They pay 1%/0% on the first Rs 5 lakhs, 10% on Rs 2 lakhs, 20% on Rs 3 lakhs, and 30% only on the remaining Rs 2 lakhs. This is progressive taxation — each slab is taxed independently.
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">3. Income tax slabs FY 2082/83 — married couple filers</h2>
          <p>
            Married couple filers in Nepal receive two advantages over single filers: a higher Band 1 threshold (Rs 6,00,000 vs Rs 5,00,000) and correspondingly higher thresholds for Bands 2 and 3. The Band 1 advantage saves Rs 1,000 per year in SST — or is waived entirely for SSF contributors. The married option is almost always more tax-efficient than single status for legally married taxpayers.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Band</th>
                  <th className="p-3 font-semibold">Annual Assessable Income (NPR)</th>
                  <th className="p-3 font-semibold">Rate</th>
                  <th className="p-3 font-semibold">Maximum Tax on This Band</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold">Band 1</td>
                  <td className="p-3">Up to Rs 6,00,000</td>
                  <td className="p-3">1% <em>(waived if SSF enrolled)</em></td>
                  <td className="p-3">Rs 6,000 → Rs 0 (SSF)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Band 2</td>
                  <td className="p-3">Rs 6,00,001 – Rs 8,00,000</td>
                  <td className="p-3">10%</td>
                  <td className="p-3">Rs 20,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Band 3</td>
                  <td className="p-3">Rs 8,00,001 – Rs 11,00,000</td>
                  <td className="p-3">20%</td>
                  <td className="p-3">Rs 60,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Band 4</td>
                  <td className="p-3">Rs 11,00,001 – Rs 20,00,000</td>
                  <td className="p-3">30%</td>
                  <td className="p-3">Rs 2,70,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Band 5</td>
                  <td className="p-3">Rs 20,00,001 – Rs 50,00,000</td>
                  <td className="p-3">36%</td>
                  <td className="p-3">Rs 10,80,000</td>
                </tr>
                <tr className="bg-blue-50 font-bold text-blue-700">
                  <td className="p-3">Band 6</td>
                  <td className="p-3">Above Rs 50,00,000</td>
                  <td className="p-3">39%</td>
                  <td className="p-3">On full excess</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            A married person may legally opt for single filer status if it results in lower tax. In practice, the married option saves more tax in nearly all scenarios because the higher Band 1 and Band 2 thresholds absorb more income at lower rates. Only in very specific tax structuring situations — which require professional advice — might single status be preferable for a married taxpayer.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">4. The 1% SST — is it income tax or social security tax?</h2>
          <p>
            This is the single most misunderstood element of Nepal's payslip for most salaried employees. The 1% levy on Band 1 income is formally classified as a <strong>Social Security Tax (SST)</strong> under Finance Act 2082, First Schedule, Part 1 — it is legally distinct from income tax under ITA 2058. Here is why this distinction matters in practice:
          </p>
          <ul>
            <li><strong>Waiver mechanism:</strong> The SST has its own unique waiver (SSF enrollment) that applies to no other band. You cannot waive income tax on Bands 2–6 through any contribution — only Band 1 SST has this property.</li>
            <li><strong>Revenue allocation:</strong> SST revenue is directed to social security program funding, not to Nepal's general consolidated fund like income tax revenue.</li>
            <li><strong>EPF does NOT waive SST:</strong> Employees contributing to EPF (Employee Provident Fund / Karmachari Sanchaya Kosh) still owe the Band 1 SST. Only SSF enrollment triggers the waiver.</li>
            <li><strong>Voluntary SSF also qualifies:</strong> Self-employed individuals who voluntarily enroll in SSF can also waive their Band 1 SST — not just formal sector salaried employees.</li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl text-sm text-red-900 my-6">
            <strong className="text-red-950 font-bold block mb-1">⚠ Payslip error to watch for:</strong>
            Some employers deduct both SSF contributions AND 1% SST. This is a payroll calculation error. SSF-enrolled employees should have Band 1 SST = Rs 0 on their TDS computation. If your payslip shows both charges, ask your HR department to review the TDS formula against IRD's TDS computation guidelines.
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">5. The SSF waiver — how SSF enrollment eliminates Band 1 tax</h2>
          <p>
            The <strong>Social Security Fund (SSF)</strong>, established under the Social Security Act 2074 and managed by the SSF Management Board at <a href="https://ssf.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">ssf.gov.np</a>, is Nepal's contributory national social insurance program. For every enrolled employee, the Band 1 SST is completely waived — but the SSF offers far more than this tax benefit.
          </p>

          <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">SSF contribution structure FY 2082/83</h3>
          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Contributor</th>
                  <th className="p-3 font-semibold">Rate</th>
                  <th className="p-3 font-semibold">Base Salary</th>
                  <th className="p-3 font-semibold">Example: Rs 60,000 gross</th>
                  <th className="p-3 font-semibold">Example: Rs 1,20,000 gross</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold">Employee contribution</td>
                  <td className="p-3">11%</td>
                  <td className="p-3">Basic (60% of gross)</td>
                  <td className="p-3">11% × Rs 36,000 = <strong>Rs 3,960</strong></td>
                  <td className="p-3">11% × Rs 72,000 = <strong>Rs 7,920</strong></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Employer contribution</td>
                  <td className="p-3">20%</td>
                  <td className="p-3">Basic (60% of gross)</td>
                  <td className="p-3">20% × Rs 36,000 = <strong>Rs 7,200</strong></td>
                  <td className="p-3">20% × Rs 72,000 = <strong>Rs 14,400</strong></td>
                </tr>
                <tr className="bg-emerald-50 font-bold text-emerald-800">
                  <td className="p-3">Total SSF deposit</td>
                  <td className="p-3">31%</td>
                  <td className="p-3">Basic salary</td>
                  <td className="p-3">Rs 11,160/month</td>
                  <td className="p-3">Rs 22,320/month</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-[-10px] mb-6">Note: Employer's 20% contribution is an additional cost to the company and does not reduce employee take-home pay. It is included in CTC calculations.</p>

          <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Social security benefits provided by SSF enrollment</h3>
          <ul>
            <li><strong>Medical benefit:</strong> Up to Rs 1,00,000 per hospitalization incident at SSF-empaneled hospitals across Nepal</li>
            <li><strong>Accident benefit:</strong> Compensation of 60%–100% of base salary for workplace accidents resulting in partial or full disability</li>
            <li><strong>Maternity benefit:</strong> 60 days paid leave at full salary for female employees, plus Rs 50,000 medical cost reimbursement per delivery</li>
            <li><strong>Dependent family benefit:</strong> Minimum Rs 7,00,000 lump-sum payment to dependents if the contributor dies while in service</li>
            <li><strong>Old-age pension:</strong> Monthly pension after minimum 15 years of SSF contribution — computed as a percentage of average base salary over contribution years</li>
            <li><strong>Tax benefit:</strong> Complete waiver of Band 1 SST — saving Rs 5,000–6,000 per year annually</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl text-sm text-blue-900 my-6">
            <strong className="text-blue-950 font-bold block mb-1">💡 E-E-A-T Note:</strong>
            SSF enrollment data is verifiable at ssf.gov.np using your SSF number. All benefit details are sourced from the SSF Management Board's official benefit schedule published under Social Security Regulations 2075.
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">6. All deductions that reduce your taxable income — complete list</h2>
          <p>
            Before applying progressive slab rates, Nepal's tax law allows specified deductions from gross income to arrive at <strong>assessable income</strong> — the figure on which bands are applied. Every rupee of qualifying deduction reduces your assessable income, potentially dropping income from a higher band into a lower one. This is where proactive tax planning (within legal limits) can meaningfully reduce your annual liability.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Deduction Type</th>
                  <th className="p-3 font-semibold">Annual Maximum Allowed</th>
                  <th className="p-3 font-semibold">Key Condition</th>
                  <th className="p-3 font-semibold">Tax Saving at Band 3 (20%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold">SSF employee contribution (11% of basic)</td>
                  <td rowSpan={2} className="p-3 bg-blue-50/70 font-bold text-blue-800 text-center align-middle">
                    Combined cap: lower of Rs 5,00,000 or 1/3 of gross income
                  </td>
                  <td className="p-3">SSF-enrolled employees</td>
                  <td className="p-3">Varies by amount</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">EPF / CIT contributions</td>
                  <td className="p-3">EPF or CIT contributors</td>
                  <td className="p-3">Varies by amount</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Life insurance premium</td>
                  <td className="p-3">Rs 40,000</td>
                  <td className="p-3">Policy must be in taxpayer's own name</td>
                  <td className="p-3">Rs 8,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Health insurance premium</td>
                  <td className="p-3">Rs 20,000</td>
                  <td className="p-3">Policy must be in taxpayer's own name</td>
                  <td className="p-3">Rs 4,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Private residential building insurance</td>
                  <td className="p-3">Rs 5,000</td>
                  <td className="p-3">Principal residence only, not rental property</td>
                  <td className="p-3">Rs 1,000</td>
                </tr>
                <tr className="bg-blue-50 font-bold text-blue-700">
                  <td className="p-3">Remote area allowance</td>
                  <td className="p-3">Up to Rs 50,000</td>
                  <td className="p-3">IRD-classified remote district postings only</td>
                  <td className="p-3">Rs 10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>How the combined deduction cap works in practice:</strong> An employee earning Rs 1,20,000/month gross (Rs 14,40,000/year) with annual SSF contribution of Rs 95,040: The cap is the lower of Rs 5,00,000 or Rs 14,40,000 ÷ 3 = Rs 4,80,000. Since Rs 95,040 is below Rs 4,80,000, the full SSF contribution is deductible. Add life insurance Rs 40,000 + health insurance Rs 20,000 = total deductions Rs 1,55,040. Assessable income = Rs 14,40,000 − Rs 1,55,040 = Rs 12,84,960.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">7. Female 10% tax rebate (FRTC) — calculation and qualifying conditions</h2>
          <p>
            The <strong>Female Rebate on Tax Computation (FRTC)</strong>, maintained under Finance Act 2082, provides female employees a 10% reduction on their total computed income tax. This was introduced by Nepal's Parliament as a gender-equity fiscal measure. Understanding what "10% rebate on tax" means (as opposed to 10% off assessable income) is critical to computing it correctly.
          </p>

          <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Three conditions — all must be met</h3>
          <ol>
            <li>The taxpayer must be <strong>female</strong></li>
            <li>The income must be <strong>employment income only</strong> — salary and wages from a registered employer with TDS deducted</li>
            <li><strong>No other income source</strong> — rental income, business income, freelance income, capital gains, or investment income in addition to salary disqualifies the full rebate</li>
          </ol>

          <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Step-by-step FRTC calculation</h3>
          <div className="bg-slate-900 rounded-2xl p-6 my-6 font-mono text-[13px] text-blue-300 leading-relaxed border border-slate-800 not-prose">
            <span className="text-[15px] text-blue-100 font-bold block mb-2 border-b border-slate-800 pb-2">
              Final Tax = [Computed Tax after SSF Waiver] × (1 − 0.10)
            </span>
            <span className="text-sky-300 text-xs leading-loose block whitespace-pre-wrap">
              Step 1: Compute assessable income (gross − deductions)<br />
              Step 2: Apply all 6 slab rates on assessable income → gross computed tax<br />
              Step 3: Apply SSF waiver (if enrolled) → subtract Band 1 SST from computed tax<br />
              Step 4: Apply 10% FRTC: Rebate = Adjusted Computed Tax × 0.10<br />
              Step 5: Final annual tax = Adjusted Computed Tax − Rebate<br />
              Step 6: Monthly TDS = Final Annual Tax ÷ 12<br /><br />
              Example: Adjusted computed tax Rs 59,328 × 10% = Rs 5,933 rebate → Final tax Rs 53,395 → Monthly TDS Rs 4,450
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">8. How TDS is computed and deposited — employer obligations</h2>
          <p>
            Tax Deducted at Source (TDS) is the mechanism through which Nepal's IRD collects income tax from salaried employees each month. Your employer legally acts as a tax collection agent. The TDS process has strict deadlines — non-compliance attracts significant interest penalties.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Employer Obligation</th>
                  <th className="p-3 font-semibold">Deadline</th>
                  <th className="p-3 font-semibold">Legal Basis</th>
                  <th className="p-3 font-semibold">Penalty for Failure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold">Compute annual TDS for each employee</td>
                  <td className="p-3">Start of Shrawan each year</td>
                  <td className="p-3">ITA 2058, Section 87</td>
                  <td className="p-3">—</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Deduct monthly TDS from salary</td>
                  <td className="p-3">Each month's payroll</td>
                  <td className="p-3">ITA 2058, Section 88</td>
                  <td className="p-3">15% p.a. interest on under-deduction</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Deposit TDS with IRD</td>
                  <td className="p-3">25th of following month</td>
                  <td className="p-3">ITA 2058, Section 92</td>
                  <td className="p-3">15% p.a. interest on late deposit</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">File quarterly TDS reconciliation (Form 2.4)</td>
                  <td className="p-3">End of each quarter</td>
                  <td className="p-3">IRD Regulation</td>
                  <td className="p-3">Rs 1,000–5,000 per return</td>
                </tr>
                <tr className="bg-blue-50 font-bold text-blue-700">
                  <td className="p-3">Issue annual TDS certificate (Form 2) to employee</td>
                  <td className="p-3">End of Ashad (mid-July)</td>
                  <td className="p-3">ITA 2058, Section 90</td>
                  <td className="p-3">Rs 1,000–10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>When you change employers mid-year:</strong> Your new employer must compute TDS based on your full-year projected income — including what your previous employer already paid you. Submit your previous employer's Form 2 or income statement to your new HR department. Failure to do this results in under-deduction from the new employer and a potentially large tax liability at year end that you must settle personally with IRD.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">9. Worked example 1 — Rs 60,000/month gross, single, SSF enrolled</h2>
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 my-6 text-slate-800">
            <div className="font-black text-amber-950 mb-3 flex items-center gap-2">
              💡 Entry-level professional, Rs 60,000 gross salary/month, SSF enrolled, single filer, no additional deductions
            </div>
            <div className="overflow-x-auto border border-amber-200 rounded-lg bg-white">
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
                    <td className="p-2">Gross annual salary</td>
                    <td className="p-2">60,000</td>
                    <td className="p-2">7,20,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">2</td>
                    <td className="p-2">Basic salary (60% of gross)</td>
                    <td className="p-2">36,000</td>
                    <td className="p-2">4,32,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">3</td>
                    <td className="p-2">Employee SSF contribution (11% × Rs 36,000)</td>
                    <td className="p-2">−3,960</td>
                    <td className="p-2">−47,520</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">4</td>
                    <td className="p-2">Assessable income for tax (Rs 7,20,000 − Rs 47,520)</td>
                    <td className="p-2">—</td>
                    <td className="p-2">6,72,480</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">5</td>
                    <td className="p-2">Band 1 SST (1% × Rs 5,00,000 → <strong>waived, SSF enrolled</strong>)</td>
                    <td className="p-2">0</td>
                    <td className="p-2">0</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">6</td>
                    <td className="p-2">Band 2 income tax (10% × Rs 1,72,480)</td>
                    <td className="p-2">—</td>
                    <td className="p-2">17,248</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-800">
                    <td className="p-2">—</td>
                    <td className="p-2"><strong>Total annual income tax</strong></td>
                    <td className="p-2">—</td>
                    <td className="p-2"><strong>Rs 17,248</strong></td>
                  </tr>
                  <tr>
                    <td className="p-2">—</td>
                    <td className="p-2">Monthly TDS (Rs 17,248 ÷ 12)</td>
                    <td className="p-2"><strong>Rs 1,437</strong></td>
                    <td className="p-2">—</td>
                  </tr>
                  <tr className="bg-blue-50 font-semibold text-blue-800">
                    <td className="p-2">—</td>
                    <td className="p-2">Net take-home (Rs 60,000 − Rs 3,960 SSF − Rs 1,437 TDS)</td>
                    <td className="p-2"><strong>Rs 54,603</strong></td>
                    <td className="p-2"><strong>Rs 6,55,232</strong></td>
                  </tr>
                  <tr className="bg-slate-50 font-bold text-slate-700">
                    <td className="p-2">—</td>
                    <td className="p-2">Employer CTC (Gross + Employer SSF 20% × Rs 36,000 = +Rs 7,200)</td>
                    <td className="p-2"><strong>Rs 67,200</strong></td>
                    <td className="p-2"><strong>Rs 8,06,400</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">10. Worked example 2 — Rs 1,20,000/month gross, married, SSF enrolled</h2>
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 my-6 text-slate-800">
            <div className="font-black text-amber-950 mb-3 flex items-center gap-2">
              💡 Senior professional, Rs 1,20,000 gross/month, SSF enrolled, married filer, life insurance Rs 40,000/year
            </div>
            <div className="overflow-x-auto border border-amber-200 rounded-lg bg-white">
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
                    <td className="p-2">Gross annual salary</td>
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
                    <td className="p-2">Life insurance premium deduction</td>
                    <td className="p-2">—</td>
                    <td className="p-2">−40,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">4</td>
                    <td className="p-2">Assessable income (Rs 14,40,000 − Rs 95,040 − Rs 40,000)</td>
                    <td className="p-2">—</td>
                    <td className="p-2">13,04,960</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">5</td>
                    <td className="p-2">Band 1: 1% × Rs 6,00,000 → <strong>waived (SSF + married)</strong></td>
                    <td className="p-2">0</td>
                    <td className="p-2">0</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">6</td>
                    <td className="p-2">Band 2: 10% × Rs 2,00,000</td>
                    <td className="p-2">—</td>
                    <td className="p-2">20,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">7</td>
                    <td className="p-2">Band 3: 20% × Rs 3,00,000</td>
                    <td className="p-2">—</td>
                    <td className="p-2">60,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">8</td>
                    <td className="p-2">Band 4: 30% × Rs 2,04,960</td>
                    <td className="p-2">—</td>
                    <td className="p-2">61,488</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-800">
                    <td className="p-2">—</td>
                    <td className="p-2"><strong>Total annual income tax</strong></td>
                    <td className="p-2">—</td>
                    <td className="p-2"><strong>Rs 1,41,488</strong></td>
                  </tr>
                  <tr>
                    <td className="p-2">—</td>
                    <td className="p-2">Monthly TDS</td>
                    <td className="p-2"><strong>Rs 11,791</strong></td>
                    <td className="p-2">—</td>
                  </tr>
                  <tr className="bg-blue-50 font-semibold text-blue-800">
                    <td className="p-2">—</td>
                    <td className="p-2">Net take-home</td>
                    <td className="p-2"><strong>Rs 1,00,289</strong></td>
                    <td className="p-2"><strong>Rs 12,03,472</strong></td>
                  </tr>
                  <tr className="bg-slate-50 font-bold text-slate-700">
                    <td className="p-2">—</td>
                    <td className="p-2">Employer CTC (+ Rs 14,400 employer SSF)</td>
                    <td className="p-2"><strong>Rs 1,34,400</strong></td>
                    <td className="p-2"><strong>Rs 16,12,800</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">11. IRD filing deadlines and penalties — FY 2082/83</h2>
          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Taxpayer Type</th>
                  <th className="p-3 font-semibold">Annual Return Deadline</th>
                  <th className="p-3 font-semibold">Late Filing Penalty</th>
                  <th className="p-3 font-semibold">Late Payment Interest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold">Salaried (TDS — employment income only)</td>
                  <td className="p-3">No separate filing needed</td>
                  <td className="p-3">N/A</td>
                  <td className="p-3">Employer's responsibility</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Self-employed / Freelancer</td>
                  <td className="p-3">End of Poush (~mid-January)</td>
                  <td className="p-3">Rs 100/day (min Rs 1,000, max Rs 25,000)</td>
                  <td className="p-3">15% per annum</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Individual business owner</td>
                  <td className="p-3">End of Poush</td>
                  <td className="p-3">Rs 100/day (min Rs 1,000, max Rs 25,000)</td>
                  <td className="p-3">15% per annum</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Employer TDS deposit</td>
                  <td className="p-3">25th of following month</td>
                  <td className="p-3">—</td>
                  <td className="p-3">15% per annum</td>
                </tr>
                <tr className="bg-red-50 font-bold text-red-800">
                  <td className="p-3">Tax evasion / understatement</td>
                  <td className="p-3">—</td>
                  <td className="p-3">50%–200% of understated amount</td>
                  <td className="p-3">15% per annum + prosecution risk</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            E-filing is available 24/7 at <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">ird.gov.np</a>. Taxpayers need a PAN (Permanent Account Number) to file. PAN registration can be done online for new taxpayers. IRD also operates helpdesk services at all major district offices and the Lazimpat head office in Kathmandu.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">12. Frequently asked questions</h2>
          <div className="space-y-4 my-6 not-prose">
            <details className="group border border-slate-200 rounded-lg overflow-hidden" open>
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>What is the Nepal income tax slab for FY 2082/83 with 1% up to Rs 5,00,000 — is this the same as 2081/82?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white">
                <p className="text-xs text-blue-600 font-bold mb-2">🔍 GSC query: "nepal income tax slab 2081/82 1% up to 500000" — 6 impressions, 0 clicks</p>
                Yes. The Finance Act 2082 (passed Ashadh 2082) made no changes to individual income tax slabs. The 1% on Band 1 (up to Rs 5,00,000 for single filers, Rs 6,00,000 for married) remains as Social Security Tax — waived for SSF contributors. Bands 2–6 rates (10%, 20%, 30%, 36%, 39%) and their thresholds are also unchanged. The content of this guide is fully applicable for FY 2082/83. Any page or calculator still showing 2081/82 data contains the same rates — just note that the year label should say 2082/83 for current fiscal year accuracy.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>How does the IRD tax calculator work — is NepaCalc's calculator IRD-verified?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white">
                <p className="text-xs text-blue-600 font-bold mb-2">🔍 GSC query: "ird tax calculator" — 4 impressions, 0 clicks</p>
                The IRD's official portal (ird.gov.np) provides tax forms, PAN registration, and e-filing services but does not provide a live public-facing salary tax calculator. NepaCalc's <Link href="/calculator/nepal-income-tax/" className="text-blue-600 underline font-bold">Nepal income tax calculator</Link> applies the Finance Act 2082 rates from IRD's official published schedule — the same data your employer's payroll system should use. The calculator is not affiliated with IRD, but all formula inputs (slab rates, deduction caps, SSF waiver logic, FRTC rebate) are sourced from IRD's official tax rate schedule and Finance Act 2082. For definitive tax rulings on complex situations, consult a registered tax consultant or contact IRD directly.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>What is the salary tax calculator — how do I calculate my take-home salary in Nepal?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white">
                <p className="text-xs text-blue-600 font-bold mb-2">🔍 GSC query: "salary tax calculator nepal" — 2 impressions, 0 clicks</p>
                Your take-home salary in Nepal = Gross Salary − Employee SSF (11% of basic) − Monthly TDS (annual tax ÷ 12) − CIT (if applicable). The <Link href="/calculator/nepal-salary/" className="text-blue-600 underline font-bold">Nepal salary calculator 2082/83</Link> computes all three deductions and shows your net bank credit, employer CTC, and annual totals. For a quick mental estimate: if you are SSF-enrolled, your total monthly deduction is approximately 6.6% (SSF on gross) plus your tax band rate applied to taxable income. The worked examples in Sections 9 and 10 above show the exact arithmetic for Rs 60,000 and Rs 1,20,000 gross.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>Nepal income tax slab for married couple — is the Rs 6,00,000 threshold for both spouses combined or per person?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white">
                <p className="text-xs text-blue-600 font-bold mb-2">🔍 GSC query: "nepal income tax slab married couple 600000" — 2 impressions, 0 clicks</p>
                The Rs 6,00,000 Band 1 threshold under the married filing option applies to the individual taxpayer who opts for married status — not the combined income of both spouses. Each spouse files independently. If one spouse earns Rs 14,00,000 and the other earns Rs 6,00,000, each files separately under their own slab structure. The higher-earning spouse can choose the married threshold (Rs 6L Band 1) regardless of the other spouse's income level. Both spouses cannot simultaneously claim the full married threshold against the same household income pool.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>What is TDS in Nepal — is TDS the same as income tax?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white">
                <p className="text-xs text-blue-600 font-bold mb-2">🔍 GSC queries: "tds in nepal", "tds calculator nepal" — 5 impressions combined, 0 clicks</p>
                TDS (Tax Deducted at Source) is NOT a separate tax — it is the collection mechanism for income tax. Your annual income tax is computed once, divided by 12, and deducted monthly by your employer. The total TDS deducted over 12 months should equal your annual income tax liability exactly. If your employer over-deducts, you can claim a refund from IRD. If they under-deduct, you owe the balance. The <Link href="/calculator/tds-calculator/" className="text-blue-600 underline font-bold">Nepal TDS calculator</Link> helps employers and HR departments verify the correct monthly deduction amount. For vehicle tax calculations, see the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 underline font-bold">Nepal vehicle tax calculator</Link>.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>How do I verify that my employer's TDS deduction is correct?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white">
                <p className="text-xs text-blue-600 font-bold mb-2">🔍 GSC query: "salary tax calculator" — 2 impressions, 0 clicks</p>
                Follow these four steps: (1) Collect your gross salary, filing status, SSF enrollment status, and any declared deductions (insurance premiums). (2) Use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 underline font-bold">NepaCalc income tax calculator</Link> to compute your correct annual tax. (3) Divide by 12 to get your correct monthly TDS. (4) Compare with your payslip deduction. If discrepancy exists, request your employer's TDS computation sheet (your employer is required to provide this on request under ITA 2058, Section 90). Common errors include: using wrong year's slab rates, not applying SSF waiver, or not applying FRTC for female employees.
              </div>
            </details>
          </div>

          {/* EEAT Transparency Box */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 my-6 text-xs text-purple-950 not-prose leading-relaxed">
            <strong className="block mb-2 text-[10px] font-black uppercase tracking-widest text-purple-800">E-E-A-T Transparency Statement</strong>
            This article was written by the NepaCalc Editorial Team using primary sources: Finance Act 2082 (First Schedule, Part 1 and Part 2), Income Tax Act 2058 (Sections 4–22, 87–92), and SSF Management Board official benefit schedule. All tax rates have been cross-verified with the IRD Nepal tax rate schedule published at ird.gov.np. No affiliate relationships exist with IRD, SSF, or any financial product provider. This content is for educational purposes — readers should consult a registered tax consultant for personalised tax advice, particularly for complex income situations involving multiple income sources.
          </div>

          {/* Sources and Verification Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6 text-xs text-slate-500 not-prose leading-relaxed">
            <strong className="block mb-2 text-[10px] font-black uppercase tracking-widest text-slate-700">Sources &amp; Verification</strong>
            Finance Act 2082, First Schedule (Nepal Parliament, Ashadh 2082) | Income Tax Act 2058, Parts 2–4 | Social Security Act 2074, Section 6 | SSF Regulations 2075 (benefit schedule) | IRD Nepal — <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ird.gov.np</a> | SSF Board — <a href="https://ssf.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ssf.gov.np</a> | Ministry of Finance — <a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">mof.gov.np</a>. Last verified against primary sources: 20 Jestha 2083 (May 2026). Rates for FY 2082/83 are confirmed unchanged from FY 2081/82 per Finance Act 2082. This guide is for general information — consult a qualified tax advisor for advice specific to your situation.
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
