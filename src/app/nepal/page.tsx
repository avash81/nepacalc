import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import Link from 'next/link';

export const metadata = calcMeta({
  title: 'Nepal Calculators | Tax, Salary & Loans | NepaCalc',
  description: 'Free Nepal-specific calculators for income tax, salary, VAT, loans, electricity bills, land, gold, NEPSE, education, dates and everyday calculations.',
  slug: 'nepal',
  keywords: ['nepal calculator', 'nepal income tax calculator', 'nepal salary calculator', 'nea bill calculator', 'nepse calculator'],
});

export default function NepalDirectoryPage() {
  return (
    <>
      <JsonLd
        type="unified"
        data={{
          url: 'https://nepacalc.com/nepal/',
          collection: {
            url: 'https://nepacalc.com/nepal/',
            name: 'Nepal Calculators',
            description: 'Nepal-specific calculators for taxes, salaries, electricity bills, vehicle taxes, land, finance and other Nepal calculations.',
          },
          itemList: {
            url: 'https://nepacalc.com/nepal/',
            name: 'Nepal Calculators - List',
            description: 'List of calculators in Nepal Calculators',
            items: CALCULATORS.filter(
              (calculator) => calculator.category === 'nepal'
            ).map((calculator, index) => ({
              position: index + 1,
              name: calculator.name,
              url: `https://nepacalc.com${calculator.slug.includes('/') ? '/' + calculator.slug : '/calculator/' + calculator.slug}/`,
            })),
          }
        }}
      />
      <CalcWrapper
        title="Nepal Calculators"
        description="Explore Nepal-specific calculators for taxes, salary, loans, utilities, land, gold, education, dates, stocks, and everyday calculations."
        crumbs={[{ label: 'Nepal Calculators' }]}
        isNepal={true}
      >
        <div className="py-6 max-w-4xl">
          <nav aria-label="Nepal calculator categories" className="flex flex-wrap gap-2 mb-10">
            <Link href="#tax" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Tax &amp; VAT</Link>
            <Link href="#finance" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Finance &amp; Loans</Link>
            <Link href="#utilities" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Utilities &amp; Bills</Link>
            <Link href="#property" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Property &amp; Land</Link>
            <Link href="#gold" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Gold &amp; Silver</Link>
            <Link href="#stocks" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Stocks &amp; NEPSE</Link>
            <Link href="#education" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Education</Link>
            <Link href="#date-age" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Date &amp; Age</Link>
            <Link href="#employment" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Employment</Link>
            <Link href="#converters" className="px-4 py-2 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors text-[#202124]">Nepal Converters</Link>
          </nav>

          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 md:p-10 shadow-sm space-y-12">
            <section id="tax" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">Tax &amp; VAT Calculators</h2>
              <p className="text-[#5f6368] mb-4">Calculate Nepal income tax, salary tax, VAT, TDS and other tax-related amounts.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/nepal-income-tax/" className="text-[#1a73e8] hover:underline font-medium">Nepal Income Tax Calculator</Link></li>
                <li><Link href="/calculator/nepal-salary/" className="text-[#1a73e8] hover:underline font-medium">Nepal Salary Calculator</Link></li>
                <li><Link href="/calculator/nepal-vat/" className="text-[#1a73e8] hover:underline font-medium">Nepal VAT Calculator</Link></li>
                <li><Link href="/calculator/tds-calculator/" className="text-[#1a73e8] hover:underline font-medium">Nepal TDS Calculator</Link></li>
                <li><Link href="/calculator/gold-tax/" className="text-[#1a73e8] hover:underline font-medium">Gold Tax Calculator Nepal</Link></li>
                <li><Link href="/calculator/property-tax/" className="text-[#1a73e8] hover:underline font-medium">Capital Gains &amp; Property Tax Calculator</Link></li>
              </ul>
            </section>

            <section id="finance" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">Finance &amp; Loan Calculators</h2>
              <p className="text-[#5f6368] mb-4">Calculate loans, EMIs, savings, investments and other financial values in Nepal.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/loan-emi/" className="text-[#1a73e8] hover:underline font-medium">Loan EMI Calculator</Link></li>
                <li><Link href="/calculator/nepal-home-loan/" className="text-[#1a73e8] hover:underline font-medium">Nepal Home Loan Calculator</Link></li>
                <li><Link href="/calculator/auto-loan/" className="text-[#1a73e8] hover:underline font-medium">Nepal Auto Loan Calculator</Link></li>
                <li><Link href="/calculator/nepal-loan-eligibility/" className="text-[#1a73e8] hover:underline font-medium">Nepal Loan Eligibility Calculator</Link></li>
                <li><Link href="/calculator/sip-calculator/" className="text-[#1a73e8] hover:underline font-medium">SIP Calculator</Link></li>
                <li><Link href="/calculator/fd-calculator/" className="text-[#1a73e8] hover:underline font-medium">FD Calculator</Link></li>
                <li><Link href="/calculator/savings/" className="text-[#1a73e8] hover:underline font-medium">Savings Calculator</Link></li>
                <li><Link href="/calculator/compound-interest/" className="text-[#1a73e8] hover:underline font-medium">Compound Interest Calculator</Link></li>
                <li><Link href="/calculator/simple-interest/" className="text-[#1a73e8] hover:underline font-medium">Simple Interest Calculator</Link></li>
                <li><Link href="/calculator/nepal-provident-fund/" className="text-[#1a73e8] hover:underline font-medium">Nepal Provident Fund Calculator</Link></li>
              </ul>
            </section>

            <section id="utilities" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">Nepal Utility &amp; Bill Calculators</h2>
              <p className="text-[#5f6368] mb-4">Calculate electricity and water bills using Nepal-specific billing information.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/nea-bill/" className="text-[#1a73e8] hover:underline font-medium">NEA Electricity Bill Calculator</Link></li>
                <li><Link href="/calculator/kukl-bill/" className="text-[#1a73e8] hover:underline font-medium">KUKL Water Bill Calculator</Link></li>
              </ul>
            </section>

            <section id="property" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">Property &amp; Land Calculators</h2>
              <p className="text-[#5f6368] mb-4">Calculate Nepal land measurements, property taxes and registration-related costs.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/nepal-land/" className="text-[#1a73e8] hover:underline font-medium">Nepal Land Area Converter</Link></li>
                <li><Link href="/calculator/property-registration/" className="text-[#1a73e8] hover:underline font-medium">Property Registration Fee Calculator</Link></li>
                <li><Link href="/calculator/property-tax/" className="text-[#1a73e8] hover:underline font-medium">Property Tax Calculator</Link></li>
              </ul>
            </section>

            <section id="gold" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">Gold &amp; Silver Calculators</h2>
              <p className="text-[#5f6368] mb-4">Convert precious-metal units and calculate gold and silver values using Nepal units.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/gold-converter/" className="text-[#1a73e8] hover:underline font-medium">Nepal Gold Unit Converter</Link></li>
                <li><Link href="/calculator/gold-tax/" className="text-[#1a73e8] hover:underline font-medium">Gold Tax Calculator Nepal</Link></li>
                <li><Link href="/calculator/silver-converter/" className="text-[#1a73e8] hover:underline font-medium">Silver Converter</Link></li>
                <li><Link href="/market-rates/live-gold-price/" className="text-[#1a73e8] hover:underline font-medium">Live Gold Price in Nepal</Link></li>
                <li><Link href="/market-rates/live-silver-price/" className="text-[#1a73e8] hover:underline font-medium">Live Silver Price in Nepal</Link></li>
              </ul>
            </section>

            <section id="stocks" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">NEPSE &amp; Stock Calculators</h2>
              <p className="text-[#5f6368] mb-4">Calculate Nepal stock trading costs, returns, taxes and investment metrics.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/nepal-stocks/" className="text-[#1a73e8] hover:underline font-medium">NEPSE Trading Calculator</Link></li>
                <li><Link href="/calculator/nepse-wacc/" className="text-[#1a73e8] hover:underline font-medium">NEPSE WACC Calculator</Link></li>
                <li><Link href="/calculator/nepse-bonus-tax/" className="text-[#1a73e8] hover:underline font-medium">NEPSE Bonus Share Tax Calculator</Link></li>
              </ul>
            </section>

            <section id="education" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">Nepal Education Calculators</h2>
              <p className="text-[#5f6368] mb-4">Calculate grades, GPA, attendance and other education-related values used in Nepal.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/see-gpa/" className="text-[#1a73e8] hover:underline font-medium">SEE GPA Calculator</Link></li>
                <li><Link href="/calculator/gpa/" className="text-[#1a73e8] hover:underline font-medium">GPA Calculator</Link></li>
                <li><Link href="/calculator/cgpa/" className="text-[#1a73e8] hover:underline font-medium">CGPA Calculator</Link></li>
                <li><Link href="/calculator/engineering-gpa/" className="text-[#1a73e8] hover:underline font-medium">Engineering GPA Calculator</Link></li>
                <li><Link href="/calculator/nepal-attendance/" className="text-[#1a73e8] hover:underline font-medium">University Attendance Calculator</Link></li>
                <li><Link href="/calculator/marks-needed/" className="text-[#1a73e8] hover:underline font-medium">Marks Needed Calculator</Link></li>
              </ul>
            </section>

            <section id="date-age" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">Nepal Date &amp; Age Calculators</h2>
              <p className="text-[#5f6368] mb-4">Use Nepal-specific date conversion and age eligibility tools.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/nepali-date/" className="text-[#1a73e8] hover:underline font-medium">Nepali Date Converter</Link></li>
                <li><Link href="/calculator/nepali-date/bulk/" className="text-[#1a73e8] hover:underline font-medium">Bulk Nepali Date Converter</Link></li>
                <li><Link href="/calculator/nepal-citizenship-age/" className="text-[#1a73e8] hover:underline font-medium">Nepal Citizenship Age Calculator</Link></li>
                <li><Link href="/calculator/lok-sewa-age/" className="text-[#1a73e8] hover:underline font-medium">Lok Sewa Age Calculator</Link></li>
              </ul>
            </section>

            <section id="employment" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">Employment Calculators</h2>
              <p className="text-[#5f6368] mb-4">Calculate gratuity, foreign employment costs and other Nepal employment-related amounts.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/gratuity-calculator/" className="text-[#1a73e8] hover:underline font-medium">Nepal Gratuity Calculator</Link></li>
                <li><Link href="/calculator/foreign-employment/" className="text-[#1a73e8] hover:underline font-medium">Foreign Employment Fees Calculator</Link></li>
              </ul>
            </section>

            <section id="converters" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#202124] mb-2 border-b border-[#dadce0] pb-2">Nepal Converters</h2>
              <p className="text-[#5f6368] mb-4">Convert Nepal-specific units and currencies for everyday calculations.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#202124] marker:text-[#0d6e6a]">
                <li><Link href="/calculator/nepal-land/" className="text-[#1a73e8] hover:underline font-medium">Nepal Land Unit Converter</Link></li>
                <li><Link href="/calculator/gold-converter/" className="text-[#1a73e8] hover:underline font-medium">Gold Unit Converter</Link></li>
                <li><Link href="/calculator/silver-converter/" className="text-[#1a73e8] hover:underline font-medium">Silver Converter</Link></li>
                <li><Link href="/calculator/currency-converter/" className="text-[#1a73e8] hover:underline font-medium">Currency Converter</Link></li>
                <li><Link href="/market-rates/exchange-rate-nepal/" className="text-[#1a73e8] hover:underline font-medium">Nepal Exchange Rates</Link></li>
              </ul>
            </section>

            <section className="mt-8 pt-8 border-t-2 border-dashed border-[#dadce0]">
              <h2 className="text-xl font-bold text-[#202124] mb-2">About Nepal Calculators</h2>
              <p className="text-[#5f6368] leading-relaxed">
                NepaCalc&apos;s Nepal calculator collection is designed around practical calculations that people in Nepal frequently need, covering tax, salary, loans, utilities, property, land, precious metals, stocks, education, dates and employment. Calculation results are intended for estimation and planning. Where a result depends on current government rates, regulations, market prices or official schedules, verify the final figure against the relevant official source before relying on it.
              </p>
            </section>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
