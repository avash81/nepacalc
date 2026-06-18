import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Official NEA Tariff Rates (Latest Electricity Slab Rates in Nepal)",
  description: "View the latest official NEA tariff rates in Nepal. Comprehensive electricity slab rates, service charges, and demand charges for 5A, 15A, 30A, and 60A meters.",
  slug: "electricity/nea-tariff-rates",
  canonical: "/electricity/nea-tariff-rates/",
  keywords: [
    "nea tariff rates",
    "latest nea tariff rates",
    "official nea tariff rates",
    "nea tariff rates 2083",
    "tariff rates nepal",
    "residential electricity tariff nepal",
    "electricity tariff nepal",
    "domestic electricity tariff nepal",
    "electricity slab rates nepal",
    "5A tariff Nepal",
    "15A tariff Nepal",
    "30A tariff Nepal",
    "60A tariff Nepal",
    "service charge electricity Nepal",
    "demand charge electricity Nepal",
    "lifeline tariff Nepal"
  ]
});

export default function NEATariffRatesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com" },
      { "@type": "ListItem", "position": 2, "name": "Electricity Guides", "item": "https://nepacalc.com/electricity/" },
      { "@type": "ListItem", "position": 3, "name": "Official NEA Tariff Rates", "item": "https://nepacalc.com/electricity/nea-tariff-rates/" }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NepaCalc",
    "url": "https://nepacalc.com",
    "logo": "https://nepacalc.com/logo.png",
    "sameAs": ["https://www.facebook.com/nepacalc"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NepaCalc",
    "url": "https://nepacalc.com"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/electricity/nea-tariff-rates/",
    "url": "https://nepacalc.com/electricity/nea-tariff-rates/",
    "name": "Official NEA Tariff Rates",
    "description": "Comprehensive guide to the official Nepal Electricity Authority (NEA) tariff rates, including 5A, 15A, 30A, and 60A meters slab rates, demand charges, and service charges.",
    "inLanguage": "en-NP",
    "isPartOf": { "@type": "WebSite", "name": "NepaCalc", "url": "https://nepacalc.com" }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Official NEA Tariff Rates (Latest Electricity Slab Rates in Nepal)",
    "description": "Comprehensive guide to the latest official Nepal Electricity Authority (NEA) tariff rates, including 5A, 15A, 30A, and 60A meter slab rates, three-phase tariffs, and service charges.",
    "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": {
      "@type": "Organization",
      "name": "NepaCalc",
      "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" }
    },
    "datePublished": "2026-06-18",
    "dateModified": "2026-06-18",
    "mainEntityOfPage": "https://nepacalc.com/electricity/nea-tariff-rates/"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the latest NEA tariff rates?",
        "acceptedAnswer": { "@type": "Answer", "text": "The latest residential NEA tariff rates range from Rs. 3.00 to Rs. 11.00 per unit (kWh) depending on the monthly consumption slab. For 5A lifeline users consuming 20 units or fewer, the energy charge is Rs. 0 and only a Rs. 30 service charge applies. Different service charges apply based on meter capacity (5A, 15A, 30A, 60A)." }
      },
      {
        "@type": "Question",
        "name": "What is the current electricity tariff in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "The current domestic electricity tariff in Nepal follows a progressive slab system. Rates start at Rs. 3.00 per unit for low consumers and go up to Rs. 11.00 per unit for households consuming above 250 units." }
      },
      {
        "@type": "Question",
        "name": "What is the 5A tariff rate in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "For a 5A meter in Nepal, the tariff rates are: 0-20 units: Rs. 3.00 (with Rs. 30 service charge); 21-30 units: Rs. 6.50 (Rs. 50 service charge); 31-50 units: Rs. 8.00 (Rs. 50 service charge); 51-150 units: Rs. 9.50 (Rs. 75 service charge); 151-250 units: Rs. 9.50 (Rs. 100 service charge); Above 250 units: Rs. 11.00 (Rs. 150 service charge)." }
      },
      {
        "@type": "Question",
        "name": "What is the service charge for a 15A meter?",
        "acceptedAnswer": { "@type": "Answer", "text": "The monthly service charge (or demand charge) for a 15A meter is: Rs. 50 for 0-20 units, Rs. 75 for 21-50 units, Rs. 100 for 51-150 units, Rs. 125 for 151-250 units, and Rs. 175 for consumption above 250 units." }
      },
      {
        "@type": "Question",
        "name": "What is the lifeline tariff in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "The lifeline tariff in Nepal is a subsidized electricity rate for low-income households with a 5A meter. If total monthly consumption is 20 units or fewer, the energy charge is completely waived (Rs. 0). The household only pays a minimum fixed service charge of Rs. 30 per month. If consumption exceeds 20 units even by one unit, standard progressive slab rates apply to all units." }
      }
    ]
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "cssSelector": [".quick-answer", ".summary-box"]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <div className="bg-[#F1F3F4] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-10">
          
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link href="/electricity/" className="hover:text-blue-600">Electricity Guides</Link>
            <span>›</span>
            <span className="text-slate-700 font-medium">NEA Tariff Rates</span>
          </nav>

          {/* H1 */}
          <h1 className="text-3xl font-black text-[#202124] mb-4 leading-tight">
            Official NEA Tariff Rates<br />
            <span className="text-[#1A73E8]">(Latest Electricity Slab Rates in Nepal)</span>
          </h1>

          {/* AUTHORITY / LAST UPDATED BAR */}
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-6 border-b border-slate-200 pb-4">
            <span>📅 <strong className="text-slate-700">Last Updated:</strong> June 2026</span>
            <span>✍️ <strong className="text-slate-700">Reviewed By:</strong> NepaCalc Research Team</span>
            <span>📍 <strong className="text-slate-700">Region:</strong> All NEA-served areas in Nepal</span>
          </div>

          {/* QUICK ANSWER BOX (AI Overview magnet) */}
          <div className="quick-answer bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-5 mb-7">
            <p className="text-[#1A73E8] font-black text-sm mb-1 uppercase tracking-wide">⚡ Quick Answer</p>
            <p className="text-[#202124] text-base font-medium leading-relaxed mb-0">
              The <strong>official NEA tariff rates in Nepal</strong> follow a progressive slab billing structure. Residential energy rates range from <strong>Rs. 3.00 to Rs. 11.00 per unit (kWh)</strong>, while fixed monthly service charges range from <strong>Rs. 30 to Rs. 250</strong> based on meter capacity (5A, 15A, 30A, or 60A) and monthly consumption.
            </p>
          </div>

          {/* AEO SUMMARY BOX */}
          <div className="summary-box bg-[#F8F9FA] border border-slate-200 rounded-xl p-5 mb-7">
            <p className="font-black text-[#202124] text-lg mb-3">Quick Facts</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm font-medium">
              <li>Residential tariff rates are structured in 6 progressive consumption slabs.</li>
              <li>Lifeline connection (5A meter, 0–20 units) costs only Rs. 30 fixed service charge.</li>
              <li>Fixed monthly service charges scale up with meter capacity (5A, 15A, 30A, 60A).</li>
              <li>Three-phase low-voltage residential connections have higher demand and energy charges.</li>
              <li>Tariff rates are nationally regulated by the Electricity Regulatory Commission (ERC).</li>
            </ul>
          </div>

          {/* INFO BOX FOR LINKING */}
          <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-5 mb-8">
            <p className="text-slate-800 text-sm mb-3">
              Want to estimate your monthly bill using these tariff rates? Use our <Link href="/calculator/nea-bill/" className="text-blue-600 font-bold hover:underline">NEA Bill Calculator</Link>.
            </p>
            <p className="text-slate-800 text-sm mb-0">
              Not sure what a unit of electricity means? Read our guide on the <Link href="/electricity/nepal-unit-price/" className="text-blue-600 font-bold hover:underline">price of 1 unit electricity in Nepal</Link>.
            </p>
          </div>

          {/* TABLE OF CONTENTS */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <p className="font-black text-slate-800 mb-3 text-sm uppercase tracking-wide">📑 Table of Contents</p>
            <ol className="space-y-1.5 text-sm text-blue-600 list-decimal pl-4">
              <li><a href="#master-tariff-table" className="hover:underline">NEA Residential Tariff Slab Rates Summary</a></li>
              <li><a href="#residential-structure" className="hover:underline">Residential Tariff Structure Explained</a></li>
              <li><a href="#5a-tariff" className="hover:underline">5A Meter Tariff Table</a></li>
              <li><a href="#15a-tariff" className="hover:underline">15A Meter Tariff Table</a></li>
              <li><a href="#30a-tariff" className="hover:underline">30A Meter Tariff Table</a></li>
              <li><a href="#60a-tariff" className="hover:underline">60A Meter Tariff Table</a></li>
              <li><a href="#three-phase" className="hover:underline">Three-Phase Tariff (Low Voltage)</a></li>
              <li><a href="#service-charges-comparison" className="hover:underline">Detailed Service Charges Comparison</a></li>
              <li><a href="#lifeline-tariff" className="hover:underline">NEA Lifeline Tariff (0-20 Units)</a></li>
              <li><a href="#tariff-changes" className="hover:underline">How Often Does NEA Change Tariffs?</a></li>
              <li><a href="#faq" className="hover:underline">Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* SECTION 1: MASTER TARIFF TABLE */}
          <section id="master-tariff-table" className="mb-10 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-2xl font-black text-[#202124] mb-4">1. NEA Residential Tariff Slab Rates Summary</h2>
            <p className="text-slate-700 mb-4 leading-relaxed text-sm">
              The table below summarizes the per-unit energy charges across different domestic connection levels. This provides a side-by-side view of the official rates implemented by the Nepal Electricity Authority (NEA):
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-[#003087] text-white">
                    <th className="p-3 border border-slate-300 font-bold text-left">Consumption Slab</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">5A Rate (Rs/kWh)</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">15A Rate (Rs/kWh)</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">30A Rate (Rs/kWh)</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">60A Rate (Rs/kWh)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0 – 20 Units", "Rs. 3.00 (Rs. 0)*", "Rs. 4.00", "Rs. 5.00", "Rs. 6.00"],
                    ["21 – 30 Units", "Rs. 6.50", "Rs. 6.50", "Rs. 6.50", "Rs. 6.50"],
                    ["31 – 50 Units", "Rs. 8.00", "Rs. 8.00", "Rs. 8.00", "Rs. 8.00"],
                    ["51 – 150 Units", "Rs. 9.50", "Rs. 9.50", "Rs. 9.50", "Rs. 9.50"],
                    ["151 – 250 Units", "Rs. 9.50", "Rs. 9.50", "Rs. 9.50", "Rs. 9.50"],
                    ["Above 250 Units", "Rs. 11.00", "Rs. 11.00", "Rs. 11.00", "Rs. 11.00"]
                  ].map(([slab, r5, r15, r30, r60], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-semibold">{slab}</td>
                      <td className="p-3 border border-slate-200 text-center font-bold text-[#003087]">{r5}</td>
                      <td className="p-3 border border-slate-200 text-center">{r15}</td>
                      <td className="p-3 border border-slate-200 text-center">{r30}</td>
                      <td className="p-3 border border-slate-200 text-center">{r60}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 italic">
              * Note: For 5A meter users, the energy charge is Rs. 0 for the first 20 units if their total monthly consumption does not exceed 20 units (only the Rs. 30 minimum service charge applies).
            </p>
          </section>

          {/* SECTION 2: STRUCTURE EXPLAINED */}
          <section id="residential-structure" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">2. Residential Tariff Structure Explained</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Nepal utilizes a progressive slab billing system for domestic electricity. This means that your monthly energy charge is split across slabs, and units falling into higher slabs are billed at higher rates. It ensures that basic lifeline electricity is affordable, while heavier consumption is charged progressively higher rates.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Additionally, a fixed monthly service charge (or demand charge) applies to all connections, scaling up with both your meter's Ampere capacity and your consumption slab.
            </p>
          </section>

          {/* SECTION 3: 5A TABLE */}
          <section id="5a-tariff" className="mb-10 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#202124] mb-4">3. 5A Meter Tariff Table</h2>
            <p className="text-slate-700 mb-4 text-sm leading-relaxed">
              The 5 Ampere connection is the standard and most common configuration for small households, apartments, and low-consumption domestic consumers in Nepal.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Consumption Slab (Units)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Energy Charge (Rs/Unit)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Service Charge (Rs/Month)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">0 – 20</td><td className="p-3 border border-slate-200 text-center">3.00 (Rs. 0 if total ≤20)</td><td className="p-3 border border-slate-200 text-center">Rs. 30.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">21 – 30</td><td className="p-3 border border-slate-200 text-center">6.50</td><td className="p-3 border border-slate-200 text-center">Rs. 50.00</td></tr>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">31 – 50</td><td className="p-3 border border-slate-200 text-center">8.00</td><td className="p-3 border border-slate-200 text-center">Rs. 50.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">51 – 150</td><td className="p-3 border border-slate-200 text-center">9.50</td><td className="p-3 border border-slate-200 text-center">Rs. 75.00</td></tr>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">151 – 250</td><td className="p-3 border border-slate-200 text-center">9.50</td><td className="p-3 border border-slate-200 text-center">Rs. 100.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">Above 250</td><td className="p-3 border border-slate-200 text-center">11.00</td><td className="p-3 border border-slate-200 text-center">Rs. 150.00</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 4: 15A TABLE */}
          <section id="15a-tariff" className="mb-10 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#202124] mb-4">4. 15A Meter Tariff Table</h2>
            <p className="text-slate-700 mb-4 text-sm leading-relaxed">
              Designed for medium-sized households utilizing multiple appliances like induction cookers, televisions, water pumps, and mid-sized refrigerators.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Consumption Slab (Units)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Energy Charge (Rs/Unit)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Service Charge (Rs/Month)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">0 – 20</td><td className="p-3 border border-slate-200 text-center">4.00</td><td className="p-3 border border-slate-200 text-center">Rs. 50.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">21 – 30</td><td className="p-3 border border-slate-200 text-center">6.50</td><td className="p-3 border border-slate-200 text-center">Rs. 75.00</td></tr>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">31 – 50</td><td className="p-3 border border-slate-200 text-center">8.00</td><td className="p-3 border border-slate-200 text-center">Rs. 75.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">51 – 150</td><td className="p-3 border border-slate-200 text-center">9.50</td><td className="p-3 border border-slate-200 text-center">Rs. 100.00</td></tr>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">151 – 250</td><td className="p-3 border border-slate-200 text-center">9.50</td><td className="p-3 border border-slate-200 text-center">Rs. 125.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">Above 250</td><td className="p-3 border border-slate-200 text-center">11.00</td><td className="p-3 border border-slate-200 text-center">Rs. 175.00</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 5: 30A TABLE */}
          <section id="30a-tariff" className="mb-10 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#202124] mb-4">5. 30A Meter Tariff Table</h2>
            <p className="text-slate-700 mb-4 text-sm leading-relaxed">
              Suitable for large residential properties running high-wattage machinery such as electric vehicle (EV) chargers, water heaters, and multiple air conditioning units.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Consumption Slab (Units)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Energy Charge (Rs/Unit)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Service Charge (Rs/Month)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">0 – 20</td><td className="p-3 border border-slate-200 text-center">5.00</td><td className="p-3 border border-slate-200 text-center">Rs. 75.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">21 – 30</td><td className="p-3 border border-slate-200 text-center">6.50</td><td className="p-3 border border-slate-200 text-center">Rs. 100.00</td></tr>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">31 – 50</td><td className="p-3 border border-slate-200 text-center">8.00</td><td className="p-3 border border-slate-200 text-center">Rs. 100.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">51 – 150</td><td className="p-3 border border-slate-200 text-center">9.50</td><td className="p-3 border border-slate-200 text-center">Rs. 125.00</td></tr>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">151 – 250</td><td className="p-3 border border-slate-200 text-center">9.50</td><td className="p-3 border border-slate-200 text-center">Rs. 150.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">Above 250</td><td className="p-3 border border-slate-200 text-center">11.00</td><td className="p-3 border border-slate-200 text-center">Rs. 200.00</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 6: 60A TABLE */}
          <section id="60a-tariff" className="mb-10 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#202124] mb-4">6. 60A Meter Tariff Table</h2>
            <p className="text-slate-700 mb-4 text-sm leading-relaxed">
              The 60 Ampere connection is the highest capacity single-phase domestic meter option. It is typically utilized in large villas, joint-family homes, and premises with extreme demand.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Consumption Slab (Units)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Energy Charge (Rs/Unit)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Service Charge (Rs/Month)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">0 – 20</td><td className="p-3 border border-slate-200 text-center">6.00</td><td className="p-3 border border-slate-200 text-center">Rs. 125.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">21 – 30</td><td className="p-3 border border-slate-200 text-center">6.50</td><td className="p-3 border border-slate-200 text-center">Rs. 125.00</td></tr>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">31 – 50</td><td className="p-3 border border-slate-200 text-center">8.00</td><td className="p-3 border border-slate-200 text-center">Rs. 125.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">51 – 150</td><td className="p-3 border border-slate-200 text-center">9.50</td><td className="p-3 border border-slate-200 text-center">Rs. 150.00</td></tr>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">151 – 250</td><td className="p-3 border border-slate-200 text-center">9.50</td><td className="p-3 border border-slate-200 text-center">Rs. 200.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">Above 250</td><td className="p-3 border border-slate-200 text-center">11.00</td><td className="p-3 border border-slate-200 text-center">Rs. 250.00</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 7: THREE PHASE */}
          <section id="three-phase" className="mb-10 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#202124] mb-4">7. Three-Phase Tariff (Low Voltage - 400V)</h2>
            <p className="text-slate-700 mb-4 text-sm leading-relaxed">
              For domestic consumers with high power demands (e.g. apartment blocks, larger residential lifts, heavy centralized HVAC systems), NEA provides three-phase low-voltage connections (up to 230V/400V).
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-[#003087] text-white">
                    <th className="p-3 border border-slate-300 font-bold text-left">Capacity Range</th>
                    <th className="p-3 border border-slate-300 font-bold text-left">Consumption Slab</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">Energy Charge (Rs/Unit)</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">Demand Charge (Rs/Month)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td rowSpan={2} className="p-3 border border-slate-200 font-medium">Up to 10 kVA</td>
                    <td className="p-3 border border-slate-200">0 – 400 Units</td>
                    <td className="p-3 border border-slate-200 text-center font-bold">10.50</td>
                    <td rowSpan={2} className="p-3 border border-slate-200 text-center font-semibold text-[#003087]">Rs. 1,100.00</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border border-slate-200">Above 400 Units</td>
                    <td className="p-3 border border-slate-200 text-center font-bold">11.50</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td rowSpan={2} className="p-3 border border-slate-200 font-medium">Above 10 kVA</td>
                    <td className="p-3 border border-slate-200">0 – 400 Units</td>
                    <td className="p-3 border border-slate-200 text-center font-bold">10.50</td>
                    <td rowSpan={2} className="p-3 border border-slate-200 text-center font-semibold text-[#003087]">Rs. 155.00 per kVA</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200">Above 400 Units</td>
                    <td className="p-3 border border-slate-200 text-center font-bold">11.50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 8: SERVICE CHARGES COMPARISON */}
          <section id="service-charges-comparison" className="mb-10 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#202124] mb-4">8. Detailed Service Charges & Demand Charges</h2>
            <p className="text-slate-700 mb-4 text-sm leading-relaxed">
              In addition to the progressive energy charge per unit, NEA applies a fixed monthly service charge. This charge is determined by your meter capacity (Amperes) and your overall monthly consumption slab.
            </p>
            <p className="text-slate-700 mb-4 font-bold text-sm">Monthly Service Charge (Demand Charge) Matrix:</p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Consumption (Units)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">5A Meter</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">15A Meter</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">30A Meter</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">60A Meter</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0 – 20 Units", "Rs. 30", "Rs. 50", "Rs. 75", "Rs. 125"],
                    ["21 – 30 Units", "Rs. 50", "Rs. 75", "Rs. 100", "Rs. 125"],
                    ["31 – 50 Units", "Rs. 50", "Rs. 75", "Rs. 100", "Rs. 125"],
                    ["51 – 150 Units", "Rs. 75", "Rs. 100", "Rs. 125", "Rs. 150"],
                    ["151 – 250 Units", "Rs. 100", "Rs. 125", "Rs. 150", "Rs. 200"],
                    ["Above 250 Units", "Rs. 150", "Rs. 175", "Rs. 200", "Rs. 250"],
                  ].map(([slab, c5, c15, c30, c60], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-semibold">{slab}</td>
                      <td className="p-3 border border-slate-200 text-center font-bold text-[#003087]">{c5}</td>
                      <td className="p-3 border border-slate-200 text-center">{c15}</td>
                      <td className="p-3 border border-slate-200 text-center">{c30}</td>
                      <td className="p-3 border border-slate-200 text-center">{c60}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 italic">
              These charges are billed monthly even if the consumption is zero, representing the cost of maintaining grid capacity for your connection.
            </p>
          </section>

          {/* SECTION 9: LIFELINE TARIFF */}
          <section id="lifeline-tariff" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">9. NEA Lifeline Tariff (0-20 Units)</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
              The Lifeline Tariff is a social welfare subsidy implemented by the Nepal Electricity Authority to support low-income families. Under this framework:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm mb-4">
              <li>It applies exclusively to households with a standard <strong>5 Ampere (5A) connection</strong>.</li>
              <li>If the total consumption in a billing month is <strong>20 units or less</strong>, the energy charge is waived entirely (Rs. 0).</li>
              <li>The user only pays a fixed minimum service charge of <strong>Rs. 30</strong>.</li>
              <li>If consumption exceeds 20 units (even by 1 unit), the standard progressive slab rates apply to all units.</li>
            </ul>
          </section>

          {/* SECTION 10: TARIFF CHANGES */}
          <section id="tariff-changes" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">10. How Often Does NEA Change Tariffs?</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Complete revisions of electricity rates in Nepal do not occur on a fixed annual schedule. Changes are proposed by the Nepal Electricity Authority (NEA) based on power purchasing agreements, domestic production capacity, and operational costs.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              These proposals must undergo public hearings and receive formal approval from the <strong>Electricity Regulatory Commission (ERC)</strong> before they are officially implemented. The ERC is the independent statutory body mandated under the Electricity Act to set and review tariffs in Nepal.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              To understand how individual unit costs add up to your final bill, read our guide on the <Link href="/electricity/nepal-unit-price/" className="text-blue-600 font-semibold hover:underline">price of 1 unit of electricity in Nepal</Link>.
            </p>
            <div className="bg-[#F8F9FA] border border-slate-200 rounded-xl p-5 mt-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#003087]">Want to estimate your monthly bill?</h3>
                <p className="text-sm text-slate-600 mt-1">Get an accurate bill calculation with current rates applied instantly.</p>
              </div>
              <Link href="/calculator/nea-bill/" className="bg-[#003087] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-800 transition-colors whitespace-nowrap ml-4">
                Use NEA Bill Calculator →
              </Link>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section id="faq" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-5">11. Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { 
                  q: "What are the latest NEA tariff rates?", 
                  a: "The latest residential NEA tariff rates range from Rs. 3.00/unit to Rs. 11.00/unit depending on the monthly consumption slab. The lifeline tariff (0-20 units) is Rs. 3.00/unit for a 5A meter. Different service charges apply based on the meter capacity." 
                },
                { 
                  q: "What is the current electricity tariff in Nepal?", 
                  a: "The current domestic electricity tariff in Nepal follows a progressive slab system. Rates start at Rs. 3.00 per unit for low consumers and go up to Rs. 11.00 per unit for households consuming above 250 units." 
                },
                { 
                  q: "What is the 5A tariff rate in Nepal?", 
                  a: "For a 5A meter in Nepal, the tariff rates are: 0-20 units: Rs. 3.00 (with Rs. 30 service charge); 21-30 units: Rs. 6.50 (Rs. 50 service charge); 31-50 units: Rs. 8.00 (Rs. 50 service charge); 51-150 units: Rs. 9.50 (Rs. 75 service charge); 151-250 units: Rs. 9.50 (Rs. 100 service charge); Above 250 units: Rs. 11.00 (Rs. 150 service charge)." 
                },
                { 
                  q: "What is the service charge for a 15A meter?", 
                  a: "The monthly service charge (or demand charge) for a 15A meter is: Rs. 50 for 0-20 units, Rs. 75 for 21-50 units, Rs. 100 for 51-150 units, Rs. 125 for 151-250 units, and Rs. 175 for consumption above 250 units." 
                },
                { 
                  q: "What is the lifeline tariff in Nepal?", 
                  a: "The lifeline tariff in Nepal is a subsidized electricity rate for low-income households with a 5A meter. If monthly consumption is 20 units or fewer, the energy charge is completely waived — Rs. 0. The household only pays a fixed minimum service charge of Rs. 30. If consumption exceeds 20 units even by one unit, the standard slab rates apply to all units consumed." 
                }
              ].map(({ q, a }, i) => (
                <details key={i} className="bg-white border border-slate-200 rounded-xl group">
                  <summary className="p-4 font-semibold text-slate-800 cursor-pointer text-sm hover:text-blue-700 list-none flex justify-between items-center">
                    {q}
                    <span className="text-slate-400 text-lg group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="px-4 pb-4 text-sm text-slate-700 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* EEAT DATA SOURCE DISCLOSURE */}
          <section className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-sm text-slate-600 mb-0">
              <strong>Data Source Disclosure:</strong> This guide is based on publicly available tariff schedules published by Nepal Electricity Authority (NEA) and referenced industry tariff documents. Consumers should verify updates directly through official NEA publications.
            </p>
          </section>

          {/* SOURCES */}
          <section id="sources" className="mb-10 text-sm border-t border-slate-200 pt-6">
            <h3 className="font-bold text-slate-800 mb-3">Sources &amp; References</h3>
            <ul className="list-disc pl-5 text-slate-600 space-y-2">
              <li>
                Nepal Electricity Authority (NEA) — <a href="https://nea.org.np/en/pages/consumer-tariff-rates" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Official Consumer Tariff Rates</a>
              </li>
              <li>
                Electricity Regulatory Commission (ERC), Nepal — <a href="https://www.erc.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">erc.gov.np</a> (Regulatory Authority for Tariff Approval)
              </li>
              <li>
                Nepal Energy Forum — <a href="http://www.nepalenergyforum.com/nea-electricity-tariff-rates/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">NEA Electricity Tariff Rates Reference</a>
              </li>
              <li>
                Department of Electricity Development (DoED), Nepal — <a href="https://doed.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">doed.gov.np</a> (Electricity Sector Regulator)
              </li>
            </ul>
          </section>

          {/* SIDEBAR / FOOTER CLUSTER BLOCK */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-[#003087] mb-4 border-b border-slate-100 pb-3">Related Electricity Resources</h2>
            <ul className="space-y-3">
              <li>⚡ <Link href="/calculator/nea-bill/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">NEA Bill Calculator — Estimate Your Monthly Bill</Link></li>
              <li>💡 <Link href="/electricity/nepal-unit-price/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Price of 1 Unit Electricity in Nepal</Link></li>
              <li>💧 <Link href="/calculator/kukl-bill/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">KUKL Water Bill Calculator</Link></li>
              <li>☀️ <Link href="/calculator/solar-requirement/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Solar Requirement Calculator for Nepal</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
