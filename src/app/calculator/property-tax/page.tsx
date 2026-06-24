import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Property Tax & CGT Calculator 2083/84 | NepaCalc",
  description: "Calculate Capital Gains Tax (CGT) on property sales and annual property tax in Nepal for FY 2083/84. Covers 5% vs 7.5% CGT rates and local wada taxes.",
  slug: 'property-tax',
  keywords: ["property tax calculator nepal 2083", "capital gains tax nepal", "house sale tax nepal", "nepal real estate tax", "malpot tax calculator"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      
      <Calculator />
      
    </div>
  );
}

