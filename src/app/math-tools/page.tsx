import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Math & Education Calculators — GPA, Statistics, Calculus | NepaCalc',
  description: 'Professional grade math calculators for GPA, statistics, calculus, algebra, and more. Academic tools for students and professionals. Try NepaCalc now.',
  keywords: ['gpa calculator', 'statistics calculator', 'calculus solver', 'algebra calculator', 'math tools'],
  alternates: { canonical: 'https://NepaCalc.com/math-tools/' }
};

const TAGS: Record<string, string> = {
  'gpa': 'ACADEMICS',
  'cgpa': 'ACADEMICS',
  'engineering-gpa': 'ACADEMICS',
  'marks-needed': 'ACADEMICS',
  'percentage': 'MATH',
  'standard-deviation': 'STATISTICS',
  'fraction-calculator': 'MATH',
  'decimal-to-fraction': 'MATH',
  'probability': 'STATISTICS',
  'statistics-plus': 'STATISTICS',
  'z-score': 'STATISTICS',
  'lcm-gcf-calculator': 'MATH',
  'ratio-proportion': 'MATH',
  'area-calculator': 'GEOMETRY',
  'logarithm-calculator': 'MATH',
  'rounding': 'MATH',
  'simple-calculator': 'TOOLS',
  'attendance': 'ACADEMICS',
  'roman-numerals': 'TOOLS',
  'math-tools/calculus': 'CALCULUS',
  'math-tools/matrix': 'ALGEBRA',
  'math-tools/statistics': 'STATISTICS',
  'math-tools/programmer': 'DIGITAL',
  'math-tools/scientific': 'SCIENCE',
  'math-tools/fourfunction': 'TOOLS',
};

export default function MathToolsPillarPage() {
  const mathTools = CALCULATORS.filter(c => c.category === 'education');

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://NepaCalc.com/' },
          { name: 'Math Tools', item: 'https://NepaCalc.com/math-tools/' }
        ]}
      />
      <CalcWrapper
        title="Math & Education Tools"
        description="High-precision computational engines for algebra, calculus, statistics, and academic grade calculations for students and professionals."
        crumbs={[{ label: 'Math Tools' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mathTools.map(calc => (
              <PillarCard
                key={calc.id}
                slug={calc.slug}
                icon={calc.icon}
                name={calc.name}
                description={calc.description}
                tag={TAGS[calc.slug]}
                isNew={calc.isNew}
                isHot={calc.isHot}
              />
            ))}
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
