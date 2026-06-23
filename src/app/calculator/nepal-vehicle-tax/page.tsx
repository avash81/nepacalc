import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Vehicle Tax Calculator Nepal (2083/84) - Road Tax & Bluebook",
  description: "Calculate vehicle tax, bluebook renewal fees, road tax penalties and EV tax in Nepal using the latest 2083/84 rates and DOTM guidelines.",
  slug: 'nepal-vehicle-tax',
  keywords: [
    "Vehicle Tax Calculator Nepal",
    "Vehicle Tax Calculator",
    "Vehicle Tax in Nepal",
    "Vehicle Tax Nepal",
    "Nepal Vehicle Tax Calculator",
    "Vehicle Tax in Nepal 2083/84",
    "Bike Tax Calculator Nepal",
    "Bluebook Renew Calculator",
    "Bluebook Tax Calculator Nepal",
    "Road Tax Calculator",
    "Motorcycle Tax Calculator",
    "Car Tax Calculator Nepal",
    "Vehicle Tax Online Nepal",
    "Vehicle Tax Rate Nepal"
  ],
  ogImage: "https://nepacalc.com/assets/images/og-nepal-vehicle-tax-2083.jpg"
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Nepal", "item": "https://nepacalc.com/nepal/" },
      { "@type": "ListItem", "position": 3, "name": "Vehicle Tax", "item": "https://nepacalc.com/calculator/nepal-vehicle-tax/" }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Vehicle Tax Calculator Nepal (2083/84)",
    "description": "Calculate vehicle tax, bluebook renewal fees, road tax penalties and EV tax in Nepal using the latest 2083/84 rates and DOTM guidelines.",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/"
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vehicle Tax Calculator Nepal",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "NPR"
    }
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Vehicle Tax Rates Nepal 2083/84",
    "description": "Official vehicle tax rates, bike tax rates, and EV tax rates in Nepal for FY 2083/84.",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": {
      "@type": "Organization",
      "name": "Department of Transport Management (DOTM) Nepal"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How To Calculate Vehicle Tax In Nepal",
    "step": [
      { "@type": "HowToStep", "text": "Select vehicle category (motorcycle, car, EV, commercial vehicle)." },
      { "@type": "HowToStep", "text": "Enter engine capacity (CC), motor power (kW), seating capacity or load capacity." },
      { "@type": "HowToStep", "text": "Choose renewal status (on-time or overdue)." },
      { "@type": "HowToStep", "text": "Select delay period if renewal is overdue." },
      { "@type": "HowToStep", "text": "Review annual road tax from the applicable slab." },
      { "@type": "HowToStep", "text": "Add mandatory renewal fee (Rs. 300 or Rs. 500)." },
      { "@type": "HowToStep", "text": "Add third-party insurance estimate from Beema Samiti rates." },
      { "@type": "HowToStep", "text": "Add pollution check fee (approx. Rs. 200–500)." },
      { "@type": "HowToStep", "text": "Review penalty amount if applicable." },
      { "@type": "HowToStep", "text": "View total payable amount before visiting the TMO." }
    ]
  };

  const onlinePaymentSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How To Pay Vehicle Tax Online in Nepal",
    "step": [
      { "@type": "HowToStep", "text": "Open eSewa, Khalti, MyPay or the Nagarik App." },
      { "@type": "HowToStep", "text": "Go to Government Services → Vehicle Tax / Yatayat Kar." },
      { "@type": "HowToStep", "text": "Select your province's Transport Management Office portal." },
      { "@type": "HowToStep", "text": "Enter your vehicle registration number from your bluebook." },
      { "@type": "HowToStep", "text": "Review the tax breakdown including any penalties." },
      { "@type": "HowToStep", "text": "Confirm and complete payment." },
      { "@type": "HowToStep", "text": "Download and print your digital payment receipt." },
      { "@type": "HowToStep", "text": "Visit your local TMO with the receipt and original bluebook to obtain the physical renewal stamp." }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the tax on a Duke 200 in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "A KTM Duke 200 has a 199cc engine, placing it in the 151–225 CC slab. The annual road tax for a Duke 200 in Nepal is Rs. 6,500 plus a mandatory renewal fee of Rs. 300, totalling Rs. 6,800 before insurance for FY 2083/84." } },
      { "@type": "Question", "name": "What is the tax on a Bullet 350 in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "A Royal Enfield Bullet 350 has a 349cc engine, placing it in the 226–400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee, totalling Rs. 12,300 before insurance for FY 2083/84." } },
      { "@type": "Question", "name": "What is the tax on a 400cc bike in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "A 400cc motorcycle falls in the 226–400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee for FY 2083/84." } },
      { "@type": "Question", "name": "How much is bike tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Bike tax in Nepal for FY 2083/84 ranges from Rs. 3,000 for motorcycles up to 125cc, Rs. 5,000 for 150cc bikes, Rs. 6,500 for 225cc bikes, Rs. 12,000 for bikes up to 400cc, Rs. 25,000 for bikes up to 650cc, and Rs. 35,000 for motorcycles above 650cc. A mandatory renewal fee of Rs. 300 applies to all categories." } },
      { "@type": "Question", "name": "How do I calculate vehicle tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Vehicle tax in Nepal is calculated using engine capacity (CC) for combustion vehicles or motor power (kW) for electric vehicles. Select your vehicle category, enter the capacity, and apply the current FY 2083/84 Bagmati Province slab rate. Add the renewal fee, third-party insurance, and pollution check to get your total bluebook renewal cost." } },
      { "@type": "Question", "name": "What is the vehicle tax rate in Nepal for 2083/84?", "acceptedAnswer": { "@type": "Answer", "text": "For FY 2083/84, motorcycles pay Rs. 3,000–35,000 depending on engine CC. Private cars pay Rs. 22,000–70,000 depending on CC. Electric vehicles pay Rs. 5,000–30,000 based on motor power (kW). Commercial vehicles are assessed by seating capacity or carrying weight under the Bagmati Province Finance Act." } },
      { "@type": "Question", "name": "How do I renew my bluebook in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "To renew your bluebook in Nepal, pay your annual road tax at your local Transport Management Office (Yatayat Karyalaya) or online via eSewa, Khalti, MyPay or the Nagarik App. Present a valid third-party insurance certificate, pollution check certificate, and your original bluebook. Pay the mandatory renewal fee. Collect the physical renewal stamp from the TMO." } },
      { "@type": "Question", "name": "What is the penalty for late bluebook renewal?", "acceptedAnswer": { "@type": "Answer", "text": "Late bluebook renewal penalties in Nepal start at 5% of base road tax for delays of 1–30 days past the 90-day grace period, rise to 10% for 31–45 days, 20% for 46 days to fiscal year end, and compound at 32% per year for renewals overdue by 1–4 fiscal years. The flat renewal fee also doubles once the grace period expires." } },
      { "@type": "Question", "name": "Can I calculate bike tax online in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Vehicle Tax Calculator Nepal allows you to estimate motorcycle and scooter road tax, renewal fees, insurance and penalties instantly for FY 2083/84." } },
      { "@type": "Question", "name": "How is EV tax calculated in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Electric vehicle road tax in Nepal is calculated using motor power (kW) as listed in the vehicle's bluebook. For FY 2083/84: 10–50 kW pays Rs. 5,000, 51–125 kW pays Rs. 15,000, 126–200 kW pays Rs. 20,000, and above 200 kW pays Rs. 30,000 annually. Public and commercial EVs receive a 50% statutory discount." } },
      { "@type": "Question", "name": "Where can I pay vehicle tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Vehicle tax in Nepal can be paid in person at your registered Transport Management Office (TMO). In Bagmati and Gandaki provinces, online payment is available through eSewa, Khalti, MyPay and the Nagarik App. After online payment, you must still visit the TMO to receive the physical bluebook renewal stamp." } },
      { "@type": "Question", "name": "Can vehicle tax be paid online?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, vehicle tax can be paid online in Bagmati and Gandaki provinces through eSewa, Khalti, MyPay and the Nagarik App. Other provinces may have different digital payment availability. Physical TMO visit remains required for the bluebook stamp regardless of payment method." } },
      { "@type": "Question", "name": "What happens if I do not renew my bluebook for several years?", "acceptedAnswer": { "@type": "Answer", "text": "If you do not renew your bluebook for several years in Nepal, penalties compound at 32% per year on the base road tax, capped at four fiscal years under DOTM regulations. The flat renewal fee also doubles. Traffic authorities may seize the vehicle upon detection. All pending tax and penalties must be fully cleared before the vehicle can be legally transferred (Naam Sari) or resold." } },
      { "@type": "Question", "name": "Is vehicle tax different across Nepal's provinces?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Each of Nepal's seven provincial governments sets its own vehicle tax rates through annual Finance Acts. Bagmati Province (Kathmandu) generally applies a higher baseline than provinces like Koshi or Madhesh. Vehicle owners outside Bagmati should verify their exact rates at their local Yatayat Karyalaya or at dotm.gov.np." } },
      { "@type": "Question", "name": "Can I transfer vehicle ownership with unpaid tax?", "acceptedAnswer": { "@type": "Answer", "text": "No. The Department of Transport Management (DOTM) requires a fully clean tax record before approving a Naam Sari (vehicle ownership transfer). All pending road tax, penalties and renewal charges must be cleared before ownership can be legally transferred to a new owner." } },
      { "@type": "Question", "name": "What if I lost my bluebook? Can I still renew?", "acceptedAnswer": { "@type": "Answer", "text": "If you lose your bluebook in Nepal, you cannot renew directly. You must first file an FIR at your local police station, publish a notice in a national newspaper (required by most transport offices), and apply for a duplicate bluebook at the TMO. The duplicate process takes approximately 2–6 weeks. Once the duplicate is issued, you can proceed with the annual renewal as normal." } },
      { "@type": "Question", "name": "Is third-party insurance mandatory for bluebook renewal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Third-party insurance regulated by Beema Samiti is legally mandatory for all vehicles in Nepal. The TMO (Yatayat Karyalaya) will not process your bluebook renewal without a valid insurance certificate. Annual premiums are approximately Rs. 2,200 for motorcycles and Rs. 4,500–8,000 for private cars." } },
      { "@type": "Question", "name": "What is the pollution check fee for bluebook renewal?", "acceptedAnswer": { "@type": "Answer", "text": "A pollution emissions test certificate is required as part of the bluebook renewal process. The pollution check fee is approximately Rs. 200–500 depending on vehicle type and testing center. Without a passing pollution certificate, the TMO will not complete the renewal stamp." } }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(onlinePaymentSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* sr-only H1 for SEO, visually hidden to prevent duplication with ModernCalcLayout */}
      <h1 className="sr-only">Vehicle Tax Calculator Nepal (2083/84)</h1>

      <Calculator />

      {/* Main SEO Content Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
          
          <div className="mb-8 border-b pb-4">
            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Last Updated: FY 2083/84 (2026/27)</p>
            <p className="text-sm text-slate-600"><strong>Data Sources:</strong> Department of Transport Management (DOTM), Provincial Transport Management Offices (Yatayat Karyalaya), Bagmati Province Fiscal Year 2083/84 Vehicle Tax Schedule, Beema Samiti Insurance Premium Rates.</p>
          </div>

          <p className="text-lg leading-relaxed mb-10">
            Use this Vehicle Tax Calculator Nepal to calculate annual road tax, bluebook renewal charges, third-party insurance estimates, pollution check fees, penalties and electric vehicle tax using the latest 2083/84 rates. The calculator supports motorcycles, scooters, cars, jeeps, buses, trucks and electric vehicles based on current Nepal transport tax regulations and TMIS data.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-6">Vehicle Tax in Nepal 2083/84 — Quick Answer</h2>
          
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">What is vehicle tax in Nepal?</h3>
            <p className="mb-4">Vehicle tax in Nepal is an annual road tax paid to the provincial government to maintain valid vehicle registration and bluebook status under the Vehicle and Transport Management Act (VTMA). It is administered by each province's Transport Management Office (Yatayat Karyalaya) and must be renewed every fiscal year.</p>
            
            <h3 className="text-xl font-bold mb-2 mt-6">How much is bike tax in Nepal?</h3>
            <p className="mb-4">Bike tax in Nepal depends on engine capacity (CC). Motorcycles up to 125cc pay Rs. 3,000 annually. A 150cc bike pays Rs. 5,000. A 225cc bike pays Rs. 6,500. Motorcycles between 226–400cc pay Rs. 12,000, and larger bikes above 650cc pay Rs. 35,000 per year under FY 2083/84 rates.</p>
            
            <h3 className="text-xl font-bold mb-2 mt-6">How do I renew my bluebook in Nepal?</h3>
            <p>To renew your bluebook, pay your annual road tax, mandatory renewal fee, and maintain valid third-party insurance through your local Transport Management Office (TMO). You can pay online via eSewa, Khalti, MyPay, or the Nagarik App in Bagmati and Gandaki provinces, but you must still visit the TMO for the physical bluebook stamp.</p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Vehicle Tax in Nepal 2083/84</h2>
          <p className="mb-6">Vehicle tax in Nepal is calculated based on vehicle category, engine capacity (CC), motor power (kW), seating capacity or carrying capacity. Vehicle owners must renew road tax annually to maintain valid registration and bluebook status under the Vehicle and Transport Management Act. Rates are set by each province through its annual Finance Act — the rates on this page reflect Bagmati Province (Kathmandu) for FY 2083/84, which is the most widely applicable baseline.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Bike Tax Calculator Nepal</h2>
          <p className="mb-4">If you own a motorcycle or scooter, the Bike Tax Calculator Nepal module estimates your exact road tax due for FY 2083/84.</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Vehicle Category</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Annual Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Up to 125 CC</td><td className="py-2 px-4 border-b">Rs. 3,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">126–150 CC</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 5,000</td></tr>
                <tr><td className="py-2 px-4 border-b">151–225 CC</td><td className="py-2 px-4 border-b">Rs. 6,500</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">226–400 CC</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 12,000</td></tr>
                <tr><td className="py-2 px-4 border-b">401–650 CC</td><td className="py-2 px-4 border-b">Rs. 25,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Above 650 CC</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 35,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 font-semibold">Mandatory Renewal Fee: Rs. 300</p>
          
          <h3 className="text-lg font-bold mt-6 mb-3">Popular bike models by slab:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Honda CD 110 / Hero Splendor</strong> → Up to 125 CC → Rs. 3,000</li>
            <li><strong>Honda CB Shine / Bajaj Pulsar 150</strong> → 126–150 CC → Rs. 5,000</li>
            <li><strong>KTM Duke 200 / Yamaha FZ</strong> → 151–225 CC → Rs. 6,500</li>
            <li><strong>Royal Enfield Bullet 350 / KTM Duke 390 / Yamaha MT-03</strong> → 226–400 CC → Rs. 12,000</li>
            <li><strong>KTM Duke 690 / Royal Enfield 650</strong> → 401–650 CC → Rs. 25,000</li>
            <li><strong>Harley-Davidson / BMW GS</strong> above 650 CC → Rs. 35,000</li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Private Car, Jeep and Van Tax Rates</h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Vehicle Category</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Annual Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Up to 1000 CC</td><td className="py-2 px-4 border-b">Rs. 22,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">1001–1500 CC</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 25,000</td></tr>
                <tr><td className="py-2 px-4 border-b">1501–2000 CC</td><td className="py-2 px-4 border-b">Rs. 27,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">2001–2500 CC</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 37,000</td></tr>
                <tr><td className="py-2 px-4 border-b">2501–3000 CC</td><td className="py-2 px-4 border-b">Rs. 50,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">3001–3500 CC</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 65,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Above 3500 CC</td><td className="py-2 px-4 border-b">Rs. 70,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 font-semibold">Mandatory Renewal Fee: Rs. 500</p>
          <p className="mb-8">If you are financing a vehicle purchase, use our <Link href="/calculator/loan-emi/" className="text-blue-600 hover:underline">Auto Loan EMI Calculator</Link> to estimate your monthly bank installments alongside your annual tax obligations.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Electric Vehicle (EV) Tax Rates</h2>
          <p className="mb-4">Electric vehicle road tax in Nepal is calculated based on motor power (kW) as listed in the vehicle's bluebook, not engine CC.</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Motor Power</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Annual Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">10–50 kW</td><td className="py-2 px-4 border-b">Rs. 5,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">51–125 kW</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 15,000</td></tr>
                <tr><td className="py-2 px-4 border-b">126–200 kW</td><td className="py-2 px-4 border-b">Rs. 20,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Above 200 kW</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 30,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 font-semibold">Mandatory Renewal Fee: Rs. 300</p>
          <p className="mb-8">Public and commercial EVs qualify for a flat 50% statutory discount on these standard running tax slabs. EVs still pay the renewal fee and mandatory third-party insurance regulated by Beema Samiti.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Commercial Vehicle Tax Rates</h2>
          <p className="mb-4">Commercial vehicles including Taxis, Buses, Trucks, Tractors and Three-Wheelers are assessed by seating capacity or carrying weight under the Bagmati Province Finance Act for FY 2083/84.</p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Vehicle Category</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Annual Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Taxi (up to 1500 CC)</td><td className="py-2 px-4 border-b">Rs. 4,000 – Rs. 6,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Microbus (1–14 seats)</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 8,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Minibus (15–25 seats)</td><td className="py-2 px-4 border-b">Rs. 12,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Medium Bus (26–35 seats)</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 18,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Large Bus (36+ seats)</td><td className="py-2 px-4 border-b">Rs. 35,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Small Truck (up to 3 tonnes)</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 10,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Medium Truck (3–5 tonnes)</td><td className="py-2 px-4 border-b">Rs. 15,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Heavy Goods (5–10 tonnes)</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 25,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Heavy Truck / Lorry (above 10 tonnes)</td><td className="py-2 px-4 border-b">Rs. 35,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Agricultural Tractor / Three-Wheeler</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 3,000</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Third-Party Insurance Rates Nepal (Beema Samiti)</h2>
          <p className="mb-4">Third-party insurance is legally mandatory for all vehicles in Nepal. The TMO (Yatayat Karyalaya) will not process your bluebook renewal without a valid insurance certificate. These are approximate annual premiums regulated by Beema Samiti:</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Vehicle Type</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Approx. Annual Insurance (NPR)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Motorcycle / Scooter (up to 150 CC)</td><td className="py-2 px-4 border-b">Rs. 2,200</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Motorcycle (above 150 CC)</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 2,500 – Rs. 3,500</td></tr>
                <tr><td className="py-2 px-4 border-b">Private Car (up to 1500 CC)</td><td className="py-2 px-4 border-b">Rs. 4,500</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Private Car (1500–2500 CC)</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 6,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Private Car (above 2500 CC)</td><td className="py-2 px-4 border-b">Rs. 7,500 – Rs. 8,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Electric Vehicle (two-wheeler)</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 2,000 – Rs. 2,500</td></tr>
                <tr><td className="py-2 px-4 border-b">Electric Vehicle (four-wheeler)</td><td className="py-2 px-4 border-b">Rs. 3,500 – Rs. 5,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-8 italic text-slate-600">Confirm exact premiums with your insurance provider before visiting the TMO.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Bluebook Renewal Calculator Nepal</h2>
          <p className="mb-4">The Bluebook Renewal Calculator helps vehicle owners estimate the total cost of annual road renewal — road tax, renewal fee, third-party insurance, pollution check and any late penalties combined. Every registered vehicle in Nepal must renew its bluebook through the <a href="https://dotm.gov.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Department of Transport Management (DOTM)</a> or an authorized Transport Management Office (Yatayat Karyalaya).</p>
          
          <div className="bg-slate-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="font-bold">Total Bluebook Renewal Cost = Road Tax + Renewal Fee + Third-Party Insurance + Pollution Check Fee + Penalty (if late)</p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">For renewal you need:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Original vehicle bluebook</li>
            <li>Citizenship copy</li>
            <li>Valid third-party insurance certificate (from Beema Samiti-regulated insurer)</li>
            <li>Applicable road tax payment</li>
            <li>Mandatory renewal fee (Rs. 300 for two-wheelers, Rs. 500 for four-wheelers)</li>
            <li>Pollution check certificate (approx. Rs. 200–500)</li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">How To Calculate Vehicle Tax In Nepal</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-8 text-slate-700">
            <li>Select vehicle category (motorcycle, car, EV, commercial vehicle).</li>
            <li>Enter engine capacity (CC), motor power (kW), seating capacity or load capacity.</li>
            <li>Choose renewal status (on-time or overdue).</li>
            <li>Select delay period if renewal is overdue.</li>
            <li>Review annual road tax from the applicable slab.</li>
            <li>Add mandatory renewal fee (Rs. 300 or Rs. 500).</li>
            <li>Add third-party insurance estimate from Beema Samiti rates.</li>
            <li>Add pollution check fee (approx. Rs. 200–500).</li>
            <li>Review penalty amount if applicable.</li>
            <li>View total payable amount before visiting the TMO.</li>
          </ol>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">How To Pay Vehicle Tax Online in Nepal</h2>
          <p className="mb-4">Vehicle tax can be paid online in Bagmati and Gandaki provinces through approved digital payment systems.</p>
          <ol className="list-decimal pl-6 space-y-2 mb-6 text-slate-700">
            <li>Open eSewa, Khalti, MyPay or the Nagarik App.</li>
            <li>Go to Government Services → Vehicle Tax / Yatayat Kar.</li>
            <li>Select your province's Transport Management Office portal.</li>
            <li>Enter your vehicle registration number from your bluebook.</li>
            <li>Review the tax breakdown including any penalties.</li>
            <li>Confirm and complete payment.</li>
            <li>Download and print your digital payment receipt.</li>
            <li>Visit your local TMO with the receipt and original bluebook to obtain the physical renewal stamp.</li>
          </ol>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-800"><strong>Important:</strong> Online payment completes the tax transaction, but the physical bluebook stamp still requires an in-person TMO visit. Verify current payment options at <a href="https://dotm.gov.np/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-900">dotm.gov.np</a>.</p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Bluebook Renewal Fees and Penalties</h2>
          <p className="mb-4">Nepal applies progressive penalties when road tax and bluebook renewal are not completed within the required period. You are granted a 90-day grace period from the exact expiry date on your physical bluebook stamp before penalties begin.</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Delay Period</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Penalty</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Within 90-Day Grace Period</td><td className="py-2 px-4 border-b text-green-600 font-semibold">No Penalty</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">1–30 Days After Grace</td><td className="py-2 px-4 border-b bg-slate-50 text-red-500">5% of base tax</td></tr>
                <tr><td className="py-2 px-4 border-b">31–45 Days After Grace</td><td className="py-2 px-4 border-b text-red-500">10% of base tax</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">46 Days Until Fiscal Year End</td><td className="py-2 px-4 border-b bg-slate-50 text-red-600">20% of base tax</td></tr>
                <tr><td className="py-2 px-4 border-b">1–4 Fiscal Years Overdue</td><td className="py-2 px-4 border-b text-red-700 font-bold">32% per year (compounded)</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-lg font-bold mt-6 mb-3">Important notes:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Vehicle tax liability is capped at four fiscal years maximum for pending annual tax calculations.</li>
            <li>If you miss the 90-day grace period, the flat renewal fee also doubles (e.g., Rs. 300 becomes Rs. 600 for motorcycles).</li>
            <li>Penalties are applied to the base road tax only, not to the full renewal bill.</li>
            <li>Penalties may vary depending on provincial implementation.</li>
            <li>Insurance and pollution check remain mandatory at every renewal.</li>
            <li>After extended non-payment, traffic authorities may seize the vehicle on sight.</li>
          </ul>
          <p className="mb-8">Use our <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline">Nepal Salary Tax Calculator</Link> to understand how penalties affect your total annual financial obligations, or use the <Link href="/calculator/tds-calculator/" className="text-blue-600 hover:underline">TDS Calculator Nepal</Link> for business vehicle tax compliance.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Province-Wise Vehicle Tax in Nepal</h2>
          <p className="mb-4">Nepal's federal structure means vehicle road tax is a provincial subject. Each of the seven provinces sets its own annual rates through its Finance Act. Bagmati Province (Kathmandu) rates are used in this calculator as they represent the most widely applicable and highest-traffic baseline.</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Province</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Tax Baseline</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b font-semibold">Bagmati Province</td><td className="py-2 px-4 border-b">Standard (used in this calculator)</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Koshi Province</td><td className="py-2 px-4 border-b bg-slate-50">May differ — verify at local TMO</td></tr>
                <tr><td className="py-2 px-4 border-b">Gandaki Province</td><td className="py-2 px-4 border-b">May differ — verify at local TMO</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Lumbini Province</td><td className="py-2 px-4 border-b bg-slate-50">May differ — verify at local TMO</td></tr>
                <tr><td className="py-2 px-4 border-b">Madhesh Province</td><td className="py-2 px-4 border-b">May differ — verify at local TMO</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Karnali Province</td><td className="py-2 px-4 border-b bg-slate-50">May differ — verify at local TMO</td></tr>
                <tr><td className="py-2 px-4 border-b">Sudurpashchim Province</td><td className="py-2 px-4 border-b">May differ — verify at local TMO</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-8">Vehicle owners registered outside Bagmati should confirm their exact rates with their local Transport Management Office (Yatayat Karyalaya) or at dotm.gov.np.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Electric Vehicle Import Duty in Nepal (2083/84)</h2>
          <p className="mb-4">The FY 2083/84 federal budget abolished excise duties on passenger EV imports entirely, moving to a CIF (Cost, Insurance, and Freight) valuation model. All passenger EVs now face a flat 20% customs duty plus a progressive Clean Infrastructure Investment Fee based on vehicle value.</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">CIF Valuation</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Clean Infrastructure Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Up to Rs. 20 Lakh</td><td className="py-2 px-4 border-b">2.5%</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Rs. 20–30 Lakh</td><td className="py-2 px-4 border-b bg-slate-50">7.5%</td></tr>
                <tr><td className="py-2 px-4 border-b">Rs. 30–40 Lakh</td><td className="py-2 px-4 border-b">15%</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Rs. 40–50 Lakh</td><td className="py-2 px-4 border-b bg-slate-50">70%</td></tr>
                <tr><td className="py-2 px-4 border-b">Above Rs. 50 Lakh</td><td className="py-2 px-4 border-b">Up to 112.5%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-8">For gold import customs, use our <Link href="/calculator/gold-tax/" className="text-blue-600 hover:underline">Gold Import Tax Calculator</Link>.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Related Nepal Calculators</h2>
          <ul className="list-disc pl-6 space-y-2 mb-10 text-blue-600">
            <li><Link href="/calculator/loan-emi/" className="hover:underline">Auto Loan EMI Calculator</Link> — Calculate monthly vehicle loan EMI from Nepali banks.</li>
            <li><Link href="/calculator/nepal-salary/" className="hover:underline">Nepal Salary Tax Calculator</Link> — Compute income tax under FY 2083/84 rates.</li>
            <li><Link href="/calculator/tds-calculator/" className="hover:underline">TDS Calculator Nepal</Link> — Calculate TDS on salary and contractor payments.</li>
            <li><Link href="/calculator/nea-bill/" className="hover:underline">NEA Bill Calculator</Link> — Forecast your electricity bill using current NEA tariff slabs.</li>
            <li><Link href="/calculator/gold-tax/" className="hover:underline">Gold Import Tax Calculator</Link> — Estimate Nepal customs duty for gold imports.</li>
            <li><Link href="/calculator/nepal-income-tax/" className="hover:underline">Nepal Income Tax Calculator</Link> — Full income tax calculation with deductions and slabs.</li>
            <li><Link href="/calculator/nepali-date/" className="hover:underline">Nepali Date Converter</Link> — Convert between Bikram Sambat and Gregorian calendar to track your FY 2083/84 renewal deadlines.</li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-16 mb-8 pt-8 border-t">Vehicle Tax FAQ (2083/84)</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-slate-900">What is the tax on a Duke 200 in Nepal?</h3>
              <p className="text-slate-600 mt-1">A KTM Duke 200 has a 199cc engine, placing it in the 151–225 CC slab. The annual road tax for a Duke 200 in Nepal is Rs. 6,500 plus a mandatory renewal fee of Rs. 300, totalling Rs. 6,800 before insurance for FY 2083/84.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">What is the tax on a Bullet 350 in Nepal?</h3>
              <p className="text-slate-600 mt-1">A Royal Enfield Bullet 350 has a 349cc engine, placing it in the 226–400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee, totalling Rs. 12,300 before insurance for FY 2083/84.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">What is the tax on a 400cc bike in Nepal?</h3>
              <p className="text-slate-600 mt-1">A 400cc motorcycle falls in the 226–400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee for FY 2083/84.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">How much is bike tax in Nepal?</h3>
              <p className="text-slate-600 mt-1">Bike tax in Nepal for FY 2083/84 ranges from Rs. 3,000 for motorcycles up to 125cc, Rs. 5,000 for 150cc bikes, Rs. 6,500 for 225cc bikes, Rs. 12,000 for bikes up to 400cc, Rs. 25,000 for bikes up to 650cc, and Rs. 35,000 for motorcycles above 650cc. A mandatory renewal fee of Rs. 300 applies to all categories.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">How do I calculate vehicle tax in Nepal?</h3>
              <p className="text-slate-600 mt-1">Vehicle tax in Nepal is calculated using engine capacity (CC) for combustion vehicles or motor power (kW) for electric vehicles. Select your vehicle category, enter the capacity, and apply the current FY 2083/84 Bagmati Province slab rate. Add the renewal fee, third-party insurance, and pollution check to get your total bluebook renewal cost.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">What is the vehicle tax rate in Nepal for 2083/84?</h3>
              <p className="text-slate-600 mt-1">For FY 2083/84, motorcycles pay Rs. 3,000–35,000 depending on engine CC. Private cars pay Rs. 22,000–70,000 depending on CC. Electric vehicles pay Rs. 5,000–30,000 based on motor power (kW). Commercial vehicles are assessed by seating capacity or carrying weight under the Bagmati Province Finance Act.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">How do I renew my bluebook in Nepal?</h3>
              <p className="text-slate-600 mt-1">To renew your bluebook in Nepal, pay your annual road tax at your local Transport Management Office (Yatayat Karyalaya) or online via eSewa, Khalti, MyPay or the Nagarik App. Present a valid third-party insurance certificate, pollution check certificate, and your original bluebook. Pay the mandatory renewal fee. Collect the physical renewal stamp from the TMO.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">What is the penalty for late bluebook renewal?</h3>
              <p className="text-slate-600 mt-1">Late bluebook renewal penalties in Nepal start at 5% of base road tax for delays of 1–30 days past the 90-day grace period, rise to 10% for 31–45 days, 20% for 46 days to fiscal year end, and compound at 32% per year for renewals overdue by 1–4 fiscal years. The flat renewal fee also doubles once the grace period expires.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Can I calculate bike tax online in Nepal?</h3>
              <p className="text-slate-600 mt-1">Yes. The Vehicle Tax Calculator Nepal allows you to estimate motorcycle and scooter road tax, renewal fees, insurance and penalties instantly for FY 2083/84.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">How is EV tax calculated in Nepal?</h3>
              <p className="text-slate-600 mt-1">Electric vehicle road tax in Nepal is calculated using motor power (kW) as listed in the vehicle's bluebook. For FY 2083/84: 10–50 kW pays Rs. 5,000, 51–125 kW pays Rs. 15,000, 126–200 kW pays Rs. 20,000, and above 200 kW pays Rs. 30,000 annually. Public and commercial EVs receive a 50% statutory discount.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Where can I pay vehicle tax in Nepal?</h3>
              <p className="text-slate-600 mt-1">Vehicle tax in Nepal can be paid in person at your registered Transport Management Office (TMO). In Bagmati and Gandaki provinces, online payment is available through eSewa, Khalti, MyPay and the Nagarik App. After online payment, you must still visit the TMO to receive the physical bluebook renewal stamp.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Can vehicle tax be paid online?</h3>
              <p className="text-slate-600 mt-1">Yes, vehicle tax can be paid online in Bagmati and Gandaki provinces through eSewa, Khalti, MyPay and the Nagarik App. Other provinces may have different digital payment availability. Physical TMO visit remains required for the bluebook stamp regardless of payment method.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">What happens if I do not renew my bluebook for several years?</h3>
              <p className="text-slate-600 mt-1">If you do not renew your bluebook for several years in Nepal, penalties compound at 32% per year on the base road tax, capped at four fiscal years under DOTM regulations. The flat renewal fee also doubles. Traffic authorities may seize the vehicle upon detection. All pending tax and penalties must be fully cleared before the vehicle can be legally transferred (Naam Sari) or resold.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Is vehicle tax different across Nepal's provinces?</h3>
              <p className="text-slate-600 mt-1">Yes. Each of Nepal's seven provincial governments sets its own vehicle tax rates through annual Finance Acts. Bagmati Province (Kathmandu) generally applies a higher baseline than provinces like Koshi or Madhesh. Vehicle owners outside Bagmati should verify their exact rates at their local Yatayat Karyalaya or at dotm.gov.np.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Can I transfer vehicle ownership with unpaid tax?</h3>
              <p className="text-slate-600 mt-1">No. The Department of Transport Management (DOTM) requires a fully clean tax record before approving a Naam Sari (vehicle ownership transfer). All pending road tax, penalties and renewal charges must be cleared before ownership can be legally transferred to a new owner.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">What if I lost my bluebook? Can I still renew?</h3>
              <p className="text-slate-600 mt-1">If you lose your bluebook in Nepal, you cannot renew directly. You must first file an FIR at your local police station, publish a notice in a national newspaper (required by most transport offices), and apply for a duplicate bluebook at the TMO. The duplicate process takes approximately 2–6 weeks. Once the duplicate is issued, you can proceed with the annual renewal as normal.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Is third-party insurance mandatory for bluebook renewal?</h3>
              <p className="text-slate-600 mt-1">Yes. Third-party insurance regulated by Beema Samiti is legally mandatory for all vehicles in Nepal. The TMO (Yatayat Karyalaya) will not process your bluebook renewal without a valid insurance certificate. Annual premiums are approximately Rs. 2,200 for motorcycles and Rs. 4,500–8,000 for private cars.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">What is the pollution check fee for bluebook renewal?</h3>
              <p className="text-slate-600 mt-1">A pollution emissions test certificate is required as part of the bluebook renewal process. The pollution check fee is approximately Rs. 200–500 depending on vehicle type and testing center. Without a passing pollution certificate, the TMO will not complete the renewal stamp.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
