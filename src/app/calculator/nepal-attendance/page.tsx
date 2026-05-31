import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "TU/PU Attendance Calculator Nepal | 75% Exam Eligibility | NepaCalc",
  description: "Calculate your Tribhuvan University, Pokhara University attendance percentage. Check if you meet the mandatory 75% attendance threshold for NEB/TU exams 2081/82.",
  slug: 'nepal-attendance',
  keywords: ["TU attendance calculator", "nepal attendance percentage", "75 percent attendance nepal", "exam eligibility attendance nepal"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

