import re

with open('src/components/calculator/CalcWrapper.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add titleClassName and compactHeader to Props
content = content.replace(
    '  disableSchema?: boolean;\n}',
    '  disableSchema?: boolean;\n  titleClassName?: string;\n  compactHeader?: boolean;\n}'
)

content = content.replace(
    'hideHeader = false, hideBreadcrumb = false, disableSchema = false\n}: Props) {',
    'hideHeader = false, hideBreadcrumb = false, disableSchema = false, titleClassName, compactHeader\n}: Props) {'
)

# Pass titleClassName and compactHeader down if it renders a child that takes it? No, CalcWrapper renders its own h1
content = content.replace(
    '<h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">{title}</h1>',
    '<h1 className={titleClassName || "text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4"}>{title}</h1>'
)

with open('src/components/calculator/CalcWrapper.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
