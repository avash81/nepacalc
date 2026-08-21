import re

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the mobile toc loop to have a proper counter and render the number
replacement = """      {/* MOBILE TOC */}
      <div className="lg:hidden mt-4">
        <MobileCollapsible title="TABLE OF CONTENTS: 23 SECTIONS">
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderLeft: '2px solid #e8eaed' }}>
            {(() => {
              let mobCounter = 0;
              return tocGroups.map((group, gi) => (
                <React.Fragment key={`mob-${gi}`}>
                  {gi > 0 && (
                    <div style={{ height: '1px', background: '#e8eaed', margin: '8px 0' }} />
                  )}
                  {group.items.map((item) => {
                    mobCounter++;
                    const num = String(mobCounter).padStart(2, '0');
                    return (
                      <li key={`mob-${item.id}`}>
                        <a
                          href={`#${item.id}`}
                          className="hover:!text-[#1a73e8] hover:!border-l-[#1a73e8]"
                          style={{
                            display: 'block',
                            padding: '6px 0 6px 14px',
                            fontSize: '0.82rem',
                            color: '#5f6368',
                            textDecoration: 'none',
                            borderLeft: '2px solid transparent',
                            marginLeft: '-2px',
                            lineHeight: 1.3,
                            transition: 'color 0.15s, border-color 0.15s',
                          }}
                        >
                          <span style={{
                            fontFamily: 'monospace',
                            fontSize: '0.67rem',
                            color: '#b59a00',
                            marginRight: '5px',
                            fontWeight: 700,
                          }}>{num}</span>
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </React.Fragment>
              ));
            })()}
          </ol>
        </MobileCollapsible>
      </div>"""

# replace from {/* MOBILE TOC */} to the end of the div
pattern = r'      {/\* MOBILE TOC \*/}\n      <div className="lg:hidden mt-4">[\s\S]*?      </div>'
content = re.sub(pattern, replacement, content)

with open('src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed silver mobile toc rendering")
