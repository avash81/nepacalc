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
      <ModernCalcLayout
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
        howToUse={{
          steps: [
            "Enter your dataset into the text area. You can separate numbers using commas, spaces, or new lines.",
            "The calculator automatically cleans your data, removing any non-numeric characters.",
            "It will immediately sort your data from lowest to highest, which is useful for finding the median.",
            "The results panel will instantly display the Mean, Median, Mode, Range, Min, Max, and Sum."
          ]
        }}
        faqs={[
          {
            question: "What is the difference between Mean, Median, and Mode?",
            answer: "The Mean is the traditional average (sum of all numbers divided by the count). The Median is the exact middle number when the data is sorted from lowest to highest (great for data with extreme outliers). The Mode is the number that appears most frequently in the dataset."
          },
          {
            question: "What happens if there are multiple modes?",
            answer: "If two or more numbers tie for the highest frequency, the dataset is considered bimodal or multimodal. Our calculator will display 'Multi' and list them if there are two, or indicate that there are multiple modes."
          }
        ]}
        seoContent={
          <div>
            <h2>Professional Analytical Suite</h2>
            <p>
              Descriptive statistics are the <strong>foundation of data interpretation</strong>, allowing us to summarize complex datasets into meaningful insights. 
              Our analytical suite provides a detailed snapshot of your data's characteristics. Whether you are a student in Nepal summarizing research findings 
              or a business analyst reviewing <strong>sales distributions</strong>, our engine computes the mean, median, mode, and range with absolute accuracy.
            </p>

            <h2>Understanding Central Tendency in Statistics</h2>
            <p>In statistics, measures of central tendency are used to describe the center or typical value of a dataset. The three most common measures are the Mean, Median, and Mode. While they all aim to find the 'center', they do so in different ways and are useful in different scenarios.</p>
            
            <h3>1. The Mean (Average)</h3>
            <p>The mean is calculated by adding all the numbers together and dividing by the total number of items. It is the most commonly used measure but has a critical flaw: it is highly sensitive to outliers. For example, if you are looking at average household income and a billionaire moves into the neighborhood, the mean income will skyrocket, even though most people's incomes stayed the same.</p>
            
            <h3>2. The Median (Middle)</h3>
            <p>The median is the exact middle value when a dataset is sorted from smallest to largest. If there is an even number of values, the median is the average of the two middle numbers. The median is incredibly robust against outliers. Using the previous example, the billionaire moving into the neighborhood would barely change the median income, making it a much better representation of the 'typical' household.</p>
            
            <h3>3. The Mode (Most Frequent)</h3>
            <p>The mode is simply the value that appears most often in the dataset. A dataset can have one mode, multiple modes (bimodal or multimodal), or no mode at all if every number appears only once. Mode is particularly useful for categorical data (e.g., finding the most common shoe size sold in a store).</p>
            
            <h3>What is Range?</h3>
            <p>The range is the simplest measure of dispersion (how spread out the data is). It is calculated by subtracting the lowest value (minimum) from the highest value (maximum). While easy to calculate, it only considers the two extreme ends of the dataset.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
