'use client';
import { useMemo, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { UserCheck, CheckCircle, XCircle, Info, Calculator, Zap, Target, History, Globe, ShieldCheck, ArrowRight, Activity, Landmark, Receipt, Calendar } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const DEFAULT_STATE = { 
  dob: '1998-05-10', 
  targetDate: '',
  gender: 'male' as 'male' | 'female' | 'disabled',
  postLevel: 'non-gazetted' as 'non-gazetted' | 'gazetted'
};

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

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

  return (
    <ModernCalcLayout
      slug="lok-sewa-age"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Lok Sewa Age' }]}
      title="Lok Sewa Age"
      description="The definitive institutional age calculator for PSC (Public Service Commission) Nepal. Check eligibility for Kharidar, Na.Su, and Officer posts based on official Civil Service Act standards."
      icon={UserCheck}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Post Level</label>
               <div className="grid grid-cols-2 gap-3">
                {[{v: 'non-gazetted', l: 'Non-Gazetted'}, {v: 'gazetted', l: 'Gazetted Officer'}].map(opt => (
                  <button 
                    key={opt.v} 
                    onClick={() => update({ postLevel: opt.v as any })} 
                    className={`h-11 rounded-md border text-[11px] font-black uppercase transition-all ${postLevel === opt.v ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    {opt.l}
                  </button>
                ))}
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Applicant Protocol</label>
               <div className="grid grid-cols-3 gap-3">
                {[{v: 'male', l: 'Male'}, {v: 'female', l: 'Female'}, {v: 'disabled', l: 'Disabled'}].map(opt => (
                  <button 
                    key={opt.v} 
                    onClick={() => update({ gender: opt.v as any })} 
                    className={`h-11 rounded-md border text-[11px] font-black uppercase transition-all ${gender === opt.v ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    {opt.l}
                  </button>
                ))}
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Date of Birth (AD)</label>
               <input type="date" value={dob} onChange={(e) => update({ dob: e.target.value })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Application Deadline (AD)</label>
               <input type="date" value={targetDate} onChange={(e) => update({ targetDate: e.target.value })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
            </div>

            <div className="p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-md flex gap-3">
               <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
               <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Institutional Standard: Age is strictly calculated based on the <span className="text-[#1A73E8] underline decoration-2">Single Fee</span> deadline day.
               </p>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Audit Eligibility
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          {result && !result.error ? (
            <>
              <div className={`${result.isEligible ? 'bg-[#E6F4EA]' : 'bg-[#FCE8E6]'} rounded-lg p-10 text-center space-y-3`}>
                 <div className={`text-[10px] font-bold uppercase tracking-wider ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                    {result.isEligible ? 'Eligible to Apply' : 'Age Barred / Not Eligible'}
                 </div>
                 <div className={`text-5xl font-black ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'} font-mono`}>{result.years} Years</div>
                 <div className="flex justify-center gap-3">
                    <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0]">
                       {result.months} Months
                    </span>
                    <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0]">
                       {result.days} Days
                    </span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                    <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Min Age Required</div>
                    <div className="text-lg font-black text-[#202124]">{result.minAge} Yrs</div>
                 </div>
                 <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                    <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Max Age Limit</div>
                    <div className="text-lg font-black text-[#1A73E8]">{result.maxAge} Yrs</div>
                 </div>
              </div>

              {result && (
                <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Career Window Usage</span>
                    <span className="text-[11px] font-black text-[#202124]">{(((result?.years || 0) / (result?.maxAge || 1)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                    <div className={`h-full ${result?.isEligible ? 'bg-[#188038]' : 'bg-[#D93025]'}`} style={{ width: `${Math.min(100, ((result?.years || 0) / (result?.maxAge || 1)) * 100)}%` }} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-12 bg-[#F8F9FA] rounded-lg border border-dashed border-[#DADCE0]">
               <Info className="w-8 h-8 text-[#DADCE0] mx-auto mb-3" />
               <p className="text-[11px] font-black text-[#5F6368] uppercase">Awaiting Valid Date Logic</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Landmark className="w-24 h-24 text-[#1A73E8]" /></div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Eligibility Governance</h3>
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed relative z-10 mb-6">
                  The institutional engine for evaluating <strong>Public Service Commission (Lok Sewa Aayog)</strong> age constraints. 
                  Calibrated against official Civil Service Act standards, this tool rigorously validates candidate eligibility.
                </p>
                <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md">
                   <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-1">Policy Guardrail</div>
                   <p className="text-[11px] font-bold text-[#5F6368]">Gazetted Officer minimum age: 21 completed.</p>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Demographic Exemptions</h3>
               </div>
               <div className="space-y-4">
                  {[
                    { l: 'General Male', d: 'Maximum limit of 35 years' },
                    { l: 'Female Applicant', d: 'Extended limit of 40 years' },
                    { l: 'Differently Abled', d: 'Extended limit of 40 years' }
                  ].map((u, i) => (
                    <div key={i} className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                       <div>
                          <div className="text-[10px] font-black text-[#202124] uppercase">{u.l}</div>
                          <div className="text-[10px] text-[#5F6368] font-bold">{u.d}</div>
                       </div>
                       <CheckCircle className="w-4 h-4 text-[#188038]" />
                    </div>
                  ))}
               </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Post: Select your target rank (Gazetted for Officer, Non-Gazetted for Kharidar/Nasu).",
          "Category: Choose your gender or ability status for statutory age extensions.",
          "DOB: Enter your date of birth exactly as it appears on your citizenship card.",
          "Deadline: Input the single-fee application deadline from the official PSC notice.",
          "Audit: Review the eligibility outcome to see if you fall within the legal career window."
        ]
      }}
      formula={{
        title: "PSC Eligibility Axiom",
        description: "Official chronological logic used by the Nepal Public Service Commission.",
        raw: "Eligible = (Age >= MinAge) AND (Age <= MaxAge)",
        variables: [
          "Min Age: 18 for Non-Gazetted, 21 for Gazetted Officer level",
          "Max Age: 35 for Male, 40 for Female/Disabled applicants",
          "Cut-off: Strictly based on the single fee deadline day"
        ]
      }}
      faqs={[
        { question: "Is the age limit different for women in Lok Sewa?", answer: "Yes, female candidates in Nepal have an extended age limit of 40 years, compared to 35 for general male candidates." },
        { question: "What is the minimum age for Section Officer?", answer: "Candidates must have completed 21 years of age to apply for Gazetted (Officer level) positions in Nepal." },
        { question: "Does 'disabled' category get an age extension?", answer: "Yes, applicants in the differently-abled category are granted an extension up to 40 years of age." },
        { question: "Which date is used for age calculation?", answer: "Age is calculated based on the final day of the 'Single Fee' application deadline mentioned in the PSC vacancy notice." }
      ]}
      sidebar={{
        title: "Career Hub",
        subtitle: "PSC Intelligence",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Landmark },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Receipt },
          { label: "Nepali Date Converter", href: "/calculator/nepali-date/", icon: Calendar },
          { label: "PSC Official Site", href: "https://psc.gov.np", icon: History },
        ],
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" },
        { label: "Nepali Date Converter", href: "/calculator/nepali-date/" },
        { label: "Unit Converter", href: "/calculator/unit-converter/" }
      ]}
    />
  );
}

