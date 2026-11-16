import React from 'react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import YearClientFilter from './YearClientFilter';
import NepaliDate from 'nepali-date-converter';
import YearClientChart from './YearClientChart';

const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013'];

export async function generateStaticParams() {
  return YEARS.map((year) => ({ year }));
}

export async function generateMetadata({ params }: { params: { year: string } }): Promise<Metadata> {
  const year = params.year;
  const title = `Gold and Silver Rate History ${year} in Nepal: Official Fenegosida Rates`;
  const description = `Explore official ${year} gold and silver price history in Nepal. View day-by-day 24K and 22K rates, annual high and low records, price per gram, and market trends.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nepacalc.com/market-rates/history/${year}/`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
    },
    openGraph: {
      type: 'website',
      siteName: 'NepaCalc',
      title,
      description,
      url: `https://nepacalc.com/market-rates/history/${year}/`,
      images: [{ url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg', width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://nepacalc.com/images/og/history-gold-silver-nepal.jpg'],
    },
  };
}

export default async function YearHistoryPage({ params }: { params: { year: string } }) {
  const { year } = params;
  const dataPath = path.join(process.cwd(), 'public', 'data', 'historical-rates.json');
  let dataset: { data: any[]; meta: any } = { data: [], meta: {} };

  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    dataset = JSON.parse(fileContents);
  } catch (e) {
    console.error(`Failed to load historical data for year ${year}`, e);
  }

  const allRecords: any[] = dataset.data || [];
  const yearRecords = allRecords.filter((r) => r.date_ad && r.date_ad.startsWith(year));
  const tolaInGrams = 11.6638;

  // Data processing: Group by date
  const grouped = new Map();
  yearRecords.forEach(r => {
    if (!grouped.has(r.date_ad)) {
      grouped.set(r.date_ad, {
        date_ad: r.date_ad,
        date_bs: r.date_bs,
        fine_gold: null,
        gold_tola: null,
        gold_10g: null,
        silver: null,
        silver_tola: null,
        silver_10g: null,
        source: r.source,
      });
    }
    const g = grouped.get(r.date_ad);
    if (r.metal === 'Gold' && (r.rate_type.includes('Fine') || r.rate_type === '24K Hallmark Gold' || r.rate_type === 'Gold Rate Per Tola' || r.rate_type === 'Gold')) {
      g.fine_gold = r.source_per_tola;
      g.gold_tola = r.source_per_tola;
      g.gold_10g = r.source_per_10g || (r.source_per_tola ? Math.round((r.source_per_tola / tolaInGrams) * 10) : null);
    }
    if (r.metal === 'Silver') {
      g.silver = r.source_per_tola;
      g.silver_tola = r.source_per_tola;
      g.silver_10g = r.source_per_10g || (r.source_per_tola ? Math.round((r.source_per_tola / tolaInGrams) * 10 * 10) / 10 : null);
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

  // Gold Summary logic
  const goldRecordsForSummary = tableData.filter(d => d.gold_tola !== null);
  const latestGold = goldRecordsForSummary[0];
  const yesterdayGold = goldRecordsForSummary[1] || null;
  const firstGold = goldRecordsForSummary[goldRecordsForSummary.length - 1];
  
  let maxGold: number | null = null;
  let maxGoldRecord: any = null;
  let minGold: number | null = null;
  let minGoldRecord: any = null;
  let sumGold = 0;

  goldRecordsForSummary.forEach(d => {
    const val = d.gold_tola as number;
    sumGold += val;
    if (maxGold === null || val > maxGold) { maxGold = val; maxGoldRecord = d; }
    if (minGold === null || val < minGold) { minGold = val; minGoldRecord = d; }
  });

  const avgGold = goldRecordsForSummary.length > 0 ? Math.round(sumGold / goldRecordsForSummary.length) : null;
  const change = (firstGold && latestGold) ? (latestGold.gold_tola as number) - (firstGold.gold_tola as number) : null;
  const percentChange = (firstGold && change !== null && firstGold.gold_tola) 
    ? Math.round((change / (firstGold.gold_tola as number)) * 10000) / 100 
    : null;

  // Silver Summary logic
  const silverRecordsForSummary = tableData.filter(d => d.silver_tola !== null);
  const latestSilver = silverRecordsForSummary[0];
  const yesterdaySilver = silverRecordsForSummary[1] || null;
  const firstSilver = silverRecordsForSummary[silverRecordsForSummary.length - 1];
  
  let maxSilver: null | number = null;
  let maxSilverRecord: any = null;
  let minSilver: null | number = null;
  let minSilverRecord: any = null;
  let sumSilver = 0;

  silverRecordsForSummary.forEach(d => {
    const val = d.silver_tola;
    sumSilver += val;
    if (maxSilver === null || val > maxSilver) { maxSilver = val; maxSilverRecord = d; }
    if (minSilver === null || val < minSilver) { minSilver = val; minSilverRecord = d; }
  });

  const avgSilver = silverRecordsForSummary.length > 0 ? Math.round(sumSilver / silverRecordsForSummary.length) : null;
  const changeSilver = (firstSilver && latestSilver) ? latestSilver.silver_tola - firstSilver.silver_tola : null;

  const fmtNPR = (num: number | null) => num === null ? 'N/A' : new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);

  // Peak / High Unit Calculations for this Year
  const peakGoldTola = maxGold || 0;
  const peakGold10g = Math.round((peakGoldTola / tolaInGrams) * 10);
  const peakGoldGram = Math.round((peakGoldTola / tolaInGrams) * 100) / 100;
  const peakGold22kTola = Math.round(peakGoldTola * (22 / 24));
  const peakGold22kGram = Math.round((peakGold22kTola / tolaInGrams) * 100) / 100;
  const peakGoldInrTola = Math.round(peakGoldTola / 1.6);
  const peakGoldInrGram = Math.round((peakGoldInrTola / tolaInGrams) * 100) / 100;
  const peakDateAd = maxGoldRecord?.date_ad || `${year}`;
  const peakDateBs = maxGoldRecord?.date_bs || '';

  // Average Unit Calculations for this Year
  const annualAvgGold = avgGold || 0;
  const avgGold10g = Math.round((annualAvgGold / tolaInGrams) * 10);
  const avgGoldGram = Math.round((annualAvgGold / tolaInGrams) * 100) / 100;
  const avgGold22kTola = Math.round(annualAvgGold * (22 / 24));
  const avgGold22kGram = Math.round((avgGold22kTola / tolaInGrams) * 100) / 100;
  const avgGoldInrTola = Math.round(annualAvgGold / 1.6);
  const avgGoldInrGram = Math.round((avgGoldInrTola / tolaInGrams) * 100) / 100;

  // Minimum Unit Calculations for this Year
  const minGoldTola = minGold || 0;
  const minGoldGram = Math.round((minGoldTola / tolaInGrams) * 100) / 100;
  const minGold22kTola = Math.round(minGoldTola * (22 / 24));

  // Current / Latest Year check
  const isCurrentYear = year === '2026';

  // Denominations for this year (Average vs Peak)
  const denominations = [
    { unit: '1 Tola (11.664g)', avgNPR: annualAvgGold, peakNPR: peakGoldTola },
    { unit: '10 Grams', avgNPR: avgGold10g, peakNPR: peakGold10g },
    { unit: '1 Gram', avgNPR: avgGoldGram, peakNPR: peakGoldGram },
    { unit: '1 Anna (~0.729g)', avgNPR: Math.round(annualAvgGold / 16), peakNPR: Math.round(peakGoldTola / 16) },
    { unit: '1 Lal (~0.1166g)', avgNPR: Math.round(annualAvgGold / 100), peakNPR: Math.round(peakGoldTola / 100) },
    { unit: '22K / 22 Carat (Tejabi) per tola', avgNPR: avgGold22kTola, peakNPR: peakGold22kTola },
    { unit: 'Indian Rupee (INR) per tola (at 1.6 peg)', avgNPR: avgGoldInrTola, peakNPR: peakGoldInrTola },
  ];

  // Year-Specific FAQ Items
  const faqItems = [
    {
      q: `What was the highest gold price in Nepal in ${year}?`,
      a: `In ${year}, the highest gold price recorded in Nepal for 24K hallmark gold was NPR ${fmtNPR(peakGoldTola)} per tola (NPR ${fmtNPR(peakGoldGram)} per gram, or NPR ${fmtNPR(peakGold10g)} per 10 grams) on ${peakDateAd}${peakDateBs ? ` (${peakDateBs} B.S.)` : ''}. For 22K (22 carat / Tejabi gold), the peak reached approximately NPR ${fmtNPR(peakGold22kTola)} per tola.`
    },
    {
      q: `What was the average gold price in Nepal in ${year} per tola and per gram?`,
      a: `Throughout ${year}, 24K fine gold in Nepal averaged NPR ${fmtNPR(annualAvgGold)} per tola (approximately NPR ${fmtNPR(avgGoldGram)} per gram, or NPR ${fmtNPR(avgGold10g)} per 10 grams). 22K Tejabi gold averaged approximately NPR ${fmtNPR(avgGold22kTola)} per tola (~NPR ${fmtNPR(avgGold22kGram)} per gram).`
    },
    {
      q: `What was the lowest gold rate in Nepal in ${year}?`,
      a: `The lowest recorded gold price in Nepal during ${year} was NPR ${fmtNPR(minGoldTola)} per tola (NPR ${fmtNPR(minGoldGram)} per gram) on ${minGoldRecord?.date_ad || year}${minGoldRecord?.date_bs ? ` (${minGoldRecord.date_bs} B.S.)` : ''}.`
    },
    {
      q: `What was the 22K (22 carat) gold price in Nepal in ${year}?`,
      a: `In ${year}, 22K (22 carat / Tejabi gold) traded between a low of NPR ${fmtNPR(minGold22kTola)} per tola and an annual high of NPR ${fmtNPR(peakGold22kTola)} per tola, maintaining an annual average of NPR ${fmtNPR(avgGold22kTola)} per tola.`
    },
    {
      q: `How much was 1 Lal of gold in Nepal in ${year}?`,
      a: `In Nepal, 1 Lal represents 1/100th of a tola (~0.1166 grams). In ${year}, 1 Lal of hallmark gold averaged NPR ${fmtNPR(Math.round(annualAvgGold / 100))}, with an annual peak rate of NPR ${fmtNPR(Math.round(peakGoldTola / 100))} per Lal on ${peakDateAd}.`
    },
    {
      q: `What was the gold price in Nepal in ${year} in Indian Rupees (INR)?`,
      a: `Based on the official Nepal-India currency exchange peg (100 INR = 160 NPR), the ${year} average gold price of NPR ${fmtNPR(annualAvgGold)} per tola equaled approximately ₹${fmtNPR(avgGoldInrTola)} INR per tola (₹${fmtNPR(avgGoldInrGram)} INR per gram). The peak rate in ${year} was equivalent to ₹${fmtNPR(peakGoldInrTola)} INR per tola.`
    },
    {
      q: `What was the silver price in Nepal in ${year}?`,
      a: maxSilver !== null 
        ? `In ${year}, silver in Nepal reached an annual high of NPR ${fmtNPR(maxSilver)} per tola on ${maxSilverRecord?.date_ad || year} and an annual low of NPR ${fmtNPR(minSilver)} per tola, maintaining an annual average rate of NPR ${fmtNPR(avgSilver)} per tola.`
        : `Silver rates in Nepal during ${year} were officially tracked and published daily by FENEGOSIDA.`
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold Rate History', item: 'https://nepacalc.com/market-rates/history/' },
      { '@type': 'ListItem', position: 4, name: `Gold Rate History ${year}`, item: `https://nepacalc.com/market-rates/history/${year}/` },
    ],
  };
  
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Gold and Silver Rate History ${year} in Nepal`,
    description: `Official historical gold and silver rates in Nepal for ${year} by date, including 24K hallmark and 22K gold prices per tola, per 10 grams, and per gram.`,
    url: `https://nepacalc.com/market-rates/history/${year}/`,
    creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    dateModified: dataset.meta?.last_updated_ad ? new Date(dataset.meta.last_updated_ad).toISOString() : '2026-11-15T00:00:00Z',
    spatialCoverage: 'Nepal',
    temporalCoverage: year,
    variableMeasured: [
      '24K hallmark gold rate per tola',
      '24K hallmark gold rate per 10 grams',
      '24K hallmark gold rate per gram',
      '22K Tejabi gold rate per tola',
      'silver rate per tola',
      'silver rate per 10 grams'
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-800">
        
        {/* 1. Breadcrumbs */}
        <nav className="w-full text-xs sm:text-sm font-medium text-slate-500">
          <Link href="/" className="hover:text-amber-700">Home</Link> &gt;{' '}
          <Link href="/market-rates/" className="hover:text-amber-700">Market Rates</Link> &gt;{' '}
          <Link href="/market-rates/history/" className="hover:text-amber-700">Gold &amp; Silver History</Link> &gt;{' '}
          <span className="text-slate-900 font-bold">{year}</span>
        </nav>

        {/* 2. H1 & Header */}
        <header className="w-full">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Gold and Silver Rate History {year} in Nepal
          </h1>
        </header>

        {/* 3. Interactive Chart */}
        <div className="w-full">
          <YearClientChart data={tableData} />
        </div>

        {/* 4. Historical Data Table with Gram / Tola Toggle (matching history page format) */}
        <div className="w-full space-y-3">
          <YearClientFilter year={year} data={tableData} />

          {/* Quick Real-Time / Closing Rate Tracker */}
          {isCurrentYear && yesterdayGold ? (
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
          ) : latestGold ? (
            <div className="w-full flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-900">Final Closing Rate of {year} ({latestGold.date_ad}):</span>
                <span>Gold NPR {fmtNPR(latestGold.gold_tola)} / tola</span>
                <span className="text-slate-300">•</span>
                <span>Silver NPR {fmtNPR(latestSilver?.silver_tola ?? null)} / tola</span>
              </div>
              <Link href="/market-rates/history/" className="text-amber-700 underline font-bold hover:text-amber-800 text-xs sm:text-sm">
                View All Historical Years →
              </Link>
            </div>
          ) : null}
        </div>

        {/* 5. Year Record / Snapshot Card (Placed below table) */}
        <section className="w-full bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-3 mb-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md">
                Official {year} Record
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Highest Gold Price in Nepal in {year}
              </h2>
            </div>
            <div className="text-xs text-slate-600 sm:text-right">
              <span className="font-bold text-slate-800">Recorded On:</span> {peakDateAd} {peakDateBs ? `(${peakDateBs} B.S.)` : ''}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white/90 p-3 sm:p-4 rounded-xl border border-amber-100 shadow-xs">
              <p className="text-xs font-semibold text-slate-500">24K Gold (Per 1 Tola)</p>
              <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">NPR {fmtNPR(peakGoldTola)}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">11.664 grams standard</p>
            </div>
            <div className="bg-white/90 p-3 sm:p-4 rounded-xl border border-amber-100 shadow-xs">
              <p className="text-xs font-semibold text-slate-500">24K Gold (Per Gram)</p>
              <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">NPR {fmtNPR(peakGoldGram)}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">NPR {fmtNPR(peakGold10g)} / 10g</p>
            </div>
            <div className="bg-white/90 p-3 sm:p-4 rounded-xl border border-amber-100 shadow-xs">
              <p className="text-xs font-semibold text-slate-500">22K / 22 Carat (Tejabi)</p>
              <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">NPR {fmtNPR(peakGold22kTola)}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">NPR {fmtNPR(peakGold22kGram)} / gram</p>
            </div>
            <div className="bg-white/90 p-3 sm:p-4 rounded-xl border border-amber-100 shadow-xs">
              <p className="text-xs font-semibold text-slate-500">Equivalent in Indian (INR)</p>
              <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">₹{fmtNPR(peakGoldInrTola)}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">₹{fmtNPR(peakGoldInrGram)} / gram (at 1.6 peg)</p>
            </div>
          </div>
        </section>

        {/* 6. In-Depth Year Analytical Article (100% Unique to this year) */}
        <article className="w-full space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Gold and Silver Rates in Nepal During {year}: Market Summary &amp; Milestones
          </h2>
          
          <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              During <strong>{year}</strong>, the gold market in Nepal was characterized by active price movements governed by international bullion benchmarks, foreign exchange fluctuations, and customs tariffs set by the Government of Nepal and Nepal Rastra Bank.
            </p>
            <p>
              Trading in {year} commenced at <strong>NPR {fmtNPR(firstGold?.gold_tola ?? null)} per tola</strong> on {firstGold?.date_ad || 'the first trading day'}{firstGold?.date_bs ? ` (${firstGold.date_bs} B.S.)` : ''} and reached its final recorded mark at <strong>NPR {fmtNPR(latestGold?.gold_tola ?? null)} per tola</strong> on {latestGold?.date_ad || 'the final session'}. Over the entire year, gold prices registered a net change of <strong>{change !== null && change >= 0 ? '+' : ''}NPR {fmtNPR(change)} per tola</strong>{percentChange !== null ? ` (${percentChange >= 0 ? '+' : ''}${percentChange}%)` : ''}.
            </p>
            <p>
              The peak rate for 24K hallmark gold in Nepal during {year} was established on <strong>{peakDateAd}{peakDateBs ? ` (${peakDateBs} B.S.)` : ''}</strong> at <strong>NPR {fmtNPR(peakGoldTola)} per tola</strong> (NPR {fmtNPR(peakGoldGram)} per gram). Conversely, the annual low touched <strong>NPR {fmtNPR(minGoldTola)} per tola</strong> (NPR {fmtNPR(minGoldGram)} per gram) on {minGoldRecord?.date_ad || year}{minGoldRecord?.date_bs ? ` (${minGoldRecord.date_bs} B.S.)` : ''}. Across {tableData.length} recorded trading sessions, hallmark gold maintained an annual average of <strong>NPR {fmtNPR(annualAvgGold)} per tola</strong> (~NPR {fmtNPR(avgGoldGram)} per gram).
            </p>
            {maxSilver !== null && (
              <p>
                In the silver segment, rates in {year} reached a high of <strong>NPR {fmtNPR(maxSilver)} per tola</strong> on {maxSilverRecord?.date_ad || year} and an annual low of <strong>NPR {fmtNPR(minSilver)} per tola</strong> on {minSilverRecord?.date_ad || year}, with an annual average rate of <strong>NPR {fmtNPR(avgSilver)} per tola</strong>.
              </p>
            )}
          </div>

          {/* Unit Breakdown Table for this Year */}
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">
                Gold Denominations &amp; Conversions for {year} (Average vs Peak)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 py-3">Denomination / Unit</th>
                    <th scope="col" className="px-4 py-3 text-right">{year} Annual Average</th>
                    <th scope="col" className="px-4 py-3 text-right">{year} Annual Peak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {denominations.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-900">{d.unit}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-700">
                        {d.unit.includes('Indian Rupee') ? `₹${fmtNPR(d.avgNPR)}` : `NPR ${fmtNPR(d.avgNPR)}`}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-amber-700">
                        {d.unit.includes('Indian Rupee') ? `₹${fmtNPR(d.peakNPR)}` : `NPR ${fmtNPR(d.peakNPR)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Explanatory Sections */}
          <div className="space-y-4 pt-6 border-t border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900">
              Understanding {year} Denominations: From 1 Lal to 1 Tola
            </h3>
            <p>
              In {year}, retail jewelry buyers in Nepal transacted in both traditional mass units and international metric units. While FENEGOSIDA published official rates per tola (11.6638 grams), smaller increments were calculated as follows:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
              <li><strong>1 Tola (11.6638g):</strong> Averaged NPR {fmtNPR(annualAvgGold)} and peaked at NPR {fmtNPR(peakGoldTola)}.</li>
              <li><strong>10 Grams:</strong> Averaged NPR {fmtNPR(avgGold10g)} and peaked at NPR {fmtNPR(peakGold10g)}.</li>
              <li><strong>1 Gram:</strong> Averaged NPR {fmtNPR(avgGoldGram)} and peaked at NPR {fmtNPR(peakGoldGram)}.</li>
              <li><strong>1 Anna (1/16th tola / ~0.729g):</strong> Averaged NPR {fmtNPR(Math.round(annualAvgGold / 16))} and peaked at NPR {fmtNPR(Math.round(peakGoldTola / 16))}.</li>
              <li><strong>1 Lal (1/100th tola / ~0.1166g):</strong> Calculating 1 Lal in {year} is done by dividing the tola rate by 100. During {year}, 1 Lal averaged NPR {fmtNPR(Math.round(annualAvgGold / 100))}, with an annual high of NPR {fmtNPR(Math.round(peakGoldTola / 100))}.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 pt-2">
              24K Hallmark vs 22K (22 Carat / Tejabi) Purity in {year}
            </h3>
            <p>
              In {year}, pure 24 Karat hallmark bullion (छापावाल सुन, 99.99% purity) commanded an average rate of NPR {fmtNPR(annualAvgGold)} per tola. In contrast, 22 Karat / Tejabi gold (तेजाबी सुन, 91.6% purity), widely utilized in ornamental craftsmanship, traded at an annual average of NPR {fmtNPR(avgGold22kTola)} per tola, reaching its {year} peak of NPR {fmtNPR(peakGold22kTola)} per tola.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">
              Cross-Border Parity &amp; Indian Rupee (INR) Valuation in {year}
            </h3>
            <p>
              Under the fixed peg of 100 INR = 160 NPR, the {year} average hallmark gold price of NPR {fmtNPR(annualAvgGold)} per tola was equivalent to approximately <strong>₹{fmtNPR(avgGoldInrTola)} INR per tola</strong> (₹{fmtNPR(avgGoldInrGram)} INR per gram). At its annual peak of NPR {fmtNPR(peakGoldTola)}, the Indian currency value stood at <strong>₹{fmtNPR(peakGoldInrTola)} INR per tola</strong>.
            </p>
          </div>
        </article>

        {/* 7. Gold Rate Summary Statistics for {year} */}
        <section className="w-full space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Gold Rate Summary for {year}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="block text-xs font-bold text-slate-500 mb-1">Highest Recorded (24K)</span>
              <span className="block text-xl sm:text-2xl font-black text-amber-800">NPR {fmtNPR(peakGoldTola)}</span>
              <span className="block text-xs text-slate-400 mt-1">{peakDateAd}</span>
            </div>
            <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="block text-xs font-bold text-slate-500 mb-1">Lowest Recorded (24K)</span>
              <span className="block text-xl sm:text-2xl font-black text-slate-900">NPR {fmtNPR(minGoldTola)}</span>
              <span className="block text-xs text-slate-400 mt-1">{minGoldRecord?.date_ad || 'N/A'}</span>
            </div>
            <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="block text-xs font-bold text-slate-500 mb-1">Average Rate (24K)</span>
              <span className="block text-xl sm:text-2xl font-black text-slate-900">NPR {fmtNPR(annualAvgGold)}</span>
              <span className="block text-xs text-slate-400 mt-1">per tola</span>
            </div>
            <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="block text-xs font-bold text-slate-500 mb-1">First Recorded (24K)</span>
              <span className="block text-xl sm:text-2xl font-black text-slate-900">NPR {fmtNPR(firstGold?.gold_tola ?? null)}</span>
              <span className="block text-xs text-slate-400 mt-1">{firstGold?.date_ad || 'N/A'}</span>
            </div>
            <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="block text-xs font-bold text-slate-500 mb-1">Latest Recorded (24K)</span>
              <span className="block text-xl sm:text-2xl font-black text-amber-800">NPR {fmtNPR(latestGold?.gold_tola ?? null)}</span>
              <span className="block text-xs text-slate-400 mt-1">{latestGold?.date_ad || 'N/A'}</span>
            </div>
            <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="block text-xs font-bold text-slate-500 mb-1">Net Change ({year})</span>
              <span className={`block text-xl sm:text-2xl font-black ${change !== null && change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {change !== null ? (change >= 0 ? '+' : '') + fmtNPR(change) : 'N/A'}
              </span>
              <span className="block text-xs text-slate-400 mt-1">per tola</span>
            </div>
          </div>
        </section>

        {/* 8. Silver Rate Summary Statistics for {year} */}
        {maxSilver !== null && (
          <section className="w-full space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Silver Rate Summary for {year}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="block text-xs font-bold text-slate-500 mb-1">Highest Recorded</span>
                <span className="block text-xl sm:text-2xl font-black text-slate-900">NPR {fmtNPR(maxSilver)}</span>
                <span className="block text-xs text-slate-400 mt-1">{maxSilverRecord?.date_ad || 'N/A'}</span>
              </div>
              <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="block text-xs font-bold text-slate-500 mb-1">Lowest Recorded</span>
                <span className="block text-xl sm:text-2xl font-black text-slate-900">NPR {fmtNPR(minSilver)}</span>
                <span className="block text-xs text-slate-400 mt-1">{minSilverRecord?.date_ad || 'N/A'}</span>
              </div>
              <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="block text-xs font-bold text-slate-500 mb-1">Average Rate</span>
                <span className="block text-xl sm:text-2xl font-black text-slate-900">NPR {fmtNPR(avgSilver)}</span>
                <span className="block text-xs text-slate-400 mt-1">per tola</span>
              </div>
              <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="block text-xs font-bold text-slate-500 mb-1">First Recorded</span>
                <span className="block text-xl sm:text-2xl font-black text-slate-900">NPR {fmtNPR(firstSilver?.silver_tola ?? null)}</span>
                <span className="block text-xs text-slate-400 mt-1">{firstSilver?.date_ad || 'N/A'}</span>
              </div>
              <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="block text-xs font-bold text-slate-500 mb-1">Latest Recorded</span>
                <span className="block text-xl sm:text-2xl font-black text-slate-900">{fmtNPR(latestSilver?.silver_tola ?? null)}</span>
                <span className="block text-xs text-slate-400 mt-1">{latestSilver?.date_ad || 'N/A'}</span>
              </div>
              <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="block text-xs font-bold text-slate-500 mb-1">Net Change ({year})</span>
                <span className={`block text-xl sm:text-2xl font-black ${changeSilver !== null && changeSilver >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {changeSilver !== null ? (changeSilver >= 0 ? '+' : '') + fmtNPR(changeSilver) : 'N/A'}
                </span>
                <span className="block text-xs text-slate-400 mt-1">per tola</span>
              </div>
            </div>
          </section>
        )}

        {/* 9. Dataset Coverage for {year} */}
        <section className="w-full bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-6">DATASET SUMMARY ({year})</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4 text-sm">
            <div><span className="block text-slate-400 text-xs mb-1">Dataset</span><span className="font-bold text-slate-800">Nepal Gold History</span></div>
            <div><span className="block text-slate-400 text-xs mb-1">Location</span><span className="font-bold text-slate-800">Nepal</span></div>
            <div><span className="block text-slate-400 text-xs mb-1">Period</span><span className="font-bold text-slate-800">{year}</span></div>
            <div><span className="block text-slate-400 text-xs mb-1">Currency</span><span className="font-bold text-slate-800">NPR</span></div>
            <div><span className="block text-slate-400 text-xs mb-1">Primary unit</span><span className="font-bold text-slate-800">Tola (11.66g)</span></div>
            <div><span className="block text-slate-400 text-xs mb-1">Trading Sessions</span><span className="font-bold text-slate-800">{tableData.length}</span></div>
            <div><span className="block text-slate-400 text-xs mb-1">Total Records</span><span className="font-bold text-slate-800">{yearRecords.length}</span></div>
            <div><span className="block text-slate-400 text-xs mb-1">First available date</span><span className="font-bold text-slate-800">{firstGold?.date_ad || 'N/A'}</span></div>
            <div><span className="block text-slate-400 text-xs mb-1">Latest available date</span><span className="font-bold text-slate-800">{latestGold?.date_ad || 'N/A'}</span></div>
            <div><span className="block text-slate-400 text-xs mb-1">Last verified</span><span className="font-bold text-slate-800">{dataset.meta?.last_updated_ad || '2026-11-15'}</span></div>
            <div className="col-span-2"><span className="block text-slate-400 text-xs mb-1">Source</span><span className="font-bold text-slate-800">Official FENEGOSIDA Records</span></div>
          </div>
        </section>

        {/* 10. Year-Specific FAQ Section (People Also Ask) */}
        <section className="w-full space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              FAQ &amp; Quick Answers
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Frequently Asked Questions About Gold Rates in Nepal ({year})
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

        {/* 11. Browse Other Years Navigation */}
        <section className="w-full">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Browse Other Historical Years</h2>
          <div className="flex flex-wrap gap-2">
            <Link 
              href="/market-rates/history/" 
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-amber-50 hover:border-amber-200 text-sm font-semibold transition-colors text-amber-800"
            >
              ← All Years Hub (2013 – 2026)
            </Link>
            {YEARS.map((yr) => (
              <Link 
                key={yr} 
                href={`/market-rates/history/${yr}/`}
                className={`px-4 py-2 border rounded-lg text-sm font-bold transition-colors ${
                  yr === year 
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
                    : 'bg-white border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-700'
                }`}
              >
                {yr}
              </Link>
            ))}
          </div>
        </section>

        {/* 12. Related market-rate links */}
        <section className="w-full bg-white p-5 rounded-xl border border-slate-200 text-sm">
          <h2 className="text-base font-bold text-slate-900 mb-2">Related Market Rates &amp; Bullion Tools</h2>
          <div className="flex flex-wrap gap-4 text-amber-700 font-semibold">
            <Link href="/market-rates/" className="hover:underline">Today&apos;s Live Gold &amp; Silver Rate →</Link>
            <Link href="/market-rates/live-gold-price/" className="hover:underline">Live Gold Price in Nepal →</Link>
            <Link href="/market-rates/silver-price-nepal/" className="hover:underline">Silver Price Today →</Link>
            <Link href="/market-rates/history/" className="hover:underline">All-Time Gold History Hub →</Link>
          </div>
        </section>

        {/* 13. Source and methodology */}
        <section className="w-full bg-slate-100 p-6 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2 pb-8">
          <h2 className="text-base font-bold text-slate-900">Source and Methodology</h2>
          <p>
            Historical gold and silver rates are compiled directly from daily bulletins published by FENEGOSIDA (Federation of Nepal Gold and Silver Dealers’ Association).
          </p>
          <p>
            Rates are recorded with both Gregorian (A.D.) and Bikram Sambat (B.S.) calendar dates. Missing historical dates are not interpolated or estimated. Values per gram, 10 grams, Anna, and Lal are calculated deterministically from the recorded tola benchmark.
          </p>
        </section>

      </main>
    </div>
  );
}
