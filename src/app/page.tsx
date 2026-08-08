import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { InstitutionalBlock } from '@/components/layout/InstitutionalBlock';
import { HeroSearch } from '@/components/ui/HeroSearch';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Calculators, Converters & Tools | NepaCalc',
  description:
    'Free online calculators, converters and digital tools for finance, engineering, education, health and Nepal-specific calculations. Fast, accurate and mobile-friendly.',
  alternates: {
    canonical: 'https://nepacalc.com/',
  }
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://nepacalc.com/#collectionpage",
  "name": "Free Online Calculators, Converters & Tools | NepaCalc",
  "url": "https://nepacalc.com/",
  "description": "Free online calculators, converters and digital tools for finance, engineering, education, health and Nepal-specific calculations.",
  "publisher": { "@id": "https://nepacalc.com/#organization" },
  "isPartOf": { "@id": "https://nepacalc.com/#website" }
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://nepacalc.com/#calculator-categories",
  "name": "Calculator Categories on NepaCalc",
  "description": "All calculator categories on NepaCalc — finance, engineering, education, health, Nepal tools, converters and market rates.",
  "numberOfItems": 7,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Nepal Specific Calculators", "url": "https://nepacalc.com/nepal/" },
    { "@type": "ListItem", "position": 2, "name": "Finance & Tax Calculators", "url": "https://nepacalc.com/finance/" },
    { "@type": "ListItem", "position": 3, "name": "Math & Education Tools", "url": "https://nepacalc.com/math-tools/" },
    { "@type": "ListItem", "position": 4, "name": "Engineering Calculators", "url": "https://nepacalc.com/engineering/" },
    { "@type": "ListItem", "position": 5, "name": "Health & Fitness Calculators", "url": "https://nepacalc.com/health/" },
    { "@type": "ListItem", "position": 6, "name": "Converters & Utilities", "url": "https://nepacalc.com/converters/" },
    { "@type": "ListItem", "position": 7, "name": "Market Rates & Financial Data", "url": "https://nepacalc.com/market-rates/" }
  ]
};

const faqSchema = {
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    {
      "@type":"Question",
      "name":"What is NepaCalc?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"NepaCalc is a Nepal-focused platform providing free online calculators, converters, tax tools, electricity bill calculators, educational tools, engineering calculators and market rate tracking."
      }
    },
    {
      "@type":"Question",
      "name":"Are NepaCalc calculators free?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"Yes. All public calculators and tools on NepaCalc are available free of charge."
      }
    },
    {
      "@type":"Question",
      "name":"How accurate are NepaCalc calculators?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"NepaCalc calculators use published formulas and official references where applicable, including government agencies and recognized institutions."
      }
    },
    {
      "@type":"Question",
      "name":"Can I calculate my NEA electricity bill on NepaCalc?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"Yes. NepaCalc provides an NEA Electricity Bill Calculator using current tariff structures."
      }
    },
    {
      "@type":"Question",
      "name":"Does NepaCalc provide live gold prices?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"Yes. NepaCalc publishes official benchmark gold and silver rates based on FENEGOSIDA reference data."
      }
    }
  ]
};

export default function HomePage() {
  return (
    <>
            <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionPageSchema, itemListSchema, faqSchema])
        }}
      />
      
      <div className="min-h-screen bg-[#F1F3F4]">
        <section className="pt-2 pb-4 border-b border-[#dadce0] bg-[#F1F3F4]">
          <div className="hp-container">
            <div className="max-w-5xl mx-auto text-center px-4 pt-2">
              <h1 className="text-base sm:text-xl md:text-2xl lg:text-[26px] font-black text-[#202124] tracking-tight mb-2 leading-tight">
                Free Online <span className="text-blue-600">Calculators</span>, Converters &amp; Digital Tools
              </h1>
              <p className="text-[14px] sm:text-[15px] text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto mb-4">
                NepaCalc provides free online calculators, converters and digital tools covering finance, engineering, education, health, science and Nepal-specific calculations. Designed for students, professionals, businesses and everyday users.
              </p>
              <div className="flex justify-center">
                <HeroSearch />
              </div>
            </div>
          </div>
        </section>
        <main className="hp-container pt-4 pb-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 [grid-auto-rows:1fr]">
            {CATEGORIES.map(cat => {
              const catHref = cat.id === 'education' ? '/math-tools/' : cat.id === 'utility' ? '/converters/' : cat.id === 'market' ? '/market-rates/' : `/${cat.id}/`;
              return (
                <div key={cat.id} className="bg-white p-4 border border-[#dadce0] rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <Link href={catHref} className="block pb-2 mb-3 shrink-0">
                    <h2 className={`${cat.id === 'engineering' ? 'text-[#4361ee]' : 'text-[#1a73e8]'} text-[11px] font-black uppercase tracking-wider border-b border-[#f1f3f4] pb-2 hover:underline`}>
                      {cat.name}
                    </h2>
                  </Link>
                  <ul className="flex-1">
                    {cat.calculators.slice(0, 8).map(calc => {
                      const href = calc.slug.includes('/') ? `/${calc.slug}/` : `/calculator/${calc.slug}/`;
                      return (
                        <li key={calc.id}>
                          <Link
                            href={href}
                            className="text-[13px] text-[#3c4043] hover:text-[#1a73e8] hover:underline truncate flex items-center justify-between py-1.5 group"
                          >
                            <span className="truncate">{calc.name}</span>
                            {calc.isNew && (
                              <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[8px] font-black rounded uppercase tracking-tighter shrink-0">New</span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-auto pt-3 border-t border-[#f1f3f4] shrink-0">
                    <Link href={catHref} className="text-[9px] font-bold text-[#1a73e8] hover:underline uppercase tracking-widest flex items-center gap-1">
                      View All &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12">
             <InstitutionalBlock />
          </div>
        </main>
      </div>
    </>
  );
}


