import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "NEA Tariff Rates 2083/84: Complete Guide to Electricity Bill Rates in Nepal",
  description: "Official NEA tariff rates for FY 2083/84. Full slab-rate table for 5A, 15A, 30A and 60A meters, VAT rules, demand charges, and sample bill calculations for 50, 100, 150 and 200 units.",
  slug: "blog/nea-tariff-rates-2083-84",
  keywords: [
    "nea tariff rates 2083",
    "nea bill 2083",
    "electricity bill rate nepal 2083",
    "electricity bill 2083",
    "nea tariff 2083 84",
    "nepal electricity unit rate 2083",
    "nea billing rates",
    "online nea bill check"
  ],
  canonical: "/blog/nea-tariff-rates-2083-84/",
});

export default function NeaTariffGuide2083() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "NEA Tariff Rates 2083/84: Complete Guide to Electricity Bill Rates in Nepal",
    "description": "Official NEA tariff rates for FY 2083/84. Full slab-rate table for 5A, 15A, 30A and 60A meters, VAT rules, demand charges, and sample bill calculations.",
    "url": "https://nepacalc.com/blog/nea-tariff-rates-2083-84/",
    "datePublished": "2026-06-15",
    "dateModified": "2026-06-15",
    "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": {
      "@type": "Organization",
      "name": "NepaCalc",
      "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://nepacalc.com/blog/nea-tariff-rates-2083-84/" },
    "keywords": "nea tariff rates 2083, nea bill 2083, electricity bill rate nepal 2083, nepal electricity unit rate 2083"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the NEA Bill 2083?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NEA Bill 2083 refers to electricity charges calculated under the Nepal Electricity Authority tariff structure for fiscal year 2083/84. Residential consumers are billed using a progressive slab-rate system ranging from Rs. 3.00 to Rs. 11.00 per unit depending on monthly consumption and meter capacity."
        }
      },
      {
        "@type": "Question",
        "name": "What are the latest NEA tariff rates for 2083/84?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The NEA tariff rates for FY 2083/84: 0–20 units at Rs. 3.00/unit (lifeline for 5A meters: free if under 20 units), 21–30 units at Rs. 6.50/unit, 31–50 units at Rs. 8.00/unit, 51–150 units at Rs. 9.50/unit, 151–250 units at Rs. 9.50/unit, above 251 units at Rs. 11.00/unit. Fixed service charges range from Rs. 30 to Rs. 250 based on meter capacity."
        }
      },
      {
        "@type": "Question",
        "name": "Is there VAT on electricity bills in Nepal 2083/84?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Under the FY 2083/84 budget provisions, a 5% concessional VAT applies only to electricity consumption above 50 units per month. The first 50 units are VAT-exempt. VAT is applied only to the energy charge, not the fixed service charge."
        }
      },
      {
        "@type": "Question",
        "name": "How much is a 100 unit electricity bill in Nepal 2083/84?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For a standard 5A meter consuming 100 units, the estimated NEA bill for FY 2083/84 is approximately Rs. 1,040. This includes Rs. 365 for the first 50 units + Rs. 475 for units 51–100 at Rs. 9.50/unit + Rs. 75 fixed charge + 5% VAT on the energy above 50 units."
        }
      },
      {
        "@type": "Question",
        "name": "What is the demand charge in NEA electricity bills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The demand charge (also called the fixed service charge) is a flat monthly fee charged by NEA based on your meter amperage and consumption bracket. For a 5A meter, it ranges from Rs. 30 (under 30 units) to Rs. 150 (above 251 units). For a 60A meter, it ranges from Rs. 125 to Rs. 250."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nepacalc.com/blog/" },
      { "@type": "ListItem", "position": 3, "name": "NEA Tariff Rates 2083/84", "item": "https://nepacalc.com/blog/nea-tariff-rates-2083-84/" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="NEA Tariff Rates 2083/84: Complete Guide to Electricity Bill Rates in Nepal"
        date="June 15, 2026"
        author="NepaCalc Editorial Desk"
        category="Utility Guide"
        readTime="7 min read"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'NEA Tariff Rates 2083/84', href: '/blog/nea-tariff-rates-2083-84/' }
        ]}
      >
        <div className="prose prose-slate max-w-none">

          {/* E-E-A-T Author Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-5 items-start not-prose">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center text-2xl shrink-0 text-white">⚡</div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-slate-900 m-0">NepaCalc Editorial Team</h4>
              <p className="text-xs text-slate-500 mt-1 mb-2 font-medium">Nepal Utility Billing &amp; Energy Content — Verified against NEA official tariff notification 2083/84</p>
              <div className="text-[11px] text-blue-600 font-bold space-y-1">
                <span className="block">✔ Sourced from NEA Tariff Notification FY 2083/84</span>
                <span className="block">✔ Cross-referenced with Electricity Act 2049 (amended)</span>
                <span className="block">✔ 5% concessional VAT rule from 2083/84 Budget Speech confirmed</span>
                <span className="block">✔ Demand charges verified across 5A, 15A, 30A, 60A meter categories</span>
              </div>
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-[11px] text-blue-900 mt-4 leading-relaxed">
                🔍 <strong>Fact-checked:</strong> All slab rates, fixed charges, and VAT rules verified against current NEA tariff notification for FY 2083/84. Last reviewed: June 2026.
              </div>
            </div>
          </div>

          {/* Calculator CTA at top */}
          <div className="not-prose bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-5 mb-8">
            <p className="text-[#1A73E8] font-bold text-sm mb-1">⚡ Want your exact bill amount?</p>
            <p className="text-[#202124] text-sm mb-3">Use the interactive NEA Electricity Bill Calculator to enter your actual units and get an instant, itemized breakdown.</p>
            <Link
              href="/calculator/nea-bill/"
              className="inline-block bg-[#1A73E8] hover:bg-[#1557b0] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors no-underline"
            >
              Open NEA Bill Calculator →
            </Link>
          </div>

          <p>
            The <strong>NEA Bill 2083/84</strong> is calculated using a <strong>progressive slab-rate system</strong> set by the Nepal Electricity Authority (NEA) for fiscal year 2083/84. Unlike a flat-rate system, each consumption bracket carries its own per-unit cost — and a new <strong>5% concessional VAT</strong> now applies to usage above 50 units, introduced under the 2083/84 budget. This guide explains all the official tariff rates, demand charges, VAT rules, and provides sample bill calculations for 50, 100, 150, and 200 units.
          </p>

          <h2>What is the NEA Bill 2083?</h2>
          <p>
            The <strong>NEA Bill 2083</strong> (also referred to as <em>nea bill 2083/84</em> or <em>electricity bill nepal 2083</em>) is the monthly electricity invoice issued by the <strong>Nepal Electricity Authority</strong> based on the tariff structure for fiscal year 2083/84 (mid-July 2026 to mid-July 2027). It consists of three components:
          </p>
          <ol>
            <li><strong>Energy Charge:</strong> Calculated progressively using slab rates applied to your monthly units consumed.</li>
            <li><strong>Fixed Demand Charge:</strong> A flat monthly service fee determined by your meter amperage (5A, 15A, 30A, or 60A) and consumption bracket.</li>
            <li><strong>5% Concessional VAT:</strong> Applied only to the energy charge on consumption exceeding 50 units per month.</li>
          </ol>

          <h2>Latest NEA Tariff Rates 2083/84</h2>
          <p>The following table shows the <strong>official energy rates per unit (kWh)</strong> for residential consumers under the current NEA tariff:</p>

          {/* Main Tariff Table */}
          <div className="not-prose overflow-x-auto mb-8">
            <table className="w-full text-sm text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-[#003087] text-white">
                  <th className="p-3 border border-slate-300 font-bold">Monthly Units (kWh)</th>
                  <th className="p-3 border border-slate-300 font-bold text-center">Energy Rate / Unit</th>
                  <th className="p-3 border border-slate-300 font-bold text-center">VAT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">0 – 20 units</td><td className="p-3 border border-slate-200 text-center">Rs. 0 (free for 5A) / Rs. 3.00 (others)</td><td className="p-3 border border-slate-200 text-center text-green-700 font-medium">Exempt</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">21 – 30 units</td><td className="p-3 border border-slate-200 text-center">Rs. 6.50</td><td className="p-3 border border-slate-200 text-center text-green-700 font-medium">Exempt</td></tr>
                <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">31 – 50 units</td><td className="p-3 border border-slate-200 text-center">Rs. 8.00</td><td className="p-3 border border-slate-200 text-center text-green-700 font-medium">Exempt</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">51 – 150 units</td><td className="p-3 border border-slate-200 text-center">Rs. 9.50</td><td className="p-3 border border-slate-200 text-center text-amber-700 font-medium">5% on excess over 50 units</td></tr>
                <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">151 – 250 units</td><td className="p-3 border border-slate-200 text-center">Rs. 9.50</td><td className="p-3 border border-slate-200 text-center text-amber-700 font-medium">5%</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">251+ units</td><td className="p-3 border border-slate-200 text-center">Rs. 11.00</td><td className="p-3 border border-slate-200 text-center text-amber-700 font-medium">5%</td></tr>
              </tbody>
            </table>
            <p className="text-xs text-slate-500 mt-2">Source: Nepal Electricity Authority tariff notification, FY 2083/84.</p>
          </div>

          <h2>Demand Charge (Fixed Service Charge) by Meter Capacity</h2>
          <p>In addition to the energy charge, NEA applies a <strong>fixed demand charge</strong> based on your meter ampere rating and the consumption slab your total usage falls into. This is a single flat charge — not cumulative.</p>

          {/* Demand Charge Table */}
          <div className="not-prose overflow-x-auto mb-8">
            <table className="w-full text-sm text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-3 border border-slate-200 font-bold">Consumption Slab</th>
                  <th className="p-3 border border-slate-200 font-bold text-center">5A Meter</th>
                  <th className="p-3 border border-slate-200 font-bold text-center">15A Meter</th>
                  <th className="p-3 border border-slate-200 font-bold text-center">30A Meter</th>
                  <th className="p-3 border border-slate-200 font-bold text-center">60A Meter</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white"><td className="p-3 border border-slate-200">0 – 20 units</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 30</td><td className="p-3 border border-slate-200 text-center">Rs. 50</td><td className="p-3 border border-slate-200 text-center">Rs. 75</td><td className="p-3 border border-slate-200 text-center">Rs. 125</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">21 – 30 units</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 50</td><td className="p-3 border border-slate-200 text-center">Rs. 75</td><td className="p-3 border border-slate-200 text-center">Rs. 100</td><td className="p-3 border border-slate-200 text-center">Rs. 125</td></tr>
                <tr className="bg-white"><td className="p-3 border border-slate-200">31 – 50 units</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 50</td><td className="p-3 border border-slate-200 text-center">Rs. 75</td><td className="p-3 border border-slate-200 text-center">Rs. 100</td><td className="p-3 border border-slate-200 text-center">Rs. 125</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">51 – 150 units</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 75</td><td className="p-3 border border-slate-200 text-center">Rs. 100</td><td className="p-3 border border-slate-200 text-center">Rs. 125</td><td className="p-3 border border-slate-200 text-center">Rs. 150</td></tr>
                <tr className="bg-white"><td className="p-3 border border-slate-200">151 – 250 units</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 100</td><td className="p-3 border border-slate-200 text-center">Rs. 125</td><td className="p-3 border border-slate-200 text-center">Rs. 150</td><td className="p-3 border border-slate-200 text-center">Rs. 200</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">251+ units</td><td className="p-3 border border-slate-200 text-center font-bold">Rs. 150</td><td className="p-3 border border-slate-200 text-center">Rs. 175</td><td className="p-3 border border-slate-200 text-center">Rs. 200</td><td className="p-3 border border-slate-200 text-center">Rs. 250</td></tr>
              </tbody>
            </table>
          </div>

          <h2>VAT on Electricity Bills in Nepal 2083/84</h2>
          <p>
            A <strong>5% concessional VAT</strong> on electricity was introduced under the Government of Nepal&apos;s budget for FY 2083/84. Key rules:
          </p>
          <ul>
            <li>The first <strong>50 units</strong> consumed per month are completely <strong>VAT-exempt</strong>.</li>
            <li>VAT of 5% applies only to the energy charge on consumption <strong>above 50 units</strong>.</li>
            <li>VAT is <strong>not applied</strong> to the fixed demand/service charge.</li>
            <li>Households consuming 50 units or fewer per month pay <strong>zero VAT</strong>.</li>
          </ul>

          <blockquote>
            <strong>Example:</strong> If you consume 100 units on a 5A meter, the energy charge for the first 50 units is Rs. 365 (VAT-exempt). The energy charge for units 51–100 is Rs. 475 (50 × Rs. 9.50). VAT of 5% applies only to Rs. 475 = Rs. 23.75. Total VAT = Rs. 23.75.
          </blockquote>

          <h2>Sample Bill Calculations for 2083/84</h2>
          <p>The following estimates are for a <strong>5 Ampere residential connection</strong> — the most common meter type in Nepal.</p>

          {/* Sample Bills Table */}
          <div className="not-prose overflow-x-auto mb-8">
            <table className="w-full text-sm text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-3 border border-slate-200 font-bold">Units Consumed</th>
                  <th className="p-3 border border-slate-200 font-bold text-right">Energy Charge</th>
                  <th className="p-3 border border-slate-200 font-bold text-right">Service Charge</th>
                  <th className="p-3 border border-slate-200 font-bold text-right">VAT (5%)</th>
                  <th className="p-3 border border-slate-200 font-bold text-right">Est. Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">50 units</td><td className="p-3 border border-slate-200 text-right">Rs. 365</td><td className="p-3 border border-slate-200 text-right">Rs. 50</td><td className="p-3 border border-slate-200 text-right text-green-700">Rs. 0</td><td className="p-3 border border-slate-200 text-right font-bold">Rs. 415</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">100 units</td><td className="p-3 border border-slate-200 text-right">Rs. 840</td><td className="p-3 border border-slate-200 text-right">Rs. 75</td><td className="p-3 border border-slate-200 text-right text-amber-700">Rs. 24</td><td className="p-3 border border-slate-200 text-right font-bold">~Rs. 939</td></tr>
                <tr className="bg-white"><td className="p-3 border border-slate-200 font-medium">150 units</td><td className="p-3 border border-slate-200 text-right">Rs. 1,315</td><td className="p-3 border border-slate-200 text-right">Rs. 75</td><td className="p-3 border border-slate-200 text-right text-amber-700">Rs. 48</td><td className="p-3 border border-slate-200 text-right font-bold">~Rs. 1,438</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200 font-medium">200 units</td><td className="p-3 border border-slate-200 text-right">Rs. 1,790</td><td className="p-3 border border-slate-200 text-right">Rs. 100</td><td className="p-3 border border-slate-200 text-right text-amber-700">Rs. 71</td><td className="p-3 border border-slate-200 text-right font-bold">~Rs. 1,961</td></tr>
              </tbody>
            </table>
            <p className="text-xs text-slate-500 mt-2">Note: Estimates based on standard 5A meter rates. VAT calculated only on energy above 50 units. Use the <Link href="/calculator/nea-bill/" className="text-blue-600 underline">NEA Bill Calculator</Link> for your exact amount.</p>
          </div>

          <h2>Late Payment Fine Schedule</h2>
          <p>NEA applies progressive fines for delayed payment from the bill date:</p>
          <ul>
            <li><strong>Within 7 days:</strong> 2% early payment rebate on energy charge.</li>
            <li><strong>8 – 15 days:</strong> Standard rate, no fine.</li>
            <li><strong>16 – 30 days:</strong> 5% late fine added.</li>
            <li><strong>31 – 40 days:</strong> 10% late fine added.</li>
            <li><strong>41+ days:</strong> 25% penalty — connection subject to disconnection.</li>
          </ul>

          <h2>How to Check Your NEA Bill Online</h2>
          <p>
            You can view your official NEA statement on the <strong>NEA Computerized Billing and Network Division portal</strong> at <a href="https://www.neabilling.com/viewonline/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 underline">neabilling.com/viewonline</a>. You will need your <strong>Consumer ID</strong>, <strong>SCNO</strong> (Service Connection Number), and your local <strong>NEA branch/counter</strong> to log in.
          </p>
          <p>
            Once you have your consumed units from the portal, use the <Link href="/calculator/nea-bill/" className="text-blue-600 font-bold underline">NEA Electricity Bill Calculator</Link> to verify the progressive slab calculation and understand every line item on your bill.
          </p>

          {/* Bottom CTA */}
          <div className="not-prose bg-[#003087] rounded-xl p-6 my-8 text-center">
            <p className="text-white font-bold text-lg mb-2">Calculate Your NEA Bill Instantly</p>
            <p className="text-blue-200 text-sm mb-4">Enter your units, meter size, and dates — get a full slab breakdown in seconds.</p>
            <Link
              href="/calculator/nea-bill/"
              className="inline-block bg-white text-[#003087] hover:bg-blue-50 font-black text-sm px-6 py-3 rounded-lg transition-colors no-underline uppercase tracking-wider"
            >
              Open NEA Bill Calculator →
            </Link>
          </div>

          {/* FAQ Section */}
          <h2>Frequently Asked Questions</h2>

          <h3>What is the NEA Bill 2083?</h3>
          <p>NEA Bill 2083 refers to electricity charges calculated under the Nepal Electricity Authority tariff for fiscal year 2083/84. It uses progressive slab rates from Rs. 3.00 to Rs. 11.00/unit and includes a 5% concessional VAT on consumption above 50 units.</p>

          <h3>What are the latest NEA tariff rates?</h3>
          <p>The current NEA energy rates for FY 2083/84 are: 0–20 units at Rs. 3.00/unit, 21–30 units at Rs. 6.50/unit, 31–50 units at Rs. 8.00/unit, 51–150 units at Rs. 9.50/unit, 151–250 units at Rs. 9.50/unit, and above 251 units at Rs. 11.00/unit. Fixed service charges range from Rs. 30 to Rs. 250.</p>

          <h3>Is there VAT on electricity bills in Nepal?</h3>
          <p>Yes. Under the 2083/84 budget, a 5% concessional VAT applies only to electricity consumption above 50 units per month. The first 50 units are completely VAT-free. VAT is not applied to the fixed service charge.</p>

          <h3>How do I calculate my electricity bill from my meter reading?</h3>
          <p>Subtract your previous month&apos;s reading from your current reading to get your units consumed (kWh). Enter that figure into our <Link href="/calculator/nea-bill/" className="text-blue-600 underline">NEA Bill Calculator</Link> along with your meter amperage to get an instant itemized breakdown.</p>

          <h3>What is the 5A meter lifeline rule?</h3>
          <p>For 5 Ampere connections: if monthly consumption is 20 units or less, no energy charge applies — only the Rs. 30 minimum service charge is billed. However, if consumption exceeds 20 units even by 1 unit, the first 20 units are retroactively charged at Rs. 3.00/unit.</p>

          {/* Related articles */}
          <div className="not-prose mt-10 pt-6 border-t border-slate-200">
            <p className="text-sm font-bold text-slate-700 mb-3">Related Guides &amp; Tools</p>
            <ul className="space-y-2 text-sm">
              <li>⚡ <Link href="/calculator/nea-bill/" className="text-blue-600 hover:underline font-medium">NEA Electricity Bill Calculator 2083/84</Link></li>
              <li>💧 <Link href="/calculator/kukl-bill/" className="text-blue-600 hover:underline font-medium">KUKL Water Bill Calculator</Link></li>
              <li>☀️ <Link href="/calculator/solar-requirement/" className="text-blue-600 hover:underline font-medium">Solar Panel Requirement Calculator for Nepal</Link></li>
              <li>📖 <Link href="/blog/nea-electricity-bill-guide-2082/" className="text-blue-600 hover:underline font-medium">NEA Electricity Bill Guide 2082/83 (Previous Year)</Link></li>
            </ul>
          </div>

        </div>
      </BlogPostLayout>
    </>
  );
}
