'use client';

import { useState, useEffect } from 'react';

export interface LiveRates {
  forex: {
    usd: number;
    provider: string;
    date: string;
  };
  gold: {
    tolaNPR: number;
    tolaInternationalNPR: number;
    spotUSD: number;
    provider: string;
    lastUpdated: string;
  };
  silver: {
    tolaNPR: number;
    tolaInternationalNPR: number;
  };
}

export function useLiveRates() {
  const [rates, setRates] = useState<LiveRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/nepal-rates');
      if (!res.ok) throw new Error('Failed to fetch live rates');
      const data = await res.json();
      setRates(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('useLiveRates error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return { rates, loading, error, refresh: fetchRates };
}
