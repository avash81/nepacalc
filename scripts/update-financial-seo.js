const fs = require('fs');
const path = require('path');
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
        <div className="space-y-12">
            <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    How Salary is Calculated in Nepal — Full Payslip Guide for FY 2082/83
                </h2>
                <p className="text-slate-800 text-base leading-relaxed mb-4">
                    Your monthly take-home salary in Nepal is the amount deposited into your bank account after four mandatory deductions: employee SSF (or EPF) contribution, CIT contribution (if enrolled), monthly income tax TDS, and any other statutory withholdings. The total cost your employer bears — called CTC (Cost to Company) — is higher still, as it includes the employer's share of SSF and other benefits.
                </p>
                <p className="text-slate-600 text-sm">
                    This guide uses the rules in force for FY 2082/83 under the Labour Act 2074, Social Security Act 2074, Income Tax Act 2058, and Finance Act 2082.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">The Nepal payslip structure — from gross to net</h2>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Payslip Component</th>
                                <th className="p-4 font-semibold text-slate-900">Direction</th>
                                <th className="p-4 font-semibold text-slate-900">Basis / Rule</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4 font-medium text-slate-800">Basic Salary (mool tlab)</td><td className="p-4 text-emerald-600">+ Gross component</td><td className="p-4 text-slate-600">Typically 60% of gross; set by employment contract</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-medium text-slate-800">Grade / Dearness Allowance</td><td className="p-4 text-emerald-600">+ Gross component</td><td className="p-4 text-slate-600">Employer-defined; typically 40% of gross</td></tr>
                            <tr><td className="p-4 font-medium text-slate-800">Other taxable allowances</td><td className="p-4 text-emerald-600">+ Gross component</td><td className="p-4 text-slate-600">Medical, travel, lunch — if not in prescribed limits</td></tr>
                            <tr className="bg-slate-100 border-t-2 border-slate-200"><td className="p-4 font-bold text-slate-900">Gross Monthly Salary</td><td className="p-4 font-bold text-slate-900">= Sum of above</td><td className="p-4 text-slate-700">Total employer-declared salary</td></tr>
                            <tr><td className="p-4 font-medium text-slate-800">Employee SSF (11% of basic)</td><td className="p-4 text-rose-600">− Deduction</td><td className="p-4 text-slate-600">Social Security Act 2074; SSF Board regulations</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-medium text-slate-800">CIT contribution (voluntary)</td><td className="p-4 text-rose-600">− Deduction</td><td className="p-4 text-slate-600">Citizen Investment Trust Act 2047</td></tr>
                            <tr><td className="p-4 font-medium text-slate-800">Monthly income tax TDS</td><td className="p-4 text-rose-600">− Deduction</td><td className="p-4 text-slate-600">Income Tax Act 2058; annualised and divided by 12</td></tr>
                            <tr className="bg-emerald-50 border-t-2 border-emerald-100"><td className="p-4 font-bold text-emerald-700">Net Take-Home Salary</td><td className="p-4 font-bold text-emerald-700">= Bank credit</td><td className="p-4 text-emerald-600">What you actually receive each month</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">SSF contribution rules — employer and employee shares</h3>
                <p className="text-slate-700 mb-4">The Social Security Fund (SSF) is mandatory for all formal-sector employees under the Social Security Act 2074 and Labour Act 2074. Both the employee and employer contribute each month based on the employee's basic salary.</p>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200 mb-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Contributor</th>
                                <th className="p-4 font-semibold text-slate-900">Rate</th>
                                <th className="p-4 font-semibold text-slate-900">Example (Rs 80k gross, basic = 60% = Rs 48k)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4">Employee (SSF)</td><td className="p-4">11%</td><td className="p-4">Rs 48,000 × 11% = Rs 5,280 per month</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4">Employer (SSF)</td><td className="p-4">20%</td><td className="p-4">Rs 48,000 × 20% = Rs 9,600 per month</td></tr>
                            <tr className="bg-slate-100"><td className="p-4 font-bold text-slate-900">Total SSF</td><td className="p-4 font-bold text-slate-900">31%</td><td className="p-4 text-slate-900">Rs 14,880 per month into SSF account</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-8 border border-blue-100">
                    The employee's 11% SSF contribution reduces your take-home pay, but it qualifies as a tax deduction. It reduces your assessable income (up to the Rs 5,00,000 cap), reducing your monthly TDS. SSF enrollment also waives the 1% SST on Band 1. The employer's 20% does not affect your take-home — it is an additional cost borne entirely by the employer.
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">EPF option (non-SSF companies)</h3>
                    <p className="text-slate-700 text-sm mb-3">Companies that have not yet migrated to the SSF system continue to operate under the Employees Provident Fund (EPF). Under EPF, both employee and employer contribute 10% of basic salary. EPF contributions are also tax deductible within the same Rs 5,00,000 cap.</p>
                    <p className="text-rose-600 text-sm font-medium">Important: Employees under EPF do NOT receive the 1% SST waiver — they still pay the 1% SST on Band 1.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">CIT — Citizen Investment Trust</h3>
                    <p className="text-slate-700 text-sm">CIT is a voluntary retirement savings scheme. Employees can voluntarily contribute to CIT, and contributions are deductible under the Income Tax Act 2058 within the combined SSF/EPF/CIT cap of Rs 5,00,000 or 1/3 of assessable income.</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">Step-by-step salary calculation formula</h3>
                <ol className="list-decimal pl-6 text-slate-700 space-y-2">
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

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Worked example — Rs 60,000 gross, single, SSF</h4>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>Basic salary (60%)</span><span>Rs 36,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>Grade / DA (40%)</span><span>Rs 24,000</span></li>
                            <li className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2"><span>Gross salary</span><span>Rs 60,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-1 text-slate-500"><span>Festival bonus (annual)</span><span>Rs 36,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-1 text-red-600"><span>Employee SSF (11%)</span><span>−Rs 3,960</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-1 text-red-600"><span>Monthly TDS</span><span>−Rs 1,808</span></li>
                            <li className="flex justify-between font-bold text-emerald-600 pt-2 text-base"><span>Net take-home / month</span><span>Rs 54,232</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">CTC (Cost to Company) breakdown</h4>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                        <p className="text-slate-500 text-xs mb-3">CTC is the total annual cost an employer incurs. For the Rs 60,000 gross example:</p>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>Gross salary</span><span>Rs 60,000</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-1"><span>Employer SSF (20%)</span><span>Rs 7,200</span></li>
                            <li className="flex justify-between font-bold text-purple-700 pt-2 text-base"><span>Total Monthly CTC</span><span>Rs 67,200</span></li>
                        </ul>
                        <p className="text-slate-500 text-xs mt-3">An employer offering Rs 60,000 gross is spending at least Rs 67,200 per month on you. Your take-home is Rs 54,232.</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mt-12">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Salary FAQs — Nepal</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">What is the minimum wage in Nepal for FY 2082/83?</h4>
                        <p className="text-slate-600 text-sm">As of the last revision, the minimum basic wage for workers is Rs 17,300 per month (basic), with grade/DA taking the total minimum salary to approximately Rs 24,000–26,000 per month. Always verify the current rate at the Department of Labour website.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Is the festival bonus mandatory in Nepal?</h4>
                        <p className="text-slate-600 text-sm">Yes. Under Labour Act 2074, every employer must pay one month's basic salary as festival (dashain) bonus to employees who have completed at least three months of service. This is a statutory right, not discretionary.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">How is salary tax calculated if I have two employers?</h4>
                        <p className="text-slate-600 text-sm">If you earn from two employers in the same tax year, you must aggregate both incomes and file a self-assessment tax return with IRD. Each employer will have deducted TDS based on only their salary component, which may result in under-deduction. You are responsible for paying the shortfall plus interest.</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500">Sources: Labour Act 2074, Social Security Act 2074, Income Tax Act 2058, Finance Act 2082. Verified May 2026. For current minimum wage, check dolidar.gov.np.</p>
                </div>
            </div>
        </div>
    )`;
        financial = financial.substring(0, contentStartIndex) + newSalaryContent + financial.substring(contentEndIndex + 1);
        fs.writeFileSync(financialPath, financial, 'utf8');
        console.log('Updated financial.tsx successfully');
    }
}
