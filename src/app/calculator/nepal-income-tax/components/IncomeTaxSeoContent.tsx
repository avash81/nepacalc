import Link from 'next/link';

export function IncomeTaxSeoContent() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* TABLE OF CONTENTS */}
      <nav className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 mb-12">
        <p className="text-sm font-black text-[#202124] uppercase tracking-widest mb-4">Contents</p>
        <ol className="list-none pl-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            ['#intro',      'Nepal Income Tax Calculator'],
            ['#slabs',      'Income Tax Slabs (FY 2083/84)'],
            ['#budget',     'Finance Act 2083/84 Changes'],
            ['#how',        'How Income Tax Is Calculated'],
            ['#tds',        'Tax Deducted at Source (TDS)'],
            ['#ssf',        'Social Security Fund (SSF)'],
            ['#deductions', 'Tax Deductions Allowed'],
            ['#examples',   'Example Calculations'],
            ['#who',        'Who Can Use This Calculator'],
            ['#faq',        'Frequently Asked Questions'],
            ['#related',    'Related Calculators'],
            ['#references', 'Official Resources'],
          ].map(([href, label], i) => (
            <li key={href} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-black flex items-center justify-center shrink-0">{i + 1}</span>
              <a href={href} className="text-sm text-[#1A73E8] font-medium hover:underline">{label}</a>
            </li>
          ))}
        </ol>
      </nav>

      {/* SECTION 1: INTRO */}
      <h2 id="intro" className="text-2xl font-black text-[#202124] mt-12 mb-4">Nepal Income Tax Calculator (FY 2083/84)</h2>
      <p className="text-lg leading-relaxed text-[#202124] font-medium mb-4">
        Calculate your personal income tax using the latest Nepal Government Finance Act and Budget 2083/84 provisions. This calculator estimates your annual income tax, monthly Tax Deducted at Source (TDS), Social Security Tax (SST), retirement deductions and take-home salary based on current Inland Revenue Department (IRD) tax rules.
      </p>
      <p className="text-base text-[#3C4043] leading-relaxed mb-6">
        Whether you are a salaried employee, employer, HR professional, payroll officer or tax consultant, this calculator helps you understand your tax liability accurately. For a full monthly salary breakdown including PF, SSF, CIT and employer cost, use our{' '}
        <Link href="/calculator/nepal-salary/" className="text-[#1A73E8] font-bold hover:underline">Salary Calculator Nepal</Link>{' '}
        which covers every deduction line by line.
      </p>

      {/* E-E-A-T TRUST BOX */}
      <div className="bg-[#E8F0FE] border border-[#C5D9F7] rounded-xl p-5 flex gap-4 items-start mb-10">
        <div className="shrink-0 text-2xl">🏛️</div>
        <div>
          <p className="text-sm font-black text-[#1A73E8] mb-1">Data Source &amp; Accuracy</p>
          <p className="text-sm text-[#202124] leading-relaxed">
            This calculator is based on Nepal's Finance Act 2083/84, the latest Inland Revenue Department (IRD) income tax provisions, and the Government of Nepal Budget 2083/84. Tax calculations are updated whenever official tax rates or deduction rules change.
          </p>
        </div>
      </div>

      {/* SECTION 2: TAX SLABS */}
      <h2 id="slabs" className="text-2xl font-black text-[#202124] mt-12 mb-4">Nepal Income Tax Slabs (FY 2083/84)</h2>
      <p className="text-base text-[#3C4043] mb-6">
        The FY 2083/84 Finance Act replaced separate married and unmarried tax slabs with a single unified progressive structure for all resident individuals. The highest personal income tax rate was also reduced significantly from 39% to 29%.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="min-w-full text-sm text-left border border-[#DADCE0] rounded-lg">
          <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
            <tr>
              <th className="px-4 py-3 font-bold text-[#202124]">Annual Taxable Income</th>
              <th className="px-4 py-3 font-bold text-[#202124]">Tax Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DADCE0]">
            <tr><td className="px-4 py-3">Up to Rs. 10,00,000</td><td className="px-4 py-3 font-bold text-green-700">1%*</td></tr>
            <tr className="bg-gray-50"><td className="px-4 py-3">Rs. 10,00,001 to Rs. 15,00,000</td><td className="px-4 py-3 font-bold text-yellow-700">10%</td></tr>
            <tr><td className="px-4 py-3">Rs. 15,00,001 to Rs. 25,00,000</td><td className="px-4 py-3 font-bold text-orange-700">20%</td></tr>
            <tr className="bg-gray-50"><td className="px-4 py-3">Rs. 25,00,001 to Rs. 40,00,000</td><td className="px-4 py-3 font-bold text-red-600">27%</td></tr>
            <tr><td className="px-4 py-3">Above Rs. 40,00,000</td><td className="px-4 py-3 font-bold text-red-800">29%</td></tr>
          </tbody>
        </table>
        <p className="text-xs text-[#5F6368] mt-2">*The first slab represents Social Security Tax. Eligible SSF contributors may qualify for relief according to the Income Tax Act.</p>
      </div>
      <p className="text-base text-[#3C4043] mb-4">
        These slabs apply to resident individuals. To calculate the exact tax impact on your monthly salary, our{' '}
        <Link href="/calculator/nepal-tds/" className="text-[#1A73E8] font-bold hover:underline">TDS Calculator Nepal</Link>{' '}
        provides month-by-month TDS estimates for payroll officers and HR departments.
      </p>

      {/* SECTION 3: FINANCE ACT CHANGES */}
      <h2 id="budget" className="text-2xl font-black text-[#202124] mt-12 mb-4">Finance Act 2083/84 Changes Affecting Personal Income Tax</h2>
      <p className="text-base text-[#3C4043] mb-4">
        The FY 2083/84 Budget introduced the most significant personal income tax reform in Nepal in recent years. Key changes that directly affect salaried employees and their monthly TDS deductions include:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-base text-[#3C4043] mb-6">
        <li>Tax-free threshold increased to Rs. 10,00,000 (1% Social Security Tax applies where applicable).</li>
        <li>Maximum personal income tax rate reduced from 39% to 29%.</li>
        <li>Nepal now uses a unified tax slab for all resident individuals.</li>
        <li>Tax assessment period reduced from 4 years to 3 years.</li>
        <li>Donation deduction limit increased to Rs. 3,00,000.</li>
        <li>Residential building insurance deduction increased to Rs. 10,000.</li>
        <li>Children's education deduction introduced (25% of tuition, up to Rs. 25,000).</li>
        <li>Corporate Social Responsibility (CSR) deduction introduced at up to 1% of taxable income.</li>
        <li>Cash expenses above Rs. 25,000 are generally non-deductible for tax purposes.</li>
        <li>Income earned by universities established in Nepal for educational purposes is now tax-exempt.</li>
      </ul>
      <p className="text-base text-[#3C4043] mb-4">
        Employees receiving a bonus should note that bonus income is added to annual gross income. Use our{' '}
        <Link href="/calculator/nepal-bonus/" className="text-[#1A73E8] font-bold hover:underline">Bonus Tax Calculator</Link>{' '}
        to estimate the additional income tax impact of festival or performance bonuses on your annual liability.
      </p>

      {/* FEATURED IMAGE — placed in mid-content for engagement */}
      <div className="my-10 rounded-xl overflow-hidden border border-[#DADCE0] shadow-md max-w-full">
        <img 
          src="/images/nepal-income-tax-calculator-2083-2084.png" 
          alt="Nepal Income Tax Calculator FY 2083 2084 — Finance Act 2083" 
          className="w-full h-auto object-cover max-h-[480px]"
          loading="lazy"
          width={1200}
          height={630}
        />
        <div className="bg-[#F8F9FA] px-4 py-2 text-xs text-[#5F6368]">
          Nepal Income Tax Calculator (FY 2083/84) — Based on Finance Act 2083 and Government of Nepal Budget 2083/84
        </div>
      </div>

      {/* SECTION 4: HOW TAX IS CALCULATED */}
      <h2 id="how" className="text-2xl font-black text-[#202124] mt-12 mb-4">How Income Tax Is Calculated in Nepal</h2>
      <p className="text-base text-[#3C4043] mb-6">
        Nepal follows a progressive income tax system under which different portions of your annual taxable income are taxed at increasing rates. The process works as follows:
      </p>
      <div className="bg-[#F8F9FA] border border-[#DADCE0] p-6 rounded-xl text-center space-y-2 mb-6">
        {[
          'Gross Salary',
          'Retirement Contributions (SSF / EPF / CIT)',
          'Other Deductions (Insurance, Education, Donation, CSR)',
          'Taxable Income',
          'Progressive Tax Slabs (1% to 29%)',
          'Income Tax',
          'Monthly TDS',
          'Take Home Salary',
        ].map((step, i, arr) => (
          <div key={step}>
            <div className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${
              i === 0 || i === arr.length - 1
                ? 'bg-[#1A73E8] text-white'
                : i === arr.length - 3
                ? 'bg-[#202124] text-white'
                : 'bg-white border border-[#DADCE0] text-[#202124]'
            }`}>{step}</div>
            {i < arr.length - 1 && <div className="text-xl text-[#5F6368]">↓</div>}
          </div>
        ))}
      </div>
      <p className="text-base text-[#3C4043] mb-4">
        Retirement contributions to the{' '}
        <Link href="/calculator/nepal-ssf/" className="text-[#1A73E8] font-bold hover:underline">Social Security Fund (SSF)</Link>,{' '}
        <Link href="/calculator/nepal-provident-fund/" className="text-[#1A73E8] font-bold hover:underline">Employees Provident Fund (EPF)</Link>{' '}
        and{' '}
        <Link href="/calculator/nepal-cit/" className="text-[#1A73E8] font-bold hover:underline">Citizen Investment Trust (CIT)</Link>{' '}
        are combined and capped at the lower of one-third of gross income or Rs. 5,00,000. These reduce your taxable income significantly.
      </p>

      {/* SECTION 5: TDS */}
      <h2 id="tds" className="text-2xl font-black text-[#202124] mt-12 mb-4">Tax Deducted at Source (TDS)</h2>
      <p className="text-base text-[#3C4043] mb-4">
        Employers deduct income tax every month before salary is credited to the employee's account. This deduction is called Tax Deducted at Source (TDS). Employers are legally required to deposit the deducted TDS with the Inland Revenue Department each month.
      </p>
      <p className="text-base text-[#3C4043] mb-4">
        Monthly TDS is calculated by projecting the employee's annual taxable income, applying the FY 2083/84 progressive tax slabs, accounting for all eligible deductions, and dividing the resulting annual tax equally across 12 payroll periods. Our{' '}
        <Link href="/calculator/nepal-tds/" className="text-[#1A73E8] font-bold hover:underline">TDS Calculator Nepal</Link>{' '}
        mirrors this exact method used by payroll teams across Nepal.
      </p>

      {/* SECTION 6: SSF */}
      <h2 id="ssf" className="text-2xl font-black text-[#202124] mt-12 mb-4">Social Security Fund (SSF)</h2>
      <p className="text-base text-[#3C4043] mb-4">
        The Social Security Fund provides employees with long-term retirement security while also reducing their annual income tax liability. SSF contributors receive special treatment under the Income Tax Act, including possible relief on the 1% Social Security Tax applied to the first income slab.
      </p>
      <p className="text-base text-[#3C4043] mb-4">
        The SSF structure involves an 11% employee contribution and a 20% employer contribution on basic salary. Both portions are factored into the retirement deduction calculation. For a complete SSF breakdown including employer contributions, use our{' '}
        <Link href="/calculator/nepal-ssf/" className="text-[#1A73E8] font-bold hover:underline">SSF Calculator Nepal</Link>.
      </p>
      <p className="text-base text-[#3C4043] mb-4">
        Employees not enrolled in SSF may instead contribute to the{' '}
        <Link href="/calculator/nepal-provident-fund/" className="text-[#1A73E8] font-bold hover:underline">Employees Provident Fund</Link>{' '}
        or voluntarily invest through the{' '}
        <Link href="/calculator/nepal-cit/" className="text-[#1A73E8] font-bold hover:underline">Citizen Investment Trust</Link>{' '}
        to claim the same retirement deduction benefit under the same combined cap.
      </p>

      {/* SECTION 7: DEDUCTIONS */}
      <h2 id="deductions" className="text-2xl font-black text-[#202124] mt-12 mb-4">Income Tax Deductions Allowed</h2>
      <p className="text-base text-[#3C4043] mb-6">
        Beyond retirement contributions, the following personal deductions are permitted under the Finance Act 2083. These reduce your taxable income and therefore lower your annual income tax and monthly TDS.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="min-w-full text-sm text-left border border-[#DADCE0] rounded-lg">
          <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
            <tr>
              <th className="px-4 py-3 font-bold text-[#202124]">Deduction</th>
              <th className="px-4 py-3 font-bold text-[#202124]">Maximum Allowed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DADCE0]">
            <tr><td className="px-4 py-3 font-semibold">Retirement Fund (SSF / EPF / CIT)</td><td className="px-4 py-3">Lower of 1/3 of gross income or Rs. 5,00,000</td></tr>
            <tr className="bg-gray-50"><td className="px-4 py-3 font-semibold">Life Insurance</td><td className="px-4 py-3">Rs. 40,000</td></tr>
            <tr><td className="px-4 py-3 font-semibold">Medical Insurance</td><td className="px-4 py-3">Rs. 20,000</td></tr>
            <tr className="bg-gray-50"><td className="px-4 py-3 font-semibold">Building Insurance</td><td className="px-4 py-3">Rs. 10,000</td></tr>
            <tr><td className="px-4 py-3 font-semibold">Education Deduction</td><td className="px-4 py-3">25% of tuition, up to Rs. 25,000</td></tr>
            <tr className="bg-gray-50"><td className="px-4 py-3 font-semibold">Donation to Approved Institutions</td><td className="px-4 py-3">Up to Rs. 3,00,000</td></tr>
            <tr><td className="px-4 py-3 font-semibold">CSR (Corporate Social Responsibility)</td><td className="px-4 py-3">Up to 1% of taxable income</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-base text-[#3C4043] mb-4">
        If you are planning for long-term wealth, a{' '}
        <Link href="/calculator/nepal-fixed-deposit/" className="text-[#1A73E8] font-bold hover:underline">Fixed Deposit Calculator</Link>{' '}
        or{' '}
        <Link href="/calculator/nepal-sip/" className="text-[#1A73E8] font-bold hover:underline">SIP Calculator</Link>{' '}
        can help you estimate the returns on savings made after tax.
      </p>

      {/* SECTION 8: EXAMPLES */}
      <h2 id="examples" className="text-2xl font-black text-[#202124] mt-12 mb-4">Example Income Tax Calculations</h2>
      <p className="text-base text-[#3C4043] mb-6">
        The following examples illustrate how the FY 2083/84 progressive tax slabs apply at different income levels. These are pre-deduction estimates — actual tax will be lower after SSF, insurance and other eligible deductions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[
          { title: 'Example 1', salary: 'Rs. 8,00,000',  slabs: '1%',                   tax: 'Rs. 8,000' },
          { title: 'Example 2', salary: 'Rs. 15,00,000', slabs: '1%, 10%',              tax: 'Rs. 60,000' },
          { title: 'Example 3', salary: 'Rs. 25,00,000', slabs: '1%, 10%, 20%',         tax: 'Rs. 1,60,000' },
          { title: 'Example 4', salary: 'Rs. 45,00,000', slabs: '1%, 10%, 20%, 27%, 29%', tax: 'Rs. 6,05,000 (approx)' },
        ].map(ex => (
          <div key={ex.title} className="bg-white border border-[#DADCE0] p-5 rounded-xl shadow-sm">
            <h3 className="text-sm font-black text-[#1A73E8] uppercase tracking-wider mb-3">{ex.title}</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-sm"><span className="text-[#5F6368]">Annual Salary</span><span className="font-bold text-[#202124]">{ex.salary}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#5F6368]">Slabs Applied</span><span className="font-bold text-[#202124]">{ex.slabs}</span></div>
              <div className="flex justify-between text-sm border-t border-[#DADCE0] pt-1 mt-1"><span className="font-bold text-[#202124]">Est. Tax</span><span className="font-black text-[#D93025]">{ex.tax}</span></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#5F6368] mb-4">
        Actual tax will differ after SSF, EPF, CIT, insurance, education and donation deductions are applied. Use the calculator above for a precise result.
      </p>

      {/* SECTION 9: WHO CAN USE */}
      <h2 id="who" className="text-2xl font-black text-[#202124] mt-12 mb-4">Who Can Use This Calculator?</h2>
      <p className="text-base text-[#3C4043] mb-4">This tool is built for:</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 list-none pl-0 mb-4">
        {['Government Employees','Private Employees','HR Managers','Payroll Officers','Chartered Accountants','Tax Consultants','Freelancers','Self-employed Professionals','Business Owners'].map(r => (
          <li key={r} className="flex items-center gap-2 text-sm text-[#202124]">
            <div className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full shrink-0" />{r}
          </li>
        ))}
      </ul>
      <p className="text-base text-[#3C4043] mb-4">
        Employers estimating total Cost to Company (CTC) can also use this tool alongside our{' '}
        <Link href="/calculator/nepal-salary/" className="text-[#1A73E8] font-bold hover:underline">Salary Calculator Nepal</Link>{' '}
        and{' '}
        <Link href="/calculator/nepal-provident-fund/" className="text-[#1A73E8] font-bold hover:underline">Provident Fund Calculator</Link>{' '}
        for a complete employer cost picture.
      </p>

      {/* DISCLAIMER */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-10 mb-4">
        <p className="text-sm font-black text-amber-900 mb-2">Disclaimer</p>
        <p className="text-sm text-amber-800 leading-relaxed">
          This calculator provides an estimate based on the Finance Act 2083 and currently available Inland Revenue Department provisions. Actual tax liability may differ depending on amendments, employer payroll practices, taxable benefits, exemptions or future government notifications. Verify all figures with a qualified tax professional or your employer.
        </p>
      </div>

      {/* SECTION 10: FAQs */}
      <h2 id="faq" className="text-2xl font-black text-[#202124] mt-16 mb-8 border-b border-[#DADCE0] pb-4">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {[
          {
            q: 'How is income tax calculated in Nepal?',
            a: 'Income tax in Nepal is calculated by first determining your annual taxable income after all eligible deductions. The FY 2083/84 progressive tax slabs (1%, 10%, 20%, 27%, 29%) are then applied to each portion of taxable income separately to determine the total annual tax liability.'
          },
          {
            q: 'What is Social Security Tax in Nepal?',
            a: 'Social Security Tax is the 1% tax applied to the first income slab (up to Rs. 10 lakh). Eligible Social Security Fund contributors may qualify for relief on this slab according to prevailing Income Tax Act provisions.'
          },
          {
            q: 'What is Monthly TDS in Nepal?',
            a: 'Tax Deducted at Source (TDS) is the estimated monthly income tax deducted by employers before salary is paid. It is calculated by projecting annual taxable income, applying FY 2083/84 tax slabs and dividing equally across 12 months.'
          },
          {
            q: 'What deductions reduce taxable income?',
            a: 'Eligible deductions include SSF, EPF, CIT (combined retirement cap: Rs. 5 lakh), Life Insurance (Rs. 40,000), Medical Insurance (Rs. 20,000), Building Insurance (Rs. 10,000), Education (Rs. 25,000), Donation (Rs. 3 lakh) and CSR (1% of taxable income) — all subject to the Finance Act 2083 limits.'
          },
          {
            q: 'Is the first Rs. 10 lakh tax free in Nepal?',
            a: 'No. The first Rs. 10 lakh is subject to a 1% Social Security Tax. SSF contributors may qualify for a waiver on this slab under specific conditions in the Income Tax Act.'
          },
          {
            q: 'Is there a different tax slab for married couples?',
            a: 'No. The FY 2083/84 Finance Act removed separate slabs for married and unmarried taxpayers. All resident individuals now follow a single unified progressive tax slab structure.'
          },
          {
            q: 'Is this calculator suitable for payroll?',
            a: 'Yes. The calculator is designed for salaried employees, employers, HR departments, payroll teams, accountants and tax professionals. It produces the same monthly TDS estimate used in standard payroll processing.'
          },
          {
            q: 'Is this calculator updated for the latest Finance Act?',
            a: 'Yes. The calculator follows Finance Act 2083 and Budget 2083/84, including revised tax slabs, updated deduction limits and all personal income tax rule changes published at the time of this update (July 2026).'
          },
          {
            q: 'Does this calculator include the female tax rebate?',
            a: 'Yes. Female taxpayers receive a 10% rebate on their final income tax liability. This is automatically applied when you select the female option in the Tax Settings section of the calculator.'
          },
          {
            q: 'Can I download or print my tax calculation?',
            a: 'Yes. Use the PDF button to generate a formatted income tax report, or use the Print button to print directly. The Copy button copies all key results to your clipboard for easy sharing.'
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="text-lg font-bold text-[#1A73E8] mb-2">{q}</h3>
            <p className="text-base text-[#3C4043]">{a}</p>
          </div>
        ))}
      </div>

      {/* SECTION 11: RELATED CALCULATORS */}
      <h2 id="related" className="text-2xl font-black text-[#202124] mt-16 mb-6">Related Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {[
          ['/calculator/nepal-salary/',            'Salary Calculator Nepal'],
          ['/calculator/nepal-ssf/',               'SSF Calculator Nepal'],
          ['/calculator/nepal-provident-fund/',    'Provident Fund Calculator'],
          ['/calculator/nepal-cit/',               'Citizen Investment Trust Calculator'],
          ['/calculator/nepal-tds/',               'TDS Calculator Nepal'],
          ['/calculator/nepal-bonus/',             'Bonus Tax Calculator'],
          ['/calculator/capital-gains-tax-nepal/', 'Capital Gains Tax Calculator'],
          ['/calculator/nepal-vehicle-tax/',       'Vehicle Tax Calculator'],
          ['/calculator/nepal-vat/',               'VAT Calculator Nepal'],
          ['/tools/currency-converter/',           'Currency Converter'],
          ['/calculator/nepal-fixed-deposit/',     'Fixed Deposit Calculator'],
          ['/calculator/nepal-loan-emi/',          'Loan EMI Calculator'],
          ['/calculator/nepal-sip/',               'SIP Calculator'],
          ['/tools/gold-price-nepal/',             'Gold Price in Nepal'],
        ].map(([href, label]) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 px-4 py-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-sm font-bold text-[#1A73E8] hover:bg-[#E8F0FE] hover:border-[#1A73E8] transition-colors">
            <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full shrink-0" />
            {label}
          </Link>
        ))}
      </div>

      {/* TAX GUIDES */}
      <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 mb-10">
        <p className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">Tax Guides</p>
        <div className="flex flex-wrap gap-3">
          {[
            ['/income-tax/nepal-income-tax-slab-2083-84/', 'Income Tax Slab 2083/84'],
            ['/guides/finance-act-2083/',                  'Finance Act 2083/84'],
            ['/guides/how-to-calculate-income-tax/',       'How to Calculate Income Tax'],
            ['/guides/monthly-tds-guide/',                 'Monthly TDS Guide'],
          ].map(([href, label]) => (
            <Link key={href} href={href}
              className="text-sm font-bold text-[#1A73E8] hover:underline">
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* LAST UPDATED + PAGE INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-[#F8F9FA] border border-[#DADCE0] p-5 rounded-xl">
          <p className="text-xs font-black text-[#5F6368] uppercase tracking-widest mb-3">Last Updated</p>
          <ul className="space-y-1 text-sm text-[#202124]">
            <li><span className="font-bold">Date:</span> July 2026</li>
            <li><span className="font-bold">Law:</span> Finance Act 2083</li>
            <li><span className="font-bold">Budget:</span> Budget Speech 2083/84</li>
            <li><span className="font-bold">Reviewed by:</span> NepaCalc Finance Team</li>
          </ul>
        </div>
        <div className="bg-[#F8F9FA] border border-[#DADCE0] p-5 rounded-xl">
          <p className="text-xs font-black text-[#5F6368] uppercase tracking-widest mb-3">Page Information</p>
          <ul className="space-y-1 text-sm text-[#202124]">
            <li><span className="font-bold">Version:</span> FY 2083/84</li>
            <li><span className="font-bold">Jurisdiction:</span> Nepal</li>
            <li><span className="font-bold">Authority:</span> Inland Revenue Department</li>
            <li><span className="font-bold">Category:</span> Finance Calculator</li>
          </ul>
        </div>
      </div>

      {/* SECTION 12: OFFICIAL RESOURCES — external links only here */}
      <h2 id="references" className="text-2xl font-black text-[#202124] mt-16 mb-4">Official Resources</h2>
      <p className="text-base text-[#3C4043] mb-4">
        All tax rules referenced in this calculator are sourced from the following official Nepal Government publications:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><a href="https://ird.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-bold">Inland Revenue Department (IRD)</a> — Official Nepal tax authority</li>
        <li><a href="https://mof.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-bold">Ministry of Finance Nepal</a> — Budget and Finance Act publications</li>
        <li><a href="https://mof.gov.np/uploads/document/file/1717235287_Finance_Act_2083.pdf" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-bold">Finance Act 2083</a> — Full text of the current Finance Act</li>
        <li><a href="https://ssf.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-bold">Social Security Fund Nepal</a> — SSF contribution and benefit rules</li>
      </ul>

      {/* PAGE FOOTER: DATA SOURCES */}
      <div className="border-t border-[#DADCE0] pt-6 mt-6">
        <p className="text-xs font-black text-[#5F6368] uppercase tracking-widest mb-3">Data Sources</p>
        <div className="flex flex-wrap gap-3 text-xs text-[#5F6368]">
          {['Finance Act 2083','Budget Speech 2083/84','Inland Revenue Department','Ministry of Finance Nepal','Social Security Fund'].map(s => (
            <span key={s} className="bg-[#F8F9FA] border border-[#DADCE0] px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </div>

    </article>
  );
}
