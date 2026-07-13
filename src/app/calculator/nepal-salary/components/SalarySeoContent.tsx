import Link from 'next/link';

export function SalarySeoContent() {
  return (
    <article className="max-w-4xl mx-auto space-y-12 pb-8">
      {/* What This Salary Calculator Covers */}
      <section className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm mt-8">
        <h2 className="text-xl font-bold text-[#202124] mb-3">What This Salary Calculator Covers</h2>
        <p className="text-[#3C4043] leading-relaxed">
          This Salary Calculator is designed exclusively for employment income in Nepal.
          It calculates salary tax, payroll deductions, Social Security Fund (SSF), Citizen Investment Trust (CIT), Employee Provident Fund (EPF), employer contribution and take-home salary using the latest FY 2083/84 rules.
          It should not be used for business income, professional income, rental income, capital gains or other taxable income sources.
        </p>
      </section>

      {/* Salary Calculator vs Income Tax Calculator */}
      <section className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#202124] mb-5">Salary Calculator vs Income Tax Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-black text-blue-900 mb-3 text-sm uppercase tracking-wider">Salary Calculator</h3>
            <ul className="space-y-2 text-sm text-blue-800 font-medium">
              <li>• Salary only</li>
              <li>• Payroll</li>
              <li>• Employee deductions</li>
              <li>• Employer cost</li>
              <li>• Take-home salary</li>
              <li>• Monthly payroll</li>
            </ul>
          </div>
          <div className="border border-emerald-200 bg-emerald-50 p-4 rounded-lg">
            <h3 className="font-black text-emerald-900 mb-3 text-sm uppercase tracking-wider">Income Tax Calculator</h3>
            <ul className="space-y-2 text-sm text-emerald-800 font-medium">
              <li>• Business income</li>
              <li>• Rental income</li>
              <li>• Capital gains</li>
              <li>• Professional income</li>
              <li>• Multiple income sources</li>
              <li>• Complete annual taxation</li>
            </ul>
          </div>
        </div>
        <p className="text-[#3C4043] text-sm leading-relaxed bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
          If your only income comes from employment, use this Salary Calculator.
          If you have additional taxable income sources, we highly recommend using the <Link href="/calculator/nepal-income-tax/" className="text-[#1A73E8] font-bold hover:underline">Nepal Income Tax Calculator</Link> to accurately assess your overall liability across all income streams.
        </p>
      </section>

      {/* Intro */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight leading-tight mb-4">
          Nepal Salary Tax Calculator (FY 2083/84)
        </h2>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E6F4EA] text-[#137333] text-xs font-bold rounded-full border border-[#CEEAD6]">✓ Updated for FY2083/84</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F0FE] text-[#1A73E8] text-xs font-bold rounded-full border border-[#D2E3FC]">✓ Finance Act 2083</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F1F3F4] text-[#5F6368] text-xs font-bold rounded-full border border-[#DADCE0]">Last Updated: July 2026</span>
        </div>
        <p className="intro-text text-[#3C4043] leading-relaxed">
          Calculate your Nepal salary tax instantly using the latest FY 2083/84 income tax rates announced by the Ministry of Finance. Enter your monthly salary to receive an accurate breakdown of Nepal Income Tax, Social Security Fund (SSF), Citizen Investment Trust (CIT), employer contribution, take-home salary and total employer cost.
        </p>
      </div>

      {/* AI Overview Block */}
      <div className="p-5 bg-[#E8F0FE] border-l-4 border-[#1A73E8] rounded-r-xl text-[#3C4043] text-sm leading-relaxed">
        <p className="font-black text-[#1A73E8] text-xs uppercase tracking-wider mb-2">Quick Summary</p>
        <p>Nepal uses a progressive income tax system for salaried individuals. The FY 2083/84 tax rates range from 1% to 29%, depending on annual taxable income after eligible deductions such as employee SSF and CIT contributions. Monthly income tax is always derived from an annual calculation divided by 12.</p>
      </div>

      {/* Salary Tax Breakdown Cards */}
      <section id="salary-tax-breakdown">
        <h3 className="text-xl font-bold text-[#202124] mb-5">Salary Tax Breakdown</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {[
            { title: "Gross Salary", icon: "💰", desc: "Monthly salary before any deductions, starting point for all tax calculations." },
            { title: "Taxable Salary", icon: "📊", desc: "Salary remaining after eligible deductions such as SSF and CIT contributions." },
            { title: "Income Tax", icon: "🏛️", desc: "Tax calculated using the FY 2083/84 progressive slabs from 1% to 29%." },
            { title: "Take-Home Salary", icon: "✅", desc: "Final salary received after income tax and all eligible deductions." },
          ].map((card, i) => (
            <div key={i} className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-sm">
              <div className="text-2xl mb-2">{card.icon}</div>
              <h4 className="text-sm font-black text-[#202124] mb-1">{card.title}</h4>
              <p className="text-xs text-[#5F6368] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is Nepal Salary Tax */}
      <section id="what-is-salary-tax">
        <h3 className="text-xl font-bold text-[#202124] mb-4">What is Nepal Salary Tax?</h3>
        <div className="space-y-4 text-[#3C4043] leading-relaxed">
          <p>Salary tax in Nepal is the income tax levied on remuneration received by salaried individuals. It is governed under the <strong>Income Tax Act of Nepal</strong> and administered by the Inland Revenue Department (IRD), a process called Tax Deducted at Source (<Link href="/calculator/nepal-tds/" className="text-[#1A73E8] hover:underline">TDS</Link>).</p>
          <p>Nepal uses a <strong>progressive income tax system</strong>, meaning different portions of annual income are taxed at different rates. Only the portion falling within a slab is taxed at that slab rate, not the entire salary. For FY 2083/84, the Government of Nepal revised the structure with updated slabs, a higher threshold, and new approved deductions.</p>
        </div>
      </section>

      {/* Who Should Use */}
      <section id="who-should-use">
        <h3 className="text-xl font-bold text-[#202124] mb-4">Who Should Use This Calculator?</h3>
        <p className="text-[#3C4043] leading-relaxed mb-4">This tool is specifically built for calculating employment-related tax liabilities for:</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-3">
          {["Private sector employees","Government employees","NGO and INGO employees","Corporate and bank employees","Teachers and educators","Healthcare professionals","IT professionals and engineers","HR managers running payroll"].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white border border-[#DADCE0] rounded-lg px-4 py-3 text-sm text-[#3C4043] shadow-sm">
              <span className="text-[#137333] font-black">✓</span>{item}
            </div>
          ))}
        </div>
      </section>

      {/* Income Tax Slabs */}
      <section id="income-tax-slabs">
        <h3 className="text-xl font-bold text-[#202124] mb-4">Nepal Income Tax Slabs (FY 2083/84)</h3>
        <p className="text-[#3C4043] leading-relaxed mb-5">The Government of Nepal revised the personal income tax slabs for FY 2083/84. The new structure raises the first slab threshold to Rs. 10,00,000 and reduces the maximum rate to 29%:</p>
        <div className="overflow-x-auto rounded-xl border border-[#DADCE0] shadow-sm mb-5">
          <table className="min-w-full text-left bg-white text-sm">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="p-4 font-bold text-[#202124]">Annual Taxable Income</th>
                <th className="p-4 font-bold text-[#202124]">Tax Rate</th>
                <th className="p-4 font-bold text-[#202124]">Max Tax on Slab</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
              {[
                ["Up to Rs. 10,00,000","1%","Rs. 10,000"],
                ["Rs. 10,00,001 – Rs. 15,00,000","10%","Rs. 50,000"],
                ["Rs. 15,00,001 – Rs. 25,00,000","20%","Rs. 2,00,000"],
                ["Rs. 25,00,001 – Rs. 40,00,000","27%","Rs. 4,05,000"],
                ["Above Rs. 40,00,000","29% (27% + 2% surcharge)","On all income above 40L"],
              ].map(([income, rate, tax], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"}>
                  <td className="p-4 font-medium">{income}</td>
                  <td className="p-4 font-black text-[#1A73E8]">{rate}</td>
                  <td className="p-4 text-[#5F6368]">{tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How Salary Tax is Calculated */}
      <section id="how-calculated">
        <h3 className="text-xl font-bold text-[#202124] mb-4">How Salary Tax is Calculated in Nepal</h3>
        <p className="text-[#3C4043] leading-relaxed mb-5">Salary tax must always be calculated on an <strong>annual basis first</strong>, then divided by 12 for monthly TDS. Applying monthly slabs directly produces incorrect results. Ensure your employer submits the TDS within the required filing periods; you can verify timelines using our <Link href="/calculator/nepal-income-tax-deadlines/" className="text-[#1A73E8] font-bold hover:underline">tax date duration calculator</Link>. The complete calculation flow:</p>
        <div className="bg-[#202124] text-white rounded-xl p-6 space-y-3 font-mono text-xs sm:text-sm mb-4">
          {[
            "Monthly Gross Salary × 12 = Annual Gross Salary",
            "Annual Gross + Bonuses + Allowances = Total Annual Income",
            "Total Annual Income − Employee SSF (11%) = After SSF",
            "After SSF − CIT / PF Contribution = Taxable Income",
            "Taxable Income → Applied to FY 2083/84 Slabs",
            "= Annual Salary Tax",
            "Annual Tax ÷ 12 = Monthly Income Tax",
            "Monthly Gross − SSF − CIT − Monthly Tax = Take-Home",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="bg-[#1A73E8] text-white font-black rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-[#81C995]">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SSF */}
      <section id="ssf">
        <h3 className="text-xl font-bold text-[#202124] mb-4">Social Security Fund (SSF)</h3>
        <p className="text-[#3C4043] leading-relaxed mb-5">The SSF is a mandatory retirement scheme for formal sector employees. You can verify detailed contributions using our <Link href="/calculator/ssf/" className="text-[#1A73E8] hover:underline">SSF Calculator</Link>. Contributions are split between employee and employer:</p>
        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          {[
            { label: "Employee Contribution", pct: "11%", color: "bg-[#FCE8E6] border-[#FAD2CF] text-[#C5221F]", note: "Deducted from gross salary · Reduces taxable income" },
            { label: "Employer Contribution", pct: "20%", color: "bg-[#E6F4EA] border-[#CEEAD6] text-[#137333]", note: "Paid by employer · Increases CTC · Does NOT reduce employee taxable income" },
            { label: "Total SSF", pct: "31%", color: "bg-[#E8F0FE] border-[#D2E3FC] text-[#1A73E8]", note: "Combined contribution deposited to the Social Security Fund" },
          ].map((item, i) => (
            <div key={i} className={`border rounded-xl p-5 ${item.color}`}>
              <p className="text-3xl font-black mb-1">{item.pct}</p>
              <p className="font-black text-sm mb-2">{item.label}</p>
              <p className="text-xs leading-relaxed opacity-80">{item.note}</p>
            </div>
          ))}
        </div>
        <p className="text-[#5F6368] text-sm leading-relaxed">SSF contributors benefit from a waiver of the 1% social security tax on their first Rs. 10,00,000 of income. The annual SSF deduction is capped at one-third of annual income or Rs. 5,00,000, whichever is lower. See our <Link href="/calculator/nepal-provident-fund/" className="text-[#1A73E8] hover:underline">Provident Fund Calculator</Link> for PF-based calculations.</p>
      </section>

      {/* CIT */}
      <section id="cit">
        <h3 className="text-xl font-bold text-[#202124] mb-4">Citizen Investment Trust (CIT)</h3>
        <p className="text-[#3C4043] leading-relaxed mb-4">CIT is a government-backed voluntary retirement savings scheme. Contributions reduce your taxable income, lowering overall income tax:</p>
        <div className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-sm space-y-3 text-sm text-[#3C4043]">
          {[
            ["Purpose", "Long-term retirement savings with government-guaranteed returns."],
            ["Tax Treatment", "CIT contributions are deductible from annual taxable income under the retirement contribution provision."],
            ["Deduction Cap", "Capped at one-third of annual salary or Rs. 5,00,000, whichever is lower (combined with SSF)."],
          ].map(([k, v], i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[#1A73E8] font-black shrink-0">→</span>
              <p><strong>{k}:</strong> {v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer & Sources / E-E-A-T */}
      <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl text-sm text-[#5F6368] space-y-4 mt-12">
        <h4 className="font-black text-[#202124]">Data Sources &amp; References</h4>
        <p>All calculations in this Nepal Salary Tax Calculator are based on official Government of Nepal sources:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Government of Nepal Budget FY 2083/84</li>
          <li>Finance Act 2083 (Nepal)</li>
          <li>Income Tax Act of Nepal (as amended)</li>
          <li>Inland Revenue Department (IRD), Official tax brackets and fiscal publications</li>
          <li>Social Security Fund (SSF), Employee and employer contribution guidelines</li>
        </ul>
        <div className="mt-6 pt-4 border-t border-[#DADCE0] flex flex-col sm:flex-row justify-between gap-4 text-xs">
          <div className="bg-white border border-[#DADCE0] p-3 rounded-lg">
            <span className="text-[#70757A] uppercase tracking-wider text-[10px] font-bold block mb-1">Reviewed By</span>
            <span className="text-[#202124] font-bold block">NepaCalc Finance Team</span>
          </div>
          <div className="text-right flex flex-col justify-end">
            <p className="text-[#5F6368]"><strong>Updated:</strong> FY2083/84</p>
            <p className="text-[#5F6368]"><strong>Last Updated:</strong> July 2026</p>
          </div>
        </div>
      </div>
    </article>
  );
}
