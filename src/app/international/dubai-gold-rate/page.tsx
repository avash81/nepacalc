// Route: /international/dubai-gold-rate/
import { Metadata } from 'next';
import DubaiGoldClient, { DubaiRatesData } from './DubaiGoldClient';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const FALLBACK_RATES: DubaiRatesData = {
  gold: {
    spotUSD: 4198.66,
    change24h: 19.10,
    changePercent24h: 0.45,
    prevClose: 4179.56,
    high24h: 4211.38,
    low24h: 4175.32,
    updatedAt: new Date().toISOString(),
  },
  silver: {
    spotUSD: 52.79,
    change24h: 0.52,
    changePercent24h: 1.00,
    prevClose: 52.27,
    high24h: 53.40,
    low24h: 52.10,
    updatedAt: new Date().toISOString(),
  },
  history30d: {
    gold: [
      { date: '10-12', price: 4035.1 },
      { date: '10-19', price: 4040.6 },
      { date: '10-26', price: 4085.4 },
      { date: '11-02', price: 4129.6 },
      { date: '11-08', price: 4175.2 },
      { date: '11-10', price: 4198.66 },
    ],
    silver: [
      { date: '10-12', price: 46.8 },
      { date: '10-19', price: 45.9 },
      { date: '10-26', price: 48.3 },
      { date: '11-02', price: 50.1 },
      { date: '11-08', price: 52.2 },
      { date: '11-10', price: 52.79 },
    ],
  },
  usdNprRate: 151.93,
};

function getInitialRates(): DubaiRatesData {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'international-rates.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(content);
      if (parsed.gold?.spotUSD && parsed.silver?.spotUSD) {
        return parsed as DubaiRatesData;
      }
    }
  } catch {
    // Return fallback
  }

  return FALLBACK_RATES;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Live Dubai Gold & Silver Price Today | 24K, 22K AED Rates',
    description:
      'Track live gold and silver prices in Dubai per gram (AED). View 24K, 22K, 21K rates, historical charts, making charges, and UAE tax refund rules.',
    keywords: [
      'Dubai gold rate today',
      'gold price in Dubai 22k',
      'live Dubai gold rate 24k',
      'silver price in Dubai today',
      '1 tola gold price Dubai',
      'gold rate in Dubai in Indian Rupees',
      '18K gold price UAE',
      '21K Arabic gold price',
      '999 fine silver rate Dubai',
      '925 sterling silver price per gram',
      'gold making charges Dubai',
      'Dubai gold VAT refund',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/international/dubai-gold-rate/',
    },
    openGraph: {
      title: 'Live Dubai Gold & Silver Price Today | 24K, 22K AED Rates',
      description:
        'Track live gold and silver prices in Dubai per gram (AED). View 24K, 22K, 21K rates, historical charts, making charges, and UAE tax refund rules.',
      url: 'https://nepacalc.com/international/dubai-gold-rate/',
      type: 'website',
      images: [
        {
          url: 'https://nepacalc.com/images/og/dubai-gold-rate.jpg',
          width: 1200,
          height: 630,
          alt: 'Live Dubai Gold and Silver Rates Today AED',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Live Dubai Gold & Silver Price Today | 24K, 22K AED Rates',
      description:
        'Track live gold and silver prices in Dubai per gram (AED). View 24K, 22K, 21K rates, historical charts, making charges, and UAE tax refund rules.',
      images: ['https://nepacalc.com/images/og/dubai-gold-rate.jpg'],
    },
  };
}

