import { calcMeta } from '@/lib/calcMeta';
import { JsonLd } from '@/components/seo/JsonLd';
import Calculator from './Calculator';
import { IncomeTaxSeoContent } from './components/IncomeTaxSeoContent';

export const metadata = calcMeta({
  title: "Nepal Income Tax Calculator (FY 2083/84) — IRD Tax Calculator Nepal",
  description: "Calculate Nepal income tax instantly using the FY 2083/84 Finance Act and IRD tax slabs. Estimate annual tax, monthly TDS, deductions, effective tax rate and net income after tax for salary, business, freelance and rental income. Free.",
  slug: 'calculator/nepal-income-tax',
  canonical: '/calculator/nepal-income-tax/',
  keywords: [
    "Nepal Income Tax Calculator",
    "Income Tax Calculator Nepal",
    "IRD Tax Calculator Nepal",
    "Salary Tax Calculator Nepal",
    "Tax Calculator Nepal",
    "Nepal Income Tax Slab 2083/84",
    "Monthly TDS Calculator Nepal",
    "Finance Act 2083",
    "Personal Income Tax Nepal",
    "Freelance Tax Calculator Nepal",
    "Business Income Tax Nepal",
    "Rental Income Tax Nepal",
    "Female Tax Rebate Nepal",
    "NRN Tax Calculator Nepal",
  ],
  ogImage: 'https://nepacalc.com/images/nepal-income-tax-calculator-2083-2084.webp'
});

export default function Page() {



  const faqs = [
    { q: "What are the Nepal income tax slabs for FY 2083/84?",  a: "Nepal introduced a simplified five-slab personal income tax structure under the Finance Act 2083. Resident individuals are taxed progressively at 1%, 10%, 20%, 27% and 29% depending on their annual taxable income." },
    { q: "Is the first Rs. 10 lakh tax free in Nepal?",          a: "No. The first Rs. 10 lakh is generally subject to a 1% Social Security Tax. Eligible Social Security Fund (SSF) contributors may qualify for relief on this first slab according to applicable tax provisions." },
    { q: "How is monthly TDS calculated in Nepal?",              a: "Monthly Tax Deducted at Source (TDS) is estimated by converting monthly salary into annual taxable income, deducting eligible retirement contributions and approved deductions, applying the FY 2083/84 progressive tax slabs, and dividing the total annual tax across payroll periods." },
    { q: "Does the calculator include SSF deductions?",          a: "Yes. The calculator considers Social Security Fund (SSF), Employees Provident Fund (EPF) and Citizen Investment Trust (CIT) retirement contributions within the limits permitted under the Income Tax Act." },
    { q: "Can I include insurance deductions?",                  a: "Yes. The calculator supports current government deduction limits for Life Insurance (Rs. 40,000), Medical Insurance (Rs. 20,000), and Building Insurance (Rs. 10,000)." },
    { q: "Does this calculator support education deductions?",   a: "Yes. Eligible tuition fees may qualify for an education deduction of 25% of tuition, subject to a maximum annual deduction of Rs. 25,000 as permitted under the Finance Act 2083." },
    { q: "Can donations reduce my income tax?",                  a: "Yes. Approved donations to eligible tax-exempt institutions may be deducted up to Rs. 3,00,000, subject to limits prescribed under the Inland Revenue Department guidelines." },
    { q: "Is there a different tax slab for married couples?",   a: "No. Beginning FY 2083/84, Nepal follows a single personal income tax slab structure for all resident individuals." },
    { q: "How is income tax calculated in Nepal?",               a: "Income tax is calculated by first determining annual taxable income after eligible deductions. The FY 2083/84 progressive tax slabs are then applied to each portion of taxable income separately to determine the total annual tax liability." },
    { q: "Is this calculator updated for Budget 2083/84?",       a: "Yes. The calculator follows the latest FY 2083/84 Finance Act and Nepal Government Budget provisions, including revised tax slabs, updated deduction limits and current personal income tax rules." }
  ];

  return (
    <>
      <JsonLd 
        type="unified" 
        data={{
          url: "https://nepacalc.com/calculator/nepal-income-tax/",
          breadcrumbUrl: "https://nepacalc.com/calculator/nepal-income-tax/",
          breadcrumb: [
            { name: 'Home', item: 'https://nepacalc.com/' },
            { name: 'Finance Calculators', item: 'https://nepacalc.com/finance/' },
            { name: 'Nepal Income Tax Calculator', item: 'https://nepacalc.com/calculator/nepal-income-tax/' }
          ],
          webpage: {
            url: "https://nepacalc.com/calculator/nepal-income-tax/",
            name: "Nepal Income Tax Calculator (FY 2083/84) — IRD Tax Calculator Nepal",
            description: "Calculate Nepal income tax instantly using the FY 2083/84 Finance Act and IRD tax slabs. Estimate annual tax, monthly TDS, eligible deductions, effective tax rate and net income after tax.",
            isPartOf: "https://nepacalc.com/#website",
          },
          calculator: {
            name: "Nepal Income Tax Calculator FY 2083/84",
            description: "Calculate Nepal income tax instantly using the latest FY 2083/84 income tax slabs under the Finance Act 2083.",
            url: "https://nepacalc.com/calculator/nepal-income-tax/",
            applicationCategory: "FinanceApplication",
            isPartOf: "https://nepacalc.com/finance/#collection",
          },
          article: {
            url: "https://nepacalc.com/calculator/nepal-income-tax/",
            headline: "Nepal Income Tax Calculator (FY 2083/84)",
            description: "Complete guide to calculating Nepal personal income tax — salary, business, freelance, rental and professional income — under the Finance Act 2083/84.",
            datePublished: "2026-06-15",
            dateModified: "2026-07-13",
          },
          howto: {
            name: "How to Calculate Income Tax in Nepal",
            description: "Step-by-step guide to calculating Nepal income tax for FY 2083/84 using the Finance Act 2083.",
            url: "https://nepacalc.com/calculator/nepal-income-tax/",
            steps: [
              { name: "Enter annual or monthly salary", text: "Provide your base salary on a monthly or annual basis using the toggle." },
              { name: "Add bonus if applicable", text: "Include any guaranteed bonuses or festival allowances." },
              { name: "Enter SSF, EPF and CIT contributions", text: "Provide your retirement contributions to lower your taxable income." },
              { name: "Enter eligible deductions", text: "Input life insurance, medical insurance, education and other approved deductions." },
              { name: "Calculate taxable income", text: "The calculator automatically applies deduction caps from Finance Act 2083." },
              { name: "Apply FY 2083/84 tax slabs", text: "The system applies the progressive 1% to 29% income tax slabs." },
              { name: "View annual tax and monthly TDS", text: "Review your final annual income tax, monthly TDS, effective rate and take-home salary." }
            ]
          },
          faqs: faqs.map(f => ({ question: f.q, answer: f.a }))
        }} 
      />
      <Calculator />
      <IncomeTaxSeoContent />
    </>
  );
}
