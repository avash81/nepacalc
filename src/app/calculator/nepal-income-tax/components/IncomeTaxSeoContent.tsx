import Link from 'next/link';

export function IncomeTaxSeoContent() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* TABLE OF CONTENTS */}
      <nav className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 mb-12">
        <p className="text-sm font-black text-[#202124] uppercase tracking-widest mb-4">Contents</p>
        <ol className="list-none pl-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            ['#intro',           'Nepal Income Tax Calculator'],
            ['#supported-types', 'Income Types Supported'],
            ['#resident',        'Resident vs Non-Resident Taxation'],
            ['#slabs',           'Income Tax Slabs (FY 2083/84)'],
            ['#female-rebate',   'Female Tax Rebate'],
            ['#allowances',      'Are Allowances Taxable?'],
            ['#other-income',    'Business, Freelance & Rental Income'],
            ['#how',             'How Income Tax Is Calculated'],
            ['#deductions',      'Tax Deductions Allowed'],
            ['#examples',        'Example Calculations'],
            ['#faq',             'Frequently Asked Questions'],
            ['#related',         'Related Calculators'],
            ['#references',      'Official Resources'],
          ].map(([href, label], i) => (
            <li key={href} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-black flex items-center justify-center shrink-0">{i + 1}</span>
              <a href={href} className="text-sm text-[#1A73E8] font-medium hover:underline">{label}</a>
            </li>
          ))}
        </ol>
      </nav>

      {/* SECTION 1: INTRO */}
      <h2 id="intro" className="text-2xl font-black text-[#202124] mt-12 mb-4">Nepal Income Tax Calculator</h2>
      <p className="text-lg leading-relaxed text-[#202124] font-medium mb-4">
        The Nepal Income Tax Calculator helps individuals estimate their annual income tax using the latest FY 2083/84 Finance Act and Inland Revenue Department (IRD) tax rules. Calculate tax on salary income, business income, professional earnings, freelance work, rental income and other taxable income after applying eligible deductions, SSF contributions and progressive tax slabs.
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

      {/* SECTION: INCOME TYPES SUPPORTED */}
      <h2 id="supported-types" className="text-2xl font-black text-[#202124] mt-12 mb-4">Income Types Supported</h2>
      <p className="text-base text-[#3C4043] mb-4">
        This calculator supports personal income earned from multiple sources under Nepal's Income Tax Act.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="min-w-full text-sm text-left border border-[#DADCE0] rounded-lg">
          <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
            <tr>
              <th className="px-4 py-3 font-bold text-[#202124]">Income Type</th>
              <th className="px-4 py-3 font-bold text-[#202124]">Supported</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DADCE0]">
            <tr><td className="px-4 py-3 font-semibold">Salary Income</td><td className="px-4 py-3">Yes</td></tr>
            <tr className="bg-gray-50"><td className="px-4 py-3 font-semibold">Business Income</td><td className="px-4 py-3">Yes</td></tr>
            <tr><td className="px-4 py-3 font-semibold">Professional Income</td><td className="px-4 py-3">Yes</td></tr>
            <tr className="bg-gray-50"><td className="px-4 py-3 font-semibold">Freelance Income</td><td className="px-4 py-3">Yes</td></tr>
            <tr><td className="px-4 py-3 font-semibold">Rental Income</td><td className="px-4 py-3">Yes</td></tr>
            <tr className="bg-gray-50"><td className="px-4 py-3 font-semibold">Mixed Income</td><td className="px-4 py-3">Yes</td></tr>
          </tbody>
        </table>
      </div>

      {/* SECTION: RESIDENT VS NON-RESIDENT */}
      <h2 id="resident" className="text-2xl font-black text-[#202124] mt-12 mb-4">Resident vs Non-Resident Taxation</h2>
      <p className="text-base text-[#3C4043] mb-4">
        Resident individuals are generally taxed on their worldwide income under Nepal's Income Tax Act. Non-resident individuals are generally taxed only on income sourced within Nepal.
      </p>
      <p className="text-base text-[#3C4043] mb-6">
        This calculator is primarily intended for resident individual taxpayers calculating their annual personal income tax liability under the Finance Act 2083.
      </p>

      {/* SECTION 2: TAX SLABS */}
      <h2 id="slabs" className="text-2xl font-black text-[#202124] mt-12 mb-4">Nepal Income Tax Slabs (FY 2083/84)</h2>
      <p className="text-base text-[#3C4043] mb-6">
        The FY 2083/84 Finance Act uses a single unified progressive structure for all resident individuals. The highest personal income tax rate is 29%.
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
        <p className="text-xs text-[#5F6368] mt-2">*The first slab represents Social Security Tax. Eligible SSF contributors may qualify for relief.</p>
      </div>

      {/* SECTION: FEMALE REBATE */}
      <h2 id="female-rebate" className="text-2xl font-black text-[#202124] mt-12 mb-4">Female Tax Rebate</h2>
      <p className="text-base text-[#3C4043] mb-6">
        Female taxpayers may receive a 10% rebate on their final income tax liability where applicable under Nepal's prevailing tax provisions. Selecting the Female option within the calculator automatically applies the rebate during tax computation.
      </p>

      {/* SECTION: ALLOWANCES */}
      <h2 id="allowances" className="text-2xl font-black text-[#202124] mt-12 mb-4">Are Allowances Taxable?</h2>
      <p className="text-base text-[#3C4043] mb-4">
        Most employment allowances and taxable benefits form part of assessable income unless specifically exempt under Nepal's Income Tax Act.
      </p>
      <p className="text-base text-[#3C4043] mb-2">Examples include:</p>
      <ul className="list-disc pl-6 space-y-2 text-base text-[#3C4043] mb-6">
        <li>Housing allowance</li>
        <li>Transport allowance</li>
        <li>Special allowance</li>
        <li>Bonus</li>
        <li>Commission</li>
        <li>Incentive payments</li>
      </ul>
      <p className="text-base text-[#3C4043] mb-6">
        These should generally be included when estimating annual taxable income.
      </p>

      {/* SECTION: OTHER INCOMES */}
      <h2 id="other-income" className="text-2xl font-black text-[#202124] mt-12 mb-4">Business, Freelance &amp; Rental Income</h2>
      
      <h3 className="text-xl font-bold text-[#202124] mt-8 mb-3">Business Income</h3>
      <p className="text-base text-[#3C4043] mb-6">
        Individuals earning income from sole proprietorships or other business activities may use this calculator to estimate personal income tax after allowable deductions.
      </p>

      <h3 className="text-xl font-bold text-[#202124] mt-8 mb-3">Freelance &amp; Professional Income</h3>
      <p className="text-base text-[#3C4043] mb-6">
        Freelancers, consultants, software developers, designers, digital marketers, lawyers, doctors and other professionals may estimate their annual income tax using this calculator. Income earned from multiple clients can be combined when calculating annual taxable income.
      </p>

      <h3 className="text-xl font-bold text-[#202124] mt-8 mb-3">Rental Income</h3>
      <p className="text-base text-[#3C4043] mb-6">
        Rental income received from residential or commercial properties may also form part of taxable income under Nepal's Income Tax Act. Users can include rental earnings within the calculator when estimating total annual taxable income.
      </p>

      {/* FEATURED IMAGE — optimized with WebP and picture tag */}
      <div className="my-10 rounded-xl overflow-hidden border border-[#DADCE0] shadow-md max-w-full">
        <picture>
          <source srcSet="/images/nepal-income-tax-calculator-2083-2084.webp" type="image/webp" />
          <img
            src="/images/nepal-income-tax-calculator-2083-2084.png"
            alt="Nepal Income Tax Calculator FY 2083 2084"
            className="w-full h-auto object-cover max-h-[480px]"
            loading="lazy"
            width={1200}
            height={630}
          />
        </picture>
        <div className="bg-[#F8F9FA] px-4 py-2 text-xs text-[#5F6368]">
          Nepal Income Tax Calculator (FY 2083/84) based on Finance Act 2083
        </div>
      </div>

      {/* SECTION 4: HOW TAX IS CALCULATED */}
      <h2 id="how" className="text-2xl font-black text-[#202124] mt-12 mb-4">How Income Tax Is Calculated in Nepal</h2>
      <p className="text-base text-[#3C4043] mb-6">
        Nepal follows a progressive income tax system. The process works as follows:
      </p>
      <div className="bg-[#F8F9FA] border border-[#DADCE0] p-6 rounded-xl text-center space-y-2 mb-6">
        {[
          'Total Gross Income',
          'Retirement Contributions (SSF / EPF / CIT)',
          'Other Deductions (Insurance, Education, Donation, CSR)',
          'Taxable Income',
          'Progressive Tax Slabs (1% to 29%)',
          'Income Tax',
          'Monthly TDS',
          'Net Income After Tax',
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

      {/* SECTION 7: DEDUCTIONS */}
      <h2 id="deductions" className="text-2xl font-black text-[#202124] mt-12 mb-4">Income Tax Deductions Allowed</h2>
      <p className="text-base text-[#3C4043] mb-6">
        The following personal deductions are permitted under the Finance Act 2083. These reduce your taxable income.
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

      {/* SECTION 8: EXAMPLES */}
      <h2 id="examples" className="text-2xl font-black text-[#202124] mt-12 mb-4">Example Income Tax Calculations</h2>
      <p className="text-base text-[#3C4043] mb-6">
        The following examples illustrate how the FY 2083/84 progressive tax slabs apply for different types of income. These are pre-deduction estimates.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { title: 'Salary Income Example', income: 'Rs. 8,00,000 (Salary)', slabs: '1%', tax: 'Rs. 8,000' },
          { title: 'Business Income Example', income: 'Rs. 12,00,000 (Net Profit)', slabs: '1%, 10%', tax: 'Rs. 30,000' },
          { title: 'Freelancer Example', income: 'Rs. 18,00,000 (Freelance)', slabs: '1%, 10%, 20%', tax: 'Rs. 1,20,000' },
          { title: 'Rental Income Example', income: 'Rs. 24,00,000 (Rent)', slabs: '1%, 10%, 20%', tax: 'Rs. 2,40,000' },
          { title: 'Mixed Income Example', income: 'Rs. 30,00,000 (Total)', slabs: '1%, 10%, 20%, 27%', tax: 'Rs. 3,95,000' },
        ].map(ex => (
          <div key={ex.title} className="bg-white border border-[#DADCE0] p-5 rounded-xl shadow-sm">
            <h3 className="text-sm font-black text-[#1A73E8] uppercase tracking-wider mb-3">{ex.title}</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-sm"><span className="text-[#5F6368]">Annual Income</span><span className="font-bold text-[#202124]">{ex.income}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#5F6368]">Slabs Applied</span><span className="font-bold text-[#202124]">{ex.slabs}</span></div>
              <div className="flex justify-between text-sm border-t border-[#DADCE0] pt-1 mt-1"><span className="font-bold text-[#202124]">Est. Tax</span><span className="font-black text-[#D93025]">{ex.tax}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 10: FAQs */}
      <h2 id="faq" className="text-2xl font-black text-[#202124] mt-16 mb-8 border-b border-[#DADCE0] pb-4">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {[
          {
            q: 'What is the income tax on Rs. 50,000 monthly salary in Nepal?',
            a: 'Income tax depends on annual taxable income, retirement contributions, insurance deductions and other eligible deductions. Use the calculator to estimate your exact tax liability.',
          },
          {
            q: 'How much tax do I pay on Rs. 1 lakh monthly salary?',
            a: 'Tax is calculated progressively using Nepal\'s FY 2083/84 tax slabs. The calculator automatically applies each slab to estimate annual tax and monthly TDS.',
          },
          {
            q: 'Can freelancers use this calculator?',
            a: 'Yes. Freelancers, consultants and self-employed professionals can estimate their annual personal income tax using this calculator.',
          },
          {
            q: 'Can business owners use this calculator?',
            a: 'Yes. Individual business income may be entered when estimating annual personal income tax.',
          },
          {
            q: 'Can I get a tax refund in Nepal?',
            a: 'Tax refunds may be available where excess tax has been paid or where adjustments are permitted under Inland Revenue Department procedures.',
          },
          {
            q: 'How is income tax calculated in Nepal?',
            a: 'Income tax in Nepal is calculated by first determining your annual taxable income after all eligible deductions. The FY 2083/84 progressive tax slabs (1%, 10%, 20%, 27%, 29%) are then applied to each portion of taxable income separately to determine the total annual tax liability.',
          },
          {
            q: 'What is Monthly TDS in Nepal?',
            a: 'Tax Deducted at Source (TDS) is the estimated monthly income tax deducted by employers before salary is paid. It is calculated by projecting annual taxable income, applying FY 2083/84 tax slabs and dividing equally across 12 months.',
          },
          {
            q: 'What deductions reduce taxable income?',
            a: 'Eligible deductions include SSF, EPF, CIT (combined retirement cap: Rs. 5 lakh), Life Insurance (Rs. 40,000), Medical Insurance (Rs. 20,000), Building Insurance (Rs. 10,000), Education (Rs. 25,000), Donation (Rs. 3 lakh) and CSR (1% of taxable income) — all subject to the Finance Act 2083 limits.',
          },
          {
            q: 'Is this calculator updated for the latest Finance Act?',
            a: 'Yes. The calculator follows Finance Act 2083 and Budget 2083/84, including revised tax slabs, updated deduction limits and all personal income tax rule changes published at the time of this update.',
          },
          {
            q: 'Does this calculator include the female tax rebate?',
            a: 'Yes. Female taxpayers receive a 10% rebate on their final income tax liability. This is automatically applied when you select the female option in the Tax Settings section of the calculator.',
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
          ['/calculator/nepal-provident-fund/',    'Provident Fund Calculator Nepal'],
          ['/calculator/nepal-tds/',               'TDS Calculator Nepal'],
          ['/calculator/capital-gains-tax-nepal/', 'Capital Gains Tax Calculator'],
          ['/calculator/sip-calculator/',          'SIP Calculator'],
          ['/calculator/fixed-deposit/',           'Fixed Deposit Calculator'],
          ['/calculator/loan-emi/',                'Loan EMI Calculator'],
          ['/income-tax/nepal-income-tax-slab-2083-84/', 'Income Tax Slab 2083/84'],
          ['/income-tax/how-to-calculate-income-tax-nepal/', 'How to Calculate Income Tax in Nepal'],
        ].map(([href, label]) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 px-4 py-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-sm font-bold text-[#1A73E8] hover:bg-[#E8F0FE] hover:border-[#1A73E8] transition-colors">
            <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full shrink-0" />
            {label}
          </Link>
        ))}
      </div>

      {/* SECTION 12: OFFICIAL RESOURCES */}
      <h2 id="references" className="text-2xl font-black text-[#202124] mt-16 mb-4">Official Resources</h2>
      <p className="text-base text-[#3C4043] mb-4">
        All tax rules referenced in this calculator are sourced from the following official Nepal Government publications:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><a href="https://ird.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-bold">Inland Revenue Department</a> — Official Nepal tax authority</li>
        <li><a href="https://mof.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-bold">Ministry of Finance Nepal</a> — Budget and Finance Act publications</li>
        <li><a href="https://mof.gov.np/uploads/document/file/1717235287_Finance_Act_2083.pdf" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-bold">Finance Act 2083</a> — Full text of the current Finance Act</li>
        <li><a href="https://ssf.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-bold">Social Security Fund Nepal</a> — SSF contribution and benefit rules</li>
      </ul>

      {/* LAST UPDATED + PAGE INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-[#F8F9FA] border border-[#DADCE0] p-5 rounded-xl">
          <p className="text-xs font-black text-[#5F6368] uppercase tracking-widest mb-3">Last Updated</p>
          <ul className="space-y-1 text-sm text-[#202124]">
            <li><span className="font-bold">Date:</span> July 2026</li>
            <li><span className="font-bold">Law:</span> Finance Act 2083</li>
            <li><span className="font-bold">Budget:</span> Budget 2083/84</li>
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

    </article>
  );
}
