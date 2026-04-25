import { CATEGORIES, CALCULATORS } from '@/data/calculators';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finance Calculators and Tax Tools Nepal NepaCal',
  description: 'Best collection of finance calculators and tax tools for Nepal. Calculate income tax EMI VAT TDS and salary breakdown easily. Try NepaCal now',
  keywords: ['emi calculator nepal', 'sip calculator', 'loan calculator', 'compound interest calculator', 'fd calculator nepal'],
  alternates: { 
    canonical: 'https://nepacalc.com/finance/',
    languages: {
      'en-NP': 'https://nepacalc.com/finance/',
      'x-default': 'https://nepacalc.com/finance/'
    }
  },
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
  const financeTools = [
    ...CATEGORIES.find(c => c.id === 'finance')!.calculators,
    CALCULATORS.find(c => c.id === 'currency-converter')!
  ].filter(Boolean);
  
  const existingTools = financeTools.filter(c => !TOP_TOOLS.some(t => t.slug === c.slug));

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
            <h1 className="text-[18px] sm:text-[24px] font-black text-[#202124] tracking-tight leading-tight mb-2">
              Finance and Tax Tools Nepal
            </h1>
            <p className="text-[13px] text-[#5f6368] max-w-2xl leading-relaxed">
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
              <Link href={tool.slug.includes('/') ? `/${tool.slug}` : `/calculator/${tool.slug}`} key={tool.title} className="group relative rounded-xl border border-slate-200 p-3 hover:border-transparent hover:shadow-lg transition-all duration-300 overflow-hidden block">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />
                <div className="relative z-10">
                  <div className="text-xl mb-2">{tool.icon}</div>
                  <h3 className="text-[13px] font-bold text-[#202124] mb-1">{tool.title}</h3>
                  <p className="text-[11px] text-[#5f6368] leading-relaxed mb-2">{tool.desc}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white transition-all hover:opacity-90" style={{ background: tool.color }}>
                    Open Tool →
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
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {existingTools.map(calc => (
              <Link key={calc.name} href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#4361ee] hover:bg-[#4361ee08] transition-all group min-h-[56px]">
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#202124] group-hover:text-[#4361ee] transition-colors leading-tight">
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
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Finance Hub Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/finance/ tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"refinance calculator\" with 1,900+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Finance Hub Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Finance Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this calcul finance accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/finance/?","acceptedAnswer":{"@type":"Answer","text":"Our Finance Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can business finance calculator instantly without manual errors."}},{"@type":"Question","name":"Can I use this refinance calculator on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/finance/ is fully responsive for mobile devices and desktops. Whether you search \"boat finance calculator\" or \"refinance calculator\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Finance Hub Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our business loan finance calculator uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"refinance calculator\" and \"define pmt finance\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/finance/\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/finance/\" is one of the most searched terms with 1,900+ monthly searches in Nepal in Nepal. Our Finance Hub Calculator helps you get accurate results for \"business finance calculator\", \"boat finance calculator\", and \"finance calculator loan calculator\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Finance Hub Calculator - NepaCal","url":"https://nepacalc.com/finance","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"1900","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":383}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Finance Hub Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/finance/</strong> for Nepal? NepaCal&apos;s Finance Hub Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>business finance calculator</strong>, find a reliable <strong>boat finance calculator</strong>, or simply understand <strong>business loan finance calculator</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/finance/</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>refinance calculator</strong>, <strong>calcul finance</strong>, <strong>business finance calculator</strong>, <strong>boat finance calculator</strong>, <strong>business loan finance calculator</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Finance Hub Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Finance Hub Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/finance/</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "refinance calculator" with 1,900+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Finance Hub Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Finance Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>calcul finance</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/finance/?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Finance Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>business finance calculator</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this refinance calculator on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/finance/</strong> is fully responsive for mobile devices and desktops. Whether you search "boat finance calculator" or "refinance calculator" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Finance Hub Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>business loan finance calculator</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "refinance calculator" and "define pmt finance" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/finance/" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/finance/" is one of the most searched terms with 1,900+ monthly searches in Nepal in Nepal. Our Finance Hub Calculator helps you get accurate results for "business finance calculator", "boat finance calculator", and "finance calculator loan calculator" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
