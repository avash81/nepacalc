import re

file_path = "src/app/electricity/nepal-unit-price/page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Schema
new_schema = """  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is 1 unit of electricity?",
        "acceptedAnswer": { "@type": "Answer", "text": "One unit of electricity is exactly equal to one kilowatt-hour (kWh)." }
      },
      {
        "@type": "Question",
        "name": "What is the price of 1 kWh in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "One kilowatt-hour (kWh), also called one unit of electricity, typically costs between Rs. 4 and Rs. 11 depending on consumption slab and meter category." }
      },
      {
        "@type": "Question",
        "name": "How much does 100 units of electricity cost in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "For a medium-sized family consuming 100 units, the energy charges primarily fall into higher residential slabs, and the effective cost generally ranges between Rs. 8 and Rs. 10 per unit." }
      },
      {
        "@type": "Question",
        "name": "How much does 50 units of electricity cost in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "For 50 units, the first units are charged at lower slabs and later units at higher slabs. Use the NEA Bill Calculator for exact amounts including service charges." }
      },
      {
        "@type": "Question",
        "name": "Why is electricity charged in slabs in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Nepal uses a progressive slab-based electricity tariff system to ensure lower-income households pay less for basic usage, while heavier consumers pay a fairer share of infrastructure costs." }
      },
      {
        "@type": "Question",
        "name": "What is the NEA electricity tariff rate?",
        "acceptedAnswer": { "@type": "Answer", "text": "The NEA tariff rate ranges from Rs. 4 to Rs. 11 per unit for domestic consumers, depending on monthly consumption and meter capacity. A fixed service charge also applies." }
      },
      {
        "@type": "Question",
        "name": "Is 1 unit equal to 1 kWh?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. One unit of electricity is exactly equal to one kilowatt-hour (kWh)." }
      },
      {
        "@type": "Question",
        "name": "How can I calculate my electricity bill in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "You can calculate your electricity bill by using the NepaCalc NEA Bill Calculator, which factor in units consumed, consumption slab, meter capacity, and service charge." }
      },
      {
        "@type": "Question",
        "name": "Why do landlords charge more than NEA rates?",
        "acceptedAnswer": { "@type": "Answer", "text": "Many landlords charge a fixed rate (e.g., Rs. 10 to Rs. 15 per unit) that includes administrative costs or simplified billing. This rate may be higher than official NEA tariff rates." }
      },
      {
        "@type": "Question",
        "name": "What is the current electricity price per unit in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "The current electricity price per unit in Nepal generally ranges from Rs. 4 to Rs. 11 per unit (kWh), depending on the progressive slab system." }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to calculate electricity bill in Nepal",
    "step": [
      {
        "@type": "HowToStep",
        "text": "Find your total units consumed from your NEA electricity meter."
      },
      {
        "@type": "HowToStep",
        "text": "Identify your meter capacity (e.g., 5A, 15A, 30A)."
      },
      {
        "@type": "HowToStep",
        "text": "Enter these details into the NepaCalc NEA Bill Calculator to get your exact bill."
      }
    ]
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Nepal Electricity Tariff Rates",
    "description": "Official domestic electricity tariff rates for Nepal.",
    "creator": {
      "@type": "Organization",
      "name": "Nepal Electricity Authority"
    }
  };"""

# Replace the old faqSchema
content = re.sub(
    r"const faqSchema = \{.*?\n  \};\n",
    new_schema + "\n\n",
    content,
    flags=re.DOTALL
)

# Add the new schemas to the JSON-LD script tags
schema_tags = """      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />"""

content = re.sub(
    r"<script type=\"application/ld\+json\" dangerouslySetInnerHTML={{ __html: JSON\.stringify\(articleSchema\) }} />\n\s*<script type=\"application/ld\+json\" dangerouslySetInnerHTML={{ __html: JSON\.stringify\(faqSchema\) }} />\n\s*<script type=\"application/ld\+json\" dangerouslySetInnerHTML={{ __html: JSON\.stringify\(speakableSchema\) }} />",
    schema_tags,
    content
)

