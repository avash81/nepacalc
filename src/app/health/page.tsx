import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata = calcMeta({
  title: 'Nepal Health Calculators BMI Calorie TDEE More',
  description: 'BMI BMR TDEE calorie body fat ideal weight free health calculators for Nepal.',
  slug: 'health',
  keywords: ['bmi calculator nepal', 'calorie calculator nepal', 'health tools nepal', 'bmr calculator nepal'],
});

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
          { name: 'Home', item: 'https://NepaCalc.com/' },
          { name: 'Health', item: 'https://NepaCalc.com/health/' }
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
