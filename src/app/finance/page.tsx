import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { HubSEOContent } from '@/components/layout/HubSEOContent';
import type { Metadata } from 'next';

export const metadata = calcMeta({
  title: 'Nepal Finance Calculators Tax VAT Loans More',
  description: 'Free Nepal finance calculators for income tax VAT TDS home loans FD SIP and gratuity. Updated for FY 2082 82. No signup needed.',
  slug: 'finance',
  keywords: ['nepal finance calculator', 'tax calculator nepal', 'vat calculator nepal', 'loan emi calculator nepal', 'sip calculator nepal'],
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
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

          {/* SEO Rich Content, ~1500+ Words Finance Hub */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm">
            <article className="prose prose-slate max-w-none">
              <HubSEOContent category="finance" />
              
              <div className="mt-16 p-10 bg-[#1A73E8] text-white rounded-lg shadow-sm">
                <h3 className="text-white text-2xl font-black mb-6">Bank-Grade Precision</h3>
                <p className="text-blue-50 leading-relaxed mb-8">
                  NepaCalc uses the same underlying algorithms used by leading financial institutions. Our formulas are strictly aligned with international standards:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1 text-blue-100">Amortization</p>
                    <p className="font-bold text-sm">Reducing Balance Logic</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1 text-blue-100">Growth</p>
                    <p className="font-bold text-sm">Compound Annual Rate</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1 text-blue-100">Verification</p>
                    <p className="font-bold text-sm">NRB & IRD Compliant</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-[#202124] mt-12">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div className="p-6 border border-[#DADCE0] rounded-2xl">
                  <h4 className="font-black text-[#202124]">How does the SIP calculator work?</h4>
                  <p className="text-sm text-[#5F6368] mt-2">It uses the future value formula for an annuity: FV = P × [((1 + r)^n - 1) / r] × (1 + r), where P is the periodic investment, r is the monthly interest rate, and n is the total number of months.</p>
                </div>
                <div className="p-6 border border-[#DADCE0] rounded-2xl">
                  <h4 className="font-black text-[#202124]">What is the difference between Simple and Compound Interest?</h4>
                  <p className="text-sm text-[#5F6368] mt-2">Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus any interest that has already been added.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}

