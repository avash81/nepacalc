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

    let goldPrice = 292000; // Fallback based on user data
    let silverPrice = 4840; // Fallback based on user data
    let provider = 'Static Backup';

    if (fenegosidaRes.ok) {
      const html = await fenegosidaRes.text();
      
      // Look for the hallmark gold rate array in the chart script:
      // ['29',292000,250345] or similar. We look for the last entry in the gold chart data.
      // Alternatively, we can use a simpler regex to extract 292000 if it exists.
      // But FENEGOSIDA usually wraps it in <b> tags or in the JS array.
      // Let's use a regex to find the highest number around 290k-310k in the hallmark row.
      const hallmarkMatch = html.match(/'\d+',([2-3]\d{5}),\d+/g);
      if (hallmarkMatch && hallmarkMatch.length > 0) {
         // get the last one
         const lastMatch = hallmarkMatch[hallmarkMatch.length - 1];
         const priceStr = lastMatch.split(',')[1];
         const parsedPrice = parseInt(priceStr, 10);
         if (parsedPrice > 200000 && parsedPrice < 400000) {
            goldPrice = parsedPrice;
            provider = 'FENEGOSIDA Live Scrape';
         }
      }

      const silverMatch = html.match(/'\d+',([4-6]\d{3}),\d+(\.\d+)?/g);
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
        tolaNPR: goldPrice,
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
      gold: { tolaNPR: 292000 },
      silver: { tolaNPR: 4840 },
      provider: 'Error Fallback',
      updatedAt: new Date().toISOString()
    }, { status: 500 });
  }
}
