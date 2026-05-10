import re

def get_slugs(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        return set(re.findall(r"slug: '([^']+)'", content))

def get_links(seo_files):
    links = set()
    for file_path in seo_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Match /calculator/slug or /calculator/slug/
            found = re.findall(r'href="/calculator/([^"/]+)/?"', content)
            for link in found:
                links.add(link)
    return links

calc_file = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\calculators.tsx'
seo_files = [
    r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\algebra.tsx',
    r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\education.tsx',
    r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\financial.tsx',
    r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\geometry.tsx',
    r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\health.tsx',
    r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\nepal-specific.tsx',
    r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\physics.tsx',
    r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\statistics.tsx',
    r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\utility.tsx'
]

slugs = get_slugs(calc_file)
links = get_links(seo_files)

broken_links = links - slugs
print("Broken Links (Link exists but slug does not):")
for link in sorted(broken_links):
    print(f"- {link}")

# Also check for links that might be nested under math-tools/ or engineering/
print("\nChecking for nested slugs...")
nested_slugs = {s for s in slugs if '/' in s}
for link in broken_links:
    if link in [s.split('/')[-1] for s in nested_slugs]:
        print(f"Note: '{link}' matches the end of a nested slug.")

# Check if all calculators have SEO entries
print("\nChecking for calculators without SEO entries...")
# This is harder because the SEO entries are keys in objects in those files.
# But we can at least check if the slug is mentioned in the SEO files.
seo_content = ""
for f in seo_files:
    with open(f, 'r', encoding='utf-8') as file:
        seo_content += file.read()

missing_seo = []
for slug in slugs:
    if f"'{slug}':" not in seo_content and f'"{slug}":' not in seo_content:
        missing_seo.append(slug)

print("Calculators missing SEO entry:")
for s in sorted(missing_seo):
    print(f"- {s}")
