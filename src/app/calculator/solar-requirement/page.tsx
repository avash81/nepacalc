import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Solar System Capacity Calculator | Home & Office | NEPACALC',
  description: 'Calculate the required solar panel wattage and battery capacity for your home or office in Nepal based on your load or electricity bill.',
  keywords: ['solar calculator nepal', 'solar panel capacity', 'battery backup calculator', 'solar power estimator', 'renewable energy nepal'],
  slug: 'solar-requirement',
});

export default function SolarCalculatorPage() {
  return <Calculator />;
}
