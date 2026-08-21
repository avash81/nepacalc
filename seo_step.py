import re

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "r", encoding="utf-8") as f:
    seo = f.read()

# 1. Replace TOC
toc_start = seo.find('const tocGroups = [')
toc_end = seo.find('export function SilverSeoToc() {')

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
  },
];

"""
if toc_start != -1 and toc_end != -1:
    seo = seo[:toc_start] + new_toc + seo[toc_end:]

# 2. Remove PricePerformanceWidget from SilverSeoToc
ppw_start = seo.find('{/* Silver Price Performance Widget */}')
desktop_toc_start = seo.find('{/* DESKTOP TOC */}')
if ppw_start != -1 and desktop_toc_start != -1:
    seo = seo[:ppw_start] + seo[desktop_toc_start:]

# 3. Clean up the Header in SilverSeoContent
header_start = seo.find('{/* Page Title & Description */}')
intro_start = seo.find('{/* 1. Today\'s Silver Price */}')
if header_start != -1 and intro_start != -1:
    # We want to replace everything between header_start and intro_start with just the <p> tag
    new_header = """{/* Page Title & Description */}
      <p className="text-slate-600 text-base font-medium leading-relaxed max-w-3xl mb-8">
        <strong>Live Silver Price in Nepal Today (2083/84)</strong> provides the latest official Chandi rates published by the Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA). Check today&apos;s silver price per tola, gram and kilogram, convert traditional Nepalese weight units instantly, and monitor daily market movements using real-time pricing and historical trend analysis.
      </p>

      """
    seo = seo[:header_start] + new_header + seo[intro_start:]

# 4. Extract Today's Silver Price Block for page.tsx
todays_silver_start = seo.find('{/* 1. Today\'s Silver Price */}')
silver_units_start = seo.find('{/* 4. Silver Units */}')
if todays_silver_start != -1 and silver_units_start != -1:
    todays_silver_block = seo[todays_silver_start:silver_units_start]
    seo = seo[:todays_silver_start] + seo[silver_units_start:]
    
    # We need to extract the parts of this block to inject into page.tsx later
    # We'll save todays_silver_block to a file so we can process it
    with open("todays_silver_block.txt", "w", encoding="utf-8") as f:
        f.write(todays_silver_block)
else:
    print("Could not find Today's Silver Price block")

# 5. Extract "Why Silver Prices Change in Nepal" block (which we need to put together)
# It contains:
# - Why Silver Prices Behave Differently Than Gold (which was inside the block we just extracted!)
# Wait, let's look inside todays_silver_block!
# Yes, "Why Silver Prices Behave Differently Than Gold" is in todays_silver_block!
# Let's extract it from todays_silver_block and put it back into SEO!

# Read todays_silver_block
with open("todays_silver_block.txt", "r", encoding="utf-8") as f:
    todays_silver_block = f.read()

behave_start = todays_silver_block.find('<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">\n            Why Silver Prices Behave Differently Than Gold')
market_snapshot_start = todays_silver_block.find('{/* Market Snapshot */}')
if behave_start != -1 and market_snapshot_start != -1:
    behave_block = todays_silver_block[behave_start:market_snapshot_start]
    todays_silver_block = todays_silver_block[:behave_start] + todays_silver_block[market_snapshot_start:]
    
    # Also grab the orphan UL that was right before Silver Units!
    orphan_ul_start = todays_silver_block.find('<ul className="list-disc list-inside space-y-2 text-slate-700 font-medium mb-6">\n            <li>International silver spot prices (XAG/USD)')
    if orphan_ul_start != -1:
        orphan_ul_block = todays_silver_block[orphan_ul_start:]
        todays_silver_block = todays_silver_block[:orphan_ul_start]
        behave_block += "\n" + orphan_ul_block
    
    # Now we have behave_block. We need to create the full "Why Prices Change" section.
    # It consists of: new H2 + behave_block + 16(Int) + 17(Exch) + 18(Daily)
    int_start = seo.find('{/* 16. International Market */}')
    ex_start = seo.find('{/* 17. Exchange Rate */}')
    daily_start = seo.find('{/* 18. Daily Volatility */}')
    why_matter_start = seo.find('{/* 19. Why Silver Prices Matter */}')
    
    if int_start != -1 and why_matter_start != -1:
        factors_block = seo[int_start:why_matter_start]
        seo = seo[:int_start] + seo[why_matter_start:]
        
        # Demote H2s to H3s
        factors_block = factors_block.replace('<h2 id="international-silver-market" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="international-silver-market" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
        factors_block = factors_block.replace('<h2 id="silver-vs-exchange-rate" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="silver-vs-exchange-rate" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
        factors_block = factors_block.replace('<h2 id="daily-price-volatility" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">', '<h3 id="daily-price-volatility" className="text-xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-20">')
        factors_block = factors_block.replace('International Silver Market\n          </h2>', 'International Silver Market\n          </h3>')
        factors_block = factors_block.replace('Silver Price vs Exchange Rate\n          </h2>', 'Silver Price vs Exchange Rate\n          </h3>')
        factors_block = factors_block.replace('Daily Price Volatility\n          </h2>', 'Daily Price Volatility\n          </h3>')
        
        new_why_section = '\n\n          {/* Why Prices Change */}\n          <h2 id="why-prices-change" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">\n            Why Silver Prices Change in Nepal\n          </h2>\n          ' + behave_block + '\n\n' + factors_block
        
        # Insert new_why_section after Silver Purity Standards (before Common Uses)
        common_uses_start = seo.find('{/* 6. Common Uses */}')
        seo = seo[:common_uses_start] + new_why_section + seo[common_uses_start:]
    
    # Save the cleaned todays_silver_block
    with open("todays_silver_block_clean.txt", "w", encoding="utf-8") as f:
        f.write(todays_silver_block)
else:
    print("Could not find behave_block inside todays_silver_block")

# 6. Reorder Buy/Sell/Jewellery/Coins BEFORE How Often Updated
buy_start = seo.find('{/* 12. Buying Silver */}')
how_often_start = seo.find('{/* 9. How Often Updated */}')
if buy_start != -1 and how_often_start != -1:
    # They are currently at the bottom (after historical trends)
    # We want them right before how_often_start
    # Historical Trends block is right before Buying Silver. We actually want to extract Historical Trends and put it in SilverHistoricalData!
    hist_start = seo.find('{/* 11. Historical Trends */}')
    if hist_start != -1:
        hist_trend_block = seo[hist_start:buy_start]
        seo = seo[:hist_start] + seo[buy_start:]
        
        # Write to Historical Data
        with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "r", encoding="utf-8") as f:
            hist_data = f.read()
        h2_marker = '<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">\n            Silver Price History in Nepal\n          </h2>'
        h3_block = hist_trend_block.replace('<h2 id="historical-silver-price-trends" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-20">\n            Historical Silver Price Trends\n          </h2>', '<h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Historical Records (Fine Silver)</h3>')
        # Remove the comment marker
        h3_block = h3_block.replace('{/* 11. Historical Trends */}\n          ', '')
        
        hist_data = hist_data.replace(h2_marker, h2_marker + '\n\n          <div className="prose prose-slate max-w-none mb-8">\n          ' + h3_block + '\n          </div>')
        with open("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx", "w", encoding="utf-8") as f:
            f.write(hist_data)
        
        # Now buy_start has shifted! Recalculate
        buy_start = seo.find('{/* 12. Buying Silver */}')
        
        # The block we want to move is from buy_start to the end (before Why Silver Prices Matter, because we already moved 16,17,18, so Why Matter is at the end)
        why_matter_start = seo.find('{/* 19. Why Silver Prices Matter */}')
        if buy_start != -1 and why_matter_start != -1:
            move_block = seo[buy_start:why_matter_start]
            seo = seo[:buy_start] + seo[why_matter_start:]
            
            # Recalculate how_often_start
            how_often_start = seo.find('{/* 9. How Often Updated */}')
            seo = seo[:how_often_start] + move_block + seo[how_often_start:]

# 7. Remove SilverHistoricalData import and component from SilverSeoSection
seo = seo.replace("import SilverHistoricalData from './SilverHistoricalData';\n", "")
seo = seo.replace("<SilverHistoricalData />\n\n          ", "")

with open("src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx", "w", encoding="utf-8") as f:
    f.write(seo)

print("SEO section processed!")
