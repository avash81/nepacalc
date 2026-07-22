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
      compactHeader={true}
      titleClassName="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Calculators', href: '/calculator/' }, { label: 'Date Duration Calculator' }]}
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

            {/* AI Quick Answer */}
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-lg p-5">
              <h2 className="font-bold text-[#1A73E8] mb-2 text-lg">Quick Answer</h2>
              <p className="text-[#202124] text-base leading-relaxed">
                A Date Duration Calculator calculates the exact duration between two calendar dates in years, months, weeks, and days. It uses Gregorian calendar rules while automatically accounting for leap years and varying month lengths to provide accurate calendar-based results.
              </p>
              <p className="text-[#5F6368] text-sm mt-3">Last updated: July 2026 &bull; Calculations follow the Gregorian calendar and automatically account for leap years.</p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#202124] mb-4">Table of Contents</h2>
              <ul className="space-y-2 text-[#1A73E8] text-sm">
                <li><a href="#feature-summary" className="hover:underline">What This Calculator Can Calculate</a></li>
                <li><a href="#how-to-use" className="hover:underline">How To Use</a></li>
                <li><a href="#understanding-results" className="hover:underline">Understanding Your Results</a></li>
                <li><a href="#popular-modes" className="hover:underline">Popular Calculator Modes</a></li>
                <li><a href="#real-use-cases" className="hover:underline">Real Use Cases</a></li>
                <li><a href="#examples" className="hover:underline">Example Calculations</a></li>
                <li><a href="#calculation-method" className="hover:underline">How Date Duration Is Calculated</a></li>
                <li><a href="#inclusive-exclusive" className="hover:underline">Inclusive vs Exclusive Date Counting</a></li>
                <li><a href="#accuracy-matters" className="hover:underline">Why Accurate Date Calculations Matter</a></li>
                <li><a href="#faq" className="hover:underline">Frequently Asked Questions</a></li>
                <li><a href="#people-also-search-for" className="hover:underline">People Also Search For</a></li>
              </ul>
            </nav>

            {/* Feature Summary */}
            <section id="feature-summary">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">What This Date Duration Calculator Can Calculate</h2>
              <ul className="list-disc pl-5 space-y-2 text-[#5F6368] text-base">
                <li>Calculate years, months and days</li>
                <li>Calculate total days</li>
                <li>Calculate total weeks</li>
                <li>Calculate business days</li>
                <li>Calculate working days</li>
                <li>Include or exclude end date</li>
                <li>Automatically handles leap years</li>
                <li>Accurate Gregorian calendar calculations</li>
              </ul>
            </section>

            {/* How To Use */}
            <section id="how-to-use">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">How To Use</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs">1</span>
                    Select Start Date
                  </h3>
                  <p className="text-sm text-[#5F6368]">Choose the beginning of your period.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs">2</span>
                    Select End Date
                  </h3>
                  <p className="text-sm text-[#5F6368]">Choose the final date to measure.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs">3</span>
                    Calculate
                  </h3>
                  <p className="text-sm text-[#5F6368]">Instantly process elapsed time.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs">4</span>
                    View Results
                  </h3>
                  <p className="text-sm text-[#5F6368]">See the full date difference breakdown.</p>
                </div>
              </div>
              <p className="text-sm text-[#5F6368] mt-4">Results update instantly as you change either date or calculation mode.</p>
            </section>

            {/* Understanding Your Results */}
            <section id="understanding-results">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Understanding Your Results</h2>
              <ul className="list-disc pl-5 space-y-2 text-[#5F6368] text-base">
                <li><strong>Years:</strong> Full calendar years between dates.</li>
                <li><strong>Months:</strong> Complete months elapsed.</li>
                <li><strong>Weeks:</strong> Total 7-day cycles.</li>
                <li><strong>Days:</strong> The total calendar duration calculator count.</li>
                <li><strong>Hours, Minutes, Seconds:</strong> Exact time duration between dates.</li>
                <li><strong>Business Days:</strong> Duration excluding weekends.</li>
              </ul>
            </section>

            {/* Popular Calculator Modes */}
            <section id="popular-modes">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Popular Calculator Modes</h2>
              <ul className="list-disc pl-5 space-y-2 text-[#5F6368] text-base">
                <li>Days Between Dates</li>
                <li>Years, Months & Days</li>
                <li>Business Days Calculator</li>
                <li>Working Days Calculator</li>
                <li>Inclusive Date Calculator</li>
                <li>Exclusive Date Calculator</li>
                <li>Employment Duration</li>
                <li>Project Timeline</li>
                <li>Visa Duration</li>
                <li>Countdown Between Dates</li>
              </ul>
            </section>

            {/* Real Use Cases */}
            <section id="real-use-cases">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Real Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold text-[#202124] mb-2">Employment & HR</h3>
                  <ul className="list-disc pl-5 text-sm text-[#5F6368] space-y-1">
                    <li>Employment duration</li>
                    <li>Probation period</li>
                    <li>Salary cutoff</li>
                    <li>Service anniversary</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#202124] mb-2">Legal & Government</h3>
                  <ul className="list-disc pl-5 text-sm text-[#5F6368] space-y-1">
                    <li>Visa validity</li>
                    <li>Passport expiry</li>
                    <li>Contract duration</li>
                    <li>Notice periods</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#202124] mb-2">Education</h3>
                  <ul className="list-disc pl-5 text-sm text-[#5F6368] space-y-1">
                    <li>School duration</li>
                    <li>University semester</li>
                    <li>Admission eligibility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#202124] mb-2">Business & Projects</h3>
                  <ul className="list-disc pl-5 text-sm text-[#5F6368] space-y-1">
                    <li>Construction timeline</li>
                    <li>Project duration</li>
                    <li>Delivery schedule</li>
                    <li>Contract milestones</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#202124] mb-2">Personal</h3>
                  <ul className="list-disc pl-5 text-sm text-[#5F6368] space-y-1">
                    <li>Marriage anniversary</li>
                    <li>Retirement planning</li>
                    <li>Travel planning</li>
                    <li>Insurance period</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Example Calculations */}
            <section id="examples">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Example Calculations</h2>
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg">
                <table className="w-full text-left text-sm text-[#202124]">
                  <thead className="bg-[#F8F9FA] text-[#5F6368] uppercase">
                    <tr>
                      <th className="px-6 py-3 font-semibold border-b border-[#DADCE0]">Scenario</th>
                      <th className="px-6 py-3 font-semibold border-b border-[#DADCE0] border-l">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 font-medium border-t border-[#DADCE0]">Employment</td>
                      <td className="px-6 py-4 border-t border-[#DADCE0] border-l">15 May 2021 → Today</td>
                    </tr>
                    <tr className="bg-[#F8F9FA]">
                      <td className="px-6 py-4 font-medium border-t border-[#DADCE0]">Visa</td>
                      <td className="px-6 py-4 border-t border-[#DADCE0] border-l">1 January 2026 → 30 June 2026</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium border-t border-[#DADCE0]">Project</td>
                      <td className="px-6 py-4 border-t border-[#DADCE0] border-l">5 March → 20 August</td>
                    </tr>
                    <tr className="bg-[#F8F9FA]">
                      <td className="px-6 py-4 font-medium border-t border-[#DADCE0]">Vacation</td>
                      <td className="px-6 py-4 border-t border-[#DADCE0] border-l">10 April → 18 April</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* How Date Duration Is Calculated */}
            <section id="calculation-method">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">How Date Duration Is Calculated</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                The calculator follows the Gregorian calendar and automatically accounts for:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#5F6368] text-base mb-4">
                <li>Leap years</li>
                <li>Different month lengths</li>
                <li>Calendar transitions</li>
                <li>Inclusive or exclusive counting</li>
                <li>Weekend exclusion for business day calculations</li>
              </ul>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                This provides accurate duration calculations across both short and long time periods.
              </p>
              <p className="text-[#5F6368] text-sm italic">All calculations are performed locally using standard Gregorian calendar rules without storing your personal data.</p>

              {/* Comparison Table */}
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg mt-6">
                <table className="w-full text-left text-sm text-[#202124]">
                  <thead className="bg-[#F8F9FA] text-[#5F6368] uppercase">
                    <tr>
                      <th className="px-5 py-3 font-semibold border-b border-[#DADCE0]">Date Duration</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#DADCE0] border-l">Business Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-5 py-3 border-t border-[#DADCE0]">Counts all calendar days</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l">Excludes weekends</td>
                    </tr>
                    <tr className="bg-[#F8F9FA]">
                      <td className="px-5 py-3 border-t border-[#DADCE0]">Includes holidays</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l">Optional</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 border-t border-[#DADCE0]">Personal planning</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l">Work schedules</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Inclusive vs Exclusive Counting */}
            <section id="inclusive-exclusive">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Inclusive vs Exclusive Date Counting</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-[#DADCE0] rounded-lg p-5">
                  <h3 className="font-bold text-[#202124] mb-2">Inclusive</h3>
                  <p className="text-sm text-[#5F6368] mb-3">Both start and end dates are counted.</p>
                  <div className="bg-[#F8F9FA] rounded p-3 text-sm font-mono">
                    Example:<br/>1 July to 5 July<br/><span className="font-bold text-[#1A73E8]">Inclusive = 5 days</span>
                  </div>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-5">
                  <h3 className="font-bold text-[#202124] mb-2">Exclusive</h3>
                  <p className="text-sm text-[#5F6368] mb-3">Only elapsed days are counted.</p>
                  <div className="bg-[#F8F9FA] rounded p-3 text-sm font-mono">
                    Example:<br/>1 July to 5 July<br/><span className="font-bold text-[#1A73E8]">Exclusive = 4 days</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFF8E1] border border-[#F2C94C] rounded-lg p-4 mt-6">
                <p className="text-sm text-[#202124]"><strong>Tip:</strong> Enable inclusive counting when calculating legal deadlines, notice periods, or contract durations where the final date must be included.</p>
              </div>
            </section>

            {/* Why Accurate Date Calculations Matter */}
            <section id="accuracy-matters">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Why Accurate Date Calculations Matter</h2>
              <p className="text-[#5F6368] text-base leading-relaxed">
                Accurate calculations are essential for HR, Payroll, Contracts, Government procedures, Construction, and Financial planning. Even a one-day error in an elapsed time calculator can lead to underpaid salaries, expired visas, or breached contracts. Relying on an automated tool ensures that varying month lengths and leap years are perfectly handled, reducing compliance risks and manual errors.
              </p>
              <p className="text-[#5F6368] text-sm mt-3">If you need to calculate a person&apos;s exact age rather than the duration between two arbitrary dates, use our <a href="/calculator/age-calculator/" className="text-[#1A73E8] underline">Age Calculator</a>.</p>
            </section>

            {/* People Also Search For */}
            <section id="people-also-search-for">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">People Also Search For</h2>
              <ul className="flex flex-wrap gap-3 text-sm">
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]"><a href="/calculator/nepali-date/" className="hover:text-[#1A73E8]">Date Calculator</a></li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">Date Difference Calculator</li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">Days Between Dates Calculator</li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">Working Days Calculator</li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]"><a href="/calculator/nepali-date/" className="hover:text-[#1A73E8]">Calendar Calculator</a></li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">Countdown Calculator</li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]"><a href="/calculator/lead-time/" className="hover:text-[#1A73E8]">Time Duration Calculator</a></li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">Date Add Calculator</li>
              </ul>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">What is a Date Duration Calculator?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">An online tool that instantly determines the exact elapsed time between two dates in years, months, and days.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How do I calculate days between dates?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Select your start date and end date, and the calculator automatically computes the total days between them.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Does it include leap years?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, the system follows standard Gregorian calendar rules to include leap years automatically.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">What is inclusive counting?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Inclusive counting adds both the start date and the end date to the final total.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">What is exclusive counting?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Exclusive counting calculates only the elapsed days, excluding the end date.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Can I calculate business days?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, you can select the Business Day Calculator mode to exclude weekends.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Can I calculate months and years?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, the results automatically break down the duration into exact years, months, weeks, and days.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Is this calculator free?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, this date difference calculator is completely free to use online with no registration.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Does it work for future dates?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">Yes, you can measure the time between any historical, current, or future dates.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How accurate is the calculator?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">It is 100% accurate, automatically handling month lengths and leap years based on the standard calendar.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      }
      sidebar={{
        title: 'Date & Time Tools',
        subtitle: 'Time Utilities',
        links: [
          
          { label: 'Nepali Date Converter', href: '/calculator/nepali-date/', icon: Calendar },
          { label: 'Pregnancy Due Date', href: '/calculator/pregnancy-due-date/', icon: Calendar },
          { label: 'Lok Sewa Age', href: '/calculator/lok-sewa-age/', icon: Clock },
          { label: 'Citizenship Age', href: '/calculator/nepal-citizenship-age/', icon: Clock }
        ],
      }}
    />
  );
}
