import { calcMeta } from '@/lib/calcMeta';
import NepalTaxCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

export const metadata = calcMeta({
  title: "Nepal Calculators and Tools at NepaCal",
  description: "Find Nepal specific calculators for EMI VAT TDS salary Nepali date conversion and more. NepaCal is Nepals trusted free calculator site",
  slug: 'nepal-income-tax',
  keywords: ["nepal calculator", "nepal", "calculator", "free", "online"],
});

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
    <CalcWrapper
      title="Nepal Income Tax Calculator"
      description="Professional-grade calculator for personal income tax in Nepal based on latest fiscal mandates."
      crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Income Tax' }]}
      isNepal={true}
      relatedCalcs={[
        { name: 'Salary Calculator', slug: 'nepal-salary' },
        { name: 'Nepal TDS', slug: 'nepal-tds-calculator' },
        { name: 'VAT & Bill Calc', slug: 'nepal-vat' }
      ]}
      formula="Marginal Tax = Σ (Slab_Income * Slab_Rate) - Deductions (SSF/CIT/Insurance)"
    >
      
      <NepalTaxCalculator />

      {/* 🛡️ SEO Authority Layer (Static Server-Rendered Content) */}
      <div className="hp-container pb-24 border-t border-slate-100 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-100 group aspect-video relative">
             <img 
               src="/nepal_income_tax_guide_visual_1776445134235.png" 
               alt="Official Nepal Income Tax Calculation Guide - NEPACALC Institutional Data"
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               title="Nepal Tax System Guide"
               loading="lazy"
               decoding="async"
             />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-50 px-6 py-3 rounded-2xl inline-block">
            Professional Guide: Nepal Income Tax Logic
          </h2>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
              As per the <strong>Income Tax Act 2058</strong> and the latest guidelines from the <strong>Inland Revenue Department (IRD) Nepal</strong>, calculating your taxable income for the latest fiscal environment requires a precise understanding of the progressive slab system. NEPACALC provides this authoritative tool to help salaried individuals and entrepreneurs plan their finances with laboratory-grade accuracy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">Fiscal Deductions</h3>
                <ul className="space-y-4 text-sm font-bold text-slate-600">
                  <li className="flex justify-between"><span>SSF/CIT Limit:</span> <span className="text-blue-600">NPR 5,00,000</span></li>
                  <li className="flex justify-between"><span>Life Insurance:</span> <span className="text-blue-600">NPR 40,000</span></li>
                  <li className="flex justify-between"><span>Health Insurance:</span> <span className="text-blue-600">NPR 20,000</span></li>
                </ul>
              </div>
              <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 shadow-sm">
                <h3 className="text-lg font-black text-blue-900 mb-6 uppercase tracking-widest border-b border-blue-100 pb-2">The 1% Advantage</h3>
                <p className="text-xs text-blue-800 leading-relaxed font-semibold">
                  Individuals formally contributing to the <strong>Social Security Fund (SSF)</strong> are completely exempt from the base 1% Social Security Tax on their initial income bracket. This reform is part of the latest fiscal mandates to increase formal sector security.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-6">How Your Tax is Calculated (Marginal Slabs)</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Nepal uses a marginal tax system. If you earn NPR 1,500,000, you don&apos;t pay 30% on the whole amount. Your income is divided into slices: the first 5-6 Lakhs are taxed at 1% (or 0% for SSF), the next 2 Lakhs at 10%, and so on. This ensures a fair progressive burden on higher earners while protecting lower-income residents.
            </p>

            <div className="bg-[#002147] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
               <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC107] mb-6">Audit Transparency FAQ</h4>
               <div className="space-y-8">
                  <div>
                    <h5 className="text-sm font-black mb-2 italic underline decoration-[#FFC107] decoration-2">What is the tax slab for couples?</h5>
                    <p className="text-xs text-white/70 leading-relaxed">For the current fiscal year, the married (couple) taxpayer limit for the 1% slab is typically higher, providing an additional buffer compared to individual taxpayers.</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-black mb-2 italic underline decoration-[#FFC107] decoration-2">Are provident funds taxable?</h5>
                    <p className="text-xs text-white/70 leading-relaxed">Contributions to EPF and CIT are deducted FROM your gross salary BEFORE calculation, making them tax-free up to the prevailing legal limits.</p>
                  </div>
               </div>
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
            { "@type": "Question", "name": "How to use the Nepal Calculators and Tools at NepaCal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free nepal calculator tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this Nepal Calculators and Tools at NepaCal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's Nepal Calculators and Tools at NepaCal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Nepal Calculators and Tools at NepaCal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>nepal calculator</strong> is optimized for Nepalese users. Whether you need an online nepal calculator or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>nepal calculator</strong>, <strong>dollar to rupee nepali</strong>, <strong>nepali time right now</strong>, <strong>american dollar in nepali rupees</strong>, <strong>pound into nepali</strong>, <strong>dollar into nepali</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Nepal Calculators and Tools at NepaCal?</span>
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
              Yes, our <strong>nepal calculator</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
