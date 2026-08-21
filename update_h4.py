with open("src/app/market-rates/live-gold-price/SeoSections.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

# Change H4 to H3
seo = seo.replace('<h4 className="text-[13px]', '<h3 className="text-[13px]')
seo = seo.replace('</h4>', '</h3>')

with open("src/app/market-rates/live-gold-price/SeoSections.tsx", "w", encoding="utf-8") as f:
    f.write(seo)
print("Updated H4 to H3")
