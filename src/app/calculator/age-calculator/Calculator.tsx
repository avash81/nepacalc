'use client';
import { useMemo, useEffect, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, Clock, Activity, Target, Landmark, GraduationCap } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const DEFAULT_STATE = { dob: '1995-06-15', targetDate: '' };

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
    if (d1.getTime() > d2.getTime()) return { error: 'Invalid range' };

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();
    if (days < 0) { months--; days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalHours = Math.floor(Math.abs(d2.getTime() - d1.getTime()) / 3600000);
    const zodiac = getZodiac(d1.getDate(), d1.getMonth());
    return { years, months, days, totalHours, zodiac };
  }, [dob, targetDate]);

  const pieData = a && !('error' in a) ? [
    { name: 'Slept', value: a.totalHours * 0.33, fill: '#6366f1' },
    { name: 'Awake', value: a.totalHours * 0.67, fill: '#f59e0b' },
  ] : [];

  return (
    <ModernCalcLayout
      slug="age-calculator"
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Age Calculator' }]}
      title="Age Calculator"
      description="Professional age verification for official documentation."
      icon={Calendar}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[#70757A]">Birth Date</label>
                <input type="date" value={dob} onChange={e => update({ dob: e.target.value })} className="w-full h-12 px-4 border border-[#DADCE0] rounded-xl font-bold" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[#70757A]">Audit Date</label>
                <input type="date" value={targetDate} onChange={e => update({ targetDate: e.target.value })} className="w-full h-12 px-4 border border-[#DADCE0] rounded-xl font-bold" />
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {a && !a.error ? (
            <>
              <div className="p-10 bg-white border border-[#DADCE0] rounded-lg text-center shadow-sm">
                 <div className="text-7xl font-black text-[#1A73E8] tracking-tighter">{a.years}</div>
                 <div className="text-[10px] font-bold text-[#70757A] uppercase">{a.months} Months, {a.days} Days</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm h-[200px]">
                    <div className="text-[10px] font-black uppercase mb-4">Life Cycle</div>
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={55} dataKey="value" stroke="none">
                             {pieData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                          </Pie>
                       </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm text-center flex flex-col justify-center">
                    <div className="text-[9px] font-black text-slate-500 uppercase">Zodiac</div>
                    <div className="text-2xl font-black">{a.zodiac}</div>
                 </div>
              </div>
            </>
          ) : null}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Chronological Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                Verification of age for Lok Sewa, Citizenship, and Social Security Fund (SSF) documentation in Nepal.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Nepali Date", href: "/calculator/nepali-date/" },
        { label: "BMI Calculator", href: "/calculator/bmi/" }
      ]}
    />
  );
}
