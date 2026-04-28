import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Engineering Target CGPA Calculator | TU IOE, KU, PU NepaCalc",
  description: "Professional grade predictor for engineering students (TU IOE, PU, KU). Calculate the exact GPA needed in upcoming semesters to hit graduation targets.",
  slug: 'engineering-gpa',
  keywords: ["engineering gpa calculator", "tu ioe gpa calculator", "ku gpa calculator", "pu cgpa calculator", "target gpa calculator", "semester gpa predictor"],
});
export default function Page() { return <Calculator />; }
