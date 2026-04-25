import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finance & Tax Calculators — EMI, SIP, Compound Interest | NEPACALC',
  description: 'Professional finance calculators for EMI, SIP investments, compound interest, fixed deposits, and savings goals. Free and accurate. Try NEPACALC now.',
  keywords: ['emi calculator', 'sip calculator', 'compound interest calculator', 'loan calculator nepal'],
  alternates: { canonical: 'https://nepacalc.com/finance/' }
};

const TAGS: Record<string, string> = {
  'loan-emi': 'LOAN',
  'sip-calculator': 'INVESTMENT',
  'mortgage-calculator': 'LOAN',
  'compound-interest': 'INTEREST',
  'fd-calculator': 'SAVINGS',
  'savings': 'SAVINGS',
  'cagr-calculator': 'INVESTMENT',
  'simple-interest': 'INTEREST',
  'lead-time': 'BUSINESS',
};

export default function FinancePillarPage() {
  const financeTools = CALCULATORS.filter(c => c.category === 'finance');

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com/' },
          { name: 'Finance & Tax', item: 'https://nepacalc.com/finance/' }
        ]}
      />
      <CalcWrapper
        title="Finance & Tax Calculators"
        description="Professional financial planning tools for loans, investments, savings, and interest calculations built on bank-grade amortization logic."
        crumbs={[{ label: 'Finance & Tax' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {financeTools.map(calc => (
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
