// Route: /international/australia-gold-silver/
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import CountryGoldClient, { CountryGoldConfig, InternationalRatesData } from '@/components/international/CountryGoldClient';

const AUSTRALIA_CONFIG: CountryGoldConfig = {
  code: 'au',
  countryName: 'Australia',
  shortName: 'Australia',
  currencyCode: 'AUD',
  currencySymbol: 'A$',
  defaultUsdRate: 1.4815,
  marketBadge: 'Perth Mint & ASX Spot Benchmark',
  goldCardTitle: 'Gold (24ct / .9999 Fine)',
  silverCardTitle: 'Silver (.9999 Fine)',
  subtitle: 'Per troy ounce, gram and Kangaroo • Live Australian Dollar bullion spot',
  units: [
    { id: 'oz', label: 'Per Troy Ounce', shortLabel: 'Ounce', ozFactor: 1 },
    { id: 'g', label: 'Per Gram', shortLabel: 'Gram', ozFactor: 1 / 31.1034768 },
    { id: '10g', label: 'Per 10 Grams', shortLabel: '10 g', ozFactor: 10 / 31.1034768 },
    { id: 'kangaroo', label: '1 oz Gold Kangaroo', shortLabel: 'Kangaroo', ozFactor: 1.0 },
    { id: 'kg', label: 'Per Kilogram', shortLabel: 'Kilo', ozFactor: 1000 / 31.1034768 },
    { id: 'tola', label: 'Per Tola', shortLabel: 'Tola', ozFactor: 11.6638 / 31.1034768 },
  ],
  purities: [
    { id: '24ct', name: '24ct (999.9)', purity: 0.9999, desc: '99.99% Pure Perth Mint Investment Bullion' },
    { id: '22ct', name: '22ct (916)', purity: 0.9167, desc: '91.7% Crown Gold Bullion' },
    { id: '18ct', name: '18ct (750)', purity: 0.750, desc: '75.0% Australian Fine Jewellery' },
    { id: '14ct', name: '14ct (585)', purity: 0.5833, desc: '58.3% Popular Jewellery Standard' },
    { id: '9ct', name: '9ct (375)', purity: 0.375, desc: '37.5% Australian Standard Minimum' },
  ],
  popularItems: [
    {
      name: '1 oz Australian Gold Kangaroo Coin (The Perth Mint)',
      metal: 'gold',
      weight: '31.1035 g',
      purity: '24ct (999.9)',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: 'GST-free investment gold across Australia',
    },
    {
      name: '1 oz Perth Mint Minted Gold Bar (CertiCard)',
      metal: 'gold',
      weight: '31.1035 g',
      purity: '24ct (999.9)',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: 'GST-free investment gold',
    },
    {
      name: '1 kg Perth Mint Cast Gold Bar',
      metal: 'gold',
      weight: '1000.0 g',
      purity: '24ct (999.9)',
      ozFactor: 1000 / 31.1034768,
      purityFactor: 1.0,
      taxNote: 'GST-free institutional bullion',
    },
    {
      name: '1 oz Australian Silver Kookaburra Coin',
      metal: 'silver',
      weight: '31.1035 g',
      purity: '.9999 Fine',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: 'GST-free investment silver',
    },
    {
      name: '1 kg Perth Mint Cast Silver Bar',
      metal: 'silver',
      weight: '1000.0 g',
      purity: '.999 Fine',
      ozFactor: 1000 / 31.1034768,
      purityFactor: 1.0,
      taxNote: 'GST-free investment silver',
    },
  ],
  regulatoryNotes: {
    authority: 'The Perth Mint (Gold Corporation, guaranteed by the Western Australian Government) & Royal Australian Mint (Canberra).',
    vatGstRule: 'Investment precious metals (gold >=99.5%, silver >=99.9%) are 100% GST-free under section 38-385 of the GST Act (ATO).',
    cgtTaxRule: 'Individuals holding bullion for more than 12 months benefit from the Australian 50% Capital Gains Tax discount.',
  },
  metalLabel: 'Precious Metal',
  goldLabel: 'Gold',
  silverLabel: 'Silver',
  unitLabel: 'Weight Unit',
  purityLabel: 'Purity / Carat (ct)',
  calcButtonLabel: 'Calculate',
  closeButtonLabel: 'Close',

};

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
  const fx = AUSTRALIA_CONFIG.defaultUsdRate;
  const goldOzAUD = initialData.gold.spotUSD * fx;
  const silverOzAUD = initialData.silver.spotUSD * fx;
  const goldGramAUD = (goldOzAUD / 31.1034768).toFixed(2);
  const gold18kGramAUD = ((goldOzAUD / 31.1034768) * 0.75).toFixed(2);
  const gold9kGramAUD = ((goldOzAUD / 31.1034768) * 0.375).toFixed(2);

  const formattedGold = goldOzAUD.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedSilver = silverOzAUD.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const description = `Live gold price today Australia in Australian Dollars (A$): A$${formattedGold}/oz • 24ct A$${goldGramAUD}/g • 18ct A$${gold18kGramAUD}/g • 9ct A$${gold9kGramAUD}/g. Silver spot: A$${formattedSilver}/oz. Perth Mint & GST guide.`;

  return {
    title: `Gold Price Today Australia - A$${formattedGold}/oz | Silver Spot A$${formattedSilver}/oz Live`,
    description,
    keywords: [
      'gold price today australia',
      'gold price australia live',
      'silver price today australia',
      'gold price per gram australia',
      'perth mint gold price today',
      '24ct gold price australia',
      '18ct gold price per gram australia',
      '9ct gold price australia',
      'gold price per ounce aud',
      'gold kangaroo coin price',
      'gst free gold australia',
      'smsf physical gold australia',
      'scrap gold price per gram aud',
      'gold silver ratio australia',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/international/australia-gold-silver/',
    },
    openGraph: {
      title: `Gold Price Today Australia - A$${formattedGold}/oz | Silver A$${formattedSilver}/oz Live`,
      description: `Live Australian spot prices: Gold A$${formattedGold}/oz • Silver A$${formattedSilver}/oz • 24ct/gram A$${goldGramAUD} • 9ct/gram A$${gold9kGramAUD}. Perth Mint & ATO GST rules.`,
      url: 'https://nepacalc.com/international/australia-gold-silver/',
      type: 'website',
      images: [{
        url: 'https://nepacalc.com/images/og/international-gold-silver.jpg',
        width: 1200,
        height: 630,
        alt: `Gold Price Today Australia A$${formattedGold} per troy ounce | Silver A$${formattedSilver} - Live Spot Rates`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gold A$${formattedGold}/oz | Silver A$${formattedSilver}/oz - Live Australia Spot Price`,
      description: `Today's live Australian gold spot: A$${formattedGold}/oz (A$${goldGramAUD}/g 24ct, A$${gold9kGramAUD}/g 9ct). Silver: A$${formattedSilver}/oz. Real-time precious metals in AUD.`,
      images: ['https://nepacalc.com/images/og/international-gold-silver.jpg'],
    },
  };
}

export default function AustraliaGoldSilverPage() {
  const initialData = getInitialRates();
  const fx = AUSTRALIA_CONFIG.defaultUsdRate;

  const goldOzAUD = initialData.gold.spotUSD * fx;
  const silverOzAUD = initialData.silver.spotUSD * fx;
  const goldGramAUD = goldOzAUD / 31.1034768;
  const silverGramAUD = silverOzAUD / 31.1034768;
  const goldRatio = silverOzAUD > 0 ? (goldOzAUD / silverOzAUD).toFixed(1) : '-';

  function fmtAUD(n: number) {
    return n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const faqItems = [
    {
      name: 'What is the gold price today in Australia?',
      acceptedAnswer: {
        text: `The live gold spot price in Australia today is approximately A$${fmtAUD(goldOzAUD)} per troy ounce (31.1035 grams), which equals roughly A$${fmtAUD(goldGramAUD)} per gram for pure 24ct (.9999) gold. For 18ct fine jewellery, the price is approximately A$${fmtAUD(goldGramAUD * 0.75)} per gram, and for standard 9ct jewellery, it is roughly A$${fmtAUD(goldGramAUD * 0.375)} per gram.`,
      },
    },
    {
      name: 'What is the silver price today in Australia?',
      acceptedAnswer: {
        text: `The current silver spot price in Australia is approximately A$${fmtAUD(silverOzAUD)} per troy ounce, or A$${fmtAUD(silverGramAUD)} per gram for .9999 fine investment silver.`,
      },
    },
    {
      name: 'Is gold bullion subject to GST in Australia?',
      acceptedAnswer: {
        text: 'No. Under the Australian Taxation Office (ATO) legislation (A New Tax System Act 1999, section 38-385), investment precious metals are classified as GST-free supplies. To qualify for 0% GST, gold must have a fineness of at least 99.5%, and silver must have a fineness of at least 99.9%, in the form of tradeable bars, ingots, or coins. Jewellery is not GST-free and attracts standard 10% GST.',
      },
    },
    {
      name: 'What is the Capital Gains Tax (CGT) discount on bullion in Australia?',
      acceptedAnswer: {
        text: 'Physical precious metals are capital assets for Australian tax purposes. If an Australian individual or trust holds physical bullion for at least 12 months before selling, they are entitled to the ATO 50% CGT discount, meaning only 50% of the net capital gain is included in assessable taxable income.',
      },
    },
    {
      name: 'Can an Australian Self-Managed Super Fund (SMSF) buy physical gold?',
      acceptedAnswer: {
        text: 'Yes. SMSFs can invest in physical gold and silver bullion. Under ATO rules, investment bullion is not classified as a collectable or personal-use asset, meaning it can be stored in a secure independent vault or facility without violating the strict SMSF collectables storage rules. Bullion must be insured and held strictly for retirement benefit purposes.',
      },
    },
    {
      name: 'What makes The Perth Mint globally unique?',
      acceptedAnswer: {
        text: 'Established in 1899 as a branch of Britain&apos;s Royal Mint, The Perth Mint (Gold Corporation) is wholly owned by the Government of Western Australia. Under the Gold Corporation Act 1987, all precious metal products, storage, and cash liabilities are backed by an explicit statutory guarantee from the State Government of Western Australia.',
      },
    },
    {
      name: 'What is the gold-silver ratio in Australia today?',
      acceptedAnswer: {
        text: `The gold-silver ratio in Australia today is approximately ${goldRatio}:1. This means one troy ounce of gold is worth ${goldRatio} ounces of silver at live Australian market spot prices.`,
      },
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/australia-gold-silver/#webpage',
        url: 'https://nepacalc.com/international/australia-gold-silver/',
        name: `Gold Price Today Australia - A$${fmtAUD(goldOzAUD)}/oz | Silver Price Today Australia Live`,
        description: `Live gold price today in Australia in AUD (A$): 24ct, 22ct, 18ct, and 9ct per gram and ounce. Perth Mint spot rates, 0% GST rules, and SMSF bullion guide.`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          url: 'https://nepacalc.com/',
          name: 'NepaCalc',
        },
        inLanguage: 'en-AU',
      },
      {
        '@type': 'BreadcrumbList',
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
            name: 'International Markets',
            item: 'https://nepacalc.com/international/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Australia Gold & Silver Price',
            item: 'https://nepacalc.com/international/australia-gold-silver/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.acceptedAnswer.text,
          },
        })),
      },
      {
        '@type': 'Dataset',
        name: 'Australia Gold and Silver Spot Prices (AUD)',
        description: 'Real-time and 30-day historical wholesale precious metal spot prices in Australian Dollars (A$) based on Perth Mint benchmarks.',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        variableMeasured: [
          'Gold spot price per troy ounce AUD',
          'Silver spot price per troy ounce AUD',
          'Gold price per gram 24ct AUD',
          'Gold price per gram 18ct AUD',
          'Gold price per gram 9ct AUD',
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <div className="min-h-screen bg-gray-50/50 pb-16 font-sans font-modern-ui">
        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-2 text-xs text-gray-500">
          <nav className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <Link href="/international/" className="hover:text-blue-600 transition">International</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Australia Gold &amp; Silver</span>
          </nav>
        </div>

        {/* Live Client Hero & Calculator */}
        <CountryGoldClient config={AUSTRALIA_CONFIG} initialData={initialData} />

        {/* Deep Educational & Regulatory Content */}
        <article className="max-w-6xl mx-auto px-4 mt-6 text-gray-800 space-y-10">
          
          {/* Section 1: The Australian Gold Sector & The Perth Mint */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Australia&apos;s Gold Heritage &amp; The Perth Mint
            </h2>
            <div className="space-y-3.5 text-sm leading-relaxed text-gray-700">
              <p>
                Australia is consistently ranked as one of the world&apos;s two largest gold-producing nations alongside China. Renowned mining operations across Western Australia, Queensland, and New South Wales feed into The Perth Mint, one of the globe&apos;s oldest operating mints and a master refiner accredited by the LBMA, CME/COMEX, and Shanghai Gold Exchange.
              </p>
              <p>
                Australian jewellery standards are governed by traditional British standards. 9ct gold (37.5% gold / hallmark 375) represents the most common alloy for rings, chains, and bracelets, while 18ct gold (75.0% / hallmark 750) is the benchmark for luxury diamond engagement jewellery.
              </p>
            </div>
          </section>

          {/* Section 2: Australian Tax Rules: ATO GST Exemption & 50% CGT Discount */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Australian Tax Guide: GST-Free Bullion &amp; 50% CGT Concession
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                The Australian Taxation Office (ATO) provides clear concessions for precious metal investors:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-amber-900 mb-1.5">100% GST-Free Bullion</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Under Section 38-385 of the GST Act, investment precious metals meeting purity thresholds (at least 99.5% for gold and 99.9% for silver) are GST-free. Buyers save the 10% Goods and Services Tax that otherwise applies to general goods and jewellery.
                  </p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-emerald-900 mb-1.5">50% Capital Gains Discount</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    When holding physical gold or silver for over 12 months, Australian individual tax residents can apply the 50% CGT discount. Half of the capital gain is completely disregarded before applying your marginal income tax rate.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Frequently Asked Questions */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions (Australia Gold &amp; Silver)
            </h2>
            <div className="space-y-4 divide-y divide-gray-100">
              {faqItems.map((faq, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">
                    {faq.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Navigation: Simple & Clean, No Big Containers */}
          <div className="pt-2 space-y-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Official Resources &amp; Regulatory Authorities
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <a
                  href="https://www.perthmint.com/invest/gold/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  The Perth Mint <span className="text-gray-400">(perthmint.com)</span>
                </a>
                <a
                  href="https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/gst-and-financial-supplies/precious-metals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  ATO Precious Metals GST <span className="text-gray-400">(ato.gov.au)</span>
                </a>
                <a
                  href="https://www.rba.gov.au/statistics/frequency/exchange-rates.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Reserve Bank of Australia <span className="text-gray-400">(rba.gov.au)</span>
                </a>
              </div>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Related Tools &amp; Calculators
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                <Link
                  href="/international/gold-silver-ratio/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Gold-Silver Ratio
                </Link>
                <Link
                  href="/international/gold-silver-price/history/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Spot Price Archive
                </Link>
                <Link
                  href="/calculator/gold-converter/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Gold Unit Converter
                </Link>
                <Link
                  href="/calculator/currency-converter/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Currency Converter
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Explore Global Precious Metal Rates
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                <Link
                  href="/international/uk-gold-silver/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  UK (GBP)
                </Link>
                <Link
                  href="/international/canada-gold-silver/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Canada (CAD)
                </Link>
                <Link
                  href="/international/germany-gold-silver/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Germany (EUR)
                </Link>
                <Link
                  href="/international/france-gold-silver/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  France (EUR)
                </Link>
                <Link
                  href="/international/netherlands-gold-silver/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Netherlands (EUR)
                </Link>
                <Link
                  href="/international/gold-silver-price/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  USA (USD)
                </Link>
                <Link
                  href="/international/dubai-gold-rate/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Dubai (AED)
                </Link>
              </div>
            </div>
          </div>

        </article>
      </div>
    </>
  );
}
