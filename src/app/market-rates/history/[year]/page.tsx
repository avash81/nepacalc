import React from 'react';
import { Metadata } from 'next';
import HistoryClient from '../HistoryClient';
import fs from 'fs';
import path from 'path';

const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021'];

export async function generateStaticParams() {
  return YEARS.map((year) => ({ year }));
}

export async function generateMetadata({ params }: { params: { year: string } }): Promise<Metadata> {
  const year = params.year;
  const title = `Gold & Silver Price History in Nepal ${year} | NepaCalc`;
  const description = `View ${year} gold and silver price history in Nepal by date, including per-tola and per-10-gram rates, sources and verification status.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nepacalc.com/market-rates/history/${year}/`,
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
    other: {
      thumbnail: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg',
      'image_src': 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg',
    },
  };
}

export default async function YearHistoryPage({ params }: { params: { year: string } }) {
  const { year } = params;
  const dataPath = path.join(process.cwd(), 'public', 'data', 'historical-rates.json');
  let dataset: any = { data: [], meta: {} };

  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    dataset = JSON.parse(fileContents);
  } catch (e) {
    console.error(`Failed to load historical data for year ${year}`, e);
  }

  const allRecords: any[] = dataset.data || [];
  const yearRecords = allRecords.filter((r) => r.date_ad && r.date_ad.startsWith(year));

  // ── Dynamic per-year facts ──
  const totalGold    = yearRecords.filter((r) => r.metal === 'gold').length;
  const totalSilver  = yearRecords.filter((r) => r.metal === 'silver').length;
  const allDates   = new Set(yearRecords.map((r) => r.date_ad));
  const totalDateCount = allDates.size;
  const sortedDates     = Array.from(allDates).sort();
  const earliestDate    = sortedDates[0] ?? null;
  const latestDate      = sortedDates[sortedDates.length - 1] ?? null;

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
      { '@type': 'ListItem', position: 3, name: 'Gold & Silver Price History', item: 'https://nepacalc.com/market-rates/history/' },
      { '@type': 'ListItem', position: 4, name: `${year} Price History`, item: `https://nepacalc.com/market-rates/history/${year}/` },
    ],
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
      { '@type': 'Question', name: 'What does Fine Gold (9999) mean in the historical records?', acceptedAnswer: { '@type': 'Answer', text: 'Fine Gold (9999) is the terminology used in applicable source records. NepaCalc preserves the source terminology rather than automatically relabelling the record as another purity or product category.' } },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── HEADER ── */}
        <header className="mb-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Gold and Silver Price History in Nepal
          </h1>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            Available historical gold and silver rates for {year}, including source per-tola and per-10-gram prices, calculated unit equivalents, and source verification status.
          </p>
        </header>

        {/* ── YEAR NAVIGATION ── */}
        <div className="mb-8 p-4 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center gap-3 max-w-4xl">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">History by Year</span>
          <span className="text-slate-300">|</span>
          <a href="/market-rates/history/" className="text-sm font-bold text-slate-600 hover:text-slate-900 hover:underline">All Years</a>
          <span className="text-slate-300">|</span>
          {YEARS.map((yr, idx) => (
            <React.Fragment key={yr}>
              {idx > 0 && <span className="text-slate-300">|</span>}
              <a
                href={`/market-rates/history/${yr}/`}
                className={`text-sm font-bold ${yr === year ? 'text-slate-900 underline font-black' : 'text-amber-700 hover:text-amber-900 hover:underline'}`}
              >
                {yr}
              </a>
            </React.Fragment>
          ))}
        </div>

        {/* ── TABLE SECTION HEADING ── */}
        <div className="mb-4 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-2">
            {year} Historical Gold and Silver Rates
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            The table below shows the historical gold and silver records currently available for {year}. Each record retains its source terminology and identifies whether the value is verified, corroborated, secondary-only, or subject to a source conflict.
          </p>
          <p className="text-sm text-slate-600 font-medium leading-relaxed mt-1">
            Dates without a verified historical record are not filled using estimates or interpolated prices.
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Per gram and per kilogram values are calculated equivalents using 1 tola = 11.664 grams.
          </p>
        </div>

        {/* ── INTERACTIVE CLIENT ── */}
        <HistoryClient records={yearRecords} />

        {/* ── HISTORICAL DATA AT A GLANCE (dynamic per-year facts) ── */}
        {totalDateCount > 0 && (
          <section className="mt-6 mb-8 p-5 bg-white border border-slate-200 rounded-xl max-w-4xl" aria-label="Historical Data at a Glance">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">{year} Historical Data at a Glance</h2>
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
                Historical coverage for {year} spans from {fmtDate(earliestDate)} to {fmtDate(latestDate)}, representing {totalDateCount} unique days of market rates. This data dynamically updates automatically whenever new historical rates are fetched and verified.
              </p>
            )}
          </section>
        )}

        {/* ── CHART HEADING ── */}
        <section className="mt-8 pt-8 border-t border-slate-200 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-2">
            {year} Historical Price Chart
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Compare available {year} gold and silver rates by date and unit. Missing source dates are not interpolated.
          </p>
        </section>

        {/* ── EXPLANATORY CONTENT ── */}
        <section className="mt-8 pt-8 border-t border-slate-200 max-w-4xl space-y-4 text-sm text-slate-700 font-medium leading-relaxed">
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

        {/* ── FAQ ── */}
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

        {/* ── RELATED LINKS ── */}
        <section className="mt-10 pt-6 border-t border-slate-200 max-w-4xl">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Related Archives</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="/market-rates/history/" className="text-amber-700 font-semibold hover:underline">Full Price History Archive</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/market-rates/live-gold-price/" className="text-slate-700 font-semibold hover:underline">Today&apos;s Gold Price in Nepal</a>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <a href="/market-rates/silver-price-nepal/" className="text-slate-700 font-semibold hover:underline">Today&apos;s Silver Price in Nepal</a>
          </div>
        </section>

      </main>
    </div>
  );
}
