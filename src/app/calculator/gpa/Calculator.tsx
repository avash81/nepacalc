'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { GraduationCap, Plus, Trash2, Info, Target, Calculator, PieChart, BookOpen, RotateCcw } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const NEPAL_GRADES = [
  { grade: 'A+', point: 4.0 },
  { grade: 'A', point: 3.6 },
  { grade: 'B+', point: 3.2 },
  { grade: 'B', point: 2.8 },
  { grade: 'C+', point: 2.4 },
  { grade: 'C', point: 2.0 },
  { grade: 'D', point: 1.6 },
  { grade: 'E', point: 0.8 },
  { grade: 'N', point: 0.0 },
];

const US_GRADES = [
  { grade: 'A', point: 4.0 },
  { grade: 'A-', point: 3.7 },
  { grade: 'B+', point: 3.3 },
  { grade: 'B', point: 3.0 },
  { grade: 'B-', point: 2.7 },
  { grade: 'C+', point: 2.3 },
  { grade: 'C', point: 2.0 },
  { grade: 'C-', point: 1.7 },
  { grade: 'D+', point: 1.3 },
  { grade: 'D', point: 1.0 },
  { grade: 'F', point: 0.0 },
];

const INITIAL_SUBJECTS = [
  { id: 1, name: '', credit: 3, grade: 'A' },
  { id: 2, name: '', credit: 3, grade: 'A' },
  { id: 3, name: '', credit: 3, grade: 'B+' },
];

