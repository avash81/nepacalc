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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Mastering the 75% Academic Mandate</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In the highly structured academic environments of Nepalese institutions, meeting the mandatory attendance threshold is not optional. Our <strong className="text-[#202124]">tu attendance calculator nepal</strong> is specifically tailored for the stringent rules of Tribhuvan University, Pokhara University (PU), and Kathmandu University (KU), where physical presence is deeply tied to exam eligibility.
              </p>
              <p>
                As a precise <strong className="text-[#202124]">pu attendance percentage calculator</strong>, this engine moves beyond simple fractions. By calculating exactly how many consecutive future classes you need to attend, it acts as a strategic <strong className="text-[#202124]">university attendance tracker nepal</strong>, allowing you to mathematically recover from absences before the semester ends.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The NQ (Not Qualified) Penalty</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Absolute Thresholds:</strong> Most faculties enforce a strict <strong className="text-[#202124]">minimum 75 attendance nq</strong> rule. Falling to 74.9% mathematically disqualifies you from receiving your admit card for final board examinations, forcing a year back or a semester repeat.</li>
              <li><strong className="text-[#188038]">Predictive Buffers:</strong> If you are currently above the threshold, the algorithm reverses the equation to calculate your "buffer"—the exact number of future classes you can safely skip without breaking the 75% baseline.</li>
              <li><strong className="text-[#D93025]">Condonation Limits:</strong> While Deans have the authority to condone up to a 5% shortage (reducing the requirement to 70%), this is strictly reserved for documented emergencies (e.g., hospitalization) and cannot be relied upon as a standard academic buffer.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Find out the total number of classes (lectures or practicals) conducted by your professor so far.", "Enter the number of those classes you were physically present for.", "Select your university's required threshold (usually 75%).", "If you are short, the calculator will tell you exactly how many consecutive classes you must attend to cross the threshold."] }}
      formula={{ title: "Eligibility Math", description: "Algebraic projection.", raw: "Current % = (Attended / Total) × 100\n\nIf short, classes needed (x) is found by solving:\n(Attended + x) / (Total + x) = Threshold%\n\nx = (Threshold × Total - Attended) / (1 - Threshold)" }}
      faqs={[
        { question: "What happens if I fall below 75% attendance in Nepal?", answer: "Colleges are mandated to send a list of eligible students to the university board. If you are below 75% without an approved condonation, you will receive an NQ (Not Qualified) notice and be barred from sitting the board exams. You will have to repeat the semester or year, losing both time and tuition fees." },
        { question: "Do internal assessments count towards attendance?", answer: "No. Attendance is tracked strictly for physical presence in lectures and practical labs. However, low attendance often correlates with low internal assessment marks since participation in practicals, quizzes, and term tests requires being present. Some colleges also deduct internal marks for excessive absences beyond the NQ threshold." },
        { question: "What is the condonation rule in TU and PU?", answer: "Both TU and PU allow a maximum 5% attendance condonation in genuine emergencies (hospitalization, family bereavement, official government duty). This reduces the effective requirement from 75% to 70%. It requires a formal written application to the Faculty Dean or Campus Chief with supporting documentation (medical certificate, etc.) and is never automatically granted." },
        { question: "Can I calculate how many classes I can safely skip?", answer: "Yes — when your current attendance is above 75%, the calculator automatically computes your 'buffer': the exact number of future classes you can miss without falling below the threshold. This takes into account both your current attendance and the remaining classes in the semester, giving you a real-time safety margin." },
        { question: "What is the 75% attendance rule based on?", answer: "The 75% minimum attendance rule in Nepal is based on the University Grants Commission (UGC) Nepal directives, which all affiliated universities (TU, PU, KU, PU) are required to enforce. The rule ensures minimum academic engagement. In practice, most colleges track theory and practical lab attendance separately, and you must meet 75% in both independently." },
        { question: "How many classes can I miss in a 100-class semester?", answer: "If 100 classes are held and the requirement is 75%, you need at least 75 classes. You can miss a maximum of 25 classes. However, this is a hard ceiling — missing class 26 triggers NQ status. The buffer calculator here gives you the real-time count as the semester progresses, adjusting for how many total classes have been held so far." }
      ]}
      sidebar={{ title: "Academic Tools", links: [{ label: "SEE GPA Calculator", href: "/calculator/see-gpa" }, { label: "Marks Needed", href: "/calculator/marks-needed" }], banner: { title: "Plan Ahead", description: "Don't let attendance ruin your semester. Track it early.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "SEE GPA Calculator", href: "/calculator/see-gpa" }]}
    />
  );
}
