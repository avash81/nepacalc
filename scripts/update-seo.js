const fs = require('fs');
const path = require('path');

const escapeJSX = (str) => {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/\{/g, '&#123;')
            .replace(/\}/g, '&#125;');
}

const updateSEOContent = () => {
    // 1. Update nepal-income-tax
    const nepalSpecificPath = path.join(__dirname, '../src/data/seo/nepal-specific.tsx');
    let nepalSpecific = fs.readFileSync(nepalSpecificPath, 'utf8');

    const taxStartMarker = "'nepal-income-tax': {";
    let taxStartIndex = nepalSpecific.indexOf(taxStartMarker);
    if (taxStartIndex !== -1) {
        let contentStartIndex = nepalSpecific.indexOf('content: (', taxStartIndex);
        let currentDepth = 0;
        let contentEndIndex = -1;
        
        for (let i = contentStartIndex + 9; i < nepalSpecific.length; i++) {
            if (nepalSpecific[i] === '(') currentDepth++;
            if (nepalSpecific[i] === ')') {
                currentDepth--;
                if (currentDepth === 0) {
                    contentEndIndex = i;
                    break;
                }
            }
        }

        if (contentStartIndex !== -1 && contentEndIndex !== -1) {
            const newTaxContent = `content: (
        <div className="space-y-12">
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
                            <tr className="bg-slate-50/50"><td className="p-4">Band 4</td><td className="p-4">Rs 11,00,001 – Rs 20,00,000</td><td className="p-4">30%</td><td className="p-4">Rs 2,70,000</td></tr>
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

            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Step-by-step income tax calculation formula</h3>
                <ol className="list-decimal pl-6 text-slate-700 space-y-2">
                    <li>Start with gross annual income: basic salary × 12 + festival bonus + all taxable allowances</li>
                    <li>Subtract allowable deductions: SSF/EPF contribution (capped) + insurance premiums + remote allowance</li>
                    <li>The result is your Assessable Income</li>
                    <li>Apply progressive slab rates band by band on Assessable Income</li>
                    <li>If SSF enrolled: the Band 1 tax (1%) is zero — do not add it</li>
                    <li>If female with employment income only: subtract 10% of total computed tax as rebate</li>
                    <li>Result is annual tax liability. Divide by 12 for monthly TDS deduction</li>
                </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Worked example — Single, Rs 1,20,000 monthly, SSF</h4>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                        <ul className="space-y-3 text-sm text-slate-700">
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Annual gross (1.2L × 12)</span><span className="font-medium">Rs 14,40,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Festival bonus (60% basic)</span><span className="font-medium">Rs 72,000</span></li>
                            <li className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2"><span>Total annual income</span><span>Rs 15,12,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2 text-red-600"><span>Less: SSF employee (11%)</span><span>−Rs 95,040</span></li>
                            <li className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2"><span>Assessable income</span><span>Rs 14,16,960</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Band 1 (1%) — WAIVED</span><span>Rs 0</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Band 2 (10%)</span><span>Rs 20,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Band 3 (20%)</span><span>Rs 60,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Band 4 (30%)</span><span>Rs 1,25,088</span></li>
                            <li className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2 pt-2"><span>Total annual tax</span><span>Rs 2,05,088</span></li>
                            <li className="flex justify-between font-bold text-emerald-600 pt-2 text-base"><span>Monthly TDS deduction</span><span>Rs 17,091</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Worked example — Female, married, Rs 80,000, SSF</h4>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                        <ul className="space-y-3 text-sm text-slate-700">
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Annual gross (80k × 12)</span><span className="font-medium">Rs 9,60,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2 text-red-600"><span>Less: SSF employee (11%)</span><span>−Rs 63,360</span></li>
                            <li className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2"><span>Assessable income</span><span>Rs 8,96,640</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Band 1 (1%) — WAIVED</span><span>Rs 0</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Band 2 (10%)</span><span>Rs 20,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span>Band 3 (20%)</span><span>Rs 19,328</span></li>
                            <li className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2"><span>Total computed tax</span><span>Rs 39,328</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2 text-emerald-600 font-medium"><span>Female 10% rebate</span><span>−Rs 3,933</span></li>
                            <li className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2 pt-2"><span>Final annual tax</span><span>Rs 35,395</span></li>
                            <li className="flex justify-between font-bold text-emerald-600 pt-2 text-base"><span>Monthly TDS</span><span>Rs 2,950</span></li>
                        </ul>
                    </div>
                </div>
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
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">When must I file a tax return in Nepal?</h4>
                        <p className="text-slate-600 text-sm">Employees whose only income is from one employer and whose TDS is correctly deducted are not required to file a separate ITR. However, employees with income from multiple sources, or business income, must file with the IRD by the end of Poush (approximately mid-January) each year at ird.gov.np.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">What is the penalty for incorrect TDS deduction?</h4>
                        <p className="text-slate-600 text-sm">Under Section 117 of the Income Tax Act 2058, a 15% per year interest applies on under-deducted TDS amounts. Additionally, a penalty of Rs 5,000 to Rs 5,00,000 may apply for wilful evasion.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">What is remuneration tax in Nepal?</h4>
                        <p className="text-slate-600 text-sm">Remuneration tax is another term for employment income tax or salary tax in Nepal. It refers to the tax withheld by employers on salary, wages, allowances, bonus, and other employment benefits under Section 68 of the Income Tax Act 2058.</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500">Data source: Income Tax Act 2058 (as amended), Finance Act 2082, IRD Nepal (ird.gov.np), Social Security Fund Board (ssf.gov.np). Last verified: May 2026. For the most current rates, always confirm with IRD.</p>
                </div>
            </div>
        </div>
    )`;
            nepalSpecific = nepalSpecific.substring(0, contentStartIndex) + newTaxContent + nepalSpecific.substring(contentEndIndex + 1);
        }
    }

    // 2. Update nea-bill (also in nepal-specific.tsx)
    const neaStartMarker = "'nea-bill': {";
    let neaStartIndex = nepalSpecific.indexOf(neaStartMarker);
    if (neaStartIndex !== -1) {
        let contentStartIndex = nepalSpecific.indexOf('content: (', neaStartIndex);
        let currentDepth = 0;
        let contentEndIndex = -1;
        
        for (let i = contentStartIndex + 9; i < nepalSpecific.length; i++) {
            if (nepalSpecific[i] === '(') currentDepth++;
            if (nepalSpecific[i] === ')') {
                currentDepth--;
                if (currentDepth === 0) {
                    contentEndIndex = i;
                    break;
                }
            }
        }

        if (contentStartIndex !== -1 && contentEndIndex !== -1) {
            const newNeaContent = `content: (
        <div className="space-y-12">
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

                <h3 className="text-xl font-bold text-slate-800 mb-4">Tariff rates by meter amperage — 5A, 15A, 30A, 60A</h3>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Meter Type</th>
                                <th className="p-4 font-semibold text-slate-900">Who uses it</th>
                                <th className="p-4 font-semibold text-slate-900">Fixed Charge Range</th>
                                <th className="p-4 font-semibold text-slate-900">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4 font-medium">5A</td><td className="p-4">Very low consumption — temples, small huts</td><td className="p-4">Rs 30 min</td><td className="p-4 text-sm">0–20 units: free of energy charge; fixed charge only Rs 30</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-medium">15A</td><td className="p-4">Standard household, apartment, small shop</td><td className="p-4">Rs 50 – Rs 500</td><td className="p-4 text-sm">Progressive slabs as shown above</td></tr>
                            <tr><td className="p-4 font-medium">30A</td><td className="p-4">Medium household, medium shop, office</td><td className="p-4">Rs 75 – Rs 600</td><td className="p-4 text-sm">Higher fixed charge schedule; contact NEA</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-medium">60A</td><td className="p-4">High-consumption household, large shop</td><td className="p-4">Rs 125 – Rs 750</td><td className="p-4 text-sm">Often used for commercial-residential mixed use</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">The 5A special tariff rule</h3>
                    <p className="text-slate-700 mb-3 text-sm">For 5 Ampere connections, NEA applies a special minimum-use policy designed to protect very low-income households:</p>
                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2 mb-3">
                        <li><strong>20 units or less:</strong> No energy charge. Only the Rs 30 minimum fixed service charge is billed.</li>
                        <li><strong>Above 20 units:</strong> The free threshold is removed. The first 20 units are charged at Rs 3.00/unit. Units above 20 follow standard slab rates.</li>
                    </ul>
                    <p className="text-slate-700 text-sm">This cliff-edge structure means 20 units pays Rs 30, but 21 units pays Rs 66.50 energy + Rs 75 service = Rs 141.50 + VAT.</p>
                </div>
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

            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Step-by-step: how to calculate your NEA bill</h3>
                <ol className="list-decimal pl-6 text-slate-700 space-y-2">
                    <li>Read your meter: Current Reading − Previous Reading = Units Consumed</li>
                    <li>Identify which slabs your consumption crosses.</li>
                    <li>Multiply the units in each slab by that slab's rate. Sum all slab charges to get the Energy Charge.</li>
                    <li>Find your Fixed Service Charge from the table above based on your highest slab reached.</li>
                    <li>Calculate VAT: Energy Charge × 13%. (No VAT on fixed charge).</li>
                    <li>Total Bill = Energy Charge + Fixed Charge + VAT</li>
                </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Worked example — 15A meter, 120 units</h4>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>0 – 20 (20 units @ 4.00)</span><span>Rs 80.00</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>21 – 30 (10 units @ 6.50)</span><span>Rs 65.00</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>31 – 50 (20 units @ 8.00)</span><span>Rs 160.00</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>51 – 100 (50 units @ 9.50)</span><span>Rs 475.00</span></li>
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>101 – 120 (20 units @ 10.50)</span><span>Rs 210.00</span></li>
                            <li className="flex justify-between font-bold text-slate-900 pb-1 pt-1"><span>Total Energy Charge</span><span>Rs 990.00</span></li>
                            <li className="flex justify-between text-slate-600 pb-1"><span>Fixed Service Charge (101-150 slab)</span><span>Rs 175.00</span></li>
                            <li className="flex justify-between text-slate-600 border-b border-slate-200 pb-2"><span>VAT (13% on Rs 990)</span><span>Rs 128.70</span></li>
                            <li className="flex justify-between font-bold text-indigo-700 pt-2 text-base"><span>TOTAL BILL PAYABLE</span><span>Rs 1,293.70</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Worked example — 15A meter, 40 units</h4>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>0 – 20 (20 units @ 4.00)</span><span>Rs 80.00</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>21 – 30 (10 units @ 6.50)</span><span>Rs 65.00</span></li>
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>31 – 40 (10 units @ 8.00)</span><span>Rs 80.00</span></li>
                            <li className="flex justify-between font-bold text-slate-900 pb-1 pt-1"><span>Total Energy Charge</span><span>Rs 225.00</span></li>
                            <li className="flex justify-between text-slate-600 pb-1"><span>Fixed Service Charge (31-50 slab)</span><span>Rs 100.00</span></li>
                            <li className="flex justify-between text-slate-600 border-b border-slate-200 pb-2"><span>VAT (13% on Rs 225)</span><span>Rs 29.25</span></li>
                            <li className="flex justify-between font-bold text-indigo-700 pt-2 text-base"><span>TOTAL BILL PAYABLE</span><span>Rs 354.25</span></li>
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
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Can I split my electricity bill with my tenant?</h4>
                        <p className="text-slate-600 text-sm">Yes. Calculate the total bill using the calculator above, then divide proportionally. Note that the per-unit rate is not uniform — units at higher slabs cost more, so a simple 50-50 split by units may not be financially equal.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">What is the 31 units / 40 units electricity cost in Nepal?</h4>
                        <p className="text-slate-600 text-sm">For a 15A meter: 31 units = Rs 272.89 total. 40 units = Rs 354.25 (see worked example above).</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500">Source: Nepal Electricity Authority (NEA) tariff notification FY 2082/83, Electricity Regulatory Commission (ERC) of Nepal. Verified: May 2026. Always verify at nea.org.np for the most current schedule.</p>
                </div>
            </div>
        </div>
    )`;
            nepalSpecific = nepalSpecific.substring(0, contentStartIndex) + newNeaContent + nepalSpecific.substring(contentEndIndex + 1);
        }
    }
    
    fs.writeFileSync(nepalSpecificPath, nepalSpecific, 'utf8');
    console.log('Updated nepal-specific.tsx');


    // 3. Update nepal-salary (in financial.tsx)
    const financialPath = path.join(__dirname, '../src/data/seo/financial.tsx');
    let financial = fs.readFileSync(financialPath, 'utf8');

    const salaryStartMarker = "'nepal-salary': {";
    let salaryStartIndex = financial.indexOf(salaryStartMarker);
    if (salaryStartIndex !== -1) {
        let contentStartIndex = financial.indexOf('content: (', salaryStartIndex);
        let currentDepth = 0;
        let contentEndIndex = -1;
        
        for (let i = contentStartIndex + 9; i < financial.length; i++) {
            if (financial[i] === '(') currentDepth++;
            if (financial[i] === ')') {
                currentDepth--;
                if (currentDepth === 0) {
                    contentEndIndex = i;
                    break;
                }
            }
        }

        if (contentStartIndex !== -1 && contentEndIndex !== -1) {
            const newSalaryContent = `content: (
        <div className="space-y-12 text-slate-300">
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
                            <tr><td className="p-4 font-medium text-slate-200">Other taxable allowances</td><td className="p-4 text-emerald-400">+ Gross component</td><td className="p-4 text-slate-400">Medical, travel, lunch — if not in prescribed limits</td></tr>
                            <tr className="bg-slate-700/40 border-t-2 border-slate-600"><td className="p-4 font-bold text-white">Gross Monthly Salary</td><td className="p-4 font-bold text-white">= Sum of above</td><td className="p-4 text-slate-300">Total employer-declared salary</td></tr>
                            <tr><td className="p-4 font-medium text-slate-200">Employee SSF (11% of basic)</td><td className="p-4 text-rose-400">− Deduction</td><td className="p-4 text-slate-400">Social Security Act 2074; SSF Board regulations</td></tr>
                            <tr className="bg-slate-800/20"><td className="p-4 font-medium text-slate-200">CIT contribution (voluntary)</td><td className="p-4 text-rose-400">− Deduction</td><td className="p-4 text-slate-400">Citizen Investment Trust Act 2047</td></tr>
                            <tr><td className="p-4 font-medium text-slate-200">Monthly income tax TDS</td><td className="p-4 text-rose-400">− Deduction</td><td className="p-4 text-slate-400">Income Tax Act 2058; annualised and divided by 12</td></tr>
                            <tr className="bg-emerald-900/20 border-t-2 border-emerald-800/50"><td className="p-4 font-bold text-emerald-400">Net Take-Home Salary</td><td className="p-4 font-bold text-emerald-400">= Bank credit</td><td className="p-4 text-emerald-300">What you actually receive each month</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-white mb-4">SSF contribution rules — employer and employee shares</h3>
                <p className="text-slate-300 mb-4">The Social Security Fund (SSF) is mandatory for all formal-sector employees under the Social Security Act 2074 and Labour Act 2074. Both the employee and employer contribute each month based on the employee's basic salary.</p>
                <div className="overflow-x-auto bg-[#1a1a2e] rounded-xl shadow-sm border border-slate-700 mb-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-700">
                                <th className="p-4 font-semibold text-white">Contributor</th>
                                <th className="p-4 font-semibold text-white">Rate</th>
                                <th className="p-4 font-semibold text-white">Example (Rs 80k gross, basic = 60% = Rs 48k)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            <tr><td className="p-4">Employee (SSF)</td><td className="p-4">11%</td><td className="p-4">Rs 48,000 × 11% = Rs 5,280 per month</td></tr>
                            <tr className="bg-slate-800/20"><td className="p-4">Employer (SSF)</td><td className="p-4">20%</td><td className="p-4">Rs 48,000 × 20% = Rs 9,600 per month</td></tr>
                            <tr className="bg-slate-700/40"><td className="p-4 font-bold text-white">Total SSF</td><td className="p-4 font-bold text-white">31%</td><td className="p-4 text-white">Rs 14,880 per month into SSF account</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-blue-900/30 text-blue-200 p-4 rounded-lg text-sm mb-8 border border-blue-800/50">
                    The employee's 11% SSF contribution reduces your take-home pay, but it qualifies as a tax deduction. It reduces your assessable income (up to the Rs 5,00,000 cap), reducing your monthly TDS. SSF enrollment also waives the 1% SST on Band 1. The employer's 20% does not affect your take-home — it is an additional cost borne entirely by the employer.
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">EPF option (non-SSF companies)</h3>
                    <p className="text-slate-300 text-sm mb-3">Companies that have not yet migrated to the SSF system continue to operate under the Employees Provident Fund (EPF). Under EPF, both employee and employer contribute 10% of basic salary. EPF contributions are also tax deductible within the same Rs 5,00,000 cap.</p>
                    <p className="text-rose-300 text-sm font-medium">Important: Employees under EPF do NOT receive the 1% SST waiver — they still pay the 1% SST on Band 1.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">CIT — Citizen Investment Trust</h3>
                    <p className="text-slate-300 text-sm">CIT is a voluntary retirement savings scheme. Employees can voluntarily contribute to CIT, and contributions are deductible under the Income Tax Act 2058 within the combined SSF/EPF/CIT cap of Rs 5,00,000 or 1/3 of assessable income.</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-white mb-4 mt-8">Step-by-step salary calculation formula</h3>
                <ol className="list-decimal pl-6 text-slate-300 space-y-2">
                    <li>Gross Monthly Salary = Basic Salary + Grade/DA + All Taxable Allowances</li>
                    <li>Annual Gross = Monthly Gross × 12 + Festival Bonus (typically 1 month basic)</li>
                    <li>SSF Employee Contribution = Basic Salary × 11% (monthly)</li>
                    <li>Assessable Income = Annual Gross − Annual SSF (capped at Rs 5L) − Insurance Deductions</li>
                    <li>Apply Income Tax Slabs on Assessable Income</li>
                    <li>If SSF enrolled: Band 1 tax (1% SST) = Rs 0</li>
                    <li>Monthly TDS = Annual Tax ÷ 12</li>
                    <li>Net Take-Home = Gross Monthly − Employee SSF − Monthly TDS − Any CIT</li>
                </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-white mb-4">Worked example — Rs 60,000 gross, single, SSF</h4>
                    <div className="bg-[#1a1a2e] rounded-xl shadow-sm border border-slate-700 p-4">
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex justify-between border-b border-slate-700/50 pb-1"><span>Basic salary (60%)</span><span>Rs 36,000</span></li>
                            <li className="flex justify-between border-b border-slate-700/50 pb-1"><span>Grade / DA (40%)</span><span>Rs 24,000</span></li>
                            <li className="flex justify-between font-bold text-white border-b border-slate-600 pb-2"><span>Gross salary</span><span>Rs 60,000</span></li>
                            <li className="flex justify-between border-b border-slate-700/50 pb-1 text-slate-400"><span>Festival bonus (annual)</span><span>Rs 36,000</span></li>
                            <li className="flex justify-between border-b border-slate-700/50 pb-1 text-rose-400"><span>Employee SSF (11%)</span><span>−Rs 3,960</span></li>
                            <li className="flex justify-between border-b border-slate-700/50 pb-1 text-rose-400"><span>Monthly TDS</span><span>−Rs 1,808</span></li>
                            <li className="flex justify-between font-bold text-emerald-400 pt-2 text-base"><span>Net take-home / month</span><span>Rs 54,232</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">CTC (Cost to Company) breakdown</h4>
                    <div className="bg-[#1a1a2e] rounded-xl shadow-sm border border-slate-700 p-4">
                        <p className="text-slate-400 text-xs mb-3">CTC is the total annual cost an employer incurs. For the Rs 60,000 gross example:</p>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex justify-between border-b border-slate-700/50 pb-1"><span>Gross salary</span><span>Rs 60,000</span></li>
                            <li className="flex justify-between border-b border-slate-700/50 pb-1"><span>Employer SSF (20%)</span><span>Rs 7,200</span></li>
                            <li className="flex justify-between font-bold text-purple-400 pt-2 text-base"><span>Total Monthly CTC</span><span>Rs 67,200</span></li>
                        </ul>
                        <p className="text-slate-400 text-xs mt-3">An employer offering Rs 60,000 gross is spending at least Rs 67,200 per month on you. Your take-home is Rs 54,232.</p>
                    </div>
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
                        <p className="text-slate-400 text-sm">Yes. Under Labour Act 2074, every employer must pay one month's basic salary as festival (dashain) bonus to employees who have completed at least three months of service. This is a statutory right, not discretionary.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-200 mb-2">How is salary tax calculated if I have two employers?</h4>
                        <p className="text-slate-400 text-sm">If you earn from two employers in the same tax year, you must aggregate both incomes and file a self-assessment tax return with IRD. Each employer will have deducted TDS based on only their salary component, which may result in under-deduction. You are responsible for paying the shortfall plus interest.</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <p className="text-xs text-slate-500">Sources: Labour Act 2074, Social Security Act 2074, Income Tax Act 2058, Finance Act 2082. Verified May 2026. For current minimum wage, check dolidar.gov.np.</p>
                </div>
            </div>
        </div>
    )`;
            financial = financial.substring(0, contentStartIndex) + newSalaryContent + financial.substring(contentEndIndex + 1);
            fs.writeFileSync(financialPath, financial, 'utf8');
            console.log('Updated financial.tsx');
        }
    }
};

updateSEOContent();
