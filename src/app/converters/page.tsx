import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Converters & Utility Tools ,  Length, Weight, Date | NepaCalc',
  description: 'Free online unit converters for length, weight, date, currency, binary, and more. Fast and precise daily utility tools. Try NepaCalc now.',
  keywords: ['unit converter', 'length converter', 'weight converter', 'binary converter', 'date calculator'],
  alternates: { canonical: 'https://NepaCalc.com/converters/' }
};

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
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://NepaCalc.com/' },
          { name: 'Converters', item: 'https://NepaCalc.com/converters/' }
        ]}
      />
      <CalcWrapper
        title="Unit Converters & Utility Tools"
        description="Precision measurement converters and everyday utility tools built on NIST-verified scientific constants for accurate results."
        crumbs={[{ label: 'Converters' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>
      </CalcWrapper>
    </>
  );
}
