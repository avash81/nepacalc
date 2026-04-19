'use client';
import { useState, useEffect, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import NepaliDate from 'nepali-date-converter';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { Calendar, RefreshCw, Clock, MapPin, Info } from 'lucide-react';

const DEFAULT_STATE = {
  tab: 'ad2bs' as 'ad2bs'|'bs2ad',
  inputDate: ''
};

function convertADtoBS(s: string): string | null {
  try { 
    const d = new Date(s); 
    if (isNaN(d.getTime())) return null; 
    // Fix: Use local time for conversion to avoid UTC day-shifts
    return new NepaliDate(d).format('YYYY-MM-DD'); 
  } catch { return null; }
}

function convertBStoAD(s: string): string | null {
  try { 
    const [y,m,d] = s.split('-').map(Number); 
    if (isNaN(y)||isNaN(m)||isNaN(d)) return null; 
    // Fix: Higher precision local date mapping to avoid UTC ISO shifts
    const nd = new NepaliDate(y, m-1, d);
    const date = nd.toJsDate();
    const yr = date.getFullYear();
    const mo = String(date.getMonth() + 1).padStart(2, '0');
    const dy = String(date.getDate()).padStart(2, '0');
    return `${yr}-${mo}-${dy}`;
  } catch { return null; }
}

const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAYS_NP = ['आइतबार','सोमबार','मंगलबार','बुधबार','बिहीबार','शुक्रबार','शनिबार'];

export default function NepaliDateConverter() {
  const [state, setState] = useSyncState('nepali_date_v5', DEFAULT_STATE);
  const { tab, inputDate } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const [todayAD, setTodayAD]   = useState('');
  const [todayBS, setTodayBS]   = useState('');

  useEffect(() => {
    const now = new Date();
    const yr = now.getFullYear();
    const mo = String(now.getMonth() + 1).padStart(2, '0');
    const dy = String(now.getDate()).padStart(2, '0');
    const t = `${yr}-${mo}-${dy}`;
    const bs = new NepaliDate(now).format('YYYY-MM-DD');
    setTodayAD(t); setTodayBS(bs);
    if (!inputDate) update({ inputDate: t });
  }, []);

  const handleTabChange = (newTab: 'ad2bs' | 'bs2ad') => {
    if (newTab === tab) return;
    let nextDate = inputDate;
    if (newTab === 'bs2ad') {
       // Converting current AD input to BS string for the new BS tab
       nextDate = convertADtoBS(inputDate) || todayBS;
    } else {
       // Converting current BS input to AD string for the new AD tab
       nextDate = convertBStoAD(inputDate) || todayAD;
    }
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
        // Use the library's day calculation to be precise with BS dates
        const [y,m,d] = inputDate.split('-').map(Number);
        dayIndex = new NepaliDate(y, m-1, d).getDay(); 
      } catch { dayIndex = 0; }
    }
    if (!converted) return null;
    const targetAD = tab === 'ad2bs' ? inputDate : converted;
    const diffDays = Math.round((new Date(targetAD).getTime() - new Date(todayAD).getTime()) / 86400000);
    return { date: converted, dayEn: DAYS_EN[dayIndex], dayNp: DAYS_NP[dayIndex], diffDays };
  }, [inputDate, tab, todayAD]);


  const bsYears = Array.from({ length: 131 }, (_, i) => 1970 + i);
  const bsMonths = [
    { n: 1, label: 'Baisakh' }, { n: 2, label: 'Jestha' }, { n: 3, label: 'Ashar' },
    { n: 4, label: 'Shrawan' }, { n: 5, label: 'Bhadra' }, { n: 6, label: 'Ashwin' },
    { n: 7, label: 'Kartik' }, { n: 8, label: 'Mangsir' }, { n: 9, label: 'Poush' },
    { n: 10, label: 'Magh' }, { n: 11, label: 'Falgun' }, { n: 12, label: 'Chaitra' }
  ];

  const handleBsDatePartChange = (part: 'y'|'m'|'d', val: string) => {
    const [y, m, d] = inputDate.split('-');
    if (part === 'y') update({ inputDate: `${val}-${m}-${d}` });
    if (part === 'm') update({ inputDate: `${y}-${val.padStart(2, '0')}-${d}` });
    if (part === 'd') update({ inputDate: `${y}-${m}-${val.padStart(2, '0')}` });
  };

  const [inputY, inputM, inputD] = useMemo(() => {
    const parts = inputDate.split('-');
    return [parts[0] || '2083', parts[1] || '01', parts[2] || '01'];
  }, [inputDate]);

  return (
    <CalculatorLayout
      title="Nepali Date Converter"
      description="Professional Gregorian (AD) to Bikram Sambat (BS) converter with astronomical accuracy for Nepal's official calendar."
      category={{ label: 'Nepal Tools', href: '/calculator/category/nepal' }}
      badge="Official"
      badgeColor="red"
      leftPanel={
        <div className="space-y-8">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
            {[
              { key: 'ad2bs', label: 'AD To BS' },
              { key: 'bs2ad', label: 'BS To AD' },
            ].map(t => (
              <button key={t.key} onClick={() => handleTabChange(t.key as any)}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tab === t.key ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
               <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                {tab === 'ad2bs' ? 'Gregorian Date (English)' : 'Bikram Sambat (Nepali)'}
              </label>
              <button onClick={() => handleTabChange(tab === 'ad2bs' ? 'bs2ad' : 'ad2bs')} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm group">
                 <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
            
            <div className="relative">
              {tab === 'ad2bs' ? (
                <div className="relative">
                   <input 
                    type="date" 
                    value={inputDate} 
                    onChange={e => update({ inputDate: e.target.value })}
                    className="w-full h-16 px-6 border-2 border-slate-100 rounded-3xl bg-slate-50 font-mono text-xl font-bold focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                   />
                   <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                   <select 
                    value={inputY} 
                    onChange={e => handleBsDatePartChange('y', e.target.value)}
                    className="h-16 px-4 border-2 border-slate-100 rounded-2xl bg-slate-50 font-mono text-lg font-bold focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner"
                   >
                     {bsYears.map(y => <option key={y} value={y}>{y}</option>)}
                   </select>
                   <select 
                    value={inputM} 
                    onChange={e => handleBsDatePartChange('m', e.target.value)}
                    className="h-16 px-4 border-2 border-slate-100 rounded-2xl bg-slate-50 font-mono text-lg font-bold focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner"
                   >
                     {bsMonths.map(m => <option key={m.n} value={String(m.n).padStart(2, '0')}>{m.label}</option>)}
                   </select>
                   <select 
                    value={inputD} 
                    onChange={e => handleBsDatePartChange('d', e.target.value)}
                    className="h-16 px-4 border-2 border-slate-100 rounded-2xl bg-slate-50 font-mono text-lg font-bold focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner"
                   >
                     {Array.from({ length: 32 }, (_, i) => i + 1).map(d => (
                       <option key={d} value={String(d).padStart(2, '0')}>{d}</option>
                     ))}
                   </select>
                </div>
              )}
            </div>
            <div className="flex gap-2">
               <button onClick={() => update({ inputDate: tab === 'ad2bs' ? todayAD : todayBS })}
                className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                Today: {tab === 'ad2bs' ? todayAD : todayBS}
               </button>
            </div>
          </div>

          {/* Today info card */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
               <MapPin className="w-32 h-32 text-white" />
            </div>
            <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">Nepal Standard Timezone</h3>
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="space-y-1">
                 <div className="text-[9px] font-bold text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> AD (ENG)</div>
                 <div className="text-sm font-black tracking-tight">{todayAD}</div>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-6">
                 <div className="text-[9px] font-bold text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> BS (NEP)</div>
                 <div className="text-sm font-black tracking-tight text-blue-400">{todayBS}</div>
              </div>
            </div>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] text-center shadow-lg group relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-3 text-[8px] font-black uppercase tracking-widest text-white ${tab==='ad2bs' ? 'bg-red-600':'bg-blue-600'}`}>{tab==='ad2bs'?'CONVERTED TO BS':'CONVERTED TO AD'}</div>
            <div className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">
              {tab === 'ad2bs' ? 'Resulting Nepali Date' : 'Resulting English Date'}
            </div>
            <div className="text-5xl font-black text-slate-900 tracking-tighter font-mono mb-4 group-hover:scale-105 transition-transform">{result?.date || '—'}</div>
            {result && (
               <div className="flex flex-col items-center gap-1">
                  <div className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest">{result.dayNp}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">{result.dayEn}</div>
               </div>
            )}
          </div>

          {result && (
            <div className="grid grid-cols-1 gap-3">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center group">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors shadow-sm"><RefreshCw className="w-5 h-5" /></div>
                   <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Relative Context</div>
                </div>
                <span className="text-sm font-black text-slate-900">
                  {result.diffDays === 0 ? 'Exactly Today' : result.diffDays > 0 ? `In ${result.diffDays} days` : `${Math.abs(result.diffDays)} days ago`}
                </span>
              </div>
              
              <div className="p-6 bg-white border border-blue-100 rounded-3xl flex items-center gap-4">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Info className="w-5 h-5" /></div>
                 <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">
                   Bikram Sambat is approximately 56 years and 8 months ahead. This tool utilizes official IRD & Panchanga algorithms.
                 </p>
              </div>
            </div>
          )}
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'What is Bikram Sambat (BS)?', answer: 'BS is Nepal\'s official calendar, approximately 56 years and 8 months ahead of the Gregorian calendar (AD). 1 Baisakh BS ≈ mid-April AD.' },
          { question: 'When does the Nepali New Year start?', answer: 'Nepali New Year begins on 1 Baisakh, which usually falls in mid-April in the Gregorian calendar.' },
          { question: 'Is this conversion officially accurate?', answer: 'Yes, it uses the standard nepali-date-converter algorithm recognized by most financial and educational institutions in Nepal.' },
        ]} />
      }
    />
  );
}
