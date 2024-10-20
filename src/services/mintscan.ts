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
export async function getBalances2(address: string, token: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
   const response = await fetch(
    `${BASE_URL}/dydx/accounts/${address}/balances?fromDateTime=2024-10-01&toDateTime=2024-10-15&take=20`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    }
    );
    const result = await response.json();
    // {
    //   "balances": [
    //     {
    //       "address": "dydx144lgmly4qlgnuftqw8z8lpf80ggdw4ju3e3mcx",
    //       "txhash": "EF1C88FB9F543DD62AF5D167C329B7E52E7ED63BC71E569ADA5AD8E2E3BBB4DB",
    //       "height": 0,
    //       "timestamp": "2024-10-11T20:43:36Z",
    //       "bank": [
    //         {
    //           "denom": "adydx",
    //           "amount": "1065826907406305337"
    //         }
    //       ],
    //       "delegation": [
    //         {
    //           "delegation": {
    //             "validator_address": "dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz",
    //             "shares": "2500000000000000000000.000000000000000000"
    //           },
    //           "balance": {
    //             "denom": "adydx",
    //             "amount": "2500000000000000000000"
    //           }
    //         },
    //         {
    //           "delegation": {
    //             "validator_address": "dydxvaloper1y6ncfxx8x9sqec97pehjw0k32slw63850ltjrn",
    //             "shares": "500000000000000000000.000000000000000000"
    //           },
    //           "balance": {
    //             "denom": "adydx",
    //             "amount": "500000000000000000000"
    //           }
    //         }
    //       ],
    //       "reward": [
    //         {
    //           "validator_address": "dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz",
    //           "reward": [
    //             {
    //               "denom": "adydx",
    //               "amount": "194681593735000.000000000000000000"
    //             },
    //             {
    //               "denom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    //               "amount": "1090000.000000000000000000"
    //             }
    //           ]
    //         },
    //         {
    //           "validator_address": "dydxvaloper1y6ncfxx8x9sqec97pehjw0k32slw63850ltjrn",
    //           "reward": [
    //             {
    //               "denom": "adydx",
    //               "amount": "38936357903500.000000000000000000"
    //             },
    //             {
    //               "denom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    //               "amount": "240500.000000000000000000"
    //             }
    //           ]
    //         }
    //       ],
    //       "unbonding": []
    //     },
    //     {
    //       "address": "dydx144lgmly4qlgnuftqw8z8lpf80ggdw4ju3e3mcx",
    //       "txhash": "D5860B9C005FBF3660B774B7081E6363C1B9C238AD15E880E776CC828EEAD48E",
    //       "height": 0,
    //       "timestamp": "2024-10-11T19:58:56Z",
    //       "bank": [
    //         {
    //           "denom": "adydx",
    //           "amount": "1065826907406305337"
    //         }
    //       ],
    //       "delegation": [
    //         {
    //           "delegation": {
    //             "validator_address": "dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz",
    //             "shares": "2500000000000000000000.000000000000000000"
    //           },
    //           "balance": {
    //             "denom": "adydx",
    //             "amount": "2500000000000000000000"
    //           }
    //         },
    //         {
    //           "delegation": {
    //             "validator_address": "dydxvaloper1y6ncfxx8x9sqec97pehjw0k32slw63850ltjrn",
    //             "shares": "500000000000000000000.000000000000000000"
    //           },
    //           "balance": {
    //             "denom": "adydx",
    //             "amount": "500000000000000000000"
    //           }
    //         }
    //       ],
    //       "reward": [
    //         {
    //           "validator_address": "dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz",
    //           "reward": [
    //             {
    //               "denom": "adydx",
    //               "amount": "191262344857500.000000000000000000"
    //             },
    //             {
    //               "denom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    //               "amount": "1082500.000000000000000000"
    //             }
    //           ]
    //         },
    //         {
    //           "validator_address": "dydxvaloper1y6ncfxx8x9sqec97pehjw0k32slw63850ltjrn",
    //           "reward": [
    //             {
    //               "denom": "adydx",
    //               "amount": "38252521109500.000000000000000000"
    //             },
    //             {
    //               "denom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    //               "amount": "238500.000000000000000000"
    //             }
    //           ]
    //         }
    //       ],
    //       "unbonding": []
    //     },
    //     {
    //       "address": "dydx144lgmly4qlgnuftqw8z8lpf80ggdw4ju3e3mcx",
    //       "txhash": "E049BEBFD8D03305B8E1592C31A44A5528E8485F049B43D450606B6BDA9B75B3",
    //       "height": 0,
    //       "timestamp": "2024-10-02T20:12:45Z",
    //       "bank": [
    //         {
    //           "denom": "adydx",
    //           "amount": "3353285088404648777"
    //         },
    //         {
    //           "denom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    //           "amount": "6075"
    //         }
    //       ],
    //       "delegation": [
    //         {
    //           "delegation": {
    //             "validator_address": "dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz",
    //             "shares": "2500000000000000000000.000000000000000000"
    //           },
    //           "balance": {
    //             "denom": "adydx",
    //             "amount": "2500000000000000000000"
    //           }
    //         },
    //         {
    //           "delegation": {
    //             "validator_address": "dydxvaloper1y6ncfxx8x9sqec97pehjw0k32slw63850ltjrn",
    //             "shares": "410000000000000000000.000000000000000000"
    //           },
    //           "balance": {
    //             "denom": "adydx",
    //             "amount": "410000000000000000000"
    //           }
    //         }
    //       ],
    //       "reward": [
    //         {
    //           "validator_address": "dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz",
    //           "reward": [
    //             {
    //               "denom": "adydx",
    //               "amount": "300812077447500.000000000000000000"
    //             },
    //             {
    //               "denom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    //               "amount": "1187500.000000000000000000"
    //             }
    //           ]
    //         },
    //         {
    //           "validator_address": "dydxvaloper1y6ncfxx8x9sqec97pehjw0k32slw63850ltjrn",
    //           "reward": [
    //             {
    //               "denom": "adydx",
    //               "amount": "49042280850270.000000000000000000"
    //             },
    //             {
    //               "denom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    //               "amount": "200900.000000000000000000"
    //             }
    //           ]
    //         }
    //       ],
    //       "unbonding": []
    //     }
    //   ],
    //   "pagination": {
    //     "totalCount": 3,
    //     "searchAfter": "MTcyNzg5OTk2NTAwMA=="
    //   }
    // }
    return result;
  } catch (error) {
    console.error('Erreur lors de la récupération des chaînes:', error);
    throw error;
  }
}

