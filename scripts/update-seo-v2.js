const fs = require('fs');
const path = require('path');

const updateSEO = () => {
    // 1. Update nepal-specific.tsx (Income Tax & NEA Bill)
    const nepalSpecificPath = path.join(__dirname, '../src/data/seo/nepal-specific.tsx');
    let nepalSpecific = fs.readFileSync(nepalSpecificPath, 'utf8');

    // Update nepal-income-tax
    const incomeTaxMeta = {
        title: "Nepal Income Tax Calculator 2082/83 | Tax Slabs & SSF | NepaCalc",
        description: "Calculate your Nepal income tax for FY 2082/83. Covers SSF waiver, EPF/CIT deductions, female 10% rebate, and married thresholds. Instant slab-wise breakdown — no signup needed."
    };
    
    // Update NEA Bill
    const neaBillMeta = {
        title: "NEA Bill Calculator 2082/83 | Slab-wise Billing | NepaCalc",
        description: "Calculate your NEA electricity bill precisely for FY 2082/83. Includes 5A to 60A demand charges, progressive slab rates, and late payment fine logic."
    };

    // Update Salary (in financial.tsx)
    const financialPath = path.join(__dirname, '../src/data/seo/financial.tsx');
    let financial = fs.readFileSync(financialPath, 'utf8');
    const salaryMeta = {
        title: "Nepal Salary Calculator 2082/83 | Net Pay & SSF | NepaCalc",
        description: "Calculate your net take-home salary in Nepal for FY 2082/83. Includes 11% SSF, CIT, and Income Tax TDS. Accurate CTC breakdown and monthly payslip audit."
    };

    const patchContent = (fileContent, key, meta, newContentBody) => {
        const startMarker = `'${key}': {`;
        let startIndex = fileContent.indexOf(startMarker);
        if (startIndex === -1) return fileContent;

        // Update Title
        const titleRegex = /title:\s*"[^"]*"/;
        fileContent = fileContent.replace(new RegExp(`('${key}':\\s*{[^}]*?title:\\s*")[^"]*"`), `$1${meta.title}"`);

        // Update Description
        fileContent = fileContent.replace(new RegExp(`('${key}':\\s*{[^}]*?description:\\s*")[^"]*"`), `$1${meta.description}"`);

        // Update Content
        let contentStartIndex = fileContent.indexOf('content: (', startIndex);
        if (contentStartIndex === -1) return fileContent;
        
        let currentDepth = 0;
        let contentEndIndex = -1;
        for (let i = contentStartIndex + 9; i < fileContent.length; i++) {
            if (fileContent[i] === '(') currentDepth++;
            if (fileContent[i] === ')') {
                currentDepth--;
                if (currentDepth === -1) { // Found the matching ) for content: (
                    contentEndIndex = i;
                    break;
                }
            }
        }

        if (contentEndIndex !== -1) {
            const fullNewContent = `content: (<>\n${newContentBody}\n        </>)`;
            return fileContent.substring(0, contentStartIndex) + fullNewContent + fileContent.substring(contentEndIndex + 1);
        }
        return fileContent;
    };

    // Helper to get content body from the existing update-seo.js or similar
    // I'll just hardcode the bodies here to be 100% sure.

    const incomeTaxBody = `        <div className="space-y-12">
            <div className="bg-emerald-50/50 border-l-4 border-emerald-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-emerald-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Nepal Income Tax for FY 2082/83 — Complete Guide
                </h2>
                <p className="text-slate-800 text-base leading-relaxed mb-4">
                    Nepal's income tax system is governed by the Income Tax Act 2058 (2002 AD) and amended annually through the Finance Act passed by the Federal Parliament. For the fiscal year 2082/83 (2025/26 AD), the tax slabs, rates, and deduction limits remain unchanged from FY 2081/82 as confirmed by the Finance Act 2082. This calculator applies the exact rules issued by the Inland Revenue Department (IRD) of Nepal.
                </p>
                <h3 className="font-bold text-slate-900 mt-6 mb-2">Who pays income tax in Nepal?</h3>
                <p className="text-slate-800 text-base leading-relaxed">
                    Under Section 2 of the Income Tax Act 2058, every resident individual earning income from employment, business, or investment is subject to tax in Nepal. Resident status applies if you spend 183 or more days in Nepal during a tax year (Shrawan 1 to Ashadh 31). Non-resident Nepali citizens are taxed only on Nepal-sourced income.<br/><br/>Employers are legally required to deduct Tax at Source (TDS) from employee salaries each month and deposit the deducted amount with the IRD by the 25th of the following month. This is called PAYE (Pay As You Earn) withholding.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Income tax slabs for FY 2082/83</h2>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4">Single / Unmarried individuals</h3>
                <p className="text-slate-700 mb-4">The following slabs apply to salaried employees who are single, unmarried, or who choose to file under the individual (ekla) threshold. The first band is a Social Security Tax (SST) — not income tax — and is fully waived for SSF contributors.</p>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Slab</th>
                                <th className="p-4 font-semibold text-slate-900">Annual Assessable Income (NPR)</th>
                                <th className="p-4 font-semibold text-slate-900">Tax Rate</th>
                                <th className="p-4 font-semibold text-slate-900">Maximum Tax on This Slab</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4">Band 1 — SST</td><td className="p-4">First Rs 5,00,000</td><td className="p-4">1% (waived if SSF enrolled)</td><td className="p-4">Rs 5,000</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">Band 2</td><td className="p-4">Rs 5,00,001 – Rs 7,00,000</td><td className="p-4">10%</td><td className="p-4">Rs 20,000</td></tr>
                            <tr><td className="p-4">Band 3</td><td className="p-4">Rs 7,00,001 – Rs 10,00,000</td><td className="p-4">20%</td><td className="p-4">Rs 60,000</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">Band 4</td><td className="p-4">Rs 10,00,001 – Rs 20,00,000</td><td className="p-4">30%</td><td className="p-4">Rs 3,00,000</td></tr>
                            <tr><td className="p-4">Band 5</td><td className="p-4">Rs 20,00,001 – Rs 50,00,000</td><td className="p-4">36%</td><td className="p-4">Rs 10,80,000</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">Band 6</td><td className="p-4">Above Rs 50,00,000</td><td className="p-4">39%</td><td className="p-4">On excess above Rs 50 lakh</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-slate-500 mb-8">Source: Finance Act 2082, First Schedule, read with Income Tax Act 2058, Section 1 of Schedule 1. These rates are confirmed unchanged for FY 2082/83 by the IRD circular issued Shrawan 2082.</p>

                <h3 className="text-xl font-bold text-slate-800 mb-4">Married couples (dampati)</h3>
                <p className="text-slate-700 mb-4">Married taxpayers who file as a couple (dampati) receive a higher threshold on the first slab. Both spouses' combined income is assessed together under Section 50 of the Income Tax Act 2058.</p>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Slab</th>
                                <th className="p-4 font-semibold text-slate-900">Annual Assessable Income (NPR)</th>
                                <th className="p-4 font-semibold text-slate-900">Tax Rate</th>
                                <th className="p-4 font-semibold text-slate-900">Maximum Tax on This Slab</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4">Band 1 — SST</td><td className="p-4">First Rs 6,00,000</td><td className="p-4">1% (waived if SSF enrolled)</td><td className="p-4">Rs 6,000</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">Band 2</td><td className="p-4">Rs 6,00,001 – Rs 8,00,000</td><td className="p-4">10%</td><td className="p-4">Rs 20,000</td></tr>
                            <tr><td className="p-4">Band 3</td><td className="p-4">Rs 8,00,001 – Rs 11,00,000</td><td className="p-4">20%</td><td className="p-4">Rs 60,000</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">Band 11,00,001 – Rs 20,00,000</td><td className="p-4">30%</td><td className="p-4">Rs 2,70,000</td></tr>
                            <tr><td className="p-4">Band 5</td><td className="p-4">Rs 20,00,001 – Rs 50,00,000</td><td className="p-4">36%</td><td className="p-4">Rs 10,80,000</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">Band 6</td><td className="p-4">Above Rs 50,00,000</td><td className="p-4">39%</td><td className="p-4">On excess above Rs 50 lakh</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Allowable deductions that reduce your taxable income</h3>
                <p className="text-slate-700 mb-4">Under Sections 12 through 21 of the Income Tax Act 2058, the following deductions are allowed before applying the tax slab rates. Deductions reduce your assessable income, not your gross salary.</p>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Deduction Item</th>
                                <th className="p-4 font-semibold text-slate-900">Annual Limit (NPR)</th>
                                <th className="p-4 font-semibold text-slate-900">Condition / Authority</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4 font-medium text-slate-800">SSF employee contribution (11% of basic)</td><td className="p-4">Lower of Rs 5,00,000 or 1/3 of assessable income</td><td className="p-4">SSF Act 2074; waives 1% SST on Band 1</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-medium text-slate-800">EPF employee contribution (10% of basic)</td><td className="p-4">Lower of Rs 5,00,000 or 1/3 of assessable income</td><td className="p-4">Combined cap with SSF — choose one</td></tr>
                            <tr><td className="p-4 font-medium text-slate-800">CIT (Citizen Investment Trust)</td><td className="p-4">Combined within Rs 5,00,000 or 1/3 cap</td><td className="p-4">CIT Act 2047</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-medium text-slate-800">Life insurance premium</td><td className="p-4">Rs 40,000</td><td className="p-4">Policy in taxpayer's name; Section 12(1)(c)</td></tr>
                            <tr><td className="p-4 font-medium text-slate-800">Medical insurance premium</td><td className="p-4">Rs 20,000</td><td className="p-4">Health insurance policy; Section 12(1)(d)</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-medium text-slate-800">Principal residence insurance</td><td className="p-4">Rs 5,000</td><td className="p-4">Own residential building only</td></tr>
                            <tr><td className="p-4 font-medium text-slate-800">Remote area allowance</td><td className="p-4">Up to Rs 50,000</td><td className="p-4">IRD-classified remote posting; Section 12(1)(e)</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-amber-50/50 border-l-4 border-amber-500 rounded-r-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Female tax rebate (10% — FRTC)</h3>
                <p className="text-slate-800 mb-4">Female employees whose entire income is employment income (salary, allowances, and benefits from a single employer) are entitled to a 10% rebate on the total computed tax liability. This rebate is applied after the slab calculation and after all deductions — it reduces the final tax payable, not the assessable income.</p>
                <ul className="list-disc pl-6 text-slate-800 space-y-2 mb-4">
                    <li><strong>Formula:</strong> Final Tax = Computed Tax − (Computed Tax × 10%)</li>
                    <li><strong>Authority:</strong> Finance Act 2082, Section 3 read with Income Tax Act 2058, First Schedule, Note 2.</li>
                </ul>
                <p className="text-slate-800 text-sm">The rebate does not apply if the female taxpayer has income from business, investment, or more than one employer.</p>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">The SSF 1% waiver — the most important tax rule</h3>
                <p className="text-slate-700 mb-4">The Social Security Tax (SST) of 1% on the first Rs 5,00,000 of income (or Rs 6,00,000 for married couples) is fully waived if the employee is enrolled in the Social Security Fund (SSF) and making contributions. This means SSF-enrolled employees pay zero tax on Band 1. For someone earning Rs 5 lakh annually, this is a saving of Rs 5,000 per year.</p>
                <p className="text-slate-700">The SSF is administered by the Social Security Fund Board under the Social Security Act 2074. Enrollment is mandatory for formal-sector employees under Labour Act 2074. Employers who have not enrolled their employees in SSF are liable to penalties under the SSF regulations.</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mt-12">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Common income tax queries — answered</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Is the 1% SST the same as income tax?</h4>
                        <p className="text-slate-600 text-sm">No. The 1% Social Security Tax is collected under the Social Security Act 2074, not the Income Tax Act 2058. It is a social contribution, not income tax. For SSF-enrolled employees, this 1% is fully waived, making it zero in practice.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">What happens if my employer does not deduct TDS?</h4>
                        <p className="text-slate-600 text-sm">The employer is liable under Section 88 of the Income Tax Act 2058. The employee must still pay tax directly to the IRD by filing an income tax return. Non-compliance by the employer does not release the employee from their tax obligation.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Do I owe tax if I earn below Rs 5 lakh?</h4>
                        <p className="text-slate-600 text-sm">If you are SSF-enrolled, the 1% SST on your first Rs 5 lakh is waived, meaning you pay Rs 0. If you are not SSF-enrolled, you owe 1% SST (Rs 5,000 per year maximum) but no income tax at that income level.</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500">Data source: Income Tax Act 2058 (as amended), Finance Act 2082, IRD Nepal (ird.gov.np), Social Security Fund Board (ssf.gov.np). Last verified: May 2026. For the most current rates, always confirm with IRD.</p>
                </div>
            </div>
        </div>`;

    const neaBillBody = `        <div className="space-y-12">
            <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    How Nepal Electricity Authority (NEA) Calculates Your Bill
                </h2>
                <p className="text-slate-800 text-base leading-relaxed mb-4">
                    The Nepal Electricity Authority (NEA) is the sole public electricity utility in Nepal, operating under the Electricity Act 2049 (1992 AD) and the NEA Act 2041. NEA uses a progressive (slab-based) billing system for domestic consumers — the rate per unit increases as your monthly consumption crosses each threshold. You do not pay a flat rate on all units.
                </p>
                <p className="text-slate-800 text-base leading-relaxed mb-6">
                    NEA issues tariff orders annually, subject to approval from the Electricity Regulatory Commission (ERC) of Nepal. The rates below are the officially notified domestic tariff for FY 2082/83 for single-phase Low Voltage (LV) domestic consumers.
                </p>
                <div className="bg-white rounded-lg p-5 border border-indigo-100 shadow-sm">
                    <p className="font-bold text-indigo-900 mb-2">Total Monthly Bill Formula:</p>
                    <p className="text-lg text-slate-800 font-mono">Energy Charge + Fixed (Service) Charge + 13% VAT on Energy Charge</p>
                    <p className="text-sm text-slate-600 mt-2">VAT is applied only on the energy charge, not on the fixed service charge. This is specified in NEA's tariff notification and the Value Added Tax Act 2052.</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">NEA domestic tariff — 15A single-phase meter (most common)</h2>
                <p className="text-slate-700 mb-4">A 15 Ampere single-phase connection is the standard for most Nepali households, apartments, and small shops. The slab structure below is progressive — each band of units is charged at its own rate.</p>
                
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200 mb-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Monthly Consumption (kWh / units)</th>
                                <th className="p-4 font-semibold text-slate-900">Energy Rate (Rs per unit)</th>
                                <th className="p-4 font-semibold text-slate-900">Fixed Service Charge (Rs/month)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4">0 – 20 units</td><td className="p-4">Rs 4.00</td><td className="p-4">Rs 50</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">21 – 30 units</td><td className="p-4">Rs 6.50</td><td className="p-4">Rs 75</td></tr>
                            <tr><td className="p-4">31 – 50 units</td><td className="p-4">Rs 8.00</td><td className="p-4">Rs 100</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">51 – 100 units</td><td className="p-4">Rs 9.50</td><td className="p-4">Rs 125</td></tr>
                            <tr><td className="p-4">101 – 150 units</td><td className="p-4">Rs 10.50</td><td className="p-4">Rs 175</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">151 – 250 units</td><td className="p-4">Rs 10.50</td><td className="p-4">Rs 200</td></tr>
                            <tr><td className="p-4">251 – 400 units</td><td className="p-4">Rs 11.00</td><td className="p-4">Rs 300</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">Above 400 units</td><td className="p-4">Rs 11.50</td><td className="p-4">Rs 500</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-8 border border-blue-100">
                    <strong>Important:</strong> The fixed service charge is determined by your highest slab reached that month, not by a cumulative calculation. If you consume 120 units, your service charge is Rs 175 (the 101–150 slab rate), regardless of how many units fell in earlier slabs.
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Digital payment rebate (2%)</h3>
                    <p className="text-slate-700 mb-3 text-sm">NEA offers a 2% rebate on the energy charge component if you pay through a digital channel (eSewa, Khalti, mNEA, etc.) within the first 7 days after bill generation. This does not apply to the fixed service charge.</p>
                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                        <p className="text-emerald-800 text-sm font-medium mb-2">Late payment surcharge schedule:</p>
                        <ul className="space-y-1 text-sm text-emerald-700">
                            <li>1–7 days: 2% rebate (digital)</li>
                            <li>1–15 days: No penalty</li>
                            <li>16–30 days: 5% surcharge</li>
                            <li>31–40 days: 10% surcharge</li>
                            <li>41–60 days: 25% surcharge</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mt-12">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently asked questions</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">What is 1 unit of electricity in Nepal?</h4>
                        <p className="text-slate-600 text-sm">1 unit = 1 kilowatt-hour (kWh). If you run a 100-watt bulb for 10 hours, you consume 1 unit. A typical Nepali household consuming 20 units per month uses 20 kWh.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">What is the electricity price per unit in Nepal for 2082?</h4>
                        <p className="text-slate-600 text-sm">The rate per unit ranges from Rs 4.00 (first 20 units, 15A meter) to Rs 11.50 (above 400 units, 15A meter). The effective rate depends on your total monthly consumption across all slabs.</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500">Source: Nepal Electricity Authority (NEA) tariff notification FY 2082/83, Electricity Regulatory Commission (ERC) of Nepal. Verified: May 2026. Always verify at nea.org.np for the most current schedule.</p>
                </div>
            </div>
        </div>`;

    const salaryBody = `        <div className="space-y-12 text-slate-300">
            <div className="bg-[#1a1a2e] border-l-4 border-purple-500 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-purple-400 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    How Salary is Calculated in Nepal — Full Payslip Guide for FY 2082/83
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                    Your monthly take-home salary in Nepal is the amount deposited into your bank account after four mandatory deductions: employee SSF (or EPF) contribution, CIT contribution (if enrolled), monthly income tax TDS, and any other statutory withholdings. The total cost your employer bears — called CTC (Cost to Company) — is higher still, as it includes the employer's share of SSF and other benefits.
                </p>
                <p className="text-slate-400 text-sm">
                    This guide uses the rules in force for FY 2082/83 under the Labour Act 2074, Social Security Act 2074, Income Tax Act 2058, and Finance Act 2082.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-6">The Nepal payslip structure — from gross to net</h2>
                <div className="overflow-x-auto bg-[#1a1a2e] rounded-xl shadow-sm border border-slate-700 mb-8">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-700">
                                <th className="p-4 font-semibold text-white">Payslip Component</th>
                                <th className="p-4 font-semibold text-white">Direction</th>
                                <th className="p-4 font-semibold text-white">Basis / Rule</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            <tr><td className="p-4 font-medium text-slate-200">Basic Salary (mool tlab)</td><td className="p-4 text-emerald-400">+ Gross component</td><td className="p-4 text-slate-400">Typically 60% of gross; set by employment contract</td></tr>
                            <tr className="bg-slate-800/20"><td className="p-4 font-medium text-slate-200">Grade / Dearness Allowance</td><td className="p-4 text-emerald-400">+ Gross component</td><td className="p-4 text-slate-400">Employer-defined; typically 40% of gross</td></tr>
                            <tr className="bg-slate-700/40 border-t-2 border-slate-600"><td className="p-4 font-bold text-white">Gross Monthly Salary</td><td className="p-4 font-bold text-white">= Sum of above</td><td className="p-4 text-slate-300">Total employer-declared salary</td></tr>
                            <tr><td className="p-4 font-medium text-slate-200">Employee SSF (11% of basic)</td><td className="p-4 text-rose-400">− Deduction</td><td className="p-4 text-slate-400">Social Security Act 2074; SSF Board regulations</td></tr>
                            <tr className="bg-emerald-900/20 border-t-2 border-emerald-800/50"><td className="p-4 font-bold text-emerald-400">Net Take-Home Salary</td><td className="p-4 font-bold text-emerald-400">= Bank credit</td><td className="p-4 text-emerald-300">What you actually receive each month</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl p-8 border border-slate-700 mt-12">
                <h3 className="text-xl font-bold text-white mb-6">Salary FAQs — Nepal</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-slate-200 mb-2">What is the minimum wage in Nepal for FY 2082/83?</h4>
                        <p className="text-slate-400 text-sm">As of the last revision, the minimum basic wage for workers is Rs 17,300 per month (basic), with grade/DA taking the total minimum salary to approximately Rs 24,000–26,000 per month. Always verify the current rate at the Department of Labour website.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-200 mb-2">Is the festival bonus mandatory in Nepal?</h4>
                        <p className="text-slate-400 text-sm">Yes. Under Labour Act 2074, every employer must pay one month's basic salary as festival (dashain) bonus to employees who have completed at least three months of service.</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <p className="text-xs text-slate-500">Sources: Labour Act 2074, Social Security Act 2074, Income Tax Act 2058, Finance Act 2082. Verified May 2026. For current minimum wage, check dolidar.gov.np.</p>
                </div>
            </div>
        </div>`;

    nepalSpecific = patchContent(nepalSpecific, 'nepal-income-tax', incomeTaxMeta, incomeTaxBody);
    nepalSpecific = patchContent(nepalSpecific, 'nea-bill', neaBillMeta, neaBillBody);
    fs.writeFileSync(nepalSpecificPath, nepalSpecific, 'utf8');
    console.log('Updated nepal-specific.tsx');

    financial = patchContent(financial, 'nepal-salary', salaryMeta, salaryBody);
    fs.writeFileSync(financialPath, financial, 'utf8');
    console.log('Updated financial.tsx');
};

updateSEO();
