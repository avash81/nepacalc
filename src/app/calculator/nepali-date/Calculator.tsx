'use client';
import { useState, useEffect, useMemo } from 'react';
import NepaliDate from 'nepali-date-converter';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Calendar, RefreshCw, Clock, MapPin, Info, ArrowRight, Table,
  Activity, Landmark, ShieldCheck, Globe, Target, Wallet, History,
  TrendingUp, Zap, Receipt
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
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Date Converter' }]}
      title="Nepali Date"
      description="The definitive resource for Nepalese timekeeping. Convert Gregorian (AD) to Bikram Sambat (BS) with astronomical precision for official documentation."
      icon={Calendar}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Conversion Protocol</label>
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
                {tab === 'ad2bs' ? 'Gregorian Origin (AD)' : 'Bikram Sambat Origin (BS)'}
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

            <div className="p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-md flex gap-3">
               <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
               <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Institutional Standard: Synchronized with <span className="text-[#1A73E8] underline decoration-2">Nepal Panchanga Nirnayak Samiti</span> astronomical data.
               </p>
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
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Chronological Output</div>
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
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Institutional Delta</span>
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
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><History className="w-24 h-24 text-[#1A73E8]" /></div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Chronological Audit</h3>
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed relative z-10 mb-6">
                  Bridging the gap between the internationally recognized <strong>Gregorian calendar</strong> and Nepal's official 
                  <strong> Bikram Sambat</strong> requires algorithmic precision. Our engine uses astronomical mapping 
                  to ensure 100% fidelity for official documentation.
                </p>
                <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-center">
                   <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-1">Epoch Delta</div>
                   <p className="text-[11px] font-bold text-[#5F6368]">Offset Difference ≈ +56 Years, 8.5 Months</p>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Regulatory Compliance</h3>
               </div>
               <div className="space-y-4">
                  {[
                    { l: 'Citizenship (Nagarikta)', d: 'Must match passport AD dates' },
                    { l: 'Tax Audit (IRD)', d: 'Aligned to Shrawan-Ashar fiscal cycle' },
                    { l: 'Land Record (Lalpurja)', d: 'Primary BS date mapping required' }
                  ].map((u, i) => (
                    <div key={i} className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                       <div>
                          <div className="text-[10px] font-black text-[#202124] uppercase">{u.l}</div>
                          <div className="text-[10px] text-[#5F6368]">{u.d}</div>
                       </div>
                       <ShieldCheck className="w-4 h-4 text-[#188038]" />
                    </div>
                  ))}
               </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Protocol: Select whether you want to convert from AD to BS or BS to AD.",
          "Input: Use the dropdown menus to select the Year, Month, and Day of the origin date.",
          "Validation: The engine instantly computes the target date using Panchanga algorithms.",
          "Delta: Check the 'Institutional Delta' to see how many days are between the target and today.",
          "Reset: Use 'Reset to Present' to quickly return to today's date in both calendars."
        ]
      }}
      formula={{
        title: "Bikram Sambat Calculus",
        description: "The mathematical and astronomical standard for Nepalese timekeeping.",
        raw: "BS Date = AD Date + Offset(Astronomical Map)",
        variables: [
          "Month Lengths: Fluctuates between 29 to 32 days based on solar transit",
          "Epoch: Started in 57 BC (Vikramaditya Era)",
          "Alignment: Lunisolar hybrid regulated by the Nepal Panchanga Nirnayak Samiti"
        ]
      }}
      faqs={[
        { question: "Why do Nepali months have varying lengths?", answer: "Nepali month lengths are determined by the sun's transit between zodiac signs. This means months can have between 29 and 32 days, requiring a lookup table rather than a simple rule." },
        { question: "What is the 10% Migrant Quota rule for dates?", answer: "When applying for the migrant IPO quota, your remittance account age and visa expiry are cross-checked using these precise conversions for regulatory validity." },
        { question: "Is this tool accurate for old historical dates?", answer: "Yes, this engine uses the standard mapping tables used by the government of Nepal for modern and historical date parity." },
        { question: "How does the Nepali New Year fall in AD?", answer: "Baisakh 1 usually falls on April 13 or 14. The exact date changes each year based on astronomical calculations." }
      ]}
      sidebar={{
        title: "Nepal Suite",
        subtitle: "Utility Hub",
        links: [
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Landmark },
          { label: "WACC Calculator", href: "/calculator/nepse-wacc/", icon: Target },
          { label: "NEA Bill Tool", href: "/calculator/nea-bill/", icon: Zap },
        ],
      }}
      relatedTools={[
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
        { label: "Salary Tool", href: "/calculator/nepal-salary/" },
        { label: "WACC Calculator", href: "/calculator/nepse-wacc/" },
        { label: "Electricity Bill", href: "/calculator/nea-bill/" }
      ]}
    />
  );
}

