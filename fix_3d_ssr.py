with open('src/app/engineering/3d/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('ssr: false,', 'ssr: true,')

with open('src/app/engineering/3d/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
