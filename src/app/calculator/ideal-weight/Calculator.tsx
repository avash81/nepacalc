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

  const inchesOver5ft = Math.max(0, heightCm / 2.54 - 60);

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

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
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
      howToUse={{ steps: ["Select your biological gender.", "Enter your height in centimeters.", "Review ideal weight from the Devine formula and compare with Robinson & Miller.", "Use the healthy range (±10%) as your realistic target zone."] }}
      formula={{ title: "Devine Formula (Primary)", description: "The most widely used ideal weight formula in clinical settings.", raw: "Male: 50.0 + 2.3 × (inches over 5ft)\nFemale: 45.5 + 2.3 × (inches over 5ft)" }}
      faqs={[
        { question: "Which formula should I use?", answer: "The Devine formula is the clinical standard and is used in most medical dosing calculations. Robinson and Miller are alternative validations for cross-reference." },
        { question: "Why do formulas differ by gender?", answer: "Men typically have higher bone density and muscle mass for the same height, resulting in a higher ideal weight baseline." }
      ]}
      sidebar={{ title: "Health Toolkit", links: [{ label: "BMI Calculator", href: "/calculator/bmi" }, { label: "Body Fat %", href: "/calculator/body-fat" }, { label: "BMR Calculator", href: "/calculator/bmr" }, { label: "Calorie Tool", href: "/calculator/calorie-calculator" }], banner: { title: "Healthy Goals", description: "Use the ideal weight range alongside BMI for a more complete picture of health.", image: "/images/weight-banner.jpg" } }}
      relatedTools={[{ label: "BMI Calculator", href: "/calculator/bmi" }, { label: "Body Fat %", href: "/calculator/body-fat" }, { label: "BMR Calculator", href: "/calculator/bmr" }]}
    />
  );
}
