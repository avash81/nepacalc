with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Check if PricePerformanceWidget is already imported
if "PricePerformanceWidget" not in content:
    content = content.replace(
        "import SilverHistoricalData from './SilverHistoricalData';",
        "import SilverHistoricalData from './SilverHistoricalData';\nimport PricePerformanceWidget from '@/components/widgets/PricePerformanceWidget';"
    )

# Remove the PricePerformanceWidget that is incorrectly placed in the TOC section of SilverSeoSection
# (it was previously added in the TOC sidebar, not above HistoricalData)
# Add it directly before SilverHistoricalData
old_hist = "          <SilverHistoricalData />"
new_hist = """          <PricePerformanceWidget
            asset="Silver"
            source="FENEGOSIDA · NPR per Tola"
            rows={[
              { period: 'Today',    amount: '—',       percent: '—',          isNegative: false },
              { period: '30 Days',  amount: '+380',     percent: '+8.27%',     isNegative: false },
              { period: '6 Months', amount: '-290',     percent: '-5.82%',     isNegative: true  },
              { period: '1 Year',   amount: '+1,250',   percent: '+36.23%',    isNegative: false },
              { period: '5 Year',   amount: '+2,900',   percent: '+160.00%',   isNegative: false },
              { period: '20 Year',  amount: '+4,500',   percent: '+2250.00%',  isNegative: false },
            ]}
          />
          <SilverHistoricalData />"""

# Only replace first occurrence
content = content.replace(old_hist, new_hist, 1)

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Added PricePerformanceWidget above SilverHistoricalData in SilverSeoSection")
