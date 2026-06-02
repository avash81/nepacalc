import re
import sys
import json

def patch_file(file_path, replacements_file):
    with open(replacements_file, 'r', encoding='utf-8') as f:
        replacements = json.load(f)

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    for key, new_content in replacements.items():
        # Find the start of the calculator object
        key_pattern = r"'" + key + r"':\s*\{"
        match = re.search(key_pattern, content)
        if not match:
            print(f"Key {key} not found")
            continue
            
        start_idx = match.start()
        
        content_start_pattern = r"content:\s*\("
        content_match = re.search(content_start_pattern, content[start_idx:])
        if not content_match:
            print(f"content block not found for {key}")
            continue
            
        abs_content_start = start_idx + content_match.start()
        
        # To find the end, we look for the faqs block
        faqs_pattern = r"\n\s*faqs:\s*\["
        faqs_match = re.search(faqs_pattern, content[abs_content_start:])
        if not faqs_match:
            print(f"faqs block not found for {key}")
            continue
            
        abs_content_end = abs_content_start + faqs_match.start()
        
        # Search backwards from abs_content_end to find the closing bracket/paren for content
        # Usually it's `    ),`
        closing_pattern = r"\),\s*$"
        old_block = content[abs_content_start:abs_content_end]
        
        # We'll just replace everything from "content: (" up to right before "faqs: ["
        # Wait, the exact string to replace includes the ")," before "faqs: ["
        # Let's find the closing parenthesis of the content block
        match_closing = re.search(r"\)\s*,\s*$", old_block)
        if match_closing:
            pass # old_block already ends with ), 
            
        replacement_block = f"content: (\n{new_content}\n    ),"
        
        # Make sure to replace exactly old_block with replacement_block, EXCEPT old_block might not include the final comma if our regex didn't catch it
        # Actually, let's just replace from abs_content_start to the end of `),`
        
        # Find `),` backwards from abs_content_end
        last_comma = old_block.rfind("),")
        if last_comma != -1:
            abs_content_end = abs_content_start + last_comma + 2
            
        content = content[:abs_content_start] + f"content: (\n{new_content}\n    )," + content[abs_content_end:]
        print(f"Patched {key}")
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    patch_file(sys.argv[1], sys.argv[2])
