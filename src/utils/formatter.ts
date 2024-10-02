import { BalanceData, StakingData } from "@/types/type";

export const balanceFormatter = (data: BalanceData) => ({
    amount: Number(data.balance.amount),
    denom: data.balance.denom,
  });
  
export  const stakingFormatter = (data: StakingData) => ({
    totalStaked: data.delegation_responses.reduce(
      (acc, del) => acc + Number(del.balance.amount),
      0
    ),
    validators: data.delegation_responses.map((del) => ({
      validatorAddress: del.delegation.validator_address,
      amount: del.balance.amount,
    })),
  });


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
  