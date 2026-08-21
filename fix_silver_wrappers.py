import re

with open('src/app/market-rates/silver-price-nepal/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace mobile TOC wrapper
old_mobile = """                <div className="lg:hidden mb-12">
                  <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                    <SilverSeoToc />
                  </div>
                </div>"""
new_mobile = """                <div className="lg:hidden mb-12">
                  <SilverSeoToc />
                </div>"""
content = content.replace(old_mobile, new_mobile)

# Replace desktop TOC wrapper
old_desktop = """              <aside className="hidden lg:block sticky top-24 self-start">
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                  <SilverSeoToc />
                </div>
              </aside>"""
new_desktop = """              <aside className="hidden lg:block">
                <SilverSeoToc />
              </aside>"""
content = content.replace(old_desktop, new_desktop)

with open('src/app/market-rates/silver-price-nepal/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Silver page.tsx wrappers")
