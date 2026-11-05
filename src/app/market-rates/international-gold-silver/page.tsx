// Route: /market-rates/international-gold-silver/
import { Metadata } from 'next';
import InternationalGoldClient, { InternationalRatesData } from './InternationalGoldClient';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const FALLBACK_RATES: InternationalRatesData = {
  gold: {
    spotUSD: 4129.60,
    change24h: 34.80,
    changePercent24h: 0.85,
    prevClose: 4094.80,
    high24h: 4146.10,
    low24h: 4111.40,
    updatedAt: new Date().toISOString(),
  },
  silver: {
    spotUSD: 52.92,
    change24h: 0.68,
    changePercent24h: 1.30,
    prevClose: 52.24,
    high24h: 53.47,
    low24h: 52.17,
    updatedAt: new Date().toISOString(),
  },
  history30d: {
    gold: [
      { date: '09-28', price: 3950.4 },
      { date: '10-05', price: 3985.2 },
      { date: '10-12', price: 4035.1 },
      { date: '10-19', price: 4040.6 },
      { date: '10-30', price: 3995.8 },
      { date: '11-05', price: 4129.6 },
    ],
    silver: [
      { date: '09-28', price: 46.5 },
      { date: '10-05', price: 47.1 },
      { date: '10-12', price: 46.8 },
      { date: '10-19', price: 45.9 },
      { date: '10-30', price: 47.2 },
      { date: '11-05', price: 52.92 },
    ],
  },
  usdNprRate: 151.93,
};

function getInitialRates(): InternationalRatesData {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'international-rates.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(content);
      if (parsed.gold?.spotUSD && parsed.silver?.spotUSD) {
        return parsed as InternationalRatesData;
      }
    }
  } catch {
    // Return fallback
  }

  return FALLBACK_RATES;
}

