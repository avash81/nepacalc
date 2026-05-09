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
      slug="see-gpa"
      crumbs={[{ label: 'Education', href: '/education/' }, { label: 'SEE GPA Calculator' }]}
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
                        error={s.theory < 26.25 ? "NG, Failed Theory (Min 26.25)" : undefined}
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

          <div className="bg-white border border-[#dadce0] text-[#202124] rounded-[2rem] p-8 space-y-6 shadow-sm relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                <GraduationCap className="w-48 h-48 -mr-10 -mt-10" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                   <GraduationCap className="w-6 h-6 text-indigo-400" />
                   <div className="text-xs font-black uppercase tracking-widest text-indigo-400">Official Report Digest</div>
                </div>
                <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-[#dadce0] text-center backdrop-blur-sm">
                   <div className="text-6xl font-black mb-2">{results.overallGrade}</div>
                   <div className="text-xs font-bold text-[#202124]/60 uppercase tracking-widest">Aggregate Final Grade</div>
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
          { label: '+2 NEB GPA Calculator', href: '/calculator/nepal-neb-gpa/' },
          { label: 'Percentage Calculator', href: '/calculator/percentage/' },
          { label: "BMI Calculator", href: "/calculator/bmi/" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
          { label: "Age Calculator", href: "/calculator/age-calculator/" }
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
        { question: "What does 'NG' mean in the SEE grading system?", answer: "'NG' stands for Non-Graded. Under the 2078/2081 NEB guidelines, if a student scores below 35% (26.25/75) in the theory portion of any subject, they receive NG in that subject. An NG in any subject blocks the entire final GPA calculation, and the student cannot enroll in Class 11 without passing a supplementary grade increment examination." },
        { question: "How is the final SEE GPA calculated?", answer: "The final GPA is a credit-weighted average: (1) For each subject, convert the total marks (Theory + Practical out of 100) to a Grade Point using the NEB scale. (2) Multiply each subject's Grade Point by its credit hours (typically 4 per subject). (3) Sum all the weighted grade points. (4) Divide by the total credit hours (28 for 7 subjects × 4 credits). This gives the final CGPA." },
        { question: "What is the minimum score to pass a subject in SEE 2081?", answer: "A student must score a minimum of 26.25 out of 75 in the theory paper (exactly 35%). There is no minimum for practical marks. However, even if you score 100% in practicals, failing the theory threshold (scoring below 26.25) automatically gives you NG for that subject. The combined total (theory + practical) determines your letter grade once the threshold is cleared." },
        { question: "What Grade Point is needed for Science stream admission in +2?", answer: "For Science stream (+2 Science) in most colleges in Nepal: minimum 2.4 GPA (C+) is required. Top colleges require 3.2+ (A) or above. For Management stream: typically 1.6+ (D). For Humanities: 1.6+ (D). Government (community) colleges have lower cut-offs. Private colleges and Kathmandu-based institutions often set higher thresholds due to competition." },
        { question: "How do the 2081 SEE grading rules differ from the old SLC percentage system?", answer: "The old SLC used a pass/fail percentage model ,  you needed 32% in each subject and 40% overall to pass. The new SEE Letter Grading System (implemented from 2075, updated 2081) removes the concept of 'pass/fail' ,  students are graded A+ to D, and only NG is equivalent to a failure. This means even weak students get a grade (not 'failed'), reducing dropout stress while maintaining academic standards." },
        { question: "Can I improve my SEE grade after receiving the results?", answer: "Yes. Nepal's NEB offers a Grade Increment Examination (Shreni Sudhar Pariksha) for students who receive NG or want to improve their existing grades. You can appear in the Grade Increment Exam for up to 2 subjects. The exam covers the full syllabus and the better of your original and increment exam scores is used for the final grade sheet. This exam is typically held 3-4 months after SEE results." }
      ]}
      details={
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 mb-4">Mastering the SEE GPA System & NEB Grading Directives</h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                The Secondary Education Examination (SEE) is a critical academic milestone in Nepal. To maintain international educational standards, the National Examination Board (NEB) enforces the <strong>Letter Grading Directive 2078</strong> (fully implemented in 2081 BS). Unlike a standard <strong className="text-slate-800">college gpa calculator</strong> or a simple <strong className="text-slate-800">weighted gpa calculator</strong>, our SEE grading engine strictly decouples theoretical and practical scores to ensure absolute compliance with Ministry of Education algorithms.
              </p>
              <p>
                Navigating the modern <strong className="text-slate-800">gpa scale</strong> requires precise mathematical thresholding. Before converting raw marks, the algorithm performs a mandatory Boolean check against the 35% theory requirement. This ensures our <strong className="text-slate-800">gpa converter</strong> accurately reflects whether a student is mathematically eligible for grade sheet certification or if they require supplementary grade increment exams.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Mathematical Grading Mechanics & The 35% Threshold</h3>
            <ul className="space-y-3 text-sm text-slate-600 list-disc pl-5">
              <li><strong className="text-indigo-600">The 35% Theory Floor:</strong> The most drastic shift in the 2081 BS grading system is the absolute decoupling of passing marks. You can no longer combine high practical scores with low theory scores to pass. A student must score a minimum of 26.25 out of 75 (exactly 35%) in the theory component alone. Failure to mathematically clear this threshold triggers an automatic 'NG' (Non-Graded) status.</li>
              <li><strong className="text-emerald-600">Weighted Grade Points (GP):</strong> Once the NG threshold is cleared, the system converts total marks (Theory + Practical) into a Grade Point ranging from 1.6 (D) to 4.0 (A+). This is not a simple average. The final Cumulative GPA is calculated by multiplying each subject's GP by its designated Credit Hours (typically 4 for core subjects), summing the results, and dividing by the total credit hours.</li>
              <li><strong className="text-rose-600">The NG Restriction:</strong> Receiving an 'NG' in any subject halts the GPA calculation entirely. The <strong className="text-slate-800">gpa meaning</strong> in this context is strict: you do not receive a final aggregate grade or cumulative GPA, and you are mathematically barred from enrolling in Class 11 until the supplementary exam is cleared.</li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
