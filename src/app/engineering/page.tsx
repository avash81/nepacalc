import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { HubSEOContent } from '@/components/layout/HubSEOContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Calculators ,  Physics, Chemistry, 3D Plotting | NepaCalc',
  description: 'Professional engineering calculators for physics, chemistry, matrices, structural design, and 3D surface plotting. Try NepaCalc now.',
  keywords: ['engineering calculator', 'physics calculator', 'chemistry calculator', '3d plotter', 'matrix calculator'],
  alternates: { canonical: 'https://NepaCalc.com/engineering/' }
};

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
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://NepaCalc.com/' },
          { name: 'Engineering', item: 'https://NepaCalc.com/engineering/' }
        ]}
      />
      <CalcWrapper
        title="Engineering & Technical Tools"
        description="High-fidelity computational engines for structural, digital, and mechanical engineering. Includes 3D surface plotters and geometry canvas tools."
        crumbs={[{ label: 'Engineering' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
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

          {/* SEO Rich Content, ~1500+ Words Engineering Hub */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm">
            <article className="prose prose-slate max-w-none">
              <HubSEOContent category="engineering" />
            </article>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}

