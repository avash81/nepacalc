// Route: /international/palladium/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Palladium Price Today | Real-Time Spot Chart, Bid/Ask & USD Rates',
  description:
    'Track live palladium spot prices in real-time per troy ounce, gram, and kilogram in USD. Historical volatility charts, automotive emissions standards, and mining supply telemetry.',
  keywords: [
    'palladium price today',
    'live palladium price chart',
    'palladium spot price usd',
    'palladium price per ounce',
    'palladium price per gram',
    'palladium vs platinum ratio',
    'palladium catalytic converters',
    'invest in physical palladium',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/international/palladium/',
  },
  openGraph: {
    title: 'Live Palladium Spot Price Today & Interactive Charts (USD)',
    description:
      'Real-time palladium spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
    url: 'https://nepacalc.com/international/palladium/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/gold-silver-ratio.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Palladium Spot Price and Market Chart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Palladium Spot Price Today & Interactive Charts (USD)',
    description:
      'Real-time palladium spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
    images: ['https://nepacalc.com/images/og/gold-silver-ratio.jpg'],
  },
};

export default function PalladiumPage() {
  const faqItems = [
    {
      name: 'What primarily influences the price of palladium?',
      acceptedAnswer: {
        text: 'Over 80% of global palladium demand comes from the automotive sector, specifically catalytic converters in gasoline and hybrid vehicles to reduce harmful carbon monoxide and hydrocarbon emissions. Price fluctuations are heavily tied to global auto manufacturing numbers, emission regulations (such as Euro 7 and China 6b), and geopolitical supply from Russia (Norilsk Nickel) and South Africa.',
      },
    },
    {
      name: 'What was palladium all-time high price?',
      acceptedAnswer: {
        text: 'Palladium reached an all-time record high of approximately $3,440 per troy ounce in March 2022 following severe supply chain disruptions and geopolitical tensions surrounding Russian exports, before moderating as automotive automakers increased platinum substitution.',
      },
    },
    {
      name: 'How do platinum and palladium compare for investors?',
      acceptedAnswer: {
        text: 'Both platinum and palladium belong to the Platinum Group Metals (PGM) family. Historically, palladium traded at a discount to platinum until strict gasoline emissions mandates triggered structural deficits from 2017 to 2022. Because palladium is highly concentrated in automotive catalysts, it carries higher industrial beta and price volatility than gold or silver.',
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
                '@id': 'https://nepacalc.com/international/palladium/',
                url: 'https://nepacalc.com/international/palladium/',
                name: 'Live Palladium Spot Price Today & Interactive Charts',
                description:
                  'Real-time palladium spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
                inLanguage: 'en-US',
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://nepacalc.com/international/palladium/#breadcrumb',
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
                    name: 'Palladium Price',
                    item: 'https://nepacalc.com/international/palladium/',
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

      <div id="palladium-hub">
        <InternationalGSRClient initialAsset="palladium" />
      </div>

      {/* SEO Editorial Insights & FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 text-sm text-slate-700 leading-relaxed space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            About Palladium Supply Chains &amp; Automotive Consumption
          </h2>
          <p>
            Palladium is a lustrous, silvery-white metal that possesses extraordinary catalytic properties. 
            It can absorb up to 900 times its own volume of hydrogen at room temperature, making it invaluable 
            not only in vehicle exhaust neutralizers but also in specialized chemical purification processes 
            and multi-layer ceramic capacitors (MLCC) found in smartphones and computing hardware.
          </p>
          <p>
            Because primary palladium is produced almost exclusively as a byproduct of nickel and platinum mining 
            in Russia and South Africa, its supply curve is inelastic. Physical bullion bars and coins provide 
            sophisticated commodity traders with direct exposure to industrial decarbonization policies.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            Frequently Asked Questions About Palladium Pricing
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
            <Link href="/international/platinum/" className="text-blue-600 hover:underline">Platinum Price</Link>
            <span>&bull;</span>
            <Link href="/international/gold-silver-ratio/" className="text-blue-600 hover:underline">Gold-Silver Ratio</Link>
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
