'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import {
  Calendar, Clock, RotateCcw, ArrowRightLeft, Share2, Printer, FileText, Copy,
  CalendarDays, Globe, Stars, Users, Briefcase, GraduationCap, HeartPulse,
  CheckCircle2, Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';
import { useSyncState } from '@/hooks/useSyncState';
import {
  calculateExactAge, calculateTotalAge, calculateBiologicalStats, getSchoolAge,
  getLifeStage, getRetirementAge, calculateWorkingDays,
  getBirthdayDetails, calculateLeapYears, getGeneration, calculatePlanetAges,
  getWesternZodiac, getChineseZodiac, getTimeline
} from './engine';

const DEFAULT_STATE = {
  mode: 'standard',
  dob: '', targetDate: '',
  person1Dob: '', person2Dob: '',
  includeEndDate: false, excludeWeekends: false,
  country: 'United States'
};

const COUNTRIES = ['United States', 'Nepal', 'India', 'United Kingdom', 'Canada', 'Australia', 'Japan'];

// ─── Production Content — Phase 4 Global SEO Rebuild ──────────────────────────




// ─── Production Content — Phase 5-8 Global SEO, AEO & Entity Rebuild ──────────────────────────

const AGE_CALC_FAQS = [
  { question: 'What is an age calculator?', answer: 'An age calculator determines the exact amount of time between your birth date and another selected date.' },
  { question: 'How is age calculated?', answer: 'Age is calculated by subtracting the birth date from the comparison date while considering leap years and varying month lengths.' },
  { question: 'How do I calculate my age?', answer: 'Enter your date of birth and select a comparison date. The calculator automatically computes your exact age.' },
  { question: 'Is this calculator accurate?', answer: 'Yes. It automatically considers leap years, calendar rules, and different month lengths.' },
  { question: 'Can I calculate future age?', answer: 'Yes. Choose any future comparison date to determine your future age.' },
  { question: 'Can I calculate past age?', answer: 'Yes. Select any previous date to calculate your age at that point in time.' },
  { question: 'Can I calculate age from date of birth?', answer: 'Yes. The calculator uses your exact date of birth to find your current chronological age.' },
  { question: 'Can I calculate my age in months?', answer: 'Yes. The calculator provides total months lived.' },
  { question: 'Can I calculate my age in weeks?', answer: 'Yes. The calculator provides total weeks lived.' },
  { question: 'Can I calculate my age in days?', answer: 'Yes. The calculator provides total days lived.' },
  { question: 'How many days have I been alive?', answer: 'The calculator automatically displays your total days lived in the results section.' },
  { question: 'What is my exact age?', answer: 'The calculator shows your precise age in years, months, and days.' },
  { question: 'Can I calculate my age in hours?', answer: 'Yes. Hours are calculated automatically.' },
  { question: 'Does NepaCalc store my birth date?', answer: 'No. All calculations are performed instantly without storing your personal information.' },
  { question: 'Is my data private?', answer: 'Yes. All age calculations happen securely in your browser and no personal data is stored on our servers.' }
];

