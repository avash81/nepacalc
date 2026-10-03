import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

import fs from 'fs';
import path from 'path';

export const revalidate = 3600; // 1 hour

function getLiveDate() {
  try {
    const data = fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'live-rates.json'), 'utf8');
    const json = JSON.parse(data);
    return json.date || new Date().toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

export async function generateMetadata() {
  const rawDate = getLiveDate();
  return calcMeta({
    title: 'Nepal Gold Unit Converter – Tola, Lal, Aana & Gram Calculator',
    description: 'Convert Nepal gold weight instantly between Tola, Lal (Laal), Aana and Gram using the official Nepal gold measurement system. Free two-way Nepal Gold Unit Converter with accurate conversions and optional gold value calculation.',
    slug: 'gold-converter',
    canonical: 'https://nepacalc.com/calculator/gold-converter/',
    keywords: [
      'tola to gram converter', 'lal to gram nepal', 'gram to lal nepal',
      '1 lal in gram', '1 tola in lal', 'aana to gram converter',
      'gold weight converter nepal', 'nepal gold unit calculator',
      'gold jewelry auditor nepal', 'tola lal aana ratti converter',
      '15 lal in gram', '17 lal gold nepal', '40 lal in gram',
      'how many lal in 1 tola', 'gold converter fenegosida',
      'tejabi gold calculator', 'hallmark gold converter nepal',
      'laal gold unit nepal', 'metal retention efficiency'
    ],
  });
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://nepacalc.com/calculator/gold-converter/#breadcrumb",
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
      "name": "Calculators",
      "item": "https://nepacalc.com/calculator/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Nepal Gold Unit Converter",
      "item": "https://nepacalc.com/calculator/gold-converter/"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many grams are in 1 Tola of gold in Nepal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One Tola of gold equals 11.6638 grams according to the official Nepal gold measurement system. One Tola is also equal to 100 Lal or 16 Aana."
      }
    },
    {
      "@type": "Question",
      "name": "How many Lal are in 1 Gram?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1 Gram equals approximately 8.5735 Lal using the official Nepal gold measurement standard. You can convert Gram to Lal instantly using the Nepal Gold Unit Converter, which uses the official conversion factor based on 1 Tola = 11.6638 grams = 100 Lal."
      }
    },
    {
      "@type": "Question",
      "name": "How many Lal (Laal) are in 1 Tola?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One Tola contains exactly 100 Lal (Laal). This is the standard conversion used by jewellery shops and the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)."
      }
    },
    {
      "@type": "Question",
      "name": "How many Aana are in 1 Tola?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One Tola equals 16 Aana. Each Aana is equal to 6.25 Lal or approximately 0.729 grams."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert Gram to Lal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divide the weight in grams by 0.116638. Example: 1 gram = 8.5735 Lal, 5 grams = 42.87 Lal, 10 grams = 85.74 Lal. The Nepal Gold Unit Converter performs this calculation automatically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert Lal to Gram?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiply the total Lal by 0.116638. Example: 15 Lal = 1.7496 grams, 20 Lal = 2.3328 grams, 25 Lal = 2.9159 grams, 40 Lal = 4.6655 grams, 50 Lal = 5.8319 grams."
      }
    },
    {
      "@type": "Question",
      "name": "How many grams is 15 Lal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "15 Lal = 1.7496 grams, which is 0.15 Tola."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Hallmark and Tejabi gold?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hallmark gold is certified for purity and generally refers to 24K (99.9%) or other certified purity levels. Tejabi gold is traditionally 22K (91.6%) and is commonly used for jewellery because it is more durable than pure 24K gold."
      }
    },
    {
      "@type": "Question",
      "name": "Who sets gold rates in Nepal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daily gold prices in Nepal are published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). The Nepal Gold Unit Converter uses the official Nepal gold measurement system for accurate weight conversions, while current market prices should always be verified using the latest FENEGOSIDA rate."
      }
    }
  ]
};


// WebPage schema — freshness signal for Google AIO + crawlers
function getWebPageSchema(date: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/calculator/gold-converter/#webpage",
    "url": "https://nepacalc.com/calculator/gold-converter/",
    "name": "Nepal Gold Unit Converter – Tola, Lal, Aana & Gram Calculator",
    "description": "Convert Nepal gold weight instantly between Tola, Lal (Laal), Aana and Gram using the official Nepal gold measurement system (1 Tola = 11.6638g = 16 Aana = 100 Lal). Free, accurate, and updated daily.",
    "inLanguage": "en",
    "isPartOf": { "@id": "https://nepacalc.com/#website" },
    "breadcrumb": { "@id": "https://nepacalc.com/calculator/gold-converter/#breadcrumb" },
    "dateModified": date,
    "datePublished": "2024-01-01",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#intro", "#understanding-measurements", "#conversion-table"]
    },
    "mainEntity": { "@id": "https://nepacalc.com/calculator/gold-converter/#tool" }
  };
}

