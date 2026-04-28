import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Attendance Calculator | TU PU Exam Eligibility NepaCalc",
  description: "Check your exam eligibility for TU, PU, and NEB. Calculate how many classes you can miss or must attend to meet 75%, 80%, or 85% attendance requirements.",
  slug: 'attendance',
  keywords: ["attendance calculator", "tu attendance calculator", "exam eligibility nepal", "75 percent attendance calculator", "pu attendance tracker", "neb attendance"],
});
export default function Page() { return <Calculator />; }
