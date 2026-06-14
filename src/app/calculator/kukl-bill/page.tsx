import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "KUKL Water Bill Calculator Nepal (FY 2083/84) | Kathmandu Water Bill Calculator",
  description: "Calculate your KUKL water bill online using the latest Kathmandu water tariff rates. Includes sewerage charges, minimum billing, and connection-size calculations.",
  slug: 'kukl-bill',
  canonical: 'https://nepacalc.com/calculator/kukl-bill/',
  keywords: [
    "kukl bill calculator", "kukl water bill calculator", "water bill calculator nepal", 
    "calculate water bill nepal", "how to calculate water bill in nepal", 
    "water bill formula nepal", "kukl water rate", "kukl tariff rate", 
    "water bill per unit in nepal", "1 unit water in litres in nepal", 
    "1 unit water = 1000 litres", "how much is 1 unit water", 
    "water bill payment nepal", "kukl online payment", "how to pay water bill online", 
    "how to check water bill online", "water bill check nepal"
  ]
});

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#webapp",
      "name": "KUKL Water Bill Calculator",
      "url": "https://nepacalc.com/calculator/kukl-bill/",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "description": "Calculate KUKL and NWSC water bills based on official tariff matrices, pipe sizes, and mandatory sewerage taxes."
    },
    {
      "@type": "HowTo",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#howto",
      "name": "How to calculate a KUKL water bill",
      "description": "Step-by-step guide to calculating water utility charges in the Kathmandu Valley.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Identify Connection Size",
          "text": "Determine your water pipe connection size, typically 0.5 inches for standard residential taps."
        },
        {
          "@type": "HowToStep",
          "name": "Calculate Base Water Charge",
          "text": "Apply the fixed minimum charge for the first 10,000 liters (10 units), then multiply any additional units consumed by the variable excess rate."
        },
        {
          "@type": "HowToStep",
          "name": "Add Sewerage Charge",
          "text": "Calculate 50% of the total water charge and add it to the subtotal. This is the mandatory sewerage tax applied to all properties."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is a water bill calculated in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A water bill in Nepal is calculated by adding the net water consumption charge to a mandatory sewerage fee. The consumption charge consists of a fixed pipeline fee for baseline allocation plus an additional per-unit rate for any excess water used. A 50% wastewater surcharge is then applied to that combined subtotal."
          }
        },
        {
          "@type": "Question",
          "name": "What is 1 unit of water in litres?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Exactly 1 unit of water equals 1,000 litres. This metric aligns with 1 cubic meter of volumetric water flow passing through your property's physical utility meter."
          }
        },
        {
          "@type": "Question",
          "name": "What is the KUKL sewerage charge?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The sewerage charge is a public utility assessment equal to exactly 50% of your total monthly water consumption charge. It is automatically collected by KUKL to fund the construction and processing operations of wastewater management systems across the Kathmandu Valley."
          }
        },
        {
          "@type": "Question",
          "name": "What are the latest KUKL water rates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For a standard residential 0.5-inch tap with an active meter, the latest rates include a fixed charge of Rs. 100 for the first 10 units, and Rs. 32 for each additional unit consumed. Unmetered connections face a flat fee of Rs. 648 per month."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum KUKL bill?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The absolute minimum monthly bill for an operational 0.5-inch residential tap is Rs. 150. This fee structure is mandatory even if a house remains completely vacant or uses less than 10,000 litres of water during the month."
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
              KUKL Water Bill Calculator Nepal (FY 2083/84)
            </h1>
            <p className="text-slate-700 leading-relaxed mb-6">
              Calculate your Kathmandu Upatyaka Khanepani Limited (KUKL) water bill instantly using the latest tariff structure. Enter your monthly water consumption and connection size to estimate water charges, sewerage charges, and the total payable amount.
            </p>
            
            <div className="p-6 bg-[#E8F0FE] border-l-4 border-blue-600 rounded-r-xl shadow-sm mb-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">How to Use the KUKL Water Bill Calculator</h3>
              <ul className="list-disc pl-6 text-blue-800 space-y-1">
                <li>Select your pipe connection size.</li>
                <li>Enter your monthly water consumption in units (kL).</li>
                <li>Click Calculate.</li>
                <li>View your water charge, sewerage charge, and total bill.</li>
              </ul>
              <p className="mt-4 text-sm font-bold text-blue-900">Note: 1 unit of water = 1,000 litres (1 kilolitre).</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">How To Calculate Water Bill In Nepal</h2>
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
              <p>
                To calculate a water bill in Nepal manually, you must add your net water consumption cost to the localized drainage assessment fees. The standard water bill formula in Nepal is structured as follows:
              </p>
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="font-bold text-lg text-slate-900 mb-2">Total Bill = Water Charge + Sewerage Charge</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Water Charge</strong> = Fixed Monthly Minimum Charge + Variable Consumption Charge</li>
                  <li><strong>Sewerage Charge</strong> = 50% of Total Water Charge (where applicable)</li>
                </ul>

                <div className="mt-6 p-5 bg-white border border-slate-200 rounded-lg">
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Formula</span>
                    Edge-Case Computational Math Block (Metered)
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">
                    For a user input where <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-700">U_consumed</code> represents the volume of Units entered into the text field:
                  </p>
                  <div className="overflow-x-auto bg-slate-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-slate-300">Net Water Charge = </div>
                    <div className="pl-4 border-l-2 border-slate-600 mt-2 space-y-2">
                      <div><span className="text-emerald-400">Base_Fee</span> <span className="text-slate-500 italic">// if U_consumed &le; 10</span></div>
                      <div><span className="text-emerald-400">Base_Fee</span> + ((<span className="text-blue-300">U_consumed</span> - 10) &times; <span className="text-amber-300">Per_Unit_Rate</span>) <span className="text-slate-500 italic">// if U_consumed &gt; 10</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">1 Unit Conversion Standard</h2>
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
              <p>
                <strong>1 unit of water equals 1,000 litres (1 kilolitre).</strong> Public utility networks across Nepal, including Kathmandu Upatyaka Khanepani Limited (KUKL) and the Nepal Water Supply Corporation (NWSC), standardize their physical water meters to track volume in cubic meters. One cubic meter corresponds precisely to 1,000 litres of water:
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center font-mono text-slate-800 font-bold mb-4">
                1 Unit = 1 Cubic Meter (m&sup3;) = 1,000 Liters
              </div>
              <ul className="list-disc pl-6">
                <li>5 Units = 5,000 Litres</li>
                <li>10 Units = 10,000 Litres</li>
                <li>15 Units = 15,000 Litres</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">KUKL Water Tariff Rates</h2>
            <p className="text-slate-700 mb-4">
              The following structural tariff matrices govern domestic and commercial utility connections throughout the Kathmandu Valley. Rates vary significantly between metered and non-metered taps.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">KUKL Pipe Sizes & Connections</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50 text-slate-900">
                    <th className="p-3 font-bold border-b border-slate-200">Connection Size</th>
                    <th className="p-3 font-bold border-b border-slate-200">Typical System Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-bold">0.5 Inch</td>
                    <td className="p-3">Standard Residential Households</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">0.75 Inch</td>
                    <td className="p-3">Large Residential Complexes</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">1.0 Inch</td>
                    <td className="p-3">Commercial Properties</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Above 1.0 Inch</td>
                    <td className="p-3">Institutional / Government Facilities</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">1. Metered Connection Tariff Matrix (Standard 0.5-Inch Pipe)</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50 text-slate-900">
                    <th className="p-3 font-bold border-b border-slate-200">Consumption Tier</th>
                    <th className="p-3 font-bold border-b border-slate-200">Fixed Base Charge</th>
                    <th className="p-3 font-bold border-b border-slate-200">Additional Unit Rate (Per 1,000L)</th>
                    <th className="p-3 font-bold border-b border-slate-200">Mandatory Sewerage Charge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3"><strong>First 10 Units</strong> (0 to 10,000 Litres)</td>
                    <td className="p-3">Rs. 100.00 <em>(Fixed Minimum)</em></td>
                    <td className="p-3">Rs. 0.00</td>
                    <td className="p-3">50% of Water Charge (Rs. 50.00)</td>
                  </tr>
                  <tr>
                    <td className="p-3"><strong>Above 10 Units</strong> (Excess Consumption)</td>
                    <td className="p-3">Rs. 100.00</td>
                    <td className="p-3">Rs. 32.00 per extra unit</td>
                    <td className="p-3">50% of cumulative water charge</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">2. Non-Metered Connection Tariff Matrix (Flat Monthly Pricing)</h3>
            <p className="text-slate-700 mb-4">
              When an unmetered connection or a broken residential system is operating without verified meter readings, KUKL assesses flat baseline fees determined entirely by the pipe diameter size:
            </p>
            
            <div className="mb-6 p-5 bg-white border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 mb-2">The Meter Status Variable</h4>
              <p className="text-sm text-slate-600 mb-3">
                If a user toggles their meter status from "Metered" to "Unmetered" on a standard 0.5-inch tap line, the computational engine drops progressive variable inputs and swaps the subtotal processing to a flat minimum calculation:
              </p>
              <div className="bg-slate-800 text-slate-300 font-mono text-sm p-3 rounded text-center">
                Flat Unmetered Bill = Rs. 432 (Base Fee) + Rs. 216 (50% Sewerage Tax) = <span className="text-amber-400 font-bold">Rs. 648 Total Monthly Liability</span>
              </div>
            </div>

            <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-8">
              <li><strong>0.5-Inch Pipe:</strong> Rs. 432.00 Water Fee + Rs. 216.00 Sewerage Fee = <strong>Rs. 648.00 Fixed Total per month.</strong></li>
              <li><strong>0.75-Inch Pipe:</strong> Rs. 2,535.00 Water Fee + Rs. 1,267.50 Sewerage Fee = <strong>Rs. 3,802.50 Fixed Total per month.</strong></li>
              <li><strong>1.0-Inch Pipe:</strong> Rs. 5,614.00 Water Fee + Rs. 2,807.00 Sewerage Fee = <strong>Rs. 8,421.00 Fixed Total per month.</strong></li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Nepal Water Supply Corporation (NWSC) Rates (Outside Kathmandu)</h3>
            <p className="text-slate-700 mb-4">
              If your drinking water utility is provided by the Nepal Water Supply Corporation (NWSC) instead of KUKL (applicable to districts outside the Kathmandu Valley such as Pokhara, Biratnagar, Janakpur, or Birgunj), your bill uses the separate state-approved pricing structure verified by the official NWSC registry:
            </p>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl mb-8">
              <h4 className="font-bold text-slate-900 mb-2">NWSC Standard 0.5-Inch Connection Rates:</h4>
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                <li><strong>Base Minimum Charge (0 to 10 Units):</strong> Rs. 110.00 flat fee.</li>
                <li><strong>Additional Variable Volumetric Charge:</strong> Rs. 25.00 per unit for every unit consumed past the initial 10-unit limit.</li>
                <li><strong>Sewerage Surcharge:</strong> 50% of the net calculated water charge.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Example Water Bill Calculations</h2>
            <p className="text-slate-700 mb-6">
              This comparative breakdown demonstrates how a residential household with a standard 0.5-inch metered tap is billed for consuming <strong>15 units (15,000 litres)</strong> under both regional utility models:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#E8F0FE] text-[#1A73E8]">
                    <th className="p-4 font-bold border-b border-slate-200">Billing Component</th>
                    <th className="p-4 font-bold border-b border-slate-200">KUKL Calculations (Kathmandu Valley)</th>
                    <th className="p-4 font-bold border-b border-slate-200">NWSC Calculations (National Districts)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Fixed Minimum Charge</td>
                    <td className="p-4">Rs. 100.00 <span className="text-xs text-slate-500 block">(Covers 0 to 10 Units)</span></td>
                    <td className="p-4">Rs. 110.00 <span className="text-xs text-slate-500 block">(Covers 0 to 10 Units)</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Variable Excess Charge</td>
                    <td className="p-4">5 extra units × Rs. 32.00 = Rs. 160.00</td>
                    <td className="p-4">5 extra units × Rs. 25.00 = Rs. 125.00</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">Net Water Charge Sum</td>
                    <td className="p-4">Rs. 100.00 + Rs. 160.00 = Rs. 260.00</td>
                    <td className="p-4">Rs. 110.00 + Rs. 125.00 = Rs. 235.00</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Sewerage Surcharge</td>
                    <td className="p-4">50% of Rs. 260.00 = Rs. 130.00</td>
                    <td className="p-4">50% of Rs. 235.00 = Rs. 117.50</td>
                  </tr>
                  <tr className="bg-[#E6F4EA]">
                    <td className="p-4 font-black text-[#137333] text-lg">Final Total Bill Amount</td>
                    <td className="p-4 font-black text-[#137333] text-lg">Rs. 390.00</td>
                    <td className="p-4 font-black text-[#137333] text-lg">Rs. 352.50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#FFF9E6] border-l-4 border-amber-500 p-6 rounded-r-xl space-y-4">
              <h3 className="text-lg font-bold text-amber-900">Why Is My Bill Higher Than Water Usage?</h3>
              <p className="text-amber-800 text-sm">
                Both KUKL and NWSC apply a sewerage charge equal to 50% of the net water charge. This is why the final bill is higher than the water consumption amount alone. Properties utilizing municipal wastewater infrastructure automatically face this mandatory surcharge on their monthly statements to fund public sewer line maintenance and processing operations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Minimum Monthly Water Bill Slabs</h2>
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
              <p>
                Even if water consumption is low or zero, minimum monthly charges apply based on connection size. For a standard 0.5-inch domestic line with a functional meter, the absolute base minimum fee is:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Inside Kathmandu Valley (KUKL):</strong> Rs. 150.00 per month (Rs. 100.00 base unit allowance + Rs. 50.00 sewage fee).</li>
                <li><strong>Outside Kathmandu Valley (NWSC):</strong> Rs. 165.00 per month (Rs. 110.00 base unit allowance + Rs. 55.00 sewage fee).</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">How To Check KUKL & NWSC Bill Online</h2>
                <p className="text-slate-700 mb-4 text-sm">You can query your live outstanding consumer statement balance before initiating electronic payments by following these steps:</p>
                <ol className="list-decimal pl-5 text-slate-700 text-sm space-y-2">
                  <li>Navigate to the official KUKL Customer Web Portal or your digital wallet application.</li>
                  <li>Head to the Utility Payment dashboard and select Khanepani (Water).</li>
                  <li>Click on either the KUKL or Nepal Khanepani Sansthan (NWSC) service icon.</li>
                  <li>Select your designated local distribution branch counter (e.g., Maharajgunj, Baneshwor, Lalitpur, Pokhara, Birgunj).</li>
                  <li>Type your unique Customer ID / Connection Number found on your physical paper card ledger.</li>
                  <li>Click Proceed to view the live consumer name, billing month record, and total un-cleared ledger balance.</li>
                </ol>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">How To Pay KUKL & NWSC Water Bill Online</h2>
                <p className="text-slate-700 mb-4 text-sm">Water utility bills can be securely processed through authorized digital service providers, web portals, or integrated smartphone applications like eSewa, Khalti, MOCO Wallet, ConnectIPS, or Fonepay Mobile Banking.</p>
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Official Digital Merchant Transaction Fees</h4>
                  <ul className="list-disc pl-5 text-slate-700 text-sm space-y-1">
                    <li><strong>Bill Amounts Up to Rs. 500:</strong> Absolutely Free (Rs. 0 service charge).</li>
                    <li><strong>Bill Amounts Above Rs. 501:</strong> Maximum of Rs. 5 service fee (ConnectIPS merchant transfers adhere to separate standard bank integrated tier structures).</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg">
              <h4 className="font-bold text-[#166534] mb-2">Tips to Reduce Water Bills</h4>
              <ul className="list-disc pl-5 text-[#15803D] text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li>Repair leaking taps and pipes promptly.</li>
                <li>Monitor monthly meter readings.</li>
                <li>Use water-efficient fixtures.</li>
                <li>Avoid unnecessary water wastage.</li>
                <li>Regularly inspect storage tanks for overflow.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions (FAQ)</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How is a water bill calculated in Nepal?",
                  a: "A water bill in Nepal is calculated by adding the net water consumption charge to a mandatory sewerage fee. The consumption charge consists of a fixed pipeline fee for baseline allocation plus an additional per-unit rate for any excess water used. A 50% wastewater surcharge is then applied to that combined subtotal."
                },
                {
                  q: "What is 1 unit of water in litres?",
                  a: "Exactly 1 unit of water equals 1,000 litres. This metric aligns with 1 cubic meter of volumetric water flow passing through your property's physical utility meter."
                },
                {
                  q: "What is the KUKL sewerage charge?",
                  a: "The sewerage charge is a public utility assessment equal to exactly 50% of your total monthly water consumption charge. It is automatically collected by KUKL to fund the construction and processing operations of wastewater management systems across the Kathmandu Valley."
                },
                {
                  q: "What are the latest KUKL water rates?",
                  a: "For a standard residential 0.5-inch tap with an active meter, the latest rates include a fixed charge of Rs. 100 for the first 10 units, and Rs. 32 for each additional unit consumed. Unmetered connections face a flat fee of Rs. 648 per month."
                },
                {
                  q: "What are the water rates outside of Kathmandu Valley?",
                  a: "Outside Kathmandu Valley, water services are typically managed by the Nepal Water Supply Corporation (NWSC). For a standard half-inch pipe connection, the minimum baseline charge is Rs. 110 for up to 10 units, with an additional fee of Rs. 25 for every extra unit consumed, plus a 50% sewage service surcharge."
                },
                {
                  q: "How do I pay my KUKL bill online?",
                  a: "Open digital payment applications like eSewa, Khalti, or your personal mobile banking apps linked with Fonepay. Head into the utility billing tabs, select the KUKL vendor icon, specify your local branch office, input your Customer ID, and approve the funds transfer."
                },
                {
                  q: "What is the minimum KUKL bill?",
                  a: "The absolute minimum monthly bill for an operational 0.5-inch residential tap is Rs. 150. This fee structure is mandatory even if a house remains completely vacant or uses less than 10,000 litres of water during the month."
                },
                {
                  q: "What happens if I don't pay my bill on time?",
                  a: "Payments delayed beyond 30 days attract progressive late fee penalties: a 10% penalty is added between Day 31 to 40, a 20% penalty accumulates between Day 41 to 50, and a maximum cumulative 50% penalty surcharge is appended for bills left overdue past 50 days."
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
                This digital platform functions as an independent calculator designed for educational guidance based on public tariff rules from Kathmandu Upatyaka Khanepani Limited (KUKL) and the Nepal Water Supply Corporation (NWSC). While NepaCalc continually reviews software calculation matrices against official branch publications, final customer ledgers may fluctuate due to cumulative historical arrears, manual meter adjustments, or specialized branch maintenance costs. Always verify your final balance values on your official printed KUKL or NWSC payment receipt or bank authorization panels before completing a transfer.
              </p>
              <p className="mt-2">
                <strong>📞 Official Electronic Service Support Helpline:</strong> Having technical issues with your online portal entry or payment drops? Contact the official KUKL IT Section at 01-4117362 during office hours, or reach out to the customer technical supervisor helpline at 9700000717. For out-of-valley accounts, contact your respective regional NWSC branch administrative desk directly.
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">⚡ Explore Related Nepal Utility & Financial Calculators</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
              <li><a href="/calculator/nea-bill/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">⚡</span> <span className="underline underline-offset-2">NEA Electricity Bill Calculator</span></a></li>
              <li><a href="/calculator/property-tax/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">🏡</span> <span className="underline underline-offset-2">Property Tax Calculator</span></a></li>
              <li><a href="/calculator/nepal-salary/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">💼</span> <span className="underline underline-offset-2">Salary Tax Calculator Nepal</span></a></li>
              <li><a href="/calculator/nepal-income-tax/" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><span className="text-xl">💸</span> <span className="underline underline-offset-2">Income Tax Calculator</span></a></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
