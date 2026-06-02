'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { GraduationCap, CheckCircle2, XCircle, AlertCircle, BookOpen, Info, Zap, Target, History, Globe, ShieldCheck, UserCheck } from 'lucide-react';

const DEFAULT_STATE = {
  totalClasses: 100,
  attended: 72,
  required: 75
};

export default function NepalAttendanceCalculator() {
  const [state, setState] = useSyncState('nepal_att_institutional_v2', DEFAULT_STATE);
  const { totalClasses, attended, required } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
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

  return (
    <ModernCalcLayout
      slug="nepal-attendance"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Attendance' }]}
      title="TU/PU Attendance Tracker"
      description="The definitive institutional tracker for university attendance in Nepal. Calculate your exam eligibility percentage for TU, PU, and KU board examinations."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">Total Classes Held</label>
                <input 
                   type="number" 
                   value={totalClasses} 
                   onChange={(e) => update({ totalClasses: Number(e.target.value) })}
                   className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
                />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">Classes Attended</label>
                <input 
                   type="number" 
                   value={attended} 
                   onChange={(e) => update({ attended: Number(e.target.value) })}
                   className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
                />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">Required Threshold (%)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[60, 75, 80].map(opt => (
                    <button 
                      key={opt} 
                      onClick={() => update({ required: opt })} 
                      className={`h-12 text-[11px] font-black uppercase rounded-md transition-all border ${required === opt ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:border-[#1A73E8]'}`}
                    >
                      {opt}%
                    </button>
                  ))}
                </div>
             </div>
          </div>
          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3 items-center">
             <BookOpen className="w-5 h-5 text-[#1A73E8] shrink-0" />
             <p className="text-[9px] text-[#5F6368] uppercase font-bold leading-relaxed">
               Standard TU/PU minimum is 75% for exam eligibility. Falling below results in NQ (Not Qualified) status.
             </p>
          </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className={`p-10 rounded-lg text-center space-y-2 border relative overflow-hidden ${result.isEligible ? 'bg-[#E6F4EA] border-[#CEEAD6]' : 'bg-[#FCE8E6] border-[#FAD2CF]'}`}>
             <div className="absolute top-0 right-0 p-6 opacity-10">
               {result.isEligible ? <CheckCircle2 className="w-24 h-24 text-[#188038]" /> : <XCircle className="w-24 h-24 text-[#D93025]" />}
             </div>
             <div className={`text-[10px] font-bold uppercase tracking-wider relative z-10 ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                Current Attendance
             </div>
             <div className={`text-6xl font-black tracking-tight relative z-10 ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
               {result.percentage.toFixed(1)}%
             </div>
             <div className="flex justify-center mt-2 relative z-10">
               <span className={`px-4 py-1.5 bg-white rounded-full text-[10px] font-black uppercase border shadow-sm ${result.isEligible ? 'text-[#188038] border-[#CEEAD6]' : 'text-[#D93025] border-[#FAD2CF]'}`}>
                  {result.isEligible ? 'Exam Eligible' : 'NQ Warning'}
               </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 bg-white border border-[#DADCE0] rounded-md space-y-1 text-center shadow-sm">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Target Classes</div>
                <div className="text-xl font-black text-[#202124]">{result.requiredClasses}</div>
             </div>
             <div className="p-5 bg-[#E8F0FE] border border-[#1A73E8] rounded-md space-y-1 text-center shadow-sm">
                <div className="text-[9px] font-bold text-[#1A73E8] uppercase tracking-wider">Current Count</div>
                <div className="text-xl font-black text-[#1A73E8]">{attended}</div>
             </div>
          </div>

          <div className="p-6 bg-white border border-[#DADCE0] rounded-lg shadow-sm flex items-center justify-between">
             <div className="space-y-1">
                <h4 className={`text-[10px] font-black uppercase tracking-wider ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                   {result.isEligible ? 'Safety Buffer' : 'Classes Needed'}
                </h4>
                <p className="text-2xl font-black text-[#202124]">
                   {result.isEligible ? result.canMissMore : result.classesToAttend} Classes
                </p>
             </div>
             <div className={`px-3 py-1 rounded-md text-[9px] font-black uppercase border ${result.isEligible ? 'bg-[#E6F4EA] text-[#188038] border-[#CEEAD6]' : 'bg-[#FCE8E6] text-[#D93025] border-[#FAD2CF]'}`}>
                {result.isEligible ? 'Strategic Margin' : 'Recovery Target'}
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
              <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
              <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">TU/PU Academic Mandates</h3>
            </div>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>In the structured academic environments of <strong>Nepal</strong>, meeting the mandatory attendance threshold is a strict prerequisite. Our institutional engine is tailored for the rules of <strong>Tribhuvan University (TU)</strong>, <strong>Pokhara University (PU)</strong>, and <strong>Kathmandu University (KU)</strong>, where physical presence is tied to exam eligibility.</p>
              
              <div className="p-4 bg-[#FCE8E6] border border-[#FAD2CF] rounded-md mt-4">
                 <h4 className="text-[11px] font-black text-[#D93025] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> The NQ (Not Qualified) Penalty
                 </h4>
                 <p className="text-[11px] font-bold text-[#D93025] leading-relaxed">
                    Falling below the 75% threshold in Nepal results in an NQ notice. This bars you from board examinations, effectively causing you to repeat the semester or year.
                 </p>
              </div>
              
              <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md mt-4">
                 <h4 className="text-[11px] font-black text-[#1A73E8] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Theory vs. Practical Separation
                 </h4>
                 <p className="text-[11px] font-bold text-[#5F6368] leading-relaxed">
                    Most technical faculties in Nepal track theory and practical attendance independently. You must secure the minimum threshold in BOTH to avoid disqualification.
                 </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
               <div className="w-1.5 h-4 bg-[#188038] rounded-full" />
               <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Integrity Guardrails</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-md border border-[#DADCE0] bg-[#F8F9FA]">
                   <h4 className="text-[10px] font-black uppercase text-[#1A73E8] mb-1">Condonation Rules</h4>
                   <p className="text-[10px] font-bold text-[#5F6368] leading-relaxed">
                      Deans may condone a maximum 5% shortage for extreme emergencies (medical), but this is never guaranteed and requires formal proof.
                   </p>
                </div>
                <div className="p-4 rounded-md border border-[#DADCE0] bg-[#F8F9FA]">
                   <h4 className="text-[10px] font-black uppercase text-[#1A73E8] mb-1">Recovery Projection</h4>
                   <p className="text-[10px] font-bold text-[#5F6368] leading-relaxed">
                      If your current percentage is low, our engine calculates the exact number of consecutive future classes needed to recover the ratio.
                   </p>
                </div>
             </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Total Classes: Enter the total number of lectures/practicals held so far.",
          "Attended: Enter the number of classes you were physically present for.",
          "Threshold: Select your university requirement (Standard: 75%).",
          "Eligibility: Check the status card to see if you are currently NQ-safe.",
          "Strategy: Use the recovery or buffer count to plan your upcoming schedule."
        ]
      }}
      formula={{
        title: "Eligibility Algebra",
        description: "Predictive formula used to calculate recovery requirements.",
        raw: "Classes Needed = (Threshold * Total - Attended) / (1 - Threshold)",
        variables: [
          "Threshold: The percentage required (e.g. 0.75 for 75%)",
          "Total: Total classes held to date",
          "Attended: Classes attended to date"
        ]
      }}
      faqs={[
        { question: "What happens if I fall below 75% attendance in Nepal?", answer: "You will receive an NQ (Not Qualified) notice, barring you from sitting the board exams and potentially forcing you to repeat the semester." },
        { question: "What is the condonation rule in TU and PU?", answer: "A maximum 5% shortage can be pardoned by the Dean for medical emergencies, reducing the requirement to 70%." },
        { question: "Can I calculate how many classes I can safely skip?", answer: "Yes, if you are above the threshold, the calculator computes your 'buffer'—the number of classes you can miss without hitting NQ status." },
        { question: "Does the calculator work for both theory and practicals?", answer: "Yes, but you should calculate them separately as most universities require independent eligibility for both." },
        { question: "What is the 75% rule based on?", answer: "It is based on University Grants Commission (UGC) Nepal directives that all affiliated universities are required to enforce." },
        { question: "How many classes do I need to attend to recover a shortage?", answer: "The calculator provides an exact 'Classes Needed' count which represents the consecutive future classes you must attend." }
      ]}
      sidebar={{
        title: "Academic Hub",
        subtitle: "Nepal Education",
        links: [
          { label: "SEE GPA Calc", href: "/calculator/see-gpa/", icon: GraduationCap },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/", icon: UserCheck },
          { label: "Percentage Calc", href: "/calculator/percentage/", icon: Globe },
          { label: "TU Official", href: "https://tu.edu.np", icon: History },
        ],
      }}
      relatedTools={[
        { label: "SEE GPA", href: "/calculator/see-gpa/" },
        { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
        { label: "Percentage", href: "/calculator/percentage/" }
      ]}
    />
  );
}

