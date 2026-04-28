import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nepal Calculators Tax Land and Financial Tools NepaCalc',
  description: 'All 24 official Nepal specific calculators for income tax loan EMI NEPSE WACC SEE GPA and more. Accurate institutional grade tools for Nepal. Try NepaCalc now',
  keywords: ['nepal calculator', 'income tax calculator nepal', 'nepse calculator', 'see gpa calculator', 'nepal specific tools'],
  alternates: { canonical: 'https://nepacalc.com/nepal/' }
};

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
        title="Nepal Specific Calculators"
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

          {/* SEO Rich Content - ~1500+ Words Hub */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm">
            <article className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-[#202124] mb-8">The Essential Toolkit for Digital Nepal</h2>
              
              <p className="text-lg leading-relaxed text-[#5F6368]">
                As Nepal rapidly digitizes its financial and administrative systems, the need for precise, localized, and reliable calculation tools has never been greater. <strong>NepaCalc</strong> serves as the definitive digital hub for all Nepal-specific calculations—from the intricate tax slabs of the Inland Revenue Department (IRD) to the complex land measurements used in the Maalpot offices.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="p-6 bg-[#F8F9FA] rounded-2xl border">
                  <h3 className="text-[#1A73E8] font-bold mb-3">Finance & Taxation</h3>
                  <p className="text-sm leading-relaxed text-[#5F6368]">
                    Calculate income tax for FY 2081/82, salary after SSF/CIT deductions, and TDS for professional services with 100% legislative accuracy.
                  </p>
                </div>
                <div className="p-6 bg-[#F8F9FA] rounded-2xl border">
                  <h3 className="text-[#1A73E8] font-bold mb-3">Stock Market (NEPSE)</h3>
                  <p className="text-sm leading-relaxed text-[#5F6368]">
                    Master the stock market with our WACC, Bonus Share Tax, and Share Trading profit calculators, synced with SEBON fee structures.
                  </p>
                </div>
                <div className="p-6 bg-[#F8F9FA] rounded-2xl border">
                  <h3 className="text-[#1A73E8] font-bold mb-3">Local Utilities</h3>
                  <p className="text-sm leading-relaxed text-[#5F6368]">
                    Accurately predict your NEA electricity and KUKL water bills based on progressive slab rates used by the authorities.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-black text-[#202124] mt-12">1. Navigating the Nepal Income Tax Landscape (2081/82)</h3>
              <p>
                Nepal uses a progressive tax system where the tax rate increases as the income increases. For the current fiscal year, the government has defined specific slabs for both individuals (Unmarried) and couples (Married). 
              </p>
              <p>
                Our <strong>Income Tax Calculator</strong> accounts for Social Security Fund (SSF), Employee Provident Fund (EPF), Citizen Investment Trust (CIT), and various insurance premiums. This ensures that your "Take Home Salary" is calculated to the paisa.
              </p>

              <h3 className="text-2xl font-black text-[#202124] mt-12">2. NEPSE and the Capital Market Ecosystem</h3>
              <p>
                For Nepalese investors, calculating the <strong>Weighted Average Cost of Capital (WACC)</strong> is mandatory for tax reporting. Our tool automates this complex math, considering buy price, quantities, and stock splits. Furthermore, we provide a <strong>NEPSE Trading Calculator</strong> that factors in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SEBON Transaction Fee (0.01%)</li>
                <li>DP Charge (Rs. 25 per script)</li>
                <li>Broker Commission (Progressive Slabs)</li>
                <li>Capital Gains Tax (5% for Long-term, 7.5% for Short-term)</li>
              </ul>

              <h3 className="text-2xl font-black text-[#202124] mt-12">3. Real Estate and Land Measurement Mastery</h3>
              <p>
                Nepal is unique in its land measurement systems. While the rest of the world uses Acres or Square Meters, we use the <strong>Ropani-Aana</strong> system in the hills and the <strong>Bigha-Kattha</strong> system in the Terai. 
              </p>
              <p>
                Our <strong>Nepal Land Area Converter</strong> is the most trusted tool for real estate agents and homeowners in Nepal. It prevents disputes during property transactions by providing exact conversions to Square Feet and Square Meters, which are required for bank valuations and registration at the Maalpot office.
              </p>

              <h3 className="text-2xl font-black text-[#202124] mt-12">4. Education and Academic Performance</h3>
              <p>
                The shift from percentage to GPA/CGPA in the SEE and Plus 2 levels caused confusion for many students and parents. NepaCalc provides a standardized <strong>SEE GPA Calculator</strong> that follows the CDC (Curriculum Development Centre) guidelines, helping students project their grades and plan their higher education in Nepal or abroad.
              </p>

              <div className="mt-16 p-8 bg-[#202124] text-white rounded-2xl">
                <h3 className="text-white text-xl font-bold mb-4">Why Trust NepaCalc?</h3>
                <p className="text-sm text-gray-400 mb-6">
                  We don&apos;t just build calculators; we build trust. Every tool in our Nepal Specific section is:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1A73E8] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider">Legislatively Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1A73E8] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider">Updated for 2081/82</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1A73E8] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider">Mobile-First UI</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1A73E8] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider">Offline-Ready Core</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-[#202124] mt-12">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div className="p-6 border rounded-xl">
                  <h4 className="font-bold">Are these tax rates official?</h4>
                  <p className="text-sm text-[#5F6368]">Yes, all tax rates are pulled directly from the Inland Revenue Department (IRD) budget documents for the current fiscal year.</p>
                </div>
                <div className="p-6 border rounded-xl">
                  <h4 className="font-bold">How accurate is the NEA bill calculator?</h4>
                  <p className="text-sm text-[#5F6368]">It follows the exact slab structure (5 Ampere, 15 Ampere, 30 Ampere, etc.) and service charges defined by the Nepal Electricity Authority.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
