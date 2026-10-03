with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'rb') as f:
    c = f.read().decode('utf-8')

# ── Replace SLICING section ──────────────────────────────────────────────────
old = '''          {/* SLICING CONTROLS */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Cross-Section Slicing</h2>
            </div>
            <div className="p-4">
              <div className="flex gap-1 mb-4">
                {(['none', 'x', 'y', 'z'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setSliceMode(mode)}
                    className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                      sliceMode === mode 
                        ? 'bg-[#1a73e8] text-[#202124] shadow-sm' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              {sliceMode !== 'none' && (
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase">
                    <span>Plane Position</span>
                    <span className="text-blue-600">{slicePos.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="0.1"
                    value={slicePos}
                    onChange={(e) => setSlicePos(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              )}
            </div>
          </div>'''

new = '''          {/* SLICING CONTROLS */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('slicing')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Cross-Section Slicing</h2>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSections.slicing ? '' : '-rotate-90'}`} />
            </button>
            {openSections.slicing && (
              <div className="p-4">
                <div className="flex gap-1 mb-4">
                  {(['none', 'x', 'y', 'z'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setSliceMode(mode)}
                      className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                        sliceMode === mode 
                          ? 'bg-[#1a73e8] text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                {sliceMode !== 'none' && (
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase">
                      <span>Plane Position</span>
                      <span className="text-blue-600">{slicePos.toFixed(2)}</span>
                    </div>
                    <input
                      type="range" min="-6" max="6" step="0.1" value={slicePos}
                      onChange={(e) => setSlicePos(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                )}
              </div>
            )}
          </div>'''

c = c.replace(old.replace('\n','\r\n'), new.replace('\n','\r\n'))
print('SLICING:', 'OK' if old.replace('\n','\r\n') in c.replace(new.replace('\n','\r\n'), old.replace('\n','\r\n')) else 'REPLACED')

# ── Replace VARIABLES section ────────────────────────────────────────────────
old2 = '''          {/* SECTION: DYNAMIC VARIABLES */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Variables</h2>
              <button aria-label="Add Parameter" onClick={() => setParams([...params, { id: Math.random().toString(), name: 'b', value: 1, min: -10, max: 10 }])} className="p-1 hover:bg-slate-200 rounded text-blue-700 transition-all"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="p-4 space-y-4">
              {params.map(p => (
                <div key={p.id} className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                    <span className="text-slate-500">{p.name} = <span className="text-blue-600">{p.value.toFixed(2)}</span></span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300">{p.min}</span>
                      <input 
                        type="range" min={p.min} max={p.max} step="0.1"
                        value={p.value} 
                        onChange={(e) => setParams(params.map(x => x.id === p.id ? { ...x, value: parseFloat(e.target.value) } : x))}
                        className="w-24 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                      />
                      <span className="text-slate-300">{p.max}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>'''

new2 = '''          {/* SECTION: DYNAMIC VARIABLES */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('variables')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Variables</h2>
              <div className="flex items-center gap-2">
                <span onClick={e => { e.stopPropagation(); setParams([...params, { id: Math.random().toString(), name: 'b', value: 1, min: -10, max: 10 }]); }} className="p-0.5 hover:bg-slate-200 rounded text-blue-700 transition-all">
                  <Plus className="w-3.5 h-3.5" />
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSections.variables ? '' : '-rotate-90'}`} />
              </div>
            </button>
            {openSections.variables && (
              <div className="p-4 space-y-4">
                {params.length === 0 && (
                  <p className="text-[10px] text-slate-400 text-center py-2">No variables yet. Add one with +</p>
                )}
                {params.map(p => (
                  <div key={p.id} className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                      <span className="text-slate-500">{p.name} = <span className="text-blue-600">{p.value.toFixed(2)}</span></span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300">{p.min}</span>
                        <input 
                          type="range" min={p.min} max={p.max} step="0.1"
                          value={p.value} 
                          onChange={(e) => setParams(params.map(x => x.id === p.id ? { ...x, value: parseFloat(e.target.value) } : x))}
                          className="w-24 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                        />
                        <span className="text-slate-300">{p.max}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>'''

c = c.replace(old2.replace('\n','\r\n'), new2.replace('\n','\r\n'))
print('VARIABLES:', 'REPLACED' if new2.replace('\n','\r\n') in c else 'NOT REPLACED')

