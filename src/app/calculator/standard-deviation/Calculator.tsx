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
      <ModernCalcLayout
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
                    { label: 'Range',       val: r.max - r.min, desc: 'Max - Min' },
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
        howToUse={{
          steps: [
            "Type or paste your data set into the text box.",
            "You can separate numbers using commas, spaces, or new lines. The calculator handles them all automatically.",
            "Ensure you enter at least two valid numbers.",
            "The calculator automatically computes the Sample Standard Deviation, Mean, Variance, and Range instantly."
          ]
        }}
        faqs={[
          {
            question: "Does this calculate Sample or Population standard deviation?",
            answer: "This calculator computes the Sample Standard Deviation (dividing by n-1 instead of n). This is the standard in most scientific and statistical applications because it provides an unbiased estimate of a population's variance based on a sample."
          },
          {
            question: "What does a high standard deviation mean?",
            answer: "A high standard deviation indicates that the numbers are spread out over a wider range from the mean (average). A low standard deviation means the numbers are tightly clustered closely around the mean."
          }
        ]}
        seoContent={
          <div>
            <h2>Understanding Standard Deviation</h2>
            <p>Standard deviation is a core concept in statistics that measures the amount of variation or dispersion within a set of values. While the average (mean) tells you where the center of the data is, the standard deviation tells you how spread out the data points are around that center.</p>
            
            <h3>Why is Standard Deviation Important?</h3>
            <p>If two classes take the same exam, they might both have an average score of 75%. However, in Class A, everyone scored between 70% and 80%. In Class B, scores ranged from 40% to 100%. Class A has a <em>low</em> standard deviation, indicating consistency. Class B has a <em>high</em> standard deviation, indicating extreme variability.</p>
            <p>Standard deviation is critical in fields like finance (measuring investment risk/volatility), manufacturing (quality control), and scientific research (determining error margins).</p>
            
            <h3>Sample vs. Population</h3>
            <ul>
              <li><strong>Population Standard Deviation (σ):</strong> Used when you have data for every single member of the entire population. You divide the sum of squared differences by <strong>n</strong>.</li>
              <li><strong>Sample Standard Deviation (s):</strong> Used when your data is just a subset (sample) of the whole population. You divide by <strong>(n - 1)</strong>. This calculator uses the sample formula, as it is the most common use case in practical statistics and provides an unbiased estimate.</li>
            </ul>
            
            <h3>The Calculation Steps</h3>
            <p>To calculate standard deviation manually, the formula follows these steps:</p>
            <ol>
              <li>Find the mean (average) of the dataset.</li>
              <li>For each number, subtract the mean and square the result (this is the squared difference).</li>
              <li>Calculate the sum of all those squared differences.</li>
              <li>Divide by (n - 1) to find the variance.</li>
              <li>Take the square root of the variance to get the final Standard Deviation.</li>
            </ol>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
