import re
with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix the broken div
c = re.sub(r'<div className="hidden"[^<]*<div className=\{`p-4 grid', r'<div className={`p-4 grid', c)

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
