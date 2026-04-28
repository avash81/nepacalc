import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Logarithm Calculator | Custom Base, ln, log10 NepaCalc",
  description: "Calculate the logarithm of any number with any base. Easily compute log10, natural log (ln), log2, and custom bases.",
  slug: 'logarithm-calculator',
  keywords: ["logarithm calculator", "log base calculator", "natural log calculator", "ln calculator", "log10 calculator", "change of base formula"],
});
export default function Page() { return <Calculator />; }
