import re

with open('src/app/electricity/nepal-unit-price/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Extract FAQs
def extract_qas(block_text):
    qas = []
    matches = re.finditer(r'\{\s*q:\s*([\'"])(.*?)\1,\s*a:\s*([\'"])(.*?)\3\s*\}', block_text, re.DOTALL)
    for m in matches:
        qas.append((m.group(2), m.group(4)))
    return qas

def extract_paa(block_text):
    qas = []
    summaries = re.finditer(r'<summary[^>]*>(.*?)<span', block_text, re.DOTALL)
    paras = re.finditer(r'<p[^>]*border-blue-600[^>]*>(.*?)<\/p>', block_text, re.DOTALL)
    s_list = [s.group(1).strip() for s in summaries]
    p_list = [p.group(1).strip() for p in paras]
    for i in range(min(len(s_list), len(p_list))):
        qas.append((s_list[i], p_list[i]))
    return qas

qa1_block = re.search(r'\{\/\* ── AI ANSWER TABLE ── \*\/\}[\s\S]*?<\/div>\s*<\/section>', text)
paa_block = re.search(r'\{\/\* ── PEOPLE ALSO ASK ── \*\/\}[\s\S]*?<\/div>\s*<\/div>', text)
faq_block = re.search(r'\{\/\* ─────────────────────────────────\n\s*FAQ SECTION\n\s*───────────────────────────────── \*\/\}[\s\S]*?<\/div>\s*<\/section>', text)

qas = []
if qa1_block:
    qas.extend(extract_qas(qa1_block.group(0)))
if paa_block:
    qas.extend(extract_paa(paa_block.group(0)))
if faq_block:
    qas.extend(extract_qas(faq_block.group(0)))

print(f'Extracted {len(qas)} total questions.')

# Escape quotes in answers
escaped_qas = []
for q, a in qas:
    e_q = q.replace('"', '\\"')
    e_a = a.replace('"', '\\"')
    escaped_qas.append((e_q, e_a))

new_faq_list = ',\n              '.join([f'{{ q: "{q}", a: "{a}" }}' for q, a in escaped_qas])

# Remove old blocks
if qa1_block:
    text = text.replace(qa1_block.group(0), '')
if paa_block:
    text = text.replace(paa_block.group(0), '')

# Replace FAQ block
if faq_block:
    old_faq = faq_block.group(0)
    new_faq = re.sub(r'\{\[\s*[\s\S]*?\s*\]\.map', f'{{[\n              {new_faq_list}\n            ].map', old_faq)
    new_faq = new_faq.replace('>Frequently Asked Questions<', '>People Also Ask<')
    new_faq = new_faq.replace('id="faq"', 'id="people-also-ask"')
    text = text.replace(old_faq, new_faq)

with open('src/app/electricity/nepal-unit-price/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

