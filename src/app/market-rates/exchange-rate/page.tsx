import { Metadata } from 'next';
import ForexDashboardClient from './ForexDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata: Metadata = {
  title: 'Live Exchange Rate Nepal Today 2083/84 | USD INR to NPR',
  description: 'Official foreign exchange rates in Nepal for FY 2083/84. Real-time USD, INR, EUR, and GBP to NPR conversions synchronized with NRB benchmarks.',
  keywords: ['exchange rate nepal 2083', 'usd to npr live 2084', 'inr to npr rate nepal', 'nrb forex today'],
  alternates: {
    canonical: 'https://NepaCalc.com/market-rates/exchange-rate/',
  },
  openGraph: {
    title: 'Live Foreign Exchange Rates Nepal 2083/84 | NepaCalc',
    description: 'Track live currency exchange rates against the Nepalese Rupee (NPR) for FY 2083/84. Official NRB sync.',
    type: 'article',
  },
};

const FOREX_FAQS = [
  {
    question: "Where do these exchange rates come from?",
    answer: "Our data is synchronized daily with the official benchmarks published by the Nepal Rastra Bank (NRB). We provide accurate Buying and Selling rates for all major global currencies."
  },
  {
    question: "Is the Indian Rupee (INR) rate fixed in Nepal?",
    answer: "Yes, the exchange rate between the Indian Rupee and the Nepalese Rupee is pegged at 1.60. This means 100 Indian Rupees always equals 160 Nepalese Rupees."
  },
  {
    question: "Why is there a difference between the Buying and Selling rates?",
    answer: "The Buying Rate is what the bank pays you for your foreign currency, while the Selling Rate is what you pay the bank. The difference, or 'spread', covers operational costs and market risks."
  },
  {
    question: "How often are the forex rates updated on NepaCalc?",
    answer: "We update our forex indices every morning as soon as the NRB releases the daily official rates, ensuring you have the latest figures for your financial planning."
  },
  {
    question: "Does this include remittance rates from providers like IME?",
    answer: "This tool shows the official interbank rates. While remittance providers like IME or Western Union use these as a base, their actual rates may vary based on their internal margins."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Forex & Exchange Rates 2083/84"
        description="Official daily exchange rates for major currencies against the Nepalese Rupee (NPR) as per NRB mandates."
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Exchange Rates' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Remittance Board', slug: '/market-rates/remittance/' },
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Income Tax', slug: '/calculator/nepal-income-tax/' }
        ]}
      >
        <ForexDashboardClient />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-50 px-6 py-3 rounded-2xl inline-block">
              Market Guide: Foreign Exchange in Nepal
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                The <strong>Foreign Exchange Market in Nepal</strong> is strictly regulated by the <strong>Nepal Rastra Bank (NRB)</strong>. For businesses, travelers, and non-resident Nepalese, staying updated with the daily 'Buying' and 'Selling' rates is essential for accurate financial transactions.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our platform provides a real-time dashboard that fetches the latest NRB benchmarks, allowing you to convert <strong>USD to NPR</strong>, <strong>INR to NPR</strong>, and other major currencies with absolute confidence.
              </p>
            </div>

            <PillarFAQ faqs={FOREX_FAQS} title="Currency & Forex FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}

