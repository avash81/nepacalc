import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Salary Calculator Nepal (FY 2083/84) | Income Tax, TDS & SSF",
  description: "Calculate salary tax in Nepal using the latest FY 2083/84 IRD tax slabs. Includes SSF, CIT, EPF deductions, TDS calculations, and net take-home salary.",
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
      "@type": "WebPage",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#webpage",
      "url": "https://nepacalc.com/calculator/nepal-salary/",
      "name": "Salary Calculator Nepal",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          ".definition-box",
          ".faq-section",
          ".citation-answer"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nepacalc.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Calculators",
          "item": "https://nepacalc.com/calculator/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Salary Calculator Nepal"
        }
      ]
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
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-slate-700"><strong>Tip:</strong> Plan your annual expenses better by estimating your vehicle tax using the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Bluebook Renewal Calculator</Link>.</p>
      </div>


      <div className="hp-container pb-16 pt-8">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* AI Overview / Definition Box */}
          <div className="definition-box p-6 bg-[#E8F0FE] border-l-4 border-blue-600 rounded-r-xl shadow-sm mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">What is a Salary Calculator Nepal?</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              A Salary Calculator in Nepal helps employees and employers determine exact monthly take-home pay by automatically deducting statutory requirements like the Social Security Fund (SSF), Citizen Investment Trust (CIT), Employees Provident Fund (EPF), and calculating progressive income tax based on Inland Revenue Department (IRD) tax slabs.
            </p>
            <div className="bg-white p-4 rounded-md border border-blue-100 citation-answer">
               <p className="font-bold text-sm text-slate-800 mb-2">How is Salary Tax calculated in Nepal?</p>
               <p className="text-sm text-slate-600 leading-relaxed">
                 The salary tax in Nepal is calculated by taking total gross annual income, subtracting pre-tax retirement contributions (SSF, EPF, CIT), and applying the remaining taxable income to progressive tax slabs (1%, 10%, 20%, 27%, 29%). Finally, any eligible rebates like the 10% female tax discount are applied, and the total is divided by 12 to find the monthly TDS.
               </p>
            </div>
          </div>

          <section>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Salary Calculator Nepal (Income Tax & TDS Calculator)
            </h1>
            <p className="text-slate-700 leading-relaxed mb-4">
              Understanding your actual monthly take-home pay can be difficult due to complex tax slabs, SSF contribution rules, and various deductions. The NepaCalc Salary Calculator simplifies this process, instantly converting your gross salary into net pay while complying with the latest IRD regulations.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Whether you are negotiating a new job offer, planning your personal finances, or managing HR payroll, this tool provides an accurate breakdown of your monthly tax liabilities and statutory deductions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Salary Calculation Formula</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Your final take-home salary is calculated using the following structure:
            </p>
            <div className="p-6 bg-slate-800 text-white rounded-xl font-mono text-center mb-6">
              <div className="text-lg mb-4">Net Salary = Gross Salary - (SSF + CIT + EPF + Monthly Tax)</div>
              <code className="bg-slate-900 text-green-400 p-2 rounded block">
                Monthly Tax = [Σ(Taxable Slabs) - Rebates] ÷ 12
              </code>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Nepal Salary Tax Calculation Example</h2>
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-6">
               <p className="mb-2"><strong>Gross Monthly Salary:</strong> NPR 80,000 (NPR 9,60,000 Annual)</p>
               <p className="mb-2 text-blue-700"><strong>Contributions:</strong> 11% SSF enrolled</p>
               <ul className="text-sm text-slate-600 space-y-1 mb-3 pl-4">
                 <li>SSF Deduction (11%): NPR 8,800/month</li>
                 <li>Taxable Income: NPR 8,54,400 (falls in 1% bracket)</li>
                 <li>Total Annual Tax: NPR 0 (SSF members are exempt from 1% Social Security Tax)</li>
               </ul>
               <p className="text-lg font-bold text-green-700 border-t border-slate-200 pt-2 mt-2">Net Take-Home Salary = NPR 71,200</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Tax Calculator vs Salary Calculator</h2>
                <table className="w-full text-left border-collapse border border-slate-200 bg-white">
                  <thead>
                    <tr className="bg-slate-50 text-slate-900">
                      <th className="p-3 font-bold border-b border-slate-200">Tool</th>
                      <th className="p-3 font-bold border-b border-slate-200">Primary Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 text-sm">
                    <tr>
                      <td className="p-3 border-b border-slate-200 font-bold">Salary Calculator</td>
                      <td className="p-3 border-b border-slate-200">Calculates net take-home pay and monthly TDS.</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-slate-200 font-bold">Income Tax Calculator</td>
                      <td className="p-3 border-b border-slate-200">Audits exact tax brackets and annual IRD liabilities.</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-slate-200 font-bold">SSF Calculator</td>
                      <td className="p-3 border-b border-slate-200">Calculates employer vs employee contribution ratios.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="faq-section">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How do I calculate salary tax in Nepal?",
                  a: "Find your gross annual income, subtract pre-tax deductions like SSF or CIT up to allowed caps, map the remaining balance to progressive IRD slabs, apply any eligible rebates, and divide the total annual liability by 12."
                },
                {
                  q: "What is the current salary tax rate in Nepal?",
                  a: "Nepal utilizes progressive brackets of 1%, 10%, 20%, 27%, and 29% based on the individual's annual assessable income."
                },
                {
                  q: "Does SSF reduce income tax?",
                  a: "Yes, contributions reduce taxable baseline income. Enrolled workers also get a 0% rate on their first Rs. 10 Lakh income bracket instead of paying the standard 1% social security tax."
                },
                {
                  q: "How much CIT contribution is tax deductible?",
                  a: "CIT deposits are tax-deductible up to an annual limit of Rs. 5,00,000 or one-third of total assessable compensation, whichever is less."
                },
                {
                  q: "What is my take-home salary after tax?",
                  a: "Take-home salary equals gross compensation minus all pre-tax retirement plan contributions and monthly tax withholdings (TDS)."
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
            <h3 className="text-xl font-bold text-slate-900 mb-4">Related Tax Calculators</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 mb-8">
            <li><Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Bluebook Renewal Calculator</Link></li>

              <li><Link href="/calculator/nepal-income-tax/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">📊</span> <span className="underline underline-offset-2">Income Tax Calculator</span></Link></li>
              <li><Link href="/calculator/nepal-tds/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">⚖️</span> <span className="underline underline-offset-2">TDS Calculator</span></Link></li>
              <li><Link href="/calculator/nepal-provident-fund/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🏦</span> <span className="underline underline-offset-2">Provident Fund Calculator</span></Link></li>
              <li><Link href="/calculator/nepal-vat/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🧾</span> <span className="underline underline-offset-2">VAT Calculator</span></Link></li>
            </ul>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 space-y-4">
              <h4 className="font-bold text-slate-800">Official Sources & References</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li><a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Inland Revenue Department (IRD)</a> — Official tax brackets and fiscal acts.</li>
                <li><a href="https://ssf.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Social Security Fund</a> — Guidelines on employee contribution ratios.</li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-slate-200 text-xs flex flex-col sm:flex-row justify-between gap-4">
                <div className="bg-white border border-slate-200 p-3 rounded-lg max-w-[250px]">
                   <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block mb-1">Reviewed By</span>
                   <span className="text-slate-800 font-bold block">NepaCalc Finance Team</span>
                </div>
                <div className="text-right flex flex-col justify-end">
                   <p className="text-slate-500"><strong>Last Updated:</strong> June 2026</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
