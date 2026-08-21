import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "r", encoding="utf-8") as f:
    hist = f.read()

# 1. SilverSeoSection.tsx modifications

# Remove the second H1 block
seo = re.sub(r'<header className="mb-6 pb-4 border-b border-slate-200">\s*<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2 capitalize">\s*Live Silver Price Today Nepal \(2083/84\)\s*</h1>\s*(<p className="text-slate-600 text-base font-medium leading-relaxed max-w-3xl">.*?</p>)\s*</header>', r'\1', seo, flags=re.DOTALL)

# Extract Today's Silver Price block (excluding the H2 itself, we will manually add the H2 in page.tsx)
# The block starts right after the intro text. We want everything from the first <p> after Today's Silver Price down to just before <SilverHistoricalData />
extract_match = re.search(r'<h2 id="todays-silver-price".*?</h2>\s*(<p.*?)<SilverHistoricalData />', seo, re.DOTALL)
if extract_match:
    todays_silver_content = extract_match.group(1)
    seo = seo.replace(extract_match.group(0), '')
else:
    print("Could not extract Today's Silver Price content")
    todays_silver_content = ""

# Also extract the <SilverHistoricalData /> and the <PricePerformanceWidget /> ?
# Wait, PricePerformanceWidget is imported but is it rendered in SilverSeoSection.tsx?
# Let's check!
if '<PricePerformanceWidget' in seo:
    ppw_match = re.search(r'(<PricePerformanceWidget.*?\/>)', seo, re.DOTALL)
    if ppw_match:
        ppw_block = ppw_match.group(1)
        seo = seo.replace(ppw_block, '')
    else:
        ppw_block = ""
else:
    ppw_block = ""

# Wait, if SilverHistoricalData was right after Key Highlights, then we already replaced it with '' above.
# We will just inject the raw components in page.tsx.

# Fix "Why Silver Prices Change in Nepal"
# Currently there is an orphan <ul> right after where SilverHistoricalData was.
# Let's just prepend the H2 to that <ul>.
orphan_ul = '<ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">\n            <li>International silver spot prices'
new_h2 = '<h2 id="why-prices-change" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">\n            Why Silver Prices Change in Nepal\n          </h2>\n          '
if orphan_ul in seo:
    seo = seo.replace(orphan_ul, new_h2 + orphan_ul)

