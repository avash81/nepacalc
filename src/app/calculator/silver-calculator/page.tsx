import { Metadata } from 'next';
import SilverCalculatorComponent from './Calculator';

export const metadata: Metadata = {
  title: 'Silver Converter Nepal – Convert Tola, Lal, Gram & Silver Price | NepaCalc',
  description: 'Free online Silver Converter Nepal. Convert silver weights between Tola, Gram, Lal, Aana, Ratti, Kg, and Troy Ounce. Calculate live silver prices in NPR with 999 Fine & 925 Sterling purity.',
  keywords: [
    'silver converter nepal',
    'silver unit converter',
    'chandi converter',
    'tola to gram silver',
    'gram to tola silver',
    'lal to gram',
    'silver price calculator nepal',
    'silver weight calculator',
    '925 sterling silver converter',
    'troy ounce to tola',
    'NepaCalc'
  ],
  alternates: {
    canonical: 'https://nepacalc.com/calculator/silver-calculator/',
  },
  openGraph: {
    title: 'Silver Converter Nepal – Convert Tola, Lal, Gram & Silver Price | NepaCalc',
    description: 'Convert silver weights between Tola, Gram, Lal, Aana, Ratti, Kg, and Troy Ounce. Calculate live silver prices in NPR with 999 & 925 purity.',
    url: 'https://nepacalc.com/calculator/silver-calculator/',
    siteName: 'NepaCalc',
    locale: 'en_NP',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Silver Converter Nepal NepaCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Converter Nepal – Convert Tola, Lal, Gram & Silver Price | NepaCalc',
    description: 'Convert silver weights between Tola, Gram, Lal, Aana, Ratti, Kg, and Troy Ounce.',
    images: ['https://nepacalc.com/og-image.png'],
  },
};

export default function SilverCalculatorPage() {
  return <SilverCalculatorComponent />;
}
