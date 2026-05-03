'use client';
import { useMemo, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { FileText, CheckCircle, XCircle, Info, Calculator, UserCheck } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const DEFAULT_STATE = { 
  dob: '1998-05-10', 
  targetDate: '',
  gender: 'male', // 'male', 'female', 'disabled'
  postLevel: 'non-gazetted' // 'non-gazetted' (18-35), 'gazetted' (21-35)
};

export default function LokSewaAgeCalculator() {
  const [state, setState] = useSyncState('lok_sewa_age_v1', DEFAULT_STATE);
  const { dob, targetDate, gender, postLevel } = state;

  useEffect(() => {
    if (!targetDate) {
      setState({ ...state, targetDate: new Date().toISOString().split('T')[0] });
    }
  }, []);

  const update = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const r = useMemo(() => {
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

    // Determine age limits
    let minAge = 18;
    if (postLevel === 'gazetted') {
      minAge = 21;
    }

    let maxAge = 35;
    if (gender === 'female' || gender === 'disabled') {
      maxAge = 40;
    }

    // Eligibility check
    const isOldEnough = years >= minAge;
    const isTooOld = years >= maxAge && (months > 0 || days > 0); 
    // Usually, you can't have completed the max age year. "35 years not exceeded" means up to 35th birthday exactly.
    // Wait, PSC rule: "18 years completed and 35 years not exceeded". 
    // Meaning, age < 35. If years = 35 and months = 0 and days = 0, technically on the exact day.
    // Generally: years < maxAge is eligible. years == maxAge and months/days > 0 is ineligible.
    
    const isEligible = isOldEnough && !isTooOld;

    return { 
      years, months, days, 
      minAge, maxAge, 
      isEligible, 
      isOldEnough, 
      isTooOld 
    };
  }, [dob, targetDate, gender, postLevel]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";
  const btnCls = "h-10 px-4 rounded-md text-sm font-bold border transition-colors flex items-center justify-center gap-2";

  return (
    <ModernCalcLayout
      slug="lok-sewa-age"
      crumbs={[{ label: 'Career Tools', href: '/utility/' }, { label: 'Lok Sewa Age Calculator' }]}
      title="Lok Sewa Age Calculator"
      description="Calculate your exact age and check eligibility for PSC (Public Service Commission) Nepal exams based on official age limits."
      icon={UserCheck}
      inputs={
        <div className="space-y-6">
          <div className="space-y-4">
             <div className="space-y-2">
               <label className={labelCls}>Post Level</label>
               <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => update({ postLevel: 'non-gazetted' })}
                    className={`${btnCls} ${postLevel === 'non-gazetted' ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                  >
                    Kharidar / Na.Su (Non-Gazetted)
                  </button>
                  <button 
                    onClick={() => update({ postLevel: 'gazetted' })}
                    className={`${btnCls} ${postLevel === 'gazetted' ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                  >
                    Officer / Director (Gazetted)
                  </button>
               </div>
             </div>

             <div className="space-y-2">
               <label className={labelCls}>Applicant Category</label>
               <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => update({ gender: 'male' })}
                    className={`${btnCls} ${gender === 'male' ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                  >
                    Male
                  </button>
                  <button 
                    onClick={() => update({ gender: 'female' })}
                    className={`${btnCls} ${gender === 'female' ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                  >
                    Female
                  </button>
                  <button 
                    onClick={() => update({ gender: 'disabled' })}
                    className={`${btnCls} ${gender === 'disabled' ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                  >
                    Disabled
                  </button>
               </div>
             </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Date of Birth (A.D.)</label>
            <div className="relative">
              <input 
                type="date" 
                value={dob} 
                onChange={e => update({ dob: e.target.value })} 
                className={inputCls} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Application Deadline / Target Date</label>
            <div className="relative">
              <input 
                type="date" 
                value={targetDate} 
                onChange={e => update({ targetDate: e.target.value })} 
                className={inputCls} 
              />
            </div>
            <p className="text-[10px] text-[#70757A]">Age limits are calculated based on the last date of application submission.</p>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {r && !r.error ? (
            <>
              <div className={`p-6 border rounded-lg text-center space-y-3 ${r.isEligible ? 'bg-[#E6F4EA] border-[#CEEAD6]' : 'bg-[#FCE8E6] border-[#FAD2CF]'}`}>
                <div className="flex justify-center mb-2">
                  {r.isEligible ? <CheckCircle className="w-12 h-12 text-[#188038]" /> : <XCircle className="w-12 h-12 text-[#D93025]" />}
                </div>
                <div className={`text-[11px] font-bold uppercase tracking-wider ${r.isEligible ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                  {r.isEligible ? 'You Are Eligible to Apply' : 'You Are Not Eligible'}
                </div>
                <div className="text-4xl font-black text-[#202124]">{r.years} Years</div>
                <div className="text-[12px] text-[#70757A] font-bold uppercase">{r.months} Months & {r.days} Days</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Required Minimum</div>
                   <div className="text-sm font-black text-[#202124]">{r.minAge} Years</div>
                 </div>
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Maximum Limit</div>
                   <div className="text-sm font-black text-[#202124]">{r.maxAge} Years</div>
                 </div>
              </div>

              {!r.isEligible && (
                <div className="bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg p-4 text-sm text-[#202124]">
                  <strong>Why?</strong> 
                  {!r.isOldEnough ? 
                    ` You must be at least ${r.minAge} years old on the deadline date.` : 
                    ` You have exceeded the maximum age limit of ${r.maxAge} years.`
                  }
                </div>
              )}
            </>
          ) : r?.error ? (
            <div className="p-10 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg text-center opacity-70">
              <Info className="w-8 h-8 mx-auto mb-2 text-[#F29900]" />
              <p className="text-sm font-bold text-[#202124]">{r.error}</p>
            </div>
          ) : (
             <div className="text-center py-10 opacity-30">
                <FileText className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm">Enter your DOB and the vacancy deadline to check eligibility.</p>
             </div>
          )}
        </div>
      }
      howToUse={{
        steps: [
          "Select the Post Level (e.g., Kharidar, Officer) for the vacancy.",
          "Select your Category (Male, Female, or Disabled).",
          "Enter your Date of Birth in A.D. (Use our Nepali Date Converter if you only know your B.S. date).",
          "Enter the official Application Deadline Date from the Lok Sewa notice.",
          "The calculator will instantly tell you if you are eligible or age-barred."
        ]
      }}
      formula={{
        title: "Official PSC Age Rules",
        description: "Age is calculated exactly up to the final day of the application deadline. 'Not exceeded 35 years' means you must be 34 years, 11 months, and 29 days or younger.",
        raw: "Kharidar/Na.Su: 18 - 35 Yrs (40 for Female/Disabled)\nSection Officer: 21 - 35 Yrs (40 for Female/Disabled)"
      }}
      faqs={[
        {
          question: "Can I use my Bikram Sambat (B.S.) date of birth?",
          answer: "This specific calculator requires A.D. dates. Use the 'Nepali Date Converter' tool first to convert your B.S. citizenship date to A.D., then enter it here."
        },
        {
          question: "Is the deadline calculated on the single fee date or double fee date?",
          answer: "According to Lok Sewa Aayog rules, your age eligibility is calculated strictly on the final date of the 'Single Fee' application submission, not the extended double fee deadline."
        },
        {
          question: "Does the 40-year limit apply to all women?",
          answer: "Yes, female candidates have an extended maximum age limit of 40 years for both Non-Gazetted and Gazetted positions."
        }
      ]}
      sidebar={{
        title: "Career Tools",
        links: [
          { label: "Salary Calculator", href: "/calculator/salary/" },
          { label: "Income Tax Calc", href: "/calculator/income-tax/" },
          { label: "Nepali Date Converter", href: "/calculator/nepali-date/" },
        ],
        banner: {
          title: "Prepare Smarter",
          description: "Don't let age limit calculations stress you out. Focus on your PSC preparation.",
          image: "/images/career-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/salary/" },
        { label: "Income Tax", href: "/calculator/income-tax/" }
      ]}
    />
  );
}
