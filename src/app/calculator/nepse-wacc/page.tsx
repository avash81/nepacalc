import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "NEPSE WACC Calculator Share Average Calculator Nepal 2026",
  description: "Calculate your NEPSE share average price instantly. Free WACC Calculator Nepal with support for IPO, FPO, bonus shares, rights shares, broker commission, SEBON fee and break-even analysis.",
  slug: 'nepse-wacc',
  keywords: [
    "nepse wacc calculator", "share average calculator nepal", "nepse share average calculator",
    "meroshare wacc calculator", "average share price calculator", "share calculator nepal",
    "capital gain tax calculator nepal", "nepse average calculator", "weighted average calculator nepal"
  ],
});

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/nepse-wacc/#webapp",
      "name": "NEPSE WACC Calculator",
      "url": "https://nepacalc.com/calculator/nepse-wacc/",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "description": "Calculate weighted average share price for NEPSE stocks."
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://nepacalc.com/calculator/nepse-wacc/#software",
      "name": "NEPSE WACC Calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/calculator/nepse-wacc/#webpage",
      "url": "https://nepacalc.com/calculator/nepse-wacc/",
      "name": "NEPSE WACC Calculator Nepal",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          ".calculator-summary",
          ".definition-box",
          ".faq-section"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://nepacalc.com/calculator/nepse-wacc/#breadcrumb",
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
          "name": "NEPSE WACC Calculator"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/nepse-wacc/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is WACC in NEPSE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WACC is the weighted average cost per share based on all your share purchases."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate average share price in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Add all purchase amounts, divide by total shares owned, and include transaction expenses for a more accurate result."
          }
        },
        {
          "@type": "Question",
          "name": "Does MeroShare use WACC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, MeroShare requires investors to update their purchase history using the WACC standard to accurately calculate Capital Gains Tax during share sales."
          }
        },
        {
          "@type": "Question",
          "name": "Are bonus shares included in WACC calculation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Bonus shares increase the number of shares without increasing investment cost, which significantly reduces the average cost per share."
          }
        },
        {
          "@type": "Question",
          "name": "How do rights shares affect average price?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rights shares increase both your total investment amount and your total share quantity. The weighted average price must be dynamically recalculated using these new totals."
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

      <div className="hp-container pb-16 pt-8">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* AI Overview / Definition Box */}
          <div className="definition-box p-6 bg-[#E8F0FE] border-l-4 border-blue-600 rounded-r-xl shadow-sm mb-6 calculator-summary">
            <h2 className="text-xl font-bold text-slate-900 mb-2">What is NEPSE WACC?</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              NEPSE WACC (Weighted Average Cost of Capital) is the average purchase cost of a stock after combining multiple buy transactions at different prices. The average share price in NEPSE is calculated by dividing the total investment amount by the total number of shares purchased.
            </p>
            <div className="bg-white p-4 rounded-md border border-blue-100">
               <p className="font-bold text-sm text-slate-800 mb-2">Example Calculation:</p>
               <ul className="text-sm text-slate-600 space-y-1 mb-3">
                 <li>100 Kitta @ Rs. 400</li>
                 <li>50 Kitta @ Rs. 300</li>
               </ul>
               <p className="text-sm font-bold text-blue-800">Average Price: Rs. 366.67 per share</p>
            </div>
          </div>

          <section>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              NEPSE WACC Calculator (Updated 2026) – Free Share Average Calculator Nepal
            </h1>
            <p className="text-slate-700 leading-relaxed mb-4">
              Track your exact share average price, weighted average cost (WACC), and actual acquisition cost for shares listed on the Nepal Stock Exchange (NEPSE). Whether you purchased shares through an IPO, FPO, secondary market, rights offering, auction, or received bonus shares, this calculator helps you determine the correct average cost price used in MeroShare and capital gain calculations.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Investors frequently use a NEPSE WACC Calculator to monitor portfolio performance, calculate break-even prices, and determine taxable profits when selling shares. Instead of manually calculating weighted averages across multiple transactions, this tool instantly computes your share average using official investment accounting principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">How to Calculate Share Average in Nepal</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Whenever you purchase the same stock multiple times at different prices, you need to calculate a weighted average cost rather than a simple arithmetic average. The weighted average method gives higher importance to transactions with larger quantities.
            </p>
            <ol className="list-decimal pl-6 text-slate-700 space-y-2 mb-6">
              <li>Collect all purchase transactions.</li>
              <li>Multiply quantity by purchase price for each transaction.</li>
              <li>Calculate total investment.</li>
              <li>Add all shares together.</li>
              <li>Divide total investment by total shares.</li>
              <li>Adjust for bonus and rights shares.</li>
              <li>Include broker commission if calculating actual acquisition cost.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">NEPSE WACC Formula</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The official formula used by MeroShare to determine your holding cost basis is straightforward:
            </p>
            <div className="p-6 bg-slate-800 text-white rounded-xl font-mono text-center mb-6">
              <div className="text-lg mb-4">WACC = Total Investment Amount ÷ Total Shares</div>
              <code className="bg-slate-900 text-green-400 p-2 rounded block">
                WACC = Σ(Quantity × Price) ÷ Σ(Quantity)
              </code>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">NEPSE Share Average Calculation Example</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse border border-slate-200 bg-white shadow-sm rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="p-3 font-bold border-b border-blue-800">Purchase</th>
                    <th className="p-3 font-bold border-b border-blue-800">Quantity</th>
                    <th className="p-3 font-bold border-b border-blue-800">Price</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 border-b border-slate-200 font-medium">1</td>
                    <td className="p-3 border-b border-slate-200">100</td>
                    <td className="p-3 border-b border-slate-200">Rs 400</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 border-b border-slate-200 font-medium">2</td>
                    <td className="p-3 border-b border-slate-200">50</td>
                    <td className="p-3 border-b border-slate-200">Rs 340</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">NEPSE WACC vs Simple Average</h2>
                <table className="w-full text-left border-collapse border border-slate-200 bg-white">
                  <thead>
                    <tr className="bg-slate-50 text-slate-900">
                      <th className="p-3 font-bold border-b border-slate-200">Metric</th>
                      <th className="p-3 font-bold border-b border-slate-200 text-center">Simple Average</th>
                      <th className="p-3 font-bold border-b border-slate-200 text-center">WACC</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 text-sm">
                    <tr>
                      <td className="p-3 border-b border-slate-200">Uses Quantity Weighting</td>
                      <td className="p-3 border-b border-slate-200 text-center text-red-500">No</td>
                      <td className="p-3 border-b border-slate-200 text-center text-green-600 font-bold">Yes</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-slate-200">Used by MeroShare</td>
                      <td className="p-3 border-b border-slate-200 text-center text-red-500">No</td>
                      <td className="p-3 border-b border-slate-200 text-center text-green-600 font-bold">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">How Broker Commission Affects Share Average</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Many investors make the mistake of calculating WACC using only the purchase price. In reality, your actual acquisition cost should include trading expenses. When buying shares through NEPSE, your total cost may include Purchase Amount, Broker Commission, SEBON Fee, DP Charge, and Clearing Charges.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-center text-slate-800 font-bold mb-6">
              Actual Cost = Purchase Value + Broker Commission + SEBON Fee + DP Charge
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Share Types and Their Effect on WACC</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse border border-slate-200 bg-white shadow-sm rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="p-3 font-bold border-b border-blue-800">Share Type</th>
                    <th className="p-3 font-bold border-b border-blue-800">Impact on WACC</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="hover:bg-slate-50"><td className="p-3 border-b border-slate-200 font-medium">IPO</td><td className="p-3 border-b border-slate-200">Usually lowers average</td></tr>
                  <tr className="hover:bg-slate-50"><td className="p-3 border-b border-slate-200 font-medium">FPO</td><td className="p-3 border-b border-slate-200">Recalculates average</td></tr>
                  <tr className="hover:bg-slate-50"><td className="p-3 border-b border-slate-200 font-medium">Secondary Market</td><td className="p-3 border-b border-slate-200">Recalculates average</td></tr>
                  <tr className="hover:bg-slate-50"><td className="p-3 border-b border-slate-200 font-medium">Bonus Share</td><td className="p-3 border-b border-slate-200 text-green-600 font-bold">Reduces average</td></tr>
                  <tr className="hover:bg-slate-50"><td className="p-3 border-b border-slate-200 font-medium">Rights Share</td><td className="p-3 border-b border-slate-200">Recalculates average</td></tr>
                  <tr className="hover:bg-slate-50"><td className="p-3 border-b border-slate-200 font-medium">Auction Share</td><td className="p-3 border-b border-slate-200">Recalculates average</td></tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">How Bonus Shares Affect WACC</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Bonus shares significantly affect your average share price. When a company distributes bonus shares, the number of shares increases while the investment amount remains unchanged. This automatically lowers your average cost per share.
            </p>
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-6">
               <p className="mb-2"><strong>Before Bonus:</strong> 100 Kitta @ Rs. 500 (Investment = Rs. 50,000)</p>
               <p className="mb-2 text-blue-700"><strong>Bonus Ratio:</strong> 1:1</p>
               <p className="mb-2"><strong>After Bonus:</strong> 200 Kitta (Investment = Rs. 50,000)</p>
               <p className="text-lg font-bold text-green-700 border-t border-slate-200 pt-2 mt-2">New Average Cost = Rs. 250</p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">How Rights Shares Affect Average Cost</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Rights shares differ from bonus shares because investors pay an additional amount to subscribe. When rights shares are purchased, both your total shares and total investment amount increase. The weighted average must be recalculated to reflect the new injection of capital. Rights shares usually reduce the average price if issued below the current market average.
            </p>
          </section>

          <section className="faq-section">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "What is WACC in NEPSE?",
                  a: "WACC is the weighted average cost per share based on all your share purchases."
                },
                {
                  q: "How do I calculate average share price in Nepal?",
                  a: "Add all purchase amounts, divide by total shares owned, and include transaction expenses for a more accurate result."
                },
                {
                  q: "Does MeroShare use WACC?",
                  a: "Yes, MeroShare requires investors to update their purchase history using the WACC standard to accurately calculate Capital Gains Tax during share sales."
                },
                {
                  q: "Are bonus shares included in WACC calculation?",
                  a: "Yes. Bonus shares increase the number of shares without increasing investment cost, which significantly reduces the average cost per share."
                },
                {
                  q: "How do rights shares affect average price?",
                  a: "Rights shares increase both your total investment amount and your total share quantity. The weighted average price must be dynamically recalculated using these new totals."
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
            <h3 className="text-xl font-bold text-slate-900 mb-4">Related NEPSE Tools</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 mb-8">
              <li><Link href="/calculator/nepal-stocks/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">📈</span> <span className="underline underline-offset-2">Share Profit Calculator</span></Link></li>
              <li><Link href="/calculator/nepal-stocks/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🤝</span> <span className="underline underline-offset-2">Broker Commission Calculator</span></Link></li>
              <li><Link href="/calculator/nepal-tds/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">💸</span> <span className="underline underline-offset-2">Capital Gain Tax Calculator</span></Link></li>
              <li><Link href="/calculator/nepse-bonus-tax/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🎁</span> <span className="underline underline-offset-2">Bonus Share Calculator</span></Link></li>
              <li><Link href="/calculator/nepse-wacc/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">⚖️</span> <span className="underline underline-offset-2">Rights Share Calculator</span></Link></li>
              <li><Link href="/calculator/cagr-calculator/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">📊</span> <span className="underline underline-offset-2">CAGR Calculator</span></Link></li>
              <li><Link href="/calculator/sip-calculator/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">📆</span> <span className="underline underline-offset-2">SIP Calculator</span></Link></li>
            </ul>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 space-y-4">
              <h4 className="font-bold text-slate-800">Official Sources & References</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li><a href="https://nepalstock.com.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Nepal Stock Exchange</a> — Official market information and listed company announcements.</li>
                <li><a href="https://meroshare.cdsc.com.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">CDS and Clearing Limited</a> — Investors can manage holdings and verify share transactions through MeroShare.</li>
                <li><a href="https://sebon.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Securities Board of Nepal</a> — Regulates Nepal's securities market and publishes investor protection guidelines.</li>
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
