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

export async function generateMetadata(): Promise<Metadata> {
  const initialData = getInitialRates();
  const goldOz = initialData.gold.spotUSD;
  const silverOz = initialData.silver.spotUSD;
  const goldGram = (goldOz / 31.1034768).toFixed(2);
  const gold14kGram = ((goldOz / 31.1034768) * 0.5833).toFixed(2);

  const formattedGold = goldOz.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedSilver = silverOz.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Dynamic SERP description with live prices embedded
  const description = `Live gold price today in USA: $${formattedGold}/oz • 24K per gram $${goldGram} • 14K per gram $${gold14kGram}. Silver spot price: $${formattedSilver}/oz. COMEX rates updated in real time, USD.`;

  return {
    title: `Gold Price Today USA - $${formattedGold}/oz | Silver Spot $${formattedSilver}/oz Live`,
    description,
    keywords: [
      // Primary USA gold & silver keywords
      'gold price today usa',
      'gold price per ounce today',
      'silver price today usa',
      'live gold spot price',
      'gold price per gram usa',
      '24k gold price usa',
      '14k gold price today',
      'comex gold price today',
      'gold and silver price today',
      'silver spot price per ounce',
      // Supporting long-tail keywords
      'us gold spot price',
      'gold price per ounce usd',
      'live spot gold price usa',
      'current gold price in us',
      '24k gold price per gram usd',
      '18k gold price per gram usa',
      '10k gold price today',
      'silver price per gram usa',
      'gold silver ratio today',
      'comex spot price gold silver',
      'gold price chart usd',
      'spot price gold troy ounce',
      'us bullion spot rates',
      'gold price today per gram',
      'live precious metals prices usa',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/market-rates/international-gold-silver/',
    },
    openGraph: {
      title: `Gold Price Today USA - $${formattedGold}/oz | Silver $${formattedSilver}/oz Live`,
      description: `Live COMEX spot prices: Gold $${formattedGold}/oz • Silver $${formattedSilver}/oz • 24K/gram $${goldGram} • 14K/gram $${gold14kGram}. All purities. Updated in real time.`,
      url: 'https://nepacalc.com/market-rates/international-gold-silver/',
      type: 'website',
      images: [{
        url: 'https://nepacalc.com/images/og/international-gold-silver.jpg',
        width: 1200,
        height: 630,
        alt: `Gold Price Today USA $${formattedGold} per troy ounce | Silver $${formattedSilver} - Live COMEX Spot Rates`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gold $${formattedGold}/oz | Silver $${formattedSilver}/oz - Live USA Spot Price`,
      description: `Today's live COMEX gold spot: $${formattedGold}/oz ($${goldGram}/g 24K, $${gold14kGram}/g 14K). Silver: $${formattedSilver}/oz. Real-time precious metals in USD.`,
      images: ['https://nepacalc.com/images/og/international-gold-silver.jpg'],
    },
  };
}

export default function InternationalGoldSilverPage() {
  const initialData = getInitialRates();

  const goldOz = initialData.gold.spotUSD;
  const silverOz = initialData.silver.spotUSD;
  const goldGram = goldOz / 31.1034768;
  const silverGram = silverOz / 31.1034768;
  const goldRatio = silverOz > 0 ? (goldOz / silverOz).toFixed(1) : '-';

  // Gold purity rows
  const purities = [
    { label: '24K (999 - Pure Gold)', pct: 1.0000 },
    { label: '22K (916 - American Gold Eagle)', pct: 0.9167 },
    { label: '18K (750 - Fine Jewelry)', pct: 0.7500 },
    { label: '14K (585 - Most Popular USA)', pct: 0.5833 },
    { label: '10K (417 - Legal Minimum USA)', pct: 0.4167 },
  ];

  function fmt2(n: number) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // 12 PAA-matched FAQ Items - covers all major USA Google "People Also Ask" questions
  const faqItems = [
    {
      name: 'What is the gold price today in the USA?',
      acceptedAnswer: {
        text: `The live gold spot price in the USA today is approximately $${fmt2(goldOz)} per troy ounce (31.1035 grams), which works out to roughly $${fmt2(goldGram)} per gram for 24K pure gold. This price is derived from continuous COMEX futures trading in New York and updates in real time throughout the trading day.`,
      },
    },
    {
      name: 'What is the silver price today in the USA?',
      acceptedAnswer: {
        text: `The current silver spot price in the USA is approximately $${fmt2(silverOz)} per troy ounce, or $${fmt2(silverGram)} per gram for .999 fine silver. Silver prices fluctuate continuously throughout the trading day on COMEX (New York) and the LBMA (London).`,
      },
    },
    {
      name: 'How much is 14K gold worth per gram in the USA today?',
      acceptedAnswer: {
        text: `14 Karat gold is 58.33% pure gold. Based on the current 24K spot price of $${fmt2(goldGram)} per gram, the 14K gold price per gram in the USA today is approximately $${fmt2(goldGram * 0.5833)}. This is the raw intrinsic melt value. Retail jewelry prices will be higher, while scrap buyers typically pay 70–90% of this melt value to cover processing costs.`,
      },
    },
    {
      name: 'What is the gold-silver ratio today?',
      acceptedAnswer: {
        text: `The gold-silver ratio today is approximately ${goldRatio}:1, meaning it takes about ${goldRatio} ounces of silver to equal the value of 1 ounce of gold. Historically the ratio has ranged from 15:1 to over 120:1. Investors use it as a relative valuation tool - a high ratio (above 80) generally suggests silver is undervalued relative to gold, while a low ratio (below 60) suggests the opposite.`,
      },
    },
    {
      name: 'What is COMEX and how does it set the gold spot price?',
      acceptedAnswer: {
        text: "COMEX (Commodity Exchange) is a division of the CME Group based in New York and is the world's primary exchange for gold and silver futures and options. The global spot price for gold is largely derived from the most active front-month COMEX futures contract, combined with the London OTC market. This continuous price discovery is what all major online spot price trackers - including this page - stream in real time.",
      },
    },
    {
      name: 'What is the difference between spot price and what I pay at a coin shop?',
      acceptedAnswer: {
        text: "The spot price is the wholesale benchmark for immediate delivery of institutional-grade bullion (typically 400 oz London Good Delivery bars). When buying physical products like American Gold Eagle coins or silver rounds at a US coin shop, you pay a 'dealer premium' above spot - typically $30–$80/oz for gold coins and $3–$8/oz for silver coins - to cover manufacturing, minting, distribution, and dealer margin.",
      },
    },
    {
      name: 'How often does the gold spot price change?',
      acceptedAnswer: {
        text: 'The gold spot price changes continuously, virtually 24 hours a day, 5 days a week, as global markets in Sydney, Tokyo, London, and New York trade in sequence. Prices are quoted in real time and can move by several dollars per ounce within seconds based on economic data releases, Federal Reserve announcements, geopolitical events, or large institutional trades.',
      },
    },
    {
      name: 'Is gold a good investment in the USA right now?',
      acceptedAnswer: {
        text: 'Gold is widely regarded as a safe-haven asset and inflation hedge. Its investment merits depend on your portfolio goals, time horizon, and risk tolerance. Gold typically performs well during periods of high inflation, geopolitical uncertainty, or US dollar weakness. However, gold does not generate income (no dividends or interest), so it is primarily used for portfolio diversification and wealth preservation rather than growth.',
      },
    },
    {
      name: 'What is the weight difference between a Troy Ounce and a standard Ounce?',
      acceptedAnswer: {
        text: 'Precious metals are always measured in Troy Ounces (oz t), not standard avoirdupois ounces. 1 Troy Ounce = 31.1035 grams, while 1 standard ounce = 28.3495 grams. This means a Troy Ounce is about 10% heavier than a regular ounce. All gold and silver spot prices worldwide are quoted per Troy Ounce.',
      },
    },
    {
      name: 'What are the most common gold karats in the USA?',
      acceptedAnswer: {
        text: 'In the United States, 14 Karat (58.3% pure) is the most popular karat for jewelry due to its durability and appearance. 10 Karat (41.7% pure) is the legal minimum to be sold as real gold under FTC guidelines. For investment bullion, 24 Karat (99.9% pure - American Gold Buffalo coins) and 22 Karat (91.67% pure - American Gold Eagle coins) are the standard. 18K is common in higher-end jewelry.',
      },
    },
    {
      name: 'What is the difference between COMEX and LBMA gold prices?',
      acceptedAnswer: {
        text: 'COMEX (New York) provides continuous real-time price discovery from futures trading that powers most live spot price feeds. The LBMA (London Bullion Market Association) publishes official twice-daily benchmark fixings - the LBMA Gold Price AM and PM - used by central banks, miners, and long-term physical supply contracts. Most retail spot price tools display the continuous COMEX-derived rate, while institutional physical contracts are priced against LBMA daily fixings.',
      },
    },
    {
      name: 'Why is silver more volatile than gold?',
      acceptedAnswer: {
        text: "Silver is both a precious metal and a critical industrial commodity used heavily in solar panels, electronics, electric vehicles, and medical devices. Its total market size is much smaller than gold's. As a result, significant buying or selling volume causes larger percentage price swings in silver than in gold. During economic recessions, industrial demand falls sharply, hitting silver harder. During economic expansions or green-energy booms, silver often outperforms gold significantly.",
      },
    },
  ];

  // Full @graph schema - WebPage + FAQPage + BreadcrumbList (3 levels) + Dataset
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/market-rates/international-gold-silver/',
        url: 'https://nepacalc.com/market-rates/international-gold-silver/',
        name: `Gold Price Today USA - $${fmt2(goldOz)}/oz | Silver Spot $${fmt2(silverOz)}/oz Live`,
        description: `Live gold price in USA today: $${fmt2(goldOz)} per troy ounce. Silver spot: $${fmt2(silverOz)}/oz. COMEX rates for 24K, 22K, 18K, 14K, and 10K gold per gram. Updated in real time.`,
        inLanguage: 'en-US',
        dateModified: new Date().toISOString(),
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          url: 'https://nepacalc.com/',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.acceptedAnswer.text,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/market-rates/international-gold-silver/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
          { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
          { '@type': 'ListItem', position: 3, name: 'Gold & Silver Price Today USA', item: 'https://nepacalc.com/market-rates/international-gold-silver/' },
        ],
      },
      {
        '@type': 'Dataset',
        '@id': 'https://nepacalc.com/market-rates/international-gold-silver/#dataset',
        name: 'Live US Gold & Silver Spot Price Data',
        description: 'Real-time COMEX-derived wholesale spot gold and silver prices in the United States, in US Dollars (USD) per troy ounce. Includes 24K, 22K, 18K, 14K, and 10K gold purity conversions per gram, plus the live gold-silver ratio.',
        url: 'https://nepacalc.com/market-rates/international-gold-silver/',
        isAccessibleForFree: true,
        inLanguage: 'en-US',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
        variableMeasured: [
          'Gold Spot Price 24K USD per Troy Ounce',
          'Gold Spot Price 22K USD per Troy Ounce',
          'Gold Spot Price 18K USD per Troy Ounce',
          'Gold Spot Price 14K USD per Troy Ounce',
          'Gold Spot Price 10K USD per Troy Ounce',
          'Silver Spot Price .999 USD per Troy Ounce',
          'Gold Price per Gram USD 24K',
          'Gold Price per Gram USD 14K',
          'Gold-Silver Ratio',
          'Gold Price per Kilogram USD',
        ],
        measurementTechnique: 'Real-time COMEX continuous futures-derived spot market transactions',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124] font-modern-ui">
      {/* ── JSON-LD Structured Data ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />

      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 pt-2 sm:pt-5">
        <nav aria-label="Breadcrumb" className="mb-1">
          <Link href="/" className="sm:hidden inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-600 transition">
            ← Home
          </Link>
          <div className="hidden sm:flex items-center flex-wrap gap-2 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/market-rates/" className="hover:text-blue-600 hover:underline">Market Rates</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">Gold &amp; Silver Price Today (USA)</span>
          </div>
        </nav>
      </div>

      {/* ── Main Interactive Dashboard ── */}
      <div id="todays-gold-price">
        <InternationalGoldClient initialData={initialData} />
      </div>

      {/* ── Gold Purity Price Table ── */}
      <section id="gold-price-by-karat" className="max-w-6xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-2xl border border-amber-100 p-5 md:p-7 shadow-sm">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
            Gold Price Per Gram by Karat - USA Today
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Based on live 24K spot price of <strong>${fmt2(goldOz)}/troy oz</strong>. All prices in USD. Updates in real time.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wide">
                  <th className="text-left py-2.5 px-3 rounded-tl-lg">Karat / Purity</th>
                  <th className="text-right py-2.5 px-3">Per Gram (USD)</th>
                  <th className="text-right py-2.5 px-3">Per Troy Oz (USD)</th>
                  <th className="text-right py-2.5 px-3 rounded-tr-lg">Per Kg (USD)</th>
                </tr>
              </thead>
              <tbody>
                {purities.map((p, i) => {
                  const gpg = goldGram * p.pct;
                  const goz = goldOz * p.pct;
                  const gkg = gpg * 1000;
                  return (
                    <tr key={p.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-2.5 px-3 font-semibold text-gray-800">{p.label}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-gray-900">${fmt2(gpg)}</td>
                      <td className="py-2.5 px-3 text-right text-gray-700">${fmt2(goz)}</td>
                      <td className="py-2.5 px-3 text-right text-gray-700">${Math.round(gkg).toLocaleString('en-US')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            * Melt value only. Retail jewelry prices are higher. Scrap buyers typically pay 70–90% of melt value.
          </p>
        </div>
      </section>

      {/* ── Gold-Silver Ratio & COMEX Explainer ── */}
      <section id="gold-silver-ratio" className="max-w-6xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Ratio Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-2">
              Gold-Silver Ratio Today
            </h2>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-black text-amber-600">{goldRatio}</span>
              <span className="text-sm text-gray-500">oz of silver = 1 oz of gold</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              The <strong>gold-silver ratio</strong> shows how many ounces of silver it takes to buy one ounce of gold.
              A ratio above 80 is historically high and often interpreted as silver being undervalued relative to gold.
              The ratio has ranged from ~15:1 (early 20th century) to over 120:1 (2020 pandemic peak). Long-term
              precious metals investors use this ratio to decide when to rotate between gold and silver holdings.
            </p>
          </div>

          {/* COMEX Explainer Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-2">
              What Is COMEX? How Is Spot Price Set?
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>COMEX</strong> (Commodity Exchange, a CME Group division, New York) is the world&apos;s primary
              marketplace for gold and silver futures. The global <strong>spot price</strong> is derived from the
              most active front-month COMEX futures contract in combination with the London OTC market - this is
              what all online live price feeds stream in real time. Physical gold at US coin shops trades at
              <strong> &ldquo;spot plus a dealer premium&rdquo;</strong> - roughly $30–$80/oz for gold coins and
              $3–$8/oz for silver coins - to cover minting, distribution, and dealer margin.
            </p>
          </div>

        </div>
      </section>

      {/* ── Key Market Drivers & US Bullion Buying Guide (SEO Long-Tail Ranking Section) ── */}
      <section id="gold-market-drivers-usa" className="max-w-6xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Key Factors Driving US Gold and Silver Prices Today
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Spot gold and silver prices in the United States fluctuate continuously during market hours. The primary economic and geopolitical catalysts governing daily rate fluctuations in USD include:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                US Federal Reserve &amp; Interest Rates
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Gold pays no yield or dividend. When the Federal Reserve cuts interest rates or bond yields soften, the opportunity cost of holding physical precious metals drops, typically boosting spot gold prices.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                US Dollar Index (DXY) Correlation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Global bullion is universally priced in US Dollars. When the US Dollar strengthens against foreign currencies, gold becomes costlier for foreign buyers. Conversely, dollar weakness fuels strong upward momentum.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Central Bank Bullion Accumulation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Sovereign central banks (including PBOC, RBI, and European central banks) have accumulated historic quantities of physical gold reserves, establishing durable multi-year price floors across global spot exchanges.
              </p>
            </div>
          </div>

          {/* Educational Quick Reference Checklist */}
          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2">
              Buyer&apos;s Checklist: Purchasing Physical Gold &amp; Silver in the United States
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Know the Spot Benchmark:</strong> Check live COMEX spot before visiting coin shops or ordering online to verify fair dealer markups.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Compare Premiums:</strong> American Gold Eagles (22K) carry slightly higher minting premiums than 24K Canadian Maple Leafs or 10 oz silver bars.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Verify Karat Hallmarks:</strong> Ensure fine jewelry is stamped with legitimate hallmarks (e.g., 585 for 14K, 750 for 18K, 999 for 24K).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Scrap Melt Valuation:</strong> Selling old scrap jewelry to pawnshops typically pays 70% to 90% of intrinsic spot melt value.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ Section (12 PAA-matched questions) ── */}
      <section id="faq-section" className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions - Gold &amp; Silver Price USA
          </h2>

          <div className="space-y-5 divide-y divide-gray-100">
            {faqItems.map((item, idx) => (
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

          {/* ── Related Tools ── */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="text-gray-400">Related Tools:</span>
            <Link href="/calculator/gold-converter/" className="text-amber-800 hover:text-amber-950 hover:underline bg-amber-50 px-3 py-1.5 rounded-full">
              Gold Unit Converter (Ounce ↔ Gram) →
            </Link>
            <Link href="/calculator/silver-converter/" className="text-slate-700 hover:text-slate-900 hover:underline bg-slate-100 px-3 py-1.5 rounded-full">
              Silver Weight Converter →
            </Link>
            <Link href="/calculator/currency-converter/" className="text-emerald-700 hover:text-emerald-900 hover:underline bg-emerald-50 px-3 py-1.5 rounded-full">
              USD Currency Converter →
            </Link>
            <Link href="/market-rates/history/" className="text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-3 py-1.5 rounded-full">
              Nepal Gold Price History →
            </Link>
            <Link href="/market-rates/silver-price-nepal/" className="text-gray-600 hover:text-gray-800 hover:underline bg-gray-100 px-3 py-1.5 rounded-full">
              Silver Price in Nepal →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
