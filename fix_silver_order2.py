import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

# Target order: buying, selling, jewellery, coins, how-often, who-uses, why-matter, metrics
# Current order: how-often, who-uses, buying, selling, jewellery, coins, why-matter, metrics
# Extract blocks by their comment markers

idx_buy = seo.find('{/* 12. Buying Silver */}')
idx_sell = seo.find('{/* 13. Selling Silver */}')
idx_jew = seo.find('{/* 14. Jewellery Pricing */}')
idx_coin = seo.find('{/* 15. Coins and Bullion */}')
idx_update = seo.find('{/* 9. How Often Updated */}')
idx_who = seo.find('{/* 10. Who Uses */}')
idx_matter = seo.find('{/* 19. Why Silver Prices Matter */}')

if any(x == -1 for x in [idx_buy, idx_sell, idx_jew, idx_coin, idx_update, idx_who, idx_matter]):
    print("Some markers not found!")
    for n, v in [("buy", idx_buy), ("sell", idx_sell), ("jew", idx_jew), ("coin", idx_coin), ("update", idx_update), ("who", idx_who), ("matter", idx_matter)]:
        print(f"  {n}: {v}")
else:
    # Extract blocks
    # The blocks are: [buy..sell), [sell..jew), [jew..coin), [coin..next_h2), [update..who), [who..next_h2)
    # Next H2 after coins: the block that goes from coins to how-often updated
    buy_block = seo[idx_buy:idx_sell]
    sell_block = seo[idx_sell:idx_jew]
    jew_block = seo[idx_jew:idx_coin]
    
    # coins ends at how-often-updated
    idx_how_often_h2 = seo.find('<h2 id="how-often-updated"')
    idx_who_h2 = seo.find('<h2 id="who-uses-silver-price-data"')
    idx_buy_h2 = seo.find('<h2 id="buying-silver-nepal"')
    
    coin_block = seo[idx_coin:idx_how_often_h2]
    update_block = seo[idx_how_often_h2:idx_who_h2]
    who_block = seo[idx_who_h2:idx_buy_h2]
    
    # We want: buy, sell, jewellery, coins, update, who, ...
    # Current: update, who, buy, sell, jewellery, coins, ...
    before = seo[:idx_update]
    after = seo[idx_matter:]
    
    seo = before + buy_block + sell_block + jew_block + coin_block + update_block + who_block + after
    
    with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
        f.write(seo)
    print("Reordered sections successfully!")
