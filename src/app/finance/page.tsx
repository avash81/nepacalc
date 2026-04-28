import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata = calcMeta({
  title: 'Nepal Finance Calculators Tax VAT Loans More',
  description: 'Free Nepal finance calculators for income tax VAT TDS home loans FD SIP and gratuity. Updated for FY 2081 82. No signup needed.',
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

          {/* SEO Rich Content - ~1500+ Words Finance Hub */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm">
            <article className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-[#202124] mb-8">Mastering Your Financial Future with NepaCalc</h2>
              
              <p className="text-lg leading-relaxed text-[#5F6368]">
                In an era of economic volatility and complex banking products, sound financial planning is the only path to long-term security. <strong>NepaCalc</strong> provides a suite of bank-grade <strong>Finance and Tax Calculators</strong> designed to simplify your journey—from taking your first home loan to planning a multi-decade SIP investment strategy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="p-8 bg-[#E8F0FE] rounded-2xl border border-[#1A73E8]/20">
                  <h3 className="text-[#1967D2] font-black mb-4">The Power of Compounding</h3>
                  <p className="text-sm leading-relaxed">
                    Albert Einstein famously called compound interest the "eighth wonder of the world." Our <strong>SIP Calculator</strong> and <strong>Compound Interest Tool</strong> allow you to visualize how small, consistent monthly contributions grow exponentially over time. Understand the difference between simple and compound growth and how "interest on interest" creates wealth.
                  </p>
                </div>
                <div className="p-8 bg-[#F8F9FA] rounded-2xl border border-[#DADCE0]">
                  <h3 className="text-[#202124] font-black mb-4">Smart Debt Management</h3>
                  <p className="text-sm leading-relaxed">
                    Not all debt is bad, but all debt must be managed. Our <strong>Loan EMI Calculator</strong> uses standard amortization formulas to show you exactly how much interest you pay over the life of a loan. Compare different interest rates and tenures to see how an extra Rs. 5,000 in monthly repayment can save you lakhs in interest.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-black text-[#202124] mt-12">1. Investment Planning: SIPs and Mutual Funds</h3>
              <p>
                A Systematic Investment Plan (SIP) is a powerful tool for building wealth in the Nepalese and international markets. By investing a fixed amount regularly, you benefit from <strong>Rupee Cost Averaging</strong>—buying more units when prices are low and fewer when prices are high.
              </p>
              <p>
                Our <strong>SIP Calculator</strong> provides a detailed breakdown of your invested amount versus your estimated returns, helping you stay disciplined during market fluctuations.
              </p>

              <h3 className="text-2xl font-black text-[#202124] mt-12">2. Understanding Amortization: The Loan EMI Logic</h3>
              <p>
                When you take a loan, your monthly repayment (EMI) stays the same, but the composition of that payment changes every month. Early in the loan, most of your EMI goes toward interest. Over time, more goes toward the principal.
              </p>
              <p>
                Understanding this <strong>Reducing Balance Method</strong> is critical. Our tools generate a full amortization schedule so you can see your remaining balance after every payment, empowering you to make informed decisions about pre-payments or refinancing.
              </p>

              <h3 className="text-2xl font-black text-[#202124] mt-12">3. Savings Goals and Fixed Deposits</h3>
              <p>
                Whether you are saving for a down payment on a house, your child&apos;s education, or an emergency fund, you need a target. Our <strong>Savings Goal Calculator</strong> works backward—you tell us how much you need and by when, and we tell you exactly how much to save every month. 
              </p>
              <p>
                For lower-risk growth, use our <strong>FD Calculator (Fixed Deposit)</strong> to compare bank rates and understand the impact of quarterly vs. annual compounding on your principal.
              </p>

              <div className="mt-16 p-10 bg-[#1A73E8] text-white rounded-3xl shadow-xl">
                <h3 className="text-white text-2xl font-black mb-6">Bank-Grade Precision</h3>
                <p className="text-blue-50 leading-relaxed mb-8">
                  NepaCalc uses the same underlying algorithms used by leading financial institutions. Our formulas are strictly aligned with international standards:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1">Amortization</p>
                    <p className="font-bold text-sm">Reducing Balance Logic</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1">Growth</p>
                    <p className="font-bold text-sm">Compound Annual Rate</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1">Verification</p>
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
