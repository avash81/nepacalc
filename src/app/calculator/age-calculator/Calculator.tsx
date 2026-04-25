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
      slug="age-calculator"
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision Age Calculation for Documentation & Milestones</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In the administrative landscape of Nepal, chronological precision is often a prerequisite for critical milestones. Whether you are applying for <strong>Lok Sewa Aayog</strong> examinations, verifying eligibility for a driving license, or processing citizenship and passport documentation, our <strong className="text-[#202124]">age calculator</strong> provides a legally reliable breakdown of years, months, and days. It eliminates the margin of error associated with manual subtraction.
              </p>
              <p>
                While the <strong>Bikram Sambat (B.S.)</strong> calendar is our primary national standard, official age is frequently required in the <strong>Gregorian (A.D.)</strong> format for international opportunities and digital platforms. This tool acts as a bridge, ensuring that your chronological data is consistent across all your professional and personal profiles.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Life Statistics & Biological Insights</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Total Lifecycle Breakdown:</strong> Beyond just years, knowing your age in total months, weeks, and days offers a unique perspective on your journey. For researchers and health professionals, this <strong className="text-[#202124]">age in days calculator</strong> is vital for clinical assessments and longitudinal studies.</li>
              <li><strong className="text-[#188038]">Astronomical Identity:</strong> Your date of birth anchors your zodiac sign. We integrate these traditional identifiers to provide a holistic view of your birth chart, blending Western astronomical data with modern chronological precision.</li>
              <li><strong className="text-[#D93025]">Retirement & Eligibility Tracking:</strong> In the context of civil service and corporate policies in Nepal, the difference of a single day can determine retirement eligibility or exam participation. This tool serves as an audit engine for human resources and administrative planning.</li>
            </ul>
          </div>
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
          question: "How accurate is the heartbeat estimation?",
          answer: "The heartbeat count is a statistical estimation based on an average resting heart rate of 80 beats per minute (BPM) multiplied by the total minutes lived. This is a fun approximation — actual lifetime beats vary based on your fitness, age, and health history."
        },
        {
          question: "Does this account for leap years?",
          answer: "Yes, our algorithm uses the JavaScript Date object which automatically handles leap years (366 days) and varying month lengths (28–31 days). The result is accurate to the exact day."
        },
        {
          question: "What is the minimum age to apply for a Lok Sewa Aayog exam in Nepal?",
          answer: "For most Lok Sewa (Public Service Commission) positions, the minimum age is 18 years. The maximum age varies by position — typically 35 years for most posts, 40 years for higher positions, and up to 45 years for specialized or higher-class posts. Always verify with the PSC notice."
        },
        {
          question: "At what age can I apply for a driving license in Nepal?",
          answer: "In Nepal, you must be at least 16 years old for a motorcycle license and 18 years old for a car/vehicle license. The application requires a citizenship certificate (Nagarikta) which itself requires you to be at least 16 years of age. Our age calculator helps confirm you meet the exact date requirement."
        },
        {
          question: "How do I find my age in the Bikram Sambat (B.S.) calendar?",
          answer: "The Nepali Bikram Sambat calendar is approximately 56 years and 8.5 months ahead of the Gregorian calendar. To find your age in B.S., use our Nepali Date Converter to convert your A.D. birth date to B.S., then subtract from today's B.S. date. This tool works in A.D. — use the companion Nepali Date tool for B.S. calculations."
        },
        {
          question: "What zodiac sign does this calculator use?",
          answer: "This calculator uses Western tropical astrology zodiac signs (Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces), which are based on the Gregorian calendar. Hindu/Vedic astrology uses a different system (sidereal) with different date ranges — this tool does not reflect Vedic rashi."
        }
      ]}
      sidebar={{
        title: "Useful Tools",
        links: [
          { label: "Nepali Date Converter", href: "/calculator/nepali-date/" },
          { label: "Date Duration", href: "/calculator/date-duration/" },
          { label: "Pregnancy Due Date", href: "/calculator/pregnancy-due-date/" },
          { label: "Sleep Calculator", href: "/calculator/sleep/" },
        ],
        banner: {
          title: "Cherish Every Moment",
          description: "Time is our most valuable asset. Use our life statistics to see just how much you've accomplished so far.",
          image: "/images/time-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Nepali Date", href: "/calculator/nepali-date/" },
        { label: "Date Duration", href: "/calculator/date-duration/" },
        { label: "Sleep Calculator", href: "/calculator/sleep/" }
      ]}
    />
  );
}
