// Route: /international/netherlands-gold-silver/
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import CountryGoldClient, { CountryGoldConfig, InternationalRatesData } from '@/components/international/CountryGoldClient';

const NETHERLANDS_CONFIG: CountryGoldConfig = {
  code: 'nl',
  countryName: 'The Netherlands',
  shortName: 'Netherlands',
  currencyCode: 'EUR',
  currencySymbol: '€',
  defaultUsdRate: 0.9087,
  marketBadge: 'Amsterdam Spot & Royal Dutch Mint',
  goldCardTitle: 'Gold (24 Karaat / 999.9)',
  silverCardTitle: 'Silver (.999 Puur Zilver)',
  subtitle: 'Per Troy Ounce, Gram and Gouden Tientje • Real-time Euro spot rates',
  units: [
    { id: 'oz', label: 'Per Troy Ounce (oz)', shortLabel: 'Ounce', ozFactor: 1 },
    { id: 'g', label: 'Per Gram (g)', shortLabel: 'Gram', ozFactor: 1 / 31.1034768 },
    { id: '10g', label: 'Per 10 Gram', shortLabel: '10 g', ozFactor: 10 / 31.1034768 },
    { id: 'tientje', label: 'Gouden Tientje (6.72g)', shortLabel: 'Gouden Tientje', ozFactor: 6.048 / 31.1034768 },
    { id: 'kg', label: 'Per Kilogram', shortLabel: 'Kilo', ozFactor: 1000 / 31.1034768 },
    { id: 'tola', label: 'Per Tola', shortLabel: 'Tola', ozFactor: 11.6638 / 31.1034768 },
  ],
  purities: [
    { id: '24k', name: '24 Karaat (999.9)', purity: 0.9999, desc: 'Puur Beleggingsgoud & Baren' },
    { id: '22k', name: '22 Karaat (916)', purity: 0.9167, desc: 'Gouden Munten' },
    { id: '21k', name: '21.6 Karaat (900)', purity: 0.900, desc: 'Historisch Gouden Tientje' },
    { id: '18k', name: '18 Karaat (750)', purity: 0.750, desc: '75.0% Luxe Sieradengoud' },
    { id: '14k', name: '14 Karaat (585)', purity: 0.5833, desc: '58.5% Nederlandse Standaard Sieraden' },
    { id: '8k', name: '8 Karaat (333)', purity: 0.3333, desc: '33.3% Benelux Basisgoud' },
  ],
  popularItems: [
    {
      name: 'Gouden Tientje (10 Gulden Wilhelmina / Willem III)',
      metal: 'gold',
      weight: '6.72 g',
      purity: '21.6 Karaat (900/1000)',
      ozFactor: 6.72 / 31.1034768,
      purityFactor: 0.900,
      taxNote: '0% BTW (Beleggingsgoud)',
    },
    {
      name: '100g Umicore Goudbaar (LBMA Good Delivery)',
      metal: 'gold',
      weight: '100.0 g',
      purity: '24 Karaat (999.9)',
      ozFactor: 100 / 31.1034768,
      purityFactor: 1.0,
      taxNote: '0% BTW (Beleggingsgoud)',
    },
    {
      name: '1 oz Gouden Maple Leaf / Philharmoniker',
      metal: 'gold',
      weight: '31.1035 g',
      purity: '24 Karaat (999.9)',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: '0% BTW (Beleggingsgoud)',
    },
    {
      name: '1 kg Umicore Zilverbaar',
      metal: 'silver',
      weight: '1000.0 g',
      purity: '.999 Zilver',
      ozFactor: 1000 / 31.1034768,
      purityFactor: 1.0,
      taxNote: '21% BTW tarief',
    },
    {
      name: '1 oz Zilveren Philharmoniker Munt',
      metal: 'silver',
      weight: '31.1035 g',
      purity: '.999 Zilver',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: '21% BTW tarief',
    },
  ],
  regulatoryNotes: {
    authority: 'WaarborgHolland (Gouda) & De Nederlandsche Bank (DNB) under the Waarborgwet.',
    vatGstRule: 'Investment gold (beleggingsgoud) is 100% exempt from Dutch VAT (0% BTW) under EU Directive 98/80/EC and the Wet op de omzetbelasting 1968.',
    cgtTaxRule: 'Physical gold in the Netherlands is taxed under Box 3 (wealth tax / vermogensrendementheffing) above the personal tax-free allowance.',
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
  const fx = NETHERLANDS_CONFIG.defaultUsdRate;
  const goldOzEUR = initialData.gold.spotUSD * fx;
  const silverOzEUR = initialData.silver.spotUSD * fx;
  const goldGramEUR = (goldOzEUR / 31.1034768).toFixed(2);
  const gold14kGramEUR = ((goldOzEUR / 31.1034768) * 0.5833).toFixed(2);
  const tientjeValueEUR = (goldOzEUR * (6.048 / 31.1034768)).toFixed(2);

  const formattedGold = goldOzEUR.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedSilver = silverOzEUR.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const description = `Live goudprijs vandaag Nederland in Euro (€): €${formattedGold}/oz • 24K €${goldGramEUR}/g • 14K (585) €${gold14kGramEUR}/g • Gouden Tientje €${tientjeValueEUR}. Zilverprijs €${formattedSilver}/oz. 0% BTW & Box 3 gids.`;

  return {
    title: `Gold Price Today Netherlands - €${formattedGold}/oz | Actuele Goudprijs Live`,
    description,
    keywords: [
      'gold price today netherlands',
      'actuele goudprijs nederland',
      'goudprijs per gram vandaag',
      'zilverprijs vandaag nederland',
      'gouden tientje waarde vandaag',
      '14 karaat goud prijs per gram',
      'goudbaren prijs umicore',
      'btw vrij goud kopen nederland',
      'box 3 vermogensbelasting goud',
      'sloopgoud prijs nederland',
      'gold silver ratio netherlands',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/international/netherlands-gold-silver/',
    },
    openGraph: {
      title: `Gold Price Today Netherlands - €${formattedGold}/oz | Actuele Goudprijs Live`,
      description: `Actuele goudprijs in Nederland: Goud €${formattedGold}/oz • Zilver €${formattedSilver}/oz • 14K (585) €${gold14kGramEUR}/g • Gouden Tientje. 0% BTW op beleggingsgoud & Box 3 regels.`,
      url: 'https://nepacalc.com/international/netherlands-gold-silver/',
      type: 'website',
      images: [{
        url: 'https://nepacalc.com/images/og/international-gold-silver.jpg',
        width: 1200,
        height: 630,
        alt: `Actuele Goudprijs Nederland €${formattedGold} per troy ounce | Zilver €${formattedSilver} - Live Spot Koersen`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Goud €${formattedGold}/oz | Zilver €${formattedSilver}/oz - Actuele Koers Nederland`,
      description: `Live Nederlandse goudprijs: €${formattedGold}/oz (€${goldGramEUR}/g 24K, €${gold14kGramEUR}/g 14K). Zilver: €${formattedSilver}/oz. Realtime edelmetaal in EUR.`,
      images: ['https://nepacalc.com/images/og/international-gold-silver.jpg'],
    },
  };
}

export default function NetherlandsGoldSilverPage() {
  const initialData = getInitialRates();
  const fx = NETHERLANDS_CONFIG.defaultUsdRate;

  const goldOzEUR = initialData.gold.spotUSD * fx;
  const silverOzEUR = initialData.silver.spotUSD * fx;
  const goldGramEUR = goldOzEUR / 31.1034768;
  const silverGramEUR = silverOzEUR / 31.1034768;
  const tientjeGoldEUR = goldOzEUR * (6.048 / 31.1034768);
  const goldRatio = silverOzEUR > 0 ? (goldOzEUR / silverOzEUR).toFixed(1) : '-';

  function fmtEUR(n: number) {
    return n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const faqItems = [
    {
      name: 'Wat is de goudprijs vandaag in Nederland (What is the gold price in the Netherlands today)?',
      acceptedAnswer: {
        text: `De actuele goud spotprijs in Nederland is vandaag ongeveer €${fmtEUR(goldOzEUR)} per troy ounce (31,1035 gram), wat neerkomt op circa €${fmtEUR(goldGramEUR)} per gram voor puur 24 karaat goud (999.9). Voor gangbaar 14 karaat sieradengoud (585) is de intrinsieke smeltwaarde ongeveer €${fmtEUR(goldGramEUR * 0.5833)} per gram.`,
      },
    },
    {
      name: 'Wat is de waarde van een Gouden Tientje vandaag?',
      acceptedAnswer: {
        text: `Een historisch Nederlands Gouden Tientje (geslagen onder Koning Willem III of Koningin Wilhelmina) heeft een totaalgewicht van 6,72 gram en een gehalte van 900/1000 (90% puur goud). Dit bevat exact 6,048 gram zuiver goud. Bij de huidige koers bedraagt de goudwaarde ongeveer €${fmtEUR(tientjeGoldEUR)}, exclusief eventuele verzamelaarsopslag.`,
      },
    },
    {
      name: 'Is beleggingsgoud vrijgesteld van BTW in Nederland?',
      acceptedAnswer: {
        text: 'Ja. Beleggingsgoud is in Nederland volledig vrijgesteld van BTW (0% BTW-tarief) op grond van Europese Richtlijn 98/80/EG en artikel 28i van de Wet op de omzetbelasting 1968. Dit geldt voor goudbaren met een zuiverheid van minimaal 995/1000 en erkende gouden munten (geslagen na 1800 met minimaal 900/1000 zuiverheid). Fysiek zilver is daarentegen onderworpen aan 21% BTW.',
      },
    },
    {
      name: 'Hoe wordt fysiek goud belast in Nederland (Box 3 Vermogensbelasting)?',
      acceptedAnswer: {
        text: 'Fysiek goud dat als vermogen of belegging wordt aangehouden, valt in de Nederlandse inkomstenbelasting onder Box 3 (overige bezittingen). U dient de marktwaarde van uw goud op de peildatum (1 januari van het belastingjaar) aan te geven bij de Belastingdienst voor zover uw totale vermogen het heffingvrij vermogen overschrijdt.',
      },
    },
    {
      name: 'Wat zijn de wettelijke goudkeurmerken in Nederland (Waarborgwet)?',
      acceptedAnswer: {
        text: 'In Nederland controleert WaarborgHolland (gevestigd in Gouda) edelmetalen onder toezicht van de Rijksinspectie Digitale Infrastructuur. De wettelijk erkende goudgehaltes zijn: 14 karaat (585), 18 karaat (750), 20 karaat (833), 21.6 karaat (900), en 24 karaat (999). Voorwerpen met een gehalte lager dan 585 (zoals 333 of 8 karaat) mogen in Nederland officieel niet als "goud" worden verkocht, maar worden aangeduid als goudhoudend metaal.',
      },
    },
    {
      name: 'Wat is de actuele zilverprijs in Nederland?',
      acceptedAnswer: {
        text: `De actuele zilver spotprijs in Nederland is circa €${fmtEUR(silverOzEUR)} per troy ounce, oftewel ongeveer €${fmtEUR(silverGramEUR)} per gram voor .999 puur zilver.`,
      },
    },
    {
      name: 'Wat is de goud-zilver ratio vandaag in Nederland?',
      acceptedAnswer: {
        text: `De goud-zilver verhouding bedraagt momenteel ongeveer ${goldRatio}:1. Dit betekent dat 1 troy ounce goud gelijk is aan de waarde van ${goldRatio} ounces zilver op de Europese groothandelsmarkt.`,
      },
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/netherlands-gold-silver/#webpage',
        url: 'https://nepacalc.com/international/netherlands-gold-silver/',
        name: `Gold Price Today Netherlands - €${fmtEUR(goldOzEUR)}/oz | Actuele Goudprijs Live`,
        description: `Actuele goudprijs in Nederland in EUR (€): 24K, 14K (585) en Gouden Tientje per gram en ounce. 0% BTW op beleggingsgoud en Box 3 vermogensbelasting gids.`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          url: 'https://nepacalc.com/',
          name: 'NepaCalc',
        },
        inLanguage: 'nl-NL',
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
            name: 'Netherlands Gold & Silver Price',
            item: 'https://nepacalc.com/international/netherlands-gold-silver/',
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
        name: 'Netherlands Gold and Silver Spot Prices (EUR)',
        description: 'Real-time and 30-day historical wholesale precious metal spot prices in Euros (€) based on Dutch bullion market and Royal Dutch Mint benchmarks.',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        variableMeasured: [
          'Gold spot price per troy ounce EUR',
          'Silver spot price per troy ounce EUR',
          'Gold price per gram 24K EUR',
          'Gold price per gram 14K 585 EUR',
          'Gouden Tientje coin value EUR',
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
            <span className="text-gray-900 font-semibold">Netherlands Gold &amp; Silver</span>
          </nav>
        </div>

        {/* Live Client Hero & Calculator */}
        <CountryGoldClient config={NETHERLANDS_CONFIG} initialData={initialData} />

        {/* Deep Educational & Regulatory Content */}
        <article className="max-w-6xl mx-auto px-4 mt-6 text-gray-800 space-y-10">
          
          {/* Section 1: The Dutch Bullion Market & Koninklijke Nederlandse Munt */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              De Nederlandse Goudmarkt &amp; De Koninklijke Nederlandse Munt
            </h2>
            <div className="space-y-3.5 text-sm leading-relaxed text-gray-700">
              <p>
                Nederland heeft een eeuwenoude traditie van goudhandel, verankerd door De Nederlandsche Bank (DNB) en de Koninklijke Nederlandse Munt (gevestigd in Houten). Voor particuliere beleggers vormt het Gouden Tientje (geslagen tussen 1875 en 1933) het meest iconische en verhandelbare gouden muntstuk van het land.
              </p>
              <p>
                In de Nederlandse juweliersbranche is 14 karaat (585/1000) de wettelijke standaard voor goud. Elk gouden sieraad boven de 1 gram moet voorzien zijn van een officieel waarborgkeurmerk van WaarborgHolland in Gouda.
              </p>
            </div>
          </section>

          {/* Section 2: Dutch Tax Rules: 0% BTW & Box 3 Vermogensrendementheffing */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Fiscale Regels in Nederland: 0% BTW &amp; Vermogensbelasting (Box 3)
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                Bij het kopen en aanhouden van fysieke edelmetalen in Nederland gelden de volgende fiscale uitgangspunten:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-amber-900 mb-1.5">0% BTW op Beleggingsgoud</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Op grond van artikel 28i van de Wet op de omzetbelasting 1968 is beleggingsgoud (baren vanaf 99,5% zuiverheid en munten vanaf 90%) 100% vrijgesteld van BTW. Zilver en platina baren vallen onder het reguliere BTW-tarief van 21%.
                  </p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-emerald-900 mb-1.5">Box 3 Vermogensrendementheffing</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Fysiek goud dat als belegging wordt bewaard, wordt in Box 3 belast als onderdeel van uw overige bezittingen. De belastingheffing is uitsluitend van toepassing indien uw totale vermogen het jaarlijkse heffingvrij vermogen overschrijdt.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Frequently Asked Questions */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Veelgestelde Vragen (Nederlandse Goud &amp; Zilvermarkt)
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
              Officiele Bronnen &amp; Regelgevende Instanties
            </h2>
            <div className="space-y-3">
              <a
                href="https://www.waarborghholland.nl/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-orange-700 text-white rounded-lg flex items-center justify-center text-xs font-bold">WH</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">WaarborghHolland - Dutch Assay Office</div>
                  <div className="text-xs text-gray-500 mt-0.5">Official Netherlands assay authority based in Gouda. Governs hallmarking of precious metals under the Waarborgwet. All Dutch gold must bear WaarborghHolland marks.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">waarborghholland.nl</div>
                </div>
              </a>
              <a
                href="https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/bijzondere_situaties/financiele_diensten/goud/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-orange-700 text-white rounded-lg flex items-center justify-center text-xs font-bold">BD</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Belastingdienst - BTW op Goud (VAT on Gold)</div>
                  <div className="text-xs text-gray-500 mt-0.5">Dutch Tax Authority official guidance: 0% BTW (VAT) on investment gold under EU Directive 98/80/EC. Covers eligible bars (99.5%+) and coins (90%+ purity, post-1800).</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">belastingdienst.nl</div>
                </div>
              </a>
              <a
                href="https://www.dnb.nl/en/payments/cash/dutch-currency-and-gold/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-orange-700 text-white rounded-lg flex items-center justify-center text-xs font-bold">DN</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">De Nederlandsche Bank - Dutch Gold &amp; Currency</div>
                  <div className="text-xs text-gray-500 mt-0.5">Netherlands central bank (DNB) holds 612.5 tonnes of gold reserves. Official publications on Dutch monetary gold, Gouden Tientje, and foreign exchange rates.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">dnb.nl</div>
                </div>
              </a>
            </div>
          </section>


          {/* Section: Related Internal Tools */}
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Gerelateerde Tools en Bronnen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/international/gold-silver-ratio/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">GSR</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 leading-tight">Goud-Zilver Verhouding Live</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Realtime goud/zilver-verhouding op basis van COMEX-spotprijzen. Belangrijke indicator voor Nederlandse beleggers die kiezen tussen Gouden Tientjes en zilveren munten.</div>
                </div>
              </Link>
              <Link
                href="/international/gold-silver-price/history/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">ARC</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 leading-tight">Historisch Prijsarchief</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Volledig historisch archief van internationale goud- en zilverprijzen in USD. Essentieel voor Box 3 vermogenswaardering en belastingaangiftes bij de Belastingdienst.</div>
                </div>
              </Link>
              <Link
                href="/international/gold-silver-price/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:bg-violet-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">USD</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-violet-700 leading-tight">Live VS Goud en Zilver (USD)</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Volg live goud- en zilverprijzen in USD vanaf de COMEX. Vergelijk met EUR-prijzen om de impact van de EUR/USD wisselkoers op uw goudportfolio te begrijpen.</div>
                </div>
              </Link>
              <Link
                href="/calculator/currency-converter/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">FX</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-amber-700 leading-tight">Valutaomrekener (EUR/USD)</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Reken Euro om naar US-dollar en 160+ valuta met live koersen. Handig om USD COMEX-spotprijzen naar Nederlandse euro-goudprijzen om te rekenen.</div>
                </div>
              </Link>
            </div>
          </section>

          {/* Section 4: Related International Portals */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Verken Wereldwijde Edelmetaalprijzen
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs font-semibold">
              <Link href="/international/gold-silver-price/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                USA Gold &amp; Silver (USD)
              </Link>
              <Link href="/international/uk-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                UK Gold &amp; Silver (GBP)
              </Link>
              <Link href="/international/germany-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Germany Gold &amp; Silver (EUR)
              </Link>
              <Link href="/international/france-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                France Gold &amp; Silver (EUR)
              </Link>
              <Link href="/international/canada-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Canada Gold &amp; Silver (CAD)
              </Link>
              <Link href="/international/australia-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Australia Gold &amp; Silver (AUD)
              </Link>
              <Link href="/international/gold-silver-price/history/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Historisch Spot Archief
              </Link>
              <Link href="/international/dubai-gold-rate/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Dubai Goudkoers (AED)
              </Link>
            </div>
          </section>

        </article>
      </div>
    </>
  );
}
