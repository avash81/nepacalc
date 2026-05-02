import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "SEE GPA Calculator 2081 | Secondary Education Examination Nepal",
  description: "Calculate your SEE GPA online based on the latest 2081 grading system in Nepal. Convert marks to grades for all subjects instantly. Official NEB standards.",
  slug: 'see-gpa',
  keywords: ["see gpa calculator", "calculate see results", "see grading system nepal", "neb see gpa", "convert see marks to gpa", "secondary education examination"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}
