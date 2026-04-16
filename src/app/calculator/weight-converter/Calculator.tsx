'use client';
import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { ArrowLeftRight, Gem, TrendingUp, DollarSign } from 'lucide-react';

const UNITS: Record<string, { name: string; factor: number }> = {
  kg:   { name: 'Kilogram (kg)',      factor: 1000 },
  g:    { name: 'Gram (g)',           factor: 1 },
  mg:   { name: 'Milligram (mg)',     factor: 0.001 },
  lb:   { name: 'Pound (lb)',         factor: 453.592 },
  oz:   { name: 'Ounce (oz)',         factor: 28.3495 },
  tola: { name: 'Tola (Nepal Gold)',  factor: 11.6638 },
  ton:  { name: 'Metric Ton',         factor: 1000000 },
};

const DEFAULT_STATE = {
  value: 1,
  from: 'kg',
  to: 'lb',
  goldPricePerTola: 150000, // NPR
};

export default function WeightConverter() {
  const [state, setState] = useSyncState('weight_converter_v2', DEFAULT_STATE);
  const { value, from, to, goldPricePerTola } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const r = (value * UNITS[from].factor) / UNITS[to].factor;
    return r.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [value, from, to]);

  const goldValue = useMemo(() => {
    // Current input converted to Tola
    const tolas = (value * UNITS[from].factor) / UNITS['tola'].factor;
    return tolas * goldPricePerTola;
  }, [value, from, goldPricePerTola]);

  const swap = () => { updateState({ from: to, to: from }); };

  return (
    <CalculatorLayout
      title="Weight & Mass Converter"
      description="Convert between kilograms, pounds, grams, ounces, and Nepal's unique gold Tola standard with high precision."
      category={{ label: 'Conversion', href: '/calculator/category/conversion' }}
      leftPanel={
        <div className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Amount to Convert</label>
            <input type="number" value={value} onChange={e => updateState({ value: Number(e.target.value) })} min={0}
              className="w-full h-14 px-4 border-2 border-[var(--border)] bg-white font-mono text-2xl font-black focus:border-[var(--primary)] outline-none" />
          </div>

          {/* From / Swap / To */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">From</label>
              <select value={from} onChange={e => updateState({ from: e.target.value })}
                className="w-full h-12 px-3 border border-[var(--border)] bg-[var(--bg-surface)] font-bold text-sm outline-none focus:border-[var(--primary)] cursor-pointer">
                {Object.entries(UNITS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>

            <button onClick={swap}
              className="mt-6 h-10 w-10 border border-[var(--border)] bg-white flex items-center justify-center hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all">
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">To</label>
              <select value={to} onChange={e => updateState({ to: e.target.value })}
                className="w-full h-12 px-3 border border-[var(--border)] bg-[var(--bg-surface)] font-bold text-sm outline-none focus:border-[var(--primary)] cursor-pointer">
                {Object.entries(UNITS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
          </div>

          {/* Nepal Gold Reference */}
          <div className="p-5 bg-amber-50 border border-amber-200 flex gap-3 items-start">
            <Gem className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-black uppercase text-amber-800 mb-1">Nepal Gold Standard</div>
              <p className="text-[12px] text-amber-700 leading-relaxed">
                1 Tola = precisely <strong>11.6638 grams</strong> in the Nepali jewelry market.
              </p>
            </div>
          </div>

          {/* Gold Value Card */}
          <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4 shadow-xl">
             <div className="flex items-center gap-2">
                <Gem className="w-5 h-5 text-amber-400" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Market Value Estimator</h3>
             </div>
             <div className="space-y-3">
                <div className="space-y-1">
                   <label className="text-[9px] font-black uppercase text-slate-500">Live Rate (NPR per Tola)</label>
                   <input type="number" value={goldPricePerTola} onChange={e => updateState({ goldPricePerTola: Number(e.target.value) })}
                    className="w-full h-11 px-3 bg-white/5 border border-white/10 rounded-xl font-mono font-bold text-white focus:outline-none focus:border-amber-500 transition-all" />
                </div>
                <div className="pt-2 border-t border-white/5 flex justify-between items-end">
                   <span className="text-[10px] font-black text-slate-500 uppercase">Estimated Value</span>
                   <span className="text-2xl font-black text-amber-400 tracking-tighter">NPR {goldValue.toLocaleString()}</span>
                </div>
             </div>
          </div>

          {/* Quick Reference (Simplified) */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: '1 kg → lb', val: '2.2046 lb' },
              { label: '1 tola → g', val: '11.664 g' },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-[var(--bg-surface)] border border-[var(--border)] flex flex-col items-center">
                <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">{item.label}</span>
                <span className="text-[11px] font-black text-[var(--primary)]">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          {/* Result Hero */}
          <div className="p-8 bg-white border border-[var(--border)] text-center">
            <div className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">Result</div>
            <div className="text-5xl font-black text-[var(--primary)] tracking-tighter mb-2 font-mono break-all">{result}</div>
            <div className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">{UNITS[to].name}</div>
          </div>

          {/* From / To Labels */}
          <div className="space-y-3">
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] flex justify-between">
              <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Input Unit</span>
              <span className="text-sm font-black text-[var(--text-main)]">{UNITS[from].name}</span>
            </div>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] flex justify-between">
              <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Output Unit</span>
              <span className="text-sm font-black text-[var(--text-main)]">{UNITS[to].name}</span>
            </div>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] flex justify-between">
              <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Conversion Factor</span>
              <span className="text-sm font-black text-[var(--text-main)] font-mono">
                {(UNITS[from].factor / UNITS[to].factor).toFixed(6)}
              </span>
            </div>
          </div>

          <div className="p-5 bg-[var(--bg-subtle)] border border-[var(--border)]">
            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed italic">
              Formula: {value} {from} × ({UNITS[from].factor} / {UNITS[to].factor}) = {result} {to}
            </p>
          </div>
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'What is 1 Tola in grams?', answer: '1 Tola = 11.6638 grams in the Nepali jewelry standard. This is used extensively for gold and silver measurements.' },
          { question: 'How many pounds in 1 kg?', answer: '1 Kilogram = 2.20462 Pounds exactly.' },
          { question: 'Why use this for Nepal?', answer: 'We include the Tola unit used in Nepal\'s gold market, which no standard international converter offers.' },
        ]} />
      }
    />
  );
}
