import re

with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "r", encoding="utf-8") as f:
    hist = f.read()

# -----------------
# 1. SilverSeoSection.tsx EXTRACTION
# -----------------

# Extract "Today's Silver Price" content to move to page.tsx
# It starts at <div className="bg-blue-50 border border-blue-100... (Market Snapshot)
# and ends right after Key Highlights </ul>
snapshot_regex = r'(<div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 not-prose">.*?<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Key Highlights</h3>.*?</ul>)'
snapshot_match = re.search(snapshot_regex, seo, re.DOTALL)
if snapshot_match:
    snapshot_block = snapshot_match.group(1)
    seo = seo.replace(snapshot_block, '')
else:
    snapshot_block = ""
    print("Snapshot block not found!")

# Extract <SilverHistoricalData /> from seo
seo = seo.replace('<SilverHistoricalData />\n', '')
seo = seo.replace('<SilverHistoricalData />', '')

# Remove second H1 and its wrapper, keeping the text as <p>
h1_regex = r'<header className="mb-6 pb-4 border-b border-slate-200">\s*<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2 capitalize">\s*Live Silver Price Today Nepal \(2083/84\)\s*</h1>\s*(<p className="text-slate-600 text-base font-medium leading-relaxed max-w-3xl">.*?</p>)\s*</header>'
seo = re.sub(h1_regex, r'\1', seo, flags=re.DOTALL)

# Remove the <h2 id="todays-silver-price"> and the intro paragraphs that are now redundant or moved
todays_h2_regex = r'<h2 id="todays-silver-price" className="text-2xl font-black text-slate-900 tracking-tighter mb-6 scroll-mt-20">\s*Today&apos;s Silver Price\s*</h2>\s*<p.*?</p>\s*<p.*?</p>\s*<p.*?</p>\s*<p.*?</p>'
seo = re.sub(todays_h2_regex, '', seo, flags=re.DOTALL)

# Add H2: Why Silver Prices Change in Nepal before the orphaned <ul>
orphan_ul_marker = '<ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">\n              <li>International silver spot prices'
why_prices_h2 = '<h2 id="why-prices-change" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">Why Silver Prices Change in Nepal</h2>\n            '
if orphan_ul_marker in seo:
    seo = seo.replace(orphan_ul_marker, why_prices_h2 + orphan_ul_marker)
else:
    print("Orphan UL not found")

