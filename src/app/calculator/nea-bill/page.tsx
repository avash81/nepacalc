import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "NEA Electricity Bill Calculator | Current Tariffs NepaCalc",
  description: "Professional slab-based bill estimation for Nepal Electricity Authority (NEA) domestic consumers. Accurate for the latest 2081/82 tariff schedules.",
  slug: 'nea-bill',
  keywords: ["nea bill calculator", "electricity bill nepal", "nea tariff 2081", "nea rate calculation", "nepal electricity authority bill"],
});
export default function Page() { return <Calculator />; }
