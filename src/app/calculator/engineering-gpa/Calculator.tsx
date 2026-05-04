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
  const [state, setState] = useLocalStorage('NepaCalc_engineering_gpa_v3', DEFAULT_STATE);
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
      slug="engineering-gpa"
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
          <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Target Performance Required</div>
             <div className={`text-6xl font-black tracking-tighter ${analysis.isPossible ? 'text-[#1A73E8]' : 'text-[#D93025]'}`}>
               {analysis.requiredGPA}
             </div>
             <div className="text-[10px] font-bold text-[#70757A] uppercase">Required GPA in {remainingCredits} Credits</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-widest">Graduation Audit Matrix</span>
                <Info className="w-3.5 h-3.5 text-[#1A73E8]" />
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-4 flex justify-between text-xs">
                   <span className="text-[#5F6368] font-bold uppercase">Calculated Current CGPA</span>
                   <span className="font-black text-[#1A73E8]">{analysis.actualCGPA}</span>
                </div>
                <div className="p-4 flex justify-between text-xs">
                   <span className="text-[#5F6368] font-bold uppercase">Verified Total Credits</span>
                   <span className="font-black">{analysis.totalCredits}</span>
                </div>
                <div className="p-4 flex justify-between text-xs">
                   <span className="text-[#5F6368] font-bold uppercase">Target CGPA Goal</span>
                   <span className="font-black text-[#188038]">{targetCGPA.toFixed(2)}</span>
                </div>
             </div>
          </div>

          <div className={`p-4 border rounded-lg flex gap-3 items-start ${analysis.isPossible ? 'bg-[#E6F4EA] border-[#CEEAD6]' : 'bg-[#FCE8E6] border-[#FAD2CF]'}`}>
             <Info className={`w-5 h-5 shrink-0 mt-0.5 ${analysis.isPossible ? 'text-[#188038]' : 'text-[#D93025]'}`} />
             <p className={`text-[10px] leading-relaxed font-bold ${analysis.isPossible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
               {analysis.isPossible 
                 ? `MANDATORY: You must maintain an average GPA of ${analysis.requiredGPA} across your remaining ${remainingCredits} credits to secure a ${targetCGPA.toFixed(2)} graduation status.` 
                 : `PROTOCOL ALERT: A GPA exceeding 4.00 is required. Your target of ${targetCGPA.toFixed(2)} is mathematically unreachable with ${remainingCredits} credits remaining.`}
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Institutional Engineering Grade Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for engineering academic trajectory management in Nepal. Calibrated for <strong>TU IOE</strong>, <strong>KU</strong>, and <strong>PU</strong> grading protocols, this tool provides a high-precision verification of GPA requirements. 
                Designed for graduation certainty, it isolates required performance metrics to bridge existing CGPA deficits and ensure statutory compliance with university distinction thresholds.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "SEE GPA Calculator", href: "/calculator/see-gpa/" }, 
        { label: "Standard Deviation", href: "/calculator/standard-deviation/" },
        { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
        { label: "BMI Calculator", href: "/calculator/bmi/" },
        { label: "Age Calculator", href: "/calculator/age-calculator/" }
      ]}
    />
  );
}
