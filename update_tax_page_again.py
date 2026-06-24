import re

with open('src/app/calculator/nepal-vehicle-tax/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the "Related Nepal Calculators" section completely
content = re.sub(r'<h2[^>]*>Related Nepal Calculators</h2>\s*<ul.*?</ul\s*>', '', content, flags=re.DOTALL)

# Inject internal links naturally:
# 1. Electric Vehicle Tax section -> link to Electricity Unit Price
ev_tax_replacement = r'Electric vehicle road tax in Nepal is calculated using motor power (kW). If you charge your EV at home, it is highly recommended to check the <Link href="/electricity/nepal-unit-price/" className="text-blue-600 hover:underline">Electricity Unit Price in Nepal</Link> to estimate your running costs. For FY 2083/84:'
content = content.replace('Electric vehicle road tax in Nepal is calculated using motor power (kW). For FY 2083/84:', ev_tax_replacement)

# 2. Penalty section -> link to NEA Tariff Rates
# We'll just add it to a related context.
penalty_context = r'The flat renewal fee also doubles once the grace period expires. Unlike utility bills such as <Link href="/electricity/nea-tariff-rates/" className="text-blue-600 hover:underline">NEA Tariff Rates</Link> where disconnection occurs, vehicle taxes accrue heavy compounding fines.'
content = content.replace('The flat renewal fee also doubles once the grace period expires.', penalty_context)

# 3. Third party insurance section -> link to Salary Tax
insurance_context = r'Annual premiums are approximately Rs. 2,200 for motorcycles and Rs. 4,500–8,000 for private cars. If you are a salaried individual budgeting for these annual costs, our <Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline">Salary Tax Calculator Nepal</Link> can help you understand your disposable income.'
content = content.replace('Annual premiums are approximately Rs. 2,200 for motorcycles and Rs. 4,500–8,000 for private cars.', insurance_context)

# 4. Intro section -> link to DOTM (external link)
intro_context = r'guidelines set by the <a href="https://www.dotm.gov.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Department of Transport Management (DOTM)</a>.'
content = content.replace('current Department of Transport Management (DOTM) guidelines.', intro_context)

# 5. Bluebook renewal section -> link to Home Loan
bluebook_context = r'estimating your costs before visiting the Transport Management Office. If you are securing your vehicle as collateral, you might also find our <Link href="/calculator/nepal-home-loan/" className="text-blue-600 hover:underline">Nepal Home Loan Calculator</Link> useful for broader financial planning.'
content = content.replace('before visiting the Transport Management Office.', bluebook_context)

with open('src/app/calculator/nepal-vehicle-tax/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Tax page updated with natural links and external link.")
