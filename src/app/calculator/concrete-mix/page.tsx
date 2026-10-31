import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Concrete Mix Calculator | Cement Bags, Sand & Aggregate for M5–M25 – NepaCalc",
  description: "Calculate cement bags, sand CFT, coarse aggregate CFT, and tractor trolley loads for concrete grades M5 to M25. Automatically accounts for the 1.54 dry volume factor and site wastage.",
  slug: 'concrete-mix',
  keywords: ["concrete mix calculator", "cement bag calculator nepal", "m20 concrete ratio", "sand aggregate quantity calculator", "dry volume factor 1.54", "civil engineering calculator nepal", "tractor load sand aggregate"],
});

const CONCRETE_FAQS = [
  {
    question: "What is the standard concrete mix grade used for residential house slabs in Nepal?",
    answer: "In Nepal, residential RCC slabs and beams almost universally specify M20 grade (nominal ratio 1 : 1.5 : 3 of cement : sand : aggregate). For columns, heavily loaded shear walls, and footings, structural engineers often recommend M25 (1 : 1 : 2). Non-structural elements like plinth soling, compound walls, or floor leveling use leaner mixes such as M10 or M15."
  },
  {
    question: "How many cement bags are required per cubic meter (m³) of M20 concrete?",
    answer: "For standard M20 nominal mix (1:1.5:3), approximately 8.0 to 8.2 bags (50 kg each) of cement are required per cubic meter of finished wet concrete. This calculation includes the mandatory 1.54 dry volume expansion factor before adding any contractor site wastage allowance."
  },
  {
    question: "What is the dry volume factor (1.54) and why must it be applied?",
    answer: "When dry cement, sand, and aggregate are mixed with water and compacted on site, the dry granules settle into each other's voids, shrinking the total volume by roughly 33% to 35%. Therefore, you must order 1.54 cubic meters of dry materials for every 1.0 cubic meter of solid compacted concrete desired. Ordering based on wet volume alone results in running out of concrete mid-pour."
  },
  {
    question: "How much material is needed for a 100 sq. ft. slab with 4 inches thickness in Nepal?",
    answer: "A 100 sq. ft. slab at 4 inches (0.333 ft) thickness has a wet volume of 33.33 cubic feet (0.944 m³). Applying the 1.54 dry volume factor yields 51.33 CFT of dry mix. For standard M20 concrete (1:1.5:3): you need approximately 7.5 to 8 bags of cement (50 kg), 14 cubic feet of sand (~0.14 tractor trolley), and 28 cubic feet of aggregate (~0.28 tractor trolley), plus roughly 5% extra for formwork wastage."
  },
  {
    question: "How much sand and aggregate (rodi) fit into a standard tractor trolley in Nepal?",
    answer: "In Kathmandu, Pokhara, and across Nepal, local supply yards measure aggregates by the tractor trolley or tipper truck. A standard two-wheel drive tractor trolley holds approximately 100 to 110 CFT (cubic feet) of sand or crushed stone. A larger 6-wheeler tipper truck typically carries 300 to 350 CFT."
  },
  {
    question: "What is the recommended water-cement ratio for hand-mixed or machine-mixed concrete?",
    answer: "The recommended water-cement ratio by weight is between 0.45 and 0.55. For every 50 kg bag of cement, you need approximately 25 to 27 liters of clean water. Adding excessive water makes concrete easier to pour but drastically reduces its 28-day compressive strength and causes shrinkage cracks."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Concrete Mix Calculator"
        description="Calculate cement bags, sand CFT, aggregate CFT, tractor loads, and mixing water for concrete grades from M5 to M25 with the 1.54 dry factor."
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

      {/* Practical Civil Engineering Reference */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Concrete Grades Table */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
            Standard Concrete Grades & Mix Proportions (IS 456 / NBC)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Mix Ratio (C : S : A)</th>
                  <th className="px-4 py-3">28-Day Strength</th>
                  <th className="px-4 py-3">Cement Bags / m³</th>
                  <th className="px-4 py-3">Typical Application in Nepal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">M5</td><td className="px-4 py-3 font-mono">1 : 5 : 10</td><td className="px-4 py-3">5 N/mm²</td><td className="px-4 py-3">~2.8</td><td className="px-4 py-3 text-[#5F6368]">Mass concrete, mud mat foundation base</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">M7.5</td><td className="px-4 py-3 font-mono">1 : 4 : 8</td><td className="px-4 py-3">7.5 N/mm²</td><td className="px-4 py-3">~3.6</td><td className="px-4 py-3 text-[#5F6368]">Plain cement concrete (PCC), stone masonry bedding</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">M10</td><td className="px-4 py-3 font-mono">1 : 3 : 6</td><td className="px-4 py-3">10 N/mm²</td><td className="px-4 py-3">~4.4</td><td className="px-4 py-3 text-[#5F6368]">Sub-base flooring, compound perimeter walls</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">M15</td><td className="px-4 py-3 font-mono">1 : 2 : 4</td><td className="px-4 py-3">15 N/mm²</td><td className="px-4 py-3">~6.3</td><td className="px-4 py-3 text-[#5F6368]">Non-structural slabs, walkways, plinth filling</td></tr>
                <tr className="hover:bg-[#fcfcfc] bg-blue-50/50"><td className="px-4 py-3 font-mono font-bold text-blue-700">M20 ★</td><td className="px-4 py-3 font-mono font-bold">1 : 1.5 : 3</td><td className="px-4 py-3 font-bold">20 N/mm²</td><td className="px-4 py-3 font-bold text-blue-700">~8.1</td><td className="px-4 py-3 text-[#202124] font-medium">Standard RCC house slabs, beams, lintels (Most common)</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold text-emerald-700">M25</td><td className="px-4 py-3 font-mono font-bold">1 : 1 : 2</td><td className="px-4 py-3 font-bold">25 N/mm²</td><td className="px-4 py-3 font-bold text-emerald-700">~10.7</td><td className="px-4 py-3 text-[#5F6368]">Heavy structural columns, deep footings, water tanks</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#5F6368] mt-3">★ Note: M20 is the minimum grade recommended by Nepal National Building Code (NBC) for reinforced concrete structural members.</p>
        </section>

        {/* Step by Step Breakdown */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-600 pl-3 mb-6">
            The 1.54 Dry Volume Factor Explained
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] space-y-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</div>
              <h4 className="font-bold text-[#202124] text-sm">Measure Wet Volume</h4>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Compute the geometric volume of your formwork: <code>Length × Width × Thickness</code>. For example, a 30 ft × 20 ft slab at 4 inches thick = 200 CFT (5.66 m³).
              </p>
            </div>
            <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center">2</div>
              <h4 className="font-bold text-[#202124] text-sm">Multiply by 1.54</h4>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Water fills voids between aggregate and sand grains, reducing bulk volume by ~35%. Multiplying by 1.54 converts required wet concrete into raw dry bulk materials to buy.
              </p>
            </div>
            <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] space-y-2">
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center">3</div>
              <h4 className="font-bold text-[#202124] text-sm">Distribute by Mix Ratio</h4>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Divide dry volume by the sum of parts (e.g. 1 + 1.5 + 3 = 5.5 for M20). Multiply by cement, sand, and aggregate ratios, and add 5% for site spillage.
              </p>
            </div>
          </div>
        </section>

        {/* Site Wastage Recommendations */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-amber-600 pl-3 mb-6">
            Recommended Material Wastage Allowances
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Pour Scenario</th>
                  <th className="px-4 py-3">Recommended Wastage</th>
                  <th className="px-4 py-3">Practical Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Machine-mixed slab with smooth plywood shuttering</td><td className="px-4 py-3 font-bold text-emerald-700">3% to 5%</td><td className="px-4 py-3 text-[#5F6368]">Minimal leakage through sealed joints and uniform depth</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Columns, beams, and tight formwork</td><td className="px-4 py-3 font-bold text-blue-700">5% to 7%</td><td className="px-4 py-3 text-[#5F6368]">Spillage during bucket lifting or concrete pump hopper transfers</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Hand-mixed batches on open ground</td><td className="px-4 py-3 font-bold text-amber-700">8% to 10%</td><td className="px-4 py-3 text-[#5F6368]">Material loss on soil floor, wind dispersion of dry cement dust</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Foundation trenches and irregular earth excavations</td><td className="px-4 py-3 font-bold text-amber-700">8% to 12%</td><td className="px-4 py-3 text-[#5F6368]">Rough trench walls absorb extra concrete beyond exact blueprint dimensions</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
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
