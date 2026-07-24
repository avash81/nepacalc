import os

filepath = r"c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\app\calculator\kukl-bill\Calculator.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

search = "relatedTools={[]}"
replace = """relatedTools={[
        { label: 'NEA Electricity Bill Calculator', href: '/calculator/nea-bill/' },
        { label: 'Property Tax Calculator', href: '/calculator/property-tax/' },
        { label: 'Nepal Salary Tax Calculator', href: '/calculator/nepal-salary/' },
        { label: 'Income Tax Calculator', href: '/calculator/nepal-income-tax/' }
      ]}"""

content = content.replace(search, replace)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated Calculator.tsx")
