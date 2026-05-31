import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Remittance Calculator 2083 | Best Exchange Rate Tracker | NepaCalc",
  description: "Find the best exchange rate for remittance to Nepal in 2083. Compare Western Union, IME, Prabhu Money, and bank rates. Calculate exact NPR received from USD, AED, QAR, SAR.",
  slug: 'remittance-calculator',
  keywords: ["remittance calculator nepal", "best exchange rate nepal", "ime western union compare nepal", "send money nepal rate 2083"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

