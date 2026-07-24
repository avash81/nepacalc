import re

filepath = r"c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\app\calculator\kukl-bill\KuklSeoContent.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Make sure all sections have their IDs for TOC to work correctly

replacements = {
    # Phase 8
    '<h2 className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight">KUKL Water Bill Examples</h2>': '<h2 id="examples" className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight scroll-mt-24">KUKL Water Bill Examples</h2>',
    '<section className="scroll-mt-24">\n        <h2 id="examples"': '<section id="examples" className="scroll-mt-24">\n        <h2', # if I used section somewhere else without id
    
    # Phase 9
    '<h2 className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight">Check and Pay Your KUKL Water Bill Online</h2>': '<h2 id="online-payment" className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight scroll-mt-24">Check and Pay Your KUKL Water Bill Online</h2>',
    
    # Phase 10
    '<h2 className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight">Drinking Water Quality Standards in Nepal</h2>': '<h2 id="water-quality" className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight scroll-mt-24">Drinking Water Quality Standards in Nepal</h2>',
    
    # Phase 11
    '<h2 className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight">Frequently Asked Questions</h2>': '<h2 id="faqs" className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight scroll-mt-24">Frequently Asked Questions</h2>'
}

for old, new_ in replacements.items():
    content = content.replace(old, new_)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed TOC IDs.")
