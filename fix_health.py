import re
with open('src/data/seo/health.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(
    r"'calorie-calculator': \{.*?(?='macro-calculator': \{)",
    "'calorie-calculator': {\n    title: 'Calorie Calculator | Daily Energy Needs Tool',\n    description: 'Calculate your daily calorie requirements.',\n    content: null\n  },\n  ",
    content,
    flags=re.DOTALL
)

with open('src/data/seo/health.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
