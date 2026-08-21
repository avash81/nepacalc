import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the desktop TOC styling
old_nav = '          <nav className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">'
new_nav = '          <nav className="pt-2">'

content = content.replace(old_nav, new_nav)

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Gold desktop TOC styling")