type Balance = {
  timestamp: string;
  totalDelegation: number;
};
export async function getBalances(address: string, cumulate: boolean = true, params?: { fromDateTime: string; toDateTime: string; take:number } )/* : Promise<{ balances: Balance[] } | CumulatedBalance[]> */ {
  let allBalances:Balance[] = [];
  let hasMoreData = true;
  let searchAfter = null;
  const { fromDateTime, toDateTime } = params? params : { fromDateTime: '', toDateTime: '' };


  const token = process.env.NEXT_PUBLIC_COSMOSTATION_API_KEY;
  if (!token) {
    throw new Error("NEXT_PUBLIC_COSMOSTATION_API_KEY is not defined");
  }

  let url = `${BASE_URL}/dydx/accounts/${address}/balances${params ? '?' + params : ''}`;
  console.log('1');
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    }
  });
  console.log('2');
  const result = await response.json();
  console.log('3');
  return result;
  // while (hasMoreData) {
  //   try {
  //     let params = '';
  //     if(fromDateTime && toDateTime){
  //       params = `fromDateTime=${fromDateTime}&toDateTime=${toDateTime}&take=20`;
  //     } 
  //     let url = `${BASE_URL}/dydx/accounts/${address}/balances${params ? '?' + params : ''}`;
  //     if (searchAfter) {
  //       url += `&searchAfter=${searchAfter}`;
  //     }

  //     const response = await fetch(url, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     const result = await response.json();
      
  //     if (result.balances && result.balances.length > 0) {
  //       allBalances = [...allBalances, ...result.balances];
        
  //       if (result.pagination && result.pagination.searchAfter) {
  //         searchAfter = result.pagination.searchAfter;
  //       } else {
  //         hasMoreData = false;
  //       }
  //     } else {
  //       hasMoreData = false;
  //     }

  //     // Si le nombre total d'éléments est atteint, arrêtez la pagination
  //     if (result.pagination && result.pagination.totalCount && allBalances.length >= result.pagination.totalCount) {
  //       hasMoreData = false;
  //     }

  //   } catch (error) {
  //     console.error('Erreur lors de la récupération des balances:', error);
  //     throw error;
  //   }
  // }

  // if (cumulate) {
  //   return cumulateBalancesByMonth(allBalances);
  // } else {
  //   return { balances: allBalances };
  // }
}
interface CumulatedBalance {
  timestamp: string;
  totalDelegation: number;
}

function cumulateBalancesByMonth(balances: any[]): CumulatedBalance[] {
  const monthlyBalances: { [key: string]: number } = {};

  balances.forEach(balance => {
    const date = new Date(balance.timestamp);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    let totalDelegation = 0;
    balance.delegation.forEach((del: { balance: { amount: string; }; }) => {
      totalDelegation += parseInt(del.balance.amount) / 1e18; // Assuming 18 decimals, adjust if needed
    });

    if (monthlyBalances[monthYear]) {
      monthlyBalances[monthYear] += totalDelegation;
    } else {
      monthlyBalances[monthYear] = totalDelegation;
    }
  });

  return Object.entries(monthlyBalances).map(([timestamp, totalDelegation]) => ({
    timestamp,
    totalDelegation: Math.round(totalDelegation * 100) / 100 // Round to 2 decimal places
  })).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}