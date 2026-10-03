'use client';
import { useMemo, useState } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Flame, Plus, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// ─── Nutrition Data ──────────────────────────────────────────────────────────
const MOMO_TYPES = [
  { id: 'chicken',  label: 'Chicken',  cal: 60,  p: 5.5, f: 2.0, c: 5.8, fiber: 0.3, sugar: 0.4, sodium: 145, chol: 22, w: 40 },
  { id: 'buff',     label: 'Buff',     cal: 65,  p: 5.0, f: 2.8, c: 5.8, fiber: 0.3, sugar: 0.4, sodium: 155, chol: 25, w: 40 },
  { id: 'veg',      label: 'Veg',      cal: 45,  p: 1.5, f: 0.8, c: 8.0, fiber: 1.2, sugar: 1.0, sodium: 95,  chol: 0,  w: 38 },
  { id: 'paneer',   label: 'Paneer',   cal: 75,  p: 3.5, f: 3.8, c: 6.2, fiber: 0.5, sugar: 0.6, sodium: 130, chol: 12, w: 42 },
  { id: 'pork',     label: 'Pork',     cal: 80,  p: 5.5, f: 4.2, c: 5.5, fiber: 0.2, sugar: 0.3, sodium: 170, chol: 28, w: 42 },
  { id: 'beef',     label: 'Beef',     cal: 78,  p: 5.8, f: 3.8, c: 5.5, fiber: 0.2, sugar: 0.3, sodium: 165, chol: 26, w: 42 },
  { id: 'cheese',   label: 'Cheese',   cal: 85,  p: 4.0, f: 4.5, c: 6.8, fiber: 0.3, sugar: 0.5, sodium: 210, chol: 18, w: 42 },
  { id: 'jhol',     label: 'Jhol',     cal: 70,  p: 4.5, f: 2.5, c: 8.0, fiber: 0.8, sugar: 1.2, sodium: 180, chol: 18, w: 55 },
  { id: 'tandoori', label: 'Tandoori', cal: 90,  p: 6.0, f: 3.5, c: 8.5, fiber: 0.5, sugar: 1.8, sodium: 200, chol: 24, w: 45 },
  { id: 'fried',    label: 'Fried',    cal: 85,  p: 4.5, f: 4.5, c: 7.0, fiber: 0.3, sugar: 0.4, sodium: 160, chol: 22, w: 38 },
  { id: 'cmomo',    label: 'C',        cal: 100, p: 5.0, f: 5.2, c: 9.5, fiber: 0.6, sugar: 2.5, sodium: 220, chol: 20, w: 48 },
];

const COOKING_METHODS = [
  { id: 'steamed',   label: 'Steamed',   calAdd: 0,  fAdd: 0.0, cAdd: 0, wAdd: 0  },
  { id: 'fried',     label: 'Fried',     calAdd: 25, fAdd: 2.8, cAdd: 1, wAdd: -3 },
  { id: 'tandoori',  label: 'Tandoori',  calAdd: 30, fAdd: 2.0, cAdd: 2, wAdd: -2 },
  { id: 'cmomo',     label: 'C-Momo',    calAdd: 40, fAdd: 2.5, cAdd: 5, wAdd: 8  },
  { id: 'jhol',      label: 'Jhol',      calAdd: 12, fAdd: 1.0, cAdd: 1, wAdd: 18 },
];

const SAUCES = [
  { id: 'red',     label: 'Red Chutney',  cal: 15,  p: 0.3, f: 0.5, c: 2.5, w: 20 },
  { id: 'mayo',    label: 'Mayo',         cal: 90,  p: 0.2, f: 10,  c: 0.5, w: 15 },
  { id: 'cheese',  label: 'Cheese Dip',   cal: 70,  p: 2.5, f: 6.0, c: 1.5, w: 20 },
  { id: 'soup',    label: 'Soup',         cal: 30,  p: 1.5, f: 1.0, c: 4.0, w: 80 },
  { id: 'jhol',    label: 'Jhol Sauce',   cal: 45,  p: 1.0, f: 3.0, c: 4.0, w: 60 },
];

