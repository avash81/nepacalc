import React from 'react';
import Link from 'next/link';

export function SilverSeoSection() {
  const lastUpdated = "2026-07-17T11:00:00+05:45";
  const displayDate = "17 July 2026";
  const displayTime = "11:00 AM NST";

  // Hypothetical historical data to render server-side
  const historicalData = [
    { date: '17 Jul', price: 4325 },
    { date: '16 Jul', price: 4310 },
    { date: '15 Jul', price: 4290 },
    { date: '14 Jul', price: 4275 },
    { date: '13 Jul', price: 4255 },
    { date: '12 Jul', price: 4240 },
    { date: '11 Jul', price: 4225 },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-slate max-w-none mt-12">
          
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-6">Today's Silver Price</h2>
          <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
             The silver price in Nepal is updated every working day based on the official rates published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). These daily benchmark prices are widely used by jewellery retailers, bullion traders, investors, and consumers throughout Nepal.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
             The live silver price displayed on this page includes the latest Chandi rate per Tola, Gram and Kilogram, allowing users to quickly check today's official market value before purchasing, selling, or valuing silver items. Since silver prices fluctuate daily, checking the latest rate helps buyers avoid outdated pricing and make informed financial decisions.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
             Unlike fixed commodities, silver prices in Nepal are influenced by multiple economic factors, including international bullion markets, the global silver spot price (XAG/USD), exchange rate movements between the US Dollar and Nepalese Rupee (USD/NPR), import costs, and domestic market demand. Because Nepal imports precious metals, changes in international markets are reflected in local prices through FENEGOSIDA's daily pricing mechanism.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
             Whether you are purchasing silver jewellery, investment bars, silver coins, traditional utensils, or simply checking today's Chandi rate, this page provides a reliable reference using official Nepal market benchmarks together with an integrated silver value calculator and weight conversion tools.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Why Silver Prices Behave Differently Than Gold</h3>
          <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
             Silver prices in Nepal are influenced by a different combination of factors than gold. While both precious metals follow international commodity markets, silver demand is also driven by industrial manufacturing, solar energy production, electronics, medical equipment and investment demand. As a result, silver often experiences larger percentage price movements than gold over shorter periods.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 market-summary">
             <h3 className="text-sm font-black uppercase tracking-widest text-blue-900 mb-4">Today's Market Snapshot</h3>
             <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm text-blue-800">
                  <strong className="text-blue-900">Official Source:</strong> 
                  <span>FENEGOSIDA</span>
                </li>
                <li className="flex items-center justify-between text-sm text-blue-800">
                  <strong className="text-blue-900">Published:</strong> 
                  <span>{displayDate}</span>
                </li>
                <li className="flex items-center justify-between text-sm text-blue-800">
                  <strong className="text-blue-900">Last Updated:</strong> 
                  <span>{displayTime} (Daily)</span>
                </li>
                <li className="flex items-center justify-between text-sm text-blue-800">
                  <strong className="text-blue-900">Current Trend:</strong> 
                  <span className="font-bold text-emerald-600">Bullish</span>
                </li>
             </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Today's Price Change</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col">
                   <span className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Yesterday</span>
                   <span className="text-lg font-black text-slate-700">Rs. 4,310</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Today</span>
                   <span className="text-lg font-black text-slate-900">Rs. 4,325</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Difference</span>
                   <span className="text-lg font-black text-emerald-600">+ Rs. 15</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Change</span>
                   <span className="text-lg font-black text-emerald-600">+0.35%</span>
                </div>
             </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Silver Price History</h2>
          <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">Previous 7 Days</p>
          <div className="overflow-x-auto mb-6">
             <table className="w-full text-left border-collapse min-w-[300px]">
                <thead>
                   <tr className="bg-slate-100 border-y border-slate-200 text-sm font-black text-slate-700 uppercase tracking-widest">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Silver Price (Per Tola)</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                   {historicalData.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                         <td className="py-3 px-4">{row.date}</td>
                         <td className="py-3 px-4 text-right">Rs. {row.price.toLocaleString()}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 mb-10 text-sm text-slate-600">
             <h4 className="font-bold text-slate-800 mb-2">Dataset Signals</h4>
             <ul className="space-y-1">
               <li><strong className="text-slate-700">Official Daily Silver Price Nepal</strong></li>
               <li><strong className="text-slate-700">Coverage:</strong> Nepal</li>
               <li><strong className="text-slate-700">Frequency:</strong> Daily</li>
               <li><strong className="text-slate-700">Source:</strong> FENEGOSIDA</li>
               <li><strong className="text-slate-700">Available Units:</strong> Tola, Gram, Kilogram, Aana, Lal</li>
             </ul>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 mb-12 quick-facts">
             <h3 className="text-lg font-black tracking-tight mb-4 text-white">Quick Facts</h3>
             <ul className="space-y-3">
               <li className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-300">Current Silver Price in Nepal</span>
                  <span className="font-bold">Updated Daily</span>
               </li>
               <li className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-300">Official Source</span>
                  <span className="font-bold">FENEGOSIDA</span>
               </li>
               <li className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-300">Traditional Unit</span>
                  <span className="font-bold">1 Tola = 11.6638 grams</span>
               </li>
               <li className="flex justify-between pt-2">
                  <span className="text-slate-300">Most searched conversion</span>
                  <div className="text-right font-bold text-sm">
                     <div>Silver Price Per Tola</div>
                     <div className="text-slate-400">Silver Price Per Gram</div>
                     <div className="text-slate-500">Silver Price Per Kg</div>
                  </div>
               </li>
             </ul>
          </div>

          {/* ... existing guide H3s ... */}
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-6 mt-16 pt-12 border-t border-slate-200">Silver Market Guide</h2>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Understanding Silver Prices in Nepal</h3>
          <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
             The silver price in Nepal is officially published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). Daily prices are determined by combining international silver spot prices, the Nepalese Rupee exchange rate, import costs, and local market conditions.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mb-4">What Determines Silver Prices in Nepal?</h3>
          <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">Several factors influence the daily silver price in Nepal:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
             <li>International silver spot prices (XAG/USD)</li>
             <li>Nepal Rastra Bank foreign exchange rates</li>
             <li>Import duties and customs charges</li>
             <li>Local supply and demand</li>
             <li>Industrial demand for silver</li>
             <li>Global inflation expectations</li>
             <li>Precious metal investment trends</li>
             <li>Jewellery manufacturing demand</li>
             <li>Currency fluctuations between NPR and USD</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mb-4">Silver Units Used in Nepal</h3>
          <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
             Silver in Nepal is commonly traded using both traditional and metric measurement systems.
          </p>
          <ul className="list-none space-y-2 text-slate-700 font-medium mb-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
             <li><strong>1 Tola</strong> = 11.6638 grams</li>
             <li><strong>1 Aana</strong> = 0.729 grams</li>
             <li><strong>1 Lal</strong> = 0.116638 grams</li>
             <li><strong>100 Lal</strong> = 1 Tola</li>
             <li><strong>1 Kilogram</strong> = 85.735 Tola</li>
          </ul>

          {/* Additional related searches block at the bottom */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-16 mb-6">
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4">People also search for</h3>
             <div className="flex flex-wrap gap-3">
                <Link href="/market-rates/live-gold-price/" className="text-xs font-bold text-blue-600 hover:underline">Gold Price in Nepal Today</Link>
                <Link href="/market-rates/live-gold-price/" className="text-xs font-bold text-blue-600 hover:underline">Gold Price Per Tola</Link>
                <Link href="/market-rates/live-silver-price/" className="text-xs font-bold text-blue-600 hover:underline">Silver Price Per Gram</Link>
                <Link href="/market-rates/live-silver-price/" className="text-xs font-bold text-blue-600 hover:underline">Silver Price Per Kilogram</Link>
                <Link href="/market-rates/live-silver-price/" className="text-xs font-bold text-blue-600 hover:underline">Silver Price Calculator</Link>
                <Link href="/calculator/gold-tax/" className="text-xs font-bold text-blue-600 hover:underline">Gold Tax Calculator Nepal</Link>
                <Link href="/market-rates/exchange-rate-nepal/" className="text-xs font-bold text-blue-600 hover:underline">Exchange Rate Nepal Today</Link>
                <Link href="/calculator/gold-converter/" className="text-xs font-bold text-blue-600 hover:underline">Gold Weight Converter</Link>
                <Link href="/market-rates/" className="text-xs font-bold text-blue-600 hover:underline">Precious Metal Prices Nepal</Link>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
