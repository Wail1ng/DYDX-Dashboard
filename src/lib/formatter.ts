import { BalanceData, StakingData } from "@/types/type";

export const balanceFormatter = (data: BalanceData) => ({
    amount: Number(data.balance.amount),
    denom: data.balance.denom,
  });
  
  export const stakingFormatter = (result: { data: any; error: any; }) => {
  if (result.error) {
    console.error('Error fetching staking data:', result.error);
    return { totalStaked: BigInt(0), validators: [] }; // Return defaults on error
  }

  const delegationResponses = result.data?.delegation_responses || []; // Ensure it's an array

  return {
    totalStaked: delegationResponses.reduce(
      // @ts-ignore
      (acc, del) => acc + BigInt(del.balance.amount),
      BigInt(0)
    ),
    validators: delegationResponses.map((del: { delegation: { validator_address: any; }; balance: { amount: any; }; }) => ({
      validatorAddress: del.delegation.validator_address,
      amount: del.balance.amount, // Keep this as a string for easier display
    })),
  };
};

export const formatNumber = (value: string) => {
  try {
    const num = BigInt(value);
    const dydx = Number(num) / 1e18;
    return dydx.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0.00';
  }
};

export const formatUSDC = (value: string) => {
  try {
    const usdc = Number(value) / 1e6;
    return usdc.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  } catch (error) {
    console.error('Error formatting USDC:', error);
    return '0.00';
  }
};

// return as number
// export const formatDYDX = (amount: number) => {
//   // Convertir de atto-DYDX (10^-18) à DYDX
//   const inDYDX = amount / 1e18;
//   // Utiliser Intl.NumberFormat pour un formatage propre
//   return new Intl.NumberFormat('fr-FR', {
//     maximumFractionDigits: 2,
//     minimumFractionDigits: 2
//   }).format(inDYDX);
// }

export const formatDYDX = (amount: number): number => {
  // Convert from atto-DYDX (10^-18) to DYDX
  const inDYDX = amount / 1e18;
  // Return the number directly
  return inDYDX;
}




  // export const stakingFormatter = (data: StakingData) => {
  //   if (!data || !Array.isArray(data.delegation_responses)) {
  //     return {
  //       totalStaked: "0",
  //       validators: [],
  //     };
  //   }
  
  //   const validators = data.delegation_responses.map(del => ({
  //     validatorAddress: del.delegation.validator_address,
  //     amount: del.balance.amount,
  //     shares: del.delegation.shares
  //   }));
  
  //   const totalStaked = data.delegation_responses.reduce(
  //     (acc, del) => acc.plus(del.balance.amount),
  //     new Big(0)
  //   ).toString();
  
  //   return {
  //     totalStaked,
  //     validators,
  //   };
  // };
  