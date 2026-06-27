'use client';
import { useMemo, useState } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Flame, Plus, Trash2, ChevronDown, Info } from 'lucide-react';
import Link from 'next/link';

// ─── Nutrition Data ──────────────────────────────────────────────────────────
// All values are PER PIECE. Weight in grams.
const MOMO_TYPES = [
  { id: 'chicken',  label: 'Chicken Momo',  cal: 60,  p: 5.5, f: 2.0, c: 5.8, fiber: 0.3, sugar: 0.4, sodium: 145, chol: 22, w: 40 },
  { id: 'buff',     label: 'Buff Momo',     cal: 65,  p: 5.0, f: 2.8, c: 5.8, fiber: 0.3, sugar: 0.4, sodium: 155, chol: 25, w: 40 },
  { id: 'veg',      label: 'Veg Momo',      cal: 45,  p: 1.5, f: 0.8, c: 8.0, fiber: 1.2, sugar: 1.0, sodium: 95,  chol: 0,  w: 38 },
  { id: 'paneer',   label: 'Paneer Momo',   cal: 75,  p: 3.5, f: 3.8, c: 6.2, fiber: 0.5, sugar: 0.6, sodium: 130, chol: 12, w: 42 },
  { id: 'pork',     label: 'Pork Momo',     cal: 80,  p: 5.5, f: 4.2, c: 5.5, fiber: 0.2, sugar: 0.3, sodium: 170, chol: 28, w: 42 },
  { id: 'beef',     label: 'Beef Momo',     cal: 78,  p: 5.8, f: 3.8, c: 5.5, fiber: 0.2, sugar: 0.3, sodium: 165, chol: 26, w: 42 },
  { id: 'cheese',   label: 'Cheese Momo',   cal: 85,  p: 4.0, f: 4.5, c: 6.8, fiber: 0.3, sugar: 0.5, sodium: 210, chol: 18, w: 42 },
  { id: 'jhol',     label: 'Jhol Momo',     cal: 70,  p: 4.5, f: 2.5, c: 8.0, fiber: 0.8, sugar: 1.2, sodium: 180, chol: 18, w: 55 },
  { id: 'tandoori', label: 'Tandoori Momo', cal: 90,  p: 6.0, f: 3.5, c: 8.5, fiber: 0.5, sugar: 1.8, sodium: 200, chol: 24, w: 45 },
  { id: 'fried',    label: 'Fried Momo',    cal: 85,  p: 4.5, f: 4.5, c: 7.0, fiber: 0.3, sugar: 0.4, sodium: 160, chol: 22, w: 38 },
  { id: 'cmomo',    label: 'C Momo',        cal: 100, p: 5.0, f: 5.2, c: 9.5, fiber: 0.6, sugar: 2.5, sodium: 220, chol: 20, w: 48 },
];

// ─── Cooking method adds to base per piece values ────────────────────────────
const COOKING_METHODS = [
  { id: 'steamed',   label: 'Steamed',   calAdd: 0,  fAdd: 0.0, cAdd: 0, wAdd: 0  },
  { id: 'fried',     label: 'Fried',     calAdd: 25, fAdd: 2.8, cAdd: 1, wAdd: -3 },
  { id: 'tandoori',  label: 'Tandoori',  calAdd: 30, fAdd: 2.0, cAdd: 2, wAdd: -2 },
  { id: 'cmomo',     label: 'C-Momo',    calAdd: 40, fAdd: 2.5, cAdd: 5, wAdd: 8  },
  { id: 'jhol',      label: 'Jhol',      calAdd: 12, fAdd: 1.0, cAdd: 1, wAdd: 18 },
];

