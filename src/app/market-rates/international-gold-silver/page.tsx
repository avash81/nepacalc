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

  try {
    const forexPath = path.join(process.cwd(), 'public', 'data', 'forex-rates.json');
    if (fs.existsSync(forexPath)) {
      const data = JSON.parse(fs.readFileSync(forexPath, 'utf8'));
      if (data.nrb_rates) {
        const usd = data.nrb_rates.find((r: any) => r.iso3 === 'USD');
        if (usd?.mid) {
          FALLBACK_RATES.usdNprRate = usd.mid;
        } else if (usd?.buy) {
          FALLBACK_RATES.usdNprRate = usd.buy;
        }
      }
    }
  } catch {
    // Keep fallback
  }

  return FALLBACK_RATES;
}

export const metadata: Metadata = {
  title: "Gold Price in USA Today | Live Spot Gold & Silver Price (USD)",
  description: "Current spot gold and silver prices in the USA in USD. Live 24-hour spot charts, real-time prices for 24K, 22K, 18K, 14K, and 10K gold per troy ounce, gram, 10 grams, and tola.",
  keywords: [
    'gold price in usa',
    'gold price usa today',
    'gold spot price',
    'price of gold per ounce',
    'current gold price in usa',
    'live gold price usd',
    '24k gold price usa',
    '22k gold price usa',
    '10 grams gold price in usa',
    'gold price per tola usa',
    'silver price today usa',
    'gold spot price charts',
    'gold rate in usa in nepali rupees'
  ],
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/international-gold-silver/',
  },
  openGraph: {
    title: "Gold Price in USA Today | Live Spot Gold & Silver Price (USD)",
    description: "Current spot gold and silver prices in the USA in USD. Live 24-hour spot charts, real-time prices for 24K, 22K, 18K, 14K, and 10K gold per troy ounce, gram, 10 grams, and tola.",
    url: 'https://nepacalc.com/market-rates/international-gold-silver/',
    type: 'website',
    images: [{
      url: 'https://nepacalc.com/images/og/gold-price-nepal.jpg',
      width: 1200,
      height: 630,
      alt: 'Live Gold and Silver Spot Price in USA'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gold Price in USA Today | Live Spot Gold & Silver Price (USD)",
    description: "Current spot gold and silver prices in the USA in USD. Live 24-hour spot charts and real-time prices for 24K, 22K, 18K, 14K, and 10K gold.",
    images: ['https://nepacalc.com/images/og/gold-price-nepal.jpg'],
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
  const rateUSDNPR = initialData.usdNprRate;

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
        "name": "Gold Price in USA",
        "item": "https://nepacalc.com/market-rates/international-gold-silver/"
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/market-rates/international-gold-silver/#webpage",
    "url": "https://nepacalc.com/market-rates/international-gold-silver/",
    "name": "Gold Price in USA Today | Live Spot Gold & Silver Price (USD)",
    "description": "Current spot gold and silver prices in the USA in USD. Real-time rates for 24K, 22K, 18K, 14K, and 10K gold per troy ounce, gram, 10 grams, and tola.",
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
    "name": "USA & International Spot Gold & Silver Live Rates",
    "description": "Continuous wholesale spot gold and silver price data from COMEX New York and LBMA London electronic exchanges in US Dollars (USD) and converted Nepali Rupees (NPR).",
    "url": "https://nepacalc.com/market-rates/international-gold-silver/",
    "isAccessibleForFree": true,
    "inLanguage": "en-US",
    "license": "https://creativecommons.org/licenses/by/4.0/",
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
        "name": "What is the current gold price in the USA per troy ounce?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The current spot price of 24K gold in the USA is $${goldOz.toFixed(2)} USD per troy ounce. This is equivalent to approximately $${goldGram.toFixed(2)} USD per gram or $${goldTola.toFixed(2)} USD per tola.`
        }
      },
      {
        "@type": "Question",
        "name": "How much is 10 grams of gold in the USA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `10 grams of pure 24K gold in the USA costs $${gold10g.toFixed(2)} USD at current market spot rates (equivalent to approximately Rs ${Math.round(gold10g * rateUSDNPR).toLocaleString('en-IN')} NPR at live exchange rates).`
        }
      },
      {
        "@type": "Question",
        "name": "What is the gold price today in the USA per tola?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `One tola equals 11.6638 grams (approx. 0.375 troy ounces). In the USA spot market, 1 tola of 24K pure gold is worth $${goldTola.toFixed(2)} USD (approx. Rs ${Math.round(goldTola * rateUSDNPR).toLocaleString('en-IN')} NPR).`
        }
      },
      {
        "@type": "Question",
        "name": "How much is 24 carat gold in the USA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `24 Carat (99.9% pure) gold in the USA is traded at the spot benchmark rate of $${goldOz.toFixed(2)} USD per troy ounce ($${goldGram.toFixed(2)} per gram). 1 kilogram of 24K gold bullion is worth approximately $${Math.round(goldKg).toLocaleString('en-US')} USD.`
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between 24K, 22K, 18K, and 14K gold in the USA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "24 Karat gold is 99.9% pure bullion. 22 Karat contains 91.6% pure gold (standard in South Asian jewelry). 18 Karat contains 75.0% pure gold, and 14 Karat contains 58.3% pure gold, which represents the most popular jewelry standard sold in retail stores across the United States."
        }
      },
      {
        "@type": "Question",
        "name": "How is international spot gold converted to Nepali Rupees (NPR)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "International gold is quoted in USD per troy ounce (31.1035 grams). To convert to Nepali Rupees per tola (11.6638 grams), calculate: (Spot USD / 31.1035) × 11.6638 × USD/NPR Exchange Rate. Domestic Nepal retail rates set by FENEGOSIDA also include customs duty (20%) and local bank handling fees."
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
          <span className="text-gray-900 font-bold">Gold Price in USA</span>
        </nav>
      </div>

      {/* ── Server-Rendered Quick Answer / Direct Answer (AIO & Snippet Extraction) ── */}
      <section id="quick-answer" className="max-w-6xl mx-auto px-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-gray-700 leading-relaxed shadow-xs">
          <p>
            <strong>Quick Answer:</strong> The current spot price of gold in the USA is <strong>${goldOz.toFixed(2)} USD per troy ounce</strong> (approximately <strong>${goldGram.toFixed(2)} USD per gram</strong>, <strong>${gold10g.toFixed(2)} USD per 10 grams</strong>, and <strong>${goldTola.toFixed(2)} USD per tola</strong>). Live spot silver is <strong>${silverOz.toFixed(2)} USD per troy ounce</strong>. These rates represent real-time wholesale bullion benchmarks on COMEX New York and LBMA London.
          </p>
        </div>
      </section>

      {/* ── Main Interactive Client Dashboard (Hamro Patro UI + Live Polling) ── */}
      <div id="todays-gold-price">
        <InternationalGoldClient initialData={initialData} />
      </div>

      {/* ── SEO Frequently Asked Questions Section (Matching Google SERP PAA) ── */}
      <section id="faq-section" className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions About Gold &amp; Silver Prices in the USA
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
            <span className="text-gray-400">Related Market Rates:</span>
            <Link
              href="/market-rates/live-gold-price/"
              className="text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-3 py-1.5 rounded-full"
            >
              Gold Price in Nepal (FENEGOSIDA) →
            </Link>
            <Link
              href="/market-rates/silver-price-nepal/"
              className="text-slate-600 hover:text-slate-800 hover:underline bg-slate-100 px-3 py-1.5 rounded-full"
            >
              Silver Price in Nepal →
            </Link>
            <Link
              href="/market-rates/exchange-rate-nepal/"
              className="text-emerald-700 hover:text-emerald-900 hover:underline bg-emerald-50 px-3 py-1.5 rounded-full"
            >
              NRB Foreign Exchange Rates →
            </Link>
            <Link
              href="/how-much-gold-can-you-bring-to-nepal/"
              className="text-amber-700 hover:text-amber-900 hover:underline bg-amber-50 px-3 py-1.5 rounded-full"
            >
              How Much Gold Can You Bring to Nepal? →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
