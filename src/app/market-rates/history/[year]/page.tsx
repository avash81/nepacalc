import React from 'react';
import { Metadata } from 'next';
import HistoryClient from '../HistoryClient';
import fs from 'fs';
import path from 'path';

const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'];

export async function generateStaticParams() {
  return YEARS.map((year) => ({ year }));
}

export async function generateMetadata({
  params,
}: {
  params: { year: string };
}): Promise<Metadata> {
  const year = params.year;
  const title = `${year} Gold and Silver Price History in Nepal`;

  const descriptions: Record<string, string> = {
    '2026': 'View 2026 gold and silver price history in Nepal with date-wise rates, FENEGOSIDA records, per-tola and per-10-gram prices, calculated unit values, and source verification.',
    '2025': 'View 2025 gold and silver price history in Nepal with date-wise rates, FENEGOSIDA records, per-tola and per-10-gram prices, calculated unit values, and source verification.',
    '2024': 'View 2024 gold and silver price history in Nepal with date-wise rates, FENEGOSIDA records, per-tola and per-10-gram prices, calculated unit values, and source verification.',
    '2023': 'View 2023 gold and silver price history in Nepal with date-wise rates, FENEGOSIDA records, per tola and per 10-gram prices, calculated unit values, and source verification.',
    '2022': 'View 2022 gold and silver price history in Nepal with date-wise rates, historical records, per tola and per 10-gram prices, calculated unit values, and source verification.',
    '2021': 'View 2021 gold and silver price history in Nepal with date-wise rates, historical records, per tola and per 10-gram prices, calculated unit values, and source verification.',
    '2020': 'View 2020 gold and silver price history in Nepal with date-wise rates, historical records, per tola and per 10-gram prices, calculated unit values, and source verification.',
    '2019': 'View 2019 gold and silver price history in Nepal with date-wise rates, historical records, per tola and per 10-gram prices, calculated unit values, and source verification.',
  };
  const description = descriptions[year] ?? `View ${year} gold and silver price history in Nepal with date-wise rates, historical records, per tola and per 10-gram prices, calculated unit values, and source verification.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nepacalc.com/market-rates/history/${year}/`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    openGraph: {
      type: 'website',
      siteName: 'NepaCalc',
      title,
      description,
      url: `https://nepacalc.com/market-rates/history/${year}/`,
      images: [
        {
          url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg',
          width: 1200,
          height: 630,
          alt: `Gold and Silver Price History in Nepal ${year} - NepaCalc`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://nepacalc.com/images/og/history-gold-silver-nepal.jpg'],
    },
  };
}

export default async function YearHistoryPage({
  params,
}: {
  params: { year: string };
}) {
  const { year } = params;
  const dataPath = path.join(
    process.cwd(),
    'public',
    'data',
    'historical-rates.json'
  );
  let dataset: { data: any[]; meta: any } = { data: [], meta: {} };

  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    dataset = JSON.parse(fileContents);
  } catch (e) {
    console.error(`Failed to load historical data for year ${year}`, e);
  }

  const allRecords: any[] = dataset.data || [];
  const yearRecords = allRecords.filter(
    (r) => r.date_ad && r.date_ad.startsWith(year)
  );

  // ── Year-at-a-glance stats ──
  const totalGold = yearRecords.filter((r) => r.metal === 'Gold').length;
  const totalSilver = yearRecords.filter((r) => r.metal === 'Silver').length;
  const allDates = new Set(yearRecords.map((r) => r.date_ad));
  const totalDateCount = allDates.size;

  let maxGold: number | null = null;
  let minGold: number | null = null;
  let maxSilver: number | null = null;
  let minSilver: number | null = null;

  yearRecords.forEach((r) => {
    if (r.status === 'Verified' && r.source_per_tola) {
      if (r.metal === 'Gold') {
        if (maxGold === null || r.source_per_tola > maxGold) maxGold = r.source_per_tola;
        if (minGold === null || r.source_per_tola < minGold) minGold = r.source_per_tola;
      } else if (r.metal === 'Silver') {
        if (maxSilver === null || r.source_per_tola > maxSilver) maxSilver = r.source_per_tola;
        if (minSilver === null || r.source_per_tola < minSilver) minSilver = r.source_per_tola;
      }
    }
  });

  const fmtNPR = (num: number | null) =>
    num === null
      ? 'N/A'
      : new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'History',
        item: 'https://nepacalc.com/market-rates/history/',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${year} Price History`,
        item: `https://nepacalc.com/market-rates/history/${year}/`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── HEADER ── */}
        <header className="mb-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            {year} Gold and Silver Price History in Nepal
          </h1>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            Available historical gold and silver rates for {year}, including
            source per-tola and per-10-gram prices, calculated unit equivalents,
            and source verification status.
          </p>
        </header>

        {/* ── YEAR NAVIGATION ── */}
        <div className="mb-8 max-w-4xl">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-2">
            History by Year
          </h2>
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center gap-3">
            <a
              href="/market-rates/history/"
              className="text-sm font-bold text-slate-600 hover:text-slate-900 hover:underline"
            >
              All Years
            </a>
            {YEARS.map((yr) => (
              <React.Fragment key={yr}>
                <span className="text-slate-300" aria-hidden="true">|</span>
                <a
                  href={`/market-rates/history/${yr}/`}
                  className={`text-sm font-bold ${
                    yr === year
                      ? 'text-slate-900 underline'
                      : 'text-amber-700 hover:text-amber-900 hover:underline'
                  }`}
                >
                  {yr}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── YEAR AT A GLANCE ── */}
        <section className="mb-8 p-6 bg-white border border-slate-200 rounded-xl max-w-4xl shadow-sm">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            {year} Historical Data at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                Total Dates
              </span>
              <span className="block text-2xl font-black text-slate-900 tabular-nums">
                {totalDateCount}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                Total Records
              </span>
              <span className="block text-2xl font-black text-slate-900 tabular-nums">
                {totalGold + totalSilver}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                Highest Gold (Verified)
              </span>
              <span className="block text-xl font-black text-amber-700 tabular-nums">
                {maxGold ? `NPR ${fmtNPR(maxGold)}` : 'N/A'}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">
                per tola
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                Lowest Gold (Verified)
              </span>
              <span className="block text-xl font-black text-slate-700 tabular-nums">
                {minGold ? `NPR ${fmtNPR(minGold)}` : 'N/A'}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">
                per tola
              </span>
            </div>
            {maxSilver !== null && (
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  Highest Silver (Verified)
                </span>
                <span className="block text-xl font-black text-slate-600 tabular-nums">
                  NPR {fmtNPR(maxSilver)}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">
                  per tola
                </span>
              </div>
            )}
            {minSilver !== null && (
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  Lowest Silver (Verified)
                </span>
                <span className="block text-xl font-black text-slate-500 tabular-nums">
                  NPR {fmtNPR(minSilver)}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">
                  per tola
                </span>
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-4 pt-4 border-t border-slate-100">
            Highest and lowest rates are based strictly on records with &apos;Verified&apos; status sourced from FENEGOSIDA.
          </p>
        </section>

        {/* ── INTERACTIVE CLIENT ── */}
        <HistoryClient records={yearRecords} />

      </main>
    </div>
  );
}
