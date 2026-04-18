import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gratuity Calculator Nepal — Labor Act 2074 Benefits',
  description: 'Calculate your accumulated gratuity under Nepal Labor Act 2074. Professional retirement benefit estimation with 8.33% statutory logic.',
};

export default function Page() {
  return <Calculator />;
}
