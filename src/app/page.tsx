import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { ChevronRight } from 'lucide-react';
import { InstitutionalBlock } from '@/components/layout/InstitutionalBlock';
import { JsonLd } from '@/components/seo/JsonLd';
import { HomePageCalculatorClient } from './HomePageCalculatorClient';
import { HeroSearch } from '@/components/ui/HeroSearch';
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
    'Scientific Calculator 7-column keypad layout',
    'Advanced Graphing 4-tab keyboard (123, f(x), ABC, #&¬)',
    'Maths Solver — Algebra, Trigonometry, Calculus tabs',
    'Real-time interactive Canvas graphing engine',
    'Infinite pan and zoom on graph (no axis limits)',
    'Asymptote-aware curve rendering',
    'sin, cos, tan, arcsin, arccos, arctan, ln, log, sqrt functions',
    'csc, sec, cot inverse trigonometric functions',
    'Greek alphabet input (α, β, γ, π, θ, etc.)',
    'Full symbol keyboard',
    'live function preview as you type',
    '80+ specialized calculators available',
  ],
  screenshot: 'https://nepacalc.com/og-image.png',
  softwareVersion: '3.0',
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

const homepageItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'NEPACALC Calculator Categories',
  description: 'All calculator and converter categories available on NEPACALC',
  numberOfItems: 6,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Nepal Specific Calculators', url: 'https://nepacalc.com/nepal' },
    { '@type': 'ListItem', position: 2, name: 'Finance & Tax Calculators', url: 'https://nepacalc.com/finance' },
    { '@type': 'ListItem', position: 3, name: 'Health & Fitness Calculators', url: 'https://nepacalc.com/health' },
    { '@type': 'ListItem', position: 4, name: 'Math & Education Tools', url: 'https://nepacalc.com/math-tools' },
    { '@type': 'ListItem', position: 5, name: 'Unit Converters & Utility Tools', url: 'https://nepacalc.com/converters' },
    { '@type': 'ListItem', position: 6, name: 'Engineering Calculators', url: 'https://nepacalc.com/engineering' },
  ],
};

