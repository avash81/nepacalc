'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, Clock, ShieldCheck, Printer, Copy, Share2, RefreshCcw, Download } from 'lucide-react';

const CALC_MODES = [
  "Days Between Dates",
  "Years Months Days",
  "Business Days",
  "Working Days",
  "Age Calculator",
  "Employment Duration",
  "Project Duration",
  "Subscription Duration",
  "Pregnancy Due Date",
  "Countdown"
];

const USE_CASES = [
  { label: 'Employment', startOffset: -365, endOffset: 0 },
  { label: 'Vacation Planning', startOffset: 14, endOffset: 28 },
  { label: 'Visa Duration', startOffset: 0, endOffset: 90 },
  { label: 'Passport Validity', startOffset: 0, endOffset: 3650 },
  { label: 'Probation Period', startOffset: -90, endOffset: 0 },
  { label: 'Construction Timeline', startOffset: 0, endOffset: 180 },
  { label: 'Project Timeline', startOffset: 0, endOffset: 120 },
  { label: 'School Duration', startOffset: -200, endOffset: 0 },
  { label: 'University Duration', startOffset: -1460, endOffset: 0 },
  { label: 'Marriage Anniversary', startOffset: -3650, endOffset: 0 },
  { label: 'Retirement Planning', startOffset: 0, endOffset: 3650 },
];

