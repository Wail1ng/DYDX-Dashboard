import { transformBalancesToChartData } from "@/lib/utils";
import { Balance, CumulatedBalance } from "@/types/type";

const BASE_URL = 'https://apis.mintscan.io/v1';

/**
 * Fetches balance data for a given address from the Mintscan API.
 * 
 * @param {string} address - The address to fetch balances for.
 * @param {boolean} [cumulate=true] - Whether to cumulate balances by month.
 * @param {Object} [params] - Optional parameters for the API request.
 * @param {string} [params.fromDateTime] - Start date for the balance data.
 * @param {string} [params.toDateTime] - End date for the balance data.
 * @param {number} [params.take] - Number of records to retrieve (default is 20).
 * @returns {Promise<{ balances: Balance[] } | CumulatedBalance[]>} A promise that resolves to either an array of Balance objects or CumulatedBalance objects.
 * @throws {Error} If the API key is not defined or if there's an error fetching the data.
 */
export async function getBalances(
  address: string, 
  cumulate: boolean = true, 
  params?: { fromDateTime: string; toDateTime: string; take: number }
): Promise<{ balances: Balance[] } | CumulatedBalance[]> {  let allBalances:Balance[] = [];
  let hasMoreData = true;
  let searchAfter = null;
  const { fromDateTime, toDateTime } = params? params : { fromDateTime: '', toDateTime: '' };


  const token = process.env.NEXT_PUBLIC_COSMOSTATION_API_KEY;
  if (!token) {
    throw new Error("NEXT_PUBLIC_COSMOSTATION_API_KEY is not defined");
  }

   while (hasMoreData) {
     try {
       let params = '';
       if(fromDateTime && toDateTime){
         params = `fromDateTime=${fromDateTime}&toDateTime=${toDateTime}&take=20`;
       } 
       let url = `${BASE_URL}/dydx/accounts/${address}/balances${params ? '?' + params : ''}`;
       if (searchAfter) {
         url += `&searchAfter=${searchAfter}`;
       }

       const response = await fetch(url, {
         headers: {
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': '*',
           'Authorization': `Bearer ${token}`
         }
       });

       const result = await response.json();
    
       if (result.balances && result.balances.length > 0) {
         allBalances = [...allBalances, ...result.balances];

         if (result.pagination && result.pagination.searchAfter) {
           searchAfter = result.pagination.searchAfter;
         } else {
           hasMoreData = false;
         }
       } else {
         hasMoreData = false;
       }

       // Si le nombre total d'éléments est atteint, arrêtez la pagination
       if (result.pagination && result.pagination.totalCount && allBalances.length >= result.pagination.totalCount) {
         hasMoreData = false;
       }

     } catch (error) {
       console.error('Erreur lors de la récupération des balances:', error);
       throw error;
     }
   }

   if (cumulate) {
     //return cumulateBalancesByMonth(allBalances);
     return transformBalancesToChartData(allBalances);
   } else {
     return { balances: allBalances };
   }
}