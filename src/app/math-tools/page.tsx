import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Math, Education & Statistics Calculators | NEPACALC',
  description: 'Professional math calculators: Scientific engine, GPA/CGPA tracker, Linear solvers, Matrix computations, and Probability tools for students and engineers.',
  keywords: ['math calculator', 'gpa calculator nepal', 'scientific calculator online', 'statistics tools', 'math solver'],
  alternates: { canonical: 'https://nepacalc.com/math-tools' },
};

const MATH_FAQS = [
  {
    question: "Do the math calculators support complex functions?",
    answer: "Yes, our scientific calculators are engineered to evaluate exact algebraic algorithms, trigonometry, logarithms, and combinatorial logic with zero data loss."
  },
  {
    question: "Are these tools suitable for student examinations?",
    answer: "While highly precise for checking answers and learning, users must adhere to their institutional policies regarding online calculator use during exams."
  },
  {
    question: "What is the maximum precision limit?",
    answer: "Our numeric engines operate on IEEE 754 double-precision floating-point formats, providing up to 15-17 significant decimal digits of accuracy."
  },
  {
    question: "Do you offer statistical distribution calculators?",
    answer: "Yes, tools like our Z-Score and probability calculators resolve complex statistical variance models using standard normal distribution logic."
  }
];

export default function MathToolsPillarPage() {
  const category = CATEGORIES.find(c => c.id === 'education')!;
  
  return (
    <CalcWrapper
      title="Math & Education"
      description={`${category.calculators.length} academic and scientific tools for researchers, students, and engineers.`}
      crumbs={[{ label: 'Math & Education Tools' }]}
    >
      <div className="py-8">

        {/* Clinical Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {category.calculators.map(calc => (
            <div key={calc.id} className="group flex flex-col gap-1 border-b border-slate-50 pb-4">
              <Link
                href={`/calculator/${calc.slug}`}
                className="text-[16px] font-bold text-[#1a73e8] hover:underline"
              >
                {calc.name}
              </Link>
              <p className="text-[13px] text-[#5f6368] leading-relaxed font-medium">
                {calc.description || 'Professional mathematical tool for scientific calculations.'}
              </p>
            </div>
          ))}
        </div>

        {/* Institutional Authority Block */}
        <div className="mt-24 pt-12 border-t border-[#dadce0]">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl opacity-80">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Precision</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Algebraic and symbolic logic engines tested for floating-point accuracy across academic domains.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Verification</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">GPA and grading systems aligned with Nepal's national and international university standards.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Performance</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Optimized for rapid results in classroom and professional environments.</p>
              </div>
           </div>
        </div>
        
        <PillarFAQ faqs={MATH_FAQS} title="Math & Education Facts" />
      </div>
    </CalcWrapper>
  );
}
