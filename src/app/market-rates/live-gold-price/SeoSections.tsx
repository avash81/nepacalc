import React from 'react';
import { BookOpen, Scale, Globe, ShieldCheck, CheckCircle2, FileText, Anchor } from 'lucide-react';
import HistoricalData from './HistoricalData';

export default function SeoSections() {
  return (
    <div className="space-y-16 mt-8">
      
      
      {/* Table of Contents */}
      <nav aria-label="Table of Contents" className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-600" />
          On This Page
        </h2>
        <ul className="space-y-3">
          <li><a href="#quick-answer" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Quick Answer: Gold Price Today</a></li>
          <li><a href="#ai-summary" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">AI Summary &amp; Market Insights</a></li>
          <li><a href="#how-its-calculated" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">How Gold Prices Are Calculated in Nepal</a></li>
          <li><a href="#gold-price-history" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Historical Records &amp; Yearly Data</a></li>
          <li><a href="#faq" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Frequently Asked Questions (English &amp; Nepali)</a></li>
          <li><a href="#archives" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">FENEGOSIDA Archives &amp; Notices</a></li>
        </ul>
      </nav>

      {/* AI Summary Box & Citation Table */}
      <section id="ai-summary" className="scroll-mt-24 ai-summary-box">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
          Market Intelligence &amp; AI Summary
        </h2>
        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 mb-8">
          <p className="text-[15px] leading-relaxed text-slate-700 font-medium">
            Based on the latest LBMA spot indices and FENEGOSIDA's localized adjustments, Nepal's gold market continues to reflect strict customs valuations alongside global currency pressures. Retail investors should expect prices to carry roughly a 20% premium over the international spot metric due to the mandated import tariffs enforced by the central bank. For a comprehensive look at what's driving these changes this year, read our <a href="/blog/nepal-gold-price-analysis-2083/" className="text-blue-700 hover:underline font-bold">Nepal Gold Price Analysis 2083</a>.
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
                <td className="py-3 px-4 text-slate-600 font-medium">FENEGOSIDA (Federation of Nepal Gold and Silver Dealers' Association)</td>
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
                    <td className="py-3 px-4 text-slate-600 font-medium">Please refer to the live board above for today's dynamic Fine Gold and Tejabi Gold rates.</td>
                 </tr>
                 <tr>
                    <th className="py-3 px-4 font-bold text-slate-700">Silver price today Nepal</th>
                    <td className="py-3 px-4 text-slate-600 font-medium">Please refer to the live board above for today's dynamic Silver (Chandi) rate.</td>
                 </tr>
                 <tr>
                    <th className="py-3 px-4 font-bold text-slate-700">Who sets gold prices in Nepal?</th>
                    <td className="py-3 px-4 text-slate-600 font-medium">The Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA).</td>
                 </tr>
              </tbody>
           </table>
        </div>

        {/* AI Citation Block */}
        <div className="bg-slate-800 text-slate-300 p-6 rounded-2xl">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Suggested Citation Format</h3>
           <p className="text-[13px] font-mono mb-2">Source: Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)</p>
           <p className="text-[13px] font-mono mb-2">Published by: NepaCalc</p>
           <p className="text-[13px] font-mono">Last Updated: {new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Kathmandu', month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </section>

      {/* How Prices Are Calculated */}
      <section id="how-its-calculated" className="scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-2">
          <Scale className="w-6 h-6 text-slate-400" />
          How Gold Prices Are Calculated in Nepal
        </h2>
        <div className="prose prose-slate max-w-none space-y-5">
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            The official rate provided by FENEGOSIDA isn't just a direct conversion of the international market. It involves several compounding factors that establish the local floor price before retail jewelry stores even add their making charges.
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
            <strong>2. Currency Exchange Rate (USD to NPR):</strong> Because global gold is priced in US Dollars, any fluctuation in the value of the Nepalese Rupee against the Dollar directly impacts the local price. Since gold is internationally priced in US Dollars, today's <a href="/market-rates/exchange-rate-nepal/" className="text-blue-600 hover:underline">NRB Exchange Rate</a> directly affects gold prices in Nepal.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            <strong>3. Customs Duty and Import Taxes:</strong> This is the largest local factor. The Nepal Government enforces strict import quotas (typically capped around 20kg per day for commercial banks) and levies an approximate 20% customs duty on raw bullion to protect foreign currency reserves.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Retail Additions:</strong> When you purchase finished jewelry, showrooms add <em>Jyala</em> (making charges, typically 5-15%), <em>Jarti</em> (wastage), and a mandatory 13% Value Added Tax (VAT). To calculate exactly how much you'll be billed at the showroom, use our <a href="/calculator/gold-tax/" className="text-blue-600 hover:underline font-bold">Gold Tax Calculator</a>.
          </p>
        </div>
      </section>

      {/* Compare Gold and Silver Prices */}
      <section className="scroll-mt-24 mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4">
          Compare Gold and Silver Prices
        </h2>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
          <p className="text-[14px] leading-relaxed text-slate-700 font-medium mb-3">
            Gold and silver prices often move together but respond differently to global market conditions, industrial demand, inflation, and exchange rates.
          </p>
          <p className="text-[14px] leading-relaxed text-slate-700 font-medium">
            If you also monitor silver prices, compare today's official Chandi benchmark using our <a href="/market-rates/live-silver-price/" className="text-blue-700 hover:underline font-bold">Live Silver Price</a> page.
          </p>
        </div>
      </section>

      {/* Historical Data Section (Component) */}
      <HistoricalData />

      {/* FAQs */}
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
              <h3 className="text-sm font-bold text-blue-700 mb-2">How many grams are in 1 Tola?</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                In Nepal, 1 Tola is precisely equal to 11.6638 grams. For quick math, 10 grams equals roughly 0.857 Tola. You can easily convert between any of these traditional and modern units using our <a href="/calculator/gold-converter/" className="text-blue-700 hover:underline font-bold">Gold Unit Converter</a>.
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
          </div>
        </div>
      </section>

      {/* Archives Section */}
      <section id="archives" className="scroll-mt-24 pt-8 border-t border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-slate-400" />
          FENEGOSIDA Archives &amp; Reports
        </h2>
        <p className="text-[13px] text-slate-600 leading-relaxed font-medium mb-6 max-w-3xl">
          FENEGOSIDA Weekly Market Reports provide official updates on Nepal's gold and silver market trends, federation activities, pricing movements, and industry developments. These archives are maintained for transparency and public access.
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

      {/* Related Market Links (Crawl Depth & SEO) */}
      <section className="pt-8 border-t border-slate-200">
         <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-4 flex items-center gap-2">
            <Anchor className="w-6 h-6 text-slate-400" />
            Related Market Resources
         </h2>
         {/* VERIFIED EXISTING PAGES ONLY — No 404 links */}
         <div className="flex flex-wrap gap-3">
            <a href="/market-rates/live-silver-price/" className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">Silver Price in Nepal Today</a>
            <a href="/calculator/gold-converter/" className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">Gold Weight Converter</a>
            <a href="/calculator/gold-tax/" className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">Gold Import Tax Calculator</a>
            <a href="/market-rates/exchange-rate-nepal/" className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">Currency Exchange Rate</a>
            <a href="/market-rates/remittance/" className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">Remittance Calculator</a>
         </div>
      </section>

      {/* Why Trust This Data */}
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
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
               <h3 className="text-xs font-black text-red-700 uppercase tracking-widest mb-2">Questions or Corrections?</h3>
               <p className="text-[13px] text-slate-700 font-medium">If you spot a data discrepancy, <a href="/contact" className="underline text-blue-700 font-bold">contact our editorial team</a>. All corrections require source verification from FENEGOSIDA.</p>
            </div>
         </div>
      </section>

      {/* Editorial & Data Governance */}
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
               <p className="text-[13px] font-medium text-slate-700"><a href="/contact" className="underline text-blue-700">Contact the Editorial Team</a></p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
               <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Page Change History</h3>
               <ul className="space-y-2 text-[12px] font-medium text-slate-600">
                  <li><span className="font-bold text-slate-800">2083-03-05</span> — Automated dynamic sync with FENEGOSIDA added.</li>
                  <li><span className="font-bold text-slate-800">2083-02-15</span> — Added Silver Price history dataset integration.</li>
                  <li><span className="font-bold text-slate-800">2083-01-10</span> — Updated multi-language FAQ section for better clarity.</li>
               </ul>
            </div>
         </div>
      </section>

      {/* E-E-A-T Disclaimer & Canonical Block */}
      <div className="bg-slate-100/50 p-6 rounded-2xl border border-slate-200 text-center">
        <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto uppercase tracking-widest">
          Official benchmark rates published by Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA), displayed and analyzed by NepaCalc. NepaCalc is an independent analytics platform and does not buy, sell, or trade precious metals. Retail purchases are subject to local making charges and 13% VAT.
        </p>
      </div>

    </div>
  );
}
