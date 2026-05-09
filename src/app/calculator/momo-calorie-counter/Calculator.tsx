'use client';
import { useMemo } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Plus, Trash2, Flame, Info, Activity } from 'lucide-react';

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

  return (
    <ModernCalcLayout
      slug="momo-calorie-counter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Health Tools', href: '/health/' }, { label: 'Momo Counter' }]}
      title="Institutional Momo Calorie Counter & Macro Audit"
      description="The definitive nutritional engine for Nepal's staple dish. Calibrated to standard Kathmandu restaurant serving sizes with high-precision macro tracking."
      icon={Flame}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden border border-[#dadce0]">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Flame className="w-40 h-40" /></div>
             <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Inventory Slabs</label>
                   <button onClick={add} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-[#202124] text-[9px] font-black uppercase rounded-xl transition-all shadow-sm flex items-center gap-2">
                      <Plus className="w-3 h-3" /> Add Variety
                   </button>
                </div>
                
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-[2rem] relative group transition-all hover:border-orange-500/50">
                       <div className="grid grid-cols-1 md:grid-cols-[1fr_100px] gap-6">
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Plate Variety</label>
                             <select value={item.typeId} onChange={e => update(idx, 'typeId', e.target.value)} className="w-full h-12 px-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-[#202124] text-sm font-black focus:border-orange-500 outline-none cursor-pointer">
                                {MOMO_TYPES.map(t => <option key={t.id} value={t.id} className="bg-white border border-[#dadce0]">{t.name}</option>)}
                             </select>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Piece Qty</label>
                             <input type="number" min={1} value={item.count} onChange={e => update(idx, 'count', Number(e.target.value))} className="w-full h-12 px-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-[#202124] text-sm font-black focus:border-orange-500 outline-none" />
                          </div>
                       </div>

                       <div className="flex gap-2 mt-6">
                          {[5, 10, 20].map(p => (
                             <button key={p} onClick={() => update(idx, 'count', p)} className={`flex-1 py-2 text-[8px] font-black uppercase rounded-lg border transition-all ${item.count === p ? 'bg-orange-600 border-orange-600 text-[#202124] shadow-sm scale-105' : 'bg-[#f8f9fa] border-[#dadce0] text-slate-400 hover:bg-white/10'}`}>
                                {p === 5 ? 'Half' : p === 10 ? 'Full' : 'Double'} Plate
                             </button>
                          ))}
                       </div>

                       {items.length > 1 && (
                         <button onClick={() => remove(idx)} className="absolute -top-2 -right-2 w-8 h-8 bg-rose-600 text-[#202124] rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 className="w-4 h-4" />
                         </button>
                       )}
                    </div>
                  ))}
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg"><Info className="w-4 h-4 text-orange-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Calorie Intelligence Base</h3>
             </div>
             <div className="divide-y divide-slate-100">
                {MOMO_TYPES.map(t => (
                   <div key={t.id} className="py-3 flex justify-between items-center group">
                      <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{t.name}</span>
                      <span className="text-[11px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{t.cal} kcal/pc</span>
                   </div>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Flame className="w-24 h-24 text-orange-600" /></div>
             <div className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">Total Caloric Payload</div>
             <div className="text-6xl font-black tracking-tighter text-slate-900 font-mono uppercase">{result.cals}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Kilo-Calories (kcal)
             </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
             {[
               { l: 'PRO', v: result.protein, c: 'text-blue-600', bg: 'bg-blue-50', b: 'border-blue-100' },
               { l: 'FAT', v: result.fat,     c: 'text-rose-600', bg: 'bg-rose-50', b: 'border-rose-100'  },
               { l: 'CHO', v: result.carbs,   c: 'text-amber-600',bg: 'bg-amber-50',b: 'border-amber-100'},
             ].map(m => (
               <div key={m.l} className={`p-5 rounded-lg border ${m.b} ${m.bg} text-center space-y-1`}>
                  <div className={`text-[9px] font-black uppercase tracking-widest ${m.c}`}>{m.l}</div>
                  <div className={`text-lg font-black ${m.c}`}>{m.v}g</div>
               </div>
             ))}
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Activity className="w-24 h-24 text-orange-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400">Daily Allowance Hub</h4>
                   <p className="text-xl font-black">{((result.cals / 2000) * 100).toFixed(1)}% of 2k Limit</p>
                </div>
                <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-orange-400" style={{ width: `${Math.min(100, (result.cals / 2000) * 100)}%` }} />
                </div>
             </div>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-4">
             <div className="p-3 bg-white rounded-2xl shadow-sm"><Info className="w-5 h-5 text-blue-600" /></div>
             <p className="text-[10px] text-slate-600 leading-relaxed font-bold uppercase tracking-tight">
               {result.cals > 600
                 ? 'Institutional Alert: High energy density detected. Consider a 45-minute brisk walk to offset this intake.'
                 : 'Balanced Audit: This portion aligns with standard nutritional guidelines for a single meal.'}
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
        {
          question: "Are momos healthy for weight loss?",
          answer: "Steamed chicken or veg momos can absolutely fit into a weight loss diet if portion-controlled. Because a single steamed momo is around 30-35 calories, a half plate (5 pieces) serves as a reasonable 150-170 calorie snack that is high in protein and satiety."
        },
        {
          question: "Why are fried momos so much higher in calories?",
          answer: "The white flour dough used for momo wrappers acts like a sponge when deep-fried. The wrapper absorbs dense cooking oil during the frying process, which nearly doubles the caloric density and severely spikes the saturated fat content compared to steaming."
        },
        {
          question: "Does the calorie count include the typical tomato achar?",
          answer: "No. The calculator focuses strictly on the dumplings. A standard side of tomato-based achar adds approximately 30-50 calories per plate. However, heavily oiled sauces like peanut/sesame 'jhol' can add over 100-150 unaccounted calories."
        },
        {
          question: "Which type of momo has the most protein?",
          answer: "Buff momos typically provide the highest protein-to-calorie ratio, offering about 3.2 grams of protein per piece. Chicken momos follow closely behind. Veg momos, while lower in calories, offer very little protein (under 1g per piece)."
        },
        {
          question: "What exactly is a 'C-Momo' and why is it calorically dense?",
          answer: "C-Momo (Chilli Momo) involves first frying the momos, and then heavily tossing them in a thick, sweet-and-spicy sauce made from oil, soy, and chili paste. You are consuming the calories of fried momos plus the heavy sugar and oil from the thick sauce."
        },
        {
          question: "Is it bad to eat a full plate of momos every day?",
          answer: "While momos are delicious, a daily full plate of steamed buff momos (10 pieces) equates to about 350 calories. If this fits within your Total Daily Energy Expenditure (TDEE), you won't gain weight. However, relying on refined white flour daily may lack necessary dietary fiber."
        }
      ]}
      sidebar={{ title: "Health & Fitness", links: [
          { label: "BMI Calculator", href: "/calculator/bmi/" }, { label: "Blood Pressure", href: "/calculator/blood-pressure/" },
          { label: "Age Calculator", href: "/calculator/age-calculator/" },
          { label: "BMI Calculator", href: "/calculator/bmi/" },
          { label: "Gratuity Calc", href: "/calculator/gratuity-calculator/" }
        ], banner: { title: "Stay Active", description: "You need to walk about 1 mile to burn off just 3 pieces of Buff Momo.", image: "/images/health-banner.jpg" } }}
      relatedTools={[
        { label: "BMI Calculator", href: "/calculator/bmi/" },
        { label: "Age Calculator", href: "/calculator/age-calculator/" },
          { label: "BMI Calculator", href: "/calculator/bmi/" },
          { label: "Gratuity Calc", href: "/calculator/gratuity-calculator/" }
      ]}
    />
  );
}
