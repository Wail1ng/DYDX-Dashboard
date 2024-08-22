## INFO

Link:
- "https://dydx-rest.publicnode.com/swagger/"
- "https://docs.cosmos.network/main/build/building-modules/genesis"

address test: **dydx144lgmly4qlgnuftqw8z8lpf80ggdw4ju3e3mcx**

Token_Denom: **adydx**

Number_format: 18 decimals

| Request  | URL  |  Method |   
|---|---|---|
| Available Balanc               | [/cosmos/bank/v1beta1/balances/{address}/by_denom](https://dydx-rest.publicnode.com/swagger/#/Query/Balance)                                                  | GET | 
|  Staked Balance                | [/cosmos/staking/v1beta1/delegations/{delegator_addr}](https://dydx-rest.publicnode.com/swagger/#/Query/DelegatorDelegations)                                 | GET |
| Rewards(to claim)              | [/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards](https://dydx-rest.publicnode.com/swagger/#/Query/DelegationTotalRewards)                | GET |
| Unbonding                      | [/cosmos/staking/v1beta1/delegators/{delegator_addr}/unbonding_delegations](https://dydx-rest.publicnode.com/swagger/#/Query/DelegatorUnbondingDelegations)   | GET |   
| Delegators Validators          | [/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators](https://dydx-rest.publicnode.com/swagger/#/Query/DelegatorValidators)                        | GET |  
| Delegation for said validator  | [/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}](https://dydx-rest.publicnode.com/swagger/#/Query/Delegation)               | GET |  
