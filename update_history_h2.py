import re

with open('src/app/market-rates/live-gold-price/HistoricalData.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<h4([^>]*)>Historical Record Methodology</h4>', r'<h4\1>Historical Record Methodology</h4>', content) # It already is H4. Wait, let me check.

# Change Available Historical Datasets to Available Gold and Silver Historical Datasets
content = re.sub(r'<h2([^>]*)>(\s*)Available Historical Datasets(\s*)</h2>', r'<h2\1>\2Available Gold and Silver Historical Datasets\3</h2>', content)

with open('src/app/market-rates/live-gold-price/HistoricalData.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated HistoricalData.tsx")
