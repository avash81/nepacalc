import React from 'react';
import { Metadata } from 'next';
import HistoryClient from './HistoryClient';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Gold & Silver Price History in Nepal | Historical Rates',
  description: 'View historical gold and silver prices in Nepal by day, month, week and year, with prices per gram, 10 grams, tola and kilogram.',
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/history/',
  },
};

export default async function HistoryPage() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'historical-rates.json');
  let dataset = { records: [], meta: {} };
  
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
      { '@type': 'ListItem', position: 3, name: 'Gold & Silver Price History', item: 'https://nepacalc.com/market-rates/history/' }
    ]
  };

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Gold and Silver Price History in Nepal',
    description: 'Historical daily market-rate records for gold and silver published by the Federation of Nepal Gold & Silver Dealers\' Associations (FENEGOSIDA), with derived unit conversions and period summaries.',
    creator: { '@type': 'Organization', name: 'NepaCalc' },
    sourceOrganization: { 
      '@type': 'Organization', 
      name: "Federation of Nepal Gold & Silver Dealers' Associations", 
      url: 'https://www.fenegosida.org/' 
    },
    temporalCoverage: dataset.meta ? `${(dataset.meta as any).coverage_from_ad}/${(dataset.meta as any).coverage_to_ad}` : '',
    spatialCoverage: { '@type': 'Place', name: 'Nepal' }
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* ── Schema Injection ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        {/* ── Breadcrumb ── */}
        <nav className="flex text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-amber-500 transition-colors">Home</a></li>
            <li><span className="mx-1">›</span></li>
            <li><a href="/market-rates/" className="hover:text-amber-500 transition-colors">Market Rates</a></li>
            <li><span className="mx-1">›</span></li>
            <li className="text-slate-600">Gold & Silver Price History</li>
          </ol>
        </nav>

        {/* ── Header ── */}
        <header className="mb-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Gold & Silver Price History in Nepal
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Historical gold and silver prices in Nepal, with daily, monthly, weekly and yearly views.
          </p>
        </header>

        {/* ── Interactive Client Component ── */}
        <HistoryClient records={dataset.records} meta={dataset.meta as any} />

        {/* ── Context & Source ── */}
        <section className="mt-16 pt-8 border-t border-slate-200">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Source</h2>
          <p className="text-sm text-slate-800 font-bold mb-1">
            Source: Federation of Nepal Gold & Silver Dealers&apos; Associations (FENEGOSIDA)
          </p>
          <p className="text-[13px] text-slate-500 font-medium max-w-3xl leading-relaxed">
            Historical values are based on published FENEGOSIDA rate records. Converted units are calculated from the source rate using 1 tola = 11.664 grams.
          </p>
        </section>

        {/* ── Related Links ── */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Related</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="/market-rates/live-gold-price/" className="text-[13px] font-bold text-amber-600 hover:text-amber-700 underline underline-offset-4 decoration-amber-200">Gold Price Today in Nepal</a>
            <a href="/market-rates/silver-price-nepal/" className="text-[13px] font-bold text-slate-600 hover:text-slate-700 underline underline-offset-4 decoration-slate-200">Silver Price Today in Nepal</a>
            <a href="/calculator/gold-converter/" className="text-[13px] font-bold text-amber-600 hover:text-amber-700 underline underline-offset-4 decoration-amber-200">Gold Weight Converter</a>
            <a href="/calculator/silver-converter/" className="text-[13px] font-bold text-slate-600 hover:text-slate-700 underline underline-offset-4 decoration-slate-200">Silver Converter</a>
          </div>
        </section>
      </main>
    </div>
  );
}