export default function DateDuration() {
  const [start, setStart] = useState('2025-01-01');
  const [end, setEnd]     = useState('2025-12-31');
  const [includeEnd, setIncludeEnd] = useState(false);
  const [mode, setMode] = useState(CALC_MODES[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check URL params for shared links
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const s = urlParams.get('start');
      const e = urlParams.get('end');
      const m = urlParams.get('mode');
      if (s) setStart(s);
      if (e) setEnd(e);
      if (m && CALC_MODES.includes(m)) setMode(m);
    }
  }, []);

  const getIsoWeekNumber = (d: Date) => {
    const date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  const getDayOfYear = (d: Date) => {
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = (d.getTime() - start.getTime()) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
    return Math.floor(diff / 86400000);
  };

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const diff = useMemo(() => {
    if (!mounted) return null;
    const d1 = new Date(start), d2 = new Date(end);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    
    let isReversed = d1 > d2;
    const startObj = new Date(isReversed ? end : start);
    const endObj = new Date(isReversed ? start : end);
    if (includeEnd) endObj.setDate(endObj.getDate() + 1);

    let ms = endObj.getTime() - startObj.getTime();
    const totalDays = Math.floor(ms / 86400000);
    
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

    let workingDays = 0;
    let weekendDays = 0;
    let leapDays = 0;

    for (let d = startObj.getTime(); d < endObj.getTime(); d += 86400000) {
      const date = new Date(d);
      const day = date.getDay();
      if (day === 0 || day === 6) weekendDays++;
      else workingDays++;

      if (date.getMonth() === 1 && date.getDate() === 29) {
        leapDays++;
      }
    }

    return { 
      totalDays,
      years, months, days,
      weeks: Math.floor(totalDays / 7),
      remainingDays: totalDays % 7,
      hours: totalDays * 24,
      minutes: totalDays * 1440,
      seconds: totalDays * 86400,
      workingDays,
      weekendDays,
      leapDays,
      calendarWeeks: (totalDays / 7).toFixed(2),
      fiscalWeeks: (workingDays / 5).toFixed(2),
      workingWeeks: Math.floor(workingDays / 5),
      pctOfYear: ((totalDays / (isLeapYear(startObj.getFullYear()) ? 366 : 365)) * 100).toFixed(2),
      quarter: Math.floor(startObj.getMonth() / 3) + 1,
      fiscalQuarter: Math.floor(((startObj.getMonth() + 6) % 12) / 3) + 1,
      isoWeek: getIsoWeekNumber(startObj),
      dayOfYear: getDayOfYear(startObj),
      businessWeeks: (workingDays / 5).toFixed(2),
      breakdown: `${years}Y ${months}M ${days}D`,
      isReversed
    };
  }, [start, end, includeEnd, mounted]);

  const applyPreset = (preset: string) => {
    const today = new Date();
    let s = new Date();
    let e = new Date();

    switch(preset) {
      case 'Today':
        break;
      case 'Yesterday':
        s.setDate(today.getDate() - 1);
        e.setDate(today.getDate() - 1);
        break;
      case 'Last 7 Days':
        s.setDate(today.getDate() - 7);
        break;
      case 'Last 30 Days':
        s.setDate(today.getDate() - 30);
        break;
      case 'Current Month':
        s = new Date(today.getFullYear(), today.getMonth(), 1);
        e = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'Previous Month':
        s = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        e = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'Current Year':
        s = new Date(today.getFullYear(), 0, 1);
        e = new Date(today.getFullYear(), 11, 31);
        break;
      case 'Previous Year':
        s = new Date(today.getFullYear() - 1, 0, 1);
        e = new Date(today.getFullYear() - 1, 11, 31);
        break;
      case 'Current Fiscal Year': // Assuming Mid-July start
        s = new Date(today.getFullYear() - (today.getMonth() < 6 ? 1 : 0), 6, 16);
        e = new Date(today.getFullYear() + (today.getMonth() < 6 ? 0 : 1), 6, 15);
        break;
      case 'Previous Fiscal Year':
        s = new Date(today.getFullYear() - (today.getMonth() < 6 ? 2 : 1), 6, 16);
        e = new Date(today.getFullYear() - (today.getMonth() < 6 ? 1 : 0), 6, 15);
        break;
    }

    setStart(s.toISOString().split('T')[0]);
    setEnd(e.toISOString().split('T')[0]);
  };

  const applyUseCase = (offsetStart: number, offsetEnd: number) => {
    const today = new Date();
    const s = new Date(today);
    s.setDate(today.getDate() + offsetStart);
    const e = new Date(today);
    e.setDate(today.getDate() + offsetEnd);
    setStart(s.toISOString().split('T')[0]);
    setEnd(e.toISOString().split('T')[0]);
  };

  const copyResult = () => {
    if(!diff) return;
    const text = `Duration: ${diff.totalDays} Days (${diff.breakdown})\nStart: ${start}\nEnd: ${end}`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const copyUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('start', start);
    url.searchParams.set('end', end);
    url.searchParams.set('mode', mode);
    navigator.clipboard.writeText(url.toString());
    alert('URL copied to clipboard');
  };

  const printResult = () => {
    window.print();
  };

  return (
    <ModernCalcLayout
      slug="date-duration"
      crumbs={[{ label: 'Calculators', href: '/calculators/' }, { label: 'Date Duration Calculator' }]}
      title="Date Duration Calculator"
      description="Calculate the exact duration between two dates. Comprehensive Date & Time toolkit for days between dates, working days, age, and employment duration."
      icon={Calendar}
      inputs={
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4 border-b border-[#DADCE0] pb-4">
            <select value={mode} onChange={(e) => setMode(e.target.value)} className="bg-white border border-[#DADCE0] rounded-md px-3 py-2 text-sm font-bold outline-none focus:border-[#1A73E8]">
              {CALC_MODES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Current Month', 'Previous Month', 'Current Year', 'Previous Year', 'Current Fiscal Year', 'Previous Fiscal Year'].map(preset => (
              <button key={preset} onClick={() => applyPreset(preset)} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#5F6368] hover:text-[#1A73E8] border border-[#DADCE0] rounded-full transition-colors">
                {preset}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#70757A]">{mode === 'Age Calculator' ? 'Date of Birth' : 'Anchor Date (Start)'}</label>
                <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all cursor-pointer" />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#70757A]">{mode === 'Countdown' ? 'Target Date' : 'Target Date (End)'}</label>
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
        </div>
      }
      results={
        <div className="space-y-6 printable-result">
          {diff ? (
            <>
              {/* Rich Result Panel */}
              <div className="bg-[#1A73E8] text-white rounded-t-xl p-4 text-center">
                 <h3 className="text-xs font-black uppercase tracking-widest opacity-80">Duration Summary</h3>
              </div>
              <div className="border border-t-0 border-[#DADCE0] rounded-b-xl overflow-hidden bg-white shadow-sm">
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#F8F9FA] border-b border-[#DADCE0]">
                   <div className="text-center">
                     <div className="text-2xl font-black text-[#202124]">{diff.totalDays.toLocaleString()}</div>
                     <div className="text-[10px] font-bold uppercase text-[#70757A]">Total Days</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-black text-[#202124]">{diff.weeks}</div>
                     <div className="text-[10px] font-bold uppercase text-[#70757A]">Weeks</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-black text-[#202124]">{diff.months}</div>
                     <div className="text-[10px] font-bold uppercase text-[#70757A]">Months</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-black text-[#202124]">{diff.years}</div>
                     <div className="text-[10px] font-bold uppercase text-[#70757A]">Years</div>
                   </div>
                </div>
                
                <div className="p-6 text-center border-b border-[#DADCE0]">
                  <div className="text-3xl md:text-4xl font-black text-[#1A73E8] uppercase tracking-tighter">
                    {diff.breakdown}
                  </div>
                </div>

                <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#70757A] mb-1">Hours</span>
                    <span className="font-bold text-[#202124]">{diff.hours.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#70757A] mb-1">Minutes</span>
                    <span className="font-bold text-[#202124]">{diff.minutes.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#70757A] mb-1">Seconds</span>
                    <span className="font-bold text-[#202124]">{diff.seconds.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#70757A] mb-1">Business Days</span>
                    <span className="font-bold text-[#10b981]">{diff.workingDays.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#70757A] mb-1">Weekend Days</span>
                    <span className="font-bold text-[#f59e0b]">{diff.weekendDays.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#70757A] mb-1">Leap Days</span>
                    <span className="font-bold text-[#6366f1]">{diff.leapDays}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#70757A] mb-1">Calendar Weeks</span>
                    <span className="font-bold text-[#202124]">{diff.calendarWeeks}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#70757A] mb-1">Fiscal Weeks</span>
                    <span className="font-bold text-[#202124]">{diff.fiscalWeeks}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#70757A] mb-1">Working Weeks</span>
                    <span className="font-bold text-[#202124]">{diff.workingWeeks}</span>
                  </div>
                </div>
              </div>

              {/* Visual Timeline */}
              <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                 <h4 className="text-[11px] font-black uppercase text-[#202124] mb-4">Duration Progress</h4>
                 <div className="relative pt-6 pb-2">
                    <div className="flex justify-between text-xs font-bold text-[#70757A] mb-2">
                      <span>Start: {start}</span>
                      <span className="text-[#1A73E8]">{diff.totalDays} Days</span>
                      <span>End: {end}</span>
                    </div>
                    <div className="w-full h-3 bg-[#E8F0FE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1A73E8] rounded-full" style={{ width: '100%' }}></div>
                    </div>
                 </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                 <button onClick={copyResult} className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#202124] py-3 rounded-lg font-bold text-sm transition-colors">
                    <Copy className="w-4 h-4" /> Copy Result
                 </button>
                 <button onClick={printResult} className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#202124] py-3 rounded-lg font-bold text-sm transition-colors">
                    <Printer className="w-4 h-4" /> Print / PDF
                 </button>
                 <button onClick={copyUrl} className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#202124] py-3 rounded-lg font-bold text-sm transition-colors">
                    <Share2 className="w-4 h-4" /> Share Link
                 </button>
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
        <div className="space-y-12">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm space-y-10">

            {/* Real Use Cases */}
            <section id="use-cases">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-6">Real Use Cases & Examples</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {USE_CASES.map(uc => (
                  <button key={uc.label} onClick={() => applyUseCase(uc.startOffset, uc.endOffset)} className="text-left p-3 bg-[#F8F9FA] hover:bg-[#E8F0FE] border border-[#DADCE0] rounded-lg transition-colors group">
                    <h3 className="text-xs font-bold text-[#202124] group-hover:text-[#1A73E8]">{uc.label}</h3>
                  </button>
                ))}
              </div>
            </section>


            {/* Common Uses of Date Duration Calculator */}
            <section id="common-uses">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Common Uses of Date Duration Calculator</h2>
              <div className="grid md:grid-cols-2 gap-4 text-[#5F6368] text-sm">
                <div className="space-y-2">
                  <p><strong className="text-[#202124]">HR & Payroll:</strong> Calculate exact employment duration, probation periods, and precise salary cutoffs for partial months.</p>
                  <p><strong className="text-[#202124]">Construction & Project Management:</strong> Measure project timelines, lead times, and elapsed contract days excluding weekends.</p>
                  <p><strong className="text-[#202124]">Legal Contracts:</strong> Ensure compliance with statutory periods for notices, visa validity, and passport renewals.</p>
                </div>
                <div className="space-y-2">
                  <p><strong className="text-[#202124]">Education:</strong> Calculate school term durations, university semesters, and exact ages for admission eligibility.</p>
                  <p><strong className="text-[#202124]">Events & Travel:</strong> Countdown to major life events, marriage anniversaries, travel itineraries, and insurance coverage periods.</p>
                </div>
              </div>
            </section>

            
            {/* AI Quick Answer */}
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-lg p-5">
              <h2 className="font-bold text-[#1A73E8] mb-2 text-lg">Quick Answer</h2>
              <p className="text-[#202124] text-base leading-relaxed">
                A Date Duration Calculator calculates the exact duration between two calendar dates in years, months, weeks, and days. It uses Gregorian calendar rules while automatically accounting for leap years and varying month lengths to provide accurate calendar-based results.
              </p>
            </div>

            {/* Section 1: Why Use a Date Difference & Elapsed Time Calculator? */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Why Use a Date Difference & Elapsed Time Calculator?</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                A Date Duration Calculator makes it easy to calculate the exact time between two dates without manually counting calendar days. It instantly determines the duration in years, months, weeks, and days, while automatically accounting for leap years and different month lengths.
              </p>
              <p className="text-[#5F6368] text-base leading-relaxed">
                Whether you're determining your exact age with an <a href="/calculator/age-calculator/" className="text-[#1A73E8] underline hover:no-underline">Age Calculator</a>, measuring employment duration, or checking contract periods, this tool provides fast and accurate results in seconds. You can also use it alongside other tools for complete date and time planning.
              </p>
            </section>

            {/* Section 2: Key Features */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#5F6368] text-base">
                <li className="flex items-start gap-2">
                  <span className="text-[#1A73E8] font-bold">✓</span>
                  Calculate the exact number of days between two dates
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1A73E8] font-bold">✓</span>
                  View results in years, months, weeks, and days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1A73E8] font-bold">✓</span>
                  Automatic leap year adjustment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1A73E8] font-bold">✓</span>
                  Accurate calendar-based calculations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1A73E8] font-bold">✓</span>
                  Supports long and short date ranges
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1A73E8] font-bold">✓</span>
                  Works for personal, educational, financial, and business calculations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1A73E8] font-bold">✓</span>
                  Free online with instant results
                </li>
              </ul>
            </section>

            {/* Section 2.5: Date Duration Calculator vs Manual Counting */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Date Duration Calculator vs Manual Counting</h2>
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg">
                <table className="w-full text-left text-sm text-[#202124]">
                  <thead className="bg-[#F8F9FA] text-[#5F6368] uppercase">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Feature</th>
                      <th className="px-6 py-3 font-semibold border-l border-[#DADCE0] text-center">NepaCalc</th>
                      <th className="px-6 py-3 font-semibold border-l border-[#DADCE0] text-center">Manual Calculation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#DADCE0]">
                      <td className="px-6 py-4 font-medium">Days Between Dates</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg">✅</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg opacity-50">❌</td>
                    </tr>
                    <tr className="border-t border-[#DADCE0] bg-[#F8F9FA]">
                      <td className="px-6 py-4 font-medium">Years & Months</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg">✅</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg opacity-50">❌</td>
                    </tr>
                    <tr className="border-t border-[#DADCE0]">
                      <td className="px-6 py-4 font-medium">Leap Year Support</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg">✅</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg opacity-50">❌</td>
                    </tr>
                    <tr className="border-t border-[#DADCE0] bg-[#F8F9FA]">
                      <td className="px-6 py-4 font-medium">Instant Results</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg">✅</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg opacity-50">❌</td>
                    </tr>
                    <tr className="border-t border-[#DADCE0]">
                      <td className="px-6 py-4 font-medium">Free</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg">✅</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] text-center text-lg opacity-50">❌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: How to Calculate Days Between Dates */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">How to Calculate Days Between Dates</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-6">Using the calculator is simple:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs">1</span>
                    Select the Start Date
                  </h3>
                  <p className="text-sm text-[#5F6368]">Choose the beginning of the period you want to measure.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs">2</span>
                    Select the End Date
                  </h3>
                  <p className="text-sm text-[#5F6368]">Choose the final date for the calculation.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs">3</span>
                    Click Calculate
                  </h3>
                  <p className="text-sm text-[#5F6368]">The calculator instantly compares both dates using the Gregorian calendar.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs">4</span>
                    View Your Results
                  </h3>
                  <p className="text-sm text-[#5F6368]">You'll receive a complete breakdown in years, months, weeks, and days.</p>
                </div>
              </div>
            </section>

            {/* Section: How Date Duration Is Calculated */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">How Date Duration Is Calculated</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                The Date Duration Calculator determines the exact difference between two calendar dates using the Gregorian calendar, the internationally accepted civil calendar used in most countries. Rather than estimating months or using fixed averages, it calculates the actual number of calendar days, completed years, completed months, and remaining days between the selected dates.
              </p>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">Every calculation automatically accounts for:</p>
              <ul className="list-disc pl-5 space-y-1 text-[#5F6368] text-base mb-6">
                <li>Leap years</li>
                <li>Different calendar month lengths</li>
                <li>Calendar year transitions</li>
                <li>Actual calendar days in each time interval</li>
                <li>Date range accuracy</li>
              </ul>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                Unlike manual counting, the calculator follows real Gregorian calendar rules to produce an accurate date difference and elapsed time for any selected time interval. The basic calculation can be expressed as:
              </p>
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-5 text-center mb-4">
                <p className="font-bold text-[#202124] text-lg font-mono">Total Days = End Date &minus; Start Date</p>
              </div>
              <p className="text-[#5F6368] text-base leading-relaxed">
                The calculator then converts the total duration into years, months, weeks, and days for easier interpretation. This approach provides reliable results for age calculations, employment tenure, project planning with a Time Calculator, contract periods, subscription tracking, and other situations where precise calendar calculations are important.
              </p>
            </section>

            {/* Section 4: Understanding Your Results */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Understanding Your Results</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-6">
                The Date Duration Calculator provides more than just a total day count. Depending on the selected dates, your results may include:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-1">Years</h3>
                  <p className="text-sm text-[#5F6368]">The total number of completed calendar years.</p>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-1">Months</h3>
                  <p className="text-sm text-[#5F6368]">Remaining full calendar months after complete years.</p>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-1">Weeks</h3>
                  <p className="text-sm text-[#5F6368]">Additional weeks where applicable.</p>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-1">Days</h3>
                  <p className="text-sm text-[#5F6368]">Remaining individual days after years and months have been calculated.</p>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-4 md:col-span-2 bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-1">Total Days</h3>
                  <p className="text-sm text-[#5F6368]">The complete number of calendar days between the selected dates.</p>
                </div>
              </div>

              <div className="bg-[#E8F0FE] rounded-lg p-4 text-[#202124] text-sm font-medium">
                <p className="mb-2">Because the calculator uses actual calendar dates, every result automatically accounts for:</p>
                <ul className="list-disc pl-5 space-y-1 text-[#5F6368] font-normal mb-4">
                  <li>Leap years</li>
                  <li>Different month lengths</li>
                  <li>Calendar transitions</li>
                  <li>Accurate day counting</li>
                </ul>
                <div className="border-t border-[#DADCE0] pt-4 mt-2">
                  <p className="font-bold mb-1">Example Result Explanation:</p>
                  <p className="text-[#5F6368] font-normal">If the calculator shows <strong>4 years, 3 months, 12 days</strong>, this means four complete calendar years have passed, followed by three complete months, and twelve additional days.</p>
                </div>
              </div>
            </section>

            {/* Section 4: How to Read Your Results */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">How to Read Your Results</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-6">
                After calculating the duration between two dates, you'll receive a clear breakdown of the elapsed time. For example:
              </p>
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-6 max-w-md mx-auto">
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-[#DADCE0] pb-2">
                    <span className="font-semibold text-[#5F6368]">Start Date</span>
                    <span className="text-[#202124]">1 January 2020</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DADCE0] pb-2">
                    <span className="font-semibold text-[#5F6368]">End Date</span>
                    <span className="text-[#202124]">15 April 2025</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="font-bold text-[#1967D2]">Result</span>
                    <div className="text-right">
                      <div className="font-bold text-[#202124] text-lg">5 Years</div>
                      <div className="font-bold text-[#202124] text-lg">3 Months</div>
                      <div className="font-bold text-[#202124] text-lg">14 Days</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[#5F6368] text-base leading-relaxed mt-4 italic text-center">
                This represents five complete calendar years, followed by three complete months and fourteen additional days between the selected dates.
              </p>
            </section>

            {/* Section 5: Common Uses */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Common Uses</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-6">A Date Duration Calculator can be used for many everyday situations.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Calculate Age</h3>
                  <p className="text-sm text-[#5F6368]">Calculate your exact age in years, months, and days for official documents or personal milestones.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Employment Duration</h3>
                  <p className="text-sm text-[#5F6368]">Calculate years of service between joining and leaving dates to determine employee benefits and tenure.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Project Planning</h3>
                  <p className="text-sm text-[#5F6368]">Track project timelines, sprint durations, and completion periods accurately without manual counting.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Contract Duration</h3>
                  <p className="text-sm text-[#5F6368]">Measure service agreements, warranties, rental contracts, and subscriptions with calendar-accurate results.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Education</h3>
                  <p className="text-sm text-[#5F6368]">Calculate semesters, academic years, and internships for student scheduling and academic planning.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg md:col-span-1">
                  <h3 className="font-bold text-[#202124] mb-2">Travel Planning</h3>
                  <p className="text-sm text-[#5F6368]">Measure vacation length or trip duration to manage itineraries and visa stays.</p>
                </div>
              </div>
            </section>

            {/* Section 6: Example Calculations */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Example Calculations</h2>
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg">
                <table className="w-full text-left text-sm text-[#202124]">
                  <thead className="bg-[#F8F9FA] text-[#5F6368] uppercase">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Start Date</th>
                      <th className="px-6 py-3 font-semibold border-l border-[#DADCE0]">End Date</th>
                      <th className="px-6 py-3 font-semibold border-l border-[#DADCE0]">Example Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#DADCE0]">
                      <td className="px-6 py-4">1 January 2020</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0]">1 January 2025</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] font-bold text-[#1A73E8]">5 Years</td>
                    </tr>
                    <tr className="border-t border-[#DADCE0] bg-[#F8F9FA]">
                      <td className="px-6 py-4">15 March 2022</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0]">20 June 2026</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] font-bold text-[#1A73E8]">4 Years, 3 Months, 5 Days</td>
                    </tr>
                    <tr className="border-t border-[#DADCE0]">
                      <td className="px-6 py-4">10 May 2026</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0]">25 May 2026</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] font-bold text-[#1A73E8]">15 Days</td>
                    </tr>
                    <tr className="border-t border-[#DADCE0] bg-[#F8F9FA]">
                      <td className="px-6 py-4">1 July 2025</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0]">1 July 2026</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] font-bold text-[#1A73E8]">1 Year</td>
                    </tr>
                    <tr className="border-t border-[#DADCE0]">
                      <td className="px-6 py-4">28 February 2024</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0]">1 March 2024</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] font-bold text-[#1A73E8]">2 Days (Leap Year)</td>
                    </tr>
                    <tr className="border-t border-[#DADCE0] bg-[#F8F9FA]">
                      <td className="px-6 py-4">31 December 2025</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0]">1 January 2026</td>
                      <td className="px-6 py-4 border-l border-[#DADCE0] font-bold text-[#1A73E8]">1 Day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[#5F6368] text-sm mt-4 italic">
                These examples demonstrate how the calculator automatically measures different calendar durations without manual calculations.
              </p>
            </section>

            {/* Section: Inclusive vs Exclusive Date Counting */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Inclusive vs Exclusive Date Counting</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-6">
                When calculating the duration between two dates, there are two common counting methods.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-[#DADCE0] rounded-lg p-5">
                  <h3 className="font-bold text-[#202124] mb-3">Exclusive Counting</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
                    Exclusive counting measures the elapsed time between the selected dates without counting the starting date itself. This is the most common method used for general date difference calculations and project timelines.
                  </p>
                  <div className="bg-[#F8F9FA] rounded-lg p-3 text-sm">
                    <p className="text-[#5F6368]"><span className="font-semibold text-[#202124]">Start:</span> 1 January &nbsp;|&nbsp; <span className="font-semibold text-[#202124]">End:</span> 2 January</p>
                    <p className="font-bold text-[#1A73E8] mt-1">Exclusive Result: 1 day</p>
                  </div>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-5">
                  <h3 className="font-bold text-[#202124] mb-3">Inclusive Counting</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
                    Inclusive counting counts both the starting date and the ending date, adding one extra day to the final total. This method is commonly used for legal agreements, employment service periods, government calculations, tenancy agreements, and certain financial or contractual situations.
                  </p>
                  <div className="bg-[#F8F9FA] rounded-lg p-3 text-sm">
                    <p className="text-[#5F6368]"><span className="font-semibold text-[#202124]">Start:</span> 1 January &nbsp;|&nbsp; <span className="font-semibold text-[#202124]">End:</span> 2 January</p>
                    <p className="font-bold text-[#1A73E8] mt-1">Inclusive Result: 2 days</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#5F6368] italic">Always choose the counting method that matches your specific legal, contractual, or business requirements. For calculating only working days, you can use a dedicated Working Days Calculator to exclude weekends from this total.</p>
            </section>

            {/* Section: Why Accurate Date Calculations Matter */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Why Accurate Date Calculations Matter</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                Accurate date calculations are important in both personal and professional situations. Even a one-day difference can affect legal documents, employment benefits, financial calculations, and project deadlines. A Date Duration Calculator helps eliminate manual counting errors by automatically considering leap years, different calendar month lengths, and actual Gregorian calendar rules.
              </p>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">Common situations where accurate date calculations are essential include:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#5F6368] list-disc pl-5 mb-6">
                <li>Employment tenure and work experience</li>
                <li>Payroll and HR records</li>
                <li>Gratuity and severance calculations</li>
                <li>Contract periods and service agreements</li>
                <li>Insurance coverage periods</li>
                <li>Academic schedules and internships</li>
                <li>Project timelines and milestone tracking</li>
                <li>Subscription renewals</li>
                <li>Travel planning</li>
                <li>Government forms and legal documentation</li>
              </ul>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#202124] mb-1">Employment and HR</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">In Nepal, the Labor Act 2074 requires employers to calculate the exact duration of employment to determine gratuity entitlement, severance pay, and leave encashment. Even a single day&apos;s error can result in underpayment or legal disputes. Always verify the final amount based on actual dates.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#202124] mb-1">Government Forms and Official Documents</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">Citizenship applications, passport renewals, and government tender submissions require precise date information. Age eligibility for programs such as pension schemes and citizenship is determined by exact date differences, not rounded estimates.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#202124] mb-1">Contracts and Legal Agreements</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">Construction contracts, lease agreements, and service contracts specify completion deadlines and penalty clauses in exact days. An inaccurate date count can result in unnecessary penalty payments or missed contractual rights.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#202124] mb-1">Insurance and Finance</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">Insurance policy durations, premium due dates, and loan tenure periods require exact date calculations. Missing a deadline by one day could invalidate coverage or increase interest payments. For loans, consider verifying terms with a <a href="/calculator/simple-interest/" className="text-[#1A73E8] underline hover:no-underline">Simple Interest Calculator</a>.</p>
                </div>
              </div>
              <p className="text-[#5F6368] text-base leading-relaxed mt-4">Using an accurate calculator saves time while ensuring reliable calendar-based results.</p>
            </section>

            {/* Section: Related Calculators */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Related Calculators</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-6">You may also find these calculators useful:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Age Calculator', href: '/calculator/age-calculator/' },
                  { label: 'Calendar Calculator', href: '/converter/calendar/' },
                  { label: 'Date Calculator', href: '/calculator/date/' },
                  { label: 'Time Calculator', href: '/calculator/time-calculator/' },
                  { label: 'Percentage Calculator', href: '/calculator/percentage/' },
                  { label: 'GPA Calculator', href: '/calculator/gpa/' },
                  { label: 'SEE GPA Calculator', href: '/calculator/see-gpa/' },
                  { label: 'Simple Interest Calculator', href: '/calculator/simple-interest/' },
                  { label: 'Compound Interest Calculator', href: '/calculator/compound-interest/' },
                  { label: 'Mortgage Calculator', href: '/calculator/mortgage/' },
                ].map(tool => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block border border-[#DADCE0] rounded-lg px-4 py-3 text-sm font-medium text-[#1A73E8] hover:bg-[#E8F0FE] hover:border-[#1A73E8] transition-all text-center"
                  >
                    {tool.label}
                  </a>
                ))}
              </div>
            </section>

            {/* Section 8: Why Choose Our Date Duration Calculator? */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Why Choose Our Date Duration Calculator?</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                Our calculator is designed to provide fast, accurate, and reliable date calculations for both personal and professional use.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#5F6368] text-base">
                <li>Calendar-accurate calculations</li>
                <li>Automatic leap year handling</li>
                <li>Instant results</li>
                <li>Works on desktop and mobile devices</li>
                <li>Free with unlimited calculations</li>
                <li>No registration required</li>
                <li>Easy-to-read results in years, months, weeks, and days</li>
              </ul>
            </section>

            {/* Section 9: Frequently Asked Questions */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">What is a Date Duration Calculator?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">A Date Duration Calculator is an online tool that calculates the exact time between two dates. It automatically determines the duration in years, months, weeks, and days while accounting for leap years and different month lengths. This makes it faster and more accurate than manually counting calendar days.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How do I calculate the duration between two dates?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Select a start date and an end date, then click Calculate. The calculator instantly compares both dates and displays the total duration, including years, months, weeks, days, and the overall number of days between the selected dates.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How are days between two dates calculated?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">The calculator subtracts the start date from the end date using the Gregorian calendar while automatically accounting for leap years, varying calendar month lengths, calendar transitions, and actual calendar days. This provides an accurate date difference without manual counting.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Does the calculator include leap years?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes. The calculator automatically includes leap years whenever they fall within the selected date range. This ensures the duration remains accurate even when February has 29 days.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Can I calculate years, months, and days between two dates?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes. Besides showing the total number of days, the calculator provides a complete breakdown into years, months, and remaining days, making it useful for age calculations, employment history, and project timelines.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Can I calculate my exact age?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes. Simply enter your date of birth as the start date and today's date (or any chosen date) as the end date. The calculator will display your exact age in years, months, and days.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">What is the difference between inclusive and exclusive date counting?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Exclusive counting measures the elapsed time between two dates without counting the starting date. Inclusive counting counts both the start date and the end date, adding one extra day to the final total. Different situations may require different counting methods.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Can I calculate business days between two dates?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">This calculator focuses on calendar duration. If your calculator includes a business-day option, it can calculate working days by excluding weekends and, where applicable, public holidays.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">What is a Date Difference Calculator?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">A Date Difference Calculator is another name for a Date Duration Calculator. Both tools calculate the exact difference between two dates and display the result in days, months, years, or a combination of these units.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Is the Date Duration Calculator free?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes. The calculator is completely free to use and works online without requiring registration or software installation. You can calculate unlimited date durations instantly from any device.</p>
                </div>
              
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How do I calculate days between two dates?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Select the start and end dates and click calculate. The tool automatically counts the exact days between them.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How do I include the end date?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Check the 'Inclusive Audit' box to add 1 day to the total count, ensuring the end date is included in the duration.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Does this calculator include leap years?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, leap years are automatically detected and included in the calendar calculations.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How do I calculate working days?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Select 'Working Days' from the mode dropdown to automatically exclude weekends from the total days count.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How do I calculate business days?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Business days are calculated identically to working days, by automatically excluding Saturdays and Sundays from the duration.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Can I calculate age?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, select 'Age Calculator' mode, enter your date of birth as the start date, and today's date as the end date.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How do I calculate employment duration?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Select 'Employment Duration' mode, enter your joining date and the end date, and the calculator will provide your exact tenure.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Can I calculate months instead of days?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, the comprehensive summary always displays the total equivalent months as well as the standard year/month/day breakdown.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Does this calculator handle leap years automatically?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, the engine accurately accounts for Gregorian calendar rules, including February 29th during leap years.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Can I print or download the result?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, use the 'Print / PDF' button beneath the results to save or print a formatted summary.</p>
                </div>
</div>
            </section>

            {/* Did You Know? */}
            <div className="bg-[#FFF8E1] border border-[#F2C94C] rounded-lg p-5">
              <h2 className="font-bold text-[#F2994A] mb-2 text-lg">Did You Know?</h2>
              <p className="text-[#202124] text-base leading-relaxed">
                The Gregorian calendar contains 365 days in a standard year and 366 days in a leap year, which occurs every four years except for century years that are not divisible by 400. Accurate date duration calculations automatically account for these rules.
              </p>
            </div>

            {/* Last Updated */}
            <div className="pt-8 border-t border-[#DADCE0] text-[#5F6368] text-sm text-center">
              Last Updated: July 2026
            </div>
          </div>
        </div>
      }
      
      sidebar={{
        title: 'Date & Time Tools',
        subtitle: 'Time Utilities',
        links: [
          { label: 'Age Calculator', href: '/calculator/age-calculator/', icon: Calendar },
          { label: 'Nepali Date Converter', href: '/calculator/nepali-date/', icon: Calendar },
          { label: 'Pregnancy Due Date', href: '/calculator/pregnancy-due-date/', icon: Calendar },
          { label: 'Lok Sewa Age', href: '/calculator/lok-sewa-age/', icon: Clock },
          { label: 'Citizenship Age', href: '/calculator/nepal-citizenship-age/', icon: Clock }
        ],
      }}
    />
  );
}
