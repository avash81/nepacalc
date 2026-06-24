import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal VAT Calculator 2083/84 | 13% VAT Inclusive & Exclusive | NepaCalc",
  description: "Calculate 13% VAT in Nepal for FY 2083/84. Add or remove VAT from any amount. IRD-compliant VAT inclusive and exclusive calculations for businesses and consumers.",
  slug: 'nepal-vat',
  keywords: ["nepal vat calculator", "13 percent vat nepal", "vat calculator 2083", "ird nepal vat", "vat inclusive exclusive nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      
      <Calculator />
      
    </div>
  );
}

