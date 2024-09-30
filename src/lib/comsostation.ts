
const BASE_URL = 'https://api.cosmostation.io/v1';

export async function getChains() {
    
    const address = "dydx144lgmly4qlgnuftqw8z8lpf80ggdw4ju3e3mcx";
  try {

    const response = await fetch(
        `${BASE_URL}/v1/dydx/accounts/${address}/balances`
    );
    const result = await response.json();
    console.log('result', result);
    // const response = await axios.get(`${BASE_URL}/v1/dydx/accounts/${address}/balances`);
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}