'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Sigma, Activity, Target } from 'lucide-react';

export default function ZScoreCalc() {
  const [x, setX]         = useState(85);
  const [mu, setMu]       = useState(70);
  const [sigma, setSigma] = useState(10);

  const z = useMemo(() => sigma === 0 ? 0 : (x, mu) / sigma, [x, mu, sigma]);

  const interpretation =
    Math.abs(z) < 1  ? 'Within ±1σ (69% of distribution)' :
    Math.abs(z) < 2  ? 'Within ±2σ (95% of distribution)' :
    Math.abs(z) < 3  ? 'Within ±3σ (99.7% of distribution)' :
    'Outlier (>±3σ from mean)';

  const inputCls = "w-full h-12 px-4 border border-slate-300 rounded-lg bg-white font-mono font-bold text-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm";

  return (
    <CalculatorErrorBoundary calculatorName="Z-Score">
      <ModernCalcLayout hideH1={false}
        crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Z-Score Calculator' }]}
        title="Z-Score Calculator"
        description="Calculate the standard score (Z-score) of any raw value in a normal distribution. Essential for statistics, probability analysis, and comparing different datasets."
        icon={Sigma}
        inputs={
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800">Raw Value (x)</label>
                <input type="number" value={x} onChange={e => setX(Number(e.target.value))} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800">Population Mean (μ)</label>
                  <input type="number" value={mu} onChange={e => setMu(Number(e.target.value))} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800">Std Deviation (σ)</label>
                  <input type="number" value={sigma} onChange={e => setSigma(Number(e.target.value))} min={0.001} className={inputCls} />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Industry Examples</label>
              <div className="space-y-2">
                {[
                  { label: 'Class exam (avg 70, σ=10)',    x: 85, μ: 70, σ: 10 },
                  { label: 'Height (avg 170cm, σ=8)',      x: 185, μ: 170, σ: 8 },
                  { label: 'IQ test (avg 100, σ=15)',      x: 130, μ: 100, σ: 15 },
                ].map(ex => (
                  <button key={ex.label} onClick={() => { setX(ex.x); setMu(ex.μ); setSigma(ex.σ); }}
                    className="w-full p-4 border border-slate-200 rounded-xl bg-white hover:bg-blue-50 hover:border-blue-300 text-left flex justify-between items-center transition-all shadow-sm group">
                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">{ex.label}</span>
                    <span className="text-xs font-mono text-slate-400 group-hover:text-blue-500">x={ex.x}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
               <Activity className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
               <div>
                  <div className="text-[11px] font-bold uppercase text-blue-800 mb-1 tracking-wider">Z-Score Formula</div>
                  <code className="text-sm font-mono text-blue-700 font-bold">z = (x − μ) / σ</code>
               </div>
            </div>
          </div>
        }
        results={
          <div className="space-y-6">
            <div className="p-10 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl text-center shadow-xl text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                <Target className="w-48 h-48 -mr-10 -mt-10" />
              </div>
              <div className="relative z-10">
                <div className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-3">Calculated Z-Score</div>
                <div className="text-7xl lg:text-8xl font-black tracking-tighter font-mono mb-4">{z.toFixed(4)}</div>
                <div className="inline-block px-5 py-2 bg-white/20 rounded-full text-sm font-bold border border-white/30 backdrop-blur-sm">
                  {z > 0 ? `${z.toFixed(2)}σ Above Mean` : `${Math.abs(z).toFixed(2)}σ Below Mean`}
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="text-[11px] font-bold uppercase text-slate-500 mb-2 tracking-widest">Statistical Interpretation</div>
              <p className="text-lg font-bold text-slate-800 leading-tight">{interpretation}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
              {[
                { label: 'Raw Value (x)',  val: x },
                { label: 'Mean (μ)',       val: mu },
                { label: 'Std Dev (σ)',    val: sigma },
                { label: 'Difference',     val: (x, mu).toFixed(2) },
              ].map(({ label, val }) => (
                <div key={label} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">{label}</span>
                  <span className="text-xl font-black font-mono text-slate-900">{val}</span>
                </div>
              ))}
            </div>
          </div>
        }
        sidebar={{
          title: "Related Analysis",
          links: [
            { label: 'Standard Deviation', href: '/calculator/standard-deviation' },
            { label: 'Probability Calculator', href: '/calculator/probability' },
            { label: 'Statistics Plus', href: '/calculator/statistics-plus' },
          ],
        }}
        details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Gaussian Normalization & Z-Score Analytics</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>
                  In advanced inferential statistics, comparing raw data points across divergent distributions is mathematically impossible without a unified scaling metric. Our <strong className="text-[#202124]">Z-Score Calculator</strong> acts as a primary Gaussian normalization engine, converting any raw observation into a standard score. This score explicitly defines the observation's exact distance from the population mean, measured in units of standard deviation.
                </p>
                <p>
                  This standardization process maps raw data onto the Standard Normal Distribution Curve (where μ = 0 and σ = 1). This is an essential procedure for risk analysts, biometric researchers, and psychometricians who must determine if a specific data point is statistically significant or merely an expected variation within the bounds of standard probability.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Analytical Framework Applications</h3>
              <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
                <li><strong className="text-[#1A73E8]">Comparative Metric Standardization:</strong> Z-scores allow analysts to compare "apples to oranges". For example, comparing a student's score on a highly difficult Physics exam to an easy English exam by analyzing their Z-scores relative to the class averages.</li>
                <li><strong className="text-[#188038]">Outlier Isolation & Detection:</strong> Any Z-score extending beyond ±3.0 indicates the raw value sits outside 99.7% of the normal distribution. These points are flagged as severe statistical anomalies requiring immediate investigation.</li>
                <li><strong className="text-[#D93025]">Probability & P-Value Derivation:</strong> Calculating the Z-score is the mandatory first step before utilizing a Z-table to determine the cumulative probability (p-value) of an event occurring in predictive modeling.</li>
              </ul>
            </div>
          </div>
        }
        howToUse={{
          steps: [
            "Input the Raw Value (x). This is the specific data point you want to test.",
            "Input the Population Mean (μ). This is the total average of the dataset you are comparing against.",
            "Input the Standard Deviation (σ). This represents the statistical spread of the baseline population.",
            "Review the generated Z-Score. A positive number means it is above the average; a negative number means it is below.",
            "Check the 'Statistical Interpretation' panel to instantly see what percentile band your data falls into based on the Empirical Rule."
          ]
        }}
        formula={{
          title: "Standard Score Logic",
          description: "The mathematical algorithm for dataset normalization.",
          raw: "z = (x − μ) / σ\n\nWhere:\nz = The resulting Standard Score\nx = The raw observation value\nμ = The Population Mean\nσ = The Population Standard Deviation"
        }}
        faqs={[
          {
            question: "What exactly does a Z-score of 0 mean?",
            answer: "A Z-score of exactly 0 means the raw data point is identical to the population mean. It sits perfectly dead-center on the normal distribution curve."
          },
          {
            question: "Why is a Z-score superior to just comparing raw percentages?",
            answer: "Raw percentages don't account for difficulty or variance. Scoring 80% on an incredibly hard exam where the class average is 40% (high Z-score) is vastly superior to scoring 90% on an easy exam where the class average is 95% (negative Z-score). Z-scores reveal true relative performance."
          },
          {
            question: "At what point is a Z-score considered an 'outlier'?",
            answer: "In standard statistical methodology, any Z-score greater than +3 or less than -3 is considered an extreme outlier. According to the Empirical Rule, 99.7% of all normal data should fall between -3 and +3."
          },
          {
            question: "Can standard deviation (σ) ever be zero in this formula?",
            answer: "No. If standard deviation is 0, it means all numbers in the population are exactly the same. Attempting to divide by a standard deviation of 0 will result in a mathematical 'undefined' error."
          },
          {
            question: "How do Z-scores relate to percentiles?",
            answer: "Z-scores map directly to percentiles via the standard normal distribution table. For example, a Z-score of +1.0 always corresponds to the 84th percentile, meaning the value is higher than 84% of the population."
          },
          {
            question: "What is the difference between a Z-score and a T-score?",
            answer: "Z-scores are used when you know the population standard deviation and have a large sample size (n > 30). T-scores are used for smaller sample sizes where the true population standard deviation is unknown."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}