const PRESETS = [
  { label: 'Chicken · 10', type: 'chicken', method: 'steamed', pieces: 10, sauces: [] as string[] },
  { label: 'Veg · 10',     type: 'veg',     method: 'steamed', pieces: 10, sauces: [] as string[] },
  { label: 'Buff · 10',    type: 'buff',    method: 'steamed', pieces: 10, sauces: [] as string[] },
  { label: 'Fried · 10',   type: 'chicken', method: 'fried',   pieces: 10, sauces: [] as string[] },
  { label: 'C Momo · 10',  type: 'cmomo',   method: 'cmomo',   pieces: 10, sauces: ['red'] as string[] },
  { label: 'Jhol · 10',    type: 'jhol',    method: 'jhol',    pieces: 10, sauces: ['jhol'] as string[] },
];

const newItem = () => ({ type: 'chicken', method: 'steamed', pieces: 10, sauces: [] as string[] });

function computeItem(item: ReturnType<typeof newItem>) {
  const t = MOMO_TYPES.find(x => x.id === item.type) || MOMO_TYPES[0];
  const m = COOKING_METHODS.find(x => x.id === item.method) || COOKING_METHODS[0];
  const n = item.pieces;
  const ppCal = t.cal + m.calAdd;
  const ppF   = t.f   + m.fAdd;
  const ppC   = t.c   + m.cAdd;
  const ppW   = t.w   + m.wAdd;
  const sauceTotals = item.sauces.reduce((acc, sid) => {
    const s = SAUCES.find(x => x.id === sid);
    if (!s) return acc;
    return { cal: acc.cal + s.cal, p: acc.p + s.p, f: acc.f + s.f, c: acc.c + s.c, w: acc.w + s.w };
  }, { cal: 0, p: 0, f: 0, c: 0, w: 0 });

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
    ppCal, ppW, n, tLabel: t.label, mLabel: m.label,
  };
}

