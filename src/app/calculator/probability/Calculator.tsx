'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Dices, PieChart } from 'lucide-react';

const SCENARIOS = [
  { label: 'Dice roll (6)',  f: 1, t: 6 },
  { label: 'Coin flip',     f: 1, t: 2 },
  { label: 'Draw one ace',  f: 4, t: 52 },
  { label: 'Lottery (1/45)',f: 1, t: 45 },
];

export default function ProbabilityCalc() {
  const [favorable, setFavorable] = useState(1);
  const [total, setTotal]         = useState(6);

  const res = useMemo(() => {
    if (total <= 0) return { prob: 0, pct: '—', odds: '—', complement: '—' };
    const p = Math.min(favorable / total, 1);
    return { prob: p.toFixed(4), pct: (p * 100).toFixed(2) + '%', odds: `${favorable}:${total - favorable}`, complement: ((1-p)*100).toFixed(2) + '%' };
  }, [favorable, total]);

  const inputCls = "w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 font-bold text-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Probability Calculator' }]}
      title="Probability & Odds Calculator"
      description="Calculate the statistical probability of any event. Enter favorable outcomes and total possible outcomes to instantly see the percentage, decimal, and odds."
      icon={Dices}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Favorable Outcomes</label>
              <input type="number" value={favorable} onChange={e => setFavorable(Number(e.target.value))} min={0} className={inputCls} />
              <p className="text-xs text-slate-500">Ways the event can happen</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Total Possible Outcomes</label>
              <input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} min={1} className={inputCls} />
              <p className="text-xs text-slate-500">Entire sample space size</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Quick Presets</label>
            <div className="grid grid-cols-2 gap-3">
              {SCENARIOS.map(s => (
                <button key={s.label} onClick={() => { setFavorable(s.f); setTotal(s.t); }}
                  className="p-3 border border-slate-200 rounded-xl bg-white hover:bg-blue-50 hover:border-blue-200 text-left flex flex-col justify-between items-start transition-all shadow-sm">
                  <span className="text-xs font-bold text-slate-700 mb-1">{s.label}</span>
                  <span className="text-sm font-black text-blue-600 bg-blue-100/50 px-2 rounded">{s.f} in {s.t}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 mt-4">
             <PieChart className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
             <div>
                <div className="text-xs font-bold uppercase text-slate-600 mb-1">Mathematical Formula</div>
                <code className="text-sm font-mono text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">P(A) = Favorable / Total</code>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-center relative overflow-hidden shadow-lg text-white">
            <Dices className="absolute -left-4 -bottom-4 w-32 h-32 text-white/10 -rotate-12" />
            <div className="relative z-10">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-3">Probability of Success</div>
              <div className="text-6xl sm:text-7xl font-black tracking-tighter mb-2 drop-shadow-sm">{res.pct}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Decimal',    val: res.prob },
              { label: 'Odds',       val: res.odds },
              { label: 'Complement', val: res.complement },
            ].map(({ label, val }) => (
              <div key={label} className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                <div className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">{label}</div>
                <div className="text-xl font-black text-slate-900">{val}</div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-blue-600">Will Happen</span>
              <span className="text-rose-500">Won't Happen</span>
            </div>
            <div className="h-4 flex rounded-full overflow-hidden w-full shadow-inner">
              <div className="bg-blue-600 transition-all duration-700" style={{ width: res.pct }} />
              <div className="bg-rose-400 flex-1 transition-all duration-700" />
            </div>
            <div className="flex justify-between text-xs font-black">
              <span className="text-blue-600">{res.pct}</span>
              <span className="text-rose-500">{res.complement}</span>
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Mathematics",
        links: [
          { label: 'Z-Score Calculator', href: '/calculator/z-score' },
          { label: 'Standard Deviation', href: '/calculator/standard-deviation' },
          { label: 'Ratio Calculator', href: '/calculator/ratio-proportion' },
        ],
      }}
      howToUse={{
        steps: [
          "Determine the number of favorable outcomes (how many ways the specific event you want can happen).",
          "Determine the total sample space (the total number of all possible outcomes).",
          "Enter these two numbers into the calculator.",
          "Review the results: Probability is presented as a percentage, a decimal, and in traditional odds formatting."
        ]
      }}
      faqs={[
        {
          question: "What is the difference between probability and odds?",
          answer: "Probability compares favorable outcomes to the TOTAL possible outcomes (e.g., rolling a 6 is 1 in 6). Odds compare favorable outcomes to UNFAVORABLE outcomes (e.g., rolling a 6 is 1 to 5 odds)."
        },
        {
          question: "What is the complement probability?",
          answer: "The complement is the probability that the event will NOT happen. Mathematically, it is 1 minus the probability of the event (or 100% - P%)."
        }
      ]}
      seoContent={
        <div>
          <h2>Probability Analysis Laboratory</h2>
          <p>
            Understanding <strong>risk and likelihood</strong> is essential for data science, finance, and everyday decision-making. 
            Probability provides the mathematical framework for quantifying uncertainty. Our analysis laboratory simplifies complex statistical queries. 
            Whether you are a student in Nepal calculating independent event outcomes or a professional analyzing risk ratios, 
            our engine provides instant conversions between <strong>odds, decimals, and percentages</strong> with absolute mathematical certainty.
          </p>

          <h2>Understanding Basic Statistical Probability</h2>
          <p>Probability is a branch of mathematics that deals with calculating the likelihood that a given event will occur. Whether you are analyzing risk in finance, calculating odds in gaming, or just trying to understand the chances of rain, understanding basic probability is essential for making informed decisions.</p>
          
          <h3>How to Calculate Probability</h3>
          <p>Theoretical probability is calculated using a very simple ratio:</p>
          <p><strong>P(Event) = Number of Favorable Outcomes / Total Number of Possible Outcomes</strong></p>
          <p>For example, a standard deck of cards has 52 cards, and there are 4 Aces. The probability of drawing an Ace at random is 4 (favorable outcomes) divided by 52 (total outcomes), which simplifies to 1/13, or approximately 7.69%.</p>
          
          <h3>Understanding Probability Formats</h3>
          <p>Probability can be expressed in several ways, and our calculator provides all of them instantly:</p>
          <ul>
            <li><strong>Percentage:</strong> The most common way people understand chance, ranging from 0% (impossible) to 100% (certain).</li>
            <li><strong>Decimal:</strong> Used primarily in advanced mathematics and statistics, ranging from 0.0 to 1.0.</li>
            <li><strong>Odds:</strong> Commonly used in betting. It represents the ratio of successes to failures (e.g., 1:5 means one success for every five failures).</li>
          </ul>
          
          <h3>Independent vs. Dependent Events</h3>
          <p>This calculator is designed for single, simple events. It is important to note whether multiple events are independent or dependent. A coin flip is independent—getting "Heads" on the first flip does not change the 50% probability of getting "Heads" on the second flip. However, drawing cards from a deck without replacing them is a dependent event, as the total sample space changes after each draw.</p>
        </div>
      }
    />
  );
}
