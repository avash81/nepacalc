import { Metadata } from 'next';
import SilverDashboardClient from './SilverDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata: Metadata = {
  title: 'Silver Price in Nepal Today (2083/84) | Live Chandi Rate Per Tola & Gram',
  description: "Track today's live silver price in Nepal using official FENEGOSIDA rates. View Chandi price per tola, gram and kilogram, convert silver units, calculate silver value and monitor historical price trends.",
  keywords: ['silver price nepal 2083', 'chandi rate today nepal', 'silver price per tola nepal', 'silver rate 2084', 'kathmandu silver price'],
  alternates: {
    canonical: 'https://NepaCalc.com/market-rates/live-silver-price/',
  },
  openGraph: {
    title: 'Silver Price in Nepal Today (2083/84) | Live Chandi Rate Per Tola & Gram',
    description: "Track today's live silver price in Nepal using official FENEGOSIDA rates. View Chandi price per tola, gram and kilogram, convert silver units, calculate silver value and monitor historical price trends.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Price in Nepal Today (2083/84) | Live Chandi Rate Per Tola & Gram',
    description: "Track today's live silver price in Nepal using official FENEGOSIDA rates. View Chandi price per tola, gram and kilogram, convert silver units, calculate silver value and monitor historical price trends.",
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
        title="Silver Price in Nepal Today (2083/84)"
        description="Real-time silver indices and conversion tools synchronized with FENEGOSIDA benchmarks."
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Silver Price' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Exchange Rates', slug: '/market-rates/exchange-rate-nepal/' },
          { name: 'Unit Converter', slug: '/calculator/gold-converter/' }
        ]}
      >
        <SilverDashboardClient />
      </CalcWrapper>
    
    </div>
  );
}

