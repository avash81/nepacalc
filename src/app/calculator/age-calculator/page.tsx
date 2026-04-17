import { calcMeta } from '@/lib/calcMeta';
import AgeCalculator from './Calculator';

export const metadata = calcMeta({
  title: 'Age Calculator — Exact Age in Years, Months, Days',
  description: 'Calculate your exact age in years, months, and days. Find out how many days you have lived, your next birthday, and day of birth. Free online tool.',
  slug: 'age-calculator',
  keywords: ['age calculator', 'calculate age', 'how old am i', 'birthday calculator', 'age in days'],
});

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
       <AgeCalculator />
       
       {/* 🛡️ SEO Authority Layer (Static Server-Rendered Content) */}
       <div className="hp-container pb-24 border-t border-slate-100 pt-20">
         <div className="max-w-4xl mx-auto">
           <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-50 px-6 py-3 rounded-2xl inline-block">
             Laboratory Guide: Chronological Measurement
           </h2>
           
           <div className="prose prose-slate max-w-none">
             <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
               Calculating age is more than just subtracting years—it requires precise accounting for <strong>Leap Years</strong> and the varying lengths of months in the Gregorian calendar. The <strong>NEPACALC Age Laboratory</strong> provides a high-fidelity chronological engine that breaks down your existence into years, months, weeks, days, and even minutes with mathematical certainty.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
               <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-sm transition-hover hover:border-blue-200">
                 <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">The Leap Year Logic</h3>
                 <p className="text-xs text-slate-500 leading-relaxed font-bold">
                   Our engine correctly accounts for years divisible by 4, except for century years that are not divisible by 400. This ensures that your "Days Lived" metric is accurate down to the final 24-hour cycle.
                 </p>
               </div>
               <div className="p-8 bg-[#002147] rounded-[3rem] border border-blue-100 shadow-2xl text-white relative group">
                 <h3 className="text-lg font-black text-[#FFC107] mb-6 uppercase tracking-widest border-b border-white/10 pb-2">Life Milestones</h3>
                 <p className="text-xs text-white/70 leading-relaxed font-semibold">
                   Track your next birthday countdown and find out the exact day of the week you were born. Whether for legal documentation or personal curiosity, NEPACALC provides the authoritative digital record.
                 </p>
               </div>
             </div>

             <div className="bg-[#FFC107] text-black p-8 rounded-[2rem] border border-black shadow-xl">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Precision Compliance Notice</h4>
                <p className="text-xs leading-relaxed font-bold italic">This chronological model is synchronized with international ISO 8601 date standards. We ensure that our age calculation logic is the most reliable tool for professional and legal verification in Nepal.</p>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
}
