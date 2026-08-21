with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "r", encoding="utf-8") as f:
    dashboard = f.read()

# The graph is currently at `      {/* 2. Graph */}`. 
# We need to move it to AFTER the Market Highlights (which is right before SEO Sections).
# Let's extract the Graph block.

import re

graph_match = re.search(r'(      \{/\* 2\. Graph \*/\}.*?)(?=      \{/\* 3\. Data Status Block \*/\})', dashboard, re.DOTALL)
if graph_match:
    graph_block = graph_match.group(1)
    dashboard = dashboard.replace(graph_block, '')
    
    # Insert it right before SEO Sections
    seo_marker = '      {/* 5. SEO Sections */}'
    dashboard = dashboard.replace(seo_marker, graph_block + '\n' + seo_marker)
    
    with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "w", encoding="utf-8") as f:
        f.write(dashboard)
    print("Moved Graph below Market Highlights")
else:
    print("Graph block not found")
