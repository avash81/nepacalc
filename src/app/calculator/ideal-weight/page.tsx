import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Ideal Weight Calculator | Healthy Weight Range NepaCalc",
  description: "Calculate your ideal healthy weight using the Devine, Robinson, and Miller formulas. Get your target weight in kg and lbs instantly. Try NepaCalc for precise health tools.",
  slug: 'ideal-weight',
  keywords: ["ideal weight calculator", "healthy weight range", "divine formula calculator", "target weight calculator", "normal weight for height", "nepal healthy weight"],
});

export default function Page() { 
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

