import { Metadata } from 'next';
import GoldDashboardClient from './GoldDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';

import fs from 'fs';
import path from 'path';

export const revalidate = 3600; // 1 hour

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
  const { date: rawDate, gold24k, gold22k } = getLiveData();
  const year = rawDate.split('-')[0];

  const priceSnippet = gold24k
    ? `Today's 24K gold rate is Rs.${(gold24k as number).toLocaleString('en-IN')} per Tola and 22K Tejabi is Rs.${(gold22k as number)?.toLocaleString('en-IN') ?? ''} per Tola.`
    : '';

  const description = `Check today's live gold price in Nepal updated from FENEGOSIDA. ${priceSnippet} View 24K Hallmark, 22K Tejabi and silver rates, historical price charts, market analysis and gold price calculator.`;

  return {
    title: `Gold Price in Nepal Today (${year}) – Live FENEGOSIDA Gold Rate`,
    description,
    keywords: [
      'gold price nepal today', 'gold rate nepal', 'live gold price nepal',
      '24k gold price nepal', '22k gold rate nepal', 'tola gold price today',
      'fenegosida gold rate', 'gold price per gram nepal'
    ],
    openGraph: {
      title: `Gold Price in Nepal Today (${year}) – Live FENEGOSIDA Gold Rate`,
      description,
      url: 'https://nepacalc.com/market-rates/live-gold-price/',
      siteName: 'NepaCalc',
      images: [{ url: 'https://nepacalc.com/images/og/gold-price-nepal.png?date=2024-01-01' }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gold Price in Nepal Today (${year}) – Live FENEGOSIDA Gold Rate`,
      description,
      images: ['https://nepacalc.com/images/og/gold-price-nepal.png?date=2024-01-01']
    },
    alternates: {
      canonical: 'https://nepacalc.com/market-rates/live-gold-price/'
    }
  };
}

export default async function Page() {
  const { date: rawDate } = getLiveData();

  return (
    <div className="bg-white min-h-screen">
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
      <CalcWrapper
        title="Gold Price in Nepal Today"
        titleClassName="text-2xl md:text-3xl font-black text-slate-900 tracking-tight"
        crumbs={[{ label: 'Market Rates', href: '/market-rates/' }, { label: 'Gold Price' }]}
        isNepal={true}
        compactHeader={true}
        hideHeader={true}
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
        <GoldDashboardClient />
      </CalcWrapper>
    </div>
  );
}
