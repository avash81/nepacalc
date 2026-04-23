import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Property Registration Calculator Nepal | Lalpurja Tax NepaCalc",
  description: "Calculate Malpok property registration fees and stamp duty in Nepal. Includes rural and urban rates with automatic female ownership discounts.",
  slug: 'property-registration',
  keywords: ["property registration calculator nepal", "lalpurja tax nepal", "malpok calculator", "female discount property nepal", "stamp duty nepal", "land tax calculator nepal"],
});
export default function Page() { return <Calculator />; }
