import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: 'Finance & Tax Calculators | EMI, Loans & More | NepaCalc',
  description: 'Free financial calculators for EMI, loans, mortgages, SIP, compound interest, fixed deposits, savings, CAGR and financial planning — including Nepal-focused tools.',
  slug: 'finance',
  keywords: ['nepal finance calculator', 'tax calculator nepal', 'loan emi calculator nepal', 'sip calculator nepal', 'compound interest calculator'],
});

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
        type="unified"
        data={{
          url: 'https://nepacalc.com/finance/',
          collection: {
            url: 'https://nepacalc.com/finance/',
            name: 'Finance & Tax Calculators',
            description: 'Free finance, tax, loan, investment and savings calculators.',
          },
          itemList: {
            url: 'https://nepacalc.com/finance/',
            name: 'Finance & Tax Calculators - List',
            description: 'List of calculators in Finance & Tax Calculators',
            items: financeTools.map((calculator, index) => ({
              position: index + 1,
              name: calculator.name,
              url: `https://nepacalc.com${calculator.slug.includes('/') ? '/' + calculator.slug : '/calculator/' + calculator.slug}/`,
            })),
          }
        }}
      />
      <CalcWrapper
        title="Finance & Tax Calculators"
        description="Free financial calculators for loans, EMI, mortgages, SIP, compound interest, fixed deposits, savings and financial planning — including Nepal-focused tools."
        crumbs={[{ label: 'Finance & Tax' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

          {/* About section */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#202124]">About Finance Calculators</h2>
            <p className="text-[#5f6368] leading-relaxed">
              NepaCalc provides financial calculators for common planning tasks including loan and EMI estimates, investment growth, savings targets, interest comparisons and Nepal tax-related calculations. Results are estimates based on the inputs and assumptions entered — verify final figures with your bank, financial advisor or the relevant official source before making financial decisions.
            </p>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
