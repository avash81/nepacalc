import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Solar System Capacity Calculator | Home & Office | NEPACALC',
  description: 'Calculate the required solar panel wattage and battery capacity for your home or office in Nepal based on your load or electricity bill.',
  keywords: ['solar calculator nepal', 'solar panel capacity', 'battery backup calculator', 'solar power estimator', 'renewable energy nepal'],
  openGraph: {
    title: 'Solar System Capacity Calculator | NEPACALC',
    description: 'Estimate your solar power needs easily.',
    siteName: 'NEPACALC',
    url: 'https://nepacalc.com/calculator/solar-requirement',
    type: 'website',
  },
  alternates: { canonical: 'https://nepacalc.com/calculator/solar-requirement' },
};

export default function SolarCalculatorPage() {
  return <Calculator />;
}
