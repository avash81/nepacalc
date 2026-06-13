import re

with open('c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/market-rates/live-gold-price/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Title Tag
content = re.sub(r"title: 'Gold Price & Weight Converter in Nepal[^']*',", "title: 'Gold Price Weight Converter in Nepal (Tola, Ana, Lal) | NepaCalc',", content)

# Fix 22K Tejabi Discrepancy in table
content = content.replace("Rs. 2,67,472", "Rs. 2,89,100")
content = content.replace("Rs. 2,29,314", "Rs. 2,47,857")

# Fix FAQ Discrepancy
content = content.replace("and 22K at Rs. 2,67,472/tola.", "and 22K at Rs. 2,89,100/tola.")
content = content.replace("The spread between 24K (Rs. 2,92,000) and 22K (Rs. 2,89,100) is Rs. 24,528 per Tola", "The spread between 24K (Rs. 2,92,000) and 22K (Rs. 2,89,100) is Rs. 2,900 per Tola")

# We will just replace the SEO sections (360 down to the end of FAQ) 
# I will use multi_replace_file_content for the sections to be safe.
with open('c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/market-rates/live-gold-price/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
