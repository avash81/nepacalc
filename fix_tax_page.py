import os

financial_path = "src/data/seo/financial.tsx"
with open(financial_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Remove the old 'nepal-vehicle-tax' object from financial.tsx
# Lines 2799 to 3037 (0-indexed 2798 to 3036)
new_lines = lines[:2798] + lines[3037:]

with open(financial_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)


page_path = "src/app/calculator/nepal-vehicle-tax/page.tsx"
with open(page_path, "r", encoding="utf-8") as f:
    page_content = f.read()

# Let's do some targeted replacements to add the inline links the user wanted.

page_content = page_content.replace(
    "Department of Transport Management (DOTM) or authorized Transport Management Office.",
    "<a href=\"https://dotm.gov.np/\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-[#1A73E8] hover:underline\">Department of Transport Management (DOTM)</a> or authorized Transport Management Office."
)

page_content = page_content.replace(
    "Vehicle tax in Nepal is calculated based on vehicle category",
    "Vehicle tax in Nepal is calculated based on vehicle category"
)

# Add link to Auto Loan EMI Calculator
page_content = page_content.replace(
    "under the Vehicle and Transport Management Act.",
    "under the Vehicle and Transport Management Act. If you are financing a new vehicle, use our <Link href=\"/calculator/loan-emi/\" className=\"text-[#1A73E8] hover:underline font-medium\">Auto Loan EMI Calculator</Link> to estimate your monthly payments."
)

# Add link to Salary Tax and TDS
page_content = page_content.replace(
    "Insurance remains mandatory during renewal.",
    "Insurance remains mandatory during renewal. To budget for these expenses, check your net income with our <Link href=\"/calculator/nepal-salary/\" className=\"text-[#1A73E8] hover:underline font-medium\">Nepal Salary Tax Calculator</Link> or verify corporate deductions via the <Link href=\"/calculator/tds-calculator/\" className=\"text-[#1A73E8] hover:underline font-medium\">TDS Calculator Nepal</Link>."
)

# Add link to Gold Tax and NEA
page_content = page_content.replace(
    "under the current 2083/84 framework.",
    "under the current 2083/84 framework. For other personal asset imports, see our <Link href=\"/calculator/gold-tax/\" className=\"text-[#1A73E8] hover:underline font-medium\">Gold Import Tax Calculator</Link>, and manage your home utility budget with the <Link href=\"/calculator/nea-bill/\" className=\"text-[#1A73E8] hover:underline font-medium\">NEA Bill Calculator</Link>."
)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page_content)

print("Old content removed and inline links added successfully!")
