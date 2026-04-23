import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Provident Fund Calculator | EPF & Gratuity NepaCalc",
  description: "Calculate your total EPF corpus and gratuity under Nepal Labor Act 2074. Shows PF accumulation with compound interest and gratuity projections.",
  slug: 'nepal-provident-fund',
  keywords: ["nepal provident fund calculator", "epf calculator nepal", "pf gratuity nepal", "labor act 2074 pf", "ssf nepal calculator", "retirement fund nepal"],
});

export default function Page() { return <Calculator />; }