// ─── Sauce extras (per serving total) ────────────────────────────────────────
const SAUCES = [
  { id: 'red',     label: 'Red Chutney',  cal: 15,  p: 0.3, f: 0.5, c: 2.5, w: 20 },
  { id: 'mayo',    label: 'Mayo',         cal: 90,  p: 0.2, f: 10,  c: 0.5, w: 15 },
  { id: 'cheese',  label: 'Cheese Dip',   cal: 70,  p: 2.5, f: 6.0, c: 1.5, w: 20 },
  { id: 'soup',    label: 'Soup',         cal: 30,  p: 1.5, f: 1.0, c: 4.0, w: 80 },
  { id: 'jhol',    label: 'Jhol Sauce',   cal: 45,  p: 1.0, f: 3.0, c: 4.0, w: 60 },
];

// ─── Popular presets ─────────────────────────────────────────────────────────
const PRESETS = [
  { label: 'Chicken Steam (10)', type: 'chicken', method: 'steamed', pieces: 10, sauces: [] as string[] },
  { label: 'Veg Steam (10)',     type: 'veg',     method: 'steamed', pieces: 10, sauces: [] as string[] },
  { label: 'Buff Steam (10)',    type: 'buff',     method: 'steamed', pieces: 10, sauces: [] as string[] },
  { label: 'Chicken Fried (10)',  type: 'chicken', method: 'fried',   pieces: 10, sauces: [] as string[] },
  { label: 'C Momo (10)',        type: 'cmomo',   method: 'cmomo',   pieces: 10, sauces: ['red'] as string[] },
  { label: 'Jhol Momo (10)',     type: 'jhol',    method: 'jhol',    pieces: 10, sauces: ['jhol'] as string[] },
];

// ─── Default item ─────────────────────────────────────────────────────────────
const newItem = () => ({ type: 'chicken', method: 'steamed', pieces: 10, sauces: [] as string[] });

