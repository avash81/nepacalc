import os
import datetime

filepath = r"c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\app\calculator\kukl-bill\page.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the customSchema with a complete Graph
new_schema = """const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nepacalc.com/#organization",
      "name": "NepaCalc",
      "url": "https://nepacalc.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nepacalc.com/logo.png"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://nepacalc.com/#website",
      "url": "https://nepacalc.com/",
      "name": "NepaCalc",
      "publisher": { "@id": "https://nepacalc.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#webpage",
      "url": "https://nepacalc.com/calculator/kukl-bill/",
      "name": "KUKL Water Bill Calculator Nepal (FY 2083/84) | Kathmandu Water Bill Calculator",
      "description": "Calculate your KUKL water bill online using the latest Kathmandu water tariff rates. Includes sewerage charges, minimum billing, and connection-size calculations.",
      "isPartOf": { "@id": "https://nepacalc.com/#website" },
      "about": { "@id": "https://nepacalc.com/#organization" }
    },
    {
      "@type": "Article",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#article",
      "headline": "KUKL Water Bill Calculator Nepal",
      "description": "A comprehensive guide and calculator for KUKL water bills in Nepal, including official tariff rates and calculation methodology.",
      "author": {
        "@type": "Organization",
        "name": "NepaCalc Team",
        "url": "https://nepacalc.com/"
      },
      "publisher": { "@id": "https://nepacalc.com/#organization" },
      "datePublished": "2024-01-01T08:00:00+05:45",
      "dateModified": "2026-07-25T08:00:00+05:45",
      "mainEntityOfPage": { "@id": "https://nepacalc.com/calculator/kukl-bill/#webpage" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nepacalc.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Calculators",
          "item": "https://nepacalc.com/calculator/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "KUKL Water Bill Calculator"
        }
      ]
    },
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#webapp",
      "name": "KUKL Water Bill Calculator",
      "url": "https://nepacalc.com/calculator/kukl-bill/",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "description": "Calculate KUKL and NWSC water bills based on official tariff matrices, pipe sizes, and mandatory sewerage taxes."
    },
    {
      "@type": "HowTo",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#howto",
      "name": "How to calculate a KUKL water bill",
      "description": "Step-by-step guide to calculating water utility charges in the Kathmandu Valley.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Identify Connection Size",
          "text": "Determine your water pipe connection size, typically 0.5 inches for standard residential taps."
        },
        {
          "@type": "HowToStep",
          "name": "Calculate Base Water Charge",
          "text": "Apply the fixed minimum charge for the first 10,000 liters (10 units), then multiply any additional units consumed by the variable excess rate."
        },
        {
          "@type": "HowToStep",
          "name": "Add Sewerage Charge",
          "text": "Calculate 50% of the total water charge and add it to the subtotal. This is the mandatory sewerage tax applied to all properties."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is a water bill calculated in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A water bill in Nepal is calculated by adding the net water consumption charge to a mandatory sewerage fee. The consumption charge consists of a fixed pipeline fee for baseline allocation plus an additional per-unit rate for any excess water used. A 50% wastewater surcharge is then applied to that combined subtotal."
          }
        },
        {
          "@type": "Question",
          "name": "What is 1 unit of water in litres?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Exactly 1 unit of water equals 1,000 litres. This metric aligns with 1 cubic meter of volumetric water flow passing through your property's physical utility meter."
          }
        },
        {
          "@type": "Question",
          "name": "What is the KUKL sewerage charge?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The sewerage charge is a public utility assessment equal to exactly 50% of your total monthly water consumption charge. It is automatically collected by KUKL to fund the construction and processing operations of wastewater management systems across the Kathmandu Valley."
          }
        },
        {
          "@type": "Question",
          "name": "What are the latest KUKL water rates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tariff rates are updated each fiscal year by KUKL. For the current rates, enter your pipe size and units into the calculator above — it applies the latest official tariff automatically so you always get an accurate result."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum KUKL bill?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is a mandatory minimum monthly charge even if you use zero water. The exact amount depends on your pipe connection size (0.5-inch or 0.75-inch). Use the calculator above and enter 0 units to see the minimum payable for your connection."
          }
        }
      ]
    }
  ]
};"""

old_schema_start = "const customSchema = {"
old_schema_end = "};\n\nexport default function Page() {"
start_idx = content.find(old_schema_start)
end_idx = content.find(old_schema_end) + 2
content = content[:start_idx] + new_schema + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

# Now update KuklSeoContent.tsx to add EEAT byline
filepath_seo = r"c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\app\calculator\kukl-bill\KuklSeoContent.tsx"
with open(filepath_seo, "r", encoding="utf-8") as f:
    seo_content = f.read()

eeat_html = """    <article className="space-y-12 max-w-4xl">
      <div className="flex items-center gap-4 text-sm text-[#5F6368] border-b border-[#DADCE0] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1A73E8] text-white rounded-full flex items-center justify-center font-bold">N</div>
          <div>
            <div className="font-bold text-[#202124]">NepaCalc Team</div>
            <div className="text-xs">Reviewed & Updated: July 2026</div>
          </div>
        </div>
      </div>
      <section className="prose prose-slate max-w-none text-[#5F6368] space-y-4">"""

seo_content = seo_content.replace("""    <article className="space-y-12 max-w-4xl">\n      <section className="prose prose-slate max-w-none text-[#5F6368] space-y-4">""", eeat_html)

with open(filepath_seo, "w", encoding="utf-8") as f:
    f.write(seo_content)

print("Schema and EEAT updated.")
