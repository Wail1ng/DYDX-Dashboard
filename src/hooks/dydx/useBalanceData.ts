
import { useState, useEffect } from 'react';
import { getBalanceData } from '@/services/dydx';

export const useBalanceData = (address: string, denom: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchBalanceData = async () => {
      try {
        setLoading(true);
        const response = await getBalanceData(address, denom);
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("An unknown error occurred")
          );
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBalanceData();
  }, [address]);

  return { data, loading, error };
};