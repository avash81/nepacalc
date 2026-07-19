import re

with open('src/app/calculator/gold-converter/Calculator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update ads sidebar to ads inContent and update the TOC links
old_ads = '''        ads={{
          sidebar: (
            <div className="hidden md:block w-full bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 shadow-sm text-left">
              <h2 className="text-[11px] font-black text-[#202124] uppercase tracking-widest mb-3">Table of Contents</h2>
              <nav className="flex flex-col gap-2 text-[12px] text-blue-600 font-medium">
                <a href="#understanding-measurements" className="hover:underline flex items-center gap-1.5">Understanding Measurements</a>
                <a href="#conversion-table" className="hover:underline flex items-center gap-1.5">Conversion Table</a>
                <a href="#pricing-calculation" className="hover:underline flex items-center gap-1.5">Pricing Calculation</a>
                <a href="#hallmark-vs-tejabi" className="hover:underline flex items-center gap-1.5">Hallmark vs Tejabi</a>
                <a href="#why-use-our-tool" className="hover:underline flex items-center gap-1.5">Why Use Our Tool</a>
              </nav>
            </div>
          )
        }}'''

new_ads = '''        ads={{
          inContent: (
            <div className="w-full bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 shadow-sm text-left mb-6">
              <h2 className="text-[11px] font-black text-[#202124] uppercase tracking-widest mb-3">Table of Contents</h2>
              <nav className="flex flex-col gap-2 text-[12px] text-blue-600 font-medium">
                <a href="#professional-guidance" className="hover:underline flex items-center gap-1.5">Professional Guidance</a>
                <a href="#understanding-measurements" className="hover:underline flex items-center gap-1.5">Understanding Measurements</a>
                <a href="#formulas" className="hover:underline flex items-center gap-1.5">Conversion Constants & Formulas</a>
              </nav>
            </div>
          )
        }}'''

# Just in case the exact string is slightly different, let's use regex
ads_pattern = r'ads=\{\{\s*sidebar:\s*\(\s*<div className="hidden md:block w-full bg-\[\#F8F9FA\].*?</div>\s*\)\s*\}\}'
content = re.sub(ads_pattern, new_ads, content, flags=re.DOTALL)

# Add ids to the headings
content = content.replace(
    '<h2 className="text-base font-bold text-[#202124] mb-3">Professional Computational Guidance',
    '<h2 id="professional-guidance" className="text-base font-bold text-[#202124] mb-3 scroll-mt-24">Professional Computational Guidance'
)

content = content.replace(
    '<h2 className="text-base font-bold text-[#202124] mb-3">📐 Understanding the Nepal Gold Measurement System',
    '<h2 id="understanding-measurements" className="text-base font-bold text-[#202124] mb-3 scroll-mt-24">📐 Understanding the Nepal Gold Measurement System'
)

content = content.replace(
    '<h2 className="text-base font-bold text-[#202124] mb-3">🧮 Mathematical Conversion Constants & Formulas',
    '<h2 id="formulas" className="text-base font-bold text-[#202124] mb-3 scroll-mt-24">🧮 Mathematical Conversion Constants & Formulas'
)

with open('src/app/calculator/gold-converter/Calculator.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
