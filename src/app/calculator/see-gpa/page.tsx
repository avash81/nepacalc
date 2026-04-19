import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'SEE GPA Calculator 2081 — Nepal Grading System',
  description: 'Official SEE GPA calculator with the mandatory 35% theory pass rule and 75/25 distribution logic for Nepal.',
  keywords: ['see gpa calculator 2081', 'see result grade', 'nepal grading system', 'see theoritical pass mark',],

  openGraph: {
    title: 'SEE GPA Calculator 2081 — Nepal Grading System',
    description: 'Official SEE GPA calculator with the mandatory 35% theory pass rule and 75/25 distribution logic for Nepal.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEE GPA Calculator 2081 — Nepal Grading System',
    description: 'Official SEE GPA calculator with the mandatory 35% theory pass rule and 75/25 distribution logic for Nepal.',
  },
};

export default function Page() {
  return <Calculator />;
}
