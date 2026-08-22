import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';

export const metadata = calcMeta({
  title: 'Math & Education Tools | GPA, Statistics & More | NepaCalc',
  description: 'Free math and education calculators for GPA, CGPA, percentages, fractions, statistics, probability, algebra, calculus and academic calculations.',
  slug: 'math-tools',
  keywords: ['gpa calculator', 'cgpa calculator', 'statistics calculator', 'algebra calculator', 'math tools'],
});

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
        type="unified"
        data={{
          url: 'https://nepacalc.com/math-tools/',
          collection: {
            url: 'https://nepacalc.com/math-tools/',
            name: 'Math & Education Calculators',
            description: 'Free mathematics, statistics, algebra, GPA and education calculators.',
          },
          itemList: {
            url: 'https://nepacalc.com/math-tools/',
            name: 'Math & Education Calculators - List',
            description: 'List of calculators in Math & Education Tools',
            items: mathTools.map((calculator, index) => ({
              position: index + 1,
              name: calculator.name,
              url: `https://nepacalc.com${calculator.slug.includes('/') ? '/' + calculator.slug : '/calculator/' + calculator.slug}/`,
            })),
          }
        }}
      />
      <CalcWrapper
        title="Math & Education Tools"
        description="Free math and education calculators for GPA, CGPA, percentages, fractions, statistics, algebra, calculus and academic calculations."
        crumbs={[{ label: 'Math Tools' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

          {/* About section */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#202124]">About Math & Education Tools</h2>
            <p className="text-[#5f6368] leading-relaxed">
              NepaCalc provides mathematics and education calculators for students, teachers and professionals. Tools include GPA, CGPA, statistics, algebra, calculus, geometry, fraction and percentage calculators, as well as a <Link href="/engineering/graphing/" className="text-blue-600 hover:underline">Free Online Graphing Calculator</Link> for plotting functions and visualizing equations. Results are generated from mathematical formulas. Verify results against your institution's requirements or grading system where accuracy matters.
            </p>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
