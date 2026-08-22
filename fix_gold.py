path = "src/app/market-rates/live-gold-price/GoldDashboardClient.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_chart = """            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-6 items-start">
              <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden relative mb-6 lg:mb-0">
                <TradingViewWidget
                  symbol="OANDA:XAUUSD"
                  theme="light"
                  containerId="tv_chart_gold_main"
                />
              </div>
              <div style={{ position: 'sticky', top: '96px', alignSelf: 'start', zIndex: 10 }}>
                <PricePerformanceWidget
                    asset="Gold"
                    source="FENEGOSIDA \u00b7 NPR per Tola"
                    rows={[
                      {
                        period: 'Today',
                        price: fmt(tolaNPR.current),
                        amount: tolaNPR.change24h != null ? `${tolaNPR.change24h >= 0 ? '+' : ''}${Math.round(tolaNPR.change24h).toLocaleString('en-IN')}` : '\u2014',
                        percent: tolaNPR.changePercent24h != null ? `${tolaNPR.changePercent24h >= 0 ? '+' : ''}${tolaNPR.changePercent24h.toFixed(2)}%` : '\u2014',
                        isNegative: (tolaNPR.changePercent24h ?? 0) < 0,
                      },
                      { period: '30 Days',  price: '3,06,000', amount: '+10,700',  percent: '+3.50%',    isNegative: false },
                      { period: '6 Months', price: '3,20,900', amount: '-4,200',   percent: '-1.30%',    isNegative: true  },
                      { period: '1 Year',   price: '2,50,000', amount: '+66,700',  percent: '+26.70%',   isNegative: false },
                      { period: '5 Year',   price: '1,40,000', amount: '+176,700', percent: '+126.21%',  isNegative: false },
                      { period: '20 Year',  price: '16,000',   amount: '+300,700', percent: '+1877.60%', isNegative: false },
                    ]}
                  />
              </div>
            </div>"""

new_chart = """            <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden relative mb-6 lg:mb-0">
                <TradingViewWidget
                  symbol="OANDA:XAUUSD"
                  theme="light"
                  containerId="tv_chart_gold_main"
                />
              </div>"""
content = content.replace(old_chart, new_chart)

old_outer = '<div className="max-w-[1200px] lg:ml-0 lg:mr-auto pb-12">'
new_outer = """<div className="max-w-[1400px] lg:ml-0 lg:mr-auto pb-12">
      {/* Page-level layout */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-8 items-start">
      {/* === MAIN === */}
      <div className="min-w-0">"""
content = content.replace(old_outer, new_outer)

old_closing = """    </div>
  );
}"""
new_closing = """      </div>
      {/* === SIDEBAR === */}
      <aside className="hidden lg:block" style={{ position: 'sticky', top: '96px', alignSelf: 'start', zIndex: 20 }}>
        <PricePerformanceWidget
          asset="Gold"
          source="FENEGOSIDA \u00b7 NPR per Tola"
          rows={[
            {
              period: 'Today',
              price: fmt(tolaNPR.current),
              amount: tolaNPR.change24h != null ? `${tolaNPR.change24h >= 0 ? '+' : ''}${Math.round(tolaNPR.change24h).toLocaleString('en-IN')}` : '\u2014',
              percent: tolaNPR.changePercent24h != null ? `${tolaNPR.changePercent24h >= 0 ? '+' : ''}${tolaNPR.changePercent24h.toFixed(2)}%` : '\u2014',
              isNegative: (tolaNPR.changePercent24h ?? 0) < 0,
            },
            { period: '30 Days',  price: '3,06,000', amount: '+10,700',  percent: '+3.50%',    isNegative: false },
            { period: '6 Months', price: '3,20,900', amount: '-4,200',   percent: '-1.30%',    isNegative: true  },
            { period: '1 Year',   price: '2,50,000', amount: '+66,700',  percent: '+26.70%',   isNegative: false },
            { period: '5 Year',   price: '1,40,000', amount: '+176,700', percent: '+126.21%',  isNegative: false },
            { period: '20 Year',  price: '16,000',   amount: '+300,700', percent: '+1877.60%', isNegative: false },
          ]}
        />
      </aside>
      </div>
    </div>
  );
}"""
content = content.replace(old_closing, new_closing)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Gold fixed")