const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of calculators are available on NEPACALC?',
      acceptedAnswer: { '@type': 'Answer', text: 'NEPACALC offers 80+ professional calculators including a scientific calculator, graphing tool, maths solver (algebra, trigonometry, calculus), Nepal income tax calculator, EMI/loan calculator, GPA tracker, BMI calculator, unit converters, and many more specialized tools.' },
    },
    {
      '@type': 'Question',
      name: 'Does NEPACALC have a graphing calculator?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. NEPACALC features a real-time interactive graphing engine built with HTML5 Canvas. It supports infinite pan and zoom, auto-scaling axis labels, asymptote-aware curve rendering, and plots any function of x (sin, cos, tan, log, polynomials, etc.) as you type.' },
    },
    {
      '@type': 'Question',
      name: 'Is NEPACALC free to use?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, NEPACALC is 100% free with no registration required. All calculations are performed client-side for maximum privacy and speed.' },
    },
    {
      '@type': 'Question',
      name: 'What is the Maths Solver on NEPACALC?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Maths Solver provides specialized keyboards for Algebra (variables, powers, logarithms), Trigonometry (sin, cos, tan and inverses), and Calculus (derivatives, integrals, limits, summation). Each tab uses professional color-coded keys for maximum clarity.' },
    },
    {
      '@type': 'Question',
      name: 'Can I switch between different calculator styles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The homepage offers two calculator modes: Scientific Calculator (7-column layout with Deg/Rad toggle and full Maths Solver) and Advanced Graphing (4-tab keyboard with 123, f(x), ABC, and symbol keys). Both modes connect to the real-time graphing engine.' },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Institutional SEO Suite — Consolidated for Maximum Performance */}
      <script 
        type="application/ld+json" 
        suppressHydrationWarning 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify([
            homepageCalcSchema,
            homepageItemListSchema,
            homepageFaqSchema
          ]) 
        }} 
      />
      
      <div className="min-h-screen bg-white">
        {/* 1. Clinical Header & Search */}
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

            {/* Search Focal Point with Graph Engine side-by-side */}
            <div className="w-full mb-0">
               <HomePageCalculatorClient />
            </div>
          </div>
        </section>

        {/* 2. Structured Directory */}
        <main className="hp-container py-10" aria-labelledby="calc-directory-heading">
          <h2 id="calc-directory-heading" className="sr-only">Calculator Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-16">
            {CATEGORIES.filter(c => c.id !== 'market').map(cat => (
              <div key={cat.id} className="space-y-4">
                <Link href={cat.id === 'education' ? '/math-tools' : cat.id === 'utility' ? '/converters' : `/${cat.id}`}>
                  <h2 className={`${cat.id === 'engineering' ? 'text-[#4361ee]' : 'text-[#1a73e8]'} text-[13px] font-bold uppercase tracking-widest border-b-2 border-slate-100 pb-2 hover:underline`}>
                    {cat.name}
                  </h2>
                </Link>
                <ul className="space-y-2">
                  {/* Special case for Engineering: inject the advanced child tools first */}
                  {cat.id === 'engineering' && (
                    <>
                      <li className="h-[21px]"><Link href="/engineering/graphing" className="text-[14px] text-[#202124] hover:text-[#4361ee] hover:underline font-bold truncate block">Graphing Calculator</Link></li>
                      <li className="h-[21px]"><Link href="/engineering/3d" className="text-[14px] text-[#202124] hover:text-[#4361ee] hover:underline font-bold truncate block">3D Visualizer</Link></li>
                      <li className="h-[21px]"><Link href="/engineering/geometry" className="text-[14px] text-[#202124] hover:text-[#4361ee] hover:underline font-bold truncate block">Geometry Canvas</Link></li>
                      <li className="h-[21px]"><Link href="/engineering/formulas" className="text-[14px] text-[#202124] hover:text-[#4361ee] hover:underline font-bold truncate block">Formula Reference</Link></li>
                    </>
                  )}
                  {/* Total 8 rows per column for symmetry, pushing niche tools to category pages */}
                  {cat.calculators.slice(0, cat.id === 'engineering' ? 6 : cat.id === 'nepal' ? 10 : 7).map(calc => (
                    <li key={calc.id} className="h-[21px]">
                      <Link 
                         href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`} 
                         className="text-[14px] text-[#202124] hover:text-blue-600 hover:underline truncate block"
                         title={calc.name}
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

          {/* Full-Width SEO & Institutional Footer Block */}
          <InstitutionalBlock />
        
      {/* SEO Authority Layer */}
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the Home</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          Welcome to the ultimate guide on the <strong>Home</strong>. If you've been looking for an accurate <strong>calculator</strong> or need help with a reliable <strong>online calculator</strong>, you've come to the right place. Our suite of tools is designed specifically for the Nepal market, ensuring your <strong>free calculator</strong> calculations are exact and up-to-date.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          From complex calculations to simple daily conversions, leveraging a free <strong>calc</strong> can save you time and provide peace of mind. NepaCal's <strong>calculator</strong> is fast, responsive, and completely free to use online. Explore our platform for all your calculation needs!
        </p>
      </section>
    </main>
      </div>
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How to use the Free Online Calculator NepaCal Nepal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free calculator tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this Free Online Calculator NepaCal Nepal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's Free Online Calculator NepaCal Nepal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Free Online Calculator NepaCal Nepal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>calculator</strong> is optimized for Nepalese users. Whether you need an online calculator or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>calculator</strong>, <strong>calculator</strong>, <strong>calorie calculator</strong>, <strong>online calculator</strong>, <strong>calculator with dates</strong>, <strong>percentage increase calculator</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Free Online Calculator NepaCal Nepal?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Enter your values above to get results instantly.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is it accurate for Nepal?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Yes, our <strong>calculator</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
