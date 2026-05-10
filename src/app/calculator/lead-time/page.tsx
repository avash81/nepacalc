import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Lead Time Calculator | Logistics & Shipping NepaCalc",
  description: "Calculate expected delivery schedules or required order dates based on logistics lead time metrics. Automatically handles weekend business day exclusions.",
  slug: 'lead-time',
  keywords: ["lead time calculator", "delivery date calculator", "order date calculator", "business days calculator", "supply chain calculator", "shipping lead time"],
});
export default function Page() { return <Calculator />; }

