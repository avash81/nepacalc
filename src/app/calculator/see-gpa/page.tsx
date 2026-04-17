import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'SEE GPA Calculator | Grade Point Average for Secondary Education Examination | NEPACALC',
  description: 'Calculate your SEE GPA based on the latest grading system from NEB Nepal. Average your marks and find your overall grade point accurately. Free online academic tool.',
  keywords: ['see gpa calculator', 'nepal see results', 'gpa calculator nepal', 'grade point average', 'school leaving certificate gpa', 'nepal see grading scale'],
  openGraph: {
    title: 'SEE GPA Calculator | NEPACALC',
    description: 'Calculate your SEE GPA accurately with the current NEB grading system.',
    url: 'https://nepacalc.com/calculator/see-gpa',
    siteName: 'NEPACALC',
    type: 'website',
  }
};

export default function SeeGpaPage() {
  return (
    <div className="bg-white min-h-screen">
       <Calculator />
       
       {/* 🛡️ SEO Authority Layer (Static Server-Rendered Content) */}
       <div className="hp-container pb-24 border-t border-slate-100 pt-20">
         <div className="max-w-4xl mx-auto">
           <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-50 px-6 py-3 rounded-2xl inline-block">
             Academic Guide: SEE Grading in Nepal
           </h2>
           
           <div className="prose prose-slate max-w-none">
             <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
               The <strong>Secondary Education Examination (SEE)</strong> is the gateway to higher education in Nepal. Since the transition to the letter grading system introduced by the National Examination Board (NEB), understanding how your raw marks translate to a Grade Point Average (GPA) is crucial for enrollment in Grade 11. The <strong>NEPACALC SEE Laboratory</strong> ensures your calculation is 100% compliant with the latest academic mandates.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
               <div className="p-8 bg-[#002147] rounded-[3rem] border border-blue-100 shadow-2xl text-white relative group transition-all">
                 <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                 <h3 className="text-lg font-black text-[#FFC107] mb-6 uppercase tracking-widest border-b border-white/10 pb-2">The Scale (A+ to E)</h3>
                 <p className="text-xs text-white/70 leading-relaxed font-semibold">
                   In the current Nepalese secondary system, marks are converted into Grade Points (GP). An <strong>A+</strong> (90-100%) earns a 4.0 GP, while an <strong>A</strong> (80-90%) earns a 3.6 GP. Our engine tracks these specific weightages to provide your aggregated average grade point.
                 </p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-sm">
                 <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">Internal vs. External</h3>
                 <p className="text-xs text-slate-500 leading-relaxed font-bold">
                   Modern SEE evaluations include both <strong>Internal (Practical)</strong> and <strong>External (Theory)</strong> assessments. To pass a subject, students must typically secure minimum grade thresholds in both components under the latest NEB directives.
                 </p>
               </div>
             </div>

             <h3 className="text-xl font-black text-slate-900 mb-6 font-bold uppercase tracking-tight">How to Calculate Overall GPA</h3>
             <p className="text-slate-600 text-sm mb-6 leading-relaxed">
               Your final GPA is the arithmetic mean of the grade points obtained in all subjects. For example, if you obtain a 4.0 in Mathematics and a 3.6 in Science, your average is 3.8. NEPACALC automates this for all core and optional subjects, accounting for credit hour distributions to ensure an accurate academic reflection.
             </p>

             <div className="bg-[#FFC107] text-black p-8 rounded-[2rem] border border-black shadow-xl">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Academic Compliance Notice</h4>
                <p className="text-xs leading-relaxed font-bold italic">This calculation model is verified against the latest NEB results publication criteria. We ensure that our GPA logic is the most up-to-date mathematical model available in the Nepal education space.</p>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
}
