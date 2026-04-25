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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Body Composition Analysis via Anthropometry</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                While the Body Mass Index (BMI) is useful for sweeping population studies, it fails on an individual level because it cannot differentiate between bone, muscle, and adipose tissue (fat). Our <strong className="text-[#202124]">body fat calculator</strong> solves this by utilizing the clinically validated U.S. Navy Circumference Method. By analyzing specific anthropometric measurements (neck, waist, and hips), it isolates fat mass from lean body mass with a high degree of statistical reliability.
              </p>
              <p>
                Understanding your true body fat percentage is the ultimate metric for metabolic health and fitness tracking. A person can have a "normal" BMI but still carry an unhealthy amount of visceral fat around their organs (a condition known as Normal Weight Obesity or "Skinny Fat"). Conversely, a bodybuilder might be classified as "Obese" on a BMI chart but possess an exceptionally lean, healthy body fat percentage.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Diagnostic Ranges & Health Implications</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Essential Fat (2-5% Men, 10-13% Women):</strong> The absolute minimum fat required for basic physical and physiological health. Dipping below these numbers can cause severe hormonal disruption and organ failure.</li>
              <li><strong className="text-[#188038]">Athletic & Fitness (6-17% Men, 14-24% Women):</strong> This optimal zone is characterized by visible muscle definition and peak cardiovascular performance. It is the target range for athletes and highly active individuals.</li>
              <li><strong className="text-[#D93025]">Obese (25%+ Men, 32%+ Women):</strong> Elevated fat levels, particularly visceral fat stored in the abdominal cavity, significantly increase the risk of Type 2 diabetes, systemic inflammation, and cardiovascular disease.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select your biological gender to ensure the algorithm applies the correct physiological fat distribution models.",
          "Measure your height in centimeters. Stand straight without shoes.",
          "Measure your neck circumference exactly below the larynx (Adam's apple), keeping the tape perfectly horizontal.",
          "Measure your waist circumference. For men, measure exactly at the navel. For women, measure at the narrowest point of the abdomen.",
          "For women only: Measure hip circumference at the widest horizontal point of the buttocks.",
          "Ensure the tape is taut but not compressing the skin for maximum algorithmic accuracy."
        ]
      }}
      formula={{
        title: "The U.S. Navy Anthropometric Equation",
        description: "A specialized logarithmic algorithm designed to estimate body density and body fat percentage based on circumferential water displacement theories.",
        raw: "For Men:\n% Fat = 495 / (1.0324 - 0.19077×log10(Waist-Neck) + 0.15456×log10(Height)) - 450\n\nFor Women:\n% Fat = 495 / (1.29579 - 0.35004×log10(Waist+Hip-Neck) + 0.221×log10(Height)) - 450"
      }}
      faqs={[
        {
          question: "How accurate is the U.S. Navy Body Fat Method?",
          answer: "The U.S. Navy Circumference method is highly regarded for its balance of simplicity and accuracy. When measurements are taken correctly, it is generally accurate to within ±3-4% of hydrostatic weighing (the clinical gold standard)."
        },
        {
          question: "Why do women naturally have a higher body fat percentage?",
          answer: "Women require more essential body fat (10-13% vs men's 2-5%) for reproductive health and hormonal balance. Falling below this essential threshold can lead to severe health issues like amenorrhea (loss of menstruation) and osteoporosis."
        },
        {
          question: "Why does the calculator need my neck measurement?",
          answer: "The neck measurement is used as a proxy to estimate your total lean body mass. The algorithm assumes that a larger neck correlates with larger overall bone structure and muscle mass. It subtracts the neck value from the waist value to isolate the true fat mass."
        },
        {
          question: "Is this calculator better than a standard BMI calculator?",
          answer: "Yes, significantly. BMI only looks at total weight versus height. It cannot tell if that weight is fat or muscle. The Body Fat calculator actively attempts to isolate your adipose tissue, providing a much truer picture of your actual metabolic health."
        },
        {
          question: "When is the best time of day to take these measurements?",
          answer: "For maximum consistency, you should take your measurements first thing in the morning, after using the restroom and before eating or drinking anything. This prevents daily bloating or hydration levels from skewing the results."
        },
        {
          question: "What is visceral fat versus subcutaneous fat?",
          answer: "Subcutaneous fat is the 'pinchable' fat located just beneath the skin. Visceral fat is the hard fat stored deep inside the abdominal cavity around your organs. A high waist measurement directly correlates with dangerous levels of visceral fat."
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
