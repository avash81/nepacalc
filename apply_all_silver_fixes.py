import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()
with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

# 1. PAGE.TSX
# Make Today's Rate Summary an H3
page = page.replace('<h2 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h2>', '<h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h3>')

# Add Today's Silver Price H2
if '<div id="quick-answer"' in page:
    page = page.replace('<div id="quick-answer"', '<h2 id="todays-silver-price" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24">Today\'s Silver Price</h2>\n                  <div id="quick-answer"')

# Replace calculator with anchor link
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

# 2. Extract blocks from SEO to move to Page
# Market Snapshot to Key Highlights
snapshot_start = seo.find('{/* Market Snapshot */}')
hist_start = seo.find('<SilverHistoricalData />')
if snapshot_start != -1 and hist_start != -1:
    extracted_blocks = seo[snapshot_start:hist_start]
    seo = seo.replace(extracted_blocks, '')
    # Inject into page right before the anchor calculator
    injection = '<div className="prose prose-slate max-w-none mt-6 mb-8">\n' + extracted_blocks + '\n</div>\n\n'
    page = page.replace(anchor_calc, injection + anchor_calc)

# Move PPW and HistoricalData to page
grid_marker = '<div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">'
ppw_block = '<PricePerformanceWidget\n        asset="Silver"\n        source="FENEGOSIDA · NPR per Tola"\n        rows={[\n          { period: \'Today\',    amount: \'—\',      percent: \'—\',         isNegative: false },\n          { period: \'30 Days\',  amount: \'+380\',   percent: \'+8.27%\',    isNegative: false },\n          { period: \'6 Months\', amount: \'-290\',   percent: \'-5.82%\',    isNegative: true  },\n          { period: \'1 Year\',   amount: \'+1,250\', percent: \'+36.23%\',   isNegative: false },\n          { period: \'5 Year\',   amount: \'+2,900\', percent: \'+160.00%\',  isNegative: false },\n          { period: \'20 Year\',  amount: \'+4,500\', percent: \'+2250.00%\', isNegative: false },\n        ]}\n      />'
if grid_marker in page:
    post_calc = ppw_block + '\n              <div className="mb-12">\n                <SilverHistoricalData />\n              </div>\n\n              '
    page = page.replace(grid_marker, post_calc + grid_marker)

with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)

# 3. Fix SEO Component
# Remove duplicate H1 and Intro text
h1_block_regex = r'<header className="mb-6 pb-4 border-b border-slate-200">\s*<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2 capitalize">\s*Live Silver Price Today Nepal \(2083/84\)\s*</h1>\s*(<p className="text-slate-600 text-base font-medium leading-relaxed max-w-3xl">.*?</p>)\s*</header>'
seo = re.sub(h1_block_regex, r'\1', seo, flags=re.DOTALL)
intro_regex = r'\{/\* Intro Text below Calculator \*/\}\s*<div className="mb-8 text-slate-700 text-base leading-relaxed font-medium">.*?</div>'
seo = re.sub(intro_regex, '', seo, flags=re.DOTALL)

# Remove Today\'s Silver Price H2 and paragraphs
todays_h2_regex = r'\{/\* 1\. Today\'s Silver Price \*/\}\s*<h2 id="todays-silver-price" className="text-2xl font-black text-slate-900 tracking-tighter mb-6 scroll-mt-20">\s*Today&apos;s Silver Price\s*</h2>\s*<p.*?</p>\s*<p.*?</p>\s*<p.*?</p>\s*<p.*?</p>'
seo = re.sub(todays_h2_regex, '', seo, flags=re.DOTALL)

# Remove Historical Trends block
hist_trend_regex = r'(\{/\* 11\. Historical Trends \*/\}\s*<h2 id="historical-silver-price-trends".*?)(?=\{/\* 12\. Buying Silver \*/\})'
hist_trend_match = re.search(hist_trend_regex, seo, re.DOTALL)
if hist_trend_match:
    hist_trend_block = hist_trend_match.group(1)
    seo = seo.replace(hist_trend_block, '')
    
    # We will write this directly to SilverHistoricalData.tsx
    with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "r", encoding="utf-8") as f:
        hist_data = f.read()
    h2_marker = '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Silver Price History in Nepal\n          </h2>'
    h3_block = hist_trend_block.replace('<h2 id="historical-silver-price-trends" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">\n            Historical Silver Price Trends\n          </h2>', '<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Historical Records (Fine Silver)</h3>')
    
    hist_data = hist_data.replace(h2_marker, h2_marker + '\n\n          <div className="prose prose-slate max-w-none mb-8">\n' + h3_block + '\n          </div>')
    with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "w", encoding="utf-8") as f:
        f.write(hist_data)

# Reorder Why Prices Change block
why_behave_start = seo.find('<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">\n            Why Silver Prices Behave Differently Than Gold\n          </h3>')
orphan_ul_start = seo.find('<ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">\n            <li>International silver spot prices (XAG/USD)')
end_orphan_ul = seo.find('one trading day to the next.\n          </p>') + len('one trading day to the next.\n          </p>')

int_start = seo.find('{/* 16. International Market */}')
ex_start = seo.find('{/* 17. Exchange Rate */}')
daily_start = seo.find('{/* 18. Daily Volatility */}')
why_matter = seo.find('{/* 19. Why Silver Prices Matter */}')

# Extract them all
if why_behave_start != -1 and orphan_ul_start != -1:
    why_behave_block = seo[why_behave_start:orphan_ul_start]
    ul_block = seo[orphan_ul_start:end_orphan_ul]
    seo = seo.replace(why_behave_block, '')
    seo = seo.replace(ul_block, '')

if int_start != -1 and ex_start != -1 and daily_start != -1 and why_matter != -1:
    int_block = seo[int_start:ex_start]
    ex_block = seo[ex_start:daily_start]
    daily_block = seo[daily_start:why_matter]
    seo = seo.replace(int_block, '')
    seo = seo.replace(ex_block, '')
    seo = seo.replace(daily_block, '')
    
    # Demote them
    int_block = int_block.replace('<h2', '<h3').replace('</h2', '</h3').replace('text-2xl font-black', 'text-xl font-bold').replace(' mb-4', ' mb-4 tracking-tight')
    ex_block = ex_block.replace('<h2', '<h3').replace('</h2', '</h3').replace('text-2xl font-black', 'text-xl font-bold').replace(' mb-4', ' mb-4 tracking-tight')
    daily_block = daily_block.replace('<h2', '<h3').replace('</h2', '</h3').replace('text-2xl font-black', 'text-xl font-bold').replace(' mb-4', ' mb-4 tracking-tight')
    
    new_h2 = '<h2 id="why-prices-change" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">\n            Why Silver Prices Change in Nepal\n          </h2>\n          '
    
    combined_why_block = new_h2 + why_behave_block + ul_block + '\n\n          ' + daily_block + ex_block + int_block
    
    # Insert after purity standards
    purity_end = seo.find('{/* 6. Common Uses */}')
    if purity_end != -1:
        before = seo[:purity_end]
        after = seo[purity_end:]
        seo = before + combined_why_block + '\n          ' + after

# Remove SilverHistoricalData import and component from SEO
seo = seo.replace("import SilverHistoricalData from './SilverHistoricalData';\n", '')
seo = seo.replace("<SilverHistoricalData />\n", '')

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
    f.write(seo)
    
print("All done!")
