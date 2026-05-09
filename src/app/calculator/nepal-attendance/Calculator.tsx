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
  const [state, setState] = useSyncState('nepal_att_institutional_v1', DEFAULT_STATE);
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

  const inputBlock = (
    <div className="space-y-8">
      <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
         <div className="relative z-10 space-y-6">
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Total Classes Held</label>
               <input 
                  type="number" 
                  value={totalClasses} 
                  onChange={(e) => update({ totalClasses: Number(e.target.value) })}
                  className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
               />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Classes Attended</label>
               <input 
                  type="number" 
                  value={attended} 
                  onChange={(e) => update({ attended: Number(e.target.value) })}
                  className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
               />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Required Threshold (%)</label>
               <div className="flex p-1 bg-[#f8f9fa] rounded-xl border border-[#dadce0]">
                 {[60, 75, 80].map(opt => (
                   <button key={opt} onClick={() => update({ required: opt })} className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${required === opt ? 'bg-[#1a73e8] text-[#202124] shadow-sm' : 'text-slate-400'}`}>{opt}%</button>
                 ))}
               </div>
            </div>
         </div>
      </div>

      <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><BookOpen className="w-4 h-4 text-blue-600" /></div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">University Mandate</h3>
         </div>
         <p className="text-[10px] text-slate-500 uppercase font-bold leading-relaxed tracking-wider">
           Standard TU/PU minimum is 75% for exam eligibility. Falling below results in NQ (Not Qualified) status.
         </p>
      </div>
    </div>
  );

  return (
    <ModernCalcLayout
      slug="nepal-attendance"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'Attendance' }]}
      title="TU/PU Attendance Eligibility Tracker"
      description="The definitive institutional tracker for university attendance in Nepal. Calculate your exam eligibility percentage for TU, PU, and KU board examinations."
      icon={GraduationCap}
      inputs={inputBlock}
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><CheckCircle2 className={`w-24 h-24 ${result.isEligible ? 'text-emerald-600' : 'text-rose-600'}`} /></div>
             <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${result.isEligible ? 'text-emerald-600' : 'text-rose-600'}`}>
                Current Attendance
             </div>
             <div className="text-6xl font-black tracking-tighter text-slate-900 font-mono uppercase">{result.percentage.toFixed(1)}%</div>
             <div className={`px-5 py-2 rounded-full inline-block text-[10px] font-black uppercase tracking-tight ${result.isEligible ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {result.isEligible ? 'Exam Eligible' : 'NQ Warning'}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-center">
                <div className="text-[9px] font-black text-slate-400 uppercase">Target Classes</div>
                <div className="text-xl font-black text-slate-900">{result.requiredClasses}</div>
             </div>
             <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg space-y-1 text-center">
                <div className="text-[9px] font-black text-blue-600 uppercase">Current Count</div>
                <div className="text-xl font-black text-blue-600">{attended}</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Target className="w-24 h-24 text-emerald-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                      {result.isEligible ? 'Safety Buffer' : 'Classes Needed'}
                   </h4>
                   <p className="text-2xl font-black">
                      {result.isEligible ? result.canMissMore : result.classesToAttend} Classes
                   </p>
                </div>
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                   {result.isEligible ? 'Strategic Margin' : 'Recovery Target'}
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <section className="bg-white border border-slate-200 rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <History className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Attendance Encyclopedia: TU/PU Academic Mandates</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>In the structured academic environments of <strong>Nepal</strong>, meeting the mandatory attendance threshold is a strict prerequisite. Our institutional engine is tailored for the rules of <strong>Tribhuvan University (TU)</strong>, <strong>Pokhara University (PU)</strong>, and <strong>Kathmandu University (KU)</strong>, where physical presence is tied to exam eligibility.</p>
              
              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. The NQ (Not Qualified) Penalty</h3>
              <p>Falling below the 75% threshold in Nepal results in an NQ notice. This bars you from board examinations, effectively causing you to repeat the semester or year. Our calculator uses predictive modeling to ensure you never face this penalty.</p>
              
              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. Theory vs. Practical Separation</h3>
              <p>Most technical faculties in Nepal track theory and practical attendance independently. You must secure the minimum threshold in BOTH to avoid disqualification in specific subjects. This calculator helps you manage that risk strategically.</p>
            </div>
          </section>

          <section className="bg-white border border-[#dadce0] text-[#202124] rounded-lg p-12 shadow-sm relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10"><AlertCircle className="w-64 h-64 text-blue-500" /></div>
             <h2 className="text-3xl font-black mb-10 tracking-tight text-[#1a0dab] uppercase tracking-widest">Academic Integrity Guardrails</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><History className="w-5 h-5" /> Condonation Rules</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Deans may condone a maximum 5% shortage for extreme emergencies (medical), but this is never guaranteed and requires formal proof.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Target className="w-5 h-5" /> Recovery Projection</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      If your current percentage is low, our engine calculates the exact number of consecutive future classes needed to recover the ratio.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Globe className="w-5 h-5" /> UGC Standards</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Attendance standards are regulated by the University Grants Commission (UGC) Nepal to maintain academic quality and discipline.
                   </p>
                </div>
             </div>
          </section>
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
        raw: "$$x = \\frac{Threshold \\cdot Total - Attended}{1 - Threshold}$$",
        latex: "x = \\frac{Threshold \\cdot Total - Attended}{1 - Threshold}"
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
        subtitle: "University Tools",
        links: [
          { label: "SEE GPA Calc", href: "/calculator/see-gpa/", icon: GraduationCap },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/", icon: UserCheck },
          { label: "Percentage Calc", href: "/calculator/percentage-calculator/", icon: Globe },
          { label: "TU Official", href: "https://tu.edu.np", icon: History },
        ],
      }}
      relatedTools={[
        { label: "SEE GPA Calculator", href: "/calculator/see-gpa/" },
        { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
        { label: "Percentage Calculator", href: "/calculator/percentage-calculator/" }
      ]}
    />
  );
}
