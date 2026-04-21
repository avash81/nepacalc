import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nepal Calculators — Tax, EMI, NEPSE & GPA | NEPACALC',
  description: 'All 23 official Nepal-specific calculators: Income Tax 2082/83, Loan EMI, NEPSE WACC, SEE GPA, Vehicle Tax, Remittance, Gold Price, and more. Free, accurate, institutional-grade.',
  keywords: ['nepal calculator', 'income tax calculator nepal', 'nepse calculator', 'see gpa calculator', 'nepal specific tools', 'tds calculator nepal'],
  alternates: { canonical: 'https://nepacalc.com/nepal' },
  openGraph: {
    title: 'Nepal Specific Calculators — NEPACALC',
    description: 'The most complete suite of Nepal financial, legal, and educational calculators. 23 tools updated for FY 2082/83.',
    url: 'https://nepacalc.com/nepal',
  }
};

const TOP_TOOLS = [
  { slug: 'nepal-income-tax', title: 'Income Tax Calculator', desc: 'Compute Nepal income tax for FY 2082/83 with full deductions, slabs, and take-home projections.', icon: '📝', color: '#059669' },
  { slug: 'loan-emi', title: 'Home Loan EMI', desc: 'Calculate EMI for NRB-compliant home loans with amortization schedule and total repayment summary.', icon: '🏠', color: '#0891b2' },
  { slug: 'nepal-stocks', title: 'NEPSE Trading Calculator', desc: 'Simulate NEPSE share trades including broker commission, DP charge, and capital gains tax.', icon: '📈', color: '#7c3aed' },
  { slug: 'see-gpa', title: 'SEE GPA Calculator', desc: 'Compute SEE result GPA using the latest NEB letter grade conversion scale.', icon: '🅰️', color: '#dc2626' },
];

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
  const existingTools = category.calculators.filter(c => !TOP_TOOLS.some(t => t.slug === c.slug));

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Nepal Specific', item: 'https://nepacalc.com/nepal' }
        ]}
      />
      <JsonLd
        type="calculator"
        name="NEPACALC Nepal Specific Suite"
        description="The most complete suite of Nepal financial, legal, and educational calculators."
        url="https://nepacalc.com/nepal"
        category="FinancialApplication"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-20 pb-8 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">🇳🇵</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#059669]">Nepal Specific</span>
            </div>
            <h1 className="text-[36px] sm:text-[48px] font-black text-[#202124] tracking-tight leading-tight mb-4">
              Nepal Calculators
            </h1>
            <p className="text-[16px] text-[#5f6368] max-w-2xl leading-relaxed">
              Free suite of {category.calculators.length} institutional-grade calculators designed for Nepal. High-precision tools natively tailored for local inland revenue taxation, national banking directives, and examination board standards.
            </p>
          </div>
        </section>

        {/* Advanced Tools */}
        <section className="max-w-6xl mx-auto px-6 pt-6 pb-16">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#059669] mb-8 border-b-2 border-slate-100 pb-2">
            Advanced Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_TOOLS.map(tool => (
              <Link
                href={tool.slug.includes('/') ? `/${tool.slug}` : `/calculator/${tool.slug}`}
                key={tool.title}
                className="group relative rounded-2xl border border-slate-200 p-6 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden block"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-[18px] font-bold text-[#202124] mb-2">{tool.title}</h3>
                  <p className="text-[13px] text-[#5f6368] leading-relaxed mb-4">{tool.desc}</p>
                  <span
                    className="inline-block px-4 py-2 rounded-full text-[12px] font-bold text-white transition-all hover:opacity-90"
                    style={{ background: tool.color }}
                  >
                    Open Tool →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Regular Calculators */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#059669] mb-8 border-b-2 border-slate-100 pb-2">
            Regular Calculators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {existingTools.map(calc => (
              <Link
                key={calc.id}
                href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#059669] hover:bg-[#05966908] transition-all group"
              >
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[13px] font-medium text-[#202124] group-hover:text-[#059669] transition-colors truncate">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <PillarFAQ faqs={NEPAL_FAQS} title="Nepal Tools Facts" />
        </section>

        {/* SEO Block */}
        <section className="border-t border-slate-200 py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[16px] font-black text-[#202124] mb-3">
              NEPACALC — Built for Nepal
            </h2>
            <p className="text-[13px] text-[#5f6368] leading-relaxed">
              NEPACALC is the most comprehensive free calculator platform built specifically for Nepal. Our income tax engine processes the exact progressive slabs published by the Inland Revenue Department (IRD) for Fiscal Year 2082/83, supporting married, single, and senior-citizen filers. The NEPSE trading calculator applies the exact broker commission matrix mandated by SEBON, including DP charges and 5% CGT on listed securities. Our SEE GPA tool precisely maps raw subject marks to the NEB letter grade and GPA scale. All tools are client-side with no data transmitted to servers — your financial and academic information stays entirely on your device.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
