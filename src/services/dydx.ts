import { AllBalanceData, ApiResponse, BalanceData, RewardsData, StakingData, UnbondingData, ValidatorData, ValidatorsData } from "@/types/type";

const BASE_URL = 'https://dydx-rest.publicnode.com';

/**
 * Fetches staking data for a given address
 * @param address The dYdX address to fetch staking data for
 * @returns A Promise that resolves to an ApiResponse containing StakingData or an ApiError
 */
export async function getStakingData(address: string): Promise<ApiResponse<StakingData>> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/delegations/${address}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
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

/**
 * Fetches balance data for a given address and denom
 * @param address The dYdX address to fetch balance data for
 * @param denom The denom to fetch balance data for
 * @returns A Promise that resolves to an ApiResponse containing BalanceData or an ApiError
 */
export async function getBalanceData(address: string, denom: string): Promise<BalanceData> {
  denom = "adydx"
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${denom}`,
      {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetches rewards data for a given address
 * @param address The dYdX address to fetch rewards data for
 * @returns A Promise that resolves to an ApiResponse containing RewardsData or an ApiError
 */
export async function getRewardsData(address: string): Promise<ApiResponse<RewardsData>> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/distribution/v1beta1/delegators/${address}/rewards`,
      {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
      },
    );
    const response = await result.json();
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

/**
 * Fetches unbonding data for a given address
 * @param delegator_address The dYdX delegator_address to fetch unbonding data for
 * @returns A Promise that resolves to an ApiResponse containing UnbondingData or an ApiError
 */
export async function getUnbondingData(delegator_address: string): Promise<ApiResponse<UnbondingData>> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/delegators/${delegator_address}/unbonding_delegations`,
      {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

/**
 * Fetches validators data for a given delegator address
 * @param delegator_address The dYdX address to fetch validators data for
 * @returns A Promise that resolves to an ApiResponse containing ValidatorsData or an ApiError
 */
export async function getDelegatorData(delegator_address: string): Promise<ApiResponse<ValidatorsData>> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const response = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/delegators/${delegator_address}/validators`,
      {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
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

/**
 * Fetches validator data for a given delegator address and validator address
 * @param delegator_address The dYdX address to fetch validator data for
 * @param validator_address The validator address to fetch data for
 * @returns A Promise that resolves to an ApiResponse containing ValidatorData or an ApiError
 */ 
export async function getValidatorData(delegator_address: string, validator_address: string): Promise<ApiResponse<ValidatorData>> {
  const validator_addr = "dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz"
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/validators/${validator_addr}/delegations/${delegator_address}`,
      {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetches all balance data for a given address
 * @param address The dYdX address to fetch balance data for
 * @returns A Promise that resolves to an ApiResponse containing AllBalanceData or an ApiError
 */
export async function getAllBalanceData(address: string): Promise<AllBalanceData> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const result = await fetch(
      `${BASE_URL}/cosmos/bank/v1beta1/balances/${address}`,
      {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    throw error;
  }
}