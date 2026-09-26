import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        async def log_response(response):
            if 'api.fenegosida.org' in response.url and 'history' in response.url.lower():
                print(f"API CALL: {response.url}")
                try:
                    text = await response.text()
                    print(f"RESPONSE: {text[:500]}")
                except Exception as e:
                    print(f"Error reading response: {e}")

        page.on("response", log_response)
        
        print("Navigating to https://www.fenegosida.org/history...")
        try:
            await page.goto("https://www.fenegosida.org/history", wait_until="networkidle")
            await page.wait_for_timeout(5000)
        except Exception as e:
            print("Navigation error:", e)
        finally:
            await browser.close()

asyncio.run(run())
