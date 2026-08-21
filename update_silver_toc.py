import re

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace inline sticky styles with Tailwind classes
old_div = """    <div
      style={{
        position: 'sticky',
        top: '88px',
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#dadce0 transparent',
        alignSelf: 'start',
      }}
    >"""

new_div = """    <div className="lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:self-start scrollbar-thin">"""

content = content.replace(old_div, new_div)

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated SilverSeoToc styles")
