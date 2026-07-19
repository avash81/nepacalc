import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Calculator />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
          
          <p className="text-lg leading-relaxed mb-10">
            Navigating traditional jewelry measurements in Nepal can be confusing, especially when balancing historical local scales with modern metric weights. Whether you are auditing family heirlooms, calculating custom jewelry fabrication costs, or verifying weights against official benchmarks, accuracy is paramount. Our automated gold calculator simplifies the process, instantly converting between international Grams (g) and traditional domestic units: Tola, Aana, Ratti, and Lal. If you need current valuation, view today's <Link href="/market-rates/live-gold-price/" className="text-blue-600 hover:underline">live gold price in Nepal</Link>.
          </p>

          {/* ── Table of Contents ── */}
          <div className="bg-slate-50 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <ul className="list-none pl-0 space-y-2 text-blue-600 font-medium">
              <li><a href="#understanding-measurements" className="hover:underline">Understanding the Nepal Gold Measurement System</a></li>
              <li><a href="#conversion-table" className="hover:underline">Nepal Gold Conversion Table</a></li>
              <li><a href="#official-standard" className="hover:underline">Official Nepal Gold Measurement Standard</a></li>
              <li><a href="#formulas" className="hover:underline">Mathematical Conversion Constants & Formulas</a></li>
            </ul>
          </div>

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
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Traditional Unit</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Lal</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Grams (g)</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Tola Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">1 Lal</td><td className="py-2 px-4 border-b">1 Lal</td><td className="py-2 px-4 border-b">0.1166 g</td><td className="py-2 px-4 border-b">0.01 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">2 Lal</td><td className="py-2 px-4 border-b bg-slate-50">2 Lal</td><td className="py-2 px-4 border-b bg-slate-50">0.2333 g</td><td className="py-2 px-4 border-b bg-slate-50">0.02 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b">3 Lal</td><td className="py-2 px-4 border-b">3 Lal</td><td className="py-2 px-4 border-b">0.3499 g</td><td className="py-2 px-4 border-b">0.03 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">6.25 Lal (1 Aana)</td><td className="py-2 px-4 border-b bg-slate-50">6.25 Lal</td><td className="py-2 px-4 border-b bg-slate-50">0.7290 g</td><td className="py-2 px-4 border-b bg-slate-50">0.0625 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b">12.5 Lal (2 Aana)</td><td className="py-2 px-4 border-b">12.5 Lal</td><td className="py-2 px-4 border-b">1.4580 g</td><td className="py-2 px-4 border-b">0.125 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">15 Lal</td><td className="py-2 px-4 border-b bg-slate-50">15 Lal</td><td className="py-2 px-4 border-b bg-slate-50">1.7496 g</td><td className="py-2 px-4 border-b bg-slate-50">0.15 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b">40 Lal</td><td className="py-2 px-4 border-b">40 Lal</td><td className="py-2 px-4 border-b">4.6655 g</td><td className="py-2 px-4 border-b">0.40 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">50 Lal (8 Aana)</td><td className="py-2 px-4 border-b bg-slate-50">50 Lal</td><td className="py-2 px-4 border-b bg-slate-50">5.8319 g</td><td className="py-2 px-4 border-b bg-slate-50">0.50 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b">75 Lal (12 Aana)</td><td className="py-2 px-4 border-b">75 Lal</td><td className="py-2 px-4 border-b">8.7479 g</td><td className="py-2 px-4 border-b">0.75 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">90 Lal</td><td className="py-2 px-4 border-b bg-slate-50">90 Lal</td><td className="py-2 px-4 border-b bg-slate-50">10.4974 g</td><td className="py-2 px-4 border-b bg-slate-50">0.90 Tola</td></tr>
                <tr><td className="py-2 px-4 border-b font-bold">100 Lal (1 Tola)</td><td className="py-2 px-4 border-b">100 Lal</td><td className="py-2 px-4 border-b">11.6638 g</td><td className="py-2 px-4 border-b">1.00 Tola</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="official-standard" className="text-2xl font-black text-slate-900 mt-12 mb-6">Official Nepal Gold Measurement Standard</h2>
          <div className="mb-6 space-y-4">
            <p>
              Gold prices in Nepal change daily based on international bullion markets, USD exchange rates, and domestic demand. The <a href="https://www.fenegosida.org/" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline">Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)</a> publishes the official benchmark rates used by jewellery businesses across Nepal. This converter uses the official Nepal gold measurement system and is designed to work alongside the latest published market prices. You can also view the <Link href="/market-rates/live-silver-price/" className="text-blue-600 hover:underline">live silver price in Nepal</Link> for current silver rates.
            </p>
          </div>

          <h2 id="formulas" className="text-2xl font-black text-slate-900 mt-12 mb-6">Mathematical Conversion Constants & Formulas</h2>
          <div className="mb-6">
            <h3 className="font-bold text-slate-900 mb-2">How to Convert Lal to Gram</h3>
            <p className="mb-2">Because 1 Tola equals 100 Lal and weighs exactly 11.6638 grams, a single Lal is exceptionally light.</p>
            <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm border border-slate-200 mb-4 text-slate-800">Weight in Grams = Total Lal × 0.116638</div>
            <p className="mb-6"><strong>Example:</strong> If you want to find out how many grams are in 15 Lal: 15 × 0.116638 = 1.7495 grams.</p>

            <h3 className="font-bold text-slate-900 mb-2">How to Convert Gram to Lal</h3>
            <p className="mb-2">If you have a digital kitchen scale or a laboratory balance measuring an item in grams, translate it back to traditional units using this division formula. Additionally, if you are bringing commercial gold into the country, you can use our <Link href="/calculator/gold-tax/" className="text-blue-600 font-bold hover:underline">gold tax calculator</Link> to estimate customs duties.</p>
            <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm border border-slate-200 mb-4 text-slate-800">Weight in Lal = Weight in Grams ÷ 0.116638</div>
          </div>

        </div>
      </div>
    </>
  );
}
