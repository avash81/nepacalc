'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Activity, Apple, Info, Sigma, User, Target } from 'lucide-react';

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
    <ModernCalcLayout
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

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Calories
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          {result ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#202124]">Daily Results</h3>
                <Info className="w-4 h-4 text-[#1A73E8]" />
              </div>
              
              <div className="space-y-3">
                {[
                  { label: 'Maintenance', sub: 'Keep current weight', val: result.tdee, color: 'text-[#188038]', bg: 'bg-[#E6F4EA]' },
                  { label: 'Weight Loss', sub: '0.5 kg / week', val: result.lose05, color: 'text-[#1A73E8]', bg: 'bg-[#E8F0FE]' },
                  { label: 'Extreme Loss', sub: '1 kg / week', val: result.lose10, color: 'text-[#D93025]', bg: 'bg-[#FCE8E6]' },
                ].map((goal) => (
                  <div key={goal.label} className={`p-4 ${goal.bg} border border-[#DADCE0] rounded-lg flex justify-between items-center group hover:shadow-md transition-all`}>
                    <div>
                      <div className="text-sm font-bold text-[#202124]">{goal.label}</div>
                      <div className="text-[10px] text-[#5F6368]">{goal.sub}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-black ${goal.color}`}>{goal.val.toLocaleString()}</div>
                      <div className="text-[9px] font-bold text-[#70757A] uppercase tracking-tighter">kcal/day</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10 opacity-40">
              <Target className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">Enter stats to see caloric goals</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Thermodynamics & Daily Energy Expenditure</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                At its core, weight management is governed by the laws of thermodynamics: energy in versus energy out. Our <strong className="text-[#202124]">calorie calculator</strong> serves as your personalized metabolic architect, utilizing the clinically validated Mifflin-St Jeor equation to map exactly how much energy your body requires daily. This calculation is vital whether you are aiming to shed excess fat, build lean muscle mass, or simply maintain your current physique.
              </p>
              <p>
                The calculator determines your <strong className="text-[#202124]">Total Daily Energy Expenditure (TDEE)</strong> by first calculating your resting metabolism and then applying an activity multiplier based on your lifestyle. By identifying this exact maintenance ceiling, the engine can accurately prescribe specific caloric deficits or surpluses to trigger reliable, mathematically predictable body composition changes.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Metabolic Protocols & Goal Trajectories</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Maintenance Protocol (TDEE):</strong> The exact number of calories required to keep your body weight entirely static. If you eat this amount daily, you will neither gain nor lose weight.</li>
              <li><strong className="text-[#188038]">Hypertrophy (Weight Gain):</strong> To build muscle tissue, the body requires an anabolic state. The engine prescribes a safe, controlled 500-calorie surplus, providing the biological building blocks for muscle synthesis without excessive fat spillover.</li>
              <li><strong className="text-[#D93025]">Fat Oxidation (Weight Loss):</strong> To burn stored adipose tissue, you must force a biological energy deficit. The calculator provides targets for a mild deficit (-500 kcal/day for 0.5kg weekly loss) and an aggressive deficit (-1000 kcal/day for 1kg weekly loss).</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select your biological sex. This dictates the specific metabolic baseline constants utilized in the equation.",
          "Enter your current age, weight (in kg), and height (in cm) with absolute precision.",
          "Select your Activity Level. Be honest—overestimating your activity level will artificially inflate your daily calorie allowance and stall weight loss.",
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
