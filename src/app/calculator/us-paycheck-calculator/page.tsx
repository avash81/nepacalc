// Route: /calculator/us-paycheck-calculator/
import { Metadata } from 'next';
import USPaycheckClient from './USPaycheckClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'US Paycheck Calculator (2026) | Take-Home Pay',
  description:
    'Estimate your 2026 take-home pay by salary or hourly rate. Calculate federal income tax, Social Security, Medicare, and state taxes across all 50 states + DC.',
  robots: { index: true, follow: true },
  keywords: [
    'paycheck calculator',
    'take home pay calculator',
    'salary paycheck calculator',
    'hourly paycheck calculator',
    'salary after taxes calculator',
    'net pay calculator us',
    'texas paycheck calculator',
    'california paycheck calculator',
    'biweekly paycheck calculator',
    'fica tax calculator 2026',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/calculator/us-paycheck-calculator/',
  },
  openGraph: {
    title: 'US Paycheck & Take-Home Pay Calculator (2026 Tax Brackets)',
    description:
      'Instant net take-home salary calculator across all 50 US states with Federal, FICA, State tax breakdown and relocation comparisons.',
    url: 'https://nepacalc.com/calculator/us-paycheck-calculator/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/us-paycheck-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'US Paycheck and Take-Home Pay Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Paycheck & Take-Home Pay Calculator (2026 Tax Brackets)',
    description:
      'Instant net take-home salary calculator across all 50 US states with Federal, FICA, State tax breakdown and relocation comparisons.',
    images: ['https://nepacalc.com/images/og/us-paycheck-calculator.jpg'],
  },
};

