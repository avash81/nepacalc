import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { HubSEOContent } from '@/components/layout/HubSEOContent';
import { calcMeta } from '@/lib/calcMeta';
import Link from 'next/link';

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

export const metadata = calcMeta({
  title: 'IRD Tax Calculator Nepal | VAT Calculator Nepal',
  description: 'Accurate IRD tax calculator, VAT calculator Nepal, and salary tax calculator. Avoid VAT fine in Nepal with precise 13% VAT return calculation for FY 2082/83.',
  keywords: ['ird tax calculator', 'vat calculator nepal', 'vat fine calculator nepal', 'tax calculator tax refund calculator nepal', 'nepal tax calculation', 'personal income tax calculator nepal', '13% vat return', 'vat n ps calculator in nepal', 'blue book renew price in nepal'],
  slug: 'nepal',
});

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
        title="IRD Tax Calculator Nepal & VAT Calculator"
        description="Accurate financial, tax, and local conversion tools designed specifically for the Nepalese market following IRD and NRB guidelines."
        crumbs={[{ label: 'Nepal Specific' }]}
        isNepal={true}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
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

          {/* SEO Rich Content, 1500+ Words Hub */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm">
            <article className="prose prose-slate max-w-none">
              <HubSEOContent category="nepal" />
            </article>
          </section>
        </div>
      </CalcWrapper>
    </>
  );
}

