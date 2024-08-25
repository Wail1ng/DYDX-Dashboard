import { useState, useEffect } from 'react';

export const useStakingData = (address : any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchStakingData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dydx-rest.publicnode.com/cosmos/staking/v1beta1/delegations/${address}`
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStakingData();
  }, [address]);

  return { data, loading, error };
};