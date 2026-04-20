'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

/**
 * useSyncState — A specialized hook for shared calculator state.
 * 
 * Works like useState but:
 * 1. Reads initial value from URL searchParams (if present).
 * 2. If not in URL, reads from localStorage (if persistent = true).
 * 3. Updates URL in real-time as state changes (debounced by default).
 * 
 * @param key - The key for searchParam and localStorage.
 * @param defaultValue - Fallback value.
 * @param options - { persistent: boolean, debounce: number }
 */
export function useSyncState<T>(
  key: string,
  defaultValue: T,
  options = { persistent: true, debounce: 300, syncToUrl: true }
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Initial State Resolution (SSR Safe)
  const [state, setState] = useState<T>(defaultValue);

  // 2. Hydration: Load from URL, then LocalStorage once on mount
  useEffect(() => {
    const urlValue = searchParams.get(key);
    if (urlValue !== null) {
      try {
        setState(JSON.parse(urlValue) as T);
      } catch {
        setState(urlValue as unknown as T);
      }
    } else if (options.persistent) {
      const stored = localStorage.getItem(`cp_${key}`);
      if (stored !== null) {
        try {
          setState(JSON.parse(stored) as T);
        } catch {
          setState(stored as unknown as T);
        }
      }
    }
  }, []); // Only once on mount

  // 2. Sync to URL & LocalStorage
  const sync = useCallback((value: T) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === undefined || value === null || value === '') {
      params.delete(key);
    } else {
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
      params.set(key, stringValue);
    }

    // Push to URL (Next.js Way) - ONLY if enabled
    if (options.syncToUrl !== false) {
      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    }

    // Sync to LocalStorage
    if (options.persistent) {
      localStorage.setItem(`cp_${key}`, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
  }, [key, pathname, searchParams, options.persistent]);

  // Effect to trigger sync
  useEffect(() => {
    const handler = setTimeout(() => sync(state), options.debounce);
    return () => clearTimeout(handler);
  }, [state, sync, options.debounce]);

  return [state, setState] as const;
}