const AGE_CALC_SEO_CONTENT = (
  <article className="space-y-14 text-[#3C4043]" id="article">
    {/* Schemas Injected Directly */}
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
        "Calculate age in years",
        "Calculate age in months",
        "Calculate age in weeks",
        "Calculate age in days",
        "Calculate age in hours",
        "Calculate age in minutes",
        "Calculate age in seconds",
        "Leap year support",
        "Future age calculation",
        "Past age calculation"
      ]
    })}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "NepaCalc Age Calculator",
      "browserRequirements": "Requires JavaScript",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "url": "https://nepacalc.com/calculator/age-calculator/"
    })}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": "https://nepacalc.com/calculator/age-calculator/#article",
      "headline": "Age Calculator – Calculate Exact Age in Years, Months and Days",
      "description": "Learn how age is calculated and use the free NepaCalc Age Calculator.",
      "author": { "@type": "Organization", "name": "NepaCalc" },
      "publisher": { "@id": "https://nepacalc.com/#organization" },
      "mainEntityOfPage": "https://nepacalc.com/calculator/age-calculator/",
      "datePublished": "2026-07-15",
      "dateModified": new Date().toISOString().split('T')[0],
      "image": "https://nepacalc.com/images/age-calculator.webp"
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
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "contentUrl": "https://nepacalc.com/images/age-calculator.webp",
      "caption": "Calculate your exact age instantly from your date of birth.",
      "name": "Age Calculator — Calculate Exact Age in Years Months Days",
      "description": "Age Calculator showing exact age in years, months and days.",
      "width": "1200",
      "height": "630"
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
        Age is calculated by measuring the precise time elapsed between a person's birth date and a chosen comparison date. 
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
      <p className="text-sm leading-relaxed text-[#5F6368] mb-4">
        Knowing your exact chronological age is critical for official documentation. By relying on exact arithmetic rather than estimates, an Exact Age Calculator prevents costly errors on legal documents.
      </p>
    </section>

    <section id="key-highlights" aria-labelledby="key-highlights-title">
      <h2 id="key-highlights-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">Key Highlights</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
        {[
          'Calculate exact age instantly',
          'Age in years, months and days',
          'Total days lived',
          'Total weeks lived',
          'Total months lived',
          'Total hours lived',
          'Total minutes lived',
          'Total seconds lived',
          'Automatic leap year calculation',
          'Supports any past or future date',
          'Works worldwide',
          'Free and unlimited'
        ].map((feature, i) => (
          <li key={i} className="flex items-center gap-3 p-3 bg-white border border-[#DADCE0] rounded-xl">
            <span className="w-2 h-2 rounded-full bg-[#1A73E8] shrink-0" aria-hidden="true" />
            <span className="text-sm font-bold text-[#3C4043]">{feature}</span>
          </li>
        ))}
              <li>Tax filing</li>
        <li>Pension eligibility</li>
        <li>Military recruitment</li>
        <li>Driver's license eligibility</li>
      </ul>
      <p className="text-sm leading-relaxed text-[#5F6368] mt-4">
        Our Online Age Calculator handles all time interval math seamlessly so you don't have to manually count leap days.
      </p>
    </section>

    <section id="how-works" aria-labelledby="how-works-title">
      <h2 id="how-works-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">How the Age Calculator Works</h2>
      <div className="space-y-4">
        <div className="flex gap-4 items-start p-4 bg-white border border-[#DADCE0] rounded-xl">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold">1</div>
          <p className="text-sm text-[#5F6368] mt-1.5"><strong className="text-[#202124]">Step 1:</strong> Enter your date of birth.</p>
        </div>
        <div className="flex gap-4 items-start p-4 bg-white border border-[#DADCE0] rounded-xl">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold">2</div>
          <p className="text-sm text-[#5F6368] mt-1.5"><strong className="text-[#202124]">Step 2:</strong> Select the comparison date (today by default).</p>
        </div>
        <div className="flex gap-4 items-start p-4 bg-white border border-[#DADCE0] rounded-xl">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold">3</div>
          <p className="text-sm text-[#5F6368] mt-1.5"><strong className="text-[#202124]">Step 3:</strong> The calculator automatically compares both dates.</p>
        </div>
        <div className="flex gap-4 items-start p-4 bg-white border border-[#DADCE0] rounded-xl">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold">4</div>
          <p className="text-sm text-[#5F6368] mt-1.5"><strong className="text-[#202124]">Step 4:</strong> Leap years and varying month lengths are included automatically.</p>
        </div>
        <div className="flex gap-4 items-start p-4 bg-white border border-[#DADCE0] rounded-xl">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold">5</div>
          <p className="text-sm text-[#5F6368] mt-1.5"><strong className="text-[#202124]">Step 5:</strong> View your complete age breakdown instantly.</p>
        </div>
      </div>
    </section>

    <section id="worldwide" aria-labelledby="worldwide-title">
      <h2 id="worldwide-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">Worldwide Applications</h2>
      <p className="text-sm text-[#5F6368] mb-4">This Years Months Days Calculator can be used in any country for:</p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-[#5F6368] mb-4" role="list">
        <li>Passport applications</li>
        <li>Visa processing</li>
        <li>Immigration</li>
        <li>School admissions</li>
        <li>University enrollment</li>
        <li>Employment verification</li>
        <li>Retirement planning</li>
        <li>Insurance</li>
        <li>Medical records</li>
        <li>Government documentation</li>
        <li>Legal records</li>
        <li>Birthday planning</li>
        <li>Personal milestones</li>
        <li>Tax filing</li>
        <li>Pension eligibility</li>
        <li>Military recruitment</li>
        <li>Driver's license eligibility</li>
      </ul>
      <p className="text-sm text-[#5F6368] mt-4">
        Planning retirement? Estimate your future savings with our <a href="/calculator/retirement/" className="text-[#1A73E8] hover:underline font-medium">Retirement Savings Calculator</a>.
      </p>
    </section>

    <section id="who-can-use" aria-labelledby="who-can-use-title">
      <h2 id="who-can-use-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">Who Can Use This Calculator?</h2>
      <p className="text-sm text-[#5F6368] mb-3">Suitable for:</p>
      <ul className="flex flex-wrap gap-2 text-sm text-[#5F6368]" role="list">
        {[
          'Students', 'Teachers', 'Parents', 'Employers', 'HR departments',
          'Government offices', 'Lawyers', 'Doctors', 'Hospitals',
          'Insurance companies', 'Immigration consultants', 'Researchers',
          'Individuals verifying their exact age'
        ].map(user => (
          <li key={user} className="px-3 py-1.5 bg-[#E6F4EA] text-[#137333] text-xs font-bold rounded-full">{user}</li>
        ))}
      </ul>
    </section>

    <section id="people-also-ask" aria-labelledby="paa-title">
      <h2 id="paa-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">People Also Ask</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#202124] mb-1">How old am I today?</h3>
          <p className="text-sm text-[#5F6368]">Enter your birth date to instantly calculate your current age.</p>
        </div>
        <div>
          <h3 className="text-base font-bold text-[#202124] mb-1">How many days have I been alive?</h3>
          <p className="text-sm text-[#5F6368]">The calculator automatically displays your total days lived.</p>
        </div>
        <div>
          <h3 className="text-base font-bold text-[#202124] mb-1">How many weeks old am I?</h3>
          <p className="text-sm text-[#5F6368]">The calculator converts your age into total weeks.</p>
        </div>
        <div>
          <h3 className="text-base font-bold text-[#202124] mb-1">How many months old am I?</h3>
          <p className="text-sm text-[#5F6368]">The calculator provides your total completed months.</p>
        </div>
        <div>
          <h3 className="text-base font-bold text-[#202124] mb-1">What is my exact age?</h3>
          <p className="text-sm text-[#5F6368]">The calculator shows your precise age in years, months, and days.</p>
        </div>
      </div>
      <p className="text-sm text-[#5F6368] mt-4">
        Need to calculate working days instead of calendar days? Use the <a href="/calculator/business-days/" className="text-[#1A73E8] hover:underline font-medium">Business Days Calculator</a>.
      </p>
    </section>

    <section aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-2xl font-black text-[#202124] mb-4 mt-8">Frequently Asked Questions</h2>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-4">
        Need to calculate standard time intervals instead? Try our <a href="/calculator/time-calculator/" className="text-[#1A73E8] hover:underline font-medium">Time Calculator</a>.
      </p>
      {/* Note: The main FAQ Accordion is rendered below this content block by the layout */}
    </section>
    
    <section aria-labelledby="related-calcs">
      <h2 id="related-calcs" className="text-2xl font-black text-[#202124] mb-4 mt-8">Related Calculators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/calculator/date-duration/" className="flex flex-col p-4 bg-white border border-[#DADCE0] rounded-xl hover:bg-[#F8F9FA] hover:border-[#1A73E8] transition-colors">
          <span className="text-base font-bold text-[#1A73E8] mb-1">Date Duration Calculator</span>
          <span className="text-sm text-[#5F6368]">Need to calculate the exact duration between two dates?</span>
        </a>
        <a href="/calculator/date-calculator/" className="flex flex-col p-4 bg-white border border-[#DADCE0] rounded-xl hover:bg-[#F8F9FA] hover:border-[#1A73E8] transition-colors">
          <span className="text-base font-bold text-[#1A73E8] mb-1">Date Calculator</span>
          <span className="text-sm text-[#5F6368]">Add or subtract standard days, months, and years from any date.</span>
        </a>
        <a href="/calculator/time-calculator/" className="flex flex-col p-4 bg-white border border-[#DADCE0] rounded-xl hover:bg-[#F8F9FA] hover:border-[#1A73E8] transition-colors">
          <span className="text-base font-bold text-[#1A73E8] mb-1">Time Calculator</span>
          <span className="text-sm text-[#5F6368]">Add or subtract time units like hours, minutes, and seconds.</span>
        </a>
        <a href="/calculator/business-days/" className="flex flex-col p-4 bg-white border border-[#DADCE0] rounded-xl hover:bg-[#F8F9FA] hover:border-[#1A73E8] transition-colors">
          <span className="text-base font-bold text-[#1A73E8] mb-1">Business Days Calculator</span>
          <span className="text-sm text-[#5F6368]">Want to skip weekends and holidays? Count only working days.</span>
        </a>
        <a href="/calculator/week-calculator/" className="flex flex-col p-4 bg-white border border-[#DADCE0] rounded-xl hover:bg-[#F8F9FA] hover:border-[#1A73E8] transition-colors">
          <span className="text-base font-bold text-[#1A73E8] mb-1">Week Calculator</span>
          <span className="text-sm text-[#5F6368]">Calculate the exact number of weeks between two specific dates.</span>
        </a>
        <a href="/calculator/pregnancy-due-date/" className="flex flex-col p-4 bg-white border border-[#DADCE0] rounded-xl hover:bg-[#F8F9FA] hover:border-[#1A73E8] transition-colors">
          <span className="text-base font-bold text-[#1A73E8] mb-1">Pregnancy Due Date Calculator</span>
          <span className="text-sm text-[#5F6368]">Estimate your expected delivery date based on medical standards.</span>
        </a>
      </div>
    </section>

    <section aria-labelledby="data-accuracy">
      <h2 id="data-accuracy" className="text-2xl font-black text-[#202124] mb-4 mt-8">Data Accuracy & Privacy</h2>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-3">
        The NepaCalc Age Calculator strictly follows internationally accepted calculations based on the Gregorian Calendar and automatically adjusts for time interval transitions.
      </p>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-3">
        <strong>Privacy statement:</strong> Your privacy is fully protected. All age calculations are performed directly on your device. We store <strong>no data</strong> on our servers, ensuring your birth date remains entirely confidential.
      </p>
    </section>

    <section aria-labelledby="official-references">
      <h2 id="official-references" className="text-2xl font-black text-[#202124] mb-4 mt-8">Official References</h2>
      <p className="text-sm leading-relaxed text-[#5F6368] mb-3">
        This calculator follows internationally accepted calendar calculations based on the Gregorian Calendar. Source methodologies include:
      </p>
      <ul className="list-disc list-inside text-sm text-[#5F6368] space-y-1">
        <li>ISO 8601 Date Standard</li>
        <li>Gregorian Calendar Rules</li>
        <li>Leap Year Astronomical Calculations</li>
      </ul>
    </section>

    <footer className="mt-12 pt-6 border-t border-[#DADCE0] bg-[#F8F9FA] p-6 rounded-xl space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="font-bold text-[#202124]">Reviewed By</div>
          <div className="text-[#5F6368]">NepaCalc Research Team</div>
        </div>
        <div>
          <div className="font-bold text-[#202124]">Category</div>
          <div className="text-[#5F6368]">Date & Time Calculators</div>
        </div>
        <div>
          <div className="font-bold text-[#202124]">Last Updated</div>
          <div className="text-[#5F6368]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        <div>
          <div className="font-bold text-[#202124]">Calculation Method</div>
          <div className="text-[#5F6368]">Gregorian Calendar</div>
        </div>
      </div>
      <p className="text-sm text-[#5F6368] mt-4 border-t border-[#DADCE0] pt-4">
        Need to track your exact upcoming birthday? Try our <a href="/calculator/birthday-countdown/" className="text-[#1A73E8] hover:underline font-medium">Birthday Countdown Calculator</a>.
      </p>
    </footer>
  </article>
);
export default function AgeCalculator() {
  const [state, setState] = useSyncState('age_v6', DEFAULT_STATE);
  const { mode, dob, targetDate, person1Dob, person2Dob, includeEndDate, excludeWeekends, country } = state;

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
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return { error: 'Invalid dates.' };
      const oldest = d1.getTime() < d2.getTime() ? d1 : d2;
      const youngest = d1.getTime() < d2.getTime() ? d2 : d1;
      const exact = calculateExactAge(oldest, youngest);
      const totalDays = Math.floor((youngest.getTime() - oldest.getTime()) / 86400000);
      return { type: 'compare' as const, exact, totalDays };
    }

    if (!dob || !targetDate) return null;
    const d1 = new Date(dob);
    const d2 = new Date(targetDate);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    let localD2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
    if (includeEndDate) localD2.setDate(localD2.getDate() + 1);
    if (d1.getTime() > localD2.getTime()) return { error: 'Birth date cannot be after reference date.' };

    const exact = calculateExactAge(d1, localD2);
    const total = calculateTotalAge(d1, localD2);
    const bday = getBirthdayDetails(d1, localD2);
    const zodiac = getWesternZodiac(d1);
    const chineseZodiac = getChineseZodiac(d1);
    const gen = getGeneration(d1);
    const lifeStage = getLifeStage(total.years);
    const retirement = getRetirementAge(total.years, country);
    const timeline = getTimeline(total.years, d1, localD2);
    const planets = calculatePlanetAges(total.days);
    const leapYears = calculateLeapYears(d1, localD2);
    const biological = calculateBiologicalStats(total.days);
    const school = getSchoolAge(total.years);
    const workingDays = calculateWorkingDays(d1, localD2);

    return {
      type: 'standard' as const,
      exact, total, bday, zodiac, chineseZodiac, gen, lifeStage, retirement, timeline,
      planets, leapYears, biological, school, workingDays, d1, localD2
    };
  }, [hasCalculated, mode, dob, targetDate, person1Dob, person2Dob, includeEndDate, excludeWeekends, country]);

  const exactSeconds = useMemo(() => {
    if (!calc || 'error' in calc || calc.type !== 'standard') return 0;
    const isTargetToday = targetDate === new Date().toISOString().split('T')[0];
    if (isTargetToday) {
      const msSinceMidnight = now - new Date().setHours(0, 0, 0, 0);
      return calc.total.seconds + Math.floor(msSinceMidnight / 1000);
    }
    return calc.total.seconds;
  }, [calc, now, targetDate]);

  return (
    <ModernCalcLayout
      slug="age-calculator"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Age Calculator' }]}
      title="Age Calculator"
      description="Calculate your exact age instantly in years, months, weeks, days, hours, minutes, and seconds. Perfect for passports, visas, education, employment, retirement planning, insurance, healthcare, legal documents, and personal use worldwide."
      icon={Calendar}
      sidebar={undefined}
      howToUse={{ steps: [
        'Enter your date of birth in the Birth Date field.',
        'The Reference Date defaults to today — change it for past or future calculations.',
        'Toggle Include End Date to count the reference date as a full day.',
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
          <div className="flex rounded-lg p-1 bg-[#F1F3F4]">
            <button onClick={() => update({ mode: 'standard' })} className={`flex-1 py-2 px-3 text-sm font-bold rounded-md transition-colors ${mode === 'standard' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#202124]'}`}>
              Standard Age
            </button>
            <button onClick={() => update({ mode: 'compare' })} className={`flex-1 py-2 px-3 text-sm font-bold rounded-md transition-colors ${mode === 'compare' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#202124]'}`}>
              Compare Ages
            </button>
          </div>

          {/* Date Inputs */}
          <div className="space-y-4">
            {mode === 'standard' ? (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Birth Date</label>
                  <input type="date" value={dob} onChange={e => { update({ dob: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Reference Date</label>
                    <div className="flex gap-2">
                      <button onClick={setToday} className="text-[10px] font-bold text-[#1A73E8] hover:underline">Today</button>
                      <button onClick={swapDates} className="text-[10px] font-bold text-[#5F6368] hover:text-[#202124] flex items-center gap-1">
                        <ArrowRightLeft size={10} /> Swap
                      </button>
                    </div>
                  </div>
                  <input type="date" value={targetDate} onChange={e => { update({ targetDate: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Person 1 Birth Date</label>
                  <input type="date" value={person1Dob} onChange={e => { update({ person1Dob: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-[#5F6368]">Person 2 Birth Date</label>
                  <input type="date" value={person2Dob} onChange={e => { update({ person2Dob: e.target.value }); setHasCalculated(false); }} className="w-full h-14 px-4 border-2 border-[#DADCE0] rounded-xl font-bold text-lg text-[#202124] focus:border-[#1A73E8] focus:ring-0 transition-colors shadow-sm" />
                </div>
              </>
            )}
          </div>

          {/* Options */}
          {mode === 'standard' && (
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-white border border-[#DADCE0] rounded-xl cursor-pointer hover:bg-[#F8F9FA] transition-colors">
                <input type="checkbox" checked={includeEndDate} onChange={e => update({ includeEndDate: e.target.checked })} className="w-5 h-5 text-[#1A73E8] border-[#DADCE0] rounded focus:ring-[#1A73E8]" />
                <span className="text-sm font-bold text-[#3C4043]">Include End Date <span className="font-normal text-[#70757A]">(+1 day)</span></span>
              </label>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button onClick={() => setHasCalculated(true)} className="flex-1 h-14 bg-[#1A73E8] text-white font-black rounded-xl hover:bg-[#1557B0] transition-colors shadow-md hover:shadow-lg text-lg">
              Calculate Age
            </button>
            <button onClick={reset} className="w-14 h-14 bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] rounded-xl flex items-center justify-center hover:bg-[#E8EAED] transition-colors shadow-sm" title="Reset">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {!hasCalculated ? (
            <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 bg-[#F8F9FA] border-2 border-dashed border-[#DADCE0] rounded-2xl">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                {mode === 'standard' ? <Calendar className="text-[#1A73E8]" size={32} /> : <Users className="text-[#1A73E8]" size={32} />}
              </div>
              <h3 className="text-xl font-black text-[#202124] mb-2">{mode === 'standard' ? 'Enter your birth date' : 'Compare two birth dates'}</h3>
              <p className="text-[#5F6368] text-sm max-w-[240px]">Fill in the dates above and press Calculate Age to see comprehensive results.</p>
            </div>
          ) : !calc ? null
          : 'error' in calc ? (
            <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-xl text-center">
              <div className="text-[#C5221F] font-bold">{calc.error}</div>
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
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Primary Age Card */}
              <div className="p-8 bg-white border border-[#DADCE0] rounded-2xl shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F0FE] rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
                <h2 className="text-xs font-black uppercase tracking-widest text-[#5F6368] mb-6 relative z-10">
                  {new Date(targetDate) > new Date() ? 'Age at Future Date' : 'Exact Age'}
                </h2>
                <div className="flex flex-col gap-2 relative z-10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl sm:text-7xl font-black text-[#1A73E8] tracking-tighter leading-none">{calc.exact.years}</span>
                    <span className="text-xl font-bold text-[#5F6368]">Years</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
                    {calc.exact.months} Months, {calc.exact.weeks} Weeks, {calc.exact.days} Days
                  </div>
                </div>
              </div>

              {/* Age Breakdown */}
              <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#5F6368] mb-4">Age Breakdown</h3>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                  <div>
                    <div className="text-[#70757A] text-xs font-bold uppercase mb-1">Age in Months</div>
                    <div className="text-2xl font-black text-[#202124]">{calc.total.months.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[#70757A] text-xs font-bold uppercase mb-1">Age in Weeks</div>
                    <div className="text-2xl font-black text-[#202124]">{calc.total.weeks.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[#70757A] text-xs font-bold uppercase mb-1">Age in Days</div>
                    <div className="text-2xl font-black text-[#202124]">{calc.total.days.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[#70757A] text-xs font-bold uppercase mb-1">Age in Hours</div>
                    <div className="text-2xl font-black text-[#202124]">{calc.total.hours.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[#70757A] text-xs font-bold uppercase mb-1">Age in Minutes</div>
                    <div className="text-2xl font-black text-[#202124]">{calc.total.minutes.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[#E37400] text-xs font-bold uppercase mb-1 flex items-center gap-1">
                      <Clock size={12} className="animate-pulse" /> Age in Seconds (Live)
                    </div>
                    <div className="text-2xl font-black text-[#E37400] font-mono">{exactSeconds.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
      details={
        hasCalculated && calc && !('error' in calc) && calc.type === 'standard' ? (
          <div className="space-y-8 mt-4 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Next Birthday */}
              <div className="p-6 bg-gradient-to-br from-[#E8F0FE] to-[#D2E3FC] border border-[#C5D9F7] rounded-2xl shadow-sm relative overflow-hidden group">
                <Stars className="absolute top-4 right-4 text-[#1A73E8] opacity-20 group-hover:rotate-12 transition-transform duration-500" size={64} />
                <h3 className="text-xs font-black uppercase tracking-widest text-[#1A73E8] mb-4">Next Birthday</h3>
                {calc.bday.daysRemaining === 0 ? (
                  <div className="text-3xl font-black text-[#1A73E8]">Happy Birthday! 🎂</div>
                ) : (
                  <>
                    <div className="text-5xl font-black text-[#1A73E8] mb-1 tracking-tighter">{calc.bday.daysRemaining}</div>
                    <div className="text-sm font-bold text-[#1A73E8] opacity-80 mb-2 uppercase tracking-widest">Days Until Next Birthday</div>
                    <div className="text-sm font-bold text-[#5F6368] mb-2">You have completed {calc.exact.years} birthdays</div>
                  </>
                )}
                <div className="text-[#1A73E8] font-bold bg-white/60 inline-block px-3 py-1.5 rounded-lg text-sm shadow-sm backdrop-blur-sm">
                  {calc.bday.nextBirthday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="mt-4 pt-4 border-t border-[#1A73E8]/20 flex justify-between text-xs font-bold text-[#1A73E8]">
                  <span>{calc.bday.monthsRemaining} Months</span>
                  <span>{calc.bday.weeksRemaining} Weeks</span>
                </div>
              </div>

              {/* Birthday Weekdays */}
              <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#5F6368] mb-4">Birthday Weekdays</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-[#F1F3F4] pb-2">
                    <span className="text-[#5F6368] font-bold text-sm">Born on</span>
                    <span className="text-[#202124] font-black">{calc.bday.bornOnWeekday}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#F1F3F4] pb-2">
                    <span className="text-[#5F6368] font-bold text-sm">Current birthday</span>
                    <span className="text-[#202124] font-black">{calc.bday.currentBirthdayWeekday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5F6368] font-bold text-sm">Next birthday</span>
                    <span className="text-[#202124] font-black">{calc.bday.nextBirthdayWeekday}</span>
                  </div>
                </div>
              </div>

              {/* Zodiac */}
              <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-[#F1F3F4] text-9xl opacity-40">{calc.zodiac.icon}</div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#5F6368] mb-2 relative z-10">Zodiac Sign</h3>
                <div className="flex items-center gap-3 relative z-10 mb-2">
                  <span className="text-4xl">{calc.zodiac.icon}</span>
                  <span className="text-3xl font-black text-[#202124]">{calc.zodiac.sign}</span>
                </div>
                <p className="text-xs font-bold text-[#70757A] relative z-10 mb-1">{calc.zodiac.start} – {calc.zodiac.end}</p>
                <p className="text-sm text-[#5F6368] relative z-10">{calc.zodiac.desc}</p>
              </div>

              {/* Chinese Zodiac */}
              <div className="p-6 bg-[#FEF7E0] border border-[#FDE293] rounded-2xl shadow-sm text-center flex flex-col justify-center">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#E37400] mb-2">Chinese Zodiac</h3>
                <div className="text-3xl font-black text-[#E37400] mb-1">{calc.chineseZodiac.animal}</div>
                <div className="text-sm font-bold text-[#E37400] opacity-80">{calc.chineseZodiac.full}</div>
              </div>

              {/* Generation & Life Stage */}
              <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm flex flex-col gap-4">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#5F6368] mb-1">Generation</h3>
                  <div className="text-2xl font-black text-[#1A73E8]">{calc.gen}</div>
                </div>
                <div className="border-t border-[#F1F3F4] pt-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#5F6368] mb-1">Life Stage</h3>
                  <div className="text-xl font-black text-[#202124]">{calc.lifeStage}</div>
                </div>
              </div>

              {/* Retirement */}
              <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#5F6368]">Retirement</h3>
                  <select value={country} onChange={e => update({ country: e.target.value })} className="text-xs bg-[#F8F9FA] border border-[#DADCE0] rounded px-2 py-1 outline-none text-[#3C4043]">
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="text-3xl font-black text-[#202124] mb-1">Age {calc.retirement.retirementAge}</div>
                <div className="text-sm font-bold text-[#70757A]">
                  {calc.retirement.yearsRemaining > 0
                    ? `${calc.retirement.yearsRemaining.toFixed(1)} Years Remaining`
                    : 'You have reached retirement age.'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Timeline */}
              <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] mb-6">Life Milestones & Timeline</h3>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { val: calc.timeline.olympics, label: 'Olympics' },
                    { val: calc.timeline.fifa, label: 'World Cups' },
                    { val: calc.timeline.decades, label: 'Decades' },
                    { val: calc.leapYears, label: 'Leap Years' },
                  ].map((s, i) => (
                    <div key={i} className="bg-[#F8F9FA] p-3 rounded-lg text-center">
                      <div className="text-2xl font-black text-[#1A73E8]">{s.val}</div>
                      <div className="text-[10px] font-bold text-[#5F6368] uppercase">{s.label}</div>
                    </div>
                  ))}
                </div>
                <ul className="space-y-2">
                  {calc.timeline.milestones.map((m, i) => (
                    <li key={i} className="flex justify-between items-center py-2 border-b border-[#F1F3F4] last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${m.passed ? 'bg-[#34A853]' : 'bg-[#DADCE0]'}`} />
                        <span className="font-bold text-sm text-[#3C4043]">{m.label}</span>
                      </div>
                      <div className="text-xs text-[#70757A]">{m.date.toLocaleDateString()}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {/* Planet Ages */}
                <div className="p-6 bg-[#202124] border border-[#3C4043] rounded-2xl shadow-sm text-white">
                  <div className="flex items-center gap-2 mb-5">
                    <Globe className="text-[#8AB4F8]" size={20} />
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#E8EAED]">Age on Other Planets</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {calc.planets.map(p => (
                      <div key={p.name} className="p-2.5 bg-[#3C4043] rounded-xl text-center">
                        <div className="text-[9px] font-bold text-[#9AA0A6] uppercase tracking-wider mb-1">{p.name}</div>
                        <div className="font-black text-sm text-[#8AB4F8]">{p.age}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Biological + Work Days */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-[#FCE8E6] border border-[#FAD2CF] rounded-2xl text-center">
                    <HeartPulse className="mx-auto text-[#C5221F] mb-2" size={24} />
                    <div className="text-xl font-black text-[#C5221F]">{(calc.biological.beats / 1e9).toFixed(2)}B</div>
                    <div className="text-xs font-bold text-[#C5221F] opacity-80 uppercase">Heartbeats</div>
                  </div>
                  <div className="p-5 bg-white border border-[#DADCE0] rounded-2xl flex flex-col justify-center">
                    <div className="flex items-center gap-1 mb-2">
                      <Briefcase size={14} className="text-[#5F6368]" />
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-[#5F6368]">Work Days</h3>
                    </div>
                    <div className="text-xl font-black text-[#202124]">{calc.workingDays.businessDays.toLocaleString()}</div>
                    <div className="text-xs text-[#70757A] font-bold">Weekends: {calc.workingDays.weekends.toLocaleString()}</div>
                  </div>
                </div>

                {/* School */}
                <div className="p-5 bg-white border border-[#DADCE0] rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap size={16} className="text-[#1A73E8]" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#5F6368]">School Eligibility</h3>
                  </div>
                  <div className="font-bold text-[#1A73E8] text-sm">
                    {calc.school.eligibleFor.length > 0 ? calc.school.eligibleFor.join(' • ') : 'Not yet eligible for school'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-[#DADCE0] print:hidden">
              <button
                onClick={() => navigator.clipboard.writeText(
                  `Age: ${calc.exact.years} Years, ${calc.exact.months} Months, ${calc.exact.days} Days\nAge in Days: ${calc.total.days.toLocaleString()}\nAge in Hours: ${calc.total.hours.toLocaleString()}\n\nGenerated by NepaCalc Age Calculator — https://nepacalc.com/calculator/age-calculator/`
                )}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#DADCE0] text-[#3C4043] rounded-lg text-sm font-bold hover:bg-[#F8F9FA] transition-colors shadow-sm hover:shadow active:scale-95"
              >
                <Copy size={16} /> Copy Summary
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#DADCE0] text-[#3C4043] rounded-lg text-sm font-bold hover:bg-[#F8F9FA] transition-colors shadow-sm hover:shadow active:scale-95">
                <Printer size={16} /> Print Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#DADCE0] text-[#3C4043] rounded-lg text-sm font-bold hover:bg-[#F8F9FA] transition-colors shadow-sm hover:shadow active:scale-95">
                <FileText size={16} /> Download PDF
              </button>
              <button
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.set('dob', dob);
                  url.searchParams.set('ref', targetDate);
                  navigator.clipboard.writeText(url.toString());
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#DADCE0] text-[#3C4043] rounded-lg text-sm font-bold hover:bg-[#F8F9FA] transition-colors shadow-sm hover:shadow active:scale-95"
              >
                <Share2 size={16} /> Share Link
              </button>
            </div>
          </div>
        ) : null
      }
      relatedTools={[
        { label: 'Date Duration Calculator', href: '/calculator/date-duration/' },
        { label: 'Nepali Date Converter', href: '/calculator/nepali-date/' },
        { label: 'Citizenship Age Calculator', href: '/calculator/nepal-citizenship-age/' },
        { label: 'Pregnancy Due Date', href: '/calculator/pregnancy-due-date/' },
      ]}
    />
  );
}
