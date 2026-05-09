'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Dices, PieChart, TrendingUp, Info, ShieldCheck, Microscope, History, GraduationCap, Landmark, Target, Binary, Award } from 'lucide-react';

const SCENARIOS = [
  { label: 'Dice Roll (Standard 6-sided)',  f: 1, t: 6 },
  { label: 'Coin Flip (Fair)',     f: 1, t: 2 },
  { label: 'Draw Ace from Deck',  f: 4, t: 52 },
  { label: 'Lottery (1 in 45)',f: 1, t: 45 },
  { label: 'Rare Event (1 in 10,000)',f: 1, t: 10000 },
  { label: 'High Confidence (95%)',f: 95, t: 100 },
];

export default function ProbabilityCalc() {
  const [favorable, setFavorable] = useState(1);
  const [total, setTotal]         = useState(6);

  const res = useMemo(() => {
    if (total <= 0) return { prob: 0, pct: '0%', odds: '0:0', complement: '100%', ratio: '0/0' };
    const p = Math.min(favorable / total, 1);
    return { 
        prob: p.toFixed(4), 
        pct: (p * 100).toFixed(2) + '%', 
        odds: `${favorable}:${Math.max(0, total - favorable)}`, 
        complement: ((1-p)*100).toFixed(2) + '%',
        ratio: `${favorable}/${total}`
    };
  }, [favorable, total]);

  const inputCls = "w-full px-6 py-4 rounded-2xl border border-[#DADCE0] bg-white font-black text-2xl focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all shadow-sm text-[#202124]";
  const labelCls = "text-[11px] font-black uppercase text-[#70757A] tracking-wider mb-2 block";

  return (
    <ModernCalcLayout 
      slug="probability"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Probability Calculator' }]}
      title="Professional Probability"
      description="The definitive resource for Bayesian and frequentist probability. Calculate odds, success percentages, and sample space ratios with academic precision for NEB and international research."
      icon={Dices}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white border border-[#DADCE0] rounded-lg shadow-sm">
            <div className="space-y-2">
              <label className={labelCls}>Favorable Outcomes ($n$)</label>
              <input type="number" value={favorable} onChange={e => setFavorable(Number(e.target.value))} min={0} className={inputCls} />
              <p className="text-[10px] text-[#70757A] font-medium italic">Number of ways the desired event can occur.</p>
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Total Sample Space ($N$)</label>
              <input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} min={1} className={inputCls} />
              <p className="text-[10px] text-[#70757A] font-medium italic">Total number of possible outcomes.</p>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#F1F3F4]">
            <label className="text-[10px] font-black uppercase text-[#70757A] tracking-[0.2em]">Institutional Presets</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SCENARIOS.map(s => (
                <button key={s.label} onClick={() => { setFavorable(s.f); setTotal(s.t); }}
                  className="p-4 border border-[#DADCE0] rounded-2xl bg-white hover:bg-[#E8F0FE] hover:border-[#1A73E8] text-left flex flex-col justify-between items-start transition-all shadow-sm group">
                  <span className="text-[10px] font-black text-[#202124] mb-2 uppercase tracking-tight group-hover:text-[#1A73E8]">{s.label}</span>
                  <span className="text-xs font-black text-[#1A73E8] bg-[#E8F0FE] px-3 py-1 rounded-full">{s.f} in {s.t}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl flex items-start gap-4 shadow-inner">
             <Binary className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <div>
                <div className="text-[10px] font-black uppercase text-[#70757A] mb-1 tracking-widest">Theoretical Axiom</div>
                <code className="text-sm font-mono text-[#1A73E8] font-black">{'$P(A) = \\frac{n(A)}{n(S)}$'}</code>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-12 bg-white border border-[#DADCE0] rounded-lg text-center relative overflow-hidden shadow-sm group">
            <Dices className="absolute -left-6 -bottom-6 w-40 h-40 text-[#DADCE0]/20 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#1A73E8] mb-6">Success Probability</div>
              <div className="text-8xl lg:text-9xl font-black tracking-tighter text-[#202124] font-mono mb-6">{res.pct}</div>
              <div className="inline-block px-8 py-3 bg-[#E8F0FE] text-[#1A73E8] rounded-full text-xs font-black border border-[#1A73E8]/10 shadow-sm">
                  {res.ratio} Ratio Representation
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Decimal',    val: res.prob, desc: '$0 \le P \le 1$' },
              { label: 'Odds',       val: res.odds, desc: 'Success:Failure' },
              { label: 'Complement', val: res.complement, desc: '$1 - P(A)$' },
            ].map(({ label, val, desc }) => (
              <div key={label} className="p-6 bg-white border border-[#DADCE0] rounded-lg text-center shadow-md group hover:border-[#1A73E8] transition-colors">
                <div className="text-[9px] font-black uppercase text-[#70757A] tracking-widest mb-2 group-hover:text-[#1A73E8]">{label}</div>
                <div className="text-2xl font-black text-[#202124] font-mono">{val}</div>
                <div className="text-[8px] font-bold text-[#70757A] mt-1 opacity-60 uppercase">{desc}</div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-white border border-[#DADCE0] rounded-lg space-y-4 shadow-sm">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-[#1A73E8]">Likelihood of Event ($P$)</span>
              <span className="text-[#D93025]">Inverse Probability ($Q$)</span>
            </div>
            <div className="h-6 flex rounded-full overflow-hidden w-full bg-[#F1F3F4] border border-[#DADCE0] p-1">
              <div className="bg-gradient-to-r from-[#4285F4] to-[#1A73E8] rounded-full transition-all duration-1000 ease-out shadow-sm" style={{ width: res.pct }} />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1A73E8]" />
                    <span className="text-xs font-black text-[#202124]">{res.pct}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#D93025]">{res.complement}</span>
                    <div className="w-3 h-3 rounded-full bg-[#D93025]" />
                </div>
            </div>
          </div>

          <div className="p-5 bg-[#E8F0FE] border border-[#C5D9F7] rounded-2xl flex items-center gap-4 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#1A73E8]" />
                <p className="text-[11px] text-[#202124] leading-relaxed font-medium">Verified by frequentist mathematical axioms. All calculations assume independent event variables within a finite sample space.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          {/* Section 1: The Philosophy of Chance */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <History className="w-64 h-64" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#E8F0FE] p-4 rounded-2xl">
                  <Landmark className="w-8 h-8 text-[#1A73E8]" />
              </div>
              <h2 className="text-4xl font-black text-[#202124] tracking-tighter">The Sentinel of Certainty: Deciphering Probability</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                Probability is the branch of mathematics that serves as the bridge between raw uncertainty and predictable intelligence. Originating from the studies of games of chance in 17th-century Europe by mathematicians like Pascal and Fermat, probability has evolved into the cornerstone of modern science, finance, and engineering. It is the mathematical quantification of the likelihood that an event will occur, bounded strictly between the values of 0 (absolute impossibility) and 1 (absolute certainty).
              </p>
              <p>
                In the academic landscape of Nepal, probability is a mandatory pillar of the <a href="https://neb.gov.np" className="text-[#1A73E8] font-bold hover:underline">National Examination Board (NEB)</a> curriculum. From the introduction of sample spaces in Grade 8 to the complex conditional and Bayesian theorems in Grade 12, probability is the gatekeeper of logical reasoning. Our <strong>Institutional Probability Calculator</strong> is designed to meet these academic standards, providing a source of truth for students in <strong>Kathmandu</strong>, <strong>Lalitpur</strong>, and <strong>Bhaktapur</strong> who require high-precision verification for their algebraic proofs.
              </p>
              <p>
                Whether you are analyzing the risk of a monsoon-related event in the <strong>Terai region</strong> or calculating the success rate of a startup in the emerging <strong>Nepal IT sector</strong>, the fundamental ratio of favorable outcomes to the total sample space remains the universal standard for decision-making.
              </p>
            </div>
          </section>

          {/* Section 2: Sample Space & Events */}
          <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#E6F4EA] p-4 rounded-2xl">
                  <Microscope className="w-8 h-8 text-[#188038]" />
              </div>
              <h2 className="text-4xl font-black text-[#202124] tracking-tighter">The Anatomy of a Random Experiment</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
              <div className="space-y-6">
                <div className="group">
                    <h3 className="text-2xl font-black text-[#202124] border-l-4 border-[#1A73E8] pl-5 mb-4">1. The Sample Space ($S$)</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        The Sample Space is the set of all possible outcomes of a random experiment. In a standard 52-card deck, the sample space $n(S) = 52$. In a fair coin flip, $n(S) = 2$. Defining the sample space correctly is the most critical step in probability calculation; a misidentified sample space leads to flawed statistical conclusions.
                    </p>
                </div>
                <div className="group">
                    <h3 className="text-2xl font-black text-[#202124] border-l-4 border-[#188038] pl-5 mb-4">2. The Favorable Event ($E$)</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        An event is a subset of the sample space. If you want to calculate the probability of drawing a 'Spade' from a deck, your favorable outcomes $n(E) = 13$. The probability is then the ratio of $n(E)$ to $n(S)$, resulting in $13/52 = 0.25$ or 25%.
                    </p>
                </div>
              </div>
              <div className="bg-white p-10 rounded-lg shadow-inner border border-[#DADCE0] space-y-6">
                    <h4 className="text-lg font-black text-[#202124]">Axioms of Probability</h4>
                    <ul className="space-y-4 text-[#5F6368]">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#1A73E8]" />
                            <span><strong>Non-Negativity:</strong> $P(A) \ge 0$ for any event $A$.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#188038]" />
                            <span><strong>Normalization:</strong> $P(S) = 1$ (Certainty).</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#D93025]" />
                            <span><strong>Additivity:</strong> For mutually exclusive events, $P(A \cup B) = P(A) + P(B)$.</span>
                        </li>
                    </ul>
                </div>
            </div>
          </section>

          {/* Section 3: Applications in Nepal */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#FEF7E0] p-4 rounded-2xl">
                  <GraduationCap className="w-8 h-8 text-[#F29900]" />
              </div>
              <h2 className="text-3xl font-black text-[#202124] tracking-tighter">Institutional Alignment: NEB & Lok Sewa Standards</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                In the Nepalese education system, probability is more than just a chapter in a textbook; it is a critical component of the <strong>Aptitude Test</strong> for the <strong>Lok Sewa Aayog</strong> (Public Service Commission). Candidates seeking positions as Section Officers or Subba are frequently tested on their ability to solve complex probability puzzles involving cards, balls in a bag, and the probability of intersecting events ($P(A \cap B)$).
              </p>
              <p>
                At the university level, specifically at <strong>Tribhuvan University (TU)</strong> and <strong>Kathmandu University (KU)</strong>, probability theory is the bedrock of <strong>Engineering Mathematics</strong> and <strong>Management Science</strong>. Students utilize probability for "Queueing Theory" in traffic management in Kathmandu and "Reliability Engineering" for hydropower projects across the country.
              </p>
              <p>
                Our tool ensures that students can verify their results using the same algorithmic precision required by these high-stakes institutions. By supporting multiple output formats (Decimal, Percentage, and Odds), we cater to both the academic researcher and the professional risk analyst.
              </p>
            </div>
          </section>

          {/* Section 4: Real-World Scenarios */}
          <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-[#202124] rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 opacity-10">
                <TrendingUp className="w-64 h-64" />
            </div>
            <h2 className="text-4xl font-black mb-10 border-b border-[#dadce0] pb-6 tracking-tighter">Industrial Topology & Practical Utility</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
                    <div className="flex gap-4">
                        <div className="w-1 bg-[#1A73E8] shrink-0" />
                        <p>
                            <strong>Insurance & Risk:</strong> Insurance companies in Nepal use probability to set premiums for vehicle and health insurance. By analyzing the frequency of past accidents (favorable outcomes) against the total number of insured vehicles (sample space), they determine the "Risk Factor" for different regions.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1 bg-[#188038] shrink-0" />
                        <p>
                            <strong>Agriculture (Terai Region):</strong> Farmers and agronomists utilize probability to determine the likelihood of rainfall during the planting season. This data, often sourced from the <strong>Department of Hydrology and Meteorology</strong>, helps in selecting the optimal time for seed dispersal.
                        </p>
                    </div>
                </div>
                <div className="bg-white/10 p-8 rounded-lg border border-white/20 backdrop-blur-md">
                    <h4 className="text-[#202124] font-black mb-4 flex items-center gap-2">
                         <Target className="w-5 h-5 text-[#8AB4F8]" />
                         Goal Benchmarks
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed mb-4">
                        Probability is a dimensionless ratio. Our engine converts this into actionable intelligence.
                    </p>
                    <div className="space-y-3">
                         <div className="flex justify-between text-[10px] font-black uppercase text-[#8AB4F8]">
                             <span>Success Threshold</span>
                             <span>Result</span>
                         </div>
                         <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#dadce0] flex justify-between items-center">
                             <span className="text-[10px] font-bold text-[#202124] uppercase">Coin Flip</span>
                             <span className="text-xs font-mono font-black text-[#8AB4F8]">50.00%</span>
                         </div>
                         <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#dadce0] flex justify-between items-center">
                             <span className="text-[10px] font-bold text-[#202124] uppercase">Dice Roll (Single)</span>
                             <span className="text-xs font-mono font-black text-[#8AB4F8]">16.67%</span>
                         </div>
                         <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#dadce0] flex justify-between items-center">
                             <span className="text-[10px] font-bold text-[#202124] uppercase">Ace from Deck</span>
                             <span className="text-xs font-mono font-black text-[#8AB4F8]">7.69%</span>
                         </div>
                    </div>
                </div>
            </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Establish the Sample Space ($N$): Identify the total number of possible outcomes for your experiment (e.g., 52 for a deck of cards).",
          "Identify Favorable Events ($n$): Count the number of specific outcomes you are interested in (e.g., 4 if you are looking for Aces).",
          "Data Entry: Input these variables into the primary calculation matrix. Our engine instantly processes the ratio.",
          "Review Probability Matrix: Analyze the percentage and decimal outputs. A result of 100% indicates absolute certainty.",
          "Check Odds & Complement: Consult the secondary cards to see the betting odds (Success:Failure) and the probability of the event NOT occurring."
        ]
      }}
      formula={{
        title: "Theoretical Probability Identity",
        description: "The following LaTeX identities represent the algorithmic foundations of our institutional-grade probability engine.",
        raw: "$$\\begin{aligned} \\text{Probability P(E): } & \\frac{n(E)}{n(S)} \\\\ \\text{Complement P(E'): } & 1 - P(E) \\\\ \\text{Odds for Event: } & n(E) : (n(S) - n(E)) \\\\ \\text{Percentage: } & P(E) \\times 100 \\end{aligned}$$"
      }}
      faqs={[
        {
          question: "What is the difference between probability and odds?",
          answer: "Probability is the ratio of favorable outcomes to the TOTAL outcomes. Odds are the ratio of favorable outcomes to UNFAVORABLE outcomes. For example, if you have 1 chance in 10, the probability is 1/10 (10%), but the odds are 1:9."
        },
        {
          question: "Can a probability ever be greater than 1 or 100%?",
          answer: "No. By definition, a probability is a part of a whole. It cannot exceed the total sample space. A probability of 1 (100%) means the event is certain to happen."
        },
        {
          question: "What is the 'Complement' of a probability?",
          answer: "The complement is the probability that the event will NOT occur. It is calculated by subtracting the success probability from 1 (or 100%). If there is a 20% chance of rain, the complement is an 80% chance of no rain."
        },
        {
          question: "How does this tool help with NEB Grade 12 Math?",
          answer: "NEB students often have to solve probability problems involving permutations and combinations. This tool helps by providing a final 'Source of Truth' for the basic ratios, allowing students to verify their complex algebraic workings."
        },
        {
          question: "What is an 'Independent Event'?",
          answer: "An independent event is one where the outcome does not affect the next event. For example, if you flip a coin, the result (Heads or Tails) does not change the probability of the next flip. Each flip remains 50/50."
        },
        {
          question: "What is 'Conditional Probability'?",
          answer: "Conditional probability is the likelihood of an event occurring given that another event has already occurred. This tool calculates 'Simple Probability'. For conditional calculations ($P(A|B)$), you must adjust the sample space according to the condition."
        },
        {
          question: "How is probability used in the Nepal Stock Exchange (NEPSE)?",
          answer: "Analysts use historic data to calculate the probability of a stock reaching a certain price target. While not a guarantee, it helps in 'Risk Management' and setting 'Stop-Loss' orders."
        },
        {
          question: "What does 'Mutually Exclusive' mean in probability?",
          answer: "Two events are mutually exclusive if they cannot happen at the same time. For example, you cannot roll a 1 AND a 6 on a single die at the same time."
        },
        {
          question: "Why is the sample space so important?",
          answer: "The sample space is the denominator of your probability fraction. If you miscalculate the total possibilities (e.g., forgetting the Joker in a deck of cards), your entire probability will be mathematically incorrect."
        },
        {
          question: "What is the 'Law of Large Numbers'?",
          answer: "This law states that as you repeat an experiment many times (like flipping a coin 1,000 times), the actual frequency of outcomes will get closer and closer to the theoretical probability (50%)."
        },
        {
          question: "How do I use this for 'Draws without Replacement'?",
          answer: "If you draw a card and DON'T put it back, the sample space changes for the next draw. For the first draw, use 52 as the total. for the second, use 51. Our calculator is perfect for calculating each individual step."
        },
        {
          question: "Can I use this for sports betting?",
          answer: "While this gives you the pure 'Mathematical Odds', bookmakers usually add a 'Margin' (Vigorish). Their odds will always be lower than the mathematical truth provided by this tool."
        }
      ]}
      sidebar={{
        title: "Institutional Resources",
        links: [
          { label: "Z-Score Calculator", href: "/calculator/z-score/" },
          { label: "Standard Deviation", href: "/calculator/standard-deviation/" },
          { label: "NEB Math Portal", href: "https://neb.gov.np" },
          { label: "NSO Nepal", href: "https://cbs.gov.np" },
          { label: "Statistics Plus", href: "/calculator/statistics-plus/" },
        ],
        banner: {
          title: "Academic Excellence",
          description: "Providing the gold standard for mathematical tools in the Nepalese educational ecosystem.",
          image: "/images/math-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Z-Score Tool", href: "/calculator/z-score/" },
        { label: "Standard Deviation", href: "/calculator/standard-deviation/" },
        { label: "Statistics Plus", href: "/calculator/statistics-plus/" },
        { label: "Ratio Calculator", href: "/calculator/ratio-proportion/" }
      ]}
    />
  );
}
