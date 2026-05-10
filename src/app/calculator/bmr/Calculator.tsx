'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Flame, Activity, Info, Target, Calculator, PieChart, Heart, Scale } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const DEFAULT_STATE = {
  gender: 'male' as 'male' | 'female',
  age: 28,
  weight: 75,
  height: 175,
  activity: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'active' | 'extra',
};

const ACTIVITY_MULTIPLIERS = {
  sedentary: { label: 'Sedentary', desc: 'Little or no exercise', factor: 1.2 },
  light: { label: 'Lightly Active', desc: 'Exercise 1-3 times/week', factor: 1.375 },
  moderate: { label: 'Moderately Active', desc: 'Exercise 4-5 times/week', factor: 1.55 },
  active: { label: 'Very Active', desc: 'Intense exercise daily', factor: 1.725 },
  extra: { label: 'Extra Active', desc: 'Physical job or 2x training', factor: 1.9 },
};

export default function BMRCalculator() {
  const [state, setState] = useSyncState('bmr_v4', DEFAULT_STATE);
  const { gender, age, weight, height, activity } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const analysis = useMemo(() => {
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;
    const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[activity].factor);
    return { bmr: Math.round(bmr), tdee };
  }, [gender, age, weight, height, activity]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'BMR Calculator' }]}
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Find the exact calories you need to maintain, lose, or gain weight."
      icon={Flame}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Gender</label>
              <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
                {['male', 'female'].map((g) => (
                  <button 
                    key={g} 
                    onClick={() => update({ gender: g as any })}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${gender === g ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Age</label>
              <input type="number" value={age} onChange={e => update({ age: Number(e.target.value) })} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Weight (kg)</label>
              <input type="number" value={weight} onChange={e => update({ weight: Number(e.target.value) })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Height (cm)</label>
              <input type="number" value={height} onChange={e => update({ height: Number(e.target.value) })} className={inputCls} />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Activity Level</label>
            <div className="space-y-2">
              {Object.entries(ACTIVITY_MULTIPLIERS).map(([key, data]) => (
                <button 
                  key={key} 
                  onClick={() => update({ activity: key as any })}
                  className={`w-full p-3 border rounded-lg text-left transition-all ${activity === key ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0]'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-[12px] font-bold uppercase ${activity === key ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{data.label}</span>
                    <span className="text-[10px] text-[#70757A]">{data.factor}x</span>
                  </div>
                  <p className="text-[10px] text-[#5F6368]">{data.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => {}} className="w-full h-12 bg-[#1A73E8] hover:bg-[#1765CC] text-[#202124] font-bold uppercase tracking-widest rounded-md transition-all shadow-sm flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4" /> Calculate Metabolism
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Maintenance Calories (TDEE)</div>
             <div className="text-5xl font-black text-[#1A73E8] tracking-tighter">{analysis.tdee} <span className="text-xl">kcal</span></div>
             <div className="text-[10px] font-bold text-[#70757A] uppercase">Daily energy requirement</div>
          </div>

          <div className="grid grid-cols-1 gap-3">
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                   <Heart className="w-3.5 h-3.5 text-[#D93025]" />
                   <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-tight">Basal Metabolic Rate</span>
                </div>
                <span className="text-sm font-black text-[#202124]">{analysis.bmr} kcal/day</span>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-4 py-3 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-widest">Goal-Based Trajectories</span>
                <Target className="w-3.5 h-3.5 text-[#1A73E8]" />
             </div>
             <div className="p-5 space-y-5">
                {[
                  { label: 'Mild Weight Loss', sub: '-0.25 kg/week', val: analysis.tdee - 250, color: 'text-[#1A73E8]' },
                  { label: 'Weight Loss', sub: '-0.5 kg/week', val: analysis.tdee - 500, color: 'text-[#D93025]' },
                  { label: 'Weight Gain', sub: '+0.5 kg/week', val: analysis.tdee + 500, color: 'text-[#188038]' },
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
             <Info className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#5F6368] leading-relaxed uppercase font-bold">
                Mifflin-St Jeor Protocol: Currently the clinical standard for high-precision metabolic prediction in modern populations.
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Metabolic Efficiency Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for basal metabolic assessment. Calibrated using the <strong>Mifflin-St Jeor Protocol</strong>, 
                this tool provides a high-precision verification of resting caloric requirements. By integrating physical activity 
                multipliers (TDEE), it defines the mathematical boundary for weight maintenance, caloric deficit planning, 
                and metabolic trajectory management.
             </p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select your biological gender and enter your current age.",
          "Input your current weight in kilograms and height in centimeters.",
          "Choose an activity level that best describes your weekly exercise routine.",
          "Click 'Calculate Metabolism' to see your BMR and TDEE results.",
          "Review the weight goal targets to understand your daily calorie needs for loss or gain."
        ]
      }}
      formula={{
        title: "Mifflin-St Jeor Equation",
        description: "BMR is the energy your body needs at rest. TDEE is BMR multiplied by your activity factor.",
        raw: "Male: BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5\nFemale: BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161"
      }}
      faqs={[
        {
          question: "What is BMR and why does it matter?",
          answer: "Basal Metabolic Rate (BMR) is the total number of calories your body burns at complete rest just to maintain basic life functions (breathing, circulation, cell production). It matters because it represents the absolute baseline of your caloric needs before adding any physical activity."
        },
        {
          question: "How is TDEE different from BMR?",
          answer: "TDEE (Total Daily Energy Expenditure) accounts for both your BMR and the energy burned through daily physical activity and exercise. While BMR is your resting baseline, TDEE is the actual number of calories you burn in a typical 24-hour period."
        },
        {
          question: "Which equation does this calculator use?",
          answer: "This calculator utilizes the Mifflin-St Jeor Equation. Clinical studies have proven it to be the most accurate predictive metabolic formula for modern populations, consistently outperforming older models like the Harris-Benedict equation."
        },
        {
          question: "How many calories should I cut to lose weight?",
          answer: "A safe, sustainable rate of weight loss is about 0.5 kg (1 lb) per week. Because 1 kg of body fat contains roughly 7,700 calories, creating a daily caloric deficit of 500 calories below your TDEE will reliably yield this result."
        },
        {
          question: "Does building muscle increase my BMR?",
          answer: "Yes. Muscle tissue is highly metabolically active compared to fat tissue. The more lean muscle mass you carry, the more calories your body will passively burn at rest, permanently increasing your baseline BMR."
        },
        {
          question: "Why does BMR decrease as I get older?",
          answer: "As we age, we naturally lose muscle mass (sarcopenia) and our internal cellular processes slow down. This biological shift means the body requires less baseline energy to function, which is why older adults must often eat less to avoid weight gain."
        }
      ]}
      sidebar={{
        title: "Health Toolkit",
        links: [
          { label: "BMI Calculator", href: "/calculator/bmi/" },
          { label: "Calorie Calculator", href: "/calculator/calorie-calculator/" },
          { label: "Ideal Weight", href: "/calculator/ideal-weight/" },
          { label: "Water Intake", href: "/calculator/water-intake/" },
        ],
        banner: {
          title: "Fuel Your Body Right",
          description: "Knowing your numbers is the first step toward a healthier lifestyle. Use these metrics to plan your nutrition.",
          image: "/images/health-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "BMI Calculator", href: "/calculator/bmi/" },
        { label: "Calorie Tool", href: "/calculator/calorie-calculator/" },
        { label: "Water Intake", href: "/calculator/water-intake/" }
      ]}
    />
  );
}

