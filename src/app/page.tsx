import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { InstitutionalBlock } from '@/components/layout/InstitutionalBlock';
import { HomeHero } from './HomeHero';
import { RecentCalculators } from '@/components/layout/RecentCalculators';
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
        <section className="pt-1 pb-8 border-b border-[#dadce0] bg-[#F1F3F4]">
          <div className="hp-container">
            <div className="mb-6 max-w-4xl mx-auto text-center px-4 pt-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#202124] tracking-tight mb-4 leading-[1.1]">
                Free Online <span className="text-blue-600">Calculators</span>, Converters &amp; Digital Tools
              </h1>
              <p className="text-[15px] sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                NepaCalc provides free online calculators, converters and digital tools covering finance, engineering, education, health, science and Nepal-specific calculations. Designed for students, professionals, businesses and everyday users.
              </p>
            </div>

            <HomeHero />
          </div>
        </section>
        
        <main className="hp-container py-6">
          <RecentCalculators />
          
          <div className="bg-white border border-[#dadce0] rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-[#1a73e8] mb-4 border-b border-[#f1f3f4] pb-2">Market Rates &amp; Converters</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <Link href="/market-rates/live-gold-price/" className="p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-lg hover:border-[#1a73e8] hover:shadow-md transition-all group">
                <p className="text-[12px] font-black text-[#202124] group-hover:text-[#1a73e8]">Live Gold Price</p>
                <p className="text-[9px] text-slate-500 uppercase mt-1">Nepal Market</p>
              </Link>
              <Link href="/market-rates/live-silver-price/" className="p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-lg hover:border-[#1a73e8] hover:shadow-md transition-all group">
                <p className="text-[12px] font-black text-[#202124] group-hover:text-[#1a73e8]">Live Silver Price</p>
                <p className="text-[9px] text-slate-500 uppercase mt-1">Chandi Rate</p>
              </Link>
              <Link href="/calculator/gold-converter/" className="p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-lg hover:border-[#1a73e8] hover:shadow-md transition-all group">
                <p className="text-[12px] font-black text-[#202124] group-hover:text-[#1a73e8]">Gold Converter</p>
                <p className="text-[9px] text-slate-500 uppercase mt-1">Tola &amp; Gram</p>
              </Link>
              <Link href="/calculator/silver-converter/" className="p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-lg hover:border-[#1a73e8] hover:shadow-md transition-all group">
                <p className="text-[12px] font-black text-[#202124] group-hover:text-[#1a73e8]">Silver Converter</p>
                <p className="text-[9px] text-slate-500 uppercase mt-1">Weight &amp; Value</p>
              </Link>
              <Link href="/calculator/currency-converter/" className="p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-lg hover:border-[#1a73e8] hover:shadow-md transition-all group">
                <p className="text-[12px] font-black text-[#202124] group-hover:text-[#1a73e8]">Currency Converter</p>
                <p className="text-[9px] text-slate-500 uppercase mt-1">USD to NPR</p>
              </Link>
              <Link href="/market-rates/exchange-rate-nepal/" className="p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-lg hover:border-[#1a73e8] hover:shadow-md transition-all group">
                <p className="text-[12px] font-black text-[#202124] group-hover:text-[#1a73e8]">Exchange Rate</p>
                <p className="text-[9px] text-slate-500 uppercase mt-1">NRB Live Rates</p>
              </Link>
            </div>
          </div>

          {/* Quick Access Chips */}
          <nav aria-label="Quick access calculators" className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#70757a] shrink-0">Quick Access:</span>
            {[
              { label: 'Income Tax Calculator', href: '/calculator/nepal-income-tax/' },
              { label: 'Scientific Calculator', href: '/calculator/scientific-calculator/' },
              { label: 'Gold Price', href: '/market-rates/live-gold-price/' },
              { label: 'NEA Bill Calculator', href: '/calculator/nea-bill/' },
            ].map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className="px-3 py-1.5 bg-white border border-[#dadce0] rounded-full text-[12px] font-bold text-[#3c4043] hover:bg-[#e8f0fe] hover:text-[#1a73e8] hover:border-[#1a73e8] transition-all shadow-sm"
              >
                {chip.label}
              </Link>
            ))}
          </nav>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CATEGORIES.map(cat => {
              const catHref = cat.id === 'education' ? '/math-tools/' : cat.id === 'utility' ? '/converters/' : cat.id === 'market' ? '/market-rates/' : `/${cat.id}/`;
              return (
                <div key={cat.id} className="bg-white p-4 border border-[#dadce0] rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col h-full min-h-[340px]">
                  <Link href={catHref} className="block pb-2 mb-3">
                    <h2 className={`${cat.id === 'engineering' ? 'text-[#4361ee]' : 'text-[#1a73e8]'} text-[11px] font-black uppercase tracking-wider border-b border-[#f1f3f4] pb-2 hover:underline`}>
                      {cat.name}
                    </h2>
                  </Link>
                  <ul className="flex-grow">
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
                  <div className="mt-3 pt-2 border-t border-[#f1f3f4]">
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

