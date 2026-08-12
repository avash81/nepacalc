import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: 'Converters & Utility Tools | Length, Weight | NepaCalc',
  description: 'Free unit converters and everyday utility tools for length, weight, measurements, dates, age, discounts, numbers, data and more.',
  slug: 'converters',
  keywords: ['unit converter', 'length converter', 'weight converter', 'date calculator', 'age calculator'],
});

const TAGS: Record<string, string> = {
  'unit-converter': 'MEASUREMENT',
  'length-converter': 'LENGTH',
  'weight-converter': 'WEIGHT',
  'base-converter': 'DIGITAL',
  'date-duration': 'DATE & TIME',
  'age-calculator': 'DATE & TIME',
  'discount-calculator': 'SHOPPING',
  'tip-calculator': 'FINANCE',
  'solar-requirement': 'ENERGY',
  'paint-cost': 'HOME',
  'word-counter': 'TEXT',
  'qr-generator': 'TOOLS',
  'number-to-words': 'TEXT',
  'password-generator': 'SECURITY',
};

export default function ConvertersPillarPage() {
  const utilityTools = CALCULATORS.filter(c => c.category === 'utility');

  return (
    <>
      <JsonLd
        type="unified"
        data={{
          url: 'https://nepacalc.com/converters/',
          collection: {
            url: 'https://nepacalc.com/converters/',
            name: 'Converters & Utility Calculators',
            description: 'Free unit converters, date calculators, age calculators and everyday utility tools.',
          },
          itemList: {
            url: 'https://nepacalc.com/converters/',
            name: 'Converters & Utility Calculators - List',
            description: 'List of calculators in Converters & Utility Tools',
            items: utilityTools.map((calculator, index) => ({
              position: index + 1,
              name: calculator.name,
              url: `https://nepacalc.com${calculator.slug.includes('/') ? '/' + calculator.slug : '/calculator/' + calculator.slug}/`,
            })),
          }
        }}
      />
      <CalcWrapper
        title="Unit Converters & Utility Tools"
        description="Free unit converters and everyday utility tools for length, weight, measurements, dates, age, discounts, numbers and more."
        crumbs={[{ label: 'Converters' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {utilityTools.map(calc => (
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
            <h2 className="text-xl font-bold text-[#202124]">About Converters & Utility Tools</h2>
            <p className="text-[#5f6368] leading-relaxed">
              NepaCalc provides unit converters and everyday utility tools for common measurement, date and number conversion tasks. Conversion results depend on the units and conversion factors implemented by each tool. For professional, legal or engineering applications, verify the required conversion standard independently.
            </p>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
