import re
import json

filepath = r"c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\nepal-specific.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I will parse all keys
keys = re.findall(r"^\s+'([a-z0-9-]+)':\s*{", content, re.MULTILINE)

print(keys)
