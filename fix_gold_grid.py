import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_seo = """      {/* 5. SEO Sections */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none">
        <SeoSections rates={rates} fmt={fmt} />
      </div>

    
        </article>"""

new_seo = """      {/* 5. SEO Sections */}
      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">
        <article className="min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none">
            <SeoSections rates={rates} fmt={fmt} />
          </div>
        </article>"""

content = content.replace(old_seo, new_seo)

# And also clean the desktop TOC background just in case my previous replace failed because it was `<div` instead of `<nav`!
old_toc_bg = """          {/* TOC */}
          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">"""
new_toc_bg = """          {/* TOC */}
          <div className="pt-2">"""
content = content.replace(old_toc_bg, new_toc_bg)

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Gold Grid and TOC styles")
