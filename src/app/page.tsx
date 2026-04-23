import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { InstitutionalBlock } from '@/components/layout/InstitutionalBlock';
import { HomePageCalculatorClient } from './HomePageCalculatorClient';
import type { Metadata } from 'next';

/* ── Homepage-specific metadata (overrides layout.tsx defaults) ── */
export const metadata: Metadata = {
  title: 'Free Online Calculator NepaCal Nepal',
  description:
    'Use free online calculators for math finance health conversions and more. Nepals best calculator site with 100 plus tools. Try NepaCal now',
  keywords: [
    'online calculator', 'scientific calculator', 'graphing calculator',
    'maths solver', 'algebra solver', 'trigonometry calculator',
    'calculus calculator', 'nepal income tax calculator', 'EMI calculator',
    'GPA calculator', 'free online calculator', 'nepacalc',
    'graphing tool', 'math plotter', 'function grapher',
  ],
  openGraph: {
    title: 'Free Online Calculator NepaCal Nepal',
    description: 'Use free online calculators for math finance health conversions and more. Nepals best calculator site with 100 plus tools. Try NepaCal now',
    url: 'https://nepacalc.com',
    siteName: 'NEPACALC',
    locale: 'en_NP',
    type: 'website',
    images: ['https://nepacalc.com/og-image.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Calculator NepaCal Nepal',
    description: 'Use free online calculators for math finance health conversions and more. Nepals best calculator site with 100 plus tools. Try NepaCal now',
  },
};

/* ── Homepage-specific JSON-LD schemas ── */
const homepageCalcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': 'https://nepacalc.com/#calculator',
  name: 'NEPACALC Scientific Calculator & Graphing Engine',
  url: 'https://nepacalc.com',
  applicationCategory: 'EducationalApplication',
  applicationSubCategory: 'Scientific Calculator',
  operatingSystem: 'Any (Web Browser)',
  browserRequirements: 'Requires JavaScript, HTML5 Canvas',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'NPR' },
  featureList: [
    'Scientific calculator with Deg/Rad mode',
    'Advanced Graphing engine',
    'Maths Solver — Algebra, Trigonometry, Calculus',
    '80+ specialized calculators available',
  ],
  softwareVersion: '4.0',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2450',
    bestRating: '5',
  },
  creator: {
    '@type': 'Organization',
    name: 'NEPACALC',
    url: 'https://nepacalc.com',
  },
};

const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of calculators are available on NEPACALC?',
      acceptedAnswer: { '@type': 'Answer', text: 'NEPACALC offers 80+ professional calculators including a scientific calculator, graphing tool, maths solver, Nepal income tax calculator, EMI calculator, and more.' },
    },
    {
      '@type': 'Question',
      name: 'Is NEPACALC free to use?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, NEPACALC is 100% free with no registration required.' },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Institutional SEO Suite */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify([
            homepageCalcSchema,
            homepageFaqSchema
          ]) 
        }} 
      />
      
      <div className="min-h-screen bg-white">
        {/* 1. Header & Calculator */}
        <section className="pt-24 pb-16 border-b border-[#dadce0] bg-[#f8f9fa]">
          <div className="hp-container">
            <div className="mb-12 max-w-6xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202124] tracking-tight mb-4 leading-[1.1]">
                Free Online <span className="text-blue-600">Calculator</span> for Nepal.
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-4xl">
                Easy-to-use tools for tax, finance, health, and math. 80+ calculators for your daily needs.
              </p>
            </div>

            <div className="w-full mb-0">
               <HomePageCalculatorClient />
            </div>
          </div>
        </section>

        {/* 2. Structured Directory */}
        <main className="hp-container py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-16">
            {CATEGORIES.filter(c => c.id !== 'market').map(cat => (
              <div key={cat.id} className="space-y-4">
                <Link href={cat.id === 'education' ? '/math-tools' : cat.id === 'utility' ? '/converters' : `/${cat.id}`}>
                  <h2 className={`${cat.id === 'engineering' ? 'text-[#4361ee]' : 'text-[#1a73e8]'} text-[13px] font-bold uppercase tracking-widest border-b-2 border-slate-100 pb-2 hover:underline`}>
                    {cat.name}
                  </h2>
                </Link>
                <ul className="space-y-2">
                  {cat.calculators.slice(0, cat.id === 'nepal' ? 10 : 7).map(calc => (
                    <li key={calc.id} className="h-[21px]">
                      <Link 
                         href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`} 
                         className="text-[14px] text-[#202124] hover:text-blue-600 hover:underline truncate block"
                      >
                         {calc.name}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link href={cat.id === 'education' ? '/math-tools' : cat.id === 'utility' ? '/converters' : `/${cat.id}`} className="text-[11px] font-black text-blue-600 hover:underline uppercase tracking-widest">
                      All {cat.name} &rarr;
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* New Optimized Institutional Footer */}
          <InstitutionalBlock />
        </main>
      </div>
    </>
  );
}
