import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

calc_pattern = r'(      \{/\* Calculator Integration \*/\}.*?      </div>\n)'
live_price_pattern = r'(      \{/\* 1\. Live Price Table \(Moved here\) \*/\}.*?      </div>\n)'
ad_pattern = r'(      \{/\* HilltopAds 300[xX]250.*?      </div>\n)'

calc_match = re.search(calc_pattern, content, re.DOTALL)
live_price_match = re.search(live_price_pattern, content, re.DOTALL)
ad_match = re.search(ad_pattern, content, re.DOTALL)

if calc_match and live_price_match and ad_match:
    calc_str = calc_match.group(1)
    live_price_str = live_price_match.group(1)
    ad_str = ad_match.group(1)
    
    content = content.replace(calc_str, '')
    content = content.replace(live_price_str, '')
    content = content.replace(ad_str, '')
    
    # Also add H2 for Gold Price Calculator and H3 for Nepal Benchmark Gold Rates (if missing)
    calc_str = calc_str.replace('id="calculator" className="', 'id="calculator" className="')
    calc_str = '      <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Gold Price Calculator</h2>\n' + calc_str
    
    insert_pos = content.find('      {/* Market Highlights & Price Change Summary */}')
    
    new_blocks = f"{calc_str}\n{ad_str}\n{live_price_str}\n"
    content = content[:insert_pos] + new_blocks + content[insert_pos:]
    
    with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Reordered successfully.")
else:
    print("Could not find patterns.")
