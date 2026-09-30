import React from 'react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import HistoryClient from './HistoryClient';

export const metadata: Metadata = {
  title: 'Gold and Silver Price History in Nepal | NepaCalc',
  description: 'View the complete, verified history of gold and silver market rates in Nepal by date. Includes source-published prices per tola, per 10 grams, and calculated per gram and per kg equivalents. Primary source: FENEGOSIDA.',
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/history/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: 'NepaCalc',
    title: 'Gold and Silver Price History in Nepal | NepaCalc',
    description: 'View the complete, verified history of gold and silver market rates in Nepal by date.',
    url: 'https://nepacalc.com/market-rates/history/',
  },
};

export default function HistoryPage() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'historical-rates.json');
  let records: any[] = [];
  let meta: any = null;
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const parsed = JSON.parse(raw);
    records = parsed.data || [];
    meta = parsed.meta;
  } catch (e) {
    console.error('Error reading historical records', e);
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold & Silver Price History', item: 'https://nepacalc.com/market-rates/history/' },
    ],
  };

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Nepal Gold and Silver Price History',
    description: 'Historical market rates for gold and silver in Nepal, including verified FENEGOSIDA source prices and secondary historical data. Source-published per-tola and per-10-gram values. Calculated per-gram and per-kilogram equivalents (1 tola = 11.664 grams).',
    url: 'https://nepacalc.com/market-rates/history/',
    dateModified: meta?.last_updated_ad || new Date().toISOString().split('T')[0],
    spatialCoverage: 'Nepal',
    variableMeasured: [
      'Gold price per tola (NPR)',
      'Gold price per 10 grams (NPR)',
      'Silver price per tola (NPR)',
      'Silver price per 10 grams (NPR)',
    ],
    creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What was the gold price in Nepal today?',
        acceptedAnswer: { '@type': 'Answer', text: 'For today\'s live rate, visit the Live Gold Price page. Historical records are shown in the table above and default to the most recent verified date.' },
      },
      {
        '@type': 'Question',
        name: 'Are these official FENEGOSIDA rates?',
        acceptedAnswer: { '@type': 'Answer', text: 'Records marked as Verified are sourced directly from FENEGOSIDA (Federation of Nepal Gold and Silver Dealers Association). Records marked as Secondary-only are historical prices aggregated from secondary sources.' },
      },
      {
        '@type': 'Question',
        name: 'Why are some dates missing?',
        acceptedAnswer: { '@type': 'Answer', text: 'NepaCalc does not estimate or carry forward prices for dates where a verified or corroborated source record could not be found. Missing dates reflect genuine gaps in available source data.' },
      },
      {
        '@type': 'Question',
        name: 'How is the per gram gold price calculated in Nepal?',
        acceptedAnswer: { '@type': 'Answer', text: 'FENEGOSIDA publishes official rates per tola and per 10 grams. The per-gram and per-kilogram values shown are calculated using 1 tola = 11.664 grams and are clearly marked as calculated equivalents, not official quoted prices.' },
      },
      {
        '@type': 'Question',
        name: 'What does Fine Gold 9999 mean?',
        acceptedAnswer: { '@type': 'Answer', text: 'Fine Gold (9999) is the terminology used in FENEGOSIDA source records. NepaCalc preserves source terminology rather than relabelling records with an unsupported purity or product category.' },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── HEADER & INTRO ── */}
        <header className="mb-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Gold and Silver Price History in Nepal
          </h1>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            Historical gold and silver market rates in Nepal, organized by date. The archive includes verified FENEGOSIDA records and clearly identified secondary historical records where available. Source and verification status are preserved for each record.
          </p>
        </header>

        {/* ── YEAR NAVIGATION ── */}
        <div className="mb-8 max-w-4xl">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-2">History by Year</h2>
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center gap-3">
            <a href="/market-rates/history/" className="text-sm font-bold text-slate-900 underline">All Years</a>
            {['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'].map((yr) => (
              <React.Fragment key={yr}>
                <span className="text-slate-300" aria-hidden="true">|</span>
                <a
                  href={`/market-rates/history/${yr}/`}
                  className="text-sm font-bold text-amber-700 hover:text-amber-900 hover:underline"
                >
                  {yr}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── INTERACTIVE CLIENT: Answer Box + Table ── */}
        <HistoryClient records={records} />

        {/* ── METHODOLOGY ── */}
        <section className="mt-12 pt-8 border-t border-slate-200 max-w-4xl space-y-4 text-sm text-slate-700 font-medium leading-relaxed">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">
            Methodology and Data Verification
          </h2>
          <p>
            NepaCalc provides available historical gold and silver rates in Nepal by date, with source-published prices shown per tola and per 10 grams. Per-gram and per-kilogram values are calculated separately using 1 tola = 11.664 grams and are clearly marked as calculated equivalents, not source-published prices.
          </p>
          <p>
            Verified records use FENEGOSIDA (Federation of Nepal Gold and Silver Dealers Association) as the primary source. Source terminology is preserved as published, including labels such as Fine Gold (9999), Tejabi Gold, and Silver.
          </p>
          <p>
            Historical coverage is not continuous for every calendar date. When a reliable source record is unavailable or has not been independently verified, NepaCalc does not estimate, interpolate, or carry forward a price. Missing dates reflect genuine gaps in available source data.
          </p>
          <p>
            Secondary historical records, where included, are identified by source and verification status. Source-published prices are preserved as published.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-12 pt-8 border-t border-slate-200 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">What was the gold price in Nepal today?</h3>
              <p className="text-sm text-slate-700 font-medium">To view today&apos;s market rates, please visit the <a href="/market-rates/live-gold-price/" className="text-amber-700 hover:underline">Live Gold Price</a> page. The table above defaults to the most recent verified date.</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Are these official FENEGOSIDA rates?</h3>
              <p className="text-sm text-slate-700 font-medium">Records marked as &quot;Verified&quot; are sourced directly from FENEGOSIDA. Records marked as &quot;Secondary-only&quot; are historical prices aggregated from secondary sources and may differ from official publication.</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Why are some dates missing from the history?</h3>
              <p className="text-sm text-slate-700 font-medium">Historical coverage is not continuous. NepaCalc does not estimate or carry forward prices for dates where a verified or corroborated source record could not be found.</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">How is the per-gram gold price calculated?</h3>
              <p className="text-sm text-slate-700 font-medium">FENEGOSIDA publishes official rates per tola and per 10 grams. The per-gram and per-kilogram values are calculated equivalents based on 1 tola = 11.664 grams, not official quoted prices.</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">What does Fine Gold (9999) mean?</h3>
              <p className="text-sm text-slate-700 font-medium">Fine Gold (9999) is the terminology used in FENEGOSIDA source records. NepaCalc preserves the source terminology rather than relabelling records.</p>
            </div>
          </div>
        </section>

        {/* ── RELATED LINKS ── */}
        <section className="mt-10 pt-6 border-t border-slate-200 max-w-4xl">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Related Pages</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="/market-rates/live-gold-price/" className="text-amber-700 font-semibold hover:underline">Today&apos;s Gold Price</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/market-rates/silver-price-nepal/" className="text-slate-700 font-semibold hover:underline">Today&apos;s Silver Price</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/market-rates/" className="text-slate-700 font-semibold hover:underline">All Market Rates</a>
          </div>
        </section>

      </main>
    </div>
  );
}
