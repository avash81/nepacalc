import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Land Area Converter | Ropani Aana Bigha Kattha | NepaCalc",
  description: "Convert Nepal land measurements instantly. Ropani, Aana, Paisa, Bigha, Kattha, Dhur to Sq Ft and Sq Meter. Survey Dept standards. Hilly and Terai systems.",
  slug: 'nepal-land',
  keywords: ["nepal land area converter", "ropani to aana", "bigha to kattha", "nepal land units"],
});

export default function Page() { 
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

