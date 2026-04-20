
import sys
import os

def fix_market_rates_page_final():
    path = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\app\market-rates\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixed = content.replace('rates={rates} loading={loading}', 'rates={rates}')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(fixed)
    print("Successfully fixed Market Rates page loading prop")

if __name__ == "__main__":
    fix_market_rates_page_final()
