import re

path = 'src/app/engineering/3d/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

schema_target = """            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://nepacalc.com/#organization",
              "name": "NepaCalc",
              "url": "https://nepacalc.com",
              "logo": "https://nepacalc.com/logo.png"
            }
          ])"""

schema_replacement = """            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://nepacalc.com/#organization",
              "name": "NepaCalc",
              "url": "https://nepacalc.com",
              "logo": "https://nepacalc.com/logo.png"
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
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
                  "name": "Can I graph parametric equations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Currently, the calculator natively plots explicit functions z = f(x,y) and standard implicit equations. Full support for parameterized inputs (u,v) is being added in the next feature update."
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
              ]
            }
          ])"""

if schema_target in content:
    content = content.replace(schema_target, schema_replacement)
else:
    print("Schema target not found")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Schema updated successfully")
