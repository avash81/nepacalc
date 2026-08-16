import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { InstitutionalBlock } from '@/components/layout/InstitutionalBlock';
import { SearchBar } from '@/components/ui/SearchBar';
import { JsonLd } from '@/components/seo/JsonLd';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Calculators, Converters & Live Rates | NepaCalc',
  description:
    '100+ free calculators, converters and live rates for gold, silver and currency, with finance, math, health, engineering, education and Nepal tools.',
  alternates: {
    canonical: 'https://nepacalc.com/',
  }
};


export default function HomePage() {
  return (
    <>
      <JsonLd
        type="unified"
        data={{
          url: 'https://nepacalc.com/',
          webpage: {
            url: 'https://nepacalc.com/',
            name: 'Free Online Calculators, Converters & Live Rates | NepaCalc',
            description: 'Free online calculators, converters and useful tools for math, finance, education, health, engineering and everyday calculations.',
            isPartOf: 'https://nepacalc.com/#website',
            mainEntity: 'https://nepacalc.com/#collection'
          },
          collection: {
            url: 'https://nepacalc.com/',
            name: 'Free Online Calculators, Converters & Tools | NepaCalc',
            description: 'Free online calculators, converters and digital tools for finance, engineering, education, health and Nepal-specific calculations.',
            about: 'Online calculators and converters',
          },
          itemList: {
            url: 'https://nepacalc.com/',
            name: 'NepaCalc Calculator Categories',
            description: 'Browse NepaCalc calculators by category.',
            items: CATEGORIES.map((category, index) => {
              const categoryUrl =
                category.id === 'education' ? 'https://nepacalc.com/math-tools/' :
                category.id === 'utility' ? 'https://nepacalc.com/converters/' :
                category.id === 'market' ? 'https://nepacalc.com/market-rates/' :
                `https://nepacalc.com/${category.id}/`;
              return { position: index + 1, name: category.name, url: categoryUrl };
            })
          },
          faqs: [
            { question: 'What is NepaCalc?', answer: 'NepaCalc is a free online calculator and converter platform providing tools for Nepal-specific calculations, finance, engineering, education, health and everyday calculations.' },
            { question: 'Are NepaCalc calculators free?', answer: 'Yes. NepaCalc provides free online calculators and conversion tools.' },
            { question: 'Are NepaCalc calculators available on mobile?', answer: 'Yes. NepaCalc tools are designed to work on mobile phones, tablets and desktop devices.' },
            { question: 'Does NepaCalc provide calculators for Nepal?', answer: 'Yes. NepaCalc provides Nepal-specific calculators including NEA bills, vehicle tax, salary tax, land conversion, NEPSE calculations and other Nepal-related tools.' },
            { question: 'How often are NepaCalc calculators updated?', answer: 'NepaCalc updates calculators when relevant rates, regulations, formulas or official information changes.' }
          ]
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
                NepaCalc provides 100+ free online calculators, converters and digital tools for finance, engineering, education, health, science and Nepal-specific calculations built for students, professionals, businesses and everyday users.
              </p>

              <div className="w-full max-w-2xl mx-auto px-4">
                <SearchBar variant="hero" />
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




