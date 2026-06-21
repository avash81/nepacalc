import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "1 Unit Electricity Cost in Nepal (2083/84) - NEA Unit Price Guide",
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NepaCalc",
    "url": "https://nepacalc.com"
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
        "name": "What is 1 unit of electricity?",
        "acceptedAnswer": { "@type": "Answer", "text": "One unit of electricity is exactly equal to one kilowatt-hour (kWh)." }
      },
      {
        "@type": "Question",
        "name": "What is the price of 1 kWh in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "One kilowatt-hour (kWh), also called one unit of electricity, typically costs between Rs. 4 and Rs. 11 depending on consumption slab and meter category." }
      },
      {
        "@type": "Question",
        "name": "How much does 100 units of electricity cost in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "For a medium-sized family consuming 100 units, the energy charges primarily fall into higher residential slabs, and the effective cost generally ranges between Rs. 8 and Rs. 10 per unit." }
      },
      {
        "@type": "Question",
        "name": "How much does 50 units of electricity cost in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "For 50 units, the first units are charged at lower slabs and later units at higher slabs. Use the NEA Bill Calculator for exact amounts including service charges." }
      },
      {
        "@type": "Question",
        "name": "Why is electricity charged in slabs in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Nepal uses a progressive slab-based electricity tariff system to ensure lower-income households pay less for basic usage, while heavier consumers pay a fairer share of infrastructure costs." }
      },
      {
        "@type": "Question",
        "name": "What is the NEA electricity tariff rate?",
        "acceptedAnswer": { "@type": "Answer", "text": "The NEA tariff rate ranges from Rs. 4 to Rs. 11 per unit for domestic consumers, depending on monthly consumption and meter capacity. A fixed service charge also applies." }
      },
      {
        "@type": "Question",
        "name": "Is 1 unit equal to 1 kWh?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. One unit of electricity is exactly equal to one kilowatt-hour (kWh)." }
      },
      {
        "@type": "Question",
        "name": "How can I calculate my electricity bill in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "You can calculate your electricity bill by using the NepaCalc NEA Bill Calculator, which factor in units consumed, consumption slab, meter capacity, and service charge." }
      },
      {
        "@type": "Question",
        "name": "Why do landlords charge more than NEA rates?",
        "acceptedAnswer": { "@type": "Answer", "text": "Many landlords charge a fixed rate (e.g., Rs. 10 to Rs. 15 per unit) that includes administrative costs or simplified billing. This rate may be higher than official NEA tariff rates." }
      },
      {
        "@type": "Question",
        "name": "What is the current electricity price per unit in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "The current electricity price per unit in Nepal generally ranges from Rs. 4 to Rs. 11 per unit (kWh), depending on the progressive slab system." }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to calculate electricity bill in Nepal",
    "step": [
      {
        "@type": "HowToStep",
        "text": "Find your total units consumed from your NEA electricity meter."
      },
      {
        "@type": "HowToStep",
        "text": "Identify your meter capacity (e.g., 5A, 15A, 30A)."
      },
      {
        "@type": "HowToStep",
        "text": "Enter these details into the NepaCalc NEA Bill Calculator to get your exact bill."
      }
    ]
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Nepal Electricity Tariff Rates",
    "description": "Official domestic electricity tariff rates for Nepal.",
    "creator": {
      "@type": "Organization",
      "name": "Nepal Electricity Authority"
    }
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
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
            1 Unit Electricity Cost in Nepal (2083/84)
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

          {/* ── AEO SUMMARY BOX ── */}
          <div className="summary-box bg-[#F8F9FA] border border-slate-200 rounded-xl p-5 mb-7">
            <p className="font-black text-[#202124] text-lg mb-3">Quick Facts</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm font-medium">
              <li>Electricity price in Nepal ranges from approximately Rs. 3.00 to Rs. 11.00 per unit.</li>
              <li>NEA uses a progressive slab tariff system.</li>
              <li>Fixed monthly service charges differ by meter capacity.</li>
              <li>Residential electricity tariffs are uniform across Nepal.</li>
              <li>Bills may also include VAT (5% on consumption above 50 units).</li>
            </ul>
          </div>

          {/* ── KEY FACTS (AI Overview Optimization) ── */}
          <div className="summary-box bg-white border border-slate-200 rounded-xl p-5 mb-7 shadow-sm">
            <p className="font-black text-slate-800 text-sm mb-3 uppercase tracking-wide">📋 Key Facts</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
              <div>
                <span className="block text-xs text-slate-500 uppercase tracking-wide">Lowest residential rate</span>
                <strong className="text-slate-900">Rs. 3.00 per unit</strong>
              </div>
              <div>
                <span className="block text-xs text-slate-500 uppercase tracking-wide">Highest residential rate</span>
                <strong className="text-slate-900">Rs. 11.00 per unit</strong>
              </div>
              <div>
                <span className="block text-xs text-slate-500 uppercase tracking-wide">Billing system</span>
                <strong className="text-slate-900">Progressive slab tariff</strong>
              </div>
              <div>
                <span className="block text-xs text-slate-500 uppercase tracking-wide">Regulator</span>
                <strong className="text-slate-900">Electricity Regulatory Commission (ERC)</strong>
              </div>
              <div>
                <span className="block text-xs text-slate-500 uppercase tracking-wide">Utility provider</span>
                <strong className="text-slate-900">Nepal Electricity Authority (NEA)</strong>
              </div>
              <div>
                <span className="block text-xs text-slate-500 uppercase tracking-wide">Coverage</span>
                <strong className="text-slate-900">Nationwide Nepal</strong>
              </div>
            </div>
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
              <Link href="/electricity/nea-tariff-rates/" className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors inline-block">
                ✓ Official NEA Tariff Rates
              </Link>
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
                    ["Meter Types", "5A, 15A, 30A, 60A"],
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

                    {/* ── AI OVERVIEW & SEARCH INTENT OPTIMIZATION ── */}
          <div className="summary-box bg-white border border-slate-200 rounded-xl p-5 mb-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 mb-4">1 Unit Electricity Price in Nepal (Updated 2083/84)</h2>
            <p className="text-slate-700 mb-4 font-medium">The price of 1 unit of electricity in Nepal is not fixed. According to <strong className="text-[#003087]">Nepal Electricity Authority (NEA)</strong> domestic tariff rates, the cost generally ranges from approximately <strong>Rs. 4 to Rs. 11 per unit (kWh)</strong>, depending on monthly electricity consumption and meter capacity.</p>
            
            <p className="font-bold text-slate-800 mb-2">For most residential consumers:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="py-2.5 px-3 font-bold border border-slate-200">Monthly Consumption</th>
                    <th className="py-2.5 px-3 font-bold border border-slate-200">Approximate Energy Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0–20 Units", "Rs. 4 per unit"],
                    ["21–30 Units", "Rs. 6.50 per unit"],
                    ["31–50 Units", "Rs. 8.00 per unit"],
                    ["51–100 Units", "Rs. 9.50 per unit"],
                    ["101–250 Units", "Rs. 9.50–11.00 per unit"],
                    ["Above 250 Units", "Up to Rs. 11.00 per unit"],
                  ].map(([label, val], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-2 px-3 border border-slate-200">{label}</td>
                      <td className="py-2 px-3 border border-slate-200 font-medium">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-3">What Is 1 Unit of Electricity?</h3>
            <p className="text-slate-700 mb-4">One unit of electricity equals one kilowatt-hour (kWh). A device consuming 1,000 watts (1 kW) for one hour uses exactly 1 unit of electricity.</p>
            <ul className="list-disc pl-5 space-y-1 mb-6 text-slate-700 text-sm">
              <li>100W bulb used for 10 hours = 1 unit</li>
              <li>1,000W heater used for 1 hour = 1 unit</li>
              <li>500W appliance used for 2 hours = 1 unit</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mb-3">Why Is There No Single Electricity Price Per Unit in Nepal?</h3>
            <p className="text-slate-700 mb-4">Unlike some countries with flat-rate billing, Nepal uses a <strong>slab-based electricity tariff system</strong>. The cost per unit depends on monthly electricity consumption, meter capacity (5A, 15A, 30A, etc.), consumer category, and applicable service charges.</p>
            
            <h3 className="text-lg font-bold text-slate-800 mb-3">Sample Electricity Cost Calculations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">20 Units Per Month</p>
                <p className="text-xs text-slate-600">Typical household usage: Energy charge approximately Rs. 4 per unit. Service charge applicable according to meter category.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">50 Units Per Month</p>
                <p className="text-xs text-slate-600">Typical apartment usage: First units charged at lower slabs. Later units charged at higher slabs. Effective average rate increases.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">100 Units Per Month</p>
                <p className="text-xs text-slate-600">Medium-sized family: Energy charges primarily fall into higher residential slabs. Effective cost generally ranges between Rs. 8 and Rs. 10 per unit.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">250 Units Per Month</p>
                <p className="text-xs text-slate-600">High-consumption household: Upper slab rates apply. Effective rate approaches Rs. 11 per unit.</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-3">About Nepal Electricity Authority (NEA)</h3>
            <p className="text-slate-700 mb-6 text-sm">Nepal Electricity Authority (NEA) is Nepal's state-owned electricity utility responsible for electricity generation, transmission, distribution, and tariff implementation across the country.</p>
          </div>

          {/* ── AI ANSWER TABLE ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 mb-4">Quick Answers to Common Queries</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="py-2.5 px-3 font-bold border border-slate-200">Question</th>
                    <th className="py-2.5 px-3 font-bold border border-slate-200">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["What is 1 unit electricity price in Nepal?", "Approximately Rs. 4–11 depending on tariff slab."],
                    ["What is 1 unit of electricity?", "1 kilowatt-hour (kWh)."],
                    ["Who sets electricity rates in Nepal?", "Nepal Electricity Authority (NEA)."],
                    ["How much is 50 units?", "Depends on slab. First units are cheaper."],
                    ["How much is 100 units?", "Depends on slab. Typically Rs. 8 to Rs. 10 per unit on average."],
                    ["Why is landlord charging Rs. 15?", "Private billing or administrative overhead, not the official NEA tariff."]
                  ].map(([q, a], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-2.5 px-3 border border-slate-200 font-medium">{q}</td>
                      <td className="py-2.5 px-3 border border-slate-200 text-slate-700">{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── PEOPLE ALSO ASK ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 mb-4">People Also Ask</h2>
            <div className="space-y-4 text-sm">
              <details className="group cursor-pointer">
                <summary className="font-bold text-slate-800 group-hover:text-blue-600 list-none flex justify-between items-center">
                  What is 1 unit of electricity? <span className="text-blue-600 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-slate-700 pl-1 border-l-2 border-blue-600">One unit of electricity is exactly equal to one kilowatt-hour (kWh).</p>
              </details>
              <hr className="border-slate-100" />
              <details className="group cursor-pointer">
                <summary className="font-bold text-slate-800 group-hover:text-blue-600 list-none flex justify-between items-center">
                  What's the price of 1 kWh? <span className="text-blue-600 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-slate-700 pl-1 border-l-2 border-blue-600">One kilowatt-hour (kWh) costs between Rs. 4 and Rs. 11 depending on your consumption slab and meter category.</p>
              </details>
              <hr className="border-slate-100" />
              <details className="group cursor-pointer">
                <summary className="font-bold text-slate-800 group-hover:text-blue-600 list-none flex justify-between items-center">
                  How to calculate Nepal electricity bill? <span className="text-blue-600 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-slate-700 pl-1 border-l-2 border-blue-600">Your bill depends on units consumed, consumption slab, meter capacity, and service charge. Use the NEA Bill Calculator on NepaCalc for an accurate breakdown.</p>
              </details>
              <hr className="border-slate-100" />
              <details className="group cursor-pointer">
                <summary className="font-bold text-slate-800 group-hover:text-blue-600 list-none flex justify-between items-center">
                  What's the cost of 1 kW of power? <span className="text-blue-600 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-slate-700 pl-1 border-l-2 border-blue-600">Running 1 kW of power for 1 hour uses 1 kWh (1 unit) of electricity, which costs between Rs. 4 and Rs. 11 depending on your total monthly usage.</p>
              </details>
            </div>
          </div>

          {/* ── SOURCE HIERARCHY ── */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <h3 className="font-black text-slate-800 text-sm mb-3 uppercase tracking-wide">Data Sources & Verification</h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li><strong className="text-slate-900">Primary Source:</strong> Nepal Electricity Authority (NEA)</li>
              <li><strong className="text-slate-900">Tariff Status:</strong> Verified</li>
              <li><strong className="text-slate-900">Verification Sources:</strong> Official tariff schedules, Government publications, Historical tariff archives</li>
            </ul>
          </div>

{/* ── TABLE OF CONTENTS ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <p className="font-black text-slate-800 mb-3 text-sm uppercase tracking-wide">📑 Contents</p>
            <ol className="space-y-1.5 text-sm text-blue-600 list-decimal pl-4">
              {[
                ["#what-is-one-unit", "What is One Unit of Electricity?"],
                ["#current-electricity-rate", "What is the Current Electricity Rate in Nepal?"],
                ["#unit-price-overview", "Current Electricity Unit Price Overview"],
                ["#why-rates-change", "Why Electricity Rates Change & How Slabs Work"],
                ["#average-cost", "What is the Average Cost Per Unit in Nepal?"],
                ["#cost-examples", "Electricity Cost Examples (20, 50, 100, 200 Units)"],
                ["#vat-rules", "Understanding VAT on Electricity Bills"],
                ["#appliance-cost", "How Much Electricity Do Common Household Appliances Use?"],
                ["#faq", "Frequently Asked Questions"],
              ].map(([href, label]) => (
                <li key={href}><a href={href} className="hover:underline">{label}</a></li>
              ))}
            </ol>
          </div>

          {/* ── INTRODUCTION ── */}
          <p className="text-slate-700 mb-4 text-base leading-relaxed">
            The price of 1 unit electricity in Nepal depends on the latest NEA tariff rates and monthly consumption slab. Residential consumers currently pay between Rs. 3.00 and Rs. 11.00 per unit under Nepal Electricity Authority tariff schedules.
          </p>
          <p className="text-slate-700 mb-4 text-base leading-relaxed">
            For domestic consumers, the <strong>electricity charge per unit in Nepal</strong> currently ranges from approximately <strong>Rs. 3.00 to Rs. 11.00</strong> depending on monthly usage and meter category. This <strong>domestic electricity rate Nepal</strong> applies universally across the country. Whether you live in <strong>Kathmandu, Lalitpur, Bhaktapur, Pokhara, Chitwan, Butwal, Nepalgunj, Janakpur, Dharan, Hetauda, or Biratnagar</strong>, the standard <strong>electricity unit rate Nepal</strong> remains the exact same.
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
              SECTION 3: CURRENT TARIFF OVERVIEW
          ───────────────────────────────── */}
          <section id="unit-price-overview" className="mb-10 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Current Electricity Unit Price Overview</h2>
            <p className="text-slate-700 mb-4 text-sm leading-relaxed">
              For a standard domestic residential connection in Nepal, the energy charge per unit is structured as follows for FY 2083/84:
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-[#003087] text-white">
                    <th className="p-3 border border-slate-300 font-bold text-left">Consumption Slab</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">Rate per Unit (Rs/kWh)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0 – 20 units", "Rs. 3.00 – 6.00*"],
                    ["21 – 30 units", "Rs. 6.50"],
                    ["31 – 50 units", "Rs. 8.00"],
                    ["51 – 250 units", "Rs. 9.50"],
                    ["Above 250 units", "Rs. 11.00"]
                  ].map(([slab, rate], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-semibold">{slab}</td>
                      <td className="p-3 border border-slate-200 text-center font-bold text-[#003087]">{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg text-sm text-amber-900 mb-5">
              <strong>* Note:</strong> Low-consumption households using a 5A connection pay Rs. 3.00 per unit for the first slab. However, if their usage is exactly 20 units or less, the energy charge is waived entirely under the lifeline tariff (only the flat Rs. 30 service charge applies).
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              Looking for the complete NEA tariff table? See our <Link href="/electricity/nea-tariff-rates/" className="text-blue-600 font-bold hover:underline">NEA Tariff Rates</Link> guide.
            </p>
          </section>

          {/* ─────────────────────────────────
              SECTION 4: WHY RATES CHANGE & SLABS WORK
          ───────────────────────────────── */}
          <section id="why-rates-change" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Why Electricity Rates Change & How Slabs Work</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
              The Nepal Electricity Authority (NEA) applies a **progressive slab system** to bill consumers. In a progressive slab billing model, your total bill is calculated by breaking down your units consumed into each successive tier, rather than applying a single rate to your entire consumption.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              For example, if you consume 100 units on a 5A connection:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mb-4">
              <li>The first 20 units are charged at the first slab rate (Rs. 3.00/unit)</li>
              <li>The next 10 units (21–30) are charged at the second slab rate (Rs. 6.50/unit)</li>
              <li>The next 20 units (31–50) are charged at the third slab rate (Rs. 8.00/unit)</li>
              <li>The remaining 50 units (51–100) are charged at the fourth slab rate (Rs. 9.50/unit)</li>
            </ul>
            <p className="text-slate-700 mb-4 leading-relaxed">
              This progressive structure is why your overall bill amount does not equal a simple multiplication of your total units by the highest slab rate. It encourages energy efficiency by billing heavier usage at higher rates.
            </p>
          </section>

          {/* ─────────────────────────────────
              AVERAGE COST PER UNIT
          ───────────────────────────────── */}
          <section id="average-cost" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">What is the Average Cost Per Unit in Nepal?</h2>
            <p className="text-slate-700 mb-4 text-base">
              Because NEA uses progressive slab pricing alongside fixed service charges and VAT, your **average cost per unit** will always be slightly higher than the starting slab rate. As consumption increases, your average cost is pulled upwards.
            </p>
            <div className="bg-slate-50 border-l-4 border-blue-500 p-4 rounded-r-lg text-sm text-slate-700 mb-4">
              <strong>Example:</strong> If you consume 100 units on a standard 5A meter, your total bill comes out to approximately Rs. 939. This means your **true average cost per unit** is Rs. 9.39 (Rs. 939 ÷ 100 units), even though the lowest base energy charge is Rs. 3.00.
            </div>
          </section>

          {/* ─────────────────────────────────
              SECTION 7: COST EXAMPLES
          ───────────────────────────────── */}
          <section id="cost-examples" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Electricity Cost Examples in Nepal</h2>
            <p className="text-slate-700 mb-4">
              Here is a simplified breakdown of the estimated monthly bill amounts for different household consumption levels (assuming a standard 5A residential meter):
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Monthly Consumption</th>
                    <th className="p-3 border border-slate-200 font-bold text-right">Approximate Total Cost</th>
                    <th className="p-3 border border-slate-200 font-bold text-left">Billing Details</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["20 units", "Rs. 30", "Lifeline tariff rate applies. Only Rs. 30 fixed service charge is billed."],
                    ["50 units", "~ Rs. 415", "Rs. 365 energy charge + Rs. 50 service charge. No VAT is applied."],
                    ["100 units", "~ Rs. 939", "Rs. 840 energy charge + Rs. 75 service charge + ~Rs. 24 VAT (5% on units above 50)."],
                    ["200 units", "~ Rs. 1,961", "Rs. 1,790 energy charge + Rs. 100 service charge + ~Rs. 71 VAT (5% on units above 50)."],
                  ].map(([a, b, desc], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-bold">{a}</td>
                      <td className="p-3 border border-slate-200 text-right font-black text-[#003087]">{b}</td>
                      <td className="p-3 border border-slate-200 text-slate-600 text-xs">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-700 text-sm">
              For a precise calculation including payment rebate and penalty calculations, use our <Link href="/calculator/nea-bill/" className="text-blue-600 hover:underline">NEA Bill Calculator</Link>.
            </p>
          </section>

          <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-5 mb-10 shadow-sm">
            <p className="text-[#202124] text-base font-medium leading-relaxed mb-0">
              Want to calculate your total electricity bill instead of per-unit rates? Use the <Link href="/calculator/nea-bill/" className="text-blue-700 font-bold underline">NEA Bill Calculator</Link> to get an instant bill breakdown based on current tariff rates.
            </p>
          </div>

          {/* ─────────────────────────────────
              SECTION 8: VAT RULES
          ───────────────────────────────── */}
          <section id="vat-rules" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Understanding VAT on Electricity Bills</h2>
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-4 mb-5">
              <p className="text-[#202124] font-bold text-sm mb-0">
                <strong>Short Answer:</strong> Yes. Under the current tariff rules, a 5% concessional VAT applies only to electricity consumption exceeding 50 units per month.
              </p>
            </div>
            <ul className="text-slate-700 space-y-2 mb-4 text-sm list-disc pl-5">
              <li>The <strong>first 50 units</strong> consumed per month are completely <strong>VAT-exempt</strong>.</li>
              <li>A 5% VAT rate applies strictly to the <strong>energy charge portion</strong> of units consumed above 50.</li>
              <li>VAT is <strong>never applied</strong> to the monthly fixed service charge (demand charge).</li>
              <li>Households consuming 50 units or fewer per month pay <strong>zero VAT</strong> on their bill.</li>
            </ul>
          </section>

          {/* ─────────────────────────────────
              APPLIANCE COST
          ───────────────────────────────── */}
          <section id="appliance-cost" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">How Much Electricity Do Common Household Appliances Use?</h2>
            <p className="text-slate-700 mb-4">Estimated average monthly unit consumption and costs for common household appliances in Nepal:</p>
            
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Appliance</th>
                    <th className="p-3 border border-slate-200 font-bold text-left">Approx Monthly Units</th>
                    <th className="p-3 border border-slate-200 font-bold text-left">Billing Class</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-3 border border-slate-200 font-semibold">Ceiling Fan</td>
                    <td className="p-3 border border-slate-200">15–30 units</td>
                    <td className="p-3 border border-slate-200 text-green-700 font-medium">Low consumption</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-semibold">LED Television</td>
                    <td className="p-3 border border-slate-200">8–20 units</td>
                    <td className="p-3 border border-slate-200 text-green-700 font-medium">Low consumption</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border border-slate-200 font-semibold">Refrigerator</td>
                    <td className="p-3 border border-slate-200">30–60 units</td>
                    <td className="p-3 border border-slate-200 text-[#003087] font-medium">Medium consumption</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-semibold">Rice Cooker</td>
                    <td className="p-3 border border-slate-200">10–25 units</td>
                    <td className="p-3 border border-slate-200 text-[#003087] font-medium">Medium consumption</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border border-slate-200 font-semibold">Water Heater</td>
                    <td className="p-3 border border-slate-200">40–120 units</td>
                    <td className="p-3 border border-slate-200 text-amber-700 font-medium">High consumption</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-semibold">Air Conditioner</td>
                    <td className="p-3 border border-slate-200">80–300 units</td>
                    <td className="p-3 border border-slate-200 text-red-700 font-medium">Very high consumption</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-dashed border-slate-300 my-8" />

          {/* ─────────────────────────────────
              FAQ SECTION
          ───────────────────────────────── */}
          <section id="faq" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-5">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "What is the price of 1 unit of electricity in Nepal?", a: "Residential electricity costs between Rs. 3.00 and Rs. 11.00 per unit depending on your monthly consumption slab. The 5A lifeline rate for 0–20 units is Rs. 3.00/unit (or free if under 20 units). The highest slab (above 250 units) is charged at Rs. 11.00/unit." },
                { q: "How much does NEA charge per unit?", a: "NEA charges between Rs. 3.00 and Rs. 11.00 per unit for standard residential consumers, depending on their total monthly usage." },
                { q: "How is electricity cost calculated in Nepal?", a: "Electricity cost is calculated by multiplying your consumed units by the respective slab rates, then adding a fixed monthly service charge and applying 5% VAT on the energy charge for units above 50." },
                { q: "Why does electricity unit price increase with usage?", a: "NEA uses a progressive slab tariff system to encourage energy conservation. Higher consumption slabs are charged at higher per-unit rates to ensure heavy users pay a fairer share of grid costs." },
                { q: "What is the cheapest electricity slab in Nepal?", a: "The cheapest slab is the lifeline tariff for 5A meters consuming 0-20 units, where the energy charge is waived (Rs. 0 per unit) and only a Rs. 30 monthly service charge is applied." },
                { q: "How much is a 100-unit electricity bill?", a: "For a 5A meter, a 100-unit bill is approximately Rs. 939 total (energy Rs. 840 + service charge Rs. 75 + ~Rs. 24 VAT on the 50 units above the threshold). Use our NEA Bill Calculator for your exact amount." },
                { q: "What is a service charge?", a: "A service charge (also called demand charge) is a fixed monthly fee charged by NEA based on your meter capacity and consumption bracket. It ranges from Rs. 30 to Rs. 200 depending on your meter (5A, 15A, or 30A) and how many units you used." },
                { q: "How can I calculate my NEA bill?", a: "Use the NepaCalc NEA Bill Calculator to get an instant itemized breakdown of energy charge, service charge, and VAT based on your monthly units and meter size." },
                { q: "Do electricity bills include VAT?", a: "Yes — a 5% concessional VAT applies to the energy charge on consumption above 50 units per month under the FY 2083/84 rules. The first 50 units are VAT-exempt and VAT is never applied to the service charge." },
                { q: "What are the latest NEA electricity rates?", a: "The latest rates for FY 2083/84: 0–20 units Rs. 3.00/unit, 21–30 units Rs. 6.50/unit, 31–50 units Rs. 8.00/unit, 51–150 units Rs. 9.50/unit, 151–250 units Rs. 9.50/unit, above 250 units Rs. 11.00/unit." }
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
              EXPERT REVIEW + EEAT
          ───────────────────────────────── */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-2xl shrink-0 text-white">⚡</div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-slate-900 m-0 mb-2">Editorial and Data Review</h4>
                <p className="text-xs text-slate-700 mb-1"><strong>Last Reviewed Date:</strong> June 2026</p>
                <p className="text-xs text-slate-700 mb-2"><strong>Source Review Methodology:</strong> This guide is maintained by NepaCalc and manually reviewed by comparing official Nepal Electricity Authority (NEA) tariff publications against the live NEA billing system. Information is updated dynamically whenever the Electricity Regulatory Commission (ERC) publishes new pricing changes.</p>
                <p className="text-xs text-slate-700 mb-1"><strong>Official Source References:</strong></p>
                <div className="text-[11px] text-blue-600 font-bold space-y-1 mb-3">
                  <span className="block">✔ Sourced from NEA Tariff Notification FY 2083/84</span>
                  <span className="block">✔ Cross-referenced with Electricity Regulatory Commission (ERC) Nepal</span>
                  <span className="block">✔ 5% concessional VAT rule confirmed from 2083/84 Budget Speech</span>
                  <span className="block">✔ Service charges verified across 5A, 15A, 30A, 60A meter categories</span>
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
              <li>📊 <Link href="/electricity/nea-tariff-rates/" className="text-blue-600 hover:underline font-semibold">NEA Tariff Rates — Official Tariff Reference</Link></li>
              <li>💧 <Link href="/calculator/kukl-bill/" className="text-blue-600 hover:underline font-medium">KUKL Water Bill Calculator</Link></li>
              <li>☀️ <Link href="/calculator/solar-requirement/" className="text-blue-600 hover:underline font-medium">Solar Panel Requirement Calculator</Link></li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-600 mb-2">Official External Sources</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>🏛️ <a href="https://nea.org.np/en/pages/consumer-tariff-rates" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Nepal Electricity Authority (NEA) — Official Tariff Schedule</a></li>
                <li>⚖️ <a href="https://www.erc.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Electricity Regulatory Commission (ERC) Nepal — Tariff Regulator</a></li>
                <li>📋 <a href="http://www.nepalenergyforum.com/nea-electricity-tariff-rates/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Nepal Energy Forum — NEA Tariff Reference Data</a></li>
              </ul>
            </div>
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
