import re

with open('src/components/market/MarketDashboardLayout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and remove the Breadcrumb section
breadcrumb_pattern = r'\{\/\*\s*Breadcrumb\s*\*\/\}.*?<\/div>'
new_content = re.sub(breadcrumb_pattern, '', content, flags=re.DOTALL)

with open('src/components/market/MarketDashboardLayout.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
