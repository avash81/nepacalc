import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Nepal Gold Unit Converter: Tola, Lal, Aana & Gram Calculator | NepaCalc',
  description: 'Convert gold weight instantly between Tola, Lal (Laal), Aana, Ratti and Grams. Bidirectional Nepal gold converter with live FENEGOSIDA rates. 1 Tola = 100 Lal = 11.6638g.',
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
      "name": "Gold Converter",
      "item": "https://nepacalc.com/calculator/gold-converter/"
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Calculator />
      {/* Bidirectional SEO Link — back to authority page */}
      <div className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-[12px] text-slate-500 font-medium">
          Looking for today&apos;s rate?{' '}
          <a href="/market-rates/live-gold-price/" className="text-amber-700 font-bold underline hover:text-amber-900">
            View Live Gold Price in Nepal (FENEGOSIDA)
          </a>
        </p>
      </div>
    </div>
  );
}
