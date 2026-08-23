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
        <div className="mt-12 bg-white rounded-lg p-6 sm:p-10 shadow-sm border border-[#DADCE0] prose prose-slate max-w-none prose-headings:font-black prose-h2:text-2xl prose-h3:text-lg prose-a:text-[#1A73E8]">
          <h2 id="how-to-convert">How to Convert BS to AD and AD to BS</h2>
          <p>NepaCalc supports conversion in both directions. Select BS to AD to convert a Nepali Bikram Sambat date into its Gregorian equivalent, or select AD to BS to find the corresponding Nepali date.</p>
          
          <h3 id="convert-bs-to-ad">Convert BS to AD</h3>
          <p>Select the Bikram Sambat year, month, and day in the BS to AD converter. The calculator returns the corresponding Gregorian date automatically.</p>
          
          <h3 id="convert-ad-to-bs">Convert AD to BS</h3>
          <p>Select the Gregorian year, month, and day in the AD to BS converter. NepaCalc calculates the corresponding Bikram Sambat date automatically.</p>

          <h3 id="why-exact-date-matters">Why Exact Date Conversion Matters</h3>
          <p>BS and AD are different calendar systems, so the exact relationship between a date in one calendar and a date in the other depends on the calendar date rather than a single fixed year difference. For documents, records, applications, birthdays, and other important dates, use an exact date conversion instead of a rough year-only calculation.</p>

          <h2 id="how-dates-work">How BS and AD Dates Work</h2>
          <h3 id="bikram-sambat">Bikram Sambat (BS)</h3>
          <p>Bikram Sambat is the calendar system used for Nepal's civil dates. Nepali dates are commonly written with the BS year, month, and day, and the calendar year begins at a different point in the year from the Gregorian calendar.</p>

          <h3 id="gregorian-calendar">Gregorian Calendar (AD)</h3>
          <p>The Gregorian calendar is the calendar system used internationally for most civil and administrative dates. NepaCalc uses Gregorian AD dates as the corresponding conversion system for BS dates.</p>

          <h3 id="variable-months">Nepali Months and Variable Month Lengths</h3>
          <p>Nepali months do not all have the same number of days. The number of days in a month can vary by year, which is one reason an exact BS to AD conversion should use the complete date rather than a fixed year-offset formula.</p>

          <h2 id="bs-to-ad-conversion">BS to AD Conversion</h2>
          <h3 id="quick-approximation">Quick BS to AD Approximation</h3>
          <p>A rough year comparison is sometimes used for mental estimates because Bikram Sambat is approximately 56–57 years ahead of the Gregorian calendar. However, this is only an approximation and should not be used as the exact conversion method.</p>

          <h3 id="why-formula-not-exact">Why a Simple Year Formula Is Not Exact</h3>
          <p>A BS year cannot be converted accurately to AD by subtracting one fixed number from the year. The corresponding Gregorian date depends on the specific BS month and day. Nepali calendar months also have variable lengths, so exact conversion requires a date-based calendar calculation.</p>

          <h2 id="today">Today's Nepali Date</h2>
          <p>Today in AD: {todayAD}</p>
          <p>Today in BS: {todayBS}</p>

          <h2 id="historical-conversion">Historical Date Conversion</h2>
          <p>You can use the converter for historical dates as long as the selected date is within the supported range of the conversion system. Historical conversion is useful for birth dates, older records, applications, family records, documents, and research.</p>
          <p>If you need to calculate the time between two dates, use our <Link href="/calculator/date-duration/">Date Duration Calculator</Link>.</p>
          <p>For age calculations based on a date of birth, use the <Link href="/calculator/age-calculator/">Age Calculator</Link>.</p>

          <h2 id="multiple-dates">Need to Convert Multiple Dates?</h2>
          <p>Need to convert several dates at once? Use our <Link href="/calculator/nepali-date/bulk/">Bulk Nepali Date Converter</Link> to convert multiple BS and AD dates in one place.</p>

          <h2 id="faqs">Frequently Asked Questions</h2>
          <h3 id="faq-bs">What is Bikram Sambat?</h3>
          <p>Bikram Sambat (BS) is the calendar system used for Nepal's civil dates.</p>

          <h3 id="faq-diff">What is the difference between BS and AD?</h3>
          <p>BS and AD are different calendar systems. The same day has a different year, month, and date representation in each system.</p>
          
          <h3 id="faq-how-bs-ad">How do I convert BS to AD?</h3>
          <p>Select the BS year, month, and day in the BS to AD converter and the corresponding Gregorian date will be calculated for you.</p>

          <h3 id="faq-how-ad-bs">How do I convert AD to BS?</h3>
          <p>Select the Gregorian year, month, and day in the AD to BS converter to obtain the corresponding BS date.</p>

          <h3 id="faq-historical">Can I convert historical BS dates?</h3>
          <p>Yes, provided the selected date is within the range supported by the NepaCalc conversion system.</p>

          <h3 id="faq-subtract-years">Why can't I simply subtract 56 or 57 years?</h3>
          <p>A fixed year subtraction is only an approximation. Exact conversion depends on the complete date because the BS and Gregorian calendars do not align by a constant number of years for every date.</p>

          <h3 id="faq-bulk">Can I convert multiple dates at once?</h3>
          <p>Yes. Use the <Link href="/calculator/nepali-date/bulk/">Bulk Nepali Date Converter</Link> to process multiple dates together.</p>

          <h2 id="official-reference">Official Calendar Reference</h2>
          <p>For official Panchanga and calendar-related information in Nepal, consult the <a href="https://npns.gov.np/" target="_blank" rel="noopener noreferrer">Nepal Panchanga Nirnayak Development Committee</a>, under the Ministry of Culture, Tourism and Civil Aviation, Government of Nepal.</p>
        </div>
      }
    />
  );
}

