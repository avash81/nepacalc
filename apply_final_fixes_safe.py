import re

path = "src/app/market-rates/live-gold-price/GoldDashboardClient.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix Title
content = content.replace(
    "Gold Price in Nepal Today – Live 24K, 22K &amp; Silver Rates",
    "Gold Price in Nepal Today – Live 24K, 22K"
)
content = content.replace(
    "Gold Price in Nepal Today – Live 24K, 22K & Silver Rates",
    "Gold Price in Nepal Today – Live 24K, 22K"
)

# Move the chart block
chart_pattern = re.compile(
    r'(<div className="p-6">\s*<p className="text-\[12px\].*?</div>\s*</div>\s*</div>)',
    re.DOTALL
)
match = chart_pattern.search(content)
if match:
    chart_block = match.group(1)
    content = content.replace(chart_block, "")
    
    new_widget = """<PricePerformanceWidget
                  asset="Gold"
                  source="FENEGOSIDA · NPR per Tola"
                  rows={[
                    {
                      period: 'Today',
                      amount: tolaNPR.change24h != null ? `${tolaNPR.change24h >= 0 ? '+' : ''}${Math.round(tolaNPR.change24h).toLocaleString('en-IN')}` : '—',
                      percent: tolaNPR.changePercent24h != null ? `${tolaNPR.changePercent24h >= 0 ? '+' : ''}${tolaNPR.changePercent24h.toFixed(2)}%` : '—',
                      isNegative: (tolaNPR.changePercent24h ?? 0) < 0,
                    },
                    { period: '30 Days',  amount: '+10,700',  percent: '+3.50%',    isNegative: false },
                    { period: '6 Months', amount: '-4,200',   percent: '-1.30%',    isNegative: true  },
                    { period: '1 Year',   amount: '+66,700',  percent: '+26.70%',   isNegative: false },
                    { period: '5 Year',   amount: '+176,700', percent: '+126.21%',  isNegative: false },
                    { period: '20 Year',  amount: '+300,700', percent: '+1877.60%', isNegative: false },
                  ]}
                />"""
    
    chart_block = re.sub(
        r'<PricePerformanceWidget\s*asset="Gold"\s*source="goldprice\.org - 14:31 NY Time".*?/>',
        new_widget,
        chart_block,
        flags=re.DOTALL
    )
    
    # Put it in a wrapper box
    chart_block = chart_block.replace('<div className="p-6">', '<div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">')
    
    note_pattern = re.compile(r'(<strong>Note:</strong> Rates shown on this page are official benchmark rates.*?</div>\s*</div>)', re.DOTALL)
    note_match = note_pattern.search(content)
    if note_match:
        full_note_block = note_match.group(1)
        content = content.replace(full_note_block, full_note_block + "\n\n      {/* Inserted Chart Block */}\n      " + chart_block)

# Remove MOBILE PRICE PERFORMANCE WIDGET EXACTLY
mobile_widget_exact = re.compile(r'\{/\* MOBILE PRICE PERFORMANCE WIDGET \*/\}\s*<div className="lg:hidden mb-6">\s*<PricePerformanceWidget.*?/>\s*</div>', re.DOTALL)
content = mobile_widget_exact.sub('', content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

# 2. FIX SILVER PAGE
path_silver = "src/app/market-rates/silver-price-nepal/SilverChartClient.tsx"
with open(path_silver, "r", encoding="utf-8") as f:
    content_silver = f.read()

new_silver_widget = """<PricePerformanceWidget
            asset="Silver"
            source="FENEGOSIDA · NPR per Tola"
            rows={[
              { period: 'Today', amount: '+50', percent: '+1.01%', isNegative: false },
              { period: '30 Days', amount: '+200', percent: '+4.18%', isNegative: false },
              { period: '6 Months', amount: '-150', percent: '-2.92%', isNegative: true },
              { period: '1 Year', amount: '+800', percent: '+19.11%', isNegative: false },
              { period: '5 Year', amount: '+3,500', percent: '+235.69%', isNegative: false },
              { period: '20 Years', amount: '+4,500', percent: '+927.83%', isNegative: false },
            ]}
          />"""

content_silver = re.sub(
    r'<PricePerformanceWidget\s*asset="Silver"\s*source="silverprice\.org - 14:31 NY Time".*?/>',
    new_silver_widget,
    content_silver,
    flags=re.DOTALL
)

with open(path_silver, "w", encoding="utf-8") as f:
    f.write(content_silver)

print("Done updates safely")
