import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

widget_code = """
      {/* MOBILE PRICE PERFORMANCE WIDGET */}
      <div className="lg:hidden mb-6">
        <PricePerformanceWidget
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
        />
      </div>

      {/* MOBILE TOC */}
"""

content = content.replace("      {/* MOBILE TOC */}", widget_code)

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added mobile widget to Gold page")
