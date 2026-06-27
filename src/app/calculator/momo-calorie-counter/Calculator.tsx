'use client';
import { useMemo } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Flame, Info, Activity, Scale, Heart, Utensils } from 'lucide-react';
import Link from 'next/link';

const TYPES = [
  { id: 'chicken', label: 'Chicken', cal: 60, p: 4, c: 6, f: 2, w: 40 },
  { id: 'veg', label: 'Veg', cal: 45, p: 1, c: 8, f: 1, w: 40 },
  { id: 'buff', label: 'Buff', cal: 65, p: 4.5, c: 6, f: 2.5, w: 40 },
  { id: 'paneer', label: 'Paneer', cal: 75, p: 3, c: 6, f: 4, w: 40 },
  { id: 'pork', label: 'Pork', cal: 80, p: 4, c: 6, f: 4.5, w: 40 },
  { id: 'mutton', label: 'Mutton', cal: 70, p: 4, c: 6, f: 3.5, w: 40 },
];

const METHODS = [
  { id: 'steamed', label: 'Steamed', cal: 0, p: 0, c: 0, f: 0, w: 0 },
  { id: 'fried', label: 'Fried', cal: 25, p: 0, c: 0, f: 2.8, w: -5 },
  { id: 'jhol', label: 'Jhol', cal: 10, p: 0.5, c: 1, f: 1, w: 25 },
  { id: 'tandoori', label: 'Tandoori', cal: 30, p: 1, c: 2, f: 2, w: -2 },
  { id: 'pan_fried', label: 'Pan Fried', cal: 15, p: 0, c: 1, f: 1.5, w: -3 },
  { id: 'chilli', label: 'Chilli', cal: 40, p: 1, c: 5, f: 2, w: 15 },
];

