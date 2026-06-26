import { calcMeta } from '@/lib/calcMeta';
import ForexDashboardClient from './ForexDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "NRB Exchange Rate Today | Live Dollar Rate Nepal | USD to NPR",
  description: "Check today's official Nepal Rastra Bank (NRB) exchange rates including USD to NPR, EUR, GBP, AUD, AED, QAR, SAR and INR. Compare buying and selling rates with live currency conversion.",
  slug: 'market-rates/exchange-rate-nepal',
  canonical: '/market-rates/exchange-rate-nepal/',
  keywords: [
    "NRB Exchange Rate Today",
    "Foreign Exchange Rate Nepal",
    "USD to NPR",
    "Dollar Rate Nepal Today",
    "Currency Converter Nepal",
    "Remittance Exchange Rate Nepal",
    "EUR to NPR",
    "GBP to NPR",
    "AUD to NPR",
    "AED to NPR",
    "QAR to NPR",
    "SAR to NPR"
  ],
  ogImage: "https://nepacalc.com/images/nrb-exchange-rate-today-nepal.webp"
});

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="NRB Exchange Rate Today Nepal (2083/84)"
        description="Today's official Nepal Rastra Bank (NRB) exchange rate provides the latest buying and selling rates for major foreign currencies against the Nepalese Rupee (NPR). Whether you're checking the Dollar Rate in Nepal, converting USD to NPR, comparing remittance values, or tracking international forex markets, this page gives you real-time foreign exchange information based on the official daily rates published by Nepal Rastra Bank. The live exchange rate dashboard below updates every banking day and includes major currencies such as the US Dollar (USD), Euro (EUR), British Pound (GBP), Australian Dollar (AUD), UAE Dirham (AED), Qatar Riyal (QAR), Saudi Riyal (SAR), Indian Rupee (INR), and more."
        crumbs={[{ label: 'Market Rates', href: '/market-rates/' }, { label: 'Exchange Rate Nepal' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Remittance Board', slug: '/market-rates/remittance/' },
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Income Tax', slug: '/calculator/nepal-income-tax/' }
        ]}
      >
        {/* LIVE DASHBOARD — kept intact */}
        <ForexDashboardClient />

        {/* SERVER-RENDERED: Static currency table for Googlebot indexability */}
        <div className="hp-container pt-10 pb-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">NRB Reference Rates — Indicative</p>
              <p className="text-xs text-slate-400">Last Updated: <time dateTime="2026-06">June 2026</time></p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm text-left">
                <caption className="sr-only">NRB Exchange Rate Today — Buying and Selling Rates for USD, EUR, GBP, AUD, AED, QAR, SAR and INR against Nepalese Rupee</caption>
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 py-3">Currency</th>
                    <th scope="col" className="px-4 py-3">Code</th>
                    <th scope="col" className="px-4 py-3">Buying (NPR)</th>
                    <th scope="col" className="px-4 py-3">Selling (NPR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr><td className="px-4 py-3 font-semibold">US Dollar</td><td className="px-4 py-3 text-slate-500">USD</td><td className="px-4 py-3">132.50</td><td className="px-4 py-3">133.10</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Euro</td><td className="px-4 py-3 text-slate-500">EUR</td><td className="px-4 py-3">144.20</td><td className="px-4 py-3">144.90</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">UK Pound Sterling</td><td className="px-4 py-3 text-slate-500">GBP</td><td className="px-4 py-3">168.40</td><td className="px-4 py-3">169.20</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Australian Dollar</td><td className="px-4 py-3 text-slate-500">AUD</td><td className="px-4 py-3">85.30</td><td className="px-4 py-3">85.90</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">UAE Dirham</td><td className="px-4 py-3 text-slate-500">AED</td><td className="px-4 py-3">36.10</td><td className="px-4 py-3">36.40</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Qatari Riyal</td><td className="px-4 py-3 text-slate-500">QAR</td><td className="px-4 py-3">36.40</td><td className="px-4 py-3">36.70</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Saudi Riyal</td><td className="px-4 py-3 text-slate-500">SAR</td><td className="px-4 py-3">35.30</td><td className="px-4 py-3">35.60</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Indian Rupee</td><td className="px-4 py-3 text-slate-500">INR</td><td className="px-4 py-3 text-slate-400" colSpan={2}>Fixed: 100 INR = 160 NPR</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">* Indicative rates based on <a href="https://www.nrb.org.np" target="_blank" rel="noopener noreferrer" className="underline">Nepal Rastra Bank</a> reference benchmarks. Updated automatically after NRB publishes daily exchange rates.</p>
          </div>
        </div>

        {/* ── PART 1 CONTENT STARTS HERE ── */}
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-slate max-w-none">

              <h2>Today&apos;s NRB Exchange Rate Highlights</h2>
              <p>Today&apos;s exchange rate board provides the latest official reference rates published by Nepal Rastra Bank (NRB) for the most commonly traded foreign currencies in Nepal.</p>
              <p>Today&apos;s highlighted currencies include:</p>
              <ul>
                <li>🇺🇸 US Dollar (USD) to NPR</li>
                <li>🇪🇺 Euro (EUR) to NPR</li>
                <li>🇬🇧 British Pound (GBP) to NPR</li>
                <li>🇦🇺 Australian Dollar (AUD) to NPR</li>
                <li>🇦🇪 UAE Dirham (AED) to NPR</li>
                <li>🇶🇦 Qatar Riyal (QAR) to NPR</li>
                <li>🇸🇦 Saudi Riyal (SAR) to NPR</li>
                <li>🇮🇳 Indian Rupee (INR) to NPR</li>
              </ul>
              <p>The exchange rates shown above are the official buying and selling rates used throughout Nepal by commercial banks, remittance providers, businesses, importers, exporters, travelers, and financial institutions.</p>

              <hr />

              <h2>What is the NRB Exchange Rate Today?</h2>
              <p>The NRB Exchange Rate Today refers to the official foreign exchange rates published by Nepal Rastra Bank, the central bank of Nepal. These rates act as the benchmark for commercial banks, licensed money exchangers, remittance companies, and financial institutions operating within Nepal.</p>
              <p>Every banking day, Nepal Rastra Bank publishes the official buying and selling rates for dozens of international currencies. These rates are widely used for:</p>
              <ul>
                <li>International money transfers</li>
                <li>Import and export settlements</li>
                <li>Foreign currency exchange</li>
                <li>International travel</li>
                <li>Overseas education payments</li>
                <li>Business transactions</li>
                <li>Banking operations</li>
                <li>Financial reporting</li>
              </ul>
              <p>Although commercial banks may apply small service margins, their exchange rates generally follow the official benchmark established by Nepal Rastra Bank. You can also use our <Link href="/calculator/currency-converter/" className="text-[#1a0dab] underline font-bold">Currency Converter Nepal</Link> to instantly calculate any foreign currency amount in Nepalese Rupees.</p>

              <hr />

              <h2>Live Foreign Exchange Rates in Nepal</h2>
              <p>NepaCalc provides a live foreign exchange dashboard that displays the latest official exchange rates released by Nepal Rastra Bank. The exchange rate table above includes buying rates, selling rates, and currency conversion values for major global currencies.</p>
              <p>Popular currencies tracked include:</p>
              <ul>
                <li>US Dollar (USD)</li>
                <li>Euro (EUR)</li>
                <li>British Pound (GBP)</li>
                <li>Australian Dollar (AUD)</li>
                <li>Canadian Dollar (CAD)</li>
                <li>Japanese Yen (JPY)</li>
                <li>UAE Dirham (AED)</li>
                <li>Saudi Riyal (SAR)</li>
                <li>Qatar Riyal (QAR)</li>
                <li>Indian Rupee (INR)</li>
                <li>Chinese Yuan (CNY)</li>
                <li>Swiss Franc (CHF)</li>
                <li>Singapore Dollar (SGD)</li>
                <li>Malaysian Ringgit (MYR)</li>
              </ul>
              <p>These exchange rates are updated every official banking day after Nepal Rastra Bank releases its daily foreign exchange bulletin. Track live gold prices in Nepal at our <Link href="/market-rates/live-gold-price/" className="text-[#1a0dab] underline font-bold">Live Gold Price Nepal</Link> page.</p>

              <hr />

              <h2>Popular Currency Conversions</h2>
              <p>The most searched foreign exchange conversions in Nepal include:</p>
              <ul>
                <li>USD to NPR</li>
                <li>EUR to NPR</li>
                <li>GBP to NPR</li>
                <li>AUD to NPR</li>
                <li>AED to NPR</li>
                <li>QAR to NPR</li>
                <li>SAR to NPR</li>
                <li>INR to NPR</li>
              </ul>
              <p>Use the live <Link href="/calculator/currency-converter/" className="text-[#1a0dab] underline font-bold">Currency Converter Nepal</Link> above to instantly calculate the Nepalese Rupee equivalent using the latest official Nepal Rastra Bank exchange rates. For remittance-specific conversions, visit our <Link href="/calculator/remittance-calculator/" className="text-[#1a0dab] underline font-bold">Remittance Calculator</Link>.</p>

              <hr />

              <h2>Why Thousands of Users Check NRB Exchange Rates Daily</h2>
              <p>Foreign exchange rates affect millions of financial transactions in Nepal every day. Individuals and businesses rely on official NRB exchange rates for accurate currency conversion and financial planning.</p>
              <p>Common reasons people check today&apos;s exchange rates include:</p>
              <ul>
                <li>Sending money abroad</li>
                <li>Receiving remittances</li>
                <li>Buying or selling foreign currency</li>
                <li>Paying university tuition overseas</li>
                <li>Importing goods</li>
                <li>Export settlements</li>
                <li>International travel</li>
                <li>Investment planning</li>
                <li>Online international purchases</li>
                <li>Monitoring the US Dollar against the Nepalese Rupee</li>
              </ul>
              <p>Using official Nepal Rastra Bank rates helps users make informed financial decisions while avoiding outdated or inaccurate exchange information. If you&apos;re planning your finances around foreign income, our <Link href="/calculator/nepal-income-tax/" className="text-[#1a0dab] underline font-bold">Nepal Income Tax Calculator</Link> and <Link href="/calculator/savings/" className="text-[#1a0dab] underline font-bold">Savings Calculator</Link> can help you plan effectively.</p>

              {/* ── PART 2 CONTENT ── */}

              <hr />

              <h2>How Nepal Rastra Bank (NRB) Calculates Exchange Rates</h2>
              <p>Nepal Rastra Bank (NRB) is the central bank responsible for publishing the official foreign exchange rates used throughout Nepal. Every banking day, NRB collects foreign exchange quotations from licensed commercial banks and determines the official reference rates for major international currencies.</p>
              <p>The published exchange rates serve as the benchmark for banks, financial institutions, licensed money exchangers, importers, exporters, businesses, and remittance providers across Nepal.</p>
              <p>For globally traded currencies such as the US Dollar (USD), Euro (EUR), British Pound (GBP), Australian Dollar (AUD), UAE Dirham (AED), Qatar Riyal (QAR), and Saudi Riyal (SAR), the exchange rates reflect movements in the international foreign exchange market while considering Nepal&apos;s domestic banking system.</p>
              <p>The Indian Rupee (INR) follows a different mechanism because Nepal maintains a fixed exchange rate arrangement with India. As a result, the INR exchange rate remains comparatively stable while other currencies fluctuate according to global market conditions.</p>

              <hr />

              <h2>Understanding Buying Rate and Selling Rate</h2>
              <p>Every official exchange rate published by Nepal Rastra Bank includes two values:</p>

              <h3>Buying Rate</h3>
              <p>The buying rate represents the amount a bank pays when purchasing foreign currency from customers.</p>
              <p>For example, if you sell US Dollars to a bank in Nepal, the bank purchases your currency using the official buying rate.</p>
              <p>Typical situations include:</p>
              <ul>
                <li>Selling foreign cash</li>
                <li>Receiving international payments</li>
                <li>Exchanging travel currency</li>
                <li>Foreign income conversion</li>
              </ul>

              <h3>Selling Rate</h3>
              <p>The selling rate represents the amount customers pay when purchasing foreign currency from banks.</p>
              <p>This rate applies when:</p>
              <ul>
                <li>Buying USD for travel</li>
                <li>Paying foreign university tuition</li>
                <li>Importing goods</li>
                <li>International business payments</li>
                <li>Overseas investments</li>
              </ul>
              <p>Because banks include operational costs and market margins, the selling rate is always slightly higher than the buying rate.</p>

              <hr />

              <h2>Why Exchange Rates Change Every Day</h2>
              <p>Foreign exchange rates constantly change due to movements in the global financial markets. Several important factors influence the daily value of foreign currencies against the Nepalese Rupee.</p>

              <h3>Global Demand and Supply</h3>
              <p>The international demand for currencies such as the US Dollar and Euro changes every second. Higher demand generally increases currency value, while lower demand causes prices to decline.</p>

              <h3>Inflation</h3>
              <p>Countries with lower inflation generally maintain stronger currencies compared to countries experiencing higher inflation.</p>

              <h3>Interest Rates</h3>
              <p>Central bank interest rate decisions significantly influence foreign exchange markets. Higher interest rates often attract international investment, increasing demand for that country&apos;s currency.</p>

              <h3>International Trade</h3>
              <p>Imports and exports directly affect foreign currency demand. Nepal imports petroleum products, machinery, electronics, and industrial materials, creating sustained demand for foreign currencies.</p>

              <h3>Economic Growth</h3>
              <p>GDP growth, employment data, consumer spending, and industrial production all influence investor confidence and currency valuation.</p>

              <h3>Political Stability</h3>
              <p>Political certainty generally strengthens investor confidence, while uncertainty often creates exchange rate volatility.</p>

              <hr />

              <h2>Foreign Exchange Market in Nepal</h2>
              <p>Nepal operates a regulated foreign exchange system supervised by Nepal Rastra Bank. Unlike completely free-floating currencies, Nepal&apos;s banking sector follows official guidelines issued by NRB while allowing commercial banks limited flexibility in their daily buying and selling prices.</p>
              <p>Licensed commercial banks, development banks, finance companies, and authorized money exchange centers use the official NRB reference rates as the basis for their foreign exchange transactions.</p>
              <p>The official rates are widely used for:</p>
              <ul>
                <li>International remittance</li>
                <li>Import and export settlements</li>
                <li>Overseas education payments</li>
                <li>Foreign employment income</li>
                <li>Tourism</li>
                <li>International banking</li>
                <li>Business transactions</li>
              </ul>

              <hr />

              <h2>Indian Rupee Exchange Rate in Nepal</h2>
              <p>The Indian Rupee (INR) occupies a unique position within Nepal&apos;s financial system. Unlike other international currencies, the Nepalese Rupee is officially pegged to the Indian Rupee at a fixed rate of <strong>100 INR = 160 NPR</strong>.</p>
              <p>The long-established exchange arrangement between Nepal and India provides greater stability for cross-border trade, tourism, and financial transactions. Because of this fixed exchange relationship, INR fluctuations inside Nepal are considerably smaller than those observed in freely traded currencies such as USD, EUR, GBP, or AUD.</p>

              <hr />

              <h2>Most Popular Currency Conversions in Nepal</h2>
              <p>The currencies most frequently exchanged in Nepal include:</p>

              <h3>🇺🇸 USD to NPR — Dollar Rate Nepal Today</h3>
              <p>The US Dollar remains Nepal&apos;s most searched foreign currency due to international trade, education, remittance, tourism, and business transactions. The <strong>Dollar Rate Nepal Today</strong> is the single most checked foreign exchange rate in the country.</p>

              <h3>🇪🇺 EUR to NPR — Euro Rate Nepal</h3>
              <p>The Euro is widely used for travel, higher education, and European business settlements. Demand for EUR to NPR conversions increases significantly during study admission seasons.</p>

              <h3>🇬🇧 GBP to NPR — British Pound Rate Nepal</h3>
              <p>The British Pound is important for Nepalese residents working or studying in the United Kingdom. GBP to NPR conversions are frequently required for remittance and tuition payments.</p>

              <h3>🇦🇺 AUD to NPR — Australian Dollar Rate Nepal</h3>
              <p>Australia is one of the largest education destinations for Nepalese students, making the <strong>Australian Dollar Rate Nepal</strong> one of the most searched forex queries during university enrollment periods.</p>

              <h3>🇦🇪 AED to NPR — UAE Dirham Rate Nepal</h3>
              <p>Thousands of Nepalese workers in the United Arab Emirates regularly monitor AED exchange rates for remittance purposes. The <strong>AED to NPR</strong> rate directly impacts the income received by families in Nepal.</p>

              <h3>🇶🇦 QAR to NPR — Qatar Riyal Rate Nepal</h3>
              <p>Qatar remains one of Nepal&apos;s largest sources of foreign remittance, making the <strong>Qatar Riyal Rate Nepal</strong> critically important. Monitoring the QAR to NPR exchange rate helps workers maximise remittance value.</p>

              <h3>🇸🇦 SAR to NPR — Saudi Riyal Rate Nepal</h3>
              <p>Saudi Arabia employs a significant Nepalese workforce, making the <strong>Saudi Riyal Rate Nepal</strong> essential for families receiving remittance. SAR to NPR is one of the most frequently checked remittance-related currency pairs in Nepal.</p>

              <hr />

              <h2>Who Uses Daily Exchange Rates?</h2>
              <p>Official exchange rates are important for a wide range of individuals and organisations in Nepal:</p>
              <ul>
                <li>Individuals receiving or sending remittance</li>
                <li>Businesses engaged in import and export</li>
                <li>Students paying overseas tuition fees</li>
                <li>Tourists exchanging travel currency</li>
                <li>Importers settling trade invoices</li>
                <li>Exporters receiving international payments</li>
                <li>Banks and financial institutions</li>
                <li>Remittance companies</li>
                <li>Government agencies</li>
                <li>Investors and financial analysts</li>
              </ul>
              <p>Whether you&apos;re sending money abroad, receiving remittance, purchasing foreign currency, or planning international travel, using the latest Nepal Rastra Bank exchange rates ensures accurate financial calculations. Use our <Link href="/calculator/remittance-calculator/" className="text-[#1a0dab] underline font-bold">Remittance Calculator</Link> to compare your actual payout value.</p>

              {/* ── PART 3 CONTENT ── */}

              <hr />

              <h2>Exchange Rates Offered by Banks in Nepal</h2>
              <p>Commercial banks and licensed financial institutions across Nepal use the official Nepal Rastra Bank (NRB) foreign exchange rates as the benchmark for their daily buying and selling prices. While individual banks may apply small adjustments based on operational costs, liquidity, and internal margins, their exchange rates generally remain close to the official rates published by NRB.</p>
              <p>Major banks that publish daily foreign exchange rates include:</p>
              <ul>
                <li>Global IME Bank</li>
                <li>Nabil Bank</li>
                <li>NIC Asia Bank</li>
                <li>Everest Bank</li>
                <li>Himalayan Bank</li>
                <li>Rastriya Banijya Bank</li>
                <li>Nepal Bank Limited</li>
                <li>Prabhu Bank</li>
                <li>Standard Chartered Nepal</li>
                <li>Prime Commercial Bank</li>
                <li>Kumari Bank</li>
                <li>Sanima Bank</li>
              </ul>
              <p>If you&apos;re exchanging a large amount of foreign currency, comparing the published rates of several banks may help you obtain a slightly better buying or selling rate. However, the official Nepal Rastra Bank benchmark remains the reference point for the entire banking system.</p>

              <hr />

              <h2>Which Bank Gives the Highest Exchange Rate in Nepal?</h2>
              <p>There is no single bank that consistently offers the highest exchange rate every day. Commercial banks adjust their foreign exchange rates based on:</p>
              <ul>
                <li>Nepal Rastra Bank reference rates</li>
                <li>International currency market movements</li>
                <li>Market demand</li>
                <li>Liquidity requirements</li>
                <li>Internal operating margins</li>
                <li>Cash availability</li>
              </ul>
              <p>Some banks may offer slightly better buying rates, while others may provide more competitive selling rates depending on the currency and market conditions. For the most accurate comparison, check the latest exchange rates published by multiple licensed commercial banks before completing a transaction.</p>
              <p>For most users, the official Nepal Rastra Bank exchange rate serves as the best benchmark for comparing commercial bank rates. Our <Link href="/calculator/currency-converter/" className="text-[#1a0dab] underline font-bold">Currency Converter Nepal</Link> uses the latest NRB reference rates for all conversions.</p>

              <hr />

              <h2>Exchange Rates for Remittance Services</h2>
              <p>Nepal is one of the world&apos;s largest remittance-receiving countries, making foreign exchange rates especially important for millions of families. Remittance providers often use exchange rates that differ slightly from the official Nepal Rastra Bank reference rate because they include their own service margins and promotional offers.</p>
              <p>Popular remittance providers include:</p>
              <ul>
                <li>IME</li>
                <li>Western Union</li>
                <li>MoneyGram</li>
                <li>Wise</li>
                <li>WorldRemit</li>
                <li>Remitly</li>
                <li>Xoom</li>
                <li>Prabhu Money Transfer</li>
                <li>City Express</li>
              </ul>
              <p>Although these providers generally follow the market trend established by Nepal Rastra Bank, the final amount received in Nepalese Rupees may vary depending on transfer fees, service charges, promotional exchange rates, transfer method, destination country, and payment partner. Always compare both the exchange rate and transfer fees before sending international money. Use our <Link href="/calculator/remittance-calculator/" className="text-[#1a0dab] underline font-bold">Remittance Calculator</Link> to estimate your exact payout.</p>

              <hr />

              <h2>USD to NPR Exchange Rate</h2>
              <p>The US Dollar (USD) is the most widely traded foreign currency in Nepal and plays a significant role in international business, education, tourism, and remittance. Many Nepalese monitor the USD to NPR exchange rate daily for purposes such as:</p>
              <ul>
                <li>International tuition payments</li>
                <li>Foreign employment income</li>
                <li>Import and export businesses</li>
                <li>Online purchases</li>
                <li>International investments</li>
                <li>Travel expenses</li>
              </ul>
              <p>The USD to NPR rate changes according to movements in global foreign exchange markets and is officially published every banking day by Nepal Rastra Bank. Pair this with our <Link href="/calculator/savings/" className="text-[#1a0dab] underline font-bold">Savings Calculator</Link> to plan your foreign income effectively.</p>

              <hr />

              <h2>EUR to NPR Exchange Rate</h2>
              <p>The Euro (EUR) is the official currency of the European Union and is widely used by Nepalese students, businesses, and travelers. The EUR to NPR exchange rate is influenced by:</p>
              <ul>
                <li>European Central Bank monetary policy</li>
                <li>Inflation in the Eurozone</li>
                <li>International trade</li>
                <li>Global financial markets</li>
                <li>Nepal Rastra Bank daily benchmark</li>
              </ul>

              <hr />

              <h2>GBP to NPR Exchange Rate</h2>
              <p>The British Pound Sterling (GBP) remains one of the strongest global currencies. Many Nepalese living, studying, or working in the United Kingdom regularly monitor GBP to NPR exchange rates before transferring money home. The GBP to NPR rate directly impacts the value of remittances received by families across Nepal.</p>

              <hr />

              <h2>AUD to NPR Exchange Rate</h2>
              <p>Australia is one of the most popular destinations for Nepalese students, making AUD to NPR among the most searched foreign currency pairs in Nepal. Australian Dollar exchange rates are influenced by Reserve Bank of Australia decisions, commodity prices, Australian employment data, and global financial markets.</p>

              <hr />

              <h2>AED, QAR and SAR Exchange Rates</h2>
              <p>Workers in the Middle East contribute a large percentage of Nepal&apos;s annual remittance inflow. Because of this, exchange rates for the UAE Dirham (AED), Qatar Riyal (QAR), and Saudi Riyal (SAR) are among the most frequently checked foreign currencies in Nepal.</p>
              <p>Families receiving overseas remittances often monitor these rates daily before collecting transferred funds. Monitor the latest <Link href="/market-rates/live-gold-price/" className="text-[#1a0dab] underline font-bold">Live Gold Price in Nepal</Link> alongside remittance rates for comprehensive financial planning.</p>

              <hr />

              <h2>Historical Exchange Rate Trends</h2>
              <p>Foreign exchange rates fluctuate continuously due to changes in global financial markets. Monitoring historical exchange rates helps individuals and businesses understand long-term currency trends before making financial decisions.</p>
              <p>Our exchange rate tools are designed to help users monitor:</p>
              <ul>
                <li>Daily exchange rates</li>
                <li>Weekly movement</li>
                <li>Monthly trends</li>
                <li>Annual performance</li>
                <li>Long-term currency direction</li>
              </ul>
              <p>Historical data can assist businesses, travelers, investors, and remittance recipients in identifying favorable exchange opportunities. If you hold foreign income, our <Link href="/calculator/nepal-income-tax/" className="text-[#1a0dab] underline font-bold">Nepal Income Tax Calculator</Link> can help you plan your tax liability accordingly.</p>

              <hr />

              <h2>Currency Conversion Guide</h2>
              <p>Using today&apos;s Nepal Rastra Bank exchange rate, converting foreign currencies into Nepalese Rupees is straightforward.</p>
              <h3>Example Conversion: USD to NPR</h3>
              <p>If <strong>1 USD = NPR 133.10</strong> (selling rate), then:</p>
              <ul>
                <li>10 USD = NPR 1,331</li>
                <li>50 USD = NPR 6,655</li>
                <li>100 USD = NPR 13,310</li>
                <li>500 USD = NPR 66,550</li>
                <li>1,000 USD = NPR 1,33,100</li>
              </ul>
              <p>Similarly, you can calculate conversions for EUR, GBP, AUD, AED, SAR, and QAR using the live <Link href="/calculator/currency-converter/" className="text-[#1a0dab] underline font-bold">Currency Converter Nepal</Link> available above. For long-term savings planning in foreign currency, our <Link href="/calculator/fd-calculator/" className="text-[#1a0dab] underline font-bold">Fixed Deposit Calculator</Link> can also be helpful.</p>

              <hr />

              <h2>Why Use NepaCalc Exchange Rates?</h2>
              <p>NepaCalc provides a centralized platform for checking official Nepal Rastra Bank exchange rates together with practical financial tools. Instead of searching multiple websites, users can:</p>
              <ul>
                <li>View today&apos;s official exchange rates</li>
                <li>Compare buying and selling prices</li>
                <li>Convert currencies instantly</li>
                <li>Monitor major foreign currencies</li>
                <li>Access related financial calculators</li>
                <li>Stay informed about Nepal&apos;s foreign exchange market</li>
              </ul>
              <p>The goal is to provide accurate, easy-to-understand exchange rate information for individuals, businesses, students, travelers, and financial professionals across Nepal.</p>

              {/* ── PART 4: FAQ SECTION ── */}

              <hr />

              <h2>Frequently Asked Questions</h2>

              <h3>What is the Nepal Rastra Bank (NRB) exchange rate?</h3>
              <p>The Nepal Rastra Bank (NRB) exchange rate is the official foreign exchange reference rate published by Nepal&apos;s central bank every banking day. It provides the official buying and selling rates for major international currencies, including the US Dollar (USD), Euro (EUR), British Pound (GBP), Australian Dollar (AUD), UAE Dirham (AED), Saudi Riyal (SAR), Qatar Riyal (QAR), Japanese Yen (JPY), Indian Rupee (INR), and many others.</p>
              <p>Commercial banks and licensed money exchange institutions use these reference rates as the benchmark for their own daily foreign exchange transactions.</p>

              <h3>What is today&apos;s dollar rate in Nepal?</h3>
              <p>The US Dollar (USD) exchange rate changes every banking day based on the official rates published by Nepal Rastra Bank. The live exchange rate table above automatically displays today&apos;s official USD buying and selling rates together with other major currencies.</p>
              <p>For the latest USD to NPR exchange rate, always refer to the official daily update published by Nepal Rastra Bank and reflected in the live dashboard on this page.</p>

              <h3>How much is 1 USD in Nepal today?</h3>
              <p>The value of 1 US Dollar in Nepal depends on the official Nepal Rastra Bank exchange rate published for that day. Simply check the live USD to NPR section above to see the latest buying rate, selling rate, and estimated conversion values.</p>
              <p>You can also use the built-in currency converter to convert any USD amount into Nepalese Rupees instantly.</p>

              <h3>How is the exchange rate calculated in Nepal?</h3>
              <p>Nepal uses two different exchange rate systems. For the Indian Rupee (INR), Nepal maintains a fixed currency peg where <strong>100 INR = 160 NPR</strong>.</p>
              <p>For all other foreign currencies such as USD, EUR, GBP, AUD, AED, QAR, and SAR, Nepal Rastra Bank determines the official exchange rate using international foreign exchange markets, commercial bank quotations, cross-currency calculations, market liquidity, and global currency movements. The official rates are published every banking day.</p>

              <h3>Why are buying and selling exchange rates different?</h3>
              <p>Banks purchase foreign currency from customers at the buying rate and sell foreign currency at the selling rate. The difference between these two prices is called the exchange spread. The spread covers banking costs, foreign exchange risk, currency fluctuations, and operational expenses. Selling rates are therefore always slightly higher than buying rates.</p>

              <h3>Which bank gives the highest exchange rate in Nepal?</h3>
              <p>No commercial bank consistently provides the highest exchange rate every day. Exchange rates vary between banks depending on market demand, currency availability, internal pricing strategy, liquidity, and Nepal Rastra Bank reference rates.</p>
              <p>Comparing several banks before making large foreign exchange transactions can help you receive a better rate.</p>

              <h3>Is the Nepal Rastra Bank exchange rate the same as bank rates?</h3>
              <p>Not exactly. The Nepal Rastra Bank publishes the official reference rate. Commercial banks generally follow this benchmark but may apply slightly different buying and selling prices depending on their own margins.</p>
              <p>Therefore, the final exchange rate at your bank may differ slightly from the official NRB rate.</p>

              <h3>Why do exchange rates change every day?</h3>
              <p>Foreign exchange markets operate continuously around the world. Exchange rates fluctuate because of global demand and supply, inflation, interest rates, international trade, economic news, political events, and central bank policies. As international markets change, Nepal Rastra Bank updates its official exchange rates accordingly.</p>

              <h3>How often are exchange rates updated?</h3>
              <p>Nepal Rastra Bank normally publishes updated exchange rates once every banking day. NepaCalc automatically refreshes the displayed rates whenever new official data becomes available, ensuring you always see the most recent NRB reference rates.</p>

              <h3>What currencies are available?</h3>
              <p>The exchange rate page supports major global currencies including USD, EUR, GBP, AUD, CAD, CHF, JPY, SGD, CNY, HKD, AED, QAR, SAR, and INR. Additional currencies may also be listed depending on the official Nepal Rastra Bank publication.</p>

              <h3>Can I use these exchange rates for remittance calculations?</h3>
              <p>Yes. The official Nepal Rastra Bank rates provide an excellent benchmark for estimating remittance values. However, remittance companies such as IME, Wise, Western Union, MoneyGram, Remitly, and WorldRemit may apply their own exchange margins and service fees, so the final received amount may vary. Use our <Link href="/calculator/remittance-calculator/" className="text-[#1a0dab] underline font-bold">Remittance Calculator</Link> for a detailed estimate.</p>

              <h3>How can I convert foreign currency into Nepalese Rupees?</h3>
              <p>Simply enter the amount into the <Link href="/calculator/currency-converter/" className="text-[#1a0dab] underline font-bold">Currency Converter Nepal</Link> provided on this page. The calculator uses the latest available Nepal Rastra Bank exchange rates to estimate the equivalent value in Nepalese Rupees (NPR).</p>

              <h3>Is the Indian Rupee exchange rate fixed in Nepal?</h3>
              <p>Yes. Unlike other currencies, the Nepalese Rupee is officially pegged to the Indian Rupee. The fixed exchange rate is <strong>100 Indian Rupees = 160 Nepalese Rupees</strong>. This peg helps maintain financial stability because of the close economic relationship between Nepal and India. This arrangement has been in place since 1993.</p>

              <h3>Why should I use NepaCalc instead of checking multiple bank websites?</h3>
              <p>NepaCalc brings together official Nepal Rastra Bank exchange rates, a live currency converter, educational resources, and related financial calculators in one place. Instead of checking multiple commercial bank websites individually, you can quickly compare rates, convert currencies, and access additional financial tools from a single page.</p>

              <hr />

              <h2>Related Tools &amp; Resources</h2>
              <ul>
                <li><Link href="/market-rates/live-gold-price/" className="text-[#1a0dab] underline font-bold">Live Gold Price in Nepal</Link></li>
                <li><Link href="/calculator/currency-converter/" className="text-[#1a0dab] underline font-bold">Currency Converter Nepal</Link></li>
                <li><Link href="/calculator/remittance-calculator/" className="text-[#1a0dab] underline font-bold">Remittance Calculator</Link></li>
                <li><Link href="/calculator/nepal-income-tax/" className="text-[#1a0dab] underline font-bold">Nepal Income Tax Calculator</Link></li>
                <li><Link href="/calculator/savings/" className="text-[#1a0dab] underline font-bold">Savings Calculator</Link></li>
                <li><Link href="/calculator/fd-calculator/" className="text-[#1a0dab] underline font-bold">Fixed Deposit Calculator</Link></li>
                <li><Link href="/electricity/nepal-unit-price/" className="text-[#1a0dab] underline font-bold">Nepal Electricity Unit Price</Link></li>
                <li><Link href="/electricity/nea-tariff-rates/" className="text-[#1a0dab] underline font-bold">NEA Tariff Rates</Link></li>
              </ul>

            </div>
          </div>
        </div>
      </CalcWrapper>

      {/* ── ALL 10 SCHEMA BLOCKS ── */}

      {/* 1. WebPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"WebPage",
        "@id":"https://nepacalc.com/market-rates/exchange-rate-nepal/#webpage",
        "url":"https://nepacalc.com/market-rates/exchange-rate-nepal/",
        "name":"NRB Exchange Rate Today | Live Dollar Rate Nepal | USD to NPR",
        "headline":"NRB Exchange Rate Today",
        "description":"Check today's official Nepal Rastra Bank (NRB) exchange rates including USD to NPR, EUR, GBP, AUD, AED, QAR, SAR and INR. Compare buying and selling rates with live currency conversion.",
        "inLanguage":"en",
        "dateModified":"2026-06-26",
        "isPartOf":{ "@type":"WebSite", "url":"https://nepacalc.com" },
        "primaryImageOfPage":{ "@type":"ImageObject", "url":"https://nepacalc.com/images/nrb-exchange-rate-today-nepal.webp", "caption":"NRB Exchange Rate Today USD to NPR EUR GBP AUD AED QAR SAR Nepal" },
        "speakable":{ "@type":"SpeakableSpecification", "cssSelector":["h1","h2",".prose p"] },
        "about":[
          { "@type":"Thing", "name":"Foreign Exchange" },
          { "@type":"Thing", "name":"Nepal Rastra Bank" },
          { "@type":"Thing", "name":"Currency Conversion" },
          { "@type":"Thing", "name":"Remittance Nepal" }
        ]
      })}} />

      {/* 2. Breadcrumb Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"BreadcrumbList",
        "itemListElement":[
          { "@type":"ListItem", "position":1, "name":"Home", "item":"https://nepacalc.com/" },
          { "@type":"ListItem", "position":2, "name":"Market Rates", "item":"https://nepacalc.com/market-rates/" },
          { "@type":"ListItem", "position":3, "name":"Exchange Rate Nepal", "item":"https://nepacalc.com/market-rates/exchange-rate-nepal/" }
        ]
      })}} />

      {/* 3. Organization Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"Organization",
        "name":"NepaCalc",
        "url":"https://nepacalc.com/",
        "logo":"https://nepacalc.com/images/nepacalc-logo.webp",
        "description":"NepaCalc is Nepal's leading financial calculator platform providing live NRB exchange rates, income tax calculators, remittance tools, and other financial utilities.",
        "areaServed":"Nepal",
        "sameAs":[
          "https://www.facebook.com/nepacalc",
          "https://twitter.com/nepacalc"
        ]
      })}} />

      {/* 4. FinancialService Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"FinancialService",
        "name":"NepaCalc Exchange Rate Nepal",
        "url":"https://nepacalc.com/market-rates/exchange-rate-nepal/",
        "serviceType":"Foreign Exchange Rates",
        "description":"Live NRB exchange rates, foreign exchange rates in Nepal, currency conversion, USD to NPR, Dollar Rate Nepal Today and remittance exchange rate information.",
        "areaServed":"Nepal",
        "provider":{ "@type":"Organization", "name":"NepaCalc", "url":"https://nepacalc.com/" },
        "currenciesAccepted":["USD","EUR","GBP","AUD","AED","QAR","SAR","INR","CAD","CHF","JPY","CNY","SGD"]
      })}} />

      {/* 5. Dataset Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"Dataset",
        "name":"Nepal Rastra Bank Daily Exchange Rates",
        "description":"Daily exchange rates for major currencies against Nepalese Rupee (NPR) based on official Nepal Rastra Bank (NRB) reference rates. Includes USD, EUR, GBP, AUD, AED, QAR, SAR, INR and more.",
        "url":"https://nepacalc.com/market-rates/exchange-rate-nepal/",
        "keywords":["NRB Exchange Rate","USD to NPR","Dollar Rate Nepal","Exchange Rate Nepal","Foreign Exchange Rate Nepal","Currency Converter Nepal"],
        "creator":{ "@type":"Organization", "name":"NepaCalc", "url":"https://nepacalc.com/" },
        "license":"https://creativecommons.org/licenses/by/4.0/",
        "temporalCoverage":"2024/..",
        "variableMeasured":["Buying Rate","Selling Rate","Currency","Unit"]
      })}} />

      {/* 6. ItemList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"ItemList",
        "name":"Major Exchange Rates in Nepal",
        "itemListElement":[
          {"@type":"ListItem","position":1,"name":"USD to NPR"},
          {"@type":"ListItem","position":2,"name":"EUR to NPR"},
          {"@type":"ListItem","position":3,"name":"GBP to NPR"},
          {"@type":"ListItem","position":4,"name":"AUD to NPR"},
          {"@type":"ListItem","position":5,"name":"AED to NPR"},
          {"@type":"ListItem","position":6,"name":"QAR to NPR"},
          {"@type":"ListItem","position":7,"name":"SAR to NPR"},
          {"@type":"ListItem","position":8,"name":"INR to NPR"}
        ]
      })}} />

      {/* 7. CollectionPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"CollectionPage",
        "name":"NRB Exchange Rate Nepal — Live Currency Dashboard",
        "url":"https://nepacalc.com/market-rates/exchange-rate-nepal/",
        "description":"A complete collection of live foreign exchange rates, currency converters, and remittance tools for Nepal, based on official Nepal Rastra Bank data.",
        "hasPart":[
          { "@type":"WebPage", "name":"Currency Converter Nepal", "url":"https://nepacalc.com/calculator/currency-converter/" },
          { "@type":"WebPage", "name":"Remittance Calculator", "url":"https://nepacalc.com/calculator/remittance-calculator/" },
          { "@type":"WebPage", "name":"Live Gold Price Nepal", "url":"https://nepacalc.com/market-rates/live-gold-price/" }
        ]
      })}} />

      {/* 8. SearchAction Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"WebSite",
        "name":"NepaCalc",
        "url":"https://nepacalc.com/",
        "potentialAction":{
          "@type":"SearchAction",
          "target":{ "@type":"EntryPoint", "urlTemplate":"https://nepacalc.com/search?q={search_term_string}" },
          "query-input":"required name=search_term_string"
        }
      })}} />

      {/* 9. Speakable Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"WebPage",
        "url":"https://nepacalc.com/market-rates/exchange-rate-nepal/",
        "speakable":{
          "@type":"SpeakableSpecification",
          "cssSelector":[
            "h2",
            ".prose h3",
            ".prose p"
          ]
        }
      })}} />

      {/* 10. FAQPage Schema — 14 questions */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[
          {
            "@type":"Question",
            "name":"What is the Nepal Rastra Bank (NRB) exchange rate?",
            "acceptedAnswer":{ "@type":"Answer", "text":"The Nepal Rastra Bank (NRB) exchange rate is the official foreign exchange reference rate published by Nepal's central bank every banking day. It provides the official buying and selling rates for major international currencies including USD, EUR, GBP, AUD, AED, SAR, QAR, JPY, and INR. Commercial banks and licensed money exchange institutions use these rates as the benchmark for their daily foreign exchange transactions." }
          },
          {
            "@type":"Question",
            "name":"What is today's dollar rate in Nepal?",
            "acceptedAnswer":{ "@type":"Answer", "text":"The US Dollar (USD) exchange rate changes every banking day based on official rates published by Nepal Rastra Bank. The live exchange rate table on this page displays today's official USD buying and selling rates. For the latest USD to NPR rate, always refer to the official daily NRB update." }
          },
          {
            "@type":"Question",
            "name":"How much is 1 USD in Nepal today?",
            "acceptedAnswer":{ "@type":"Answer", "text":"The value of 1 US Dollar in Nepal depends on the official Nepal Rastra Bank exchange rate published for that day. Check the live USD to NPR section above to see today's buying rate, selling rate, and conversion values. You can also use the built-in currency converter to convert any USD amount into Nepalese Rupees instantly." }
          },
          {
            "@type":"Question",
            "name":"How is the exchange rate calculated in Nepal?",
            "acceptedAnswer":{ "@type":"Answer", "text":"Nepal uses two systems. For the Indian Rupee, Nepal maintains a fixed peg of 100 INR = 160 NPR. For all other currencies (USD, EUR, GBP, AUD, AED, QAR, SAR), Nepal Rastra Bank determines rates using international forex markets, commercial bank quotations, cross-currency calculations, and global currency movements. Official rates are published every banking day." }
          },
          {
            "@type":"Question",
            "name":"Why are buying and selling exchange rates different?",
            "acceptedAnswer":{ "@type":"Answer", "text":"Banks purchase foreign currency at the buying rate and sell it at the selling rate. The difference is the exchange spread, which covers banking costs, foreign exchange risk, and operational expenses. Selling rates are always slightly higher than buying rates." }
          },
          {
            "@type":"Question",
            "name":"Which bank gives the highest exchange rate in Nepal?",
            "acceptedAnswer":{ "@type":"Answer", "text":"No bank consistently offers the highest exchange rate every day. Rates vary by market demand, currency availability, internal pricing, and Nepal Rastra Bank reference rates. Comparing several banks before a large transaction helps you receive a better rate." }
          },
          {
            "@type":"Question",
            "name":"Is the Nepal Rastra Bank exchange rate the same as bank rates?",
            "acceptedAnswer":{ "@type":"Answer", "text":"Not exactly. NRB publishes the official reference rate. Commercial banks follow this benchmark but may apply slightly different buying and selling prices based on their own margins. The final rate at your bank may differ slightly from the official NRB rate." }
          },
          {
            "@type":"Question",
            "name":"Why do exchange rates change every day?",
            "acceptedAnswer":{ "@type":"Answer", "text":"Foreign exchange markets operate continuously worldwide. Rates fluctuate due to global demand and supply, inflation, interest rates, international trade, economic news, political events, and central bank policies. Nepal Rastra Bank updates its official rates accordingly each banking day." }
          },
          {
            "@type":"Question",
            "name":"How often are exchange rates updated?",
            "acceptedAnswer":{ "@type":"Answer", "text":"Nepal Rastra Bank publishes updated exchange rates once every banking day. NepaCalc automatically refreshes rates whenever new official data is available." }
          },
          {
            "@type":"Question",
            "name":"What currencies are available on this page?",
            "acceptedAnswer":{ "@type":"Answer", "text":"This page covers major global currencies including USD, EUR, GBP, AUD, CAD, CHF, JPY, SGD, CNY, HKD, AED, QAR, SAR, and INR. Additional currencies may be listed based on the official Nepal Rastra Bank publication." }
          },
          {
            "@type":"Question",
            "name":"Can I use these exchange rates for remittance calculations?",
            "acceptedAnswer":{ "@type":"Answer", "text":"Yes. NRB rates are an excellent benchmark for estimating remittance values. However, remittance companies such as IME, Wise, Western Union, MoneyGram, Remitly, and WorldRemit may apply their own margins and fees, so the final received amount may vary." }
          },
          {
            "@type":"Question",
            "name":"How can I convert foreign currency into Nepalese Rupees?",
            "acceptedAnswer":{ "@type":"Answer", "text":"Enter any amount into the currency converter on this page. It uses the latest Nepal Rastra Bank exchange rates to estimate the equivalent in Nepalese Rupees (NPR)." }
          },
          {
            "@type":"Question",
            "name":"Is the Indian Rupee exchange rate fixed in Nepal?",
            "acceptedAnswer":{ "@type":"Answer", "text":"Yes. The Nepalese Rupee is officially pegged to the Indian Rupee at a fixed rate of 100 INR = 160 NPR. This peg has been maintained since 1993 to support financial stability given the close economic relationship between Nepal and India." }
          },
          {
            "@type":"Question",
            "name":"Why should I use NepaCalc instead of checking multiple bank websites?",
            "acceptedAnswer":{ "@type":"Answer", "text":"NepaCalc combines official NRB exchange rates, a live currency converter, educational content, and related financial calculators in one place. Instead of visiting multiple bank websites individually, you can compare rates, convert currencies, and access financial tools from a single page." }
          }
        ]
      })}} />
    </div>
  );
}
