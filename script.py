import re

with open('c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/market-rates/live-gold-price/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Chunk 1
old_chunk_1 = '''            {/* ── Market Insight ── */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Market Insight: Gold Trading in Nepal 2083/84
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                  Gold is more than just a metal in Nepal; it is a vital asset for financial security and cultural heritage. The daily <strong>Gold Rate in Nepal</strong> is influenced by international LBMA (London Bullion Market Association) spot prices and the USD-to-NPR exchange rate published by Nepal Rastra Bank (NRB). Nepal applies approximately 20% customs duty on imported bullion, which creates the significant premium between the international spot price and the FENEGOSIDA domestic benchmark.
                </p>
                <p className="text-slate-700 text-base leading-relaxed mb-6">
                  Our dashboard provides high-precision data mapping directly to the <strong>FENEGOSIDA</strong> (Federation of Nepal Gold and Silver Dealers&apos; Association) official list, ensuring you have the most reliable figures for hallmark jewelry or investment biscuits. For all three trading boards — <strong>Fine Gold (छापावाल / 24K)</strong>, <strong>Tejabi Gold (तेजाबी / 22K)</strong>, and <strong>Silver (चाँदी / Chandi)</strong> — our calculator engine applies the exact conversion coefficients: 11.6638125 grams per Tola and 100 Lal per Tola.
                </p>
              </div>
            </section>'''

new_chunk_1 = '''            {/* ── Market Insight ── */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Introduction & Baseline Mechanics
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                  When tracking precious metal valuations across South Asia, accessing authentic, non-manipulated data is essential for both retail consumers and commercial investors. The baseline numbers used to write physical invoices are governed by a central regulatory group that balancing international market trends with localized supply constraints.
                </p>
                <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                  For maximum market transparency, buyers should cross-reference their showroom quotes with the daily benchmarks published directly by the{' '}
                  <a href="https://www.fenegosida.org/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">
                    Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA)
                  </a>, which fixes the baseline index at approximately 11:00 AM every morning from Sunday to Friday.
                </p>
              </div>
            </section>'''

content = content.replace(old_chunk_1, new_chunk_1)

# Chunks 2,3,4
old_mid = '''            {/* ══════════════════════════════════════════ */}
            {/* §2  MACRO-ECONOMIC DRIVERS                */}
            {/* ══════════════════════════════════════════ */}'''
end_mid = '''            {/* ══════════════════════════════════════════ */}
            {/* §5  MARKET HISTORY & VOLATILITY           */}
            {/* ══════════════════════════════════════════ */}'''

new_mid = '''            {/* ══════════════════════════════════════════ */}
            {/* §2  MACROECONOMIC DRIVERS & TARIFFS       */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Macroeconomic Drivers & Domestic Import Tariffs
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                These baseline numbers do not tell the whole story. The price of fine bullion in local showrooms carries a significant premium over raw international spot quotes because of domestic fiscal policies. Every ounce of gold legally entering the country passes through customs checkpoints where it encounters strict entry fees.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                As of 2026, the government applies a 20% customs import duty on all incoming raw bullion bars. This tariff protects foreign currency reserves and regulates domestic consumption during peak wedding and festival seasons. Because these import taxes are calculated alongside bank handling commissions, transport logistics, and local insurance overhead, even minor adjustments to national fiscal policy can cause instant price shifts across local showrooms.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                If you are trying to calculate exactly how these state boundaries and import duties change the baseline cost of raw bullion bars before craftsmanship fees are added, you can compute the exact structural customs markup automatically using our interactive{' '}
                <a href="/calculator/gold-tax/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">
                  Gold Tax Calculator
                </a>.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-8 font-medium">
                Understanding these fiscal barriers explains why local retail prices diverge from global spot trends, transforming raw gold from a simple global commodity into a highly regulated domestic asset.
              </p>

              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">Commercial Banking Restrictions & Liquidation Rules</h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                Beyond custom duties, physical supply limits play a major role in local market behavior. To maintain macroeconomic stability and prevent a drop in foreign cash reserves, the central banking authority strictly limits how much bullion can legally enter the country.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                The{' '}
                <a href="https://www.nrb.org.np/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">
                  Nepal Rastra Bank (NRB)
                </a>{' '}
                manages a strict daily import quota system for commercial banks, typically limiting total entry to 20 kilograms per day, though this can shift depending on foreign reserve health. When demand outpaces this daily bank quota, local markets can face sudden supply shortages. This raw physical scarcity often forces retail associations to raise premiums, causing domestic street prices to spike even if global spot indicators drop.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                Conversely, when individuals look to liquidate family assets during economic downturns, these supply dynamics shift again. Storefronts run a reverse calculation, ignoring the original making charges or VAT paid during purchase. Instead, they run your jewelry through an acid or XRF purity test and apply a standard 2% to 5% melting loss deduction against the daily raw index. This covers the processing costs required to turn scrap gold back into pure investment-grade bullion.
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
                To accurately calculate your final costs, you need to understand how traditional weight systems map onto modern metric measurements. Local marketplaces rely heavily on historical South Asian terms like Tolas, Anas, and Lals, while modern refiners use grams and kilograms.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                To bridge this gap cleanly, our calculation engine relies on precise mathematical constants. One full Tola equals exactly 11.6638 grams, which means 10 grams of fine gold represents 0.85735 Tola. For smaller custom pieces, a Tola is broken down into 100 Lals, meaning a single Lal equals 0.1166 grams of metal.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                Because local gold prices are ultimately tied to international contracts priced in US Dollars per troy ounce, any shift in the value of the local currency will immediately alter your counter price. If you want to see how these currency shifts change your purchasing power, you can track real-time global currency pairs using our automated{' '}
                <a href="/market-rates/exchange-rate/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">
                  Live Forex Exchange Rates Engine
                </a>.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                Monitoring this currency layer helps you anticipate domestic price spikes driven by exchange rate fluctuations, even when global gold prices remain completely flat.
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
                When you buy finished jewelry at a retail store, the price on your invoice will always be higher than the raw material benchmarks listed online. Showrooms have to account for craftsmanship labor costs (Jyala) and material loss margins (Jarti or wastage).
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                Making charges vary based on the complexity of the piece, ranging from 5% for simple bands to over 12% for intricate bridal sets. On top of that, a mandatory 13% Value Added Tax (VAT) is applied to the combined cost of the metal and labor.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                While gold remains the primary asset for financial security and heritage across the country, silver follows a similar retail logic. Silver prices track independently based on industrial demand and regional silversmithing needs. To check raw benchmarks, calculate metric conversions, or view current rates for custom gemstone settings, check out our companion{' '}
                <a href="/market-rates/live-silver-price/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">
                  Live Silver Price Calculator
                </a>.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                Reviewing both metals gives you a complete overview of the market, helping you budget accurately before stepping into a showroom.
              </p>
            </section>

'''

idx1 = content.find(old_mid)
idx2 = content.find(end_mid)

if idx1 != -1 and idx2 != -1:
    content = content[:idx1] + new_mid + content[idx2:]
    with open('c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/market-rates/live-gold-price/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Success")
else:
    print("Failed to find boundaries")
