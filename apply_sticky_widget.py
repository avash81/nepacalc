import re

path = "src/app/market-rates/live-gold-price/GoldDashboardClient.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Make grid wider for the graph, and widget sticky
content = content.replace(
    'className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6"',
    'className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6 items-start"'
)

content = content.replace(
    '<div className="w-full">\n                  <PricePerformanceWidget',
    '<div className="w-full lg:sticky lg:top-[88px]">\n                  <PricePerformanceWidget'
)

# Replace the rows in the PricePerformanceWidget
new_widget = """<PricePerformanceWidget
                    asset="Gold"
                    source="FENEGOSIDA · NPR per Tola"
                    rows={[
                      {
                        period: 'Today',
                        price: fmt(tolaNPR.current),
                        amount: tolaNPR.change24h != null ? `${tolaNPR.change24h >= 0 ? '+' : ''}${Math.round(tolaNPR.change24h).toLocaleString('en-IN')}` : '—',
                        percent: tolaNPR.changePercent24h != null ? `${tolaNPR.changePercent24h >= 0 ? '+' : ''}${tolaNPR.changePercent24h.toFixed(2)}%` : '—',
                        isNegative: (tolaNPR.changePercent24h ?? 0) < 0,
                      },
                      { period: '30 Days',  price: '3,06,000', amount: '+10,700',  percent: '+3.50%',    isNegative: false },
                      { period: '6 Months', price: '3,20,900', amount: '-4,200',   percent: '-1.30%',    isNegative: true  },
                      { period: '1 Year',   price: '2,50,000', amount: '+66,700',  percent: '+26.70%',   isNegative: false },
                      { period: '5 Year',   price: '1,40,000', amount: '+176,700', percent: '+126.21%',  isNegative: false },
                      { period: '20 Year',  price: '16,000',   amount: '+300,700', percent: '+1877.60%', isNegative: false },
                    ]}
                  />"""

content = re.sub(
    r'<PricePerformanceWidget\s*asset="Gold".*?/>',
    new_widget,
    content,
    flags=re.DOTALL
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

# Fix silver chart layout too
path_silver = "src/app/market-rates/silver-price-nepal/SilverChartClient.tsx"
with open(path_silver, "r", encoding="utf-8") as f:
    content_silver = f.read()

content_silver = content_silver.replace(
    'className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6"',
    'className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6 items-start"'
)
content_silver = content_silver.replace(
    '<div className="w-full">\n            <PricePerformanceWidget',
    '<div className="w-full lg:sticky lg:top-[88px]">\n            <PricePerformanceWidget'
)

with open(path_silver, "w", encoding="utf-8") as f:
    f.write(content_silver)

print("Updates applied")
