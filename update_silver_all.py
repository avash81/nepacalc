import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

with open("src/app/market-rates/silver-price-nepal/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

# 1. Clean up SilverSeoSection.tsx: remove the intro paragraphs entirely. We'll manually insert them in page.tsx if needed.
seo = re.sub(r'<header className="mb-6 pb-4 border-b border-slate-200">\s*<p.*?</header>', '', seo, flags=re.DOTALL)
seo = re.sub(r'\{/\* Intro Text below Calculator \*/\}\s*<div.*?</div>', '', seo, flags=re.DOTALL)

# Let's get the extracted block from earlier
with open("extracted_silver.txt", "r", encoding="utf-8") as f:
    extracted = f.read()

# I will just put the entire "Today's Silver Price" (which has the H2, paragraphs, Market Snapshot, etc.)
# into page.tsx right above the Calculator link, but AFTER the Quick Answer.
# Wait, "Today's Silver Price" is the parent of Quick Answer!
# So we need to inject `<h2 id="todays-silver-price" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24">Today's Silver Price</h2>` BEFORE `quick-answer` in page.tsx.

# Let's add the H2 in page.tsx before quick-answer:
quick_answer_marker = '<div id="quick-answer" className="quick-answer-block'
if quick_answer_marker in page:
    page = page.replace(quick_answer_marker, '<h2 id="todays-silver-price" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24">Today\'s Silver Price</h2>\n                  <div id="quick-answer" className="quick-answer-block')

# Now inject the REST of extracted_silver (without the H2 Today's Silver Price, because we just manually placed it)
extracted_no_h2 = re.sub(r'<h2 id="todays-silver-price".*?</h2>', '', extracted, flags=re.DOTALL)

# The rest of the extracted block is wrapped in prose. We should inject it into page.tsx after quick-answer and before the calculator link.
calc_marker = '<h2 id="silver-calculator"'
if calc_marker in page:
    page = page.replace(calc_marker, '<div className="prose prose-slate max-w-none mt-8 mb-8">\n' + extracted_no_h2 + '\n</div>\n                ' + calc_marker)

# Also, update SilverSeoSection.tsx TOC to match the new structure
new_toc = """  const tocGroups = [
    {
      items: [
        { id: 'todays-silver-price', label: "Today's Silver Price" },
        { id: 'silver-calculator', label: "Quick Silver Valuation Calculator" },
        { id: 'silver-price-history', label: 'Silver Price History in Nepal' },
        { id: 'silver-units-nepal', label: 'Silver Units Used in Nepal' },
        { id: 'silver-purity-standards', label: 'Silver Purity Standards' },
        { id: 'why-prices-change', label: 'Why Silver Prices Change in Nepal' },
        { id: 'common-uses-silver-nepal', label: 'Common Uses of Silver in Nepal' },
        { id: 'silver-as-investment', label: 'Silver as an Investment' },
        { id: 'gold-vs-silver-prices', label: 'Difference Between Gold and Silver Prices' },
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
seo = re.sub(r'const tocGroups = \[.*?\];', new_toc, seo, flags=re.DOTALL)

# Add id="related-tools" to the Related Calculators heading if it exists
seo = seo.replace('<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Related Calculators', '<h2 id="related-tools" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Related Calculators')
seo = seo.replace('<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">Related Calculators', '<h2 id="related-tools" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">Related Calculators')

with open("src/app/market-rates/silver-price-nepal/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
    f.write(seo)
print("Updated page.tsx and SilverSeoSection.tsx")
