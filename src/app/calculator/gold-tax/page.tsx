import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Gold Tax Calculator Nepal 2083/84 | VAT & Making Charges | NepaCalc",
  description: "Calculate the total price of gold in Nepal including 13% VAT and making charges. Official FENEGOSIDA price standards for 2083/84.",
  slug: 'gold-tax',
  keywords: ["gold tax calculator nepal", "gold vat calculator nepal", "gold making charges calculator", "nepal gold price with tax", "jewelry tax nepal"],
});

export default function Page() {
  return <Calculator />;
}
