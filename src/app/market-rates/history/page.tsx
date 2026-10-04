import React from 'react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import HistoryClient from './HistoryClient';
import HistoryContent from './HistoryContent';

export const metadata: Metadata = {
  title: 'History of Gold and Silver Rate in Nepal',
  description: 'Explore gold and silver price history in Nepal with date-wise and day-by-day rates, historical data by year, per tola and 10g prices, calculated gram and traditional unit values, and source details.',
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
    title: 'History of Gold and Silver Rate in Nepal',
    description: 'Explore gold and silver price history in Nepal with date-wise and day-by-day rates, historical data by year, per tola and 10g prices, calculated gram and traditional unit values, and source details.',
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

  // ── Find the latest verified gold & silver records ──
  const sorted = [...records].sort((a, b) =>
    new Date(b.date_ad).getTime() - new Date(a.date_ad).getTime()
  );
  const latestGold = sorted.find(r => r.metal?.toLowerCase() === 'gold' && r.status === 'Verified');
  const latestSilver = sorted.find(r => r.metal?.toLowerCase() === 'silver' && r.status === 'Verified');

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
    description: 'Historical market rates for gold and silver in Nepal, including verified FENEGOSIDA source prices and secondary historical data. Source-published per-tola and per-10-gram values. Calculated per-gram and per-kilogram equivalents (1 tola = 11.6638 grams).',
    url: 'https://nepacalc.com/market-rates/history/',
    creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    dateModified: meta?.last_updated_ad || new Date().toISOString().split('T')[0],
    spatialCoverage: 'Nepal',
    variableMeasured: [
      'Gold price per tola (NPR)',
      'Gold price per 10 grams (NPR)',
      'Silver price per tola (NPR)',
      'Silver price per 10 grams (NPR)',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What was the gold price in Nepal on a specific date?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use the historical date selector or table to find the available gold record for that date. The result identifies the AD date, BS date, gold rate type, source-published price per tola and per 10 grams, source, and verification status when a qualifying record is available.' },
      },
      {
        '@type': 'Question',
        name: 'What was the silver price in Nepal on a specific date?',
        acceptedAnswer: { '@type': 'Answer', text: 'Select Silver and the required date in the historical archive. When a verified record is available, the historical table shows the silver rate per tola and per 10 grams together with the source and verification status.' },
      },
      {
        '@type': 'Question',
        name: 'Where can I find gold price history in Nepal?',
        acceptedAnswer: { '@type': 'Answer', text: 'Gold historical rates are available through the date- and year-based historical archive, where available source records can be examined by date, rate type, unit, source, and verification status.' },
      },
      {
        '@type': 'Question',
        name: 'Where can I find silver price history in Nepal?',
        acceptedAnswer: { '@type': 'Answer', text: 'Silver historical rates are available in the same archive, with silver records separated from gold records and shown by date, source-published unit, calculated equivalents, source, and verification status.' },
      },
      {
        '@type': 'Question',
        name: 'Is gold price history shown per tola or per 10 grams?',
        acceptedAnswer: { '@type': 'Answer', text: 'Both source-published units can be shown where the historical source provides them: per tola and per 10 grams. The archive also calculates equivalent per-gram and per-kilogram values.' },
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

        <HistoryContent latestGold={latestGold} latestSilver={latestSilver} />

      </main>
    </div>
  );
}
