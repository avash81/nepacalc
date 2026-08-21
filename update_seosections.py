import re

with open('src/app/market-rates/live-gold-price/SeoSections.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<h2([^>]*)>Quick Answer</h2>', r'<h3\1>Quick Answer</h3>', content)
content = re.sub(r'<h2([^>]*)>Today&apos;s Gold Price at a Glance</h2>', r'<h3\1>Today&apos;s Gold Price at a Glance</h3>', content)
content = re.sub(r'<h2([^>]*)>Gold Price Conversion Table</h2>', r'<h3\1>Gold Price Conversion Table</h3>', content)
content = re.sub(r'<h2([^>]*)>Gold Price Calculator</h2>', r'<h3\1>Gold Price Calculator Tool</h3>', content)
content = re.sub(r'<h3([^>]*)>Why does Nepal&apos;s gold price change every day\?</h3>', r'<h3\1>Why Does Nepal&apos;s Gold Price Change Every Day?</h3>', content)
content = re.sub(r'<h2([^>]*)>What Affects Jewellery Prices\?</h2>', r'<h2\1>What Affects Gold Prices and Jewellery Prices?</h2>', content)
content = re.sub(r'<h2([^>]*)>Compare today&apos;s gold and silver prices in Nepal</h2>', r'<h2\1>Compare Gold and Silver Prices in Nepal</h2>', content)
content = re.sub(r'<h2([^>]*)>Available Historical Datasets</h2>', r'<h2\1>Available Gold and Silver Historical Datasets</h2>', content)

with open('src/app/market-rates/live-gold-price/SeoSections.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated SeoSections.tsx")
