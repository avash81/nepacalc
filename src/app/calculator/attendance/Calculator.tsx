'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { GraduationCap, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

export default function AttendanceCalculator() {
  const [state, setState] = useSyncState('attendance_v1', { attended: 45, total: 60, target: 75 });
  const { attended, total, target } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const currentPercent = total > 0 ? (attended / total) * 100 : 0;
    const isEligible = currentPercent >= target;
    let diff = 0;
    if (isEligible) {
      diff = Math.floor((attended / (target / 100)) - total);
    } else {
      diff = Math.ceil(((target / 100 * total) - attended) / (1 - target / 100));
    }
    return { currentPercent, isEligible, diff };
  }, [attended, total, target]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Attendance Calculator' }]}
      title="Attendance Calculator"
      description="Track exam eligibility for TU, PU, and NEB. Calculate exactly how many classes you can miss ,  or must attend ,  to meet your attendance target."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Classes Attended</label>
              <input type="number" value={attended} min={0} max={total}
                onChange={e => update({ attended: Number(e.target.value) })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Total Classes Held</label>
              <input type="number" value={total} min={1}
                onChange={e => update({ total: Number(e.target.value) })} className={inputCls} />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Target Attendance %</label>
            <div className="grid grid-cols-3 gap-3">
              {[75, 80, 85].map(t => (
                <button key={t} onClick={() => update({ target: t })}
                  className={`py-3 border-2 rounded-xl font-black text-sm transition-all ${target === t ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368]'}`}>
                  {t}%
                </button>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-lg border flex gap-3 items-start ${result.isEligible ? 'bg-[#E6F4EA] border-[#CEEAD6]' : 'bg-[#FCE8E6] border-[#FAD2CF]'}`}>
            {result.isEligible
              ? <CheckCircle2 className="w-5 h-5 text-[#188038] shrink-0" />
              : <AlertCircle className="w-5 h-5 text-[#D93025] shrink-0" />}
            <div>
              <div className={`text-xs font-black uppercase mb-1 ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                {result.isEligible ? 'Eligibility Secured' : 'Eligibility Warning'}
              </div>
              <p className={`text-[10px] leading-tight font-medium ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                {result.isEligible
                  ? `Safe Zone: You can miss ${result.diff} more classes and still stay at ${target}%.`
                  : `Alert: You must attend the next ${result.diff} classes without fail to reach ${target}%.`}
              </p>
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Check Eligibility
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className={`p-6 rounded-lg border text-center space-y-1 ${result.isEligible ? 'bg-[#E6F4EA] border-[#CEEAD6]' : 'bg-[#FCE8E6] border-[#FAD2CF]'}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>Current Attendance</div>
            <div className={`text-5xl font-black ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>{result.currentPercent.toFixed(1)}%</div>
            <div className={`text-[9px] font-bold uppercase ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
              {result.isEligible ? `✓ Above ${target}% target` : `✗ Below ${target}% target`}
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Student Ledger</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Classes Attended</span>
                <span className="font-black">{attended}</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Total Held</span>
                <span className="font-black">{total}</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Target Required</span>
                <span className="font-black">{target}%</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Deficit / Surplus</span>
                <span className={`font-black ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                  {result.isEligible ? `+${(result.currentPercent - target).toFixed(1)}%` : `-${(target - result.currentPercent).toFixed(1)}%`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">TU and PU require 75% attendance for exam eligibility. Some departments enforce 80% or 85% ,  check with your college.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Institutional Attendance Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The standard engine for academic eligibility verification in Nepal. Calibrated for <strong>TU</strong>, <strong>PU</strong>, <strong>KU</strong>, and <strong>NEB</strong> standards. 
                This tool provides mathematical certainty regarding trajectory management, helping students bridge attendance deficits and maintain statutory compliance for final board examinations.
             </p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Input the total number of classes you have actively attended so far.",
          "Input the total number of classes that have been held in the semester.",
          "Select your university's statutory attendance target (75%, 80%, or 85%).",
          "Review the primary eligibility output: Safe Zone (Surplus) or Alert (Deficit).",
          "Consult the student ledger matrix for the precise number of classes to attend to bridge any deficit."
        ]
      }}
      formula={{
        title: "The Formula Toolkit",
        description: "Algorithmic derivation for tracking attendance deficits and surpluses.",
        raw: "$$\\text{Current} \\% = \\frac{\\text{Attended}}{\\text{Total}} \\times 100 \\quad \\| \\quad \\text{To Attend} = \\frac{(\\text{Target} \\% \\times \\text{Total}) - \\text{Attended}}{1 - \\text{Target} \\%}$$"
      }}
      faqs={[
        { question: "What is the minimum attendance for TU exams?", answer: "Tribhuvan University (TU) requires a minimum of 75% attendance to sit for final exams. Some departments (Institute of Engineering, MBBS programs) enforce 80–85% attendance. Always confirm the specific requirement with your department head at the start of each semester." },
        { question: "Can I get attendance waived at TU or PU?", answer: "TU and PU allow applications for attendance relaxation in specific, documented cases: serious illness (requiring hospitalization records), official national/university representation, or natural disasters. Applications must be submitted to the department head with supporting documentation before the exam registration deadline." },
        { question: "How many classes can I miss with 60 attended out of 80 total?", answer: "With 60/80 classes attended, your current attendance is 75%. If your target is 75%, you cannot miss any more classes. If the target is 80%, you need to calculate: to reach 80% with 80 total, you need 64 classes. Since you attended 60, you need to attend 4 more consecutive classes (assuming no more new classes are added)." },
        { question: "Does the 75% rule apply to each subject individually?", answer: "Yes, in most Nepali university programs the 75% attendance requirement applies per subject/course, not just overall. You can have 90% overall attendance but still be barred from an exam if one specific subject falls below 75%. Always track attendance per course, not just as an aggregate." },
        { question: "What is the formula to calculate how many classes I can skip?", answer: "If you have met the target, the number of classes you can still miss is: Floor((Attended / Target%) − Total). For example: Attended=60, Total=70, Target=75%. Can miss = Floor((60/0.75) − 70) = Floor(80 − 70) = 10 more classes. This is exactly what this calculator computes for you." },
        { question: "What is the minimum attendance at Kathmandu University (KU)?", answer: "Kathmandu University (KU) generally requires 80% attendance for most undergraduate and graduate programs. The School of Engineering has been known to enforce this strictly, with no relaxation offered unless exceptional circumstances are documented. KU's policy is more stringent than TU in this regard." }
      ]}
      sidebar={{ title: "Academic Tools", links: [{ label: "CGPA Calculator", href: "/calculator/cgpa/" }, { label: "GPA Calculator", href: "/calculator/gpa/" }, { label: "SEE GPA", href: "/calculator/see-gpa/" }, { label: "Age Calculator", href: "/calculator/age-calculator/" }], banner: { title: "Stay On Track", description: "Consistent attendance directly improves understanding and exam performance.", image: "/images/student-banner.jpg" } }}
      relatedTools={[{ label: "CGPA Calculator", href: "/calculator/cgpa/" }, { label: "GPA Calculator", href: "/calculator/gpa/" }, { label: "SEE GPA", href: "/calculator/see-gpa/" }]}
    />
  );
}
