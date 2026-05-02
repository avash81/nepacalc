import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Land Area Calculator Ropani Aana Bigha Current FY",
  description: "Confused by your Lalpurja? Convert Ropani Aana and Bigha to Square Feet or Meters instantly. Accurate land measurements for Nepals latest zoning laws.",
  slug: 'nepal-land',
  keywords: [
    "nepal land area calculator", 
    "ropani to sqft", 
    "bigha to kattha", 
    "aana to sqft", 
    "aana to sq m",
    "kattha to aana",
    "nepal land measurement calculator", 
    "ropani aana paisa daam", 
    "bigha kattha dhur",
    "malpot calculator nepal",
    "lalpurja conversion"
  ],
});

export default function Page() { 
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}
