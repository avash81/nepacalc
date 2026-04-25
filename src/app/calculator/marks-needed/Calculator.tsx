'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { GraduationCap, Info } from 'lucide-react';

export default function MarksNeededCalculator() {
  const [current, setCurrent] = useState(60);
  const [target, setTarget] = useState(75);
  const [weight, setWeight] = useState(40);

  const r = useMemo(() => {
    const finalNeeded = (target - current * (1 - weight / 100)) / (weight / 100);
    return Math.max(0, finalNeeded);
  }, [current, target, weight]);

  const isImpossible = r > 100;
  
  const WEIGHT_PRESETS = [20, 30, 40, 50, 60];
  const TARGET_PRESETS = [50, 60, 65, 75, 80];

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Target Grade Calculator' }]}
      title="Final Grade Calculator"
      description="Calculate exactly what you need to score on your final exam to reach your target overall class grade. Perfect for students planning their study goals."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
          <div className="space-y-4 p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
            <div>
              <label className={labelCls}>Current Grade (%)</label>
              <div className="relative">
                 <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} min={0} max={100} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Target Overall Grade (%)</label>
              <div className="relative">
                 <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} min={0} max={100} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Final Exam Weight (%)</label>
              <div className="relative">
                 <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} min={0} max={100} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className={labelCls}>Target Grade Presets</label>
              <div className="flex flex-wrap gap-2">
                {TARGET_PRESETS.map(v => (
                  <button key={v} onClick={() => setTarget(v)}
                    className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${target === v ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE] bg-[#F8F9FA] border-[#DADCE0]'}`}>
                    {v}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Exam Weight Presets</label>
              <div className="flex flex-wrap gap-2">
                {WEIGHT_PRESETS.map(v => (
                  <button key={v} onClick={() => setWeight(v)}
                    className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${weight === v ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE] bg-[#F8F9FA] border-[#DADCE0]'}`}>
                    {v}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className={`border rounded-lg text-center p-8 relative overflow-hidden shadow-sm ${isImpossible ? 'bg-[#FCE8E6] border-[#FAD2CF]' : 'bg-white border-[#DADCE0]'}`}>
            <GraduationCap className={`absolute top-0 right-0 p-4 w-32 h-32 opacity-5 pointer-events-none ${isImpossible ? 'text-[#D93025]' : 'text-[#1A73E8]'}`} />
            
            <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 relative z-10 ${isImpossible ? 'text-[#D93025]' : 'text-[#70757A]'}`}>
               Required Score on Final
            </div>
            
            <div className={`text-6xl font-black tracking-tighter mb-4 font-mono relative z-10 ${isImpossible ? 'text-[#D93025]' : r <= 70 ? 'text-[#188038]' : 'text-[#1A73E8]'}`}>
              {r.toFixed(1)}<span className="text-3xl ml-1">%</span>
            </div>
            
            <div className={`inline-block px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded relative z-10 ${isImpossible ? 'bg-[#D93025] text-white' : r <= 60 ? 'bg-[#E6F4EA] text-[#188038]' : r <= 80 ? 'bg-[#E8F0FE] text-[#1A73E8]' : 'bg-[#FEF7E0] text-[#E37400]'}`}>
              {isImpossible ? 'Mathematically Impossible' : r <= 60 ? 'Very Easy Target' : r <= 80 ? 'Achievable Target' : 'Challenging Target'}
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Academic Summary</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold tracking-wider">Current Grade Weight</span>
                   <span className="font-black text-[#202124]">{(100 - weight)}%</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold tracking-wider">Current Grade Value</span>
                   <span className="font-black text-[#202124]">{current}%</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs bg-[#E8F0FE]">
                   <span className="text-[#1A73E8] font-bold tracking-wider">Desired Final Grade</span>
                   <span className="font-black text-[#1A73E8]">{target}%</span>
                </div>
             </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg flex items-start gap-3">
             <Info className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] mb-1">How it works</h5>
                <p className="text-[11px] text-[#202124] leading-relaxed">
                  The calculator mathematically balances your current grade against the remaining percentage (weight) of your final exam to find the exact threshold you need to pass.
                </p>
             </div>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter your current overall grade in the class (e.g., 85%).", "Enter your target grade for the entire class (e.g., 90%).", "Enter how much your final exam is worth as a percentage of your total grade (e.g., 30%).", "The calculator will instantly show you exactly what you need to score on the final exam."] }}
      formula={{ title: "Final Grade Formula", description: "Algebraic derivation of a weighted average.", raw: "Final Exam Score = (Target Grade - Current Grade × (1 - Exam Weight)) / Exam Weight\n\nNote: All percentage weights are converted to decimals (e.g., 40% = 0.40) during calculation." }}
      faqs={[
        { question: "What does 'mathematically impossible' mean?", answer: "If the required score is over 100%, it means that even a perfect 100% on the final exam is not enough to reach your target. This happens when: (a) the exam is worth too small a percentage, or (b) your current grade is too low. Example: current grade 40%, target 80%, exam worth 20% — you'd need 280% on the final, which is impossible." },
        { question: "What if my target is lower than my current grade?", answer: "The calculator will show a very low or 0% requirement. If the result is 0% or negative, it means you have already mathematically locked in your target grade regardless of final exam performance. You could score 0% on the final and still meet your target — though this is not recommended as it may affect other requirements." },
        { question: "How do I use this for TU/PU university exams in Nepal?", answer: "For TU/PU final exams: 'Current Grade' = your internal assessment marks as a percentage. 'Final Exam Weight' = the weight of the board exam (typically 60% for TU, 70% for some PU faculties). 'Target Grade' = minimum passing percentage (usually 40% in TU, 50% in some faculties). The calculator will show your minimum required final exam score." },
        { question: "What is the typical final exam weight in Nepalese colleges?", answer: "In Tribhuvan University (TU): board exams are typically 60-80% of the total grade, with 20-40% from internal assessment. In Pokhara University (PU): often 70% external, 30% internal. IOE engineering: usually 80% external, 20% internal. Private engineering colleges under PU may vary. Always check your faculty's official grading scheme." },
        { question: "How can I calculate the minimum needed to pass if I know my internals?", answer: "Set 'Target Grade' to 40% (minimum passing for most TU programs), 'Current Grade' to your internal marks percentage, and 'Final Exam Weight' to the board exam percentage (e.g., 60%). The calculator immediately tells you the minimum board marks needed to pass overall. If the result is below 40%, you've already secured your pass via internals." },
        { question: "Can I use this to calculate my CGPA target?", answer: "Indirectly yes. Convert your desired grade to a percentage first (e.g., B+ in TU = 55-64%), then set that as your target. For a more sophisticated CGPA-based prediction across multiple semesters with credit weights, use the Engineering GPA Calculator or CGPA Calculator instead, which is specifically designed for credit-hour-weighted academic planning." }
      ]}
      sidebar={{ title: "Student Tools", links: [{ label: "SEE GPA Calculator", href: "/calculator/see-gpa" }, { label: "Word Counter", href: "/calculator/word-counter" }], banner: { title: "Study Smart", description: "Knowing exactly what you need to score reduces test anxiety.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "SEE GPA Calculator", href: "/calculator/see-gpa" }]}
    />
  );
}
