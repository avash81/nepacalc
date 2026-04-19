import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Matrix Calculator (2x2 & 3x3) | NEPACALC',
  description: 'Free online matrix calculator for determinant, trace, and inverse calculations of 2x2 and 3x3 matrices. Step-by-step results.',
  keywords: ['matrix', 'determinant', 'trace', 'inverse matrix', 'matrix math', 'calculator'],

  openGraph: {
    title: 'Matrix Calculator (2x2 & 3x3) | NEPACALC',
    description: 'Free online matrix calculator for determinant, trace, and inverse calculations of 2x2 and 3x3 matrices. Step-by-step results.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matrix Calculator (2x2 & 3x3) | NEPACALC',
    description: 'Free online matrix calculator for determinant, trace, and inverse calculations of 2x2 and 3x3 matrices. Step-by-step results.',
  },
};

export default function Page() {
  return <Calculator />;
}
