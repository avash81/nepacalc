import React from 'react';
import { SEOContent } from './types';

export const financialSEO: Record<string, SEOContent> = {
  'sip-calculator': {
    title: "SIP Calculator Nepal 2082/83 | Mutual Fund Returns Lab",
    description: "Calculate your mutual fund SIP returns in Nepal. Plan for long-term wealth with compounding interest. Includes NEPSE index correlation and inflation-adjusted projections.",
    
    howToUse: {
      steps: [
        "1. Monthly Commitment: Define the exact amount in NPR you intend to invest every month through MeroShare or your capital manager.",
        "2. Expected Yield: Enter the projected annual return percentage. For balanced mutual funds in Nepal, this typically ranges between 10% to 14% based on historical NEPSE data.",
        "3. Duration Mapping: Set your investment horizon in years. Compounding benefits in Nepal's market are most visible after the 7th year.",
        "4. Step-up Strategy: Optional. Determine if you will increase your monthly SIP by a fixed percentage (e.g., 10% annually) as your salary grows.",
        "5. Inflation Adjustment: Account for the average consumer price index (CPI) in Nepal to see the real purchasing power of your future wealth.",
        "6. Wealth Audit: Review the 'Wealth Gained' output, which isolates the compounding profit from your total invested principal.",
        "7. Goal Alignment: Use the result to verify if your current investment pace meets long-term goals like Kathmandu property purchase or retirement.",
        "8. Execution: Once satisfied with the math, execute the SIP mandate via your preferred Capital Market institution or digital banking app."
      ]
    },
    
    formula: {
      title: "The Systematic Compounding Axiom (Future Value of Annuity)",
      description: "Our engine utilizes the standardized mathematical formula for the future value of an ordinary annuity, where interest is compounded monthly to match Nepal's mutual fund cycles.",
      raw: "FV = P × [((1 + r)^n - 1) / r] × (1 + r)",
      variables: [
        "FV = Future Value: The total wealth accumulated at the end of your investment tenure.",
        "P = Monthly SIP Amount: The recurring installment deducted from your bank account.",
        "r = Monthly Periodic Rate: Expected annual return ÷ 12 ÷ 100.",
        "n = Number of Installments: Total years × 12.",
        "Example Calculation",
        "Monthly SIP = Rs. 5,000 at 12% annual return for 10 years (120 months)",
        "r = 12% ÷ 12 ÷ 100 = 0.01 per month",
        "n = 10 years × 12 = 120 months",
        "FV = 5,000 × [((1.01)^120 - 1) / 0.01] × (1.01)",
        "Answer = Rs. 11,61,695 (approx)"
      ]
    },
    content: (
        <>
        <div className="space-y-12">
            
            {/* Executive Summary */}
            <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Wealth Acceleration Executive Summary
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Systematic Investment Planning (SIP) has revolutionized retail wealth creation in Nepal, offering a disciplined alternative to the high volatility of direct <a href="https://www.nepalstock.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 underline font-semibold transition-colors">NEPSE</a> trading. By automating monthly contributions into open-ended mutual funds, investors benefit from rupee cost averaging, effectively hedging against the cyclical nature of the Nepal Stock Exchange. This professional <a href="/calculator/sip-calculator" className="text-blue-700 hover:text-blue-900 underline font-bold transition-colors">SIP Lab</a> allows you to mathematically model your long-term financial journey for FY 2082/83.
                </p>
            </div>

            {/* Section 1: Competitive Audit */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    1. Competitive Audit: Why Our SIP Logic is Superior
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-black text-slate-900">Competitor</th>
                                <th className="p-4 font-black text-slate-900">Feature Gap</th>
                                <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="p-4 font-semibold">HamroPatro SIP</td>
                                <td className="p-4">Simple CAGR; no support for annual step-up.</td>
                                <td className="p-4 text-green-700 font-bold">Dynamic Step-Up Engine</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold">NIBL Ace Capital</td>
                                <td className="p-4">Limited to their own funds; no cross-asset audit.</td>
                                <td className="p-4 text-green-700 font-bold">Universal Fund Auditor</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold">ShareSansar</td>
                                <td className="p-4">No inflation-adjusted future value projection.</td>
                                <td className="p-4 text-green-700 font-bold">Real Value Projection</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 2: Strategy */}
            <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
                    <span className="text-blue-400">🛡️</span> Strategic Wealth Strategy: The DRIP Alpha
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <p className="text-sm text-slate-300 leading-relaxed">
                        For maximum wealth acceleration in Nepal, always opt for the <strong>Dividend Reinvestment Plan (DRIP)</strong>. Instead of taking cash dividends, reinvesting them into more units triggers a massive second-order compounding effect.
                    </p>
                    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
                        <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Institutional Insight</h4>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            "A Rs. 5,000 monthly SIP at 12% for 20 years creates a corpus of Rs. 49 Lakhs. By increasing your SIP by just 10% every year (Step-up), your final corpus jumps to over Rs. 1.2 Crore. Audit your potential in our <a href="/calculator/sip-calculator" className="text-blue-400 underline font-bold">Wealth Lab</a>."
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Step-by-Step */}
            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-3">
                    <span className="text-green-600">🧮</span> Step-by-Step SIP Wealth Projection
                </h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Investing <strong>Rs. 5,000</strong> monthly at an annual return of <strong>12%</strong> for <strong>10 years (120 months)</strong>.
                </p>
                <ol className="space-y-5">
                    <li className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">1</div>
                        <div className="flex-1">
                            <strong className="text-slate-900 block mb-1">Calculate Monthly Rate (i)</strong>
                            <code className="block bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-mono text-sm text-slate-800">
                                i = 12% ÷ 12 ÷ 100 = <strong className="text-blue-700">0.01</strong>
                            </code>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">2</div>
                        <div className="flex-1">
                            <strong className="text-slate-900 block mb-1">Total Number of Payments (n)</strong>
                            <code className="block bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-mono text-sm text-slate-800">
                                n = 10 years × 12 = <strong className="text-blue-700">120 months</strong>
                            </code>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">3</div>
                        <div className="flex-1">
                            <strong className="text-slate-900 block mb-1">Apply Future Value Formula</strong>
                            <code className="block bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-mono text-sm text-slate-800 leading-loose">
                                FV = 5,000 × [((1 + 0.01)^120 - 1) / 0.01] × (1 + 0.01)<br/>
                                FV = <strong className="text-green-700">Rs. 11,61,695 (Wealth Created)</strong>
                            </code>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-black text-sm">4</div>
                        <div className="flex-1">
                            <strong className="text-slate-900 block mb-1">Wealth vs. Principal Breakdown</strong>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-bold">Invested</div>
                                    <div className="font-black text-slate-900 text-lg">Rs. 6,00,000</div>
                                    <div className="text-[10px] text-slate-400 mt-1">5,000 × 120</div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-bold">Estimated Returns</div>
                                    <div className="font-black text-green-600 text-lg">Rs. 5,61,695</div>
                                    <div className="text-[10px] text-green-500 mt-1">Pure Profit</div>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-bold">Final Corpus</div>
                                    <div className="font-black text-blue-700 text-lg">Rs. 11,61,695</div>
                                    <div className="text-[10px] text-blue-500 mt-1">Maturity Value</div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ol>

                <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-xl p-5 space-y-2">
                    <p className="text-sm font-black text-indigo-800 uppercase tracking-wider">⚡ The 'Magic' of Long Tenure</p>
                    <ul className="space-y-2 text-sm text-indigo-900/80">
                        <li className="flex gap-2"><span>•</span><span><strong>Double the Time, Quadruple the Wealth:</strong> In the above example, if you extend from 10 years to 20 years, your total corpus jumps from ~11 Lakhs to ~49 Lakhs. Your investment only doubled, but your wealth nearly quadrupled.</span></li>
                        <li className="flex gap-2"><span>•</span><span><strong>NEPSE Volatility is Your Friend:</strong> Falling markets during your SIP tenure allow you to accumulate more units at lower costs, setting the stage for massive gains when the market inevitably recovers.</span></li>
                        <li className="flex gap-2"><span>•</span><span><strong>Tax Calculation:</strong> Your <a href="/calculator/nepal-income-tax" className="text-blue-600 hover:text-blue-800 underline font-semibold">verifiable monthly net income</a> should dictate your SIP amount. Always aim to invest at least 20% of your take-home pay.</span></li>
                    </ul>
                </div>
            </section>

            {/* Section 4: Institutional Comparisons */}
            <section className="space-y-6">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <span className="text-purple-600">📊</span> Institutional Investment Comparison
                </h3>
                
                <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
                    <h4 className="text-base font-black text-slate-900 mb-4">1. Excel / Google Sheets SIP Modeling</h4>
                    <p className="text-sm text-slate-500 mb-4">If you prefer offline auditing, use the standard Future Value (FV) function in spreadsheets to verify our engine's results.</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider">
                                    <th className="text-left px-4 py-3 rounded-tl-lg font-bold">Goal</th>
                                    <th className="text-left px-4 py-3 font-bold">Formula</th>
                                    <th className="text-left px-4 py-3 rounded-tr-lg font-bold">Parameters</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold text-blue-700">Maturity Value</td>
                                    <td className="px-4 py-3 font-mono text-slate-800">=FV(rate/12, nper*12, -pmt, 0, 1)</td>
                                    <td className="px-4 py-3 text-slate-500">pmt = SIP amount</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold text-green-700">Required Monthly SIP</td>
                                    <td className="px-4 py-3 font-mono text-slate-800">=PMT(rate/12, nper*12, 0, fv, 1)</td>
                                    <td className="px-4 py-3 text-slate-500">fv = target wealth</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
                    <h4 className="text-base font-black text-slate-900 mb-4">2. SIP (Mutual Funds) vs. Recurring FD: The 10-Year Audit</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider">
                                    <th className="text-left px-4 py-3 rounded-tl-lg font-bold">Feature</th>
                                    <th className="text-left px-4 py-3 font-bold text-green-700">Equity SIP ✓</th>
                                    <th className="text-left px-4 py-3 rounded-tr-lg font-bold text-red-600">Bank FD ✗</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold text-slate-700">Avg. Annual Yield</td>
                                    <td className="px-4 py-3 text-green-700 font-medium">12% to 15% (Historical)</td>
                                    <td className="px-4 py-3 text-red-600 font-medium">7% to 9% (Fixed)</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold text-slate-700">Capital Protection</td>
                                    <td className="px-4 py-3 text-red-600 font-medium">Market Linked Risk</td>
                                    <td className="px-4 py-3 text-green-700 font-medium">High Security</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold text-slate-700">Compounding Cycle</td>
                                    <td className="px-4 py-3 text-slate-600">Continuous / NAV based</td>
                                    <td className="px-4 py-3 text-slate-600">Quarterly / Monthly</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold text-slate-700">Tax Efficiency</td>
                                    <td className="px-4 py-3 text-green-700 font-medium">5% Long Term Capital Gains</td>
                                    <td className="px-4 py-3 text-red-600 font-medium">Interest taxed as Income</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold text-slate-700">Liquidity</td>
                                    <td className="px-4 py-3 text-green-700 font-medium">T+2 Day Redemptions</td>
                                    <td className="px-4 py-3 text-red-600 font-medium">Premature penalty applicable</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Section 5: Nepal Specific */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    Nepal-Specific Investment Parameters
                </h3>
                <p className="text-slate-700 mb-8 leading-relaxed">
                    Starting your wealth journey in Nepal requires understanding local market operationalities. From CDSC integration to Merchant Banking rules, these factors directly impact your final maturity amount.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                            <h4 className="text-lg font-bold text-slate-900">MeroShare SI</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            You can now set a Standing Instruction (SI) through your commercial bank. This automatically transfers your SIP amount to the mutual fund's collection account on a fixed date every month, ensuring your compounding schedule is never interrupted by manual errors.
                        </p>
                    </div>
                    <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 group-hover:scale-150 transition-transform" />
                            <h4 className="text-lg font-bold text-slate-900">Exit Load Policies</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Most open ended funds in Nepal (e.g., NIBL Sahabhagita Fund) charge an exit load if you redeem within 2 years. This is usually 1.5% in the first year and 1% in the second year. After 2 years, redemptions are typically free of any exit load charges.
                        </p>
                    </div>
                    <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform" />
                            <h4 className="text-lg font-bold text-slate-900">SEBON Protection</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            All mutual funds are regulated by SEBON. The fund's assets are held by a 'Custodian' (usually an A-class bank) and audited by a 'Trustee', ensuring that the fund manager cannot misuse the public's capital for unauthorized purposes.
                        </p>
                    </div>
                    <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                            <h4 className="text-lg font-bold text-slate-900">Dividend Tax (5%)</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            In Nepal, the 5% tax on dividends is a final withholding tax. This means once the mutual fund deducts this amount, you do not need to pay any additional income tax on those earnings, making mutual funds highly tax efficient for high earners.
                        </p>
                    </div>
                    <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-teal-500 group-hover:scale-150 transition-transform" />
                            <h4 className="text-lg font-bold text-slate-900">NEPSE Market Cycle</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            The Nepal Stock Exchange is known for its aggressive bull and bear cycles (often 3-4 years each). An SIP is the only mathematical way for a retail investor to survive these cycles without needing to time the market perfectly.
                        </p>
                    </div>
                    <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 group-hover:scale-150 transition-transform" />
                            <h4 className="text-lg font-bold text-slate-900">Unit Allocation Math</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            When you invest Rs. 5,000, and the NAV is Rs. 10.50, you receive exactly 476.19 units. The fractional units are tracked to the fourth decimal place by the RTA (Registrar and Transfer Agent) ensuring no leakage of your capital.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 6: Case Study */}
            <section className="bg-white border border-slate-200 rounded-3xl p-10 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-[80px] opacity-60 pointer-events-none" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-black text-slate-900 mb-4">
                        Strategic Case Study: Retirement Planning in Kathmandu
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        Consider a 30-year-old software engineer in Kathmandu earning a monthly net salary of Rs. 80,000. After expenses and their <a href="/calculator/loan-emi" className="text-blue-600 hover:text-blue-800 underline font-semibold">Loan EMI</a>, they decide to invest Rs. 10,000 monthly into an Equity SIP for 25 years. Let's strictly decompose the wealth generation:
                    </p>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 font-mono text-sm relative group text-slate-700 shadow-inner">
                        <button className="absolute top-6 right-6 bg-white hover:bg-slate-100 text-xs px-4 py-2 rounded-lg text-slate-600 border border-slate-200 transition-colors flex items-center gap-2 shadow-sm font-sans font-bold" onClick={(e) => e.preventDefault()}>
                            <span>📋</span> Copy Wealth Audit
                        </button>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-slate-400">01</span> 
                            <span className="text-green-600 font-bold">Principal (P):</span> Rs. 30,00,000 (Total Out-of-Pocket)
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-slate-400">02</span> 
                            <span className="text-green-600 font-bold">Duration (T):</span> 25 Years (300 Monthly Cycles)
                        </div>
                        <div className="mb-6 flex items-center gap-2">
                            <span className="text-slate-400">03</span> 
                            <span className="text-green-600 font-bold">Expected Return (r):</span> 13% CAGR (Standard Growth Target)
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <div className="font-black text-slate-900 text-xl mb-2 flex items-center gap-3">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm">RETIREMENT CORPUS</span>
                                Calculated Wealth: Rs. 2.27 Crores
                            </div>
                            <div className="text-slate-500 mt-3 flex flex-col gap-2">
                                <p>→ Total Principal Invested: Rs. 30,00,000</p>
                                <p>→ Estimated Compounding Profit: Rs. 1,97,00,000</p>
                                <p className="font-bold text-slate-700 mt-2">→ Effective Wealth Multiplier: ~7.5x Capital Invested</p>
                            </div>
                            <p className="text-sm text-slate-500 mt-6 italic">
                                Audit Observation: Despite investing only Rs. 30 Lakhs over his career, the investor retires with over 2 Crores. This is because the money invested in his 30s had 25 years to compound, whereas the money invested in his 50s only had 5 years. This highlights why starting an SIP early in Nepal is more critical than the actual amount invested. Model your own long term growth using our <a href="/calculator/sip-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold">SIP Calculator</a> today.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <div className="pt-10 border-t border-slate-200 text-center mt-12">
                <p className="text-base text-slate-700 mb-3">
                    Ready to optimize your portfolio? Execute our <a href="/calculator/nepal-stocks" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">NEPSE Profit Calculator</a> to audit your direct stock investments and compare them against your SIP returns.
                </p>
                <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-4 py-2 rounded-full border border-slate-100 mt-2">
                    Investment Audit: Last updated Baishakh 2083 (May 2026). Calculations strictly conform to the Mutual Fund Regulation 2067 and SEBON operational guidelines. Equity investments are subject to market risks.
                </p>
            </div>

        </div>
        </>
    ),
    faqs: [
      { 
        question: "Is there a minimum amount required to start an SIP in Nepal?", 
        answer: "Most open ended mutual funds in Nepal, such as NIBL Sahabhagita Fund or Siddhartha Systematic Investment Scheme, allow you to start with as little as Rs. 1,000 per month. This low entry barrier is designed to encourage students and young professionals in Nepal to start their compounding journey early." 
      },
      { 
        question: "Can I stop my SIP during a bear market in NEPSE?", 
        answer: "Technically, yes, you can stop or pause at any time. However, mathematically, stopping during a bear market is the worst decision a long term investor can make. In a bear market, your Rs. 5,000 buys more units because the NAV is lower. When the market eventually recovers, these 'cheap' units generate the highest percentage of your total wealth." 
      },
      { 
        question: "What is the difference between an SIP and a Mutual Fund?", 
        answer: "A Mutual Fund is the investment vehicle (the basket of stocks), while an SIP is the method of investing (monthly installments). You can invest in a mutual fund via a 'Lump Sum' (one-time) or via an 'SIP' (recurring). In Nepal's volatile market, the SIP method is generally safer and more effective for most retail investors." 
      },
      { 
        question: "Is SIP interest taxable in Nepal?", 
        answer: "Mutual funds in Nepal earn dividends and capital gains. Dividends are subject to a 5% final withholding tax. When you redeem your units, if you have held them for more than 365 days, you pay a 5% Capital Gains Tax (CGT) on the profit. For holdings less than a year, the CGT is 7.5%." 
      },
      { 
        question: "Can I do an SIP in direct stocks on NEPSE?", 
        answer: "Currently, NEPSE does not have an automated platform for SIP in direct stocks. However, many brokers allow you to manually buy a fixed number of shares every month. This is called 'Manual SIP'. For a truly automated experience, open ended mutual funds remain the best option in Nepal." 
      },
      { 
        question: "What happens if I miss one monthly SIP installment?", 
        answer: "In most Nepalese mutual fund schemes, missing one or two installments does not lead to a penalty. Your existing units continue to compound. However, your long term wealth target will be slightly delayed. If you miss multiple installments, the AMC (Asset Management Company) might deactivate the SIP mandate, and you will need to re-apply." 
      },
      { 
        question: "How safe is my money in a Nepalese SIP?", 
        answer: "While market returns are not guaranteed, the structure of mutual funds in Nepal is very safe. The Securities Board of Nepal (SEBON) ensures that the fund manager, the trustee (bank), and the custodian (bank) are three separate entities. Even if the fund manager's company goes bankrupt, your assets are safe with the custodian bank." 
      },
      { 
        question: "What is the 'NAV' and how often is it updated?", 
        answer: "NAV stands for Net Asset Value, which represents the market value of one unit of the fund. For open ended funds in Nepal, the NAV is updated daily on the fund manager's website and on the NEPSE portal. Your monthly investment buys units based on the NAV of the day your payment is processed." 
      },
      { 
        question: "Does an SIP protect me from inflation in Nepal?", 
        answer: "Historically, equity mutual funds have beaten Nepal's average inflation (approx. 6-7%) by a significant margin. By generating 12-15% annual returns, an SIP ensures that your future wealth has more purchasing power than your current savings, which is something a standard savings account or FD often fails to do." 
      },
      { 
        question: "Which is the best date for an SIP installment in Nepal?", 
        answer: "Mathematically, the date does not matter for long term investments (10+ years). However, most people in Nepal choose a date between the 1st and 7th of the month to coincide with their salary credit, ensuring the investment is prioritized before other monthly expenses." 
      }
    ]
  },

  'mortgage-calculator': {
    title: "Mortgage & Home Loan Auditor Nepal | Institutional Amortization Lab",
    description: "Professional systematic resource for home mortgage planning in Nepal. 1500+ words on NRB mortgage caps, LTV ratios, and interest-shaving strategies for FY 2082/83.",
    
    howToUse: {
      steps: [
        "1. Property Valuation Entry: Input the total market value of the land and building based on recent independent valuation reports.",
        "2. Down Payment Allocation: Define your initial capital. Nepal Rastra Bank (NRB) requires a 30% to 50% down payment for residential purposes.",
        "3. Interest Rate Sync: Enter the bank's current Base Rate plus the agreed Spread percentage (Total Lending Rate).",
        "4. Tenure Definition: Select the repayment period. Commercial banks in Nepal typically offer a range from 5 to 25 years.",
        "5. Repayment Type Selection: Choose between standard EMI (Equal Monthly Installments) or custom repayment structures if applicable.",
        "6. Amortization Schedule Generation: Observe how the monthly payment is split between principal reduction and interest cost.",
        "7. Prepayment Simulation: Use the auditor to see how paying an extra 10% principal annually can shave years off your debt.",
        "8. Net Interest Audit: Review the total interest payable over the life of the loan to understand the true cost of the asset."
      ]
    },
    
    formula: {
      title: "The Reducing Balance Amortization Algorithm",
      description: "Mortgages in Nepal utilize the reducing balance method where interest is calculated monthly on the remaining principal balance, not the original loan amount.",
      raw: "EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]",
      variables: [
        "<strong>P = Principal</strong>: The total loan amount sanctioned by the bank.",
        "<strong>r = Monthly Rate</strong>: The annual interest rate divided by 12 and 100.",
        "<strong>n = Number of Months</strong>: The total repayment tenure in months.",
        "<strong>EMI</strong>: The fixed monthly amount covering both principal and interest."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-300">
        
        <div className="bg-[#1a1a2e] border-l-4 border-purple-500 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-purple-400 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Real Estate Finance Executive Summary
        </h2>
        <p className="text-white text-base leading-relaxed">
        In the rapidly evolving real estate market of Nepal, particularly within the Kathmandu Valley, securing a mortgage is a multi-dimensional strategic decision. The <a href="/calculator/mortgage-calculator" className="text-purple-400 hover:text-purple-300 underline font-bold transition-colors">Mortgage Auditor</a> is engineered to provide professional transparency into the long-term fiscal implications of home ownership. From navigating the strict <a href="https://www.nrb.org.np" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline font-bold transition-colors">Nepal Rastra Bank (NRB) </a> Loan-to-Value (LTV) caps to auditing the "Reducing Balance" amortization schedules of A-class commercial banks, this tool serves as your definitive financial advisor. Whether you are budgeting for a first-time residential purchase or a strategic land investment, understanding the interplay between interest spreads and tenure is the key to minimizing your total debt service.
        <br/><br/>
        <span className="text-sm text-slate-400">
        Strategic Asset Audit: Real estate is the most significant investment for most Nepalese households. Ensure your income supports the debt using our <a href="/calculator/nepal-income-tax" className="text-purple-400 hover:text-purple-300 underline font-bold transition-colors">Income Lab</a> before committing to a 20-year liability.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-white mb-6">
        1. The LTV Anchor: NRB Caps on Property Value
        </h3>
        <div className="prose prose-slate max-w-none text-slate-300 leading-relaxed space-y-4">
        <p>
        The <strong>Loan-to-Value (LTV) Ratio</strong> is the most critical regulatory constraint in Nepal's mortgage landscape. NRB utilizes this ratio as a macro-prudential tool to prevent overheating in the real estate sector.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Residential Housing:</strong> For self-occupied residential houses within the Kathmandu Valley, the LTV is typically capped at 50%. This means for a property valued at Rs. 2 Crore, the bank can only lend a maximum of Rs. 1 Crore.</li>
        <li><strong>Real Estate Loans:</strong> Loans for speculative land purchase or commercial development often face stricter LTV limits, sometimes as low as 30% to 40%.</li>
        <li><strong>First-Time Home Buyers:</strong> Some recent directives have offered slight relaxations for first-time buyers, emphasizing the government's push towards housing stability.</li>
        </ul>
        
        
        <section className="bg-[#16213e] border border-purple-900/30 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
        <span className="text-purple-500">📉</span> Amortization Science: Principal vs. Interest Decay
        </h3>
        <div className="prose prose-slate max-w-none text-slate-300 leading-relaxed space-y-4">
        <p>
        Many borrowers in Nepal are surprised to see that in the first 5 years of a 20-year mortgage, nearly 80% of their EMI goes toward interest rather than principal reduction. This is the nature of the "Front-Loaded" interest model.
        </p>
        <div className="overflow-hidden rounded-xl border border-purple-900/50 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-[#1a1a2e]">
        <tr>
        <th className="p-4 font-black text-white uppercase">Phase of Loan</th>
        <th className="p-4 font-black text-white uppercase">Interest Component</th>
        <th className="p-4 font-black text-white uppercase">Principal Component</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-purple-900/30">
        <tr><td className="p-4 font-bold text-white">Year 1 - 5</td><td className="p-4 text-red-400">High (70%+ </td><td className="p-4">Low (30%- </td></tr>
        <tr><td className="p-4 font-bold text-white">Year 10 - 15</td><td className="p-4 text-amber-400">Moderate (50% </td><td className="p-4 text-green-400">Moderate (50% </td></tr>
        <tr><td className="p-4 font-bold text-white">Year 20 - 25</td><td className="p-4 text-green-400">Low (10% </td><td className="p-4 text-green-500 font-bold">High (90% </td></tr>
        </tbody>
        </table>
        
        
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 border border-slate-700 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-purple-400">🏗️</span> Valuation Mechanics: The Bank's Perspective
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        A common point of friction in Nepal is the gap between "Market Price" and "Bank Valuation". Understanding how banks arrive at their numbers is vital for your down-payment planning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">The Malpot Rate:</strong> The official government valuation used for registration taxes. This is usually the lowest benchmark.</p></div>
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Fair Market Value (FMV) :</strong> The price a willing buyer pays a willing seller. Banks hire independent valuators to determine this scientifically.</p></div>
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold">3
        <p className="text-sm text-slate-300"><strong className="text-white">Distress Value:</strong> Often set at 70% to 80% of the FMV. This is the amount the bank expects to recover in a forced auction scenario.</p>
        <div className="bg-black/40 border border-slate-700 p-6 rounded-xl">
        <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "In Nepal, banks usually calculate your loan eligibility as a percentage of the average of the Malpot and FMV valuations. If you are buying a property in a high-growth area like Bhaisepati or Budhanilkantha where market prices are skyrocketing, be prepared for a 'Valuation Gap' that requires a higher out-of-pocket down payment. Map your savings growth in our <a href="/calculator/sip-calculator" className="text-purple-400 underline font-bold">SIP Lab</a> to bridge this gap."
        </p></div>
        
        
        <section>
        <h3 className="text-2xl font-black text-white mb-6">
        Mortgage Optimization Silos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#16213e] p-6 rounded-2xl border border-purple-900/30 shadow-sm hover:border-purple-500 transition-all">
        <h4 className="font-black text-white mb-3 flex items-center gap-2">
        <span className="text-purple-500">📈</span> The Spread Rate
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
        Your interest rate is 'Base Rate + Spread'. While the Base Rate fluctuates with market liquidity, the 'Spread' is usually fixed for the tenure. Negotiate this spread aggressively!
        </p>
        <div className="bg-[#16213e] p-6 rounded-2xl border border-purple-900/30 shadow-sm hover:border-green-500 transition-all">
        <h4 className="font-black text-white mb-3 flex items-center gap-2">
        <span className="text-green-500">🛡️</span> EMI Insurance
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
        Most commercial banks in Nepal mandate Credit Term Life Insurance. This ensures that in the event of the borrower's demise, the loan is paid off by the insurer, protecting the family home.
        </p>
        <div className="bg-[#16213e] p-6 rounded-2xl border border-purple-900/30 shadow-sm hover:border-blue-500 transition-all">
        <h4 className="font-black text-white mb-3 flex items-center gap-2">
        <span className="text-blue-500">📑</span> Prepayment Audit
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
        Paying just one extra EMI per year towards your principal can reduce a 20-year mortgage to approximately 16 years. Always check for 'Prepayment Penalties' in your loan agreement.
        </p>
        
        
        <section className="bg-[#0f172a] border border-purple-900/30 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-white mb-4">
        Strategic Case Study: The Kathmandu Family Home
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
        Consider a family purchasing a house in Imadol valued at Rs. 2.5 Crore. They secure a loan of Rs. 1 Crore (40% LTV at an interest rate of 11% for 20 years.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-sm">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Liability Audit</h4>
        <div className="space-y-2 text-sm text-slate-300">
        <div className="flex justify-between"><span>Loan Amount:</span> <strong>Rs. 1 Crore</strong></div>
        <div className="flex justify-between"><span>Monthly EMI:</span> <strong>Rs. 1,03,219</strong></div>
        <div className="flex justify-between border-t border-slate-700 pt-2 mt-2 font-bold text-white"><span>Total Payout:</span> <span>Rs. 2.47 Crore</span>
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-purple-900/50 shadow-md transform md:scale-105">
        <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">Interest Cost View</h4>
        <div className="space-y-2 text-sm text-slate-300">
        <div className="flex justify-between"><span>Principal Paid:</span> <strong>Rs. 1.00 Crore</strong></div>
        <div className="flex justify-between"><span>Interest Paid:</span> <strong>Rs. 1.47 Crore</strong></div>
        <div className="flex justify-between border-t border-purple-900/50 pt-2 mt-2 font-bold text-purple-400"><span>Interest-to-Principal:</span> <span>147%</span>
        <p className="text-xs text-slate-500 mt-8 italic text-center">
        Audit Observation: Over 20 years, you pay back nearly 2.5 times what you borrowed. This underscores why auditing your mortgage with our <a href="/calculator/mortgage-calculator" className="text-purple-400 underline font-bold">Mortgage Suite</a> and planning for prepayments is the most effective way to build generational wealth in Nepal.
        </p></div></div></div></div></div></div></div>
        
        
        <div className="pt-10 border-t border-slate-800 text-center mt-12">
        <p className="text-[11px] text-slate-500 italic bg-[#1a1a2e] inline-block px-6 py-2 rounded-full border border-purple-900/30">
        Institutional Compliance: Last updated Baishakh 2083 (May 2026 . Calculations strictly conform to NRB's Unified Directives and the reducing balance interest standard.
        
        
        
        </p>
        </div>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is the maximum home loan tenure in Nepal?", 
        answer: "Most commercial banks in Nepal offer a maximum tenure of 20 to 25 years. However, this is also limited by the age of the borrower; the loan must typically be fully repaid before the borrower reaches 65 or 70 years of age." 
      },
      { 
        question: "How does the Base Rate affect my home loan EMI in Nepal?", 
        answer: "Most home loans in Nepal are 'Floating Rate' loans linked to the bank's Base Rate. If the Base Rate increases due to a liquidity crunch in the banking system, your interest rate and subsequently your EMI (or tenure) will also increase." 
      },
      { 
        question: "Can I get a 100% home loan in Nepal?", 
        answer: "No. According to Nepal Rastra Bank (NRB) regulations, banks must maintain a Loan-to-Value (LTV) ratio. For residential housing within Kathmandu Valley, you typically need to provide at least 50% of the property's valuation as a down payment." 
      },
      { 
        question: "Is it better to choose a Fixed or Floating interest rate?", 
        answer: "A Fixed Rate provides certainty and protection against rising interest rates, which is valuable in Nepal's volatile market. A Floating Rate might be cheaper initially but carries the risk of significant increases if market liquidity tightens." 
      },
      { 
        question: "What are the hidden costs of a mortgage in Nepal?", 
        answer: "Beyond the EMI, borrowers must account for Loan Processing Fees (typically 0.25% to 1%), Property Valuation Fees, Legal/Notary Fees, Mortgage Deed Registration Taxes, and mandatory Insurance premiums." 
      },
      { 
        question: "How much is the mortgage registration fee in Nepal?", 
        answer: "The mortgage deed (Dhito Lekhpass) registration fee is a statutory tax paid to the Land Revenue Office (Malpot). It is usually a small percentage of the loan amount, much lower than the 5% property transfer tax." 
      },
      { 
        question: "Can I refinance my home loan from one bank to another in Nepal?", 
        answer: "Yes, this is known as a 'Loan Swap'. If another bank offers a significantly lower interest spread, you can move your loan. However, be mindful of the 'Swap Fee' and the costs of re-valuing the property and re-registering the mortgage." 
      },
      { 
        question: "What is the difference between a Home Loan and a Land Loan?", 
        answer: "A Home Loan is for residential construction or purchase and has more favorable LTV limits and interest rates. A Land Loan (Ghar Jagga Karja) is for purchasing a plot of land for investment and often faces stricter LTV caps and higher spreads." 
      },
      { 
        question: "How does prepayment help in reducing my mortgage interest?", 
        answer: "In a reducing balance loan, any amount paid over the EMI goes directly towards reducing your principal. This immediately lowers the interest calculation for all subsequent months, leading to massive savings over time." 
      },
      { 
        question: "Does the bank value my property at market price?", 
        answer: "Rarely. Banks use a conservative valuation that is usually the average of the Government (Malpot) rate and the Fair Market Value determined by an independent engineer. This 'Bank Valuation' is almost always lower than the actual market selling price." 
      }
    ]
  },

  'compound-interest': {
    title: "Compound Interest Calculator Nepal | Exponential Wealth Lab",
    description: "Calculate exponential wealth growth with absolute precision. Professional guide on NRB compounding standards, inflation impact, and the power of time.",
    
    howToUse: {
      steps: [
        "1. Principal Initialization: Input the initial lump sum amount (Corpus) you are starting with in NPR.",
        "2. Yield Configuration: Define the annual interest rate. Commercial banks in Nepal currently offer 7% to 11% depending on the instrument.",
        "3. Compounding Frequency: Select how often interest is calculated. In Nepal, 'Quarterly' is the regulatory standard for most savings and FD products.",
        "4. Time Horizon: Set the total duration of the investment in years. Remember, time is the most powerful variable in this equation.",
        "5. Periodic Contributions: Add optional monthly deposits to simulate a systematic investment plan (SIP) alongside your lump sum.",
        "6. Tax Leakage Audit: Account for the mandatory 5% tax on interest income to determine your true net future value.",
        "7. Inflation Calibration: Review the 'Real Rate of Return' by comparing your nominal yield against the current CPI inflation in Nepal.",
        "8. Output Analysis: Observe the 'Interest on Interest' component which represents the snowball effect of compounding."
      ]
    },
    
    formula: {
      title: "The Exponential Growth Axiom (Multi-Frequency Model)",
      description: "Compound interest is calculated by applying the periodic interest rate to the principal plus all interest accumulated from previous periods.",
      raw: "A = P(1 + r/n)^(nt)",
      variables: [
        "A = Final Amount: The total value of the investment including interest.",
        "P = Principal: The initial capital invested.",
        "r = Annual Rate: The nominal interest rate in decimal form (10% = 0.10).",
        "n = Compounding Frequency: Number of times interest is applied per year (Quarterly = 4).",
        "t = Time: Total number of years the money is invested.",
        "Worked Example (Standard Growth)",
        "Principal: Rs. 1,00,000",
        "Rate: 10% (Quarterly Compounding)",
        "Tenure: 10 Years",
        "Calculation: 1,00,000 × (1 + 0.10/4)^(4 × 10)",
        "Final Value: Rs. 2,68,506.38"
      ]
    },
    
    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Institutional Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Compound interest is the fundamental engine of wealth creation, often described as the "8th Wonder of the World" due to its ability to turn modest savings into significant fortunes over time. In the context of the Nepalese financial system, compounding is the core mechanism behind Fixed Deposits, Recurring Savings, and Mutual Fund returns. This institutional grade calculator allows investors to move beyond simple linear projections and understand the exponential "Snowball Effect" where interest starts earning its own interest. By factoring in the <a href="https://www.nrb.org.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Nepal Rastra Bank (NRB) </a> quarterly standards and statutory tax deductions, we provide a definitive audit of your future purchasing power.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Tax Efficiency: Ensure your interest earnings are audited for tax liability using our <a href="/calculator/nepal-income-tax" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">Nepal Income Tax Lab</a> to maximize net returns.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Compounding Frequency: The Hidden Yield Optimizer
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In the mathematics of compounding, the frequency (n) at which interest is calculated can significantly impact the final maturity amount, even if the nominal rate remains the same.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Annual Compounding:</strong> Interest is calculated once a year. This is the simplest but least effective growth model.</li>
        <li><strong>Quarterly Compounding (NRB) Standard :</strong> The most common method in Nepal. Interest is calculated every three months and added to the principal, allowing for "Interest on Interest" to start working faster.</li>
        <li><strong>Monthly Compounding:</strong> Common in high yield savings accounts and micro-finance institutions. This provides the highest effective annual rate (EAR) .</li>
        </ul>
        <p>
        When comparing two banks in Nepal, always check if they offer "Quarterly" or "Semi-Annual" compounding. A lower nominal rate with higher frequency can often outperform a higher nominal rate with lower frequency. For a direct comparison with fixed yield products, refer to our <a href="/calculator/fd-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">FD Lab</a>.
        </p>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-red-600">⏳</span> The Cost of Delay: Why Time Beats Timing
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The most critical variable in the compounding formula is not the interest rate, but <strong>Time (t) </strong>. Because the growth is exponential, the vast majority of the wealth is generated in the final few years of the investment horizon.
        </p>
        <p>
        If a 25-year-old in Kathmandu starts saving Rs. 10,000 monthly, they will retire significantly wealthier than a 35-year-old who starts saving Rs. 20,000 monthly. This "head start" allows the compounding engine more cycles to multiply. To model your own monthly systematic growth, audit our <a href="/calculator/sip-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">SIP Lab</a>.
        </p>
        
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-green-400">🔢</span> The Rule of 72: Instant Wealth Auditing
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        The Rule of 72 is a mental shortcut used to determine how long it will take for your money to double at a fixed annual rate of interest.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">The Formula:</strong> Divide 72 by the annual interest rate. The result is the number of years required to double your principal.</p></div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Example:</strong> If a Nepal bank offers 9% on a fixed deposit, your money doubles in 72 / 9 = 8 years.</p>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-green-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "In high inflation environments like Nepal, the Rule of 72 helps you quickly realize if your investment is growing fast enough to maintain your lifestyle. If doubling takes more than 10 years, you are likely losing purchasing power."
        </p></div>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-orange-600">🔥</span> Inflation: The Silent Killer of Wealth
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
        While compound interest grows your balance, inflation erodes the value of that balance. In Nepal, where inflation often hovers around 6% to 8%, a 10% nominal return only provides a 2% to 4% "Real Rate of Return". This is why aggressive compounding in equity or business is often necessary to build actual wealth.
        </p>
        <div className="mt-6 p-5 bg-orange-50 border border-orange-100 rounded-xl">
        <p className="text-xs font-bold text-orange-800 uppercase mb-2">Wealth Audit:</p>
        <p className="text-sm text-orange-900 leading-relaxed">
        Rs. 1 Crore in 20 years might sound like a fortune, but at 7% average inflation, its purchasing power will be equivalent to roughly Rs. 25 Lakhs in today's terms. Use our <a href="/calculator/cagr-calculator" className="text-blue-600 underline font-bold">CAGR Auditor</a> to track your inflation adjusted performance.
        </p>
        
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Wealth Engineering Essentials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">🏢</span> Corporate FD
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Some finance companies in Nepal offer higher rates than A-Class banks. While the compounding math is the same, always audit the 'Risk Premium' before chasing the extra 1% yield.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">🏦</span> Tax Leakage
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The 5% TDS in Nepal is deducted every time interest is credited (usually quarterly . This reduces the amount of money available for the next compounding cycle.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">📊</span> Reinvestment
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        To truly experience compounding, you must reinvest your interest. Taking monthly payouts from an FD is 'Simple Interest' in practice, not compounding.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The 10-Year Head Start
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        Let's audit two investors, Rahul and Sita, both targeting 12% annual returns in the NEPSE secondary market. Let's see the impact of their starting age:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Investor A (Rahul </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Starts at Age:</span> <strong>20</strong></div>
        <div className="flex justify-between"><span>Invests for:</span> <strong>40 Years</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Multiplier:</span> <span>93.05 Times</span>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Investor B (Sita </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Starts at Age:</span> <strong>30</strong></div>
        <div className="flex justify-between"><span>Invests for:</span> <strong>30 Years</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-green-700"><span>Multiplier:</span> <span>29.96 Times</span>
        <p className="text-xs text-indigo-900/50 mt-8 italic text-center">
        Audit Observation: By starting just 10 years earlier, Rahul's corpus becomes <strong>3 times larger</strong> than Sita's, even though they invested with the same skill level. This highlights the absolute dominance of 'Time' in the compounding equation. Verify your own growth trajectory with our <a href="/calculator/compound-interest" className="text-blue-600 underline font-bold">Compound Interest Suite</a>.
        </p></div></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the NRB Unified Directives for commercial banking.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is the difference between simple and compound interest?", 
        answer: "Simple interest is calculated only on the initial principal. Compound interest is calculated on the principal plus all accumulated interest from previous periods, leading to exponential growth over time." 
      },
      { 
        question: "How often do banks in Nepal compound interest?", 
        answer: "Most commercial banks (A-Class) and development banks in Nepal compound interest on a quarterly basis. Some specific monthly savings schemes may offer monthly compounding, while some treasury bonds use semi-annual compounding." 
      },
      { 
        question: "Is compound interest taxable in Nepal?", 
        answer: "Yes. For individuals, interest income from savings and fixed deposits is subject to a 5% Tax Deducted at Source (TDS). This tax is deducted automatically by the bank every time interest is credited to your account." 
      },
      { 
        question: "What is the Rule of 72?", 
        answer: "The Rule of 72 is a quick way to estimate how many years it takes to double your money. Divide 72 by your annual interest rate. For example, at 8% interest, your money doubles in approximately 9 years." 
      },
      { 
        question: "Can I use the compound interest calculator for SIP?", 
        answer: "Yes, our calculator has a 'Periodic Contribution' feature that allows you to simulate monthly deposits alongside your initial corpus, making it perfect for auditing Mutual Fund or SIP projections." 
      },
      { 
        question: "Does compounding apply to the Nepal stock market (NEPSE)?", 
        answer: "Yes, but indirectly. In stocks, compounding happens when you reinvest your dividends to buy more shares, or when the company reinvests its profits to grow its business, leading to higher stock prices over the long term." 
      },
      { 
        question: "Which is better: monthly or quarterly compounding?", 
        answer: "Monthly compounding is technically better for the investor because interest is added to your principal more frequently, allowing it to start earning interest sooner. However, the difference is usually quite small unless the corpus is very large." 
      },
      { 
        question: "What is the real rate of return?", 
        answer: "The real rate of return is your interest rate minus the inflation rate. If you earn 10% interest but inflation is 7%, your real growth in purchasing power is only 3%." 
      },
      { 
        question: "How do I maximize compounding returns in Nepal?", 
        answer: "Start early, choose the highest frequency of compounding (quarterly or monthly), reinvest all earnings, and most importantly, stay invested for at least 10-15 years to reach the 'vertical' part of the growth curve." 
      },
      { 
        question: "What happens to compounding if I withdraw interest monthly?", 
        answer: "If you withdraw the interest as soon as it is credited, you are essentially receiving 'Simple Interest'. The compounding effect stops because the principal remains stagnant and never grows through reinvested earnings." 
      }
    ]
  },

  'simple-interest': {
    title: "Simple Interest Calculator Nepal | Institutional Byaj Lab",
    description: "Calculate linear interest growth with absolute precision. Professional guide on PxRxT math, informal lending regulations (Muluki Ain), and interest extraction logic.",
    
    howToUse: {
      steps: [
        "1. Principal Initialization: Input the original sum of money (Sawa) borrowed or invested in NPR.",
        "2. Rate Configuration: Enter the annual interest rate (Byaj Dar). Ensure you distinguish between monthly and annual rates common in informal sectors.",
        "3. Time Allocation: Define the duration of the arrangement in years, months, or days.",
        "4. Calculation Mode: Choose to calculate the 'Interest Amount' or the 'Total Maturity' (Principal) + Interest).",
        "5. Frequency Check: Note that simple interest assumes no reinvestment of earnings during the tenure.",
        "6. Tax Shield Audit: For institutional savings, account for the mandatory 5% TDS on the interest portion.",
        "7. Regulatory Compliance: Verify if the interest rate exceeds the legal limits set by the National Civil Code (Muluki Ain).",
        "8. Output Analysis: Review the total payout to understand the total cost of debt or the total yield of the investment."
      ]
    },
    
    formula: {
      title: "The Linear Yield Axiom (Standard PRT Model)",
      description: "Simple interest is calculated solely on the original principal amount for the entire duration of the loan or investment.",
      raw: "I = (P * R * T) / 100",
      variables: [
        "I = Simple Interest: The total interest amount generated over the period.",
        "P = Principal Amount: The initial sum of money (Seed capital).",
        "R = Annual Interest Rate: The percentage rate charged per year.",
        "T = Time Period: The duration in years.",
        "Worked Example (Standard Loan)",
        "Principal: Rs. 1,00,000",
        "Rate: 12% Per Annum",
        "Tenure: 2 Years",
        "Calculation: (1,00,000 * 12 * 2) / 100",
        "Simple Interest: Rs. 24,000",
        "Total Payout: Rs. 1,24,000"
      ]
    },
    
    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Institutional Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Simple interest (SI is the most fundamental mechanism of financial calculation, characterized by its linear growth trajectory. Unlike compounding models where interest earns interest, simple interest remains calculated solely on the original principal for the duration of the arrangement. In Nepal, this model is the bedrock of short term bridge financing, gold loans, and informal "Tamasuk" agreements between individuals. This institutional grade calculator is designed to provide a high precision audit of linear debt dynamics, ensuring that both borrowers and lenders adhere to the interest rate caps established by the <a href="https://moljpa.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">National Civil Code (Muluki Ain) </a>.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Wealth Strategy: For long term growth, simple interest creates a significant opportunity gap. Audit the exponential alternative using our <a href="/calculator/compound-interest" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">Compound Interest Lab</a>.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        The Opportunity Gap: Linear vs. Exponential Growth
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In a simple interest model, the interest gained in Year 1 is identical to the interest gained in Year 20. This predictability makes it ideal for specific financial products, but potentially detrimental for long term wealth preservation.
        </p>
        <p>
        When you choose simple interest, you are effectively "extracting" your earnings every period rather than "reinvesting" them. For example, a retiree who withdraws monthly interest from a fixed deposit to cover living expenses is utilizing a simple interest model in practice, even if the bank's underlying engine is compound. Understanding this "Cash Out" logic is essential for managing liquid cash flow. To model a systematic reinvestment plan, refer to our <a href="/calculator/sip-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">SIP Lab</a>.
        </p>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-red-600">📜</span> Tamasuk & The Muluki Ain Compliance
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Informal lending remains prevalent across Nepal, often documented through a "Tamasuk" (Loan Deed . The National Civil Code 2074 (Muluki Ain) provides strict guidelines to prevent usury:
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Interest Cap:</strong> The maximum interest rate permitted for informal loans between individuals is typically capped at 10% per annum.</li>
        <li><strong>No Compounding:</strong> In many legal scenarios, compounding interest on informal loans is strictly prohibited; interest can only be charged on the principal amount.</li>
        <li><strong>TDS Responsibility:</strong> If the loan is for business purposes, the borrower may be responsible for deducting a 1.5% to 5% TDS on the interest payout. Audit this liability in our <a href="/calculator/nepal-tds" className="text-blue-600 underline font-bold transition-colors">TDS Lab</a>.</li>
        </ul>
        <p className="mt-4">
        Using a professional calculator to verify these agreements protects both parties from legal disputes in the future.
        </p>
        
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-blue-400">💼</span> Strategic Use Cases: When is SI Better?
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        While compounding is the king of wealth building, simple interest has strategic advantages in specific financial scenarios common in Nepal.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">Gold & Jewelry Loans:</strong> Most formal and informal gold loans in Nepal use simple interest on a monthly or quarterly basis, making the cost of credit highly transparent.</p></div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Bridge Financing:</strong> Short term loans used for business inventory or property down payments often utilize a flat simple interest rate to simplify the exit math.</p>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Borrower Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "If you are borrowing, always prefer a simple interest model over compounding. You avoid the snowball effect where your debt grows out of control. Use our calculator to compare the total interest payable against a standard <a href="/calculator/loan-emi" className="text-blue-400 underline font-bold">EMI Loan</a>."
        </p></div>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-purple-600">⚠️</span> Penalty Interest Logic
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
        In many Nepalese contracts (including rental agreements or supply chain invoices late payment penalties are calculated as a flat simple interest on the overdue amount. For instance, a contract might specify a 2% monthly simple interest penalty for every day of delay. This tool allows you to audit these penalties to ensure they are calculated fairly and do not violate the terms of the agreement.
        </p>
        <div className="mt-6 p-5 bg-purple-50 border border-purple-100 rounded-xl">
        <p className="text-xs font-bold text-purple-800 uppercase mb-2">Audit Scenario:</p>
        <p className="text-sm text-purple-900 leading-relaxed">
        An overdue invoice of Rs. 5,00,000 has been delayed for 45 days. The contract stipulates a 12% annual simple interest penalty. The penalty amount would be (5,00,000 * 12 * (45/365  / 100 = Rs. 7,397.26.
        </p>
        
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Linear Finance Essentials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📉</span> Flat Rate
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Common in the informal sector, a 'Flat Rate' is a simple interest calculation applied to the original loan amount even as you pay it back. This makes the effective interest rate much higher than the nominal rate.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">🏦</span> Fixed Yield
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Retirees often place funds in banks and withdraw the interest monthly. This effectively turns a compound product into a simple interest fixed yield for consumption.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">📜</span> Legal Cap
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Under the National Civil Code, any interest rate charged above the market average or the statutory cap of 10% (for individuals may be legally unenforceable in a Nepalese court.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The Short-Term Bridge
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        A small business owner in Pokhara needs <strong>Rs. 10,00,000</strong> for 3 months to clear a shipment. They are offered two options. Let's audit the linear cost of credit:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Option A: 12% Annual SI</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Principal:</span> <strong>Rs. 10 Lakhs</strong></div>
        <div className="flex justify-between"><span>Time:</span> <strong>0.25 Years</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Total Interest:</span> <span>Rs. 30,000</span>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Option B: 1% Monthly SI</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Principal:</span> <strong>Rs. 10 Lakhs</strong></div>
        <div className="flex justify-between text-green-600"><span>Rate:</span> <strong>1% per month</strong>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-green-700"><span>Total Interest:</span> <span>Rs. 30,000</span>
        <p className="text-xs text-indigo-900/50 mt-8 italic text-center">
        Audit Observation: In short-term simple interest scenarios, different rate expressions (Annual vs Monthly often lead to the same cost. However, the simplicity of the linear model allows the owner to quickly calculate their net profit margin after tax using our <a href="/calculator/cagr-calculator" className="text-blue-600 underline font-bold">CAGR Auditor</a>.
        </p></div></div></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the National Civil Code (Muluki Ain) and general accounting principles.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is the formula for simple interest?", 
        answer: "The formula is (Principal) * Rate * Time) / 100. This provides the total interest earned or charged over the entire duration of the loan or investment." 
      },
      { 
        question: "Is simple interest better than compound interest?", 
        answer: "It depends on whether you are borrowing or saving. For borrowers, simple interest is generally better because you only pay interest on the original amount. For savers, compound interest is superior because it allows for exponential growth." 
      },
      { 
        question: "What is the legal maximum interest rate for informal loans in Nepal?", 
        answer: "Under the National Civil Code (Muluki Ain), informal interest rates between individuals are generally capped at 10% per annum. Any rate significantly higher than this might be considered usurious and could be challenged in a court of law." 
      },
      { 
        question: "Do banks in Nepal use simple interest?", 
        answer: "Most banks use the 'Reducing Balance' method for loans, which is a form of compound interest. However, for specific short-term products or fixed-income products where interest is withdrawn monthly, the payout behavior mimics simple interest." 
      },
      { 
        question: "What is a 'Flat Rate' of interest?", 
        answer: "A flat rate is a simple interest calculation applied to the full principal for the entire loan term, regardless of how much you have paid back. This is common in informal lending but results in a much higher effective interest rate than standard bank loans." 
      },
      { 
        question: "How do I calculate interest for a period of days?", 
        answer: "To calculate for days, use the formula (P * R * Days) / (100 * 365). This provides a precise interest calculation for bridge financing or late payment penalties." 
      },
      { 
        question: "Is simple interest taxable in Nepal?", 
        answer: "Yes. If the interest is earned through a formal financial institution (Savings, FD, or Bonds), it is subject to a 5% Tax Deducted at Source (TDS) in Nepal." 
      },
      { 
        question: "What happens if I don't pay interest on a simple interest loan?", 
        answer: "In a pure simple interest model, unpaid interest does not earn interest itself. However, it accumulates as a debt liability, and lenders may apply a separate 'Penalty Interest' (also usually simple interest) on the overdue amount." 
      },
      { 
        question: "Can I use the SI calculator for gold loans?", 
        answer: "Yes, many gold loan providers in Nepal use simple interest, often expressed as a monthly rate (e.g., 1% or 1.5% per month). You can easily audit these charges using our tool." 
      },
      { 
        question: "How does the Rule of 72 apply to simple interest?", 
        answer: "The Rule of 72 is specifically for compound interest. For simple interest, the time to double your money is simply 100 divided by the interest rate (e.g., at 10% simple interest, it takes exactly 10 years to double)." 
      }
    ]
  },

  'fd-calculator': {
    title: "Fixed Deposit (FD) Calculator Nepal 2082/83 | Interest Lab",
    description: "Calculate maturity values for fixed deposits in Nepal. Includes monthly/quarterly compounding, 5% TDS deduction, and bank interest rate comparison (A, B, C Class).",
    
    howToUse: {
      steps: [
        "1. Principal Allocation: Input the total NPR amount you intend to lock into the fixed deposit scheme.",
        "2. Interest Calibration: Enter the annual interest rate. Commercial banks in Nepal currently offer competitive rates for local and remittance accounts.",
        "3. Tenure Definition: Specify the duration in years and months. Note that longer tenures often unlock higher interest slabs.",
        "4. Compounding Cycle: Select how the bank credits interest. Most Nepalese institutions follow a quarterly compounding cycle by default.",
        "5. Tax Shield Audit: Choose your tax status. For individual residents in Nepal, a 5% TDS (Tax Deducted at Source) is mandatory.",
        "6. Maturity Projection: Review the 'Final Amount' which accounts for the principal plus the net interest after tax deductions.",
        "7. Inflation Check: Compare the projected yield against Nepal's average inflation to ensure your capital's purchasing power is preserved.",
        "8. Comparison Logic: Use the results to compare yields across different commercial, development, and finance companies in Nepal."
      ]
    },
    
    formula: {
      title: "The Compound Interest Axiom (Quarterly Accrual Model)",
      description: "Fixed deposits in Nepal typically utilize the compound interest formula, where interest is calculated on the initial principal and the accumulated interest from previous periods.",
      raw: "A = P(1 + r/n)^(nt)",
      variables: [
        "A = Maturity Amount: The total sum you receive after the tenure ends.",
        "P = Principal Amount: The initial deposit made into the bank.",
        "r = Annual Interest Rate: The decimal representation of the interest (e.g., 8% = 0.08).",
        "n = Compounding Frequency: The number of times interest is applied per year (Quarterly = 4).",
        "t = Total Tenure: The time in years.",
        "Example Calculation",
        "Deposit: Rs. 10,00,000 at 9% interest for 2 years (Quarterly Compounding)",
        "Calculation: 10,00,000 × (1 + 0.09/4)^(4 × 2)",
        "Calculation: 10,00,000 × (1.0225)^8",
        "Maturity Value: Rs. 11,94,831 (Before Tax)"
      ]
    },
    
    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Capital Preservation Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        When selecting an FD tenure, investors must be aware of the "Interest Rate Cycle". During periods of low liquidity in the banking system (often referred to as a "Liquidity Crunch" banks in Kathmandu and across Nepal aggressively hike FD rates to attract capital. Savvy investors use our <a href="/calculator/cagr-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold">CAGR Calculator</a> to determine if locking in a 1-year FD at 11% is more beneficial than a 5-year FD at 9%.
        </p>
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-red-600">📑</span> TDS Math: 5% vs. Institutional Slabs
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The Income Tax Act of Nepal mandates that banks must deduct tax at source on all interest earned from deposits. This is not a tax on your principal, but strictly on the profit generated.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Individual Residents:</strong> 5% TDS on interest. This is considered a final withholding tax for most individual earners.</li>
        <li><strong>Institutions (Companies :</strong> 15% TDS. If you are opening an FD under a private limited company in Nepal, your net yield will be significantly lower.</li>
        <li><strong>Non-Resident Nepalese (NRN :</strong> Often subject to different treaties, but usually follows the 5% rule for remittance accounts.</li>
        <li><strong>Tax Calculation:</strong> If your FD earns Rs. 1,00,000 in interest, the bank will credit Rs. 95,000 to your account and deposit Rs. 5,000 to the Inland Revenue Department (IRD) .</li>
        </ul>
        <p className="mt-4">
        To accurately plan your overall tax liability, including your salary and other investments, use our <a href="/calculator/nepal-income-tax" className="text-blue-600 hover:text-blue-800 underline font-semibold">Nepal Income Tax Calculator</a>.
        </p>
        
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-blue-400">⚡</span> Institutional Liquidity: The 90% Rule
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        One of the most powerful features of a Fixed Deposit in Nepal is the ability to access liquidity without breaking the deposit. Under NRB regulations, banks can provide a "Loan Against FD" for up to 90% of the principal amount.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">Interest Spread:</strong> The loan interest is typically only 1.5% to 2% higher than your FD rate. If you earn 10% on your FD, you can borrow at 12%.</p></div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Instant Credit:</strong> Because the FD acts as collateral, there is no need for property valuation or lengthy CIB (Credit Information Bureau reports.</p>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Wealth Comparison</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Breaking an FD early might cost you 2% in penalties on the entire tenure interest. Taking a loan for a 3-month emergency might only cost you 0.5% in net interest spread. Always calculate the cost of breaking vs. borrowing."
        </p></div>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-green-600">🧮</span> Step-by-Step Maturity Audit
        </h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
        Let's model a deposit of <strong>Rs. 5,00,000</strong> at <strong>10% annual interest</strong> for <strong>3 years</strong> with <strong>Quarterly Compounding</strong>.
        </p>
        <div className="space-y-6">
        <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-800 shadow-sm">1
        <div className="flex-grow pt-2">
        <strong className="text-slate-900 block mb-1">Determine Periodic Rate (r/n </strong>
        <p className="text-sm text-slate-600 mb-2">Since interest is compounded quarterly, we divide the annual rate by 4.</p>
        <code className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 text-blue-700 font-mono text-sm inline-block">10% ÷ 4 = 2.5% (0.025 </code>
        <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-800 shadow-sm">2
        <div className="flex-grow pt-2">
        <strong className="text-slate-900 block mb-1">Total Compounding Periods (n) × t </strong>
        <p className="text-sm text-slate-600 mb-2">4 quarters per year for 3 years.</p>
        <code className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 text-blue-700 font-mono text-sm inline-block">4 × 3 = 12 Periods</code>
        <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-800 shadow-sm">3
        <div className="flex-grow pt-2">
        <strong className="text-slate-900 block mb-1">Calculate Final Maturity</strong>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-2">
        <div className="font-mono text-sm text-slate-800 space-y-2">
        <p>A = 5,00,000 × (1 + 0.025 ^12</p>
        <p>A = 5,00,000 × 1.34488</p>
        <p className="text-lg font-black text-green-700">Gross Maturity: Rs. 6,72,444</p>
        <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center font-black text-red-700 shadow-sm">4
        <div className="flex-grow pt-2">
        <strong className="text-slate-900 block mb-1">Apply 5% TDS (Individual </strong>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
        <p className="text-[10px] text-red-600 uppercase font-black tracking-widest mb-1">Total Interest</p>
        <p className="font-black text-slate-900">Rs. 1,72,444</p>
        <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
        <p className="text-[10px] text-red-600 uppercase font-black tracking-widest mb-1">Tax Deducted (5% </p>
        <p className="font-black text-red-600">Rs. 8,622</p>
        <div className="mt-4 p-5 bg-green-50 border border-green-200 rounded-xl">
        <p className="text-sm font-bold text-green-800">Net Take-Home Maturity: Rs. 6,63,822</p>
        
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Institutional Wealth Optimization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">🧱</span> FD Laddering
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Instead of locking Rs. 10 Lakhs in one 5-year FD, split it into five FDs of Rs. 2 Lakhs with tenures of 1, 2, 3, 4, and 5 years. As each FD matures, reinvest it for 5 years. This ensures annual liquidity and protects you from interest rate fluctuations.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">👵</span> Senior Citizen Slabs
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Most banks in Nepal (Nabil, NIC Asia, Global IME offer an additional 0.5% to 1% interest for citizens over the age of 60. Always open FD accounts in the name of a senior family member to maximize the institutional yield.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-500">📦</span> Premature Penalty
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        If you break an FD early in Nepal, banks usually pay interest at the rate applicable to the period for which the deposit was actually held, minus a penalty (typically 1% to 2% . Use our <a href="/calculator/fd-calculator" className="text-blue-600 underline font-bold">FD Calculator</a> to simulate these costs.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The Remittance Advantage
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        A Nepalese professional working in the UAE sends <strong>Rs. 20,00,000</strong> back home. They are debating between a standard Savings account (4% and a Remittance Fixed Deposit (10% . Let's audit the 5-year outcome:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Option A: Standard Savings</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Principal:</span> <strong>Rs. 20 Lakhs</strong></div>
        <div className="flex justify-between"><span>Interest (5yr :</span> <strong>Rs. 4.4 Lakhs</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Final Value:</span> <span>Rs. 24.4 Lakhs</span>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Option B: Remittance FD</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Principal:</span> <strong>Rs. 20 Lakhs</strong></div>
        <div className="flex justify-between text-green-600"><span>Interest (5yr :</span> <strong>Rs. 12.8 Lakhs</strong>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-green-700"><span>Final Value:</span> <span>Rs. 32.8 Lakhs</span>
        <p className="text-xs text-indigo-900/50 mt-8 italic">
        Audit Observation: By simply switching from savings to a remittance fixed deposit, the investor creates an additional <strong>Rs. 8.4 Lakhs</strong> in wealth. This highlights the "Opportunity Cost" of keeping large sums in low-yield accounts in Nepal. Ensure you are using the most accurate <a href="/calculator/nepal-stocks" className="text-blue-600 hover:text-blue-800 underline font-semibold">Stock Market tools</a> to balance your portfolio between fixed income and equity.
        </p></div></div></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the Nepal Rastra Bank Unified Directives and the Income Tax Act 2058.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "Which bank provides the highest FD interest rate in Nepal?", 
        answer: "Interest rates change monthly based on NRB directives and market liquidity. Generally, development banks (B-class) and finance companies (C-class) offer slightly higher rates than commercial banks (A-class) to attract deposits. You should check the current month's interest rate sheet published on the respective bank's website." 
      },
      { 
        question: "Is FD interest compounded monthly or quarterly in Nepal?", 
        answer: "By default, most commercial banks in Nepal calculate and credit interest on a quarterly basis. However, some special schemes allow for monthly interest credit, which is ideal for senior citizens requiring regular income. Note that monthly credit may result in a slightly lower effective annual yield compared to quarterly compounding." 
      },
      { 
        question: "How is the 5% TDS calculated on my FD?", 
        answer: "The 5% TDS is calculated only on the interest earned, not on the principal amount. For example, if you deposit Rs. 1,00,000 and earn Rs. 10,000 in interest, the bank will deduct 5% of Rs. 10,000 (which is Rs. 500) as tax and credit the remaining Rs. 9,500 to your account." 
      },
      { 
        question: "What is the minimum tenure for a Fixed Deposit in Nepal?", 
        answer: "For individual accounts, the minimum tenure is usually 3 months. For institutional accounts, the minimum tenure can be as short as 1 month. Recently, some banks have introduced 'Flexi FDs' which offer more liquidity while maintaining higher interest rates." 
      },
      { 
        question: "Can I open an FD account online in Nepal?", 
        answer: "Yes, almost all major commercial banks in Nepal like NIC Asia, Nabil, and Global IME allow you to open a fixed deposit account through their mobile banking app or internet banking portal, provided you already have a savings account with them." 
      },
      { 
        question: "What happens to my FD after the maturity date?", 
        answer: "At the time of opening, you can choose between 'Automatic Renewal' or 'Credit to Account'. If you choose automatic renewal, the bank will renew the principal (and sometimes the interest) for the same tenure at the prevailing interest rate. If you choose credit to account, the total maturity amount will be moved to your savings account." 
      },
      { 
        question: "Is there any risk in opening an FD in a finance company?", 
        answer: "Finance companies are regulated by the NRB, but they generally have a lower capital base than commercial banks. However, as long as your total deposit is under Rs. 5,00,000, it is protected by the Deposit and Credit Guarantee Fund (DCGF) regardless of the institution type." 
      },
      { 
        question: "What is the 'Effective Annual Yield' of an FD?", 
        answer: "The effective annual yield is higher than the nominal interest rate because of compounding. For example, a 10% interest rate compounded quarterly has an effective annual yield of 10.38%. Our calculator shows you the actual maturity value based on these compounding cycles." 
      },
      { 
        question: "Can I add more money to an existing Fixed Deposit?", 
        answer: "No, once an FD is opened, you cannot add additional principal to the same account. You would need to open a new FD account for the additional amount. However, 'Recurring Deposits' (RD) allow for monthly additions, though they are less common in Nepal than standard FDs." 
      },
      { 
        question: "Is the interest earned on FD considered income in Nepal?", 
        answer: "Yes, it is considered 'Income from Investment'. However, for individuals, the 5% TDS is generally a final withholding tax, meaning you do not need to include this interest in your total taxable income when filing your annual tax return (unless your total income exceeds certain thresholds)." 
      }
    ]
  },


  'cagr-calculator': {
    title: "CAGR & Investment Growth Auditor Nepal | Institutional Yield Lab",
    description: "Professional systematic resource for auditing investment growth in Nepal. 1500+ words on NEPSE performance benchmarking, geometric mean logic, and real CAGR vs inflation.",
    
    howToUse: {
      steps: [
        "1. Initial Corpus Entry: Input the starting value of your investment (Beginning Market Value) in NPR.",
        "2. Final Valuation: Enter the current or projected ending value (Ending Market Value) of the asset.",
        "3. Duration Mapping: Define the total time horizon in years. CAGR is intended for periods of 1 year or longer.",
        "4. Geometric Growth Audit: Review the annualized return, which 'smooths out' the year-on-year volatility.",
        "5. Inflation Calibration: Adjust for Nepal's consumer price index (CPI) to see your real wealth growth.",
        "6. Benchmarking: Compare your results against the historical performance of the NEPSE Index or Fixed Deposits.",
        "7. Portfolio Rebalancing: Use the audit to determine if an asset is underperforming relative to your long-term goals.",
        "8. Future Projections: Estimate the future value of your corpus based on the historical CAGR of specific stock sectors."
      ]
    },
    
    formula: {
      title: "The Geometric Mean Axiom (Annualized Returns)",
      description: "CAGR is the most accurate way to measure returns for volatile assets like stocks in Nepal, as it accounts for the compounding effect over multiple years.",
      raw: "CAGR = [(EV / BV)^(1 / n)] - 1",
      variables: [
        "<strong>EV = Ending Value</strong>: The final market value of the investment.",
        "<strong>BV = Beginning Value</strong>: The initial capital invested.",
        "<strong>n = Number of Years</strong>: The total duration of the investment period.",
        "<strong>CAGR</strong>: The constant annual rate that would result in the ending value from the beginning value."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-300">
        
        <div className="bg-[#1a1a2e] border-l-4 border-green-500 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-green-400 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Performance Audit Executive Summary
        </h2>
        <p className="text-white text-base leading-relaxed">
        In the high-variance environment of the <strong>Nepal Stock Exchange (NEPSE) </strong>, calculating simple percentage growth often masks the true efficiency of a portfolio. The <a href="/calculator/cagr-calculator" className="text-green-400 hover:text-green-300 underline font-bold transition-colors">CAGR Auditor</a> is the definitive tool for institutional investors and retail traders to determine the "Geometric Mean" of their investments. Unlike simple average returns, CAGR accounts for the compounding effect, providing a single, smoothed annual growth figure that can be directly compared against alternative assets like <a href="/calculator/fd-calculator" className="text-green-400 underline font-bold transition-colors">Fixed Deposits</a> or <a href="/calculator/sip-calculator" className="text-green-400 underline font-bold transition-colors">SIPs</a>. By auditing your CAGR against Nepal's prevailing inflation rates, you can move beyond nominal gains and understand the real expansion of your purchasing power.
        <br/><br/>
        <span className="text-sm text-slate-400">
        Strategic Portfolio Audit: A portfolio that grows 50% in year one and drops 50% in year two has a 0% simple average return, but a negative CAGR. Always use geometric math for long-term wealth mapping.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-white mb-6">
        1. Smoothing Out Volatility: Why CAGR Matters in NEPSE
        </h3>
        <div className="prose prose-slate max-w-none text-slate-300 leading-relaxed space-y-4">
        <p>
        Stock prices in Nepal are heavily influenced by market liquidity, central bank policies (NRB) and sectoral shifts. A hydropower stock might double in value over six months but then remain stagnant for three years.
        </p>
        <p>
        CAGR is essential because it eliminates the "noise" of intermediate fluctuations. It treats the investment as if it grew at a constant, steady rate every year. This is particularly useful for auditing long-term holdings in commercial banks, insurance companies, or mutual funds where dividend reinvestment also plays a role in total wealth accumulation.
        </p>
        
        
        <section className="bg-[#16213e] border border-green-900/30 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
        <span className="text-green-500">📉</span> Real CAGR: The Inflation-Adjusted Truth
        </h3>
        <div className="prose prose-slate max-w-none text-slate-300 leading-relaxed space-y-4">
        <p>
        Earning a 10% CAGR in a year where inflation in Nepal is 8% results in a "Real" growth rate of only 2%. Institutional investors always calculate the real rate of return to ensure they are actually building wealth, not just keeping pace with rising costs.
        </p>
        <div className="overflow-hidden rounded-xl border border-green-900/50 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-[#1a1a2e]">
        <tr>
        <th className="p-4 font-black text-white uppercase">Investment Type</th>
        <th className="p-4 font-black text-white uppercase">Typical Nominal CAGR</th>
        <th className="p-4 font-black text-white uppercase">Real Purchasing Power</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-green-900/30">
        <tr><td className="p-4 font-bold text-white">Savings Account</td><td className="p-4 text-red-400">4% - 6%</td><td className="p-4">Negative Growth</td></tr>
        <tr><td className="p-4 font-bold text-white">Fixed Deposit</td><td className="p-4 text-amber-400">8% - 11%</td><td className="p-4 text-green-400">Low Positive (1-3% </td></tr>
        <tr><td className="p-4 font-bold text-white">Diversified NEPSE</td><td className="p-4 text-green-400">12% - 15%</td><td className="p-4 text-green-500 font-bold">High Positive (5%+ </td></tr>
        </tbody>
        </table>
        
        
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 border border-slate-700 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-green-400">📊</span> Benchmarking & Generating Alpha
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        To judge the quality of your stock picks, you must compare your portfolio's CAGR against the benchmark.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">NEPSE Index CAGR:</strong> This is the 'Market Return'. If you can't beat this over 5 years, you might be better off in a mutual fund.</p></div>
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Generating Alpha:</strong> Alpha is the excess return of your portfolio over the benchmark. A positive Alpha indicates superior stock selection or timing.</p></div>
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold">3
        <p className="text-sm text-slate-300"><strong className="text-white">Risk-Adjusted Return:</strong> High CAGR with high volatility is riskier than moderate CAGR with low volatility. Audit your risk in our <a href="/calculator/compound-interest" className="text-green-400 underline font-bold">Growth Engine</a>.</p>
        <div className="bg-black/40 border border-slate-700 p-6 rounded-xl">
        <h4 className="text-xs font-black text-green-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "In Nepal, bonus shares and right shares are common. When calculating your 'Ending Value' for CAGR, ensure you include the current market value of all extra shares received. This 'Total Return' CAGR is the only metric that reveals the true success of your investment strategy. Map these returns into your <a href="/calculator/nepal-income-tax" className="text-green-400 underline font-bold">Tax Audit</a> to see your net-of-tax CAGR."
        </p></div>
        
        
        <section>
        <h3 className="text-2xl font-black text-white mb-6">
        Growth Auditing Silos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#16213e] p-6 rounded-2xl border border-green-900/30 shadow-sm hover:border-green-500 transition-all">
        <h4 className="font-black text-white mb-3 flex items-center gap-2">
        <span className="text-green-500">🧱</span> Geometric Mean
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
        CAGR is technically a geometric mean. It accounts for the fact that a 50% loss requires a 100% gain to break even, a reality often ignored by simple averages.
        </p>
        <div className="bg-[#16213e] p-6 rounded-2xl border border-green-900/30 shadow-sm hover:border-blue-500 transition-all">
        <h4 className="font-black text-white mb-3 flex items-center gap-2">
        <span className="text-blue-500">📊</span> Yield Gaps
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
        Compare the CAGR of Hydropower vs. Commercial Banks over the last 10 years to identify which sector has historically provided better risk-adjusted growth in Nepal.
        </p>
        <div className="bg-[#16213e] p-6 rounded-2xl border border-green-900/30 shadow-sm hover:border-red-500 transition-all">
        <h4 className="font-black text-white mb-3 flex items-center gap-2">
        <span className="text-red-500">📉</span> Variance Drag
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
        Higher volatility leads to lower CAGR for the same average return. This 'Variance Drag' is why consistent 10% returns often beat alternating +40% and -20% years.
        </p>
        
        
        <section className="bg-[#0f172a] border border-green-900/30 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-white mb-4">
        Strategic Case Study: The NEPSE Portfolio Audit
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
        Consider an investor who placed <strong>Rs. 5,00,000</strong> in a diversified portfolio in 2018. By 2026, after various bonus issues and market cycles, the portfolio is worth <strong>Rs. 12,00,000</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-sm">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Absolute Growth View</h4>
        <div className="space-y-2 text-sm text-slate-300">
        <div className="flex justify-between"><span>Total Profit:</span> <strong>Rs. 7,00,000</strong></div>
        <div className="flex justify-between"><span>Total Return:</span> <strong>140%</strong></div>
        <div className="flex justify-between border-t border-slate-700 pt-2 mt-2 font-bold text-white"><span>Time Period:</span> <span>6 Years</span>
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-green-900/50 shadow-md transform md:scale-105">
        <h4 className="text-xs font-black text-green-400 uppercase tracking-widest mb-4">Institutional CAGR View</h4>
        <div className="space-y-2 text-sm text-slate-300">
        <div className="flex justify-between"><span>Nominal CAGR:</span> <strong>15.71%</strong></div>
        <div className="flex justify-between"><span>Avg Inflation:</span> <strong>~7.50%</strong></div>
        <div className="flex justify-between border-t border-green-900/50 pt-2 mt-2 font-bold text-green-400"><span>Real CAGR:</span> <span>~8.21%</span>
        <p className="text-xs text-slate-500 mt-8 italic text-center">
        Audit Observation: While a 140% gain sounds massive, the 15.71% CAGR reveals the actual annual efficiency. Comparing this against the 10-12% offered by Fixed Deposits shows that the investor has generated a healthy "Equity Risk Premium" for their efforts. Audit your own alpha with our <a href="/calculator/cagr-calculator" className="text-green-400 underline font-bold">CAGR Lab</a>.
        </p></div></div></div></div></div></div></div>
        
        
        <div className="pt-10 border-t border-slate-800 text-center mt-12">
        <p className="text-[11px] text-slate-500 italic bg-[#1a1a2e] inline-block px-6 py-2 rounded-full border border-green-900/30">
        Institutional Compliance: Last updated Baishakh 2083 (May 2026 . Calculations strictly conform to geometric mean standards used by global financial analysts and SEBON-registered mutual funds.
        
        
        
        </p>
        </div>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What does CAGR stand for?", 
        answer: "CAGR stands for Compound Annual Growth Rate. It is the mean annual growth rate of an investment over a specified period of time longer than one year." 
      },
      { 
        question: "Why is CAGR better than simple average returns?", 
        answer: "Simple average returns do not account for the compounding effect. For example, if you lose 50% one year and gain 50% the next, your simple average is 0%, but your actual investment is down by 25%. CAGR accurately reflects this loss." 
      },
      { 
        question: "How do I calculate CAGR for stocks in Nepal?", 
        answer: "You need the initial purchase amount, the current market value (including the value of any bonus or right shares), and the number of years you've held the shares. Input these into our auditor for an instant result." 
      },
      { 
        question: "What is a good CAGR for a NEPSE portfolio?", 
        answer: "Historically, the NEPSE index has provided a long-term CAGR of around 10% to 15%. A portfolio CAGR that consistently beats the market (generating 'Alpha') is considered excellent performance." 
      },
      { 
        question: "Does CAGR include dividends?", 
        answer: "Standard price-based CAGR does not include dividends. To calculate your 'Total Return CAGR', you must add all received cash dividends back into your 'Ending Value' before running the calculation." 
      },
      { 
        question: "Can CAGR be negative?", 
        answer: "Yes. If your investment's final value is lower than your initial investment, the CAGR will be negative, representing an annualized loss of capital." 
      },
      { 
        question: "What is the 'Real CAGR'?", 
        answer: "The Real CAGR is your nominal growth rate minus the rate of inflation. It tells you how much your actual purchasing power has increased, which is the most important metric for long-term wealth building." 
      },
      { 
        question: "How does the holding period affect CAGR?", 
        answer: "Because of the 1/n exponent in the formula, the impact of a single very good or very bad year is diluted over a longer holding period. CAGR is best used for evaluating long-term performance (3-10 years)." 
      },
      { 
        question: "Is CAGR useful for comparing FDs and Stocks?", 
        answer: "Absolutely. Since FDs offer a fixed annual interest rate (which is essentially their CAGR), you can directly compare that figure against your stock portfolio's CAGR to see if the extra risk of the market was worth it." 
      },
      { 
        question: "Why does my WACC affect my CAGR audit?", 
        answer: "Your WACC (Weighted Average Cost of Capital) is your 'Beginning Value' in the CAGR formula. If you don't use an accurate WACC (accounting for commissions and bonus issues), your calculated CAGR will be incorrect." 
      }
    ]
  },
  'nepal-land': {
    title: "Nepal Land Area Converter 2082/83 | Ropani-Bigha-Square Feet Lab",
    description: "Institutional land converter for Nepal. Convert between Ropani-Aana-Paisa-Daam and Bigha-Kattha-Dhur. Precision square feet/meter mapping for Malpot compliance.",
    howToUse: {
      steps: [
        "1. System Selection: Choose between the 'Hilly' system (Ropani-Aana) or 'Terai' system (Bigha-Kattha).",
        "2. Unit Selection: Define your primary input unit (e.g., Ropani or Bigha) to initialize the engine.",
        "3. Numeric Entry: Input the exact area value from your Lalpurja (Land Ownership Certificate).",
        "4. Fractional Audit: Use the secondary fields (Aana, Paisa, Daam) for precise hilly land calculations.",
        "5. Automated Conversion: Observe the real-time mapping to Square Meters, Square Feet, and Anna/Bigha equivalents.",
        "6. Malpot Valuation: Cross-reference the area with the Government's minimum valuation per Ropani/Bigha.",
        "7. Compliance Check: Ensure the area matches the legal boundaries defined in your cadastral map (Naxa).",
        "8. Output Export: Save or copy the converted results for use in sales deeds or banking mortgage applications."
      ]
    },
    formula: {
      title: "The Geospatial Conversion Axiom",
      description: "Nepal uses two distinct land measurement systems. The Hilly system is based on Ropani (5476 sq. ft), while the Terai system is based on Bigha (72900 sq. ft).",
      raw: "Area (Sq. Ft) = (Ropani × 5476) + (Aana × 342.25) + (Paisa × 85.56) + (Daam × 21.39)",
      variables: [
        "1 Ropani = 16 Aana = 64 Paisa = 256 Daam",
        "1 Bigha = 20 Kattha = 400 Dhur",
        "1 Bigha = 13.31 Ropani = 6772.63 Sq. Meters",
        "1 Ropani = 5476 Sq. Ft | 1 Aana = 342.25 Sq. Ft",
        "1 Kattha = 3645 Sq. Ft | 1 Dhur = 182.25 Sq. Ft"
      ]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Institutional Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Land measurement in Nepal is a dual-system landscape governed by the <a href="https://dos.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Department of Survey (Napi Bibhag </a>. Understanding the nuance between the Ropani system of the Hilly regions and the Bigha system of the Terai is critical for real estate transactions, bank valuations, and inheritance legalities. This professional-grade converter provides absolute precision in mapping traditional units to global standards like Square Meters and Square Feet, ensuring your asset audit for the fiscal year 2082/83 is legally sound.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Asset Strategy: Before finalizing a sale, audit the registration costs using our <a href="/calculator/property-registration" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">Registration Lab</a> to ensure full Malpot compliance.
        </span>
        </p>
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        The Hilly System: Ropani-Aana-Paisa-Daam
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In Kathmandu and most hilly districts, land is measured using the Ropani system. It is a highly fractional system designed to manage small, irregular plots common in terraced topography and urban settlements.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Ropani:</strong> The primary unit, equivalent to 5476 square feet.</li>
        <li><strong>Aana:</strong> 1/16th of a Ropani (342.25 sq. ft . This is the standard unit for residential plots in Kathmandu.</li>
        <li><strong>Paisa:</strong> 1/4th of an Aana (85.56 sq. ft .</li>
        <li><strong>Daam:</strong> 1/4th of a Paisa (21.39 sq. ft .</li>
        </ul>
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-orange-600">🚜</span> The Terai System: Bigha-Kattha-Dhur
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-6">
        The Terai region utilizes a larger-scale system derived from ancestral agricultural practices. A Bigha is significantly larger than a Ropani, reflecting the flat, expansive nature of the plains.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-2">Bigha</h4>
        <p className="text-xs text-orange-800">1 Bigha = 20 Kattha = 72,900 Sq. Ft (approx 1.6 acres .</p>
        <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-2">Kattha</h4>
        <p className="text-xs text-orange-800">1 Kattha = 20 Dhur = 3,645 Sq. Ft.</p>
        <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-2">Dhur</h4>
        <p className="text-xs text-orange-800">1 Dhur = 182.25 Sq. Ft.</p>
        
        <section><h3 className="text-2xl font-black text-slate-900 mb-6">
        Cross-System Mapping & Valuation
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-8">
        When buying land in a different region, understanding the conversion between Ropani and Bigha is essential for value comparison. A plot of 10 Kattha in Chitwan is nearly equivalent to 6 Ropani and 10 Aana in Kathmandu.
        </p>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-900">
        <tr>
        <th className="p-4">Traditional Unit</th>
        <th className="p-4">Sq. Feet</th>
        <th className="p-4">Sq. Meters</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-600">
        <tr><td className="p-4 font-bold">1 Bigha</td><td className="p-4">72,900</td><td className="p-4">6,772.63</td></tr>
        <tr><td className="p-4 font-bold">1 Ropani</td><td className="p-4">5,476</td><td className="p-4">508.72</td></tr>
        <tr><td className="p-4 font-bold">1 Kattha</td><td className="p-4">3,645</td><td className="p-4">338.63</td></tr>
        <tr><td className="p-4 font-bold">1 Aana</td><td className="p-4">342.25</td><td className="p-4">31.80</td></tr>
        </tbody>
        </table>
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Geospatial Audit: Last updated Baishakh 2083 (May 2026 . Calculations strictly conform to the Department of Survey's standard conversion tables and IRD valuation protocols.
        
        
        </p>
        </div>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { question: "How many Aana are in 1 Ropani?", answer: "There are exactly 16 Aana in 1 Ropani. Each Aana is further divided into 4 Paisa." },
      { question: "How many Kattha are in 1 Bigha?", answer: "There are 20 Kattha in 1 Bigha. Each Kattha is divided into 20 Dhur." },
      { question: "What is the size of 1 Aana in square feet?", answer: "One Aana is equal to exactly 342.25 square feet." },
      { question: "Is 1 Bigha larger than 1 Ropani?", answer: "Yes, significantly. 1 Bigha is approximately 13.31 Ropani." },
      { question: "How many square meters is 1 Ropani?", answer: "1 Ropani is equal to 508.72 square meters." },
      { question: "What is the smallest unit in the Hilly land system?", answer: "The smallest unit is the 'Daam'. 4 Daam make 1 Paisa, and 256 Daam make 1 Ropani." },
      { question: "What is 1 Kattha in square feet?", answer: "1 Kattha is equal to 3,645 square feet." },
      { question: "Which system is used in Kathmandu?", answer: "Kathmandu uses the Ropani-Aana-Paisa-Daam system." },
      { question: "Can I convert Aana directly to Dhur?", answer: "Yes, our calculator handles this. 1 Aana is approximately 1.88 Dhur." },
      { question: "What is the government's minimum valuation based on?", answer: "Valuation is usually calculated per Ropani (Hilly) or per Kattha (Terai), depending on the district and road access." }
    ]
  },

  'nepal-salary': {
    title: "Salary Calculator Nepal | Institutional Payroll Auditor",
    description: "Calculate net take-home salary with absolute precision. Professional guide on SSF, PF, CIT, and Income Tax slabs for FY 2082/83 in Nepal.",
    howToUse: {
      steps: [
        "1. Gross Entry: Input your Monthly or Annual Gross Salary in NPR.",
        "2. Marital Status: Select 'Single' or 'Married' for tax threshold calibration.",
        "3. SSF Toggle: Choose if your employer is registered with the Social Security Fund (31%).",
        "4. Retirement Fund: Input your Provident Fund and CIT contributions.",
        "5. Insurance Credits: Enter your annual life and health insurance premiums.",
        "6. Allowance Mapping: Separate taxable allowances from non-taxable reimbursements.",
        "7. Women's Rebate: Toggle the female tax rebate if applicable (10%).",
        "8. Output Audit: Review the detailed monthly and annual tax liability breakdown."
      ]
    },
    formula: {
      title: "The Net Disbursement Axiom",
      description: "Net Salary is the liquid amount remaining after subtracting statutory retirement contributions and monthly income tax from your gross earnings.",
      raw: "Net Salary = Gross - (SSF/PF + CIT) - Income Tax",
      variables: [
        "Net Salary = Your monthly take-home cash flow.",
        "SSF Deduction = 11% of Basic Salary (if registered).",
        "Income Tax = Calculated based on progressive IRD slabs (1% to 39%)."
      ]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Payroll Intelligence Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Navigating the payroll landscape in Nepal requires a precise understanding of the latest fiscal mandates. From the progressive income tax slabs of the Inland Revenue Department (IRD) to the comprehensive Social Security Fund (SSF contributions, every deduction impacts your final take-home pay. This institutional <a href="/calculator/nepal-salary" className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors">Salary Auditor</a> is designed to provide high precision results for the fiscal year 2082/83. Whether you are an employee auditing your payslip or an HR professional verifying payroll compliance, our engine ensures all statutory credits, including insurance rebates and marital status adjustments, are perfectly calibrated.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Tax Strategy: Strategic investments in CIT or provident funds can significantly reduce your taxable income. Audit your savings potential in our <a href="/calculator/nepal-income-tax" className="text-indigo-600 hover:text-indigo-800 underline font-bold transition-colors">Tax Lab</a>.
        </span>
        </p>
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Employment Standards & Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">⏳</span> Overtime Rule
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Employees are entitled to overtime pay at 1.5 times their regular hourly rate if they work beyond 8 hours a day or 48 hours a week.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">⚖️</span> Probation Period
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The standard probation period is 6 months. After successful completion, the employee must be confirmed, and all permanent benefits begin to accrue.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: Private Sector Payroll Audit
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        A mid-level software engineer in Kathmandu is offered a gross salary of <strong>Rs. 1,20,000</strong> per month. Let's compare their take-home under SSF vs a traditional firm with no benefits:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Firm A: SSF Registered</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Employee SSF (11% :</span> <strong>Rs. 13,200</strong></div>
        <div className="flex justify-between"><span>Net Tax:</span> <strong>Rs. 11,450</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Take-Home:</span> <span>Rs. 95,350</span>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Firm B: No Benefits</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Deductions:</span> <strong>None</strong></div>
        <div className="flex justify-between text-green-600"><span>Net Tax:</span> <strong>Rs. 16,800</strong>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-green-700"><span>Take-Home:</span> <span>Rs. 1,03,200</span>
        <p className="text-xs text-indigo-900/50 mt-8 italic text-center">
        Audit Observation: While Firm B offers Rs. 7,850 more in liquid cash, the employee in Firm A is accumulating <strong>Rs. 37,200</strong> every month in their retirement fund (including the 20% employer contribution . Firm A offers a vastly superior total compensation package. Reinvest your surplus into our <a href="/calculator/cagr-calculator" className="text-blue-600 underline font-bold">Growth Auditor</a> to see the long-term impact.
        </p></div></div></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the Income Tax Act 2058 and Social Security Act 2075.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What are the income tax slabs for FY 2082/83 in Nepal?", 
        answer: "The slabs start at 1% for the first Rs. 5 Lakh (Single) or Rs. 6 Lakh (Married). Subsequent income is taxed at 10%, 20%, 30%, 36%, and 39% respectively." 
      },
      { 
        question: "What is the employee contribution rate for SSF?", 
        answer: "Employees contribute 11% of their basic salary to the Social Security Fund, while employers contribute 20%, making it a total of 31%." 
      },
      { 
        question: "Is the 1% Social Security Tax mandatory for everyone?", 
        answer: "Yes, for the first slab of income. However, employees contributing to the Social Security Fund (SSF) are currently exempt from this 1% tax." 
      },
      { 
        question: "How much tax rebate do women get in Nepal?", 
        answer: "Female taxpayers in Nepal are entitled to a 10% rebate on their total calculated income tax liability from salary income." 
      },
      { 
        question: "How much can I invest in CIT to save tax?", 
        answer: "You can invest up to 1/3rd of your taxable income or Rs. 3,00,000 per year, whichever is lower, to reduce your taxable salary." 
      },
      { 
        question: "Are allowances like fuel and communication taxable?", 
        answer: "If they are paid as a fixed monthly allowance, they are taxable. If they are paid on an actual reimbursement basis against valid bills, they are generally non-taxable." 
      },
      { 
        question: "What is the tax credit for life insurance premiums?", 
        answer: "You can claim a tax credit on life insurance premiums paid up to a maximum of Rs. 40,000 per year." 
      },
      { 
        question: "How is the Dashain bonus taxed?", 
        answer: "The Dashain bonus is treated as part of your total annual income and is taxed according to your applicable income tax slabs." 
      },
      { 
        question: "Can I choose not to join the SSF?", 
        answer: "For employees in the formal private sector where the company is registered with SSF, participation is mandatory as per the Social Security Act." 
      },
      { 
        question: "What happens if I have multiple sources of income?", 
        answer: "You must disclose all sources of income (salary, rent, dividends) in your annual tax return. Our calculator focuses on salary, but you can audit other sources in our Income Tax Lab." 
      }
    ]
  },
  'nepal-stocks': {
    title: "NEPSE Stock Calculator | Broker Commission & Profit Lab",
    description: "The definitive NEPSE trading utility for Nepal. Calculate broker commissions, SEBON fees, DP charges, and CGT with 1500+ words of depth and holding-period logic.",
    howToUse: {
      steps: [
        "Transaction Definition: Choose between 'Buy' or 'Sell' to apply the correct fee structure.",
        "Share Data Entry: Input the number of shares and the transaction price per share.",
        "Commission Slab: The engine automatically applies SEBON-mandated broker commission (0.27% to 0.36%).",
        "Tax Calibration: For sell transactions, select your holding period (Short Term 7.5% vs Long Term 5%).",
        "WACC Integration: Input your WACC price for sell orders to calculate accurate Capital Gains Tax (CGT).",
        "Institutional Breakdown: View the net amount receivable or payable including DP fees and SEBON charges."
      ]
    },
    formula: {
      title: "The NEPSE Transaction Algorithm",
      description: "NEPSE trading involves a multi-layered fee structure. Our engine aggregates these costs sequentially: Broker Commission + SEBON Fee (0.015%) + DP Fee (Rs. 25) + CGT (on profits).",
      raw: "Net Profit = (Selling Price - Buying Price) - (Buy Costs + Sell Costs) - CGT"
    },
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-300">
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: NEPSE Trading & Commission in Nepal</h2>
        <div className="bg-[#1a1a2e] border-2 border-[#1a73e8]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a73e8] rounded-full blur-[120px] opacity-10" />
        <h4 className="text-[#4fc3f7] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Stock Market Masterclass</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        <a href="#commissions" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>01.</span> SEBON Broker Commission Tiers</a>
        <a href="#cgt" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>02.</span> Capital Gains Tax (5% vs 7.5% </a>
        <a href="#wacc" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>03.</span> WACC Calculation Theory</a>
        <a href="#fees" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>04.</span> DP & SEBON Regulatory Fees</a>
        <a href="#bonus" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>05.</span> Bonus & Right Share Adjustment</a>
        <a href="#holding" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>06.</span> Holding Period Verification Logic</a>
        <a href="#meroshare" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>07.</span> MeroShare & TMS Integration</a>
        <a href="#dividends" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>08.</span> Cash Dividend Taxation (5% TDS </a>
        <a href="#strategies" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>09.</span> Trading Psychology & Exit Disciplines</a>
        <section id="commissions" className="mb-16">
        <h3 className="text-2xl font-black text-[#202124] mb-6">1. SEBON Broker Commission Tiers</h3>
        <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
        Brokerage costs in Nepal are strictly regulated by the <strong>Securities Board of Nepal (SEBON </strong>. The commission rate is progressive, meaning the percentage you pay decreases as your transaction volume increases.
        </p>
        <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
        <table className="w-full text-left text-xs bg-white">
        <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
        <tr>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Transaction Volume</th>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Commission Rate</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-[#dadce0]">
        <tr>
        <td className="p-5 text-[#3c4043]">Up to Rs. 50,000</td>
        <td className="p-5 text-[#1a73e8] font-bold">0.36%</td>
        </tr>
        <tr>
        <td className="p-5 text-[#3c4043]">Rs. 50,001 to Rs. 5,00,000</td>
        <td className="p-5 text-[#3c4043]">0.33%</td>
        </tr>
        <tr>
        <td className="p-5 text-[#3c4043]">Rs. 5,00,001 to Rs. 20,00,000</td>
        <td className="p-5 text-[#3c4043]">0.31%</td>
        </tr>
        <tr>
        <td className="p-5 text-[#3c4043]">Above Rs. 20,00,000</td>
        <td className="p-5 text-[#188038] font-bold">0.27%</td>
        </tr>
        </tbody>
        </table>
        <p className="text-[10px] text-[#5f6368] font-bold italic">
        Note: A fixed SEBON regulatory fee of 0.015% is applied to every transaction in addition to the broker commission.
        </p>
        
        <section id="cgt" className="mb-16 p-10 bg-[#fff3e0] border border-[#ffb74d]/30 rounded-lg">
        <h3 className="text-2xl font-black text-[#e65100] mb-4">2. Capital Gains Tax (CGT : The Holding Period Policy</h3>
        <p className="text-sm text-[#3c4033] leading-relaxed mb-6">
        Nepal differentiates between "Short-Term" and "Long-Term" investors for tax purposes. This policy is designed to encourage stable investments in the NEPSE market.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white border border-[#ffccbc] rounded-2xl shadow-sm">
        <h4 className="text-xs font-black uppercase text-[#e65100] tracking-widest mb-2">Short-Term (7.5% </h4>
        <p className="text-[11px] text-[#5f6368] leading-relaxed">Applied to profits from shares held for <strong>less than 365 days</strong>. Most active traders fall into this category.</p>
        <div className="p-6 bg-white border border-[#ffccbc] rounded-2xl shadow-sm">
        <h4 className="text-xs font-black uppercase text-[#188038] tracking-widest mb-2">Long-Term (5.0% </h4>
        <p className="text-[11px] text-[#5f6368] leading-relaxed">Applied to profits from shares held for <strong>more than 365 days</strong>. This is a final tax and is deducted automatically by the TMS/Broker.</p>
        
        <section id="wacc" className="mb-16">
        <h3 className="text-2xl font-black text-[#202124] mb-6">3. WACC: The Foundation of Profit Calculation</h3>
        <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
        Before selling shares, you must calculate and confirm the <strong>Weighted Average Cost of Capital (WACC </strong> on MeroShare. This value represents your average buying price including commissions and taxes. If you fail to calculate WACC, the system may default to your base price, potentially leading to higher tax liabilities.
        </p>
        <div className="p-8 bg-[#1a1a2e] text-white rounded-lg shadow-sm">
        <h4 className="text-lg font-black text-[#4fc3f7] mb-4">The WACC Formula:</h4>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
        WACC = (Total Purchase Value + Total Buying Commissions / Total Number of Shares.
        </p>
        <p className="text-xs font-black uppercase tracking-widest text-white border-l-4 border-[#1a73e8] pl-4">
        Rule: WACC must be updated after every new purchase or bonus/right share adjustment.
        </p>
        
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8"><div className="mt-4 pt-4 border-t border-[#dadce0]">
        <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
        <div className="flex flex-wrap gap-3 text-sm">
        <a href="/calculator/property-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Tax</a>
        <a href="/calculator/property-registration/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Registration</a>
        <a href="/calculator/nepal-tds/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Tds</a>
        <a href="/calculator/nepal-provident-fund/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Provident Fund</a>
        <a href="/calculator/nepal-vehicle-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vehicle Tax</a>
        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
        <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Stock Market Intelligence Silo</p>
        <div className="flex flex-wrap justify-center gap-4">
        <a href="/calculator/nepse-wacc/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">WACC Auditor</a>
        <a href="/calculator/sip-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Mutual Fund Lab</a>
        <a href="/calculator/cagr-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Portfolio Growth</a>
        
        
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { question: "What is the broker commission on a Rs. 10 Lakh trade in Nepal?", answer: "For a transaction of Rs. 10,00,000, the commission rate is 0.31%, which amounts to Rs. 3,100. Additionally, a SEBON fee of 0.015% (Rs. 150) and a DP fee of Rs. 25 will apply." },
      { question: "How is CGT calculated if I sell shares at a loss?", answer: "Capital Gains Tax is only applied to the profit. If you sell at a loss, no CGT is deducted. Furthermore, you cannot currently offset losses from one trade against profits from another in the same fiscal year for individuals in Nepal." },
      { question: "What is the DP charge in NEPSE?", answer: "The Depository Participant (DP) fee is a fixed charge of Rs. 25 per company per day, regardless of the number of shares sold. This is paid to the institution holding your DEMAT account." },
      { question: "When should I update my WACC on MeroShare?", answer: "You must update your WACC after every purchase of shares or after receiving bonus/right shares. This ensures that the TMS calculates your CGT accurately when you sell." },
      { question: "Is there any tax on cash dividends from NEPSE companies?", answer: "Yes. Cash dividends are subject to a 5% Final Withholding Tax (TDS). This is usually deducted at the source by the company before the dividend is credited to your bank account." },
      { question: "Can I trade on NEPSE without a TMS account?", answer: "No. To buy or sell shares on NEPSE, you need a Trade Management System (TMS) account provided by a licensed stockbroker, along with a DEMAT account and a linked bank account." }
    ]
  },
  'property-tax': {
    title: "Real Estate CGT Calculator Nepal 2082/83 | Institutional Asset Lab",
    description: "The definitive systematic resource for real estate tax planning in Nepal. Calculate Capital Gains Tax (CGT) with 1500+ words of depth, Malpot valuation logic, and holding-period optimization.",
    howToUse: {
      steps: [
        "Transaction Entry: Input the Purchase Price and Selling Price of the property in NPR.",
        "Duration Mapping: Define the holding period in years to determine the applicable CGT slab.",
        "Valuation Audit: Compare the actual transaction value against the government's minimum Malpot valuation.",
        "Deduction Allocation: Include verifiable costs like registration fees and legal documentation.",
        "Tax Liability View: Analyze the net capital gain and the final tax payable to the IRD.",
        "Compliance Check: Review the documentation required for the final tax clearance certificate."
      ]
    },
    formula: {
      title: "The Real Estate Capital Gain Axiom",
      description: "CGT in Nepal is calculated on the net profit from the sale. The rate depends on whether the owner is an individual or a company, and the duration the asset was held.",
      raw: "CGT = (Selling Price - Buying Price - Verifiable Expenses) x Applicable Rate (%)"
    },
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-300">
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Real Estate Capital Gains Tax in Nepal</h2>
        <div className="bg-[#fff3e0] border-2 border-[#ffb74d]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fb8c00] rounded-full blur-[120px] opacity-10" />
        <h4 className="text-[#e65100] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Real Estate Strategy Lab</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#5d4037] uppercase tracking-tighter">
        <a href="#rates" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>01.</span> Holding Period Slabs: 5% vs 7.5%</a>
        <a href="#malpot" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>02.</span> Malpot vs Actual Valuation Conflict</a>
        <a href="#exemptions" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>03.</span> First-Home & Inheritance Exemptions</a>
        <a href="#documentation" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>04.</span> Verifiable Costs & Deductions</a>
        <a href="#corporate" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>05.</span> Corporate CGT (15% Standard </a>
        <a href="#reporting" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>06.</span> IRD Filing & PAN Synchronization</a>
        <a href="#agri" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>07.</span> Agricultural Land Tax Policy</a>
        <a href="#urban" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>08.</span> Urban vs Rural Tax Disparities</a>
        <a href="#reinvestment" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>09.</span> Capital Reinvestment Tax Shields</a>
        <section id="rates" className="mb-16">
        <h3 className="text-2xl font-black text-[#202124] mb-6">1. Holding Period Slabs: The Timing Strategy</h3>
        <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
        Nepal&apos;s Income Tax Act mandates a differential tax rate for real estate based on the duration of ownership. This is designed to discourage short-term speculation while rewarding long-term homeownership.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="p-8 bg-white border-l-8 border-[#e65100] rounded-lg shadow-sm">
        <h4 className="text-xs font-black uppercase text-[#e65100] tracking-widest mb-2">Held &lt; 5 Years</h4>
        <p className="text-sm font-black text-[#202124] mb-2">7.5% CGT</p>
        <p className="text-[11px] text-[#5f6368] leading-relaxed">Considered a short-term gain. Applied if you sell a property within 5 years of the registration date.</p>
        <div className="p-8 bg-white border-l-8 border-[#188038] rounded-lg shadow-sm">
        <h4 className="text-xs font-black uppercase text-[#188038] tracking-widest mb-2">Held &gt; 5 Years</h4>
        <p className="text-sm font-black text-[#202124] mb-2">5% CGT</p>
        <p className="text-[11px] text-[#5f6368] leading-relaxed">Considered a long-term gain. This lower rate applies once you cross the 5-year ownership threshold.</p>
        
        <section id="malpot" className="mb-16 p-10 bg-[#e8eaf6] border border-[#3f51b5]/30 rounded-lg">
        <h3 className="text-2xl font-black text-[#1a237e] mb-4">2. Malpot Valuation: The Government Baseline</h3>
        <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
        In Nepal, every piece of land has a <strong>Minimum Government Valuation</strong> set by the Malpot office. The CGT is calculated based on the <strong>Actual Sale Price</strong> or the <strong>Malpot Valuation</strong>, whichever is higher.
        </p>
        <div className="p-6 bg-white rounded-2xl border border-[#dadce0]">
        <p className="text-xs font-bold text-[#1a237e] uppercase mb-2">Institutional Protocol:</p>
        <p className="text-[11px] text-[#5f6368]">
        "If you sell a property for Rs. 50 Lakhs but the Malpot valuation is Rs. 60 Lakhs, the tax authorities will charge CGT based on Rs. 60 Lakhs. Our calculator helps you identify this gap before you finalize the deal."
        </p>
        
        <section id="exemptions" className="mb-16">
        <h3 className="text-2xl font-black text-[#202124] mb-6">4. Exemptions & Social Thresholds</h3>
        <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
        Not all property sales attract tax. The IRD provides specific relief for small-scale transactions and residential relocations under strict conditions.
        </p>
        <ul className="space-y-4">
        <li className="p-5 bg-[#f1f8e9] rounded-2xl flex items-start gap-4">
        <span className="w-6 h-6 rounded-full bg-[#33691e] flex items-center justify-center text-white text-[10px] font-bold">01</span>
        <p className="text-[11px] text-[#33691e] font-bold leading-relaxed">Transactions below Rs. 10 Lakhs are generally exempt from CGT reporting for individuals.</p>
        </li>
        <li className="p-5 bg-[#f1f8e9] rounded-2xl flex items-start gap-4">
        <span className="w-6 h-6 rounded-full bg-[#33691e] flex items-center justify-center text-white text-[10px] font-bold">02</span>
        <p className="text-[11px] text-[#33691e] font-bold leading-relaxed">Agricultural land in rural areas (outside municipal limits may qualify for special tax-free status.</p>
        </li>
        </ul>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8"><div className="mt-4 pt-4 border-t border-[#dadce0]">
        <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
        <div className="flex flex-wrap gap-3 text-sm">
        <a href="/calculator/property-registration/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Registration</a>
        <a href="/calculator/nepal-tds/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Tds</a>
        <a href="/calculator/nepal-provident-fund/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Provident Fund</a>
        <a href="/calculator/nepal-vehicle-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vehicle Tax</a>
        <a href="/calculator/nepse-wacc/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Wacc</a>
        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
        <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Real Estate Intelligence Silo</p>
        <div className="flex flex-wrap justify-center gap-4">
        <a href="/calculator/property-registration/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Registration Lab</a>
        <a href="/calculator/loan-emi/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Mortgage Planner</a>
        <a href="/calculator/nepal-land/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Land Area Suite</a>
        
        
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { question: "What is the CGT rate if I sell my house after 6 years?", answer: "Since the property was held for more than 5 years, the applicable Capital Gains Tax rate is 5% on the net profit." },
      { question: "Can I deduct the cost of house renovation from my profit?", answer: "Yes. Verifiable construction and renovation costs (backed by VAT invoices) can be deducted from the sale price to reduce the taxable capital gain." },
      { question: "Who is responsible for paying CGT in a property deal?", answer: "The seller is legally responsible for paying the Capital Gains Tax. It is usually settled at the Malpot office during the ownership transfer process." },
      { question: "Is there CGT on inherited property?", answer: "Inheritance itself is not taxed. However, when the heir eventually sells the inherited property, CGT is calculated based on the gain from the original acquisition value or the base valuation at the time of inheritance." },
      { question: "How does the 'Panic Sale' affect CGT in Nepal?", answer: "Even in a panic sale below market value, the tax authorities will calculate CGT based on the minimum government valuation if it is higher than your selling price." },
      { question: "Do companies pay the same CGT as individuals?", answer: "No. Companies and businesses pay a flat 15% Capital Gains Tax on property sales in Nepal, regardless of the holding period." }
    ]
  },
  'property-registration': {
    title: "Property Registration Fee Nepal 2082/83 | Malpot & Stamp Duty Lab",
    description: "Calculate land and house registration fees in Nepal. Includes provincial stamp duty, Bagmati province rates, social security tax, and Malpot valuation logic.",
    howToUse: {
      steps: [
        "Province Selection: Choose the province (e.g., Bagmati, Lumbini) as rates vary by local legislation.",
        "Gender Calibration: Define the owner's gender (Discounts apply for female ownership).",
        "Transaction Value: Enter the higher value between the sale price and Malpot valuation.",
        "Stamp Duty Mapping: Analyze the fixed and percentage-based stamp duty requirements.",
        "Social Security Tax: Account for the mandatory 0.01% or fixed social welfare contribution.",
        "Total Disbursement: Review the final amount required at the Malpot office for ownership transfer."
      ]
    },
    formula: {
      title: "The Registration Cost Matrix",
      description: "Registration fees are a combination of Provincial Stamp Duty + Local Infrastructure Tax + Social Security Tax. These are calculated as a percentage of the valuation.",
      raw: "Total Fee = (Valuation x Stamp Duty %) + Social Security Tax + Local Service Fee"
    },
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-300">
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Property Registration & Malpot Fees in Nepal</h2>
        <div className="bg-[#f3e5f5] border-2 border-[#ce93d8]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#9c27b0] rounded-full blur-[120px] opacity-10" />
        <h4 className="text-[#4a148c] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Real Estate Compliance Lab</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#4a148c] uppercase tracking-tighter">
        <a href="#bagmati" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>01.</span> Bagmati Province Specific Rates</a>
        <a href="#female" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>02.</span> Female Ownership Rebates (25-35% </a>
        <a href="#stamp" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>03.</span> Stamp Duty & Local Surcharge Math</a>
        <a href="#urban" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>04.</span> Metropolitan vs Village Council Rates</a>
        <a href="#social" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>05.</span> Social Security & Infrastructure Tax</a>
        <a href="#apartment" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>06.</span> Apartment & Housing Colony Fees</a>
        <a href="#mortgage" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>07.</span> Bank Mortgage (Dristibandhak Costs</a>
        <a href="#inheritance" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>08.</span> Bakaspatra vs Anshabanda Fees</a>
        <a href="#deadlines" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>09.</span> Payment Timelines & Penalty Risks</a>
        <section id="bagmati" className="mb-16">
        <h3 className="text-2xl font-black text-[#202124] mb-6">1. Provincial Disparities: The Bagmati Standard</h3>
        <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
        Following Nepal&apos;s federalization, property registration fees are determined by Provincial Finance Acts. Bagmati Province, containing Kathmandu, typically has the most complex and tiered fee structure.
        </p>
        <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
        <table className="w-full text-left text-xs bg-white">
        <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
        <tr>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Ownership Type</th>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Bagmati Rate (Urban </th>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Other Provinces</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-[#dadce0]">
        <tr>
        <td className="p-5 font-black text-[#3c4043]">Male Individual</td>
        <td className="p-5 text-[#3c4043]">5% Stamp Duty</td>
        <td className="p-5 text-[#3c4043]">4% - 4.5%</td>
        </tr>
        <tr>
        <td className="p-5 font-black text-[#3c4043]">Female Individual</td>
        <td className="p-5 text-[#188038] font-bold">3.75% (25% Rebate </td>
        <td className="p-5 text-[#3c4043]">3% - 3.5%</td>
        </tr>
        <tr>
        <td className="p-5 font-black text-[#3c4043]">Senior Citizen/Disabled</td>
        <td className="p-5 text-[#1a73e8] font-bold">50% Rebate (Limit apply </td>
        <td className="p-5 text-[#3c4043]">Varies by local body</td>
        </tr>
        </tbody>
        </table>
        
        <section id="female" className="mb-16 p-10 bg-[#e1f5fe] border border-[#03a9f4]/30 rounded-lg">
        <h3 className="text-2xl font-black text-[#01579b] mb-4">2. The Female Ownership Multiplier</h3>
        <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
        The Government of Nepal promotes women's property rights through significant tax rebates. Depending on the geographical location, a female buyer can save 25% to 35% on the total registration fee.
        </p>
        <div className="p-8 bg-white border border-[#bbdefb] rounded-2xl shadow-sm">
        <p className="text-xs font-black text-[#01579b] uppercase mb-4 tracking-widest text-center">Empowerment Logic</p>
        <p className="text-[11px] text-[#5f6368] leading-relaxed text-center">
        "In certain remote village councils, the rebate for female ownership can go up to 50%. Our calculator includes these local body permutations to give you the most accurate fee projection."
        </p>
        
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8"><div className="mt-4 pt-4 border-t border-[#dadce0]">
        <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
        <div className="flex flex-wrap gap-3 text-sm">
        <a href="/calculator/nepal-tds/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Tds</a>
        <a href="/calculator/nepal-provident-fund/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Provident Fund</a>
        <a href="/calculator/nepal-vehicle-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vehicle Tax</a>
        <a href="/calculator/nepse-wacc/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Wacc</a>
        <a href="/calculator/gratuity-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Gratuity Calculator</a>
        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
        <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Malpot Intelligence Silo</p>
        <div className="flex flex-wrap justify-center gap-4">
        <a href="/calculator/property-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">CGT Auditor</a>
        <a href="/calculator/nepal-land/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Land Area Lab</a>
        <a href="/calculator/loan-emi/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Closing Cost Plan</a>
        
        
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { question: "What is the property registration fee for Bagmati Province in 2082/83?", answer: "For individual male owners in urban areas, the rate is 5% stamp duty plus local infrastructure and social security taxes. Females receive a 25% rebate on this stamp duty." },
      { question: "Does the size of the land affect the registration fee?", answer: "No. The fee is primarily based on the valuation (Malpot or Transaction value). However, different rates might apply for residential vs agricultural land types." },
      { question: "What is 'Anshabanda' registration fee in Nepal?", answer: "Anshabanda (Property Partition) between family members attracts a significantly lower fee, often a fixed nominal amount or a very small percentage compared to a commercial sale." },
      { question: "Can I pay the registration fee online?", answer: "Most Malpot offices in Nepal now use a computerized system. While initial forms can be filled via the 'PEMS' portal, the final payment is usually made at the bank counter inside the Malpot office." },
      { question: "What is 'Social Security Tax' on land registration?", answer: "It is a nominal tax (typically 0.01%) or a fixed fee (Rs. 100-500) added to the registration cost to fund social welfare programs in Nepal." },
      { question: "Is there a discount for joint ownership (Husband & Wife)?", answer: "Yes. Many local bodies provide a fixed discount (often Rs. 100 to Rs. 500) on the registration certificate fee to encourage joint ownership between spouses." }
    ]
  },
  'nepal-tds': {
    title: "TDS Calculator Nepal | Institutional Withholding Lab",
    description: "Calculate Tax Deducted at Source (TDS) with absolute precision. Professional guide on 1.5%, 10%, and 15% slabs, IRD compliance, and e-TDS filing.",
    
    howToUse: {
      steps: [
        "1. Transaction Entry: Input the Gross Amount of the payment or invoice in NPR. Do not include VAT in this base figure.",
        "2. Category Selection: Choose the applicable payment type (e.g., Professional Service, House Rent, or Consultancy).",
        "3. Recipient Profiling: Specify if the payee is a VAT-registered entity, a PAN-only individual, or a non-resident.",
        "4. Slab Verification: Analyze the statutory TDS rate mandated by the Inland Revenue Department (IRD) for the selected category.",
        "5. Net Payout Audit: Review the final amount to be disbursed to the vendor and the tax to be withheld for the government.",
        "6. Timeline Mapping: Confirm the deposit deadline (usually within 25 days of the following month).",
        "7. Document Generation: Use the calculated figures to prepare your internal vouchers and IRD deposit slips.",
        "8. E-TDS Synchronization: Ensure the withheld amount is correctly mapped to the recipient's PAN during the electronic filing process."
      ]
    },
    
    formula: {
      title: "The Withholding Axiom",
      description: "TDS is calculated as a percentage of the base transaction value before the application of VAT or other surcharges.",
      raw: "TDS Amount = Base Payment * (TDS Rate / 100)",
      variables: [
        "TDS Amount = The tax value to be withheld and deposited to the IRD.",
        "Base Payment = The invoice value excluding VAT and secondary service charges.",
        "TDS Rate = The statutory percentage (e.g., 1.5%, 10%, or 15%) based on the service category.",
        "Worked Example (Professional Service)",
        "Gross Invoice (incl. VAT): Rs. 1,13,000",
        "Base Amount: Rs. 1,00,000",
        "TDS Rate: 1.5% (VAT Registered)",
        "TDS Deduction: Rs. 1,500",
        "Net Payout: Rs. 1,11,500 (Gross - TDS)"
      ]
    },
    
    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Institutional Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Tax Deducted at Source (TDS is the primary mechanism of revenue collection for the <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Inland Revenue Department (IRD) </a> of Nepal. It shifts the responsibility of tax collection from the government to the payer, making it a critical compliance requirement for every registered business and institution. From the 1.5% rate for professional services to the 15% rate for consultancy fees, the complexity of TDS lies in the precise selection of the regulatory slab. This professional calculator ensures that your withholding math is absolute, preventing the 15% annual interest penalties associated with incorrect or delayed deposits.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Audit Strategy: Before finalizing any vendor payout, ensure you audit the VAT component using our <a href="/calculator/nepal-vat" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">VAT Lab</a> to derive the correct base amount for TDS.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        The 1.5% vs. 15% Conflict: Navigating Service Slabs
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In the Nepalese tax framework, distinguishing between a 'Contractual Service' and a 'Professional Consultancy' is vital for determining the correct TDS liability.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>1.5% TDS (VAT-Registered Services :</strong> This rate applies to general services (security, cleaning, supply of goods provided by entities registered in the Value Added Tax system. This is a non-final tax.</li>
        <li><strong>15% TDS (Professional Consultancy :</strong> High-level advisory, legal, or technical services provided by individuals or PAN-registered firms attract a 15% deduction. This is often an advance tax credit for the recipient.</li>
        <li><strong>Non-Resident Clause:</strong> Payments made to foreign entities for services rendered in Nepal usually attract a flat 15% or 25% TDS depending on the nature of the double tax avoidance agreement (DTAA .</li>
        </ul>
        <p>
        For a detailed breakdown of how these deductions affect your corporate budget, refer to our <a href="/calculator/nepal-salary" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Payroll Lab</a>.
        </p>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-orange-600">🏠</span> House Rent TDS: The 10% Mandate
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Payments for house rent to individuals in Nepal attract a flat 10% TDS. This is historically one of the most litigated areas of tax compliance.
        </p>
        <p>
        For an individual landlord, this 10% is a <strong>Final Withholding Tax</strong>, meaning they do not have to pay additional income tax on this rental income if it falls within specific thresholds. However, if the landlord is a company, the rent is treated as regular business income, and the 10% TDS acts as an advance payment. Ensure your rent agreement specifies whether the price is 'Inclusive' or 'Exclusive' of TDS. To audit the impact on your personal wealth, refer to our <a href="/calculator/nepal-income-tax" className="text-blue-600 underline font-bold transition-colors">Income Tax Lab</a>.
        </p>
        
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-teal-400">📊</span> Investment TDS: The 5% Passive Yield
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        Passive income from the stock market and banking system in Nepal is subject to a streamlined withholding process.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">Cash Dividends:</strong> Listed companies automatically deduct a 5% final withholding tax before crediting your bank account.</p></div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Bank Interest:</strong> Interest earned on savings and FDs is subject to a 5% TDS for individuals and 15% for institutional depositors.</p>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-teal-400 uppercase tracking-widest mb-3">Investor Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Because these are final taxes, you do not need to pay extra tax even if you are in the 36% income bracket. This makes dividends a highly tax-efficient wealth vehicle in Nepal. Audit your net yields using our <a href="/calculator/fd-calculator" className="text-teal-400 underline font-bold">FD Auditor</a> and <a href="/calculator/nepse-wacc" className="text-teal-400 underline font-bold">WACC Lab</a>."
        </p></div>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-blue-600">⌨️</span> E-TDS Filing: The Digital Paper Trail
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
        Deducting TDS is only half the battle. To ensure the recipient gets credit for the tax paid, the payer must perform 'Electronic TDS Filing' on the IRD portal.
        </p>
        <div className="mt-6 p-5 bg-blue-50 border border-blue-100 rounded-xl">
        <p className="text-xs font-bold text-blue-800 uppercase mb-2">Institutional Protocol:</p>
        <p className="text-sm text-blue-900 leading-relaxed">
        The filing requires the recipient's PAN, the payment amount, and the bank voucher number. Once filed, a 'Submission Number' is generated. Recipients can verify this by logging into their own PAN portal to see their 'Tax Deduction Certificate'. If the filing is delayed beyond the 25th of the following month, a 15% annual interest penalty is applied. Refer to our <a href="/calculator/cagr-calculator" className="text-blue-600 underline font-bold">Growth Auditor</a> to calculate the cost of such penalties.
        </p>
        
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Tax Withholding Essentials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📉</span> Non-PAN Penalty
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Payments made to individuals without a PAN for taxable services may be considered invalid for business expense purposes. Always ensure PAN compliance.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">🏦</span> Final Withholding
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        A 'Final Tax' (like dividend TDS settles the tax liability completely. A 'Non-Final Tax' (like service TDS is just a prepayment toward a larger annual bill.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">📜</span> Form 101/102
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        These are the internal IRD forms used to categorize different types of withholding. Accurate mapping here is the key to a clean audit trail.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The Consultancy Fee Audit
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        A software firm in Lalitpur hires an independent security consultant for a project worth <strong>Rs. 2,00,000</strong>. Let's audit the disbursement math:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Scenario A: Standard Payout</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Project Value:</span> <strong>Rs. 2,00,000</strong></div>
        <div className="flex justify-between"><span>TDS (15% :</span> <strong>Rs. 30,000</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Consultant Receives:</span> <span>Rs. 1,70,000</span>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Scenario B: VAT Registered</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Base Value:</span> <strong>Rs. 2,00,000</strong></div>
        <div className="flex justify-between text-green-600"><span>TDS (1.5% :</span> <strong>Rs. 3,000</strong>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-green-700"><span>Consultant Receives:</span> <span>Rs. 1,97,000 + VAT</span>
        <p className="text-xs text-indigo-900/50 mt-8 italic text-center">
        Audit Observation: The consultant receives <strong>Rs. 27,000 more</strong> in liquid cash if they are VAT-registered. While their final annual tax remains the same, the improved cash flow is a massive advantage. Reinvest your tax savings into our <a href="/calculator/sip-calculator" className="text-blue-600 underline font-bold">SIP Lab</a> to build long-term capital.
        </p></div></div></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the Income Tax Act 2058 and the latest Finance Bill of Nepal.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is the TDS rate for professional services in Nepal?", 
        answer: "For services provided by VAT-registered entities, the TDS rate is 1.5% on the base amount of the invoice. This is considered a non-final withholding." 
      },
      { 
        question: "What is the TDS rate for consultancy services?", 
        answer: "Professional consultancy services provided by individuals or PAN-registered firms attract a 15% TDS deduction at the source." 
      },
      { 
        question: "Is house rent TDS 10% for everyone?", 
        answer: "Yes, house rent paid to individuals attracts a 10% TDS. For individual landlords, this is generally considered a final withholding tax." 
      },
      { 
        question: "When is the deadline to deposit TDS at the IRD?", 
        answer: "TDS must be deposited at the IRD within 25 days of the end of the month in which the tax was deducted." 
      },
      { 
        question: "What happens if I forget to deposit TDS on time?", 
        answer: "Late deposits attract an interest penalty of 15% per annum on the withheld amount, calculated from the date it was due until the date of actual deposit." 
      },
      { 
        question: "Can I get a refund for the TDS deducted from my payments?", 
        answer: "If the total TDS deducted exceeds your final annual income tax liability, you can claim a refund from the IRD after performing a full tax audit, or carry it forward to the next year." 
      },
      { 
        question: "Is TDS calculated on the total invoice amount including VAT?", 
        answer: "No, TDS is always calculated on the base taxable amount, excluding the 13% Value Added Tax (VAT)." 
      },
      { 
        question: "Do I need a PAN to receive payments in Nepal?", 
        answer: "Yes, a Permanent Account Number (PAN) is mandatory for receiving taxable payments. Payments to non-PAN individuals may result in higher withholding rates or be disallowed as a business expense for the payer." 
      },
      { 
        question: "What is 'Final Withholding' in TDS?", 
        answer: "Final withholding means that the tax deducted at the source completely settles the tax liability for that specific income. Examples include dividend tax and interest on individual savings." 
      },
      { 
        question: "How can I verify if my TDS has been electronically filed?", 
        answer: "You can login to the IRD's 'Taxpayer Portal' using your PAN and check the 'e-TDS' section to see all tax deductions made under your name by various payers." 
      }
    ]
  },

  'nepal-provident-fund': {
    title: "EPF & CIT Calculator Nepal | Institutional Retirement Lab",
    description: "Calculate Employee Provident Fund (EPF) and Citizen Investment Trust (CIT) savings with absolute precision. Professional guide on 10%+10% math and tax shields.",
    
    howToUse: {
      steps: [
        "1. Salary Initialization: Input your monthly Basic Salary in NPR. Statutory deductions are always calculated on the basic component, not the gross salary.",
        "2. EPF Contribution: Confirm the standard 10% (Employee) and 10% (Employer) mandatory contribution model for registered institutions.",
        "3. CIT Configuration: If you contribute to the Citizen Investment Trust (Nagarik Lagani Kosh), enter the voluntary monthly amount to audit your tax shield.",
        "4. Tenure Horizon: Set the total duration of your career or the specific years you intend to stay in the scheme to see the compounding effect.",
        "5. Interest Calibration: Enter the current interest rate provided by the KSK (EPF) board. Historically, this ranges from 7% to 9%.",
        "6. Bonus Inclusion: Add optional annual profit sharing or bonuses typically distributed by retirement funds in Nepal.",
        "7. Tax Shield Audit: Review the 'Tax Deductible Amount' to see how these contributions reduce your monthly income tax liability.",
        "8. Maturity Projection: Observe the 'Final Corpus' which represents the total lump-sum available upon retirement or resignation."
      ]
    },
    
    formula: {
      title: "The Retirement Compounding Axiom",
      description: "Provident fund growth is a function of monthly annuity contributions plus annual interest compounding on the accumulated balance.",
      raw: "Total Balance = Σ (Monthly Contribution) + Accrued Interest",
      variables: [
        "Total Balance = The final maturity amount including principal and interest.",
        "Monthly Contribution = (Basic Salary * 20%) for EPF + Voluntary CIT amount.",
        "Interest = Annual yield calculated on the daily or monthly average balance.",
        "Worked Example (EPF Core)",
        "Basic Salary: Rs. 50,000",
        "Monthly EPF (10%+10%): Rs. 10,000",
        "Tenure: 20 Years",
        "Interest Rate: 8% (Annual Compounding)",
        "Final Corpus: Rs. 58,90,204 (approx)"
      ]
    },
    
    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Institutional Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        The Employee Provident Fund (EPF managed by the <a href="https://epfnepal.com.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Karmachari Sanchaya Kosh (KSK </a>, and the Citizen Investment Trust (CIT are the twin pillars of institutional retirement planning in Nepal. Together with the newly introduced Social Security Fund (SSF these instruments provide a critical safety net for the Nepalese workforce. This professional-grade calculator allows employees and HR departments to mathematically model long-term retirement trajectories, factoring in statutory contribution ratios, daily-accrual interest cycles, and the significant tax benefits offered under the Income Tax Act.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Tax Optimization: Ensure your contributions stay within the statutory limits to maximize your <a href="/calculator/nepal-income-tax" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">Income Tax Shield</a> and increase your net take-home pay.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        The Statutory Engine: Understanding the 10% + 10% Mandate
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In the Nepalese labor market, the standard Provident Fund model follows a 20% aggregate contribution logic. 10% is deducted from the employee's basic salary, and a matching 10% is provided as an additional benefit by the employer.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Basic Salary Anchor:</strong> Contributions are strictly calculated on the 'Basic Salary' component. Allowances like travel, meal, or house rent are typically excluded from this calculation.</li>
        <li><strong>Compulsory Enrollment:</strong> Under the Labor Act 2074, any enterprise with at least one employee is required to provide retirement benefits, either through EPF or SSF.</li>
        <li><strong>Portability:</strong> Your EPF account number (Kosh Number is unique and portable, meaning you can carry your retirement balance from one employer to another throughout your career in Nepal.</li>
        </ul>
        <p>
        For a detailed breakdown of how these deductions affect your monthly budget, audit our <a href="/calculator/nepal-salary" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Salary Lab</a>.
        </p>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-green-600">🛡️</span> CIT: The Voluntary Tax Optimizer
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The Citizen Investment Trust (CIT or Nagarik Lagani Kosh offers a voluntary "revolving fund" scheme that is highly popular among high-earning professionals in Kathmandu. Unlike the mandatory EPF, CIT allows you to choose your contribution amount.
        </p>
        <p>
        The primary advantage of CIT is its status as a <strong>Tax Deductible Investment</strong>. Under current IRD regulations, an individual can deduct up to one-third of their taxable income or Rs. 3,00,000 (whichever is lower from their total income by contributing to approved retirement funds like CIT and EPF. This effectively reduces your income tax bracket while building a parallel retirement corpus. To audit your specific tax liability, refer to our <a href="/calculator/nepal-tds" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">TDS Lab</a>.
        </p>
        
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-orange-400">💰</span> The 70% Rule: Unlocking Liquidity
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        One of the most powerful features of the EPF system in Nepal is the ability to access low-interest credit against your own savings without liquidating the account.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">Special Loan:</strong> Once you have completed a minimum tenure (usually 2 years you can borrow up to 70% of your accumulated balance for personal requirements.</p></div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Housing Loan:</strong> EPF offers significant housing loan facilities (up to Rs. 1 Crore or 15 years of salary for contributors who have maintained a clean record.</p>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-orange-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Borrowing from your EPF is often 2% to 4% cheaper than taking a personal loan from a commercial bank. However, remember that the borrowed amount stops earning interest, which can significantly reduce your final retirement corpus. Use our <a href="/calculator/compound-interest" className="text-orange-400 underline font-bold">Compounding Lab</a> to see the cost of withdrawal."
        </p></div>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-red-600">⚖️</span> SSF vs. EPF: The Great Retirement Debate
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
        The introduction of the Social Security Fund (SSF has added a layer of complexity for private-sector employees. While EPF focuses on a lump-sum payout and high liquidity through loans, SSF is designed as a comprehensive social safety net.
        </p>
        <div className="mt-6 p-5 bg-red-50 border border-red-100 rounded-xl">
        <p className="text-xs font-bold text-red-800 uppercase mb-2">Key Divergence:</p>
        <p className="text-sm text-red-900 leading-relaxed">
        SSF includes 31% aggregate contributions (11% Employee + 20% Employer but covers medical insurance, accident insurance, and a lifelong pension. If your goal is capital accumulation for property, EPF is superior; if your goal is long-term health and income security, SSF is the professional choice. Refer to our <a href="/calculator/gratuity-calculator" className="text-blue-600 underline font-bold">Gratuity Lab</a> to see how termination benefits differ between these two schemes.
        </p>
        
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Retirement Engineering Essentials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📈</span> Interest Accrual
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        EPF interest is typically calculated on the daily balance but credited annually. This means every day your contribution remains in the fund, it is generating micro-yields.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">🎁</span> Profit Sharing
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Beyond standard interest, EPF often distributes a 'Profit Share' or bonus (e.g., 0.5% to 1% based on the fund's investment performance in hydropower and infrastructure.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">🚑</span> Insurance
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        EPF contributors are entitled to accidental death insurance and funeral grants. These benefits are provided as part of the membership without additional premiums.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The Power of Voluntary CIT
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        Let's audit an IT professional in Kathmandu earning <strong>Rs. 1,50,000</strong> per month. Let's compare their retirement corpus with and without voluntary CIT:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Scenario A (EPF Only </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Monthly Saving:</span> <strong>Rs. 30,000</strong></div>
        <div className="flex justify-between"><span>Tax Savings:</span> <strong>Standard</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>20-Year Corpus:</span> <span>Rs. 1.76 Crore</span>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Scenario B (EPF + Rs. 20K CIT </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Monthly Saving:</span> <strong>Rs. 50,000</strong></div>
        <div className="flex justify-between text-green-600"><span>Tax Saved:</span> <strong>Rs. 6,000/mo</strong>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-green-700"><span>20-Year Corpus:</span> <span>Rs. 2.94 Crore</span>
        <p className="text-xs text-indigo-900/50 mt-8 italic text-center">
        Audit Observation: By adding a voluntary CIT contribution, the professional not only builds a <strong>67% larger corpus</strong> but also saves significantly on monthly income tax. This is the ultimate "Double Win" in the Nepalese tax system. Verify your own potential with our <a href="/calculator/nepal-provident-fund" className="text-blue-600 underline font-bold">Retirement Suite</a>.
        </p></div></div></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the Employee Provident Fund Act and the Citizen Investment Trust Regulation of Nepal.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is the mandatory EPF contribution rate in Nepal?", 
        answer: "The mandatory rate is 10% of the basic salary from the employee and a matching 10% from the employer, totaling 20% of the basic salary per month." 
      },
      { 
        question: "Is CIT mandatory for private-sector employees?", 
        answer: "No, CIT is a voluntary contribution. However, it is highly recommended for tax optimization as it provides an additional deduction of up to Rs. 3,00,000 from your taxable income annually." 
      },
      { 
        question: "Can I withdraw my EPF balance if I quit my job?", 
        answer: "Yes, you can withdraw your accumulated EPF balance (including interest) after you leave your job. However, if you join a new employer, it is often better to transfer the balance to maintain compounding growth." 
      },
      { 
        question: "What is the difference between EPF and SSF?", 
        answer: "EPF is a retirement savings scheme where you get a lump-sum payout plus interest and can take loans. SSF is a comprehensive social security scheme that provides pension, medical insurance, and disability benefits, but offers less liquidity." 
      },
      { 
        question: "How is the interest on EPF calculated?", 
        answer: "The EPF (Karmachari Sanchaya Kosh) calculates interest on a daily-accrual basis, but the total interest is credited to the contributor's account at the end of each fiscal year (Ashad end)." 
      },
      { 
        question: "Is there a maximum limit for CIT contributions?", 
        answer: "While there is no hard limit on how much you can save in CIT, the tax deduction benefit is capped at one-third of your total taxable income or Rs. 3,00,000 per fiscal year (combined with EPF and other approved funds)." 
      },
      { 
        question: "What happens to my EPF interest if I take a loan?", 
        answer: "The amount you borrow as a loan stops earning interest in your EPF account. Furthermore, you will have to pay interest on the loan amount to the fund, which is usually 1% to 2% higher than the interest the fund pays you." 
      },
      { 
        question: "Are EPF and CIT payouts taxable at the time of retirement?", 
        answer: "Under current Nepalese law, the principal and interest accumulated in your provident fund are generally tax-free at the time of retirement, provided the contributions were made to approved funds and followed statutory limits." 
      },
      { 
        question: "Can I contribute to both EPF and SSF simultaneously?", 
        answer: "Generally, an employer chooses either the EPF or the SSF for their establishment. However, an individual can have an old EPF account and a new SSF account if they have changed employers during the transition period of the social security mandate." 
      },
      { 
        question: "How can I check my EPF balance in Nepal?", 
        answer: "You can check your balance through the 'KSK' (EPF) mobile app, their official website, or by visiting a Sanchaya Kosh office with your biometric ID card or Kosh number." 
      }
    ]
  },

  'nepal-vehicle-tax': {
    title: "Vehicle Tax Calculator Nepal 2082/83 | Bluebook Renewal & DoTM Lab",
    description: "The definitive systematic resource for road tax and bluebook renewal in Nepal. Calculate bike and car taxes with 1500+ words of CC-based depth and provincial penalty logic.",
    howToUse: {
      steps: [
        "Vehicle Category: Select between 'Motorbike/Scooter', 'Private Car', or 'Electric Vehicle'.",
        "Engine Capacity: Input the CC (Cubic Capacity) or KW (Kilowatts) for EVs as per your bluebook.",
        "Province Selection: Choose your registration province (e.g., Bagmati, Koshi) for accurate slab application.",
        "Last Renewal Date: Define the last tax payment date to calculate any applicable late-payment penalties.",
        "Insurance Integration: Account for the mandatory Third-Party Insurance cost required for renewal.",
        "Total Disbursement: Review the final amount including road tax, renewal fee, and penal interest."
      ]
    },
    formula: {
      title: "The Road Tax Surcharge Axiom",
      description: "Vehicle tax in Nepal is a fixed annual fee based on engine capacity tiers. Penalties are progressive, increasing based on the number of days past the 90-day grace period.",
      raw: "Total Tax = Annual Slab Rate + (Annual Slab Rate x Penalty %) + Insurance + Renewal Fee"
    },
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-300">
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Vehicle Tax & Bluebook Renewal in Nepal</h2>
        <div className="bg-[#e8eaf6] border-2 border-[#3f51b5]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3f51b5] rounded-full blur-[120px] opacity-10" />
        <h4 className="text-[#1a237e] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Mobility Compliance Lab</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#1a237e] uppercase tracking-tighter">
        <a href="#bike" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>01.</span> Motorbike & Scooter CC Slabs</a>
        <a href="#car" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>02.</span> Private Car & SUV CC Slabs</a>
        <a href="#ev" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>03.</span> EV Tax Policy (KW vs Battery </a>
        <a href="#penalties" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>04.</span> Late Payment Penalties (5% to 20% </a>
        <a href="#bagmati" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>05.</span> Bagmati vs Other Province Disparities</a>
        <a href="#insurance" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>06.</span> Third-Party Insurance Requirements</a>
        <a href="#renewal" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>07.</span> Bluebook Renewal Process Map</a>
        <a href="#online" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>08.</span> TMO Online Payment (Nagarik App </a>
        <a href="#dotm" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>09.</span> Federal vs Provincial Jurisdiction</a>
        
        <section className="mb-16">
        <h3 className="text-2xl font-black text-[#202124] mb-6">Competitive Audit: Vehicle Tax Precision</h3>
        <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm">
        <table className="w-full text-left text-xs bg-white">
        <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
        <tr>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Competitor</th>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Feature Gap</th>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">CalcPro Advantage</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-[#dadce0]">
        <tr>
        <td className="p-5 text-[#3c4043] font-semibold">DoTM Queue Line</td>
        <td className="p-5 text-[#3c4043]">Manual lookup; no penalty simulation.</td>
        <td className="p-5 text-[#1a73e8] font-bold">Instant Penalty Audit</td>
        </tr>
        <tr>
        <td className="p-5 text-[#3c4043] font-semibold">Bike Showroom Staff</td>
        <td className="p-5 text-[#3c4043]">Only quotes base tax; ignores insurance costs.</td>
        <td className="p-5 text-[#1a73e8] font-bold">Full-Disbursement Model</td>
        </tr>
        <tr>
        <td className="p-5 text-[#3c4043] font-semibold">Generic Tax Apps</td>
        <td className="p-5 text-[#3c4043]">No province-based slab logic or EV tiers.</td>
        <td className="p-5 text-[#1a73e8] font-bold">Provincial + EV Compliance</td>
        </tr>
        </tbody>
        </table>
        
        <section id="bike" className="mb-16">
        <h3 className="text-2xl font-black text-[#202124] mb-6">1. Motorbike Slabs: The CC Thresholds</h3>
        <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
        In Nepal, motorbike taxes are tiered significantly to discourage high-capacity "superbikes" while keeping commuter bikes affordable. The tax is paid annually at the Transport Management Office (TMO .
        </p>
        <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
        <table className="w-full text-left text-xs bg-white">
        <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
        <tr>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Engine Capacity</th>
        <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Annual Tax (Bagmati </th>
        </tr>
        </thead>
        <tbody className="divide-y divide-[#dadce0]">
        <tr>
        <td className="p-5 text-[#3c4043]">Up to 125cc</td>
        <td className="p-5 text-[#3c4043] font-bold">Rs. 3,000</td>
        </tr>
        <tr>
        <td className="p-5 text-[#3c4043]">126cc to 160cc</td>
        <td className="p-5 text-[#3c4043] font-bold">Rs. 5,000</td>
        </tr>
        <tr>
        <td className="p-5 text-[#3c4043]">161cc to 250cc</td>
        <td className="p-5 text-[#3c4043] font-bold">Rs. 9,000</td>
        </tr>
        <tr>
        <td className="p-5 text-[#3c4043]">251cc to 400cc</td>
        <td className="p-5 text-[#d93025] font-bold">Rs. 18,000</td>
        </tr>
        <tr>
        <td className="p-5 text-[#3c4043]">Above 400cc</td>
        <td className="p-5 text-[#d93025] font-bold">Rs. 30,000</td>
        </tr>
        </tbody>
        </table>
        
        <section id="penalties" className="mb-16 p-10 bg-[#fff3e0] border border-[#ffb74d]/30 rounded-lg">
        <h3 className="text-2xl font-black text-[#e65100] mb-4">2. Late Payment Penalties: The 90-Day Clock</h3>
        <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
        You have 90 days from the expiry of your bluebook to pay the tax without penalty. Once you cross this grace period, the penalty increases in stages.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-[#ffe0b2] shadow-sm">
        <p className="text-[10px] font-black text-[#e65100] uppercase mb-1">Stage 1</p>
        <p className="text-xs font-bold text-[#202124]">5% Penalty</p>
        <p className="text-[10px] text-[#5f6368] mt-2">Applied for the next 30 days after the grace period.</p>
        <div className="p-6 bg-white rounded-2xl border border-[#ffe0b2] shadow-sm">
        <p className="text-[10px] font-black text-[#e65100] uppercase mb-1">Stage 2</p>
        <p className="text-xs font-bold text-[#202124]">10% Penalty</p>
        <p className="text-[10px] text-[#5f6368] mt-2">Applied for the remainder of the fiscal year.</p>
        <div className="p-6 bg-[#1A1A2E] text-white rounded-2xl shadow-sm">
        <p className="text-[10px] font-black text-[#4fc3f7] uppercase mb-1">Stage 3</p>
        <p className="text-xs font-bold">20% Penalty</p>
        <p className="text-[10px] text-slate-400 mt-2">Applied if the renewal is delayed to the next fiscal year.</p>
        
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8"><div className="mt-4 pt-4 border-t border-[#dadce0]">
        <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
        <div className="flex flex-wrap gap-3 text-sm">
        <a href="/calculator/nepse-wacc/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Wacc</a>
        <a href="/calculator/gratuity-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Gratuity Calculator</a>
        <a href="/calculator/nepal-vat/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vat</a>
        <a href="/calculator/nepali-date/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepali Date</a>
        <a href="/calculator/see-gpa/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">See Gpa</a>
        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
        <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Bluebook Intelligence Silo</p>
        <div className="flex flex-wrap justify-center gap-4">
        <a href="/calculator/property-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Asset Tax Lab</a>
        <a href="/calculator/nepal-vat/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">VAT Auditor</a>
        <a href="/calculator/nepal-income-tax" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Tax Strategy</a>
        
        
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { question: "Is vehicle tax different in each province of Nepal?", answer: "Yes. Since the federalization, vehicle tax is a provincial subject. While rates are similar, Bagmati Province (Kathmandu) and Lumbini Province often have different slabs and penalty calculations." },
      { question: "How is the tax for electric vehicles (EV) calculated in Nepal?", answer: "EV tax is calculated based on the Kilowatt (KW) rating of the motor. Currently, EVs enjoy significantly lower road tax compared to petrol/diesel vehicles as an incentive for clean energy." },
      { question: "What documents are required for bluebook renewal?", answer: "You need the original Bluebook, a valid Third-Party Insurance policy, and the tax payment receipt from the previous year. If paying online, you must still visit the TMO to get the physical stamp." },
      { question: "Can I pay my vehicle tax through the Nagarik App?", answer: "Yes. The Nagarik App and several digital wallets like eSewa/Khalti now support vehicle tax payment for Bagmati and Gandaki provinces, with more being added." },
      { question: "What is the penalty if I miss the 90-day grace period?", answer: "The penalty starts at 5% for the first month after the grace period, increases to 10% for the rest of the fiscal year, and hits a maximum of 20% if delayed to the following fiscal year." },
      { question: "Do I need to pay road tax if my vehicle is not in use?", answer: "If a vehicle is not in use, you can 'suspend' the bluebook at the TMO to avoid annual taxes. However, you must pay all outstanding dues and a small suspension fee." }
    ]
  },

  'nepse-wacc': {
    title: "NEPSE WACC Calculator | Share Profit & Price Adjustment Lab",
    description: "Calculate Weighted Average Cost of Capital (WACC) for NEPSE shares. Professional guide on bonus adjustments, right shares, and 7.5% CGT compliance.",
    
    howToUse: {
      steps: [
        "1. Buy Transaction Entry: Input the initial purchase price of the scrip and the quantity bought from the secondary market (TMS).",
        "2. Broker Commission Audit: Account for the applicable broker fee (0.39% to 0.27%) and the mandatory SEBON regulatory charge (0.015%).",
        "3. DP Fee Allocation: Include the Rs. 25 DP fee (Depository Participant) applicable to the total purchase transaction.",
        "4. Bonus Share Mapping: Add any bonus shares received. For WACC purposes in Nepal, bonus shares are usually adjusted at Rs. 100 or Rs. 0 based on the scrip history.",
        "5. Right Share Calibration: Input right shares at the face value (typically Rs. 100) to determine the new diluted average cost.",
        "6. WACC Generation: Review the 'Weighted Average Cost of Capital'. This is the value you must 'Confirm' on MeroShare before selling.",
        "7. Profit/Loss Projection: Compare your WACC against the current market price (LTP) to see your unrealized gain or loss.",
        "8. Tax Estimation: Determine your Capital Gains Tax (CGT) liability (5% for long term holders or 7.5% for short term holders)."
      ]
    },
    
    formula: {
      title: "The Weighted Average Axiom (SEBON Standard)",
      description: "WACC is the total capital invested (including all buying costs) divided by the total number of shares currently held in your DEMAT account.",
      raw: "WACC = (Σ(Qi × Pi) + C) / ΣQi",
      variables: [
        "Qi = Quantity of Shares: The number of shares bought in transaction i.",
        "Pi = Purchase Price: The price per share at the time of trade.",
        "C = Total Costs: Sum of Broker Commission, SEBON fees, and DP charges.",
        "Worked Example (Secondary Market)",
        "Transaction 1: 100 units at Rs. 500",
        "Costs: Rs. 195 (Commission) + Rs. 25 (DP) = Rs. 220",
        "WACC: (50,000 + 220) / 100 = Rs. 502.20",
        "Worked Example (After 10% Bonus)",
        "New Quantity: 110 units",
        "New WACC: 50,220 / 110 = Rs. 456.54"
      ]
    },
    
    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Institutional Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        In the modern digital ecosystem of the <a href="https://www.nepalstock.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Nepal Stock Exchange (NEPSE) </a>, the Weighted Average Cost of Capital (WACC is the fundamental metric used to calculate Capital Gains Tax (CGT . Following the implementation of the MeroShare "My WACC" module, investors are legally responsible for declaring their purchase costs including broker commissions and regulatory fees. This institutional grade calculator provides a precise audit of your holding costs, accounting for complex corporate actions like bonus issues, right shares, and merger swap ratios. Ensuring 100% accuracy in your WACC confirmation is critical to avoid overpaying tax or facing compliance issues with the Inland Revenue Department.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Portfolio Growth: If you are building a long term portfolio, use our <a href="/calculator/sip-calculator" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">SIP Calculator</a> to model the impact of rupee cost averaging over decades.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        The Cost of Entry: Broker Commissions & Fees
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Every transaction on the NEPSE floor involves four distinct cost components that must be baked into your WACC. Understanding these is the first step in precise profit auditing.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Broker Commission:</strong> A tiered slab ranging from 0.39% (for small trades to 0.27% (for trades above Rs. 1 Crore .</li>
        <li><strong>SEBON Fee:</strong> A fixed regulatory charge of 0.015% applied to the transaction value.</li>
        <li><strong>DP Fee:</strong> A flat fee of Rs. 25 charged by your Depository Participant for every scrip purchase.</li>
        <li><strong>TMS Charges:</strong> While usually a subscription model, some brokers include incidental administrative costs.</li>
        </ul>
        <p>
        When you use our calculator, we include the standard SEBON mandated commission rates to ensure your "Buying Price" on MeroShare matches the reality of your bank statement. For a broader view of your business profitability, refer to our <a href="/calculator/profit-loss-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Profit & Loss Lab</a>.
        </p>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-green-600">💹</span> Corporate Actions: The Dilution Math
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Corporate actions like Bonus Shares and Right Shares are the primary reason why an investor's WACC often differs from their initial buying price.
        </p>
        <p>
        In Nepal, <strong>Bonus Shares</strong> are typically accounted at a cost of Rs. 100 (Face Value for tax calculation purposes. This means that if you bought 100 shares at Rs. 500 and received 10% bonus (10 shares your new total quantity is 110, and your WACC will drop significantly. Similarly, <strong>Right Shares</strong> are bought at Rs. 100, which usually pulls down the average cost of high priced scrips.
        </p>
        <p>
        Using our calculator's "Bonus Mode" allows you to simulate these adjustments before they appear in your MeroShare portal. To see how these corporate actions impact your long term compounding, audit our <a href="/calculator/compound-interest" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Compound Interest Lab</a>.
        </p>
        
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-blue-400">🛡️</span> The Tax Shield: 5% vs 7.5% CGT
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        The government of Nepal encourages long term investing by offering a dual tier Capital Gains Tax (CGT structure. Your WACC determines the "Profit" on which this tax is calculated.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">Short Term (7.5% :</strong> Applicable if you sell shares held for less than 365 days. The system tracks this via your EDIS (Electronic Deposit Instruction Slip history.</p></div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Long Term (5% :</strong> A massive incentive for holders. If you hold a scrip for more than 1 year, your tax liability on the profit drops by 33%.</p>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Wealth Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Selling a stock at Day 364 vs Day 366 could result in a difference of thousands of Rupees in tax. Always check your holding period in MeroShare and use our calculator to verify the net profit after tax."
        </p></div>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-purple-600">🔄</span> Merger Swap Logic
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
        With the recent wave of commercial bank mergers in Nepal (e.g., Nabil and NB Bank, Global IME and Bank of Kathmandu many investors face "Swap Ratio" adjustments. If Company A merges into Company B with a 1:0.8 swap ratio, your new WACC for Company B is your old Company A WACC divided by 0.8. Our calculator handles these custom swap ratios to keep your portfolio cost base accurate.
        </p>
        <div className="mt-6 p-5 bg-purple-50 border border-purple-100 rounded-xl">
        <p className="text-xs font-bold text-purple-800 uppercase mb-2">Audit Scenario:</p>
        <p className="text-sm text-purple-900 leading-relaxed">
        You held 100 shares of a bank at WACC Rs. 400. After a merger with a 1:0.95 swap ratio, you now hold 95 shares of the new entity. Your new WACC becomes 400 / 0.95 = Rs. 421.05. This is the value you must input manually if the system fails to pick it up.
        </p>
        
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        NEPSE Trading Essentials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📥</span> EDIS Confirmation
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        After selling shares on TMS, you must login to MeroShare and perform 'Purchase Source' (WACC and 'EDIS' (Transfer before 8:00 PM the next day. Failure to do so leads to a 20% fine on the total trade value (Close Out .
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">⚖️</span> Holding Period
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The holding period is calculated from the date of 'Purchase' to the date of 'Sale'. For bonus and right shares, the holding period typically starts from the date they are listed on NEPSE, not the date of your original purchase.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">📈</span> LTP vs WACC
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        LTP (Last Traded Price is the current market valuation. Your WACC is your break even point. If LTP is higher than WACC + selling costs, you are in profit. Use our <a href="/calculator/nepal-stocks" className="text-blue-600 underline font-bold">Stock Calculator</a> for real time trade auditing.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The Holding Period Advantage
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        An investor buys 1,000 units of a commercial bank at WACC Rs. 300. They sell it at Rs. 400, generating a profit of <strong>Rs. 1,00,000</strong>. Let's audit the difference in tax based on timing:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Scenario A: Held 360 Days</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Profit:</span> <strong>Rs. 1,00,000</strong></div>
        <div className="flex justify-between"><span>CGT (7.5% :</span> <strong>Rs. 7,500</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Net Profit:</span> <span>Rs. 92,500</span>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Scenario B: Held 366 Days</h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Profit:</span> <strong>Rs. 1,00,000</strong></div>
        <div className="flex justify-between text-green-600"><span>CGT (5% :</span> <strong>Rs. 5,000</strong>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-green-700"><span>Net Profit:</span> <span>Rs. 95,000</span>
        <p className="text-xs text-indigo-900/50 mt-8 italic">
        Audit Observation: By simply waiting 6 more days, the investor saved <strong>Rs. 2,500</strong> in cash. This highlights the importance of using a precise <a href="/calculator/cagr-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">CAGR Auditor</a> to track your holding periods and tax brackets.
        </p></div></div></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the SEBON directives and the Finance Act 2082.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is WACC in the Nepal stock market?", 
        answer: "WACC (Weighted Average Cost of Capital) is the average price you paid to acquire your shares, including broker commission and SEBON fees. It is used by MeroShare and TMS to calculate your capital gains and the resulting tax (CGT)." 
      },
      { 
        question: "How do I confirm my WACC in MeroShare?", 
        answer: "Login to MeroShare, go to 'My Purchase Source', select the scrip you sold, and the system will show the calculated WACC. You must click 'Confirm' to finalize the cost base before you can transfer shares via EDIS." 
      },
      { 
        question: "Does WACC include the Rs. 25 DP fee?", 
        answer: "Yes. For an accurate purchase cost, you should include the Rs. 25 DP fee per scrip. However, since the DP fee is per transaction, if you buy multiple scrips in one day, the fee is applied to each scrip's settlement." 
      },
      { 
        question: "What is the CGT rate for NEPSE investors in 2082/83?", 
        answer: "Individual investors pay 5% CGT if they have held the shares for more than 365 days (Long Term) and 7.5% CGT if held for 365 days or less (Short Term). For institutional investors, the CGT is typically 10%." 
      },
      { 
        question: "How is WACC calculated for bonus shares in Nepal?", 
        answer: "Bonus shares are usually considered to have a cost of Rs. 100 (Face Value) for tax calculation. When you receive bonus shares, your total quantity increases, which reduces your overall WACC because the cost of the bonus shares is lower than your market purchase price." 
      },
      { 
        question: "Why is manual WACC entry required sometimes?", 
        answer: "Manual entry is often required for shares bought many years ago (before the digital system), shares received through inheritance, or during complex mergers where the system cannot automatically calculate the cost base." 
      },
      { 
        question: "What is the penalty for not confirming WACC on time?", 
        answer: "If you don't confirm WACC and perform EDIS by T+1 (the next day after selling), the trade will fail. You will be liable for a 20% 'Close Out' fine on the total traded value, which is paid to the buyer." 
      },
      { 
        question: "Is WACC calculated per broker or per DEMAT account?", 
        answer: "WACC is calculated per scrip within a specific DEMAT account. If you have the same scrip in two different DEMAT accounts, they will have independent WACC values." 
      },
      { 
        question: "Can I change my WACC after clicking 'Confirm'?", 
        answer: "No. Once you confirm the WACC in MeroShare, it is locked for that sale transaction. For any corrections, you would need to contact your DP and provide physical proof of purchase (TMS bills)." 
      },
      { 
        question: "Does the WACC calculator handle Right Shares?", 
        answer: "Yes. Right shares are usually acquired at the face value of Rs. 100. Our calculator adds this quantity and the Rs. 100 cost to your existing portfolio to provide the new weighted average." 
      }
    ]
  },


  'gratuity-calculator': {
    title: "Gratuity Calculator Nepal | Institutional Labor Act Lab",
    description: "Calculate retirement gratuity benefits with absolute precision. Professional guide on 8.33% statutory accruals, SSF migration, and exit tax optimization.",
    
    howToUse: {
      steps: [
        "1. Salary Entry: Input your last drawn monthly Basic Salary in NPR. Gratuity is never calculated on your gross salary or allowances.",
        "2. Tenure Mapping: Define the total number of years and months of continuous service with your current employer.",
        "3. Calculation Regime: Choose between 'Labor Act 2074' (8.33% flat) or the 'Legacy Tiered System' if your service started before 2074.",
        "4. SSF Status: Indicate if your employer is registered with the Social Security Fund, as this changes the payout mechanism.",
        "5. Termination Type: Select the reason for exit (Resignation, Retirement, or Termination) to audit specific entitlement clauses.",
        "6. Bonus Inclusion: Add any contractual gratuity multipliers if your company provides benefits above the statutory minimum.",
        "7. Tax Shield Audit: Review the 'Net Payout' after accounting for the mandatory 15% TDS on retirement benefits exceeding the threshold.",
        "8. Compliance Check: Ensure the final amount aligns with the preferential debt status established by the Labor Act."
      ]
    },
    
    formula: {
      title: "The Gratuity Accrual Axiom",
      description: "Under the Labor Act 2074, gratuity is a defined contribution equal to 8.33% of the monthly basic salary for every month of service.",
      raw: "Gratuity = (Basic Salary * 8.33%) * Months of Service",
      variables: [
        "Gratuity = The total accumulated reward for the duration of service.",
        "Basic Salary = The fixed monthly component excluding dearness and food allowances.",
        "8.33% = The statutory percentage (Equivalent to one month's salary per year).",
        "Worked Example (5-Year Tenure)",
        "Basic Salary: Rs. 40,000",
        "Monthly Accrual (8.33%): Rs. 3,332",
        "Total Tenure: 60 Months (5 Years)",
        "Calculation: 3,332 * 60",
        "Total Gratuity: Rs. 1,99,920"
      ]
    },
    
    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Institutional Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Gratuity in Nepal has evolved from a discretionary reward into a fundamental statutory right for every employee. Following the implementation of the <a href="https://moljpa.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Labor Act 2074</a>, the traditional five-year waiting period was abolished, replaced by a "Day One Entitlement" policy. This means that from the moment an employee starts their service, they begin accruing a gratuity balance equal to 8.33% of their basic salary. Our advanced system offers an absolute audit of these accruals, helping employees secure their fair exit compensation and helping HR departments maintain full legal compliance during full and final settlements.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Exit Strategy: Combine your gratuity audit with our <a href="/calculator/nepal-provident-fund" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">Provident Fund Lab</a> to calculate your total liquid net worth at the time of resignation.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        The 8.33% Rule: Understanding Day One Entitlement
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The most significant change in Nepalese labor law is the shift toward a defined contribution model for gratuity. Employers are now required to either deposit this amount into a recognized fund or maintain a separate provision for it.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Mathematical Equivalence:</strong> An 8.33% monthly contribution is mathematically identical to receiving exactly one month's basic salary for every completed year of service.</li>
        <li><strong>Probation Inclusion:</strong> Even employees on probation are entitled to gratuity accruals. If the employee is not confirmed after probation, the accrued amount must still be paid out.</li>
        <li><strong>Basic Salary Cap:</strong> It is critical to note that 'Gratuity' does not apply to gross salary. Allowances like travel, communication, or dearness allowances are excluded. Audit your breakdown in our <a href="/calculator/nepal-salary" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Salary Lab</a>.</li>
        </ul>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-green-600">🛡️</span> SSF Integration: The Safe Custody Model
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        For establishments registered with the Social Security Fund (SSF the 8.33% gratuity component is automatically included in the 31% aggregate monthly contribution.
        </p>
        <p>
        This migration offers a significant layer of protection for employees, as the funds are held by a government authority rather than sitting in the company's ledger. However, it also changes the withdrawal rules. Under SSF, you can only withdraw the gratuity portion upon leaving your current job, whereas the pension portion remains locked until retirement age. If you are a high-earner, ensure you audit the tax implications of these payouts using our <a href="/calculator/nepal-income-tax" className="text-blue-600 underline font-bold transition-colors">Income Tax Lab</a>.
        </p>
        
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-green-400">⚖️</span> Legacy Tiered System (Pre-2074 </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        For senior professionals who started their service before the Labor Act 2074, a tiered calculation may still apply for the years served under the old regime.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">Slab 1 (Up to 7 Years :</strong> Payout was half a month's salary per year of service.</p></div>
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Slab 2 (7 to 15 Years :</strong> Payout was two-thirds of a month's salary per year of service.</p></div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold">3
        <p className="text-sm text-slate-300"><strong className="text-white">Slab 3 (15+ Years :</strong> Payout was one full month's salary per year of service.</p>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-green-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Our calculator automatically merges legacy tiered logic with modern 8.33% accruals if you enter a start date before 2074. This ensures you do not lose out on the 'Loyalty Premium' established by the old laws. To optimize your final payout, consider the timing of your resignation relative to your increment cycle. Audit your growth with our <a href="/calculator/cagr-calculator" className="text-green-400 underline font-bold">Growth Auditor</a>."
        </p></div>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-red-600">⚠️</span> The 15% TDS Rule: Retirement Taxation
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
        Gratuity payouts in Nepal are subject to specific tax rules that differ from regular monthly income. If you receive a lump-sum gratuity payout, the institution is required to deduct TDS.
        </p>
        <div className="mt-6 p-5 bg-red-50 border border-red-100 rounded-xl">
        <p className="text-xs font-bold text-red-800 uppercase mb-2">Audit Scenario:</p>
        <p className="text-sm text-red-900 leading-relaxed">
        For non-pensioners, the first Rs. 5,00,000 of the retirement payout is often exempt if paid through an approved fund. Amounts above this are subject to a flat 15% Final Withholding Tax. However, if the payout is from an unapproved fund, it might be added to your annual income and taxed at your regular slabs. Always verify your 'Tax Clearance' status with the IRD. Refer to our <a href="/calculator/nepal-tds" className="text-blue-600 underline font-bold">TDS Lab</a> for a detailed audit.
        </p>
        
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Exit Engineering Essentials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📉</span> Preferential Debt
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        In the event of company liquidation, gratuity and other employee benefits are categorized as 'Preferential Debts', meaning employees are paid before other creditors.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">🎁</span> Service Multiplier
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Some institutional bylaws (especially in the banking sector offer multipliers like 1.5x or 2x for employees completing 20+ years of service. Check your HR policy for these 'Golden Handshake' clauses.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">⚖️</span> Misconduct Rule
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Under the Labor Act, an employee dismissed for 'Serious Misconduct' (like theft or fraud may forfeit their right to gratuity. Professional ethics are the foundation of retirement security.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The 15-Year Exit Multiplier
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        Let's audit a senior manager in the manufacturing sector earning a basic salary of <strong>Rs. 1,00,000</strong>. They are retiring after 15 years of service. Let's compare the legacy vs modern payout:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Modern Rule (8.33% </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Annual Accrual:</span> <strong>Rs. 1,00,000</strong></div>
        <div className="flex justify-between"><span>Service:</span> <strong>15 Years</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Total Gratuity:</span> <span>Rs. 15,00,000</span>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Legacy Rule (Tiered </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Last 7 Years:</span> <strong>1 Month/Year</strong></div>
        <div className="flex justify-between text-green-600"><span>Loyalty Perk:</span> <strong>Slab 3 Applied</strong>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-green-700"><span>Total Gratuity:</span> <span>Rs. 12,50,000+</span>
        <p className="text-xs text-indigo-900/50 mt-8 italic text-center">
        Audit Observation: While the modern 8.33% rule provides higher predictability, the legacy system offered significant jumps at the 15-year mark. Our tool reconciles these periods to ensure you receive the maximum legal entitlement. Reinvest your gratuity lump-sum into our <a href="/calculator/fd-calculator" className="text-blue-600 underline font-bold">Fixed Deposit Lab</a> for sustained passive income.
        </p></div></div></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the Labor Act 2074 and Social Security Act 2075.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "Is gratuity mandatory for all private companies in Nepal?", 
        answer: "Yes, under the Labor Act 2074, all employers, regardless of the size of the establishment, must provide gratuity benefits starting from the first day of an employee's service." 
      },
      { 
        question: "What is the current statutory gratuity rate?", 
        answer: "The statutory rate is 8.33% of the monthly basic salary, which is mathematically equivalent to receiving one month's basic salary for every year of service." 
      },
      { 
        question: "Do I get gratuity if I resign during my probation period?", 
        answer: "Yes, the law stipulates that gratuity accrues from day one. If you leave during or after probation, you are entitled to the accrued 8.33% of your basic salary for the months served." 
      },
      { 
        question: "What is the tax rate on gratuity payouts in Nepal?", 
        answer: "Lump-sum retirement gratuity payouts are subject to a 15% Final Withholding Tax (TDS). For non-pensioners, there is a tax-exempt threshold of Rs. 5,00,000 for payouts from approved funds." 
      },
      { 
        question: "How is gratuity handled for employees in the Social Security Fund (SSF)?", 
        answer: "For employees in the SSF, the 8.33% gratuity is deposited monthly into the SSF account as part of the total 31% contribution. The payout is then managed by the SSF authorities upon termination of employment." 
      },
      { 
        question: "Can an employer withhold gratuity for misconduct?", 
        answer: "An employer may only withhold gratuity in cases of 'Serious Misconduct' as defined in the Labor Act (e.g., causing significant financial loss to the company through theft or fraud), following a proper disciplinary hearing." 
      },
      { 
        question: "Does the 8.33% apply to my allowances?", 
        answer: "No, gratuity is strictly calculated based on the 'Basic Salary' as mentioned in your contract. Allowances like travel, communication, or dearness allowances are not included in the calculation." 
      },
      { 
        question: "What happens to the gratuity of a deceased employee?", 
        answer: "The accumulated gratuity of a deceased employee must be paid to their legal heirs or nominees as specified in the employment records." 
      },
      { 
        question: "Can I take a loan against my accrued gratuity?", 
        answer: "Unlike the Provident Fund (EPF), there is no standard statutory provision to take a loan against gratuity held by an employer. However, if the funds are in the SSF, specific loan facilities may be available." 
      },
      { 
        question: "Is gratuity paid out annually or at the end of service?", 
        answer: "Gratuity is usually paid out as a lump-sum at the end of the service (resignation, retirement, or termination). However, companies must accrue the expense monthly in their financial statements." 
      }
    ]
  },

  'nepse-bonus-tax': {
    title: "NEPSE Bonus & Dividend Tax Calculator | IRD Dividend Lab",
    description: "Calculate tax on bonus shares and cash dividends in Nepal. 1500+ words on 5% Final Withholding Tax, merger exemptions, and SEBON tax protocols.",
    howToUse: {
      steps: [
        "Dividend Type: Select between 'Cash Dividend' or 'Bonus Shares'.",
        "Dividend Value: Input the total cash amount or the percentage of bonus shares.",
        "Tax Status: Confirm the 5% standard rate for individuals.",
        "Merger Audit: Check if the company qualifies for the 2-year merger tax exemption.",
        "Net Payout: Analyze the final amount credited to your bank or the tax payable for bonus shares.",
        "Compliance View: Review the TDS entry in your IRD tax profile."
      ]
    },
    formula: {
      title: "The Dividend Tax Axiom",
      description: "In Nepal, dividends are subject to a Final Withholding Tax (TDS). For bonus shares, the tax is calculated based on the face value (typically Rs. 100).",
      raw: "Tax = (Cash Amount x 5%) or (Bonus Shares x Face Value x 5%)"
    },
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-300">
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Bonus & Dividend Taxation in Nepal</h2>
        <div className="bg-[#fff3e0] border-2 border-[#ffb74d]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fb8c00] rounded-full blur-[120px] opacity-10" />
        <h4 className="text-[#e65100] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Passive Income Compliance Lab</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#5d4037] uppercase tracking-tighter">
        <a href="#cash" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>01.</span> Cash Dividend: The 5% Final TDS</a>
        <a href="#bonus" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>02.</span> Bonus Share Tax: Face Value Math</a>
        <a href="#mergers" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>03.</span> Merger Exemptions: The 2-Year Grace</a>
        <a href="#corporate" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>04.</span> Individual vs Corporate Tax Slabs</a>
        <a href="#meroshare" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>05.</span> Tax Payment via Bank for Bonus Shares</a>
        <a href="#verification" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>06.</span> Checking TDS in the IRD Portal</a>
        <a href="#capital" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>07.</span> Bonus Shares vs Right Shares Tax</a>
        <a href="#mutual" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>08.</span> Mutual Fund Dividend Tax Policy</a>
        <a href="#strategies" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>09.</span> Maximizing Net Yield via Mergers</a>
        <section id="cash" className="mb-16">
        <h3 className="text-2xl font-black text-[#202124] mb-6">1. Cash Dividends: Final Withholding</h3>
        <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
        For individual investors in Nepal, cash dividends are subject to a flat <strong>5% Final Withholding Tax (TDS </strong>. This means the company will deduct the tax before depositing the money into your bank account. You do not need to include this in your annual income tax return.
        </p>
        <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg mb-8">
        <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Logic:</p>
        <p className="text-[11px] text-[#5f6368] leading-relaxed">
        "If a company declares a 20% cash dividend on your Rs. 10,000 face value (100 shares the gross dividend is Rs. 2,000. After the 5% TDS (Rs. 100 you will receive a net amount of Rs. 1,900."
        </p>
        
        <section id="mergers" className="mb-16 p-10 bg-[#e8f5e9] border border-[#81c784]/30 rounded-lg">
        <h3 className="text-2xl font-black text-[#1b5e20] mb-4">2. Merger Tax Exemptions: The Strategic Shield</h3>
        <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
        To encourage market consolidation, the Government of Nepal provides a tax exemption on dividends for companies that have recently merged.
        </p>
        <div className="bg-white p-8 rounded-2xl border border-[#c8e6c9]">
        <p className="text-xs font-black text-[#2e7d32] uppercase mb-4 tracking-widest text-center">The 2-Year Rule</p>
        <p className="text-[11px] text-[#5f6368] leading-relaxed text-center italic">
        "Dividends distributed within two years of a successful merger are generally exempt from the 5% TDS. Our calculator identifies these companies to help you maximize your net yield."
        </p>
        
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8"><div className="mt-4 pt-4 border-t border-[#dadce0]">
        <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
        <div className="flex flex-wrap gap-3 text-sm">
        <a href="/calculator/kukl-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Kukl Bill</a>
        <a href="/calculator/mortgage-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Mortgage Calculator</a>
        <a href="/calculator/compound-interest/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Compound Interest</a>
        <a href="/calculator/nepal-income-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Income Tax</a>
        <a href="/calculator/sip-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Sip Calculator</a>
        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
        <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Dividend Intelligence Silo</p>
        <div className="flex flex-wrap justify-center gap-4">
        <a href="/calculator/nepse-wacc/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">WACC Auditor</a>
        <a href="/calculator/nepal-stocks/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Trading Lab</a>
        <a href="/calculator/cagr-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Yield Auditor</a>
        
        
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { question: "Why didn't I receive my bonus shares in MeroShare?", answer: "Bonus shares are usually credited to your DEMAT account after the AGM (Annual General Meeting) approves them and they are listed on NEPSE. This process can take 1-3 months." },
      { question: "Is dividend tax the same for promoters and public shareholders?", answer: "Yes. In Nepal, the 5% Final Withholding Tax applies equally to both promoter and public shareholding categories for individuals." },
      { question: "What is the tax on right shares in Nepal?", answer: "There is no direct tax on right shares at the time of purchase (since you buy them at face value, Rs. 100). However, selling them later will attract Capital Gains Tax (CGT) based on your adjusted WACC." },
      { question: "Do I need to pay tax on bonus shares separately?", answer: "Sometimes. If the company does not declare a cash dividend to cover the 5% tax on bonus shares, you may need to deposit the tax amount at the company's designated bank account before the bonus shares are credited." },
      { question: "Is there any tax on dividends from Mutual Funds?", answer: "Dividends from Mutual Funds in Nepal are also subject to a 5% Final Withholding Tax (TDS) for individual investors." },
      { question: "Can I claim a tax refund for dividend TDS?", answer: "No. Since dividend tax is a 'Final Withholding Tax' in Nepal, it cannot be adjusted against other income tax or claimed as a refund." }
    ]
  },

  'nepal-income-tax': {
    title: "Nepal Income Tax Calculator 2082/83 | Salary Tax Slab Auditor",
    description: "Accurate Nepal income tax calculation for FY 2082/83 (2025/26). Includes 1% SST, SSF deductions, female rebate, and married vs single slab tables.",
    howToUse: {
      steps: [
        "1. Marital Configuration: Select your filing status (Single or Married) to determine your initial tax-free slab.",
        "2. Income Entry: Input your monthly gross salary including all fixed allowances.",
        "3. Bonus Integration: Add your Dashain bonus or other performance incentives to the annual aggregate.",
        "4. Retirement Audit: Define your monthly contributions to SSF, CIT, or Provident Fund.",
        "5. Insurance Rebate: Enter your annual life insurance premium (up to Rs. 40,000 credit).",
        "6. Slab Analysis: Review the progressive tax breakdown (1% to 39%) across multiple buckets.",
        "7. Net Disbursement: View your final monthly take-home pay after all statutory deductions.",
        "8. Strategy Audit: Use the results to optimize your voluntary CIT contributions for maximum tax efficiency."
      ]
    },
    formula: {
      title: "The Progressive Income Tax Algorithm",
      description: "Nepal follows a multi-slab progressive tax system where higher income buckets are taxed at higher percentages, while the initial bucket serves as a social security floor.",
      raw: "Taxable Income = Gross Income - (SSF/PF + CIT + Insurance Rebate)",
      variables: [
        "Single Slab: 1% up to 5L, 10% next 2L, 20% next 3L, 30% next 10L, 36% next 30L, 39% above 50L.",
        "Married Slab: 1% up to 6L, 10% next 2L, 20% next 3L, 30% next 9L, 36% next 30L, 39% above 50L.",
        "SSF Exemption: Employees contributing to SSF do NOT pay the 1% Social Security Tax on the first slab."
      ]
    },
    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        FY 2082/83 Income Tax Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Nepal's income tax landscape for <strong>Fiscal Year 2082/83 (2025/26 </strong> continues to follow a progressive slab system regulated by the <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 underline font-semibold transition-colors">Inland Revenue Department (IRD) </a>. For individual taxpayers, the core challenge lies in navigating the complex interplay between Social Security Fund (SSF exemptions, female tax rebates, and the 1% Social Security Tax (SST . This professional <a href="/calculator/nepal-income-tax" className="text-blue-700 hover:text-blue-900 underline font-bold transition-colors">Income Tax Lab</a> is synchronized with the latest Finance Act, providing 100% accuracy for both formal sector employees and independent consultants.
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Competitive Market Audit: Why CalcPro is Superior
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900">Competitor</th>
        <th className="p-4 font-black text-slate-900">Feature Gap</th>
        <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr>
        <td className="p-4 font-semibold">NepalCalculator</td>
        <td className="p-4">No SSF/EPF detail; no female rebate example.</td>
        <td className="p-4 text-green-700 font-bold">Full Deduction Matrix</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">NotaryNepal</td>
        <td className="p-4">No married vs single comparison table.</td>
        <td className="p-4 text-green-700 font-bold">Dynamic Comparison</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Kokil.com.np</td>
        <td className="p-4">No worked examples for complex cases.</td>
        <td className="p-4 text-green-700 font-bold">Case Study Engine</td>
        </tr>
        </tbody>
        </table>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-blue-600">📊</span> The IRD Slab Matrix (2082/83 </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
        Nepal uses a progressive income tax system. This means you don't pay a flat percentage on your entire salary; instead, your income is divided into "buckets" (slabs and each bucket is taxed at a specific rate.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="space-y-4">
        <h4 className="font-bold text-slate-800 border-b pb-2">Single Individual</h4>
        <ul className="space-y-2 text-sm">
        <li className="flex justify-between"><span>Up to 5,00,000</span> <span className="font-bold text-blue-600">1% (SST </span></li>
        <li className="flex justify-between"><span>Next 2,00,000</span> <span className="font-bold text-blue-600">10%</span></li>
        <li className="flex justify-between"><span>Next 3,00,000</span> <span className="font-bold text-blue-600">20%</span></li>
        <li className="flex justify-between"><span>Next 10,00,000</span> <span className="font-bold text-blue-600">30%</span></li>
        <li className="flex justify-between"><span>Next 30,00,000</span> <span className="font-bold text-blue-600">36%</span></li>
        <li className="flex justify-between"><span>Above 50,00,000</span> <span className="font-bold text-blue-600">39%</span></li>
        </ul>
        <div className="space-y-4">
        <h4 className="font-bold text-slate-800 border-b pb-2">Married Couple</h4>
        <ul className="space-y-2 text-sm">
        <li className="flex justify-between"><span>Up to 6,00,000</span> <span className="font-bold text-blue-600">1% (SST </span></li>
        <li className="flex justify-between"><span>Next 2,00,000</span> <span className="font-bold text-blue-600">10%</span></li>
        <li className="flex justify-between"><span>Next 3,00,000</span> <span className="font-bold text-blue-600">20%</span></li>
        <li className="flex justify-between"><span>Next 9,00,000</span> <span className="font-bold text-blue-600">30%</span></li>
        <li className="flex justify-between"><span>Next 30,00,000</span> <span className="font-bold text-blue-600">36%</span></li>
        <li className="flex justify-between"><span>Above 50,00,000</span> <span className="font-bold text-blue-600">39%</span></li>
        </ul>
        <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 italic">
        <strong>Pro Tip:</strong> If you contribute to the Social Security Fund (SSF the 1% Social Security Tax is completely waived. This effectively makes the first slab 0%.</div></div></div></div>
        </section>
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-blue-400">🛡️</span> Legal Tax Shields: SSF, CIT, and Rebates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
        <h4 className="text-blue-400 font-bold text-sm mb-2">SSF/EPF Deductions</h4>
        <p className="text-xs text-slate-300 leading-relaxed">
        Up to 1/3rd of your gross income or Rs. 3,00,000 (whichever is lower can be deducted as retirement contributions.
        </p>
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
        <h4 className="text-blue-400 font-bold text-sm mb-2">Female Rebate</h4>
        <p className="text-xs text-slate-300 leading-relaxed">
        Female employees with only salary income are eligible for a <strong>10% rebate</strong> on their total tax liability.
        </p>
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
        <h4 className="text-blue-400 font-bold text-sm mb-2">Insurance Rebate</h4>
        <p className="text-xs text-slate-300 leading-relaxed">
        Deduct up to Rs. 40,000 for Life Insurance premiums and Rs. 20,000 for Health Insurance premiums annually.
        </p>
        
        
        <section className="bg-blue-50 border border-blue-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-blue-900 mb-4">
        Strategic Case Study: The SSF Advantage
        </h3>
        <p className="text-blue-900/70 text-sm leading-relaxed mb-8">
        Let's compare two employees, both earning Rs. 1,00,000 per month (Rs. 12 Lakhs/year but one is in SSF and the other is not.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Employee A (No SSF </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Annual Tax:</span> <strong>Rs. 75,000</strong></div>
        <div className="flex justify-between"><span>1% SST:</span> <strong>Rs. 5,000</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-red-700"><span>Net Take-Home:</span> <span>Rs. 11,20,000</span>
        <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Employee B (With SSF </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Annual Tax:</span> <strong>Rs. 62,500</strong></div>
        <div className="flex justify-between"><span>1% SST:</span> <strong className="text-green-600">Waived (Rs. 0 </strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-blue-800"><span>Net Take-Home:</span> <span>Rs. 11,37,500</span>
        <p className="text-xs text-blue-900/50 mt-8 italic text-center">
        Audit Observation: Employee B saves Rs. 17,500 annually simply by being part of the SSF ecosystem. Use our <a href="/calculator/nepal-salary" className="text-blue-600 underline font-bold">Salary Auditor</a> to see your exact savings.
        </p></div></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026 . Calculations are strictly synchronized with the Inland Revenue Department (IRD) Finance Act 2082/83.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { question: "What are the tax slabs for the 2082/83 fiscal year in Nepal?", answer: "For FY 2082/83, the slabs are: 1% (Social Security Tax) up to 5L (Single)/6L (Married), 10% for next 2L, 20% for next 3L, 30% for next 10L, and 36% for income above 20L. Note: 1% tax is waived for SSF contributors." },
      { question: "How does the SSF affect my income tax calculation?", answer: "Contributors to the Social Security Fund (SSF) are exempt from the 1% Social Security Tax on their first slab. Furthermore, your monthly SSF contribution (11%) is deducted from your gross income before tax is calculated, reducing your taxable amount." },
      { question: "Is a female tax rebate applicable to all women in Nepal?", answer: "A 10% tax rebate is provided specifically to female employees who earn income only from salary. If they have other sources of income (business, investment), this specific rebate might not apply according to IRD guidelines." },
      { question: "Can I deduct my life insurance premium from taxable income?", answer: "Yes, you can deduct the actual annual premium paid or Rs. 40,000 (whichever is lower) from your taxable income. This is a common and effective way to reduce tax liability in Nepal." },
      { question: "What is the tax rate for a married couple in Nepal?", answer: "Couples can choose to file as 'Married'. This provides a higher 1% (or 0% for SSF) tax-free threshold of Rs. 6,00,000 compared to Rs. 5,00,000 for single filers. It is usually beneficial if only one spouse is the primary earner." },
      { question: "What is the deadline for filing the personal income tax return (D-01)?", answer: "The official deadline for filing the annual tax return in Nepal is within three months of the end of the fiscal year (usually by the end of Ashwin). However, the IRD often provides extensions based on administrative decisions." }
    ]
  },
  'nepal-vat': {
    title: "Nepal VAT Calculator 2082/83 | 13% Tax & Bill Auditor",
    description: "Calculate VAT (Value Added Tax) in Nepal with 100% accuracy. Audit inclusive and exclusive bills according to the latest IRD Finance Act 2082/83.",
    
    howToUse: {
      steps: [
        "1. Base Amount Entry: Input the initial price of the goods or professional services before any tax application.",
        "2. Calculation Mode: Select 'Add VAT' if you are issuing an invoice or 'Remove VAT' if you need to extract the base price from a total bill.",
        "3. Rate Verification: The system defaults to the 13% standard rate applicable to the majority of taxable supplies in Nepal.",
        "4. Category Audit: Determine if your item is 'Standard', 'Zero-Rated' (for exports), or 'Exempt' (for basic necessities).",
        "5. Net Value Analysis: Review the 'Total Taxable Value' which represents the price the consumer actually pays.",
        "6. Input Credit Logic: If you are a registered business, use the calculated VAT amount to track your future Input Tax Credit (ITC).",
        "7. TDS Sequence: Ensure you are not double counting tax if the transaction also requires a 1.5% professional TDS deduction.",
        "8. Compliance Check: Use the results to populate your mandatory purchase and sales books for the monthly IRD return."
      ]
    },
    
    formula: {
      title: "The Consumption Tax Axiom (Single Tier Model)",
      description: "Nepal utilizes a single tier Value Added Tax system. The calculation differs depending on whether you are adding tax to a base or extracting it from a total.",
      raw: "Adding VAT: T = P(1 + r) | Removing VAT: P = T / (1 + r)",
      variables: [
        "T = Total Amount: The final price inclusive of the 13% tax.",
        "P = Base Price: The original cost before tax application.",
        "r = VAT Rate: The decimal representation of the tax (Standard 13% = 0.13).",
        "Worked Example (Standard Addition)",
        "Base Service Fee: Rs. 1,00,000",
        "VAT Amount: 1,00,000 × 0.13 = Rs. 13,000",
        "Total Invoice: Rs. 1,13,000",
        "Worked Example (Extraction)",
        "Total Bill: Rs. 50,000",
        "Base Price: 50,000 / 1.13 = Rs. 44,247.78",
        "VAT Component: Rs. 5,752.22"
      ]
    },
    
    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Institutional Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        The Value Added Tax (VAT in Nepal, governed by the VAT Act 2052, is a consumption based indirect tax levied at each stage of the production and distribution chain. With a standard rate fixed at 13 percent, it is the primary revenue driver for the <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">Inland Revenue Department (IRD) </a>. Unlike direct taxes, VAT is collected by the business on behalf of the state, requiring meticulous record keeping and monthly reconciliation. This institutional grade calculator is designed for both consumers seeking to verify bills and businesses calculating their taxable supplies, ensuring absolute compliance with the latest Finance Act directives.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Tax Strategy: If you are an employee, calculate your annual liability using our <a href="/calculator/nepal-income-tax" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">Nepal Income Tax Lab</a> to optimize your overall fiscal position.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        VAT Registration Thresholds: 20 Lakhs vs. 50 Lakhs
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In the Nepalese regulatory framework, not all businesses are required to register for VAT. The decision to register is dictated by the "Annual Turnover" of the entity. For businesses strictly dealing in "Goods", the mandatory registration threshold is Rs. 50 Lakhs. However, for "Service" oriented businesses (like consultancies or IT firms or "Mixed" businesses (combining goods and services the threshold drops significantly to Rs. 20 Lakhs.
        </p>
        <p>
        Voluntary registration is also permitted for smaller entities looking to build credibility with institutional clients who require VAT invoices to claim Input Tax Credit. It is critical to note that once registered, you must file a "Nil Return" even if no transactions occurred during a specific month. To understand the long term growth impact of these tax structures on your business, refer to our <a href="/calculator/cagr-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">CAGR Lab</a>.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8 flex gap-4 items-start shadow-sm">
        <div className="text-amber-500 text-2xl">🏛️
        <strong className="block text-amber-700 text-sm uppercase tracking-wider mb-2 font-black">Audit Note: The 30-Day Rule</strong>
        <p className="text-sm text-amber-900/80 m-0 leading-relaxed">
        Under IRD directives, once your business crosses the turnover threshold, you must apply for VAT registration within 30 days. Failure to do so can result in retrospective tax assessment and heavy fines. Businesses are also required to display their VAT registration certificate prominently at their place of business.
        </p>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-green-600">📦</span> Schedule 1 vs. Zero-Rating
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Understanding the distinction between "Exempted" goods and "Zero-Rated" goods is the most common hurdle for tax compliance in Nepal.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Exempted Goods (Schedule 1 :</strong> These include basic necessities like unprocessed agricultural products, medicines, education, and financial services. No VAT is charged, but the business cannot claim back any VAT paid on inputs.</li>
        <li><strong>Zero-Rated Goods:</strong> Primarily applicable to the "Export of Goods and Services". While the tax rate is 0 percent, businesses CAN claim a refund for the VAT they paid on their own purchases. This is a massive institutional incentive for Nepal's IT export sector.</li>
        <li><strong>Input Tax Credit (ITC :</strong> Registered businesses deduct the VAT they pay to suppliers from the VAT they collect from customers, only remitting the "Net Value Added" portion to the government.</li>
        </ul>
        <p className="mt-4">
        For businesses managing multiple revenue streams, accurate bookkeeping is essential. Audit your project profitability using our <a href="/calculator/profit-loss-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Profit & Loss Lab</a>.
        </p>
        
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-red-400">📅</span> Compliance Deadlines: The 25th Day Rule
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        Filing VAT returns in Nepal is a monthly obligation. Unlike income tax, which is calculated annually, VAT must be reported and paid by the 25th day of the following month (e.g., Baishakh's VAT must be filed by the 25th of Jestha .
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">D-03 Form:</strong> This is the standard VAT return form used for both physical and electronic filing through the IRD portal.</p></div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Late Fines:</strong> Missing the deadline triggers a flat fine of Rs. 1,000 per month, plus an interest rate of 15% per annum on the tax amount.</p>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-red-400 uppercase tracking-widest mb-3">Institutional Warning</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Never wait until the 25th to file. The IRD server often experiences high traffic, and a simple network delay can cost your business Rs. 1,000 in penalties plus interest. Always aim for the 15th of the month."
        </p></div>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"><h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-purple-600">🌐</span> Reverse VAT: Digital Service Imports
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
        With the rise of the digital economy, many Nepalese companies import services from abroad (e.g., Facebook ads, AWS hosting, or software licenses . Under the VAT Act, if you import a taxable service from a foreign entity not registered in Nepal, YOU are responsible for calculating and paying the 13% VAT. This is known as "Reverse VAT" and is a major focus area during IRD audits.
        </p>
        <div className="mt-6 p-5 bg-purple-50 border border-purple-100 rounded-xl">
        <p className="text-xs font-bold text-purple-800 uppercase mb-2">Audit Scenario:</p>
        <p className="text-sm text-purple-900 leading-relaxed">
        A Kathmandu startup pays <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Institutional Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        The Value Added Tax (VAT in Nepal, governed by the VAT Act 2052, is a consumption based indirect tax levied at each stage of the production and distribution chain. With a standard rate fixed at 13 percent, it is the primary revenue driver for the <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">Inland Revenue Department (IRD) </a>. Unlike direct taxes, VAT is collected by the business on behalf of the state, requiring meticulous record keeping and monthly reconciliation. This institutional grade calculator is designed for both consumers seeking to verify bills and businesses calculating their taxable supplies, ensuring absolute compliance with the latest Finance Act directives.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Tax Strategy: If you are an employee, calculate your annual liability using our <a href="/calculator/nepal-income-tax" className="text-blue-600 hover:text-blue-800 underline font-bold transition-colors">Nepal Income Tax Lab</a> to optimize your overall fiscal position.
        </span>
        </p>
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        VAT Registration Thresholds: 20 Lakhs vs. 50 Lakhs
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In the Nepalese regulatory framework, not all businesses are required to register for VAT. The decision to register is dictated by the "Annual Turnover" of the entity. For businesses strictly dealing in "Goods", the mandatory registration threshold is Rs. 50 Lakhs. However, for "Service" oriented businesses (like consultancies or IT firms or "Mixed" businesses (combining goods and services the threshold drops significantly to Rs. 20 Lakhs.
        </p>
        <p>
        Voluntary registration is also permitted for smaller entities looking to build credibility with institutional clients who require VAT invoices to claim Input Tax Credit. It is critical to note that once registered, you must file a "Nil Return" even if no transactions occurred during a specific month. To understand the long term growth impact of these tax structures on your business, refer to our <a href="/calculator/cagr-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">CAGR Lab</a>.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8 flex gap-4 items-start shadow-sm">
        <div className="text-amber-500 text-2xl">🏛️
        <strong className="block text-amber-700 text-sm uppercase tracking-wider mb-2 font-black">Audit Note: The 30-Day Rule</strong>
        <p className="text-sm text-amber-900/80 m-0 leading-relaxed">
        Under IRD directives, once your business crosses the turnover threshold, you must apply for VAT registration within 30 days. Failure to do so can result in retrospective tax assessment and heavy fines. Businesses are also required to display their VAT registration certificate prominently at their place of business.
        </p>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-green-600">📦</span> Schedule 1 vs. Zero-Rating
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Understanding the distinction between "Exempted" goods and "Zero-Rated" goods is the most common hurdle for tax compliance in Nepal.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Exempted Goods (Schedule 1 :</strong> These include basic necessities like unprocessed agricultural products, medicines, education, and financial services. No VAT is charged, but the business cannot claim back any VAT paid on inputs.</li>
        <li><strong>Zero-Rated Goods:</strong> Primarily applicable to the "Export of Goods and Services". While the tax rate is 0 percent, businesses CAN claim a refund for the VAT they paid on their own purchases. This is a massive institutional incentive for Nepal's IT export sector.</li>
        <li><strong>Input Tax Credit (ITC :</strong> Registered businesses deduct the VAT they pay to suppliers from the VAT they collect from customers, only remitting the "Net Value Added" portion to the government.</li>
        </ul>
        <p className="mt-4">
        For businesses managing multiple revenue streams, accurate bookkeeping is essential. Audit your project profitability using our <a href="/calculator/profit-loss-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Profit & Loss Lab</a>.
        </p>
        
        
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-red-400">📅</span> Compliance Deadlines: The 25th Day Rule
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        Filing VAT returns in Nepal is a monthly obligation. Unlike income tax, which is calculated annually, VAT must be reported and paid by the 25th day of the following month (e.g., Baishakh's VAT must be filed by the 25th of Jestha .
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4"><div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">1
        <p className="text-sm text-slate-300"><strong className="text-white">D-03 Form:</strong> This is the standard VAT return form used for both physical and electronic filing through the IRD portal.</p></div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">2
        <p className="text-sm text-slate-300"><strong className="text-white">Late Fines:</strong> Missing the deadline triggers a flat fine of Rs. 1,000 per month, plus an interest rate of 15% per annum on the tax amount.</p>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-red-400 uppercase tracking-widest mb-3">Institutional Warning</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Never wait until the 25th to file. The IRD server often experiences high traffic, and a simple network delay can cost your business Rs. 1,000 in penalties plus interest. Always aim for the 15th of the month."
        </p></div>
        
        
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-purple-600">🌐</span> Reverse VAT: Digital Service Imports
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
        With the rise of the digital economy, many Nepalese companies import services from abroad (e.g., Facebook ads, AWS hosting, or software licenses . Under the VAT Act, if you import a taxable service from a foreign entity not registered in Nepal, YOU are responsible for calculating and paying the 13% VAT. This is known as "Reverse VAT" and is a major focus area during IRD audits.
        </p>
        <div className="mt-6 p-5 bg-purple-50 border border-purple-100 rounded-xl">
        <p className="text-xs font-bold text-purple-800 uppercase mb-2">Audit Scenario:</p>
        <p className="text-sm text-purple-900 leading-relaxed">
        A Kathmandu startup pays $1,000 for server hosting. Since the hosting provider is not a Nepalese entity, the startup must calculate 13% of the payment value (in NPR equivalent and deposit it to the IRD, even though no VAT was listed on the original USD invoice.
        </p>
        
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Institutional Bookkeeping Essentials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📖</span> Purchase Book
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Every VAT registered entity must maintain a Purchase Book (Annexure 8 . It must record every purchase with the supplier's PAN, the invoice number, and the VAT amount paid. This is your evidence for claiming Input Tax Credit.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">📊</span> Sales Book
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The Sales Book (Annexure 7 tracks every invoice you issue. It must be balanced monthly against your physical invoices and the IRD approved billing software logs. Discrepancies here are the primary cause of audit red flags.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">📜</span> Tax Invoice
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        A valid VAT invoice in Nepal must contain your PAN, the customer's PAN (if above Rs. 10,000 a sequential invoice number, and the 13% tax clearly separated from the base price. Handwritten invoices must be on IRD pre-approved pads.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The ITC Optimization
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        A restaurant in Thamel has a monthly sales revenue of <strong>Rs. 10,00,000</strong> (excluding VAT . To generate this, they purchased ingredients and supplies worth <strong>Rs. 4,00,000</strong> (excluding VAT from VAT registered suppliers. Let's audit their net tax payable:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Output Tax (Collected </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Sales:</span> <strong>Rs. 10 Lakhs</strong></div>
        <div className="flex justify-between"><span>VAT (13% :</span> <strong>Rs. 1,30,000</strong></div>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Input Credit (Already Paid </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Purchases:</span> <strong>Rs. 4 Lakhs</strong></div>
        <div className="flex justify-between text-green-600"><span>VAT Paid:</span> <strong>Rs. 52,000</strong>
        <p className="text-sm font-bold text-indigo-900 mt-8 text-center bg-white py-4 rounded-xl border border-indigo-100 shadow-sm">
        Net VAT Payable to IRD = Rs. 1,30,000 - Rs. 52,000 = Rs. 78,000
        </p>
        <p className="text-xs text-indigo-900/50 mt-6 italic">
        Audit Observation: By purchasing from VAT registered suppliers, the restaurant reduced their cash outflow by <strong>Rs. 52,000</strong>. If they had bought from unregistered vendors, they would have to pay the full Rs. 1,30,000 to the government. This highlights the institutional efficiency of the VAT chain. Balance your cash flow using our <a href="/calculator/sip-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">SIP Lab</a> to reinvest these tax savings.
        </p></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the Value Added Tax Act 2052 and latest IRD Unified Directives.
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        
        
        
        
        
        </section>
        </div>
        
        
        
        </section>
        </div>
        
        </div>
        </div>
        </div>
        </div>
        
        
        
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>,000 for server hosting. Since the hosting provider is not a Nepalese entity, the startup must calculate 13% of the payment value (in NPR equivalent and deposit it to the IRD, even though no VAT was listed on the original USD invoice.
        </p>
        
        
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Institutional Bookkeeping Essentials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📖</span> Purchase Book
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Every VAT registered entity must maintain a Purchase Book (Annexure 8 . It must record every purchase with the supplier's PAN, the invoice number, and the VAT amount paid. This is your evidence for claiming Input Tax Credit.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">📊</span> Sales Book
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The Sales Book (Annexure 7 tracks every invoice you issue. It must be balanced monthly against your physical invoices and the IRD approved billing software logs. Discrepancies here are the primary cause of audit red flags.
        </p>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">📜</span> Tax Invoice
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        A valid VAT invoice in Nepal must contain your PAN, the customer's PAN (if above Rs. 10,000 a sequential invoice number, and the 13% tax clearly separated from the base price. Handwritten invoices must be on IRD pre-approved pads.
        </p>
        
        
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The ITC Optimization
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        A restaurant in Thamel has a monthly sales revenue of <strong>Rs. 10,00,000</strong> (excluding VAT . To generate this, they purchased ingredients and supplies worth <strong>Rs. 4,00,000</strong> (excluding VAT from VAT registered suppliers. Let's audit their net tax payable:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Output Tax (Collected </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Sales:</span> <strong>Rs. 10 Lakhs</strong></div>
        <div className="flex justify-between"><span>VAT (13% :</span> <strong>Rs. 1,30,000</strong></div>
        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md"><h4 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Input Credit (Already Paid </h4></div>
        <div className="space-y-2 text-sm text-slate-700">
        <div className="flex justify-between"><span>Purchases:</span> <strong>Rs. 4 Lakhs</strong></div>
        <div className="flex justify-between text-green-600"><span>VAT Paid:</span> <strong>Rs. 52,000</strong>
        <p className="text-sm font-bold text-indigo-900 mt-8 text-center bg-white py-4 rounded-xl border border-indigo-100 shadow-sm">
        Net VAT Payable to IRD = Rs. 1,30,000 - Rs. 52,000 = Rs. 78,000
        </p>
        <p className="text-xs text-indigo-900/50 mt-6 italic">
        Audit Observation: By purchasing from VAT registered suppliers, the restaurant reduced their cash outflow by <strong>Rs. 52,000</strong>. If they had bought from unregistered vendors, they would have to pay the full Rs. 1,30,000 to the government. This highlights the institutional efficiency of the VAT chain. Balance your cash flow using our <a href="/calculator/sip-calculator" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">SIP Lab</a> to reinvest these tax savings.
        </p></div></div></div></div></div>
        </section>
        
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Jestha 2083 (June 2026 . Calculations strictly conform to the Value Added Tax Act 2052 and latest IRD Unified Directives.
        
        
        
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "Is the VAT rate in Nepal 13% for everything?", 
        answer: "Yes, Nepal follows a single-tier VAT system with a standard rate of 13%. However, some items are 'Zero-Rated' (0%) like exports, and some are 'Exempt' (no VAT) like basic food and medicines. There are no other intermediate slabs like 5% or 18%." 
      },
      { 
        question: "When is the deadline for monthly VAT filing in Nepal?", 
        answer: "The deadline is the 25th day of the following Nepalese month. For example, the VAT for the month of Magh must be filed and the tax paid by the 25th of Falgun. Missing this deadline results in automatic penalties and interest." 
      },
      { 
        question: "Can I claim VAT back on my personal grocery shopping?", 
        answer: "No. Only VAT-registered businesses can claim 'Input Tax Credit' (VAT back) and only for purchases related to their taxable business activities. Personal consumption VAT is the final tax and is not refundable." 
      },
      { 
        question: "What is the turnover threshold for mandatory VAT registration?", 
        answer: "For businesses selling only goods, the threshold is Rs. 50 Lakhs per year. For service providers (like freelancers, consultants, or hotels) or mixed businesses, the threshold is much lower at Rs. 20 Lakhs per year." 
      },
      { 
        question: "What is a 'Nil Return' in VAT?", 
        answer: "If your VAT-registered business had zero sales and zero purchases in a particular month, you must still file a 'Nil Return' to notify the IRD. Failure to file a Nil Return still attracts a fine of Rs. 1,000." 
      },
      { 
        question: "Is a PAN bill the same as a VAT invoice?", 
        answer: "No. A PAN bill is issued by businesses not registered in VAT. You cannot claim Input Tax Credit using a simple PAN bill. To claim tax back, you must have a 'Tax Invoice' which clearly displays the 13% VAT amount and the supplier's VAT registration number." 
      },
      { 
        question: "What happens if I overpay VAT in a particular month?", 
        answer: "If your 'Input Tax' (VAT paid) is higher than your 'Output Tax' (VAT collected), the excess amount is carried forward to the next month as a credit. You can continue carrying this forward indefinitely until it is offset by future sales." 
      },
      { 
        question: "Can I get a VAT refund for exports from Nepal?", 
        answer: "Yes. Since exports are Zero-Rated, exporters usually have a high amount of input tax credit. You can apply for a cash refund from the IRD if your credit balance remains for more than 4 consecutive months." 
      },
      { 
        question: "Do IT freelancers in Nepal need to register for VAT?", 
        answer: "If an IT freelancer's annual earnings exceed Rs. 20 Lakhs, they must register for VAT. However, since most IT work for foreign clients is considered an export of services, it is Zero-Rated (0%), allowing them to claim back VAT on laptops, internet, and office rent." 
      },
      { 
        question: "What is the penalty for not issuing a VAT invoice in Nepal?", 
        answer: "Failure to issue a mandatory tax invoice can result in a fine of Rs. 10,000 per instance or a percentage of the transaction value, depending on the severity of the evasion detected by IRD officers." 
      }
    ]
  },

  'loan-emi': {
    title: "Loan EMI Calculator Nepal 2082/83 | Interest & Amortization Lab",
    description: "Accurate loan EMI calculation for Nepal. Verify home, auto, and personal loan EMIs against NRB base rates. Includes reducing balance amortization and penalty audits.",
    howToUse: {
      steps: [
        "1. Principal Initialization: Input the exact total loan amount (Principal) approved by your bank.",
        "2. Rate Configuration: Enter the annual interest rate quoted by the bank.",
        "3. Tenure Allocation: Set the exact loan tenure in years or months.",
        "4. Precise Audit: View the generated monthly EMI figure and total interest payable."
      ]
    },
    formula: {
      title: "The Equated Monthly Installment (EMI) Formula",
      description: "Mandated by Nepal Rastra Bank for all A, B & C class financial institutions.",
      raw: "EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]",
      variables: ["P = Principal", "R = Monthly Interest Rate", "N = Tenure in Months"]
    },
    content: (
        <div className="space-y-12">
            <section className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Debt Management Executive Summary</h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Accurate Equated Monthly Installment (EMI) estimation is the cornerstone of managing personal and corporate liquidity in Nepal's volatile financial environment.
                </p>
            </section>
        </div>
    ),
    faqs: [
      { question: "Can I pay off my loan early?", answer: "Yes, you can prepay your loan, but banks may charge a penalty." }
    ]
  }
};