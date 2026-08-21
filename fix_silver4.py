import re

with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

# Extract from page.tsx:
extract_regex = r'(<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">\s*Why Silver Prices Behave Differently Than Gold\s*</h3>\s*<p.*?</p>)'
match = re.search(extract_regex, page, re.DOTALL)
if match:
    block = match.group(1)
    page = page.replace(block, '')
    
    with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
        f.write(page)
        
    with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
        seo = f.read()
        
    # We also need to get the orphan UL that might have been left in page.tsx!
    # Wait, where is the orphan UL?
    ul_regex = r'(<ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">\s*<li>International silver spot prices.*?<p.*?</p>)'
    ul_match = re.search(ul_regex, page, re.DOTALL)
    if ul_match:
        ul_block = ul_match.group(1)
        page = page.replace(ul_block, '')
        with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
            f.write(page)
        block += "\n\n          " + ul_block
    
    h2 = '<h2 id="why-prices-change" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">Why Silver Prices Change in Nepal</h2>\n          '
    block = h2 + block + '\n\n          '
    
    # Insert right before <h3 id="daily-price-volatility"
    insert_marker = '<h3 id="daily-price-volatility"'
    if insert_marker in seo:
        seo = seo.replace(insert_marker, block + insert_marker)
        with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
            f.write(seo)
        print("Moved successfully!")
    else:
        print("Insert marker not found in seo")
else:
    print("Not found in page.tsx")
