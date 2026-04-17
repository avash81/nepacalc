import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

export const metadata = calcMeta({
  title: 'BMI Calculator — Healthy Weight Range (WHO)',
  description: 'Calculate your Body Mass Index (BMI) to determine your healthy weight range based on WHO standards. Supports metric and imperial units. Free online tool.',
  slug: 'bmi',
  keywords: ['bmi calculator', 'body mass index', 'healthy weight range', 'bmi chart', 'calculate bmi'],
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
             Laboratory Guide: Body Mass Index (BMI)
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
    </div>
  );
}
