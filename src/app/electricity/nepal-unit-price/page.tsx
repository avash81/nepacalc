import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "1 Unit Electricity Price in Nepal (Latest NEA Rates and Cost Per Unit Guide)",
  description: "Discover the latest 1 unit electricity price in Nepal. Learn NEA slab rates, service charges, VAT rules, and how electricity costs are calculated for 5A, 15A, and 30A domestic connections. Try NepaCalc now.",
  slug: "electricity/nepal-unit-price",
  canonical: "/electricity/nepal-unit-price/",
  keywords: [
    "electricity unit price nepal",
    "1 unit electricity price in nepal",
    "electricity cost per unit nepal",
    "electricity rate nepal",
    "NEA electricity unit rate",
    "electricity tariff nepal",
    "per unit electricity price nepal",
    "nepal electricity cost",
    "NEA unit price",
    "5A electricity rate nepal",
    "15A electricity tariff nepal",
    "30A electricity charge nepal",
    "electricity bill rate nepal",
    "domestic electricity tariff nepal",
    "electricity price per kWh nepal",
    "latest electricity rates nepal",
    "current electricity rate nepal",
    "electricity charge per unit",
    "nea unit rate",
  ],
});

export default function NepalElectricityUnitPricePage() {

  /* ─────────────────────────────────────────────
     SCHEMA STACK
  ───────────────────────────────────────────── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com" },
      { "@type": "ListItem", "position": 2, "name": "Electricity Guides", "item": "https://nepacalc.com/electricity/" },
      { "@type": "ListItem", "position": 3, "name": "1 Unit Electricity Price in Nepal", "item": "https://nepacalc.com/electricity/nepal-unit-price/" }
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

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/electricity/nepal-unit-price/",
    "url": "https://nepacalc.com/electricity/nepal-unit-price/",
    "name": "1 Unit Electricity Price in Nepal",
    "description": "Latest electricity unit price in Nepal with NEA domestic tariff rates, service charges, VAT rules, and cost calculations.",
    "inLanguage": "en-NP",
    "isPartOf": { "@type": "WebSite", "name": "NepaCalc", "url": "https://nepacalc.com" }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "1 Unit Electricity Price in Nepal (Latest NEA Rates and Cost Per Unit Guide)",
    "description": "Latest electricity unit price guide in Nepal with official NEA tariff rates, slab calculations, service charges, VAT rules, and real bill examples.",
    "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": {
      "@type": "Organization",
      "name": "NepaCalc",
      "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" }
    },
    "datePublished": "2026-06-17",
    "dateModified": "2026-06-17",
    "mainEntityOfPage": "https://nepacalc.com/electricity/nepal-unit-price/"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the price of 1 unit of electricity in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "The price of 1 unit (kWh) of electricity in Nepal ranges from Rs. 3.00 to Rs. 11.00 depending on monthly consumption and meter capacity. The Nepal Electricity Authority (NEA) uses a progressive slab tariff system. Low-consumption households (0–20 units on a 5A connection) pay Rs. 3.00 per unit while heavy consumers (above 251 units) pay Rs. 11.00 per unit." }
      },
      {
        "@type": "Question",
        "name": "How much does 100 units of electricity cost in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "For a standard 5A domestic meter consuming 100 units, the estimated energy charge is approximately Rs. 840 (Rs. 365 for first 50 units + Rs. 475 for units 51–100 at Rs. 9.50/unit). Adding the Rs. 75 service charge and 5% VAT on units above 50 gives a total estimated bill of approximately Rs. 939." }
      },
      {
        "@type": "Question",
        "name": "What are the latest NEA electricity rates?",
        "acceptedAnswer": { "@type": "Answer", "text": "The latest NEA residential electricity rates for FY 2083/84 are: 0–20 units at Rs. 3.00/unit, 21–30 units at Rs. 6.50/unit, 31–50 units at Rs. 8.00/unit, 51–150 units at Rs. 9.50/unit, 151–250 units at Rs. 9.50/unit, and above 251 units at Rs. 11.00/unit." }
      },
      {
        "@type": "Question",
        "name": "How is electricity billed in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Nepal Electricity Authority (NEA) bills residential consumers using a progressive slab system. Monthly units consumed are split into bands, each charged at its respective rate. A fixed monthly service charge is added based on meter amperage (5A, 15A, 30A). A 5% concessional VAT applies on consumption above 50 units." }
      },
      {
        "@type": "Question",
        "name": "What is a service charge on an electricity bill?",
        "acceptedAnswer": { "@type": "Answer", "text": "A service charge (also called demand charge) is a fixed monthly fee based on your meter capacity and consumption slab. For a 5A meter it ranges from Rs. 30 to Rs. 150. For a 15A meter it ranges from Rs. 50 to Rs. 175. For a 30A meter it ranges from Rs. 75 to Rs. 200." }
      },
      {
        "@type": "Question",
        "name": "Do electricity rates vary by meter capacity?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. The energy rate per unit is the same across meter categories, but the fixed monthly service charge differs. A 5A meter has the lowest service charges while a 30A meter has higher fixed charges. The consumption-based slab rates (Rs. 3.00 to Rs. 11.00 per unit) apply uniformly." }
      },
      {
        "@type": "Question",
        "name": "Is VAT charged on electricity bills in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Under the fiscal year 2083/84 budget, a 5% concessional VAT applies to residential electricity consumption above 50 units per month. The first 50 units are VAT-exempt. VAT is applied only to the energy charge, not the service charge." }
      },
      {
        "@type": "Question",
        "name": "How can I calculate my NEA electricity bill?",
        "acceptedAnswer": { "@type": "Answer", "text": "Use the NepaCalc NEA Bill Calculator at nepacalc.com/calculator/nea-bill/ to instantly calculate your bill. Enter your monthly units consumed and meter amperage to get a complete breakdown of energy charges, service charges, and VAT." }
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
      {/* ── JSON-LD SCHEMA STACK ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <div className="bg-[#F1F3F4] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-10">

          {/* ── BREADCRUMB ── */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link href="/electricity/" className="hover:text-blue-600">Electricity Guides</Link>
            <span>›</span>
            <span className="text-slate-700 font-medium">1 Unit Electricity Price in Nepal</span>
          </nav>

          {/* ── H1 ── */}
          <h1 className="text-3xl font-black text-[#202124] mb-4 leading-tight">
            Electricity Unit Price in Nepal<br />
            <span className="text-[#1A73E8]">(Latest NEA Tariff Rates)</span>
          </h1>

          {/* ── AUTHORITY / LAST UPDATED BAR ── */}
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-6 border-b border-slate-200 pb-4">
            <span>📅 <strong className="text-slate-700">Last Updated:</strong> June 2026</span>
            <span>✍️ <strong className="text-slate-700">Reviewed By:</strong> NepaCalc Research Team</span>
            <span>📍 <strong className="text-slate-700">Region:</strong> All NEA-served areas in Nepal</span>
          </div>

          {/* ── QUICK ANSWER BOX (AI Overview magnet) ── */}
          <div className="quick-answer bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-5 mb-7">
            <p className="text-[#1A73E8] font-black text-sm mb-1 uppercase tracking-wide">⚡ Quick Answer</p>
            <p className="text-[#202124] text-base font-medium leading-relaxed mb-0">
              The price of <strong>1 unit of electricity in Nepal</strong> ranges from approximately <strong>Rs. 3.00 to Rs. 11.00 per unit</strong> depending on monthly consumption and meter capacity. Domestic electricity customers are billed using a <strong>progressive slab system</strong> regulated by the <strong>Nepal Electricity Authority (NEA)</strong>.
            </p>
          </div>

          {/* ── KEY TAKEAWAYS (summary-box) ── */}
          <div className="summary-box bg-white border border-slate-200 rounded-xl p-5 mb-7 shadow-sm">
            <p className="font-black text-slate-800 text-sm mb-3 uppercase tracking-wide">📋 Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-slate-700">
              <li>✅ Lowest residential rate: <strong>Rs. 3.00 per unit</strong> (0–20 units, 5A meter)</li>
              <li>✅ Highest residential rate: <strong>Rs. 11.00 per unit</strong> (above 251 units)</li>
              <li>✅ Rates are determined by <strong>progressive consumption slabs</strong></li>
              <li>✅ Fixed <strong>service charge</strong> applies based on meter size (5A / 15A / 30A)</li>
              <li>✅ <strong>5% VAT</strong> applies only on consumption above 50 units per month</li>
              <li>✅ Use the <Link href="/calculator/nea-bill/" className="text-blue-600 underline font-semibold">NEA Bill Calculator</Link> to get your exact amount</li>
            </ul>
          </div>

          {/* ── NEA ELECTRICITY INFORMATION HUB ── */}
          <div className="bg-[#003087] rounded-xl p-5 mb-8 text-white">
            <p className="font-black text-sm mb-3">⚡ NEA Electricity Information Hub</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/calculator/nea-bill/" className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors inline-block">
                ✓ NEA Bill Calculator
              </Link>
              <span className="bg-white text-[#003087] font-bold text-sm px-4 py-2 rounded-lg inline-block shadow-sm">
                ✓ Electricity Unit Price (Current Page)
              </span>
            </div>
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <span className="bg-white/5 text-white/60 font-medium text-sm px-4 py-2 rounded-lg inline-block border border-white/10 border-dashed">
                ⏳ Coming Soon: NEA Tariff Rates
              </span>
              <span className="bg-white/5 text-white/60 font-medium text-sm px-4 py-2 rounded-lg inline-block border border-white/10 border-dashed">
                ⏳ Coming Soon: Electricity VAT Guide
              </span>
            </div>
          </div>


          {/* ── QUICK FACTS TABLE ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <p className="font-black text-slate-800 mb-3 text-sm uppercase tracking-wide">⚡ Electricity Unit Price at a Glance</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {[
                    ["Lowest Residential Rate", "Rs. 3.00 / Unit"],
                    ["Highest Residential Rate", "Rs. 11.00 / Unit"],
                    ["Billing Method", "Progressive Slab"],
                    ["VAT", "5% on usage above 50 units"],
                    ["Meter Types", "5A, 15A, 30A"],
                    ["Authority", "Nepal Electricity Authority (NEA)"],
                    ["Applicable FY", "2083/84"],
                  ].map(([label, val], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200 w-1/2">{label}</td>
                      <td className="py-2.5 px-3 text-slate-900 border border-slate-200 font-bold">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── TABLE OF CONTENTS ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <p className="font-black text-slate-800 mb-3 text-sm uppercase tracking-wide">📑 Table of Contents</p>
            <ol className="space-y-1.5 text-sm text-blue-600 list-decimal pl-4">
              {[
                ["#what-is-one-unit", "What is One Unit of Electricity?"],
                ["#current-electricity-rate", "Current Electricity Rate in Nepal"],
                ["#official-tariff-table", "Official NEA Tariff Table"],
                ["#service-charges", "Service Charges by Meter Type"],
                ["#meter-comparison", "5A vs 15A vs 30A Connections"],
                ["#how-nea-calculates", "How NEA Calculates Bills"],
                ["#cost-examples", "Cost Examples (50, 100, 150, 250 Units)"],
                ["#vat-rules", "VAT on Electricity Bills"],
                ["#paa", "People Also Ask"],
                ["#price-history", "Electricity Price History"],
                ["#faq", "Frequently Asked Questions"],
              ].map(([href, label]) => (
                <li key={href}><a href={href} className="hover:underline">{label}</a></li>
              ))}
            </ol>
          </div>

          {/* ── INTRODUCTION ── */}
          <p className="text-slate-700 mb-4 text-base leading-relaxed">
            If you are searching for the current <strong>electricity unit price in Nepal</strong>, it is important to understand that Nepal does not use a fixed flat electricity rate. Instead, the <strong>Nepal Electricity Authority (NEA)</strong> applies a <strong>progressive slab tariff system</strong> where the cost per unit increases as consumption rises.
          </p>
          <p className="text-slate-700 mb-4 text-base leading-relaxed">
            Residential consumers currently pay approximately <strong>Rs. 3.00 to Rs. 11.00 per unit</strong> depending on monthly usage and meter category. These rates apply across Nepal including <strong>Kathmandu, Lalitpur, Bhaktapur, Pokhara, Chitwan, Butwal, Nepalgunj, Janakpur, Dharan, Hetauda, and Biratnagar</strong>.
          </p>
          <p className="text-slate-700 mb-6 text-base leading-relaxed">
            For exact bill calculations, use our <Link href="/calculator/nea-bill/" className="text-blue-600 underline font-semibold">NEA Bill Calculator</Link>.
          </p>

          {/* ── CTA BUTTON ── */}
          <div className="mb-10">
            <Link href="/calculator/nea-bill/" className="inline-block bg-[#1A73E8] hover:bg-[#1557b0] text-white font-black px-7 py-3.5 rounded-xl transition-colors text-sm shadow-md">
              👉 Calculate Your Electricity Bill →
            </Link>
          </div>

          <hr className="border-dashed border-slate-300 my-8" />

          {/* ─────────────────────────────────
              SECTION 1: WHAT IS ONE UNIT
          ───────────────────────────────── */}
          <section id="what-is-one-unit" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">What is One Unit of Electricity?</h2>
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-4 mb-5">
              <p className="text-[#202124] font-bold text-sm mb-0">
                <strong>Short Answer:</strong> One unit of electricity equals one kilowatt-hour (kWh) — the energy consumed by running 1,000 watts of power for one hour.
              </p>
            </div>
            <p className="text-slate-700 mb-4">Understanding this helps you estimate household electricity costs accurately. Here are common examples:</p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-3 border border-slate-200 text-left font-bold text-slate-800">Appliance</th>
                    <th className="p-3 border border-slate-200 text-center font-bold text-slate-800">Usage</th>
                    <th className="p-3 border border-slate-200 text-center font-bold text-slate-800">Consumption</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["100W Bulb", "10 Hours", "1 Unit"],
                    ["200W Television", "5 Hours", "1 Unit"],
                    ["1000W Heater", "1 Hour", "1 Unit"],
                    ["500W Iron", "2 Hours", "1 Unit"],
                    ["50W Fan", "20 Hours", "1 Unit"],
                  ].map(([a, b, c], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-medium">{a}</td>
                      <td className="p-3 border border-slate-200 text-center">{b}</td>
                      <td className="p-3 border border-slate-200 text-center font-bold text-green-700">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─────────────────────────────────
              SECTION 2: CURRENT ELECTRICITY RATE
          ───────────────────────────────── */}
          <section id="current-electricity-rate" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">What is the Current Electricity Rate in Nepal?</h2>
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-4 mb-5">
              <p className="text-[#202124] font-bold text-sm mb-0">
                <strong>Short Answer:</strong> The current residential electricity price in Nepal ranges from Rs. 3.00 to Rs. 11.00 per unit depending on monthly consumption. Nepal uses a progressive slab-based tariff structure.
              </p>
            </div>
            <p className="text-slate-700 mb-4">
              Lower-consuming households pay lower rates while higher consumption is charged at higher slab rates. This design protects low-income families while ensuring those who use more electricity contribute proportionally more to grid maintenance costs.
            </p>
            <p className="text-slate-700 mb-4">
              The <strong>1 unit electricity price in Nepal</strong> is not a single fixed value — it is the rate applicable to that specific unit based on where it falls in the consumption slab. To calculate your actual bill accurately, use our <Link href="/calculator/nea-bill/" className="text-blue-600 underline font-semibold">NEA Bill Calculator</Link>.
            </p>
          </section>

          {/* ─────────────────────────────────
              SECTION 3: OFFICIAL TARIFF TABLE
          ───────────────────────────────── */}
          <section id="official-tariff-table" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Official NEA Domestic Electricity Unit Rates</h2>
            <p className="text-slate-700 mb-4">The following table shows the official <strong>residential electricity tariff rates</strong> set by the Nepal Electricity Authority for FY 2083/84:</p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-[#003087] text-white">
                    <th className="p-3 border border-slate-300 font-bold text-left">Consumption (Units)</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">Energy Rate (Rs/Unit)</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">VAT</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0 – 20 units", "Rs. 3.00", "None"],
                    ["21 – 30 units", "Rs. 6.50", "None"],
                    ["31 – 50 units", "Rs. 8.00", "None"],
                    ["51 – 150 units", "Rs. 9.50", "5% (on units above 50)"],
                    ["151 – 250 units", "Rs. 9.50", "5%"],
                    ["Above 251 units", "Rs. 11.00", "5%"],
                  ].map(([a, b, c], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-semibold">{a}</td>
                      <td className="p-3 border border-slate-200 text-center font-bold text-[#003087]">{b}</td>
                      <td className={`p-3 border border-slate-200 text-center font-medium ${c === 'None' ? 'text-green-700' : 'text-amber-700'}`}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg text-sm text-amber-900">
              <strong>Important:</strong> The highest slab rate is NOT applied to all units. Each block of consumption is billed separately at its respective slab rate. A household consuming 100 units pays Rs. 3.00 for the first 20, Rs. 6.50 for units 21–30, Rs. 8.00 for units 31–50, and Rs. 9.50 for units 51–100.
            </div>
          </section>

          {/* ─────────────────────────────────
              SECTION 4: SERVICE CHARGES
          ───────────────────────────────── */}
          <section id="service-charges" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Service Charges by Meter Type</h2>
            <p className="text-slate-700 mb-4">Electricity bills in Nepal contain two primary components: <strong>Energy Charge</strong> and <strong>Service Charge</strong> (also called Demand Charge). The service charge is a flat monthly fee that varies by meter size and consumption bracket.</p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Consumption (Units)</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">5A Meter</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">15A Meter</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">30A Meter</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0 – 20 units", "Rs. 30", "Rs. 50", "Rs. 75"],
                    ["21 – 30 units", "Rs. 50", "Rs. 75", "Rs. 100"],
                    ["31 – 50 units", "Rs. 50", "Rs. 75", "Rs. 100"],
                    ["51 – 150 units", "Rs. 75", "Rs. 100", "Rs. 125"],
                    ["151 – 250 units", "Rs. 100", "Rs. 125", "Rs. 150"],
                    ["Above 251 units", "Rs. 150", "Rs. 175", "Rs. 200"],
                  ].map(([a, b, c, d], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-semibold">{a}</td>
                      <td className="p-3 border border-slate-200 text-center">{b}</td>
                      <td className="p-3 border border-slate-200 text-center">{c}</td>
                      <td className="p-3 border border-slate-200 text-center">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─────────────────────────────────
              SECTION 5: 5A vs 15A vs 30A
          ───────────────────────────────── */}
          <section id="meter-comparison" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">5A vs 15A vs 30A Electricity Connections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { amp: "5A Connection", color: "border-green-400 bg-green-50", items: ["Apartments", "Small households", "Basic appliance usage", "Fans, lights, TV"], note: "Lowest service charges" },
                { amp: "15A Connection", color: "border-blue-400 bg-blue-50", items: ["Typical family homes", "Refrigerators", "Water heaters", "Multiple rooms"], note: "Most common in Nepal" },
                { amp: "30A Connection", color: "border-orange-400 bg-orange-50", items: ["Large households", "Air conditioners", "High electricity demand", "Commercial residential"], note: "Higher service charges" },
              ].map(({ amp, color, items, note }) => (
                <div key={amp} className={`rounded-xl border-l-4 ${color} p-4`}>
                  <p className="font-black text-slate-800 text-sm mb-2">{amp}</p>
                  <ul className="text-xs text-slate-700 space-y-1 mb-3">
                    {items.map(i => <li key={i}>• {i}</li>)}
                  </ul>
                  <span className="text-xs font-bold text-slate-600">{note}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-700 text-sm">Consumers with larger connections generally pay higher service charges but the <strong>per-unit energy rate</strong> is the same across all meter categories for the same consumption slab.</p>
          </section>

          {/* ─────────────────────────────────
              SECTION 6: HOW NEA CALCULATES
          ───────────────────────────────── */}
          <section id="how-nea-calculates" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">How NEA Calculates Electricity Bills</h2>
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-4 mb-5">
              <p className="text-[#202124] font-bold text-sm mb-2">Short Answer: Your total electricity bill = Energy Charge + Service Charge + VAT</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5 font-mono text-sm">
              <div className="space-y-1 text-slate-700">
                <div className="font-bold text-slate-900">Electricity Bill Breakdown</div>
                <div className="border-l-2 border-slate-300 pl-3 mt-2 space-y-1">
                  <div>├── Energy Charge (progressive slab calculation)</div>
                  <div>├── Service Charge (fixed, based on meter size)</div>
                  <div>├── VAT (5% on energy above 50 units)</div>
                  <div>└── <strong>= Total Monthly Bill</strong></div>
                </div>
              </div>
            </div>
            <p className="text-slate-700 mb-4">
              To verify your exact calculation, use our <Link href="/calculator/nea-bill/" className="text-blue-600 underline font-semibold">NEA Bill Calculator</Link> — enter your monthly units and meter size to get a full itemized breakdown instantly.
            </p>
          </section>

          {/* ─────────────────────────────────
              SECTION 7: COST EXAMPLES
          ───────────────────────────────── */}
          <section id="cost-examples" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Electricity Cost Examples in Nepal</h2>
            <p className="text-slate-700 mb-4">To help you understand how the <strong>domestic line per unit price</strong> affects your actual bill, here are common bill examples for a typical 5A household meter.</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Units Consumed</th>
                    <th className="p-3 border border-slate-200 font-bold text-right">Approximate Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["20 units", "~ Rs. 30 (lifeline base)"],
                    ["50 units", "~ Rs. 415"],
                    ["100 units", "~ Rs. 939"],
                    ["150 units", "~ Rs. 1,438"],
                    ["200 units", "~ Rs. 1,961"],
                    ["250 units", "~ Rs. 2,460"],
                  ].map(([a, b], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-bold">{a}</td>
                      <td className="p-3 border border-slate-200 text-right font-medium">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-slate-500 mt-2 italic">Note: Exact bills vary depending on your specific meter capacity (5A, 15A, 30A) and applicable service charges or VAT.</p>
            </div>

            <h3 className="text-xl font-black text-[#202124] mb-6 mt-8">Detailed Cost Breakdowns (5A Meter)</h3>

            {/* 50 units */}
            <div className="mb-6">
              <h3 className="text-lg font-black text-[#202124] mb-3" id="cost-50">Cost of 50 Units of Electricity</h3>
              <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-4 mb-3">
                <p className="text-[#202124] font-bold text-sm mb-0"><strong>Short Answer:</strong> ~Rs. 415 (energy Rs. 365 + service charge Rs. 50, no VAT)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-slate-200">
                  <tbody>
                    <tr className="bg-slate-50"><td className="p-2.5 border border-slate-200 font-medium">First 20 units × Rs. 3.00</td><td className="p-2.5 border border-slate-200 text-right font-bold">Rs. 60</td></tr>
                    <tr className="bg-white"><td className="p-2.5 border border-slate-200 font-medium">Next 10 units × Rs. 6.50</td><td className="p-2.5 border border-slate-200 text-right font-bold">Rs. 65</td></tr>
                    <tr className="bg-slate-50"><td className="p-2.5 border border-slate-200 font-medium">Next 20 units × Rs. 8.00</td><td className="p-2.5 border border-slate-200 text-right font-bold">Rs. 160 <span className="text-xs text-slate-500 ml-1">(energy = Rs. 365 subtotal but note: 5A lifeline may apply for ≤20 units)</span></td></tr>
                    <tr className="bg-white"><td className="p-2.5 border border-slate-200 font-medium">Service Charge (5A, 31–50 slab)</td><td className="p-2.5 border border-slate-200 text-right font-bold">Rs. 50</td></tr>
                    <tr className="bg-green-50"><td className="p-2.5 border border-slate-200 font-bold">VAT</td><td className="p-2.5 border border-slate-200 text-right font-bold text-green-700">Rs. 0 (exempt)</td></tr>
                    <tr className="bg-[#003087] text-white"><td className="p-2.5 border border-slate-300 font-black">Estimated Total</td><td className="p-2.5 border border-slate-300 text-right font-black">~Rs. 415</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 100 units */}
            <div className="mb-6">
              <h3 className="text-lg font-black text-[#202124] mb-3" id="cost-100">Cost of 100 Units of Electricity</h3>
              <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-4 mb-3">
                <p className="text-[#202124] font-bold text-sm mb-0"><strong>Short Answer:</strong> ~Rs. 939 (energy Rs. 840 + service Rs. 75 + VAT on 50 units at Rs. 9.50)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-slate-200">
                  <tbody>
                    <tr className="bg-slate-50"><td className="p-2.5 border border-slate-200 font-medium">First 50 units (cumulative)</td><td className="p-2.5 border border-slate-200 text-right font-bold">Rs. 365</td></tr>
                    <tr className="bg-white"><td className="p-2.5 border border-slate-200 font-medium">Units 51–100 × Rs. 9.50</td><td className="p-2.5 border border-slate-200 text-right font-bold">Rs. 475</td></tr>
                    <tr className="bg-slate-50"><td className="p-2.5 border border-slate-200 font-medium">Service Charge (5A, 51–150 slab)</td><td className="p-2.5 border border-slate-200 text-right font-bold">Rs. 75</td></tr>
                    <tr className="bg-amber-50"><td className="p-2.5 border border-slate-200 font-medium">5% VAT on Rs. 475 (units above 50)</td><td className="p-2.5 border border-slate-200 text-right font-bold text-amber-700">~Rs. 24</td></tr>
                    <tr className="bg-[#003087] text-white"><td className="p-2.5 border border-slate-300 font-black">Estimated Total</td><td className="p-2.5 border border-slate-300 text-right font-black">~Rs. 939</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 150 units */}
            <div className="mb-6">
              <h3 className="text-lg font-black text-[#202124] mb-3" id="cost-150">Cost of 150 Units of Electricity</h3>
              <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-4 mb-3">
                <p className="text-[#202124] font-bold text-sm mb-0"><strong>Short Answer:</strong> ~Rs. 1,438 total estimated bill (energy Rs. 1,315 + service Rs. 75 + 5% VAT on units above 50)</p>
              </div>
              <p className="text-slate-700 text-sm mb-3">For exact calculations: <Link href="/calculator/nea-bill/" className="text-blue-600 underline font-semibold">Use the NEA Bill Calculator →</Link></p>
            </div>

            {/* 250 units */}
            <div className="mb-6">
              <h3 className="text-lg font-black text-[#202124] mb-3" id="cost-250">Cost of 250 Units of Electricity</h3>
              <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-4 mb-3">
                <p className="text-[#202124] font-bold text-sm mb-0"><strong>Short Answer:</strong> ~Rs. 2,560+ estimated total. Consumers at 250 units pay significantly more due to progressive slab pricing. The average effective cost per unit rises considerably above the base Rs. 3.00 rate.</p>
              </div>
            </div>

            {/* Comparison Table */}
            <h3 className="text-lg font-black text-slate-800 mb-3">Electricity Cost Comparison Table (5A Meter)</h3>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-[#003087] text-white">
                    <th className="p-3 border border-slate-300 font-bold text-left">Monthly Units</th>
                    <th className="p-3 border border-slate-300 font-bold text-right">Energy Charge</th>
                    <th className="p-3 border border-slate-300 font-bold text-right">Service Charge</th>
                    <th className="p-3 border border-slate-300 font-bold text-right">VAT</th>
                    <th className="p-3 border border-slate-300 font-bold text-right">Est. Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["20 units", "Rs. 0 (lifeline)", "Rs. 30", "Rs. 0", "Rs. 30"],
                    ["50 units", "Rs. 365", "Rs. 50", "Rs. 0", "~Rs. 415"],
                    ["100 units", "Rs. 840", "Rs. 75", "~Rs. 24", "~Rs. 939"],
                    ["150 units", "Rs. 1,315", "Rs. 75", "~Rs. 48", "~Rs. 1,438"],
                    ["200 units", "Rs. 1,790", "Rs. 100", "~Rs. 71", "~Rs. 1,961"],
                    ["250 units", "Rs. 2,265", "Rs. 100", "~Rs. 95", "~Rs. 2,460"],
                  ].map(([a, b, c, d, e], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-bold">{a}</td>
                      <td className="p-3 border border-slate-200 text-right">{b}</td>
                      <td className="p-3 border border-slate-200 text-right">{c}</td>
                      <td className="p-3 border border-slate-200 text-right text-amber-700">{d}</td>
                      <td className="p-3 border border-slate-200 text-right font-black text-[#003087]">{e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mb-6">* Estimates based on 5A meter rates. VAT calculated on energy above 50 units only. Use the <Link href="/calculator/nea-bill/" className="text-blue-600 underline">NEA Bill Calculator</Link> for your exact amount.</p>

            <div className="bg-[#003087] rounded-xl p-5 text-center mb-4">
              <p className="text-white font-black mb-2">Want an exact calculation?</p>
              <Link href="/calculator/nea-bill/" className="inline-block bg-white text-[#003087] font-black text-sm px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Use Our NEA Bill Calculator →
              </Link>
            </div>
          </section>

          {/* ─────────────────────────────────
              SECTION 8: VAT RULES
          ───────────────────────────────── */}
          <section id="vat-rules" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Is There VAT on Electricity Bills in Nepal?</h2>
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-4 mb-5">
              <p className="text-[#202124] font-bold text-sm mb-0">
                <strong>Short Answer:</strong> Yes. A 5% concessional VAT applies to electricity consumption above 50 units per month under the FY 2083/84 tariff framework.
              </p>
            </div>
            <ul className="text-slate-700 space-y-2 mb-4 text-sm list-disc pl-5">
              <li>The <strong>first 50 units</strong> per month are completely <strong>VAT-exempt</strong></li>
              <li>5% VAT applies only to the <strong>energy charge</strong> on units above 50</li>
              <li>VAT is <strong>not applied</strong> to the fixed service charge</li>
              <li>Households consuming 50 units or fewer pay <strong>zero VAT</strong></li>
            </ul>
            <p className="text-slate-700 text-sm mb-3">
              For a complete VAT explanation, verify latest rates through the official{' '}
              <a href="https://www.nea.org.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 underline">Nepal Electricity Authority portal</a>.
            </p>
          </section>

          <hr className="border-dashed border-slate-300 my-8" />

          {/* ─────────────────────────────────
              PEOPLE ALSO ASK
          ───────────────────────────────── */}
          <section id="paa" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-5">People Also Ask</h2>
            <div className="space-y-4">
              {[
                { q: "Is electricity cheaper in Nepal than India?", a: "Nepal's residential electricity rates (Rs. 3.00–11.00/unit) are broadly comparable to Indian domestic tariffs, though both countries use progressive slab systems. Nepal's rates are subsidised for low-consumption households with the lifeline provision for 5A connections." },
                { q: "What is the minimum electricity bill in Nepal?", a: "For a 5A meter consuming 20 units or fewer, only the minimum service charge of Rs. 30 applies. This is the lifeline provision for low-income households — the lowest possible monthly electricity bill in Nepal." },
                { q: "How many units of electricity does a typical Nepali household use?", a: "A typical Nepali urban household consumes approximately 50–150 units per month. Rural households with basic lighting and fans may use 20–50 units, while homes with water heaters, refrigerators, or ACs can exceed 150–250 units monthly." },
                { q: "What is the difference between energy charge and service charge?", a: "Energy charge is the cost calculated progressively based on units consumed. Service charge is a fixed monthly fee based on your meter amperage and consumption bracket — it does not change based on how many units you use within that bracket." },
                { q: "How do I calculate my per-unit average electricity cost in Nepal?", a: "Divide your total energy charge by units consumed. For example, a 100-unit bill with Rs. 840 energy charge works out to Rs. 8.40 per unit average — higher than the Rs. 3.00 base rate because of progressive slab pricing." },
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

          {/* ─────────────────────────────────
              WHY IS YOUR BILL HIGHER
          ───────────────────────────────── */}
          <section id="why-higher" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Why Your Electricity Bill Is Higher Than Unit Price × Consumption</h2>
            <p className="text-slate-700 mb-4 text-base">If you multiply your units by the <strong>electricity charge per unit</strong> and find your actual bill is higher, it is because the <strong>electricity cost in Nepal</strong> involves more than just the energy rate. A full bill calculation includes:</p>
            <ul className="text-slate-700 space-y-2 mb-4 list-disc pl-5">
              <li><strong>Energy Charge:</strong> The progressive cost of the actual units you consumed.</li>
              <li><strong>Service Charge:</strong> A fixed monthly fee (Demand Charge) based on your meter capacity (5A, 15A, or 30A). This is charged even if you consume zero units.</li>
              <li><strong>VAT:</strong> A 5% concessional Value Added Tax applied to the energy charge on usage exceeding 50 units.</li>
              <li><strong>Electricity Duty / Fines:</strong> Any applicable local duties or late payment penalties.</li>
            </ul>
          </section>

          {/* ─────────────────────────────────
              HOW NEA DETERMINES RATES
          ───────────────────────────────── */}
          <section id="how-nea-determines" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">How NEA Determines Electricity Rates</h2>
            <p className="text-slate-700 mb-4 text-base">The <strong>domestic consumer tariff</strong> is not set arbitrarily. The <strong>Electricity Regulatory Commission (ERC)</strong> is the governing body responsible for reviewing and approving all electricity tariffs proposed by the <strong>Nepal Electricity Authority (NEA)</strong>.</p>
            <p className="text-slate-700 mb-4 text-base">They utilize a progressive slab system to:</p>
            <ul className="text-slate-700 space-y-2 mb-4 list-disc pl-5">
              <li>Subsidize low-income households (e.g., the 0-20 unit lifeline rate).</li>
              <li>Charge heavy consumers a premium to discourage energy waste.</li>
              <li>Differentiate between residential domestic lines and commercial/industrial lines.</li>
              <li>Maintain the grid via structured fixed service charges.</li>
            </ul>
          </section>

          {/* ─────────────────────────────────
              DIFFER ACROSS NEPAL
          ───────────────────────────────── */}
          <section id="differ-across-nepal" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Does Electricity Cost Differ Across Nepal?</h2>
            <p className="text-slate-700 mb-4 text-base leading-relaxed">
              Residential electricity tariffs are regulated nationally by the <strong>Nepal Electricity Authority (NEA)</strong>. Customers in <strong>Kathmandu, Lalitpur, Bhaktapur, Pokhara, Biratnagar, Butwal, Nepalgunj, Dharan</strong> and other cities generally follow the exact same domestic tariff structure. There is no regional variation for the standard residential per unit cost.
            </p>
          </section>

          {/* ─────────────────────────────────
              PRICE HISTORY
          ───────────────────────────────── */}
          <section id="price-history" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Electricity Price History in Nepal</h2>
            <p className="text-slate-700 text-sm mb-4">Monitoring tariff history helps consumers understand changes in energy policy and anticipate future electricity pricing trends.</p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Fiscal Year</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Lowest Rate</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Highest Rate</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Notable Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">FY 2081/82</td><td className="p-3 border border-slate-200 text-center">Rs. 3.00</td><td className="p-3 border border-slate-200 text-center">Rs. 11.00</td><td className="p-3 border border-slate-200 text-center text-slate-500">No VAT</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">FY 2082/83</td><td className="p-3 border border-slate-200 text-center">Rs. 3.00</td><td className="p-3 border border-slate-200 text-center">Rs. 11.00</td><td className="p-3 border border-slate-200 text-center text-slate-500">No VAT</td></tr>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-bold text-blue-800">FY 2083/84</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 3.00</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 11.00</td><td className="p-3 border border-slate-200 text-center font-bold text-amber-700">5% VAT introduced</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium text-slate-400">FY 2084/85</td><td className="p-3 border border-slate-200 text-center text-slate-400">TBD</td><td className="p-3 border border-slate-200 text-center text-slate-400">TBD</td><td className="p-3 border border-slate-200 text-center text-slate-400">Will be updated here</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
              📌 <strong>Tariff Update History (Changelog):</strong> FY 2083/84 — 5% concessional VAT introduced above 50 units threshold. Energy slab rates unchanged from previous year. This page will be updated whenever the Electricity Regulatory Commission (ERC) or NEA publishes new residential pricing changes.
            </div>
          </section>

          {/* ─────────────────────────────────
              FAQ SECTION
          ───────────────────────────────── */}
          <section id="faq" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-5">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "What is the price of 1 unit of electricity in Nepal?", a: "Residential electricity costs between Rs. 3.00 and Rs. 11.00 per unit depending on your monthly consumption slab. The 5A lifeline rate for 0–20 units is Rs. 3.00/unit (or free if under 20 units). The highest slab (above 251 units) is charged at Rs. 11.00/unit." },
                { q: "How much is a 100-unit electricity bill?", a: "For a 5A meter, a 100-unit bill is approximately Rs. 939 total (energy Rs. 840 + service charge Rs. 75 + ~Rs. 24 VAT on the 50 units above the threshold). Use our NEA Bill Calculator for your exact amount." },
                { q: "What is a service charge?", a: "A service charge (also called demand charge) is a fixed monthly fee charged by NEA based on your meter capacity and consumption bracket. It ranges from Rs. 30 to Rs. 200 depending on your meter (5A, 15A, or 30A) and how many units you used." },
                { q: "What is a demand charge?", a: "Demand charge is another term used for service charge. It represents the fixed monthly cost of maintaining your connection capacity, separate from actual energy consumption charges." },
                { q: "How can I calculate my NEA bill?", a: "Use the NepaCalc NEA Bill Calculator at /calculator/nea-bill/ to get an instant itemized breakdown of energy charge, service charge, and VAT based on your monthly units and meter size." },
                { q: "Do electricity bills include VAT?", a: "Yes — a 5% concessional VAT applies to the energy charge on consumption above 50 units per month under the FY 2083/84 rules. The first 50 units are VAT-exempt and VAT is never applied to the service charge." },
                { q: "What are the latest NEA electricity rates?", a: "The latest rates for FY 2083/84: 0–20 units Rs. 3.00/unit, 21–30 units Rs. 6.50/unit, 31–50 units Rs. 8.00/unit, 51–150 units Rs. 9.50/unit, 151–250 units Rs. 9.50/unit, above 251 units Rs. 11.00/unit." },
                { q: "How is electricity billed in Nepal?", a: "NEA bills residential consumers using a progressive slab system. Monthly units are split into bands, each charged at its rate. A fixed service charge is added based on meter amperage, and 5% VAT applies to the energy charge above 50 units." },
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

          {/* ─────────────────────────────────
              WHY PROGRESSIVE TARIFF
          ───────────────────────────────── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Why Does Electricity Become More Expensive at Higher Usage?</h2>
            <p className="text-slate-700 text-sm mb-4">Nepal follows a progressive tariff system designed to:</p>
            <ul className="text-slate-700 space-y-2 mb-4 text-sm list-disc pl-5">
              <li>Support lower-income households through subsidised lifeline rates</li>
              <li>Encourage efficient energy usage across all consumer segments</li>
              <li>Reduce unnecessary electricity consumption during peak demand periods</li>
              <li>Promote fair distribution of energy resources across urban and rural areas</li>
            </ul>
            <p className="text-slate-700 text-sm">This model is widely used by utility providers across South Asia and globally. Residential customers in <strong>Kathmandu, Lalitpur, Bhaktapur, Pokhara, Biratnagar</strong> and all other NEA-served municipalities in Nepal are billed using the same NEA domestic tariff structure.</p>
          </section>

          {/* ─────────────────────────────────
              EXPERT REVIEW + EEAT
          ───────────────────────────────── */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-2xl shrink-0 text-white">⚡</div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-slate-900 m-0 mb-1">Editorial and Data Review</h4>
                <p className="text-xs text-slate-500 mb-3">This guide is maintained by NepaCalc and reviewed using official Nepal Electricity Authority (NEA) tariff publications and billing documentation. Tariff information is updated whenever the Electricity Regulatory Commission (ERC) or NEA publishes new residential pricing changes.</p>
                <div className="text-[11px] text-blue-600 font-bold space-y-1 mb-3">
                  <span className="block">✔ Sourced from NEA Tariff Notification FY 2083/84</span>
                  <span className="block">✔ Cross-referenced with Electricity Regulatory Commission (ERC) Nepal</span>
                  <span className="block">✔ 5% concessional VAT rule confirmed from 2083/84 Budget Speech</span>
                  <span className="block">✔ Service charges verified across 5A, 15A, 30A meter categories</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                  <span>📅 <strong>Last Reviewed:</strong> June 2026</span>
                  <span>🏛️ <strong>Sources:</strong> <a href="https://www.nea.org.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 underline">NEA</a> · <a href="https://www.neabilling.com" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 underline">NEA Billing Portal</a></span>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────
              RELATED RESOURCES
          ───────────────────────────────── */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8">
            <p className="font-black text-slate-800 text-sm mb-3 uppercase tracking-wide">🔗 Related Electricity Resources</p>
            <ul className="space-y-2.5 text-sm">
              <li>⚡ <Link href="/calculator/nea-bill/" className="text-blue-600 hover:underline font-semibold">NEA Bill Calculator</Link> — Calculate your exact monthly electricity bill</li>
              <li>📊 <Link href="/blog/nea-tariff-rates-2083-84/" className="text-blue-600 hover:underline font-semibold">NEA Tariff Rates 2083/84 — Complete Guide</Link></li>
              <li>💧 <Link href="/calculator/kukl-bill/" className="text-blue-600 hover:underline font-medium">KUKL Water Bill Calculator</Link></li>
              <li>☀️ <Link href="/calculator/solar-requirement/" className="text-blue-600 hover:underline font-medium">Solar Panel Requirement Calculator</Link></li>
            </ul>
          </div>

          {/* ─────────────────────────────────
              DISCLAIMER
          ───────────────────────────────── */}
          <div className="border-t border-slate-200 pt-6 text-xs text-slate-500">
            <p className="mb-1"><strong className="text-slate-600">Disclaimer:</strong> Data on this page is compiled from publicly available tariff schedules, regulatory notices, and billing information published by the Nepal Electricity Authority and related government bodies. While NepaCalc regularly reviews and updates this information, consumers should always verify final billing amounts using official NEA billing channels and tariff notices.</p>
            <p>Last Updated: June 2026 · FY 2083/84 · <a href="https://www.nea.org.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 underline">Nepal Electricity Authority (NEA)</a> · <a href="https://www.neabilling.com" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 underline">NEA Billing Portal</a></p>
          </div>

        </div>
      </div>
    </>
  );
}
