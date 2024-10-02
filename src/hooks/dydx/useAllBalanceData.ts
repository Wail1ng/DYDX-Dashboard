"use client";
import { useState, useEffect } from "react";
import { AllBalanceData } from "@/types/type";
import { getAllBalanceData } from "@/services/dydx";

export const useAllBalanceData = (address: string) => {
  const [data, setData] = useState<AllBalanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBalanceData = async () => {
      try {
        setLoading(true);
        const response = await getAllBalanceData(address);
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

    return () => {
      isMounted = false;
    };
  }, [address]);

  return { data, loading, error };
};
