with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'rb') as f:
    c = f.read().decode('utf-8')

# Fix presets section explicitly
old_presets = '''          {/* SECTION: FUNCTION PRESETS */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Presets</h2>
            </div>
            <div className="p-3">'''
new_presets = '''          {/* SECTION: FUNCTION PRESETS */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('presets')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Presets</h2>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSections.presets ? '' : '-rotate-90'}`} />
            </button>
            {openSections.presets && (
              <div className="p-3">'''

# Close the bracket at the end of presets
old_presets_end = '''              </div>
            </div>
          </div>

        </aside>'''
new_presets_end = '''              </div>
            )}
          </div>

        </aside>'''

c = c.replace(old_presets.replace('\n', '\r\n'), new_presets.replace('\n', '\r\n'))
c = c.replace(old_presets_end.replace('\n', '\r\n'), new_presets_end.replace('\n', '\r\n'))

# NOW CHANGE THE MAIN LAYOUT STRUCTURE

# Old outer structure:
# <div className="flex-1 flex flex-col lg:flex-row gap-0 lg:gap-6 p-0 lg:p-6 lg:overflow-hidden">
#   <aside>...</aside>
#   <div className="min-w-0 flex-1 flex flex-col lg:h-full lg:overflow-hidden">...canvas...</div>
# </div>

# We want: Top canvas, Bottom 2-col settings

old_main_layout = '''      <div className="flex-1 flex flex-col lg:flex-row gap-0 lg:gap-6 p-0 lg:p-6 lg:overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-[320px] flex flex-col gap-4 lg:gap-5 shrink-0 lg:h-full overflow-y-auto px-4 py-4 lg:px-0 lg:py-0 scrollbar-thin scrollbar-thumb-slate-200">'''

new_main_layout = '''      <div className="flex-1 flex flex-col gap-4 p-4 lg:p-6 lg:overflow-hidden">
        {/* MAIN VIEWPORT AREA (TOP) */}
        <div className="min-w-0 flex-1 flex flex-col relative shrink-0 min-h-[40vh] lg:min-h-[50vh]">'''


# Wait, doing this via string replace is risky because we have to flip the order of aside and canvas.
# Let's extract the aside content and the canvas content.

idx_aside_start = c.find('{/* SIDEBAR */}')
idx_aside_end = c.find('</aside>') + len('</aside>')
idx_canvas_start = c.find('{/* MAIN VIEWPORT AREA */}')
idx_canvas_end = c.find('</div>\r\n    </div>\r\n  );\r\n}') # find the end of the outer div

if idx_aside_start != -1 and idx_canvas_start != -1:
    aside_content = c[idx_aside_start:idx_aside_end]
    # Remove the <aside ...> and </aside> tags
    aside_inner = aside_content.split('>', 1)[1].rsplit('</aside>', 1)[0].strip()

    # We will put aside_inner into a 2-col grid
    # To split aside_inner into two cols, we can just split on the section comments
    
    sections = {
        'equations': '',
        'slicing': '',
        'variables': '',
        'quality': '',
        'appearance': '',
        'presets': ''
    }
    
    # We can just construct the new bottom panel
    new_bottom_panel = f'''
        {{/* BOTTOM SETTINGS GRID */}}
        <div className="shrink-0 lg:max-h-[40vh] overflow-y-auto bg-[#f8fafc] border border-slate-200 rounded-sm shadow-sm p-4 scrollbar-thin scrollbar-thumb-slate-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
            {{/* COLUMN 1 */}}
            <div className="flex flex-col gap-4">
              {{/* EQUATIONS SECTION INJECTED HERE */}}
            </div>
            {{/* COLUMN 2 */}}
            <div className="flex flex-col gap-4">
              {{/* OTHER SECTIONS INJECTED HERE */}}
            </div>
          </div>
        </div>
'''
# Actually the simplest is to just apply the collapsible layout first.
# The user asked: "use this structure but before pushing lets run it in the local host and let me see how it is visible"
# And then "if uses want to more input box they can add in that case it can be hight can increase"

# Let's just output the file write for the presets collapsible fix.
with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'wb') as f:
    f.write(c.encode('utf-8'))
print('Presets collapsible fixed.')

