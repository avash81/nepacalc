with open("src/app/market-rates/live-gold-price/SeoSections.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

import re

# Extract Quick Answer
quick_match = re.search(r'(<section id="quick-answer-block".*?</section>)', seo, re.DOTALL)
# Extract Gold at a Glance
glance_match = re.search(r'(<section id="gold-at-a-glance".*?</section>)', seo, re.DOTALL)
# Extract Conversion Table
conv_match = re.search(r'(<section id="gold-conversion-table".*?</section>)', seo, re.DOTALL)
# Extract Calculator Info (which we will remove/demote)
calc_match = re.search(r'(<section id="gold-price-calculator-info".*?</section>)', seo, re.DOTALL)

if quick_match and glance_match and conv_match:
    print("Found all three blocks in SeoSections.tsx")
    # We will remove them from SeoSections
    seo = seo.replace(quick_match.group(1), '')
    seo = seo.replace(glance_match.group(1), '')
    seo = seo.replace(conv_match.group(1), '')
    
    # Save modified SeoSections
    with open("src/app/market-rates/live-gold-price/SeoSections.tsx", "w", encoding="utf-8") as f:
        f.write(seo)
        
    # Write the extracted blocks to a temp file so we can read them in bash/powershell
    blocks = quick_match.group(1) + '\n\n' + glance_match.group(1) + '\n\n' + conv_match.group(1)
    with open("extracted_blocks.txt", "w", encoding="utf-8") as f:
        f.write(blocks)
else:
    print("Missing some blocks")
