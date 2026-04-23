import { calcMeta } from '@/lib/calcMeta';
import WeightCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Weight Converter | Kilograms, Pounds & Tolas Online Nepal NepaCal",
  description: "Convert between kg, lbs, grams, and traditional Nepal weight units instantly. Professional weight conversion tool for commerce and home use.",
  slug: 'weight-converter',
  keywords: ["weight converter nepal", "convert kg to lbs", "gram to kg calculator", "tola to gram converter", "mass converter tool", "measurement tool nepal"],
});

const WEIGHT_FAQS = [
  {
    question: "What units of weight are used in Nepal?",
    answer: "Nepal uses the Metric system (grams, kilograms) for official use. However, traditional units like Dharni (approx 2.39kg) and Pau (250g) are still common in local vegetable markets."
  },
  {
    question: "How many pounds are in a kilogram?",
    answer: "One kilogram is approximately equal to 2.20462 pounds. Our converter uses high-precision decimals for commercial-grade accuracy."
  },
  {
    question: "Difference between Kilogram and Metric Ton?",
    answer: "One metric ton equals exactly 1,000 kilograms. This is used for measuring bulk commodities like cement and grains in Nepal's trade."
  },
  {
    question: "How do I convert Grams to Ounces?",
    answer: "Multiply the number of grams by 0.03527. Our tool automates this for cooking, jewelry, and postage calculations."
  },
  {
    question: "Is this accurate for gold weighing?",
    answer: "While our tool is highly precise, gold in Nepal is measured in Tolas (approx 11.66g). For jewelry, we recommend our dedicated 'Gold Converter' tool for maximum precision."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Mass & Weight Engine"
        description="High-precision unit converter for transforming between international and traditional mass standards with absolute numerical accuracy."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Weight Converter' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Unit Converter', slug: 'unit-converter' },
          { name: 'Length Converter', slug: 'length-converter' },
          { name: 'BMI Calculator', slug: 'bmi' }
        ]}
        formula="1 Kg = 2.20462 Lbs [Metric Standard]"
      >
        <WeightCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Measurement Guide: Mass & Weight
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Accurate <strong>mass determination</strong> is a pillar of international trade, scientific research, and daily consumer life in Nepal.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Gravimetric Analysis Laboratory</strong> provides the precision required for high-stakes conversions. Whether you are a merchant in Nepal converting <strong>kilograms to metric tons</strong> for freight or a cook converting grams to ounces, our engine applies internationally verified mass constants to ensure every conversion is flawless and instantaneous.
              </p>
            </div>

            <PillarFAQ faqs={WEIGHT_FAQS} title="Weight & Mass Conversion FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
