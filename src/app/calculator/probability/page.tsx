import { calcMeta } from '@/lib/calcMeta';
import ProbabilityCalculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Probability Calculator | Single & Two-Event Odds Solver – NepaCalc",
  description: "Calculate single-event and compound two-event probabilities (independent and mutually exclusive). Provides results as percentages, fractions, decimal values, and odds ratios.",
  slug: 'probability',
  keywords: ["probability calculator", "calculate odds", "two event probability", "independent events calculator", "favorable outcomes", "probability percentage fraction", "mutually exclusive probability"],
});

const PROBABILITY_FAQS = [
  {
    question: "What is the fundamental probability formula for a single event?",
    answer: "Probability P(E) = n(E) ÷ n(S), where n(E) is the number of favorable outcomes and n(S) is the total number of possible outcomes in the sample space. For example, rolling a 4 on a standard 6-sided die gives 1 favorable outcome out of 6 possibilities: P = 1/6 ≈ 16.67%."
  },
  {
    question: "How do you calculate compound probability for two independent events (P of A AND B)?",
    answer: "When two events are independent (the outcome of event A does not alter the likelihood of event B), multiply their individual probabilities: P(A and B) = P(A) × P(B). For instance, flipping Heads on a coin (1/2) AND rolling a 6 on a die (1/6) produces a joint probability of (1/2) × (1/6) = 1/12 ≈ 8.33%."
  },
  {
    question: "What is the difference between Independent and Mutually Exclusive events?",
    answer: "Independent events occur without influencing one another (such as flipping two distinct coins). Mutually exclusive events cannot happen at the same time (such as rolling a single die and getting both a 2 and a 5 on that same roll). For mutually exclusive events, P(A and B) = 0, and P(A or B) = P(A) + P(B)."
  },
  {
    question: "How do 'Odds' differ from 'Probability'?",
    answer: "Probability compares favorable outcomes to the TOTAL possible outcomes (favorable ÷ total). Odds compare favorable outcomes directly to UNFAVORABLE outcomes (favorable : unfavorable). A 20% probability (1 in 5 chance) corresponds to odds of 1 to 4 (1 success for every 4 failures)."
  },
  {
    question: "What is the 'Complement' of a probability?",
    answer: "The complement of event A represents the event NOT occurring, expressed mathematically as P(A') = 1 − P(A). If the probability of rain tomorrow is 30% (0.30), the complement probability of no rain is 1 − 0.30 = 70% (0.70). An event and its complement always sum to exactly 100%."
  },
  {
    question: "Can probability ever be greater than 100% or less than 0%?",
    answer: "No. A probability of 0 (0%) signifies an absolute mathematical impossibility (such as rolling a 9 on a standard 6-sided die). A probability of 1 (100%) signifies absolute certainty (such as drawing either a red or black card from a standard deck). Any valid probability must fall within the range [0, 1]."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Probability Calculator"
        description="Calculate single-event and two-event compound probabilities with percentage, fractional, decimal, and odds ratio outputs."
        url="https://nepacalc.com/calculator/probability/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Math Tools', item: 'https://nepacalc.com/math-tools/' },
          { name: 'Probability Calculator', item: 'https://nepacalc.com/calculator/probability/' }
        ]}
        faqs={PROBABILITY_FAQS}
      />

      <ProbabilityCalculator />

      {/* Probability Reference & Educational Guide */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Formula Matrix */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
            Core Probability Formulas & Theorems
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Concept</th>
                  <th className="px-4 py-3">Formula</th>
                  <th className="px-4 py-3">Sample Scenario</th>
                  <th className="px-4 py-3">Calculation & Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-4 py-3 font-bold text-blue-700">Single Event P(A)</td>
                  <td className="px-4 py-3 font-mono font-bold">n(A) ÷ n(S)</td>
                  <td className="px-4 py-3 text-[#5F6368]">Rolling an odd number (1, 3, 5) on a 6-sided die</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800">3/6 = 50.00%</td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-4 py-3 font-bold text-emerald-700">Complement Rule</td>
                  <td className="px-4 py-3 font-mono font-bold">1 − P(A)</td>
                  <td className="px-4 py-3 text-[#5F6368]">Probability of NOT rolling an Ace from a deck (4/52)</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800">1 − 4/52 = 92.31%</td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-4 py-3 font-bold text-purple-700">Independent Intersection (AND)</td>
                  <td className="px-4 py-3 font-mono font-bold">P(A) × P(B)</td>
                  <td className="px-4 py-3 text-[#5F6368]">Flipping Heads (0.5) AND rolling a 6 (0.1667)</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800">0.5 × 0.1667 = 8.33%</td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-4 py-3 font-bold text-rose-700">Mutually Exclusive Union (OR)</td>
                  <td className="px-4 py-3 font-mono font-bold">P(A) + P(B)</td>
                  <td className="px-4 py-3 text-[#5F6368]">Rolling a 1 (1/6) OR rolling a 6 (1/6) on a single die</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800">1/6 + 1/6 = 33.33%</td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-4 py-3 font-bold text-amber-700">General Union (Non-Exclusive)</td>
                  <td className="px-4 py-3 font-mono font-bold">P(A) + P(B) − P(A∩B)</td>
                  <td className="px-4 py-3 text-[#5F6368]">Drawing a King OR drawing a Heart from a deck</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800">4/52 + 13/52 − 1/52 = 30.77%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Reference Scenarios */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-600 pl-3 mb-6">
            Benchmark Probability Odds in Everyday Games
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Benchmark Event</th>
                  <th className="px-4 py-3">Favorable Outcomes</th>
                  <th className="px-4 py-3">Total Sample Space</th>
                  <th className="px-4 py-3">Exact Ratio</th>
                  <th className="px-4 py-3">Percentage</th>
                  <th className="px-4 py-3">Odds Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Fair Coin Flip (Heads)</td><td className="px-4 py-3">1</td><td className="px-4 py-3">2</td><td className="px-4 py-3 font-mono">1/2</td><td className="px-4 py-3 font-bold text-blue-700">50.00%</td><td className="px-4 py-3 font-mono">1 : 1</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Single Die — Target Number</td><td className="px-4 py-3">1</td><td className="px-4 py-3">6</td><td className="px-4 py-3 font-mono">1/6</td><td className="px-4 py-3 font-bold text-blue-700">16.67%</td><td className="px-4 py-3 font-mono">1 : 5</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Two Dice — Sum Equals 7</td><td className="px-4 py-3">6</td><td className="px-4 py-3">36</td><td className="px-4 py-3 font-mono">1/6</td><td className="px-4 py-3 font-bold text-blue-700">16.67%</td><td className="px-4 py-3 font-mono">1 : 5</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Draw Any Ace from 52 Cards</td><td className="px-4 py-3">4</td><td className="px-4 py-3">52</td><td className="px-4 py-3 font-mono">1/13</td><td className="px-4 py-3 font-bold text-blue-700">7.69%</td><td className="px-4 py-3 font-mono">1 : 12</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Draw Any Specified Suit (e.g. Spades)</td><td className="px-4 py-3">13</td><td className="px-4 py-3">52</td><td className="px-4 py-3 font-mono">1/4</td><td className="px-4 py-3 font-bold text-blue-700">25.00%</td><td className="px-4 py-3 font-mono">1 : 3</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Single Ticket Lottery (Pick 1 of 45)</td><td className="px-4 py-3">1</td><td className="px-4 py-3">45</td><td className="px-4 py-3 font-mono">1/45</td><td className="px-4 py-3 font-bold text-rose-600">2.22%</td><td className="px-4 py-3 font-mono">1 : 44</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {PROBABILITY_FAQS.map((faq, i) => (
              <div key={i} className="p-5 border border-[#DADCE0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#202124] text-sm">{faq.question}</h4>
                <p className="text-sm text-[#5F6368] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
