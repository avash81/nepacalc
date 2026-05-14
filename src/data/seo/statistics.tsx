import React from 'react';
import { SEOContent } from './types';

export const statisticsSEO: Record<string, SEOContent> = {
  'statistics-plus': {
    title: "Advanced Statistics Calculator | Mean, Median & More",
    description: "The most comprehensive calculator for descriptive and inferential statistics. Calculate mean, median, mode, variance, and standard deviation for your datasets.",
    
    howToUse: {
      steps: [
        "1. Enter Data: Type or paste your numbers separated by commas or spaces.",
        "2. Review Stats: Instantly see the Mean, Median, and Mode.",
        "3. Check Spread: View Standard Deviation and Variance to see how spread out your data is.",
        "4. Find Outliers: Use the automatically calculated Interquartile Range (IQR) to spot unusual data points.",
        "5. Population vs. Sample: Choose the right calculation method for your specific dataset."
      ]
    },
    
    formula: {
      title: "Standard Deviation Formula",
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
            {/* Overview */}
            <div className="bg-purple-50/50 border-l-4 border-purple-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-purple-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Making Sense of Your Data
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Statistics help us find patterns in numbers, whether you're analyzing school grades, business sales, or scientific research. This <strong>Statistics Plus</strong> tool makes it easy to calculate central tendencies like Mean and Median, while also providing deep insights into data dispersion through Standard Deviation and Variance. Understanding these metrics is key to making data-driven decisions in any field.
                </p>
            </div>

            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    1. Finding the Center: Mean vs. Median
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-purple-300 transition-all">
                        <h4 className="text-sm font-black uppercase text-purple-600 mb-4 flex items-center gap-2">
                            <span>🎯</span> The Arithmetic Mean (μ)
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            The Mean is the average of all your data points. It's great for uniform data but can be heavily influenced by extremely high or low values (outliers).
                        </p>
                    </div>
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all">
                        <h4 className="text-sm font-black uppercase text-blue-600 mb-4 flex items-center gap-2">
                            <span>⚖️</span> The Median (Q2)
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            The Median is the middle value when your data is sorted. It's a "robust" measure because it isn't affected by outliers, making it perfect for things like average income or house prices.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <h3 className="text-xl font-black mb-6 relative z-10 text-purple-400">
                    Understanding Data Spread & Volatility
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Knowing the average isn't enough. <strong>Standard Deviation (σ)</strong> tells you how much your data varies from that average. A low standard deviation means the numbers are close together, while a high one means they are spread far apart.
                    </p>
                    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
                        <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3">Quick Rule: The 68-95-99.7 Rule</h4>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            "In a normal distribution, about 68% of your data will fall within one standard deviation of the mean. If your data is way outside this, it's considered an anomaly."
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: The Interquartile Range (IQR) & Outliers */}
            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="text-purple-600">📊</span> spotting the Middle 50%: The IQR
                </h3>
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                        The <strong>Interquartile Range (IQR)</strong> represents the middle 50% of your data. It's a great way to see where most of your values lie while ignoring the extremes at both ends.
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
                        *Anything outside these fences is usually considered an **Outlier**.*
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
                                <th className="p-4">Feature</th>
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
                                <td className="p-4 text-green-700 font-bold">Clear Step-by-Step Logic</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="bg-indigo-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-1 bg-purple-500" />
                <h3 className="text-2xl font-black mb-4">Practical Uses of Statistics</h3>
                <p className="text-indigo-200 leading-relaxed mb-6">
                    From tracking stock market trends in NEPSE to analyzing agricultural output in different districts of Nepal, statistics help make sense of complex information. By using tools like the 'Mode' to find the most common price point or 'Standard Deviation' to measure risk, you can gain a much deeper understanding of any set of numbers.
                </p>
                <div className="flex gap-4">
                    <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-[10px] font-black uppercase">Sample vs Population Logic</div>
                    <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-[10px] font-black uppercase">Data Visualization Ready</div>
                </div>
            </section>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
                    Standard Statistics Engine • Professional Analysis Tool
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "What is the difference between Mean and Median?", answer: "The Mean is the average of all numbers, while the Median is the exact middle value. The Median is often better for data with large outliers, like income levels." },
      { question: "Why should I use this statistics tool?", answer: "Our tool automates complex calculations like variance, IQR, and standard deviation, giving you instant and accurate results without needing complex formulas." }
    ]
  },
  'standard-deviation': {
    title: "Standard Deviation Calculator | Dataset Variance Estimator",
    description: "Calculate standard deviation and variance for any dataset. Understand data dispersion and consistency with our easy-to-use tool.",
    howToUse: {
      steps: [
        "1. Enter Dataset: Input numbers separated by commas.",
        "2. Select Type: Choose between Population (σ) or Sample (s).",
        "3. Precise Check: View the step-by-step variance calculation."
      ]
    },
    formula: {
      title: "Dispersion Formula",
      description: "Standard deviation measures the average distance from the mean.",
      raw: "σ = √[Σ(x-μ)²/N]",
      variables: ["σ = Std Dev.", "μ = Mean.", "N = Count."]
    },
    content: (
        <div className="space-y-12">
            {/* Overview */}
            <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-purple-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Measuring Data Consistency
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Standard deviation is the most common way to measure how spread out your data is. While the "Mean" tells you the average, the "Standard Deviation" tells you how much the individual numbers vary from that average. In financial markets like NEPSE or scientific experiments, understanding this spread is essential for assessing risk and consistency.
                </p>
            </div>

            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    1. What is Standard Deviation?
                </h3>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                    <p>
                        In simple terms, standard deviation is the square root of <strong>Variance</strong>. It shows you if your data points are clustered closely around the average or if they are scattered far apart. A low standard deviation means high consistency, while a high one suggests more variety or risk.
                    </p>
                    <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                        <h4 className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-4">Population vs. Sample</h4>
                        <p className="text-sm leading-relaxed italic opacity-90">
                            "If you are measuring an entire group (Population), use the standard formula. If you are only looking at a small portion (Sample) to predict a larger trend, we apply a small adjustment (n-1) to ensure the result is more accurate and unbiased."
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: Competitive Check Table */}
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
                                <th className="p-4">Typical Use Case</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            <tr>
                                <td className="p-4 font-bold">Total Population (σ)</td>
                                <td className="p-4 font-mono">√[Σ(x-μ)² / N]</td>
                                <td className="p-4">Analyzing data from an entire national census.</td>
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

            {/* Section 3: Practical Risk Strategy */}
            <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10 text-purple-400">
                    Useful Rule: Chebyshev's Theorem
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <p className="text-sm text-slate-300 leading-relaxed">
                        This rule states that in almost any dataset, at least 75% of the values will fall within two standard deviations of the average. This helps researchers in Nepal and elsewhere quickly spot unusual numbers in production lines or financial reports.
                    </p>
                    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
                        <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3">spotting Anomalies</h4>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            "Data points that are more than 3 standard deviations away from the mean are often considered 'outliers' or errors. Use our tool to identify these before they skew your final results."
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 4: Step-by-Step Variance Check */}
            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="text-purple-600">🧮</span> Step-by-Step Calculation
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
                <h3 className="text-2xl font-black mb-4">Volatility in the Stock Market</h3>
                <p className="text-indigo-100 leading-relaxed mb-6">
                    In the Nepal Stock Exchange (NEPSE), standard deviation is often used to measure how much a stock's price fluctuates. A high standard deviation means the stock is more volatile, which can mean more risk for an investor. By comparing the volatility of different sectors like Banking or Hydropower, you can make more informed investment choices.
                </p>
                <div className="flex items-center gap-4">
                    <span className="h-px bg-white/30 flex-1" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-white">Advanced Data Analysis</span>
                    <span className="h-px bg-white/30 flex-1" />
                </div>
            </section>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
                    Risk & Variance Calculator • Easy Stats Guide
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "What is a low standard deviation?", answer: "A low standard deviation means that most of the numbers in your dataset are close to the average, indicating consistency." }
    ]
  },
  'probability': {
    title: "Probability Calculator | Likelihood & Odds Estimator",
    description: "Calculate the probability of events. Understand independent events, statistical odds, and risk with our free probability tool.",
    howToUse: {
      steps: [
        "1. Enter Successes: Number of desired outcomes.",
        "2. Enter Total Events: Total number of possible outcomes.",
        "3. Odds Check: View probability as a fraction, decimal, and percentage."
      ]
    },
    formula: {
      title: "Probability Formula",
      description: "The likelihood of an event occurring.",
      raw: "P(A) = n(A) / n(S)",
      variables: ["n(A) = Favorable outcomes.", "n(S) = Sample space."]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Probability Guide</h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Understanding probability helps us estimate the likelihood of future events. Whether you're assessing business risks or just curious about the odds of an outcome, our calculator provides quick and accurate results.
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Can probability be greater than 1?", answer: "No, probability always ranges from 0 (impossible) to 1 (certain)." }
    ]
  },
  'z-score': {
    title: "Z-Score Calculator | Standard Score Estimator",
    description: "Calculate Z-scores for normal distribution. Understand standardization and how to compare raw scores across different datasets.",
    howToUse: {
      steps: [
        "1. Input Value (x).",
        "2. Input Mean (μ).",
        "3. Input Standard Deviation (σ).",
        "4. Precise Check: View how many standard deviations the value is from the mean."
      ]
    },
    formula: {
      title: "Standard Score Formula",
      description: "Standardizing raw scores to compare across different datasets.",
      raw: "z = (x - μ) / σ",
      variables: ["x = Raw score.", "μ = Population mean.", "σ = Population std dev."]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Z-Score Guide</h2>
        <p className="text-slate-800 text-base leading-relaxed">
        A Z-score tells you exactly how far a specific data point is from the average of the whole group. It's measured in "standard deviations," making it easy to compare results from different sets of data.
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "What is a Z-score of 0?", answer: "It means the score is exactly equal to the mean." }
    ]
  }
};
