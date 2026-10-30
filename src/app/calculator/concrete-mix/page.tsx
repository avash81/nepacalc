import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Concrete Mix Calculator | Cement Bags, Sand & Aggregate for M5–M25 – NepaCalc",
  description: "Calculate the exact number of cement bags, cubic feet of sand, and aggregate required for any concrete grade (M5 to M25). Accounts for the 1.54 dry volume factor and wastage.",
  slug: 'concrete-mix',
  keywords: ["concrete mix calculator", "cement bag calculator nepal", "m20 concrete ratio", "sand aggregate quantity calculator", "dry volume factor", "civil engineering calculator nepal"],
});

const CONCRETE_FAQS = [
  {
    question: "What is the standard concrete mix ratio for house construction in Nepal?",
    answer: "For standard residential construction in Nepal, M20 grade concrete (1:1.5:3 — cement:sand:aggregate) is used for slabs and beams. For columns and footings under high load, M25 (1:1:2) is preferred. M15 (1:2:4) is used for non-structural elements like plinth filling."
  },
  {
    question: "How many bags of cement are needed per cubic meter of M20 concrete?",
    answer: "For M20 grade, approximately 8 bags (400 kg) of cement are needed per cubic meter of finished concrete. This calculator applies the 1.54 dry volume factor automatically to account for the volume reduction when dry materials are mixed with water."
  },
  {
    question: "What is the dry volume factor (1.54) and why is it needed?",
    answer: "When dry cement, sand, and aggregate are mixed with water and compacted, the volume reduces by about 35%. To compensate, you must order 1.54× the wet volume in dry materials. Without this correction, you would under-order materials and run short mid-pour."
  },
  {
    question: "What does the 'M' number in concrete grades mean?",
    answer: "The 'M' stands for Mix and the number is the compressive strength in N/mm² (Newtons per square millimeter) after 28 days of curing. M20 concrete achieves 20 N/mm² — enough for most residential structural work. M25 achieves 25 N/mm² for higher-load applications."
  },
  {
    question: "How much material is needed for a 100 sq ft slab at 4 inches thickness in Nepal?",
    answer: "A 100 sq ft × 4 inch thick slab has a wet volume of approximately 3.7 cu ft (0.105 m³). Using M20 mix, after applying the 1.54 dry factor, you need roughly 1 cement bag (50 kg), 1.5 cu ft sand, and 3 cu ft aggregate — before adding any wastage allowance."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Concrete Mix Calculator"
        description="Calculate cement bags, sand, and aggregate required for any concrete grade from M5 to M25, with dry volume factor and wastage adjustment."
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

      {/* Content section — server rendered */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Grade reference table */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
            Concrete Grade Reference (M5 to M25)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Mix Ratio (C:S:A)</th>
                  <th className="px-4 py-3">Strength (N/mm²)</th>
                  <th className="px-4 py-3">Cement Bags / m³</th>
                  <th className="px-4 py-3">Typical Use in Nepal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">M5</td><td className="px-4 py-3 font-mono">1:5:10</td><td className="px-4 py-3">5</td><td className="px-4 py-3">~2.8</td><td className="px-4 py-3 text-[#5F6368]">Mass concrete, blinding layers</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">M7.5</td><td className="px-4 py-3 font-mono">1:4:8</td><td className="px-4 py-3">7.5</td><td className="px-4 py-3">~3.6</td><td className="px-4 py-3 text-[#5F6368]">Plain concrete, rubble masonry</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">M10</td><td className="px-4 py-3 font-mono">1:3:6</td><td className="px-4 py-3">10</td><td className="px-4 py-3">~4.4</td><td className="px-4 py-3 text-[#5F6368]">Lean concrete, non-structural floors</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">M15</td><td className="px-4 py-3 font-mono">1:2:4</td><td className="px-4 py-3">15</td><td className="px-4 py-3">~6.3</td><td className="px-4 py-3 text-[#5F6368]">Pathways, compound walls, plinth filling</td></tr>
                <tr className="hover:bg-[#fcfcfc] bg-blue-50/40"><td className="px-4 py-3 font-mono font-bold text-blue-700">M20 ★</td><td className="px-4 py-3 font-mono">1:1.5:3</td><td className="px-4 py-3">20</td><td className="px-4 py-3 font-bold">~8.0</td><td className="px-4 py-3 text-[#5F6368]">Slabs, beams — standard residential use</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">M25</td><td className="px-4 py-3 font-mono">1:1:2</td><td className="px-4 py-3">25</td><td className="px-4 py-3">~10.7</td><td className="px-4 py-3 text-[#5F6368]">Columns, high-load footings, bridges</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#5F6368] mt-3">★ M20 is the most commonly specified grade for residential construction across Nepal.</p>
        </section>

        {/* How the calculation works */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-500 pl-3 mb-6">
            How the Calculation Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: '1', title: 'Wet Volume Input', body: 'Enter the volume of concrete you need in cubic meters or cubic feet (length × width × thickness of the slab or structural element).' },
              { step: '2', title: 'Apply Dry Volume Factor', body: 'Multiply wet volume by 1.54. This accounts for the ~35% volume loss when dry materials compact during mixing. Skipping this leads to material shortfall mid-pour.' },
              { step: '3', title: 'Add Wastage', body: 'A 5–10% wastage buffer is added for spillage, over-mixing, and uneven surfaces. Higher for complex formwork shapes, lower for flat slabs.' },
            ].map(({ step, title, body }) => (
              <div key={step} className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                <div className="w-7 h-7 rounded-full bg-[#1A73E8] text-white text-xs font-black flex items-center justify-center mb-3">{step}</div>
                <h4 className="font-bold text-[#202124] text-sm mb-2">{title}</h4>
                <p className="text-xs text-[#5F6368] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 bg-[#E8F0FE] border border-[#D2E3FC] rounded-lg">
            <p className="text-xs text-[#1967D2] font-bold">
              Formula: Cement (bags) = [Wet Volume × Dry Factor × (1 + Wastage%) × (Cement ratio / Sum of ratios)] ÷ 0.0347 m³/bag
            </p>
          </div>
        </section>

        {/* Wastage guide */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-orange-500 pl-3 mb-6">
            Wastage Percentage Guide
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Work Type</th>
                  <th className="px-4 py-3">Recommended Wastage</th>
                  <th className="px-4 py-3">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Flat RCC slab (machine mixed)</td><td className="px-4 py-3 font-bold text-emerald-600">3–5%</td><td className="px-4 py-3 text-[#5F6368]">Clean pour, minimal spillage</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Columns and beams</td><td className="px-4 py-3 font-bold text-blue-600">5–7%</td><td className="px-4 py-3 text-[#5F6368]">Narrow formwork, some spillage</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Hand-mixed concrete</td><td className="px-4 py-3 font-bold text-orange-600">8–10%</td><td className="px-4 py-3 text-[#5F6368]">Less precise batching</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Foundation / footing</td><td className="px-4 py-3 font-bold text-orange-600">7–10%</td><td className="px-4 py-3 text-[#5F6368]">Irregular excavation edges absorb extra</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-purple-500 pl-3 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {CONCRETE_FAQS.map((faq, i) => (
              <div key={i} className="p-5 border border-[#DADCE0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#202124] text-sm">{faq.question}</h4>
                <p className="text-sm text-[#5F6368] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
