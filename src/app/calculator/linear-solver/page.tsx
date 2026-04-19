import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linear Equation Solver (2 & 3 Variables) | NEPACALC',
  description: 'Free online linear equation solver for systems with 2 or 3 unknown variables. Uses Cramer\'s rule for precise solutions.',
  keywords: ['linear equations', 'algebra solver', 'simultaneous equations', 'math solver', 'cramer rule'],

  openGraph: {
    title: 'Linear Equation Solver (2 & 3 Variables) | NEPACALC',
    description: 'Free online linear equation solver for systems with 2 or 3 unknown variables. Uses Cramer\'s rule for precise solutions.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linear Equation Solver (2 & 3 Variables) | NEPACALC',
    description: 'Free online linear equation solver for systems with 2 or 3 unknown variables. Uses Cramer\'s rule for precise solutions.',
  },
};

export default function Page() {
  return <Calculator />;
}
