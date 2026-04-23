import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Home Loan EMI Calculator Nepal | NRB Base Rate NepaCalc",
  description: "Professional banking EMI calculator for Nepal. Calculates using the 'Base Rate + Premium' model mandated by NRB for commercial banks.",
  slug: 'nepal-home-loan',
  keywords: ["home loan nepal", "emi calculator nepal", "nrb base rate", "nepal bank interest rates", "housing loan calculator kathmandu"],
});
export default function Page() { return <Calculator />; }
