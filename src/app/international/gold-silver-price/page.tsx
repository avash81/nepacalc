// Route: /international/gold-silver-price/
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
  title: 'Gold Price in USA & Silver Price Today | Live USD Rates',
  description: 'Check live US gold and silver prices in USD per troy ounce, gram and kilogram. Compare gold karats, silver purity, bid and ask prices, and market trends.',
  alternates: {
    canonical: 'https://nepacalc.com/international/gold-silver-price/',
    languages: {
      'en-US': 'https://nepacalc.com/international/gold-silver-price/',
      'en-GB': 'https://nepacalc.com/international/uk-gold-silver/',
      'en-CA': 'https://nepacalc.com/international/canada-gold-silver/',
      'en-AU': 'https://nepacalc.com/international/australia-gold-silver/',
      'de-DE': 'https://nepacalc.com/international/germany-gold-silver/',
      'fr-FR': 'https://nepacalc.com/international/france-gold-silver/',
      'nl-NL': 'https://nepacalc.com/international/netherlands-gold-silver/',
      'x-default': 'https://nepacalc.com/international/',
    },
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    type: 'website',
    url: 'https://nepacalc.com/international/gold-silver-price/',
    title: 'Gold Price in USA & Silver Price Today | Live USD Rates',
    description: 'Live US gold and silver spot prices in USD per troy ounce, gram and kilogram. Compare gold karats, silver purity, bid and ask quotes, and market trends.',
    images: [
      {
        url: 'https://nepacalc.com/images/og/gold-silver-price-usa.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Live gold and silver spot prices in US dollars, with weight and purity comparisons.',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price in USA & Silver Price Today | Live USD Rates',
    description: 'Live US gold and silver spot prices in USD per troy ounce, gram and kilogram. Compare gold karats, silver purity, bid and ask quotes, and market trends.',
    images: [
      {
        url: 'https://nepacalc.com/images/og/gold-silver-price-usa.png',
        alt: 'Live gold and silver spot prices in US dollars, with weight and purity comparisons.',
      },
    ],
  },
};

export default function InternationalGoldSilverPage() {
  const initialData = getInitialRates();

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/gold-silver-price/#webpage',
        url: 'https://nepacalc.com/international/gold-silver-price/',
        name: 'Gold Price in USA and Silver Price Today',
        description: 'Live gold and silver prices in USD per troy ounce, gram and kilogram, including gold purity, silver fineness, and spot market information.',
        inLanguage: 'en-US',
        about: [
          { '@type': 'Thing', name: 'Gold spot price' },
          { '@type': 'Thing', name: 'Silver spot price' },
          { '@type': 'Thing', name: 'Gold purity' },
          { '@type': 'Thing', name: 'Silver fineness' },
          { '@type': 'Thing', name: 'Precious metals weight conversion' },
        ],
        breadcrumb: {
          '@id': 'https://nepacalc.com/international/gold-silver-price/#breadcrumb',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/international/gold-silver-price/#breadcrumb',
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
            name: 'International Market Rates',
            item: 'https://nepacalc.com/international/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Gold and Silver Price USA',
            item: 'https://nepacalc.com/international/gold-silver-price/',
          },
        ],
      },
    ],
  };

  const countryPortals = [
    { name: 'USA', href: '/international/gold-silver-price/', active: true },
    { name: 'United Kingdom', href: '/international/uk-gold-silver/' },
    { name: 'Canada', href: '/international/canada-gold-silver/' },
    { name: 'Australia', href: '/international/australia-gold-silver/' },
    { name: 'Germany', href: '/international/germany-gold-silver/' },
    { name: 'France', href: '/international/france-gold-silver/' },
    { name: 'Netherlands', href: '/international/netherlands-gold-silver/' },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124] font-modern-ui">
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 pt-2 sm:pt-3">
        <nav aria-label="Breadcrumb" className="mb-1 sm:mb-1.5">
          <Link
            href="/"
            className="sm:hidden inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-600 transition"
          >
            &larr; Home
          </Link>
          <div className="hidden sm:flex items-center flex-wrap gap-2 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600 hover:underline">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/international/" className="hover:text-blue-600 hover:underline">
              International Market Rates
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">Gold and Silver Price USA</span>
          </div>
        </nav>

        {/* ── Country Portals Navigation Bar ── */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 sm:pb-1 scrollbar-none text-xs">
          <span className="text-gray-400 font-medium whitespace-nowrap pr-1">Regional Portals:</span>
          {countryPortals.map((portal) => (
            <Link
              key={portal.name}
              href={portal.href}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition ${
                portal.active
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {portal.name}
            </Link>
          ))}
          <Link
            href="/international/gold-silver-price/history/"
            className="px-3 py-1 rounded-full whitespace-nowrap font-medium bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200 transition ml-auto"
          >
            56-Year History &rarr;
          </Link>
        </div>
      </div>

      {/* ── Main Interactive Dashboard (Live COMEX Rates & Calculators) ── */}
      <div id="todays-gold-price">
        <InternationalGoldClient initialData={initialData} />
      </div>

      {/* ── Educational Content Underneath Live Price Displays & Calculators ── */}
      <div className="max-w-6xl mx-auto px-4 pb-16 space-y-8">

        {/* Section 1: Overview */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            Gold and Silver Price in the USA: Live Spot Rates, Purity and Value Explained
          </h2>
          <div className="space-y-3.5 text-sm md:text-base text-gray-700 leading-relaxed">
            <p>
              Gold and silver prices in the United States are quoted in US dollars (USD) and are closely linked to international precious metals markets. The live rates above show the current market prices for gold and silver, while the value per gram, ounce, kilogram and other weights is calculated from the same underlying metal price.
            </p>
            <p>
              The actual value of gold or silver depends on its weight, purity and current market rate. Physical coins, bullion bars, jewellery and silverware may also have additional premiums or costs that are not included in the spot price.
            </p>
            <p>
              Whether you are checking the gold price today in the USA, calculating the value of 14K jewellery, comparing silver prices per gram, or understanding how precious metals are traded, the following guide explains how these prices work.
            </p>
          </div>
        </section>

        {/* Section 2: Gold Price in the USA by Karat and Purity */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              Gold Price in the USA by Karat and Purity
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Gold is available in different purity levels, commonly measured in karats (K). Pure gold is measured as 24 karats, while lower-karat gold contains a mixture of gold and other metals.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-2">
              In the United States, 14K and 18K gold are commonly used in jewellery. Investment-grade gold bullion is generally available in higher purities, including 24K gold.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-amber-50 text-amber-950 font-bold border-b border-amber-200">
                  <th className="py-3 px-4">Gold Purity</th>
                  <th className="py-3 px-4">Gold Content</th>
                  <th className="py-3 px-4">Common Hallmark</th>
                  <th className="py-3 px-4">Typical Uses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                <tr className="hover:bg-amber-50/40 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">24K Gold</td>
                  <td className="py-3 px-4">99.9% or higher</td>
                  <td className="py-3 px-4 font-mono text-xs">999 / 9999</td>
                  <td className="py-3 px-4">Investment bullion and gold bars</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition bg-gray-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-900">22K Gold</td>
                  <td className="py-3 px-4">91.67%</td>
                  <td className="py-3 px-4 font-mono text-xs">916 / 917</td>
                  <td className="py-3 px-4">Gold jewellery and certain bullion coins</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">18K Gold</td>
                  <td className="py-3 px-4">75.00%</td>
                  <td className="py-3 px-4 font-mono text-xs">750</td>
                  <td className="py-3 px-4">Fine jewellery and luxury accessories</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition bg-gray-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-900">14K Gold</td>
                  <td className="py-3 px-4">58.33%</td>
                  <td className="py-3 px-4 font-mono text-xs">585</td>
                  <td className="py-3 px-4">Everyday jewellery in the USA</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">10K Gold</td>
                  <td className="py-3 px-4">41.67%</td>
                  <td className="py-3 px-4 font-mono text-xs">417</td>
                  <td className="py-3 px-4">Durable, lower-karat jewellery</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            The karat number indicates how many parts out of 24 are gold. For example, 18K gold contains 18 parts gold and 6 parts other metals, making it 75% pure.
          </p>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-gray-900">
              How to Calculate the Value of Gold by Karat
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              The intrinsic metal value of gold jewellery can be estimated using its weight, purity and the current 24K gold spot price.
            </p>
            <div className="bg-white p-3.5 rounded-lg border border-slate-300 font-mono text-xs md:text-sm text-slate-800">
              Gold Value = Gold Weight &times; Gold Purity &times; 24K Gold Price per Gram
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              For example, a 10-gram piece of 18K gold contains approximately 7.5 grams of pure gold. Its estimated melt value is calculated using:
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs md:text-sm text-slate-700 font-mono">
              10 grams &times; 0.75 &times; Current 24K Gold Price per Gram
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              The same calculation applies to 22K, 14K and 10K gold by using their respective purity percentages. These calculations estimate the value of the gold content only. They do not include jewellery craftsmanship, gemstones, brand value, dealer premiums or potential collector value. Learn more about standards from the{' '}
              <a
                href="https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                Federal Trade Commission guidance on jewelry
              </a>
              .
            </p>
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-2">
            <h3 className="text-base font-bold text-gray-900">
              American Gold Eagle and 22K Gold
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              The American Gold Eagle is an important example of why gold purity and actual gold content should be understood separately.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              American Gold Eagle bullion coins are made from 22K gold, containing 91.67% gold, with silver and copper making up the remaining alloy. A one-troy-ounce American Gold Eagle contains a full troy ounce of pure gold, even though the complete coin weighs more than one troy ounce.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              This means its value should be calculated using its stated fine-gold content rather than treating its total coin weight as pure gold. Official specifications can be verified at the{' '}
              <a
                href="https://www.usmint.gov/coins-precious-metal-coins/bullion-coin-programs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                United States Mint - American Eagle Bullion Coin Specifications
              </a>
              .
            </p>
          </div>
        </section>

        {/* Section 3: Silver Price in the USA by Purity */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              Silver Price in the USA by Purity
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Silver is traded in different purity grades depending on whether it is used for investment bullion, jewellery, silverware or industrial applications.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-2">
              Fine silver bullion is commonly marked 999, while sterling silver jewellery and household silverware are generally marked 925.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-300">
                  <th className="py-3 px-4">Silver Purity</th>
                  <th className="py-3 px-4">Silver Content</th>
                  <th className="py-3 px-4">Common Hallmark</th>
                  <th className="py-3 px-4">Typical Uses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">Fine Silver</td>
                  <td className="py-3 px-4">99.99%</td>
                  <td className="py-3 px-4 font-mono text-xs">9999</td>
                  <td className="py-3 px-4">High-purity silver bullion</td>
                </tr>
                <tr className="hover:bg-slate-50 transition bg-gray-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-900">Fine Silver</td>
                  <td className="py-3 px-4">99.90%</td>
                  <td className="py-3 px-4 font-mono text-xs">999</td>
                  <td className="py-3 px-4">Silver bars, rounds and investment coins</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">Britannia Silver</td>
                  <td className="py-3 px-4">95.80%</td>
                  <td className="py-3 px-4 font-mono text-xs">958</td>
                  <td className="py-3 px-4">Britannia-standard silverware</td>
                </tr>
                <tr className="hover:bg-slate-50 transition bg-gray-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-900">Sterling Silver</td>
                  <td className="py-3 px-4">92.50%</td>
                  <td className="py-3 px-4 font-mono text-xs">925</td>
                  <td className="py-3 px-4">Jewellery, flatware and accessories</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">Coin Silver</td>
                  <td className="py-3 px-4">90.00%</td>
                  <td className="py-3 px-4 font-mono text-xs">900</td>
                  <td className="py-3 px-4">Certain older silver coins and silverware</td>
                </tr>
                <tr className="hover:bg-slate-50 transition bg-gray-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-900">Commercial Silver</td>
                  <td className="py-3 px-4">80.00%</td>
                  <td className="py-3 px-4 font-mono text-xs">800</td>
                  <td className="py-3 px-4">European silverware and household items</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-gray-900">
              How to Calculate the Value of Silver by Purity
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              The value of a silver item depends on how much actual silver it contains.
            </p>
            <div className="bg-white p-3.5 rounded-lg border border-slate-300 font-mono text-xs md:text-sm text-slate-800">
              Silver Value = Silver Weight &times; Silver Purity &times; Current Silver Price per Gram
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              For example, a 100-gram sterling silver item marked 925 contains: 100 grams &times; 92.5% = 92.5 grams of pure silver.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Its estimated metal value is calculated by multiplying 92.5 grams by the current silver spot price per gram. This calculation is particularly useful when estimating the intrinsic value of sterling silver jewellery, silverware, collectible items and scrap silver.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              The actual amount a buyer offers may be lower or higher depending on refining costs, product condition, demand and collectible value.
            </p>
          </div>
        </section>

        {/* Section 4: Gold and Silver Price per Gram, Ounce and Kilogram */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              Gold and Silver Price per Gram, Ounce and Kilogram
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Gold and silver prices are commonly displayed in troy ounces in international bullion markets. However, buyers, sellers and investors also use grams, kilograms, tolas and other units.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-2">
              Converting between these measurements makes it easier to compare precious metal prices and calculate the value of different quantities.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-amber-50 text-amber-950 font-bold border-b border-amber-200">
                  <th className="py-3 px-4">Weight Unit</th>
                  <th className="py-3 px-4">Equivalent in Grams</th>
                  <th className="py-3 px-4">Equivalent in Troy Ounces</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                <tr className="hover:bg-amber-50/40 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">1 Troy Ounce</td>
                  <td className="py-3 px-4 font-mono text-xs">31.1034768 g</td>
                  <td className="py-3 px-4 font-mono text-xs">1</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition bg-gray-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-900">1 Gram</td>
                  <td className="py-3 px-4 font-mono text-xs">1 g</td>
                  <td className="py-3 px-4 font-mono text-xs">0.03215075</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">5 Grams</td>
                  <td className="py-3 px-4 font-mono text-xs">5 g</td>
                  <td className="py-3 px-4 font-mono text-xs">0.16075373</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition bg-gray-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-900">10 Grams</td>
                  <td className="py-3 px-4 font-mono text-xs">10 g</td>
                  <td className="py-3 px-4 font-mono text-xs">0.32150746</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">100 Grams</td>
                  <td className="py-3 px-4 font-mono text-xs">100 g</td>
                  <td className="py-3 px-4 font-mono text-xs">3.21507465</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition bg-gray-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-900">1 Kilogram</td>
                  <td className="py-3 px-4 font-mono text-xs">1,000 g</td>
                  <td className="py-3 px-4 font-mono text-xs">32.1507465</td>
                </tr>
                <tr className="hover:bg-amber-50/40 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">1 Tola</td>
                  <td className="py-3 px-4 font-mono text-xs">Approximately 11.6638 g</td>
                  <td className="py-3 px-4 font-mono text-xs">Approximately 0.37488</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-3">
            <h3 className="text-base font-bold text-gray-900">
              Troy Ounce vs Standard Ounce
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              One important distinction when checking gold and silver prices is the difference between a troy ounce and a regular ounce.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              A troy ounce is the standard unit used for precious metals such as gold and silver. A regular ounce, also called an avoirdupois ounce, is commonly used to weigh everyday goods.
            </p>

            <div className="max-w-md overflow-x-auto rounded-xl border border-gray-200 mt-2">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                    <th className="py-2.5 px-4">Measurement</th>
                    <th className="py-2.5 px-4">Weight in Grams</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">1 Troy Ounce</td>
                    <td className="py-2.5 px-4 font-mono text-xs">31.1034768 g</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2.5 px-4 font-semibold">1 Standard Ounce</td>
                    <td className="py-2.5 px-4 font-mono text-xs">28.3495 g</td>
                  </tr>
                  <tr className="font-bold bg-amber-50 text-amber-950">
                    <td className="py-2.5 px-4">Difference</td>
                    <td className="py-2.5 px-4 font-mono text-xs">2.7539768 g</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              A troy ounce is approximately 9.72% heavier than a standard ounce. Therefore, when a gold or silver price is quoted per ounce, it normally refers to one troy ounce rather than an ordinary ounce. For internationally accepted precious metals weight definitions, see the{' '}
              <a
                href="https://www.lbma.org.uk/wonders-of-gold/items/the-troy-ounce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                London Bullion Market Association guide to the troy ounce
              </a>
              .
            </p>
          </div>
        </section>

        {/* Section 5: What Is the Gold and Silver Spot Price? */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            What Is the Gold and Silver Spot Price?
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            The spot price is the current market reference price for a precious metal for immediate delivery. It represents the underlying market value of the metal before adding the additional costs associated with manufacturing, distribution and retail sales.
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Gold and silver trade in interconnected international markets, including the London over-the-counter (OTC) bullion market and exchange-traded futures markets such as COMEX. The live spot price is influenced by market transactions, supply and demand, currency movements and the relationship between physical bullion and futures trading.
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Spot prices are commonly quoted in US dollars per troy ounce, although they can also be converted into grams, kilograms and other currencies.
          </p>
        </section>

        {/* Section 6: COMEX vs LBMA Gold and Silver Prices */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              COMEX vs LBMA Gold and Silver Prices
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              COMEX and the London Bullion Market Association (LBMA) serve different but interconnected roles in precious metals pricing.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-300">
                  <th className="py-3 px-4">Market or Organisation</th>
                  <th className="py-3 px-4">Main Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">COMEX</td>
                  <td className="py-3 px-4">
                    Provides exchange-traded gold and silver futures markets and contributes to global price discovery
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition bg-gray-50/50">
                  <td className="py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">LBMA</td>
                  <td className="py-3 px-4">
                    Establishes internationally recognised precious metals benchmark prices through administered auctions
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">OTC Bullion Market</td>
                  <td className="py-3 px-4">
                    Facilitates transactions between banks, dealers, refiners and other precious metals market participants
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            The LBMA Gold Price is established through auctions twice daily in London. The LBMA Silver Price is established through a daily auction. COMEX futures prices and physical spot prices are closely connected, but they are not identical. Futures contracts represent transactions for delivery at a specified future date, whereas spot transactions concern immediate delivery under agreed market conventions.
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            Official benchmark and futures documentation can be reviewed at{' '}
            <a
              href="https://www.lbma.org.uk/prices-and-data/about-lbma-daily-auction-prices"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              LBMA Precious Metals Benchmarks
            </a>{' '}
            and{' '}
            <a
              href="https://www.cmegroup.com/education/articles-and-reports/trading-comex-gold-and-silver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              CME Group Spot and Futures Pricing
            </a>
            .
          </p>
        </section>

        {/* Section 7: Spot Price vs Physical Gold and Silver Prices */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              Spot Price vs Physical Gold and Silver Prices
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              The spot price and the retail price of physical precious metals are not necessarily the same. When purchasing gold coins, silver rounds, bullion bars or jewellery, the final price can include additional costs above the underlying metal value. These additional costs are commonly called premiums.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-gray-900">
              Why Physical Bullion Costs More Than Spot
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              The final retail price of a precious metal product may include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
              <li>Manufacturing and minting costs.</li>
              <li>Refining and fabrication expenses.</li>
              <li>Packaging, insurance and transportation.</li>
              <li>Dealer operating costs and profit margins.</li>
              <li>Product demand, availability and collectibility.</li>
            </ul>
            <p className="text-sm text-gray-700 leading-relaxed pt-2">
              Smaller bullion products may carry higher premiums relative to their metal content than larger bars. For example, a one-ounce silver coin and a large silver bar may contain the same amount of silver per ounce, but their retail prices can differ because of manufacturing costs, design and market demand.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Gold and silver jewellery can also cost significantly more than its melt value because of craftsmanship, gemstones, design and brand premiums.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <h3 className="text-base font-bold text-gray-900">
              How Much Can You Sell Gold or Silver For?
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              When selling gold or silver, the spot price is a useful starting point for estimating the metal&apos;s intrinsic value. However, the actual amount offered by a buyer depends on the metal&apos;s weight, purity, condition and resale value, along with any testing, refining or processing costs.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Before selling jewellery, scrap gold or silverware, check its purity, calculate its estimated melt value and compare offers from multiple buyers. Rare coins and collectible bullion should be evaluated separately because their numismatic value may exceed the value of their metal content.
            </p>
          </div>
        </section>

        {/* Section 8: Bid and Ask Prices */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            What Are Gold and Silver Bid and Ask Prices?
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Bid and ask prices are two important figures used in precious metals markets:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-gray-900 text-sm mb-1">Bid Price</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                The price at which a market participant is prepared to buy a particular amount of gold or silver.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-gray-900 text-sm mb-1">Ask Price</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                The price at which a market participant is prepared to sell a particular amount of gold or silver.
              </p>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            The difference between these two prices is called the bid-ask spread. For example, when checking a live gold or silver quote, the displayed bid and ask values help show the difference between buying and selling quotations in the underlying market.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            A narrow spread generally indicates a smaller difference between the two quoted prices, while a wider spread indicates a larger difference. Importantly, a live market bid is not necessarily the amount a local jewellery shop or coin dealer will offer for an individual&apos;s physical gold or silver. Actual offers depend on the product, transaction size and dealer terms.
          </p>
        </section>

        {/* Section 9: What Influences Gold and Silver Prices in the USA? */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              What Influences Gold and Silver Prices in the USA?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Gold and silver prices change in response to economic conditions, international trading activity and the supply and demand for precious metals. Although both metals can react to similar economic events, they also have different market characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-gray-200 bg-slate-50/70 space-y-2">
              <h3 className="text-base font-bold text-gray-900">
                1. Federal Reserve Interest Rates
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Federal Reserve monetary policy can influence gold and silver prices by changing interest rates, bond yields and expectations about the US dollar. Gold does not pay interest or dividends. When inflation-adjusted interest rates decline, the opportunity cost of holding gold may decrease, potentially increasing investment demand. Higher real interest rates can have the opposite effect.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-slate-50/70 space-y-2">
              <h3 className="text-base font-bold text-gray-900">
                2. US Dollar Strength
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Gold and silver are widely quoted in US dollars in international markets. Changes in the dollar&apos;s value can affect international demand for precious metals. A stronger dollar can make dollar-priced metals more expensive for overseas buyers, while a weaker dollar can make them relatively less expensive. However, the relationship is not automatic; other market forces can cause precious metals to move independently.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-slate-50/70 space-y-2">
              <h3 className="text-base font-bold text-gray-900">
                3. Inflation and Economic Uncertainty
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Investors may increase their interest in precious metals during periods of inflation concerns, banking instability, geopolitical uncertainty or financial market volatility. Gold has historically been used as a store of value, while silver has both monetary and industrial applications. These characteristics can influence investment demand during uncertain economic conditions.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-slate-50/70 space-y-2">
              <h3 className="text-base font-bold text-gray-900">
                4. Central Bank Gold Purchases
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Central banks hold gold as part of their international reserves. Changes in official gold holdings can influence global demand and long-term expectations for the precious metals market. Large purchases or sales by central banks may attract attention from investors and market participants.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-slate-50/70 space-y-2">
              <h3 className="text-base font-bold text-gray-900">
                5. Industrial Demand for Silver
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Unlike gold, silver has extensive industrial applications. It is used in electronics, electrical equipment, solar panels, automotive components and other technologies because of its excellent electrical conductivity and other physical properties. Changes in industrial production and manufacturing demand can therefore have a direct effect on silver market conditions. Learn more from the{' '}
                <a
                  href="https://silverinstitute.org/silver-in-electronics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Silver Institute research on silver in electronics
                </a>
                .
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-slate-50/70 space-y-2">
              <h3 className="text-base font-bold text-gray-900">
                6. Precious Metals Supply and Mining Production
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Gold and silver supplies come from mining, recycling and existing above-ground inventories. Changes in mine production, recycling volumes, refining capacity and physical bullion availability can influence market supply. When demand rises faster than available supply, prices may experience upward pressure. When supply exceeds demand, prices may face downward pressure.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: What Is the Gold-to-Silver Ratio? */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              What Is the Gold-to-Silver Ratio?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              The gold-to-silver ratio measures how many troy ounces of silver are needed to equal the market value of one troy ounce of gold. It is calculated by dividing the gold spot price per troy ounce by the silver spot price per troy ounce.
            </p>
          </div>

          <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 font-mono text-xs md:text-sm text-amber-950">
            Gold-to-Silver Ratio = Gold Price per Troy Ounce &divide; Silver Price per Troy Ounce
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            For example, if gold trades at $3,000 per troy ounce and silver trades at $30 per troy ounce, the ratio is 100:1. This means one troy ounce of gold has the same spot-market value as 100 troy ounces of silver.
          </p>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <h3 className="text-base font-bold text-gray-900">
              Why Do Investors Monitor the Gold-to-Silver Ratio?
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              The ratio helps investors compare the relative performance of gold and silver. When the ratio increases, gold is outperforming silver over that period. When the ratio decreases, silver is outperforming gold.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Some precious metals investors use the ratio as one of several measures when comparing the two markets. However, a high or low ratio does not guarantee that either metal is undervalued or that a reversal will occur. The ratio should be considered alongside market conditions, supply and demand and individual investment objectives. Explore the dedicated{' '}
              <Link
                href="/international/gold-silver-ratio/"
                className="text-blue-600 hover:underline font-semibold"
              >
                gold-to-silver ratio calculator and chart
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Section 11: Frequently Asked Questions */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 tracking-tight">
            Frequently Asked Questions About Gold and Silver Prices in the USA
          </h2>

          <div className="space-y-6 divide-y divide-gray-100">
            <div className="pt-4 first:pt-0">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                What is the gold price today in the USA?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                The current gold price in the USA is displayed in the live gold price section above. The quote is based on the available precious metals market feed and can be viewed in US dollars per troy ounce, gram and other weight units. The value of gold jewellery also depends on its karat purity.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                What is the silver price today in the USA?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                The current silver spot price in the USA is displayed in the live silver price section above. Silver prices are commonly quoted per troy ounce and can be converted into grams, kilograms and other measurements. The value of sterling silver depends on its 92.5% silver content.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                How much is 1 gram of 24K gold worth in the USA?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                The estimated value of one gram of 24K gold can be calculated by dividing the current gold spot price per troy ounce by 31.1034768. The resulting amount represents the approximate value of one gram of fine gold before retail premiums or other transaction costs.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                How much is 14K gold worth per gram?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                14K gold contains approximately 58.33% gold. To estimate its metal value, multiply the current 24K gold price per gram by 0.5833. This provides an estimated melt value and does not include jewellery design, craftsmanship or gemstones.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                How much is 22K gold worth compared with 24K gold?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                22K gold contains approximately 91.67% gold, while 24K gold represents the pure-gold reference. Based on equal weights, 22K gold has approximately 91.67% of the pure-gold content of 24K gold.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                What is the price of 1 troy ounce of gold?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                One troy ounce of gold is valued at the current gold spot price quoted in the live price section above. A troy ounce equals 31.1034768 grams and is the standard weight measurement used in international gold markets.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                How much is 1 ounce of silver worth?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                One troy ounce of silver is valued at the current silver spot price. To estimate its price per gram, divide the live silver price per troy ounce by 31.1034768.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                What is 925 sterling silver worth?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                925 sterling silver contains 92.5% pure silver. Its estimated melt value is calculated by multiplying its weight by 0.925 and then multiplying that amount by the current pure silver price per gram. Finished jewellery and collectible silver items may have additional value beyond their silver content.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                Why is silver more volatile than gold?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Silver generally has a smaller market than gold and is influenced by both investment demand and industrial consumption. Changes in manufacturing activity, technology demand, investor sentiment and precious metals trading can therefore produce larger percentage movements in silver prices.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                What is the difference between spot price and retail gold price?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                The spot price represents the underlying market value of gold before product-specific costs. Retail gold prices may include manufacturing, minting, shipping, insurance and dealer premiums. Jewellery may also include design and craftsmanship costs.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                Why are gold and silver prices different across dealers?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Dealers may use different market feeds, pricing update times, bid-ask spreads and product premiums. Physical bullion prices can also differ according to product availability, weight, mint, purity and delivery costs.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                Does the gold price in the USA use troy ounces or regular ounces?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                International gold prices are generally quoted in troy ounces, not ordinary ounces. One troy ounce equals 31.1034768 grams, whereas one standard ounce equals approximately 28.3495 grams.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                What is the difference between COMEX and LBMA gold prices?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                COMEX provides an exchange-traded futures market for gold, while LBMA administers internationally recognised gold benchmark auctions in London. Both markets contribute to precious metals price discovery, but futures quotations and benchmark prices are not necessarily identical to an individual live spot quote.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                Is the gold-silver ratio a reliable way to decide when to buy?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                The gold-to-silver ratio is a measure of the relative value of the two metals. Investors sometimes use it to compare their historical and current performance, but it is not a guaranteed buying or selling signal. Gold and silver prices can be affected by different economic and industrial conditions.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                Can I calculate the value of gold or silver jewellery using spot prices?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Yes. You can estimate the intrinsic metal value by multiplying the item&apos;s weight by its purity percentage and the current spot price per gram. The resulting figure is an estimated melt value, not necessarily the retail price or the amount a dealer will pay.
              </p>
            </div>
          </div>
        </section>

        {/* Section 12: Important Pricing Disclaimer */}
        <section className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-6 md:p-8 space-y-3 text-sm text-amber-950">
          <h2 className="text-lg md:text-xl font-bold text-amber-950 tracking-tight">
            Important Pricing Disclaimer
          </h2>
          <p className="leading-relaxed">
            The gold and silver prices displayed on this page represent indicative precious metals market quotations and are provided for informational purposes. Actual transaction prices may vary depending on metal purity, product type, dealer premiums, market conditions, shipping costs and applicable taxes.
          </p>
          <p className="leading-relaxed">
            Estimated metal values are not guaranteed buying or selling offers and do not include the additional value of craftsmanship, gemstones, collectible features or other product-specific attributes.
          </p>
          <p className="leading-relaxed font-medium text-xs text-amber-900">
            This information is not financial, investment, tax or trading advice. Always verify the applicable market quotation and transaction terms before making a purchase or sale.
          </p>
        </section>

        {/* Section 13: Related Resources / Contextual Internal Links */}
        <nav aria-label="Related Precious Metals Resources" className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-xs">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3">
            Related Precious Metals Resources
          </h3>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <Link
              href="/international/"
              className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            >
              International Market Rates &rarr;
            </Link>
            <Link
              href="/international/gold-silver-price/history/"
              className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition font-bold"
            >
              Gold &amp; Silver Price History (1970 - 2026) &rarr;
            </Link>
            <Link
              href="/international/gold-silver-ratio/"
              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition"
            >
              Gold-to-Silver Ratio &rarr;
            </Link>
            <Link
              href="/calculator/gold-converter/"
              className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition"
            >
              Gold Weight Converter &rarr;
            </Link>
            <Link
              href="/calculator/silver-converter/"
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition"
            >
              Silver Weight Converter &rarr;
            </Link>
          </div>
        </nav>

      </div>
    </main>
  );
}
