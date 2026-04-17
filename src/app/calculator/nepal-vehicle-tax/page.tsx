import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Nepal Vehicle Tax Calculator (Blue Book Renewal Tax Tool)',
  description: 'Calculate your annual vehicle (road) tax for bikes and cars in Nepal. Up-to-date slabs for Bagmati and other provinces for FY 2081/82 and 2082/83.',
  slug: 'nepal-vehicle-tax',
  keywords: ['nepal vehicle tax calculator', 'blue book renewal cost nepal', 'bike tax nepal', 'car tax nepal cc'],
});

export default function Page() {
  return <Calculator />;
}
