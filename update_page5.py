import re

path = 'src/app/engineering/3d/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

faq_target = """                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      Is this calculator free?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Yes, our 3D Graph Calculator is 100% free to use. There are no paywalls, hidden fees, or subscription required, making it ideal for students and professionals looking for accessible math tools.
                    </p>
                  </details>
                </div>"""

faq_replacement = """                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      Is this calculator free?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Yes, our 3D Graph Calculator is 100% free to use. There are no paywalls, hidden fees, or subscription required, making it ideal for students and professionals looking for accessible math tools.
                    </p>
                  </details>
                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      Does it work on mobile devices?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Yes, the calculator is fully responsive and supports smartphones and tablets with touch-based rotation and zoom, allowing you to plot surfaces on the go.
                    </p>
                  </details>
                </div>"""

if faq_target in content:
    content = content.replace(faq_target, faq_replacement)
else:
    print("FAQ Target not found again")

schema_target = """                {
                  "@type": "Question",
                  "name": "Is this calculator free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our 3D Graph Calculator is 100% free to use. There are no paywalls, hidden fees, or subscription required, making it ideal for students and professionals looking for accessible math tools."
                  }
                }
              ]
            }"""

schema_replacement = """                {
                  "@type": "Question",
                  "name": "Is this calculator free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our 3D Graph Calculator is 100% free to use. There are no paywalls, hidden fees, or subscription required, making it ideal for students and professionals looking for accessible math tools."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does it work on mobile devices?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the calculator is fully responsive and supports smartphones and tablets with touch-based rotation and zoom, allowing you to plot surfaces on the go."
                  }
                }
              ]
            }"""

if schema_target in content:
    content = content.replace(schema_target, schema_replacement)
else:
    print("Schema Target not found again")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Page 4.1 update done")
