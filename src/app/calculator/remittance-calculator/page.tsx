import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Remittance Calculator Nepal | Highest Exchange Rate Tracker NepaCalc",
  description: "Compare remittance rates from Western Union, IME, and Banks in Nepal. Calculate net NPR received with latest exchange rates and IPO quota benefits.",
  slug: 'remittance-calculator',
  keywords: ["remittance calculator nepal", "highest exchange rate nepal", "ime remittance rate", "western union nepal rate", "remittance ipo quota", "send money to nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

