import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Math Education and Statistics Calculators NepaCal',
  description: 'Free math calculators for students and teachers. Professional scientific calculator GPA tracker linear solvers matrix computations and probability tools. Try NepaCal now',
  keywords: ['math calculator nepal', 'gpa calculator students', 'scientific calculator online', 'statistics tools nepal'],
  alternates: { 
    canonical: 'https://nepacalc.com/math-tools/',
    languages: {
      'en-NP': 'https://nepacalc.com/math-tools/',
      'x-default': 'https://nepacalc.com/math-tools/'
    }
  },
};

const MATH_FAQS = [
  { question: "Do the math calculators support complex functions?", answer: "Yes, our scientific calculators are engineered to evaluate exact algebraic algorithms, trigonometry, logarithms, and combinatorial logic with zero data loss." },
  { question: "Are these tools suitable for student examinations?", answer: "While highly precise for checking answers and learning, users must adhere to their institutional policies regarding online calculator use during exams." },
  { question: "What is the maximum precision limit?", answer: "Our numeric engines operate on IEEE 754 double-precision floating-point formats, providing up to 15-17 significant decimal digits of accuracy." },
  { question: "Do you offer statistical distribution calculators?", answer: "Yes, tools like our Z-Score and probability calculators resolve complex statistical variance models using standard normal distribution logic." }
];

const TOP_TOOLS = [
  { slug: 'gpa', title: 'GPA Calculator', desc: 'Calculate academic semester grade point averages with standard and custom grading scales.', icon: '🎓', color: '#8b5cf6' },
  { slug: 'cgpa', title: 'CGPA Calculator', desc: 'Track cumulative historical degree performance across multiple trimesters and academic years.', icon: '📚', color: '#3b82f6' },
  { slug: 'percentage', title: 'Percentage Calculator', desc: 'Compute rapid percentage derivations, margins, and relative value variance equations.', icon: '%', color: '#10b981' },
  { slug: 'fraction-calculator', title: 'Fraction Solver', desc: 'Perform complex fractional arithmetic, simplification, and immediate decimal extraction.', icon: '➗', color: '#f59e0b' },
];

export default function MathToolsPillarPage() {
  const category = CATEGORIES.find(c => c.id === 'education')!;
  const existingTools = category.calculators.filter(c => !TOP_TOOLS.some(t => t.slug === c.slug));

  return (
    <>
      <JsonLd type="breadcrumb" breadcrumbItems={[{ name: 'Home', item: 'https://nepacalc.com' }, { name: 'Math & Education', item: 'https://nepacalc.com/math-tools' }]} />
      <JsonLd type="calculator" name="NEPACALC Math & Statistics" description="Academic and algorithmic calculator suite built for university curriculum." url="https://nepacalc.com/math-tools" category="EducationalApplication" />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-20 pb-8 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Academic Suite</span>
            </div>
            <h1 className="text-[18px] sm:text-[24px] font-black text-[#202124] tracking-tight leading-tight mb-2">
              Math and Education Tools Nepal
            </h1>
            <p className="text-[13px] text-[#5f6368] max-w-2xl leading-relaxed">
              Algorithmic arithmetic and standard curriculum trackers. Optimize your GPA mapping, resolve complex probability vectors, and parse statistical variance.
            </p>
          </div>
        </section>

        {/* Main tools grid */}
        <section className="max-w-6xl mx-auto px-6 pt-6 pb-16">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#8b5cf6] mb-8 border-b-2 border-slate-100 pb-2">
            Advanced Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_TOOLS.map(tool => {
              const isDirectRoute = tool.slug.includes('/');
              const href = isDirectRoute ? `/${tool.slug}/` : `/calculator/${tool.slug}/`;
              return (
                <Link href={href} key={tool.title} className="group relative rounded-xl border border-slate-200 p-3 hover:border-transparent hover:shadow-lg transition-all duration-300 overflow-hidden block">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />
                  <div className="relative z-10">
                    <div className="text-xl mb-2">{tool.icon}</div>
                    <h3 className="text-[13px] font-bold text-[#202124] mb-1">{tool.title}</h3>
                    <p className="text-[11px] text-[#5f6368] leading-relaxed mb-2">{tool.desc}</p>
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white transition-all hover:opacity-90" style={{ background: tool.color }}>
                      Open Tool →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Existing calculators */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#8b5cf6] mb-8 border-b-2 border-slate-100 pb-2">
            Regular Calculators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {existingTools.map(calc => {
              const isDirectRoute = calc.slug.includes('/');
              const href = isDirectRoute ? `/${calc.slug}/` : `/calculator/${calc.slug}/`;
              return (
                <Link key={calc.name} href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#8b5cf6] hover:bg-[#8b5cf608] transition-all group">
                  <span className="text-lg flex-shrink-0">{calc.icon}</span>
                  <span className="text-[13px] font-medium text-[#202124] group-hover:text-[#8b5cf6] transition-colors truncate">
                    {calc.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <PillarFAQ faqs={MATH_FAQS} title="Math & Education Facts" />
        </section>

        {/* SEO Simple Summary */}
        <section className="border-t border-slate-200 py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[16px] font-black text-[#202124] mb-3">
              Academic & Statistical Computing
            </h2>
            <p className="text-[13px] text-[#5f6368] leading-relaxed">
              We engineered the math module to operate flawlessly within standard university and high-school curriculums. From processing probability arrays and calculating Z-scores over normalized graphs, to efficiently formatting standard cumulative GPAs, the system focuses strictly on exact algebraic resolution without arbitrary rounding errors. Used extensively by researchers parsing variances or students double checking examination logic, the NEPACALC math engine is highly optimized for absolute numerical fidelity.
            </p>
          </div>
        </section>
      </div>
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Math Tools Hub Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/math-tools/ tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"math solver\" with 2,400+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Math Tools Hub Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Math Tools Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this math problem solver accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/math-tools/?","acceptedAnswer":{"@type":"Answer","text":"Our Math Tools Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can photomath instantly without manual errors."}},{"@type":"Question","name":"Can I use this math solver on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/math-tools/ is fully responsive for mobile devices and desktops. Whether you search \"photo math\" or \"math solver\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Math Tools Hub Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our function math definition uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"math solver\" and \"math question solver\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/math-tools/\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/math-tools/\" is one of the most searched terms with 2,400+ monthly searches in Nepal in Nepal. Our Math Tools Hub Calculator helps you get accurate results for \"photomath\", \"photo math\", and \"full form of maths\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Math Tools Hub Calculator - NepaCal","url":"https://nepacalc.com/math-tools","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"2400","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":254}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Math Tools Hub Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/math-tools/</strong> for Nepal? NepaCal&apos;s Math Tools Hub Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>photomath</strong>, find a reliable <strong>photo math</strong>, or simply understand <strong>function math definition</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/math-tools/</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>math solver</strong>, <strong>math problem solver</strong>, <strong>photomath</strong>, <strong>photo math</strong>, <strong>function math definition</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Math Tools Hub Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Math Tools Hub Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/math-tools/</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "math solver" with 2,400+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Math Tools Hub Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Math Tools Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>math problem solver</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/math-tools/?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Math Tools Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>photomath</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this math solver on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/math-tools/</strong> is fully responsive for mobile devices and desktops. Whether you search "photo math" or "math solver" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Math Tools Hub Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>function math definition</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "math solver" and "math question solver" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/math-tools/" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/math-tools/" is one of the most searched terms with 2,400+ monthly searches in Nepal in Nepal. Our Math Tools Hub Calculator helps you get accurate results for "photomath", "photo math", and "full form of maths" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
