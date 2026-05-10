import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Fraction Calculator | Add, Subtract, Simplify Fractions NepaCalc",
  description: "Add, subtract, multiply, and divide fractions and mixed numbers. Get results automatically as simplified fractions, decimals, and percentages.",
  slug: 'fraction-calculator',
  keywords: ["fraction calculator", "simplify fractions", "add mixed numbers", "multiply fractions", "fraction to decimal", "improper fraction converter"],
});
export default function Page() { return <Calculator />; }

