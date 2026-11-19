// Route: /international/uk-gold-silver/
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import CountryGoldClient, { CountryGoldConfig, InternationalRatesData } from '@/components/international/CountryGoldClient';

const UK_CONFIG: CountryGoldConfig = {
  code: 'uk',
  countryName: 'United Kingdom',
  shortName: 'UK',
  currencyCode: 'GBP',
  currencySymbol: '£',
  defaultUsdRate: 0.7586,
  marketBadge: 'LBMA London Fix & Spot',
  goldCardTitle: 'Gold (24ct / Hallmark)',
  silverCardTitle: 'Silver (.999 Fine)',
  units: [
    { id: 'oz', label: 'Per Troy Ounce', shortLabel: 'Ounce', ozFactor: 1 },
    { id: 'g', label: 'Per Gram', shortLabel: 'Gram', ozFactor: 1 / 31.1034768 },
    { id: '10g', label: 'Per 10 Grams', shortLabel: '10 g', ozFactor: 10 / 31.1034768 },
    { id: 'sovereign', label: 'Full Sovereign (7.988g)', shortLabel: 'Sovereign', ozFactor: 7.3224 / 31.1034768 },
    { id: 'kg', label: 'Per Kilogram', shortLabel: 'Kilo', ozFactor: 1000 / 31.1034768 },
    { id: 'tola', label: 'Per Tola', shortLabel: 'Tola', ozFactor: 11.6638 / 31.1034768 },
  ],
  purities: [
    { id: '24ct', name: '24ct (999.9)', purity: 0.999, desc: '99.9% Pure Investment Bullion' },
    { id: '22ct', name: '22ct (916)', purity: 0.9167, desc: 'Crown Gold · Sovereigns & Britannias' },
    { id: '18ct', name: '18ct (750)', purity: 0.750, desc: '75.0% Fine Luxury British Jewellery' },
    { id: '14ct', name: '14ct (585)', purity: 0.5833, desc: '58.3% Popular Jewellery Standard' },
    { id: '9ct', name: '9ct (375)', purity: 0.375, desc: '37.5% UK Legal Minimum Hallmark' },
  ],
  popularItems: [
    {
      name: 'Full Gold Sovereign (The Royal Mint)',
      metal: 'gold',
      weight: '7.988 g',
      purity: '22ct (916.7)',
      ozFactor: 7.988 / 31.1034768,
      purityFactor: 0.9167,
      taxNote: 'CGT Exempt & 0% VAT in the UK',
    },
    {
      name: 'Half Gold Sovereign',
      metal: 'gold',
      weight: '3.994 g',
      purity: '22ct (916.7)',
      ozFactor: 3.994 / 31.1034768,
      purityFactor: 0.9167,
      taxNote: 'CGT Exempt & 0% VAT in the UK',
    },
    {
      name: '1 oz Gold Britannia Coin',
      metal: 'gold',
      weight: '31.1035 g',
      purity: '24ct (999.9)',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: 'CGT Exempt & 0% VAT in the UK',
    },
    {
      name: '100g Cast Gold Bar (Royal Mint / Metalor)',
      metal: 'gold',
      weight: '100.0 g',
      purity: '24ct (999.9)',
      ozFactor: 100 / 31.1034768,
      purityFactor: 1.0,
      taxNote: '0% VAT under HMRC Notice 701/21',
    },
    {
      name: '1 oz Silver Britannia Coin',
      metal: 'silver',
      weight: '31.1035 g',
      purity: '.999 Fine',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: 'CGT Exempt (Standard 20% VAT applies)',
    },
  ],
  regulatoryNotes: {
    authority: 'London Bullion Market Association (LBMA) & UK Assay Offices (London, Birmingham, Sheffield, Edinburgh) under the Hallmarking Act 1973.',
    vatGstRule: 'Investment gold is VAT-free (0% VAT) in the UK under HMRC Notice 701/21 for qualifying bullion bars and coins.',
    cgtTaxRule: 'Coins produced by The Royal Mint qualifying as UK legal tender (Sovereigns and Britannias) are exempt from Capital Gains Tax (CGT) for UK residents.',
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
  const fx = UK_CONFIG.defaultUsdRate;
  const goldOzGBP = initialData.gold.spotUSD * fx;
  const silverOzGBP = initialData.silver.spotUSD * fx;
  const goldGramGBP = (goldOzGBP / 31.1034768).toFixed(2);
  const gold22kGramGBP = ((goldOzGBP / 31.1034768) * 0.9167).toFixed(2);
  const gold9kGramGBP = ((goldOzGBP / 31.1034768) * 0.375).toFixed(2);

  const formattedGold = goldOzGBP.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedSilver = silverOzGBP.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const description = `Live gold price today UK in British Pounds (£): £${formattedGold}/oz • 24ct £${goldGramGBP}/g • 22ct Sovereign £${gold22kGramGBP}/g • 9ct £${gold9kGramGBP}/g. Silver spot: £${formattedSilver}/oz. LBMA spot & CGT guide.`;

  return {
    title: `Gold Price Today UK - £${formattedGold}/oz | Silver Spot £${formattedSilver}/oz Live`,
    description,
    keywords: [
      'gold price today uk',
      'gold price uk live',
      'silver price today uk',
      'gold price per gram uk',
      '22ct gold price per gram uk',
      '9ct gold price per gram uk',
      'gold sovereign price today',
      'gold price per ounce gbp',
      'lbma gold price live uk',
      'britannia gold coin price',
      'vat free gold uk',
      'cgt free gold coins uk',
      'scrap gold price per gram uk',
      'silver spot price uk gbp',
      'gold silver ratio uk',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/international/uk-gold-silver/',
    },
    openGraph: {
      title: `Gold Price Today UK - £${formattedGold}/oz | Silver £${formattedSilver}/oz Live`,
      description: `Live UK spot prices: Gold £${formattedGold}/oz • Silver £${formattedSilver}/oz • 24ct/gram £${goldGramGBP} • 22ct Sovereign £${gold22kGramGBP}/g. Hallmarking & CGT tax rules.`,
      url: 'https://nepacalc.com/international/uk-gold-silver/',
      type: 'website',
      images: [{
        url: 'https://nepacalc.com/images/og/international-gold-silver.jpg',
        width: 1200,
        height: 630,
        alt: `Gold Price Today UK £${formattedGold} per troy ounce | Silver £${formattedSilver} - Live LBMA Spot Rates`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gold £${formattedGold}/oz | Silver £${formattedSilver}/oz - Live UK Spot Price`,
      description: `Today's live LBMA gold spot: £${formattedGold}/oz (£${goldGramGBP}/g 24ct, £${gold9kGramGBP}/g 9ct). Silver: £${formattedSilver}/oz. Real-time precious metals in GBP.`,
      images: ['https://nepacalc.com/images/og/international-gold-silver.jpg'],
    },
  };
}

export default function UkGoldSilverPage() {
  const initialData = getInitialRates();
  const fx = UK_CONFIG.defaultUsdRate;

  const goldOzGBP = initialData.gold.spotUSD * fx;
  const silverOzGBP = initialData.silver.spotUSD * fx;
  const goldGramGBP = goldOzGBP / 31.1034768;
  const silverGramGBP = silverOzGBP / 31.1034768;
  const goldRatio = silverOzGBP > 0 ? (goldOzGBP / silverOzGBP).toFixed(1) : '-';

  function fmtGBP(n: number) {
    return n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const faqItems = [
    {
      name: 'What is the gold price today in the UK?',
      acceptedAnswer: {
        text: `The live gold spot price in the UK today is approximately £${fmtGBP(goldOzGBP)} per troy ounce, which equals roughly £${fmtGBP(goldGramGBP)} per gram for pure 24ct gold. For 22ct gold (Sovereigns and traditional British jewellery), the price is approximately £${fmtGBP(goldGramGBP * 0.9167)} per gram.`,
      },
    },
    {
      name: 'What is the silver price today in the UK?',
      acceptedAnswer: {
        text: `The current silver spot price in the UK is approximately £${fmtGBP(silverOzGBP)} per troy ounce, or £${fmtGBP(silverGramGBP)} per gram for .999 fine investment silver.`,
      },
    },
    {
      name: 'Is gold exempt from VAT in the United Kingdom?',
      acceptedAnswer: {
        text: 'Yes. Investment gold is 100% exempt from VAT (0% VAT) in the UK under HMRC Notice 701/21. To qualify, gold bars must have a purity of at least 99.5% (995 fineness), and gold coins must be minted after 1800, have a purity of at least 90%, and be legal tender in their country of origin. Silver, platinum, and palladium bullion are subject to standard 20% UK VAT unless stored in bonded, VAT-exempt vaults.',
      },
    },
    {
      name: 'Why are British Sovereigns and Britannias free of Capital Gains Tax (CGT)?',
      acceptedAnswer: {
        text: 'Because Gold Sovereigns and Gold Britannias produced by The Royal Mint carry official face values in British Pounds Sterling (£1, £25, £100), they are classified as legal tender of the realm. Under the UK Taxation of Chargeable Gains Act 1992, UK currency is exempt from Capital Gains Tax. This means UK tax residents keep 100% of their investment profits tax-free, regardless of how much the gold price increases.',
      },
    },
    {
      name: 'How much is 9ct gold worth per gram in the UK today?',
      acceptedAnswer: {
        text: `9ct gold is 37.5% pure gold (hallmark 375). Based on today's pure gold spot price of £${fmtGBP(goldGramGBP)} per gram, the intrinsic melt value of 9ct gold is approximately £${fmtGBP(goldGramGBP * 0.375)} per gram. Scrap buyers and high-street jewellers typically pay 75% to 90% of this melt value.`,
      },
    },
    {
      name: 'What are the legal gold hallmarking standards in the UK?',
      acceptedAnswer: {
        text: 'Under the Hallmarking Act 1973, any gold item weighing over 1.0 gram sold in the UK must be hallmarked by one of the four statutory UK Assay Offices: London Goldsmiths Company, Birmingham Assay Office, Sheffield Assay Office, or Edinburgh Assay Office. Recognized gold standards are 9ct (375), 14ct (585), 18ct (750), 22ct (916), and 24ct (999).',
      },
    },
    {
      name: 'How much pure gold is in a British Sovereign coin?',
      acceptedAnswer: {
        text: 'A Full Sovereign has a gross weight of 7.988 grams and is struck in traditional 22-carat Crown Gold (91.67% gold and 8.33% copper). It contains exactly 7.3224 grams (0.2354 troy ounces) of pure gold. A Half Sovereign contains exactly half that amount: 3.6612 grams (0.1177 troy ounces) of pure gold.',
      },
    },
    {
      name: 'What is the gold-silver ratio in the UK today?',
      acceptedAnswer: {
        text: `The gold-silver ratio today is approximately ${goldRatio}:1. This means one troy ounce of gold is worth ${goldRatio} ounces of silver at live London spot prices.`,
      },
    },
    {
      name: 'What is the difference between LBMA fixings and live spot rates?',
      acceptedAnswer: {
        text: 'The LBMA (London Bullion Market Association) publishes two official daily auction benchmarks: the LBMA Gold Price AM (10:30 UTC) and PM (15:00 UTC). These fixings are used globally by mining firms, central banks, and institutional contracts. In contrast, the live spot price shown on this page updates continuously second-by-second based on active OTC interbank trading.',
      },
    },
    {
      name: 'Where can I buy physical gold in the UK?',
      acceptedAnswer: {
        text: 'Physical investment gold can be purchased directly from The Royal Mint or reputable UK bullion dealers like BullionVault, Chards, Atkinsons Bullion, and Hatton Garden bullion dealers. For maximum tax efficiency, UK investors typically choose Sovereigns or Britannias.',
      },
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/uk-gold-silver/#webpage',
        url: 'https://nepacalc.com/international/uk-gold-silver/',
        name: `Gold Price Today UK - £${fmtGBP(goldOzGBP)}/oz | Silver Price Today UK Live`,
        description: `Live gold price today in the UK in GBP (£): 24ct, 22ct Sovereign, 18ct, and 9ct per gram and ounce. LBMA spot rates, 0% VAT rules, and CGT exemption guide.`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          url: 'https://nepacalc.com/',
          name: 'NepaCalc',
        },
        inLanguage: 'en-GB',
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
            name: 'UK Gold & Silver Price',
            item: 'https://nepacalc.com/international/uk-gold-silver/',
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
        '@id': 'https://nepacalc.com/international/uk-gold-silver/#dataset',
        url: 'https://nepacalc.com/international/uk-gold-silver/',
        isAccessibleForFree: true,
        inLanguage: 'en-GB',
        creator: {
          '@type': 'Organization',
          name: 'NepaCalc',
          url: 'https://nepacalc.com/',
        },
        publisher: {
          '@type': 'Organization',
          name: 'NepaCalc',
          url: 'https://nepacalc.com/',
        },
        name: 'UK Gold and Silver Spot Prices (GBP)',
        description: 'Real-time and 30-day historical wholesale precious metal spot prices in British Pounds Sterling (£) linked to the London Bullion Market Association (LBMA).',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        variableMeasured: [
          'Gold spot price per troy ounce GBP',
          'Silver spot price per troy ounce GBP',
          'Gold price per gram 24ct GBP',
          'Gold price per gram 22ct Sovereign GBP',
          'Gold price per gram 9ct GBP',
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
            <span className="text-gray-900 font-semibold">UK Gold &amp; Silver</span>
          </nav>
        </div>

        {/* Live Client Hero & Calculator */}
        <CountryGoldClient config={UK_CONFIG} initialData={initialData} />

        {/* Deep SEO & Educational Content */}
        <article className="max-w-6xl mx-auto px-4 mt-6 text-gray-800 space-y-10">
          
          {/* Section 1: UK Precious Metals Market & Hallmarking */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Understanding Gold &amp; Silver Prices in the United Kingdom
            </h2>
            <div className="space-y-3.5 text-sm leading-relaxed text-gray-700">
              <p>
                London is the historic capital of global physical gold trading. The wholesale market is centered around the London Bullion Market Association (LBMA), which oversees the world&apos;s leading vaulting facilities and publishes the twice-daily LBMA Gold Price auction. When purchasing gold in the UK, retail prices are derived directly from this live spot rate, quoted in British Pounds Sterling (£ per troy ounce or per gram).
              </p>
              <p>
                Under the UK Hallmarking Act 1973, any precious metal jewellery item weighing more than 1 gram of gold or 7.78 grams of silver must bear a legally recognized hallmark stamped by one of the four statutory UK Assay Offices:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><strong>The Goldsmiths&apos; Company Assay Office (London):</strong> Marked by a leopard&apos;s head, hallmarking precious metals since 1300.</li>
                <li><strong>Birmingham Assay Office:</strong> Marked by an anchor, testing and certifying British jewellery in the historic Jewellery Quarter.</li>
                <li><strong>Sheffield Assay Office:</strong> Marked by a Yorkshire rose, renowned for certifying cutlery, silver, and precious metals.</li>
                <li><strong>Edinburgh Assay Office:</strong> Marked by a three-towered castle, serving Scotland since 1457.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: British Tax Advantages: 0% VAT & CGT Exemption */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              UK Tax Guide: Why Gold Sovereigns and Britannias are 100% CGT-Free
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                Investing in physical precious metals in the United Kingdom offers unique legal tax advantages that distinguish British bullion from almost any other asset class:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-amber-900 mb-1.5">1. Zero Percent VAT (0% VAT)</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Under HMRC Notice 701/21, all qualifying investment gold is exempt from UK Value Added Tax. This applies to bars with a purity of at least 99.5% and gold coins minted after 1800 with a purity of at least 90%. Silver, platinum, and palladium bullion are subject to standard 20% VAT unless kept in professional bonded vault custody.
                  </p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-emerald-900 mb-1.5">2. Capital Gains Tax Exemption (CGT-Free)</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Under the Taxation of Chargeable Gains Act 1992, legal tender coins produced by The Royal Mint (including Gold Sovereigns, Half Sovereigns, and Gold Britannias) are exempt from Capital Gains Tax. UK tax residents can liquidate substantial gold profits without paying any CGT to HMRC, regardless of the individual&apos;s annual CGT allowance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Frequently Asked Questions */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions (UK Gold &amp; Silver)
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
                  href="https://www.royalmint.com/invest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  The Royal Mint <span className="text-gray-400">(royalmint.com)</span>
                </a>
                <a
                  href="https://www.lbma.org.uk/prices-and-data/precious-metal-prices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  LBMA Spot Benchmarks <span className="text-gray-400">(lbma.org.uk)</span>
                </a>
                <a
                  href="https://www.gov.uk/guidance/vat-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  HMRC Notice 701/21 (VAT) <span className="text-gray-400">(gov.uk)</span>
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
                  href="/international/canada-gold-silver/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Canada (CAD)
                </Link>
                <Link
                  href="/international/australia-gold-silver/"
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-700 rounded transition"
                >
                  Australia (AUD)
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
