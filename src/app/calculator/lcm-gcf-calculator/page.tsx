import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

import { LCM_GCF_FAQS } from './faqs';

export const metadata = calcMeta({
  title: "LCM & GCF Calculator | Prime Factorization NepaCalc",
  description: "Find the LCM (Least Common Multiple) and GCF (Greatest Common Factor) of two or more numbers instantly using the free NepaCalc LCM & GCF Calculator. Includes prime factorization, Euclidean method, worked examples, and support for SEE, NEB, IOE, KU, and Lok Sewa students.",
  slug: 'lcm-gcf-calculator',
  keywords: ["lcm calculator", "gcf calculator", "hcf calculator", "prime factorization", "least common multiple", "greatest common factor"],
});

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="LCM & GCF Calculator"
        description="Calculate the Least Common Multiple (LCM) and Greatest Common Factor (GCF) for any set of numbers, complete with prime factorization steps."
        url="https://nepacalc.com/calculator/lcm-gcf-calculator/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Math Tools', item: 'https://nepacalc.com/math-tools/' },
          { name: 'LCM & GCF Calculator', item: 'https://nepacalc.com/calculator/lcm-gcf-calculator/' }
        ]}
        faqs={LCM_GCF_FAQS}
      />
      <Calculator />
    </>
  );
}
