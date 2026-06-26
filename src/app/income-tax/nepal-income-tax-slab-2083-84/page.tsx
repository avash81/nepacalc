import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: "Nepal Income Tax Slab 2083/84 & Budget Highlights — New IRD Rates",
  description: "Complete guide to Nepal Budget 2083/84. 1% tax up to Rs. 10 lakh, new VAT rules, excise duties, tax reliefs, and sector-wise budget allocations.",
  slug: 'income-tax/nepal-income-tax-slab-2083-84',
  canonical: '/income-tax/nepal-income-tax-slab-2083-84/',
  keywords: [
    "nepal income tax slab 2083/84",
    "new tax slab nepal 2083 84",
    "nepal budget highlights 2083/84",
    "budget 2083 84 nepal",
    "income tax rate nepal 2083/84",
    "finance act 2083"
  ],
  ogImage: 'https://nepacalc.com/images/nepal-income-tax-slab-2083-84.webp'
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Income Tax", "item": "https://nepacalc.com/income-tax/" },
      { "@type": "ListItem", "position": 3, "name": "Nepal Income Tax Slab 2083/84", "item": "https://nepacalc.com/income-tax/nepal-income-tax-slab-2083-84/" }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/income-tax/nepal-income-tax-slab-2083-84/",
    "url": "https://nepacalc.com/income-tax/nepal-income-tax-slab-2083-84/",
    "name": "Nepal Income Tax Slab 2083/84 & Budget Highlights",
    "description": "Complete guide to Nepal income tax slab 2083/84 and Budget Highlights. New unified 5-band structure, doubled threshold, 29% top rate, and sector-wise allocations.",
    "inLanguage": "en-NP",
    "datePublished": "2026-06-15",
    "dateModified": "2026-07-01",
    "isPartOf": { "@type": "WebSite", "name": "NepaCalc", "url": "https://nepacalc.com" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="bg-[#F1F3F4] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex text-sm text-slate-500 space-x-2">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><span className="mx-2">&gt;</span></li>
              <li><Link href="/income-tax/" className="hover:text-blue-600">Income Tax</Link></li>
              <li><span className="mx-2">&gt;</span></li>
              <li className="text-slate-700 font-semibold" aria-current="page">Nepal Income Tax Slab 2083/84 & Budget Highlights</li>
            </ol>
          </nav>

          <main className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
            
            <h1 className="text-3xl font-black text-slate-900 mb-6">Nepal Income Tax Slab 2083/84 & Budget Highlights</h1>

            <div className="bg-slate-50 border-l-4 border-blue-600 p-4 mb-6 not-prose">
              <p className="text-sm text-slate-700 m-0">📅 <strong>Last Updated:</strong> Jestha 2083 (June 2026) — Finance Act 2083</p>
              <p className="text-sm text-slate-700 m-0">✍️ <strong>Reviewed by:</strong> NepaCalc Research Team</p>
            </div>

            <p>The Nepal FY 2083/84 budget introduced sweeping reforms across personal income tax, VAT, excise duties, and sector allocations. This guide covers the new unified income tax slabs, structural tax changes, and comprehensive budget highlights.</p>
            <p>To calculate your exact tax, use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline font-bold">Income Tax Calculator Nepal</Link>.</p>

            <hr className="my-8" />

            {/* A. COLLECTION AND APPLICATION SUMMARY */}
            <h2 className="text-2xl font-black text-slate-900 mb-4">A. Collection and Application Summary</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6 not-prose">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Sources of Funds (Billion NPR)</h3>
                <table className="min-w-full bg-white border border-slate-200 text-sm">
                  <thead className="bg-slate-50"><tr><th className="py-2 px-3 border-b text-left">Source</th><th className="py-2 px-3 border-b text-right">2083/84</th><th className="py-2 px-3 border-b text-right">2082/83</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1.5 px-3 border-b">Tax Revenue</td><td className="py-1.5 px-3 border-b text-right">1405.31 (66%)</td><td className="py-1.5 px-3 border-b text-right">1315.00 (67%)</td></tr>
                    <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Loans & Borrowings</td><td className="py-1.5 px-3 border-b text-right">657.29 (31%)</td><td className="py-1.5 px-3 border-b text-right">595.66 (30%)</td></tr>
                    <tr><td className="py-1.5 px-3 border-b">Foreign Grant</td><td className="py-1.5 px-3 border-b text-right">61.74 (3%)</td><td className="py-1.5 px-3 border-b text-right">53.45 (3%)</td></tr>
                    <tr className="bg-slate-800 text-white font-bold"><td className="py-1.5 px-3 border-b">Total</td><td className="py-1.5 px-3 border-b text-right">2124.34</td><td className="py-1.5 px-3 border-b text-right">1964.11</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Application of Funds (Billion NPR)</h3>
                <table className="min-w-full bg-white border border-slate-200 text-sm">
                  <thead className="bg-slate-50"><tr><th className="py-2 px-3 border-b text-left">Application</th><th className="py-2 px-3 border-b text-right">2083/84</th><th className="py-2 px-3 border-b text-right">2082/83</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1.5 px-3 border-b">Recurring Expenditure</td><td className="py-1.5 px-3 border-b text-right">1270.58 (60%)</td><td className="py-1.5 px-3 border-b text-right">1180.98 (60%)</td></tr>
                    <tr className="bg-slate-50"><td className="py-1.5 px-3 border-b">Capital Expenditure</td><td className="py-1.5 px-3 border-b text-right">431.11 (20%)</td><td className="py-1.5 px-3 border-b text-right">407.89 (21%)</td></tr>
                    <tr><td className="py-1.5 px-3 border-b">Debt Financing</td><td className="py-1.5 px-3 border-b text-right">422.65 (20%)</td><td className="py-1.5 px-3 border-b text-right">375.24 (19%)</td></tr>
                    <tr className="bg-slate-800 text-white font-bold"><td className="py-1.5 px-3 border-b">Total</td><td className="py-1.5 px-3 border-b text-right">2124.34</td><td className="py-1.5 px-3 border-b text-right">1964.11</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-4 not-prose mb-8">
              <div className="flex-1 bg-green-50 p-4 border border-green-200 rounded-lg text-center">
                <div className="text-sm font-bold text-green-700">Expected Economic Growth</div>
                <div className="text-2xl font-black text-green-900">7.0%</div>
                <div className="text-xs text-green-600 mt-1">(Up from 4.61% in 2082/83)</div>
              </div>
              <div className="flex-1 bg-blue-50 p-4 border border-blue-200 rounded-lg text-center">
                <div className="text-sm font-bold text-blue-700">Expected Inflation</div>
                <div className="text-2xl font-black text-blue-900">6.0%</div>
                <div className="text-xs text-blue-600 mt-1">(Up from 5.44% in 2082/83)</div>
              </div>
            </div>

            <hr className="my-8" />

            {/* B. MAJOR HIGHLIGHTS */}
            <h2 className="text-2xl font-black text-slate-900 mb-4">B. Major Budget Highlights</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Income Tax Slabs Unified:</strong> Exemption limit raised to Rs. 10,00,000 for individuals, with maximum rate reduced from 39% to 29%. Single and married slabs are unified.</li>
              <li><strong>Government Restructuring:</strong> Rs. 20 Arba initial savings expected by reducing ministries from 22 to 18. 31 entities abolished, 6 merged, 6 transferred.</li>
              <li><strong>Public Servant Salary Hike:</strong> Initial salary scale increased by 10%, plus a performance-based monthly allowance equivalent to 10% of revised salary (approx 21% net increase).</li>
              <li><strong>VAT on Utilities & Platforms:</strong> 5% VAT levied on electricity consumption over 50 units and on ride-sharing platforms.</li>
              <li><strong>E-Assessment & Audit:</strong> Tax audit period fixed at 3 years (down from 4). AI-driven e-assessment system to be developed.</li>
              <li><strong>CBMS Integration:</strong> All businesses with annual transactions above Rs. 10 Crore must mandatorily link electronic invoices to CBMS.</li>
              <li><strong>Customs & Excise Rationalization:</strong> Excise duty abolished on 360 goods. Customs reduced on 273 raw materials. 11 custom tiers reduced to 7.</li>
              <li><strong>Capital Gains Tax:</strong> Now clarified as final withholding. Increased from 5% to 7.5% (sale &lt; 1 year / 5 years for real estate) and 7.5% to 10% (sale &gt; 1 year / 5 years for real estate).</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">New Income Tax Slabs FY 2083/84</h3>
            <div className="overflow-x-auto mb-4 not-prose slab-table">
              <table className="min-w-full bg-white border border-slate-200">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left font-bold">Annual Taxable Income (NPR)</th>
                    <th className="py-3 px-4 text-left font-bold">Tax Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-2 px-4 border-b">Up to Rs. 10,00,000</td><td className="py-2 px-4 border-b font-semibold text-green-700">1% — Social Security Tax</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 10,00,001 to Rs. 15,00,000</td><td className="py-2 px-4 border-b font-semibold">10%</td></tr>
                  <tr><td className="py-2 px-4 border-b">Rs. 15,00,001 to Rs. 25,00,000</td><td className="py-2 px-4 border-b font-semibold">20%</td></tr>
                  <tr className="bg-slate-50"><td className="py-2 px-4 border-b">Rs. 25,00,001 to Rs. 40,00,000</td><td className="py-2 px-4 border-b font-semibold">27%</td></tr>
                  <tr><td className="py-2 px-4 border-b">Above Rs. 40,00,000</td><td className="py-2 px-4 border-b font-semibold text-red-600">29%</td></tr>
                </tbody>
              </table>
              <p className="text-sm font-semibold text-slate-700 mt-2">1% tax is waived for SSF contributors. The separate married couple threshold has been eliminated.</p>
            </div>

            <hr className="my-8" />

            {/* C. SECTOR WISE SUMMARY */}
            <h2 className="text-2xl font-black text-slate-900 mb-4">C. Sector Wise Summary</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg text-slate-800 border-b pb-2">1. Information Technology</h3>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>Nepal’s first Sovereign AI Computer Center to be established in Syuchatar, Kathmandu.</li>
                  <li>Special fellowship to return 15 Nepali AI researchers from abroad.</li>
                  <li>Nagarik App upgraded with 12+ new features.</li>
                  <li>Minimum 1% of Capital Budget strictly allocated for Science & Research.</li>
                  <li>Government divestment in Nepal Telecom (from 91% down to 66%) to fund technology hub development.</li>
                  <li><strong>Digital Service Tax (DST):</strong> 2% on non-resident electronic services and data sales (Exempt if annual transactions are up to Rs. 30 Lakhs).</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 border-b pb-2">2. Health & Education</h3>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li><strong>Budget:</strong> Rs. 218.30 Billion (Education) & Rs. 96.43 Billion (Health).</li>
                  <li><strong>Education Equity Fee (3%):</strong> Levied on all private education institutes (except training).</li>
                  <li><strong>Health Equity Fee (3%):</strong> Levied on all private health institution service fees.</li>
                  <li><strong>Foreign Study Tax:</strong> 3% Education Service Fee levied by BFIs on foreign currency exchange for tuition.</li>
                  <li>Paid internship system to be institutionalized.</li>
                  <li>Income earned by Universities operating in Nepal via main objectives are now Exempt from Tax.</li>
                  <li>Night duty allowance for nurses in public facilities doubled to Rs. 300/night.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 border-b pb-2">3. Transportation & Ride Sharing</h3>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li><strong>Ride Sharing:</strong> 5% VAT (Reverse Charge) and 1% Advance Tax on ride-sharing platforms (Pathao, InDrive).</li>
                  <li>Third-party vehicle insurance raised to Rs. 1 million.</li>
                  <li>Electric Vehicle customs to be levied on ad-valorem basis (replacing peak-power-capacity system).</li>
                  <li>New strict fines and confiscation policies for vehicles caught with smuggled/excise-evading goods.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 border-b pb-2">4. Agriculture, Food & Beverages</h3>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>Rs. 32.46 Billion for fertilizer; establishment of 'Green Urea' industry.</li>
                  <li>No tax on windfall gain income (prizes/awards) for agriculture.</li>
                  <li>Section 11(6) broadened: Fruit cultivation, animal husbandry, fisheries, and beekeeping now qualify as agricultural businesses for exemptions.</li>
                  <li>Electronic Track & Trace System mandated for liquor and tobacco. Penalty for non-compliance is 200% of claimed amount or Rs. 1 lakh (whichever is higher).</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 border-b pb-2">5. Capital Market & Real Estate</h3>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>Capital Gains Tax on securities/real estate explicitly clarified as final withholding (Sec 92).</li>
                  <li>Exemption from capital gains when donating property to the government.</li>
                  <li>New concessional 2.5% CGT rate for involuntary government acquisition.</li>
                </ul>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Amendments in Income Tax Act</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Safe Harbor Rule (Sec 33Ka):</strong> Simplifies arm's length pricing for controlled transactions up to Rs. 1 billion. Applies for 5 consecutive years.</li>
              <li><strong>Advance Pricing Agreement (Sec 33Kha):</strong> Nepal introduces APAs for the first time for transfer pricing certainty, including unilateral and bilateral APAs with a rollback facility for 4 prior years.</li>
              <li><strong>Deductions:</strong> Max donation limit (Sec 12) raised to Rs. 3,00,000. New CSR deduction (Sec 12Gha) up to 1% of taxable income. Private building insurance limit doubled to Rs. 10,000.</li>
              <li><strong>Tuition Deduction:</strong> Resident natural persons can deduct 25% of annual tuition paid to a resident person (max Rs. 25,000/year).</li>
              <li><strong>Cash Limits:</strong> Expenses paid in cash exceeding Rs. 25,000 are non-deductible (applicable to all persons, overriding the old 50k limit).</li>
              <li><strong>TDS Changes:</strong> 20% TDS on insurance agents (up from 15%). 1.5% TDS on consumer committees (exceeding 50 Lakhs) repealed.</li>
              <li><strong>Refund Claim Window:</strong> Extended from 2 years to 5 years (Sec 113(4)).</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Amendments in Value Added Tax (VAT)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Digital Payment Rebate:</strong> Consumers making digital payments on notified goods/services get a 10% instant rebate at the invoice point.</li>
              <li><strong>Digital Invoices (CBMS):</strong> Department can mandate designated taxpayers to use CBMS. Fine of Rs. 5 Lakh for tampering with invoicing software.</li>
              <li><strong>Fines:</strong> General violation fine increased from Rs. 1,000 to Rs. 10,000. New Rs. 50,000 fine for unauthorized internal transfer of commercial goods.</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-black text-slate-900 mb-4">Tax Reliefs & Concessions</h2>
            <div className="bg-slate-50 p-6 rounded-lg mb-6 text-sm">
              <ul className="list-disc pl-5 space-y-3">
                <li><strong>Gen-Z Movement Damages:</strong> Uninsured stock destroyed during protests can be claimed as COGS without losing input VAT. 50% duty exemption for importing goods to restore damaged businesses. Destroyed excise stamps can be written off.</li>
                <li><strong>Shipping Containers:</strong> Held containers can be released without demurrage fees if applied by Mangsir 2083.</li>
                <li><strong>PAN Regularisation:</strong> Persons getting a PAN and filing FY 2079/80-2082/83 get full waiver of all fees/interest for earlier years.</li>
                <li><strong>Outstanding Taxes:</strong> Self-assessed or IRD-assessed outstanding VAT, income tax, or excise as of 15 Jestha 2083 can be settled by paying principal + 1% by Poush 2083 (full waiver of penalties/interest).</li>
                <li><strong>Bank Guarantees:</strong> Bonded warehouse industries failing to export can get guarantees released by exporting finished products by Mangsir 2083.</li>
              </ul>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
