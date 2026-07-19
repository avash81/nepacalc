import re

with open('src/app/calculator/gold-converter/Calculator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The user wants the TOC below the calculator. We will replace the entire ads block.
# We will use string.split() and string joining to reliably replace it.

start_marker = 'ads={{'
end_marker = '}}'

start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx) + len(end_marker)
    
    new_ads = '''ads={{
          inContent: (
            <div className="w-full bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 shadow-sm text-left mb-6 mt-6">
              <h2 className="text-[11px] font-black text-[#202124] uppercase tracking-widest mb-3">Table of Contents</h2>
              <nav className="flex flex-col gap-2 text-[12px] text-blue-600 font-medium">
                <a href="#understanding-measurements" className="hover:underline flex items-center gap-1.5">Understanding Measurements</a>
                <a href="#conversion-table" className="hover:underline flex items-center gap-1.5">Conversion Table</a>
                <a href="#official-standard" className="hover:underline flex items-center gap-1.5">Official Standard</a>
              </nav>
            </div>
          )
        }}'''
        
    content = content[:start_idx] + new_ads + content[end_idx:]

with open('src/app/calculator/gold-converter/Calculator.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
