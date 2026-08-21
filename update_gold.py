import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 items-start"', 'className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start"')

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated gold layout")
