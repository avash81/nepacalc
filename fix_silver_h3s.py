import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

# Update classes for the three H3s
seo = seo.replace('<h3 id="international-silver-market" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="international-silver-market" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
seo = seo.replace('<h3 id="silver-vs-exchange-rate" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="silver-vs-exchange-rate" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
seo = seo.replace('<h3 id="daily-price-volatility" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="daily-price-volatility" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')

# Extract the three blocks
int_match = re.search(r'(<h3 id="international-silver-market".*?</p>\s*)<h3 id="silver-vs-exchange-rate"', seo, re.DOTALL)
ex_match = re.search(r'(<h3 id="silver-vs-exchange-rate".*?</p>\s*)<h3 id="daily-price-volatility"', seo, re.DOTALL)
daily_match = re.search(r'(<h3 id="daily-price-volatility".*?</p>\s*)(?=<h2 id="why-silver-prices-matter")', seo, re.DOTALL)

if int_match and ex_match and daily_match:
    int_block = int_match.group(1)
    ex_block = ex_match.group(1)
    daily_block = daily_match.group(1)
    
    # Remove them
    seo = seo.replace(int_block, '')
    seo = seo.replace(ex_block, '')
    seo = seo.replace(daily_block, '')
    
    # Insert in order: Daily, Exchange, International, right before why-silver-prices-matter
    insert_marker = '<h2 id="why-silver-prices-matter"'
    if insert_marker in seo:
        seo = seo.replace(insert_marker, daily_block + '\n          ' + ex_block + '\n          ' + int_block + '\n          ' + insert_marker)
        
    with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
        f.write(seo)
    print("Reordered H3s correctly!")
else:
    print("Failed to match blocks")
