import re

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure MobileCollapsible is imported
if "MobileCollapsible" not in content:
    content = content.replace("import PricePerformanceWidget", "import MobileCollapsible from '@/components/ui/MobileCollapsible';\nimport PricePerformanceWidget")

# We will replace the <nav> block with a desktop nav and a mobile collapsible block.
nav_pattern = r'      {/\* TOC \*/}\n      <nav\n        aria-label="Table of Contents"[\s\S]*?      </nav>'
nav_match = re.search(nav_pattern, content)

if nav_match:
    nav_block = nav_match.group(0)
    
    # Desktop version: just add "hidden lg:block" to the nav
    desktop_nav = nav_block.replace('<nav\n        aria-label', '<nav\n        className="hidden lg:block"\n        aria-label')
    
    # Mobile version: wrap the <ol> in MobileCollapsible
    # First extract the <ol> block
    ol_pattern = r'      <ol style={{ listStyle: \'none\', margin: 0, padding: 0, borderLeft: \'2px solid #e8eaed\' }}>[\s\S]*?      </ol>'
    ol_match = re.search(ol_pattern, nav_block)
    ol_block = ol_match.group(0)
    
    # Calculate total sections (23)
    mobile_block = f"""      {'{'}/* MOBILE TOC */{'}'}
      <div className="lg:hidden mt-6">
        <MobileCollapsible title="TABLE OF CONTENTS: 23 SECTIONS">
{ol_block}
        </MobileCollapsible>
      </div>"""
      
    new_toc = desktop_nav + "\n" + mobile_block
    content = content.replace(nav_block, new_toc)
    
    with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated SilverSeoToc to have mobile collapsible")
else:
    print("Could not find nav block")
