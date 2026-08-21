import os
import re

# 1. We need to add the nb-toc CSS to a common file or inject it into both pages.
nb_css = """
<style dangerouslySetInnerHTML={{ __html: `
.nb-toc-mobile{max-width:1200px;margin:0 auto 14px;padding:0 24px;display:none;}
.nb-toc-mobile details{border:1px solid #e2e8f0;background:#f8fafc;border-radius:8px;}
.nb-toc-mobile summary{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:#0f172a;padding:12px 16px;cursor:pointer;user-select:none;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:700;}
.nb-toc-mobile summary::after{content:'▼';font-size:0.6rem;transition:transform 0.2s;}
.nb-toc-mobile details[open] summary::after{transform:rotate(180deg);}
.nb-toc-mobile ol{list-style:none;margin:0;padding:0 16px 16px;columns:1;}
.nb-toc-mobile li{break-inside:avoid;margin-bottom:8px;}
.nb-toc-mobile a{display:block;font-size:0.875rem;color:#334155;text-decoration:none;line-height:1.4;font-weight:500;}
.nb-toc-mobile a:hover{color:#2563eb;}
.nb-toc-mobile .nb-toc-num{font-family:ui-monospace,SFMono-Regular,monospace;font-size:0.7rem;color:#94a3b8;margin-right:8px;font-weight:700;}

.nb-toc{position:sticky;top:88px;align-self:start;overflow-y:auto;max-height:calc(100vh - 100px);scrollbar-width:thin;padding-right:12px;}
.nb-toc::-webkit-scrollbar{width:4px;}
.nb-toc::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px;}
.nb-toc-head{font-family:ui-monospace,SFMono-Regular,monospace;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;margin:0 0 12px;display:block;}
.nb-toc ol{list-style:none;margin:0;padding:0;border-left:2px solid #e2e8f0;}
.nb-toc a{display:block;padding:6px 0 6px 14px;font-size:0.875rem;color:#475569;text-decoration:none;border-left:2px solid transparent;margin-left:-2px;line-height:1.4;font-weight:500;}
.nb-toc a:hover{border-left-color:#2563eb;color:#2563eb;background:#f8fafc;}
.nb-toc-num{font-family:ui-monospace,SFMono-Regular,monospace;font-size:0.7rem;color:#94a3b8;margin-right:8px;font-weight:700;}
.nb-toc-divider{height:1px;background:#e2e8f0;margin:12px 0;}

@media(max-width:1024px){
  .nb-toc{display:none;}
  .nb-toc-mobile{display:block;}
}
`}} />
"""

# SILVER PAGE
page_path = "src/app/market-rates/silver-price-nepal/page.tsx"
with open(page_path, "r", encoding="utf-8") as f:
    page = f.read()

# Insert the style
if "<style dangerouslySetInnerHTML" not in page:
    page = page.replace('<div className="bg-white min-h-screen">', '<div className="bg-white min-h-screen">\n      ' + nb_css)

# Wait, we need to ensure the PricePerformanceWidget is in the right sidebar ABOVE the TOC.
# The right sidebar is currently: <aside className="hidden lg:block sticky top-24 self-start"><SilverSeoToc /></aside>
widget_code_silver = """
            <aside className="nb-toc">
              <div className="mb-8">
                <PricePerformanceWidget
                  asset="Silver"
                  source="silverprice.org - 14:31 NY Time"
                  rows={[
                    { period: 'Today', amount: '+1.51', percent: '+2.23%', isNegative: false },
                    { period: '30 Days', amount: '+10.25', percent: '+17.74%', isNegative: false },
                    { period: '6 Months', amount: '-18.77', percent: '-21.63%', isNegative: true },
                    { period: '1 Year', amount: '+29.14', percent: '+74.92%', isNegative: false },
                    { period: '5 Year', amount: '+45.03', percent: '+195.80%', isNegative: false },
                    { period: '20 Years', amount: '+55.82', percent: '+456.99%', isNegative: false },
                  ]}
                />
              </div>
              <SilverSeoToc />
            </aside>
"""

# Replace the old aside with the new aside
page = re.sub(r'<aside className="hidden lg:block sticky top-24 self-start">\s*<SilverSeoToc />\s*</aside>', widget_code_silver, page)

# Remove the PricePerformanceWidget from the main column (if it's there)
# I added it above SilverHistoricalData in a previous step, so let's remove it from there.
main_col_widget = r'<div className="mb-8">\s*<PricePerformanceWidget[\s\S]*?/>\s*</div>\s*<SilverHistoricalData />'
page = re.sub(main_col_widget, '<SilverHistoricalData />', page)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page)


# SILVER SEO SECTION (TOC RENDERER)
seo_path = "src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx"
with open(seo_path, "r", encoding="utf-8") as f:
    seo = f.read()

