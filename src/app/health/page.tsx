import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: 'Health & Fitness Calculators | BMI, BMR & More | NepaCalc',
  description: 'Free health and fitness calculators for BMI, BMR, calories, body fat, ideal weight, hydration, pregnancy and wellness planning. For estimation only — not medical advice.',
  slug: 'health',
  keywords: ['bmi calculator nepal', 'calorie calculator', 'bmr calculator', 'body fat calculator', 'health tools'],
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
        type="unified"
        data={{
          url: 'https://nepacalc.com/health/',
          collection: {
            url: 'https://nepacalc.com/health/',
            name: 'Health & Fitness Calculators',
            description: 'Free health, fitness, calorie, BMI, BMR and body composition calculators.',
          },
          itemList: {
            url: 'https://nepacalc.com/health/',
            name: 'Health & Fitness Calculators - List',
            description: 'List of calculators in Health & Fitness Calculators',
            items: healthTools.map((calculator, index) => ({
              position: index + 1,
              name: calculator.name,
              url: `https://nepacalc.com${calculator.slug.includes('/') ? '/' + calculator.slug : '/calculator/' + calculator.slug}/`,
            })),
          }
        }}
      />
      <CalcWrapper
        title="Health & Fitness Calculators"
        description="Free health and fitness calculators for BMI, BMR, calories, body fat, ideal weight, hydration, pregnancy and wellness estimates. These tools are for general planning and estimation — not medical diagnosis."
        crumbs={[{ label: 'Health & Fitness' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

          {/* About section + medical disclaimer */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#202124]">About Health Calculators</h2>
            <p className="text-[#5f6368] leading-relaxed">
              NepaCalc health calculators provide estimates based on the inputs and formulas implemented by each tool. They can be useful for understanding common screening measures such as BMI and BMR, estimating calorie needs, or tracking wellness goals.
            </p>
            <p className="text-[#5f6368] leading-relaxed font-medium">
              These calculators are for general information and planning only. They do not provide medical diagnoses and are not a substitute for advice from a qualified healthcare professional. Anyone with a health concern should consult a doctor or relevant medical specialist.
            </p>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
