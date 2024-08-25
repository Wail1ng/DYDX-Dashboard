"use client";
import { useState, useEffect } from "react";
import { DelegationData } from "@/types/type";

export const useDelegationData = (delegator_address: string) => {
  const validator_addr = "dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz"
  const [data, setData] = useState<DelegationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDelegationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dydx-rest.publicnode.com/cosmos/staking/v1beta1/validators/${validator_addr}/delegations/${delegator_address}`
        );
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

    fetchDelegationData();

    return () => {
      isMounted = false;
    };
  }, [delegator_address]);

  return { data, loading, error };
};
