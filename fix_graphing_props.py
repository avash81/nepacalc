path = "src/app/engineering/graphing/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

import re

# We need to replace the props passed to CalcWrapper
old_props = """    <CalcWrapper
      title="Graphing Calculator"
      description="Plot functions and equations online on an interactive coordinate plane."
      icon={<svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
      breadcrumbs={[
        { name: 'Engineering', slug: '/engineering/' },
        { name: 'Graphing Calculator', slug: '/engineering/graphing/' }
      ]}
    >"""

new_props = """    <CalcWrapper
      title="Graphing Calculator"
      description="Plot functions and equations online on an interactive coordinate plane."
      crumbs={[
        { label: 'Engineering', href: '/engineering/' },
        { label: 'Graphing Calculator' }
      ]}
    >"""

content = content.replace(old_props, new_props)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated page.tsx props")
