import React from 'react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gold Rate History in Nepal – Historical Gold Prices',
  description: 'Historical gold and silver rates in Nepal by date, including gold and silver prices per tola and other available units.',
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/history/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'NepaCalc',
    title: 'Gold Rate History in Nepal – Historical Gold Prices',
    description: 'Historical gold and silver rates in Nepal by date, including gold and silver prices per tola and other available units.',
    url: 'https://nepacalc.com/market-rates/history/',
    images: [{ url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg', width: 1200, height: 630, alt: 'Gold Rate History in Nepal' }]
  },
};

export default function HistoryHubPage() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'historical-rates.json');
  let dataset: { data: any[]; meta: any } = { data: [], meta: {} };

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
    if (r.metal === 'Gold' && (r.rate_type.includes('Fine') || r.rate_type === '24K Hallmark Gold')) {
      g.fine_gold = r.source_per_tola;
    }
    if (r.metal === 'Silver') {
      g.silver = r.source_per_tola;
    }
    if (!g.date_bs && r.date_bs) g.date_bs = r.date_bs;
  });

  const tableData = Array.from(grouped.values()).sort((a, b) => new Date(b.date_ad).getTime() - new Date(a.date_ad).getTime());
  
  const recentRecords = tableData.slice(0, 30);
  const years = Array.from(new Set(allRecords.map(r => r.date_ad?.substring(0, 4)).filter(Boolean))).sort((a, b) => Number(b) - Number(a));

  // Statistics Calculation
  let gMax = 0, gMin = Infinity, gSum = 0, gCount = 0;
  let sMax = 0, sMin = Infinity, sSum = 0, sCount = 0;
  
  const goldRecords = tableData.filter(d => d.fine_gold !== null);
  const silverRecords = tableData.filter(d => d.silver !== null);
  
  goldRecords.forEach(d => {
    const val = d.fine_gold as number;
    gSum += val; gCount++;
    if (val > gMax) gMax = val;
    if (val < gMin) gMin = val;
  });
  
  silverRecords.forEach(d => {
    const val = d.silver as number;
    sSum += val; sCount++;
    if (val > sMax) sMax = val;
    if (val < sMin) sMin = val;
  });

  const latestGold = goldRecords[0];
  const firstGold = goldRecords[goldRecords.length - 1];
  const avgGold = gCount > 0 ? gSum / gCount : 0;

  const latestSilver = silverRecords[0];
  const firstSilver = silverRecords[silverRecords.length - 1];
  const avgSilver = sCount > 0 ? sSum / sCount : 0;

  const fmtNPR = (num: number | null) => num === null || num === Infinity ? 'N/A' : new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);

  // Unit Conversions (using latest gold rate)
  const currentGoldRate = latestGold?.fine_gold || 0;
  const tolaInGrams = 11.6638;
  const troyOunceInGrams = 31.1034768;
  const ratePerGram = currentGoldRate / tolaInGrams;

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
    name: 'Gold Rate History in Nepal',
    description: 'Historical gold and silver rates in Nepal by date, including rates per tola and other available units.',
    url: 'https://nepacalc.com/market-rates/history/',
    spatialCoverage: {
      '@type': 'Place',
      name: 'Nepal'
    },
    creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    dateModified: dataset.meta?.last_updated_ad || new Date().toISOString().split('T')[0],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-800">
        
        {/* H1 & Intro */}
        <header className="max-w-4xl mb-6"><h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Gold Rate History in Nepal</h1></header>

        {/* The Dataset Table */}
        <section className="max-w-4xl">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Gold and Silver Rate History</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                <caption className="sr-only">Gold and Silver Rate History in Nepal</caption>
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                  <tr>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">Date (A.D.)</th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">Date (B.S.)</th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap text-right">Gold Rate / Tola</th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap text-right">Silver Rate / Tola</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentRecords.map((row) => (
                    <tr key={row.date_ad} className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-slate-900 whitespace-nowrap">{row.date_ad}</td>
                      <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{row.date_bs || '-'}</td>
                      <td className="px-4 py-2.5 font-bold text-amber-700 text-right whitespace-nowrap">
                        {row.fine_gold ? `NPR ${fmtNPR(row.fine_gold)}` : '-'}
                      </td>
                      <td className="px-4 py-2.5 font-bold text-slate-600 text-right whitespace-nowrap">
                        {row.silver ? `NPR ${fmtNPR(row.silver)}` : '-'}
                      </td>
                    </tr>
                  ))}
                  {recentRecords.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-10 text-center text-slate-500">No historical records available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Showing the {recentRecords.length} most recent historical records.</p>
        </section>

        {/* Intro moved below dataset */}
        <section className="max-w-4xl">
          <p className="text-lg leading-relaxed text-slate-700">
            Historical gold and silver rates in Nepal by date, including gold and silver prices per tola and other available units.
          </p>
        </section>

        {/* Year Navigation */}
        <section className="max-w-4xl">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Gold Rate History by Year</h2>
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
        <section className="max-w-4xl">
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
                  <td className="px-6 py-3 font-medium">Highest recorded gold rate</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(gMax)} / tola</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Lowest recorded gold rate</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(gMin)} / tola</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Average recorded gold rate</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(avgGold)} / tola</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">First recorded gold rate</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(firstGold?.fine_gold ?? null)} / tola <span className="font-normal text-xs text-slate-500 block">on {firstGold?.date_ad}</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Latest recorded gold rate</td>
                  <td className="px-6 py-3 font-bold text-right text-amber-700">NPR {fmtNPR(latestGold?.fine_gold ?? null)} / tola <span className="font-normal text-xs text-slate-500 block">on {latestGold?.date_ad}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Historical Silver Rate Statistics */}
        {sCount > 0 && (
          <section className="max-w-4xl">
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
                    <td className="px-6 py-3 font-medium">Highest recorded silver rate</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(sMax)} / tola</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">Lowest recorded silver rate</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(sMin)} / tola</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">Average recorded silver rate</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(avgSilver)} / tola</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">First recorded silver rate</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(firstSilver?.silver ?? null)} / tola <span className="font-normal text-xs text-slate-500 block">on {firstSilver?.date_ad}</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium">Latest recorded silver rate</td>
                    <td className="px-6 py-3 font-bold text-right text-slate-700">NPR {fmtNPR(latestSilver?.silver ?? null)} / tola <span className="font-normal text-xs text-slate-500 block">on {latestSilver?.date_ad}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Gold Rate by Unit */}
        <section className="max-w-4xl">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Gold Rate by Unit</h2>
          <p className="text-sm text-slate-600 mb-4">
            Gold rates in the archive are recorded primarily per tola. Equivalent values for other units are calculated using the defined conversion methodology. 
            <br/><span className="italic">Based on the latest recorded gold rate shown above ({latestGold?.date_ad}).</span>
          </p>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-3">Unit</th>
                  <th scope="col" className="px-6 py-3 text-right">Equivalent Rate</th>
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
        <section className="max-w-4xl">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Historical Data Coverage</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-3">Dataset</th>
                  <th scope="col" className="px-6 py-3 text-right">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Gold</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">{years[years.length - 1]}–{years[0]}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Silver</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">{years[years.length - 1]}–{years[0]}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Primary unit</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">Per tola</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium">Additional units</td>
                  <td className="px-6 py-3 font-bold text-right text-slate-700">Per 10g, gram, kg, etc.</td>
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

        {/* Data Source and Methodology */}
        <section className="max-w-4xl space-y-3 pb-8">
          <h2 className="text-2xl font-black text-slate-900">Data Source and Methodology</h2>
          <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-3">
            <p>
              Historical rates are compiled from documented sources for the archive. Missing values are not estimated or fabricated, and calculated units are deterministically derived from recorded source values.
            </p>
            <p>
              Dates are represented in both Gregorian (A.D.) and Bikram Sambat (B.S.) formats where recorded. Historical corrections, when verified against source announcements, update the entire archive seamlessly.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
