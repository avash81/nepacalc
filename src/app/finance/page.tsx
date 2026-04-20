import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finance and Tax Calculators | EMI SIP CAGR FD | NEPACALC',
  description: 'Free finance calculators: Loan EMI, SIP Investment, Compound Interest, CAGR, Fixed Deposit, Currency Converter and more. Professional grade tools for Nepali investors.',
  keywords: ['emi calculator nepal', 'sip calculator', 'loan calculator', 'compound interest calculator', 'fd calculator nepal'],
  alternates: { canonical: 'https://nepacalc.com/finance' },
};

const FINANCE_FAQS = [
  { question: "How accurate are the loan and investment calculators?", answer: "Our financial calculators utilize high-precision floating-point arithmetic to match institutional banking standards, ensuring precise EMI, SIP, and taxation projections." },
  { question: "Is my financial data stored or tracked?", answer: "Absolutely not. All financial calculations are executed entirely on the client side. Your inputted salary, loan amounts, and investment data never leave your local browser." },
  { question: "What compounding intervals are supported?", answer: "Our advanced calculators support monthly, quarterly, semi-annual, and annual compounding frameworks to accurately reflect retail banking and mutual fund behaviors." },
  { question: "Can I use these tools for business loan projections?", answer: "Yes. The amortization logic applies universally to personal, auto, home, and business term loans operating under standard reducing balance interest models." }
];

const TOP_TOOLS = [
  { slug: 'loan-emi', title: 'Loan EMI Calculator', desc: 'Institutional grade EMI calculations with proper amortization schedules for home, auto, and personal loans.', icon: '🏦', color: '#4361ee' },
  { slug: 'sip-calculator', title: 'SIP Investment', desc: 'Project long term mutual fund wealth creation using standard compounding intervals.', icon: '📈', color: '#10b981' },
  { slug: 'mortgage-calculator', title: 'Mortgage Amortization', desc: 'Calculate home mortgage repayments with structured principal and interest breakdowns.', icon: '🏡', color: '#f59e0b' },
  { slug: 'compound-interest', title: 'Compound Interest', desc: 'Determine exact interest accrual on principal balances across different time intervals.', icon: '💸', color: '#8b5cf6' },
];

export default function FinancePillarPage() {
  const category = CATEGORIES.find(c => c.id === 'finance')!;
  const existingTools = category.calculators.filter(c => !TOP_TOOLS.some(t => t.slug === c.slug));

  return (
    <>
      <JsonLd type="breadcrumb" breadcrumbItems={[{ name: 'Home', item: 'https://nepacalc.com' }, { name: 'Finance', item: 'https://nepacalc.com/finance' }]} />
      <JsonLd type="calculator" name="NEPACALC Finance Suite" description="Professional finance calculators including EMI, SIP, and taxation projections." url="https://nepacalc.com/finance" category="FinancialApplication" />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-20 pb-8 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">🏦</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#4361ee]">Finance Suite</span>
            </div>
            <h1 className="text-[36px] sm:text-[48px] font-black text-[#202124] tracking-tight leading-tight mb-4">
              Finance & Tax Tools
            </h1>
            <p className="text-[16px] text-[#5f6368] max-w-2xl leading-relaxed">
              Professional banking and investment calculators. Plan your SIP investments, structure loan EMIs, and calculate compound growth accurately.
            </p>
          </div>
        </section>

        {/* Main tools grid */}
        <section className="max-w-6xl mx-auto px-6 pt-6 pb-16">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#4361ee] mb-8 border-b-2 border-slate-100 pb-2">
            Advanced Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_TOOLS.map(tool => (
              <Link href={tool.slug.includes('/') ? `/${tool.slug}` : `/calculator/${tool.slug}`} key={tool.title} className="group relative rounded-2xl border border-slate-200 p-6 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden block">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-[18px] font-bold text-[#202124] mb-2">{tool.title}</h3>
                  <p className="text-[13px] text-[#5f6368] leading-relaxed mb-4">{tool.desc}</p>
                  <span className="inline-block px-4 py-2 rounded-full text-[12px] font-bold text-white transition-all hover:opacity-90" style={{ background: tool.color }}>
                    Open Tool &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Existing calculators */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#4361ee] mb-8 border-b-2 border-slate-100 pb-2">
            Regular Calculators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {existingTools.map(calc => (
              <Link key={calc.name} href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#4361ee] hover:bg-[#4361ee08] transition-all group">
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[13px] font-medium text-[#202124] group-hover:text-[#4361ee] transition-colors truncate">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <PillarFAQ faqs={FINANCE_FAQS} title="Finance Tools Facts" />
        </section>

        {/* SEO Simple Summary */}
        <section className="border-t border-slate-200 py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[16px] font-black text-[#202124] mb-3">
              Finance & Banking Analysis
            </h2>
            <p className="text-[13px] text-[#5f6368] leading-relaxed">
              The NEPACALC Finance Toolkit delivers institutional precision for investors, auditors, and individuals. Built specifically for complex compounding environments, our engines map directly to official bank amortization equations and retail fund standards. Rather than relying on simple averages, our calculators handle actual calendar projections and exact interest models to guarantee accurate financial foresight. All operations are strictly executed client side for comprehensive privacy.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
