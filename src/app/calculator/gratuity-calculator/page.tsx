import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Gratuity Calculator Nepal | Labor Act 2074 Rules NepaCalc",
  description: "Calculate your terminal benefits under Nepal Labor Act 2074. Check eligibility and compute mandatory 8.33% basic salary accumulations.",
  slug: 'gratuity-calculator',
  keywords: ["gratuity calculator nepal", "labor act 2074 gratuity", "ssf calculator nepal", "termination benefit nepal", "8.33 percent gratuity", "resignation payout nepal"],
});

const GRATUITY_FAQS = [
  {
    question: "Am I eligible for Gratuity if I resign before 5 years?",
    answer: "Under the Labor Act 2074, employers must deposit 8.33% monthly into a designated fund from day one. If registered in the Social Security Fund (SSF), that money stays in your SSF account and continues to grow even if you leave the employer before 5 years."
  },
  {
    question: "Is my Gratuity payout taxable in Nepal?",
    answer: "Yes, but it is heavily subsidized. There is a tax exemption limit of 50% of the total amount or up to Rs. 5,00,000 (whichever is lower), provided the fund is approved by the IRD. Only the amount exceeding this exempt limit is taxed at a flat 15%."
  },
  {
    question: "Does Gratuity include my allowances?",
    answer: "No. Gratuity is calculated strictly on your Basic Salary. Allowances for housing, transportation, or food are excluded from the 8.33% calculation. Always check your payslip to identify your true Basic Salary."
  },
  {
    question: "What is the difference between SSF and traditional Gratuity?",
    answer: "Traditionally, companies held the gratuity fund internally and paid it out upon resignation. Under the Social Security Fund (SSF) scheme, the company deposits 8.33% monthly directly to the government SSF, meaning your fund is managed centrally and follows you from job to job."
  },
  {
    question: "Can an employer refuse to pay Gratuity if I am fired?",
    answer: "Under the Labor Act 2074, gratuity is a statutory right. Even if an employee is terminated for misconduct, the employer cannot forfeit the accumulated gratuity. It must be paid out to the employee or transferred to their SSF account."
  },
  {
    question: "How are fractional years (e.g., 5 years and 4 months) calculated?",
    answer: "The law requires prorated calculations. For 5 years and 4 months, the calculation would be 5.33 years. You are entitled to the exact 8.33% accumulation for those additional 4 months worked."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Gratuity Calculator Nepal"
        description="Calculate your terminal benefits under Nepal Labor Act 2074. Check eligibility and compute mandatory 8.33% basic salary accumulations."
        url="https://nepacalc.com/calculator/gratuity-calculator/"
        category="FinanceApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Nepal Tools', item: 'https://nepacalc.com/nepal/' },
          { name: 'Gratuity Calculator', item: 'https://nepacalc.com/calculator/gratuity-calculator/' }
        ]}
        faqs={GRATUITY_FAQS}
      />
      <Calculator />
    </>
  );
}
