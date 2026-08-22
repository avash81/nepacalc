path = "src/app/engineering/graphing/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

import re

# Remove the duplicated related calculators grid items
content = re.sub(r'<Link href="/engineering/3d/".*?</span>\s*</Link>', '', content, flags=re.DOTALL)
content = re.sub(r'<Link href="/calculator/quadratic-solver/".*?</span>\s*</Link>', '', content, flags=re.DOTALL)
content = re.sub(r'<Link href="/calculator/linear-solver/".*?</span>\s*</Link>', '', content, flags=re.DOTALL)
content = re.sub(r'<Link href="/calculator/scientific-calculator/".*?</span>\s*</Link>', '', content, flags=re.DOTALL)

# Remove the duplicated CTA for Graphing Guide
cta_block_regex = r'<div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 mt-8 not-prose flex flex-col sm:flex-row sm:items-center justify-between gap-4">.*?</div>'
content = re.sub(cta_block_regex, '', content, flags=re.DOTALL)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Deduplicated graphing page")
