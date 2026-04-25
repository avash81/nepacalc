'use client';
import { useMemo } from 'react';
import { Target, Plus, Trash2, Info } from 'lucide-react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const UNIVERSITIES = {
  tu_ioe: { name: 'TU / IOE (Tribhuvan Uni)' },
  ku: { name: 'Kathmandu Uni (KU)' },
  pu: { name: 'Pokhara Uni (PU)' },
};

interface Semester { id: number; name: string; gpa: number; credits: number; }
const DEFAULT_STATE = {
  uni: 'tu_ioe' as keyof typeof UNIVERSITIES,
  currentCGPA: 3.2,
  completedCredits: 60,
  targetCGPA: 3.5,
  remainingCredits: 60,
  semesters: [{ id: 1, name: 'Semester 1', gpa: 3.4, credits: 18 }, { id: 2, name: 'Semester 2', gpa: 3.0, credits: 20 }] as Semester[]
};

export default function EngineeringGPACalculator() {
  const [state, setState] = useLocalStorage('NEPACALC_engineering_gpa_v3', DEFAULT_STATE);
  const { uni, currentCGPA, completedCredits, targetCGPA, remainingCredits, semesters } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...updates });
  const addSemester = () => {
    const newId = semesters.length > 0 ? Math.max(...semesters.map(s => s.id)) + 1 : 1;
    updateState({ semesters: [...semesters, { id: newId, name: `Semester ${newId}`, gpa: 3.0, credits: 18 }] });
  };
  const removeSemester = (id: number) => updateState({ semesters: semesters.filter(s => s.id !== id) });
  const updateSemester = (id: number, field: keyof Semester, value: any) => updateState({ semesters: semesters.map(s => s.id === id ? { ...s, [field]: value } : s) });

  const analysis = useMemo(() => {
    let totalPoints = 0; let totalCredits = 0;
    semesters.forEach(s => { totalPoints += s.gpa * s.credits; totalCredits += s.credits; });
    const actualCGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const totalPossibleCredits = completedCredits + remainingCredits;
    const totalNeededPoints = targetCGPA * totalPossibleCredits;
    const currentPoints = currentCGPA * completedCredits;
    const remainingPointsNeeded = totalNeededPoints - currentPoints;
    const requiredGPA = remainingCredits > 0 ? remainingPointsNeeded / remainingCredits : 0;
    return { actualCGPA: actualCGPA.toFixed(2), requiredGPA: requiredGPA.toFixed(2), isPossible: requiredGPA <= 4.0 && requiredGPA >= 0, totalCredits };
  }, [semesters, currentCGPA, completedCredits, targetCGPA, remainingCredits]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Engineering GPA' }]}
      title="Engineering Target CGPA Calculator"
      description="Professional grade predictor for engineering students (TU IOE, PU, KU). Calculate the exact GPA needed in upcoming semesters to hit your graduation targets."
      icon={Target}
      inputs={
        <div className="space-y-6">
           <div>
              <label className={labelCls}>University / Institution</label>
              <select value={uni} onChange={(e) => updateState({ uni: e.target.value as any })} className={inputCls}>
                 {Object.entries(UNIVERSITIES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <div className="sm:col-span-2 flex items-center gap-2 mb-1">
                 <Target className="w-4 h-4 text-[#1A73E8]" />
                 <span className="text-[11px] font-bold uppercase text-[#202124] tracking-wider">Goal Prediction Setup</span>
              </div>
              <div><label className={labelCls}>Current CGPA</label><input type="number" value={currentCGPA} min={0} max={4} step={0.01} onChange={(e) => updateState({ currentCGPA: Number(e.target.value) })} className={inputCls} /></div>
              <div><label className={labelCls}>Completed Credits</label><input type="number" value={completedCredits} min={0} max={220} onChange={(e) => updateState({ completedCredits: Number(e.target.value) })} className={inputCls} /></div>
              <div><label className={labelCls}>Target Goal CGPA</label><input type="number" value={targetCGPA} min={0} max={4} step={0.01} onChange={(e) => updateState({ targetCGPA: Number(e.target.value) })} className={inputCls} /></div>
              <div><label className={labelCls}>Remaining Credits</label><input type="number" value={remainingCredits} min={0} max={220} onChange={(e) => updateState({ remainingCredits: Number(e.target.value) })} className={inputCls} /></div>
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <label className={labelCls}>Past Semester Ledger</label>
                 <button onClick={addSemester} className="text-[10px] font-bold uppercase text-[#1A73E8] hover:bg-[#E8F0FE] px-3 py-1.5 rounded flex items-center gap-1 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add Semester
                 </button>
              </div>
              <div className="space-y-2">
                 {semesters.map((s) => (
                   <div key={s.id} className="flex gap-2 p-3 bg-white border border-[#DADCE0] rounded-lg items-center">
                      <div className="flex-1"><input type="text" value={s.name} onChange={(e) => updateSemester(s.id, 'name', e.target.value)} className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded text-xs font-bold focus:border-[#1A73E8] outline-none" /></div>
                      <div className="w-20"><input type="number" value={s.gpa} min={0} max={4} step={0.01} onChange={(e) => updateSemester(s.id, 'gpa', Number(e.target.value))} className="w-full h-10 px-2 bg-[#F8F9FA] border border-[#DADCE0] rounded text-xs font-bold text-center focus:border-[#1A73E8] outline-none" placeholder="GPA" /></div>
                      <div className="w-20"><input type="number" value={s.credits} min={0} onChange={(e) => updateSemester(s.id, 'credits', Number(e.target.value))} className="w-full h-10 px-2 bg-[#F8F9FA] border border-[#DADCE0] rounded text-xs font-bold text-center focus:border-[#1A73E8] outline-none" placeholder="Cr" /></div>
                      <button onClick={() => removeSemester(s.id)} className="p-2 text-[#70757A] hover:text-[#D93025] hover:bg-[#FCE8E6] rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-[#1A1A2E] border border-[#DADCE0] rounded-lg p-8 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A73E8] opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
             <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-2 relative z-10">GPA Required in Remaining Credits</div>
             <div className={`text-6xl font-black tracking-tighter mb-4 relative z-10 ${analysis.isPossible ? 'text-[#81C995]' : 'text-[#F28B82]'}`}>
               {analysis.requiredGPA}
             </div>
             <div className="text-[10px] font-bold text-[#8AB4F8] uppercase tracking-wider bg-white/10 inline-flex px-3 py-1 rounded relative z-10">To reach target CGPA: {targetCGPA}</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Realtime Audit Ledger</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368] font-bold">Actual Calculated CGPA</span><span className="font-black text-[#1A73E8]">{analysis.actualCGPA}</span></div>
                <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368] font-bold">Total Credits Verified</span><span className="font-black">{analysis.totalCredits}</span></div>
             </div>
          </div>

          <div className={`p-4 border rounded-lg flex gap-3 items-start ${analysis.isPossible ? 'bg-[#E8F0FE] border-[#C5D9F7]' : 'bg-[#FCE8E6] border-[#FAD2CF]'}`}>
             <Info className={`w-5 h-5 shrink-0 mt-0.5 ${analysis.isPossible ? 'text-[#1A73E8]' : 'text-[#D93025]'}`} />
             <p className={`text-[10px] leading-relaxed font-bold ${analysis.isPossible ? 'text-[#202124]' : 'text-[#B3261E]'}`}>
               {analysis.isPossible ? `You must maintain an average GPA of ${analysis.requiredGPA} across your remaining ${remainingCredits} credits to successfully graduate with a ${targetCGPA}.` : `Mathematical Impossibility: A GPA over 4.0 is required. Your target of ${targetCGPA} cannot be reached with only ${remainingCredits} remaining credits.`}
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Strategic Academic Planning for Nepali Engineers</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Surviving a rigorous 4-year engineering program requires more than just studying; it demands strict mathematical management of your cumulative credits. Specifically designed as an <strong className="text-[#202124]">ioe gpa calculator</strong> for Tribhuvan University students, this tool algorithmically projects exactly what semester grades are required to achieve your final graduation target. 
              </p>
              <p>
                Unlike basic high-school grading, a <strong className="text-[#202124]">tu engineering cgpa calculator</strong> must account for uneven credit loads—where a 4-credit core subject exponentially impacts your average more than a 1-credit lab. By inputting your completed ledger, the engine instantly solves the algebraic equation to reveal your minimum required performance floor.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">University Standards & Margin of Error</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Pokhara University Variations:</strong> When using this as a <strong className="text-[#202124]">pokhara university gpa calculator</strong>, keep in mind that PU's credit hour distributions differ slightly from TU. You must accurately log your "completed credits" against PU's specific syllabus weighting to prevent prediction drift.</li>
              <li><strong className="text-[#188038]">Kathmandu University (KU) Specs:</strong> The <strong className="text-[#202124]">ku gpa system</strong> maintains a strict 4.0 scale but places heavy emphasis on internal assessments. Use the "Semester Ledger" to verify your current standing before attempting to predict your required final-year thesis grades.</li>
              <li><strong className="text-[#D93025]">The Mathematical Impossibility Alert:</strong> Because the maximum theoretical GPA is capped at 4.0, a student in their 7th semester with a 2.5 CGPA physically cannot reach a 3.5 final graduation target, regardless of their final year performance. The algorithm will automatically red-flag these impossible targets.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select your university standard (TU IOE, KU, PU).", "Enter your current cumulative CGPA and the credits you've completed so far.", "Set your target graduation CGPA and the credits remaining in your degree.", "Optional: Log individual past semesters in the ledger for a precise actual CGPA audit.", "The tool will instantly show you exactly what GPA you need in future exams to hit your target."] }}
      formula={{ title: "CGPA Prediction Algorithm", description: "Credit-weighted averaging.", raw: "Target Points = Target CGPA × (Completed Credits + Remaining Credits)\nCurrent Points = Current CGPA × Completed Credits\n\nPoints Needed = Target Points - Current Points\nRequired Average GPA = Points Needed / Remaining Credits" }}
      faqs={[
        { question: "Why does it say mathematically impossible?", answer: "Because grading systems cap at 4.0. If you have too few credits remaining, even scoring a perfect 4.0 in every remaining class won't bring your average up to your target." },
        { question: "Are TU IOE credit weights different?", answer: "IOE uses standard credit weight calculations for GPA. Just ensure your 'completed credits' accurately reflects only the subjects you passed." }
      ]}
      sidebar={{ title: "Student Life", links: [{ label: "SEE GPA Calculator", href: "/calculator/see-gpa" }, { label: "Standard Deviation", href: "/calculator/standard-deviation" }], banner: { title: "Academic Planning", description: "Don't leave graduation to chance. Plan your exam targets early.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "SEE GPA Calculator", href: "/calculator/see-gpa" }, { label: "Standard Deviation", href: "/calculator/standard-deviation" }]}
    />
  );
}
