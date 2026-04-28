import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "SEE GPA Calculator 2081 | Secondary Education Examination Nepal",
  description: "Calculate your SEE GPA online based on the latest 2081 grading system in Nepal. Convert marks to grades for all subjects instantly. Official NEB standards.",
  slug: 'see-gpa',
  keywords: ["see gpa calculator", "calculate see results", "see grading system nepal", "neb see gpa", "convert see marks to gpa", "secondary education examination"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />

      {/* SEO Rich Content - Server Rendered for Googlebot */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#202124] mb-6">New SEE Grading System Nepal 2081 (2024)</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="prose prose-sm text-[#5F6368] leading-relaxed">
                <p>
                  The National Examination Board (NEB) of Nepal has implemented a standardized <strong>SEE Grading System</strong> for the Secondary Education Examination. This <strong>SEE GPA Calculator</strong> is updated with the latest letter grading guidelines, ensuring students can accurately project their GPA based on their internal and external marks.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase text-[#202124] tracking-widest border-l-4 border-indigo-600 pl-3">Official Letter Grading Scale</h3>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-md">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Percentage Range</th>
                        <th className="px-4 py-3">Letter Grade</th>
                        <th className="px-4 py-3">Grade Point</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">90% and above</td><td className="px-4 py-3 text-indigo-600 font-bold">A+</td><td className="px-4 py-3 text-emerald-600 font-black">4.0</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">80% to 90%</td><td className="px-4 py-3 text-indigo-600 font-bold">A</td><td className="px-4 py-3 text-emerald-600 font-black">3.6</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">70% to 80%</td><td className="px-4 py-3 text-indigo-600 font-bold">B+</td><td className="px-4 py-3 text-emerald-600 font-black">3.2</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">60% to 70%</td><td className="px-4 py-3 text-indigo-600 font-bold">B</td><td className="px-4 py-3 text-emerald-600 font-black">2.8</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">50% to 60%</td><td className="px-4 py-3 text-indigo-600 font-bold">C+</td><td className="px-4 py-3 text-emerald-600 font-black">2.4</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">40% to 50%</td><td className="px-4 py-3 text-indigo-600 font-bold">C</td><td className="px-4 py-3 text-emerald-600 font-black">2.0</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">35% to 40%</td><td className="px-4 py-3 text-indigo-600 font-bold">D</td><td className="px-4 py-3 text-emerald-600 font-black">1.6</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Below 35%</td><td className="px-4 py-3 text-red-600 font-bold">NG</td><td className="px-4 py-3 text-red-600 font-black">0.0</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#F8F9FA] p-6 rounded-lg border border-[#DADCE0]">
                <h3 className="text-lg font-bold text-[#202124] mb-4">How is SEE GPA Calculated?</h3>
                <p className="text-sm text-[#5F6368] mb-4">Calculation of your GPA involves weighting subject-specific grade points by their respective credit hours (usually 4 for main subjects).</p>
                <div className="p-4 bg-white border border-[#DADCE0] rounded font-mono text-[11px] text-[#202124] mb-4">
                  GPA = Σ(Grade Point × Credit Hours) / Σ(Total Credit Hours)
                </div>
                <p className="text-xs text-[#70757A] leading-relaxed">Our <strong>online SEE calculator</strong> automates this entire process. Simply select your grade for each subject, and the system will provide your final GPA instantly.</p>
              </div>

              <div className="p-6 bg-[#E8F0FE] rounded-lg border border-[#D2E3FC]">
                <h4 className="text-sm font-black text-[#1967D2] uppercase tracking-wider mb-2">Important Note for 2081</h4>
                <p className="text-xs text-[#5F6368] leading-relaxed">Under the new Letter Grading Directive 2078, students must score at least 35% in theoretical exams (35 out of 100) to avoid an 'NG' (Non-Graded) result. This rule is strictly enforced to ensure basic academic proficiency.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#F1F3F4]">
            <h3 className="text-xl font-black text-[#202124] mb-6">Secondary Education Examination FAQs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { q: "What is NG in SEE results?", a: "NG stands for Non-Graded. It is awarded when a student fails to achieve the minimum required percentage (35%) in either the internal or external assessment of a subject." },
                { q: "Can I use this for the old 2072 system?", a: "Yes, while the primary engine is optimized for the latest 2081 system, the core mapping of percentage to grade remains compatible with the general NEB framework used since 2072." },
                { q: "How many subjects are included in the SEE GPA?", a: "Standard SEE results include 8 subjects. Our calculator provides inputs for all compulsory subjects and optional subjects to ensure a complete and accurate GPA projection." },
                { q: "Is the SEE result published in GPA or percentage?", a: "Since 2072 BS, the National Examination Board (NEB) publishes results in Grade Point Average (GPA) and Letter Grades. Percentages are internal calculations used to derive these grades." }
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-sm font-bold text-[#202124]">{faq.q}</h4>
                  <p className="text-sm text-[#5F6368] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
