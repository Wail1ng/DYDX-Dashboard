const BASE_URL = 'https://apis.mintscan.io/v1';

export async function getBalances(address: string, token: string) {
  try {
   const response = await fetch(
    `${BASE_URL}/dydx/accounts/${address}/balances`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

