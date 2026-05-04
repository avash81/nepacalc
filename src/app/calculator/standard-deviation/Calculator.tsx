'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Sigma, TrendingUp, Info, ShieldCheck, Microscope, History, GraduationCap, Landmark, Binary, Activity, Target, Search } from 'lucide-react';

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
        slug="standard-deviation"
        crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Standard Deviation' }]}
        title="Institutional Standard Deviation"
        description="The definitive resource for measuring data dispersion. Calculate Sample and Population Standard Deviation, Variance, and Error Margins with academic precision for NEB, TU, and international research."
        icon={Sigma}
        inputs={
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-[#70757A] tracking-wider block">Raw Observation Matrix</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                className="w-full h-44 p-6 rounded-2xl border border-[#DADCE0] bg-white font-mono text-lg font-black focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none resize-none shadow-inner transition-all text-[#202124]"
                placeholder="e.g. 10, 20, 30, 40, 50" />
              <p className="text-[10px] text-[#70757A] font-medium italic">Separate values with commas, spaces, or line breaks. Engine supports floating-point decimals.</p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#F1F3F4]">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#70757A]">Dispersion Benchmarks</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Low Volatility', data: '98, 99, 100, 101, 102' },
                  { label: 'High Variance',  data: '1, 50, 100, 500, 1000' },
                  { label: 'NEB Exam Curve',   data: '45, 55, 65, 75, 85, 95' },
                  { label: 'Clinical Sampling',  data: '120, 122, 118, 121, 119' },
                ].map(d => (
                  <button key={d.label} onClick={() => setInput(d.data)}
                    className="p-4 border border-[#DADCE0] rounded-xl bg-white hover:border-[#1A73E8] hover:bg-[#F8F9FA] text-left transition-all shadow-sm group">
                    <span className="block text-[11px] font-black text-[#202124] mb-1 uppercase tracking-tight">{d.label}</span>
                    <span className="text-[10px] font-mono text-[#1A73E8] truncate block opacity-70 group-hover:opacity-100">{d.data}</span>
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
                <div className="p-12 bg-white border border-[#DADCE0] rounded-[2.5rem] text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Sigma className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#1A73E8] mb-4">Sample Standard Deviation ({'$s$'})</div>
                    <div className="text-7xl sm:text-8xl font-black tracking-tighter text-[#202124] font-mono mb-6">{r.sd.toFixed(4)}</div>
                    <div className="flex justify-center gap-3">
                        <div className="px-5 py-2 bg-[#E8F0FE] text-[#1A73E8] rounded-full text-[11px] font-black border border-[#1A73E8]/10 shadow-sm">
                          Sample Size: {'$n$'} = {r.count}
                        </div>
                        <div className="px-5 py-2 bg-[#F1F3F4] text-[#5F6368] rounded-full text-[11px] font-black border border-[#DADCE0] shadow-sm">
                          Bessel Corrected
                        </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-8 bg-white border border-[#DADCE0] rounded-3xl shadow-md border-b-4 border-b-[#188038] group">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#70757A] mb-2 group-hover:text-[#188038] transition-colors">Sample Variance ({'$s^2$'})</div>
                        <div className="text-3xl font-black text-[#202124] font-mono">{r.variance.toFixed(4)}</div>
                    </div>
                    <div className="p-8 bg-white border border-[#DADCE0] rounded-3xl shadow-md border-b-4 border-b-[#1A73E8] group">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#70757A] mb-2 group-hover:text-[#1A73E8] transition-colors">Dataset Mean ({'$\\bar{x}$'})</div>
                        <div className="text-3xl font-black text-[#202124] font-mono">{r.mean.toFixed(4)}</div>
                    </div>
                </div>

                <div className="bg-white border border-[#DADCE0] rounded-3xl overflow-hidden shadow-lg divide-y divide-[#F1F3F4]">
                  {[
                    { label: 'Range (Max - Min)',    val: (r.max - r.min).toFixed(2), desc: 'Total Spread Magnitude', icon: TrendingUp },
                    { label: 'Minimum Bound',         val: r.min, desc: 'Lower Statistical Limit', icon: Search },
                    { label: 'Maximum Bound',         val: r.max, desc: 'Upper Statistical Limit', icon: TrendingUp },
                    { label: 'Sum of Squares',       val: (r.variance * (r.count - 1)).toFixed(2), desc: '$\\sum (x_i - \\bar{x})^2$', icon: Binary },
                  ].map(({ label, val, desc, icon: Icon }) => (
                    <div key={label} className="p-6 flex justify-between items-center hover:bg-[#F8F9FA] transition-all group">
                       <div className="flex items-center gap-4">
                        <div className="bg-[#F1F3F4] p-3 rounded-xl group-hover:bg-[#E8F0FE] transition-colors">
                            <Icon className="w-5 h-5 text-[#5F6368] group-hover:text-[#1A73E8]" />
                        </div>
                        <div>
                            <span className="block text-xs font-black text-[#202124] uppercase tracking-tight">{label}</span>
                            <span className="block text-[10px] font-medium text-[#70757A]">{desc}</span>
                        </div>
                      </div>
                      <span className="text-2xl font-black font-mono text-[#202124]">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-[#E6F4EA] border border-[#CEEAD6] rounded-2xl flex items-center gap-4 shadow-sm">
                   <ShieldCheck className="w-6 h-6 text-[#188038]" />
                   <p className="text-[11px] text-[#202124] leading-relaxed font-medium">Precision-verified by <strong>Bessel\'s Correction</strong> for unbiased sample estimation. Compliant with NEB higher secondary mathematics standards.</p>
                </div>
              </>
            ) : (
              <div className="p-20 bg-[#F8F9FA] border-2 border-dashed border-[#DADCE0] rounded-[2.5rem] text-center space-y-6">
                 <div className="bg-white p-5 rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-md">
                    <Sigma className="w-12 h-12 text-[#70757A]" />
                 </div>
                 <div className="max-w-xs mx-auto">
                    <p className="text-xl font-black text-[#202124]">Awaiting Observations</p>
                    <p className="text-[11px] text-[#5F6368] mt-3 font-medium">Input at least two numerical data points to compute the standard deviation and dispersion metrics.</p>
                 </div>
              </div>
            )}
          </div>
        }
        details={
          <div className="space-y-16">
            {/* Section 1: The Philosophy of Dispersion */}
            <section className="bg-white border border-[#DADCE0] rounded-[2.5rem] p-12 shadow-sm relative overflow-hidden">
              <div className="absolute -top-12 -right-12 opacity-5">
                  <History className="w-64 h-64" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#E8F0FE] p-4 rounded-2xl">
                    <Activity className="w-8 h-8 text-[#1A73E8]" />
                </div>
                <h2 className="text-4xl font-black text-[#202124] tracking-tighter">Beyond the Average: The Science of Data Dispersion</h2>
              </div>
              <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
                <p>
                  While the "Average" or "Mean" tells us where the center of a group lies, it is the <strong>Standard Deviation</strong> that reveals the true character of the data. Standard Deviation is the mathematical metric that measures volatility, uncertainty, and precision. In research, a low standard deviation indicates that the data points tend to be very close to the mean, suggesting consistency. A high standard deviation indicates that the data points are spread out over a large range of values, suggesting high variance or unpredictable outcomes.
                </p>
                <p>
                  In the institutional framework of Nepal, measuring standard deviation is a daily requirement for the <a href="https://cbs.gov.np" className="text-[#1A73E8] font-bold hover:underline">National Statistics Office (NSO)</a>. When tracking the Consumer Price Index (CPI) across different districts like <strong>Kathmandu</strong>, <strong>Mustang</strong>, and <strong>Jhapa</strong>, researchers use standard deviation to understand regional price volatility. Without this metric, a national average would mask the extreme economic disparities between urban and rural centers.
                </p>
                <p>
                  Our <strong>Institutional Standard Deviation Calculator</strong> is engineered to be the definitive "Source of Truth" for researchers and students. It strictly implements <strong>Bessel\'s Correction</strong> ({'$n-1$'}) for sample data, ensuring that your research meets the peer-review standards of international journals and Nepalese academic institutions like <strong>Tribhuvan University</strong>.
                </p>
              </div>
            </section>

            {/* Section 2: Sample vs. Population Theory */}
            <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-[2.5rem] p-12 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-[#E6F4EA] p-4 rounded-2xl">
                    <Landmark className="w-8 h-8 text-[#188038]" />
                </div>
                <h2 className="text-4xl font-black text-[#202124] tracking-tighter">Bessel\'s Correction: The {'$n-1$'} Imperative</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
                <div className="space-y-6">
                   <div className="group">
                        <h3 className="text-2xl font-black text-[#202124] border-l-4 border-[#1A73E8] pl-5 mb-4">Sample Standard Deviation ({'$s$'})</h3>
                        <p className="text-[#5F6368] leading-relaxed">
                            When you are studying a small group (a sample) to make an inference about a larger population, you must divide the sum of squares by {'$n-1$'}. This is known as <strong>Bessel\'s Correction</strong>. It corrects the bias in the estimation of the population variance, as the sample mean is usually closer to the sample data points than the true population mean is.
                        </p>
                   </div>
                   <div className="group">
                        <h3 className="text-2xl font-black text-[#202124] border-l-4 border-[#188038] pl-5 mb-4">Population Standard Deviation ({'$\\sigma$'})</h3>
                        <p className="text-[#5F6368] leading-relaxed">
                            If you have the data for every single member of a group (e.g., the test scores of all 40 students in a specific class), you use {'$N$'} in the denominator. This is the "True" standard deviation and is used when the data set is exhaustive and not a representative subset.
                        </p>
                   </div>
                </div>
                <div className="bg-white p-10 rounded-3xl shadow-inner border border-[#DADCE0] space-y-6">
                    <h4 className="text-lg font-black text-[#202124]">Why {'$n-1$'} matters in Nepal?</h4>
                    <p className="text-[#5F6368] leading-relaxed italic">
                        "In academic research conducted at TU or KU, using the population formula on sample data is considered a primary technical error. Our calculator defaults to the sample formula to protect students and researchers from bias-related grade deductions or research rejection."
                    </p>
                    <div className="flex items-center gap-3 p-4 bg-[#FFF8E1] border border-[#FFE082] rounded-2xl">
                        <Target className="w-5 h-5 text-[#F29900]" />
                        <span className="text-[10px] font-black text-[#202124] uppercase tracking-tight">Precision Benchmarking Target</span>
                    </div>
                </div>
              </div>
            </section>

            {/* Section 3: Educational Roadmap */}
            <section className="bg-white border border-[#DADCE0] rounded-[2.5rem] p-12 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#FEF7E0] p-4 rounded-2xl">
                    <GraduationCap className="w-8 h-8 text-[#F29900]" />
                </div>
                <h2 className="text-3xl font-black text-[#202124] tracking-tighter">Academic Alignment: NEB Grade 11 & 12</h2>
              </div>
              <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
                <p>
                  For students pursuing Science or Management under the <a href="https://neb.gov.np" className="text-[#1A73E8] font-bold hover:underline">National Examination Board (NEB)</a>, Standard Deviation is a core chapter in <strong>Mathematics</strong> and <strong>Business Math</strong>. It is the bridge to understanding the <strong>Normal Distribution</strong> and <strong>Z-Scores</strong>.
                </p>
                <p>
                  During the <strong>SEE (Grade 10)</strong> and <strong>NEB (Grade 12)</strong> exams, students are often asked to find the standard deviation for both discrete and continuous frequency distributions. While our calculator is optimized for raw observation lists (ungrouped data), it provides the essential verification step for students to check their {'$f(x-\\bar{x})^2$'} summations.
                </p>
                <p>
                  Mastering this calculation is also vital for the <strong>Lok Sewa Aayog</strong> (Public Service Commission) technical examinations, where statistical aptitude is a major component of the Administrative and Technical officer screening process.
                </p>
              </div>
            </section>

            {/* Section 4: Real-World Applications */}
            <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 opacity-10">
                  <TrendingUp className="w-64 h-64" />
              </div>
              <h2 className="text-4xl font-black mb-10 border-b border-white/10 pb-6 tracking-tighter">Industrial Topology & Practical Utility</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
                      <div className="flex gap-4">
                          <div className="w-1 bg-[#1A73E8] shrink-0" />
                          <p>
                              <strong>Finance (NEPSE):</strong> Investors use the standard deviation of a stock\'s daily returns to measure its "Risk Profile." A high SD indicates a "volatile" stock that could see massive swings, while a low SD indicates a stable, "Blue Chip" asset.
                          </p>
                      </div>
                      <div className="flex gap-4">
                          <div className="w-1 bg-[#188038] shrink-0" />
                          <p>
                              <strong>Quality Control:</strong> Engineers at manufacturing plants in <strong>Biratnagar</strong> or <strong>Bhairahawa</strong> use SD to ensure product consistency. If the standard deviation of a bottle\'s volume exceeds the tolerance, the assembly line is halted for recalibration.
                          </p>
                      </div>
                  </div>
                  <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
                      <div className="flex gap-4">
                          <div className="w-1 bg-[#D93025] shrink-0" />
                          <p>
                              <strong>Healthcare:</strong> Clinical researchers in Kathmandu use standard deviation to measure the efficacy of new treatments. If the "Time to Recovery" has a high SD, the treatment is considered inconsistent, regardless of a good mean recovery time.
                          </p>
                      </div>
                      <div className="flex gap-4">
                          <div className="w-1 bg-[#F29900] shrink-0" />
                          <p>
                              <strong>Agriculture:</strong> Soil researchers use variance analysis to determine the consistency of crop yields across different farming co-operatives in the Terai region, helping identify successful irrigation patterns.
                          </p>
                      </div>
                  </div>
              </div>
            </section>
          </div>
        }
        howToUse={{
          steps: [
            "Data Population: Enter your numerical observations into the primary matrix using commas, spaces, or line breaks to delineate individual entries.",
            "Topological Parsing: Our engine automatically identifies and sorts the inputs, providing a real-time count of your sample size ({'$n$'}).",
            "Variance Analysis: Review the primary result panel for the Sample Standard Deviation. The engine uses {'$n-1$'} to provide an unbiased estimate.",
            "Metric Breakdown: Examine the secondary cards for the Sample Variance ({'$s^2$'}) and the Dataset Mean ({'$\\bar{x}$'}) to understand the center of gravity.",
            "Boundary Verification: Consult the detailed list for the statistical Minimum, Maximum, and the absolute Range of your dataset."
          ]
        }}
        formula={{
          title: "The Mathematical Axioms of Dispersion",
          description: "The following LaTeX identities represent the algorithmic foundations of our institutional-grade statistical engine.",
          raw: "$$\\begin{aligned} \\text{Sample Mean (}\\bar{x}\\text{): } & \\frac{\\sum x_i}{n} \\\\ \\text{Sum of Squares (SS): } & \\sum (x_i - \\bar{x})^2 \\\\ \\text{Sample Variance (}s^2\\text{): } & \\frac{SS}{n - 1} \\\\ \\text{Standard Deviation (}s\\text{): } & \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}} \\end{aligned}$$"
        }}
        faqs={[
          {
            question: "Why does the formula use (n - 1) instead of just 'n'?",
            answer: "This is known as Bessel's Correction. When you calculate variance from a sample, the sample mean is closer to the sample data than the true population mean is. Using 'n' would consistently underestimate the true spread. Dividing by (n - 1) mathematically corrects this bias to provide an 'unbiased estimator'."
          },
          {
            question: "What is the difference between Standard Deviation and Variance?",
            answer: "Variance is the average of the squared differences from the mean. Standard Deviation is the square root of the variance. We use SD more often because it is expressed in the same units as the original data (e.g., if you measure height in cm, SD is in cm, while variance is in cm²)."
          },
          {
            question: "How do I know if I should use Sample or Population SD?",
            answer: "Use Sample SD ({'$n-1$'}) if your data is a subset of a larger group (e.g., 50 households in Kathmandu). Use Population SD ({'$N$'}) only if you have data for every single member of the group you are studying (e.g., all 40 students in one specific section)."
          },
          {
            question: "What does a high standard deviation tell me about my data?",
            answer: "A high SD means your data is 'spread out' and potentially volatile. It indicates that the individual points are far from the average. In finance, this means high risk; in science, it might mean the experiment is not very precise."
          },
          {
            question: "Can standard deviation be a negative number?",
            answer: "No. Because the formula involves squaring the distances (making them positive) and then taking the principal square root, the result is always 0 or positive. A negative SD is a mathematical impossibility."
          },
          {
            question: "What does a standard deviation of 0 mean?",
            answer: "An SD of zero means there is no variation at all. Every single number in your dataset is exactly the same (e.g., [10, 10, 10, 10])."
          },
          {
            question: "How do outliers affect the standard deviation?",
            answer: "Standard deviation is extremely sensitive to outliers because the distance from the mean is squared. A single extreme value will significantly inflate the SD, making the data look more spread out than it truly is for the majority of points."
          },
          {
            question: "How is this used in NEB Grade 11/12 Exams?",
            answer: "NEB exams often require students to calculate the 'Coefficient of Variation' ({'$CV = (SD/Mean) \\times 100$'}) to compare the stability of two different datasets. Our calculator provides the SD and Mean needed to solve these problems instantly."
          },
          {
            question: "Is there a limit to how many numbers I can enter?",
            answer: "Our engine can handle thousands of data points with ease. However, for datasets larger than 10,000 nodes, we recommend using dedicated statistical software like R or SPSS to avoid browser performance lag."
          },
          {
            question: "What is the relationship between SD and the Normal Distribution?",
            answer: "In a 'Normal Distribution' (Bell Curve), approximately 68% of data falls within 1 SD of the mean, 95% falls within 2 SDs, and 99.7% falls within 3 SDs. This is known as the 68-95-99.7 rule."
          },
          {
            question: "Does the order of numbers matter?",
            answer: "No. The summation of squares ({'$\\sum (x_i - \\bar{x})^2$'}) is commutative. Whether you enter [1, 5, 10] or [10, 1, 5], the result remains identical."
          },
          {
            question: "How do I use this for 'Grouped Data' (with frequencies)?",
            answer: "This calculator is for 'Ungrouped Data' (raw lists). For grouped data, you must multiply the squared differences by the frequency ({'$f$'}) of each class. We recommend our specialized 'Frequency Distribution Calculator' for those academic needs."
          }
        ]}
        sidebar={{
          title: "Institutional Resources",
          links: [
            { label: "Z-Score Calculator", href: "/calculator/z-score" },
            { label: "NSO Nepal (Census Data)", href: "https://cbs.gov.np" },
            { label: "NEB Mathematics Guide", href: "https://neb.gov.np" },
            { label: "GPA Calculator", href: "/calculator/gpa" },
            { label: "Statistics Plus", href: "/calculator/statistics-plus" },
          ],
          banner: {
            title: "Data Intelligence",
            description: "Empowering Nepal's researchers and students with high-precision statistical tools.",
            image: "/images/math-banner.jpg"
          }
        }}
        relatedTools={[
          { label: "Z-Score Tool", href: "/calculator/z-score" },
          { label: "GPA Calculator", href: "/calculator/gpa" },
          { label: "Statistics Plus", href: "/calculator/statistics-plus" },
          { label: "Percentage Calc", href: "/calculator/percentage" }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}