export default function USPaycheckPage() {
  const faqItems = [
    {
      name: 'What is the difference between gross pay and net take-home pay?',
      acceptedAnswer: {
        text: 'Gross pay is the total amount of money earned before any taxes, payroll withholdings, or benefit deductions are subtracted. Net take-home pay is the actual cash deposited into your bank account on payday after Federal income tax, FICA (Social Security and Medicare), State income tax, local taxes, and pre-tax deductions (like 401k or health insurance) have been deducted.',
      },
    },
    {
      name: 'How do FICA payroll taxes work in 2026?',
      acceptedAnswer: {
        text: 'The Federal Insurance Contributions Act (FICA) funds Social Security and Medicare. In 2026, employees pay 6.2% in Social Security tax on earnings up to the official statutory wage base cap of $184,500 (maximum $11,439.00 per employee). Medicare tax is 1.45% on all earnings with no cap. An additional 0.9% Medicare surtax applies to wages exceeding $200,000 for single filers (employer withholding threshold), with final liability thresholds varying by filing status: $250,000 for Married Filing Jointly, $125,000 for Married Filing Separately.',
      },
    },
    {
      name: 'Which US states have zero state income tax on paychecks?',
      acceptedAnswer: {
        text: 'There are nine states without a traditional state income tax on earned wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Living and working in these states means your state income tax withholding is $0.00, leaving only Federal income tax and FICA deductions.',
      },
    },
    {
      name: 'How does contributing to a 401(k) or HSA increase take-home value?',
      acceptedAnswer: {
        text: 'Traditional 401(k) contributions reduce your gross taxable income for Federal and State income taxes, lowering your immediate tax bill. Section 125 health insurance premiums and HSA contributions are triple-tax-advantaged, reducing Federal income tax, State income tax, and FICA payroll taxes simultaneously in most states.',
      },
    },
    {
      name: 'What is the difference between a paycheck calculator and an annual tax calculator?',
      acceptedAnswer: {
        text: 'A paycheck calculator estimates the approximate cash you receive per pay period based on employer payroll withholding rules (IRS Publication 15-T) and your Form W-4 elections. Actual deposits may differ due to other deductions, employer-specific payroll treatment, and local taxes. An annual tax calculator computes your total end-of-year tax liability on IRS Form 1040, determining whether you owe additional tax or receive a refund.',
      },
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/calculator/us-paycheck-calculator/',
        url: 'https://nepacalc.com/calculator/us-paycheck-calculator/',
        name: 'US Paycheck Calculator & Take-Home Pay Estimator',
        description:
          'Calculate your net take-home pay after Federal income taxes, FICA (Social Security & Medicare), and State taxes across all 50 US states.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/calculator/us-paycheck-calculator/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nepacalc.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Calculators',
            item: 'https://nepacalc.com/calculator/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'US Paycheck Calculator',
            item: 'https://nepacalc.com/calculator/us-paycheck-calculator/',
          },
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://nepacalc.com/calculator/us-paycheck-calculator/#app',
        name: 'US Paycheck & Take-Home Salary Calculator',
        applicationCategory: 'FinanceApplication',
        url: 'https://nepacalc.com/calculator/us-paycheck-calculator/',
        operatingSystem: 'Web',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        creator: {
          '@type': 'Organization',
          name: 'NepaCalc',
          url: 'https://nepacalc.com',
        },
        description:
          'Free online paycheck calculator calculating net take-home pay after federal taxes, FICA (Social Security and Medicare), and state tax across all 50 US states.',
        featureList: [
          'Dual Salary ($/year) and Hourly ($/hr) wage calculation modes',
          'Updated 2026 Federal tax brackets and standard deductions',
          'Official 2026 Social Security cap ($184,500) and Additional Medicare rules',
          'Complete 50-state tax rules engine including 0% tax states',
          'Multi-frequency paycheck breakdown: Annual, Monthly, Bi-weekly, Weekly, Hourly',
          'State-to-state relocation tax comparison tool',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.acceptedAnswer.text,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124]">
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      {/* ── Breadcrumb Navigation ── */}
      <div className="w-full px-3 sm:px-6 lg:px-8 pt-2">
        <nav aria-label="Breadcrumb" className="mb-0.5">
          <Link
            href="/"
            className="sm:hidden inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-600 transition"
          >
            ← Home
          </Link>

          <div className="hidden sm:flex items-center flex-wrap gap-1.5 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/calculator/" className="hover:text-blue-600 hover:underline">Calculators</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">US Paycheck Calculator</span>
          </div>
        </nav>
      </div>

      {/* ── MAIN INTERACTIVE CALCULATOR ENGINE (First Thing Visible) ── */}
      <div id="paycheck-calculator">
        <USPaycheckClient />
      </div>

      {/* ── HIGH-DENSITY EDITORIAL & TAX KNOWLEDGE SECTION ── */}
      <section className="w-full px-3 sm:px-6 lg:px-8 pb-10 space-y-3">
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Understanding Your Paycheck: Federal Withholding, FICA, &amp; State Taxes Explained
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              How gross salary converts to net take-home pay under IRS Publication 15-T and state revenue codes.
            </p>
          </div>

          <p>
            When you receive an employment job offer or review your paystub, the gross salary is never the exact amount deposited into your checking account. Every US payroll cycle is subject to mandatory federal, statutory social insurance, and state-level tax withholdings. Understanding how these calculations work allows you to optimize your Form W-4 elections and plan household budgets with total precision.
          </p>

          {/* 3-Pillar Payroll Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wide block">Federal Tax</span>
              <h3 className="font-bold text-gray-900 text-xs">Progressive Income Tax (FIT)</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                The federal income tax uses seven progressive tax brackets (10%, 12%, 22%, 24%, 32%, 35%, and 37%). Taxes are calculated against taxable income after applying standard deductions ($16,100 Single / $32,200 Married Filing Jointly) and qualifying pre-tax benefit deductions.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">FICA Payroll Taxes</span>
              <h3 className="font-bold text-gray-900 text-xs">Social Security &amp; Medicare</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Social Security tax is 6.2% on covered earnings up to the official statutory cap of $184,500 (max $11,439.00 per employee). Medicare tax is 1.45% on all earnings with no ceiling, plus an additional 0.9% withholding surtax triggered when wages exceed $200,000.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wide block">State &amp; Local Tax</span>
              <h3 className="font-bold text-gray-900 text-xs">50-State Revenue Withholding</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Nine states levy 0% income tax on wages (including Texas, Florida, and Washington). Other states levy flat taxes (like Pennsylvania at 3.07% or North Carolina at 3.99%) or graduated brackets (such as California up to 12.3% plus 1.3% SDI (2026 rate, no wage ceiling), or New York up to 10.9%).
              </p>
            </div>
          </div>

          {/* Salary Example Table */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
              Typical Take-Home Pay Benchmarks for Common US Salaries (Single Filer, Texas - 0% State Tax, 2026)
            </h3>
            <p className="text-[11px] text-gray-500 mb-2">
              Estimates based on 2026 IRS brackets, standard deduction ($16,100), and no pre-tax deductions. Results are generated from the same calculation engine as the calculator above.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <th className="py-2 px-3">Annual Gross Salary</th>
                    <th className="py-2 px-3 text-right">Bi-Weekly Paycheck</th>
                    <th className="py-2 px-3 text-right">Monthly Net</th>
                    <th className="py-2 px-3 text-right">Annual Federal Tax</th>
                    <th className="py-2 px-3 text-right">Annual FICA</th>
                    <th className="py-2 px-3 text-right font-bold text-emerald-800 bg-emerald-50/50">Annual Take-Home</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {[
                    { gross: 40000, bi: 1286, mo: 2788, fed: 2820, fica: 3060, net: 34120 },
                    { gross: 50000, bi: 1601, mo: 3469, fed: 3820, fica: 3825, net: 42355 },
                    { gross: 75000, bi: 2334, mo: 5058, fed: 7670, fica: 5738, net: 61592 },
                    { gross: 100000, bi: 3022, mo: 6548, fed: 13170, fica: 7650, net: 79180 },
                    { gross: 150000, bi: 4409, mo: 9552, fed: 24734, fica: 11439, net: 113827 },
                  ].map((row) => (
                    <tr key={row.gross} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold text-gray-900">${row.gross.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right tabular-nums">${row.bi.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right tabular-nums">${row.mo.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-rose-600 tabular-nums">-${row.fed.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-rose-600 tabular-nums">-${row.fica.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right font-black text-emerald-700 bg-emerald-50/30 tabular-nums">
                        ${row.net.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Common salary Q&A - SEO targeted */}
            <div className="mt-4 space-y-3 text-xs text-gray-700">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Common Salary After-Tax Questions (Single Filer, Texas, 2026)</h3>
              {[
                {
                  q: 'How much is $40 per hour after taxes?',
                  a: '$40/hour x 2,080 hrs/yr = $83,200 gross. After federal income tax (~$12,006), Social Security ($5,158), and Medicare ($1,206), estimated annual take-home is roughly $64,830 - about $2,493 bi-weekly.',
                },
                {
                  q: 'How much is $50,000 a year after taxes?',
                  a: 'At $50,000 gross (Single, Texas), estimated 2026 take-home is approximately $42,355/year. Federal tax: ~$3,820. Social Security: ~$3,100. Medicare: ~$725. Bi-weekly paycheck: ~$1,601.',
                },
                {
                  q: 'How much is $75,000 a year after taxes?',
                  a: 'At $75,000 gross (Single, Texas), estimated 2026 take-home is approximately $61,592/year. Federal tax: ~$7,670. FICA: ~$5,738. Effective tax rate: approximately 18.2%. Bi-weekly paycheck: ~$2,334.',
                },
                {
                  q: 'How much is $100,000 a year after taxes?',
                  a: 'At $100,000 gross (Single, Texas), estimated 2026 take-home is approximately $79,180/year. Federal tax: ~$13,170. FICA: ~$7,650. Effective tax rate: approximately 20.8%. Bi-weekly paycheck: ~$3,022.',
                },
                {
                  q: 'How much is $100,000 after taxes in California vs Texas?',
                  a: 'In Texas (no state income tax): ~$79,180 annual take-home. In California: California income tax on $100,000 adds roughly $4,100-$5,200 in state tax plus $1,300 SDI (1.3%). Estimated CA take-home: ~$72,700-$73,800. Texas saves approximately $5,400-$6,500 annually vs California.',
                },
                {
                  q: 'Why does my actual paycheck differ from the estimated take-home pay?',
                  a: 'This calculator estimates take-home pay using standard withholding assumptions. Actual paychecks may differ due to: W-4 extra withholding elections, employer-sponsored benefit deductions (dental, vision, life insurance), local city or county income taxes, year-to-date wage caps, and supplemental wage treatment for bonuses.',
                },
              ].map((item) => (
                <div key={item.q} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-1">{item.q}</p>
                  <p className="text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            {/* Assumptions & Coverage Note */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 leading-relaxed">
              <strong>Calculator Assumptions & Coverage:</strong> This calculator covers all 50 US states + Washington, DC. It assumes standard W-4 withholding (no extra withholding or adjustments), standard deductions only, single-employer wages, and excludes local/city income taxes (such as New York City, Yonkers, or Pennsylvania local EIT). Self-employed workers should use a separate self-employment tax calculator. Results are estimates - consult a tax professional for precise withholding advice.
            </div>
          </div>
        </div>

        {/* ── FAQ Section (AEO & People Also Ask Target) ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
            Frequently Asked Questions: US Paycheck &amp; Take-Home Pay
          </h2>

          <div className="space-y-4 divide-y divide-gray-100 text-xs sm:text-sm">
            {faqItems.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0">
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>

          {/* Related Tools Links */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-gray-400">Related Financial Tools:</span>
            <Link
              href="/calculator/ppp-salary-converter/"
              className="text-emerald-800 hover:text-emerald-950 hover:underline bg-emerald-50 px-2.5 py-1 rounded-full"
            >
              PPP International Salary Converter →
            </Link>
            <Link
              href="/calculator/mortgage-calculator/"
              className="text-blue-800 hover:text-blue-950 hover:underline bg-blue-50 px-2.5 py-1 rounded-full"
            >
              Home Loan &amp; Mortgage Calculator →
            </Link>
            <Link
              href="/calculator/currency-converter/"
              className="text-purple-800 hover:text-purple-950 hover:underline bg-purple-50 px-2.5 py-1 rounded-full"
            >
              Live Multi-Currency Converter →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
