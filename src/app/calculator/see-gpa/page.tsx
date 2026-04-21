import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'SEE GPA Calculator 2081 — Nepal Grading System',
  description: 'Official SEE GPA calculator with the mandatory 35% theory pass rule and 75/25 distribution logic for Nepal.',
  keywords: ['see gpa calculator 2081', 'see result grade', 'nepal grading system', 'see theoritical pass mark'],
  slug: 'see-gpa',
});

export default function Page() {
  return <Calculator />;
}