export default function MomoCalculator() {
  const [items, setItems] = useSyncState<ReturnType<typeof newItem>[]>('momo_v10_items', [newItem()]);
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState(newItem());
  
  const updateItem = (idx: number, patch: Partial<ReturnType<typeof newItem>>) => {
    setItems(items.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  };
  
  const toggleSauce = (idx: number, sid: string) => {
    const cur = items[idx].sauces;
    updateItem(idx, { sauces: cur.includes(sid) ? cur.filter(s => s !== sid) : [...cur, sid] });
  };
  
  const addItem = () => setItems([...items, newItem()]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const loadPreset = (p: typeof PRESETS[number]) => setItems([{ type: p.type, method: p.method, pieces: p.pieces, sauces: p.sauces }]);
  const reset = () => setItems([newItem()]);

  const computed = useMemo(() => items.map(computeItem), [items]);
  const totals = useMemo(() => computed.reduce(
    (acc, r) => ({
      cal: acc.cal + r.cal, p: acc.p + r.p, f: acc.f + r.f, c: acc.c + r.c,
      fiber: acc.fiber + r.fiber, sugar: acc.sugar + r.sugar, sodium: acc.sodium + r.sodium, chol: acc.chol + r.chol, w: acc.w + r.w,
    }),
    { cal: 0, p: 0, f: 0, c: 0, fiber: 0, sugar: 0, sodium: 0, chol: 0, w: 0 }
  ), [computed]);

  const first = computed[0];
  const totalPieces = items.reduce((a, it) => a + it.pieces, 0);
  const kcalPer100g = totals.w > 0 ? (totals.cal / totals.w) * 100 : 0;

  // Comparison for the first item
  const compareBase = MOMO_TYPES.find(t => t.id === items[0].type) || MOMO_TYPES[0];
  const compareSteam = COOKING_METHODS.find(m => m.id === 'steamed')!;
  const compareFried = COOKING_METHODS.find(m => m.id === 'fried')!;
  const steamedCal = (compareBase.cal + compareSteam.calAdd) * items[0].pieces;
  const friedCal = (compareBase.cal + compareFried.calAdd) * items[0].pieces;

  return (
    <ModernCalcLayout
      slug="momo-calorie-counter"
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Calculators', href: '/calculator/' },
        { label: 'Momo Calorie Calculator' },
      ]}
      title="Momo Calorie Calculator"
      description="Calculate estimated calories for different momo types, cooking methods and quantities."
      icon={Flame}
      inputs={
        <div className="space-y-6">
          {/* Popular Presets */}
          <div>
            <p className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider mb-2">Popular</p>
            <div className="flex flex-nowrap overflow-x-auto pb-2 -mx-2 px-2 gap-2 [&::-webkit-scrollbar]:hidden">
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  onClick={() => loadPreset(p)}
                  className="shrink-0 px-3 py-1.5 text-[12px] font-bold rounded border border-[#DADCE0] text-[#202124] bg-white hover:bg-slate-50 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#DADCE0]" />

          {/* Items */}
          <div className="space-y-6">
            {/* Primary Controls (Always edits the first/main item) */}
            <div className="space-y-4">
              {/* Type */}
              <div className="space-y-1.5">
                <label htmlFor="type-0" className="text-[13px] font-bold text-[#202124] block">Momo type</label>
                <div className="relative">
                  <select
                    id="type-0"
                    value={items[0].type}
                    onChange={e => updateItem(0, { type: e.target.value })}
                    className="w-full h-10 pl-3 pr-10 bg-white border border-[#DADCE0] rounded-md text-[13px] font-bold text-[#202124] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none appearance-none cursor-pointer"
                    aria-label="Select momo type"
                  >
                    {MOMO_TYPES.map(t => (
                      <option key={t.id} value={t.id}>{t.label} Momo</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F6368] pointer-events-none" />
                </div>
                <p className="text-[11px] text-[#5F6368]">Standard estimate: {MOMO_TYPES.find(x => x.id === items[0].type)?.cal} kcal/piece</p>
              </div>

              {/* Method */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#202124] block">Cooking method</label>
                <div className="flex flex-wrap gap-2">
                  {COOKING_METHODS.map(cm => (
                    <button
                      key={cm.id}
                      onClick={() => updateItem(0, { method: cm.id })}
                      aria-label={`Select ${cm.label} method`}
                      className={`px-3 py-1.5 text-[12px] font-bold rounded-md border transition-all ${items[0].method === cm.id ? 'bg-[#202124] border-[#202124] text-white' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'}`}
                    >
                      {cm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#202124] block">Quantity</label>
                <div className="flex items-center gap-2">
                  <button aria-label="Decrease quantity" onClick={() => updateItem(0, { pieces: Math.max(1, items[0].pieces - 1) })} className="w-10 h-10 flex items-center justify-center border border-[#DADCE0] rounded-md text-[#5F6368] hover:bg-slate-50 font-bold">−</button>
                  <span className="w-8 text-center font-bold text-[#202124] text-sm">{items[0].pieces}</span>
                  <button aria-label="Increase quantity" onClick={() => updateItem(0, { pieces: Math.min(100, items[0].pieces + 1) })} className="w-10 h-10 flex items-center justify-center border border-[#DADCE0] rounded-md text-[#5F6368] hover:bg-slate-50 font-bold">+</button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[1, 2, 4, 6, 8, 10, 12, 20].map(n => (
                    <button key={n} onClick={() => updateItem(0, { pieces: n })} className={`px-2 py-1 text-[11px] font-bold rounded border transition-all ${items[0].pieces === n ? 'bg-[#202124] border-[#202124] text-white' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'}`}>
                      {n}
                    </button>
                  ))}
                </div>
                <details className="group mt-2">
                  <summary className="text-[11px] font-bold text-[#5F6368] cursor-pointer list-none select-none inline-flex items-center gap-1 hover:text-[#202124]">
                    Serving presets <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {[
                      { label: '1 piece', val: 1 },
                      { label: '5 pieces', val: 5 },
                      { label: '10 pieces', val: 10 },
                      { label: '15 pieces', val: 15 },
                      { label: '20 pieces', val: 20 },
                    ].map(s => (
                      <button key={s.val} onClick={() => updateItem(0, { pieces: s.val })} className="px-2 py-1 text-[11px] font-medium rounded border border-[#DADCE0] bg-white text-[#5F6368] hover:bg-slate-50">
                        {s.label}
                      </button>
                    ))}
                  </div>
                </details>
              </div>

              {/* Sauces */}
              <div className="space-y-1.5 pt-2">
                {items[0].sauces.length === 0 ? (
                  <details className="group">
                    <summary className="text-[13px] font-bold text-[#1967D2] cursor-pointer list-none select-none inline-flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Add sauce / extras
                    </summary>
                    <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SAUCES.map(s => (
                        <label key={s.id} className="flex items-center gap-1.5 cursor-pointer p-1.5 border border-[#DADCE0] rounded bg-white hover:bg-slate-50">
                          <input type="checkbox" checked={false} onChange={() => toggleSauce(0, s.id)} className="w-3.5 h-3.5 rounded border-[#DADCE0] text-[#1967D2] focus:ring-[#1967D2]" aria-label={`Add ${s.label}`} />
                          <span className="text-[11px] font-bold text-[#202124] leading-none">{s.label} <span className="font-normal text-[#5F6368]">+{s.cal}</span></span>
                        </label>
                      ))}
                    </div>
                  </details>
                ) : (
                  <div>
                    <details className="group" open>
                      <summary className="text-[13px] font-bold text-[#202124] cursor-pointer list-none select-none flex items-center justify-between">
                        Sauce / extras <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                        {SAUCES.map(s => (
                          <label key={s.id} className="flex items-center gap-1.5 cursor-pointer p-1.5 border border-[#DADCE0] rounded bg-white hover:bg-slate-50">
                            <input type="checkbox" checked={items[0].sauces.includes(s.id)} onChange={() => toggleSauce(0, s.id)} className="w-3.5 h-3.5 rounded border-[#DADCE0] text-[#1967D2] focus:ring-[#1967D2]" aria-label={s.label} />
                            <span className="text-[11px] font-bold text-[#202124] leading-none">{s.label} <span className="font-normal text-[#5F6368]">+{s.cal}</span></span>
                          </label>
                        ))}
                      </div>
                    </details>
                    <div className="flex flex-wrap gap-2 items-center mt-2">
                      <span className="text-[11px] font-bold text-[#5F6368]">Extras:</span>
                      {items[0].sauces.map(sid => {
                        const s = SAUCES.find(x => x.id === sid)!;
                        return (
                          <span key={sid} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-full text-[11px] font-bold text-[#202124]">
                            {s.label}
                            <button aria-label={`Remove ${s.label}`} onClick={() => toggleSauce(0, sid)} className="text-[#5F6368] hover:text-rose-500"><X className="w-3 h-3"/></button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Meal Summary */}
            {items.length > 1 && (
              <div className="mt-6 bg-slate-50 border border-[#DADCE0] rounded-lg p-4 shadow-sm">
                <div className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider mb-3">Meal</div>
                <div className="space-y-3">
                  {items.map((it, idx) => {
                    const t = MOMO_TYPES.find(x => x.id === it.type)!;
                    const m = COOKING_METHODS.find(x => x.id === it.method)!;
                    return (
                      <div key={idx} className="flex justify-between items-center text-[13px] text-[#202124]">
                        <span>
                          {t.label} · {m.label.toLowerCase()} · {it.pieces}
                          {it.sauces.length > 0 && ' + extras'}
                        </span>
                        {idx !== 0 && (
                          <button onClick={() => removeItem(idx)} className="text-rose-500 font-bold text-[12px] hover:underline" aria-label="Remove item">Remove</button>
                        )}
                        {idx === 0 && (
                          <span className="text-[11px] font-bold text-[#5F6368] uppercase">Main</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-[#DADCE0] mt-3 pt-3 font-bold text-[13px] text-[#202124]">
                  Total: {totalPieces} momos
                </div>
              </div>
            )}

            {/* Add Another Momo Inline Form */}
            {isAdding ? (
              <div className="mt-4 bg-white border border-[#1967D2] rounded-lg p-4 space-y-4 shadow-sm">
                <div className="text-[13px] font-bold text-[#1967D2]">Add another momo</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-[#202124]">Type</label>
                    <div className="relative">
                      <select
                        value={draft.type}
                        onChange={e => setDraft({ ...draft, type: e.target.value })}
                        className="w-full h-9 pl-2 pr-8 bg-white border border-[#DADCE0] rounded-md text-[12px] font-bold text-[#202124] focus:border-[#1967D2] outline-none appearance-none"
                      >
                        {MOMO_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5F6368] pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-[#202124]">Method</label>
                    <div className="relative">
                      <select
                        value={draft.method}
                        onChange={e => setDraft({ ...draft, method: e.target.value })}
                        className="w-full h-9 pl-2 pr-8 bg-white border border-[#DADCE0] rounded-md text-[12px] font-bold text-[#202124] focus:border-[#1967D2] outline-none appearance-none"
                      >
                        {COOKING_METHODS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5F6368] pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-[#202124]">Quantity</label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setDraft({ ...draft, pieces: Math.max(1, draft.pieces - 1) })} className="w-8 h-8 flex items-center justify-center border border-[#DADCE0] rounded text-[#5F6368] hover:bg-slate-50 font-bold">−</button>
                    <span className="w-6 text-center font-bold text-[#202124] text-[13px]">{draft.pieces}</span>
                    <button onClick={() => setDraft({ ...draft, pieces: Math.min(100, draft.pieces + 1) })} className="w-8 h-8 flex items-center justify-center border border-[#DADCE0] rounded text-[#5F6368] hover:bg-slate-50 font-bold">+</button>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setItems([...items, draft]);
                      setIsAdding(false);
                      setDraft(newItem());
                    }}
                    className="px-4 py-2 bg-[#1967D2] hover:bg-blue-700 text-white text-[12px] font-bold rounded-md transition-colors"
                  >
                    Add to meal
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setDraft(newItem());
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#5F6368] hover:text-[#202124] text-[12px] font-bold rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <button onClick={() => setIsAdding(true)} aria-label="Add another momo" className="text-[13px] font-bold text-[#1967D2] flex items-center gap-1 hover:underline">
                   <Plus className="w-4 h-4" /> Add another momo
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#DADCE0] flex items-center gap-4">
            <button onClick={reset} className="text-[12px] font-bold text-[#5F6368] hover:text-[#202124]">Reset</button>
          </div>
          
          {/* ACCORDIONS MOVED TO LEFT COLUMN TO BALANCE HEIGHT */}
          <div className="space-y-3 border-t border-[#DADCE0] pt-6 mt-6">
            <details className="group bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
              <summary className="px-5 py-3.5 text-[13px] font-bold text-[#202124] cursor-pointer list-none flex items-center justify-between hover:bg-slate-50 outline-none focus:bg-slate-50">
                Nutrition details
                <ChevronDown className="w-4 h-4 text-[#5F6368] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 pb-5 pt-3 border-t border-[#DADCE0]">
                 <table className="w-full text-[13px]">
                   <tbody className="divide-y divide-slate-100">
                     {[
                       { label: 'Calories', value: `${Math.round(totals.cal)} kcal`, bold: true },
                       { label: 'Protein', value: `${totals.p.toFixed(1)} g` },
                       { label: 'Carbohydrates', value: `${totals.c.toFixed(1)} g` },
                       { label: 'Fat', value: `${totals.f.toFixed(1)} g` },
                       { label: 'Fiber', value: `${totals.fiber.toFixed(1)} g` },
                       { label: 'Sugar', value: `${totals.sugar.toFixed(1)} g` },
                       { label: 'Sodium', value: `${Math.round(totals.sodium)} mg` },
                       { label: 'Cholesterol', value: `${Math.round(totals.chol)} mg` },
                       { label: 'Estimated weight', value: `${Math.round(totals.w)} g` },
                       { label: 'Calories / 100g', value: `${Math.round(kcalPer100g)} kcal` },
                     ].map(r => (
                       <tr key={r.label}>
                         <td className="py-2.5 text-[#5F6368]">{r.label}</td>
                         <td className={`py-2.5 text-right ${r.bold ? 'font-bold text-[#202124]' : 'font-semibold text-[#202124]'}`}>{r.value}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
              </div>
            </details>

            <details className="group bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
              <summary className="px-5 py-3.5 text-[13px] font-bold text-[#202124] cursor-pointer list-none flex items-center justify-between hover:bg-slate-50 outline-none focus:bg-slate-50">
                Compare cooking methods
                <ChevronDown className="w-4 h-4 text-[#5F6368] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 pb-5 pt-4 border-t border-[#DADCE0] text-[13px]">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-[#5F6368]">Steamed</span>
                  <span className="font-bold text-[#202124]">{items[0].pieces} pieces · {steamedCal} kcal</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-[#5F6368]">Fried</span>
                  <span className="font-bold text-[#202124]">{items[0].pieces} pieces · {friedCal} kcal</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-[#202124] font-bold">
                  <span>Difference</span>
                  <span>+{friedCal - steamedCal} kcal</span>
                </div>
              </div>
            </details>

            <details className="group bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
              <summary className="px-5 py-3.5 text-[13px] font-bold text-[#202124] cursor-pointer list-none flex items-center justify-between hover:bg-slate-50 outline-none focus:bg-slate-50">
                How is this calculated?
                <ChevronDown className="w-4 h-4 text-[#5F6368] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 pb-5 pt-4 border-t border-[#DADCE0] text-[13px] text-[#5F6368] leading-relaxed">
                <p className="mb-2">The estimate is based on the selected momo type, cooking method, quantity and any selected extras. Values are calculated from the standard serving assumptions used by this calculator.</p>
                <p>Actual calories can vary with momo size, filling, recipe, oil used during cooking and sauces.</p>
              </div>
            </details>

          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {/* TOP HIERARCHY */}
          <div className="text-center pt-2 pb-6">
            <div className="text-[11px] font-black text-[#70757A] uppercase tracking-widest mb-3">YOUR ESTIMATE</div>
            <div className="text-5xl md:text-6xl font-black text-[#202124] mb-3 tracking-tight">
              ≈ {Math.round(totals.cal)} <span className="text-2xl md:text-3xl text-[#5F6368] font-bold tracking-normal">kcal</span>
            </div>
            <div className="text-lg font-bold text-[#202124] mb-1">
              {items.length === 1 
                ? `${items[0].pieces} ${first.mLabel.toLowerCase()} ${first.tLabel.toLowerCase()} momos` 
                : `${totalPieces} mixed momos`}
            </div>
            {items.length === 1 && (
              <div className="text-sm font-semibold text-[#5F6368] mb-4">
                ≈ {Math.round(first.ppCal)} kcal / momo
              </div>
            )}
            <div className="text-[13px] font-bold text-[#202124] bg-slate-50 inline-block px-4 py-2 rounded-full border border-slate-200">
              Protein {totals.p.toFixed(0)}g · Carbs {totals.c.toFixed(0)}g · Fat {totals.f.toFixed(0)}g
            </div>
          </div>

          <p className="text-xs text-center text-[#5F6368] leading-relaxed mt-4">
            Estimated value. Actual calories vary with momo size, filling, recipe, cooking method and sauces.
          </p>
        </div>
      }
      seoContent={
        <div className="pt-8">
          {/* ── How Many Calories Are in Momos? ── */}
          <h2 className="text-2xl font-black text-[#202124] mt-0 mb-3">How Many Calories Are in Momos?</h2>
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
          <div className="overflow-x-auto my-4 border border-[#DADCE0] rounded-xl not-prose">
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
                    <td className="px-4 py-2.5 text-right font-bold text-[#1967D2]">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#5F6368] leading-relaxed mb-6">
            These are example estimates using the standard steamed chicken calculation. Change the momo type, cooking method or quantity above for another result.
          </p>

          {/* ── Guide Link ── */}
          <div className="bg-[#E8F0FE] border border-[#1967D2] rounded-xl p-5 mb-6 not-prose">
            <h3 className="font-bold text-[#1967D2] text-lg mb-2">Momo Calories Guide</h3>
            <p className="text-[#202124] text-sm leading-relaxed mb-3">
              Looking for information about calories in chicken, veg, buff, fried, steamed, jhol and other momos? Read the <Link href="/blog/momo-calories/" className="text-[#1967D2] font-bold hover:underline">complete guide to momo calories</Link>.
            </p>
          </div>

          {/* ── Related Calculators ── */}
          <h2 className="text-2xl font-black text-[#202124] mt-8 mb-3">Related Calculators</h2>
          <ul className="text-[#5F6368] leading-relaxed space-y-2 not-prose">
            <li><Link href="/calculator/calorie-calculator/" className="text-[#1967D2] font-bold hover:underline">Calorie Calculator</Link> — Estimate daily calorie needs.</li>
            <li><Link href="/calculator/bmr/" className="text-[#1967D2] font-bold hover:underline">BMR Calculator</Link> — Estimate basal metabolic rate.</li>
            <li><Link href="/calculator/bmi/" className="text-[#1967D2] font-bold hover:underline">BMI Calculator</Link> — Calculate body mass index.</li>
            <li><Link href="/calculator/ideal-weight/" className="text-[#1967D2] font-bold hover:underline">Ideal Weight Calculator</Link> — Estimate an ideal weight range.</li>
            <li><Link href="/calculator/water-intake/" className="text-[#1967D2] font-bold hover:underline">Water Intake Calculator</Link> — Estimate daily water intake.</li>
          </ul>
        </div>
      }
    />
  );
}
