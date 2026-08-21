import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

seo = seo.replace('<h3 id="international-silver-market" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="international-silver-market" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
seo = seo.replace('<h3 id="silver-vs-exchange-rate" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="silver-vs-exchange-rate" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
seo = seo.replace('<h3 id="daily-price-volatility" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="daily-price-volatility" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')

# Extract blocks based on markers
idx_int = seo.find('{/* 16. International Silver Market */}')
idx_ex = seo.find('{/* 17. Exchange Rate */}')
idx_daily = seo.find('{/* 18. Daily Volatility */}')
idx_next = seo.find('{/* 19. Why Silver Matters */}')

if idx_int != -1 and idx_ex != -1 and idx_daily != -1 and idx_next != -1:
    int_block = seo[idx_int:idx_ex]
    ex_block = seo[idx_ex:idx_daily]
    daily_block = seo[idx_daily:idx_next]
    
    # Reconstruct the section in the correct order
    before = seo[:idx_int]
    after = seo[idx_next:]
    
    seo = before + daily_block + ex_block + int_block + after
    
    with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
        f.write(seo)
    print("Successfully reordered H3 blocks")
else:
    print("Could not find the comment markers!")
