import re

with open('c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/market-rates/live-gold-price/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx1 = content.find('{/* ── Market Insight ── */}')
idx2 = content.find('export default function LiveGoldPricePage()')

if idx1 != -1 and idx2 != -1:
    old_section = content[idx1:idx2]
    
    new_section = '''{/* ── Market Insight ── */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Introduction & Baseline Mechanics
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                  When tracking precious metal valuations across South Asia, accessing authentic, non-manipulated data is essential for both retail consumers and commercial investors. The baseline numbers used to write physical invoices are governed by a central regulatory group balancing international market trends with localized supply constraints.
                </p>
                <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                  The retail value of fine bullion in local showrooms carries a significant premium over raw international spot quotes because of domestic fiscal policies. Every ounce of gold legally entering the country passes through customs checkpoints where it encounters strict entry fees. As of 2026, the government applies a 20% customs import duty on all incoming raw bullion bars. This tariff protects foreign currency reserves and regulates domestic consumption during peak wedding and festival seasons.
                </p>
                <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                  Because these import taxes are calculated alongside bank handling commissions, transport logistics, and local insurance overhead, even minor adjustments to national fiscal policy can cause instant price shifts across local showrooms. If you are trying to calculate exactly how these state boundaries and import duties change the baseline cost of raw bullion bars before craftsmanship fees are added, you can compute the structural markup automatically using our interactive <a href="/calculator/gold-tax/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">Gold Tax Calculator</a>. Understanding these fiscal barriers explains why local retail prices diverge from global spot trends, transforming raw gold from a simple global commodity into a highly regulated domestic asset.
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §1  CORE REFERENCE BENCHMARKS             */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-2">
                Core Reference Benchmarks: Official Bullion Indices
              </h2>
              <p className="text-slate-500 text-sm mb-6 font-medium">
                Official market baseline rates for raw, uncrafted bullion as authorized for Saturday, June 13, 2026 (Jestha 30, 2083 BS).
              </p>

              <div className="overflow-x-auto rounded-2xl border border-amber-100 shadow-sm mb-6">
                <table className="w-full text-left">
                  <thead className="bg-amber-50">
                    <tr className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                      <th className="px-5 py-4">Precious Metal &amp; Quality Standard</th>
                      <th className="px-5 py-4">Per Tola (NPR)</th>
                      <th className="px-5 py-4">Per 10 Grams (NPR)</th>
                      <th className="px-5 py-4">Daily Trajectory</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-50 bg-white text-sm font-medium text-slate-700">
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-black text-slate-900">24K Hallmark Gold</div>
                        <div className="text-[11px] text-amber-600 font-bold uppercase tracking-wider">Fine / छापावाल सुन</div>
                      </td>
                      <td className="px-5 py-4 font-black text-yellow-700 text-base">Rs. 2,92,000</td>
                      <td className="px-5 py-4 font-bold text-slate-700">Rs. 2,50,343</td>
                      <td className="px-5 py-4 text-[11px] font-bold text-green-700">🟢 Consolidated Base (Stable)</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-black text-slate-900">22K Tejabi Gold</div>
                        <div className="text-[11px] text-amber-600 font-bold uppercase tracking-wider">Standard / तेजाबी सुन</div>
                      </td>
                      <td className="px-5 py-4 font-black text-amber-700 text-base">Rs. 2,89,100</td>
                      <td className="px-5 py-4 font-bold text-slate-700">Rs. 2,47,857</td>
                      <td className="px-5 py-4 text-[11px] font-bold text-green-700">🟢 Consolidated Base (Stable)</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-black text-slate-900">Pure Silver Index</div>
                        <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Fine / चाँदी</div>
                      </td>
                      <td className="px-5 py-4 font-black text-slate-700 text-base">Rs. 4,840</td>
                      <td className="px-5 py-4 font-bold text-slate-700">Rs. 4,150</td>
                      <td className="px-5 py-4 text-[11px] font-bold text-blue-600">🔵 Strong Weekly Support</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
                <span className="text-amber-600 text-lg mt-0.5">📌</span>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  <strong>Weekend Market Operating Rule:</strong> FENEGOSIDA establishes wholesale bullion benchmarks from <strong>Sunday through Friday</strong> at approximately 11:00 AM NPT. Because official trading benches remain closed on Saturdays and national public holidays, all active retail invoices across Kathmandu and greater Nepal utilize the preceding <strong>Friday evening close</strong> as their mandatory regulatory baseline.
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §2  WEIGHT & VALUATION STANDARDS          */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Weight & Valuation Standards
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                Beyond custom duties, physical supply limits play a major role in local market behavior. To maintain macroeconomic stability and prevent a sudden drop in foreign cash reserves, the central banking authority strictly limits how much bullion can legally enter the country. The central bank manages a strict daily import quota system for commercial banks, typically limiting total entry to 20 kilograms per day, though this shifts depending on foreign reserve health.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                When demand outpaces this daily bank quota, local markets face sudden supply shortages. This raw physical scarcity often forces retail associations to raise premiums, causing domestic street prices to spike even if global spot indicators drop. Evaluating the opening market rate requires analyzing the central regulatory body that manages this complex supply chain. The primary pricing mandate is issued daily by the <a href="https://www.fenegosida.org/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA)</a>, which fixes the baseline index at approximately 11:00 AM every morning from Sunday to Friday.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-8 font-medium">
                Alternative tracking boards closely monitor secondary merchant behaviors, market transparency, and retail distribution networks across regional showrooms to ensure consumer protections remain intact. When individuals look to liquidate family assets during economic downturns, storefronts run a reverse calculation using this same benchmark, ignoring the original making charges or VAT paid during purchase. Instead, they run your jewelry through an acid or XRF purity test and apply a standard melting loss deduction.
              </p>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §3  TRADITIONAL WEIGHTS VS METRIC         */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Traditional Fractional Weights vs. Metric Protocol
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                To accurately calculate your final costs, you need to understand how traditional weight systems map onto modern metric measurements. Local marketplaces rely heavily on historical South Asian terms like Tolas, Anas, and Lals, while modern refiners use grams and kilograms. One full Tola equals exactly 11.6638 grams, which means 10 grams of fine gold represents 0.85735 Tola. For smaller custom pieces, a Tola is broken down into 100 Lals, meaning a single Lal equals 0.1166 grams of metal.
              </p>
              
              <div className="bg-slate-900 rounded-2xl px-6 py-5 font-mono text-sm text-slate-300 mb-6 overflow-x-auto">
                <pre className="whitespace-pre text-xs leading-relaxed">          ┌── 1 Tola (11.6638g) ──┐
          │                       │
16 Ana (0.7290g per Ana)   100 Lal (0.1166g per Lal)</pre>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                Because local gold prices are ultimately tied to international contracts priced in US Dollars per troy ounce, any shift in the value of the local currency will immediately alter your counter price. If you want to see how these currency shifts change your purchasing power, you can track real-time global currency pairs using our automated <a href="/market-rates/exchange-rate/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">Live Forex Exchange Rates Engine</a>. Monitoring this currency layer helps you anticipate domestic price spikes driven by exchange rate fluctuations, even when global gold prices remain completely flat. This dynamic ensures retail buyers never make an uneducated transaction when buying raw bullion investments.
              </p>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §4  RETAIL JEWELRY INVOICING FORMULA      */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                The Retail Jewelry Invoicing Formula
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                When you buy finished jewelry at a retail store, the price on your invoice will always be higher than the raw material benchmarks listed online. Showrooms have to account for craftsmanship labor costs (Jyala) and material loss margins (Jarti or wastage). Making charges vary based on the complexity of the piece, ranging from 5% for simple bands to over 12% for intricate bridal sets. On top of that, a mandatory 13% Value Added Tax (VAT) is applied to the combined cost of the metal and labor.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 mb-6">
                <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-3">Definitive Buying Formula</p>
                <code className="block text-xs bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-900 font-mono leading-relaxed">
                  Final Counter Price = (Total Weight in Tolas × Today&apos;s FENEGOSIDA Rate)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Jyala (Making Charges)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Jarti (Wastage Fee)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ 13% VAT
                </code>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                While gold remains the primary asset for financial security and heritage across the country, silver follows a similar retail logic. Silver prices track independently based on industrial demand and regional silversmithing needs. To check raw benchmarks, calculate metric conversions, or view current rates for custom gemstone settings, check out our companion <a href="/market-rates/live-silver-price/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">Live Silver Price Calculator</a>. Reviewing both metals gives you a complete overview of the market, helping you budget accurately before stepping into a showroom.
              </p>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §5  ASSET DIVERSIFICATION & LIQUIDITY     */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Asset Diversification & Collateral Liquidity
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                In the modern Nepalese financial ecosystem, gold operates as more than an ornament; it functions as a highly liquid tier-one asset class. During contractionary economic cycles, commercial banks and corporate liquidity funds accept hallmark gold biscuits and structural jewelry as premier collateral for emergency cash lines. This collateral system provides instant operational funding for small business owners who use their personal metal reserves to sustain corporate cash flow requirements.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                However, advanced investors often balance their physical commodity holdings against paper equities and public infrastructure funds. Diversifying capital across various asset classes ensures your personal wealth portfolio remains robust against sudden regulatory changes or mining supply shocks. If you are tracking capital allocations outside of precious metals to maximize your compound interest yield, you can analyze active stock indices and portfolio values through our automated <a href="/calculator/nepal-stocks/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">NEPSE Trading Calculator</a>. Balancing your physical bullion against liquid equities builds a highly protective defensive barrier around your generational savings.
              </p>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §6  SNIPPET FAQ MODULES                   */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Frequently Asked Questions (FAQ Section Integration)
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'What is the difference between 24K Hallmark and 22K Tejabi gold in Nepal?',
                    a: '24K Hallmark Gold represents 99.99% pure fine gold, making it the ideal asset for investment bars and capital reserves. 22K Tejabi Gold contains roughly 91.6% pure gold blended with copper or zinc for added strength, making it the structural standard for traditional Nepalese jewelry design.',
                  },
                  {
                    q: 'What does "Aajako Sunko Vau" mean on local tracking sites?',
                    a: 'Aajako Sunko Vau (आजको सुनको भाउ) is the standard Romanized and native phrasing for "Today\'s Gold Price." Search engine algorithms use this phrase to connect local voice queries with structured digital pricing tools. The rate is published daily by FENEGOSIDA at approximately 11:00 AM NPT, except on Saturdays and public holidays.',
                  },
                  {
                    q: 'How do I check the live silver price in Nepal per tola?',
                    a: 'The daily index for silver (Chandi Ko Vau Aajako / चाँदीको भाउ) tracks independently based on global industrial demand and regional silver-smithing requirements. Today\'s official FENEGOSIDA benchmark is fixed at Rs. 4,840 per Tola, which translates to Rs. 4,150 per 10 grams for raw material transactions, and Rs. 48.40 per Lal. For a dedicated tola to gram converter Nepal and daily silver tracking, visit our Live Silver Price Calculator.',
                    link: { href: '/market-rates/live-silver-price/', label: 'Live Silver Price Calculator' },
                  },
                  {
                    q: 'Does the daily FENEGOSIDA price list include retail VAT?',
                    a: 'No. The baseline price list issued by the federation represents raw, unworked bullion values. Under national accounting codes, retail showrooms must add crafting labor charges alongside the mandatory state value-added tax when finalizing a sales invoice. If you need to map out your broader annual wealth allocations alongside asset purchases to balance your net revenue returns, check your standard deductions with our comprehensive Nepal Income Tax Calculator. This grid keeps your household bookkeeping compliant with current Inland Revenue Department rules.',
                    link: { href: '/calculator/nepal-income-tax/', label: 'Nepal Income Tax Calculator' },
                  },
                  {
                    q: 'How is the 22K Tejabi gold price calculated from the 24K rate?',
                    a: 'The 22K Tejabi rate is not simply 91.6% of the 24K price. FENEGOSIDA independently sets the Tejabi rate each morning based on its own market assessment. Currently, the spread between 24K (Rs. 2,92,000) and 22K (Rs. 2,89,100) is Rs. 2,900 per Tola — reflecting both purity difference and market liquidity factors.',
                  },
                  {
                    q: 'What is Jyala and Jadaa (Jarti) charges in gold jewelry — and how do I calculate them?',
                    a: 'Jyala (ज्याला) is the making charge a jeweler adds for craftsmanship labor, typically 5% to 12% of the base gold value per Tola. Jadaa or Jarti (जाडा/जर्ति) is the wastage deduction — the minute gold loss during melting, cutting, and polishing, typically 1%–3%. Both are excluded from resale/liquidation payouts. Understanding what is Jyala and Jadaa charges is essential for auditing your retail invoice before purchase.',
                  },
                ].map((faq, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm group">
                    <h3 className="text-sm font-black text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {faq.a}{' '}
                      {faq.link && (
                        <a href={faq.link.href} className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors whitespace-nowrap">
                          {faq.link.label}
                        </a>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </>
  );
}
'''
    content = content[:idx1] + new_section
    with open('c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/market-rates/live-gold-price/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Success")
else:
    print("Failed to find boundaries")
