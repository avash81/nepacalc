// Route: /international/platinum/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Platinum Price Today | Real-Time Spot Chart, Bid/Ask & USD Rates',
  description:
    'Track live platinum spot prices in real-time per troy ounce, gram, and kilogram in USD. Automotive catalytic converters, green hydrogen PEM electrolyzer demand, and South African mine supply data.',
  keywords: [
    'platinum price today',
    'live platinum price chart',
    'platinum spot price usd',
    'platinum price per ounce',
    'platinum price per gram',
    'platinum vs gold ratio',
    'platinum investment bullion',
    'buy physical platinum',
    'hydrogen fuel cell platinum demand',
    'south africa platinum mining',
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
        text: 'Platinum prices are primarily governed by heavy-duty diesel autocatalyst demand, proton exchange membrane (PEM) hydrogen fuel cells and electrolyzers, medical devices (such as pacemakers and neuromodulation leads), and mining supply constraints in South Africa, which produces over 70% of global primary platinum.',
      },
    },
    {
      name: 'Why does platinum trade at a discount to gold?',
      acceptedAnswer: {
        text: 'Although platinum is roughly 30 times rarer in the Earth crust than gold, gold commands sovereign central bank reserve allocations and monetary safe-haven capital flows. In contrast, over 65% of platinum demand is tied to industrial and automotive manufacturing cycles, causing it to trade at a discount during periods of industrial deceleration or high real interest rates.',
      },
    },
    {
      name: 'How does the Platinum-to-Gold ratio indicate valuation?',
      acceptedAnswer: {
        text: 'The Platinum-to-Gold ratio tracks the relative price between the two metals. Historically, platinum traded at a premium to gold (ratio > 1.0). Since 2015, the ratio has compressed to between 0.35:1 and 0.45:1, meaning an ounce of platinum costs less than half an ounce of gold, indicating deep historical undervaluation according to long-term commodity value investors.',
      },
    },
    {
      name: 'What is the role of platinum in the green hydrogen economy?',
      acceptedAnswer: {
        text: 'Platinum functions as an indispensable catalyst on the anode side of proton exchange membrane (PEM) water electrolyzers to generate green hydrogen, as well as in PEM fuel cells for heavy-duty hydrogen trucks and marine vessels. The World Platinum Investment Council (WPIC) estimates that hydrogen-related applications could comprise 20% to 35% of total platinum demand by 2035.',
      },
    },
    {
      name: 'Where are platinum spot prices determined?',
      acceptedAnswer: {
        text: 'Physical and institutional benchmark prices are established via the London Platinum and Palladium Market (LPPM) twice daily fixes (morning at 09:45 UTC and afternoon at 14:00 UTC). Continuous live electronic trading takes place on the New York Mercantile Exchange (NYMEX) in USD per troy ounce.',
      },
    },
  ];

  const graphSchema = {
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
            <span className="text-gray-900 font-bold">Platinum Price</span>
          </div>
        </nav>
      </div>

      <div id="platinum-hub">
        <InternationalGSRClient initialAsset="platinum" />
      </div>

      {/* ── HIGH-DENSITY PLATINUM SPECIFIC EDITORIAL SECTION ── */}
      <section className="w-full px-3 sm:px-6 lg:px-8 pb-10 space-y-3">
        {/* Deep Dive Guide Container */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Platinum Market Dynamics: Automotive Catalysts, Fuel Cells &amp; Deep Mine Geology
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Comprehensive fundamental breakdown of the platinum group metal supply-demand balance and macro pricing cycles.
            </p>
          </div>

          <p>
            Platinum (symbol Pt, atomic number 78) is a lustrous, silvery-white transition metal that ranks among the rarest elements in the continental crust. Unlike gold, which functions as an unallocated sovereign reserve with negligible commercial depletion, platinum is an active industrial catalyst: over 65% of annual consumption is consumed directly in diesel emissions reduction, chemical synthesis, and petroleum isomerization.
          </p>

          {/* Platinum 3-Pillar Fundamental Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wide block">Industrial Anchor</span>
              <h3 className="font-bold text-gray-900 text-xs">Heavy-Duty Diesel &amp; Hybrid Catalysts</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Platinum withstands higher thermal exhaust temperatures than palladium, making it the premier catalyst for commercial trucks, buses, and marine freight diesels. Tighter Euro 7 and China VI emissions standards mandate higher per-vehicle platinum loadings.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">Secular Energy Transition</span>
              <h3 className="font-bold text-gray-900 text-xs">PEM Hydrogen Fuel Cells &amp; Electrolyzers</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Proton Exchange Membrane (PEM) electrolyzers utilize platinum on the cathode and iridium on the anode to split water into green hydrogen. As global hydrogen power clusters scale in Europe and East Asia, long-term non-combustion demand creates a secular demand floor.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wide block">Supply Concentration Risk</span>
              <h3 className="font-bold text-gray-900 text-xs">South Africa Bushveld Complex (72%)</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Over 70% of primary global platinum is extracted from the Bushveld Igneous Complex in South Africa at depths exceeding 2,000 meters. Power supply interruptions (Eskom load-shedding), wage negotiations, and geological cooling requirements create severe supply inelasticity.
              </p>
            </div>
          </div>

          {/* Platinum vs Other Metals Valuation Ratios Breakdown */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
              Key Platinum Valuation Ratios &amp; Historic Arbitrage Spreads
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70">
                <span className="font-bold text-gray-900 block">Platinum / Gold Ratio (Historical Parity vs Discount)</span>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  Throughout the 20th century, platinum traded at an average 1.2x to 2.0x premium over gold due to its rarity and prestige. In modern markets, platinum trading at roughly 0.38x gold represents one of the widest valuation discounts in modern commodity history.
                </p>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70">
                <span className="font-bold text-gray-900 block">Platinum / Palladium Substitution Dynamic</span>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  Between 2018 and 2022, palladium traded at a record $1,500/oz premium over platinum. In response, auto engineers engineered tri-metal catalyst formulations, swapping palladium for cheaper platinum in gasoline engines and closing the price spread.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ Section (AEO & People Also Ask Target) ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
            Frequently Asked Questions About Platinum Pricing &amp; Bullion
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
            <Link
              href="/international/copper/"
              className="text-orange-800 hover:text-orange-950 hover:underline bg-orange-50 px-2.5 py-1 rounded-full"
            >
              Doctor Copper &amp; COMEX Rates →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}