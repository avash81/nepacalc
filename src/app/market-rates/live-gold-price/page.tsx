import { calcMeta } from '@/lib/calcMeta';
import GoldDashboardClient from './GoldDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: 'Gold Price Weight Converter in Nepal (Tola, Ana, Lal) | NepaCalc',
  description: 'Calculate today\'s official gold price in Nepal. Converts Tola, Ana, and Lal directly to Grams based on FENEGOSIDA benchmark rates. Check live 24K Fine Gold, 22K Tejabi, and Silver values instantly.',
  slug: 'market-rates/live-gold-price',
  keywords: [
    'gold price in nepal', 'aajako sunko vau', '1 lal gold price in nepal today', '24k gold price today',
    'tejabi sunko rate', 'tola to gram nepal', 'chandi ko vau aajako', 'FENEGOSIDA', '2083 BS',
    '22k gold price nepal', 'gold price kathmandu', '4 ana gold price in nepal',
    'hallmark gold nepal', 'chhapawal sun', 'gold price nepal 2026', 'sunko vau calculator'
  ],
});

const GOLD_FAQS = [
  {
    question: "Who determines the daily gold price in Nepal?",
    answer: "The official daily gold and silver rates in Nepal are determined by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA), also referred to by the FNGSGJA acronym. Rates are set based on international LBMA spot prices and the USD to NPR exchange rate published by Nepal Rastra Bank (NRB). Rates are published daily at 10:00–11:00 AM NPT except Saturdays and major national holidays — when Friday's closing price carries forward."
  },
  {
    question: "How many grams are in 1 Tola of gold?",
    answer: "In Nepal, 1 Tola of gold is officially equal to exactly 11.6638 grams (precisely 11.6638125g). Jewelers often round this to 11.66g for general calculations. 1 Tola = 10 Ana = 100 Lal. For reverse conversions: 10 Grams = 0.85735 Tola, and 1 Gram = 0.085735 Tola."
  },
  {
    question: "What is 1 Lal of gold in grams and price today?",
    answer: "1 Lal (लाल्) of gold equals exactly 0.1166 grams. Since there are 100 Lals in 1 Tola, the price of 1 Lal is exactly 1% of the daily Tola rate. At the current FENEGOSIDA rate of NPR 292,000 per tola (24K Fine), 1 Lal costs NPR 2,920.00. For 22K Tejabi gold at NPR 289,100/tola, 1 Lal costs NPR 2,891.00. Retail jewelry adds 10–15% making charge (jyala) on top."
  },
  {
    question: "What is the difference between Hallmark, Chhapawal, and Tejabi Gold in Nepal?",
    answer: "Fine Gold (99.99% purity / 24K) is interchangeably called Hallmark Gold or Chhapawal Sun (छापावाल सुन). It trades at NPR 292,000 per Tola. Tejabi Gold (तेजाबी सुन), also referred to as Standard Gold by FNGSGJA, operates at approximately 99.50% purity (22K), carrying a structural discount of NPR 2,900 per Tola (NPR 289,100/Tola). Tejabi is the standard for traditional jewelry production."
  },
  {
    question: "How much is 4 Ana of gold in Nepal?",
    answer: "4 Ana equals 25 Lal, or exactly a quarter of 1 Tola (0.25 Tola), which is 2.9160 grams. At the current FENEGOSIDA rate of NPR 292,000 per tola, 4 Ana of 24K Fine gold costs NPR 73,000. For 22K Tejabi at NPR 289,100/tola, 4 Ana equals NPR 72,275."
  },
  {
    question: "What is 'Aajako Sunko Vau' (आजको सुनको भाउ)?",
    answer: "'Aajako Sunko Vau' (आजको सुनको भाउ) is the Nepali phrase for 'today's gold price'. The official daily rate is published by FENEGOSIDA every morning at approximately 11:00 AM NPT. Important: On Saturdays and national public holidays, no new rate is issued — Friday's closing benchmark carries forward. For 2083 BS (2026 AD), the current rates are: Fine Gold (छापावाल सुन) NPR 292,000/tola, Tejabi Gold (तेजाबी सुन) NPR 289,100/tola, Silver (चाँदी) NPR 4,840/tola."
  },
  {
    question: "What is 2 Lal gold price in Nepal today?",
    answer: "The base raw value of 2 Lal of 24K pure gold is NPR 5,840.00 (NPR 292,000 × 0.02). For 22K Tejabi gold, 2 Lal is priced at NPR 5,782.00 (NPR 289,100 × 0.02). This calculation excludes individual jewelry store fabrication fees (jyala)."
  },
  {
    question: "Does the price shown include making charges and VAT?",
    answer: "No. The rates displayed are for raw bullion metal only. Retailers add Jyala (making charges, typically 5–15% of base metal value) and 13% VAT on finished jewelry. When selling old gold, making charges are excluded — only the raw metal value at the daily buying benchmark is returned."
  },
  {
    question: "How do you convert Silver (Chandi) from Tola to Grams?",
    answer: "Just like gold, silver (चाँदी) trading in Nepal uses the Tola unit. 1 Tola of Silver equals exactly 11.6638 grams. The current FENEGOSIDA baseline is NPR 4,840 per tola, which equals NPR 48.40 per Lal and approximately NPR 415 per 10 grams."
  },
  {
    question: "What is the price of silver per Lal in Nepal?",
    answer: "At the official FENEGOSIDA baseline rate of NPR 4,840 per Tola, silver costs NPR 48.40 per Lal (0.1166 grams). For 1 Ana (10 Lal) of silver, the raw cost is NPR 484.00. Per 10 grams, silver is approximately NPR 4,150."
  }
];

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialProduct",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#financial-engine",
      "name": "FENEGOSIDA Live-Mapped Gold & Silver Conversion Engine",
      "description": "Calculates real-time values of 24K Fine gold (Chhapawal), 22K Tejabi gold, and Silver (Chandi) across traditional Tola, Lal, Ana, and international Gram mass units.",
      "feesAndCommissionsSpecification": "https://nepacalc.com/market-rates/live-gold-price/#making-charges-and-wastage",
      "provider": {
        "@type": "Organization",
        "name": "Federation of Nepal Gold and Silver Dealers' Association",
        "sameAs": "https://www.fenegosida.org"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#faq-matrix",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many grams are in 1 tola of gold in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Nepal, 1 tola of gold is officially fixed at exactly 11.6638 grams. For reverse conversions: 10 grams = 0.85735 Tola, and 1 gram = 0.085735 Tola."
          }
        },
        {
          "@type": "Question",
          "name": "What is 1 lal of gold converted to grams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1 lal of gold is equal to exactly 0.1166 grams. Because 1 full Tola contains precisely 100 lals, dividing 11.6638 grams by 100 provides the precise 0.1166g benchmark metric."
          }
        },
        {
          "@type": "Question",
          "name": "What is the price of 1 lal gold in Nepal today?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Based on current official FENEGOSIDA baseline indicators, the raw cost of 1 Lal of 24K Fine Gold (Chhapawal) is NPR 2,920.00, while 22K Tejabi Gold tracks at NPR 2,891.00 per Lal. For Silver (Chandi), 1 Lal costs NPR 48.40."
          }
        },
        {
          "@type": "Question",
          "name": "How many lal make up 1 ana of gold?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In traditional Nepalese gold and silver trading systems, exactly 10 lal combine to form 1 ana, which is equivalent to 1.1664 grams of mass weight."
          }
        },
        {
          "@type": "Question",
          "name": "What is the official difference between Hallmark Gold, Chhapawal, and Tejabi Gold in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fine Gold (9999 Purity) is interchangeably referred to as Hallmark Gold or Chhapawal Sun (छापावाल सुन), representing 99.99% pure bullion at NPR 292,000/Tola. Tejabi Gold (तेजाबी सुन), classified by FNGSGJA as Standard Gold, operates at 99.50% purity with a structural discount of NPR 2,900 per Tola (NPR 289,100/Tola)."
          }
        },
        {
          "@type": "Question",
          "name": "What is the price of silver in Nepal today per tola?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The official baseline price of silver (Chandi / चाँदी) in Nepal is NPR 4,840.00 per Tola, which breaks down to NPR 48.40 per Lal and approximately NPR 415.00 per 10 grams."
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Rich JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
      />

      <CalcWrapper
        title="Live Gold Price"
        description="Daily precious metal indices synchronized with FENEGOSIDA benchmarks for the Nepalese jewelry market."
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Gold Price' }]}
        isNepal={true}
        hideHeader={true}
        relatedCalcs={[
          { name: 'Gold Tax Calculator', slug: '/calculator/gold-tax/' },
          { name: 'Live Silver Price', slug: '/market-rates/live-silver-price/' },
          { name: 'Exchange Rates', slug: '/market-rates/exchange-rate/' }
        ]}
      >
        <GoldDashboardClient />

                {/* ── SEO Content Section ── */}
        <div className="hp-container pb-16 border-t border-slate-100 pt-12">
          <div className="max-w-4xl mx-auto space-y-16">

            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Understanding Gold Prices in Nepal 2083/84 (2026 AD)
              </h2>
              <div className="prose prose-slate max-w-none space-y-5">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  When tracking precious metal valuations across South Asia, accessing authentic, non-manipulated data is essential for both retail consumers and commercial investors. The baseline numbers used to write physical invoices are governed by a central regulatory group balancing international market trends with localized supply constraints. The retail value of fine bullion in local showrooms carries a significant premium over raw international spot quotes because of domestic fiscal policies. Every ounce of gold legally entering the country passes through customs checkpoints where it encounters strict entry fees.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  As of 2026, the government applies a 20% customs import duty on all incoming raw gold bars. This tariff protects foreign currency reserves and regulates domestic consumption during peak wedding and festival seasons. Because these import taxes are calculated alongside bank handling commissions, transport logistics, and local insurance overhead, even minor adjustments to national fiscal policy can cause instant price shifts across local showrooms.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  If you are trying to calculate exactly how these state boundaries and import duties change the baseline cost of raw bullion bars before craftsmanship fees are added, you can compute the exact structural customs markup automatically using our interactive <a href="/calculator/gold-tax/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">Gold Tax Calculator</a>. Understanding these fiscal barriers explains why local retail prices diverge from global spot trends, transforming raw gold from a simple global commodity into a highly regulated domestic asset.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Official Gold Weight &amp; Valuation Standards in Nepal
              </h2>
              <div className="space-y-5">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Beyond custom duties, physical supply limits play a major role in local market behavior. To maintain macroeconomic stability and prevent a sudden drop in foreign cash reserves, the central banking authority strictly limits how much bullion can legally enter the country. The central bank manages a strict daily import quota system for commercial banks, typically limiting total entry to 20 kilograms per day, though this shifts depending on foreign reserve health. When demand outpaces this daily bank quota, local markets face sudden supply shortages. This raw physical scarcity often forces retail associations to raise premiums, causing domestic street prices to spike even if global spot indicators drop.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Evaluating the opening market rate requires analyzing the central regulatory body that manages this complex supply chain. The primary pricing mandate is issued daily by the <a href="https://www.fenegosida.org/" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)</a>, which fixes the baseline index at approximately 11:00 AM every morning from Sunday to Friday. Alternative tracking boards closely monitor secondary merchant behaviors, market transparency, and retail distribution networks across regional showrooms to ensure consumer protections remain intact.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  When individuals look to liquidate family assets during economic downturns, storefronts run a reverse calculation using this same benchmark, ignoring the original making charges or VAT paid during purchase. Instead, they run your jewelry through an acid or XRF purity test and apply a standard melting loss deduction.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Traditional Fractional Weights vs. Metric Protocol
              </h2>
              <div className="space-y-5">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  To accurately calculate your final costs, you need to understand how traditional weight systems map onto modern metric measurements. Local marketplaces rely heavily on historical South Asian terms like Tolas, Anas, and Lals, while modern refiners use grams and kilograms. One full Tola equals exactly 11.6638 grams, which means 10 grams of fine gold represents 0.85735 Tola. For smaller custom pieces, a Tola is broken down into 100 Lals, meaning a single Lal equals 0.1166 grams of metal.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Because local gold prices are ultimately tied to international contracts priced in US Dollars per troy ounce, any shift in the value of the local currency will immediately alter your counter price. If you want to see how these currency shifts change your purchasing power, you can track real-time global currency pairs using our automated <a href="/market-rates/exchange-rate/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">Live Forex Exchange Rates Engine</a>. Monitoring this currency layer helps you anticipate domestic price spikes driven by exchange rate fluctuations, even when global gold prices remain completely flat.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  This dynamic ensures retail buyers never make an uneducated transaction when buying raw bullion investments, providing peace of mind whether you are tracking localized remittance distributions or evaluating personal jewelry asset balances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Real-World Jewelry Pricing Equations (Buying vs. Selling)
              </h2>
              <div className="space-y-5">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  When you buy finished jewelry at a retail store, the price on your invoice will always be higher than the raw material benchmarks listed online. Showrooms have to account for craftsmanship labor costs (Jyala) and material loss margins (Jarti or wastage). Making charges vary based on the complexity of the piece, ranging from 5% for simple bands to over 12% for intricate bridal sets. On top of that, a mandatory 13% Value Added Tax (VAT) is applied to the combined cost of the metal and labor.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <code className="block text-xs bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-800 font-mono text-center">
                    Total Cost = (Weight in Tolas &times; Daily FENEGOSIDA Rate) + Jyala + Wastage
                  </code>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  While gold remains the primary asset for financial security and heritage across the country, silver follows a similar retail logic. Silver prices track independently based on industrial demand and regional silversmithing needs. To check raw benchmarks, calculate metric conversions, or view current rates for custom gemstone settings, check out our companion <a href="/market-rates/live-silver-price/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">Live Silver Price Calculator</a>. Reviewing both metals gives you a complete overview of the market, helping you budget accurately before stepping into a showroom layout.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  In the modern Nepalese financial ecosystem, gold operates as more than an ornament; it functions as a highly liquid tier-one asset class. During contractionary economic cycles, commercial banks and corporate liquidity funds accept hallmark gold biscuits and structural jewelry as premier collateral for emergency cash lines. This collateral system provides instant operational funding for small business owners who use their personal metal reserves to sustain corporate cash flow requirements.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  However, advanced investors often balance their physical commodity holdings against paper equities and public infrastructure funds. Diversifying capital across various asset classes ensures your personal wealth portfolio remains robust against sudden regulatory changes or mining supply shocks. If you are tracking capital allocations outside of precious metals to maximize your compound interest yield, you can analyze active stock indices and portfolio values through our automated <a href="/calculator/nepse/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">NEPSE Trading Calculator</a>. Balancing your physical bullion against liquid equities builds a highly protective defensive barrier around your generational savings.
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §6  FAQ MODULE (Inline UI/UX matching PillarFAQ) */}
            {/* ══════════════════════════════════════════ */}
            <section className="mt-16 pt-12 border-t border-[#dadce0]">
              <h2 className="text-[13px] font-black tracking-widest text-[#202124] mb-6 uppercase">
                Frequently Asked Questions Gold Price Nepal 2083
              </h2>
              <div className="space-y-6">
                
                <div className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <h3 className="text-[14px] font-bold text-[#1a73e8] mb-1">
                    1. Who determines the daily gold price in Nepal?
                  </h3>
                  <div className="text-[13px] text-[#5f6368] leading-relaxed font-medium space-y-2">
                    <p>The official daily bullion benchmarks are established by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). The federation calculates this domestic index every morning from Sunday to Friday at approximately 11:00 AM NPT.</p>
                    <p>The baseline equation combines the global spot price from the London Bullion Market Association (LBMA), the current USD to NPR exchange rates regulated by the Nepal Rastra Bank (NRB), and the domestic 20% customs import tariff. On Saturdays and national public holidays, the market is closed, and the preceding Friday closing rate carries forward automatically.</p>
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <h3 className="text-[14px] font-bold text-[#1a73e8] mb-1">
                    2. How many grams are in 1 Tola of gold in Nepal?
                  </h3>
                  <div className="text-[13px] text-[#5f6368] leading-relaxed font-medium space-y-2">
                    <p>In standard Nepalese jewelry metrics, 1 Tola of gold is equal to exactly 11.6638 grams. While retail storefronts often round this number to 11.66 grams for rapid over-the-counter quotes, precision refiners use the absolute fractional value. For cross-conversions, 10 grams of gold represents exactly 0.85735 Tola, and a single metric gram translates to 0.085735 Tola.</p>
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <h3 className="text-[14px] font-bold text-[#1a73e8] mb-1">
                    3. What is the difference between Hallmark, Chhapawal, and Tejabi Gold?
                  </h3>
                  <div className="text-[13px] text-[#5f6368] leading-relaxed font-medium space-y-2">
                    <p><strong>Hallmark / Chhapawal Gold (24K):</strong> This is pure gold at 99.99% refinement with no added metallic alloys. It trades at the peak benchmark rate of Rs. 2,92,000 per Tola and is typically purchased in the form of raw mint bars or investment-grade biscuits.</p>
                    <p><strong>Tejabi Gold (22K):</strong> Also recognized as Standard Gold, this configuration features roughly 91.6% pure gold mixed with a minor alloy balance (such as copper or silver) to structuralize the metal for daily wear. It carries a set federation discount and trades at Rs. 2,89,100 per Tola.</p>
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <h3 className="text-[14px] font-bold text-[#1a73e8] mb-1">
                    4. What is 1 Lal of gold in grams and price today?
                  </h3>
                  <div className="text-[13px] text-[#5f6368] leading-relaxed font-medium space-y-2">
                    <p>Exactly 1 Lal equals 0.1166 grams. Because there are precisely 100 Lals in a single traditional Tola, the price of 1 Lal is mathematically equivalent to exactly 1% of the daily Tola rate:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>For 24K Fine Chhapawal Gold, 1 Lal costs exactly Rs. 2,920.00.</li>
                        <li>For 22K Tejabi Gold, 1 Lal costs exactly Rs. 2,891.00.</li>
                    </ul>
                    <p className="italic">Note: This represents the raw material value; retail storefront invoices will add customized fabrication fees on top of this baseline.</p>
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <h3 className="text-[14px] font-bold text-[#1a73e8] mb-1">
                    5. How much is 4 Ana of gold in Nepal?
                  </h3>
                  <div className="text-[13px] text-[#5f6368] leading-relaxed font-medium space-y-2">
                    <p>In local weight protocols, 10 Lals make up 1 Ana. Therefore, 4 Ana equals 40 Lals, representing exactly 40% of a Tola, which translates to a precise metric weight of 4.6655 grams.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>The raw bullion value for 4 Ana of 24K Chhapawal Gold is Rs. 1,16,800.00.</li>
                        <li>The raw bullion value for 4 Ana of 22K Tejabi Gold is Rs. 1,15,640.00.</li>
                    </ul>
                    <p className="italic">(Note: If calculating a traditional quarter-tola ornament, which equals exactly 25 Lals/2.5 Ana, the baseline cost sits at Rs. 73,000 for 24K and Rs. 72,275 for 22K).</p>
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <h3 className="text-[14px] font-bold text-[#1a73e8] mb-1">
                    6. Does the daily FENEGOSIDA price list include retail VAT and making charges?
                  </h3>
                  <div className="text-[13px] text-[#5f6368] leading-relaxed font-medium space-y-2">
                    <p>No. The daily published prices are for raw, unworked bullion metal assets only. When you purchase finished jewelry from a retail showroom, the store owners append two mandatory cost tiers to your final invoice:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Jyala &amp; Jarti:</strong> The crafting labor charges and structural material wastage fees, which typically add an extra 5% to 15% onto the raw metal's base cost.</li>
                        <li><strong>Value Added Tax (VAT):</strong> A mandatory state-enforced 13% tax applied directly to the combined total of the raw gold and the labor costs.</li>
                    </ul>
                    <p>Conversely, when liquidating old jewelry items back to a shop for cash, making charges and taxes are stripped from the payout—you are only paid for the true weight of the raw melted gold minus a standard 2% to 5% melting loss adjustment.</p>
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <h3 className="text-[14px] font-bold text-[#1a73e8] mb-1">
                    7. What is the price of Silver (Chandi) per Tola and Lal in Nepal today?
                  </h3>
                  <div className="text-[13px] text-[#5f6368] leading-relaxed font-medium space-y-2">
                    <p>Just like gold, silver trading across Nepal utilizes traditional South Asian weight metrics. Based on current market support levels, raw Silver (Chandi) is priced at Rs. 4,840 per Tola.</p>
                    <p>Broken down into smaller weight fractions, silver costs Rs. 48.40 per Lal. For an ornament weighing exactly 1 Ana (10 Lals), the raw silver value is Rs. 484.00.</p>
                    <p>Translated into modern metric protocols, silver trades at approximately Rs. 415.00 per 10 Grams.</p>
                    <p>If you are mapping out your personal portfolio assets or budgeting for major life events alongside precious metal purchases, verify your standard annual household deductions using our comprehensive <a href="/calculator/income-tax/" className="text-[#1a73e8] underline underline-offset-2 hover:text-blue-800 transition-colors">Nepal Income Tax Calculator</a> to keep your financial accounting fully optimized.</p>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
