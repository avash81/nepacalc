import { calcMeta } from '@/lib/calcMeta';
import NepalSalaryCalculator from './Calculator';

export const metadata = calcMeta({
  title: "Salary Calculator Net Pay Nepal NepaCal",
  description: "Calculate your monthly net salary and take home pay in Nepal. Free salary calculator with tax and deduction breakdown at NepaCal",
  slug: 'nepal-salary',
  keywords: ["salary calculator", "nepal", "calculator", "free", "online"],
});

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <NepalSalaryCalculator />
      
      {/* 🛡️ SEO Authority Layer (Static Server-Rendered Content) */}
      <div className="hp-container pb-24 border-t border-slate-100 pt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-50 px-6 py-3 rounded-2xl inline-block">
            Professional Guide: Salary & Payroll in Nepal
          </h2>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
              Navigating the payroll landscape in Nepal requires more than just a simple calculation—it requires alignment with the latest labor mandates of the fiscal year 2082/83. Whether you are an employer managing a team or an employee negotiating your package, the <strong>NEPACALC Salary Laboratory</strong> provides the precision needed to understand every deduction from SSF to local income tax.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="p-8 bg-[#002147] rounded-[3rem] border border-blue-100 shadow-2xl text-white relative group transition-all">
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <h3 className="text-lg font-black text-[#FFC107] mb-6 uppercase tracking-widest border-b border-white/10 pb-2">The SSF Mandate</h3>
                <p className="text-xs text-white/70 leading-relaxed font-semibold">
                  With the introduction of the <strong>Social Security Fund (SSF)</strong>, the traditional EPF/CIT landscape has shifted. Formal sector employees now see 11% of their basic salary deducted for SSF, with employers contributing an additional 20%. This tool precisely tracks these percentages to ensure your pay slip is compliant with modern labor laws.
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">Voluntary Deductions</h3>
                <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <li className="flex justify-between items-center"><span className="p-2 bg-white rounded-lg border border-slate-100">Citizen Investment (CIT)</span> <span className="text-blue-600">UP TO 33%</span></li>
                  <li className="flex justify-between items-center"><span className="p-2 bg-white rounded-lg border border-slate-100">Provident Fund (EPF)</span> <span className="text-blue-600">10% MANDATORY</span></li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-6">Gross vs. Net (Take-Home) Pay</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              In Nepal, your <strong>Gross Salary</strong> is the total amount before any deductions. However, your <strong>Net Salary</strong> (Take-Home) is what hits your bank account after Income Tax, SSF, and CIT deductions. NEPACALC uses the latest 2082/83 IRD tax slabs to ensure that your net income is calculated down to the rupee, accounting for married/unmarried status and insurance benefits.
            </p>

            <div className="bg-[#FFC107] text-black p-8 rounded-[2rem] border border-black shadow-xl">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Institutional Compliance Notice</h4>
               <p className="text-xs leading-relaxed font-bold">This payroll engine is verified against the latest budget speech directives. We ensure that our SSF and Tax logic is the most up-to-date mathematical model available in the Nepalese digital space.</p>
            </div>
          </div>
        </div>
      </div>
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How to use the Salary Calculator Net Pay Nepal NepaCal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free salary calculator tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this Salary Calculator Net Pay Nepal NepaCal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's Salary Calculator Net Pay Nepal NepaCal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Salary Calculator Net Pay Nepal NepaCal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>salary calculator</strong> is optimized for Nepalese users. Whether you need an online salary calculator or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>salary calculator</strong>, <strong>whats the salary</strong>, <strong>annual salary rate</strong>, <strong>hourly to salary calculator</strong>, <strong>monthly salary payment calculator</strong>, <strong>annual salary and hourly rate</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Salary Calculator Net Pay Nepal NepaCal?</span>
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
              Yes, our <strong>salary calculator</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
