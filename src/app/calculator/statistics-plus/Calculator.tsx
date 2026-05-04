'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Calculator, BarChart4, TrendingUp, Search, Info, ShieldCheck, Microscope, History, GraduationCap, Landmark, Binary } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);
    return { mean, median, modes, range, min: sorted[0], max: sorted[sorted.length-1], count: nums.length, sum, sorted, counts, stdDev };
  }, [input]);

  return (
    <CalculatorErrorBoundary calculatorName="Statistics Plus">
      <ModernCalcLayout 
        slug="statistics-plus"
        crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Statistics Plus' }]}
        title="Statistics & Central Tendency Calculator"
        description="Calculate Mean, Median, Mode, Range, and Standard Deviation with precision. Aligned with NEB, CBS, and international research standards."
        icon={BarChart4}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Raw Data Matrix</label>
            <textarea 
              value={input} 
              onChange={e => setInput(e.target.value)}
              className="w-full h-40 p-4 border border-[#DADCE0] rounded-md bg-white text-sm font-mono text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all resize-none" 
              placeholder="e.g. 10, 20, 30, 20, 40"
            />
            <p className="text-[10px] text-[#70757A] font-bold uppercase tracking-tight">Separate values with commas, spaces, or newlines</p>
          </div>

          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4 space-y-3">
            <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-wider">Sample Datasets</span>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Normal Distribution',  data: '1, 2, 3, 4, 5, 4, 3, 2, 1' },
                { label: 'Unimodal (Skewed)',    data: '10, 20, 20, 30, 40, 50, 60' },
                { label: 'Bimodal Frequency',   data: '5, 10, 10, 20, 20, 30' },
                { label: 'SEE Exam Dataset',    data: '65, 72, 78, 84, 90, 55, 88, 72' },
              ].map(d => (
                <button key={d.label} onClick={() => setInput(d.data)}
                  className="p-3 border border-[#DADCE0] rounded bg-white hover:border-[#1A73E8] hover:bg-[#E8F0FE] text-left transition-all">
                  <span className="block text-[10px] font-black text-[#202124] uppercase tracking-tight">{d.label}</span>
                  <span className="text-[10px] font-mono text-[#1A73E8] truncate block">{d.data}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {stats ? (
            <>
              <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
                 <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Arithmetic Mean (Average)</div>
                 <div className="text-5xl font-black tracking-tighter text-[#1A73E8]">{stats.mean.toFixed(2)}</div>
                 <div className="text-[10px] font-bold text-[#70757A] uppercase">N = {stats.count} Observations</div>
              </div>

              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
                <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
                  <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-widest">Central Tendency Audit</span>
                </div>
                <div className="divide-y divide-[#DADCE0]">
                  <div className="p-4 flex justify-between text-xs">
                    <span className="text-[#5F6368] font-bold uppercase">Median</span>
                    <span className="font-black text-[#202124]">{stats.median}</span>
                  </div>
                  <div className="p-4 flex justify-between text-xs">
                    <span className="text-[#5F6368] font-bold uppercase">Mode(s)</span>
                    <span className="font-black text-[#188038]">{stats.modes.length > 4 ? `${stats.modes.length} Values (Multi)` : stats.modes.join(', ')}</span>
                  </div>
                  <div className="p-4 flex justify-between text-xs">
                    <span className="text-[#5F6368] font-bold uppercase">Range (Max−Min)</span>
                    <span className="font-black text-[#1A73E8]">{stats.range}</span>
                  </div>
                  <div className="p-4 flex justify-between text-xs">
                    <span className="text-[#5F6368] font-bold uppercase">Standard Deviation (σ)</span>
                    <span className="font-black text-[#F29900]">{stats.stdDev.toFixed(2)}</span>
                  </div>
                  <div className="p-4 flex justify-between text-xs">
                    <span className="text-[#5F6368] font-bold uppercase">Absolute Sum</span>
                    <span className="font-black">{stats.sum.toLocaleString()}</span>
                  </div>
                  <div className="p-4 flex justify-between text-xs">
                    <span className="text-[#5F6368] font-bold uppercase">Min / Max</span>
                    <span className="font-black">{stats.min} / {stats.max}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-center space-y-4">
               <Calculator className="w-10 h-10 text-[#DADCE0] mx-auto" />
               <p className="text-sm font-bold text-[#70757A] uppercase tracking-tight">Enter data to run audit</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          {stats && (
            <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-widest">Frequency Distribution Audit</span>
                <BarChart4 className="w-3.5 h-3.5 text-[#1A73E8]" />
              </div>
              <div className="p-4 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={Object.entries(stats.counts).map(([val, freq]) => ({ val, freq })).sort((a,b) => Number(a.val) - Number(b.val))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                    <XAxis dataKey="val" tick={{ fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                    <Bar dataKey="freq" fill="#1A73E8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Statistical Data Audit - content body */}
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Statistical Data Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for central tendency and dispersion analysis. Calibrated for <strong>NEB</strong>, <strong>TU</strong>, and <strong>National Statistics Office (NSO)</strong> research standards, this tool provides high-precision computation of Mean, Median, Mode, Range, and Standard Deviation. Designed for Nepal's academic and policy research ecosystem, it ensures mathematical certainty across survey data, census records, and examination result analysis.
             </p>
             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { title: 'Arithmetic Mean (μ)', desc: 'The center of gravity — sum divided by count. Sensitive to outliers.', color: 'border-[#1A73E8]' },
                 { title: 'Median (x̃)', desc: 'The robust middle. Sorts the data and finds the central position. Resistant to extreme values.', color: 'border-[#188038]' },
                 { title: 'Mode (Mo)', desc: 'The most frequent value. A dataset can be Unimodal, Bimodal, or Multimodal.', color: 'border-[#F29900]' },
               ].map(m => (
                 <div key={m.title} className={`bg-[#F8F9FA] border-t-4 ${m.color} rounded-lg p-5`}>
                   <h4 className="text-xs font-black text-[#202124] uppercase tracking-tight mb-2">{m.title}</h4>
                   <p className="text-[11px] text-[#5F6368] leading-relaxed">{m.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Dataset Entry: Enter your numeric observations into the primary matrix. You can use spaces, commas, or line breaks to delineate individual data points.",
          "Topological Preview: Observe the 'Sorted Data' block. Our engine automatically performs an ascending sort ($x_1 \\le x_2 \\le ... \\le x_n$) to verify the dataset's integrity.",
          "Tendency Analysis: Review the primary results matrix. The Mean provides the arithmetic center, while the Median identifies the robust middle point.",
          "Frequency Check: Analyze the 'Mode' card. If multiple values share the highest frequency, the engine will identify the dataset as Bimodal or Multimodal.",
          "Range Audit: Consult the lower topology matrix to see the absolute Minimum, Maximum, and the total Range (Δ) to understand the data spread.",
          "Error Validation: If non-numeric characters are entered, the engine will safely filter them out to preserve the integrity of the statistical analysis."
        ]
      }}
      formula={{
        title: "The Axioms of Central Tendency",
        description: "The following LaTeX identities represent the algorithmic foundations of our institutional-grade statistical engine.",
        raw: "$$\\begin{aligned} \\text{Mean (}\\mu\\text{): } & \\frac{1}{n} \\sum_{i=1}^{n} x_i \\\\ \\text{Median (}\\tilde{x}\\text{, odd): } & x_{(\\frac{n+1}{2})} \\\\ \\text{Median (}\\tilde{x}\\text{, even): } & \\frac{x_{(\\frac{n}{2})} + x_{(\\frac{n}{2}+1)}}{2} \\\\ \\text{Range: } & x_{max} - x_{min} \\\\ \\text{Mode: } & \\text{arg max}_{x} (f(x)) \\\\ \\text{Standard Deviation (}\\sigma\\text{): } & \\sqrt{\\frac{\\sum(x_i - \\mu)^2}{n}} \\end{aligned}$$"
      }}
      faqs={[
        {
          question: "Why does the Median change so much when the data is sorted?",
          answer: "The median is the absolute middle value of a dataset. To find it, you MUST arrange the numbers in order. In an unsorted list, the 'middle' number is just a random entry. Sorting reveals the true mathematical center. Our calculator performs this sort automatically for you."
        },
        {
          question: "What is the difference between a Sample Mean and a Population Mean?",
          answer: "In statistics, a Population Mean (μ) is the average of EVERY member of a group. A Sample Mean (x̄) is the average of a smaller subset. While the formula is the same, the 'n' (denominator) represents either the total population or the sample size. This tool is designed for discrete sample sets."
        },
        {
          question: "What happens if every number appears only once?",
          answer: "In a dataset where every value is unique, there is mathematically 'No Mode'. Many calculators mistakenly return all numbers as modes, but a mode requires a frequency higher than 1 to be statistically significant. Our tool correctly identifies unique sets as having no mode."
        },
        {
          question: "How do outliers affect the Mean versus the Median?",
          answer: "Outliers are extreme values (very high or very low). The Mean is 'Sensitive' because it includes the outlier in the sum. The Median is 'Resistant' or 'Robust' because it only looks at the middle position. If you add 1,000 to the set [1, 2, 3], the Mean jumps from 2 to 251, but the Median only moves from 2 to 2.5."
        },
        {
          question: "What is a 'Bimodal' dataset?",
          answer: "A bimodal dataset has two distinct peaks of frequency. For example, in the set [1, 2, 2, 3, 4, 4, 5], both 2 and 4 appear twice. This often suggests that the dataset is actually a combination of two different groups (e.g., heights of men and women combined into one list)."
        },
        {
          question: "How is 'Range' used in risk assessment?",
          answer: "The range measures the total spread of your data. A small range means the data is tightly clustered and predictable. A large range suggests high volatility and uncertainty. In the NEPSE, a large daily range indicates a high-risk trading day."
        },
        {
          question: "Can I use decimals and negative numbers in this calculator?",
          answer: "Yes. Our engine supports the full real number set ($R$), including floating-point decimals and negative integers. Statistics are often used for data like temperature (-5°C) or financial losses, and our tool handles these with 100% precision."
        },
        {
          question: "What is the 'Weighted Mean' and is it different?",
          answer: "A standard mean treats every value as equal. A weighted mean (like GPA) gives certain values more 'weight' than others. This calculator assumes equal weight for all data points. For weighted calculations, use our 'GPA Calculator' or 'Grade Calculator'."
        },
        {
          question: "Is 'Median' the same as 'Average'?",
          answer: "In common language, 'average' usually refers to the Mean. However, in statistics, 'average' is a broad term for any measure of central tendency, including the Mean, Median, and Mode. When someone says 'the average person,' they are often unknowingly referring to the Median."
        },
        {
          question: "How does this tool help with the NEB Math syllabus?",
          answer: "The NEB Grade 11 and 12 math curriculum requires students to solve grouped and ungrouped data problems. This tool provides the 'Source of Truth' for ungrouped data, helping students verify their step-by-step hand calculations for Mean and Median during homework and exam preparation."
        },
        {
          question: "What is 'Statistical Skewness'?",
          answer: "Skewness refers to the asymmetry of your data. If the Mean is greater than the Median, the data is 'Right Skewed' (long tail on the right). If the Median is greater than the Mean, it is 'Left Skewed'. This tool allows you to compare Mean and Median instantly to identify skewness."
        },
        {
          question: "Why do we use '$n$' and not '$n-1$' in the Mean formula?",
          answer: "For calculating the Mean, we always divide by the full count ($n$). The '$n-1$' adjustment (Bessel's Correction) is used when calculating the 'Sample Variance' or 'Sample Standard Deviation' to account for bias. For central tendency, $n$ is the absolute standard."
        },
        {
          question: "Can this tool handle extremely large datasets?",
          answer: "Yes. Our web-based engine can process thousands of data points without lag, leveraging the client's local processing power. This makes it ideal for researchers who need quick analysis without uploading sensitive data to a server."
        },
        {
          question: "How is 'Mode' useful in retail business?",
          answer: "Retailers use the mode to determine which product size or color is being purchased most frequently. This informs inventory management, ensuring that the most 'popular' items are always in stock in hubs like New Road or Butwal."
        },
        {
          question: "What is the relationship between Mean, Median, and Mode in a Normal Distribution?",
          answer: "In a perfectly symmetrical Normal Distribution (Bell Curve), the Mean, Median, and Mode are all exactly the same value. Any deviation between them indicates a skew in the population data."
        },
        {
          question: "Is there a limit to the number of Modes?",
          answer: "No. A dataset can be multimodal with any number of values sharing the peak frequency. Our engine will list all of them up to a reasonable display limit before indicating a multimodal state."
        },
        {
          question: "How do I calculate the 'Midrange'?",
          answer: "The midrange is the average of the minimum and maximum values: $(x_{min} + x_{max}) / 2$. While less robust than the Mean, it offers a quick snapshot of the data boundaries."
        },
        {
          question: "What is 'Kurtosis'?",
          answer: "Kurtosis measures the 'tailedness' or the sharpness of the peak of a distribution. While this tool focuses on central tendency, high kurtosis often indicates that a dataset has frequent extreme outliers."
        },
        {
          question: "Can I copy and paste data from Excel?",
          answer: "Yes. Our input engine is designed to recognize tab-separated values from Excel or Google Sheets. Simply paste your column or row directly into the data matrix for instant analysis."
        },
        {
          question: "Who developed this statistical suite?",
          answer: "This is part of the NepaCalc Institutional suite, designed to provide gold-standard mathematical tools for the Nepalese educational and professional STEM ecosystem, ensuring academic equity across the nation."
        }
      ]}
        sidebar={{
          title: "Institutional Resources",
          links: [
            { label: "Standard Deviation", href: "/calculator/standard-deviation" },
            { label: "Z-Score Calculator", href: "/calculator/z-score" },
            { label: "NSO Nepal (Census Data)", href: "https://cbs.gov.np" },
            { label: "NEB Mathematics Guide", href: "https://neb.gov.np" },
            { label: "GPA Calculator", href: "/calculator/gpa" },
          ],
          banner: {
            title: "Data Intelligence",
            description: "Empowering Nepal's researchers and students with high-precision statistical tools.",
            image: "/images/math-banner.jpg"
          }
        }}
        relatedTools={[
          { label: "Standard Deviation", href: "/calculator/standard-deviation" },
          { label: "Z-Score Tool", href: "/calculator/z-score" },
          { label: "GPA Calculator", href: "/calculator/gpa" },
          { label: "Percentage Calc", href: "/calculator/percentage" }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}
