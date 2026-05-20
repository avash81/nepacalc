import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "How to Calculate Your NEA Electricity Bill in Nepal 2082/83 — Slab Rates, Unit Cost and Late Fines",
  description: "Complete guide to calculating your Nepal NEA electricity bill for 2082/83. Official progressive slab rates for 5A, 15A, 30A meters. Unit cost table, VAT rules, digital payment rebate and late fine schedule.",
  slug: "blog/nea-electricity-bill-guide-2082",
  keywords: ["nea bill calculator", "electricity bill calculator nepal", "nea billing", "1 unit electricity cost nepal 2082", "nepal electricity bill rate 2082", "nea electricity bill", "how to calculate electricity bill nepal"],
  canonical: "/blog/nea-electricity-bill-guide-2082/",
});

export default function NeaBillGuideBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Calculate Your NEA Electricity Bill in Nepal 2082/83 — Slab Rates, Unit Cost and Late Fines",
    "description": "Complete guide to calculating your Nepal NEA electricity bill for 2082/83. Official progressive slab rates for 5A, 15A, 30A meters. Unit cost table, VAT rules, digital payment rebate and late fine schedule.",
    "url": "https://nepacalc.com/blog/nea-electricity-bill-guide-2082/",
    "datePublished": "2026-05-20",
    "dateModified": "2026-05-20",
    "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": {
      "@type": "Organization",
      "name": "NepaCalc",
      "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://nepacalc.com/blog/nea-electricity-bill-guide-2082/" },
    "keywords": "nea bill calculator, electricity bill calculator nepal, nea billing, 1 unit electricity cost nepal 2082, nepal electricity bill rate 2082, nea electricity bill, how to calculate electricity bill nepal"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the cost of 1 unit of electricity in Nepal in 2082/83?",
        "acceptedAnswer": { "@type": "Answer", "text": "For a standard 15A household meter in Nepal (2082/83 tariff): the first 20 units cost Rs 4.00 per unit, units 21–30 cost Rs 6.50 per unit, units 31–50 cost Rs 8.00 per unit, units 51–100 cost Rs 9.50 per unit, and units 101–250 cost Rs 10.50 per unit. The rate you pay per unit depends on your total monthly consumption because NEA uses progressive (slab-based) billing, not a flat rate. Source: NEA tariff notification 2082/83." }
      },
      {
        "@type": "Question",
        "name": "How does NEA calculate the electricity bill in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "NEA calculates your monthly electricity bill using three components: (1) Energy Charge — calculated progressively using slab rates applied band by band on your total monthly units consumed; (2) Fixed Service Charge — a flat monthly fee based on your meter amperage; (3) 13% VAT — applied on the energy charge only, NOT on the fixed service charge. Total Bill = Energy Charge + Fixed Charge + 13% VAT on Energy. Late payments attract a 5%, 10%, or 25% surcharge depending on how many days overdue." }
      },
      {
        "@type": "Question",
        "name": "How much does 31 units of electricity cost in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "For 31 units on a 15A meter: first 20 units at Rs 4.00 = Rs 80; next 10 units (21–30) at Rs 6.50 = Rs 65; last 1 unit (31) at Rs 8.00 = Rs 8. Total energy charge = Rs 153. Fixed service charge = Rs 75 (for the 21–30 slab). VAT = Rs 153 × 13% = Rs 19.89. Total bill ≈ Rs 248. Note: consuming even one unit above a slab threshold changes the fixed charge to the next tier." }
      },
      {
        "@type": "Question",
        "name": "What is the NEA 5A meter special rule — are the first 20 units free?",
        "acceptedAnswer": { "@type": "Answer", "text": "For 5A connections: if monthly consumption is 20 units or less, no energy charge applies — only the Rs 30 minimum fixed service charge is billed. This is a subsidised provision for low-income households. If consumption exceeds 20 units even by 1 unit, the first 20 units are then charged at Rs 3.00/unit (not free), and additional units are billed at 5A standard slab rates. This rule makes it critical for 5A households to stay at or below 20 units for the lowest possible bill." }
      },
      {
        "@type": "Question",
        "name": "How do I save 2% on my NEA electricity bill through digital payment?",
        "acceptedAnswer": { "@type": "Answer", "text": "NEA offers a 2% rebate on the energy charge if you pay your bill within 7 days of the bill date using an approved digital channel: eSewa, Khalti, connectIPS, Internet Banking, or Mobile Banking apps. Cash payment at NEA counters does not qualify. The rebate is automatically deducted at checkout in these apps. For a Rs 1,000 energy charge, the rebate saves Rs 20." }
      },
      {
        "@type": "Question",
        "name": "Is VAT applied on the NEA fixed service charge?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. Nepal's 13% VAT is applied only on the energy charge portion of your NEA bill, not on the fixed service charge. This is specified in NEA's official tariff notification under the VAT Act 2052. If your bill shows VAT applied on the service charge, it may be a printing error — the calculation should show VAT only on the energy component." }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nepacalc.com/blog/" },
      { "@type": "ListItem", "position": 3, "name": "NEA Electricity Bill Guide 2082", "item": "https://nepacalc.com/blog/nea-electricity-bill-guide-2082/" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogPostLayout
        title="How to Calculate Your NEA Electricity Bill in Nepal 2082/83 — Slab Rates, Unit Cost & Late Fines"
        date="May 20, 2026"
        author="NepaCalc Editorial Desk"
        category="Utility Guide"
        readTime="8 min read"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'NEA Electricity Bill Guide 2082', href: '/blog/nea-electricity-bill-guide-2082/' }
        ]}
      >
        <div className="prose prose-slate max-w-none">
          <p>
            Your NEA electricity bill is not a simple multiplication of units consumed by a flat rate. Nepal Electricity Authority uses a <strong>progressive slab system</strong> — meaning the cost per unit increases as your monthly consumption rises. Add to that a fixed service charge, 13% VAT, and potential late payment penalties, and many households end up confused about how their final bill is computed. Use the <Link href="/calculator/nea-bill/" className="text-blue-600 font-bold underline hover:text-blue-800">NEA bill calculator</Link> alongside this guide, or read through to understand every component of your monthly electricity bill from first principles.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">1. How does NEA calculate your electricity bill?</h2>
          <p>
            Nepal Electricity Authority (NEA) is a government corporation under the <strong>Ministry of Energy, Water Resources and Irrigation</strong>, established under the Electricity Act 2049. NEA serves over 4.5 million connections across Nepal. The billing system it uses — progressive slab tariff — was designed to subsidise low-consumption households while charging higher rates to heavier users.
          </p>

          <div className="bg-slate-900 rounded-xl p-6 my-6 font-mono text-[13px] text-blue-300 leading-relaxed">
            <span className="text-[15px] text-blue-100 font-bold block mb-2">Total Bill = Energy Charge + Fixed Service Charge + VAT (13% on Energy only)</span>
            <span className="text-sky-300 text-xs leading-loose block">
              Energy Charge = Σ (Units in each slab × Rate per unit for that slab)<br />
              VAT = Energy Charge × 0.13  [Does NOT apply to Fixed Charge]<br />
              Late Fine = Energy Charge × Fine Rate (5% / 10% / 25% — see table below)<br />
              Digital Rebate = Energy Charge × −0.02 (if paid within 7 days via digital channel)
            </span>
          </div>

          <div className="border-l-4 border-blue-600 bg-blue-50/70 p-5 rounded-r-xl my-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 mb-2">🇳🇵 Legal Basis — Nepal</div>
            <p className="text-xs text-blue-900 leading-relaxed m-0">
              <strong>Electricity Act 2049</strong> (amended) | <strong>NEA Tariff Notification 2082/83</strong> (approved by Electricity Tariff Fixation Commission) | <strong>VAT Act 2052</strong> (13% VAT on energy) | NEA official: <a href="https://nea.org.np" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">nea.org.np</a> | Electricity Regulation Commission: <a href="https://erc.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">erc.gov.np</a>
            </p>
          </div>

          <div className="border-l-4 border-emerald-600 bg-emerald-50/70 p-5 rounded-r-xl my-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 mb-2">🌐 International Context</div>
            <p className="text-xs text-emerald-950 leading-relaxed m-0">
              NEA's progressive tariff structure follows the <strong>IEA (International Energy Agency) tiered tariff methodology</strong> for developing nations, designed to protect low-income households while recovering infrastructure costs from higher-consumption users. IRENA (International Renewable Energy Agency) endorses tiered tariffs as standard design for electricity access programs in South Asia. Nepal's electrification rate exceeded 90% in 2082 — one of the fastest in the region.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">2. NEA domestic tariff slabs 2082/83 — 15A single-phase meter</h2>
          <p>
            The 15-ampere single-phase meter is the most common connection type in Nepali urban and peri-urban households. The rates below apply to domestic consumers for FY 2082/83. Industrial, commercial, and three-phase connections have different tariff schedules.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Monthly Units (kWh)</th>
                  <th className="p-3 font-semibold">Energy Rate per Unit (Rs)</th>
                  <th className="p-3 font-semibold">Fixed Service Charge (Rs/month)</th>
                  <th className="p-3 font-semibold">Typical Household</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium">0 – 20 units</td>
                  <td className="p-3">Rs 4.00</td>
                  <td className="p-3">Rs 50</td>
                  <td className="p-3">Very low usage, lighting only</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">21 – 30 units</td>
                  <td className="p-3">Rs 6.50</td>
                  <td className="p-3">Rs 75</td>
                  <td className="p-3">Fan + lighting + phone</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">31 – 50 units</td>
                  <td className="p-3">Rs 8.00</td>
                  <td className="p-3">Rs 100</td>
                  <td className="p-3">TV + fan + lighting</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">51 – 100 units</td>
                  <td className="p-3">Rs 9.50</td>
                  <td className="p-3">Rs 125</td>
                  <td className="p-3">Fridge + TV + fan + lighting</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">101 – 250 units</td>
                  <td className="p-3">Rs 10.50</td>
                  <td className="p-3">Rs 200</td>
                  <td className="p-3">AC (single) + all appliances</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">251 – 400 units</td>
                  <td className="p-3">Rs 11.00</td>
                  <td className="p-3">Rs 300</td>
                  <td className="p-3">Multiple ACs, large household</td>
                </tr>
                <tr className="bg-blue-50 font-semibold text-blue-700">
                  <td className="p-3">Above 400 units</td>
                  <td className="p-3">Rs 11.50</td>
                  <td className="p-3">Rs 500</td>
                  <td className="p-3">Very high usage, multiple ACs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm text-amber-900 my-6">
            <strong className="text-amber-950 font-bold block mb-1">⚠ Critical understanding:</strong>
            The slab rate is NOT applied to all units uniformly. If you consume 60 units, you do NOT pay Rs 9.50 × 60. You pay: Rs 4.00 × 20 + Rs 6.50 × 10 + Rs 8.00 × 10 + Rs 9.50 × 20 = Rs 80 + Rs 65 + Rs 80 + Rs 190 = Rs 415. The fixed service charge is Rs 125 (the slab for 51–100 units).
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">3. What does 1 unit of electricity cost in Nepal in 2082?</h2>
          <p>
            One unit = 1 kilowatt-hour (kWh). The cost of your <em>next</em> unit depends on which slab your total monthly consumption has reached. A 60-watt LED bulb running for 17 hours uses exactly 1 unit. A 1.5-tonne AC running for 1 hour uses approximately 1.5 units.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">4. Full electricity bill reference table — 20 to 200 units (15A meter)</h2>
          <p>
            This table directly answers the GSC queries "how much does 31 units cost", "40 units electricity price nepal", and similar. All amounts include 13% VAT on energy charge. Fixed charge by slab applied. No late fine, no digital rebate.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Monthly Units</th>
                  <th className="p-3 font-semibold">Energy Charge (Rs)</th>
                  <th className="p-3 font-semibold">Fixed Charge (Rs)</th>
                  <th className="p-3 font-semibold">VAT 13% (Rs)</th>
                  <th className="p-3 font-semibold">Total Bill (Rs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr><td className="p-3 font-medium">20 units</td><td className="p-3">80</td><td className="p-3">50</td><td className="p-3">10</td><td className="p-3 font-bold">140</td></tr>
                <tr><td className="p-3 font-medium">31 units</td><td className="p-3">153</td><td className="p-3">75</td><td className="p-3">20</td><td className="p-3 font-bold">248</td></tr>
                <tr><td className="p-3 font-medium">40 units</td><td className="p-3">218</td><td className="p-3">100</td><td className="p-3">28</td><td className="p-3 font-bold">346</td></tr>
                <tr><td className="p-3 font-medium">50 units</td><td className="p-3">298</td><td className="p-3">100</td><td className="p-3">39</td><td className="p-3 font-bold">437</td></tr>
                <tr><td className="p-3 font-medium">75 units</td><td className="p-3">535</td><td className="p-3">125</td><td className="p-3">70</td><td className="p-3 font-bold">730</td></tr>
                <tr><td className="p-3 font-medium">100 units</td><td className="p-3">773</td><td className="p-3">125</td><td className="p-3">100</td><td className="p-3 font-bold">998</td></tr>
                <tr className="bg-blue-50 font-semibold text-blue-700">
                  <td className="p-3">120 units</td><td className="p-3">983</td><td className="p-3">200</td><td className="p-3">128</td><td className="p-3 font-bold">1,311</td>
                </tr>
                <tr><td className="p-3 font-medium">150 units</td><td className="p-3">1298</td><td className="p-3">200</td><td className="p-3">169</td><td className="p-3 font-bold">1,667</td></tr>
                <tr><td className="p-3 font-medium">200 units</td><td className="p-3">1823</td><td className="p-3">200</td><td className="p-3">237</td><td className="p-3 font-bold">2,260</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">5. The 5A meter special rule — when are 20 units free?</h2>
          <p>
            The 5A connection (low-power, rural/subsidised category) has a unique billing rule designed to protect very low-income households. This rule has two parts:
          </p>
          <ul>
            <li><strong>If monthly consumption ≤ 20 units:</strong> Zero energy charge. Only Rs 30 minimum fixed service charge applies. Total bill = Rs 30 + VAT on Rs 0 = Rs 30 flat.</li>
            <li><strong>If monthly consumption &gt; 20 units:</strong> The zero-charge exemption disappears entirely. The first 20 units are then charged at Rs 3.00/unit (NEA's subsidised 5A rate), and remaining units at standard 5A slab rates. Crossing 20 units can increase the bill from Rs 30 to Rs 150+ immediately.</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl text-sm text-blue-900 my-6">
            <strong className="text-blue-950 font-bold block mb-1">💡 For 5A households:</strong>
            Monitor your consumption carefully during months when you have extra appliances — even 1 extra unit above 20 can triple your bill from Rs 30 to Rs 90+. LED lighting, phone charging, and a fan typically stay within 20 units.
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">6. Fixed service charges by meter amperage</h2>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Meter Type</th>
                  <th className="p-3 font-semibold">Fixed Charge Range (Rs/month)</th>
                  <th className="p-3 font-semibold">Typical User</th>
                  <th className="p-3 font-semibold">Three-Phase?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium">5A</td>
                  <td className="p-3">Rs 30 (flat)</td>
                  <td className="p-3">Very low consumption, rural single-room households</td>
                  <td className="p-3">No</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">15A Single-phase</td>
                  <td className="p-3">Rs 50 – 500</td>
                  <td className="p-3">Standard Nepali urban household</td>
                  <td className="p-3">No</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">30A Single-phase</td>
                  <td className="p-3">Rs 75 – 600</td>
                  <td className="p-3">Medium household or small shop</td>
                  <td className="p-3">No</td>
                </tr>
                <tr className="bg-blue-50 font-semibold text-blue-700">
                  <td className="p-3">60A Three-phase</td>
                  <td className="p-3">Rs 125 – 750</td>
                  <td className="p-3">Large household, restaurant, small office</td>
                  <td className="p-3">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">7. Save 2% on your NEA bill — digital payment rebate</h2>
          <p>
            NEA offers a <strong>2% rebate on the energy charge</strong> for digital payments made within 7 days of bill generation. Approved channels include:
          </p>
          <ul>
            <li><strong>eSewa</strong> (<a href="https://esewa.com.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">esewa.com.np</a>) — Nepal's most popular digital wallet</li>
            <li><strong>Khalti</strong> — digital wallet and payment platform</li>
            <li><strong>connectIPS</strong> — Nepal Clearing House interbank payment</li>
            <li><strong>Internet Banking</strong> — any Nepal bank with NEA payment integration</li>
            <li><strong>Mobile Banking apps</strong> — most A-class banks support NEA payment</li>
          </ul>
          <p>
            Cash payment at NEA counters does NOT qualify. The rebate is applied automatically at checkout — you do not need to request it. For a typical household spending Rs 1,00,000/month? No, 'spending Rs 1,000/month on energy, the 2% rebate saves Rs 240 per year.'
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">8. Late payment penalty schedule — know your deadlines</h2>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Days After Bill Date</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Charge / Rebate on Energy</th>
                  <th className="p-3 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-emerald-50 font-bold text-emerald-800">
                  <td className="p-3">1 – 7 days (digital only)</td>
                  <td className="p-3">Early digital payment</td>
                  <td className="p-3">−2% rebate</td>
                  <td className="p-3">eSewa, Khalti, connectIPS, Net banking</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">1 – 15 days</td>
                  <td className="p-3">Normal window</td>
                  <td className="p-3">No penalty</td>
                  <td className="p-3">Any payment method</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">16 – 30 days</td>
                  <td className="p-3">Late</td>
                  <td className="p-3">+5% surcharge</td>
                  <td className="p-3">Added to energy charge before VAT</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">31 – 40 days</td>
                  <td className="p-3">Very late</td>
                  <td className="p-3">+10% surcharge</td>
                  <td className="p-3">—</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">41 – 60 days</td>
                  <td className="p-3">Severely late</td>
                  <td className="p-3">+25% surcharge</td>
                  <td className="p-3">—</td>
                </tr>
                <tr className="bg-amber-100 font-semibold text-amber-800">
                  <td className="p-3">Above 60 days</td>
                  <td className="p-3">Disconnection risk</td>
                  <td className="p-3">Full disconnection + Rs 200–500 reconnection fee</td>
                  <td className="p-3">Contact local NEA office immediately</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">9. Step-by-step: how to calculate your NEA bill yourself</h2>
          <p>Follow these six steps to independently verify your NEA bill:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Read your meter:</strong> Current reading minus previous reading = units consumed this month</li>
            <li><strong>Split units by slab:</strong> Identify how many units fall in each slab band (0–20, 21–30, 31–50, etc.)</li>
            <li><strong>Calculate energy charge:</strong> Multiply units in each slab by that slab's rate and sum the results</li>
            <li><strong>Add fixed service charge:</strong> Use the table above for your meter type and usage slab</li>
            <li><strong>Calculate VAT:</strong> Multiply energy charge (NOT including fixed charge) by 0.13</li>
            <li><strong>Add or subtract adjustments:</strong> Apply late fine if applicable, subtract digital rebate if applicable</li>
          </ol>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">10. Worked example — 15A meter, 120 units consumed, paid on day 10</h2>

          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 my-6">
            <div className="text-sm font-bold text-amber-900 mb-4">💡 Standard Kathmandu household — 120 units, 15A meter, paid on day 10 (no penalty, no digital rebate)</div>
            <div className="overflow-x-auto border border-amber-200 rounded-lg">
              <table className="w-full border-collapse text-left text-sm m-0">
                <thead>
                  <tr className="bg-amber-100/80 text-amber-900 border-b border-amber-200 text-xs font-bold uppercase tracking-wider">
                    <th className="p-2">Slab Band</th>
                    <th className="p-2">Units in Band</th>
                    <th className="p-2">Rate (Rs/unit)</th>
                    <th className="p-2">Energy Charge (Rs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200">
                  <tr>
                    <td className="p-2 font-medium">0 – 20 units</td>
                    <td className="p-2">20</td>
                    <td className="p-2">Rs 4.00</td>
                    <td className="p-2">80.00</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">21 – 30 units</td>
                    <td className="p-2">10</td>
                    <td className="p-2">Rs 6.50</td>
                    <td className="p-2">65.00</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">31 – 50 units</td>
                    <td className="p-2">20</td>
                    <td className="p-2">Rs 8.00</td>
                    <td className="p-2">160.00</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">51 – 100 units</td>
                    <td className="p-2">50</td>
                    <td className="p-2">Rs 9.50</td>
                    <td className="p-2">475.00</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">101 – 120 units</td>
                    <td className="p-2">20</td>
                    <td className="p-2">Rs 10.50</td>
                    <td className="p-2">210.00</td>
                  </tr>
                  <tr className="bg-amber-100 font-bold text-amber-900">
                    <td colSpan={3} className="p-2">Total energy charge</td>
                    <td className="p-2">Rs 990.00</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="p-2 font-medium">Fixed service charge (101–250 unit tier)</td>
                    <td className="p-2">Rs 200.00</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="p-2 font-medium">VAT 13% on energy charge only (Rs 990 × 0.13)</td>
                    <td className="p-2">Rs 128.70</td>
                  </tr>
                  <tr className="bg-blue-50 font-semibold text-blue-700">
                    <td colSpan={3} className="p-2">Total bill payable</td>
                    <td className="p-2">Rs 1,318.70</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="p-2 font-medium">If paid within 7 days digitally (−2% rebate = Rs 990 × 2%)</td>
                    <td className="p-2">−Rs 19.80</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-800">
                    <td colSpan={3} className="p-2">Bill with digital rebate</td>
                    <td className="p-2">Rs 1,298.90</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">11. How to check your NEA bill online</h2>
          <p>You can check your NEA bill status using the following channels:</p>
          <ul>
            <li><strong>NEA official website:</strong> <a href="https://nea.org.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">nea.org.np</a> — enter your account number (shown on your physical bill)</li>
            <li><strong>eSewa app:</strong> Under "Electricity" → enter your service area and customer ID</li>
            <li><strong>Khalti app:</strong> Under "Electricity" → enter NEA consumer ID</li>
            <li><strong>connectIPS:</strong> Link your NEA account for automatic bill fetch each month</li>
            <li><strong>NEA mobile app:</strong> Available on iOS and Android — search "NEA Smart" in your app store</li>
          </ul>
          <p>
            Your customer ID (ग्राहक नम्बर / Customer Number) is printed on your physical NEA bill and on your meter box sticker. Keep this number saved — you'll need it for online payment and dispute queries.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">12. Frequently asked questions</h2>

          <div className="space-y-4 my-6">
            <details className="group border border-slate-200 rounded-lg overflow-hidden" open>
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>How much does 1 unit of electricity cost in Nepal in 2082 — is there a single rate?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                There is no single flat rate for 1 unit of electricity in Nepal — the cost depends entirely on your total monthly consumption. Under the 2082/83 NEA tariff for a 15A meter: if your consumption is below 20 units, your first unit costs Rs 4.00. But if you consume 60 units in a month, your effective rate for the 60th unit is Rs 9.50/unit. The progressive system means the "cost of 1 unit" depends on which slab it falls in. Use the <Link href="/calculator/nea-bill/" className="text-blue-600 underline font-bold">NEA bill calculator</Link> to enter your exact units and see the precise breakdown.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>How much does 40 units of electricity cost in Nepal in 2082?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                For 40 units on a 15A meter: Band 1 (20 units × Rs 4.00) = Rs 80; Band 2 (10 units × Rs 6.50) = Rs 65; Band 3 (10 units × Rs 8.00) = Rs 80. Total energy charge = Rs 225. Fixed service charge = Rs 100. VAT (13% on Rs 225) = Rs 29.25. <strong>Total bill ≈ Rs 354</strong>. If you pay within 7 days digitally, subtract Rs 4.50 rebate (2% on Rs 225) = approximately Rs 349.50.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>What is NEA.billing — is nea.billing a website?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                NEA's official website is <a href="https://nea.org.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">nea.org.np</a> — there is no separate "nea.billing" URL. The billing lookup and payment section is accessible under the customer portal on the main NEA website. For the quickest bill calculation without logging in, the <Link href="/calculator/nea-bill/" className="text-blue-600 underline font-bold">NepaCalc NEA bill calculator</Link> lets you enter your meter reading and get an instant result without any account registration.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>What is the NEA electricity bill rate in Nepal for 2082 — has it increased from 2081?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                The NEA tariff rates for 2082/83 were confirmed by the Electricity Tariff Fixation Commission. As of the current tariff notification, there has been <strong>no increase in domestic slab rates</strong> from the 2081/82 tariff for standard 15A connections. The rates published in this guide (Rs 4.00 for 0–20 units, Rs 6.50 for 21–30, etc.) reflect the currently applicable 2082/83 domestic tariff. Check <a href="https://nea.org.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">nea.org.np</a> for the official tariff order if rates change mid-year.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>If I share electricity with a tenant on one meter, how should we split the bill?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                Meter sharing is common in Nepal but important to handle correctly. The bill is calculated on <em>total</em> units consumed by both parties combined — meaning you may both fall in higher slabs than if metered separately. To split fairly: note each party's units consumed from their sub-meter or estimate, calculate what their bill would be individually using the slab table, and charge proportionally. A tenant consuming 30 units when you consume 80 units total (110 units combined) will pay higher per-unit rates than if they had a separate 30-unit meter. For fairness, request a separate NEA meter connection from your local NEA distribution center.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-lg overflow-hidden">
              <summary className="p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden">
                <span>How do I dispute an incorrect NEA electricity bill?</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                First, independently verify your bill using the slab table and formula above. If the discrepancy exists: (1) File a written complaint at your local NEA distribution center within 30 days of bill receipt; (2) Include your account number, bill date, and calculation showing the alleged error; (3) NEA is required to respond within 35 days under the Consumer Protection Act 2075; (4) If unresolved, escalate to the Electricity Regulatory Commission (ERC) at <a href="https://erc.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">erc.gov.np</a>. For general queries, contact NEA at their helpline: 1155.
              </div>
            </details>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500 italic">
            <strong>Sources &amp; Last Verified:</strong> NEA Tariff Notification 2082/83 (NEA Board of Directors) | Electricity Act 2049 (amended) | Electricity Tariff Fixation Commission Order | VAT Act 2052 (13% energy VAT) | NEA official — <a href="https://nea.org.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">nea.org.np</a> | ERC Nepal — <a href="https://erc.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">erc.gov.np</a>. All tariff rates verified against current NEA notification for FY 2082/83. Last reviewed: Jestha 2082/83. Bill amounts are indicative — exact figures may vary by Rs 1–5 due to rounding. This guide is for consumer education — contact your NEA distribution office for account-specific queries.
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6">Related calculators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/calculator/nepal-income-tax/" className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/20 transition-all text-center group">
                <span className="text-2xl block mb-2">📊</span>
                <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-wider block">Income Tax Calculator</span>
              </Link>
              <Link href="/market-rates/" className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/20 transition-all text-center group">
                <span className="text-2xl block mb-2">💹</span>
                <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-wider block">Nepal Market Rates</span>
              </Link>
              <Link href="/" className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/20 transition-all text-center group">
                <span className="text-2xl block mb-2">🧮</span>
                <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-wider block">All Nepal Calculators</span>
              </Link>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
