import { Metadata } from 'next';
import SilverCalculatorComponent from './Calculator';

export const metadata: Metadata = {
  title: 'Silver Converter Nepal (Gram, Tola, Lal) | Silver Value Calculator',
  description: 'Convert silver between Gram, Tola, Lal, Aana, Ratti and Troy Ounce using Nepal\'s official silver measurements. Instantly calculate silver value, purity, bullion weight and jewellery price using today\'s silver rate.',
  keywords: [
    'Silver Converter Nepal',
    'Silver Weight Converter',
    'Silver Value Calculator Nepal',
    'Silver Price Calculator',
    'Silver Tola Calculator',
    'Silver Gram Converter',
    'Silver Purity Calculator',
    'Silver Bullion Calculator Nepal',
    '999 Silver Calculator',
    '925 Silver Calculator',
    'Sterling Silver Calculator',
    'Fine Silver Converter',
    'Silver Investment Calculator',
    'Silver Jewellery Weight Calculator'
  ],
  alternates: {
    canonical: 'https://nepacalc.com/calculator/silver-converter/',
  },
  openGraph: {
    title: 'Silver Converter Nepal (Gram, Tola, Lal) | Silver Value Calculator',
    description: 'Convert silver between Gram, Tola, Lal, Aana, Ratti and Troy Ounce using Nepal\'s official silver measurements. Instantly calculate silver value, purity, bullion weight and jewellery price using today\'s silver rate.',
    url: 'https://nepacalc.com/calculator/silver-converter/',
    siteName: 'NepaCalc',
    locale: 'en_NP',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Silver Converter Nepal – Silver Value Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Converter Nepal (Gram, Tola, Lal) | Silver Value Calculator',
    description: 'Convert silver between Gram, Tola, Lal, Aana, Ratti and Troy Ounce. Instantly calculate silver value, purity, bullion weight and jewellery price.',
    images: ['https://nepacalc.com/og-image.png'],
  },
};

export default function SilverCalculatorPage() {
  return <SilverCalculatorComponent />;
}
