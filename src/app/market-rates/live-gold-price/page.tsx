import { calcMeta } from '@/lib/calcMeta';
import GoldDashboardClient from './GoldDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: 'Live Gold Price in Nepal Today 2083/84 — 24K & 22K Rates',
  description: 'Check today\'s official gold rate in Nepal from FENEGOSIDA. Real-time 24K Hallmark and 22K Tejabi gold prices per tola and gram with history charts.',
  slug: 'market-rates/live-gold-price',
  keywords: ['gold price nepal today', 'gold rate per tola', '24k gold price nepal', '22k gold price nepal', 'gold price kathmandu', 'fenegosida gold rate'],
});

const GOLD_FAQS = [
  {
    question: "Who determines the daily gold price in Nepal?",
    answer: "The official daily gold and silver rates in Nepal are determined by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) based on international market indices and local supply-demand factors."
  },
  {
    question: "What is the difference between 24K Hallmark and 22K Tejabi gold?",
    answer: "24K Hallmark gold is 99.9% pure gold, often sold as coins or biscuits. 22K Tejabi gold is 91.6% pure and is the standard quality used for making traditional jewelry in Nepal."
  },
  {
    question: "How many grams are in one Tola of gold?",
    answer: "In the Nepalese market, 1 Tola is equal to exactly 11.664 grams. Our calculator provides instant conversions for both Tola and Gram units for your convenience."
  },
  {
    question: "Does the price shown include making charges and VAT?",
    answer: "No, the rates displayed are for the raw metal only. Retailers will add 'Jyala' (making charges) and the mandatory 13% VAT when you purchase finished jewelry."
  },
  {
    question: "When is the gold price updated in Nepal?",
    answer: "Gold prices are typically updated daily (except on Saturdays and major holidays) around 11:00 AM, following the release of the day's opening rates by FENEGOSIDA."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Live Gold Price"
        description="Daily precious metal indices synchronized with FENEGOSIDA benchmarks for the Nepalese jewelry market."
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Gold Price' }]}
        isNepal={true}
        hideHeader={true}
        relatedCalcs={[
          { name: 'Gold Tax Calculator', slug: '/calculator/gold-tax/' },
          { name: 'Live Silver Price', slug: '/market-rates/live-silver-price/' },
          { name: 'Exchange Rates', slug: '/market-rates/exchange-rate/' }
        ]}
      >
        <GoldDashboardClient />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-amber-50 px-6 py-3 rounded-2xl inline-block">
              Market Insight: Gold Trading in Nepal
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Gold is more than just a metal in Nepal; it is a vital asset for financial security and cultural heritage. The daily <strong>Gold Rate in Nepal</strong> is influenced by international LME (London Metal Exchange) prices and the USD-to-NPR exchange rate.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our dashboard provides high-precision data mapping directly to the <strong>FENEGOSIDA</strong> (Federation of Nepal Gold and Silver Dealers' Association) official list, ensuring you have the most reliable figures for hallmark jewelry or investment biscuits.
              </p>
            </div>

            <PillarFAQ faqs={GOLD_FAQS} title="Precious Metals & Jewelry FAQ" />
          </div>
        </div>
      </CalcWrapper>
    
    </div>
  );
}

