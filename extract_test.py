import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

# Let's extract the header (H1) and the intro text and the whole "Today's Silver Price" section.
# The section ends before <h2 id="silver-units-nepal"
match = re.search(r'(<header className="mb-6 pb-4 border-b border-slate-200">.*?</header>.*?)<h2 id="silver-units-nepal"', seo, re.DOTALL)
if match:
    print("Found the whole intro + Today's Silver Price section.")
else:
    print("Not found.")
