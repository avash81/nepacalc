'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, Clock, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DateDuration() {
  const [start, setStart] = useState('2025-01-01');
  const [end, setEnd]     = useState('2025-12-31');
  const [includeEnd, setIncludeEnd] = useState(false);

  const diff = useMemo(() => {
    const d1 = new Date(start), d2 = new Date(end);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    let ms = Math.abs(d2.getTime() - d1.getTime());
    if (includeEnd) ms += 86400000;
    const totalDays = Math.floor(ms / 86400000);
    
    const startObj = new Date(start < end ? start : end);
    const endObj = new Date(start < end ? end : start);
    if (includeEnd) endObj.setDate(endObj.getDate() + 1);

    let years = endObj.getFullYear() - startObj.getFullYear();
    let months = endObj.getMonth() - startObj.getMonth();
    let days = endObj.getDate() - startObj.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(endObj.getFullYear(), endObj.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { 
      totalDays, 
      weeks: (totalDays / 7), 
      monthsTotal: (totalDays / 30.437), 
      yearsTotal: (totalDays / 365.25),
      breakdown: `${years}Y ${months}M ${days}D`,
      raw: { years, months, days },
      hours: totalDays * 24
    };
  }, [start, end, includeEnd]);

  const chartData = [
    { name: 'Years', val: parseFloat(diff?.yearsTotal.toFixed(2) || '0'), fill: '#6366f1' },
    { name: 'Months', val: parseFloat(diff?.monthsTotal.toFixed(1) || '0'), fill: '#3b82f6' },
    { name: 'Weeks', val: parseFloat(diff?.weeks.toFixed(1) || '0'), fill: '#10b981' },
    { name: 'Days', val: diff?.totalDays || 0, fill: '#f59e0b' },
  ];

  return (
    <ModernCalcLayout
      slug="date-duration"
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Date Duration' }]}
      title="Date Duration"
      description="Calculate exact days, weeks, and years between dates for labor law audits and project timelines."
      icon={Calendar}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#70757A]">Anchor Date (Start)</label>
                <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all cursor-pointer" />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#70757A]">Target Date (End)</label>
                <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all cursor-pointer" />
             </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg cursor-pointer" onClick={() => setIncludeEnd(!includeEnd)}>
             <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${includeEnd ? 'bg-[#1A73E8] border-[#1A73E8]' : 'border-[#DADCE0] bg-white'}`}>
                {includeEnd && <div className="w-2 h-2 bg-white rounded-full" />}
             </div>
             <div className="space-y-0.5">
                <p className="text-[11px] font-black uppercase text-[#202124]">Inclusive Audit</p>
                <p className="text-[9px] text-[#70757A] font-bold">Add 1 day to count the end date (Standard Legal Protocol)</p>
             </div>
          </div>

          <div className="p-4 border border-[#DADCE0] rounded-lg bg-[#E8F0FE] space-y-2">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8]">Legal Tenure Guard</h3>
             </div>
             <p className="text-[10px] text-[#202124] leading-relaxed font-bold">
                Nepali Labor Law 2074 requires precise tenure calculation for Gratuity and Severance.
             </p>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {diff ? (
            <>
              <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
                 <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Aggregate Temporal Span</div>
                 <div className="text-5xl font-black tracking-tighter text-[#1A73E8] uppercase">{diff.breakdown}</div>
                 <div className="text-[10px] font-bold text-[#70757A] uppercase tracking-tighter">
                    {diff.totalDays.toLocaleString()} Net Calendar Days
                 </div>
              </div>

              <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-6 border-l-4 border-[#1A73E8] pl-4">
                    <h4 className="text-[11px] font-black uppercase text-[#202124]">Temporal Distribution</h4>
                    <Clock className="w-4 h-4 text-[#70757A]" />
                 </div>
                 <div className="h-[180px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#70757A', fontSize: 9, fontWeight: 'bold' }} />
                          <Tooltip cursor={{ fill: '#F8F9FA' }} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '10px' }} />
                          <Bar dataKey="val" radius={[4, 4, 0, 0]} barSize={32}>
                             {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </>
          ) : (
            <div className="p-20 text-center opacity-20">
               <Calendar className="w-20 h-20 mx-auto mb-4" />
               <p className="text-xl font-black uppercase tracking-widest text-[#70757A]">Awaiting Input</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Temporal Tenure Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for precision time-span analysis. Calibrated for <strong>Gregorian</strong> and <strong>Labor Law</strong> standards.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Age Calculator", href: "/calculator/age-calculator/" },
        { label: "Add/Subtract Days", href: "/calculator/date-duration/" },
        { label: "Lead Time", href: "/calculator/lead-time/" }
      ]}
    />
  );
}

