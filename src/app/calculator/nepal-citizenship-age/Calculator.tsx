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

export default function CitizenshipAgeCalculator() {
  const [state, setState] = useSyncState('nepal_citizenship_age_v1', { dob: '2008-05-10', targetDate: '' });
  const { dob, targetDate } = state;

  useEffect(() => {
    if (!targetDate) {
      setState({ ...state, targetDate: new Date().toISOString().split('T')[0] });
    }
  }, []);

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    if (!dob || !targetDate) return null;
    const d1 = new Date(dob), d2 = new Date(targetDate);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    
    if (d1.getTime() > d2.getTime()) {
      return { error: 'Birth date cannot be in the future.' };
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

    const minAge = 16;
    const isEligible = years >= minAge;

    return { 
      years, months, days, 
      minAge, 
      isEligible
    };
  }, [dob, targetDate]);

  return (
    <ModernCalcLayout
      slug="nepal-citizenship-age"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Citizenship Age' }]}
      title="Nepal Citizenship Age"
      description="Calculate if you are eligible for a Nepalese citizenship certificate. This tool verifies the 16-year minimum age requirement based on official Nepal Government standards."
      icon={UserCheck}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Date of Birth (AD)</label>
               <input type="date" value={dob} onChange={(e) => update({ dob: e.target.value })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Application Date (Today)</label>
               <input type="date" value={targetDate} onChange={(e) => update({ targetDate: e.target.value })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
            </div>

            <div className="p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-md flex gap-3">
               <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
               <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Legal Requirement: You must have completed <span className="text-[#1A73E8] underline decoration-2">16 Years</span> of age to apply for citizenship in Nepal.
               </p>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          {result && !result.error ? (
            <>
              <div className={`${result.isEligible ? 'bg-[#E6F4EA]' : 'bg-[#FCE8E6]'} rounded-lg p-10 text-center space-y-3`}>
                 <div className={`text-[10px] font-bold uppercase tracking-wider ${result.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                    {result.isEligible ? 'Eligible for Citizenship' : 'Not Yet Eligible'}
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

              <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                 <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Minimum Age Required</div>
                 <div className="text-lg font-black text-[#202124]">{result.minAge} Years</div>
              </div>
            </>
          ) : (
            <div className="text-center p-12 bg-[#F8F9FA] rounded-lg border border-dashed border-[#DADCE0]">
               <Info className="w-8 h-8 text-[#DADCE0] mx-auto mb-3" />
               <p className="text-[11px] font-black text-[#5F6368] uppercase">Please Select Birth Date</p>
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
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Citizenship Rules</h3>
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed relative z-10 mb-6">
                  According to the <strong>Nepal Citizenship Act</strong>, any person born to Nepali parents is eligible for a citizenship certificate upon reaching the age of 16.
                </p>
                <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md">
                   <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-1">Document Required</div>
                   <p className="text-[11px] font-bold text-[#5F6368]">Original Birth Certificate and Father/Mother's Citizenship Card.</p>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Eligibility Check</h3>
               </div>
               <div className="space-y-4">
                  {[
                    { l: 'Minimum Age', d: '16 Years Completed' },
                    { l: 'Parents', d: 'Must be Nepali Citizens' },
                    { l: 'Application', d: 'District Administration Office (DAO)' }
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
          "Enter your Date of Birth (DOB) as mentioned in your Birth Certificate.",
          "The tool automatically sets the current date as the target date.",
          "Check the result to see your exact age in years, months, and days.",
          "If the result shows 16 years or more, you are legally eligible to apply for Nagarikta."
        ]
      }}
      formula={{
        title: "Citizenship Age Logic",
        description: "Official minimum age requirement as per Nepal Citizenship Act.",
        raw: "Eligible = (Current Date - Birth Date) >= 16 Years",
        variables: [
          "Birth Date: Verified from Birth Certificate",
          "Cut-off Age: 16 Years exactly"
        ]
      }}
      faqs={[
        { question: "What is the minimum age for citizenship in Nepal?", answer: "The minimum age is 16 years completed." },
        { question: "Can I apply before my 16th birthday?", answer: "No, you must have completed exactly 16 years of age on the day of application." },
        { question: "Where do I apply for citizenship?", answer: "You must apply at the District Administration Office (DAO) of your permanent residence." }
      ]}
      sidebar={{
        title: "Legal Hub",
        subtitle: "Government Info",
        links: [
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/", icon: Landmark },
          { label: "Nepali Date Converter", href: "/calculator/nepali-date/", icon: Calendar },
          { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/", icon: Receipt },
        ],
      }}
      relatedTools={[
        { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
        { label: "Nepali Date Converter", href: "/calculator/nepali-date/" },
        { label: "Age Calculator", href: "/calculator/age-calculator/" }
      ]}
    />
  );
}

