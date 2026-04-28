import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Concrete Mix Calculator | Cement, Sand, Aggregate NepaCalc",
  description: "Professional civil engineering tool for estimating cement bags, sand, and aggregate requirements for various concrete grades (M5 to M25).",
  slug: 'concrete-mix',
  keywords: ["concrete mix calculator", "cement bag calculator", "sand and aggregate calculator", "m20 concrete mix ratio", "dry volume factor concrete", "civil engineering calculator nepal"],
});
export default function Page() { return <Calculator />; }
