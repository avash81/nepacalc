import React from 'react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import InternationalHistoryClient, { InternationalHistoricalData } from './InternationalHistoryClient';

export const metadata: Metadata = {
  title: 'Gold & Silver Price History (1970-2026) - Historical Spot Rates USD',
  description: 'Complete 50+ year historical record of US and international gold and silver spot prices in USD per ounce and gram. View yearly highs, lows, annual return percentages, all-time record peaks, and gold-silver ratio history.',
  keywords: [
    'gold price history',
    'historical gold prices',
    'gold price history 10 years',
    'gold price history 50 years',
    'gold and silver price history',
    'historical silver prices',
    'silver price history 1970 to 2026',
    'gold price per ounce history',
    'all time high gold price usd',
    'highest gold price in history',
    'highest silver price in history',
    'gold price history chart',
    'yearly gold price table',
    'gold return history',
    'gold silver ratio history',
    'comex historical gold prices',
    'lbma gold price history',
    'inflation adjusted gold price',
    'gold price in 1980',
    'gold price in 2011',
    'gold price in 2020',
    'gold price in 2024',
    'historical gold price per gram',
    'historical silver price per ounce',
    'us dollar gold price history',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/international/gold-silver-price/history/',
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
    siteName: 'NepaCalc Financial & Precious Metals',
    title: 'Gold & Silver Price History (1970-2026) - Historical Spot Rates USD',
    description: 'Complete 50+ year historical record of US and international gold and silver spot prices in USD. Yearly averages, record highs, annual returns, and macro drivers.',
    url: 'https://nepacalc.com/international/gold-silver-price/history/',
    images: [
      {
        url: 'https://nepacalc.com/images/og/international-gold-silver-history.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold and Silver Price History 1970 to 2026 in USD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold & Silver Price History (1970-2026) - Historical Spot Rates USD',
    description: 'Complete 50+ year historical record of US and international gold and silver spot prices in USD per ounce and gram.',
    images: ['https://nepacalc.com/images/og/international-gold-silver-history.jpg'],
  },
};

export default function InternationalGoldSilverHistoryPage() {
  // Load historical dataset
  const histPath = path.join(process.cwd(), 'public', 'data', 'international-historical-rates.json');
  let histData: InternationalHistoricalData | null = null;
  try {
    const raw = fs.readFileSync(histPath, 'utf8');
    histData = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load international historical data', e);
  }

  // Load current live international rates for real-time comparison chip
  const liveRatesPath = path.join(process.cwd(), 'public', 'data', 'international-rates.json');
  let liveRates = { goldUSD: 3877.15, silverUSD: 47.49 };
  try {
    const liveRaw = fs.readFileSync(liveRatesPath, 'utf8');
    const parsed = JSON.parse(liveRaw);
    if (parsed.gold?.spotUSD) liveRates.goldUSD = parsed.gold.spotUSD;
    if (parsed.silver?.spotUSD) liveRates.silverUSD = parsed.silver.spotUSD;
  } catch (e) {}

  if (!histData) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 font-modern-ui">
        <p className="text-red-600 font-bold">Historical dataset temporarily unavailable.</p>
      </main>
    );
  }

  const { milestones, cagr } = histData;

  // Real Google People Also Ask FAQs
  const faqItems = [
    {
      name: 'What was the highest gold price in history in US Dollars?',
      acceptedAnswer: {
        text: `The highest nominal gold price ever recorded in history is $${milestones.gold.allTimeHigh.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} per troy ounce, set in ${milestones.gold.allTimeHigh.year} (${milestones.gold.allTimeHigh.date}). This milestone was driven by massive sovereign central bank bullion purchases, global de-dollarization initiatives, and elevated geopolitical safe-haven demand. Prior historic peaks occurred at $1,921.18/oz in September 2011 and $850.00/oz in January 1980.`,
      },
    },
    {
      name: 'What was the highest silver price in history in US Dollars?',
      acceptedAnswer: {
        text: `The highest nominal silver price ever recorded in history is $${milestones.silver.allTimeHigh.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} per troy ounce, recorded in ${milestones.silver.allTimeHigh.year}. This historic advance was propelled by an acute structural supply deficit driven by massive global industrial consumption in photovoltaic solar cells and electric vehicle electronics. Previous historical peaks reached $49.47/oz in April 2011 and $49.45/oz in January 1980 during the famous Hunt Brothers silver squeeze.`,
      },
    },
    {
      name: 'What was the price of gold in 1970 and 1980?',
      acceptedAnswer: {
        text: 'In 1970, gold was statutorily pegged under the Bretton Woods monetary agreement at $35.00 per troy ounce (and closed the year near $37.38/oz). Following President Richard Nixon ending direct convertibility of the US dollar into gold on August 15, 1971, gold surged dramatically. By January 1980, amid rampant double-digit stagflation and the Iranian hostage crisis, gold peaked at an intraday high of $850.00 per ounce, representing an extraordinary 2,328% price appreciation over that decade.',
      },
    },
    {
      name: 'How much has gold appreciated over the last 10, 20, and 50 years?',
      acceptedAnswer: {
        text: `Over the past 50 years (1976 to 2026), gold has delivered a compound annual growth rate (CAGR) of approximately +${cagr.gold.fiftyYear}% per year. Over the last 20 years (2006 to 2026), gold appreciated at +${cagr.gold.twentyYear}% per year. Over the past 10 years (2016 to 2026), gold delivered a CAGR of approximately +${cagr.gold.tenYear}% per year, consistently outpacing official consumer price index (CPI) inflation and acting as a premier long-term wealth preservation asset.`,
      },
    },
    {
      name: 'What is the historical average for the Gold-to-Silver Ratio?',
      acceptedAnswer: {
        text: `Over the past century, the historical average Gold-to-Silver Ratio has been approximately 55:1 to 65:1. The ratio reached an all-time modern high of 125.6:1 in March 2020 during the initial global COVID-19 liquidity shock, and an all-time low of 17.2:1 in January 1980 during the Hunt Brothers silver squeeze. When the ratio trades above 80:1, precious metals analysts historically consider silver undervalued relative to gold.`,
      },
    },
    {
      name: 'How do you calculate historical gold price per gram from price per ounce?',
      acceptedAnswer: {
        text: 'Precious metals spot prices are quoted in Troy Ounces, not standard avoirdupois ounces. Exactly 1 Troy Ounce equals 31.1034768 grams. To calculate the price per gram, divide the quoted spot price per ounce by 31.1035. For example, at $3,877.15 per troy ounce, 1 gram of pure 24K gold is worth $3,877.15 / 31.1035 = $124.65 per gram.',
      },
    },
    {
      name: 'What caused the huge gold bull market in 2011?',
      acceptedAnswer: {
        text: 'The 2011 gold bull market peaked at $1,921.18 per ounce following the 2008 Global Financial Crisis. Key drivers included the US Federal Reserve unprecedented quantitative easing (QE1 and QE2), zero interest rate policies (ZIRP), the European Sovereign Debt Crisis threatening the Eurozone banking system, and Standard & Poor historic downgrade of the US federal government AAA credit rating.',
      },
    },
    {
      name: 'Why did the price of gold stay at $35 per ounce for so long?',
      acceptedAnswer: {
        text: 'Under the 1944 Bretton Woods international monetary agreement, foreign central banks could redeem US dollars for physical gold directly from the US Treasury at a legally mandated statutory price of $35.00 per ounce. This fixed peg maintained price stability until escalating US budget deficits from the Vietnam War and Great Society programs led foreign nations to drain US gold reserves, forcing President Nixon to terminate gold convertibility on August 15, 1971.',
      },
    },
    {
      name: 'Is gold or silver a better long-term investment historically?',
      acceptedAnswer: {
        text: 'Historically, gold has offered superior stability, lower price volatility, and deeper institutional liquidity, making it the preferred sovereign reserve asset and portfolio insurance. Silver has experienced higher percentage returns during speculative and industrial expansions (e.g. 1979-1980, 2010-2011, and 2025-2026), but also suffers deeper drawdowns during industrial slowdowns due to its dual identity as both an investment metal and an industrial commodity.',
      },
    },
    {
      name: 'Why do physical bullion coins cost more than the historical spot price?',
      acceptedAnswer: {
        text: 'Historical spot prices represent the raw wholesale benchmark for large commercial delivery bars traded on COMEX or the London OTC market (such as 400 oz gold bars or 1,000 oz silver bars). When purchasing retail physical bullion coins (like American Gold Eagles or Canadian Maple Leafs), buyers pay a dealer premium over spot (typically 2% to 6% for gold coins and 10% to 25% for silver coins) to cover government mint fabrication, security transport, insurance, and retail dealer margin.',
      },
    },
  ];

  // Comprehensive @graph schema
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/gold-silver-price/history/#webpage',
        url: 'https://nepacalc.com/international/gold-silver-price/history/',
        name: 'Gold & Silver Price History (1970-2026) - Historical Spot Rates USD',
        description: 'Complete 50+ year historical record of US and international gold & silver spot prices in USD per ounce and gram.',
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          name: 'NepaCalc',
          url: 'https://nepacalc.com',
        },
        breadcrumb: {
          '@id': 'https://nepacalc.com/international/gold-silver-price/history/#breadcrumb',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/international/gold-silver-price/history/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
          { '@type': 'ListItem', position: 2, name: 'International', item: 'https://nepacalc.com/international/' },
          { '@type': 'ListItem', position: 3, name: 'International Gold & Silver', item: 'https://nepacalc.com/international/gold-silver-price/' },
          { '@type': 'ListItem', position: 4, name: 'Price History (1970-2026)', item: 'https://nepacalc.com/international/gold-silver-price/history/' },
        ],
      },
      {
        '@type': 'Dataset',
        '@id': 'https://nepacalc.com/international/gold-silver-price/history/#dataset',
        name: 'International Gold & Silver Historical Price Dataset (1970-2026)',
        description: 'Annual benchmark pricing data for physical gold and silver in US Dollars (USD) per troy ounce and gram, including yearly average, high, low, close, and annual return percentages.',
        url: 'https://nepacalc.com/international/gold-silver-price/history/',
        temporalCoverage: '1970-01-01/2026-11-17',
        spatialCoverage: 'Global / United States (COMEX & LBMA)',
        isAccessibleForFree: true,
        inLanguage: 'en-US',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
        variableMeasured: [
          'Gold Annual Average Price USD per Troy Ounce',
          'Gold Annual High Price USD per Troy Ounce',
          'Gold Annual Low Price USD per Troy Ounce',
          'Gold Annual Return Percentage',
          'Silver Annual Average Price USD per Troy Ounce',
          'Silver Annual High Price USD per Troy Ounce',
          'Silver Annual Low Price USD per Troy Ounce',
          'Silver Annual Return Percentage',
          'Gold-to-Silver Ratio',
          'Gold Compound Annual Growth Rate (CAGR)',
        ],
        measurementTechnique: 'Official LBMA Gold Price Fixings and COMEX Continuous Futures Trading Data',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://nepacalc.com/international/gold-silver-price/history/#faq',
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.acceptedAnswer.text,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124] font-modern-ui">
      {/* ── JSON-LD Structured Data ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />

      {/* ── Breadcrumb Navigation ── */}
      <div className="max-w-6xl mx-auto px-4 pt-3 sm:pt-5">
        <nav aria-label="Breadcrumb" className="mb-2">
          <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/international/" className="hover:text-blue-600 hover:underline">International</Link>
            <span className="text-gray-300">/</span>
            <Link href="/international/gold-silver-price/" className="hover:text-blue-600 hover:underline">International Gold &amp; Silver</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">Price History (1970 - 2026)</span>
          </div>
        </nav>
      </div>

      {/* ── CLIENT INTERACTIVE EXPLORER (Toolbar, Table FIRST, Chart SECOND) ── */}
      <InternationalHistoryClient initialData={histData} currentLiveRates={liveRates} />

      {/* ── POST-DATASET ANALYTICS, ATH/ATL RECORDS & EDITORIAL ── */}
      <section className="max-w-6xl mx-auto px-4 pb-12 space-y-6">

        {/* ── Live Spot Real-Time Benchmark Tracker (Below Dataset) ── */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-amber-50/90 border border-amber-200/90 rounded-2xl text-xs sm:text-sm text-amber-950 font-medium shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-amber-900">Live US Market Benchmark:</span>
            <span>Gold ${liveRates.goldUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} / oz (${(liveRates.goldUSD / 31.1034768).toFixed(2)}/g)</span>
            <span className="text-amber-300">•</span>
            <span>Silver ${liveRates.silverUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} / oz (${(liveRates.silverUSD / 31.1034768).toFixed(2)}/g)</span>
            <span className="text-amber-300">•</span>
            <span>GSR {(liveRates.goldUSD / liveRates.silverUSD).toFixed(1)}:1</span>
          </div>
          <Link href="/international/gold-silver-price/" className="text-amber-700 underline font-bold hover:text-amber-800 text-xs sm:text-sm">
            View Live Price Dashboard →
          </Link>
        </div>

        {/* ── Official All-Time Highest & Lowest Record Snapshot Cards (Matching Nepal History Structure) ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <span className="font-bold text-slate-800">Peak Year:</span> {milestones.gold.allTimeHigh.year}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">24K Gold (1 Troy Oz)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">
                    ${milestones.gold.allTimeHigh.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                    ${(milestones.gold.allTimeHigh.price / 31.1034768).toFixed(2)} / gram
                  </p>
                </div>
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">22K Gold (1 Troy Oz)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">
                    ${(milestones.gold.allTimeHigh.price * 22 / 24).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                    ${(milestones.gold.allTimeHigh.price * 22 / 24 / 31.1034768).toFixed(2)} / gram
                  </p>
                </div>
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">Silver (1 Troy Oz)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">
                    ${milestones.silver.allTimeHigh.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                    ${(milestones.silver.allTimeHigh.price / 31.1034768).toFixed(2)} / gram
                  </p>
                </div>
                <div className="bg-white/95 p-2.5 sm:p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">Silver (1 Kilogram)</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">
                    ${Math.round(milestones.silver.allTimeHigh.price / 31.1034768 * 1000).toLocaleString('en-US')}
                  </p>
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
        </div>

        {/* ── AI DIRECT ANSWER SUMMARY BOX (High-Priority AI Overview Snippet - Below Dataset/Records) ── */}
        <div className="bg-gradient-to-r from-amber-50 via-white to-blue-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-[#059669] text-white tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Historical Key Facts
            </span>
            <span className="text-xs font-bold text-gray-600">56-Year Precious Metals Record Snapshot</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="bg-white/90 p-3 rounded-xl border border-amber-100 shadow-xs">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Gold All-Time Peak</span>
              <span className="text-lg sm:text-xl font-extrabold text-gray-900 block mt-0.5">
                ${milestones.gold.allTimeHigh.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} / oz
              </span>
              <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                Set in {milestones.gold.allTimeHigh.year} (${(milestones.gold.allTimeHigh.price / 31.1034768).toFixed(2)}/g). Prior peaks: $1,921.18 in 2011, $850.00 in 1980.
              </p>
            </div>

            <div className="bg-white/90 p-3 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Silver All-Time Peak</span>
              <span className="text-lg sm:text-xl font-extrabold text-gray-900 block mt-0.5">
                ${milestones.silver.allTimeHigh.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} / oz
              </span>
              <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                Set in {milestones.silver.allTimeHigh.year} (${(milestones.silver.allTimeHigh.price / 31.1034768).toFixed(2)}/g). Prior peaks: $49.47 in 2011, $49.45 in 1980.
              </p>
            </div>

            <div className="bg-white/90 p-3 rounded-xl border border-blue-100 shadow-xs">
              <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">Long-Term Annual Return (50Y)</span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-700 block mt-0.5">
                +{cagr.gold.fiftyYear}% / year
              </span>
              <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                Gold appreciated from $35.00/oz in 1970 to over $3,800/oz today, delivering +8.7% annualized nominal gains.
              </p>
            </div>
          </div>
        </div>

        {/* ── Historical Milestone Comparison Table (Brought Above Editorial Article) ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Historical Milestone Comparison: Gold vs. Silver (1970 - 2026)
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4">
            Key benchmark prices at defining historical turning points in US Dollars per troy ounce.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-gray-200 uppercase text-[11px]">
                <tr>
                  <th scope="col" className="px-4 py-3">Era / Milestone</th>
                  <th scope="col" className="px-4 py-3">Year</th>
                  <th scope="col" className="px-4 py-3 text-right">Gold Peak ($/oz)</th>
                  <th scope="col" className="px-4 py-3 text-right">Silver Peak ($/oz)</th>
                  <th scope="col" className="px-4 py-3 text-right">Gold-Silver Ratio</th>
                  <th scope="col" className="px-4 py-3">Primary Market Catalyst</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-gray-900">Bretton Woods Baseline</td>
                  <td className="px-4 py-3 text-gray-600">1970</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">$35.00</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">$1.64</td>
                  <td className="px-4 py-3 text-right text-gray-700">21.3:1</td>
                  <td className="px-4 py-3 text-gray-600">US statutory gold convertibility</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-gray-900">Great Stagflation Spike</td>
                  <td className="px-4 py-3 text-gray-600">1980</td>
                  <td className="px-4 py-3 text-right font-bold text-amber-700">$850.00</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-700">$49.45</td>
                  <td className="px-4 py-3 text-right text-emerald-700 font-bold">17.2:1</td>
                  <td className="px-4 py-3 text-gray-600">Double-digit inflation &amp; Hunt Brothers corner</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-gray-900">Dot-Com Disinflation Low</td>
                  <td className="px-4 py-3 text-gray-600">2001</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">$276.20</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">$4.57</td>
                  <td className="px-4 py-3 text-right text-gray-700">60.4:1</td>
                  <td className="px-4 py-3 text-gray-600">Tech equity boom &amp; European central bank sales</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-gray-900">Post-Financial Crisis High</td>
                  <td className="px-4 py-3 text-gray-600">2011</td>
                  <td className="px-4 py-3 text-right font-bold text-amber-700">$1,921.18</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-700">$49.47</td>
                  <td className="px-4 py-3 text-right text-gray-700">38.8:1</td>
                  <td className="px-4 py-3 text-gray-600">Quantitative easing (QE2) &amp; US debt downgrade</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-gray-900">COVID-19 Stimulus Peak</td>
                  <td className="px-4 py-3 text-gray-600">2020</td>
                  <td className="px-4 py-3 text-right font-bold text-amber-700">$2,058.40</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-700">$29.78</td>
                  <td className="px-4 py-3 text-right text-rose-700 font-bold">125.6:1</td>
                  <td className="px-4 py-3 text-gray-600">Zero interest rates &amp; global monetary easing</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-gray-900">Fed Rate Cut Rally</td>
                  <td className="px-4 py-3 text-gray-600">2024</td>
                  <td className="px-4 py-3 text-right font-bold text-amber-700">$2,693.76</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-700">$34.85</td>
                  <td className="px-4 py-3 text-right text-gray-700">77.3:1</td>
                  <td className="px-4 py-3 text-gray-600">Central bank reserves &amp; geopolitical risk</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-amber-50/50">
                  <td className="px-4 py-3 font-bold text-gray-900">Modern All-Time Record High</td>
                  <td className="px-4 py-3 text-gray-600 font-bold">2026</td>
                  <td className="px-4 py-3 text-right font-extrabold text-amber-800">$5,477.79</td>
                  <td className="px-4 py-3 text-right font-extrabold text-slate-800">$113.95</td>
                  <td className="px-4 py-3 text-right text-gray-900 font-bold">48.1:1</td>
                  <td className="px-4 py-3 text-gray-600 font-semibold">De-dollarization &amp; acute solar industrial squeeze</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Long-Term Historical Trends Article */}
        <article className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <header className="border-b border-gray-200 pb-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Historical Bullion Analysis</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
              The Modern History of Gold and Silver Prices (1970 - 2026)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              A comprehensive chronicle of the five distinct macroeconomic eras that shaped modern precious metals markets.
            </p>
          </header>

          <div className="space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                1. The Bretton Woods Era and the $35/oz Statutory Gold Peg (1944 - 1971)
              </h3>
              <p>
                Following the 1944 Bretton Woods Agreement, the international monetary architecture was anchored directly to the US Dollar, which in turn was statutorily convertible into gold at exactly <strong>$35.00 per troy ounce</strong> for foreign central banks. Under this system, gold traded in a virtually fixed corridor for over a quarter-century. However, expanding US fiscal deficits from the Vietnam War and social spending created an overhang of foreign-held dollars exceeding US physical gold reserves. Facing persistent French and European gold repatriations, President Richard Nixon unilaterally announced the suspension of dollar convertibility into gold on <strong>August 15, 1971</strong> (the famous &ldquo;Nixon Shock&rdquo;), ending the gold standard and initiating the modern free-floating bullion market.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                2. The 1970s Great Stagflation &amp; The Historic 1980 Peak
              </h3>
              <p>
                Once freed from statutory pricing controls, gold appreciated with extraordinary velocity throughout the 1970s as western economies endured double-digit CPI inflation, OPEC oil shocks, and currency debasement. On <strong>January 21, 1980</strong>, spot gold spiked to an intraday record of <strong>$850.00 per ounce</strong> - representing an astonishing 2,328% gain over its 1971 base. Simultaneously, Texas oil billionaires Nelson Bunker Hunt and William Herbert Hunt accumulated an estimated 200 million ounces of physical silver and COMEX futures contracts, sending spot silver from under $6.00/oz in 1979 to a record high of <strong>$49.45 per ounce</strong> on January 18, 1980. The silver bubble culminated in &ldquo;Silver Thursday&rdquo; on March 27, 1980, after COMEX altered margin rules to force liquidation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                3. The Two-Decade Bear Market &amp; Central Bank Selling (1981 - 2000)
              </h3>
              <p>
                Under Federal Reserve Chairman Paul Volcker, US short-term interest rates reached 20%, driving real yields positive and crushing inflation expectations. This initiated a 20-year structural bear market for precious metals. Gold drifted lower, finding a generational bottom near $252.80/oz in July 1999 (the &ldquo;Brown Bottom,&rdquo; named after UK Chancellor Gordon Brown selling half of Britain&apos;s gold reserves). During this prolonged disinflationary cycle, silver consolidated between $3.50 and $6.00 per ounce.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                4. The 2000s Commodities Super-Cycle &amp; The 2011 Post-Crisis Surge
              </h3>
              <p>
                The new millennium marked the birth of a major bull run. The launch of the SPDR Gold Shares ETF (GLD) in November 2004 democratized institutional and retail bullion allocation without physical vaulting logistics. The 2008 Global Financial Crisis triggered aggressive central bank quantitative easing (QE), zero interest rate policies (ZIRP), and balance sheet expansion. By <strong>September 6, 2011</strong>, gold reached an all-time nominal high of <strong>$1,921.18 per ounce</strong> amid European Sovereign Debt crises and the first-ever S&amp;P downgrade of US sovereign credit. Silver concurrently matched its 1980 peak, touching <strong>$49.47 per ounce</strong> in April 2011.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                5. Central Bank De-Dollarization &amp; The 2026 Structural Records
              </h3>
              <p>
                Following the 2022 Western freezing of Russian central bank foreign exchange reserves, sovereign central banks worldwide dramatically accelerated physical gold purchases, setting consecutive annual net accumulation records above 1,000 metric tons. Concurrently, silver entered its fourth consecutive year of structural supply deficits, driven by exploding industrial demand in photovoltaic (PV) solar panels, electric vehicles, and AI computing hardware. These dual forces drove gold past $5,000/oz and silver past $100/oz in early 2026, establishing the current modern all-time peaks.
              </p>
            </div>
          </div>
        </article>

        {/* The Gold-to-Silver Ratio Guide */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            The 50-Year History of the Gold-to-Silver Ratio (GSR)
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            The <strong>Gold-to-Silver Ratio</strong> measures how many ounces of physical silver are required to purchase one single ounce of gold. Throughout human history, the geological ratio in the Earth&apos;s crust is approximately 16:1, and statutory ratios in ancient and bimetallic periods ranged from 12:1 to 16:1.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block">Historical Median</span>
              <span className="text-xl font-extrabold text-gray-900 mt-1 block">55.4:1</span>
              <p className="text-xs text-gray-600 mt-1">Average valuation balance over the entire post-1971 free-floating era.</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">Historical Low (Silver Outperformance)</span>
              <span className="text-xl font-extrabold text-emerald-900 mt-1 block">17.2:1</span>
              <p className="text-xs text-emerald-800 mt-1">Recorded in January 1980 during the peak of the Hunt Brothers silver squeeze.</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wide block">Historical High (Silver Disconnect)</span>
              <span className="text-xl font-extrabold text-rose-900 mt-1 block">125.6:1</span>
              <p className="text-xs text-rose-800 mt-1">Recorded in March 2020 during the global COVID-19 pandemic market panic.</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 pt-2">
            Precious metals investors use historical GSR extremes as a rotation strategy: when the ratio spikes above 80:1 or 90:1, investors often swap gold for undervalued silver; conversely, when the ratio drops below 40:1, investors rotate profits back into gold.
          </p>
        </div>

        {/* ── FAQ SECTION (Google People Also Ask Parity) ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <header className="mb-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
              Historical Gold &amp; Silver Questions Answered
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Authoritative answers to the most common search queries regarding historical precious metals performance in the USA.
            </p>
          </header>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 flex items-start gap-2">
                  <span className="text-blue-600 font-extrabold text-sm shrink-0">Q:</span>
                  <span>{faq.name}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-5">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RELATED PRECIOUS METALS DASHBOARDS & SIBLING LINKS ── */}
        <div className="bg-slate-100 rounded-2xl p-4 sm:p-6 border border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Related Precious Metals Tools &amp; Historical Archives
          </h3>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <Link href="/international/gold-silver-price/" className="text-blue-600 hover:text-blue-800 hover:underline bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
              Live Gold &amp; Silver Spot Rates (USA) →
            </Link>
            <Link href="/international/gold-silver-ratio/" className="text-blue-600 hover:text-blue-800 hover:underline bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
              Live Gold-to-Silver Ratio Chart →
            </Link>
            <Link href="/international/gold-silver-price/history/" className="text-blue-600 hover:text-blue-800 hover:underline bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
              Nepal FENEGOSIDA Historical Gold &amp; Silver →
            </Link>
            <Link href="/international/dubai-gold-rate/" className="text-blue-600 hover:text-blue-800 hover:underline bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
              Dubai Gold Souk Live Rates →
            </Link>
            <Link href="/market-rates/live-gold-price/" className="text-blue-600 hover:text-blue-800 hover:underline bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
              Nepal Live Hallmark Gold Price →
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}


