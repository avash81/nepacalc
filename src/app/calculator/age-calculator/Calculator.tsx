'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import {
  Calendar, Clock, RotateCcw, ArrowRightLeft, Share2, Printer, Copy,
  CalendarDays, Globe, Stars, Users, Briefcase, GraduationCap, HeartPulse,
  CheckCircle2, Link as LinkIcon, Trophy, ChevronDown, ChevronUp
} from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import {
  calculateExactAge, calculateTotalAge, calculateBiologicalStats, getSchoolAge,
  getLifeStage, getRetirementAge, calculateWorkingDays, getFunFacts,
  getBirthdayDetails, calculateLeapYears, getGeneration, calculatePlanetAges,
  getWesternZodiac, getChineseZodiac, getTimeline
} from './engine';

// '' = International default (65)
const COUNTRY_RETIREMENT: Record<string, number> = {
  '': 65,
  'Australia': 67, 'Brazil': 65, 'Canada': 65, 'China': 60,
  'France': 64, 'Germany': 67, 'India': 60, 'Japan': 65,
  'Nepal': 58, 'Singapore': 63, 'South Korea': 65,
  'United Kingdom': 66, 'United States': 67,
};
const COUNTRIES = Object.keys(COUNTRY_RETIREMENT).filter(c => c !== '');

const DEFAULT_STATE = {
  mode: 'standard',
  dob: '', targetDate: '',
  person1Dob: '', person2Dob: '',
  futureDate: '',
  country: '',
  customRetirementAge: 65,
  useCustomRetirement: false,
};

// ─── FAQs ───────────────────────────────────────────────────────────────────
const AGE_CALC_FAQS = [
  { question: 'What is an age calculator?', answer: 'An age calculator determines the exact time between a birth date and a selected comparison date, returning age in years, months, weeks, days, hours, minutes, and seconds while automatically accounting for leap years.' },
  { question: 'How is age calculated?', answer: 'Age = Reference Date − Birth Date. The calculator handles leap years (February 29) and months of different lengths automatically so the result is always exact.' },
  { question: 'Is this calculator accurate?', answer: 'Yes. It strictly follows the Gregorian Calendar (ISO 8601) and accounts for leap years, varying month lengths, and time zone offsets — the same method used in legal and government documents worldwide.' },
  { question: 'Can I calculate future age?', answer: 'Yes. Set the Reference Date to any future date to see how old you will be at that point — useful for retirement planning, insurance projections, or visa applications.' },
  { question: 'Can I calculate past age?', answer: 'Yes. Select any historical date as the Reference Date to determine exactly how old you were on that day — for historical records, legal filings, or personal milestones.' },
  { question: 'Can I calculate age from date of birth?', answer: 'Yes. Enter your exact date of birth and the calculator instantly determines your chronological age in all time units.' },
  { question: 'Can I calculate my age in hours?', answer: 'Yes. The Age Breakdown section automatically shows your total age in hours. For example, a 23-year-old has lived approximately 201,480 hours.' },
  { question: 'Does NepaCalc store my birth date?', answer: 'No. All calculations run entirely in your browser. Your birth date is never sent to our servers, never stored, and never shared.' },
  { question: 'Is my data private?', answer: 'Yes. All calculations happen securely on your device. We do not collect, store, or transmit any personal information.' },
  { question: 'What is my age in minutes?', answer: 'The Age Breakdown section displays your age in total minutes — calculated as total days × 1440.' },
  { question: 'How many birthdays have I completed?', answer: 'Your completed birthdays equal your chronological age in years. If you are 23 years and 4 months old, you have completed 23 birthdays.' },
  { question: 'What day of the week was I born?', answer: 'The Birthday Summary section shows the exact weekday you were born on, calculated using the Gregorian Calendar algorithm.' },
  { question: 'How many leap years have I experienced?', answer: 'The calculator automatically counts how many leap years (years with February 29) occurred between your birth year and the current year.' },
  { question: 'How old am I today?', answer: 'Enter your date of birth and leave the Reference Date as Today, then press Calculate Age. Your exact age appears instantly.' },
  { question: 'How many days have I been alive?', answer: 'The Age Breakdown section shows your total days lived. The number increases by 1 every midnight in your local time zone.' },
  { question: 'How many weeks old am I?', answer: 'The Age Breakdown section converts your full age into total completed weeks. A 23-year-old is roughly 1,217 weeks old.' },
  { question: 'How many months old am I?', answer: 'The Age Breakdown section shows your total completed calendar months.' },
  { question: 'How do I calculate the age difference between two people?', answer: 'Switch to Compare Ages mode, enter both birth dates, and press Calculate Age. The result shows the exact difference in years, months, and days.' },
  { question: 'Can I calculate age on a future date?', answer: 'Yes. Select Future Age mode or set the Reference Date to any future date. Useful for retirement planning or insurance projections.' },
  { question: 'Can I calculate age on a past date?', answer: 'Yes. Select any historical Reference Date to determine how old you were on that day — useful for legal filings and personal milestones.' },
];

