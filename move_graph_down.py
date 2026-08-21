with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "r", encoding="utf-8") as f:
    dashboard = f.read()

import re

# 1. Extract the Graph block
graph_match = re.search(r'(\{/\* 2\. Graph \*/\}.*?)(?=\s*\{/\* 3\. Data Status Block \*/\})', dashboard, re.DOTALL)
if graph_match:
    graph_block = graph_match.group(1)
    # Remove graph block from its current position
    dashboard = dashboard.replace(graph_block, '')
    
    # 2. Insert it before market-highlights
    highlights_marker = '{/* Market Highlights & Price Change Summary */}'
    dashboard = dashboard.replace(highlights_marker, graph_block + '\n\n      ' + highlights_marker)
    
    with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "w", encoding="utf-8") as f:
        f.write(dashboard)
    print("Moved Graph below Live Price Table")
else:
    print("Graph block not found")
