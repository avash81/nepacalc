import re

with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

with open("todays_silver_block_clean.txt", "r", encoding="utf-8") as f:
    extracted = f.read()

# 1. H2 -> H3
page = page.replace('<h2 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h2>', '<h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h3>')


# 3. Replace Calculator
calc_regex = r'<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">\s*<div className="bg-slate-50 px-6 py-4 border-b border-slate-200">.*?<SilverCalculatorClient silverPerTola=\{currentSilver\} />\s*</div>\s*</div>'
calc_match = re.search(calc_regex, page, re.DOTALL)

anchor_calc = '''<h2 id="silver-calculator" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24 mt-8">Quick Silver Valuation Calculator</h2>
                <div className="mb-12">
                  <a
                    href="/calculator/silver-converter/"
                    className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
                  >
                    <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[15px] font-black text-slate-900 group-hover:text-blue-700 transition-colors">Quick Valuation Calculator</div>
                      <div className="text-[12px] text-slate-500 font-medium mt-0.5">Official silver valuation based on daily FENEGOSIDA benchmark rates.</div>
                    </div>
                    <div className="ml-auto text-slate-400 group-hover:text-blue-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                </div>'''

if calc_match:
    page = page.replace(calc_match.group(0), anchor_calc)

# 4. Insert extracted text
injection = '<div className="prose prose-slate max-w-none mt-6 mb-8">\n' + extracted + '\n</div>\n\n'
page = page.replace(anchor_calc, injection + anchor_calc)

# 5. Insert PPW and HistoricalData
grid_marker = '<div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">'
ppw_block = '<PricePerformanceWidget\n                asset="Silver"\n                source="FENEGOSIDA · NPR per Tola"\n                rows={[\n                  { period: \'Today\',    amount: \'—\',      percent: \'—\',         isNegative: false },\n                  { period: \'30 Days\',  amount: \'+380\',   percent: \'+8.27%\',    isNegative: false },\n                  { period: \'6 Months\', amount: \'-290\',   percent: \'-5.82%\',    isNegative: true  },\n                  { period: \'1 Year\',   amount: \'+1,250\', percent: \'+36.23%\',   isNegative: false },\n                  { period: \'5 Year\',   amount: \'+2,900\', percent: \'+160.00%\',  isNegative: false },\n                  { period: \'20 Year\',  amount: \'+4,500\', percent: \'+2250.00%\', isNegative: false },\n                ]}\n              />'

if grid_marker in page:
    post_calc = ppw_block + '\n              <div className="mb-12">\n                <SilverHistoricalData />\n              </div>\n\n              '
    page = page.replace(grid_marker, post_calc + grid_marker)

# Ensure imports
if "import SilverHistoricalData" not in page:
    page = page.replace("import SilverChartClient from './SilverChartClient';", "import SilverChartClient from './SilverChartClient';\nimport SilverHistoricalData from './SilverHistoricalData';")
if "import PricePerformanceWidget" not in page:
    page = page.replace("import SilverChartClient from './SilverChartClient';", "import SilverChartClient from './SilverChartClient';\nimport PricePerformanceWidget from '@/components/widgets/PricePerformanceWidget';")
page = page.replace("import SilverCalculatorClient from './SilverCalculatorClient';\n", "")

with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)

print("PAGE processed!")

