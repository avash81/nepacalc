import re

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'r', encoding='utf-8') as f:
    src = f.read()

# 1. Change default resolution
src = src.replace('const [resolution, setResolution] = useState(100);', 'const [resolution, setResolution] = useState(65);')

# 2. Extract EQUATIONS section
eq_start = src.find('{/* SECTION: EQUATIONS */}')
eq_end = src.find('<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">')
if eq_start != -1 and eq_end != -1:
    eq_section = src[eq_start:eq_end]
    src = src[:eq_start] + src[eq_end:]
    
    # 3. Move EQUATIONS above the CANVAS
    canvas_start = src.find('{/* MAIN VIEWPORT AREA */}')
    if canvas_start != -1:
        src = src[:canvas_start] + eq_section + '\n' + src[canvas_start:]

# 4. Remove 3D Surface Visualization header and float the button
header_regex = r'<div className="bg-\[#f8fafc\] border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between">.*?<div className="flex-1 relative bg-slate-50'
match = re.search(header_regex, src, re.DOTALL)
if match:
    # We want to replace it with just the relative container and a floating fullscreen button
    new_canvas_top = '''<div className="flex-1 relative bg-slate-50 group">
                <button
                    aria-label={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                    onClick={toggleFullscreen}
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Graph View'}
                    className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-slate-200 hover:border-[#1e40af] hover:text-[#1e40af] text-slate-500 text-[9px] font-bold uppercase tracking-wide transition-all shadow-sm opacity-50 group-hover:opacity-100"
                  >
                    <Maximize className="w-3 h-3" />
                    <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
                  </button>'''
    src = src[:match.start()] + new_canvas_top + src[match.end():]

# 5. Remove Appearance Section
app_start = src.find('{/* SECTION: APPEARANCE */}')
if app_start != -1:
    # Find the end of Appearance section (it's the last section before the closing divs)
    app_end = src.find('</div>\n          </div>\n        </div>\n      </div>', app_start)
    if app_end == -1:
        app_end = src.find('</div>\r\n          </div>\r\n        </div>\r\n      </div>', app_start)
    if app_end != -1:
        src = src[:app_start] + src[app_end:]

# 6. Change variables to have number input
var_replace = '''<span className="text-slate-500 flex items-center gap-2">{p.name} = 
                        <input type="number" step="0.1" value={p.value} onChange={(e) => setParams(params.map(x => x.id === p.id ? { ...x, value: parseFloat(e.target.value) || 0 } : x))} className="w-14 h-6 text-center border border-slate-200 rounded text-blue-600 bg-white" />
                      </span>'''
src = re.sub(r'<span className="text-slate-500">\{p\.name\} = <span className="text-blue-600">\{p\.value\.toFixed\(2\)\}</span></span>', var_replace, src)

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'w', encoding='utf-8') as f:
    f.write(src)

print("Modifications done.")
