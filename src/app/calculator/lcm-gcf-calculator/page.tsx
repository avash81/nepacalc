import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "LCM & GCF Calculator | Prime Factorization NepaCalc",
  description: "Calculate the Least Common Multiple (LCM) and Greatest Common Factor (GCF) for any set of numbers, complete with prime factorization steps.",
  slug: 'lcm-gcf-calculator',
  keywords: ["lcm calculator", "gcf calculator", "hcf calculator", "prime factorization", "least common multiple", "greatest common factor"],
});
export default function Page() { return <Calculator />; }
