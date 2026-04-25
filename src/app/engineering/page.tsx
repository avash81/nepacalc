import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Calculators — Physics, Chemistry, 3D Plotting | NEPACALC',
  description: 'Professional engineering calculators for physics, chemistry, matrices, structural design, and 3D surface plotting. Try NEPACALC now.',
  keywords: ['engineering calculator', 'physics calculator', 'chemistry calculator', '3d plotter', 'matrix calculator'],
  alternates: { canonical: 'https://nepacalc.com/engineering/' }
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
          { name: 'Home', item: 'https://nepacalc.com/' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering/' }
        ]}
      />
      <CalcWrapper
        title="Engineering & Technical Tools"
        description="High-fidelity computational engines for structural, digital, and mechanical engineering. Includes 3D surface plotters and geometry canvas tools."
        crumbs={[{ label: 'Engineering' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>
      </CalcWrapper>
    </>
  );
}
