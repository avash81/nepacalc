import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "LCM & GCF Calculator | Prime Factorization NepaCalc",
  description: "Calculate the Least Common Multiple (LCM) and Greatest Common Factor (GCF) for any set of numbers, complete with prime factorization steps.",
  slug: 'lcm-gcf-calculator',
  keywords: ["lcm calculator", "gcf calculator", "hcf calculator", "prime factorization", "least common multiple", "greatest common factor"],
});

const LCM_GCF_FAQS = [
  {
    question: "What is the difference between LCM and GCF (HCF)?",
    answer: "The LCM (Least Common Multiple) is the smallest number that is a multiple of all given numbers. The GCF (Greatest Common Factor), also called HCF (Highest Common Factor), is the largest number that divides all given numbers without a remainder. For example, for 12 and 18: LCM = 36, GCF = 6."
  },
  {
    question: "How do you calculate LCM using prime factorization?",
    answer: "To find LCM using prime factorization: (1) Factor each number into primes, (2) List all unique prime factors, (3) Take the highest power of each prime factor, (4) Multiply them together. For 12 (2²×3) and 18 (2×3²): LCM = 2²×3² = 36."
  },
  {
    question: "Can I calculate LCM and GCF for more than two numbers?",
    answer: "Yes. Our calculator supports any number of inputs. Simply enter them separated by commas (e.g., 12, 18, 24). The tool uses the associative property of GCF and LCM to process multiple numbers iteratively."
  },
  {
    question: "What is LCM used for in real life?",
    answer: "LCM is used to find common scheduling periods (e.g., when two buses will both depart together), to add fractions with different denominators, and to synchronize repeating events in engineering and manufacturing."
  },
  {
    question: "What is the relationship between LCM and GCF?",
    answer: "For any two numbers A and B, the relationship is: LCM(A, B) × GCF(A, B) = A × B. This is a fundamental theorem of arithmetic and can be used to quickly find one value if you already know the other."
  }
];

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
