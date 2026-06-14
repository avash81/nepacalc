'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * useSyncState — A specialized hook for shared calculator state.
 *
 * Works like useState but also:
 * 1. Reads initial value from URL searchParams (if present).
 * 2. If not in URL, reads from localStorage (if persistent = true).
 * 3. Optionally syncs back to localStorage on state change (debounced).
 *
 * NOTE: URL syncing (syncToUrl) is intentionally disabled — useRouter()
 * is not available in static-export pages and causes runtime crashes.
 *
 * @param key - localStorage key (prefixed with cp_).
 * @param defaultValue - Fallback value.
 * @param options - { persistent: boolean, debounce: number }
 */
export function useSyncState<T>(
  key: string,
  defaultValue: T,
  { persistent = true, debounce = 300, syncToUrl: _syncToUrl = false } = {}
) {
  // 1. Initial State Resolution (SSR Safe)
  const [state, setState] = useState<T>(defaultValue);

  // 2. Hydration: Load from URL params or localStorage once on mount (client only)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlValue = params.get(key);

      if (urlValue !== null) {
        try { setState(JSON.parse(urlValue) as T); }
        catch { setState(urlValue as unknown as T); }
      } else if (persistent) {
        const stored = localStorage.getItem(`cp_${key}`);
        if (stored !== null) {
          try { setState(JSON.parse(stored) as T); }
          catch { setState(stored as unknown as T); }
        }
      }
    } catch {
      // Safe: ignore any errors reading from storage/URL
    }
  }, [key, persistent]);

  // 3. Sync to localStorage on state change (debounced)
  const sync = useCallback((value: T) => {
    if (!persistent) return;
    try {
      const serialized = typeof value === 'object'
        ? JSON.stringify(value)
        : String(value);
      localStorage.setItem(`cp_${key}`, serialized);
    } catch {
      // Safe: ignore storage write errors (e.g. private browsing quota)
    }
  }, [key, persistent]);

  useEffect(() => {
    const handler = setTimeout(() => sync(state), debounce);
    return () => clearTimeout(handler);
  }, [state, sync, debounce]);

  return [state, setState] as const;
}