// SoftwareApplication schema — marks the page as a calculator tool for GEO/AIO
const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://nepacalc.com/calculator/gold-converter/#tool",
  "name": "Nepal Gold Unit Converter",
  "url": "https://nepacalc.com/calculator/gold-converter/",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NPR" },
  "description": "Free Nepal gold weight converter supporting Tola, Lal (Laal), Aana, Gram, Kilogram, and Troy Ounce. Uses FENEGOSIDA official standard: 1 Tola = 11.6638g = 16 Aana = 100 Lal.",
  "featureList": [
    "Tola to Gram conversion",
    "Gram to Lal conversion",
    "Aana to Gram conversion",
    "Lal to Tola conversion",
    "Troy Ounce to Tola conversion",
    "Kilogram to Tola conversion",
    "Live gold price integration",
    "Nepal FENEGOSIDA standard compliant"
  ],
  "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
  "publisher": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" }
};

// Dataset schema — makes conversion tables citable by AI engines (GEO)
const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": "https://nepacalc.com/calculator/gold-converter/#dataset",
  "name": "Nepal Gold Weight Conversion Reference Tables",
  "description": "Authoritative reference tables for Nepal gold unit conversions: Tola, Aana, Lal, Gram, Kilogram, Troy Ounce, and Milligram. Based on FENEGOSIDA official standard where 1 Tola = 11.6638 grams = 16 Aana = 100 Lal.",
  "url": "https://nepacalc.com/calculator/gold-converter/",
  "creator": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "variableMeasured": [
    "Tola", "Aana", "Lal", "Gram", "Kilogram", "Troy Ounce", "Milligram"
  ],
  "measurementTechnique": "Official FENEGOSIDA Nepal gold measurement standard",
  "hasPart": [
    { "@type": "Dataset", "name": "Core Nepal Gold Unit Conversion", "url": "https://nepacalc.com/calculator/gold-converter/#conversion-table" },
    { "@type": "Dataset", "name": "Tola to Gram Conversion Table", "url": "https://nepacalc.com/calculator/gold-converter/#tola-to-gram" },
    { "@type": "Dataset", "name": "Gram to Tola Conversion Table", "url": "https://nepacalc.com/calculator/gold-converter/#gram-to-tola" },
    { "@type": "Dataset", "name": "Aana to Lal Conversion Table", "url": "https://nepacalc.com/calculator/gold-converter/#aana-to-lal" },
    { "@type": "Dataset", "name": "Lal to Gram Conversion Table", "url": "https://nepacalc.com/calculator/gold-converter/#lal-to-gram" },
    { "@type": "Dataset", "name": "Kilogram to Tola Conversion Table", "url": "https://nepacalc.com/calculator/gold-converter/#kilogram-to-tola" },
    { "@type": "Dataset", "name": "Troy Ounce to Tola Conversion Table", "url": "https://nepacalc.com/calculator/gold-converter/#troy-oz-to-tola" },
    { "@type": "Dataset", "name": "Tola to Troy Ounce Conversion Table", "url": "https://nepacalc.com/calculator/gold-converter/#tola-to-troy-oz" },
    { "@type": "Dataset", "name": "Gram to Milligram Conversion Table", "url": "https://nepacalc.com/calculator/gold-converter/#gram-to-milligram" }
  ]
};

// HowTo schema — step-by-step instructions boost AEO/AIO featured snippets
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://nepacalc.com/calculator/gold-converter/#howto",
  "name": "How to Convert Nepal Gold Units (Tola, Lal, Aana, Gram)",
  "description": "Step-by-step guide to converting between Nepal gold weight units using the official FENEGOSIDA standard.",
  "totalTime": "PT1M",
  "tool": [{ "@type": "HowToTool", "name": "Nepal Gold Unit Converter at NepaCalc" }],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Identify your source unit",
      "text": "Determine whether your gold weight is in Tola, Lal, Aana, or Gram — the unit your jeweler or bill states."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Select the source unit in the converter",
      "text": "Open the Nepal Gold Unit Converter on this page and select your source unit (e.g. Tola) from the input fields."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Enter your weight value",
      "text": "Type the numeric weight value. All other units update instantly — no button needed."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Read your converted result",
      "text": "Read the converted weight in any unit: Gram, Aana, Lal, Tola, Troy Ounce, or Kilogram — shown simultaneously."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Use the manual formula if needed",
      "text": "To convert manually: Tola to Gram — multiply Tola × 11.6638. Lal to Gram — multiply Lal × 0.116638. Gram to Tola — divide Gram ÷ 11.6638."
    }
  ]
};

