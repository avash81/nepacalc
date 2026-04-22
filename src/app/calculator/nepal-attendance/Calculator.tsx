'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { GraduationCap, CheckCircle2, XCircle, AlertCircle, BookOpen, Info } from 'lucide-react';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';

export default function NepalAttendanceCalculator() {
  const [state, setState] = useSyncState('nepal_att_v2', {
    totalClasses: 100,
    attended: 72,
    required: 75
  });

  const { totalClasses, attended, required } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const results = useMemo(() => {
    const percentage = totalClasses > 0 ? (attended / totalClasses) * 100 : 0;
    const requiredClasses = Math.ceil((required / 100) * totalClasses);
    const shortage = Math.max(0, requiredClasses - attended);
    const isEligible = percentage >= required;

    // How many more can they miss?
    // If currently eligible: max_absent = floor(attended / (required/100)) - totalClasses
    // Simpler: they need (attended / total >= req/100)
    // Max total they can have: attended / (req/100) => total where they are exactly at threshold
    const maxTotalAllowed = Math.floor(attended / (required / 100));
    const canMissMore = Math.max(0, maxTotalAllowed - totalClasses);

    // Classes to attend to become eligible (if short)
    let classesToAttend = 0;
    if (!isEligible) {
      // Need to find x such that (attended + x) / (totalClasses + x) >= req/100
      // attended + x >= req/100 * (totalClasses + x)
      // attended + x >= req*totalClasses/100 + req*x/100
      // x - req*x/100 >= req*totalClasses/100 - attended
      // x(1 - req/100) >= req*totalClasses/100 - attended
      // x >= (req*totalClasses/100 - attended) / (1 - req/100)
      const numerator = (required * totalClasses / 100) - attended;
      const denominator = 1 - (required / 100);
      classesToAttend = Math.ceil(numerator / denominator);
    }

    return { percentage, isEligible, shortage, requiredClasses, canMissMore, classesToAttend };
  }, [totalClasses, attended, required]);

  const faqs = [
    { 
      question: "What is the minimum attendance requirement for TU/PU?", 
      answer: "Under Tribhuvan University (TU) and Pokhara University (PU) regulations, students must maintain a minimum of 75% attendance to be eligible for end-semester examinations." 
    },
    { 
      question: "Does the 75% rule apply to practicals?", 
      answer: "Yes, the 75% rule applies separately to both Theory and Practical classes. High attendance in one cannot compensate for a shortage in the other." 
    },
    { 
      question: "Can I get a grace (condonation) for low attendance?", 
      answer: "The Faculty Dean may grant condonation for up to a 5% shortage in extreme cases like illness, but this requires a formal application and is not a guaranteed right." 
    }
  ];

  return (
    <CalculatorLayout
      title="TU/PU Attendance Tracker"
      description="Calculate your university attendance percentage and eligibility for exams. Based on the mandatory 75% minimum for Tribhuvan University (TU) and Pokhara University (PU)."
      category={{ label: 'Nepal Specific', href: '/calculator/category/nepal' }}
      faqs={faqs}
      leftPanel={
        <div className="space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput
                label="Total Classes Held"
                value={totalClasses}
                onChange={v => update({ totalClasses: v })}
                hint="All lectures in the semester"
              />
              <ValidatedInput
                label="Classes Attended"
                value={attended}
                onChange={v => update({ attended: v })}
                hint="Classes you were present for"
                error={attended > totalClasses ? 'Cannot exceed total classes' : undefined}
              />
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Required Minimum (%)</label>
              <div className="flex p-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-2xl">
                 {[60, 75, 80].map(r => (
                    <button
                      key={r}
                      onClick={() => update({ required: r })}
                      className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${required === r ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {r}%
                    </button>
                 ))}
              </div>
              <p className="text-[10px] text-slate-400 font-medium italic px-1">TU/PU standard is 75%. Some colleges require 80%.</p>
           </div>

           <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-3">
              <div className="flex items-center gap-3">
                 <BookOpen className="w-5 h-5 text-indigo-400" />
                 <h3 className="text-[10px] font-black uppercase tracking-widest">University Rule</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                "Under Tribhuvan University's Academic Calendar, students must maintain a minimum of **75%** attendance in both theory and practical classes to be eligible for the end-semester examination."
              </p>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard
            label="Current Attendance"
            value={results.percentage.toFixed(1)}
            unit="%"
            color={results.isEligible ? 'indigo' : 'rose'}
            title="Semester Standing"
            copyValue={`Attendance: ${results.percentage.toFixed(1)}%`}
          />

          <div className={`rounded-[2.5rem] overflow-hidden border shadow-sm ${results.isEligible ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}>
             <div className={`p-6 flex items-center gap-4 ${results.isEligible ? 'bg-emerald-600' : 'bg-rose-600'} text-white`}>
                {results.isEligible
                  ? <CheckCircle2 className="w-8 h-8" />
                  : <XCircle className="w-8 h-8" />
                }
                <div>
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Eligibility Status</div>
                   <div className="text-2xl font-black">{results.isEligible ? 'ELIGIBLE ✓' : 'NOT ELIGIBLE ✗'}</div>
                </div>
             </div>
             <div className="p-6 divide-y divide-slate-100 space-y-0">
                <div className="py-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-slate-600 uppercase">Required Classes</span>
                   <span className="text-sm font-black text-slate-900 font-mono">{results.requiredClasses} / {totalClasses}</span>
                </div>
                {results.isEligible ? (
                  <div className="py-4 flex justify-between items-center">
                     <span className="text-[11px] font-bold text-emerald-700 uppercase">You Can Still Miss</span>
                     <span className="text-xl font-black text-emerald-600 font-mono">{results.canMissMore} classes</span>
                  </div>
                ) : (
                  <div className="py-4 flex justify-between items-center">
                     <span className="text-[11px] font-bold text-rose-700 uppercase">Must Attend Consecutively</span>
                     <span className="text-xl font-black text-rose-600 font-mono">{results.classesToAttend} classes</span>
                  </div>
                )}
             </div>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
             <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Condonation Warning</h5>
                <p className="text-[11px] text-amber-700 font-medium leading-relaxed italic">
                   "Condonation (grace) may be granted for 5% shortage by the Faculty Dean, but it requires a formal application and is not guaranteed."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={<div className="mt-8"><CalcFAQ faqs={faqs} /></div>}
    />
  );
}
