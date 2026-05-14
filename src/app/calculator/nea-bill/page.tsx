import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Electricity Bill Calculator Nepal 2082/83 | NepaCalc",
  description: "Calculate your Nepal electricity bill using NEA's official 2082/83 slab rates. Supports 5A, 15A, 30A and 60A meters. Shows energy cost, fixed charge, VAT and late payment penalty.",
  slug: 'nea-bill',
  keywords: ["nea bill calculator", "electricity bill calculator nepal", "nea billing", "1 unit electricity cost in nepal 2082", "how to calculate electricity bill in nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

