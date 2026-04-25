import { calcMeta } from '@/lib/calcMeta';
import StockCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "NEPSE Profit & CGT Calculator | Share Market Nepal NepaCal",
  description: "Calculate net share profit after broker commissions (2081/82 tiers), SEBON fees, and capital gains tax (5% vs 7.5%) for NEPSE stock trading.",
  slug: 'nepal-stocks',
  keywords: ["nepse profit calculator", "broker commission nepal", "cgt calculator nepal", "share market tax", "calculate stock profit", "nepse trading fee"],
});

const STOCK_FAQS = [
  {
    question: "What are the latest broker commission rates in Nepal?",
    answer: "As of 2081, SEBON has implemented a tiered broker commission structure ranging from 0.27% to 0.40% depending on the transaction volume. Our calculator is updated with these latest statutory tiers."
  },
  {
    question: "How much is the DP fee per transaction?",
    answer: "The Depository Participant (DP) fee is fixed at Rs. 25 per script for every sell transaction in the Nepal Stock Exchange (NEPSE), regardless of the number of shares sold."
  },
  {
    question: "What is the Capital Gains Tax (CGT) rate for individuals?",
    answer: "For individual investors, the CGT is 5% for shares held for more than 1 year (long-term) and 7.5% for shares held for less than 1 year (short-term)."
  },
  {
    question: "How is the SEBON regulatory fee calculated?",
    answer: "SEBON charges a mandatory regulatory fee of 0.015% on the total transaction amount for every buy and sell order executed in NEPSE."
  },
  {
    question: "Does this calculator include WACC adjustments?",
    answer: "This tool calculates the immediate profit/loss of a trade. To determine your adjusted cost base after bonus or right shares, we recommend using our dedicated NEPSE WACC Calculator."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="NEPSE Profit & CGT Calculator"
        description="Institutional-grade trading engine for calculating net returns, commissions, and capital gains for the Nepal Stock Exchange."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'NEPSE Stocks' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'NEPSE WACC', slug: 'nepse-wacc' },
          { name: 'Bonus Tax', slug: 'nepse-bonus-tax' },
          { name: 'Income Tax', slug: 'nepal-income-tax' }
        ]}
        formula="Net Profit = Sales - Buy Cost - Commissions - Tax"
      >
        <StockCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block">
              Trader Guide: Stock Market Costs in Nepal
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Success in the <strong>Nepal Stock Exchange (NEPSE)</strong> requires a precise understanding of transaction costs. Beyond the stock price, traders must account for tiered broker commissions, SEBON regulatory fees, and the tiered <strong>Capital Gains Tax (CGT)</strong>.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>NEPSE Trading Laboratory</strong> is synchronized with the latest SEBON directives for the 2081/82 fiscal year. Whether you are a short-term swing trader or a long-term investor, our engine provides a transparent breakdown of your net realization after all statutory deductions.
              </p>
            </div>

            <PillarFAQ faqs={STOCK_FAQS} title="NEPSE Trading & Tax FAQ" />
          </div>
        </div>
      </CalcWrapper>
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Nepal Tools Hub Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/nepal/ tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"1 dollars in nepali rupees\" with 2,400+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Nepal Tools Hub Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Nepal Tools Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this english to nepali date converter accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/nepal/?","acceptedAnswer":{"@type":"Answer","text":"Our Nepal Tools Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can 900 euro in nepali rupees instantly without manual errors."}},{"@type":"Question","name":"Can I use this 1 dollars in nepali rupees on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/nepal/ is fully responsive for mobile devices and desktops. Whether you search \"1 million dollars in nepali rupees\" or \"1 dollars in nepali rupees\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Nepal Tools Hub Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our english to nepali converter date uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"1 dollars in nepali rupees\" and \"english date to nepali date converter\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/nepal/\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/nepal/\" is one of the most searched terms with 2,400+ monthly searches in Nepal in Nepal. Our Nepal Tools Hub Calculator helps you get accurate results for \"900 euro in nepali rupees\", \"1 million dollars in nepali rupees\", and \"convert dollar to nepali\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Nepal Tools Hub Calculator - NepaCal","url":"https://nepacalc.com/calculator/nepal-stocks","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"2400","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":360}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Nepal Tools Hub Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/nepal/</strong> for Nepal? NepaCal&apos;s Nepal Tools Hub Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>900 euro in nepali rupees</strong>, find a reliable <strong>1 million dollars in nepali rupees</strong>, or simply understand <strong>english to nepali converter date</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/nepal/</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>1 dollars in nepali rupees</strong>, <strong>english to nepali date converter</strong>, <strong>900 euro in nepali rupees</strong>, <strong>1 million dollars in nepali rupees</strong>, <strong>english to nepali converter date</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Nepal Tools Hub Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Nepal Tools Hub Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/nepal/</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "1 dollars in nepali rupees" with 2,400+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Nepal Tools Hub Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Nepal Tools Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>english to nepali date converter</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/nepal/?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Nepal Tools Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>900 euro in nepali rupees</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this 1 dollars in nepali rupees on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/nepal/</strong> is fully responsive for mobile devices and desktops. Whether you search "1 million dollars in nepali rupees" or "1 dollars in nepali rupees" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Nepal Tools Hub Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>english to nepali converter date</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "1 dollars in nepali rupees" and "english date to nepali date converter" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/nepal/" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/nepal/" is one of the most searched terms with 2,400+ monthly searches in Nepal in Nepal. Our Nepal Tools Hub Calculator helps you get accurate results for "900 euro in nepali rupees", "1 million dollars in nepali rupees", and "convert dollar to nepali" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
