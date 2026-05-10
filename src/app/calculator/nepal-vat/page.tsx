import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal VAT Calculator 13% | Value Added Tax Nepal NepaCalc",
  description: "Calculate 13% VAT for Nepal instantly. Add or remove VAT from any amount with support for 10% service charge. Updated for latest IRD tax regulations.",
  slug: 'nepal-vat',
  keywords: ["nepal vat calculator", "vat calculator 13%", "extract vat nepal", "service charge nepal", "vat act 2052", "ird tax calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

