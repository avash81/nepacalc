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

    // 5 Ashad 2083 Fallback
    let fineGoldPrice = 286700; 
    let tejabiGoldPrice = 0; // 0 = Not Published
    let silverPrice = 4640; 
    let provider = 'Static Backup';

    if (fenegosidaRes.ok) {
      const html = await fenegosidaRes.text();
      
      // Look for the hallmark gold rate array in the chart script or HTML
      // Example regex to find XAU NPR prices (usually 6 digits for gold)
      const hallmarkMatch = html.match(/'\d+',([2-3]\d{5}),([0-3]?\d{5}|0)/g);
      if (hallmarkMatch && hallmarkMatch.length > 0) {
         const lastMatch = hallmarkMatch[hallmarkMatch.length - 1];
         const parts = lastMatch.split(',');
         const parsedFine = parseInt(parts[1], 10);
         const parsedTejabi = parseInt(parts[2], 10) || 0;
         if (parsedFine > 200000 && parsedFine < 400000) {
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
      gold: { tolaNPR: 286700, tejabiTolaNPR: 0 },
      silver: { tolaNPR: 4640 },
      provider: 'Error Fallback',
      updatedAt: new Date().toISOString()
    }, { status: 500 });
  }
}
