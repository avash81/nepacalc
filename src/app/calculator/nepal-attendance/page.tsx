import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "TU/PU Attendance Tracker | Exam Eligibility NepaCalc",
  description: "Calculate your university attendance percentage and eligibility for end-semester exams. Based on the mandatory 75% minimum for Tribhuvan University (TU) and Pokhara University (PU).",
  slug: 'nepal-attendance',
  keywords: ["tu attendance calculator", "pu attendance rule", "75 percent attendance calculator", "nepal college attendance", "exam eligibility nepal"],
});
export default function Page() { return <Calculator />; }
