import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Nepal Salary Tax Calculator (FY 2083/84) – Calculate Income Tax Online",
  description: "Calculate your Nepal salary tax instantly using the latest FY 2083/84 income tax rates. Get an accurate breakdown of income tax, SSF, CIT, employer contribution, annual tax, monthly tax and take-home salary.",
  slug: 'nepal-salary',
  canonical: 'https://nepacalc.com/calculator/nepal-salary/',
  keywords: [
    "Nepal salary tax calculator",
    "salary tax calculator Nepal",
    "Nepal income tax calculator",
    "salary tax Nepal",
    "income tax calculator Nepal",
    "Nepal payroll calculator",
    "take home salary calculator Nepal",
    "Nepal salary calculator",
    "Nepal income tax slabs 2083/84",
    "FY 2083/84 salary tax",
    "SSF calculator Nepal",
    "CIT tax calculator Nepal"
  ]
});

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#software",
      "name": "Nepal Salary Tax Calculator",
      "url": "https://nepacalc.com/calculator/nepal-salary/",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "description": "Calculate Nepal salary tax using FY2083/84 tax slabs.",
      "image": "https://nepacalc.com/images/salary-tax-calculator-nepal.webp",
      "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
      "publisher": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
      "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "NPR", "description": "Free" }
    },
    {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#webpage",
      "url": "https://nepacalc.com/calculator/nepal-salary/",
      "name": "Nepal Salary Tax Calculator (FY 2083/84) – Calculate Income Tax Online",
      "description": "Calculate your Nepal salary tax instantly using the latest FY 2083/84 income tax rates. Get an accurate breakdown of income tax, SSF, CIT, employer contribution, annual tax, monthly tax and take-home salary.",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".intro-text", "#income-tax-slabs"]
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com" },
        { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculators/" },
        { "@type": "ListItem", "position": 3, "name": "Salary Tax Calculator" }
      ]
    },
    {
      "@type": "HowTo",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#howto",
      "name": "How to Calculate Nepal Salary Tax",
      "description": "Step-by-step guide to calculate your Nepal salary tax using FY 2083/84 income tax rates.",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Enter salary", "text": "Enter your gross monthly salary in NPR. Toggle to annual salary input if preferred." },
        { "@type": "HowToStep", "position": 2, "name": "Choose SSF", "text": "Enable Social Security Fund (SSF) if enrolled. 11% employee and 20% employer contributions are applied automatically." },
        { "@type": "HowToStep", "position": 3, "name": "Enter CIT", "text": "Select CIT or Provident Fund from the retirement dropdown and enter your actual monthly contribution amount." },
        { "@type": "HowToStep", "position": 4, "name": "View tax", "text": "Instantly see your estimated monthly income tax, annual tax, effective tax rate, slab-wise breakdown, and take-home salary." },
        { "@type": "HowToStep", "position": 5, "name": "Download report", "text": "Use Copy, Print or PDF buttons to export your salary calculation summary for payroll or HR purposes." }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://nepacalc.com/#organization",
      "name": "NepaCalc",
      "url": "https://nepacalc.com",
      "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" },
      "sameAs": ["https://nepacalc.com"],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@nepacalc.com"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://nepacalc.com/#website",
      "url": "https://nepacalc.com",
      "name": "NepaCalc",
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://nepacalc.com/search?q={search_term_string}" },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#faq",
      "mainEntity": [
        { "@type": "Question", "name": "How is salary tax calculated in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Salary tax is calculated annually. Gross annual salary is reduced by eligible deductions (SSF, CIT), and the remaining taxable income is applied to FY 2083/84 progressive slabs (1%–29%). The annual tax is divided by 12 to determine monthly TDS." } },
        { "@type": "Question", "name": "What is the income tax rate for FY 2083/84?", "acceptedAnswer": { "@type": "Answer", "text": "FY 2083/84 uses: 1% up to Rs. 10,00,000; 10% from Rs. 10,00,001–15,00,000; 20% from Rs. 15,00,001–25,00,000; 27% from Rs. 25,00,001–40,00,000; and 29% above Rs. 40,00,000." } },
        { "@type": "Question", "name": "Is SSF contribution deductible from taxable income?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The 11% employee SSF contribution reduces your taxable income, capped at one-third of annual salary or Rs. 5,00,000. The employer's 20% SSF does not reduce employee taxable income but increases employer CTC." } },
        { "@type": "Question", "name": "Does CIT reduce income tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. CIT contributions are deductible from annual taxable income under Nepal's retirement contribution rules, subject to the combined cap (SSF + CIT) of one-third of annual salary or Rs. 5,00,000." } },
        { "@type": "Question", "name": "How much salary is tax-free in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "The first Rs. 10,00,000 of annual taxable income is taxed at 1%. SSF contributors receive a waiver of this 1%, effectively making income up to Rs. 10,00,000 (after SSF deduction) tax-free." } },
        { "@type": "Question", "name": "What is the highest income tax rate in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "29% (27% base + 2% surcharge) on annual taxable income above Rs. 40,00,000." } },
        { "@type": "Question", "name": "How is the employer contribution calculated?", "acceptedAnswer": { "@type": "Answer", "text": "Employer SSF is 20% of the employee's monthly salary, added to gross salary to compute the Total Employer Cost (CTC)." } },
        { "@type": "Question", "name": "Is Dashain allowance taxable in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Dashain allowance, festival bonuses and performance bonuses are all taxable income included in your annual taxable income." } },
        { "@type": "Question", "name": "Can I calculate annual salary tax using this calculator?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Toggle the salary frequency selector to Annual. The calculator automatically converts to annual figures and displays both monthly and annual tax summaries." } },
        { "@type": "Question", "name": "Is this calculator updated for FY 2083/84?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Fully updated for FY 2083/84 with revised slabs, increased donation limit (Rs. 3,00,000), new education deduction (25% up to Rs. 25,000), and updated building insurance cap (Rs. 10,000)." } }
      ]
    }
  ]
};

