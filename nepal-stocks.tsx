        <div className="space-y-16">
            {/* Overview Section */}
            <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-10 shadow-sm">
                <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-4">
                    NEPSE Stock Brokerage & Tax Auditor Overview
                </h2>
                <h3 className="text-3xl font-black mb-6 leading-tight text-slate-900">
                    Mastering NEPSE Transaction Costs and Profitability
                </h3>
                <p className="text-slate-800 text-lg leading-relaxed mb-6">
                    Trading on the Nepal Stock Exchange (NEPSE) involves more than just buying low and selling high. Every transaction is subject to a layered structure of commissions, regulatory fees, and taxation that directly impacts your actual realized profit. The SEBON-mandated broker commissions, SEBON regulatory fees, DP (Depository Participant) charges, and Capital Gains Tax (CGT) can collectively erode thin profit margins if not accurately accounted for. This professional-grade NEPSE calculator is designed to provide institutional-level transparency into every rupee deducted during a trade, ensuring retail investors and day traders in Nepal can calculate their true breakeven points and net yields.
                </p>
                <div className="bg-indigo-100 p-6 rounded-xl border border-indigo-200">
                    <span className="text-sm text-indigo-900 font-medium">
                        <strong>Expert Insight:</strong> Before executing large volume trades, you must understand your baseline costs. We recommend calculating your precise entry price using our <a href="/calculator/nepse-wacc/" className="text-indigo-700 hover:text-indigo-900 underline font-black transition-colors">WACC Calculator</a> to ensure you are accurately declaring your cost basis for tax purposes.
                    </span>
                </div>
            </div>

            {/* Section 1: The Anatomy of a NEPSE Trade */}
            <section className="space-y-8">
                <h3 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-4">
                    <span className="text-indigo-600">📊</span> The Anatomy of a NEPSE Trade
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg">
                        <p>
                            When you execute a buy or sell order through the Trade Management System (TMS), the quoted stock price is only the gross value. The final amount debited from your bank (on a buy) or credited to your account (on a sell) incorporates several mandatory deductions.
                        </p>
                        <p className="mt-4">
                            The primary cost driver is the Broker Commission, which operates on a sliding scale defined by the Securities Board of Nepal (SEBON). As your transaction volume increases, the percentage charged by the broker decreases. In addition to this, there are fixed regulatory fees and flat-rate charges levied by the DP for transferring shares into or out of your Demat account.
                        </p>
                    </div>
                    <div className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-xl border border-slate-800 relative">
                        <h4 className="text-xl font-black mb-6 border-b border-slate-700 pb-4">Fee Structure Breakdown</h4>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center">
                                <span className="font-bold text-indigo-400">Broker Commission</span>
                                <span className="text-sm">0.27% to 0.40% (Sliding)</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="font-bold text-indigo-400">SEBON Fee</span>
                                <span className="text-sm">0.015% of Transaction</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="font-bold text-indigo-400">DP Fee (MeroShare)</span>
                                <span className="text-sm">Flat Rs. 25 per stock</span>
                            </li>
                            <li className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
                                <span className="font-bold text-emerald-400">Capital Gains Tax (CGT)</span>
                                <span className="text-sm">5% or 7.5% (On Profit Only)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 2: SEBON Sliding Commission Scale */}
            <section className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm">
                <h3 className="text-3xl font-black text-slate-900 mb-6">
                    Understanding the Broker Commission Slabs
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed mb-10 max-w-4xl">
                    SEBON revised the broker commission rates to encourage higher trading volumes. The system is designed to reward bulk transactions with lower percentage fees. However, retail investors making smaller trades must factor in the higher 0.40% bracket into their breakeven analysis.
                </p>
                
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-900 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="p-6">Transaction Amount (Rs.)</th>
                                <th className="p-6">Commission Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-medium">Up to Rs. 50,000</td>
                                <td className="p-6 text-indigo-600 font-black">0.40%</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-medium">Rs. 50,000 to Rs. 5,00,000</td>
                                <td className="p-6 text-indigo-600 font-black">0.37%</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-medium">Rs. 5,00,000 to Rs. 20,00,000</td>
                                <td className="p-6 text-indigo-600 font-black">0.34%</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-medium">Rs. 20,00,000 to Rs. 1,00,00,000</td>
                                <td className="p-6 text-indigo-600 font-black">0.30%</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 font-medium">Above Rs. 1,00,00,000 (1 Crore)</td>
                                <td className="p-6 text-emerald-600 font-black">0.27%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 3: Capital Gains Tax (CGT) Dynamics */}
            <section className="bg-slate-900 rounded-[3.5rem] p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row gap-16">
                    <div className="flex-1 space-y-8">
                        <div className="inline-block px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 text-xs font-black uppercase tracking-widest">
                            Taxation Framework
                        </div>
                        <h3 className="text-4xl font-black leading-tight">
                            Navigating Capital Gains: <br/><span className="text-indigo-400 italic">Short-Term vs. Long-Term</span>
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            The Nepal Government introduced a dual-tier Capital Gains Tax system to discourage excessive speculation and encourage long-term investing. The tax is only levied on your Net Profit (Selling Price minus Base Cost and all associated transaction fees). If you sell at a loss, no CGT is applicable.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                                <h4 className="font-black text-rose-400 mb-2 text-xl">7.5% CGT</h4>
                                <p className="text-slate-400 text-sm"><strong>Short-Term Holdings:</strong> Applied if you sell the shares within 365 days of purchase. Primarily affects day traders and swing traders.</p>
                            </div>
                            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                                <h4 className="font-black text-emerald-400 mb-2 text-xl">5.0% CGT</h4>
                                <p className="text-slate-400 text-sm"><strong>Long-Term Holdings:</strong> Applied if you hold the shares for more than 365 days before selling. Designed to reward investors.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-[350px] space-y-6 flex flex-col justify-center">
                        <div className="bg-indigo-900/50 p-6 rounded-2xl border border-indigo-700/50">
                            <p className="text-xs text-indigo-300 font-bold uppercase mb-3">Institutional Planning</p>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Understanding your tax liability is crucial when receiving bonus shares. You can evaluate the tax implications of stock dividends using our <a href="/calculator/nepse-bonus-tax/" className="text-white underline font-bold">Bonus Tax Calculator</a>. Furthermore, for non-stock related capital gains, utilize the general <a href="/calculator/nepal-tds/" className="text-white underline font-bold">TDS Calculator</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Strategic Trading & Breakeven Analysis */}
            <section className="space-y-8">
                <h3 className="text-3xl font-black text-slate-900 mb-8 text-center">
                    The Mathematics of Breakeven in NEPSE
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-amber-50 rounded-3xl border border-amber-200">
                        <h4 className="text-xl font-black text-amber-900 mb-4 flex items-center gap-3">
                            <span className="text-2xl">⚖️</span> Calculating Your True Breakeven
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed mb-6">
                            Because fees are applied on both the buy side and the sell side, a stock must appreciate by a specific percentage just for you to break even. For retail trades (under Rs. 50,000), the combined broker commission (0.40% buy + 0.40% sell) plus SEBON fees (0.015% x 2) plus the Rs. 25 DP fee means the stock must roughly appreciate by at least 1.0% to 1.2% before you see a single rupee of actual profit.
                        </p>
                        <p className="text-sm text-slate-700 font-bold">
                            Day traders operating on 1% margins are mathematically destined to lose money in the current NEPSE fee structure unless trading in massive institutional volumes.
                        </p>
                    </div>
                    
                    <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-200">
                        <h4 className="text-xl font-black text-emerald-900 mb-4 flex items-center gap-3">
                            <span className="text-2xl">📈</span> SIP vs Active Trading
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed mb-6">
                            Given the friction costs of active trading, many Nepalese professionals are pivoting towards systematic investing. By buying fundamentally strong stocks or mutual funds every month, you minimize the impact of trading fees and benefit from long-term compounding.
                        </p>
                        <div className="space-y-3">
                            <a href="/calculator/sip-calculator/" className="block p-3 bg-white rounded-xl border border-emerald-100 text-emerald-700 font-bold text-sm hover:shadow-md transition-shadow">
                                Model a Monthly Investment Plan →
                            </a>
                            <a href="/calculator/cagr-calculator/" className="block p-3 bg-white rounded-xl border border-emerald-100 text-emerald-700 font-bold text-sm hover:shadow-md transition-shadow">
                                Check Historical Stock Returns →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
