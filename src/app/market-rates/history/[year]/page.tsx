import React from 'react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import YearClientFilter from './YearClientFilter';
import NepaliDate from 'nepali-date-converter';
import YearClientChart from './YearClientChart';

const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'];

export async function generateStaticParams() {
  return YEARS.map((year) => ({ year }));
}

export async function generateMetadata({ params }: { params: { year: string } }): Promise<Metadata> {
  const year = params.year;
  const title = `Gold Rate History ${year} – Nepal Gold Prices by Date`;
  const description = `View historical gold rates in Nepal for ${year} by date, including 24K hallmark and 22K gold prices per tola and other available units.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nepacalc.com/market-rates/history/${year}/`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      siteName: 'NepaCalc',
      title,
      description,
      url: `https://nepacalc.com/market-rates/history/${year}/`,
      images: [{ url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg', width: 1200, height: 630, alt: title }]
    }
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

  // Data processing: Group by date
  const grouped = new Map();
  yearRecords.forEach(r => {
    if (!grouped.has(r.date_ad)) {
      grouped.set(r.date_ad, {
        date_ad: r.date_ad,
        date_bs: r.date_bs,
        fine_gold: null,
        tejabi_gold: null,
        silver: null,
        source: r.source,
      });
    }
    const g = grouped.get(r.date_ad);
    if (r.metal === 'Gold' && (r.rate_type.includes('Fine') || r.rate_type === '24K Hallmark Gold' || r.rate_type === 'Gold Rate Per Tola' || r.rate_type === 'Gold')) {
      g.fine_gold = r.source_per_tola;
    }
    if (r.metal === 'Gold' && r.rate_type.includes('Tejabi')) {
      g.tejabi_gold = r.source_per_tola;
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

  // Summary logic
  const goldRecordsForSummary = tableData.filter(d => d.fine_gold !== null);
  const latestGold = goldRecordsForSummary[0];
  const firstGold = goldRecordsForSummary[goldRecordsForSummary.length - 1];
  
  let maxGold: number | null = null;
  let maxGoldDate = '';
  let minGold: number | null = null;
  let minGoldDate = '';
  let sumGold = 0;

  goldRecordsForSummary.forEach(d => {
    const val = d.fine_gold as number;
    sumGold += val;
    if (maxGold === null || val > maxGold) { maxGold = val; maxGoldDate = d.date_ad; }
    if (minGold === null || val < minGold) { minGold = val; minGoldDate = d.date_ad; }
  });

  const avgGold = goldRecordsForSummary.length > 0 ? sumGold / goldRecordsForSummary.length : null;
  const change = (firstGold && latestGold) ? (latestGold.fine_gold as number) - (firstGold.fine_gold as number) : null;

  // Silver Summary logic
  const silverRecordsForSummary = tableData.filter(d => d.silver !== null);
  const latestSilver = silverRecordsForSummary[0];
  const firstSilver = silverRecordsForSummary[silverRecordsForSummary.length - 1];
  
  let maxSilver: null | number = null;
  let maxSilverDate = '';
  let minSilver: null | number = null;
  let minSilverDate = '';
  let sumSilver = 0;

  silverRecordsForSummary.forEach(d => {
    const val = d.silver;
    sumSilver += val;
    if (maxSilver === null || val > maxSilver) { maxSilver = val; maxSilverDate = d.date_ad; }
    if (minSilver === null || val < minSilver) { minSilver = val; minSilverDate = d.date_ad; }
  });

  const avgSilver = silverRecordsForSummary.length > 0 ? sumSilver / silverRecordsForSummary.length : null;
  const changeSilver = (firstSilver && latestSilver) ? latestSilver.silver - firstSilver.silver : null;

  const fmtNPR = (num: number | null) => num === null ? 'N/A' : new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);

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
    name: `Gold Rate History ${year}`,
    description: `Historical gold rates in Nepal for ${year} by date, including 24K hallmark and 22K gold prices per tola.`,
    url: `https://nepacalc.com/market-rates/history/${year}/`,
    creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    dateModified: dataset.meta?.last_updated_ad || new Date().toISOString().split('T')[0],
    spatialCoverage: 'Nepal',
    temporalCoverage: year,
    variableMeasured: [
      '24K hallmark gold rate per tola',
      '22K tejabi gold rate per tola',
      'silver rate per tola'
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* 1. Breadcrumb */}
        <nav className="text-sm font-medium text-slate-500 mb-4">
          <Link href="/" className="hover:text-amber-700">Home</Link> &gt;{' '}
          <Link href="/market-rates/" className="hover:text-amber-700">Market Rates</Link> &gt;{' '}
          <Link href="/market-rates/history/" className="hover:text-amber-700">History</Link> &gt;{' '}
          <span className="text-slate-900">{year}</span>
        </nav>

        {/* 2. H1 & 3. Short Description */}
        <header className="max-w-4xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Gold Rate History {year}
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            Historical gold rates in Nepal for {year}, with daily rates by date in A.D. and B.S. The archive includes gold rates per tola and other available units.
          </p>
        </header>

        {/* 4. Dataset Summary */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-4xl">
          <h2 className="text-sm font-black uppercase text-slate-500 mb-4">Dataset Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="block text-slate-400">Dataset</span><span className="font-bold">Nepal Gold History</span></div>
            <div><span className="block text-slate-400">Location</span><span className="font-bold">Nepal</span></div>
            <div><span className="block text-slate-400">Period</span><span className="font-bold">{year}</span></div>
            <div><span className="block text-slate-400">Currency</span><span className="font-bold">NPR</span></div>
            <div><span className="block text-slate-400">Primary unit</span><span className="font-bold">Tola (11.66g)</span></div>
            <div><span className="block text-slate-400">Number of dates</span><span className="font-bold">{tableData.length}</span></div>
            <div><span className="block text-slate-400">Number of records</span><span className="font-bold">{yearRecords.length}</span></div>
            <div><span className="block text-slate-400">First available date</span><span className="font-bold">{firstGold?.date_ad || 'N/A'}</span></div>
            <div><span className="block text-slate-400">Latest available date</span><span className="font-bold">{latestGold?.date_ad || 'N/A'}</span></div>
            <div><span className="block text-slate-400">Last verified</span><span className="font-bold">{dataset.meta?.last_updated_ad || 'N/A'}</span></div>
            <div className="col-span-2"><span className="block text-slate-400">Source</span><span className="font-bold">Official Sources</span></div>
          </div>
        </section>

        {/* 5. Summary Layer */}
        <section className="max-w-4xl space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Gold Rate Summary for {year}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Latest Recorded (24K)</span>
              <span className="block text-xl font-black text-amber-700">{fmtNPR(latestGold?.fine_gold ?? null)}</span>
              <span className="block text-xs text-slate-400">{latestGold?.date_ad}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Highest Recorded (24K)</span>
              <span className="block text-xl font-black text-amber-700">{fmtNPR(maxGold)}</span>
              <span className="block text-xs text-slate-400">{maxGoldDate}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Lowest Recorded (24K)</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(minGold)}</span>
              <span className="block text-xs text-slate-400">{minGoldDate}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Average Rate (24K)</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(avgGold)}</span>
              <span className="block text-xs text-slate-400">per tola</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">First Recorded (24K)</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(firstGold?.fine_gold ?? null)}</span>
              <span className="block text-xs text-slate-400">{firstGold?.date_ad}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Change ({year})</span>
              <span className={`block text-xl font-black ${change && change > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {change !== null ? (change > 0 ? '+' : '') + fmtNPR(change) : 'N/A'}
              </span>
              <span className="block text-xs text-slate-400">per tola</span>
            </div>
          </div>
        </section>

        {/* Silver Rate Summary */}
        <section className="max-w-4xl space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Silver Rate Summary for {year}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Latest Recorded</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(latestSilver?.silver ?? null)}</span>
              <span className="block text-xs text-slate-400">{latestSilver?.date_ad || 'N/A'}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Highest Recorded</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(maxSilver)}</span>
              <span className="block text-xs text-slate-400">{maxSilverDate || 'N/A'}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Lowest Recorded</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(minSilver)}</span>
              <span className="block text-xs text-slate-400">{minSilverDate || 'N/A'}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Average Rate</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(avgSilver)}</span>
              <span className="block text-xs text-slate-400">per tola</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">First Recorded</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(firstSilver?.silver ?? null)}</span>
              <span className="block text-xs text-slate-400">{firstSilver?.date_ad || 'N/A'}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Change ({year})</span>
              <span className={`block text-xl font-black ${changeSilver && changeSilver > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {changeSilver !== null ? (changeSilver > 0 ? '+' : '') + fmtNPR(changeSilver) : 'N/A'}
              </span>
              <span className="block text-xs text-slate-400">per tola</span>
            </div>
          </div>
        </section>

        {/* 7. Chart/visualization */}
        <div className="max-w-4xl">
          <YearClientChart data={tableData} />
        </div>

        {/* 6. Historical table & 9. Filter */}
        <section className="max-w-4xl">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl font-black text-slate-900">Historical Data Table</h2>
          </div>
          <YearClientFilter>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse min-w-[800px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Date (A.D.)</th>
                    <th className="px-4 py-3 whitespace-nowrap">Date (B.S.)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">24K Hallmark Gold (NPR/tola)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">22K Tejabi Gold (NPR/tola)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">Silver (NPR/tola)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.map((row) => (
                    <tr 
                      key={row.date_ad} 
                      className="history-row hover:bg-amber-50/40 transition-colors"
                      data-date-ad={row.date_ad}
                      data-date-bs={row.date_bs || ''}
                    >
                      <td className="px-4 py-2.5 font-bold text-slate-900 whitespace-nowrap">{row.date_ad}</td>
                      <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{row.date_bs || '-'}</td>
                      <td className="px-4 py-2.5 font-bold text-amber-700 text-right whitespace-nowrap">{fmtNPR(row.fine_gold)}</td>
                      <td className="px-4 py-2.5 font-bold text-amber-600 text-right whitespace-nowrap">{fmtNPR(row.tejabi_gold)}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-500 text-right whitespace-nowrap">{fmtNPR(row.silver)}</td>
                    </tr>
                  ))}
                  {tableData.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-slate-500">No historical records available for {year}.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </YearClientFilter>
        </section>

        {/* 8. Source and methodology */}
        <section className="bg-slate-100 p-6 rounded-xl border border-slate-200 max-w-4xl text-sm text-slate-700 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Source and Methodology</h2>
          <p>
            These historical data are compiled from official sources. 
          </p>
          <p>
            Missing historical dates are not filled using estimates, interpolation, or previous-day prices. We group multiple records (e.g., gold and silver) intelligently by date without destructive deduplication. All rate summaries are calculated directly from this available dataset.
          </p>
        </section>

        {/* 9. Year navigation */}
        <section className="max-w-4xl">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Browse Other Years</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/market-rates/history/" className="px-4 py-2 bg-white border border-slate-200 rounded hover:bg-amber-50 hover:border-amber-200 text-sm font-medium transition-colors">
              All Years Hub
            </Link>
            {YEARS.map((yr) => (
              <Link 
                key={yr} 
                href={`/market-rates/history/${yr}/`}
                className={`px-4 py-2 border rounded text-sm font-medium transition-colors ${yr === year ? 'bg-amber-500 text-white border-amber-600' : 'bg-white border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-700'}`}
              >
                {yr}
              </Link>
            ))}
          </div>
        </section>

        {/* 10. Related market-rate links */}
        <section className="max-w-4xl">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Related Market Rates</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li><Link href="/market-rates/live-gold-price/" className="text-amber-700 hover:underline">Live Gold Price in Nepal</Link></li>
            <li><Link href="/market-rates/silver-price-nepal/" className="text-amber-700 hover:underline">Today&apos;s Silver Price in Nepal</Link></li>
          </ul>
        </section>

      </main>
    </div>
  );
}
