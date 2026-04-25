'use client';
import { useMemo } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Plus, Trash2, Flame, Info } from 'lucide-react';

const MOMO_TYPES = [
  { id: 'buff',    name: 'Buff Momo (Steamed)',    cal: 35, protein: 3.2, fat: 1.8, carbs: 3.5 },
  { id: 'chicken', name: 'Chicken Momo (Steamed)', cal: 30, protein: 2.8, fat: 1.2, carbs: 3.2 },
  { id: 'veg',     name: 'Veg Momo (Steamed)',     cal: 24, protein: 0.8, fat: 0.6, carbs: 4.8 },
  { id: 'cmomo',   name: 'C-Momo (Spicy Fried)',   cal: 48, protein: 2.5, fat: 2.5, carbs: 5.5 },
  { id: 'fried',   name: 'Fried Momo',             cal: 62, protein: 3.0, fat: 4.2, carbs: 3.8 },
];

export default function MomoCalculator() {
  const [state, setState] = useSyncState('momo_counter_v4', {
    items: [{ typeId: 'buff', count: 10 }]
  });
  const { items } = state;

  const result = useMemo(() => {
    let cals = 0, protein = 0, fat = 0, carbs = 0;
    items.forEach(item => {
      const t = MOMO_TYPES.find(m => m.id === item.typeId);
      if (t) { cals += t.cal * item.count; protein += t.protein * item.count; fat += t.fat * item.count; carbs += t.carbs * item.count; }
    });
    return { cals, protein: protein.toFixed(1), fat: fat.toFixed(1), carbs: carbs.toFixed(1) };
  }, [items]);

  const update = (i: number, f: string, v: any) => { const list = [...items]; (list[i] as any)[f] = v; setState({ ...state, items: list }); };
  const add    = () => setState({ ...state, items: [...items, { typeId: 'buff', count: 10 }] });
  const remove = (i: number) => setState({ ...state, items: items.filter((_, idx) => idx !== i) });

  const selectCls = "w-full h-12 px-3 border border-[#DADCE0] rounded-md bg-[#F8F9FA] text-sm font-bold focus:border-[#1A73E8] outline-none text-[#202124] cursor-pointer";
  const inputCls = "w-full h-12 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'Momo Calorie Counter' }]}
      title="Momo Calorie Counter 🥟"
      description="Track calories and macronutrients for Nepal's favourite dish. Mix varieties and serving sizes for a complete nutritional picture."
      icon={Flame}
      inputs={
        <div className="space-y-6">
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div key={idx} className="p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg relative shadow-sm">
                <div className="grid grid-cols-[1fr_90px] gap-4 mb-4">
                  <div>
                    <label className={labelCls}>Momo Type</label>
                    <select value={item.typeId} onChange={e => update(idx, 'typeId', e.target.value)} className={selectCls}>
                      {MOMO_TYPES.map(t => <option key={t.id} value={t.id}>{t.name} ({t.cal} kcal/pc)</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Qty</label>
                    <input type="number" min={1} max={100} value={item.count} onChange={e => update(idx, 'count', Number(e.target.value))} className={inputCls} />
                  </div>
                </div>

                <div className="flex gap-2">
                  {[5, 10, 20].map(p => (
                    <button key={p} onClick={() => update(idx, 'count', p)}
                      className={`flex-1 py-2 text-[10px] font-bold uppercase rounded border transition-all ${item.count === p ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] border-[#DADCE0] hover:bg-[#E8F0FE]'}`}>
                      {p === 5 ? 'Half' : p === 10 ? 'Full' : 'Double'} Plate
                    </button>
                  ))}
                </div>

                {items.length > 1 && (
                  <button onClick={() => remove(idx)} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-[#DADCE0] text-[#D93025] flex items-center justify-center hover:bg-[#FCE8E6] transition-colors shadow-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button onClick={add} className="w-full py-4 border-2 border-dashed border-[#DADCE0] rounded-lg text-xs font-bold text-[#1A73E8] uppercase hover:bg-[#E8F0FE] hover:border-[#1A73E8] transition-all flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Another Plate/Type
          </button>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden mt-6">
            <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#70757A]">Calorie Database (Per Piece)</h3>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              {MOMO_TYPES.map(t => (
                <div key={t.id} className="px-4 py-3 flex justify-between items-center hover:bg-[#F8F9FA]">
                  <span className="text-[11px] font-bold text-[#5F6368]">{t.name}</span>
                  <span className="text-[11px] font-black text-[#1A73E8] bg-[#E8F0FE] px-2 py-1 rounded">{t.cal} kcal</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#1A1A2E] rounded-lg border border-[#DADCE0] text-center shadow-sm relative overflow-hidden">
            <Flame className="absolute top-0 right-0 p-4 w-32 h-32 opacity-10 text-orange-500 pointer-events-none" />
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-2 relative z-10">Total Caloric Intake</div>
            <div className="text-7xl font-black text-orange-500 tracking-tighter mb-2 relative z-10">{result.cals}</div>
            <div className="text-[11px] font-bold text-white/50 uppercase tracking-widest relative z-10">Kilo-Calories (kcal)</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#70757A]">Macronutrient Breakdown</span>
             </div>
             <div className="grid grid-cols-3 divide-x divide-[#DADCE0]">
                {[
                  { label: 'Protein', val: result.protein, unit: 'g', color: 'text-[#1A73E8]' },
                  { label: 'Fat',     val: result.fat,     unit: 'g', color: 'text-[#D93025]'  },
                  { label: 'Carbs',   val: result.carbs,   unit: 'g', color: 'text-[#E37400]'},
                ].map(({ label, val, unit, color }) => (
                  <div key={label} className="p-5 text-center">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#70757A] mb-1">{label}</div>
                    <div className={`text-xl font-black font-mono ${color}`}>{val}{unit}</div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-5 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg flex items-start gap-3">
             <Info className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <p className="text-[11px] text-[#202124] leading-relaxed font-bold">
               {result.cals > 600
                 ? '⚠️ High Calorie Meal: This portion contains significant calories. Consider a 30–45 min brisk walk (burns ≈300 kcal) to help balance your daily intake.'
                 : '✓ Balanced Portion: Steamed momos, particularly chicken or veg, are a relatively balanced food choice when eaten in moderation.'}
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">The Nutritional Mathematics of Nepal's Staple</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Momos are undeniably deeply ingrained in Nepalese culture, but for fitness enthusiasts and individuals monitoring their macronutrients, tracking exactly how many <strong className="text-[#202124]">calories in one plate momo in nepal</strong> is crucial. Our algorithm analyzes standard Kathmandu restaurant serving sizes (typically 10 pieces per plate) to provide a granular macronutrient breakdown, shifting dietary guesswork into precise mathematical accounting.
              </p>
              <p>
                From calculating exactly <strong className="text-[#202124]">1 plate chicken momo calories</strong> to analyzing the carbohydrate density of flour wrappers, this tool allows users to safely incorporate their favorite street food into their daily Basal Metabolic Rate (BMR) allowance without breaking their caloric deficit or bulking goals.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Preparation Methods and Caloric Friction</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Steamed vs. Fried:</strong> The cooking method exponentially impacts the energy density. While baseline <strong className="text-[#202124]">veg momo calories</strong> are low (approx. 24 kcal per steamed piece), deep-frying them forces the refined flour wrapper to absorb lipids, nearly tripling the fat content and caloric density.</li>
              <li><strong className="text-[#188038]">Protein Ratios:</strong> Buff and Chicken fillings provide a respectable protein-to-calorie ratio, making steamed variants a viable post-workout meal when tracked accurately against daily protein targets.</li>
              <li><strong className="text-[#D93025]">The Achar/Jhol Variable:</strong> It is critical to account for accompaniments. While the calculator focuses on the dumplings, users must be aware that <strong className="text-[#202124]">jhol momo calories</strong> (sesame/peanut-based liquid broths) add a highly concentrated source of invisible fats, often adding 100-150 uncounted calories to the total meal.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select your momo type (Buff, Chicken, Veg, C-Momo, etc).", "Select the quantity using the quick preset buttons (Half/Full Plate) or enter a custom amount.", "Click 'Add Another Plate' to track mixed orders (e.g. half buff, half veg).", "View your total calories and protein/fat/carb macros instantly."] }}
      formula={{ title: "Nutritional Estimates", description: "Based on standard Nepali restaurant preparations.", raw: "Calorie estimates assume standard commercial wrappers and meat-to-fat ratios common in Kathmandu.\n\nSteamed Momos ≈ 30-35 kcal/pc\nFried Momos ≈ 60-65 kcal/pc\n\nMacronutrients are approximate. Achar (sauce) adds roughly 30-50 extra calories per plate depending on oil content." }}
      faqs={[
        { question: "Does this include the Achar (sauce)?", answer: "No. The standard tomato achar adds about 40 kcal per plate. Oily sauces like peanut or sesame jhol can add over 100 kcal." },
        { question: "Why are fried momos so high in calories?", answer: "The deep-frying process forces the dough wrapper to absorb a significant amount of cooking oil, nearly doubling the caloric density compared to steaming." }
      ]}
      sidebar={{ title: "Health & Fitness", links: [{ label: "BMI Calculator", href: "/calculator/bmi" }, { label: "Blood Pressure", href: "/calculator/blood-pressure" }], banner: { title: "Stay Active", description: "You need to walk about 1 mile to burn off just 3 pieces of Buff Momo.", image: "/images/health-banner.jpg" } }}
      relatedTools={[{ label: "BMI Calculator", href: "/calculator/bmi" }]}
    />
  );
}