export const metadata: Metadata = {
  title: "International Gold & Silver Price Today | Live Spot Rates (USD)",
  description: "Track live international gold ($4,128.50/oz) and silver ($52.90/oz) spot prices. Features 24K, 22K, 18K, and 14K purity rates, Gram/Kilo breakdowns, and global market insights.",
  keywords: [
    'international gold price',
    'live spot gold price',
    'gold spot price',
    'price of gold per ounce',
    'current international gold price',
    'live gold price usd',
    '24k international gold price',
    '22k gold price',
    '10 grams international gold price',
    'international gold price per tola',
    'international silver price today',
    'gold spot price charts',
    'international gold rate today',
    'spot bullion rates usd'
  ],
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/international-gold-silver/',
  },
  openGraph: {
    title: "International Gold & Silver Spot Price Today | Live Market Benchmark",
    description: "Live international gold and silver spot prices updated continuously in USD. Instant weight conversion per troy ounce, gram, 10 grams, and kilogram.",
    url: 'https://nepacalc.com/market-rates/international-gold-silver/',
    type: 'website',
    images: [{
      url: 'https://nepacalc.com/images/og/international-gold-silver.jpg',
      width: 1200,
      height: 630,
      alt: 'Live International Gold and Silver Spot Price'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "International Gold & Silver Price Today (USD Spot Rates)",
    description: "Real-time global spot gold and silver rates per ounce, gram, and kilogram with multi-karat purity calculations (COMEX & LBMA).",
    images: ['https://nepacalc.com/images/og/international-gold-silver.jpg'],
  },
};

export default function InternationalGoldSilverPage() {
  const initialData = getInitialRates();
  const goldOz = initialData.gold.spotUSD;
  const silverOz = initialData.silver.spotUSD;
  const goldGram = goldOz / 31.1034768;
  const gold10g = goldGram * 10;
  const goldTola = goldGram * 11.6638;
  const goldKg = goldGram * 1000;
  void silverOz; // kept in data model for schema reference

  // Single Authoritative Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://nepacalc.com/market-rates/international-gold-silver/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nepacalc.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Market Rates",
        "item": "https://nepacalc.com/market-rates/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "International Gold & Silver",
        "item": "https://nepacalc.com/market-rates/international-gold-silver/"
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/market-rates/international-gold-silver/#webpage",
    "url": "https://nepacalc.com/market-rates/international-gold-silver/",
    "name": "International Gold & Silver Price Today | Live Spot Rates (USD)",
    "description": "Track live international gold ($4,128.50/oz) and silver ($52.90/oz) spot prices. Features 24K, 22K, 18K, and 14K purity rates, Gram/Kilo breakdowns, and global market insights.",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://nepacalc.com/#website",
      "url": "https://nepacalc.com/"
    }
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": "https://nepacalc.com/market-rates/international-gold-silver/#dataset",
    "name": "International Spot Gold & Silver Live Rates",
    "description": "Continuous wholesale spot gold and silver price data from COMEX New York and LBMA London electronic exchanges in US Dollars (USD).",
    "url": "https://nepacalc.com/market-rates/international-gold-silver/",
    "isAccessibleForFree": true,
    "inLanguage": "en-US",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": {
      "@type": "Organization",
      "name": "NepaCalc",
      "url": "https://nepacalc.com"
    },
    "variableMeasured": [
      "Gold Spot Price 24K USD per Troy Ounce",
      "Gold Spot Price 22K USD per Troy Ounce",
      "Gold Spot Price 18K USD per Troy Ounce",
      "Gold Spot Price 14K USD per Troy Ounce",
      "Silver Spot Price .999 USD per Troy Ounce",
      "Gold Price per Gram USD",
      "Gold Price per 10 Grams USD",
      "Gold Price per Tola USD"
    ],
    "measurementTechnique": "Real-time wholesale bullion spot transactions on COMEX and LBMA"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://nepacalc.com/market-rates/international-gold-silver/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the current international gold price per troy ounce?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The current international spot price of 24K gold is $${goldOz.toFixed(2)} USD per troy ounce. This is equivalent to approximately $${goldGram.toFixed(2)} USD per gram or $${goldTola.toFixed(2)} USD per tola.`
        }
      },
      {
        "@type": "Question",
        "name": "How much is 10 grams of gold in the international spot market?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `10 grams of pure 24K gold in the international spot market costs $${gold10g.toFixed(2)} USD at current benchmark rates.`
        }
      },
      {
        "@type": "Question",
        "name": "What is the international gold price today per tola?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `One tola equals 11.6638 grams (approx. 0.375 troy ounces). In the international spot market, 1 tola of 24K pure gold is worth $${goldTola.toFixed(2)} USD at current benchmark rates.`
        }
      },
      {
        "@type": "Question",
        "name": "How much is 24 carat gold internationally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `24 Carat (99.9% pure) gold is traded at the international spot benchmark rate of $${goldOz.toFixed(2)} USD per troy ounce ($${goldGram.toFixed(2)} per gram). 1 kilogram of 24K gold bullion is worth approximately $${Math.round(goldKg).toLocaleString('en-US')} USD.`
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between 24K, 22K, 18K, and 14K gold in the international market?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "24 Karat gold is 99.9% pure bullion. 22 Karat contains 91.6% pure gold (standard in South Asian jewelry). 18 Karat contains 75.0% pure gold, and 14 Karat contains 58.3% pure gold, which represents the most popular jewelry standard sold in retail stores across international markets."
        }
      },
      {
        "@type": "Question",
        "name": "How is international spot gold priced and traded?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "International spot gold is quoted globally in US Dollars (USD) per troy ounce (31.1035 grams). It trades 24 hours a day across major electronic exchanges including the COMEX division of the New York Mercantile Exchange (NYMEX) and the London Bullion Market Association (LBMA), which establishes the twice-daily international bullion benchmark fixings."
        }
      },
      {
        "@type": "Question",
        "name": "What is the institutional bid-ask spread in the international gold market?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In global over-the-counter (OTC) spot trading (COMEX/LBMA), the bid-ask spread for gold typically ranges between $0.30 and $0.80 per troy ounce during regular trading hours. The bid price is what buyers offer, while the ask price is what sellers accept."
        }
      },
      {
        "@type": "Question",
        "name": "Why is silver more volatile than gold in global trading?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Silver carries dual demand drivers—it functions as a monetary store of value and an essential industrial commodity (used extensively in solar panels, electronics, and medical equipment). Because the total market capitalization of silver is significantly smaller than gold, institutional volume flows cause higher percentage swings."
        }
      },
      {
        "@type": "Question",
        "name": "What is the weight difference between a Troy Ounce and a standard Ounce?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Precious metals are measured strictly in Troy Ounces (oz t), which equal 31.1035 grams. A standard (Avoirdupois) ounce used for grocery weight equals only 28.3495 grams. Always ensure precious metal weight calculations use the 31.1035g standard."
        }
      }
    ]
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/market-rates/international-gold-silver/#speakable",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#quick-answer", "#todays-gold-price", "#faq-section"]
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124]">
      {/* ── JSON-LD Structured Data (No duplicates, no dateModified) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      {/* ── Breadcrumb Navigation (Server-rendered HTML) ── */}
      <div className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs font-medium text-gray-500 mb-2">
          <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/market-rates/" className="hover:text-blue-600 hover:underline">Market Rates</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-bold">International Gold &amp; Silver</span>
        </nav>
      </div>

      {/* ── Main Interactive Client Dashboard (Hamro Patro UI + Live Polling) ── */}
      <div id="todays-gold-price">
        <InternationalGoldClient initialData={initialData} />
      </div>

      {/* ── SEO Frequently Asked Questions Section (Matching Google SERP PAA) ── */}
      <section id="faq-section" className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions About International Precious Metals
          </h2>

          <div className="space-y-5 divide-y divide-gray-100">
            {faqSchema.mainEntity.map((item, idx) => (
              <div key={idx} className="pt-4 first:pt-0">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1.5">
                  {item.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>

          {/* ── Internal Topical Navigation Links ── */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="text-gray-400">Related Tools:</span>
            <Link
              href="/calculator/gold-converter/"
              className="text-amber-800 hover:text-amber-950 hover:underline bg-amber-50 px-3 py-1.5 rounded-full"
            >
              Gold Unit Converter (Ounce to Gram) →
            </Link>
            <Link
              href="/calculator/silver-converter/"
              className="text-slate-700 hover:text-slate-900 hover:underline bg-slate-100 px-3 py-1.5 rounded-full"
            >
              Silver Weight Converter →
            </Link>
            <Link
              href="/calculator/currency-converter/"
              className="text-emerald-700 hover:text-emerald-900 hover:underline bg-emerald-50 px-3 py-1.5 rounded-full"
            >
              Live Currency Converter →
            </Link>
            <Link
              href="/market-rates/"
              className="text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-3 py-1.5 rounded-full"
            >
              Global Market Rates Board →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
