import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { calcMeta } from '@/lib/calcMeta';
import Link from 'next/link';

const TAGS: Record<string, string> = {
  'nepal-income-tax': 'FINANCE',
  'nepal-salary': 'FINANCE',
  'nepal-home-loan': 'LOAN',
  'nea-bill': 'UTILITIES',
  'nepal-land': 'UNITS',
  'nepal-stocks': 'STOCK MARKET',
  'property-tax': 'TAX',
  'property-registration': 'LEGAL',
  'nepal-provident-fund': 'SAVINGS',
  'nepal-tds': 'TAX',
  'nepal-vehicle-tax': 'TRANSPORT',
  'nepse-wacc': 'STOCK MARKET',
  'nepse-bonus-tax': 'STOCK MARKET',
  'gratuity-calculator': 'EMPLOYMENT',
  'foreign-employment': 'EMPLOYMENT',
  'kukl-bill': 'UTILITIES',
  'nepal-attendance': 'EDUCATION',
  'see-gpa': 'EDUCATION',
  'nepali-date': 'TOOLS',
  'nepal-vat': 'TAX',
};

export const metadata = calcMeta({
  title: 'IRD Tax Calculator Nepal | VAT Calculator Nepal',
  description: 'Accurate IRD tax calculator, VAT calculator Nepal, and salary tax calculator. Avoid VAT fine in Nepal with precise 13% VAT return calculation for FY 2081/82.',
  keywords: ['ird tax calculator', 'vat calculator nepal', 'vat fine calculator nepal', 'tax calculator tax refund calculator nepal', 'nepal tax calculation', 'personal income tax calculator nepal', '13% vat return', 'vat n ps calculator in nepal', 'blue book renew price in nepal'],
  slug: 'nepal',
});

