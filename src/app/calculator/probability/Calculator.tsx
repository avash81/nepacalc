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
    if (total <= 0) return { prob: 0, pct: ', ', odds: ', ', complement: ', ' };
    const p = Math.min(favorable / total, 1);
    return { prob: p.toFixed(4), pct: (p * 100).toFixed(2) + '%', odds: `${favorable}:${total, favorable}`, complement: ((1-p)*100).toFixed(2) + '%' };
  }, [favorable, total]);

  const inputCls = "w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 font-bold text-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all";

  return (
    <ModernCalcLayout hideH1={false}
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Statistical Probability & Risk Analysis</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Probability is the fundamental branch of mathematics concerned with quantifying uncertainty. Whether assessing financial risk models, actuarial life tables, or simple casino game mechanics, calculating the exact likelihood of an event is crucial. Our <strong className="text-[#202124]">probability calculator</strong> functions as a high-speed inference engine, designed to instantly compute the theoretical probability of a single independent event occurring within a defined sample space.
              </p>
              <p>
                By dividing the number of <span className="italic">Favorable Outcomes</span> (the specific events you want to measure) by the <span className="italic">Total Possible Outcomes</span> (the entire universe of possibilities), the engine derives the primary probability ratio. Furthermore, it automatically extrapolates this raw ratio into the three universal statistical formats: percentage, decimal distribution, and traditional betting odds.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Output Formats</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Decimal Probability (P):</strong> The standard format used in advanced academic mathematics and machine learning algorithms. It is strictly bounded between 0.0 (absolute impossibility) and 1.0 (absolute certainty).</li>
              <li><strong className="text-[#188038]">Betting Odds (Success:Failure):</strong> Unlike probability which compares favorable outcomes to the total, <strong className="text-[#202124]">odds calculator</strong> metrics compare favorable outcomes directly against <span className="italic">unfavorable</span> outcomes. If you have 1 winning ticket in a 10-ticket lottery, the probability is 10%, but the odds are 1:9.</li>
              <li><strong className="text-[#D93025]">The Complement Rule (P'):</strong> In statistical theory, the complement represents the probability that the event will NOT happen. Because the sum of all possible probabilities in a sample space must equal 100%, the complement is always exactly (100%, P). Our visual bar instantly graphs this dichotomy.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Identify your 'Favorable Outcomes'. This is the number of ways your desired event can occur (e.g., drawing any of the 4 Aces in a deck).",
          "Identify your 'Total Possible Outcomes'. This is the absolute maximum number of events that could happen (e.g., the 52 cards in a deck).",
          "Input these values into the top fields. For common scenarios like dice or coin flips, simply click the 'Quick Presets' buttons.",
          "The engine instantly calculates the success probability in the main display.",
          "Review the breakdown grid for the decimal equivalent, the exact ratio odds, and the complement (failure) percentage."
        ]
      }}
      formula={{
        title: "Theoretical Probability Formula",
        description: "The core statistical ratio defining independent events.",
        raw: "P(Event) = (Favorable Outcomes) / (Total Possible Outcomes)\n\nComplement Rule:\nP(Not Event) = 1, P(Event)\n\nOdds Calculation:\nOdds = (Favorable Outcomes) : (Total Outcomes, Favorable Outcomes)"
      }}
      faqs={[
        {
          question: "What is the mathematical difference between probability and odds?",
          answer: "Probability compares favorable outcomes to the TOTAL possible outcomes (e.g., rolling a 6 on a die is 1 in 6). Odds compare favorable outcomes directly to UNFAVORABLE outcomes (e.g., rolling a 6 is 1 to 5 odds)."
        },
        {
          question: "What does a probability of 0 or 1 mean?",
          answer: "In statistics, a probability of 0 (or 0%) means the event is absolutely impossible. A probability of 1 (or 100%) means the event is an absolute mathematical certainty."
        },
        {
          question: "How does the Complement Rule work?",
          answer: "The complement is the probability that the event will NOT happen. Mathematically, it is 1 minus the probability of the event. If there is a 30% chance of rain, the complement (chance of no rain) is exactly 70%."
        },
        {
          question: "Does this calculator handle multiple independent events?",
          answer: "This specific tool computes the probability of a single event. To calculate multiple independent events (like rolling a 6 AND flipping Heads), you must calculate their individual probabilities and multiply them together."
        },
        {
          question: "Why do my odds look different from sports betting odds?",
          answer: "Sports betting odds (like +150 or 2/1) have a 'vig' or 'juice' (the bookmaker's profit margin) baked into them, so they never reflect true mathematical probability. This calculator outputs pure mathematical odds."
        },
        {
          question: "What is an independent vs dependent event?",
          answer: "A coin flip is independent, getting Heads on the first flip does not change the 50% probability of getting Heads on the second flip. Drawing cards without replacing them is dependent, as the total sample space changes after each draw."
        }
      ]}
    />
  );
}

