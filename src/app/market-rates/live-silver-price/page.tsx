import { Metadata } from 'next';
import SilverDashboardClient from './SilverDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata: Metadata = {
  title: 'Live Silver Price Today Nepal | Chandi Tola & Gram NepaCalc',
  description: 'Current silver (Chandi) prices in Nepal per tola and gram. Live market benchmarks and official FENEGOSIDA daily silver rates.',
  keywords: ['silver price nepal today', 'chandi rate today', 'silver price per tola', 'silver rate kathmandu', 'silver converter nepal'],
  alternates: {
    canonical: 'https://NepaCalc.com/market-rates/live-silver-price/',
  },
};

const SILVER_FAQS = [
  {
    question: "How is the silver price determined in Nepal?",
    answer: "The daily silver (Chandi) price in Nepal is determined by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) based on global market indices and industrial demand."
  },
  {
    question: "What is the weight of one Tola of silver in Nepal?",
    answer: "One Tola of silver is exactly 11.664 grams. This traditional unit is widely used for trading silver utensils, coins, and jewelry across the country."
  },
  {
    question: "Is there a purity standard for silver in Nepal?",
    answer: "Most high-quality silver products in Nepal use Sterling Silver (92.5% purity) or Fine Silver. The purity may vary depending on whether it is used for jewelry, coins, or traditional utensils."
  },
  {
    question: "How often do silver prices change?",
    answer: "Like gold, silver prices are updated daily (except Saturdays) at around 11:00 AM by FENEGOSIDA, reflecting the day's opening rate for the Nepalese market."
  },
  {
    question: "Can I use this tool to calculate the value of my silver items?",
    answer: "Yes, our converter allows you to input the weight in Tolas or Grams to get an instant valuation based on the latest official silver rate in Nepal."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Live Silver Price"
        description="Real-time silver indices and conversion tools synchronized with FENEGOSIDA benchmarks."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Silver Price' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Exchange Rates', slug: '/market-rates/exchange-rate/' },
          { name: 'Unit Converter', slug: '/calculator/gold-converter/' }
        ]}
      >
        <SilverDashboardClient />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-50 px-6 py-3 rounded-2xl inline-block border border-slate-100">
              Market Guide: Silver Trading in Nepal
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Silver, known as <strong>Chandi</strong> in Nepal, remains a popular choice for traditional jewelry, ceremonial utensils, and investment coins. The silver market is influenced by global industrial demand and fluctuates daily alongside gold.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our dashboard provides high-accuracy <strong>Silver Rates in Nepal</strong> mapping directly to the official federation list, ensuring consumers and dealers have a reliable digital reference for their transactions.
              </p>
            </div>

            <PillarFAQ faqs={SILVER_FAQS} title="Silver & Precious Metals FAQ" />
          </div>
        </div>
      </CalcWrapper>
    
    </div>
  );
}
