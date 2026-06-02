import re

def analyze_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    matches = list(re.finditer(r"^\s*'([a-zA-Z0-9-]+)':\s*\{", content, re.MULTILINE))
    
    results = []
    for i, match in enumerate(matches):
        calc_name = match.group(1)
        start_idx = match.end()
        end_idx = matches[i+1].start() if i+1 < len(matches) else len(content)
        
        calc_block = content[start_idx:end_idx]
        
        # Find the content block
        content_match = re.search(r"content:\s*\((.*?)\),?\s*(?:^  \}|^\})", calc_block, re.DOTALL | re.MULTILINE)
        if not content_match:
            content_match = re.search(r"content:\s*\((.*)\)", calc_block, re.DOTALL)
            
        if content_match:
            content_str = content_match.group(1)
            word_count = len(content_str.split())
            links = re.findall(r'href=[\'"]/calculator/[^\'"]+[\'"]', content_str)
            link_count = len(links)
            results.append((calc_name, word_count, link_count))
        else:
            results.append((calc_name, 0, 0))

    for r in results:
        print(f"{r[0]}: {r[1]} words, {r[2]} links")

analyze_file('src/data/seo/financial.tsx')
