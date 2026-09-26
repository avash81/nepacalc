import React from 'react';
import { Metadata } from 'next';
import HistoryClient from './HistoryClient';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Gold & Silver Price History in Nepal | Historical Rates',
  description: 'View historical gold and silver prices in Nepal by date, month, and year. Verified historical market-rate records from FENEGOSIDA.',
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/history/',
  },
};

export default async function HistoryPage() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'historical-rates.json');
  let dataset = { records: [], meta: {} as any };
  
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
    name: 'Nepal Historical Gold & Silver Rates',
    description: 'Historical gold and silver benchmark rate records for Nepal, including source rates per 10 grams and per tola and calculated unit equivalents where applicable.',
    creator: { '@type': 'Organization', name: 'NepaCalc' },
    sourceOrganization: { 
      '@type': 'Organization', 
      name: "Federation of Nepal Gold & Silver Dealers' Associations", 
      url: 'https://www.fenegosida.org/' 
    },
    temporalCoverage: dataset.meta ? `${dataset.meta.coverage_from_ad}/${dataset.meta.coverage_to_ad}` : '',
    spatialCoverage: { '@type': 'Place', name: 'Nepal' },
    version: dataset.meta.version || '1.0.0',
    dateModified: dataset.meta.last_updated_ad || ''
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
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

        {/* ── Header & Intro ── */}
        <header className="mb-10 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Gold & Silver Price History in Nepal
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-6">
            Explore historical gold and silver rates in Nepal by date, month, and year. This page provides verified historical market-rate records, with source rates shown per 10 grams and per tola and calculated equivalents available per gram and per kilogram where applicable. Historical records are sourced primarily from the Federation of Nepal Gold & Silver Dealers' Association (FENEGOSIDA) and are presented with their source date and data status.
          </p>
          <div className="text-sm font-bold text-amber-600">
            Looking for today's rate? <a href="/market-rates/live-gold-price/" className="underline underline-offset-2 hover:text-amber-700">View the current gold and silver market rates.</a>
          </div>
        </header>

        {/* ── Coverage Block ── */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-12 max-w-4xl">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Historical Data Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-[13px]">
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Data available from:</span>
              <span className="font-bold text-slate-900">{dataset.meta.earliest_record_ad}</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Latest verified record:</span>
              <span className="font-bold text-slate-900">{dataset.meta.latest_record_ad}</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Verified observations:</span>
              <span className="font-bold text-slate-900">{dataset.meta.total_records}</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Metals:</span>
              <span className="font-bold text-slate-900">Gold and Silver</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Primary source:</span>
              <span className="font-bold text-slate-900">FENEGOSIDA</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Available units:</span>
              <span className="font-bold text-slate-900 text-right">Per 10g, Per Tola, Per Gram, Per Kg</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-[13px]">
             <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Dataset version:</span>
              <span className="font-bold text-slate-900 text-right">v{dataset.meta.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Dataset last updated:</span>
              <span className="font-bold text-slate-900 text-right">{dataset.meta.last_updated_ad}</span>
            </div>
          </div>
        </div>

        {/* ── Main Data Section Header ── */}
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Historical Gold & Silver Rates</h2>

        {/* ── Interactive Client Component ── */}
        <HistoryClient records={dataset.records} meta={dataset.meta} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-8 border-t border-slate-200">
          {/* ── Data Definitions ── */}
          <section>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">What do these historical rates mean?</h3>
            <dl className="space-y-4 text-[13px] leading-relaxed text-slate-600">
              <div>
                <dt className="font-bold text-slate-900 inline">"Source rate" = </dt>
                <dd className="inline">The value published by the underlying historical source.</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900 inline">"Calculated rate" = </dt>
                <dd className="inline">A value mathematically derived from a verified source rate.</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900 inline">"Verified observation" = </dt>
                <dd className="inline">A historical record that has been checked against an identified source.</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900 inline">"Unavailable" = </dt>
                <dd className="inline">No verified published value is currently available for that date.</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900 inline">"Secondary source" = </dt>
                <dd className="inline">A source used for cross-checking or a documented gap where the primary source is unavailable.</dd>
              </div>
            </dl>
          </section>

          {/* ── Unit Explanation ── */}
          <section>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Unit Definitions</h3>
            <dl className="space-y-4 text-[13px] leading-relaxed text-slate-600">
              <div>
                <dt className="font-bold text-slate-900 inline">"Per Tola" = </dt>
                <dd className="inline">Historical rate for one Nepalese tola.</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900 inline">"Per 10 grams" = </dt>
                <dd className="inline">Historical rate for 10 grams.</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900 inline">"Per Gram" = </dt>
                <dd className="inline">Calculated equivalent where applicable.</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900 inline">"Per Kilogram" = </dt>
                <dd className="inline">Calculated equivalent where applicable.</dd>
              </div>
            </dl>
            <p className="mt-4 text-[12px] text-slate-500 font-medium">Note: Calculated units use the standard conversion 1 tola = 11.664 grams.</p>
          </section>
        </div>

        {/* ── Context & Source ── */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Historical Data Source</h3>
          <p className="text-[13px] text-slate-800 font-medium leading-relaxed mb-4 max-w-4xl">
            Historical benchmark records are sourced primarily from the <a href="https://www.fenegosida.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-amber-600 hover:underline">Federation of Nepal Gold & Silver Dealers' Association (FENEGOSIDA)</a>. Original source values are preserved separately from calculated unit conversions. Where a secondary source is used for cross-checking or a documented data gap, it is identified separately. We preserve the published source values and record their source information so historical entries can be traced back to the underlying document or source.
          </p>

          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 mt-8">Historical Data Downloads</h3>
          <p className="text-[13px] text-slate-800 font-medium leading-relaxed max-w-4xl">
            Download the historical gold and silver dataset in CSV or JSON format using the buttons above the table. Source values are preserved separately from calculated unit conversions, with source and verification information included where available.
          </p>
        </section>
      </main>
    </div>
  );
}
