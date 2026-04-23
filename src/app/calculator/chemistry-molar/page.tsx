import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Chemistry Molar Mass Calculator | Atomic Weight NepaCalc",
  description: "Professional molecular weight calculator. Supports complex formulas with nested parentheses and standard IUPAC atomic weights.",
  slug: 'chemistry-molar',
  keywords: ["molar mass calculator", "molecular weight calculator", "chemistry formula calculator", "atomic weight calculator", "molar mass of h2o", "iupac atomic weights"],
});
export default function Page() { return <Calculator />; }
