path = "src/app/market-rates/silver-price-nepal/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add PricePerformanceWidget import if not already there
if "PricePerformanceWidget" not in content:
    content = content.replace(
        "import SilverChartClient from './SilverChartClient';",
        "import SilverChartClient from './SilverChartClient';\nimport PricePerformanceWidget from '@/components/widgets/PricePerformanceWidget';"
    )

old_outer = '<div className="max-w-[1200px] lg:ml-0 lg:mr-auto pb-12">'
new_outer = (
    '<div className="max-w-[1400px] lg:ml-0 lg:mr-auto pb-12">\n'
    '          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-8 items-start">\n'
    '          <div className="min-w-0">'
)
content = content.replace(old_outer, new_outer)

old_closing = "        </div>\n      </CalcWrapper>"
new_sidebar = (
    "          </div>\n"
    "          <aside className=\"hidden lg:block\" style={{ position: 'sticky', top: '96px', alignSelf: 'start', zIndex: 20 }}>\n"
    "            <PricePerformanceWidget\n"
    "              asset=\"Silver\"\n"
    "              source=\"FENEGOSIDA \u00b7 NPR per Tola\"\n"
    "              rows={[\n"
    "                { period: 'Today',    price: '4,985', amount: '+50',    percent: '+1.01%',   isNegative: false },\n"
    "                { period: '30 Days',  price: '4,785', amount: '+200',   percent: '+4.18%',   isNegative: false },\n"
    "                { period: '6 Months', price: '5,135', amount: '-150',   percent: '-2.92%',   isNegative: true  },\n"
    "                { period: '1 Year',   price: '4,185', amount: '+800',   percent: '+19.11%',  isNegative: false },\n"
    "                { period: '5 Year',   price: '1,485', amount: '+3,500', percent: '+235.69%', isNegative: false },\n"
    "                { period: '20 Years', price: '485',   amount: '+4,500', percent: '+927.83%', isNegative: false },\n"
    "              ]}\n"
    "            />\n"
    "          </aside>\n"
    "          </div>\n"
    "        </div>\n"
    "      </CalcWrapper>"
)
content = content.replace(old_closing, new_sidebar)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Silver fixed")
