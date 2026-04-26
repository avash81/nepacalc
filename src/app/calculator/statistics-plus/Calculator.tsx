'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Calculator } from 'lucide-react';

export default function StatisticsPlus() {
  const [input, setInput] = useState('10, 25, 30, 45, 30, 15, 20, 30');

  const stats = useMemo(() => {
    const nums = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length === 0) return null;
    const sorted = [...nums].sort((a, b) => a - b);
    const sum    = nums.reduce((a, b) => a + b, 0);
    const mean   = sum / nums.length;
    const mid    = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid-1] + sorted[mid]) / 2;
    const counts: Record<number,number> = {};
    let maxFreq = 0;
    nums.forEach(n => { counts[n] = (counts[n]||0)+1; if (counts[n] > maxFreq) maxFreq = counts[n]; });
    const modes = Object.keys(counts).filter(k => counts[Number(k)] === maxFreq).map(Number);
    const range  = sorted[sorted.length-1] - sorted[0];
    return { mean, median, modes, range, min: sorted[0], max: sorted[sorted.length-1], count: nums.length, sum, sorted };
  }, [input]);

  return (
    <CalculatorErrorBoundary calculatorName="Statistics Plus">
      <ModernCalcLayout hideH1={true}
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Statistics Calculator' }]}
        title="Mean, Median & Mode Calculator"
        description="Analyze any dataset for central tendency. Calculate mean, median, mode, and range instantly with sorted data view."
        icon={Calculator}
        inputs={
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-800">Enter Dataset</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                className="w-full h-40 p-4 rounded-xl border border-slate-300 bg-white font-mono text-sm font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none shadow-sm transition-all"
                placeholder="e.g. 10, 20, 30, 20, 40 (comma or space separated)" />
              <p className="text-xs text-slate-500">Values can be separated by commas, spaces, or new lines.</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Try an Example</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Symmetric set',  data: '1, 2, 3, 4, 5' },
                  { label: 'Single mode',    data: '10, 20, 20, 30' },
                  { label: 'Bimodal',        data: '5, 10, 10, 20, 20, 30' },
                  { label: 'Exam scores',    data: '65, 72, 78, 84, 90, 55, 88, 72' },
                ].map(d => (
                  <button key={d.label} onClick={() => setInput(d.data)}
                    className="p-3 border border-slate-200 rounded-xl bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50 text-left transition-all shadow-sm">
                    <span className="block text-sm font-bold text-slate-800 mb-1">{d.label}</span>
                    <span className="text-xs font-mono text-slate-500 truncate block">{d.data}</span>
                  </button>
                ))}
              </div>
            </div>

            {stats && (
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-3">Sorted Data</div>
                <div className="flex flex-wrap gap-2">
                  {stats.sorted.slice(0, 15).map((n, i) => (
                    <span key={i} className="bg-white border border-indigo-200 px-2.5 py-1 rounded-md text-xs font-mono font-bold text-indigo-700 shadow-sm">{n}</span>
                  ))}
                  {stats.sorted.length > 15 && <span className="text-xs font-bold text-indigo-500 self-center ml-1">…and {stats.sorted.length - 15} more</span>}
                </div>
              </div>
            )}
          </div>
        }
        results={
          <div className="space-y-6">
            {stats ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Mean',   val: stats.mean.toFixed(2), bg: 'bg-indigo-600', text: 'text-white' },
                    { label: 'Median', val: String(stats.median),  bg: 'bg-emerald-600', text: 'text-white' },
                    { label: 'Mode',   val: stats.modes.length > 2 ? 'Multi' : stats.modes.join(', '), bg: 'bg-amber-600', text: 'text-white' },
                  ].map(({ label, val, bg, text }) => (
                    <div key={label} className={`p-6 rounded-2xl shadow-md ${bg} ${text} text-center`}>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">{label}</div>
                      <div className="text-3xl lg:text-4xl font-black truncate" title={val}>{val}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
                  {[
                    { label: 'Range',        val: stats.range, desc: 'Difference between highest and lowest' },
                    { label: 'Minimum',          val: stats.min, desc: 'Lowest value in dataset' },
                    { label: 'Maximum',          val: stats.max, desc: 'Highest value in dataset' },
                    { label: 'Count (n)',    val: stats.count, desc: 'Total number of values' },
                    { label: 'Sum',          val: stats.sum, desc: 'All values added together' },
                  ].map(({ label, val, desc }) => (
                    <div key={label} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <div>
                        <span className="block text-sm font-bold text-slate-800">{label}</span>
                        <span className="block text-xs font-medium text-slate-500">{desc}</span>
                      </div>
                      <span className="text-xl font-black font-mono text-slate-700">{val}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-center font-bold">
                Please enter at least one number to calculate statistics.
              </div>
            )}
          </div>
        }
        sidebar={{
          title: "Related Math Tools",
          links: [
            { label: 'Standard Deviation', href: '/calculator/standard-deviation' },
            { label: 'Z-Score Calculator', href: '/calculator/z-score' },
            { label: 'Percentage Calculator', href: '/calculator/percentage' },
          ],
        }}
        details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Measures of Central Tendency & Data Topology</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>
                  Descriptive statistics form the backbone of modern data science, allowing researchers to compress massive datasets into singular, comprehensible metrics. Our <strong className="text-[#202124]">central tendency calculator</strong> acts as a primary diagnostic tool, instantly deriving the Mean, Median, Mode, and Range to reveal the true 'center' and spread of any statistical distribution.
                </p>
                <p>
                  While the Mean (average) is the most universally recognized metric, it is notoriously fragile when exposed to extreme outliers. For asymmetrical data distributions (such as wealth inequality or housing prices), the mathematical Median provides a far more robust anchor. Our engine computes these contrasting metrics simultaneously, empowering analysts to detect underlying skewness in their data.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Analysis of Statistical Metrics</h3>
              <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
                <li><strong className="text-[#1A73E8]">The Mean (Arithmetic Average):</strong> Calculated by dividing the sum of all values by the total count. It represents the perfect center of gravity for the dataset but is easily distorted by anomalies.</li>
                <li><strong className="text-[#188038]">The Median (Absolute Middle):</strong> The engine automatically sorts the data from lowest to highest and extracts the exact middle value. Because it relies on positional rank rather than magnitude, it ignores extreme outliers entirely.</li>
                <li><strong className="text-[#D93025]">The Mode (Highest Frequency):</strong> The value that appears most often. Unlike Mean and Median, the Mode is uniquely capable of analyzing categorical, non-numerical data (e.g., determining the most popular shoe size sold in a retail store).</li>
              </ul>
            </div>
          </div>
        }
        howToUse={{
          steps: [
            "Paste your raw data string into the primary matrix. The parser accepts spaces, commas, or line breaks as valid separators.",
            "The engine will automatically strip non-numeric characters and sort your data chronologically.",
            "Review the primary output panels for the Mean, Median, and Mode.",
            "Check the 'Sorted Data' preview block to visually verify the mathematical order and detect clustering.",
            "Utilize the lower matrix to analyze total variance (Range), dataset boundaries (Min/Max), and the absolute summation."
          ]
        }}
        formula={{
          title: "Descriptive Statistical Algorithms",
          description: "The mathematical procedures utilized to define dataset topology.",
          raw: "Mean (μ or x̄) = ( Σ xi ) / n\n\nMedian (Odd n) = Value at position (n + 1) / 2\nMedian (Even n) = Average of values at (n/2) and (n/2 + 1)\n\nMode = The value(s) with the highest frequency count.\n\nRange = Maximum Value − Minimum Value"
        }}
        faqs={[
          {
            question: "Why is the Median often preferred over the Mean for income data?",
            answer: "The Mean is highly susceptible to extreme outliers. If nine people make $50,000 and one person makes $10,000,000, the Mean average becomes heavily skewed upward, misrepresenting the group. The Median simply looks at the middle person, ignoring the millionaire, providing a truer reflection of 'average' income."
          },
          {
            question: "What happens if a dataset has an even number of values?",
            answer: "To calculate the median of an even dataset, the engine locates the two absolute center values and averages them together. For example, in the set [2, 4, 6, 8], the median is the average of 4 and 6, which is 5."
          },
          {
            question: "Can a dataset have more than one Mode?",
            answer: "Yes. If two different numbers share the highest frequency (e.g., both 10 and 20 appear three times), the dataset is 'Bimodal'. If more than two numbers tie, it is 'Multimodal'. If every single number appears exactly once, there is no mode at all."
          },
          {
            question: "What exactly does the 'Range' tell me?",
            answer: "The Range is the simplest measure of statistical dispersion. By subtracting the absolute minimum value from the absolute maximum value, it tells you exactly how wide the entire dataset is from end to end."
          },
          {
            question: "Does the order I input the numbers matter?",
            answer: "No. Our computational engine automatically parses your input and re-sorts all numerical values in ascending order (lowest to highest) in the background before running the Median algorithms."
          },
          {
            question: "How does the engine handle negative numbers and decimals?",
            answer: "The engine uses robust floating-point parsing. Negative numbers and decimals are fully supported and will be sorted and calculated perfectly according to standard numerical logic."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}

