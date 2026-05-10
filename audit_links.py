import os
import re

def get_calculators(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    return set(re.findall(r"slug:\s*'([^']+)'", content))

def check_links(directory, valid_slugs):
    broken_links = []
    # Valid slugs also include some static pages
    valid_paths = {'/', '/about/', '/pricing/', '/blog/', '/contact/', '/privacy/', '/terms/', '/directory/', '/engineering/', '/finance/', '/health/', '/converters/', '/nepal/', '/market-rates/', '/guide/'}
    for slug in valid_slugs:
        valid_paths.add(f'/calculator/{slug}/')
        valid_paths.add(f'/calculator/{slug}')
        if '/' in slug:
             valid_paths.add(f'/{slug}/')
             valid_paths.add(f'/{slug}')

    for filename in os.listdir(directory):
        if filename.endswith('.tsx') and filename != 'types.ts':
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as f:
                content = f.read()
                # Find all internal links: href="/..."
                links = re.findall(r'href="/([^"]+)"', content)
                for link in links:
                    full_link = f'/{link}'
                    # Normalize: remove trailing slash for comparison if needed, but we added both to valid_paths
                    if full_link not in valid_paths and not full_link.startswith('/blog/') and not full_link.startswith('/guide/'):
                        broken_links.append((filename, full_link))
    return broken_links

calc_file = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\calculators.tsx'
seo_dir = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo'

valid_slugs = get_calculators(calc_file)
broken = check_links(seo_dir, valid_slugs)

if broken:
    print(f"Found {len(broken)} potentially broken or non-standard links:")
    for file, link in broken:
        print(f" - {file}: {link}")
else:
    print("No broken internal links found in SEO modules.")
