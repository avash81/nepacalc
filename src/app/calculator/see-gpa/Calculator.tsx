'use client';

import React, { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { BookOpen, GraduationCap, AlertCircle, Info, CheckCircle2, ShieldCheck, Activity, Globe } from 'lucide-react';

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
  const [state, setState] = useSyncState('see_v3', {
    subjectData: SUBJECTS.map(s => ({
      ...s,
      theory: 60,
      practical: 20
    }))
  });

  const { subjectData } = state;

  const getSubjectGrade = (theory: number, practical: number) => {
    // 2082 Rule: Must get 35% in Theory (26.25/75) 
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
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Education', href: '/education/' }, { label: 'SEE GPA Calculator' }]}
      title="SEE GPA Calculator"
      description="Calculate your Secondary Education Examination (SEE) GPA using the official Nepal Letter Grading Directive 2083 rules."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
           <div className="p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-md flex gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
              <p className="text-[10px] text-[#202124] font-bold leading-relaxed uppercase">
                 Institutional Rule (2082): Enter marks out of <strong>75 for Theory</strong> and <strong>25 for Practical</strong>. You must score at least <strong>26.25</strong> in Theory to pass.
              </p>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
              {results.detailedResults.map(s => (
                <div key={s.id} className="p-4 bg-white border border-[#DADCE0] rounded-lg shadow-sm space-y-4 hover:border-[#1A73E8] transition-colors">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#1A73E8]" />
                        <span className="text-[11px] font-black text-[#202124] uppercase tracking-wider">{s.name}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${s.pass ? 'bg-[#E6F4EA] border-[#188038] text-[#188038]' : 'bg-[#FCE8E6] border-[#D93025] text-[#D93025]'}`}>
                         Grade: {s.grade}
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Theory (Out of 75)</label>
                         <input 
                            type="number" 
                            value={s.theory} 
                            onChange={e => updateSubject(s.id, 'theory', Number(e.target.value))}
                            max={75}
                            min={0}
                            className={`w-full h-11 px-3 bg-[#F8F9FA] border rounded-md text-sm font-bold text-[#202124] outline-none transition-all ${s.theory < 26.25 ? 'border-[#D93025] focus:border-[#D93025]' : 'border-[#DADCE0] focus:border-[#1A73E8]'}`} 
                         />
                         {s.theory < 26.25 && <div className="text-[9px] text-[#D93025] font-bold">NG (Min 26.25)</div>}
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Practical (Out of 25)</label>
                         <input 
                            type="number" 
                            value={s.practical} 
                            onChange={e => updateSubject(s.id, 'practical', Number(e.target.value))}
                            max={25}
                            min={0}
                            className="w-full h-11 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
                         />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className={`rounded-lg p-10 text-center space-y-2 ${results.hasNG ? 'bg-[#FCE8E6]' : 'bg-[#E8F0FE]'}`}>
             <div className={`text-[10px] font-bold uppercase tracking-wider ${results.hasNG ? 'text-[#D93025]' : 'text-[#1A73E8]'}`}>Cumulative GPA</div>
             <div className={`text-5xl font-black tracking-tight ${results.hasNG ? 'text-[#D93025]' : 'text-[#1A73E8]'}`}>
                {results.gpa.toFixed(2)}
             </div>
             <div className="flex justify-center mt-2">
                <span className={`px-4 py-1.5 bg-white rounded-full text-[10px] font-black uppercase border shadow-sm ${results.hasNG ? 'text-[#D93025] border-[#FCE8E6]' : 'text-[#5F6368] border-[#DADCE0]'}`}>
                   SEE Final Score
                </span>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 space-y-4 shadow-sm relative overflow-hidden">
             <div className="absolute right-0 top-0 p-6 opacity-5 pointer-events-none">
                <GraduationCap className="w-24 h-24 text-[#1A73E8]" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                   <div className="text-[11px] font-black uppercase tracking-widest text-[#202124]">Official Report Digest</div>
                </div>
                <div className="bg-[#F8F9FA] p-6 rounded-md border border-[#DADCE0] text-center">
                   <div className={`text-6xl font-black mb-2 ${results.hasNG ? 'text-[#D93025]' : 'text-[#202124]'}`}>{results.overallGrade}</div>
                   <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Aggregate Final Grade</div>
                </div>
                {results.hasNG && (
                  <div className="p-4 bg-[#FCE8E6] border border-[#D93025] rounded-md flex gap-3 text-[#D93025]">
                     <AlertCircle className="w-5 h-5 shrink-0" />
                     <p className="text-[10px] font-bold leading-relaxed uppercase">NON-GRADED: You failed to secure 35% in one or more theory subjects. Grade boost exam is required.</p>
                  </div>
                )}
             </div>
          </div>

          <div className="p-4 bg-white border border-[#DADCE0] rounded-lg space-y-3 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-[#5F6368] border-b border-[#F1F3F4] pb-2">Grading Scale Reference</h3>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="flex justify-between p-2 bg-[#F8F9FA] rounded"><span>90-100%</span><span className="font-bold text-[#188038]">A+ (4.0)</span></div>
              <div className="flex justify-between p-2 bg-[#F8F9FA] rounded"><span>80-89%</span><span className="font-bold text-[#188038]">A (3.6)</span></div>
              <div className="flex justify-between p-2 bg-[#F8F9FA] rounded"><span>70-79%</span><span className="font-bold text-[#1A73E8]">B+ (3.2)</span></div>
              <div className="flex justify-between p-2 bg-[#F8F9FA] rounded"><span>60-69%</span><span className="font-bold text-[#1A73E8]">B (2.8)</span></div>
              <div className="flex justify-between p-2 bg-[#F8F9FA] rounded"><span>50-59%</span><span className="font-bold text-[#F29900]">C+ (2.4)</span></div>
              <div className="flex justify-between p-2 bg-[#F8F9FA] rounded"><span>40-49%</span><span className="font-bold text-[#F29900]">C (2.0)</span></div>
              <div className="flex justify-between p-2 bg-[#F8F9FA] rounded"><span>35-39%</span><span className="font-bold text-[#F29900]">D (1.6)</span></div>
              <div className="flex justify-between p-2 bg-[#FCE8E6] rounded text-[#D93025]"><span>Below 35%</span><span className="font-bold">NG (0)</span></div>
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Education Tools",
        subtitle: "Academic Planners",
        links: [
          { label: '+2 NEB GPA Calculator', href: '/calculator/gpa', icon: BookOpen },
          { label: 'Percentage Calculator', href: '/calculator/percentage/', icon: Activity },
          { label: "SEE Board Website", href: "https://see.gov.np", icon: Globe }
        ],
      }}
      customSchema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "NEPAL TELECOM :: SEE.NTC.NET.NP :: SEE Results 2083/2084",
        "url": "https://nepacalc.com/calculator/see-gpa/",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "description": "Official SEE Result GPA Calculator for 2083/2084. Check your SEE marksheet and convert grades to GPA instantly using NEB standards.",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "NPR"
        },
        "publisher": {
          "@type": "Organization",
          "name": "NepaCalc",
          "url": "https://nepacalc.com"
        }
      }}
      relatedTools={[
        { label: "+2 NEB GPA", href: "/calculator/gpa" },
        { label: "Percentage", href: "/calculator/percentage/" },
        { label: "Age Calculator", href: "/calculator/age-calculator/" }
      ]}
    />
  );
}

