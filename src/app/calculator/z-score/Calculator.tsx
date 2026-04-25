'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Sigma, Activity, Target } from 'lucide-react';

export default function ZScoreCalc() {
  const [x, setX]         = useState(85);
  const [mu, setMu]       = useState(70);
  const [sigma, setSigma] = useState(10);

  const z = useMemo(() => sigma === 0 ? 0 : (x - mu) / sigma, [x, mu, sigma]);

  const interpretation =
    Math.abs(z) < 1  ? 'Within ±1σ (69% of distribution)' :
    Math.abs(z) < 2  ? 'Within ±2σ (95% of distribution)' :
    Math.abs(z) < 3  ? 'Within ±3σ (99.7% of distribution)' :
    'Outlier (>±3σ from mean)';

  const inputCls = "w-full h-12 px-4 border border-slate-300 rounded-lg bg-white font-mono font-bold text-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm";

  return (
    <CalculatorErrorBoundary calculatorName="Z-Score">
      <ModernCalcLayout
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
                { label: 'Difference',     val: (x - mu).toFixed(2) },
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
        howToUse={{
          steps: [
            "Enter your raw value (x) — this is the specific number you want to analyze.",
            "Enter the population mean (μ) — the average value of the entire group.",
            "Enter the standard deviation (σ) — the measure of spread in the dataset.",
            "The calculator will instantly solve for 'z' and show you where the value sits on a standard normal distribution curve."
          ]
        }}
        faqs={[
          {
            question: "What is a Z-Score?",
            answer: "A Z-score (or standard score) indicates how many standard deviations a data point is from the mean. A score of 0 means the value is exactly at the mean, while +1 means it is one standard deviation above the mean."
          },
          {
            question: "Why use Z-scores instead of raw values?",
            answer: "Z-scores allow you to compare data points from different datasets. For example, you can use Z-scores to compare a student's performance in Math vs. English, even if the exams had different difficulty levels and grading scales."
          }
        ]}
        seoContent={
          <div>
            <h2>Gaussian Analysis Laboratory</h2>
            <p>
              In <strong>statistical analysis</strong>, comparing data from different distributions requires a common scale. The Z-score is the primary tool for this normalization. 
              Our analysis laboratory allows researchers in Nepal to quickly determine the relative standing of any observation. By converting raw data into <strong>standardized scores</strong>, 
              you can accurately assess outliers, calculate percentiles, and perform rigorous hypothesis testing with absolute mathematical certainty.
            </p>

            <h2>Understanding Z-Scores</h2>
            <p>A Z-score tells you how far a value is from the average. If a Z-score is 1, it's 1 standard deviation above the average. If it's -2, it's 2 standard deviations below the average.</p>
            
            <h3>Real-World Applications</h3>
            <p>Z-scores are used in everything from banking (predicting defaults) to academia (standardizing test scores). In Nepal, they are frequently used in scientific research and economic data analysis to normalize varying data sets.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
