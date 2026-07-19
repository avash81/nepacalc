import re

with open('src/app/market-rates/live-gold-price/SeoSections.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the duplicated H1 from SeoSections
h1_pattern = r'\{\/\* Hidden H1 for SEO.*?\</div>'
content = re.sub(h1_pattern, '', content, flags=re.DOTALL)

with open('src/app/market-rates/live-gold-price/SeoSections.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
