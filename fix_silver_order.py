import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

# Fix wrong closing tag on daily-price-volatility h3
seo = seo.replace('Daily Price Volatility\n            </h2>', 'Daily Price Volatility\n            </h3>')

# Now we need to reorder sections. Target order of H2s is:
# 1. Silver Units Used in Nepal  [already in place]
# 2. Silver Purity Standards      [already in place]
# 3. Why Silver Prices Change in Nepal  [currently AFTER coins/bullion]
# 4. Common Uses of Silver in Nepal
# 5. Silver as an Investment
# 6. Difference Between Gold and Silver Prices
# 7. Buying Silver in Nepal
# 8. Selling Silver in Nepal
# 9. Silver Jewellery Pricing
# 10. Silver Coins and Bullion
# 11. How Often Are Silver Prices Updated?
# 12. Who Uses Silver Price Data?
# 13. Why Silver Prices Matter
# 14. Frequently Monitored Silver Metrics

# Extract the "Why Silver Prices Change in Nepal" block
# Comment marker is "18. Daily Volatility" — but the block actually starts with the H2 "why-prices-change"
# The block starts from the H2 why-prices-change and ends before "19. Why Silver Prices Matter"
idx_why = seo.find('<h2 id="why-prices-change"')
idx_next_after_why = seo.find('{/* 19. Why Silver Prices Matter */}')

if idx_why == -1 or idx_next_after_why == -1:
    print(f"why block not found: {idx_why}, {idx_next_after_why}")
else:
    why_block = seo[idx_why:idx_next_after_why]
    
    # Remove from current position
    seo = seo.replace(why_block, '')
    
    # Insert after silver-purity-standards section (before common-uses-silver-nepal)
    insert_marker = '<h2 id="common-uses-silver-nepal"'
    if insert_marker in seo:
        seo = seo.replace(insert_marker, why_block + '\n\n          ' + insert_marker)
        print("Moved Why Prices Change to correct position!")
    else:
        print("common-uses marker not found")

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
    f.write(seo)
print("Done")
