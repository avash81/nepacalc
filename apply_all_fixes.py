import re
import os

# 1. Fix page.tsx: Replace SilverCalculatorClient with anchor link
page_path = "src/app/market-rates/silver-price-nepal/page.tsx"
with open(page_path, "r", encoding="utf-8") as f:
    page = f.read()

calc_replacement = """<a href="/calculator/silver-converter/" className="block p-6 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-colors text-center group">
                    <span className="block text-lg font-black text-slate-700 group-hover:text-blue-700 mb-2">Open Silver Valuation Calculator</span>
                    <span className="text-sm font-medium text-slate-500 group-hover:text-blue-600">Calculate exact value including making charges and wastage →</span>
                  </a>"""

page = re.sub(r'<SilverCalculatorClient[^>]*/>', calc_replacement, page)

# Add id="silver-calculator" to the wrapper if not present
page = page.replace('<div className="bg-slate-50 px-6 py-4 border-b border-slate-200">', '<div id="silver-calculator" className="bg-slate-50 px-6 py-4 border-b border-slate-200 scroll-mt-24">')

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page)


# 2. Fix SilverHistoricalData.tsx: Move ID to H2
hist_path = "src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx"
with open(hist_path, "r", encoding="utf-8") as f:
    hist = f.read()

hist = hist.replace('<section id="silver-price-history" className="scroll-mt-24">', '<section className="mb-12">')
hist = hist.replace('<h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-6">', '<h2 id="silver-price-history" className="text-2xl font-black text-slate-900 tracking-tighter mb-6 scroll-mt-24">')

with open(hist_path, "w", encoding="utf-8") as f:
    f.write(hist)


# 3. Fix SilverSeoSection.tsx: Demote H2s, inject Why Prices Change H2
seo_path = "src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx"
with open(seo_path, "r", encoding="utf-8") as f:
    seo = f.read()

# Change International Silver Market to H3
seo = re.sub(r'<h2 id="international-silver-market"(.*?)>\s*International Silver Market\s*</h2>', r'<h3 id="international-silver-market"\1>\n            International Silver Market\n          </h3>', seo)

# Change Silver Price vs Exchange Rate to H3
seo = re.sub(r'<h2 id="silver-vs-exchange-rate"(.*?)>\s*Silver Price vs Exchange Rate\s*</h2>', r'<h3 id="silver-vs-exchange-rate"\1>\n            Silver Price vs Exchange Rate\n          </h3>', seo)

# Change Daily Price Volatility to H3
seo = re.sub(r'<h2 id="daily-price-volatility"(.*?)>\s*Daily Price Volatility\s*</h2>', r'<h3 id="daily-price-volatility"\1>\n            Daily Price Volatility\n          </h3>', seo)

# Insert 'Why Silver Prices Change in Nepal' wrapper right before 'International Silver Market'
# Wait, I also need to bring in 'Why Silver Prices Behave Differently Than Gold' which was lost!
why_block = """{/* Why Prices Change */}
          <h2 id="why-prices-change" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">
            Why Silver Prices Change in Nepal
          </h2>
          <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
            Why Silver Prices Behave Differently Than Gold
          </h3>
          <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
            Silver prices in Nepal are influenced by a different combination of factors than gold. While both precious
            metals follow international commodity markets, silver demand is also driven by industrial manufacturing, solar
            energy production, electronics, medical equipment and investment demand. As a result, silver often experiences
            larger percentage price movements than gold over shorter periods.
          </p>

          {/* 16. International Market */}"""

seo = seo.replace('{/* 16. International Market */}', why_block)

# Let's also remove 'historical-silver-price-trends' since we moved History to page.tsx
# Oh wait, historical-silver-price-trends is a separate H2 in SilverSeoSection?
# Let's completely remove it if it exists.
hist_block_regex = r'\{\/\* 11\. Historical Trends \*\/\}\s*<h2 id="historical-silver-price-trends"[\s\S]*?historical prices\s*should never be considered a guarantee of future performance.\s*<\/p>'
seo = re.sub(hist_block_regex, '', seo)

# Replace <h2 id="todays-silver-price"... to the end of its paragraph since it was moved to page.tsx!
todays_block_regex = r'\{\/\* 1\. Today\'s Silver Price \*\/\}\s*<h2 id="todays-silver-price"[\s\S]*?value of your silver instantly.\s*<\/div>'
seo = re.sub(todays_block_regex, '', seo)


with open(seo_path, "w", encoding="utf-8") as f:
    f.write(seo)

print("Done")
