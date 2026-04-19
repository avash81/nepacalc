import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { HomePageCalculatorClient } from './HomePageCalculatorClient';
import type { Metadata } from 'next';

/* ── Homepage-specific metadata (overrides layout.tsx defaults) ── */
export const metadata: Metadata = {
  title: 'Free Online Scientific Calculator & Graphing Tool — Tax, EMI, GPA & 80+ Tools | NEPACALC',
  description:
    "Nepal's #1 free online scientific calculator with real-time graphing, maths solver (algebra, trigonometry, calculus), income tax calculator, EMI planner, GPA tracker, and 80+ professional tools. Interactive Canvas graph engine with infinite pan & zoom.",
  keywords: [
    'online calculator', 'scientific calculator', 'graphing calculator',
    'maths solver', 'algebra solver', 'trigonometry calculator',
    'calculus calculator', 'nepal income tax calculator', 'EMI calculator',
    'GPA calculator', 'free online calculator', 'nepacalc',
    'graphing tool', 'math plotter', 'function grapher',
  ],
  openGraph: {
    title: 'Free Scientific Calculator & Graphing Tool — 80+ Tools | NEPACALC',
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
    'Google-style 7-column keypad layout',
    'Advanced GeoGebra-style 4-tab keyboard (123, f(x), ABC, #&¬)',
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
      acceptedAnswer: { '@type': 'Answer', text: 'The Maths Solver provides specialized keyboards for Algebra (variables, powers, logarithms), Trigonometry (sin, cos, tan and inverses), and Calculus (derivatives, integrals, limits, summation). Each tab uses color-coded keys matching Google\'s Maths Solver design.' },
    },
    {
      '@type': 'Question',
      name: 'Can I switch between different calculator styles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The homepage offers two calculator modes: Google-style (scientific + maths solver with Algebra/Trigonometry/Calculus tabs) and Advanced GeoGebra-style (4-tab keyboard with 123, f(x), ABC, and symbol keys). Both modes connect to the real-time graphing engine.' },
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
        <section className="pt-20 pb-12 border-b border-[#dadce0]">
          <div className="hp-container">
            <h1 className="sr-only">Free Online Scientific Calculator, Graphing Tool & Maths Solver — 80+ Professional Calculators</h1>
            
            {/* Search Focal Point with Graph Engine side-by-side */}
            <div className="w-full mb-0">
               <HomePageCalculatorClient />
            </div>
          </div>
        </section>

        {/* 2. Structured Directory */}
        <main className="hp-container py-16">
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
                      <li><Link href="/engineering/graphing" className="text-[14px] text-[#202124] hover:text-[#4361ee] hover:underline font-bold">Graphing Calculator</Link></li>
                      <li><Link href="/engineering/3d" className="text-[14px] text-[#202124] hover:text-[#4361ee] hover:underline font-bold">3D Visualizer</Link></li>
                      <li><Link href="/engineering/geometry" className="text-[14px] text-[#202124] hover:text-[#4361ee] hover:underline font-bold">Geometry Canvas</Link></li>
                      <li><Link href="/engineering/formulas" className="text-[14px] text-[#202124] hover:text-[#4361ee] hover:underline font-bold">Formula Reference</Link></li>
                    </>
                  )}
                  {cat.calculators.slice(0, 10).map(calc => (
                    <li key={calc.id}>
                      <Link href={`/calculator/${calc.slug}`} className="text-[14px] text-[#202124] hover:text-blue-600 hover:underline">
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
          <div className="mt-16 pt-10 border-t border-slate-200">
            <div className="max-w-5xl">
              <h2 className="text-[#202124] text-[16px] font-black tracking-tight mb-3">
                Nepal's Leading Scientific Calculator, Graphing Tool & Digital Laboratory
              </h2>
              <p className="text-[13px] text-[#5f6368] leading-relaxed font-medium mb-6">
                Welcome to <strong>NEPACALC</strong> — the most comprehensive suite of professional online calculators, graphing tools, and math solvers. Our homepage features an <strong>interactive scientific calculator</strong> with two switchable modes: a Google-style layout with Deg/Rad toggle and a full <strong>Maths Solver</strong> (Algebra, Trigonometry, Calculus tabs), plus an <strong>Advanced GeoGebra-style keyboard</strong> with 123, f(x), ABC, and symbol input. Every expression you type is instantly visualized on our <strong>real-time Canvas graphing engine</strong> — supporting infinite pan, zoom, asymptote-aware rendering, and auto-scaling axes. Beyond the homepage, we provide 80+ institutional-grade tools for <strong>Nepal income tax</strong>, loan EMI, SIP compounding, GPA tracking, BMI, BMR, unit conversion, and engineering calculations — all mathematically engineered per Inland Revenue Department (IRD) and Nepal Rastra Bank directives. 100% free. No registration required.
              </p>
              <div className="flex items-center gap-6">
                 <Link href="/sitemap.html" className="text-[12px] font-black text-red-600 hover:underline uppercase tracking-widest">
                   Full Site Index &rarr;
                 </Link>
                 <Link href="/about" className="text-[12px] font-black text-blue-600 hover:underline uppercase tracking-widest">
                   Our Methodology &rarr;
                 </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
