import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    // Attempt to scrape live data from FENEGOSIDA
    const fenegosidaRes = await fetch('https://www.fenegosida.org/', {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NepaCalcBot/1.0;)'
      }
    });

    // Fallback (FENEGOSIDA official screenshot)
    let fineGoldPrice = 282100; 
    let tejabiGoldPrice = 0;
    let silverPrice = 4200; 
    let provider = 'FENEGOSIDA Fallback';

    if (fenegosidaRes.ok) {
      const html = await fenegosidaRes.text();
      
      // Match the Google Charts data array format: ['day',finePrice,tejabiPrice]
      const hallmarkMatch = html.match(/\['\d+',([2-3]\d{5}),(\d+)\]/g);
      if (hallmarkMatch && hallmarkMatch.length > 0) {
         const lastMatch = hallmarkMatch[hallmarkMatch.length - 1];
         const parts = lastMatch.replace(/[\['\]]/g, '').split(',');
         const parsedFine = parseInt(parts[1], 10);
         const parsedTejabi = parseInt(parts[2], 10) || 0;
         if (parsedFine > 200000 && parsedFine < 450000) {
            fineGoldPrice = parsedFine;
            tejabiGoldPrice = parsedTejabi;
            provider = 'FENEGOSIDA Live Scrape';
         }
      }

      const silverMatch = html.match(/'\d+',([3-6]\d{3}),\d+(\.\d+)?/g);
      if (silverMatch && silverMatch.length > 0) {
         const lastSMatch = silverMatch[silverMatch.length - 1];
         const sPriceStr = lastSMatch.split(',')[1];
         const parsedSPrice = parseInt(sPriceStr, 10);
         if (parsedSPrice > 3000 && parsedSPrice < 8000) {
            silverPrice = parsedSPrice;
         }
      }
    }

    // Secondary fallback: LivePriceOfGold (Real-time Global/Local aggregator)
    if (provider === 'FENEGOSIDA Fallback') {
       try {
         const lpgRes = await fetch('https://livepriceofgold.com/silver-price/nepal.html', {
           next: { revalidate: 3600 },
           headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
         });
         if (lpgRes.ok) {
           const lpgHtml = await lpgRes.text();
           const silverTolaMatch = lpgHtml.match(/Silver\/Tola.*?<td[^>]*>.*?<td[^>]*>([0-9,]+\.[0-9]+)<\/td>/s);
           if (silverTolaMatch && silverTolaMatch[1]) {
             const parsedLpgSilver = parseFloat(silverTolaMatch[1].replace(/,/g, ''));
             if (parsedLpgSilver > 3000 && parsedLpgSilver < 8000) {
                silverPrice = Math.round(parsedLpgSilver);
                provider = 'LivePriceOfGold (Real-Time Backup)';
             }
           }
         }
       } catch(e) {}
    }

    return NextResponse.json({
      success: true,
      gold: {
        tolaNPR: fineGoldPrice,
        tejabiTolaNPR: tejabiGoldPrice,
      },
      silver: {
        tolaNPR: silverPrice
      },
      provider,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching market rates:', error);
    return NextResponse.json({
      success: false,
      gold: { tolaNPR: 287400, tejabiTolaNPR: 246400 },
      silver: { tolaNPR: 4640 },
      provider: 'Error Fallback',
      updatedAt: new Date().toISOString()
    }, { status: 500 });
  }
}
