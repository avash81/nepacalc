import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

export const metadata = calcMeta({
  title: "BMI Calculator Body Mass Index NepaCal",
  description: "Calculate your Body Mass Index BMI for free. Check if your weight is healthy using our BMI chart and formula calculator at NepaCal",
  slug: 'bmi',
  keywords: ["bmi calculator", "nepal", "calculator", "free", "online"],
});

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="BMI Calculator"
        description="Clinical-grade Body Mass Index engine for tracking healthy weight ranges based on WHO standards."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'BMI' }]}
        relatedCalcs={[
          { name: 'BMR Calories', slug: 'bmr' },
          { name: 'Body Fat %', slug: 'body-fat' },
          { name: 'Ideal Weight', slug: 'ideal-weight' }
        ]}
        formula="BMI = Weight (kg) / [Height (m) * Height (m)]"
      >
        <Calculator />
       <div className="hp-container pb-24 border-t border-slate-100 pt-20">
         <div className="max-w-4xl mx-auto">
           <div className="mb-16 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-100 group aspect-video relative">
              <img 
                src="/bmi_health_guide_visual_1776445172559.png" 
                alt="WHO BMI Standards and Healthy Weight Guide - NEPACALC Health Laboratory"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                title="BMI Health Guide"
                loading="lazy"
                decoding="async"
              />
           </div>

           <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-50 px-6 py-3 rounded-2xl inline-block">
             BMI Calculator Nepal Health Guide
           </h2>
           
           <div className="prose prose-slate max-w-none">
             <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
               The <strong>Body Mass Index (BMI)</strong> is a simple yet powerful heuristic used by the <strong>World Health Organization (WHO)</strong> to categorize human body weight into health-defined categories. While it does not measure body fat directly, research shows that BMI correlates highly with more direct measures of body fat. The <strong>NEPACALC Health Laboratory</strong> provides a clinical-grade engine to help you track your physical status with precision.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
               <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm transition-all hover:shadow-lg">
                 <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">WHO Categories</h3>
                 <ul className="space-y-4 text-xs font-bold text-slate-600">
                   <li className="flex justify-between"><span>Underweight:</span> <span className="text-blue-600">&lt; 18.5</span></li>
                   <li className="flex justify-between"><span>Healthy Range:</span> <span className="text-[#4CAF50]">18.5 – 24.9</span></li>
                   <li className="flex justify-between"><span>Overweight:</span> <span className="text-orange-600">25.0 – 29.9</span></li>
                   <li className="flex justify-between"><span>Obese:</span> <span className="text-red-600">&gt; 30.0</span></li>
                 </ul>
               </div>
               <div className="p-8 bg-[#002147] rounded-[3rem] border border-blue-100 shadow-2xl text-white relative group">
                 <h3 className="text-lg font-black text-[#FFC107] mb-6 uppercase tracking-widest border-b border-white/10 pb-2">Metric vs. Imperial</h3>
                 <p className="text-xs text-white/70 leading-relaxed font-semibold">
                   NEPACALC supports both centimeters/kilograms and feet-inches/pounds. Our engine uses the high-precision formula [Weight (kg) / Height (m)²] to ensure your biometric profile is calculated with laboratory accuracy.
                 </p>
               </div>
             </div>

             <h3 className="text-xl font-black text-slate-900 mb-6 font-bold uppercase tracking-tight text-center sm:text-left">Is BMI Enough?</h3>
             <p className="text-slate-600 text-sm mb-6 leading-relaxed">
               It is important to note that BMI has limitations. For athletes and individuals with high muscle mass, BMI may overestimate body fat. Conversely, in older adults, it may underestimate it. Use this tool as a starting point for specialized health discussions with a medical professional.
             </p>

             <div className="bg-[#FFC107] text-black p-8 rounded-[2rem] border border-black shadow-xl">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Health Verification Notice</h4>
                <p className="text-xs leading-relaxed font-bold italic">Our BMI model is verified against the latest WHO and Ministry of Health (Nepal) guidelines. We ensure that our health logic is the most reliable digital reference available for Nepalese residents.</p>
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
            { "@type": "Question", "name": "How to use the BMI Calculator Body Mass Index NepaCal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free bmi calculator tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this BMI Calculator Body Mass Index NepaCal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's BMI Calculator Body Mass Index NepaCal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the BMI Calculator Body Mass Index NepaCal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>bmi calculator</strong> is optimized for Nepalese users. Whether you need an online bmi calculator or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>bmi calculator</strong>, <strong>bmi calculator body mass index</strong>, <strong>female bmi formula</strong>, <strong>how can you calculate bmi</strong>, <strong>bmi how to compute</strong>, <strong>bmi calculator kids</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the BMI Calculator Body Mass Index NepaCal?</span>
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
              Yes, our <strong>bmi calculator</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
