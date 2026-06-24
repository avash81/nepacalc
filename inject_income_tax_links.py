import os
import re

targets = {
    'nea-bill': 'Your electricity bill and income tax are two of the largest annual financial obligations for most Nepali households. Use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Nepal Income Tax Calculator</Link> to estimate your annual income tax alongside your electricity costs.',
    'nepal-salary': 'Understanding your gross salary is only part of the picture. To see exactly how much income tax is deducted from your salary under the latest FY 2083/84 IRD slabs, use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Income Tax Calculator Nepal</Link>.',
    'nepal-tds': 'TDS is calculated based on the employee\'s projected annual tax liability. To verify the correct tax slab applied to your salary, cross-check with the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Income Tax Calculator Nepal</Link> which supports SSF, EPF, CIT and insurance deductions.',
    'kukl-bill': 'Beyond utility bills, annual income tax is one of the most important financial obligations for Kathmandu residents. Use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Nepal Income Tax Calculator</Link> to estimate your FY 2083/84 tax liability.',
}

base_path = 'src/app/calculator'

for folder, sentence in targets.items():
    file_path = os.path.join(base_path, folder, 'page.tsx')
    if not os.path.exists(file_path):
        print(f"Not found: {file_path}")
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if '/calculator/nepal-income-tax/' in content:
        print(f"Already has income tax link in {folder}")
        continue

    # Find the existing tip block (from vehicle tax injection) and append another tip after it
    existing_tip = re.search(r'(<p className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-slate-700"><strong>Tip:</strong>.*?</p>)', content, re.DOTALL)
    if existing_tip:
        new_tip = f'\n        <p className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg text-slate-700 mt-4"><strong>Also useful:</strong> {sentence}</p>'
        new_content = content[:existing_tip.end()] + new_tip + content[existing_tip.end():]
        if 'import Link' not in new_content:
            new_content = "import Link from 'next/link';\n" + new_content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Appended income tax tip to {folder}")
        continue

    # No existing tip - find Calculator component and wrap with a fragment + tip block
    calc_match = re.search(r'(<Calculator\s*(?:\{[^}]*\})?\s*/>)', content, re.DOTALL)
    if calc_match:
        block = f'''<>
      {calc_match.group(1)}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg text-slate-700"><strong>Also useful:</strong> {sentence}</p>
      </div>
    </>'''
        new_content = content[:calc_match.start(1)] + block + content[calc_match.end(1):]
        if 'import Link' not in new_content:
            new_content = "import Link from 'next/link';\n" + new_content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Injected income tax tip block in {folder}")
    else:
        print(f"Could not find insertion point in {folder}")

print("Done.")
