import os
import re

targets = {
    'nea-bill': 'Vehicle Tax Calculator Nepal',
    'nepal-salary': 'Bluebook Renewal Calculator',
    'nepal-income-tax': 'Vehicle Tax Calculator Nepal',
    'nepal-tds': 'Road Tax Calculator Nepal',
    'property-registration': 'Vehicle Tax Calculator Nepal',
    'sip-calculator': 'Vehicle Tax Calculator Nepal',
    'loan-emi': 'Vehicle Tax Calculator Nepal',
    'nepal-home-loan': 'Vehicle Tax Calculator Nepal',
    'fd-calculator': 'Vehicle Tax Calculator Nepal',
    'savings': 'Vehicle Tax Calculator Nepal',
    'property-tax': 'Vehicle Tax Calculator Nepal',
    'nepal-vat': 'Vehicle Tax Calculator Nepal',
}

base_path = 'src/app/calculator'

for folder, anchor in targets.items():
    file_path = os.path.join(base_path, folder, 'page.tsx')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if '/calculator/nepal-vehicle-tax' in content:
            print(f"Already injected in {folder}")
            continue
            
        link_str = f'<li><Link href="/calculator/nepal-vehicle-tax/" className="hover:underline text-blue-600">{anchor}</Link></li>\n'
        
        # 1. Try to find an existing Related / More ul
        related_match = re.search(r'(<h[234][^>]*>.*?(Related|More|Useful).*?</h[234]>.*?<ul[^>]*>)', content, re.IGNORECASE | re.DOTALL)
        if related_match:
            insert_pos = related_match.end()
            new_content = content[:insert_pos] + '\n            ' + link_str + content[insert_pos:]
            if 'import Link' not in new_content:
                new_content = "import Link from 'next/link';\n" + new_content
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected into {folder} using Related match.")
            continue
            
        # 2. Replace <Calculator /> with Fragment
        calc_match = re.search(r'(<Calculator\s*(?:\{[^}]*\})?\s*/>)(?!.*<Calculator)', content, re.DOTALL)
        if calc_match:
            block = f'''<>
      {calc_match.group(1)}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
          <h2 className="text-xl font-bold mb-4">Related Calculators</h2>
          <ul className="list-disc pl-6 space-y-2 text-blue-600">
            {link_str.strip()}
          </ul>
        </div>
      </div>
    </>'''
            new_content = content[:calc_match.start(1)] + block + content[calc_match.end(1):]
            if 'import Link' not in new_content:
                new_content = "import Link from 'next/link';\n" + new_content
                
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected block into {folder} by wrapping Calculator.")
            continue

        print(f"Failed to find insertion point for {folder}")
    else:
        print(f"File not found: {file_path}")

print("Done injecting links.")
