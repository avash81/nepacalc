import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Land Converter | Ropani-Aana to Bigha-Kattha | NepaCalc",
  description: "Official Nepal land area converter. Convert Ropani, Aana, Paisa, Daam to Bigha, Kattha, Dhur and Square Feet/Meters. Precise Lalpurja measurements.",
  slug: 'nepal-land',
  keywords: ["nepal land converter", "ropani to sq ft", "bigha to sq ft", "aana to sq ft", "land area calculator nepal"],
});

export default function Page() { 
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

