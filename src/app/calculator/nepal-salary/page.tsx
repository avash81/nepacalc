import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Salary Calculator Nepal (FY 2083/84) | Income Tax, TDS & SSF Calculator",
  description: "Calculate salary tax in Nepal using the latest FY 2083/84 IRD tax slabs. Includes SSF, CIT, EPF deductions, TDS calculations, and net take-home salary estimates.",
  slug: 'nepal-salary',
  canonical: 'https://nepacalc.com/calculator/nepal-salary/',
  keywords: [
    "salary calculator nepal", 
    "income tax calculator nepal", 
    "salary tax calculator nepal", 
    "ird tax calculator", 
    "tax calculator nepal", 
    "tds calculator nepal", 
    "ssf calculator nepal", 
    "net salary calculator nepal"
  ]
});

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#software",
      "name": "Salary Calculator Nepal",
      "url": "https://nepacalc.com/calculator/nepal-salary/",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript.",
      "description": "High-precision financial utility designed to compute net salary payouts, statutory payroll deductions, and progressive income tax withholdings in Nepal.",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "NPR"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#webapp",
      "name": "Salary Calculator Nepal (FY 2083/84)",
      "url": "https://nepacalc.com/calculator/nepal-salary/",
      "applicationCategory": "FinancialApplication"
    },
    {
      "@type": "HowTo",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#howto",
      "name": "How to Calculate Salary Tax in Nepal",
      "description": "Step-by-step guide to calculating personal income tax, TDS liabilities, and net take-home salary according to Inland Revenue Department rules.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Determine Gross Income",
          "text": "Combine your monthly base salary, performance bonuses, allowances, and taxable benefits to find your total gross annual salary."
        },
        {
          "@type": "HowToStep",
          "name": "Deduct Pre-Tax Contributions",
          "text": "Subtract eligible contributions made to the Social Security Fund (SSF), Citizen Investment Trust (CIT), and Employees Provident Fund (EPF) up to legal maximum limits."
        },
        {
          "@type": "HowToStep",
          "name": "Apply Unified Tax Slabs",
          "text": "Distribute your remaining net taxable income across the unified progressive marginal tax brackets starting at 1% up to Rs. 10 Lakhs and capping at 29%."
        },
        {
          "@type": "HowToStep",
          "name": "Apply Gender Rebates",
          "text": "If applicable, deduct the flat 10% female employee tax rebate from your calculated total annual tax liability."
        },
        {
          "@type": "HowToStep",
          "name": "Calculate Net Monthly Pay",
          "text": "Divide your remaining annual tax by 12 to find your monthly TDS, then subtract this tax along with your retirement deductions from your gross salary to determine your final net take-home pay."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I calculate salary tax in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Find your gross annual income, subtract pre-tax deductions like SSF or CIT up to allowed caps, map the remaining balance to progressive IRD slabs, apply any eligible rebates, and divide the total annual liability by 12."
          }
        },
        {
          "@type": "Question",
          "name": "What is the current salary tax rate in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nepal utilizes progressive brackets of 1%, 10%, 20%, 27%, and 29% based on the individual's annual assessable income."
          }
        },
        {
          "@type": "Question",
          "name": "Does SSF reduce income tax?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, contributions reduce taxable baseline income. Enrolled workers also get a 0% rate on their first Rs. 10 Lakh income bracket instead of paying the standard 1% social security tax."
          }
        },
        {
          "@type": "Question",
          "name": "How much CIT contribution is tax deductible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CIT deposits are tax-deductible up to an annual limit of Rs. 5,00,000 or one-third of total assessable compensation, whichever is less."
          }
        },
        {
          "@type": "Question",
          "name": "What is my take-home salary after tax?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Take-home salary equals gross compensation minus all pre-tax retirement plan contributions and monthly tax withholdings (TDS)."
          }
        },
        {
          "@type": "Question",
          "name": "What are the latest income tax slabs in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The unified table charges 1% up to Rs. 10 Lakhs, 10% up to Rs. 15 Lakhs, 20% up to Rs. 25 Lakhs, 27% up to Rs. 40 Lakhs, and 29% on everything above."
          }
        },
        {
          "@type": "Question",
          "name": "Is this calculator based on IRD tax slabs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, this engine is kept completely up-to-date with rules set by the Inland Revenue Department of Nepal."
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-[#F1F3F4] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
      />
      
      <Calculator />

      <div className="hp-container pb-16 pt-12">
        <div className="max-w-4xl mx-auto space-y-12">

          <section>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Salary Calculator Nepal (FY 2083/84) – Income Tax, TDS, SSF & CIT Calculator
            </h1>
            
            <img src="https://nepacalc.com/assets/nepal-salary-tax-slabs-chart.png" 
                 alt="Infographic table of the unified progressive income tax slabs in Nepal for FY 2083/84 showing rates from 1 percent to 29 percent." 
                 title="Nepal Salary Income Tax Slabs FY 2083/84" 
                 className="w-full rounded-xl shadow-sm mb-6 border border-slate-200" />
            
            <div className="p-6 bg-[#F8FAFC] border-l-4 border-blue-600 rounded-r-xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">📝 Quick Summary: Nepal Income Tax At-A-Glance</h3>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li><strong>Unified Tax Framework:</strong> The separate single and married filing schedules have been completely merged into a single unified table.</li>
                <li><strong>Expanded Low-Tax Bracket:</strong> The initial 1% tax tier has doubled from Rs. 5,00,000 to <strong>Rs. 10,00,000</strong> per year.</li>
                <li><strong>Slashed Ceiling Rate:</strong> The maximum marginal personal income tax rate has dropped by 10 percentage points from 39% down to <strong>29%</strong>.</li>
                <li><strong>The SSF 1% Tax Waiver:</strong> Employees enrolled in the <strong>Social Security Fund (SSF)</strong> receive a 0% rate on their first income tier instead of the standard 1% social security tax.</li>
                <li><strong>Maximum Annual Deduction Limits:</strong> Combined retirement fund allocations (SSF, CIT, EPF) remain capped at <strong>Rs. 5,00,000</strong> or 1/3 of total assessable income.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">How is salary tax calculated in Nepal?</h2>
            <div className="prose prose-slate max-w-none space-y-4">
              <p className="text-slate-700 leading-relaxed">
                Salary tax in Nepal is calculated systematically using these five steps:
              </p>
              <ol className="list-decimal pl-6 text-slate-700 space-y-2">
                <li><strong>Determine Gross Annual Income:</strong> Combine your base salary, allowances, and taxable bonuses.</li>
                <li><strong>Deduct Pre-Tax Contributions:</strong> Subtract eligible SSF, CIT, and EPF allocations up to regulatory caps.</li>
                <li><strong>Apply Unified Tax Slabs:</strong> Divide the remaining taxable income into progressive marginal brackets.</li>
                <li><strong>Apply Eligible Rebates:</strong> Deduct specific tax credits, such as the 10% tax rebate for female employees.</li>
                <li><strong>Calculate Monthly Withholding:</strong> Divide the total annual tax liability by 12 to find the monthly Tax Deducted at Source (TDS).</li>
              </ol>
            </div>
            
            <div className="p-6 bg-[#FFF9E6] border-l-4 border-amber-500 rounded-r-xl mt-6">
              <h3 className="text-lg font-bold text-amber-900 mb-2">🎁 Factoring in the Dashain Bonus & Festival Allowance</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                When calculating your total annual tax projection, remember to include your Festival Allowance (commonly referred to as the 13th-month or Dashain bonus). In Nepal, this bonus is considered part of your gross assessable income for the fiscal year. To avoid under-withholding your monthly TDS, add your expected bonus amount to your annual gross earnings inside our interactive calculator field.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">📊 Inland Revenue Department (IRD) Income Tax Slabs</h2>
            <p className="text-slate-700 mb-4">
              Following the latest budget updates, progressive tax allocations apply equally to all resident individuals.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b-2 border-slate-200 text-slate-900">
                    <th className="p-4 font-bold">Annual Taxable Income Band (NPR)</th>
                    <th className="p-4 font-bold text-center">Marginal Tax Rate</th>
                    <th className="p-4 font-bold">Maximum Accumulated Tax inside Slab</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-4">Up to Rs. 10,00,000</td>
                    <td className="p-4 text-center font-bold">1% <span className="text-xs font-normal text-slate-500 block">(0% if enrolled in SSF)</span></td>
                    <td className="p-4">Rs. 10,000</td>
                  </tr>
                  <tr>
                    <td className="p-4">Rs. 10,00,001 to Rs. 15,00,000</td>
                    <td className="p-4 text-center font-bold">10%</td>
                    <td className="p-4">Rs. 50,000</td>
                  </tr>
                  <tr>
                    <td className="p-4">Rs. 15,00,001 to Rs. 25,00,000</td>
                    <td className="p-4 text-center font-bold">20%</td>
                    <td className="p-4">Rs. 2,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-4">Rs. 25,00,001 to Rs. 40,00,000</td>
                    <td className="p-4 text-center font-bold">27%</td>
                    <td className="p-4">Rs. 4,05,000</td>
                  </tr>
                  <tr>
                    <td className="p-4">Above Rs. 40,00,000</td>
                    <td className="p-4 text-center font-bold">29%</td>
                    <td className="p-4 italic">Dynamic based on income</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <details className="mt-8 group border border-slate-200 rounded-xl bg-white shadow-sm">
              <summary className="cursor-pointer p-4 font-bold text-slate-800 bg-slate-50 rounded-xl group-open:rounded-b-none transition-colors hover:bg-slate-100 flex items-center justify-between">
                <span>🏛️ Retrospective Reference: FY 2082/83 Income Tax Slabs</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 text-slate-700 space-y-4 border-t border-slate-100">
                <p className="text-sm">
                  If you are processing back-pay, reviewing historical tax filings, or auditing salary distributions for the previous fiscal year, use these legacy multi-schedule frameworks. Note that under the old rules, separate thresholds applied to individual versus married filers:
                </p>
                <div className="bg-slate-50 p-4 rounded-lg text-sm border border-slate-200 space-y-3">
                  <div>
                    <strong className="text-slate-900">Individual Slabs (Old):</strong> 
                    <span className="block mt-1">1% up to Rs. 5,00,000 | 10% up to Rs. 7,00,000 | 20% up to Rs. 10,00,000 | 30% up to Rs. 20,00,000 | 36% up to Rs. 50,00,000 | 39% above Rs. 50,00,000.</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Married Slabs (Old):</strong> 
                    <span className="block mt-1">1% up to Rs. 6,00,000 | 10% up to Rs. 8,00,000 | 20% up to Rs. 11,00,000 | 30% up to Rs. 20,00,000 | 36% up to Rs. 50,00,000 | 39% above Rs. 50,00,000.</span>
                  </div>
                </div>
              </div>
            </details>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">🧮 Practical Example: Rs. 80,000 Monthly Salary Matrix</h2>
            
            <div className="mb-8 p-6 bg-slate-800 text-slate-300 rounded-xl overflow-x-auto border border-slate-700 shadow-inner">
              <h4 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Blueprint</span> 
                Salary Tax Deductions Hierarchy (The Order of Operations)
              </h4>
              <pre className="font-mono text-sm leading-relaxed whitespace-pre">
{`[Gross Monthly Salary × 12] + [13th-Month Dashain Bonus]
                        │
                        ▼
           [ Gross Annual Income Subtotal ]
                        │
                        ▼  (Subtract SSF / EPF / CIT Contributions)
                        │  *Max Cap: 1/3 of Income or Rs. 5,00,000
                        │
                        ▼  (Subtract Health/Life Insurance Premiums)
                        │  *Max Cap: Rs. 40,000 (Life) & Rs. 20,000 (Health)
                        │
                        ▼
            [ Net Taxable Income Balance ]
                        │
                        ▼  (Map to Progressive Slabs: 0% to 29%)
                        │
                        ▼  (Apply 10% Female Tax Rebate if Applicable)
                        │
                        ▼
            [ Final Annual Tax Liability ] ÷ 12 
                        │
                        ▼
           [ Final Monthly TDS Withholding ]`}
              </pre>
            </div>

            <p className="text-slate-700 mb-6">
              This highly structured breakdown demonstrates how a gross monthly salary of <strong>Rs. 80,000</strong> scales for an employee enrolled in the Social Security Fund who additionally deposits <strong>Rs. 10,000</strong> monthly into CIT. Because their net taxable income falls completely below the new Rs. 10 Lakh threshold and they enjoy the SSF tax waiver, their monthly withholding tax drops to zero.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#E8F0FE] text-[#1A73E8]">
                    <th className="p-4 font-bold border-b border-slate-200">Calculation Element / Component</th>
                    <th className="p-4 font-bold border-b border-slate-200">Monthly Figures</th>
                    <th className="p-4 font-bold border-b border-slate-200">Annual Projections</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Gross Salary</td>
                    <td className="p-4">Rs. 80,000</td>
                    <td className="p-4">Rs. 9,60,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Employee SSF Contribution</td>
                    <td className="p-4 text-red-600">- Rs. 5,280</td>
                    <td className="p-4 text-red-600">- Rs. 63,360</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">CIT Contribution (Deduction)</td>
                    <td className="p-4 text-red-600">- Rs. 10,000</td>
                    <td className="p-4 text-red-600">- Rs. 1,20,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">Net Taxable Income</td>
                    <td className="p-4">Rs. 64,720</td>
                    <td className="p-4 font-black">Rs. 7,76,640</td>
                  </tr>
                  <tr>
                    <td className="p-4 italic text-slate-500">Slab 1 Tax Allocation (0% due to SSF waiver)</td>
                    <td className="p-4">Rs. 0</td>
                    <td className="p-4">Rs. 0</td>
                  </tr>
                  <tr className="bg-[#FCE8E6]">
                    <td className="p-4 font-black text-[#D93025]">Total Calculated Income Tax (TDS)</td>
                    <td className="p-4 font-black text-[#D93025]">Rs. 0</td>
                    <td className="p-4 font-black text-[#D93025]">Rs. 0</td>
                  </tr>
                  <tr className="bg-[#E6F4EA]">
                    <td className="p-4 font-black text-[#137333] text-lg">Net Take-Home Salary</td>
                    <td className="p-4 font-black text-[#137333] text-lg">Rs. 69,920</td>
                    <td className="p-4 font-black text-[#137333] text-lg">Rs. 8,39,040</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">🌐 Salary Received in USD? Foreign Income Rules</h2>
            <div className="prose prose-slate max-w-none space-y-4 text-slate-700">
              <p>
                If you work as a remote contractor, freelancer, or offshore software engineer and receive your salary from foreign employers in foreign currencies, you must first convert your earnings from <strong>USD to NPR</strong>.
              </p>
              <p>
                To do this accurately, use the daily reference exchange rates issued by the <strong>Nepal Rastra Bank (NRB)</strong> before entering your gross figures into our tax tool. Under current service export regulations, independent freelancers processing foreign currency via local banks may qualify for streamlined final withholding tax setups (typically a flat 5% final TDS) instead of standard progressive employment slabs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions (FAQ)</h2>
            <div className="space-y-6">
              {[
                {
                  q: "How do I calculate salary tax in Nepal?",
                  a: "To calculate salary tax, find your total gross annual earnings, subtract approved pre-tax deductions (like SSF or CIT), pass the remaining balance through the progressive IRD tax slabs, apply any applicable credits, and divide the final annual tax figure by 12."
                },
                {
                  q: "What is the current salary tax rate in Nepal?",
                  a: "Rather than a single flat rate, individual salary tax relies on a progressive marginal matrix with brackets set at 1%, 10%, 20%, 27%, and 29% depending on your exact annual taxable income tier."
                },
                {
                  q: "Does SSF reduce income tax?",
                  a: "Yes. Your Social Security Fund contributions are fully deductible from gross earnings. Furthermore, workers contributing to the SSF are exempt from paying the initial 1% social security tax on their first Rs. 10 Lakh slab."
                },
                {
                  q: "How much CIT contribution is tax deductible?",
                  a: "You are permitted to deduct contributions made to the Citizen Investment Trust (CIT) up to a maximum cap of Rs. 5,00,000 per year or one-third (1/3) of your total assessable income, whichever threshold is lower."
                },
                {
                  q: "What is my take-home salary after tax?",
                  a: "Your net monthly take-home salary is computed by taking your total monthly gross compensation and subtracting your retirement contributions (SSF/EPF/CIT) along with your monthly calculated withholding tax (TDS)."
                },
                {
                  q: "What are the latest income tax slabs in Nepal?",
                  a: "Under the current unified system, the progressive tax brackets are 1% on income up to Rs. 10,00,000; 10% on the next Rs. 5,00,000; 20% on the next Rs. 10,00,000; 27% on the next Rs. 15,00,000; and 29% on all remaining amounts over Rs. 40,00,000."
                },
                {
                  q: "Is this calculator based on IRD tax slabs?",
                  a: "Yes. This financial framework tool is updated continuously to stay in absolute synchronization with the official guidelines and parameters enacted by the Inland Revenue Department (IRD) of Nepal."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-8 border-t border-slate-200">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 mb-8">
              <h4 className="font-bold text-slate-800 mb-2">⚖️ Institutional Disclaimer & E-E-A-T Compliance Note</h4>
              <p>
                This calculator functions as an educational framework tool based on the Finance Bill 2083 and the Income Tax Act, 2058 of Nepal. While NepaCalc continuously tracks policy changes enacted by the Inland Revenue Department (IRD) and updates calculation logic accordingly, financial rules are subject to final legislative adjustments. This tool does not constitute official legal or tax advisory services. Always verify final payroll sheets and statutory returns with a certified Chartered Accountant or your internal HR compliance officer before executing financial distributions.
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">🛠️ Explore Related Financial & Tax Utilities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
              <li><a href="/calculator/nepal-vehicle-tax/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🏎️</span> <span className="underline underline-offset-2">Vehicle Tax Calculator</span></a></li>
              <li><a href="/calculator/property-tax/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🏡</span> <span className="underline underline-offset-2">Property Tax Calculator</span></a></li>
              <li><a href="/calculator/sip-nepal/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">📈</span> <span className="underline underline-offset-2">SIP Calculator Nepal</span></a></li>
              <li><a href="/calculator/usd-to-npr/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">💵</span> <span className="underline underline-offset-2">USD to NPR Currency Converter</span></a></li>
              <li><a href="/tools/nrb-rates/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🏦</span> <span className="underline underline-offset-2">NRB Daily Exchange Rates</span></a></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
