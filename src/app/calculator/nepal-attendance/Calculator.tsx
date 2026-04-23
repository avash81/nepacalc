'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { GraduationCap, CheckCircle2, XCircle, AlertCircle, BookOpen, Info } from 'lucide-react';

export default function NepalAttendanceCalculator() {
  const [state, setState] = useSyncState('nepal_att_v3', {
    totalClasses: 100,
    attended: 72,
    required: 75
  });

  const { totalClasses, attended, required } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const results = useMemo(() => {
    const percentage = totalClasses > 0 ? (attended / totalClasses) * 100 : 0;
    const requiredClasses = Math.ceil((required / 100) * totalClasses);
    const shortage = Math.max(0, requiredClasses - attended);
    const isEligible = percentage >= required;

    const maxTotalAllowed = Math.floor(attended / (required / 100));
    const canMissMore = Math.max(0, maxTotalAllowed - totalClasses);

    let classesToAttend = 0;
    if (!isEligible) {
      const numerator = (required * totalClasses / 100) - attended;
      const denominator = 1 - (required / 100);
      classesToAttend = Math.ceil(numerator / denominator);
    }

    return { percentage, isEligible, shortage, requiredClasses, canMissMore, classesToAttend };
  }, [totalClasses, attended, required]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'University Attendance' }]}
      title="TU/PU Attendance Eligibility Tracker"
      description="Calculate your university attendance percentage and eligibility for end-semester exams. Based on the mandatory 75% minimum for Tribhuvan University (TU) and Pokhara University (PU)."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
          <div className="space-y-4 p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
            <div>
              <label className={labelCls}>Total Classes Held</label>
              <input type="number" value={totalClasses} onChange={e => update({ totalClasses: Number(e.target.value) })} min={1} className={inputCls} />
              <p className="text-[10px] text-[#70757A] mt-1.5 font-medium px-1">Total lectures/practicals conducted in the semester so far.</p>
            </div>
            
            <div>
              <label className={labelCls}>Classes You Attended</label>
              <input type="number" value={attended} onChange={e => update({ attended: Number(e.target.value) })} min={0} max={totalClasses} className={`${inputCls} ${attended > totalClasses ? 'border-[#D93025] focus:border-[#D93025] focus:ring-[#D93025]' : ''}`} />
              {attended > totalClasses && <p className="text-[10px] text-[#D93025] mt-1.5 font-bold px-1">Cannot exceed total classes held.</p>}
            </div>
          </div>

          <div className="space-y-3">
            <label className={labelCls}>Required Minimum Percentage</label>
            <div className="flex p-1 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              {[60, 75, 80].map(r => (
                <button key={r} onClick={() => update({ required: r })}
                  className={`flex-1 py-3 text-xs font-bold rounded transition-all ${required === r ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
                  {r}%
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#70757A] font-medium px-1">Note: TU/PU standard is 75%. Some private colleges mandate 80%.</p>
          </div>

          <div className="p-5 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg flex items-start gap-3">
             <BookOpen className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] mb-1">University Mandate</h5>
                <p className="text-[11px] text-[#202124] leading-relaxed font-medium">
                  "Under TU/PU Academic Regulations, students must maintain a minimum attendance in both theory and practical classes independently to be eligible for board examinations."
                </p>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className={`border rounded-lg text-center p-8 relative overflow-hidden shadow-sm ${results.isEligible ? 'bg-white border-[#DADCE0]' : 'bg-[#FCE8E6] border-[#FAD2CF]'}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 relative z-10 ${results.isEligible ? 'text-[#70757A]' : 'text-[#D93025]'}`}>Current Attendance</div>
            <div className={`text-6xl font-black tracking-tighter mb-4 font-mono relative z-10 ${results.isEligible ? 'text-[#1A73E8]' : 'text-[#D93025]'}`}>
              {results.percentage.toFixed(1)}<span className="text-3xl ml-1">%</span>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className={`px-5 py-4 flex items-center gap-3 border-b ${results.isEligible ? 'bg-[#E6F4EA] border-[#CEEAD6] text-[#188038]' : 'bg-[#FCE8E6] border-[#FAD2CF] text-[#D93025]'}`}>
                {results.isEligible ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <XCircle className="w-6 h-6 shrink-0" />}
                <div>
                   <div className="text-[9px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Eligibility Status</div>
                   <div className="text-lg font-black uppercase tracking-wider">{results.isEligible ? 'Eligible for Exams' : 'Not Eligible (Shortage)'}</div>
                </div>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold tracking-wider">Target Threshold</span>
                   <span className="font-black text-[#202124]">{results.requiredClasses} classes ({required}%)</span>
                </div>
                {results.isEligible ? (
                  <div className="p-4 flex justify-between items-center text-xs bg-[#F8F9FA]">
                     <span className="text-[#188038] font-bold tracking-wider">Buffer (Can Miss)</span>
                     <span className="font-black text-[#188038]">{results.canMissMore} more classes</span>
                  </div>
                ) : (
                  <div className="p-4 flex justify-between items-center text-xs bg-[#F8F9FA]">
                     <span className="text-[#D93025] font-bold tracking-wider">Classes Needed</span>
                     <span className="font-black text-[#D93025]">{results.classesToAttend} consecutive classes</span>
                  </div>
                )}
             </div>
          </div>

          <div className="p-4 bg-[#FEF7E0] border border-[#FDE293] rounded-lg flex items-start gap-3">
             <AlertCircle className="w-5 h-5 text-[#E37400] shrink-0 mt-0.5" />
             <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#E37400] mb-1">Condonation (Grace) Warning</h5>
                <p className="text-[11px] text-[#202124] leading-relaxed">
                   Condonation may be granted for a maximum 5% shortage by the Faculty Dean/Campus Chief for extreme cases like illness, but this requires a formal application with medical proof and is never guaranteed.
                </p>
             </div>
          </div>
        </div>
      }
      howToUse={{ steps: ["Find out the total number of classes (lectures or practicals) conducted by your professor so far.", "Enter the number of those classes you were physically present for.", "Select your university's required threshold (usually 75%).", "If you are short, the calculator will tell you exactly how many consecutive classes you must attend to cross the threshold."] }}
      formula={{ title: "Eligibility Math", description: "Algebraic projection.", raw: "Current % = (Attended / Total) × 100\n\nIf short, classes needed (x) is found by solving:\n(Attended + x) / (Total + x) = Threshold%\n\nx = (Threshold × Total - Attended) / (1 - Threshold)" }}
      faqs={[
        { question: "What happens if I fall below 75%?", answer: "Colleges are mandated to send a list of eligible students to the university board. If you are below 75% without an approved condonation, you will receive an NQ (Not Qualified) and be barred from sitting the board exams." },
        { question: "Do internal assessments count?", answer: "No. Attendance is tracked strictly for physical presence in lectures and practical labs. However, low attendance often correlates with low internal assessment marks." }
      ]}
      sidebar={{ title: "Academic Tools", links: [{ label: "SEE GPA Calculator", href: "/calculator/see-gpa" }, { label: "Marks Needed", href: "/calculator/marks-needed" }], banner: { title: "Plan Ahead", description: "Don't let attendance ruin your semester. Track it early.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "SEE GPA Calculator", href: "/calculator/see-gpa" }]}
    />
  );
}
