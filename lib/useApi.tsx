"use client";

import { useCallback, useEffect, useState } from "react";

export function useApi<T>(fn: (() => Promise<T>) | null, deps: any[] = [], enabled = true) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const reload = useCallback(() => setCounter((c) => c + 1), []);

  useEffect(() => {
    let mounted = true;
    if (!fn || !enabled) return;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fn();
        if (!mounted) return;
        setData(res as T);
      } catch (err) {
        if (!mounted) return;
        setError(err);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, counter, enabled]);

  return { data, error, loading, reload } as {
    data: T | null;
    error: any;
    loading: boolean;
    reload: () => void;
  };
}

export default useApi;
