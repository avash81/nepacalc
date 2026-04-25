import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health & Fitness Calculators — BMI, BMR, Calories | NEPACALC',
  description: 'Free WHO-standard health calculators for BMI, BMR, calorie needs, body fat, and ideal weight. Accurate fitness tools. Try NEPACALC now.',
  keywords: ['bmi calculator', 'bmr calculator', 'calorie calculator', 'body fat calculator', 'health tools nepal'],
  alternates: { canonical: 'https://nepacalc.com/health/' }
};

const TAGS: Record<string, string> = {
  'bmi': 'BODY WEIGHT',
  'bmr': 'METABOLISM',
  'calorie-calculator': 'NUTRITION',
  'body-fat': 'BODY WEIGHT',
  'ideal-weight': 'BODY WEIGHT',
  'water-intake': 'HYDRATION',
  'pregnancy-due-date': 'PREGNANCY',
  'bmi-child': 'PEDIATRIC',
  'sleep': 'WELLNESS',
  'momo-calorie-counter': 'NUTRITION',
};

export default function HealthPillarPage() {
  const healthTools = CALCULATORS.filter(c => c.category === 'health');

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com/' },
          { name: 'Health', item: 'https://nepacalc.com/health/' }
        ]}
      />
      <CalcWrapper
        title="Health & Fitness Calculators"
        description="WHO-standard physiological tools for body composition, nutrition, hydration, and wellness tracking. Accurate and easy to use."
        crumbs={[{ label: 'Health & Fitness' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthTools.map(calc => (
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
