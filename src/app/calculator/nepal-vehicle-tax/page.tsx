import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Vehicle Tax Calculator Nepal (2083/84) – Bike, Car & Bluebook Renewal Tax",
  description: "Calculate vehicle tax in Nepal using the latest 2083/84 rates. Estimate bike tax, car tax, bluebook renewal charges, penalties and EV road tax instantly.",
  slug: 'nepal-vehicle-tax',
  keywords: [
    "Vehicle Tax Calculator Nepal",
    "Vehicle Tax Calculator",
    "Vehicle Tax in Nepal",
    "Vehicle Tax Nepal",
    "Nepal Vehicle Tax Calculator",
    "Bike Tax Calculator Nepal",
    "Bluebook Renew Calculator",
    "Bluebook Tax Calculator Nepal",
    "Vehicle Tax 2083/84",
    "Vehicle Tax Calculator Nepal 2083/84",
    "Motorcycle Tax Calculator",
    "Road Tax Calculator",
    "Car Tax Calculator Nepal",
    "EV Tax Nepal",
    "vehicle tax 2083 84",
    "vehicle tax in nepal 2083 84",
    "duke 200 tax in nepal",
    "bullet 350 tax in nepal",
    "150 cc bike tax in nepal",
    "400cc tax in nepal",
    "Scooter tax calculator Nepal",
    "Bluebook tax calculator Nepal"
  ],
  ogImage: "https://nepacalc.com/assets/images/vehicle-tax-calculator-nepal-2083-84.webp"
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculator/" },
      { "@type": "ListItem", "position": 3, "name": "Vehicle Tax Calculator Nepal", "item": "https://nepacalc.com/calculator/nepal-vehicle-tax/" }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Vehicle Tax Calculator Nepal (2083/84)",
    "description": "Calculate vehicle tax, bike tax, bluebook renewal fees and EV tax in Nepal using FY 2083/84 rates.",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".quick-answer", ".vehicle-tax-summary"]
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vehicle Tax Calculator Nepal",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Calculate vehicle tax, bike tax, bluebook renewal charges and EV road tax in Nepal using latest 2083/84 rates.",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Vehicle Tax Calculator Nepal",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Nepal Vehicle Tax Rates 2083/84",
    "description": "Official vehicle tax slabs used in Nepal Vehicle Tax Calculator for motorcycles, cars, electric vehicles and commercial vehicles in Nepal.",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": {
      "@type": "Organization",
      "name": "Department of Transport Management (DOTM) Nepal"
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Vehicle Tax Calculator Nepal (2083/84)",
    "author": {
      "@type": "Organization",
      "name": "NepaCalc"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How To Calculate Vehicle Tax In Nepal",
    "step": [
      { "@type": "HowToStep", "text": "Select vehicle category" },
      { "@type": "HowToStep", "text": "Enter CC/kW" },
      { "@type": "HowToStep", "text": "Select renewal status" },
      { "@type": "HowToStep", "text": "Enter delay period" },
      { "@type": "HowToStep", "text": "View tax amount" },
      { "@type": "HowToStep", "text": "View penalty" },
      { "@type": "HowToStep", "text": "View total payable" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the tax on a Duke 200 in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "A KTM Duke 200 has a 199cc engine, placing it in the 151–225 CC slab. The annual road tax for a Duke 200 in Nepal is Rs. 6,500 plus a mandatory renewal fee of Rs. 300, totalling Rs. 6,800 before insurance for FY 2083/84." } },
      { "@type": "Question", "name": "What is the tax on a Bullet 350 in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "A Royal Enfield Bullet 350 has a 349cc engine, placing it in the 226–400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee, totalling Rs. 12,300 before insurance for FY 2083/84." } },
      { "@type": "Question", "name": "What is the tax on a 150cc bike in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Most 150cc motorcycles fall under the 126–150 CC slab and pay Rs. 5,000 annual road tax plus renewal charges." } },
      { "@type": "Question", "name": "What is the tax on a 400cc bike in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Most 400cc motorcycles fall under the 226–400 CC slab and pay Rs. 12,000 annual road tax plus renewal charges." } },
      { "@type": "Question", "name": "How much is bike tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Bike tax in Nepal for FY 2083/84 ranges from Rs. 3,000 for motorcycles up to 125cc, Rs. 5,000 for 150cc bikes, Rs. 6,500 for 225cc bikes, Rs. 12,000 for bikes up to 400cc, Rs. 25,000 for bikes up to 650cc, and Rs. 35,000 for motorcycles above 650cc. A mandatory renewal fee of Rs. 300 applies to all categories." } },
      { "@type": "Question", "name": "How do I calculate vehicle tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Vehicle tax in Nepal is calculated using engine capacity (CC) for combustion vehicles or motor power (kW) for electric vehicles. Select your vehicle category, enter the capacity, and apply the current FY 2083/84 Bagmati Province slab rate. Add the renewal fee, third-party insurance, and pollution check to get your total bluebook renewal cost." } },
      { "@type": "Question", "name": "What is the vehicle tax rate in Nepal for 2083/84?", "acceptedAnswer": { "@type": "Answer", "text": "For FY 2083/84, motorcycles pay Rs. 3,000–35,000 depending on engine CC. Private cars pay Rs. 22,000–70,000 depending on CC. Electric vehicles pay Rs. 5,000–30,000 based on motor power (kW). Commercial vehicles are assessed by seating capacity or carrying weight under the Bagmati Province Finance Act." } },
      { "@type": "Question", "name": "How do I renew my bluebook in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "To renew your bluebook in Nepal, pay your annual road tax at your local Transport Management Office (Yatayat Karyalaya) or online via eSewa, Khalti, MyPay or the Nagarik App. Present a valid third-party insurance certificate, pollution check certificate, and your original bluebook. Pay the mandatory renewal fee. Collect the physical renewal stamp from the TMO." } },
      { "@type": "Question", "name": "What is the penalty for late bluebook renewal?", "acceptedAnswer": { "@type": "Answer", "text": "Late bluebook renewal penalties in Nepal start at 5% of base road tax for delays of 1–30 days past the 90-day grace period, rise to 10% for 31–45 days, 20% for 46 days to fiscal year end, and compound at 32% per year for renewals overdue by 1–4 fiscal years. The flat renewal fee also doubles once the grace period expires." } },
      { "@type": "Question", "name": "Can I calculate bluebook renewal fees online?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Vehicle Tax Calculator Nepal allows you to estimate motorcycle and scooter road tax, renewal fees, insurance and penalties instantly for FY 2083/84." } },
      { "@type": "Question", "name": "What is the vehicle tax for electric vehicles in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Electric vehicle road tax in Nepal is calculated using motor power (kW). For FY 2083/84: 10–50 kW pays Rs. 5,000, 51–125 kW pays Rs. 15,000, 126–200 kW pays Rs. 20,000, and above 200 kW pays Rs. 30,000 annually. Public and commercial EVs receive a 50% statutory discount." } },
      { "@type": "Question", "name": "Where can I pay vehicle tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Vehicle tax in Nepal can be paid in person at your registered Provincial Transport Management Office. In many provinces, online payment is available through eSewa, Khalti, ConnectIPS and the Nagarik App. After online payment, you must still visit the TMO to receive the physical bluebook renewal stamp." } },
      { "@type": "Question", "name": "What happens if I do not renew my bluebook for several years?", "acceptedAnswer": { "@type": "Answer", "text": "If you do not renew your bluebook for several years in Nepal, penalties compound at 32% per year on the base road tax, capped at four fiscal years under DOTM regulations. The flat renewal fee also doubles. Traffic authorities may seize the vehicle upon detection. All pending tax and penalties must be fully cleared before the vehicle can be legally transferred (Naam Sari) or resold." } },
      { "@type": "Question", "name": "Is vehicle tax different across Nepal's provinces?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Each of Nepal's seven provincial governments sets its own vehicle tax rates through annual Finance Acts. Bagmati Province (Kathmandu) generally applies a higher baseline than provinces like Koshi or Madhesh. Vehicle owners outside Bagmati should verify their exact rates at their local Yatayat Karyalaya or at dotm.gov.np." } },
      { "@type": "Question", "name": "Can I transfer vehicle ownership with unpaid tax?", "acceptedAnswer": { "@type": "Answer", "text": "No. The Department of Transport Management (DOTM) requires a fully clean tax record before approving a Naam Sari (vehicle ownership transfer). All pending road tax, penalties and renewal charges must be cleared before ownership can be legally transferred to a new owner." } },
      { "@type": "Question", "name": "What if I lost my bluebook? Can I still renew?", "acceptedAnswer": { "@type": "Answer", "text": "If you lose your bluebook in Nepal, you cannot renew directly. You must first file an FIR at your local police station, publish a notice in a national newspaper (required by most transport offices), and apply for a duplicate bluebook at the TMO. The duplicate process takes approximately 2–6 weeks. Once the duplicate is issued, you can proceed with the annual renewal as normal." } },
      { "@type": "Question", "name": "Is third-party insurance mandatory for bluebook renewal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Third-party insurance regulated by Beema Samiti is legally mandatory for all vehicles in Nepal. The TMO (Yatayat Karyalaya) will not process your bluebook renewal without a valid insurance certificate. Annual premiums are approximately Rs. 2,200 for motorcycles and Rs. 4,500–8,000 for private cars. If you are a salaried individual budgeting for these annual costs, our <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline">Salary Tax Calculator Nepal</Link> can help you understand your disposable income." } },
      { "@type": "Question", "name": "Scooter tax calculator Nepal", "acceptedAnswer": { "@type": "Answer", "text": "Scooter tax in Nepal follows the same rates as motorcycles based on engine CC. E-scooters pay a flat tax or tax based on kW." } },
      { "@type": "Question", "name": "Bluebook tax calculator Nepal", "acceptedAnswer": { "@type": "Answer", "text": "The Bluebook tax calculator Nepal helps you estimate your annual road tax, penalties, and renewal fees for FY 2083/84 before you visit the Yatayat Karyalaya." } },
      { "@type": "Question", "name": "Vehicle tax calculator Nepal", "acceptedAnswer": { "@type": "Answer", "text": "A Vehicle Tax Calculator Nepal provides an accurate estimate of road tax, third-party insurance, pollution check, and penalties for motorcycles, cars, and EVs in Nepal." } }
    ]
  };

  return (
    <>
      <link rel="canonical" href="https://nepacalc.com/calculator/nepal-vehicle-tax/" />
      <meta property="og:title" content="Vehicle Tax Calculator Nepal (2083/84)" />
      <meta property="og:description" content="Calculate vehicle tax, bluebook renewal charges and EV road tax in Nepal." />
      <meta property="og:image" content="https://nepacalc.com/assets/images/vehicle-tax-calculator-nepal-2083-84.webp" />
      <meta property="og:type" content="website" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Vehicle Tax Calculator Nepal (2083/84)" />
      <meta name="twitter:description" content="Calculate vehicle tax, bluebook renewal charges and EV road tax in Nepal." />
      <meta name="twitter:image" content="https://nepacalc.com/assets/images/vehicle-tax-calculator-nepal-2083-84.webp" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <h1 className="sr-only">Vehicle Tax Calculator Nepal (2083/84)</h1>

      <Calculator />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
          
          <div className="mb-6 flex items-center gap-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">Updated</span>
            <span className="text-sm text-slate-600 font-medium">Last Updated: Ashadh 2083 (June 2026)</span>
          </div>

          <p className="text-lg leading-relaxed mb-10">
            Calculate vehicle tax, bluebook renewal charges, road tax penalties and electric vehicle tax using the latest Nepal vehicle tax rates for FY 2083/84. This Vehicle Tax Calculator Nepal supports motorcycles, scooters, cars, jeeps, buses, trucks and EVs using guidelines set by the <a href="https://www.dotm.gov.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Department of Transport Management (DOTM)</a>.
          </p>

          <div className="bg-slate-50 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <ul className="list-none pl-0 space-y-2 text-blue-600 font-medium">
              <li><a href="#quick-answer" className="hover:underline">Vehicle Tax In Nepal 2083/84</a></li>
              <li><a href="#how-calculated" className="hover:underline">How Vehicle Tax is Calculated in Nepal</a></li>
              <li><a href="#popular-searches" className="hover:underline">Popular Vehicle Tax Searches in Nepal</a></li>
              <li><a href="#bike-tax" className="hover:underline">Bike Tax Rates</a></li>
              <li><a href="#car-tax" className="hover:underline">Car Tax Rates</a></li>
              <li><a href="#ev-tax" className="hover:underline">EV Tax Rates</a></li>
              <li><a href="#commercial-tax" className="hover:underline">Commercial Vehicle Tax</a></li>
              <li><a href="#bluebook-renewal" className="hover:underline">Bluebook Renewal</a></li>
              <li><a href="#payment-locations" className="hover:underline">Where Can I Pay Vehicle Tax in Nepal?</a></li>
              <li><a href="#faq" className="hover:underline">FAQs</a></li>
            </ul>
          </div>

          <h2 id="quick-answer" className="text-2xl font-black text-slate-900 mt-10 mb-6">Vehicle Tax In Nepal 2083/84</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 quick-answer">
            <ul className="list-disc pl-4 space-y-2">
              <li>Bike tax starts from Rs. 3,000 per year.</li>
              <li>Private car tax starts from Rs. 22,000 per year.</li>
              <li>EV tax starts from Rs. 5,000 per year.</li>
              <li>Bluebook renewal requires valid insurance.</li>
              <li>Late renewals may incur penalties up to 32%.</li>
              <li>Vehicle tax rates vary by vehicle category and capacity.</li>
            </ul>
          </div>

          <h2 id="how-calculated" className="text-2xl font-black text-slate-900 mt-12 mb-6">Vehicle Tax Calculator Nepal</h2>
          <div className="vehicle-tax-summary mb-8">
            <p className="mb-4">Vehicle tax in Nepal is calculated based on vehicle type, engine capacity (CC), electric motor power (kW), seating capacity or carrying capacity. Annual road tax, bluebook renewal charges and applicable penalties are combined to determine the final payable amount.</p>
            <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm space-y-4">
              <p><strong>Formula:</strong><br />Annual Vehicle Tax = Base Road Tax + Renewal Fee + Penalty (if applicable)</p>
              <p><strong>For overdue renewals:</strong><br />Total Payable = Annual Tax × Pending Years + Penalty + Renewal Charges</p>
            </div>
          </div>

          <h2 id="popular-searches" className="text-2xl font-black text-slate-900 mt-12 mb-6">Bike Tax Calculator Nepal</h2>
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Duke 200 Tax in Nepal</h3>
              <p className="text-slate-600 mt-1">A Duke 200 falls under the 151–225 CC category and pays Rs. 6,500 annual road tax plus renewal charges.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Bullet 350 Tax in Nepal</h3>
              <p className="text-slate-600 mt-1">A Bullet 350 falls under the 226–400 CC category and pays Rs. 12,000 annual road tax plus renewal charges.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">150cc Bike Tax in Nepal</h3>
              <p className="text-slate-600 mt-1">Most 150cc motorcycles fall under the 126–150 CC slab and pay Rs. 5,000 annual road tax.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">400cc Bike Tax in Nepal</h3>
              <p className="text-slate-600 mt-1">Most 400cc motorcycles fall under the 226–400 CC slab and pay Rs. 12,000 annual road tax.</p>
            </div>
          </div>

          <h2 id="bike-tax" className="text-2xl font-black text-slate-900 mt-12 mb-6">Motorcycle Tax Calculator Nepal</h2>
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

          <h2 id="car-tax" className="text-2xl font-black text-slate-900 mt-12 mb-6">Car Tax Calculator Nepal</h2>
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

          <h2 id="ev-tax" className="text-2xl font-black text-slate-900 mt-12 mb-6">EV Tax Rates</h2>
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

          <h2 id="commercial-tax" className="text-2xl font-black text-slate-900 mt-12 mb-6">Road Tax Calculator Nepal</h2>
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

          <h2 id="bluebook-renewal" className="text-2xl font-black text-slate-900 mt-12 mb-6">Bluebook Renewal Calculator Nepal</h2>
          <p className="mb-4">The Bluebook Renewal Calculator Nepal helps vehicle owners estimate annual road tax, renewal fees and late penalties estimating your costs before visiting the Transport Management Office. If you are securing your vehicle as collateral, you might also find our <Link href="/calculator/nepal-home-loan/" className="text-blue-600 hover:underline">Nepal Home Loan Calculator</Link> useful for broader financial planning.</p>
          <p className="mb-4">To renew a bluebook in Nepal, vehicle owners generally need:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Vehicle Registration Certificate (Bluebook)</li>
            <li>Citizenship Copy</li>
            <li>Valid Insurance</li>
            <li>Applicable Tax Payment</li>
            <li>Renewal Fee</li>
          </ul>

          <h2 id="payment-locations" className="text-2xl font-black text-slate-900 mt-12 mb-6">Where Can I Pay Vehicle Tax in Nepal?</h2>
          <p className="mb-4">Vehicle tax in Nepal can be paid through:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Provincial Transport Management Offices</li>
            <li>Department of Transport Management (DOTM)</li>
            <li>Authorized banks</li>
            <li>eSewa (where available)</li>
            <li>Khalti (where available)</li>
            <li>ConnectIPS (where available)</li>
          </ul>
          <p className="mb-8 italic">Availability may vary by province.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Official Sources</h2>
          <p className="mb-4">This calculator uses vehicle tax schedules published by:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Department of Transport Management (DoTM)</li>
            <li>Bagmati Province Government</li>
            <li>Transport Management Offices</li>
            <li>TMIS Nepal</li>
          </ul>

          

          <h2 id="faq" className="text-2xl font-black text-slate-900 mt-16 mb-8 pt-8 border-t">Vehicle Tax FAQ (2083/84)</h2>
          <div className="space-y-6 mb-12">
            <div><h3 className="font-bold text-lg text-slate-900">What is the tax on a Duke 200 in Nepal?</h3><p className="text-slate-600 mt-1">A KTM Duke 200 has a 199cc engine, placing it in the 151–225 CC slab. The annual road tax for a Duke 200 in Nepal is Rs. 6,500 plus a mandatory renewal fee of Rs. 300, totalling Rs. 6,800 before insurance for FY 2083/84.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the tax on a Bullet 350 in Nepal?</h3><p className="text-slate-600 mt-1">A Royal Enfield Bullet 350 has a 349cc engine, placing it in the 226–400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee, totalling Rs. 12,300 before insurance for FY 2083/84.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the tax on a 150cc bike in Nepal?</h3><p className="text-slate-600 mt-1">Most 150cc motorcycles fall under the 126–150 CC slab and pay Rs. 5,000 annual road tax plus renewal charges.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the tax on a 400cc bike in Nepal?</h3><p className="text-slate-600 mt-1">Most 400cc motorcycles fall under the 226–400 CC slab and pay Rs. 12,000 annual road tax plus renewal charges.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">How much is bike tax in Nepal?</h3><p className="text-slate-600 mt-1">Bike tax in Nepal for FY 2083/84 ranges from Rs. 3,000 for motorcycles up to 125cc, Rs. 5,000 for 150cc bikes, Rs. 6,500 for 225cc bikes, Rs. 12,000 for bikes up to 400cc, Rs. 25,000 for bikes up to 650cc, and Rs. 35,000 for motorcycles above 650cc. A mandatory renewal fee of Rs. 300 applies to all categories.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">How do I calculate vehicle tax in Nepal?</h3><p className="text-slate-600 mt-1">Vehicle tax in Nepal is calculated using engine capacity (CC) for combustion vehicles or motor power (kW) for electric vehicles. Select your vehicle category, enter the capacity, and apply the current FY 2083/84 Bagmati Province slab rate. Add the renewal fee, third-party insurance, and pollution check to get your total bluebook renewal cost.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the vehicle tax rate in Nepal for 2083/84?</h3><p className="text-slate-600 mt-1">For FY 2083/84, motorcycles pay Rs. 3,000–35,000 depending on engine CC. Private cars pay Rs. 22,000–70,000 depending on CC. Electric vehicles pay Rs. 5,000–30,000 based on motor power (kW). Commercial vehicles are assessed by seating capacity or carrying weight under the Bagmati Province Finance Act.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">How do I renew my bluebook in Nepal?</h3><p className="text-slate-600 mt-1">To renew your bluebook in Nepal, pay your annual road tax at your local Transport Management Office (Yatayat Karyalaya) or online via eSewa, Khalti, MyPay or the Nagarik App. Present a valid third-party insurance certificate, pollution check certificate, and your original bluebook. Pay the mandatory renewal fee. Collect the physical renewal stamp from the TMO.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the penalty for late bluebook renewal?</h3><p className="text-slate-600 mt-1">Late bluebook renewal penalties in Nepal start at 5% of base road tax for delays of 1–30 days past the 90-day grace period, rise to 10% for 31–45 days, 20% for 46 days to fiscal year end, and compound at 32% per year for renewals overdue by 1–4 fiscal years. The flat renewal fee also doubles once the grace period expires. Unlike utility bills such as <Link href="/electricity/nea-tariff-rates/" className="text-blue-600 hover:underline">NEA Tariff Rates</Link> where disconnection occurs, vehicle taxes accrue heavy compounding fines.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Can I calculate bluebook renewal fees online?</h3><p className="text-slate-600 mt-1">Yes. The Vehicle Tax Calculator Nepal allows you to estimate motorcycle and scooter road tax, renewal fees, insurance and penalties instantly for FY 2083/84.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the vehicle tax for electric vehicles in Nepal?</h3><p className="text-slate-600 mt-1">Electric vehicle road tax in Nepal is calculated using motor power (kW). If you charge your EV at home, it is highly recommended to check the <Link href="/electricity/nepal-unit-price/" className="text-blue-600 hover:underline">Electricity Unit Price in Nepal</Link> to estimate your running costs. For FY 2083/84: 10–50 kW pays Rs. 5,000, 51–125 kW pays Rs. 15,000, 126–200 kW pays Rs. 20,000, and above 200 kW pays Rs. 30,000 annually. Public and commercial EVs receive a 50% statutory discount.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Where can I pay vehicle tax in Nepal?</h3><p className="text-slate-600 mt-1">Vehicle tax in Nepal can be paid in person at your registered Provincial Transport Management Office. In many provinces, online payment is available through eSewa, Khalti, ConnectIPS and the Nagarik App. After online payment, you must still visit the TMO to receive the physical bluebook renewal stamp.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What happens if I do not renew my bluebook for several years?</h3><p className="text-slate-600 mt-1">If you do not renew your bluebook for several years in Nepal, penalties compound at 32% per year on the base road tax, capped at four fiscal years under DOTM regulations. The flat renewal fee also doubles. Traffic authorities may seize the vehicle upon detection. All pending tax and penalties must be fully cleared before the vehicle can be legally transferred (Naam Sari) or resold.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Is vehicle tax different across Nepal's provinces?</h3><p className="text-slate-600 mt-1">Yes. Each of Nepal's seven provincial governments sets its own vehicle tax rates through annual Finance Acts. Bagmati Province (Kathmandu) generally applies a higher baseline than provinces like Koshi or Madhesh. Vehicle owners outside Bagmati should verify their exact rates at their local Yatayat Karyalaya or at dotm.gov.np.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Can I transfer vehicle ownership with unpaid tax?</h3><p className="text-slate-600 mt-1">No. The Department of Transport Management (DOTM) requires a fully clean tax record before approving a Naam Sari (vehicle ownership transfer). All pending road tax, penalties and renewal charges must be cleared before ownership can be legally transferred to a new owner.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What if I lost my bluebook? Can I still renew?</h3><p className="text-slate-600 mt-1">If you lose your bluebook in Nepal, you cannot renew directly. You must first file an FIR at your local police station, publish a notice in a national newspaper (required by most transport offices), and apply for a duplicate bluebook at the TMO. The duplicate process takes approximately 2–6 weeks. Once the duplicate is issued, you can proceed with the annual renewal as normal.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Is third-party insurance mandatory for bluebook renewal?</h3><p className="text-slate-600 mt-1">Yes. Third-party insurance regulated by Beema Samiti is legally mandatory for all vehicles in Nepal. The TMO (Yatayat Karyalaya) will not process your bluebook renewal without a valid insurance certificate. Annual premiums are approximately Rs. 2,200 for motorcycles and Rs. 4,500–8,000 for private cars. If you are a salaried individual budgeting for these annual costs, our <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline">Salary Tax Calculator Nepal</Link> can help you understand your disposable income.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Scooter tax calculator Nepal</h3><p className="text-slate-600 mt-1">Scooter tax in Nepal follows the same rates as motorcycles based on engine CC. E-scooters pay a flat tax or tax based on kW.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Bluebook tax calculator Nepal</h3><p className="text-slate-600 mt-1">The Bluebook tax calculator Nepal helps you estimate your annual road tax, penalties, and renewal fees for FY 2083/84 before you visit the Yatayat Karyalaya.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Vehicle tax calculator Nepal</h3><p className="text-slate-600 mt-1">A Vehicle Tax Calculator Nepal provides an accurate estimate of road tax, third-party insurance, pollution check, and penalties for motorcycles, cars, and EVs in Nepal.</p></div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-8 text-sm text-slate-600 border border-slate-200">
            <p className="mb-2">This calculator is maintained and updated using publicly available data from the Department of Transport Management (DoTM) and provincial transport offices. Rates are reviewed whenever new fiscal year tax schedules are published.</p>
            <p><strong>Last Updated:</strong> Ashadh 2083 (June 2026)</p>
          </div>

          <div className="sr-only">
            Vehicle Tax Calculator Nepal. Bike Tax Calculator Nepal. Bluebook Renewal Calculator Nepal. Department of Transport Management. DOTM Nepal. Bagmati Province Vehicle Tax. Vehicle Tax 2083/84. Road Tax Nepal. Vehicle Renewal Nepal. Motorcycle Tax Nepal. Car Tax Nepal. Electric Vehicle Tax Nepal.
          </div>

        </div>
      </div>
    </>
  );
}
