'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { BookOpen, GraduationCap, AlertCircle, CheckCircle2, Info } from 'lucide-react';

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
    <CalculatorLayout
      title="SEE GPA Calculator (2081 System)"
      description="Official grading logic based on Nepal's Letter Grading Directive 2078. Includes the mandatory 35% theory pass rule and credit-weighted GPA calculation."
      category={{ label: 'Education', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-6">
           <div className="grid grid-cols-1 gap-4">
              {results.detailedResults.map(s => (
                <div key={s.id} className="p-5 bg-white border border-[var(--border)] rounded-2xl shadow-sm space-y-4">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{s.name}</span>
                      </div>
                      <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${s.pass ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
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
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Cumulative GPA" 
            value={results.gpa.toFixed(2)} 
            unit="" 
            color={results.hasNG ? 'red' : 'indigo'} 
            title="SEE Final Score"
            copyValue={`GPA: ${results.gpa.toFixed(2)}, Grade: ${results.overallGrade}`}
          />

          <div className="bg-slate-900 text-white rounded-[2rem] p-8 space-y-6 shadow-2xl relative overflow-hidden">
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                   <GraduationCap className="w-6 h-6 text-indigo-400" />
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Official Report Digest</div>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                   <div className="text-4xl font-black mb-1">{results.overallGrade}</div>
                   <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Aggregate Grade</div>
                </div>
                {results.hasNG && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex gap-3 text-rose-400">
                     <AlertCircle className="w-4 h-4 shrink-0" />
                     <p className="text-[10px] font-bold leading-tight uppercase">NON-GRADED: You failed to secure 35% in one or more subjects. Grade boost exam is required.</p>
                  </div>
                )}
             </div>
          </div>

          <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex gap-3">
             <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-indigo-900 uppercase">2081 directive</h5>
                <p className="text-[11px] text-indigo-700 font-medium leading-relaxed italic">
                   "As per the new system, students must score at least **26.25/75** in theory to receive a grade. Internal (practical) pass mark is 10/25."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter">Understanding the New SEE Grading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2">The "Non-Graded" (NG) Rule</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">The most significant change in 2081 is the mandatory pass mark for theory. Previously, a combined score was used. Now, if you fail the theory component (below 35%), you receive an **NG** regardless of how well you did in practicals.</p>
               </div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2">GPA Calculation Method</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">Your GPA is calculated using a **weighted average**. Each subject has a set number of "Credit Hours" (usually 4 for main subjects). The grade point of each subject is multiplied by its credit, summed up, and then divided by the total credits.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
