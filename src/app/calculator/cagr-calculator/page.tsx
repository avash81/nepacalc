import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "CAGR Calculator | Annual Growth Rate Tool NepaCalc",
  description: "Calculate Compound Annual Growth Rate for any investment. Compare NEPSE stocks, FD, and real estate returns. Free CAGR tool for Nepal investors.",
  slug: 'cagr-calculator',
  keywords: ["cagr calculator", "compound annual growth rate", "investment growth calculator", "nepse cagr", "return on investment calculator nepal"],
});
export default function Page() { return <Calculator />; }

