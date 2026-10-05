import React from 'react';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gold Rate History in Nepal – Historical Gold Prices',
  description: 'Historical gold rates in Nepal by date, including gold prices per tola and other available units. Browse the historical archive by year or search the available records.',
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
    description: 'Historical gold rates in Nepal by date, including gold prices per tola and other available units. Browse the historical archive by year or search the available records.',
    url: 'https://nepacalc.com/market-rates/history/',
    images: [{ url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg', width: 1200, height: 630, alt: 'Gold Rate History in Nepal' }]
  },
};

export default function HistoryHubPage() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'historical-rates.json');
  let records: any[] = [];
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const parsed = JSON.parse(raw);
    records = parsed.data || [];
  } catch (e) {
    console.error('Error reading historical records', e);
  }

  // Find latest records
  const sorted = [...records].sort((a, b) => new Date(b.date_ad).getTime() - new Date(a.date_ad).getTime());
  const latestGold = sorted.find(r => r.metal?.toLowerCase() === 'gold' && r.status === 'Verified');
  const latestSilver = sorted.find(r => r.metal?.toLowerCase() === 'silver' && r.status === 'Verified');

  const years = Array.from(new Set(records.map(r => r.date_ad.substring(0, 4)))).sort((a, b) => Number(b) - Number(a));
  
  if (years.length === 0) {
    // fallback
    years.push('2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019');
  }

  const fmtNPR = (num: number | null) => num === null ? 'N/A' : new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold Rate History', item: 'https://nepacalc.com/market-rates/history/' },
    ],
  };
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* 1. Breadcrumb */}
        <nav className="text-sm font-medium text-slate-500 mb-4">
          <Link href="/" className="hover:text-amber-700">Home</Link> &gt;{' '}
          <Link href="/market-rates/" className="hover:text-amber-700">Market Rates</Link> &gt;{' '}
          <span className="text-slate-900">History</span>
        </nav>

        {/* 2. H1 & 3. Intro */}
        <header className="max-w-4xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Gold Rate History in Nepal
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            Historical gold rates in Nepal by date, including gold prices per tola and other available units. Browse the historical archive by year or search the available records.
          </p>
        </header>

        {/* 4. Explain the archive & expose latest data */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Latest Verified Rates in the Archive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestGold && (
              <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                <h3 className="font-bold text-amber-900 mb-2">Latest Gold ({latestGold.date_ad})</h3>
                <p className="text-2xl font-black text-amber-700">NPR {fmtNPR(latestGold.source_per_tola)} <span className="text-sm font-medium text-amber-900/70">per tola</span></p>
                <p className="text-sm text-amber-800 mt-1">{latestGold.rate_type}</p>
              </div>
            )}
            {latestSilver && (
              <div className="p-4 border border-slate-200 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">Latest Silver ({latestSilver.date_ad})</h3>
                <p className="text-2xl font-black text-slate-700">NPR {fmtNPR(latestSilver.source_per_tola)} <span className="text-sm font-medium text-slate-500">per tola</span></p>
                <p className="text-sm text-slate-600 mt-1">{latestSilver.rate_type}</p>
              </div>
            )}
          </div>
          <div className="mt-6 prose prose-slate max-w-none text-sm">
            <p>
              This historical archive maintains an immutable dataset of Nepalese gold and silver rates. 
              These historical data are compiled from official sources. 
              We do not invent values, estimate missing days, or alter the historical record. 
              Calculated units (like per gram) are deterministically derived from the source-published per-tola values.
            </p>
          </div>
        </section>

        {/* 5. Strong links to every yearly dataset */}
        <section className="max-w-4xl">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Historical Archive by Year</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {years.map(year => (
              <Link 
                key={year} 
                href={`/market-rates/history/${year}/`}
                className="group flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
              >
                <span className="text-2xl font-black text-slate-700 group-hover:text-amber-700">{year}</span>
                <span className="text-xs font-medium text-slate-500 mt-2 uppercase tracking-wider">View Data</span>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
