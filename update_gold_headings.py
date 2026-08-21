import re

# 1. Update GoldDashboardClient.tsx
with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "r", encoding="utf-8") as f:
    dashboard = f.read()

# Make sure "Today's Gold Price" is H2 (it already is)
# Make sure "Gold Price Calculator" is H2 (it already is)
# Make sure "Nepal Benchmark Gold Rates" is H2 (it is an H2, but class text-sm might make it look like a label. It's fine).

# We need to update the TOC in GoldDashboardClient.tsx!
new_toc = """const tocItems = [
  { id: 'todays-gold-price', label: "Today's Gold Price" },
  { id: 'gold-price-calculator', label: "Gold Price Calculator" },
  { id: 'live-price', label: "Nepal Benchmark Gold Rates" },
  { id: 'how-its-calculated', label: "How Gold Prices Are Calculated in Nepal" },
  { id: 'jewellery-pricing', label: "What Affects Gold Prices and Jewellery Prices?" },
  { id: 'buying-guide', label: "Before Buying Gold in Nepal" },
  { id: 'compare-gold-silver', label: "Compare Gold and Silver Prices in Nepal" },
  { id: 'gold-vs-silver', label: "Gold vs Silver Investment in Nepal" },
  { id: 'gold-price-history', label: "Gold Price History in Nepal" },
  { id: 'historical-datasets', label: "Available Gold and Silver Historical Datasets" },
  { id: 'gold-milestones', label: "Historic Gold Price Milestones in Nepal" },
  { id: 'who-updates-prices', label: "Who Updates Gold Prices in Nepal?" },
  { id: 'faq', label: "Frequently Asked Questions" },
  { id: 'archives', label: "FENEGOSIDA Archives & Reports" },
  { id: 'glossary', label: "Understanding Today's Gold Rate Terms" },
  { id: 'useful-gold-tools', label: "Useful Gold Tools" },
  { id: 'related-market-rates', label: "Related Market Rates & Tools" },
  { id: 'people-also-search', label: "People Also Search" },
  { id: 'why-trust', label: "Why Trust This Gold Price Data?" },
  { id: 'editorial-review', label: "Editorial Review & Data Governance" },
  { id: 'official-references', label: "Official Market References" },
];"""
dashboard = re.sub(r'const tocItems = \[.*?\];', new_toc, dashboard, flags=re.DOTALL)

with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "w", encoding="utf-8") as f:
    f.write(dashboard)


# 2. Update SeoSections.tsx
with open("src/app/market-rates/live-gold-price/SeoSections.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

# Fix duplicate "Gold Price Calculator Tool" H3 -> it should be removed or changed if duplicate.
# Wait, the user said "If an existing heading is inaccurate, duplicated... correct only the heading/structure."
# Let's change the H3 "Gold Price Calculator Tool" to just a div or remove the heading since H2 Gold Price Calculator already exists.
seo = seo.replace(
    '<h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-3">Gold Price Calculator Tool</h3>',
    '<div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-3">About the Calculator</div>'
)

# Market Intelligence & AI Summary -> we can keep it as an H2 if it exists, but the user target didn't include it. 
# User said: "Only keep those headings if the underlying content genuinely exists and serves a distinct purpose."
# Let's just demote it to H3 under something else? No, just keep it as H2 if we want, or remove the heading. Let's make it an H3 under "Nepal Benchmark Gold Rates"? The target structure says:
# H2: Nepal Benchmark Gold Rates
# H3: Official FENEGOSIDA Rate
seo = seo.replace(
    '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Market Intelligence &amp; AI Summary\n          </h2>',
    '<h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-6">Market Intelligence &amp; AI Summary</h3>'
)

# Update "What Affects Gold Prices and Jewellery Prices?" to match target H2
seo = seo.replace('What Affects Gold Prices and Jewellery Prices?', 'What Affects Gold Prices and Jewellery Prices?')

# Update Gold Price History in Nepal
seo = seo.replace(
    '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Gold Price History in Nepal\n          </h2>',
    '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">Gold Price History in Nepal</h2>'
)

# Fix H4s in FAQ if any
# (Wait, FAQs are H3s currently, which is correct since they are under H2: Frequently Asked Questions)

# Fix Why Trust This Gold Price Data? (it's currently "Why Trust This Data")
seo = seo.replace(
    '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-2">\n            <ShieldCheck className="w-6 h-6 text-slate-400" />\n            Why Trust This Data\n          </h2>',
    '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-2">\n            <ShieldCheck className="w-6 h-6 text-slate-400" />\n            Why Trust This Gold Price Data?\n          </h2>'
)

with open("src/app/market-rates/live-gold-price/SeoSections.tsx", "w", encoding="utf-8") as f:
    f.write(seo)

print("Headers aligned with target structure.")