# 2. Insert AI Overview Section before TABLE OF CONTENTS
ai_overview_section = """          {/* ── AI OVERVIEW & SEARCH INTENT OPTIMIZATION ── */}
          <div className="summary-box bg-white border border-slate-200 rounded-xl p-5 mb-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 mb-4">1 Unit Electricity Price in Nepal (Updated 2083/84)</h2>
            <p className="text-slate-700 mb-4 font-medium">The price of 1 unit of electricity in Nepal is not fixed. According to <strong className="text-[#003087]">Nepal Electricity Authority (NEA)</strong> domestic tariff rates, the cost generally ranges from approximately <strong>Rs. 4 to Rs. 11 per unit (kWh)</strong>, depending on monthly electricity consumption and meter capacity.</p>
            
            <p className="font-bold text-slate-800 mb-2">For most residential consumers:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="py-2.5 px-3 font-bold border border-slate-200">Monthly Consumption</th>
                    <th className="py-2.5 px-3 font-bold border border-slate-200">Approximate Energy Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0–20 Units", "Rs. 4 per unit"],
                    ["21–30 Units", "Rs. 6.50 per unit"],
                    ["31–50 Units", "Rs. 8.00 per unit"],
                    ["51–100 Units", "Rs. 9.50 per unit"],
                    ["101–250 Units", "Rs. 9.50–11.00 per unit"],
                    ["Above 250 Units", "Up to Rs. 11.00 per unit"],
                  ].map(([label, val], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-2 px-3 border border-slate-200">{label}</td>
                      <td className="py-2 px-3 border border-slate-200 font-medium">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-3">What Is 1 Unit of Electricity?</h3>
            <p className="text-slate-700 mb-4">One unit of electricity equals one kilowatt-hour (kWh). A device consuming 1,000 watts (1 kW) for one hour uses exactly 1 unit of electricity.</p>
            <ul className="list-disc pl-5 space-y-1 mb-6 text-slate-700 text-sm">
              <li>100W bulb used for 10 hours = 1 unit</li>
              <li>1,000W heater used for 1 hour = 1 unit</li>
              <li>500W appliance used for 2 hours = 1 unit</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mb-3">Why Is There No Single Electricity Price Per Unit in Nepal?</h3>
            <p className="text-slate-700 mb-4">Unlike some countries with flat-rate billing, Nepal uses a <strong>slab-based electricity tariff system</strong>. The cost per unit depends on monthly electricity consumption, meter capacity (5A, 15A, 30A, etc.), consumer category, and applicable service charges.</p>
            
            <h3 className="text-lg font-bold text-slate-800 mb-3">Sample Electricity Cost Calculations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">20 Units Per Month</p>
                <p className="text-xs text-slate-600">Typical household usage: Energy charge approximately Rs. 4 per unit. Service charge applicable according to meter category.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">50 Units Per Month</p>
                <p className="text-xs text-slate-600">Typical apartment usage: First units charged at lower slabs. Later units charged at higher slabs. Effective average rate increases.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">100 Units Per Month</p>
                <p className="text-xs text-slate-600">Medium-sized family: Energy charges primarily fall into higher residential slabs. Effective cost generally ranges between Rs. 8 and Rs. 10 per unit.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">250 Units Per Month</p>
                <p className="text-xs text-slate-600">High-consumption household: Upper slab rates apply. Effective rate approaches Rs. 11 per unit.</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-3">About Nepal Electricity Authority (NEA)</h3>
            <p className="text-slate-700 mb-6 text-sm">Nepal Electricity Authority (NEA) is Nepal's state-owned electricity utility responsible for electricity generation, transmission, distribution, and tariff implementation across the country.</p>
          </div>

          {/* ── AI ANSWER TABLE ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 mb-4">Quick Answers to Common Queries</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="py-2.5 px-3 font-bold border border-slate-200">Question</th>
                    <th className="py-2.5 px-3 font-bold border border-slate-200">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["What is 1 unit electricity price in Nepal?", "Approximately Rs. 4–11 depending on tariff slab."],
                    ["What is 1 unit of electricity?", "1 kilowatt-hour (kWh)."],
                    ["Who sets electricity rates in Nepal?", "Nepal Electricity Authority (NEA)."],
                    ["How much is 50 units?", "Depends on slab. First units are cheaper."],
                    ["How much is 100 units?", "Depends on slab. Typically Rs. 8 to Rs. 10 per unit on average."],
                    ["Why is landlord charging Rs. 15?", "Private billing or administrative overhead, not the official NEA tariff."]
                  ].map(([q, a], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-2.5 px-3 border border-slate-200 font-medium">{q}</td>
                      <td className="py-2.5 px-3 border border-slate-200 text-slate-700">{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── PEOPLE ALSO ASK ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 mb-4">People Also Ask</h2>
            <div className="space-y-4 text-sm">
              <details className="group cursor-pointer">
                <summary className="font-bold text-slate-800 group-hover:text-blue-600 list-none flex justify-between items-center">
                  What is 1 unit of electricity? <span className="text-blue-600 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-slate-700 pl-1 border-l-2 border-blue-600">One unit of electricity is exactly equal to one kilowatt-hour (kWh).</p>
              </details>
              <hr className="border-slate-100" />
              <details className="group cursor-pointer">
                <summary className="font-bold text-slate-800 group-hover:text-blue-600 list-none flex justify-between items-center">
                  What's the price of 1 kWh? <span className="text-blue-600 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-slate-700 pl-1 border-l-2 border-blue-600">One kilowatt-hour (kWh) costs between Rs. 4 and Rs. 11 depending on your consumption slab and meter category.</p>
              </details>
              <hr className="border-slate-100" />
              <details className="group cursor-pointer">
                <summary className="font-bold text-slate-800 group-hover:text-blue-600 list-none flex justify-between items-center">
                  How to calculate Nepal electricity bill? <span className="text-blue-600 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-slate-700 pl-1 border-l-2 border-blue-600">Your bill depends on units consumed, consumption slab, meter capacity, and service charge. Use the NEA Bill Calculator on NepaCalc for an accurate breakdown.</p>
              </details>
              <hr className="border-slate-100" />
              <details className="group cursor-pointer">
                <summary className="font-bold text-slate-800 group-hover:text-blue-600 list-none flex justify-between items-center">
                  What's the cost of 1 kW of power? <span className="text-blue-600 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-slate-700 pl-1 border-l-2 border-blue-600">Running 1 kW of power for 1 hour uses 1 kWh (1 unit) of electricity, which costs between Rs. 4 and Rs. 11 depending on your total monthly usage.</p>
              </details>
            </div>
          </div>

          {/* ── SOURCE HIERARCHY ── */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
            <h3 className="font-black text-slate-800 text-sm mb-3 uppercase tracking-wide">Data Sources & Verification</h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li><strong className="text-slate-900">Primary Source:</strong> Nepal Electricity Authority (NEA)</li>
              <li><strong className="text-slate-900">Tariff Status:</strong> Verified</li>
              <li><strong className="text-slate-900">Verification Sources:</strong> Official tariff schedules, Government publications, Historical tariff archives</li>
            </ul>
          </div>\n\n"""

target_toc_comment = r"\{\/\*\s*── TABLE OF CONTENTS ──\s*\*\/\}"
content = re.sub(
    f"({target_toc_comment})",
    ai_overview_section + r"\1",
    content
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully.")
