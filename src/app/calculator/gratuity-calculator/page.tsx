import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Gratuity Calculator Nepal | Labor Act 2074 Rules NepaCalc",
  description: "Calculate your terminal benefits under Nepal Labor Act 2074. Check eligibility and compute mandatory 8.33% basic salary accumulations.",
  slug: 'gratuity-calculator',
  keywords: ["gratuity calculator nepal", "labor act 2074 gratuity", "ssf calculator nepal", "termination benefit nepal", "8.33 percent gratuity", "resignation payout nepal"],
});
export default function Page() { return <Calculator />; }