export default function GPACalculator() {
  const [state, setState] = useSyncState('gpa_v5', {
    system: 'nepal' as 'nepal' | 'us',
    subjects: INITIAL_SUBJECTS
  });
  const { system, subjects } = state;

  const gradesList = system === 'nepal' ? NEPAL_GRADES : US_GRADES;

  const result = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    subjects.forEach(sub => {
      const g = gradesList.find(g => g.grade === sub.grade);
      if (g && sub.credit > 0) {
        totalPoints += g.point * sub.credit;
        totalCredits += sub.credit;
      }
    });
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
    
    let classification = 'Passing';
    if (system === 'nepal') {
      if (gpa >= 3.6) classification = 'Outstanding';
      else if (gpa >= 3.2) classification = 'Excellent';
      else if (gpa >= 2.8) classification = 'Very Good';
      else if (gpa >= 2.4) classification = 'Good';
    }
    return { gpa: gpa.toFixed(2), totalCredits, totalPoints: totalPoints.toFixed(2), classification };
  }, [subjects, system, gradesList]);

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const addSubject = () => update({ subjects: [...subjects, { id: Date.now(), name: '', credit: 3, grade: gradesList[0].grade }] });
  const removeSubject = (id: number) => update({ subjects: subjects.filter(s => s.id !== id) });
  const updateSubject = (id: number, field: string, value: any) => {
    update({ subjects: subjects.map(s => s.id === id ? { ...s, [field]: value } : s) });
  };

  const inputCls = "w-full h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] outline-none";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'GPA Calculator' }]}
      title="Semester GPA Calculator"
      description="Calculate your semester Grade Point Average (GPA) instantly. Supports Nepal's NEB/TU grading and international US 4.0 scales."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Grading System</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {(['nepal', 'us'] as const).map((s) => (
                <button 
                  key={s} 
                  onClick={() => update({ system: s })}
                  className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${system === s ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}
                >
                  {s === 'nepal' ? 'Nepal' : 'US / Intl'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
             {subjects.map((sub, idx) => (
               <div key={sub.id} className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg space-y-3 group relative">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-[#70757A] uppercase">Course #{idx + 1}</span>
                    {subjects.length > 1 && (
                      <button onClick={() => removeSubject(sub.id)} className="text-[#D93025] hover:bg-[#FCE8E6] p-1 rounded-full transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-12 gap-3">
                     <div className="col-span-12 sm:col-span-6">
                        <input type="text" value={sub.name} onChange={e => updateSubject(sub.id, 'name', e.target.value)} placeholder="Course Name (Optional)" className={inputCls} />
                     </div>
                     <div className="col-span-6 sm:col-span-3">
                        <input type="number" value={sub.credit} onChange={e => updateSubject(sub.id, 'credit', Number(e.target.value))} placeholder="Credits" className={inputCls} />
                     </div>
                     <div className="col-span-6 sm:col-span-3">
                        <select value={sub.grade} onChange={e => updateSubject(sub.id, 'grade', e.target.value)} className={inputCls}>
                           {gradesList.map(g => <option key={g.grade} value={g.grade}>{g.grade}</option>)}
                        </select>
                     </div>
                  </div>
               </div>
             ))}
          </div>

          <div className="flex gap-3">
            <button onClick={addSubject} className="flex-1 py-3 border-2 border-dashed border-[#DADCE0] rounded-lg text-[#1A73E8] font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-all">
              <Plus className="w-4 h-4" /> Add Course
            </button>
            <button onClick={() => update({ subjects: INITIAL_SUBJECTS })} className="p-3 border border-[#DADCE0] rounded-lg text-[#5F6368] hover:bg-white transition-all">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate GPA
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Semester GPA</div>
            <div className="text-5xl font-black text-[#1A73E8]">{result.gpa}</div>
            <div className="text-[11px] font-black text-[#202124] uppercase tracking-widest bg-white/50 px-4 py-1 rounded-full inline-block mt-2 border border-[#1A73E8]/20">{result.classification}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Credits</div>
               <div className="text-sm font-black text-[#202124]">{result.totalCredits}</div>
             </div>
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Grade Points</div>
               <div className="text-sm font-black text-[#188038]">{result.totalPoints}</div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">System Reference</span>
               <BookOpen className="w-3 h-3 text-[#1A73E8]" />
             </div>
             <div className="p-4">
                <table className="w-full text-left">
                  <thead className="text-[9px] font-bold uppercase text-[#70757A]">
                    <tr>
                      <th className="pb-2">Grade</th>
                      <th className="pb-2">Points</th>
                      <th className="pb-2">Definition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0]">
                    {gradesList.slice(0, 5).map(g => (
                      <tr key={g.grade} className="text-[10px]">
                        <td className="py-2 font-black">{g.grade}</td>
                        <td className="py-2">{g.point.toFixed(1)}</td>
                        <td className="py-2 text-[#5F6368]">{g.point >= 3.6 ? 'Distinction' : 'Excellent'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
            <Info className="w-4 h-4 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">Your semester GPA is calculated using the credit-weighted average of all courses.</p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select the grading system used by your institution (Nepal NEB/TU or US/Intl).",
          "Enter your course name (optional), its credit hours, and the grade you received.",
          "Add more courses as needed by clicking 'Add Course'.",
          "The calculator automatically updates your GPA as you input data.",
          "Check the system reference table for point mapping details."
        ]
      }}
      formula={{
        title: "Semester GPA Logic",
        description: "GPA is the sum of (Grade Points × Credits) divided by the total number of credits.",
        raw: "GPA = Σ (Subject Point × Subject Credit) / Σ (Total Credits)"
      }}
      faqs={[
        {
          question: "How is A+ different from A in Nepal?",
          answer: "In the NEB system, A+ corresponds to 4.0 points (90%+ marks), while A corresponds to 3.6 points (80-89% marks)."
        },
        {
          question: "What if I have an 'N' or 'F' grade?",
          answer: "An 'N' (Not Graded) or 'F' (Fail) carries 0.0 points. While they add to the total credits (denominator), they add zero to total points, significantly lowering your GPA."
        }
      ]}
      sidebar={{
        title: "Academic Suite",
        links: [
          { label: "CGPA Calculator", href: "/calculator/cgpa" },
          { label: "SEE GPA Calc", href: "/calculator/see-gpa" },
          { label: "Attendance tool", href: "/calculator/attendance" },
          { label: "GPA to % Converter", href: "/calculator/gpa-to-percentage" },
        ],
        banner: {
          title: "Track Your Success",
          description: "Consistent GPA tracking allows you to identify areas of improvement before the final exams.",
          image: "/images/edu-banner-2.jpg"
        }
      }}
      relatedTools={[
        { label: "CGPA Calculator", href: "/calculator/cgpa" },
        { label: "SEE GPA", href: "/calculator/see-gpa" },
        { label: "Attendance tool", href: "/calculator/attendance" }
      ]}
    />
  );
}