# Replace SilverSeoToc
new_toc = """
export function SilverSeoToc() {
  let counter = 0;
  return (
    <>
      <span className="nb-toc-head">On this page</span>
      <ol>
        {tocGroups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <div className="nb-toc-divider" />}
            {group.items.map((item, ii) => {
              counter++;
              const numStr = counter.toString().padStart(2, '0');
              return (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    <span className="nb-toc-num">{numStr}</span>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </React.Fragment>
        ))}
      </ol>
    </>
  );
}
"""

seo = re.sub(r'export function SilverSeoToc\(\) \{[\s\S]*?(?=export function SilverSeoContent)', new_toc + '\n\n', seo)
with open(seo_path, "w", encoding="utf-8") as f:
    f.write(seo)


# GOLD DASHBOARD CLIENT
gold_path = "src/app/market-rates/live-gold-price/GoldDashboardClient.tsx"
with open(gold_path, "r", encoding="utf-8") as f:
    gold = f.read()

if "<style dangerouslySetInnerHTML" not in gold:
    gold = gold.replace('<div className="min-h-screen bg-slate-50/50">', '<div className="min-h-screen bg-slate-50/50">\n      ' + nb_css)

widget_code_gold = """
            <aside className="nb-toc">
              <div className="mb-8">
                <PricePerformanceWidget
                  asset="Gold"
                  source="goldprice.org - 14:31 NY Time"
                  rows={[
                    { period: 'Today', amount: '+109.30', percent: '+2.42%', isNegative: false },
                    { period: '30 Days', amount: '+465.82', percent: '+11.51%', isNegative: false },
                    { period: '6 Months', amount: '-692.51', percent: '-13.30%', isNegative: true },
                    { period: '1 Year', amount: '+1,140.80', percent: '+33.83%', isNegative: false },
                    { period: '5 Year', amount: '+2,734.95', percent: '+153.78%', isNegative: false },
                    { period: '20 Years', amount: '+3,888.82', percent: '+622.60%', isNegative: false },
                  ]}
                />
              </div>
"""

# Find where the gold TOC is rendered
# The gold TOC is rendered as `<aside className="hidden lg:block lg:sticky top-24 self-start ...`
gold = re.sub(r'<aside className="hidden lg:block lg:sticky top-24 self-start[^>]*>', widget_code_gold, gold)

# And replace the Gold TOC rendering logic inside the aside to match `nb-toc`
gold_toc_render = """
      <span className="nb-toc-head">On this page</span>
      <ol>
        {items.map((entry, idx) => {
          if (entry.divider) {
            return <div key={`div-${idx}`} className="nb-toc-divider" />;
          }
          const numStr = (idx + 1).toString().padStart(2, '0');
          return (
            <li key={entry.id}>
              <a href={`#${entry.id}`}>
                <span className="nb-toc-num">{numStr}</span>
                {entry.label}
              </a>
            </li>
          );
        })}
      </ol>
"""

# Replace `renderToc(tocItems)` with `gold_toc_render`
gold = re.sub(r'\{renderToc\(tocItems\)\}', gold_toc_render, gold)

# Also remove the <PricePerformanceWidget> from the main column if it's there
gold_main_col_widget = r'<div className="mb-8">\s*<PricePerformanceWidget[\s\S]*?/>\s*</div>\s*<HistoricalData />'
gold = re.sub(gold_main_col_widget, '<HistoricalData />', gold)

with open(gold_path, "w", encoding="utf-8") as f:
    f.write(gold)


# 4. Add the Date Picker Mockup to SilverHistoricalData and HistoricalData (Gold)
picker_ui = """
      {/* Custom Date Picker Mockup */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-slate-900">Start Date</span>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-500 hover:border-slate-300 hover:bg-slate-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Pick a date
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-slate-900">End Date</span>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-500 hover:border-slate-300 hover:bg-slate-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Pick a date
            </button>
          </div>
        </div>
        
        <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-1 shrink-0 self-stretch sm:self-auto items-center">
          <button className="flex-1 sm:flex-none px-6 py-2 bg-[#ff0000] text-white text-sm font-bold rounded-md shadow-sm">
            Per Tola
          </button>
          <button className="flex-1 sm:flex-none px-6 py-2 text-slate-600 text-sm font-medium hover:text-slate-900">
            Per 10g
          </button>
        </div>
      </div>
"""

def add_picker(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Insert picker right after the History H2
    content = re.sub(r'(<h2[^>]*>.*?</h2>)', r'\1\n' + picker_ui, content, count=1)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

add_picker("src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx")
add_picker("src/app/market-rates/live-gold-price/HistoricalData.tsx")

print("Done")
