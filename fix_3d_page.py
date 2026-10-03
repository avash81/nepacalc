import re, sys

path = 'src/app/engineering/3d/page.tsx'
with open(path, 'rb') as f:
    content = f.read().decode('utf-8')

# ── 1. Fix the header ────────────────────────────────────────────────────────
# Find the header div by unique anchor text
h_start = content.find('      <div className="max-w-[1280px] mx-auto px-4 mt-8 pb-4">')
h_end   = content.find('      </div>', h_start) + len('      </div>')
if h_start == -1:
    print('HEADER: not found')
else:
    old_h = content[h_start:h_end]
    new_h = '''      <div className="w-full px-6 lg:px-10 py-6 border-b border-[#DADCE0] bg-white">
        <h1 className="text-3xl lg:text-4xl font-black text-[#202124] mb-2">3D Graphing Calculator</h1>
        <p className="text-xs font-bold text-[#1967D2] mb-3 uppercase tracking-wider">Last Updated: October 2026</p>
        <p className="text-base leading-relaxed text-[#5F6368] max-w-4xl">
          Plot mathematical equations and visualize 3D surfaces directly in your browser. This interactive 3D graphing calculator lets you create and explore surfaces, rotate and zoom the graph, compare multiple equations, and examine explicit and implicit functions without installing software.
        </p>
        <p className="text-sm font-medium text-[#5F6368] max-w-4xl mt-3">
          Looking for other tools? Try our <Link href="/math-tools/scientific/" className="text-[#1967D2] hover:underline">Scientific Calculator</Link>, <Link href="/math-tools/matrix/" className="text-[#1967D2] hover:underline">Matrix Calculator</Link>, <Link href="/calculator/linear-solver/" className="text-[#1967D2] hover:underline">Linear Equation Solver</Link>, <Link href="/calculator/quadratic-solver/" className="text-[#1967D2] hover:underline">Quadratic Solver</Link>, or <Link href="/utility/converter/" className="text-[#1967D2] hover:underline">Unit Converter</Link>.
        </p>
      </div>'''
    new_h = new_h.replace('\n', '\r\n')
    content = content.replace(old_h, new_h)
    print('HEADER: replaced')

# ── 2. Replace left sidebar block (col-span-1 with Trust etc) ─────────────
L_START = '          <div className="lg:col-span-1 space-y-6">'
L_END   = '          {/* Right Column (Quick Features'
s = content.find(L_START)
e = content.find(L_END)
if s == -1 or e == -1:
    print('LEFT COL: not found', s, e)
else:
    old_left = content[s:e]
    new_left = '''          {/* Left Column: sticky TOC */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white border border-[#DADCE0] rounded-xl p-5 shadow-sm">
              <p className="text-[10px] font-black text-[#70757A] uppercase tracking-widest mb-3">On This Page</p>
              <ol className="space-y-0.5 border-l-2 border-[#DADCE0]">
                <li><a href="#what-is-3d-calculator" className="block pl-3 py-1 text-[12px] text-[#5F6368] hover:text-[#1967D2] border-l-2 border-transparent hover:border-[#1967D2] -ml-px transition-colors">What is a 3D Graph Calculator?</a></li>
                <li><a href="#how-to-use" className="block pl-3 py-1 text-[12px] text-[#5F6368] hover:text-[#1967D2] border-l-2 border-transparent hover:border-[#1967D2] -ml-px transition-colors">How to Use It</a></li>
                <li><a href="#supported-graph-types" className="block pl-3 py-1 text-[12px] text-[#5F6368] hover:text-[#1967D2] border-l-2 border-transparent hover:border-[#1967D2] -ml-px transition-colors">Supported Graph Types</a></li>
                <li><a href="#mathematical-formulas" className="block pl-3 py-1 text-[12px] text-[#5F6368] hover:text-[#1967D2] border-l-2 border-transparent hover:border-[#1967D2] -ml-px transition-colors">Mathematical Formulas</a></li>
                <li><a href="#engineering-applications" className="block pl-3 py-1 text-[12px] text-[#5F6368] hover:text-[#1967D2] border-l-2 border-transparent hover:border-[#1967D2] -ml-px transition-colors">Engineering Applications</a></li>
                <li><a href="#surface-library" className="block pl-3 py-1 text-[12px] text-[#5F6368] hover:text-[#1967D2] border-l-2 border-transparent hover:border-[#1967D2] -ml-px transition-colors">Surface Library</a></li>
                <li><a href="#examples" className="block pl-3 py-1 text-[12px] text-[#5F6368] hover:text-[#1967D2] border-l-2 border-transparent hover:border-[#1967D2] -ml-px transition-colors">Examples</a></li>
                <li><a href="#comparison" className="block pl-3 py-1 text-[12px] text-[#5F6368] hover:text-[#1967D2] border-l-2 border-transparent hover:border-[#1967D2] -ml-px transition-colors">Comparison</a></li>
                <li><a href="#faqs" className="block pl-3 py-1 text-[12px] text-[#5F6368] hover:text-[#1967D2] border-l-2 border-transparent hover:border-[#1967D2] -ml-px transition-colors">Frequently Asked Questions</a></li>
              </ol>
            </div>
          </div>

          '''
    new_left = new_left.replace('\n', '\r\n')
    content = content.replace(old_left, new_left)
    print('LEFT COL: replaced')

