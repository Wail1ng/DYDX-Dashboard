import { formatDYDX } from "@/lib/formatter";

const BASE_URL = 'https://apis.mintscan.io/v1';
// in my client component
// const balances = await getBalances(address, token);
// function transformBalancesToChartData(balances: any[]) {
//   return balances.map(balanceObj => {
//     const timestamp = balanceObj.timestamp;

//     // Sum up the delegation balances
//     let totalDelegation: number = balanceObj.delegation.reduce((sum: number, delegationItem: any) => {
//       const amount = parseFloat(delegationItem.balance.amount);
//       return sum + amount;
//     }, 0);
//     return {
//       timestamp: formatDateToLocal(timestamp),
//       totalDelegation: formatDYDX(totalDelegation)
//     };
//   });
// }
// const chartData = transformBalancesToChartData(balances.balances);
  // [
  //   {
  //     "timestamp": "January",
  //     "totalDelegation": 5765
  //   },
  //   {
  //     "timestamp": "February",
  //     "totalDelegation": 13605
  //   },
  //   {
  //     ...
  //   }
  // ]

  // in my server component
export async function getBalances(address: string, token: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
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
// console.log(result);
    return result;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}