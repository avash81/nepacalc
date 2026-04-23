import { calcMeta } from '@/lib/calcMeta';
import EMICalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

export const metadata = calcMeta({
  title: "EMI Calculator Nepal Loan Payment NepaCal",
  description: "Calculate monthly EMI for home car or personal loans in Nepal. Free EMI calculator with full amortization schedule and interest breakup at NepaCal",
  slug: 'loan-emi',
  keywords: ["emi calculator", "nepal", "calculator", "free", "online"],
});

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Loan EMI Pro"
        description="Institutional-grade loan installment calculator with amortization schedules for home, car, and personal loans."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Loan EMI' }]}
        relatedCalcs={[
          { name: 'Mortgage Calculator', slug: 'mortgage-calculator' },
          { name: 'Compound Interest', slug: 'compound-interest' },
          { name: 'SIP Investment', slug: 'sip-calculator' }
        ]}
        formula="EMI = [P x R x (1+R)^N] / [(1+R)^N-1]"
      >
        <EMICalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
        <div className="max-w-4xl mx-auto">
           <div className="mb-16 rounded-[3rem] overflow-hidden shadow-2xl shadow-[#FFC107]/10 border border-slate-100 group aspect-video relative">
              <img 
                src="/loan_emi_banking_visual_1776445660645.png" 
                alt="Institutional Loan EMI Calculation and Banking Interest Rate Guide - NEPACALC Finance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                title="Loan EMI Professional Guide"
                loading="lazy"
                decoding="async"
              />
           </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-50 px-6 py-3 rounded-2xl inline-block">
            Professional Guide: Loan EMI in Nepal
          </h2>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
              Understanding your <strong>Equated Monthly Installment (EMI)</strong> is the first step toward responsible financial planning in Nepal. Whether you are applying for a home loan (Ghar Karja), an auto loan, or a personal credit line from commercial banks, the NEPACALC laboratory uses verified reducing-balance math to provide you with total clarity on your repayment obligations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">The EMI Formula</h3>
                <p className="text-xs font-mono bg-white p-4 rounded-xl border border-slate-200 text-blue-600 mb-4">
                  EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Where P is Principal, R is monthly interest rate, and N is tenure in months.
                </p>
              </div>
              <div className="p-8 bg-[#002147] rounded-[2.5rem] border border-blue-100 shadow-sm text-white">
                <h3 className="text-lg font-black text-[#FFC107] mb-6 uppercase tracking-widest border-b border-white/10 pb-2">Institutional Tip</h3>
                <p className="text-xs text-white/70 leading-relaxed font-semibold">
                  Most Nepalese banks use a <strong>Reducing Balance</strong> method. This means interest is calculated on the outstanding principal, so every rupee you pay towards your principal today saves you significant interest over the life of the loan.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-6">Fixed vs. Floating Rates in Nepal</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              When using the NEPACALC EMI tool, consider if your bank offers a <strong>Fixed Rate</strong> or a <strong>Floating Rate</strong> (Base Rate + Premium). In the Nepalese banking sector, floating rates can fluctuate based on liquidity, meaning your EMI may change over time. Always check your loan agreement for the "Review Period" to predict future payment shifts.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-[2rem]">
               <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-900 mb-4">Why Accuracy Matters</h4>
               <p className="text-xs text-blue-800 leading-relaxed">A simple error of 0.25% in interest rate or 1 year in tenure can result in hundreds of thousands of rupees in "hidden" interest. NEPACALC ensures your planning is based on high-precision physics-grade mathematics.</p>
            </div>
          </div>
        </div>
      </div>
      </CalcWrapper>
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How to use the EMI Calculator Nepal Loan Payment NepaCal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free emi calculator tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this EMI Calculator Nepal Loan Payment NepaCal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's EMI Calculator Nepal Loan Payment NepaCal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the EMI Calculator Nepal Loan Payment NepaCal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>emi calculator</strong> is optimized for Nepalese users. Whether you need an online emi calculator or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>emi calculator</strong>, <strong>emi calculator calculator</strong>, <strong>dirham emirati to dollar</strong>, <strong>how to calculate the perimeter of a semi circle</strong>, <strong>area semicircle</strong>, <strong>how do you find the volume of a hemisphere</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the EMI Calculator Nepal Loan Payment NepaCal?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Enter your values above to get results instantly.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is it accurate for Nepal?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Yes, our <strong>emi calculator</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
