const fs = require('fs');
let c = fs.readFileSync('src/hooks/useLiveRates.ts', 'utf8');
c = c.replace(/export function useLiveRates\(\) \{\s*const \[rates, setRates\]\s*=\s*useState<LiveRates \| null>\(null\);\s*const \[loading, setLoading\] = useState\(true\);/g, 
export function useLiveRates(initialRawData?: any) {
  const [rates, setRates] = useState<LiveRates | null>(() => {
    if (initialRawData && initialRawData.gold?.tolaNPR?.current) {
      const gold = initialRawData.gold.tolaNPR.current;
      const tejabi = initialRawData.gold.tejabiTolaNPR ?? (gold - 700);
      const silver = initialRawData.silver?.tolaNPR?.current ?? FALLBACK_SILVER_TOLA;
      const date = initialRawData.rate_date ?? initialRawData.date ?? FALLBACK_DATE;
      const rateStatus = initialRawData.status ?? 'verified';
      const sourceName = initialRawData.source_name ?? 'FENEGOSIDA';
      const rateDate = initialRawData.rate_date ?? date;
      const isFallback = rateStatus === 'retained_fallback';
      const provider = isFallback ? \\ · Last verified: \\ : \\ · \\;
      const todayNPT = new Date(Date.now() + (5 * 60 + 45) * 60000).toISOString().split('T')[0];
      const isFresh = rateDate === todayNPT && !isFallback;
      return buildRates(gold, tejabi, silver, FALLBACK_USD, {}, provider, initialRawData.fetched_at ?? new Date().toISOString(), date, isFresh, rateStatus, rateDate, sourceName, initialRawData.gold?.tolaNPR?.previous, initialRawData.silver?.tolaNPR?.previous);
    }
    return null;
  });
  const [loading, setLoading] = useState(!rates);
);
fs.writeFileSync('src/hooks/useLiveRates.ts', c);
