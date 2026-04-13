import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Solar System Capacity Calculator | Home & Office | Equaly',
  description: 'Calculate the required solar panel wattage and battery capacity for your home or office in Nepal based on your load or electricity bill.',
  keywords: ['solar calculator nepal', 'solar panel capacity', 'battery backup calculator', 'solar power estimator', 'renewable energy nepal'],
  openGraph: {
    title: 'Solar System Capacity Calculator | Equaly',
    description: 'Estimate your solar power needs easily.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Fsolar-og.png?alt=media'],
  }
};

export default function SolarCalculatorPage() {
  return <Calculator />;
}
