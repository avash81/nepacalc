import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Force Calculator (F=ma) | NEPACALC',
  description: 'Free online physics calculator for Newton\'s second law (F=ma). Find force, mass, or acceleration results instantly.',
  keywords: ['force', 'mass', 'acceleration', 'newton second law', 'physics solver', 'calculator'],
  slug: 'physics-force',
});

export default function Page() {
  return <Calculator />;
}
