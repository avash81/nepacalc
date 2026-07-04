import re

path = 'src/app/engineering/3d/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 7. EXPAND COMPARISON TABLE
comp_target = """                <h2 id="comparisons" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Best 3D Graph Calculators Compared</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse border border-[#DADCE0] text-left text-sm shadow-sm">
                    <caption className="sr-only">Comparison of 3D Graph Calculators</caption>
                    <thead className="bg-[#E8F0FE] text-[#1967D2]">
                      <tr>
                        <th className="p-3 border border-[#DADCE0]">Tool</th>
                        <th className="p-3 border border-[#DADCE0]">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#5F6368]">
                      <tr>
                        <td className="p-3 border border-[#DADCE0] font-medium">NepaCalc</td>
                        <td className="p-3 border border-[#DADCE0]">Education + Engineering</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-3 border border-[#DADCE0] font-medium">Desmos</td>
                        <td className="p-3 border border-[#DADCE0]">Quick plotting</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-[#DADCE0] font-medium">GeoGebra</td>
                        <td className="p-3 border border-[#DADCE0]">Geometry</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-3 border border-[#DADCE0] font-medium">MATLAB</td>
                        <td className="p-3 border border-[#DADCE0]">Professional computing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>"""

comp_replacement = """                <h2 id="comparisons" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Best 3D Graph Calculators Compared</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse border border-[#DADCE0] text-left text-sm shadow-sm whitespace-nowrap">
                    <caption className="sr-only">Comparison of 3D Graph Calculators</caption>
                    <thead className="bg-[#E8F0FE] text-[#1967D2]">
                      <tr>
                        <th className="p-3 border border-[#DADCE0]">Feature</th>
                        <th className="p-3 border border-[#DADCE0]">NepaCalc 3D Grapher</th>
                        <th className="p-3 border border-[#DADCE0]">Standard 2D Graphers</th>
                        <th className="p-3 border border-[#DADCE0]">Pro Software (e.g. MATLAB)</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#5F6368]">
                      <tr>
                        <td className="p-3 border border-[#DADCE0] font-medium">Browser Based</td>
                        <td className="p-3 border border-[#DADCE0] text-green-600 font-bold">Yes</td>
                        <td className="p-3 border border-[#DADCE0]">Yes</td>
                        <td className="p-3 border border-[#DADCE0] text-red-500">No</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-3 border border-[#DADCE0] font-medium">Installation Required</td>
                        <td className="p-3 border border-[#DADCE0] text-green-600 font-bold">No</td>
                        <td className="p-3 border border-[#DADCE0]">No</td>
                        <td className="p-3 border border-[#DADCE0] text-red-500">Yes (Heavy)</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-[#DADCE0] font-medium">Multiple Surfaces</td>
                        <td className="p-3 border border-[#DADCE0] text-green-600 font-bold">Yes</td>
                        <td className="p-3 border border-[#DADCE0] text-red-500">No</td>
                        <td className="p-3 border border-[#DADCE0]">Yes</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-3 border border-[#DADCE0] font-medium">Engineering Presets</td>
                        <td className="p-3 border border-[#DADCE0] text-green-600 font-bold">Yes</td>
                        <td className="p-3 border border-[#DADCE0] text-red-500">No</td>
                        <td className="p-3 border border-[#DADCE0]">Requires Coding</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-[#DADCE0] font-medium">Interactive Rotation</td>
                        <td className="p-3 border border-[#DADCE0] text-green-600 font-bold">Yes</td>
                        <td className="p-3 border border-[#DADCE0] text-red-500">No</td>
                        <td className="p-3 border border-[#DADCE0]">Yes</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-3 border border-[#DADCE0] font-medium">Free</td>
                        <td className="p-3 border border-[#DADCE0] text-green-600 font-bold">Yes</td>
                        <td className="p-3 border border-[#DADCE0]">Yes</td>
                        <td className="p-3 border border-[#DADCE0] text-red-500">No (Paid License)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>"""

if comp_target in content:
    content = content.replace(comp_target, comp_replacement)
else:
    print("Comp target not found")

