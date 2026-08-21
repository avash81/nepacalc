import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

new_toc = """const tocGroups = [
  {
    items: [
      { id: 'todays-silver-price', label: "Today's Silver Price" },
      { id: 'silver-calculator', label: 'Quick Silver Valuation Calculator' },
      { id: 'silver-price-history', label: 'Silver Price History in Nepal' },
      { id: 'silver-units-nepal', label: 'Silver Units Used in Nepal' },
      { id: 'silver-purity-standards', label: 'Silver Purity Standards' },
      { id: 'why-prices-change', label: 'Why Silver Prices Change in Nepal' },
      { id: 'common-uses-silver-nepal', label: 'Common Uses of Silver in Nepal' },
      { id: 'silver-as-investment', label: 'Silver as an Investment' },
      { id: 'gold-vs-silver-prices', label: 'Gold vs Silver Prices' },
      { id: 'buying-silver-nepal', label: 'Buying Silver in Nepal' },
      { id: 'selling-silver-nepal', label: 'Selling Silver in Nepal' },
      { id: 'silver-jewellery-pricing', label: 'Silver Jewellery Pricing' },
      { id: 'silver-coins-bullion', label: 'Silver Coins and Bullion' },
      { id: 'how-often-updated', label: 'How Often Are Silver Prices Updated?' },
      { id: 'who-uses-silver-price-data', label: 'Who Uses Silver Price Data?' },
      { id: 'why-silver-prices-matter', label: 'Why Silver Prices Matter' },
      { id: 'silver-metrics', label: 'Frequently Monitored Silver Metrics' },
      { id: 'faq', label: 'Frequently Asked Questions' },
      { id: 'related-tools', label: 'Related Calculators' },
    ]
  }
];"""

# Replace anything from const tocGroups = [ up to ]; right before export function SilverSeoToc() {
content = re.sub(r'const tocGroups = \[\s*\{.*?\s*\];\s*(?=export function SilverSeoToc)', new_toc + '\n\n', content, flags=re.DOTALL)

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
    f.write(content)
