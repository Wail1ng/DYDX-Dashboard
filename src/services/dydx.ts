const BASE_URL = 'https://dydx-rest.publicnode.com';


export async function getStakingData(address: string, token: string) {
  try {
   const response = await fetch(
    `${BASE_URL}/cosmos/staking/v1beta1/delegations/${address}`,
    {
        headers: {
            'Content-Type': 'application/json'/* ,
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}` */
        }
    }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getBalanceData(address: string, denom: string) {
  const token = process.env.REACT_APP_COSMOSTATION_API_KEY
  try {
    const response = await fetch(
      `${BASE_URL}/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${denom}`,
      {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getRewardsData(delegator_address: string) {
  const token = process.env.REACT_APP_COSMOSTATION_API_KEY
  try {
    const response = await fetch(
      `${BASE_URL}/cosmos/distribution/v1beta1/delegators/${delegator_address}/rewards`,
      {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

export async function getUnbondingData(delegator_address: string) {
  const token = process.env.REACT_APP_COSMOSTATION_API_KEY
  try {
    const response = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/delegators/${delegator_address}/unbonding_delegations`,
      {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

export async function getDelegatorData(delegator_address: string) {
  const token = process.env.REACT_APP_COSMOSTATION_API_KEY
  try {
    const response = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/delegators/${delegator_address}/validators`,
      {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

export async function getValidatorData(validator_addr: string, delegator_address: string) {
  const token = process.env.REACT_APP_COSMOSTATION_API_KEY
  try {
    const response = await fetch(
      `${BASE_URL}/cosmos/staking/v1beta1/validators/${validator_addr}/delegations/${delegator_address}`,
      {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllBalanceData(address: string) {
  const token = process.env.REACT_APP_COSMOSTATION_API_KEY
  try {
    const response = await fetch(
      `${BASE_URL}/cosmos/bank/v1beta1/balances/${address}`,
      {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}