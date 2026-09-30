import React from 'react';

export default function HistoryContent() {
  return (
    <div className="mt-12 pt-8 border-t border-slate-200 max-w-4xl space-y-10 text-sm text-slate-700 font-medium leading-relaxed">
      
      <section className="space-y-4">
        <p>
          Historical gold and silver prices in Nepal by date and year, with source-published rates per tola and per 10 grams, AD and BS dates, rate type, calculated unit equivalents, source information, and verification status.
        </p>
        <p>
          The historical archive is organized around the actual rates available from source records. Each historical entry identifies the metal, date, rate type, published price, source, and verification status. Gold and silver records are kept separately so that a historical price can be identified precisely rather than inferred from another date or another rate type.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">Understanding the Historical Records</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Gold Price History</h3>
        <p>Gold price history in Nepal can be viewed by date and year using the available historical records. For today&apos;s current rates, please visit the <a href="/market-rates/live-gold-price/" className="text-amber-700 font-semibold hover:underline">Live Gold Price in Nepal</a> page. The historical table preserves source-published gold prices per tola and per 10 grams and separately provides calculated per-gram and per-kilogram equivalents.</p>
        <p>Gold records retain the terminology used by the underlying source. Where the source identifies a record as <strong>Fine Gold (9999)</strong>, that terminology is displayed as Fine Gold (9999). Other source terminology, including <strong>Tejabi Gold</strong>, is not automatically converted into another purity or product category.</p>
        <p>For example, the verified record for <strong>25 September 2026</strong> identifies Fine Gold (9999) at <strong>NPR 298,600 per tola</strong> and <strong>NPR 256,000 per 10 grams</strong>, with the corresponding BS date <strong>2083/06/09</strong> and FENEGOSIDA as the source.</p>
        <p>Historical gold prices are not assumed to be continuous across every calendar date. When a corresponding historical source record has not been recovered or independently verified, a price is not created from an estimate, interpolation, previous-day value, or other calculated assumption.</p>
      </section>

      <section className="space-y-4">
        </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Silver Price History</h3>
        <p>Silver price history in Nepal can also be viewed by date and year. For the latest daily silver rates, check the <a href="/market-rates/silver-price-nepal/" className="text-amber-700 font-semibold hover:underline">Today&apos;s Silver Price in Nepal</a> page. The historical table preserves the available source-published silver rates per tola and per 10 grams and provides calculated per-gram and per-kilogram equivalents separately.</p>
        <p>The source terminology is retained for silver records. For example, the verified FENEGOSIDA record for <strong>25 September 2026</strong> shows <strong>Silver at NPR 4,620 per tola and NPR 3,961 per 10 grams</strong>, with BS date <strong>2083/06/09</strong>.</p>
        <p>Gold and silver are recorded independently because their historical rates, source records, and available dates can differ. A missing silver record is therefore not filled from a gold record, and a missing gold record is not inferred from silver.</p>
      </section>

      <section className="space-y-4">
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
      </section>

      <section className="space-y-4">
        </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Historical Prices by Year</h3>
        <p>Historical gold and silver rates can be examined by year to identify the dates for which source records are available. Year-based views are useful for comparing historical rates without treating the available records as a continuous daily series when gaps remain.</p>
        <p>The archive can be used to examine available records for years such as <strong>2024, 2025, and 2026</strong>, while earlier historical periods can be added only when the underlying records have been recovered and verified according to the applicable source and verification rules.</p>
        <p>A year with incomplete historical records should not be interpreted as a complete daily history. The distinction between <strong>available records</strong>, <strong>verified records</strong>, and <strong>continuous coverage</strong> is important when comparing historical gold or silver prices.</p>
      </section>

      <section className="space-y-4">
        </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">Gold & Silver Prices by Weight</h2>
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
      </section>

      <section className="space-y-4">
        </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Silver Price per Tola, 10 Grams, Gram and Kilogram</h3>
        <p>Silver historical records use the same unit structure where the source provides the applicable values. You can also use our <a href="/calculator/silver-converter/" className="text-amber-700 font-semibold hover:underline">Silver Price Converter</a> for custom weight calculations.</p>
        <p>The historical table can show silver prices per tola and per 10 grams, together with calculated per-gram and per-kilogram equivalents using <strong>1 tola = 11.664 grams</strong>.</p>
        <p>For example, the verified silver record for <strong>25 September 2026</strong> is <strong>NPR 4,620 per tola</strong> and <strong>NPR 3,961 per 10 grams</strong>. The per-gram and per-kilogram values shown in the table are calculated equivalents and are kept separate from the source-published prices.</p>
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
      </section>

      <section className="space-y-4">
        </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">Historical Price Trends</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Historical Gold and Silver Price Trends</h3>
        <p>Historical tables and charts can be used to compare how gold and silver rates changed across the available dates and periods. For an in-depth review of recent market movements, see our <a href="/blog/nepal-gold-price-analysis-2083/" className="text-amber-700 font-semibold hover:underline">Nepal Gold Price Analysis 2083</a>.</p>
        <p>The available verified records show substantial changes in Nepal&apos;s gold and silver rates during the covered periods. For example, verified FENEGOSIDA records in September 2026 show Fine Gold (9999) moving through rates above NPR 3,00,000 per tola on several dates, while silver records during the same period range through several thousand rupees per tola.</p>
        <p>The historical data should be interpreted according to the dates and records actually available. A chart of available records does not represent an uninterrupted daily series when source records are missing.</p>
        <p>Historical highs, lows, averages, and changes should therefore be calculated from the defined dataset and stated with the applicable date range and coverage. A value should not be described as an <strong>all-time highest</strong> or <strong>all-time lowest</strong> rate unless the underlying historical coverage supports that claim.</p>
      </section>

      <section className="space-y-4">
        </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Highest and Lowest Historical Rates</h3>
        <p>Highest and lowest values are meaningful only when the dataset used for the calculation is clearly defined.</p>
        <p>For a complete historical series, a highest or lowest rate could represent the historical extreme across the entire period. For an incomplete archive, the more precise description is <strong>highest verified rate in the available historical dataset</strong> or <strong>lowest verified rate in the available historical dataset</strong>.</p>
        <p>The same rule applies to gold and silver and to different rate types or units.</p>
        <p>A missing historical period must not be treated as evidence that a known value was the historical minimum or maximum. Where older source records remain unavailable or unverified, the coverage limitation is retained alongside the data.</p>
      </section>

      <section className="space-y-4">
        </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">Sources & Verification</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Historical Data Sources</h3>
        <p><a href="https://www.fenegosida.org/" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">FENEGOSIDA (Federation of Nepal Gold and Silver Dealers Association)</a> is used as the primary source for the verified historical records in the current dataset.</p>
        <p>FENEGOSIDA&apos;s published records use fields such as <strong>Fine Gold (9999)</strong>, <strong>Tejabi Gold</strong>, and <strong>Silver</strong>, with prices provided per 10 grams and per tola. Historical source records can also contain AD and BS dates.</p>
        <p>Official FENEGOSIDA weekly reports are important for historical periods that are not covered by the current historical API. The historical research also identified limitations in the availability of older records through the API, making source-document recovery and verification necessary for earlier periods.</p>
        <p>Secondary historical sources can provide additional records or help identify gaps, but a secondary record is not automatically treated as a verified primary-source record.</p>
        <p>Where another source overlaps with a verified primary-source record, the values can be compared for corroboration. Where the sources disagree, the discrepancy is retained for review rather than silently merging the records.</p>
      </section>

      <section className="space-y-4">
        </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">Historical Data Verification</h3>
        <p>Each historical record can carry a verification status that identifies how the value was established.</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li><strong>Verified</strong> means the record is supported by the designated primary source and has passed the applicable verification checks.</li>
          <li><strong>Corroborated</strong> means a secondary source agrees with an independently verified primary-source record.</li>
          <li><strong>Secondary-only</strong> means a historical value is available from a secondary source but has not been independently verified against the required primary source.</li>
          <li><strong>Conflict</strong> means available sources provide different values for the same historical record and the discrepancy has not been resolved.</li>
        </ul>
        <p>This distinction prevents a large secondary archive from being presented as though every value had the same level of source verification.</p>
      </section>

      </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Missing Historical Data</h2>
        <p>Historical gold and silver prices are not available for every calendar date in the current verified archive.</p>
        <p>Some historical periods have source records that have not yet been recovered or independently verified. The absence of a record does not mean that no market rate existed on that date; it means that a qualifying historical source record is not currently available in the verified dataset.</p>
        <p>Missing dates are not filled using:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Estimated prices</li>
          <li>Interpolated prices</li>
          <li>Previous-day prices</li>
          <li>Carried-forward prices</li>
          <li>Artificial averages</li>
          <li>Calculated values presented as source prices</li>
        </ul>
        <p>This approach keeps the historical archive traceable to actual source records.</p>
        <p>As additional primary-source records are recovered and verified, historical coverage can be expanded without changing the meaning of existing verified records.</p>
      </section>

      

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Dataset Overview</h2>
        <p>The historical dataset is organized around the information needed to identify a historical market rate precisely:</p>
        <p className="font-semibold text-slate-800">date, BS date, metal, rate type, source value, unit, source, and verification status.</p>
        <p>The current verified baseline contains <strong>72 gold records and 72 silver records across 72 verified dates</strong>. These verified records cover selected historical periods rather than every calendar day continuously.</p>
        <p>The verified historical coverage includes records from <strong>June 2024, March 2025, June 2026, and July–September 2026</strong>, with additional historical periods still requiring primary-source recovery and verification.</p>
        <p>The historical archive therefore distinguishes between the existence of a historical date and the availability of a verified source record.</p>
      </section>

      {/* ── WEIGHT UNITS ── */}
      

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

      {/* ── RELATED TOOLS ── */}
      <section className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Related Tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href="/market-rates/" className="text-slate-700 font-semibold hover:underline">All Market Rates</a>
        </div>
      </section>

    </div>
  );
}
