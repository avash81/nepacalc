import re

file_path = "src/app/page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update metadata
new_meta = """export const metadata: Metadata = {
  title: 'Free Online Calculator NepaCalc Nepal',
  description:
    'NepaCalc provides free online calculators for Nepal including NEA bill calculators, income tax calculators, salary tax calculators, SIP and EMI calculators, GPA tools, engineering calculators, land converters, market rates, and everyday calculation tools.',
  keywords: [
    'online calculator', 'scientific calculator', 'graphing calculator',
    'maths solver', 'algebra solver', 'trigonometry calculator',
    'calculus calculator', 'nepal income tax calculator', 'EMI calculator',
    'GPA calculator', 'free online calculator', 'NepaCalc',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/',
  }
};"""

content = re.sub(
    r"export const metadata: Metadata = \{.*?\n\};\n",
    new_meta + "\n",
    content,
    flags=re.DOTALL
)

# 2. Replace organizationSchema with webPageSchema and faqSchema
new_schemas = """const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Free Online Calculator for Nepal",
  "url": "https://nepacalc.com/",
  "description": "Free online calculators for Nepal covering tax, finance, engineering, health, education, electricity bills, market rates and conversions.",
  "keywords": [
    "calculator nepal",
    "nepal calculator",
    "online calculator nepal",
    "free calculator nepal",
    "nea bill calculator",
    "income tax calculator nepal",
    "salary tax calculator nepal",
    "sip calculator nepal",
    "emi calculator nepal",
    "gpa calculator nepal",
    "engineering calculator",
    "gold price nepal"
  ],
  "isPartOf": {
    "@type": "WebSite",
    "name": "NepaCalc",
    "url": "https://nepacalc.com"
  }
};

const faqSchema = {
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    {
      "@type":"Question",
      "name":"What is NepaCalc?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"NepaCalc is a Nepal-focused platform providing free online calculators, converters, tax tools, electricity bill calculators, educational tools, engineering calculators and market rate tracking."
      }
    },
    {
      "@type":"Question",
      "name":"Are NepaCalc calculators free?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"Yes. All public calculators and tools on NepaCalc are available free of charge."
      }
    },
    {
      "@type":"Question",
      "name":"How accurate are NepaCalc calculators?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"NepaCalc calculators use published formulas and official references where applicable, including government agencies and recognized institutions."
      }
    },
    {
      "@type":"Question",
      "name":"Can I calculate my NEA electricity bill on NepaCalc?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"Yes. NepaCalc provides an NEA Electricity Bill Calculator using current tariff structures."
      }
    },
    {
      "@type":"Question",
      "name":"Does NepaCalc provide live gold prices?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"Yes. NepaCalc publishes official benchmark gold and silver rates based on FENEGOSIDA reference data."
      }
    }
  ]
};"""

content = re.sub(
    r"const organizationSchema = \{.*?\n\};\n",
    new_schemas + "\n",
    content,
    flags=re.DOTALL
)

# 3. Update the script tags inside the component
new_script_tag = """      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify([webPageSchema, faqSchema]) 
        }} 
      />"""

content = re.sub(
    r"<script\s+type=\"application/ld\+json\"\s+dangerouslySetInnerHTML={{[\s\S]*?__html:\s*JSON\.stringify\(\[organizationSchema\]\)[\s\S]*?}}\s+/>",
    new_script_tag,
    content
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Homepage updated successfully.")
