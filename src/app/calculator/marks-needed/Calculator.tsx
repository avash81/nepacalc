'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { GraduationCap, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function MarksNeededCalculator() {
  const [current, setCurrent] = useState(60);
  const [target, setTarget] = useState(75);
  const [weight, setWeight] = useState(40);

  const r = useMemo(() => {
    const finalNeeded = (target - current * (1 - weight / 100)) / (weight / 100);
    return Math.max(0, finalNeeded);
  }, [current, target, weight]);

  const isImpossible = r > 100;
  
  const WEIGHT_PRESETS = [20, 30, 40, 50, 60, 70];
  const TARGET_PRESETS = [50, 60, 65, 75, 80, 85];

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      slug="marks-needed"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Math Tools', href: '/math-tools/' }, { label: 'Marks Needed Calculator' }]}
      title="Marks Needed Calculator (Final Exam Score Predictor)"
      description="Find out exactly what percentage or score you need on your final exam or board exam to achieve your desired overall course grade."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
          <div className="space-y-4 p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl">
            <div>
              <label className={labelCls}>Current Grade / Internal Score (%)</label>
              <div className="relative">
                 <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} min={0} max={100} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
              </div>
              <p className="text-[11px] text-[#5F6368] mt-1">Your average score so far across term papers, internal exams, and assignments.</p>
            </div>
            <div>
              <label className={labelCls}>Target Overall Grade (%)</label>
              <div className="relative">
                 <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} min={0} max={100} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
              </div>
              <p className="text-[11px] text-[#5F6368] mt-1">The final percentage you want on your transcript (e.g. 60% for 1st Division, 80% for Distinction).</p>
            </div>
            <div>
              <label className={labelCls}>Final Exam Weightage (%)</label>
              <div className="relative">
                 <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} min={0} max={100} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
              </div>
              <p className="text-[11px] text-[#5F6368] mt-1">In TU/KU semester systems, final board exams typically weigh 60% or 70%.</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className={labelCls}>Quick Target Presets</label>
              <div className="flex flex-wrap gap-2">
                {TARGET_PRESETS.map(v => (
                  <button key={v} onClick={() => setTarget(v)}
                    className={`flex-1 min-w-[50px] py-2 text-xs font-bold rounded border transition-all ${target === v ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE] bg-[#F8F9FA] border-[#DADCE0]'}`}>
                    {v}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Common Final Weight Presets</label>
              <div className="flex flex-wrap gap-2">
                {WEIGHT_PRESETS.map(v => (
                  <button key={v} onClick={() => setWeight(v)}
                    className={`flex-1 min-w-[50px] py-2 text-xs font-bold rounded border transition-all ${weight === v ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE] bg-[#F8F9FA] border-[#DADCE0]'}`}>
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
          <div className={`border rounded-xl text-center p-8 relative overflow-hidden shadow-sm ${isImpossible ? 'bg-[#FCE8E6] border-[#FAD2CF]' : 'bg-white border-[#DADCE0]'}`}>
            <GraduationCap className={`absolute top-0 right-0 p-4 w-32 h-32 opacity-5 pointer-events-none ${isImpossible ? 'text-[#D93025]' : 'text-[#1A73E8]'}`} />
            
            <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 relative z-10 ${isImpossible ? 'text-[#D93025]' : 'text-[#70757A]'}`}>
               Required Score on Final Exam
            </div>
            
            <div className={`text-6xl font-black tracking-tighter mb-4 font-mono relative z-10 ${isImpossible ? 'text-[#D93025]' : r <= 70 ? 'text-[#188038]' : 'text-[#1A73E8]'}`}>
              {r.toFixed(1)}<span className="text-3xl ml-1">%</span>
            </div>
            
            <div className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded relative z-10 ${isImpossible ? 'bg-[#D93025] text-white' : r <= 50 ? 'bg-[#E6F4EA] text-[#188038]' : r <= 75 ? 'bg-[#E8F0FE] text-[#1A73E8]' : 'bg-[#FEF7E0] text-[#E37400]'}`}>
              {isImpossible ? 'Mathematically Out of Reach' : r <= 50 ? 'Comfortable Goal' : r <= 75 ? 'Very Achievable' : 'Requires High Study Effort'}
            </div>

            {isImpossible && (
              <p className="text-xs text-[#D93025] font-medium mt-4 relative z-10 leading-relaxed">
                Even with 100% on the final exam, your maximum possible overall grade is {((current * (100 - weight) + 100 * weight) / 100).toFixed(1)}%. Consider revising your target.
              </p>
            )}
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden">
             <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-xs font-bold text-[#70757A] uppercase">Grade Breakdown Summary</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold">Internal / Current Weight</span>
                   <span className="font-black text-[#202124]">{(100 - weight)}%</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold">Current Score Obtained</span>
                   <span className="font-black text-[#202124]">{current}%</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold">Contribution to Final So Far</span>
                   <span className="font-black text-emerald-700">{(current * (100 - weight) / 100).toFixed(1)}%</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs bg-[#E8F0FE]">
                   <span className="text-[#1A73E8] font-bold">Target Overall Grade</span>
                   <span className="font-black text-[#1A73E8]">{target}%</span>
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          {/* Formula section */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-4">
                The Final Exam Formula
             </h3>
             <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg font-mono text-xs text-blue-700 font-bold mb-4">
                Final Score Needed = [ Target − (Current Score × (1 − Weight)) ] ÷ Weight
             </div>
             <p className="text-xs text-[#5F6368] leading-relaxed mb-3">
                <strong>Example:</strong> Suppose you have an internal score of 65% which counts for 40% of the course, and you want an overall grade of 75% at the end of the semester.
             </p>
             <ul className="text-xs text-[#5F6368] space-y-1 list-disc pl-5">
                <li>Points already earned = 65% × 0.40 = 26 points out of 40</li>
                <li>Points still needed to reach 75 = 75 − 26 = 49 points</li>
                <li>Final exam weight = 60% (0.60)</li>
                <li>Required final score = 49 ÷ 0.60 = <strong>81.67%</strong></li>
             </ul>
          </div>

          {/* Academic grading reference in Nepal */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-500 pl-3 mb-4">
                Grading Divisions in Nepal (TU & Universities)
             </h3>
             <div className="overflow-x-auto">
               <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
                 <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                   <tr>
                     <th className="px-4 py-2.5">Division / Grade</th>
                     <th className="px-4 py-2.5">Percentage Required</th>
                     <th className="px-4 py-2.5">GPA Equivalent</th>
                     <th className="px-4 py-2.5">Common Target</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                   <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-bold text-purple-700">Distinction</td><td className="px-4 py-2.5 font-bold">80% and above</td><td className="px-4 py-2.5 font-mono">3.60 – 4.00</td><td className="px-4 py-2.5 text-[#5F6368]">Scholarships, abroad applications</td></tr>
                   <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-bold text-blue-700">First Division</td><td className="px-4 py-2.5 font-bold">60% to 79.9%</td><td className="px-4 py-2.5 font-mono">2.80 – 3.59</td><td className="px-4 py-2.5 text-[#5F6368]">Graduate admissions, corporate jobs</td></tr>
                   <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-bold text-emerald-700">Second Division</td><td className="px-4 py-2.5 font-bold">50% to 59.9%</td><td className="px-4 py-2.5 font-mono">2.00 – 2.79</td><td className="px-4 py-2.5 text-[#5F6368]">Minimum graduation standard</td></tr>
                   <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-bold text-amber-700">Third / Pass Division</td><td className="px-4 py-2.5 font-bold">40% to 49.9%</td><td className="px-4 py-2.5 font-mono">1.60 – 1.99</td><td className="px-4 py-2.5 text-[#5F6368]">Course pass requirement</td></tr>
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      }
      relatedTools={[
        { label: "SEE GPA Calculator", href: "/calculator/see-gpa/" },
        { label: "Percentage Calculator", href: "/calculator/percentage/" },
        { label: "CGPA Converter", href: "/calculator/cgpa/" },
        { label: "Attendance Calculator", href: "/calculator/attendance/" }
      ]}
    />
  );
}
