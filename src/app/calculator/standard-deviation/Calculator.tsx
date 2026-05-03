'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Sigma } from 'lucide-react';

export default function StandardDeviationCalculator() {
  const [input, setInput] = useState('10, 20, 30, 40, 50');

  const r = useMemo(() => {
    const numbers = input.split(/[,\s\n]+/).map(Number).filter(n => !isNaN(n));
    if (numbers.length < 2) return null;
    const mean    = numbers.reduce((a,b) => a+b, 0) / numbers.length;
    const variance = numbers.reduce((a,b) => a + Math.pow(b-mean, 2), 0) / (numbers.length-1);
    const sd       = Math.sqrt(variance);
    return { mean, variance, sd, count: numbers.length, min: Math.min(...numbers), max: Math.max(...numbers), numbers };
  }, [input]);

  return (
    <CalculatorErrorBoundary calculatorName="Standard Deviation">
      <ModernCalcLayout hideH1={false}
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Standard Deviation' }]}
        title="Standard Deviation Calculator"
        description="Calculate the sample standard deviation, variance, mean, and range for any dataset. Useful for statistics, quality control, and data analysis."
        icon={Sigma}
        inputs={
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-800">Enter Numbers</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                className="w-full h-40 p-4 rounded-xl border border-slate-300 bg-white font-mono text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none shadow-sm transition-all"
                placeholder="e.g. 10, 20, 30, 40, 50 (comma or space separated)" />
              <p className="text-xs text-slate-500">Values can be separated by commas, spaces, or new lines.</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Datasets</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Balanced set', data: '10, 20, 30, 40, 50' },
                  { label: 'High spread',  data: '1, 5, 10, 50, 100, 200' },
                  { label: 'Low spread',   data: '98, 99, 100, 101, 102' },
                  { label: 'Exam scores',  data: '65, 72, 78, 84, 90, 55, 88' },
                ].map(d => (
                  <button key={d.label} onClick={() => setInput(d.data)}
                    className="p-3 border border-slate-200 rounded-xl bg-slate-50 hover:border-blue-300 hover:bg-blue-50 text-left transition-all shadow-sm">
                    <span className="block text-sm font-bold text-slate-800 mb-1">{d.label}</span>
                    <span className="text-xs font-mono text-slate-500 truncate block">{d.data}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        }
        results={
          <div className="space-y-6">
            {r ? (
              <>
                <div className="p-8 bg-blue-600 rounded-2xl text-center shadow-lg text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <Sigma className="w-48 h-48 -mr-10 -mt-10" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">Standard Deviation (s)</div>
                    <div className="text-5xl sm:text-7xl font-black tracking-tighter font-mono mb-4">{r.sd.toFixed(4)}</div>
                    <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-bold border border-white/30">
                      Dataset Size: n = {r.count}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
                  {[
                    { label: 'Mean (x̄)',    val: r.mean.toFixed(4), desc: 'Average value' },
                    { label: 'Variance (s²)',    val: r.variance.toFixed(4), desc: 'Squared deviation' },
                    { label: 'Minimum',         val: r.min, desc: 'Lowest value' },
                    { label: 'Maximum',         val: r.max, desc: 'Highest value' },
                    { label: 'Range',       val: r.max - r.min, desc: 'Maximum minus Minimum' },
                  ].map(({ label, val, desc }) => (
                    <div key={label} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <div>
                        <span className="block text-sm font-bold text-slate-800">{label}</span>
                        <span className="block text-xs font-medium text-slate-500">{desc}</span>
                      </div>
                      <span className="text-xl font-black font-mono text-blue-600">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                   <Sigma className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                   <div>
                      <div className="text-xs font-bold uppercase text-slate-600 mb-1 tracking-wider">Formula Used (Sample)</div>
                      <code className="text-sm font-mono text-blue-600 font-bold">s = √[ Σ(x - x̄)² / (n - 1) ]</code>
                   </div>
                </div>
              </>
            ) : (
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-center font-bold">
                Please enter at least 2 numbers to calculate standard deviation.
              </div>
            )}
          </div>
        }
        sidebar={{
          title: "Related Math Tools",
          links: [
            { label: 'Z-Score Calculator', href: '/calculator/z-score' },
            { label: 'Percentage Calculator', href: '/calculator/percentage' },
            { label: 'Rounding Calculator', href: '/calculator/rounding' },
          ],
        }}
        details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Statistical Dispersion & Variance Analysis</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>
                  In data science and inferential statistics, calculating the mean (average) provides only half the picture. To truly understand a dataset, one must measure its dispersion, how tightly or loosely the individual data points cluster around the center. Our <strong className="text-[#202124]">standard deviation calculator</strong> is a high-precision analytical engine designed to quantify this exact variance, outputting crucial metrics required for quality control, financial risk assessment, and academic research.
                </p>
                <p>
                  A low standard deviation indicates that the data points are highly consistent and tightly bound to the mean. Conversely, a high standard deviation reveals extreme variability and data spread. For instance, in financial portfolios, a high standard deviation translates directly to higher market volatility and increased investment risk.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Sample vs. Population Mathematics</h3>
              <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
                <li><strong className="text-[#1A73E8]">Sample Standard Deviation (s):</strong> This calculator utilizes Bessel's Correction, dividing the squared variance by <code className="bg-[#F1F3F4] px-1 rounded">n - 1</code> rather than <code className="bg-[#F1F3F4] px-1 rounded">n</code>. This is the universal standard for experimental research, as it provides an unbiased statistical estimate when you only have access to a subset of data rather than the entire population.</li>
                <li><strong className="text-[#188038]">Variance (s²):</strong> Variance is the direct precursor to standard deviation. It represents the average of the squared mathematical differences from the Mean. Because variance is squared, it heavily penalizes extreme outliers in your dataset.</li>
                <li><strong className="text-[#D93025]">Dataset Range:</strong> The engine automatically isolates the absolute minimum and maximum floating-point values within your dataset, instantly outputting the total statistical spread.</li>
              </ul>
            </div>
          </div>
        }
        howToUse={{
          steps: [
            "Input your numerical dataset into the primary text matrix. You can use spaces, commas, or new lines to separate the numbers.",
            "The engine handles decimal points and negative numbers automatically.",
            "Review the primary output: The Sample Standard Deviation (s).",
            "Examine the detailed breakdown matrix to analyze the Dataset Mean (Average), total Variance, and minimum/maximum boundaries.",
            "Use the 'Quick Datasets' panel to inject pre-configured arrays to see how data clustering affects the final standard deviation."
          ]
        }}
        formula={{
          title: "Standard Deviation Formula",
          description: "Calculation for Sample Standard Deviation",
          raw: "Mean (x̄) = ( Σ xi ) / n\n\nSample Variance (s²) = Σ (xi - x̄)² / (n - 1)\n\nSample Standard Deviation (s) = √ s²\n\nWhere:\nΣ = Summation of all points\nxi = Each individual data point\nx̄ = The Mean average\nn = Total number of data points"
        }}
        faqs={[
          {
            question: "Why does the formula divide by (n - 1) instead of just 'n'?",
            answer: "Dividing by (n - 1) is known as Bessel's correction. In statistics, when you only have a sample of data (not the entire global population), dividing by 'n' consistently underestimates the true variance. Subtracting 1 artificially inflates the result to mathematically compensate for this bias."
          },
          {
            question: "What is the physical difference between Standard Deviation and Variance?",
            answer: "Variance is standard deviation squared. The problem with variance is that the units are also squared (e.g., if you are measuring meters, variance is in meters-squared). Standard deviation takes the square root, returning the metric back to the original unit (meters) so it is physically comprehensible."
          },
          {
            question: "How does an outlier impact the standard deviation?",
            answer: "Outliers massively impact standard deviation. Because the mathematical formula requires squaring the distance from the mean, an extreme outlier will exponentially increase the final variance and resulting standard deviation of the dataset."
          },
          {
            question: "What is the Empirical Rule (68-95-99.7)?",
            answer: "In a perfectly normal distribution (a bell curve), 68% of all data points will fall within one standard deviation of the mean. 95% will fall within two standard deviations, and 99.7% will fall within three standard deviations."
          },
          {
            question: "Can standard deviation ever be a negative number?",
            answer: "No. Standard deviation is an absolute measure of physical spread or distance. Because the internal formula requires squaring the numbers (which makes all negatives positive) and then taking the principal square root, the lowest possible result is exactly 0."
          },
          {
            question: "What does a standard deviation of 0 indicate?",
            answer: "A standard deviation of exactly zero means there is absolutely no statistical variance in the dataset. Every single number inputted is exactly the same (e.g., 5, 5, 5, 5, 5)."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}