# Now reorder the H3s
seo = seo.replace('<h2 id="international-silver-market" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="international-silver-market" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
seo = seo.replace('<h2 id="silver-vs-exchange-rate" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="silver-vs-exchange-rate" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
seo = seo.replace('<h2 id="daily-price-volatility" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="daily-price-volatility" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
seo = seo.replace('International Silver Market\n          </h2>', 'International Silver Market\n          </h3>')
seo = seo.replace('Silver Price vs Exchange Rate\n          </h2>', 'Silver Price vs Exchange Rate\n          </h3>')
seo = seo.replace('Daily Price Volatility\n          </h2>', 'Daily Price Volatility\n          </h3>')

idx_int = seo.find('{/* 16. International Market */}')
idx_ex = seo.find('{/* 17. Exchange Rate */}')
idx_daily = seo.find('{/* 18. Daily Volatility */}')
idx_next = seo.find('{/* 19. Why Silver Prices Matter */}')

if idx_int != -1 and idx_ex != -1 and idx_daily != -1 and idx_next != -1:
    int_block = seo[idx_int:idx_ex]
    ex_block = seo[idx_ex:idx_daily]
    daily_block = seo[idx_daily:idx_next]
    
    # We want to move these up to right after "Why Silver Prices Behave Differently Than Gold" block ends
    before = seo[:idx_int]
    after = seo[idx_next:]
    
    behave_end = "larger percentage price movements than gold over shorter periods.\n          </p>"
    if behave_end in before:
        before = before.replace(behave_end, behave_end + "\n\n          " + daily_block + ex_block + int_block)
        seo = before + after
    else:
        seo = before + daily_block + ex_block + int_block + after

# Move Historical Silver Price Trends
hist_trend_regex = r'(\{/\* 11\. Historical Trends \*/\}\s*<h2 id="historical-silver-price-trends".*?)(?=\{/\* 12\. Buying Silver \*/\})'
hist_trend_match = re.search(hist_trend_regex, seo, re.DOTALL)
if hist_trend_match:
    hist_trend_block = hist_trend_match.group(1)
    seo = seo.replace(hist_trend_block, '')
    hist_trend_block = hist_trend_block.replace('<h2 id="historical-silver-price-trends" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">\n            Historical Silver Price Trends\n          </h2>', '<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Historical Records (Fine Silver)</h3>')
else:
    hist_trend_block = ""

# Remove Intro Text below Calculator
intro_text = r'\{/\* Intro Text below Calculator \*/\}\s*<div className="mb-8 text-slate-700 text-base leading-relaxed font-medium">.*?</div>'
seo = re.sub(intro_text, '', seo, flags=re.DOTALL)

# Update TOC
new_toc = """  const tocGroups = [
    {
      items: [
        { id: 'todays-silver-price', label: "Today's Silver Price" },
        { id: 'silver-calculator', label: "Quick Silver Valuation Calculator" },
        { id: 'silver-price-history', label: 'Silver Price History in Nepal' },
        { id: 'silver-units-nepal', label: 'Silver Units Used in Nepal' },
        { id: 'silver-purity-standards', label: 'Silver Purity Standards' },
        { id: 'why-prices-change', label: 'Why Silver Prices Change in Nepal' },
        { id: 'common-uses-silver-nepal', label: 'Common Uses of Silver in Nepal' },
        { id: 'silver-as-investment', label: 'Silver as an Investment' },
        { id: 'gold-vs-silver-prices', label: 'Difference Between Gold and Silver Prices' },
        { id: 'buying-silver-nepal', label: 'Buying Silver in Nepal' },
        { id: 'selling-silver-nepal', label: 'Selling Silver in Nepal' },
        { id: 'silver-jewellery-pricing', label: 'Silver Jewellery Pricing' },
        { id: 'silver-coins-bullion', label: 'Silver Coins and Bullion' },
        { id: 'how-often-updated', label: 'How Often Are Silver Prices Updated?' },
        { id: 'who-uses-silver-price-data', label: 'Who Uses Silver Price Data?' },
        { id: 'why-silver-prices-matter', label: 'Why Silver Prices Matter' },
        { id: 'silver-metrics', label: 'Frequently Monitored Silver Metrics' },
        { id: 'faq', label: 'Frequently Asked Questions' },
        { id: 'related-tools', label: 'Related Calculators' },
      ]
    }
  ];"""
seo = re.sub(r'const tocGroups = \[.*?\];', new_toc, seo, flags=re.DOTALL)
seo = seo.replace('<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n          Related Calculators', '<h2 id="related-tools" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n          Related Calculators')

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
    f.write(seo)


# 2. page.tsx modifications
page = page.replace('<h2 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h2>', '<h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h3>')

quick_answer_marker = '<div id="quick-answer" className="quick-answer-block'
if quick_answer_marker in page:
    page = page.replace(quick_answer_marker, '<h2 id="todays-silver-price" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24">Today\'s Silver Price</h2>\n                  <div id="quick-answer" className="quick-answer-block')

# Replace Calculator block
calc_regex = r'<div id="calculator".*?<SilverCalculatorClient silverPerTola=\{currentSilver\} />\n                  </div>\n                </div>'
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
    
    # Insert todays_silver_content right before anchor_calc
    injection = '<div className="prose prose-slate max-w-none mt-6 mb-8">\n' + todays_silver_content + '\n</div>\n\n'
    page = page.replace(anchor_calc, injection + anchor_calc)
    
    # Insert PPW and SilverHistoricalData right after anchor_calc (i.e. before the Grid)
    # The grid starts at <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">
    grid_marker = '<div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">'
    
    if "import SilverHistoricalData" not in page:
        page = page.replace("import SilverChartClient from './SilverChartClient';", "import SilverChartClient from './SilverChartClient';\nimport SilverHistoricalData from './SilverHistoricalData';")
    
    if ppw_block and "import PricePerformanceWidget" not in page:
        page = page.replace("import SilverChartClient from './SilverChartClient';", "import SilverChartClient from './SilverChartClient';\nimport PricePerformanceWidget from '@/components/widgets/PricePerformanceWidget';")
    
    post_calc = ''
    if ppw_block:
        post_calc += ppw_block + '\n'
    post_calc += '              <div className="mb-12">\n                <SilverHistoricalData />\n              </div>\n\n              '
    
    page = page.replace(grid_marker, post_calc + grid_marker)
    
with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)

# 3. SilverHistoricalData.tsx modifications
if hist_trend_block:
    hist = hist.replace('<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Silver Price History in Nepal\n          </h2>', '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Silver Price History in Nepal\n          </h2>\n\n          <div className="prose prose-slate max-w-none mb-8">\n' + hist_trend_block + '\n          </div>')
    with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "w", encoding="utf-8") as f:
        f.write(hist)

print("Done")
