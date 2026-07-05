import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Concrete Mix Calculator | Cement, Sand, Aggregate NepaCalc",
  description: "Professional civil engineering tool for estimating cement bags, sand, and aggregate requirements for various concrete grades (M5 to M25).",
  slug: 'concrete-mix',
  keywords: ["concrete mix calculator", "cement bag calculator", "sand and aggregate calculator", "m20 concrete mix ratio", "dry volume factor concrete", "civil engineering calculator nepal"],
});

const CONCRETE_FAQS = [
  {
    question: "What is the standard concrete mix ratio for house construction in Nepal?",
    answer: "For standard residential construction in Nepal, M20 grade concrete (1:1.5:3 ratio of cement:sand:aggregate) is most commonly used for slabs and beams. For footings and columns, M25 (1:1:2) is recommended for higher strength."
  },
  {
    question: "How many bags of cement are needed per cubic meter of M20 concrete?",
    answer: "For M20 grade concrete, approximately 8 bags (400 kg) of cement are required per cubic meter of finished concrete. Our calculator accounts for the 1.54 dry volume factor to give you the precise bag count."
  },
  {
    question: "What is the dry volume factor and why is it used?",
    answer: "The dry volume factor (1.54) compensates for the reduction in volume when dry materials are mixed with water and compacted. Dry ingredients take up approximately 54% more space than the finished wet concrete, so you must order more material than the final volume."
  },
  {
    question: "What is the difference between M15, M20, and M25 concrete?",
    answer: "The 'M' stands for Mix and the number represents compressive strength in N/mm² after 28 days. M15 (1:2:4) is used for non-structural work, M20 (1:1.5:3) for general structural work, and M25 (1:1:2) for high-load columns and foundations."
  },
  {
    question: "How much sand and aggregate is needed for a 100 sq ft slab in Nepal?",
    answer: "For a 100 sq ft slab with 4 inches thickness using M20 concrete, you need approximately 3.7 cu ft of concrete volume. This requires roughly 1 bag of cement, 1.5 cu ft sand, and 3 cu ft aggregate after applying the dry volume correction."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Concrete Mix Calculator"
        description="Professional civil engineering tool for estimating cement bags, sand, and aggregate requirements for various concrete grades (M5 to M25)."
        url="https://nepacalc.com/calculator/concrete-mix/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering/' },
          { name: 'Concrete Mix Calculator', item: 'https://nepacalc.com/calculator/concrete-mix/' }
        ]}
        faqs={CONCRETE_FAQS}
      />
      <Calculator />
    </>
  );
}
