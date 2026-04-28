import { calcMeta } from '@/lib/calcMeta';
import RemittanceCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Remittance Calculator Nepal | Highest Exchange Rate Tracker NepaCalc",
  description: "Compare remittance rates from Western Union, IME, and Banks in Nepal. Calculate net NPR received with latest exchange rates and IPO quota benefits.",
  slug: 'remittance-calculator',
  keywords: ["remittance calculator nepal", "highest exchange rate nepal", "ime remittance rate", "western union nepal rate", "remittance ipo quota", "send money to nepal"],
});

const REMITTANCE_FAQS = [
  {
    question: "Which bank provides the highest remittance exchange rate in Nepal?",
    answer: "Rates vary daily based on the NRB mid-rate. Commercial banks like Global IME and Nabil often have competitive margins, typically 0.5% to 1% above the base buying rate."
  },
  {
    question: "Is there a 10% IPO quota for migrant workers?",
    answer: "Yes, SEBON mandates that 10% of shares in any Initial Public Offering (IPO) in Nepal are reserved for migrant workers who remit funds through formal banking channels."
  },
  {
    question: "What are the fees for sending money via IME or Western Union?",
    answer: "Fees depend on the source country and amount. While digital apps like Wise are often cheaper, traditional counters like IME have tiered slabs (e.g., Rs. 200 to Rs. 500)."
  },
  {
    question: "How do I open a Remittance Savings Account in Nepal?",
    answer: "You can open one online at most major banks by providing your foreign employment visa and commitment to remit funds through official banking channels."
  },
  {
    question: "Is there a limit on receiving remittance in Nepal?",
    answer: "There is no strict limit on receiving personal remittances, but transfers exceeding $5,000 may require 'Source of Funds' verification under AML (Anti-Money Laundering) laws."
  }
];

export default function Page() {
  return (
    <RemittanceCalculator />
  );
}
