import sys
import os
import re

# Add the project root to sys.path if needed, but we'll just parse as text
# for simplicity and because we are in a restricted environment.

def get_calculators(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Find all slugs in CALCULATORS array
    return re.findall(r"slug:\s*'([^']+)'", content)

def get_seo_slugs(directory):
    seo_slugs = set()
    for filename in os.listdir(directory):
        if filename.endswith('.tsx') and filename != 'index.tsx' and filename != 'types.ts':
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as f:
                content = f.read()
                # Find all keys in the SEO objects
                # Keys are usually like 'slug-name': {
                slugs = re.findall(r"^\s*'([^']+)'\s*:", content, re.MULTILINE)
                seo_slugs.update(slugs)
    return seo_slugs

calc_file = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\calculators.tsx'
seo_dir = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo'

all_calcs = get_calculators(calc_file)
seo_calcs = get_seo_slugs(seo_dir)

missing = [c for c in all_calcs if c not in seo_calcs]

print(f"Total Calculators: {len(all_calcs)}")
print(f"Total SEO Entries: {len(seo_calcs)}")
print(f"Missing SEO for: {len(missing)} calculators")
for m in sorted(missing):
    print(f" - {m}")
