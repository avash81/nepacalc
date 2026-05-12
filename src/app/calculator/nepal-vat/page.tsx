import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal VAT Calculator 13% | Inclusive & Exclusive Tax | NepaCalc",
  description: "Calculate 13% Value Added Tax (VAT) in Nepal instantly. Reverse VAT from total amount, add 10% service charge, and generate tax invoices. 100% IRD compliant.",
  slug: 'nepal-vat',
  keywords: ["nepal vat calculator", "vat calculator 13%", "extract vat nepal", "service charge nepal", "vat act 2052 nepal", "ird tax calculator nepal", "reverse vat calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

