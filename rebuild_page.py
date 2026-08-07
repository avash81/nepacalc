import re

def build():
    # We will read the old page to extract top part
    with open('src/app/nepal/nepal-budget/page.tsx', 'r', encoding='utf-8') as f:
        old_content = f.read()

    # Extract CSS
    css_match = re.search(r'const css = (.*?);', old_content, re.DOTALL)
    css = css_match.group(1) if css_match else ''

    # We need to update CSS for right sidebar TOC
    css = css.replace(
        '.nb-layout{max-width:1200px;margin:0 auto;padding:0 28px 80px;display:grid;grid-template-columns:240px minmax(0,1fr);gap:52px;}',
        '.nb-layout{max-width:1200px;margin:0 auto;padding:0 28px 80px;display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:52px;align-items:start;}'
    )
    css = css.replace(
        '@media(max-width:960px){.nb-layout{grid-template-columns:1fr;}.nb-toc{position:static!important;}}',
        '@media(max-width:960px){\n  .nb-layout{grid-template-columns:1fr;display:flex;flex-direction:column;}\n  .nb-toc{position:static!important;order:1;}\n  .nb-main{order:2;}\n}'
    )

    print("CSS extracted and updated.")
