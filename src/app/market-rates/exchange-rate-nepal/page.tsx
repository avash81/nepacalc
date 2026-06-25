import { calcMeta } from '@/lib/calcMeta';
import ForexDashboardClient from './ForexDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "NRB Exchange Rate Today (2083/84) - Live Foreign Exchange Rates Nepal",
  description: "Check today's NRB Exchange Rate, USD to NPR, Dollar Rate Nepal, remittance exchange rates and live foreign exchange rates in Nepal.",
  slug: 'market-rates/exchange-rate-nepal',
  canonical: '/market-rates/exchange-rate-nepal/',
  keywords: [
    "NRB Exchange Rate Today",
    "USD to NPR",
    "Dollar Rate Nepal",
    "Foreign Exchange Rate Nepal",
    "Currency Converter Nepal"
  ],
  ogImage: "https://nepacalc.com/images/nrb-exchange-rate-today-nepal.webp"
});

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="NRB Exchange Rate Today (Live Foreign Exchange Rates Nepal)"
        description="Check today's NRB Exchange Rate and live foreign exchange rates in Nepal. View the latest USD to NPR, EUR to NPR, GBP to NPR, AUD to NPR, AED to NPR, QAR to NPR and SAR to NPR rates based on Nepal Rastra Bank (NRB) reference data. Compare buying and selling rates, monitor remittance exchange rates, and calculate currency conversions instantly using the latest official foreign exchange benchmarks."
        crumbs={[{ label: 'Market Rates', href: '/market-rates/' }, { label: 'Exchange Rate Nepal' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Remittance Board', slug: '/market-rates/remittance/' },
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Income Tax', slug: '/calculator/nepal-income-tax/' }
        ]}
      >
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
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Currency</th>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Buying (NPR)</th>
                    <th className="px-4 py-3">Selling (NPR)</th>
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
            <p className="text-xs text-slate-400 mt-2">* Indicative rates based on NRB reference benchmarks. Use the live converter above for real-time rates.</p>
          </div>
        </div>

        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-slate max-w-none mb-12">
              <h2>Today's NRB Exchange Rate – Quick Answers</h2>

              <h3>What is today's dollar rate in Nepal?</h3>
              <p>The dollar rate in Nepal changes daily based on foreign exchange market conditions and the official rates published by Nepal Rastra Bank (NRB). The USD to NPR exchange rate is one of the most searched foreign exchange rates in Nepal due to remittance, imports, education, travel and international business transactions.</p>

              <h3>How much is 1 USD in Nepal today?</h3>
              <p>The value of 1 USD in NPR varies daily according to Nepal Rastra Bank foreign exchange rates and market demand. Use the live USD to NPR converter above for the latest exchange value.</p>

              <h3>What is the NRB exchange rate?</h3>
              <p>The NRB exchange rate is the official foreign exchange reference rate published daily by Nepal Rastra Bank for major world currencies including USD, EUR, GBP, AUD, AED, QAR and SAR.</p>

              <h3>Which bank gives the highest exchange rate?</h3>
              <p>No single bank permanently offers the highest exchange rate. Commercial banks such as NIC Asia Bank, Global IME Bank, Prime Commercial Bank, Prabhu Bank and Rastriya Banijya Bank regularly update their buying and selling rates based on NRB benchmarks and market conditions.</p>

              <h3>How is exchange rate calculated in Nepal?</h3>
              <p>Nepal Rastra Bank collects foreign currency quotations from commercial banks and publishes official reference rates. The Nepalese Rupee (NPR) is pegged to the Indian Rupee (INR) while other currencies fluctuate based on international forex markets.</p>

              <hr />

              <h2>Dollar Rate Nepal Today (USD to NPR)</h2>
              <p>The US Dollar remains the most important foreign currency in Nepal. Students studying abroad, import businesses, exporters, international freelancers, tourists and remittance recipients frequently monitor the USD to NPR exchange rate.</p>
              
              <p>The USD to NPR rate influences:</p>
              <ul>
                <li>Import prices</li>
                <li>International tuition payments</li>
                <li>Foreign employment remittance inflows</li>
                <li>Travel expenses</li>
                <li><Link href="/market-rates/live-gold-price/" className="text-[#1a0dab] underline font-bold">Live Gold Price Nepal</Link></li>
                <li>Foreign investment costs</li>
              </ul>
              <p>For accurate conversions, use the live exchange rate calculator above.</p>

              <hr />

              <h2>Remittance Exchange Rate Nepal</h2>
              <p>Remittance is one of Nepal's largest sources of foreign currency inflow. Although Nepal Rastra Bank publishes official reference rates, remittance companies may provide slightly different exchange rates depending on operational costs and service margins.</p>
              
              <p>Popular remittance providers include:</p>
              <ul>
                <li>IME</li>
                <li>Prabhu Money Transfer</li>
                <li>Western Union</li>
                <li>MoneyGram</li>
                <li>City Express</li>
                <li>Himal Remit</li>
              </ul>
              <p>Before transferring funds, compare the official NRB exchange rate with the actual payout rate offered by the remittance provider.</p>

              <hr />

              <h2>How Is Exchange Rate Calculated In Nepal?</h2>
              <p>Nepal follows a dual foreign exchange system.</p>

              <h3>Fixed Exchange Rate for Indian Rupee (INR)</h3>
              <p>The Nepalese Rupee is officially pegged to the Indian Rupee.</p>
              <p><strong>100 INR = 160 NPR</strong></p>
              <p>This fixed exchange arrangement supports trade and economic stability between Nepal and India.</p>

              <h3>Market-Based Exchange Rates</h3>
              <p>Currencies such as:</p>
              <ul>
                <li>USD</li>
                <li>EUR</li>
                <li>GBP</li>
                <li>AUD</li>
                <li>CAD</li>
                <li>AED</li>
                <li>QAR</li>
                <li>SAR</li>
              </ul>
              <p>are determined through international forex market movements.</p>

              <h3>NRB Rate Determination Process</h3>
              <ol>
                <li>Commercial banks submit exchange rate quotations.</li>
                <li>Nepal Rastra Bank collects market data.</li>
                <li>Daily averages are calculated.</li>
                <li>Official buying and selling rates are published.</li>
                <li>Commercial banks update retail exchange rates accordingly.</li>
              </ol>

              <hr />

              <h2>Which Bank Gives The Highest Exchange Rate?</h2>
              <p>Exchange rates vary throughout the day and no bank consistently offers the highest rate.</p>
              <p>Commonly compared institutions include:</p>
              <ul>
                <li>NIC Asia Bank</li>
                <li>Global IME Bank</li>
                <li>Prabhu Bank</li>
                <li>Prime Commercial Bank</li>
                <li>Rastriya Banijya Bank</li>
                <li>Standard Chartered Nepal</li>
              </ul>
              <p>For large transactions, compare rates across multiple institutions before exchanging foreign currency.</p>

              <hr />

              <h2>Major Currency Exchange Rates</h2>
              <p>The most commonly traded foreign currencies in Nepal include:</p>

              <h3>USD to NPR</h3>
              <p>US Dollar to Nepalese Rupee conversion used for remittance, imports and international payments.</p>

              <h3>EUR to NPR</h3>
              <p>European Euro exchange rate used for trade, travel and education expenses.</p>

              <h3>GBP to NPR</h3>
              <p>UK Pound Sterling conversion frequently used by Nepali residents in the United Kingdom.</p>

              <h3>AUD to NPR</h3>
              <p>Australian Dollar exchange rate commonly used by students and workers in Australia.</p>

              <h3>AED to NPR</h3>
              <p>UAE Dirham exchange rate widely used by Nepali migrant workers in the UAE.</p>

              <h3>QAR to NPR</h3>
              <p>Qatari Riyal conversion for remittance and salary transfers.</p>

              <h3>SAR to NPR</h3>
              <p>Saudi Riyal exchange rate used extensively by foreign workers sending money to Nepal.</p>

              <hr />

              <h2>Why Do Exchange Rates Change Daily?</h2>
              <p>Exchange rates fluctuate because of:</p>
              <ul>
                <li>Global market demand and supply</li>
                <li>Central bank policies</li>
                <li>Inflation rates</li>
                <li>Interest rates</li>
                <li>Economic growth</li>
                <li>Political developments</li>
                <li>International trade activity</li>
              </ul>
              <p>As these factors change, foreign currency values against the Nepalese Rupee also change.</p>

              <hr />

              <h2>Related Financial Tools</h2>
              <ul>
                <li><Link href="/calculator/nea-bill/" className="text-[#1a0dab] underline font-bold">NEA Bill Calculator</Link></li>
                <li><Link href="/calculator/nepal-vehicle-tax/" className="text-[#1a0dab] underline font-bold">Vehicle Tax Calculator Nepal</Link></li>
                <li><Link href="/calculator/nepal-salary/" className="text-[#1a0dab] underline font-bold">Salary Tax Calculator Nepal</Link></li>
                <li><Link href="/calculator/nepal-income-tax/" className="text-[#1a0dab] underline font-bold">Income Tax Calculator Nepal</Link></li>
                <li><Link href="/calculator/nepal-tds/" className="text-[#1a0dab] underline font-bold">TDS Calculator Nepal</Link></li>
                <li><Link href="/market-rates/live-gold-price/" className="text-[#1a0dab] underline font-bold">Live Gold Price Nepal</Link></li>
                <li><Link href="/electricity/nepal-unit-price/" className="text-[#1a0dab] underline font-bold">Electricity Unit Price in Nepal</Link></li>
                <li><Link href="/electricity/nea-tariff-rates/" className="text-[#1a0dab] underline font-bold">NEA Tariff Rates</Link></li>
              </ul>

              <hr />

              <h2>Frequently Asked Questions</h2>

              <h3>What is today's dollar rate in Nepal?</h3>
              <p>The latest dollar rate in Nepal is published daily by <a href="https://www.nrb.org.np" target="_blank" rel="nofollow noopener noreferrer" className="text-[#1a0dab] underline font-bold">Nepal Rastra Bank</a> and updated by commercial banks.</p>

              <h3>How much is 1 USD in Nepal?</h3>
              <p>The value changes daily depending on foreign exchange market conditions. Use the live converter above to get today's exact USD to NPR rate.</p>

              <h3>How is exchange rate calculated in Nepal?</h3>
              <p>NRB collects exchange rate quotations from commercial banks and publishes official daily benchmark rates. See the <strong>How Is Exchange Rate Calculated In Nepal?</strong> section above for full details.</p>

              <h3>Which bank gives the highest exchange rate?</h3>
              <p>Rates vary daily. Compare rates across multiple banks before exchanging currency. Popular choices include NIC Asia Bank, Global IME Bank and Prabhu Bank.</p>

              <h3>What is the NRB exchange rate today?</h3>
              <p>The NRB exchange rate today is the official foreign exchange reference rate published by Nepal Rastra Bank. Check the live dashboard at the top of this page for today's rates.</p>

              <h3>What is buying rate and selling rate?</h3>
              <p>Buying rate is the rate at which banks purchase foreign currency from you. Selling rate is the rate at which banks sell foreign currency to you. The selling rate is always slightly higher than the buying rate.</p>

              <h3>Why are bank exchange rates different?</h3>
              <p>Because each bank has different foreign currency reserves, operational costs and profit margins. They adjust their rates slightly from the NRB reference to remain competitive while covering their costs.</p>

              <h3>Is INR fixed in Nepal?</h3>
              <p>Yes. The Nepalese Rupee is pegged to the Indian Rupee at a fixed exchange rate of <strong>100 INR = 160 NPR</strong>. This peg has been maintained since 1993 to support trade stability with India.</p>

              <h3>How can I convert USD to NPR?</h3>
              <p>Use the live currency converter above to instantly convert US Dollars into Nepalese Rupees using the latest NRB reference rate.</p>

              <h3>What is the remittance exchange rate?</h3>
              <p>The remittance exchange rate is the actual rate used by money transfer providers when sending money to Nepal. It may differ slightly from the official NRB rate due to service fees and margins.</p>

              <h3>What is the foreign exchange rate in Nepal today?</h3>
              <p>Foreign exchange rates in Nepal are published daily by Nepal Rastra Bank and updated by commercial banks. Today's indicative rates are shown in the table above.</p>

            </div>
          </div>
        </div>
      </CalcWrapper>

      {/* 1. WebPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"WebPage",
        "@id":"https://nepacalc.com/market-rates/exchange-rate-nepal/#webpage",
        "url":"https://nepacalc.com/market-rates/exchange-rate-nepal/",
        "name":"NRB Exchange Rate Today (Live Foreign Exchange Rates Nepal)",
        "description":"Check today's NRB exchange rate, USD to NPR, foreign exchange rates in Nepal, remittance exchange rates and live currency conversion tools.",
        "inLanguage":"en",
        "isPartOf":{
          "@type":"WebSite",
          "name":"NepaCalc",
          "url":"https://nepacalc.com/"
        },
        "primaryImageOfPage":{
          "@type":"ImageObject",
          "url":"https://nepacalc.com/images/nrb-exchange-rate-today-nepal.webp"
        }
      })}} />

      {/* 2. Breadcrumb Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"BreadcrumbList",
        "itemListElement":[
          {
            "@type":"ListItem",
            "position":1,
            "name":"Home",
            "item":"https://nepacalc.com/"
          },
          {
            "@type":"ListItem",
            "position":2,
            "name":"Market Rates",
            "item":"https://nepacalc.com/market-rates/"
          },
          {
            "@type":"ListItem",
            "position":3,
            "name":"Exchange Rate Nepal",
            "item":"https://nepacalc.com/market-rates/exchange-rate-nepal/"
          }
        ]
      })}} />

      {/* 3. FinancialService Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"FinancialService",
        "name":"NepaCalc Exchange Rate Nepal",
        "url":"https://nepacalc.com/market-rates/exchange-rate-nepal/",
        "description":"Live NRB exchange rates, foreign exchange rates in Nepal, currency conversion, USD to NPR and remittance exchange rate information.",
        "areaServed":"Nepal",
        "provider":{
          "@type":"Organization",
          "name":"NepaCalc",
          "url":"https://nepacalc.com/"
        },
        "serviceType":[
          "Currency Exchange",
          "Foreign Exchange Information",
          "Currency Conversion",
          "Exchange Rate Monitoring"
        ]
      })}} />

      {/* 4. Dataset Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"Dataset",
        "name":"Nepal Foreign Exchange Rates Dataset",
        "description":"Daily foreign exchange rates against Nepalese Rupee (NPR) based on Nepal Rastra Bank reference rates.",
        "url":"https://nepacalc.com/market-rates/exchange-rate-nepal/",
        "keywords":[
          "NRB Exchange Rate",
          "USD to NPR",
          "Dollar Rate Nepal",
          "Foreign Exchange Rate Nepal",
          "Currency Converter Nepal"
        ],
        "creator":{
          "@type":"Organization",
          "name":"NepaCalc"
        },
        "license":"https://creativecommons.org/licenses/by/4.0/"
      })}} />

      {/* 5. ItemList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"ItemList",
        "name":"Major Currency Exchange Rates Nepal",
        "itemListElement":[
          {
            "@type":"ListItem",
            "position":1,
            "name":"USD to NPR"
          },
          {
            "@type":"ListItem",
            "position":2,
            "name":"EUR to NPR"
          },
          {
            "@type":"ListItem",
            "position":3,
            "name":"GBP to NPR"
          },
          {
            "@type":"ListItem",
            "position":4,
            "name":"AUD to NPR"
          },
          {
            "@type":"ListItem",
            "position":5,
            "name":"AED to NPR"
          },
          {
            "@type":"ListItem",
            "position":6,
            "name":"QAR to NPR"
          },
          {
            "@type":"ListItem",
            "position":7,
            "name":"SAR to NPR"
          }
        ]
      })}} />

      {/* 6. FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[
          {
            "@type":"Question",
            "name":"What is today's dollar rate in Nepal?",
            "acceptedAnswer":{
              "@type":"Answer",
              "text":"Today's dollar rate in Nepal is based on the official foreign exchange rates published by Nepal Rastra Bank and commercial banks."
            }
          },
          {
            "@type":"Question",
            "name":"How much is 1 USD in Nepal?",
            "acceptedAnswer":{
              "@type":"Answer",
              "text":"The value of 1 USD in Nepal changes daily according to foreign exchange market conditions and Nepal Rastra Bank reference rates."
            }
          },
          {
            "@type":"Question",
            "name":"How is exchange rate calculated in Nepal?",
            "acceptedAnswer":{
              "@type":"Answer",
              "text":"Nepal Rastra Bank collects exchange rate quotations from commercial banks and publishes daily reference rates for major currencies."
            }
          },
          {
            "@type":"Question",
            "name":"Which bank gives the highest exchange rate?",
            "acceptedAnswer":{
              "@type":"Answer",
              "text":"Exchange rates vary by bank and change throughout the day. Comparing multiple commercial banks helps identify the most favorable rate."
            }
          },
          {
            "@type":"Question",
            "name":"What is the NRB exchange rate today?",
            "acceptedAnswer":{
              "@type":"Answer",
              "text":"The NRB exchange rate today is the official daily foreign exchange reference rate published by Nepal Rastra Bank."
            }
          },
          {
            "@type":"Question",
            "name":"What is buying rate and selling rate?",
            "acceptedAnswer":{
              "@type":"Answer",
              "text":"Buying rate is the rate at which banks purchase foreign currency from you. Selling rate is the rate at which banks sell foreign currency to you."
            }
          },
          {
            "@type":"Question",
            "name":"Why are bank exchange rates different?",
            "acceptedAnswer":{
              "@type":"Answer",
              "text":"Because each bank has different foreign currency reserves, operational costs, and profit margins. They adjust their rates slightly from the NRB reference to remain competitive."
            }
          },
          {
            "@type":"Question",
            "name":"Is INR fixed in Nepal?",
            "acceptedAnswer":{
              "@type":"Answer",
              "text":"Yes. The Nepalese Rupee is pegged to the Indian Rupee at a fixed exchange rate of 1 INR = 1.6 NPR."
            }
          }
        ]
      })}} />
    </div>
  );
}
