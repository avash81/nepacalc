// Route: /international/gold/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live International Gold Price Today | Real-Time COMEX Spot Chart & USD Rates',
  description:
    'Track live international gold spot price in USD per troy ounce, gram, and kilogram. COMEX futures, central bank reserve trends, and interactive multi-timeframe charts.',
  keywords: [
    'gold price today usd',
    'live gold spot price',
    'comex gold chart',
    'gold price per ounce',
    'gold price per gram usd',
    'gold bullion live chart',
    'world gold spot rate',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/international/gold/',
  },
  openGraph: {
    title: 'Live Gold Spot Price Today & Interactive Charts (USD/oz)',
    description:
      'Real-time gold spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
    url: 'https://nepacalc.com/international/gold/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/gold-silver-ratio.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Gold Spot Price and Technical Chart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Gold Spot Price Today & Interactive Charts (USD/oz)',
    description:
      'Real-time gold spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
    images: ['https://nepacalc.com/images/og/gold-silver-ratio.jpg'],
  },
};

export default function GoldPage() {
  const faqItems = [
    {
      name: 'How is the international spot price of gold determined?',
      acceptedAnswer: {
        text: 'The international spot price of gold is determined primarily by trading activity in the London over-the-counter (OTC) bullion market and the COMEX futures exchange in New York. The benchmark LBMA Gold Price is set twice daily (10:30 AM and 3:00 PM London time) in US dollars per troy ounce.',
      },
    },
    {
      name: 'What is a troy ounce of gold?',
      acceptedAnswer: {
        text: 'A troy ounce is the standard unit of measurement for precious metals worldwide. One troy ounce equals exactly 31.1034768 grams, which is approximately 9.7% heavier than a standard avoirdupois ounce (28.3495 grams) used for measuring groceries and non-precious goods.',
      },
    },
    {
      name: 'Why do central banks buy gold reserves?',
      acceptedAnswer: {
        text: 'Central banks hold physical gold as a core reserve asset because it carries zero credit or counterparty risk, cannot be frozen by foreign sanctions when vaulted domestically, and preserves purchasing power across multi-generational monetary cycles.',
      },
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Structural Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebPage',
                '@id': 'https://nepacalc.com/international/gold/',
                url: 'https://nepacalc.com/international/gold/',
                name: 'Live Gold Spot Price Today & Interactive Charts',
                description:
                  'Real-time gold spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
                inLanguage: 'en-US',
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://nepacalc.com/international/gold/#breadcrumb',
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
                    name: 'Gold Price (USD)',
                    item: 'https://nepacalc.com/international/gold/',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqItems.map((f) => ({
                  '@type': 'Question',
                  name: f.name,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.acceptedAnswer.text,
                  },
                })),
              },
            ],
          }),
        }}
      />

      <div id="gold-hub">
        <InternationalGSRClient initialAsset="gold" />
      </div>

      {/* SEO Editorial Insights & FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 text-sm text-slate-700 leading-relaxed space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            About Global Gold Markets, Central Bank Accumulation &amp; De-Dollarization
          </h2>
          <p>
            Gold remains the quintessential monetary asset of human history. For over five millennia, 
            it has functioned as the supreme store of value and unbacked circulating currency across civilizations. 
            In the modern macroeconomic environment, gold serves as a vital hedge against fiat currency devaluation, 
            geopolitical flashpoints, and sovereign debt expansion.
          </p>
          <p>
            Central banks worldwide, spearheaded by the People Bank of China, Reserve Bank of India, and 
            sovereign wealth funds across the Middle East, have accumulated physical gold bullion at historic paces 
            to diversify away from foreign currency reserves and de-risk sovereign balance sheets.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            Frequently Asked Questions About Gold Spot Pricing
          </h3>
          <div className="space-y-4 divide-y divide-gray-100 text-sm">
            {faqItems.map((item, idx) => (
              <div key={idx} className={idx === 0 ? '' : 'pt-4'}>
                <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                <p className="text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Related Markets:</span>
            <Link href="/international/gold-silver-ratio/" className="text-blue-600 hover:underline">Gold-Silver Ratio</Link>
            <span>&bull;</span>
            <Link href="/international/silver/" className="text-blue-600 hover:underline">Silver Price</Link>
            <span>&bull;</span>
            <Link href="/international/platinum/" className="text-blue-600 hover:underline">Platinum Price</Link>
            <span>&bull;</span>
            <Link href="/international/palladium/" className="text-blue-600 hover:underline">Palladium Price</Link>
            <span>&bull;</span>
            <Link href="/international/copper/" className="text-blue-600 hover:underline">Copper Price</Link>
            <span>&bull;</span>
            <Link href="/international/bitcoin/" className="text-blue-600 hover:underline">Bitcoin Spot</Link>
            <span>&bull;</span>
            <Link href="/international/dubai-gold-rate/" className="text-blue-600 hover:underline">Dubai Gold Rate</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
