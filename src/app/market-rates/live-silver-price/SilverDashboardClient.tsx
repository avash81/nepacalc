'use client';

import React from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import GoldConverter from '@/app/calculator/gold-converter/Calculator';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Coins, Table, History, TrendingUp, ShieldCheck, BarChart3, Landmark, Activity, Info } from 'lucide-react';

export default function SilverDashboardClient() {
  const { rates, loading } = useLiveRates();

  if (loading || !rates?.silver) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
     </div>;
  }

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const silver = rates.silver.tolaNPR;

  const tables = [
    { label: 'Fine Silver (Chandi)', np: 'शुद्ध चाँदी (प्रति तोला)', rate: silver.current, unit: '1 Tola' },
    { label: 'Fine Silver (Chandi)', np: 'शुद्ध चाँदी (१० ग्राम)', rate: Math.round(silver.current / 1.1664), unit: '10 Gram' },
  ];

  return (
    <MarketDashboardLayout
      title="Silver Price"
      description="Daily verified silver (Chandi) rates in Nepal. High-precision benchmarks based on international industrial spot markets and official FENEGOSIDA price mandates."
      liveRate={fmt(silver.current)}
      changePercent={silver.changePercent24h}
      lastUpdated={new Date().toLocaleDateString()}
      accentColor="#64748b"
      mainBoard={
        <div className="flex flex-col">
           {/* Chart Section */}
           <div className="p-8 border-b border-slate-100 bg-slate-50/30">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-slate-500" />
                    <div className="text-[14px] font-black uppercase tracking-widest text-slate-900">Silver Spot Market (XAG/USD)</div>
                 </div>
              </div>
              <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative">
                 <TradingViewWidget 
                    symbol="OANDA:XAGUSD"
                    theme="light"
                    containerId="tv_chart_silver_main"
                 />
              </div>
           </div>

           {/* Table Section */}
           <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                 <Table className="w-4 h-4 text-slate-500" />
                 <div className="text-[12px] font-black uppercase tracking-widest text-slate-900">Nepal Benchmark Rates</div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="pb-4 px-4">Standard</th>
                          <th className="pb-4 px-4">Unit</th>
                          <th className="pb-4 px-4 text-right">Rate (NPR)</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {tables.map((row, i) => (
                          <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                             <td className="py-4 px-4">
                                <div className="flex flex-col">
                                   <span className="text-[14px] font-black text-slate-800">{row.label}</span>
                                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.np}</span>
                                </div>
                             </td>
                             <td className="py-4 px-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">{row.unit}</td>
                             <td className="py-4 px-4 text-right">
                                <span className="text-[17px] font-black text-slate-900 tracking-tighter">Rs. {fmt(row.rate)}</span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      }
      calculatorSection={
        <div className="space-y-6">
           <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-slate-600 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-slate-600 font-medium italic">
                Professional silver valuation including fine metals conversion and standard making charges.
              </p>
           </div>
           <GoldConverter initialAssetId="silver_tola" isEmbed={true} />
        </div>
      }
      calculatorSection={
        <div className="space-y-6">
           <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-slate-600 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-slate-600 font-medium italic">
                Professional silver valuation including fine metals conversion and standard making charges.
              </p>
           </div>
           <GoldConverter initialAssetId="silver_tola" isEmbed={true} />
        </div>
      }
      seoSection={
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

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
               <h3 className="text-sm font-black uppercase tracking-widest text-blue-900 mb-4">Official Silver Rate Information</h3>
               <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-blue-800"><strong className="text-blue-900">Data Source:</strong> Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)</li>
                  <li className="flex items-center gap-3 text-sm text-blue-800"><strong className="text-blue-900">Market Coverage:</strong> Nepal</li>
                  <li className="flex items-center gap-3 text-sm text-blue-800"><strong className="text-blue-900">Asset:</strong> Fine Silver (Chandi)</li>
                  <li className="flex items-center gap-3 text-sm text-blue-800"><strong className="text-blue-900">Standard Unit:</strong> 1 Tola = 11.6638 grams</li>
                  <li className="flex items-center gap-3 text-sm text-blue-800"><strong className="text-blue-900">Update Frequency:</strong> Every working day (except public holidays and market closures)</li>
               </ul>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Key Highlights</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-12">
               <li>Live Silver Price in Nepal</li>
               <li>Official FENEGOSIDA benchmark rates</li>
               <li>Silver price per Tola</li>
               <li>Silver price per Gram</li>
               <li>Silver price per Kilogram</li>
               <li>Daily Nepal silver market updates</li>
               <li>Real-time silver calculator</li>
               <li>Traditional Nepal silver weight conversion</li>
            </ul>

            {/* --- PHASE 28 & 29 FINAL SEO CONTENT --- */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-6 mt-16 pt-12 border-t border-slate-200">Silver Market Guide</h2>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Understanding Silver Prices in Nepal</h3>
            <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
               The silver price in Nepal is officially published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). Daily prices are determined by combining international silver spot prices, the Nepalese Rupee exchange rate, import costs, and local market conditions.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
               Silver prices are generally announced once each business day and are used as the reference benchmark by jewellery shops, bullion dealers, investors, and consumers throughout Nepal.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               This page provides the official Nepal silver rate together with live conversions, historical information, and valuation tools for both buyers and sellers.
            </p>

            {/* What Determines Silver Prices */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">What Determines Silver Prices in Nepal?</h2>
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
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Because these variables change continuously, the official silver benchmark may increase or decrease from one trading day to the next.
            </p>

            {/* Silver Units */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Silver Units Used in Nepal</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
               Silver in Nepal is commonly traded using both traditional and metric measurement systems.<br /><br />
               The most common traditional unit is the Tola, while jewellers also use Aana and Lal for smaller quantities.<br /><br />
               Official metric conversions are:
            </p>
            <ul className="list-none space-y-2 text-slate-700 font-medium mb-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <li><strong>1 Tola</strong> = 11.6638 grams</li>
               <li><strong>1 Aana</strong> = 0.729 grams</li>
               <li><strong>1 Lal</strong> = 0.116638 grams</li>
               <li><strong>100 Lal</strong> = 1 Tola</li>
               <li><strong>1 Kilogram</strong> = 85.735 Tola</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               The calculator on this page automatically converts between all major Nepalese and international silver weight units.
            </p>

            {/* Purity Standards */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Silver Purity Standards</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Silver products available in Nepal generally fall into the following purity categories:
            </p>
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Fine Silver (999)</h3>
            <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
               Contains 99.9% pure silver and is commonly used for investment bars and bullion.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Sterling Silver (925)</h3>
            <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
               Contains 92.5% silver and 7.5% alloy metals. This is the most common jewellery standard worldwide.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Traditional Silver</h3>
            <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
               Some handcrafted Nepalese ornaments may have different purity levels depending on local craftsmanship and intended use.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium bg-amber-50 p-4 border-l-4 border-amber-500 rounded-r-xl">
               Always verify purity before purchasing silver jewellery or investment products.
            </p>

            {/* Common Uses */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Common Uses of Silver in Nepal</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Silver plays an important role in Nepalese culture and the economy. Common uses include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Jewellery</li>
               <li>Religious items</li>
               <li>Traditional utensils</li>
               <li>Investment bars</li>
               <li>Coins</li>
               <li>Wedding gifts</li>
               <li>Decorative handicrafts</li>
               <li>Industrial manufacturing</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Unlike gold, silver also has significant industrial demand, making its price behaviour different during changing economic conditions.
            </p>

            {/* Silver as Investment */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Silver as an Investment</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Many investors consider silver a long-term store of value because it serves both industrial and investment purposes. Silver may offer:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Lower entry cost than gold</li>
               <li>Higher price volatility</li>
               <li>Portfolio diversification</li>
               <li>Inflation protection over long periods</li>
               <li>Industrial demand support</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium text-slate-500 italic">
               However, silver prices can fluctuate significantly, and past performance does not guarantee future returns.
            </p>

            {/* Difference Between Gold and Silver Prices */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Difference Between Gold and Silver Prices</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Although gold and silver often move in the same general direction, they respond differently to market conditions.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Gold is primarily influenced by investment demand and central bank reserves. Silver is influenced by both investment demand and industrial consumption.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Because of this dual demand, silver prices may rise or fall independently of gold during certain market cycles.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Many investors monitor both precious metals together before making buying or selling decisions.
            </p>

            {/* Updates */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">How Often Are Silver Prices Updated?</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               The official silver rate in Nepal is generally updated once every business day after FENEGOSIDA publishes the latest benchmark prices.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               International silver spot prices continue changing throughout global trading hours.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               This page synchronizes official Nepal benchmark prices while also displaying the latest available market information for reference.
            </p>

            {/* Who Uses */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Who Uses Silver Price Data?</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               The official silver price is widely used by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Jewellery buyers</li>
               <li>Jewellery shops</li>
               <li>Precious metal dealers</li>
               <li>Investors</li>
               <li>Financial institutions</li>
               <li>Pawn and valuation services</li>
               <li>Gold and silver traders</li>
               <li>Individuals selling old silver</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Using official benchmark rates helps ensure fair valuation during buying and selling transactions.
            </p>

            {/* Historical Trends */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Historical Silver Price Trends</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Silver prices rarely move in a straight line. Historical trends are influenced by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Inflation</li>
               <li>Interest rates</li>
               <li>Economic growth</li>
               <li>Currency movements</li>
               <li>Industrial production</li>
               <li>Precious metal demand</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Reviewing historical trends can help users understand long-term market movements, although historical prices should never be considered a guarantee of future performance.
            </p>

            {/* Buying Silver */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Buying Silver in Nepal</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               If you are planning to buy silver in Nepal, always compare the official daily benchmark price before visiting a jewellery shop or bullion dealer.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               The published market rate acts as the reference price, while the final amount paid may also include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Making charges</li>
               <li>Design charges</li>
               <li>Purity adjustments</li>
               <li>Applicable taxes</li>
               <li>Dealer service charges</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Checking the official silver price before purchasing helps buyers understand whether the quoted jewellery price is reasonable.
            </p>

            {/* Selling Silver */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Selling Silver in Nepal</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Individuals selling silver jewellery, utensils, coins, or bullion should compare the offered buying price with the official market benchmark.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Most dealers evaluate:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Total weight</li>
               <li>Silver purity</li>
               <li>Current market price</li>
               <li>Refining loss</li>
               <li>Melting charges</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Because purchase prices may differ from retail prices, checking the official benchmark provides a useful reference before selling.
            </p>

            {/* Jewellery Pricing */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Silver Jewellery Pricing</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Silver jewellery prices are calculated using several components rather than the metal price alone. The final selling price generally consists of:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Silver value based on weight</li>
               <li>Jewellery making charges</li>
               <li>Design complexity</li>
               <li>Stone or accessory costs</li>
               <li>Applicable taxes</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               For handcrafted jewellery, making charges may represent a significant portion of the final retail price.
            </p>

            {/* Coins and Bullion */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Silver Coins and Bullion</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Investment-grade silver is commonly available in the form of coins and bullion bars. Unlike jewellery, investment silver usually has:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Higher purity</li>
               <li>Lower making charges</li>
               <li>Easier resale value</li>
               <li>Standardized weight</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Many investors prefer bullion products when purchasing silver primarily for investment purposes.
            </p>

            {/* International Market */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">International Silver Market</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               The Nepal silver market closely follows international precious metal trading. Global silver prices are commonly quoted in US Dollars per Troy Ounce (XAG/USD).
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               When international silver prices move significantly, Nepal's domestic silver benchmark usually adjusts after accounting for exchange rates and local market conditions.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Because of this relationship, international economic events can influence local silver prices even if domestic demand remains unchanged.
            </p>

            {/* Exchange Rate */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Silver Price vs Exchange Rate</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Exchange rates play an important role in determining silver prices in Nepal. Since silver is traded globally in US Dollars, changes in the Nepalese Rupee exchange rate directly affect local pricing.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               When the NPR weakens against the USD, silver prices in Nepal may rise even if international silver prices remain relatively stable. Similarly, a stronger Nepalese Rupee may reduce local silver prices despite steady global markets.
            </p>

            {/* Volatility */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Daily Price Volatility</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Silver prices are naturally volatile because they respond to both investment demand and industrial consumption. Short-term fluctuations may occur due to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>International commodity markets</li>
               <li>Currency movements</li>
               <li>Global economic uncertainty</li>
               <li>Manufacturing demand</li>
               <li>Investor sentiment</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Daily changes are normal and should be interpreted within the context of longer-term market trends.
            </p>

            {/* Why it Matters */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Why Silver Prices Matter</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Daily silver prices affect many sectors of Nepal's economy. They influence:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Jewellery businesses</li>
               <li>Precious metal traders</li>
               <li>Individual investors</li>
               <li>Manufacturing industries</li>
               <li>Religious and ceremonial purchases</li>
               <li>Traditional handicrafts</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Access to accurate benchmark prices helps businesses and consumers make informed financial decisions.
            </p>

            {/* Metrics */}
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Frequently Monitored Silver Metrics</h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4 font-medium">
               Many users monitor more than today's silver price alone. Popular market indicators include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">
               <li>Silver price per tola</li>
               <li>Silver price per gram</li>
               <li>Silver price per kilogram</li>
               <li>Silver price history</li>
               <li>Daily percentage change</li>
               <li>Weekly price movement</li>
               <li>Monthly trend</li>
               <li>Silver to Gold ratio</li>
               <li>USD to NPR exchange rate</li>
               <li>International XAG/USD spot price</li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-10 font-medium">
               Together these indicators provide a more complete picture of the silver market.
            </p>

            {/* --- END PHASE 28 & 29 FINAL SEO CONTENT --- */}

               {/* Final navigation cluster */}
               <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4">Related Market Tools</h3>
                  <div className="flex flex-wrap gap-3">
                     <Link href="/market-rates/live-gold-price/" className="text-xs font-bold text-blue-600 hover:underline">Live Gold Price Nepal →</Link>
                     <Link href="/market-rates/exchange-rate-nepal/" className="text-xs font-bold text-blue-600 hover:underline">Exchange Rate Nepal →</Link>
                     <Link href="/calculator/gold-converter/" className="text-xs font-bold text-blue-600 hover:underline">Gold Weight Converter →</Link>
                     <Link href="/calculator/gold-tax/" className="text-xs font-bold text-blue-600 hover:underline">Gold Tax Calculator →</Link>
                     <Link href="/market-rates/" className="text-xs font-bold text-blue-600 hover:underline">All Market Rates →</Link>
                  </div>
               </div>

            </div>

         </div>
      </div>
   }
  />
  );
}

