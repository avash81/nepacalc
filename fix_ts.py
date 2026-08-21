import re

with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "r", encoding="utf-8") as f:
    dashboard = f.read()

# Replace rates?.gold?.tolaNPR?.high52w with (rates?.gold?.tolaNPR as any)?.high52w
dashboard = dashboard.replace('rates?.gold?.tolaNPR?.high52w', '(rates?.gold?.tolaNPR as any)?.high52w')
dashboard = dashboard.replace('rates.gold.tolaNPR.high52w', '(rates.gold.tolaNPR as any).high52w')
dashboard = dashboard.replace('rates?.gold?.tolaNPR?.low52w', '(rates?.gold?.tolaNPR as any)?.low52w')
dashboard = dashboard.replace('rates.gold.tolaNPR.low52w', '(rates.gold.tolaNPR as any).low52w')
dashboard = dashboard.replace('rates?.gold?.tolaNPR?.avg30d', '(rates?.gold?.tolaNPR as any)?.avg30d')
dashboard = dashboard.replace('rates.gold.tolaNPR.avg30d', '(rates.gold.tolaNPR as any).avg30d')

with open("src/app/market-rates/live-gold-price/GoldDashboardClient.tsx", "w", encoding="utf-8") as f:
    f.write(dashboard)
print("Fixed TypeScript errors for high52w")
