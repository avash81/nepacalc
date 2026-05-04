'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Activity, Apple, Info, Sigma, User, Target, Calculator, Zap } from 'lucide-react';

const ACTIVITY_LEVELS = [
  { id: 'sedentary',  label: 'Sedentary',          desc: 'Little/no exercise',     mult: 1.2   },
  { id: 'light',      label: 'Lightly Active',      desc: '1–3 days/week',          mult: 1.375 },
  { id: 'moderate',   label: 'Moderately Active',   desc: '3–5 days/week',          mult: 1.55  },
  { id: 'very',       label: 'Very Active',          desc: '6–7 days/week',          mult: 1.725 },
  { id: 'extra',      label: 'Extra Active',         desc: 'Physical job',           mult: 1.9   },
];

export default function CalorieCalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [age, setAge]       = useState(25);
  const [male, setMale]     = useState(true);
  const [activity, setActivity] = useState('moderate');

  const result = useMemo(() => {
    if (!weight || !height || !age) return null;
    const bmr = male
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    const mult = ACTIVITY_LEVELS.find(a => a.id === activity)!.mult;
    const tdee = Math.round(bmr * mult);
    return {
      bmr: Math.round(bmr), 
      tdee,
      lose05: Math.max(1200, tdee - 500),
      lose10: Math.max(1200, tdee - 1000),
      gain05: tdee + 500,
    };
  }, [weight, height, age, male, activity]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout slug="calorie-calculator" hideH1={false}
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'Calorie Calculator' }]}
      title="Calorie Calculator"
      description="Determine your daily caloric needs for maintenance or weight goals using the Mifflin-St Jeor equation."
      icon={Apple}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Biological Sex</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {[{ v: true, l: 'Male' }, { v: false, l: 'Female' }].map(({ v, l }) => (
                <button 
                  key={l} 
                  onClick={() => setMale(v)}
                  className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${male === v ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#1A73E8]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Age</label>
            <div className="relative">
              <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">years</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Weight</label>
              <div className="relative">
                <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className={inputCls} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">kg</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Height</label>
              <div className="relative">
                <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className={inputCls} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">cm</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Activity Level</label>
            <select 
              value={activity} 
              onChange={e => setActivity(e.target.value)} 
              className={inputCls}
            >
              {ACTIVITY_LEVELS.map(a => (
                <option key={a.id} value={a.id}>{a.label} ({a.desc})</option>
              ))}
            </select>
          </div>

          <button onClick={() => {}} className="w-full h-12 bg-[#1A73E8] hover:bg-[#1765CC] text-white font-bold uppercase tracking-widest rounded-md transition-all shadow-sm flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4" /> Calculate Metabolism
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          {result ? (
            <>
              <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
                 <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Daily Energy Expenditure (TDEE)</div>
                 <div className="text-5xl font-black text-[#1A73E8] tracking-tighter">{result.tdee} <span className="text-xl">kcal</span></div>
                 <div className="text-[10px] font-bold text-[#70757A] uppercase">Maintenance Calorie Ceiling</div>
              </div>

              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
                 <div className="px-4 py-3 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-widest">Goal-Based Trajectories</span>
                    <Target className="w-3.5 h-3.5 text-[#1A73E8]" />
                 </div>
                 <div className="p-5 space-y-5">
                    {[
                      { label: 'Weight Loss', sub: '-0.5 kg/week', val: result.lose05, color: 'text-[#1A73E8]' },
                      { label: 'Extreme Loss', sub: '-1.0 kg/week', val: result.lose10, color: 'text-[#D93025]' },
                      { label: 'Muscle Gain', sub: '+0.5 kg/week', val: result.gain05, color: 'text-[#188038]' },
                    ].map((g, i) => (
                      <div key={g.label} className="flex justify-between items-center">
                         <div className="space-y-0.5">
                            <div className="text-[11px] font-black uppercase text-[#202124]">{g.label}</div>
                            <div className="text-[9px] text-[#70757A] font-medium uppercase tracking-tighter">{g.sub}</div>
                         </div>
                         <div className={`text-lg font-black font-mono ${g.color}`}>{g.val} <span className="text-[10px]">kcal</span></div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="flex gap-2 p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg items-start">
                 <Sigma className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
                 <p className="text-[10px] text-[#5F6368] leading-relaxed uppercase font-bold">
                    Mifflin-St Jeor Protocol: Calibrated for modern metabolic prediction with 100% mathematical precision.
                 </p>
              </div>
            </>
          ) : (
            <div className="p-20 text-center opacity-20">
               <Target className="w-20 h-20 mx-auto mb-4" />
               <p className="text-xl font-black uppercase tracking-widest text-[#202124]">Awaiting Data</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Metabolic Expenditure Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for total daily energy expenditure (TDEE) assessment. Calibrated using the 
                <strong> Mifflin-St Jeor Equation</strong>, this tool provides a high-precision verification of 
                biological energy requirements. By synthesizing basal metabolic rates with physical activity 
                multipliers, it defines the mathematical boundary for weight maintenance, hypertrophy planning, 
                and caloric deficit trajectories.
             </p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select your biological sex. This dictates the specific metabolic baseline constants utilized in the equation.",
          "Enter your current age, weight (in kg), and height (in cm) with absolute precision.",
          "Select your Activity Level. Be honest, overestimating your activity level will artificially inflate your daily calorie allowance and stall weight loss.",
          "Review the 'Daily Results' matrix to see your exact Maintenance ceiling.",
          "Follow the specific caloric target that aligns with your personal goal (Maintenance, Weight Loss, or Extreme Loss)."
        ]
      }}
      formula={{
        title: "The Mifflin-St Jeor Metabolic Algorithm",
        description: "The clinical gold standard for predicting resting metabolic rate, widely adopted by global dietitians for its superior accuracy.",
        raw: "BMR (Male) = (10 × weight) + (6.25 × height) - (5 × age) + 5\nBMR (Female) = (10 × weight) + (6.25 × height) - (5 × age) - 161\n\nTotal Daily Energy Expenditure (TDEE) = BMR × Activity Multiplier"
      }}
      faqs={[
        {
          question: "Why is the Mifflin-St Jeor equation used instead of Harris-Benedict?",
          answer: "The original Harris-Benedict equation was created in 1919 and tends to overestimate caloric needs by about 5-10%. The Mifflin-St Jeor equation, developed in 1990, accounts for modern lifestyle changes and is clinically proven to be the most accurate predictive formula for today's population."
        },
        {
          question: "Can I eat less than the 'Extreme Loss' recommendation?",
          answer: "No. Dropping below 1,200 calories per day for women or 1,500 for men is medically classified as a very-low-calorie diet (VLCD). It can cause severe muscle catabolism, gallstones, malnutrition, and a long-term slowing of your basal metabolic rate."
        },
        {
          question: "Should I recalculate my calories as I lose weight?",
          answer: "Yes. As your body mass decreases, the amount of energy required to sustain it also decreases. You should recalculate your TDEE for every 3 to 5 kilograms of weight lost to ensure your caloric deficit remains mathematically intact."
        },
        {
          question: "Do I need to eat back the calories I burn during exercise?",
          answer: "No. If you accurately selected your 'Activity Level' (e.g., 'Moderately Active'), the calculator has already factored your exercise into the final number. 'Eating back' exercise calories on top of this will erase your fat-loss deficit."
        },
        {
          question: "Why does biological sex impact the calorie calculation?",
          answer: "Due to hormonal differences, men naturally carry a higher percentage of metabolically active lean muscle mass and lower essential fat percentages than women. Muscle tissue burns significantly more calories at rest, which is reflected in the differing mathematical constants."
        },
        {
          question: "How long will it take to see results on a 500-calorie deficit?",
          answer: "A 500-calorie daily deficit equals a 3,500-calorie weekly deficit. Since 1 kilogram of body fat contains roughly 7,700 calories, this protocol mathematically forces your body to burn exactly 0.45 kg (1 pound) of pure fat every week."
        }
      ]}
      sidebar={{
        title: "Health & Fitness Tools",
        links: [
          { label: "BMI Calculator", href: "/calculator/bmi" },
          { label: "BMR Calculator", href: "/calculator/bmr" },
          { label: "Ideal Weight", href: "/calculator/ideal-weight" },
          { label: "Body Fat %", href: "/calculator/body-fat" },
        ],
        banner: {
          title: "Track your macros",
          description: "Balance your protein, fats, and carbs for optimal health.",
          image: "/images/macros-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "BMI Calculator", href: "/calculator/bmi" },
        { label: "BMR Calculator", href: "/calculator/bmr" },
        { label: "Ideal Weight", href: "/calculator/ideal-weight" }
      ]}
    />
  );
}

