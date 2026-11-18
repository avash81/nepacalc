import { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { CALCULATORS } from '@/data/calculators';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'International Prices - Live Gold, Silver, Commodities & Currency | NepaCalc',
  description: 'Live international commodity prices: gold price today USA, silver spot rate, platinum, palladium, copper, Dubai gold rate, Bitcoin price, gold-silver ratio, and PPP salary converter. Real-time COMEX data in USD.',
  keywords: [
    'international prices',
    'live commodity prices',
    'gold price today',
    'silver price today',
    'platinum price',
    'palladium price',
    'copper price',
    'dubai gold rate',
    'bitcoin price today',
    'gold silver ratio',
    'ppp salary calculator',
    'live precious metals',
    'commodity tracker',
    'international market rates',
    'comex spot prices',
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
    title: 'International Prices - Live Gold, Silver, Commodities & Currency | NepaCalc',
    description: 'Real-time international commodity prices: gold, silver, platinum, palladium, copper, Dubai gold, Bitcoin, and global salary comparisons. Live COMEX data in USD.',
    url: 'https://nepacalc.com/international/',
    images: [{ url: 'https://nepacalc.com/images/og/international-hub.jpg', width: 1200, height: 630, alt: 'International Commodity Prices Hub - NepaCalc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Prices - Live Gold, Silver, Commodities | NepaCalc',
    description: 'Live international commodity prices: gold, silver, platinum, palladium, copper, Dubai gold, Bitcoin, and PPP salary. Real-time COMEX data.',
    images: ['https://nepacalc.com/images/og/international-hub.jpg'],
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
  const goldGram = (goldOz / 31.1034768);
  const goldChangePct = live.gold?.changePercent24h ?? 0;
  const silverChangePct = live.silver?.changePercent24h ?? 0;
  const gsr = (goldOz / silverOz).toFixed(1);

  const intlCalcs = CALCULATORS.filter(c => c.category === 'international');

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/#webpage',
        url: 'https://nepacalc.com/international/',
        name: 'International Prices - Live Gold, Silver, Commodities & Currency',
        description: 'Real-time international commodity prices and financial tools: gold, silver, platinum, palladium, copper, Dubai gold, Bitcoin price, and PPP salary converter.',
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', '@id': 'https://nepacalc.com/#website', name: 'NepaCalc', url: 'https://nepacalc.com' },
        breadcrumb: { '@id': 'https://nepacalc.com/international/#breadcrumb' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/international/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
          { '@type': 'ListItem', position: 2, name: 'International Prices', item: 'https://nepacalc.com/international/' },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': 'https://nepacalc.com/international/#tools',
        name: 'International Price Trackers & Calculators',
        description: 'Live international commodity price tools and calculators on NepaCalc.',
        itemListElement: intlCalcs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          url: `https://nepacalc.com/${c.slug}/`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the gold price today in the USA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The live gold spot price in the USA today is approximately $${goldOz.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per troy ounce ($${goldGram.toFixed(2)} per gram for 24K pure gold). This is the real-time COMEX wholesale benchmark price.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What is the gold-silver ratio today?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The gold-silver ratio today is approximately ${gsr}:1, meaning it takes ${gsr} ounces of silver to equal the value of 1 ounce of gold. A ratio above 80 historically suggests silver is undervalued relative to gold.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What international prices does NepaCalc track?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'NepaCalc tracks live prices for gold (US COMEX spot), silver, platinum, palladium, copper, Dubai gold rate (AED and USD), Bitcoin (BTC/USD), live gold-silver ratio, and provides a PPP salary and cost of living converter for 19 global cities.',
            },
          },
        ],
      },
    ],
  };

  const tools = [
    {
      href: '/international/gold-silver-price/',
      emoji: '🥇',
      label: 'Gold & Silver Price Today (USA)',
      sublabel: `$${goldOz.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / oz`,
      change: goldChangePct,
      desc: 'Live US COMEX spot gold and silver prices. All purities (24K-10K) per gram, 10g, oz, kg. 30-day interactive chart.',
      tag: 'PRECIOUS METALS',
      tagColor: 'bg-amber-100 text-amber-800',
      hot: true,
    },
    {
      href: '/international/gold-silver-ratio/',
      emoji: '⚖️',
      label: 'Gold to Silver Ratio (Live GSR)',
      sublabel: `GSR: ${gsr}:1`,
      change: null,
      desc: 'Live gold-to-silver ratio with 30-day chart, historical benchmarks, and silver/gold swap calculator.',
      tag: 'PRECIOUS METALS',
      tagColor: 'bg-amber-100 text-amber-800',
      hot: false,
    },
    {
      href: '/international/dubai-gold-rate/',
      emoji: '🇦🇪',
      label: 'Dubai Gold Rate Today (AED & USD)',
      sublabel: 'DXB Spot Live',
      change: null,
      desc: 'Live Dubai gold price for 24K, 22K, 21K, 18K in AED and USD. VAT refund calculator and customs guide.',
      tag: 'PRECIOUS METALS',
      tagColor: 'bg-amber-100 text-amber-800',
      hot: false,
    },
    {
      href: '/international/platinum/',
      emoji: '🔬',
      label: 'Platinum Price Today (Live Spot)',
      sublabel: 'USD / Troy Oz',
      change: null,
      desc: 'Live platinum spot rates in USD per troy ounce, gram, and kilogram with interactive charts and catalytic demand metrics.',
      tag: 'PRECIOUS METALS',
      tagColor: 'bg-amber-100 text-amber-800',
      hot: false,
    },
    {
      href: '/international/palladium/',
      emoji: '⚗️',
      label: 'Palladium Price Today (Live Spot)',
      sublabel: 'USD / Troy Oz',
      change: null,
      desc: 'Real-time palladium spot price in USD per troy ounce with historical charts, emissions demand context, and bid/ask spreads.',
      tag: 'PRECIOUS METALS',
      tagColor: 'bg-amber-100 text-amber-800',
      hot: false,
    },
    {
      href: '/international/copper/',
      emoji: '🔧',
      label: 'Copper Price Today (Live Spot)',
      sublabel: 'USD / lb & MT',
      change: null,
      desc: 'Live COMEX copper prices per pound (lb) and metric ton. Clean energy grid demand drivers and intraday chart.',
      tag: 'BASE METALS',
      tagColor: 'bg-orange-100 text-orange-800',
      hot: false,
    },
    {
      href: '/international/bitcoin/',
      emoji: '₿',
      label: 'Bitcoin Price Today (BTC/USD)',
      sublabel: 'Live BTC Spot',
      change: null,
      desc: 'Live Bitcoin spot price in USD with interactive chart, sats calculator, and digital gold comparison matrix.',
      tag: 'DIGITAL ASSETS',
      tagColor: 'bg-purple-100 text-purple-800',
      hot: false,
    },
    {
      href: '/calculator/ppp-salary-converter/',
      emoji: '🌍',
      label: 'PPP Salary & Cost of Living Calculator',
      sublabel: '19 Global Cities',
      change: null,
      desc: 'Convert your salary to real purchasing power across 19 global cities using World Bank PPP factors and Numbeo cost of living indices.',
      tag: 'GLOBAL FINANCE',
      tagColor: 'bg-blue-100 text-blue-800',
      hot: false,
    },
    {
      href: '/international/gold-silver-price/history/',
      emoji: '📊',
      label: 'Gold & Silver Price History (1970-2026)',
      sublabel: '56-Year Dataset',
      change: null,
      desc: 'Complete 56-year historical record of gold and silver spot prices in USD. Yearly averages, record highs, annual returns, CAGR analysis.',
      tag: 'HISTORY',
      tagColor: 'bg-slate-100 text-slate-700',
      hot: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124] font-modern-ui">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />

      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 pt-3 sm:pt-5">
        <nav aria-label="Breadcrumb" className="mb-2">
          <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">International Prices</span>
          </div>
        </nav>
      </div>

      {/* ── Hero Header ── */}
      <section className="max-w-6xl mx-auto px-4 pt-2 pb-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live Prices
              </span>
              <span className="text-xs text-slate-400 font-medium">Real-time COMEX & Global Markets</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">
              International Market Prices
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed mb-5">
              Live gold, silver, platinum, palladium, copper, Bitcoin, Dubai gold, and global salary data. All prices in USD from real-time COMEX and global markets.
            </p>

            {/* Live snapshot chips */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Gold / oz</span>
                <span className="text-lg font-extrabold text-white">${goldOz.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`text-[11px] font-bold ml-2 ${goldChangePct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {goldChangePct >= 0 ? '+' : ''}{goldChangePct.toFixed(2)}%
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5">
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">Silver / oz</span>
                <span className="text-lg font-extrabold text-white">${silverOz.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`text-[11px] font-bold ml-2 ${silverChangePct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {silverChangePct >= 0 ? '+' : ''}{silverChangePct.toFixed(2)}%
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5">
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Gold-Silver Ratio</span>
                <span className="text-lg font-extrabold text-white">{gsr}:1</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Gold / gram (24K)</span>
                <span className="text-lg font-extrabold text-white">${goldGram.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tool Grid ── */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">All International Price Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-amber-300 hover:shadow-md transition-all duration-200 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl leading-none">{tool.emoji}</span>
                  <div>
                    <span className={`inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 ${tool.tagColor}`}>
                      {tool.tag}
                      {tool.hot && <span className="ml-1 text-red-500">🔥</span>}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-amber-700 transition-colors">
                      {tool.label}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-base font-extrabold text-gray-800">{tool.sublabel}</span>
                {tool.change !== null && (
                  <span className={`text-xs font-bold ${tool.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {tool.change >= 0 ? '+' : ''}{tool.change.toFixed(2)}%
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-500 leading-relaxed flex-1">{tool.desc}</p>

              <span className="text-xs font-semibold text-amber-600 group-hover:text-amber-800 mt-auto">
                View Live Prices →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── About / SEO Section ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <header>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">About International Commodity Prices</h2>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Real-time and historical international commodity price data for investors, researchers, jewelers, and everyday users.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Precious Metals (Gold, Silver, Platinum, Palladium)</h3>
              <p>
                Spot prices for gold and silver are benchmarked against continuous New York COMEX futures contracts and the London Bullion Market Association (LBMA) gold and silver fixings. These are the wholesale reference prices for large institutional delivery bars (400 oz gold bars, 1,000 oz silver bars). Physical retail products - coins, rounds, and small bars - trade at spot plus a dealer premium. All prices are quoted in US Dollars (USD) per troy ounce (1 troy oz = 31.1034768 grams).
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Why Track the Gold-Silver Ratio?</h3>
              <p>
                The gold-silver ratio (GSR) measures how many ounces of silver it takes to buy one ounce of gold. The historical average is around 55:1 to 65:1. When the ratio trades above 80:1, silver is considered historically undervalued relative to gold. Investors use the GSR as a tactical allocation signal between the two metals. The all-time high was 125.6:1 during the COVID-19 liquidity shock in March 2020.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Dubai Gold Market</h3>
              <p>
                Dubai is one of the world&apos;s largest physical gold trading hubs. The Dubai Multi Commodities Centre (DMCC) sets the official Dubai Gold and Commodities Exchange (DGCX) reference rate daily. Dubai gold jewelry is predominantly 22K and 21K purity - higher purity than typical Western markets. Tourists from many countries can claim VAT refunds on purchases over AED 250 at Dubai International Airport.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Base Metals and Digital Assets</h3>
              <p>
                Copper is the world&apos;s most important industrial base metal, priced on the London Metal Exchange (LME) and COMEX in USD per pound (US) or metric ton (global). Copper demand is a key leading indicator for global economic activity. Bitcoin (BTC) is tracked live from major global exchange aggregates. The PPP salary converter uses World Bank 2024 Purchasing Power Parity factors combined with Numbeo city-level cost of living indices.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400">
              Prices shown are real-time wholesale benchmarks for reference purposes. Physical bullion dealer prices will include a premium over spot. Always verify current rates with your dealer or exchange before transacting. Data sourced from COMEX, LBMA, DMCC, and major exchange aggregates.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
