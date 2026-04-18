'use client';

import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { GraduationCap, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function AttendanceCalculator() {
  const [state, setState] = useSyncState('attendance_v1', {
    attended: 45,
    total: 60,
    target: 75,
  });

  const { attended, total, target } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const currentPercent = (total > 0) ? (attended / total) * 100 : 0;
    const isEligible = currentPercent >= target;
    
    let advice = "";
    let diff = 0;

    if (isEligible) {
      // How many more can I miss?
      // target = attended / (total + x)
      // total + x = attended / (target/100)
      // x = (attended / (target/100)) - total
      diff = Math.floor((attended / (target / 100)) - total);
      advice = `Safe Zone: You can miss ${diff} more classes and still stay at ${target}%.`;
    } else {
      // How many more must I attend?
      // target = (attended + y) / (total + y)
      // target/100 * (total + y) = attended + y
      // (target/100 * total) + (target/100 * y) = attended + y
      // (target/100 * total) - attended = y - (target/100 * y)
      // (target/100 * total) - attended = y * (1 - target/100)
      // y = ((target/100 * total) - attended) / (1 - target/100)
      diff = Math.ceil(((target / 100 * total) - attended) / (1 - target / 100));
      advice = `Alert: You must attend the next ${diff} classes without fail to reach ${target}%.`;
    }

    return { currentPercent, isEligible, advice, diff };
  }, [attended, total, target]);

  return (
    <CalculatorLayout
      title="TU/PU Attendance Tracker"
      description="Calculate your exam eligibility for Tribhuvan University (TU), Pokhara University (PU), and NEB. Track exactly how many classes you can miss or must attend."
      category={{ label: 'Education', href: '/calculator/category/education' }}
      leftPanel={
        <div className="space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput 
                label="Classes Attended" 
                value={attended} 
                onChange={v => update({ attended: v })} 
                suffix="Classes"
                min={0}
                max={total}
              />
              <ValidatedInput 
                label="Total Classes Held" 
                value={total} 
                onChange={v => update({ total: v })} 
                suffix="Classes"
                min={1}
              />
           </div>

           <div className="pt-6 border-t border-[var(--border)]">
              <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest mb-4 block">Target Attendance Percentage</label>
              <div className="flex gap-4">
                 {[75, 80, 85].map(t => (
                    <button 
                      key={t}
                      onClick={() => update({ target: t })}
                      className={`flex-1 py-4 border-2 rounded-2xl font-black text-sm transition-all ${target === t ? 'border-primary bg-blue-50/50 text-blue-700 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-blue-100'}`}
                    >
                       {t}%
                    </button>
                 ))}
              </div>
           </div>

           <div className={`p-6 rounded-3xl border flex gap-4 ${result.isEligible ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
              {result.isEligible ? (
                 <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                 <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
              )}
              <div>
                 <div className={`text-sm font-black uppercase tracking-tight mb-1 ${result.isEligible ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {result.isEligible ? 'Eligibility Secured' : 'Eligibility Warning'}
                 </div>
                 <p className={`text-xs font-medium leading-relaxed ${result.isEligible ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {result.advice}
                 </p>
              </div>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Attendance Status" 
            value={result.currentPercent.toFixed(1)} 
            unit="%" 
            color={result.isEligible ? 'green' : 'red'} 
            title="Current Percent"
            copyValue={`My attendance is ${result.currentPercent.toFixed(1)}%`}
          />

          <div className="bg-slate-900 text-white rounded-[2rem] p-8 space-y-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <GraduationCap className="w-24 h-24" />
             </div>
             <div className="relative z-10">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Student Ledger</div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center pb-4 border-b border-white/10 text-[11px] font-bold">
                      <span className="text-slate-400">Target Required</span>
                      <span className="font-mono">{target}%</span>
                   </div>
                   <div className="flex justify-between items-center pb-4 border-b border-white/10 text-[11px] font-bold">
                      <span className="text-slate-400">Current Deficit</span>
                      <span className={`font-mono ${result.isEligible ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {Math.max(0, target - result.currentPercent).toFixed(1)}%
                      </span>
                   </div>
                   <div className="pt-2">
                       <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                          "Success in exams starts with presence in the classroom."
                       </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-8 italic">Attendance Policies in Nepal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                     <Info className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2">University Regulations</h4>
                    <p className="text-[12px] text-slate-600 leading-relaxed">Most engineering and medical programs under **Tribhuvan University (TU)** and **Pokhara University (PU)** strictly mandate **75% attendance** for students to be eligible to fill out external exam forms.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                     <Info className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2">Why 75%?</h4>
                    <p className="text-[12px] text-slate-600 leading-relaxed">The 75% rule ensures that students engage with the practical and theoretical components of the credit hours. Our calculator helps you manage this limit practically throughout the semester.</p>
                  </div>
               </div>
            </div>
         </div>
      }
    />
  );
}
