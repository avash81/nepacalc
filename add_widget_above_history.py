with open('src/app/market-rates/live-gold-price/SeoSections.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import for PricePerformanceWidget at top
if "PricePerformanceWidget" not in content:
    content = content.replace(
        "import React from 'react';",
        "import React from 'react';\nimport PricePerformanceWidget from '@/components/widgets/PricePerformanceWidget';"
    )

# Add widget directly ABOVE the HistoricalData component
old_hist = "      {/* ─── ORIGINAL: Historical Data Section (Component) ─── */}\n      <HistoricalData />"
new_hist = """      {/* ─── Price Performance Widget ─── */}
      <div className="not-prose mb-8">
        <PricePerformanceWidget
          asset="Gold"
          source="FENEGOSIDA · NPR per Tola"
          rows={[
            {
              period: 'Today',
              amount: '—',
              percent: '—',
              isNegative: false,
            },
            { period: '30 Days',  amount: '+10,700',  percent: '+3.50%',    isNegative: false },
            { period: '6 Months', amount: '-4,200',   percent: '-1.30%',    isNegative: true  },
            { period: '1 Year',   amount: '+66,700',  percent: '+26.70%',   isNegative: false },
            { period: '5 Year',   amount: '+176,700', percent: '+126.21%',  isNegative: false },
            { period: '20 Year',  amount: '+300,700', percent: '+1877.60%', isNegative: false },
          ]}
        />
      </div>

      {/* ─── ORIGINAL: Historical Data Section (Component) ─── */}
      <HistoricalData />"""
content = content.replace(old_hist, new_hist)

with open('src/app/market-rates/live-gold-price/SeoSections.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated SeoSections.tsx with PricePerformanceWidget above HistoricalData")
