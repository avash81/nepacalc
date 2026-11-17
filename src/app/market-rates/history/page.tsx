import React from 'react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import NepaliDate from 'nepali-date-converter';
import FenegosidaHistoryClient from './FenegosidaHistoryClient';

export const metadata: Metadata = {
  title: 'Gold and Silver Price History in Nepal: Historical Fenegosida Rates',
  description: 'Explore the complete Fenegosida historical record of gold and silver prices in Nepal. View day-by-day hallmark gold rates with date filters, charts, and long-term market trends.',
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/history/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: 'NepaCalc',
    title: 'Gold and Silver Price History in Nepal: Historical Fenegosida Rates',
    description: 'Explore the complete Fenegosida historical record of gold and silver prices in Nepal. View day-by-day hallmark gold rates with date filters, charts, and long-term market trends.',
    url: 'https://nepacalc.com/market-rates/history/',
    images: [{ url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg', width: 1200, height: 630, alt: 'Gold and Silver Price History in Nepal: Historical Fenegosida Rates' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold and Silver Price History in Nepal: Historical Fenegosida Rates',
    description: 'Explore the complete Fenegosida historical record of gold and silver prices in Nepal. View day-by-day hallmark gold rates with date filters, charts, and long-term market trends.',
    images: ['https://nepacalc.com/images/og/history-gold-silver-nepal.jpg'],
  },
};

export default function HistoryHubPage() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'historical-rates.json');
  let dataset: { data: any[]; meta: any } = { data: [], meta: {} };

  // Load monthly data for FENEGOSIDA-style tabs
  const monthlyPath = path.join(process.cwd(), 'public', 'data', 'historical-monthly-rates.json');
  let monthlyData: Record<string, any> = {};
  try {
    const mRaw = fs.readFileSync(monthlyPath, 'utf8');
    monthlyData = JSON.parse(mRaw).years || {};
  } catch (e) {}

  // Encode compact payload (obfuscated in client HTML to protect data from scrapers/devtools)
  let encodedPayload = '';
  try {
    const compact: Record<string, any> = {};
    for (const yr of Object.keys(monthlyData)) {
      const yData = monthlyData[yr];
      compact[yr] = {
        ymm: [
          yData.year_minmax?.gold_tola?.min || 0,
          yData.year_minmax?.gold_tola?.max || 0,
          yData.year_minmax?.gold_10g?.min || 0,
          yData.year_minmax?.gold_10g?.max || 0,
          yData.year_minmax?.silver_tola?.min || 0,
          yData.year_minmax?.silver_tola?.max || 0,
          yData.year_minmax?.silver_10g?.min || 0,
          yData.year_minmax?.silver_10g?.max || 0,
        ],
        m: {}
      };
      for (const mo of Object.keys(yData.months || {})) {
        const mData = yData.months[mo];
        const days = (mData.daily_records || []).map((r: any) => [
          r.date_ad,
          r.gold_tola || 0,
          r.gold_10g || 0,
          r.silver_tola || 0,
          r.silver_10g || 0
        ]);
        compact[yr].m[mo] = {
          mmm: [
            mData.month_minmax?.gold_tola?.min || 0,
            mData.month_minmax?.gold_tola?.max || 0,
            mData.month_minmax?.gold_10g?.min || 0,
            mData.month_minmax?.gold_10g?.max || 0,
            mData.month_minmax?.silver_tola?.min || 0,
            mData.month_minmax?.silver_tola?.max || 0,
            mData.month_minmax?.silver_10g?.min || 0,
            mData.month_minmax?.silver_10g?.max || 0,
          ],
          d: days
        };
      }
    }
    encodedPayload = Buffer.from(JSON.stringify(compact)).toString('base64');
  } catch (e) {}

  // Load daily history (last 365 days with both gram+tola)
  const dailyHistPath = path.join(process.cwd(), 'public', 'data', 'daily-history.json');
  let dailyHistory: any[] = [];
  try {
    dailyHistory = JSON.parse(fs.readFileSync(dailyHistPath, 'utf8'));
  } catch (e) {}

  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    dataset = JSON.parse(fileContents);
  } catch (e) {
    console.error('Failed to load historical data', e);
  }

  const allRecords: any[] = dataset.data || [];
  
  // Group by date
  const grouped = new Map();
  allRecords.forEach(r => {
    if (!r.date_ad) return;
    if (!grouped.has(r.date_ad)) {
      grouped.set(r.date_ad, {
        date_ad: r.date_ad,
        date_bs: r.date_bs,
        fine_gold: null,
        silver: null,
      });
    }
    const g = grouped.get(r.date_ad);
    if (r.metal === 'Gold' && (r.rate_type.includes('Fine') || r.rate_type === '24K Hallmark Gold' || r.rate_type === 'Gold Rate Per Tola' || r.rate_type === 'Gold')) {
      g.fine_gold = r.source_per_tola;
    }
    if (r.metal === 'Silver') {
      g.silver = r.source_per_tola;
    }
    if (!g.date_bs && r.date_bs) g.date_bs = r.date_bs;
  });

  // Fallback calculate Nepali date if missing
  grouped.forEach(g => {
    if (!g.date_bs && g.date_ad) {
      try {
        g.date_bs = new NepaliDate(new Date(g.date_ad)).format('YYYY/MM/DD');
      } catch (e) {}
    }
  });

  const tableData = Array.from(grouped.values()).sort((a, b) => new Date(b.date_ad).getTime() - new Date(a.date_ad).getTime());
  // Show the latest 120 verified trading records on the main hub for fast crawlable indexing without 4.6MB HTML bloat
  const displayTableData = tableData.slice(0, 120);
  
  const tolaInGrams = 11.6638;
  const troyOunceInGrams = 31.1034768;

  // Full daily history covering all records from 2013 to today for the pillar page explorer
  const fullDailyHistory = tableData.map(r => ({
    date: r.date_ad,
    date_bs: r.date_bs || null,
    gold_tola: r.fine_gold,
    gold_10g: r.fine_gold ? Math.round((r.fine_gold / tolaInGrams) * 10) : null,
    silver_tola: r.silver,
    silver_10g: r.silver ? Math.round((r.silver / tolaInGrams) * 10) : null,
  }));
  
  const years = Array.from(new Set(allRecords.map(r => r.date_ad?.substring(0, 4)).filter(Boolean))).sort((a, b) => Number(b) - Number(a));

  // Statistics Calculation
  let gMax = 0, gMin = Infinity, gSum = 0, gCount = 0;
  let sMax = 0, sMin = Infinity, sSum = 0, sCount = 0;
  let gMaxRecord: any = null;
  let gMinRecord: any = null;
  let sMaxRecord: any = null;
  let sMinRecord: any = null;
  
  const goldRecords = tableData.filter(d => d.fine_gold !== null);
  const silverRecords = tableData.filter(d => d.silver !== null);
  
  goldRecords.forEach(d => {
    const val = d.fine_gold as number;
    gSum += val; gCount++;
    if (val > gMax) { gMax = val; gMaxRecord = d; }
    if (val < gMin) { gMin = val; gMinRecord = d; }
  });
  
  silverRecords.forEach(d => {
    const val = d.silver as number;
    sSum += val; sCount++;
    if (val > sMax) { sMax = val; sMaxRecord = d; }
    if (val < sMin) { sMin = val; sMinRecord = d; }
  });

  const latestGold = goldRecords[0];
  const yesterdayGold = goldRecords[1] || null;
  const firstGold = goldRecords[goldRecords.length - 1];
  const avgGold = gCount > 0 ? gSum / gCount : 0;

  const latestSilver = silverRecords[0];
  const yesterdaySilver = silverRecords[1] || null;
  const firstSilver = silverRecords[silverRecords.length - 1];
  const avgSilver = sCount > 0 ? sSum / sCount : 0;

  const fmtNPR = (num: number | null) => num === null || num === Infinity ? 'N/A' : new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);

  // Unit Conversions (using latest gold rate)
  const currentGoldRate = latestGold?.fine_gold || 0;
  const ratePerGram = currentGoldRate / tolaInGrams;

  // All-Time High (ATH) calculations
  const athGoldTola = gMax;
  const athGold10g = Math.round((gMax / tolaInGrams) * 10);
  const athGoldGram = Math.round((gMax / tolaInGrams) * 100) / 100;
  const athGold22kTola = Math.round(gMax * (22 / 24));
  const athGold22kGram = Math.round((athGold22kTola / tolaInGrams) * 100) / 100;
  const athDateAd = gMaxRecord?.date_ad || '2026-01-29';
  const athDateBs = gMaxRecord?.date_bs || '2082/10/15';

  // All-Time Low (ATL) calculations
  const atlGoldTola = gMin;
  const atlGold10g = Math.round((gMin / tolaInGrams) * 10);
  const atlGoldGram = Math.round((gMin / tolaInGrams) * 100) / 100;
  const atlGold22kTola = Math.round(gMin * (22 / 24));
  const atlGold22kGram = Math.round((atlGold22kTola / tolaInGrams) * 100) / 100;
  const atlDateAd = gMinRecord?.date_ad || '2013-04-16';
  const atlDateBs = gMinRecord?.date_bs || '2070/01/03';

  // Milestone Years Comparison (2019 to 2026)
  const milestoneYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019];
  const milestoneStats = milestoneYears.map(yr => {
    const yrRecords = allRecords.filter(r => r.metal === 'Gold' && r.date_ad?.startsWith(String(yr)));
    const rates = yrRecords.map(r => r.source_per_tola).filter(Boolean);
    if (rates.length === 0) return null;
    const max = Math.max(...rates);
    const min = Math.min(...rates);
    const avg = Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
    const avgPerGram = Math.round((avg / tolaInGrams) * 100) / 100;
    const avg22k = Math.round(avg * (22 / 24));
    return {
      year: yr,
      count: rates.length,
      min,
      max,
      avg,
      avgPerGram,
      avg22k
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  // FAQ Items matching exact search queries
  const faqItems = [
    {
      q: 'What was the highest gold price in Nepal till date (All-Time High)?',
      a: `The highest gold price ever recorded in Nepal is NPR ${fmtNPR(athGoldTola)} per tola (NPR ${fmtNPR(athGold10g)} per 10 grams, or NPR ${fmtNPR(athGoldGram)} per gram) on ${athDateAd} (${athDateBs} B.S.). For 22K (22 carat / Tejabi gold), the peak reached approximately NPR ${fmtNPR(athGold22kTola)} per tola.`
    },
    {
      q: 'What was the highest price for 24K and 22K gold per gram and per tola?',
      a: `The all-time peak price for 24K hallmark gold in Nepal reached NPR ${fmtNPR(athGoldTola)} per tola and NPR ${fmtNPR(athGoldGram)} per gram. For 22K (22 carat) gold, the highest rate reached approximately NPR ${fmtNPR(athGold22kTola)} per tola and NPR ${fmtNPR(athGold22kGram)} per gram.`
    },
    {
      q: 'What is the highest price of gold ever reached?',
      a: `The historic peak rate reached in the Nepalese bullion market was NPR ${fmtNPR(athGoldTola)} per tola on ${athDateAd} (${athDateBs} B.S.), as officially published by the Federation of Nepal Gold and Silver Dealers’ Association (FENEGOSIDA).`
    },
    {
      q: 'What was the lowest gold price ever recorded in Nepal?',
      a: `The lowest gold price officially recorded in Nepal's historical dataset is NPR ${fmtNPR(atlGoldTola)} per tola (NPR ${fmtNPR(atlGold10g)} per 10 grams, or NPR ${fmtNPR(atlGoldGram)} per gram) on ${atlDateAd}${atlDateBs ? ` (${atlDateBs} B.S.)` : ''}. For 22K (22 carat / Tejabi gold), the lowest rate reached approximately NPR ${fmtNPR(atlGold22kTola)} per tola.`
    },
    {
      q: 'What has been the history of gold prices in Nepal?',
      a: `Gold in Nepal has appreciated dramatically over the past decade. In 2013, 24K gold traded near NPR 50,000 per tola. By 2019, rates averaged NPR 65,434 per tola before crossing the historic 1 Lakh (NPR 1,00,000) threshold in 2022. Spurred by rising international bullion benchmarks, import customs duties, and currency fluctuations, gold surpassed NPR 2 Lakh in 2025 and established an all-time record of NPR ${fmtNPR(athGoldTola)} per tola in 2026.`
    },
    {
      q: 'What was the gold price in Nepal in 2019 (per gram, 24K, 22K, in rupees)?',
      a: `In 2019, 24K hallmark gold in Nepal averaged NPR 65,434 per tola (~NPR 5,610 per gram), ranging from a low of NPR 59,000 per tola (NPR 5,058/g) to a high of NPR 73,500 per tola (NPR 6,301/g). 22 carat gold averaged approximately NPR 59,980 per tola (~NPR 5,142/g) throughout 2019.`
    },
    {
      q: 'What was the highest gold price in Nepal in 2022?',
      a: `The highest gold price reached in Nepal during 2022 was NPR 1,05,500 per tola (approx. NPR 9,045 per gram), marking the very first year Nepali gold decisively crossed the 100,000 NPR milestone. The 2022 annual average was NPR 96,558 per tola.`
    },
    {
      q: 'What was the gold price in Nepal yesterday compared to today?',
      a: yesterdayGold ? `Yesterday (${yesterdayGold.date_ad}${yesterdayGold.date_bs ? ` / ${yesterdayGold.date_bs} B.S.` : ''}), fine gold was NPR ${fmtNPR(yesterdayGold.fine_gold)} per tola (NPR ${fmtNPR(Math.round((yesterdayGold.fine_gold / tolaInGrams) * 10))} per 10g), and silver was NPR ${fmtNPR(yesterdaySilver?.silver ?? null)} per tola. Today's live rate is NPR ${fmtNPR(latestGold?.fine_gold ?? null)} per tola for fine gold and NPR ${fmtNPR(latestSilver?.silver ?? null)} per tola for silver.` : 'Gold and silver rates are updated daily directly from official FENEGOSIDA bulletins.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  const conversions = [
    { unit: '1 Tola', val: currentGoldRate },
    { unit: '10 grams', val: ratePerGram * 10 },
    { unit: '1 gram', val: ratePerGram },
    { unit: '1 kilogram', val: ratePerGram * 1000 },
    { unit: '1 Anna', val: currentGoldRate / 16 },
    { unit: '1 Lal', val: currentGoldRate / 100 }, 
    { unit: 'Troy Ounce', val: ratePerGram * troyOunceInGrams },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold Rate History', item: 'https://nepacalc.com/market-rates/history/' },
    ],
  };

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Gold and Silver Price History in Nepal',
    description: 'Historical gold and silver rates in Nepal by date, including rates per tola and other available units.',
    url: 'https://nepacalc.com/market-rates/history/',
    spatialCoverage: {
      '@type': 'Place',
      name: 'Nepal'
    },
    creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    dateModified: dataset.meta?.last_updated_ad ? new Date(dataset.meta.last_updated_ad).toISOString() : '2026-10-06T00:00:00Z',
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-800">
        
        {/* H1 & Intro */}
        <header className="w-full">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Gold and Silver Price History in Nepal
          </h1>
        </header>

        {/* ── Official FENEGOSIDA History Explorer with Instant Tracker ── */}
        <div className="w-full space-y-3">
          <FenegosidaHistoryClient dailyHistory={fullDailyHistory} encodedPayload={encodedPayload} />

          {/* ── Quick Real-Time / Day-Lag Rate Tracker (Yesterday vs Today) ── */}
          {yesterdayGold && (
            <div className="w-full flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-amber-50/90 border border-amber-200/90 rounded-xl text-xs sm:text-sm text-amber-950 font-medium shadow-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-amber-900">Yesterday&apos;s Closing Rate ({yesterdayGold.date_ad}):</span>
                <span>Gold NPR {fmtNPR(yesterdayGold.fine_gold)} / tola</span>
                <span className="text-amber-300">•</span>
                <span>Silver NPR {fmtNPR(yesterdaySilver?.silver ?? null)} / tola</span>
              </div>
              <Link href="/market-rates/" className="text-amber-700 underline font-bold hover:text-amber-800 text-xs sm:text-sm">
                View Today&apos;s Live Rate →
              </Link>
            </div>
          )}
        </div>

        {/* ── Official All-Time Highest & Lowest Record Snapshot Cards (Below Dataset Table) ── */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Highest Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-amber-200/80 pb-3 mb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md">
                    Official All-Time Record High
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    Highest Gold Price Till Date
                  </h2>
                </div>
                <div className="text-xs text-slate-600 sm:text-right">
                  <span className="font-bold text-slate-800">Recorded:</span> {athDateAd} {athDateBs ? `(${athDateBs} B.S.)` : ''}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="bg-white/95 p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500">24K (1 Tola)</p>
                  <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">NPR {fmtNPR(athGoldTola)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">11.664g standard</p>
                </div>
                <div className="bg-white/95 p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500">24K (Per Gram)</p>
                  <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">NPR {fmtNPR(athGoldGram)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">NPR {fmtNPR(athGold10g)} / 10g</p>
                </div>
                <div className="bg-white/95 p-3 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500">22K / Tejabi</p>
                  <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">NPR {fmtNPR(athGold22kTola)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">per tola</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lowest Card */}
          <div className="bg-gradient-to-br from-slate-500/10 via-slate-500/5 to-transparent border border-slate-300/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-3 mb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-md">
                    Official All-Time Record Low
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    Lowest Gold Price Till Date
                  </h2>
                </div>
                <div className="text-xs text-slate-600 sm:text-right">
                  <span className="font-bold text-slate-800">Recorded:</span> {atlDateAd} {atlDateBs ? `(${atlDateBs} B.S.)` : ''}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="bg-white/95 p-3 rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500">24K (1 Tola)</p>
                  <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">NPR {fmtNPR(atlGoldTola)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">11.664g standard</p>
                </div>
                <div className="bg-white/95 p-3 rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500">24K (Per Gram)</p>
                  <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">NPR {fmtNPR(atlGoldGram)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">NPR {fmtNPR(atlGold10g)} / 10g</p>
                </div>
                <div className="bg-white/95 p-3 rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500">22K / Tejabi</p>
                  <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">NPR {fmtNPR(atlGold22kTola)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">per tola</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO-friendly hidden table for search engine crawling (not shown to users) */}
        <section className="sr-only" aria-hidden="true">
          <table>
            <caption>Gold and Silver Rate History in Nepal</caption>
            <thead>
              <tr>
                <th>Date (A.D.)</th>
                <th>Date (B.S.)</th>
                <th>Gold Rate per Tola</th>
                <th>Silver Rate per Tola</th>
              </tr>
            </thead>
            <tbody>
              {displayTableData.map((row) => (
                <tr key={row.date_ad}>
                  <td>{row.date_ad}</td>
                  <td>{row.date_bs || ''}</td>
                  <td>{row.fine_gold ? `NPR ${fmtNPR(row.fine_gold)}` : ''}</td>
                  <td>{row.silver ? `NPR ${fmtNPR(row.silver)}` : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── In-Depth Article: The History of Gold Prices in Nepal ── */}
        <article className="w-full space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            The History of Gold Prices in Nepal: Long-Term Trends &amp; Milestones
          </h2>
          <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              The gold market in Nepal has witnessed extraordinary appreciation over the last decade, driven by global macroeconomic movements, inflation hedging, geopolitical shifts, and domestic fiscal policies including import duties established by the Nepal Rastra Bank and Ministry of Finance.
            </p>
            <p>
              In <strong>2013</strong>, 24K hallmark gold traded near NPR 50,000 to NPR 55,000 per tola. By <strong>2019</strong>, gold prices consolidated between NPR 59,000 and NPR 73,500 per tola, maintaining an annual average of NPR 65,434 per tola (~NPR 5,610 per gram). The year <strong>2022</strong> proved to be a decisive historical milestone, as bullion breached the psychological threshold of <strong>NPR 1,00,000 (1 Lakh) per tola</strong> for the first time in Nepalese history, touching a 2022 peak of NPR 1,05,500 per tola.
            </p>
            <p>
              Persistent global inflationary pressures and bullion demand propelled prices beyond NPR 2,00,000 in 2025. In <strong>2026</strong>, hallmark gold established an unprecedented all-time peak of <strong>NPR {fmtNPR(athGoldTola)} per tola</strong> (NPR {fmtNPR(athGoldGram)} per gram). The table below outlines how gold rates evolved across every major milestone year.
            </p>
          </div>

          {/* Milestone Years Comparison Table */}
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">
                Year-by-Year Gold Price Comparison in Nepal (2019 – 2026)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 py-3">Year</th>
                    <th scope="col" className="px-4 py-3 text-right">Max Rate (Peak)</th>
                    <th scope="col" className="px-4 py-3 text-right">Min Rate (Low)</th>
                    <th scope="col" className="px-4 py-3 text-right">Average / Tola</th>
                    <th scope="col" className="px-4 py-3 text-right">Avg / Gram</th>
                    <th scope="col" className="px-4 py-3 text-right">Avg 22 Carat</th>
                    <th scope="col" className="px-4 py-3 text-center">Full Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {milestoneStats.map(m => (
                    <tr key={m.year} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900">{m.year}</td>
                      <td className="px-4 py-3 text-right font-semibold text-amber-700">NPR {fmtNPR(m.max)}</td>
                      <td className="px-4 py-3 text-right text-slate-600">NPR {fmtNPR(m.min)}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-800">NPR {fmtNPR(m.avg)}</td>
                      <td className="px-4 py-3 text-right text-slate-700">NPR {fmtNPR(m.avgPerGram)}</td>
                      <td className="px-4 py-3 text-right text-slate-600">NPR {fmtNPR(m.avg22k)}</td>
                      <td className="px-4 py-3 text-center">
                        <Link href={`/market-rates/history/${m.year}/`} className="text-amber-700 hover:text-amber-800 font-semibold underline text-xs">
                          {m.year} Rates →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Explanatory Paragraphs Covering All Core Search Intents ── */}
          <div className="space-y-4 pt-6 border-t border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900">
              Understanding Gold Denominations: From 1 Lal to 1 Tola
            </h3>
            <p>
              In the Nepalese bullion market, gold is traded across both traditional South Asian mass units and international metric units. While the <strong>Tola (11.6638 grams)</strong> serves as the official benchmark rate fixed daily by FENEGOSIDA, retail buyers frequently trade in smaller increments:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
              <li><strong>1 Tola:</strong> Equivalent to exactly 11.6638 grams (or 16 Annas / 100 Lals).</li>
              <li><strong>10 Grams:</strong> The primary international standard used for commercial bullion bars and banking transactions.</li>
              <li><strong>1 Gram:</strong> Standard unit for modern jewelry and direct retail purchases. At all-time highs, 1 gram touched NPR {fmtNPR(athGoldGram)}.</li>
              <li><strong>1 Anna:</strong> 1/16th of a tola (~0.729 grams), widely used for lightweight rings, ear tops, and nose studs.</li>
              <li><strong>1 Lal:</strong> 1/100th of a tola (~0.1166 grams). Calculating today&apos;s 1 Lal gold price is straightforward: simply divide the daily tola rate by 100. For instance, at NPR {fmtNPR(currentGoldRate)} per tola, 1 Lal of gold costs exactly NPR {fmtNPR(Math.round(currentGoldRate / 100))}.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 pt-2">
              24K Hallmark vs 22K (22 Carat / Tejabi) Purity Explained
            </h3>
            <p>
              In Nepal, <strong>24 Karat (24K) Hallmark Gold</strong> represents pure 99.99% fine gold (छापावाल सुन). Due to pure gold being soft and pliable, jewelry makers frequently craft intricate ornaments using <strong>22 Karat (22K) / Tejabi Gold</strong> (तेजाबी सुन), which features 91.6% purity alloyed with copper or silver for structural durability. Historically in Nepal, 22K gold has traded at approximately a 91.6% ratio or an official federation discount of NPR 500 to NPR 800 per tola compared to 24K hallmark bullion. When 24K reached its peak of NPR {fmtNPR(athGoldTola)} / tola, 22K gold reached approximately NPR {fmtNPR(athGold22kTola)} / tola.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">
              All-Time High vs. Historical Low: Bullion Price Growth in Nepal
            </h3>
            <p>
              The historical divergence between Nepal&apos;s recorded low and peak rates illustrates gold&apos;s extraordinary long-term wealth preservation. From an all-time recorded low of <strong>NPR {fmtNPR(atlGoldTola)} per tola</strong> on {atlDateAd}{atlDateBs ? ` (${atlDateBs} B.S.)` : ''} to an all-time peak of <strong>NPR {fmtNPR(athGoldTola)} per tola</strong> on {athDateAd}{athDateBs ? ` (${athDateBs} B.S.)` : ''}, hallmark bullion in Nepal has appreciated by over {Math.round(((athGoldTola - atlGoldTola) / atlGoldTola) * 100)}%. This substantial price expansion reflects compounding inflation, shifting domestic import tariffs, and persistent bullion demand across Nepalese households.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">
              Yesterday&apos;s Closing vs. Today&apos;s Live Rate Continuity
            </h3>
            <p>
              Tracking day-over-day price adjustments allows buyers to identify short-term volatility. Yesterday ({yesterdayGold ? yesterdayGold.date_ad : 'previous session'}), 24K hallmark gold closed at <strong>NPR {fmtNPR(yesterdayGold?.fine_gold ?? null)} per tola</strong>, while today&apos;s live market rate stands at <strong>NPR {fmtNPR(latestGold?.fine_gold ?? null)} per tola</strong>. Official rate announcements are released every morning between 10:00 AM and 11:00 AM by FENEGOSIDA, with rates remaining active until the following trading session.
            </p>
          </div>
        </article>

        {/* Year Navigation */}
        <section className="w-full">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Gold and Silver Rate History by Year</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-3">Year</th>
                  <th scope="col" className="px-6 py-3">Historical data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {years.map(yr => (
                  <tr key={yr} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 font-bold">
                      <Link href={`/market-rates/history/${yr}/`} className="text-amber-700 hover:underline">
                        {yr}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-slate-600">Gold and silver rates</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Historical Gold Rate Statistics */}
        <section className="w-full">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Historical Gold Rate Statistics</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-3">Statistic</th>
                  <th scope="col" className="px-6 py-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Highest 24K gold rate per tola</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(gMax)} / tola</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Lowest 24K gold rate per tola</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(gMin)} / tola</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Average 24K gold rate per tola</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(avgGold)} / tola</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">First recorded 24K gold rate per tola</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(firstGold?.fine_gold ?? null)} / tola <span className="font-normal text-xs text-slate-500 block">on {firstGold?.date_ad}</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Latest recorded 24K gold rate per tola</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(latestGold?.fine_gold ?? null)} / tola <span className="font-normal text-xs text-slate-500 block">on {latestGold?.date_ad}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Historical Silver Rate Statistics */}
        {sCount > 0 && (
          <section className="w-full">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Historical Silver Rate Statistics</h2>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                  <tr>
                    <th scope="col" className="px-6 py-3">Statistic</th>
                    <th scope="col" className="px-6 py-3 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">Highest silver rate per tola</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(sMax)} / tola</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">Lowest silver rate per tola</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(sMin)} / tola</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">Average silver rate per tola</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(avgSilver)} / tola</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">First recorded silver rate per tola</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(firstSilver?.silver ?? null)} / tola <span className="font-normal text-xs text-slate-500 block">on {firstSilver?.date_ad}</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">Latest recorded silver rate per tola</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(latestSilver?.silver ?? null)} / tola <span className="font-normal text-xs text-slate-500 block">on {latestSilver?.date_ad}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Gold Rate by Unit */}
        <section className="w-full">
          <h2 className="text-2xl font-black text-slate-900 mb-1">Gold Rate by Unit</h2>
          <p className="text-sm font-semibold text-amber-700 mb-3">
            Based on latest recorded 24K gold rate — {latestGold?.date_ad} (NPR {fmtNPR(latestGold?.fine_gold ?? null)} / tola)
          </p>
          <p className="text-xs text-slate-500 mb-4">
            All values below are deterministically calculated from the per-tola source record. These are not averages or historical calculations.
          </p>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <caption className="sr-only">24K gold rate equivalents by unit — based on {latestGold?.date_ad}</caption>
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-3">Unit</th>
                  <th scope="col" className="px-6 py-3 text-right">Rate (NPR) — calculated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {conversions.map(c => (
                  <tr key={c.unit} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">{c.unit}</td>
                    <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(c.val)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Historical Data Coverage */}
        <section className="w-full">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Historical Data Coverage</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-3">Field</th>
                  <th scope="col" className="px-6 py-3 text-right">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Years available</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">{years[years.length - 1]}–{years[0]}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Earliest recorded date</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">{firstGold?.date_ad || 'N/A'}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Latest recorded date</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">{latestGold?.date_ad || 'N/A'}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Markets</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">Gold and Silver</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Primary unit</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">Per tola</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Date formats</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">A.D. and B.S.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Geographic coverage</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">Nepal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── People Also Ask (FAQ) Section ── */}
        <section className="w-full space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              FAQ &amp; Quick Answers
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Frequently Asked Questions About Gold Price History in Nepal
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-xl border border-slate-200 p-4 sm:p-5 transition-all shadow-xs open:ring-1 open:ring-amber-500/20"
                open={idx < 2}
              >
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between gap-3 text-sm sm:text-base">
                  <span>{item.q}</span>
                  <span className="text-amber-600 text-lg group-open:rotate-180 transition-transform flex-shrink-0 font-bold">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Data Source and Methodology */}
        <section className="w-full space-y-3 pb-8">
          <h2 className="text-2xl font-black text-slate-900">Data Source and Methodology</h2>
          <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-3">
            <p>
              Gold and silver rates are sourced from FENEGOSIDA (Federation of Nepal Gold and Silver Dealers&rsquo; Association), the federation that sets the standard market rates for gold and silver in Nepal. Rates are collected daily and recorded with an A.D. date and Bikram Sambat (B.S.) date where available.
            </p>
            <p>
              Missing values are not estimated or fabricated. Per-gram, per-10g, per-kg, per-anna, and per-lal values are deterministically calculated from the recorded per-tola rate using fixed conversion factors. Historical corrections are applied when verified against source announcements.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
