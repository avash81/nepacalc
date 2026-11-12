// Route: /calculator/us-paycheck-calculator/
import { Metadata } from 'next';
import USPaycheckClient from './USPaycheckClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'US Paycheck Calculator: Estimate Take-Home Pay',
  description:
    'Calculate your net take-home pay by salary or hourly rate. Estimate federal income tax, Social Security, Medicare, and state taxes across all 50 US states.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nepacalc.com/calculator/us-paycheck-calculator/',
  },
  openGraph: {
    title: 'US Paycheck Calculator: Estimate Take-Home Pay',
    description:
      'Calculate your net take-home pay by salary or hourly rate. Estimate federal income tax, Social Security, Medicare, and state taxes across all 50 US states.',
    url: 'https://nepacalc.com/calculator/us-paycheck-calculator/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/us-paycheck-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'US Paycheck Calculator - Estimate Take-Home Pay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Paycheck Calculator: Estimate Take-Home Pay',
    description:
      'Calculate your net take-home pay by salary or hourly rate. Estimate federal income tax, Social Security, Medicare, and state taxes across all 50 US states.',
    images: ['https://nepacalc.com/images/og/us-paycheck-calculator.jpg'],
  },
};

export default function USPaycheckPage() {
  const faqItems = [
    {
      name: 'How is net take-home pay calculated from gross salary?',
      acceptedAnswer: {
        text: 'Take-home pay starts with your gross pay (salary or hourly earnings). You subtract pre-tax deductions (like 401k or health insurance), federal income tax withholding (calculated via IRS Publication 15-T based on your W-4), FICA taxes (6.2% Social Security up to $184,500 and 1.45% Medicare), state/local income taxes, and any post-tax deductions (such as Roth 401k or garnishments). The remaining cash is your net paycheck.',
      },
    },
    {
      name: 'What is the difference between bi-weekly and semi-monthly paychecks?',
      acceptedAnswer: {
        text: 'Bi-weekly employees are paid every two weeks, resulting in 26 paychecks per year (with two months having 3 paychecks). Semi-monthly employees are paid twice per month (typically on the 15th and last business day), resulting in 24 paychecks per year. Because of this, a semi-monthly paycheck is slightly larger than a bi-weekly paycheck for the exact same annual salary ($60,000 / 26 = $2,307.69 vs $60,000 / 24 = $2,500.00).',
      },
    },
    {
      name: 'How do FICA payroll taxes work in 2026?',
      acceptedAnswer: {
        text: 'The Federal Insurance Contributions Act (FICA) funds Social Security and Medicare. In 2026, employees pay 6.2% in Social Security tax on earnings up to the official statutory wage base cap of $184,500 (maximum $11,439.00 per employee). Medicare tax is 1.45% on all earnings with no ceiling. An additional 0.9% Medicare surtax is withheld by employers when wages exceed $200,000, regardless of marital status.',
      },
    },
    {
      name: 'Which US states have zero state income tax on paychecks?',
      acceptedAnswer: {
        text: 'There are nine states without a general individual state income tax on earned wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Living and working in these states means your state income tax withholding is $0.00, leaving only Federal income tax and FICA deductions.',
      },
    },
    {
      name: 'How much is $17.50 an hour weekly and annually?',
      acceptedAnswer: {
        text: 'At $17.50 per hour working standard full-time hours (40 hours per week), gross earnings are $700.00 per week. Over a standard 52-week work year (2,080 hours), gross annual pay is $36,400. After federal taxes and FICA, estimated take-home pay is approximately $585 to $620 per week depending on state taxes and filing status.',
      },
    },
    {
      name: 'What is $33.00 an hour annually?',
      acceptedAnswer: {
        text: 'At $33.00 per hour working 40 hours per week for 52 weeks (2,080 standard annual work hours), your gross annual salary is $68,640. In a state with no income tax like Texas (Single filer, standard deduction), estimated annual take-home pay is roughly $56,800, or about $2,185 bi-weekly.',
      },
    },
    {
      name: 'What annual salary is $1,400 every two weeks?',
      acceptedAnswer: {
        text: 'If you receive $1,400 gross every two weeks, your gross annual salary is $36,400 ($1,400 x 26 pay periods). If $1,400 is your net take-home pay after taxes, your gross annual salary is approximately $43,000 to $48,000, depending on your state and tax elections.',
      },
    },
    {
      name: 'If I make $1,000 a week, how much tax is taken out of my paycheck?',
      acceptedAnswer: {
        text: 'On a $1,000 weekly gross paycheck ($52,000/year), mandatory taxes typically take 18% to 25% ($180 to $250 per check). This includes Social Security ($62.00 at 6.2%), Medicare ($14.50 at 1.45%), federal income tax withholding (~$75 to $95), and state income tax ($0 in 0% states up to $45 in progressive tax states), leaving an estimated net check of $750 to $820.',
      },
    },
    {
      name: 'What is the difference between paycheck withholding and my actual tax liability?',
      acceptedAnswer: {
        text: 'Paycheck withholding is an estimate withheld each pay period by your employer under IRS Publication 15-T rules. Your actual tax liability is calculated once a year when filing IRS Form 1040 in April. If your total withholding exceeds your actual tax liability, you receive a tax refund; if withholding was insufficient, you owe taxes.',
      },
    },
    {
      name: 'How does contributing to a 401(k) or HSA increase take-home value?',
      acceptedAnswer: {
        text: 'Traditional 401(k) contributions reduce your gross taxable income for Federal and State income taxes, lowering your immediate tax bill. Section 125 health insurance premiums and HSA contributions are triple-tax-advantaged, reducing Federal income tax, State income tax, and FICA payroll taxes simultaneously in most states.',
      },
    },
    {
      name: 'Why does my actual paycheck differ from my estimated take-home pay?',
      acceptedAnswer: {
        text: 'Discrepancies usually stem from local city or county income taxes (e.g. NYC, Philadelphia, or Ohio municipalities), company-specific pre-tax benefit elections (such as FSA, dental, vision, life insurance, or commuter transit), post-tax payroll deductions (union dues, wage garnishments, Roth 401k), or personal Form W-4 elections such as extra per-period withholding (Step 4c) or multiple-job status (Step 2).',
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
        name: 'US Paycheck Calculator: Estimate Take-Home Pay',
        description:
          'Calculate your net take-home pay by salary or hourly rate. Estimate federal income tax, Social Security, Medicare, and state taxes across all 50 US states.',
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
          'Free online paycheck calculator calculating net take-home pay after federal taxes, FICA (Social Security and Medicare), and state tax across all 50 US states + DC.',
        featureList: [
          'Dual Salary ($/year) and Hourly ($/hr) wage calculation modes',
          'Overtime (1.5x) and weeks-worked custom inputs',
          'Updated 2026 Federal tax brackets and standard deductions',
          'Official 2026 Social Security cap ($184,500) and Additional Medicare rules',
          'Complete 50-state + DC tax rules engine including 0% tax states',
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
      <section className="w-full px-3 sm:px-6 lg:px-8 pb-10 space-y-4">
        
        {/* Module 1: How Paychecks Are Calculated (Gross-to-Net) */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              How Is Your Paycheck Calculated? The Gross-to-Net Formula
            </h2>
            <p className="text-xs text-gray-500">
              A transparent breakdown of how gross salary converts to net take-home cash under IRS Publication 15-T and state revenue codes.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-800">
            <strong>Take-Home Pay Formula:</strong> Gross Earnings - Pre-Tax Benefits - Federal Income Tax Withholding - FICA Taxes - State/Local Income Taxes - Post-Tax Deductions = <strong>Net Pay</strong>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
              <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wide block">Step 1: Gross Pay</span>
              <h3 className="font-bold text-gray-900 text-xs">Salary or Hourly Wages</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Your base pay before any withholdings. For hourly employees, this includes regular hours plus overtime hours (FLSA 1.5x rate).
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">Step 2: Mandatory Taxes</span>
              <h3 className="font-bold text-gray-900 text-xs">Federal, FICA &amp; State Taxes</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Federal income tax (progressive 10% to 37%), FICA (6.2% Social Security up to $184,500 and 1.45% Medicare), and applicable state/local withholding.
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">Step 3: Net Cash</span>
              <h3 className="font-bold text-gray-900 text-xs">Take-Home Deposit</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                The actual net cash deposited into your checking account on payday after pre-tax benefits (401k, health) and voluntary deductions are subtracted.
              </p>
            </div>
          </div>
        </div>

        {/* Module 2: Federal Withholding vs. Actual Tax Liability */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Federal Income Tax Withholding vs. Actual Annual Tax Liability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            One of the most common points of confusion for employees is the difference between <strong>paycheck withholding</strong> and <strong>annual tax liability</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg space-y-1">
              <h3 className="font-bold text-blue-950">Paycheck Withholding (IRS Publication 15-T)</h3>
              <p className="text-blue-900 leading-relaxed text-[11px]">
                The estimated amount an employer deducts from each paycheck based on your pay period frequency, wage brackets, and elections made on Form W-4. It is sent directly to the IRS throughout the tax year.
              </p>
            </div>
            <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-lg space-y-1">
              <h3 className="font-bold text-purple-950">Actual Tax Liability (IRS Form 1040)</h3>
              <p className="text-purple-900 leading-relaxed text-[11px]">
                Your total final tax calculated when filing your federal tax return in April. It reconciles total income, outside investments, deductions, and tax credits. If withholding exceeded liability, you receive a refund; if insufficient, you owe a payment.
              </p>
            </div>
          </div>
        </div>

        {/* Module 3: Pre-Tax vs. Post-Tax Deductions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Pre-Tax vs. Post-Tax Payroll Deductions
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Not all paycheck deductions receive identical tax treatment. Knowing how each deduction impacts your wage bases can save thousands of dollars annually:
          </p>
          
          <div className="overflow-x-auto pt-1">
            <table className="w-full text-left text-xs border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                  <th className="py-2 px-3">Deduction Type</th>
                  <th className="py-2 px-3">Reduces Federal Income Tax?</th>
                  <th className="py-2 px-3">Reduces FICA (SS &amp; Med)?</th>
                  <th className="py-2 px-3">Reduces State Income Tax?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-gray-900">Traditional 401(k) / 403(b)</td>
                  <td className="py-2 px-3 text-emerald-700 font-semibold">Yes</td>
                  <td className="py-2 px-3 text-rose-600 font-semibold">No</td>
                  <td className="py-2 px-3 text-emerald-700 font-semibold">Yes (most states)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-gray-900">Section 125 Health Insurance</td>
                  <td className="py-2 px-3 text-emerald-700 font-semibold">Yes</td>
                  <td className="py-2 px-3 text-emerald-700 font-semibold">Yes</td>
                  <td className="py-2 px-3 text-emerald-700 font-semibold">Yes</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-gray-900">HSA / FSA Contributions</td>
                  <td className="py-2 px-3 text-emerald-700 font-semibold">Yes</td>
                  <td className="py-2 px-3 text-emerald-700 font-semibold">Yes</td>
                  <td className="py-2 px-3 text-emerald-700 font-semibold">Yes (except CA &amp; NJ)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-gray-900">Roth 401(k) Contribution</td>
                  <td className="py-2 px-3 text-rose-600 font-semibold">No (Post-Tax)</td>
                  <td className="py-2 px-3 text-rose-600 font-semibold">No</td>
                  <td className="py-2 px-3 text-rose-600 font-semibold">No</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-gray-900">Garnishments / Life Insurance</td>
                  <td className="py-2 px-3 text-rose-600 font-semibold">No (Post-Tax)</td>
                  <td className="py-2 px-3 text-rose-600 font-semibold">No</td>
                  <td className="py-2 px-3 text-rose-600 font-semibold">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Module 4: How to Read Your Paystub */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            How to Read Your Paystub: Key Payroll Terms Glossary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1">
            <div className="p-2.5 bg-gray-50 rounded border border-gray-200">
              <strong className="text-gray-900 block text-xs">Gross Pay</strong>
              <span className="text-[11px] text-gray-600">Total earnings before any tax withholding or deductions.</span>
            </div>
            <div className="p-2.5 bg-gray-50 rounded border border-gray-200">
              <strong className="text-gray-900 block text-xs">Federal Taxable Wages</strong>
              <span className="text-[11px] text-gray-600">Gross pay minus pre-tax deductions like 401(k) and health insurance.</span>
            </div>
            <div className="p-2.5 bg-gray-50 rounded border border-gray-200">
              <strong className="text-gray-900 block text-xs">FICA Wages</strong>
              <span className="text-[11px] text-gray-600">Earnings subject to Social Security (capped at $184,500) and Medicare.</span>
            </div>
            <div className="p-2.5 bg-gray-50 rounded border border-gray-200">
              <strong className="text-gray-900 block text-xs">Net Pay</strong>
              <span className="text-[11px] text-gray-600">Actual cash deposited into your bank account after all deductions.</span>
            </div>
          </div>
        </div>

        {/* Module 5: Benchmark Table for Common US Salaries */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              2026 Take-Home Pay Benchmarks for Common Salaries (Single, Texas - 0% State Tax)
            </h2>
            <p className="text-xs text-gray-500">
              Calculated using the 2026 IRS Publication 15-T percentage brackets, standard deduction ($16,100), and statutory FICA caps.
            </p>
          </div>

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

          {/* Common salary Q&A and Worked Examples */}
          <div className="mt-4 space-y-2 text-xs text-gray-700">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Targeted Worked Examples (People Also Ask Queries)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wide block">Hourly &amp; Overtime</span>
                <p className="font-bold text-gray-900 text-xs">$25/hr + 5 Hours Overtime</p>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  40 regular hours ($1,000) + 5 overtime hours at 1.5× ($187.50) = <strong>$1,187.50 gross weekly</strong> ($61,750/yr). After FICA ($90.84) and federal tax (~$96.00), estimated net weekly take-home is roughly <strong>$950 to $1,000</strong>.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wide block">Pay Frequency</span>
                <p className="font-bold text-gray-900 text-xs">Bi-Weekly vs. Semi-Monthly</p>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  On a $60,000 salary: <strong>Bi-Weekly</strong> (26 pay periods) = $2,307.69 gross per check. <strong>Semi-Monthly</strong> (24 pay periods) = $2,500.00 gross per check. Annual take-home is identical, but check amounts differ by $192.31.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">Weekly Benchmark</span>
                <p className="font-bold text-gray-900 text-xs">Taxes on $1,000 / Week</p>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  On a $1,000 weekly gross paycheck ($52,000/yr), mandatory deductions are Social Security ($62.00 at 6.2%), Medicare ($14.50 at 1.45%), and Federal tax (~$75-$95), leaving <strong>~$760 to $820 net cash</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="font-semibold text-gray-900 mb-0.5">How much is $40/hr after taxes?</p>
                <p className="text-gray-600 leading-relaxed text-[11px]">$40/hr x 2,080 hrs = $83,200 gross. After federal tax (~$12,006) and FICA ($6,364), estimated take-home is roughly $64,830/yr ($2,493 bi-weekly).</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="font-semibold text-gray-900 mb-0.5">How much is $50,000 a year after taxes?</p>
                <p className="text-gray-600 leading-relaxed text-[11px]">On a $50,000 salary in Texas (0% tax), federal tax is $3,820 and FICA is $3,825, yielding an estimated net take-home of $42,355/yr ($1,601 bi-weekly or $3,469/mo).</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="font-semibold text-gray-900 mb-0.5">How much is $75,000 a year after taxes?</p>
                <p className="text-gray-600 leading-relaxed text-[11px]">On a $75,000 salary in Texas (0% tax), federal tax is $7,670 and FICA is $5,738, yielding an estimated net take-home of $61,592/yr ($2,334 bi-weekly or $5,058/mo).</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="font-semibold text-gray-900 mb-0.5">How much is $100,000 a year after taxes?</p>
                <p className="text-gray-600 leading-relaxed text-[11px]">On a $100,000 salary in Texas (0% tax), federal tax is $13,170 and FICA is $7,650, leaving $79,180 net take-home ($3,022 bi-weekly or $6,548/mo).</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 sm:col-span-2">
                <p className="font-semibold text-gray-900 mb-0.5">How much is $100k in California vs Texas?</p>
                <p className="text-gray-600 leading-relaxed text-[11px]">Texas has 0% state income tax (~$79,180 take-home). California income tax and 1.3% SDI add ~$6,400 in state deductions, leaving ~$72,780 net in CA (a $6,400/yr difference).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Module 6: Official Government References & Methodology */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Calculation Methodology &amp; Official References
          </h2>
          <p className="text-gray-600 leading-relaxed">
            NepaCalc computes employee payroll estimates strictly in accordance with published statutory federal and state tax guidelines:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 pt-1">
            <li>
              Federal income tax withholding percentages and bracket steps follow the official percentage method outlined in{' '}
              <a
                href="https://www.irs.gov/publications/p15t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                IRS Publication 15-T (Federal Income Tax Withholding Methods)
              </a>.
            </li>
            <li>
              To adjust allowances and credits on your tax return, refer to the{' '}
              <a
                href="https://www.irs.gov/forms-pubs/about-form-w-4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                Official IRS Form W-4
              </a>{' '}
              or test your year-end balance with the{' '}
              <a
                href="https://www.irs.gov/individuals/tax-withholding-estimator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                IRS Tax Withholding Estimator
              </a>.
            </li>
            <li>
              Social Security wage base limits are verified via the{' '}
              <a
                href="https://www.ssa.gov/oact/cola/cbb.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                Social Security Administration (SSA) Contribution &amp; Benefit Base
              </a>{' '}
              ($184,500 for tax year 2026).
            </li>
            <li>
              Overtime hours and minimum wage rules are grounded in the{' '}
              <a
                href="https://www.dol.gov/agencies/whd/overtime"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                US Department of Labor Overtime Pay Requirements (FLSA 1.5×)
              </a>.
            </li>
            <li>
              State disability contributions and state payroll withholding rates are derived from respective revenue authorities, such as the{' '}
              <a
                href="https://edd.ca.gov/en/payroll_taxes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                California Employment Development Department (EDD)
              </a>.
            </li>
          </ul>

          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides mathematical estimates based on standard withholding models across all 50 US states + Washington, DC. It excludes local municipal/city taxes (e.g. NYC, Yonkers, Pennsylvania local EIT) and employer-specific benefit fees. Consult a certified payroll accountant or tax advisor for individualized tax advice.
          </div>
        </div>

        {/* ── FAQ Section (AEO & People Also Ask Target) ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
            Frequently Asked Questions: US Paycheck &amp; Take-Home Pay
          </h2>

          <div className="space-y-3 divide-y divide-gray-100 text-xs sm:text-sm">
            {faqItems.map((item, idx) => (
              <div key={idx} className="pt-2.5 first:pt-0">
                <h3 className="font-bold text-gray-900 mb-0.5">{item.name}</h3>
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
