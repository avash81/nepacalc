import re

with open('src/app/calculator/date-duration/Calculator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove mounted state
content = re.sub(r'const \[mounted, setMounted\] = useState\(false\);\n', '', content)
content = re.sub(r'\s*setMounted\(true\);\n', '\n', content)

# Remove mounted from useMemo
content = content.replace('() => (mounted ? calcDiff(start, end, includeEnd) : null),', '() => calcDiff(start, end, includeEnd),')
content = content.replace('[start, end, includeEnd, mounted],', '[start, end, includeEnd],')

# Remove mounted from UI check
old_ui = '''      {!mounted ? (
        <div className="h-32 flex items-center justify-center text-[#70757A] text-sm">Loading…</div>
      ) : !diff ? ('''
new_ui = '''      {!diff ? ('''
content = content.replace(old_ui, new_ui)

with open('src/app/calculator/date-duration/Calculator.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
