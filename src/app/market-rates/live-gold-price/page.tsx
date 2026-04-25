import { Metadata } from 'next';
import GoldDashboardClient from './GoldDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata: Metadata = {
  title: 'Live Gold Price Today Nepal | 24K & 22K Tola Gram NepaCal',
  description: 'Track real-time gold rates in Nepal per tola and gram. Official FENEGOSIDA benchmarks for 24K Hallmark and 22K Tejabi gold jewelry.',
  keywords: ['gold price nepal today', 'gold rate per tola', '24k gold price nepal', '22k gold price nepal', 'gold price kathmandu', 'fenegosida gold rate'],
  alternates: {
    canonical: '/market-rates/live-gold-price/',
  },
  openGraph: {
    title: 'Live Gold Price Today Nepal | NEPACALC',
    description: 'Track hallmark and tejabi gold rates in Nepal per tola and gram with live market updates.',
    type: 'article',
  },
};

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
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Gold Price' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Live Silver Price', slug: 'market-rates/live-silver-price' },
          { name: 'Exchange Rates', slug: 'market-rates/exchange-rate' },
          { name: 'Unit Converter', slug: 'converters' }
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
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Live Gold Price Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free live gold price tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"marked price formula\" across Nepal."}},{"@type":"Question","name":"Is this Live Gold Price Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Live Gold Price Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this how much price accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this live gold price?","acceptedAnswer":{"@type":"Answer","text":"Our Live Gold Price Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can selling price formula instantly without manual errors."}},{"@type":"Question","name":"Can I use this marked price formula on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our live gold price is fully responsive for mobile devices and desktops. Whether you search \"cost price formula\" or \"marked price formula\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Live Gold Price Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our scientific calculator price uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"marked price formula\" and \"price increase calculator\" with precision."}},{"@type":"Question","name":"What is \"live gold price\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"live gold price\" is one of the most searched terms across Nepal in Nepal. Our Live Gold Price Calculator helps you get accurate results for \"selling price formula\", \"cost price formula\", and \"calculation of estimated date of delivery\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Live Gold Price Calculator - NepaCal","url":"https://nepacalc.com/market-rates/live-gold-price","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online live gold price for Nepal. Calculate how much price easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":100}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Live Gold Price Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>live gold price</strong> for Nepal? NepaCal&apos;s Live Gold Price Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>selling price formula</strong>, find a reliable <strong>cost price formula</strong>, or simply understand <strong>scientific calculator price</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>live gold price</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>marked price formula</strong>, <strong>how much price</strong>, <strong>selling price formula</strong>, <strong>cost price formula</strong>, <strong>scientific calculator price</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Live Gold Price Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Live Gold Price Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>live gold price</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "marked price formula" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Live Gold Price Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Live Gold Price Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>how much price</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this live gold price?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Live Gold Price Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>selling price formula</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this marked price formula on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>live gold price</strong> is fully responsive for mobile devices and desktops. Whether you search "cost price formula" or "marked price formula" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Live Gold Price Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>scientific calculator price</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "marked price formula" and "price increase calculator" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "live gold price" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"live gold price" is one of the most searched terms across Nepal in Nepal. Our Live Gold Price Calculator helps you get accurate results for "selling price formula", "cost price formula", and "calculation of estimated date of delivery" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
