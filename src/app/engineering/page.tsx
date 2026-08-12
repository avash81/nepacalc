import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';

export const metadata = calcMeta({
  title: 'Engineering Calculators | Physics, Math & More | NepaCalc',
  description: 'Free engineering and technical calculators for physics, algebra, geometry, chemistry, construction, graphing and mathematical problem solving.',
  slug: 'engineering',
  keywords: ['engineering calculator', 'physics calculator', 'chemistry calculator', 'graphing calculator', 'matrix calculator'],
});

const TAGS: Record<string, string> = {
  'scientific-calculator': 'SCIENCE',
  'linear-solver': 'ALGEBRA',
  'matrices': 'ALGEBRA',
  'quadratic-solver': 'ALGEBRA',
  'geometry-3d': 'GEOMETRY',
  'physics-force': 'PHYSICS',
  'physics-energy': 'PHYSICS',
  'chemistry-molar': 'CHEMISTRY',
  'concrete-mix': 'CIVIL',
  'brick-calculator': 'CIVIL',
  'engineering/graphing': 'GRAPHING',
  'engineering/formulas': 'REFERENCE',
  'engineering/3d': 'GRAPHING',
  'engineering/geometry': 'GEOMETRY',
};

export default function EngineeringPillarPage() {
  const engTools = CALCULATORS.filter(c => c.category === 'engineering');

  return (
    <>
      <JsonLd
        type="unified"
        data={{
          url: 'https://nepacalc.com/engineering/',
          collection: {
            url: 'https://nepacalc.com/engineering/',
            name: 'Engineering Calculators & Tools',
            description: 'Engineering, physics, mathematics, scientific and technical calculation tools.',
          },
          itemList: {
            url: 'https://nepacalc.com/engineering/',
            name: 'Engineering Calculators & Tools - List',
            description: 'List of calculators in Engineering & Technical Tools',
            items: engTools.map((calculator, index) => ({
              position: index + 1,
              name: calculator.name,
              url: `https://nepacalc.com${calculator.slug.includes('/') ? '/' + calculator.slug : '/calculator/' + calculator.slug}/`,
            })),
          }
        }}
      />
      <CalcWrapper
        title="Engineering & Technical Tools"
        description="Free engineering and technical calculators for physics, algebra, geometry, chemistry, construction, graphing and mathematical problem solving."
        crumbs={[{ label: 'Engineering' }]}
      >
        <div className="py-4">
          <div className="mb-8 p-6 bg-indigo-50 border border-indigo-100 rounded-xl shadow-sm">
            <h2 className="text-xl font-black text-indigo-900 mb-2">Featured Tool: 3D Graph Calculator</h2>
            <p className="text-indigo-800 leading-relaxed">
              Explore mathematical models and topological surfaces visually. Use our <Link href="/engineering/3d/" className="font-bold underline text-indigo-900">3D Graph Calculator</Link> to interactively graph multivariable functions directly in your browser.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {engTools.map(calc => (
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
            <h2 className="text-xl font-bold text-[#202124]">About Engineering Tools</h2>
            <p className="text-[#5f6368] leading-relaxed">
              NepaCalc provides engineering and technical calculators for students, educators and practitioners. Tools cover physics, algebra, geometry, chemistry, construction estimation and graphing. Results are computational estimates and should not replace project-specific engineering analysis, professional judgment or applicable safety standards where these are required.
            </p>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
