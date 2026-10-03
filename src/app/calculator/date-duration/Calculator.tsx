'use client';
import { useState, useMemo, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, Clock, Copy, Printer, Share2, ArrowLeftRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function DateDuration() {
  const today = () => new Date().toISOString().split('T')[0];

  const [start, setStart] = useState('2025-01-01');
  const [end, setEnd]     = useState('2025-12-31');
  const [includeEnd, setIncludeEnd] = useState(false);
  const [countBusiness, setCountBusiness] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('start')) setStart(p.get('start')!);
      if (p.get('end'))   setEnd(p.get('end')!);
    }
  }, []);

  const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

  const diff = useMemo(() => {
    if (!mounted) return null;
    const d1 = new Date(start), d2 = new Date(end);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const isReversed = d1 > d2;
    const s = new Date(isReversed ? end : start);
    const e = new Date(isReversed ? start : end);
    if (includeEnd) e.setDate(e.getDate() + 1);

    const totalDays  = Math.floor((e.getTime() - s.getTime()) / 86400000);

    let years = e.getFullYear() - s.getFullYear();
    let months = e.getMonth() - s.getMonth();
    let days  = e.getDate() - s.getDate();
    if (days < 0) { months--; days += new Date(e.getFullYear(), e.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    let businessDays = 0, weekendDays = 0, leapDays = 0;
    for (let d = s.getTime(); d < e.getTime(); d += 86400000) {
      const dt = new Date(d);
      const day = dt.getDay();
      if (day === 0 || day === 6) weekendDays++; else businessDays++;
      if (dt.getMonth() === 1 && dt.getDate() === 29) leapDays++;
    }

    return {
      totalDays, years, months, days,
      weeks: Math.floor(totalDays / 7),
      hours: totalDays * 24,
      minutes: totalDays * 1440,
      seconds: totalDays * 86400,
      businessDays, weekendDays, leapDays,
      breakdown: `${years > 0 ? years + ' year' + (years !== 1 ? 's' : '') + ', ' : ''}${months > 0 ? months + ' month' + (months !== 1 ? 's' : '') + ', ' : ''}${days} day${days !== 1 ? 's' : ''}`,
      isReversed
    };
  }, [start, end, includeEnd, mounted]);

  const swapDates = () => { setStart(end); setEnd(start); };
  const setStartToday = () => setStart(today());
  const setEndToday   = () => setEnd(today());
  const reset = () => { setStart('2025-01-01'); setEnd('2025-12-31'); setIncludeEnd(false); setCountBusiness(false); };

  const copyResult = () => {
    if (!diff) return;
    navigator.clipboard.writeText(`Duration: ${diff.totalDays} days (${diff.breakdown})\nStart: ${start}\nEnd: ${end}`);
    alert('Copied to clipboard');
  };
  const copyUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('start', start);
    url.searchParams.set('end', end);
    navigator.clipboard.writeText(url.toString());
    alert('URL copied');
  };

  return (
    <ModernCalcLayout
      slug="date-duration"
      compactHeader={true}
      titleClassName="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Calculators', href: '/calculator/' }, { label: 'Date Duration Calculator' }]}
      title="Date Duration Calculator – Days Between Dates"
      description="Calculate the exact duration between two dates in days, weeks, months and years."
      icon={Calendar}
      inputs={
        <div className="space-y-5">

          {/* Date Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase text-[#70757A]">Start Date</label>
              <div className="flex gap-2">
                <input
                  type="date" value={start}
                  onChange={e => setStart(e.target.value)}
                  className="flex-1 h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-base font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all"
                />
                <button onClick={setStartToday} className="px-3 py-2 text-[11px] font-bold bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] rounded-md hover:bg-[#1A73E8] hover:text-white transition-colors whitespace-nowrap">Today</button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase text-[#70757A]">End Date</label>
              <div className="flex gap-2">
                <input
                  type="date" value={end}
                  onChange={e => setEnd(e.target.value)}
                  className="flex-1 h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-base font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all"
                />
                <button onClick={setEndToday} className="px-3 py-2 text-[11px] font-bold bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] rounded-md hover:bg-[#1A73E8] hover:text-white transition-colors whitespace-nowrap">Today</button>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div
              className="flex-1 flex items-start gap-3 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg cursor-pointer select-none"
              onClick={() => setIncludeEnd(!includeEnd)}
              role="checkbox" aria-checked={includeEnd}
            >
              <div className={`mt-0.5 w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-all ${includeEnd ? 'bg-[#1A73E8] border-[#1A73E8]' : 'border-[#DADCE0] bg-white'}`}>
                {includeEnd && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div>
                <p className="text-[12px] font-black text-[#202124]">Include end date</p>
                <p className="text-[11px] text-[#70757A]">When enabled, both the start date and end date are counted.</p>
              </div>
            </div>
            <div
              className="flex-1 flex items-start gap-3 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg cursor-pointer select-none"
              onClick={() => setCountBusiness(!countBusiness)}
              role="checkbox" aria-checked={countBusiness}
            >
              <div className={`mt-0.5 w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-all ${countBusiness ? 'bg-[#1A73E8] border-[#1A73E8]' : 'border-[#DADCE0] bg-white'}`}>
                {countBusiness && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div>
                <p className="text-[12px] font-black text-[#202124]">Count business days</p>
                <p className="text-[11px] text-[#70757A]">Highlight the weekday-only count in results.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={swapDates}
              className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold bg-white border border-[#DADCE0] text-[#202124] rounded-md hover:bg-[#F8F9FA] transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" /> Swap dates
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold bg-white border border-[#DADCE0] text-[#202124] rounded-md hover:bg-[#F8F9FA] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
      }
      results={
        <div className="space-y-5 printable-result">
          {diff ? (
            <>
              {diff.isReversed && (
                <div className="bg-[#FFF8E1] border border-[#F2C94C] rounded-lg p-3 text-sm text-[#202124]">
                  Dates are reversed. Showing duration from the earlier date.
                </div>
              )}

              {/* Primary result */}
              <div className="bg-[#1A73E8] rounded-xl p-5 text-center text-white">
                <div className="text-4xl font-black tracking-tight">{diff.totalDays.toLocaleString()}</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80 mt-1">Total Calendar Days</div>
                <div className="text-base font-semibold mt-2 opacity-90">{diff.breakdown}</div>
                {includeEnd && (
                  <div className="text-[11px] mt-1.5 opacity-70">Inclusive counting (end date included)</div>
                )}
              </div>

              {/* Grid results */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Weeks', value: diff.weeks.toLocaleString() },
                  { label: 'Hours', value: diff.hours.toLocaleString() },
                  { label: 'Minutes', value: diff.minutes.toLocaleString() },
                  { label: 'Seconds', value: diff.seconds.toLocaleString() },
                  { label: 'Business Days', value: diff.businessDays.toLocaleString(), highlight: countBusiness, color: 'text-[#10b981]' },
                  { label: 'Weekend Days', value: diff.weekendDays.toLocaleString() },
                ].map(({ label, value, highlight, color }) => (
                  <div key={label} className={`bg-white border rounded-lg p-3 text-center ${highlight ? 'border-[#10b981]' : 'border-[#DADCE0]'}`}>
                    <div className={`text-lg font-black ${color || 'text-[#202124]'}`}>{value}</div>
                    <div className="text-[10px] font-bold uppercase text-[#70757A]">{label}</div>
                  </div>
                ))}
              </div>

              {/* Calculation Breakdown */}
              <div className="border border-[#DADCE0] rounded-lg overflow-hidden">
                <button
                  onClick={() => setBreakdownOpen(!breakdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F9FA] text-[12px] font-black uppercase text-[#202124] hover:bg-[#E8F0FE] transition-colors"
                >
                  Calculation Breakdown
                  <span className="text-[#1A73E8]">{breakdownOpen ? '▲' : '▼'}</span>
                </button>
                {breakdownOpen && (
                  <div className="px-4 py-3 text-sm text-[#5F6368] space-y-1.5 bg-white">
                    <p>The standard duration measures elapsed time from the start date up to, but not including, the end date.</p>
                    <p>When <strong>Include end date</strong> is enabled, one additional day is counted.</p>
                    <div className="mt-2 bg-[#F8F9FA] rounded p-3 font-mono text-xs space-y-1">
                      <div>Standard: {start} to {end} = {diff.totalDays - (includeEnd ? 1 : 0)} elapsed days</div>
                      {includeEnd && <div>Inclusive: {diff.totalDays} counted days</div>}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button onClick={copyResult} className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#202124] py-2.5 rounded-lg font-bold text-sm">
                  <Copy className="w-4 h-4" /> Copy
                </button>
                <button onClick={() => window.print()} className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#202124] py-2.5 rounded-lg font-bold text-sm">
                  <Printer className="w-4 h-4" /> Print / PDF
                </button>
                <button onClick={copyUrl} className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#202124] py-2.5 rounded-lg font-bold text-sm">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </>
          ) : (
            <div className="p-16 text-center opacity-20">
              <Calendar className="w-16 h-16 mx-auto mb-3" />
              <p className="text-lg font-black uppercase tracking-widest text-[#70757A]">Select dates above</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-10 items-start">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-7 shadow-sm space-y-9 min-w-0">

            {/* Direct Answer */}
            <section id="days-between-dates">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">How Many Days Are Between Two Dates?</h2>
              <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-lg p-4">
                <p className="text-[#202124] text-base leading-relaxed">
                  To calculate the number of days between two dates, subtract the start date from the end date. For example, July 1 to July 5 is 4 elapsed days. If you include both the start and end dates, the result is 5 days.
                </p>
              </div>
            </section>

            {/* What it calculates */}
            <section id="what-it-calculates">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">What Does This Date Duration Calculator Calculate?</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                This calculator finds the duration between two calendar dates and can show the result in days, weeks, months, years, hours, minutes and seconds. It can also count business days when that option is enabled.
              </p>
              <ul className="space-y-2 text-[#5F6368] text-base">
                <li><strong className="text-[#202124]">Days:</strong> Total calendar days between the dates.</li>
                <li><strong className="text-[#202124]">Weeks:</strong> Total duration expressed in 7-day periods.</li>
                <li><strong className="text-[#202124]">Months and years:</strong> Calendar-based duration between the two dates.</li>
                <li><strong className="text-[#202124]">Hours, minutes and seconds:</strong> The equivalent duration based on the calculated days.</li>
                <li><strong className="text-[#202124]">Business days:</strong> Weekdays only, with weekends excluded.</li>
              </ul>
            </section>

            {/* How to Use */}
            <section id="how-to-use">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">How to Use the Date Duration Calculator</h2>
              <ol className="space-y-2 text-[#5F6368] text-base list-decimal pl-5">
                <li>Select the <strong className="text-[#202124]">Start Date</strong>.</li>
                <li>Select the <strong className="text-[#202124]">End Date</strong>.</li>
                <li>Choose <strong className="text-[#202124]">Include end date</strong> if both dates should be counted.</li>
                <li>Enable <strong className="text-[#202124]">Count business days</strong> when you need a weekday-only count.</li>
                <li>Results appear instantly. Use <strong className="text-[#202124]">Swap dates</strong> to reverse the selected dates, or <strong className="text-[#202124]">Reset</strong> to restore defaults.</li>
              </ol>
            </section>

            {/* Inclusive vs Exclusive */}
            <section id="inclusive-exclusive">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">Inclusive vs. Exclusive Date Counting</h2>
              <p className="text-[#5F6368] text-base mb-3">
                The standard duration measures elapsed time from the start date to the end date. The end date is not counted as a separate full day.
              </p>
              <p className="text-[#5F6368] text-base mb-4">
                Inclusive counting includes both the start date and the end date.
              </p>
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg">
                <table className="w-full text-sm text-[#202124]">
                  <thead className="bg-[#F8F9FA] text-[#5F6368] uppercase text-[11px]">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold border-b border-[#DADCE0]">Dates</th>
                      <th className="px-4 py-3 text-right font-semibold border-b border-[#DADCE0] border-l">Standard</th>
                      <th className="px-4 py-3 text-right font-semibold border-b border-[#DADCE0] border-l">Inclusive</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 border-t border-[#DADCE0]">July 1 to July 5</td>
                      <td className="px-4 py-3 border-t border-[#DADCE0] border-l text-right font-mono">4 days</td>
                      <td className="px-4 py-3 border-t border-[#DADCE0] border-l text-right font-mono">5 days</td>
                    </tr>
                    <tr className="bg-[#F8F9FA]">
                      <td className="px-4 py-3 border-t border-[#DADCE0]">January 1 to January 1</td>
                      <td className="px-4 py-3 border-t border-[#DADCE0] border-l text-right font-mono">0 days</td>
                      <td className="px-4 py-3 border-t border-[#DADCE0] border-l text-right font-mono">1 day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Leap Years */}
            <section id="leap-years">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">Leap Years and Date Duration</h2>
              <p className="text-[#5F6368] text-base leading-relaxed">
                Date durations can cross leap years, which contain 366 days instead of 365. The calculator uses the actual calendar dates when determining the duration, so February 29 is included when it falls within the selected date range.
              </p>
            </section>

            {/* Business Days */}
            <section id="business-days">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">Calendar Days vs. Business Days</h2>
              <p className="text-[#5F6368] text-base leading-relaxed">
                Calendar days include every day in the date range. Business-day calculations count weekdays only and exclude Saturdays and Sundays. Public holidays are not excluded from the count, as holiday rules vary by country and region.
              </p>
            </section>

            {/* Examples */}
            <section id="examples">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">Date Duration Examples</h2>
              <div className="space-y-3">
                {[
                  { title: 'Same month', range: 'July 1, 2025 to July 5, 2025', lines: ['Standard: 4 days', 'Inclusive: 5 days'] },
                  { title: 'Full calendar year', range: 'January 1, 2025 to January 1, 2026', lines: ['Elapsed: 365 days'] },
                  { title: 'Leap year', range: 'January 1, 2024 to January 1, 2025', lines: ['Elapsed: 366 days (2024 is a leap year)'] },
                ].map(ex => (
                  <div key={ex.title} className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                    <p className="font-bold text-[#202124] text-sm mb-1">{ex.title}</p>
                    <p className="text-[#5F6368] text-sm font-mono mb-1">{ex.range}</p>
                    {ex.lines.map(l => <p key={l} className="text-[#1A73E8] text-sm font-mono">{l}</p>)}
                  </div>
                ))}
              </div>
            </section>

            {/* Excel */}
            <section id="excel">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">How to Calculate Days Between Dates in Excel</h2>
              <p className="text-[#5F6368] text-base mb-3">If the start date is in cell A2 and the end date is in B2:</p>
              <div className="space-y-2">
                {[
                  { label: 'Simple subtraction', code: '=B2-A2' },
                  { label: 'DAYS function', code: '=DAYS(B2,A2)' },
                  { label: 'DATEDIF function', code: '=DATEDIF(A2,B2,"d")' },
                  { label: 'Weekdays only', code: '=NETWORKDAYS(A2,B2)' },
                ].map(({ label, code }) => (
                  <div key={code} className="bg-[#F8F9FA] border border-[#DADCE0] rounded p-3 flex items-center gap-3">
                    <code className="font-mono text-sm text-[#1A73E8] font-bold">{code}</code>
                    <span className="text-[11px] text-[#70757A]">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Mistakes */}
            <section id="common-mistakes">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">Common Date Duration Mistakes</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-[#5F6368] text-base">
                <li>Confusing elapsed days with inclusive day counting.</li>
                <li>Forgetting that leap years can contain 366 days.</li>
                <li>Assuming every month has the same number of days.</li>
                <li>Treating business days as the same as calendar days.</li>
                <li>Reversing the start and end dates.</li>
              </ul>
            </section>

            {/* Why date counting is confusing */}
            <section id="why-confusing">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">Why Date Counting Can Be Confusing</h2>
              <p className="text-[#5F6368] text-base leading-relaxed">
                Date calculations can produce different results depending on whether you are measuring elapsed time or counting both dates. Month lengths also vary, and leap years add an extra day. This calculator makes those counting options explicit so you can choose the result that matches your use case.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-xl font-bold text-[#1967D2] mb-4">Date Duration Calculator FAQ</h2>
              <div className="space-y-5">
                {[
                  {
                    q: 'How do I calculate the number of days between two dates?',
                    a: 'Subtract the start date from the end date. For example, July 1 to July 5 is 4 elapsed days. Enable Include end date when both dates should be counted.'
                  },
                  {
                    q: 'Does the calculator include leap years?',
                    a: 'Yes. Date ranges are calculated using the actual calendar dates, including February 29 during leap years.'
                  },
                  {
                    q: 'Does the calculator count weekends?',
                    a: 'Calendar-day results include weekends. The business days result shows weekday-only count with weekends excluded.'
                  },
                  {
                    q: 'What is the difference between inclusive and exclusive dates?',
                    a: 'Standard elapsed counting measures the time between the dates without counting the end date as a full day. Inclusive counting counts both the start and end dates.'
                  },
                  {
                    q: 'Can I calculate business days between two dates?',
                    a: 'Yes. The Business Days result is always shown. Enable Count business days to highlight it prominently.'
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="font-bold text-[#202124] mb-1.5">{q}</h3>
                    <p className="text-[#5F6368] text-base leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Calculators */}
            <section id="related">
              <h2 className="text-xl font-bold text-[#1967D2] mb-3">Related Date Calculators</h2>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'Age Calculator', href: '/calculator/age-calculator/', desc: 'Calculate exact age from a birth date.' },
                  { label: 'Nepali Date Converter', href: '/calculator/nepali-date/', desc: 'Convert between BS and AD calendar dates.' },
                  { label: 'Pregnancy Due Date Calculator', href: '/calculator/pregnancy-due-date/', desc: 'Estimate delivery date from last period or conception date.' },
                ].map(({ label, href, desc }) => (
                  <li key={href}>
                    <Link href={href} className="font-bold text-[#1A73E8] hover:underline">{label}</Link>
                    <span className="text-[#5F6368]"> — {desc}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* Desktop TOC */}
          <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="pr-2">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Contents</p>
              <ol className="list-none pl-0 border-l-2 border-slate-200 space-y-1.5">
                {[
                  ['#days-between-dates', 'Days Between Dates'],
                  ['#what-it-calculates', 'What It Calculates'],
                  ['#how-to-use', 'How to Use'],
                  ['#inclusive-exclusive', 'Inclusive vs. Exclusive'],
                  ['#leap-years', 'Leap Years'],
                  ['#business-days', 'Business Days'],
                  ['#examples', 'Examples'],
                  ['#excel', 'Excel Formulas'],
                  ['#common-mistakes', 'Common Mistakes'],
                  ['#faq', 'FAQ'],
                  ['#related', 'Related Calculators'],
                ].map(([href, label], i) => (
                  <li key={href} className="pl-4">
                    <a href={href} className="text-[13px] text-slate-500 hover:text-blue-600 hover:font-bold transition-colors block py-0.5 border-l-2 -ml-[18px] pl-[16px] border-transparent hover:border-blue-600">
                      <span className="font-mono text-[10px] mr-1.5 text-slate-400">{i + 1}</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
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
          { label: 'Citizenship Age', href: '/calculator/nepal-citizenship-age/', icon: Clock },
        ],
      }}
    />
  );
}
