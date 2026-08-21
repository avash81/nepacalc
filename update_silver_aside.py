import re

with open('src/app/market-rates/silver-price-nepal/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_aside = """            <aside className="hidden lg:block sticky top-24 self-start">
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                <SilverSeoToc />
              </div>
            </aside>"""
new_aside = """            <aside className="hidden lg:block sticky top-24 self-start">
              <SilverSeoToc />
            </aside>"""
content = content.replace(old_aside, new_aside)

with open('src/app/market-rates/silver-price-nepal/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Silver aside styling")
