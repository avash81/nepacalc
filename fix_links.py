import os
import re

targets = {
    'nea-bill': ('Vehicle Tax Calculator Nepal', 'If you own a vehicle, check our <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax Calculator Nepal</Link> to estimate your annual road tax.'),
    'nepal-salary': ('Bluebook Renewal Calculator', 'Plan your annual expenses better by estimating your vehicle tax using the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Bluebook Renewal Calculator</Link>.'),
    'nepal-income-tax': ('Vehicle Tax Calculator Nepal', 'Aside from income tax, vehicle owners should also account for annual road taxes. Use the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax Calculator Nepal</Link> to calculate your dues.'),
    'nepal-tds': ('Road Tax Calculator Nepal', 'If you are calculating taxes, you might also need the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Road Tax Calculator Nepal</Link> for your personal or commercial vehicles.'),
    'property-registration': ('Vehicle Tax Calculator Nepal', 'Similar to property registration, vehicle ownership requires tax clearance. Estimate your costs with the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax Calculator Nepal</Link>.')
}

base_path = 'src/app/calculator'

def clean_file(content):
    # Remove the generic injected block
    pattern = r'<>(\s*<Calculator\s*(?:\{[^}]*\})?\s*/>\s*)<div className="max-w-\[1200px\][^>]*>\s*<div className="bg-white[^>]*>\s*<h2 className="text-xl font-bold mb-4">Related Calculators</h2>\s*<ul[^>]*>\s*<li><Link href="/calculator/nepal-vehicle-tax/"[^>]*>[^<]*</Link></li>\s*</ul>\s*</div>\s*</div>\s*</>'
    content = re.sub(pattern, r'\1', content)
    return content

for folder, (anchor, sentence) in targets.items():
    file_path = os.path.join(base_path, folder, 'page.tsx')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        content = clean_file(content)
        
        # Now inject the sentence contextually.
        # We will append a small paragraph at the bottom of the prose section, or just add a quick tip.
        # Look for the last closing </div> inside the main prose.
        
        prose_match = re.search(r'(<div className="[^"]*prose[^"]*">)(.*?)(</div>\s*</div>\s*(?:</>)?\s*)$', content, re.DOTALL)
        if prose_match:
            new_content = content[:prose_match.end(2)] + f'\n\n<p className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-slate-700"><strong>Tip:</strong> {sentence}</p>\n' + content[prose_match.start(3):]
            if 'import Link' not in new_content:
                new_content = "import Link from 'next/link';\n" + new_content
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Contextual link injected in {folder}")
        else:
            # If no prose section, just append it after Calculator
            calc_match = re.search(r'(<Calculator\s*(?:\{[^}]*\})?\s*/>)', content, re.DOTALL)
            if calc_match:
                block = f'''
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-slate-700"><strong>Tip:</strong> {sentence}</p>
      </div>
'''
                new_content = content[:calc_match.end(1)] + block + content[calc_match.end(1):]
                if 'import Link' not in new_content:
                    new_content = "import Link from 'next/link';\n" + new_content
                
                # Check if it's returning multiple elements without fragment
                if not re.search(r'<\s*>', new_content) and '<div' not in content[:calc_match.start(1)]:
                    new_content = new_content.replace(calc_match.group(1) + block, f"<>{calc_match.group(1)}{block}</>")

                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Contextual link block appended in {folder}")

# For the other ones where I injected the generic block, I should clean them too
other_folders = ['sip-calculator', 'loan-emi', 'nepal-home-loan', 'fd-calculator', 'savings', 'property-tax', 'nepal-vat']
for folder in other_folders:
    file_path = os.path.join(base_path, folder, 'page.tsx')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        cleaned = clean_file(content)
        if cleaned != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(cleaned)
            print(f"Cleaned {folder}")

print("Done.")
