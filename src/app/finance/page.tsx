import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { ChevronRight, Star, Flame } from 'lucide-react';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finance & Tax Calculators — EMI, SIP, CAGR, FD | NEPACALC',
  description: 'Free finance calculators: Loan EMI, SIP Investment, Compound Interest, CAGR, Fixed Deposit, Currency Converter and more. Professional-grade tools for Nepali investors.',
  keywords: ['emi calculator nepal', 'sip calculator', 'loan calculator', 'compound interest calculator', 'fd calculator nepal'],
  alternates: { canonical: 'https://nepacalc.com/finance' },
};

const FINANCE_FAQS = [
  {
    question: "How accurate are the loan and investment calculators?",
    answer: "Our financial calculators utilize high-precision floating-point arithmetic to match institutional banking standards, ensuring precise EMI, SIP, and taxation projections."
  },
  {
    question: "Is my financial data stored or tracked?",
    answer: "Absolutely not. All financial calculations are executed entirely on the client side. Your inputted salary, loan amounts, and investment data never leave your local browser."
  },
  {
    question: "What compounding intervals are supported?",
    answer: "Our advanced calculators support monthly, quarterly, semi-annual, and annual compounding frameworks to accurately reflect retail banking and mutual fund behaviors."
  },
  {
    question: "Can I use these tools for business loan projections?",
    answer: "Yes. The amortization logic applies universally to personal, auto, home, and business term loans operating under standard reducing-balance interest models."
  }
];

export default function FinancePillarPage() {
  const category = CATEGORIES.find(c => c.id === 'finance')!;
  return (
    <CalcWrapper
      title="Finance & Tax"
      description={`${category.calculators.length} professional finance and banking calculators for investment planning and loan management.`}
      crumbs={[{ label: 'Finance & Tax Tools' }]}
    >
      <div className="py-8">

        {/* Clinical Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {category.calculators.map(calc => (
            <div key={calc.id} className="group flex flex-col gap-1 border-b border-slate-50 pb-4">
              <Link
                href={`/calculator/${calc.slug}`}
                className="text-[16px] font-bold text-[#1a73e8] hover:underline"
              >
                {calc.name}
              </Link>
              <p className="text-[13px] text-[#5f6368] leading-relaxed font-medium">
                {calc.description}
              </p>
            </div>
          ))}
        </div>

        {/* Institutional Authority Block */}
        <div className="mt-24 pt-12 border-t border-[#dadce0]">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl opacity-80">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Verification</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Formulas verified against standard banking interest models and latest tax slab circulars.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Precision</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Utilizes high-precision floating point arithmetic for professional-grade numeric results.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Usage</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Suitable for internal auditing, investment projection, and academic financial research.</p>
              </div>
           </div>
        </div>
        
        <PillarFAQ faqs={FINANCE_FAQS} title="Finance Tools Facts" />
      </div>
    </CalcWrapper>
  );
}
