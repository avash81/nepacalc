import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Probability Calculator | Calculate Odds & Percentages – NepaCalc",
  description: "Calculate the probability of any event: favorable outcomes divided by total outcomes. Get the result as a fraction, decimal, percentage, and odds ratio instantly.",
  slug: 'probability',
  keywords: ["probability calculator", "calculate odds", "favorable outcomes calculator", "probability percentage", "theoretical probability", "probability fraction to percentage", "math solver nepal"],
});

const PROBABILITY_FAQS = [
  {
    question: "What is the basic probability formula?",
    answer: "P(event) = Favorable Outcomes ÷ Total Outcomes. For example, rolling a 3 on a standard die: 1 favorable outcome out of 6 total = 1/6 ≈ 0.1667 = 16.67%."
  },
  {
    question: "What is the difference between Theoretical and Experimental Probability?",
    answer: "Theoretical probability is based on reasoning before any experiment (a die has 1/6 chance of landing on any face). Experimental probability is calculated from actual trial results — if you roll a die 60 times and get 3 twelve times, that experiment gives 12/60 = 20%."
  },
  {
    question: "What are 'Odds' and how do they differ from Probability?",
    answer: "Probability is favorable ÷ total. Odds are favorable : unfavorable. A 20% probability (1/5) equals odds of 1:4 — 1 way to win, 4 ways to lose. Sports betting and gambling use the odds format."
  },
  {
    question: "How do I find the probability of two independent events both happening?",
    answer: "Multiply their individual probabilities. Getting heads on a coin flip AND rolling a 6 on a die: 1/2 × 1/6 = 1/12 ≈ 8.33%. This only works when the events do not affect each other."
  },
  {
    question: "What is a complement in probability?",
    answer: "The complement of event A is 'A does NOT happen'. P(not A) = 1 − P(A). If there is a 30% chance of rain, there is a 70% chance of no rain. Both always add up to exactly 100%."
  },
  {
    question: "What is a 'Sample Space'?",
    answer: "The sample space is the complete set of all possible outcomes. For a coin flip: {Heads, Tails}. For a six-sided die: {1, 2, 3, 4, 5, 6}. The 'Total Outcomes' field in this calculator represents the size of the sample space."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Probability Calculator"
        description="Calculate the probability of any event as a fraction, decimal, percentage, and odds ratio."
        url="https://nepacalc.com/calculator/probability/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Math Tools', item: 'https://nepacalc.com/math-tools/' },
          { name: 'Probability Calculator', item: 'https://nepacalc.com/calculator/probability/' }
        ]}
        faqs={PROBABILITY_FAQS}
      />
      <Calculator />

      {/* Content section rendered server-side */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Formula reference */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
            Probability Formula Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Concept</th>
                  <th className="px-4 py-3">Formula</th>
                  <th className="px-4 py-3">Example</th>
                  <th className="px-4 py-3">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Basic Probability</td><td className="px-4 py-3 font-mono text-blue-600 font-bold">P = F / T</td><td className="px-4 py-3 font-mono">Roll a 4 on a die</td><td className="px-4 py-3 font-bold">1/6 = 16.67%</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Complement</td><td className="px-4 py-3 font-mono text-emerald-600 font-bold">P′ = 1 − P</td><td className="px-4 py-3 font-mono">Not rolling a 4</td><td className="px-4 py-3 font-bold">5/6 = 83.33%</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Independent Events (AND)</td><td className="px-4 py-3 font-mono text-purple-600 font-bold">P(A∩B) = P(A) × P(B)</td><td className="px-4 py-3 font-mono">Heads AND roll 6</td><td className="px-4 py-3 font-bold">1/2 × 1/6 = 8.33%</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Mutually Exclusive (OR)</td><td className="px-4 py-3 font-mono text-red-600 font-bold">P(A∪B) = P(A) + P(B)</td><td className="px-4 py-3 font-mono">Roll 1 OR roll 2</td><td className="px-4 py-3 font-bold">1/6 + 1/6 = 33.33%</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Odds (for)</td><td className="px-4 py-3 font-mono text-orange-600 font-bold">Odds = F : (T − F)</td><td className="px-4 py-3 font-mono">Rolling a 4</td><td className="px-4 py-3 font-bold">1 : 5</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common scenarios */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-500 pl-3 mb-6">
            Common Probability Scenarios
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Scenario</th>
                  <th className="px-4 py-3">Favorable</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Fraction</th>
                  <th className="px-4 py-3">Percentage</th>
                  <th className="px-4 py-3">Odds</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Coin — Heads</td><td className="px-4 py-3">1</td><td className="px-4 py-3">2</td><td className="px-4 py-3 font-mono">1/2</td><td className="px-4 py-3 font-bold text-blue-600">50%</td><td className="px-4 py-3">1:1</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Die — Any single number</td><td className="px-4 py-3">1</td><td className="px-4 py-3">6</td><td className="px-4 py-3 font-mono">1/6</td><td className="px-4 py-3 font-bold text-blue-600">16.67%</td><td className="px-4 py-3">1:5</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Die — Even number (2, 4, 6)</td><td className="px-4 py-3">3</td><td className="px-4 py-3">6</td><td className="px-4 py-3 font-mono">1/2</td><td className="px-4 py-3 font-bold text-blue-600">50%</td><td className="px-4 py-3">1:1</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Card — Draw an Ace</td><td className="px-4 py-3">4</td><td className="px-4 py-3">52</td><td className="px-4 py-3 font-mono">1/13</td><td className="px-4 py-3 font-bold text-blue-600">7.69%</td><td className="px-4 py-3">1:12</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Card — Draw any Heart</td><td className="px-4 py-3">13</td><td className="px-4 py-3">52</td><td className="px-4 py-3 font-mono">1/4</td><td className="px-4 py-3 font-bold text-blue-600">25%</td><td className="px-4 py-3">1:3</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Lottery (pick 1 of 45)</td><td className="px-4 py-3">1</td><td className="px-4 py-3">45</td><td className="px-4 py-3 font-mono">1/45</td><td className="px-4 py-3 font-bold text-red-600">2.22%</td><td className="px-4 py-3">1:44</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Key concepts */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-purple-500 pl-3 mb-6">
            Key Probability Concepts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: 'Theoretical Probability', body: 'Based on logic before any experiment. Rolling a die: each of the 6 faces has an equal 1/6 chance, assuming the die is perfectly fair and balanced.' },
              { title: 'Experimental Probability', body: 'Based on observed results. If you flip a coin 100 times and get 53 heads, the experimental probability of heads is 53/100 = 53%. With more trials, it converges toward the theoretical 50%.' },
              { title: 'Independent Events', body: 'Two events are independent if one does not affect the other. Flipping a coin does not affect a die roll. Combined probability = P(A) × P(B).' },
              { title: 'Mutually Exclusive Events', body: 'Events that cannot both happen at the same time. Rolling a 2 and rolling a 5 on the same die roll cannot both happen. P(A or B) = P(A) + P(B).' },
            ].map(({ title, body }) => (
              <div key={title} className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                <h4 className="font-bold text-[#202124] text-sm mb-2">{title}</h4>
                <p className="text-xs text-[#5F6368] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
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