export default async function Page() {
  const rawDate = getLiveDate();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageSchema(rawDate)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Calculator />
      
      <div id="intro" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 items-start">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none min-w-0">
          
          <p className="text-lg leading-relaxed mb-10 scroll-mt-24" id="intro">
            Our Nepal Gold Unit Converter instantly converts between Tola, Lal, Aana, Gram, and Ratti using the official Nepal gold measurement standard. Whether you're buying jewellery, checking ornament weight, or converting traditional Nepali gold units into grams, the calculator provides instant and accurate results. Once you've converted your jewellery weight, check <Link href="/market-rates/live-gold-price/" className="text-blue-600 hover:underline">today's gold price</Link> to estimate its current market value.
          </p>

          {/* ── Table of Contents (Mobile) ── */}
          <nav className="lg:hidden bg-slate-50 rounded-xl p-6 mb-10 border border-slate-200">
            <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 font-mono">Contents</p>
            <ol className="list-none pl-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['#intro', 'Nepal Gold Unit Converter'],
                ['#understanding-measurements', 'Understanding the Nepal Gold Measurement System'],
                ['#conversion-table', 'Nepal Gold Conversion Table'],
                ['#official-standard', 'Official Nepal Gold Measurement Standard'],
                ['#formulas', 'Gold Conversion Formulas'],
                ['#related-tools', 'Related Tools'],
                ['#faqs', 'Frequently Asked Questions'],
              ].map(([href, label], i) => (
                <li key={href} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black font-mono flex items-center justify-center shrink-0">{i + 1}</span>
                  <a href={href} className="text-sm text-blue-600 font-medium hover:underline">{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <h2 id="understanding-measurements" className="text-2xl font-black text-slate-900 mt-12 mb-6">Understanding the Nepal Gold Measurement System (1 Tola = 100 Lal)</h2>
          <div className="mb-6">
            <p className="mb-4">
              In the Nepali gold market, the Tola (तोला) is the foundational baseline unit of mass. However, for smaller pieces of jewelry like rings, nose pins (Phuli), and earrings, jewelers break weights down into Aana and Lal (लाल).
            </p>
            <p className="mb-4">The structural mathematical relationship governing the official Nepal gold unit scale follows these exact ratios:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>1 Tola = 100 Lal</li>
              <li>1 Tola = 16 Aana</li>
              <li>1 Tola = 11.6638 Grams</li>
              <li>1 Aana = 6.25 Lal</li>
              <li>1 Lal = 0.116638 Grams (commonly rounded to 0.1166g)</li>
            </ul>
            <p>If a jeweler tells you an asset weighs 12 Aanas, that equates exactly to 75 Lal, which represents precisely 0.75 Tola of pure gold.</p>
          </div>

          <h2 id="conversion-table" className="text-2xl font-black text-slate-900 mt-12 mb-6">Nepal Gold Conversion Table</h2>
          <div className="overflow-x-auto mb-6 bg-white border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
                <caption className="sr-only">Core Nepal gold unit conversion table — Tola, Aana, Lal, Gram, Kilogram</caption>
              <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-2.5 px-4">Unit</th>
                  <th scope="col" className="py-2.5 px-4">Tola</th>
                  <th scope="col" className="py-2.5 px-4">Aana</th>
                  <th scope="col" className="py-2.5 px-4">Lal</th>
                  <th scope="col" className="py-2.5 px-4">Gram</th>
                  <th scope="col" className="py-2.5 px-4">Kilogram</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-4">1 Tola</td>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">16</td>
                  <td className="py-2 px-4">100</td>
                  <td className="py-2 px-4">11.6638</td>
                  <td className="py-2 px-4">0.0116638</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">1 Aana</td>
                  <td className="py-2 px-4">0.0625</td>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">6.25</td>
                  <td className="py-2 px-4">0.7289875</td>
                  <td className="py-2 px-4">0.0007289875</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">1 Lal</td>
                  <td className="py-2 px-4">0.01</td>
                  <td className="py-2 px-4">0.16</td>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">0.116638</td>
                  <td className="py-2 px-4">0.000116638</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">1 Gram</td>
                  <td className="py-2 px-4">0.085735</td>
                  <td className="py-2 px-4">1.37176</td>
                  <td className="py-2 px-4">8.57350</td>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">0.001</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">10 Gram</td>
                  <td className="py-2 px-4">0.85735</td>
                  <td className="py-2 px-4">13.7176</td>
                  <td className="py-2 px-4">85.7350</td>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">0.010</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">100 Gram</td>
                  <td className="py-2 px-4">8.57350</td>
                  <td className="py-2 px-4">137.176</td>
                  <td className="py-2 px-4">857.350</td>
                  <td className="py-2 px-4">100</td>
                  <td className="py-2 px-4">0.100</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">1 Kilogram</td>
                  <td className="py-2 px-4">85.7350</td>
                  <td className="py-2 px-4">1,371.76</td>
                  <td className="py-2 px-4">8,573.50</td>
                  <td className="py-2 px-4">1,000</td>
                  <td className="py-2 px-4">1</td>
                </tr>
              </tbody>
            </table>
          </div>

          
          <h3 id="tola-to-gram" className="font-bold text-slate-900 mb-2 mt-8">1. Tola → Gram / Aana / Lal</h3>
          <div className="overflow-x-auto mb-6 bg-white border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
                <caption className="sr-only">Tola to Gram, Aana and Lal conversion table — Nepal gold units</caption>
                <caption className="sr-only">Tola to Gram, Aana and Lal conversion table — Nepal gold units</caption>
              <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-2.5 px-4">Tola</th>
                  <th scope="col" className="py-2.5 px-4">Gram</th>
                  <th scope="col" className="py-2.5 px-4">Aana</th>
                  <th scope="col" className="py-2.5 px-4">Lal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-4">0.01</td>
                  <td className="py-2 px-4">0.116638</td>
                  <td className="py-2 px-4">0.16</td>
                  <td className="py-2 px-4">1</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.05</td>
                  <td className="py-2 px-4">0.583190</td>
                  <td className="py-2 px-4">0.80</td>
                  <td className="py-2 px-4">5</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">0.10</td>
                  <td className="py-2 px-4">1.166380</td>
                  <td className="py-2 px-4">1.60</td>
                  <td className="py-2 px-4">10</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.25</td>
                  <td className="py-2 px-4">2.915950</td>
                  <td className="py-2 px-4">4.00</td>
                  <td className="py-2 px-4">25</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">0.50</td>
                  <td className="py-2 px-4">5.831900</td>
                  <td className="py-2 px-4">8.00</td>
                  <td className="py-2 px-4">50</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.75</td>
                  <td className="py-2 px-4">8.747850</td>
                  <td className="py-2 px-4">12.00</td>
                  <td className="py-2 px-4">75</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">11.663800</td>
                  <td className="py-2 px-4">16.00</td>
                  <td className="py-2 px-4">100</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">1.25</td>
                  <td className="py-2 px-4">14.579750</td>
                  <td className="py-2 px-4">20.00</td>
                  <td className="py-2 px-4">125</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">1.50</td>
                  <td className="py-2 px-4">17.495700</td>
                  <td className="py-2 px-4">24.00</td>
                  <td className="py-2 px-4">150</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">2</td>
                  <td className="py-2 px-4">23.327600</td>
                  <td className="py-2 px-4">32.00</td>
                  <td className="py-2 px-4">200</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">2.50</td>
                  <td className="py-2 px-4">29.159500</td>
                  <td className="py-2 px-4">40.00</td>
                  <td className="py-2 px-4">250</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">3</td>
                  <td className="py-2 px-4">34.991400</td>
                  <td className="py-2 px-4">48.00</td>
                  <td className="py-2 px-4">300</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">4</td>
                  <td className="py-2 px-4">46.655200</td>
                  <td className="py-2 px-4">64.00</td>
                  <td className="py-2 px-4">400</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">58.319000</td>
                  <td className="py-2 px-4">80.00</td>
                  <td className="py-2 px-4">500</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">116.638000</td>
                  <td className="py-2 px-4">160.00</td>
                  <td className="py-2 px-4">1,000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">20</td>
                  <td className="py-2 px-4">233.276000</td>
                  <td className="py-2 px-4">320.00</td>
                  <td className="py-2 px-4">2,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">50</td>
                  <td className="py-2 px-4">583.190000</td>
                  <td className="py-2 px-4">800.00</td>
                  <td className="py-2 px-4">5,000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">100</td>
                  <td className="py-2 px-4">1,166.380000</td>
                  <td className="py-2 px-4">1,600.00</td>
                  <td className="py-2 px-4">10,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="gram-to-tola" className="font-bold text-slate-900 mb-2 mt-8">2. Gram → Tola / Aana / Lal</h3>
          <div className="overflow-x-auto mb-6 bg-white border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
                <caption className="sr-only">Gram to Tola, Aana and Lal conversion table — Nepal gold units</caption>
                <caption className="sr-only">Gram to Tola, Aana and Lal conversion table — Nepal gold units</caption>
              <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-2.5 px-4">Gram</th>
                  <th scope="col" className="py-2.5 px-4">Tola</th>
                  <th scope="col" className="py-2.5 px-4">Aana</th>
                  <th scope="col" className="py-2.5 px-4">Lal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-4">0.1</td>
                  <td className="py-2 px-4">0.008573</td>
                  <td className="py-2 px-4">0.13718</td>
                  <td className="py-2 px-4">0.85735</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.25</td>
                  <td className="py-2 px-4">0.021434</td>
                  <td className="py-2 px-4">0.34294</td>
                  <td className="py-2 px-4">2.14338</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">0.5</td>
                  <td className="py-2 px-4">0.042868</td>
                  <td className="py-2 px-4">0.68588</td>
                  <td className="py-2 px-4">4.28675</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">0.085735</td>
                  <td className="py-2 px-4">1.37176</td>
                  <td className="py-2 px-4">8.57350</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">2</td>
                  <td className="py-2 px-4">0.171470</td>
                  <td className="py-2 px-4">2.74352</td>
                  <td className="py-2 px-4">17.14700</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">3</td>
                  <td className="py-2 px-4">0.257205</td>
                  <td className="py-2 px-4">4.11528</td>
                  <td className="py-2 px-4">25.72050</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">0.428675</td>
                  <td className="py-2 px-4">6.85880</td>
                  <td className="py-2 px-4">42.86750</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">0.857350</td>
                  <td className="py-2 px-4">13.71760</td>
                  <td className="py-2 px-4">85.73500</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">20</td>
                  <td className="py-2 px-4">1.714700</td>
                  <td className="py-2 px-4">27.43520</td>
                  <td className="py-2 px-4">171.47000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">25</td>
                  <td className="py-2 px-4">2.143375</td>
                  <td className="py-2 px-4">34.29400</td>
                  <td className="py-2 px-4">214.33750</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">30</td>
                  <td className="py-2 px-4">2.572050</td>
                  <td className="py-2 px-4">41.15280</td>
                  <td className="py-2 px-4">257.20500</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">40</td>
                  <td className="py-2 px-4">3.429400</td>
                  <td className="py-2 px-4">54.87040</td>
                  <td className="py-2 px-4">342.94000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">50</td>
                  <td className="py-2 px-4">4.286750</td>
                  <td className="py-2 px-4">68.58800</td>
                  <td className="py-2 px-4">428.67500</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">75</td>
                  <td className="py-2 px-4">6.430125</td>
                  <td className="py-2 px-4">102.88200</td>
                  <td className="py-2 px-4">642.78750</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">100</td>
                  <td className="py-2 px-4">8.573500</td>
                  <td className="py-2 px-4">137.17600</td>
                  <td className="py-2 px-4">857.35000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">250</td>
                  <td className="py-2 px-4">21.433750</td>
                  <td className="py-2 px-4">342.94000</td>
                  <td className="py-2 px-4">2,143.37500</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">500</td>
                  <td className="py-2 px-4">42.867500</td>
                  <td className="py-2 px-4">685.88000</td>
                  <td className="py-2 px-4">4,286.75000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">1,000</td>
                  <td className="py-2 px-4">85.735000</td>
                  <td className="py-2 px-4">1,371.76000</td>
                  <td className="py-2 px-4">8,573.50000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="aana-to-lal" className="font-bold text-slate-900 mb-2 mt-8">3. Aana → Lal / Gram / Tola</h3>
          <div className="overflow-x-auto mb-6 bg-white border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
                <caption className="sr-only">Aana to Lal, Gram and Tola conversion table — Nepal gold units</caption>
                <caption className="sr-only">Aana to Lal, Gram and Tola conversion table — Nepal gold units</caption>
              <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-2.5 px-4">Aana</th>
                  <th scope="col" className="py-2.5 px-4">Lal</th>
                  <th scope="col" className="py-2.5 px-4">Gram</th>
                  <th scope="col" className="py-2.5 px-4">Tola</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">6.25</td>
                  <td className="py-2 px-4">0.7289875</td>
                  <td className="py-2 px-4">0.0625</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">2</td>
                  <td className="py-2 px-4">12.50</td>
                  <td className="py-2 px-4">1.4579750</td>
                  <td className="py-2 px-4">0.1250</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">3</td>
                  <td className="py-2 px-4">18.75</td>
                  <td className="py-2 px-4">2.1869625</td>
                  <td className="py-2 px-4">0.1875</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">4</td>
                  <td className="py-2 px-4">25.00</td>
                  <td className="py-2 px-4">2.9159500</td>
                  <td className="py-2 px-4">0.2500</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">31.25</td>
                  <td className="py-2 px-4">3.6449375</td>
                  <td className="py-2 px-4">0.3125</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">6</td>
                  <td className="py-2 px-4">37.50</td>
                  <td className="py-2 px-4">4.3739250</td>
                  <td className="py-2 px-4">0.3750</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">7</td>
                  <td className="py-2 px-4">43.75</td>
                  <td className="py-2 px-4">5.1029125</td>
                  <td className="py-2 px-4">0.4375</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">8</td>
                  <td className="py-2 px-4">50.00</td>
                  <td className="py-2 px-4">5.8319000</td>
                  <td className="py-2 px-4">0.5000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">9</td>
                  <td className="py-2 px-4">56.25</td>
                  <td className="py-2 px-4">6.5608875</td>
                  <td className="py-2 px-4">0.5625</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">62.50</td>
                  <td className="py-2 px-4">7.2898750</td>
                  <td className="py-2 px-4">0.6250</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">11</td>
                  <td className="py-2 px-4">68.75</td>
                  <td className="py-2 px-4">8.0188625</td>
                  <td className="py-2 px-4">0.6875</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">12</td>
                  <td className="py-2 px-4">75.00</td>
                  <td className="py-2 px-4">8.7478500</td>
                  <td className="py-2 px-4">0.7500</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">13</td>
                  <td className="py-2 px-4">81.25</td>
                  <td className="py-2 px-4">9.4768375</td>
                  <td className="py-2 px-4">0.8125</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">14</td>
                  <td className="py-2 px-4">87.50</td>
                  <td className="py-2 px-4">10.2058250</td>
                  <td className="py-2 px-4">0.8750</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">15</td>
                  <td className="py-2 px-4">93.75</td>
                  <td className="py-2 px-4">10.9348125</td>
                  <td className="py-2 px-4">0.9375</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">16</td>
                  <td className="py-2 px-4">100.00</td>
                  <td className="py-2 px-4">11.6638000</td>
                  <td className="py-2 px-4">1.0000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="lal-to-gram" className="font-bold text-slate-900 mb-2 mt-8">4. Lal → Gram / Aana / Tola</h3>
          <div className="overflow-x-auto mb-6 bg-white border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
                <caption className="sr-only">Lal to Gram, Aana and Tola conversion table — Nepal gold units</caption>
                <caption className="sr-only">Lal to Gram, Aana and Tola conversion table — Nepal gold units</caption>
              <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-2.5 px-4">Lal</th>
                  <th scope="col" className="py-2.5 px-4">Gram</th>
                  <th scope="col" className="py-2.5 px-4">Aana</th>
                  <th scope="col" className="py-2.5 px-4">Tola</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">0.116638</td>
                  <td className="py-2 px-4">0.16</td>
                  <td className="py-2 px-4">0.01</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">0.583190</td>
                  <td className="py-2 px-4">0.80</td>
                  <td className="py-2 px-4">0.05</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">1.166380</td>
                  <td className="py-2 px-4">1.60</td>
                  <td className="py-2 px-4">0.10</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">15</td>
                  <td className="py-2 px-4">1.749570</td>
                  <td className="py-2 px-4">2.40</td>
                  <td className="py-2 px-4">0.15</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">20</td>
                  <td className="py-2 px-4">2.332760</td>
                  <td className="py-2 px-4">3.20</td>
                  <td className="py-2 px-4">0.20</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">25</td>
                  <td className="py-2 px-4">2.915950</td>
                  <td className="py-2 px-4">4.00</td>
                  <td className="py-2 px-4">0.25</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">30</td>
                  <td className="py-2 px-4">3.499140</td>
                  <td className="py-2 px-4">4.80</td>
                  <td className="py-2 px-4">0.30</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">40</td>
                  <td className="py-2 px-4">4.665520</td>
                  <td className="py-2 px-4">6.40</td>
                  <td className="py-2 px-4">0.40</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">50</td>
                  <td className="py-2 px-4">5.831900</td>
                  <td className="py-2 px-4">8.00</td>
                  <td className="py-2 px-4">0.50</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">60</td>
                  <td className="py-2 px-4">6.998280</td>
                  <td className="py-2 px-4">9.60</td>
                  <td className="py-2 px-4">0.60</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">70</td>
                  <td className="py-2 px-4">8.164660</td>
                  <td className="py-2 px-4">11.20</td>
                  <td className="py-2 px-4">0.70</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">75</td>
                  <td className="py-2 px-4">8.747850</td>
                  <td className="py-2 px-4">12.00</td>
                  <td className="py-2 px-4">0.75</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">80</td>
                  <td className="py-2 px-4">9.331040</td>
                  <td className="py-2 px-4">12.80</td>
                  <td className="py-2 px-4">0.80</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">90</td>
                  <td className="py-2 px-4">10.497420</td>
                  <td className="py-2 px-4">14.40</td>
                  <td className="py-2 px-4">0.90</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">100</td>
                  <td className="py-2 px-4">11.663800</td>
                  <td className="py-2 px-4">16.00</td>
                  <td className="py-2 px-4">1.00</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">125</td>
                  <td className="py-2 px-4">14.579750</td>
                  <td className="py-2 px-4">20.00</td>
                  <td className="py-2 px-4">1.25</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">150</td>
                  <td className="py-2 px-4">17.495700</td>
                  <td className="py-2 px-4">24.00</td>
                  <td className="py-2 px-4">1.50</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">200</td>
                  <td className="py-2 px-4">23.327600</td>
                  <td className="py-2 px-4">32.00</td>
                  <td className="py-2 px-4">2.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="kilogram-to-tola" className="font-bold text-slate-900 mb-2 mt-8">5. Common Kilogram → Gram / Tola</h3>
          <div className="overflow-x-auto mb-6 bg-white border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
                <caption className="sr-only">Kilogram to Gram and Tola conversion table — Nepal gold units</caption>
                <caption className="sr-only">Kilogram to Gram and Tola conversion table — Nepal gold units</caption>
              <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-2.5 px-4">Kilogram</th>
                  <th scope="col" className="py-2.5 px-4">Gram</th>
                  <th scope="col" className="py-2.5 px-4">Tola</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-4">0.01</td>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">0.857350</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.025</td>
                  <td className="py-2 px-4">25</td>
                  <td className="py-2 px-4">2.143375</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">0.05</td>
                  <td className="py-2 px-4">50</td>
                  <td className="py-2 px-4">4.286750</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.10</td>
                  <td className="py-2 px-4">100</td>
                  <td className="py-2 px-4">8.573500</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">0.25</td>
                  <td className="py-2 px-4">250</td>
                  <td className="py-2 px-4">21.433750</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.50</td>
                  <td className="py-2 px-4">500</td>
                  <td className="py-2 px-4">42.867500</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">0.75</td>
                  <td className="py-2 px-4">750</td>
                  <td className="py-2 px-4">64.301250</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">1,000</td>
                  <td className="py-2 px-4">85.735000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">2</td>
                  <td className="py-2 px-4">2,000</td>
                  <td className="py-2 px-4">171.470000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">5,000</td>
                  <td className="py-2 px-4">428.675000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">10,000</td>
                  <td className="py-2 px-4">857.350000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="troy-oz-to-tola" className="font-bold text-slate-900 mb-2 mt-8">6. Troy Ounce → Gram / Tola</h3>
          <div className="overflow-x-auto mb-6 bg-white border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
                <caption className="sr-only">Troy Ounce to Gram and Tola conversion table — international gold weights</caption>
                <caption className="sr-only">Troy Ounce to Gram and Tola conversion table — international gold weights</caption>
              <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-2.5 px-4">Troy Oz</th>
                  <th scope="col" className="py-2.5 px-4">Grams</th>
                  <th scope="col" className="py-2.5 px-4">Tola</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-4">0.25</td>
                  <td className="py-2 px-4">7.775869</td>
                  <td className="py-2 px-4">0.666667</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.50</td>
                  <td className="py-2 px-4">15.551738</td>
                  <td className="py-2 px-4">1.333333</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">0.75</td>
                  <td className="py-2 px-4">23.327608</td>
                  <td className="py-2 px-4">2.000000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">31.103477</td>
                  <td className="py-2 px-4">2.666667</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">2</td>
                  <td className="py-2 px-4">62.206954</td>
                  <td className="py-2 px-4">5.333333</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">3</td>
                  <td className="py-2 px-4">93.310430</td>
                  <td className="py-2 px-4">8.000000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">4</td>
                  <td className="py-2 px-4">124.413907</td>
                  <td className="py-2 px-4">10.666667</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">155.517384</td>
                  <td className="py-2 px-4">13.333333</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">311.034768</td>
                  <td className="py-2 px-4">26.666667</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="tola-to-troy-oz" className="font-bold text-slate-900 mb-2 mt-8">7. Tola → Troy Ounce</h3>
          <div className="overflow-x-auto mb-6 bg-white border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
                <caption className="sr-only">Tola to Troy Ounce conversion table — Nepal gold to international weights</caption>
                <caption className="sr-only">Tola to Troy Ounce conversion table — Nepal gold to international weights</caption>
              <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-2.5 px-4">Tola</th>
                  <th scope="col" className="py-2.5 px-4">Grams</th>
                  <th scope="col" className="py-2.5 px-4">Troy Oz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-4">0.25</td>
                  <td className="py-2 px-4">2.915950</td>
                  <td className="py-2 px-4">0.093750</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.50</td>
                  <td className="py-2 px-4">5.831900</td>
                  <td className="py-2 px-4">0.187500</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">0.75</td>
                  <td className="py-2 px-4">8.747850</td>
                  <td className="py-2 px-4">0.281250</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">11.663800</td>
                  <td className="py-2 px-4">0.375000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">2</td>
                  <td className="py-2 px-4">23.327600</td>
                  <td className="py-2 px-4">0.750000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">3</td>
                  <td className="py-2 px-4">34.991400</td>
                  <td className="py-2 px-4">1.125000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">4</td>
                  <td className="py-2 px-4">46.655200</td>
                  <td className="py-2 px-4">1.500000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">58.319000</td>
                  <td className="py-2 px-4">1.875000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">116.638000</td>
                  <td className="py-2 px-4">3.750000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">20</td>
                  <td className="py-2 px-4">233.276000</td>
                  <td className="py-2 px-4">7.500000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="gram-to-milligram" className="font-bold text-slate-900 mb-2 mt-8">8. Gram → Milligram</h3>
          <div className="overflow-x-auto mb-6 bg-white border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
                <caption className="sr-only">Gram to Milligram conversion table — gold weight reference</caption>
                <caption className="sr-only">Gram to Milligram conversion table — gold weight reference</caption>
              <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-2.5 px-4">Gram</th>
                  <th scope="col" className="py-2.5 px-4">Milligram</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-4">0.1</td>
                  <td className="py-2 px-4">100</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">0.25</td>
                  <td className="py-2 px-4">250</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">0.5</td>
                  <td className="py-2 px-4">500</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">1,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">2</td>
                  <td className="py-2 px-4">2,000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">5,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">10,000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">20</td>
                  <td className="py-2 px-4">20,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">50</td>
                  <td className="py-2 px-4">50,000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">100</td>
                  <td className="py-2 px-4">100,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">250</td>
                  <td className="py-2 px-4">250,000</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-4">500</td>
                  <td className="py-2 px-4">500,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">1,000</td>
                  <td className="py-2 px-4">1,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="official-standard" className="text-2xl font-black text-slate-900 mt-12 mb-6">Official Nepal Gold Measurement Standard (FENEGOSIDA & NBSM)</h2>
          <div className="mb-6 space-y-4">
            <p>
              Gold prices in Nepal change daily based on international bullion markets, USD exchange rates, and domestic demand. The <a href="https://www.fenegosida.org/" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline">Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)</a> publishes the official benchmark rates used by jewellery businesses across Nepal. This converter uses the official Nepal gold measurement system and is designed to work alongside the latest published market prices. Investors often compare precious metals before buying, so you can also view today's <Link href="/market-rates/silver-price-nepal/" className="text-blue-600 hover:underline">Live Silver Price in Nepal</Link>.
            </p>
          </div>

          <h2 id="formulas" className="text-2xl font-black text-slate-900 mt-12 mb-6">Gold Conversion Formulas</h2>
          <div className="mb-6">
            <h3 className="font-bold text-slate-900 mb-2">How to Convert Lal to Gram</h3>
            <p className="mb-2">Because 1 Tola equals 100 Lal and weighs exactly 11.6638 grams, a single Lal is exceptionally light.</p>
            <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm border border-slate-200 mb-4 text-slate-800">Weight in Grams = Total Lal × 0.116638</div>
            <p className="mb-6"><strong>Example:</strong> If you want to find out how many grams are in 15 Lal: 15 × 0.116638 = 1.7495 grams.</p>

            <h3 className="font-bold text-slate-900 mb-2">How to Convert Gram to Lal</h3>
            <p className="mb-2">If you have a digital kitchen scale or a laboratory balance measuring an item in grams, translate it back to traditional units using this division formula.</p>
            <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm border border-slate-200 mb-4 text-slate-800">Weight in Lal = Weight in Grams ÷ 0.116638</div>
          </div>

          <h2 id="related-tools" className="text-2xl font-black text-slate-900 mt-12 mb-6">Compare Gold and Silver</h2>
          <div className="mb-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Related Precious Metal Calculator</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Need to convert silver instead of gold? Use our <Link href="/calculator/silver-converter/" className="text-blue-600 hover:underline font-medium">Silver Converter</Link> to convert between Tola, Gram, Lal, Aana, Kilogram, Troy Ounce, and other international weight units. It also estimates silver value using the latest market price and selected purity.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/calculator/silver-converter/" className="px-5 py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">
                Silver Converter
              </Link>
              <Link href="/market-rates/silver-price-nepal/" className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                Live Silver Price Today
              </Link>
            </div>
          </div>

          <h2 id="faqs" className="text-2xl font-black text-slate-900 mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, index) => (
              <div key={index} className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">{faq.name}</h3>
                <p className="text-slate-700 leading-relaxed text-[15px]">{faq.acceptedAnswer.text}</p>
              </div>
            ))}

          </div>



        </div>
        
        {/* Desktop TOC */}
        <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="pr-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 font-mono">Contents</p>
            <ol className="list-none pl-0 border-l-2 border-slate-200 space-y-2">
              {[
                ['#intro', 'Nepal Gold Unit Converter'],
                ['#understanding-measurements', 'Understanding the Nepal Gold Measurement System'],
                ['#conversion-table', 'Nepal Gold Conversion Table'],
                ['#official-standard', 'Official Nepal Gold Measurement Standard'],
                ['#formulas', 'Gold Conversion Formulas'],
                ['#related-tools', 'Related Tools'],
                ['#faqs', 'Frequently Asked Questions'],
              ].map(([href, label], i) => (
                <li key={href} className="pl-4">
                  <a href={href} className="text-[13px] text-slate-500 hover:text-blue-600 hover:font-bold transition-colors block py-1 border-l-2 -ml-[18px] pl-[16px] border-transparent hover:border-blue-600">
                    <span className="font-mono text-[10px] mr-2 text-slate-400">{i + 1}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </>
  );
}


