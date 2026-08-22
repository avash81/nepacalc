path = "src/app/math-tools/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

if "import Link from 'next/link';" not in content:
    content = content.replace("import { JsonLd } from '@/components/seo/JsonLd';", "import { JsonLd } from '@/components/seo/JsonLd';\nimport Link from 'next/link';")

old_text = "NepaCalc provides mathematics and education calculators for students, teachers and professionals. Tools include GPA, CGPA, statistics, algebra, calculus, geometry, fraction and percentage calculators. Results are generated from mathematical formulas."

new_text = "NepaCalc provides mathematics and education calculators for students, teachers and professionals. Tools include GPA, CGPA, statistics, algebra, calculus, geometry, fraction and percentage calculators, as well as a <Link href=\"/engineering/graphing/\" className=\"text-blue-600 hover:underline\">Free Online Graphing Calculator</Link> for plotting functions and visualizing equations. Results are generated from mathematical formulas."

content = content.replace(old_text, new_text)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated math tools page")
