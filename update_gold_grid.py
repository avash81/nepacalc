import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Find and remove the original grid start
old_grid_start = """      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">
        <article className="min-w-0">"""
content = content.replace(old_grid_start, "")

# 2. Find where the SEO sections start and insert the grid start right before it
seo_marker = """        {/* 5. SEO Sections */}"""
new_grid_start = """      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">
        <article className="min-w-0">
        {/* 5. SEO Sections */}"""
content = content.replace(seo_marker, new_grid_start)

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Gold grid placement")
