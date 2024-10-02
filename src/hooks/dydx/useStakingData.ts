"use client"
import { useState, useEffect } from 'react';
import { FormattedStaking } from '@/types/type';
import { getStakingData } from '@/services/dydx';

export const useStakingData = (address: string) => {
  const [data, setData] = useState<FormattedStaking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchStakingData = async () => {
      try {
        setLoading(true);
        const response = await getStakingData(address, "token");
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

    fetchStakingData();
  }, [address]);

  return { data, loading, error };
};