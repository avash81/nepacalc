import re

with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

# Add H2: Quick Silver Valuation Calculator above the calculator anchor card
old_calc = '<div className="mb-8">'
new_calc = '<h2 id="silver-calculator" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24">Quick Silver Valuation Calculator</h2>\n              <div className="mb-8">'
page = page.replace(old_calc, new_calc, 1)

# Fix Today's Rate Summary H2 to H3 as per target
# Target:
# H2: Today's Silver Price
# H3: Today's Rate Summary
# Wait, where is Today's Rate Summary?
page = page.replace('<h2 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h2>', '<h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h3>')

with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)
print("Updated page.tsx")