# ── 3. Insert Trust + Supports + Related Tools after </article> ───────────
ARTICLE_END = '              </article>\r\n            </div>\r\n          </div>'
ARTICLE_END_ALT = '              </article>'
insert_after = content.find(ARTICLE_END)
if insert_after == -1:
    insert_after = content.find(ARTICLE_END_ALT)
    insertion_point = insert_after + len(ARTICLE_END_ALT)
else:
    insertion_point = insert_after + len(ARTICLE_END)

if insert_after == -1:
    print('ARTICLE END: not found')
else:
    trust_block = '''

              {/* Trust, Supports, Related — below article */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Trust & Details */}
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 text-sm">
                  <h3 className="font-bold text-[#202124] mb-3 border-b border-[#DADCE0] pb-2">Trust &amp; Details</h3>
                  <div className="space-y-2 text-[#5F6368]">
                    <p><strong className="text-[#202124]">Last Updated:</strong> October 2026</p>
                    <p><strong className="text-[#202124]">Formula Verification:</strong> Updated October 2026</p>
                    <p><strong className="text-[#202124]">Calculation Engine:</strong> WebGL GPU Rendering</p>
                    <p><strong className="text-[#202124]">Educational Level:</strong> High School, College, University, Professional</p>
                    <p><strong className="text-[#202124]">Reviewed by:</strong> NepaCalc Mathematics Team</p>
                    <p><strong className="text-[#202124]">Accuracy Statement:</strong> All formulas are verified against internationally accepted mathematical references.</p>
                    <div className="pt-2 border-t border-[#DADCE0] mt-2">
                      <p className="font-semibold text-[#202124] mb-1">Reference Standards</p>
                      <ul className="space-y-0.5 text-[#5F6368]">
                        <li>MIT OpenCourseWare</li>
                        <li>Wolfram MathWorld</li>
                        <li>NIST</li>
                        <li>OpenCourseWare Mathematics</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Supports */}
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 text-sm">
                  <h3 className="font-bold text-[#202124] mb-3 border-b border-[#DADCE0] pb-2">Supports</h3>
                  <ul className="space-y-2 text-[#5F6368]">
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">&#10004;</span> Explicit Functions</li>
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">&#10004;</span> Implicit Equations</li>
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">&#10004;</span> Multiple Surfaces</li>
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">&#10004;</span> Real-Time Rendering</li>
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">&#10004;</span> Cross Sections</li>
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">&#10004;</span> Variable Controls</li>
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">&#10004;</span> Browser-Based WebGL</li>
                  </ul>
                </div>

                {/* Related Tools */}
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 text-sm">
                  <h3 className="font-bold text-[#202124] mb-3 border-b border-[#DADCE0] pb-2">Related Tools</h3>
                  <ul className="space-y-2 text-[#1967D2] font-medium">
                    <li><Link href="/math-tools/scientific/" className="hover:underline">Scientific Calculator</Link></li>
                    <li><Link href="/math-tools/matrix/" className="hover:underline">Matrix Calculator</Link></li>
                    <li><Link href="/calculator/linear-solver/" className="hover:underline">Linear Equation Solver</Link></li>
                    <li><Link href="/calculator/quadratic-solver/" className="hover:underline">Quadratic Solver</Link></li>
                    <li><Link href="/geometry/" className="hover:underline">Geometry Calculator</Link></li>
                  </ul>
                </div>

              </div>'''
    trust_block = trust_block.replace('\n', '\r\n')
    content = content[:insertion_point] + trust_block + content[insertion_point:]
    print('TRUST BLOCK: inserted after article')

with open(path, 'wb') as f:
    f.write(content.encode('utf-8'))
print('File written successfully')
