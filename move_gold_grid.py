import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the current grid start (which is right before SEO sections)
old_grid_start = """      {/* 5. SEO Sections */}
      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">
        <article className="min-w-0">"""
new_grid_start = """      {/* 5. SEO Sections */}
      <div>
        <article className="min-w-0">"""
content = content.replace(old_grid_start, new_grid_start)

# 2. Add the grid start right before {/* 2. Graph */}
old_graph = """      {/* 2. Graph */}"""
new_graph = """      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">
        <article className="min-w-0">
      {/* 2. Graph */}"""
content = content.replace(old_graph, new_graph)

# 3. Clean up the extra tags near the end of the left column
# Currently, it looks like:
#         </article>
#       </div>  (Wait, did I add an extra div earlier? Let's just fix it properly)

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Moved Gold grid start to Graph")
