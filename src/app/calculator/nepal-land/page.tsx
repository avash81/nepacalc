import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Land Area Converter | Ropani-Aana to Bigha-Kattha NepaCalc",
  description: "Accurate land measurement converter for Nepal. Convert between Ropani, Aana, Paisa, Daam and Bigha, Kattha, Dhur. Supports Sq. Ft and Sq. Meters. Try NepaCalc now.",
  slug: 'nepal-land',
  keywords: ["nepal land converter", "ropani to sqft", "bigha to kattha", "aana to sqft", "nepal land measurement calculator", "ropani aana paisa daam", "bigha kattha dhur"],
});

export default function Page() { 
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}
