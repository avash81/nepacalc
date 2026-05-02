'use client';
import { useState, useEffect, useMemo } from 'react';
import NepaliDate from 'nepali-date-converter';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, RefreshCw, Clock, MapPin, Info } from 'lucide-react';

const DEFAULT_STATE = { tab: 'ad2bs' as 'ad2bs'|'bs2ad', inputDate: '' };

function convertADtoBS(s: string): string | null {
  try { const d = new Date(s); if (isNaN(d.getTime())) return null; return new NepaliDate(d).format('YYYY-MM-DD'); } catch { return null; }
}

function convertBStoAD(s: string): string | null {
  try { 
    const [y,m,d] = s.split('-').map(Number); 
    if (isNaN(y)||isNaN(m)||isNaN(d)) return null; 
    const date = new NepaliDate(y, m-1, d).toJsDate();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  } catch { return null; }
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
    setTodayAD(t); setTodayBS(bs);
    if (!inputDate) update({ inputDate: t });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const d = new Date(inputDate); if (!isNaN(d.getTime())) dayIndex = d.getDay();
    } else {
      converted = convertBStoAD(inputDate) || '';
      try { const [y,m,d] = inputDate.split('-').map(Number); dayIndex = new NepaliDate(y, m-1, d).getDay(); } catch { dayIndex = 0; }
    }
    if (!converted) return null;
    const targetAD = tab === 'ad2bs' ? inputDate : converted;
    const diffDays = Math.round((new Date(targetAD).getTime(), new Date(todayAD).getTime()) / 86400000);
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

  const selectCls = "w-full h-12 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all cursor-pointer";

  return (
    <ModernCalcLayout
      slug="nepali-date"
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Nepali Date Converter' }]}
      title="Nepali Date Converter"
      description="Gregorian (AD) to Bikram Sambat (BS) converter with astronomical accuracy for Nepal's official calendar. Syncs seamlessly with IRD standards."
      icon={Calendar}
      inputs={
        <div className="space-y-6">
          <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
            {[ { key: 'ad2bs', label: 'AD To BS' }, { key: 'bs2ad', label: 'BS To AD' } ].map(t => (
              <button key={t.key} onClick={() => handleTabChange(t.key as any)}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${tab === t.key ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">
                {tab === 'ad2bs' ? 'Gregorian Date (AD)' : 'Bikram Sambat (BS)'}
              </label>
              <button onClick={() => handleTabChange(tab === 'ad2bs' ? 'bs2ad' : 'ad2bs')} className="p-1.5 bg-[#E8F0FE] text-[#1A73E8] rounded hover:bg-[#D2E3FC] transition-colors group">
                 <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
               <select value={inputY} onChange={e => handleDatePartChange('y', e.target.value)} className={selectCls}>
                 {(tab === 'ad2bs' ? adYears : bsYears).map(y => <option key={y} value={y}>{y}</option>)}
               </select>
               <select value={inputM} onChange={e => handleDatePartChange('m', e.target.value)} className={selectCls}>
                 {(tab === 'ad2bs' ? adMonthsList : bsMonthsList).map(m => <option key={m.n} value={String(m.n).padStart(2, '0')}>{m.label}</option>)}
               </select>
               <select value={inputD} onChange={e => handleDatePartChange('d', e.target.value)} className={selectCls}>
                 {Array.from({ length: tab === 'ad2bs' ? 31 : 32 }, (_, i) => i + 1).map(d => (
                   <option key={d} value={String(d).padStart(2, '0')}>{d}</option>
                 ))}
               </select>
            </div>
            <button onClick={() => update({ inputDate: tab === 'ad2bs' ? todayAD : todayBS })}
              className="w-full py-2 bg-white border border-[#DADCE0] rounded-md text-[10px] font-bold uppercase tracking-wider text-[#70757A] hover:bg-[#F8F9FA] transition-colors">
              Set to Today
            </button>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#1A1A2E] border border-[#DADCE0] rounded-lg text-center text-white relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-3 py-1 text-[9px] font-black uppercase tracking-wider ${tab==='ad2bs' ? 'bg-[#D93025]':'bg-[#1A73E8]'}`}>
               {tab==='ad2bs'?'CONVERTED TO BS':'CONVERTED TO AD'}
            </div>
            <div className="text-[10px] font-bold uppercase text-white/60 mb-2 tracking-wider">Result</div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4">{result?.date || ', '}</div>
            {result && (
               <div className="flex justify-center items-center gap-3">
                  <div className="text-[11px] font-black text-[#1A73E8] bg-[#E8F0FE] px-3 py-1 rounded uppercase tracking-wider">{result.dayNp}</div>
                  <div className="text-[11px] font-bold text-white/80 uppercase">{result.dayEn}</div>
               </div>
            )}
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <Clock className="w-4 h-4 text-[#70757A]" />
               <div className="text-[10px] font-bold uppercase text-[#70757A] tracking-wider">Relative Time</div>
            </div>
            <span className="text-sm font-black text-[#202124]">
              {result?.diffDays === 0 ? 'Today' : result && result.diffDays > 0 ? `In ${result.diffDays} days` : result ? `${Math.abs(result.diffDays)} days ago` : ', '}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg p-4 text-center">
              <div className="text-[9px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Today (AD)</div>
              <div className="text-sm font-black text-[#202124]">{todayAD}</div>
            </div>
            <div className="bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg p-4 text-center">
              <div className="text-[9px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Today (BS)</div>
              <div className="text-sm font-black text-[#202124]">{todayBS}</div>
            </div>
          </div>
          
          <div className="flex gap-2 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg items-start">
             <Info className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#202124] leading-tight italic">Bikram Sambat is approximately 56 years and 8.5 months ahead of the Gregorian calendar. This calculation relies on precise Panchanga data.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision Date Conversion for Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Bridging the gap between the internationally recognized Gregorian calendar and Nepal's official Bikram Sambat requires algorithmic precision. Our <strong className="text-[#202124]">nepali date converter</strong> is engineered to map absolute chronological data accurately, eliminating the errors common in standard +56 year arithmetic. Whether you are performing an <strong className="text-[#202124]">ad to bs converter</strong> lookup for citizenship documentation or translating corporate timelines, the engine ensures 100% fidelity.
              </p>
              <p>
                In the context of the <strong className="text-[#202124]">nepali calendar 2081</strong> and beyond, structural anomalies, such as months that dynamically fluctuate between 29 and 32 days depending on solar astrology (Panchanga), necessitate a strict dictionary-based lookup system rather than simple math. This makes translating an <strong className="text-[#202124]">english to nepali date</strong> a complex operation that this engine handles instantaneously.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Astrological and Financial Utility</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Fiscal Year Alignment:</strong> Nepal's tax year (e.g., Shrawan to Ashar) operates strictly on the Bikram Sambat timeline. A reliable <strong className="text-[#202124]">bikram sambat converter</strong> is essential for accountants aligning Gregorian software receipts with local Inland Revenue Department (IRD) audits.</li>
              <li><strong className="text-[#188038]">Visa & Emigration:</strong> International embassies in Nepal require absolute parity between local citizenship cards (BS) and passport data (AD). Even a one-day discrepancy caused by leap year miscalculations can result in visa rejection.</li>
              <li><strong className="text-[#D93025]">Astrological Accuracy:</strong> Because BS is a lunisolar hybrid influenced by astrological events, our conversion strictly adheres to the official Nepal Panchanga Nirnayak Samiti data, ensuring your relative Tithi translations remain intact.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select the conversion direction (AD to BS or BS to AD).", "Choose the Year, Month, and Day from the dropdown menus.", "The equivalent date will instantly appear on the right panel alongside the day of the week."] }}
      formula={{ title: "Date Conversion Standard", description: "This tool maps Gregorian dates directly to Bikram Sambat limits.", raw: "Offset Difference ≈ +56 Years, 8.5 Months\nLeap years and varying month lengths in the BS calendar (ranging from 29 to 32 days) make simple arithmetic conversion inaccurate without standard Panchanga mapping." }}
      faqs={[
        { question: "Why do Nepali months have varying numbers of days?", answer: "The Bikram Sambat (BS) calendar is a solar calendar, but its month lengths are determined by astronomical events (specifically, the sun's transit between zodiac signs). This means each month can have between 29 and 32 days, and the exact length varies year by year based on the Panchanga Nirnayak Samiti's calculations. There is no simple arithmetic rule ,  it requires a lookup table." },
        { question: "Can I find my exact Nepali birth date using this tool?", answer: "Yes! Switch to 'AD To BS', enter your English birth date (from your passport, birth certificate, or hospital record), and the tool will show your precise Bikram Sambat birthday and the day of the week you were born. This is essential for citizenship applications, horoscope preparation, and many official documents in Nepal." },
        { question: "Why is the BS calendar approximately 56 years and 8 months ahead of AD?", answer: "Bikram Sambat began in 57 BC, named after the Vikramaditya era of Indian history. The calendar starts from the legendary coronation of King Vikramaditya. So BS year 2082 corresponds roughly to AD 2025/2026. The exact offset fluctuates by a few days throughout the year due to the differing year lengths of the two calendar systems." },
        { question: "Is this converter accurate for official government documents in Nepal?", answer: "Yes. This converter uses the official Bikram Sambat date mapping tables maintained by the Nepal government. It is accurate for dates within the supported range (approximately 1970 BS to 2099 BS). For dates outside this range or for pre-modern historical dates, specialist astronomical references may be required. For citizenship (Nagarikta) and land records, always verify with the issuing office." },
        { question: "What is the Nepali New Year date in AD?", answer: "Nepali New Year (Naya Barsha) falls on Baisakh 1 of the Bikram Sambat calendar, which typically corresponds to April 13 or 14 in the Gregorian calendar, occasionally April 12. The exact date changes each year based on astronomical calculations. In 2025 AD, Baisakh 1, 2082 BS fell on April 14. Use this converter to find the exact AD date for any BS New Year." },
        { question: "How does the BS calendar affect tax filing deadlines in Nepal?", answer: "Nepal's fiscal year runs from Shrawan 1 to Ashar End (approximately mid-July to mid-July in AD). The IRD (Inland Revenue Department) sets tax filing deadlines in BS dates. Key deadlines: VAT returns due by the 25th of the next BS month. Income tax returns due by Poush End (approximately mid-January AD). Using this converter helps businesses align their Gregorian accounting software with BS regulatory deadlines." }
      ]}
      sidebar={{ title: "Daily Utility", links: [{ label: "Unit Converter", href: "/calculator/unit-converter" }, { label: "Age Calculator", href: "/calculator/age" }], banner: { title: "Tithi Planner", description: "Plan your cultural events ahead by checking exact date alignments.", image: "/images/date-banner.jpg" } }}
      relatedTools={[{ label: "Age Calculator", href: "/calculator/age" }, { label: "Unit Converter", href: "/calculator/unit-converter" }]}
    />
  );
}
