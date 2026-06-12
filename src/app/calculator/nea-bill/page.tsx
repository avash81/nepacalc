import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Electricity Bill Calculator 2083/84 | NepaCalc",
  description: "Calculate your Nepal Electricity Authority utility bill instantly. Check the official price of 1 unit of electricity in Nepal 2083, progressive 5A–60A meter tariff slabs, and step-by-step billing rules.",
  slug: 'nea-bill',
  keywords: [
    "NEA electricity bill calculator", 
    "nea calculator", 
    "nepal electricity bill rate 2083", 
    "1 unit electricity cost in nepal calculator",
    "how to calculate electricity bill from meter reading in nepal",
    "50 unit electricity bill in nepal"
  ],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