const TAX_EXAMPLES = [
  { label: "Mid-level Employee", monthlyGross: 50000, ssf: 5500, annualTaxable: 534000, annualTax: 5340, monthlyTax: 445, takeHome: 44055 },
  { label: "Senior Employee", monthlyGross: 100000, ssf: 11000, annualTaxable: 1068000, annualTax: 16800, monthlyTax: 1400, takeHome: 87600 },
  { label: "Executive / Manager", monthlyGross: 250000, ssf: 27500, annualTaxable: 2670000, annualTax: 234000, monthlyTax: 19500, takeHome: 203000 },
];

export default function Page() {
  return (
    <div className="bg-[#F1F3F4] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }} />

      <Calculator />

      <div className="hp-container pb-20 pt-6">
        <div className="max-w-4xl mx-auto space-y-14">

          {/* H1 + Short Introduction */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Nepal Salary Tax Calculator (FY 2083/84)
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200"><span className="text-green-500">✓</span> Updated for FY2083/84</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200"><span className="text-blue-500">✓</span> Finance Act 2083</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200">Last Updated: July 2026</span>
            </div>
            <p className="intro-text text-slate-700 leading-relaxed max-w-3xl">
              Calculate your Nepal salary tax instantly using the latest FY 2083/84 income tax rates announced by the <a href="https://mof.gov.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ministry of Finance</a>. Enter your monthly salary to receive an accurate breakdown of income tax, <Link href="/calculator/ssf/" className="text-blue-600 hover:underline">Social Security Fund (SSF)</Link>, Citizen Investment Trust (CIT), employer contribution, take-home salary and total employer cost.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Table of Contents</h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-blue-600">
              <li><a href="#salary-tax-breakdown" className="hover:underline">Salary Tax Breakdown</a></li>
              <li><a href="#what-is-salary-tax" className="hover:underline">What is Nepal Salary Tax?</a></li>
              <li><a href="#income-tax-slabs" className="hover:underline">Income Tax Slabs (FY 2083/84)</a></li>
              <li><a href="#how-calculated" className="hover:underline">How Salary Tax is Calculated</a></li>
              <li><a href="#ssf" className="hover:underline">Social Security Fund (SSF)</a></li>
              <li><a href="#cit" className="hover:underline">Citizen Investment Trust (CIT)</a></li>
              <li><a href="#salary-examples" className="hover:underline">Tax Calculation Examples</a></li>
              <li><a href="#fy-changes" className="hover:underline">Changes in FY 2083/84</a></li>
              <li><a href="#faq" className="hover:underline">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* AI Overview Block */}
          <div id="ai-overview" className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-slate-700 text-sm leading-relaxed">
            <p className="font-black text-blue-800 text-xs uppercase tracking-wider mb-2">Quick Summary</p>
            <p>Nepal uses a progressive income tax system for salaried individuals. The FY 2083/84 tax rates range from 1% to 29%, depending on annual taxable income after eligible deductions such as employee SSF and CIT contributions. Monthly income tax is always derived from an annual calculation divided by 12.</p>
          </div>

          {/* Salary Tax Breakdown Cards */}
          <section id="salary-tax-breakdown">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Salary Tax Breakdown</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Gross Salary", icon: "💰", desc: "Monthly salary before any deductions — starting point for all tax calculations." },
                { title: "Taxable Salary", icon: "📊", desc: "Salary remaining after eligible deductions such as SSF and CIT contributions." },
                { title: "Income Tax", icon: "🏛️", desc: "Tax calculated using the FY 2083/84 progressive slabs from 1% to 29%." },
                { title: "Take-Home Salary", icon: "✅", desc: "Final salary received after income tax and all eligible deductions." },
              ].map((card, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <h3 className="text-sm font-black text-slate-900 mb-1">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What is Nepal Salary Tax */}
          <section id="what-is-salary-tax">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Nepal Salary Tax?</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>Salary tax in Nepal is the income tax levied on remuneration received by salaried individuals. It is governed under the <strong>Income Tax Act of Nepal</strong> and administered by the Inland Revenue Department (IRD). Employers must deduct the applicable income tax from monthly salary and deposit it with the IRD — a process called Tax Deducted at Source (TDS).</p>
              <p>Nepal uses a <strong>progressive income tax system</strong>, meaning different portions of annual income are taxed at different rates. Only the portion falling within a slab is taxed at that slab rate — not the entire salary. For FY 2083/84, the Government of Nepal revised the structure with updated slabs, a higher threshold, and new approved deductions.</p>
            </div>
          </section>

          {/* Who Should Use */}
          <section id="who-should-use">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Should Use This Salary Tax Calculator?</h2>
            <p className="text-slate-700 leading-relaxed mb-4">This Nepal Salary Tax Calculator is useful for any salaried individual or HR professional in Nepal:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {["Private sector employees","Government employees","NGO and INGO employees","Corporate and bank employees","Teachers and educators","Healthcare professionals","IT professionals and engineers","Consultants on fixed salary","HR managers running payroll"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 shadow-sm">
                  <span className="text-emerald-500 font-black">✓</span>{item}
                </div>
              ))}
            </div>
          </section>

          {/* Income Tax Slabs */}
          <section id="income-tax-slabs">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Nepal Income Tax Slabs (FY 2083/84)</h2>
            <p className="text-slate-700 leading-relaxed mb-5">The Government of Nepal revised the personal income tax slabs for FY 2083/84. The new structure raises the first slab threshold to Rs. 10,00,000 and reduces the maximum rate to 29%:</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-5">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-4 font-bold text-sm">Annual Taxable Income</th>
                    <th className="p-4 font-bold text-sm">Tax Rate</th>
                    <th className="p-4 font-bold text-sm">Max Tax on Slab</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 text-sm divide-y divide-slate-100">
                  {[
                    ["Up to Rs. 10,00,000","1%","Rs. 10,000"],
                    ["Rs. 10,00,001 – Rs. 15,00,000","10%","Rs. 50,000"],
                    ["Rs. 15,00,001 – Rs. 25,00,000","20%","Rs. 2,00,000"],
                    ["Rs. 25,00,001 – Rs. 40,00,000","27%","Rs. 4,05,000"],
                    ["Above Rs. 40,00,000","29% (27% + 2% surcharge)","On all income above 40L"],
                  ].map(([income, rate, tax], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="p-4 font-medium">{income}</td>
                      <td className="p-4 font-black text-blue-700">{rate}</td>
                      <td className="p-4 text-slate-500">{tax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-sm text-slate-700">
              <strong>Progressive Taxation:</strong> Each slab is taxed separately. If your taxable income is Rs. 20,00,000 — only the first Rs. 10,00,000 is taxed at 1%, the next Rs. 5,00,000 at 10%, and the next Rs. 5,00,000 at 20%. You can use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Nepal Income Tax Slabs Calculator</Link> to explore slabs in detail.
            </div>
          </section>

          {/* How Salary Tax is Calculated */}
          <section id="how-calculated">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How Salary Tax is Calculated in Nepal</h2>
            <p className="text-slate-700 leading-relaxed mb-5">Salary tax must always be calculated on an <strong>annual basis first</strong>, then divided by 12 for monthly TDS. Applying monthly slabs directly produces incorrect results. The complete calculation flow:</p>
            <div className="bg-slate-800 text-white rounded-xl p-6 space-y-2 font-mono text-sm mb-4">
              {[
                "Monthly Gross Salary × 12 = Annual Gross Salary",
                "Annual Gross + Bonuses + Allowances = Total Annual Income",
                "Total Annual Income − Employee SSF (11%) = After SSF",
                "After SSF − CIT / PF Contribution = Taxable Income",
                "Taxable Income → Applied to FY 2083/84 Slabs",
                "= Annual Income Tax",
                "Annual Tax ÷ 12 = Monthly Income Tax",
                "Monthly Gross − SSF − CIT − Monthly Tax = Take-Home",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-green-300">{step}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-sm">Annual bonuses (Dashain, festival, performance) and taxable allowances (housing, transport, meal) are included in total annual taxable income before applying slabs.</p>
          </section>

          {/* SSF */}
          <section id="ssf">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Social Security Fund (SSF)</h2>
            <p className="text-slate-700 leading-relaxed mb-5">The SSF is a mandatory retirement scheme for formal sector employees. Contributions are split between employee and employer:</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              {[
                { label: "Employee Contribution", pct: "11%", color: "bg-orange-50 border-orange-200 text-orange-800", note: "Deducted from gross salary · Reduces taxable income" },
                { label: "Employer Contribution", pct: "20%", color: "bg-emerald-50 border-emerald-200 text-emerald-800", note: "Paid by employer · Increases CTC · Does NOT reduce employee taxable income" },
                { label: "Total SSF", pct: "31%", color: "bg-blue-50 border-blue-200 text-blue-800", note: "Combined contribution deposited to the Social Security Fund" },
              ].map((item, i) => (
                <div key={i} className={`border rounded-xl p-5 ${item.color}`}>
                  <p className="text-3xl font-black mb-1">{item.pct}</p>
                  <p className="font-black text-sm mb-2">{item.label}</p>
                  <p className="text-xs leading-relaxed opacity-80">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-sm">SSF contributors benefit from a waiver of the 1% social security tax on their first Rs. 10,00,000 of income. The annual SSF deduction is capped at one-third of annual income or Rs. 5,00,000, whichever is lower. See our <Link href="/calculator/nepal-provident-fund/" className="text-blue-600 hover:underline">Provident Fund Calculator</Link> for PF-based calculations.</p>
          </section>

          {/* CIT */}
          <section id="cit">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Citizen Investment Trust (CIT)</h2>
            <p className="text-slate-700 leading-relaxed mb-4">CIT is a government-backed voluntary retirement savings scheme. Contributions reduce your taxable income, lowering overall income tax:</p>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 text-sm text-slate-700">
              {[
                ["Purpose", "Long-term retirement savings with government-guaranteed returns."],
                ["Tax Treatment", "CIT contributions are deductible from annual taxable income under the retirement contribution provision."],
                ["Deduction Cap", "Capped at one-third of annual salary or Rs. 5,00,000, whichever is lower (combined with SSF)."],
                ["Input Required", "Enter your actual monthly CIT contribution in the calculator above for an accurate tax estimate."],
              ].map(([k, v], i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-blue-600 font-black shrink-0">→</span>
                  <p><strong>{k}:</strong> {v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Salary Tax Examples */}
          <section id="salary-examples">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Salary Tax Calculation Examples (FY 2083/84)</h2>
            <p className="text-slate-700 leading-relaxed mb-5">Examples below are calculated using FY 2083/84 progressive slabs with SSF enrolled (11% employee contribution):</p>
            <div className="space-y-5">
              {TAX_EXAMPLES.map((ex, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-800 text-white px-5 py-3">
                    <h3 className="font-black text-sm">Example {i + 1} – {ex.label} (Rs. {ex.monthlyGross.toLocaleString('en-IN')}/month)</h3>
                  </div>
                  <div className="p-5">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-slate-100">
                        {[
                          ["Gross Monthly Salary", `Rs. ${ex.monthlyGross.toLocaleString('en-IN')}`],
                          ["Employee SSF (11%)", `− Rs. ${ex.ssf.toLocaleString('en-IN')}`],
                          ["Annual Taxable Income (approx.)", `Rs. ${ex.annualTaxable.toLocaleString('en-IN')}`],
                          ["Annual Income Tax", `Rs. ${ex.annualTax.toLocaleString('en-IN')}`],
                          ["Estimated Monthly Tax", `Rs. ${ex.monthlyTax.toLocaleString('en-IN')}`],
                          ["Monthly Take-Home Salary", `Rs. ${ex.takeHome.toLocaleString('en-IN')}`],
                        ].map(([label, val], j) => (
                          <tr key={j} className={j === 5 ? "bg-emerald-50 font-black text-emerald-800" : ""}>
                            <td className="py-2.5 pr-4 text-slate-600">{label}</td>
                            <td className="py-2.5 font-bold text-slate-900 text-right">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs text-slate-400 mt-3">*Approximate values. Use the calculator above for exact results.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FY 2083/84 Changes */}
          <section id="fy-changes">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Salary Tax Changes in FY 2083/84</h2>
            <p className="text-slate-700 leading-relaxed mb-5">The Government of Nepal introduced these key salary-related changes in the FY 2083/84 Budget and Finance Act 2083:</p>
            <div className="space-y-3">
              {[
                ["📈", "Tax Exemption Threshold to Rs. 10 Lakh", "The first income tax slab now starts at 1% up to Rs. 10,00,000, increasing the effective threshold for meaningful tax liability."],
                ["📉", "Maximum Personal Income Tax Reduced to 29%", "The highest marginal rate has dropped to 29% (27% + 2% surcharge) for income above Rs. 40,00,000, replacing the old 36%–39% top rates."],
                ["🗂️", "Updated Progressive Tax Slabs", "Five slabs: 1%, 10%, 20%, 27%, and 29% — revised to provide more equitable taxation across income levels."],
                ["🎁", "Donation Deduction Increased to Rs. 3,00,000", "Maximum approved deduction for charitable donations raised from Rs. 1,00,000 to Rs. 3,00,000 (subject to percentage limit)."],
                ["🏠", "Residential Building Insurance Deduction Increased", "Maximum deduction for residential building insurance raised to Rs. 10,000 per year."],
                ["🎓", "New Education Deduction Introduced", "Taxpayers may deduct the lower of 25% of annual tuition paid or Rs. 25,000 as an approved deduction."],
                ["📅", "Tax Assessment Period Reduced", "Income tax assessment period reduced from four years to three years, shortening review timelines for taxpayers and IRD alike."],
              ].map(([icon, title, desc], i) => (
                <div key={i} className="flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm mb-1">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section id="benefits">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Benefits of Using This Salary Tax Calculator</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["⚡","Instant Live Calculation","Results update instantly as you type — no Calculate button required."],
                ["📋","FY 2083/84 Accurate","All tax slabs, deduction limits, and surcharges reflect the latest Government of Nepal rules."],
                ["🏛️","Correct SSF & CIT Handling","Separates employee SSF (11%) from employer SSF (20%) and supports CIT and PF inputs."],
                ["💼","Employer CTC Breakdown","Shows Total Cost to Company — useful for job offer negotiation and HR payroll planning."],
                ["📊","Slab-wise Transparency","Displays exactly how much tax is applied at each slab (1%, 10%, 20%, 27%, 29%)."],
                ["📅","Annual & Monthly Views","Switch between monthly and annual summaries for short-term budgets and annual tax returns."],
              ].map(([icon, title, desc], i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <p className="font-black text-slate-900 text-sm mb-1">{title}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section id="faq" className="faq-section">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                ["How is salary tax calculated in Nepal?", "Salary tax is calculated annually. Gross annual salary is reduced by eligible deductions (SSF, CIT), and the remaining taxable income is applied to FY 2083/84 progressive slabs (1%–29%). The annual tax is divided by 12 to determine monthly TDS."],
                ["What is the income tax rate for FY 2083/84?", "FY 2083/84 uses: 1% up to Rs. 10,00,000; 10% from Rs. 10,00,001–15,00,000; 20% from Rs. 15,00,001–25,00,000; 27% from Rs. 25,00,001–40,00,000; and 29% above Rs. 40,00,000."],
                ["Is SSF contribution deductible from taxable income?", "Yes. The 11% employee SSF contribution reduces your taxable income, capped at one-third of annual salary or Rs. 5,00,000. The employer's 20% SSF does not reduce employee taxable income but increases employer CTC."],
                ["Does CIT reduce income tax in Nepal?", "Yes. CIT contributions are deductible from annual taxable income under Nepal's retirement contribution rules, subject to the combined cap (SSF + CIT) of one-third of annual salary or Rs. 5,00,000."],
                ["How much salary is tax-free in Nepal?", "The first Rs. 10,00,000 of annual taxable income is taxed at 1%. SSF contributors receive a waiver of this 1%, effectively making income up to Rs. 10,00,000 (after SSF deduction) tax-free."],
                ["What is the highest income tax rate in Nepal?", "29% (27% base + 2% surcharge) on annual taxable income above Rs. 40,00,000."],
                ["How is the employer contribution calculated?", "Employer SSF is 20% of the employee's monthly salary, added to gross salary to compute the Total Employer Cost (CTC)."],
                ["Is Dashain allowance taxable in Nepal?", "Yes. Dashain allowance, festival bonuses and performance bonuses are all taxable income included in your annual taxable income."],
                ["Can I calculate annual salary tax using this calculator?", "Yes. Toggle the salary frequency selector to Annual. The calculator automatically converts to annual figures and displays both monthly and annual tax summaries."],
                ["Is this calculator updated for FY 2083/84?", "Yes. Fully updated for FY 2083/84 with revised slabs, increased donation limit (Rs. 3,00,000), new education deduction (25% up to Rs. 25,000), and updated building insurance cap (Rs. 10,000)."],
              ].map(([q, a], i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-base font-black text-slate-900 mb-2">{q}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Calculators */}
          <section className="pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Related Salary &amp; Tax Calculators</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm">
              {[
                ["/calculator/nepal-income-tax/", "📊", "Nepal Income Tax Slabs Calculator"],
                ["/calculator/ssf/", "🛡️", "SSF Calculator Nepal"],
                ["/calculator/cit/", "📈", "CIT Calculator Nepal"],
                ["/calculator/payroll/", "💼", "Payroll Calculator Nepal"],
                ["/calculator/overtime/", "⏱️", "Overtime Calculator"],
                ["/calculator/salary-increment/", "🚀", "Salary Increment Calculator"],
                ["/calculator/nepal-provident-fund/", "🏦", "Provident Fund (PF) Calculator"],
                ["/calculator/gratuity-calculator/", "🎁", "Gratuity Calculator Nepal"],
              ].map(([href, icon, label], i) => (
                <li key={i}>
                  <Link href={href as string} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-3 hover:border-blue-400 hover:text-blue-700 transition-colors shadow-sm">
                    <span>{icon}</span>
                    <span className="font-bold underline underline-offset-2">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust Signals & EEAT */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                "Government Rules Used",
                "Finance Act FY2083/84",
                "Income Tax Act",
                "Budget FY2083/84",
                "Social Security Fund Rules"
              ].map((item, i) => (
                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-800 font-medium font-bold flex gap-2">
                   <span className="text-emerald-500">✓</span> {item}
                </div>
              ))}
            </div>

            {/* Disclaimer & Sources / E-E-A-T */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 space-y-4">
              <h4 className="font-black text-slate-800">Data Sources &amp; References</h4>
              <p>All calculations in this Nepal Salary Tax Calculator are based on official Government of Nepal sources:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><a href="https://mof.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Government of Nepal Budget FY 2083/84</a></li>
                <li><a href="https://mof.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Finance Act 2083 (Nepal)</a></li>
                <li>Income Tax Act of Nepal (as amended)</li>
                <li><a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Inland Revenue Department (IRD)</a> — Official tax brackets and fiscal publications</li>
                <li><a href="https://ssf.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Social Security Fund (SSF)</a> — Employee and employer contribution guidelines</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-slate-200 text-amber-800 bg-amber-50 p-4 rounded-lg">
                <strong>Disclaimer:</strong> This calculator provides an estimate based on the latest Government of Nepal tax rules for FY2083/84. Actual payroll calculations may vary depending on individual circumstances, employer policies, additional deductions, or future legal amendments.
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-4 text-xs">
                <div className="bg-white border border-slate-200 p-3 rounded-lg">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block mb-1">Reviewed By</span>
                  <span className="text-slate-800 font-bold block">NepaCalc Finance Team</span>
                </div>
                <div className="text-right flex flex-col justify-end">
                  <p className="text-slate-500"><strong>Updated:</strong> FY2083/84</p>
                  <p className="text-slate-500"><strong>Last Updated:</strong> July 2026</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