# 9. EXPAND FAQ
faq_target = """                <h2 id="related-concepts" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Related Mathematical Concepts</h2>"""
faq_replacement = """                <h2 id="faqs" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6 mt-16">Frequently Asked Questions (FAQ)</h2>
                <div className="space-y-4 mb-12">
                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer" open>
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      Can I graph implicit equations?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Yes. The NepaCalc 3D Graph Calculator supports implicit equations like spheres (e.g. <code className="bg-gray-100 px-1 rounded">x² + y² + z² = 16</code>) using marching cubes algorithms to render complex closed shapes instantly.
                    </p>
                  </details>
                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      What is the difference between a 2D and 3D graph?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      A 2D graph plots relationships between two variables (x and y) resulting in curves or lines. A 3D graph adds depth by introducing a third variable (z), mapping out volumetric shapes and continuous surfaces like paraboloids and cylinders.
                    </p>
                  </details>
                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      Can I graph parametric equations?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Currently, the calculator natively plots explicit functions <code>z = f(x,y)</code> and standard implicit equations. Full support for parameterized inputs (u,v) is being added in the next feature update.
                    </p>
                  </details>
                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      What is a surface plot?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      A surface plot connects data points in a 3-dimensional grid to form a solid "skin" or surface over an area. It is widely used in data science, physics, and engineering to visualize how one variable changes in response to two independent inputs.
                    </p>
                  </details>
                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      How do engineers use 3D graph calculators?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Engineers use them for finite element analysis, plotting stress distributions across surfaces, visualizing fluid dynamics (pressure maps), finding optimization parameters for machine designs, and determining optimal load paths for structural designs.
                    </p>
                  </details>
                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      Can I plot multiple equations at once?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Yes! You can add multiple surfaces by entering additional equations. The grapher will overlay them in the same 3D space, which is perfect for discovering points of intersection between planes, spheres, and cylinders.
                    </p>
                  </details>
                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      Is this calculator free?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Yes, our 3D Graph Calculator is 100% free to use. There are no paywalls, hidden fees, or subscription required, making it ideal for students and professionals looking for accessible math tools.
                    </p>
                  </details>
                </div>

                <h2 id="related-concepts" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Related Mathematical Concepts</h2>"""

if faq_target in content:
    content = content.replace(faq_target, faq_replacement)
else:
    print("Faq target not found")

# Fix Schema 
schema_target = """        "url": "https://nepacalc.com/engineering/3d/",
        "author": {
          "@type": "Organization",
          "name": "NepaCalc"
        },"""

schema_replacement = schema_target + """
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I graph implicit equations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The NepaCalc 3D Graph Calculator supports implicit equations like spheres using marching cubes algorithms to render complex closed shapes instantly."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between a 2D and 3D graph?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 2D graph plots relationships between two variables (x and y) resulting in curves or lines. A 3D graph adds depth by introducing a third variable (z), mapping out volumetric shapes and continuous surfaces like paraboloids and cylinders."
            }
          },
          {
            "@type": "Question",
            "name": "What is a surface plot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A surface plot connects data points in a 3-dimensional grid to form a solid skin or surface over an area. It is widely used in data science, physics, and engineering to visualize how one variable changes in response to two independent inputs."
            }
          },
          {
            "@type": "Question",
            "name": "How do engineers use 3D graph calculators?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Engineers use them for finite element analysis, plotting stress distributions across surfaces, visualizing fluid dynamics, finding optimization parameters for machine designs, and determining optimal load paths for structural designs."
            }
          },
          {
            "@type": "Question",
            "name": "Can I plot multiple equations at once?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! You can add multiple surfaces by entering additional equations. The grapher will overlay them in the same 3D space, which is perfect for discovering points of intersection between planes, spheres, and cylinders."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our 3D Graph Calculator is 100% free to use. There are no paywalls, hidden fees, or subscription required, making it ideal for students and professionals looking for accessible math tools."
            }
          }
        ],"""

if schema_target in content:
    content = content.replace(schema_target, schema_replacement)
else:
    print("Schema target not found")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Phase 2 update successfully")
