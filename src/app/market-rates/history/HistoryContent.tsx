import React from 'react';

interface HistoryContentProps {
  latestGold?: any;
  latestSilver?: any;
}

export default function HistoryContent({ latestGold, latestSilver }: HistoryContentProps) {
  // Helpers
  const fmt = (num: number) => num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const fmtFull = (num: number) => num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Dynamic values (fallback to original example if not available)
  const goldDateAd = latestGold ? new Date(latestGold.date_ad).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '25 September 2026';
  const goldDateBs = latestGold?.date_bs || '2083/06/09';
  const goldTola = latestGold?.source_per_tola || 298600;
  const gold10g = latestGold?.source_per_10g || 256000;
  const goldSource = latestGold?.source || 'FENEGOSIDA';
  
  const silverDateAd = latestSilver ? new Date(latestSilver.date_ad).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '25 September 2026';
  const silverDateBs = latestSilver?.date_bs || '2083/06/09';
  const silverTola = latestSilver?.source_per_tola || 4620;
  const silver10g = latestSilver?.source_per_10g || 3961;
  const silverSource = latestSilver?.source || 'FENEGOSIDA';

  const monthYearStr = latestGold ? new Date(latestGold.date_ad).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'September 2026';

  return (
    <div className="mt-6 max-w-4xl space-y-10 text-sm text-slate-700 font-medium leading-relaxed">
      
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Historical Gold and Silver Records</h2>
        <div className="space-y-6">

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Gold Price History</h3>
            <p>Gold price history in Nepal can be viewed by date and year using the available historical records. For today&apos;s current rates, please visit the <a href="/market-rates/live-gold-price/" className="text-amber-700 font-semibold hover:underline">Live Gold Price in Nepal</a> page. The historical table preserves source-published gold prices per tola and per 10 grams and separately provides calculated per-gram and per-kilogram equivalents.</p>
            <p>Gold records retain the terminology used by the underlying source. Where the source identifies a record as <strong>Fine Gold (9999)</strong>, that terminology is displayed as Fine Gold (9999). Other source terminology, including <strong>Tejabi Gold</strong>, is not automatically converted into another purity or product category.</p>
            <p>For example, the verified record for <strong>{goldDateAd}</strong> identifies Fine Gold (9999) at <strong>NPR {fmt(goldTola)} per tola</strong> and <strong>NPR {fmt(gold10g)} per 10 grams</strong>, with the corresponding BS date <strong>{goldDateBs}</strong> and <a href="https://fenegosida.org" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 underline underline-offset-2">{goldSource}</a> as the source.</p>
            <p>Historical gold prices are not assumed to be continuous across every calendar date. When a corresponding historical source record has not been recovered or independently verified, a price is not created from an estimate, interpolation, previous-day value, or other calculated assumption.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Silver Price History</h3>
            <p>Silver price history in Nepal can also be viewed by date and year. For the latest daily silver rates, check the <a href="/market-rates/silver-price-nepal/" className="text-amber-700 font-semibold hover:underline">Today&apos;s Silver Price in Nepal</a> page. The historical table preserves the available source-published silver rates per tola and per 10 grams and provides calculated per-gram and per-kilogram equivalents separately.</p>
            <p>The source terminology is retained for silver records. For example, the verified {silverSource} record for <strong>{silverDateAd}</strong> shows <strong>Silver at NPR {fmt(silverTola)} per tola and NPR {fmt(silver10g)} per 10 grams</strong>, with BS date <strong>{silverDateBs}</strong>.</p>
            <p>Gold and silver are recorded independently because their historical rates, source records, and available dates can differ. A missing silver record is therefore not filled from a gold record, and a missing gold record is not inferred from silver.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Historical Prices by Date</h3>
            <p>Historical prices can be checked for a specific date using the date-based historical table.</p>
            <p>Each available record identifies:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Date in AD</li>
              <li>Date in BS</li>
              <li>Metal</li>
              <li>Rate type</li>
              <li>Price per tola</li>
              <li>Price per 10 grams</li>
              <li>Calculated price per gram</li>
              <li>Calculated price per kilogram</li>
              <li>Source</li>
              <li>Verification status</li>
            </ul>
            <p>A specific-date result can therefore answer questions such as <strong>what was the gold price in Nepal on a particular date</strong>, <strong>what was the silver price on a particular date</strong>, and <strong>what was the gold or silver rate per tola or per 10 grams on that date</strong>.</p>
            <p>For a date with verified records for both metals, the historical result can be read directly as a gold-and-silver comparison for that day.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Historical Prices by Year</h3>
            <p>Historical gold and silver rates can be examined by year to identify the dates for which source records are available. Year-based views are useful for comparing historical rates without treating the available records as a continuous daily series when gaps remain.</p>
            <p>The archive can be used to examine available records for years such as <strong>2024, 2025, and 2026</strong>, while earlier historical periods can be added only when the underlying records have been recovered and verified according to the applicable source and verification rules.</p>
            <p>A year with incomplete historical records should not be interpreted as a complete daily history. The distinction between <strong>available records</strong>, <strong>verified records</strong>, and <strong>continuous coverage</strong> is important when comparing historical gold or silver prices.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Gold &amp; Silver Prices by Weight</h2>
        <div className="space-y-6">

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Gold Price per Tola, 10 Grams, Gram and Kilogram</h3>
            <p>Gold prices in the historical records are primarily presented using the units published by the source, including <strong>per tola</strong> and <strong>per 10 grams</strong>. For quick custom weight conversions, you can use our <a href="/calculator/gold-converter/" className="text-amber-700 font-semibold hover:underline">Gold Price Converter</a>.</p>
            <p>For calculations on this page:</p>
            <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-800">
              <li>1 tola = 11.664 grams</li>
            </ul>
            <p>The equivalent per-gram price is calculated from the source price per tola:</p>
            <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-800">
              <li>Per gram = Per tola ÷ 11.664</li>
            </ul>
            <p>The equivalent per-kilogram price is calculated from the per-gram value:</p>
            <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-800">
              <li>Per kilogram = Per gram × 1,000</li>
            </ul>
            <p>Source-published prices remain identifiable as source values. Calculated per-gram and per-kilogram figures are not presented as separately published market rates.</p>
            <p>This distinction is important because a source may publish a price directly per tola and per 10 grams, while the other units are mathematical equivalents calculated for comparison and convenience.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Silver Price per Tola, 10 Grams, Gram and Kilogram</h3>
            <p>Silver historical records use the same unit structure where the source provides the applicable values. You can also use our <a href="/calculator/silver-converter/" className="text-amber-700 font-semibold hover:underline">Silver Price Converter</a> for custom weight calculations.</p>
            <p>The historical table can show silver prices per tola and per 10 grams, together with calculated per-gram and per-kilogram equivalents using <strong>1 tola = 11.664 grams</strong>.</p>
            <p>For example, the verified silver record for <strong>{silverDateAd}</strong> is <strong>NPR {fmt(silverTola)} per tola</strong> and <strong>NPR {fmt(silver10g)} per 10 grams</strong>. The per-gram and per-kilogram values shown in the table are calculated equivalents and are kept separate from the source-published prices.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Weight Units Used for Gold and Silver</h3>
            <p>Gold and silver prices in Nepal are commonly expressed using both traditional Nepali/South Asian weight units and modern metric units. FENEGOSIDA publishes market rates using <strong>per tola</strong> and <strong>per 10 grams</strong>, so historical records may contain both measurements depending on the source and date.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Traditional Nepali Gold and Silver Units</h3>
            <p><strong>Tola (तोला)</strong> is the main traditional unit used for precious-metal pricing in Nepal. Historical gold and silver rates are commonly quoted per tola.</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>1 Tola = 11.664 grams</strong></li>
              <li><strong>1 Tola = 100 Lal</strong></li>
              <li><strong>1 Tola = 16 Aana</strong></li>
              <li><strong>1 Aana = 6.25 Lal</strong></li>
              <li><strong>1 Lal ≈ 0.1166 grams</strong></li>
              <li><strong>1 Aana ≈ 0.729 grams</strong></li>
            </ul>
            <p>The tola is especially important when comparing historical Nepal gold and silver prices because FENEGOSIDA publishes market rates per tola as well as per 10 grams.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Modern Metric and International Units</h3>
            <p><strong>Gram (g)</strong> is the standard metric unit used for smaller and more precise weight measurements.</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>1 gram = 1 gram</strong></li>
              <li><strong>1 gram ≈ 8.5735 Lal</strong></li>
              <li><strong>1 gram ≈ 1.3717 Aana</strong></li>
              <li><strong>10 grams = 10 grams</strong></li>
              <li><strong>10 grams ≈ 0.8574 Tola</strong></li>
            </ul>
            <p><strong>Kilogram (kg)</strong> is used for larger quantities.</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>1 kilogram = 1,000 grams</strong></li>
              <li><strong>1 kilogram ≈ 85.735 Tolas</strong></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Troy Ounce</h3>
            <p>A <strong>troy ounce</strong> is the international precious-metals unit used when comparing Nepal prices with international gold and silver markets, such as the <a href="https://www.lbma.org.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">London Bullion Market Association (LBMA)</a>.</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>1 Troy Ounce = 31.1035 grams</strong></li>
              <li><strong>1 Troy Ounce ≈ 2.6667 Tolas</strong></li>
            </ul>
            <p>The troy ounce should not be confused with the ordinary avoirdupois ounce used for general goods.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Gold and Silver Weight Conversion Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse bg-white border border-slate-200">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-3 font-bold border-r border-slate-200">Unit</th>
                    <th className="p-3 font-bold border-r border-slate-200 text-right">Grams</th>
                    <th className="p-3 font-bold border-r border-slate-200 text-right">Tola</th>
                    <th className="p-3 font-bold border-r border-slate-200 text-right">Lal</th>
                    <th className="p-3 font-bold text-right">Aana</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Tola</td>
                    <td className="p-3 text-right border-r border-slate-200">11.664 g</td>
                    <td className="p-3 text-right border-r border-slate-200">1</td>
                    <td className="p-3 text-right border-r border-slate-200">100</td>
                    <td className="p-3 text-right">16</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Aana</td>
                    <td className="p-3 text-right border-r border-slate-200">≈0.729 g</td>
                    <td className="p-3 text-right border-r border-slate-200">1/16</td>
                    <td className="p-3 text-right border-r border-slate-200">6.25</td>
                    <td className="p-3 text-right">1</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Lal</td>
                    <td className="p-3 text-right border-r border-slate-200">≈0.1166 g</td>
                    <td className="p-3 text-right border-r border-slate-200">1/100</td>
                    <td className="p-3 text-right border-r border-slate-200">1</td>
                    <td className="p-3 text-right">0.16</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">10 Grams</td>
                    <td className="p-3 text-right border-r border-slate-200">10 g</td>
                    <td className="p-3 text-right border-r border-slate-200">≈0.8574</td>
                    <td className="p-3 text-right border-r border-slate-200">≈85.735</td>
                    <td className="p-3 text-right">≈13.714</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Kilogram</td>
                    <td className="p-3 text-right border-r border-slate-200">1,000 g</td>
                    <td className="p-3 text-right border-r border-slate-200">≈85.735</td>
                    <td className="p-3 text-right border-r border-slate-200">≈8,573.5</td>
                    <td className="p-3 text-right">≈1,371.7</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Troy Ounce</td>
                    <td className="p-3 text-right border-r border-slate-200">31.1035 g</td>
                    <td className="p-3 text-right border-r border-slate-200">≈2.6667</td>
                    <td className="p-3 text-right border-r border-slate-200">≈266.67</td>
                    <td className="p-3 text-right">≈42.667</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Gold and Silver Price by Weight Unit</h3>
            <p className="mb-2">The following example uses the <strong>verified {goldDateAd} {goldSource} record</strong>.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse bg-white border border-slate-200">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-3 font-bold border-r border-slate-200">Unit</th>
                    <th className="p-3 font-bold border-r border-slate-200 text-right">Weight</th>
                    <th className="p-3 font-bold border-r border-slate-200 text-right">Gold Price*</th>
                    <th className="p-3 font-bold text-right">Silver Price*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Tola</td>
                    <td className="p-3 text-right border-r border-slate-200">11.664 g</td>
                    <td className="p-3 text-right font-bold text-amber-700 border-r border-slate-200">NPR {fmt(goldTola)}</td>
                    <td className="p-3 text-right font-bold text-slate-600">NPR {fmt(silverTola)}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Aana</td>
                    <td className="p-3 text-right border-r border-slate-200">≈0.729 g</td>
                    <td className="p-3 text-right font-bold text-amber-700 border-r border-slate-200">NPR {fmtFull(goldTola / 16)}</td>
                    <td className="p-3 text-right font-bold text-slate-600">NPR {fmtFull(silverTola / 16)}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Lal</td>
                    <td className="p-3 text-right border-r border-slate-200">≈0.1166 g</td>
                    <td className="p-3 text-right font-bold text-amber-700 border-r border-slate-200">NPR {fmtFull(goldTola / 100)}</td>
                    <td className="p-3 text-right font-bold text-slate-600">NPR {fmtFull(silverTola / 100)}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">10 Grams</td>
                    <td className="p-3 text-right border-r border-slate-200">10 g</td>
                    <td className="p-3 text-right font-bold text-amber-700 border-r border-slate-200">NPR {fmt(gold10g)}</td>
                    <td className="p-3 text-right font-bold text-slate-600">NPR {fmt(silver10g)}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Gram</td>
                    <td className="p-3 text-right border-r border-slate-200">1 g</td>
                    <td className="p-3 text-right font-bold text-amber-700 border-r border-slate-200">≈NPR {fmtFull(goldTola / 11.664)}</td>
                    <td className="p-3 text-right font-bold text-slate-600">≈NPR {fmtFull(silverTola / 11.664)}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Kilogram</td>
                    <td className="p-3 text-right border-r border-slate-200">1,000 g</td>
                    <td className="p-3 text-right font-bold text-amber-700 border-r border-slate-200">≈NPR {fmt(goldTola / 11.664 * 1000)}</td>
                    <td className="p-3 text-right font-bold text-slate-600">≈NPR {fmt(silverTola / 11.664 * 1000)}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-200">1 Troy Ounce</td>
                    <td className="p-3 text-right border-r border-slate-200">31.1035 g</td>
                    <td className="p-3 text-right font-bold text-amber-700 border-r border-slate-200">≈NPR {fmt(goldTola / 11.664 * 31.1035)}</td>
                    <td className="p-3 text-right font-bold text-slate-600">≈NPR {fmt(silverTola / 11.664 * 31.1035)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <strong>*Price example based on the verified {goldDateAd} record.</strong> The source-published values are <strong>NPR {fmt(goldTola)} per tola and NPR {fmt(gold10g)} per 10 grams for Fine Gold (9999)</strong>, and <strong>NPR {fmt(silverTola)} per tola and NPR {fmt(silver10g)} per 10 grams for Silver</strong>. Per-gram, per-Aana, per-Lal, per-kilogram and per-troy-ounce figures in this table are calculated equivalents unless directly published by the source. The source-published per-tola and per-10-gram values should remain unchanged in the historical record. Calculated equivalents must not replace or overwrite the original source values.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Per Tola and Per 10 Gram Historical Prices</h3>
            <p>Historical Nepal gold and silver records may show both <strong>per tola</strong> and <strong>per 10 gram</strong> prices. These should be treated as source-published values when they are directly reported by the source.</p>
            <p>For example, a FENEGOSIDA record can publish a gold rate per 10 grams and a corresponding rate per tola. The historical archive preserves those source values separately rather than replacing one with a calculated value.</p>
            <p>For historical records where a gram or kilogram price is not directly published, the equivalent can be calculated from the source value using:</p>
            <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-800">
              <li>Per gram = Per tola ÷ 11.664</li>
              <li>Per 10 grams = Per gram × 10</li>
              <li>Per kilogram = Per gram × 1,000</li>
            </ul>
            <p>Calculated unit equivalents are identified separately from source-published prices.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Important Note About Traditional Units</h3>
            <p>Traditional weight terminology should not be confused with gold purity or rate type.</p>
            <p><strong>Tola, Aana and Lal describe weight</strong>, while labels such as <strong>Fine Gold (9999), Tejabi Gold and Silver describe the market-rate category or source terminology</strong>.</p>
            <p>Historical records therefore preserve the source&apos;s original rate type instead of automatically treating every gold record as a particular karat or purity category.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Gold Rate Types</h2>
        <div className="space-y-6">

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Fine Gold (9999), Tejabi Gold and Historical Rate Types</h3>
            <p>Historical gold records do not always use the same label. FENEGOSIDA records can identify gold using terminology such as <strong>Fine Gold (9999)</strong> and <strong>Tejabi Gold</strong>.</p>
            <p>The historical archive preserves these source labels rather than assuming that every gold record represents the same purity, product, or market category.</p>
            <p>For this reason, a historical record labelled <strong>Fine Gold (9999)</strong> is displayed using that terminology. It is not automatically relabelled as &quot;24K Hallmark&quot; unless the source itself supports that classification.</p>
            <p>Likewise, <strong>Tejabi Gold</strong> is retained as Tejabi Gold rather than being automatically converted into a 22K or another purity category.</p>
            <p>This preserves the meaning of the original historical source and avoids creating a purity classification that is not supported by the record.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Historical Price Trends</h2>
        <div className="space-y-6">

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Historical Gold and Silver Price Trends</h3>
            <p>Historical tables and charts can be used to compare how gold and silver rates changed across the available dates and periods. For an in-depth review of recent market movements, see our <a href="/blog/nepal-gold-price-analysis-2083/" className="text-amber-700 font-semibold hover:underline">Nepal Gold Price Analysis 2083</a>.</p>
            <p>The available verified records show substantial changes in Nepal&apos;s gold and silver rates during the covered periods. For example, verified FENEGOSIDA records in {monthYearStr} show Fine Gold (9999) moving through rates reflecting market dynamics, while silver records during the same period range proportionally.</p>
            <p>The historical data should be interpreted according to the dates and records actually available. A chart of available records does not represent an uninterrupted daily series when source records are missing.</p>
            <p>Historical highs, lows, averages, and changes should therefore be calculated from the defined dataset and stated with the applicable date range and coverage. A value should not be described as an <strong>all-time highest</strong> or <strong>all-time lowest</strong> rate unless the underlying historical coverage supports that claim.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Highest and Lowest Historical Rates</h3>
            <p>Highest and lowest values are meaningful only when the dataset used for the calculation is clearly defined.</p>
            <p>For a complete historical series, a highest or lowest rate could represent the historical extreme across the entire period. For an incomplete archive, the more precise description is <strong>highest verified rate in the available historical dataset</strong> or <strong>lowest verified rate in the available historical dataset</strong>.</p>
            <p>The same rule applies to gold and silver and to different rate types or units.</p>
            <p>A missing historical period must not be treated as evidence that a known value was the historical minimum or maximum. Where older source records remain unavailable or unverified, the coverage limitation is retained alongside the data.</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">What was the gold price in Nepal on a specific date?</h3>
            <p>Use the historical date selector or table to find the available gold record for that date. The result identifies the AD date, BS date, gold rate type, source-published price per tola and per 10 grams, source, and verification status when a qualifying record is available.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">What was the silver price in Nepal on a specific date?</h3>
            <p>Select Silver and the required date in the historical archive. When a verified record is available, the historical table shows the silver rate per tola and per 10 grams together with the source and verification status.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Where can I find gold price history in Nepal?</h3>
            <p>Gold historical rates are available through the date- and year-based historical archive, where available source records can be examined by date, rate type, unit, source, and verification status.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Where can I find silver price history in Nepal?</h3>
            <p>Silver historical rates are available in the same archive, with silver records separated from gold records and shown by date, source-published unit, calculated equivalents, source, and verification status.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Is gold price history shown per tola or per 10 grams?</h3>
            <p>Both source-published units can be shown where the historical source provides them: <strong>per tola</strong> and <strong>per 10 grams</strong>. The archive also calculates equivalent per-gram and per-kilogram values.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">What is 1 tola in grams?</h3>
            <p>For the historical calculations on this page, <strong>1 tola = 11.664 grams</strong>.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">How many Lal are in 1 Tola?</h3>
            <p>For the unit conversion used on this page, <strong>1 Tola = 100 Lal</strong>.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">How many Aana are in 1 Tola?</h3>
            <p><strong>1 Tola = 16 Aana.</strong></p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">How many Lal are in 1 Aana?</h3>
            <p><strong>1 Aana = 6.25 Lal.</strong></p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Does the historical table show Fine Gold (9999)?</h3>
            <p>Yes. Where the underlying source uses <strong>Fine Gold (9999)</strong>, the historical record preserves that terminology rather than automatically assigning another purity or product label.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Is Fine Gold (9999) the same as every 24K or Hallmark gold record?</h3>
            <p>The historical archive does not automatically make that classification. Source terminology is preserved so that Fine Gold (9999), Tejabi Gold, Hallmark, or other labels are not treated as interchangeable without supporting source evidence.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Does the historical archive estimate missing prices?</h3>
            <p>No. Missing historical dates are not filled using estimates, interpolation, previous-day prices, carried-forward values, or artificial averages.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Why are some historical dates missing?</h3>
            <p>Some historical source records have not yet been recovered or independently verified. The archive displays qualifying records rather than creating values for dates where the required source evidence is unavailable.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Can historical gold and silver prices be downloaded?</h3>
            <p>Where the historical dataset is provided through downloadable JSON or CSV files, those files contain the underlying historical records in machine-readable form for further analysis.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Are the per-gram and per-kilogram prices published by FENEGOSIDA?</h3>
            <p>Not necessarily. The historical archive distinguishes source-published prices from calculated equivalents. Per-gram and per-kilogram values are calculated using <strong>1 tola = 11.664 grams</strong> when they are not directly published by the source.</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">What source is used for verified historical gold and silver prices?</h3>
            <p>FENEGOSIDA is the primary source for the verified historical records in the current dataset. Secondary historical sources may be used separately for corroboration or additional records, with their verification status identified rather than being presented as primary verified data.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
