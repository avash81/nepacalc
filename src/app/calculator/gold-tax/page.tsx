import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Gold Tax Calculator Nepal 2083/84 | VAT, Making Charges & Import Duty | NepaCalc",
  description: "Calculate total gold price in Nepal for 2083/84 including 13% VAT, making charges, and import customs duty. Covers 24K, 22K Hallmark gold. FENEGOSIDA rates.",
  slug: 'gold-tax',
  keywords: ["gold tax nepal", "gold vat nepal 2083", "gold import duty nepal", "gold price with tax nepal", "gold making charge calculator"],
});

export default function Page() {
  return <Calculator />;
}
