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
      howToUse={{
        steps: [
          "Choose your biological sex (Male/Female) for baseline metabolic rates.",
          "Enter your current age, weight, and height accurately.",
          "Select your typical weekly activity level to account for energy expenditure.",
          "Click 'Calculate Calories' to see personalized daily targets."
        ]
      }}
      formula={{
        title: "Calculation Formula",
        description: "We use the Mifflin-St Jeor Equation, considered the gold standard for metabolic rate calculation:",
        raw: "BMR = 10*weight + 6.25*height - 5*age + 5 (Male)\nBMR = 10*weight + 6.25*height - 5*age - 161 (Female)"
      }}
      faqs={[
        {
          question: "How accurate is this calculator?",
          answer: "While the Mifflin-St Jeor equation is highly accurate for most adults (within 10%), individual metabolism can vary based on muscle mass, hormones, and genetics."
        },
        {
          question: "Should I eat below 1,200 calories?",
          answer: "We recommend consulting a professional before dropping below 1,200 (women) or 1,500 (men) calories to ensure you get adequate micronutrients."
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
