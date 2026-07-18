import { Metadata } from 'next';
import SilverDashboardClient from './SilverDashboardClient';
import { SilverSeoSection } from './SilverSeoSection';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Live Silver Price in Nepal Today (2083/84) | Chandi Rate Per Tola & Gram',
  description:
    "Track today's live silver price in Nepal with official FENEGOSIDA rates. View Chandi price per tola, gram and kilogram, historical trends, live silver calculator and unit converter.",
  keywords: [
    'live silver price nepal',
    'silver price nepal',
    'silver rate today',
    'chandi rate today',
    'silver price per tola',
    'silver price per gram',
    'silver calculator',
    'silver converter',
    'FENEGOSIDA silver price',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/live-silver-price/',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Live Silver Price in Nepal Today | Chandi Rate',
    description:
      "Track today's official silver price in Nepal using FENEGOSIDA rates. Live Chandi prices, unit converter and historical silver trends.",
    type: 'website',
    url: 'https://nepacalc.com/market-rates/live-silver-price/',
    images: [
      {
        url: 'https://nepacalc.com/images/live-silver-price-nepal.webp',
        width: 1200,
        height: 630,
        alt: 'Live Silver Price Today Nepal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Silver Price in Nepal Today',
    description:
      "Official FENEGOSIDA silver prices updated daily with calculator and converter.",
  },
};

// ─── PACKAGE 1: COMPLETE SCHEMA GRAPH ────────────────────────────────────────
const schemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1 Organization
    {
      '@type': 'Organization',
      '@id': 'https://nepacalc.com/#organization',
      name: 'NepaCalc',
      url: 'https://nepacalc.com/',
      logo: 'https://nepacalc.com/logo.png',
      sameAs: [
        'https://www.facebook.com/nepacalc',
        'https://twitter.com/nepacalc',
        'https://www.fenegosida.org/',
      ],
    },
    // 2 Website
    {
      '@type': 'WebSite',
      '@id': 'https://nepacalc.com/#website',
      url: 'https://nepacalc.com/',
      name: 'NepaCalc',
      publisher: {
        '@id': 'https://nepacalc.com/#organization',
      },
      inLanguage: 'en',
    },
    // 3 SearchAction
    {
      '@type': 'SearchAction',
      target: 'https://nepacalc.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    // 4 WebPage
    {
      '@type': 'WebPage',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#webpage',
      url: 'https://nepacalc.com/market-rates/live-silver-price/',
      name: 'Live Silver Price Today Nepal',
      description:
        'Live silver price in Nepal updated daily using official FENEGOSIDA benchmark rates. View silver prices per tola, gram, kilogram and use the silver calculator and unit converter.',
      isPartOf: {
        '@id': 'https://nepacalc.com/#website',
      },
      breadcrumb: {
        '@id': 'https://nepacalc.com/market-rates/live-silver-price/#breadcrumb',
      },
      primaryImageOfPage: {
        '@id': 'https://nepacalc.com/market-rates/live-silver-price/#primaryimage',
      },
      publisher: {
        '@id': 'https://nepacalc.com/#organization',
      },
      inLanguage: 'en',
      datePublished: '2026-07-17T11:00:00+05:45',
      dateModified: '2026-07-17T11:00:00+05:45',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.market-summary', '.quick-facts'],
      },
      mainEntity: {
        '@id': 'https://nepacalc.com/market-rates/live-silver-price/#dataset',
      },
      about: [
        { '@type': 'Thing', name: 'Silver' },
        { '@type': 'Thing', name: 'FENEGOSIDA' },
        { '@type': 'Thing', name: 'Nepal' },
      ],
      mentions: [
        { '@type': 'Thing', name: 'Silver' },
        { '@type': 'Thing', name: 'Chandi' },
        { '@type': 'Thing', name: 'Tola' },
        { '@type': 'Thing', name: 'Gram' },
        { '@type': 'Thing', name: 'Kilogram' },
        { '@type': 'Thing', name: 'Nepal Rastra Bank' },
        { '@type': 'Thing', name: 'XAG/USD' },
        { '@type': 'Thing', name: 'Precious Metal' },
        { '@type': 'Thing', name: 'Bullion' },
        { '@type': 'Thing', name: 'FENEGOSIDA' },
      ],
    },
    // 5 ImageObject
    {
      '@type': 'ImageObject',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#primaryimage',
      url: 'https://nepacalc.com/images/live-silver-price-nepal.webp',
      width: 1200,
      height: 630,
    },
    // 6 Breadcrumb
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://nepacalc.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Market Rates',
          item: 'https://nepacalc.com/market-rates/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Live Silver Price',
          item: 'https://nepacalc.com/market-rates/live-silver-price/',
        },
      ],
    },
    // 7 Dataset
    {
      '@type': 'Dataset',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#dataset',
      name: 'Live Silver Price Nepal',
      description:
        'Daily official silver price benchmark for Nepal published using FENEGOSIDA market data.',
      creator: {
        '@id': 'https://nepacalc.com/#organization',
      },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      keywords: [
        'Silver Price Nepal',
        'Chandi Rate',
        'Silver Price Today',
        'Silver Price Per Tola',
        'Silver Price Per Gram',
        'FENEGOSIDA',
      ],
    },
    // 8 ItemList (FinancialProduct Removed)
    {
      '@type': 'ItemList',
      name: 'Silver Price Units',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Silver Price Per Tola' },
        { '@type': 'ListItem', position: 2, name: 'Silver Price Per Gram' },
        { '@type': 'ListItem', position: 3, name: 'Silver Price Per Kilogram' },
        { '@type': 'ListItem', position: 4, name: 'Silver Calculator' },
        { '@type': 'ListItem', position: 5, name: 'Silver Unit Converter' },
      ],
    },
    // 10 FAQPage
    {
      '@type': 'FAQPage',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#faqpage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "What is today's silver price in Nepal?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Today's silver price in Nepal is based on the latest benchmark published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). This page displays the most recent available silver rate per Tola and automatically calculates equivalent values per Gram, 10 Grams, Kilogram, Aana, and Lal.",
          },
        },
        {
          '@type': 'Question',
          name: 'Who determines the silver price in Nepal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The benchmark silver rate used in Nepal is based on prices published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). International silver prices, exchange rates, and domestic market conditions influence these daily benchmarks.",
          },
        },
        {
          '@type': 'Question',
          name: 'How much does one tola of silver weigh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'One Nepal Tola equals 11.6638 grams. This traditional measurement is the standard unit used for pricing silver and gold throughout Nepal.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does the silver price change every day?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Silver prices change because of several market factors including: international silver spot prices, exchange rate fluctuations, industrial demand, investment demand, global economic conditions, and import costs. These factors affect the benchmark price published for the Nepal market.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is silver priced in Nepal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Silver in Nepal is priced by calculating the international spot price (XAG/USD) and converting it to Nepalese Rupees (NPR), then adding import duties, customs charges, and local market adjustments to form the daily benchmark rate.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the silver price on NepaCalc updated daily?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The silver benchmark prices on NepaCalc are updated every trading day after the official market rate becomes available, ensuring you have the latest reference price.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between silver spot price and Nepal silver price?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The international spot price represents the global trading value of pure silver in US Dollars. The Nepal silver price additionally reflects USD/NPR exchange rates, government import taxes, and domestic supply conditions before retail making charges are added.',
          },
        },
      ],
    },
  ],
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://s3.tradingview.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://s3.tradingview.com" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      
      <CalcWrapper
        title="Live Silver Price Today Nepal (2083/84)"
        description={
          <>
            <strong>Live Silver Price in Nepal Today (2083/84)</strong> provides the latest official Chandi rates published by the Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA). Check today&apos;s silver price per tola, gram and kilogram, convert traditional Nepalese weight units instantly, and monitor daily market movements using real-time pricing and historical trend analysis.
          </>
        }
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Silver Price' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Exchange Rate Nepal', slug: '/market-rates/exchange-rate-nepal/' },
          { name: 'Gold Weight Converter', slug: '/calculator/gold-converter/' },
          { name: 'Gold Tax Calculator', slug: '/calculator/gold-tax/' },
          { name: 'Market Rates', slug: '/market-rates/' },
        ]}
      >
        <SilverDashboardClient />
        <SilverSeoSection />
      </CalcWrapper>
    </div>
  );
}
