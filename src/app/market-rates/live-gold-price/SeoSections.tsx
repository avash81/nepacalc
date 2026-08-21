import React from 'react';
import { BookOpen, Scale, Globe, ShieldCheck, CheckCircle2, FileText, Search } from 'lucide-react';
import HistoricalData from './HistoricalData';
import Link from 'next/link';

interface SeoSectionsProps {
  rates?: {
    gold: {
      tolaNPR: { current: number; high52w?: number; low52w?: number; avg30d?: number };
      tejabiTolaNPR: number;
    };
    silver?: { tolaNPR?: { current: number } };
  };
  fmt?: (n: number) => string;
}

export default function SeoSections({ rates, fmt: fmtProp }: SeoSectionsProps = {}) {
  const fmt = fmtProp ?? ((n: number) => n.toLocaleString('en-IN'));
  const hallmarkCurrent = rates?.gold?.tolaNPR?.current;
  const tejabiCurrent = rates?.gold?.tejabiTolaNPR;
  const silverCurrent = rates?.silver?.tolaNPR?.current;

  return (
    <div className="space-y-16 mt-8">

      {/* ─── NEW: Quick Answer Block (AI Overview / Featured Snippet) ─── */}
      <section id="quick-answer-block" className="scroll-mt-24 bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-3">Quick Answer</h3>
        <p className="text-[15px] text-slate-700 font-medium leading-relaxed">
          Today&apos;s official gold price in Nepal is published daily by <strong>FENEGOSIDA</strong> and reflects international gold prices (LBMA), USD/NPR exchange rates set by <strong>Nepal Rastra Bank</strong>, customs duties, and local market conditions. The live benchmark rates shown on this page include <strong>Hallmark Gold (24K)</strong>, <strong>Tejabi Gold (22K)</strong>, and <strong>Silver</strong>, along with historical trends and an official gold value calculator.
        </p>
      </section>

      {/* ─── NEW: Today&apos;s Gold Price at a Glance ─── */}
      <section id="gold-at-a-glance" className="scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">Today&apos;s Gold Price at a Glance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {[
            { label: 'Hallmark Gold (24K)', value: hallmarkCurrent ? `Rs. ${fmt(hallmarkCurrent)}` : '—', sub: 'per Tola' },
            { label: 'Tejabi Gold (22K)', value: tejabiCurrent && tejabiCurrent > 0 ? `Rs. ${fmt(tejabiCurrent)}` : 'Not Published', sub: 'per Tola' },
            { label: 'Silver (Chandi)', value: silverCurrent ? `Rs. ${fmt(silverCurrent)}` : '—', sub: 'per Tola' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-center">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</div>
              <div className="text-2xl font-black text-slate-900">{value}</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">{sub} · FENEGOSIDA</div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: "Today's Movement", value: rates?.gold?.tolaNPR ? 'See live board above' : '—' },
              { label: 'Weekly Movement', value: 'See price history below' },
              { label: 'Monthly High', value: rates?.gold?.tolaNPR?.high52w ? `Rs. ${fmt(rates.gold.tolaNPR.high52w)}` : 'See history' },
              { label: 'Monthly Low', value: rates?.gold?.tolaNPR?.low52w ? `Rs. ${fmt(rates.gold.tolaNPR.low52w)}` : 'See history' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-sm font-bold text-slate-700">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEW: Full Gold Price Conversion Table ─── */}
      <section id="gold-conversion-table" className="scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-4">Gold Price Conversion Table</h3>
        <p className="text-[14px] text-slate-600 font-medium mb-5 leading-relaxed">
          Today&apos;s <a href="/calculator/gold-converter/" className="text-blue-600 hover:underline font-bold">Gold Price Calculator</a> automatically converts the official FENEGOSIDA rate into every common unit. Use this as a quick reference for 1 gram, 5 gram, 10 gram, Lal, Aana, half Tola, and Tola gold prices in Nepal today.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="py-3 px-5">Unit</th>
                <th className="py-3 px-5 text-right">24K Hallmark</th>
                <th className="py-3 px-5 text-right">22K Tejabi</th>
                <th className="py-3 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { unit: '1 Gram', divisor: 11.664 },
                { unit: '5 Gram', divisor: 11.664 / 5 },
                { unit: '10 Gram', divisor: 1.1664 },
                { unit: '1 Lal (1/8 Tola)', divisor: 8 },
                { unit: '1 Aana (1/16 Tola)', divisor: 16 },
                { unit: 'Half Tola (½ Tola)', divisor: 2 },
                { unit: '1 Tola', divisor: 1 },
                { unit: '5 Tola', divisor: 0.2 },
                { unit: '10 Tola', divisor: 0.1 },
                { unit: '100 Gram', divisor: 0.11664 },
              ].map(({ unit, divisor }) => (
                <tr key={unit} className="hover:bg-slate-50">
                  <td className="py-3 px-5 font-bold text-slate-700">{unit}</td>
                  <td className="py-3 px-5 text-right font-black text-slate-900">
                    {hallmarkCurrent ? `Rs. ${fmt(Math.round(hallmarkCurrent / divisor))}` : '—'}
                  </td>
                  <td className="py-3 px-5 text-right font-medium text-slate-600">
                    {tejabiCurrent && tejabiCurrent > 0 ? `Rs. ${fmt(Math.round(tejabiCurrent / divisor))}` : '—'}
                  </td>
                  <td className="py-3 px-5">
                    <a href="/calculator/gold-converter/" className="text-[10px] text-blue-600 font-bold hover:underline whitespace-nowrap">Convert →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 font-medium mt-3">Based on today&apos;s FENEGOSIDA benchmark. 1 Tola = 11.6638 grams. For advanced conversion, use our <a href="/calculator/gold-converter/" className="text-blue-600 hover:underline font-bold">Gold Value Calculator</a>.</p>
      </section>

      {/* ─── NEW: Gold Price Calculator Section ─── */}
      <section id="gold-price-calculator-info" className="scroll-mt-24 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-3">Gold Price Calculator Tool</h3>
        <p className="text-[14px] text-slate-700 font-medium leading-relaxed mb-4">
          Our <a href="/calculator/gold-converter/" className="text-blue-600 hover:underline font-bold">Gold Unit Converter</a> updates automatically using today&apos;s official FENEGOSIDA rate. It supports all standard Nepali gold units — <strong>Gram</strong>, <strong>Lal</strong>, <strong>Aana</strong>, and <strong>Tola</strong> — and allows you to select purity (24K Hallmark or 22K Tejabi) to calculate the exact gold value of any piece of jewellery or bullion.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="/calculator/gold-converter/" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-sm transition-colors">Gold Unit Converter →</a>
          <a href="/calculator/gold-tax/" className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-sm transition-colors">Gold Tax Calculator →</a>
        </div>
      </section>

      {/* ─── ORIGINAL: AI Summary Box & Citation Table ─── */}
      <section id="ai-summary" className="scroll-mt-24 ai-summary-box">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
          Market Intelligence &amp; AI Summary
        </h2>
        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 mb-8">
          <p className="text-[15px] leading-relaxed text-slate-700 font-medium">
            Today&apos;s Nepal gold price reflects international LBMA spot prices, the USD/NPR exchange rate, customs duty, and FENEGOSIDA&apos;s official daily benchmark. Retail jewellery prices may differ because of making charges, wastage, and VAT.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Citation &amp; Source Verification
            </h3>
          </div>
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-slate-100">
              <tr>
                <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/30 w-1/3" scope="row">Primary Source</th>
                <td className="py-3 px-4 text-slate-600 font-medium">FENEGOSIDA (Federation of Nepal Gold and Silver Dealers&apos; Association)</td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/30" scope="row">Release Schedule</th>
                <td className="py-3 px-4 text-slate-600 font-medium">Daily at 10:00 AM NPT (Sunday - Friday)</td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/30" scope="row">Measurement System</th>
                <td className="py-3 px-4 text-slate-600 font-medium">Traditional Tola (1 Tola = 11.6638 grams)</td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-bold text-slate-700 bg-slate-50/30" scope="row">Global Benchmark</th>
                <td className="py-3 px-4 text-slate-600 font-medium">London Bullion Market Association (LBMA)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* AI Answer Extraction Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-8 hidden md:block">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">
              Direct Answers for Market Research
            </h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/30 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="py-2 px-4 border-b border-slate-100 w-1/3">Query</th>
                <th className="py-2 px-4 border-b border-slate-100">Direct Answer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <th className="py-3 px-4 font-bold text-slate-700">Gold price in Nepal today</th>
                <td className="py-3 px-4 text-slate-600 font-medium">Please refer to the live board above for today&apos;s dynamic Fine Gold and Tejabi Gold rates.</td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-bold text-slate-700">Silver price today Nepal</th>
                <td className="py-3 px-4 text-slate-600 font-medium">Please refer to the live board above for today&apos;s dynamic Silver (Chandi) rate.</td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-bold text-slate-700">Who sets gold prices in Nepal?</th>
                <td className="py-3 px-4 text-slate-600 font-medium">The Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── ORIGINAL: How Prices Are Calculated ─── */}
      <section id="how-its-calculated" className="scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-2">
          <Scale className="w-6 h-6 text-slate-400" />
          How Gold Prices Are Calculated in Nepal
        </h2>
        <div className="prose prose-slate max-w-none space-y-5">
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            The official rate provided by FENEGOSIDA isn&apos;t just a direct conversion of the international market. It involves several compounding factors that establish the local floor price before retail jewelry stores even add their making charges.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-6">
            <h4 className="text-[13px] font-black text-slate-800 tracking-widest uppercase mb-4">The Calculation Formula</h4>
            <code className="block bg-white border border-slate-200 text-slate-800 p-4 rounded-xl text-sm font-mono text-center">
              (International Spot Price × USD/NPR Exchange Rate) + 20% Customs Duty + Bank Handling Fees
            </code>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            <strong>1. The International Spot Price (LBMA):</strong> Every day, FENEGOSIDA looks at the London Bullion Market Association (LBMA) rate as the global benchmark.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            <strong>2. Currency Exchange Rate (USD to NPR):</strong> Because global gold is priced in US Dollars, any fluctuation in the value of the Nepalese Rupee against the Dollar directly impacts the local price.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            <strong>3. Customs Duty and Import Taxes:</strong> This is the largest local factor. The Nepal Government enforces strict import quotas (typically capped around 20kg per day for commercial banks) and levies an approximate 20% customs duty on raw bullion to protect foreign currency reserves.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Retail Additions:</strong> When you purchase finished jewelry, showrooms add <em>Jyala</em> (making charges, typically 5-15%), <em>Jarti</em> (wastage), and a mandatory 13% Value Added Tax (VAT). If you are importing jewellery or bullion into Nepal, estimate customs duty, VAT and other charges using our <a href="/calculator/gold-tax/" className="text-blue-600 hover:underline font-bold">Gold Import Tax Calculator</a>.
          </p>

          {/* NEW: Why prices change every day */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-6">
            <h3 className="text-[14px] font-black text-slate-800 mb-3">Why Does Nepal&apos;s Gold Price Change Every Day?</h3>
            <ul className="space-y-2">
              {[
                { label: 'International gold price', desc: 'LBMA spot price changes 24/7 based on global investment flows and geopolitical events.' },
                { label: 'USD/NPR exchange rate', desc: 'Nepal Rastra Bank publishes daily rates. A weaker Rupee raises the local gold price.' },
                { label: 'Import duty', desc: 'Government adjustments to customs duty directly change the import floor price.' },
                { label: 'Import quota', desc: 'Nepal restricts gold imports by volume. When quotas are reached, supply tightens.' },
                { label: 'Local demand', desc: 'Kathmandu market demand fluctuates with investor sentiment and buying seasons.' },
                { label: 'Festival & Wedding season', desc: 'Dashain, Tihar, and wedding seasons drive significant demand spikes.' },
              ].map(({ label, desc }) => (
                <li key={label} className="flex gap-3 text-[13px]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-800">{label}:</strong> <span className="text-slate-600">{desc}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── NEW: What Affects Jewellery Prices ─── */}
      <section id="jewellery-pricing" className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-4">What Affects Gold Prices and Jewellery Prices?</h2>
        <p className="text-[14px] text-slate-700 font-medium leading-relaxed mb-5">
          The FENEGOSIDA gold rate is only the starting point. The final price you pay at a jewellery shop is always higher. Here is how the total price is built:
        </p>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="py-3 px-5 text-left">Component</th>
                <th className="py-3 px-5 text-left">What It Is</th>
                <th className="py-3 px-5 text-right">Typical</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { c: 'Gold Value', w: "Today's FENEGOSIDA benchmark rate", a: 'Rs. [Live Rate]' },
                { c: 'Making Charge (Jyala)', w: 'Artisan labour fee set by jeweller', a: '5% – 15%' },
                { c: 'Wastage (Jarti)', w: 'Gold lost during crafting process', a: '2% – 5%' },
                { c: 'VAT', w: '13% on total (gold + making + wastage)', a: '13%' },
                { c: 'Final Price', w: 'What you pay at the counter', a: '↑ Above FENEGOSIDA rate' },
              ].map(({ c, w, a }) => (
                <tr key={c} className="hover:bg-slate-50">
                  <td className="py-3 px-5 font-bold text-slate-800">{c}</td>
                  <td className="py-3 px-5 text-slate-600 font-medium text-[13px]">{w}</td>
                  <td className="py-3 px-5 text-right font-bold text-slate-700 text-[13px]">{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/calculator/gold-converter/" className="px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 font-bold rounded-lg text-sm hover:bg-amber-100 transition-colors">Gold Value Calculator →</a>
          <a href="/calculator/gold-tax/" className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-lg text-sm hover:bg-slate-100 transition-colors">Gold Tax Calculator →</a>
        </div>
      </section>

      {/* ─── ORIGINAL: Gold Buying Guide ─── */}
      <section id="buying-guide" className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
          Before Buying Gold in Nepal
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🔖', title: 'Verify Hallmark', desc: 'Always check for the official government hallmark stamp. 24K Hallmark (छापावाल) is 99.99% pure.' },
            { icon: '🧾', title: 'Ask for VAT Bill', desc: 'A valid VAT bill (13%) is legally required. Always take a proper invoice from the jeweler.' },
            { icon: '📋', title: 'Check FENEGOSIDA Rate', desc: "Verify today's official rate before entering any shop. It is published daily around 10:00 AM NPT." },
            { icon: '⚖️', title: 'Compare Making Charges', desc: 'Jyala (making charges) typically range from 5% to 15%. Compare across 2–3 shops.' },
            { icon: '✨', title: 'Confirm Purity', desc: '24K = 99.99% pure (investment). 22K Tejabi = 91.6% pure (jewelry). Know what you are buying.' },
            { icon: '🛡️', title: 'Use Gold Tax Calculator', desc: <><a href="/calculator/gold-tax/" className="text-blue-600 hover:underline font-bold">Calculate import duties and VAT</a> if you are buying from abroad or importing bullion.</> },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="text-[13px] font-black text-slate-800 mb-1">{title}</h3>
              <p className="text-[12px] text-slate-600 font-medium leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ORIGINAL: Looking for Silver Prices? ─── */}
      <section id="compare-gold-silver" className="scroll-mt-24 mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4">
          Compare Gold and Silver Prices in Nepal
        </h2>
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
          <p className="text-base leading-relaxed text-slate-700 font-medium mb-5">
            If you're tracking both precious metals, you can compare the daily official Nepal rates. Check the <Link href="/market-rates/silver-price-nepal/" className="text-blue-600 hover:underline font-bold">Silver Price in Nepal</Link> or use the <Link href="/calculator/silver-converter/" className="text-blue-600 hover:underline font-bold">Silver Converter</Link> to value your Chandi instantly.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/market-rates/silver-price-nepal/" className="px-5 py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">
              Silver Price in Nepal →
            </Link>
            <Link href="/calculator/silver-converter/" className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
              Silver Converter →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── NEW: Gold vs Silver Investment ─── */}
      <section id="gold-vs-silver" className="scroll-mt-24 mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4">Gold vs Silver Investment in Nepal</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="py-3 px-5 text-left">Factor</th>
                <th className="py-3 px-5 text-left text-amber-600">🥇 Gold</th>
                <th className="py-3 px-5 text-left text-slate-500">🥈 Silver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { f: "Today's Rate (per Tola)", g: hallmarkCurrent ? `Rs. ${fmt(hallmarkCurrent)}` : '—', s: silverCurrent ? `Rs. ${fmt(silverCurrent)}` : '—' },
                { f: 'Investment', g: 'Preferred store of value', s: 'Industrial + investment' },
                { f: 'Jewellery', g: '24K (pure) & 22K Tejabi', s: 'Common, lower cost' },
                { f: 'Volatility', g: 'Lower volatility', s: 'Higher volatility' },
                { f: 'Industrial demand', g: 'Electronics, dentistry (minor)', s: 'High industrial use' },
                { f: 'Liquidity', g: 'Very high', s: 'Moderate' },
              ].map(({ f, g, s }) => (
                <tr key={f} className="hover:bg-slate-50">
                  <td className="py-3 px-5 font-bold text-slate-700">{f}</td>
                  <td className="py-3 px-5 text-slate-600 font-medium text-[13px]">{g}</td>
                  <td className="py-3 px-5 text-slate-600 font-medium text-[13px]">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[13px] leading-relaxed text-slate-600 font-medium">
          For historical trends and market insights, read our detailed <a href="/blog/nepal-gold-price-analysis-2083/" className="text-blue-700 hover:underline font-bold">Nepal Gold Price Analysis</a> or check the <Link href="/market-rates/silver-price-nepal/" className="text-blue-600 hover:underline font-bold">Live Silver Price</Link>.
        </p>
      </section>

      {/* ─── ORIGINAL: Historical Data Section (Component) ─── */}
      <HistoricalData />

      {/* ─── NEW: Historical Statistics Cards ─── */}
      <section className="scroll-mt-24 mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4">Gold Price Statistics (24K Hallmark)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Current Price', value: hallmarkCurrent ? `Rs. ${fmt(hallmarkCurrent)}` : '—', note: 'per Tola today' },
            { label: '52-Week High', value: rates?.gold?.tolaNPR?.high52w ? `Rs. ${fmt(rates.gold.tolaNPR.high52w)}` : 'See history', note: 'FENEGOSIDA record' },
            { label: '52-Week Low', value: rates?.gold?.tolaNPR?.low52w ? `Rs. ${fmt(rates.gold.tolaNPR.low52w)}` : 'See history', note: 'FENEGOSIDA record' },
            { label: '30-Day Average', value: rates?.gold?.tolaNPR?.avg30d ? `Rs. ${fmt(rates.gold.tolaNPR.avg30d)}` : 'See history', note: 'rolling average' },
          ].map(({ label, value, note }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
              <div className="text-lg font-black text-slate-900">{value}</div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">{note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEW: Historic Gold Price Milestones ─── */}
      <section id="gold-milestones" className="scroll-mt-24 mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4">Historic Gold Price Milestones in Nepal</h2>
        <div className="space-y-3">
          {[
            { badge: '🔺 Record High', title: 'All-Time High', desc: "Nepal's gold prices reached record highs aligned with global gold price peaks driven by USD weakness and geopolitical uncertainty." },
            { badge: '🔻 Drop', title: 'Significant Corrections', desc: "Sharp corrections in international gold (XAU/USD) resulted in notable single-day declines in Nepal's FENEGOSIDA benchmark." },
            { badge: '📈 Jump', title: 'Biggest Daily Increases', desc: 'Single-day jumps of Rs. 1,500–3,000 per Tola have occurred during periods of global financial stress and currency devaluation.' },
            { badge: '🎆 Seasonal', title: 'Festival Season Peaks', desc: 'Dashain and wedding seasons consistently drive demand spikes. October–November and February–April historically see price pressure.' },
          ].map(({ badge, title, desc }) => (
            <div key={title} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4">
              <span className="text-xs font-black bg-slate-100 text-slate-600 px-2 py-1 rounded-full whitespace-nowrap shrink-0 h-fit">{badge}</span>
              <div>
                <div className="font-black text-slate-800 text-sm mb-1">{title}</div>
                <div className="text-[13px] text-slate-600 font-medium leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEW: Who Updates Gold Prices ─── */}
      <section id="who-updates-prices" className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-4">Who Updates Gold Prices in Nepal?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { q: 'How are rates decided?', a: 'FENEGOSIDA calculates the rate each morning using the international LBMA spot price, the daily NRB USD/NPR exchange rate, and applicable customs duty.' },
            { q: 'When are prices published?', a: 'Rates are published daily at approximately 10:00 AM NPT, Sunday through Friday. No new rate is published on Saturdays or public holidays.' },
            { q: 'Why do jewellery shops charge different prices?', a: "Jewellers apply making charges (Jyala), wastage (Jarti), and 13% VAT independently. The FENEGOSIDA rate is only the raw gold value benchmark." },
            { q: 'Is NepaCalc affiliated with FENEGOSIDA?', a: 'No. NepaCalc is an independent data and calculator platform. We publish FENEGOSIDA benchmark rates as a public service, verified daily.' },
          ].map(({ q, a }) => (
            <div key={q} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="font-black text-slate-800 text-[13px] mb-2">{q}</div>
              <div className="text-[13px] text-slate-600 font-medium leading-relaxed">{a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ORIGINAL: FAQs (kept + expanded) ─── */}
      <section id="faq" className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-2">
          <Globe className="w-6 h-6 text-slate-400" />
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">What is the difference between Hallmark (24K) and Tejabi (22K) Gold?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                Hallmark (Chhapawal) is 99.99% pure gold, primarily used for investment bars and biscuits. Tejabi is 22K (91.6% pure), alloyed with other metals to provide the structural durability needed for intricate jewelry making.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">How often does FENEGOSIDA update gold prices?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                FENEGOSIDA normally publishes official gold and silver prices once every business day, usually around 10:00 AM Nepal Time (Sunday–Friday).
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">How many grams are in 1 Tola?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                In Nepal, 1 Tola is precisely equal to 11.6638 grams. For quick math, 10 grams equals roughly 0.857 Tola. Need to convert today&apos;s gold rate into Grams, Lal, Aana or Tola? Use our <a href="/calculator/gold-converter/" className="text-blue-700 hover:underline font-bold">Gold Unit Converter</a> to calculate the exact value of any jewellery weight instantly.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">Why is today&apos;s gold price different from yesterday?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                Nepal&apos;s gold price changes daily because FENEGOSIDA recalculates it every morning based on the international LBMA spot price, the NRB USD/NPR exchange rate, and applicable import duty.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">Why does jewellery cost more than today&apos;s gold price?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                The FENEGOSIDA rate is only the raw gold benchmark. When you buy jewellery, the final price includes Jyala (making charges: 5–15%), Jarti (wastage), and 13% VAT — set independently by each jeweller.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">Does today&apos;s gold price include VAT?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                No. The official FENEGOSIDA rate does not include VAT. The 13% VAT is added by the retailer at the point of sale.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">Why is gold cheaper today than yesterday?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                A fall in international gold prices (XAU/USD), a stronger Nepalese Rupee, or reduced import duty can cause the daily FENEGOSIDA rate to decrease.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">Does Nepal follow international gold prices?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                Yes. Nepal&apos;s gold price is directly derived from the international LBMA spot price, converted to NPR using NRB exchange rates, and adjusted for customs duty. When global prices rise or fall, Nepal&apos;s price follows — usually with a one-day lag.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">छापावाल र तेजाबी सुनमा के फरक छ?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                छापावाल सुन ९९.९९% शुद्ध हुन्छ र यसलाई लगानीको लागि उत्तम मानिन्छ। तेजाबी सुन २२ क्यारेट (९१.६% शुद्ध) हुन्छ, जसमा गहना बलियो बनाउन अन्य धातु मिसाइएको हुन्छ।
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">एक तोला सुनमा कति ग्राम हुन्छ?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                नेपालमा एक तोला सुन ११.६६३८ ग्राम बराबर हुन्छ। त्यसैगरी, १० ग्राम सुन भनेको करिब ०.८५७ तोला हो।
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">Does today&apos;s gold price include making charges?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                No. Making charges (Jyala) are set independently by each jeweller and are not reflected in the FENEGOSIDA benchmark rate. Always ask for a separate breakdown of gold value, making charges, and VAT when purchasing.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">Where does FENEGOSIDA get its price?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                FENEGOSIDA calculates the daily gold price using the international LBMA spot price, converted to NPR using the NRB-published USD/NPR exchange rate, then adding applicable customs duty and handling costs.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">How often is the official gold price updated?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                FENEGOSIDA publishes one official rate per business day, typically at around 10:00 AM NPT, Sunday through Friday. The market is closed on Saturdays and public holidays.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">Why do jewellery shops charge different prices?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                Jewellers independently set their making charges (Jyala), wastage fees (Jarti), and may also factor in their own buying price and margins. The FENEGOSIDA rate is the floor, not the ceiling.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">Is gold cheaper in Nepal than India?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                Prices differ due to different customs duty structures and import policies. Nepal imposes approximately 20% customs duty. Use the <a href="/calculator/gold-tax/" className="text-blue-600 hover:underline font-bold">Gold Tax Calculator</a> to estimate your total landed cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ORIGINAL: Archives Section ─── */}
      <section id="archives" className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-slate-400" />
          FENEGOSIDA Archives &amp; Reports
        </h2>
        <p className="text-[13px] text-slate-600 leading-relaxed font-medium mb-6 max-w-3xl">
          FENEGOSIDA Weekly Market Reports provide official updates on Nepal&apos;s gold and silver market trends, federation activities, pricing movements, and industry developments. These archives are maintained for transparency and public access.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a href="#" className="flex flex-col p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all group">
            <span className="text-xs font-black text-slate-400 tracking-widest uppercase mb-1">Archive</span>
            <span className="text-sm font-bold text-blue-700 group-hover:text-blue-800">Weekly Market Reports</span>
            <span className="text-[11px] text-slate-500 mt-2 font-medium">Explore weekly trends and official federation statements.</span>
          </a>
          <a href="#" className="flex flex-col p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all group">
            <span className="text-xs font-black text-slate-400 tracking-widest uppercase mb-1">Archive</span>
            <span className="text-sm font-bold text-blue-700 group-hover:text-blue-800">Official Notices</span>
            <span className="text-[11px] text-slate-500 mt-2 font-medium">Regulatory updates and customs duty adjustments.</span>
          </a>
          <a href="#" className="flex flex-col p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all group">
            <span className="text-xs font-black text-slate-400 tracking-widest uppercase mb-1">Archive</span>
            <span className="text-sm font-bold text-blue-700 group-hover:text-blue-800">Election Documents</span>
            <span className="text-[11px] text-slate-500 mt-2 font-medium">Public federation governance and committee records.</span>
          </a>
        </div>
      </section>

      {/* ─── NEW: Glossary ─── */}
      <section id="glossary" className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-slate-400" />
          Understanding Today&apos;s Gold Rate Terms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Hallmark Gold (24K)', def: '99.99% pure gold. Also called Chhapawal (छापावाल). Used for bars, biscuits, and investment bullion.' },
            { term: 'Tejabi Gold (22K)', def: '91.6% pure gold. Alloyed for strength. Preferred for jewellery making in Nepal.' },
            { term: 'Fine Gold / Bullion', def: 'Another term for 24K/999.9 pure gold used in the international bullion market, traded as bars or coins.' },
            { term: 'Tola', def: 'Traditional Nepali gold unit. 1 Tola = 11.6638 grams. The standard unit FENEGOSIDA uses for pricing.' },
            { term: '10 Gram', def: 'A commonly used international unit. Equal to approximately 0.857 Tola in Nepal.' },
            { term: 'LBMA', def: 'London Bullion Market Association. Sets the global gold and silver spot price benchmark used by FENEGOSIDA each day.' },
            { term: 'FENEGOSIDA', def: "Federation of Nepal Gold and Silver Dealers' Association. The official body that sets and publishes Nepal's daily gold and silver benchmark rate." },
            { term: 'Nepal Rastra Bank (NRB)', def: "Nepal's central bank. Publishes the daily USD/NPR exchange rate used in the gold price calculation." },
            { term: 'Jyala', def: "Making charges added by jewellers. Typically 5–15% of the gold value — not included in the FENEGOSIDA rate." },
            { term: 'Jarti', def: 'Wastage allowance charged by jewellers for gold lost during the crafting process.' },
          ].map(({ term, def }) => (
            <div key={term} className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div className="text-[12px] font-black text-slate-800 mb-1">{term}</div>
              <div className="text-[12px] text-slate-600 font-medium leading-relaxed">{def}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEW: Useful Gold Tools ─── */}
      <section id="useful-gold-tools" className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4">Useful Gold Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'Gold Price Calculator', desc: 'Convert any gold weight', href: '/calculator/gold-converter/', emoji: '🔢' },
            { name: 'Gold Tax Calculator', desc: 'Estimate import duty & VAT', href: '/calculator/gold-tax/', emoji: '🧾' },
            { name: 'Silver Price Today', desc: 'Live FENEGOSIDA silver rate', href: '/market-rates/silver-price-nepal/', emoji: '🥈' },
            { name: 'Silver Converter Nepal', desc: 'Convert silver weight & value', href: '/calculator/silver-converter/', emoji: '⚖️' },
            { name: "Today's Exchange Rate", desc: 'NRB daily USD/NPR rate', href: '/market-rates/exchange-rate-nepal/', emoji: '💱' },
            { name: 'Gold Price History Nepal', desc: 'Historical FENEGOSIDA data', href: '#gold-price-history', emoji: '📅' },
            { name: 'All Market Rates', desc: 'Gold, silver, forex hub', href: '/market-rates/', emoji: '📊' },
            { name: 'Weight Converter', desc: 'Tola, Gram, Lal, Aana', href: '/calculator/gold-converter/', emoji: '⚙️' },
          ].map(({ name, desc, href, emoji }) => (
            <Link key={name} href={href} className="flex flex-col gap-1 p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all">
              <span className="text-2xl mb-1">{emoji}</span>
              <span className="text-[12px] font-black text-slate-800">{name}</span>
              <span className="text-[11px] text-slate-500 font-medium">{desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── NEW: Related Market Rates ─── */}
      <section className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4">Related Market Rates &amp; Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: 'Live Silver Price', href: '/market-rates/silver-price-nepal/', emoji: '🥈' },
            { name: "Today's Exchange Rate", href: '/market-rates/exchange-rate-nepal/', emoji: '💱' },
            { name: 'Gold Converter', href: '/calculator/gold-converter/', emoji: '🔄' },
            { name: 'Silver Converter Nepal', href: '/calculator/silver-converter/', emoji: '⚖️' },
            { name: 'Gold Tax Calculator Nepal', href: '/calculator/gold-tax/', emoji: '🧾' },
            { name: 'All Market Rates', href: '/market-rates/', emoji: '📊' },
          ].map(({ name, href, emoji }) => (
            <Link key={name} href={href} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all">
              <span className="text-xl">{emoji}</span>
              <span className="text-[13px] font-bold text-slate-700 hover:text-blue-700">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── NEW: People Also Search ─── */}
      <section className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-400" />
          People Also Search
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Today's Silver Price", href: '/market-rates/silver-price-nepal/' },
            { label: 'Gold Rate per Gram', href: '/calculator/gold-converter/' },
            { label: 'Gold Rate per Tola', href: '/calculator/gold-converter/' },
            { label: '24K Gold Price Nepal', href: '/market-rates/live-gold-price/' },
            { label: '22K Gold Price Nepal', href: '/market-rates/live-gold-price/' },
            { label: 'Silver Price Today', href: '/market-rates/silver-price-nepal/' },
            { label: 'Gold Converter', href: '/calculator/gold-converter/' },
            { label: 'Silver Converter Nepal', href: '/calculator/silver-converter/' },
            { label: "Today's NRB Exchange Rate", href: '/market-rates/exchange-rate-nepal/' },
            { label: 'Gold Import Tax Nepal', href: '/calculator/gold-tax/' },
            { label: 'Gold Price History Nepal', href: '#gold-price-history' },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-700 text-[12px] font-bold rounded-full transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── ORIGINAL: Why Trust This Data (with new Editorial Process card) ─── */}
      <section className="pt-8 border-t border-slate-200" aria-label="Trust and Verification">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-500" />
          Why Trust This Data?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
            <h3 className="text-xs font-black text-green-700 uppercase tracking-widest mb-2">Official Source</h3>
            <p className="text-[13px] text-slate-700 font-medium">All rates originate directly from FENEGOSIDA — the official federation governing gold and silver dealers in Nepal. No third-party estimation is used.</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
            <h3 className="text-xs font-black text-blue-700 uppercase tracking-widest mb-2">Exact Historical Preservation</h3>
            <p className="text-[13px] text-slate-700 font-medium">Historical records are displayed exactly as published by FENEGOSIDA, without normalization, rounding, or correction. Even anomalies are preserved to protect source integrity.</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
            <h3 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-2">Daily Verification</h3>
            <p className="text-[13px] text-slate-700 font-medium">Data is verified daily against the official FENEGOSIDA release, published at approximately 10:00 AM NPT (Sunday–Friday). The last sync timestamp is always visible above the rate board.</p>
          </div>
          <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
            <h3 className="text-xs font-black text-purple-700 uppercase tracking-widest mb-2">Editorial Review</h3>
            <p className="text-[13px] text-slate-700 font-medium">The NepaCalc Editorial Team independently reviews data accuracy, content quality, and schema consistency on a regular basis.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Independent Platform</h3>
            <p className="text-[13px] text-slate-700 font-medium">NepaCalc does not buy, sell, or trade precious metals. This page is a public information service. Retail prices vary by jeweler due to making charges, wastage, and 13% VAT.</p>
          </div>
          <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl">
            <h3 className="text-xs font-black text-sky-700 uppercase tracking-widest mb-2">Editorial Process (Methodology)</h3>
            <p className="text-[13px] text-slate-700 font-medium">Each day, our system fetches the FENEGOSIDA rate after the 10 AM publication. A secondary manual check is performed before the rate is marked as &quot;Verified&quot; on the live board.</p>
          </div>
        </div>
        <div className="mt-4 bg-red-50 border border-red-100 p-4 rounded-xl">
          <h3 className="text-xs font-black text-red-700 uppercase tracking-widest mb-2">Questions or Corrections?</h3>
          <p className="text-[13px] text-slate-700 font-medium">If you spot a data discrepancy, <a href="/contact" className="underline text-blue-700 font-bold">contact our editorial team</a>. All corrections require source verification from FENEGOSIDA.</p>
        </div>
      </section>

      {/* ─── ORIGINAL: Editorial & Data Governance ─── */}
      <section className="pt-8 border-t border-slate-200">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-slate-400" />
          Editorial Review &amp; Data Governance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Content Ownership</h3>
            <p className="text-[13px] font-medium text-slate-700 mb-1">Data Source: <strong>FENEGOSIDA</strong></p>
            <p className="text-[13px] font-medium text-slate-700 mb-1">Publisher: <strong>NepaCalc</strong></p>
            <p className="text-[13px] font-medium text-slate-700 mb-1">Editorial Team: <strong>NepaCalc Editorial Team</strong></p>
            <p className="text-[13px] font-medium text-slate-700 mb-1">Last Reviewed: <strong>{new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Kathmandu', month: 'long', day: 'numeric', year: 'numeric' })}</strong></p>
            <p className="text-[13px] font-medium text-slate-700">Please provide verified sources for data corrections.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Page Change History</h3>
            <ul className="space-y-2 text-[12px] font-medium text-slate-600">
              <li><span className="font-bold text-slate-800">2083-04-14</span> — Added Gold Buying Guide, Glossary, People Also Search, and 12 new FAQ items.</li>
              <li><span className="font-bold text-slate-800">2083-03-05</span> — Automated dynamic sync with FENEGOSIDA added.</li>
              <li><span className="font-bold text-slate-800">2083-02-15</span> — Added Silver Price history dataset integration.</li>
              <li><span className="font-bold text-slate-800">2083-01-10</span> — Updated multi-language FAQ section for better clarity.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── NEW: Official Market References ─── */}
      <section className="pt-8 pb-8 border-t border-slate-200">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-slate-400" />
          Official Market References
        </h2>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-[13px] text-slate-700 font-medium leading-relaxed">
          For global economic data, official import policies, and international precious metal benchmarks, please refer to the following authoritative sources:
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><a href="https://www.nrb.org.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold">Nepal Rastra Bank (NRB)</a></li>
            <li><a href="https://www.customs.gov.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold">Department of Customs, Nepal</a></li>
            <li><a href="https://www.gold.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold">World Gold Council</a></li>
            <li><a href="https://www.lbma.org.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold">London Bullion Market Association (LBMA)</a></li>
          </ul>
        </div>
      </section>

      {/* ─── ORIGINAL: E-E-A-T Disclaimer ─── */}
      <div className="bg-slate-100/50 p-6 rounded-2xl border border-slate-200 text-center">
        <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto uppercase tracking-widest">
          Official benchmark rates published by Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA), displayed and analyzed by NepaCalc. NepaCalc is an independent analytics platform and does not buy, sell, or trade precious metals. Retail purchases are subject to local making charges and 13% VAT.
        </p>
      </div>

    </div>
  );
}
