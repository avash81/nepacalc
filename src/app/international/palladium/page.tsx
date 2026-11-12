// Route: /international/palladium/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Palladium Price Today | Real-Time Spot Chart, Bid/Ask & USD Rates',
  description:
    'Track live palladium spot prices in real-time per troy ounce, gram, and kilogram in USD. Automotive gasoline catalysts, Russian Norilsk Nickel supply, and PGM substitution dynamics.',
  keywords: [
    'palladium price today',
    'live palladium price chart',
    'palladium spot price usd',
    'palladium price per ounce',
    'palladium price per gram',
    'palladium vs platinum ratio',
    'palladium catalytic converters',
    'invest in physical palladium',
    'norilsk nickel palladium production',
    'gasoline engine emission catalyst',
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
      name: 'What primarily influences the price of palladium today?',
      acceptedAnswer: {
        text: 'Over 82% of global palladium demand originates in the automotive sector for catalytic converters in gasoline and hybrid vehicles. Price movements depend on global light-duty vehicle production quotas, emissions mandates (Euro 7 and China 6b), and primary mine output from Russia (Norilsk Nickel ~40%) and South Africa (~38%).',
      },
    },
    {
      name: 'Why did palladium surge to $3,440/oz in March 2022?',
      acceptedAnswer: {
        text: 'Palladium reached an all-time record peak of approximately $3,440 per troy ounce following the outbreak of the Russia-Ukraine conflict in early 2022. Because Russia supplies roughly 40% of the world mined palladium, severe market panic over shipping logistics, airspace closures, and potential sanctions prompted panic-buying by automakers and institutional hedgers.',
      },
    },
    {
      name: 'How do hybrid vehicles impact long-term palladium demand?',
      acceptedAnswer: {
        text: 'Hybrid electric vehicles (HEVs) and plug-in hybrids (PHEVs) require internal combustion engines that cycle on and off frequently. Because these cold starts generate higher unburned hydrocarbon emissions, hybrid vehicles typically require 10% to 15% more palladium catalytic converter loading than standard gasoline vehicles, supporting demand even during EV transition periods.',
      },
    },
    {
      name: 'How does secondary autocatalyst recycling affect palladium supply?',
      acceptedAnswer: {
        text: 'Secondary recovery from scrapped automobile catalytic converters constitutes over 30% of total annual palladium supply. When automotive scrap rates slow down or illegal converter theft enforcement tightens, secondary supply bottlenecks directly amplify spot market price volatility.',
      },
    },
    {
      name: 'Can palladium absorb hydrogen gas?',
      acceptedAnswer: {
        text: 'Yes. Palladium possesses an extraordinary physical capability to absorb up to 900 times its own volume of hydrogen gas at standard room temperature. This unique property makes it essential for hydrogen purification membranes, analytical instrumentation, and advanced fuel cell research.',
      },
    },
  ];

  const graphSchema = {
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
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124]">
      {/* Structural Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      {/* Breadcrumb Navigation */}
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
            <Link href="/international/gold-silver-ratio/" className="hover:text-blue-600 hover:underline">International</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">Palladium Price</span>
          </div>
        </nav>
      </div>

      <div id="palladium-hub">
        <InternationalGSRClient initialAsset="palladium" />
      </div>

      {/* ── HIGH-DENSITY PALLADIUM SPECIFIC EDITORIAL SECTION ── */}
      <section className="w-full px-3 sm:px-6 lg:px-8 pb-10 space-y-3">
        {/* Deep Dive Guide Container */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Palladium Fundamentals: Gasoline Emissions, Norilsk Byproduct Supply &amp; Market Volatility
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Analyzing the high-beta industrial catalyst metal, geopolitical supply nodes, and automaker substitution cycles.
            </p>
          </div>

          <p>
            Palladium (symbol Pd, atomic number 46) was discovered in 1803 by English chemist William Hyde Wollaston and named after the asteroid Pallas. In the 21st century, palladium transformed into the highest-value component of automotive emission control, functioning as the primary oxidation catalyst to convert poisonous carbon monoxide and unburnt hydrocarbons into harmless carbon dioxide and water vapor.
          </p>

          {/* Palladium 3-Pillar Fundamental Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wide block">Automotive Dependency</span>
              <h3 className="font-bold text-gray-900 text-xs">Gasoline &amp; Hybrid Catalytic Converters (82%)</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Unlike platinum, which dominates diesel engines, palladium is uniquely effective in high-temperature gasoline exhaust environments. Strict global emission standards in China (China 6b) and North America require sustained autocatalyst loadings per engine.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wide block">Geopolitical Mine Duopoly</span>
              <h3 className="font-bold text-gray-900 text-xs">Russia &amp; South Africa Mining (78%)</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Russian giant MMC Norilsk Nickel produces roughly 40% of global palladium as a byproduct of Siberian nickel-copper ores. Because palladium is rarely mined as a primary target, production volume cannot quickly adjust to spot market price surges.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wide block">High-Tech Electronics</span>
              <h3 className="font-bold text-gray-900 text-xs">Multi-Layer Ceramic Capacitors (MLCC)</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Beyond automobiles, palladium-silver alloys are utilized in electronic multi-layer ceramic capacitors (MLCCs) found in 5G mobile devices, radar avionics, dental alloys, and chemical hydrogen purification membranes.
              </p>
            </div>
          </div>

          {/* Palladium Market Cycles & Substitution Mechanics */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
              The Palladium-Platinum Cycle: Thrifts, Substitutions &amp; Long-Term Inelasticity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70">
                <span className="font-bold text-gray-900 block">The 2018–2022 Palladium Deficit Squeeze</span>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  Years of consecutive structural deficits drove palladium from $600/oz in 2016 to over $3,400/oz in 2022, creating massive incentive for industrial automakers to engineer replacement formulas utilizing cheaper platinum.
                </p>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70">
                <span className="font-bold text-gray-900 block">The EV Transition Horizon vs Hybrid Resilience</span>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  While pure battery electric vehicles (BEVs) eliminate catalytic converters completely, growing consumer demand for hybrid powertrains maintains steady palladium consumption, keeping supply and demand tightly balanced.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ Section (AEO & People Also Ask Target) ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
            Frequently Asked Questions About Palladium Spot Rates &amp; Trading
          </h2>

          <div className="space-y-4 divide-y divide-gray-100 text-xs sm:text-sm">
            {faqItems.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0">
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>

          {/* Related Tools Links */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-gray-400">Related Metal Hubs:</span>
            <Link
              href="/international/platinum/"
              className="text-sky-800 hover:text-sky-950 hover:underline bg-sky-50 px-2.5 py-1 rounded-full"
            >
              Platinum Live Spot Price →
            </Link>
            <Link
              href="/international/copper/"
              className="text-orange-800 hover:text-orange-950 hover:underline bg-orange-50 px-2.5 py-1 rounded-full"
            >
              Doctor Copper &amp; COMEX Rates →
            </Link>
            <Link
              href="/international/gold-silver-ratio/"
              className="text-amber-800 hover:text-amber-950 hover:underline bg-amber-50 px-2.5 py-1 rounded-full"
            >
              Gold to Silver Ratio &amp; 80/50 Rule →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}