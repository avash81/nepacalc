'use client';
import { useMemo } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Flame, Plus, Trash2, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// ─── Nutrition Data ──────────────────────────────────────────────────────────
// All values are PER PIECE. Weight in grams.
// Assumptions: standard momo ~38-55g per piece depending on type.
// Values are internal estimates; actual nutrition varies with recipe and preparation.
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

  const first = computed[0];
  const totalPieces = items.reduce((a, it) => a + it.pieces, 0);

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
            <p className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider mb-2">Popular Choices</p>
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
              Result Summary
            </div>
            <div className="text-xl font-bold text-[#202124] mb-3">
              {items.length === 1
                ? `${items[0].pieces} ${COOKING_METHODS.find(m => m.id === items[0].method)?.label ?? ''} ${MOMO_TYPES.find(t => t.id === items[0].type)?.label ?? ''}`
                : `${totalPieces} Mixed Momos`}
            </div>
            <div className="text-6xl font-black text-[#202124] leading-none">
              {Math.round(totals.cal)}
            </div>
            <div className="text-lg font-bold text-[#5F6368] mt-1">kcal</div>
            {items.length === 1 && (
              <div className="mt-3 text-sm font-semibold text-[#5F6368]">
                {Math.round(first.ppCal)} kcal per momo
              </div>
            )}
          </div>

          {/* ── Dynamic Result Sentence ── */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm font-medium text-[#202124] leading-relaxed">
              {items.length === 1
                ? `${items[0].pieces} ${COOKING_METHODS.find(m => m.id === items[0].method)?.label?.toLowerCase()} ${MOMO_TYPES.find(t => t.id === items[0].type)?.label?.toLowerCase()}s are estimated at ${Math.round(totals.cal)} calories, or about ${Math.round(first.ppCal)} calories per momo.`
                : `${totalPieces} mixed momos are estimated at ${Math.round(totals.cal)} calories.`}
            </p>
          </div>

          {/* ── Nutrition Summary ── */}
          <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden" id="nutrition-table">
            <div className="px-5 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Nutrition Summary</span>
            </div>
            {/* Primary macros - larger, bolder */}
            <div className="divide-y divide-[#F1F3F4]">
              {[
                { label: 'Protein',       value: `${totals.p.toFixed(1)} g`,  id: 'result-protein' },
                { label: 'Carbohydrates', value: `${totals.c.toFixed(1)} g`,  id: 'result-carbs' },
                { label: 'Fat',           value: `${totals.f.toFixed(1)} g`,  id: 'result-fat' },
              ].map(row => (
                <div key={row.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
                  <span className="text-sm font-semibold text-[#202124]">{row.label}</span>
                  <span id={row.id} className="text-sm font-black text-[#202124]">{row.value}</span>
                </div>
              ))}
            </div>
            {/* Secondary nutrients - smaller, muted */}
            <div className="border-t border-[#DADCE0] bg-[#FAFAFA] divide-y divide-[#F1F3F4]">
              {[
                { label: 'Fiber',            value: `${totals.fiber.toFixed(1)} g`,    id: 'result-fiber' },
                { label: 'Sugar',            value: `${totals.sugar.toFixed(1)} g`,    id: 'result-sugar' },
                { label: 'Sodium',           value: `${Math.round(totals.sodium)} mg`, id: 'result-sodium' },
                { label: 'Cholesterol',      value: `${Math.round(totals.chol)} mg`,   id: 'result-cholesterol' },
                { label: 'Estimated Weight', value: `${Math.round(totals.w)} g`,       id: 'result-weight' },
              ].map(row => (
                <div key={row.id} className="flex items-center justify-between px-5 py-2 hover:bg-slate-50">
                  <span className="text-xs text-[#5F6368]">{row.label}</span>
                  <span id={row.id} className="text-xs font-bold text-[#5F6368]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Disclaimer ── */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-[#5F6368] leading-relaxed">
            <strong className="text-[#202124]">Disclaimer:</strong> Estimated value. Actual calories and nutrition can vary depending on wrapper size, filling ingredients, portion size, cooking method, oil and sauces.
          </div>

          {/* ── How Many Calories Are in Momos? ── */}
          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3">How Many Calories Are in Momos?</h2>
          <p className="text-[#5F6368] leading-relaxed mb-4">
            Momo calories vary depending on the filling, cooking method, quantity, wrapper size and any sauces or additions. A steamed chicken momo, for example, can have a different calorie value from a fried, paneer, pork or jhol momo.
          </p>
          <p className="text-[#5F6368] leading-relaxed font-semibold">
            Select the momo type, cooking method and quantity above to calculate an estimated serving.
          </p>

          {/* ── How It Works ── */}
          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3">How the Momo Calorie Calculator Works</h2>
          <p className="text-[#5F6368] leading-relaxed mb-4">
            Select a momo type, choose the cooking method, enter the number of pieces and add any optional sauces. The calculator then estimates the total calories and nutrition for the selected serving.
          </p>
          <p className="text-[#5F6368] leading-relaxed">
            Because momo recipes and portion sizes vary, the result is an estimate rather than a universal nutritional value.
          </p>

          {/* ── Popular Portions ── */}
          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3">Calories in Popular Momo Portions</h2>
          <div className="overflow-x-auto my-4 border border-[#DADCE0] rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <tr>
                  <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Steamed Chicken Momos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
                {[
                  { q: '1 momo',   c: '60 kcal' },
                  { q: '5 momos',  c: '300 kcal' },
                  { q: '6 momos',  c: '360 kcal' },
                  { q: '8 momos',  c: '480 kcal' },
                  { q: '10 momos', c: '600 kcal' },
                  { q: '12 momos', c: '720 kcal' },
                ].map(r => (
                  <tr key={r.q} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-semibold">{r.q}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-orange-600">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#5F6368] leading-relaxed mb-6">
            These are example estimates using the standard steamed chicken calculation. Change the momo type, cooking method or quantity above for another result.
          </p>

          {/* ── Guide Link ── */}
          <div className="bg-[#E8F0FE] border border-[#1967D2] rounded-xl p-5 mb-6">
            <h3 className="font-bold text-[#1967D2] text-lg mb-2">Momo Calories Guide</h3>
            <p className="text-[#202124] text-sm leading-relaxed mb-3">
              Looking for information about calories in chicken, veg, buff, fried, steamed, jhol and other momos? Read the <Link href="/blog/momo-calories/" className="text-[#1967D2] font-bold hover:underline">complete guide to momo calories</Link>.
            </p>
          </div>

          {/* ── Related Calculators ── */}
          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3">Related Calculators</h2>
          <ul className="text-[#5F6368] leading-relaxed space-y-2">
            <li><Link href="/calculator/calorie-calculator/" className="text-orange-600 font-bold hover:underline">Calorie Calculator</Link> — Estimate daily calorie needs.</li>
            <li><Link href="/calculator/bmr/" className="text-orange-600 font-bold hover:underline">BMR Calculator</Link> — Estimate basal metabolic rate.</li>
            <li><Link href="/calculator/bmi/" className="text-orange-600 font-bold hover:underline">BMI Calculator</Link> — Calculate body mass index.</li>
            <li><Link href="/calculator/ideal-weight/" className="text-orange-600 font-bold hover:underline">Ideal Weight Calculator</Link> — Estimate an ideal weight range.</li>
            <li><Link href="/calculator/water-intake/" className="text-orange-600 font-bold hover:underline">Water Intake Calculator</Link> — Estimate daily water intake.</li>
          </ul>
        </div>
      }
      faqs={[
        {
          question: 'How many calories are in one momo?',
          answer: 'The standard steamed chicken estimate used by this calculator is 60 calories per piece. Other momo types and cooking methods can have different calorie values.'
        },
        {
          question: 'How many calories are in 10 momos?',
          answer: 'Ten steamed chicken momos are estimated at 600 calories under the standard calculation. Select another momo type or cooking method above to calculate a different serving.'
        },
        {
          question: 'How many calories are in steamed chicken momos?',
          answer: 'The standard estimate is approximately 60 calories per steamed chicken momo. Actual calories vary according to recipe, filling and portion size.'
        },
        {
          question: 'Are fried momos higher in calories than steamed momos?',
          answer: 'Fried momos can contain more calories because cooking oil adds energy to the food. The exact difference depends on the preparation method and amount of oil used.'
        }
      ]}
    />
  );
}
