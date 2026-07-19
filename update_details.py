import re

with open('src/app/calculator/gold-converter/Calculator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_details = '''      details={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">

            {/* Understanding Nepal Gold Measurements */}
            <div id="understanding-measurements" className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
                <h2 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Understanding Nepal Gold Measurements</h2>
              </div>
              <div className="text-[12px] text-slate-500 leading-relaxed">
                Understanding the structural purity and weight measurements of precious metals is crucial for both buyers and sellers in the domestic market. Before evaluating jewelry pieces, it is important to factor in extra costs that may arise during transactions.
              </div>
            </div>

            {/* Nepal Gold Conversion Table */}
            <div id="conversion-table" className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
                <h2 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Nepal Gold Conversion Table</h2>
              </div>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-[12px] border-collapse border border-[#DADCE0]">
                  <thead className="bg-[#F8F9FA]">
                    <tr>
                      <th className="border border-[#DADCE0] p-2 text-slate-700 font-bold">Traditional Unit</th>
                      <th className="border border-[#DADCE0] p-2 text-slate-700 font-bold">Lal</th>
                      <th className="border border-[#DADCE0] p-2 text-slate-700 font-bold">Grams (g)</th>
                      <th className="border border-[#DADCE0] p-2 text-slate-700 font-bold">Tola Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-[#DADCE0] p-2">1 Lal</td><td className="border border-[#DADCE0] p-2">1 Lal</td><td className="border border-[#DADCE0] p-2">0.1166 g</td><td className="border border-[#DADCE0] p-2">0.01 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2">2 Lal</td><td className="border border-[#DADCE0] p-2">2 Lal</td><td className="border border-[#DADCE0] p-2">0.2333 g</td><td className="border border-[#DADCE0] p-2">0.02 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2">3 Lal</td><td className="border border-[#DADCE0] p-2">3 Lal</td><td className="border border-[#DADCE0] p-2">0.3499 g</td><td className="border border-[#DADCE0] p-2">0.03 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2">6.25 Lal (1 Aana)</td><td className="border border-[#DADCE0] p-2">6.25 Lal</td><td className="border border-[#DADCE0] p-2">0.7290 g</td><td className="border border-[#DADCE0] p-2">0.0625 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2">12.5 Lal (2 Aana)</td><td className="border border-[#DADCE0] p-2">12.5 Lal</td><td className="border border-[#DADCE0] p-2">1.4580 g</td><td className="border border-[#DADCE0] p-2">0.125 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2">15 Lal</td><td className="border border-[#DADCE0] p-2">15 Lal</td><td className="border border-[#DADCE0] p-2">1.7496 g</td><td className="border border-[#DADCE0] p-2">0.15 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2">40 Lal</td><td className="border border-[#DADCE0] p-2">40 Lal</td><td className="border border-[#DADCE0] p-2">4.6655 g</td><td className="border border-[#DADCE0] p-2">0.40 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2">50 Lal (8 Aana)</td><td className="border border-[#DADCE0] p-2">50 Lal</td><td className="border border-[#DADCE0] p-2">5.8319 g</td><td className="border border-[#DADCE0] p-2">0.50 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2">75 Lal (12 Aana)</td><td className="border border-[#DADCE0] p-2">75 Lal</td><td className="border border-[#DADCE0] p-2">8.7479 g</td><td className="border border-[#DADCE0] p-2">0.75 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2">90 Lal</td><td className="border border-[#DADCE0] p-2">90 Lal</td><td className="border border-[#DADCE0] p-2">10.4974 g</td><td className="border border-[#DADCE0] p-2">0.90 Tola</td></tr>
                    <tr><td className="border border-[#DADCE0] p-2 font-bold">100 Lal (1 Tola)</td><td className="border border-[#DADCE0] p-2">100 Lal</td><td className="border border-[#DADCE0] p-2">11.6638 g</td><td className="border border-[#DADCE0] p-2">1.00 Tola</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Official Nepal Gold Measurement Standard */}
            <div id="official-standard" className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
                <h2 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Official Nepal Gold Measurement Standard</h2>
              </div>
              <div className="text-[12px] text-slate-600 leading-relaxed space-y-4">
                <p>
                  Gold prices in Nepal change daily based on international bullion markets, USD exchange rates, and domestic demand. The Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) publishes the official benchmark rates used by jewellery businesses across Nepal. This converter uses the official Nepal gold measurement system and is designed to work alongside the latest published market prices.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <a href="https://www.fenegosida.org/" target="_blank" rel="nofollow noopener" className="flex items-center gap-2 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg hover:bg-slate-50 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-[9px] font-black text-[#202124] uppercase tracking-wider">FENEGOSIDA</div>
                  </div>
                </a>
                <a href="http://www.nbsm.gov.np/" target="_blank" rel="nofollow noopener" className="flex items-center gap-2 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg hover:bg-slate-50 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-[9px] font-black text-[#202124] uppercase tracking-wider">NBSM</div>
                  </div>
                </a>
                <a href="/market-rates/live-gold-price/" className="flex items-center gap-2 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg hover:bg-slate-50 transition-colors">
                  <History className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-[9px] font-black text-[#202124] uppercase tracking-wider">Gold Price</div>
                  </div>
                </a>
                <a href="/market-rates/live-silver-price/" className="flex items-center gap-2 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg hover:bg-slate-50 transition-colors">
                  <History className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-[9px] font-black text-[#202124] uppercase tracking-wider">Silver Price</div>
                  </div>
                </a>
              </div>
            </div>

            {/* SEO Content Section */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <div className="space-y-6 text-[#3C4043] text-[13px] leading-relaxed">
                <div>
                  <h2 className="text-base font-bold text-[#202124] mb-3">Professional Computational Guidance: Nepal Gold Weight Converter (Tola, Gram, Aana, Lal)</h2>
                  <p className="mb-4">
                    Navigating traditional jewelry measurements in Nepal can be confusing, especially when balancing historical local scales with modern metric weights. Whether you are auditing family heirlooms, calculating custom jewelry fabrication costs, or verifying weights against official benchmarks, accuracy is paramount.
                  </p>
                  <p>
                    Our automated gold calculator Nepal simplifies the process. This dynamic system converts instantly between international Grams (g) and traditional domestic units: Tola, Aana, Ratti, and Lal.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#202124] mb-3">📐 Understanding the Nepal Gold Measurement System (1 Tola = 100 Lal)</h2>
                  <p className="mb-4">
                    In the Nepali gold market, the Tola (तोला) is the foundational baseline unit of mass. However, for smaller pieces of jewelry like rings, nose pins (Phuli), and earrings, jewelers break weights down into Aana and Lal (लाल).
                  </p>
                  <p className="mb-4">The structural mathematical relationship governing the official Nepal gold unit scale follows these exact ratios:</p>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>1 Tola = 100 Lal</li>
                    <li>1 Tola = 16 Aana</li>
                    <li>1 Tola = 11.6638 Grams</li>
                    <li>1 Aana = 6.25 Lal</li>
                    <li>1 Lal = 0.116638 Grams (commonly rounded to 0.1166g)</li>
                  </ul>
                  <p>If a jeweler tells you an asset weighs 12 Aanas, that equates exactly to 75 Lal, which represents precisely 0.75 Tola of pure gold.</p>
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#202124] mb-3">🧮 Mathematical Conversion Constants & Formulas</h2>
                  <h3 className="font-bold text-[#202124] mb-2">How to Convert Lal to Gram</h3>
                  <p className="mb-2">Because 1 Tola equals 100 Lal and weighs exactly 11.6638 grams, a single Lal is exceptionally light.</p>
                  <div className="bg-[#F8F9FA] p-3 rounded mb-4 font-mono text-sm border border-[#DADCE0]">Weight in Grams = Total Lal × 0.116638</div>
                  <p className="mb-4"><strong>Example:</strong> If you want to find out how many grams are in 15 Lal: 15 × 0.116638 = 1.7495 grams.</p>

                  <h3 className="font-bold text-[#202124] mb-2">How to Convert Gram to Lal</h3>
                  <p className="mb-2">If you have a digital kitchen scale or a laboratory balance measuring an item in grams, translate it back to traditional units using this division formula:</p>
                  <div className="bg-[#F8F9FA] p-3 rounded mb-4 font-mono text-sm border border-[#DADCE0]">Weight in Lal = Weight in Grams ÷ 0.116638</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      }'''

start_marker = "      details={"
end_marker = "      }"
start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx + len(start_marker)) + len(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_details + content[end_idx:]
    with open('src/app/calculator/gold-converter/Calculator.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Updated details section successfully!')
else:
    print('Markers not found!')
