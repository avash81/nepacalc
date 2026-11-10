// Route: /international/gold-silver-ratio/
import { Metadata } from 'next';
import InternationalGSRClient from './InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gold to Silver Ratio (GSR) Live Chart, 80/50 Rule & Metals Tracker',
  description:
    'Track the live gold to silver ratio today with real-time COMEX charts, 80/50 trading signals, metal swap calculator, and spot prices for Gold, Silver, Platinum, Palladium, Copper, and BTC.',
  keywords: [
    'Gold to Silver ratio chart',
    'Gold to silver ratio when to buy',
    'Gold to silver ratio live chart',
    'Gold to silver ratio live graph',
    'Gold to silver ratio calculator',
    'GSR Gold silver ratio today',
    'Gold to silver ratio 80 50 rule',
    'Lowest gold silver ratio in history',
    'Highest gold silver ratio in history',
    'gold silver ratio today usd',
    'gold to silver ratio live',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/international/gold-silver-ratio/',
  },
  openGraph: {
    title: 'Gold to Silver Ratio (Live GSR) & Precious Metals Tracker',
    description:
      'Real-time gold-to-silver ratio chart with 80/50 trading rule indicator, silver-gold swap calculator, and live spot feeds.',
    url: 'https://nepacalc.com/international/gold-silver-ratio/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/gold-silver-ratio.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold to Silver Ratio Live Chart and 80/50 Rule Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold to Silver Ratio (Live GSR) & Precious Metals Tracker',
    description:
      'Real-time gold-to-silver ratio chart with 80/50 trading rule indicator, silver-gold swap calculator, and live spot feeds.',
    images: ['https://nepacalc.com/images/og/gold-silver-ratio.jpg'],
  },
};

