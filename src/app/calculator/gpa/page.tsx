import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "GPA Calculator | Semester Grade Point Average NepaCalc",
  description: "Calculate your semester GPA instantly. Supports Nepal NEB/TU and US grading systems. Free online tool for students to track academic performance.",
  slug: 'gpa',
  keywords: ["gpa calculator", "calculate semester gpa", "neb grading calculator", "tu gpa calculator", "us grading scale", "student gpa tool nepal"],
});

export default function Page() {
  return <Calculator />;
}
