import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Simple Interest Calculator | Easy SI Tool NepaCalc",
  description: "Calculate simple interest and total amount instantly using the P×R×T formula. Perfect for basic loans, savings, and financial math problems in Nepal.",
  slug: 'simple-interest',
  keywords: ["simple interest calculator", "calculate si online", "interest formula tool", "loan interest calculator nepal", "savings interest calculator", "simple interest vs compound"],
});

export default function Page() {
  return <Calculator />;
}
