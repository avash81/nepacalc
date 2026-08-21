import re

with open('src/app/market-rates/silver-price-nepal/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('className="max-w-[1000px] mx-auto pb-12"', 'className="max-w-[1200px] lg:ml-0 lg:mr-auto pb-12"')
content = content.replace('className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 items-start"', 'className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start"')

with open('src/app/market-rates/silver-price-nepal/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated silver layout")
