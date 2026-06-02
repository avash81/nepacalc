        <div className="space-y-16">
            {/* Overview Section */}
            <div className="bg-sky-50 border-l-4 border-sky-600 rounded-r-xl p-10 shadow-sm">
                <h2 className="text-sky-700 font-black text-xs uppercase tracking-[0.3em] mb-4">
                    Nepal Salary & Tax Auditor Overview
                </h2>
                <h3 className="text-3xl font-black mb-6 leading-tight text-slate-900">
                    Navigating Income Tax and Take-Home Pay in Nepal
                </h3>
                <p className="text-slate-800 text-lg leading-relaxed mb-6">
                    Understanding exactly how much of your gross salary makes it into your bank account is crucial for personal financial planning in Nepal. The transition from your official offer letter (Gross Salary) to your actual monthly deposit (Net Salary) involves a complex web of deductions, statutory contributions, and progressive tax slabs governed by the Inland Revenue Department (IRD). Whether you are an entry-level professional negotiating your first contract or a senior executive managing multiple income streams, accurately projecting your tax liability is essential for budgeting and wealth creation.
                </p>
                <div className="bg-sky-100 p-6 rounded-xl border border-sky-200">
                    <span className="text-sm text-sky-900 font-medium">
                        <strong>Expert Insight:</strong> Your Net Salary is the foundation of your investment journey. Once you know your true take-home pay, we strongly advise using our <a href="/calculator/sip-calculator/" className="text-sky-700 hover:text-sky-900 underline font-black transition-colors">SIP Calculator</a> to automate a fixed percentage into mutual funds immediately upon salary credit.
                    </span>
                </div>
            </div>

            {/* Section 1: The Anatomy of a Nepalese Payslip */}
            <section className="space-y-8">
                <h3 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-4">
                    <span className="text-sky-600">📄</span> The Anatomy of a Nepalese Payslip
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg">
                        <p>
                            A standard payslip in Nepal is divided into Earnings and Deductions. The 'Earnings' side typically includes your Basic Salary along with various allowances such as Dearness Allowance (DA), House Rent Allowance (HRA), Transport Allowance, and sometimes Communication Allowances. For tax purposes, all these cash components are generally aggregated to form your Gross Taxable Income, unless specifically exempted under the Income Tax Act, 2058.
                        </p>
                        <p className="mt-4">
                            The 'Deductions' side is where the complexity lies. This section captures both your mandatory retirement contributions and your tax obligations (TDS - Tax Deducted at Source). The core deductions you will encounter are the Provident Fund (SSF or EPF) and the Social Security Tax (or the progressive Income Tax slabs).
                        </p>
                    </div>
                    <div className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-xl border border-slate-800 relative">
                        <h4 className="text-xl font-black mb-6">Core Components Breakdown</h4>
                        <div className="space-y-4">
                            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                                <h5 className="font-bold text-sky-400 mb-1">1. Basic Salary (आधारभूत तलब)</h5>
                                <p className="text-sm text-slate-400">The core component of your pay. Statutory deductions like EPF/SSF are usually calculated as a percentage of this figure, not the Gross.</p>
                            </div>
                            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                                <h5 className="font-bold text-sky-400 mb-1">2. Allowances (भत्ता)</h5>
                                <p className="text-sm text-slate-400">Additions like HRA and DA. While they boost your Gross, they are fully taxable unless specified otherwise.</p>
                            </div>
                            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                                <h5 className="font-bold text-emerald-400 mb-1">3. Retirement Contributions</h5>
                                <p className="text-sm text-slate-400">10% EPF + 10% Employer Contribution, or the 11% + 20% model under the Social Security Fund (SSF).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Statutory Deductions & Retirement Funds */}
            <section className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm">
                <h3 className="text-3xl font-black text-slate-900 mb-6">
                    Statutory Deductions: EPF, CIT, and SSF
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed mb-10 max-w-4xl">
                    Before calculating income tax, certain deductions are subtracted from your gross income to arrive at your Taxable Income. These deductions represent your forced savings towards retirement. The landscape of these funds has shifted significantly with the introduction of the Social Security Fund (SSF).
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                        <h4 className="text-xl font-black text-blue-900 mb-4">Employees' Provident Fund (EPF / Sanchaya Kosh)</h4>
                        <p className="text-blue-800/80 mb-6 text-sm leading-relaxed">The traditional retirement fund. You contribute 10% of your basic salary, and the employer matches it with another 10%.</p>
                        <a href="/calculator/nepal-provident-fund/" className="text-blue-700 font-bold text-sm underline flex items-center gap-2">Explore EPF Math <span>→</span></a>
                    </div>
                    <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
                        <h4 className="text-xl font-black text-emerald-900 mb-4">Citizen Investment Trust (CIT / Nagarik Lagani Kosh)</h4>
                        <p className="text-emerald-800/80 mb-6 text-sm leading-relaxed">An optional investment vehicle. You can contribute a portion of your salary to lower your taxable income limit, up to a maximum cap of Rs. 3,00,000.</p>
                        <p className="text-xs text-emerald-700 font-bold mt-2">Highly recommended for high-income earners.</p>
                    </div>
                    <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100">
                        <h4 className="text-xl font-black text-purple-900 mb-4">Social Security Fund (SSF)</h4>
                        <p className="text-purple-800/80 mb-6 text-sm leading-relaxed">The new comprehensive scheme. The employee contributes 11% and the employer contributes 20%, covering medical, accident, and pension benefits.</p>
                        <div className="bg-white/60 p-3 rounded-lg border border-purple-200 mt-2">
                            <span className="text-xs text-purple-900 font-bold">Total: 31% of Basic</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: The Progressive Tax Slab Mechanism */}
            <section className="space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h3 className="text-3xl font-black text-slate-900">Understanding Progressive Taxation</h3>
                    <p className="text-slate-600 text-lg">Nepal utilizes a progressive tax system, meaning your income is taxed at increasing rates across different tiers (slabs) rather than a flat rate.</p>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <h4 className="text-2xl font-black text-slate-900 mb-6">How Slabs Work (FY 2080/81 Example)</h4>
                    <p className="text-slate-700 mb-8">
                        The IRD distinguishes between 'Single' and 'Married' individuals, offering slightly larger tax-free (or 1% tax) thresholds for married couples. If you elect the 'Couple' assessment, you can potentially save thousands of rupees annually.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-200 text-slate-900 font-bold">
                                <tr>
                                    <th className="p-4 rounded-tl-xl">Tax Rate</th>
                                    <th className="p-4">Single Individual Slab</th>
                                    <th className="p-4 rounded-tr-xl">Married Couple Slab</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                                <tr><td className="p-4 font-bold">1% (Social Security Tax)</td><td className="p-4">Up to Rs. 5,00,000</td><td className="p-4">Up to Rs. 6,00,000</td></tr>
                                <tr><td className="p-4 font-bold text-orange-600">10%</td><td className="p-4">Next Rs. 2,00,000</td><td className="p-4">Next Rs. 2,00,000</td></tr>
                                <tr><td className="p-4 font-bold text-orange-600">20%</td><td className="p-4">Next Rs. 3,00,000</td><td className="p-4">Next Rs. 3,00,000</td></tr>
                                <tr><td className="p-4 font-bold text-red-600">30%</td><td className="p-4">Next Rs. 10,00,000</td><td className="p-4">Next Rs. 9,00,000</td></tr>
                                <tr><td className="p-4 font-bold text-red-700">36% (Additional 20% Surcharge)</td><td className="p-4">Rs. 20,00,000 to Rs. 50,00,000</td><td className="p-4">Rs. 20,00,000 to Rs. 50,00,000</td></tr>
                                <tr><td className="p-4 font-bold text-purple-700">39%</td><td className="p-4">Above Rs. 50,00,000</td><td className="p-4">Above Rs. 50,00,000</td></tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-slate-500 mt-4 italic">Note: The 1% Social Security Tax is waived if you are already contributing to the SSF.</p>
                    </div>
                </div>
            </section>

            {/* Section 4: Maximizing Tax Efficiency */}
            <section className="bg-emerald-900 rounded-[3.5rem] p-12 text-white border border-emerald-800 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row gap-16">
                    <div className="flex-1 space-y-8">
                        <div className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-black uppercase tracking-widest">
                            Wealth Preservation Strategy
                        </div>
                        <h3 className="text-4xl font-black leading-tight">
                            Legal Tax Shielding: <br/><span className="text-emerald-400 italic">Maximize Your Rebates</span>
                        </h3>
                        <p className="text-emerald-100/70 text-lg leading-relaxed">
                            A high gross salary doesn't guarantee wealth if you are losing 30-36% to taxes unnecessarily. The Income Tax Act provides several avenues to legally reduce your taxable income. Utilizing these provisions is the hallmark of financial literacy.
                        </p>
                        
                        <div className="space-y-6 pt-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-xl shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Retirement Fund Cap (CIT/EPF)</h4>
                                    <p className="text-emerald-200/70 text-sm">You can deduct up to 1/3rd of your Gross Income or Rs. 3,00,000 (whichever is lower) by routing it into approved retirement funds.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-xl shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Life Insurance Premium</h4>
                                    <p className="text-emerald-200/70 text-sm">Premiums paid for life insurance policies are deductible up to Rs. 40,000 annually. This is a dual-benefit strategy: risk coverage and tax shielding.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-xl shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Medical Insurance</h4>
                                    <p className="text-emerald-200/70 text-sm">Health insurance premiums are deductible up to Rs. 20,000 per year.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-[400px] bg-emerald-950 rounded-[2.5rem] p-10 border border-emerald-800 shadow-inner flex flex-col justify-center">
                        <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-6 text-center">Impact of Shielding</h4>
                        <div className="p-6 bg-emerald-900/50 rounded-2xl border border-emerald-800 mb-6">
                            <p className="text-xs text-emerald-300 font-bold uppercase mb-1">Unshielded Tax (Rs. 15L Gross)</p>
                            <p className="text-2xl font-black text-white">Rs. 2,11,000</p>
                        </div>
                        <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/30">
                            <p className="text-xs text-emerald-400 font-bold uppercase mb-1">Optimized Tax (Full Rebates)</p>
                            <p className="text-3xl font-black text-emerald-400">Rs. 1,02,000</p>
                            <p className="text-[10px] text-emerald-200/50 mt-2 font-bold uppercase tracking-widest">Savings: Rs. 1.09 Lakhs</p>
                        </div>
                        <p className="text-xs text-emerald-200/60 text-center mt-6 italic">
                            These savings can be aggressively channeled into the capital markets. Use our <a href="/calculator/compound-interest/" className="text-white underline font-bold">Compound Interest Lab</a> to see what Rs. 1 Lakh saved annually grows into over 20 years.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 5: Real-World Case Studies */}
            <section className="space-y-8">
                <h3 className="text-3xl font-black text-slate-900 mb-8 text-center">
                    Practical Financial Planning Scenarios
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <h4 className="text-xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-4">
                            The Entry-Level Professional
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                            A fresh graduate starting at Rs. 40,000 per month. Their annual gross is Rs. 4,80,000. As a single individual, this falls entirely within the first slab (Up to Rs. 5,00,000). They will only pay the 1% Social Security Tax, which amounts to Rs. 4,800 annually, or Rs. 400 per month. Their take-home pay remains robust, making it the perfect time to start an aggressive SIP.
                        </p>
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Action Item:</span>
                            <p className="text-sm text-slate-800 font-medium mt-1">Start a Rs. 5,000 SIP. Track expected growth via the <a href="/calculator/cagr-calculator/" className="text-blue-600 underline">CAGR tool</a>.</p>
                        </div>
                    </div>
                    
                    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <h4 className="text-xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-4">
                            The Mid-Level Manager (Married)
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                            A bank manager earning Rs. 1,20,000 per month (Annual Gross Rs. 14.4 Lakhs). By electing the married couple assessment, their first Rs. 6 Lakhs is taxed at 1%. To avoid the heavy 30% slab, they invest Rs. 3,00,000 into CIT, reducing their taxable income to Rs. 11.4 Lakhs. This strategic move drops their top marginal tax rate and saves tens of thousands.
                        </p>
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Action Item:</span>
                            <p className="text-sm text-slate-800 font-medium mt-1">Direct tax savings towards an EMI. Audit loan feasibility with the <a href="/calculator/mortgage-calculator/" className="text-blue-600 underline">Mortgage Auditor</a>.</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xl shrink-0">!</div>
                    <div>
                        <h4 className="font-bold text-rose-900 mb-2">Bonus Taxation Notice</h4>
                        <p className="text-sm text-rose-800/80 leading-relaxed">
                            Festival bonuses (e.g., Dashain Kharcha) and performance bonuses are fully taxable and are added to your gross annual income. This can sometimes push your total income into a higher tax slab for that specific month, resulting in a disproportionately high TDS deduction on your bonus month payslip. Always account for this when budgeting for major festival expenses.
                        </p>
                    </div>
                </div>
            </section>
        </div>
