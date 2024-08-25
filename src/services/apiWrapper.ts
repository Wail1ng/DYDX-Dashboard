// services/apiWrapper.ts

const BASE_URL = 'https://dydx-rest.publicnode.com';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

type Formatter<T, R> = (data: T) => R;

const createApiMethod = <T, R>(
  method: HttpMethod,
  url: string,
  formatter: Formatter<T, R> = (data: T) => data as unknown as R
) => {
  return async (params: Record<string, string> = {}, body: any = null): Promise<R> => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const fullUrl = `${BASE_URL}${url}${queryString ? `?${queryString}` : ''}`;

      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(fullUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: T = await response.json();
      return formatter(data);
    } catch (error) {
      console.error(`Error in API call (${method} ${url}):`, error);
      throw error;
    }
  };
};

// Types for API responses
interface BalanceResponse {
  balance: {
    amount: string;
    denom: string;
  };
}

interface StakingResponse {
  delegation_responses: Array<{
    delegation: {
      validator_address: string;
    };
    balance: {
      amount: string;
    };
  }>;
}

// Formatted types
interface FormattedBalance {
  amount: string;
  denom: string;
}

interface FormattedStaking {
  totalStaked: number;
  validators: Array<{
    validatorAddress: string;
    amount: string;
  }>;
}

// Formatters
const balanceFormatter: Formatter<BalanceResponse, FormattedBalance> = (data) => ({
  amount: data.balance.amount,
  denom: data.balance.denom,
});

const stakingFormatter: Formatter<StakingResponse, FormattedStaking> = (data) => ({
  totalStaked: data.delegation_responses.reduce((acc, del) => acc + Number(del.balance.amount), 0),
  validators: data.delegation_responses.map(del => ({
    validatorAddress: del.delegation.validator_address,
    amount: del.balance.amount,
  })),
});

// API methods
export const api = {
  getAvailableBalance: createApiMethod<BalanceResponse, FormattedBalance>(
    'GET',
    '/cosmos/bank/v1beta1/balances/{address}/by_denom',
    balanceFormatter
  ),
  getStakedBalance: createApiMethod<StakingResponse, FormattedStaking>(
    'GET',
    '/cosmos/staking/v1beta1/delegations/{address}',
    stakingFormatter
  ),
  // Add other methods as needed...
};

// // hooks/useStakingData.ts
// import { useState, useEffect } from 'react';
// import { api } from '../services/apiWrapper';

// export const useStakingData = (address: string) => {
//   const [data, setData] = useState<FormattedStaking | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchStakingData = async () => {
//       try {
//         setLoading(true);
//         const result = await api.getStakedBalance({ address });
//         setData(result);
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error('An unknown error occurred'));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStakingData();
//   }, [address]);

//   return { data, loading, error };
// };

// // hooks/useBalanceData.ts
// import { useState, useEffect } from 'react';
// import { api } from '../services/apiWrapper';

// export const useBalanceData = (address: string) => {
//   const [data, setData] = useState<FormattedBalance | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchBalanceData = async () => {
//       try {
//         setLoading(true);
//         const result = await api.getAvailableBalance({ address });
//         setData(result);
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error('An unknown error occurred'));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBalanceData();
//   }, [address]);

//   return { data, loading, error };
// };