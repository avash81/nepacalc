with open('src/app/market-rates/silver-price-nepal/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

link_block = (
    '              <div className="mt-4 mb-2">\n'
    '                <a href="/market-rates/history/" className="inline-flex items-center text-[13px] font-bold text-amber-600 hover:text-amber-700 underline underline-offset-4 decoration-amber-200 transition-colors">\n'
    '                  View Historical Gold &amp; Silver Rates &rarr;\n'
    '                </a>\n'
    '              </div>\n\n'
)

lines = content.split('\n')
insert_at = None
for i, line in enumerate(lines):
    if 'Card 4' in line and 'Nepal Benchmark' in line:
        insert_at = i
        break

if insert_at is not None:
    lines.insert(insert_at, link_block)
    with open('src/app/market-rates/silver-price-nepal/page.tsx', 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'Done! Link inserted before line {insert_at}')
else:
    print('Card 4 comment not found!')
