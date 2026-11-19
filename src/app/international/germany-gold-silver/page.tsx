// Route: /international/germany-gold-silver/
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import CountryGoldClient, { CountryGoldConfig, InternationalRatesData } from '@/components/international/CountryGoldClient';

const GERMANY_CONFIG: CountryGoldConfig = {
  code: 'de',
  countryName: 'Germany',
  shortName: 'Germany',
  currencyCode: 'EUR',
  currencySymbol: '€',
  defaultUsdRate: 0.9087,
  marketBadge: 'Frankfurt Boerse & Heraeus Spot',
  goldCardTitle: 'Gold (Feingold 999.9)',
  silverCardTitle: 'Silver (Feinsilber .999)',
  subtitle: 'Per Unze, Gramm and 100g Barren • Real-time Euro spot rates',
  units: [
    { id: 'oz', label: 'Pro Feinunze (oz)', shortLabel: 'Unze', ozFactor: 1 },
    { id: 'g', label: 'Pro Gramm (g)', shortLabel: 'Gramm', ozFactor: 1 / 31.1034768 },
    { id: '10g', label: 'Pro 10 Gramm', shortLabel: '10 g', ozFactor: 10 / 31.1034768 },
    { id: '100g', label: '100g Goldbarren', shortLabel: '100 g', ozFactor: 100 / 31.1034768 },
    { id: 'kg', label: 'Pro Kilogramm', shortLabel: 'Kilo', ozFactor: 1000 / 31.1034768 },
    { id: 'tola', label: 'Pro Tola', shortLabel: 'Tola', ozFactor: 11.6638 / 31.1034768 },
  ],
  purities: [
    { id: '24k', name: '24 Karat (999.9)', purity: 0.9999, desc: 'Feingold · Anlagegold & Barren' },
    { id: '21k', name: '21.6 Karat (900)', purity: 0.900, desc: 'Historische Dukaten & Goldmünzen' },
    { id: '18k', name: '18 Karat (750)', purity: 0.750, desc: '75.0% Feingehalt Echtschmuck' },
    { id: '14k', name: '14 Karat (585)', purity: 0.5833, desc: '58.5% Deutscher Standardschmuck' },
    { id: '8k', name: '8 Karat (333)', purity: 0.3333, desc: '33.3% Traditioneller Einstiegsschmuck' },
  ],
  popularItems: [
    {
      name: '100g Goldbarren (Heraeus / Degussa / C.Hafner)',
      metal: 'gold',
      weight: '100.0 g',
      purity: '24 Karat (999.9)',
      ozFactor: 100 / 31.1034768,
      purityFactor: 1.0,
      taxNote: '0% MwSt (Anlagegold § 25c UStG)',
    },
    {
      name: '1 oz Krügerrand Goldmünze (916.7 Feingold)',
      metal: 'gold',
      weight: '33.93 g',
      purity: '22 Karat (916.7)',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: '0% MwSt & steuerfrei nach 1 Jahr (§ 23 EStG)',
    },
    {
      name: '1 oz Wiener Philharmoniker Goldmünze (999.9)',
      metal: 'gold',
      weight: '31.1035 g',
      purity: '24 Karat (999.9)',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: '0% MwSt & steuerfrei nach 1 Jahr',
    },
    {
      name: '1 kg Feinsilber Barren (Heraeus LBMA)',
      metal: 'silver',
      weight: '1000.0 g',
      purity: '.999 Feinsilber',
      ozFactor: 1000 / 31.1034768,
      purityFactor: 1.0,
      taxNote: '19% Regelbesteuerung MwSt',
    },
    {
      name: '1 oz Wiener Philharmoniker Silbermünze',
      metal: 'silver',
      weight: '31.1035 g',
      purity: '.999 Feinsilber',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: '19% Regelbesteuerung MwSt',
    },
  ],
  regulatoryNotes: {
    authority: 'Deutsche Bundesbank & leading German LBMA refiners (Heraeus, Umicore, Degussa, C.Hafner) under the FeinGehG.',
    vatGstRule: 'Investment gold (Anlagegold) is 100% exempt from German Value Added Tax (0% Mehrwertsteuer) under § 25c UStG.',
    cgtTaxRule: 'Private sales of physical gold and silver held for at least 1 year (12-month Spekulationsfrist) are completely tax-free under § 23 EStG.',
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
  const fx = GERMANY_CONFIG.defaultUsdRate;
  const goldOzEUR = initialData.gold.spotUSD * fx;
  const silverOzEUR = initialData.silver.spotUSD * fx;
  const goldGramEUR = (goldOzEUR / 31.1034768).toFixed(2);
  const gold14kGramEUR = ((goldOzEUR / 31.1034768) * 0.5833).toFixed(2);
  const gold8kGramEUR = ((goldOzEUR / 31.1034768) * 0.3333).toFixed(2);

  const formattedGold = goldOzEUR.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedSilver = silverOzEUR.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const description = `Live gold price today Germany in Euros (€): €${formattedGold}/oz • 24K €${goldGramEUR}/g • 14K (585) €${gold14kGramEUR}/g • 8K (333) €${gold8kGramEUR}/g. Silver spot: €${formattedSilver}/oz. § 25c UStG 0% MwSt & § 23 EStG guide.`;

  return {
    title: `Gold Price Today Germany - €${formattedGold}/oz | Silver Spot €${formattedSilver}/oz Live`,
    description,
    keywords: [
      'gold price today germany',
      'goldpreis heute deutschland',
      'goldpreis aktuell euro',
      'silver price today germany',
      'goldpreis pro gramm euro',
      '585 gold preis pro gramm heute',
      '333 gold preis pro gramm',
      'goldbarren preise heute',
      'heraeus goldpreis live',
      'anlagegold mwst befreiung',
      'silberpreis aktuell euro',
      'gold silver ratio germany',
      'krügerrand preis heute',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/international/germany-gold-silver/',
    },
    openGraph: {
      title: `Gold Price Today Germany - €${formattedGold}/oz | Silver €${formattedSilver}/oz Live`,
      description: `Live German spot prices: Gold €${formattedGold}/oz • Silver €${formattedSilver}/oz • 24K/gram €${goldGramEUR} • 14K (585) €${gold14kGramEUR}/g. Tax exemptions under § 25c UStG and § 23 EStG.`,
      url: 'https://nepacalc.com/international/germany-gold-silver/',
      type: 'website',
      images: [{
        url: 'https://nepacalc.com/images/og/international-gold-silver.jpg',
        width: 1200,
        height: 630,
        alt: `Gold Price Today Germany €${formattedGold} per troy ounce | Silver €${formattedSilver} - Live Spot Rates`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gold €${formattedGold}/oz | Silver €${formattedSilver}/oz - Live Germany Spot Price`,
      description: `Today's live German gold spot: €${formattedGold}/oz (€${goldGramEUR}/g 24K, €${gold14kGramEUR}/g 14K). Silver: €${formattedSilver}/oz. Real-time precious metals in EUR.`,
      images: ['https://nepacalc.com/images/og/international-gold-silver.jpg'],
    },
  };
}

export default function GermanyGoldSilverPage() {
  const initialData = getInitialRates();
  const fx = GERMANY_CONFIG.defaultUsdRate;

  const goldOzEUR = initialData.gold.spotUSD * fx;
  const silverOzEUR = initialData.silver.spotUSD * fx;
  const goldGramEUR = goldOzEUR / 31.1034768;
  const silverGramEUR = silverOzEUR / 31.1034768;
  const goldRatio = silverOzEUR > 0 ? (goldOzEUR / silverOzEUR).toFixed(1) : '-';

  function fmtEUR(n: number) {
    return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const faqItems = [
    {
      name: 'What is the gold price today in Germany?',
      acceptedAnswer: {
        text: `The live gold spot price in Germany today is approximately €${fmtEUR(goldOzEUR)} per troy ounce (Feinunze / 31.1035 Gramm), which equals roughly €${fmtEUR(goldGramEUR)} per gram for pure 24 Karat Feingold (999.9). For standard German 14 Karat (585) jewellery gold, the price is approximately €${fmtEUR(goldGramEUR * 0.5833)} per gram, and for traditional 8 Karat (333) gold, it is roughly €${fmtEUR(goldGramEUR * 0.3333)} per gram.`,
      },
    },
    {
      name: 'What is the silver price today in Germany?',
      acceptedAnswer: {
        text: `The current silver spot price in Germany is approximately €${fmtEUR(silverOzEUR)} per troy ounce, or €${fmtEUR(silverGramEUR)} per gram for .999 Feinsilber.`,
      },
    },
    {
      name: 'Is gold bullion exempt from VAT (Mehrwertsteuer) in Germany?',
      acceptedAnswer: {
        text: 'Yes. Under § 25c of the German Value Added Tax Act (Umsatzsteuergesetz - UStG), investment gold (Anlagegold) is 100% exempt from Mehrwertsteuer (0% MwSt). To qualify, gold bars must have a purity of at least 99.5% (995 fineness), and gold coins must have a purity of at least 90%, be minted after 1800, and not exceed an 80% premium over their open-market gold value.',
      },
    },
    {
      name: 'Why are profits on gold sales in Germany 100% tax-free after 1 year?',
      acceptedAnswer: {
        text: 'Under § 23 Section 1 No. 2 of the German Income Tax Act (Einkommensteuergesetz - EStG), physical gold and silver are classified as private assets rather than financial investments. If you hold physical bullion for longer than 12 months (the statutory Spekulationsfrist), 100% of the capital gains upon sale are completely tax-free, with no ceiling. If sold within 12 months, profits up to €1,000 per calendar year remain tax-free under the statutory Freigrenze.',
      },
    },
    {
      name: 'What is 333 gold and why is it common in Germany?',
      acceptedAnswer: {
        text: 'Under the German Hallmarking Act (Feingehaltsgesetz - FeinGehG), 8 Karat gold (333 fineness / 33.3% pure gold) was historically standardized as entry-level genuine gold jewellery. While some European countries consider 375 (9ct) or 585 (14ct) the legal minimum, 333 gold remains a traditional, affordable option in German retail jewelers.',
      },
    },
    {
      name: 'How is silver bullion taxed in Germany?',
      acceptedAnswer: {
        text: 'Physical silver bars and coins sold in Germany are subject to the standard 19% Mehrwertsteuer (MwSt). The former preferential margin scheme (Differenzbesteuerung) for imported silver coins was largely eliminated by the Federal Ministry of Finance in 2023.',
      },
    },
    {
      name: 'What are Germany&apos;s leading gold refiners?',
      acceptedAnswer: {
        text: 'Germany hosts some of the world&apos;s most prestigious LBMA-accredited precious metal refineries, including Heraeus (Hanau), C.Hafner (Wimsheim), Umicore (Hanau), and historical brands like Degussa and Heimerle + Meule.',
      },
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/germany-gold-silver/#webpage',
        url: 'https://nepacalc.com/international/germany-gold-silver/',
        name: `Gold Price Today Germany - €${fmtEUR(goldOzEUR)}/oz | Silver Price Today Germany Live`,
        description: `Live gold price today in Germany in EUR (€): 24K Feingold, 18K, 14K (585), and 8K (333) per gram and ounce. § 25c UStG 0% MwSt and § 23 EStG tax-free guide.`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          url: 'https://nepacalc.com/',
          name: 'NepaCalc',
        },
        inLanguage: 'de-DE',
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
            name: 'Germany Gold & Silver Price',
            item: 'https://nepacalc.com/international/germany-gold-silver/',
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
        name: 'Germany Gold and Silver Spot Prices (EUR)',
        description: 'Real-time and 30-day historical wholesale precious metal spot prices in Euros (€) based on Frankfurt Boerse and Heraeus benchmarks.',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        variableMeasured: [
          'Gold spot price per troy ounce EUR',
          'Silver spot price per troy ounce EUR',
          'Gold price per gram 24K Feingold EUR',
          'Gold price per gram 14K 585 EUR',
          'Gold price per gram 8K 333 EUR',
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
            <span className="text-gray-900 font-semibold">Germany Gold &amp; Silver</span>
          </nav>
        </div>

        {/* Live Client Hero & Calculator */}
        <CountryGoldClient config={GERMANY_CONFIG} initialData={initialData} />

        {/* Deep Educational & Regulatory Content */}
        <article className="max-w-6xl mx-auto px-4 mt-6 text-gray-800 space-y-10">
          
          {/* Section 1: German Bullion Market & Refining Standards */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Germany&apos;s Precious Metals Market &amp; Hallmarking (FeinGehG)
            </h2>
            <div className="space-y-3.5 text-sm leading-relaxed text-gray-700">
              <p>
                Germany boasts one of Europe&apos;s highest private per-capita gold holdings. Driven by historic stability preferences, German investors rely on high-purity gold bars (Goldbarren) produced by world-renowned domestic LBMA refiners including Heraeus, C.Hafner, Umicore, and Degussa.
              </p>
              <p>
                In Germany, precious metal standards are regulated under the German Hallmarking Act (Gesetz über den Feingehalt der Gold- und Silberwaren - FeinGehG). Recognized standards for jewellery include 585 (14 Karat) and 750 (18 Karat), alongside traditional 333 (8 Karat).
              </p>
            </div>
          </section>

          {/* Section 2: German Tax Rules: § 25c UStG (0% MwSt) & § 23 EStG (Tax-Free After 1 Year) */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              German Tax Guide: 0% MwSt &amp; Tax-Free Gains After 12 Months
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                German tax legislation provides two powerful tax advantages for physical precious metal investors:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-amber-900 mb-1.5">0% Mehrwertsteuer (§ 25c UStG)</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Under § 25c of the German VAT Act (UStG), all qualifying investment gold (bars with at least 99.5% purity and approved gold coins) is completely exempt from 19% German VAT.
                  </p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-emerald-900 mb-1.5">100% Tax-Free After 1 Year (§ 23 EStG)</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Under § 23 Section 1 No. 2 EStG, private sales of physical gold and silver held for at least one year (Spekulationsfrist) are entirely exempt from German income tax and capital gains tax, without any limit on profit amount.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Frequently Asked Questions */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions (Germany Gold &amp; Silver)
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
              Offizielle Ressourcen &amp; Regulierungsbehoerden
            </h2>
            <div className="space-y-3">
              <a
                href="https://www.bundesbank.de/en/bundesbank/banknotes-and-coins/gold"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-gray-800 text-white rounded-lg flex items-center justify-center text-xs font-bold">BB</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Deutsche Bundesbank - Gold</div>
                  <div className="text-xs text-gray-500 mt-0.5">Germany's central bank; holds one of the world's largest gold reserves (3,352 tonnes). Official publications on gold storage and monetary policy.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">bundesbank.de</div>
                </div>
              </a>
              <a
                href="https://www.bzst.de/DE/Unternehmen/Umsatzsteuer/Umsatzsteuer_node.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-gray-800 text-white rounded-lg flex items-center justify-center text-xs font-bold">BZ</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Bundeszentralamt fuer Steuern - Umsatzsteuer</div>
                  <div className="text-xs text-gray-500 mt-0.5">German Federal Tax Authority. Governs paragraph 25c UStG: 0% MwSt (VAT) on investment gold bars and coins meeting EU fineness standards.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">bzst.de</div>
                </div>
              </a>
              <a
                href="https://www.heraeus.com/en/hpm/precious_metal_prices/prices.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-gray-800 text-white rounded-lg flex items-center justify-center text-xs font-bold">HE</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Heraeus - Edelmetallpreise (Precious Metal Prices)</div>
                  <div className="text-xs text-gray-500 mt-0.5">Germany's leading LBMA-accredited precious metal refiner, headquartered in Hanau. Official daily gold and silver prices in EUR published since 1851.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">heraeus.com</div>
                </div>
              </a>
            </div>
          </section>


          {/* Section: Related Internal Tools */}
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Verwandte Tools und Ressourcen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/international/gold-silver-ratio/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">GSR</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 leading-tight">Gold-Silber-Verhaeltnis Live</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Echtzeit-Verhaeltnis von Gold zu Silber auf Basis von COMEX-Spotpreisen. Wichtige Kennzahl fuer deutsche Anleger, die zwischen Kruegerrand und Silbermuenzen abwaegen.</div>
                </div>
              </Link>
              <Link
                href="/international/gold-silver-price/history/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">ARC</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 leading-tight">Historisches Preisarchiv</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Vollstaendiges historisches Archiv internationaler Gold- und Silberpreise in USD. Unverzichtbar fuer die Berechnung der einjahrigen Spekulationsfrist nach Paragraph 23 EStG.</div>
                </div>
              </Link>
              <Link
                href="/international/platinum/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:bg-violet-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">PLT</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-violet-700 leading-tight">Platin Spotpreis (USD)</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Aktuelle Platinpreise in USD. Deutschland ist weltweit einer der groessten Platinkonsumenten durch seine Automobilindustrie.</div>
                </div>
              </Link>
              <Link
                href="/calculator/currency-converter/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">FX</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-amber-700 leading-tight">Waehrungsrechner (EUR/USD)</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Konvertieren Sie Euro in US-Dollar und 160+ Waehrungen. Hilfreich zur Umrechnung von USD-Spotpreisen in Euro-Goldpreise.</div>
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
              <Link href="/international/france-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                France Gold &amp; Silver (EUR)
              </Link>
              <Link href="/international/netherlands-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Netherlands Gold &amp; Silver (EUR)
              </Link>
              <Link href="/international/canada-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Canada Gold &amp; Silver (CAD)
              </Link>
              <Link href="/international/australia-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Australia Gold &amp; Silver (AUD)
              </Link>
              <Link href="/international/bitcoin/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Bitcoin Global Rates
              </Link>
              <Link href="/international/gold-silver-ratio/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Gold-to-Silver Ratio
              </Link>
            </div>
          </section>

        </article>
      </div>
    </>
  );
}
