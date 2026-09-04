import { Metadata } from 'next';
import GoldDashboardClient from './GoldDashboardClient';
import LiveGoldPriceBoxClient from './LiveGoldPriceBoxClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';

import fs from 'fs';
import path from 'path';

// NOTE: revalidate has no effect under `output: 'export'` (static export mode).
// Data freshness is achieved by the CI re-running `npm run build` daily with fresh rates.

function getLiveData() {
  try {
    const data = fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'live-rates.json'), 'utf8');
    const json = JSON.parse(data);
    return {
      date: json.date || new Date().toISOString().split('T')[0],
      gold24k: json.gold?.tolaNPR?.current || null,
      gold22k: json.gold?.tejabiTolaNPR?.current || null,
      silver: json.silver?.tolaNPR?.current || null,
    };
  } catch (e) {
    return { date: new Date().toISOString().split('T')[0], gold24k: null, gold22k: null, silver: null };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { gold24k } = getLiveData();

  const priceStr = gold24k ? ` Rs. ${(gold24k as number).toLocaleString('en-IN')}` : '';
  const description = `Today's live gold price in Nepal from FENEGOSIDA: 24K Hallmark${priceStr} per tola. Check 22K Tejabi, silver, history and gold calculator.`;

  return {
    title: "Gold Price in Nepal Today | Live FENEGOSIDA Rate",
    description,
    keywords: [
      'gold price nepal today', 'gold rate nepal', 'live gold price nepal',
      '24k gold price nepal', '22k gold rate nepal', 'tola gold price today',
      'fenegosida gold rate', 'gold price per gram nepal'
    ],
    openGraph: {
      title: "Gold Price in Nepal Today | Live FENEGOSIDA Rate",
      description,
      url: 'https://nepacalc.com/market-rates/live-gold-price/',
      siteName: 'NepaCalc',
      images: [{ url: 'https://nepacalc.com/images/og/gold-price-nepal.png?date=2024-01-01' }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: "Gold Price in Nepal Today | Live FENEGOSIDA Rate",
      description,
      images: ['https://nepacalc.com/images/og/gold-price-nepal.png?date=2024-01-01']
    },
    alternates: {
      canonical: 'https://nepacalc.com/market-rates/live-gold-price/'
    }
  };
}

export default async function Page() {
  const { date: rawDate, gold24k, gold22k, silver } = getLiveData();
  const fmt = (n: number) => n.toLocaleString('en-IN');

  return (
    <div className="bg-white min-h-screen">
      {/* ── Single authoritative JSON-LD block (no duplicates) ── */}
      <JsonLd 
        type="unified" 
        data={{
          url: "https://nepacalc.com/market-rates/live-gold-price/",
          breadcrumbUrl: "https://nepacalc.com/market-rates/live-gold-price/",
          breadcrumb: [
            { name: 'Home', item: 'https://nepacalc.com/' },
            { name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
            { name: 'Gold Price in Nepal Today', item: 'https://nepacalc.com/market-rates/live-gold-price/' }
          ],
          webpage: {
            url: "https://nepacalc.com/market-rates/live-gold-price/",
            name: "Gold Price in Nepal Today (2083/84) | Live 24K & 22K Rate",
            description: "Check today's official gold and silver prices in Nepal based on FENEGOSIDA benchmarks.",
            isPartOf: "https://nepacalc.com/#website",
          },
          article: {
            url: "https://nepacalc.com/market-rates/live-gold-price/",
            headline: "Gold Price in Nepal Today (आजको सुनको भाउ)",
            description: "Check today's official gold and silver prices in Nepal based on FENEGOSIDA benchmarks.",
            datePublished: "2024-01-01T08:00:00+05:45",
            dateModified: new Date(rawDate).toISOString(),
          }
        }} 
      />

      {/* ── Server-rendered SEO header: visible to Googlebot in raw HTML ── */}
      {/* This ensures H1, current price and breadcrumb appear WITHOUT JavaScript */}
            <div className="max-w-[94%] mx-auto px-4 sm:px-6 pt-6 pb-4 border-b border-slate-200">
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[13px] font-medium text-[#5f6368] mb-4">
          <a href="/" className="hover:text-blue-600 hover:underline">Home</a>
          <span className="text-slate-300">/</span>
          <a href="/market-rates/" className="hover:text-blue-600 hover:underline">Market Rates</a>
          <span className="text-slate-300">/</span>
          <span className="text-[#202124] font-bold">Gold Price</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 sr-seo-header">
            <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight mb-2">
              Today's Gold Price in Nepal | Live FENEGOSIDA Rate
            </h1>
            <p className="text-[#5f6368] text-base font-medium leading-relaxed max-w-xl mb-4">
              Check today's official gold and silver prices in Nepal based on FENEGOSIDA benchmarks.
            </p>

            {gold24k && (
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-700 mb-2">
                <span>
                  <span className="text-slate-500 font-medium">24K Hallmark (per Tola):</span>{' '}
                  <strong className="text-slate-900">Rs. {fmt(gold24k as number)}</strong>
                </span>
                {gold22k && gold22k > 0 && (
                  <span>
                    <span className="text-slate-500 font-medium">22K Tejabi (per Tola):</span>{' '}
                    <strong className="text-slate-900">Rs. {fmt(gold22k as number)}</strong>
                  </span>
                )}
                {silver && (
                  <span>
                    <span className="text-slate-500 font-medium">Silver (per Tola):</span>{' '}
                    <strong className="text-slate-900">Rs. {fmt(silver as number)}</strong>
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-auto shrink-0 mt-4 lg:mt-0">
             <LiveGoldPriceBoxClient initialGold={gold24k as number | undefined} />
          </div>
        </div>
      </div>

      {/* ── Static SEO Headings (Visible in raw HTML before React hydration) ── */}
      <div className="sr-only">
        <h2>Today's Gold Rate in Nepal (FENEGOSIDA Official Rates)</h2>
        <h2>Gold Price History &amp; Performance</h2>
        <h2>Frequently Asked Questions About Gold Price in Nepal</h2>
      </div>

      {/* ── Interactive dashboard (client component) ── */}
      {/* disableSchema prevents CalcWrapper from emitting a duplicate JSON-LD block */}
      <CalcWrapper
        title="Gold Price in Nepal Today"
        titleClassName="text-2xl md:text-3xl font-black text-slate-900 tracking-tight"
        crumbs={[{ label: 'Market Rates', href: '/market-rates/' }, { label: 'Gold Price' }]}
        isNepal={true}
        compactHeader={true}
        hideHeader={true}
        disableSchema={true}
        relatedCalcs={[
          { name: 'Nepal Income Tax Calculator', slug: '/calculator/nepal-income-tax/' },
          { name: 'Nepal Salary Calculator', slug: '/calculator/nepal-salary/' },
          { name: 'NEA Electricity Bill', slug: '/calculator/nea-bill/' },
          { name: 'KUKL Water Bill', slug: '/calculator/kukl-bill/' },
          { name: 'Nepal Land Area Converter', slug: '/calculator/nepal-land/' },
          { name: 'Nepal Home Loan', slug: '/calculator/nepal-home-loan/' },
          { name: 'Nepal VAT Calculator', slug: '/calculator/nepal-vat/' }
        ]}
      >
        <GoldDashboardClient 
          initialGold={gold24k as number | undefined}
          initialSilver={silver as number | undefined}
          initialDate={rawDate}
        />
      </CalcWrapper>
    </div>
  );
}

