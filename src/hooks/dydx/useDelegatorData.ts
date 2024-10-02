"use client";
import { useState, useEffect } from "react";
import { DelegatorData } from "@/types/type";
import { getDelegatorData } from "@/services/dydx";

export const useDelegatorData = (delegator_address: string) => {
  const [data, setData] = useState<DelegatorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDelegatorData = async () => {
      try {
        setLoading(true);
        const response = await getDelegatorData(delegator_address);
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

    fetchDelegatorData();

    return () => {
      isMounted = false;
    };
  }, [delegator_address]);

  return { data, loading, error };
};
