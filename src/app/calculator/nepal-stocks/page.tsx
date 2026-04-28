import { calcMeta } from '@/lib/calcMeta';
import StockCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "NEPSE Profit & CGT Calculator | Share Market Nepal NepaCalc",
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
    </div>
  );
}
