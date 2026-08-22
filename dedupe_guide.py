path = "src/app/engineering/graphing-calculator-guide/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

import re

# Remove duplicate Graphing Calculator CTA at bottom
bottom_cta = r'<h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6 border-b border-slate-100 pb-2">Try the NepaCalc Graphing Calculator</h2>\s*<div className="bg-blue-50/50 rounded-xl p-8 border border-blue-100 not-prose text-center">.*?</div>'
content = re.sub(bottom_cta, '', content, flags=re.DOTALL)

# Remove Mathematical References section to prevent duplicate external links
math_references = r'<h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2">Mathematical References</h2>\s*<p>For further study.*?</ul>'
content = re.sub(math_references, '', content, flags=re.DOTALL)

# Deduplicate OpenStax links by keeping only the first occurrence of each URL
urls_to_dedupe = [
    r'<a href="https://openstax.org/books/contemporary-mathematics/pages/5-8-graphing-functions"[^>]*>(OpenStax: Graphing Functions)</a>',
    r'<a href="https://openstax.org/books/algebra-and-trigonometry-2e/pages/6-2-graphs-of-exponential-functions"[^>]*>(OpenStax: Graphs of Exponential Functions)</a>',
    r'<a href="https://openstax.org/books/algebra-and-trigonometry-2e/pages/6-4-graphs-of-logarithmic-functions"[^>]*>(OpenStax: Graphs of Logarithmic Functions)</a>'
]

for url_regex in urls_to_dedupe:
    matches = list(re.finditer(url_regex, content))
    if len(matches) > 1:
        # Keep the first match, replace subsequent matches with just the text
        for match in reversed(matches[1:]): # Reverse order to not mess up indices
            content = content[:match.start()] + match.group(1) + content[match.end():]

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Deduplicated guide page")
