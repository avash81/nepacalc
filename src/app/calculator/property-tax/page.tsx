import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Property CGT Calculator | Capital Gains Tax NepaCalc",
  description: "Calculate Capital Gains Tax (CGT) on property sales in Nepal. Find out 5% vs 7.5% rates based on your holding period and Malpok regulations.",
  slug: 'property-tax',
  keywords: ["property cgt calculator nepal", "capital gains tax nepal", "house sale tax nepal", "nepal real estate tax", "malpok tax calculator"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

