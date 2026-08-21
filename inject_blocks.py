with open("extracted_blocks.txt", "r", encoding="utf-8") as f:
    blocks = f.read()

# Replace variables to match GoldDashboardClient.tsx context
blocks = blocks.replace('hallmarkCurrent', 'tolaNPR.current')
blocks = blocks.replace('tejabiCurrent', 'tejabiTolaNPR')
blocks = blocks.replace('silverCurrent', 'silverTolaNPR')

with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "r", encoding="utf-8") as f:
    dashboard = f.read()

# We need to insert these blocks AFTER the "quick-answer" div that wraps Today's Gold Price H2 and QuickPriceEstimator?
# Wait! In GoldDashboardClient.tsx, QuickPriceEstimator is NOT Today's Gold Price by Unit!
# Wait, let's see where QuickPriceEstimator is exactly.

import re

# Insert blocks right after the "todays-gold-price" wrapper in GoldDashboardClient.tsx
# Let's find the todays-gold-price wrapper
match = re.search(r'(<div id="quick-answer".*?<h2 id="todays-gold-price".*?</div>\s*</div>)', dashboard, re.DOTALL)
if match:
    # We found the block that contains Today's Gold Price and QuickPriceEstimator.
    # Actually, let's just insert it before "gold-price-calculator"
    calc_marker = '      <h2 id="gold-price-calculator"'
    dashboard = dashboard.replace(calc_marker, blocks + '\n\n' + calc_marker)
    
    with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "w", encoding="utf-8") as f:
        f.write(dashboard)
    print("Inserted extracted blocks into GoldDashboardClient.tsx")
else:
    print("Could not find insertion point")
