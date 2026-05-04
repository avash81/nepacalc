'use client';
import { useMemo, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { UserCheck, CheckCircle, XCircle, Info, Calculator, Zap, Target, History, Globe, ShieldCheck } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const DEFAULT_STATE = { 
  dob: '1998-05-10', 
  targetDate: '',
  gender: 'male' as 'male' | 'female' | 'disabled',
  postLevel: 'non-gazetted' as 'non-gazetted' | 'gazetted'
};

export default function LokSewaAgeCalculator() {
  const [state, setState] = useSyncState('lok_sewa_age_institutional_v1', DEFAULT_STATE);
  const { dob, targetDate, gender, postLevel } = state;

  useEffect(() => {
    if (!targetDate) {
      setState({ ...state, targetDate: new Date().toISOString().split('T')[0] });
    }
  }, []);

  const update = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    if (!dob || !targetDate) return null;
    const d1 = new Date(dob), d2 = new Date(targetDate);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    
    if (d1.getTime() > d2.getTime()) {
      return { error: 'Birth date cannot be after the application deadline.' };
    }

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();
    
    if (days < 0) { 
      months--; 
      days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); 
    }
    if (months < 0) { 
      years--; 
      months += 12; 
    }

    let minAge = postLevel === 'gazetted' ? 21 : 18;
    let maxAge = (gender === 'female' || gender === 'disabled') ? 40 : 35;
    const isOldEnough = years >= minAge;
    const isTooOld = years >= maxAge && (months > 0 || days > 0); 
    const isEligible = isOldEnough && !isTooOld;

    return { 
      years, months, days, 
      minAge, maxAge, 
      isEligible, 
      isOldEnough, 
      isTooOld 
    };
  }, [dob, targetDate, gender, postLevel]);

  const inputBlock = (
    <div className="space-y-6">
      <div className="space-y-4 border border-[#DADCE0] rounded-lg p-6 bg-white shadow-sm">
         <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Post Level</label>
               <div className="flex p-1 bg-[#F8F9FA] rounded-md border border-[#DADCE0]">
                 {[{v: 'non-gazetted', l: 'Non-Gazetted'}, {v: 'gazetted', l: 'Gazetted'}].map(opt => (
                   <button key={opt.v} onClick={() => update({ postLevel: opt.v as any })} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${postLevel === opt.v ? 'bg-[#1A73E8] text-white shadow-sm' : 'text-[#5F6368] hover:bg-white'}`}>{opt.l}</button>
                 ))}
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Applicant Category</label>
               <div className="flex p-1 bg-[#F8F9FA] rounded-md border border-[#DADCE0]">
                 {[{v: 'male', l: 'Male'}, {v: 'female', l: 'Female'}, {v: 'disabled', l: 'Disabled'}].map(opt => (
                   <button key={opt.v} onClick={() => update({ gender: opt.v as any })} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${gender === opt.v ? 'bg-[#1A73E8] text-white shadow-sm' : 'text-[#5F6368] hover:bg-white'}`}>{opt.l}</button>
                 ))}
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Date of Birth (AD)</label>
                  <input type="date" value={dob} onChange={(e) => update({ dob: e.target.value })} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Application Deadline</label>
                  <input type="date" value={targetDate} onChange={(e) => update({ targetDate: e.target.value })} className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
               </div>
            </div>
         </div>
      </div>

      <div className="p-4 border border-[#DADCE0] rounded-lg bg-[#F8F9FA] space-y-3 shadow-sm">
         <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#1A73E8]" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">PSC Eligibility Policy</h3>
         </div>
         <p className="text-[10px] text-[#5F6368] font-medium leading-relaxed tracking-wide">
           Age is calculated based on the single fee deadline. "Not exceeded" means you must be under the limit on the deadline day.
         </p>
      </div>
    </div>
  );

  return (
    <ModernCalcLayout
      slug="lok-sewa-age"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Career Tools', href: '/utility/' }, { label: 'Lok Sewa Age' }]}
      title="Lok Sewa Age & Eligibility Engine"
      description="The definitive institutional age calculator for PSC (Public Service Commission) Nepal. Check eligibility for Kharidar, Na.Su, and Officer posts based on official Civil Service Act standards."
      icon={UserCheck}
      inputs={inputBlock}
      results={
        <div className="space-y-6">
          {result && !result.error ? (
            <>
              <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><CheckCircle className={`w-24 h-24 ${result.isEligible ? 'text-emerald-600' : 'text-rose-600'}`} /></div>
                 <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${result.isEligible ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {result.isEligible ? 'Eligible to Apply' : 'Not Eligible'}
                 </div>
                 <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{result.years} Years</div>
                 <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                    {result.months} Months & {result.days} Days
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-1 text-center">
                    <div className="text-[9px] font-black text-slate-400 uppercase">Min Age</div>
                    <div className="text-xl font-black text-slate-900">{result.minAge} Yrs</div>
                 </div>
                 <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl space-y-1 text-center">
                    <div className="text-[9px] font-black text-blue-600 uppercase">Max Limit</div>
                    <div className="text-xl font-black text-blue-600">{result.maxAge} Yrs</div>
                 </div>
              </div>

              <div className="p-8 bg-white border border-[#DADCE0] rounded-lg shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Target className="w-24 h-24 text-[#1A73E8]" /></div>
                 <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-1">
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#70757A]">Audit Status</h4>
                       <p className={`text-lg font-black uppercase tracking-tight ${result.isEligible ? 'text-[#188038]' : 'text-[#D32F2F]'}`}>{result.isEligible ? 'Policy Compliant' : 'Age Barred'}</p>
                    </div>
                    {!result.isEligible && (
                       <div className="bg-[#FCE8E6] px-3 py-1 rounded-full text-[10px] font-bold text-[#D32F2F] uppercase tracking-tighter">
                          Constraint Violation
                       </div>
                    )}
                 </div>
              </div>
            </>
          ) : (
            <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center opacity-50">
               <p className="text-sm font-black uppercase tracking-widest text-slate-400">Awaiting Valid Input</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Eligibility Governance Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for evaluating Public Service Commission (Lok Sewa Aayog) age constraints. 
                Calibrated against official Civil Service Act standards, this tool rigorously validates candidate eligibility 
                based on precise date matrices and demographic exemptions.
             </p>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden flex flex-col justify-center">
             <div className="absolute -bottom-12 -right-12 opacity-5"><ShieldCheck className="w-64 h-64 text-[#1A73E8]" /></div>
             <h3 className="text-sm font-black mb-8 tracking-widest text-[#202124] uppercase">Integrity Guardrails</h3>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                   <h4 className="text-[11px] font-bold flex items-center gap-2 text-[#70757A] uppercase tracking-wider mb-2"><History className="w-4 h-4 text-[#1A73E8]" /> Single Fee Rule</h4>
                   <p className="text-[10px] text-[#5F6368] leading-relaxed font-medium">
                      Age constraints are strictly measured against the standard "Single Fee" deadline date. Double fee periods do not extend eligibility.
                   </p>
                </div>
                <div className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                   <h4 className="text-[11px] font-bold flex items-center gap-2 text-[#70757A] uppercase tracking-wider mb-2"><ShieldCheck className="w-4 h-4 text-[#188038]" /> Category Exemption</h4>
                   <p className="text-[10px] text-[#5F6368] leading-relaxed font-medium">
                      Female and differently-abled applicants are granted a 5-year extension to the standard maximum age cap (up to 40 years).
                   </p>
                </div>
                <div className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                   <h4 className="text-[11px] font-bold flex items-center gap-2 text-[#70757A] uppercase tracking-wider mb-2"><CheckCircle className="w-4 h-4 text-[#1A73E8]" /> Rank Constraint</h4>
                   <p className="text-[10px] text-[#5F6368] leading-relaxed font-medium">
                      Non-Gazetted posts permit entry from 18 years, whereas Gazetted (Officer) positions enforce a strict 21-year minimum.
                   </p>
                </div>
             </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Post Level: Select whether you are applying for a Gazetted or Non-Gazetted post.",
          "Category: Select your category (Male/Female/Disabled) for age limit extensions.",
          "DOB: Enter your exact Date of Birth as per your citizenship certificate.",
          "Deadline: Input the 'Single Fee' application deadline from the PSC notice.",
          "Audit: Review the eligibility status and the exact age breakdown."
        ]
      }}
      formula={{
        title: "PSC Eligibility Formula",
        description: "Official date-math logic used by PSC Nepal administration.",
        raw: "$$Eligible = (Age \ge Min) \land (Age < Max+1)$$",
        latex: "Eligible = (Age \ge Min) \land (Age < Max+1)"
      }}
      faqs={[
        { question: "Is the age limit different for women in Lok Sewa?", answer: "Yes, female candidates in Nepal have a maximum age limit of 40 years, compared to 35 years for general male candidates." },
        { question: "Which date is used for Lok Sewa age calculation?", answer: "The age is calculated based on the final day of the 'Single Fee' application deadline mentioned in the vacancy notice." },
        { question: "Can I apply for Section Officer if I am 20 years old?", answer: "No, the minimum age for Gazetted (Officer level) posts is 21 years completed on the deadline date." },
        { question: "Is there an age limit for permanent civil servants?", answer: "Permanent civil servants already in the system generally do not face an upper age limit when applying for other posts." },
        { question: "What is the minimum age for Kharidar and Na.Su?", answer: "The minimum age for Non-Gazetted posts (Kharidar and Nayab Subba) is 18 years completed." },
        { question: "Does 'disabled' category get an age extension?", answer: "Yes, applicants in the differently-abled category are granted an extension up to 40 years of age." }
      ]}
      sidebar={{
        title: "Career Hub",
        subtitle: "PSC Resources",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary", icon: UserCheck },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax", icon: ShieldCheck },
          { label: "Nepali Date Conv", href: "/calculator/nepali-date-converter", icon: Globe },
          { label: "PSC Official Site", href: "https://psc.gov.np", icon: History },
        ],
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/nepal-salary" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax" },
        { label: "Nepali Date Converter", href: "/calculator/nepali-date-converter" }
      ]}
    />
  );
}
