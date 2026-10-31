'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Dices, Layers, CheckCircle2, ShieldCheck, Binary } from 'lucide-react';

const SINGLE_SCENARIOS = [
  { label: 'Coin Toss (Heads/Tails)', f: 1, t: 2 },
  { label: 'Die Roll (Single Number)', f: 1, t: 6 },
  { label: 'Draw an Ace from Deck', f: 4, t: 52 },
  { label: 'Draw Any Spade Suit', f: 13, t: 52 },
  { label: 'Pair of Dice Sum = 7', f: 6, t: 36 },
  { label: 'Lottery Ticket (1 in 45)', f: 1, t: 45 },
];

export default function ProbabilityCalc() {
  const [activeTab, setActiveTab] = useState<'single' | 'double'>('single');

  // Single event inputs
  const [favorable, setFavorable] = useState(1);
  const [total, setTotal] = useState(6);

  // Two events inputs
  const [probA, setProbA] = useState(50); // in percent
  const [probB, setProbB] = useState(50); // in percent
  const [eventType, setEventType] = useState<'independent' | 'mutually_exclusive'>('independent');

  // Single event calculations
  const singleRes = useMemo(() => {
    if (total <= 0) return { prob: '0.0000', pct: '0.00%', odds: '0:0', complement: '100.00%', ratio: '0/0', numPct: 0 };
    const p = Math.min(Math.max(favorable / total, 0), 1);
    const pctVal = p * 100;
    const compVal = (1 - p) * 100;
    return {
      prob: p.toFixed(4),
      pct: pctVal.toFixed(2) + '%',
      numPct: pctVal,
      odds: `${favorable}:${Math.max(0, total - favorable)}`,
      complement: compVal.toFixed(2) + '%',
      ratio: `${favorable}/${total}`
    };
  }, [favorable, total]);

  // Two events calculations
  const doubleRes = useMemo(() => {
    const pa = Math.min(Math.max(probA / 100, 0), 1);
    const pb = Math.min(Math.max(probB / 100, 0), 1);

    if (eventType === 'independent') {
      const pAnd = pa * pb;
      const pOr = pa + pb - pAnd;
      const pAOnly = pa * (1 - pb);
      const pBOnly = pb * (1 - pa);
      const pNeither = (1 - pa) * (1 - pb);

      return {
        pAndPct: (pAnd * 100).toFixed(2) + '%',
        pOrPct: (pOr * 100).toFixed(2) + '%',
        pAOnlyPct: (pAOnly * 100).toFixed(2) + '%',
        pBOnlyPct: (pBOnly * 100).toFixed(2) + '%',
        pNeitherPct: (pNeither * 100).toFixed(2) + '%',
        pAndNum: pAnd * 100,
        pOrNum: pOr * 100,
      };
    } else {
      const pAnd = 0;
      const pOr = Math.min(pa + pb, 1);
      const pAOnly = pa;
      const pBOnly = pb;
      const pNeither = Math.max(0, 1 - (pa + pb));

      return {
        pAndPct: '0.00% (Cannot occur simultaneously)',
        pOrPct: (pOr * 100).toFixed(2) + '%',
        pAOnlyPct: (pAOnly * 100).toFixed(2) + '%',
        pBOnlyPct: (pBOnly * 100).toFixed(2) + '%',
        pNeitherPct: (pNeither * 100).toFixed(2) + '%',
        pAndNum: 0,
        pOrNum: pOr * 100,
      };
    }
  }, [probA, probB, eventType]);

  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-mono text-xl font-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm text-slate-800";
  const labelCls = "text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5";

  return (
    <ModernCalcLayout
      slug="probability"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Probability Calculator' }]}
      title="Probability Calculator"
      description="Calculate single-event probabilities, odds ratios, complements, and compound two-event scenarios (independent vs. mutually exclusive) with step-by-step mathematical formulas."
      icon={Dices}
      inputs={
        <div className="space-y-6">
          {/* Mode Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('single')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'single'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Dices className="w-4 h-4" />
              Single Event P(A)
            </button>
            <button
              onClick={() => setActiveTab('double')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'double'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              Two Events: A and B
            </button>
          </div>

          {activeTab === 'single' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
                <div className="space-y-1">
                  <label className={labelCls}>Favorable Outcomes (n)</label>
                  <input
                    type="number"
                    value={favorable}
                    onChange={e => setFavorable(Math.max(0, Number(e.target.value)))}
                    min={0}
                    className={inputCls}
                  />
                  <p className="text-xs text-slate-500">Ways your target outcome can happen.</p>
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Total Sample Space (N)</label>
                  <input
                    type="number"
                    value={total}
                    onChange={e => setTotal(Math.max(1, Number(e.target.value)))}
                    min={1}
                    className={inputCls}
                  />
                  <p className="text-xs text-slate-500">Total number of possible outcomes.</p>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Quick Scenario Presets</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SINGLE_SCENARIOS.map(s => (
                    <button
                      key={s.label}
                      onClick={() => { setFavorable(s.f); setTotal(s.t); }}
                      className="p-3 border border-slate-200 rounded-xl bg-white hover:bg-blue-50 hover:border-blue-300 text-left transition-all shadow-sm group"
                    >
                      <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-1">{s.label}</div>
                      <div className="text-[11px] font-mono text-blue-600 mt-1 font-semibold">{s.f} in {s.t}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-5 p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelCls}>Probability of Event A (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={probA}
                      onChange={e => setProbA(Math.min(100, Math.max(0, Number(e.target.value))))}
                      min={0}
                      max={100}
                      className={inputCls}
                    />
                    <span className="absolute right-4 top-3 text-sm font-bold text-slate-400">%</span>
                  </div>
                  <p className="text-xs text-slate-500">e.g. 50% for coin flip</p>
                </div>

                <div className="space-y-1">
                  <label className={labelCls}>Probability of Event B (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={probB}
                      onChange={e => setProbB(Math.min(100, Math.max(0, Number(e.target.value))))}
                      min={0}
                      max={100}
                      className={inputCls}
                    />
                    <span className="absolute right-4 top-3 text-sm font-bold text-slate-400">%</span>
                  </div>
                  <p className="text-xs text-slate-500">e.g. 16.67% for rolling a 6</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className={labelCls}>Event Relationship Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setEventType('independent')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      eventType === 'independent'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-200'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      {eventType === 'independent' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      Independent Events
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Event A does not influence Event B (e.g., two distinct coin tosses).</div>
                  </button>

                  <button
                    onClick={() => setEventType('mutually_exclusive')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      eventType === 'mutually_exclusive'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-200'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      {eventType === 'mutually_exclusive' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      Mutually Exclusive
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Cannot occur together (e.g., rolling a 1 or a 6 on a single die roll).</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
            <Binary className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-950">
              <span className="font-bold">Standard Probability Axiom:</span> P(E) = n(E) ÷ n(S). Probability is bounded between 0 (impossible) and 1 (100% certainty).
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {activeTab === 'single' ? (
            <>
              {/* Single Event Primary Result */}
              <div className="p-8 bg-blue-600 rounded-2xl text-center shadow-md text-white relative overflow-hidden">
                <Dices className="absolute -left-6 -bottom-6 w-36 h-36 text-white/10 -rotate-12" />
                <div className="relative z-10 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-200">Probability of Occurrence</div>
                  <div className="text-6xl sm:text-7xl font-black tracking-tight font-mono">{singleRes.pct}</div>
                  <div className="inline-block px-4 py-1.5 bg-white/20 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/30">
                    Fraction: {singleRes.ratio}
                  </div>
                </div>
              </div>

              {/* Metric Breakdown Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Decimal Form</div>
                  <div className="text-xl font-black text-slate-800 font-mono">{singleRes.prob}</div>
                  <div className="text-[10px] text-slate-400 mt-1">0 ≤ P ≤ 1</div>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Odds Ratio</div>
                  <div className="text-xl font-black text-slate-800 font-mono">{singleRes.odds}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Success : Fail</div>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Complement</div>
                  <div className="text-xl font-black text-rose-600 font-mono">{singleRes.complement}</div>
                  <div className="text-[10px] text-slate-400 mt-1">1 − P(A)</div>
                </div>
              </div>

              {/* Visual Probability Bar */}
              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-blue-600">Likelihood P: {singleRes.pct}</span>
                  <span className="text-rose-600">Unlikely Q: {singleRes.complement}</span>
                </div>
                <div className="h-4 flex rounded-full overflow-hidden bg-slate-100 border border-slate-200 p-0.5">
                  <div
                    className="bg-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(Math.max(singleRes.numPct, 0), 100)}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Two Events Results Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-600 rounded-2xl text-white shadow-md text-center space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-200">Both Occur: P(A and B)</div>
                  <div className="text-4xl font-black font-mono">{doubleRes.pAndPct}</div>
                  <div className="text-xs text-blue-100 opacity-90 font-mono">
                    {eventType === 'independent' ? 'P(A) × P(B)' : 'Mutually exclusive: 0%'}
                  </div>
                </div>

                <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-md text-center space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">At Least One: P(A or B)</div>
                  <div className="text-4xl font-black font-mono text-emerald-400">{doubleRes.pOrPct}</div>
                  <div className="text-xs text-slate-400 font-mono">
                    {eventType === 'independent' ? 'P(A) + P(B) − P(A ∩ B)' : 'P(A) + P(B)'}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-sm">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Only Event A Occurs</div>
                    <div className="text-[11px] text-slate-500 font-mono">P(A) and not P(B)</div>
                  </div>
                  <span className="text-base font-black text-slate-800 font-mono">{doubleRes.pAOnlyPct}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Only Event B Occurs</div>
                    <div className="text-[11px] text-slate-500 font-mono">P(B) and not P(A)</div>
                  </div>
                  <span className="text-base font-black text-slate-800 font-mono">{doubleRes.pBOnlyPct}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Neither Event Occurs</div>
                    <div className="text-[11px] text-slate-500 font-mono">1 − P(A or B)</div>
                  </div>
                  <span className="text-base font-black text-rose-600 font-mono">{doubleRes.pNeitherPct}</span>
                </div>
              </div>
            </>
          )}

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculated following classical probability axioms. Applicable for secondary school math (Grade 10 SEE, Class 11/12), Lok Sewa quantitative aptitude, and college statistics.
            </p>
          </div>
        </div>
      }
      sidebar={{
        title: "Related Calculators",
        links: [
          { label: "Z-Score Calculator", href: "/calculator/z-score/" },
          { label: "Standard Deviation", href: "/calculator/standard-deviation/" },
          { label: "Marks Needed Calculator", href: "/calculator/marks-needed/" },
          { label: "Ratio & Proportion", href: "/calculator/ratio-proportion/" },
          { label: "Simple Calculator", href: "/calculator/simple-calculator/" },
        ]
      }}
      howToUse={{
        steps: [
          "For a single event (e.g. dice roll, card draw, coin toss), choose 'Single Event P(A)' and enter favorable outcomes (n) and total possible sample space (N).",
          "For compound events (e.g. two coin flips or simultaneous tests), switch to 'Two Events: A and B'.",
          "Select 'Independent' if one event does not influence the other, or 'Mutually Exclusive' if both cannot happen at once.",
          "Review the resulting percentages, decimal forms, betting odds, and complement probabilities."
        ]
      }}
    />
  );
}
