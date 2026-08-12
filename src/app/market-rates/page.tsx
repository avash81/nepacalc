import { calcMeta } from '@/lib/calcMeta';
import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { MarketRateTicker } from '@/components/market/MarketRateTicker';

export const metadata = calcMeta({
  title: 'Live Market Rates Nepal | Gold, Silver & Forex | NepaCalc',
  description: 'Check Nepal gold, silver, foreign exchange and remittance rates with conversion tools. Verify the latest rate with your provider before any transaction.',
  slug: 'market-rates',
});

const TAGS: Record<string, string> = {
  'market-rates/live-gold-price': 'PRECIOUS METALS',
  'gold-converter': 'PRECIOUS METALS',
  'market-rates/live-silver-price': 'PRECIOUS METALS',
  'silver-converter': 'PRECIOUS METALS',
  'market-rates/exchange-rate-nepal': 'FOREX',
  'currency-converter': 'FOREX',
  'market-rates/remittance': 'REMITTANCE',
};

export default function MarketRatesPillarPage() {
  const marketTools = CALCULATORS.filter(c => c.category === 'market');

  return (
    <>
      <JsonLd
        type="unified"
        data={{
          url: 'https://nepacalc.com/market-rates/',
          collection: {
            url: 'https://nepacalc.com/market-rates/',
            name: 'Market Rates & Converters',
            description: 'Nepal gold, silver, foreign exchange and remittance rate tools and converters.',
          },
          itemList: {
            url: 'https://nepacalc.com/market-rates/',
            name: 'Market Rates & Converters - List',
            description: 'List of calculators in Market Rates & Converters',
            items: marketTools.map((calculator, index) => ({
              position: index + 1,
              name: calculator.name,
              url: `https://nepacalc.com/${calculator.slug.replace(/^\/+/, '')}`,
            })),
          }
        }}
      />
      <CalcWrapper
        title="Live Market Rates"
        description="Check Nepal gold, silver, foreign exchange and remittance rates. Market values can change throughout the day — always verify the current rate with your provider before completing a transaction."
        crumbs={[{ label: 'Market Rates' }]}
      >
        <div className="py-4 space-y-6">
          {/* Live Rate Ticker — client component */}
          <MarketRateTicker />

          {/* Tool Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketTools.map(calc => (
              <PillarCard
                key={calc.id}
                slug={calc.slug}
                icon={calc.icon}
                name={calc.name}
                description={calc.description}
                tag={TAGS[calc.slug]}
                isNew={calc.isNew}
                isHot={calc.isHot}
              />
            ))}
          </div>

          {/* About section */}
          <div className="bg-white border border-[#dadce0] rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#202124]">About Market Rates</h2>
            <p className="text-[#5f6368] leading-relaxed">
              NepaCalc displays gold, silver, foreign exchange and remittance rate information alongside conversion tools for everyday financial reference. Rates shown depend on the data source and update frequency used by each individual tool. Always confirm the rate, fees and terms directly with your bank, exchange house, jeweller or remittance provider before making a transaction.
            </p>
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
