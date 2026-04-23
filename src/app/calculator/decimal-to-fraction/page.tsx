import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Decimal to Fraction Converter | Simplify Mixed Numbers NepaCalc",
  description: "Instantly convert any decimal number into its simplest fractional form and mixed number equivalent. Highly precise for repeating and standard decimals.",
  slug: 'decimal-to-fraction',
  keywords: ["decimal to fraction converter", "simplify fractions", "convert decimal to mixed number", "0.75 as a fraction", "repeating decimal to fraction", "math calculator"],
});
export default function Page() { return <Calculator />; }
