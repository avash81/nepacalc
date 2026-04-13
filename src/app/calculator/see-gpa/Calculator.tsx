'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { GraduationCap, BookOpen, Calculator as CalcIcon, CheckCircle2 } from 'lucide-react';

const SUBJECTS = [
  'English', 'Nepali', 'Mathematics', 'Science', 
  'Social Studies', 'Health, Pop & Env', 'Optional I', 'Optional II'
];

export default function SeeGpaCalculator() {
  const [marks, setMarks] = useState<Record<string, number>>(
    Object.fromEntries(SUBJECTS.map(s => [s, 75]))
  );

  const getGradePoint = (mark: number) => {
    if (mark >= 90) return 4.0;
    if (mark >= 80) return 3.6;
    if (mark >= 70) return 3.2;
    if (mark >= 60) return 2.8;
    if (mark >= 50) return 2.4;
    if (mark >= 40) return 2.0;
    if (mark >= 35) return 1.6;
    return 0.0;
  };

  const getGrade = (mark: number) => {
    if (mark >= 90) return 'A+';
    if (mark >= 80) return 'A';
    if (mark >= 70) return 'B+';
    if (mark >= 60) return 'B';
    if (mark >= 50) return 'C+';
    if (mark >= 40) return 'C';
    if (mark >= 35) return 'D';
    return 'NG';
  };

  const results = useMemo(() => {
    const points = Object.values(marks).map(m => getGradePoint(m));
    const totalPoints = points.reduce((a, b) => a + b, 0 as number);
    const gpa = totalPoints / SUBJECTS.length;
    
    let overallGrade = 'NG';
    if (gpa >= 3.6) overallGrade = 'A+';
    else if (gpa >= 3.2) overallGrade = 'A';
    else if (gpa >= 2.8) overallGrade = 'B+';
    else if (gpa >= 2.4) overallGrade = 'B';
    else if (gpa >= 2.0) overallGrade = 'C+';
    else if (gpa >= 1.6) overallGrade = 'C';
    else if (gpa >= 1.2) overallGrade = 'D';

    const hasNG = Object.values(marks).some(m => m < 35);

    return { 
      gpa: hasNG ? 0 : gpa, 
      overallGrade: hasNG ? 'NG' : overallGrade,
      hasNG 
    };
  }, [marks]);

  return (
    <CalculatorErrorBoundary calculatorName="SEE GPA">
      <CalculatorLayout
        title="SEE GPA Calculator"
        description="Check your Secondary Education Examination (SEE) results GPA. Based on the latest grading system of Nepal."
        badge="Education"
        badgeColor="indigo"
        category={{ label: 'Education', href: '/calculator/category/education' }}
        leftPanel={
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUBJECTS.map((subject) => (
                <div key={subject} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">{subject}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${marks[subject] < 35 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {getGrade(marks[subject])}
                        </span>
                    </div>
                    <input 
                        type="number"
                        value={marks[subject]}
                        onChange={(e) => setMarks(prev => ({ ...prev, [subject]: Number(e.target.value) }))}
                        className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-500"
                        min={0}
                        max={100}
                    />
                </div>
              ))}
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
              <div className="p-10 border-b border-slate-50">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-2">Cumulative GPA</div>
                 <div className="text-7xl font-black text-slate-900 tracking-tighter">
                   {results.gpa.toFixed(2)}
                 </div>
                 {results.hasNG && (
                    <div className="mt-2 text-red-500 text-[10px] font-bold uppercase">Non-Graded Detected</div>
                 )}
              </div>
              <div className="p-8 bg-indigo-50/50">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-2">Overall Grade</div>
                 <div className="text-4xl font-black text-slate-900 uppercase">
                   {results.overallGrade}
                 </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-3xl text-white">
               <div className="flex items-center gap-3 text-blue-400 mb-4">
                 <GraduationCap className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Grading Scale</h4>
               </div>
               <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                  <div className="flex justify-between border-r border-slate-800 pr-4"><span>90 - 100</span> <span className="font-bold">A+ (4.0)</span></div>
                  <div className="flex justify-between pl-4"><span>80 - 89</span> <span className="font-bold">A (3.6)</span></div>
                  <div className="flex justify-between border-r border-slate-800 pr-4"><span>70 - 79</span> <span className="font-bold">B+ (3.2)</span></div>
                  <div className="flex justify-between pl-4"><span>60 - 69</span> <span className="font-bold">B (2.8)</span></div>
                  <div className="flex justify-between border-r border-slate-800 pr-4"><span>50 - 59</span> <span className="font-bold">C+ (2.4)</span></div>
                  <div className="flex justify-between pl-4"><span>40 - 49</span> <span className="font-bold">C (2.0)</span></div>
                  <div className="flex justify-between border-r border-slate-800 pr-4"><span>35 - 39</span> <span className="font-bold">D (1.6)</span></div>
                  <div className="flex justify-between pl-4"><span>Below 35</span> <span className="font-bold text-red-400">NG (0)</span></div>
               </div>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
