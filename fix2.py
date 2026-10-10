import re

with open('src/data/seo/health.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Find the calorie-calculator block
pattern = r"('calorie-calculator':\s*\{.*?)content:\s*\(\s*<>\s*.*?\),\s*faqs:\s*\[.*?\]\s*\}"
replacement = r"\g<1>content: null\n    }"

new_text = re.sub(pattern, replacement, text, flags=re.DOTALL)

with open('src/data/seo/health.tsx', 'w', encoding='utf-8') as f:
    f.write(new_text)
