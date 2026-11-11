// Route: /international/platinum/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Platinum Price Today | Real-Time Spot Chart, Bid/Ask & USD Rates',
  description:
    'Track live platinum spot prices in real-time per troy ounce, gram, and kilogram in USD. Interactive historical charts, automotive catalyst drivers, and green hydrogen demand insights.',
  keywords: [
    'platinum price today',
    'live platinum price chart',
    'platinum spot price usd',
    'platinum price per ounce',
    'platinum price per gram',
    'platinum vs gold ratio',
    'platinum investment bullion',
    'buy physical platinum',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/international/platinum/',
  },
  openGraph: {
    title: 'Live Platinum Spot Price Today & Interactive Charts (USD)',
    description:
      'Real-time platinum spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
    url: 'https://nepacalc.com/international/platinum/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/gold-silver-ratio.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Platinum Spot Price and Technical Chart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Platinum Spot Price Today & Interactive Charts (USD)',
    description:
      'Real-time platinum spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
    images: ['https://nepacalc.com/images/og/gold-silver-ratio.jpg'],
  },
};

export default function PlatinumPage() {
  const faqItems = [
    {
      name: 'What drives the spot price of platinum today?',
      acceptedAnswer: {
        text: 'Platinum prices are primarily driven by industrial demand from automotive catalytic converters (especially diesel and heavy-duty vehicles), expanding PEM hydrogen fuel cells and green electrolyzers, jewellery manufacturing in Asia, and mine supply constraints in South Africa, which accounts for over 70% of global primary platinum production.',
      },
    },
    {
      name: 'Why is platinum sometimes cheaper than gold?',
      acceptedAnswer: {
        text: 'While platinum is approximately 30 times rarer in the Earth crust than gold, gold commands a stronger central bank reserve status and monetary safe-haven premium. Platinum price movements are heavily tethered to industrial automotive and manufacturing cycles, causing it to trade at a discount during periods of industrial slowdown.',
      },
    },
    {
      name: 'How is the live platinum spot price quoted?',
      acceptedAnswer: {
        text: 'Platinum is officially quoted in US Dollars per troy ounce (31.1035 grams) based on continuous trading across major commodity exchanges including the NYMEX (New York Mercantile Exchange) and the London Platinum and Palladium Market (LPPM).',
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
                '@id': 'https://nepacalc.com/international/platinum/',
                url: 'https://nepacalc.com/international/platinum/',
                name: 'Live Platinum Spot Price Today & Interactive Charts',
                description:
                  'Real-time platinum spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
                inLanguage: 'en-US',
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://nepacalc.com/international/platinum/#breadcrumb',
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
                    name: 'Platinum Price',
                    item: 'https://nepacalc.com/international/platinum/',
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

      <div id="platinum-hub">
        <InternationalGSRClient initialAsset="platinum" />
      </div>

      {/* SEO Editorial Insights & FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 text-sm text-slate-700 leading-relaxed space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            About Platinum Market Dynamics and Industrial Fundamentals
          </h2>
          <p>
            Platinum is one of the densest, least reactive, and most precious metals on Earth. 
            Unlike gold, which is predominantly vaulted as an unallocated sovereign reserve or 
            held in private investment bars, platinum serves a dual role: over 65% of annual consumption 
            is consumed directly by industrial manufacturing, petrochemical refining, and medical pace-makers.
          </p>
          <p>
            As the global energy transition accelerates, platinum is emerging as the cornerstone 
            catalyst in proton exchange membrane (PEM) hydrogen fuel cells and zero-emission 
            electrolyzers. Investors monitor the Platinum-to-Gold ratio as an indicator of global 
            capital expenditure and green-tech expansion.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            Frequently Asked Questions About Platinum Pricing
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
