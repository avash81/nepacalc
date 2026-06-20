import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "NEA Tariff Rates 2083/84 Nepal - Latest Electricity Unit & Service Charges",
  description: "View the latest official NEA tariff rates for 2083. Complete breakdown of residential electricity slab rates, service charges, and demand charges in Nepal for 5A, 15A, and 30A meters.",
  slug: "electricity/nea-tariff-rates",
  keywords: ["nea tariff rates", "latest nea tariff rates", "official nea tariff rates", "nea tariff rates 2083", "tariff rates nepal", "residential electricity tariff nepal", "domestic electricity tariff nepal"],
});

export default function NEATariffRatesPage() {

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com" },
      { "@type": "ListItem", "position": 2, "name": "Electricity Guides", "item": "https://nepacalc.com/electricity/" },
      { "@type": "ListItem", "position": 3, "name": "NEA Tariff Rates", "item": "https://nepacalc.com/electricity/nea-tariff-rates/" }
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
    "@id": "https://nepacalc.com/electricity/nea-tariff-rates/",
    "url": "https://nepacalc.com/electricity/nea-tariff-rates/",
    "name": "NEA Tariff Rates 2083/84 Nepal",
    "description": "Latest NEA tariff rates including electricity unit charges, service charges, demand charges and residential slab rates in Nepal.",
    "inLanguage": "en-NP"
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "NEA Tariff Rates 2083/84 Nepal - Latest Electricity Unit & Service Charges",
    "description": "Official NEA tariff rates including residential electricity slab rates, service charges and demand charges in Nepal.",
    "author": { "@type": "Organization", "name": "NepaCalc" },
    "publisher": { "@type": "Organization", "name": "NepaCalc" },
    "mainEntityOfPage": "https://nepacalc.com/electricity/nea-tariff-rates/"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the latest NEA tariff rates for 2083/84?",
        "acceptedAnswer": { "@type": "Answer", "text": "The latest NEA tariff rates for 2083/84 range from Rs. 3.00 to Rs. 11.00 per unit depending on your monthly electricity consumption slab and meter capacity (e.g., 5A, 15A, 30A). A fixed monthly service charge is also applied." }
      },
      {
        "@type": "Question",
        "name": "What is the current NEA electricity rate in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "The current NEA electricity rate in Nepal operates on a progressive slab system. For a standard 5A residential meter, it starts at Rs. 3.00 per unit for lower usage and goes up to Rs. 11.00 per unit for usage above 250 units." }
      },
      {
        "@type": "Question",
        "name": "How are NEA service charges calculated?",
        "acceptedAnswer": { "@type": "Answer", "text": "NEA service charges are fixed monthly fees based on your connection's ampere capacity and your total monthly electricity consumption slab. You pay a single flat service charge fee at the end of the month, ranging from Rs. 30 to Rs. 250." }
      },
      {
        "@type": "Question",
        "name": "How does the NEA Bill Calculator use tariff rates?",
        "acceptedAnswer": { "@type": "Answer", "text": "The NEA Bill Calculator accurately applies the official progressive slab rates, fixed service charges, and concessional VAT rules based on your exact consumed units and meter capacity to generate an itemized bill breakdown." }
      },
      {
        "@type": "Question",
        "name": "What is the lifeline tariff in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "The lifeline tariff is a special concession for low-income households using a 5A meter. If you consume 20 units or less per month, you pay no energy charge (Rs. 0 per unit) and only a minimum service charge of Rs. 30." }
      },
      {
        "@type": "Question",
        "name": "Are the NEA tariff rates the same across all of Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, the domestic electricity tariff in Nepal is uniform across the country." }
      },
      {
        "@type": "Question",
        "name": "What is the difference between service charge and demand charge?",
        "acceptedAnswer": { "@type": "Answer", "text": "For residential customers, NEA applies a service charge, which is a fixed monthly fee based on your meter capacity and consumption slab. A demand charge (based on kVA) is typically applied to commercial, industrial, or bulk consumers rather than standard domestic households." }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          NEA Tariff Rates 2083/84 Nepal
        </h1>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-gray-700"><strong>Last Updated:</strong> Based on the latest official Nepal Electricity Authority (NEA) publications for 2083.</p>
        </div>
        <p className="text-lg text-gray-700">
          The latest NEA tariff rates for 2083/84 range from Rs. 3.00 to Rs. 11.00 per unit depending on electricity consumption and meter type. Residential consumers also pay monthly service charges based on connection capacity. These NEA tariff rates are used by the NEA Bill Calculator to calculate electricity bills across Nepal.
        </p>
      </header>

      {/* Quick Links / Table of Contents */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h2>
        <ul className="space-y-2 text-blue-600 font-medium">
          <li><a href="#tariff-structure" className="hover:underline">Understanding the NEA Tariff Structure</a></li>
          <li><a href="#5a-meter" className="hover:underline">5A Meter Tariff Rates (Lifeline Tariff)</a></li>
          <li><a href="#15a-meter" className="hover:underline">15A Meter Tariff Rates</a></li>
          <li><a href="#30a-meter" className="hover:underline">30A Meter Tariff Rates</a></li>
          <li><a href="#changes" className="hover:underline">How Often Does NEA Change Tariffs?</a></li>
          <li><a href="#calculator" className="hover:underline">Calculate Your NEA Bill</a></li>
          <li><a href="#faq" className="hover:underline">Frequently Asked Questions</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <section id="tariff-structure" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the NEA Tariff Structure</h2>
        <p className="text-gray-700 mb-4">
          The <strong>official NEA tariff rates</strong> are divided based on two main factors: your meter capacity (measured in Amperes - 5A, 15A, 30A, 60A) and your total monthly consumption (measured in kWh or units). 
        </p>
        <p className="text-gray-700 mb-4">
          Each electricity bill consists of two primary components:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li><strong>Service Charge (Minimum Charge):</strong> A fixed monthly fee you must pay regardless of your consumption.</li>
          <li><strong>Energy Charge:</strong> The variable cost based on the exact number of units you consume, charged according to specific <strong>electricity slab rates</strong>.</li>
        </ul>
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-sm text-gray-800">
          <strong>Data Source:</strong> The rates provided below are compiled directly from the official NEA tariff page, official NEA PDF releases, and the Nepal Energy Forum tariff tables.
        </div>
      </section>

      {/* 5A Rates */}
      <section id="5a-meter" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5A Tariff Nepal: Rates for Standard Households</h2>
        <p className="text-gray-700 mb-4">
          The 5 Ampere meter is the most common for standard households. It includes a special <strong>lifeline tariff in Nepal</strong> for households consuming less than 20 units per month, providing free energy charges (only a minimal service charge applies).
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-900 font-semibold">Consumption Slab (Units)</th>
                <th className="py-3 px-4 border-b text-left text-gray-900 font-semibold">Service Charge (Rs.)</th>
                <th className="py-3 px-4 border-b text-left text-gray-900 font-semibold">Energy Charge (Rs. per Unit)</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr><td className="py-2 px-4 border-b">0 - 20 (Lifeline)</td><td className="py-2 px-4 border-b">30.00</td><td className="py-2 px-4 border-b">0.00</td></tr>
              <tr><td className="py-2 px-4 border-b">21 - 30</td><td className="py-2 px-4 border-b">50.00</td><td className="py-2 px-4 border-b">6.50</td></tr>
              <tr><td className="py-2 px-4 border-b">31 - 50</td><td className="py-2 px-4 border-b">50.00</td><td className="py-2 px-4 border-b">8.00</td></tr>
              <tr><td className="py-2 px-4 border-b">51 - 100</td><td className="py-2 px-4 border-b">75.00</td><td className="py-2 px-4 border-b">9.50</td></tr>
              <tr><td className="py-2 px-4 border-b">101 - 250</td><td className="py-2 px-4 border-b">100.00</td><td className="py-2 px-4 border-b">9.50</td></tr>
              <tr><td className="py-2 px-4 border-b">Above 250</td><td className="py-2 px-4 border-b">150.00</td><td className="py-2 px-4 border-b">11.00</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 15A Rates */}
      <section id="15a-meter" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">15A Tariff Nepal: Rates for Medium-High Consumption</h2>
        <p className="text-gray-700 mb-4">
          The 15A meter is designed for households with higher energy needs, such as those using multiple heavy appliances like geysers, air conditioners, or electric vehicles. Note that the base service charges are higher compared to the 5A meter.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-900 font-semibold">Consumption Slab (Units)</th>
                <th className="py-3 px-4 border-b text-left text-gray-900 font-semibold">Service Charge (Rs.)</th>
                <th className="py-3 px-4 border-b text-left text-gray-900 font-semibold">Energy Charge (Rs. per Unit)</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr><td className="py-2 px-4 border-b">0 - 20</td><td className="py-2 px-4 border-b">50.00</td><td className="py-2 px-4 border-b">4.00</td></tr>
              <tr><td className="py-2 px-4 border-b">21 - 30</td><td className="py-2 px-4 border-b">75.00</td><td className="py-2 px-4 border-b">6.50</td></tr>
              <tr><td className="py-2 px-4 border-b">31 - 50</td><td className="py-2 px-4 border-b">75.00</td><td className="py-2 px-4 border-b">8.00</td></tr>
              <tr><td className="py-2 px-4 border-b">51 - 100</td><td className="py-2 px-4 border-b">100.00</td><td className="py-2 px-4 border-b">9.50</td></tr>
              <tr><td className="py-2 px-4 border-b">101 - 250</td><td className="py-2 px-4 border-b">125.00</td><td className="py-2 px-4 border-b">9.50</td></tr>
              <tr><td className="py-2 px-4 border-b">Above 250</td><td className="py-2 px-4 border-b">175.00</td><td className="py-2 px-4 border-b">11.00</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 30A Rates */}
      <section id="30a-meter" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">30A Tariff Nepal: Rates for Heavy Consumption</h2>
        <p className="text-gray-700 mb-4">
          For large households, small commercial operations from home, or intensive electric vehicle charging setups, the 30A meter provides higher capacity. While the energy charge slabs align closely with the 15A meter, the fixed service charges are significantly higher.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-900 font-semibold">Consumption Slab (Units)</th>
                <th className="py-3 px-4 border-b text-left text-gray-900 font-semibold">Service Charge (Rs.)</th>
                <th className="py-3 px-4 border-b text-left text-gray-900 font-semibold">Energy Charge (Rs. per Unit)</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr><td className="py-2 px-4 border-b">0 - 20</td><td className="py-2 px-4 border-b">75.00</td><td className="py-2 px-4 border-b">5.00</td></tr>
              <tr><td className="py-2 px-4 border-b">21 - 30</td><td className="py-2 px-4 border-b">100.00</td><td className="py-2 px-4 border-b">6.50</td></tr>
              <tr><td className="py-2 px-4 border-b">31 - 50</td><td className="py-2 px-4 border-b">100.00</td><td className="py-2 px-4 border-b">8.00</td></tr>
              <tr><td className="py-2 px-4 border-b">51 - 100</td><td className="py-2 px-4 border-b">125.00</td><td className="py-2 px-4 border-b">9.50</td></tr>
              <tr><td className="py-2 px-4 border-b">101 - 250</td><td className="py-2 px-4 border-b">150.00</td><td className="py-2 px-4 border-b">9.50</td></tr>
              <tr><td className="py-2 px-4 border-b">Above 250</td><td className="py-2 px-4 border-b">200.00</td><td className="py-2 px-4 border-b">11.00</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* How Often Do They Change? */}
      <section id="changes" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Often Does NEA Change Tariffs?</h2>
        <p className="text-gray-700 mb-4">
          The <strong>NEA tariff rates</strong> do not change frequently. Adjustments are typically made every few years in response to inflation, operational costs, and national energy policies set by the Electricity Regulatory Commission (ERC) of Nepal. The most recent major structural updates aimed to encourage higher domestic consumption of electricity (especially for cooking and EV charging) by lowering rates for higher consumption slabs.
        </p>
      </section>

      {/* CTA / Calculator Link */}
      <section id="calculator" className="bg-blue-600 text-white rounded-xl p-8 mb-12 text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Stop Guessing Your Electricity Bill</h2>
        <p className="mb-6 text-blue-100">
          Want to know exactly how much you need to pay based on these official NEA tariff rates? Use our free interactive calculator to get a precise breakdown.
        </p>
        <Link href="/" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
          Calculate My NEA Bill Now
        </Link>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">What are the latest NEA tariff rates for 2083/84?</h3>
            <p className="text-gray-700">The latest NEA tariff rates for 2083/84 range from Rs. 3.00 to Rs. 11.00 per unit depending on your monthly electricity consumption slab and meter capacity (e.g., 5A, 15A, 30A). A fixed monthly service charge is also applied.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">What is the current NEA electricity rate in Nepal?</h3>
            <p className="text-gray-700">The current NEA electricity rate in Nepal operates on a progressive slab system. For a standard 5A residential meter, it starts at Rs. 3.00 per unit for lower usage and goes up to Rs. 11.00 per unit for usage above 250 units.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">How are NEA service charges calculated?</h3>
            <p className="text-gray-700">NEA service charges are fixed monthly fees based on your connection's ampere capacity and your total monthly electricity consumption slab. You pay a single flat service charge fee at the end of the month, ranging from Rs. 30 to Rs. 250.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">How does the NEA Bill Calculator use tariff rates?</h3>
            <p className="text-gray-700">The NEA Bill Calculator accurately applies the official progressive slab rates, fixed service charges, and concessional VAT rules based on your exact consumed units and meter capacity to generate an itemized bill breakdown.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">What is the lifeline tariff in Nepal?</h3>
            <p className="text-gray-700">The lifeline tariff is a special concession for low-income households using a 5A meter. If you consume 20 units or less per month, you pay no energy charge (Rs. 0 per unit) and only a minimum service charge of Rs. 30.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Are the NEA tariff rates the same across all of Nepal?</h3>
            <p className="text-gray-700">Yes, the <strong>domestic electricity tariff in Nepal</strong> is uniform across the country. You can learn more about <Link href="/electricity/nepal-unit-price" className="text-blue-600 hover:underline">Nepal's unified electricity unit price here</Link>.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">What is the difference between service charge and demand charge?</h3>
            <p className="text-gray-700">For residential customers, NEA applies a <strong>service charge</strong>, which is a fixed monthly fee based on your meter capacity and consumption slab. A <strong>demand charge</strong> (based on kVA) is typically applied to commercial, industrial, or bulk consumers rather than standard domestic households.</p>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
