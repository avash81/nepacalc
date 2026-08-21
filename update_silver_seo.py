import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

# 1. Remove the second H1 block completely and replace it with just the paragraph text 
# (No heading at all, just intro prose)
h1_block_regex = r'<header className="mb-6 pb-4 border-b border-slate-200">\s*<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2 capitalize">\s*Live Silver Price Today Nepal \(2083/84\)\s*</h1>\s*(<p className="text-slate-600 text-base font-medium leading-relaxed max-w-3xl">.*?)</header>'
seo = re.sub(h1_block_regex, r'\1', seo, flags=re.DOTALL)

# 2. Fix "Why Silver Prices Change in Nepal" H2
# Currently it has H2s for Daily Price Volatility, etc. Let's find them.
seo = seo.replace('<h2 id="international-silver-market"', '<h3 id="international-silver-market"')
seo = seo.replace('International Silver Market\n          </h2>', 'International Silver Market\n          </h3>')

seo = seo.replace('<h2 id="silver-vs-exchange-rate"', '<h3 id="silver-vs-exchange-rate"')
seo = seo.replace('Silver Price vs Exchange Rate\n          </h2>', 'Silver Price vs Exchange Rate\n          </h3>')

seo = seo.replace('<h2 id="daily-price-volatility"', '<h3 id="daily-price-volatility"')
seo = seo.replace('Daily Price Volatility\n          </h2>', 'Daily Price Volatility\n          </h3>')

# And insert the parent H2 "Why Silver Prices Change in Nepal" right before the first child (Why Silver Prices Behave Differently Than Gold, which is currently an H3)
# Let's find that H3: <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Why Silver Prices Behave Differently Than Gold</h3>
h3_behave = '<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">\n            Why Silver Prices Behave Differently Than Gold\n          </h3>'
new_parent_h2 = '<h2 id="why-prices-change" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">\n            Why Silver Prices Change in Nepal\n          </h2>\n          ' + h3_behave
if h3_behave in seo:
    seo = seo.replace(h3_behave, new_parent_h2)
else:
    print("Could not find h3_behave")

# 3. Rename "Historical Silver Price Trends" to something else if needed? No, the target doesn't have it, or it was consolidated?
# Wait, the target has:
# H2: Silver Price History in Nepal
# H3: Historical Records (Fine Silver)
# It doesn't have "Historical Silver Price Trends". Let's check where it is.
# If it exists, I'll demote it to H3 under Silver Price History or just remove the heading.

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
    f.write(seo)
print("Updated SilverSeoSection.tsx headings")
