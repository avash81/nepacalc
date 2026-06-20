import { calcMeta } from '@/lib/calcMeta';
import GoldDashboardClient from './GoldDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

export const metadata = calcMeta({
  title: 'Gold Price in Nepal Today | Live Gold & Silver Rates (FENEGOSIDA)',
  description: "Check today's official gold and silver prices in Nepal based on FENEGOSIDA benchmarks. View live gold rates, silver rates, price history, investment calculators, historical records, and market updates.",
  slug: 'market-rates/live-gold-price',
  keywords: [
    'gold price in nepal today', 'gold rate today nepal', 'live gold price nepal',
    'gold price nepal', 'today gold price nepal', 'fenegosida gold price',
    'silver price nepal', 'gold price history nepal', 'gold investment calculator',
    'fine gold price nepal', 'tejabi gold price', 'gold tola price', 'gold gram price nepal'
  ],
  canonical: 'market-rates/live-gold-price',
  ogImage: `https://nepacalc.com/images/og/gold-price-nepal.png?date=${new Date().toISOString().split('T')[0]}`
});

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
      "sourceOrganization": { "@id": "https://nepacalc.com/#fenegosida" }
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
        hideHeader={false}
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
