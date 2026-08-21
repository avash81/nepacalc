import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

live_price_start = content.find('      {/* 1. Live Price Table (Moved here) */}')
ad_start = content.find('      {/* HilltopAds 300x250 — test zone between rate table and calculator */}')
calc_start = content.find('      {/* Calculator Integration */}')
highlights_start = content.find('      {/* Market Highlights & Price Change Summary */}')

if -1 not in [live_price_start, ad_start, calc_start, highlights_start]:
    live_price_block = content[live_price_start:ad_start]
    ad_block = content[ad_start:calc_start]
    calc_block = content[calc_start:highlights_start]
    
    # We want: Calculator, then Live Price, then Ad. Wait, let's keep Ad where it is?
    # User says: 
    # H2: Gold Price Calculator
    # H2: Nepal Benchmark Gold Rates
    
    # So:
    # 1. calc_block (wrap in H2)
    # 2. live_price_block
    # 3. ad_block
    
    # Let's fix calc_block to have an H2
    calc_block = '      <h2 id="gold-price-calculator" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24">Gold Price Calculator</h2>\n' + calc_block
    
    new_middle = calc_block + live_price_block + ad_block
    
    content = content[:live_price_start] + new_middle + content[highlights_start:]
    
    with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Reordered successfully.")
else:
    print(live_price_start, ad_start, calc_start, highlights_start)

