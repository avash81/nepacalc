import re

with open('src/app/electricity/nepal-unit-price/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all H2s
# Wait, some H2s are inside sections with IDs. Some don't have IDs.
# For TOC, we need an ID on the section. Let's add an ID if it's missing.

def generate_id(title):
    title = title.lower()
    title = re.sub(r'[^a-z0-9\s-]', '', title)
    title = re.sub(r'\s+', '-', title).strip('-')
    return title

sections = []
pos = 0

# We will regex search for <h2...>(.*?)</h2> and check if it's inside a <section>.
# But since this is a bit messy, let's just find all <h2 tags and assign them IDs directly on the H2 if no section ID exists.
# Actually, the user asked to just update the TOC with all remaining H2s in flow order.

import uuid

new_text = ""
last_end = 0
toc_items = []

# Find all H2s.
for match in re.finditer(r'(<section[^>]*>)?\s*(<h2[^>]*>)(.*?)(<\/h2>)', text, re.DOTALL | re.IGNORECASE):
    section_tag = match.group(1)
    h2_open = match.group(2)
    title = match.group(3).strip()
    h2_close = match.group(4)
    
    # Check if section has id
    sec_id = None
    if section_tag:
        id_match = re.search(r'id=[\'"]([^\'"]+)[\'"]', section_tag)
        if id_match:
            sec_id = id_match.group(1)
    
    # Check if H2 has id
    h2_id_match = re.search(r'id=[\'"]([^\'"]+)[\'"]', h2_open)
    if h2_id_match:
        sec_id = h2_id_match.group(1)
        
    if not sec_id:
        # Generate an ID and add it to H2
        sec_id = generate_id(title)
        if not sec_id:
            sec_id = f"section-{uuid.uuid4().hex[:6]}"
        
        # Ensure ID is unique
        while any(t[0] == '#' + sec_id for t in toc_items):
            sec_id += "-1"
            
        new_h2_open = h2_open.replace('<h2 ', f'<h2 id="{sec_id}" ')
        if '<h2 id=' not in new_h2_open: # if it was exactly <h2>
            new_h2_open = new_h2_open.replace('<h2>', f'<h2 id="{sec_id}">')
            
        full_match = (section_tag or '') + '\n' + new_h2_open + title + h2_close
        new_text += text[last_end:match.start()] + full_match
    else:
        new_text += text[last_end:match.end()]
        
    toc_items.append(('#' + sec_id, title))
    last_end = match.end()

new_text += text[last_end:]

# Now replace the TOC array in new_text
toc_list = ',\n                '.join([f'["{href}", "{label}"]' for href, label in toc_items])

old_toc_block_match = re.search(r'\{\/\* ── TABLE OF CONTENTS ── \*\/\}[\s\S]*?<\/ol>', new_text)
if old_toc_block_match:
    old_toc_block = old_toc_block_match.group(0)
    new_toc_block = re.sub(r'\{\[\s*[\s\S]*?\s*\]\.map', f'{{[\n                {toc_list}\n              ].map', old_toc_block)
    new_text = new_text.replace(old_toc_block, new_toc_block)

with open('src/app/electricity/nepal-unit-price/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print(f'Updated TOC with {len(toc_items)} items.')
