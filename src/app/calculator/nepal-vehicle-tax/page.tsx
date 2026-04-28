import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Vehicle Tax Calculator | Blue Book Renewal NepaCalc",
  description: "Calculate your annual vehicle tax for motorbikes and cars in Nepal. Based on Bagmati Province slabs FY 2081/82. Includes penalty and insurance estimates.",
  slug: 'nepal-vehicle-tax',
  keywords: ["nepal vehicle tax calculator", "blue book renewal tax", "motorbike tax nepal", "car tax nepal 2081", "bagmati province vehicle tax", "pink book tax nepal"],
});
export default function Page() { return <Calculator />; }
