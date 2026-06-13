import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

export const metadata = calcMeta({
  title: "Vehicle Tax in Nepal 2083/84: Bluebook Renewal Calculator",
  description: "Calculate your annual vehicle tax in Nepal for FY 2083/84. Check the latest bluebook renewal fees, late penalty rates, and bike or car tax slabs.",
  slug: 'nepal-vehicle-tax',
  keywords: ["vehicle tax in nepal 2083/84", "vehicle tax calculator nepal", "bluebook renew calculator", "bike tax in nepal 2083/84", "car tax nepal 2083", "road tax calculator nepal", "bluebook renewal penalty calculation nepal"],
  ogImage: "https://nepacalc.com/assets/images/og-nepal-vehicle-tax-2083.jpg"
});

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/nepal-vehicle-tax/#webapp",
      "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
      "name": "Nepal Vehicle Tax Calculator 2083/84",
      "description": "An automated online bluebook renewal calculator to compute annual provincial vehicle tax, penalties, and insurance fees in Nepal for FY 2083/84.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires HTML5 support. Requires JavaScript.",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "NPR"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/nepal-vehicle-tax/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can I check my vehicle tax online in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can check your vehicle tax liabilities online by accessing your provincial Transport Management Information System (TMIS) portal or by utilizing trusted digital financial applications like Khalti, eSewa, or MyPay. Alternatively, input your registration details into our online Nepal Vehicle Tax Calculator to get an instant itemized cost breakdown."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if I do not renew my bluebook for over 5 years?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If you fail to renew your bluebook for over 5 consecutive years, your vehicle risks getting completely blacklisted or blocked in the Department of Transport Management (DoTM) master database. You will face heavy financial penalties up to the legal 4-year tax cap, and traffic police can impound your vehicle instantly on public roads."
          }
        },
        {
          "@type": "Question",
          "name": "Do electric vehicles pay road tax in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, electric vehicles pay an annual road tax in Nepal. For the 2083/84 fiscal year, EV four-wheelers are taxed between Rs. 5,000 and Rs. 30,000 based entirely on their motor capacity in Kilowatts (kW)."
          }
        },
        {
          "@type": "Question",
          "name": "Can I pay my vehicle tax in a different province?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vehicle tax rates and rules are governed provincially. You must pay your annual vehicle tax to the specific province where your vehicle was initially registered (e.g., Bagmati Province, Koshi Province, Gandaki Province), or go through an official provincial transfer process if you have permanently relocated your asset."
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
      <CalcWrapper
        title="Vehicle Tax in Nepal 2083/84: Bluebook Renewal Calculator"
        description="Calculate your annual vehicle tax in Nepal for FY 2083/84. Check the latest bluebook renewal fees, late penalty rates, and bike or car tax slabs."
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Vehicle Tax Calculator' }]}
        isNepal={true}
        hideHeader={true}
        relatedCalcs={[
          { name: 'Nepal Salary Tax', slug: '/calculator/nepal-salary/' },
          { name: 'Gold Tax Calculator', slug: '/calculator/gold-tax/' },
          { name: 'NEPSE Profit & CGT', slug: '/calculator/nepal-stocks/' }
        ]}
      >
        <Calculator />

        {/* ── SEO Content Section ── */}
        <div className="hp-container pb-16 border-t border-slate-100 pt-12 mt-12 bg-white rounded-b-xl shadow-sm">
          <div className="max-w-4xl mx-auto space-y-16">

            <section>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 tracking-tight">
                🏎️ How the Nepal Vehicle Tax is Calculated
              </h2>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Navigating the annual vehicle tax in nepal 2083/84 can be complex, especially with the provincial rate overhauls and the newly introduced federal budget regulations. Every vehicle owner in Nepal is legally required to pay an annual road tax, renew their bluebook, and clear mandatory third-party insurance premiums. 
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Whether you drive a traditional petrol vehicle, ride a scooter, or operate an electric vehicle (EV), our automated vehicle tax calculator nepal simplifies the math. Avoid manual error and discover exactly what you owe the Transport Management Office (Yatayat Karyalaya) including provincial slabs, renewal fees, and potential late penalties.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-sm my-8">
                  <p className="text-amber-900 font-bold mb-2">Total Renewal Cost Formula:</p>
                  <p className="text-amber-800 font-medium">
                    Base Annual Provincial Tax + Government Renewal Fee + Late Payment Fine (If Applicable) + Mandatory Third-Party Insurance Premium
                  </p>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  To provide full transparency, the rates are broken down below based on the latest Bagmati Province Finance Bill directives and central fiscal frameworks for the fiscal year 2083/84 (2026/2027).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">🏍️ Motorcycle & Scooter Tax Rates (FY 2083/84)</h2>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  For two-wheelers, the annual road tax is strictly determined by the internal combustion engine capacity measured in Cubic Capacity (CC). Use this reference matrix for any standard bike blue book renew price in nepal or scooter blue book renew price in nepal:
                </p>
                
                <div className="overflow-x-auto rounded-xl border border-slate-200 mt-6">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs">
                      <tr>
                        <th className="p-4 border-b">Engine Capacity (CC Range)</th>
                        <th className="p-4 border-b">Annual Base Tax Rate (NPR)</th>
                        <th className="p-4 border-b">Mandatory Renewal Fee (NPR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium bg-white">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">Up to 125 CC (e.g., Activa, Ntorq, Splendor)</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 3,000</td>
                        <td className="p-4">Rs. 300</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">126 CC to 150 CC (e.g., Pulsar 150, FZ)</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 5,000</td>
                        <td className="p-4">Rs. 300</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">151 CC to 225 CC (e.g., Apache 160/200, Bullet 350)</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 6,500</td>
                        <td className="p-4">Rs. 300</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">226 CC to 400 CC (e.g., Duke 250/390, Himalayan)</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 12,000</td>
                        <td className="p-4">Rs. 300</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">401 CC to 650 CC (e.g., Interceptor 650)</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 25,000</td>
                        <td className="p-4">Rs. 300</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">651 CC and Above (Superbikes)</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 35,000</td>
                        <td className="p-4">Rs. 300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">🚗 Car, Jeep, Van, & Microbus Tax Rates (FY 2083/84)</h2>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Private four-wheeler classifications are heavily regulated. Slabs scale up progressively as the engine capacity breaches luxury thresholds. Use these exact structural figures inside our bluebook renew calculator to verify your statement:
                </p>

                <div className="overflow-x-auto rounded-xl border border-slate-200 mt-6">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs">
                      <tr>
                        <th className="p-4 border-b">Engine Capacity (CC Range)</th>
                        <th className="p-4 border-b">Annual Base Tax Rate (NPR)</th>
                        <th className="p-4 border-b">Mandatory Renewal Fee (NPR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium bg-white">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">Up to 1,000 CC</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 22,000</td>
                        <td className="p-4">Rs. 500</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">1,001 CC to 1,500 CC</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 25,000</td>
                        <td className="p-4">Rs. 500</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">1,501 CC to 2,000 CC</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 27,000</td>
                        <td className="p-4">Rs. 500</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">2,001 CC to 2,500 CC</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 37,000</td>
                        <td className="p-4">Rs. 500</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">2,501 CC to 3,000 CC</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 50,000</td>
                        <td className="p-4">Rs. 500</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">3,001 CC to 3,500 CC</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 65,000</td>
                        <td className="p-4">Rs. 500</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">Above 3,500 CC</td>
                        <td className="p-4 font-bold text-slate-900">Rs. 70,000</td>
                        <td className="p-4">Rs. 500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">⚡ Electric Vehicle (EV) Import & Annual Road Tax Scale</h2>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  The federal <strong className="font-bold">budget prastab 2083/84</strong> introduced major changes regarding how electric vehicles are processed in Nepal. To build an accurate projection, you must look at both the initial entry customs parameters and the subsequent annual running road tax fees.
                </p>

                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">1. New EV Import Duty & Valuation Structure (CIF Model)</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium mb-4">
                  For new imports, the government has officially shifted away from a kilowatt-only model to an asset valuation matrix based entirely on Cost, Insurance, and Freight (CIF) metrics. This includes:
                </p>
                <ul className="list-disc list-outside pl-5 space-y-3 text-slate-700 text-sm font-medium mb-6">
                  <li><strong className="text-slate-900">Customs Duty:</strong> A flat 20% rate applied to the vehicle's net CIF value.</li>
                  <li><strong className="text-slate-900">Excise Duty:</strong> Completely abolished (0%) across passenger EV line items.</li>
                  <li><strong className="text-slate-900">Clean Infrastructure Investment Fee:</strong> This new levy consolidates previous green taxes and scales based on valuation tiers:</li>
                </ul>

                <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4 mb-8">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs">
                      <tr>
                        <th className="p-4 border-b">Vehicle CIF Valuation Tier</th>
                        <th className="p-4 border-b">Clean Infrastructure Investment Fee Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium bg-white">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">Vehicles up to Rs. 20 Lakh</td>
                        <td className="p-4 font-bold text-slate-900">2.5% Levy</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">Vehicles from Rs. 30 Lakh to Rs. 40 Lakh</td>
                        <td className="p-4 font-bold text-slate-900">15% to 17.5% Effective Rate</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">Vehicles from Rs. 40 Lakh to Rs. 50 Lakh</td>
                        <td className="p-4 font-bold text-slate-900">70% to 72.5% Effective Rate</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">Vehicles exceeding Rs. 50 Lakh</td>
                        <td className="p-4 font-bold text-slate-900">Up to 112.5% Maximum Effective Rate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">2. Annual EV Running Road Tax (kW Capacity)</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium mb-4">
                  Once registered, your ongoing annual renewal fees are calculated using the output power of the electric motor measured in Kilowatts (kW):
                </p>
                <ul className="list-disc list-outside pl-5 space-y-3 text-slate-700 text-sm font-medium mb-4">
                  <li><strong className="text-slate-900">10 kW to 50 kW:</strong> Rs. 5,000 per year</li>
                  <li><strong className="text-slate-900">51 kW to 125 kW:</strong> Rs. 15,000 per year</li>
                  <li><strong className="text-slate-900">126 kW to 200 kW:</strong> Rs. 20,000 per year</li>
                  <li><strong className="text-slate-900">Above 200 kW:</strong> Rs. 30,000 per year</li>
                </ul>
                <p className="text-slate-500 text-sm italic mt-4">
                  *Note: Eco-conscious fleet operators and public or rental EVs receive a flat 50% discount on these standard running tax slabs.*
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">🚌 Public & Commercial Vehicle Tax Slabs (2083/84)</h2>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  If you manage fleet operations or run a commercial transport company, the Bagmati Province Finance Bill details specific concessions. Unlike private vehicles, commercial public carriers are calculated via seating or cargo capacity metrics:
                </p>
                <ul className="list-disc list-outside pl-5 space-y-3 text-slate-700 text-sm font-medium">
                  <li><strong className="text-slate-900">Public Taxis (Up to 1500 CC):</strong> Rs. 4,000 to Rs. 6,000 annually.</li>
                  <li><strong className="text-slate-900">Microbuses & Public Buses:</strong> Rs. 8,000 to Rs. 35,000 (scaled according to official registration seat maps).</li>
                  <li><strong className="text-slate-900">Heavy Goods Carriers & Trucks:</strong> Assessed via weight capacity thresholds.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">⚠️ Bluebook Renewal Penalty Calculation Guide</h2>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Missing your renewal deadline activates strict, progressive late payment penalties. In Nepal, you are given a <strong className="font-bold">90-day grace period</strong> from the exact date of expiry stamped in your physical bluebook to clear your liabilities without an added fine.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Once that 90-day window closes, your road road tax calculator nepal structure applies penalties tracking this timeline:
                </p>

                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">1. Progressive Base Tax Penalties</h3>
                <ul className="list-disc list-outside pl-5 space-y-3 text-slate-700 text-sm font-medium">
                  <li><strong className="text-slate-900">1 to 30 Days Past Grace Period:</strong> 5% fine on the annual base tax.</li>
                  <li><strong className="text-slate-900">31 to 45 Days Past Grace Period:</strong> 10% fine on the annual base tax.</li>
                  <li><strong className="text-slate-900">46 Days up to the End of the Current Fiscal Year:</strong> 20% fine on the annual base tax.</li>
                  <li><strong className="text-slate-900 text-red-600">Passed 1 Full Fiscal Year (Up to 5 Years Max):</strong> <span className="font-bold">32% fine per year compounded.</span></li>
                </ul>

                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">2. The 100% Renewal Fee Fine Rule</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Aside from the base tax penalty, if you fail to renew your bluebook within the 90-day grace period, the government levies a <strong className="font-bold">100% fine on the flat renewal fee itself</strong>. For example, a bike's standard Rs. 300 renewal charge instantly jumps to Rs. 600.
                </p>

                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">3. The Legal 4-Year Tax Cap & Blacklisting Rules</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  A common question among vehicle owners who have missed multiple renewal cycles is: "How much is the fine for an expired bluebook in Nepal over a decade?" Under current Department of Transport Management (DoTM) regulations, a distinct legal relief applies: vehicle owners are only liable to pay a maximum cap of <strong className="font-bold">4 years of pending vehicle tax</strong>, regardless of how many total years have elapsed. 
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  However, do not let this delay your settlement. Fines of <strong className="font-bold">32% per year</strong> will still apply continuously across all four of those active billing years. Furthermore, leaving your registration unresolved for extended periods will cause your vehicle data to be flagged or entirely blacklisted in the central TMIS database, rendering the asset completely un-transferable during a resale.
                </p>
              </div>
            </section>

            <section>
              <div className="bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-xl shadow-sm my-8">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">🛑 Important Note on International 2026 Car Tax Search Noise</h2>
                <p className="text-slate-700 text-sm leading-relaxed font-medium mb-4">
                  While researching terms like "car tax increase 2026 calculator" online, you may encounter information regarding a standard annual car tax (VED) hike to £200, luxury vehicle thresholds at £50,000, or company car Benefit-in-Kind (BIK) changes.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Please note that these parameters apply strictly to the United Kingdom automotive tax updates. For vehicle owners in Nepal, these international tiers do not apply. Your calculations must rely solely on the CC and kW provincial frameworks governed by the Department of Transport Management (DoTM).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">🛡️ Mandatory Third-Party Insurance Premiums</h2>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  You cannot legally complete your bluebook renewal at any Yatayat office without a valid, active insurance policy. Third-party liability insurance is compulsory.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  For standard motorcycles, insurance premiums typically range from <strong className="font-bold">Rs. 1,715 to Rs. 2,167</strong> depending on engine sizes. Private cars face higher base rates. This premium protects against third-party property damage and bodily injury claims, and must be renewed alongside your provincial taxes every single year.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">📝 Step-by-Step Guide for TMIS & DOTM Online Vehicle Tax Check</h2>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed font-medium mb-4">
                  To efficiently settle your dues using digital apps like eSewa, Khalti, or MyPay, follow this verification workflow:
                </p>
                <ol className="list-decimal list-outside pl-5 space-y-4 text-slate-700 text-sm font-medium">
                  <li><strong className="text-slate-900">Access the Portal:</strong> Navigate to your respective provincial Transport Management Information System (TMIS) or the central DoTM vehicle tax check dashboard.</li>
                  <li><strong className="text-slate-900">Input Registration Details:</strong> Provide your vehicle registration number (e.g., Ba Bagmati Pa XXXX) along with the engine and chassis codes listed on the inside flap of your bluebook.</li>
                  <li><strong className="text-slate-900">Review the Statement:</strong> Cross-reference the system's automated breakdown with our manual itemized calculations to ensure late penalty scales or renewal fee double-charges are properly accounted for.</li>
                  <li><strong className="text-slate-900">Complete the Digital Settlement:</strong> Execute payment through your linked wallet and download the transaction receipt. <em className="italic">Crucial:</em> You must still visit your physical local Transport Management Office within 3 working days to secure the official validation stamp inside your physical book.</li>
                </ol>
                <p className="text-slate-700 text-sm leading-relaxed font-medium mt-6">
                  After assessing your fixed asset transport costs, calculate your remaining disposable income using our comprehensive <a href="/calculator/nepal-salary/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">Nepal Salary Tax Calculator</a>. Similarly, structural updates have also hit <a href="/calculator/gold-tax/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">customs and infrastructure duties</a> this budget session.
                </p>
              </div>
            </section>

          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
