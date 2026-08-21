import re

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

bad_nav = """      <nav
        className="hidden lg:block"
        aria-label="Table of Contents"
        className="pt-2"
      >"""
fixed_nav = """      <nav
        className="hidden lg:block pt-2"
        aria-label="Table of Contents"
      >"""

content = content.replace(bad_nav, fixed_nav)

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed JSX attributes")
