import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "FD Calculator Nepal | Fixed Deposit Maturity Tool NepaCalc",
  description: "Calculate Fixed Deposit maturity and interest earned at Nepal bank rates. Supports monthly, quarterly, and yearly compounding. Includes 5% TDS note.",
  slug: 'fd-calculator',
  keywords: ["fd calculator nepal", "fixed deposit maturity", "nepal bank fd rates", "fd interest calculator", "compound interest fd", "quarterly compounding nepal"],
});

export default function Page() { return <Calculator />; }
