path = "src/app/market-rates/live-gold-price/GoldDashboardClient.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# ---- Step 1: Remove widget from inside chart grid, make chart full-width ----
old_chart_grid = '''            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-6 items-start">
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
                    source="FENEGOSIDA · NPR per Tola"
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
            </div>'''

new_chart_only = '''            <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden relative">
                <TradingViewWidget
                  symbol="OANDA:XAUUSD"
                  theme="light"
                  containerId="tv_chart_gold_main"
                />
              </div>'''

content = content.replace(old_chart_grid, new_chart_only)

# ---- Step 2: Change outer wrapper to a two-column layout ----
old_outer = '<div className="max-w-[1200px] lg:ml-0 lg:mr-auto pb-12">'
new_outer = '''<div className="max-w-[1400px] lg:ml-0 lg:mr-auto pb-12">
      {/* Page-level layout: main content + right sticky sidebar */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-6 items-start">
      {/* === MAIN CONTENT COLUMN === */}
      <div className="min-w-0">'''

content = content.replace(old_outer, new_outer)

# ---- Step 3: Before the closing </div> of the outer wrapper, close main column and add sidebar ----
gold_widget_sidebar = '''      </div>
      {/* === RIGHT STICKY SIDEBAR === */}
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
      </div>'''

# The last closing </div> before ); is line 640 which closes the outer wrapper
# We replace the last    </div>\n  );\n}
old_closing = '''    </div>
  );
}'''
new_closing = gold_widget_sidebar + '''
  );
}'''

content = content.replace(old_closing, new_closing)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Gold restructured successfully")