# ── Replace QUALITY section ──────────────────────────────────────────────────
old3 = '''          {/* SECTION: DOMAIN SETTINGS */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Quality</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold uppercase">
                  <span className="text-slate-400">Resolution</span>
                  <span className="text-blue-700">{resolution}x{resolution}</span>
                </div>
                <input 
                  type="range" min="20" max="150" step="5"
                  value={resolution}
                  onChange={(e) => setResolution(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer" 
                />
              </div>
            </div>
          </div>'''

new3 = '''          {/* SECTION: QUALITY */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('quality')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Quality</h2>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-blue-600">{resolution}x{resolution}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSections.quality ? '' : '-rotate-90'}`} />
              </div>
            </button>
            {openSections.quality && (
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-[9px] font-bold uppercase">
                  <span className="text-slate-400">Resolution</span>
                  <span className="text-blue-700">{resolution}x{resolution}</span>
                </div>
                <input 
                  type="range" min="20" max="150" step="5"
                  value={resolution}
                  onChange={(e) => setResolution(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer" 
                />
                <div className="flex justify-between text-[8px] text-slate-300 uppercase font-bold">
                  <span>Low (20)</span><span>High (150)</span>
                </div>
              </div>
            )}
          </div>'''

c = c.replace(old3.replace('\n','\r\n'), new3.replace('\n','\r\n'))
print('QUALITY:', 'REPLACED' if new3.replace('\n','\r\n') in c else 'NOT REPLACED')

# ── Replace APPEARANCE section ───────────────────────────────────────────────
old4 = '''          {/* SECTION: APPEARANCE */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-2">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Appearance</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Shading</span>
                <button aria-label="Solid Mode" onClick={() => setGlobalWireframe(false)} className={`w-9 h-4.5 rounded-full transition-all relative ${!globalWireframe ? 'bg-[#15803d]' : 'bg-slate-200'}`}>
                  <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-all ${!globalWireframe ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Wireframe</span>
                <button aria-label="Wireframe Mode" onClick={() => setGlobalWireframe(true)} className={`w-9 h-4.5 rounded-full transition-all relative ${globalWireframe ? 'bg-[#15803d]' : 'bg-slate-200'}`}>
                  <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-all ${globalWireframe ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Palette</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#1a73e8] border border-white/20" />
                  <div className="w-3 h-3 rounded-full bg-green-600 border border-white/20" />
                  <div className="w-3 h-3 rounded-full bg-red-600 border border-white/20" />
                </div>
              </div>
            </div>
          </div>'''

new4 = '''          {/* SECTION: APPEARANCE */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('appearance')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Appearance</h2>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-slate-400">{globalWireframe ? 'Wireframe' : 'Solid'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSections.appearance ? '' : '-rotate-90'}`} />
              </div>
            </button>
            {openSections.appearance && (
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Solid</span>
                  <button aria-label="Solid Mode" onClick={() => setGlobalWireframe(false)} className={`w-9 h-5 rounded-full transition-all relative ${!globalWireframe ? 'bg-[#15803d]' : 'bg-slate-200'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${!globalWireframe ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Wireframe</span>
                  <button aria-label="Wireframe Mode" onClick={() => setGlobalWireframe(true)} className={`w-9 h-5 rounded-full transition-all relative ${globalWireframe ? 'bg-[#15803d]' : 'bg-slate-200'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${globalWireframe ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>
            )}
          </div>'''

c = c.replace(old4.replace('\n','\r\n'), new4.replace('\n','\r\n'))
print('APPEARANCE:', 'REPLACED' if new4.replace('\n','\r\n') in c else 'NOT REPLACED')

# ── Replace PRESETS section header ───────────────────────────────────────────
old5 = '''          {/* SECTION: FUNCTION PRESETS */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button
              onClick={() => toggleSection('equations')}
              className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-2 flex items-center justify-between"
            >
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Presets</h2>
            </button>'''

# Actually let me find the presets section differently
idx = c.find('{/* SECTION: FUNCTION PRESETS */}')
if idx == -1:
    print('PRESETS section marker not found - searching for Presets header')
    idx = c.find('"text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Presets<')
    print('Presets h2 at:', idx)
else:
    print('PRESETS section found at:', idx)
    # Show context
    print(repr(c[idx:idx+200]))

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'wb') as f:
    f.write(c.encode('utf-8'))
print('File written.')
