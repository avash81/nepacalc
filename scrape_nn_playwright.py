import asyncio
from playwright.async_api import async_playwright
import json
import time
import re

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print('Navigating to NotifyNepal...')
        await page.goto('https://notifynepal.com/en/silver-price-history-nepal', wait_until='networkidle')
        
        all_records = []
        visited_pages = 0
        max_pages = 250
        
        while visited_pages < max_pages:
            print(f'Scraping page {visited_pages + 1}...')
            
            try:
                await page.wait_for_selector('table tbody tr', timeout=10000)
            except Exception as e:
                print('Table not found or timeout', e)
                break
                
            rows = await page.query_selector_all('table tbody tr')
            
            page_records = 0
            for row in rows:
                cells = await row.query_selector_all('td')
                if len(cells) >= 2:
                    date_cell = await cells[0].inner_text()
                    price_cell = await cells[1].inner_text()
                    
                    dates = date_cell.split('\n')
                    date_ad_raw = dates[0].strip() if len(dates) > 0 else ''
                    date_bs_raw = dates[1].strip() if len(dates) > 1 else ''
                    
                    numbers = re.findall(r'[\d,]+', price_cell)
                    tola = 0
                    if numbers:
                        try:
                            tola = float(numbers[0].replace(',', ''))
                        except:
                            pass
                    
                    if tola > 0:
                        all_records.append({
                            'date_ad_raw': date_ad_raw,
                            'date_bs_raw': date_bs_raw,
                            'tola': tola
                        })
                        page_records += 1
            
            print(f'Extracted {page_records} records from this page.')
            if page_records == 0:
                print('No records found, stopping.')
                break
            
            next_button = None
            try:
                navs = await page.query_selector_all('nav[role="navigation"] a, .pagination a, button:has-text("Next")')
                for n in navs:
                    text = await n.inner_text()
                    if 'Next' in text or 'next' in text:
                        next_button = n
                        break
                if not next_button and navs:
                    next_button = navs[-1]
            except:
                pass
                
            if not next_button:
                next_button = await page.query_selector('svg.lucide-chevron-right')
                if next_button:
                    next_button = await next_button.evaluate_handle('node => node.closest("a, button")')
                    
            if not next_button:
                print('Next button not found. Stopping.')
                break
                
            is_disabled = await next_button.get_attribute('disabled')
            is_aria_disabled = await next_button.get_attribute('aria-disabled')
            if is_disabled is not None or is_aria_disabled == 'true':
                print('Next button is disabled. Reached end.')
                break
                
            first_row_text = await rows[0].inner_text()
            await next_button.click()
            
            updated = False
            for _ in range(50):
                await page.wait_for_timeout(100)
                new_rows = await page.query_selector_all('table tbody tr')
                if new_rows:
                    new_first_row = await new_rows[0].inner_text()
                    if new_first_row != first_row_text:
                        updated = True
                        break
            
            if not updated:
                print('Table did not update after clicking Next. Fake pagination detected?')
                break
                
            visited_pages += 1
            await page.wait_for_timeout(500)
            
        print(f'Finished scraping. Total records: {len(all_records)}')
        
        with open('notifynepal_silver_playwright.json', 'w') as f:
            json.dump(all_records, f, indent=2)
            
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
