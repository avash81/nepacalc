import re

with open('src/app/calculator/gold-converter/Calculator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace text in Calculator.tsx to include internal links
content = content.replace(
    'Before evaluating jewelry pieces, it is important to factor in extra costs that may arise during transactions.',
    'Before evaluating jewelry pieces based on the <a href="/market-rates/live-gold-price/" className="text-blue-600 font-bold hover:underline">live gold price today</a>, it is important to factor in extra costs that may arise during transactions.'
)

content = content.replace(
    'If you have a digital kitchen scale or a laboratory balance measuring an item in grams, translate it back to traditional units using this division formula:',
    'If you have a digital kitchen scale or a laboratory balance measuring an item in grams, translate it back to traditional units using this division formula. Additionally, if you are bringing commercial gold into the country, you can use our <a href="/calculator/gold-tax/" className="text-blue-600 font-bold hover:underline">gold tax calculator</a> to estimate customs duties.'
)

with open('src/app/calculator/gold-converter/Calculator.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
