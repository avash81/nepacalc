import re

with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "r", encoding="utf-8") as f:
    hist = f.read()

h2 = '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n          Silver Price History in Nepal\n        </h2>'
h3 = '<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Historical Records (Fine Silver)</h3>\n        '

if h2 in hist:
    hist = hist.replace(h2, h2 + '\n\n        ' + h3)
    with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "w", encoding="utf-8") as f:
        f.write(hist)
    print("Added H3 to SilverHistoricalData.tsx")
else:
    print("H2 not found")
