import re

with open("c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/calculator/nepal-tds/TdsSeoContent.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. nepal-tds-calculator -> already in Calculator.tsx
# 2. what-is-tds -> exists
# 3. latest-tds-rates -> replace 'rate-directory'
content = content.replace('id="rate-directory"', 'id="latest-tds-rates"')

# 4. budget-updates -> inject before Quick Fact
content = content.replace(
    '{/* Quick Fact Box */}',
    '<div id="budget-updates" className="scroll-mt-24"></div>\n          {/* Quick Fact Box */}'
)

# 5. payment-categories -> exists

# 6. vat-rules -> replace 'vat-and-tds'
content = content.replace('id="vat-and-tds"', 'id="vat-rules"')

# 7. how-to-calculate -> inject before Worked Example
content = content.replace(
    '{/* Worked Example */}',
    '<div id="how-to-calculate" className="scroll-mt-24"></div>\n          {/* Worked Example */}'
)

# 8. calculation-examples -> exists

# 9. resident-vs-non-resident -> inject before 'Resident and Non-Resident Rates' or similar. 
# Wait, let's find a good spot. "Resident vs Non-Resident"
content = content.replace(
    '<h3 className="text-xl font-bold text-[#202124] mb-3 tracking-tight">Advance Tax vs Final Withholding Tax</h3>',
    '<div id="resident-vs-non-resident" className="scroll-mt-24"></div>\n            <h3 id="advance-vs-final" className="text-xl font-bold text-[#202124] mb-3 tracking-tight scroll-mt-24">Advance Tax vs Final Withholding Tax</h3>'
)

# 11. filing-process
content = content.replace(
    '<strong className="block text-[#1A73E8] mb-1">How long should businesses keep TDS records?</strong>',
    '<div id="filing-process" className="scroll-mt-24"></div>\n                <strong className="block text-[#1A73E8] mb-1">How long should businesses keep TDS records?</strong>'
)

# 12. deposit-deadlines
content = content.replace(
    '<strong className="block text-[#1A73E8] mb-1">When should TDS be deposited?</strong>',
    '<div id="deposit-deadlines" className="scroll-mt-24"></div>\n                <strong className="block text-[#1A73E8] mb-1">When should TDS be deposited?</strong>'
)

# 13. tds-penalties
content = content.replace(
    '<strong className="block text-[#1A73E8] mb-1">What happens if TDS is not deducted?</strong>',
    '<div id="tds-penalties" className="scroll-mt-24"></div>\n                <strong className="block text-[#1A73E8] mb-1">What happens if TDS is not deducted?</strong>'
)

# 14. legal-references
content = content.replace(
    '<strong className="block text-[#1A73E8] mb-1">Which law governs TDS in Nepal?</strong>',
    '<div id="legal-references" className="scroll-mt-24"></div>\n                <strong className="block text-[#1A73E8] mb-1">Which law governs TDS in Nepal?</strong>'
)

# 15. common-mistakes
content = content.replace(
    '{ id: 20, title: \'Incorrect Classification\',',
    '<div id="common-mistakes" className="scroll-mt-24"></div>\n            { id: 20, title: \'Incorrect Classification\','
)

# 16. faqs -> replace 'knowledge-base'
content = content.replace('id="knowledge-base"', 'id="faqs"')


with open("c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/calculator/nepal-tds/TdsSeoContent.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Done replacing IDs in TdsSeoContent.tsx")
