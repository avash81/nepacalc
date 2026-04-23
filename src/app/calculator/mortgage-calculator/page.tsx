import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Mortgage Calculator Nepal | Home Loan EMI Tool NepaCalc",
  description: "Calculate full monthly mortgage payment including P&I, property tax, and insurance. Based on Nepal bank home loan rates. Compare tenure and down payment.",
  slug: 'mortgage-calculator',
  keywords: ["mortgage calculator nepal", "home loan emi calculator", "nepal home loan calculator", "property loan emi nepal", "housing loan calculator", "nrb home loan"],
});
export default function Page() { return <Calculator />; }
