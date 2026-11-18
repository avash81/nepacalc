import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'International Market Rates - Live Gold, Silver & Commodities | NepaCalc',
  description: 'Track live international commodity spot prices in USD: gold, silver, platinum, palladium, copper, Dubai gold rates, Bitcoin, gold-silver ratio, and 56-year history.',
  keywords: [
    'international market rates',
    'gold price today usa',
    'silver spot price',
    'gold and silver price in international market',
    'platinum price today',
    'palladium spot price',
    'copper price today',
    'dubai gold rate',
    'gold silver ratio',
    'ppp salary calculator',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/international/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'NepaCalc',
    title: 'International Market Rates - Live Gold, Silver & Commodities | NepaCalc',
    description: 'Real-time international commodity prices: gold, silver, platinum, palladium, copper, Dubai gold, Bitcoin, and global financial tools in USD.',
    url: 'https://nepacalc.com/international/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Market Rates - Live Gold, Silver & Commodities | NepaCalc',
    description: 'Real-time international commodity prices: gold, silver, platinum, palladium, copper, Dubai gold, Bitcoin, and global financial tools in USD.',
  },
};

interface LiveSnapshot {
  gold?: { spotUSD?: number; changePercent24h?: number };
  silver?: { spotUSD?: number; changePercent24h?: number };
}

function getLiveRates(): LiveSnapshot {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'international-rates.json');
    if (fs.existsSync(filePath)) {
      const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (parsed.gold?.spotUSD) return parsed;
    }
  } catch {}
  return { gold: { spotUSD: 3877.15, changePercent24h: 0.42 }, silver: { spotUSD: 47.49, changePercent24h: 0.85 } };
}

export default function InternationalHubPage() {
  const live = getLiveRates();
  const goldOz = live.gold?.spotUSD ?? 3877.15;
  const silverOz = live.silver?.spotUSD ?? 47.49;
  const gsr = (goldOz / silverOz).toFixed(1);

  const tools = [
    {
      href: '/international/gold-silver-price/',
      label: 'Gold and Silver Price Today (USA)',
      sublabel: `$${goldOz.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / oz`,
      desc: 'Live US COMEX spot rates for gold and silver. View 24K, 22K, 18K, 14K purities per gram, 10g, troy ounce, and kilogram.',
      tag: 'PRECIOUS METALS',
    },
    {
      href: '/international/gold-silver-price/history/',
      label: 'Gold and Silver Price History (1970 - 2026)',
      sublabel: '56-Year Historical Archive',
      desc: 'Official 56-year historical bullion rates in USD. Annual averages, all-time records, 50-year CAGR returns, and decade breakdowns.',
      tag: 'HISTORICAL DATA',
    },
    {
      href: '/international/gold-silver-ratio/',
      label: 'Gold-to-Silver Ratio (Live GSR)',
      sublabel: `GSR: ${gsr}:1`,
      desc: 'Live gold-to-silver valuation ratio with historical benchmark bands, silver swap calculator, and undervaluation indicators.',
      tag: 'PRECIOUS METALS',
    },
    {
      href: '/international/dubai-gold-rate/',
      label: 'Dubai Gold Rate Today (AED & USD)',
      sublabel: 'DGCX & Retail Spot',
      desc: 'Current Dubai gold jewelry prices for 24K, 22K, 21K, and 18K in AED and USD with tourist VAT refund calculations.',
      tag: 'PRECIOUS METALS',
    },
    {
      href: '/international/platinum/',
      label: 'Platinum Price Today (Live Spot)',
      sublabel: 'Spot USD / Troy Oz',
      desc: 'Real-time platinum spot benchmark in USD per troy ounce, gram, and kilogram with catalytic converter demand metrics.',
      tag: 'PRECIOUS METALS',
    },
    {
      href: '/international/palladium/',
      label: 'Palladium Price Today (Live Spot)',
      sublabel: 'Spot USD / Troy Oz',
      desc: 'Live wholesale palladium spot price in USD per ounce with emissions regulation context and bid/ask spreads.',
      tag: 'PRECIOUS METALS',
    },
    {
      href: '/international/copper/',
      label: 'Copper Price Today (Live Spot)',
      sublabel: 'COMEX USD / lb & MT',
      desc: 'Real-time copper prices per pound (lb) and metric ton with clean energy electrification and infrastructure drivers.',
      tag: 'BASE METALS',
    },
    {
      href: '/international/bitcoin/',
      label: 'Bitcoin Price Today (BTC/USD)',
      sublabel: 'Live BTC Spot Rate',
      desc: 'Real-time Bitcoin spot price in USD with sats converter, market metrics, and gold vs Bitcoin store-of-value comparisons.',
      tag: 'DIGITAL ASSETS',
    },
    {
      href: '/calculator/ppp-salary-converter/',
      label: 'PPP Salary & Cost of Living Calculator',
      sublabel: '19 Global Benchmark Cities',
      desc: 'Convert your income to real purchasing power parity across 19 global cities using World Bank and Numbeo economic indices.',
      tag: 'GLOBAL FINANCE',
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/#webpage',
        url: 'https://nepacalc.com/international/',
        name: 'International Market Rates - Live Gold, Silver & Commodities',
        description: 'Real-time international commodity prices and financial tools in US Dollars.',
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', '@id': 'https://nepacalc.com/#website', name: 'NepaCalc', url: 'https://nepacalc.com' },
        breadcrumb: { '@id': 'https://nepacalc.com/international/#breadcrumb' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/international/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
          { '@type': 'ListItem', position: 2, name: 'International', item: 'https://nepacalc.com/international/' },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': 'https://nepacalc.com/international/#tools',
        name: 'International Price Trackers & Calculators',
        description: 'Live international commodity price tools and calculators on NepaCalc.',
        itemListElement: tools.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.label,
          url: `https://nepacalc.com${t.href}`,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans font-modern-ui text-slate-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="w-full">
          <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-amber-700 hover:underline">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">International</span>
          </div>
        </nav>

        {/* Clean Header */}
        <header className="space-y-1.5 border-b border-slate-200/80 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            International Market Rates
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            Live commodity spot prices, bullion valuation tools, and global financial calculators in US Dollars (USD). Real-time market data sourced from COMEX, LBMA, and international exchanges.
          </p>
        </header>

        {/* Tool Grid */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            All International Price Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-amber-400 hover:shadow-sm transition-all duration-150 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      {tool.tag}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
                      {tool.sublabel}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {tool.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
                  <span>View Rates</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Simple About Section */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            About International Commodity Benchmarks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-slate-900 mb-1.5">Precious Metals Benchmarks</h3>
              <p>
                Wholesale spot prices for gold and silver are benchmarked against continuous New York COMEX futures contracts and the London Bullion Market Association (LBMA) electronic fixings. Quoted prices represent institutional bars (400 oz gold, 1,000 oz silver) in USD per troy ounce (31.1035 grams).
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1.5">Gold-to-Silver Ratio (GSR)</h3>
              <p>
                The gold-to-silver ratio tracks the number of silver ounces required to purchase one ounce of gold. Historical post-1970 median levels hover near 55:1, offering investors an objective relative valuation benchmark between both monetary metals.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            Rates are wholesale reference prices updated from global trading sessions. Retail transactions typically include local dealer premiums and taxes.
          </div>
        </section>
      </main>
    </div>
  );
}
