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

# Clean up existing openSections toggles to rewrite them properly
def clean_toggle(html_str):
    return html_str

# --- Process EQUATIONS ---
eq_new = eq_str
eq_new = eq_new.replace('<button aria-label="Add Graph"', '<button aria-label="Add Graph" onClick={(e) => { e.stopPropagation(); addGraph(\'z = 0\'); }}')
# Replace the header to be a toggle
eq_new = eq_new.replace('<div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2 flex items-center justify-between">',
    '''<button onClick={() => toggleSection('equations')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">''')
# Close button and add Chevron
eq_new = eq_new.replace('<button aria-label="Add Graph"', '<ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.equations ? "" : "-rotate-90"}`} />\n              <button aria-label="Add Graph"')
eq_new = eq_new.replace('</button>\n            </div>', '</button>\n              </div>\n            </button>')

# Make body responsive block
eq_new = eq_new.replace('<div className="p-4 space-y-4">', '<div className={`p-4 space-y-4 ${openSections.equations ? "block" : "hidden lg:block"}`}>')

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
def wrap_responsive_toggle(html_str, state_name, header_title, extra_header=''):
    # Replace header div with button
    header_find = f'<div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2'
    if header_find not in html_str:
        header_find = f'<div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2">'
    
    html_str = re.sub(
        r'<div className="bg-\[#f8fafc\] border-b border-slate-200 px-4 py-2[^>]*>[\s\S]*?</h2>',
        f'''<button onClick={{() => toggleSection('{state_name}')}} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2"><h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">{header_title}</h2>{extra_header}</div>
              <ChevronDown className={{`w-4 h-4 lg:hidden text-slate-400 transition-transform ${{openSections.{state_name} ? "" : "-rotate-90"}}`}} />
            </button>''',
        html_str, count=1
    )
    
    # The header div end </div> was replaced by button? No, the regex above only went up to </h2>
    html_str = html_str.replace('</h2>\n            </div>', f'</h2>{extra_header}</div>\n              <ChevronDown className={{`w-4 h-4 lg:hidden text-slate-400 transition-transform ${{openSections.{state_name} ? "" : "-rotate-90"}}`}} />\n            </button>')
    # Just to be safe, I'll use a simpler replace strategy:
    
    # Find the body div `<div className="p-...`
    html_str = re.sub(r'(<div className="p-[^"]+">)', r'\1'.replace('className="', f'className={{`\${{openSections.{state_name} ? "block" : "hidden lg:block"}} '), html_str, count=1)
    
    return html_str

# Better strategy: Manual string replacement for each to avoid regex matching bugs

slice_new = slice_str.replace('<div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2">\n              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Cross-Section Slicing</h2>\n            </div>',
    '''<button onClick={() => toggleSection('slicing')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Cross-Section Slicing</h2>
              <ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.slicing ? "" : "-rotate-90"}`} />
            </button>''').replace('<div className="p-4">', '<div className={`p-4 ${openSections.slicing ? "block" : "hidden lg:block"}`}>')

var_new = var_str.replace('<div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2 flex items-center justify-between">\n              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Variables</h2>\n              <button aria-label="Add Parameter"',
    '''<button onClick={() => toggleSection('variables')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Variables</h2>
              </div>
              <div className="flex items-center gap-2">
                <ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.variables ? "" : "-rotate-90"}`} />
                <span onClick={(e) => { e.stopPropagation(); setParams([...params, { id: Math.random().toString(), name: 'b', value: 1, min: -10, max: 10 }]); }} className="p-1 hover:bg-slate-200 rounded text-blue-700 transition-all">
                  <Plus className="w-4 h-4" />
                </span>
              </div>
            </button>
            <div className="hidden"''').replace('<div className="hidden">\n            </div>', '')
var_new = var_new.replace('className="p-1 hover:bg-slate-200 rounded text-blue-700 transition-all"><Plus className="w-4 h-4" /></button>\n            </div>', '')
var_new = var_new.replace('<div className="p-4 space-y-4">', '<div className={`p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 ${openSections.variables ? "block" : "hidden lg:block"}`}>')
var_new = var_new.replace('<div key={p.id} className="space-y-2">', '<div key={p.id} className="">')


qual_new = qual_str.replace('<div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2">\n              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Quality</h2>\n            </div>',
    '''<button onClick={() => toggleSection('quality')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Quality</h2>
                <span className="text-[10px] font-bold text-blue-600">{resolution}x{resolution}</span>
              </div>
              <ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.quality ? "" : "-rotate-90"}`} />
            </button>''').replace('<div className="p-4 space-y-4">', '<div className={`p-4 space-y-4 ${openSections.quality ? "block" : "hidden lg:block"}`}>')


app_new = app_str.replace('<div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2">\n              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Appearance</h2>\n            </div>',
    '''<button onClick={() => toggleSection('appearance')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Appearance</h2>
                <span className="text-[10px] font-bold text-slate-500">{globalWireframe ? 'Wireframe' : 'Solid'}</span>
              </div>
              <ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.appearance ? "" : "-rotate-90"}`} />
            </button>''').replace('<div className="p-4 space-y-3">', '<div className={`p-4 space-y-3 ${openSections.appearance ? "block" : "hidden lg:block"}`}>')

pre_new = pre_str.replace('<div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2">\n              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Presets</h2>\n            </div>',
    '''<button onClick={() => toggleSection('presets')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Presets</h2>
              <ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.presets ? "" : "-rotate-90"}`} />
            </button>''').replace('<div className="p-3">', '<div className={`p-4 ${openSections.presets ? "block" : "hidden lg:block"}`}>')


canvas_new = canvas_str
canvas_new = canvas_new.replace('<div className="min-w-0 flex-1 flex flex-col lg:h-full lg:overflow-hidden">', '<div className="w-full h-[55vh] lg:h-[65vh] shrink-0 flex flex-col relative">')
# Fix canvas inner container
canvas_new = canvas_new.replace('lg:border', 'border')
canvas_new = canvas_new.replace('rounded-none lg:rounded-sm', 'rounded-sm')

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
