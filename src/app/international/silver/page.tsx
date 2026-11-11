// Route: /international/silver/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live International Silver Price Today | Real-Time COMEX Spot Chart & USD Rates',
  description:
    'Track live international silver spot price in USD per troy ounce, gram, and kilogram. Industrial solar PV demand, structural mine deficits, and silver-to-gold swap calculator.',
  keywords: [
    'silver price today usd',
    'live silver spot price',
    'comex silver chart',
    'silver price per ounce',
    'silver price per gram usd',
    'solar photovoltaic silver demand',
    'silver bullion live chart',
    'world silver spot rate',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/international/silver/',
  },
  openGraph: {
    title: 'Live Silver Spot Price Today & Interactive Charts (USD/oz)',
    description:
      'Real-time silver spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
    url: 'https://nepacalc.com/international/silver/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/gold-silver-ratio.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Silver Spot Price and Technical Chart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Silver Spot Price Today & Interactive Charts (USD/oz)',
    description:
      'Real-time silver spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
    images: ['https://nepacalc.com/images/og/gold-silver-ratio.jpg'],
  },
};

export default function SilverPage() {
  const faqItems = [
    {
      name: 'Why is industrial demand so critical for silver pricing?',
      acceptedAnswer: {
        text: 'Unlike gold, which is mostly held in vaults or jewellery, more than 55% of annual silver production is consumed by industrial manufacturing. Silver has the highest electrical conductivity, thermal conductivity, and reflectivity of any metal on Earth, making it irreplaceable in photovoltaic solar cells, electric vehicles, AI microchips, and 5G telecommunications infrastructure.',
      },
    },
    {
      name: 'What was silver all-time record high price?',
      acceptedAnswer: {
        text: 'Silver reached intraday record peaks near $49.50 to $50.00 per troy ounce during two major market events: the Hunt Brothers silver squeeze in January 1980, and the post-global financial crisis commodities boom in April 2011.',
      },
    },
    {
      name: 'What is the structural physical deficit in silver?',
      acceptedAnswer: {
        text: 'The Silver Institute reports that global physical silver demand has outstripped total mine supply and recycling for multiple consecutive years, driven primarily by exponential growth in solar energy capacity (TOPCon and heterojunction panels require up to 30% to 50% more silver paste per watt).',
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
                '@id': 'https://nepacalc.com/international/silver/',
                url: 'https://nepacalc.com/international/silver/',
                name: 'Live Silver Spot Price Today & Interactive Charts',
                description:
                  'Real-time silver spot rates, bid/ask spread, multi-currency conversions, and historical trend analysis.',
                inLanguage: 'en-US',
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://nepacalc.com/international/silver/#breadcrumb',
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
                    name: 'Silver Price (USD)',
                    item: 'https://nepacalc.com/international/silver/',
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

      <div id="silver-hub">
        <InternationalGSRClient initialAsset="silver" />
      </div>

      {/* SEO Editorial Insights & FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 text-sm text-slate-700 leading-relaxed space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            About Physical Silver Supply Dynamics, Solar Photovoltaics &amp; Deficits
          </h2>
          <p>
            Silver occupies an extraordinary position in world finance: it is both a premier monetary store 
            of wealth (the historical currency of everyday commerce for thousands of years) and an essential, 
            non-negotiable technology metal. Because over 70% of primary silver is mined as a secondary byproduct 
            of zinc, lead, and copper mines, mine supply cannot easily adjust to surging industrial consumption.
          </p>
          <p>
            With solar photovoltaic manufacturing absorbing more than 20% of global annual silver mine output alone, 
            institutional investors view silver as an asymmetric, high-beta leverage play on global clean energy infrastructure 
            and physical precious metal re-monetization.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            Frequently Asked Questions About Silver Spot Pricing
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
            <Link href="/international/gold/" className="text-blue-600 hover:underline">Gold Price</Link>
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
