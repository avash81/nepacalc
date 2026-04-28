import { calcMeta } from '@/lib/calcMeta';
import PaintCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Paint Cost Calculator | Wall Area & Budget Estimator Nepal NepaCalc",
  description: "Estimate the cost of painting your home in Nepal. Calculate paint quantity (liters), primer needs, and labor costs for interior and exterior walls.",
  slug: 'paint-cost',
  keywords: ["paint cost calculator nepal", "wall painting budget", "paint quantity estimator", "interior painting cost nepal", "asian paints price calculator", "berger paints coverage"],
});

const PAINT_FAQS = [
  {
    question: "How much area does 1 liter of paint cover in Nepal?",
    answer: "Standard interior emulsion paint covers approximately 100 to 120 square feet per liter for a single coat. For the recommended two-coat finish, 1 liter covers about 50-60 square feet."
  },
  {
    question: "How many coats of paint are necessary for new walls?",
    answer: "For newly plastered walls, you should apply one coat of primer followed by at least two coats of emulsion paint to ensure proper color depth and durability."
  },
  {
    question: "Do I need to calculate the ceiling area separately?",
    answer: "Yes. The ceiling area is typically equal to the floor area. Forgetting to include the ceiling can result in under-ordering paint by 25% or more."
  },
  {
    question: "How do I account for doors and windows in the paint budget?",
    answer: "A standard door is roughly 21 sq. ft. and a window is 12-16 sq. ft. Subtracting these from your total wall area prevents over-spending on expensive paint."
  },
  {
    question: "What is the average labor cost for painting in Nepal?",
    answer: "Labor costs typically range from Rs. 15 to Rs. 30 per square foot for interior work, depending on whether the scope includes wall putty (pari) and sanding."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Paint Cost Calculator"
        description="Professional estimation engine for wall area, paint quantity, and material budgets tailored for Nepalese home renovations."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Paint Cost' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Brick Calculator', slug: 'brick-calculator' },
          { name: 'Concrete Mix', slug: 'concrete-mix' },
          { name: 'Unit Converter', slug: 'unit-converter' }
        ]}
        formula="Total = (Total Area / Coverage) × Price per Liter"
      >
        <PaintCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block">
              Renovation Guide: Painting Costs in Nepal
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Transforming your home starts with a realistic budget. In the Nepalese market, where brands like <strong>Asian Paints, Berger, and Kansai Nerolac</strong> dominate, understanding coverage ratios is the key to cost-effective renovation.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Painting Budget Laboratory</strong> accounts for both interior and exterior emulsions. By factoring in the number of coats, primer requirements, and local labor rates, we provide a comprehensive financial breakdown that helps you manage your home improvement project without surprises.
              </p>
            </div>

            <PillarFAQ faqs={PAINT_FAQS} title="Painting & Material FAQ" />
          </div>
        </div>
      </CalcWrapper>    </div>
  );
}
