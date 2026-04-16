'use client';
import { useMemo, useEffect, useState } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { Calendar, Gift, Star, Clock, Heart, Activity, Info } from 'lucide-react';

const DEFAULT_STATE = { 
  dob: '1995-06-15', 
  targetDate: '' 
};

function getZodiac(d: number, m: number) {
  const cutoffs = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const signs = ['Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn'];
  let idx = m;
  if (d < cutoffs[m]) idx--;
  if (idx < 0) idx = 11;
  return signs[idx];
}

export default function AgeCalculator() {
  const [state, setState] = useSyncState('age_v3', DEFAULT_STATE);
  const { dob, targetDate } = state;

  useEffect(() => {
    if (!targetDate) {
      setState({ ...state, targetDate: new Date().toISOString().split('T')[0] });
    }
  }, []);

  const update = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const a = useMemo(() => {
    if (!dob || !targetDate) return null;
    const d1 = new Date(dob), d2 = new Date(targetDate);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    
    if (d1.getTime() > d2.getTime()) {
      return { error: 'Your birth date cannot be in the future of the target date.' };
    }

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();
    if (days < 0) { months--; days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const diffMs   = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.floor(diffMs / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    let nextBday = new Date(d2.getFullYear(), d1.getMonth(), d1.getDate());
    if (nextBday <= d2) nextBday = new Date(d2.getFullYear() + 1, d1.getMonth(), d1.getDate());
    const nextBdayDays = Math.ceil((nextBday.getTime() - d2.getTime()) / 86400000);
    const dayOfWeek   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d1.getDay()];
    const zodiac      = getZodiac(d1.getDate(), d1.getMonth());

    return { years, months, days, totalDays, totalWeeks, totalMonths, nextBdayDays, dayOfWeek, zodiac };
  }, [dob, targetDate]);

  return (
    <CalculatorLayout
      title="Age & Life Stats"
      description="Calculate your exact age and discover fascinating insights about your journey through time."
      category={{ label: 'Utilities', href: '/calculator/category/utility' }}
      badge="Precision"
      badgeColor="blue"
      leftPanel={
        <div className="space-y-8">
          <div className="space-y-4 p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm transition-all hover:border-blue-100">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Date of Birth</label>
              <div className="relative group">
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                <input type="date" value={dob} onChange={e => update({ dob: e.target.value })}
                  className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-3xl font-black text-lg text-slate-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all outline-none" />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Target Age Date</label>
              <div className="relative group">
                <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                <input type="date" value={targetDate} onChange={e => update({ targetDate: e.target.value })}
                  className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-3xl font-black text-lg text-slate-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all outline-none" />
              </div>
            </div>
          </div>

          {a && !a.error && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total Days', value: a.totalDays?.toLocaleString(), icon: <Activity className="w-3 h-3" /> },
                { label: 'Total Weeks', value: a.totalWeeks?.toLocaleString(), icon: <Clock className="w-3 h-3" /> },
                { label: 'Total Months', value: a.totalMonths?.toLocaleString(), icon: <Calendar className="w-3 h-3" /> },
              ].map(s => (
                <div key={s.label} className="p-5 bg-white border border-slate-100 rounded-3xl text-center group hover:bg-slate-50 transition-colors">
                  <div className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest flex items-center justify-center gap-1">
                    {s.icon} {s.label}
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono tracking-tight">{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {a && !a.error && (
            <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-blue-500/20">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Heart className="w-32 h-32" />
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none">Life Statistics</span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="space-y-1">
                       <p className="text-[10px] uppercase font-bold text-slate-500">Zodiac Sign</p>
                       <p className="text-xl font-black text-blue-400">{a.zodiac}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] uppercase font-bold text-slate-500">Birth Day</p>
                       <p className="text-xl font-black text-white">{a.dayOfWeek}</p>
                    </div>
                 </div>
                 <div className="space-y-1 border-l border-white/10 pl-8">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Estimated Heartbeats</p>
                    <p className="text-2xl font-black text-rose-500 font-mono">
                      {((a.totalDays || 0) * 24 * 60 * 80).toLocaleString()}
                    </p>
                    <p className="text-[9px] text-slate-600 font-medium italic">Average 80 BPM</p>
                 </div>
              </div>
            </div>
          )}
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          {a && a.error ? (
            <div className="p-10 bg-amber-50 border-2 border-dashed border-amber-200 rounded-[2.5rem] text-center space-y-3">
               <Info className="w-8 h-8 text-amber-500 mx-auto" />
               <p className="text-sm font-bold text-amber-700">{a.error}</p>
            </div>
          ) : a ? (
            <>
              <div className="p-12 bg-white border border-slate-100 rounded-[3rem] text-center shadow-2xl shadow-blue-500/5 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                   <div className="text-[8px] font-black tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Lived Time</div>
                </div>
                <div className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">Chronological Age</div>
                <div className="text-8xl font-black text-slate-900 tracking-tighter mb-4 group-hover:scale-105 transition-transform font-mono">
                  {a.years}<span className="text-3xl font-black text-slate-300">Y</span>
                </div>
                <div className="text-2xl font-black text-blue-600 tracking-tight">
                  {a.months} Months <span className="text-slate-300">/</span> {a.days} Days
                </div>
              </div>

              <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center"><Gift className="w-5 h-5 text-white" /></div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-100">Next Celebration</h4>
                </div>
                <div className="text-5xl font-black mb-2 font-mono tracking-tighter">{a.nextBdayDays} <span className="text-xl text-blue-200">Days</span></div>
                <div className="text-[11px] text-blue-200 font-bold uppercase tracking-widest">Until Your Next Birthday</div>

                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Century Progress</span>
                    <span className="text-xl font-black text-white">{Math.min(100, ((a.years || 0) / 80) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-3 bg-blue-900/50 w-full rounded-full overflow-hidden p-1 shadow-inner">
                    <div className="h-full bg-white rounded-full transition-all duration-1000 shadow-md"
                      style={{ width: `${Math.min(100, ((a.years || 0) / 80) * 100)}%` }} />
                  </div>
                  <p className="text-[9px] text-blue-200/60 text-center font-bold tracking-widest">ESTIMATED AS PORTION OF 80 YEARS</p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'How is leap year accounted for?', answer: 'The calculator uses a high-precision day-of-month check. If you were born on Feb 29, it calculates based on completion of the year regardless of whether the target year is a leap year.' },
          { question: 'What does "Total Months" show?', answer: 'It represents the total number of full monthly cycles since birth, which is different from a simple days/30 calculation.' },
          { question: 'Can I calculate age for historical dates?', answer: 'Yes, as long as the dates are within the Gregorian calendar range (post-1582), historical accuracy is maintained.' },
        ]} />
      }
    />
  );
}
