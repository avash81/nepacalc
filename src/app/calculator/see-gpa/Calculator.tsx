'use client';

import React, { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { BookOpen, GraduationCap, AlertCircle, Info } from 'lucide-react';

const SUBJECTS = [
  { id: 'eng', name: 'English', credit: 4 },
  { id: 'nep', name: 'Nepali', credit: 4 },
  { id: 'math', name: 'Mathematics', credit: 4 },
  { id: 'sci', name: 'Science', credit: 4 },
  { id: 'soc', name: 'Social Studies', credit: 4 },
  { id: 'opt1', name: 'Optional I', credit: 4 },
  { id: 'opt2', name: 'Optional II', credit: 4 },
];

export default function SEEGPACalculator() {
  const [state, setState] = useSyncState('see_v2', {
    subjectData: SUBJECTS.map(s => ({
      ...s,
      theory: 60,
      practical: 20
    }))
  });

  const { subjectData } = state;

  const getSubjectGrade = (theory: number, practical: number) => {
    // 2081 Rule: Must get 35% in Theory (26.25/75) 
    const theoryPass = theory >= 26.25;
    const total = theory + practical;

    if (!theoryPass) return { grade: 'NG', gp: 0, pass: false };

    if (total >= 90) return { grade: 'A+', gp: 4.0, pass: true };
    if (total >= 80) return { grade: 'A', gp: 3.6, pass: true };
    if (total >= 70) return { grade: 'B+', gp: 3.2, pass: true };
    if (total >= 60) return { grade: 'B', gp: 2.8, pass: true };
    if (total >= 50) return { grade: 'C+', gp: 2.4, pass: true };
    if (total >= 40) return { grade: 'C', gp: 2.0, pass: true };
    if (total >= 35) return { grade: 'D', gp: 1.6, pass: true };
    return { grade: 'NG', gp: 0, pass: false };
  };

  const results = useMemo(() => {
    let totalWeightedGP = 0;
    let totalCredits = 0;
    let hasNG = false;

    const detailedResults = subjectData.map(s => {
      const res = getSubjectGrade(s.theory, s.practical);
      totalWeightedGP += res.gp * s.credit;
      totalCredits += s.credit;
      if (res.grade === 'NG') hasNG = true;
      return { ...s, ...res };
    });

    const gpa = totalWeightedGP / totalCredits;

    let overallGrade = 'NG';
    if (!hasNG) {
      if (gpa >= 3.6) overallGrade = 'A+';
      else if (gpa >= 3.2) overallGrade = 'A';
      else if (gpa >= 2.8) overallGrade = 'B+';
      else if (gpa >= 2.4) overallGrade = 'B';
      else if (gpa >= 2.0) overallGrade = 'C+';
      else if (gpa >= 1.6) overallGrade = 'C';
      else if (gpa >= 1.2) overallGrade = 'D';
    }

    return { gpa: hasNG ? 0 : gpa, overallGrade, detailedResults, hasNG };
  }, [subjectData]);

  const updateSubject = (id: string, field: 'theory' | 'practical', val: number) => {
    const newData = subjectData.map(s => 
      s.id === id ? { ...s, [field]: val } : s
    );
    setState({ ...state, subjectData: newData });
  };

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'SEE GPA Calculator' }]}
      title="SEE GPA Calculator (2081 System)"
      description="Calculate your Secondary Education Examination (SEE) GPA using the official Nepal Letter Grading Directive 2078/2081 rules."
      icon={GraduationCap}
      inputs={
        <div className="space-y-4">
           <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-800 font-medium leading-relaxed">
                Enter your marks out of <strong>75 for Theory</strong> and <strong>25 for Practical</strong>. You must score at least 26.25 in Theory to pass.
              </p>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
              {results.detailedResults.map(s => (
                <div key={s.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 hover:border-indigo-200 transition-colors">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{s.name}</span>
                      </div>
                      <div className={`px-4 py-1 rounded-full text-xs font-black uppercase ${s.pass ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                         Grade: {s.grade}
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <ValidatedInput 
                        label="Theory (Out of 75)" 
                        value={s.theory} 
                        onChange={v => updateSubject(s.id, 'theory', v)}
                        max={75}
                        error={s.theory < 26.25 ? "NG - Failed Theory (Min 26.25)" : undefined}
                      />
                      <ValidatedInput 
                        label="Practical (Out of 25)" 
                        value={s.practical} 
                        onChange={v => updateSubject(s.id, 'practical', v)}
                        max={25}
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <ResultCard 
            label="Cumulative GPA" 
            value={results.gpa.toFixed(2)} 
            unit="" 
            color={results.hasNG ? 'red' : 'indigo'} 
            title="SEE Final Score"
            copyValue={`GPA: ${results.gpa.toFixed(2)}, Grade: ${results.overallGrade}`}
          />

          <div className="bg-slate-900 text-white rounded-[2rem] p-8 space-y-6 shadow-xl relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                <GraduationCap className="w-48 h-48 -mr-10 -mt-10" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                   <GraduationCap className="w-6 h-6 text-indigo-400" />
                   <div className="text-xs font-black uppercase tracking-widest text-indigo-400">Official Report Digest</div>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center backdrop-blur-sm">
                   <div className="text-6xl font-black mb-2">{results.overallGrade}</div>
                   <div className="text-xs font-bold text-white/60 uppercase tracking-widest">Aggregate Final Grade</div>
                </div>
                {results.hasNG && (
                  <div className="p-4 bg-rose-500/20 border border-rose-500/30 rounded-xl flex gap-3 text-rose-300">
                     <AlertCircle className="w-5 h-5 shrink-0" />
                     <p className="text-xs font-bold leading-relaxed uppercase">NON-GRADED: You failed to secure 35% in one or more theory subjects. Grade boost exam is required.</p>
                  </div>
                )}
             </div>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">Grading Scale Reference</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>90-100%</span><span className="font-bold text-emerald-600">A+ (4.0)</span></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>80-89%</span><span className="font-bold text-emerald-500">A (3.6)</span></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>70-79%</span><span className="font-bold text-blue-600">B+ (3.2)</span></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>60-69%</span><span className="font-bold text-blue-500">B (2.8)</span></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>50-59%</span><span className="font-bold text-amber-600">C+ (2.4)</span></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>40-49%</span><span className="font-bold text-amber-500">C (2.0)</span></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>35-39%</span><span className="font-bold text-orange-500">D (1.6)</span></div>
              <div className="flex justify-between p-2 bg-rose-50 rounded text-rose-600"><span>Below 35%</span><span className="font-bold">NG (0)</span></div>
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Education Tools",
        links: [
          { label: '+2 NEB GPA Calculator', href: '/calculator/nepal-neb-gpa' },
          { label: 'Percentage Calculator', href: '/calculator/percentage' },
        ],
      }}
      howToUse={{
        steps: [
          "For each of the 7 subjects, enter your expected or actual marks.",
          "Input your Theory marks (out of 75). Ensure it is at least 26.25 to pass.",
          "Input your Practical marks (out of 25).",
          "The calculator instantly determines the letter grade for each subject.",
          "The final cumulative GPA and overall aggregate grade are calculated automatically."
        ]
      }}
      faqs={[
        {
          question: "What does 'NG' mean?",
          answer: "'NG' stands for Non-Graded. Under the 2078/2081 guidelines, if a student scores below 35% in the theory portion of any subject, they will receive an NG. They will not receive a final GPA and must take a supplementary exam."
        },
        {
          question: "How is the final GPA calculated?",
          answer: "The final GPA is a weighted average. Each subject's Grade Point (GP) is multiplied by its credit hours. The sum of these values is then divided by the total credit hours."
        }
      ]}
      seoContent={
        <div>
          <h2>Understanding the SEE GPA System in Nepal</h2>
          <p>The Secondary Education Examination (SEE) is the final examination in the secondary school system of Nepal. Recently, the National Examination Board (NEB) updated the grading system to enforce stricter quality controls via the Letter Grading Directive 2078 (implemented fully in 2081 BS).</p>
          
          <h3>The 35% Theory Rule</h3>
          <p>The most significant change in the new directive is the separation of Theory and Practical marks. Previously, students could pass by combining high practical marks with low theory marks. Now, students <strong>must secure a minimum of 35% in the theory examination</strong> independently.</p>
          <ul>
            <li>For a standard 75-mark theory exam, a student must score at least <strong>26.25 marks</strong>.</li>
            <li>For a standard 25-mark practical exam, a student must score at least <strong>10 marks</strong> (40%).</li>
          </ul>
          <p>If a student fails to meet the theory threshold, they receive an 'NG' (Non-Graded) regardless of their practical score. Students with an NG cannot enroll in higher secondary education (Class 11) until they pass the grade increment (supplementary) exams.</p>
          
          <h3>Grade Points and Credits</h3>
          <p>The GPA is not a simple average. Each subject is assigned a specific number of Credit Hours (usually 4 for core subjects). The Grade Point (GP) earned in a subject is multiplied by its Credit Hours. The sum of all these weighted points is divided by the total number of credit hours to determine the final Cumulative GPA.</p>
        </div>
      }
    />
  );
}
