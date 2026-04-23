import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Land Area Converter | Ropani Bigha SqFt NepaCalc",
  description: "Convert Nepal land measurements instantly. Ropani, Aana, Paisa, Daam (Hill system) to Bigha, Kattha, Dhur (Terai system), SqFt, and Acres.",
  slug: 'nepal-land',
  keywords: ["nepal land converter", "ropani to sqft", "bigha to kattha", "aana to sqft", "nepal land measurement calculator", "terai hill land conversion"],
});
export default function Page() { return <Calculator />; }
