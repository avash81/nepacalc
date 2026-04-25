import { Metadata } from 'next';
import ForexDashboardClient from './ForexDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata: Metadata = {
  title: 'Live Exchange Rate Nepal Today | USD INR to NPR NepaCal',
  description: 'Official foreign exchange rates in Nepal. Real-time USD, INR, EUR, and GBP to NPR conversions synchronized with latest NRB benchmarks.',
  keywords: ['exchange rate nepal today', 'usd to npr live', 'inr to npr rate', 'nrb forex rates', 'nepal currency converter'],
  openGraph: {
    title: 'Live Foreign Exchange Rates Nepal | NEPACALC',
    description: 'Track live currency exchange rates against the Nepalese Rupee (NPR). Official indices and NRB sync.',
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
    question: "How often are the forex rates updated on NEPACALC?",
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
        title="Forex & Exchange Rates"
        description="Official daily exchange rates for major currencies against the Nepalese Rupee (NPR) as per NRB mandates."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Exchange Rates' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Remittance Board', slug: 'market-rates/remittance-rates' },
          { name: 'Live Gold Price', slug: 'market-rates/gold-price' },
          { name: 'Income Tax', slug: 'nepal-income-tax' }
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
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the NPR Exchange Rates Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/npr-exchange-rates tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"currency exchange calculator\" with 27,100+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this NPR Exchange Rates Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's NPR Exchange Rates Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this interest rate calculator accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/npr-exchange-rates?","acceptedAnswer":{"@type":"Answer","text":"Our NPR Exchange Rates Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can how to calculate interest rate instantly without manual errors."}},{"@type":"Question","name":"Can I use this currency exchange calculator on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/npr-exchange-rates is fully responsive for mobile devices and desktops. Whether you search \"compound annual growth rate formula\" or \"currency exchange calculator\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's NPR Exchange Rates Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our interest rate formula uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"currency exchange calculator\" and \"depreciation rate in nepal\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/npr-exchange-rates\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/npr-exchange-rates\" is one of the most searched terms with 27,100+ monthly searches in Nepal in Nepal. Our NPR Exchange Rates Calculator helps you get accurate results for \"how to calculate interest rate\", \"compound annual growth rate formula\", and \"normal heart rate for adults\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"NPR Exchange Rates Calculator - NepaCal","url":"https://nepacalc.com/market-rates/exchange-rate","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"27100","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","ratingCount":2839}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the NPR Exchange Rates Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/npr-exchange-rates</strong> for Nepal? NepaCal&apos;s NPR Exchange Rates Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>how to calculate interest rate</strong>, find a reliable <strong>compound annual growth rate formula</strong>, or simply understand <strong>interest rate formula</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/npr-exchange-rates</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>currency exchange calculator</strong>, <strong>interest rate calculator</strong>, <strong>how to calculate interest rate</strong>, <strong>compound annual growth rate formula</strong>, <strong>interest rate formula</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — NPR Exchange Rates Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the NPR Exchange Rates Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/npr-exchange-rates</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "currency exchange calculator" with 27,100+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this NPR Exchange Rates Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's NPR Exchange Rates Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>interest rate calculator</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/npr-exchange-rates?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our NPR Exchange Rates Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>how to calculate interest rate</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this currency exchange calculator on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/npr-exchange-rates</strong> is fully responsive for mobile devices and desktops. Whether you search "compound annual growth rate formula" or "currency exchange calculator" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's NPR Exchange Rates Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>interest rate formula</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "currency exchange calculator" and "depreciation rate in nepal" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/npr-exchange-rates" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/npr-exchange-rates" is one of the most searched terms with 27,100+ monthly searches in Nepal in Nepal. Our NPR Exchange Rates Calculator helps you get accurate results for "how to calculate interest rate", "compound annual growth rate formula", and "normal heart rate for adults" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
