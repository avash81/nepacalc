import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "SEE GPA Calculator 2083 | Nepal Grading System 2026 | NepaCalc",
  description: "Calculate your SEE GPA for 2083/2026 using Nepal's official NEB grading scale. Understand the 35% theory rule and NG results. Accurate GPA converter.",
  slug: 'see-gpa',
  keywords: ["see gpa calculator 2083", "nepal grading system 2026", "how to calculate gpa nepal", "see result 2083 marksheet", "neb grading system", "see ng results"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

