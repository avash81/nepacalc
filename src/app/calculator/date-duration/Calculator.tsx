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
      crumbs={[{ label: 'Calculators', href: '/calculators/' }, { label: 'Date Duration Calculator' }]}
      title="Date Duration Calculator"
      description="Calculate the exact duration between two dates with our free Date Duration Calculator. Instantly find the number of years, months, weeks, and days between dates using an accurate Date Difference Calculator. Whether you're planning projects, tracking milestones, or calculating age, get fast and reliable results online."
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
        <div className="space-y-12">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm space-y-10">
            
            {/* AI Quick Answer */}
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-lg p-5">
              <h2 className="font-bold text-[#1A73E8] mb-2 text-lg">Quick Answer</h2>
              <p className="text-[#202124] text-base leading-relaxed">
                A Date Duration Calculator calculates the exact number of years, months, weeks and days between two calendar dates using actual calendar rules, including leap years and different month lengths.
              </p>
            </div>

            {/* Section 1: Why Use a Date Duration Calculator? */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Why Use a Date Duration Calculator?</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                A Date Duration Calculator makes it easy to calculate the exact time between two dates without manually counting calendar days. It instantly determines the duration in years, months, weeks, and days, while automatically accounting for leap years and different month lengths.
              </p>
              <p className="text-[#5F6368] text-base leading-relaxed">
                Whether you're calculating age, employment duration, project timelines, anniversaries, subscriptions, or contract periods, the calculator provides fast and accurate results in seconds.
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

            {/* Section 2.5: NepaCalc vs Manual Calculation */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">NepaCalc vs Manual Calculation</h2>
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

            {/* Section 3: How to Use the Date Duration Calculator */}
            <section>
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">How to Use the Date Duration Calculator</h2>
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
                  <p className="text-sm text-[#5F6368]">The calculator instantly compares both dates using the calendar.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs">4</span>
                    View Your Results
                  </h3>
                  <p className="text-sm text-[#5F6368]">You'll receive a complete breakdown.</p>
                </div>
              </div>
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
                  <p className="text-sm text-[#5F6368]">Determine the exact age in years, months, and days from a date of birth.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Employment Duration</h3>
                  <p className="text-sm text-[#5F6368]">Calculate years of work experience between joining and leaving dates.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Project Planning</h3>
                  <p className="text-sm text-[#5F6368]">Track project timelines and completion periods.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Contract Duration</h3>
                  <p className="text-sm text-[#5F6368]">Measure service agreements, warranties, rental contracts, and subscriptions.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Anniversary Tracking</h3>
                  <p className="text-sm text-[#5F6368]">Find the exact time since weddings, engagements, or other important milestones.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg">
                  <h3 className="font-bold text-[#202124] mb-2">Education</h3>
                  <p className="text-sm text-[#5F6368]">Calculate semesters, academic years, internships, and study periods.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg md:col-span-3">
                  <h3 className="font-bold text-[#202124] mb-2">Travel Planning</h3>
                  <p className="text-sm text-[#5F6368]">Measure vacation length or trip duration between departure and return dates.</p>
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
                  </tbody>
                </table>
              </div>
              <p className="text-[#5F6368] text-sm mt-4 italic">
                These examples demonstrate how the calculator automatically measures different calendar durations without manual calculations.
              </p>
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
                  <p className="text-[#5F6368] text-base leading-relaxed">The calculator subtracts the start date from the end date using actual calendar rules rather than fixed averages. It automatically accounts for leap years, varying month lengths, and calendar transitions to provide an accurate day count.</p>
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
      relatedTools={[
        { label: "Age Calculator", href: "/calculator/age-calculator/" },
        { label: "Time Calculator", href: "/calculator/time-calculator/" },
        { label: "Date Calculator", href: "/calculator/date/" },
        { label: "Nepali Date Converter", href: "/converter/nepali-date/" },
        { label: "Calendar Converter", href: "/converter/calendar/" },
        { label: "Week Calculator", href: "/calculator/week-calculator/" },
        { label: "Business Days Calculator", href: "/calculator/business-days/" },
        { label: "Working Days Calculator", href: "/calculator/working-days/" },
        { label: "Loan EMI Calculator", href: "/calculator/loan-emi/" }
      ]}
    />
  );
}

