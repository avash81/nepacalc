import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'LCM & GCF Calculator — Prime Factorization Steps',
  description: 'Calculate the Least Common Multiple (LCM) and Greatest Common Factor (GCF/HCF) for up to 5 numbers instantly. Step-by-step mathematical tool with prime factorization.',
  slug: 'lcm-gcf-calculator',
  keywords: ['lcm calculator', 'gcf calculator', 'hcf calculator', 'least common multiple', 'greatest common factor'],
});

export default function Page() {
  return <Calculator />;
}
