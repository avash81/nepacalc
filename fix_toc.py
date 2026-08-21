import re

with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "r", encoding="utf-8") as f:
    dashboard = f.read()

new_toc = """const tocItems: { id?: string; label?: string; divider?: boolean }[] = [
  { id: 'todays-gold-price', label: "Today's Gold Price" },
  { id: 'gold-price-calculator', label: "Gold Price Calculator" },
  { id: 'live-price', label: "Nepal Benchmark Gold Rates" },
  { divider: true },
  { id: 'how-its-calculated', label: "How Gold Prices Are Calculated in Nepal" },
  { id: 'jewellery-pricing', label: "What Affects Gold Prices and Jewellery Prices?" },
  { id: 'buying-guide', label: "Before Buying Gold in Nepal" },
  { id: 'compare-gold-silver', label: "Compare Gold and Silver Prices in Nepal" },
  { id: 'gold-vs-silver', label: "Gold vs Silver Investment in Nepal" },
  { divider: true },
  { id: 'gold-price-history', label: "Gold Price History in Nepal" },
  { id: 'historical-datasets', label: "Available Gold and Silver Historical Datasets" },
  { id: 'gold-milestones', label: "Historic Gold Price Milestones in Nepal" },
  { id: 'who-updates-prices', label: "Who Updates Gold Prices in Nepal?" },
  { divider: true },
  { id: 'faq', label: "Frequently Asked Questions" },
  { id: 'archives', label: "FENEGOSIDA Archives & Reports" },
  { id: 'glossary', label: "Understanding Today's Gold Rate Terms" },
  { id: 'useful-gold-tools', label: "Useful Gold Tools" },
  { id: 'related-market-rates', label: "Related Market Rates & Tools" },
  { id: 'people-also-search', label: "People Also Search" },
  { divider: true },
  { id: 'why-trust', label: "Why Trust This Gold Price Data?" },
  { id: 'editorial-review', label: "Editorial Review & Data Governance" },
  { id: 'official-references', label: "Official Market References" },
];"""

dashboard = re.sub(r'const tocItems = \[.*?\];', new_toc, dashboard, flags=re.DOTALL)

with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "w", encoding="utf-8") as f:
    f.write(dashboard)
print("Updated tocItems with explicit type and dividers")
