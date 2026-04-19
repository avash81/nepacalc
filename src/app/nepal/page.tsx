import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Star, Flame } from 'lucide-react';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nepal Specific Calculators — Free Tax, EMI, NEPSE, SEE GPA Tools | NEPACALC',
  description: 'All 23 official Nepal-specific calculators: Income Tax 2082/83, Loan EMI, NEPSE WACC, SEE GPA, Vehicle Tax, Remittance, Gold Price, and more. Free, accurate, institutional-grade.',
  keywords: ['nepal calculator', 'income tax calculator nepal', 'nepse calculator', 'see gpa calculator', 'nepal specific tools', 'tds calculator nepal'],
  alternates: { canonical: 'https://nepacalc.com/nepal' },
  openGraph: {
    title: 'Nepal Specific Calculators — NEPACALC',
    description: 'The most complete suite of Nepal financial, legal, and educational calculators. 23 tools updated for FY 2082/83.',
    url: 'https://nepacalc.com/nepal',
  }
};

const NEPAL_FAQS = [
  {
    question: "How often are the Nepal tax brackets updated?",
    answer: "The income tax brackets are updated annually based on the Finance Bill passed by the Ministry of Finance, Nepal. Our engines reflect the current Fiscal Year 2082/83 mandates."
  },
  {
    question: "Do the financial calculators support Nepal Rastra Bank directives?",
    answer: "Yes, our EMI and Fixed Deposit algorithms are calibrated to align precisely with NRB interest compounding and amortization standards."
  },
  {
    question: "Are the calculations valid for official auditing?",
    answer: "While our engines process exact mathematical compliance based on Inland Revenue Department rules, results serve as estimates for planning. Official auditing should be conducted by certified chartered accountants."
  },
  {
    question: "Is the SEE GPA logic updated to the new letter grading system?",
    answer: "Absolutely. The SEE GPA calculator utilizes the latest curriculum grading scheme established by the National Examination Board (NEB)."
  }
];

export default function NepalPillarPage() {
  const category = CATEGORIES.find(c => c.id === 'nepal')!;

  return (
    <CalcWrapper
      title="Nepal Specific Tools"
      description={`Free suite of ${category.calculators.length} institutional-grade calculators designed for Nepal. High-precision tools natively tailored for local inland revenue taxation, national banking directives, and examination board standards.`}
      crumbs={[{ label: 'Nepal Specific Tools' }]}
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

        {/* Institutional SEO Block */}
        <div className="mt-24 pt-12 border-t border-[#dadce0]">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl opacity-80">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Compliance</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Verified against official Nepal Rastra Bank and Inland Revenue Department (IRD) guidelines.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Accuracy</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">High-precision numeric engines updated annually for Finance Bill mandates.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Privacy</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Client-side execution ensures your financial data never leaves your browser.</p>
              </div>
           </div>
        </div>
        
        <PillarFAQ faqs={NEPAL_FAQS} title="Nepal Tools Facts" />
      </div>
    </CalcWrapper>
  );
}
