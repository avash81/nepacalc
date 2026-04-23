import { CALCULATORS } from '@/data/calculators';
import Link from 'next/link';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';
import { Calculator, Receipt, Landmark, TrendingUp, GraduationCap, Ruler, ShieldCheck, Compass, ArrowRight, Zap, Target, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nepal Calculators Tax Land and Financial Tools NepaCal',
  description: 'All 24 official Nepal specific calculators for income tax loan EMI NEPSE WACC SEE GPA and more. Accurate institutional grade tools for Nepal. Try NepaCal now',
  keywords: ['nepal calculator', 'income tax calculator nepal', 'nepse calculator', 'see gpa calculator', 'nepal specific tools', 'tds calculator nepal'],
  alternates: { 
    canonical: 'https://nepacalc.com/nepal',
  }
};

const TOP_TOOLS = [
  { slug: 'nepal-income-tax', title: 'Income Tax', desc: 'FY 2082/83 brackets and full deductions.', icon: <Receipt className="w-5 h-5" />, color: '#059669' },
  { slug: 'loan-emi', title: 'Home Loan EMI', desc: 'NRB-standard amortization and schedules.', icon: <Landmark className="w-5 h-5" />, color: '#0891b2' },
  { slug: 'nepal-stocks', title: 'NEPSE Trade', desc: 'Broker commissions and CGT simulations.', icon: <TrendingUp className="w-5 h-5" />, color: '#7c3aed' },
  { slug: 'see-gpa', title: 'SEE Result', desc: 'NEB letter grade and GPA conversion.', icon: <GraduationCap className="w-5 h-5" />, color: '#dc2626' },
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
    answer: "While our engines process exact mathematical compliance based on Inland Revenue Department rules, results serve as estimates for planning."
  }
];

export default function NepalPillarPage() {
  const nepalTools = CALCULATORS.filter(c => c.isNepal);
  const regularTools = nepalTools.filter(c => !TOP_TOOLS.some(t => t.slug === c.slug));

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Nepal Specific', item: 'https://nepacalc.com/nepal' }
        ]}
      />
      
      <div className="min-h-screen bg-[#FDFDFD]">
        {/* Premium Brand Header */}
        <header className="pt-24 pb-12 bg-white border-b border-slate-100">
          <div className="hp-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-6 text-red-600">
                  <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Institutional Hub</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
                  Nepal Specific Calculators
                </h1>
                <p className="text-[15px] sm:text-[16px] text-slate-500 font-medium leading-relaxed italic">
                  "The most comprehensive suite of legal, financial, and educational instruments tailored for the Nepalese ecosystem."
                </p>
              </div>
              
              <div className="flex items-center gap-4 py-3 px-5 bg-slate-50 rounded-2xl border border-slate-100">
                 <Globe className="w-5 h-5 text-slate-400" />
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Compliance</span>
                    <span className="text-[11px] font-bold text-slate-900">FY 2082/83 Mandates Active</span>
                 </div>
              </div>
            </div>
          </div>
        </header>

        <main className="hp-container py-12 space-y-24">
          {/* Quick Access Grid */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TOP_TOOLS.map((tool, i) => (
                <Link key={i} href={`/calculator/${tool.slug}`} className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-500 flex flex-col relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 group-hover:rotate-12 transition-transform">
                      {tool.icon}
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                      <div className="text-slate-400 group-hover:text-red-600 transition-colors">
                        {tool.icon}
                      </div>
                   </div>
                   <h3 className="text-lg font-black text-slate-800 mb-2 tracking-tight">{tool.title}</h3>
                   <p className="text-[13px] text-slate-400 font-medium mb-8 flex-1 leading-relaxed">{tool.desc}</p>
                   <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-red-500 pb-1">Open Tool</span>
                     <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:text-red-500 transition-all" />
                   </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Full Tools Library */}
          <section className="bg-slate-900 rounded-[3rem] p-8 sm:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 blur-[120px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24">
               <div className="lg:w-1/3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full mb-6">
                    <Zap className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-[10px] font-black text-red-100 uppercase tracking-widest">Library</span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight mb-6 leading-tight">Complete <br/> Resource Suite.</h2>
                  <p className="text-[15px] text-slate-400 font-medium leading-relaxed">All calculators are calibrated against official government and banking documentation for the current fiscal period.</p>
                  
                  <div className="mt-12 space-y-8">
                     {[
                       { title: 'Taxation Standards', icon: <Target className="w-4 h-4" /> },
                       { title: 'Banking Compliance', icon: <Landmark className="w-4 h-4" /> },
                       { title: 'Educational Scaling', icon: <GraduationCap className="w-4 h-4" /> },
                     ].map((item, i) => (
                       <div key={i} className="flex items-center gap-4 group">
                          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                            {item.icon}
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{item.title}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {regularTools.map(calc => (
                      <Link
                        key={calc.id}
                        href={`/calculator/${calc.slug}`}
                        className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
                      >
                        <div className="text-2xl opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">{calc.icon}</div>
                        <span className="text-[14px] font-bold text-white/90 group-hover:text-white transition-colors">
                          {calc.name}
                        </span>
                      </Link>
                    ))}
                  </div>
               </div>
            </div>
          </section>

          {/* Validation & FAQs */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
             <div>
                <PillarFAQ faqs={NEPAL_FAQS} title="Trust & Accuracy Report" />
             </div>
             <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                   <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Authoritative Verification.</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed mb-8">
                   NEPACALC is the only platform in Nepal that undergoes monthly manual validation against official IRD tax circulars and NRB monetary reports. This ensures that when you calculate your salary, loans, or stock trades, you are seeing data that is compliant with the highest national standards.
                </p>
                <Link href="/contact" className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-300 hover:border-slate-900 pb-1 transition-all">Report a variance →</Link>
             </div>
          </section>
        
      
    

      
    </main>
      </div>
    
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
    </>
  );
}

