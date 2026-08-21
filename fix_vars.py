import re

with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

target = "const isFresh = status === 'verified';"
definitions = """const isFresh = status === 'verified';
  
    const displayDate = new Date(rawDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const displayTime = "11:00 AM NPT";
    const currentSilverPrice = currentSilver.toLocaleString('en-IN');
    const yesterdaySilverPrice = previousSilver.toLocaleString('en-IN');
    const silverChange = Math.abs(change24h).toLocaleString('en-IN');
    const silverChangePercent = changePercent24h.toFixed(2);
    const isUp = change24h >= 0;
"""

page = page.replace(target, definitions)

with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)
