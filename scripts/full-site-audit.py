
import os
import re

content_file = 'src/data/seo-content.tsx'
with open(content_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find all calculator entries
pattern = re.compile(r"\'([a-z0-9\-]+)\': \{", re.DOTALL)
keys = pattern.findall(content)

print(f"Starting Audit of {len(keys)} Calculators...")
print("-" * 50)

failures = []
for key in keys:
    # Extract the block for this key
    block_pattern = re.compile(rf"\'{key}\': \{{(.*?)\n  \}},", re.DOTALL)
    block_match = block_pattern.search(content)
    
    if block_match:
        block_text = block_match.group(1)
        
        # 1. Word Count Check
        words = len(re.findall(r'\w+', block_text))
        
        # 2. Section Check
        sections = [
            "SECTION 1: THE HOOK",
            "SECTION 2: THE THEORY",
            "SECTION 3: THE MATHEMATICAL ENGINE",
            "Institutional technical Guide",
            "SECTION 5: EXPERT CORNER"
        ]
        
        missing_sections = [s for s in sections if s not in block_text]
        
        if words < 1500 or missing_sections:
            failures.append({
                "key": key,
                "words": words,
                "missing": missing_sections
            })
            print(f"FAIL: {key} | Words: {words} | Missing: {len(missing_sections)} sections")
        else:
            # print(f"PASS: {key} | Words: {words}")
            pass
    else:
        # print(f"SKIP: {key} (Could not parse block)")
        pass

print("-" * 50)
if not failures:
    print(f"AUDIT COMPLETE: All {len(keys)} pages PASS the 1,500-word and 'Lab Report' structure test.")
else:
    print(f"AUDIT COMPLETE: {len(failures)} pages failed the test.")
    for f in failures[:10]: # Show first 10 failures
        print(f" - {f['key']}: {f['words']} words, missing: {f['missing']}")
