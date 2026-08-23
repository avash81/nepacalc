'use client';
import { useState, useEffect, useMemo } from 'react';
import NepaliDate from 'nepali-date-converter';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { NepaliDatePageHeader } from '@/components/calculator/NepaliDatePageHeader';
import Link from 'next/link';
import { 
  Calendar, RefreshCw, Clock, MapPin, Info
} from 'lucide-react';

const DEFAULT_STATE = { tab: 'ad2bs' as 'ad2bs'|'bs2ad', inputDate: '' };

function convertADtoBS(s: string): string | null {
  try { 
    const d = new Date(s); 
    if (isNaN(d.getTime())) return null; 
    return new NepaliDate(d).format('YYYY-MM-DD'); 
  } catch { 
    return null; 
  }
}

function convertBStoAD(s: string): string | null {
  try { 
    const [y,m,d] = s.split('-').map(Number); 
    if (isNaN(y)||isNaN(m)||isNaN(d)) return null; 
    const date = new NepaliDate(y, m-1, d).toJsDate();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  } catch { 
    return null; 
  }
}

const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAYS_NP = ['आइतबार','सोमबार','मंगलबार','बुधबार','बिहीबार','शुक्रबार','शनिबार'];
const bsYears = Array.from({ length: 131 }, (_, i) => 1970 + i);
const adYears = Array.from({ length: 131 }, (_, i) => 1913 + i);
const bsMonthsList = [
  { n: 1, label: 'Baisakh' }, { n: 2, label: 'Jestha' }, { n: 3, label: 'Ashar' }, { n: 4, label: 'Shrawan' }, { n: 5, label: 'Bhadra' }, { n: 6, label: 'Ashwin' },
  { n: 7, label: 'Kartik' }, { n: 8, label: 'Mangsir' }, { n: 9, label: 'Poush' }, { n: 10, label: 'Magh' }, { n: 11, label: 'Falgun' }, { n: 12, label: 'Chaitra' }
];
const adMonthsList = [
  { n: 1, label: 'January' }, { n: 2, label: 'February' }, { n: 3, label: 'March' }, { n: 4, label: 'April' }, { n: 5, label: 'May' }, { n: 6, label: 'June' },
  { n: 7, label: 'July' }, { n: 8, label: 'August' }, { n: 9, label: 'September' }, { n: 10, label: 'October' }, { n: 11, label: 'November' }, { n: 12, label: 'December' }
];

