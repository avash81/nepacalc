'use client';
import { useMemo, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, Gift, Star, Clock, Heart, Activity, Info, Target, Calculator } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

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
      return { error: 'Birth date cannot be in the future of the target date.' };
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

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Age Calculator' }]}
      title="Age & Life Stats"
      description="Calculate your exact age in years, months, and days. Discover your zodiac sign, birth day, and upcoming birthday countdown."
      icon={Calendar}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Date of Birth</label>
            <div className="relative">
              <input 
                type="date" 
                value={dob} 
                onChange={e => update({ dob: e.target.value })} 
                className={inputCls} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Age at the Date of</label>
            <div className="relative">
              <input 
                type="date" 
                value={targetDate} 
                onChange={e => update({ targetDate: e.target.value })} 
                className={inputCls} 
              />
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Age
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          {a && !a.error ? (
            <>
              <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Chronological Age</div>
                <div className="text-4xl font-black text-[#202124]">{a.years} Years</div>
                <div className="text-[11px] text-[#70757A] font-bold uppercase">{a.months} Months | {a.days} Days</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Next Birthday</div>
                   <div className="text-sm font-black text-[#1A73E8]">{a.nextBdayDays} Days</div>
                 </div>
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Birth Day</div>
                   <div className="text-sm font-black text-[#202124]">{a.dayOfWeek}</div>
                 </div>
              </div>

              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
                 <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA]">
                   <span className="text-[10px] font-bold text-[#70757A] uppercase">Fascinating Stats</span>
                 </div>
                 <div className="p-3 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#5F6368]">Zodiac Sign</span>
                      <span className="font-bold text-[#1A73E8]">{a.zodiac}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#5F6368]">Total Months Lived</span>
                      <span className="font-bold">{a.totalMonths?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#5F6368]">Total Weeks Lived</span>
                      <span className="font-bold">{a.totalWeeks?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#5F6368]">Total Days Lived</span>
                      <span className="font-bold">{a.totalDays?.toLocaleString()}</span>
                    </div>
                 </div>
              </div>

              <div className="flex gap-2 p-3 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg items-center">
                <Heart className="w-4 h-4 text-[#D93025] shrink-0" />
                <p className="text-[10px] text-[#202124] leading-tight">Estimated <strong>{((a.totalDays || 0) * 24 * 60 * 80).toLocaleString()}</strong> heartbeats during your journey so far.</p>
              </div>
            </>
          ) : a?.error ? (
            <div className="p-10 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg text-center opacity-70">
              <Info className="w-8 h-8 mx-auto mb-2 text-[#F29900]" />
              <p className="text-sm font-bold text-[#202124]">{a.error}</p>
            </div>
          ) : (
             <div className="text-center py-10 opacity-30">
                <Clock className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm">Enter dates to reveal your age stats</p>
             </div>
          )}
        </div>
      }
      howToUse={{
        steps: [
          "Select your Date of Birth using the calendar picker.",
          "Choose the 'Age at' date (defaults to today).",
          "Click 'Calculate Age' to see your detailed breakdown.",
          "Check out your life statistics, zodiac sign, and next birthday countdown below."
        ]
      }}
      formula={{
        title: "Age Calculation Method",
        description: "The age is calculated by comparing years, months, and days between the two dates, accounting for varying month lengths and leap years.",
        raw: "Age = Target Date - Date of Birth\nBreakdown: Years, Months, Weeks, Days, and even estimated Heartbeats."
      }}
      faqs={[
        {
          question: "How accurate is the heartrate estimation?",
          answer: "The heartrate is a statistical estimation based on an average resting heart rate of 80 beats per minute (BPM) over the total days lived."
        },
        {
          question: "Does this account for leap years?",
          answer: "Yes, our algorithm uses the JavaScript Date object which automatically handles leap years and different month lengths for 100% precision."
        }
      ]}
      sidebar={{
        title: "Useful Tools",
        links: [
          { label: "Nepali Date Converter", href: "/calculator/nepali-date" },
          { label: "Date Duration", href: "/calculator/date-duration" },
          { label: "Pregnancy Due Date", href: "/calculator/pregnancy-due-date" },
          { label: "Sleep Calculator", href: "/calculator/sleep" },
        ],
        banner: {
          title: "Cherish Every Moment",
          description: "Time is our most valuable asset. Use our life statistics to see just how much you've accomplished so far.",
          image: "/images/time-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Nepali Date", href: "/calculator/nepali-date" },
        { label: "Date Duration", href: "/calculator/date-duration" },
        { label: "Sleep Calculator", href: "/calculator/sleep" }
      ]}
    />
  );
}
