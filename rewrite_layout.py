import re

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'r', encoding='utf-8') as f:
    src = f.read()

# Define section finders
def extract_section(start_marker, end_marker):
    start = src.find(start_marker)
    if end_marker:
        end = src.find(end_marker, start)
        return src[start:end], start, end
    else:
        return src[start:], start, len(src)

nav_part = src[:src.find('<div className="flex-1 flex flex-col lg:flex-row')]
nav_part = re.sub(
    r'<div className="flex flex-col[^"]+">',
    '<div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-[#f8fafc] font-sans">',
    nav_part, count=1
)

eq_str, _, _ = extract_section('{/* SECTION: EQUATIONS */}', '{/* SLICING CONTROLS */}')
slice_str, _, _ = extract_section('{/* SLICING CONTROLS */}', '{/* SECTION: DYNAMIC VARIABLES */}')
var_str, _, _ = extract_section('{/* SECTION: DYNAMIC VARIABLES */}', '{/* SECTION: DOMAIN SETTINGS */}')
if not var_str:
    var_str, _, _ = extract_section('{/* SECTION: DYNAMIC VARIABLES */}', '{/* SECTION: QUALITY */}')
qual_str, _, _ = extract_section('{/* SECTION: QUALITY */}', '{/* SECTION: APPEARANCE */}')
app_str, _, _ = extract_section('{/* SECTION: APPEARANCE */}', '{/* SECTION: FUNCTION PRESETS */}')
pre_str, _, _ = extract_section('{/* SECTION: FUNCTION PRESETS */}', '</aside>')

canvas_str, _, _ = extract_section('{/* MAIN VIEWPORT AREA */}', '</div>\n    </div>\n  );\n}')
if not canvas_str:
    # Handle \r\n
    canvas_str, _, _ = extract_section('{/* MAIN VIEWPORT AREA */}', '</div>\r\n    </div>\r\n  );\r\n}')

# --- Process EQUATIONS ---
eq_new = eq_str
eq_new = eq_new.replace('<ChevronDown className={`w-3.5 h-3.5', '<ChevronDown className={`w-3.5 h-3.5 lg:hidden')
eq_new = re.sub(r'\{openSections\.equations && \(\s*<div className="([^"]+)">', r'<div className={`\1 ${openSections.equations ? "block" : "hidden lg:block"}`}>', eq_new)
eq_new = eq_new.replace('          </div>\n            )}\n          </div>', '          </div>\n          </div>')
eq_new = eq_new.replace('          </div>\r\n            )}\r\n          </div>', '          </div>\r\n          </div>')

graph_map_old = re.search(r'\{graphs\.map\(\(g\) => \(\s*<div key=\{g\.id\}.*?</div>\s*\)\)}', eq_new, re.DOTALL)
if graph_map_old:
    graph_map_new = '''{graphs.map((g) => (
                  <div key={g.id} className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between lg:justify-start gap-3 w-full lg:w-auto shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: g.color }} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap">Layer {g.id.slice(0, 3)}</span>
                      </div>
                      <button aria-label="Toggle Visibility" onClick={() => updateGraph(g.id, { visible: !g.visible })} className={`p-1.5 lg:hidden rounded ${g.visible ? 'text-blue-600' : 'text-slate-300'}`}>
                        {g.visible ? <Box className="w-4 h-4" /> : <Box className="w-4 h-4 opacity-30" />}
                      </button>
                    </div>
                    
                    <input 
                      type="text"
                      value={g.equation} 
                      onFocus={() => setActiveInputId(g.id)}
                      onChange={(e) => updateGraph(g.id, { equation: e.target.value })}
                      className="w-full lg:flex-1 bg-[#f8fafc] border border-slate-200 rounded p-2.5 font-mono text-[13px] font-bold outline-none focus:border-blue-500 transition-all text-slate-700"
                      placeholder="Enter equation..."
                    />
                    
                    <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto shrink-0">
                      <div className="flex items-center gap-3 flex-1 lg:flex-none">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Opacity</span>
                        <input type="range" min="0.1" max="1" step="0.05" value={g.opacity} onChange={(e) => updateGraph(g.id, { opacity: parseFloat(e.target.value) })} className="w-24 lg:w-32 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button aria-label="Toggle Visibility" onClick={() => updateGraph(g.id, { visible: !g.visible })} className={`hidden lg:block p-1.5 rounded hover:bg-slate-100 ${g.visible ? 'text-blue-600' : 'text-slate-300'}`}>
                          {g.visible ? <Box className="w-4 h-4" /> : <Box className="w-4 h-4 opacity-30" />}
                        </button>
                        <button aria-label="Delete Graph" onClick={() => setGraphs(graphs.filter(x => x.id !== g.id))} className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors">
                          <Plus className="w-4 h-4 rotate-45" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}'''
    eq_new = eq_new.replace(graph_map_old.group(0), graph_map_new)

