'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { GraduationCap, Plus, Trash2, Info, Target, Calculator, PieChart, BookOpen, Star } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const DEFAULT_STATE = {
  semesters: [
    { gpa: 3.5, credits: 18 },
    { gpa: 3.7, credits: 18 },
  ]
};

export default function CGPACalculator() {
  const [state, setState] = useSyncState('cgpa_v4', DEFAULT_STATE);
  const { semesters } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    let totalPoints = 0, totalCredits = 0;
    semesters.forEach(s => { 
      totalPoints += (s.gpa || 0) * (s.credits || 0); 
      totalCredits += (s.credits || 0); 
    });
    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    return { cgpa, totalCredits };
  }, [semesters]);

  const addRow = () => update({ semesters: [...semesters, { gpa: 0, credits: 18 }] });
  const removeRow = (i: number) => update({ semesters: semesters.filter((_, idx) => idx !== i) });
  const updateRow = (i: number, field: 'gpa' | 'credits', val: number) => {
    const next = [...semesters];
    next[i] = { ...next[i], [field]: val };
    update({ semesters: next });
  };

  const getLetter = (gpa: number) => {
    if (gpa >= 3.6) return 'A (Distinction)';
    if (gpa >= 3.2) return 'A- (Excellent)';
    if (gpa >= 2.8) return 'B+ (Very Good)';
    if (gpa >= 2.4) return 'B (Good)';
    if (gpa >= 2.0) return 'C+ (Satisfactory)';
    return 'Pass/Fail';
  };

  const inputCls = "w-full h-11 px-3 border border-[#DADCE0] rounded bg-white text-sm font-bold focus:border-[#1A73E8] outline-none";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      slug="cgpa"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'CGPA Calculator' }]}
      title="CGPA Calculator"
      description="Calculate your Cumulative GPA across all semesters with credit-weighted averaging. Supports TU, KU, PU, and international university standards."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
          <div className="space-y-4">
             <div className="grid grid-cols-[1fr_1fr_40px] gap-3 px-2">
                <label className={labelCls}>GPA</label>
                <label className={labelCls}>Credits</label>
                <span />
             </div>
             <div className="space-y-3">
                {semesters.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_40px] gap-3 items-center group">
                    <input 
                      type="number" 
                      step="0.01" 
                      value={s.gpa} 
                      onChange={e => updateRow(i, 'gpa', Number(e.target.value))} 
                      className={inputCls} 
                      placeholder="0.00"
                    />
                    <input 
                      type="number" 
                      value={s.credits} 
                      onChange={e => updateRow(i, 'credits', Number(e.target.value))} 
                      className={inputCls} 
                    />
                    <button 
                      onClick={() => removeRow(i)}
                      className="w-10 h-10 flex items-center justify-center text-[#D93025] hover:bg-[#FCE8E6] rounded-full transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
             </div>
             <button 
               onClick={addRow}
               className="w-full py-3 border-2 border-dashed border-[#DADCE0] rounded-lg text-[#1A73E8] font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-all"
             >
               <Plus className="w-4 h-4" /> Add Another Semester
             </button>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Generate Report
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Cumulative GPA (CGPA)</div>
            <div className="text-5xl font-black text-[#1A73E8]">{r.cgpa.toFixed(2)}</div>
            <div className="text-[11px] font-black text-[#202124] uppercase tracking-widest bg-white/50 px-4 py-1 rounded-full inline-block mt-2 border border-[#1A73E8]/20">{getLetter(r.cgpa)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Credits</div>
               <div className="text-sm font-black text-[#202124]">{r.totalCredits}</div>
             </div>
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Avg. Percentage*</div>
               <div className="text-sm font-black text-[#188038]">{(r.cgpa * 9.5).toFixed(1)}%</div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Scale Breakdown</span>
               <Star className="w-3 h-3 text-[#1A73E8]" />
             </div>
             <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                   <span className="text-[#5F6368]">GPA Scale</span>
                   <span className="font-bold">4.0 / 5.0 Mode</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="text-[#5F6368]">Honors Status</span>
                   <span className={`font-black uppercase ${r.cgpa >= 3.6 ? 'text-[#188038]' : 'text-[#5F6368]'}`}>{r.cgpa >= 3.6 ? 'Distinction' : 'Regular'}</span>
                </div>
                <div className="h-px bg-[#DADCE0]" />
                <p className="text-[9px] text-[#70757A] leading-tight">Percentage conversion is an estimate. Universities like Tribhuvan (TU) or Kathmandu (KU) may use different mapping tables.</p>
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
            <Info className="w-4 h-4 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">Total Points = <strong>{(r.cgpa * r.totalCredits).toFixed(1)}</strong> based on current inputs.</p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your GPA for each semester in the first column.",
          "Enter the total credit hours for that semester in the second column.",
          "Click 'Add Another Semester' to include more data points.",
          "Remove any empty or incorrect rows using the trash icon.",
          "Review your final Cumulative GPA and the letter grade classification."
        ]
      }}
      formula={{
        title: "Credit-Weighted Averaging",
        description: "CGPA is not a simple average. It is weighted by the credit hours of each semester.",
        raw: "CGPA = Σ (Semester GPA × Semester Credits) / Σ (Semester Credits)"
      }}
      faqs={[
        {
          question: "Why does my CGPA differ from a simple average of my semester GPAs?",
          answer: "Simple average treats every semester equally regardless of credit load. CGPA is credit-weighted — a semester with 24 credits counts more than one with 12 credits. This is the academic standard globally because it reflects the actual proportion of work done in each semester."
        },
        {
          question: "How do I convert CGPA to Percentage for Nepali universities?",
          answer: "Different universities use different conversion formulas. Tribhuvan University (TU): Percentage ≈ CGPA × 25. Kathmandu University (KU): Percentage ≈ CGPA × 20 + 20 (approximate). Pokhara University (PU): Typically CGPA × 10 on a 10-point scale. Always verify with your specific university's official conversion table on the transcript."
        },
        {
          question: "What CGPA do I need for a scholarship or foreign university admission?",
          answer: "Most competitive scholarships and master's programs (USA, Australia, UK) require a minimum CGPA of 3.0/4.0 (Good) or above. Prestigious programs at top-ranked universities typically require 3.5+/4.0 (Distinction level). The Fulbright, Chevening, and ADB scholarships generally require 3.2+/4.0 and strong academic records."
        },
        {
          question: "What is the difference between GPA and CGPA?",
          answer: "GPA (Grade Point Average) is the weighted average for a single semester. CGPA (Cumulative GPA) accumulates all semesters, weighted by credit hours. Your CGPA on your final degree certificate reflects your entire academic journey and is the figure used by employers and graduate schools for evaluation."
        },
        {
          question: "Can I improve my CGPA in the final semesters?",
          answer: "Yes, but improvement depends on how many credits remain. The higher your total completed credits, the harder it is to move the CGPA needle. Example: With 100 completed credits and CGPA 3.0, you'd need to score 4.0 in all remaining 20 credits to reach just 3.17. Use this calculator to model 'what-if' scenarios by adjusting future semester GPAs."
        },
        {
          question: "How does credit hour impact CGPA in Tribhuvan University?",
          answer: "In TU's semester system, courses typically carry 3 credit hours (theory) plus 1 credit (lab or tutorial). A higher-credit course like a 6-credit Thesis contributes much more to CGPA. Getting an A+ (4.0) in a 6-credit Thesis improves CGPA significantly more than getting A+ in a 3-credit elective. Strategic planning of heavy-credit courses is key."
        }
      ]}
      sidebar={{
        title: "Academic Toolkit",
        links: [
          { label: "SEE GPA Calc", href: "/calculator/see-gpa/" },
          { label: "GPA to % Tool", href: "/calculator/gpa-to-percentage/" },
          { label: "Engineering GPA", href: "/calculator/engineering-gpa/" },
          { label: "Attendance Calc", href: "/calculator/attendance/" },
        ],
        banner: {
          title: "Aim for Distinction",
          description: "Tracking your CGPA regularly helps you stay on top of your academic goals and scholarships.",
          image: "/images/edu-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "SEE GPA", href: "/calculator/see-gpa/" },
        { label: "GPA to %", href: "/calculator/gpa-to-percentage/" },
        { label: "Engineering GPA", href: "/calculator/engineering-gpa/" }
      ]}
    />
  );
}
