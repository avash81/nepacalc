'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Droplets, Info } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const ACTIVITY_OPTS = [
  { label: 'Sedentary (0 min)',   mins: 0   },
  { label: 'Light (30 min)',      mins: 30  },
  { label: 'Moderate (60 min)',   mins: 60  },
  { label: 'Active (90 min)',     mins: 90  },
  { label: 'Very Active (120+)',  mins: 120 },
];

export default function WaterIntakeCalculator() {
  const [state, setState] = useSyncState('water_v4', { weight: 70, activity: 30 });
  const { weight, activity } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const base = weight * 35;
    const extra = (activity / 30) * 350;
    const totalMl = base + extra;
    return { totalMl, liters: totalMl / 1000, glasses: Math.ceil(totalMl / 250) };
  }, [weight, activity]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";
  const glassIcons = Array.from({ length: Math.min(r.glasses, 12) }, (_, i) => i);

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'Water Calculator' }]}
      title="Daily Water Intake Calculator"
      description="Calculate your optimal daily water intake based on body weight and activity level. Personalized hydration recommendations backed by science."
      icon={Droplets}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Body Weight (kg)</label>
            <input type="number" value={weight} min={20} max={300}
              onChange={e => update({ weight: Number(e.target.value) })} className={inputCls} />
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Daily Exercise Level</label>
            <div className="space-y-2">
              {ACTIVITY_OPTS.map(a => (
                <button key={a.mins} onClick={() => update({ activity: a.mins })}
                  className={`w-full p-3 border rounded-lg text-left flex justify-between items-center transition-all ${activity === a.mins ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0]'}`}>
                  <span className={`text-[12px] font-bold ${activity === a.mins ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{a.label}</span>
                  {a.mins > 0 && <span className="text-[10px] text-[#70757A]">+{(a.mins / 30 * 0.35).toFixed(2)}L</span>}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Hydration
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Daily Recommendation</div>
            <div className="text-4xl font-black text-[#1A73E8]">{r.liters.toFixed(1)} L</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">≈ {r.glasses} glasses of 250ml each</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#70757A] uppercase mb-3">Hydration Tracker</div>
            <div className="flex flex-wrap gap-2">
              {glassIcons.map(i => (
                <div key={i} className="w-9 h-9 bg-[#E8F0FE] border border-[#1A73E8]/30 rounded-lg flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-[#1A73E8]" />
                </div>
              ))}
              {r.glasses > 12 && (
                <div className="w-9 h-9 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg flex items-center justify-center text-[9px] font-black text-[#5F6368]">+{r.glasses - 12}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Base (weight)</div>
              <div className="text-sm font-black">{(weight * 35 / 1000).toFixed(2)} L</div>
            </div>
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Exercise Bonus</div>
              <div className="text-sm font-black text-[#188038]">+{((activity / 30) * 0.35).toFixed(2)} L</div>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
            <Info className="w-4 h-4 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124]">Formula: 35ml × weight + (activity/30) × 350ml</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter your current body weight in kg.", "Select your daily exercise level.", "View the total daily water recommendation in liters and glasses."] }}
      formula={{ title: "Hydration Formula", description: "Based on the 35ml-per-kg standard with activity adjustment.", raw: "Base = Weight (kg) × 35ml\nExtra = (Exercise minutes / 30) × 350ml\nTotal = Base + Extra" }}
      faqs={[
        { question: "Is 8 glasses a day the right amount?", answer: "The 8-glasses rule is a general guideline. Your actual need depends on weight, activity, climate, and health status. This calculator gives a personalized estimate." },
        { question: "Does tea or coffee count?", answer: "Plain water is best. While tea and coffee contribute to fluid intake, their mild diuretic effect means they should not fully replace water." }
      ]}
      sidebar={{ title: "Health Toolkit", links: [{ label: "BMI Calculator", href: "/calculator/bmi" }, { label: "BMR Calculator", href: "/calculator/bmr" }, { label: "Calorie Tool", href: "/calculator/calorie-calculator" }, { label: "Ideal Weight", href: "/calculator/ideal-weight" }], banner: { title: "Stay Hydrated", description: "Even mild dehydration of 1-2% body water can impair physical and cognitive performance.", image: "/images/water-banner.jpg" } }}
      relatedTools={[{ label: "BMI Calculator", href: "/calculator/bmi" }, { label: "BMR Calculator", href: "/calculator/bmr" }, { label: "Calorie Tool", href: "/calculator/calorie-calculator" }]}
    />
  );
}
