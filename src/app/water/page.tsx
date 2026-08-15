import { calcMeta } from '@/lib/calcMeta';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';

export const metadata = calcMeta({
  title: 'Water & Utility Calculators Nepal | KUKL Bill | NepaCalc',
  description: 'Nepal water bill calculators including KUKL bill payment guide and water consumption tools for Kathmandu Valley residents.',
  slug: 'water',
  keywords: ['kukl bill nepal', 'kukl water bill calculator', 'kathmandu water bill', 'nepal utility calculator'],
});

const WATER_TOOLS = [
  {
    slug: '/water/kukl-bill-payment/',
    icon: '📝',
    name: 'KUKL Bill Payment Guide',
    description: 'Step-by-step guide to pay your Kathmandu Upatyaka Khanepani Limited water bill online or offline.',
    tag: 'GUIDE',
  },
  {
    slug: '/calculator/water-intake/',
    icon: '💧',
    name: 'Water Intake Calculator',
    description: 'Calculate your recommended daily water intake based on your weight, activity level and climate.',
    tag: 'HEALTH',
  },
];

export default function WaterPillarPage() {
  return (
    <>
      <JsonLd
        type="unified"
        data={{
          url: 'https://nepacalc.com/water/',
          collection: {
            url: 'https://nepacalc.com/water/',
            name: 'Water & Utility Tools Nepal',
            description: 'Nepal water bill calculators and utility tools for Kathmandu Valley residents.',
          },
          itemList: {
            url: 'https://nepacalc.com/water/',
            name: 'Water & Utility Tools - List',
            description: 'List of water and utility tools on NepaCalc',
            items: WATER_TOOLS.map((tool, index) => ({
              position: index + 1,
              name: tool.name,
              url: `https://nepacalc.com${tool.slug}`,
            })),
          }
        }}
      />
      <CalcWrapper
        title="Water & Utility Tools"
        description="Water bill calculators, KUKL payment guides, and daily water intake tools for Nepal."
        crumbs={[{ label: 'Water & Utility' }]}
      >
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {WATER_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.slug}
                className="group bg-white border border-[#DADCE0] rounded-xl p-5 hover:shadow-md hover:border-[#1A73E8] transition-all duration-200 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest bg-[#E8F0FE] text-[#1A73E8] px-2 py-1 rounded-full">
                    {tool.tag}
                  </span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#202124] group-hover:text-[#1A73E8] transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-xs text-[#5F6368] mt-1 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#202124]">About Water & Utility Tools</h2>
            <p className="text-[#5f6368] leading-relaxed">
              NepaCalc provides water-related calculators and guides for Nepal, including tools for Kathmandu Upatyaka Khanepani Limited (KUKL) water bill payment and daily hydration planning.
            </p>
            <p className="text-[#5f6368] leading-relaxed">
              Whether you need help understanding your KUKL water bill, finding payment options, or calculating your recommended daily water intake, our tools are designed for Nepali residents and conditions.
            </p>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
