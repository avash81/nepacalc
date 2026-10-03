const fs = require('fs');

let content = fs.readFileSync('src/app/calculator/gold-converter/page.tsx', 'utf8');

// ── NEW SCHEMAS ──────────────────────────────────────────────────────────────

const newSchemas = `
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
`;

// ── INJECT SCHEMAS INTO FILE ────────────────────────────────────────────────

// 1. Insert new schema const definitions right before the `export default async function Page()`
const insertBefore = 'export default async function Page()';
content = content.replace(insertBefore, newSchemas + '\n' + insertBefore);

// 2. Update the Page function signature and add rawDate usage for WebPage schema
// The rawDate is already declared inside Page(). We need to inject 3 new <script> tags
// right after the existing 2 script tags.

const afterFaqScript = `dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />`;
const afterFaqScriptReplacement = `dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
      />`;

content = content.replace(afterFaqScript, afterFaqScriptReplacement);

// 3. Add id="intro" to the first meaningful section so speakable selector works
content = content.replace(
  '<div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 items-start">',
  '<div id="intro" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 items-start">'
);

fs.writeFileSync('src/app/calculator/gold-converter/page.tsx', content);
console.log('Done — WebPage, SoftwareApplication, Dataset, HowTo schemas injected.');
