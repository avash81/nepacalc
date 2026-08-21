import re

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the style object
pattern = r'        style={{\n          background: \'#F8F9FA\',\n          border: \'1px solid #DADCE0\',\n          borderRadius: \'12px\',\n          padding: \'20px\',\n        }}'
new_style = '        className="pt-2"'

content = re.sub(pattern, new_style, content)

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Silver desktop TOC styling")
