import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Nepal Land Measurement Calculator (Ropani-Aana-Bigha)',
  description: 'Convert between Ropani, Aana, Bigha, Kattha and Square Feet with precision. Official Nepal land unit converter for all regions.',
  slug: 'nepal-land',
  keywords: ['nepal land calculator', 'ropani to sq ft', 'bigha to ropani', 'land measurement nepal', 'aana to sq ft']
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
    </div>
  );
}