// ─── Compute totals for one item ─────────────────────────────────────────────
function computeItem(item: ReturnType<typeof newItem>) {
  const t = MOMO_TYPES.find(x => x.id === item.type) || MOMO_TYPES[0];
  const m = COOKING_METHODS.find(x => x.id === item.method) || COOKING_METHODS[0];
  const n = item.pieces;

  const ppCal = t.cal + m.calAdd;
  const ppF   = t.f   + m.fAdd;
  const ppC   = t.c   + m.cAdd;
  const ppW   = t.w   + m.wAdd;

  const sauceTotals = item.sauces.reduce(
    (acc, sid) => {
      const s = SAUCES.find(x => x.id === sid);
      if (!s) return acc;
      return { cal: acc.cal + s.cal, p: acc.p + s.p, f: acc.f + s.f, c: acc.c + s.c, w: acc.w + s.w };
    },
    { cal: 0, p: 0, f: 0, c: 0, w: 0 }
  );

  return {
    cal:   ppCal * n + sauceTotals.cal,
    p:     t.p   * n,
    f:     ppF   * n + sauceTotals.f,
    c:     ppC   * n + sauceTotals.c,
    fiber: t.fiber * n,
    sugar: t.sugar * n,
    sodium:t.sodium * n,
    chol:  t.chol  * n,
    w:     ppW  * n + sauceTotals.w,
    ppCal,
    ppW,
    n,
    tLabel: t.label,
    mLabel: m.label,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function MomoCalculator() {
  const [items, setItems] = useSyncState<ReturnType<typeof newItem>[]>(
    'momo_v8_items',
    [newItem()]
  );
  const [compareMode, setCompareMode] = useState(false);

  const updateItem = (idx: number, patch: Partial<ReturnType<typeof newItem>>) => {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    setItems(next);
  };

  const toggleSauce = (idx: number, sid: string) => {
    const cur = items[idx].sauces;
    const next = cur.includes(sid) ? cur.filter(s => s !== sid) : [...cur, sid];
    updateItem(idx, { sauces: next });
  };

  const addItem = () => setItems([...items, newItem()]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  const loadPreset = (p: typeof PRESETS[number]) => {
    setItems([{ type: p.type, method: p.method, pieces: p.pieces, sauces: p.sauces }]);
  };

  // ─── Totals ───────────────────────────────────────────────────────────────
  const computed = useMemo(() => items.map(computeItem), [items]);
  const totals = useMemo(() => computed.reduce(
    (acc, r) => ({
      cal: acc.cal + r.cal,
      p: acc.p + r.p,
      f: acc.f + r.f,
      c: acc.c + r.c,
      fiber: acc.fiber + r.fiber,
      sugar: acc.sugar + r.sugar,
      sodium: acc.sodium + r.sodium,
      chol: acc.chol + r.chol,
      w: acc.w + r.w,
    }),
    { cal: 0, p: 0, f: 0, c: 0, fiber: 0, sugar: 0, sodium: 0, chol: 0, w: 0 }
  ), [computed]);

  // Derived stats
  const first = computed[0];
  const totalPieces = items.reduce((a, it) => a + it.pieces, 0);
  const calPer100g = totals.w > 0 ? Math.round((totals.cal / totals.w) * 100) : 0;
  const dailyPct = Math.min(99, Math.round((totals.cal / 2000) * 100));

  // Activity equivalents (kcal/min burn rates)
  const walkMins = Math.round(totals.cal / 3.8);
  const runMins  = Math.round(totals.cal / 9.8);
  const bikeMins = Math.round(totals.cal / 7.5);

  // Health rating logic
  const proteinRating = totals.p >= 20 ? 'High Protein' : totals.p >= 10 ? 'Moderate Protein' : 'Low Protein';
  const fatRating     = totals.f >= 20 ? 'High Fat' : totals.f >= 10 ? 'Medium Fat' : 'Low Fat';
  const calRating     = totals.cal >= 600 ? 'High Calories' : totals.cal >= 300 ? 'Moderate Calories' : 'Low Calories';
  const stars         = totals.cal < 400 && totals.p >= 15 ? 5 : totals.cal < 600 ? 4 : 3;

  // Compare: steamed vs fried for first item's type
  const compareBase = MOMO_TYPES.find(x => x.id === items[0].type) || MOMO_TYPES[0];
  const steamCal = (compareBase.cal + 0) * items[0].pieces;
  const friedCal = (compareBase.cal + 25) * items[0].pieces;
  const diff = friedCal - steamCal;

  // Insight text
  const insight = items.some(it => it.method === 'steamed')
    ? `Great choice! Steamed momos are the lowest calorie option. This serving provides ${Math.round(totals.p)}g of protein.`
    : items.some(it => it.method === 'fried' || it.method === 'cmomo')
    ? `Choosing steamed instead of fried momos can reduce your calorie intake by up to 30% for the same quantity.`
    : `This serving contains ${Math.round(totals.cal)} kcal. Combine with a light salad to keep your meal balanced.`;

  // Recommendation items
  const recs = [];
  if (!items.every(it => it.method === 'steamed')) recs.push('Choose Steamed cooking');
  if (!items.every(it => it.type === 'veg')) recs.push('Try Veg filling');
  if (items.some(it => it.sauces.includes('mayo') || it.sauces.includes('cheese'))) recs.push('Skip Mayo/Cheese Dip');

  // ─── Serving quick-selects ────────────────────────────────────────────────
  const SERVING_PRESETS = [
    { label: '1 Piece', val: 1 },
    { label: 'Half Plate (5)', val: 5 },
    { label: 'Full Plate (10)', val: 10 },
    { label: 'Large Plate (15)', val: 15 },
    { label: 'Party Plate (20)', val: 20 },
  ];

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <ModernCalcLayout
      slug="momo-calorie-counter"
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Calculators', href: '/calculator/' },
        { label: 'Momo Calorie Calculator' },
      ]}
      title="Momo Calorie Calculator"
      description="Calculate calories, protein, fat and carbohydrates in steamed, fried and tandoori momos. Instantly estimate nutrition for chicken, buff, veg, paneer and more."
      icon={Flame}
      inputs={
        <div className="space-y-6">
          {/* ── Popular Presets ── */}
          <div>
            <p className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider mb-2">Most Calculated</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  onClick={() => loadPreset(p)}
                  className="px-3 py-1.5 text-[11px] font-bold rounded-full border border-[#DADCE0] text-[#202124] bg-white hover:bg-orange-50 hover:border-orange-400 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#DADCE0]" />

          {/* ── Items ── */}
          <div className="space-y-5">
            {items.map((item, idx) => {
              const t = MOMO_TYPES.find(x => x.id === item.type)!;
              const m = COOKING_METHODS.find(x => x.id === item.method)!;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#DADCE0] rounded-xl p-5 space-y-4 relative group shadow-sm"
                >
                  {/* Remove btn */}
                  {items.length > 1 && (
                    <button
                      onClick={() => removeItem(idx)}
                      className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Row label */}
                  {items.length > 1 && (
                    <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Item {idx + 1}</div>
                  )}

                  {/* Step 1: Type */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block">Step 1 — Momo Type</label>
                    <div className="relative">
                      <select
                        id={`momo-type-${idx}`}
                        value={item.type}
                        onChange={e => updateItem(idx, { type: e.target.value })}
                        className="w-full h-11 pl-4 pr-10 bg-white border border-[#DADCE0] rounded-lg text-sm font-bold text-[#202124] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none appearance-none cursor-pointer"
                        aria-label="Momo Type"
                      >
                        {MOMO_TYPES.map(t => (
                          <option key={t.id} value={t.id}>{t.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F6368] pointer-events-none" />
                    </div>
                    <p className="text-[11px] text-[#5F6368]">Base: {t.cal} kcal/piece · {t.p}g protein · {t.f}g fat</p>
                  </div>

                  {/* Step 2: Cooking Method */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block">Step 2 — Cooking Method</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {COOKING_METHODS.map(cm => (
                        <button
                          key={cm.id}
                          onClick={() => updateItem(idx, { method: cm.id })}
                          className={`py-2 text-[10px] font-bold rounded-lg border transition-all text-center ${item.method === cm.id ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'}`}
                          aria-pressed={item.method === cm.id}
                        >
                          {cm.label}
                        </button>
                      ))}
                    </div>
                    {m.calAdd > 0 && (
                      <p className="text-[11px] text-orange-600 font-bold">+{m.calAdd} kcal/piece for {m.label}</p>
                    )}
                  </div>

                  {/* Step 3: Pieces */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Step 3 — Pieces</label>
                      <div className="flex items-center gap-2 border border-[#DADCE0] rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateItem(idx, { pieces: Math.max(1, item.pieces - 1) })}
                          className="w-9 h-9 flex items-center justify-center text-[#5F6368] hover:bg-slate-100 font-black text-lg transition-colors"
                          aria-label="Decrease pieces"
                        >−</button>
                        <span className="w-8 text-center font-black text-[#202124] text-sm">{item.pieces}</span>
                        <button
                          onClick={() => updateItem(idx, { pieces: Math.min(50, item.pieces + 1) })}
                          className="w-9 h-9 flex items-center justify-center text-[#5F6368] hover:bg-slate-100 font-black text-lg transition-colors"
                          aria-label="Increase pieces"
                        >+</button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[1, 2, 4, 6, 8, 10, 12, 20].map(n => (
                        <button
                          key={n}
                          onClick={() => updateItem(idx, { pieces: n })}
                          className={`flex-1 min-w-[2.5rem] py-1.5 text-[11px] font-bold rounded border transition-all ${item.pieces === n ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Serving Size */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block">Step 4 — Serving Size</label>
                    <div className="flex flex-wrap gap-2">
                      {SERVING_PRESETS.map(s => (
                        <button
                          key={s.val}
                          onClick={() => updateItem(idx, { pieces: s.val })}
                          className={`px-3 py-1.5 text-[11px] font-bold rounded-full border transition-all ${item.pieces === s.val ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 5: Sauces */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block">Step 5 — Add Sauce? <span className="font-normal normal-case text-[#9AA0A6]">(Optional)</span></label>
                    <div className="flex flex-wrap gap-2">
                      {SAUCES.map(s => (
                        <label key={s.id} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.sauces.includes(s.id)}
                            onChange={() => toggleSauce(idx, s.id)}
                            className="w-4 h-4 rounded border-[#DADCE0] text-orange-500 focus:ring-orange-500 cursor-pointer"
                          />
                          <span className="text-[11px] font-bold text-[#202124]">{s.label}</span>
                          <span className="text-[10px] text-[#9AA0A6]">+{s.cal} kcal</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Add Another Momo ── */}
          <button
            onClick={addItem}
            className="w-full h-11 flex items-center justify-center gap-2 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 font-bold text-sm hover:bg-orange-50 transition-all"
            aria-label="Add another momo"
          >
            <Plus className="w-4 h-4" />
            + Add Another Momo
          </button>

          {/* ── Build Your Momo Meal label ── */}
          <p className="text-[10px] text-center text-[#9AA0A6]">Build Your Momo Meal — Mix types, methods and quantities.</p>
        </div>
      }
      results={
        <div className="space-y-5">

          {/* ── Primary Calorie Card ── */}
          <div
            id="momo-calories-result"
            className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center relative overflow-hidden"
            aria-live="polite"
            aria-label="Nutrition result"
          >
            <Flame className="absolute -right-4 -bottom-4 w-28 h-28 text-orange-400/10 pointer-events-none" />
            <div className="text-[11px] font-black text-orange-600 uppercase tracking-widest mb-1">
              {items.length === 1
                ? `${items[0].pieces} ${COOKING_METHODS.find(m => m.id === items[0].method)?.label ?? ''} ${MOMO_TYPES.find(t => t.id === items[0].type)?.label ?? ''}`
                : `${totalPieces} Mixed Momos`}
            </div>
            <div className="text-6xl font-black text-[#202124] leading-none">
              {Math.round(totals.cal)}
            </div>
            <div className="text-lg font-bold text-[#5F6368] mt-1">kcal</div>
            <div className="mt-3 flex items-center justify-center gap-1 text-[11px] text-[#9AA0A6]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < stars ? 'text-orange-400' : 'text-slate-200'}>★</span>
              ))}
              <span className="ml-1 font-bold">{proteinRating} · {fatRating}</span>
            </div>
          </div>

          {/* ── Per Piece / Per Plate / Per 100g ── */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Calories / Piece', value: `${first.ppCal} kcal`, id: 'cal-per-piece' },
              { label: 'Calories / Plate (10)', value: `${first.ppCal * 10} kcal`, id: 'cal-per-plate' },
              { label: 'Calories / 100g', value: `${calPer100g} kcal`, id: 'cal-per-100g' },
            ].map(card => (
              <div key={card.id} id={card.id} className="bg-white border border-[#DADCE0] rounded-xl p-4 text-center">
                <div className="text-[9px] font-black text-[#5F6368] uppercase tracking-widest mb-1">{card.label}</div>
                <div className="text-base font-black text-[#202124]">{card.value}</div>
              </div>
            ))}
          </div>

          {/* ── Full Nutrition Table ── */}
          <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden" id="nutrition-table">
            <div className="px-5 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
              <span className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Nutrition Summary</span>
            </div>
            <table className="w-full text-sm" aria-label="Nutrition facts table">
              <thead className="sr-only">
                <tr><th>Nutrient</th><th>Amount</th></tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F4]">
                {[
                  { label: 'Calories',       value: `${Math.round(totals.cal)} kcal`, color: 'text-orange-600', id: 'result-calories' },
                  { label: 'Protein',        value: `${totals.p.toFixed(1)} g`,       color: 'text-blue-600',   id: 'result-protein' },
                  { label: 'Carbohydrates',  value: `${totals.c.toFixed(1)} g`,       color: 'text-amber-600',  id: 'result-carbs' },
                  { label: 'Fat',            value: `${totals.f.toFixed(1)} g`,       color: 'text-rose-600',   id: 'result-fat' },
                  { label: 'Fiber',          value: `${totals.fiber.toFixed(1)} g`,   color: 'text-green-600',  id: 'result-fiber' },
                  { label: 'Sugar',          value: `${totals.sugar.toFixed(1)} g`,   color: 'text-pink-600',   id: 'result-sugar' },
                  { label: 'Sodium',         value: `${Math.round(totals.sodium)} mg`,color: 'text-purple-600', id: 'result-sodium' },
                  { label: 'Cholesterol',    value: `${Math.round(totals.chol)} mg`,  color: 'text-slate-600',  id: 'result-cholesterol' },
                  { label: 'Estimated Weight',value: `${Math.round(totals.w)} g`,      color: 'text-slate-500',  id: 'result-weight' },
                ].map(row => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="px-5 py-2.5 font-medium text-[#202124]">{row.label}</td>
                    <td id={row.id} className={`px-5 py-2.5 text-right font-black ${row.color}`}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Daily Value + Activity Burn ── */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#202124]">Daily Calorie %</span>
                <span className="text-sm font-black text-orange-600" id="daily-value">{dailyPct}% of 2,000 kcal diet</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${dailyPct}%` }}
                  role="progressbar"
                  aria-valuenow={dailyPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider mb-3">Equivalent To</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: '🚶', label: 'Walk', value: `${walkMins} min` },
                  { icon: '🏃', label: 'Run',  value: `${runMins} min` },
                  { icon: '🚴', label: 'Cycle',value: `${bikeMins} min` },
                ].map(act => (
                  <div key={act.label} className="bg-slate-50 rounded-lg p-3 border border-[#DADCE0]">
                    <div className="text-2xl mb-1">{act.icon}</div>
                    <div className="text-xs font-black text-[#202124]">{act.value}</div>
                    <div className="text-[10px] text-[#5F6368]">{act.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Nutrition Insight ── */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-black text-blue-800 uppercase tracking-wider mb-1">Nutrition Insight</p>
              <p className="text-sm text-blue-700">{insight}</p>
            </div>
          </div>

          {/* ── Steam vs Fried Comparison ── */}
          <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden">
            <button
              onClick={() => setCompareMode(!compareMode)}
              className="w-full px-5 py-3 flex items-center justify-between text-sm font-bold text-[#202124] bg-[#F8F9FA] border-b border-[#DADCE0] hover:bg-slate-100 transition-colors"
              aria-expanded={compareMode}
            >
              <span>Compare: Steam vs Fried</span>
              <ChevronDown className={`w-4 h-4 text-[#5F6368] transition-transform ${compareMode ? 'rotate-180' : ''}`} />
            </button>
            {compareMode && (
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <div className="text-[10px] font-black text-green-700 uppercase tracking-wide mb-1">Steamed ({items[0].pieces} pcs)</div>
                    <div className="text-2xl font-black text-green-700">{steamCal}</div>
                    <div className="text-[10px] text-green-600">kcal</div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-[10px] font-black text-rose-600 uppercase tracking-wide">Difference</div>
                    <div className="text-xl font-black text-rose-600">+{diff}</div>
                    <div className="text-[10px] text-rose-500">kcal fried</div>
                  </div>
                  <div className="bg-rose-50 border border-rose-100 rounded-lg p-4">
                    <div className="text-[10px] font-black text-rose-700 uppercase tracking-wide mb-1">Fried ({items[0].pieces} pcs)</div>
                    <div className="text-2xl font-black text-rose-700">{friedCal}</div>
                    <div className="text-[10px] text-rose-600">kcal</div>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-center text-[#5F6368]">Fried momos contain <strong className="text-[#202124]">+{diff} kcal</strong> more than steamed for the same quantity.</p>
              </div>
            )}
          </div>

          {/* ── Want Fewer Calories? Recommendation ── */}
          {recs.length > 0 && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-[11px] font-black text-green-800 uppercase tracking-wider mb-2">Want Fewer Calories?</p>
              <ul className="space-y-1">
                {recs.map(r => (
                  <li key={r} className="flex items-center gap-2 text-sm text-green-700">
                    <span className="text-green-500 font-black">✓</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Popular Momo Calories ── */}
          <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <p className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Popular Momo Calories</p>
            </div>
            <table className="w-full text-sm" aria-label="Popular momo calorie reference table">
              <thead className="sr-only">
                <tr><th>Type</th><th>Per Piece</th><th>Per Plate (10)</th></tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F4]">
                {[
                  { type: 'Chicken Steamed', ppCal: 60 },
                  { type: 'Veg Steamed',     ppCal: 45 },
                  { type: 'Buff Steamed',    ppCal: 65 },
                  { type: 'Chicken Fried',   ppCal: 85 },
                  { type: 'Tandoori Momo',   ppCal: 90 },
                  { type: 'Jhol Momo',       ppCal: 70 },
                ].map(r => (
                  <tr key={r.type} className="hover:bg-slate-50">
                    <td className="px-5 py-2.5 font-medium text-[#202124]">{r.type}</td>
                    <td className="px-5 py-2.5 text-center text-[#5F6368] text-[12px]">{r.ppCal} kcal/pc</td>
                    <td className="px-5 py-2.5 text-right font-black text-orange-600">{r.ppCal * 10} kcal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      details={
        <div className="prose prose-slate max-w-none space-y-6">
          <p className="text-[#5F6368] leading-relaxed">
            The Momo Calorie Calculator helps you estimate calories in chicken, veg, steamed, fried, jhol, paneer and buff momos instantly. Select your momo type, cooking method and quantity to see a complete nutritional breakdown — calories per piece, calories per plate and total macros. If you are tracking your overall daily food intake, use this alongside our <Link href="/calculator/daily-calorie/" className="text-orange-600 font-bold hover:underline">Calorie Calculator</Link> for an accurate daily picture.
          </p>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3 border-b border-[#DADCE0] pb-2">Calories in Different Types of Momos</h2>
          <p className="text-[#5F6368] leading-relaxed">
            Momo calories vary depending on the filling, cooking method and serving size. Steamed momos are generally lower in calories than fried or tandoori momos because they contain no added oil. Paneer, pork and buff momos usually contain more calories than vegetable momos due to their higher fat content. Tracking body composition together with calorie data is easier when you combine this tool with a <Link href="/calculator/bmi/" className="text-orange-600 font-bold hover:underline">BMI Calculator</Link>.
          </p>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3 border-b border-[#DADCE0] pb-2">Calories by Quantity</h2>

          <h3 className="text-lg font-bold text-[#202124] mt-5">1 Momo Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">One steamed chicken momo contains approximately 60 calories, while one steamed vegetable momo contains around 45 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">5 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Five steamed chicken momos contain approximately 300 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">6 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Six steamed chicken momos contain approximately 360 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">8 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Eight steamed chicken momos contain approximately 480 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">10 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Ten steamed chicken momos contain approximately 600 calories. Understanding your resting energy needs through a <Link href="/calculator/bmr/" className="text-orange-600 font-bold hover:underline">BMR Calculator</Link> helps you decide how large a momo meal fits into your day.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">12 Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">Twelve steamed chicken momos contain approximately 720 calories.</p>

          <h3 className="text-lg font-bold text-[#202124] mt-4">1 Plate Momos Calories</h3>
          <p className="text-[#5F6368] leading-relaxed">A standard plate of momos usually contains 8–10 pieces depending on the restaurant. A plate of steamed chicken momos generally contains between 480 and 600 calories.</p>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3 border-b border-[#DADCE0] pb-2">Calories by Cooking Method</h2>
          <div className="space-y-4 text-[#5F6368]">
            <div><strong className="text-[#202124] block">Steamed Momos Calories</strong>Steamed momos are the healthiest option because they require no additional oil during cooking.</div>
            <div><strong className="text-[#202124] block">Fried Momos Calories</strong>Fried momos contain significantly more calories because of the oil absorbed during frying.</div>
            <div><strong className="text-[#202124] block">Pan Fried Momos Calories</strong>Pan fried momos fall between steamed and deep-fried momos in calorie content.</div>
            <div><strong className="text-[#202124] block">Jhol Momo Calories</strong>Jhol momos include spicy sesame soup which slightly increases the total calorie count.</div>
            <div><strong className="text-[#202124] block">Tandoori Momo Calories</strong>Tandoori momos are coated with sauces before roasting, making them higher in calories than steamed momos.</div>
          </div>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3 border-b border-[#DADCE0] pb-2">Calories by Filling</h2>
          <div className="space-y-4 text-[#5F6368]">
            <div>
              <strong className="text-[#202124] block">Chicken Momos Calories</strong>
              Chicken momos are one of the most popular varieties and contain high-quality protein with moderate calories. Match your protein needs to targets set by a <Link href="/calculator/protein-intake/" className="text-orange-600 font-bold hover:underline">Protein Calculator</Link>.
            </div>
            <div><strong className="text-[#202124] block">Veg Momos Calories</strong>Vegetable momos are generally the lowest calorie option, making them ideal for calorie-controlled diets.</div>
            <div><strong className="text-[#202124] block">Buff Momos Calories</strong>Buff momos contain slightly more calories than chicken because of their higher fat content.</div>
            <div><strong className="text-[#202124] block">Paneer Momos Calories</strong>Paneer momos are higher in calories due to dairy fat and protein.</div>
            <div><strong className="text-[#202124] block">Pork Momos Calories</strong>Pork momos contain one of the highest calorie counts among common momo fillings.</div>
            <div><strong className="text-[#202124] block">Mutton Momos Calories</strong>Mutton momos contain more fat and therefore more calories than chicken momos.</div>
          </div>

          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3 border-b border-[#DADCE0] pb-2">Are Momos Healthy?</h2>
          <p className="text-[#5F6368] leading-relaxed">
            Momos can be part of a balanced diet when consumed in moderation. Steamed momos provide protein and carbohydrates while keeping fat relatively low. Choosing steamed momos instead of fried and limiting high-calorie sauces can reduce overall calorie intake. To understand your total daily energy burn, use a <Link href="/calculator/tdee/" className="text-orange-600 font-bold hover:underline">TDEE Calculator</Link> — it helps you see exactly where momos fit into your energy budget. If body fat reduction is your goal, our <Link href="/calculator/body-fat/" className="text-orange-600 font-bold hover:underline">Body Fat Calculator</Link> can give you an accurate baseline to track progress against.
          </p>
        </div>
      }
      faqs={[
        {
          question: 'How many calories are in one momo?',
          answer: 'A steamed chicken momo contains approximately 60 calories, while a steamed vegetable momo contains around 45 calories.',
        },
        {
          question: 'How many calories are in a plate of momos?',
          answer: 'A plate of steamed chicken momos (8–10 pieces) contains between 480 and 600 calories depending on the serving size.',
        },
        {
          question: 'Are steamed momos healthier than fried momos?',
          answer: 'Yes. Steamed momos contain fewer calories and less fat because they are cooked without oil.',
        },
        {
          question: 'How many calories are in chicken momos?',
          answer: 'Steamed chicken momos contain about 60 calories per piece.',
        },
        {
          question: 'How many calories are in veg momos?',
          answer: 'Steamed vegetable momos contain around 45 calories per piece.',
        },
        {
          question: 'How many calories are in fried momos?',
          answer: 'Fried momos contain between 70 and 90 calories per piece depending on the filling.',
        },
        {
          question: 'Which momo has the lowest calories?',
          answer: 'Steamed vegetable momos have the lowest calorie count at around 45 calories per piece.',
        },
        {
          question: 'Can I eat momos while dieting?',
          answer: 'Yes. Choosing steamed momos, controlling portion size and avoiding fried varieties helps fit momos into a calorie-controlled diet.',
        },
      ]}
    />
  );
}
