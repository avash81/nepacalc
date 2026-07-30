import { Metadata } from 'next';
import GoldDashboardClient from './GoldDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

import fs from 'fs';
import path from 'path';

export const revalidate = 3600; // 1 hour

function getLiveDate() {
  try {
    const data = fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'live-rates.json'), 'utf8');
    const json = JSON.parse(data);
    return json.date || new Date().toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const rawDate = getLiveDate();
  const year = rawDate.split('-')[0];

  return {
    title: `Gold Price in Nepal Today (${year}) – Live FENEGOSIDA Gold Rate`,
    description: 'Check today\'s live gold price in Nepal updated from FENEGOSIDA. View 24K Hallmark, 22K Tejabi and silver rates, historical price charts, market analysis and gold price calculator.',
    keywords: [
      'gold price nepal today', 'gold rate nepal', 'live gold price nepal',
      '24k gold price nepal', '22k gold rate nepal', 'tola gold price today',
      'fenegosida gold rate', 'gold price per gram nepal'
    ],
    openGraph: {
      title: `Gold Price in Nepal Today (${year}) – Live FENEGOSIDA Gold Rate`,
      description: 'Check today\'s live gold price in Nepal updated from FENEGOSIDA. View 24K Hallmark, 22K Tejabi and silver rates, historical price charts, market analysis and gold price calculator.',
      url: 'https://nepacalc.com/market-rates/live-gold-price/',
      siteName: 'NepaCalc',
      images: [{ url: 'https://nepacalc.com/images/og/gold-price-nepal.png?date=2024-01-01' }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gold Price in Nepal Today (${year}) – Live FENEGOSIDA Gold Rate`,
      description: 'Check today\'s live gold price in Nepal updated from FENEGOSIDA.',
      images: ['https://nepacalc.com/images/og/gold-price-nepal.png?date=2024-01-01']
    },
    alternates: {
      canonical: 'https://nepacalc.com/market-rates/live-gold-price/'
    }
  };
}

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#webpage",
      "url": "https://nepacalc.com/market-rates/live-gold-price/",
      "name": "Gold Price in Nepal Today (2083/84) | Live 24K & 22K Rate",
      "description": "Check today's official gold and silver prices in Nepal based on FENEGOSIDA benchmarks."
    },
    {
      "@type": "Article",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#article",
      "mainEntityOfPage": "https://nepacalc.com/market-rates/live-gold-price/",
      "headline": "Gold Price in Nepal Today (आजको सुनको भाउ)",
      "publisher": { "@id": "https://nepacalc.com/#organization" },
      "author": {
        "@type": "Organization",
        "name": "NepaCalc Editorial Team"
      },
      "datePublished": "2024-01-01T08:00:00+05:45",
      "dateModified": "" // updated dynamically
    }
  ]
};

export default async function Page() {
  const rawDate = getLiveDate();
  const dynamicSchema = JSON.parse(JSON.stringify(customSchema));
  if (dynamicSchema['@graph'] && dynamicSchema['@graph'][1]) {
    dynamicSchema['@graph'][1].dateModified = new Date(rawDate).toISOString();
  }

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dynamicSchema) }}
      />
      <CalcWrapper
        title="Gold Price in Nepal Today"
        titleClassName="text-2xl md:text-3xl font-black text-slate-900 tracking-tight"
        crumbs={[{ label: 'Market Rates', href: '/market-rates/' }, { label: 'Gold Price' }]}
        isNepal={true}
        compactHeader={true}
        hideHeader={true}
        relatedCalcs={[
          { name: 'Gold Tax Calculator', slug: '/calculator/gold-tax/' },
          { name: 'Gold Converter', slug: '/calculator/gold-converter/' },
          { name: 'Live Silver Price', slug: '/market-rates/live-silver-price/' }
        ]}
      >
        <GoldDashboardClient />
      </CalcWrapper>
    </div>
  );
}
