import re

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Pattern to remove everything between <SilverHistoricalData /> and the next <ul> block
pattern = r'(<SilverHistoricalData />).*?(<ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">)'
new_text = re.sub(pattern, r'\1\n\n          \2', text, flags=re.DOTALL)

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("done")
