// Route: /international/copper/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Copper Price Today | Real-Time COMEX Spot Chart, Per Pound & Metric Ton',
  description:
    'Track live copper spot prices in real-time per pound (lb), kilogram, and metric ton in USD. Clean energy grid electrification demand, AI data center hardware consumption, and Doctor Copper economic analysis.',
  keywords: [
    'copper price today',
    'live copper price per pound',
    'comex copper chart',
    'copper spot price usd',
    'copper price per metric ton',
    'doctor copper economic indicator',
    'copper pre-1982 penny melt value',
    'electrification copper demand',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/international/copper/',
  },
  openGraph: {
    title: 'Live Copper Spot Price Today & Interactive Charts (USD/lb)',
    description:
      'Real-time copper prices per pound, metric ton, and kilo. High-density intraday chart, macroeconomic ratios, and clean grid drivers.',
    url: 'https://nepacalc.com/international/copper/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/gold-silver-ratio.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Copper Spot Price and Industrial Trend Chart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Copper Spot Price Today & Interactive Charts (USD/lb)',
    description:
      'Real-time copper prices per pound, metric ton, and kilo. High-density intraday chart, macroeconomic ratios, and clean grid drivers.',
    images: ['https://nepacalc.com/images/og/gold-silver-ratio.jpg'],
  },
};

export default function CopperPage() {
  const faqItems = [
    {
      name: 'Why is copper called Doctor Copper by economists?',
      acceptedAnswer: {
        text: 'Copper earned the moniker "Doctor Copper" across Wall Street because it is considered to possess a Ph.D. in economics. Due to its ubiquitous applications across construction, electrical grids, electronics, plumbing, and automotive production, rising copper prices typically signal robust global industrial growth, while declining prices foreshadow macroeconomic contraction or recession.',
      },
    },
    {
      name: 'How is copper quoted on global commodities exchanges?',
      acceptedAnswer: {
        text: 'In the United States, COMEX copper is officially quoted in US Dollars per pound ($/lb). On the London Metal Exchange (LME) and across international commercial markets, copper contracts and physical cathode deliveries are quoted in US Dollars per metric ton (1 metric ton = 2,204.62 lbs).',
      },
    },
    {
      name: 'What is driving long-term copper demand in 2026?',
      acceptedAnswer: {
        text: 'Long-term structural demand is driven by the global energy transition and artificial intelligence infrastructure. An average battery electric vehicle requires roughly 4 times more copper than an internal combustion engine, while renewable wind and solar power generation require 4 to 6 times more copper per megawatt installed. Massive AI hyperscale data centers require enormous copper busbars and electrical wiring for high-density power delivery.',
      },
    },
    {
      name: 'Are pre-1982 US pennies worth more than one cent in copper?',
      acceptedAnswer: {
        text: 'Yes. US pennies minted before 1982 were composed of 95% copper and 5% zinc (weighing 3.11 grams). At contemporary copper prices above $5.00/lb to $6.00/lb, the raw metallic melt value of a pre-1982 penny exceeds 3 to 4 cents. While US federal law prohibits the commercial melting of active US currency, many collectors hoard them as a fractional physical copper hedge.',
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
                '@id': 'https://nepacalc.com/international/copper/',
                url: 'https://nepacalc.com/international/copper/',
                name: 'Live Copper Spot Price Today & Interactive Charts',
                description:
                  'Real-time copper prices per pound, metric ton, and kilo. High-density intraday chart, macroeconomic ratios, and clean grid drivers.',
                inLanguage: 'en-US',
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://nepacalc.com/international/copper/#breadcrumb',
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
                    name: 'Copper Price',
                    item: 'https://nepacalc.com/international/copper/',
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

      <div id="copper-hub">
        <InternationalGSRClient initialAsset="copper" />
      </div>

      {/* SEO Editorial Insights & FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 text-sm text-slate-700 leading-relaxed space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            About the Copper Supercycle, Mine Depletion &amp; Electrification
          </h2>
          <p>
            Copper is the red metal at the core of human civilizational progress. 
            Because it offers the highest electrical and thermal conductivity of any non-precious commercial metal, 
            it cannot be substituted at scale in high-voltage transformers, transmission lines, electric vehicles, 
            or AI computing clusters without severe efficiency penalties.
          </p>
          <p>
            Mining analysts forecast structural multi-year supply deficits due to declining ore grades at 
            major mature open-pit mines in Chile and Peru, stringent environmental permitting timelines 
            (taking 10 to 15 years to bring a new tier-1 copper mine into commercial operation), and rising water/energy 
            costs. The Copper-to-Gold ratio serves as a vital barometer for broad capital rotation between growth and safety.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            Frequently Asked Questions About Copper Pricing
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
            <Link href="/international/platinum/" className="text-blue-600 hover:underline">Platinum Price</Link>
            <span>&bull;</span>
            <Link href="/international/palladium/" className="text-blue-600 hover:underline">Palladium Price</Link>
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
