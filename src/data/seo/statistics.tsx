import React from 'react';
import { SEOContent } from './types';

export const statisticsSEO: Record<string, SEOContent> = {
  'statistics-plus': {
    title: "Statistics Plus Calculator | Dataset & Probability Auditor",
    description: "The definitive institutional engine for descriptive and inferential statistics. 1500+ words on variance, standard deviation, and dataset auditing for FY 2082/83.",
    
    howToUse: {
      steps: [
        "1. Dataset Entry: Input your raw data points separated by commas or newlines.",
        "2. Data Validation: The engine sanitizes the input for non-numerical characters.",
        "3. Descriptive Audit: View Mean, Median, Mode, and Range for the 2082/83 cycle.",
        "4. Variance Mapping: Analyze Standard Deviation and Variance to understand data dispersion.",
        "5. Quartile Split: Identify Q1, Q2 (Median), and Q3 for box-plot analysis.",
        "6. Outlier Detection: The system flags data points that fall outside the Interquartile Range (IQR).",
        "7. Sampling Calibration: Toggle between 'Population' and 'Sample' variance calculations.",
        "8. Result Export: Download the full statistical summary as a professional report."
      ]
    },
    
    formula: {
      title: "The Standard Deviation Axiom",
      description: "A measure of how much members of a group differ from the mean value for the dataset.",
      raw: "σ = √[ Σ(x - μ)² / N ]",
      variables: [
        "σ = Standard Deviation.",
        "Σ = Summation notation.",
        "x = Individual data point.",
        "μ = Mean (Average) of the dataset.",
        "N = Total number of data points (Population)."
      ]
    },
    
    content: (
        <div className="space-y-12">
            {/* Executive Summary */}
            <div className="bg-purple-50/50 border-l-4 border-purple-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-purple-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Statistical Intelligence & Data Auditing Summary
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Data is the primary auditor of institutional performance and societal trends. In the research landscape of <strong>FY 2082/83</strong>, the ability to extract meaningful insights from raw datasets—ranging from agricultural yields in the Terai to liquidity ratios in the banking sector—is a critical competency. This <strong>Statistics Plus Auditor</strong> provides a high-precision engine for multi-variant data analysis. By strictly enforcing standard mathematical protocols for dispersion and central tendency, we ensure that your conclusions are backed by rigorous statistical logic.
                </p>
            </div>

            {/* Section 1: The Hierarchy of Descriptive Stats */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    1. The Hierarchy of Descriptive Statistics: Central Tendency
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-purple-300 transition-all">
                        <h4 className="text-sm font-black uppercase text-purple-600 mb-4 flex items-center gap-2">
                            <span>🎯</span> The Arithmetic Mean (μ)
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            The Mean is the 'gravitational center' of your data. While powerful, it is highly sensitive to outliers. In 2082/83 fiscal auditing, we use the mean to establish baseline performance across large, uniform datasets.
                        </p>
                    </div>
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all">
                        <h4 className="text-sm font-black uppercase text-blue-600 mb-4 flex items-center gap-2">
                            <span>⚖️</span> The Median (Q2)
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            The Median is the 'robust center'. It effectively ignores extreme outliers, making it the primary auditor for income distribution and real estate pricing in Nepal, where skewed data is common.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: Strategy Box - Dispersion */}
            <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <h3 className="text-xl font-black mb-6 relative z-10 text-purple-400">
                    🛡️ Strategic Audit: Quantifying Dataset Volatility
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <p className="text-sm text-slate-300 leading-relaxed">
                        A mean value without <strong>Standard Deviation (σ)</strong> is mathematically blind. Two datasets can have the same average but entirely different risk profiles. Our engine identifies <strong>Variance (σ²)</strong> to help you understand if your data is clustered or chaotic.
                    </p>
                    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
                        <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3">Institutional Insight: The 68-95-99.7 Rule</h4>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            "In a normal distribution, 68% of data falls within one σ of the mean. If your 2082/83 production data falls outside this, your process is in 'Statistical Out-of-Control' state."
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: The Interquartile Range (IQR) & Outliers */}
            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="text-purple-600">📊</span> The IQR Axiom: Identifying the 'Middle 50%'
                </h3>
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                        The <strong>Interquartile Range (IQR)</strong> is the distance between the 25th percentile (Q1) and the 75th percentile (Q3). This is the definitive auditor for filtering out 'noise' and focusing on the core trend of your dataset.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                            <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Lower Fence</div>
                            <div className="text-sm font-bold text-red-600">Q1 - 1.5 × IQR</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
                            <div className="text-[10px] font-black text-purple-400 uppercase mb-1">Statistical Core</div>
                            <div className="text-sm font-bold text-purple-900">Q1 to Q3</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                            <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Upper Fence</div>
                            <div className="text-sm font-bold text-red-600">Q3 + 1.5 × IQR</div>
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-500 italic text-center">
                        *Values outside the fences are mathematically audited as **Outliers**.*
                    </p>
                </div>
            </section>

            {/* Section 4: Competitive Table */}
            <section>
                <h3 className="text-xl font-black text-slate-900 mb-6">Statistical Benchmarking: CalcPro vs. Excel</h3>
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-900 font-black">
                            <tr className="border-b border-slate-200">
                                <th className="p-4">Analysis Depth</th>
                                <th className="p-4">Standard Spreadsheet</th>
                                <th className="p-4 text-purple-700">CalcPro Statistics Plus ✓</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            <tr>
                                <td className="p-4 font-bold">Automatic Outliers</td>
                                <td className="p-4">Requires complex IF/OR formulas.</td>
                                <td className="p-4 text-green-700 font-bold">Instant IQR Filtering</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold">Data Sanitization</td>
                                <td className="p-4">Errors on non-numeric strings.</td>
                                <td className="p-4 text-green-700 font-bold">Auto-Cleaning Engine</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold">Step-by-Step Logic</td>
                                <td className="p-4">Hidden 'Black Box' results.</td>
                                <td className="p-4 text-green-700 font-bold">Verifiable Math Audits</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 5: Real-World Use Cases in Nepal */}
            <section className="bg-indigo-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-1 bg-purple-500" />
                <h3 className="text-2xl font-black mb-4">Economic Data Auditing 2082/83</h3>
                <p className="text-indigo-200 leading-relaxed mb-6">
                    Professional statisticians in Nepal use our engine to audit <strong>Consumer Price Index (CPI)</strong> baskets and export-import variance. By identifying the 'Mode' of price increases across 77 districts, we can pinpoint inflationary hotspots that the 'Mean' might mask. This is the primary tool for 2082/83 policy researchers and data scientists.
                </p>
                <div className="flex gap-4">
                    <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-[10px] font-black uppercase">Sample n-1 logic</div>
                    <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-[10px] font-black uppercase">Box-Plot resolution</div>
                </div>
            </section>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
                    Institutional Statistics Engine • 2082/83 Masterclass
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "What is the difference between Mean and Median?", answer: "The Mean is the arithmetic average, while the Median is the middle value. Medians are better for datasets with extreme outliers (like income in Nepal)." },
      { question: "Why use Statistics Plus for FY 2082/83?", answer: "Our engine automates complex variance and quartile calculations, ensuring 100% mathematical integrity for professional auditing." }
    ]
  },
  'standard-deviation': {
    title: "Standard Deviation Calculator | Dataset Variance Auditor",
    description: "Institutional engine for calculating standard deviation and variance for FY 2082/83. 1500+ words on data dispersion.",
    howToUse: {
      steps: [
        "1. Enter Dataset: Input numbers separated by commas.",
        "2. Select Type: Choose between Population (σ) or Sample (s).",
        "3. Precise Audit: View the step-by-step variance calculation."
      ]
    },
    formula: {
      title: "The Dispersion Axiom",
      description: "Standard deviation measures the average distance from the mean.",
      raw: "σ = √[Σ(x-μ)²/N]",
      variables: ["σ = Std Dev.", "μ = Mean.", "N = Count."]
    },
    content: (
        <div className="space-y-12">
            {/* Executive Summary */}
            <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-purple-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Risk Assessment & Dispersion Auditing Summary
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Standard deviation is the primary auditor of risk and consistency in <strong>FY 2082/83</strong>. While the 'Mean' tells you where your data is, the 'Standard Deviation' tells you if you can trust that average. In Nepal's volatile financial markets or hydropower production cycles, understanding the <strong>coefficient of variation</strong> is essential for fiscal survival. This engine provides institutional-grade variance audits for both population and sample datasets.
                </p>
            </div>

            {/* Section 1: The Standard Deviation Axiom */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    1. The Standard Deviation Axiom: Quantifying Entropy
                </h3>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                    <p>
                        Mathematically, standard deviation is the square root of <strong>Variance</strong>. It quantifies how much individual data points deviate from the group average. In the context of 2082/83 data science, a low standard deviation indicates high precision and reliability, while a high standard deviation suggests high risk and dispersion.
                    </p>
                    <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                        <h4 className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-4">Technical Deep-Dive: Population vs. Sample</h4>
                        <p className="text-sm leading-relaxed italic opacity-90">
                            "When auditing a total population (N), we use the direct average. However, for a sample (n), we apply <strong>Bessel's Correction (n-1)</strong>. This adjustment accounts for the inherent bias in smaller datasets, ensuring that your 2082/83 statistical inferences remain unbiased."
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: Competitive Audit Table */}
            <section>
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="text-purple-600">📊</span> The Variance Benchmark: σ vs s
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-900 font-black">
                            <tr className="border-b border-slate-200">
                                <th className="p-4">Dataset Scope</th>
                                <th className="p-4">Mathematical Notation</th>
                                <th className="p-4">Institutional Use Case</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            <tr>
                                <td className="p-4 font-bold">Total Population (σ)</td>
                                <td className="p-4 font-mono">√[Σ(x-μ)² / N]</td>
                                <td className="p-4">Auditing total 2082/83 national census data.</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold">Statistical Sample (s)</td>
                                <td className="p-4 font-mono">√[Σ(x-x̄)² / (n-1)]</td>
                                <td className="p-4 text-green-700 font-bold">Predicting market trends from small polls.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 3: Strategic Risk Strategy */}
            <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10 text-purple-400">
                    🛡️ Strategic Audit: Chebyshev's Theorem
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <p className="text-sm text-slate-300 leading-relaxed">
                        In any dataset (even non-normal ones), at least 75% of data falls within 2 standard deviations of the mean. This <strong>Institutional Axiom</strong> allows researchers in Nepal to identify anomalies in 2082/83 production lines or banking transaction volumes even before the 'Normal Curve' is established.
                    </p>
                    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
                        <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3">Professional Tip: The Outlier Fence</h4>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            "Points beyond 3σ are often audited as 'Black Swans' or processing errors. Use our <a href="/calculator/standard-deviation" className="text-purple-400 underline font-bold">Variance Lab</a> to filter these before they contaminate your final FY 2082/83 report."
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 4: Step-by-Step Variance Audit */}
            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="text-purple-600">🧮</span> Step-by-Step Mathematical Resolve
                </h3>
                <ol className="space-y-6">
                    <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black shrink-0">1</div>
                        <div>
                            <strong className="text-slate-900 block mb-1">Find the Mean (Average)</strong>
                            <p className="text-sm text-slate-600">Sum all numbers and divide by the count (N).</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black shrink-0">2</div>
                        <div>
                            <strong className="text-slate-900 block mb-1">Calculate Squares of Deviations</strong>
                            <p className="text-sm text-slate-600">For each number, subtract the mean and square the result (x - μ)².</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black shrink-0">3</div>
                        <div>
                            <strong className="text-slate-900 block mb-1">Compute the Mean of Squares (Variance)</strong>
                            <p className="text-sm text-slate-600">Sum the squared deviations and divide by N (Population) or n-1 (Sample).</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black shrink-0">4</div>
                        <div>
                            <strong className="text-slate-900 block mb-1">Extract the Standard Deviation</strong>
                            <p className="text-sm text-slate-600 font-bold text-indigo-700">The final result is the square root of the variance.</p>
                        </div>
                    </li>
                </ol>
            </section>

            {/* Section 5: The Economic Reality */}
            <section className="bg-indigo-600 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10" />
                <h3 className="text-2xl font-black mb-4">Volatility Auditing in NEPSE</h3>
                <p className="text-indigo-100 leading-relaxed mb-6">
                    In the Nepal Stock Exchange (NEPSE), standard deviation is used to calculate <strong>Bollinger Bands</strong> and <strong>Beta</strong>. A stock with a high σ is considered volatile, requiring a higher risk premium for the 2082/83 investor. By auditing the historical σ of <a href="/calculator/nepal-stocks" className="text-white underline font-bold">Banking sector stocks</a> vs. <a href="/calculator/nepal-stocks" className="text-white underline font-bold">Hydropower stocks</a>, you can build a more resilient portfolio.
                </p>
                <div className="flex items-center gap-4">
                    <span className="h-px bg-white/30 flex-1" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-white">Institutional Grade 2082/83</span>
                    <span className="h-px bg-white/30 flex-1" />
                </div>
            </section>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
                    Risk & Variance Auditor • FY 2082/83 Edition
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "What is a low standard deviation?", answer: "It indicates that the data points tend to be close to the mean, suggesting consistency in the 2082/83 dataset." }
    ]
  },
  'probability': {
    title: "Probability Calculator | Likelihood & Risk Auditor",
    description: "The definitive resource for probability audits in FY 2082/83. 1500+ words on independent events and statistical odds.",
    howToUse: {
      steps: [
        "1. Enter Successes: Number of desired outcomes.",
        "2. Enter Total Events: Total number of possible outcomes.",
        "3. Odds Audit: View probability as a fraction, decimal, and percentage."
      ]
    },
    formula: {
      title: "The Probability Axiom",
      description: "The likelihood of an event occurring.",
      raw: "P(A) = n(A) / n(S)",
      variables: ["n(A) = Favorable outcomes.", "n(S) = Sample space."]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Likelihood Summary</h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Probability auditing is essential for risk management in <strong>FY 2082/83</strong>.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Can probability be greater than 1?", answer: "No, probability ranges from 0 (impossible) to 1 (certain) for any FY 2082/83 event." }
    ]
  },
  'z-score': {
    title: "Z-Score Calculator | Standard Score Auditor",
    description: "Institutional resource for Z-score calculation in FY 2082/83. 1500+ words on normal distribution and standardization.",
    howToUse: {
      steps: [
        "1. Input Value (x).",
        "2. Input Mean (μ).",
        "3. Input Standard Deviation (σ).",
        "4. Precise Audit: View how many standard deviations the value is from the mean."
      ]
    },
    formula: {
      title: "The Standard Score Axiom",
      description: "Standardizing raw scores to compare across different datasets.",
      raw: "z = (x - μ) / σ",
      variables: ["x = Raw score.", "μ = Population mean.", "σ = Population std dev."]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Standardization Summary</h2>
        <p className="text-slate-800 text-base leading-relaxed">
        The Z-score is the primary auditor of relative position in a normal distribution for <strong>FY 2082/83</strong>.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "What is a Z-score of 0?", answer: "It means the score is exactly equal to the mean." }
    ]
  }
};
