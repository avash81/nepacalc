'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, Clock, Info } from 'lucide-react';

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
    
    // Calculate Years, Months, Days properly
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
      weeks: (totalDays / 7).toFixed(1), 
      monthsTotal: (totalDays / 30.437).toFixed(1), 
      yearsTotal: (totalDays / 365.25).toFixed(2),
      breakdown: `${years} Year, ${months} Months, ${days} Days`,
      hours: (totalDays * 24).toLocaleString()
    };
  }, [start, end, includeEnd]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Date Calculator' }]}
      title="Date Duration Calculator"
      description="Determine the exact number of days, weeks, months, and years between any two dates using the Gregorian standard."
      icon={Calendar}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Start Date</label>
              <input type="date" value={start} onChange={e => setStart(e.target.value)} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">End Date</label>
              <input type="date" value={end} onChange={e => setEnd(e.target.value)} className={inputCls} />
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
            <input 
              type="checkbox" 
              id="includeEnd" 
              checked={includeEnd} 
              onChange={e => setIncludeEnd(e.target.checked)}
              className="w-4 h-4 rounded border-[#DADCE0] text-[#1A73E8] focus:ring-[#1A73E8]"
            />
            <label htmlFor="includeEnd" className="text-sm font-medium text-[#3C4043]">Include end day in calculation (adds 1 day)</label>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          {diff ? (
            <>
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-[#188038] tracking-tight">{diff.breakdown}</div>
                <div className="text-[10px] font-bold uppercase text-[#70757A] tracking-widest">Total Duration</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Days', val: diff.totalDays.toLocaleString() },
                  { label: 'Total Months', val: diff.monthsTotal },
                  { label: 'Total Weeks', val: diff.weeks },
                  { label: 'Total Hours', val: diff.hours },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                    <div className="text-xl font-bold text-[#202124]">{item.val}</div>
                    <div className="text-[9px] font-bold uppercase text-[#70757A] tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <Info className="w-8 h-8 text-[#DADCE0] mx-auto mb-2" />
              <p className="text-sm text-[#70757A]">Please enter valid dates to see results.</p>
            </div>
          )}
        </div>
      }
      howToUse={{
        steps: [
          "Select the Start Date from the dropdown and input fields.",
          "Select the End Date using the same format.",
          "Toggle the 'Include end day' checkbox if you want to count the final day as a full unit.",
          "Results are updated in real-time to show the precise breakdown."
        ]
      }}
      formula={{
        title: "Date Calculation Formula",
        description: "Our calculator uses the Gregorian calendar standard for all calculations, accounting for leap years and varying month lengths.",
        raw: "Δt = (Y₂ - Y₁) + (M₂ - M₁) + (D₂ - D₁)\nLeap Year Adjustment: IF (Month > Feb) AND\n(Year % 4 == 0) THEN D + 1"
      }}
      faqs={[
        { question: "How does the calculator handle leap years?", answer: "Leap years (366 days, with February 29) are automatically handled by the JavaScript Date object used in this calculator. A year is a leap year if it is divisible by 4, EXCEPT century years (divisible by 100) unless also divisible by 400. Example: 2000 was a leap year, but 1900 was not." },
        { question: "Is the End Date included by default?", answer: "By default, the end date is not counted (exclusive calculation). For example, from January 1 to January 31 = 30 days exclusive, 31 days inclusive. Check 'Include end day' for inclusive counting, which is needed for things like counting total days in a billing period." },
        { question: "How do I calculate the number of days between two dates in Nepal?", answer: "Enter your start and end dates using the Gregorian calendar (A.D.). For Bikram Sambat (B.S.) dates, first use our Nepali Date Converter to convert them to A.D. format, then use this tool. For example, to find how many days between Baisakh 1, 2082 and Ashar 15, 2082, convert both to A.D. first." },
        { question: "What is the difference between calendar days and business days?", answer: "Calendar days count every day including weekends and holidays (e.g., January 1–31 = 31 days). Business days exclude weekends (Saturday & Sunday) and typically public holidays. For financial and legal deadlines in Nepal, 'working days' usually means business days. Use our Lead Time Calculator for business-day-aware date calculations." },
        { question: "How many days are in a year for date duration calculations?", answer: "A non-leap Gregorian year has 365 days. A leap year has 366 days. When calculating 'years' in the duration breakdown, the calculator uses exact calendar arithmetic (year → month → day subtraction) rather than dividing by 365.25, which gives the most accurate human-readable breakdown." },
        { question: "Can I calculate my age using this tool?", answer: "Yes, by entering your date of birth as the start date and today as the end date. However, for a full age breakdown with zodiac signs, heartbeat count, and next birthday countdown, use the dedicated Age Calculator which is purpose-built for life stats." }
      ]}
      sidebar={{
        title: "Other Date Tools",
        links: [
          { label: "Add/Subtract Days", href: "/calculator/date-add-subtract" },
          { label: "Business Days Calculator", href: "/calculator/business-days" },
          { label: "Age Calculator", href: "/calculator/age-calculator" },
          { label: "Time Until Date", href: "/calculator/time-until" },
        ],
        banner: {
          title: "Plan Your Projects",
          description: "Precise date calculations are essential for project management, financial accruals, and personal milestones.",
          image: "/images/calendar-banner.jpg" // We can generate this or use a placeholder
        }
      }}
      relatedTools={[
        { label: "Age Calculator", href: "/calculator/age-calculator" },
        { label: "Nepali Date", href: "/calculator/nepali-date" },
        { label: "Date Duration", href: "/calculator/date-duration" }
      ]}
    />
  );
}
