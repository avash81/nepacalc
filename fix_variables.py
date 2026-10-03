import re

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update updateGraph to remove its broken inline variable detection
old_updateGraph = '''  const updateGraph = (id: string, updates: Partial<GraphItem>) => {
    setGraphs(graphs.map(g => {
      if (g.id === id) {
        const newEq = updates.equation || g.equation;
        // Auto-detect variables (a-z excluding x, y)
        const foundVars = Array.from(newEq.toLowerCase().matchAll(/[a-z]/g))
          .map(m => m[0])
          .filter(v => {
            if (v === 'x' || v === 'y' || v === 'z') return false;
            if (['e', 'i', 'p'].includes(v)) return false; 
            return true;
          });
        
        const uniqueVars = Array.from(new Set(foundVars));
        const currentParamNames = params.map(p => p.name);
        
        const newParams = [...params];
        uniqueVars.forEach(v => {
          if (!currentParamNames.includes(v)) {
            newParams.push({ id: Math.random().toString(), name: v, value: 1, min: -10, max: 10 });
          }
        });
        
        if (newParams.length !== params.length) setParams(newParams);
        return { ...g, ...updates };
      }
      return g;
    }));
  };'''

new_updateGraph = '''  const updateGraph = (id: string, updates: Partial<GraphItem>) => {
    setGraphs(graphs.map(g => {
      if (g.id === id) {
        return { ...g, ...updates };
      }
      return g;
    }));
  };'''
content = content.replace(old_updateGraph.replace('\n', '\r\n'), new_updateGraph.replace('\n', '\r\n'))
content = content.replace(old_updateGraph, new_updateGraph)

# 2. Add the robust useEffect above addGraph
use_effect_block = '''
  useEffect(() => {
    const allVars = new Set<string>();
    graphs.forEach(g => {
      Array.from(g.equation.toLowerCase().matchAll(/[a-z]/g))
        .map(m => m[0])
        .filter(v => {
          if (v === 'x' || v === 'y' || v === 'z') return false;
          if (['e', 'i', 'p'].includes(v)) return false; 
          return true;
        })
        .forEach(v => allVars.add(v));
    });

    const uniqueVars = Array.from(allVars).sort();
    
    setParams(prevParams => {
      const newParams = [];
      for (const v of uniqueVars) {
        const existing = prevParams.find(p => p.name === v);
        if (existing) {
          newParams.push(existing);
        } else {
          newParams.push({ id: Math.random().toString(), name: v, value: 1, min: -10, max: 10 });
        }
      }
      const isSame = prevParams.length === newParams.length && prevParams.every((p, i) => p.name === newParams[i].name);
      return isSame ? prevParams : newParams;
    });
  }, [graphs]);

  const addGraph = '''
content = content.replace('  const addGraph = ', use_effect_block)

# 3. Remove the redundant + button from Variables header
old_vars_header = '''                <div className="flex items-center gap-2">
                  <ChevronDown className={w-4 h-4 lg:hidden text-slate-400 transition-transform } />
                  <span onClick={(e) => { e.stopPropagation(); setParams([...params, { id: Math.random().toString(), name: 'b', value: 1, min: -10, max: 10 }]); }} className="p-1 hover:bg-slate-200 rounded text-blue-700 transition-all">
                    <Plus className="w-4 h-4" />
                  </span>
                </div>'''

new_vars_header = '''                <div className="flex items-center gap-2">
                  <ChevronDown className={w-4 h-4 lg:hidden text-slate-400 transition-transform } />
                </div>'''
content = content.replace(old_vars_header.replace('\n', '\r\n'), new_vars_header.replace('\n', '\r\n'))
content = content.replace(old_vars_header, new_vars_header)

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
