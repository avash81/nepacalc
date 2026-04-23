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
            {TOP_TOOLS.map(tool => (
              <Link href={tool.slug.includes('/') ? `/${tool.slug}` : `/calculator/${tool.slug}`} key={tool.title} className="group relative rounded-xl border border-slate-200 p-3 hover:border-transparent hover:shadow-lg transition-all duration-300 overflow-hidden block">
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
            ))}
          </div>
        </section>

        {/* Existing calculators */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#8b5cf6] mb-8 border-b-2 border-slate-100 pb-2">
            Regular Calculators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {existingTools.map(calc => (
              <Link key={calc.name} href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#8b5cf6] hover:bg-[#8b5cf608] transition-all group">
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[13px] font-medium text-[#202124] group-hover:text-[#8b5cf6] transition-colors truncate">
                  {calc.name}
                </span>
              </Link>
            ))}
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
    </>
  );
}