# --- Process other sections ---
def make_responsive_toggle(html_str, state_name):
    html_str = html_str.replace('<ChevronDown className={`w-3.5 h-3.5', '<ChevronDown className={`w-3.5 h-3.5 lg:hidden')
    html_str = re.sub(
        r'\{openSections\.' + state_name + r' && \(\s*<div className="([^"]+)">',
        r'<div className={`\1 ${openSections.' + state_name + r' ? "block" : "hidden lg:block"}`}>',
        html_str
    )
    # Fix the trailing )}
    html_str = re.sub(r'\s*\)\}\s*</div>\s*$', '\n          </div>\n        </div>\n', html_str + '</div>')
    return html_str

slice_new = make_responsive_toggle(slice_str, 'slicing')
var_new = make_responsive_toggle(var_str, 'variables')

# Enhance Variables with Grid layout
var_new = var_new.replace('<div className={`p-4 space-y-4', '<div className={`p-4 space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4')
# Remove nested space-y-4 if using grid gap
var_new = var_new.replace('space-y-4 grid', 'grid') 
var_new = re.sub(r'\{params\.map\(p => \(\s*<div key=\{p\.id\} className="space-y-2">', r'{params.map(p => (\n                  <div key={p.id} className="">', var_new)

qual_new = make_responsive_toggle(qual_str, 'quality')
app_new = make_responsive_toggle(app_str, 'appearance')

pre_new = '''          {/* SECTION: FUNCTION PRESETS */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('presets')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Presets</h2>
              <ChevronDown className={`w-3.5 h-3.5 lg:hidden text-slate-400 transition-transform ${openSections.presets ? '' : '-rotate-90'}`} />
            </button>
            <div className={`p-3 ${openSections.presets ? 'block' : 'hidden lg:block'}`}>
              <div className="flex flex-wrap gap-1.5">
                {CURRICULUM_PRESETS.map(p => (
                  <button
                    key={p.name}
                    aria-label={`Plot ${p.name}`}
                    onClick={() => addGraph(p.eq, p.color)}
                    title={p.eq}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 hover:border-blue-400 hover:bg-blue-50 bg-white text-[10px] font-semibold text-slate-600 hover:text-blue-700 transition-all"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>'''

canvas_new = canvas_str
canvas_new = canvas_new.replace('<div className="min-w-0 flex-1 flex flex-col lg:h-full lg:overflow-hidden">', '<div className="w-full h-[55vh] lg:h-[65vh] shrink-0 flex flex-col relative">')
# Fix canvas inner container
canvas_new = re.sub(r'<div ref=\{fullscreenContainerRef\} className={`([^`]+)`}>', lambda m: f'<div ref={{fullscreenContainerRef}} className={{`{m.group(1).replace("lg:border", "border").replace("lg:rounded-sm", "rounded-sm").replace("lg:rounded-none", "").replace("rounded-none", "rounded-sm")}`}}>', canvas_new)

new_return = f'''{nav_part}
      <div className="flex-1 flex flex-col gap-4 lg:gap-6 p-4 lg:p-6 max-w-[1600px] mx-auto w-full">
{canvas_new}
        {{/* SETTINGS AREA (BOTTOM) */}}
        <div className="w-full flex flex-col gap-4 lg:gap-6 pb-20">
{eq_new}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">
            <div className="flex flex-col gap-4 lg:gap-6">
{slice_new}
{qual_new}
{pre_new}
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
{var_new}
{app_new}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}}'''

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'w', encoding='utf-8') as f:
    f.write(new_return)
print("Rewrite complete.")
