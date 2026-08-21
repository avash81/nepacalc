import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

# The H2 "Today's Silver Price" block starts with:
# <h2 id="todays-silver-price" ...> Today's Silver Price </h2>
# And it includes the intro paragraphs, Market Snapshot, Price Change, Official Info, Key Highlights.
# Let's extract everything from <h2 id="todays-silver-price" down to just before <h2 id="silver-units-nepal"

extract_match = re.search(r'(<h2 id="todays-silver-price".*?)<h2 id="silver-units-nepal"', seo, re.DOTALL)
if extract_match:
    extracted_block = extract_match.group(1)
    
    # Remove it from seo
    seo = seo.replace(extracted_block, '')
    
    # Also remove the intro text block which is right above it
    intro_match = re.search(r'(<p className="text-slate-600 text-base font-medium leading-relaxed max-w-3xl">.*?</p>\s*<div className="mb-8 text-slate-700 text-base leading-relaxed font-medium">.*?</div>\s*)', seo, re.DOTALL)
    if intro_match:
        intro_block = intro_match.group(1)
        seo = seo.replace(intro_block, '')
        extracted_block = intro_block + extracted_block
        
    with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
        f.write(seo)
        
    with open("extracted_silver.txt", "w", encoding="utf-8") as f:
        f.write(extracted_block)
    print("Extracted the Today's Silver Price block")
else:
    print("Could not find the block to extract")
