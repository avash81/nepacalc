// Route: /international/canada-gold-silver/
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import CountryGoldClient, { CountryGoldConfig, InternationalRatesData } from '@/components/international/CountryGoldClient';

const CANADA_CONFIG: CountryGoldConfig = {
  code: 'ca',
  countryName: 'Canada',
  shortName: 'Canada',
  currencyCode: 'CAD',
  currencySymbol: 'C$',
  defaultUsdRate: 1.4291,
  marketBadge: 'TSX & Montreal Spot Benchmark',
  goldCardTitle: 'Gold (24K / .9999 Fine)',
  silverCardTitle: 'Silver (.9999 Fine)',
  subtitle: 'Per troy ounce, gram and Maple Leaf • Real-time Canadian Dollar spot',
  units: [
    { id: 'oz', label: 'Per Troy Ounce', shortLabel: 'Ounce', ozFactor: 1 },
    { id: 'g', label: 'Per Gram', shortLabel: 'Gram', ozFactor: 1 / 31.1034768 },
    { id: '10g', label: 'Per 10 Grams', shortLabel: '10 g', ozFactor: 10 / 31.1034768 },
    { id: 'maple', label: '1 oz Gold Maple Leaf', shortLabel: 'Maple Leaf', ozFactor: 1.0 },
    { id: 'kg', label: 'Per Kilogram', shortLabel: 'Kilo', ozFactor: 1000 / 31.1034768 },
    { id: 'tola', label: 'Per Tola', shortLabel: 'Tola', ozFactor: 11.6638 / 31.1034768 },
  ],
  purities: [
    { id: '24k', name: '24K (.9999)', purity: 0.9999, desc: '99.99% Pure Royal Canadian Mint Bullion' },
    { id: '22k', name: '22K (916)', purity: 0.9167, desc: '91.7% Traditional Crown Bullion' },
    { id: '18k', name: '18K (750)', purity: 0.750, desc: '75.0% Canadian Fine Jewellery' },
    { id: '14k', name: '14K (585)', purity: 0.5833, desc: '58.3% Popular Jewellery Standard' },
    { id: '10k', name: '10K (417)', purity: 0.4167, desc: '41.7% Canadian Legal Minimum Standard' },
  ],
  popularItems: [
    {
      name: '1 oz Gold Maple Leaf Coin (Royal Canadian Mint)',
      metal: 'gold',
      weight: '31.1035 g',
      purity: '24K (.9999)',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: 'Zero-rated (0% GST/HST) across Canada',
    },
    {
      name: '1/2 oz Gold Maple Leaf Coin',
      metal: 'gold',
      weight: '15.5518 g',
      purity: '24K (.9999)',
      ozFactor: 0.5,
      purityFactor: 1.0,
      taxNote: 'Zero-rated (0% GST/HST)',
    },
    {
      name: '1 oz Royal Canadian Mint (RCM) Gold Bar',
      metal: 'gold',
      weight: '31.1035 g',
      purity: '24K (.9999)',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: 'Zero-rated (0% GST/HST) investment bullion',
    },
    {
      name: '1 oz Silver Maple Leaf Coin (.9999 Fine)',
      metal: 'silver',
      weight: '31.1035 g',
      purity: '.9999 Fine',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: 'Zero-rated (0% GST/HST) investment silver',
    },
    {
      name: '10 oz RCM Silver Bar',
      metal: 'silver',
      weight: '311.035 g',
      purity: '.9999 Fine',
      ozFactor: 10.0,
      purityFactor: 1.0,
      taxNote: 'Zero-rated (0% GST/HST) investment silver',
    },
  ],
  regulatoryNotes: {
    authority: 'Royal Canadian Mint (RCM / Monnaie royale canadienne) & Competition Bureau Canada under the Precious Metals Marking Act.',
    vatGstRule: 'Investment precious metals (bars or coins of at least 99.5% gold or 99.9% silver) are zero-rated (0% GST/HST/PST) by the Canada Revenue Agency (CRA).',
    cgtTaxRule: 'Profits on bullion sales are taxable as capital gains by the CRA based on your Adjusted Cost Base (ACB).',
  },
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
  const fx = CANADA_CONFIG.defaultUsdRate;
  const goldOzCAD = initialData.gold.spotUSD * fx;
  const silverOzCAD = initialData.silver.spotUSD * fx;
  const goldGramCAD = (goldOzCAD / 31.1034768).toFixed(2);
  const gold14kGramCAD = ((goldOzCAD / 31.1034768) * 0.5833).toFixed(2);
  const gold10kGramCAD = ((goldOzCAD / 31.1034768) * 0.4167).toFixed(2);

  const formattedGold = goldOzCAD.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedSilver = silverOzCAD.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const description = `Live gold price today Canada in Canadian Dollars (C$): C$${formattedGold}/oz • 24K C$${goldGramCAD}/g • 14K C$${gold14kGramCAD}/g • 10K C$${gold10kGramCAD}/g. Silver spot: C$${formattedSilver}/oz. RCM spot & GST rules.`;

  return {
    title: `Gold Price Today Canada - C$${formattedGold}/oz | Silver Spot C$${formattedSilver}/oz Live`,
    description,
    keywords: [
      'gold price today canada',
      'gold price canada live',
      'silver price today canada',
      'gold price per gram canada',
      'gold maple leaf price today',
      '24k gold price canada',
      '14k gold price per gram canada',
      '10k gold price canada',
      'gold price per ounce cad',
      'rcm gold price live',
      'silver maple leaf price cad',
      'gst on gold bullion canada',
      'scrap gold price canada',
      'gold silver ratio canada',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/international/canada-gold-silver/',
    },
    openGraph: {
      title: `Gold Price Today Canada - C$${formattedGold}/oz | Silver C$${formattedSilver}/oz Live`,
      description: `Live Canadian spot prices: Gold C$${formattedGold}/oz • Silver C$${formattedSilver}/oz • 24K/gram C$${goldGramCAD} • 14K/gram C$${gold14kGramCAD}. RCM Maple Leaf & GST/HST rules.`,
      url: 'https://nepacalc.com/international/canada-gold-silver/',
      type: 'website',
      images: [{
        url: 'https://nepacalc.com/images/og/international-gold-silver.jpg',
        width: 1200,
        height: 630,
        alt: `Gold Price Today Canada C$${formattedGold} per troy ounce | Silver C$${formattedSilver} - Live Spot Rates`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gold C$${formattedGold}/oz | Silver C$${formattedSilver}/oz - Live Canada Spot Price`,
      description: `Today's live Canadian gold spot: C$${formattedGold}/oz (C$${goldGramCAD}/g 24K, C$${gold10kGramCAD}/g 10K). Silver: C$${formattedSilver}/oz. Real-time precious metals in CAD.`,
      images: ['https://nepacalc.com/images/og/international-gold-silver.jpg'],
    },
  };
}

export default function CanadaGoldSilverPage() {
  const initialData = getInitialRates();
  const fx = CANADA_CONFIG.defaultUsdRate;

  const goldOzCAD = initialData.gold.spotUSD * fx;
  const silverOzCAD = initialData.silver.spotUSD * fx;
  const goldGramCAD = goldOzCAD / 31.1034768;
  const silverGramCAD = silverOzCAD / 31.1034768;
  const goldRatio = silverOzCAD > 0 ? (goldOzCAD / silverOzCAD).toFixed(1) : '-';

  function fmtCAD(n: number) {
    return n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const faqItems = [
    {
      name: 'What is the gold price today in Canada?',
      acceptedAnswer: {
        text: `The live gold spot price in Canada today is approximately C$${fmtCAD(goldOzCAD)} per troy ounce (31.1035 grams), which equals roughly C$${fmtCAD(goldGramCAD)} per gram for pure 24K (.9999) gold. For 14K jewelry, the price is approximately C$${fmtCAD(goldGramCAD * 0.5833)} per gram.`,
      },
    },
    {
      name: 'What is the silver price today in Canada?',
      acceptedAnswer: {
        text: `The current silver spot price in Canada is approximately C$${fmtCAD(silverOzCAD)} per troy ounce, or C$${fmtCAD(silverGramCAD)} per gram for .9999 fine investment silver.`,
      },
    },
    {
      name: 'Is there GST or HST on gold and silver bullion in Canada?',
      acceptedAnswer: {
        text: 'No. The Canada Revenue Agency (CRA) classifies precious metals as zero-rated financial instruments (0% GST, HST, and PST) provided the bullion meets statutory purity thresholds: at least 99.5% pure for gold and at least 99.9% pure for silver, in the form of bars, ingots, or legal coins. Finished jewellery (such as 10K, 14K, or 18K items) is not investment bullion and is subject to standard GST/HST/PST.',
      },
    },
    {
      name: 'Why is the Canadian Gold Maple Leaf celebrated worldwide?',
      acceptedAnswer: {
        text: 'The Royal Canadian Mint introduced the Gold Maple Leaf in 1979 as the world&apos;s first 24K (.999 pure) bullion coin. In 1982, the Mint achieved .9999 fine purity (Four Nines), and occasionally produces special .99999 (Five Nines) editions. Maple Leaf coins feature state-of-the-art security, including laser-micro-engraved textured maple leaves and radial light-diffracting background lines.',
      },
    },
    {
      name: 'What is the legal minimum gold karat in Canada?',
      acceptedAnswer: {
        text: 'Under the Canadian Precious Metals Marking Act and Competition Bureau regulations, 10 Karat (41.7% gold / 417 fineness) is the legal minimum standard for an item to be described or hallmarked as genuine gold in Canada.',
      },
    },
    {
      name: 'How are capital gains taxed on bullion in Canada?',
      acceptedAnswer: {
        text: 'When you sell physical gold or silver in Canada for a profit, the gain is taxable as a capital gain by the CRA. You must calculate your gain based on your Adjusted Cost Base (ACB). Bullion is treated as personal-use property or capital investment, and capital losses may be offset against capital gains.',
      },
    },
    {
      name: 'Can I hold physical gold in a Canadian TFSA or RRSP?',
      acceptedAnswer: {
        text: 'Yes. The CRA permits certain physical investment-grade precious metals to be held inside Tax-Free Savings Accounts (TFSAs) and Registered Retirement Savings Plans (RRSPs). To qualify, the bullion must be produced by an LBMA-approved refiner or the Royal Canadian Mint, meet purity standards (99.5% gold, 99.9% silver), and be stored with an authorized Canadian qualified custodian.',
      },
    },
    {
      name: 'What is the gold-silver ratio in Canada today?',
      acceptedAnswer: {
        text: `The gold-silver ratio today is approximately ${goldRatio}:1. This means one troy ounce of gold buys ${goldRatio} ounces of silver at live Canadian market spot prices.`,
      },
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/canada-gold-silver/#webpage',
        url: 'https://nepacalc.com/international/canada-gold-silver/',
        name: `Gold Price Today Canada - C$${fmtCAD(goldOzCAD)}/oz | Silver Price Today Canada Live`,
        description: `Live gold price today in Canada in CAD (C$): 24K, 22K, 18K, 14K, and 10K per gram and ounce. RCM spot rates, 0% GST/HST rules, and TFSA bullion guide.`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          url: 'https://nepacalc.com/',
          name: 'NepaCalc',
        },
        inLanguage: 'en-CA',
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
            name: 'Canada Gold & Silver Price',
            item: 'https://nepacalc.com/international/canada-gold-silver/',
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
        name: 'Canada Gold and Silver Spot Prices (CAD)',
        description: 'Real-time and 30-day historical wholesale precious metal spot prices in Canadian Dollars (C$) tracked against Royal Canadian Mint benchmarks.',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        variableMeasured: [
          'Gold spot price per troy ounce CAD',
          'Silver spot price per troy ounce CAD',
          'Gold price per gram 24K CAD',
          'Gold price per gram 14K CAD',
          'Gold price per gram 10K CAD',
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
            <span className="text-gray-900 font-semibold">Canada Gold &amp; Silver</span>
          </nav>
        </div>

        {/* Live Client Hero & Calculator */}
        <CountryGoldClient config={CANADA_CONFIG} initialData={initialData} />

        {/* Deep Educational & Regulatory Content */}
        <article className="max-w-6xl mx-auto px-4 mt-6 text-gray-800 space-y-10">
          
          {/* Section 1: Canadian Precious Metals Industry & Royal Canadian Mint */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Canada&apos;s Precious Metals Heritage &amp; The Royal Canadian Mint
            </h2>
            <div className="space-y-3.5 text-sm leading-relaxed text-gray-700">
              <p>
                Canada is among the world&apos;s top gold and silver producing nations, anchored by the internationally acclaimed Royal Canadian Mint (RCM / Monnaie royale canadienne). Operating state-of-the-art facilities in Ottawa, Ontario and Winnipeg, Manitoba, the RCM is renowned for refining the world&apos;s purest investment gold (.9999 and .99999 fine).
              </p>
              <p>
                Under the Canadian Precious Metals Marking Act administered by the Competition Bureau, any precious metal piece sold in Canada with a quality mark must strictly adhere to statutory tolerances. The legal minimum purity for gold jewellery in Canada is 10 Karat (41.7% pure gold), with 14K, 18K, and 19K (popular for white gold in Quebec and Ontario) widely traded.
              </p>
            </div>
          </section>

          {/* Section 2: Canadian Tax Rules: CRA GST/HST Exemption */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Canadian Tax Guide: Zero-Rated GST/HST on Investment Bullion
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                Investing in physical gold and silver bullion in Canada benefits from clear federal tax guidelines under the Excise Tax Act:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-amber-900 mb-1.5">Zero-Rated GST / HST (0% Tax)</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Under CRA guidelines, investment precious metals are classified as zero-rated financial supplies. Bullion bars and coins that are at least 99.5% pure for gold and 99.9% pure for silver are completely exempt from GST, HST, and provincial sales taxes across all provinces.
                  </p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-emerald-900 mb-1.5">Registered Accounts (TFSA &amp; RRSP)</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Canadians can legally hold physical gold and silver bullion inside self-directed Tax-Free Savings Accounts (TFSAs) and Registered Retirement Savings Plans (RRSPs). In an RRSP, growth is tax-deferred; in a TFSA, capital gains from rising gold prices are completely tax-free upon withdrawal.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Frequently Asked Questions */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions (Canada Gold &amp; Silver)
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


          {/* Section: Official Resources & Regulatory Links */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Official Resources &amp; Regulatory Authorities
            </h2>
            <div className="space-y-3">
              <a
                href="https://www.mint.ca/en/products/gold"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-red-700 text-white rounded-lg flex items-center justify-center text-xs font-bold">RC</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Royal Canadian Mint - Gold Bullion</div>
                  <div className="text-xs text-gray-500 mt-0.5">Official Crown Corporation; producer of the Gold Maple Leaf (.9999 fine gold, 24K), Canada's premier investment bullion coin since 1979.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">mint.ca</div>
                </div>
              </a>
              <a
                href="https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/list-taxable-supplies/precious-metals.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-red-700 text-white rounded-lg flex items-center justify-center text-xs font-bold">CR</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Canada Revenue Agency - GST/HST on Precious Metals</div>
                  <div className="text-xs text-gray-500 mt-0.5">Official CRA guidance confirming gold, silver, and platinum bullion meeting purity standards are zero-rated supplies under the Excise Tax Act.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">canada.ca</div>
                </div>
              </a>
              <a
                href="https://www.bankofcanada.ca/rates/exchange/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-red-700 text-white rounded-lg flex items-center justify-center text-xs font-bold">BC</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Bank of Canada - Official Exchange Rates</div>
                  <div className="text-xs text-gray-500 mt-0.5">Official CAD/USD and global foreign exchange rates published daily by the Bank of Canada. Used as the reference rate for financial reporting.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">bankofcanada.ca</div>
                </div>
              </a>
            </div>
          </section>


          {/* Section: Related Internal Tools */}
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Related Tools & Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/international/gold-silver-ratio/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">GSR</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 leading-tight">Gold-Silver Ratio Live</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Live gold-to-silver ratio updated from COMEX spot prices. Essential reading for Canadian investors comparing Gold Maple Leaf vs Silver Maple Leaf returns.</div>
                </div>
              </Link>
              <Link
                href="/international/gold-silver-price/history/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">HIS</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 leading-tight">Global Spot Price Archive</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Full historical archive of international gold and silver spot prices. Compare current CAD gold prices against multi-year USD spot benchmarks.</div>
                </div>
              </Link>
              <Link
                href="/international/bitcoin/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:bg-violet-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">BTC</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-violet-700 leading-tight">Bitcoin Price (USD)</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Track live Bitcoin prices alongside gold. Many Canadian TFSA investors hold both BTC and gold bullion for portfolio diversification.</div>
                </div>
              </Link>
              <Link
                href="/calculator/currency-converter/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">FX</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-amber-700 leading-tight">Currency Converter (CAD/USD)</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Convert Canadian Dollar to USD and 160+ currencies with live rates. Useful when calculating CAD gold value from USD COMEX spot prices.</div>
                </div>
              </Link>
            </div>
          </section>

          {/* Section 4: Related International Portals */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Explore Global Precious Metal Rates
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs font-semibold">
              <Link href="/international/gold-silver-price/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                USA Gold &amp; Silver (USD)
              </Link>
              <Link href="/international/uk-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                UK Gold &amp; Silver (GBP)
              </Link>
              <Link href="/international/australia-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Australia Gold &amp; Silver (AUD)
              </Link>
              <Link href="/international/germany-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Germany Gold &amp; Silver (EUR)
              </Link>
              <Link href="/international/france-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                France Gold &amp; Silver (EUR)
              </Link>
              <Link href="/international/netherlands-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Netherlands Gold &amp; Silver (EUR)
              </Link>
              <Link href="/international/gold-silver-price/history/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Historical Spot Archive
              </Link>
              <Link href="/international/copper/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Copper Spot Rates
              </Link>
            </div>
          </section>

        </article>
      </div>
    </>
  );
}
