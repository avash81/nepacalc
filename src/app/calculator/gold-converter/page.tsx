import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gold & Silver Laboratory — Nepal Tola to Gram Converter',
  description: 'Convert Gold & Silver price from Tola/Lal to Grams for Nepal jewelry market. Calculate 24K, 22K (Hallmarked) prices with Jyaala (making charges).',

  openGraph: {
    title: 'Gold & Silver Laboratory — Nepal Tola to Gram Converter',
    description: 'Convert Gold & Silver price from Tola/Lal to Grams for Nepal jewelry market. Calculate 24K, 22K (Hallmarked) prices with Jyaala (making charges).',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold & Silver Laboratory — Nepal Tola to Gram Converter',
    description: 'Convert Gold & Silver price from Tola/Lal to Grams for Nepal jewelry market. Calculate 24K, 22K (Hallmarked) prices with Jyaala (making charges).',
  },
};

export default function Page() {
  return <Calculator />;
}
