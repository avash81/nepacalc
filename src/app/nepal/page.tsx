import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nepal Calculators Tax Land and Financial Tools NepaCal',
  description: 'All 24 official Nepal specific calculators for income tax loan EMI NEPSE WACC SEE GPA and more. Accurate institutional grade tools for Nepal. Try NepaCal now',
  keywords: ['nepal calculator', 'income tax calculator nepal', 'nepse calculator', 'see gpa calculator', 'nepal specific tools'],
  alternates: { canonical: 'https://nepacalc.com/nepal/' }
};

const TAGS: Record<string, string> = {
  'nepal-income-tax': 'FINANCE',
  'nepal-salary': 'FINANCE',
  'nepal-home-loan': 'LOAN',
  'nea-bill': 'UTILITIES',
  'nepal-land': 'UNITS',
  'nepal-stocks': 'STOCK MARKET',
  'property-tax': 'TAX',
  'property-registration': 'LEGAL',
  'nepal-provident-fund': 'SAVINGS',
  'nepal-tds': 'TAX',
  'nepal-vehicle-tax': 'TRANSPORT',
  'nepse-wacc': 'STOCK MARKET',
  'nepse-bonus-tax': 'STOCK MARKET',
  'gratuity-calculator': 'EMPLOYMENT',
  'foreign-employment': 'EMPLOYMENT',
  'kukl-bill': 'UTILITIES',
  'nepal-attendance': 'EDUCATION',
  'see-gpa': 'EDUCATION',
  'nepali-date': 'TOOLS',
  'nepal-vat': 'TAX',
};

export default function NepalPillarPage() {
  const nepalTools = CALCULATORS.filter(c => c.isNepal);

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com/' },
          { name: 'Nepal Specific', item: 'https://nepacalc.com/nepal/' }
        ]}
      />
      <CalcWrapper
        title="Nepal Specific Calculators"
        description="Accurate financial, tax, and local conversion tools designed specifically for the Nepalese market following IRD and NRB guidelines."
        crumbs={[{ label: 'Nepal Specific' }]}
        isNepal={true}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nepalTools.map(calc => (
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
