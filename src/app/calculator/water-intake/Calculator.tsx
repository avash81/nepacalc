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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Hydration Science & Cellular Water Balance</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Water is the single most critical nutrient in the human body, accounting for approximately 60% of total body mass. Every biological process—from cellular respiration and nutrient transport to thermoregulation and joint lubrication—is dependent on maintaining adequate hydration. Our <strong className="text-[#202124]">daily water intake calculator</strong> uses a precision algorithm that accounts for your personal biometric profile and physical activity level to generate a scientifically grounded hydration target.
              </p>
              <p>
                The standard medical guideline of "8 glasses a day" is a dangerous oversimplification. A sedentary 50 kg woman requires fundamentally different hydration levels than an active 90 kg man working outdoors. Our formula anchors to the internationally accepted <strong className="text-[#202124]">35 ml per kilogram of body weight</strong> baseline, and then applies a rigorously validated exercise surplus to account for sweat-based fluid and electrolyte losses.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Physiological Consequences of Dehydration Stages</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Mild Dehydration (1-2% Body Water Loss):</strong> At just 1-2% fluid deficit, measurable cognitive impairment, reduced short-term memory, and decreased physical endurance have been clinically documented. Most people don't feel thirst until this threshold is already crossed.</li>
              <li><strong className="text-[#F29900]">Moderate Dehydration (3-5%):</strong> Headaches, significantly reduced exercise performance, elevated heart rate, and concentrated dark yellow urine are the primary indicators. At this stage, kidney filtration efficiency drops noticeably.</li>
              <li><strong className="text-[#D93025]">Severe Dehydration (&gt;6%):</strong> A medical emergency requiring immediate intervention. Symptoms include extreme fatigue, confusion, rapid heart rate, sunken eyes, and seizure risk. This occurs rapidly during fever or intense physical labor in high-temperature environments like Nepal's Terai.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your current body weight in kilograms. This is the primary variable that determines your base hydration requirement.",
          "Select your daily exercise duration from the activity level selector.",
          "Review the total personalized daily water recommendation displayed in both liters and equivalent 250 ml glasses.",
          "Check the breakdown showing your weight-based baseline versus the bonus hydration needed for exercise."
        ]
      }}
      formula={{
        title: "Hydration Algorithm",
        description: "Based on the 35ml-per-kg medical standard combined with a validated exercise fluid replacement rate.",
        raw: "Base Requirement = Weight (kg) × 35 ml\nExercise Bonus = (Exercise Minutes / 30) × 350 ml\n\nTotal Daily Water Intake = Base + Exercise Bonus"
      }}
      faqs={[
        {
          question: "Why is the '8 glasses a day' rule inaccurate?",
          answer: "The '8 glasses a day' rule is a dangerously generic approximation. A 50 kg sedentary person requires roughly 1.75L, while a 90 kg athlete may need 4L or more. Hydration science is deeply personal—it depends on body mass, climate, altitude, sweat rate, and diet."
        },
        {
          question: "Does exercise increase how much water I need?",
          answer: "Yes, significantly. When exercising, your body loses water and electrolytes through sweat at a rate of roughly 350-700 ml per 30 minutes of moderate activity. This fluid must be actively replaced to maintain blood volume and prevent cardiovascular strain."
        },
        {
          question: "Does tea, coffee, or juice count toward my daily water intake?",
          answer: "Partially. While all beverages contribute to fluid intake, caffeine in tea and coffee has a mild diuretic effect, increasing urine output. Plain water remains the gold standard. High-sugar juices add calories without the clean hydration benefit of water."
        },
        {
          question: "What are the physical signs that I am dehydrated?",
          answer: "Early signs include dark yellow urine, infrequent urination, dry mouth, and feeling sluggish. A key clinical indicator is urine color: pale yellow indicates good hydration, while dark amber is a clear warning sign of significant dehydration."
        },
        {
          question: "Can I drink too much water?",
          answer: "Yes. Hyponatremia (water intoxication) occurs when excessive water intake dilutes sodium levels in the blood. Though rare in everyday life, it is a documented risk for endurance athletes who drink only plain water for hours without electrolyte replenishment."
        },
        {
          question: "Does altitude in Nepal affect hydration needs?",
          answer: "Absolutely. At high altitudes (as found in Nepal's Himalayan trekking regions), the air is thinner and drier. Your respiratory rate increases, causing significantly more water to be exhaled with each breath. Trekkers in the Himalayas should increase their water intake by at least 30-40% above this calculator's baseline."
        }
      ]}
      sidebar={{ title: "Health Toolkit", links: [{ label: "BMI Calculator", href: "/calculator/bmi" }, { label: "BMR Calculator", href: "/calculator/bmr" }, { label: "Calorie Tool", href: "/calculator/calorie-calculator" }, { label: "Ideal Weight", href: "/calculator/ideal-weight" }], banner: { title: "Stay Hydrated", description: "Even mild dehydration of 1-2% body water can impair physical and cognitive performance.", image: "/images/water-banner.jpg" } }}
      relatedTools={[{ label: "BMI Calculator", href: "/calculator/bmi" }, { label: "BMR Calculator", href: "/calculator/bmr" }, { label: "Calorie Tool", href: "/calculator/calorie-calculator" }]}
    />
  );
}
