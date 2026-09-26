import React from 'react';
import { Metadata } from 'next';
import HistoryClient from './HistoryClient';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Gold and Silver Price History: Tola, Gram & Kilogram Rates',
  description: 'Gold price history in Nepal with historical gold and silver rates by date. View verified rates per tola and 10 grams, sourced from FENEGOSIDA, with historical data downloads.',
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
    title: 'Gold and Silver Price History: Tola, Gram \u0026 Kilogram Rates',
    description: 'Gold price history in Nepal with historical gold and silver rates by date. View verified rates per tola and 10 grams, sourced from FENEGOSIDA, with historical data downloads.',
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
    title: 'Gold and Silver Price History: Tola, Gram \u0026 Kilogram Rates',
    description: 'Gold price history in Nepal with historical gold and silver rates by date. View verified rates per tola and 10 grams, sourced from FENEGOSIDA, with historical data downloads.',
    images: ['https://nepacalc.com/images/og/history-gold-silver-nepal.jpg'],
  },
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold & Silver Price History in Nepal', item: 'https://nepacalc.com/market-rates/history/' }
    ]
  };

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Historical Gold and Silver Prices in Nepal',
    description: 'Verified historical gold and silver prices in Nepal based on official FENEGOSIDA records. Includes source rates per 10g and per tola, along with calculated gram and kilogram equivalents.',
    url: 'https://nepacalc.com/market-rates/history/',
    creator: {
      '@type': 'Organization',
      name: 'NepaCalc'
    },
    temporalCoverage: '2024-06-02/2026-09-25',
    dateCreated: '2026-09-25',
    dateModified: '2026-09-25',
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: 'https://nepacalc.com/data/historical-rates.json'
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: 'https://nepacalc.com/data/historical-rates.csv'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Gold and Silver Prices History
          </h1>
          <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
            Historical gold and silver market rates in Nepal, organized by date and sourced from verified FENEGOSIDA records. Use the table and filters to view available historical rates by date, metal, and unit.
          </p>
        </header>

        {/* Download buttons */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <a href="/data/historical-rates.json" download className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download JSON
          </a>
          <a href="/data/historical-rates.csv" download className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download CSV
          </a>
        </div>

        {/* Interactive table */}
        <HistoryClient records={dataset.data} />

        {/* Quick Links */}
        <div className="mb-8 mt-6 text-sm font-bold text-amber-600 space-y-2 max-w-4xl">
          <div>
            Looking for today's rate? <a href="/market-rates/live-gold-price/" className="underline underline-offset-2 hover:text-amber-700">Today's Gold Price in Nepal</a>
          </div>
          <div>
            Looking for today's silver rate? <a href="/market-rates/silver-price-nepal/" className="underline underline-offset-2 hover:text-amber-700">Today's Silver Price in Nepal</a>
          </div>
        </div>

        {/* Data Summary — below table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 max-w-4xl">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Data Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-[13px] mb-6">
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Gold records:</span>
              <span className="font-bold text-slate-900">72</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Silver records:</span>
              <span className="font-bold text-slate-900">72</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Unique dates:</span>
              <span className="font-bold text-slate-900">72</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Verified records:</span>
              <span className="font-bold text-slate-900">144</span>
            </div>
            <div className="flex flex-col gap-1 border-b border-slate-50 pb-2 md:col-span-2">
              <span className="text-slate-500 font-medium">Available date range (AD):</span>
              <span className="font-bold text-slate-900">2024-06-02 to 2026-09-25</span>
              <span className="text-slate-500 font-medium mt-1">Available date range (BS):</span>
              <span className="font-bold text-slate-900">2081-02-20 to 2083-06-09</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-100">
            <p className="text-sm text-amber-900 font-medium">
              <strong>Coverage note:</strong> This archive contains verified historical records currently available from our primary-source dataset. Historical coverage is not continuous across every date.
            </p>
          </div>

          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Verified Coverage Ranges</h3>
          <ul className="text-sm text-slate-700 font-medium space-y-3">
            <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span><span>2024-06-02 to 2024-06-07 (6 dates) <span className="text-slate-400 font-normal">BS: 2081-02-20 to 2081-02-25</span></span></li>
            <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span><span>2025-03-02 to 2025-03-07 (6 dates) <span className="text-slate-400 font-normal">BS: 2081-11-18 to 2081-11-23</span></span></li>
            <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span><span>2026-06-07 to 2026-06-12 (6 dates) <span className="text-slate-400 font-normal">BS: 2083-02-24 to 2083-02-29</span></span></li>
            <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span><span>2026-07-23 to 2026-09-25 (54 dates) <span className="text-slate-400 font-normal">BS: 2083-04-08 to 2083-06-09</span></span></li>
          </ul>
        </div>

        {/* How to read this data */}
        <section className="mt-12 pt-8 border-t border-slate-200 max-w-4xl">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">How to Read This Data</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
            <div>
              <dt className="font-bold text-slate-800 mb-1">Price / 10g and Price / Tola</dt>
              <dd className="text-slate-600 leading-relaxed">Source values from FENEGOSIDA records, published as-is. These are the authoritative reference prices. The tola is a traditional South Asian unit; 1 tola equals 11.664 grams, as defined by the <a href="https://www.gold.org/goldhub/data/gold-benchmarks" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline underline-offset-2 hover:text-amber-900">World Gold Council</a>.</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-800 mb-1">Price / Gram and Price / Kg</dt>
              <dd className="text-slate-600 leading-relaxed">Calculated equivalents only. Derived using 1 tola = 11.664 g. Not independently verified at the gram or kg level.</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-800 mb-1">Gold vs. Silver</dt>
              <dd className="text-slate-600 leading-relaxed">Each date has separate gold and silver records. Use the Metal filter to view one at a time.</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-800 mb-1">Coverage gaps</dt>
              <dd className="text-slate-600 leading-relaxed">This dataset is partially recovered. Not all historical dates are available. Missing dates are not estimated or interpolated. For broader monetary context, refer to <a href="https://www.nrb.org.np" target="_blank" rel="noopener noreferrer" className="text-slate-700 underline underline-offset-2 hover:text-slate-900">Nepal Rastra Bank</a>.</dd>
            </div>
          </dl>
        </section>

        {/* Related tools */}
        <section className="mt-8 pt-6 border-t border-slate-200 max-w-4xl">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Related Tools</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="/market-rates/live-gold-price/" className="text-amber-700 font-semibold hover:underline">Today&#39;s Gold Price in Nepal</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/market-rates/silver-price-nepal/" className="text-slate-700 font-semibold hover:underline">Today&#39;s Silver Price in Nepal</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/calculator/gold-converter/" className="text-slate-700 font-semibold hover:underline">Gold Converter</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/calculator/silver-converter/" className="text-slate-700 font-semibold hover:underline">Silver Converter</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/market-rates/" className="text-slate-700 font-semibold hover:underline">All Market Rates</a>
          </div>
        </section>

        {/* Data source */}
        <section className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Data Source</h3>
          <p className="text-[13px] text-slate-800 font-medium leading-relaxed max-w-4xl">
            Historical rates are based on verified <a href="https://www.fenegosida.org.np" target="_blank" rel="noopener noreferrer" className="text-slate-900 underline underline-offset-2 hover:text-amber-800">Federation of Nepal Gold &amp; Silver Dealers&#39; Associations (FENEGOSIDA)</a> records available in the current primary-source dataset. Source prices are preserved exactly as published. Per-gram and per-kg values are calculated equivalents (1 tola = 11.664 g). Historical coverage contains gaps. Dataset last updated: 25 September 2026.
          </p>
          <p className="text-[12px] text-slate-400 mt-2 font-medium">
            Historical data sourced from FENEGOSIDA. NepaCalc calculations and presentation &copy; NepaCalc.
          </p>
        </section>
      </main>
    </div>
  );
}
