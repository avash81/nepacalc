import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Vehicle Tax in Nepal 2083/84: Bluebook Renewal Calculator",
  description: "Calculate your annual vehicle tax in Nepal for FY 2083/84. Check the latest bluebook renewal fees, late penalty rates, and bike or car tax slabs.",
  slug: 'nepal-vehicle-tax',
  keywords: ["vehicle tax in nepal 2083/84", "vehicle tax calculator nepal", "bluebook renew calculator", "bike tax in nepal 2083/84", "car tax nepal 2083", "road tax calculator nepal", "bluebook renewal penalty calculation nepal"],
  ogImage: "https://nepacalc.com/assets/images/og-nepal-vehicle-tax-2083.jpg"
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4] min-h-screen">
      <Calculator />
    </div>
  );
}
