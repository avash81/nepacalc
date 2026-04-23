import { calcMeta } from '@/lib/calcMeta';
import RemittanceCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Remittance Calculator Nepal | Highest Exchange Rate Tracker NepaCal",
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
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Global Remittance Tracker"
        description="High-authority comparison engine for exchange rates and remittance fees, ensuring the Nepalese diaspora maximizes their family's income."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Remittance' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Exchange Rates', slug: 'exchange-rate' },
          { name: 'Income Tax', slug: 'nepal-income-tax' },
          { name: 'Foreign Employment', slug: 'foreign-employment' }
        ]}
        formula="Net NPR = (Foreign Amount × Exchange Rate) - Service Fees"
      >
        <RemittanceCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-600 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Diaspora Guide: Remitting to Nepal
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Remittance is the backbone of the Nepalese economy. For the millions of Nepalese working in the <strong>Gulf, Malaysia, and the West</strong>, finding the best exchange rate is the most direct way to support their families.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Remittance Intelligence Laboratory</strong> compares the latest market rates from major providers. Beyond just conversion, we highlight the legal benefits of using formal channels—such as the <strong>10% reserved IPO quota</strong> and higher interest rates on remittance-specific savings accounts.
              </p>
            </div>

            <PillarFAQ faqs={REMITTANCE_FAQS} title="Remittance & Banking FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
