import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Land Area Calculator Nepal Ropani Anna NepaCal",
  description: "Calculate and convert Nepal land measurements including Ropani Anna Paisa and Sqft. Free Nepal land area calculator at NepaCal",
  slug: 'nepal-land',
  keywords: ["land area calculator", "nepal", "calculator", "free", "online"]
});

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
       <Calculator />
       
       {/* 🛡️ SEO Authority Layer (Static Server-Rendered Content) */}
       <div className="hp-container pb-24 border-t border-slate-100 pt-20">
         <div className="max-w-4xl mx-auto">
           <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-50 px-6 py-3 rounded-2xl inline-block">
             Laboratory Guide: Nepal Land Measuring Systems
           </h2>
           
           <div className="prose prose-slate max-w-none">
             <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
               Land measurement in Nepal is governed by two distinct traditional systems that vary by geography. Whether you are navigating the steep terrain of the Hills or the flat plains of the Terai, the <strong>NEPACALC Land Laboratory</strong> provides the high-precision conversion engine needed to translate local units into modern Metric and Imperial standards (Square Feet and Square Meters).
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
               <div className="p-8 bg-[#002147] rounded-[3rem] border border-blue-100 shadow-2xl text-white relative group transition-all">
                 <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                 <h3 className="text-lg font-black text-[#FFC107] mb-6 uppercase tracking-widest border-b border-white/10 pb-2">The Hill System</h3>
                 <p className="text-xs text-white/70 leading-relaxed font-semibold">
                   In the Kathmandu Valley and hilly regions, land is measured using <strong>Ropani, Aana, Paisa, and Daam</strong>. One Ropani is exactly 16 Aana (5476 sq. ft.). This precise hierarchy is essential for official government registration and property valuation.
                 </p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-sm">
                 <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">The Terai System</h3>
                 <p className="text-xs text-slate-500 leading-relaxed font-bold">
                   In the southern plains, the <strong>Bigha, Kattha, and Dhur</strong> system is used. One Bigha consists of 20 Kattha (~72900 sq. ft.). NEPACALC’s engine seamlessly bridges these two systems, allowing for instantaneous cross-regional comparison.
                 </p>
               </div>
             </div>

             <h3 className="text-xl font-black text-slate-900 mb-6 font-bold uppercase tracking-tight">Standard Conversion Benchmarks</h3>
             <ul className="space-y-4 mb-10 text-sm font-bold text-slate-600">
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-600 rounded-full"></span> 1 Ropani = 74.73 Paisa = 5476 Square Feet</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-600 rounded-full"></span> 1 Bigha = 13.31 Ropani = 6772.63 Square Meters</li>
               <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-600 rounded-full"></span> 1 Aana = 4 Paisa = 342.25 Square Feet</li>
             </ul>

             <div className="bg-[#FFC107] text-black p-8 rounded-[2rem] border border-black shadow-xl">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Measurement Compliance Notice</h4>
                <p className="text-xs leading-relaxed font-bold italic">Our land conversion engine is based on the official cadastral survey standards of the Government of Nepal (Department of Survey). We ensure laboratory-grade precision for engineering and legal documentation requirements.</p>
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
            { "@type": "Question", "name": "How to use the Land Area Calculator Nepal Ropani Anna NepaCal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free land area calculator tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this Land Area Calculator Nepal Ropani Anna NepaCal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's Land Area Calculator Nepal Ropani Anna NepaCal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Land Area Calculator Nepal Ropani Anna NepaCal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>land area calculator</strong> is optimized for Nepalese users. Whether you need an online land area calculator or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>land area calculator</strong>, <strong>thailand current time right now</strong>, <strong>iceland time difference</strong>, <strong>stairs with landing</strong>, <strong>calander year</strong>, <strong>square feet calculation for land</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Land Area Calculator Nepal Ropani Anna NepaCal?</span>
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
              Yes, our <strong>land area calculator</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