// ─── SEO Content ─────────────────────────────────────────────────────────────
const AGE_CALC_SEO_CONTENT = (
  <article className="space-y-14 text-[#3C4043]" id="article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
        { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculator/" },
        { "@type": "ListItem", "position": 3, "name": "Date & Time Calculators", "item": "https://nepacalc.com/calculator/date-time/" },
        { "@type": "ListItem", "position": 4, "name": "Age Calculator", "item": "https://nepacalc.com/calculator/age-calculator/" }
      ]
    })}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://nepacalc.com/calculator/age-calculator/",
      "url": "https://nepacalc.com/calculator/age-calculator/",
      "name": "Age Calculator",
      "description": "Calculate exact age using date of birth and comparison date.",
      "inLanguage": "en",
      "datePublished": "2026-07-15",
      "dateModified": new Date().toISOString().split('T')[0],
      "isPartOf": { "@id": "https://nepacalc.com/#website" },
      "primaryImageOfPage": { "@id": "https://nepacalc.com/images/age-calculator.webp" }
    })}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Age Calculator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": [
        "Calculate age in years", "Calculate age in months", "Calculate age in weeks",
        "Calculate age in days", "Calculate age in hours", "Calculate age in minutes",
        "Calculate age in seconds", "Leap year support", "Future age calculation", "Past age calculation"
      ]
    })}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Your Age",
      "step": [
        { "@type": "HowToStep", "text": "Select your birth date." },
        { "@type": "HowToStep", "text": "Choose today's date or another comparison date." },
        { "@type": "HowToStep", "text": "Click Calculate." },
        { "@type": "HowToStep", "text": "Review years, months, weeks, days, hours, minutes and seconds." }
      ]
    })}} />

    <section id="what-is" aria-labelledby="what-is-title">
      <h2 id="what-is-title" className="text-2xl font-black text-[#202124] mb-4">What Is an Age Calculator and How Does It Work?</h2>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-4">
        An Age Calculator determines the exact time between your date of birth and another selected date. It calculates your age in years, months, weeks, days, hours, minutes, and seconds while automatically accounting for leap years.
      </p>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-4">
        This Date of Birth Calculator is useful for passports, visas, education, employment, retirement planning, insurance, healthcare, and legal documentation worldwide.
      </p>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-4">
        Need to know the duration between two arbitrary dates? <a href="/calculator/date-duration/" className="text-[#1A73E8] hover:underline font-medium">Date Duration Calculator</a>.
      </p>
    </section>

    <section id="how-calculated" aria-labelledby="how-calculated-title">
      <h2 id="how-calculated-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">How Age Is Calculated</h2>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-4">
        Age is calculated by measuring the precise time elapsed between a person&apos;s birth date and a chosen comparison date.
      </p>
      <div className="p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl font-mono text-center text-[#1A73E8] font-black text-base mb-5" role="img" aria-label="Formula: Age equals Comparison Date minus Date of Birth">
        Age = Comparison Date − Date of Birth
      </div>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-4">
        The calculator automatically accounts for leap years and varying month lengths to produce accurate age calculations.
      </p>
    </section>

    <section id="why-important" aria-labelledby="why-important-title">
      <h2 id="why-important-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">Why Age Calculation is Important</h2>
      <p className="text-sm font-bold leading-relaxed text-[#202124] mb-3 p-4 bg-[#F8F9FA] border-l-4 border-[#1A73E8] rounded-r-xl">
        Knowing your exact age — not just the year — is essential for legal documents, passport applications, insurance policies, medical assessments, and government forms worldwide.
      </p>
    </section>

    <section id="key-highlights" aria-labelledby="key-highlights-title">
      <h2 id="key-highlights-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">Key Highlights</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
        {[
          'Calculate exact age instantly', 'Age in years, months and days', 'Total days lived',
          'Total weeks lived', 'Total months lived', 'Total hours lived',
          'Total minutes lived', 'Total seconds lived', 'Automatic leap year calculation',
          'Supports any past or future date', 'Works worldwide', 'Free and unlimited'
        ].map((feature, i) => (
          <li key={i} className="flex items-center gap-3 p-3 bg-white border border-[#DADCE0] rounded-xl">
            <span className="w-2 h-2 rounded-full bg-[#1A73E8] shrink-0" aria-hidden="true" />
            <span className="text-sm font-bold text-[#3C4043]">{feature}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm leading-relaxed text-[#5F6368] mt-4">
        Our Online Age Calculator handles all time interval math seamlessly so you don&apos;t have to manually count leap days.
      </p>
    </section>

    <section id="how-works" aria-labelledby="how-works-title">
      <h2 id="how-works-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">How the Age Calculator Works</h2>
      <div className="space-y-4">
        {[
          'Enter your date of birth.',
          'Select the comparison date (today by default).',
          'The calculator automatically compares both dates.',
          'Leap years and varying month lengths are included automatically.',
          'View your complete age breakdown instantly.'
        ].map((step, i) => (
          <div key={i} className="flex gap-4 items-start p-4 bg-white border border-[#DADCE0] rounded-xl">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold">{i + 1}</div>
            <p className="text-sm text-[#5F6368] mt-1.5"><strong className="text-[#202124]">Step {i + 1}:</strong> {step}</p>
          </div>
        ))}
      </div>
    </section>

    <section id="worldwide" aria-labelledby="worldwide-title">
      <h2 id="worldwide-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">Worldwide Applications</h2>
      <p className="text-sm text-[#5F6368] mb-4">This Years Months Days Calculator can be used in any country for:</p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-[#5F6368] mb-4" role="list">
        {['Passport applications','Visa processing','Immigration','School admissions','University enrollment','Employment verification','Retirement planning','Insurance','Medical records','Government documentation','Legal records','Birthday planning','Personal milestones','Tax filing','Pension eligibility','Military recruitment','Driver\'s license eligibility'].map(u => <li key={u}>{u}</li>)}
      </ul>
      <p className="text-sm text-[#5F6368] mt-4">
        Planning retirement? Estimate your future savings with our <a href="/calculator/retirement/" className="text-[#1A73E8] hover:underline font-medium">Retirement Savings Calculator</a>.
      </p>
    </section>

    <section id="who-can-use" aria-labelledby="who-can-use-title">
      <h2 id="who-can-use-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">Who Can Use This Calculator?</h2>
      <p className="text-sm text-[#5F6368] mb-3">Suitable for:</p>
      <ul className="flex flex-wrap gap-2 text-sm text-[#5F6368]" role="list">
        {['Students','Teachers','Parents','Employers','HR departments','Government offices','Lawyers','Doctors','Hospitals','Insurance companies','Immigration consultants','Researchers','Individuals verifying their exact age'].map(user => (
          <li key={user} className="px-3 py-1.5 bg-[#E6F4EA] text-[#137333] text-xs font-bold rounded-full">{user}</li>
        ))}
      </ul>
    </section>

    <section id="international-age-standards" aria-labelledby="international-age-standards-title">
      <h2 id="international-age-standards-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">International Age Standards</h2>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-4">
        Most countries calculate age by adding one year on the exact anniversary of a person&apos;s birth. This calculator uses the universally accepted Western (International) age standard to ensure consistency across borders.
      </p>
    </section>

    <section aria-labelledby="related-calcs">
      <h2 id="related-calcs" className="text-2xl font-black text-[#202124] mb-4 mt-8">Related Calculators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { href: '/calculator/date-duration/', title: 'Date Duration Calculator', desc: 'Calculate the exact duration between two dates.' },
          { href: '/calculator/date-calculator/', title: 'Date Calculator', desc: 'Add or subtract days, months, and years from any date.' },
          { href: '/calculator/time-calculator/', title: 'Time Calculator', desc: 'Add or subtract time units like hours, minutes, and seconds.' },
          { href: '/calculator/business-days/', title: 'Business Days Calculator', desc: 'Count only working days, skipping weekends and holidays.' },
          { href: '/calculator/week-calculator/', title: 'Week Calculator', desc: 'Calculate the exact number of weeks between two dates.' },
          { href: '/calculator/pregnancy-due-date/', title: 'Pregnancy Due Date Calculator', desc: 'Estimate your expected delivery date based on medical standards.' },
        ].map(c => (
          <a key={c.href} href={c.href} className="flex flex-col p-4 bg-white border border-[#DADCE0] rounded-xl hover:bg-[#F8F9FA] hover:border-[#1A73E8] transition-colors">
            <span className="text-base font-bold text-[#1A73E8] mb-1">{c.title}</span>
            <span className="text-sm text-[#5F6368]">{c.desc}</span>
          </a>
        ))}
      </div>
    </section>

    <section aria-labelledby="data-accuracy">
      <h2 id="data-accuracy" className="text-2xl font-black text-[#202124] mb-4 mt-8">Data Accuracy &amp; Privacy</h2>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-3">
        The NepaCalc Age Calculator strictly follows internationally accepted calculations based on the Gregorian Calendar.
      </p>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-3">
        <strong>Privacy:</strong> All calculations are performed directly on your device. We store <strong>no data</strong> on our servers.
      </p>
    </section>

    <footer className="mt-12 pt-6 border-t border-[#DADCE0] bg-[#F8F9FA] p-6 rounded-xl space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div><div className="font-bold text-[#202124]">Reviewed By</div><div className="text-[#5F6368]">NepaCalc Research Team</div></div>
        <div><div className="font-bold text-[#202124]">Category</div><div className="text-[#5F6368]">Date &amp; Time Calculators</div></div>
        <div><div className="font-bold text-[#202124]">Last Updated</div><div className="text-[#5F6368]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div></div>
        <div><div className="font-bold text-[#202124]">Calculation Method</div><div className="text-[#5F6368]">Gregorian Calendar</div></div>
      </div>
      <p className="text-sm text-[#5F6368] mt-4 border-t border-[#DADCE0] pt-4">
        Need to track your exact upcoming birthday? Try our <a href="/calculator/birthday-countdown/" className="text-[#1A73E8] hover:underline font-medium">Birthday Countdown Calculator</a>.
      </p>
    </footer>
  </article>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AgeCalculator() {
  const [state, setState] = useSyncState('age_v8', DEFAULT_STATE);
  const { mode, dob, targetDate, person1Dob, person2Dob, futureDate, country, customRetirementAge, useCustomRetirement } = state;
  const [showRetirementCard, setShowRetirementCard] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const searchParams = useSearchParams();
  const [hasCalculated, setHasCalculated] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const urlDob = searchParams.get('dob');
    const urlTarget = searchParams.get('ref');
    if (urlDob) {
      setState(s => ({ ...s, dob: urlDob, targetDate: urlTarget || new Date().toISOString().split('T')[0] }));
      setHasCalculated(true);
    } else if (!targetDate) {
      setState(s => ({ ...s, targetDate: new Date().toISOString().split('T')[0] }));
    }
  }, [searchParams]);

  const update = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const handleCalculate = () => {
    setHasCalculated(true);
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'age_calculated', { event_category: 'Age Calculator', event_label: mode });
    }
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const setToday = () => update({ targetDate: new Date().toISOString().split('T')[0] });
  const swapDates = () => {
    if (mode === 'standard') update({ dob: targetDate, targetDate: dob });
    else update({ person1Dob: person2Dob, person2Dob: person1Dob });
  };
  const reset = () => {
    update({ dob: '', targetDate: new Date().toISOString().split('T')[0], person1Dob: '', person2Dob: '' });
    setHasCalculated(false);
  };

  useEffect(() => {
    if (!hasCalculated) return undefined;
    const isTargetToday = targetDate === new Date().toISOString().split('T')[0];
    if (mode === 'standard' && isTargetToday) {
      const interval = setInterval(() => setNow(Date.now()), 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [hasCalculated, mode, targetDate]);

  const calc = useMemo(() => {
    if (!hasCalculated) return null;

    if (mode === 'compare') {
      if (!person1Dob || !person2Dob) return null;
      const d1 = new Date(person1Dob);
      const d2 = new Date(person2Dob);
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return { error: 'Please enter valid birth dates for both people.' };
      if (d1.getTime() === d2.getTime()) return { error: 'Both birth dates are identical. The age difference is exactly zero.' };
      const oldest = d1.getTime() < d2.getTime() ? d1 : d2;
      const youngest = d1.getTime() < d2.getTime() ? d2 : d1;
      const exact = calculateExactAge(oldest, youngest);
      const totalDays = Math.floor((youngest.getTime() - oldest.getTime()) / 86400000);
      return { type: 'compare' as const, exact, totalDays };
    }

    if (!dob) return null;
    let d2Str = targetDate;
    if (mode === 'future') d2Str = futureDate;
    else if (mode === 'birthday' || mode === 'milestone') d2Str = new Date().toISOString().split('T')[0];

    if (!d2Str) return null;
    const d1 = new Date(dob);
    const d2 = new Date(d2Str);
    if (isNaN(d1.getTime())) return { error: 'Please enter a valid birth date.' };
    if (isNaN(d2.getTime())) return { error: 'Please enter a valid reference date.' };

    if (mode === 'future') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (d2.getTime() <= today.getTime()) return { error: 'Future Age mode requires a date in the future. Please select a future date.' };
    }

    const localD2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
    if (d1.getTime() > localD2.getTime()) return { error: 'The birth date cannot be after the reference date. Please check your dates and try again.' };

    const exact = calculateExactAge(d1, localD2);
    const total = calculateTotalAge(d1, localD2);
    const bday = getBirthdayDetails(d1, localD2);
    const zodiac = getWesternZodiac(d1);
    const chineseZodiac = getChineseZodiac(d1);
    const gen = getGeneration(d1);
    const lifeStage = getLifeStage(total.years);
    const effectiveRetirementAge = useCustomRetirement ? customRetirementAge : (COUNTRY_RETIREMENT[country] ?? 65);
    const retirement = getRetirementAge(d1, effectiveRetirementAge);
    const timeline = getTimeline(total.years, d1, localD2);
    const planets = calculatePlanetAges(total.days);
    const leapYears = calculateLeapYears(d1, localD2);
    const biological = calculateBiologicalStats(total.days);
    const school = getSchoolAge(total.years);
    const workingDays = calculateWorkingDays(d1, localD2);
    const funFacts = getFunFacts(d1, localD2);

    return {
      type: 'standard' as const,
      exact, total, bday, zodiac, chineseZodiac, gen, lifeStage, retirement, timeline,
      planets, leapYears, biological, school, workingDays, funFacts, d1, localD2,
      effectiveRetirementAge,
    };
  }, [hasCalculated, mode, dob, targetDate, person1Dob, person2Dob, futureDate, country, customRetirementAge, useCustomRetirement]);

  const exactSeconds = useMemo(() => {
    if (!calc || 'error' in calc || calc.type !== 'standard') return 0;
    const isTargetToday = targetDate === new Date().toISOString().split('T')[0];
    if (isTargetToday) {
      const msSinceMidnight = now - new Date().setHours(0, 0, 0, 0);
      return calc.total.seconds + Math.floor(msSinceMidnight / 1000);
    }
    return calc.total.seconds;
  }, [calc, now, targetDate, futureDate, mode]);

  return (
    <ModernCalcLayout
      slug="age-calculator"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Age Calculator' }]}
      title="Age Calculator"
      description="Calculate your exact age instantly in years, months, weeks, days, hours, minutes, and seconds. Perfect for passports, visas, education, employment, retirement planning, insurance, healthcare, legal documents, and personal use worldwide."
      icon={Calendar}
      sidebar={undefined}
      compactHeader={true}
      howToUse={{ steps: [
        'Enter your date of birth in the Birth Date field.',
        'The Reference Date defaults to today — change it for past or future calculations.',
        'Switch to Compare Ages mode to find the exact difference between two people.',
        'Press Calculate Age to see your exact age, birthday countdown, zodiac, generation, and more.',
        'Use Copy, Print, or Share to save or export your results.',
      ] }}
      formula={{
        title: 'Age Formula',
        description: 'Age is calculated as the exact calendar difference between the birth date and the reference date, respecting actual month lengths and leap years.',
        raw: 'Age = Reference Date − Birth Date\n\nReturns: Years, Months, Weeks, Days, Hours, Minutes, Seconds',
      }}
      faqs={AGE_CALC_FAQS}
      seoContent={AGE_CALC_SEO_CONTENT}
      inputs={
        <div className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex overflow-x-auto rounded-lg p-1 bg-[#F1F3F4] snap-x" style={{ scrollbarWidth: 'none' }} role="tablist" aria-label="Calculator mode">
            {(['standard','compare','future','birthday','milestone'] as const).map(m => (
              <button
                key={m}
                role="tab"
                aria-pressed={mode === m}
                aria-selected={mode === m}
                onClick={() => { update({ mode: m }); setHasCalculated(false); }}
                className={`flex-none py-2 px-4 text-sm font-bold rounded-md transition-colors snap-start whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] ${mode === m ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#202124]'}`}
              >
                {m === 'standard' ? 'Standard Age' : m === 'compare' ? 'Compare Ages' : m === 'future' ? 'Future Age' : m === 'birthday' ? 'Birthday Countdown' : 'Milestone Age'}
              </button>
            ))}
          </div>

          {/* Date Inputs */}
          <div className="space-y-4">
            {mode === 'standard' ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="std-birth-date" className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Birth Date</label>
                  <input id="std-birth-date" type="date" value={dob} onChange={e => { update({ dob: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" aria-label="Date of birth" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="std-ref-date" className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Reference Date</label>
                    <div className="flex gap-2">
                      <button onClick={setToday} className="text-[10px] font-bold text-[#1A73E8] hover:underline" aria-label="Set reference date to today">Today</button>
                      <button onClick={swapDates} className="text-[10px] font-bold text-[#5F6368] hover:text-[#202124] flex items-center gap-1" aria-label="Swap birth date and reference date">
                        <ArrowRightLeft size={10} /> Swap
                      </button>
                    </div>
                  </div>
                  <input id="std-ref-date" type="date" value={targetDate} onChange={e => { update({ targetDate: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" aria-label="Reference date" />
                </div>
              </>
            ) : mode === 'compare' ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="cmp-person1" className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Person 1 — Date of Birth</label>
                  <input id="cmp-person1" type="date" value={person1Dob} onChange={e => { update({ person1Dob: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" aria-label="Person 1 date of birth" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cmp-person2" className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Person 2 — Date of Birth</label>
                  <input id="cmp-person2" type="date" value={person2Dob} onChange={e => { update({ person2Dob: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" aria-label="Person 2 date of birth" />
                </div>
              </>
            ) : mode === 'future' ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="fut-birth-date" className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Birth Date</label>
                  <input id="fut-birth-date" type="date" value={dob} onChange={e => { update({ dob: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" aria-label="Date of birth" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="fut-future-date" className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Future Reference Date</label>
                  <input id="fut-future-date" type="date" value={futureDate} onChange={e => { update({ futureDate: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" aria-label="Future date" />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <label htmlFor="gen-birth-date" className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Date of Birth</label>
                <input id="gen-birth-date" type="date" value={dob} onChange={e => { update({ dob: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" aria-label="Date of birth" />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button id="calculate-age-btn" onClick={handleCalculate} className="flex-1 h-14 bg-[#1A73E8] text-white font-black rounded-xl hover:bg-[#1557B0] transition-colors shadow-md hover:shadow-lg text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A73E8]">
              Calculate Age
            </button>
            <button onClick={reset} aria-label="Reset calculator" className="w-14 h-14 bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] rounded-xl flex items-center justify-center hover:bg-[#E8EAED] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5F6368]">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      }
      results={
        <div id="results-section" className="space-y-6">
          {!hasCalculated ? (
            <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 bg-[#F8F9FA] border-2 border-dashed border-[#DADCE0] rounded-2xl" role="status" aria-live="polite">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                {mode === 'standard' ? <Calendar className="text-[#1A73E8]" size={32} /> : mode === 'compare' ? <Users className="text-[#1A73E8]" size={32} /> : <Stars className="text-[#1A73E8]" size={32} />}
              </div>
              <h3 className="text-xl font-black text-[#202124] mb-3">
                {mode === 'compare' ? 'Compare two birth dates' : mode === 'future' ? 'Calculate your future age' : mode === 'birthday' ? 'Find your birthday countdown' : mode === 'milestone' ? 'Track your age milestones' : 'Enter your birth date'}
              </h3>
              <p className="text-[#5F6368] text-xs font-bold uppercase tracking-wider mb-3">You will see:</p>
              <ul className="text-[#5F6368] text-sm space-y-1 text-left list-none">
                <li className="flex items-center gap-2"><span className="text-[#1A73E8] font-black">&#10003;</span> Exact age in years, months and days</li>
                <li className="flex items-center gap-2"><span className="text-[#1A73E8] font-black">&#10003;</span> Total days, weeks, hours, minutes, seconds</li>
                <li className="flex items-center gap-2"><span className="text-[#1A73E8] font-black">&#10003;</span> Birthday countdown and weekday born</li>
                <li className="flex items-center gap-2"><span className="text-[#1A73E8] font-black">&#10003;</span> Zodiac signs, generation, life stage</li>
                <li className="flex items-center gap-2"><span className="text-[#1A73E8] font-black">&#10003;</span> Planet ages and life timeline</li>
                <li className="flex items-center gap-2"><span className="text-[#1A73E8] font-black">&#10003;</span> Retirement planner</li>
              </ul>
            </div>
          ) : !calc ? (
            <div className="p-6 bg-[#FEF7E0] border border-[#FDE293] rounded-2xl text-center text-[#856404] font-bold">Please fill in all required date fields above, then press Calculate Age.</div>
          ) : 'error' in calc ? (
            <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-2xl">
              <div className="text-[#C5221F] font-bold text-center">{calc.error}</div>
            </div>
          ) : calc.type === 'compare' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 bg-white border border-[#DADCE0] rounded-2xl shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F0FE] rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
                <h2 className="text-xs font-black uppercase tracking-widest text-[#5F6368] mb-6 relative z-10">Age Difference</h2>
                <div className="flex flex-col gap-2 relative z-10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl sm:text-7xl font-black text-[#1A73E8] tracking-tighter leading-none">{calc.exact.years}</span>
                    <span className="text-xl font-bold text-[#5F6368]">Years</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
                    {calc.exact.months} Months, {calc.exact.days} Days
                  </div>
                  <div className="text-base font-bold text-[#5F6368] mt-2">Total: {calc.totalDays.toLocaleString()} Days</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* ── EXACT AGE ── */}
              <div className="p-7 bg-white border border-[#DADCE0] rounded-2xl shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#E8F0FE] rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
                <h2 className="text-[10px] font-black uppercase tracking-widest text-[#5F6368] mb-4 relative z-10">
                  {mode === 'future' ? 'Age at Future Date' : mode === 'birthday' ? 'Next Birthday Countdown' : mode === 'milestone' ? 'Age Milestones' : 'Exact Age'}
                </h2>
                <div className="relative z-10">
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <span className="text-6xl sm:text-7xl font-black text-[#1A73E8] tracking-tighter leading-none">{calc.exact.years}</span>
                    <span className="text-2xl font-bold text-[#5F6368]">Years</span>
                    <span className="text-2xl font-black text-[#202124]">{calc.exact.months} Months</span>
                    <span className="text-2xl font-black text-[#202124]">{calc.exact.days} Days</span>
                  </div>
                  <div className="text-sm font-bold text-[#70757A] mt-2">{(calc.total.days / 365.25).toFixed(4)} decimal years &nbsp;·&nbsp; {calc.total.days.toLocaleString()} total days</div>
                </div>
              </div>

              {/* ── BIRTHDAY COUNTDOWN ── */}
              <div className="p-6 bg-gradient-to-br from-[#E8F0FE] to-[#D2E3FC] border border-[#C5D9F7] rounded-2xl shadow-sm relative overflow-hidden group">
                <Stars className="absolute top-3 right-4 text-[#1A73E8] opacity-15 group-hover:rotate-12 transition-transform duration-500" size={56} />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1A73E8] mb-4">🎂 Next Birthday</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                  <div>
                    <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1 opacity-80">Days Remaining</div>
                    <div className="text-3xl font-black text-[#1A73E8]">{calc.bday.daysRemaining === 0 ? '🎂 Today!' : calc.bday.daysRemaining}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1 opacity-80">On</div>
                    <div className="text-base font-black text-[#1A73E8] leading-tight">{calc.bday.nextBirthday.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <div className="text-[11px] font-bold text-[#1A73E8] opacity-70 mt-0.5">{calc.bday.nextBirthdayWeekday}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1 opacity-80">Turning</div>
                    <div className="text-3xl font-black text-[#1A73E8]">{calc.exact.years + 1}</div>
                    <div className="text-[11px] font-bold text-[#1A73E8] opacity-70 mt-0.5">years old</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1 opacity-80">Born On</div>
                    <div className="text-xl font-black text-[#1A73E8]">{calc.bday.bornOnWeekday}</div>
                    <div className="text-[11px] font-bold text-[#1A73E8] opacity-70 mt-0.5">{calc.leapYears} leap years lived</div>
                  </div>
                </div>
              </div>

              {/* ── AGE BREAKDOWN ── */}
              <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#5F6368] mb-4">Age Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-5 gap-x-3">
                  {[
                    { label: 'Years', value: calc.exact.years.toLocaleString(), color: 'text-[#202124]' },
                    { label: 'Months', value: calc.total.months.toLocaleString(), color: 'text-[#202124]' },
                    { label: 'Weeks', value: calc.total.weeks.toLocaleString(), color: 'text-[#202124]' },
                    { label: 'Days', value: calc.total.days.toLocaleString(), color: 'text-[#202124]' },
                    { label: 'Business Days', value: calc.workingDays.businessDays.toLocaleString(), color: 'text-[#202124]' },
                    { label: 'Hours', value: calc.total.hours.toLocaleString(), color: 'text-[#202124]' },
                    { label: 'Minutes', value: calc.total.minutes.toLocaleString(), color: 'text-[#202124]' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="text-[#70757A] text-[10px] font-bold uppercase mb-1">{item.label}</div>
                      <div className={`text-xl font-black ${item.color}`}>{item.value}</div>
                    </div>
                  ))}
                  <div>
                    <div className="text-[#E37400] text-[10px] font-bold uppercase mb-1 flex items-center gap-0.5">
                      <Clock size={10} className="animate-pulse" /> Seconds
                    </div>
                    <div className="text-xl font-black text-[#E37400] font-mono">{exactSeconds.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* ── 2-COL GRID ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Generation + Life Stage */}
                <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm flex flex-col gap-4">
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#5F6368] mb-1">Generation</h3>
                    <div className="text-2xl font-black text-[#1A73E8]">{calc.gen}</div>
                  </div>
                  <div className="border-t border-[#F1F3F4] pt-3">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#5F6368] mb-1">Life Stage</h3>
                    <div className="text-xl font-black text-[#202124]">{calc.lifeStage}</div>
                  </div>
                </div>

                {/* Zodiac */}
                <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm relative overflow-hidden flex flex-col gap-4">
                  <div className="absolute -right-4 -bottom-4 text-[#F1F3F4] text-6xl opacity-30 select-none">{calc.zodiac.icon}</div>
                  <div className="relative z-10">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#5F6368] mb-1">Western Zodiac</h3>
                    <div className="text-xl font-black text-[#202124]">{calc.zodiac.sign} {calc.zodiac.icon}</div>
                    <div className="text-[11px] text-[#70757A] font-bold mt-0.5">{calc.zodiac.start} – {calc.zodiac.end}</div>
                  </div>
                  <div className="border-t border-[#F1F3F4] pt-3 relative z-10">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#E37400] mb-1">Chinese Zodiac</h3>
                    <div className="text-xl font-black text-[#E37400]">{calc.chineseZodiac.animal}</div>
                    <div className="text-[11px] font-bold text-[#E37400] opacity-70">{calc.chineseZodiac.full}</div>
                  </div>
                </div>

                {/* Birthday Weekdays */}
                <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#5F6368] mb-4">Birthday Weekdays</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-[#F1F3F4] pb-2">
                      <span className="text-[#5F6368] font-bold text-sm">Born on</span>
                      <span className="text-[#202124] font-black">{calc.bday.bornOnWeekday}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#F1F3F4] pb-2">
                      <span className="text-[#5F6368] font-bold text-sm">This year&apos;s birthday</span>
                      <span className="text-[#202124] font-black">{calc.bday.currentBirthdayWeekday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#5F6368] font-bold text-sm">Next birthday</span>
                      <span className="text-[#202124] font-black">{calc.bday.nextBirthdayWeekday}</span>
                    </div>
                  </div>
                </div>

                {/* Fun Facts */}
                <div className="p-6 bg-gradient-to-br from-[#FEF7E0] to-[#FFF8E1] border border-[#FDE293] rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy size={16} className="text-[#E37400]" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#E37400]">You Have Experienced</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: calc.funFacts.leapYears, label: 'Leap Years' },
                      { val: calc.funFacts.olympics, label: 'Summer Olympics' },
                      { val: calc.funFacts.worldCups, label: 'FIFA World Cups' },
                      { val: calc.funFacts.usElections, label: 'US Elections' },
                    ].map(f => (
                      <div key={f.label} className="p-3 bg-white bg-opacity-70 rounded-xl text-center">
                        <div className="text-2xl font-black text-[#E37400]">{f.val}</div>
                        <div className="text-[10px] font-bold text-[#E37400] opacity-80 uppercase tracking-wider mt-0.5">{f.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── LIFE TIMELINE ── */}
              <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm overflow-hidden">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#5F6368] mb-5">Life Timeline</h3>
                <div className="flex items-center gap-2 overflow-x-auto pb-3 snap-x" style={{ scrollbarWidth: 'none' }}>
                  {[
                    { label: 'Birth', age: 0 },
                    { label: '5 yrs', age: 5 },
                    { label: '13 yrs', age: 13 },
                    { label: '16 yrs', age: 16 },
                    { label: '18 yrs', age: 18 },
                    { label: '21 yrs', age: 21 },
                    { label: '30 yrs', age: 30 },
                    { label: '40 yrs', age: 40 },
                    { label: '50 yrs', age: 50 },
                    { label: '60 yrs', age: 60 },
                    { label: `Retire (${calc.effectiveRetirementAge})`, age: calc.effectiveRetirementAge },
                    { label: 'Now', age: calc.exact.years },
                  ].sort((a, b) => a.age - b.age)
                    .filter((m, i, arr) => i === 0 || arr[i - 1].age !== m.age)
                    .map((m, i, arr) => {
                      const isCompleted = calc.exact.years >= m.age;
                      const isCurrent = m.label === 'Now';
                      return (
                        <div key={i} className="flex items-center flex-none snap-start">
                          <div className="flex flex-col items-center">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm ${isCurrent ? 'bg-[#1A73E8] text-white ring-2 ring-[#1A73E8] ring-offset-2' : isCompleted ? 'bg-[#34A853] text-white' : 'bg-[#F1F3F4] text-[#5F6368]'}`}>
                              {isCompleted ? '✓' : m.age}
                            </div>
                            <span className={`text-[9px] font-bold mt-1.5 uppercase text-center max-w-[52px] leading-tight ${isCurrent ? 'text-[#1A73E8]' : isCompleted ? 'text-[#34A853]' : 'text-[#5F6368]'}`}>{m.label}</span>
                          </div>
                          {i < arr.length - 1 && (
                            <div className={`w-8 h-1 mx-1.5 rounded-full flex-none ${isCompleted ? 'bg-[#34A853]' : 'bg-[#F1F3F4]'}`} />
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* ── PLANET AGES ── */}
              <div className="p-6 bg-[#202124] border border-[#3C4043] rounded-2xl shadow-sm text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="text-[#8AB4F8]" size={18} />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-[#E8EAED]">Age on Other Planets</h3>
                  </div>
                  <span className="text-[9px] text-[#9AA0A6] font-bold hidden sm:block">Based on each planet&apos;s orbital period</span>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {calc.planets.map(p => (
                    <div key={p.name} className="p-3 bg-[#3C4043] rounded-xl text-center">
                      <div className="text-[9px] font-bold text-[#9AA0A6] uppercase tracking-wider mb-1">{p.name}</div>
                      <div className="font-black text-sm text-[#8AB4F8]">{p.age}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── EDUCATION + HEARTBEATS + WORKING DAYS ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 bg-[#E8F0FE] border border-[#D2E3FC] rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap size={16} className="text-[#1A73E8]" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1A73E8]">Typical Education Stage</h3>
                  </div>
                  {calc.school.eligibleFor.length > 0 ? (
                    <div className="space-y-1.5">
                      {calc.school.eligibleFor.map(s => (
                        <div key={s} className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-[#1A73E8] flex-none" />
                          <span className="font-bold text-[#1A73E8] text-sm">{s}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="font-bold text-[#1A73E8] text-sm">Not yet school age</div>
                  )}
                </div>

                <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-2xl text-center shadow-sm flex flex-col justify-center">
                  <HeartPulse className="mx-auto text-[#C5221F] mb-2" size={24} />
                  <div className="text-2xl font-black text-[#C5221F]">{(calc.biological.beats / 1e9).toFixed(2)}B</div>
                  <div className="text-[10px] font-bold text-[#C5221F] opacity-80 uppercase tracking-wider mt-1">Heartbeats</div>
                  <div className="text-[10px] text-[#70757A] font-bold mt-2 border-t border-[#FAD2CF] pt-2">Estimated at 72 bpm average resting rate</div>
                </div>

                <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={16} className="text-[#5F6368]" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#5F6368]">Estimated Working Days</h3>
                  </div>
                  <div className="text-2xl font-black text-[#202124]">{calc.workingDays.businessDays.toLocaleString()}</div>
                  <div className="text-[11px] text-[#70757A] font-bold mt-1.5">Weekends: {calc.workingDays.weekends.toLocaleString()}</div>
                  <div className="text-[10px] text-[#9AA0A6] mt-1">Excludes weekends. Public holiday schedules vary by country.</div>
                </div>
              </div>

              {/* ── RETIREMENT PLANNER ── */}
              <div className="rounded-2xl border border-[#DADCE0] shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowRetirementCard(v => !v)}
                  className="w-full flex justify-between items-center px-6 py-4 bg-white hover:bg-[#F8F9FA] transition-colors"
                  aria-expanded={showRetirementCard}
                  aria-controls="retirement-panel"
                >
                  <div className="flex items-center gap-3">
                    <CalendarDays size={18} className="text-[#34A853]" />
                    <span className="text-sm font-black uppercase tracking-widest text-[#202124]">Retirement Planner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!showRetirementCard && <span className="text-[11px] text-[#5F6368] font-bold">Click to expand</span>}
                    {showRetirementCard ? <ChevronUp size={18} className="text-[#5F6368]" /> : <ChevronDown size={18} className="text-[#5F6368]" />}
                  </div>
                </button>
                {showRetirementCard && (
                  <div id="retirement-panel" className="px-6 pb-6 bg-white border-t border-[#F1F3F4]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#5F6368] block mb-1.5">Country / Region</label>
                          <select
                            value={useCustomRetirement ? '__custom__' : country}
                            onChange={e => {
                              if (e.target.value === '__custom__') {
                                update({ useCustomRetirement: true });
                              } else {
                                update({ country: e.target.value, useCustomRetirement: false, customRetirementAge: COUNTRY_RETIREMENT[e.target.value] ?? 65 });
                              }
                            }}
                            className="w-full border border-[#DADCE0] rounded-lg px-3 py-2 text-sm font-bold text-[#3C4043] bg-[#F8F9FA] outline-none focus:border-[#1A73E8]"
                          >
                            <option value="">🌍 International Default (65)</option>
                            {COUNTRIES.sort().map(c => <option key={c} value={c}>{c} ({COUNTRY_RETIREMENT[c]})</option>)}
                            <option value="__custom__">✏️ Custom Age</option>
                          </select>
                        </div>
                        {useCustomRetirement && (
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#5F6368] block mb-1.5">Custom Retirement Age</label>
                            <input
                              type="number"
                              min={40} max={90}
                              value={customRetirementAge}
                              onChange={e => update({ customRetirementAge: parseInt(e.target.value) || 65 })}
                              className="w-full border-2 border-[#1A73E8] rounded-lg px-3 py-2 text-lg font-black text-[#202124] outline-none"
                            />
                          </div>
                        )}
                      </div>
                      <div className="bg-[#F8F9FA] rounded-xl p-5 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-[#5F6368] font-bold">Retirement Age</span>
                          <span className="font-black text-[#202124]">{calc.effectiveRetirementAge} Years</span>
                        </div>
                        <div className="flex justify-between border-t border-[#DADCE0] pt-3">
                          <span className="text-sm text-[#5F6368] font-bold">Expected Date</span>
                          <span className="font-black text-[#202124]">{calc.retirement.expectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        {!calc.retirement.hasRetired ? (
                          <div className="flex justify-between border-t border-[#DADCE0] pt-3">
                            <span className="text-sm text-[#5F6368] font-bold">Time Remaining</span>
                            <span className="font-black text-[#202124]">{calc.retirement.yearsRemaining} yrs {calc.retirement.monthsRemaining} mo</span>
                          </div>
                        ) : (
                          <div className="border-t border-[#DADCE0] pt-3 text-center font-black text-[#34A853] text-sm">✓ You have reached retirement age!</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── SHARE / ACTION BAR ── */}
              <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl">
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => {
                      const text = `Age: ${calc.exact.years} Years, ${calc.exact.months} Months, ${calc.exact.days} Days\nTotal Days: ${calc.total.days.toLocaleString()}\nTotal Hours: ${calc.total.hours.toLocaleString()}\nNext Birthday: ${calc.bday.daysRemaining === 0 ? 'Today!' : calc.bday.daysRemaining + ' days away'}\n\nCalculated at ${typeof window !== 'undefined' ? window.location.host : 'nepacalc.com'}`;
                      navigator.clipboard.writeText(text).then(() => { setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); });
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#DADCE0] text-[#3C4043] rounded-xl text-xs font-black hover:bg-[#E8F0FE] hover:border-[#1A73E8] hover:text-[#1A73E8] transition-colors shadow-sm active:scale-95"
                  >
                    <Copy size={14} /> {copySuccess ? '✓ Copied!' : 'Copy Result'}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#DADCE0] text-[#3C4043] rounded-xl text-xs font-black hover:bg-[#F8F9FA] transition-colors shadow-sm active:scale-95"
                  >
                    <Printer size={14} /> Print
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: 'My Age Calculation', text: `I am ${calc.exact.years} Years, ${calc.exact.months} Months, ${calc.exact.days} Days old.`, url: window.location.href }).catch(() => {});
                      } else {
                        const url = new URL(window.location.href);
                        url.searchParams.set('dob', dob);
                        if (targetDate) url.searchParams.set('ref', targetDate);
                        navigator.clipboard.writeText(url.toString());
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#DADCE0] text-[#3C4043] rounded-xl text-xs font-black hover:bg-[#F8F9FA] transition-colors shadow-sm active:scale-95"
                  >
                    <Share2 size={14} /> Share
                  </button>
                  <button
                    onClick={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('dob', dob);
                      if (targetDate) url.searchParams.set('ref', targetDate);
                      navigator.clipboard.writeText(url.toString());
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#DADCE0] text-[#3C4043] rounded-xl text-xs font-black hover:bg-[#F8F9FA] transition-colors shadow-sm active:scale-95"
                  >
                    <LinkIcon size={14} /> Copy Link
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      }
    />
  );
}
