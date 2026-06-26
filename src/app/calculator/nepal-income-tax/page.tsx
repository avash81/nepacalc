import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Income Tax Calculator (2083/84) - Calculate Salary Tax Online",
  description: "Calculate your Nepal income tax instantly using the latest FY 2083/84 income tax slabs. Get an accurate tax breakdown, monthly TDS estimate, SSF adjustment, and annual tax calculation online.",
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
      {"@type": "ListItem", "position": 3, "name": "Nepal Income Tax Calculator (FY 2083/84)", "item": "https://nepacalc.com/calculator/nepal-income-tax/"}
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/calculator/nepal-income-tax/",
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "name": "Nepal Income Tax Calculator (2083/84) - Calculate Salary Tax Online",
    "description": "Calculate your Nepal income tax instantly using the latest FY 2083/84 income tax slabs. Get an accurate tax breakdown, monthly TDS estimate, SSF adjustment, and annual tax calculation online.",
    "inLanguage": "en-NP",
    "datePublished": "2026-06-15",
    "dateModified": "2026-07-01",
    "isPartOf": {"@type": "WebSite", "name": "NepaCalc", "url": "https://nepacalc.com"}
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Nepal Income Tax Calculator",
    "alternateName": ["IRD Tax Calculator Nepal", "Tax Calculator Nepal", "Nepal Income Tax Calculator 2083/84"],
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Calculate your Nepal income tax instantly using the latest FY 2083/84 income tax slabs. Get an accurate tax breakdown, monthly TDS estimate, SSF adjustment, and annual tax calculation online.",
    "offers": {"@type": "Offer", "price": "0", "priceCurrency": "NPR"},
    "featureList": ["Nepal income tax slab 2083/84", "SSF waiver calculation", "Monthly TDS estimate", "Annual tax calculation", "Universal single tax slab"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the Nepal income tax slabs for FY 2083/84?",
        "acceptedAnswer": {"@type": "Answer", "text": "The FY 2083/84 tax system uses five progressive slabs with rates ranging from 1% to 29%."}
      },
      {
        "@type": "Question",
        "name": "Is the first Rs. 10 lakh tax free?",
        "acceptedAnswer": {"@type": "Answer", "text": "No. Income up to Rs. 10 lakh is generally taxed at 1%, which is treated as Social Security Tax. Eligible SSF contributors may receive relief from this amount."}
      },
      {
        "@type": "Question",
        "name": "Are there separate tax slabs for married couples?",
        "acceptedAnswer": {"@type": "Answer", "text": "No. The FY 2083/84 budget introduced a single tax slab structure for all resident individuals."}
      },
      {
        "@type": "Question",
        "name": "How is monthly TDS calculated?",
        "acceptedAnswer": {"@type": "Answer", "text": "Monthly TDS is calculated by estimating annual taxable income, applying the progressive tax slabs, accounting for eligible deductions, and dividing the resulting annual tax across monthly payroll periods."}
      },
      {
        "@type": "Question",
        "name": "Does this calculator support SSF deductions?",
        "acceptedAnswer": {"@type": "Answer", "text": "Yes. The calculator estimates tax after considering applicable SSF-related adjustments where relevant."}
      },
      {
        "@type": "Question",
        "name": "Is this calculator based on the latest Nepal budget?",
        "acceptedAnswer": {"@type": "Answer", "text": "Yes. The calculator is designed to reflect the FY 2083/84 personal income tax structure. Always verify against the final enacted Finance Act and Inland Revenue Department guidance for official compliance."}
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Calculator />

      <div className="bg-[#F1F3F4] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
            
            <h1 className="text-3xl font-black text-slate-900 mb-6">Nepal Income Tax Calculator (FY 2083/84)</h1>

            <p>Calculate your Nepal income tax using the latest FY 2083/84 tax slabs announced by the Government of Nepal. Our calculator estimates annual income tax, monthly Tax Deducted at Source (TDS), Social Security Tax (SST), SSF adjustments, and your estimated take-home salary using the newest progressive tax rates.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Latest Nepal Income Tax Slabs (FY 2083/84)</h2>
            <p>The Government of Nepal introduced major reforms to the personal income tax system in the FY 2083/84 budget. The previous six-slab system has been simplified into five progressive slabs, the low-tax threshold has been doubled, and the highest personal income tax rate has been significantly reduced.</p>

            <div className="overflow-x-auto mb-4 not-prose tax-slab-table">
              <table className="min-w-full bg-white border border-slate-200">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left font-bold">Annual Taxable Income</th>
                    <th className="py-3 px-4 text-left font-bold">Tax Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-2 px-4 border-b">Up to Rs. 10,00,000</td><td className="py-2 px-4 border-b font-semibold">1%</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 10,00,001 - Rs. 15,00,000</td><td className="py-2 px-4 border-b font-semibold">10%</td></tr>
                  <tr><td className="py-2 px-4 border-b">Rs. 15,00,001 - Rs. 25,00,000</td><td className="py-2 px-4 border-b font-semibold">20%</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 25,00,001 - Rs. 40,00,000</td><td className="py-2 px-4 border-b font-semibold">27%</td></tr>
                  <tr><td className="py-2 px-4 border-b">Above Rs. 40,00,000</td><td className="py-2 px-4 border-b font-semibold">29%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm"><strong>Note:</strong> The first 1% generally represents Social Security Tax (SST). Eligible Social Security Fund (SSF) contributors may qualify for an exemption from this initial 1%, subject to applicable rules.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">What&apos;s New in FY 2083/84?</h2>
            <p>The FY 2083/84 budget introduces one of the largest personal income tax reforms in recent years.</p>
            <p><strong>Key changes include:</strong></p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Low-tax threshold increased from Rs. 5 lakh to Rs. 10 lakh.</li>
              <li>Highest personal tax rate reduced from 39% to 29%.</li>
              <li>Progressive tax structure simplified from six slabs to five.</li>
              <li>Separate tax slabs for single and married taxpayers removed.</li>
              <li>One common tax slab now applies to all resident individuals.</li>
              <li>Lower monthly TDS for many salaried employees.</li>
            </ul>
            <p>These reforms aim to increase disposable income while simplifying payroll calculations.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">How Nepal Income Tax Is Calculated</h2>
            <p>Nepal follows a progressive income tax system.</p>
            <p><strong>This means:</strong></p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Income is divided into tax slabs.</li>
              <li>Each slab is taxed separately.</li>
              <li>Moving into a higher slab does not increase tax on previous income.</li>
            </ul>
            <p>For example, someone earning Rs. 18,00,000 does not pay 20% on the full amount. Instead, each portion of income is taxed at its applicable rate.</p>
            <p>Our calculator automatically performs these calculations and provides a complete annual and monthly tax breakdown.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Tax Deducted at Source (TDS)</h2>
            <p>Employers deduct income tax every month through the Tax Deducted at Source (TDS) system.</p>
            <p><strong>Your monthly TDS depends on:</strong></p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Annual salary</li>
              <li>SSF contributions</li>
              <li>Approved retirement contributions</li>
              <li>Life insurance deductions (where applicable)</li>
              <li>Applicable tax slabs</li>
            </ul>
            <p>The calculator estimates your monthly TDS using the latest FY 2083/84 tax structure.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Social Security Fund (SSF)</h2>
            <p>Employees contributing to the Social Security Fund may qualify for certain tax benefits under Nepal&apos;s income tax provisions.</p>
            <p>Where applicable, eligible SSF contributors may receive relief from the initial 1% Social Security Tax and other approved deductions.</p>
            <p>Use the SSF option in the calculator to estimate your tax based on your contribution status.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Income Tax Examples</h2>
            
            <h3 className="font-bold text-lg text-slate-800">Annual Income: Rs. 8,00,000</h3>
            <p>Falls entirely within the first tax slab.<br/>Estimated tax: Approximately Rs. 8,000.</p>

            <h3 className="font-bold text-lg text-slate-800">Annual Income: Rs. 15,00,000</h3>
            <p>Income is progressively taxed under:<br/>- 1%<br/>- 10%<br/>The calculator automatically computes the exact payable amount.</p>

            <h3 className="font-bold text-lg text-slate-800">Annual Income: Rs. 25,00,000</h3>
            <p>Income is progressively taxed under:<br/>- 1%<br/>- 10%<br/>- 20%</p>

            <h3 className="font-bold text-lg text-slate-800">Annual Income: Rs. 40,00,000</h3>
            <p>Income is taxed progressively through the 27% slab.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Capital Gains Tax Changes</h2>
            <p>The FY 2083/84 budget also revised capital gains tax on listed shares.</p>
            <p><strong>Current rates:</strong></p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Short-term holdings (up to one year): 10%</li>
              <li>Long-term holdings (more than one year): 7.5%</li>
            </ul>
            <p>These rates apply separately from personal income tax.</p>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Who Can Use This Calculator?</h2>
            <p>This calculator is suitable for:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Salaried employees</li>
              <li>Government employees</li>
              <li>Private sector employees</li>
              <li>Professionals</li>
              <li>Consultants</li>
              <li>Business owners estimating personal tax</li>
              <li>Payroll departments</li>
              <li>HR professionals</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4 faq-section">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">What are the Nepal income tax slabs for FY 2083/84?</h3>
                <p>The FY 2083/84 tax system uses five progressive slabs with rates ranging from 1% to 29%.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Is the first Rs. 10 lakh tax free?</h3>
                <p>No. Income up to Rs. 10 lakh is generally taxed at 1%, which is treated as Social Security Tax. Eligible SSF contributors may receive relief from this amount.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Are there separate tax slabs for married couples?</h3>
                <p>No. The FY 2083/84 budget introduced a single tax slab structure for all resident individuals.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">How is monthly TDS calculated?</h3>
                <p>Monthly TDS is calculated by estimating annual taxable income, applying the progressive tax slabs, accounting for eligible deductions, and dividing the resulting annual tax across monthly payroll periods.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Does this calculator support SSF deductions?</h3>
                <p>Yes. The calculator estimates tax after considering applicable SSF-related adjustments where relevant.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">Is this calculator based on the latest Nepal budget?</h3>
                <p>Yes. The calculator is designed to reflect the FY 2083/84 personal income tax structure. Always verify against the final enacted Finance Act and Inland Revenue Department guidance for official compliance.</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Related Tools</h2>
            <p>You may also find these calculators useful:</p>
            <ul className="list-none pl-0 space-y-2 mb-6">
              <li>👉 <Link href="/income-tax/nepal-income-tax-slab-2083-84/" className="text-blue-600 hover:underline font-bold">Nepal Income Tax Slabs (2083/84)</Link></li>
              <li>👉 <Link href="/income-tax/how-to-calculate-income-tax-nepal/" className="text-blue-600 hover:underline font-bold">How to Calculate Income Tax in Nepal</Link></li>
              <li>👉 <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline font-bold">Salary Calculator Nepal</Link></li>
              <li>👉 <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline font-bold">TDS Calculator Nepal</Link></li>
              <li>👉 <Link href="/calculator/sip-calculator/" className="text-blue-600 hover:underline font-bold">SIP Calculator</Link></li>
              <li>👉 <Link href="/calculator/fd-calculator/" className="text-blue-600 hover:underline font-bold">Fixed Deposit Calculator</Link></li>
              <li>👉 <Link href="/calculator/loan-emi/" className="text-blue-600 hover:underline font-bold">Home Loan EMI Calculator</Link></li>
              <li>👉 <Link href="/calculator/currency-converter/" className="text-blue-600 hover:underline font-bold">Currency Converter Nepal</Link></li>
              <li>👉 <Link href="/market-rates/live-gold-price/" className="text-blue-600 hover:underline font-bold">Live Gold Price Nepal</Link></li>
            </ul>

            <h2 className="text-2xl font-black text-slate-900 mb-4">External References</h2>
            <p>For official tax information, refer to:</p>
            <ul className="list-none pl-0 space-y-2 mb-6">
              <li>🔗 <a href="https://ird.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Inland Revenue Department (IRD)</a></li>
              <li>🔗 <a href="https://mof.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Ministry of Finance, Nepal</a></li>
              <li>🔗 <a href="https://ssf.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Social Security Fund (SSF)</a></li>
              <li>🔗 <a href="https://mof.gov.np/site/budget_documents/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Government Budget Documents</a></li>
            </ul>

          </div>
        </div>
      </div>
    </>
  );
}
