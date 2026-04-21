import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Gratuity Calculator Nepal — Labor Act 2074 Benefits',
  description: 'Calculate your accumulated gratuity under Nepal Labor Act 2074. Professional retirement benefit estimation with 8.33% statutory logic.',
  keywords: ['gratuity calculator nepal', 'labor act 2074', 'retirement benefit calculator', 'calculate gratuity nepal'],
  slug: 'gratuity-calculator',
});

export default function Page() {
  return <Calculator />;
}
