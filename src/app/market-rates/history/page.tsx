import React from 'react';
import { Metadata } from 'next';
import HistoryClient from './HistoryClient';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Gold & Silver Price History in Nepal | NepaCalc',
  description: 'Explore verified historical gold and silver prices in Nepal by date, including rates per 10g and tola with calculated gram and kilogram equivalents.',
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/history/',
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
            Gold & Silver Price History in Nepal
          </h1>
          <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
            Historical gold and silver market rates in Nepal, organized by date and sourced from verified FENEGOSIDA records. Use the table and filters to view available historical rates by date, metal, and unit.
          </p>
          <div className="text-sm font-bold text-amber-600 space-y-2">
            <div>
              Looking for today's rate? <a href="/market-rates/live-gold-price/" className="underline underline-offset-2 hover:text-amber-700">Today's Gold Price in Nepal</a>
            </div>
            <div>
              Looking for today's silver rate? <a href="/market-rates/silver-price-nepal/" className="underline underline-offset-2 hover:text-amber-700">Today's Silver Price in Nepal</a>
            </div>
          </div>
        </header>

        {/* ── Coverage Block ── */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-12 max-w-4xl">
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
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Available date range:</span>
              <span className="font-bold text-slate-900 text-right">2024-06-02 → 2026-09-25</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-100">
            <p className="text-sm text-amber-900 font-medium">
              <strong>Coverage note:</strong> This archive contains verified historical records currently available from our primary-source dataset. Historical coverage is not continuous across every date.
            </p>
          </div>

          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Verified Coverage Ranges</h3>
          <ul className="text-sm text-slate-700 font-medium space-y-2">
            <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> 2024-06-02 → 2024-06-07 (6 dates)</li>
            <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> 2025-03-02 → 2025-03-07 (6 dates)</li>
            <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> 2026-06-07 → 2026-06-12 (6 dates)</li>
            <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> 2026-07-23 → 2026-09-25 (54 dates)</li>
          </ul>
        </div>

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

        {/* ── Interactive Client Component ── */}
        <HistoryClient records={dataset.data} />

        {/* ── Context & Source ── */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Data source</h3>
          <p className="text-[13px] text-slate-800 font-medium leading-relaxed max-w-4xl">
            Historical rates are based on verified Federation of Nepal Gold & Silver Dealers' Associations (FENEGOSIDA) records available in the current primary-source dataset. Source prices are preserved exactly as published; per-gram and per-kg values are calculated equivalents (1 tola = 11.664 g). Historical coverage contains gaps.
          </p>
        </section>
      </main>
    </div>
  );
}
