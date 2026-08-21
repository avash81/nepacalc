import re

path = 'src/app/market-rates/live-gold-price/GoldDashboardClient.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# ─── 1. Fix broken mobile TOC (has duplicate nested <ol> tags) ────────────
old_mobile = re.search(
    r'\{/\* MOBILE TOC \*/\}.*?</div>\s*(?=\n\n)',
    content, re.DOTALL
)

NEW_MOBILE_TOC = '''      {/* MOBILE TOC - Collapsible */}
      <div className="nb-toc-mobile lg:hidden mb-6">
        <details>
          <summary>On this page — {tocItems.filter(i => !i.divider).length} sections</summary>
          <ol>
            {(() => { let n=0; return tocItems.map((entry, idx) => {
              if (entry.divider) return <div key={"div-"+idx} className="nb-toc-divider" />;
              n++;
              const num = String(n).padStart(2,'0');
              return (
                <li key={entry.id}>
                  <a href={"#"+entry.id}>
                    <span className="nb-toc-num">{num}</span>
                    {entry.label}
                  </a>
                </li>
              );
            }); })()}
          </ol>
        </details>
      </div>'''

# Replace the broken mobile TOC block
content = re.sub(
    r'\{/\* MOBILE TOC \*/\}.*?\{/\* MOBILE TOC \*/\}[\s\S]*?</div>\s*\n',
    NEW_MOBILE_TOC + '\n\n',
    content,
    count=1,
    flags=re.DOTALL
)

# More targeted: replace the broken mobile block
content = re.sub(
    r'(\{/\* MOBILE TOC \*/\}\s*<div className="lg:hidden mb-12">[\s\S]*?</div>\s*\n)',
    NEW_MOBILE_TOC + '\n\n',
    content,
    count=1,
    flags=re.DOTALL
)

# ─── 2. Fix desktop TOC + SEO sections (TOC at bottom, broken structure) ──
# Replace the entire bottom section
OLD_BOTTOM = re.compile(
    r'\{/\* 5\. SEO Sections \*/\}[\s\S]*?</div>\s*\n\s*</div>\s*\n\s*\);\s*\}',
    re.DOTALL
)

NEW_BOTTOM = '''      {/* 5. SEO Sections + Sticky TOC — proper nb-layout grid */}
      <div className="nb-layout" style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 260px',gap:'36px',alignItems:'start'}}>
        <main className="nb-main min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none">
            <SeoSections rates={rates} fmt={fmt} />
          </div>
        </main>

        {/* DESKTOP STICKY TOC */}
        <aside className="nb-toc hidden lg:block" style={{position:'sticky',top:'88px',maxHeight:'calc(100vh - 100px)',overflowY:'auto',scrollbarWidth:'thin',alignSelf:'start'}}>
          <span className="nb-toc-head">On this page</span>
          <ol style={{listStyle:'none',margin:0,padding:0,borderLeft:'2px solid #e2e8f0'}}>
            {(() => { let n=0; return tocItems.map((entry, idx) => {
              if (entry.divider) return <div key={"div-"+idx} style={{height:'1px',background:'#e2e8f0',margin:'12px 0'}} />;
              n++;
              const num = String(n).padStart(2,'0');
              return (
                <li key={entry.id}>
                  <a href={"#"+entry.id} style={{display:'block',padding:'6px 0 6px 14px',fontSize:'0.875rem',color:'#475569',textDecoration:'none',borderLeft:'2px solid transparent',marginLeft:'-2px',lineHeight:'1.4',fontWeight:500}} className="hover:!border-l-blue-500 hover:!text-blue-600">
                    <span style={{fontFamily:'ui-monospace,monospace',fontSize:'0.7rem',color:'#94a3b8',marginRight:'8px',fontWeight:700}}>{num}</span>
                    {entry.label}
                  </a>
                </li>
              );
            }); })()}
          </ol>
        </aside>
      </div>
    </div>
  );
}'''

content = OLD_BOTTOM.sub(NEW_BOTTOM, content, count=1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done - Gold TOC fixed")
