import re

def update_file():
    with open('src/app/market-rates/live-gold-price/SeoSections.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Compare today's gold and silver prices in Nepal -> Compare Gold and Silver Prices in Nepal
    content = re.sub(r'Compare today\'s gold and silver prices in Nepal', 'Compare Gold and Silver Prices in Nepal', content)
    
    # 2. Add IDs to missing sections if they don't have one
    # Let's just find the actual IDs in SeoSections
    # I'll print them out first to see what we are working with
    
    # Write back
    with open('src/app/market-rates/live-gold-price/SeoSections.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    ids = re.findall(r'id="([^"]+)"', content)
    print("IDs found in SeoSections.tsx:")
    print(ids)

update_file()