export default function NepaliDateConverter() {
  const [state, setState] = useSyncState('nepali_date_v5', DEFAULT_STATE);
  const { tab, inputDate } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const [todayAD, setTodayAD] = useState('');
  const [todayBS, setTodayBS] = useState('');

  useEffect(() => {
    const now = new Date();
    const t = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const bs = new NepaliDate(now).format('YYYY-MM-DD');
    setTodayAD(t); 
    setTodayBS(bs);
    if (!inputDate) update({ inputDate: t });
  }, []);

  const handleTabChange = (newTab: 'ad2bs' | 'bs2ad') => {
    if (newTab === tab) return;
    let nextDate = inputDate;
    if (newTab === 'bs2ad') nextDate = convertADtoBS(inputDate) || todayBS;
    else nextDate = convertBStoAD(inputDate) || todayAD;
    update({ tab: newTab, inputDate: nextDate });
  };

  const result = useMemo(() => {
    if (!inputDate) return null;
    let converted = '', dayIndex = 0;
    if (tab === 'ad2bs') {
      converted = convertADtoBS(inputDate) || '';
      const d = new Date(inputDate); 
      if (!isNaN(d.getTime())) dayIndex = d.getDay();
    } else {
      converted = convertBStoAD(inputDate) || '';
      try { 
        const [y,m,d] = inputDate.split('-').map(Number); 
        dayIndex = new NepaliDate(y, m-1, d).getDay(); 
      } catch { 
        dayIndex = 0; 
      }
    }
    if (!converted) return null;
    const targetAD = tab === 'ad2bs' ? inputDate : converted;
    const diffDays = Math.round((new Date(targetAD).getTime() - new Date(todayAD).getTime()) / 86400000);
    return { date: converted, dayEn: DAYS_EN[dayIndex], dayNp: DAYS_NP[dayIndex], diffDays };
  }, [inputDate, tab, todayAD]);

  const handleDatePartChange = (part: 'y'|'m'|'d', val: string) => {
    const [y, m, d] = inputDate.split('-');
    if (part === 'y') update({ inputDate: `${val}-${m}-${d}` });
    if (part === 'm') update({ inputDate: `${y}-${val.padStart(2, '0')}-${d}` });
    if (part === 'd') update({ inputDate: `${y}-${m}-${val.padStart(2, '0')}` });
  };

  const [inputY, inputM, inputD] = useMemo(() => {
    const parts = inputDate.split('-');
    return [parts[0] || '2026', parts[1] || '01', parts[2] || '01'];
  }, [inputDate]);

  return (
    <ModernCalcLayout
      slug="nepali-date"
      crumbs={[]}
      hideH1={true}
      title="Nepali Date Converter"
      description="Convert dates between Bikram Sambat (BS) and the Gregorian (AD) calendar. Use NepaCalc to convert BS to AD or AD to BS for any supported date."
      icon={Calendar}
      intro={<NepaliDatePageHeader currentPage="single" />}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Conversion Direction</label>
               <div className="grid grid-cols-2 gap-3">
                {[ { key: 'ad2bs', label: 'AD To BS' }, { key: 'bs2ad', label: 'BS To AD' } ].map(t => (
                  <button 
                    key={t.key} 
                    onClick={() => handleTabChange(t.key as any)} 
                    className={`h-11 rounded-md border text-[11px] font-black uppercase transition-all ${tab === t.key ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    {t.label}
                  </button>
                ))}
               </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">
                {tab === 'ad2bs' ? 'Enter AD Date' : 'Enter BS Date'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                 <select value={inputY} onChange={e => handleDatePartChange('y', e.target.value)} className="w-full h-12 px-3 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none appearance-none cursor-pointer">
                   {(tab === 'ad2bs' ? adYears : bsYears).map(y => <option key={y} value={y}>{y}</option>)}
                 </select>
                 <select value={inputM} onChange={e => handleDatePartChange('m', e.target.value)} className="w-full h-12 px-3 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none appearance-none cursor-pointer">
                   {(tab === 'ad2bs' ? adMonthsList : bsMonthsList).map(m => <option key={m.n} value={String(m.n).padStart(2, '0')}>{m.label}</option>)}
                 </select>
                 <select value={inputD} onChange={e => handleDatePartChange('d', e.target.value)} className="w-full h-12 px-3 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none appearance-none cursor-pointer">
                   {Array.from({ length: 32 }, (_, i) => i + 1).map(d => (
                     <option key={d} value={String(d).padStart(2, '0')}>{d}</option>
                   ))}
                 </select>
              </div>
            </div>

            
          </div>
          <button 
            onClick={() => update({ inputDate: tab === 'ad2bs' ? todayAD : todayBS })}
            className="w-full h-12 bg-[#F1F3F4] hover:bg-[#DADCE0] text-[#5F6368] text-sm font-bold uppercase tracking-widest rounded-md transition-colors"
          >
             Reset to Present
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-4">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Converted Date</div>
             <div className="text-5xl font-black text-[#1A73E8] font-mono tracking-tight">{result?.date || '--'}</div>
             <div className="flex justify-center gap-3">
                <span className="px-4 py-1.5 bg-white rounded-full text-[11px] font-black text-[#202124] uppercase border border-[#DADCE0] shadow-sm">
                   {result?.dayNp || '--'}
                </span>
                <span className="px-4 py-1.5 bg-white rounded-full text-[11px] font-black text-[#5F6368] uppercase border border-[#DADCE0] shadow-sm">
                   {result?.dayEn || '--'}
                </span>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-md p-6 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F1F3F4] rounded-md"><Clock className="w-4 h-4 text-[#5F6368]" /></div>
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Days from Today</span>
             </div>
             <span className="text-lg font-black text-[#202124] font-mono">
                {result?.diffDays === 0 ? 'PRESENT' : result && result.diffDays > 0 ? `+${result.diffDays} DAYS` : result ? `-${Math.abs(result.diffDays)} DAYS` : '--'}
             </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Today (AD)</div>
                <div className="text-sm font-black text-[#202124] font-mono">{todayAD}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Today (BS)</div>
                <div className="text-sm font-black text-[#202124] font-mono">{todayBS}</div>
             </div>
          </div>
        </div>
      }
      seoContent={
        <div className="mt-12 bg-white rounded-lg p-6 sm:p-10 shadow-sm border border-[#DADCE0]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
            {/* Mobile TOC (Dropdown) */}
            <div className="lg:hidden w-full mb-6">
              <details className="group border border-[#DADCE0] rounded-lg bg-[#F8F9FA] overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-[#202124] list-none">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1A73E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                    Table of Contents
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 border-t border-[#DADCE0] bg-white">
                  <ul className="space-y-3 text-[15px]">
                    <li><a href="#how-to-convert" className="text-[#1A73E8] hover:underline font-medium">How to Convert</a></li>
                    <li><a href="#how-dates-work" className="text-[#1A73E8] hover:underline font-medium">How Dates Work</a></li>
                    <li><a href="#bs-to-ad-conversion" className="text-[#1A73E8] hover:underline font-medium">BS to AD Conversion</a></li>
                    <li><a href="#today" className="text-[#1A73E8] hover:underline font-medium">Today's Date</a></li>
                    <li><a href="#historical-conversion" className="text-[#1A73E8] hover:underline font-medium">Historical Conversion</a></li>
                    <li><a href="#multiple-dates" className="text-[#1A73E8] hover:underline font-medium">Multiple Dates</a></li>
                    <li><a href="#faqs" className="text-[#1A73E8] hover:underline font-medium">FAQs</a></li>
                    <li><a href="#official-reference" className="text-[#1A73E8] hover:underline font-medium">Official Reference</a></li>
                  </ul>
                </div>
              </details>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 max-w-none text-[#3C4043] leading-relaxed space-y-6">
              
              <div>
                <h2 id="how-to-convert" className="text-2xl font-black text-[#202124] mb-4 pb-2 border-b border-[#F1F3F4] scroll-mt-24">How to Convert BS to AD and AD to BS</h2>
                <p className="mb-4">NepaCalc supports conversion in both directions. Select BS to AD to convert a Nepali Bikram Sambat date into its Gregorian equivalent, or select AD to BS to find the corresponding Nepali date.</p>
                
                <h3 id="convert-bs-to-ad" className="text-[19px] font-bold text-[#202124] mt-6 mb-3">Convert BS to AD</h3>
                <p className="mb-4">Select the Bikram Sambat year, month, and day in the BS to AD converter. The calculator returns the corresponding Gregorian date automatically.</p>
                
                <h3 id="convert-ad-to-bs" className="text-[19px] font-bold text-[#202124] mt-6 mb-3">Convert AD to BS</h3>
                <p className="mb-4">Select the Gregorian year, month, and day in the AD to BS converter. NepaCalc calculates the corresponding Bikram Sambat date automatically.</p>

                <h3 id="why-exact-date-matters" className="text-[19px] font-bold text-[#202124] mt-6 mb-3">Why Exact Date Conversion Matters</h3>
                <p className="mb-4">BS and AD are different calendar systems, so the exact relationship between a date in one calendar and a date in the other depends on the calendar date rather than a single fixed year difference. For documents, records, applications, birthdays, and other important dates, use an exact date conversion instead of a rough year-only calculation.</p>
              </div>

              <div>
                <h2 id="how-dates-work" className="text-2xl font-black text-[#202124] mb-4 pb-2 border-b border-[#F1F3F4] scroll-mt-24">How BS and AD Dates Work</h2>
                
                <h3 id="bikram-sambat" className="text-[19px] font-bold text-[#202124] mt-6 mb-3">Bikram Sambat (BS)</h3>
                <p className="mb-4">Bikram Sambat is the calendar system used for Nepal's civil dates. Nepali dates are commonly written with the BS year, month, and day, and the calendar year begins at a different point in the year from the Gregorian calendar.</p>

                <h3 id="gregorian-calendar" className="text-[19px] font-bold text-[#202124] mt-6 mb-3">Gregorian Calendar (AD)</h3>
                <p className="mb-4">The Gregorian calendar is the calendar system used internationally for most civil and administrative dates. NepaCalc uses Gregorian AD dates as the corresponding conversion system for BS dates.</p>

                <h3 id="variable-months" className="text-[19px] font-bold text-[#202124] mt-6 mb-3">Nepali Months and Variable Month Lengths</h3>
                <p className="mb-4">Nepali months do not all have the same number of days. The number of days in a month can vary by year, which is one reason an exact BS to AD conversion should use the complete date rather than a fixed year-offset formula.</p>
              </div>

              <div>
                <h2 id="bs-to-ad-conversion" className="text-2xl font-black text-[#202124] mb-4 pb-2 border-b border-[#F1F3F4] scroll-mt-24">BS to AD Conversion</h2>
                
                <h3 id="quick-approximation" className="text-[19px] font-bold text-[#202124] mt-6 mb-3">Quick BS to AD Approximation</h3>
                <p className="mb-4">A rough year comparison is sometimes used for mental estimates because Bikram Sambat is approximately 56–57 years ahead of the Gregorian calendar. However, this is only an approximation and should not be used as the exact conversion method.</p>

                <h3 id="why-formula-not-exact" className="text-[19px] font-bold text-[#202124] mt-6 mb-3">Why a Simple Year Formula Is Not Exact</h3>
                <p className="mb-4">A BS year cannot be converted accurately to AD by subtracting one fixed number from the year. The corresponding Gregorian date depends on the specific BS month and day. Nepali calendar months also have variable lengths, so exact conversion requires a date-based calendar calculation.</p>
              </div>

              <div>
                <h2 id="today" className="text-2xl font-black text-[#202124] mb-4 pb-2 border-b border-[#F1F3F4] scroll-mt-24">Today's Nepali Date</h2>
                <div className="bg-[#F8F9FA] p-4 rounded-md border border-[#DADCE0] mb-4">
                  <p className="mb-1"><strong>Today in AD:</strong> {todayAD}</p>
                  <p className="mb-0"><strong>Today in BS:</strong> {todayBS}</p>
                </div>
              </div>

              <div>
                <h2 id="historical-conversion" className="text-2xl font-black text-[#202124] mb-4 pb-2 border-b border-[#F1F3F4] scroll-mt-24">Historical Date Conversion</h2>
                <p className="mb-4">You can use the converter for historical dates as long as the selected date is within the supported range of the conversion system. Historical conversion is useful for birth dates, older records, applications, family records, documents, and research.</p>
                <p className="mb-4">If you need to calculate the time between two dates, use our <Link href="/calculator/date-duration/" className="text-[#1A73E8] hover:underline font-medium">Date Duration Calculator</Link>.</p>
                <p className="mb-4">For age calculations based on a date of birth, use the <Link href="/calculator/age-calculator/" className="text-[#1A73E8] hover:underline font-medium">Age Calculator</Link>.</p>
              </div>

              <div>
                <h2 id="multiple-dates" className="text-2xl font-black text-[#202124] mb-4 pb-2 border-b border-[#F1F3F4] scroll-mt-24">Need to Convert Multiple Dates?</h2>
                <p className="mb-4">Need to convert several dates at once? Use our <Link href="/calculator/nepali-date/bulk/" className="text-[#1A73E8] hover:underline font-medium">Bulk Nepali Date Converter</Link> to convert multiple BS and AD dates in one place.</p>
              </div>

              <div>
                <h2 id="faqs" className="text-2xl font-black text-[#202124] mb-4 pb-2 border-b border-[#F1F3F4] scroll-mt-24">Frequently Asked Questions</h2>
                
                <h3 id="faq-bs" className="text-[19px] font-bold text-[#202124] mt-6 mb-2">What is Bikram Sambat?</h3>
                <p className="mb-4">Bikram Sambat (BS) is the calendar system used for Nepal's civil dates.</p>

                <h3 id="faq-diff" className="text-[19px] font-bold text-[#202124] mt-6 mb-2">What is the difference between BS and AD?</h3>
                <p className="mb-4">BS and AD are different calendar systems. The same day has a different year, month, and date representation in each system.</p>
                
                <h3 id="faq-how-bs-ad" className="text-[19px] font-bold text-[#202124] mt-6 mb-2">How do I convert BS to AD?</h3>
                <p className="mb-4">Select the BS year, month, and day in the BS to AD converter and the corresponding Gregorian date will be calculated for you.</p>

                <h3 id="faq-how-ad-bs" className="text-[19px] font-bold text-[#202124] mt-6 mb-2">How do I convert AD to BS?</h3>
                <p className="mb-4">Select the Gregorian year, month, and day in the AD to BS converter to obtain the corresponding BS date.</p>

                <h3 id="faq-historical" className="text-[19px] font-bold text-[#202124] mt-6 mb-2">Can I convert historical BS dates?</h3>
                <p className="mb-4">Yes, provided the selected date is within the range supported by the NepaCalc conversion system.</p>

                <h3 id="faq-subtract-years" className="text-[19px] font-bold text-[#202124] mt-6 mb-2">Why can't I simply subtract 56 or 57 years?</h3>
                <p className="mb-4">A fixed year subtraction is only an approximation. Exact conversion depends on the complete date because the BS and Gregorian calendars do not align by a constant number of years for every date.</p>

                <h3 id="faq-bulk" className="text-[19px] font-bold text-[#202124] mt-6 mb-2">Can I convert multiple dates at once?</h3>
                <p className="mb-4">Yes. Use the <Link href="/calculator/nepali-date/bulk/" className="text-[#1A73E8] hover:underline font-medium">Bulk Nepali Date Converter</Link> to process multiple dates together.</p>
              </div>

              <div>
                <h2 id="official-reference" className="text-2xl font-black text-[#202124] mb-4 pb-2 border-b border-[#F1F3F4] scroll-mt-24">Official Calendar Reference</h2>
                <p className="mb-4">For official Panchanga and calendar-related information in Nepal, consult the <a href="https://npns.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-medium">Nepal Panchanga Nirnayak Development Committee</a>, under the Ministry of Culture, Tourism and Civil Aviation, Government of Nepal.</p>
              </div>
            </div>

            {/* Desktop TOC (Sticky Sidebar) */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] p-6 shadow-sm">
                <h4 className="text-[13px] font-black text-[#5F6368] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                  Table of Contents
                </h4>
                <nav>
                  <ul className="space-y-3 text-[14px]">
                    <li><a href="#how-to-convert" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">How to Convert</a></li>
                    <li><a href="#how-dates-work" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">How Dates Work</a></li>
                    <li><a href="#bs-to-ad-conversion" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">BS to AD Conversion</a></li>
                    <li><a href="#today" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">Today's Date</a></li>
                    <li><a href="#historical-conversion" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">Historical Conversion</a></li>
                    <li><a href="#multiple-dates" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">Multiple Dates</a></li>
                    <li><a href="#faqs" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">FAQs</a></li>
                    <li><a href="#official-reference" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">Official Reference</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