export default function InternationalGSRPage() {
  const faqItems = [
    {
      name: 'What is the gold to silver ratio rule?',
      acceptedAnswer: {
        text: 'The primary guideline for trading the gold-to-silver ratio is the 80/50 rule. When the ratio exceeds 80:1, silver is considered historically undervalued relative to gold, signaling an opportune time to accumulate silver or trade gold for silver. Conversely, when the ratio drops beneath 50:1, gold is considered undervalued relative to silver, signaling a time to take profits on silver and rotate into gold.',
      },
    },
    {
      name: 'How is the gold-to-silver ratio calculated?',
      acceptedAnswer: {
        text: 'The gold-to-silver ratio is calculated by dividing the current spot price of one troy ounce of gold by the spot price of one troy ounce of silver. For example, if gold trades at $4,091.25/oz and silver trades at $53.11/oz, dividing $4,091.25 by $53.11 yields a ratio of approximately 77.03:1. This represents the exact number of silver ounces required to buy one ounce of gold.',
      },
    },
    {
      name: 'What is considered a good or normal gold-to-silver ratio?',
      acceptedAnswer: {
        text: 'In modern floating commodity markets, a ratio between 50:1 and 80:1 is considered the typical historical channel. The 50-year post-1971 mean sits around 65:1. Historically, in ancient Rome and under the US Coinage Act of 1792, the ratio was fixed between 12:1 and 15:1 based on geological crust abundance (~19:1).',
      },
    },
    {
      name: 'What was the highest gold-to-silver ratio in history?',
      acceptedAnswer: {
        text: 'The highest recorded gold-to-silver ratio in history occurred in March 2020 during the initial COVID-19 market panic, when the ratio spiked to an all-time peak of 125.3:1. During that crisis, silver dropped to near $12/oz while gold held value as a defensive safe haven asset. The ratio subsequently compressed back to 65:1 within 18 months as silver rebounded sharply.',
      },
    },
    {
      name: 'What was the lowest gold-to-silver ratio in modern history?',
      acceptedAnswer: {
        text: 'The modern era low occurred in January 1980 during the Hunt Brothers silver squeeze, when silver briefly surged to $50/oz and drove the ratio down to approximately 15:1. More recently, in April 2011, silver touched nearly $49.50/oz, compressing the ratio to approximately 31:1.',
      },
    },
    {
      name: 'Why is silver more volatile than gold?',
      acceptedAnswer: {
        text: 'Silver experiences greater volatility than gold because its overall market capitalization is much smaller, meaning smaller capital inflows or outflows create larger percentage swings. Additionally, over 50% of annual silver demand comes from industrial applications (such as solar photovoltaics, electrical contacts, and medical devices), making its price sensitive to broader manufacturing and economic cycles.',
      },
    },
    {
      name: 'Can investors use the gold-to-silver ratio for ratio trading?',
      acceptedAnswer: {
        text: 'Yes. Ratio trading involves swapping physical metal holdings between gold and silver without deploying new cash. An investor trades gold for silver when the ratio is high (e.g., >80:1) to accumulate maximum silver ounces, and then swaps back into gold when the ratio compresses (e.g., toward 60:1), steadily increasing total gold ounces held over multi-year cycles.',
      },
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/gold-silver-ratio/',
        url: 'https://nepacalc.com/international/gold-silver-ratio/',
        name: 'Gold to Silver Ratio (GSR) Live Chart, 80/50 Rule & Metals Tracker',
        description:
          'Track the live gold to silver ratio today with real-time COMEX charts, 80/50 trading signals, metal swap calculator, and spot prices for Gold, Silver, Platinum, Palladium, Copper, and BTC.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          url: 'https://nepacalc.com/',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.acceptedAnswer.text,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/international/gold-silver-ratio/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nepacalc.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'International',
            item: 'https://nepacalc.com/international/gold-silver-ratio/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Gold to Silver Ratio',
            item: 'https://nepacalc.com/international/gold-silver-ratio/',
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://nepacalc.com/international/gold-silver-ratio/#app',
        name: 'Gold to Silver Ratio Live Tracker',
        applicationCategory: 'FinanceApplication',
        url: 'https://nepacalc.com/international/gold-silver-ratio/',
        operatingSystem: 'Web',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        creator: {
          '@type': 'Organization',
          name: 'NepaCalc',
          url: 'https://nepacalc.com',
        },
        description:
          'Live gold to silver ratio tracker with interactive SVG spline chart, 80/50 trading signal indicator, and physical bullion swap calculator.',
        featureList: [
          'Real-time COMEX Gold to Silver Ratio calculation',
          '80/50 Historical Rule Trading Signals',
          'Bullion Swap and Ratio Arbitrage Calculator',
          'Live precious metals spot tracker (Gold, Silver, Platinum, Palladium, Copper, BTC)',
          'Interactive SVG Spline Trend Chart with 1D, 1W, 1M, 3M, 6M, 1Y, and ALL ranges',
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124]">
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      {/* ── Compact Breadcrumbs ── */}
      <div className="w-full px-3 sm:px-6 lg:px-8 pt-2">
        <nav aria-label="Breadcrumb" className="mb-0.5">
          <Link
            href="/"
            className="sm:hidden inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-600 transition"
          >
            ← Home
          </Link>

          <div className="hidden sm:flex items-center flex-wrap gap-1.5 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-medium">International</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">Gold to Silver Ratio</span>
          </div>
        </nav>
      </div>

      {/* ── Main Interactive Client Component ── */}
      <div id="gold-silver-ratio-tracker">
        <InternationalGSRClient />
      </div>

      {/* ── COMPREHENSIVE EDUCATIONAL & COMPETITOR ANALYSIS CONTENT (No unnecessary spaces) ── */}
      <section className="w-full px-3 sm:px-6 lg:px-8 pb-10 space-y-4">
        {/* Deep Dive Guide Container */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Understanding the Gold to Silver Ratio &amp; Trading Strategy
          </h2>

          <p>
            The gold-to-silver ratio is a proportional relationship comparing the price of gold against the price of silver. Effectively, it measures the exact number of silver ounces required to purchase a single ounce of gold at current spot prices. As one of the oldest macro valuation metrics in financial history, traders and commodity stackers track the ratio to gauge relative mispricing between precious metals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-1">The 80/50 Rule for Bullion Investors</h3>
              <p className="text-gray-600 text-xs">
                In modern free-floating markets, the ratio predominantly cycles between 50:1 and 80:1. When the ratio rises above 80:1, silver is statistically undervalued compared to gold, pointing to favorable conditions for accumulating silver. When the ratio falls below 50:1, gold represents the more attractive defensive value.
              </p>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-1">Industrial Utility vs. Monetary Safe-Haven</h3>
              <p className="text-gray-600 text-xs">
                While gold derives virtually all of its demand from central bank reserves, investment bars, and jewelry, silver is both an investment metal and an indispensable industrial input. With unparalleled electrical conductivity and thermal reflectivity, silver demand is driven by solar panels, electric vehicles, and semiconductors.
              </p>
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-900 pt-2">
            How to Use the Ratio for Portfolio Balancing and Spread Trading
          </h3>
          <p>
            Investors leverage the ratio to grow their total ounce holdings without adding new capital:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-gray-600">
            <li>
              <strong>Relative Value Indicator:</strong> When the ratio reaches historical extremes (&gt;80:1 or &lt;50:1), it signals that one metal is trading at a notable discount relative to historical cost relationships.
            </li>
            <li>
              <strong>Ratio Swapping:</strong> Swapping existing silver into gold or gold into silver when the cycle swings between bounds allows stackers to compound ounces over long periods.
            </li>
            <li>
              <strong>Economic Cycle Confirmation:</strong> Expanding ratios often correlate with global recessions or geopolitical shocks as investors flee to gold. Contracting ratios generally reflect industrial expansion and surging manufacturing consumption.
            </li>
          </ul>
        </div>

        {/* ── FAQ Section (AEO & People Also Ask Target) ── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions: Gold to Silver Ratio
          </h2>

          <div className="space-y-4 divide-y divide-gray-100">
            {faqItems.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>

          {/* Related Tools Links */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-gray-400">Related International Hubs:</span>
            <Link
              href="/calculator/ppp-salary-converter/"
              className="text-emerald-800 hover:text-emerald-950 hover:underline bg-emerald-50 px-2.5 py-1 rounded-full"
            >
              PPP Salary Converter by Country →
            </Link>
            <Link
              href="/international/dubai-gold-rate/"
              className="text-amber-800 hover:text-amber-950 hover:underline bg-amber-50 px-2.5 py-1 rounded-full"
            >
              Dubai &amp; Gulf Gold Rate Hub →
            </Link>
            <Link
              href="/calculator/currency-converter/"
              className="text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-2.5 py-1 rounded-full"
            >
              Live Multi-Currency Converter →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
