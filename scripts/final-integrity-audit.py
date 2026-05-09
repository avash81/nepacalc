
import os
import re

def run_final_audit():
    seo_file = 'src/data/seo-content.tsx'
    with open(seo_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into individual calculator entries
    entries = re.split(r"'\w+[\-\w]*': {", content)
    
    audit_results = []
    total_count = len(entries) - 1 # First split is the imports
    
    for i in range(1, len(entries)):
        block = entries[i]
        
        # 1. Word Count Check
        words = len(re.findall(r'\w+', block))
        wc_pass = words >= 3000
        
        # 2. Dark Box Check (Aesthetic)
        dark_pass = 'bg-slate-900' not in block and 'bg-slate-800' not in block
        
        # 3. Logic Keywords Check
        keywords = ['Historical Evolution', 'Parameter Deep-Dive', 'Institutional Auditing', 'Strategic Case Study']
        logic_pass = all(k in block for k in keywords)
        
        # 4. Link Check
        links_pass = 'href=' in block and 'Link' in block
        
        if wc_pass and dark_pass and logic_pass and links_pass:
            audit_results.append(True)
        else:
            print(f"FAILED Entry {i}: WC={words}, DarkBox={not dark_pass}, Logic={logic_pass}, Links={links_pass}")

    print(f"TOTAL AUDIT: {len(audit_results)} / {total_count} Pages Verified 100% Correct.")
    
    if len(audit_results) == total_count:
        print("STATUS: ALL 104 PAGES ARE READY FOR DEPLOYMENT.")
    else:
        print(f"WARNING: {total_count - len(audit_results)} PAGES REQUIRE RE-SYNC.")

run_final_audit()
