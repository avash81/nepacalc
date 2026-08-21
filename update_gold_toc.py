import re

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
import_stmt = "import MobileCollapsible from '@/components/ui/MobileCollapsible';\n"
if "MobileCollapsible" not in content:
    content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\n" + import_stmt)

# Replace MOBILE TOC
old_toc = """      {/* MOBILE TOC */}

      <nav className="lg:hidden bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 mb-12">
        <p className="text-sm font-black text-[#202124] uppercase tracking-widest mb-4">Contents</p>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, borderLeft: "2px solid #e8eaed" }}>
          {renderToc(tocItems)}
        </ol>
      </nav>"""

new_toc = """      {/* MOBILE TOC */}
      <div className="lg:hidden mb-12">
        <MobileCollapsible title={`TABLE OF CONTENTS: ${tocItems.filter(i => !i.divider).length} SECTIONS`}>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, borderLeft: "2px solid #e8eaed" }}>
            {renderToc(tocItems)}
          </ol>
        </MobileCollapsible>
      </div>"""

content = content.replace(old_toc, new_toc)

with open('src/app/market-rates/live-gold-price/GoldDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated GoldDashboardClient.tsx mobile toc")
