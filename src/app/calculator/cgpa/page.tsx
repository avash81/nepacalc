import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "CGPA Calculator | Cumulative Grade Point Average NepaCalc",
  description: "Calculate your Cumulative GPA (CGPA) instantly. Supports credit-weighted averaging for TU, KU, PU, and international universities. Free online academic tool.",
  slug: 'cgpa',
  keywords: ["cgpa calculator", "calculate cumulative gpa", "gpa weighted average", "university gpa calculator nepal", "tu cgpa calculator", "ku cgpa calculator", "gpa to percentage nepal"],
});

export default function Page() {
  return <Calculator />;
}

