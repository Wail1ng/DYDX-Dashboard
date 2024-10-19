import { AllBalanceData, BalanceData } from "@/types/type";

const BASE_URL = 'https://dydx-rest.publicnode.com';

export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
};

export type ApiError = {
  message: string;
  code: string;
  status?: number;
};

// api.ts
export async function getStakingData(address: string, token: string): Promise<ApiResponse<any>> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/delegations/${address}`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: `Error: ${response.statusText}`,
          code: response.status.toString(),
          status: response.status
        }
      };
    }

    const data = await response.json();
    return {
      data,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        code: 'NETWORK_ERROR'
      }
    };
  }
}

export async function getBalanceData(address: string, denom: string): Promise<BalanceData> {
  denom = "adydx"
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${denom}`,
      {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getRewardsData(address: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/distribution/v1beta1/delegators/${address}/rewards`,
      {
        headers: {
            'Content-Type': 'application/json'
        }
      }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

export async function getUnbondingData(delegator_address: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/delegators/${delegator_address}/unbonding_delegations`,
      {
        headers: {
            'Content-Type': 'application/json'
        }
      }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

export async function getDelegatorData(delegator_address: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/delegators/${delegator_address}/validators`,
      {
        headers: {
            'Content-Type': 'application/json'
        }
      }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

export async function getValidatorData(delegator_address: string) {
  const validator_addr = "dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz"
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/validators/${validator_addr}/delegations/${delegator_address}`,
      {
        headers: {
            'Content-Type': 'application/json'
        }
      }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllBalanceData(address: string): Promise<AllBalanceData> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/bank/v1beta1/balances/${address}`,
      {
        headers: {
            'Content-Type': 'application/json'
        }
      }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    throw error;
  }
}