export default function MomoCalculator() {
  const [state, setState] = useSyncState('momo_counter_v6', {
    type: 'chicken',
    method: 'steamed',
    pieces: 6,
    serving: 'total' as 'total' | 'piece'
  });
  
  const { type, method, pieces, serving } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const t = TYPES.find(x => x.id === type) || TYPES[0];
    const m = METHODS.find(x => x.id === method) || METHODS[0];
    
    // Per piece calculation
    const ppCal = t.cal + m.cal;
    const ppP = t.p + m.p;
    const ppC = t.c + m.c;
    const ppF = t.f + m.f;
    const ppW = t.w + m.w;
    
    // Multiplier based on serving mode
    const mult = serving === 'total' ? pieces : 1;
    
    const cal = ppCal * mult;
    const p = ppP * mult;
    const c = ppC * mult;
    const f = ppF * mult;
    const w = ppW * mult;

    let rating = "Moderate";
    let density = (cal / w).toFixed(2);
    if (Number(density) > 2.2) rating = "High Calorie Density";
    if (Number(density) < 1.5) rating = "Healthy / Low Density";

    return { cal, p, c, f, w, ppCal, density, rating, tLabel: t.label, mLabel: m.label };
  }, [type, method, pieces, serving]);

  return (
    <ModernCalcLayout
      slug="momo-calorie-counter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Calculators', href: '/calculators/' }, { label: 'Momo Calorie Counter' }]}
      title="Momo Calorie Counter"
      description="Calculate calories in momos instantly. Estimate calories for chicken, veg, steamed, fried, jhol, paneer, buff and tandoori momos."
      icon={Flame}
      inputs={
        <div className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Momo Type</label>
                 <select 
                    value={type} 
                    onChange={e => update({ type: e.target.value })} 
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none appearance-none"
                 >
                    {TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Cooking Method</label>
                 <select 
                    value={method} 
                    onChange={e => update({ method: e.target.value })} 
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none appearance-none"
                 >
                    {METHODS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                 </select>
              </div>
           </div>

           <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Pieces</label>
                <span className="text-[11px] font-black text-orange-600">{pieces}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={pieces} 
                onChange={e => update({ pieces: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex gap-2 pt-2">
                 {[1, 5, 6, 8, 10, 12].map(n => (
                    <button 
                      key={n} 
                      onClick={() => update({ pieces: n })}
                      className={`flex-1 py-2 text-[10px] font-bold rounded border ${pieces === n ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'}`}
                    >
                       {n}
                    </button>
                 ))}
              </div>
           </div>

           <div className="space-y-2 pt-4">
              <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block mb-3">Output Format</label>
              <div className="flex gap-4">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={serving === 'piece'} onChange={() => update({ serving: 'piece' })} className="w-4 h-4 text-orange-500 border-[#DADCE0] focus:ring-orange-500" />
                    <span className="text-sm font-bold text-[#202124]">Per Piece</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={serving === 'total'} onChange={() => update({ serving: 'total' })} className="w-4 h-4 text-orange-500 border-[#DADCE0] focus:ring-orange-500" />
                    <span className="text-sm font-bold text-[#202124]">Total Plate ({pieces} pcs)</span>
                 </label>
              </div>
           </div>
        </div>
      }
      results={
        <div className="space-y-6">
           <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-center space-y-2 relative overflow-hidden">
              <Flame className="absolute -right-4 -top-4 w-24 h-24 text-orange-500/10" />
              <div className="text-[11px] font-black text-orange-600 uppercase tracking-widest relative z-10">
                 {serving === 'total' ? `${pieces} ${result.mLabel} ${result.tLabel} Momos` : `1 ${result.mLabel} ${result.tLabel} Momo`}
              </div>
              <div className="text-5xl font-black text-[#202124] relative z-10">{Math.round(result.cal)} <span className="text-lg text-[#5F6368]">kcal</span></div>
              <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider relative z-10 pt-2 flex items-center justify-center gap-2">
                 <Heart className="w-3 h-3 text-rose-500" /> {result.rating} ({result.density} kcal/g)
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#DADCE0] rounded-lg p-4 text-center">
                 <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Protein</div>
                 <div className="text-xl font-bold text-[#202124]">{result.p.toFixed(1)}g</div>
              </div>
              <div className="bg-white border border-[#DADCE0] rounded-lg p-4 text-center">
                 <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Carbs</div>
                 <div className="text-xl font-bold text-[#202124]">{result.c.toFixed(1)}g</div>
              </div>
              <div className="bg-white border border-[#DADCE0] rounded-lg p-4 text-center">
                 <div className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Fat</div>
                 <div className="text-xl font-bold text-[#202124]">{result.f.toFixed(1)}g</div>
              </div>
              <div className="bg-white border border-[#DADCE0] rounded-lg p-4 text-center">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Weight</div>
                 <div className="text-xl font-bold text-[#202124]">{Math.round(result.w)}g</div>
              </div>
           </div>

           <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
                 <h4 className="text-[10px] font-black text-[#202124] uppercase tracking-widest flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-orange-500" /> Quick Calorie Table
                 </h4>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                    <thead>
                       <tr className="border-b border-[#DADCE0] text-[10px] uppercase tracking-wider text-[#5F6368] bg-white">
                          <th className="px-4 py-3 font-bold">Type</th>
                          <th className="px-4 py-3 font-bold text-right">Calories</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F3F4]">
                       <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#202124]">Steamed Chicken Momo</td><td className="px-4 py-3 text-right text-orange-600 font-bold">60 kcal</td></tr>
                       <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#202124]">Fried Chicken Momo</td><td className="px-4 py-3 text-right text-orange-600 font-bold">85 kcal</td></tr>
                       <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#202124]">Veg Momo</td><td className="px-4 py-3 text-right text-orange-600 font-bold">45 kcal</td></tr>
                       <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#202124]">Fried Veg Momo</td><td className="px-4 py-3 text-right text-orange-600 font-bold">70 kcal</td></tr>
                       <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#202124]">Buff Momo</td><td className="px-4 py-3 text-right text-orange-600 font-bold">65 kcal</td></tr>
                       <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#202124]">Paneer Momo</td><td className="px-4 py-3 text-right text-orange-600 font-bold">75 kcal</td></tr>
                       <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#202124]">Pork Momo</td><td className="px-4 py-3 text-right text-orange-600 font-bold">80 kcal</td></tr>
                       <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#202124]">Jhol Momo</td><td className="px-4 py-3 text-right text-orange-600 font-bold">70 kcal</td></tr>
                       <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-[#202124]">Tandoori Momo</td><td className="px-4 py-3 text-right text-orange-600 font-bold">90 kcal</td></tr>
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      }
      details={
        <div className="prose prose-slate max-w-none space-y-6">
          <p className="text-[#5F6368] leading-relaxed">
            The Momo Calorie Counter helps you estimate calories in chicken, veg, steamed, fried, jhol, paneer and buff momos. Select your momo type, cooking style and quantity to instantly calculate calories per piece, calories per plate and total calorie intake. If you're actively monitoring your weight, combining this tool with a <Link href="/calculator/daily-calorie/" className="text-orange-600 font-bold hover:underline">Daily Calorie Calculator</Link> can help you stay within your targets.
          </p>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-4 border-b border-[#DADCE0] pb-2">Calories in Different Types of Momos</h2>
          <p className="text-[#5F6368] leading-relaxed">
            Momo calories vary depending on the filling, cooking method and serving size. Steamed momos are generally lower in calories than fried or tandoori momos because they contain less oil. Paneer, pork and buff momos usually contain more calories than vegetable momos due to their higher fat content. Tracking your Basal Metabolic Rate via a <Link href="/calculator/bmr/" className="text-orange-600 font-bold hover:underline">BMR Calculator</Link> will show you exactly how many calories you burn at rest before eating.
          </p>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-4 border-b border-[#DADCE0] pb-2">Calories by Quantity</h2>
          
          <h3 className="text-lg font-bold text-[#202124] mt-6">1 Momo Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">One steamed chicken momo contains approximately 60 calories, while one steamed vegetable momo contains around 45 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">5 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Five steamed chicken momos contain approximately 300 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">6 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Six steamed chicken momos contain approximately 360 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">8 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Eight steamed chicken momos contain approximately 480 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">10 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Ten steamed chicken momos contain approximately 600 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">12 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Twelve steamed chicken momos contain approximately 720 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">1 Plate Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">A standard plate of momos usually contains 8–10 pieces depending on the restaurant. A plate of steamed chicken momos generally contains between 480 and 600 calories. Using a <Link href="/calculator/bmi/" className="text-orange-600 font-bold hover:underline">BMI Calculator</Link> can help you understand if your current dietary habits are keeping you in a healthy weight range.</p>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-4 border-b border-[#DADCE0] pb-2">Calories by Cooking Method</h2>
          
          <div className="space-y-4">
             <div>
                <strong className="text-[#202124] block">Steamed Momos Calories</strong>
                <span className="text-[#5F6368]">Steamed momos are the healthiest option because they require no additional oil during cooking.</span>
             </div>
             <div>
                <strong className="text-[#202124] block">Fried Momos Calories</strong>
                <span className="text-[#5F6368]">Fried momos contain significantly more calories because of the oil absorbed during frying.</span>
             </div>
             <div>
                <strong className="text-[#202124] block">Pan Fried Momos Calories</strong>
                <span className="text-[#5F6368]">Pan fried momos fall between steamed and deep-fried momos in calorie content.</span>
             </div>
             <div>
                <strong className="text-[#202124] block">Jhol Momo Calories</strong>
                <span className="text-[#5F6368]">Jhol momos include spicy sesame soup which slightly increases the total calorie count.</span>
             </div>
             <div>
                <strong className="text-[#202124] block">Tandoori Momo Calories</strong>
                <span className="text-[#5F6368]">Tandoori momos are coated with sauces before roasting, making them higher in calories than steamed momos.</span>
             </div>
          </div>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-4 border-b border-[#DADCE0] pb-2">Calories by Filling</h2>
          
          <div className="space-y-4">
             <div>
                <strong className="text-[#202124] block">Chicken Momos Calories</strong>
                <span className="text-[#5F6368]">Chicken momos are one of the most popular varieties and contain high-quality protein with moderate calories. Checking your needs via a <Link href="/calculator/protein-intake/" className="text-orange-600 font-bold hover:underline">Protein Intake Calculator</Link> ensures you hit your daily goals.</span>
             </div>
             <div>
                <strong className="text-[#202124] block">Veg Momos Calories</strong>
                <span className="text-[#5F6368]">Vegetable momos are generally the lowest calorie option.</span>
             </div>
             <div>
                <strong className="text-[#202124] block">Buff Momos Calories</strong>
                <span className="text-[#5F6368]">Buff momos contain slightly more calories than chicken because of their fat content.</span>
             </div>
             <div>
                <strong className="text-[#202124] block">Paneer Momos Calories</strong>
                <span className="text-[#5F6368]">Paneer momos are higher in calories due to dairy fat and protein.</span>
             </div>
             <div>
                <strong className="text-[#202124] block">Pork Momos Calories</strong>
                <span className="text-[#5F6368]">Pork momos contain one of the highest calorie counts among common momo fillings.</span>
             </div>
             <div>
                <strong className="text-[#202124] block">Mutton Momos Calories</strong>
                <span className="text-[#5F6368]">Mutton momos contain more fat and therefore more calories than chicken momos.</span>
             </div>
          </div>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-4 border-b border-[#DADCE0] pb-2">Are Momos Healthy?</h2>
          <p className="text-[#5F6368] leading-relaxed">
            Momos can be part of a balanced diet when consumed in moderation. Steamed momos provide protein and carbohydrates while keeping fat relatively low. Choosing steamed momos instead of fried varieties and limiting high-calorie sauces can reduce overall calorie intake. By understanding your total burn rate with a <Link href="/calculator/tdee/" className="text-orange-600 font-bold hover:underline">TDEE Calculator</Link>, you can fit momos into your weekly plan without guilt. If your goal is weight reduction, setting targets in a <Link href="/calculator/weight-loss/" className="text-orange-600 font-bold hover:underline">Weight Loss Calculator</Link> will help balance these occasional treats.
          </p>
        </div>
      }
      faqs={[
        {
          question: "How many calories are in one momo?",
          answer: "A steamed chicken momo contains approximately 60 calories, while a steamed vegetable momo contains around 45 calories."
        },
        {
          question: "How many calories are in a plate of momos?",
          answer: "A plate of steamed chicken momos usually contains between 480 and 600 calories depending on the number of pieces served."
        },
        {
          question: "Are steamed momos healthier than fried momos?",
          answer: "Yes. Steamed momos contain fewer calories and less fat because they are cooked without oil."
        },
        {
          question: "How many calories are in chicken momos?",
          answer: "Steamed chicken momos generally contain about 60 calories per piece."
        },
        {
          question: "How many calories are in veg momos?",
          answer: "Steamed vegetable momos usually contain around 45 calories per piece."
        },
        {
          question: "How many calories are in fried momos?",
          answer: "Fried momos generally contain between 70 and 90 calories per piece depending on the filling."
        },
        {
          question: "Which momo has the lowest calories?",
          answer: "Steamed vegetable momos usually have the lowest calorie count."
        },
        {
          question: "Can I eat momos while dieting?",
          answer: "Yes. Choosing steamed momos, controlling portion size and avoiding fried varieties can help fit momos into a calorie-controlled diet."
        }
      ]}
      customSchema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Momo Calorie Counter",
        "url": "https://nepacalc.com/calculator/momo-calorie-counter/",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "description": "Calculate calories in momos instantly. Estimate calories for chicken, veg, steamed, fried, jhol, paneer, buff and tandoori momos.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "NPR"
        },
        "featureList": [
          "Momo Calories",
          "Calories in Momos",
          "Chicken Momo Calories",
          "Veg Momo Calories",
          "Steamed Momo Calories",
          "Fried Momo Calories"
        ]
      }}
    />
  );
}
