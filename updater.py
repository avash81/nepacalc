import re
import sys

def update_calc(slug, new_content_file):
    filepath = 'src/data/seo/financial.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    with open(new_content_file, 'r', encoding='utf-8') as f:
        new_content = f.read()

    # Find the calculator block
    pattern = r"('" + slug + r"':\s*\{.*?content:\s*\()(.*?)(\),?\s*faqs:)"
    
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print(f"Could not find block for {slug}")
        # Try alternate pattern
        pattern2 = r"('" + slug + r"':\s*\{.*?content:\s*\()(.*?)(\)\s*,\s*\})"
        match2 = re.search(pattern2, content, re.DOTALL)
        if not match2:
            print(f"Still no match for {slug}")
            sys.exit(1)
        else:
            match = match2
            
    new_full = content[:match.start(2)] + "\n" + new_content + "\n    " + content[match.start(3):]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_full)
    print(f"Updated {slug}")

if __name__ == '__main__':
    update_calc(sys.argv[1], sys.argv[2])
