import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "1 Unit Electricity Price in Nepal (Latest NEA Rates & Cost Per Unit Guide)",
  description: "Discover the latest 1 unit electricity price in Nepal. Learn NEA slab rates, service charges, VAT rules, and how electricity costs are calculated for domestic connections.",
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
    "electricity bill rate nepal",
    "domestic electricity tariff nepal",
    "electricity price per kWh nepal",
    "latest electricity rates nepal",
    "current electricity rate nepal",
    "electricity charge per unit",
    "nea unit rate",
    "price of 1 unit electricity in nepal 2083",
    "electricity charge per unit in nepal",
    "electricity bill per unit in nepal",
    "per unit electricity price for home",
    "domestic line per unit price",
    "electricity cost in nepal"
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
        "acceptedAnswer": { "@type": "Answer", "text": "Residential electricity currently costs approximately Rs. 3.00 to Rs. 11.00 per unit depending on monthly consumption. Lower-consuming households pay lower rates while higher consumption is charged at higher slab rates." }
      },
      {
        "@type": "Question",
        "name": "How much does 100 units of electricity cost in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "The exact amount depends on slab rates, service charges, VAT, and meter category. For a 5A meter, a 100-unit bill is roughly Rs. 939." }
      },
      {
        "@type": "Question",
        "name": "What are the latest NEA electricity rates?",
        "acceptedAnswer": { "@type": "Answer", "text": "The latest NEA residential electricity rates range from Rs. 3.00/unit (0-20 units) to Rs. 11.00/unit (above 251 units), plus fixed monthly service charges based on meter amperage." }
      },
      {
        "@type": "Question",
        "name": "How is electricity billed in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Electricity bills in Nepal are calculated using a progressive slab system. Your total bill consists of energy charges, a fixed service charge, electricity duty, and applicable VAT." }
      },
      {
        "@type": "Question",
        "name": "What is a service charge on an electricity bill?",
        "acceptedAnswer": { "@type": "Answer", "text": "A service charge is a fixed monthly fee charged according to your meter capacity (e.g., 5A, 15A, 30A) and your consumption bracket." }
      },
      {
        "@type": "Question",
        "name": "Do electricity rates vary by meter capacity?",
        "acceptedAnswer": { "@type": "Answer", "text": "The per-unit energy rate is the same across meter categories, but the fixed monthly service charge increases with larger meter capacities (e.g., 30A pays more than 5A)." }
      },
      {
        "@type": "Question",
        "name": "Is VAT charged on electricity bills in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Applicable VAT depends on current government regulations. Currently, a 5% concessional VAT is applied to the energy charge on consumption exceeding 50 units per month." }
      },
      {
        "@type": "Question",
        "name": "How can I calculate my NEA electricity bill?",
        "acceptedAnswer": { "@type": "Answer", "text": "You can use the NepaCalc NEA Bill Calculator to instantly estimate your total bill, including all slab calculations, service charges, and VAT." }
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
            <span className="text-slate-700">Electricity Guides</span>
            <span>›</span>
            <span className="text-slate-700 font-medium">1 Unit Electricity Price in Nepal</span>
          </nav>

          {/* ── H1 ── */}
          <h1 className="text-3xl font-black text-[#202124] mb-4 leading-tight">
            1 Unit Electricity Price in Nepal<br />
            <span className="text-[#1A73E8]">(Latest NEA Rates &amp; Cost Per Unit Guide)</span>
          </h1>

          {/* ── QUICK ANSWER BOX (AI Overview magnet) ── */}
          <div className="quick-answer bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-5 mb-5">
            <p className="text-[#1A73E8] font-black text-sm mb-1 uppercase tracking-wide">⚡ Quick Answer</p>
            <p className="text-[#202124] text-base font-medium leading-relaxed mb-0">
              The price of <strong>1 unit of electricity in Nepal</strong> ranges from approximately <strong>Rs. 3.00 to Rs. 11.00 per unit</strong> depending on monthly consumption and meter capacity. Domestic electricity customers are billed using a progressive slab system regulated by the <strong>Nepal Electricity Authority (NEA)</strong>.
            </p>
          </div>

          {/* ── KEY TAKEAWAYS (summary-box) ── */}
          <div className="summary-box bg-white border border-slate-200 rounded-xl p-5 mb-7 shadow-sm">
            <p className="font-black text-slate-800 text-sm mb-3 uppercase tracking-wide">📋 Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-4">
              <li>Lowest residential rate: <strong>Rs. 3.00 per unit</strong></li>
              <li>Highest residential rate: <strong>Rs. 11.00 per unit</strong></li>
              <li>Rates depend on consumption slabs</li>
              <li>Service charge applies separately</li>
              <li>VAT rules may apply depending on usage</li>
              <li>Use the <Link href="/calculator/nea-bill/" className="text-blue-600 underline font-semibold">NEA Bill Calculator</Link> to estimate your bill</li>
            </ul>
          </div>

          {/* ── TABLE OF CONTENTS ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <p className="font-black text-slate-800 mb-3 text-sm uppercase tracking-wide">📑 Table of Contents</p>
            <ul className="space-y-1.5 text-sm text-blue-600 list-none">
              {[
                ["#hub", "NEA Electricity Information Hub"],
                ["#what-is-price", "What Is the Price of 1 Unit Electricity in Nepal?"],
                ["#official-table", "Official Domestic Electricity Rate Table"],
                ["#examples", "Electricity Cost Examples"],
                ["#why-higher", "Why Your Electricity Bill Is Higher Than Unit Price"],
                ["#how-nea-determines", "How NEA Determines Electricity Rates"],
                ["#has-price-changed", "Has Electricity Unit Price Changed in 2083/84?"],
                ["#differ-across-nepal", "Does Electricity Cost Differ Across Nepal?"],
                ["#how-to-calculate", "How to Calculate Your Electricity Bill"],
                ["#paa", "People Also Ask (FAQ)"],
              ].map(([href, label]) => (
                <li key={href}><a href={href} className="hover:underline">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* ── NEA ELECTRICITY INFORMATION HUB ── */}
          <section id="hub" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">NEA Electricity Information Hub</h2>
            <div className="bg-[#003087] rounded-xl p-5 shadow-sm text-white">
              <p className="text-sm font-semibold mb-3">Explore our related resources:</p>
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
          </section>

          {/* ── WHAT IS THE PRICE ── */}
          <section id="what-is-price" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">What Is the Price of 1 Unit Electricity in Nepal?</h2>
            <p className="text-slate-700 mb-4 text-base leading-relaxed">
              If you are searching for the current <strong>electricity unit price in Nepal</strong>, it is important to understand that Nepal does not use a fixed flat electricity rate. Instead, the <strong>Nepal Electricity Authority (NEA)</strong> applies a <strong>progressive slab tariff system</strong> where the cost per unit increases as your total consumption rises.
            </p>
            <p className="text-slate-700 mb-4 text-base leading-relaxed">
              Residential consumers currently pay between <strong>Rs. 3.00 to Rs. 11.00 per unit</strong> depending on their monthly usage.
            </p>
          </section>

          {/* ── OFFICIAL TARIFF TABLE ── */}
          <section id="official-table" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Official Domestic Electricity Rate Table</h2>
            <p className="text-slate-700 mb-4">The following table outlines the current residential electricity tariff rates set by the Nepal Government electricity tariff regulations.</p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-[#003087] text-white">
                    <th className="p-3 border border-slate-300 font-bold text-left">Consumption (Units)</th>
                    <th className="p-3 border border-slate-300 font-bold text-center">Energy Rate (Rs/Unit)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0 – 20", "Rs. 3.00"],
                    ["21 – 30", "Rs. 6.50"],
                    ["31 – 50", "Rs. 8.00"],
                    ["51 – 150", "Rs. 9.50"],
                    ["151 – 250", "Rs. 9.50"],
                    ["Above 250", "Rs. 11.00"],
                  ].map(([a, b], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-3 border border-slate-200 font-semibold">{a}</td>
                      <td className="p-3 border border-slate-200 text-center font-bold text-[#003087]">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── COST EXAMPLES ── */}
          <section id="examples" className="mb-10">
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
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#202124] mb-2">Cost of 20 Units</h3>
                <p className="text-slate-700 text-sm">A 20-unit bill for a 5A meter generally qualifies for the lifeline rate, where only the minimum service charge of Rs. 30 is billed.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#202124] mb-2">Cost of 50 Units</h3>
                <p className="text-slate-700 text-sm">A 50-unit bill is charged progressively: first 20 units at Rs. 3.00, next 10 units at Rs. 6.50, and remaining 20 units at Rs. 8.00, plus a Rs. 50 service charge.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#202124] mb-2">Cost of 100 Units</h3>
                <p className="text-slate-700 text-sm">A 100-unit bill crosses into the Rs. 9.50/unit slab and triggers a 5% VAT on the usage above 50 units, along with a Rs. 75 service charge.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#202124] mb-2">Cost of 150 Units</h3>
                <p className="text-slate-700 text-sm">A 150-unit bill accumulates charges from all lower slabs, adding 100 units billed at Rs. 9.50 each, plus service charges and VAT.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#202124] mb-2">Cost of 200 &amp; 250 Units</h3>
                <p className="text-slate-700 text-sm">Consumers using 200 to 250 units pay significantly higher total charges due to progressive slab pricing. The average cost per unit increases as consumption rises.</p>
              </div>
            </div>
          </section>

          {/* ── WHY IS YOUR BILL HIGHER ── */}
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

          {/* ── HOW NEA DETERMINES RATES ── */}
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

          {/* ── PRICE HISTORY ── */}
          <section id="has-price-changed" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Has Electricity Unit Price Changed in 2083/84?</h2>
            <p className="text-slate-700 mb-4">Google and consumers value historical context. Here is how the basic residential rates compare across recent fiscal years.</p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-3 border border-slate-200 font-bold text-left">Fiscal Year</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Lowest Rate</th>
                    <th className="p-3 border border-slate-200 font-bold text-center">Highest Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">2082/83</td><td className="p-3 border border-slate-200 text-center">Rs. 3.00</td><td className="p-3 border border-slate-200 text-center">Rs. 11.00</td></tr>
                  <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-bold text-blue-800">2083/84</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 3.00</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 11.00</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-700 text-sm">While the base <strong>per unit electricity price for home</strong> usage remained stable, the primary change in 2083/84 was the introduction of a 5% concessional VAT on usage above 50 units.</p>
          </section>

          {/* ── DIFFER ACROSS NEPAL ── */}
          <section id="differ-across-nepal" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Does Electricity Cost Differ Across Nepal?</h2>
            <p className="text-slate-700 mb-4 text-base leading-relaxed">
              Residential electricity tariffs are regulated nationally by the <strong>Nepal Electricity Authority (NEA)</strong>. Customers in <strong>Kathmandu, Lalitpur, Bhaktapur, Pokhara, Biratnagar, Butwal, Nepalgunj, Dharan</strong> and other cities generally follow the exact same domestic tariff structure. There is no regional variation for the standard residential per unit cost.
            </p>
          </section>

          {/* ── HOW TO CALCULATE ── */}
          <section id="how-to-calculate" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-4">How to Calculate Your Electricity Bill</h2>
            <p className="text-slate-700 mb-4 text-base">
              The easiest way to determine your exact costs, without doing complex progressive slab math or figuring out VAT thresholds, is to use an automated tool.
            </p>
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-6 text-center">
              <p className="text-[#202124] font-black text-lg mb-3">Calculate Your Exact Bill Instantly</p>
              <Link href="/calculator/nea-bill/" className="inline-block bg-[#1A73E8] hover:bg-[#1557b0] text-white font-black px-8 py-4 rounded-xl transition-colors shadow-md">
                👉 Use Our NEA Bill Calculator
              </Link>
            </div>
          </section>

          <hr className="border-dashed border-slate-300 my-8" />

          {/* ── PAA / FAQ ── */}
          <section id="paa" className="mb-10">
            <h2 className="text-2xl font-black text-[#202124] mb-5">People Also Ask</h2>
            <div className="space-y-4">
              {[
                { q: "What is the price of 1 unit of electricity in Nepal?", a: "Residential electricity currently costs approximately Rs. 3.00 to Rs. 11.00 per unit depending on monthly consumption. Lower-consuming households pay lower rates while higher consumption is charged at higher slab rates." },
                { q: "How much does 100 units of electricity cost in Nepal?", a: "The exact amount depends on slab rates, service charges, VAT, and meter category. For a 5A meter, a 100-unit bill is roughly Rs. 939." },
                { q: "What are the latest NEA electricity rates?", a: "The latest NEA residential electricity rates range from Rs. 3.00/unit (0-20 units) to Rs. 11.00/unit (above 251 units), plus fixed monthly service charges based on meter amperage." },
                { q: "How is electricity billed in Nepal?", a: "Electricity bills in Nepal are calculated using a progressive slab system. Your total bill consists of energy charges, a fixed service charge, electricity duty, and applicable VAT." },
                { q: "What is a service charge on an electricity bill?", a: "A service charge is a fixed monthly fee charged according to your meter capacity (e.g., 5A, 15A, 30A) and your consumption bracket." },
                { q: "Do electricity rates vary by meter capacity?", a: "The per-unit energy rate is the same across meter categories, but the fixed monthly service charge increases with larger meter capacities (e.g., 30A pays more than 5A)." },
                { q: "Is VAT charged on electricity bills in Nepal?", a: "Applicable VAT depends on current government regulations. Currently, a 5% concessional VAT is applied to the energy charge on consumption exceeding 50 units per month." },
                { q: "How can I calculate my NEA electricity bill?", a: "You can use the NepaCalc NEA Bill Calculator to instantly estimate your total bill, including all slab calculations, service charges, and VAT." }
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

          {/* ── EDITORIAL REVIEW ── */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 mt-10">
            <h4 className="text-sm font-black text-slate-900 m-0 mb-3">Editorial &amp; Data Review</h4>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              This guide is maintained by NepaCalc and reviewed using official Nepal Electricity Authority (NEA) tariff publications and billing documentation. Tariff information is updated whenever the Electricity Regulatory Commission (ERC) or NEA publishes new residential pricing changes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-bold text-slate-800 mb-1">Status</p>
                <p className="text-slate-600">Last Reviewed: June 2026</p>
              </div>
              <div>
                <p className="font-bold text-slate-800 mb-1">Sources Reviewed:</p>
                <ul className="text-slate-600 space-y-1">
                  <li>• <a href="https://www.nea.org.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Nepal Electricity Authority</a></li>
                  <li>• Electricity Regulatory Commission Nepal</li>
                  <li>• <a href="https://www.neabilling.com" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">NEA Billing Portal</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── CHANGE LOG ── */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h4 className="text-sm font-black text-slate-900 m-0 mb-4">Tariff Update History</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-2 text-left text-slate-500 font-semibold w-1/4">Date</th>
                    <th className="py-2 text-left text-slate-500 font-semibold">Change</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-100">
                    <td className="py-3 font-medium">FY 2083/84</td>
                    <td className="py-3">5% VAT introduced above threshold</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 font-medium">FY 2082/83</td>
                    <td className="py-3">Previous residential rates</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-400">Future Updates</td>
                    <td className="py-3 text-slate-400">Will be added here</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
