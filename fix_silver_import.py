import re

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if "import MobileCollapsible" not in content:
    content = content.replace("import PricePerformanceWidget", "import MobileCollapsible from '@/components/ui/MobileCollapsible';\nimport PricePerformanceWidget")

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed import")
