import React from 'react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import InternationalHistoryClient, { InternationalHistoryDataset } from './InternationalHistoryClient';

export const metadata: Metadata = {
  title: 'Gold and Silver Price History (1970-2026) | USD Rates',
  description: 'Explore gold and silver price history from 1970 to 2026. View 56-year historical spot rates in USD, annual high and low records, CAGR trends, and metal ratios.',
  alternates: {
    canonical: 'https://nepacalc.com/international/gold-silver-price/history/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: 'NepaCalc',
    title: 'Gold and Silver Price History (1970-2026) | USD Rates',
    description: 'Explore gold and silver price history from 1970 to 2026. View 56-year historical spot rates in USD, annual high and low records, CAGR trends, and metal ratios.',
    url: 'https://nepacalc.com/international/gold-silver-price/history/',
    images: [{ url: 'https://nepacalc.com/images/og/international-gold-silver.jpg', width: 1200, height: 630, alt: 'Gold and Silver Price History (1970 - 2026)' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold and Silver Price History (1970-2026) | USD Rates',
    description: 'Explore gold and silver price history from 1970 to 2026. View 56-year historical spot rates in USD, annual high and low records, CAGR trends, and metal ratios.',
    images: ['https://nepacalc.com/images/og/international-gold-silver.jpg'],
  },
};

const TROY_OZ_TO_GRAMS = 31.1034768;

function fmtUSD(num: number | null | undefined): string {
  if (num == null || isNaN(num)) return '-';
  if (num >= 1000) {
    return '$' + new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
  }
  if (num >= 1) {
    return '$' + num.toFixed(2);
  }
  return '$' + num.toFixed(3);
}

export default function InternationalHistoryPage() {
  // Load historical dataset
  const histPath = path.join(process.cwd(), 'public', 'data', 'international-historical-rates.json');
  let histData: InternationalHistoryDataset = {
    goldYearly: [],
    silverYearly: [],
    milestones: {},
    cagr: { gold: {}, silver: {} },
  };

  try {
    const raw = fs.readFileSync(histPath, 'utf8');
    histData = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load international historical data', e);
  }

  // Load current live international rates for real-time comparison
  const liveRatesPath = path.join(process.cwd(), 'public', 'data', 'international-rates.json');
  let liveRates = { goldUSD: 3877.15, silverUSD: 47.49 };
  try {
    const liveRaw = fs.readFileSync(liveRatesPath, 'utf8');
    const parsed = JSON.parse(liveRaw);
    if (parsed.gold?.spotUSD) liveRates.goldUSD = parsed.gold.spotUSD;
    if (parsed.silver?.spotUSD) liveRates.silverUSD = parsed.silver.spotUSD;
  } catch (e) {}

  const goldRecords = histData.goldYearly || [];
  const silverRecords = histData.silverYearly || [];

  // Gold statistics
  let gMax = 0, gMin = Infinity, gSum = 0;
  goldRecords.forEach(r => {
    if (r.high > gMax) gMax = r.high;
    if (r.low < gMin) gMin = r.low;
    gSum += r.avg;
  });
  const avgGold = goldRecords.length > 0 ? gSum / goldRecords.length : 0;
  const latestGold = goldRecords[0] || null;
  const firstGold = goldRecords[goldRecords.length - 1] || null;

  // Silver statistics
  let sMax = 0, sMin = Infinity, sSum = 0;
  silverRecords.forEach(r => {
    if (r.high > sMax) sMax = r.high;
    if (r.low < sMin) sMin = r.low;
    sSum += r.avg;
  });
  const avgSilver = silverRecords.length > 0 ? sSum / silverRecords.length : 0;
  const latestSilver = silverRecords[0] || null;
  const firstSilver = silverRecords[silverRecords.length - 1] || null;

  // Milestone comparison data
  const milestoneYears = [
    { label: 'Bretton Woods Baseline', year: 1970, goldPeak: 35.00, silverPeak: 1.64, ratio: '21.3:1', catalyst: 'US statutory gold peg ($35/oz)' },
    { label: 'Great Stagflation Spike', year: 1980, goldPeak: 850.00, silverPeak: 49.45, ratio: '17.2:1', catalyst: 'Double-digit CPI & Hunt Brothers silver squeeze' },
    { label: 'Dot-Com Disinflation Low', year: 2001, goldPeak: 276.20, silverPeak: 4.57, ratio: '60.4:1', catalyst: 'Tech equities boom & European central bank selling' },
    { label: 'Global Debt Crisis High', year: 2011, goldPeak: 1921.18, silverPeak: 49.47, ratio: '38.8:1', catalyst: 'Quantitative easing (QE2) & US debt downgrade' },
    { label: 'COVID-19 Stimulus Peak', year: 2020, goldPeak: 2058.40, silverPeak: 29.78, ratio: '125.6:1', catalyst: 'Global zero interest rates & stimulus liquidity' },
    { label: 'Fed Rate Cut Rally', year: 2024, goldPeak: 2693.76, silverPeak: 34.85, ratio: '77.3:1', catalyst: 'Central bank de-dollarization & geopolitical risks' },
    { label: 'Modern All-Time Record High', year: 2026, goldPeak: 5477.79, silverPeak: 113.95, ratio: '48.1:1', catalyst: 'Record central bank buying & acute solar deficit' },
  ];

  // FAQ Items matching high search intent
  const faqItems = [
    {
      q: 'What is the highest gold price in US Dollar history (All-Time High)?',
      a: 'The highest gold spot price ever recorded in international bullion history is $5,477.79 per troy ounce ($176.12 per gram) in early 2026. For 22K jewelry gold, the equivalent peak reached $5,021.31 per ounce ($161.44 per gram). Prior major historical all-time highs occurred at $2,693.76 in 2024, $2,058.40 in 2020, $1,921.18 in 2011, and $850.00 in 1980.',
    },
    {
      q: 'What was the lowest gold price in modern history?',
      a: 'In modern post-Bretton Woods history (1970 to present), the lowest gold rate was $34.75 per troy ounce ($1.12 per gram) recorded in 1970 under the statutory convertibility peg. Following President Richard Nixon ending direct convertibility on August 15, 1971, the multi-decade structural low occurred near $252.80 per ounce in July 1999.',
    },
    {
      q: 'What has been the 50-year return (CAGR) for gold and silver?',
      a: 'Over the 50-year period from 1976 to 2026, gold generated a Compound Annual Growth Rate (CAGR) of approximately +8.7% per year, outpacing official consumer price inflation. Silver delivered a 50-year CAGR of approximately +6.9% per year with higher interim cyclical volatility.',
    },
    {
      q: 'What is the historical average for the Gold-to-Silver Ratio (GSR)?',
      a: 'Over the past century, the historical median Gold-to-Silver Ratio has hovered around 55:1. The ratio reached an all-time modern high of 125.6:1 in March 2020 during the global COVID liquidity crunch, and an all-time low of 17.2:1 in January 1980 during the Hunt Brothers silver squeeze.',
    },
    {
      q: 'How many grams are in a troy ounce for international bullion trading?',
      a: 'International wholesale precious metals are benchmarked in Troy Ounces (oz t), not standard avoirdupois ounces. Exactly 1 Troy Ounce equals 31.1034768 grams. To calculate the price per gram, divide the quoted spot price by 31.1035.',
    },
    {
      q: 'How much is gold and silver going for today compared to historical averages?',
      a: 'In today\'s market, live international gold and silver spot rates trade significantly above their 56-year historical averages. Today\'s gold and silver price in the international market is driven by central bank reserve accumulation, currency debasement hedges, and green industrial silver demand.',
    },
    {
      q: 'How does the gold and silver price in the international market convert to 1 tola gold price?',
      a: 'International bullion markets trade in troy ounces (31.1035 grams), while South Asian markets (Nepal, India) quote bullion per tola (1 tola = 11.6638 grams). Exactly 1 Troy Ounce equals 2.6664 tolas. To calculate the 1 tola gold price from international USD spot rates, divide the troy ounce price by 2.6664 (or multiply the per-gram rate by 11.664).',
    },
    {
      q: 'What is the price of silver per gram in US Dollars (سعر جرام الفضة بالدولار)?',
      a: 'The international spot price of silver per gram in USD is calculated by dividing the quoted troy ounce spot rate by 31.1035. For example, at a benchmark silver rate of $47.50 per ounce, 1 gram of .999 pure fine silver equals approximately $1.53 USD.',
    },
    {
      q: 'What is the difference between LBMA gold price live fixings and COMEX spot rates?',
      a: 'COMEX (New York) provides continuous real-time futures price discovery that powers live gold and silver rate feeds throughout the day. The LBMA (London Bullion Market Association) sets twice-daily electronic auction benchmarks (AM and PM fixings) used globally by central banks, institutional ETF custodians, and commercial refineries for physical contract settlement.',
    },
    {
      q: 'What drove the 1980 and 2011 historic gold bull markets?',
      a: 'The 1980 bull market ($850/oz) was propelled by double-digit US inflation, the Iranian hostage crisis, and Soviet invasion of Afghanistan. The 2011 surge ($1,921.18/oz) was driven by aggressive Federal Reserve quantitative easing following the 2008 crash, European sovereign debt contagion, and the first-ever downgrade of US federal debt creditworthiness.',
    },
  ];

  // Schema structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'International', item: 'https://nepacalc.com/international/' },
      { '@type': 'ListItem', position: 3, name: 'International Gold & Silver', item: 'https://nepacalc.com/international/gold-silver-price/' },
      { '@type': 'ListItem', position: 4, name: 'Price History (1970 - 2026)', item: 'https://nepacalc.com/international/gold-silver-price/history/' },
    ],
  };

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'International Gold and Silver Historical Price Dataset (1970 - 2026)',
    description: 'Official 56-year historical bullion dataset of wholesale gold and silver spot prices in USD per troy ounce and gram.',
    url: 'https://nepacalc.com/international/gold-silver-price/history/',
    temporalCoverage: '1970-01-01/2026-11-17',
    spatialCoverage: 'Global / US (COMEX & LBMA)',
    creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Gold and Silver Price History (1970 - 2026)',
    description: 'Explore 56 years of official international gold and silver spot price history in USD. View annual high, low, average rates, CAGR, and gold-silver ratios.',
    url: 'https://nepacalc.com/international/gold-silver-price/history/',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'NepaCalc',
      url: 'https://nepacalc.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NepaCalc',
      url: 'https://nepacalc.com',
      logo: 'https://nepacalc.com/logo.png',
    },
    datePublished: '2024-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans font-modern-ui">
      {/* ── JSON-LD Structured Data ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-800">

        {/* ── Breadcrumb Navigation ── */}
        <nav aria-label="Breadcrumb" className="w-full">
          <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-amber-700 hover:underline">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/international/" className="hover:text-amber-700 hover:underline">International</Link>
            <span className="text-slate-300">/</span>
            <Link href="/international/gold-silver-price/" className="hover:text-amber-700 hover:underline">International Gold &amp; Silver</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">Price History (1970 - 2026)</span>
          </div>
        </nav>

        {/* ── H1 Header & Lead Introduction ── */}
        <header className="w-full space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Gold and Silver Price History (1970 - 2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Explore official <strong>gold and silver price history</strong> from 1970 to 2026. Analyze 56 years of international bullion spot rates in US Dollars (USD), multi-decade CAGR growth metrics, annual record highs and lows, and historical gold-to-silver valuation ratios.
          </p>
        </header>

        {/* ── Official Style History Explorer with Instant Tracker ── */}
        <div className="w-full space-y-3">
          <InternationalHistoryClient initialData={histData} currentLiveRates={liveRates} />

          {/* ── Quick Real-Time / Closing Rate Tracker ── */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-amber-50/90 border border-amber-200/90 rounded-xl text-xs sm:text-sm text-amber-950 font-medium shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-amber-900">Live US Market Benchmark:</span>
              <span>Gold {fmtUSD(liveRates.goldUSD)} / oz</span>
              <span className="text-amber-300">•</span>
              <span>Silver {fmtUSD(liveRates.silverUSD)} / oz</span>
              <span className="text-amber-300">•</span>
              <span>GSR {(liveRates.goldUSD / liveRates.silverUSD).toFixed(1)}:1</span>
            </div>
            <Link href="/international/gold-silver-price/" className="text-amber-700 underline font-bold hover:text-amber-800 text-xs sm:text-sm">
              View Today&apos;s Live Rate →
            </Link>
          </div>
        </div>

        {/* ── Official All-Time Highest & Lowest Record Snapshot Cards (Matching Nepal History Structure) ── */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Highest Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-amber-200/80 pb-2.5 mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded">
                    Official All-Time Record High
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    Highest Bullion Rates Till Date
                  </h2>
                </div>
                <div className="text-[11px] text-slate-600 sm:text-right">
                  <span className="font-bold text-slate-800">Peak Year:</span> 2026
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">24K Gold (1 Troy Oz)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">$5,477.79</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">$176.12 / gram</p>
                </div>
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">22K Gold (1 Troy Oz)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">$5,021.31</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">$161.44 / gram</p>
                </div>
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">Silver (1 Troy Oz)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">$113.95</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">$3.66 / gram</p>
                </div>
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">Silver (1 Kilogram)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">$3,663.61</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">1,000g benchmark</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lowest Card */}
          <div className="bg-gradient-to-br from-slate-500/10 via-slate-500/5 to-transparent border border-slate-300/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-2.5 mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded">
                    Official All-Time Record Low
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    Lowest Bullion Rates (1970 - 2026)
                  </h2>
                </div>
                <div className="text-[11px] text-slate-600 sm:text-right">
                  <span className="font-bold text-slate-800">Peg Era:</span> 1970 - 1971
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">24K Gold (1 Troy Oz)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">$35.00</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">$1.13 / gram (Bretton Woods)</p>
                </div>
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">22K Gold (1 Troy Oz)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">$32.08</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">$1.03 / gram</p>
                </div>
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">Silver (1 Troy Oz)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">$1.29</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">$0.04 / gram (Nov 1971)</p>
                </div>
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">Silver (1 Kilogram)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">$41.47</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">1,000g low baseline</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO-friendly hidden table for search engine crawling */}
        <section className="sr-only" aria-hidden="true">
          <table>
            <caption>International Gold and Silver Price History in USD</caption>
            <thead>
              <tr>
                <th>Year</th>
                <th>Gold High USD</th>
                <th>Gold Low USD</th>
                <th>Gold Average USD</th>
                <th>Silver Average USD</th>
              </tr>
            </thead>
            <tbody>
              {goldRecords.slice(0, 30).map((row) => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td>${row.high}</td>
                  <td>${row.low}</td>
                  <td>${row.avg}</td>
                  <td>${silverRecords.find(s => s.year === row.year)?.avg || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── In-Depth Article: The History of Gold and Silver Prices ── */}
        <article className="w-full space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            The History of Gold and Silver Prices: Long-Term Trends &amp; Milestones
          </h2>
          <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              Analyzing <strong>gold and silver price history</strong> reveals a profound structural transformation in international finance over the past 56 years. From statutory gold standard pegs to modern electronic derivatives, precious metals have consistently served as primary central bank reserves, geopolitical hedges against sovereign debt expansion, and enduring stores of purchasing power.
            </p>
            <p>
              Under the 1944 Bretton Woods Agreement, gold was fixed at <strong>$35.00 per troy ounce</strong>. On August 15, 1971, President Richard Nixon suspended direct dollar convertibility, initiating modern price discovery. During the 1970s stagflation cycle, gold reached $850.00/oz in January 1980, while silver surged to $49.45/oz during the Hunt Brothers silver squeeze.
            </p>
            <p>
              Following a 20-year consolidation, the 2008 Global Financial Crisis and monetary quantitative easing fueled gold to a peak of <strong>$1,921.18 per ounce</strong> in 2011. Escalating global central bank accumulation and supply deficits pushed gold past $5,000/oz and silver past $100/oz in 2026.
            </p>
          </div>

          {/* Featured Infographic / Image with SEO Alt Text and Explicit Dimensions */}
          <figure className="my-6 overflow-hidden rounded-2xl border border-slate-200">
            <img
              src="/images/og/international-gold-silver.jpg"
              alt="Gold and Silver Price History from 1970 to 2026 Historical Spot Trends in USD"
              width={1200}
              height={630}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover max-h-[360px]"
            />
            <figcaption className="bg-slate-50 px-4 py-2 text-xs text-slate-500 text-center border-t border-slate-200">
              Official 56-year bullion benchmark cycle for gold and silver spot rates (1970 - 2026) in US Dollars.
            </figcaption>
          </figure>

          {/* Milestone Years Comparison Table */}
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">
                Year-by-Year Gold &amp; Silver Milestone Comparison (1970 - 2026)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 py-3">Era / Milestone</th>
                    <th scope="col" className="px-4 py-3">Year</th>
                    <th scope="col" className="px-4 py-3 text-right">Gold Peak ($/oz)</th>
                    <th scope="col" className="px-4 py-3 text-right">Silver Peak ($/oz)</th>
                    <th scope="col" className="px-4 py-3 text-right">GSR</th>
                    <th scope="col" className="px-4 py-3">Primary Market Catalyst</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {milestoneYears.map(m => (
                    <tr key={m.year} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900">{m.label}</td>
                      <td className="px-4 py-3 text-slate-600">{m.year}</td>
                      <td className="px-4 py-3 text-right font-semibold text-amber-700">{fmtUSD(m.goldPeak)}</td>
                      <td className="px-4 py-3 text-right text-slate-800 font-bold">{fmtUSD(m.silverPeak)}</td>
                      <td className="px-4 py-3 text-right text-slate-700 font-semibold">{m.ratio}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{m.catalyst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Explanatory Paragraphs ── */}
          <div className="space-y-4 pt-6 border-t border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900">
              Understanding Precious Metals Denominations: From Grams to Troy Ounces
            </h3>
            <p>
              Wholesale bullion benchmarks on the New York Mercantile Exchange (COMEX) and the London Bullion Market Association (LBMA) trade in troy ounces, while retail jewelry and metric coin markets trade in grams and kilograms:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
              <li><strong>1 Troy Ounce:</strong> Exactly 31.1034768 grams, the universal standard for institutional bullion trading.</li>
              <li><strong>1 Tola (South Asian Benchmark):</strong> 11.6638 grams (1 Troy Ounce = 2.6664 tolas). Widely used for 1 tola gold price and silver jewelry valuation in Nepal, India, and regional bullion markets.</li>
              <li><strong>1 Gram:</strong> Common retail metric unit for fine jewelry and small investment bars (useful for calculating the price of silver per gram in USD and international currencies).</li>
              <li><strong>10 Grams:</strong> Standard consumer investment denomination across international retail gold markets.</li>
              <li><strong>1 Kilogram:</strong> Equal to 32.1507 troy ounces (1,000 grams), the primary wholesale standard for commercial delivery bars.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 pt-2">
              24K Pure Gold vs. 22K and 14K Jewelry Standards
            </h3>
            <p>
              In global bullion trade, <strong>24 Karat (24K) Gold</strong> denotes 99.99% pure gold (.9999 fine). Because 24K gold is ductile, jewelry fabricators blend pure gold with silver and copper to produce durable <strong>22 Karat (91.6% purity)</strong> and <strong>14 Karat (58.3% purity)</strong> items. Pricing for lower karats is derived directly by multiplying the 24K spot price by the respective purity fraction.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">
              All-Time High vs. Historical Low: 56-Year Price Expansion
            </h3>
            <p>
              The structural divergence between the 1970 baseline of <strong>$35.00 per ounce</strong> and the modern all-time peak of <strong>$5,477.79 per ounce</strong> reflects an annualized nominal growth rate of +8.7% over 50 years. This long-term trajectory confirms gold&apos;s function as a wealth preservation asset that protects real purchasing power across currency devaluations.
            </p>
          </div>
        </article>

        {/* ── Historical Gold Rate Statistics Table ── */}
        <section className="w-full">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Historical Gold Rate Statistics (USD)</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-3">Statistic</th>
                  <th scope="col" className="px-6 py-3 text-right">Value (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Highest 24K gold rate per ounce</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">{fmtUSD(gMax)} / oz</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Lowest 24K gold rate per ounce</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">{fmtUSD(gMin)} / oz</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">56-Year average 24K gold rate per ounce</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">{fmtUSD(avgGold)} / oz</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">First recorded gold rate per ounce (1970)</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">
                    {fmtUSD(firstGold?.close ?? 35)} / oz <span className="font-normal text-xs text-slate-500 block">statutory peg</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Latest recorded gold rate per ounce (2026)</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">
                    {fmtUSD(liveRates.goldUSD)} / oz <span className="font-normal text-xs text-slate-500 block">live wholesale spot</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Historical Silver Rate Statistics Table ── */}
        <section className="w-full">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Historical Silver Rate Statistics (USD)</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-3">Statistic</th>
                  <th scope="col" className="px-6 py-3 text-right">Value (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Highest silver rate per ounce</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">{fmtUSD(sMax)} / oz</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Lowest silver rate per ounce</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">{fmtUSD(sMin)} / oz</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">56-Year average silver rate per ounce</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">{fmtUSD(avgSilver)} / oz</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">First recorded silver rate per ounce (1970)</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">
                    {fmtUSD(firstSilver?.close ?? 1.64)} / oz
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Latest recorded silver rate per ounce (2026)</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">
                    {fmtUSD(liveRates.silverUSD)} / oz <span className="font-normal text-xs text-slate-500 block">live wholesale spot</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Frequently Asked Questions (FAQ) ── */}
        <section className="w-full bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions: Gold and Silver History
          </h2>
          <div className="divide-y divide-slate-100">
            {faqItems.map((faq, i) => (
              <div key={i} className="py-4 space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Market Tools & Internal Links ── */}
        <section className="w-full bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Explore Related Precious Metals &amp; Currency Benchmarks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            <Link
              href="/international/gold-silver-price/"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all flex flex-col justify-between"
            >
              <span className="text-sm font-bold text-slate-900 hover:text-amber-800">
                Live Gold &amp; Silver Spot Rates (USA) →
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Real-time wholesale bullion spot prices per troy ounce, gram, and 10g in USD.
              </span>
            </Link>
            <Link
              href="/international/gold-silver-ratio/"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all flex flex-col justify-between"
            >
              <span className="text-sm font-bold text-slate-900 hover:text-amber-800">
                Gold-to-Silver Ratio (Live GSR) →
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Interactive historical ratio calculator, silver swap value, and valuation bands.
              </span>
            </Link>
            <Link
              href="/international/dubai-gold-rate/"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all flex flex-col justify-between"
            >
              <span className="text-sm font-bold text-slate-900 hover:text-amber-800">
                Dubai Gold Rate Today (AED &amp; USD) →
              </span>
              <span className="text-xs text-slate-500 mt-1">
                24K, 22K, 21K, and 18K retail jewelry prices in Dubai with tourist VAT refunds.
              </span>
            </Link>
            <Link
              href="/market-rates/history/"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all flex flex-col justify-between"
            >
              <span className="text-sm font-bold text-slate-900 hover:text-amber-800">
                Nepal Gold Price History (FENEGOSIDA) →
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Official historical records of hallmark gold and silver rates in Nepal (NPR per tola).
              </span>
            </Link>
            <Link
              href="/market-rates/live-gold-price/"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all flex flex-col justify-between"
            >
              <span className="text-sm font-bold text-slate-900 hover:text-amber-800">
                Today Gold Price in Nepal (Live NPR) →
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Current hallmark gold and tejabi gold rates per tola and 10 grams in Kathmandu.
              </span>
            </Link>
            <Link
              href="/international/"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all flex flex-col justify-between"
            >
              <span className="text-sm font-bold text-slate-900 hover:text-amber-800">
                International Market Hub →
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Browse global commodities, platinum, palladium, copper, and currency converters.
              </span>
            </Link>
          </div>

          {/* ── Official Institutional Sources ── */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
            <span className="font-bold text-slate-700">Authoritative Market Sources:</span>
            <a
              href="https://www.gold.org"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:text-amber-700 hover:underline"
            >
              World Gold Council (WGC) ↗
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="https://www.lbma.org.uk"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:text-amber-700 hover:underline"
            >
              LBMA Precious Metals Benchmark ↗
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="https://www.cmegroup.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:text-amber-700 hover:underline"
            >
              CME Group COMEX Futures ↗
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
