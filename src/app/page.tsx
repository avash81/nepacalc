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
  title: 'Free Online Scientific Calculator & Graphing Tool | Tax, EMI, GPA & 80+ Tools | NEPACALC',
  description:
    "NEPACALC is a free, professional toolkit for Nepal. Solve advanced math with our scientific calculator and real-time graphing engine, or use our 80+ specialized tools for income tax, loan EMI, GPA tracking, and more. No registration required.",
  keywords: [
    'online calculator', 'scientific calculator', 'graphing calculator',
    'maths solver', 'algebra solver', 'trigonometry calculator',
    'calculus calculator', 'nepal income tax calculator', 'EMI calculator',
    'GPA calculator', 'free online calculator', 'nepacalc',
    'graphing tool', 'math plotter', 'function grapher',
  ],
  openGraph: {
    title: 'Free Scientific Calculator & Graphing Tool | 80+ Tools | NEPACALC',
    description: 'Interactive scientific calculator with real-time function graphing, maths solver, and 80+ professional calculators for Nepal.',
    url: 'https://nepacalc.com',
    siteName: 'NEPACALC',
    locale: 'en_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Scientific Calculator & Graph | NEPACALC',
    description: 'Interactive scientific calculator with real-time graphing, algebra/trig/calculus solver, and 80+ tools.',
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
  numberOfItems: 5,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Nepal Specific Calculators', url: 'https://nepacalc.com/nepal' },
    { '@type': 'ListItem', position: 2, name: 'Finance & Tax Calculators', url: 'https://nepacalc.com/finance' },
    { '@type': 'ListItem', position: 3, name: 'Health & Fitness Calculators', url: 'https://nepacalc.com/health' },
    { '@type': 'ListItem', position: 4, name: 'Math & Education Tools', url: 'https://nepacalc.com/math-tools' },
    { '@type': 'ListItem', position: 5, name: 'Unit Converters & Utility Tools', url: 'https://nepacalc.com/converters' },
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
      <JsonLd type="website" />
      <JsonLd type="organization" />

      {/* Homepage-specific rich schemas */}
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageCalcSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageItemListSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }} />
      
      <div className="min-h-screen bg-white">
        {/* 1. Clinical Header & Search */}
        <section className="pt-24 pb-16 border-b border-[#dadce0] bg-[#f8f9fa]">
          <div className="hp-container">
            <div className="max-w-4xl mb-6">
              <h1 className="text-[28px] sm:text-[36px] lg:text-[44px] font-black text-[#202124] leading-[1.05] tracking-tight mb-4">
                Free Scientific Calculator, <br className="hidden sm:block" />
                <span className="text-blue-600">Graphing Engine</span> & 80+ Specialized Tools
              </h1>
              <p className="text-[16px] sm:text-[18px] text-[#5f6368] font-medium leading-relaxed">
                Nepal's leading digital laboratory for precision mathematics, financial planning, and engineering solvers. Professional-grade tools with no registration required.
              </p>
            </div>
            
            {/* Search Focal Point with Graph Engine side-by-side */}
            <div className="w-full mb-0">
               <HomePageCalculatorClient />
            </div>
          </div>
        </section>

        {/* 2. Structured Directory */}
        <main className="hp-container py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-16">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="space-y-4">
                <Link href={cat.id === 'education' ? '/math-tools' : cat.id === 'utility' ? '/converters' : `/${cat.id}`}>
                  <h2 className={`${cat.id === 'engineering' ? 'text-[#4361ee]' : 'text-[#1a73e8]'} text-[13px] font-black uppercase tracking-widest border-b-2 border-slate-100 pb-2 hover:underline`}>
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
                  {/* Total 10 rows per column for symmetry */}
                  {cat.calculators.slice(0, cat.id === 'engineering' ? 6 : 10).map(calc => (
                    <li key={calc.id} className="h-[21px]">
                      <Link 
                         href={`/calculator/${calc.slug}`} 
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
        </main>
      </div>
    </>
  );
}
