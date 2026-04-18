import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Registration & Stamp Duty Calculator — Nepal Malpok Tax',
  description: 'Calculate property registry fees in Nepal. Supports metropolitan vs rural tiers and 25-30% female ownership discounts.',
};

export default function Page() {
  return <Calculator />;
}
