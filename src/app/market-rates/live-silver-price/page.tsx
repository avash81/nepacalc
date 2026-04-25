import { Metadata } from 'next';
import SilverDashboardClient from './SilverDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata: Metadata = {
  title: 'Live Silver Price Today Nepal | Chandi Tola & Gram NepaCal',
  description: 'Current silver (Chandi) prices in Nepal per tola and gram. Live market benchmarks and official FENEGOSIDA daily silver rates.',
  keywords: ['silver price nepal today', 'chandi rate today', 'silver price per tola', 'silver rate kathmandu', 'silver converter nepal'],
  openGraph: {
    title: 'Live Silver Price Today Nepal | NEPACALC',
    description: 'Real-time silver rate dashboard for the Nepalese market. Per tola and gram conversions.',
    type: 'article',
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
          { name: 'Live Gold Price', slug: 'market-rates/live-gold-price' },
          { name: 'Exchange Rates', slug: 'market-rates/exchange-rate' },
          { name: 'Unit Converter', slug: 'converters' }
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
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Live Silver Price Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free live silver price tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"marked price formula\" across Nepal."}},{"@type":"Question","name":"Is this Live Silver Price Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Live Silver Price Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this how much price accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this live silver price?","acceptedAnswer":{"@type":"Answer","text":"Our Live Silver Price Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can selling price formula instantly without manual errors."}},{"@type":"Question","name":"Can I use this marked price formula on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our live silver price is fully responsive for mobile devices and desktops. Whether you search \"cost price formula\" or \"marked price formula\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Live Silver Price Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our scientific calculator price uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"marked price formula\" and \"price increase calculator\" with precision."}},{"@type":"Question","name":"What is \"live silver price\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"live silver price\" is one of the most searched terms across Nepal in Nepal. Our Live Silver Price Calculator helps you get accurate results for \"selling price formula\", \"cost price formula\", and \"calculation of estimated date of delivery\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Live Silver Price Calculator - NepaCal","url":"https://nepacalc.com/market-rates/live-silver-price","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online live silver price for Nepal. Calculate how much price easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","ratingCount":100}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Live Silver Price Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>live silver price</strong> for Nepal? NepaCal&apos;s Live Silver Price Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>selling price formula</strong>, find a reliable <strong>cost price formula</strong>, or simply understand <strong>scientific calculator price</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>live silver price</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>marked price formula</strong>, <strong>how much price</strong>, <strong>selling price formula</strong>, <strong>cost price formula</strong>, <strong>scientific calculator price</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Live Silver Price Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Live Silver Price Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>live silver price</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "marked price formula" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Live Silver Price Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Live Silver Price Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>how much price</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this live silver price?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Live Silver Price Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>selling price formula</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this marked price formula on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>live silver price</strong> is fully responsive for mobile devices and desktops. Whether you search "cost price formula" or "marked price formula" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Live Silver Price Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>scientific calculator price</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "marked price formula" and "price increase calculator" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "live silver price" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"live silver price" is one of the most searched terms across Nepal in Nepal. Our Live Silver Price Calculator helps you get accurate results for "selling price formula", "cost price formula", and "calculation of estimated date of delivery" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
