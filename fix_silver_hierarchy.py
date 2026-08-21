import re

with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

# The block to extract from page.tsx is:
# <h2 id="why-prices-change"...
# up to the start of "Today's Market Snapshot" (because Market Snapshot belongs to Today's Silver Price)
match = re.search(r'(<h2 id="why-prices-change".*?<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">\s*Why Silver Prices Behave Differently Than Gold\s*</h3>\s*<p.*?</p>\s*)(?=<div className="bg-blue-50)', page, re.DOTALL)

if match:
    extracted_why = match.group(1)
    page = page.replace(extracted_why, '')
    
    with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
        f.write(page)
        
    with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
        seo = f.read()
        
    # Now we insert extracted_why into SilverSeoSection.tsx right before <h3 id="international-silver-market"
    # Wait, the target order for the H3s under "Why Silver Prices Change in Nepal" is:
    # H3: Why Silver Prices Behave Differently Than Gold (which is inside extracted_why)
    # H3: Daily Price Volatility
    # H3: Silver Price vs Exchange Rate
    # H3: International Silver Market
    # Wait, they are currently in SilverSeoSection in this order:
    # international-silver-market, silver-vs-exchange-rate, daily-price-volatility.
    # Let's just insert extracted_why right before international-silver-market.
    marker = '<h3 id="international-silver-market"'
    if marker in seo:
        seo = seo.replace(marker, extracted_why + '\n' + marker)
        with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
            f.write(seo)
        print("Moved Why Prices Change block to SilverSeoSection.tsx")
    else:
        print("Marker not found in SilverSeoSection")
else:
    print("Why Prices Change block not found in page.tsx")