export default function DubaiGoldRatePage() {
  const initialData = getInitialRates();

  // Authoritative FAQ Entities (AEO / PAA Optimized)
  const faqItems = [
    {
      name: 'How much is 22K gold in Dubai today?',
      acceptedAnswer: {
        text: "Today's benchmark 22K gold rate in Dubai is AED 459.00 per gram. For 10 grams, the rate is AED 4,590.00, and 1 tola is AED 53,536.80. Final retail jewellery purchases will include additional making charges and 5% UAE VAT.",
      },
    },
    {
      name: 'Is gold really cheaper in Dubai compared to India, UK, or USA?',
      acceptedAnswer: {
        text: 'Dubai offers highly competitive gold pricing due to lower structural maker margins, high retail competition, zero import duties on raw bullion, and 0% VAT on investment-grade bars (99%+ purity). Final out-of-pocket savings depend on currency exchange rates, making charges, and home-country customs allowances.',
      },
    },
    {
      name: 'What are making charges on gold in Dubai, and are they negotiable?',
      acceptedAnswer: {
        text: 'Making charges represent craftsmanship fees for manufacturing jewellery. In Dubai, making charges range from AED 10 to AED 100+ per gram depending on design complexity. Making charges are frequently negotiable at stores in the Dubai Gold Souq.',
      },
    },
    {
      name: 'Do I need to show my passport or ID to buy gold in Dubai?',
      acceptedAnswer: {
        text: 'Identification is not required for routine small retail purchases. However, under UAE Anti-Money Laundering (AML) regulations, dealers must verify identification (Passport or Emirates ID) for cash transactions equal to or exceeding AED 55,000 (~$15,000 USD).',
      },
    },
    {
      name: 'What is the difference between 24K, 22K, 21K, and 18K gold?',
      acceptedAnswer: {
        text: 'The karat rating indicates gold purity: 24K (99.9% pure) is ideal for investment bars and coins; 22K (91.6% pure) is the traditional Asian and Indian jewellery standard; 21K (87.5% pure) is popular in traditional Arabic and Gulf designs; and 18K (75.0% pure) is common in modern diamond-studded and Western jewellery.',
      },
    },
    {
      name: 'How does VAT apply to gold and silver in Dubai?',
      acceptedAnswer: {
        text: 'Investment-grade gold and silver bars/coins with 99%+ purity qualify for 0% Zero-Rated VAT under UAE FTA guidelines. Retail jewellery (22K, 21K, 18K, 925 silver) carries standard 5% VAT. Eligible tourists can claim VAT refunds at airport departure via Planet Tax Free terminals.',
      },
    },
  ];

  // Unified Google-Recommended Schema Graph
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://nepacalc.com/#organization',
        name: 'NepaCalc',
        url: 'https://nepacalc.com',
        logo: 'https://nepacalc.com/assets/logo.png',
        description: 'Digital utility platform providing live commodity pricing, financial tools, and calculators.',
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/dubai-gold-rate/#webpage',
        url: 'https://nepacalc.com/international/dubai-gold-rate/',
        name: 'Live Dubai Gold & Silver Price Today (24K, 22K, 18K) | AED Rates',
        description:
          'Track real-time gold and silver rates in Dubai (AED) per gram, 10g, tola, and oz across 24K, 22K, 21K, 18K purities with live calculators and UAE tax guides.',
        inLanguage: 'en-AE',
        isPartOf: {
          '@id': 'https://nepacalc.com/#website',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/international/dubai-gold-rate/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nepacalc.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gold Rates',
            item: 'https://nepacalc.com/international/dubai-gold-rate/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Dubai Gold Rate Today',
            item: 'https://nepacalc.com/international/dubai-gold-rate/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://nepacalc.com/international/dubai-gold-rate/#faq',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.acceptedAnswer.text,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124]">
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      {/* ── Compact Breadcrumbs ── */}
      <div className="max-w-6xl mx-auto px-4 pt-2 sm:pt-4">
        <nav aria-label="Breadcrumb" className="mb-1">
          <Link
            href="/"
            className="sm:hidden inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-600 transition"
          >
            ← Home
          </Link>

          <div className="hidden sm:flex items-center flex-wrap gap-1.5 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600 hover:underline">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-medium">International</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">Dubai Gold &amp; Silver Rate</span>
          </div>
        </nav>
      </div>

      {/* ── Main Interactive Client Component (H1, Live Ticker, Tables, Calculators) ── */}
      <div id="dubai-gold-rate-hub">
        <DubaiGoldClient initialData={initialData} />
      </div>

      {/* ── Internal Topical Navigation Links ── */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-xs flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-gray-400">Related Precious Metals &amp; Currency Hubs:</span>
          <Link
            href="/international/gold-silver-ratio/"
            className="text-amber-800 hover:text-amber-950 hover:underline bg-amber-50 px-3 py-1.5 rounded-full"
          >
            Gold to Silver Ratio (Live GSR) →
          </Link>
          <Link
            href="/calculator/ppp-salary-converter/"
            className="text-emerald-800 hover:text-emerald-950 hover:underline bg-emerald-50 px-3 py-1.5 rounded-full"
          >
            PPP Salary Converter by Country →
          </Link>
          <Link
            href="/calculator/currency-converter/"
            className="text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-3 py-1.5 rounded-full"
          >
            Live Currency Converter →
          </Link>
        </div>
      </section>
    </main>
  );
}
