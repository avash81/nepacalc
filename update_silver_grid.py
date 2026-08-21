import re

with open('src/app/market-rates/silver-price-nepal/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the original grid wrapper
old_grid = """          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">
            <article className="min-w-0">"""
content = content.replace(old_grid, "")

# Insert the grid wrapper just before SilverSeoContent
old_seo = """              <SilverSeoContent silverData={silverData} source={source} date={rate_date} />"""
new_seo = """          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">
            <article className="min-w-0">
              <SilverSeoContent silverData={silverData} source={source} date={rate_date} />"""
content = content.replace(old_seo, new_seo)

with open('src/app/market-rates/silver-price-nepal/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Silver grid placement")
