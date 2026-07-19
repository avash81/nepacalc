import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add link to Gold Converter
content = content.replace(
    'Prices are fixed by FENEGOSIDA.',
    'Prices are fixed by FENEGOSIDA. If you need to convert these rates between Tola, Lal, or Grams, you can use our <a href="/calculator/gold-converter/" className="text-blue-600 font-bold hover:underline">Nepal Gold Converter</a>.'
)

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
