// Route: /international/copper/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Copper Price Today | Real-Time COMEX Spot Chart, Per Pound & Metric Ton',
  description:
    'Track live copper spot prices in real-time per pound (lb), kilogram, and metric ton in USD. Clean energy grid electrification, AI hyperscale data centers, and Doctor Copper macroeconomic indicators.',
  keywords: [
    'copper price today',
    'live copper price per pound',
    'comex copper chart',
    'copper spot price usd',
    'copper price per metric ton',
    'doctor copper economic indicator',
    'copper pre-1982 penny melt value',
    'electrification copper demand',
    'ai data center copper busbars',
    'lme copper cathode prices',
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
      name: 'Why is copper called Doctor Copper by financial economists?',
      acceptedAnswer: {
        text: 'Copper earned the title "Doctor Copper" on Wall Street because it is the only metal said to possess a Ph.D. in economics. Because copper is essential across home construction, electrical distribution, manufacturing, consumer electronics, and plumbing, rising copper prices reflect accelerating global industrial expansion, while collapsing prices foreshadow economic recession.',
      },
    },
    {
      name: 'How is copper traded between COMEX and the London Metal Exchange (LME)?',
      acceptedAnswer: {
        text: 'In the United States, copper futures trade on the CME COMEX exchange quoted in US Dollars per pound ($/lb). Across European and Asian physical merchant markets, copper is traded on the London Metal Exchange (LME) in US Dollars per metric ton (1 metric ton = 2,204.62 pounds). Multiplying the COMEX price per pound by 2,204.62 gives the approximate metric ton price.',
      },
    },
    {
      name: 'Why do artificial intelligence data centers require massive copper volumes?',
      acceptedAnswer: {
        text: 'High-density AI server clusters (featuring NVIDIA GPU racks running 100kW+ per cabinet) require massive low-resistance copper power distribution busbars, liquid cooling cold plates, and high-speed copper interconnect cables to manage immense electrical current and thermal dissipation without resistive line losses.',
      },
    },
    {
      name: 'What is the raw metal melt value of a pre-1982 US penny?',
      acceptedAnswer: {
        text: 'US pennies minted before 1982 consist of 95% copper and 5% zinc, weighing 3.11 grams (containing roughly 2.95 grams of pure elemental copper). When copper spot prices exceed $4.50 to $5.50 per pound, the intrinsic metallic copper content inside each pre-1982 penny is worth roughly 2.5 to 3.5 cents, significantly exceeding its one-cent face value.',
      },
    },
    {
      name: 'What are the Copper-to-Gold ratio and its macroeconomic signals?',
      acceptedAnswer: {
        text: 'The Copper-to-Gold ratio divides copper ($/lb) by gold ($/oz). Widely monitored by bond fund managers and macroeconomic strategists, this ratio tracks the spread between industrial economic momentum (copper) and defensive monetary flight-to-safety (gold), historically correlating strongly with 10-year US Treasury bond yields.',
      },
    },
  ];

  const graphSchema = {
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
            <span className="text-gray-900 font-bold">Copper Price</span>
          </div>
        </nav>
      </div>

      <div id="copper-hub">
        <InternationalGSRClient initialAsset="copper" />
      </div>

      {/* ── HIGH-DENSITY COPPER SPECIFIC EDITORIAL SECTION ── */}
      <section className="w-full px-3 sm:px-6 lg:px-8 pb-10 space-y-3">
        {/* Deep Dive Guide Container */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              The Copper Supercycle: Global Electrification, AI Data Centers &amp; Mine Supply Depletion
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Evaluating the essential red metal powering green grids, transformer manufacturing, and modern digital computation.
            </p>
          </div>

          <p>
            Copper (symbol Cu, atomic number 29) is the backbone of the electrified world. Because copper possesses the highest electrical conductivity of any non-precious metal (surpassed only by silver), it cannot be substituted at commercial scale in high-voltage transformers, transmission lines, electric vehicles, or data centers without catastrophic efficiency and thermal losses.
          </p>

          {/* Copper 3-Pillar Fundamental Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wide block">Energy Transition</span>
              <h3 className="font-bold text-gray-900 text-xs">Electric Vehicles &amp; Grid Infrastructure</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                A battery electric vehicle contains approximately 80kg of copper (4 times more than internal combustion cars). Offshore wind turbines and solar generation facilities require 4 to 6 times more copper per megawatt of generated capacity than fossil plants.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wide block">Digital Infrastructure</span>
              <h3 className="font-bold text-gray-900 text-xs">AI Data Centers &amp; Power Busbars</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Hyperscale AI facilities require massive copper busbars, heavy-gauge transformer windings, and liquid-to-air heat exchangers. S&amp;P Global forecasts an additional 1.5 million metric tons of copper demand solely for AI power infrastructure by 2030.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">Supply Bottlenecks</span>
              <h3 className="font-bold text-gray-900 text-xs">Chile, Peru &amp; Declining Ore Grades</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Chile and Peru account for roughly 40% of global mine supply. Aging open-pit operations (such as Escondida) face declining ore grades (&lt;0.5% copper content), water shortages, and decade-long permitting delays for new greenfield deposits.
              </p>
            </div>
          </div>

          {/* Copper Market Units & Pre-1982 Melt Value Box */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
              Copper Commercial Units &amp; Pre-1982 Penny Melt Value Economics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70">
                <span className="font-bold text-gray-900 block">COMEX ($/lb) to LME ($/Metric Ton) Conversion</span>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  1 metric ton contains 2,204.62 pounds. A COMEX price of $4.85/lb equates to roughly $10,692 per metric ton on the London Metal Exchange. Commercial cathode deliveries and smelting charges (TC/RC) trade against LME benchmarks.
                </p>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70">
                <span className="font-bold text-gray-900 block">Pre-1982 95% Copper US Pennies</span>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  Before the US Mint shifted to zinc in mid-1982, pennies were 95% copper. With 146 pre-1982 pennies per pound, hoarding pre-1982 cents provides fractional physical copper ownership with a face-value legal tender floor.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ Section (AEO & People Also Ask Target) ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
            Frequently Asked Questions About Copper Spot Rates &amp; COMEX Markets
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
              href="/international/palladium/"
              className="text-purple-800 hover:text-purple-950 hover:underline bg-purple-50 px-2.5 py-1 rounded-full"
            >
              Palladium Live Spot Price →
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