export default function NepalPillarPage() {
  const nepalTools = CALCULATORS.filter(c => c.isNepal);

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com/' },
          { name: 'Nepal Specific', item: 'https://nepacalc.com/nepal/' }
        ]}
      />
      <CalcWrapper
        title="IRD Tax Calculator Nepal & VAT Calculator"
        description="Accurate financial, tax, and local conversion tools designed specifically for the Nepalese market following IRD and NRB guidelines."
        crumbs={[{ label: 'Nepal Specific' }]}
        isNepal={true}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {nepalTools.map(calc => (
              <PillarCard
                key={calc.id}
                slug={calc.slug}
                icon={calc.icon}
                name={calc.name}
                description={calc.description}
                tag={TAGS[calc.slug]}
                isNew={calc.isNew}
                isHot={calc.isHot}
              />
            ))}
          </div>

          {/* SEO Rich Content - 1500+ Words Hub */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm">
            <article className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-[#202124] mb-8">Ultimate IRD Tax Calculator and VAT Calculator Nepal</h2>
              
              <p className="text-lg leading-relaxed text-[#5F6368]">
                As Nepal rapidly digitizes its financial and administrative systems, the need for precise, localized, and reliable calculation tools has never been greater. Whether you are an individual calculating your salary tax or a business filing a <strong>13% VAT return</strong>, relying on an accurate <strong>IRD tax calculator</strong> is crucial. NepaCalc serves as the definitive digital hub for all <strong>Nepal tax calculation</strong> needs—from the intricate tax slabs of the Inland Revenue Department (IRD) to the complex land measurements used in the Maalpot offices.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-[#DADCE0]">
                  <h3 className="text-[#1A73E8] font-bold mb-3">Personal Income Tax</h3>
                  <p className="text-sm leading-relaxed text-[#5F6368]">
                    Use our <strong>personal income tax calculator nepal</strong> to determine your precise tax liability for FY 2081/82, incorporating SSF/CIT deductions.
                  </p>
                </div>
                <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-[#DADCE0]">
                  <h3 className="text-[#1A73E8] font-bold mb-3">Value Added Tax (VAT)</h3>
                  <p className="text-sm leading-relaxed text-[#5F6368]">
                    A reliable <strong>VAT calculator nepal</strong> ensures accurate billing. Calculate exclusive and inclusive VAT, and avoid the dreaded <strong>VAT fine calculator nepal</strong> scenario.
                  </p>
                </div>
                <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-[#DADCE0]">
                  <h3 className="text-[#1A73E8] font-bold mb-3">Vehicle & Property Tax</h3>
                  <p className="text-sm leading-relaxed text-[#5F6368]">
                    From understanding the <strong>blue book renew price in nepal</strong> to calculating property tax, stay compliant with local governmental guidelines.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-black text-[#202124] mt-12">1. Navigating the Nepal Income Tax Landscape (FY 2081/82)</h3>
              <p>
                Nepal uses a progressive tax system where the tax rate increases as the income increases. The Inland Revenue Department (IRD) sets specific slabs for individuals (Unmarried) and couples (Married). Accurately determining your tax requires a specialized <strong>tax calculator tax refund calculator nepal</strong>.
              </p>
              <p>
                Our comprehensive <strong>IRD tax calculator</strong> accounts for Social Security Fund (SSF), Employee Provident Fund (EPF), Citizen Investment Trust (CIT), and various insurance premiums (life insurance, medical insurance). This ensures your take-home salary is computed down to the last paisa, minimizing errors during tax filing.
              </p>

              <h3 className="text-2xl font-black text-[#202124] mt-12">2. Understanding the VAT Calculator Nepal</h3>
              <p>
                Value Added Tax (VAT) in Nepal is standardized at 13%. For businesses, getting the math right on every invoice is a legal requirement. Our <strong>VAT calculator nepal</strong> helps you in two major ways:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#5F6368]">
                <li><strong>Adding VAT (Exclusive to Inclusive):</strong> Calculate the final selling price by adding 13% VAT to the base price.</li>
                <li><strong>Extracting VAT (Inclusive to Exclusive):</strong> Determine the taxable value and the VAT amount from a gross price.</li>
              </ul>
              <p className="mt-4">
                Failing to file your <strong>13% VAT return</strong> on time by the 25th of the following Nepalese month results in penalties. If you are late, you can use our built-in <strong>VAT fine calculator nepal</strong> logic to estimate the interest and fines imposed by the IRD. It is highly recommended to use a verified <strong>vat n ps calculator in nepal</strong> to keep your business compliant.
              </p>

              <h3 className="text-2xl font-black text-[#202124] mt-12">3. NEPSE and the Capital Market Ecosystem</h3>
              <p>
                For Nepalese investors, calculating the Weighted Average Cost of Capital (WACC) is mandatory for tax reporting during share sales. Our tool automates this complex math, considering buy price, quantities, and stock splits. Furthermore, we provide a NEPSE Trading Calculator that factors in:
              </p>
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg my-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F8F9FA] font-bold text-[#202124]">
                    <tr>
                      <th className="p-4">Charge Type</th>
                      <th className="p-4">Rate / Amount</th>
                      <th className="p-4">Applicability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-[#5F6368]">
                    <tr><td className="p-4 font-bold">SEBON Transaction Fee</td><td className="p-4">0.015%</td><td className="p-4">On total transaction amount</td></tr>
                    <tr><td className="p-4 font-bold">DP Charge</td><td className="p-4">Rs. 25</td><td className="p-4">Per scrip transfer</td></tr>
                    <tr><td className="p-4 font-bold">Broker Commission</td><td className="p-4">0.27% - 0.40%</td><td className="p-4">Progressive slab based on volume</td></tr>
                    <tr><td className="p-4 font-bold">Capital Gains Tax (Long-term)</td><td className="p-4">5%</td><td className="p-4">Holding period &gt; 365 days</td></tr>
                    <tr><td className="p-4 font-bold">Capital Gains Tax (Short-term)</td><td className="p-4">7.5%</td><td className="p-4">Holding period &lt; 365 days</td></tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-black text-[#202124] mt-12">4. Blue Book Renew Price in Nepal and Vehicle Taxes</h3>
              <p>
                Owning a vehicle in Nepal requires annual payment of vehicle tax. The <strong>blue book renew price in nepal</strong> depends heavily on the engine capacity (CC) for two-wheelers and four-wheelers, and the specific province where the vehicle is registered (e.g., Bagmati Province vs. Gandaki Province). NepaCalc provides tools that estimate your annual road tax and renewal fees to prevent unexpected late fines.
              </p>

              <h3 className="text-2xl font-black text-[#202124] mt-12">5. Real Estate and Land Measurement Mastery</h3>
              <p>
                Nepal uses unique land measurement systems. While the rest of the world uses Acres or Square Meters, we use the <strong>Ropani-Aana-Paisa-Daam</strong> system in the hills and the <strong>Bigha-Kattha-Dhur</strong> system in the Terai region.
              </p>
              <p>
                Our Land Area Converter is the most trusted tool for real estate agents and homeowners in Nepal. It prevents disputes during property transactions by providing exact conversions to Square Feet and Square Meters, which are required for bank valuations and property registration at the Maalpot office.
              </p>

              <div className="mt-16 p-8 bg-[#202124] text-white rounded-2xl">
                <h3 className="text-white text-xl font-bold mb-4">Why Trust NepaCalc for Nepal Tax Calculation?</h3>
                <p className="text-sm text-gray-400 mb-6">
                  We don&apos;t just build calculators; we build trust. Every tool in our Nepal Specific section is designed for maximum compliance:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1A73E8] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider">Legislatively Verified by IRD Guidelines</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1A73E8] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider">Updated for Financial Year 2081/82</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1A73E8] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider">Accurate 13% VAT Logic</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1A73E8] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider">Fast & Secure (No Data Stored)</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-[#202124] mt-12">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-6 border border-[#DADCE0] rounded-xl">
                  <h4 className="font-bold text-[#202124] mb-2">Are these tax rates official?</h4>
                  <p className="text-sm text-[#5F6368]">Yes, all tax rates used in our <strong>IRD tax calculator</strong> and <strong>personal income tax calculator nepal</strong> are pulled directly from the Inland Revenue Department (IRD) budget documents for the current fiscal year 2081/82.</p>
                </div>
                <div className="p-6 border border-[#DADCE0] rounded-xl">
                  <h4 className="font-bold text-[#202124] mb-2">How do I calculate a 13% VAT return?</h4>
                  <p className="text-sm text-[#5F6368]">To calculate a 13% VAT return, multiply your taxable amount by 0.13. Our <strong>VAT calculator nepal</strong> does this instantly, allowing you to add or extract VAT from any given price.</p>
                </div>
                <div className="p-6 border border-[#DADCE0] rounded-xl">
                  <h4 className="font-bold text-[#202124] mb-2">What is the VAT fine calculator Nepal based on?</h4>
                  <p className="text-sm text-[#5F6368]">Fines are calculated based on the IRD rules: a fixed penalty for late filing plus an annual interest rate (usually 15%) on the outstanding VAT amount.</p>
                </div>
                <div className="p-6 border border-[#DADCE0] rounded-xl">
                  <h4 className="font-bold text-[#202124] mb-2">How accurate is the NEA bill calculator?</h4>
                  <p className="text-sm text-[#5F6368]">It follows the exact slab structure (5 Ampere, 15 Ampere, 30 Ampere, etc.) and service charges defined by the Nepal Electricity Authority.</p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </CalcWrapper>
    </>
  );
}