# Reorder the H3s under Why Prices Change
# Demote the H2s to H3s
seo = seo.replace('<h2 id="international-silver-market" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="international-silver-market" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
seo = seo.replace('<h2 id="silver-vs-exchange-rate" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="silver-vs-exchange-rate" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
seo = seo.replace('<h2 id="daily-price-volatility" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="daily-price-volatility" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')

seo = seo.replace('International Silver Market\n            </h2>', 'International Silver Market\n            </h3>')
seo = seo.replace('Silver Price vs Exchange Rate\n            </h2>', 'Silver Price vs Exchange Rate\n            </h3>')
seo = seo.replace('Daily Price Volatility\n            </h2>', 'Daily Price Volatility\n            </h3>')

# Find the blocks
idx_int = seo.find('{/* 16. International Market */}')
idx_ex = seo.find('{/* 17. Exchange Rate */}')
idx_daily = seo.find('{/* 18. Daily Volatility */}')
idx_next = seo.find('{/* 19. Why Silver Prices Matter */}')

if idx_int != -1 and idx_ex != -1 and idx_daily != -1 and idx_next != -1:
    int_block = seo[idx_int:idx_ex]
    ex_block = seo[idx_ex:idx_daily]
    daily_block = seo[idx_daily:idx_next]
    
    before = seo[:idx_int]
    after = seo[idx_next:]
    
    # We want to move these blocks right after "Why Silver Prices Behave Differently Than Gold" paragraph
    # Let's just place them where they were but reordered, and we will move them up.
    # Actually, they are at the bottom of the page! We need to move them UP to right after the "Why Silver Prices Behave Differently Than Gold" paragraph ends.
    # The paragraph ends with "...larger percentage price movements than gold over shorter periods.</p>"
    behave_p = "larger percentage price movements than gold over shorter periods.\n            </p>"
    if behave_p in before:
        # Cut them from bottom
        # And paste them after behave_p
        before = before.replace(behave_p, behave_p + "\n\n            " + daily_block + ex_block + int_block)
        seo = before + after
        print("Moved H3s up successfully")
    else:
        # Just reorder in place
        seo = before + daily_block + ex_block + int_block + after
        print("Reordered H3s in place")
else:
    print("Could not find comment markers")

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
seo = seo.replace('<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Related Calculators', '<h2 id="related-tools" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Related Calculators')

# Remove Historical Silver Price Trends from SeoSections (we move it to HistoricalData)
hist_trend_regex = r'(\{/\* 11\. Historical Trends \*/\}\s*<h2 id="historical-silver-price-trends".*?)(?=\{/\* 12\. Buying Silver \*/\})'
hist_trend_match = re.search(hist_trend_regex, seo, re.DOTALL)
if hist_trend_match:
    hist_trend_block = hist_trend_match.group(1)
    seo = seo.replace(hist_trend_block, '')
    
    # Adapt it for HistoricalData
    hist_trend_block = hist_trend_block.replace('<h2 id="historical-silver-price-trends" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">\n              Historical Silver Price Trends\n            </h2>', '<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Historical Records (Fine Silver)</h3>')
else:
    hist_trend_block = ""
    print("Historical Trends block not found")

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
    f.write(seo)

# -----------------
# 2. page.tsx INJECTION
# -----------------

# Change Today's Rate Summary to H3
page = page.replace('<h2 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h2>', '<h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h3>')

# Add H2 Today's Silver Price before quick-answer
quick_answer_marker = '<div id="quick-answer"'
if quick_answer_marker in page:
    page = page.replace(quick_answer_marker, '<h2 id="todays-silver-price" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24">Today\'s Silver Price</h2>\n                  <div id="quick-answer"')

# Inject snapshot_block AFTER quick-answer block
# quick-answer block ends right before <div className="mb-8"> <a href="/calculator...
calc_marker = '<div className="mb-8">\n                <a\n                  href="/calculator/silver-converter/"'
if calc_marker in page:
    injection = '<div className="prose prose-slate max-w-none mt-6 mb-8">\n' + snapshot_block + '\n</div>\n\n'
    page = page.replace(calc_marker, injection + '                <h2 id="silver-calculator" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24">Quick Silver Valuation Calculator</h2>\n                ' + calc_marker)
else:
    print("Calculator marker not found in page.tsx")

# Inject SilverHistoricalData into page.tsx AFTER the calculator block
# The calculator block ends at </a>\n              </div>
calc_end_marker = '</a>\n              </div>\n\n          <div className="lg:grid'
if calc_end_marker in page:
    # Need to import SilverHistoricalData in page.tsx
    if "import SilverHistoricalData" not in page:
        page = page.replace("import SilverChartClient from './SilverChartClient';", "import SilverChartClient from './SilverChartClient';\nimport SilverHistoricalData from './SilverHistoricalData';")
    
    page = page.replace(calc_end_marker, '</a>\n              </div>\n\n              <div className="mb-12">\n                <SilverHistoricalData />\n              </div>\n\n          <div className="lg:grid')
else:
    print("Calculator end marker not found")

with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)

# -----------------
# 3. SilverHistoricalData.tsx INJECTION
# -----------------
if hist_trend_block:
    hist = hist.replace('<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Silver Price History in Nepal\n          </h2>', '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Silver Price History in Nepal\n          </h2>\n\n          <div className="prose prose-slate max-w-none mb-8">\n' + hist_trend_block + '\n          </div>')
    with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "w", encoding="utf-8") as f:
        f.write(hist)

print("ALL Silver hierarchy updates applied successfully!")
