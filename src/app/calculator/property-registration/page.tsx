import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Property Registration & Stamp Duty Calculator — Nepal Malpok Tax',
  description: 'Calculate property registry fees in Nepal. Supports metropolitan vs rural tiers and 25-30% female ownership discounts.',
  keywords: ['property registration', 'malpok tax', 'land registry fee', 'nepal land tax', 'stamp duty', 'female ownership discount'],
  slug: 'property-registration',
});

export default function Page() {
  return <Calculator />;
}
