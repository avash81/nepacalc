import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "NEPSE WACC Calculator Nepal (2026) – Share Average Calculator & MeroShare WACC Tool",
  description: "Calculate NEPSE share average price, WACC, bonus share adjustment, rights share average, broker commission, and capital gain tax. Free MeroShare WACC calculator for Nepal investors.",
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
      "name": "NEPSE WACC Calculator Nepal",
      "url": "https://nepacalc.com/calculator/nepse-wacc/",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "description": "Calculate NEPSE share average price, WACC, bonus share adjustment, rights share average, broker commission, and capital gain tax."
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/nepse-wacc/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is WACC in MeroShare?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WACC refers to the weighted average acquisition cost of your shares. It is used to determine profits, losses, and capital gains when selling shares."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate share average in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Add all purchase amounts, divide by total shares owned, and include transaction expenses for a more accurate result."
          }
        },
        {
          "@type": "Question",
          "name": "Does broker commission affect share average?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Broker commission increases your acquisition cost and should be included when calculating actual cost per share."
          }
        },
        {
          "@type": "Question",
          "name": "How do bonus shares affect WACC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bonus shares increase the number of shares without increasing investment cost, reducing the average cost per share."
          }
        },
        {
          "@type": "Question",
          "name": "How do rights shares affect average price?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rights shares increase both investment and quantity. The weighted average price must be recalculated using the new totals."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between WACC and average share price?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In NEPSE investing, both terms generally refer to the weighted average acquisition cost of shares owned by an investor."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate IPO and secondary market shares together?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All share purchases can be combined into a single weighted average calculation."
          }
        },
        {
          "@type": "Question",
          "name": "What is the actual cost per share?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Actual cost per share includes purchase value, broker commission, SEBON fee, DP charge, and other transaction costs."
          }
        },
        {
          "@type": "Question",
          "name": "How is capital gain calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Capital gain equals selling value minus acquisition cost."
          }
        },
        {
          "@type": "Question",
          "name": "Why is my MeroShare average price different?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Differences often occur because of bonus share adjustments, rights share allocations, broker fees, or incomplete transaction records."
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

          {/* AI Overview / Quick Answer Box */}
          <div className="p-6 bg-[#E8F0FE] border-l-4 border-blue-600 rounded-r-xl shadow-sm mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Quick Answer: What is WACC in NEPSE?</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              NEPSE WACC (Weighted Average Cost Price) is the average acquisition cost of shares purchased at different prices. NEPSE investors use WACC to calculate profit, loss, and capital gains when selling shares through MeroShare.
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
              NEPSE WACC Calculator Nepal (Weighted Average Share Price Calculator)
            </h1>
            <p className="text-slate-700 leading-relaxed mb-4">
              Track your exact share average price, weighted average cost (WACC), and actual acquisition cost for shares listed on the Nepal Stock Exchange (NEPSE). Whether you purchased shares through an IPO, FPO, secondary market, rights offering, auction, or received bonus shares, this calculator helps you determine the correct average cost price used in MeroShare and capital gain calculations.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Investors frequently use a NEPSE WACC Calculator to monitor portfolio performance, calculate break-even prices, and determine taxable profits when selling shares. Instead of manually calculating weighted averages across multiple transactions, this tool instantly computes your share average using official investment accounting principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">What is WACC in NEPSE?</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              In the Nepal Stock Exchange (NEPSE), WACC commonly refers to the Weighted Average Cost of Capital or Weighted Average Cost Price of shares held by an investor. Your WACC represents the average purchase price of all shares after combining multiple buy transactions at different rates.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">For example:</p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50 text-slate-900">
                    <th className="p-3 font-bold border-b border-slate-200">Transaction</th>
                    <th className="p-3 font-bold border-b border-slate-200">Quantity</th>
                    <th className="p-3 font-bold border-b border-slate-200">Price</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 text-sm">
                  <tr>
                    <td className="p-3 border-b border-slate-200">Purchase 1</td>
                    <td className="p-3 border-b border-slate-200">100 Kitta</td>
                    <td className="p-3 border-b border-slate-200">Rs. 400</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-slate-200">Purchase 2</td>
                    <td className="p-3 border-b border-slate-200">50 Kitta</td>
                    <td className="p-3 border-b border-slate-200">Rs. 300</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Your average price is <strong>not Rs. 350</strong>. Instead, it is calculated using a weighted average formula based on the number of shares purchased at each price level. This average cost becomes important when:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-1">
              <li>Selling shares through MeroShare</li>
              <li>Calculating capital gains tax</li>
              <li>Tracking portfolio profitability</li>
              <li>Adjusting bonus and rights shares</li>
              <li>Recording IPO and FPO holdings</li>
            </ul>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">NEPSE Weighted Average Formula</h2>
            <div className="p-6 bg-slate-800 text-white rounded-xl font-mono text-center mb-6">
              <div className="text-lg">Weighted Average Price =</div>
              <div className="my-2 border-t border-slate-600 w-64 mx-auto pt-2 text-xl font-bold">
                Σ (Quantity × Price) <br/>
                <span className="text-sm font-normal text-slate-400">divided by</span> <br/>
                Σ Quantity
              </div>
            </div>
            <ul className="list-none space-y-2 text-slate-700">
              <li><strong>Quantity:</strong> Number of Kitta purchased</li>
              <li><strong>Price:</strong> Purchase rate per share</li>
              <li><strong>Total Investment:</strong> Quantity × Price</li>
              <li><strong>Total Shares:</strong> Sum of all purchased shares</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              The final weighted average price becomes the actual acquisition cost per share.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Calculation Example</h2>
              <div className="bg-white border border-slate-200 p-5 rounded-lg">
                 <h4 className="font-bold text-slate-800 mb-2 border-b pb-2">First Purchase</h4>
                 <p className="text-sm text-slate-600 mb-1">Quantity: 100 Kitta @ Rs. 400</p>
                 <p className="text-sm text-slate-600 mb-4">Investment: Rs. 40,000</p>
                 
                 <h4 className="font-bold text-slate-800 mb-2 border-b pb-2">Second Purchase</h4>
                 <p className="text-sm text-slate-600 mb-1">Quantity: 50 Kitta @ Rs. 300</p>
                 <p className="text-sm text-slate-600 mb-4">Investment: Rs. 15,000</p>
                 
                 <div className="bg-[#E8F0FE] p-3 rounded text-blue-900">
                    <p>Total Investment: <strong>Rs. 55,000</strong></p>
                    <p>Total Shares: <strong>150 Kitta</strong></p>
                    <p className="text-lg mt-2 border-t border-blue-200 pt-2">Average Cost: <strong>Rs. 366.67</strong></p>
                 </div>
              </div>
            </div>
            
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
                    <td className="p-3 border-b border-slate-200">Accurate Cost Basis</td>
                    <td className="p-3 border-b border-slate-200 text-center text-red-500">No</td>
                    <td className="p-3 border-b border-slate-200 text-center text-green-600 font-bold">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-slate-200">Used by MeroShare</td>
                    <td className="p-3 border-b border-slate-200 text-center text-red-500">No</td>
                    <td className="p-3 border-b border-slate-200 text-center text-green-600 font-bold">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-slate-200">Used for Capital Gains</td>
                    <td className="p-3 border-b border-slate-200 text-center text-red-500">No</td>
                    <td className="p-3 border-b border-slate-200 text-center text-green-600 font-bold">Yes</td>
                  </tr>
                </tbody>
              </table>
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
            
            <h3 className="text-xl font-bold text-slate-900 mb-3">Share Average Calculator with Broker Fee Example</h3>
            <p className="text-slate-700 leading-relaxed mb-4">Suppose you buy 100 Kitta at Rs. 500.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
               <div className="bg-white p-3 rounded border border-slate-200">
                  <div className="text-slate-500">Purchase Value</div>
                  <div className="font-bold">Rs. 50,000</div>
               </div>
               <div className="bg-white p-3 rounded border border-slate-200">
                  <div className="text-slate-500">Broker Comm.</div>
                  <div className="font-bold">Rs. 180</div>
               </div>
               <div className="bg-white p-3 rounded border border-slate-200">
                  <div className="text-slate-500">SEBON Fee</div>
                  <div className="font-bold">Rs. 7.50</div>
               </div>
               <div className="bg-white p-3 rounded border border-slate-200">
                  <div className="text-slate-500">DP Charge</div>
                  <div className="font-bold">Rs. 25</div>
               </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Total Cost: <strong>Rs. 50,212.50</strong> <br/>
              Actual Cost Per Share: <strong>Rs. 502.13</strong>
            </p>
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

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">How MeroShare Calculates WACC</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              MeroShare calculates WACC using the weighted average acquisition cost across IPO, FPO, secondary market, rights, and auction purchases. Bonus shares reduce the average acquisition cost because additional shares are issued without increasing the investment amount. Maintaining accurate records helps prevent profit calculation errors and tax reporting discrepancies.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-3">How to Calculate Capital Gain in Nepal</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Capital gain is calculated using your selling price and weighted average cost.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-center text-slate-800 font-bold mb-4">
              Capital Gain = Selling Value − Acquisition Cost
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              Capital gains tax rates may differ depending on whether you are an individual or institutional investor, your holding period, and regulatory updates. Always verify current NEPSE and IRD guidelines before filing tax returns. Our <Link href="/calculator/nepal-stocks/" className="text-blue-600 hover:underline">Share Calculator</Link> and Capital Gain Calculator can help estimate potential tax liabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "What is WACC in MeroShare?",
                  a: "WACC refers to the weighted average acquisition cost of your shares. It is used to determine profits, losses, and capital gains when selling shares."
                },
                {
                  q: "How do I calculate share average in Nepal?",
                  a: "Add all purchase amounts, divide by total shares owned, and include transaction expenses for a more accurate result."
                },
                {
                  q: "Does broker commission affect share average?",
                  a: "Yes. Broker commission increases your acquisition cost and should be included when calculating actual cost per share."
                },
                {
                  q: "How do bonus shares affect WACC?",
                  a: "Bonus shares increase the number of shares without increasing investment cost, reducing the average cost per share."
                },
                {
                  q: "How do rights shares affect average price?",
                  a: "Rights shares increase both investment and quantity. The weighted average price must be recalculated using the new totals."
                },
                {
                  q: "What is the difference between WACC and average share price?",
                  a: "In NEPSE investing, both terms generally refer to the weighted average acquisition cost of shares owned by an investor."
                },
                {
                  q: "Can I calculate IPO and secondary market shares together?",
                  a: "Yes. All share purchases can be combined into a single weighted average calculation."
                },
                {
                  q: "What is the actual cost per share?",
                  a: "Actual cost per share includes purchase value, broker commission, SEBON fee, DP charge, and other transaction costs."
                },
                {
                  q: "How is capital gain calculated?",
                  a: "Capital gain equals selling value minus acquisition cost."
                },
                {
                  q: "Why is my MeroShare average price different?",
                  a: "Differences often occur because of bonus share adjustments, rights share allocations, broker fees, or incomplete transaction records."
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
            <h3 className="text-xl font-bold text-slate-900 mb-4">Related NEPSE Calculators</h3>
            <p className="text-slate-600 mb-6">After calculating your average share price, use our <Link href="/calculator/nepal-stocks/" className="text-blue-600 hover:underline">Share Buy Sell Calculator Nepal</Link> to estimate profit, broker commission, and net receivable amount.</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 mb-8">
              <li><Link href="/calculator/nepal-stocks/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">📈</span> <span className="underline underline-offset-2">Share Buy Sell Calculator Nepal</span></Link></li>
              <li><Link href="/calculator/nepse-bonus-tax/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🎁</span> <span className="underline underline-offset-2">Bonus Share Adjustment Calculator</span></Link></li>
              <li><Link href="/calculator/cagr-calculator/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">📊</span> <span className="underline underline-offset-2">CAGR Calculator Nepal</span></Link></li>
              <li><Link href="/calculator/nepal-tds/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">💸</span> <span className="underline underline-offset-2">Capital Gain Tax Calculator Nepal</span></Link></li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Related Investment Calculators</h3>
            <p className="text-slate-600 mb-6">Investors often use SIPs and fixed deposits alongside stocks. Compare potential returns using our <Link href="/calculator/sip-calculator/" className="text-blue-600 hover:underline">SIP Calculator Nepal</Link> and <Link href="/calculator/fd-calculator/" className="text-blue-600 hover:underline">FD Calculator Nepal</Link>.</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 mb-12">
              <li><Link href="/calculator/sip-calculator/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">📆</span> <span className="underline underline-offset-2">SIP Calculator Nepal</span></Link></li>
              <li><Link href="/calculator/fd-calculator/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🏦</span> <span className="underline underline-offset-2">FD Calculator Nepal</span></Link></li>
              <li><Link href="/calculator/compound-interest/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">💹</span> <span className="underline underline-offset-2">Compound Interest Calculator Nepal</span></Link></li>
              <li><Link href="/calculator/nepal-salary/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">💼</span> <span className="underline underline-offset-2">Nepal Salary Calculator</span></Link></li>
              <li><Link href="/calculator/nepal-income-tax/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🧾</span> <span className="underline underline-offset-2">Income Tax Calculator Nepal</span></Link></li>
            </ul>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 space-y-4">
              <h4 className="font-bold text-slate-800">Official Sources & References</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li><a href="https://nepalstock.com.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Nepal Stock Exchange (NEPSE)</a> — Official market information and listed company announcements.</li>
                <li><a href="https://meroshare.cdsc.com.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MeroShare (CDSC)</a> — Investors can manage holdings and verify share transactions through MeroShare.</li>
                <li><a href="https://sebon.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Securities Board of Nepal (SEBON)</a> — Regulates Nepal's securities market and publishes investor protection guidelines.</li>
                <li><a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Inland Revenue Department (IRD) Nepal</a> — Capital gains tax rules and investor tax guidance.</li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-slate-200 text-xs">
                <p className="mb-2"><strong>About This Calculator:</strong> This calculator is maintained by the NepaCalc research team and reviewed against NEPSE trading procedures, MeroShare portfolio calculations, and SEBON investor guidelines.</p>
                <p><strong>Last Updated:</strong> June 2026. Based on current NEPSE trading rules, MeroShare practices, and SEBON regulations.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
