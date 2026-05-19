import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "SEE GPA Calculator Nepal 2083 | NEB Grade to GPA | NepaCalc",
  description: "Convert SEE grades to GPA using Nepal's official NEB grading scale. Enter marks for each subject, get overall GPA instantly. Updated 2083/84 NEB system.",
  slug: 'see-gpa',
  keywords: ["see gpa calculator nepal", "neb grading system", "see grade to gpa", "see result 2083"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

