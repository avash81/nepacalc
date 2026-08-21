import re

with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

match = re.search(r'(<h2 id="why-prices-change".*?)(?=\s*\{/\* Market Snapshot \*/\})', page, re.DOTALL)
if match:
    extracted_why = match.group(1)
    page = page.replace(extracted_why, '')
    with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
        f.write(page)
    
    with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
        seo = f.read()
        
    marker = '<h3 id="international-silver-market"'
    if marker in seo:
        seo = seo.replace(marker, extracted_why + '\n\n          ' + marker)
        
        # Also reorder the sub-h3s under Why Prices Change!
        # Target:
        # H3: Why Silver Prices Behave Differently Than Gold
        # H3: Daily Price Volatility
        # H3: Silver Price vs Exchange Rate
        # H3: International Silver Market
        
        # They are currently in this order in SilverSeoSection.tsx (after injection):
        # extracted_why (Why Silver Prices Behave Differently Than Gold)
        # international-silver-market
        # silver-vs-exchange-rate
        # daily-price-volatility
        
        # Let's extract them from seo
        int_match = re.search(r'(<h3 id="international-silver-market".*?</p>\s*)<h3 id="silver-vs-exchange-rate"', seo, re.DOTALL)
        ex_match = re.search(r'(<h3 id="silver-vs-exchange-rate".*?</p>\s*)<h3 id="daily-price-volatility"', seo, re.DOTALL)
        daily_match = re.search(r'(<h3 id="daily-price-volatility".*?</p>\s*)(?=<h2 id="why-silver-prices-matter")', seo, re.DOTALL)
        
        if int_match and ex_match and daily_match:
            int_block = int_match.group(1)
            ex_block = ex_match.group(1)
            daily_block = daily_match.group(1)
            
            # Remove them from seo
            seo = seo.replace(int_block, '')
            seo = seo.replace(ex_block, '')
            seo = seo.replace(daily_block, '')
            
            # Now insert them in correct order right after extracted_why
            # Wait, extracted_why is already in seo, we just appended it.
            # So let's replace extracted_why with extracted_why + daily + ex + int
            seo = seo.replace(extracted_why, extracted_why + '\n          ' + daily_block + ex_block + int_block)
            print("Successfully reordered all H3s")
        else:
            print("Could not find one of the H3 blocks to reorder")
            
        with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
            f.write(seo)
    else:
        print("Marker not found in SilverSeoSection")
else:
    print("Why block not found in page.tsx")
