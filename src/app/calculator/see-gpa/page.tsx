import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "SEE GPA Calculator Nepal 2082 | NEB Grade to GPA | NepaCalc",
  description: "Convert your SEE grades to GPA using Nepal's official NEB grading scale. Enter marks for each subject and get your overall GPA instantly. 2082 NEB system.",
  slug: 'see-gpa',
  keywords: ["see gpa", "see gpa calculator nepal", "neb grading system nepal", "see grade 2082", "gpa calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

