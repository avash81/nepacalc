'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Scale, Info, Activity } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

type Gender = 'male' | 'female';

export default function IdealWeightCalculator() {
  const [state, setState] = useSyncState('ideal_weight_v4', { gender: 'male' as Gender, heightCm: 170 });
  const { gender, heightCm } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const inchesOver5ft = Math.max(0, heightCm / 2.54, 60);

  const r = useMemo(() => {
    const base = gender === 'male' ? 50.0 : 45.5;
    const ideal = base + 2.3 * inchesOver5ft;
    return { ideal, min: ideal * 0.9, max: ideal * 1.1 };
  }, [gender, inchesOver5ft]);

  const FORMULAS = [
    { name: 'Devine',    male: 50 + 2.3 * inchesOver5ft,    female: 45.5 + 2.3 * inchesOver5ft },
    { name: 'Robinson',  male: 52 + 1.9 * inchesOver5ft,    female: 49 + 1.7 * inchesOver5ft },
    { name: 'Miller',    male: 56.2 + 1.41 * inchesOver5ft, female: 53.1 + 1.36 * inchesOver5ft },
  ];

  const ft = Math.floor(heightCm / 2.54 / 12);
  const inches = Math.round((heightCm / 2.54) % 12);
  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'Ideal Weight Calculator' }]}
      title="Ideal Weight Calculator"
      description="Calculate your ideal healthy weight range using medically validated formulas (Devine, Robinson, Miller). Instantly see your target in kg and lbs."
      icon={Scale}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Gender</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {(['male', 'female'] as Gender[]).map(g => (
                <button key={g} onClick={() => update({ gender: g })}
                  className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${gender === g ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className={labelCls}>Height</label>
              <span className="text-[11px] font-black text-[#1A73E8]">{heightCm} cm ({ft}' {inches}")</span>
            </div>
            <input type="number" value={heightCm} min={100} max={250}
              onChange={e => update({ heightCm: Number(e.target.value) })} className={inputCls} />
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Formula Comparison</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              {FORMULAS.map(f => (
                <div key={f.name} className="px-4 py-3 flex justify-between items-center">
                  <span className="text-[11px] font-bold text-[#5F6368] uppercase">{f.name}</span>
                  <span className="text-sm font-black text-[#1A73E8]">{(gender === 'male' ? f.male : f.female).toFixed(1)} kg</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Ideal Weight
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Ideal Weight (Devine)</div>
            <div className="text-4xl font-black text-[#188038]">{r.ideal.toFixed(1)} kg</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">≈ {(r.ideal * 2.20462).toFixed(1)} lbs</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Healthy Range (±10%)</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Lower Limit</span>
                <span className="font-black">{r.min.toFixed(1)} kg</span>
              </div>
              <div className="p-3 flex justify-between text-xs bg-[#E8F0FE]">
                <span className="font-bold text-[#1A73E8]">Ideal Target</span>
                <span className="font-black text-[#1A73E8]">{r.ideal.toFixed(1)} kg</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Upper Limit</span>
                <span className="font-black">{r.max.toFixed(1)} kg</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Athletes and individuals with high muscle mass may healthily exceed these ranges. Consult a physician for a personalized target.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Clinical Weight Targeting & Physiological Optimization</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In clinical nutrition and pharmacological dosing, determining a patient's <strong className="text-[#202124]">ideal body weight</strong> is crucial for ensuring the safe administration of medications and plotting long-term health trajectories. Unlike Body Mass Index (BMI), which offers a broad categorical range based on population averages, an ideal weight calculator utilizes established physiological algorithms to pinpoint a specific, actionable weight target based on a person's exact height and biological sex.
              </p>
              <p>
                Our tool cross-references the three most scientifically validated formulas: Devine, Robinson, and Miller. The <strong className="text-[#202124]">Devine formula</strong> serves as our primary anchor, as it remains the undisputed gold standard in medical environments globally. It calculates a basal weight for a base height (5 feet) and scales mathematically for every additional inch, providing a highly reliable benchmark for individuals looking to set precise fitness and dietary goals.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The Science Behind the Primary Formulas</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">The Devine Algorithm (1974):</strong> Originally developed to calculate precise pharmacokinetics (specifically the clearance of drugs like gentamicin). It is the most universally accepted metric for establishing a baseline "healthy" weight.</li>
              <li><strong className="text-[#188038]">The Robinson Algorithm (1983):</strong> Created as an adjustment to the Devine method. It typically suggests a slightly heavier baseline for both men and women, compensating for changes in modern bone density and average body composition.</li>
              <li><strong className="text-[#D93025]">The 10% Healthy Variance Zone:</strong> Medical science acknowledges that human anatomy is heavily influenced by genetics, bone structure (frame size), and muscle mass. Therefore, any ideal weight calculation serves as the exact midpoint of a healthy range. Our tool automatically calculates a safe ±10% buffer around this target, ensuring your goals remain realistic and physiologically sound.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select your biological gender, as male and female physiological algorithms differ significantly in baseline mass.",
          "Enter your height in centimeters. The system will instantly convert this to feet and inches for algorithmic processing.",
          "Review your primary target weight generated by the Devine formula in the results panel.",
          "Compare this target against the Robinson and Miller formulas in the comparison table.",
          "Aim for the 'Healthy Range' (±10%), rather than fixating strictly on the absolute numerical target."
        ]
      }}
      formula={{
        title: "The Devine Formula (Clinical Standard)",
        description: "The universally accepted algorithm for calculating baseline ideal body mass based on height scalars.",
        raw: "Male Baseline: 50.0 kg + 2.3 kg per inch over 5 feet\nFemale Baseline: 45.5 kg + 2.3 kg per inch over 5 feet\n\n(If under 5 feet, the baseline is proportionally scaled down)"
      }}
      faqs={[
        {
          question: "Why do these formulas give a different result than BMI?",
          answer: "BMI provides a broad, population-level weight range (e.g., 'anything between 60kg and 80kg is normal for your height'). An ideal weight formula attempts to pinpoint the exact mathematical midpoint of that range for clinical precision, like drug dosing."
        },
        {
          question: "Why do the Devine, Robinson, and Miller formulas differ?",
          answer: "They were created in different decades by different medical researchers studying different demographics. The Devine formula is the most widely adopted by hospitals, while Robinson tends to yield slightly heavier, more realistic targets for modern populations."
        },
        {
          question: "Does this calculator account for my muscle mass?",
          answer: "No. None of the clinical ideal weight formulas account for lean muscle mass. A highly muscular athlete or bodybuilder will likely weigh significantly more than their 'ideal' calculated weight, despite having extremely low body fat and excellent metabolic health."
        },
        {
          question: "What if I have a large bone structure (large frame size)?",
          answer: "These algorithms assume an 'average' frame size. If you have noticeably broad shoulders, thick wrists, and a heavy bone structure, you should aim for the upper limit of the ±10% 'Healthy Range' rather than the exact mathematical midpoint."
        },
        {
          question: "Can I use this calculator for children or teenagers?",
          answer: "No. These algorithms are strictly designed for adults who have finished growing. Pediatricians use highly specific 'growth chart percentiles' to determine healthy weights for children and adolescents."
        },
        {
          question: "Why is the baseline weight different for men and women?",
          answer: "Biological men naturally carry denser bone structures and a higher ratio of essential lean muscle tissue compared to biological women of the exact same height. The algorithms account for this by utilizing a heavier baseline (50.0 kg vs 45.5 kg)."
        }
      ]}
      sidebar={{ title: "Health Toolkit", links: [{ label: "BMI Calculator", href: "/calculator/bmi/" }, { label: "Body Fat %", href: "/calculator/body-fat/" }, { label: "BMR Calculator", href: "/calculator/bmr/" }, { label: "Calorie Tool", href: "/calculator/calorie-calculator/" }], banner: { title: "Healthy Goals", description: "Use the ideal weight range alongside BMI for a more complete picture of health.", image: "/images/weight-banner.jpg" } }}
      relatedTools={[{ label: "BMI Calculator", href: "/calculator/bmi/" }, { label: "Body Fat %", href: "/calculator/body-fat/" }, { label: "BMR Calculator", href: "/calculator/bmr/" }]}
    />
  );
}
