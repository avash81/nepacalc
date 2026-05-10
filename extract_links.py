import os
import re

seo_dir = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo'
links = set()

for filename in os.listdir(seo_dir):
    if filename.endswith('.tsx'):
        path = os.path.join(seo_dir, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            found = re.findall(r'href="/calculator/([^"/]+)/?"', content)
            for link in found:
                links.add(link)

print('\n'.join(sorted(links)))
