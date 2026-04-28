import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Length & Distance Converter | m, km, miles, feet NepaCalc",
  description: "Convert seamlessly between meters, kilometers, miles, feet, inches and more with engineering-grade decimal precision.",
  slug: 'length-converter',
  keywords: ["length converter", "distance converter", "km to miles", "meters to feet", "cm to inches converter", "metric imperial conversion"],
});
export default function Page() { return <Calculator />; }
