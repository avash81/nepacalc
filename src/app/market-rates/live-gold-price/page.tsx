import { Metadata } from 'next';
import GoldDashboardClient from './GoldDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

export const metadata: Metadata = {
  title: 'Gold Price in Nepal Today (2083/84) | Live 24K & 22K Rate',
  description: 'Live gold price in Nepal today — official 24K and 22K rates per tola and gram, synced with FENEGOSIDA. Includes calculator and price history.',
  keywords: [
    'gold price nepal today', 'gold rate nepal', 'live gold price nepal',
    '24k gold price nepal', '22k gold rate nepal', 'tola gold price today',
    'fenegosida gold rate', 'gold price per gram nepal'
  ],
  openGraph: {
    title: 'Gold Price in Nepal Today | Live 24K & 22K Rate',
    description: 'Official FENEGOSIDA gold rates in Nepal, updated daily per tola and gram, with a built-in gold calculator and price history.',
    url: 'https://nepacalc.com/market-rates/live-gold-price/',
    siteName: 'NepaCalc',
    images: [{ url: `https://nepacalc.com/images/og/gold-price-nepal.png?date=${new Date().toISOString().split('T')[0]}` }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price in Nepal Today',
    description: 'Live 24K & 22K gold rates per tola and gram, FENEGOSIDA-synced.',
    images: [`https://nepacalc.com/images/og/gold-price-nepal.png?date=${new Date().toISOString().split('T')[0]}`]
  },
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/live-gold-price/'
  }
};

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#webpage",
      "url": "https://nepacalc.com/market-rates/live-gold-price/",
      "name": "Gold Price in Nepal Today | Live Gold & Silver Rates (FENEGOSIDA)",
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
      "dateModified": new Date().toISOString()
    },
    {
      "@type": "Organization",
      "@id": "https://nepacalc.com/#organization",
      "name": "NepaCalc",
      "url": "https://nepacalc.com"
    },
    {
      "@type": "Organization",
      "@id": "https://nepacalc.com/#fenegosida",
      "name": "Federation of Nepal Gold and Silver Dealers' Association",
      "url": "https://www.fenegosida.org"
    },
    {
      "@type": "ImageObject",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#primaryimage",
      "url": "https://nepacalc.com/images/og/gold-price-nepal.png",
      "width": 1200,
      "height": 630,
      "caption": "Today's Gold Price in Nepal - FENEGOSIDA"
    },
    {
      "@type": "FinancialService",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#financial-service",
      "name": "NepaCalc Gold Price Service",
      "areaServed": "NP",
      "description": "Live FENEGOSIDA gold and silver rates with dynamic investment calculators."
    },
    {
      "@type": "Dataset",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#dataset-gold-history",
      "url": "https://nepacalc.com/market-rates/live-gold-price/",
      "name": "Gold Price History Dataset (Nepal)",
      "description": "Historical gold price data for Nepal, officially sourced from FENEGOSIDA. Includes daily, monthly, and yearly maximum and minimum rates.",
      "creator": { "@id": "https://nepacalc.com/#fenegosida" },
      "publisher": { "@id": "https://nepacalc.com/#organization" },
      "sourceOrganization": { "@id": "https://nepacalc.com/#fenegosida" },
      "license": "https://creativecommons.org/licenses/by/4.0/"
    },
    {
      "@type": "ItemList",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#itemlist",
      "name": "FENEGOSIDA Official Reports and Notices",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Weekly Market Reports", "url": "https://nepacalc.com/market-rates/live-gold-price/#weekly-reports" },
        { "@type": "ListItem", "position": 2, "name": "Official Notices", "url": "https://nepacalc.com/market-rates/live-gold-price/#notices" },
        { "@type": "ListItem", "position": 3, "name": "Election Documents", "url": "https://nepacalc.com/market-rates/live-gold-price/#election-documents" }
      ]
    },
    {
      "@type": "SearchAction",
      "target": "https://nepacalc.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    {
      "@type": "SpeakableSpecification",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#speakable",
      "cssSelector": [".quick-answer-block", ".ai-summary-box"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the gold price in Nepal today?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The official Fine Gold (9999) rate published by FENEGOSIDA changes daily. Please check the live board above for today's exact rates per Tola and per 10 Grams."
          }
        },
        {
          "@type": "Question",
          "name": "Who sets gold prices in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) publishes the official daily benchmark rates used by all dealers across Nepal."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
        { "@type": "ListItem", "position": 2, "name": "Market Rates", "item": "https://nepacalc.com/market-rates/" },
        { "@type": "ListItem", "position": 3, "name": "Live Gold Price", "item": "https://nepacalc.com/market-rates/live-gold-price/" }
      ]
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
      />
      <CalcWrapper
        title="Gold Price in Nepal Today (आजको सुनको भाउ)"
        description="Daily precious metal indices strictly synchronized with official FENEGOSIDA benchmarks."
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Gold Price' }]}
        isNepal={true}
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
