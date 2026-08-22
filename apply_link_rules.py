import os
import re

# 1. Update Graphing Calculator tool page (src/app/engineering/graphing/page.tsx)
path1 = "src/app/engineering/graphing/page.tsx"
with open(path1, "r", encoding="utf-8") as f:
    content1 = f.read()

# Make sure Mathematical Formula Library is in the Related Calculators block
# Currently we only have Matrix Calculator and 3D Geometry because I deduplicated everything else.
# Let's rebuild the Related Calculators grid in graphing/page.tsx
related_block_regex = r'<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 not-prose">.*?</div>'
new_related_block = """<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 not-prose">
              <Link href="/calculator/matrices/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">Matrix Calculator</span>
              </Link>
              <Link href="/calculator/geometry-3d/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">3D Geometry</span>
              </Link>
              <Link href="/engineering/formulas/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">Mathematical Formula Library</span>
              </Link>
            </div>"""

content1 = re.sub(related_block_regex, new_related_block, content1, flags=re.DOTALL)
with open(path1, "w", encoding="utf-8") as f:
    f.write(content1)


# 2. Update Graphing Guide page (src/app/engineering/graphing-calculator-guide/page.tsx)
path2 = "src/app/engineering/graphing-calculator-guide/page.tsx"
with open(path2, "r", encoding="utf-8") as f:
    content2 = f.read()

# Replace the "Additional Math Tools" section with a proper "Related Math & Engineering Tools" section
# And also append NIST DLMF under Mathematical References (since it was lost during deduplication)
# The text currently is:
#           <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl not-prose">
#             <span className="font-bold text-slate-900 block mb-2">Additional Math Tools</span>
#             <p className="text-slate-600 text-sm mb-4">
#               For numerical calculations that don't require graphing, see the <Link href="/calculator/scientific-calculator/" className="text-blue-600 hover:underline font-medium">Scientific Calculator</Link>. 
#               For matrix operations and related calculations, see the <Link href="/calculator/matrices/" className="text-blue-600 hover:underline font-medium">Matrix Calculator</Link>.
#             </p>
#           </div>

old_additional = r'<div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl not-prose">.*?</div>'
new_additional = """<h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2">Mathematical References</h2>
          <p className="mb-8">
            For further technical study and advanced mathematical definitions, consult the <a href="https://dlmf.nist.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NIST Digital Library of Mathematical Functions (DLMF)</a>.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6 border-b border-slate-100 pb-2">Related Math &amp; Engineering Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 not-prose">
            <Link href="/calculator/scientific-calculator/" className="block p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <span className="font-bold text-slate-800 group-hover:text-blue-700 block mb-1">Scientific Calculator</span>
              <span className="text-sm text-slate-500">Perform numerical calculations and evaluate common mathematical functions.</span>
            </Link>
            <Link href="/calculator/matrices/" className="block p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <span className="font-bold text-slate-800 group-hover:text-blue-700 block mb-1">Matrix Calculator</span>
              <span className="text-sm text-slate-500">Work with matrices and common matrix operations.</span>
            </Link>
            <Link href="/calculator/geometry-3d/" className="block p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <span className="font-bold text-slate-800 group-hover:text-blue-700 block mb-1">3D Geometry</span>
              <span className="text-sm text-slate-500">Explore three-dimensional geometric calculations and relationships.</span>
            </Link>
          </div>"""

content2 = re.sub(old_additional, new_additional, content2, flags=re.DOTALL)

with open(path2, "w", encoding="utf-8") as f:
    f.write(content2)

print("Applied final deduplication and external link placement rules")
