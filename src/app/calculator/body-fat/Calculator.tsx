'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Scale, Activity, Info, Target, Calculator, PieChart, Heart, Ruler, ChevronRight } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

type Gender = 'male' | 'female';

const CATEGORIES = {
  male:   [{ max: 6,  label: 'Essential Fat', color: 'text-[#1A73E8]' }, { max: 14, label: 'Athletes', color: 'text-[#188038]' }, { max: 18, label: 'Fitness', color: 'text-[#188038]' }, { max: 25, label: 'Average', color: 'text-[#F29900]' }, { max: Infinity, label: 'Obese', color: 'text-[#D93025]' }],
  female: [{ max: 14, label: 'Essential Fat', color: 'text-[#1A73E8]' }, { max: 21, label: 'Athletes', color: 'text-[#188038]' }, { max: 25, label: 'Fitness', color: 'text-[#188038]' }, { max: 32, label: 'Average', color: 'text-[#F29900]' }, { max: Infinity, label: 'Obese', color: 'text-[#D93025]' }],
};

export default function BodyFatCalculator() {
  const [state, setState] = useSyncState('body_fat_v4', {
    gender: 'male' as Gender,
    height: 175,
    neck: 38,
    waist: 85,
    hip: 90
  });
  const { gender, height, neck, waist, hip } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const bf = useMemo(() => {
    if (gender === 'male' && waist <= neck) return null;
    if (gender === 'female' && (waist + hip) <= neck) return null;

    let val: number;
    if (gender === 'male') {
      val = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      val = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
    }
    return Math.max(0, Math.min(100, val));
  }, [gender, height, neck, waist, hip]);

  const category = useMemo(() => {
    if (bf === null) return { label: 'Check Inputs', color: 'text-[#D93025]' };
    return CATEGORIES[gender].find(c => bf < c.max)!;
  }, [bf, gender]);

  const RANGES = gender === 'male'
    ? [['Essential', '2–5%'], ['Athletes', '6–13%'], ['Fitness', '14–17%'], ['Average', '18–24%'], ['Obese', '25%+']]
    : [['Essential', '10–13%'], ['Athletes', '14–20%'], ['Fitness', '21–24%'], ['Average', '25–31%'], ['Obese', '32%+']];

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'Body Fat Calculator' }]}
      title="Body Fat Calculator"
      description="Estimate your body fat percentage using the U.S. Navy circumference method. Essential tool for fitness tracking and health analysis."
      icon={Scale}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Biological Gender</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {(['male', 'female'] as Gender[]).map((g) => (
                <button 
                  key={g} 
                  onClick={() => update({ gender: g })}
                  className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${gender === g ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Height (cm)</label>
              <input type="number" value={height} onChange={e => update({ height: Number(e.target.value) })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Neck Circ. (cm)</label>
              <input type="number" value={neck} onChange={e => update({ neck: Number(e.target.value) })} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Waist Circ. (cm)</label>
              <input type="number" value={waist} onChange={e => update({ waist: Number(e.target.value) })} className={inputCls} />
            </div>
            {gender === 'female' && (
              <div className="space-y-2">
                <label className={labelCls}>Hip Circ. (cm)</label>
                <input type="number" value={hip} onChange={e => update({ hip: Number(e.target.value) })} className={inputCls} />
              </div>
            )}
          </div>

          <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
             <div className="flex items-center gap-2 mb-3">
               <Ruler className="w-4 h-4 text-[#1A73E8]" />
               <span className="text-[10px] font-bold text-[#70757A] uppercase">How to measure?</span>
             </div>
             <ul className="text-[10px] text-[#5F6368] space-y-2">
                <li>• <strong>Neck:</strong> Below larynx, slanting slightly downward to front.</li>
                <li>• <strong>Waist:</strong> Horizontal, at level of navel for men, at narrowest point for women.</li>
                {gender === 'female' && <li>• <strong>Hip:</strong> Largest horizontal circumference around buttocks.</li>}
             </ul>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Estimate Body Fat
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Estimated Body Fat</div>
            <div className={`text-4xl font-black ${category.color}`}>{bf?.toFixed(1)}%</div>
            <div className={`text-[11px] font-black uppercase tracking-widest bg-white/50 px-4 py-1 rounded-full inline-block mt-2 border border-current ${category.color}`}>{category.label}</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Reference Ranges ({gender})</span>
               <Activity className="w-3 h-3 text-[#1A73E8]" />
             </div>
             <div className="p-4 space-y-3">
                {RANGES.map(([label, range]) => (
                  <div key={label} className="flex justify-between items-center text-xs">
                     <span className="text-[#5F6368]">{label}</span>
                     <span className="font-bold">{range}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-4 space-y-4">
             <div className="flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Visual Scale (0–40%)</span>
               <span className="text-[9px] font-bold uppercase text-[#1A73E8]">Navy Method</span>
             </div>
             <div className="h-4 w-full bg-[#F1F3F4] rounded-full overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-r from-[#1A73E8] via-[#188038] via-[#F29900] to-[#D93025] opacity-20" />
               <div 
                 className="absolute top-0 bottom-0 w-1 bg-[#202124] transition-all duration-700" 
                 style={{ left: `${Math.min(((bf ?? 0) / 40) * 100, 100)}%` }}
               />
             </div>
             <p className="text-[9px] text-[#70757A] text-center italic">The marker indicates your position on the health spectrum.</p>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-center">
            <Info className="w-4 h-4 text-[#F29900] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">This method is accurate within 3-4% for most individuals. For clinical precision, consider a DEXA scan.</p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select your gender to apply the correct U.S. Navy formula.",
          "Measure your height in centimeters accurately.",
          "Measure your neck circumference just below the Adam's apple.",
          "Measure your waist circumference at the navel (men) or narrowest point (women).",
          "For women, also measure the hip circumference at its widest point.",
          "Click 'Estimate Body Fat' to see your percentage and health category."
        ]
      }}
      formula={{
        title: "U.S. Navy Circumference Method",
        description: "A clinically validated method used by the Navy to estimate body composition based on body dimensions.",
        raw: "Male: 495 / (1.0324 - 0.19077×log10(waist-neck) + 0.15456×log10(height)) - 450\nFemale: 495 / (1.29579 - 0.35004×log10(waist+hip-neck) + 0.221×log10(height)) - 450"
      }}
      faqs={[
        {
          question: "How accurate is the Navy Method?",
          answer: "The U.S. Navy Method is highly regarded for its simplicity and reasonable accuracy (typically within ±3% of hydrostatic weighing) for the general population."
        },
        {
          question: "What is a healthy body fat percentage?",
          answer: "Healthy ranges vary by gender and age. Generally, 14-24% for men and 21-31% for women are considered healthy/fitness ranges."
        }
      ]}
      sidebar={{
        title: "Fitness Toolkit",
        links: [
          { label: "BMI Calculator", href: "/calculator/bmi" },
          { label: "BMR Calculator", href: "/calculator/bmr" },
          { label: "Ideal Weight", href: "/calculator/ideal-weight" },
          { label: "Calorie Tool", href: "/calculator/calorie-calculator" },
        ],
        banner: {
          title: "Track Your Progress",
          description: "Muscle is denser than fat. Tracking body fat is often more useful than tracking weight alone for fitness goals.",
          image: "/images/fitness-banner.jpg"
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
