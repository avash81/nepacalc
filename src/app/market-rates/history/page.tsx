import React from 'react';
import { Metadata } from 'next';
import HistoryClient from './HistoryClient';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Gold & Silver Price History in Nepal | NepaCalc',
  description: 'View historical gold and silver prices in Nepal by date, year and unit. Compare per-tola and per-10g rates with source and verification details.',
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/history/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'NepaCalc',
    title: 'Gold & Silver Price History in Nepal | NepaCalc',
    description: 'View historical gold and silver prices in Nepal by date, year and unit. Compare per-tola and per-10g rates with source and verification details.',
    url: 'https://nepacalc.com/market-rates/history/',
    images: [
      {
        url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg',
        width: 1200,
        height: 630,
        alt: 'Historical Gold and Silver Price in Nepal - NepaCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold and Silver Price History: Tola, Gram & Kilogram Rates',
    description: 'Gold price history in Nepal with historical gold and silver rates by date. View verified rates per tola and 10 grams, sourced from FENEGOSIDA, with historical data downloads.',
    images: ['https://nepacalc.com/images/og/history-gold-silver-nepal.jpg'],
  },
  other: {
    thumbnail: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg',
    'image_src': 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg',
  }
};

export default async function HistoryPage() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'historical-rates.json');
  let dataset: any = { data: [], meta: {} };

  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    dataset = JSON.parse(fileContents);
  } catch (e) {
    console.error('Failed to load historical data', e);
  }

  const records: any[] = dataset.data || [];

  // ── Dynamic dataset facts derived from actual data ──
  const totalGold    = records.filter((r) => r.metal === 'gold').length;
  const totalSilver  = records.filter((r) => r.metal === 'silver').length;
  
  // Unique dates
  const allDates   = new Set(records.map((r) => r.date_ad));
  const totalDateCount = allDates.size;

  // Latest record date
  const sortedDates = Array.from(allDates).sort();
  const earliestDate = sortedDates[0] ?? null;
  const latestDate   = sortedDates[sortedDates.length - 1] ?? null;

  // Format: "25 September 2026"
  const fmtDate = (d: string | null) => {
    if (!d) return 'N/A';
    const dt = new Date(d + 'T00:00:00Z');
    return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold and Silver Price History in Nepal', item: 'https://nepacalc.com/market-rates/history/' }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is the historical gold price in Nepal?', acceptedAnswer: { '@type': 'Answer', text: 'Historical gold prices in Nepal vary by date and source record. Use the historical table above to select a date and view the available gold rate per tola and per 10 grams, along with its source and verification status.' } },
      { '@type': 'Question', name: 'Where can I find gold price history in Nepal?', acceptedAnswer: { '@type': 'Answer', text: 'NepaCalc provides a date-based archive of available historical gold prices in Nepal, including source prices per tola and per 10 grams, calculated unit equivalents, source information, and verification status.' } },
      { '@type': 'Question', name: 'What was the gold price in Nepal on a specific date?', acceptedAnswer: { '@type': 'Answer', text: 'Select the date using the historical date filter above. When a verified record is available, NepaCalc shows the gold rate for that date with its BS date, source, rate type, and per-tola and per-10-gram prices.' } },
      { '@type': 'Question', name: 'Is historical gold price shown per tola or per 10 grams in Nepal?', acceptedAnswer: { '@type': 'Answer', text: 'The historical table preserves available source prices per tola and per 10 grams. NepaCalc also provides calculated per-gram and per-kilogram equivalents using 1 tola = 11.664 grams.' } },
      { '@type': 'Question', name: 'What is the historical silver price in Nepal?', acceptedAnswer: { '@type': 'Answer', text: 'Select Silver in the historical table to view available silver rates by date. The table shows source prices per tola and per 10 grams, together with calculated equivalents, source information, and verification status.' } },
      { '@type': 'Question', name: 'What is one tola of gold or silver in grams?', acceptedAnswer: { '@type': 'Answer', text: 'For calculations on this page, 1 tola equals 11.664 grams. Per-gram and per-kilogram values are calculated from the source price per tola using this conversion.' } },
      { '@type': 'Question', name: 'Does NepaCalc estimate missing historical gold or silver prices?', acceptedAnswer: { '@type': 'Answer', text: 'No. NepaCalc does not fill missing historical dates using interpolation, previous prices, carried-forward values, or estimates. Dates without a reliable verified record are identified as unavailable.' } },
      { '@type': 'Question', name: 'What does Fine Gold (9999) mean in the historical records?', acceptedAnswer: { '@type': 'Answer', text: 'Fine Gold (9999) is the terminology used in applicable source records. NepaCalc preserves the source terminology rather than automatically relabelling the record as another purity or product category.' } }
    ]
  };

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Gold and Silver Price History in Nepal',
    description: 'Historical gold and silver market rates in Nepal with dates in AD and BS, source values per tola and per 10 grams, calculated unit equivalents, source attribution and verification status.',
    url: 'https://nepacalc.com/market-rates/history/',
    spatialCoverage: 'Nepal',
    ...(earliestDate && latestDate ? { temporalCoverage: `${earliestDate}/${latestDate}` } : {}),
    variableMeasured: [
      'Gold price per tola',
      'Gold price per 10 grams',
      'Silver price per tola',
      'Silver price per 10 grams',
    ],
    unitText: 'NPR',
    creator: { '@type': 'Organization', name: 'NepaCalc' },
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: 'https://nepacalc.com/data/historical-rates.json',
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: 'https://nepacalc.com/data/historical-rates.csv',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── HEADER ── */}
        <header className="mb-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Gold and Silver Price History in Nepal
          </h1>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            Historical gold and silver market rates in Nepal, organized by date. The archive includes verified FENEGOSIDA records and clearly identified secondary historical records where available. Source and verification status are preserved for each record.
          </p>
        </header>

        {/* ── YEAR NAVIGATION ── */}
        <div className="mb-8 p-4 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center gap-3 max-w-4xl">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">History by Year</span>
          <span className="text-slate-300">|</span>
          <a href="/market-rates/history/" className="text-sm font-bold text-slate-900 underline font-black">All Years</a>
          {['2026', '2025', '2024', '2023', '2022', '2021'].map((yr) => (
            <React.Fragment key={yr}>
              <span className="text-slate-300">|</span>
              <a
                href={`/market-rates/history/${yr}/`}
                className="text-sm font-bold text-amber-700 hover:text-amber-900 hover:underline"
              >
                {yr}
              </a>
            </React.Fragment>
          ))}
        </div>

        {/* ── INTERACTIVE CLIENT: Answer Box + Converter + Table ── */}
        <HistoryClient records={records} />

        {/* ── DOWNLOADS ── */}
        <div className="mt-6 mb-4 flex flex-wrap gap-4 items-center max-w-4xl">
          <a
            href="/data/historical-rates.json"
            download
            className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download JSON
          </a>
          <a
            href="/data/historical-rates.csv"
            download
            className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CSV
          </a>
        </div>

        {/* ── EXPLANATORY CONTENT ── */}
        <section className="mt-6 pt-8 border-t border-slate-200 max-w-4xl space-y-4 text-sm text-slate-700 font-medium leading-relaxed">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">
            Historical Gold and Silver Data in Nepal
          </h2>
          <p>
            NepaCalc provides available historical gold and silver rates in Nepal by date, with source-published prices shown per tola and per 10 grams. Per-gram and per-kilogram values are calculated separately using 1 tola = 11.664 grams.
          </p>
          <p>
            Verified records use FENEGOSIDA as the primary source where a corresponding source record is available. Source terminology is preserved, including labels such as Fine Gold (9999), Tejabi Gold, and Silver, rather than assigning an unsupported purity or product category.
          </p>
          <p>
            Historical coverage is not continuous for every calendar date. When a reliable source record is unavailable or has not been independently verified, NepaCalc does not estimate, interpolate, or carry forward a price.
          </p>
          <p>
            Secondary historical records, where included, are identified separately by source and verification status. Source-published prices are preserved as published, while calculated unit equivalents are clearly distinguished from source values.
          </p>
        </section>

        {/* ── HISTORICAL DATA AT A GLANCE (dynamic dataset facts) ── */}
        <section className="mt-8 mb-8 p-5 bg-white border border-slate-200 rounded-xl max-w-4xl" aria-label="Historical Data at a Glance">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">Historical Data at a Glance</h2>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-6 text-sm">
            <div>
              <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total gold records</dt>
              <dd className="font-black text-slate-900 text-lg tabular-nums">{totalGold}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total silver records</dt>
              <dd className="font-black text-slate-900 text-lg tabular-nums">{totalSilver}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total dates</dt>
              <dd className="font-black text-slate-900 text-lg tabular-nums">{totalDateCount}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">Latest record</dt>
              <dd className="font-black text-slate-900 text-sm">{fmtDate(latestDate)}</dd>
            </div>
          </dl>
          {earliestDate && latestDate && (
            <p className="mt-4 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
              Historical coverage spans from {fmtDate(earliestDate)} to {fmtDate(latestDate)}, representing {totalDateCount} unique days of market rates. This data dynamically updates automatically whenever new historical rates are fetched and verified.
            </p>
          )}
        </section>

        {/* ── DATASET SUMMARY TABLE ── */}
        <section className="mt-10 pt-8 border-t border-slate-200 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">
            Dataset Overview
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-700">
                <tr>
                  <th className="px-4 py-3">Data item</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Primary source</td>
                  <td className="px-4 py-3 text-slate-700">FENEGOSIDA</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Metals</td>
                  <td className="px-4 py-3 text-slate-700">Gold and Silver</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Source units</td>
                  <td className="px-4 py-3 text-slate-700">Per tola and per 10 grams</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Calculated units</td>
                  <td className="px-4 py-3 text-slate-700">Per gram and per kilogram</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Tola conversion</td>
                  <td className="px-4 py-3 text-slate-700">1 tola = 11.664 grams</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Date systems</td>
                  <td className="px-4 py-3 text-slate-700">AD and BS</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Missing dates</td>
                  <td className="px-4 py-3 text-slate-700">Not estimated or interpolated</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Verification</td>
                  <td className="px-4 py-3 text-slate-700">Shown for each record</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>


        {/* ── HISTORICAL CHART HEADING ── */}
        <section className="mt-10 pt-8 border-t border-slate-200 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-2">
            Historical Gold and Silver Price Chart
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Compare available historical rates by metal, rate type, unit, and date range. The chart uses available source records and does not estimate values for missing dates.
          </p>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="mt-10 pt-8 border-t border-slate-200 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">What is the historical gold price in Nepal?</h3>
              <p className="text-slate-600 leading-relaxed">
                Historical gold prices in Nepal vary by date and source record. Use the historical table above to select a date and view the available gold rate per tola and per 10 grams, along with its source and verification status.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Where can I find gold price history in Nepal?</h3>
              <p className="text-slate-600 leading-relaxed">
                NepaCalc provides a date-based archive of available historical gold prices in Nepal, including source prices per tola and per 10 grams, calculated unit equivalents, source information, and verification status.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">What was the gold price in Nepal on a specific date?</h3>
              <p className="text-slate-600 leading-relaxed">
                Select the date using the historical date filter above. When a verified record is available, NepaCalc shows the gold rate for that date with its BS date, source, rate type, and per-tola and per-10-gram prices.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Is historical gold price shown per tola or per 10 grams in Nepal?</h3>
              <p className="text-slate-600 leading-relaxed">
                The historical table preserves available source prices per tola and per 10 grams. NepaCalc also provides calculated per-gram and per-kilogram equivalents using 1 tola = 11.664 grams.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">What is the historical silver price in Nepal?</h3>
              <p className="text-slate-600 leading-relaxed">
                Select Silver in the historical table to view available silver rates by date. The table shows source prices per tola and per 10 grams, together with calculated equivalents, source information, and verification status.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">What is one tola of gold or silver in grams?</h3>
              <p className="text-slate-600 leading-relaxed">
                For calculations on this page, 1 tola equals 11.664 grams. Per-gram and per-kilogram values are calculated from the source price per tola using this conversion.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Does NepaCalc estimate missing historical gold or silver prices?</h3>
              <p className="text-slate-600 leading-relaxed">
                No. NepaCalc does not fill missing historical dates using interpolation, previous prices, carried-forward values, or estimates. Dates without a reliable verified record are identified as unavailable.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">What does Fine Gold (9999) mean in the historical records?</h3>
              <p className="text-slate-600 leading-relaxed">
                Fine Gold (9999) is the terminology used in applicable source records. NepaCalc preserves the source terminology rather than automatically relabelling the record as another purity or product category.
              </p>
            </div>
          </div>
        </section>

        {/* ── DATA SOURCE ── */}
        <section className="mt-10 pt-8 border-t border-slate-200 max-w-4xl space-y-4 text-sm text-slate-700 font-medium leading-relaxed">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">
            Data Source
          </h2>
          <p>
            Historical source records are preserved with their source terminology, source values, source URL where available, and verification status. FENEGOSIDA records are treated as the primary source for verified historical rates in this archive. Secondary historical records are kept separately identified and are not presented as primary verified records.
          </p>
          <p>
            Prices published directly by a source per tola or per 10 grams are preserved as source values. Per-gram and per-kilogram figures are calculated equivalents using 1 tola = 11.664 grams.
          </p>
          <p>
            NepaCalc does not fill missing historical dates by interpolation, estimated values, or carried-forward prices. Where source records conflict, the conflicting records are not silently merged.
          </p>

          <h3 className="text-base font-black text-slate-900 tracking-tight mt-6 mb-2">
            Source Values and Calculated Values
          </h3>
          <p>
            Per-tola and per-10-gram figures are preserved from the source record when directly published. Per-gram and per-kilogram figures are calculated by NepaCalc and are not separate source quotations.
          </p>

          <h3 className="text-base font-black text-slate-900 tracking-tight mt-6 mb-2">
            Verification Status
          </h3>
          <ul className="space-y-2 text-sm text-slate-700 list-none pl-0">
            <li><span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 mr-2">Verified</span> means the record is supported by the designated primary source.</li>
            <li><span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 mr-2">Corroborated</span> means a secondary source matches an independently verified primary-source record.</li>
            <li><span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 mr-2">Secondary-only</span> means a historical record is available from a secondary source but has not been independently verified against a primary-source record.</li>
            <li><span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 mr-2">Conflict</span> means available sources provide different values for the same historical record and the discrepancy has not been resolved.</li>
          </ul>
        </section>

        {/* ── RELATED TOOLS ── */}
        <section className="mt-8 pt-6 border-t border-slate-200 max-w-4xl">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Related Tools</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="/market-rates/live-gold-price/" className="text-amber-700 font-semibold hover:underline">Today&apos;s Gold Price in Nepal</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/market-rates/silver-price-nepal/" className="text-slate-700 font-semibold hover:underline">Today&apos;s Silver Price in Nepal</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/calculator/gold-converter/" className="text-slate-700 font-semibold hover:underline">Gold Converter</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/calculator/silver-converter/" className="text-slate-700 font-semibold hover:underline">Silver Converter</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/market-rates/" className="text-slate-700 font-semibold hover:underline">All Market Rates</a>
          </div>
        </section>

      </main>
    </div>
  );
}
